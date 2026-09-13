# Industry thesis — mycelium-harness vs IT/AI hiring now

**As of:** 2026-09-13 (Asia/Taipei).  
**Bar:** MH-Recruiter-Sniff Foundation sha `ec2c6ec3d1868562dd224a010d14eadcee66184b17a2db33ca52d481a370f316`.  
**Skills map Exact Source:** IT-AI-Skills Foundation sha `19022d657a63387b82ac400c39121dd1709ef9cc131c43d6dc0487e40683feb4`.  
**Honesty layer:** [CREDIBILITY.md](./CREDIBILITY.md).  
**Stranger-visible CI:** [Actions run 34734451796](https://github.com/9tvf4k6srt-sys/mycelium-harness/actions/runs/34734451796) (fetched green, conclusion success).

This page maps **what IT/AI employers signal now** (Track A/B from IT-AI-Skills) → **what this repo proves / does not**. It cites 104-class claims **only as already recorded** in that Foundation. No invented company roadmaps. No hire guarantee.

---

## Owned framing

Recruiter sniff success ≠ “covers every GenAI JD skill.”  
Success here = proves the **scarce harness/eval craft** labs hire for in Track A reliability niches: fail-closed orchestration, mechanical evaluation, CI, honest voids — and **names** Track A/B from Exact Sources so keyword density is not mistaken for competence.

---

## Track A (build) — IT-AI-Skills musts → MH

| Track A must (IT-AI-Skills `19022d65…`) | MH proves today? | How / gap |
| --- | --- | --- |
| Python + DL (PyTorch / TensorFlow) | **No** (by design) | Harness is Node; do not treat this repo as a Python ML portfolio |
| LLM app RAG / Agent tooling | **Partial** | Agent **harness** craft (tools, budgets, receipts, eval arms) — not RAG product / LangChain app code |
| Backend Node + CI/CD + Git | **Yes** | Node workflow-runtime; cold-clone `npm test` / `eval` / `demo`; Actions green [34734451796](https://github.com/9tvf4k6srt-sys/mycelium-harness/actions/runs/34734451796) |
| Process / fab eng (電鍍製程-class domain) | **Out of scope** | No semi process claims |
| Agent/Harness concepts (nice→rising) | **Yes** | `lib/workflow-runtime.cjs` + multi-arm mechanical eval + thin `AGENTS.md` + load-on-demand skill |

---

## Track B (apply / sell / AI literacy) — sniff relevance

| Track B must (IT-AI-Skills `19022d65…`) | MH proves? | Gap |
| --- | --- | --- |
| 流程自動化 / tool literacy as industry demand (104 AI report: top skill **流程自動化**; ChatGPT/Gemini in top tools; non-eng PM/sales/marketing AI openings **+165–263%** over 5y — Foundation S1) | **Weak→articulated here** | Thesis link: deterministic gates + planted-fail eval beat vibe demos for automation trust; MH is not a ChatGPT usage case study |
| AI PM / communication / 轉譯 | **Partial** | CREDIBILITY anti-sycophancy ≈ professional claim hygiene; not a PM roadmap case study |
| Dual eng + commercial reality | **Explicit (this page)** | MH demonstrates Track A **reliability/eval** niche — **not** a full JD checklist |

104-class claims above are **Foundation-cited only** (IT-AI-Skills Source Ledger S1). This repo does not re-derive talent-market forecasts.

---

## Explicit out of scope

| Claim | Status |
| --- | --- |
| Python / ML / PyTorch portfolio | **Not this repo** |
| Fab / process engineering competence | **Out of scope** |
| Instant hire / “ready for any GenAI JD” | **Not claimed** |
| AGI-ready / best-in-world / soft “future-proof” | **Banned** (see bets below) |
| Live held-out model outcome quality | **VOID** until dated receipt (CREDIBILITY; sniff **S9**) |

---

## Forward engineering bets (with falsifiers)

These are **design bets already partially shipped in tree**, not adjectives.

| Bet | What it means in MH | Falsifier |
| --- | --- | --- |
| **Eval layer separation** | Reliability/runtime tests (`npm test`) stay distinct from mechanical multi-arm eval (`npm run eval` / `eval:assert-fail`) and from any future live model outcome-eval | Merging layers so a green mechanical fixture is marketed as model IQ |
| **Versioned receipts** | Demo + tests emit `mycelium-harness.run-receipt/v1` with monotonic event seq and terminal `run_finished` | Receipts without version / seq / terminal event, or raw secrets in receipt fields |
| **Fail-closed tools** | Nonzero exit ≠ PASS; cancel/timeout; adversarial shell-literals stay argv (`shell: false`) | Soft-pass on nonzero, hung children succeeding post-deadline, or shell interpolation of untrusted args |
| **Progressive skills** | Thin `AGENTS.md` + load-on-demand [`skills/review-mycelium-harness/SKILL.md`](../skills/review-mycelium-harness/SKILL.md) (agentskills `name`+`description`) | Bulk doctrine dumps in the front door; inventing capabilities not in tree |

Live outcome-eval remains **VOID** until API key + dated receipt under `evals/results/` updates CREDIBILITY. That residual is intentional.

---

## How to verify (stranger path)

1. Cold-clone commands in [README.md](../README.md)
2. Dated prove/VOID table in [CREDIBILITY.md](./CREDIBILITY.md)
3. CI: https://github.com/9tvf4k6srt-sys/mycelium-harness/actions/runs/34734451796
4. One-pass review skill: [`skills/review-mycelium-harness/SKILL.md`](../skills/review-mycelium-harness/SKILL.md)

**Not claimed after MH-Recruiter-Sniff steps 0–3:** hire. Harder to dismiss for harness/eval Track A roles: yes — if the commands still pass.
