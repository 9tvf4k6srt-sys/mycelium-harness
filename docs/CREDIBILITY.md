# CREDIBILITY

Honesty layer for screeners and agents. Dated claims only; no invented greens.

**As of:** 2026-09-13 (Asia/Taipei). Repo: `mycelium-harness` v0.1.0.
**Bar MH-Upgrade Foundation id:** `7ef0d9b25fbc3be2ff07fc5b1e0184223a5570b6438ecb7bfb3279f9167a637b`.
**Bar MH-Gaps-Close Foundation id:** `578c1aaeff39c9ba3f67e4d750031b9898297afbcaa4c8483d9cfd9fc8111504`.
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
| Automation vs LLM-judge | `npm run eval:assert-fail` | Soft “PASS” / LLM-judge-shaped prose fails mechanical require/forbid (`automation-vs-judge-soft-pass`) |
| Offline wall-ms bench | `npm run bench` | Median wall-ms for demo DAG + mechanical-eval suite (local host; no billed $) |

## Measured offline (A1)

Host: Builder box (Linux). Command: `npm run bench -- --runs 7 --json` (writes `evals/results/offline-bench.json`). Schema: `mycelium-harness.offline-bench/v1`. **No billed $. No API.** Numbers are wall-clock on this host; re-run to reproduce noise.

| Surface | Command | N | Median wall-ms | Min | Max | Measured at (UTC) |
| --- | --- | --- | --- | --- | --- | --- |
| Demo DAG | `node bin/orchestrator-demo.cjs` | 7 | 224.2 | 224.07 | 227.29 | 2026-09-13T05:46:17.071Z |
| Mechanical eval suite | `node evals/mechanical-eval.cjs` | 7 | 74.26 | 70.91 | 81.98 | 2026-09-13T05:46:17.071Z |

## What is VOID / not proven yet (intentional)

| Claim | Status | Why |
| --- | --- | --- |
| MEMORY-HELPS / live outcome-eval (S9) | **VOID** | Donor live multi-model outcome-eval not ported (would need API keys). Offline mechanical arms only. User lock: do not paper over. |
| Model quality / agent IQ | **Not claimed** | No LLM calls on the default path; mechanical fixtures ≠ model proof. |
| OS security sandbox | **Not claimed** | `executeNode` uses `shell: false` + process-group kill; not an OS sandbox. |
| Production multi-agent product | **Not claimed** | Runtime is a deterministic DAG executor with budgets/retries/cancel — not a hosted agent platform. |
| Game / castle / i18n pipeline | **Out of scope** | Donor NumbahWan factory/CLI/game tests were intentionally not ported. |
| Instant hire / best-in-world | **Banned** | Soft-sell claims are out of scope by design. |

## Residual vs “hard-to-dismiss”

**Now falsifiable locally:** DAG/fail-closed/cancel, mechanical multi-arm grading, planted-fail + automation-vs-judge negative controls, versioned event receipts, offline wall-ms medians (`npm run bench`), stranger-visible Actions green on HEAD.

**Still easy to dismiss (intentional VOID / out-of-scope only):** no live model outcome receipt (S9), no OS sandbox claim, no hosted multi-agent product, no hire/wow claims. That residual is intentional honesty — not an invitation to invent wow or empty the VOID table by deleting S9.

## CI honesty

- File: `.github/workflows/ci.yml` runs `npm test`, `npm run eval`, `npm run eval:assert-fail`, `npm run demo`.
- **Primary stranger-visible HEAD green:** https://github.com/9tvf4k6srt-sys/mycelium-harness/actions/runs/34735764321 (sha `668cab1`, 2026-09-13, conclusion success).
- First stranger-visible green (history): https://github.com/9tvf4k6srt-sys/mycelium-harness/actions/runs/34734451796 (sha `2b184e0`).

## Anti-sycophancy note

No wow / instant-hire claims. If a future PR adds model-eval scores, require: dated command, fixture hash or commit SHA, provider/model id, and explicit VOID until those exist. Soft “PASS” prose is not a green — see A2 fixture.
