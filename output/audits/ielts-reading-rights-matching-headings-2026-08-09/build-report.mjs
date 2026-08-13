#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const validation = JSON.parse(readFileSync(resolve(here, 'validation.json'), 'utf8'));
const audit = JSON.parse(readFileSync(resolve(here, 'audit-verdicts.json'), 'utf8'));
const reportGeneratedAt = audit.reviewedAt;
const base = 'output/audits/ielts-reading-rights-matching-headings-2026-08-09';
const paths = {
  validation: `${base}/validation.json`,
  baseline: `${base}/baseline.json`,
  blind: `${base}/blind-review.json`,
  firstPass: `${base}/expert-first-pass.json`,
  factual: `${base}/factual-source-review.json`,
  expert: `${base}/expert-verdict.json`,
  student: `${base}/student-walkthrough.json`,
  availability: `${base}/source-availability.json`,
  provenance: `${base}/provenance-search.json`,
  manifest: `${base}/unit-change-manifest.json`,
  audit: `${base}/audit-verdicts.json`,
};

const sqlSource = ({ id, label, sql, tablesUsed }) => ({
  id,
  label,
  query: {
    engine: 'duckdb',
    language: 'sql',
    sql,
    description: label,
    executed_at: reportGeneratedAt,
    tables_used: tablesUsed,
  },
});

const sources = [
  { id: 'validation', label: 'Executable F0.2b.5 validation', path: paths.validation },
  { id: 'baseline', label: 'Pinned Matching Headings content and learner-runtime baseline', path: paths.baseline },
  { id: 'blind_packet', label: 'Content-only blind review packet', path: paths.blind },
  { id: 'expert_first_pass', label: 'Persisted pre-source expert adjudication', path: paths.firstPass },
  { id: 'factual_packet', label: 'Second-pass exact-claim and source packet', path: paths.factual },
  { id: 'expert_verdict', label: 'Independent two-pass IELTS review', path: paths.expert },
  { id: 'student_walkthrough', label: 'Content-only average-student simulation', path: paths.student },
  { id: 'source_availability', label: 'Candidate-source availability ledger', path: paths.availability },
  { id: 'provenance_search', label: 'Directed, non-exhaustive provenance search', path: paths.provenance },
  { id: 'unit_change_manifest', label: 'Scoped audit-unit change manifest', path: paths.manifest },
  { id: 'audit_verdicts', label: 'Final multi-lane panel verdicts', path: paths.audit },
  sqlSource({
    id: 'summary_query',
    label: 'F0.2b.5 scope and disposition summary',
    tablesUsed: [paths.validation],
    sql: `SELECT
  scope.passages AS passages,
  scope.paragraphs AS paragraphs,
  scope.questions AS questions,
  COUNT(*) FILTER (WHERE decision.disposition = 'quarantine') AS quarantined,
  expertReview.answerAgreement.matches AS expertMatches,
  expertReview.answerAgreement.total AS expertTotal,
  expertReview.materialAmbiguityCount AS materialAmbiguities
FROM read_json_auto('${paths.validation}') AS report,
UNNEST(report.decisions) AS rows(decision)
GROUP BY ALL;`,
  }),
  sqlSource({
    id: 'label_query',
    label: 'Stored Matching Headings response-label counts',
    tablesUsed: [paths.validation],
    sql: `UNPIVOT (
  SELECT antiBias.storedKeyProfile.answerCounts.*
  FROM read_json_auto('${paths.validation}')
) ON COLUMNS(*) INTO NAME label VALUE count;`,
  }),
  sqlSource({
    id: 'claim_query',
    label: 'Independent factual-claim assessments',
    tablesUsed: [paths.validation],
    sql: `UNPIVOT (
  SELECT expertReview.factualAssessmentCounts.*
  FROM read_json_auto('${paths.validation}')
) ON COLUMNS(*) INTO NAME assessment VALUE claims;`,
  }),
  sqlSource({
    id: 'decision_query',
    label: 'Per-asset quarantine decisions',
    tablesUsed: [paths.validation],
    sql: `SELECT
  decision.assetId,
  decision.title,
  decision.wordCount,
  decision.paragraphCount,
  decision.headingCandidateCount,
  decision.provenanceStatus,
  decision.rightsBasis,
  decision.factualReviewStatus,
  decision.humanReviewStatus,
  decision.disposition,
  array_to_string(decision.reasonCodes, ' · ') AS blockers
FROM read_json_auto('${paths.validation}') AS report,
UNNEST(report.decisions) AS rows(decision);`,
  }),
  sqlSource({
    id: 'audit_query',
    label: 'Final multi-lane panel verdicts',
    tablesUsed: [paths.audit],
    sql: `SELECT verdict.*
FROM read_json_auto('${paths.audit}') AS audit,
UNNEST(audit.rows) AS rows(verdict);`,
  }),
];

