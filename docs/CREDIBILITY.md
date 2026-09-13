# CREDIBILITY

Honesty layer for screeners and agents. Dated claims only; no invented greens.

**As of:** 2026-09-13 (Asia/Taipei). Repo: `mycelium-harness` v0.1.0.
**Bar MH-Upgrade Foundation id:** `7ef0d9b25fbc3be2ff07fc5b1e0184223a5570b6438ecb7bfb3279f9167a637b`.
**Donor file SHA-256** (`NumbahWan-tcg` `tools/lib/workflow-runtime.cjs` raw → `lib/workflow-runtime.cjs`, byte-identical at port): `cfb2b2d579870bf19ad2e4eb6635455281a29772126d69f2bbe51d0d3364a334` (game tools absent in donor lib; DAG/budgets/retries/cancel/receipts retained).

## What these checks prove (local / cold-clone)

| Check | Command | Proves |
| --- | --- | --- |
| Workflow DAG + fail-closed | `npm test` | Unsorted DAG order, dependency block on failure, reject empty/cycle/unknown tool; pure Node |
| Nonzero ≠ PASS | `npm test` | Exit code 9 with stdout `PASS…` still fails the step and blocks dependents |
| Cancel / timeout | `npm test` | Pre-aborted signal → `cancelled` with 0 calls; hung child killed at deadline; post-deadline completion cannot succeed |
| Adversarial shell-literal | `npm test` | `$(…)`, backticks, `;`, pipes stay literal argv (no shell) via `executeNode` |
| Receipt hygiene | `npm test` | Receipts omit raw args / stdout / stderr secrets |
| Versioned run receipts | `npm test` + `npm run demo` | Demo writes `mycelium-harness.run-receipt/v1` JSON; events seq monotonic; terminal `run_finished` |
| Offline demo | `npm run demo` | Tiny trusted DAG runs real Node subprocesses; prints + writes receipt (`awaiting_review`) |
| Mechanical multi-arm eval | `npm run eval` | Harness-domain fact/control/adversarial/poison fixtures grade pass offline (require/forbid; no LLM) |
| Planted fail must fail | `npm run eval:assert-fail` | Deliberately wrong predictions grade fail — grader is not a tautology |

## What is VOID / not proven yet

| Claim | Status | Why |
| --- | --- | --- |
| GitHub Actions green | **Fetched green** 2026-09-13 — run https://github.com/9tvf4k6srt-sys/mycelium-harness/actions/runs/34734451796 (sha `2b184e0`, conclusion success) | Stranger-visible CI for `npm test` + eval + planted-fail + demo. Still not a hire guarantee. |
| Model quality / agent IQ | **Not claimed** | No LLM calls on the default path; no held-out live outcome-eval receipt. Mechanical fixtures ≠ model proof. |
| MEMORY-HELPS / live outcome-eval | **VOID** | Donor live multi-model outcome-eval not ported (would need API keys). Offline mechanical arms only. |
| Production multi-agent product | **Not claimed** | Runtime is a deterministic DAG executor with budgets/retries/cancel — not a hosted agent platform. |
| Game / castle / i18n pipeline | **Out of scope** | Donor NumbahWan factory/CLI/game tests were intentionally not ported. |
| Latency / cost / context efficiency | **Not measured** | — |
| OS security sandbox | **Not claimed** | `executeNode` uses `shell: false` + process-group kill; not an OS sandbox. |

## Residual vs “hard-to-dismiss”

**Now falsifiable locally:** DAG/fail-closed/cancel, mechanical multi-arm grading, planted-fail negative control, versioned event receipts.

**Still easy to dismiss for hire bar:** no live model outcome receipt, no latency/cost numbers, no OS sandbox claim. Actions green is now falsifiable. That residual is intentional honesty — not an invitation to invent wow.

## CI honesty

- File: `.github/workflows/ci.yml` runs `npm test`, `npm run eval`, `npm run eval:assert-fail`, `npm run demo`.
- First stranger-visible green: https://github.com/9tvf4k6srt-sys/mycelium-harness/actions/runs/34734451796 (2026-09-13).

## Anti-sycophancy note

No wow / instant-hire claims. If a future PR adds model-eval scores, require: dated command, fixture hash or commit SHA, provider/model id, and explicit VOID until those exist.
