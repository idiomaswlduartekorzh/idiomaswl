#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { withIeltsListeningProductionTranscript } from '../src/data/mocks/ielts-listening-production.ts';
import { withIeltsListeningLegacyReplacementTranscript } from '../src/data/mocks/ielts-listening-legacy-replacement.ts';
import {
  asrSegments, exactAsrSlice, findBestAsrWindow, focusedToMasterConverter, keyedAnswerSimilarity,
  sha256Bytes, vendorListeningEvidenceSource,
} from './lib/ielts-listening-audible-evidence.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const outputDirectory = path.join(root, 'config/ielts-harness/listening-evidence');
const SETS = Array.from({ length: 19 }, (_, index) => index + 2);
const relative = file => path.relative(root, file);
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const fileSha = file => sha256Bytes(fs.readFileSync(file));

function walk(directory, basenamePattern, results = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ['.cache', '.segments', '.assembly', 'dev-cache-backups'].includes(entry.name)) continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(file, basenamePattern, results);
    else if (basenamePattern.test(entry.name)) results.push(file);
  }
  return results;
}

const qaCandidates = walk(path.join(root, 'output'), /^(?:staged-asr-qa|repair-qa-report)-set-\d+\.json$/u);
const supplementalAsrDirectory = path.join(outputDirectory, 'supplemental-asr');
const supplementalAsrCandidates = fs.existsSync(supplementalAsrDirectory)
  ? fs.readdirSync(supplementalAsrDirectory).filter(file => file.endsWith('.json'))
    .map(file => path.join(supplementalAsrDirectory, file))
  : [];

async function effectiveMock(set) {
  const authored = (await import(new URL(`../src/data/mocks/ielts-set-${set}.ts`, import.meta.url))).default;
  if (set >= 2 && set <= 7) return withIeltsListeningLegacyReplacementTranscript(withIeltsListeningProductionTranscript(authored));
  if ([8, 10, 11, 12].includes(set)) return withIeltsListeningLegacyReplacementTranscript(authored);
  if (set >= 13) return withIeltsListeningProductionTranscript(authored);
  return authored;
}

function matchingQa(set, audioSha) {
  const matches = qaCandidates.map(file => ({ file, qa: readJson(file) }))
    .filter(({ qa }) => qa.set === set && qa.status === 'PASS' && qa.audioSha256 === audioSha);
  assert.equal(matches.length, 1, `Set ${set}: expected one PASS ASR QA bound to public audio, found ${matches.length}`);
  return matches[0];
}

function absoluteFromReport(value) {
  if (path.isAbsolute(value)) return value;
  return path.join(root, value);
}

function globalAsrSources(qaFile, qa) {
  const reportFile = absoluteFromReport(qa.globalAsr.reportPath);
  const report = readJson(reportFile);
  const asrFile = absoluteFromReport(report.asrSourcePath);
  return { reportFile, report, asrFile, asr: readJson(asrFile), qaFile, qa };
}

function completionSources(sources, set) {
  const result = new Map();
  for (const item of sources.report.completionEvidence.filter(entry => entry.found)) {
    result.set(item.question, {
      item, method: 'GLOBAL_COMPLETION', asrFile: sources.asrFile,
      startSeconds: item.startSeconds, endSeconds: item.endSeconds, conversion: null,
    });
  }
  const qaDirectory = path.dirname(sources.qaFile);
  const playbackSpeed = set === 6 ? 0.992 : 1;
  for (const [collection, method] of [[sources.qa.partReports ?? [], 'PART_COMPLETION'], [sources.qa.focusedReports ?? [], 'FOCUSED_COMPLETION']]) {
    for (const report of collection) {
      const asrFile = absoluteFromReport(report.asrPath);
      const converter = focusedToMasterConverter(qaDirectory, report.segmentIndexes, playbackSpeed);
      for (const item of report.completionEvidence.filter(entry => entry.found && !result.has(entry.question))) {
        result.set(item.question, {
          item, method, asrFile,
          startSeconds: converter.convert(item.startSeconds), endSeconds: converter.convert(item.endSeconds),
          conversion: {
            localStartSeconds: item.startSeconds, localEndSeconds: item.endSeconds,
            segmentIndexes: report.segmentIndexes, playbackSpeed,
          },
        });
      }
    }
  }
  return result;
}

