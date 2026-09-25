import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ICFES_DIAGNOSTIC_QUESTIONS } from '../src/data/icfes-diagnostic-questions.ts';
import cambridgeB2Set1 from '../src/data/mocks/cambridge-b2-set-1.ts';
import * as cambridgeB2Expansion from '../src/data/mocks/cambridge-b2-original-sets.ts';
import { TOEFL_READING_SET1 } from '../src/data/toefl/reading-set-1.ts';
import { TOEFL_READING_SETS_2_TO_5 } from '../src/data/toefl/reading-sets-2-5.ts';
import { TOEFL_READING_SETS_6_TO_10 } from '../src/data/toefl/reading-sets-6-10.ts';
import { TOEFL_READING_SETS_11_TO_15 } from '../src/data/toefl/reading-sets-11-15.ts';
import { TOEFL_READING_SETS_16_TO_20 } from '../src/data/toefl/reading-sets-16-20.ts';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outputPath = join(root, 'config/diagnostic/objective-candidate-inventory.json');
const writeMode = process.argv.includes('--write');

function sha256(value) {
  return createHash('sha256').update(typeof value === 'string' ? value : JSON.stringify(value)).digest('hex');
}

function sourceFingerprint(value) {
  return sha256(value);
}

function candidateBase({
  id,
  family,
  path,
  examId,
  section,
  questionId,
  interactionId,
  skill,
  subdomain,
  levelRange,
  source,
  scoringKey,
  reasons,
  stimulus = null,
}) {
  return {
    id,
    source: {
      family,
      path,
      examId,
      section,
      questionId,
      interactionId,
      contentSha256: sourceFingerprint(source),
    },
    target: {
      language: 'en',
      skill,
      subdomain,
      levelRange,
      levelEvidence: 'source-tag-only-not-calibrated',
    },
    exposure: {
      content: 'public-practice',
      scoringKey,
    },
    disposition: {
      status: 'rewrite-required',
      reusable: 'construct-and-format-only',
      linguisticReview: 'pending',
      psychometricCalibration: 'absent',
      reasons: [
        'PUBLIC_CONTENT_CANNOT_ENTER_RESERVED_BANK_UNCHANGED',
        'NO_DIAGNOSTIC_ITEM_CALIBRATION',
        ...reasons,
      ],
    },
    stimulus,
  };
}

const ICFES_LEVELS = {
  1: ['A1', 'A1'],
  2: ['A1', 'A2'],
  3: ['A2', 'B1'],
  4: ['B1', 'B2'],
  5: ['B2', 'C1'],
};

const ICFES_SKILLS = {
  vocabulary_basic: ['vocabulary', 'basic-lexis'],
  vocabulary_context: ['vocabulary', 'lexis-in-context'],
  grammar_recognition: ['grammar', 'form-recognition'],
  connectors: ['grammar', 'cohesive-devices'],
  reference_words: ['reading', 'reference-resolution'],
  main_idea: ['reading', 'main-idea'],
  detail: ['reading', 'explicit-detail'],
  inference: ['reading', 'inference'],
  paraphrase: ['reading', 'paraphrase'],
  purpose: ['reading', 'communicative-purpose'],
};

function icfesCandidates() {
  return ICFES_DIAGNOSTIC_QUESTIONS.map((question) => {
    const [skill, subdomain] = ICFES_SKILLS[question.skill] ?? ['reading', question.skill];
    return candidateBase({
      id: `candidate:icfes-diagnostic:${question.id}`,
      family: 'icfes-diagnostic',
      path: 'src/data/icfes-diagnostic-questions.ts',
      examId: 'icfes-static-diagnostic',
      section: question.skill,
      questionId: question.id,
      interactionId: question.id,
      skill,
      subdomain,
      levelRange: ICFES_LEVELS[question.difficulty] ?? ['A1', 'C2'],
      source: question,
      scoringKey: 'inline-public',
      reasons: [
        'SOURCE_DIFFICULTY_IS_ORDINAL_NOT_CEFR',
        'SOURCE_KEY_AND_RATIONALE_SHIPPED_TO_CLIENT',
      ],
      stimulus: question.passage
        ? { kind: 'text', sharedStimulusId: `icfes:${question.id}`, contentSha256: sha256(question.passage) }
        : { kind: 'sentence', sharedStimulusId: null, contentSha256: sha256(question.question_text) },
    });
  });
}

function toeflSourcePath(setNumber) {
  if (setNumber === 1) return 'src/data/toefl/reading-set-1.ts';
  if (setNumber <= 5) return 'src/data/toefl/reading-sets-2-5.ts';
  if (setNumber <= 10) return 'src/data/toefl/reading-sets-6-10.ts';
  if (setNumber <= 15) return 'src/data/toefl/reading-sets-11-15.ts';
  return 'src/data/toefl/reading-sets-16-20.ts';
}

