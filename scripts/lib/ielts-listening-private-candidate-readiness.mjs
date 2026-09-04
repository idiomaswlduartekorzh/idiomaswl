import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

import { inspectIeltsListeningStaticSource } from '../check-ielts-listening-public-registry.mjs';
import { inspectMp3Buffer } from './inspect-mp3-metadata.mjs';

const CANDIDATE_ID_PATTERN = /^welearn-listening-part-([2-4])-(\d{3,})$/;
const CANDIDATE_MANIFEST_FILE_PATTERN = /^welearn-listening-part-[2-4]-/;
const CANDIDATE_SOURCE_FILE_PATTERN = /^listening-part[2-4]-.*\.server\.ts$/;
const CANDIDATE_LOOKING_DIRECTORY_PATTERN = /^welearn-listening-part-/i;
const TEXT_FILE_PATTERN = /\.(?:[cm]?[jt]sx?|css|csv|html?|json|md|svg|txt|xml)$/i;
const PUBLIC_TEXT_FILE_PATTERN = /\.(?:[cm]?[jt]sx?|css|csv|html?|json|md|svg|txt|xml|webmanifest|vtt|srt|ya?ml)$/i;
const ZERO_SHA256 = '0'.repeat(64);
const REQUIRED_PARTS = [2, 3, 4];
const TRANSCRIPT_WINDOW_SIZE = 12;

function repoRelative(root, absolutePath) {
  return path.relative(root, absolutePath).split(path.sep).join('/');
}

function walkFiles(directory, visitedDirectories = new Set()) {
  if (!fs.existsSync(directory)) return [];
  const realDirectory = fs.realpathSync(directory);
  if (visitedDirectories.has(realDirectory)) return [];
  visitedDirectories.add(realDirectory);
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    let type;
    try {
      type = entry.isSymbolicLink() ? fs.statSync(absolutePath) : entry;
    } catch {
      return [];
    }
    if (type.isDirectory()) return walkFiles(absolutePath, visitedDirectories);
    return type.isFile() ? [absolutePath] : [];
  });
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function sortedUnique(values) {
  return [...new Set(values)].sort();
}

function normalizedWords(value) {
  return typeof value === 'string' ? (value.toLowerCase().match(/[a-z0-9]+/g) ?? []) : [];
}

function transcriptWindows(value) {
  const words = normalizedWords(value);
  if (words.length < 6) return [];
  if (words.length < TRANSCRIPT_WINDOW_SIZE) return [words];
  return Array.from(
    { length: words.length - TRANSCRIPT_WINDOW_SIZE + 1 },
    (_, index) => words.slice(index, index + TRANSCRIPT_WINDOW_SIZE),
  );
}

function indexedSequences(sequences) {
  const index = new Map();
  for (const sequence of sequences) {
    const key = `${sequence[0] ?? ''}\0${sequence[1] ?? ''}`;
    const matches = index.get(key) ?? [];
    matches.push(sequence);
    index.set(key, matches);
  }
  return index;
}

function containsIndexedSequence(words, sequenceIndex) {
  for (let index = 0; index + 1 < words.length; index += 1) {
    const candidates = sequenceIndex.get(`${words[index]}\0${words[index + 1]}`) ?? [];
    if (candidates.some((sequence) =>
      index + sequence.length <= words.length
      && sequence.every((word, offset) => words[index + offset] === word))) {
      return true;
    }
  }
  return false;
}

function containsWordSequence(words, sequence) {
  if (!sequence.length || sequence.length > words.length) return false;
  for (let index = 0; index + sequence.length <= words.length; index += 1) {
    if (
      words[index] === sequence[0]
      && sequence.every((word, offset) => words[index + offset] === word)
    ) return true;
  }
  return false;
}

