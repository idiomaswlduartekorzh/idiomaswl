#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { expandIeltsListeningTranscript } from '../src/data/mocks/ielts-listening-expansions.ts';

const SETS = Array.from({ length: 20 }, (_, index) => index + 1);
const MIN_TRANSCRIPT_WORDS = 2200;
const MIN_TIMING_TRANSCRIPT_WORDS = 2800;
const PRICE_USD_PER_1000_CHARACTERS = 0.05;
const CREDITS_PER_CHARACTER = 0.5;
const args = new Set(process.argv.slice(2));
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const outputPath = path.join(repoRoot, 'docs', 'ielts-2026-audio-generation-plan-2026-08-28.json');

const accentRotation = ['british', 'north-american', 'australian', 'new-zealand'];
const prePilotAccents = new Map([[1, 'north-american'], [2, 'australian'], [3, 'new-zealand']]);
const femaleNames = new Set(['AMY', 'MAYA', 'MEG', 'PRIYA', 'SOPHIE']);
const maleNames = new Set(['BEN', 'JAMES', 'JOSH', 'LIAM', 'RYAN', 'SAM', 'TOM']);
const staffLabels = new Set(['AGENT', 'COORDINATOR', 'LIBRARIAN', 'OFFICER', 'ORGANISER', 'STAFF']);
const participantLabels = new Set(['CALLER', 'CUSTOMER', 'PARENT', 'STUDENT']);

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function words(value = '') {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function durationSeconds(filePath) {
  if (!existsSync(filePath)) return null;
  const result = spawnSync('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', filePath,
  ], { encoding: 'utf8' });
  if (result.status !== 0) return null;
  const value = Number(result.stdout.trim());
  return Number.isFinite(value) ? value : null;
}

function profileForLabel(label, accent, setNumber) {
  if (label === 'TUTOR') return `tutor:${accent}`;
  if (femaleNames.has(label)) return `student-woman:${accent}`;
  if (maleNames.has(label)) return `student-man:${accent}`;
  if (staffLabels.has(label)) return `service-staff:${accent}`;
  if (participantLabels.has(label)) return `participant-${setNumber % 2 ? 'woman' : 'man'}:${accent}`;
  return `speaker:${accent}`;
}

function sectionSegments(section, accent, setNumber) {
  const blocks = section.transcript.trim().split(/\n{2,}/).map(block => block.trim()).filter(Boolean);
  if (section.part === 2 || section.part === 4) {
    return blocks.map(text => ({
      profile: `${section.part === 2 ? 'guide' : 'lecturer'}:${accent}`,
      text,
    }));
  }
  return blocks.map((block) => {
    const match = block.match(/^([A-Z][A-Z -]{1,30}):\s*([\s\S]+)$/);
    assert.ok(match, `Set ${setNumber} Part ${section.part}: unlabeled dialogue block: ${block.slice(0, 80)}`);
    return { profile: profileForLabel(match[1], accent, setNumber), text: match[2].trim() };
  });
}

const PART_NAMES = ['One', 'Two', 'Three', 'Four'];

function packContentSegments(setNumber, segments) {
  if (setNumber !== 5) return segments;
  return segments.reduce((packed, segment) => {
    const previous = packed.at(-1);
    if (previous?.profile === segment.profile) {
      previous.text = `${previous.text}\n\n${segment.text}`;
    } else {
      packed.push({ ...segment });
    }
    return packed;
  }, []);
}

function plannedSegments(section, accent, setNumber) {
  const content = sectionSegments(section, accent, setNumber);
  const split = Math.max(1, Math.ceil(content.length / 2));
  const firstQuestion = (section.part - 1) * 10 + 1;
  const midpointQuestion = firstQuestion + 4;
  const finalQuestion = firstQuestion + 9;
  const partName = PART_NAMES[section.part - 1];
  const withPauses = segments => packContentSegments(setNumber, segments).map(segment => ({
    kind: 'content',
    ...segment,
    pauseAfterSeconds: 0.35,
  }));
  return [
    {
      kind: 'announcer', part: section.part, profile: 'announcer:british',
      text: `Part ${partName}. First, review Questions ${firstQuestion} to ${midpointQuestion}.`,
      pauseAfterSeconds: 30,
    },
    ...withPauses(content.slice(0, split)).map(segment => ({ ...segment, part: section.part })),
    {
      kind: 'announcer', part: section.part, profile: 'announcer:british',
      text: `Now review Questions ${midpointQuestion + 1} to ${finalQuestion} before the recording continues.`,
      pauseAfterSeconds: 30,
    },
    ...withPauses(content.slice(split)).map(segment => ({ ...segment, part: section.part })),
    {
      kind: 'announcer', part: section.part, profile: 'announcer:british',
      text: `Part ${partName} is complete. Check your answers.`,
      pauseAfterSeconds: section.part === 4 ? 0 : 20,
    },
  ];
}

