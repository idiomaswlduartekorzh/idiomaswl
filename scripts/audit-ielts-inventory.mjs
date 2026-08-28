#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { withIeltsAcademic2026Blueprint } from '../src/data/mocks/ielts-academic-2026.ts';
import { IELTS_EDITORIAL_STATUS_2026 } from '../src/data/mocks/ielts-editorial-status.ts';
import { analyzeAudioTiming } from './lib/ielts-audio-timing.mjs';

const SETS = Array.from({ length: 20 }, (_, index) => index + 1);
const REPORT_AS_OF = '2026-08-28';
const REPORT_PATH = path.join(process.cwd(), 'docs', 'ielts-academic-2026-inventory-sets1-20.json');
const REVIEW_DECISIONS = {
  4: {
    state: 'content-golden-historical-audio-replacement-required',
    provenance: 'audited-original-welearn',
    listening: 'preserve-content-and-owner-acceptance-history; expand-script; replace-audio-last',
    reading: 'preserve-as-reference',
    writing: 'preserve-as-reference',
    speaking: 'preserve-as-reference',
    reason: 'The published master remains historically owner-accepted, but its 141.545-second silent tail fails the calibrated timing gate.',
  },
  5: {
    state: 'content-golden-audio-candidate-rejected-timing',
    provenance: 'audited-original-welearn',
    listening: 'preserve-content; expand-script; reassemble-only-after-timing-gate',
    reading: 'preserve-and-freeze-after-golden-audit',
    writing: 'preserve-and-freeze-after-golden-audit',
    speaking: 'preserve-and-freeze-after-golden-audit',
    reason: 'Set 5 passed technical and ASR checks, but its 242.318-second silent tail fails the calibrated timing gate and it is not publishable.',
  },
};

function decisionFor(setNumber) {
  if (REVIEW_DECISIONS[setNumber]) return {
    ...REVIEW_DECISIONS[setNumber],
    provenance: IELTS_EDITORIAL_STATUS_2026[setNumber].provenance,
  };
  if (setNumber <= 12) {
    return {
      state: 'reuse-content-replace-legacy-audio',
      provenance: IELTS_EDITORIAL_STATUS_2026[setNumber].provenance,
      listening: 'preserve-and-audit-script; replace-audio-last',
      reading: 'preserve-and-verify-against-golden',
      writing: 'preserve-and-verify-against-golden',
      speaking: 'preserve-and-verify-against-golden',
      reason: 'The full authored exam is reusable; legacy Listening media remains outside the 2026 release gate.',
    };
  }
  return {
    state: 'reuse-content-generate-audio-last',
    provenance: IELTS_EDITORIAL_STATUS_2026[setNumber].provenance,
    listening: 'preserve-and-audit-script; generate-audio-last',
    reading: 'preserve-and-verify-against-golden',
    writing: 'preserve-and-verify-against-golden',
    speaking: 'preserve-and-verify-against-golden',
    reason: 'The full authored exam is reusable; no released Listening master exists.',
  };
}

