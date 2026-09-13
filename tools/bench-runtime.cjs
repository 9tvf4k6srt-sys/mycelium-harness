#!/usr/bin/env node
'use strict';

/**
 * Offline wall-clock bench for demo DAG + mechanical-eval suite.
 * No network. No API keys. No invented $. Median of N local runs.
 *
 * Usage:
 *   node tools/bench-runtime.cjs
 *   node tools/bench-runtime.cjs --runs 7 --json
 *   npm run bench
 */

const { spawnSync } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_N = 7;

function median(nums) {
  const a = [...nums].sort((x, y) => x - y);
  const mid = Math.floor(a.length / 2);
  return a.length % 2 ? a[mid] : (a[mid - 1] + a[mid]) / 2;
}

function wallMs(fn) {
  const t0 = process.hrtime.bigint();
  fn();
  const t1 = process.hrtime.bigint();
  return Number(t1 - t0) / 1e6;
}

function runNode(relArgs) {
  const r = spawnSync(process.execPath, relArgs, {
    cwd: ROOT,
    encoding: 'utf8',
    env: process.env,
  });
  if (r.status !== 0) {
    throw new Error(
      'bench child failed: ' +
        relArgs.join(' ') +
        ' status=' +
        r.status +
        '\n' +
        (r.stderr || r.stdout || '')
    );
  }
}

function parseArgs(argv) {
  let runs = DEFAULT_N;
  let json = false;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--runs' && argv[i + 1]) {
      runs = Math.max(1, parseInt(argv[++i], 10) || DEFAULT_N);
    } else if (argv[i] === '--json') {
      json = true;
    }
  }
  return { runs, json };
}

function main() {
  const { runs, json } = parseArgs(process.argv.slice(2));
  const demoMs = [];
  const evalMs = [];

  for (let i = 0; i < runs; i++) {
    demoMs.push(
      wallMs(() =>
        runNode([
          path.join('bin', 'orchestrator-demo.cjs'),
          '--write',
          path.join('evals', 'results', 'bench-demo-receipt.json'),
          'bench-goal',
        ])
      )
    );
    evalMs.push(wallMs(() => runNode([path.join('evals', 'mechanical-eval.cjs')])));
  }

  const receipt = {
    schema: 'mycelium-harness.offline-bench/v1',
    version: 1,
    ts: new Date().toISOString(),
    runs,
    units: 'wall_ms',
    note: 'Local wall-clock only. No billed $. No API. Noise varies by host.',
    demo_dag: {
      command: 'node bin/orchestrator-demo.cjs',
      samples_ms: demoMs.map((n) => Math.round(n * 100) / 100),
      median_ms: Math.round(median(demoMs) * 100) / 100,
      min_ms: Math.round(Math.min(...demoMs) * 100) / 100,
      max_ms: Math.round(Math.max(...demoMs) * 100) / 100,
    },
    mechanical_eval_suite: {
      command: 'node evals/mechanical-eval.cjs',
      samples_ms: evalMs.map((n) => Math.round(n * 100) / 100),
      median_ms: Math.round(median(evalMs) * 100) / 100,
      min_ms: Math.round(Math.min(...evalMs) * 100) / 100,
      max_ms: Math.round(Math.max(...evalMs) * 100) / 100,
    },
  };

  const outDir = path.join(ROOT, 'evals', 'results');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'offline-bench.json');
  fs.writeFileSync(outPath, JSON.stringify(receipt, null, 2) + '\n');

  if (json) {
    process.stdout.write(JSON.stringify(receipt, null, 2) + '\n');
  } else {
    process.stdout.write('offline-bench runs=' + runs + '\n');
    process.stdout.write(
      '  demo_dag median_ms=' +
        receipt.demo_dag.median_ms +
        ' (min=' +
        receipt.demo_dag.min_ms +
        ' max=' +
        receipt.demo_dag.max_ms +
        ')\n'
    );
    process.stdout.write(
      '  mechanical_eval_suite median_ms=' +
        receipt.mechanical_eval_suite.median_ms +
        ' (min=' +
        receipt.mechanical_eval_suite.min_ms +
        ' max=' +
        receipt.mechanical_eval_suite.max_ms +
        ')\n'
    );
    process.stdout.write('  wrote ' + outPath + '\n');
  }
  process.exit(0);
}

main();
