#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const validation = JSON.parse(readFileSync(resolve(HERE, 'validation.json'), 'utf8'));
const audit = JSON.parse(readFileSync(resolve(HERE, 'audit-verdicts.json'), 'utf8'));
const BASE = 'output/audits/ielts-reading-rights-tfng-2026-08-09';
const generatedAt = validation.generatedAt;
const paths = {
  validation: `${BASE}/validation.json`,
  baseline: `${BASE}/baseline.json`,
  blind: `${BASE}/blind-review.json`,
  firstPass: `${BASE}/expert-first-pass.json`,
  factual: `${BASE}/factual-source-review.json`,
  expert: `${BASE}/expert-verdict.json`,
  student: `${BASE}/student-walkthrough.json`,
  availability: `${BASE}/source-availability.json`,
  provenance: `${BASE}/provenance-search.json`,
  changeManifest: `${BASE}/unit-change-manifest.json`,
  audit: `${BASE}/audit-verdicts.json`,
};

const sqlSource = ({ id, label, sql, tablesUsed }) => ({
  id,
  label,
  query: {
    engine: 'duckdb',
    language: 'sql',
    sql,
    description: label,
    executed_at: generatedAt,
    tables_used: tablesUsed,
  },
});

const sources = [
  { id: 'validation', label: 'Executable F0.2b.2 validation', path: paths.validation },
  { id: 'baseline', label: 'Pinned TFNG bank and learner-runtime baseline', path: paths.baseline },
  { id: 'blind_packet', label: 'Content-only blind review packet', path: paths.blind },
  { id: 'expert_first_pass', label: 'Persisted pre-source expert adjudication', path: paths.firstPass },
  { id: 'factual_packet', label: 'Second-pass claim and source packet', path: paths.factual },
  { id: 'expert_verdict', label: 'Independent two-pass IELTS review', path: paths.expert },
  { id: 'student_walkthrough', label: 'Content-only average-student simulation', path: paths.student },
  { id: 'source_availability', label: 'Candidate-source availability ledger', path: paths.availability },
  { id: 'provenance_search', label: 'Directed, non-exhaustive provenance search ledger', path: paths.provenance },
  { id: 'unit_change_manifest', label: 'Scoped audit-unit change manifest', path: paths.changeManifest },
  { id: 'audit_verdicts', label: 'Final multi-lane panel verdicts', path: paths.audit },
  sqlSource({
    id: 'summary_query',
    label: 'F0.2b.2 scope and disposition summary',
    tablesUsed: [paths.validation],
    sql: `SELECT
  scope.passages AS passages,
  scope.questions AS questions,
  COUNT(*) FILTER (WHERE decision.disposition = 'quarantine') AS quarantined,
  expertReview.answerAgreement.matches AS expertMatches,
  expertReview.answerAgreement.total AS expertTotal,
  expertReview.keyConflictCount AS keyConflicts
FROM read_json_auto('${paths.validation}') AS report,
UNNEST(report.decisions) AS rows(decision)
GROUP BY ALL;`,
  }),
  sqlSource({
    id: 'label_query',
    label: 'Stored-key TFNG label counts',
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
  decision.questionCount,
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
  questions: validation.scope.questions,
  quarantined: validation.decisions.filter(row => row.disposition === 'quarantine').length,
  expertMatches: validation.expertReview.answerAgreement.matches,
  expertTotal: validation.expertReview.answerAgreement.total,
  keyConflicts: validation.expertReview.keyConflictCount,
}];
const labelRows = Object.entries(validation.antiBias.storedKeyProfile.answerCounts)
  .map(([label, count]) => ({ label, count }));
const claimRows = Object.entries(validation.expertReview.factualAssessmentCounts)
  .map(([assessment, claims]) => ({ assessment, claims }));
const decisionRows = validation.decisions.map(({ reasonCodes, ...row }) => ({
  ...row,
  blockers: reasonCodes.join(' · '),
}));
const cue = validation.antiBias.storedKeyProfile.absoluteLanguageImpliesFalse;
const conflicts = validation.expertReview.keyConflictQuestionIds.join(', ') || 'none';

const artifact = {
  surface: 'report',
  manifest: {
    version: 1,
    surface: 'report',
    title: 'IELTS Reading TFNG — audit gate',
    description:
      'F0.2b.2 report for provenance, key integrity, cognitive value and shortcut risk.',
    generatedAt,
    cards: [
      {
        id: 'passages',
        description: 'TFNG passages in the scoped formative route bank.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [{ label: 'Scoped passages', field: 'passages', format: 'number' }],
      },
      {
        id: 'quarantined',
        description: 'Assets denied advancement by the rights and factual gate.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [{ label: 'Quarantined', field: 'quarantined', format: 'number' }],
      },
      {
        id: 'agreement',
        description: 'Independent TFNG decisions matching the current stored keys.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [
          { label: 'Expert key agreement', field: 'expertMatches', format: 'number' },
          { label: 'Statements reviewed', field: 'expertTotal', format: 'number' },
        ],
      },
      {
        id: 'conflicts',
        description: 'Stored-key decisions challenged by independent semantic adjudication.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [{ label: 'Key conflicts', field: 'keyConflicts', format: 'number' }],
      },
    ],
    charts: [
      {
        id: 'label_counts',
        title: 'FALSE occupies half of the stored keys',
        subtitle:
          'Question: are fixed response labels balanced across the 22 statements? Counts expose structure; n=22 cannot certify fairness statistically.',
        type: 'bar',
        dataset: 'labels',
        sourceId: 'label_query',
        valueFormat: 'number',
        encodings: {
          x: { field: 'label', type: 'nominal', label: 'Stored response label' },
          y: { field: 'count', type: 'quantitative', label: 'Statements' },
        },
      },
      {
        id: 'claim_assessments',
        title: 'Candidate sources do not resolve every factual claim',
        subtitle:
          'Question: how did the independent second pass classify the exact declared claims? Candidate sources are not human verification or publication approval.',
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
          { field: 'questionCount', label: 'Questions', type: 'number' },
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
      { id: 'title', type: 'markdown', body: '# IELTS Reading True / False / Not Given — audit gate' },
      {
        id: 'executive_summary',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## Executive Summary\n\n' +
          `- The F0.2b.2 control passes; the ${validation.scope.passages} passages do not. All remain quarantined.\n` +
          `- Independent review covered ${validation.scope.questions}/${validation.scope.questions} statements and challenged ${validation.expertReview.keyConflictCount} stored key decisions.\n` +
          `- The absolute-language shortcut is eligible on ${cue.eligible} statements and matches FALSE on ${cue.hits}; content certification remains blocked.\n` +
          '- UI/UX and Playwright are outside this audit slice because all four learner-facing hashes are unchanged.',
      },
      { id: 'metrics', type: 'metric-strip', cardIds: ['passages', 'quarantined', 'agreement', 'conflicts'] },
      {
        id: 'gate',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## The control passes; the bank is not cleared\n\n' +
          'Object and passage hashes pin identity, incomplete rights records fail closed, and candidate evidence is separated from factual verification. None of this supplies authorship, a license, a human signature or learner-outcome evidence. Quarantine is the only valid disposition.',
      },
      { id: 'decision_table', type: 'table', tableId: 'asset_decisions', layout: 'full' },
      {
        id: 'key_quality',
        type: 'markdown',
        sourceId: 'expert_verdict',
        body:
          '## NOT GIVEN must mean absent, not merely imprecise\n\n' +
          `The independent reviewer fixed all decisions before seeing factual sources. Conflicts with the stored bank: ${conflicts}. The validator requires a decisive passage span for TRUE/FALSE, but for NOT GIVEN it requires a related zone plus the exact missing fact. This prevents a reviewer from inventing positive evidence for absence.`,
      },
      {
        id: 'bias_context',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## Quantifiers create a visible shortcut\n\n' +
          `FALSE is stored for ${validation.antiBias.storedKeyProfile.answerCounts.FALSE} of 22 statements. The simple rule “absolute word → FALSE” answers only ${cue.eligible} items but gets ${cue.hits} of those right (${Math.round(cue.conditionalAccuracy * 100)}%). That is too predictive for editorial certification even though the sample remains too small for a statistical fairness claim.`,
      },
      { id: 'label_chart', type: 'chart', chartId: 'label_counts', layout: 'full' },
      {
        id: 'factual_context',
        type: 'markdown',
        sourceId: 'expert_verdict',
        body:
          '## Factual support and case identity remain separate risks\n\n' +
          'Urban sources may support general heat/canopy claims without proving the passage wording. The school and coastal candidates do not establish that the narrated cases occurred as written. Untraceable cases must be declared synthetic/composite or replaced; no candidate source becomes a factual or rights approval automatically.',
      },
      { id: 'claim_chart', type: 'chart', chartId: 'claim_assessments', layout: 'full' },
      {
        id: 'learning',
        type: 'markdown',
        sourceId: 'student_walkthrough',
        body:
          '## The content exposes useful learning targets\n\n' +
          'The clean walkthrough traces likely confusion between contradiction and missing information, plus scope, time, comparison and prior knowledge. Its value is diagnostic only: it does not assign answers or bands and does not represent a real learner study.',
      },
      {
        id: 'panel_scope',
        type: 'markdown',
        sourceId: 'audit_verdicts',
        body:
          '## Panel scope\n\n' +
          'Applicable lanes pass only when the dossier is complete, conservative and reproducible. UI/UX and Playwright are marked not applicable for this slice by unchanged hashes, not by convenience. No lane certifies learner-facing conformity, copyright clearance or publication readiness.',
      },
      { id: 'panel_table', type: 'table', tableId: 'panel_verdicts', layout: 'full' },
      {
        id: 'recommendations',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## Recommended next decisions\n\n' +
          '1. Correct every independently identified key conflict before any learner-facing release.\n' +
          '2. Remove the quantifier shortcut by writing credible TRUE and NOT GIVEN items that also contain absolute-looking language where semantically justified.\n' +
          '3. Resolve authorship, rights, exact-case provenance and human factual review for all three passages.\n' +
          '4. Keep F0.2b open; begin F0.2b.3 only in the next loop iteration.',
      },
      {
        id: 'caveats',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## Caveats and open questions\n\n' +
          'The provenance search was directed and non-exhaustive. Source reachability is not verification. Both independent reviews are AI simulations without human signatures. The 22-question sample cannot certify statistical fairness. Runtime quarantine enforcement, the visible originality claim and learner UI remain separate open units.',
      },
    ],
  },
  snapshot: {
    version: 1,
    generatedAt,
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

writeFileSync(resolve(HERE, 'artifact.json'), `${JSON.stringify(artifact, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({
  title: artifact.manifest.title,
  status: artifact.snapshot.status,
  cards: artifact.manifest.cards.length,
  charts: artifact.manifest.charts.length,
  tables: artifact.manifest.tables.length,
  decisions: artifact.snapshot.datasets.decisions.length,
}, null, 2)}\n`);
