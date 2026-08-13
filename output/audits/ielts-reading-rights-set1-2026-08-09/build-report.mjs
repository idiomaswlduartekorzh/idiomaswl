#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const validation = JSON.parse(readFileSync(resolve(HERE, 'validation.json'), 'utf8'));
const blindReview = JSON.parse(readFileSync(resolve(HERE, 'blind-review.json'), 'utf8'));
const auditPath = resolve(HERE, 'audit-verdicts.json');
const audit = existsSync(auditPath)
  ? JSON.parse(readFileSync(auditPath, 'utf8'))
  : {
      schemaVersion: 'ielts-reading-rights-set1-audit-verdicts.v1',
      status: 'pending',
      rows: [{ lane: 'Panel', verdict: 'PENDING', scope: 'F0.2a', findings: 'Awaiting review.' }],
    };

const generatedAt = validation.generatedAt;
const validationPath =
  'output/audits/ielts-reading-rights-set1-2026-08-09/validation.json';
const blindPath =
  'output/audits/ielts-reading-rights-set1-2026-08-09/blind-review.json';
const auditRelativePath =
  'output/audits/ielts-reading-rights-set1-2026-08-09/audit-verdicts.json';

const rawSources = [
  { id: 'rights_validation', label: 'Executable F0.2a validation result', path: validationPath },
  { id: 'blind_review_packet', label: 'Key-free F0.2a review packet', path: blindPath },
  { id: 'audit_verdicts', label: 'Independent panel verdicts', path: auditRelativePath },
  {
    id: 'ielts_copyright_policy',
    label: 'IELTS copyright and trade mark statement',
    url: 'https://ielts.org/legal/ielts-copyright-and-trade-mark-statement',
  },
  {
    id: 'cambridge_catalog',
    label: 'Cambridge ELT catalogue — Cambridge IELTS 5',
    url: 'https://www.cambridge.org/elt/order/catalogue/Exams.pdf',
  },
];
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
const summaryQuery = sqlSource({
  id: 'rights_summary_query',
  label: 'F0.2a coverage and disposition summary',
  tablesUsed: [validationPath],
  sql: `SELECT
  scope.registryEntries AS assets,
  COUNT(*) FILTER (WHERE decision.disposition = 'quarantine') AS quarantined,
  list_count(blockerCounts) AS blockerTypes,
  checks.actualAssetsAllQuarantined AS denyByDefault
FROM read_json_auto('${validationPath}') AS report,
UNNEST(report.decisions) AS rows(decision)
GROUP BY ALL;`,
});
const blockerQuery = sqlSource({
  id: 'rights_blocker_query',
  label: 'Unresolved gates by affected asset count',
  tablesUsed: [validationPath],
  sql: `SELECT blocker.reasonCode, blocker.affectedAssets
FROM read_json_auto('${validationPath}') AS report,
UNNEST(report.blockerCounts) AS rows(blocker);`,
});
const decisionQuery = sqlSource({
  id: 'rights_decision_query',
  label: 'Per-asset deny-by-default decisions',
  tablesUsed: [validationPath],
  sql: `SELECT
  decision.assetId,
  decision.title,
  decision.moduleStatus,
  decision.provenanceStatus,
  decision.rightsBasis,
  decision.authorizationEvidenceStatus,
  decision.humanReviewStatus,
  decision.disposition,
  array_to_string(decision.reasonCodes, ' · ') AS blockers,
  decision.sourceObjectSha256,
  decision.passageSha256
FROM read_json_auto('${validationPath}') AS report,
UNNEST(report.decisions) AS rows(decision);`,
});
const evidenceQuery = sqlSource({
  id: 'rights_evidence_query',
  label: 'Evidence reviewed and its declared role',
  tablesUsed: [blindPath],
  sql: `SELECT evidence.*
FROM read_json_auto('${blindPath}') AS packet,
UNNEST(packet.evidence) AS rows(evidence);`,
});
const auditQuery = sqlSource({
  id: 'rights_audit_query',
  label: 'Independent F0.2a audit verdicts',
  tablesUsed: [auditRelativePath],
  sql: `SELECT verdict.*
FROM read_json_auto('${auditRelativePath}') AS audit,
UNNEST(audit.rows) AS rows(verdict);`,
});
const sources = [
  ...rawSources,
  summaryQuery,
  blockerQuery,
  decisionQuery,
  evidenceQuery,
  auditQuery,
];

