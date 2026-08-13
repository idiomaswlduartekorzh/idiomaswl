# F0.2b.8 — Sentence Completion audit dossier

Date: 2026-08-09  
Decision: **audit PASS; bank and content certification BLOCKED**  
Scope: 3 formative passages, 18 questions, 18 canonical answers and 20 raw accepted entries.

## Executive Summary

- **The audit closes, but the bank does not.** All 3/3 assets remain quarantined.
- **The independent answer match count is 18/18.** Material ambiguities=1; key conflicts=0.
- **Answer-length concentration is a measurable shortcut risk.** Always choosing two words hits 13/18, while the modal length by question position hits 14/18.
- **The runtime remains guided-training.** Its explicit check and immediate post-check key/explanation do not constitute Practice or Exam simulation.
- **Stop before F0.2b.9 Summary Completion.** The next unit remains not started and F0.2b remains open.

| Lane | Board | Audited result |
|---|---:|---|
| Rights and provenance | ✅ | 3/3 assets are unknown-quarantined. The 17-source ledger records 14 retrieved responses and 3 HTTP 403 responses without treating availability as factual or rights verification. |
| Full-stack and data | ✅ | Catalog, baseline and registry hashes reconcile 3/3; seven direct learner files and a 15-file render closure remain unchanged. The declared chronology and two-stage packet hashes are validated locally. |
| IELTS expert | ✅ | The expert matched 18/18 stored canonical answers. Question evidence follows passage order in 3/3 sets and every selected span respects the two-word word limit. `sentence-makerspaces-01` has one material ambiguity and `sentence-makerspaces-04` one minor ambiguity. |
| Cognitive walkthrough | ✅ | The walkthrough covers 3/3 passages and 18/18 questions with grammar prediction, word-limit checks, evidence search, span verification, spelling, competitor comparison and repair actions without solution leakage. |
| Anti-bias and leakage | ✅ | Two-word answers account for 13/18 canonical keys; the same-position word-count heuristic hits 14/18, while prompt-only review produced 0 unique exact predictions. Hints are available before all 18 responses and 17 name a location or anchor. |
| UI/UX and accessibility | ➖ | Seven direct hashes and the 15-file render closure, including CSS and layouts, are unchanged; no learner-facing data, copy, DOM, interaction or styling was modified by F0.2b.8. |
| Playwright | ➖ | The activation contract requires Playwright if any learner hash, render-closure membership, runtime interaction, scoring, persistence, accessibility markup or styling changes. |

## Rights, provenance and factual review

All three records remain deny-by-default. Candidate sources and a negative exact-match search do not establish passage authorship, ownership, license, authorization or independent human approval. Exact factual assessments:

- supported: 3
- oversimplified: 8
- unsupported: 0
- untraceable: 4

## One-best answerability, ambiguities and conflicts

Every expert row must choose one contiguous span within the two-word limit, quote exact passage evidence, verify the completed sentence, reject the closest competitor and preserve passage order. The clean expert match count is 18/18.

Material ambiguity IDs: **sentence-makerspaces-01**. Key conflict IDs: **none recorded**. Agreement does not erase either category.

## Canonical answer word counts

| Answer length | Canonical answers |
|---|---:|
| 1 word | 5 |
| 2 words | 13 |
| over limit | 0 |

With n=18, the always-two-words predictor hits 13/18. This is structural bank evidence, not learner accuracy or a fairness result.

## Prompt-only shortcut performance

| No-passage diagnostic | Stored-key hits | Eligible predictions |
|---|---:|---:|
| prompt-only unique | 0 | 0 |
| always two words | 13 | 18 |
| position-modal word count | 14 | 18 |

The prompt-only review sees sentence frames and the word limit but no passage, keys, alternatives, hints or explanations. Each diagnostic preserves its own denominator; none is a learner score.

## Accepted-answer policy

**sentence-makerspaces-01** includes a capitalization-only normalized duplicate. **sentence-night-markets-01** accepts **shopping center**, the American-spelling counterpart of the British passage form. Official regional-spelling acceptance does not remove the need for a documented, tested platform policy.

## Learning and runtime implications

The content-only walkthrough covers 3/3 passages and 18/18 questions. It models grammar prediction, ordered search, contiguous-span checking, word counting, spelling review and competitor rejection, but it is not real-learner evidence.

Recorded runtime classification: **guided-training-runtime-with-explicit-check-and-immediate-post-check-key-and-explanation-not-practice-or-exam-simulation**. Word-limit enforcement is hard-coded to two words and a violation does not explicitly block checking or correctness. The runtime cannot be represented as Practice or Exam simulation.

UI/UX delta testing and Playwright are ➖ only while learner-facing and render-closure hashes remain identical to baseline. ➖ is not accessibility, interface or browser conformity. Portable-report Chromium verification is report-only and not learner-facing.

## Recommended next decisions

1. Keep every asset quarantined until authorship, license, factual review and independent human approval are recorded.
2. Repair sentence-makerspaces-01 and repeat the clean exact-one-best-answer pass.
3. Define and test accepted-answer normalization, including shopping center and capitalization-only duplicates.
4. Parse the stored word limit and block over-limit answers from correctness.
5. Diversify answer lengths, then repeat prompt-only and position-based shortcut checks.
6. Split guided-training from Practice and Exam modes before representing the runtime as assessment.
7. Repair inherited accessibility risks and run learner-facing browser testing only in an authorized UI/runtime delta.
8. Stop here; F0.2b.9 Summary Completion belongs to the next loop iteration.

## Further questions

- Which rewrites reduce the 13/18 and 14/18 length signals while preserving natural exact spans?
- Does the sentence-makerspaces-01 repair preserve strict passage order?
- Should regional spelling variants be accepted generically, enumerated per item or both?
- Can real learners transfer the method without pre-response hints and immediate correctness?

## Sources and limitations

- [validation.json](validation.json) — executable scope, decisions and derived metrics
- [audit-verdicts.json](audit-verdicts.json) — final multi-lane panel ledger
- [baseline.json](baseline.json) — pinned content and learner-runtime identity
- [prompt-only.json](prompt-only.json) and [prompt-only-verdict.json](prompt-only-verdict.json) — sentence-frame shortcut packet and independent verdict
- [blind-review.json](blind-review.json) and [expert-first-pass.json](expert-first-pass.json) — clean passage packet and persisted first pass
- [factual-source-review.json](factual-source-review.json) and [expert-verdict.json](expert-verdict.json) — exact-claim packet and final two-pass review
- [student-walkthrough.json](student-walkthrough.json) — content-only learner simulation
- [source-availability.json](source-availability.json) and [provenance-search.json](provenance-search.json) — retrieval and directed-search ledgers
- [unit-change-manifest.json](unit-change-manifest.json) — audit-only scope and F0.2b.9 boundary

Limitations: candidate-source availability is not factual verification or rights clearance; provenance search is directed and non-exhaustive; AI reviews are not human signatures; n=18 cannot certify learner accuracy, fairness or efficacy; and this unit contains no learner-facing UI, accessibility or Playwright conformance evidence.

## Stop boundary

F0.2b remains open. The next subunit is F0.2b.9 Summary Completion; it was not started.