function alignmentSources(sources, set, part) {
  const candidates = [{
    method: 'ACADEMIC_EXCERPT_ALIGNMENT', asrFile: sources.asrFile,
    segments: asrSegments(sources.asr), converter: null, segmentIndexes: null, playbackSpeed: 1,
  }];
  const qaDirectory = path.dirname(sources.qaFile);
  const playbackSpeed = set === 6 ? 0.992 : 1;
  for (const [collection, method] of [[sources.qa.partReports ?? [], 'PART_ACADEMIC_EXCERPT_ALIGNMENT'], [sources.qa.focusedReports ?? [], 'FOCUSED_ACADEMIC_EXCERPT_ALIGNMENT']]) {
    for (const report of collection.filter(entry => entry.part === part)) {
      const asrFile = absoluteFromReport(report.asrPath);
      candidates.push({ method, asrFile, segments: asrSegments(readJson(asrFile)),
        converter: focusedToMasterConverter(qaDirectory, report.segmentIndexes, playbackSpeed),
        segmentIndexes: report.segmentIndexes, playbackSpeed });
    }
  }
  for (const asrFile of supplementalAsrCandidates) {
    const report = readJson(asrFile);
    if (report.set !== set || report.part !== part) continue;
    assert.equal(fileSha(path.join(root, report.sourceAudio.path)), report.sourceAudio.sha256,
      `Set ${set}: supplemental ASR source audio changed`);
    candidates.push({ method: 'SUPPLEMENTAL_ACADEMIC_EXCERPT_ALIGNMENT', asrFile,
      segments: asrSegments(report),
      converter: focusedToMasterConverter(qaDirectory, report.segmentIndexes, playbackSpeed),
      segmentIndexes: report.segmentIndexes, playbackSpeed, sourceAudio: report.sourceAudio });
  }
  return candidates;
}

function evidenceUnits(review) {
  return review.evidence.filter(entry => entry.skill === 'listening').flatMap(entry =>
    Array.from({ length: entry.points }, (_, unitIndex) => ({ academic: entry, question: entry.question + unitIndex, unitIndex })));
}

function listeningPartBounds(segments) {
  const words = ['one', 'two', 'three', 'four'];
  const starts = [];
  let cursor = 0;
  for (let part = 1; part <= 4; part += 1) {
    const match = segments.slice(cursor).findIndex(segment => {
      const text = segment.text.toLowerCase().replace(/[^a-z0-9\s]/gu, ' ').replace(/\s+/gu, ' ').trim();
      const label = new RegExp(`^(?:part|section) (?:${words[part - 1]}|${part})(?: |$)`, 'u').test(text);
      const sufficientlySeparated = part === 1 || segment.start - starts.at(-1) >= 150;
      return label && sufficientlySeparated && !/\b(?:complete|end)\b/u.test(text);
    });
    assert.ok(match >= 0, `Listening Part ${part}: ASR announcement is missing`);
    cursor += match;
    starts.push(segments[cursor].start);
    cursor += 1;
  }
  return new Map(starts.map((start, index) => [index + 1, {
    lower: start,
    upper: index === 3 ? segments.at(-1).end : starts[index + 1],
  }]));
}