function toeflCandidates() {
  const candidates = [];
  for (const block of TOEFL_READING_SET1.blocks) {
    for (const item of block.items) {
      candidates.push(candidateBase({
        id: `candidate:toefl-reading:${item.id}`,
        family: 'toefl-reading-2026',
        path: toeflSourcePath(1),
        examId: TOEFL_READING_SET1.objectId,
        section: block.scope,
        questionId: item.id,
        interactionId: item.id,
        skill: 'reading',
        subdomain: block.scope === 'academic' ? 'academic-comprehension' : 'daily-life-comprehension',
        levelRange: block.scope === 'academic' ? ['B2', 'C1'] : ['B1', 'B2'],
        source: { block, item },
        scoringKey: 'server-only',
        reasons: ['SOURCE_STEM_AND_OPTIONS_ARE_ALREADY_PUBLIC'],
        stimulus: { kind: 'text', sharedStimulusId: block.id, contentSha256: sha256(block.text) },
      }));
    }
  }

  const expansions = [
    ...TOEFL_READING_SETS_2_TO_5,
    ...TOEFL_READING_SETS_6_TO_10,
    ...TOEFL_READING_SETS_11_TO_15,
    ...TOEFL_READING_SETS_16_TO_20,
  ];
  for (const object of expansions) {
    const setNumber = Number(object.id.match(/set(\d+)/)?.[1]);
    for (const item of object.academic.items) {
      candidates.push(candidateBase({
        id: `candidate:toefl-reading:${item.id}`,
        family: 'toefl-reading-2026',
        path: toeflSourcePath(setNumber),
        examId: object.objectId,
        section: 'academic',
        questionId: item.id,
        interactionId: item.id,
        skill: 'reading',
        subdomain: 'academic-comprehension',
        levelRange: ['B2', 'C1'],
        source: { objectId: object.objectId, passage: object.academic.text, item },
        scoringKey: 'server-only',
        reasons: ['SOURCE_STEM_AND_OPTIONS_ARE_ALREADY_PUBLIC'],
        stimulus: {
          kind: 'text',
          sharedStimulusId: object.academic.id,
          contentSha256: sha256(object.academic.text),
        },
      }));
    }
  }
  return candidates;
}

