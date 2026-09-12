#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { objectiveRows } from './lib/ielts-answer-key-audit.mjs';
import { ieltsAnswerUnits, whitespaceWords } from './lib/ielts-text-metrics.mjs';
import { auditScript, normalizedEvidenceText } from './lib/ielts-audio-production.mjs';
import { auditIeltsAcademicReview } from './lib/ielts-academic-review-evidence.mjs';
import { loadVerifiedIeltsAudioPublications } from './lib/ielts-audio-publication.mjs';
import { hydrateRegistry } from './lib/ielts-harness-core.mjs';
import { withIeltsListeningProductionTranscript } from '../src/data/mocks/ielts-listening-production.ts';
import { IELTS_REVIEW_BLUEPRINTS } from '../src/lib/ielts/review-blueprint.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...rest] = argument.replace(/^--/u, '').split('=');
  return [key, rest.length ? rest.join('=') : 'true'];
}));
for (const key of Object.keys(args)) assert.ok(['output', 'markdown', 'strict'].includes(key), `Unknown flag: ${key}`);

const readJson = relative => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
const exists = relative => fs.existsSync(path.join(root, relative));
const hash = value => createHash('sha256').update(value).digest('hex');
const normal = normalizedEvidenceText;
const expectedNumbers = Array.from({ length: 40 }, (_, index) => index + 1);
const policy = readJson('config/ielts-audio/production-policy.json');
const registry = hydrateRegistry(readJson('config/ielts-harness/evidence-registry.json'), root);
const writingReview = readJson('config/ielts-harness/writing-task1-visual-review.json');
const speakingReview = readJson('config/ielts-harness/speaking-semantic-review.json');
const verifiedAudioPublicationBySet = loadVerifiedIeltsAudioPublications(root).publicationBySet;
const legacyDecision = exists('config/ielts-audio/legacy-audio-audit-decision.json')
  ? readJson('config/ielts-audio/legacy-audio-audit-decision.json') : null;
const legacySemantic = exists('config/ielts-audio/legacy-audio-independent-review.json')
  ? readJson('config/ielts-audio/legacy-audio-independent-review.json') : null;
const approvedBatchReceipt = exists('config/ielts-audio/approved-batch-publish-receipt.json')
  ? readJson('config/ielts-audio/approved-batch-publish-receipt.json') : null;
const approvedBatchApproval = exists('config/ielts-audio/batch-quality-approval.json')
  ? readJson('config/ielts-audio/batch-quality-approval.json') : null;
const receiptCore = approvedBatchReceipt
  ? Object.fromEntries(Object.entries(approvedBatchReceipt).filter(([key]) => key !== 'receiptSha256')) : null;
const approvalCore = approvedBatchApproval
  ? Object.fromEntries(Object.entries(approvedBatchApproval).filter(([key]) => key !== 'approvalSha256')) : null;
const approvedBatchChainValid = Boolean(
  approvedBatchReceipt?.status === 'PUBLISHED'
  && approvedBatchReceipt.releaseAuthorized === true
  && approvedBatchReceipt.authorization?.kind === 'human'
  && hash(JSON.stringify(receiptCore)) === approvedBatchReceipt.receiptSha256
  && approvedBatchApproval?.status === 'APPROVED'
  && hash(JSON.stringify(approvalCore)) === approvedBatchApproval.approvalSha256
  && approvedBatchReceipt.qualityApprovalSha256 === approvedBatchApproval.approvalSha256
  && approvedBatchReceipt.productionManifestSha256 === approvedBatchApproval.productionManifestSha256
  && approvedBatchReceipt.repairManifestSha256 === approvedBatchApproval.repairManifestSha256
  && approvedBatchReceipt.castingSha256 === approvedBatchApproval.castingSha256
);
const approvedPublicationBySet = new Map((approvedBatchReceipt?.files ?? []).map(row => [row.set, row]));
const legacyReviewedSets = legacySemantic?.semanticReview?.ambiguousKeys === 0
  ? new Set([5, 6, 7, 8, 10, 11, 12]) : new Set();
const replacementSets = new Set(legacyDecision?.sets?.filter(row => row.recommendation === 'REPLACE').map(row => row.set) ?? []);

