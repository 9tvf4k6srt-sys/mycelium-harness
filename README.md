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
npm run bench   # optional offline wall-ms median
```

No API keys. No network after clone. Node ≥ 18.

`npm run demo` prints a versioned run receipt and writes `evals/results/demo-receipt.json` (gitignored).

## What you get

| Surface | Role |
| --- | --- |
| `lib/workflow-runtime.cjs` | Adapted DAG runtime: budgets, retries, cancel, fail-closed receipts |
| `tests/` | Reliability + mechanical-eval + receipt sequence contracts (`node --test`) |
| `bin/orchestrator-demo.cjs` | Offline DAG demo; writes versioned receipt JSON |
| `lib/orchestrator.cjs` | **Demo-shim** re-export of `workflow-runtime` only — not a second runtime |
| `tools/bench-runtime.cjs` | Offline wall-ms median for demo DAG + eval suite (`npm run bench`) |
| `evals/mechanical-eval.cjs` | Multi-arm mechanical grader (pass/control/adversarial/poison + planted fail) |
| `evals/REPLICATION.md` | Cold-clone checklist for the offline eval |
| `docs/CREDIBILITY.md` | What is / is not proven (dated) |
| `docs/INDUSTRY-THESIS.md` | IT-AI Track A/B → what MH proves / does not |
| `skills/review-mycelium-harness/SKILL.md` | One-pass review skill (agentskills) |
| `AGENTS.md` | Short progressive-disclosure front door |
| `.github/workflows/ci.yml` | CI: `npm test` + eval + planted-fail + demo — [green run](https://github.com/9tvf4k6srt-sys/mycelium-harness/actions/runs/34735764321) |

## CI status (honesty)

Primary HEAD green (fetched): https://github.com/9tvf4k6srt-sys/mycelium-harness/actions/runs/34735764321 — see [docs/CREDIBILITY.md](docs/CREDIBILITY.md). First green (history): https://github.com/9tvf4k6srt-sys/mycelium-harness/actions/runs/34734451796.

## Credibility

See [docs/CREDIBILITY.md](docs/CREDIBILITY.md). Default path does **not** claim model quality.

## Industry thesis

See [docs/INDUSTRY-THESIS.md](docs/INDUSTRY-THESIS.md) (Track A/B map + falsifiable forward bets). One-pass review: [skills/review-mycelium-harness/SKILL.md](skills/review-mycelium-harness/SKILL.md).

## License

MIT
