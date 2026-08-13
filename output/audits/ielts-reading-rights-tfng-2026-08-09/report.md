# F0.2b.2 — True/False/Not Given audit dossier

Date: 2026-08-09  
Decision: **audit PASS; bank and content certification BLOCKED**  
Scope: three formative route-bank passages, 22 statements. The legacy Amazon hub is
excluded and remains reserved for F0.2e.

## Executive result

This unit closes the dossier, not the content. All three assets remain
`unknown-quarantined`; no author, rights basis, license, factual human review or
independent human approval is recorded. The clean two-pass IELTS reviewer agreed with
19 of 22 stored keys, refuted three and found two material ambiguities. A simple
absolute-language cue predicts FALSE on 8 of 10 eligible items, so the bank is not safe
for learner-facing certification.

| Lane | Board | Result in this unit |
|---|---:|---|
| Rights and provenance | ✅ | Complete conservative dossier; 3/3 quarantined; no clearance |
| Full-stack and data | ✅ | Hash-pinned identity, fail-closed registry, deterministic packets and adversarial leakage guard |
| IELTS expert | ✅ | Complete independent audit; bank remains blocked |
| Cognitive walkthrough | ✅ | 3/3 passages and 22/22 statements; no assigned keys or bands |
| Anti-bias and leakage | ✅ | Multidimensional detection and blocking; no fairness certification |
| UI/UX and accessibility | ➖ | No scoped learner-facing delta; existing UI is not certified |
| Playwright | ➖ | No scoped DOM/runtime delta; no browser PASS claimed |

The machine-readable panel ledger is [audit-verdicts.json](audit-verdicts.json).

## What changed in the diagnosis

The first blind-review packet exposed pedagogical set titles such as “alcance y
cuantificadores”. The provisional auditor correctly rejected that as an anchor. The
packet was regenerated without those titles and with only the official task rule:
TRUE requires agreement, FALSE requires contradiction, and NOT GIVEN applies when the
passage neither confirms nor contradicts the statement. A fresh expert then repeated
the entire review.

That clean review produced a materially different result:

- `tfng-libraries-05`: stored NOT GIVEN, independently adjudicated FALSE because “no
  final decision” contradicts permanent rejection.
- `tfng-coastal-03`: stored NOT GIVEN, independently adjudicated FALSE because “little
  change” contradicts a sharp increase.
- `tfng-urban-trees-05`: stored FALSE, independently adjudicated NOT GIVEN; the passage
  confirms “some” cities but does not literally establish that not all cities use the
  method.
- `tfng-urban-trees-03`: the stored and expert labels both remain FALSE, but the expert
  marks material ambiguity because a strict reading can treat the stronger universal
  claim as unestablished rather than contradicted.

The official IELTS distinction is recorded from the
[Academic Reading format](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading).

## Rights, provenance and factual research

The registry now fixes each source object and normalized passage by SHA-256 and keeps
all three records deny-by-default. The directed title/first-sentence search is logged in
[provenance-search.json](provenance-search.json). It is explicitly non-exhaustive: a
negative search does not prove originality, ownership or universal absence.

[source-availability.json](source-availability.json) records requested URL, final URL,
HTTP status, content type and response-body hash for eight candidate sources. The
independent second pass opened those eight URLs directly and supplied a locator plus a
short evidence summary for every cited source. Results across 14 exact passage claims:

- supported: 1
- oversimplified: 5
- unsupported: 1
- untraceable: 7

The school and coastal narratives are not identifiable as the documented cases in the
candidate sources. They must be declared synthetic/composite with editorial evidence
or replaced. Candidate sources never become factual verification, authorship evidence
or a license automatically.

## Blind-review trace and leakage controls

[blind-review.json](blind-review.json) contains passage text and statements only; it
excludes stored keys, explanations, traps and declared skills. The clean expert saved
[expert-first-pass.json](expert-first-pass.json) before opening
[factual-source-review.json](factual-source-review.json). The final
[expert-verdict.json](expert-verdict.json) references the exact blind-packet hash and
the exact persisted first-pass hash; all 22 decisions are byte-semantically identical
between passes.

The validator applies positive allowlists and scans recursive field names, learner or
contact PII, and key-like text values. Its adversarial control proves that a payload
such as `Correct answer for tfng-urban-trees-01 is FALSE` is detected at
`$.instruction`.

