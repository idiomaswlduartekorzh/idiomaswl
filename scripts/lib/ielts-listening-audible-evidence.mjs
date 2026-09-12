import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { auditIeltsAcademicReview } from './ielts-academic-review-evidence.mjs';

export const sha256Bytes = value => createHash('sha256').update(value).digest('hex');

export function vendorListeningEvidenceSource({ root, set, file }) {
  const source = path.resolve(file);
  const evidenceRoot = path.join(root, 'config/ielts-harness/listening-evidence');
  const existingRelative = path.relative(evidenceRoot, source);
  if (!existingRelative.startsWith('..') && !path.isAbsolute(existingRelative)) return path.relative(root, source);
  const digest = sha256Bytes(fs.readFileSync(source));
  const directory = path.join(evidenceRoot, 'sources', `set-${set}`);
  fs.mkdirSync(directory, { recursive: true });
  const destination = path.join(directory, `${digest.slice(0, 12)}-${path.basename(source)}`);
  if (!fs.existsSync(destination) || sha256Bytes(fs.readFileSync(destination)) !== digest) fs.copyFileSync(source, destination);
  return path.relative(root, destination);
}

export function normalizedAudibleWords(value = '') {
  return String(value).normalize('NFKD').replace(/[\u0300-\u036f]/gu, '').toLowerCase()
    .replace(/^\s*[A-Z][A-Z0-9 .'-]{1,30}:\s*/gmu, '')
    .replace(/[’']/gu, '').replace(/-/gu, ' ').replace(/[^a-z0-9\s]/gu, ' ')
    .replace(/\s+/gu, ' ').trim().split(' ').filter(Boolean);
}

export function wordEditDistance(left, right) {
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= right.length; j += 1) {
      current[j] = Math.min(current[j - 1] + 1, previous[j] + 1,
        previous[j - 1] + (left[i - 1] === right[j - 1] ? 0 : 1));
    }
    previous = current;
  }
  return previous[right.length];
}

export function audibleSimilarity(expected, audible) {
  const left = normalizedAudibleWords(expected);
  const right = normalizedAudibleWords(audible);
  if (!left.length || !right.length) return 0;
  let previous = new Uint16Array(right.length + 1);
  for (let i = 1; i <= left.length; i += 1) {
    const current = new Uint16Array(right.length + 1);
    for (let j = 1; j <= right.length; j += 1) {
      current[j] = left[i - 1] === right[j - 1] ? previous[j - 1] + 1 : Math.max(previous[j], current[j - 1]);
    }
    previous = current;
  }
  return Number((previous[right.length] / left.length).toFixed(4));
}

export function keyedAnswerSimilarity(expected, audible) {
  const literal = audibleSimilarity(expected, audible);
  const contentWords = normalizedAudibleWords(expected).filter(word => !['there', 'was', 'were'].includes(word));
  if (!contentWords.length) return literal;
  return Math.max(literal, audibleSimilarity(contentWords.join(' '), audible));
}

export function asrSegments(asr) {
  const segments = asr.segments ?? asr.result?.segments;
  assert.ok(Array.isArray(segments) && segments.length, 'ASR source has no segments');
  return segments.filter(segment => String(segment.text ?? '').trim()).map(segment => ({
    start: Number(segment.start), end: Number(segment.end), text: String(segment.text).trim(),
  }));
}

export function exactAsrSlice(segments, start, end) {
  const first = segments.findIndex(segment => Math.abs(segment.start - start) < 1e-6);
  assert.ok(first >= 0, `ASR start ${start} is not an exact segment timecode`);
  const lastRelative = segments.slice(first).findIndex(segment => Math.abs(segment.end - end) < 1e-6);
  assert.ok(lastRelative >= 0, `ASR end ${end} is not an exact segment timecode`);
  const last = first + lastRelative;
  return segments.slice(first, last + 1).map(segment => segment.text).join(' ');
}

export function findBestAsrWindow(segments, expectedExcerpt, minimumTime, maximumTime) {
  const expectedWords = normalizedAudibleWords(expectedExcerpt);
  assert.ok(expectedWords.length >= 4, 'Academic excerpt is too short to align');
  const scoped = segments.map((segment, index) => ({ ...segment, index,
    words: normalizedAudibleWords(segment.text) }))
    .filter(segment => segment.end >= minimumTime && segment.start <= maximumTime);
  assert.ok(scoped.length, 'No ASR speech exists inside the evidence bounds');
  const minimumWords = Math.max(4, Math.floor(expectedWords.length * 0.5));
  const maximumWords = Math.max(expectedWords.length + 20, Math.ceil(expectedWords.length * 2));
  let best = null;
  for (let left = 0; left < scoped.length; left += 1) {
    const words = [];
    for (let right = left; right < scoped.length; right += 1) {
      words.push(...scoped[right].words);
      if (words.length > maximumWords) break;
      if (words.length < minimumWords) continue;
      const phrase = scoped.slice(left, right + 1).map(segment => segment.text).join(' ');
      const score = audibleSimilarity(expectedExcerpt, phrase);
      if (!best || score > best.score || (score === best.score && words.length < best.words)) {
        best = { start: scoped[left].start, end: scoped[right].end, phrase, score, words: words.length };
      }
    }
  }
  assert.ok(best, 'Could not align the academic excerpt to an ASR window');
  return best;
}

export function wavDurationSeconds(file) {
  const bytes = fs.readFileSync(file);
  assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', `${file}: invalid WAV header`);
  let offset = 12;
  let byteRate = null;
  let dataBytes = null;
  while (offset + 8 <= bytes.length) {
    const id = bytes.toString('ascii', offset, offset + 4);
    const size = bytes.readUInt32LE(offset + 4);
    if (id === 'fmt ') byteRate = bytes.readUInt32LE(offset + 8 + 8);
    if (id === 'data') { dataBytes = size; break; }
    offset += 8 + size + (size % 2);
  }
  assert.ok(byteRate > 0 && dataBytes > 0, `${file}: WAV duration metadata is incomplete`);
  return dataBytes / byteRate;
}

export function focusedToMasterConverter(qaDirectory, segmentIndexes, playbackSpeed = 1) {
  assert.ok(segmentIndexes.length, 'Focused ASR report has no segmentIndexes');
  const assembly = path.join(qaDirectory, '.assembly');
  const concatLines = fs.readFileSync(path.join(assembly, 'concat.txt'), 'utf8').trim().split('\n');
  const concatFiles = concatLines.map(line => line.match(/^file '(.*)'$/u)?.[1]).filter(Boolean);
  let elapsed = 0;
  const masterStarts = new Map();
  for (const file of concatFiles) {
    const match = path.basename(file).match(/^prepared-(\d+)\.wav$/u);
    if (match) masterStarts.set(Number(match[1]), elapsed / playbackSpeed);
    elapsed += wavDurationSeconds(file);
  }
  const local = [];
  let localElapsed = 0;
  for (const [index, segmentIndex] of segmentIndexes.entries()) {
    const prepared = path.join(assembly, `prepared-${String(segmentIndex).padStart(3, '0')}.wav`);
    const duration = wavDurationSeconds(prepared);
    local.push({ segmentIndex, start: localElapsed, end: localElapsed + duration,
      masterStart: masterStarts.get(segmentIndex) });
    localElapsed += duration + (index < segmentIndexes.length - 1 ? 1 : 0);
  }
  assert.ok(local.every(entry => Number.isFinite(entry.masterStart)), 'A focused source segment is absent from the master assembly');
  const convert = seconds => {
    let entry = local.find(candidate => seconds >= candidate.start - 0.05 && seconds <= candidate.end + 0.05);
    let localSeconds = seconds;
    if (!entry) {
      const nextIndex = local.findIndex(candidate => candidate.start > seconds);
      const previous = nextIndex > 0 ? local[nextIndex - 1] : null;
      const next = nextIndex >= 0 ? local[nextIndex] : null;
      const candidates = [
        previous && { entry: previous, seconds: previous.end, distance: seconds - previous.end },
        next && { entry: next, seconds: next.start, distance: next.start - seconds },
      ].filter(candidate => candidate && candidate.distance >= 0 && candidate.distance <= 1.05)
        .sort((left, right) => left.distance - right.distance);
      if (candidates.length) ({ entry, seconds: localSeconds } = candidates[0]);
    }
    assert.ok(entry, `Focused time ${seconds} falls outside its source segments`);
    return Number((entry.masterStart + (localSeconds - entry.start) / playbackSpeed).toFixed(3));
  };
  return { convert, local };
}

function fileSha(root, relativePath) {
  return sha256Bytes(fs.readFileSync(path.join(root, relativePath)));
}

function transcriptSha(mock) {
  return sha256Bytes(JSON.stringify(mock.sections.filter(section => section.skill === 'listening').map(section => ({
    part: section.part, title: section.title, transcript: section.transcript,
  }))));
}

function harnessTranscriptSha(mock) {
  return sha256Bytes(JSON.stringify(mock.sections.filter(section => section.skill === 'listening').map(section => ({
    part: section.part, transcript: section.transcript,
  }))));
}

export function auditListeningEvidenceArtifact({ root, mock, academicReview, artifact }) {
  const { artifactSha256, ...core } = artifact;
  assert.equal(sha256Bytes(JSON.stringify(core)), artifactSha256, `Set ${artifact.set}: audible artifact digest is stale`);
  assert.equal(artifact.schemaVersion, 1);
  assert.equal(artifact.status, 'PASS');
  assert.equal(artifact.set, Number(mock.id.replace('set-', '')));
  auditIeltsAcademicReview(mock, academicReview);
  assert.equal(fileSha(root, artifact.audio.path), artifact.audio.sha256, `Set ${artifact.set}: public audio changed`);
  assert.equal(fileSha(root, artifact.academicReview.path), artifact.academicReview.fileSha256,
    `Set ${artifact.set}: academic review file changed`);
  assert.equal(academicReview.reviewSha256, artifact.academicReview.reviewSha256,
    `Set ${artifact.set}: academic review digest changed`);
  assert.equal(academicReview.binding.listeningMaterialSha256, artifact.transcript.academicListeningMaterialSha256,
    `Set ${artifact.set}: academic transcript binding changed`);
  assert.equal(transcriptSha(mock), artifact.transcript.effectiveTranscriptSha256,
    `Set ${artifact.set}: effective transcript changed`);
  assert.equal(harnessTranscriptSha(mock), artifact.transcript.harnessTranscriptSha256,
    `Set ${artifact.set}: harness transcript binding changed`);
  assert.equal(fileSha(root, artifact.asr.qaPath), artifact.asr.qaSha256, `Set ${artifact.set}: ASR QA changed`);
  assert.equal(fileSha(root, artifact.asr.globalReportPath), artifact.asr.globalReportSha256,
    `Set ${artifact.set}: global ASR report changed`);
  assert.equal(fileSha(root, artifact.asr.globalSourcePath), artifact.asr.globalSourceSha256,
    `Set ${artifact.set}: global ASR source changed`);
  assert.deepEqual(artifact.evidence.map(item => item.question), Array.from({ length: 40 }, (_, index) => index + 1),
    `Set ${artifact.set}: audible evidence must cover Q1-Q40 exactly`);
  const academicListening = academicReview.evidence.filter(entry => entry.skill === 'listening');
  for (const item of artifact.evidence) {
    const academic = academicListening.find(entry => item.question >= entry.question
      && item.question < entry.question + entry.points);
    assert.ok(academic, `Set ${artifact.set} Q${item.question}: academic evidence is missing`);
    assert.equal(item.responseKey, academic.responseKey);
    assert.equal(item.academicEvidenceSha256, sha256Bytes(JSON.stringify(academic)));
    assert.equal(item.academicExcerptSha256, academic.sourceExcerptSha256);
    assert.ok(Number.isFinite(item.startSeconds) && Number.isFinite(item.endSeconds)
      && item.startSeconds >= 0 && item.endSeconds > item.startSeconds,
    `Set ${artifact.set} Q${item.question}: invalid master timecodes`);
    assert.ok(item.audiblePhrase.length >= 3 && item.rationale.length >= 20,
      `Set ${artifact.set} Q${item.question}: audible evidence is incomplete`);
    assert.equal(item.audiblePhraseSha256, sha256Bytes(item.audiblePhrase));
    assert.ok(['HIGH', 'MEDIUM'].includes(item.confidence));
    assert.ok(['GLOBAL_COMPLETION', 'PART_COMPLETION', 'FOCUSED_COMPLETION', 'ACADEMIC_EXCERPT_ALIGNMENT',
      'PART_ACADEMIC_EXCERPT_ALIGNMENT', 'FOCUSED_ACADEMIC_EXCERPT_ALIGNMENT',
      'SUPPLEMENTAL_ACADEMIC_EXCERPT_ALIGNMENT'].includes(item.method));
    assert.equal(fileSha(root, item.sourceAsr.path), item.sourceAsr.sha256,
      `Set ${artifact.set} Q${item.question}: source ASR changed`);
    const sourceSegments = asrSegments(JSON.parse(fs.readFileSync(path.join(root, item.sourceAsr.path), 'utf8')));
    assert.equal(exactAsrSlice(sourceSegments, item.sourceAsr.startSeconds, item.sourceAsr.endSeconds), item.audiblePhrase,
      `Set ${artifact.set} Q${item.question}: audible phrase is not the cited ASR slice`);
    if (item.sourceAudio) {
      assert.equal(fileSha(root, item.sourceAudio.path), item.sourceAudio.sha256,
        `Set ${artifact.set} Q${item.question}: supplemental source audio changed`);
    }
    if (item.method.endsWith('ACADEMIC_EXCERPT_ALIGNMENT')) {
      assert.equal(audibleSimilarity(academic.sourceExcerpt, item.audiblePhrase), item.alignmentScore,
        `Set ${artifact.set} Q${item.question}: alignment score is stale`);
      const answerSupportScore = Math.max(0, ...(academic.correctOptions ?? [])
        .map(option => keyedAnswerSimilarity(option.text, item.audiblePhrase)));
      assert.equal(item.answerSupportScore, answerSupportScore,
        `Set ${artifact.set} Q${item.question}: keyed-answer support score is stale`);
      assert.ok(item.alignmentScore >= 0.68 || item.answerSupportScore >= 0.8,
        `Set ${artifact.set} Q${item.question}: ASR does not support the reviewed excerpt or keyed answer`);
    } else {
      assert.ok(item.asrMatchKind === 'exact' || item.asrMatchKind === 'fuzzy');
    }
    if (item.conversion) {
      assert.ok(['PART_COMPLETION', 'FOCUSED_COMPLETION', 'PART_ACADEMIC_EXCERPT_ALIGNMENT',
        'FOCUSED_ACADEMIC_EXCERPT_ALIGNMENT', 'SUPPLEMENTAL_ACADEMIC_EXCERPT_ALIGNMENT'].includes(item.method));
      assert.equal(item.conversion.localStartSeconds, item.sourceAsr.startSeconds,
        `Set ${artifact.set} Q${item.question}: local start timecode changed`);
      assert.equal(item.conversion.localEndSeconds, item.sourceAsr.endSeconds,
        `Set ${artifact.set} Q${item.question}: local end timecode changed`);
      assert.equal(item.startSeconds, item.conversion.masterStartSeconds,
        `Set ${artifact.set} Q${item.question}: converted start timecode changed`);
      assert.equal(item.endSeconds, item.conversion.masterEndSeconds,
        `Set ${artifact.set} Q${item.question}: converted end timecode changed`);
      assert.ok(item.conversion.segmentIndexes.length > 0 && Number.isFinite(item.conversion.playbackSpeed));
    } else {
      assert.equal(item.startSeconds, item.sourceAsr.startSeconds,
        `Set ${artifact.set} Q${item.question}: exact segment timecode changed at start`);
      assert.equal(item.endSeconds, item.sourceAsr.endSeconds,
        `Set ${artifact.set} Q${item.question}: exact segment timecode changed at end`);
    }
  }
  assert.deepEqual(artifact.summary, { questions: 40, supported: 40, unresolved: 0 });
  return { set: artifact.set, status: 'PASS', questions: 40 };
}

export function auditSet1ListeningEvidenceArtifact({ root, mock, artifact }) {
  const { artifactSha256, ...core } = artifact;
  assert.equal(sha256Bytes(JSON.stringify(core)), artifactSha256,
    'Set 1: audible artifact digest is stale');
  assert.equal(artifact.schemaVersion, 1);
  assert.equal(artifact.status, 'PASS');
  assert.equal(artifact.set, 1);
  assert.equal(fileSha(root, artifact.audio.path), artifact.audio.sha256, 'Set 1: public audio changed');
  assert.equal(harnessTranscriptSha(mock), artifact.transcript.harnessTranscriptSha256,
    'Set 1: harness transcript binding changed');
  assert.ok(Array.isArray(artifact.pinnedReferences) && artifact.pinnedReferences.length >= 2,
    'Set 1: pinned references are incomplete');
  for (const reference of artifact.pinnedReferences) {
    assert.equal(fileSha(root, reference.path), reference.sha256,
      `Set 1: pinned reference changed (${reference.path})`);
  }
  assert.equal(fileSha(root, artifact.asr.qaPath), artifact.asr.qaSha256, 'Set 1: ASR QA changed');
  assert.equal(fileSha(root, artifact.asr.globalReportPath), artifact.asr.globalReportSha256,
    'Set 1: global ASR report changed');
  assert.equal(fileSha(root, artifact.asr.globalSourcePath), artifact.asr.globalSourceSha256,
    'Set 1: global ASR source changed');
  assert.deepEqual(artifact.evidence.map(item => item.question), Array.from({ length: 40 }, (_, index) => index + 1),
    'Set 1: audible evidence must cover Q1-Q40 exactly');
  for (const item of artifact.evidence) {
    assert.ok(item.responseKey && item.part >= 1 && item.part <= 4,
      `Set 1 Q${item.question}: response binding is incomplete`);
    assert.ok(Number.isFinite(item.startSeconds) && Number.isFinite(item.endSeconds)
      && item.startSeconds >= 0 && item.endSeconds > item.startSeconds,
    `Set 1 Q${item.question}: invalid master timecodes`);
    assert.ok(item.audiblePhrase.length >= 3 && item.rationale.length >= 20,
      `Set 1 Q${item.question}: audible evidence is incomplete`);
    assert.ok(['HIGH', 'MEDIUM'].includes(item.confidence));
    assert.ok(['GLOBAL_COMPLETION', 'FOCUSED_REPAIR_COMPLETION',
      'PINNED_REFERENCE_SELECTION_ALIGNMENT'].includes(item.method),
    `Set 1 Q${item.question}: unsupported evidence method`);
    assert.equal(fileSha(root, item.sourceAsr.path), item.sourceAsr.sha256,
      `Set 1 Q${item.question}: source ASR changed`);
    const sourceSegments = asrSegments(JSON.parse(fs.readFileSync(path.join(root, item.sourceAsr.path), 'utf8')));
    assert.equal(exactAsrSlice(sourceSegments, item.sourceAsr.startSeconds, item.sourceAsr.endSeconds), item.audiblePhrase,
      `Set 1 Q${item.question}: audible phrase is not the cited ASR slice`);
    const offset = Number(item.sourceAsr.masterOffsetSeconds ?? 0);
    assert.equal(item.startSeconds, Number((item.sourceAsr.startSeconds + offset).toFixed(3)),
      `Set 1 Q${item.question}: master start timecode changed`);
    assert.equal(item.endSeconds, Number((item.sourceAsr.endSeconds + offset).toFixed(3)),
      `Set 1 Q${item.question}: master end timecode changed`);
    if (item.method === 'PINNED_REFERENCE_SELECTION_ALIGNMENT') {
      assert.ok(Number.isFinite(item.alignmentScore) && item.alignmentScore >= 0 && item.alignmentScore <= 1,
        `Set 1 Q${item.question}: invalid selection alignment score`);
    }
  }
  assert.deepEqual(artifact.summary, { questions: 40, supported: 40, unresolved: 0 });
  return { set: 1, status: 'PASS', questions: 40 };
}
