#!/usr/bin/env node
'use strict';

/**
 * Offline orchestrator demo — no network, no model calls.
 * Prints a deterministic plan JSON and exits 0 on success.
 */

const { createOrchestrator } = require('../lib/orchestrator.cjs');

function main() {
  const orch = createOrchestrator({ seed: 42 });
  const goal = process.argv[2] || 'verify-offline-harness';

  const plan = orch.plan(goal);
  const result = orch.run(plan);

  const out = {
    ok: result.ok === true,
    goal: plan.goal,
    steps: plan.steps.map((s) => s.id),
    handoffs: result.handoffs,
    exitCode: result.ok ? 0 : 1,
  };

  process.stdout.write(JSON.stringify(out, null, 2) + '\n');
  process.exit(out.exitCode);
}

main();
