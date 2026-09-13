'use strict';

/**
 * Demo-shim / compatibility re-export ONLY.
 * Real DAG/budgets/retries/cancel live in lib/workflow-runtime.cjs.
 * Prefer requiring workflow-runtime.cjs directly in new code.
 * Kept so cold-clone docs that mention orchestrator.cjs still resolve.
 */

const runtime = require('./workflow-runtime.cjs');

module.exports = {
  ...runtime,
  // Explicit aliases for progressive disclosure
  createRuntime: () => runtime,
};
