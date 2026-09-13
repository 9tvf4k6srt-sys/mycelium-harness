# mycelium-harness

Track A **agentic harness** portfolio: reproducible ground-truth checks a stranger can cold-clone and run **offline**.

Impress = deterministic workflow-runtime tests + mechanical multi-arm eval + honest CREDIBILITY exclusions — **not** game assets, not a 765 MiB HTML dump, not model IQ claims.

## 2-minute offline demo

```bash
git clone https://github.com/9tvf4k6srt-sys/mycelium-harness.git
cd mycelium-harness
npm test
npm run eval
npm run eval:assert-fail
npm run demo
```

No API keys. No network after clone. Node ≥ 18.

`npm run demo` prints a versioned run receipt and writes `evals/results/demo-receipt.json` (gitignored).

## What you get

| Surface | Role |
| --- | --- |
| `lib/workflow-runtime.cjs` | Adapted DAG runtime: budgets, retries, cancel, fail-closed receipts |
| `tests/` | Reliability + mechanical-eval + receipt sequence contracts (`node --test`) |
| `bin/orchestrator-demo.cjs` | Offline DAG demo; writes versioned receipt JSON |
| `evals/mechanical-eval.cjs` | Multi-arm mechanical grader (pass/control/adversarial/poison + planted fail) |
| `evals/REPLICATION.md` | Cold-clone checklist for the offline eval |
| `docs/CREDIBILITY.md` | What is / is not proven (dated) |
| `AGENTS.md` | Short progressive-disclosure front door |
| `.github/workflows/ci.yml` | Intended CI (`npm test` + eval + demo); **Actions green VOID** until a real run exists |

## CI status (honesty)

**VOID on remote until GitHub Actions shows a real green run.** Prefer documenting OAuth `workflow` scope gaps over inventing a badge/URL. See [docs/CREDIBILITY.md](docs/CREDIBILITY.md).

## Credibility

See [docs/CREDIBILITY.md](docs/CREDIBILITY.md). Default path does **not** claim model quality.

## License

MIT