fs.mkdirSync(outputDirectory, { recursive: true });
const manifestRows = [];
for (const set of SETS) {
  const mock = await effectiveMock(set);
  const reviewFile = path.join(root, `config/ielts-harness/academic-reviews/set-${set}-objective-review.json`);
  const review = readJson(reviewFile);
  const audioFile = path.join(root, `public/audio/ielts/ielts-listening-set-${set}.mp3`);
  const audioSha = fileSha(audioFile);
  const sources = globalAsrSources(...Object.values(matchingQa(set, audioSha)));
  assert.equal(sources.report.audioSha256, audioSha, `Set ${set}: global ASR report is not bound to public audio`);
  assert.equal(fileSha(sources.asrFile), sources.report.asrSourceSha256, `Set ${set}: global ASR source hash mismatch`);
  const globalSegments = asrSegments(sources.asr);
  const completions = completionSources(sources, set);
  const units = evidenceUnits(review);
  assert.deepEqual(units.map(unit => unit.question), Array.from({ length: 40 }, (_, index) => index + 1),
    `Set ${set}: academic Listening review does not expand to Q1-Q40`);
  const items = [];
  for (const unit of units) {
    const { academic, question } = unit;
    const completion = academic.evidenceClass === 'completion' ? completions.get(academic.question) : null;
    if (completion) {
      const sourceAsr = readJson(completion.asrFile);
      const sourceSegments = asrSegments(sourceAsr);
      const phrase = exactAsrSlice(sourceSegments, completion.item.startSeconds, completion.item.endSeconds);
      assert.equal(phrase, completion.item.audiblePhrase, `Set ${set} Q${question}: ASR report phrase drift`);
      items.push({
        question, responseKey: academic.responseKey, part: academic.sourcePart,
        academicEvidenceSha256: sha256Bytes(JSON.stringify(academic)), academicExcerptSha256: academic.sourceExcerptSha256,
        startSeconds: completion.startSeconds, endSeconds: completion.endSeconds,
        audiblePhrase: phrase, audiblePhraseSha256: sha256Bytes(phrase),
        rationale: `The academic review identifies the answer evidence, and the ASR ${completion.item.matchKind} match locates that supporting phrase in the published recording.`,
        method: completion.method, confidence: completion.item.matchKind === 'exact' ? 'HIGH' : 'MEDIUM',
        asrMatchKind: completion.item.matchKind,
        sourceAsr: { path: vendorListeningEvidenceSource({ root, set, file: completion.asrFile }), sha256: fileSha(completion.asrFile),
          startSeconds: completion.item.startSeconds, endSeconds: completion.item.endSeconds },
        ...(completion.conversion ? { conversion: { ...completion.conversion,
          masterStartSeconds: completion.startSeconds, masterEndSeconds: completion.endSeconds } } : {}),
      });
      continue;
    }
    assert.notEqual(academic.evidenceClass, 'completion', `Set ${set} Q${question}: completion has no audible ASR evidence`);
    const candidates = alignmentSources(sources, set, academic.sourcePart).map(candidate => ({
      ...candidate,
      match: findBestAsrWindow(candidate.segments, academic.sourceExcerpt, 0, candidate.segments.at(-1).end),
    })).sort((left, right) => right.match.score - left.match.score);
    const selected = candidates[0];
    const match = selected.match;
    const answerSupportScore = Math.max(0, ...(academic.correctOptions ?? [])
      .map(option => keyedAnswerSimilarity(option.text, match.phrase)));
    assert.ok(match.score >= 0.68 || answerSupportScore >= 0.8,
      `Set ${set} Q${question}: excerpt alignment ${match.score} and keyed-answer support ${answerSupportScore} are insufficient`);
    const startSeconds = selected.converter ? selected.converter.convert(match.start) : match.start;
    const endSeconds = selected.converter ? selected.converter.convert(match.end) : match.end;
    items.push({
      question, responseKey: academic.responseKey, part: academic.sourcePart,
      academicEvidenceSha256: sha256Bytes(JSON.stringify(academic)), academicExcerptSha256: academic.sourceExcerptSha256,
      startSeconds, endSeconds,
      audiblePhrase: match.phrase, audiblePhraseSha256: sha256Bytes(match.phrase),
      rationale: 'The timed ASR window reproduces the academic review excerpt that supports the keyed selection and dismisses its distractors.',
      method: selected.method, confidence: match.score >= 0.85 ? 'HIGH' : 'MEDIUM',
      alignmentScore: match.score, answerSupportScore,
      sourceAsr: { path: vendorListeningEvidenceSource({ root, set, file: selected.asrFile }), sha256: fileSha(selected.asrFile),
        startSeconds: match.start, endSeconds: match.end },
      ...(selected.sourceAudio ? { sourceAudio: { ...selected.sourceAudio,
        path: vendorListeningEvidenceSource({ root, set, file: path.join(root, selected.sourceAudio.path) }) } } : {}),
      ...(selected.converter ? { conversion: { localStartSeconds: match.start, localEndSeconds: match.end,
        masterStartSeconds: startSeconds, masterEndSeconds: endSeconds,
        segmentIndexes: selected.segmentIndexes, playbackSpeed: selected.playbackSpeed } } : {}),
    });
  }
  const transcriptCore = mock.sections.filter(section => section.skill === 'listening').map(section => ({
    part: section.part, title: section.title, transcript: section.transcript,
  }));
  const core = {
    schemaVersion: 1, status: 'PASS', set, generatedAt: '2026-09-09',
    audio: { url: `/audio/ielts/ielts-listening-set-${set}.mp3`, path: relative(audioFile), sha256: audioSha },
    transcript: { effectiveTranscriptSha256: sha256Bytes(JSON.stringify(transcriptCore)),
      harnessTranscriptSha256: sha256Bytes(JSON.stringify(transcriptCore.map(({ part, transcript }) => ({ part, transcript })))),
      academicListeningMaterialSha256: review.binding.listeningMaterialSha256 },
    academicReview: { path: relative(reviewFile), fileSha256: fileSha(reviewFile), reviewSha256: review.reviewSha256 },
    asr: { qaPath: vendorListeningEvidenceSource({ root, set, file: sources.qaFile }), qaSha256: fileSha(sources.qaFile),
      globalReportPath: vendorListeningEvidenceSource({ root, set, file: sources.reportFile }), globalReportSha256: fileSha(sources.reportFile),
      globalSourcePath: vendorListeningEvidenceSource({ root, set, file: sources.asrFile }), globalSourceSha256: fileSha(sources.asrFile) },
    evidence: items,
    summary: { questions: 40, supported: 40, unresolved: 0 },
  };
  const artifact = { ...core, artifactSha256: sha256Bytes(JSON.stringify(core)) };
  const artifactFile = path.join(outputDirectory, `set-${set}-listening-evidence.json`);
  fs.writeFileSync(artifactFile, `${JSON.stringify(artifact, null, 2)}\n`);
  manifestRows.push({ set, status: 'PASS', questions: 40, audioSha256: audioSha,
    artifactPath: relative(artifactFile), artifactFileSha256: fileSha(artifactFile), artifactSha256: artifact.artifactSha256 });
  console.log(`Set ${set}: PASS 40/40`);
}
const manifestCore = { schemaVersion: 1, status: 'PASS', generatedAt: '2026-09-09', scope: 'ielts_listening_sets_2_20',
  sets: manifestRows, summary: { sets: 19, questions: 760, supported: 760, unresolved: 0 } };
const manifest = { ...manifestCore, manifestSha256: sha256Bytes(JSON.stringify(manifestCore)) };
fs.writeFileSync(path.join(outputDirectory, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Manifest: ${manifest.manifestSha256}`);
