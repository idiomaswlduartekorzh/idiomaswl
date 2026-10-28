#!/usr/bin/env node

/**
 * Build fail-closed, review-pending guided-evidence artifacts for IELTS Sets 21–40.
 *
 * This script intentionally writes only to a staging directory. It does not import,
 * modify, or register anything under src/data/ielts/guided-evidence.
 *
 * Run with a Node version that supports type stripping, for example:
 *   node --experimental-strip-types scripts/stage-ielts-guided-evidence-21-40.mjs
 *
 * The generated evidence is not a release approval. Every Reading row and every
 * Listening binding remains PENDING_INDEPENDENT_REVIEW.
 */

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const REPO_ROOT = path.resolve(path.dirname(SCRIPT_PATH), '..');
const DEFAULT_WORKSPACE = '/Users/ddev/Documents/Codex/2026-10-02/pu';
const REVIEW_STATE = 'PENDING_INDEPENDENT_REVIEW';
const SETS = Array.from({ length: 20 }, (_, index) => index + 21);

function parseArgs(argv) {
  const options = {
    productionRoot: path.join(DEFAULT_WORKSPACE, 'outputs/ielts-production'),
    workRoot: path.join(DEFAULT_WORKSPACE, 'work/listening-sets22-40'),
    outputDir: path.join(REPO_ROOT, 'staging/ielts-guided-evidence-21-40'),
    validateOnly: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--production-root') options.productionRoot = path.resolve(argv[++index]);
    else if (token === '--work-root') options.workRoot = path.resolve(argv[++index]);
    else if (token === '--output-dir') options.outputDir = path.resolve(argv[++index]);
    else if (token === '--validate-only') options.validateOnly = true;
    else if (token === '--help') {
      console.log(`Usage: node --experimental-strip-types ${path.relative(REPO_ROOT, SCRIPT_PATH)} [options]\n\n` +
        'Options:\n' +
        '  --production-root PATH  Source outputs/ielts-production root\n' +
        '  --work-root PATH        Source work/listening-sets22-40 root\n' +
        '  --output-dir PATH       New staging output directory\n' +
        '  --validate-only         Validate every source without writing output\n');
      process.exit(0);
    } else throw new Error(`Unknown argument: ${token}`);
  }
  return options;
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, stableValue(value[key])]));
  }
  return value;
}

function stableJson(value) {
  return JSON.stringify(stableValue(value));
}

function sha256Buffer(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function sha256Canonical(value) {
  return sha256Buffer(Buffer.from(stableJson(value)));
}

async function sha256File(file) {
  return sha256Buffer(await fs.readFile(file));
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

function normalized(value) {
  return String(value ?? '').normalize('NFKC').replace(/\s+/g, ' ').trim();
}

function positiveInteger(value, label) {
  const result = Number(value);
  assert.ok(Number.isInteger(result) && result > 0, `${label}: expected a positive integer, got ${value}`);
  return result;
}

function assertExactQuestionSequence(rows, label) {
  const numbers = rows.map(row => row.question).sort((a, b) => a - b);
  assert.deepEqual(numbers, Array.from({ length: 40 }, (_, index) => index + 1), `${label}: Q1–Q40 must occur exactly once`);
}

function assertUnder(candidate, root, label) {
  const absolute = path.resolve(candidate);
  const base = path.resolve(root);
  assert.ok(absolute === base || absolute.startsWith(`${base}${path.sep}`), `${label}: path escapes source root: ${absolute}`);
  return absolute;
}

function directQuestionNumber(question) {
  const match = String(question.id ?? '').match(/q(\d+)$/i);
  assert.ok(match, `Question has no numeric id: ${question.id}`);
  return positiveInteger(match[1], question.id);
}

function projectCanonicalQuestions(mock, skill) {
  const rows = [];
  for (const section of mock.sections.filter(candidate => candidate.skill === skill)) {
    assert.ok(!section.comingSoon, `${mock.id}/${skill}: incomplete canonical section`);
    for (const question of section.questions) {
      assert.ok(question.type === 'fill' || question.type === 'mcq', `${mock.id}/${skill}/${question.id}: unsupported type ${question.type}`);
      const number = directQuestionNumber(question);
      if (question.type === 'fill') {
        assert.ok(Array.isArray(question.answers) && question.answers.length > 0, `${mock.id}/${skill}/Q${number}: missing accepted answers`);
        rows.push({
          question: number,
          responseKey: question.id,
          responseType: 'fill',
          questionText: String(question.text),
          acceptedResponses: question.answers.map(String),
        });
      } else {
        assert.ok(Array.isArray(question.options) && question.options.length >= 2, `${mock.id}/${skill}/Q${number}: missing options`);
        assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length,
          `${mock.id}/${skill}/Q${number}: invalid option index`);
        rows.push({
          question: number,
          responseKey: question.id,
          responseType: 'mcq',
          questionText: String(question.text),
          correctOptionIndex: question.answer,
          correctOptionText: String(question.options[question.answer]),
        });
      }
    }
  }
  assertExactQuestionSequence(rows, `${mock.id}/${skill}/canonical projection`);
  return new Map(rows.map(row => [row.question, row]));
}

function ledgerQuestion(row, label) {
  return positiveInteger(row.question ?? row.number ?? row.q ?? row.itemId, label);
}

function guidedListeningQuestion(setNumber, sourceQuestion) {
  if (setNumber === 32 && sourceQuestion === 39) return 40;
  if (setNumber === 32 && sourceQuestion === 40) return 39;
  return sourceQuestion;
}

function readingLocator(row) {
  if (row.evidence && typeof row.evidence === 'object') {
    const passageMatch = String(row.evidence.passageId ?? '').match(/(\d+)/);
    if (passageMatch && row.evidence.paragraphLabel) {
      return { passage: Number(passageMatch[1]), paragraph: String(row.evidence.paragraphLabel) };
    }
  }
  if (row.locator) {
    const match = String(row.locator).match(/^P(\d+):([^:]+)$/i);
    if (match) return { passage: Number(match[1]), paragraph: match[2] };
  }
  if (row.evidenceLocation) {
    const match = String(row.evidenceLocation).match(/^passage-(\d+):([^:]+)$/i);
    if (match) return { passage: Number(match[1]), paragraph: match[2] };
  }
  if (row.passage && row.paragraph) return { passage: Number(row.passage), paragraph: String(row.paragraph) };
  return null;
}

function paragraphExcerpt(passage, paragraphLabel) {
  const lines = String(passage).split('\n');
  const range = normalized(paragraphLabel).toUpperCase().match(/^([A-Z])(?:-([A-Z]))?$/);
  assert.ok(range, `Unsupported paragraph locator: ${paragraphLabel}`);
  const firstLabel = range[1];
  const lastLabel = range[2] ?? firstLabel;
  const heading = new RegExp(`^${firstLabel}(?:\\s|$)`);
  const start = lines.findIndex(line => heading.test(normalized(line).toUpperCase()));
  assert.ok(start >= 0, `Paragraph ${paragraphLabel} not found`);
  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    const next = normalized(lines[index]).match(/^([A-Z])(?:\s|$)/);
    if (next && next[1] > lastLabel) {
      end = index;
      break;
    }
  }
  const excerpt = lines.slice(start, end).join('\n').trim();
  assert.ok(excerpt.length > 0, `Paragraph ${paragraphLabel} is empty`);
  assert.ok(String(passage).includes(excerpt), `Paragraph ${paragraphLabel} is not an exact source excerpt`);
  return excerpt;
}

