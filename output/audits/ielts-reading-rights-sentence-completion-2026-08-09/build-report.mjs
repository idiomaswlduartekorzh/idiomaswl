#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const validation = JSON.parse(readFileSync(resolve(here, 'validation.json'), 'utf8'));
const audit = JSON.parse(readFileSync(resolve(here, 'audit-verdicts.json'), 'utf8'));
const reportGeneratedAt = audit.reviewedAt;
const base = 'output/audits/ielts-reading-rights-sentence-completion-2026-08-09';
const paths = {
  validation: base + '/validation.json',
  baseline: base + '/baseline.json',
  promptOnly: base + '/prompt-only.json',
  promptOnlyVerdict: base + '/prompt-only-verdict.json',
  blind: base + '/blind-review.json',
  firstPass: base + '/expert-first-pass.json',
  factual: base + '/factual-source-review.json',
  expert: base + '/expert-verdict.json',
  student: base + '/student-walkthrough.json',
  availability: base + '/source-availability.json',
  provenance: base + '/provenance-search.json',
  manifest: base + '/unit-change-manifest.json',
  audit: base + '/audit-verdicts.json',
};

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

assert(validation.schemaVersion ===
  'ielts-reading-sentence-completion-rights-validation.v1',
'validation.json no satisface el contrato F0.2b.8.');
assert(audit.schemaVersion ===
  'ielts-reading-sentence-completion-audit-verdicts.v1',
'audit-verdicts.json no satisface el contrato F0.2b.8.');
assert(validation.scope.passages === 3 && validation.scope.questions === 18 &&
  validation.scope.canonicalAnswers === 18 && validation.scope.rawAcceptedEntries === 20,
'El builder se niega a narrar un scope distinto de 3/18/18/20.');
assert(validation.expertReview.answerAgreement.total === 18,
'El denominador experto debe ser 18.');

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
  {
    id: 'validation',
    label: 'Executable F0.2b.8 validation',
    path: paths.validation,
  },
  {
    id: 'baseline',
    label: 'Pinned Sentence Completion bank and learner-runtime baseline',
    path: paths.baseline,
  },
  {
    id: 'prompt_only_packet',
    label: 'Prompt-only sentence-frame shortcut packet',
    path: paths.promptOnly,
  },
  {
    id: 'prompt_only_verdict',
    label: 'Independent prompt-only shortcut verdict',
    path: paths.promptOnlyVerdict,
  },
  {
    id: 'blind_packet',
    label: 'Passage-based clean expert packet',
    path: paths.blind,
  },
  {
    id: 'expert_first_pass',
    label: 'Persisted pre-source one-best-answer adjudication',
    path: paths.firstPass,
  },
  {
    id: 'factual_packet',
    label: 'Second-pass exact-claim and candidate-source packet',
    path: paths.factual,
  },
  {
    id: 'expert_verdict',
    label: 'Independent two-pass IELTS and factual review',
    path: paths.expert,
  },
  {
    id: 'student_walkthrough',
    label: 'Content-only average-student walkthrough',
    path: paths.student,
  },
  {
    id: 'source_availability',
    label: 'Official and factual candidate-source availability ledger',
    path: paths.availability,
  },
  {
    id: 'provenance_search',
    label: 'Directed, non-exhaustive provenance search',
    path: paths.provenance,
  },
  {
    id: 'unit_change_manifest',
    label: 'Scoped audit-only unit change manifest',
    path: paths.manifest,
  },
  {
    id: 'audit_verdicts',
    label: 'Final multi-lane panel verdicts',
    path: paths.audit,
  },
  sqlSource({
    id: 'summary_query',
    label: 'F0.2b.8 scope, disposition and expert-review summary',
    tablesUsed: [paths.validation],
    description:
      'One source-backed row for the four report cards and executive scope statements.',
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
      "FROM read_json_auto('" + paths.validation + "') AS report,",
      'UNNEST(report.decisions) AS rows(decision)',
      'GROUP BY ALL;',
    ].join('\n'),
  }),
  sqlSource({
    id: 'answer_length_query',
    label: 'Canonical answer word-count distribution',
    tablesUsed: [paths.validation],
    description:
      'Canonical-answer counts by one word, two words and over-limit status.',
    sql: [
      'WITH report AS (',
      "  SELECT * FROM read_json_auto('" + paths.validation + "')",
      ')',
      "SELECT '1 word' AS answerWords,",
      '  antiShortcut.storedProfile.canonicalAnswerWordCountDistribution.oneWord AS count',
      'FROM report',
      'UNION ALL',
      "SELECT '2 words',",
      '  antiShortcut.storedProfile.canonicalAnswerWordCountDistribution.twoWords',
      'FROM report',
      'UNION ALL',
      "SELECT 'over limit',",
      '  antiShortcut.storedProfile.canonicalAnswerWordCountDistribution.overLimit',
      'FROM report;',
    ].join('\n'),
  }),
  sqlSource({
    id: 'shortcut_query',
    label: 'Prompt-only and answer-length shortcut performance',
    tablesUsed: [paths.validation],
    description:
      'Stored-key hits and eligible predictions with each diagnostic denominator preserved.',
    sql: [
      'WITH report AS (',
      "  SELECT * FROM read_json_auto('" + paths.validation + "')",
      ')',
      "SELECT 'prompt-only unique' AS stage,",
      '  shortcutReview.promptOnly.hits AS hits,',
      '  shortcutReview.promptOnly.uniquePredictions AS predictions FROM report',
      'UNION ALL',
      "SELECT 'always two words',",
      '  antiShortcut.storedProfile.alwaysTwoWordAnswerPredictor.hits,',
      '  antiShortcut.storedProfile.alwaysTwoWordAnswerPredictor.eligible FROM report',
      'UNION ALL',
      "SELECT 'position-modal word count',",
      '  antiShortcut.storedProfile.sameQuestionPositionAcrossSetsModalAnswerWordCount.hits,',
      '  antiShortcut.storedProfile.sameQuestionPositionAcrossSetsModalAnswerWordCount.eligible',
      'FROM report;',
    ].join('\n'),
  }),
  sqlSource({
    id: 'claim_query',
    label: 'Independent factual-claim assessments',
    tablesUsed: [paths.validation],
    description:
      'Counts from exact-claim direct source review; they are not rights or human clearance.',
    sql: [
      'UNPIVOT (',
      '  SELECT expertReview.factualAssessmentCounts.*',
      "  FROM read_json_auto('" + paths.validation + "')",
      ') ON COLUMNS(*) INTO NAME assessment VALUE claims;',
    ].join('\n'),
  }),
  sqlSource({
    id: 'decision_query',
    label: 'Per-asset quarantine decisions',
    tablesUsed: [paths.validation],
    description: 'Exact asset-level rights, factual and publication disposition fields.',
    sql: [
      'SELECT',
      '  decision.assetId,',
      '  decision.title,',
      '  decision.wordCount,',
      '  decision.questionCount,',
      '  decision.canonicalAnswerCount,',
      '  decision.acceptedEntryCount,',
      '  decision.provenanceStatus,',
      '  decision.rightsBasis,',
      '  decision.factualReviewStatus,',
      '  decision.humanReviewStatus,',
      '  decision.disposition,',
      "  array_to_string(decision.reasonCodes, ' · ') AS blockers",
      "FROM read_json_auto('" + paths.validation + "') AS report,",
      'UNNEST(report.decisions) AS rows(decision);',
    ].join('\n'),
  }),
  sqlSource({
    id: 'audit_query',
    label: 'Final multi-lane panel verdicts',
    tablesUsed: [paths.audit],
    description:
      'Panel scope, finding and carried-forward blocker for each board lane.',
    sql: [
      'SELECT verdict.*',
      "FROM read_json_auto('" + paths.audit + "') AS audit,",
      'UNNEST(audit.rows) AS rows(verdict);',
    ].join('\n'),
  }),
];

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
const factualSummary = claimRows.map(row => row.assessment + ' ' + row.claims).join(', ');
const answerLengthSummary = answerLengthRows
  .map(row => row.answerWords + ' ' + row.count).join(', ');
