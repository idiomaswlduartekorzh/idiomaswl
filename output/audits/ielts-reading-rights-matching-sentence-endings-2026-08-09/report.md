# F0.2b.7 — Matching Sentence Endings audit dossier

Date: 2026-08-09  
Decision: **audit PASS; bank and content certification BLOCKED**  
Scope: 3 formative passages, 24 ending candidates and 18 sentence starts.

## Executive Summary

- **The audit closes, but the bank does not.** All 3/3 assets remain quarantined.
- **The clean expert matched 18/18 stored endings.** It recorded 0 material ambiguities and 0 key conflicts.
- **Text order still blocks IELTS-format certification.** mse-food-waste-06, mse-libraries-06 returns to earlier passage evidence after the prior question.
- **The runtime remains guided-training.** Immediate locking, correctness feedback, client keys and pre-response traps mean it is not Practice or Exam simulation.
- **Stop before F0.2b.8 Sentence Completion.** The next unit remains not started and F0.2b remains open.

| Lane | Board | Audited result |
|---|---:|---|
| Rights and provenance | ✅ | 3/3 assets remain unknown-quarantined. The directed, non-exhaustive search found no exact source match in the reviewed results; 16 candidate URLs were available in the ledger, which does not prove claims, authorship or rights. |
| Full-stack and data | ✅ | All three objects and passages match their pinned hashes; four staged packets, two shortcut verdicts, one first pass, one factual second pass and one 3-by-18 walkthrough are bound to exact IDs. The F0.2b.8 sources and objects remain pinned and untouched. |
| IELTS expert | ✅ | 18/18 independent ending decisions match the stored keys, with 0 material ambiguities and two minor ambiguities. All three passages have mixed IELTS fitness. Exact evidence offsets detect two question-order violations. |
| Cognitive walkthrough | ✅ | 3/3 passages and 18/18 questions cover likely misread, relation prediction, grammar and connective risk, evidence search, ending comparison, competitor check, decision rule and repair action without assigning ending letters. |
| Anti-bias and leakage | ✅ | Stored counts are A=3, B=2, C=2, D=2, E=3, F=1, G=2, H=3. All 3 sets ascend strictly by stored letter; the same ordinal-position modal predicts 15/18. Connective-only produces 1/1 correct unique prediction, grammar-only 0 unique predictions, and generic coherence 4/4 correct unique predictions. |
| UI/UX and accessibility | ➖ | The dossier records inherited interface and accessibility behavior but does not change or approve DOM, interaction, responsive layout, visual parity or pedagogy in the learner runtime. |
| Playwright | ➖ | No learner-route browser pass is presented as approval. Portable-report Chromium verification, when generated, is packaging evidence only and not learner-facing Playwright. |

## Rights, provenance and factual review

All three records remain deny-by-default. Candidate sources and a negative exact-match search do not establish passage authorship, ownership, license, authorization or independent human approval. Exact factual assessments:

- supported: 2
- oversimplified: 7
- unsupported: 2
- untraceable: 4

## One-best answerability and official order

Every expert row must identify one best ending, quote exact passage evidence, assess all eight candidates and reject the closest competitor. The clean expert matched 18/18 stored endings. That agreement does not cure the text-order defect at **mse-food-waste-06, mse-libraries-06**.

The learner instructions provide extra endings but do not state whether an ending may be reused. The audit therefore preserves **reuse policy not declared**; it neither invents permission nor prohibition.

## Surface-only shortcut findings

| No-passage stage | Stored-key hits | Unique predictions |
|---|---:|---:|
| connective-only unique | 1 | 1 |
| grammar-only unique | 0 | 0 |
| generic-coherence unique | 4 | 4 |

These stages use different evidence and denominators. They measure how much a reviewer can infer without the passage; they are not learner accuracy. The position-modulo-eight heuristic hits 6/18, lexical overlap hits 2/9 eligible unique predictions, and longest-ending selection hits 2/12.

Stored ending-letter counts are A=3, B=2, C=2, D=2, E=3, F=1, G=2, H=3. With n=18, none of these diagnostics supports a fairness, difficulty or statistical-balance certification.

## Learning and runtime implications

The content-only walkthrough covers 3/3 passages and 18/18 questions. It models relation prediction, grammar filtering, passage evidence and competitor rejection, but it is not real-learner evidence.

Recorded runtime classification: **guided-training-runtime-with-immediate-feedback-not-practice-or-exam-simulation**. The client receives stored keys, locks a response immediately, reveals correctness and explanation, and exposes trap text before commitment. It cannot be represented as Practice or Exam simulation.

UI/UX delta testing and Playwright are ➖ only while learner-facing and render-closure hashes remain identical to baseline. ➖ is not accessibility, interface or browser conformity.

## Recommended next decisions

1. Keep every asset quarantined until authorship, license, factual review and independent human approval are recorded.
2. Repair mse-food-waste-06 and mse-libraries-06 so question order follows passage evidence, then repeat the clean expert pass.
3. Rewrite items that collapse under connector-only, grammar-only or generic-coherence review and repeat all staged no-passage checks.
4. Preserve reuse policy not declared unless learner instructions explicitly add a sourced rule.
5. Split guided-training from Practice and Exam modes before representing the runtime as assessment.
6. Repair inherited accessibility risks and run browser testing only in an authorized learner-facing delta.
7. Stop here; F0.2b.8 Sentence Completion belongs to the next loop iteration.

## Further questions

- Which rewrites lower no-passage uniqueness while preserving natural, one-best completion?
- Does the order repair preserve the closest-competitor distinction?
- Do shortcut rates persist on a bank of at least 100 reviewed questions?
- Can real learners transfer the method without pre-response traps and immediate correctness?

## Sources and limitations

- [validation.json](validation.json) — executable scope, decisions and derived metrics
- [audit-verdicts.json](audit-verdicts.json) — final multi-lane panel ledger
- [baseline.json](baseline.json) — pinned content and runtime identity
- [connective-only.json](connective-only.json) and [connective-only-verdict.json](connective-only-verdict.json) — connector-stage packet and verdict
- [surface-only.json](surface-only.json) and [surface-only-verdict.json](surface-only-verdict.json) — grammar/coherence packet and verdict
- [blind-review.json](blind-review.json) and [expert-first-pass.json](expert-first-pass.json) — clean passage packet and persisted first pass
- [factual-source-review.json](factual-source-review.json) and [expert-verdict.json](expert-verdict.json) — exact-claim packet and final two-pass review
- [student-walkthrough.json](student-walkthrough.json) — content-only learner simulation
- [source-availability.json](source-availability.json) and [provenance-search.json](provenance-search.json) — retrieval and directed-search ledgers
- [unit-change-manifest.json](unit-change-manifest.json) — audit-only scope and F0.2b.8 boundary

Limitations: candidate-source availability is not factual verification or rights clearance; provenance search is directed and non-exhaustive; AI reviews are not human signatures; n=18 cannot certify learner accuracy, fairness or efficacy; and this unit contains no learner-facing UI, accessibility or Playwright conformance evidence.

## Stop boundary

F0.2b remains open. The next subunit is F0.2b.8 Sentence Completion; it was not started.
