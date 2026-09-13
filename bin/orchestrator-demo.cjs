#!/usr/bin/env node
'use strict';

/**
 * Offline workflow-runtime demo — no network, no model calls.
 * Runs a tiny trusted DAG via real Node subprocesses and prints a receipt.
 */

const path = require('node:path');
const { runWorkflow } = require('../lib/workflow-runtime.cjs');

const ROOT = path.resolve(__dirname, '..');

async function main() {
  const goal = process.argv[2] || 'verify-offline-harness';

  // Trusted plan owned by this demo — tool output is data, never a plan.
  const plan = [
    { id: 'intake', needs: [], tool: 'echo-goal', args: [goal] },
    { id: 'verify', needs: ['intake'], tool: 'ok', args: [] },
  ];
  const tools = {
    'echo-goal': {
      argv: ['-e', 'process.stdout.write(process.argv[1] || "")', '--'],
      effect: 'read',
      timeoutMs: 2000,
      maxAttempts: 1,
      retryExitCodes: [],
    },
    ok: {
      argv: ['-e', 'process.exit(0)'],
      effect: 'read',
      timeoutMs: 2000,
      maxAttempts: 1,
      retryExitCodes: [],
    },
  };

  const result = await runWorkflow(plan, tools, {
    cwd: ROOT,
    concurrency: 1,
    maxCalls: 8,
    deadlineMs: 10000,
  });

  const out = {
    ok: result.success === true,
    success: result.success,
    status: result.status,
    goal,
    calls: result.calls,
    states: result.states,
    exitCode: result.success ? 0 : 1,
  };

  process.stdout.write(JSON.stringify(out, null, 2) + '\n');
  process.exit(out.exitCode);
}

main().catch((err) => {
  process.stderr.write(JSON.stringify({ status: 'failed', error: String(err && err.message || err) }) + '\n');
  process.exit(1);
});