function staticModuleSpecifiers(content, fileName) {
  const source = ts.createSourceFile(fileName, content, ts.ScriptTarget.Latest, true);
  const specifiers = [];
  const visit = (node) => {
    let literal;
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) literal = node.moduleSpecifier;
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) {
      literal = node.moduleReference.expression;
    }
    if (ts.isCallExpression(node) && (
      node.expression.kind === ts.SyntaxKind.ImportKeyword
      || (ts.isIdentifier(node.expression) && node.expression.text === 'require')
    )) literal = node.arguments[0];
    if (literal && (ts.isStringLiteral(literal) || ts.isNoSubstitutionTemplateLiteral(literal))) {
      specifiers.push(literal.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return specifiers;
}

function candidatePart(practiceId) {
  const match = CANDIDATE_ID_PATTERN.exec(practiceId ?? '');
  return match ? Number(match[1]) : null;
}

function candidateNumber(practiceId) {
  const match = CANDIDATE_ID_PATTERN.exec(practiceId ?? '');
  return match ? Number(match[2]) : null;
}

function inferredIdFromSourceFile(fileName) {
  const match = /^listening-part([2-4])-welearn-(\d{3,})\.server\.ts$/.exec(fileName);
  return match ? `welearn-listening-part-${match[1]}-${match[2]}` : null;
}

function canonicalSourcePath(practiceId) {
  const match = CANDIDATE_ID_PATTERN.exec(practiceId);
  return match
    ? `src/data/ielts/listening-part${match[1]}-welearn-${match[2]}.server.ts`
    : null;
}

function addFailure(failures, code, { practiceId, relativePath } = {}) {
  failures.push({
    code,
    ...(practiceId ? { practiceId } : {}),
    ...(relativePath ? { path: relativePath } : {}),
  });
}

function failureKey(failure) {
  return [failure.code, failure.practiceId ?? '', failure.path ?? ''].join('\0');
}

function normalizedFailures(failures) {
  return [...new Map(failures.map((failure) => [failureKey(failure), failure])).values()]
    .sort((left, right) => failureKey(left).localeCompare(failureKey(right)));
}

function pathContainsSymlink(root, absolutePath) {
  let cursor = root;
  if (fs.lstatSync(cursor).isSymbolicLink()) return true;
  for (const component of path.relative(root, absolutePath).split(path.sep)) {
    cursor = path.join(cursor, component);
    if (fs.lstatSync(cursor).isSymbolicLink()) return true;
  }
  return false;
}

function sourceQuestions(group) {
  if (!group || typeof group !== 'object' || Array.isArray(group)) return null;
  if (group.type === 'form') return Array.isArray(group.blanks) ? group.blanks : null;
  if (group.type === 'table') {
    if (!Array.isArray(group.rows)) return null;
    return group.rows.flatMap((row) => Array.isArray(row)
      ? row.filter((cell) => cell?.type === 'blank')
      : []);
  }
  if (group.type === 'note-completion') {
    if (!Array.isArray(group.sections)) return null;
    return group.sections.flatMap((section) => Array.isArray(section?.lines)
      ? section.lines.flatMap((line) => line?.type === 'blank' ? [line.blank] : [])
      : []);
  }
  if (['single-choice', 'map-labelling', 'matching'].includes(group.type)) {
    return Array.isArray(group.questions) ? group.questions : null;
  }
  return null;
}

function validateSourceShape(record, manifest, failures) {
  const { practiceId, source, relativePath } = record;
  if (!source) return;
  const part = candidatePart(practiceId);
  const number = candidateNumber(practiceId);

  if (relativePath !== canonicalSourcePath(practiceId)) {
    addFailure(failures, 'SOURCE_PATH_MISMATCH', { practiceId, relativePath });
  }
  if (source.id !== practiceId || source.part !== part || source.practiceNumber !== number) {
    addFailure(failures, 'SOURCE_IDENTITY_MISMATCH', { practiceId, relativePath });
  }
  if (
    typeof source.contentVersion !== 'string'
    || !source.contentVersion
    || source.contentVersion !== manifest?.contentVersion
  ) {
    addFailure(failures, 'SOURCE_MANIFEST_VERSION_MISMATCH', { practiceId, relativePath });
  }

  const audio = source.audio;
  const audioFields = audio && typeof audio === 'object' && !Array.isArray(audio)
    ? Object.keys(audio).sort()
    : [];
  if (
    audioFields.join(',') !== 'durationSeconds,localPath,sha256'
    || audio?.localPath !== `/audio/ielts/listening/${practiceId}.mp3`
    || audio?.durationSeconds !== 0
    || audio?.sha256 !== ZERO_SHA256
  ) {
    addFailure(failures, 'SOURCE_AUDIO_NOT_PRIVATE_PLACEHOLDER', { practiceId, relativePath });
  }

  const expectedNumbers = Array.from(
    { length: 10 },
    (_, index) => ((part - 1) * 10) + index + 1,
  );
  const groups = Array.isArray(source.groups) ? source.groups : [];
  const observedNumbers = [];
  const observedAnswers = [];
  let invalidGroup = groups.length === 0;
  for (const group of groups) {
    const questions = sourceQuestions(group);
    const numbers = questions?.map((question) => question?.number) ?? [];
    const declaredRange = group?.questionRange;
    if (
      !questions?.length
      || numbers.some((questionNumber) => !Number.isInteger(questionNumber))
      || !Array.isArray(declaredRange)
      || declaredRange.length !== 2
      || declaredRange[0] !== Math.min(...numbers)
      || declaredRange[1] !== Math.max(...numbers)
      || numbers.length !== (declaredRange[1] - declaredRange[0] + 1)
      || new Set(numbers).size !== numbers.length
    ) {
      invalidGroup = true;
    }
    observedNumbers.push(...numbers);
    observedAnswers.push(...(questions ?? []).map((question) => ({
      number: question?.number,
      expected: question?.expected ?? question?.correctOptionKey,
    })));
  }
  if (
    invalidGroup
    || observedNumbers.length !== expectedNumbers.length
    || observedNumbers.some((questionNumber, index) => questionNumber !== expectedNumbers[index])
  ) {
    addFailure(failures, 'SOURCE_QUESTION_RANGE_MISMATCH', { practiceId, relativePath });
  }
  if (
    observedAnswers.length !== expectedNumbers.length
    || observedAnswers.some(({ expected }) => typeof expected !== 'string' || !expected)
  ) {
    addFailure(failures, 'SOURCE_ANSWER_BANK_INVALID', { practiceId, relativePath });
  }
  record.privateSignals = {
    transcriptWindowIndex: indexedSequences(transcriptWindows(source.transcript)),
    answerBank: normalizedWords(
      observedAnswers
        .sort((left, right) => (left.number ?? 0) - (right.number ?? 0))
        .map(({ expected }) => expected)
        .filter((expected) => typeof expected === 'string' && expected)
        .join(' '),
    ),
    numberedAnswerBank: observedAnswers.map(({ number: questionNumber, expected }) =>
      [String(questionNumber), ...normalizedWords(expected)]),
  };
}

function candidateArtifactSpecs(practiceId, manifest, source, failures) {
  const candidateRoot = `docs/ielts-superhub/candidates/${practiceId}`;
  const sourceUsesMap = source?.groups?.some((group) => group?.type === 'map-labelling') === true;
  const mapIsDeclared = manifest?.map && typeof manifest.map === 'object' && !Array.isArray(manifest.map);
  if (sourceUsesMap && !mapIsDeclared) addFailure(failures, 'CANDIDATE_MAP_REQUIRED', { practiceId });
  if (!sourceUsesMap && mapIsDeclared) addFailure(failures, 'CANDIDATE_MAP_PROHIBITED', { practiceId });

  return [
    {
      role: 'audio',
      canonicalPath: `${candidateRoot}/${practiceId}.mp3`,
      declaredPath: manifest?.audio?.candidatePath,
      metadata: manifest?.audio,
    },
    {
      role: 'asr',
      canonicalPath: `${candidateRoot}/asr/${practiceId}.json`,
      declaredPath: manifest?.automatedAsrAudit?.path,
      metadata: manifest?.automatedAsrAudit,
    },
    ...(sourceUsesMap ? [{
      role: 'map',
      canonicalPath: `${candidateRoot}/${practiceId}-map.svg`,
      declaredPath: manifest?.map?.candidatePath,
      metadata: manifest?.map,
    }] : []),
  ];
}

// Check lexical parents before resolving anything: realpath alone silently follows links.
function safeCandidatePath(root, absolutePath, candidateRoot, failures, practiceId) {
  const relativePath = repoRelative(root, absolutePath);
  let cursor = root;
  try {
    if (fs.lstatSync(root).isSymbolicLink()) {
      addFailure(failures, 'CANDIDATE_PATH_SYMLINK', { practiceId, relativePath });
      return false;
    }
    for (const component of path.relative(root, absolutePath).split(path.sep)) {
      if (component === '..') throw new Error('Outside repository');
      cursor = path.join(cursor, component);
      if (fs.lstatSync(cursor).isSymbolicLink()) {
        addFailure(failures, 'CANDIDATE_PATH_SYMLINK', { practiceId, relativePath });
        return false;
      }
    }
    const realRoot = fs.realpathSync(candidateRoot);
    const relativeRealPath = path.relative(realRoot, fs.realpathSync(absolutePath));
    if (relativeRealPath === '..' || relativeRealPath.startsWith(`..${path.sep}`) || path.isAbsolute(relativeRealPath)) {
      addFailure(failures, 'CANDIDATE_PATH_OUTSIDE_ROOT', { practiceId, relativePath });
      return false;
    }
    return true;
  } catch {
    addFailure(failures, 'CANDIDATE_ARTIFACT_MISSING', { practiceId, relativePath });
    return false;
  }
}

function walkCandidateFiles(root, directory, candidateRoot, failures, practiceId) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (!safeCandidatePath(root, absolutePath, candidateRoot, failures, practiceId)) continue;
    if (entry.isDirectory()) files.push(...walkCandidateFiles(root, absolutePath, candidateRoot, failures, practiceId));
    else if (entry.isFile()) files.push(absolutePath);
    else addFailure(failures, 'CANDIDATE_ARTIFACT_TYPE_INVALID', { practiceId, relativePath: repoRelative(root, absolutePath) });
  }
  return files;
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isWellFormedSafeSvgSubset(svg) {
  const stack = [];
  let cursor = 0;
  let roots = 0;
  for (const match of svg.matchAll(/<[^>]*>/g)) {
    const between = svg.slice(cursor, match.index);
    if (between.includes('<') || (!stack.length && between.trim())) return false;
    const tag = match[0];
    const close = /^<\/([A-Za-z][\w:-]*)\s*>$/.exec(tag);
    if (close) {
      if (stack.pop() !== close[1]) return false;
    } else {
      const open = /^<([A-Za-z][\w:-]*)((?:\s+[A-Za-z_:][\w:.-]*\s*=\s*(?:"[^"<>]*"|'[^'<>]*'))*)\s*(\/?)>$/.exec(tag);
      if (!open) return false;
      if (!stack.length && (open[1] !== 'svg' || ++roots !== 1)) return false;
      const attributes = [...open[2].matchAll(/([A-Za-z_:][\w:.-]*)\s*=\s*(?:"[^"]*"|'[^']*')/g)].map((attribute) => attribute[1]);
      if (new Set(attributes).size !== attributes.length) return false;
      if (!open[3]) stack.push(open[1]);
    }
    cursor = match.index + tag.length;
  }
  return roots === 1 && !stack.length && !svg.slice(cursor).trim();
}

function validateRoleFormat(spec, buffer, source, manifest, failures, practiceId) {
  const context = { practiceId, relativePath: spec.canonicalPath };
  if (spec.role === 'audio') {
    let metadata;
    try {
      metadata = inspectMp3Buffer(buffer);
    } catch {
      addFailure(failures, 'CANDIDATE_AUDIO_FORMAT_INVALID', context);
      return;
    }
    const declared = spec.metadata;
    if (
      !Number.isFinite(declared?.durationSeconds) || declared.durationSeconds <= 0
      || Math.abs(metadata.durationSeconds - declared.durationSeconds) > 0.000_001
      || metadata.channels !== declared.channels
      || metadata.sampleRateHz !== declared.sampleRateHz
      || !Number.isInteger(declared.targetBitRate)
      || metadata.bitrateBps !== declared.targetBitRate
    ) addFailure(failures, 'CANDIDATE_AUDIO_METADATA_MISMATCH', context);
    return;
  }
  if (spec.role === 'asr') {
    let asr;
    try {
      asr = JSON.parse(buffer.toString('utf8'));
    } catch {
      addFailure(failures, 'CANDIDATE_ASR_FORMAT_INVALID', context);
      return;
    }
    if (
      !isRecord(asr) || typeof asr.text !== 'string' || !asr.text.trim()
      || asr.language !== 'en' || asr.language !== spec.metadata?.language
      || !Array.isArray(asr.segments) || !asr.segments.length
      || asr.segments.some((segment, index) => !isRecord(segment)
        || typeof segment.text !== 'string' || !segment.text.trim()
        || !Number.isFinite(segment.start) || !Number.isFinite(segment.end)
        || segment.start < 0 || segment.end <= segment.start
        || segment.end > manifest.audio.durationSeconds + 1
        // Whisper's decimal boundaries can differ by floating-point roundoff.
        || (index > 0 && segment.start + 0.000_001 < asr.segments[index - 1].end))
    ) addFailure(failures, 'CANDIDATE_ASR_FORMAT_INVALID', context);
    return;
  }

  // A private map is validated without pretending it has a public release approval.
  const svg = buffer.toString('utf8');
  const openTag = svg.match(/^\s*<svg\b[^>]*>/)?.[0] ?? '';
  const viewBox = /\sviewBox\s*=\s*(['"])([^'"]+)\1/.exec(openTag)?.[2]
    ?.trim().split(/[\s,]+/).map(Number);
  const allowedTags = new Set(['svg', 'title', 'desc', 'defs', 'style', 'g', 'path', 'rect', 'text', 'line', 'circle', 'ellipse', 'polyline', 'polygon', 'tspan', 'clipPath', 'linearGradient', 'radialGradient', 'stop']);
  const tags = [...svg.matchAll(/<\/?([\w:-]+)\b/g)].map((match) => match[1]);
  const resources = [...svg.matchAll(/\s(?:href|xlink:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi),
    ...svg.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]+))\s*\)/gi)]
    .map((match) => (match[1] ?? match[2] ?? match[3] ?? '').trim());
  const nonEmptyElement = (name) => Boolean(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)<\\/${name}\\s*>`).exec(svg)?.[1].replace(/<[^>]*>/g, '').trim());
  if (
    !openTag || !/<\/svg>\s*$/.test(svg) || !isWellFormedSafeSvgSubset(svg)
    || tags.some((tag) => !allowedTags.has(tag))
    || !nonEmptyElement('title') || !nonEmptyElement('desc')
    || !viewBox || viewBox.length !== 4 || !viewBox.every(Number.isFinite)
    || viewBox[2] <= 0 || viewBox[3] <= 0
    || /(?:\s|:)on[a-z][a-z0-9_-]*\s*=|<!|<\?|\\|@|&/i.test(svg)
    || /\sxmlns:/.test(svg)
    || resources.some((reference) => !/^#[a-z0-9_-]+$/i.test(reference))
  ) addFailure(failures, 'CANDIDATE_MAP_FORMAT_INVALID', context);

  const map = spec.metadata;
  const keys = map?.areaKeys;
  const sameKeys = (other) => Array.isArray(keys) && Array.isArray(other)
    && keys.length === other.length && keys.every((key, index) => key === other[index]);
  const svgKeys = [...svg.matchAll(/\sdata-option-key\s*=\s*(['"])(.*?)\1/g)].map((match) => match[2]);
  const sourceMaps = source?.groups?.filter((group) => group?.type === 'map-labelling').map((group) => group.map) ?? [];
  if (
    !Number.isFinite(map?.width) || map.width <= 0 || !Number.isFinite(map?.height) || map.height <= 0
    || viewBox?.[2] !== map.width || viewBox?.[3] !== map.height
    || !Array.isArray(keys) || !keys.length || new Set(keys).size !== keys.length
    || keys.some((key) => typeof key !== 'string' || !key.trim())
    || !sameKeys(svgKeys) || !sourceMaps.length
    || sourceMaps.some((sourceMap) => sourceMap?.width !== map.width || sourceMap?.height !== map.height
      || !sameKeys(sourceMap?.areaKeys))
  ) addFailure(failures, 'CANDIDATE_MAP_METADATA_MISMATCH', context);
}

function validateCandidateArtifacts(root, practiceId, manifest, source, failures, machineIssues) {
  const specs = candidateArtifactSpecs(practiceId, manifest, source, failures);
  const canonicalMapPath = `docs/ielts-superhub/candidates/${practiceId}/${practiceId}-map.svg`;
  if (
    source?.groups?.some((group) => group?.type === 'map-labelling') !== true
    && fs.existsSync(path.resolve(root, canonicalMapPath))
  ) {
    addFailure(failures, 'CANDIDATE_MAP_PROHIBITED', {
      practiceId,
      relativePath: canonicalMapPath,
    });
  }
  const declaredPaths = specs.map(({ declaredPath }) => declaredPath);
  if (
    declaredPaths.some((declaredPath) => typeof declaredPath !== 'string')
    || new Set(declaredPaths).size !== declaredPaths.length
  ) {
    addFailure(failures, 'CANDIDATE_ARTIFACT_ROLE_ALIAS', { practiceId });
  }

  const resolvedRolePaths = [];
  const actualPaths = [];
  let audioSha256 = null;
  for (const spec of specs) {
    if (spec.declaredPath !== spec.canonicalPath) {
      addFailure(failures, 'CANDIDATE_ARTIFACT_PATH_NONCANONICAL', {
        practiceId,
        relativePath: spec.canonicalPath,
      });
    }
    const absolutePath = path.resolve(root, spec.canonicalPath);
    const candidateRoot = path.join(root, 'docs/ielts-superhub/candidates', practiceId);
    if (!safeCandidatePath(root, absolutePath, candidateRoot, failures, practiceId)) continue;
    if (!fs.lstatSync(absolutePath).isFile()) {
      addFailure(failures, 'CANDIDATE_ARTIFACT_MISSING', {
        practiceId,
        relativePath: spec.canonicalPath,
      });
      continue;
    }
    const realPath = fs.realpathSync(absolutePath);
    resolvedRolePaths.push(realPath);
    actualPaths.push(spec.canonicalPath);
    const buffer = fs.readFileSync(absolutePath);
    const actualSha256 = sha256(buffer);
    if (!Number.isInteger(spec.metadata?.bytes) || spec.metadata.bytes !== buffer.length) {
      addFailure(failures, 'CANDIDATE_ARTIFACT_BYTES_MISMATCH', {
        practiceId,
        relativePath: spec.canonicalPath,
      });
    }
    if (!/^[a-f0-9]{64}$/.test(spec.metadata?.sha256 ?? '') || spec.metadata.sha256 !== actualSha256) {
      addFailure(failures, 'CANDIDATE_ARTIFACT_SHA256_MISMATCH', {
        practiceId,
        relativePath: spec.canonicalPath,
      });
    }
    if (spec.role === 'audio') audioSha256 = actualSha256;
    validateRoleFormat(spec, buffer, source, manifest, failures, practiceId);
  }
  if (new Set(resolvedRolePaths).size !== resolvedRolePaths.length) {
    addFailure(failures, 'CANDIDATE_ARTIFACT_ROLE_ALIAS', { practiceId });
  }

  const asrInputAudioSha256 = manifest?.automatedAsrAudit?.inputAudioSha256;
  if (asrInputAudioSha256 === undefined) {
    addFailure(machineIssues, 'ASR_INPUT_AUDIO_SHA256_MISSING', { practiceId });
  } else if (asrInputAudioSha256 !== audioSha256) {
    addFailure(failures, 'ASR_INPUT_AUDIO_SHA256_MISMATCH', {
      practiceId,
      relativePath: `docs/ielts-superhub/candidates/${practiceId}/asr/${practiceId}.json`,
    });
  }
  return sortedUnique(actualPaths);
}

function discoverSources(root, failures) {
  const sourceRoot = path.join(root, 'src/data/ielts');
  if (!fs.existsSync(sourceRoot)) return [];
  if (pathContainsSymlink(root, sourceRoot)) {
    addFailure(failures, 'SOURCE_PATH_SYMLINK', { relativePath: repoRelative(root, sourceRoot) });
    return [];
  }
  return walkFiles(sourceRoot)
    .filter((absolutePath) => CANDIDATE_SOURCE_FILE_PATTERN.test(path.basename(absolutePath)))
    .flatMap((absolutePath) => {
      const relativePath = repoRelative(root, absolutePath);
      if (pathContainsSymlink(root, absolutePath)) {
        addFailure(failures, 'SOURCE_PATH_SYMLINK', { relativePath });
        return [];
      }
      const sourceText = fs.readFileSync(absolutePath, 'utf8');
      let source = null;
      let practiceId = inferredIdFromSourceFile(path.basename(absolutePath));
      try {
        source = inspectIeltsListeningStaticSource(sourceText);
        if (CANDIDATE_ID_PATTERN.test(source?.id ?? '')) practiceId = source.id;
        else addFailure(failures, 'SOURCE_ID_INVALID', { relativePath });
      } catch {
        addFailure(failures, 'SOURCE_AST_INVALID', { practiceId, relativePath });
      }
      return {
        absolutePath,
        relativePath,
        moduleName: path.basename(absolutePath, '.server.ts'),
        practiceId,
        source,
      };
    });
}

function discoverManifests(root, failures) {
  const manifestRoot = path.join(root, 'docs/ielts-superhub/originality');
  if (!fs.existsSync(manifestRoot)) return [];
  if (pathContainsSymlink(root, manifestRoot)) {
    addFailure(failures, 'MANIFEST_PATH_SYMLINK', { relativePath: repoRelative(root, manifestRoot) });
    return [];
  }
  return fs.readdirSync(manifestRoot, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(manifestRoot, entry.name);
    if (CANDIDATE_MANIFEST_FILE_PATTERN.test(entry.name) && entry.isSymbolicLink()) {
      addFailure(failures, 'MANIFEST_PATH_SYMLINK', { relativePath: repoRelative(root, absolutePath) });
      return [];
    }
    if (!entry.isFile() || !entry.name.endsWith('.json')) return [];
    let manifest;
    try {
      manifest = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
    } catch {
      if (CANDIDATE_MANIFEST_FILE_PATTERN.test(entry.name)) {
        addFailure(failures, 'MANIFEST_JSON_INVALID', { relativePath: repoRelative(root, absolutePath) });
      }
      return [];
    }
    if (!CANDIDATE_ID_PATTERN.test(manifest?.practiceId ?? '')) {
      if (CANDIDATE_MANIFEST_FILE_PATTERN.test(entry.name)) {
        addFailure(failures, 'MANIFEST_ID_INVALID', { relativePath: repoRelative(root, absolutePath) });
      }
      return [];
    }
    return [{
      absolutePath,
      relativePath: repoRelative(root, absolutePath),
      practiceId: manifest.practiceId,
      manifest,
    }];
  });
}

function discoverCandidateDirectories(root, failures) {
  const candidateRoot = path.join(root, 'docs/ielts-superhub/candidates');
  if (!fs.existsSync(candidateRoot)) return [];
  if (!safeCandidatePath(root, candidateRoot, candidateRoot, failures)) return [];
  return fs.readdirSync(candidateRoot, { withFileTypes: true }).flatMap((entry) => {
    if (CANDIDATE_LOOKING_DIRECTORY_PATTERN.test(entry.name) && !CANDIDATE_ID_PATTERN.test(entry.name)) {
      addFailure(failures, 'CANDIDATE_DIRECTORY_NAME_INVALID', {
        relativePath: 'docs/ielts-superhub/candidates',
      });
      return [];
    }
    if (!CANDIDATE_ID_PATTERN.test(entry.name)) return [];
    if (!entry.isDirectory() || entry.isSymbolicLink()) {
      addFailure(failures, 'CANDIDATE_DIRECTORY_TYPE_INVALID', { practiceId: entry.name });
      return [];
    }
    return CANDIDATE_ID_PATTERN.test(entry.name)
      ? [{
        absolutePath: path.join(candidateRoot, entry.name),
        relativePath: `docs/ielts-superhub/candidates/${entry.name}`,
        practiceId: entry.name,
      }]
      : [];
  });
}

function recordsById(records) {
  const result = new Map();
  for (const record of records) {
    if (!record.practiceId) continue;
    const matches = result.get(record.practiceId) ?? [];
    matches.push(record);
    result.set(record.practiceId, matches);
  }
  return result;
}

function textEntry(root, absolutePath, content = fs.readFileSync(absolutePath, 'utf8')) {
  return {
    absolutePath,
    relativePath: repoRelative(root, absolutePath),
    content,
    moduleSpecifiers: /\.[cm]?[jt]sx?$/i.test(absolutePath)
      ? staticModuleSpecifiers(content, absolutePath) : [],
    words: normalizedWords(content),
  };
}

function contentContainsToken(entry, tokens) {
  return tokens.some((token) =>
    entry.content.includes(token)
    || entry.moduleSpecifiers.some((specifier) => specifier.includes(token)));
}

function validatePrivateTextSignals({
  words,
  candidate,
  failures,
  location,
  relativePath,
}) {
  const signals = candidate.sources.flatMap(({ privateSignals }) => privateSignals ? [privateSignals] : []);
  if (signals.some(({ transcriptWindowIndex }) => containsIndexedSequence(words, transcriptWindowIndex))) {
    addFailure(failures, `PRIVATE_TRANSCRIPT_FRAGMENT_IN_${location}`, {
      practiceId: candidate.practiceId,
      relativePath,
    });
  }
  if (signals.some(({ answerBank, numberedAnswerBank }) => containsWordSequence(words, answerBank)
    || (numberedAnswerBank.length > 0 && numberedAnswerBank.every((answer) => containsWordSequence(words, answer))))) {
    addFailure(failures, `PRIVATE_ANSWER_BANK_IN_${location}`, {
      practiceId: candidate.practiceId,
      relativePath,
    });
  }
}

function fileSha256(absolutePath) {
  const hash = createHash('sha256');
  const descriptor = fs.openSync(absolutePath, 'r');
  const chunk = Buffer.alloc(64 * 1024);
  try {
    let count;
    while ((count = fs.readSync(descriptor, chunk, 0, chunk.length, null)) > 0) {
      hash.update(chunk.subarray(0, count));
    }
  } finally {
    fs.closeSync(descriptor);
  }
  return hash.digest('hex');
}

// Every public file is servable, regardless of its suffix. Inspect a small sample
// before decoding text so MP3/video files never accumulate in the text inventory.
function publicTextContent(absolutePath) {
  // A declared text resource is still served as text when its bytes are malformed.
  // Never let a NUL or invalid UTF-8 prefix suppress inspection of its payload.
  if (PUBLIC_TEXT_FILE_PATTERN.test(absolutePath)) {
    const buffer = fs.readFileSync(absolutePath);
    const utf8 = buffer.toString('utf8');
    // Keep the UTF-8 inspection even for an apparent BOM: a malformed prefix
    // must not mask an otherwise readable payload. Also retain UTF-16 support.
    return buffer[0] === 0xff && buffer[1] === 0xfe
      ? `${utf8}\n${buffer.toString('utf16le')}` : utf8;
  }
  const descriptor = fs.openSync(absolutePath, 'r');
  const sample = Buffer.alloc(8192);
  let count;
  try {
    count = fs.readSync(descriptor, sample, 0, sample.length, 0);
  } finally {
    fs.closeSync(descriptor);
  }
  const bytes = sample.subarray(0, count);
  const utf16le = count >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe;
  if (utf16le) return fs.readFileSync(absolutePath).toString('utf16le');
  if (bytes.some((byte) => byte === 0 || byte < 9 || (byte > 13 && byte < 32))) return null;
  // stream:true tolerates a multibyte UTF-8 code point split at the sample edge.
  try {
    new TextDecoder('utf-8', { fatal: true }).decode(bytes, { stream: true });
  } catch {
    return null;
  }
  return fs.readFileSync(absolutePath, 'utf8');
}

function validateGlobalIsolation(root, candidateRecords, candidateDirectories, failures) {
  const sourceEntries = walkFiles(path.join(root, 'src'))
    .filter((absolutePath) => TEXT_FILE_PATTERN.test(absolutePath))
    .map((absolutePath) => textEntry(root, absolutePath));
  const publicFiles = walkFiles(path.join(root, 'public'));

  for (const candidate of candidateRecords) {
    const allowedSourcePaths = new Set(candidate.sources.map(({ absolutePath }) => path.resolve(absolutePath)));
    const tokens = sortedUnique([
      candidate.practiceId,
      ...candidate.sources.map(({ moduleName }) => moduleName),
    ]);
    for (const entry of sourceEntries) {
      if (allowedSourcePaths.has(path.resolve(entry.absolutePath))) continue;
      if (contentContainsToken(entry, tokens)) {
        addFailure(failures, 'PRIVATE_CANDIDATE_REFERENCE_IN_SRC', {
          practiceId: candidate.practiceId,
          relativePath: entry.relativePath,
        });
      }
      validatePrivateTextSignals({
        words: entry.words,
        candidate,
        failures,
        location: 'SRC',
        relativePath: entry.relativePath,
      });
    }
  }
  // Only one public text file is decoded at a time.
  for (const absolutePath of publicFiles) {
    const content = publicTextContent(absolutePath);
    const entry = content === null ? null : textEntry(root, absolutePath, content);
    for (const candidate of candidateRecords) {
      const relativePath = repoRelative(root, absolutePath);
      const tokens = [candidate.practiceId, ...candidate.sources.map(({ moduleName }) => moduleName)];
      if (
        tokens.some((token) => relativePath.includes(token))
        || (entry && contentContainsToken(entry, tokens))
      ) {
        addFailure(failures, 'PRIVATE_CANDIDATE_REFERENCE_IN_PUBLIC', {
          practiceId: candidate.practiceId,
          relativePath,
        });
      }
      if (entry) {
        validatePrivateTextSignals({
          words: entry.words,
          candidate,
          failures,
          location: 'PUBLIC',
          relativePath,
        });
      }
    }
  }

  const fingerprintsBySize = new Map();
  for (const directory of candidateDirectories) {
    for (const absolutePath of walkCandidateFiles(root, directory.absolutePath, directory.absolutePath, failures, directory.practiceId)) {
      if (!safeCandidatePath(root, absolutePath, directory.absolutePath, failures, directory.practiceId)) continue;
      const size = fs.statSync(absolutePath).size;
      const fingerprints = fingerprintsBySize.get(size) ?? [];
      fingerprints.push({ practiceId: directory.practiceId, sha256: fileSha256(absolutePath) });
      fingerprintsBySize.set(size, fingerprints);
    }
  }
  for (const absolutePath of publicFiles) {
    const size = fs.statSync(absolutePath).size;
    const candidates = fingerprintsBySize.get(size);
    if (!candidates?.length) continue;
    const publicSha256 = fileSha256(absolutePath);
    for (const candidate of candidates.filter((entry) => entry.sha256 === publicSha256)) {
      addFailure(failures, 'PRIVATE_CANDIDATE_ARTIFACT_COPIED_TO_PUBLIC', {
        practiceId: candidate.practiceId,
        relativePath: repoRelative(root, absolutePath),
      });
    }
  }
}

export function auditIeltsListeningPrivateCandidates({ root }) {
  const absoluteRoot = path.resolve(root);
  const failures = [];
  const machineIssues = [];
  const sources = discoverSources(absoluteRoot, failures);
  const manifests = discoverManifests(absoluteRoot, failures);
  const directories = discoverCandidateDirectories(absoluteRoot, failures);
  const sourceRecords = recordsById(sources);
  const manifestRecords = recordsById(manifests);
  const directoryRecords = recordsById(directories);
  const practiceIds = sortedUnique([
    ...sourceRecords.keys(),
    ...manifestRecords.keys(),
    ...directoryRecords.keys(),
  ]);

  for (const part of REQUIRED_PARTS) {
    if (!practiceIds.some((practiceId) => candidatePart(practiceId) === part)) {
      addFailure(failures, 'PRIVATE_CANDIDATE_PART_MISSING', { practiceId: `part-${part}` });
    }
  }

  const candidates = practiceIds.map((practiceId) => {
    const matchingSources = sourceRecords.get(practiceId) ?? [];
    const matchingManifests = manifestRecords.get(practiceId) ?? [];
    const matchingDirectories = directoryRecords.get(practiceId) ?? [];
    if (matchingSources.length !== 1) {
      addFailure(failures, 'PRIVATE_CANDIDATE_SOURCE_CARDINALITY', { practiceId });
    }
    if (matchingManifests.length !== 1) {
      addFailure(failures, 'PRIVATE_CANDIDATE_MANIFEST_CARDINALITY', { practiceId });
    }
    if (matchingDirectories.length !== 1) {
      addFailure(failures, 'PRIVATE_CANDIDATE_DIRECTORY_CARDINALITY', { practiceId });
    }

    const sourceRecord = matchingSources[0];
    const manifestRecord = matchingManifests[0];
    const directoryRecord = matchingDirectories[0];
    if (manifestRecord?.relativePath !== `docs/ielts-superhub/originality/${practiceId}.json`) {
      addFailure(failures, 'MANIFEST_PATH_MISMATCH', {
        practiceId,
        relativePath: manifestRecord?.relativePath,
      });
    }
    const manifest = manifestRecord?.manifest;
    if (
      manifest?.release?.status !== 'draft'
      || manifest.release.approvedBy !== null
      || manifest.release.approvedAt !== null
    ) {
      addFailure(failures, 'PRIVATE_CANDIDATE_RELEASE_STATE_INVALID', {
        practiceId,
        relativePath: manifestRecord?.relativePath,
      });
    }
    if (sourceRecord) validateSourceShape(sourceRecord, manifest, failures);

    if (directoryRecord && manifest) {
      const declaredArtifacts = validateCandidateArtifacts(
        absoluteRoot,
        practiceId,
        manifest,
        sourceRecord?.source,
        failures,
        machineIssues,
      );
      const actualArtifacts = walkCandidateFiles(absoluteRoot, directoryRecord.absolutePath, directoryRecord.absolutePath, failures, practiceId)
        .map((absolutePath) => repoRelative(absoluteRoot, absolutePath))
        .sort();
      if (
        !actualArtifacts.length
        || declaredArtifacts.length !== actualArtifacts.length
        || declaredArtifacts.some((relativePath, index) => relativePath !== actualArtifacts[index])
      ) {
        addFailure(failures, 'CANDIDATE_ARTIFACT_INVENTORY_MISMATCH', {
          practiceId,
          relativePath: directoryRecord.relativePath,
        });
      }
    }

    return {
      practiceId,
      part: candidatePart(practiceId),
      sources: matchingSources,
    };
  });

  validateGlobalIsolation(absoluteRoot, candidates, directories, failures);
  const safeFailures = normalizedFailures(failures);
  const safeMachineIssues = normalizedFailures(machineIssues);
  const candidateReports = candidates.map(({ practiceId, part }) => {
    const failureCodes = sortedUnique(
      safeFailures.filter((failure) => failure.practiceId === practiceId).map(({ code }) => code),
    );
    const machineIssueCodes = sortedUnique(
      safeMachineIssues.filter((issue) => issue.practiceId === practiceId).map(({ code }) => code),
    );
    const integrity = failureCodes.length ? 'BLOCK' : 'PASS';
    return {
      practiceId,
      part,
      integrity,
      machineReadiness: integrity === 'PASS' && !machineIssueCodes.length ? 'READY' : 'BLOCKED',
      publicationDecision: 'BLOCK',
      failureCodes,
      machineIssueCodes,
    };
  });
  const integrity = safeFailures.length ? 'BLOCK' : 'PASS';
  return {
    schemaVersion: 1,
    scope: 'ielts-listening-private-candidates',
    integrity,
    machineReadiness: integrity === 'PASS' && !safeMachineIssues.length ? 'READY' : 'BLOCKED',
    publicationDecision: 'BLOCK',
    candidates: candidateReports,
    failures: safeFailures,
    machineIssues: safeMachineIssues,
  };
}
