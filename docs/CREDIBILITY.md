# CREDIBILITY

Honesty layer for screeners and agents. Dated claims only; no invented greens.

**As of:** 2026-09-13 (Asia/Taipei). Repo: `mycelium-harness` v0.1.0 scaffold.

## What these tests prove

| Check | Command | Proves |
| --- | --- | --- |
| Orchestration stub contract | `npm test` (`node --test`) | Deterministic plan/step/handoff behavior of the in-repo stub; pure Node, no network |
| Offline demo | `npm run demo` | Cold-clone runnable CLI that prints a stable plan JSON and exit 0 |
| Mechanical grader fixture | `evals/fixtures/exact-match.json` + grader in `evals/README.md` | Exact-string grading is mechanical and reproducible offline |
| CI gate | `.github/workflows/ci.yml` | Same `node --test` suite runs on push/PR (when Actions is enabled) |

## What these tests do **not** prove

- **Model quality / agent IQ** — no LLM calls in the default path; no held-out outcome-eval receipt published yet.
- **Production orchestration** — stub only; not a multi-agent runtime, tool sandbox, or durable workflow engine.
- **Latency / cost / context efficiency** — not measured in this scaffold.
- **Security of agent tool use** — no sandbox or allowlist enforcement tests yet.
- **Stars, marketing copy, or README polish** — not evidence of harness maturity.

## Anti-sycophancy note

If a future PR adds model-eval scores, require: dated command, fixture hash or commit SHA, provider/model id, and an explicit VOID until those exist. Do not treat self-praise as green.