const shortcutSummary = shortcutRows
  .map(row => row.stage + ' ' + row.hits + '/' + row.predictions).join('; ');
const ambiguityIds = validation.expertReview.materialAmbiguityQuestionIds;
const conflictIds = validation.expertReview.keyConflictQuestionIds;
const ambiguitySummary = ambiguityIds.length ? ambiguityIds.join(', ') : 'none recorded';
const conflictSummary = conflictIds.length ? conflictIds.join(', ') : 'none recorded';
const runtimeClassification = validation.runtime.classification;
const normalizedDuplicateIds = profile.normalizedDuplicateAlternativeQuestionIds;
const spellingVariantIds = profile.nonVerbatimAcceptedAlternativeQuestionIds;

assert(claimTotal === 15, 'El builder requiere exactamente quince factual claims.');
assert(lengthTotal === 18, 'La distribución de longitudes debe sumar n=18.');
assert(summaryRows[0].quarantined === 3, 'El builder requiere cuarentena 3/3.');
assert(runtimeClassification.includes('guided-training'),
'El builder no puede presentar este runtime como Practice o Exam.');
assert(normalizedDuplicateIds.includes('sentence-makerspaces-01') &&
  spellingVariantIds.includes('sentence-night-markets-01'),
'Cambió el inventario de alternativas que requiere adjudicación explícita.');

