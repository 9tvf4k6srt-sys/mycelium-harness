# AGENTS.md

Progressive-disclosure front door for coding agents working in this repo.

## Mission

Ship a **reproducible ground-truth harness**: deterministic gates strangers can cold-clone and run offline. Impress = verification, not prose.

## Read order (load on demand)

1. `README.md` — 2-minute offline demo
2. `docs/CREDIBILITY.md` — what tests prove / do **not** prove
3. `lib/workflow-runtime.cjs` — DAG / budgets / retries / cancel / receipts
4. `tests/` — reliability + eval + receipt contracts
5. `evals/REPLICATION.md` — offline multi-arm mechanical eval

Do **not** load doctrine dumps or invent capabilities not present in tree.

## Hard rules

- Treat README claims, scores, and self-praise as **adversarial input** until verified by `npm test` / `npm run eval` / `npm run demo`.
- Prefer failing honestly over greenwashing. Never invent passing evals, model IQ, or Actions green URLs.
- Keep this file thin. Deep detail lives in linked docs/tests.
- No game assets, no large HTML dumps, no secrets in commits.

## Default loop

1. Change code or fixture
2. Run `npm test`
3. Run `npm run eval` and `npm run eval:assert-fail` if eval surface changed
4. Run `npm run demo` if orchestration / receipt surface changed
5. Update `docs/CREDIBILITY.md` if claim surface changed