function imageMetadata(url) {
  const relative = url?.startsWith('/') ? `public${url}` : null;
  if (!relative || !exists(relative)) return { url: url ?? null, path: relative, exists: false, bytes: 0, dimensions: null };
  const bytes = fs.readFileSync(path.join(root, relative));
  let dimensions = null;
  if (url.endsWith('.svg')) {
    const source = bytes.toString('utf8');
    const box = source.match(/viewBox=["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)["']/iu);
    if (box) dimensions = { width: Number(box[1]), height: Number(box[2]) };
  } else if (bytes.length >= 24 && bytes.subarray(1, 4).toString() === 'PNG') {
    dimensions = { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  } else if (/\.jpe?g$/iu.test(url)) {
    for (let offset = 2; offset + 9 < bytes.length;) {
      if (bytes[offset] !== 0xff) break;
      const marker = bytes[offset + 1];
      const length = bytes.readUInt16BE(offset + 2);
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
        dimensions = { width: bytes.readUInt16BE(offset + 7), height: bytes.readUInt16BE(offset + 5) };
        break;
      }
      if (length < 2) break;
      offset += length + 2;
    }
  }
  return { url, path: relative, exists: true, bytes: bytes.length, dimensions, sha256: hash(bytes) };
}

function completionEvidence(rows, sections, skill) {
  const judgements = new Set(['true', 'false', 'yes', 'no', 'not given']);
  const relevant = rows.filter(row => row.skill === skill && row.kind === 'fill'
    && !row.accepted.every(answer => judgements.has(normal(answer))));
  let found = 0;
  const missing = [];
  for (const row of relevant) {
    const section = sections.find(candidate => candidate.questions.some(question => row.key === question.id || row.key.startsWith(`${question.id}__`)));
    const material = normal(skill === 'listening' ? section?.transcript : section?.passage);
    const supported = row.accepted.some(answer => {
      const needle = normal(answer);
      return needle && (` ${material} `).includes(` ${needle} `);
    });
    if (supported) found += 1;
    else missing.push({ question: row.number, key: row.key, accepted: row.accepted });
  }
  return { found, total: relevant.length, missing };
}

function groupContract(question, skill, issue) {
  const label = `${skill}:${question.id}`;
  if (question.type === 'formgroup') {
    const expected = Array.from({ length: question.qRange[1] - question.qRange[0] + 1 }, (_, index) => question.qRange[0] + index);
    const actual = question.blanks.map(blank => blank.num);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) issue('P0', 'GROUP_RANGE_DRIFT', `${label} qRange and blanks differ`);
    for (const blank of question.blanks) {
      const occurrences = [...question.template.matchAll(new RegExp(`\\{\\{${blank.num}\\}\\}`, 'gu'))].length;
      if (occurrences !== 1) issue('P0', 'ANSWER_FIELD_MARKER', `${label} Q${blank.num} has ${occurrences} visible markers`);
      if (!blank.answers?.length || blank.answers.some(answer => !String(answer).trim())) issue('P0', 'EMPTY_KEY', `${label} Q${blank.num}`);
      if (blank.maxWords && blank.answers.some(answer => ieltsAnswerUnits(answer) > blank.maxWords)) issue('P0', 'ANSWER_OVER_LIMIT', `${label} Q${blank.num}`);
    }
  }
  if (question.type === 'tablegroup') {
    const blanks = question.rows.flat().filter(cell => typeof cell !== 'string');
    const expected = Array.from({ length: question.qRange[1] - question.qRange[0] + 1 }, (_, index) => question.qRange[0] + index);
    if (JSON.stringify(blanks.map(blank => blank.num)) !== JSON.stringify(expected)) issue('P0', 'GROUP_RANGE_DRIFT', `${label} qRange and table cells differ`);
    for (const blank of blanks) {
      if (!blank.answers?.length || blank.answers.some(answer => !String(answer).trim())) issue('P0', 'EMPTY_KEY', `${label} Q${blank.num}`);
      if (blank.maxWords && blank.answers.some(answer => ieltsAnswerUnits(answer) > blank.maxWords)) issue('P0', 'ANSWER_OVER_LIMIT', `${label} Q${blank.num}`);
    }
  }
  if (question.type === 'matching') {
    const expected = Array.from({ length: question.qRange[1] - question.qRange[0] + 1 }, (_, index) => question.qRange[0] + index);
    if (JSON.stringify(question.items.map(item => item.num)) !== JSON.stringify(expected)) issue('P0', 'GROUP_RANGE_DRIFT', `${label} qRange and matching items differ`);
    const letters = new Set(question.endings.map(ending => ending.letter));
    if (question.items.some(item => !letters.has(item.answer))) issue('P0', 'OPTION_KEY_INVALID', `${label} references a missing ending`);
  }
  if (question.type === 'multiselect') {
    const width = question.qRange[1] - question.qRange[0] + 1;
    const letters = question.options.map(option => option.letter);
    if (width !== question.selectCount || question.answers.length !== question.selectCount) issue('P0', 'MULTI_WEIGHT_DRIFT', label);
    if (new Set(letters).size !== letters.length || new Set(question.answers).size !== question.answers.length
      || question.answers.some(answer => !letters.includes(answer))) issue('P0', 'OPTION_KEY_INVALID', label);
  }
  if (['mcq', 'dialog'].includes(question.type)) {
    if (!Number.isInteger(question.answer) || !question.options[question.answer]) issue('P0', 'OPTION_KEY_INVALID', label);
    if (question.options.length < 3 || new Set(question.options.map(option => normal(option))).size !== question.options.length) issue('P0', 'OPTION_SET_INVALID', label);
  }
}

async function productionListening(authored, setNumber) {
  if ([5, 6].includes(setNumber) && exists('src/data/mocks/ielts-listening-legacy-expansions-5-6.ts')) {
    const { expandIeltsListeningLegacyTranscript } = await import('../src/data/mocks/ielts-listening-legacy-expansions-5-6.ts');
    return { variant: 'legacy-replacement-5-6', sections: authored.sections.filter(section => section.skill === 'listening')
      .map(section => ({ ...section, transcript: expandIeltsListeningLegacyTranscript(setNumber, section.part, section.transcript) })) };
  }
  if ([7, 8].includes(setNumber) && exists('src/data/mocks/ielts-listening-legacy-expansions-7-8.ts')) {
    const { ieltsListeningLegacyExpansion } = await import('../src/data/mocks/ielts-listening-legacy-expansions-7-8.ts');
    return { variant: 'legacy-replacement-7-8', sections: authored.sections.filter(section => section.skill === 'listening')
      .map(section => ({ ...section, transcript: ieltsListeningLegacyExpansion(setNumber, section.part) })) };
  }
  if ([10, 11, 12].includes(setNumber) && exists('src/data/mocks/ielts-listening-legacy-expansions-10-12.ts')) {
    const { expandIeltsLegacyTranscriptForSets10To12 } = await import('../src/data/mocks/ielts-listening-legacy-expansions-10-12.ts');
    return { variant: 'legacy-replacement-10-12', sections: authored.sections.filter(section => section.skill === 'listening')
      .map(section => ({ ...section, transcript: expandIeltsLegacyTranscriptForSets10To12(setNumber, section.part, section.transcript) })) };
  }
  const planned = withIeltsListeningProductionTranscript(authored);
  const changed = planned !== authored;
  return { variant: changed ? 'production-expansion' : 'authored-reference', sections: planned.sections.filter(section => section.skill === 'listening') };
}

const sets = [];
for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
  const source = `src/data/mocks/ielts-set-${setNumber}.ts`;
  const authored = (await import(`../${source}`)).default;
  const bySkill = skill => authored.sections.filter(section => section.skill === skill);
  const listening = bySkill('listening');
  const reading = bySkill('reading');
  const writing = bySkill('writing').flatMap(section => section.questions).filter(question => question.type === 'write');
  const speaking = bySkill('speaking').flatMap(section => section.questions).filter(question => question.type === 'speak');
  const record = registry.sets.find(candidate => candidate.set === setNumber) ?? {};
  const issues = [];
  const issue = (priority, code, detail, file = source) => issues.push({ priority, code, detail, file });

  let rows = [];
  try { rows = objectiveRows(authored); }
  catch (error) { issue('P0', 'OBJECTIVE_EXTRACTION_FAILED', error.message); }
  const skillRows = skill => rows.filter(row => row.skill === skill);
  const numbers = skill => skillRows(skill).flatMap(row => Array.from({ length: row.weight }, (_, index) => row.number + index));
  for (const skill of ['listening', 'reading']) {
    if (JSON.stringify(numbers(skill)) !== JSON.stringify(expectedNumbers)) issue('P0', 'QUESTION_NUMBERING', `${skill} is not Q1-Q40 exactly once`);
    const keys = skillRows(skill).map(row => row.key);
    if (new Set(keys).size !== keys.length) issue('P0', 'ANSWER_FIELD_COLLISION', `${skill} contains repeated response keys`);
  }
  const ids = authored.sections.flatMap(section => section.questions.map(question => question.id));
  if (new Set(ids).size !== ids.length) issue('P0', 'QUESTION_ID_COLLISION', 'Question IDs are not unique within the set');
  for (const section of [...listening, ...reading]) for (const question of section.questions) groupContract(question, section.skill, issue);

  if (listening.length !== 4 || JSON.stringify(listening.map(section => section.part)) !== JSON.stringify([1, 2, 3, 4])) issue('P0', 'LISTENING_PARTS', 'Expected four ordered Listening parts');
  if (reading.length !== 3 || JSON.stringify(reading.map(section => section.part)) !== JSON.stringify([5, 6, 7])) issue('P0', 'READING_PARTS', 'Expected three ordered Reading passages in sections 5-7');
  if (writing.length !== 2 || JSON.stringify(writing.map(question => question.taskNumber).sort()) !== JSON.stringify([1, 2])) issue('P0', 'WRITING_TASKS', 'Expected Writing Tasks 1 and 2');
  const speakingParts = [...new Set(speaking.map(question => question.partNumber))].sort();
  if (JSON.stringify(speakingParts) !== JSON.stringify([1, 2, 3])) issue('P0', 'SPEAKING_PARTS', 'Expected Speaking Parts 1, 2 and 3');
  if (speaking.length !== 3) issue('P2', 'SPEAKING_SERIALIZATION_DRIFT', `Set 1 contract has 3 SpeakQuestion rows; found ${speaking.length}`);

  const task1 = writing.find(question => question.taskNumber === 1);
  const task2 = writing.find(question => question.taskNumber === 2);
  if (task1?.minWords !== 150 || task2?.minWords !== 250) issue('P0', 'WRITING_WORD_LIMIT', 'Expected Task 1 minimum 150 and Task 2 minimum 250');
  if (!task1?.text?.trim() || !(task1?.stimulus?.trim() || task1?.stimulusLabel?.trim())) issue('P0', 'WRITING_TASK1_PROMPT', 'Task 1 instruction or visual description is empty');
  if (!task2?.text?.trim() || !task2?.stimulus?.trim()) issue('P0', 'WRITING_TASK2_PROMPT', 'Task 2 instruction or prompt is empty');
  if (!speaking.find(question => question.partNumber === 2)?.cueCard?.trim()) issue('P0', 'SPEAKING_CUE_CARD', 'Speaking Part 2 cue card is empty');

  const writingImage = imageMetadata(task1?.imageUrl);
  if (!writingImage.exists || !writingImage.bytes || !writingImage.dimensions) issue('P0', 'WRITING_ASSET_MISSING', task1?.imageUrl ?? 'Task 1 image URL absent');
  if (!task1?.imageAlt?.trim()) issue('P1', 'WRITING_IMAGE_ALT', 'Task 1 imageAlt is empty');
  const questionImages = [...new Set([...listening, ...reading].flatMap(section => section.questions.flatMap(question => [question.imageUrl, ...(question.imageUrls ?? [])].filter(Boolean))))].map(imageMetadata);
  for (const image of questionImages) if (!image.exists || !image.bytes || !image.dimensions) issue('P0', 'QUESTION_ASSET_MISSING', image.url);

  const audioUrls = [...new Set(listening.map(section => section.audioUrl).filter(Boolean))];
  const audio = audioUrls.map(url => {
    const relative = `public${url}`;
    const present = exists(relative);
    const bytes = present ? fs.readFileSync(path.join(root, relative)) : null;
    return { url, path: relative, exists: present, bytes: bytes?.length ?? 0, sha256: bytes ? hash(bytes) : null };
  });
  if (audioUrls.length !== 1) issue('P0', 'AUDIO_URL_CONTRACT', `Expected one shared Listening master; found ${audioUrls.length}`);
  if (audio.some(item => !item.exists || !item.bytes)) issue('P0', 'AUDIO_MISSING', audio.find(item => !item.exists)?.path ?? 'Listening audio URL absent');
  const published = verifiedAudioPublicationBySet.get(setNumber);
  const publishedHashVerified = Boolean(
    published?.status === 'PUBLISHED_HASH_VERIFIED'
    && published.audioUrl === audio[0]?.url
    && published.audioSha256 === audio[0]?.sha256
  );
  if (published && !publishedHashVerified) issue('P0', 'AUDIO_PUBLICATION_RECEIPT_MISMATCH', 'The public MP3 or approval chain differs from its publication receipt', 'config/ielts-audio/approved-batch-publish-receipt.json');
  else if (!publishedHashVerified && record.knownAudioStatus === 'CONFIRMED_MISMATCH') issue('P0', 'AUDIO_CONFIRMED_MISMATCH', 'The public MP3 does not correspond to the displayed questions', 'config/ielts-harness/evidence-registry.json');
  else if (!publishedHashVerified && replacementSets.has(setNumber)) issue('P1', 'AUDIO_REPLACEMENT_REQUIRED', 'Independent legacy audit rejects the current master', 'config/ielts-audio/legacy-audio-audit-decision.json');
  else if (!publishedHashVerified && record.knownAudioStatus === 'SAMPLE_MATCH_ONLY') issue('P1', 'AUDIO_FULL_REVIEW_PENDING', 'Only sample-level correspondence is registered', 'config/ielts-harness/evidence-registry.json');

  const readingWords = reading.map(section => whitespaceWords(section.passage));
  const readingTotal = readingWords.reduce((sum, value) => sum + value, 0);
  if (readingTotal < 2150 || readingTotal > 2750) issue('P1', 'READING_LENGTH', `${readingTotal} words; expected 2150-2750`);
  const authoredListeningWords = listening.map(section => whitespaceWords(section.transcript));
  const production = await productionListening(authored, setNumber);
  const productionMock = { ...authored, sections: authored.sections.map(section => {
    const replacement = production.sections.find(candidate => candidate.skill === 'listening' && candidate.part === section.part);
    return section.skill === 'listening' && replacement ? replacement : section;
  }) };
  const scriptAudit = auditScript(productionMock, production.sections, policy);
  if (!publishedHashVerified && (['CONFIRMED_MISMATCH', 'MISSING'].includes(record.knownAudioStatus) || replacementSets.has(setNumber))) {
    if (scriptAudit.status !== 'PASS') issue('P1', 'PRODUCTION_SCRIPT_LENGTH_OR_ORDER', scriptAudit.failures.join('; '));
  }

  const completion = {
    listening: completionEvidence(rows, production.sections, 'listening'),
    reading: completionEvidence(rows, reading, 'reading'),
  };
  if (completion.listening.missing.length && !exists(`config/ielts-harness/academic-reviews/set-${setNumber}-objective-review.json`)) issue('P0', 'LISTENING_COMPLETION_UNSUPPORTED', `Missing literal evidence for Q${completion.listening.missing.map(row => row.question).join(', Q')}`);
  if (completion.reading.missing.length) issue('P0', 'READING_COMPLETION_UNSUPPORTED', `Missing literal evidence for Q${completion.reading.missing.map(row => row.question).join(', Q')}`);

  const blueprint = IELTS_REVIEW_BLUEPRINTS[authored.id];
  if (!blueprint) issue('P0', 'ANSWER_SHEET_BLUEPRINT_MISSING', authored.id, 'src/lib/ielts/review-blueprint.ts');
  let independentKey = record.objectiveKey?.status === 'APPROVED'
    ? { status: 'APPROVED', reviewerKind: record.objectiveKey.reviewerKind ?? 'human', evidencePath: record.objectiveKey.evidencePath }
    : null;
  const academicReviewPath = `config/ielts-harness/academic-reviews/set-${setNumber}-objective-review.json`;
  if (setNumber > 1 && exists(academicReviewPath)) {
    try {
      const academicReview = readJson(academicReviewPath);
      auditIeltsAcademicReview(productionMock, academicReview);
      assert.equal(academicReview.contentVersionAtReview, blueprint?.contentVersion, `Set ${setNumber}: academic review version is stale`);
      independentKey = { status: 'APPROVED', reviewerKind: academicReview.reviewer.kind, evidencePath: academicReviewPath };
    } catch (error) {
      issue('P0', 'ANSWER_KEY_REVIEW_STALE', error.message, academicReviewPath);
    }
  }
  if (!independentKey) issue('P1', 'ANSWER_KEY_INDEPENDENT_REVIEW_PENDING', 'Internal consistency passes, but no independently pinned key is registered', 'config/ielts-harness/evidence-registry.json');
  const semanticStatus = independentKey ? 'independently-reviewed' : 'manual-review-pending';
  const writingPromptWords = writing.map(question => whitespaceWords([question.stimulusLabel, question.stimulus, question.text].filter(Boolean).join(' ')));
  const speakingPromptWords = speaking.map(question => whitespaceWords([
    question.text,
    question.cueCard,
    ...(question.followUp ?? []),
  ].filter(Boolean).join(' ')));
  const writingReviewRow = writingReview.sets.find(row => row.set === setNumber);
  const task1PromptSha256 = hash(JSON.stringify({
    stimulusLabel: task1?.stimulusLabel ?? '', stimulus: task1?.stimulus ?? '',
    text: task1?.text ?? '', imageAlt: task1?.imageAlt ?? '',
  }));
  const task2PromptSha256 = hash(JSON.stringify({
    stimulusLabel: task2?.stimulusLabel ?? '', stimulus: task2?.stimulus ?? '', text: task2?.text ?? '',
  }));
  const writingSemanticApproved = Boolean(
    writingReviewRow?.semanticStatus === 'APPROVED'
    && writingReviewRow.promptSha256 === task1PromptSha256
    && writingReviewRow.assetSha256 === writingImage.sha256
    && writingReviewRow.task2?.semanticStatus === 'APPROVED'
    && writingReviewRow.task2?.promptSha256 === task2PromptSha256
    && Object.values(writingReviewRow.task1Checks ?? {}).every(Boolean)
    && Object.values(writingReviewRow.task2?.checks ?? {}).every(Boolean)
  );
  if (!writingSemanticApproved) issue('P0', 'WRITING_SEMANTIC_REVIEW_STALE', 'Task prompt, visual or semantic evidence changed after review', 'config/ielts-harness/writing-task1-visual-review.json');
  const writingTask1Contract = {
    promptSha256: hash([task1?.stimulusLabel, task1?.stimulus, task1?.text].filter(Boolean).join('\n')),
    assetSha256: writingImage.sha256 ?? null,
    assetDimensions: writingImage.dimensions,
    status: writingSemanticApproved ? 'SEMANTICALLY_APPROVED' : 'INCOMPLETE',
    semanticVisualApproval: writingSemanticApproved,
  };
  writingTask1Contract.contractSha256 = hash(JSON.stringify(writingTask1Contract));
  const speakingReviewRow = speakingReview.sets.find(row => row.set === setNumber);
  const speakingPayload = speaking.map(question => ({
    id: question.id, part: question.part, partNumber: question.partNumber, text: question.text,
    cueCard: question.cueCard ?? '', followUp: question.followUp ?? [],
  }));
  const speakingSemanticApproved = Boolean(
    speakingReviewRow?.semanticStatus === 'APPROVED'
    && speakingReviewRow.speakingSha256 === hash(JSON.stringify(speakingPayload))
    && Object.values(speakingReviewRow.checks ?? {}).every(Boolean)
  );
  if (!speakingSemanticApproved) issue('P0', 'SPEAKING_SEMANTIC_REVIEW_STALE', 'Speaking prompts changed after semantic review', 'config/ielts-harness/speaking-semantic-review.json');
  const speakingContract = {
    parts: speakingParts,
    rows: speaking.length,
    cueCardPresent: Boolean(speaking.find(question => question.partNumber === 2)?.cueCard?.trim()),
    status: speakingSemanticApproved ? 'SEMANTICALLY_APPROVED' : 'INCOMPLETE',
  };
  speakingContract.contractSha256 = hash(JSON.stringify(speakingContract));

  const critical = issues.filter(row => row.priority === 'P0').length;
  const high = issues.filter(row => row.priority === 'P1').length;
  sets.push({
    set: setNumber,
    source,
    status: critical ? 'BLOCKED' : high ? 'PENDING_EVIDENCE' : issues.length ? 'CONTRACT_VARIANT' : 'PASS',
    structure: { listeningParts: listening.length, readingParts: reading.length, writingTasks: writing.map(question => question.taskNumber), speakingRows: speaking.length, speakingParts },
    objective: { listeningPoints: numbers('listening').length, readingPoints: numbers('reading').length, questionIdsUnique: new Set(ids).size === ids.length, optionsAndKeysValid: !issues.some(row => ['OPTION_KEY_INVALID', 'OPTION_SET_INVALID', 'EMPTY_KEY', 'ANSWER_OVER_LIMIT'].includes(row.code)) },
    answerSheets: { listeningQuestions: numbers('listening').length, readingQuestions: numbers('reading').length, responseKeysUnique: !issues.some(row => row.code === 'ANSWER_FIELD_COLLISION'), blueprint: blueprint?.contentVersion ?? null, independentKey: independentKey ?? { status: 'PENDING' } },
    correspondence: { completionLiteral: { listening: `${completion.listening.found}/${completion.listening.total}`, reading: `${completion.reading.found}/${completion.reading.total}` }, semanticStatus, writingTask1: writingTask1Contract, speaking: speakingContract },
    lengths: { readingPartWords: readingWords, readingTotalWords: readingTotal, readingRangePass: readingTotal >= 2150 && readingTotal <= 2750, authoredListeningPartWords: authoredListeningWords, authoredListeningTotalWords: authoredListeningWords.reduce((sum, value) => sum + value, 0), productionVariant: production.variant, productionListeningPartWords: scriptAudit.partWords.map(row => row.words), productionListeningTotalWords: scriptAudit.totalWords, productionScriptAudit: scriptAudit.status, writingPromptWords, speakingPromptWords },
    assets: { listeningAudio: audio, audioPublication: published ? { status: publishedHashVerified ? 'PUBLISHED_HASH_VERIFIED' : 'RECEIPT_MISMATCH', receipt: 'config/ielts-audio/approved-batch-publish-receipt.json', approvedAt: approvedBatchApproval?.approvedAt ?? null, publishedAt: approvedBatchReceipt?.publishedAt ?? null } : { status: 'NO_CURRENT_PUBLICATION_RECEIPT' }, writingTask1: writingImage, questionImages },
    issues,
  });
}

