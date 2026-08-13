#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const validation = JSON.parse(readFileSync(resolve(here, 'validation.json'), 'utf8'));
const audit = JSON.parse(readFileSync(resolve(here, 'audit-verdicts.json'), 'utf8'));
const reportGeneratedAt = audit.reviewedAt;
const base = 'output/audits/ielts-reading-rights-summary-completion-2026-08-11';
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
  'ielts-reading-summary-completion-rights-validation.v1',
'validation.json no satisface el contrato F0.2b.9.');
assert(audit.schemaVersion ===
  'ielts-reading-summary-completion-audit-verdicts.v1',
'audit-verdicts.json no satisface el contrato F0.2b.9.');
assert(validation.scope.passages === 3 && validation.scope.questions === 18 &&
  validation.scope.canonicalAnswers === 18 && validation.scope.rawAcceptedEntries === 19,
'El builder se niega a narrar un scope distinto de 3/18/18/19.');
assert(validation.expertReview.answerAgreement.total === 18,
'El denominador experto debe ser 18.');

const summaryRows = [{
  passages: validation.scope.passages,
  questions: validation.scope.questions,
  canonicalAnswers: validation.scope.canonicalAnswers,
  acceptedEntries: validation.scope.rawAcceptedEntries,
  quarantined: validation.decisions.filter(row => row.disposition === 'quarantine').length,
  expertMatches: validation.expertReview.answerAgreement.matches,
  expertTotal: validation.expertReview.answerAgreement.total,
  materialAmbiguities: validation.expertReview.materialAmbiguityCount,
  orderViolations: validation.expertReview.passageOrderViolationQuestionIds.length,
}];
const profile = validation.antiShortcut.storedProfile;
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

const claimTotal = claimRows.reduce((sum, row) => sum + row.claims, 0);
const lengthTotal = answerLengthRows.reduce((sum, row) => sum + row.count, 0);
const factualSummary = claimRows.map(row => `${row.assessment} ${row.claims}`).join(', ');
const answerLengthSummary = answerLengthRows
  .map(row => `${row.answerWords} ${row.count}`).join(', ');
const shortcutSummary = shortcutRows
  .map(row => `${row.stage} ${row.hits}/${row.predictions}`).join('; ');
const ambiguityIds = validation.expertReview.materialAmbiguityQuestionIds;
const conflictIds = validation.expertReview.keyConflictQuestionIds;
const ambiguitySummary = ambiguityIds.length ? ambiguityIds.join(', ') : 'none recorded';
const conflictSummary = conflictIds.length ? conflictIds.join(', ') : 'none recorded';
const runtimeClassification = validation.runtime.classification;
const invalidAlternatives = profile.grammaticallyInvalidAcceptedAlternatives ?? [];

