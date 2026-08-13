#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const validation = JSON.parse(readFileSync(resolve(here, 'validation.json'), 'utf8'));
const audit = JSON.parse(readFileSync(resolve(here, 'audit-verdicts.json'), 'utf8'));
const reportGeneratedAt = audit.reviewedAt;
const base = 'output/audits/ielts-reading-rights-table-completion-2026-08-11';
const paths = {
  validation: `${base}/validation.json`,
  baseline: `${base}/baseline.json`,
  promptOnly: `${base}/prompt-only.json`,
  promptOnlyVerdict: `${base}/prompt-only-verdict.json`,
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

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

assert(validation.schemaVersion ===
  'ielts-reading-table-completion-rights-validation.v1',
'validation.json no satisface el contrato F0.2b.11.');
assert(audit.schemaVersion ===
  'ielts-reading-table-completion-audit-verdicts.v1' && audit.status === 'pass',
'audit-verdicts.json no satisface el contrato F0.2b.11.');
assert(validation.scope.passages === 3 && validation.scope.questions === 18 &&
  validation.scope.canonicalAnswers === 18 && validation.scope.rawAcceptedEntries === 18,
'El builder se niega a narrar un scope distinto de 3/18/18/18.');
assert(validation.expertReview.answerAgreement.total === 18 &&
  validation.expertReview.answerAgreement.matches === 18,
'El builder requiere la revisión limpia 18/18, sin convertirla en content clearance.');

const profile = validation.antiShortcut.storedProfile;
const quarantined = validation.decisions.filter(row => row.disposition === 'quarantine').length;
const clientKeys = validation.runtime.clientSideCanonicalAnswersPresent ?
  validation.scope.canonicalAnswers : 0;
const preResponseHints = validation.runtime.preResponseHintsAvailable ?
  validation.scope.questions : 0;
const noteRows = [{
  passages: validation.scope.passages,
  questions: validation.scope.questions,
  canonicalAnswers: validation.scope.canonicalAnswers,
  acceptedEntries: validation.scope.rawAcceptedEntries,
  quarantined,
  expertMatches: validation.expertReview.answerAgreement.matches,
  expertTotal: validation.expertReview.answerAgreement.total,
  materialAmbiguities: validation.expertReview.materialAmbiguityCount,
  orderViolations: validation.expertReview.passageOrderViolationQuestionIds.length,
}];
const answerLengthRows = [
  { answerWords: '1 word', count: profile.canonicalAnswerWordCountDistribution.oneWord },
  { answerWords: '2 words', count: profile.canonicalAnswerWordCountDistribution.twoWords },
  { answerWords: 'over limit', count: profile.canonicalAnswerWordCountDistribution.overLimit },
];
const shortcutRows = [
  {
    stage: 'prompt-only unique',
    hits: validation.shortcutReview.promptOnly.hits,
    predictions: validation.shortcutReview.promptOnly.uniquePredictions,
  },
  {
    stage: 'always two words',
    hits: profile.alwaysTwoWordAnswerPredictor.hits,
    predictions: profile.alwaysTwoWordAnswerPredictor.eligible,
  },
  {
    stage: 'position-modal word count',
    hits: profile.sameQuestionPositionAcrossSetsModalAnswerWordCount.hits,
    predictions: profile.sameQuestionPositionAcrossSetsModalAnswerWordCount.eligible,
  },
];
const claimRows = Object.entries(validation.expertReview.factualAssessmentCounts)
  .map(([assessment, claims]) => ({ assessment, claims }));
const decisionRows = validation.decisions.map(decision => {
  const row = { ...decision };
  delete row.reasonCodes;
  row.blockers = decision.reasonCodes.join(' · ');
  return row;
});

const lengthTotal = answerLengthRows.reduce((sum, row) => sum + row.count, 0);
const claimTotal = claimRows.reduce((sum, row) => sum + row.claims, 0);
const answerLengthSummary = answerLengthRows
  .map(row => `${row.answerWords} ${row.count}`).join(', ');
const shortcutSummary = shortcutRows
  .map(row => `${row.stage} ${row.hits}/${row.predictions}`).join('; ');
const factualSummary = claimRows.map(row => `${row.assessment} ${row.claims}`).join(', ');
const ambiguityIds = validation.expertReview.materialAmbiguityQuestionIds;
const conflictIds = validation.expertReview.keyConflictQuestionIds;
const ambiguitySummary = ambiguityIds.length ? ambiguityIds.join(', ') : 'none recorded';
const conflictSummary = conflictIds.length ? conflictIds.join(', ') : 'none recorded';
const runtimeClassification = validation.runtime.classification;
const positionParagraphHits =
  profile.sameQuestionPositionAcrossSetsModalEvidenceParagraph.hits;
const positionParagraphEligible =
  profile.sameQuestionPositionAcrossSetsModalEvidenceParagraph.eligible;
const positionLengthHits =
  profile.sameQuestionPositionAcrossSetsModalAnswerWordCount.hits;
const positionLengthEligible =
  profile.sameQuestionPositionAcrossSetsModalAnswerWordCount.eligible;
const textOrderRiskIds = validation.expertReview.passageOrderViolationQuestionIds;
const firstMatchOrderRiskIds = profile.naiveFirstOccurrenceOrderViolationQuestionIds;
const exactOneEstablished = profile.frameGrammaticalFit.exactOneBestAnswerEstablished;

assert(lengthTotal === validation.scope.canonicalAnswers,
'La distribución de longitudes no suma el total canónico.');
assert(quarantined === validation.scope.passages &&
  validation.decisions.every(row => row.rightsBasis === 'unknown-quarantined' &&
    row.eligibleForPublicationPipeline === false),
'El builder requiere cuarentena fail-closed 3/3 y rightsBasis unknown-quarantined.');
assert(clientKeys === 18 && preResponseHints === 18,
'El builder requiere detectar 18/18 keys cliente y 18/18 hints pre-response.');
assert(positionParagraphHits === 13 && positionParagraphEligible === 18 &&
  positionLengthHits === 17 && positionLengthEligible === 18,
'Cambió el perfil de posición→párrafo 13/18 o longitud 17/18.');
assert(profile.alwaysTwoWordAnswerPredictor.hits === 1 &&
  profile.alwaysTwoWordAnswerPredictor.eligible === 18,
'Cambió el predictor always-two-words 1/18.');
assert(textOrderRiskIds.join('|') ===
  ['table-rain-gardens-01-2', 'table-museum-inventory-01-2'].join('|'),
'Cambió el inventario de violaciones de orden textual.');
assert(firstMatchOrderRiskIds.join('|') === [
  'table-rain-gardens-01-2',
  'table-rain-gardens-02-1',
  'table-rain-gardens-03-1',
  'table-museum-inventory-01-2',
].join('|'), 'Cambió el riesgo de first-match.');
assert(ambiguityIds.includes('table-cooling-01-2') && exactOneEstablished === 17,
'Falta el bloqueo exact-one-best-answer de table-cooling-01-2.');
assert(runtimeClassification.includes('guided-training') &&
  validation.antiShortcut.contentCertification ===
    'blocked-runtime-rights-editorial-review-required',
'El builder no puede presentar este runtime como Practice/Exam ni el contenido como certificado.');
assert(validation.scope.scopedLearnerSourcesChangedSinceBaseline === false &&
  validation.applicability.uiUxAccessibility.includes('not-applicable') &&
  validation.applicability.playwright.includes('not-applicable'),
'UI/UX y Playwright solo pueden ser ➖ sin delta learner-facing.');

const source = (id, label, path) => ({ id, label, path });
const sqlSource = ({ id, label, sql, tablesUsed, description }) => ({
  id,
  label,
  query: {
    engine: 'duckdb',
    language: 'sql',
    sql,
    description: description ?? label,
    executed_at: reportGeneratedAt,
    tables_used: tablesUsed,
  },
});
const sources = [
  source('validation', 'Executable F0.2b.11 validation', paths.validation),
  source('baseline', 'Pinned Table Completion bank and learner-runtime baseline',
    paths.baseline),
  source('prompt_only_packet', 'Prompt-only visible-table shortcut packet', paths.promptOnly),
  source('prompt_only_verdict', 'Independent prompt-only shortcut verdict',
    paths.promptOnlyVerdict),
  source('blind_packet', 'Passage-based clean expert packet', paths.blind),
  source('expert_first_pass', 'Persisted pre-source one-best-answer adjudication',
    paths.firstPass),
  source('factual_packet', 'Second-pass exact-claim and candidate-source packet',
    paths.factual),
  source('expert_verdict', 'Independent two-pass IELTS and factual review', paths.expert),
  source('student_walkthrough', 'Content-only average-student walkthrough', paths.student),
  source('source_availability', 'Official and factual source availability ledger',
    paths.availability),
  source('provenance_search', 'Directed, non-exhaustive provenance search', paths.provenance),
  source('unit_change_manifest', 'Scoped audit-only unit change manifest', paths.manifest),
  source('audit_verdicts', 'Final multi-lane panel verdicts', paths.audit),
  sqlSource({
    id: 'note_query',
    label: 'F0.2b.11 scope, disposition and expert-review summary',
    tablesUsed: [paths.validation],
    description: 'One source-backed row for scope, quarantine, ambiguity and expert-review cards.',
    sql: [
      'SELECT',
      '  scope.passages AS passages,',
      '  scope.questions AS questions,',
      '  scope.canonicalAnswers AS canonicalAnswers,',
      '  scope.rawAcceptedEntries AS acceptedEntries,',
      "  COUNT(*) FILTER (WHERE decision.disposition = 'quarantine') AS quarantined,",
      '  expertReview.answerAgreement.matches AS expertMatches,',
      '  expertReview.answerAgreement.total AS expertTotal,',
      '  expertReview.materialAmbiguityCount AS materialAmbiguities,',
      '  array_length(expertReview.passageOrderViolationQuestionIds) AS orderViolations',
      `FROM read_json_auto('${paths.validation}') AS report,`,
      'UNNEST(report.decisions) AS rows(decision)',
      'GROUP BY ALL;',
    ].join('\n'),
  }),
  sqlSource({
    id: 'answer_length_query',
    label: 'Canonical answer word-count distribution',
    tablesUsed: [paths.validation],
    description: 'Canonical stored-answer lengths against the two-word limit.',
    sql: [
      'WITH profile AS (',
      `  SELECT antiShortcut.storedProfile.* FROM read_json_auto('${paths.validation}')`,
      ')',
      "SELECT '1 word' AS answerWords, canonicalAnswerWordCountDistribution.oneWord AS count FROM profile",
      "UNION ALL SELECT '2 words', canonicalAnswerWordCountDistribution.twoWords FROM profile",
      "UNION ALL SELECT 'over limit', canonicalAnswerWordCountDistribution.overLimit FROM profile;",
    ].join('\n'),
  }),
  sqlSource({
    id: 'shortcut_query',
    label: 'No-passage shortcut performance',
    tablesUsed: [paths.validation],
    description: 'Prompt-only and structural shortcut hits with their own denominators.',
    sql: [
      'WITH report AS (',
      `  SELECT * FROM read_json_auto('${paths.validation}')`,
      ')',
      "SELECT 'prompt-only unique' AS stage, shortcutReview.promptOnly.hits AS hits, shortcutReview.promptOnly.uniquePredictions AS predictions FROM report",
      "UNION ALL SELECT 'always two words', antiShortcut.storedProfile.alwaysTwoWordAnswerPredictor.hits, antiShortcut.storedProfile.alwaysTwoWordAnswerPredictor.eligible FROM report",
      "UNION ALL SELECT 'position-modal word count', antiShortcut.storedProfile.sameQuestionPositionAcrossSetsModalAnswerWordCount.hits, antiShortcut.storedProfile.sameQuestionPositionAcrossSetsModalAnswerWordCount.eligible FROM report;",
    ].join('\n'),
  }),
  sqlSource({
    id: 'claim_query',
    label: 'Independent factual-claim assessments',
    tablesUsed: [paths.validation],
    description: 'Counts from exact-claim source review; not rights or human clearance.',
    sql: [
      'UNPIVOT (',
      '  SELECT expertReview.factualAssessmentCounts.*',
      `  FROM read_json_auto('${paths.validation}')`,
      ') ON COLUMNS(*) INTO NAME assessment VALUE claims;',
    ].join('\n'),
  }),
  sqlSource({
    id: 'decision_query',
    label: 'Per-asset quarantine decisions',
    tablesUsed: [paths.validation],
    description: 'Exact rights, factual-review and publication disposition fields.',
    sql: [
      'SELECT decision.*',
      `FROM read_json_auto('${paths.validation}') AS report,`,
      'UNNEST(report.decisions) AS rows(decision);',
    ].join('\n'),
  }),
  sqlSource({
    id: 'audit_query',
    label: 'Final multi-lane panel verdicts',
    tablesUsed: [paths.audit],
    description: 'Panel scope, findings and carried-forward blockers.',
    sql: [
      'SELECT verdict.*',
      `FROM read_json_auto('${paths.audit}') AS audit,`,
      'UNNEST(audit.rows) AS rows(verdict);',
    ].join('\n'),
  }),
];

const cards = [
  {
    id: 'scope',
    description: 'Questions in the frozen three-passage Table Completion cohort.',
    dataset: 'note',
    sourceId: 'note_query',
    metrics: [
      { label: 'Questions', field: 'questions', format: 'number' },
      { label: 'Passages', field: 'passages', format: 'number' },
      { label: 'Accepted entries', field: 'acceptedEntries', format: 'number' },
    ],
  },
  {
    id: 'quarantine',
    description: 'Assets denied advancement by rights, content and human-review gates.',
    dataset: 'note',
    sourceId: 'note_query',
    metrics: [{ label: 'Quarantined', field: 'quarantined', format: 'number' }],
  },
  {
    id: 'agreement',
    description: 'Clean selected spans matching the stored canonical entries.',
    dataset: 'note',
    sourceId: 'note_query',
    metrics: [
      { label: 'Expert matches', field: 'expertMatches', format: 'number' },
      { label: 'Reviewed', field: 'expertTotal', format: 'number' },
    ],
  },
  {
    id: 'ambiguities',
    description: 'Questions with a defensible competing literal completion.',
    dataset: 'note',
    sourceId: 'note_query',
    metrics: [
      { label: 'Material ambiguities', field: 'materialAmbiguities', format: 'number' },
      { label: 'Order violations', field: 'orderViolations', format: 'number' },
    ],
  },
];

const charts = [
  {
    id: 'answer_lengths',
    title: 'Canonical answer word counts',
    subtitle: `All ${validation.scope.canonicalAnswers} canonical answers against the stored two-word maximum.`,
    type: 'bar',
    dataset: 'answerLengths',
    sourceId: 'answer_length_query',
    valueFormat: 'number',
    encodings: {
      x: { field: 'answerWords', type: 'nominal', label: 'Canonical answer length' },
      y: { field: 'count', type: 'quantitative', label: 'Answers' },
    },
  },
  {
    id: 'shortcut_performance',
    title: 'Prompt-only shortcut performance',
    subtitle: 'Stored-key hits; every diagnostic preserves its own denominator.',
    type: 'bar',
    dataset: 'shortcuts',
    sourceId: 'shortcut_query',
    valueFormat: 'number',
    encodings: {
      x: { field: 'stage', type: 'nominal', label: 'No-passage diagnostic' },
      y: { field: 'hits', type: 'quantitative', label: 'Stored-key hits' },
    },
  },
  {
    id: 'claim_assessments',
    title: 'Independent factual-claim assessments',
    subtitle: `${claimTotal} frozen claims after source review; not rights clearance.`,
    type: 'bar',
    dataset: 'claims',
    sourceId: 'claim_query',
    valueFormat: 'number',
    encodings: {
      x: { field: 'assessment', type: 'nominal', label: 'Assessment' },
      y: { field: 'claims', type: 'quantitative', label: 'Claims' },
    },
  },
];

const tables = [
  {
    id: 'asset_decisions',
    title: 'Per-asset decision ledger',
    subtitle: 'Every bank record remains fail-closed and quarantined.',
    dataset: 'decisions',
    sourceId: 'decision_query',
    defaultSort: { field: 'assetId', direction: 'asc' },
    density: 'dense',
    layout: 'full',
    columns: [
      { field: 'assetId', label: 'Asset', type: 'text' },
      { field: 'title', label: 'Title', type: 'text' },
      { field: 'questionCount', label: 'Questions', type: 'number' },
      { field: 'acceptedEntryCount', label: 'Accepted entries', type: 'number' },
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
    subtitle: 'PASS applies to audit completion; bank, content and security blockers remain.',
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
];

const blocks = [
  { id: 'title', type: 'markdown', body: '# IELTS Reading Table Completion — audit gate' },
  {
    id: 'answer_first',
    type: 'markdown',
    sourceId: 'validation',
    body: [
      '## Answer first',
      '',
      '- **audit PASS; bank and content certification BLOCKED.** Security/readiness gates are also BLOCKED because keys and pre-response hints are client-visible; all ' +
        `${quarantined}/${validation.scope.passages} assets remain unknown-quarantined.`,
      `- **Expert agreement is ${validation.expertReview.answerAgreement.matches}/${validation.expertReview.answerAgreement.total}; it is not content clearance.** Material ambiguities=${validation.expertReview.materialAmbiguityCount}, key conflicts=${validation.expertReview.keyConflictCount}, observed order violations=${textOrderRiskIds.length}.`,
      `- **table-cooling-01-2 lacks a secure one-best answer.** The stored “prevailing winds” competes with literal, grammatical spans such as “the direction”; the full material-ambiguity inventory is ${ambiguitySummary}.`,
      `- **The strongest structural predictor is answer length by table position.** It hits ${positionLengthHits}/${positionLengthEligible}; position predicts the evidence paragraph ${positionParagraphHits}/${positionParagraphEligible}.`,
      `- **All ${clientKeys}/${validation.scope.questions} keys reach the client and all ${preResponseHints}/${validation.scope.questions} hints are available before response.** The runtime remains guided-training, not Practice or Exam.`,
      '- **UI/UX, accessibility and Playwright are delta-scoped ➖ only.** No Table learner-facing source changed; ➖ is not conformity.',
      '- **Stop before F0.2b.12 Flow-chart Completion.** It remains not started and the F0.2b parent remains open.',
    ].join('\n'),
  },
  { id: 'metrics', type: 'metric-strip', cardIds: cards.map(card => card.id) },
  {
    id: 'scope_and_gate',
    type: 'markdown',
    sourceId: 'validation',
    body: [
      '## The gate closes a reproducible dossier, not a releasable bank',
      '',
      `The frozen cohort is ${validation.scope.passages} passages, ${validation.scope.questions} questions, ${validation.scope.canonicalAnswers} canonical answers and ${validation.scope.rawAcceptedEntries} accepted entries. Every asset remains fail-closed with rightsBasis=unknown-quarantined.`,
      '',
      'PASS means identity, packet isolation, two-pass review, source ledgers, quarantine, shortcut detection and carried-forward blockers are reproducible. It does not approve authorship, license, factual content, one-best keys, security, accessibility or assessment readiness.',
    ].join('\n'),
  },
  { id: 'decision_table', type: 'table', tableId: 'asset_decisions', layout: 'full' },
  {
    id: 'answer_contract',
    type: 'markdown',
    sourceId: 'expert_verdict',
    body: [
      '## Exact stored-key agreement coexists with material ambiguity',
      '',
      'Each clean decision must be a whole-token contiguous passage span, stay within two words, complete its table cell naturally and bind the intended offset rather than the first lexical occurrence.',
      '',
      `The selected-answer match is ${validation.expertReview.answerAgreement.matches}/${validation.expertReview.answerAgreement.total}. Material ambiguity IDs: **${ambiguitySummary}**. Key conflict IDs: **${conflictSummary}**. The static frame screen pre-flags ${validation.scope.questions - exactOneEstablished}/${validation.scope.questions}, while the clean expert finds ${ambiguityIds.length}/${validation.scope.questions} material ambiguities; the expert result controls release readiness.`,
      '',
      '**table-cooling-01-2 is release-blocking:** “prevailing winds”, “the direction” and “direction” are literal spans within the two-word limit that can complete the cell naturally. A matching selected key is therefore not proof that rejecting the competitors would be fair.',
    ].join('\n'),
  },
  {
    id: 'table_order',
    type: 'markdown',
    sourceId: 'validation',
    body: [
      '## Table rows do not guarantee passage order',
      '',
      `Official Table Completion may be out of passage order, and this bank demonstrates that risk: ${textOrderRiskIds.join(', ')} reverse the intended offset sequence. Naïve first-occurrence lookup additionally misbinds ${firstMatchOrderRiskIds.join(', ')}.`,
      '',
      'The implication is mechanical: validation and learner explanations must bind the intended evidence span, not infer correctness from row order or the first matching token.',
    ].join('\n'),
  },
  {
    id: 'answer_length_context',
    type: 'markdown',
    sourceId: 'validation',
    body: [
      '## Canonical answer lengths are highly concentrated',
      '',
      `Across n=${validation.scope.questions}, canonical lengths are ${answerLengthSummary}. The position-modal answer-length predictor hits ${positionLengthHits}/${positionLengthEligible}; always selecting two words hits ${profile.alwaysTwoWordAnswerPredictor.hits}/${profile.alwaysTwoWordAnswerPredictor.eligible}.`,
      '',
      'The chart compares categorical counts on a zero-based bar scale. These are structural diagnostics over one small bank, not learner accuracy, fairness estimates or inferential statistics.',
    ].join('\n'),
  },
  { id: 'answer_length_chart', type: 'chart', chartId: 'answer_lengths', layout: 'full' },
  {
    id: 'shortcut_context',
    type: 'markdown',
    sourceId: 'prompt_only_verdict',
    body: [
      '## Prompt-only shortcut diagnostics preserve separate denominators',
      '',
      `The frozen diagnostics are ${shortcutSummary}. The prompt-only reviewer saw table frames, headers and the word limit but no passage, keys, alternatives, hints or explanations.`,
      '',
      `Separately, position predicts the evidence paragraph ${positionParagraphHits}/${positionParagraphEligible}. The chart shows stored-key hits, not comparable accuracy rates: each bar must be interpreted with its own denominator.`,
    ].join('\n'),
  },
  { id: 'shortcut_chart', type: 'chart', chartId: 'shortcut_performance', layout: 'full' },
  {
    id: 'factual_context',
    type: 'markdown',
    sourceId: 'expert_verdict',
    body: [
      '## Factual assessment remains separate from rights clearance',
      '',
      `The second pass classifies ${claimTotal} frozen claims as ${factualSummary}. Every category, including zero-valued categories, is read from the expert verdict rather than hardcoded.`,
      '',
      'The chart is a categorical count comparison. A candidate source can support, qualify or fail to trace a claim; it cannot establish authorship, ownership, licensing, permission or independent human approval. All 3/3 assets therefore remain quarantined.',
    ].join('\n'),
  },
  { id: 'claim_chart', type: 'chart', chartId: 'claim_assessments', layout: 'full' },
  {
    id: 'runtime',
    type: 'markdown',
    sourceId: 'validation',
    body: [
      '## Word-limit enforcement and client security remain BLOCKED',
      '',
      `Recorded classification: **${runtimeClassification}**. Canonical keys for ${clientKeys}/${validation.scope.questions} questions reach the client, and ${preResponseHints}/${validation.scope.questions} hints are available before commitment. Explicit checking then reveals correctness, the key and an explanation.`,
      '',
      'The stored two-word maximum drives a visible warning but does not block checking or scoring. This surface may be described only as guided-training; it must not be represented as IELTS Practice or Exam simulation. Client-delivered keys and hints are a product-security/readiness blocker even though no exploit claim is made.',
    ].join('\n'),
  },
  {
    id: 'walkthrough',
    type: 'markdown',
    sourceId: 'student_walkthrough',
    body: [
      '## The content walkthrough supports strategy rehearsal, not efficacy claims',
      '',
      `The blind walkthrough covers ${validation.studentWalkthrough.passagesCovered}/${validation.scope.passages} passages and ${validation.studentWalkthrough.questionsCovered}/${validation.scope.questions} questions. The table can rehearse grammar checks, exact copying, word limits and evidence-location discipline.`,
      '',
      'The walkthrough is an AI simulation over content only. It cannot establish learning gain, retention, accessibility, transfer after hints are removed or behavior in the rendered UI.',
    ].join('\n'),
  },
  {
    id: 'panel_scope',
    type: 'markdown',
    sourceId: 'audit_verdicts',
    body: [
      '## UI/UX and Playwright marks are no-delta applicability marks only',
      '',
      `The ${validation.renderDependencyClosure.sourceCount}-file static render closure is pinned, and the unrelated root-layout drift was recorded outside F0.2b.11 before closure. Table content, engine and bank did not change.`,
      '',
      'UI/UX, accessibility and Playwright are therefore ➖ for this audit-only delta, not conformity passes. Portable-report browser verification is packaging QA only; it supplies no learner-runtime visual, accessibility, interaction or end-to-end assessment evidence.',
    ].join('\n'),
  },
  { id: 'panel_table', type: 'table', tableId: 'panel_verdicts', layout: 'full' },
  {
    id: 'recommendations',
    type: 'markdown',
    sourceId: 'validation',
    body: [
      '## Recommended next decisions',
      '',
      '1. Keep all three assets quarantined until authorship, license, factual review and independent human approval are recorded.',
      '2. Rewrite or re-key table-cooling-01-2 so every literal in-limit competitor fails decisively; repeat the clean one-best-answer review after the revision.',
      '3. Review every additional material-ambiguity ID in the dynamic expert inventory before calling the bank release-ready.',
      '4. Bind validation and feedback to intended evidence offsets; preserve the two observed order violations and four first-match risks as regression controls.',
      '5. Diversify answer-length and evidence-paragraph schedules, then repeat prompt-only and structural shortcut reviews.',
      '6. Enforce the stored word limit in scoring rather than warning only.',
      '7. Separate guided-training, Practice and Exam modes; keep keys and pre-response hints out of assessment clients.',
      '8. Run learner-facing accessibility, visual-parity and Playwright checks only after an authorized runtime delta.',
      '9. Stop here. F0.2b.12 Flow-chart Completion belongs to the next loop iteration.',
    ].join('\n'),
  },
  {
    id: 'methodology',
    type: 'markdown',
    sourceId: 'validation',
    body: [
      '## Method, limitations and robustness checks',
      '',
      'Method: hash-pin the bank and render closure; generate prompt-only and passage-only packets without keys; persist the blind first pass; inspect candidate factual sources only in the second pass; compare exact spans, competitors, grammar, word limits, intended offsets and text order; then carry unresolved rights and product risks into a seven-lane panel.',
      '',
      `Robustness checks include fail-closed content-hash mutation, adversarial EN/ES/nested assignment-leak mutations, exact 3/18/18/18 coverage, first-pass hash binding and chronology checks. The observed paragraph-position predictor is ${positionParagraphHits}/${positionParagraphEligible}; the word-length predictor is ${positionLengthHits}/${positionLengthEligible}.`,
      '',
      `Limitations: provenance search is directed and non-exhaustive; retrieval is not verification; reviews are AI-produced without a human signature; n=${validation.scope.questions} supports no statistical certification of fairness, difficulty, accessibility, efficacy or readiness. No learner-facing delta means UI/UX and Playwright remain untested here, not conformant.`,
    ].join('\n'),
  },
  {
    id: 'further_questions',
    type: 'markdown',
    sourceId: 'validation',
    body: [
      '## Further questions before product work',
      '',
      '- Which wording change removes all in-limit competitors for table-cooling-01-2 without turning the cell into a lexical copy?',
      '- Do real learners maintain exact-span and grammar checks after hints are removed?',
      '- What server-side answer contract will keep keys out of Practice and Exam clients?',
      '- What human editorial and rights evidence is required before any asset can leave quarantine?',
    ].join('\n'),
  },
];

const artifact = {
  surface: 'report',
  manifest: {
    version: 1,
    surface: 'report',
    title: 'IELTS Reading Table Completion — audit gate',
    description:
      'F0.2b.11 technical dossier for one-best answerability, table structure, rights, factual review, shortcuts, learning value and runtime security risk.',
    generatedAt: reportGeneratedAt,
    cards,
    charts,
    tables,
    sources,
    blocks,
  },
  snapshot: {
    version: 1,
    generatedAt: reportGeneratedAt,
    status: 'ready',
    datasets: {
      note: noteRows,
      answerLengths: answerLengthRows,
      shortcuts: shortcutRows,
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
const answerLengthMarkdownRows = answerLengthRows
  .map(row => `| ${row.answerWords} | ${row.count} |`).join('\n');
const shortcutMarkdownRows = shortcutRows
  .map(row => `| ${row.stage} | ${row.hits} | ${row.predictions} |`).join('\n');

const reportMarkdown = [
  '# F0.2b.11 Table Completion — audit dossier',
  '',
  `Generated: ${reportGeneratedAt}  `,
  'Decision: **audit PASS; bank and content certification BLOCKED**  ',
  `Scope: ${validation.scope.passages} passages, ${validation.scope.questions} questions, ${validation.scope.canonicalAnswers} canonical answers and ${validation.scope.rawAcceptedEntries} accepted entries.`,
  '',
  '## Answer first',
  '',
  `- All ${quarantined}/${validation.scope.passages} assets remain unknown-quarantined; audit completion is not publication clearance.`,
  `- Expert selected-answer agreement is ${validation.expertReview.answerAgreement.matches}/${validation.expertReview.answerAgreement.total}, but material ambiguities=${validation.expertReview.materialAmbiguityCount}, key conflicts=${validation.expertReview.keyConflictCount} and passage-order violations=${textOrderRiskIds.length}.`,
  `- **table-cooling-01-2** remains release-blocking because “prevailing winds” competes with literal, grammatical in-limit spans; all material ambiguity IDs: ${ambiguitySummary}.`,
  `- Position predicts answer length ${positionLengthHits}/${positionLengthEligible} and evidence paragraph ${positionParagraphHits}/${positionParagraphEligible}.`,
  `- The runtime is **${runtimeClassification}**: ${clientKeys}/${validation.scope.questions} client-delivered keys and ${preResponseHints}/${validation.scope.questions} pre-response hints keep content/security readiness BLOCKED.`,
  '- UI/UX, accessibility and Playwright are ➖ only because no Table learner-facing delta occurred; ➖ is not conformity.',
  '- Stop before **F0.2b.12 Flow-chart Completion**; it remains not started.',
  '',
  '| Lane | Board | Audited result |',
  '|---|---:|---|',
  laneRows,
  '',
  '## Rights, provenance and factual review',
  '',
  'All 3/3 assets remain deny-by-default. Candidate sources and negative provenance searches do not establish authorship, ownership, license, authorization or human approval.',
  '',
  factualRows,
  '',
  '## Exact one-best answerability and table order',
  '',
  `The clean selected-answer match count is ${validation.expertReview.answerAgreement.matches}/${validation.expertReview.answerAgreement.total}. The static frame screen pre-flags ${validation.scope.questions - exactOneEstablished}/${validation.scope.questions}, but the clean expert finds ${ambiguityIds.length}/${validation.scope.questions} material ambiguities; the expert result controls release readiness. Material ambiguity IDs: **${ambiguitySummary}**. Key conflict IDs: **${conflictSummary}**.`,
  '',
  '**table-cooling-01-2** admits “prevailing winds”, “the direction” and “direction” as literal in-limit competitors. A matching selected key cannot certify fair rejection of those spans.',
  '',
  `The intended evidence reverses table order at ${textOrderRiskIds.join(', ')}. Naïve first-occurrence lookup additionally misbinds ${firstMatchOrderRiskIds.join(', ')}. Offset-aware evidence binding is required.`,
  '',
  '## Canonical answer word counts',
  '',
  '| Answer length | Canonical answers |',
  '|---|---:|',
  answerLengthMarkdownRows,
  '',
  `With n=${validation.scope.questions}, the position-modal answer-length predictor hits ${positionLengthHits}/${positionLengthEligible}; always choosing two words hits ${profile.alwaysTwoWordAnswerPredictor.hits}/${profile.alwaysTwoWordAnswerPredictor.eligible}. These are structural diagnostics, not learner accuracy.`,
  '',
  '## Prompt-only shortcut performance',
  '',
  '| No-passage diagnostic | Stored-key hits | Eligible predictions |',
  '|---|---:|---:|',
  shortcutMarkdownRows,
  '',
  `The prompt-only reviewer received table frames, headers and limits but no passage or keys. Separately, question position predicts the evidence paragraph ${positionParagraphHits}/${positionParagraphEligible}; denominators must remain explicit.`,
  '',
  '## Learning, runtime security and Word-limit enforcement implications',
  '',
  `The content-only walkthrough covers ${validation.studentWalkthrough.passagesCovered}/${validation.scope.passages} passages and ${validation.studentWalkthrough.questionsCovered}/${validation.scope.questions} questions. It is an AI simulation, not learner efficacy, retention or transfer evidence.`,
  '',
  `Recorded runtime classification: **${runtimeClassification}**. ${clientKeys}/${validation.scope.questions} canonical keys reach the client, ${preResponseHints}/${validation.scope.questions} hints appear before commitment, and explicit checking reveals correctness plus explanation. The stored word limit produces a warning but does not block scoring.`,
  '',
  'UI/UX, accessibility and Playwright are ➖ only for an unchanged Table learner-facing delta pinned by the static render closure. ➖ is not visual parity or conformity evidence.',
  '',
  '## Recommended next decisions',
  '',
  '1. Keep all assets quarantined until authorship, license, factual review and human approval are recorded.',
  '2. Rewrite or re-key table-cooling-01-2, then repeat independent one-best-answer adjudication.',
  '3. Review every other dynamically reported material ambiguity before release.',
  '4. Bind evidence and feedback to intended offsets; retain out-of-order and first-match cases as regression controls.',
  '5. Diversify answer-length and evidence-paragraph schedules, then repeat blind shortcut reviews.',
  '6. Enforce stored word limits in scoring.',
  '7. Separate guided-training from Practice and Exam modes; keep keys and hints out of assessment clients.',
  '8. Run accessibility, visual-parity and Playwright checks after an authorized learner-facing delta.',
  '9. Stop here; F0.2b.12 Flow-chart Completion belongs to the next loop iteration.',
  '',
  '## Sources and methodology',
  '',
  '- [validation.json](validation.json) — executable scope, decisions and derived metrics',
  '- [audit-verdicts.json](audit-verdicts.json) — final multi-lane ledger',
  '- [baseline.json](baseline.json) — pinned content and learner-runtime identity',
  '- [prompt-only.json](prompt-only.json) and [prompt-only-verdict.json](prompt-only-verdict.json) — no-passage shortcut review',
  '- [blind-review.json](blind-review.json) and [expert-first-pass.json](expert-first-pass.json) — clean passage review',
  '- [factual-source-review.json](factual-source-review.json) and [expert-verdict.json](expert-verdict.json) — second-pass source adjudication',
  '- [student-walkthrough.json](student-walkthrough.json) — content-only learner simulation',
  '- [source-availability.json](source-availability.json) and [provenance-search.json](provenance-search.json) — retrieval and directed-search ledgers',
  '- [unit-change-manifest.json](unit-change-manifest.json) — audit-only scope and Flow-chart Completion boundary',
  '',
  'Method: pin source and closure hashes; isolate prompt-only and passage-only packets; persist the blind first pass; open factual sources only in the second pass; adjudicate exact spans, grammar, competitors, offsets, word limits and order; preserve unresolved rights and product blockers in the panel.',
  '',
  `Caveats: availability is not verification; provenance search is non-exhaustive; AI reviews have no human signature; n=${validation.scope.questions} cannot certify fairness, difficulty, accessibility, efficacy or readiness. F0.2b remains open.`,
  '',
  '## Further questions',
  '',
  '- Which wording change removes every in-limit competitor for table-cooling-01-2?',
  '- Do learners retain exact-span and grammar checks after hints are removed?',
  '- How will Practice and Exam modes keep answer keys server-side?',
  '',
  '## Stop boundary',
  '',
  'F0.2b remains open. The next subunit is F0.2b.12 Flow-chart Completion; it was not started.',
  '',
].join('\n');

writeFileSync(resolve(here, 'artifact.json'), `${JSON.stringify(artifact, null, 2)}\n`);
writeFileSync(resolve(here, 'report.md'), reportMarkdown);
process.stdout.write(`${JSON.stringify({
  title: artifact.manifest.title,
  status: artifact.snapshot.status,
  cards: artifact.manifest.cards.length,
  charts: artifact.manifest.charts.length,
  tables: artifact.manifest.tables.length,
  decisions: artifact.snapshot.datasets.decisions.length,
  nextPackagingStep: 'deliver_portable_artifact.mjs writes the self-contained report.html',
}, null, 2)}\n`);
