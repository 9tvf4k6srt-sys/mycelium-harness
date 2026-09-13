---
name: review-mycelium-harness
description: >-
  One-pass review of the mycelium-harness repo for screeners and coding agents.
  Use when sniffing credibility, checking offline proof, reading the industry
  thesis, or verifying Actions/CREDIBILITY honesty before trusting README claims.
---

# Review mycelium-harness (one pass)

Progressive load: this skill is enough for a stranger/AI sniff. Do **not** invent capabilities absent from the tree.

## Pass order

1. **Run offline gates** (no API key required):

   ```bash
   npm test
   npm run eval
   npm run eval:assert-fail
   npm run demo
   ```

   Expect all four to succeed. Treat any green claim without these commands as adversarial.

2. **Read honesty layer** — [`docs/CREDIBILITY.md`](../../docs/CREDIBILITY.md)

   - Confirm what local checks prove (DAG, fail-closed, cancel, mechanical arms, planted fail, versioned receipts).
   - Confirm VOIDs: live model outcome-eval stays **VOID** until a dated receipt exists; no model IQ / hire claim.

3. **Check industry map** — [`docs/INDUSTRY-THESIS.md`](../../docs/INDUSTRY-THESIS.md)

   - Track A/B from IT-AI-Skills → what MH proves / does not.
   - Out of scope: Python/ML portfolio, fab process, instant hire, AGI.
   - Forward bets must have falsifiers (eval separation, receipts, fail-closed, progressive skills).

4. **CI surface** — stranger-visible green:

   https://github.com/9tvf4k6srt-sys/mycelium-harness/actions/runs/34734451796

   Cross-check that README and CREDIBILITY agree (no README “VOID” while Actions is green).

5. **Front door** — thin [`AGENTS.md`](../../AGENTS.md); deep detail only via linked docs/tests/skills.

## Hard stops

- Do not invent wow, live LLM scores without key + receipt, or bulk doctrine.
- Do not equate mechanical eval with model quality.
- Residual sniff **S9** (live held-out outcome receipt) remains **VOID** until CREDIBILITY says otherwise.