const summaryRows = [{
  passages: validation.scope.passages,
  paragraphs: validation.scope.paragraphs,
  questions: validation.scope.questions,
  quarantined: validation.decisions.filter(row => row.disposition === 'quarantine').length,
  expertMatches: validation.expertReview.answerAgreement.matches,
  expertTotal: validation.expertReview.answerAgreement.total,
  materialAmbiguities: validation.expertReview.materialAmbiguityCount,
}];
const labelRows = Object.entries(validation.antiBias.storedKeyProfile.answerCounts)
  .map(([label, count]) => ({ label, count }));
const claimRows = Object.entries(validation.expertReview.factualAssessmentCounts)
  .map(([assessment, claims]) => ({ assessment, claims }));
const decisionRows = validation.decisions.map(({ reasonCodes, ...row }) => ({
  ...row,
  blockers: reasonCodes.join(' · '),
}));

const storedProfile = validation.antiBias.storedKeyProfile;
const lexicalCue = storedProfile.highestLexicalOverlapPredictsHeading;
const positionCue = storedProfile.samePositionPredictsHeading;
const extremeCue = storedProfile.extremeCueDistractorSignal;
const claimTotal = claimRows.reduce((sum, row) => sum + row.claims, 0);
const conflictIds = validation.expertReview.keyConflictQuestionIds;
const ambiguityIds = validation.expertReview.materialAmbiguityQuestionIds;
const issueIds = [...conflictIds, ...ambiguityIds];
const issueSummary = issueIds.length ? issueIds.join(', ') : 'none recorded';
const runtimeMismatch = validation.checks.runtimeNoReuseMismatchDetected;
const runtimeMismatchText = runtimeMismatch
  ? 'The learner runtime still offers previously used headings even though the official task contract forbids heading reuse.'
  : 'No learner-runtime mismatch with the no-reuse rule was detected in this audit snapshot.';

