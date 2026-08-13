#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const validation = JSON.parse(readFileSync(resolve(here, 'validation.json'), 'utf8'));
const audit = JSON.parse(readFileSync(resolve(here, 'audit-verdicts.json'), 'utf8'));
const reportGeneratedAt = audit.reviewedAt;
const base = 'output/audits/ielts-reading-rights-matching-features-2026-08-09';
const paths = {
  validation: base + '/validation.json',
  baseline: base + '/baseline.json',
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
  { id: 'validation', label: 'Executable F0.2b.6 validation', path: paths.validation },
  { id: 'baseline', label: 'Pinned Matching Features content and learner-runtime baseline', path: paths.baseline },
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
    label: 'F0.2b.6 scope and disposition summary',
    tablesUsed: [paths.validation],
    sql: [
      'SELECT',
      '  scope.passages AS passages,',
      '  scope.questions AS questions,',
      '  scope.featureCandidates AS featureCandidates,',
      "  COUNT(*) FILTER (WHERE decision.disposition = 'quarantine') AS quarantined,",
      '  expertReview.answerAgreement.matches AS expertMatches,',
      '  expertReview.answerAgreement.total AS expertTotal,',
      '  expertReview.materialAmbiguityCount AS materialAmbiguities',
      "FROM read_json_auto('" + paths.validation + "') AS report,",
      'UNNEST(report.decisions) AS rows(decision)',
      'GROUP BY ALL;',
    ].join('\n'),
  }),
  sqlSource({
    id: 'label_query',
    label: 'Stored Matching Features response-letter counts',
    tablesUsed: [paths.validation],
    sql: [
      'UNPIVOT (',
      '  SELECT antiBias.storedKeyProfile.answerCounts.*',
      "  FROM read_json_auto('" + paths.validation + "')",
      ') ON COLUMNS(*) INTO NAME label VALUE count;',
    ].join('\n'),
  }),
  sqlSource({
    id: 'claim_query',
    label: 'Independent factual-claim assessments',
    tablesUsed: [paths.validation],
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
    sql: [
      'SELECT',
      '  decision.assetId,',
      '  decision.title,',
      '  decision.wordCount,',
      '  decision.questionCount,',
      '  decision.featureCandidateCount,',
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
  featureCandidates: validation.scope.featureCandidates,
  quarantined: validation.decisions.filter(row => row.disposition === 'quarantine').length,
  expertMatches: validation.expertReview.answerAgreement.matches,
  expertTotal: validation.expertReview.answerAgreement.total,
  materialAmbiguities: validation.expertReview.materialAmbiguityCount,
}];
const labelRows = Object.entries(validation.antiBias.storedKeyProfile.answerCounts)
  .map(([label, count]) => ({ label, count }));
const claimRows = Object.entries(validation.expertReview.factualAssessmentCounts)
  .map(([assessment, claims]) => ({ assessment, claims }));
const decisionRows = validation.decisions.map(decision => {
  const row = { ...decision };
  delete row.reasonCodes;
  row.blockers = decision.reasonCodes.join(' · ');
  return row;
});

const storedProfile = validation.antiBias.storedKeyProfile;
const overlapCue = storedProfile.highestLabelDescriptionOverlapPredictsAnswer;
const lengthCue = storedProfile.longestFeatureDescriptionWordCountPredictsAnswer;
const claimTotal = claimRows.reduce((sum, row) => sum + row.claims, 0);
const conflictIds = validation.expertReview.keyConflictQuestionIds;
const ambiguityIds = validation.expertReview.materialAmbiguityQuestionIds;
const issueIds = [...conflictIds, ...ambiguityIds];
const issueSummary = issueIds.length ? issueIds.join(', ') : 'none recorded';
const accessibility = validation.runtime.accessibilityObservations;
const runtimeClassification = validation.runtime.classification;
const labelSummary = labelRows.map(row => row.label + '=' + row.count).join(', ');
const claimSummary = claimRows.map(row => row.assessment + ' ' + row.claims).join(', ');

const artifact = {
  surface: 'report',
  manifest: {
    version: 1,
    surface: 'report',
    title: 'IELTS Reading Matching Features — audit gate',
    description: 'F0.2b.6 stakeholder dossier for provenance, feature association, learning value and shortcut risk.',
    generatedAt: reportGeneratedAt,
    cards: [
      {
        id: 'scope',
        description: 'Passages, feature candidates and learner decisions in the scoped formative bank.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [
          { label: 'Passages', field: 'passages', format: 'number' },
          { label: 'Features', field: 'featureCandidates', format: 'number' },
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
        description: 'Independent semantic associations matching stored feature letters.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [
          { label: 'Expert matches', field: 'expertMatches', format: 'number' },
          { label: 'Reviewed', field: 'expertTotal', format: 'number' },
        ],
      },
      {
        id: 'ambiguity',
        description: 'Statements with more than one materially defensible feature.',
        dataset: 'summary',
        sourceId: 'summary_query',
        metrics: [{ label: 'Material ambiguities', field: 'materialAmbiguities', format: 'number' }],
      },
    ],
    charts: [
      {
        id: 'label_counts',
        title: 'Stored feature-letter counts',
        subtitle: 'Question: how are A–E stored answer letters distributed? n=' +
          validation.scope.questions + ' is descriptive, not learner accuracy or fairness evidence.',
        type: 'bar',
        dataset: 'labels',
        sourceId: 'label_query',
        valueFormat: 'number',
        encodings: {
          x: { field: 'label', type: 'nominal', label: 'Stored feature letter' },
          y: { field: 'count', type: 'quantitative', label: 'Decisions' },
        },
      },
      {
        id: 'claim_assessments',
        title: 'Independent factual-claim assessments',
        subtitle: 'Question: how did direct source review classify ' + claimTotal +
          ' declared claims? These counts are not rights clearance or human verification.',
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
          { field: 'questionCount', label: 'Statements', type: 'number' },
          { field: 'featureCandidateCount', label: 'Features', type: 'number' },
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
        subtitle: 'PASS applies to audit completion; open product and editorial blockers remain explicit.',
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
      { id: 'title', type: 'markdown', body: '# IELTS Reading Matching Features — audit gate' },
      {
        id: 'executive_summary',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## Executive Summary',
          '',
          '- **audit PASS; bank and content certification BLOCKED.** The dossier closes F0.2b.6 controls; all ' +
            summaryRows[0].quarantined + '/' + validation.scope.passages + ' assets remain quarantined.',
          '- Independent IELTS review matched ' + validation.expertReview.answerAgreement.matches + '/' +
            validation.expertReview.answerAgreement.total + ' stored feature assignments and recorded ' +
            validation.expertReview.materialAmbiguityCount + ' material ambiguities.',
          '- A stored-position heuristic succeeds on **11/19** decisions. Independent semantic screening reaches **16/19** from visible descriptions alone and **18/19** when pre-answer trap text is added. These are three different diagnostics over n=19, not learner accuracy, fairness or efficacy proof.',
          '- The unchanged runtime is **guided-training** with immediate answer locking and feedback, client-delivered keys, visible feature descriptions and traps available before response; it is not Practice or Exam simulation.',
          '- UI/UX, accessibility and Playwright are ➖ because no learner-facing source changed. ➖ means unchanged and not audited for conformity; the inherited blockers remain open.',
          '- Stop at this gate. **F0.2b.7 Matching Sentence Endings** is next and has not been started.',
        ].join('\n'),
      },
      { id: 'metrics', type: 'metric-strip', cardIds: ['scope', 'quarantine', 'agreement', 'ambiguity'] },
      {
        id: 'gate',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## The audit passes; the bank does not',
          '',
          'The control layer pins ' + validation.scope.passages + ' passage objects, ' +
            validation.scope.featureCandidates + ' feature candidates and ' +
            validation.scope.questions + ' feature decisions. It applies deny-by-default rights records and preserves clean-review hashes.',
          '',
          'Passing those controls is not publication approval. Authorship, license, factual review and independent human approval remain unresolved. Open key conflicts or material ambiguities are reported, never overwritten: ' + issueSummary + '.',
        ].join('\n'),
      },
      { id: 'decision_table', type: 'table', tableId: 'asset_decisions', layout: 'full' },
      {
        id: 'matching_contract',
        type: 'markdown',
        sourceId: 'expert_verdict',
        body: [
          '## Matching Features requires attributed relationships',
          '',
          'The task associates statements with people, groups, policies or other features identified by letters. A defensible decision requires the right actor or feature, the stated relationship, exact passage evidence and rejection of the closest competitor. Options may be unused, and an option may be reused only when the task instruction explicitly allows it. The three audited sets declare reuse.',
          '',
          'The clean expert agreement is an audit signal. It does not prove that the descriptions, hints or runtime teach the skill safely.',
        ].join('\n'),
      },
      {
        id: 'label_context',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## Letter counts describe stored keys, not fairness',
          '',
          'Across n=' + validation.scope.questions + ', stored counts are ' + labelSummary + '. The longest global same-letter run is ' +
            storedProfile.globalConcatenatedMaxSameLabelRun + ', and every set contains declared reuse.',
          '',
          'The **11/19** result is a stored-position heuristic: it predicts the feature at question position modulo the number of features in that set. It is a structural shortcut warning, not a learner score. The sample is below the 100-item certification threshold, so no balance or fairness claim is made.',
        ].join('\n'),
      },
      { id: 'label_chart', type: 'chart', chartId: 'label_counts', layout: 'full' },
      {
        id: 'semantic_screening',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## Visible descriptions and hints can collapse the reading task',
          '',
          'An independent semantic screen matches **16/19** stored assignments using visible feature descriptions without passage evidence. With pre-answer trap text, it matches **18/19**. These are independent semantic screening counts over n=19; they are not learner accuracy results and do not establish statistical fairness.',
          '',
          'The automated highest label-plus-description overlap heuristic hits ' + overlapCue.hits + '/' +
            overlapCue.eligible + ' eligible unique predictions with ' + overlapCue.tiesOrAbstentions +
            ' ties or abstentions. The longest-description heuristic hits ' + lengthCue.hits + '/' +
            lengthCue.eligible + ' eligible predictions with ' + lengthCue.tiesOrAbstentions +
            ' ties or abstentions. Differing denominators make these diagnostics non-comparable as a leaderboard.',
        ].join('\n'),
      },
      {
        id: 'factual_context',
        type: 'markdown',
        sourceId: 'expert_verdict',
        body: [
          '## Candidate sources contextualize claims; they do not clear them',
          '',
          'The second pass classifies ' + claimTotal + ' declared factual claims as ' + claimSummary + '. Candidate institutional sources can support or challenge wording, but they do not establish authorship, licensing, provenance or human factual approval.',
        ].join('\n'),
      },
      { id: 'claim_chart', type: 'chart', chartId: 'claim_assessments', layout: 'full' },
      {
        id: 'learning',
        type: 'markdown',
        sourceId: 'student_walkthrough',
        body: [
          '## Learning value remains prospective',
          '',
          'The content-only walkthrough covers ' + validation.studentWalkthrough.passagesCovered + '/' +
            validation.scope.passages + ' passages and ' + validation.studentWalkthrough.questionsCovered + '/' +
            validation.scope.questions + ' statements. It models attribution, evidence search, feature comparison, closest-competitor rejection and repair after superficial matching.',
          '',
          'It is an AI cognitive walkthrough, not observation of a real student. It assigns no band and supplies no evidence of learning gains, retention, transfer or usability.',
        ].join('\n'),
      },
      {
        id: 'runtime',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## The current runtime is guided-training, not Practice or Exam',
          '',
          'Recorded classification: **' + runtimeClassification + '**. Selection immediately locks the item and reveals correctness; answer keys are delivered to the client; feature descriptions are visible before response; and trap hints can be opened before answering. These inherited behaviors block bank and content certification.',
          '',
          'Accessibility observations remain open: ' + accessibility.unnamedSelects +
            ' unnamed selects; progress ARIA=' + accessibility.progressHasAria +
            '; feedback aria-live=' + accessibility.feedbackHasAriaLive +
            '; trap aria-expanded/controls=' + accessibility.trapToggleHasExpandedControls +
            '; focus after lock=' + accessibility.focusAfterLock +
            '; answer persistence=' + accessibility.answerPersistence +
            '; reset confirmation=' + accessibility.resetConfirmation + '.',
        ].join('\n'),
      },
      {
        id: 'panel_scope',
        type: 'markdown',
        sourceId: 'audit_verdicts',
        body: [
          '## Panel scope',
          '',
          'Applicable lanes pass only for a complete, conservative and reproducible dossier. UI/UX and accessibility plus Playwright are ➖ only because the seven pinned learner-facing files are unchanged in this audit-only delta.',
          '',
          '➖ means unchanged, not conformant. It does not certify the existing interface, accessibility, responsive behavior, focus handling or learner workflow. Packaging this stakeholder report in Chromium is report verification only, not a learner-facing browser audit.',
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
          '2. Remove or defer feature descriptions and pre-answer trap hints, then repeat a clean semantic screen; preserve official reuse instructions where applicable.',
          '3. Redesign item order and remeasure the 11/19 stored-position signal on a substantially larger bank before any fairness claim.',
          '4. Separate guided-training from Practice and Exam modes; prevent immediate disclosure in assessment modes and add evidence-focused feedback.',
          '5. Resolve the inherited accessibility blockers, then run an applicable learner-facing Playwright matrix in that separate UI delta.',
          '6. Re-run clean IELTS and average-student reviews after content or runtime changes.',
          '7. Stop here. F0.2b.7 Matching Sentence Endings belongs to the next loop iteration.',
        ].join('\n'),
      },
      {
        id: 'caveats',
        type: 'markdown',
        sourceId: 'validation',
        body: [
          '## Caveats and open questions',
          '',
          'The provenance search is directed and non-exhaustive. Source reachability is not factual verification, authorship evidence or rights clearance. Both independent reviews are AI simulations without human signatures.',
          '',
          'The 11/19, 16/19 and 18/19 diagnostics answer different questions over n=19. None is learner accuracy, a causal learning measure or proof of content fairness. This audit-only delta does not test responsive layout, assistive technology, real learners, retention, band improvement or production publication controls.',
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
      labels: labelRows,
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
const reportMarkdown = [
  '# F0.2b.6 — Matching Features audit dossier',
  '',
  'Date: 2026-08-09  ',
  'Decision: **audit PASS; bank and content certification BLOCKED**  ',
  'Scope: ' + validation.scope.passages + ' formative passages, ' +
    validation.scope.featureCandidates + ' feature candidates and ' +
    validation.scope.questions + ' feature decisions.',
  '',
  '## Executive Summary',
  '',
  'This unit closes the reproducible audit gate, not the bank. All ' +
    summaryRows[0].quarantined + '/' + validation.scope.passages + ' assets remain quarantined. ' +
    'The clean expert matched ' + validation.expertReview.answerAgreement.matches + '/' +
    validation.expertReview.answerAgreement.total + ' stored assignments and reported ' +
    validation.expertReview.materialAmbiguityCount + ' material ambiguities and ' +
    validation.expertReview.keyConflictCount + ' key conflicts.',
  '',
  'The stored-position heuristic succeeds on **11/19** decisions. Independent semantic screening reaches **16/19** from visible feature descriptions alone and **18/19** after adding pre-answer trap text. These are different diagnostics over n=19, not learner accuracy, statistical fairness or efficacy evidence.',
  '',
  'The unchanged runtime remains **guided-training** with immediate answer locking and feedback. UI/UX, accessibility and Playwright are ➖ because no scoped learner-facing file changed; ➖ means unchanged, not conformant. F0.2b.7 Matching Sentence Endings is next and was not started.',
  '',
  '| Lane | Board | Audited result |',
  '|---|---:|---|',
  laneRows,
  '',
  '## Rights, provenance and factual review',
  '',
  'All records stay deny-by-default. The directed provenance search is non-exhaustive, and a negative exact-match search does not prove original authorship. Candidate institutional sources do not establish ownership, a license or human factual approval. Independent claim assessments:',
  '',
  factualRows,
  '',
  '## IELTS answerability and learning value',
  '',
  'Matching Features requires an attributed relationship between each statement and a lettered person, group, policy or other feature. A complete decision records exact evidence and rejects the closest competitor. Options may be unused; reuse is permitted only when the instructions declare it. Stored-key agreement is an audit signal, not content certification.',
  '',
  'The content-only student walkthrough covers ' + validation.studentWalkthrough.passagesCovered + '/' +
    validation.scope.passages + ' passages and ' + validation.studentWalkthrough.questionsCovered + '/' +
    validation.scope.questions + ' statements. It is a prospective AI simulation, not evidence of learning gains, retention, transfer, usability or IELTS band improvement.',
  '',
  '## Anti-bias and leakage findings',
  '',
  'Stored feature-letter counts are ' + labelSummary + '. The **11/19** result is a stored-position heuristic: it predicts the feature at question position modulo the number of features in the set. It does not measure student performance.',
  '',
  'An independent semantic screen matches **16/19** stored assignments from visible descriptions alone and **18/19** when pre-answer trap text is added. These semantic screening counts are independent of the stored-position heuristic. The automatic lexical-overlap heuristic hits ' +
    overlapCue.hits + '/' + overlapCue.eligible + ' eligible unique predictions; the longest-description heuristic hits ' +
    lengthCue.hits + '/' + lengthCue.eligible + '. Differing denominators should not be compared as if they were one score.',
  '',
  'With n=' + validation.scope.questions + ', no learner accuracy, fairness or statistical balance claim is supported.',
  '',
  '## Runtime, UI/UX and Playwright applicability',
  '',
  'Recorded runtime classification: **' + runtimeClassification + '**. The engine immediately locks each response and shows correctness, sends answer keys to the client, shows feature descriptions before response and exposes trap hints before an answer. It cannot be represented as Practice or Exam simulation.',
  '',
  'Inherited accessibility blockers include ' + accessibility.unnamedSelects +
    ' unnamed selects, no ARIA progress, no live feedback announcement, no expanded/controls state on trap toggles, focus moving to ' +
    accessibility.focusAfterLock + ', no answer persistence and no reset confirmation.',
  '',
  'UI/UX and Playwright are ➖ solely because the learner-facing closure is hash-pinned and unchanged. This does not certify interface quality, accessibility, responsiveness or browser behavior. Portable-report Chromium verification is report-only and not learner-facing.',
  '',
  '## Open answerability items',
  '',
  'Key conflicts or material ambiguities: ' + issueSummary + '.',
  '',
  '## Recommended next decisions',
  '',
  '1. Keep every asset quarantined until authorship, license, factual review and independent human approval are recorded.',
  '2. Remove or defer visible descriptions and pre-answer traps, then repeat clean semantic screening.',
  '3. Redesign item order and expand the bank before re-evaluating the 11/19 position signal or making any fairness claim.',
  '4. Split guided-training from Practice and Exam modes and repair the inherited accessibility blockers.',
  '5. Run learner-facing Playwright only when an applicable UI/runtime delta exists.',
  '6. Re-run independent IELTS and student reviews after every editorial or runtime change.',
  '7. Stop here; F0.2b.7 Matching Sentence Endings was not started.',
  '',
  '## Sources and limitations',
  '',
  '- [validation.json](validation.json) — executable scope, decisions and derived metrics',
  '- [audit-verdicts.json](audit-verdicts.json) — final multi-lane panel ledger',
  '- [baseline.json](baseline.json) — pinned content and learner-runtime identity',
  '- [blind-review.json](blind-review.json) and [expert-first-pass.json](expert-first-pass.json) — clean first-pass inputs and decisions',
  '- [factual-source-review.json](factual-source-review.json) and [expert-verdict.json](expert-verdict.json) — candidate-source packet and final review',
  '- [student-walkthrough.json](student-walkthrough.json) — content-only learner simulation',
  '- [source-availability.json](source-availability.json) and [provenance-search.json](provenance-search.json) — retrieval and directed-search ledgers',
  '- [unit-change-manifest.json](unit-change-manifest.json) — narrow audit-only delta',
  '',
  'Limitations: candidate-source availability is not factual verification or rights clearance; the provenance search is directed and non-exhaustive; AI reviews are not human signatures; n=' +
    validation.scope.questions + ' cannot certify learner accuracy, fairness or efficacy; and this unit contains no learner-facing UI, accessibility or Playwright conformance evidence. F0.2b remains open.',
  '',
  '## Stop boundary',
  '',
  'F0.2b remains open. The next subunit is F0.2b.7 Matching Sentence Endings; it was not started.',
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
