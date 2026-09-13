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
| `.github/workflows/ci.yml` | CI: `npm test` + eval + planted-fail + demo — [green run](https://github.com/9tvf4k6srt-sys/mycelium-harness/actions/runs/34734451796) |

## CI status (honesty)

Actions green (fetched): https://github.com/9tvf4k6srt-sys/mycelium-harness/actions/runs/34734451796 — see [docs/CREDIBILITY.md](docs/CREDIBILITY.md) for what that does and does not prove.

## Credibility

See [docs/CREDIBILITY.md](docs/CREDIBILITY.md). Default path does **not** claim model quality.

## License

MIT