function readingEvidenceText(row) {
  if (typeof row.evidence === 'string') return row.evidence;
  if (row.evidence && typeof row.evidence === 'object') return row.evidence.quotedSupport;
  return null;
}

function resolveReadingExcerpt(row, readingSections, label) {
  const candidate = readingEvidenceText(row);
  if (candidate) {
    const exactPassage = readingSections.find(section => normalized(section.passage).includes(normalized(candidate)));
    if (exactPassage) return { sourceExcerpt: String(candidate), sourceExcerptBasis: 'ANSWER_EVIDENCE_LEDGER_EXACT_QUOTE' };
  }
  const locator = readingLocator(row);
  assert.ok(locator, `${label}: ledger evidence is not an exact quote and has no resolvable paragraph locator`);
  const section = readingSections[locator.passage - 1];
  assert.ok(section, `${label}: passage ${locator.passage} is absent from canonical mock`);
  const locatorParts = String(locator.paragraph).split(',').map(part => part.trim()).filter(Boolean);
  assert.ok(locatorParts.length > 0, `${label}: empty paragraph locator`);
  const excerpts = locatorParts.map(part => paragraphExcerpt(section.passage, part));
  return {
    sourceExcerpt: excerpts[0],
    ...(excerpts.length > 1 ? { additionalSourceExcerpts: excerpts.slice(1) } : {}),
    sourceExcerptBasis: 'ANSWER_EVIDENCE_LEDGER_LOCATOR_TO_CANONICAL_PARAGRAPH',
  };
}

function compactExcerpt(value, maximum = 240) {
  const compact = normalized(value);
  if (compact.length <= maximum) return compact;
  return `${compact.slice(0, maximum).replace(/\s+\S*$/, '')}…`;
}

const READING_EXCERPT_OVERRIDES = new Map([
  ['31:3', { passage: 1, paragraph: 'B', reason: 'The ledger quote omits the accepted noun; paragraph B contains the exact answer and the physical process.' }],
]);

const READING_SUPPORT_OVERRIDES = new Map([
  ['31:3', 'Water must migrate slowly through the outer wall before it can evaporate, so a glazed vessel performs poorly even if the sand inside remains wet. At the other extreme, clay with very large pores may leak faster than evaporation can use the water.'],
  ['31:28', 'Neither pattern is a guarantee. Tightly clustered members can share a model error, so low spread sometimes gives false confidence.'],
  ['33:10', 'If a label was unclear, the safest response was not to guess but to divert the carrier for manual checking.'],
  ['34:7', 'Yet the cylinder box remains instructive because its programme is visible.'],
  ['34:27', 'Its legitimacy depends on the stage at which it is used. Random admission before basic screening raises a different issue from random selection among candidates already judged suitable.'],
  ['35:15', 'Yet handmade samples varied, and pigments changed with age. A reference could stabilise a discussion while slowly becoming less like the colour it was supposed to preserve.'],
  ['35:29', 'Different objectives produce different queues.'],
  ['36:38', 'The aim is not to suppress communication but to keep one narrative from consuming all attention.'],
  ['36:40', 'They cannot guarantee recovery, because the evidence may never be present or observable.'],
  ['37:19', 'Even so, the beam samples selected locations rather than the entire three-dimensional structure.'],
  ['39:7', 'Street sweepers illustrate a wider point about municipal technology: successive patents improve components, while the public outcome still depends on routing, staffing and the definition of an acceptably clean street.'],
  ['39:20', 'These positions are not resolved by laboratory measurements alone.'],
  ['39:26', 'Spatial pattern is therefore not a clock unless exposure has been measured independently.'],
  ['39:32', 'The equality is moral and administrative; it does not mean that every task demands identical training or effort.'],
  ['40:18', 'They are separated, washed and dried before grading. A consistent particle size simplifies storage and application, while laboratory analysis confirms nutrient content.'],
]);

const READING_STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'been', 'being', 'but', 'by', 'can', 'could',
  'did', 'do', 'does', 'for', 'from', 'had', 'has', 'have', 'he', 'her', 'his', 'how', 'if',
  'in', 'into', 'is', 'it', 'its', 'may', 'might', 'more', 'most', 'not', 'of', 'on', 'one',
  'or', 'our', 'should', 'so', 'some', 'than', 'that', 'the', 'their', 'there', 'these', 'they',
  'this', 'those', 'to', 'was', 'were', 'what', 'when', 'where', 'which', 'who', 'why', 'will',
  'with', 'would', 'you', 'your', 'true', 'false', 'yes', 'no', 'given', 'stated',
  'according', 'author', 'believes', 'following', 'passage', 'says', 'states', 'statement', 'suggests',
]);

function readingTokens(value) {
  return normalized(value).toLowerCase().match(/[\p{L}\p{N}]+/gu)
    ?.filter(token => token.length > 2 && !READING_STOP_WORDS.has(token)) ?? [];
}

function passageSentences(value) {
  return normalized(value)
    .split(/(?<=[.!?])\s+/)
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 25);
}

function bestEvidenceSentence(responseBinding, excerpt) {
  const candidates = passageSentences(excerpt.sourceExcerpt);
  if (candidates.length === 0) return compactExcerpt(excerpt.sourceExcerpt);
  const answerValues = responseBinding.responseType === 'fill'
    ? responseBinding.acceptedResponses
    : [responseBinding.correctOptionText];
  for (const answer of answerValues) {
    const exact = candidates.find(sentence => normalized(sentence).toLowerCase().includes(normalized(answer).toLowerCase()));
    if (exact) return compactExcerpt(exact);
  }
  const target = new Set(readingTokens(`${responseBinding.questionText} ${answerValues.join(' ')}`));
  return compactExcerpt(candidates
    .map((sentence, index) => ({
      sentence,
      index,
      score: readingTokens(sentence).filter(token => target.has(token)).length,
    }))
    .sort((left, right) => right.score - left.score || left.index - right.index)[0].sentence);
}

function conceptBridge(left, right, maximum = 6) {
  const rightTokens = new Set(readingTokens(right));
  return [...new Set(readingTokens(left).filter(token => rightTokens.has(token)))].slice(0, maximum);
}

function missingConcepts(statement, passage, maximum = 8) {
  const passageTokens = new Set(readingTokens(passage));
  return [...new Set(readingTokens(statement).filter(token => !passageTokens.has(token)))].slice(0, maximum);
}

function quotedConcepts(values) {
  return values.length ? values.map(value => `«${value}»`).join(', ') : 'la misma relación descrita en la pregunta';
}

