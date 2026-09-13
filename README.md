# mycelium-harness

Track A **agentic harness** portfolio: reproducible ground-truth checks a stranger can cold-clone and run **offline**.

Impress = deterministic tests + honest CREDIBILITY exclusions + thin agent front door — **not** game assets, not a 765 MiB HTML dump.

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
| `tests/orchestration.test.cjs` | Deterministic orchestration stub (`node --test`) |
| `bin/orchestrator-demo.cjs` | One-command offline plan demo |
| `evals/` | Mechanical grader + fixture |
| `docs/CREDIBILITY.md` | What is / is not proven |
| `AGENTS.md` | Short progressive-disclosure front door |
| `.github/workflows/ci.yml` | CI runs the same test suite |

## Credibility

See [docs/CREDIBILITY.md](docs/CREDIBILITY.md). Default path does **not** claim model quality.

## License

MIT
