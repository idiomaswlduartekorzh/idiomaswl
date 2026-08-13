#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const validation = JSON.parse(readFileSync(resolve(here, 'validation.json'), 'utf8'));
const audit = JSON.parse(readFileSync(resolve(here, 'audit-verdicts.json'), 'utf8'));
const reportGeneratedAt = audit.reviewedAt;
const base = 'output/audits/ielts-reading-rights-matching-sentence-endings-2026-08-09';
const paths = {
  validation: base + '/validation.json',
  baseline: base + '/baseline.json',
  connective: base + '/connective-only.json',
  connectiveVerdict: base + '/connective-only-verdict.json',
  surface: base + '/surface-only.json',
  surfaceVerdict: base + '/surface-only-verdict.json',
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
  'ielts-reading-matching-sentence-endings-rights-validation.v1',
'validation.json no satisface el contrato F0.2b.7.');
assert(audit.schemaVersion ===
  'ielts-reading-matching-sentence-endings-audit-verdicts.v1',
'audit-verdicts.json no satisface el contrato F0.2b.7.');
assert(validation.scope.passages === 3 && validation.scope.questions === 18 &&
  validation.scope.endingCandidates === 24,
'El builder se niega a narrar un scope distinto de 3/18/24.');
assert(validation.expertReview.answerAgreement.total === 18,
'El denominador experto debe ser 18.');
assert(Array.isArray(validation.expertReview.passageOrderViolationQuestionIds) &&
  JSON.stringify(validation.expertReview.passageOrderViolationQuestionIds) ===
    JSON.stringify(['mse-food-waste-06', 'mse-libraries-06']),
'La violación de orden textual esperada no está fijada.');

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
    label: 'Executable F0.2b.7 validation',
    path: paths.validation,
  },
  {
    id: 'baseline',
    label: 'Pinned Matching Sentence Endings bank and learner-runtime baseline',
    path: paths.baseline,
  },
  {
    id: 'connective_packet',
    label: 'Connector-only shortcut packet',
    path: paths.connective,
  },
  {
    id: 'connective_verdict',
    label: 'Independent connector-only shortcut verdict',
    path: paths.connectiveVerdict,
  },
  {
    id: 'surface_packet',
    label: 'Grammar and generic-coherence surface packet',
    path: paths.surface,
  },
  {
    id: 'surface_verdict',
    label: 'Independent surface-only shortcut verdict',
    path: paths.surfaceVerdict,
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
    label: 'F0.2b.7 scope, disposition and expert-review summary',
    tablesUsed: [paths.validation],
    description:
      'One source-backed row for the four report cards and executive scope statements.',
    sql: [
      'SELECT',
      '  scope.passages AS passages,',
      '  scope.questions AS questions,',
      '  scope.endingCandidates AS endingCandidates,',
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
    id: 'ending_query',
    label: 'Stored Matching Sentence Endings response-letter counts',
    tablesUsed: [paths.validation],
    description:
      'Stored-key letter frequency only; it is not learner accuracy, fairness or item quality.',
    sql: [
      'UNPIVOT (',
      '  SELECT antiBias.storedKeyProfile.answerCounts.*',
      "  FROM read_json_auto('" + paths.validation + "')",
      ') ON COLUMNS(*) INTO NAME ending VALUE count;',
    ].join('\n'),
  }),
  sqlSource({
    id: 'shortcut_query',
    label: 'Staged no-passage shortcut performance',
    tablesUsed: [paths.validation],
    description:
      'Unique connector, grammar and generic-coherence predictions, with distinct denominators preserved.',
    sql: [
      'WITH report AS (',
      "  SELECT * FROM read_json_auto('" + paths.validation + "')",
      ')',
      "SELECT 'connective-only unique' AS stage,",
      '  shortcutReview.connectiveOnly.hits AS hits,',
      '  shortcutReview.connectiveOnly.uniquePredictions AS predictions FROM report',
      'UNION ALL',
      "SELECT 'grammar-only unique',",
      '  shortcutReview.surfaceOnly.grammarOnlyHits,',
      '  shortcutReview.surfaceOnly.grammarOnlyUniquePredictions FROM report',
      'UNION ALL',
      "SELECT 'generic-coherence unique',",
      '  shortcutReview.surfaceOnly.genericCoherenceHits,',
      '  shortcutReview.surfaceOnly.genericCoherenceUniquePredictions FROM report;',
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
      '  decision.endingCandidateCount,',
      '  decision.provenanceStatus,',
      '  decision.rightsBasis,',
      '  decision.factualResearchStatus,',
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
  endingCandidates: validation.scope.endingCandidates,
  quarantined: validation.decisions.filter(row => row.disposition === 'quarantine').length,
  expertMatches: validation.expertReview.answerAgreement.matches,
  expertTotal: validation.expertReview.answerAgreement.total,
  materialAmbiguities: validation.expertReview.materialAmbiguityCount,
  orderViolations: validation.expertReview.passageOrderViolationQuestionIds.length,
}];
const endingRows = Object.entries(validation.antiBias.storedKeyProfile.answerCounts)
  .map(([ending, count]) => ({ ending, count }));
const shortcutRows = [
  {
    stage: 'connective-only unique',
    hits: validation.shortcutReview.connectiveOnly.hits,
    predictions: validation.shortcutReview.connectiveOnly.uniquePredictions,
  },
  {
    stage: 'grammar-only unique',
    hits: validation.shortcutReview.surfaceOnly.grammarOnlyHits,
    predictions: validation.shortcutReview.surfaceOnly.grammarOnlyUniquePredictions,
  },
  {
    stage: 'generic-coherence unique',
    hits: validation.shortcutReview.surfaceOnly.genericCoherenceHits,
    predictions: validation.shortcutReview.surfaceOnly.genericCoherenceUniquePredictions,
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

const storedProfile = validation.antiBias.storedKeyProfile;
const lexicalCue = storedProfile.highestSentenceStartEndingLexicalOverlapPredictsAnswer;
const lengthCue = storedProfile.longestEndingWordCountPredictsAnswer;
const positionCue = storedProfile.questionPositionModuloEndingCount;
const claimTotal = claimRows.reduce((sum, row) => sum + row.claims, 0);
const issueIds = [
  ...validation.expertReview.keyConflictQuestionIds,
  ...validation.expertReview.materialAmbiguityQuestionIds,
];
const issueSummary = issueIds.length ? issueIds.join(', ') : 'none recorded';
const orderIssueSummary = validation.expertReview.passageOrderViolationQuestionIds.join(', ');
const endingSummary = endingRows.map(row => row.ending + '=' + row.count).join(', ');
const shortcutSummary = shortcutRows.map(row =>
  row.stage + ' ' + row.hits + '/' + row.predictions).join('; ');
const claimSummary = claimRows.map(row => row.assessment + ' ' + row.claims).join(', ');
const runtimeClassification = validation.runtime.classification;
const accessibility = validation.runtime.inheritedAccessibilityRisks;

assert(claimTotal === 15, 'El builder requiere exactamente quince factual claims.');
assert(summaryRows[0].quarantined === 3, 'El builder requiere cuarentena 3/3.');
assert(storedProfile.storedSelectionReuse.declaredReusePolicy === 'not-declared',
'El builder no puede afirmar una política de reutilización declarada.');

const artifact = {
  surface: 'report',
  manifest: {
    version: 1,
    surface: 'report',
    title: 'IELTS Reading Matching Sentence Endings — audit gate',
    description:
      'F0.2b.7 product-stakeholder dossier for provenance, exact one-best answerability, surface shortcuts, learning value and runtime risk.',
    generatedAt: reportGeneratedAt,
    cards: [
      {
        id: 'scope',
        description: 'Passages, ending candidates and sentence starts in the scoped formative bank.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [
          { label: 'Passages', field: 'passages', format: 'number' },
          { label: 'Endings', field: 'endingCandidates', format: 'number' },
          { label: 'Questions', field: 'questions', format: 'number' },
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
        description: 'Clean expert one-best decisions matching stored ending letters.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [
          { label: 'Expert matches', field: 'expertMatches', format: 'number' },
          { label: 'Reviewed', field: 'expertTotal', format: 'number' },
        ],
      },
      {
        id: 'order_violations',
        description: 'Questions whose decisive passage evidence reverses the official text-order expectation.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [{ label: 'Text-order violations', field: 'orderViolations', format: 'number' }],
      },
    ],
    charts: [
      {
        id: 'ending_counts',
        title: 'Stored ending-letter counts',
        subtitle: 'A–H across n=' + validation.scope.questions +
          '; descriptive stored-key frequency, not learner accuracy or fairness evidence.',
        type: 'bar',
        dataset: 'endings',
        sourceId: 'ending_query',
        valueFormat: 'number',
        encodings: {
          x: { field: 'ending', type: 'nominal', label: 'Stored ending letter' },
          y: { field: 'count', type: 'quantitative', label: 'Questions' },
        },
      },
      {
        id: 'shortcut_performance',
        title: 'Surface-only shortcut performance',
        subtitle:
          'Hits among unique predictions at each no-passage stage; each stage keeps its own denominator.',
        type: 'bar',
        dataset: 'shortcuts',
        sourceId: 'shortcut_query',
        valueFormat: 'number',
        encodings: {
          x: { field: 'stage', type: 'nominal', label: 'No-passage stage' },
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
          { field: 'endingCandidateCount', label: 'Endings', type: 'number' },
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
          'PASS applies to audit completion; product, editorial and runtime blockers remain explicit.',
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
        body: '# IELTS Reading Matching Sentence Endings — audit gate',
      },
      {
        id: 'executive_summary',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## Executive Summary',
          '',
          '- **audit PASS; bank and content certification BLOCKED.** The dossier closes F0.2b.7 controls; all ' +
            summaryRows[0].quarantined + '/' + validation.scope.passages +
            ' assets remain quarantined.',
          '- **The clean expert agrees ' + validation.expertReview.answerAgreement.matches + '/' +
            validation.expertReview.answerAgreement.total + ', but official text order still fails.** ' +
            orderIssueSummary + ' returns to earlier passage evidence after the preceding question and blocks certification.',
          '- **Surface form is a measured shortcut risk.** Connector-only, grammar-only and generic-coherence unique predictions produce ' +
            shortcutSummary + '. These are no-passage diagnostics with different denominators, not learner scores.',
          '- **The runtime remains guided-training.** Immediate locking, correctness feedback, client-delivered keys and pre-response traps mean it is not Practice or Exam simulation.',
          '- **The next boundary stays closed.** F0.2b.8 Sentence Completion is next and has not been started; the F0.2b parent remains open.',
        ].join('\n'),
      },
      {
        id: 'metrics',
        type: 'metric-strip',
        cardIds: ['scope', 'quarantine', 'agreement', 'order_violations'],
      },
      {
        id: 'gate',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## The control gate closes; the product gate stays blocked',
          '',
          'The executable dossier fixes ' + validation.scope.passages + ' passages, ' +
            validation.scope.questions + ' sentence starts and ' +
            validation.scope.endingCandidates + ' ending candidates. Every asset remains deny-by-default because authorship, rights, factual review and independent human approval are unresolved.',
          '',
          'Passing the audit means the scope, packet isolation, two-pass review, hash bindings and blockers are reproducible. It does not mean the bank is cleared, the answers are certified for publication or the runtime is suitable for assessment.',
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
          '## One best ending requires passage logic, not a plausible sentence',
          '',
          'Each clean decision joins a sentence start to exactly one of eight endings, records the logical relation, quotes exact passage evidence, assesses every candidate and rejects the closest competitor. The completed sentence must be both grammatically natural and supported by the passage.',
          '',
          'The local task instructions say only that more endings are supplied than starts. The **reuse policy not declared** finding is therefore preserved: the audit observes no stored reuse, but it does not invent a prohibition or permission absent from the instructions.',
        ].join('\n'),
      },
      {
        id: 'ending_context',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## Stored letters are orderly enough to demand caution',
          '',
          'Across n=' + validation.scope.questions + ', stored ending counts are ' + endingSummary +
            '. The concatenated and per-set same-letter runs both peak at ' +
            storedProfile.globalConcatenatedMaxSameLabelRun + ', while all three stored sequences rise strictly through the letter order.',
          '',
          'The position-modulo-eight rule hits ' + positionCue.hits + '/' + positionCue.eligible +
            '. Frequency and sequence are structural diagnostics only. With n=18, they cannot establish learner fairness, item balance or difficulty.',
        ].join('\n'),
      },
      {
        id: 'ending_chart',
        type: 'chart',
        chartId: 'ending_counts',
        layout: 'full',
      },
      {
        id: 'shortcut_context',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## No-passage reviewers quantify how much surface form gives away',
          '',
          'The connector-only reviewer sees only sentence starts and connective classes. The surface-only reviewer then sees full endings but still no passage. Unique predictions at those stages are compared with stored keys solely to measure shortcut exposure: ' + shortcutSummary + '.',
          '',
          'The automatic lexical-overlap rule hits ' + lexicalCue.hits + '/' + lexicalCue.eligible +
            ' eligible unique predictions with ' + lexicalCue.tiesOrAbstentions +
            ' ties or abstentions. The longest-ending rule hits ' + lengthCue.hits + '/' +
            lengthCue.eligible + ' with ' + lengthCue.tiesOrAbstentions +
            ' ties or abstentions. Different denominators make these checks non-comparable as a leaderboard. The practical implication is to rewrite endings and starts only after a fresh clean surface audit, not to optimize against one heuristic.',
        ].join('\n'),
      },
      {
        id: 'shortcut_chart',
        type: 'chart',
        chartId: 'shortcut_performance',
        layout: 'full',
      },
      {
        id: 'factual_context',
        type: 'markdown',
        sourceId: 'expert_verdict',
        body: [
          '## Candidate sources inform exact claims without clearing the bank',
          '',
          'The second pass classifies ' + claimTotal + ' frozen factual claims as ' +
            claimSummary + '. The chart shows the exact count in each review category.',
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
        id: 'text_order',
        type: 'markdown',
        sourceId: 'expert_verdict',
        body: [
          '## One question breaks the official passage-order expectation',
          '',
          '**' + orderIssueSummary + '** points back to earlier passage evidence after the previous question has already advanced. That is a material IELTS-format defect even when the stored ending itself is semantically defensible.',
          '',
          'The item must be reordered or rewritten, followed by a new clean expert pass. A stored-key agreement count cannot cancel this format blocker.',
        ].join('\n'),
      },
      {
        id: 'learning',
        type: 'markdown',
        sourceId: 'student_walkthrough',
        body: [
          '## Learning value is plausible but still prospective',
          '',
          'The content-only walkthrough covers ' + validation.studentWalkthrough.passagesCovered + '/' +
            validation.scope.passages + ' passages and ' +
            validation.studentWalkthrough.questionsCovered + '/' +
            validation.scope.questions + ' questions. It models relation prediction, grammar filtering, evidence search, ending comparison, competitor rejection and repair after superficial matching.',
          '',
          'It remains an AI simulation, not observation of a real learner. It supplies no IELTS band, usability, retention, transfer or learning-gain evidence.',
        ].join('\n'),
      },
      {
        id: 'runtime',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## The unchanged runtime is guided-training, not assessment',
          '',
          'Recorded classification: **' + runtimeClassification +
            '**. The client receives stored keys; choosing an ending immediately locks the select and reveals correctness plus explanation; ending options remain visible; and trap text is available before response.',
          '',
          'Existing accessibility risks remain visible in the baseline: native selects have accessible names=' +
            accessibility.nativeSelectAccessibleName +
            '; progress has a programmatic role/name/value=' +
            accessibility.progressIndicatorHasProgrammaticRoleNameAndValue +
            '; feedback has a live region=' + accessibility.feedbackHasLiveRegion +
            '; attempt persistence=' + accessibility.attemptStatePersisted +
            '. No audit-only hash pin turns these negatives into conformity.',
        ].join('\n'),
      },
      {
        id: 'panel_scope',
        type: 'markdown',
        sourceId: 'audit_verdicts',
        body: [
          '## Panel marks describe scope, not product readiness',
          '',
          'Applicable lanes pass because the dossier is complete, conservative and reproducible. UI/UX and accessibility delta testing plus Playwright remain ➖ only while the seven learner-facing sources and fifteen-file render closure match baseline.',
          '',
          '➖ means no scoped runtime delta, not a conformity pass. Portable report verification exercises this stakeholder report only; it is not a learner-facing browser or accessibility test.',
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
          '2. Reorder or rewrite mse-food-waste-06 and mse-libraries-06 so question order follows passage evidence, then repeat the clean one-best-answer pass.',
          '3. Rewrite any starts or endings that survive connector-only, grammar-only or generic-coherence review without passage evidence; repeat both staged reviews from clean packets.',
          '4. Preserve **reuse policy not declared** unless learner instructions explicitly add an official, sourced rule.',
          '5. Separate guided-training from Practice and Exam modes before representing the runtime as assessment; remove immediate disclosure and pre-response trap access from assessment modes.',
          '6. Repair the inherited accessibility risks and run learner-facing browser testing only in an authorized UI/runtime delta.',
          '7. Stop here. F0.2b.8 Sentence Completion belongs to the next loop iteration.',
        ].join('\n'),
      },
      {
        id: 'further_questions',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## Further questions before a product decision',
          '',
          '- Which ending rewrites reduce surface-only uniqueness without making the task unnatural?',
          '- Does the text-order repair preserve exact one-best answerability and the closest-competitor distinction?',
          '- What happens to shortcut rates on a bank of at least 100 independently reviewed questions?',
          '- Can learners transfer the evidence-first method when traps and correctness are no longer exposed before commitment?',
        ].join('\n'),
      },
      {
        id: 'caveats',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## Caveats and assumptions',
          '',
          'The provenance search is directed and non-exhaustive. HTTP retrieval and body hashes record availability, not factual verification, authorship or rights. Expert, surface and learner reviews are AI simulations without human signatures.',
          '',
          'No shortcut count is learner accuracy or causal evidence. The lexical, length, connector, grammar and coherence diagnostics have different eligibility rules and denominators. With n=18, the audit cannot certify fairness, difficulty, efficacy, accessibility, responsive behavior or production readiness.',
          '',
          'Key conflicts or material ambiguities: ' + issueSummary + '. F0.2b remains open.',
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
      endings: endingRows,
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
const shortcutMarkdownRows = shortcutRows
  .map(row => '| ' + row.stage + ' | ' + row.hits + ' | ' + row.predictions + ' |')
  .join('\n');
const reportMarkdown = [
  '# F0.2b.7 — Matching Sentence Endings audit dossier',
  '',
  'Date: 2026-08-09  ',
  'Decision: **audit PASS; bank and content certification BLOCKED**  ',
  'Scope: ' + validation.scope.passages + ' formative passages, ' +
    validation.scope.endingCandidates + ' ending candidates and ' +
    validation.scope.questions + ' sentence starts.',
  '',
  '## Executive Summary',
  '',
  '- **The audit closes, but the bank does not.** All ' +
    summaryRows[0].quarantined + '/' + validation.scope.passages +
    ' assets remain quarantined.',
  '- **The clean expert matched ' + validation.expertReview.answerAgreement.matches + '/' +
    validation.expertReview.answerAgreement.total + ' stored endings.** It recorded ' +
    validation.expertReview.materialAmbiguityCount + ' material ambiguities and ' +
    validation.expertReview.keyConflictCount + ' key conflicts.',
  '- **Text order still blocks IELTS-format certification.** ' + orderIssueSummary +
    ' returns to earlier passage evidence after the prior question.',
  '- **The runtime remains guided-training.** Immediate locking, correctness feedback, client keys and pre-response traps mean it is not Practice or Exam simulation.',
  '- **Stop before F0.2b.8 Sentence Completion.** The next unit remains not started and F0.2b remains open.',
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
  '## One-best answerability and official order',
  '',
  'Every expert row must identify one best ending, quote exact passage evidence, assess all eight candidates and reject the closest competitor. The clean expert matched ' +
    validation.expertReview.answerAgreement.matches + '/' +
    validation.expertReview.answerAgreement.total + ' stored endings. That agreement does not cure the text-order defect at **' +
    orderIssueSummary + '**.',
  '',
  'The learner instructions provide extra endings but do not state whether an ending may be reused. The audit therefore preserves **reuse policy not declared**; it neither invents permission nor prohibition.',
  '',
  '## Surface-only shortcut findings',
  '',
  '| No-passage stage | Stored-key hits | Unique predictions |',
  '|---|---:|---:|',
  shortcutMarkdownRows,
  '',
  'These stages use different evidence and denominators. They measure how much a reviewer can infer without the passage; they are not learner accuracy. The position-modulo-eight heuristic hits ' +
    positionCue.hits + '/' + positionCue.eligible +
    ', lexical overlap hits ' + lexicalCue.hits + '/' + lexicalCue.eligible +
    ' eligible unique predictions, and longest-ending selection hits ' +
    lengthCue.hits + '/' + lengthCue.eligible + '.',
  '',
  'Stored ending-letter counts are ' + endingSummary + '. With n=18, none of these diagnostics supports a fairness, difficulty or statistical-balance certification.',
  '',
  '## Learning and runtime implications',
  '',
  'The content-only walkthrough covers ' + validation.studentWalkthrough.passagesCovered + '/' +
    validation.scope.passages + ' passages and ' +
    validation.studentWalkthrough.questionsCovered + '/' +
    validation.scope.questions + ' questions. It models relation prediction, grammar filtering, passage evidence and competitor rejection, but it is not real-learner evidence.',
  '',
  'Recorded runtime classification: **' + runtimeClassification +
    '**. The client receives stored keys, locks a response immediately, reveals correctness and explanation, and exposes trap text before commitment. It cannot be represented as Practice or Exam simulation.',
  '',
  'UI/UX delta testing and Playwright are ➖ only while learner-facing and render-closure hashes remain identical to baseline. ➖ is not accessibility, interface or browser conformity.',
  '',
  '## Recommended next decisions',
  '',
  '1. Keep every asset quarantined until authorship, license, factual review and independent human approval are recorded.',
  '2. Repair mse-food-waste-06 and mse-libraries-06 so question order follows passage evidence, then repeat the clean expert pass.',
  '3. Rewrite items that collapse under connector-only, grammar-only or generic-coherence review and repeat all staged no-passage checks.',
  '4. Preserve reuse policy not declared unless learner instructions explicitly add a sourced rule.',
  '5. Split guided-training from Practice and Exam modes before representing the runtime as assessment.',
  '6. Repair inherited accessibility risks and run browser testing only in an authorized learner-facing delta.',
  '7. Stop here; F0.2b.8 Sentence Completion belongs to the next loop iteration.',
  '',
  '## Further questions',
  '',
  '- Which rewrites lower no-passage uniqueness while preserving natural, one-best completion?',
  '- Does the order repair preserve the closest-competitor distinction?',
  '- Do shortcut rates persist on a bank of at least 100 reviewed questions?',
  '- Can real learners transfer the method without pre-response traps and immediate correctness?',
  '',
  '## Sources and limitations',
  '',
  '- [validation.json](validation.json) — executable scope, decisions and derived metrics',
  '- [audit-verdicts.json](audit-verdicts.json) — final multi-lane panel ledger',
  '- [baseline.json](baseline.json) — pinned content and runtime identity',
  '- [connective-only.json](connective-only.json) and [connective-only-verdict.json](connective-only-verdict.json) — connector-stage packet and verdict',
  '- [surface-only.json](surface-only.json) and [surface-only-verdict.json](surface-only-verdict.json) — grammar/coherence packet and verdict',
  '- [blind-review.json](blind-review.json) and [expert-first-pass.json](expert-first-pass.json) — clean passage packet and persisted first pass',
  '- [factual-source-review.json](factual-source-review.json) and [expert-verdict.json](expert-verdict.json) — exact-claim packet and final two-pass review',
  '- [student-walkthrough.json](student-walkthrough.json) — content-only learner simulation',
  '- [source-availability.json](source-availability.json) and [provenance-search.json](provenance-search.json) — retrieval and directed-search ledgers',
  '- [unit-change-manifest.json](unit-change-manifest.json) — audit-only scope and F0.2b.8 boundary',
  '',
  'Limitations: candidate-source availability is not factual verification or rights clearance; provenance search is directed and non-exhaustive; AI reviews are not human signatures; n=' +
    validation.scope.questions +
    ' cannot certify learner accuracy, fairness or efficacy; and this unit contains no learner-facing UI, accessibility or Playwright conformance evidence.',
  '',
  '## Stop boundary',
  '',
  'F0.2b remains open. The next subunit is F0.2b.8 Sentence Completion; it was not started.',
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
}, null, 2) + '\n');
