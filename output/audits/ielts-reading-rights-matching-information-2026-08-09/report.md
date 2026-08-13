# F0.2b.4 — Matching Information audit dossier

Date: 2026-08-09  
Decision: **audit PASS; bank and content certification BLOCKED**  
Scope: three formative route-bank passages, 15 paragraphs and 18 statements.

## Executive result

This unit closes the reproducible dossier, not the content. All three assets remain
`unknown-quarantined`; no author, rights basis, license, factual human review or
independent human approval is recorded. The clean two-pass IELTS reviewer matched all
18 stored paragraph mappings and found no material ambiguity. That agreement does not
make the bank publishable: predicting A–E for question positions 1–5 succeeds on 11/15
eligible items, while 12 of 15 declared factual claims are oversimplified or
untraceable.

| Lane | Board | Result in this unit |
|---|---:|---|
| Rights and provenance | ✅ | Complete conservative dossier; 3/3 quarantined; no clearance |
| Full-stack and data | ✅ | Hash-pinned identity, fail-closed registry, deterministic packets and leakage guard |
| IELTS expert | ✅ | Complete independent audit; bank remains blocked |
| Cognitive walkthrough | ✅ | 3/3 passages and 18/18 statements; no assigned mappings or bands |
| Anti-bias and leakage | ✅ | Multidimensional detection and blocking; no fairness certification |
| UI/UX and accessibility | ➖ | No scoped learner-facing delta; existing UI is not certified |
| Playwright | ➖ | No scoped DOM/runtime delta; no browser PASS claimed |

The machine-readable panel ledger is [audit-verdicts.json](audit-verdicts.json). The
portable stakeholder report is [report.html](report.html).

## IELTS answerability

The first pass used only [blind-review.json](blind-review.json). It applies the official
Matching Information rule: locate specific information in lettered paragraphs or
sections, distinguish this task from matching headings, and reuse a paragraph only when
the instructions permit it. The rule is sourced from the
[official IELTS Academic Reading format](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading).

The independent reviewer persisted [expert-first-pass.json](expert-first-pass.json)
before opening [factual-source-review.json](factual-source-review.json). All 18 final
decisions in [expert-verdict.json](expert-verdict.json) are byte-semantically identical
to that first pass and match the stored mappings. Every decision supplies an exact
supporting quote, a paraphrase map, a different closest competing paragraph and a reason
that competitor fails. No item was marked materially ambiguous.

All three passages nevertheless receive `mixed` IELTS fitness: they are short, highly
localised and more explicit than a typical Academic Reading passage. Publication stays
blocked until the shortcut pattern, factual support, rights and human review are
resolved and the revised bank is independently re-adjudicated.

## Rights, provenance and factual research

The registry fixes each source object and normalized passage by SHA-256 and keeps all
three records deny-by-default. The directed title/first-sentence search in
[provenance-search.json](provenance-search.json) found no exact match in the reviewed
results. It is explicitly non-exhaustive: a negative web search does not prove original
authorship, ownership or universal absence.

[source-availability.json](source-availability.json) records URL, retrieval timestamp,
HTTP status, content type, size and response-body hash for the official IELTS rule plus
nine institutional candidate sources. The expert opened all nine candidates directly
and supplied locators for 15 exact claims. Results:

- supported: 3
- oversimplified: 5
- unsupported: 0
- untraceable: 7

These classifications are editorial source triage by an AI reviewer. Candidate sources
do not automatically verify the passage, establish authorship or provide a license.

## Blind-review and leakage controls

The blind packet contains titles neutral to the audit, passage text, paragraph letters
and statements only. It excludes stored mappings, feedback, traps and declared skills.
The validator uses positive allowlists and scans recursive field names, key-like text
values and learner/contact PII in both review packets and the student walkthrough. Two
adversarial controls prove that explicit paragraph mappings in English and Spanish are
caught even when hidden in ordinary text-value fields.

The final verdict references the exact blind-packet hash and exact persisted first-pass
hash. This is a useful local trace, not an external append-only witness: a coordinated
rewrite of every local artifact cannot be ruled out cryptographically. Likewise,
declared direct source review with IDs and locators is not a human signature or
automatic proof of browsing.

## Cognitive walkthrough

[student-walkthrough.json](student-walkthrough.json) covers every statement with a
likely misread, evidence hunt, paraphrase check, distractor check, decision rule and
repair action. It surfaces scanning cues, lexical echo, overly broad paragraph matches,
title anchoring and the need to reject the closest competitor.

