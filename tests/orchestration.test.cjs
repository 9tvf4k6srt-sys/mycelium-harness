'use strict';
// Offline reliability evals for adapted workflow-runtime — not a model-quality benchmark.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const {
  runWorkflow,
  validatePlan,
  executeNode,
  classify,
} = require('../lib/workflow-runtime.cjs');

const ROOT = path.resolve(__dirname, '..');
const step = (id, needs = [], tool = id) => ({ id, needs, tool, args: [] });
const tool = (overrides = {}) => ({
  argv: ['-e', ''],
  effect: 'read',
  timeoutMs: 1000,
  maxAttempts: 1,
  retryExitCodes: [],
  ...overrides,
});
const good = (overrides = {}) => ({
  code: 0,
  signal: null,
  reason: null,
  stdout: '',
  stderr: '',
  ...overrides,
});
const run = (plan, tools, options = {}) =>
  runWorkflow(plan, tools, { cwd: ROOT, execute: async () => good(), ...options });

for (const [name, plan, tools] of [
  ['empty plan', [], {}],
  ['unknown capability', [step('a')], {}],
  ['duplicate step', [step('a'), step('a')], { a: tool() }],
  ['missing dependency', [step('a', ['missing'])], { a: tool() }],
  ['cycle', [step('a', ['b']), step('b', ['a'])], { a: tool(), b: tool() }],
  ['unsafe write retry', [step('a')], { a: tool({ effect: 'write', maxAttempts: 2 }) }],
  ['NUL argv', [step('a')], { a: tool({ argv: ['bad\0value'] }) }],
]) {
  test(`rejects ${name} before executing anything`, async () => {
    let calls = 0;
    await assert.rejects(
      run(plan, tools, {
        execute: async () => {
          calls++;
          return good();
        },
      })
    );
    assert.equal(calls, 0);
  });
}

test('validates an unsorted DAG and executes dependencies first', async () => {
  const r = await run(
    [step('c', ['b']), step('b', ['a']), step('a')],
    { a: tool(), b: tool(), c: tool() }
  );
  assert.deepEqual(
    r.events.filter((e) => e.type === 'attempt_started').map((e) => e.stepId),
    ['a', 'b', 'c']
  );
  assert.equal(r.status, 'awaiting_review');
  assert.equal(r.events.filter((e) => e.type === 'run_finished').length, 1);
});

test('DAG failure blocks dependents and denies PASS verdict', async () => {
  const checks = ['a', 'b', 'c', 'd'];
  const plan = [...checks.map((id) => step(id)), step('finish', checks)];
  const tools = Object.fromEntries(
    [...checks, 'finish'].map((id) => [id, tool({ argv: [id] })])
  );
  const r = await run(plan, tools, {
    execute: async ([id]) => good({ code: id === 'b' ? 1 : 0 }),
  });
  assert.equal(r.success, false);
  assert.equal(r.states.b, 'failed');
  assert.equal(r.states.finish, 'blocked');
  assert.equal(r.calls, 4);
});

for (const [name, result] of [
  ['nonzero exit containing PASS', good({ code: 9, stdout: 'PASS all tests green' })],
  ['timeout', good({ reason: 'timeout' })],
  ['signal', good({ code: null, signal: 'SIGKILL' })],
  ['missing result', undefined],
]) {
  test(`fails closed on ${name}`, async () => {
    const r = await run([step('a'), step('b', ['a'])], { a: tool(), b: tool() }, {
      execute: async () => result,
    });
    assert.equal(r.success, false);
    assert.equal(r.states.b, 'blocked');
    assert.equal(r.calls, 1);
  });
}

test('cancellation stops pending work before it starts', async () => {
  const controller = new AbortController();
  controller.abort();
  const r = await run([step('a')], { a: tool() }, { signal: controller.signal });
  assert.equal(r.calls, 0);
  assert.equal(r.status, 'cancelled');
});

test('expired deadline starts zero subprocesses', async () => {
  let tick = 0;
  const r = await run([step('a')], { a: tool() }, { deadlineMs: 1, now: () => tick++ });
  assert.equal(r.calls, 0);
  assert.equal(r.states.a, 'blocked');
});

test('completion after deadline cannot become a success', async () => {
  let time = 0;
  const r = await run([step('a')], { a: tool() }, {
    deadlineMs: 10,
    now: () => time,
    execute: async () => {
      time = 20;
      return good();
    },
  });
  assert.equal(r.success, false);
});

test('read-only transient retry has exactly the declared attempt count', async () => {
  let calls = 0;
  const r = await run([step('a')], { a: tool({ maxAttempts: 3, retryExitCodes: [75] }) }, {
    execute: async () => good({ code: ++calls === 3 ? 0 : 75 }),
  });
  assert.equal(r.success, true);
  assert.equal(calls, 3);
});

test('receipts contain neither raw arguments nor raw tool output', async () => {
  const s = step('a');
  s.args = ['SECRET_PROMPT'];
  const r = await run([s], { a: tool() }, {
    execute: async () => good({ stdout: 'SECRET_STDOUT', stderr: 'SECRET_STDERR' }),
  });
  assert.equal(/SECRET_/.test(JSON.stringify(r)), false);
});

test('real subprocesses preserve nonzero exit status without shell pipes', async () => {
  const r = await executeNode(['-e', 'console.log("PASS");process.exit(17)'], {
    cwd: ROOT,
    timeoutMs: 2000,
  });
  assert.equal(r.code, 17);
  assert.equal(classify(r), 'exit_code');
});

test('shell metacharacters remain literal subprocess arguments', async () => {
  const text = '$(echo INJECTED) `echo INJECTED` ; echo INJECTED | cat "quote"';
  const r = await executeNode(
    ['-e', 'process.stdout.write(process.argv[1])', '--', text],
    { cwd: ROOT, timeoutMs: 2000 }
  );
  assert.equal(r.stdout, text);
  assert.equal(r.code, 0);
});

test('real hung child is terminated at its deadline', async () => {
  const r = await executeNode(['-e', 'setInterval(()=>{},1000)'], {
    cwd: ROOT,
    timeoutMs: 50,
  });
  assert.equal(r.reason, 'timeout');
  assert.notEqual(r.code, 0);
});

test('real active child is cancelled', async () => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 50);
  try {
    const r = await executeNode(['-e', 'setInterval(()=>{},1000)'], {
      cwd: ROOT,
      timeoutMs: 2000,
      signal: controller.signal,
    });
    assert.equal(r.reason, 'cancelled');
  } finally {
    clearTimeout(timer);
  }
});

test('demo CLI returns parseable receipt with awaiting_review', () => {
  const r = spawnSync(process.execPath, ['bin/orchestrator-demo.cjs'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  assert.equal(r.status, 0, r.stderr);
  const out = JSON.parse(r.stdout);
  assert.equal(out.status, 'awaiting_review');
  assert.equal(out.success, true);
  assert.ok(out.calls >= 1);
});

test('validatePlan is exported for trusted workflow authors', () => {
  assert.doesNotThrow(() =>
    validatePlan([step('a')], { a: tool() })
  );
  assert.throws(() => validatePlan([], {}), /empty/i);
});
