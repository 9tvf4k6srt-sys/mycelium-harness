'use strict';

/**
 * Minimal deterministic orchestration stub.
 * Ground-truth surface for tests — not a production agent runtime.
 */

function normalizeGoal(goal) {
  const g = String(goal || '').trim();
  if (!g) throw new Error('goal required');
  return g;
}

function createOrchestrator(options = {}) {
  const seed = Number.isFinite(options.seed) ? options.seed : 0;

  function plan(goal) {
    const g = normalizeGoal(goal);
    // Fixed step graph — order is part of the contract under test.
    const steps = [
      { id: 'intake', kind: 'validate', input: g },
      { id: 'decompose', kind: 'plan', dependsOn: ['intake'] },
      { id: 'execute', kind: 'act', dependsOn: ['decompose'] },
      { id: 'verify', kind: 'check', dependsOn: ['execute'] },
    ];
    return {
      goal: g,
      seed,
      steps,
      createdAt: 'deterministic', // no Date.now() — keeps golden tests stable
    };
  }

  function run(planObj) {
    if (!planObj || !Array.isArray(planObj.steps) || planObj.steps.length === 0) {
      return { ok: false, handoffs: [], error: 'empty plan' };
    }

    const handoffs = [];
    let prev = null;
    for (const step of planObj.steps) {
      if (prev && Array.isArray(step.dependsOn) && !step.dependsOn.includes(prev.id)) {
        return {
          ok: false,
          handoffs,
          error: `dependency break: ${step.id} missing ${prev.id}`,
        };
      }
      handoffs.push({ from: prev ? prev.id : null, to: step.id, status: 'ok' });
      prev = step;
    }

    return { ok: true, handoffs, error: null };
  }

  function summarize(result) {
    return {
      ok: !!(result && result.ok),
      handoffCount: result && Array.isArray(result.handoffs) ? result.handoffs.length : 0,
    };
  }

  return { plan, run, summarize };
}

module.exports = { createOrchestrator, normalizeGoal };