const artifact = {
  surface: 'report',
  manifest: {
    version: 1,
    surface: 'report',
    title: 'IELTS Reading Sentence Completion — audit gate',
    description:
      'F0.2b.8 product-stakeholder dossier for provenance, exact completion answerability, word limits, prompt-only shortcuts, learning value and runtime risk.',
    generatedAt: reportGeneratedAt,
    cards: [
      {
        id: 'scope',
        description: 'Passages, questions and accepted response entries in the scoped formative bank.',
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
        description: 'Questions where the independent reviewer found more than one materially valid completion.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [
          { label: 'Material ambiguities', field: 'materialAmbiguities', format: 'number' },
          { label: 'Order violations', field: 'orderViolations', format: 'number' },
        ],
      },
    ],
    charts: [
      {
        id: 'answer_lengths',
        title: 'Canonical answer word counts',
        subtitle: 'All ' + validation.scope.canonicalAnswers +
          ' canonical answers against the stored maximum of two words.',
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
        subtitle:
          'Stored-key hits among eligible predictions; each diagnostic keeps its own denominator.',
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
        subtitle: claimTotal +
          ' exact claims after direct candidate-source review; not rights or human clearance.',
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
        subtitle: 'Three bank records; every record remains fail-closed and quarantined.',
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
        subtitle:
          'PASS applies to audit completion; content, editorial and runtime blockers remain explicit.',
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
        body: '# IELTS Reading Sentence Completion — audit gate',
      },
      {
        id: 'executive_summary',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## Executive Summary',
          '',
          '- **audit PASS; bank and content certification BLOCKED.** The dossier closes F0.2b.8 controls; all ' +
            summaryRows[0].quarantined + '/' + validation.scope.passages +
            ' assets remain quarantined.',
          '- **The independent answer match count is ' +
            validation.expertReview.answerAgreement.matches + '/' +
            validation.expertReview.answerAgreement.total + ', with unresolved item quality.** Material ambiguities=' +
            validation.expertReview.materialAmbiguityCount + ' and key conflicts=' +
            validation.expertReview.keyConflictCount + '; agreement alone does not certify the bank.',
          '- **Answer length is a strong shortcut signal.** Canonical lengths are ' +
            answerLengthSummary + '; the always-two-words rule hits ' +
            profile.alwaysTwoWordAnswerPredictor.hits + '/' +
            profile.alwaysTwoWordAnswerPredictor.eligible + ' without reading the passage.',
          '- **The runtime remains guided-training.** Explicit checking, immediate post-check key and explanation, pre-response hints and client-delivered answers mean it is not Practice or Exam simulation.',
          '- **The next boundary stays closed.** F0.2b.9 Summary Completion is next and has not been started; the F0.2b parent remains open.',
        ].join('\n'),
      },
      {
        id: 'metrics',
        type: 'metric-strip',
        cardIds: ['scope', 'quarantine', 'agreement', 'ambiguities'],
      },
      {
        id: 'gate',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## The control gate closes; the product gate stays blocked',
          '',
          'The executable dossier fixes ' + validation.scope.passages + ' passages, ' +
            validation.scope.questions + ' questions, ' +
            validation.scope.canonicalAnswers + ' canonical answers and ' +
            validation.scope.rawAcceptedEntries + ' raw accepted entries. Every asset remains deny-by-default because authorship, rights, factual review and independent human approval are unresolved.',
          '',
          'Passing the audit means scope, packet isolation, two-pass review, hash bindings and blockers are reproducible. It does not mean the passages are cleared, the accepted response inventory is certified or the learner runtime is ready for assessment.',
        ].join('\n'),
      },
      {
        id: 'decision_table',
        type: 'table',
        tableId: 'asset_decisions',
        layout: 'full',
      },
      {
        id: 'one_best_contract',
        type: 'markdown',
        sourceId: 'expert_verdict',
        body: [
          '## One best completion depends on an exact passage span',
          '',
          'Each clean decision inserts one contiguous passage span, verifies a natural completed sentence, applies the maximum of two words, records exact character offsets and rejects the closest competitor. Passage evidence rises in strict question order across all three sets.',
          '',
          'The independent match count is ' + validation.expertReview.answerAgreement.matches + '/' +
            validation.expertReview.answerAgreement.total + '. Material ambiguity IDs: **' +
            ambiguitySummary + '**. Stored-key conflict IDs: **' + conflictSummary +
            '**. The ambiguity and conflict counts remain visible rather than being averaged away by agreement.',
        ].join('\n'),
      },
      {
        id: 'answer_length_context',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## Answer length is concentrated enough to become a shortcut',
          '',
          'Across n=' + validation.scope.questions + ', the canonical distribution is ' +
            answerLengthSummary + '. No canonical answer exceeds the stored two-word limit, but ' +
            profile.alwaysTwoWordAnswerPredictor.hits + '/' +
            profile.alwaysTwoWordAnswerPredictor.eligible +
            ' answers can be hit by always choosing two words.',
          '',
          'This is a structural property of this small bank, not learner performance or a fairness estimate. The next editorial pass should diversify valid answer lengths while preserving natural grammar, exact evidence and IELTS format.',
        ].join('\n'),
      },
      {
        id: 'answer_length_chart',
        type: 'chart',
        chartId: 'answer_lengths',
        layout: 'full',
      },
      {
        id: 'shortcut_context',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## Prompt-only review separates grammar cues from passage evidence',
          '',
          'The prompt-only reviewer saw sentence frames and the word limit, but no passage, keys, hints, alternatives or explanations. The staged results are ' +
            shortcutSummary + '.',
          '',
          'A unique prompt-only completion would be an exact-guess leak. Length predictors ask a different question and keep n=18 as their denominator. These diagnostics must not be compared as learner scores or optimized in isolation.',
        ].join('\n'),
      },
      {
        id: 'shortcut_chart',
        type: 'chart',
        chartId: 'shortcut_performance',
        layout: 'full',
      },
      {
        id: 'accepted_answers',
        type: 'markdown',
        sourceId: 'expert_verdict',
        body: [
          '## Two accepted alternatives require explicit product policy',
          '',
          '**sentence-makerspaces-01** stores a capitalization-only alternative that normalizes to the same accepted value. This is a normalized duplicate, not independent answer coverage.',
          '',
          '**sentence-night-markets-01** accepts **shopping center**, an American-spelling counterpart to the British passage form. The official spelling policy supports British and American spelling, but the platform still needs an explicit, tested adjudication policy for normalization and accepted variants.',
        ].join('\n'),
      },
      {
        id: 'factual_context',
        type: 'markdown',
        sourceId: 'expert_verdict',
        body: [
          '## Candidate sources qualify claims without clearing the passages',
          '',
          'The second pass classifies ' + claimTotal + ' frozen factual claims as ' +
            factualSummary + '. The chart reports the exact count in each category, including zeros.',
          '',
          'A retrieved candidate source can support, complicate or fail to trace a claim. It cannot establish passage authorship, ownership, licensing, permission or independent human approval. Those gates remain separate and blocked.',
        ].join('\n'),
      },
      {
        id: 'claim_chart',
        type: 'chart',
        chartId: 'claim_assessments',
        layout: 'full',
      },
      {
        id: 'learning',
        type: 'markdown',
        sourceId: 'student_walkthrough',
        body: [
          '## The learning sequence is plausible, but efficacy is unmeasured',
          '',
          'The content-only walkthrough covers ' + validation.studentWalkthrough.passagesCovered + '/' +
            validation.scope.passages + ' passages and ' +
            validation.studentWalkthrough.questionsCovered + '/' +
            validation.scope.questions + ' questions. It models grammar prediction, ordered evidence search, contiguous-span checking, word counting, spelling review, competitor rejection and targeted repair.',
          '',
          'It remains an AI simulation, not observation of a real learner. It supplies no IELTS band, usability, retention, transfer or learning-gain evidence.',
        ].join('\n'),
      },
      {
        id: 'word_limit',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## Word-limit enforcement is visible but not authoritative',
          '',
          'Recorded classification: **' + runtimeClassification +
            '**. The UI displays and colors a two-word count, but the limit is hard-coded rather than parsed from stored instructions, and exceeding it does not explicitly block checking or a correct result.',
          '',
          'This mismatch is a product blocker: the official format makes the stated word limit decisive. No audit-only hash pin converts the current guided-training behavior into assessment conformance.',
        ].join('\n'),
      },
      {
        id: 'panel_scope',
        type: 'markdown',
        sourceId: 'audit_verdicts',
        body: [
          '## Panel marks describe audited scope, not product readiness',
          '',
          'Applicable lanes pass because the dossier is complete, conservative and reproducible. UI/UX and accessibility delta testing plus Playwright remain ➖ only while the seven learner-facing sources and fifteen-file render closure match baseline.',
          '',
          '➖ means no scoped runtime delta, not a conformity pass. Portable Chromium verification of this report is packaging QA only; it is not learner-facing Playwright, accessibility or visual-parity evidence.',
        ].join('\n'),
      },
      {
        id: 'panel_table',
        type: 'table',
        tableId: 'panel_verdicts',
        layout: 'full',
      },
      {
        id: 'recommendations',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## Recommended next decisions',
          '',
          '1. Keep all three assets quarantined until authorship, license, factual review and independent human approval are recorded.',
          '2. Repair sentence-makerspaces-01 so a list does not permit another equally true completion, then repeat the clean one-best-answer pass.',
          '3. Define and test accepted-answer normalization, including capitalization duplicates and the shopping center spelling variant.',
          '4. Parse each stored word limit and make violations impossible to submit as correct; do not assume every future task allows two words.',
          '5. Diversify answer length and re-run prompt-only and position-based shortcut checks from clean packets.',
          '6. Separate guided-training from Practice and Exam modes before representing the runtime as assessment.',
          '7. Repair inherited accessibility risks and run learner-facing browser testing only in an authorized UI/runtime delta.',
          '8. Stop here. F0.2b.9 Summary Completion belongs to the next loop iteration.',
        ].join('\n'),
      },
      {
        id: 'further_questions',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## Further questions before a product decision',
          '',
          '- Which rewrites reduce the 13/18 and 14/18 answer-length signals without making completions unnatural?',
          '- Does the sentence-makerspaces-01 repair preserve strict passage order and one contiguous best span?',
          '- Should official regional spelling variants be accepted generically, enumerated per item or both?',
          '- Can real learners transfer the evidence-first method when hints and correctness are no longer exposed before commitment?',
        ].join('\n'),
      },
      {
        id: 'caveats',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## Caveats and assumptions',
          '',
          'The provenance search is directed and non-exhaustive. HTTP retrieval and body hashes record availability, not factual verification, authorship or rights. Expert, prompt-only and learner reviews are AI simulations without human signatures.',
          '',
          'Shortcut counts are not learner accuracy or causal evidence. The prompt-only, always-two-words and position-modal diagnostics have different eligibility rules and denominators. With n=18, this audit cannot certify fairness, difficulty, efficacy, accessibility, responsive behavior or production readiness.',
          '',
          'Material ambiguity IDs: ' + ambiguitySummary + '. Key conflict IDs: ' +
            conflictSummary + '. F0.2b remains open.',
        ].join('\n'),
      },
    ],
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
  .map(row => '| ' + row.lane + ' | ' + row.boardMark + ' | ' + row.findings + ' |')
  .join('\n');