function guidedReadingRationale(setNumber, responseBinding, excerpt, fullPassage) {
  const question = normalized(responseBinding.questionText);
  const overrideKey = `${setNumber}:${responseBinding.question}`;
  const supportOverride = READING_SUPPORT_OVERRIDES.get(overrideKey);
  if (supportOverride) {
    assert.ok(normalized(excerpt.sourceExcerpt).includes(normalized(supportOverride)),
      `Set ${setNumber} Reading Q${responseBinding.question}: targeted support is not literal in bound excerpt`);
  }
  const support = supportOverride ?? bestEvidenceSentence(responseBinding, excerpt);
  if (responseBinding.responseType === 'fill') {
    const answers = responseBinding.acceptedResponses.map(answer => `«${answer}»`).join(' / ');
    const bridge = conceptBridge(question, support);
    return `El hueco aparece en «${question}» y acepta ${answers}. La oración fuente dice «${support}». Esa oración contiene la respuesta y la conecta con ${quotedConcepts(bridge)}, de modo que completa el significado y no sólo coincide como una palabra aislada.`;
  }

  const key = normalized(responseBinding.correctOptionText);
  const normalizedKey = key.toUpperCase();
  if (normalizedKey === 'NOT GIVEN' || normalizedKey === 'NOT STATED') {
    const absent = missingConcepts(question, fullPassage);
    return `La proposición ausente es «${question}». El pasaje sí ofrece el contexto «${support}», pero en el texto completo no especifica ${quotedConcepts(absent)} ni afirma lo contrario de la proposición. Por eso la ausencia concreta, y no una contradicción, conduce a ${key}.`;
  }
  if (normalizedKey === 'FALSE' || normalizedKey === 'NO') {
    const bridge = conceptBridge(question, support);
    const claimOnly = missingConcepts(question, support, 6);
    const sourceOnly = missingConcepts(support, question, 6);
    return `La proposición afirma «${question}», mientras el pasaje dice «${support}». Ambos tratan ${quotedConcepts(bridge)}, pero la proposición añade ${quotedConcepts(claimOnly)} donde la fuente especifica ${quotedConcepts(sourceOnly)}. Esa diferencia verificable niega la relación formulada y justifica ${key}.`;
  }
  if (normalizedKey === 'TRUE' || normalizedKey === 'YES') {
    const bridge = conceptBridge(question, support);
    return `La proposición afirma «${question}» y el pasaje dice «${support}». La fuente conserva la misma relación mediante ${quotedConcepts(bridge)} y no introduce una condición opuesta; por ello el apoyo es positivo y la clave es ${key}.`;
  }
  const bridge = conceptBridge(`${question} ${key}`, support);
  return `La pregunta pide «${question}» y la clave es «${key}». La evidencia dice «${support}». La coincidencia semántica se apoya en ${quotedConcepts(bridge)}: esos elementos enlazan el foco de la pregunta y la opción con la información del pasaje, mientras las demás opciones carecen de ese vínculo en el tramo citado.`;
}

function wholeFileHashes(receipt) {
  if (!receipt || typeof receipt !== 'object') return [];
  return Object.entries(receipt)
    .filter(([key, value]) => /(?:wholeFileSha256|rawWholeFileSha256)$/i.test(key) && /^[a-f0-9]{64}$/i.test(String(value)))
    .map(([, value]) => String(value).toLowerCase());
}

function resolveContentSource(moduleControl, moduleName, setNumber) {
  const candidates = [
    moduleControl?.provenanceReceipt?.source,
    moduleControl?.contentReceipt?.contentArtifactPath,
    moduleControl?.authorContentReceipt?.contentPath,
  ].filter(candidate => typeof candidate === 'string' && candidate.endsWith('.json'));
  assert.ok(candidates.length > 0, `Set ${setNumber} ${moduleName}: no active content source in batch control`);
  assert.equal(new Set(candidates).size, 1, `Set ${setNumber} ${moduleName}: active content sources disagree`);
  return path.resolve(candidates[0]);
}

async function assertReceiptBindsFile(moduleControl, file, label) {
  const actual = await sha256File(file);
  const expected = [
    ...wholeFileHashes(moduleControl?.provenanceReceipt),
    ...wholeFileHashes(moduleControl?.contentReceipt),
    ...wholeFileHashes(moduleControl?.authorContentReceipt),
  ];
  assert.ok(expected.length > 0, `${label}: control has no whole-file hash`);
  assert.ok(expected.includes(actual), `${label}: current source hash ${actual} is not bound by active control`);
  return actual;
}

function withIntegrity(payload) {
  return {
    ...payload,
    integrity: {
      algorithm: 'SHA-256 canonical JSON excluding integrity',
      payloadSha256: sha256Canonical(payload),
    },
  };
}

function assertPendingArtifact(artifact, label) {
  assert.equal(artifact.status, REVIEW_STATE, `${label}: top-level review state`);
  assert.equal(artifact.releaseAuthorized, false, `${label}: release authorization must remain false`);
  for (const row of artifact.reading.rows) assert.equal(row.status, REVIEW_STATE, `${label}/Reading/Q${row.question}`);
  for (const row of artifact.listening.bindings) assert.equal(row.status, REVIEW_STATE, `${label}/Listening/Q${row.question}`);
  assert.ok(!stableJson(artifact).includes('"status":"APPROVED"'), `${label}: approval state is forbidden`);
  const { integrity, ...payload } = artifact;
  assert.equal(integrity.payloadSha256, sha256Canonical(payload), `${label}: payload integrity mismatch`);
}

