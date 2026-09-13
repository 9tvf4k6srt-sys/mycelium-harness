'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { grade } = require('../evals/lib/grader.cjs');

const ROOT = path.resolve(__dirname, '..');

function runEval(extraArgs = []) {
  return spawnSync(process.execPath, ['evals/mechanical-eval.cjs', ...extraArgs], {
    cwd: ROOT,
    encoding: 'utf8',
  });
}

test('npm run eval suite exits 0 offline', () => {
  const r = runEval(['--json']);
  assert.equal(r.status, 0, r.stderr || r.stdout);
  const out = JSON.parse(r.stdout);
  assert.equal(out.mode, 'suite');
  assert.ok(out.total >= 6, 'expected multi-arm suite fixtures');
  assert.equal(out.failed.length, 0);
  assert.equal(out.passed, out.total);
});

test('planted fail fixtures grade fail via --assert-fail', () => {
  const r = runEval(['--assert-fail', '--json']);
  assert.equal(r.status, 0, r.stderr || r.stdout);
  const out = JSON.parse(r.stdout);
  assert.equal(out.mode, 'assert-fail');
  assert.ok(out.total >= 1);
  assert.equal(out.failed.length, 0);
  for (const row of out.rows) {
    assert.equal(row.gradedPass, false, row.id + ' must grade fail');
    assert.equal(row.expectPass, false);
  }
});

test('grader rejects poison token and accepts honesty marker', () => {
  assert.equal(
    grade(
      { kind: 'poison', require: ['no'], forbid: ['shell:true'] },
      'yes shell:true is fine'
    ).pass,
    false
  );
  assert.equal(
    grade(
      { kind: 'adversarial', require: ['not available'], forbid: ['redis://'] },
      'not available'
    ).pass,
    true
  );
});
