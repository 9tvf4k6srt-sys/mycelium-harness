# evals

Mechanical graders only on the default path. No model calls. No TCG fixtures.

## Offline multi-arm suite

```bash
npm run eval              # pass/control/adversarial/poison → exit 0
npm run eval:assert-fail  # planted fail fixtures must fail
node evals/mechanical-eval.cjs --dry-run
```

See [REPLICATION.md](./REPLICATION.md) for the checklist an outsider can follow.

## Legacy exact-match fixture

File: `fixtures/exact-match.json` — still valid as a one-liner smoke; the
multi-arm suite supersedes it for CI credibility.

## What this proves / does not prove

Proves: offline mechanical require/forbid grading across arms; planted fail fails.
Does **not** prove: agent reasoning quality, model IQ, or live MEMORY-HELPS.
See `docs/CREDIBILITY.md`.
