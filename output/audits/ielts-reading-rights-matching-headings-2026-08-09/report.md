# F0.2b.5 — Matching Headings audit dossier

Date: 2026-08-09  
Decision: **audit PASS; bank and content certification BLOCKED**  
Scope: 3 formative passages, 17 paragraphs, 27 heading candidates and 17 heading decisions.

## Executive Summary

This unit closes the reproducible audit gate, not the bank. All 3/3
assets remain quarantined. The clean expert reviewed 17/17
decisions, matched 17 stored headings and reported
0 material ambiguities and 0 key conflicts.
Highest lexical overlap predicts 6/14 eligible answers; heading ii is never
correct (0/17); and the extreme-cue heuristic flags 9
options—8 are never correct while 1 is a legitimate correct contextual use. The learner runtime still offers previously used headings even though the official task contract forbids heading reuse.

| Lane | Board | Audited result |
|---|---:|---|
| Rights and provenance | ✅ | 3/3 assets remain unknown-quarantined. Ten web sources were reachable, but exact-match search was directed and non-exhaustive; visible originality and July-2026 academic-review claims remain observed but unverified, and no rights-holder authorization was located. |
| Full-stack and data | ✅ | 3 passages, 17 paragraphs, 27 candidate headings and 17 heading decisions are covered exactly; hashes align and all records fail closed without structural registry errors. |
| IELTS expert | ✅ | 17/17 heading decisions match the stored mappings, with 0 material ambiguities. All three passage assessments are mixed because the tasks are easier and more predictable than a strong live-style IELTS set. |
| Cognitive walkthrough | ✅ | 3/3 passages and 17/17 paragraphs have a walkthrough covering global reading, main-idea compression, heading comparison, competitor rejection and a repair action without assigning a key. |
| Anti-bias and leakage | ✅ | Stored counts are i=3, ii=0, iii=3, iv=2, v=2, vi=1, vii=2, viii=2, ix=2; same-position scores 5/17, lexical overlap scores 6/14 eligible with 3 ties, and nine options trigger the extreme-cue heuristic: eight are never correct and one is a legitimate contextual use. |
| UI/UX and accessibility | ➖ | The dossier records the existing runtime mismatch but does not change or certify DOM, interaction, feedback, responsive layout, accessibility or visual parity. |
| Playwright | ➖ | No learner-facing behavior was changed, and the audit registry is absent from app/component runtime imports. |

## Rights, provenance and factual review

All records stay deny-by-default. The directed provenance search is non-exhaustive, and a
negative exact-match search does not prove original authorship. Candidate institutional
sources do not establish ownership, a license or human factual approval. The independent
claim assessments are:

- supported: 1
- oversimplified: 9
- unsupported: 0
- untraceable: 5

## IELTS answerability and learning value

The clean first pass uses the official Matching Headings contract: choose the heading that
summarizes the whole paragraph or section; more headings than paragraphs may appear; some
headings remain unused; and no heading may be used more than once. Each expert decision
records a main-idea statement, exact supporting language, a paraphrase map and rejection of
the closest competing heading. Stored-key agreement does not certify content quality.

The content-only student walkthrough covers 3/3 passages and
17/17 paragraphs. It models main-idea compression and distractor
comparison without exposing answer keys or assigning IELTS bands. It is a prospective AI
simulation, not evidence of learning gains, retention or usability with real students.

## Anti-bias, leakage and runtime findings

Stored option counts are i=3, ii=0, iii=3, iv=2, v=2, vi=1, vii=2, viii=2, ix=2. Heading ii is never correct.
The same-position heuristic succeeds on 5/17. The highest lexical-overlap
heuristic succeeds on 6/14 eligible decisions and has 3 ties or abstentions.
The extreme-cue profile flags 9 options: 8 never-correct distractors and 1 legitimate correct contextual use.
With n=17, statistical certification is withheld.

The runtime no-reuse mismatch is present: The learner runtime still offers previously used headings even though the official task contract forbids heading reuse.
Open answerability item IDs, if any: none recorded.

## UI/UX and Playwright applicability

Both lanes are ➖ only for this audit-only delta because the pinned learner-facing sources
are unchanged. This does not certify the existing interface, accessibility, responsive
layout, no-reuse behavior or learner workflow. Chromium packaging of this stakeholder
report is report verification only, not a learner-facing Playwright audit.

## Recommended next decisions

1. Keep all assets quarantined until authorship, license, factual review and independent human approval are recorded.
2. Redesign content, then remeasure, to reduce the 6/14 lexical-overlap signal, the unused ii label and the 8-distractor extreme-cue pattern while preserving legitimate contextual wording.
3. Enforce no heading reuse in the learner runtime, then audit that learner-facing delta separately.
4. Re-run clean IELTS and average-student reviews after every editorial change.
5. Stop here; F0.2b.6 Matching Features was not started.

## Sources and limitations

- [validation.json](validation.json) — executable scope, decisions and derived metrics
- [audit-verdicts.json](audit-verdicts.json) — final multi-lane panel ledger
- [baseline.json](baseline.json) — pinned content and learner-runtime identity
- [blind-review.json](blind-review.json) and [expert-first-pass.json](expert-first-pass.json) — clean first-pass inputs and decisions
- [factual-source-review.json](factual-source-review.json) and [expert-verdict.json](expert-verdict.json) — candidate-source packet and final review
- [student-walkthrough.json](student-walkthrough.json) — content-only learner simulation
- [source-availability.json](source-availability.json) and [provenance-search.json](provenance-search.json) — retrieval and directed-search ledgers
- [unit-change-manifest.json](unit-change-manifest.json) — narrow audit-only delta

Limitations: candidate-source availability is not factual verification or rights clearance;
the provenance search is directed and non-exhaustive; AI reviews are not human signatures;
n=17 cannot certify fairness; and this unit contains no learner-facing UI, accessibility
or Playwright evidence. F0.2b remains open.

## Stop boundary

F0.2b remains open. The next subunit is F0.2b.6 Matching Features; it was not started.
