#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const validation = JSON.parse(readFileSync(resolve(here, 'validation.json'), 'utf8'));
const audit = JSON.parse(readFileSync(resolve(here, 'audit-verdicts.json'), 'utf8'));
const reportGeneratedAt = '2026-08-09T06:29:00-05:00';
const base = 'output/audits/ielts-reading-rights-matching-information-2026-08-09';
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
  { id: 'validation', label: 'Executable F0.2b.4 validation', path: paths.validation },
  { id: 'baseline', label: 'Pinned Matching Information content and learner-runtime baseline', path: paths.baseline },
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
    label: 'F0.2b.4 scope and disposition summary',
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
    label: 'Stored Matching Information response-label counts',
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
const positionalCue = validation.antiBias.storedKeyProfile.positionOneToFivePredictsAToE;

const artifact = {
  surface: 'report',
  manifest: {
    version: 1,
    surface: 'report',
    title: 'IELTS Reading Matching Information — audit gate',
    description: 'F0.2b.4 dossier for provenance, exact paragraph evidence, learning value and shortcut risk.',
    generatedAt: reportGeneratedAt,
    cards: [
      {
        id: 'scope',
        description: 'Passages, paragraphs and statements in the scoped formative bank.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [
          { label: 'Passages', field: 'passages', format: 'number' },
          { label: 'Paragraphs', field: 'paragraphs', format: 'number' },
          { label: 'Statements', field: 'questions', format: 'number' },
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
        description: 'Independent paragraph decisions matching stored mappings.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [
          { label: 'Expert matches', field: 'expertMatches', format: 'number' },
          { label: 'Reviewed', field: 'expertTotal', format: 'number' },
        ],
      },
      {
        id: 'ambiguity',
        description: 'Items admitting more than one reasonable answer under strict scope logic.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [{ label: 'Material ambiguities', field: 'materialAmbiguities', format: 'number' }],
      },
    ],
    charts: [
      {
        id: 'label_counts',
        title: 'Stored paragraph-letter counts',
        subtitle: 'Question: how are stored A–E paragraph mappings distributed? n=18 is descriptive, not a fairness certification.',
        type: 'bar',
        dataset: 'labels',
        sourceId: 'label_query',
        valueFormat: 'number',
        encodings: {
          x: { field: 'label', type: 'nominal', label: 'Stored paragraph letter' },
          y: { field: 'count', type: 'quantitative', label: 'Statements' },
        },
      },
      {
        id: 'claim_assessments',
        title: 'Independent factual-claim assessments',
        subtitle: 'Question: how did direct source review classify 15 declared claims? These assessments are not clearance or human verification.',
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
      { id: 'title', type: 'markdown', body: '# IELTS Reading Matching Information — audit gate' },
      {
        id: 'executive_summary',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## Executive Summary\n\n' +
          `- The F0.2b.4 control passes; the ${validation.scope.passages} passages do not. All remain quarantined.\n` +
          `- Independent review covered ${validation.scope.questions}/${validation.scope.questions} statements, matched all stored paragraph mappings and found ${validation.expertReview.materialAmbiguityCount} material ambiguities.\n` +
          `- Predicting A–E for question positions 1–5 succeeds on ${positionalCue.hits}/${positionalCue.eligible} eligible items; content certification remains blocked.\n` +
          '- UI/UX and Playwright are outside this audit slice because all four learner-facing hashes are unchanged.',
      },
      { id: 'metrics', type: 'metric-strip', cardIds: ['scope', 'quarantine', 'agreement', 'ambiguity'] },
      {
        id: 'gate',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## The dossier passes; the bank is blocked\n\n' +
          'Hashes pin identity, incomplete rights records fail closed, and candidate evidence remains separate from verification. Matching every stored mapping is not enough: the bank exposes a strong position shortcut, most factual claims are oversimplified or untraceable, and no author, license, human factual review or human approval is recorded.',
      },
      { id: 'decision_table', type: 'table', tableId: 'asset_decisions', layout: 'full' },
      {
        id: 'matching_logic',
        type: 'markdown',
        sourceId: 'expert_verdict',
        body:
          '## Exact evidence and paragraph competition are explicit contracts\n\n' +
          'Each statement must resolve to one paragraph through an exact supporting span and a defensible paraphrase. The reviewer must also identify the closest competing paragraph and explain why it fails. Paragraph reuse is allowed only because every scoped instruction explicitly permits it.',
      },
      {
        id: 'label_context',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## Paragraph-letter counts alone do not certify balance\n\n' +
          `The stored mappings are A ${validation.antiBias.storedKeyProfile.answerCounts.A}, B ${validation.antiBias.storedKeyProfile.answerCounts.B}, C ${validation.antiBias.storedKeyProfile.answerCounts.C}, D ${validation.antiBias.storedKeyProfile.answerCounts.D} and E ${validation.antiBias.storedKeyProfile.answerCounts.E}. The position-based A–E rule applies to ${positionalCue.eligible} statements and succeeds on ${positionalCue.hits} (${Math.round(positionalCue.conditionalAccuracy * 100)}%). Sequence, length, lexical overlap, titles and paragraph competition are audited separately.`,
      },
      { id: 'label_chart', type: 'chart', chartId: 'label_counts', layout: 'full' },
      {
        id: 'factual_context',
        type: 'markdown',
        sourceId: 'expert_verdict',
        body:
          '## Plausible wording is not source verification\n\n' +
          'The direct-source pass found three of 15 declared claims supported as written; five were oversimplified and seven untraceable. Candidate institutional sources can contextualize a claim without proving the passage, its authorship or its license.',
      },
      { id: 'claim_chart', type: 'chart', chartId: 'claim_assessments', layout: 'full' },
      {
        id: 'learning',
        type: 'markdown',
        sourceId: 'student_walkthrough',
        body:
          '## The content still exposes useful learning targets\n\n' +
          'The clean walkthrough traces scanning cues, paraphrase checks, exact evidence and competitor rejection across all 18 statements. Its value is prospective and diagnostic: it assigns no paragraph mappings or bands and does not represent a real learner study.',
      },
      {
        id: 'panel_scope',
        type: 'markdown',
        sourceId: 'audit_verdicts',
        body:
          '## Panel scope\n\n' +
          'Applicable lanes pass only for a complete, conservative and reproducible dossier. UI/UX and Playwright are not applicable to this unchanged learner-facing delta; that is not approval of the existing interface.',
      },
      { id: 'panel_table', type: 'table', tableId: 'panel_verdicts', layout: 'full' },
      {
        id: 'recommendations',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## Recommended next decisions\n\n' +
          '1. Redesign question order and independently re-adjudicate it until the A–E position shortcut no longer predicts mappings.\n' +
          '2. Reduce direct lexical overlap and remeasure all paragraph-selection heuristics.\n' +
          '3. Resolve authorship, rights, exact factual support and independent human review for all three passages.\n' +
          '4. Keep F0.2b open; begin F0.2b.5 Matching Headings only in the next loop iteration.',
      },
      {
        id: 'caveats',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## Caveats and open questions\n\n' +
          'The provenance search is directed and non-exhaustive. Source reachability is not verification. Both independent reviews are AI simulations without human signatures. The 18-question sample cannot certify statistical fairness. Runtime quarantine enforcement and learner-facing UI remain separate open units.',
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

writeFileSync(resolve(here, 'artifact.json'), `${JSON.stringify(artifact, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({
  title: artifact.manifest.title,
  status: artifact.snapshot.status,
  cards: artifact.manifest.cards.length,
  charts: artifact.manifest.charts.length,
  tables: artifact.manifest.tables.length,
  decisions: artifact.snapshot.datasets.decisions.length,
}, null, 2)}\n`);