const rows = [];
for (const setNumber of SETS) {
  const { default: mock } = await import(`../src/data/mocks/ielts-set-${setNumber}.ts`);
  const sections = mock.sections.filter(section => section.skill === 'listening').map(section => ({
    ...section,
    transcript: expandIeltsListeningTranscript(setNumber, section.part, section.transcript),
  }));
  assert.equal(sections.length, 4, `Set ${setNumber} must have four Listening parts`);
  const plannedUrls = new Set(sections.map(section => section.audioUrl).filter(Boolean));
  assert.equal(plannedUrls.size, 1, `Set ${setNumber} must reference one integral Listening file`);
  const plannedUrl = [...plannedUrls][0];
  const existingPath = path.join(repoRoot, 'public', plannedUrl);
  const accent = prePilotAccents.get(setNumber) ?? accentRotation[(setNumber - 4) % accentRotation.length];
  const segments = sections.flatMap(section => plannedSegments(section, accent, setNumber).map(segment => ({
    kind: segment.kind,
    part: segment.part,
    profile: segment.profile,
    characters: segment.text.length,
    words: words(segment.text),
    textSha256: sha256(segment.text),
    pauseAfterSeconds: segment.pauseAfterSeconds,
  })));
  const transcript = sections.map(section => section.transcript.trim()).join('\n\n');
  const transcriptWords = words(transcript);
  const sourceCharacters = segments.reduce((total, segment) => total + segment.characters, 0);
  const projectedCharactersAtGate = Math.max(
    sourceCharacters,
    Math.ceil(sourceCharacters * MIN_TIMING_TRANSCRIPT_WORDS / transcriptWords),
  );
  const existingDuration = durationSeconds(existingPath);
  rows.push({
    mediaId: `media:ielts:set-${setNumber}:listening-integral-v2`,
    setId: `set-${setNumber}`,
    plannedUrl,
    sourceRef: `src/data/mocks/ielts-set-${setNumber}.ts`,
    accentTarget: accent,
    transcriptWords,
    minimumTranscriptWords: MIN_TRANSCRIPT_WORDS,
    minimumAdditionalWords: Math.max(0, MIN_TRANSCRIPT_WORDS - transcriptWords),
    minimumTimingTranscriptWords: MIN_TIMING_TRANSCRIPT_WORDS,
    timingAdditionalWordsRequired: Math.max(0, MIN_TIMING_TRANSCRIPT_WORDS - transcriptWords),
    sourceCharacters,
    projectedCharactersAtGate,
    transcriptSha256: sha256(transcript),
    requestSegments: segments.length,
    profiles: [...new Set(segments.map(segment => segment.profile))].sort(),
    segments,
    existingFile: existsSync(existingPath),
    existingDurationSeconds: existingDuration ? Number(existingDuration.toFixed(3)) : null,
    releaseAction: existsSync(existingPath)
        ? 'replace-after-editorial-and-audio-qa'
        : 'generate-after-editorial-and-audio-qa',
  });
}

