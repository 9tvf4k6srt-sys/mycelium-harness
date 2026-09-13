#!/usr/bin/env node
'use strict';

/**
 * Offline multi-arm mechanical eval for mycelium-harness.
 * Pattern ported from NumbahWan evals/REPLICATION.md + outcome-eval grade()
 * (fetched via raw.githubusercontent.com only — no TCG product fixtures).
 *
 * Arms in fixtures/arms/:
 *   pass / control / adversarial / poison  → expectPass true (suite)
 *   fail                                   → planted wrong predictions (assert-fail)
 *
 * Usage:
 *   node evals/mechanical-eval.cjs           # suite (expectPass) → exit 0
 *   node evals/mechanical-eval.cjs --assert-fail  # planted fails must fail
 *   node evals/mechanical-eval.cjs --dry-run
 *   node evals/mechanical-eval.cjs --json
 */

const fs = require('node:fs');
const path = require('node:path');
const { grade } = require('./lib/grader.cjs');

const ROOT = path.resolve(__dirname, '..');
const ARMS_DIR = path.join(__dirname, 'fixtures', 'arms');
const KINDS = new Set(['fact', 'control', 'adversarial', 'poison']);

function loadFixtures() {
  const files = fs.readdirSync(ARMS_DIR).filter((f) => f.endsWith('.json')).sort();
  const out = [];
  for (const file of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(ARMS_DIR, file), 'utf8'));
    if (!raw || typeof raw.id !== 'string' || typeof raw.prediction !== 'string') {
      throw new Error('Invalid fixture: ' + file);
    }
    if (!KINDS.has(raw.kind)) throw new Error('Invalid kind in ' + file);
    out.push({ ...raw, _file: file });
  }
  return out;
}

function runSuite(fixtures, { wantPass }) {
  const selected = fixtures.filter((f) => Boolean(f.expectPass) === wantPass);
  const rows = selected.map((task) => {
    const g = grade(task, task.prediction);
    const ok = wantPass ? g.pass === true : g.pass === false;
    return {
      id: task.id,
      kind: task.kind,
      arm: task.arm || task.kind,
      expectPass: task.expectPass,
      gradedPass: g.pass,
      ok,
      missing: g.missing,
      forbidden: g.forbidden,
    };
  });
  const passed = rows.filter((r) => r.ok).length;
  const failed = rows.filter((r) => !r.ok);
  return { rows, passed, failed, total: rows.length };
}

function main() {
  const args = process.argv.slice(2);
  const DRY = args.includes('--dry-run');
  const JSON_OUT = args.includes('--json');
  const ASSERT_FAIL = args.includes('--assert-fail');

  const fixtures = loadFixtures();
  const byKind = {};
  for (const f of fixtures) byKind[f.kind] = (byKind[f.kind] || 0) + 1;

  if (DRY) {
    const msg = {
      fixtures: fixtures.length,
      byKind,
      suiteExpectPass: fixtures.filter((f) => f.expectPass).length,
      plantedFail: fixtures.filter((f) => f.expectPass === false).length,
      mode: ASSERT_FAIL ? 'assert-fail' : 'suite',
    };
    process.stdout.write(JSON.stringify(msg, null, 2) + '\n');
    process.exit(0);
  }

  const wantPass = !ASSERT_FAIL;
  const result = runSuite(fixtures, { wantPass });
  const receipt = {
    schema: 'mycelium-harness.mechanical-eval/v1',
    version: 1,
    mode: ASSERT_FAIL ? 'assert-fail' : 'suite',
    ts: new Date().toISOString(),
    total: result.total,
    passed: result.passed,
    failed: result.failed.map((r) => r.id),
    rows: result.rows,
  };

  if (JSON_OUT) {
    process.stdout.write(JSON.stringify(receipt, null, 2) + '\n');
  } else {
    const label = ASSERT_FAIL
      ? 'assert-fail (planted fail fixtures must grade fail)'
      : 'suite (expectPass fixtures must grade pass)';
    process.stdout.write('mechanical-eval ' + label + '\n');
    for (const r of result.rows) {
      process.stdout.write(
        '  [' + (r.ok ? 'ok' : 'FAIL') + '] ' + r.id + ' kind=' + r.kind +
          ' gradedPass=' + r.gradedPass + '\n'
      );
    }
    process.stdout.write(
      'summary: ' + result.passed + '/' + result.total + ' checks ok\n'
    );
  }

  process.exit(result.failed.length === 0 && result.total > 0 ? 0 : 1);
}

main();