const priorities = ['P0', 'P1', 'P2'];
const summary = {
  sets: sets.length,
  statusCounts: Object.fromEntries([...new Set(sets.map(row => row.status))].map(status => [status, sets.filter(row => row.status === status).length])),
  issueCounts: Object.fromEntries(priorities.map(priority => [priority, sets.flatMap(row => row.issues).filter(issue => issue.priority === priority).length])),
  objectiveStructurePass: sets.filter(row => row.objective.listeningPoints === 40 && row.objective.readingPoints === 40 && row.objective.questionIdsUnique && row.objective.optionsAndKeysValid).length,
  readingLengthPass: sets.filter(row => row.lengths.readingRangePass).length,
  writingAssetPass: sets.filter(row => row.assets.writingTask1.exists && row.assets.writingTask1.dimensions).length,
  writingTask1HashBound: sets.filter(row => row.correspondence.writingTask1.status === 'SEMANTICALLY_APPROVED').length,
  speakingPartsContractPass: sets.filter(row => row.correspondence.speaking.status === 'SEMANTICALLY_APPROVED').length,
  audioAssetPresent: sets.filter(row => row.assets.listeningAudio.length === 1 && row.assets.listeningAudio[0].exists).length,
  independentKeyApproved: sets.filter(row => row.answerSheets.independentKey.status === 'APPROVED').length,
};
const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  baseCommit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
  contract: { referenceSet: 1, listeningParts: 4, listeningQuestions: 40, readingPassages: 3, readingQuestions: 40, writingTasks: [1, 2], writingMinimumWords: [150, 250], speakingParts: [1, 2, 3], readingTotalWords: [2150, 2750], replacementListeningWordsPerPart: 680, replacementListeningWordsPerSet: 2800 },
  scope: 'Local source, generated answer-sheet contract, registered evidence and physical assets. Semantic approval is reported only when independent evidence exists.',
  summary,
  sets,
};