const sourceCharacters = rows.reduce((total, row) => total + row.sourceCharacters, 0);
const projectedCharactersAtGate = rows.reduce((total, row) => total + row.projectedCharactersAtGate, 0);
const manifestCore = {
  schemaVersion: 1,
  sourceAsOf: '2026-08-28',
  contentOrigin: 'original-welearn',
  scope: 'IELTS Academic Sets 1-20 integral Listening release plan',
  officialReference: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening',
  officialSampleReference: 'https://ielts.org/cdn/ielts-sample-tests/ielts-listening-sample-tasks-2023.pdf',
  editorialGate: {
    status: rows.every(row => row.transcriptWords >= MIN_TRANSCRIPT_WORDS) ? 'passed' : 'blocked',
    rationale: 'The 2,200-word threshold is a conservative WeLearn density gate derived from 44 response positions across eight official sample-task tapescripts; IELTS does not publish a transcript word minimum.',
    minimumTranscriptWordsPerSet: MIN_TRANSCRIPT_WORDS,
    targetIntegralDurationSeconds: [1740, 1800],
    playback: 'once',
  },
  timingFidelityGate: {
    status: rows.every(row => row.transcriptWords >= MIN_TIMING_TRANSCRIPT_WORDS) ? 'passed' : 'blocked',
    calibration: 'docs/ielts-listening-timing-reference-2026-08-28.json',
    rationale: 'The 2,800-word pre-synthesis floor is an internal fail-closed proxy derived from the public official computer sample and the measured ElevenLabs speech density of Sets 4–5. Final release still requires measured audio timing QA; IELTS does not publish a transcript word minimum.',
    minimumTranscriptWordsPerSet: MIN_TIMING_TRANSCRIPT_WORDS,
    targetIntegralDurationSeconds: [1740, 1800],
    minimumAudibleSeconds: 990,
    maximumSilenceRatio: 0.45,
    maximumSingleSilenceSeconds: 75,
    maximumTrailingSilenceSeconds: 5,
  },
  generation: {
    provider: 'ElevenLabs proposed; no provider call made',
    modelId: 'eleven_flash_v2_5 proposed',
    voiceApproval: 'pending-owner-approval-for-ielts',
    generationAuthorized: false,
    target: {
      sampleRateHz: 44100,
      channels: 1,
      bitrate: '64k',
      integratedLoudnessLufs: -18,
      maxTruePeakDbfs: -1.5,
    },
  },
  invoice: {
    priceUsdPer1000Characters: PRICE_USD_PER_1000_CHARACTERS,
    creditsPerCharacter: CREDITS_PER_CHARACTER,
    sourceCharacters,
    sourceEstimatedUsdBeforeTax: Number((sourceCharacters / 1000 * PRICE_USD_PER_1000_CHARACTERS).toFixed(4)),
    projectedMinimumCharactersAfterEditorialGate: projectedCharactersAtGate,
    projectedMinimumCreditsAfterEditorialGate: Math.ceil(projectedCharactersAtGate * CREDITS_PER_CHARACTER),
    projectedMinimumUsdBeforeTax: Number((projectedCharactersAtGate / 1000 * PRICE_USD_PER_1000_CHARACTERS).toFixed(4)),
    retryContingencyNotIncluded: true,
  },
  rows,
};

const manifest = {
  ...manifestCore,
  manifestSha256: sha256(JSON.stringify(manifestCore)),
};

if (args.has('--write')) {
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Wrote ${path.relative(repoRoot, outputPath)}`);
} else if (existsSync(outputPath)) {
  const checkedIn = JSON.parse(readFileSync(outputPath, 'utf8'));
  assert.deepEqual(checkedIn, manifest, `stale IELTS audio plan; run ${path.basename(process.argv[1])} --write`);
}

console.log(JSON.stringify({
  manifestSha256: manifest.manifestSha256,
  sets: rows.length,
  releaseReadyExisting: 0,
  existingToReplace: rows.filter(row => row.releaseAction === 'replace-after-editorial-and-audio-qa').length,
  missingToGenerate: rows.filter(row => !row.existingFile).length,
  sourceWords: rows.reduce((total, row) => total + row.transcriptWords, 0),
  additionalWordsRequired: rows.reduce((total, row) => total + row.minimumAdditionalWords, 0),
  timingAdditionalWordsRequired: rows.reduce((total, row) => total + row.timingAdditionalWordsRequired, 0),
  projectedMinimumCharactersAfterEditorialGate: projectedCharactersAtGate,
  projectedMinimumUsdBeforeTax: manifest.invoice.projectedMinimumUsdBeforeTax,
  generationAuthorized: false,
}, null, 2));