assert(lengthTotal === validation.scope.canonicalAnswers,
'La distribución de longitudes no suma el total canónico.');
assert(summaryRows[0].quarantined === validation.scope.passages,
'El builder requiere cuarentena fail-closed 3/3.');
assert(runtimeClassification.includes('guided-training'),
'El builder no puede presentar este runtime como Practice o Exam.');
assert(invalidAlternatives.some(row => row.questionId === 'summary-urban-farms-06' &&
  row.acceptedText === 'the roof' && row.duplicatedBoundaryToken === 'the'),
'Falta el hallazgo gramatical de `the roof`.');

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
  source('validation', 'Executable F0.2b.9 validation', paths.validation),
  source('baseline', 'Pinned Summary Completion bank and learner-runtime baseline',
    paths.baseline),
  source('prompt_only_packet', 'Prompt-only summary-frame shortcut packet', paths.promptOnly),
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
    id: 'summary_query',
    label: 'F0.2b.9 scope, disposition and expert-review summary',
    tablesUsed: [paths.validation],
    description: 'One source-backed row for all four metric cards.',
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
    description: 'Passages, questions and accepted response entries in the scoped bank.',
    dataset: 'summary',
    sourceId: 'summary_query',
    metrics: [
      { label: 'Passages', field: 'passages', format: 'number' },
      { label: 'Questions', field: 'questions', format: 'number' },
      { label: 'Accepted entries', field: 'acceptedEntries', format: 'number' },
    ],
  },
  {
    id: 'quarantine',
    description: 'Assets denied advancement by rights, factual and human-review gates.',
    dataset: 'summary',
    sourceId: 'summary_query',
    metrics: [{ label: 'Quarantined', field: 'quarantined', format: 'number' }],
  },
  {
    id: 'agreement',
    description: 'Clean one-best completions matching the stored accepted sets.',
    dataset: 'summary',
    sourceId: 'summary_query',
    metrics: [
      { label: 'Expert matches', field: 'expertMatches', format: 'number' },
      { label: 'Reviewed', field: 'expertTotal', format: 'number' },
    ],
  },
  {
    id: 'ambiguities',
    description: 'Material ambiguities and passage-order violations remain explicit.',
    dataset: 'summary',
    sourceId: 'summary_query',
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
    subtitle: 'PASS applies to audit completion; product blockers remain explicit.',
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
  { id: 'title', type: 'markdown', body: '# IELTS Reading Summary Completion — audit gate' },
  {
    id: 'answer_first',
    type: 'markdown',
    sourceId: 'validation',
    body: [
      '## Answer first',
      '',
      '- **audit PASS; bank and content certification BLOCKED.** The audit controls close, but all ' +
        `${summaryRows[0].quarantined}/${validation.scope.passages} assets remain quarantined.`,
      `- **Expert agreement is ${validation.expertReview.answerAgreement.matches}/${validation.expertReview.answerAgreement.total}; it is not content clearance.** Material ambiguities=${validation.expertReview.materialAmbiguityCount}, key conflicts=${validation.expertReview.keyConflictCount}.`,
      '- **The stored alternative `the roof` is literal but grammatically invalid.** In summary-urban-farms-06 the frame already ends in `the`, producing a double determiner (`the the roof`).',
      '- **These six separated cards are not a continuous summary.** They train local gap completion, but do not reproduce the cohesion and sustained summary processing expected from a genuine Summary Completion task.',
      '- **The runtime remains guided-training.** Canonical keys and accepted alternatives reach the client; hints are available before commitment and correctness plus explanation appear after explicit checking.',
      '- **Stop at F0.2b.10 Note Completion.** It remains not started and the F0.2b parent remains open.',
    ].join('\n'),
  },
  { id: 'metrics', type: 'metric-strip', cardIds: cards.map(card => card.id) },
  {
    id: 'scope_and_gate',
    type: 'markdown',
    sourceId: 'validation',
    body: [
      '## Scope and gate meaning',
      '',
      `The frozen scope is ${validation.scope.passages} passages, ${validation.scope.questions} questions, ${validation.scope.canonicalAnswers} canonical answers and ${validation.scope.rawAcceptedEntries} raw accepted entries.`,
      '',
      'PASS means that identity, packet isolation, two-pass review, source ledgers, quarantine and carried-forward blockers are reproducible. It does not approve rights, factual content, answer policy, learning efficacy, accessibility or assessment readiness.',
    ].join('\n'),
  },
  { id: 'decision_table', type: 'table', tableId: 'asset_decisions', layout: 'full' },
  {
    id: 'answer_contract',
    type: 'markdown',
    sourceId: 'expert_verdict',
    body: [
      '## Exact-span answer contract and structural defects',
      '',
      'Every clean decision must use a whole-token contiguous passage span, stay within two words, complete the frame naturally and bind the intended offset rather than a convenient first match.',
      '',
      `The reviewer match count is ${validation.expertReview.answerAgreement.matches}/${validation.expertReview.answerAgreement.total}. Material ambiguity IDs: **${ambiguitySummary}**. Key conflict IDs: **${conflictSummary}**.`,
      '',
      '**summary-urban-farms-06** exposes the key defect: `roof` is grammatical, while accepted `the roof` produces `the the roof`. Literal occurrence is therefore insufficient for acceptance.',
    ].join('\n'),
  },
  {
    id: 'summary_cohesion',
    type: 'markdown',
    sourceId: 'student_walkthrough',
    body: [
      '## Separated cards weaken Summary Completion transfer',
      '',
      'The six prompts per passage are rendered as separated cards rather than one continuous summary. This can help isolate evidence and repair errors, but it reduces the need to follow cohesion, reference and information flow across a single summary.',
      '',
      'The walkthrough is content-only and AI-simulated. It cannot establish that learners improve IELTS Reading, retain the method or transfer it when hints and immediate feedback are removed.',
    ].join('\n'),
  },
  {
    id: 'answer_length_context',
    type: 'markdown',
    sourceId: 'validation',
    body: [
      '## Answer length and position are shortcut channels',
      '',
      `Across n=${validation.scope.questions}, canonical lengths are ${answerLengthSummary}. Always choosing two words hits ${profile.alwaysTwoWordAnswerPredictor.hits}/${profile.alwaysTwoWordAnswerPredictor.eligible}; the position-modal length rule hits ${profile.sameQuestionPositionAcrossSetsModalAnswerWordCount.hits}/${profile.sameQuestionPositionAcrossSetsModalAnswerWordCount.eligible}.`,
      '',
      'These are bank diagnostics, not learner scores or fairness estimates. The bank is too small to support statistical certification.',
    ].join('\n'),
  },
  { id: 'answer_length_chart', type: 'chart', chartId: 'answer_lengths', layout: 'full' },
  {
    id: 'shortcut_context',
    type: 'markdown',
    sourceId: 'prompt_only_verdict',
    body: [
      '## Prompt-only diagnostics isolate predictable surfaces',
      '',
      `The frozen diagnostics are ${shortcutSummary}. The prompt-only reviewer saw summary frames and word limits but no passages, keys, alternatives, hints or explanations.`,
      '',
      'Different diagnostics have different denominators. They must not be compared as accuracy or optimized independently of evidence quality and natural grammar.',
    ].join('\n'),
  },
  { id: 'shortcut_chart', type: 'chart', chartId: 'shortcut_performance', layout: 'full' },
  {
    id: 'factual_context',
    type: 'markdown',
    sourceId: 'expert_verdict',
    body: [
      '## Factual review does not clear rights',
      '',
      `The second pass classifies ${claimTotal} frozen claims as ${factualSummary}. Counts are read dynamically from the expert verdict, including zero-valued categories.`,
      '',
      'A retrieved source can support or complicate a claim. It cannot establish authorship, ownership, licensing, permission or independent human approval. All 3/3 assets therefore remain quarantined.',
    ].join('\n'),
  },
  { id: 'claim_chart', type: 'chart', chartId: 'claim_assessments', layout: 'full' },
  {
    id: 'runtime',
    type: 'markdown',
    sourceId: 'validation',
    body: [
      '## Word-limit enforcement and client key exposure keep the product in guided-training',
      '',
      `Recorded classification: **${runtimeClassification}**. Canonical answers and accepted alternatives are delivered to the client. Hints are available before response, and explicit checking reveals correctness, the key and an explanation.`,
      '',
      'The visible two-word warning is not authoritative scoring enforcement. This runtime must not be represented as IELTS Practice or Exam simulation.',
    ].join('\n'),
  },
  {
    id: 'panel_scope',
    type: 'markdown',
    sourceId: 'audit_verdicts',
    body: [
      '## UI/UX and Playwright marks are delta-scoped only',
      '',
      'UI/UX, accessibility and Playwright are ➖ only because the learner-facing sources and the 16-file render closure remain pinned to baseline. ➖ is not a conformity pass.',
      '',
      'Portable-report browser verification is packaging QA only; it supplies no Task 2 visual parity, learner-runtime accessibility or end-to-end assessment evidence.',
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
      '1. Remove `the roof` from the accepted set or rewrite the frame, then repeat clean grammatical and exact-span adjudication.',
      '2. Replace separated cards with a continuous-summary presentation if the learning objective is authentic Summary Completion cohesion.',
      '3. Keep all assets quarantined until authorship, license, factual review and independent human approval are recorded.',
      '4. Parse stored word limits and make over-limit responses impossible to score as correct.',
      '5. Separate guided-training, Practice and Exam modes; do not ship keys or pre-response hints in assessment modes.',
      '6. Diversify length, paragraph-position and lexical-anchor patterns, then repeat blind shortcut tests.',
      '7. Run learner-facing accessibility, Task 2 parity and Playwright checks only after an authorized runtime delta.',
      '8. Stop here. F0.2b.10 Note Completion belongs to the next loop iteration.',
    ].join('\n'),
  },
  {
    id: 'methodology',
    type: 'markdown',
    sourceId: 'validation',
    body: [
      '## Sources, methodology and caveats',
      '',
      'Method: hash-pin the bank and render closure; generate prompt-only and passage-only packets without keys; persist the blind first pass; inspect candidate factual sources only in the second pass; compare exact spans, competitors, grammar, word limits and intended offsets; then carry unresolved rights and product risks into a seven-lane panel.',
      '',
      'Primary dossier inputs: validation.json, baseline.json, prompt-only.json, prompt-only-verdict.json, blind-review.json, expert-first-pass.json, factual-source-review.json, expert-verdict.json, student-walkthrough.json, source-availability.json, provenance-search.json, unit-change-manifest.json and audit-verdicts.json.',
      '',
      `Caveats: provenance search is directed and non-exhaustive; retrieval is not verification; AI reviews have no human signature; n=${validation.scope.questions} cannot certify fairness, difficulty, accessibility, efficacy or production readiness. Material ambiguity IDs: ${ambiguitySummary}. Key conflict IDs: ${conflictSummary}.`,
    ].join('\n'),
  },
];