function words(value = '') {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function responseCount(question) {
  return question.qRange ? question.qRange[1] - question.qRange[0] + 1 : 1;
}

function skillMetrics(mock, skill) {
  const sections = mock.sections.filter((section) => section.skill === skill);
  const questions = sections.flatMap((section) => section.questions);
  return {
    sections: sections.length,
    responses: questions.reduce((total, question) => total + responseCount(question), 0),
    sourceWords: sections.reduce(
      (total, section) => total + words(skill === 'listening' ? section.transcript : section.passage),
      0,
    ),
    questionTypes: [...new Set(questions.map((question) => question.type))].sort(),
  };
}

function structuralBlockers(mock) {
  const listening = skillMetrics(mock, 'listening');
  const reading = skillMetrics(mock, 'reading');
  const writing = mock.sections
    .filter((section) => section.skill === 'writing')
    .flatMap((section) => section.questions)
    .filter((question) => question.type === 'write');
  const speakingParts = new Set(
    mock.sections
      .filter((section) => section.skill === 'speaking')
      .flatMap((section) => section.questions)
      .filter((question) => question.type === 'speak')
      .map((question) => question.partNumber),
  );
  const blockers = [];
  if (listening.sections !== 4 || listening.responses !== 40) blockers.push('Listening structure is not 4 parts / 40 responses.');
  if (reading.sections !== 3 || reading.responses !== 40) blockers.push('Reading structure is not 3 passages / 40 responses.');
  if (writing.length !== 2 || !writing.some((item) => item.taskNumber === 1) || !writing.some((item) => item.taskNumber === 2)) {
    blockers.push('Writing does not contain exactly Task 1 and Task 2.');
  }
  if (![1, 2, 3].every((part) => speakingParts.has(part))) blockers.push('Speaking does not cover Parts 1–3.');
  return blockers;
}

const catalogSource = readFileSync(path.join(process.cwd(), 'src', 'data', 'exams.ts'), 'utf8');
const inventory = [];

for (const setNumber of SETS) {
  const { default: authoredMock } = await import(`../src/data/mocks/ielts-set-${setNumber}.ts`);
  const releaseMock = withIeltsAcademic2026Blueprint(authoredMock);
  const authoredListening = skillMetrics(authoredMock, 'listening');
  const authoredReading = skillMetrics(authoredMock, 'reading');
  const releaseListening = skillMetrics(releaseMock, 'listening');
  const releaseReading = skillMetrics(releaseMock, 'reading');
  const writingQuestions = authoredMock.sections
    .filter((section) => section.skill === 'writing')
    .flatMap((section) => section.questions)
    .filter((question) => question.type === 'write');
  const speakingQuestions = authoredMock.sections
    .filter((section) => section.skill === 'speaking')
    .flatMap((section) => section.questions)
    .filter((question) => question.type === 'speak');
  const audioUrls = [...new Set(
    authoredMock.sections
      .filter((section) => section.skill === 'listening')
      .map((section) => section.audioUrl)
      .filter(Boolean),
  )];
  const audioFileExists = audioUrls.length === 1 && existsSync(path.join(process.cwd(), 'public', audioUrls[0]));
  const audioTiming = audioFileExists
    ? analyzeAudioTiming(path.join(process.cwd(), 'public', audioUrls[0]))
    : null;
  const audioDuration = audioTiming?.durationSeconds ?? null;
  const durationPasses = audioTiming?.status === 'passed';
  const decision = decisionFor(setNumber);
  const editorialStatus = IELTS_EDITORIAL_STATUS_2026[setNumber];
  const blockers = structuralBlockers(authoredMock);
  if (!editorialStatus.contentCertified) blockers.push(`Editorial certification: ${editorialStatus.certification}.`);
  if (!durationPasses) blockers.push(audioFileExists
    ? `Listening audio fails timing fidelity: ${audioTiming.failedChecks.join(', ')}.`
    : 'Listening audio is missing.');

  inventory.push({
    set: setNumber,
    title: authoredMock.title,
    catalogUnlocked: new RegExp(`\\{ id: 'set-${setNumber}',[^\\n]+free: true`).test(catalogSource),
    releaseGate2026Coverage: true,
    authored: {
      listening: authoredListening,
      reading: authoredReading,
      writingTasks: writingQuestions.map((item) => ({ task: item.taskNumber, minWords: item.minWords, hasVisual: Boolean(item.imageUrl) })),
      speakingParts: [...new Set(speakingQuestions.map((item) => item.partNumber))].sort(),
    },
    releaseTransforms: {
      listeningWords: releaseListening.sourceWords,
      readingWords: releaseReading.sourceWords,
    },
    audio: {
      authoredUrls: audioUrls,
      fileExists: audioFileExists,
      durationMinutes: audioDuration == null ? null : Number((audioDuration / 60).toFixed(1)),
      durationGate: durationPasses ? 'pass' : audioFileExists ? 'replace-or-regenerate' : 'missing',
      timing: audioTiming ? {
        audibleSeconds: audioTiming.audibleSeconds,
        silenceRatio: audioTiming.silenceRatio,
        longestSilenceSeconds: audioTiming.longestSilenceSeconds,
        trailingSilenceSeconds: audioTiming.trailingSilenceSeconds,
        failedChecks: audioTiming.failedChecks,
      } : null,
    },
    reuseDecision: decision,
    editorialStatus,
    currentBlockers: blockers,
  });
}

const report = {
  schemaVersion: 1,
  reportAsOf: REPORT_AS_OF,
  scope: 'WeLearn IELTS Academic Sets 1–20',
  policy: {
    productClaim: 'Original WeLearn simulation aligned to the public IELTS Academic format; not official IELTS material.',
    reuseFirst: true,
    audioDeferredUntilScriptsFrozen: true,
    noKnownThirdPartyTextAllowed: true,
    referenceSet: null,
    historicalPublishedSet: 4,
    goldenCandidateSet: 5,
  },
  summary: {
    totalSets: inventory.length,
    catalogUnlocked: inventory.filter((item) => item.catalogUnlocked).length,
    coveredByExisting2026Gate: inventory.filter((item) => item.releaseGate2026Coverage).length,
    audioDurationGatePass: inventory.filter((item) => item.audio.durationGate === 'pass').length,
    setsWithKnownOrPendingProvenanceReview: inventory.filter((item) => !item.editorialStatus.contentCertified).map((item) => item.set),
    setsWithBlockers: inventory.filter((item) => item.currentBlockers.length > 0).map((item) => item.set),
  },
  inventory,
};

if (process.argv.includes('--write')) {
  writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Wrote ${path.relative(process.cwd(), REPORT_PATH)}`);
}

console.table(inventory.map((item) => ({
  set: item.set,
  L: `${item.authored.listening.sections}/${item.authored.listening.responses}`,
  L_words: `${item.authored.listening.sourceWords}->${item.releaseTransforms.listeningWords}`,
  R: `${item.authored.reading.sections}/${item.authored.reading.responses}`,
  R_words: `${item.authored.reading.sourceWords}->${item.releaseTransforms.readingWords}`,
  audio_min: item.audio.durationMinutes,
  audio_gate: item.audio.durationGate,
  state: item.reuseDecision.state,
})));
console.log(JSON.stringify(report.summary, null, 2));

if (process.argv.includes('--strict') && report.summary.setsWithBlockers.length) process.exitCode = 1;