const artifact = {
  surface: 'report',
  manifest: {
    version: 1,
    surface: 'report',
    title: 'IELTS Reading Matching Headings — audit gate',
    description: 'F0.2b.5 dossier for provenance, main-idea adjudication, learning value and shortcut risk.',
    generatedAt: reportGeneratedAt,
    cards: [
      {
        id: 'scope',
        description: 'Passages, paragraphs and heading decisions in the scoped formative bank.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [
          { label: 'Passages', field: 'passages', format: 'number' },
          { label: 'Paragraphs', field: 'paragraphs', format: 'number' },
          { label: 'Decisions', field: 'questions', format: 'number' },
        ],
      },
      {
        id: 'quarantine',
        description: 'Assets denied advancement by the rights and factual gate.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [{ label: 'Quarantined', field: 'quarantined', format: 'number' }],
      },
      {
        id: 'agreement',
        description: 'Independent main-idea decisions matching stored headings.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [
          { label: 'Expert matches', field: 'expertMatches', format: 'number' },
          { label: 'Reviewed', field: 'expertTotal', format: 'number' },
        ],
      },
      {
        id: 'ambiguity',
        description: 'Paragraphs admitting more than one reasonable heading.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [{ label: 'Material ambiguities', field: 'materialAmbiguities', format: 'number' }],
      },
    ],
    charts: [
      {
        id: 'label_counts',
        title: 'Stored heading-option counts',
        subtitle: `Question: how are stored i–ix heading labels distributed? n=${validation.scope.questions} is descriptive, not a fairness certification.`,
        type: 'bar',
        dataset: 'labels',
        sourceId: 'label_query',
        valueFormat: 'number',
        encodings: {
          x: { field: 'label', type: 'nominal', label: 'Stored heading label' },
          y: { field: 'count', type: 'quantitative', label: 'Paragraphs' },
        },
      },
      {
        id: 'claim_assessments',
        title: 'Independent factual-claim assessments',
        subtitle: `Question: how did direct source review classify ${claimTotal} declared claims? Assessments are not rights clearance or human verification.`,
        type: 'bar',
        dataset: 'claims',
        sourceId: 'claim_query',
        valueFormat: 'number',
        encodings: {
          x: { field: 'assessment', type: 'nominal', label: 'Assessment' },
          y: { field: 'claims', type: 'quantitative', label: 'Claims' },
        },
      },
    ],
    tables: [
      {
        id: 'asset_decisions',
        title: 'Per-asset decision ledger',
        subtitle: 'Every record remains fail-closed and quarantined.',
        dataset: 'decisions',
        sourceId: 'decision_query',
        defaultSort: { field: 'assetId', direction: 'asc' },
        density: 'dense',
        layout: 'full',
        columns: [
          { field: 'assetId', label: 'Asset', type: 'text' },
          { field: 'title', label: 'Title', type: 'text' },
          { field: 'wordCount', label: 'Words', type: 'number' },
          { field: 'paragraphCount', label: 'Paragraphs', type: 'number' },
          { field: 'headingCandidateCount', label: 'Headings', type: 'number' },
          { field: 'provenanceStatus', label: 'Provenance', type: 'text' },
          { field: 'rightsBasis', label: 'Rights', type: 'text' },
          { field: 'factualReviewStatus', label: 'Factual review', type: 'text' },
          { field: 'humanReviewStatus', label: 'Human review', type: 'text' },
          { field: 'disposition', label: 'Disposition', type: 'text' },
          { field: 'blockers', label: 'Blocking gates', type: 'text' },
        ],
      },
      {
        id: 'panel_verdicts',
        title: 'Final panel verdicts',
        subtitle: 'PASS applies to audit completion; open blockers remain explicit.',
        dataset: 'audit',
        sourceId: 'audit_query',
        defaultSort: { field: 'lane', direction: 'asc' },
        layout: 'full',
        columns: [
          { field: 'lane', label: 'Lane', type: 'text' },
          { field: 'boardMark', label: 'Board', type: 'text' },
          { field: 'scope', label: 'Scope', type: 'text' },
          { field: 'findings', label: 'Finding', type: 'text' },
          { field: 'blockersCarriedForward', label: 'Still open', type: 'text' },
        ],
      },
    ],
    sources,
    blocks: [
      { id: 'title', type: 'markdown', body: '# IELTS Reading Matching Headings — audit gate' },
      {
        id: 'executive_summary',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## Executive Summary\n\n' +
          `- **audit PASS; bank and content certification BLOCKED.** The dossier closes F0.2b.5 controls; all ${summaryRows[0].quarantined}/${validation.scope.passages} assets remain quarantined.\n` +
          `- Independent review covered ${validation.expertReview.answerAgreement.total}/${validation.scope.questions} heading decisions, matched ${validation.expertReview.answerAgreement.matches} stored answers and recorded ${validation.expertReview.materialAmbiguityCount} material ambiguities.\n` +
          `- Highest lexical overlap predicts ${lexicalCue.hits}/${lexicalCue.eligible} eligible decisions; heading ii is correct ${storedProfile.answerCounts.ii} times.\n` +
          `- The extreme-cue heuristic flags ${extremeCue.flaggedOptions} options: ${extremeCue.flaggedOptionsNeverCorrect} are never correct and ${extremeCue.flaggedCorrectUses} correct contextual use remains. ${runtimeMismatchText}\n` +
          '- UI/UX and Playwright remain outside this audit-only delta; F0.2b.6 Matching Features is the next unit and was not started.',
      },
      { id: 'metrics', type: 'metric-strip', cardIds: ['scope', 'quarantine', 'agreement', 'ambiguity'] },
      {
        id: 'gate',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## The audit passes; the bank does not\n\n' +
          `The control layer pins ${validation.scope.passages} passage objects and ${validation.scope.questions} paragraph-to-heading decisions, applies deny-by-default rights records, and preserves clean-review hashes. Passing those controls is not publication approval. Authorship, license, factual review and independent human approval remain unresolved; answerability conflicts or ambiguities are reported from validation rather than overwritten: ${issueSummary}.`,
      },
      { id: 'decision_table', type: 'table', tableId: 'asset_decisions', layout: 'full' },
      {
        id: 'matching_logic',
        type: 'markdown',
        sourceId: 'expert_verdict',
        body:
          '## Main idea and heading competition are explicit contracts\n\n' +
          'Each paragraph must resolve to one Roman-numeral heading through a whole-paragraph main idea, exact supporting language, a paraphrase map and rejection of the closest competing heading. More headings than paragraphs are expected, unused headings are allowed, and one heading may not be used twice. Agreement with a stored key is evidence for auditability, not proof of instructional quality.',
      },
      {
        id: 'label_context',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## Heading counts reveal a visible gap, not statistical fairness\n\n' +
          `Across n=${validation.scope.questions}, stored counts are ${labelRows.map(row => `${row.label} ${row.count}`).join(', ')}. Heading ii is never correct in this snapshot. The same-position rule succeeds on ${positionCue.hits}/${positionCue.eligible}; highest lexical overlap succeeds on ${lexicalCue.hits}/${lexicalCue.eligible} eligible decisions with ${lexicalCue.tiesOrAbstentions} ties or abstentions. These are content-risk signals, not learner-performance estimates.`,
      },
      { id: 'label_chart', type: 'chart', chartId: 'label_counts', layout: 'full' },
      {
        id: 'shortcut_risk',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## Shortcut and runtime defects block certification\n\n' +
          `The heuristic flags ${extremeCue.flaggedOptions} options containing extreme cues: ${extremeCue.flaggedOptionsNeverCorrect} are never correct, while ${extremeCue.flaggedCorrectUses} is a legitimate correct contextual use. ${runtimeMismatchText} With only n=${validation.scope.questions}, the audit explicitly withholds statistical certification; editorial redesign and fresh blind adjudication are required.`,
      },
      {
        id: 'factual_context',
        type: 'markdown',
        sourceId: 'expert_verdict',
        body:
          '## Candidate sources contextualize claims; they do not clear them\n\n' +
          `The second pass classifies ${claimTotal} declared factual claims as ${claimRows.map(row => `${row.assessment} ${row.claims}`).join(', ')}. Candidate institutional sources can support or challenge wording, but they do not establish authorship, licensing, provenance or human factual approval.`,
      },
      { id: 'claim_chart', type: 'chart', chartId: 'claim_assessments', layout: 'full' },
      {
        id: 'learning',
        type: 'markdown',
        sourceId: 'student_walkthrough',
        body:
          '## Learning value remains prospective\n\n' +
          `The clean walkthrough covers ${validation.studentWalkthrough.passagesCovered}/${validation.scope.passages} passages and ${validation.studentWalkthrough.questionsCovered}/${validation.scope.questions} paragraphs. It models whole-paragraph reading, main-idea compression, comparison with a close distractor and repair after lexical matching. It assigns no stored headings or bands and is not evidence from real learners.`,
      },
      {
        id: 'panel_scope',
        type: 'markdown',
        sourceId: 'audit_verdicts',
        body:
          '## Panel scope\n\n' +
          'Applicable lanes pass only for a complete, conservative and reproducible dossier. UI/UX and Playwright are not applicable to this unchanged learner-facing delta. Their ➖ marks do not approve the existing interface, accessibility or runtime behavior.',
      },
      { id: 'panel_table', type: 'table', tableId: 'panel_verdicts', layout: 'full' },
      {
        id: 'recommendations',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## Recommended next decisions\n\n' +
          '1. Keep every asset quarantined until authorship, license, factual review and independent human approval are recorded.\n' +
          `2. Redesign the headings and passages, then remeasure, to reduce the ${lexicalCue.hits}/${lexicalCue.eligible} lexical-overlap signal, the unused ii label and the ${extremeCue.flaggedOptionsNeverCorrect}-distractor extreme-cue pattern while preserving legitimate contextual wording.\n` +
          '3. Make the learner runtime enforce the official no-heading-reuse rule, then re-audit UI, accessibility and behavior in a separate learner-facing delta.\n' +
          '4. Re-run clean first-pass IELTS and student reviews after content changes; do not carry forward stored-key agreement as approval.\n' +
          '5. Stop here. F0.2b.6 Matching Features belongs to the next loop iteration.',
      },
      {
        id: 'caveats',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## Caveats and open questions\n\n' +
          `The provenance search is directed and non-exhaustive. Source reachability is not verification. Both independent reviews are AI simulations without human signatures. The ${validation.scope.questions}-decision sample cannot certify statistical fairness or instructional efficacy. The report describes the audit snapshot; it does not test the learner-facing interface, accessibility, retention, band improvement or production publication controls.`,
      },
    ],
  },
  snapshot: {
    version: 1,
    generatedAt: reportGeneratedAt,
    status: audit.status === 'pass' ? 'ready' : 'pending-audit',
    datasets: {
      summary: summaryRows,
      labels: labelRows,
      claims: claimRows,
      decisions: decisionRows,
      audit: audit.rows,
    },
  },
  sources,
};