const artifact = {
  surface: 'report',
  manifest: {
    version: 1,
    surface: 'report',
    title: 'IELTS Reading Summary Completion — audit gate',
    description:
      'F0.2b.9 technical dossier for exact-span answerability, summary cohesion, rights, factual review, shortcuts, learning value and runtime risk.',
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
    status: audit.status === 'pass' ? 'ready' : 'pending-audit',
    datasets: {
      summary: summaryRows,
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
  '# F0.2b.9 — Summary Completion audit dossier',
  '',
  `Generated: ${reportGeneratedAt}  `,
  'Decision: **audit PASS; bank and content certification BLOCKED**  ',
  `Scope: ${validation.scope.passages} passages, ${validation.scope.questions} questions, ${validation.scope.canonicalAnswers} canonical answers and ${validation.scope.rawAcceptedEntries} raw accepted entries.`,
  '',
  '## Answer first',
  '',
  `- All ${summaryRows[0].quarantined}/${validation.scope.passages} assets remain quarantined; audit completion is not publication clearance.`,
  `- Expert agreement is ${validation.expertReview.answerAgreement.matches}/${validation.expertReview.answerAgreement.total}; material ambiguities=${validation.expertReview.materialAmbiguityCount}, key conflicts=${validation.expertReview.keyConflictCount}.`,
  '- **summary-urban-farms-06 accepts `the roof`, but the frame already supplies `the`: the completed surface contains the double determiner `the the roof`.** Literal occurrence does not make an alternative grammatical.',
  '- The six separated cards are not a continuous summary, so cohesion and information-flow transfer remain unproven.',
  `- The runtime is **${runtimeClassification}**: client-delivered keys, pre-response hints and immediate post-check feedback prevent Practice or Exam representation.`,
  '- Stop before **F0.2b.10 Note Completion**; it remains not started.',
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
  '## Exact-span answerability and summary cohesion',
  '',
  `Every expert row must bind a whole-token contiguous span, intended offsets, natural grammar and the two-word limit. The clean match count is ${validation.expertReview.answerAgreement.matches}/${validation.expertReview.answerAgreement.total}.`,
  '',
  `Material ambiguity IDs: **${ambiguitySummary}**. Key conflict IDs: **${conflictSummary}**.`,
  '',
  '**summary-urban-farms-06 / `the roof`** is a release-blocking accepted-answer defect because the completed frame reads with a double determiner. The separated-card layout is also weaker than a genuine continuous Summary Completion surface.',
  '',
  '## Canonical answer word counts',
  '',
  '| Answer length | Canonical answers |',
  '|---|---:|',
  answerLengthMarkdownRows,
  '',
  `With n=18, always choosing two words hits ${profile.alwaysTwoWordAnswerPredictor.hits}/${profile.alwaysTwoWordAnswerPredictor.eligible}. This is a structural bank diagnostic, not learner accuracy.`,
  '',
  '## Prompt-only shortcut performance',
  '',
  '| No-passage diagnostic | Stored-key hits | Eligible predictions |',
  '|---|---:|---:|',
  shortcutMarkdownRows,
  '',
  'The prompt-only reviewer received frames and word limits but no passages, keys, alternatives, explanations or hints. Different denominators are preserved.',
  '',
  '## Learning, runtime and Word-limit enforcement implications',
  '',
  `The content-only walkthrough covers ${validation.studentWalkthrough.passagesCovered}/${validation.scope.passages} passages and ${validation.studentWalkthrough.questionsCovered}/${validation.scope.questions} questions. It is an AI simulation, not learner efficacy or transfer evidence.`,
  '',
  `Recorded runtime classification: **${runtimeClassification}**. Canonical keys and alternatives reach the client, hints appear before commitment, and explicit checking reveals correctness plus explanation. Word-limit display does not make scoring enforcement authoritative.`,
  '',
  'UI/UX, accessibility and Playwright are ➖ only for an unchanged learner-facing delta pinned by the 16-file render closure. ➖ is not Task 2 visual parity or conformity evidence.',
  '',
  '## Recommended next decisions',
  '',
  '1. Remove `the roof` or rewrite its frame and repeat blind exact-span and grammar adjudication.',
  '2. Use a continuous-summary surface if authentic cohesion is the learning target.',
  '3. Keep every asset quarantined until authorship, license, factual review and human approval are recorded.',
  '4. Parse and enforce stored word limits in scoring.',
  '5. Separate guided-training from Practice and Exam modes; withhold keys and hints before commitment.',
  '6. Diversify answer-length, paragraph-position and lexical-anchor patterns.',
  '7. Run learner-facing accessibility, visual-parity and Playwright checks only after an authorized delta.',
  '8. Stop here; F0.2b.10 Note Completion belongs to the next loop iteration.',
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
  '- [unit-change-manifest.json](unit-change-manifest.json) — audit-only scope and Note Completion boundary',
  '',
  'Method: pin source and closure hashes; isolate prompt-only and passage-only packets; persist the blind first pass; open factual sources only in the second pass; adjudicate exact spans, grammar, competitors, offsets and word limits; preserve unresolved rights and product blockers in the panel.',
  '',
  `Caveats: availability is not verification; provenance search is non-exhaustive; AI reviews have no human signature; n=${validation.scope.questions} cannot certify fairness, difficulty, accessibility, efficacy or readiness. F0.2b remains open.`,
  '',
  '## Stop boundary',
  '',
  'F0.2b remains open. The next subunit is F0.2b.10 Note Completion; it was not started.',
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
