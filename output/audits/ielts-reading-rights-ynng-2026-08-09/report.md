# F0.2b.3 — Yes/No/Not Given audit dossier

Date: 2026-08-09  
Decision: **audit PASS; bank and content certification BLOCKED**  
Scope: three formative route-bank passages, 22 writer-view statements.

## Executive result

This unit closes the reproducible dossier, not the content. All three assets remain
`unknown-quarantined`; no author, rights basis, license, factual human review or
independent human approval is recorded. The clean two-pass IELTS reviewer matched all
22 stored labels but found two material ambiguities. Agreement with a key does not make
an item uniquely answerable.

| Lane | Board | Result in this unit |
|---|---:|---|
| Rights and provenance | ✅ | Complete conservative dossier; 3/3 quarantined; no clearance |
| Full-stack and data | ✅ | Hash-pinned identity, fail-closed registry, deterministic packets and leakage guard |
| IELTS expert | ✅ | Complete independent audit; bank remains blocked |
| Cognitive walkthrough | ✅ | 3/3 passages and 22/22 statements; no assigned labels or bands |
| Anti-bias and leakage | ✅ | Multidimensional detection and blocking; no fairness certification |
| UI/UX and accessibility | ➖ | No scoped learner-facing delta; existing UI is not certified |
| Playwright | ➖ | No scoped DOM/runtime delta; no browser PASS claimed |

The machine-readable panel ledger is [audit-verdicts.json](audit-verdicts.json). The
portable stakeholder report is [report.html](report.html).

## IELTS answerability

The first pass used only [blind-review.json](blind-review.json). It applies the official
rule: YES agrees with the writer's view or claim, NO contradicts it and NOT GIVEN means
the passage neither agrees nor contradicts. Reported critics, supporters, opponents and
commentators must not be mistaken for the writer. The rule is sourced from the
[official IELTS Academic Reading format](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading).

The independent reviewer persisted [expert-first-pass.json](expert-first-pass.json)
before opening [factual-source-review.json](factual-source-review.json). All 22 final
decisions in [expert-verdict.json](expert-verdict.json) are byte-semantically identical
to that first pass. They match all stored labels, but two questions remain materially
ambiguous:

- `ynng-station-art-07`: the intended answer is NO, yet “not necessarily” does not
  logically contradict “normally”; NOT GIVEN remains defensible under strict scope.
- `ynng-uniforms-04`: the intended answer is YES, yet “all loss of self-expression” can
  mean either loss of every form or any degree of loss; NOT GIVEN remains defensible.

Minor issues also affect station-art items 04 and 05 and remote-work item 03. All three
passages receive `mixed` IELTS fitness. Publication stays blocked until the two material
items are rewritten and independently re-adjudicated.

## Rights, provenance and factual research

The registry fixes each source object and normalized passage by SHA-256 and keeps all
three records deny-by-default. The directed title/first-sentence search in
[provenance-search.json](provenance-search.json) found no exact match in the reviewed
results. It is explicitly non-exhaustive: a negative web search does not prove original
authorship, ownership or universal absence.

[source-availability.json](source-availability.json) records URL, retrieval timestamp,
HTTP status, content type, size and response-body hash for the official IELTS rule plus
eight institutional candidate sources. The expert opened all eight candidates directly
and supplied locators for 13 exact claims. Results:

- supported: 2
- oversimplified: 7
- unsupported: 0
- untraceable: 4

These classifications are editorial source triage by an AI reviewer. Candidate sources
do not automatically verify the passage, establish authorship or provide a license.

## Blind-review and leakage controls

The blind packet contains passage text and statements only. It excludes stored labels,
feedback, traps and declared skills. The validator uses positive allowlists and scans
recursive field names, key-like text values and learner/contact PII in both review
packets and the student walkthrough. An adversarial control proves that text such as
`Correct answer for ynng-station-art-01 is NO` is caught at `$.instruction`.

The final verdict references the exact blind-packet hash and the exact persisted
first-pass hash. This is a useful local trace, not an external append-only witness: a
coordinated rewrite of every local artifact cannot be ruled out cryptographically.
Likewise, declared direct source review with IDs and locators is not a human signature
or automatic proof of browsing.

## Cognitive walkthrough

[student-walkthrough.json](student-walkthrough.json) covers every statement with a
likely misread, evidence hunt, attribution check, decision rule and repair action. It
surfaces voice shifts, concessions, conditions, quantifier drift, title anchoring and
the difference between a related passage zone and an actually stated view.

The walkthrough assigns no labels or bands. It is a prospective content simulation,
not evidence of usability, retention, band improvement or effectiveness with real
students.

## Anti-shortcut profile

Stored labels are YES 9, NO 8 and NOT GIVEN 5; maximum same-label run is two. The rule
“all/always/every/never/only/usually/normally/most/completely/exactly → NO” applies to 11
statements and matches six stored labels (54.5% conditional accuracy). It is above the
declared chance-plus-margin threshold, but weak enough that it must be read alongside
the rest of the profile.

The audit also records constant-label baselines, sequence, statement length by label,
lexical overlap, writer-view verbs, title influence, per-set breakdown, perspective and
representation, prior knowledge and irrelevant cognitive load. Fixed YES/NO/NOT GIVEN
label identities are not permuted because that would create a non-standard IELTS task.
With n=22, statistical certification is withheld.

## UI/UX and Playwright applicability

Both lanes are `➖` only for this audit delta. The catalog, YNNG route,
`ObjectivePracticeEngine` and `ObjectivePracticeSetBank` hashes equal the pinned
baseline, and no `src/app` or `src/components` file imports the audit registry or
contract. [unit-change-manifest.json](unit-change-manifest.json) records this narrow
scope.

This does not certify the existing interface, accessibility, responsive layout,
Task 2 visual parity or product-wide behavior. No learner-facing Playwright matrix,
screenshots or traces are claimed for this row. Chromium was used only to package and
verify this report at 1440 and 390 pixels.

## Reproducible guardians

Commands run from the repository root:

```bash
node scripts/check-ielts-reading-ynng-rights.mjs --check
node --test tests/ielts-reading-ynng-rights.test.mjs
node --test tests/ielts-reading-rights-contract.test.mjs tests/ielts-reading-multiple-choice-rights.test.mjs tests/ielts-reading-tfng-rights.test.mjs tests/ielts-reading-ynng-rights.test.mjs
npx eslint scripts/check-ielts-reading-ynng-rights.mjs tests/ielts-reading-ynng-rights.test.mjs src/data/practica-exams/ielts-reading-rights-registry.ts output/audits/ielts-reading-rights-ynng-2026-08-09/build-report.mjs
npx tsc --noEmit
npm run check:practica-catalog
npm run check:exam-practice-content
npm run build
```

Observed results:

- YNNG tests: 14/14 PASS.
- Reading rights tests accumulated: 44/44 PASS.
- YNNG `--check`: PASS with deterministic output.
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

F0.2b remains open. The next subunit, F0.2b.4 Matching Information, was not started.