async function buildReading(setNumber, mock, moduleControl, productionRoot) {
  const sourcePath = assertUnder(resolveContentSource(moduleControl, 'reading', setNumber), productionRoot, `Set ${setNumber} Reading source`);
  const sourceSha256 = await assertReceiptBindsFile(moduleControl, sourcePath, `Set ${setNumber} Reading source`);
  const content = await readJson(sourcePath);
  assert.ok(Array.isArray(content.answerEvidenceLedger), `Set ${setNumber} Reading: answerEvidenceLedger is absent`);
  assert.equal(content.answerEvidenceLedger.length, 40, `Set ${setNumber} Reading: answerEvidenceLedger must have 40 rows`);
  const canonicalQuestions = projectCanonicalQuestions(mock, 'reading');
  const readingSections = mock.sections.filter(section => section.skill === 'reading');
  assert.equal(readingSections.length, 3, `Set ${setNumber} Reading: canonical mock must have three passages`);

  const rows = content.answerEvidenceLedger.map((ledgerRow, index) => {
    const question = ledgerQuestion(ledgerRow, `Set ${setNumber} Reading ledger row ${index + 1}`);
    const sourceLedgerRationale = normalized(ledgerRow.rationale ?? ledgerRow.reason);
    assert.ok(sourceLedgerRationale, `Set ${setNumber} Reading Q${question}: missing rationale`);
    let excerpt = resolveReadingExcerpt(ledgerRow, readingSections, `Set ${setNumber} Reading Q${question}`);
    const excerptOverride = READING_EXCERPT_OVERRIDES.get(`${setNumber}:${question}`);
    if (excerptOverride) {
      const section = readingSections[excerptOverride.passage - 1];
      assert.ok(section, `Set ${setNumber} Reading Q${question}: targeted passage is absent`);
      excerpt = {
        sourceExcerpt: paragraphExcerpt(section.passage, excerptOverride.paragraph),
        sourceExcerptBasis: 'TARGETED_CANONICAL_PARAGRAPH_REMEDIATION',
        remediationReason: excerptOverride.reason,
      };
    }
    const responseBinding = canonicalQuestions.get(question);
    assert.ok(responseBinding, `Set ${setNumber} Reading Q${question}: canonical question is absent`);
    const canonicalSection = readingSections.find(section =>
      section.questions.some(candidate => candidate.id === responseBinding.responseKey));
    assert.ok(canonicalSection, `Set ${setNumber} Reading Q${question}: canonical passage is absent`);
    return {
      question,
      status: REVIEW_STATE,
      responseBinding,
      ...excerpt,
      rationale: guidedReadingRationale(setNumber, responseBinding, excerpt, canonicalSection.passage),
      sourceLedgerRationale,
      ledgerRowSha256: sha256Canonical(ledgerRow),
      ...(readingLocator(ledgerRow) ? { ledgerLocator: readingLocator(ledgerRow) } : {}),
    };
  });
  assertExactQuestionSequence(rows, `Set ${setNumber} Reading evidence`);

  return {
    status: REVIEW_STATE,
    rowCount: rows.length,
    rows: rows.sort((a, b) => a.question - b.question),
    provenance: {
      contentArtifact: { path: sourcePath, sha256: sourceSha256 },
      answerEvidenceLedgerCanonicalSha256: sha256Canonical(content.answerEvidenceLedger),
      canonicalQuestionProjectionSha256: sha256Canonical([...canonicalQuestions.values()]),
    },
  };
}

function listeningLedgerSegment(row) {
  return row.evidenceEntry ?? row.segmentId ?? row.turnId;
}

function listeningLedgerEvidence(row) {
  return row.answerBearingSpan ?? row.anchor ?? row.quote ?? row.evidence ?? row.evidenceText ?? row.answerAnchor;
}

function wavMetadata(buffer, label) {
  assert.equal(buffer.toString('ascii', 0, 4), 'RIFF', `${label}: not RIFF`);
  assert.equal(buffer.toString('ascii', 8, 12), 'WAVE', `${label}: not WAVE`);
  let offset = 12;
  let format = null;
  let data = null;
  while (offset + 8 <= buffer.length) {
    const chunkId = buffer.toString('ascii', offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const start = offset + 8;
    assert.ok(start + size <= buffer.length, `${label}: truncated ${chunkId} chunk`);
    if (chunkId === 'fmt ') format = buffer.subarray(start, start + size);
    else if (chunkId === 'data') data = buffer.subarray(start, start + size);
    offset = start + size + (size % 2);
  }
  assert.ok(format && format.length >= 16, `${label}: missing fmt chunk`);
  assert.ok(data, `${label}: missing data chunk`);
  const audioFormat = format.readUInt16LE(0);
  const channels = format.readUInt16LE(2);
  const sampleRate = format.readUInt32LE(4);
  const blockAlign = format.readUInt16LE(12);
  const bitsPerSample = format.readUInt16LE(14);
  assert.ok(blockAlign > 0 && data.length % blockAlign === 0, `${label}: invalid frame alignment`);
  return { audioFormat, channels, sampleRate, blockAlign, bitsPerSample, frameCount: data.length / blockAlign, data };
}

async function wavFileMetadata(file) {
  return wavMetadata(await fs.readFile(file), file);
}

function seconds(frames, sampleRate) {
  return frames / sampleRate;
}

function roundSeconds(value) {
  return Number(value.toFixed(6));
}

function trimFloat32EdgeFrames(metadata) {
  assert.equal(metadata.audioFormat, 3, 'Edge-trim candidate requires IEEE-float WAV');
  assert.equal(metadata.channels, 1, 'Edge-trim candidate requires mono WAV');
  assert.equal(metadata.bitsPerSample, 32, 'Edge-trim candidate requires float32 WAV');
  const threshold = 10 ** (-50 / 20);
  let first = -1;
  let last = -1;
  for (let frame = 0; frame < metadata.frameCount; frame += 1) {
    if (Math.abs(metadata.data.readFloatLE(frame * metadata.blockAlign)) > threshold) {
      if (first < 0) first = frame;
      last = frame;
    }
  }
  if (first < 0) return metadata.frameCount;
  const retain = Math.floor(metadata.sampleRate * 0.08);
  const start = Math.max(0, first - retain);
  const end = Math.min(metadata.frameCount, last + retain + 1);
  return end - start < Math.floor(metadata.sampleRate * 0.5) ? metadata.frameCount : end - start;
}

async function chatterboxTimeline(plan, cacheDir, masterPath) {
  const master = await wavFileMetadata(masterPath);
  assert.equal(master.sampleRate, 44100, 'Set 22 master sample rate must be 44.1 kHz');
  const candidates = [];
  for (const mode of ['RAW_CACHE_EDGES', 'TRIM_FLOAT32_EDGES']) {
    let cursorFrames = 0;
    let spokenIndex = 0;
    let sourceRate = null;
    const windows = new Map();
    const cacheBindings = [];
    for (const segment of plan.segments) {
      if (segment.kind === 'silence') {
        assert.ok(sourceRate, 'Set 22 timeline begins with silence before sample rate is known');
        cursorFrames += Math.floor(sourceRate * Number(segment.pause_after_seconds ?? 0));
        continue;
      }
      spokenIndex += 1;
      const safeId = String(segment.segment_id).replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-|-$/g, '');
      const audioPath = path.join(cacheDir, `${String(spokenIndex).padStart(3, '0')}-${safeId}.wav`);
      const metadata = await wavFileMetadata(audioPath);
      sourceRate ??= metadata.sampleRate;
      assert.equal(metadata.sampleRate, sourceRate, `Set 22 cache rate mismatch: ${audioPath}`);
      assert.equal(metadata.channels, 1, `Set 22 cache must be mono: ${audioPath}`);
      cursorFrames += Math.floor(sourceRate * Number(segment.pause_before_seconds ?? 0));
      const frameCount = mode === 'TRIM_FLOAT32_EDGES' && segment.kind === 'script-turn'
        ? trimFloat32EdgeFrames(metadata)
        : metadata.frameCount;
      const startFrames = cursorFrames;
      cursorFrames += frameCount;
      const endFrames = cursorFrames;
      let padding = Number(segment.pause_after_seconds ?? 0);
      if (segment.window_seconds != null) {
        padding += Math.max(0, Number(segment.window_seconds) - seconds(frameCount, sourceRate));
      }
      cursorFrames += Math.floor(sourceRate * padding);
      windows.set(segment.segment_id, { startFrames, endFrames, sourceRate });
      cacheBindings.push({ path: audioPath, sha256: await sha256File(audioPath) });
    }
    const calculatedDuration = seconds(cursorFrames, sourceRate);
    const masterDuration = seconds(master.frameCount, master.sampleRate);
    candidates.push({ mode, windows, cacheBindings, sourceRate, calculatedDuration, masterDuration,
      deltaSeconds: Math.abs(calculatedDuration - masterDuration) });
  }
  const matching = candidates.filter(candidate => candidate.deltaSeconds <= 4 / master.sampleRate);
  assert.equal(matching.length, 1,
    `Set 22: cache assembly does not uniquely reproduce master duration (${candidates.map(c => `${c.mode}=${c.deltaSeconds.toFixed(6)}s`).join(', ')})`);
  const selected = matching[0];
  const sampleRounded = new Map([...selected.windows].map(([segmentId, window]) => {
    const startFrame = Math.round(seconds(window.startFrames, window.sourceRate) * master.sampleRate);
    const endFrame = Math.round(seconds(window.endFrames, window.sourceRate) * master.sampleRate);
    return [segmentId, {
      startFrame,
      endFrame,
      sampleRateHz: master.sampleRate,
      startSeconds: roundSeconds(startFrame / master.sampleRate),
      endSeconds: roundSeconds(endFrame / master.sampleRate),
    }];
  }));
  return { ...selected, windows: sampleRounded, master };
}