function markdownMatrix() {
  const cell = value => String(value).replace(/\|/gu, '\\|');
  const lines = [
    '# Auditoría integral IELTS Sets 1-20', '',
    `Generada: ${report.generatedAt}`, '',
    `Resumen: ${summary.objectiveStructurePass}/20 con estructura objetiva completa; ${summary.readingLengthPass}/20 Reading en rango; ${summary.writingTask1HashBound}/20 Writing aprobado y ligado por hash; ${summary.speakingPartsContractPass}/20 Speaking aprobado y ligado por hash; ${summary.audioAssetPresent}/20 audios presentes; ${summary.independentKeyApproved}/20 claves con evidencia independiente.`, '',
    '| Set | Estado | L | R | W | S | Answer sheet | Audio | Fallas |',
    '|---:|---|---|---|---|---|---|---|---|',
  ];
  for (const row of sets) {
    const listening = `${row.objective.listeningPoints}/40 · ${row.correspondence.completionLiteral.listening} literal · ${row.lengths.productionListeningTotalWords}w`;
    const reading = `${row.objective.readingPoints}/40 · ${row.correspondence.completionLiteral.reading} literal · ${row.lengths.readingTotalWords}w`;
    const writing = `${row.structure.writingTasks.join('+')} · T1 ${row.lengths.writingPromptWords[0]}w · ${row.correspondence.writingTask1.contractSha256.slice(0, 8)}… · ${row.assets.writingTask1.exists ? 'asset ✓' : 'asset ✗'}`;
    const speakingCell = `${row.structure.speakingParts.join('/')} · ${row.structure.speakingRows} filas · ${row.correspondence.speaking.contractSha256.slice(0, 8)}…`;
    const answer = row.answerSheets.independentKey.status === 'APPROVED' ? '40+40 · aprobada' : '40+40 · evidencia pendiente';
    const audioCell = `${row.assets.listeningAudio[0]?.exists ? 'presente' : 'ausente'} · ${row.issues.find(issue => issue.code.startsWith('AUDIO_'))?.code ?? 'sin bloqueo'}`;
    lines.push(`| ${row.set} | ${row.status} | ${cell(listening)} | ${cell(reading)} | ${cell(writing)} | ${cell(speakingCell)} | ${cell(answer)} | ${cell(audioCell)} | ${cell(row.issues.map(issue => `${issue.priority}:${issue.code}`).join(', ') || '—')} |`);
  }
  lines.push('', '## Fallas accionables', '');
  for (const priority of priorities) {
    lines.push(`### ${priority}`, '');
    for (const row of sets) for (const item of row.issues.filter(issue => issue.priority === priority)) lines.push(`- Set ${row.set}: **${item.code}** — ${item.detail} — \`${item.file}\``);
    if (!sets.some(row => row.issues.some(issue => issue.priority === priority))) lines.push('- Ninguna.');
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

if (args.output) {
  const output = path.resolve(root, args.output);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
}
if (args.markdown) {
  const output = path.resolve(root, args.markdown);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, markdownMatrix());
}
console.log(JSON.stringify({ summary, output: args.output ? path.resolve(root, args.output) : null, markdown: args.markdown ? path.resolve(root, args.markdown) : null }, null, 2));
if (args.strict === 'true' && sets.some(row => row.status !== 'PASS')) process.exitCode = 1;
