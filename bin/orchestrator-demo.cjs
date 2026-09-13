#!/usr/bin/env node
'use strict';

/**
 * Offline workflow-runtime demo — no network, no model calls.
 * Runs a tiny trusted DAG via real Node subprocesses and writes a
 * versioned run receipt (events/traces) under evals/results/.
 */

const fs = require('node:fs');
const path = require('node:path');
const { runWorkflow } = require('../lib/workflow-runtime.cjs');

const ROOT = path.resolve(__dirname, '..');
const RECEIPT_SCHEMA = 'mycelium-harness.run-receipt/v1';
const DEFAULT_RECEIPT = path.join(ROOT, 'evals', 'results', 'demo-receipt.json');

async function main() {
  const args = process.argv.slice(2);
  let receiptPath = DEFAULT_RECEIPT;
  const positional = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--write') {
      const next = args[i + 1];
      if (next && !next.startsWith('-')) {
        receiptPath = path.resolve(next);
        i++;
      }
      continue;
    }
    if (args[i].startsWith('-')) continue;
    positional.push(args[i]);
  }
  const goal = positional[0] || 'verify-offline-harness';

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

  const receipt = {
    schema: RECEIPT_SCHEMA,
    version: result.version,
    runId: result.runId,
    ok: result.success === true,
    success: result.success,
    status: result.status,
    goal,
    calls: result.calls,
    states: result.states,
    events: result.events,
    observerErrors: result.observerErrors,
    exitCode: result.success ? 0 : 1,
  };

  fs.mkdirSync(path.dirname(receiptPath), { recursive: true });
  fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2) + '\n');

  process.stdout.write(JSON.stringify({
    ...receipt,
    receiptPath: path.relative(ROOT, receiptPath),
  }, null, 2) + '\n');
  process.exit(receipt.exitCode);
}

main().catch((err) => {
  process.stderr.write(JSON.stringify({ status: 'failed', error: String(err && err.message || err) }) + '\n');
  process.exit(1);
});