function audioMetadata(audioUrl) {
  const relativePath = audioUrl.replace(/^\//, '');
  const absolutePath = join(root, 'public', relativePath.replace(/^audio\//, 'audio/'));
  if (!existsSync(absolutePath)) {
    return { url: audioUrl, exists: false, bytes: 0, sha256: null, durationSeconds: null, requiresSegmentation: true };
  }
  const output = execFileSync('/usr/bin/afinfo', [absolutePath], { encoding: 'utf8' });
  const duration = output.match(/estimated duration:\s+([0-9.]+) sec/);
  if (!duration) throw new Error(`Cannot read duration for ${audioUrl}`);
  const buffer = readFileSync(absolutePath);
  return {
    url: audioUrl,
    exists: true,
    bytes: statSync(absolutePath).size,
    sha256: sha256(buffer),
    durationSeconds: Number(Number(duration[1]).toFixed(3)),
    requiresSegmentation: true,
  };
}

function cambridgeConstruct(part, sectionTitle) {
  if (sectionTitle.startsWith('Listening')) {
    if (sectionTitle.includes('Sentence Completion')) return ['listening', 'explicit-detail-short-answer'];
    if (sectionTitle.includes('Multiple Matching')) return ['listening', 'speaker-purpose-and-attitude'];
    if (sectionTitle.includes('long extract')) return ['listening', 'extended-comprehension'];
    return ['listening', 'short-extract-comprehension'];
  }
  const byPart = {
    1: ['vocabulary', 'collocation-and-lexical-choice'],
    2: ['grammar', 'open-cloze-function-words'],
    3: ['vocabulary', 'word-formation'],
    4: ['grammar', 'sentence-transformation'],
    5: ['reading', 'multiple-choice-comprehension'],
    6: ['reading', 'cohesion-and-text-structure'],
    7: ['reading', 'multiple-matching'],
  };
  return byPart[part] ?? [null, null];
}

function interactionRows(question) {
  if (question.type === 'formgroup') {
    return question.blanks.map((blank) => ({ id: `${question.id}:blank-${blank.num}`, source: { question, blank } }));
  }
  if (question.type === 'matching') {
    return question.items.map((item) => ({ id: `${question.id}:item-${item.num}`, source: { question, item } }));
  }
  if (question.type === 'mcq' || question.type === 'dialog') {
    return [{ id: question.id, source: question }];
  }
  return [];
}

function cambridgeCandidates() {
  const expansionSets = Object.values(cambridgeB2Expansion).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
  const mocks = [cambridgeB2Set1, ...expansionSets];
  const candidates = [];
  const audioCache = new Map();

  for (const mock of mocks) {
    const sourcePath = mock.id === 'set-1'
      ? 'src/data/mocks/cambridge-b2-set-1.ts'
      : 'src/data/mocks/cambridge-b2-original-sets.ts';
    for (const section of mock.sections) {
      const [skill, subdomain] = cambridgeConstruct(section.part, section.title);
      if (!skill) continue;
      const audio = section.audioUrl
        ? (audioCache.get(section.audioUrl) ?? audioCache.set(section.audioUrl, audioMetadata(section.audioUrl)).get(section.audioUrl))
        : null;
      for (const question of section.questions) {
        for (const interaction of interactionRows(question)) {
          const reasons = ['SOURCE_KEY_SHIPPED_WITH_PUBLIC_PRACTICE_PAYLOAD'];
          if (skill === 'listening') {
            reasons.push('WHOLE_SECTION_AUDIO_REQUIRES_ITEM_LEVEL_TIMECODES');
            if (!audio?.exists) reasons.push('AUDIO_FILE_MISSING');
          }
          candidates.push(candidateBase({
            id: `candidate:cambridge-b2:${mock.id}:${interaction.id}`,
            family: 'cambridge-b2-practice',
            path: sourcePath,
            examId: mock.id,
            section: section.title,
            questionId: question.id,
            interactionId: interaction.id,
            skill,
            subdomain,
            levelRange: ['B2', 'B2'],
            source: { sectionTitle: section.title, passage: section.passage, interaction: interaction.source },
            scoringKey: 'inline-public',
            reasons,
            stimulus: skill === 'listening'
              ? { kind: 'audio', sharedStimulusId: `${mock.id}:${section.title}`, audio }
              : section.passage
                ? { kind: 'text', sharedStimulusId: `${mock.id}:part-${section.part}`, contentSha256: sha256(section.passage) }
                : { kind: 'sentence', sharedStimulusId: null, contentSha256: sourceFingerprint(interaction.source) },
          }));
        }
      }
    }
  }
  return candidates;
}

function countBy(items, select) {
  return Object.fromEntries(
    [...items.reduce((map, item) => {
      const key = select(item);
      map.set(key, (map.get(key) ?? 0) + 1);
      return map;
    }, new Map())].sort(([a], [b]) => a.localeCompare(b)),
  );
}

const candidates = [...icfesCandidates(), ...toeflCandidates(), ...cambridgeCandidates()]
  .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
const uniqueAudio = new Map(
  candidates
    .filter((item) => item.stimulus?.kind === 'audio')
    .map((item) => [item.stimulus.audio.url, item.stimulus.audio]),
);
const inventory = {
  inventoryVersion: 'diagnostic-objective-candidates-v1',
  snapshotDate: '2026-09-24',
  purpose: 'Source audit only. No record in this file is approved for the reserved adaptive bank.',
  policy: {
    operationalUseAllowed: false,
    publicPracticeReuse: 'construct-and-format-only',
    requiredBeforePromotion: [
      'author-new-reserved-content',
      'independent-linguistic-review',
      'server-only-scoring-key',
      'pilot-and-item-calibration',
      'audio-segmentation-and-human-listening-review-when-applicable',
    ],
  },
  summary: {
    candidates: candidates.length,
    bySourceFamily: countBy(candidates, (item) => item.source.family),
    bySkill: countBy(candidates, (item) => item.target.skill),
    byLevelRange: countBy(candidates, (item) => item.target.levelRange.join('-')),
    byScoringKeyExposure: countBy(candidates, (item) => item.exposure.scoringKey),
    byDisposition: countBy(candidates, (item) => item.disposition.status),
    uniqueAudioFiles: uniqueAudio.size,
    availableAudioFiles: [...uniqueAudio.values()].filter((audio) => audio.exists).length,
    audioFilesRequiringSegmentation: [...uniqueAudio.values()].filter((audio) => audio.requiresSegmentation).length,
  },
  candidates,
};

const rendered = `${JSON.stringify(inventory, null, 2)}\n`;
if (writeMode) {
  writeFileSync(outputPath, rendered);
  process.stdout.write(`Wrote ${outputPath}\n`);
} else {
  if (!existsSync(outputPath)) throw new Error(`Missing ${outputPath}; run with --write`);
  if (readFileSync(outputPath, 'utf8') !== rendered) {
    throw new Error('Diagnostic objective candidate inventory is stale; regenerate it with --write');
  }
  process.stdout.write(`✓ Diagnostic candidate inventory current: ${inventory.summary.candidates} interactions, ${inventory.summary.uniqueAudioFiles} audio files\n`);
}

