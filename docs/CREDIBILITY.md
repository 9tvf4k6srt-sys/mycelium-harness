# CREDIBILITY

Honesty layer for screeners and agents. Dated claims only; no invented greens.

**As of:** 2026-09-13 (Asia/Taipei). Repo: `mycelium-harness` v0.1.0.
**Bar MH-Upgrade Foundation id:** `7ef0d9b25fbc3be2ff07fc5b1e0184223a5570b6438ecb7bfb3279f9167a637b`.
**Donor file SHA-256** (`NumbahWan-tcg` `tools/lib/workflow-runtime.cjs` raw → `lib/workflow-runtime.cjs`, byte-identical at port): `cfb2b2d579870bf19ad2e4eb6635455281a29772126d69f2bbe51d0d3364a334` (game tools absent in donor lib; DAG/budgets/retries/cancel/receipts retained).

## What these tests prove (local / cold-clone)

| Check | Command | Proves |
| --- | --- | --- |
| Workflow DAG + fail-closed | `npm test` (`node --test`) | Unsorted DAG order, dependency block on failure, reject empty/cycle/unknown tool; pure Node |
| Nonzero ≠ PASS | `npm test` | Exit code 9 with stdout `PASS…` still fails the step and blocks dependents |
| Cancel / timeout | `npm test` | Pre-aborted signal → `cancelled` with 0 calls; hung child killed at deadline; post-deadline completion cannot succeed |
| Adversarial shell-literal | `npm test` | `$(…)`, backticks, `;`, pipes stay literal argv (no shell) via `executeNode` |
| Receipt hygiene | `npm test` | Receipts omit raw args / stdout / stderr secrets |
| Offline demo | `npm run demo` | Tiny trusted DAG runs real Node subprocesses; prints JSON receipt (`awaiting_review`) |

## What is VOID / not proven yet

| Claim | Status | Why |
| --- | --- | --- |
| GitHub Actions green | **VOID** until Actions enabled + token has `workflow` scope to push `.github/workflows/ci.yml` | **Remote tree currently has no** `.github/workflows/ci.yml` (OAuth push rejected). File retained in local scaffold only. Do **not** invent a green Actions URL. |
| Model quality / agent IQ | **Not claimed** | No LLM calls on the default path; no held-out outcome-eval receipt. |
| Production multi-agent product | **Not claimed** | Runtime is a deterministic DAG executor with budgets/retries/cancel — not a hosted agent platform. |
| Game / castle / i18n pipeline | **Out of scope** | Donor NumbahWan factory/CLI/game tests were intentionally not ported. |
| Latency / cost / context efficiency | **Not measured** | — |
| OS security sandbox | **Not claimed** | `executeNode` uses `shell: false` + process-group kill; not an OS sandbox. |

## CI honesty

- File present **locally** (scaffold): `.github/workflows/ci.yml` (runs `node --test` + demo smoke).
- File **absent on `origin/main`** as of this dated note: `git push` refused workflow path without OAuth `workflow` scope; Contents API also failed.
- Treat README “CI” wording as **VOID on remote** until a human re-pushes `ci.yml` with workflow scope and enables Actions.
- Prefer documenting the scope gap over inventing greens.

## Anti-sycophancy note

No wow / instant-hire claims. If a future PR adds model-eval scores, require: dated command, fixture hash or commit SHA, provider/model id, and explicit VOID until those exist.
