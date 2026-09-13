# mycelium-harness

Track A **agentic harness** portfolio: reproducible ground-truth checks a stranger can cold-clone and run **offline**.

Impress = deterministic workflow-runtime tests + honest CREDIBILITY exclusions — **not** game assets, not a 765 MiB HTML dump, not model IQ claims.

## 2-minute offline demo

```bash
git clone https://github.com/9tvf4k6srt-sys/mycelium-harness.git
cd mycelium-harness
npm test
npm run demo
```

No API keys. No network after clone. Node ≥ 18.

## What you get

| Surface | Role |
| --- | --- |
| `lib/workflow-runtime.cjs` | Adapted DAG runtime: budgets, retries, cancel, fail-closed receipts |
| `tests/orchestration.test.cjs` | Subset of donor reliability tests (`node --test`) |
| `bin/orchestrator-demo.cjs` | One-command offline DAG demo (real subprocesses) |
| `evals/` | Mechanical grader + fixture |
| `docs/CREDIBILITY.md` | What is / is not proven (dated) |
| `AGENTS.md` | Short progressive-disclosure front door |
| `.github/workflows/ci.yml` | Intended CI (local scaffold; **not on remote** until `workflow` scope) |

## CI status (honesty)

**VOID on remote until GitHub Actions is enabled and the pushing token has `workflow` scope.** The workflow file is kept in-tree; absence of a green Actions badge/URL is intentional — do not invent one. See [docs/CREDIBILITY.md](docs/CREDIBILITY.md).

## Credibility

See [docs/CREDIBILITY.md](docs/CREDIBILITY.md). Default path does **not** claim model quality.

## License

MIT
