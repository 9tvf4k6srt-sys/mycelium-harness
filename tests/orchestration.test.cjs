'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { createOrchestrator, normalizeGoal } = require('../lib/orchestrator.cjs');

describe('normalizeGoal', () => {
  it('trims and returns non-empty goals', () => {
    assert.equal(normalizeGoal('  hello  '), 'hello');
  });

  it('rejects empty goals', () => {
    assert.throws(() => normalizeGoal(''), /goal required/);
    assert.throws(() => normalizeGoal('   '), /goal required/);
  });
});

describe('orchestrator stub', () => {
  it('builds a deterministic four-step plan', () => {
    const orch = createOrchestrator({ seed: 7 });
    const a = orch.plan('verify-offline-harness');
    const b = orch.plan('verify-offline-harness');

    assert.deepEqual(a, b);
    assert.equal(a.seed, 7);
    assert.equal(a.createdAt, 'deterministic');
    assert.deepEqual(
      a.steps.map((s) => s.id),
      ['intake', 'decompose', 'execute', 'verify']
    );
  });

  it('runs a valid plan with sequential handoffs', () => {
    const orch = createOrchestrator({ seed: 1 });
    const plan = orch.plan('task-a');
    const result = orch.run(plan);

    assert.equal(result.ok, true);
    assert.equal(result.error, null);
    assert.equal(result.handoffs.length, 4);
    assert.equal(result.handoffs[0].from, null);
    assert.equal(result.handoffs[0].to, 'intake');
    assert.equal(result.handoffs[3].to, 'verify');
  });

  it('fails empty plans', () => {
    const orch = createOrchestrator();
    const result = orch.run({ steps: [] });
    assert.equal(result.ok, false);
    assert.match(result.error, /empty plan/);
  });

  it('summarize reports handoff count', () => {
    const orch = createOrchestrator();
    const plan = orch.plan('x');
    const summary = orch.summarize(orch.run(plan));
    assert.deepEqual(summary, { ok: true, handoffCount: 4 });
  });
});
