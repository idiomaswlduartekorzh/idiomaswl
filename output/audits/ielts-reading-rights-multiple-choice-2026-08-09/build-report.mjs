#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const validation = JSON.parse(readFileSync(resolve(HERE, 'validation.json'), 'utf8'));
const audit = JSON.parse(readFileSync(resolve(HERE, 'audit-verdicts.json'), 'utf8'));

const generatedAt = validation.generatedAt;
const BASE = 'output/audits/ielts-reading-rights-multiple-choice-2026-08-09';
const paths = {
  validation: `${BASE}/validation.json`,
  baseline: `${BASE}/baseline.json`,
  blind: `${BASE}/blind-review.json`,
  factual: `${BASE}/factual-source-review.json`,
  expert: `${BASE}/expert-verdict.json`,
  student: `${BASE}/student-walkthrough.json`,
  availability: `${BASE}/source-availability.json`,
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
  { id: 'validation', label: 'Executable F0.2b.1 validation', path: paths.validation },
  { id: 'baseline', label: 'Pinned learner-facing and bank baseline', path: paths.baseline },
  { id: 'blind_packet', label: 'Content-only blind review packet', path: paths.blind },
  { id: 'factual_packet', label: 'Second-pass claim and source packet', path: paths.factual },
  { id: 'expert_verdict', label: 'Independent two-pass IELTS review', path: paths.expert },
  { id: 'student_walkthrough', label: 'Content-only average-student simulation', path: paths.student },
  { id: 'source_availability', label: 'Candidate-source availability ledger', path: paths.availability },
  { id: 'audit_verdicts', label: 'Final multi-lane panel verdicts', path: paths.audit },
  sqlSource({
    id: 'summary_query',
    label: 'F0.2b.1 scope and disposition summary',
    tablesUsed: [paths.validation],
    sql: `SELECT
  scope.assets AS assets,
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
    id: 'position_query',
    label: 'Correct-option position counts',
    tablesUsed: [paths.validation],
    sql: `UNPIVOT (
  SELECT antiBias.correctOptionIndexCounts.*
  FROM read_json_auto('${paths.validation}')
) ON A, B, C, D INTO NAME position VALUE count;`,
  }),
  sqlSource({
    id: 'claim_query',
    label: 'Independent factual-claim assessments',
    tablesUsed: [paths.validation],
    sql: `SELECT claim.assessment, COUNT(*) AS claims
FROM read_json_auto('${paths.validation}') AS report,
UNNEST(report.expertReview.factualClaimAssessments) AS rows(claim)
GROUP BY claim.assessment;`,
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
  assets: validation.scope.assets,
  questions: validation.scope.questions,
  quarantined: validation.decisions.filter(row => row.disposition === 'quarantine').length,
  expertMatches: validation.expertReview.answerAgreement.matches,
  expertTotal: validation.expertReview.answerAgreement.total,
  materialAmbiguities: validation.expertReview.materialAmbiguityCount,
}];
const positionRows = Object.entries(validation.antiBias.correctOptionIndexCounts).map(
  ([position, count]) => ({ position, count }),
);
const claimCounts = validation.expertReview.factualClaimAssessments.reduce((counts, row) => {
  counts[row.assessment] = (counts[row.assessment] ?? 0) + 1;
  return counts;
}, {});
const claimRows = ['supported', 'oversimplified', 'unsupported', 'untraceable'].map(
  assessment => ({ assessment, claims: claimCounts[assessment] ?? 0 }),
);
const decisionRows = validation.decisions.map(({ reasonCodes, ...row }) => ({
  ...row,
  blockers: reasonCodes.join(' · '),
}));

const artifact = {
  surface: 'report',
  manifest: {
    version: 1,
    surface: 'report',
    title: 'IELTS Reading Multiple Choice — audit gate',
    description:
      'F0.2b.1 report for provenance, content integrity, cognitive value and shortcut risk.',
    generatedAt,
    cards: [
      {
        id: 'assets',
        description: 'Multiple Choice passages in the scoped formative bank.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [{ label: 'Scoped assets', field: 'assets', format: 'number' }],
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
        description: 'Independent answer selections matching the current source keys.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [
          { label: 'Expert key agreement', field: 'expertMatches', format: 'number' },
          { label: 'Questions reviewed', field: 'expertTotal', format: 'number' },
        ],
      },
      {
        id: 'ambiguity',
        description: 'Questions with material ambiguity in the independent review.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [{ label: 'Material ambiguities', field: 'materialAmbiguities', format: 'number' }],
      },
    ],
    charts: [
      {
        id: 'correct_position_counts',
        title: 'The fourth option is never correct',
        subtitle:
          'Question: is correct-answer placement balanced? Counts are structural signals from 18 questions, not statistical certification.',
        type: 'bar',
        dataset: 'positions',
        sourceId: 'position_query',
        valueFormat: 'number',
        encodings: {
          x: { field: 'position', type: 'nominal', label: 'Correct option position' },
          y: { field: 'count', type: 'quantitative', label: 'Questions' },
        },
      },
      {
        id: 'claim_assessments',
        title: 'Only two of twelve selected factual claims are supported',
        subtitle:
          'Independent second-pass assessment against the declared candidate sources; candidate sources are not publication approval.',
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
        subtitle: 'Every record fails closed for the same five unresolved gates.',
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
      {
        id: 'title',
        type: 'markdown',
        body: '# IELTS Reading Multiple Choice — audit gate',
      },
      {
        id: 'executive_summary',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## Executive Summary\n\n' +
          '- The F0.2b.1 control passes; the three passages do not. All remain quarantined.\n' +
          '- Independent review reproduced 18/18 answer keys and found no material ambiguity, but IELTS fitness is mixed.\n' +
          '- Only 2 of 12 selected factual claims are supported by the declared candidate evidence.\n' +
          '- Answer placement and option length create detectable shortcuts, so content certification remains blocked.',
      },
      { id: 'metrics', type: 'metric-strip', cardIds: ['assets', 'quarantined', 'agreement', 'ambiguity'] },
      {
        id: 'decision',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## The gate works; the bank is not ready\n\n' +
          'Identity is pinned by object and passage hashes, candidate evidence is separated from factual verification, and malformed or incomplete records fail closed. None of those controls supplies authorship, a license, human approval or claim-level factual review. The only safe decision today is quarantine.',
      },
      { id: 'decision_table', type: 'table', tableId: 'asset_decisions', layout: 'full' },
      {
        id: 'key_quality',
        type: 'markdown',
        sourceId: 'expert_verdict',
        body:
          '## The keys are coherent, but the IELTS challenge is uneven\n\n' +
          'A two-pass reviewer answered from the content-only packet before seeing candidate sources. All 18 selections matched the stored keys and no material ambiguity was found. That validates internal answerability, not official equivalence: all three passages were rated mixed because several distractors are absolute, direct or too easy to eliminate.',
      },
      {
        id: 'bias_context',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## Answer position and option length make shortcuts plausible\n\n' +
          'D is never correct, while A and B account for 14 of 18 answers. In the 13 questions with one uniquely longest option, that option is correct 10 times. The sample is too small for statistical certification, but the pattern is strong enough to block editorial balance certification and require rebalancing.',
      },
      { id: 'position_chart', type: 'chart', chartId: 'correct_position_counts', layout: 'full' },
      {
        id: 'factual_context',
        type: 'markdown',
        sourceId: 'expert_verdict',
        body:
          '## Most factual claims are not ready\n\n' +
          'The second pass assessed 12 exact claims: 2 supported, 4 oversimplified, 1 unsupported and 5 untraceable. The sleep word-pair study has no matching source in the declared set; several sleep generalizations exceed that evidence; and the Millgate project, survey, loading bays and cafés are not traceable. Millgate should be declared synthetic or replaced with a documented case.',
      },
      { id: 'claim_chart', type: 'chart', chartId: 'claim_assessments', layout: 'full' },
      {
        id: 'learning',
        type: 'markdown',
        sourceId: 'student_walkthrough',
        body:
          '## The material still reveals useful teaching targets\n\n' +
          'The clean student simulation found value in paraphrase, scope, contrast markers, limited inference and synthesis. It also predicts lexical matching, prior-belief answers and overreliance on absolute language. A revised bank should require students to locate evidence, explain why each distractor fails and transfer the strategy to a new option order.',
      },
      {
        id: 'panel_scope',
        type: 'markdown',
        sourceId: 'audit_verdicts',
        body:
          '## Panel scope\n\n' +
          'The five applicable lanes pass because the dossier is complete, conservative and reproducible. UI/UX and Playwright are not applicable to this slice because the route, catalog and engine are unchanged by hash. No lane claims learner-facing conformity, copyright clearance or publication readiness.',
      },
      { id: 'panel_table', type: 'table', tableId: 'panel_verdicts', layout: 'full' },
      {
        id: 'recommendations',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## Recommended next decisions\n\n' +
          '1. Resolve or replace every untraceable factual claim, beginning with Millgate and the sleep study.\n' +
          '2. Record author, rights basis, license evidence and an independent human review for each passage.\n' +
          '3. Rewrite distractors and rebalance correct positions without weakening the semantic key.\n' +
          '4. Keep the parent F0.2b open and move to F0.2b.2 only in the next loop iteration.',
      },
      {
        id: 'caveats',
        type: 'markdown',
        sourceId: 'validation',
        body:
          '## Caveats and open questions\n\n' +
          'The provenance search was directed and non-exhaustive. Source reachability is not factual verification. The expert and student reviews are AI simulations without human signatures. The 18-question sample cannot support a statistical fairness claim. Runtime quarantine enforcement, the visible originality claim and the learner UI remain separate open units.',
      },
    ],
  },
  snapshot: {
    version: 1,
    generatedAt,
    status: audit.status === 'pass' ? 'ready' : 'pending-audit',
    datasets: {
      summary: summaryRows,
      positions: positionRows,
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
