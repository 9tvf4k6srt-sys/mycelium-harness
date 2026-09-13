'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { runWorkflow } = require('../lib/workflow-runtime.cjs');

const ROOT = path.resolve(__dirname, '..');

test('demo writes versioned receipt with sequenced terminal event', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mh-receipt-'));
  const receiptFile = path.join(tmp, 'receipt.json');
  const r = spawnSync(
    process.execPath,
    ['bin/orchestrator-demo.cjs', '--write', receiptFile, 'receipt-demo-goal'],
    { cwd: ROOT, encoding: 'utf8' }
  );
  assert.equal(r.status, 0, r.stderr || r.stdout);
  const out = JSON.parse(r.stdout);
  assert.equal(out.schema, 'mycelium-harness.run-receipt/v1');
  assert.equal(out.version, 1);
  assert.equal(out.status, 'awaiting_review');
  assert.ok(Array.isArray(out.events) && out.events.length >= 2);

  const disk = JSON.parse(fs.readFileSync(receiptFile, 'utf8'));
  assert.equal(disk.runId, out.runId);
  assert.deepEqual(disk.events, out.events);

  const types = disk.events.map((e) => e.type);
  assert.equal(types[0], 'run_started');
  assert.equal(types[types.length - 1], 'run_finished');
  for (let i = 0; i < disk.events.length; i++) {
    const e = disk.events[i];
    assert.equal(e.version, 1);
    assert.equal(e.seq, i + 1);
    assert.equal(e.runId, disk.runId);
  }
  assert.equal(disk.events[disk.events.length - 1].status, 'awaiting_review');
});

test('runWorkflow events are versioned monotonic traces', async () => {
  const step = (id, needs = []) => ({ id, needs, tool: id, args: [] });
  const tool = () => ({
    argv: ['-e', ''],
    effect: 'read',
    timeoutMs: 1000,
    maxAttempts: 1,
    retryExitCodes: [],
  });
  const r = await runWorkflow(
    [step('a'), step('b', ['a'])],
    { a: tool(), b: tool() },
    {
      cwd: ROOT,
      execute: async () => ({ code: 0, signal: null, reason: null, stdout: '', stderr: '' }),
    }
  );
  assert.equal(r.version, 1);
  assert.equal(r.events[0].type, 'run_started');
  assert.equal(r.events[r.events.length - 1].type, 'run_finished');
  assert.equal(r.events[r.events.length - 1].status, 'awaiting_review');
  const seqs = r.events.map((e) => e.seq);
  assert.deepEqual(seqs, seqs.slice().sort((a, b) => a - b));
  assert.equal(seqs[0], 1);
  assert.equal(seqs[seqs.length - 1], seqs.length);
});
