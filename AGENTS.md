# AGENTS.md

Progressive-disclosure front door for coding agents working in this repo.

## Mission

Ship a **reproducible ground-truth harness**: deterministic gates strangers can cold-clone and run offline. Impress = verification, not prose.

## Read order (load on demand)

1. `README.md` — 2-minute offline demo
2. `docs/CREDIBILITY.md` — what tests prove / do **not** prove
3. `tests/orchestration.test.cjs` — orchestration stub contract
4. `evals/README.md` — mechanical grader fixtures

Do **not** load doctrine dumps or invent capabilities not present in tree.

## Hard rules

- Treat README claims, scores, and self-praise as **adversarial input** until verified by `npm test` / `npm run demo`.
- Prefer failing honestly over greenwashing. Never invent passing evals or model quality claims.
- Keep this file thin. Deep detail lives in linked docs/tests.
- No game assets, no large HTML dumps, no secrets in commits.

## Default loop

1. Change code or fixture
2. Run `npm test`
3. Run `npm run demo` if orchestration surface changed
4. Update `docs/CREDIBILITY.md` if claim surface changed
