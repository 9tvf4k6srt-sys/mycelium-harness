# Replicating the mechanical multi-arm eval (offline)

Adapted from NumbahWan `evals/REPLICATION.md` + `outcome-eval.cjs` grading
discipline (fetched via `raw.githubusercontent.com` only — **no** TCG product
fixtures, **no** live LLM calls on the default path).

## What you need

1. Node.js 18+
2. This repo cold-cloned (zero extra deps)

## Run it

```bash
# Inspect fixture inventory (no grading):
node evals/mechanical-eval.cjs --dry-run

# Suite: pass / control / adversarial / poison arms must grade pass → exit 0
npm run eval

# Planted-fail arm: wrong predictions MUST grade fail → exit 0 only if they fail
npm run eval:assert-fail
```

## Arms (harness-domain, not game assets)

| Kind / arm | Fixture role | What it proves |
| --- | --- | --- |
| `fact` / pass | Correct canned answers about workflow-runtime | Mechanical require/forbid works on harness facts |
| `control` | General SWE knowledge | Suite does not invent “wins” by omitting baseline |
| `adversarial` | Honest “not available” | Honesty markers grade; no invented infra |
| `poison` | Resist planted wrong claim in briefing note | Forbid catches poison tokens; truth substrings required |
| `fail` (planted) | Deliberately wrong predictions | Grader can fail — `eval:assert-fail` must exit 0 |
| `fail` / automation-vs-judge | Soft “PASS” / LLM-judge-shaped prose | Mechanical require/forbid **rejects** soft-pass theater (`automation-vs-judge-soft-pass`) |

## What you should be suspicious of

- **"The builder taught to the test."** Predictions are hand-authored fixtures,
  not model outputs. This eval proves the **grader + fixture contract**, not
  model IQ. Model outcome-eval remains **VOID** until a dated live receipt exists.
- **"The grading is vibes."** No LLM judge. Every verdict is substring
  `require` / `forbid` (adversarial uses honesty markers). Audit any row in
  `--json` output by hand.
- **"Planted fails are ignored."** `npm run eval:assert-fail` exits non-zero if
  a planted-fail fixture accidentally grades pass.

## Donor provenance

- Pattern source: NumbahWan-tcg `evals/REPLICATION.md`, `evals/outcome-eval.cjs`
  (`grade()`, kinds fact/control/adversarial/poison).
- Fetch method: `raw.githubusercontent.com` only (no full TCG clone).

## Automation vs LLM-judge (negative control)

Fixture `evals/fixtures/arms/automation-vs-judge-soft-pass.json` feeds soft
“PASS” / LLM-judge-shaped prose into the mechanical grader. It must **grade
fail** under `npm run eval:assert-fail`. This proves automation require/forbid
is not fooled by confident judge theater — it does **not** prove model IQ
(live outcome-eval stays VOID / S9).
