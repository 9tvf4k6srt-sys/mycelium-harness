'use strict';

/**
 * Compatibility surface: prefer lib/workflow-runtime.cjs for DAG/budgets/retries.
 * Kept so cold-clone docs that mention orchestrator.cjs still resolve.
 */

const runtime = require('./workflow-runtime.cjs');

module.exports = {
  ...runtime,
  // Explicit aliases for progressive disclosure
  createRuntime: () => runtime,
};