The walkthrough assigns no paragraph mappings or bands. It is a prospective content
simulation, not evidence of usability, retention, band improvement or effectiveness
with real students.

## Anti-shortcut profile

Stored paragraph letters are A 3, B 5, C 3, D 4 and E 3; maximum same-label run is one.
The rule “for question positions 1–5, answer A–E respectively” applies to 15 statements
and matches 11 stored mappings: 73.3% conditional accuracy against a 20% five-label
baseline. It also obtains 61.1% across all 18 items while abstaining on the sixth item
of each set. This is a blocking content defect, not merely an interesting statistic.

The highest lexical-overlap heuristic resolves 11 items and matches eight of them. The
audit also records constant-letter baselines, sequence and transitions, statement
length by letter, every overlap row, title influence, paragraph competition, per-set
breakdown, perspective and representation, prior knowledge and irrelevant cognitive
load. Paragraph letters identify document order and are not permuted independently;
the applicable metamorphic protection is to redesign statement order/content and
re-adjudicate it. With n=18, statistical certification is withheld.

## UI/UX and Playwright applicability

Both lanes are `➖` only for this audit delta. The catalog, Matching Information route,
`MatchingInformationEngine` and `MatchingInformationPassageBank` hashes equal the
pinned baseline, and no `src/app` or `src/components` file imports the audit registry or
contract. [unit-change-manifest.json](unit-change-manifest.json) records this narrow
scope.

This does not certify the existing interface, accessibility, responsive layout, Task 2
visual parity or product-wide behavior. No learner-facing Playwright matrix,
screenshots or traces are claimed for this row. Chromium is used only to package and
verify this report at 1440 and 390 pixels.

## Reproducible guardians

Commands run from the repository root:

```bash
node scripts/check-ielts-reading-matching-information-rights.mjs --check
node --test tests/ielts-reading-matching-information-rights.test.mjs
node --test tests/ielts-reading-rights-contract.test.mjs tests/ielts-reading-multiple-choice-rights.test.mjs tests/ielts-reading-tfng-rights.test.mjs tests/ielts-reading-ynng-rights.test.mjs tests/ielts-reading-matching-information-rights.test.mjs
npx eslint scripts/check-ielts-reading-matching-information-rights.mjs tests/ielts-reading-matching-information-rights.test.mjs src/data/practica-exams/ielts-reading-rights-registry.ts output/audits/ielts-reading-rights-matching-information-2026-08-09/build-report.mjs
npx tsc --noEmit
npm run check:practica-catalog
npm run check:exam-practice-content
npm run build
```

Observed results:

- Matching Information tests: 14/14 PASS.
- Reading-rights tests accumulated: 58/58 PASS.
- Matching Information `--check`: PASS twice with deterministic hashes.
- ESLint and TypeScript: PASS.
- Practice catalog: 465 protected entries PASS.
- Production build: 1,263/1,263 static pages generated, exit 0.
- Portable report validation, packaging and Chromium verification: PASS at 1440/390,
  with four metric cards, two charts, two tables and a working source dialog.
- Global exam-practice content gate: exit 1 with eight pre-existing IELTS Writing Task
  2 expectations and zero Reading failures. They were not hidden, reclassified or fixed
  inside this Reading unit.

## Artifact map

- [baseline.json](baseline.json) — pinned content/runtime baseline
- [validation.json](validation.json) — executable decision and all gates
- [blind-review.json](blind-review.json) — neutral content-only packet
- [expert-first-pass.json](expert-first-pass.json) — pre-source decisions
- [factual-source-review.json](factual-source-review.json) — exact claims and candidates
- [expert-verdict.json](expert-verdict.json) — two-pass IELTS/factual review
- [student-walkthrough.json](student-walkthrough.json) — clean cognitive walkthrough
- [source-availability.json](source-availability.json) — fetch identity ledger
- [provenance-search.json](provenance-search.json) — directed search ledger
- [unit-change-manifest.json](unit-change-manifest.json) — scoped delta contract
- [audit-verdicts.json](audit-verdicts.json) — panel decision ledger
- [artifact.json](artifact.json) and [report.html](report.html) — portable executive report

## Stop boundary

F0.2b remains open. The next subunit, F0.2b.5 Matching Headings, was not started.