const factualRows = claimRows.map(row => '- ' + row.assessment + ': ' + row.claims).join('\n');
const answerLengthMarkdownRows = answerLengthRows
  .map(row => '| ' + row.answerWords + ' | ' + row.count + ' |').join('\n');
const shortcutMarkdownRows = shortcutRows
  .map(row => '| ' + row.stage + ' | ' + row.hits + ' | ' + row.predictions + ' |')
  .join('\n');
const reportMarkdown = [
  '# F0.2b.8 — Sentence Completion audit dossier',
  '',
  'Date: 2026-08-09  ',
  'Decision: **audit PASS; bank and content certification BLOCKED**  ',
  'Scope: ' + validation.scope.passages + ' formative passages, ' +
    validation.scope.questions + ' questions, ' +
    validation.scope.canonicalAnswers + ' canonical answers and ' +
    validation.scope.rawAcceptedEntries + ' raw accepted entries.',
  '',
  '## Executive Summary',
  '',
  '- **The audit closes, but the bank does not.** All ' +
    summaryRows[0].quarantined + '/' + validation.scope.passages +
    ' assets remain quarantined.',
  '- **The independent answer match count is ' +
    validation.expertReview.answerAgreement.matches + '/' +
    validation.expertReview.answerAgreement.total + '.** Material ambiguities=' +
    validation.expertReview.materialAmbiguityCount + '; key conflicts=' +
    validation.expertReview.keyConflictCount + '.',
  '- **Answer-length concentration is a measurable shortcut risk.** Always choosing two words hits ' +
    profile.alwaysTwoWordAnswerPredictor.hits + '/' +
    profile.alwaysTwoWordAnswerPredictor.eligible + ', while the modal length by question position hits ' +
    profile.sameQuestionPositionAcrossSetsModalAnswerWordCount.hits + '/' +
    profile.sameQuestionPositionAcrossSetsModalAnswerWordCount.eligible + '.',
  '- **The runtime remains guided-training.** Its explicit check and immediate post-check key/explanation do not constitute Practice or Exam simulation.',
  '- **Stop before F0.2b.9 Summary Completion.** The next unit remains not started and F0.2b remains open.',
  '',
  '| Lane | Board | Audited result |',
  '|---|---:|---|',
  laneRows,
  '',
  '## Rights, provenance and factual review',
  '',
  'All three records remain deny-by-default. Candidate sources and a negative exact-match search do not establish passage authorship, ownership, license, authorization or independent human approval. Exact factual assessments:',
  '',
  factualRows,
  '',
  '## One-best answerability, ambiguities and conflicts',
  '',
  'Every expert row must choose one contiguous span within the two-word limit, quote exact passage evidence, verify the completed sentence, reject the closest competitor and preserve passage order. The clean expert match count is ' +
    validation.expertReview.answerAgreement.matches + '/' +
    validation.expertReview.answerAgreement.total + '.',
  '',
  'Material ambiguity IDs: **' + ambiguitySummary + '**. Key conflict IDs: **' +
    conflictSummary + '**. Agreement does not erase either category.',
  '',
  '## Canonical answer word counts',
  '',
  '| Answer length | Canonical answers |',
  '|---|---:|',
  answerLengthMarkdownRows,
  '',
  'With n=18, the always-two-words predictor hits ' +
    profile.alwaysTwoWordAnswerPredictor.hits + '/' +
    profile.alwaysTwoWordAnswerPredictor.eligible +
    '. This is structural bank evidence, not learner accuracy or a fairness result.',
  '',
  '## Prompt-only shortcut performance',
  '',
  '| No-passage diagnostic | Stored-key hits | Eligible predictions |',
  '|---|---:|---:|',
  shortcutMarkdownRows,
  '',
  'The prompt-only review sees sentence frames and the word limit but no passage, keys, alternatives, hints or explanations. Each diagnostic preserves its own denominator; none is a learner score.',
  '',
  '## Accepted-answer policy',
  '',
  '**sentence-makerspaces-01** includes a capitalization-only normalized duplicate. **sentence-night-markets-01** accepts **shopping center**, the American-spelling counterpart of the British passage form. Official regional-spelling acceptance does not remove the need for a documented, tested platform policy.',
  '',
  '## Learning and runtime implications',
  '',
  'The content-only walkthrough covers ' + validation.studentWalkthrough.passagesCovered + '/' +
    validation.scope.passages + ' passages and ' +
    validation.studentWalkthrough.questionsCovered + '/' +
    validation.scope.questions + ' questions. It models grammar prediction, ordered search, contiguous-span checking, word counting, spelling review and competitor rejection, but it is not real-learner evidence.',
  '',
  'Recorded runtime classification: **' + runtimeClassification +
    '**. Word-limit enforcement is hard-coded to two words and a violation does not explicitly block checking or correctness. The runtime cannot be represented as Practice or Exam simulation.',
  '',
  'UI/UX delta testing and Playwright are ➖ only while learner-facing and render-closure hashes remain identical to baseline. ➖ is not accessibility, interface or browser conformity. Portable-report Chromium verification is report-only and not learner-facing.',
  '',
  '## Recommended next decisions',
  '',
  '1. Keep every asset quarantined until authorship, license, factual review and independent human approval are recorded.',
  '2. Repair sentence-makerspaces-01 and repeat the clean exact-one-best-answer pass.',
  '3. Define and test accepted-answer normalization, including shopping center and capitalization-only duplicates.',
  '4. Parse the stored word limit and block over-limit answers from correctness.',
  '5. Diversify answer lengths, then repeat prompt-only and position-based shortcut checks.',
  '6. Split guided-training from Practice and Exam modes before representing the runtime as assessment.',
  '7. Repair inherited accessibility risks and run learner-facing browser testing only in an authorized UI/runtime delta.',
  '8. Stop here; F0.2b.9 Summary Completion belongs to the next loop iteration.',
  '',
  '## Further questions',
  '',
  '- Which rewrites reduce the 13/18 and 14/18 length signals while preserving natural exact spans?',
  '- Does the sentence-makerspaces-01 repair preserve strict passage order?',
  '- Should regional spelling variants be accepted generically, enumerated per item or both?',
  '- Can real learners transfer the method without pre-response hints and immediate correctness?',
  '',
  '## Sources and limitations',
  '',
  '- [validation.json](validation.json) — executable scope, decisions and derived metrics',
  '- [audit-verdicts.json](audit-verdicts.json) — final multi-lane panel ledger',
  '- [baseline.json](baseline.json) — pinned content and learner-runtime identity',
  '- [prompt-only.json](prompt-only.json) and [prompt-only-verdict.json](prompt-only-verdict.json) — sentence-frame shortcut packet and independent verdict',
  '- [blind-review.json](blind-review.json) and [expert-first-pass.json](expert-first-pass.json) — clean passage packet and persisted first pass',
  '- [factual-source-review.json](factual-source-review.json) and [expert-verdict.json](expert-verdict.json) — exact-claim packet and final two-pass review',
  '- [student-walkthrough.json](student-walkthrough.json) — content-only learner simulation',
  '- [source-availability.json](source-availability.json) and [provenance-search.json](provenance-search.json) — retrieval and directed-search ledgers',
  '- [unit-change-manifest.json](unit-change-manifest.json) — audit-only scope and F0.2b.9 boundary',
  '',
  'Limitations: candidate-source availability is not factual verification or rights clearance; provenance search is directed and non-exhaustive; AI reviews are not human signatures; n=' +
    validation.scope.questions +
    ' cannot certify learner accuracy, fairness or efficacy; and this unit contains no learner-facing UI, accessibility or Playwright conformance evidence.',
  '',
  '## Stop boundary',
  '',
  'F0.2b remains open. The next subunit is F0.2b.9 Summary Completion; it was not started.',
  '',
].join('\n');

writeFileSync(resolve(here, 'artifact.json'), JSON.stringify(artifact, null, 2) + '\n');
writeFileSync(resolve(here, 'report.md'), reportMarkdown);
process.stdout.write(JSON.stringify({
  title: artifact.manifest.title,
  status: artifact.snapshot.status,
  cards: artifact.manifest.cards.length,
  charts: artifact.manifest.charts.length,
  tables: artifact.manifest.tables.length,
  decisions: artifact.snapshot.datasets.decisions.length,
  nextPackagingStep: 'deliver_portable_artifact.mjs writes the self-contained report.html',
}, null, 2) + '\n');