const summaryRows = [{
  assets: validation.scope.registryEntries,
  quarantined: validation.decisions.filter(row => row.disposition === 'quarantine').length,
  blockerTypes: validation.blockerCounts.length,
  denyByDefault: validation.checks.actualAssetsAllQuarantined,
}];
const decisionRows = validation.decisions.map(({ reasonCodes, ...row }) => ({
  ...row,
  blockers: reasonCodes.join(' · '),
}));

const artifact = {
  surface: 'report',
  manifest: {
    version: 1,
    surface: 'report',
    title: 'IELTS Academic Reading — set-1 rights gate',
    description:
      'Technical F0.2a report for source identity, evidence scope and deny-by-default behavior.',
    generatedAt,
    cards: [
      {
        id: 'assets',
        description: 'Reading sections in the scoped mock.',
        dataset: 'summary',
        sourceId: 'rights_summary_query',
        metrics: [{ label: 'Scoped assets', field: 'assets', format: 'number' }],
      },
      {
        id: 'quarantined',
        description: 'Assets denied entry to the publication pipeline.',
        dataset: 'summary',
        sourceId: 'rights_summary_query',
        metrics: [{ label: 'Quarantined', field: 'quarantined', format: 'number' }],
      },
      {
        id: 'blockers',
        description: 'Distinct unresolved contract gates.',
        dataset: 'summary',
        sourceId: 'rights_summary_query',
        metrics: [{ label: 'Blocker types', field: 'blockerTypes', format: 'number' }],
      },
    ],
    charts: [
      {
        id: 'blockers_by_gate',
        title: 'Every set-1 passage remains blocked by five independent gates',
        subtitle:
          'Question: what prevents advancement? Each bar counts affected assets; no bar is a legal conclusion.',
        type: 'bar',
        dataset: 'blocker_counts',
        sourceId: 'rights_blocker_query',
        valueFormat: 'number',
        encodings: {
          x: { field: 'reasonCode', type: 'nominal', label: 'Unresolved gate' },
          y: { field: 'affectedAssets', type: 'quantitative', label: 'Affected assets' },
        },
      },
    ],
    tables: [
      {
        id: 'asset_decisions',
        title: 'Per-asset decision ledger',
        subtitle: 'Hashes pin identity; probable matching never becomes authorization.',
        dataset: 'decisions',
        sourceId: 'rights_decision_query',
        defaultSort: { field: 'assetId', direction: 'asc' },
        density: 'dense',
        layout: 'full',
        columns: [
          { field: 'assetId', label: 'Asset', type: 'text' },
          { field: 'title', label: 'Observed title', type: 'text' },
          { field: 'moduleStatus', label: 'Module', type: 'text' },
          { field: 'provenanceStatus', label: 'Provenance', type: 'text' },
          { field: 'rightsBasis', label: 'Rights basis', type: 'text' },
          { field: 'humanReviewStatus', label: 'Human review', type: 'text' },
          { field: 'disposition', label: 'Disposition', type: 'text' },
          { field: 'blockers', label: 'Blocking gates', type: 'text' },
          { field: 'sourceObjectSha256', label: 'Object SHA-256', type: 'text' },
          { field: 'passageSha256', label: 'Passage SHA-256', type: 'text' },
        ],
      },
      {
        id: 'evidence_reviewed',
        title: 'Evidence reviewed',
        subtitle: 'Identification sources are not license documents.',
        dataset: 'evidence',
        sourceId: 'rights_evidence_query',
        defaultSort: { field: 'id', direction: 'asc' },
        columns: [
          { field: 'id', label: 'Evidence ID', type: 'text' },
          { field: 'kind', label: 'Kind', type: 'text' },
          { field: 'label', label: 'Label', type: 'text' },
          { field: 'location', label: 'Location', type: 'text' },
          { field: 'accessedAt', label: 'Reviewed', type: 'text' },
          { field: 'note', label: 'Scope note', type: 'text' },
        ],
      },
      {
        id: 'audit_verdicts',
        title: 'Independent panel verdicts',
        subtitle: 'Verdicts apply only to F0.2a, not to content quality, legality or publication.',
        dataset: 'audit',
        sourceId: 'rights_audit_query',
        defaultSort: { field: 'lane', direction: 'asc' },
        columns: [
          { field: 'lane', label: 'Lane', type: 'text' },
          { field: 'verdict', label: 'Verdict', type: 'text' },
          { field: 'scope', label: 'Scope', type: 'text' },
          { field: 'findings', label: 'Findings', type: 'text' },
        ],
      },
    ],
    sources,
    blocks: [
      { id: 'title', type: 'markdown', body: '# IELTS Academic Reading — set-1 rights gate' },
      {
        id: 'summary',
        type: 'markdown',
        sourceId: 'rights_validation',
        body:
          '## The control passes; the three passages do not\n\n' +
          'F0.2a now identifies and fingerprints all three Reading sections in `set-1`, but every actual record remains `unknown-quarantined`. The result is a working denial gate, not copyright clearance, IELTS approval or a content-quality verdict.',
      },
      { id: 'metrics', type: 'metric-strip', cardIds: ['assets', 'quarantined', 'blockers'] },
      {
        id: 'gate_explanation',
        type: 'markdown',
        sourceId: 'rights_validation',
        body:
          '## Advancement needs five independent facts\n\n' +
          'An asset can only become eligible for later editorial review when its module is declared, authorship is identified, a basis-specific rights record is verified, factual review is complete and an independent human reviewer approves. Missing records and changed hashes fail closed.',
      },
      { id: 'blocker_chart', type: 'chart', chartId: 'blockers_by_gate', layout: 'full' },
      { id: 'decision_table', type: 'table', tableId: 'asset_decisions', layout: 'full' },
      {
        id: 'evidence_scope',
        type: 'markdown',
        sourceId: 'blind_review_packet',
        body:
          '## The match is a warning signal, not permission\n\n' +
          'A publisher catalog and two directed external pages support a high-confidence identification with Cambridge IELTS 5 Academic Reading Test 2. No authorization evidence was located in the sources reviewed. The search was directed and non-exhaustive; it neither proves universal absence nor reaches a legal conclusion.',
      },
      { id: 'evidence_table', type: 'table', tableId: 'evidence_reviewed', layout: 'full' },
      {
        id: 'privacy',
        type: 'markdown',
        sourceId: 'rights_validation',
        body:
          '## The registry is safe to audit\n\n' +
          'The durable registry and blind packet contain IDs, hashes, statuses and evidence references only. Recursive guards reject passage, question, option, answer-key and common PII fields. Automated triage is explicitly marked as incapable of human approval.',
      },
      {
        id: 'audit_intro',
        type: 'markdown',
        sourceId: 'audit_verdicts',
        body:
          '## Panel scope\n\n' +
          'A PASS means the F0.2a control is reproducible and conservatively scoped. It does not validate the learner-facing mock, its answers, its pedagogy, its accessibility or its legal publishability.',
      },
      { id: 'audit_table', type: 'table', tableId: 'audit_verdicts', layout: 'full' },
      {
        id: 'limitations',
        type: 'markdown',
        sourceId: 'rights_validation',
        body:
          '## Open work\n\n' +
          'The parent F0.2 remains open. This slice does not enforce quarantine in the public mock runner, resolve ownership, collect licenses, verify factual claims, declare module at asset level, adjudicate keys or audit the UI. Those remain separate, named subunits.',
      },
    ],
  },
  snapshot: {
    version: 1,
    generatedAt,
    status: audit.status === 'pass' ? 'ready' : 'pending-audit',
    datasets: {
      summary: summaryRows,
      blocker_counts: validation.blockerCounts,
      decisions: decisionRows,
      evidence: blindReview.evidence,
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