function concatPath(line, concatFile) {
  const match = line.match(/^file '(.+)'$/);
  assert.ok(match, `${concatFile}: invalid concat line: ${line}`);
  return path.resolve(match[1].replace(/'\\''/g, "'"));
}

async function elevenV4Timeline(setNumber, planPath, plan, productionRoot) {
  const directory = path.join(productionRoot, `set-${setNumber}/listening/elevenlabs-v4`);
  const manifestPath = path.join(directory, `set${setNumber}-eleven-v4-manifest.json`);
  const progressPath = path.join(directory, `set${setNumber}-eleven-v4-progress.json`);
  const qaPath = path.join(directory, `set${setNumber}-eleven-v4-qa.json`);
  const concatFile = path.join(directory, `set${setNumber}-concat.txt`);
  const manifest = await readJson(manifestPath);
  const progress = await readJson(progressPath);
  const qa = await readJson(qaPath);
  assert.equal(manifest.set, setNumber, `Set ${setNumber}: ElevenLabs manifest set mismatch`);
  assert.equal(await sha256File(planPath), manifest.sourcePlan.sha256, `Set ${setNumber}: ElevenLabs manifest plan hash mismatch`);
  assert.equal(path.resolve(manifest.sourcePlan.path), path.resolve(planPath), `Set ${setNumber}: ElevenLabs manifest plan path mismatch`);
  assert.equal(qa.gates.technicalQa, 'PASS', `Set ${setNumber}: technical QA is not PASS`);
  assert.equal(qa.gates.asr, 'PASS', `Set ${setNumber}: focal ASR is not PASS`);
  assert.equal(qa.gates.humanListening, 'PENDING', `Set ${setNumber}: human listening must remain pending`);
  assert.equal(qa.gates.release, 'NOT_APPROVED', `Set ${setNumber}: release gate must remain closed`);

  const masterPath = assertUnder(manifest.outputs.wav, directory, `Set ${setNumber} v4 master`);
  const mp3Path = assertUnder(manifest.outputs.mp3, directory, `Set ${setNumber} v4 MP3`);
  assert.equal(await sha256File(masterPath), qa.audio.wavSha256, `Set ${setNumber}: v4 master hash mismatch`);
  assert.equal(await sha256File(mp3Path), qa.audio.mp3Sha256, `Set ${setNumber}: v4 MP3 hash mismatch`);
  const master = await wavFileMetadata(masterPath);
  const lines = (await fs.readFile(concatFile, 'utf8')).split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  assert.ok(lines.length > 0, `Set ${setNumber}: empty concat list`);
  let cursorFrames = 0;
  let concatRate = null;
  const chunkWindows = new Map();
  const concatBindings = [];
  for (const line of lines) {
    const piecePath = assertUnder(concatPath(line, concatFile), path.join(directory, 'chunks'), `Set ${setNumber} concat piece`);
    const metadata = await wavFileMetadata(piecePath);
    concatRate ??= metadata.sampleRate;
    assert.equal(metadata.sampleRate, concatRate, `Set ${setNumber}: concat sample-rate mismatch`);
    assert.equal(metadata.channels, 1, `Set ${setNumber}: concat piece is not mono`);
    const startFrames = cursorFrames;
    cursorFrames += metadata.frameCount;
    const basename = path.basename(piecePath);
    const chunkMatch = basename.match(/^(chunk-\d+)(?:-paced)?\.wav$/);
    if (chunkMatch) {
      assert.ok(!chunkWindows.has(chunkMatch[1]), `Set ${setNumber}: chunk appears twice in concat list: ${chunkMatch[1]}`);
      chunkWindows.set(chunkMatch[1], { startFrames, endFrames: cursorFrames });
    }
    concatBindings.push({ path: piecePath, sha256: await sha256File(piecePath), frameCount: metadata.frameCount });
  }
  assert.equal(concatRate, master.sampleRate, `Set ${setNumber}: concat/master sample-rate mismatch`);
  assert.equal(cursorFrames, master.frameCount, `Set ${setNumber}: concat frames do not exactly equal master frames`);
  const manifestChunks = new Map(manifest.chunks.map(chunk => [chunk.id, chunk]));
  assert.equal(chunkWindows.size, manifestChunks.size, `Set ${setNumber}: concat/manifest chunk count mismatch`);
  for (const [chunkId, chunk] of manifestChunks) {
    assert.ok(chunkWindows.has(chunkId), `Set ${setNumber}: ${chunkId} absent from concat list`);
    for (const input of chunk.inputs) {
      const planSegment = plan.segments.find(segment => segment.segment_id === input.segmentId);
      assert.ok(planSegment, `Set ${setNumber}: ${chunkId}/${input.segmentId} absent from source plan`);
      assert.equal(input.textSha256, sha256Buffer(Buffer.from(planSegment.text)),
        `Set ${setNumber}: ${chunkId}/${input.segmentId} text hash is not bound to plan`);
    }
  }
  assert.equal(progress.status, 'AUDIO_CHUNKS_COMPLETE', `Set ${setNumber}: audio chunk cache is incomplete`);
  assert.equal(new Set(progress.completed ?? []).size, manifest.chunks.length,
    `Set ${setNumber}: progress receipt does not cover every rendered chunk`);
  if (progress.assembly) {
    assert.ok(Number(progress.assembly.durationSeconds) > 0, `Set ${setNumber}: invalid assembly duration receipt`);
    assert.ok(Math.abs(Number(progress.assembly.durationSeconds) - seconds(master.frameCount, master.sampleRate)) <= 0.01,
      `Set ${setNumber}: progress duration does not bind master`);
  }

  return {
    manifestPath,
    progressPath,
    qaPath,
    concatFile,
    manifest,
    masterPath,
    mp3Path,
    master,
    chunkWindows,
    manifestChunks,
    concatBindings,
  };
}

function planAnchors(plan) {
  const anchors = new Map();
  for (const segment of plan.segments) {
    for (const question of segment.question_anchor ?? []) {
      const number = positiveInteger(question, `${segment.segment_id} question anchor`);
      assert.ok(!anchors.has(number), `Plan Q${number} has multiple answer segments`);
      anchors.set(number, segment.segment_id);
    }
  }
  assert.ok(anchors.size === 0 || anchors.size === 40, `Plan must provide either zero or exactly 40 question anchors, got ${anchors.size}`);
  return anchors;
}

function planSegmentMap(plan, label) {
  const entries = plan.segments.map(segment => [segment.segment_id, segment]);
  assert.equal(new Set(entries.map(([id]) => id)).size, entries.length, `${label}: duplicate segment ids`);
  return new Map(entries);
}

async function buildSet21Listening(setNumber, mock, canonicalQuestions, productionRoot) {
  const directory = path.join(productionRoot, 'set-21/listening');
  const qaPath = path.join(directory, 'set21-listening-asr-focal-master-v1.0.0.json');
  const qa = await readJson(qaPath);
  assert.equal(qa.set, 21, 'Set 21 focal QA set mismatch');
  assert.equal(qa.decision, 'PASS', 'Set 21 focal QA is not PASS');
  assert.equal(qa.humanListeningDecision, 'PENDING_EXTERNAL_HUMAN_REVIEW', 'Set 21 human listening must remain pending');
  assert.equal(qa.releaseDecision, 'NOT_APPROVED', 'Set 21 release gate must remain closed');
  assert.equal(qa.answerCoverage.length, 40, 'Set 21 focal QA must have 40 rows');
  const masterPath = assertUnder(qa.audio.path, directory, 'Set 21 master');
  assert.equal(await sha256File(masterPath), qa.audio.sha256, 'Set 21 master hash mismatch');
  const master = await wavFileMetadata(masterPath);
  const mp3Path = path.join(directory, 'ielts-set-21-listening.mp3');
  const bindings = qa.answerCoverage.map((row, index) => {
    const question = positiveInteger(row.question, `Set 21 focal row ${index + 1}`);
    assert.ok(row.masterWindow && Number.isFinite(row.masterWindow.startSeconds) && Number.isFinite(row.masterWindow.endSeconds),
      `Set 21 Listening Q${question}: missing master window`);
    assert.ok(row.masterWindow.startSeconds >= 0 && row.masterWindow.endSeconds > row.masterWindow.startSeconds,
      `Set 21 Listening Q${question}: invalid master window`);
    assert.ok(row.masterWindow.endSeconds <= seconds(master.frameCount, master.sampleRate),
      `Set 21 Listening Q${question}: window exceeds master`);
    const responseBinding = canonicalQuestions.get(question);
    assert.ok(responseBinding, `Set 21 Listening Q${question}: canonical question absent`);
    assert.ok(normalized(row.directMasterTranscript), `Set 21 Listening Q${question}: missing direct-master transcript`);
    return {
      question,
      status: REVIEW_STATE,
      responseBinding,
      evidenceSegment: String(row.evidenceSegment),
      audiblePhrase: String(row.directMasterTranscript),
      timecode: {
        startSeconds: row.masterWindow.startSeconds,
        endSeconds: row.masterWindow.endSeconds,
        basis: 'EXISTING_SET21_DIRECT_CURRENT_MASTER_FOCAL_WINDOW',
      },
      sourceRowSha256: sha256Canonical(row),
    };
  });
  assertExactQuestionSequence(bindings, 'Set 21 Listening evidence');
  return {
    status: REVIEW_STATE,
    bindingCount: bindings.length,
    bindings: bindings.sort((a, b) => a.question - b.question),
    provenance: {
      method: 'EXISTING_SET21_EXACT_WINDOWS',
      focalQa: { path: qaPath, sha256: await sha256File(qaPath) },
      masterWav: { path: masterPath, sha256: await sha256File(masterPath), frameCount: master.frameCount, sampleRateHz: master.sampleRate },
      deliveryMp3: { path: mp3Path, sha256: await sha256File(mp3Path) },
    },
  };
}

async function buildPlannedListening(setNumber, mock, moduleControl, productionRoot, workRoot) {
  const contentPath = assertUnder(resolveContentSource(moduleControl, 'listening', setNumber), productionRoot,
    `Set ${setNumber} Listening source`);
  const contentSha256 = await assertReceiptBindsFile(moduleControl, contentPath, `Set ${setNumber} Listening source`);
  const content = await readJson(contentPath);
  assert.ok(Array.isArray(content.answerEvidenceLedger), `Set ${setNumber} Listening: answerEvidenceLedger absent`);
  assert.equal(content.answerEvidenceLedger.length, 40, `Set ${setNumber} Listening: ledger must have 40 rows`);
  const ledger = new Map();
  for (let index = 0; index < content.answerEvidenceLedger.length; index += 1) {
    const row = content.answerEvidenceLedger[index];
    const sourceQuestion = ledgerQuestion(row, `Set ${setNumber} Listening ledger row ${index + 1}`);
    const question = guidedListeningQuestion(setNumber, sourceQuestion);
    assert.ok(!ledger.has(question), `Set ${setNumber} Listening: duplicate ledger Q${question}`);
    assert.ok(normalized(listeningLedgerEvidence(row)), `Set ${setNumber} Listening Q${question}: missing audible evidence`);
    ledger.set(question, { row, sourceQuestion });
  }
  assertExactQuestionSequence([...ledger].map(([question]) => ({ question })), `Set ${setNumber} Listening ledger`);

  const planPath = assertUnder(path.join(workRoot, `set-${setNumber}/set${setNumber}-audio-production-plan.json`), workRoot,
    `Set ${setNumber} Listening plan`);
  const plan = await readJson(planPath);
  assert.equal(plan.set, setNumber, `Set ${setNumber}: plan set mismatch`);
  assert.equal(path.resolve(plan.source.path), contentPath, `Set ${setNumber}: plan source path mismatch`);
  assert.equal(plan.source.sha256, contentSha256, `Set ${setNumber}: plan source hash mismatch`);
  const segments = planSegmentMap(plan, `Set ${setNumber} plan`);
  const anchors = planAnchors(plan);
  const canonicalQuestions = projectCanonicalQuestions(mock, 'listening');
  const publicMp3Path = path.join(REPO_ROOT, `public/audio/ielts/ielts-listening-set-${setNumber}.mp3`);

  if (setNumber === 22) {
    const directory = path.join(productionRoot, 'set-22/listening');
    const masterPath = path.join(directory, 'ielts-set-22-listening-master.wav');
    const mp3Path = path.join(directory, 'ielts-set-22-listening.mp3');
    const technicalQaPath = path.join(directory, 'ielts-set-22-listening-technical-qa.json');
    const technicalQa = await readJson(technicalQaPath);
    assert.equal(technicalQa.technicalDecision, 'PASS', 'Set 22 technical QA is not PASS');
    assert.equal(technicalQa.humanListeningDecision, 'PENDING_EXTERNAL_HUMAN_REVIEW', 'Set 22 human listening must remain pending');
    assert.equal(technicalQa.releaseDecision, 'NOT_APPROVED', 'Set 22 release gate must remain closed');
    assert.equal(await sha256File(masterPath), technicalQa.outputs.masterWav.sha256, 'Set 22 technical QA master hash mismatch');
    assert.equal(await sha256File(mp3Path), technicalQa.outputs.deliveryMp3.sha256, 'Set 22 technical QA MP3 hash mismatch');
    assert.equal(await sha256File(publicMp3Path), await sha256File(mp3Path), 'Set 22 public MP3 is not the source-bound delivery MP3');
    const timeline = await chatterboxTimeline(plan, path.join(workRoot, 'set-22/audio-cache'), masterPath);
    const bindings = [];
    for (let question = 1; question <= 40; question += 1) {
      const { row, sourceQuestion } = ledger.get(question);
      const ledgerSegment = listeningLedgerSegment(row);
      const segmentId = anchors.get(question) ?? ledgerSegment;
      assert.ok(segmentId, `Set 22 Listening Q${question}: no evidence segment`);
      assert.equal(anchors.get(question), ledgerSegment, `Set 22 Listening Q${question}: plan/ledger segment mismatch`);
      const segment = segments.get(segmentId);
      assert.ok(segment && segment.kind === 'script-turn', `Set 22 Listening Q${question}: invalid evidence segment ${segmentId}`);
      const window = timeline.windows.get(segmentId);
      assert.ok(window, `Set 22 Listening Q${question}: no exact cache timeline window for ${segmentId}`);
      bindings.push({
        question,
        ...(sourceQuestion !== question ? {
          sourceLedgerQuestion: sourceQuestion,
          questionCorrection: 'SET_32_Q39_Q40_CANONICAL_ORDER_CORRECTION',
        } : {}),
        status: REVIEW_STATE,
        responseBinding: canonicalQuestions.get(question),
        evidenceSegment: segmentId,
        audiblePhrase: String(segment.text),
        timecode: { ...window, basis: `CHATTERBOX_${timeline.mode}_CACHE_ASSEMBLY_MASTER_SAMPLE_ROUNDED` },
        ledgerRowSha256: sha256Canonical(row),
        planSegmentTextSha256: sha256Buffer(Buffer.from(segment.text)),
      });
    }
    assertExactQuestionSequence(bindings, 'Set 22 Listening bindings');
    return {
      status: REVIEW_STATE,
      bindingCount: bindings.length,
      bindings,
      provenance: {
        method: `CHATTERBOX_${timeline.mode}_CACHE_ASSEMBLY`,
        contentArtifact: { path: contentPath, sha256: contentSha256 },
        answerEvidenceLedgerCanonicalSha256: sha256Canonical(content.answerEvidenceLedger),
        plan: { path: planPath, sha256: await sha256File(planPath) },
        technicalQa: { path: technicalQaPath, sha256: await sha256File(technicalQaPath) },
        masterWav: { path: masterPath, sha256: await sha256File(masterPath), frameCount: timeline.master.frameCount, sampleRateHz: timeline.master.sampleRate },
        deliveryMp3: { path: mp3Path, sha256: await sha256File(mp3Path) },
        publicMp3: { path: publicMp3Path, sha256: await sha256File(publicMp3Path) },
        cacheAggregateSha256: sha256Canonical(timeline.cacheBindings),
        calculatedDurationSeconds: roundSeconds(timeline.calculatedDuration),
        masterDurationSeconds: roundSeconds(timeline.masterDuration),
      },
    };
  }

  const v4 = await elevenV4Timeline(setNumber, planPath, plan, productionRoot);
  assert.equal(await sha256File(publicMp3Path), await sha256File(v4.mp3Path),
    `Set ${setNumber}: public MP3 is not the source-bound ElevenLabs v4 delivery MP3`);
  const chunkBySegment = new Map();
  for (const chunk of v4.manifest.chunks) {
    for (const segmentId of chunk.segmentIds) {
      assert.ok(!chunkBySegment.has(segmentId), `Set ${setNumber}: segment ${segmentId} occurs in multiple chunks`);
      chunkBySegment.set(segmentId, chunk.id);
    }
  }
  const bindings = [];
  for (let question = 1; question <= 40; question += 1) {
    const { row, sourceQuestion } = ledger.get(question);
    const ledgerSegment = listeningLedgerSegment(row);
    const segmentId = anchors.get(question) ?? ledgerSegment;
    assert.ok(segmentId, `Set ${setNumber} Listening Q${question}: no evidence segment`);
    const segment = segments.get(segmentId);
    assert.ok(segment && segment.kind === 'script-turn', `Set ${setNumber} Listening Q${question}: invalid plan segment ${segmentId}`);
    if (anchors.size === 0) assert.equal(segmentId, ledgerSegment, `Set ${setNumber} Listening Q${question}: ledger segment absent from plan`);
    const chunkId = chunkBySegment.get(segmentId);
    assert.ok(chunkId, `Set ${setNumber} Listening Q${question}: ${segmentId} absent from rendered chunk manifest`);
    const window = v4.chunkWindows.get(chunkId);
    assert.ok(window, `Set ${setNumber} Listening Q${question}: ${chunkId} absent from exact concat timeline`);
    const responseBinding = canonicalQuestions.get(question);
    assert.ok(responseBinding, `Set ${setNumber} Listening Q${question}: canonical question absent`);
    bindings.push({
      question,
      ...(sourceQuestion !== question ? {
        sourceLedgerQuestion: sourceQuestion,
        questionCorrection: 'SET_32_Q39_Q40_CANONICAL_ORDER_CORRECTION',
      } : {}),
      status: REVIEW_STATE,
      responseBinding,
      evidenceSegment: segmentId,
      ...(ledgerSegment && ledgerSegment !== segmentId ? { ledgerSegmentBeforeAudioRebind: ledgerSegment } : {}),
      renderedChunk: chunkId,
      audiblePhrase: String(segment.text),
      timecode: {
        startFrame: window.startFrames,
        endFrame: window.endFrames,
        sampleRateHz: v4.master.sampleRate,
        startSeconds: roundSeconds(seconds(window.startFrames, v4.master.sampleRate)),
        endSeconds: roundSeconds(seconds(window.endFrames, v4.master.sampleRate)),
        basis: 'ELEVENLABS_V4_EXACT_RENDERED_CHUNK_INTERVAL_FROM_CONCAT_FRAMES',
      },
      ledgerRowSha256: sha256Canonical(row),
      planSegmentTextSha256: sha256Buffer(Buffer.from(segment.text)),
    });
  }
  assertExactQuestionSequence(bindings, `Set ${setNumber} Listening bindings`);
  return {
    status: REVIEW_STATE,
    bindingCount: bindings.length,
    bindings,
    provenance: {
      method: 'ELEVENLABS_V4_EXACT_CHUNK_CONCAT_TIMELINE',
      note: 'A question window is the exact rendered chunk interval containing its answer-bearing plan segment; no intra-chunk time was estimated.',
      contentArtifact: { path: contentPath, sha256: contentSha256 },
      answerEvidenceLedgerCanonicalSha256: sha256Canonical(content.answerEvidenceLedger),
      plan: { path: planPath, sha256: await sha256File(planPath) },
      renderManifest: { path: v4.manifestPath, sha256: await sha256File(v4.manifestPath) },
      progressReceipt: { path: v4.progressPath, sha256: await sha256File(v4.progressPath) },
      technicalAndFocalQa: { path: v4.qaPath, sha256: await sha256File(v4.qaPath) },
      concatList: { path: v4.concatFile, sha256: await sha256File(v4.concatFile) },
      concatPieceAggregateSha256: sha256Canonical(v4.concatBindings),
      masterWav: { path: v4.masterPath, sha256: await sha256File(v4.masterPath), frameCount: v4.master.frameCount, sampleRateHz: v4.master.sampleRate },
      deliveryMp3: { path: v4.mp3Path, sha256: await sha256File(v4.mp3Path) },
      publicMp3: { path: publicMp3Path, sha256: await sha256File(publicMp3Path) },
    },
  };
}

async function buildArtifact(setNumber, batchSet, productionRoot, workRoot, batchPath, batchSha256, scriptSha256) {
  const mockFile = path.join(REPO_ROOT, `src/data/mocks/ielts-set-${setNumber}.ts`);
  const imported = await import(`${pathToFileURL(mockFile).href}?sha=${await sha256File(mockFile)}`);
  const mock = imported.default;
  assert.equal(mock.id, `set-${setNumber}`, `Set ${setNumber}: canonical mock id mismatch`);
  const listeningSections = mock.sections.filter(section => section.skill === 'listening');
  assert.equal(listeningSections.length, 4, `Set ${setNumber}: canonical mock must have four Listening parts`);
  const expectedAudioUrl = `/audio/ielts/ielts-listening-set-${setNumber}.mp3`;
  for (const section of listeningSections) assert.equal(section.audioUrl, expectedAudioUrl, `Set ${setNumber}: canonical audio URL mismatch`);
  const canonicalQuestions = projectCanonicalQuestions(mock, 'listening');

  const reading = await buildReading(setNumber, mock, batchSet.modules.reading, productionRoot);
  const listening = setNumber === 21
    ? await buildSet21Listening(setNumber, mock, canonicalQuestions, productionRoot)
    : await buildPlannedListening(setNumber, mock, batchSet.modules.listening, productionRoot, workRoot);

  const payload = {
    schemaVersion: 1,
    artifactType: 'IELTS_GUIDED_EVIDENCE_STAGING',
    set: setNumber,
    status: REVIEW_STATE,
    releaseAuthorized: false,
    runtimeIntegration: { connected: false },
    sourceBindings: {
      canonicalMock: { path: mockFile, sha256: await sha256File(mockFile) },
      batchControl: { path: batchPath, sha256: batchSha256 },
      generator: { path: SCRIPT_PATH, sha256: scriptSha256 },
    },
    reading,
    listening,
  };
  const artifact = withIntegrity(payload);
  assertPendingArtifact(artifact, `Set ${setNumber}`);
  return artifact;
}

async function writeAtomically(outputDir, artifacts, manifest) {
  const parent = path.dirname(outputDir);
  await fs.mkdir(parent, { recursive: true });
  try {
    await fs.access(outputDir);
    throw new Error(`Refusing to overwrite existing staging directory: ${outputDir}`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const temporary = path.join(parent, `.${path.basename(outputDir)}.tmp-${process.pid}-${Date.now()}`);
  await fs.mkdir(temporary, { recursive: false });
  try {
    for (const artifact of artifacts) {
      const filename = `set-${artifact.set}-guided-evidence-staging.json`;
      await fs.writeFile(path.join(temporary, filename), `${JSON.stringify(artifact, null, 2)}\n`, { flag: 'wx' });
    }
    await fs.writeFile(path.join(temporary, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, { flag: 'wx' });
    for (const artifact of artifacts) {
      const written = await readJson(path.join(temporary, `set-${artifact.set}-guided-evidence-staging.json`));
      assertPendingArtifact(written, `Written Set ${artifact.set}`);
    }
    await fs.rename(temporary, outputDir);
  } catch (error) {
    await fs.rm(temporary, { recursive: true, force: true });
    throw error;
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  assertUnder(options.productionRoot, path.dirname(options.productionRoot), 'Production root');
  assertUnder(options.workRoot, path.dirname(options.workRoot), 'Work root');
  const runtimeEvidenceRoot = path.join(REPO_ROOT, 'src/data/ielts/guided-evidence');
  assert.ok(options.outputDir !== runtimeEvidenceRoot && !options.outputDir.startsWith(`${runtimeEvidenceRoot}${path.sep}`),
    'Output directory must not be the runtime guided-evidence tree');
  const batchPath = path.join(options.productionRoot, 'mock-factory/batch-21-40.json');
  const batch = await readJson(batchPath);
  assert.deepEqual(batch.range, [21, 40], 'Batch control range must be Sets 21–40');
  assert.equal(batch.sets.length, 20, 'Batch control must contain 20 sets');
  const batchSha256 = await sha256File(batchPath);
  const scriptSha256 = await sha256File(SCRIPT_PATH);
  const artifacts = [];
  for (const setNumber of SETS) {
    const batchSet = batch.sets.find(candidate => candidate.set === setNumber);
    assert.ok(batchSet, `Batch control missing Set ${setNumber}`);
    artifacts.push(await buildArtifact(setNumber, batchSet, options.productionRoot, options.workRoot,
      batchPath, batchSha256, scriptSha256));
    console.log(`VALID SET ${setNumber}: Reading 40/40, Listening 40/40, ${REVIEW_STATE}`);
  }
  const fileRows = artifacts.map(artifact => {
    const filename = `set-${artifact.set}-guided-evidence-staging.json`;
    const serialized = `${JSON.stringify(artifact, null, 2)}\n`;
    return { set: artifact.set, filename, sha256: sha256Buffer(Buffer.from(serialized)) };
  });
  const manifest = withIntegrity({
    schemaVersion: 1,
    artifactType: 'IELTS_GUIDED_EVIDENCE_STAGING_MANIFEST',
    range: [21, 40],
    status: REVIEW_STATE,
    releaseAuthorized: false,
    runtimeIntegration: { connected: false },
    generator: { path: SCRIPT_PATH, sha256: scriptSha256 },
    batchControl: { path: batchPath, sha256: batchSha256 },
    sets: fileRows,
    aggregateSha256: sha256Canonical(fileRows),
  });
  assert.equal(manifest.status, REVIEW_STATE);
  assert.equal(manifest.releaseAuthorized, false);
  if (!options.validateOnly) {
    await writeAtomically(options.outputDir, artifacts, manifest);
    console.log(`STAGED ${artifacts.length} sets at ${options.outputDir}`);
  } else console.log(`VALIDATION ONLY: ${artifacts.length} sets passed; no files written`);
}

main().catch(error => {
  console.error(`FAIL_CLOSED: ${error.stack ?? error.message}`);
  process.exitCode = 1;
});