This is a strong local process trace, not an append-only external witness. A coordinated
post-hoc rewrite of every local file cannot be ruled out cryptographically. Similarly,
`directSourceReview: true`, eight IDs and locators are declared and spot-checkable, but
they are not a human signature or automatic proof of browsing.

## Cognitive walkthrough

[student-walkthrough.json](student-walkthrough.json) was recreated from the neutral
packet in clean context. It covers every statement with a likely misread, evidence hunt,
decision rule and repair action. It anticipates confusion between contradiction and
absence, quantifier overreach, time shifts, comparisons and prior knowledge. It assigns
no answers or bands and does not claim to represent real learners, retention or band
improvement.

## Anti-shortcut profile

Stored key counts are TRUE 7, FALSE 11 and NOT GIVEN 4. Always choosing FALSE scores
11/22 (50%). The rule “all/always/every/never/only/immediately/permanently/throughout →
FALSE” applies to 10 statements and matches eight stored keys (80% conditional
accuracy). The audit also records:

- maximum same-label run and transition sequence;
- statement length by label;
- lexical overlap with the passage by label;
- per-set label and cue breakdown;
- perspective/representation, prior-knowledge and irrelevant-load risks.

With n=22, statistical certification is withheld. Fixed TFNG label identities are not
permuted because that would create a non-standard task; bias is evaluated across items
and through independent semantic adjudication.

## UI/UX and Playwright applicability

Both lanes are `➖` only for this audit delta. The catalog, TFNG route,
`ObjectivePracticeEngine` and `ObjectivePracticeSetBank` hashes equal the pre-unit
baseline, and no `src/app` or `src/components` source imports the audit registry or
contract. [unit-change-manifest.json](unit-change-manifest.json) records this scope.

This does not certify the existing interface. Known product debt —semantic option
groups, progress semantics, live feedback, focus behavior, persistence, responsive
passage/question comparison and Task 2 visual parity—remains for learner-facing units.
No Playwright screenshots, traces or viewport matrix are claimed here.

## Reproducible guardians

Commands run from the repository root:

```bash
node scripts/check-ielts-reading-tfng-rights.mjs --check
node --test tests/ielts-reading-tfng-rights.test.mjs
node --test tests/ielts-reading-rights-contract.test.mjs tests/ielts-reading-multiple-choice-rights.test.mjs tests/ielts-reading-tfng-rights.test.mjs
npx eslint scripts/check-ielts-reading-tfng-rights.mjs tests/ielts-reading-tfng-rights.test.mjs src/data/practica-exams/ielts-reading-rights-registry.ts output/audits/ielts-reading-rights-tfng-2026-08-09/build-report.mjs
npx tsc --noEmit
npm run check:practica-catalog
npm run check:exam-practice-content
npm run build
```

Observed results:

- TFNG tests: 13/13 PASS.
- Reading rights tests accumulated: 30/30 PASS.
- TFNG `--check`: PASS twice with deterministic output.
- ESLint and TypeScript: PASS.
- Practice catalog: 465 protected entries PASS.
- Production build: 1,263/1,263 static pages generated, exit 0.
- Global exam-practice content gate: exit 1 with eight pre-existing IELTS Writing Task
  2 expectations and zero Reading failures. The failures were not silenced, reclassified
  or repaired inside this Reading unit.

## Artifact map

- [baseline.json](baseline.json) — pinned source/content/runtime baseline
- [validation.json](validation.json) — executable decision and all gates
- [blind-review.json](blind-review.json) — neutral content-only review packet
- [expert-first-pass.json](expert-first-pass.json) — pre-source decisions
- [factual-source-review.json](factual-source-review.json) — exact claims and sources
- [expert-verdict.json](expert-verdict.json) — two-pass IELTS/factual review
- [student-walkthrough.json](student-walkthrough.json) — clean cognitive walkthrough
- [source-availability.json](source-availability.json) — fetch identity ledger
- [provenance-search.json](provenance-search.json) — directed search ledger
- [unit-change-manifest.json](unit-change-manifest.json) — scoped delta contract
- [audit-verdicts.json](audit-verdicts.json) — panel decision ledger
- [artifact.json](artifact.json) and [report.html](report.html) — portable executive report

## Stop boundary

F0.2b remains open. F0.2b.3 Yes/No/Not Given was not started in this iteration.