const laneRows = audit.rows
  .map(row => `| ${row.lane} | ${row.boardMark} | ${row.findings} |`)
  .join('\n');
const factualRows = claimRows.map(row => `- ${row.assessment}: ${row.claims}`).join('\n');
const reportMarkdown = `# F0.2b.5 — Matching Headings audit dossier

Date: 2026-08-09  
Decision: **audit PASS; bank and content certification BLOCKED**  
Scope: ${validation.scope.passages} formative passages, ${validation.scope.paragraphs} paragraphs, ${validation.scope.headingCandidates} heading candidates and ${validation.scope.questions} heading decisions.

## Executive Summary

This unit closes the reproducible audit gate, not the bank. All ${summaryRows[0].quarantined}/${validation.scope.passages}
assets remain quarantined. The clean expert reviewed ${validation.expertReview.answerAgreement.total}/${validation.scope.questions}
decisions, matched ${validation.expertReview.answerAgreement.matches} stored headings and reported
${validation.expertReview.materialAmbiguityCount} material ambiguities and ${validation.expertReview.keyConflictCount} key conflicts.
Highest lexical overlap predicts ${lexicalCue.hits}/${lexicalCue.eligible} eligible answers; heading ii is never
correct (${storedProfile.answerCounts.ii}/${validation.scope.questions}); and the extreme-cue heuristic flags ${extremeCue.flaggedOptions}
options—${extremeCue.flaggedOptionsNeverCorrect} are never correct while ${extremeCue.flaggedCorrectUses} is a legitimate correct contextual use. ${runtimeMismatchText}

| Lane | Board | Audited result |
|---|---:|---|
${laneRows}

## Rights, provenance and factual review

All records stay deny-by-default. The directed provenance search is non-exhaustive, and a
negative exact-match search does not prove original authorship. Candidate institutional
sources do not establish ownership, a license or human factual approval. The independent
claim assessments are:

${factualRows}

## IELTS answerability and learning value

The clean first pass uses the official Matching Headings contract: choose the heading that
summarizes the whole paragraph or section; more headings than paragraphs may appear; some
headings remain unused; and no heading may be used more than once. Each expert decision
records a main-idea statement, exact supporting language, a paraphrase map and rejection of
the closest competing heading. Stored-key agreement does not certify content quality.

The content-only student walkthrough covers ${validation.studentWalkthrough.passagesCovered}/${validation.scope.passages} passages and
${validation.studentWalkthrough.questionsCovered}/${validation.scope.questions} paragraphs. It models main-idea compression and distractor
comparison without exposing answer keys or assigning IELTS bands. It is a prospective AI
simulation, not evidence of learning gains, retention or usability with real students.

## Anti-bias, leakage and runtime findings

Stored option counts are ${labelRows.map(row => `${row.label}=${row.count}`).join(', ')}. Heading ii is never correct.
The same-position heuristic succeeds on ${positionCue.hits}/${positionCue.eligible}. The highest lexical-overlap
heuristic succeeds on ${lexicalCue.hits}/${lexicalCue.eligible} eligible decisions and has ${lexicalCue.tiesOrAbstentions} ties or abstentions.
The extreme-cue profile flags ${extremeCue.flaggedOptions} options: ${extremeCue.flaggedOptionsNeverCorrect} never-correct distractors and ${extremeCue.flaggedCorrectUses} legitimate correct contextual use.
With n=${validation.scope.questions}, statistical certification is withheld.

The runtime no-reuse mismatch is ${runtimeMismatch ? 'present' : 'not detected'}: ${runtimeMismatchText}
Open answerability item IDs, if any: ${issueSummary}.

## UI/UX and Playwright applicability

Both lanes are ➖ only for this audit-only delta because the pinned learner-facing sources
are unchanged. This does not certify the existing interface, accessibility, responsive
layout, no-reuse behavior or learner workflow. Chromium packaging of this stakeholder
report is report verification only, not a learner-facing Playwright audit.

## Recommended next decisions

1. Keep all assets quarantined until authorship, license, factual review and independent human approval are recorded.
2. Redesign content, then remeasure, to reduce the ${lexicalCue.hits}/${lexicalCue.eligible} lexical-overlap signal, the unused ii label and the ${extremeCue.flaggedOptionsNeverCorrect}-distractor extreme-cue pattern while preserving legitimate contextual wording.
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
n=${validation.scope.questions} cannot certify fairness; and this unit contains no learner-facing UI, accessibility
or Playwright evidence. F0.2b remains open.

## Stop boundary

F0.2b remains open. The next subunit is F0.2b.6 Matching Features; it was not started.
`;

writeFileSync(resolve(here, 'artifact.json'), `${JSON.stringify(artifact, null, 2)}\n`);
writeFileSync(resolve(here, 'report.md'), reportMarkdown);
process.stdout.write(`${JSON.stringify({
  title: artifact.manifest.title,
  status: artifact.snapshot.status,
  cards: artifact.manifest.cards.length,
  charts: artifact.manifest.charts.length,
  tables: artifact.manifest.tables.length,
  decisions: artifact.snapshot.datasets.decisions.length,
}, null, 2)}\n`);
