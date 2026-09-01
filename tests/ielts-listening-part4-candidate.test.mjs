import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

import {
  ieltsListeningQuestionNumbers,
  ieltsListeningResponseSpecs,
  projectIeltsListeningPractice,
  scoreIeltsListeningPractice,
  validateIeltsListeningResponses,
} from '../src/lib/ielts/listening-practice-contract.ts';
import {
  collectIeltsListeningPublicationInventory,
  inspectIeltsListeningStaticSource,
} from '../scripts/check-ielts-listening-public-registry.mjs';
import { inspectMp3Buffer } from '../scripts/lib/inspect-mp3-metadata.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const practiceId = 'welearn-listening-part-4-001';
const sourcePath = path.join(root, 'src/data/ielts/listening-part4-welearn-001.server.ts');
const generatorPath = path.join(root, 'scripts/generate-ielts-listening-part4-audio.mjs');
const rendererPath = path.join(root, 'scripts/lib/render-ielts-piper-segments.py');
const manifestPath = path.join(root, `docs/ielts-superhub/originality/${practiceId}.json`);
const candidateRoot = path.join(root, `docs/ielts-superhub/candidates/${practiceId}`);
const candidateAudioPath = path.join(candidateRoot, `${practiceId}.mp3`);
const candidateAsrPath = path.join(candidateRoot, 'asr', `${practiceId}.json`);
const pronunciationDictionaryPath = path.join(root, 'src/data/fonetica');
const AUDITED_GENERATOR_SHA256 = '1d6a56e499b2f4e62aa912ed6ca98dcb099c400b3f35fb7655f96764d9b98925';
const AUDITED_RENDERER_SHA256 = '7445edddb7193c1178a9d794b85385583e05aadd76cac06a140e05ec22e3a0a0';
const AUDITED_PIPER_VERSION = '1.7.0';
const AUDITED_PIPER_MODEL_SHA256 = '4e9fc85ab9009385319fc6bae7f55577f8a2d7ee77fd9159a5500eb6531f41e6';
const AUDITED_PIPER_CONFIG_SHA256 = '7f85e6391ed0f7f46e4abd19345929a16be931a0c9945086f96692dce2087fa8';
const AUDITED_MANIFEST_JSON_SHA256 = '9421ffdcd52bfe91956fc79360e974298f4e31e2fbfe1abae081ef5d25ffdeaf';
const AUDITED_AUDIO_SHA256 = '9b0dda211c013968c9c3d858176f96dbbdbb49ec582279ea6a1566467ed5f96c';
const AUDITED_AUDIO_BYTES = 3038130;
const AUDITED_AUDIO_DURATION_SECONDS = 253.0837188208617;
const AUDITED_ASR_SHA256 = '0e8bb9d399b44decce367787efc6fb963c73374506d3187ff7f793e0500258d0';
const AUDITED_ASR_BYTES = 25149;
const AUDITED_ROUTING_CONTROL_SHA256 = {
  'next.config.ts': '640097c5de4a6e66b7b6daa1e18bdf1884d6309b8ec58ff579d5df135593b38f',
  'src/proxy.ts': 'bb7e5197d373ed4fc73e12e83c8e5e35722c4017364adecba92c840d0c4c6d90',
  'vercel.json': 'e4943b7d584334d24e6648f75098599ecae0e0eef70358860a94d4e56e077e6d',
};
const EXPECTED_ANSWERS = [
  'surface',
  'friction',
  'ball',
  'attached',
  'detach',
  'strength',
  'contrast',
  'lighting',
  'procedure',
  'balance',
];

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function normalizedWords(value) {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase('en')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function spokenText(value) {
  return normalizedWords(value).join(' ');
}

function wordWindows(value, size) {
  const words = normalizedWords(value);
  return words.length < size
    ? []
    : Array.from({ length: words.length - size + 1 }, (_, index) =>
      words.slice(index, index + size).join(' '));
}

function walkTextFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (path.resolve(absolutePath) === pronunciationDictionaryPath) return [];
      return walkTextFiles(absolutePath);
    }
    return /\.(?:[cm]?[jt]sx?|css|csv|html?|json|md|svg|txt|xml)$/i.test(entry.name) ? [absolutePath] : [];
  });
}

function walkAllFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    return entry.isDirectory() ? walkAllFiles(absolutePath) : [absolutePath];
  });
}

function appRouteForEntry(relativeAppPath) {
  const normalizedPath = relativeAppPath.split(path.sep).join('/');
  const segments = normalizedPath.split('/');
  const fileName = segments.pop() ?? '';
  if (!/^(?:page|route)\.(?:[cm]?[jt]sx?|mdx)$/i.test(fileName)) return null;
  const urlSegments = [];
  for (const rawSegment of segments) {
    if ((rawSegment.startsWith('(') && rawSegment.endsWith(')')) || rawSegment.startsWith('@')) continue;
    let segment = rawSegment;
    const rootInterceptor = /^\(\.\.\.\)(.+)$/.exec(segment);
    if (rootInterceptor) {
      urlSegments.length = 0;
      segment = rootInterceptor[1];
    } else {
      const parentInterceptor = /^((?:\(\.\.\))+)(.+)$/.exec(segment);
      if (parentInterceptor) {
        const levels = [...parentInterceptor[1].matchAll(/\(\.\.\)/g)].length;
        urlSegments.splice(Math.max(0, urlSegments.length - levels));
        segment = parentInterceptor[2];
      } else {
        const sameLevelInterceptor = /^\(\.\)(.+)$/.exec(segment);
        if (sameLevelInterceptor) segment = sameLevelInterceptor[1];
      }
    }
    urlSegments.push(segment);
  }
  return `/${urlSegments.join('/')}`;
}

function appRoutePatternMatches(pattern, concreteRoute) {
  const patternSegments = pattern.split('/').filter(Boolean);
  const concreteSegments = concreteRoute.split('/').filter(Boolean);
  let concreteIndex = 0;
  for (const [patternIndex, segment] of patternSegments.entries()) {
    if (/^\[\[\.\.\.[^\]]+\]\]$/.test(segment)) {
      return patternIndex === patternSegments.length - 1;
    }
    if (/^\[\.\.\.[^\]]+\]$/.test(segment)) {
      return patternIndex === patternSegments.length - 1 && concreteIndex < concreteSegments.length;
    }
    if (concreteIndex >= concreteSegments.length) return false;
    if (!/^\[[^\]]+\]$/.test(segment) && segment !== concreteSegments[concreteIndex]) return false;
    concreteIndex += 1;
  }
  return concreteIndex === concreteSegments.length;
}

function appEntriesForRoute(relativeAppPaths, route) {
  return relativeAppPaths.filter((relativePath) => {
    const pattern = appRouteForEntry(relativePath);
    return pattern !== null && appRoutePatternMatches(pattern, route);
  });
}

function pagesRouteForEntry(relativePagesPath) {
  const normalizedPath = relativePagesPath.split(path.sep).join('/');
  if (!/\.(?:[jt]sx?)$/i.test(normalizedPath)) return null;
  const withoutExtension = normalizedPath.replace(/\.(?:[jt]sx?)$/i, '');
  const segments = withoutExtension.split('/');
  const fileName = segments.at(-1) ?? '';
  if (/^_(?:app|document|error)$/.test(fileName)) return null;
  if (fileName === 'index') segments.pop();
  return `/${segments.join('/')}`;
}

function pagesEntriesForRoute(relativePagesPaths, route) {
  return relativePagesPaths.filter((relativePath) => {
    const pattern = pagesRouteForEntry(relativePath);
    return pattern !== null && appRoutePatternMatches(pattern, route);
  });
}

function assertRoutingControlLedger(entries) {
  const actual = Object.fromEntries(entries.map(({ filePath, content }) => [filePath, sha256(Buffer.from(content))]));
  assert.deepEqual(actual, AUDITED_ROUTING_CONTROL_SHA256);
}

function assertPrivateRuntimeIsolation(entries, transcript) {
  const forbiddenRuntimeReference = /listening-part4-welearn-001|welearn-listening-part-4-001|getIeltsListeningPart4|scoreIeltsListeningPart4|From Fuzz to Wear-Off: Understanding Fabric Pilling/;
  const runtimeReferences = entries.flatMap(({ filePath, content }) =>
    forbiddenRuntimeReference.test(content) ? [filePath] : []);
  assert.deepEqual(runtimeReferences, []);

  const answerSequenceLeaks = entries.flatMap(({ filePath, content }) => {
    const normalized = ` ${spokenText(content)} `;
    return EXPECTED_ANSWERS.every((answer) => new RegExp(`\\b${spokenText(answer)}\\b`).test(normalized))
      ? [filePath]
      : [];
  });
  assert.deepEqual(answerSequenceLeaks, []);

  const transcriptWindows = new Set(wordWindows(transcript, 10));
  const runtimeTranscriptOverlaps = [];
  for (const { filePath, content } of entries) {
    for (const phrase of wordWindows(content, 10)) {
      if (transcriptWindows.has(phrase)) {
        runtimeTranscriptOverlaps.push(`${filePath}: ${phrase}`);
        if (runtimeTranscriptOverlaps.length >= 20) break;
      }
    }
    if (runtimeTranscriptOverlaps.length >= 20) break;
  }
  assert.deepEqual(runtimeTranscriptOverlaps, []);
}

function readId3v24TextFrame(buffer, requestedFrameId) {
  assert.equal(buffer.subarray(0, 3).toString('ascii'), 'ID3');
  assert.equal(buffer[3], 4, 'candidate audio must use ID3v2.4');
  const syncSafe = (offset) => {
    const values = [...buffer.subarray(offset, offset + 4)];
    assert.equal(values.every((value) => value < 128), true, 'ID3 size must be sync-safe');
    return values.reduce((total, value) => (total << 7) | value, 0);
  };
  const tagEnd = 10 + syncSafe(6);
  for (let offset = 10; offset + 10 <= tagEnd;) {
    const frameId = buffer.subarray(offset, offset + 4).toString('ascii');
    if (/^\x00{4}$/.test(frameId)) break;
    const frameSize = syncSafe(offset + 4);
    const payload = buffer.subarray(offset + 10, offset + 10 + frameSize);
    assert.ok(offset + 10 + frameSize <= tagEnd, `ID3 frame ${frameId} exceeds the tag`);
    if (frameId === requestedFrameId) {
      assert.equal(payload[0], 3, `${frameId} must use UTF-8 encoding`);
      return payload.subarray(1).toString('utf8').replace(/\x00+$/g, '');
    }
    offset += 10 + frameSize;
  }
  throw new Error(`Missing ID3 frame ${requestedFrameId}.`);
}

function findVariableInitializer(sourceFile, variableName) {
  const matches = sourceFile.statements.flatMap((statement) => {
    if (!ts.isVariableStatement(statement)) return [];
    return statement.declarationList.declarations.filter((declaration) =>
      ts.isIdentifier(declaration.name) && declaration.name.text === variableName);
  });
  assert.equal(matches.length, 1, `expected one ${variableName} declaration`);
  assert.ok((matches[0].parent.flags & ts.NodeFlags.Const) !== 0, `${variableName} must be const`);
  assert.ok(matches[0].initializer, `${variableName} needs an initializer`);
  return matches[0].initializer;
}

function staticString(node, label) {
  assert.ok(
    ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node),
    `${label} must be a static string`,
  );
  return node.text;
}

function staticNumber(node, label) {
  assert.ok(ts.isNumericLiteral(node), `${label} must be a static number`);
  return Number(node.text);
}

function inspectGenerator(generator) {
  const sourceFile = ts.createSourceFile(
    'generate-ielts-listening-part4-audio.mjs',
    generator,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  );
  assert.deepEqual(sourceFile.parseDiagnostics ?? [], []);
  const segmentsNode = findVariableInitializer(sourceFile, 'segments');
  assert.ok(ts.isArrayLiteralExpression(segmentsNode), 'segments must be a direct array');
  const segments = segmentsNode.elements.map((segment, index) =>
    staticString(segment, `segment ${index + 1}`));
  return {
    segments,
    speakerId: staticNumber(findVariableInitializer(sourceFile, 'lecturerSpeakerId'), 'lecturer speaker ID'),
    lengthScale: staticNumber(findVariableInitializer(sourceFile, 'lecturerLengthScale'), 'lecturer length scale'),
    piperVersion: staticString(findVariableInitializer(sourceFile, 'expectedPiperVersion'), 'Piper version'),
    modelSha256: staticString(findVariableInitializer(sourceFile, 'expectedPiperModelSha256'), 'model checksum'),
    configSha256: staticString(findVariableInitializer(sourceFile, 'expectedPiperConfigSha256'), 'config checksum'),
    rendererSha256: staticString(findVariableInitializer(sourceFile, 'expectedRendererSha256'), 'renderer checksum'),
    sourceSha256: sha256(Buffer.from(generator)),
  };
}

function sourceNoteBlanks(source) {
  return source.groups.flatMap((group) => group.sections.flatMap((section) =>
    section.lines.flatMap((line) => line.type === 'blank' ? [line] : [])));
}

function visibleCandidateText(source) {
  return [
    source.title,
    source.scenario,
    source.instructions,
    ...source.groups.flatMap((group) => [
      group.instruction,
      group.title,
      ...group.sections.flatMap((section) => [
        section.heading,
        ...section.lines.flatMap((line) => line.type === 'text'
          ? [line.text]
          : [line.before, line.after]),
      ]),
    ]),
  ].join('\n');
}

function assertPart4SourceContract(source) {
  const blanks = sourceNoteBlanks(source);
  assert.equal(source.id, practiceId);
  assert.equal(source.contentVersion, '2026-09-01.draft.1');
  assert.equal(source.part, 4);
  assert.equal(source.practiceNumber, 1);
  assert.deepEqual(source.audio, {
    localPath: `/audio/ielts/listening/${practiceId}.mp3`,
    durationSeconds: 0,
    sha256: '0'.repeat(64),
  });
  assert.equal(source.groups.length, 1);
  assert.equal(source.groups[0].type, 'note-completion');
  assert.deepEqual(source.groups[0].questionRange, [31, 40]);
  assert.equal(source.groups[0].maxWords, 1);
  assert.equal(source.groups[0].instruction, 'Complete the notes. Write ONE WORD ONLY for each answer.');
  assert.deepEqual(blanks.map((line) => line.blank.number), [31, 32, 33, 34, 35, 36, 37, 38, 39, 40]);
  assert.deepEqual(blanks.map((line) => line.blank.expected), EXPECTED_ANSWERS);
  assert.deepEqual(blanks.map((line) => line.blank.acceptedAnswers), EXPECTED_ANSWERS.map((answer) => [answer]));
  const visibleText = ` ${spokenText(visibleCandidateText(source))} `;
  for (const line of blanks) {
    for (const acceptedAnswer of line.blank.acceptedAnswers) {
      const answer = spokenText(acceptedAnswer);
      assert.match(` ${spokenText(source.transcript)} `, new RegExp(`\\b${answer}\\b`));
      assert.doesNotMatch(visibleText, new RegExp(`\\b${answer}\\b`));
    }
  }
}

function authoredCandidateText(source) {
  return [
    source.title,
    source.scenario,
    source.transcript,
    ...source.groups.flatMap((group) => [
      group.title,
      ...group.sections.flatMap((section) => [
        section.heading,
        ...section.lines.flatMap((line) => line.type === 'text'
          ? [line.text]
          : [line.before, line.after, line.blank.explanation]),
      ]),
    ]),
  ].join('\n');
}

function releaseReadySource(source, manifest) {
  const ready = structuredClone(source);
  ready.audio.durationSeconds = manifest.audio.durationSeconds;
  ready.audio.sha256 = manifest.audio.sha256;
  return ready;
}

function assertGeneratorContract(generator, audit) {
  assert.equal(audit.sourceSha256, AUDITED_GENERATOR_SHA256);
  assert.equal(audit.rendererSha256, AUDITED_RENDERER_SHA256);
  assert.equal(audit.piperVersion, AUDITED_PIPER_VERSION);
  assert.equal(audit.modelSha256, AUDITED_PIPER_MODEL_SHA256);
  assert.equal(audit.configSha256, AUDITED_PIPER_CONFIG_SHA256);
  assert.equal(audit.speakerId, 74);
  assert.equal(audit.lengthScale, 1.2);
  assert.equal(audit.segments.length, 14);
  assert.match(generator, /docs\/ielts-superhub\/candidates\/welearn-listening-part-4-001/);
  assert.doesNotMatch(generator, /public\/audio/);
  assert.match(generator, /speakerId: lecturerSpeakerId/);
  assert.match(generator, /lengthScale: lecturerLengthScale/);
  assert.match(generator, /fileSha256\(piperModel\) !== expectedPiperModelSha256/);
  assert.match(generator, /fileSha256\(piperConfig\) !== expectedPiperConfigSha256/);
  assert.doesNotMatch(generator, /process\.env\.(?:SPEAKER|VOICE)|run\(['"]say['"]/);
}

function assertManifestContract(manifest, source, generatorAudit) {
  assert.equal(sha256(Buffer.from(JSON.stringify(manifest))), AUDITED_MANIFEST_JSON_SHA256);
  assert.equal(manifest.schemaVersion, 1);
  assert.equal(manifest.practiceId, source.id);
  assert.equal(manifest.contentVersion, source.contentVersion);
  assert.equal(manifest.ownership.status, 'draft-original-independent-practice');
  assert.equal(manifest.ownership.borrowedQuestions, false);
  assert.equal(manifest.ownership.borrowedTranscript, false);
  assert.equal(manifest.ownership.borrowedAudio, false);
  assert.equal(manifest.formatSources.length, 2);
  assert.equal(manifest.formatSources.every((url) => url.startsWith('https://ielts.org/')), true);
  assert.equal(manifest.scienceSources.length, 2);
  assert.deepEqual(manifest.publicationIntent, {
    canonicalRoute: '/practica/ielts/listening/part-4',
    visibleAlias: 'Section 4',
    aliasRoute: null,
    forbiddenRoutes: [
      '/practica/ielts/listening/section-4',
      '/practica/ielts/listening/part-4-practice',
      '/practica/ielts/listening/part-4-note-completion',
      '/practica/ielts/listening/part-4-tips',
    ],
    sessionRoute: '/practica/ielts/listening/sesion?practice=welearn-listening-part-4-001&part=4',
    sessionIndexing: 'noindex, nofollow',
    blogBoundary: '/blog/ielts-listening-errores-comunes retains tips and common-error intent; the future Part 4 canonical owns practice, Questions 31–40, audio and academic-monologue intent.',
  });
  assert.equal(manifest.originalitySearch.queries.length, 4);
  assert.equal(manifest.originalitySearch.queryUrls.length, 4);
  assert.equal(manifest.originalitySearch.queryUrls.every((url) => url.startsWith('https://www.google.com/search?q=')), true);
  assert.ok(manifest.originalitySearch.localCorpusScope.length > 80);
  assert.equal(manifest.originalitySearch.rejectedConcepts.length, 3);
  assert.equal(manifest.originalitySearch.rejectedConcepts.every((entry) => entry.concept && entry.reason), true);
  assert.deepEqual(manifest.originalitySearch.formatBoilerplateExcluded, [
    source.instructions,
    source.groups[0].instruction,
  ]);

  assert.equal(manifest.audio.candidatePath, `docs/ielts-superhub/candidates/${practiceId}/${practiceId}.mp3`);
  assert.equal(manifest.audio.futurePublicPath, `public/audio/ielts/listening/${practiceId}.mp3`);
  assert.equal(manifest.audio.generator, 'scripts/generate-ielts-listening-part4-audio.mjs');
  assert.equal(manifest.audio.renderer, 'scripts/lib/render-ielts-piper-segments.py');
  assert.equal(manifest.audio.generatorSha256, generatorAudit.sourceSha256);
  assert.equal(manifest.audio.rendererSha256, generatorAudit.rendererSha256);
  assert.equal(manifest.audio.engine.version, generatorAudit.piperVersion);
  assert.equal(manifest.audio.voiceModel.sha256, generatorAudit.modelSha256);
  assert.equal(manifest.audio.voiceModel.configSha256, generatorAudit.configSha256);
  assert.deepEqual(manifest.audio.voices, [
    { role: 'lecturer', speaker: 'p230', speakerId: generatorAudit.speakerId, locale: 'en_GB' },
  ]);
  assert.equal(manifest.audio.rightsReview.status, 'documented-open-licence');
  assert.equal(manifest.audio.rightsReview.publicationUse, 'permitted-with-attribution');
  assert.equal(manifest.audio.isolatedPartAsset, true);

  assert.equal(manifest.automatedAsrAudit.status, 'candidate-evidence-only');
  assert.equal(manifest.automatedAsrAudit.answerEvidence.length, 10);
  assert.deepEqual(
    manifest.automatedAsrAudit.answerEvidence.map(({ question, answer }) => [question, answer]),
    EXPECTED_ANSWERS.map((answer, index) => [31 + index, answer]),
  );
  assert.equal(manifest.contentAudit.speakerCount, 1);
  assert.equal(manifest.contentAudit.academicMonologue, true);
  assert.deepEqual(manifest.contentAudit.questionRange, [31, 40]);
  assert.deepEqual(manifest.contentAudit.noteCompletionRange, [31, 40]);
  assert.equal(manifest.contentAudit.noteCompletionMaxWords, 1);
  assert.deepEqual(manifest.contentAudit.answerKeys, EXPECTED_ANSWERS);
  assert.equal(manifest.contentAudit.rawScoreOnly, true);
  assert.equal(manifest.contentAudit.bandPrediction, false);
  assert.equal(manifest.automatedChecks.staticSourceAstAudit, 'pass');
  assert.equal(manifest.automatedChecks.privateProjectionGate, 'pass');
  assert.equal(manifest.automatedChecks.visibleBlankContextsDoNotContainAnswers, 'pass');
  assert.equal(manifest.release.status, 'draft');
  assert.equal(manifest.release.approvedBy, null);
  assert.equal(manifest.release.approvedAt, null);
  assert.equal(manifest.release.blockers.length, 6);
  assert.equal(manifest.release.blockers.some((value) => /human pronunciation/i.test(value)), true);
  assert.equal(manifest.release.blockers.some((value) => /public note-completion DTO/i.test(value)), true);
  assert.equal(manifest.release.blockers.some((value) => /single canonical Part 4 route/i.test(value)), true);
}

test('Part 4 source is canonical, private and structurally exact', () => {
  const sourceText = fs.readFileSync(sourcePath, 'utf8');
  const source = inspectIeltsListeningStaticSource(sourceText);
  const registry = fs.readFileSync(path.join(root, 'src/data/ielts/listening-practice-registry.server.ts'), 'utf8');
  const catalog = fs.readFileSync(path.join(root, 'config/ielts-listening-practices.json'), 'utf8');
  const sitemap = fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8');

  assertPart4SourceContract(source);

  assert.doesNotMatch(registry, /listening-part4-welearn-001|welearn-listening-part-4-001/);
  assert.doesNotMatch(catalog, /welearn-listening-part-4-001/);
  assert.doesNotMatch(sitemap, /\/practica\/ielts\/listening\/(?:part|section)-4/);
  const appEntryPaths = walkAllFiles(path.join(root, 'src/app'))
    .map((filePath) => path.relative(path.join(root, 'src/app'), filePath));
  const pagesEntryPaths = walkAllFiles(path.join(root, 'src/pages'))
    .map((filePath) => path.relative(path.join(root, 'src/pages'), filePath));
  const publicationIntent = JSON.parse(fs.readFileSync(manifestPath, 'utf8')).publicationIntent;
  assert.deepEqual(appEntriesForRoute(appEntryPaths, publicationIntent.canonicalRoute), []);
  assert.deepEqual(pagesEntriesForRoute(pagesEntryPaths, publicationIntent.canonicalRoute), []);
  for (const forbiddenRoute of publicationIntent.forbiddenRoutes) {
    assert.deepEqual(
      appEntriesForRoute(appEntryPaths, forbiddenRoute),
      [],
      `${forbiddenRoute} must never become a competing page or route handler`,
    );
    assert.deepEqual(
      pagesEntriesForRoute(pagesEntryPaths, forbiddenRoute),
      [],
      `${forbiddenRoute} must never become a Pages Router entry`,
    );
  }
  const routingControlPaths = [
    ...fs.readdirSync(root).filter((name) => /^(?:next\.config\..+|middleware\..+|proxy\..+|vercel\.json)$/i.test(name)),
    ...fs.readdirSync(path.join(root, 'src'))
      .filter((name) => /^(?:middleware|proxy)\..+$/i.test(name))
      .map((name) => `src/${name}`),
  ].sort();
  assertRoutingControlLedger(routingControlPaths.map((filePath) => ({
    filePath,
    content: fs.readFileSync(path.join(root, filePath), 'utf8'),
  })));
  assert.equal(fs.existsSync(path.join(root, `public/audio/ielts/listening/${practiceId}.mp3`)), false);

  const inventory = collectIeltsListeningPublicationInventory(root, sitemap);
  assert.equal(inventory.releaseMarkerIds.includes(practiceId), false);
  assert.equal(inventory.publicAudioPaths.some((filePath) => filePath.includes(practiceId)), false);
  assert.deepEqual(inventory.unexpectedPublicPracticePaths, []);
  const publicIeltsText = walkTextFiles(path.join(root, 'src/app/(site)/practica/ielts'))
    .map((filePath) => fs.readFileSync(filePath, 'utf8'))
    .join('\n');
  assert.doesNotMatch(publicIeltsText, new RegExp(practiceId));

  const runtimeEntries = walkTextFiles(path.join(root, 'src'))
    .filter((filePath) => filePath !== sourcePath)
    .map((filePath) => ({
      filePath: path.relative(root, filePath),
      content: fs.readFileSync(filePath, 'utf8'),
    }));
  const publicEntries = walkTextFiles(path.join(root, 'public')).map((filePath) => ({
    filePath: path.relative(root, filePath),
    content: fs.readFileSync(filePath, 'utf8'),
  }));
  assertPrivateRuntimeIsolation([...runtimeEntries, ...publicEntries], source.transcript);
});

test('Part 4 real note source scores exactly but cannot project before atomic promotion', () => {
  const source = inspectIeltsListeningStaticSource(fs.readFileSync(sourcePath, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const ready = releaseReadySource(source, manifest);
  const responses = Object.fromEntries(EXPECTED_ANSWERS.map((answer, index) => [String(31 + index), answer]));
  const specs = ieltsListeningResponseSpecs(ready);

  assert.deepEqual(ieltsListeningQuestionNumbers(ready), [31, 32, 33, 34, 35, 36, 37, 38, 39, 40]);
  assert.deepEqual(specs, [31, 32, 33, 34, 35, 36, 37, 38, 39, 40].map((number) => ({
    number,
    kind: 'text',
    maxWords: 1,
  })));
  assert.equal(validateIeltsListeningResponses(responses, specs), true);
  assert.equal(validateIeltsListeningResponses({ ...responses, 40: 'two words' }, specs), false);
  assert.equal(validateIeltsListeningResponses({ ...responses, 41: 'extra' }, specs), false);
  const result = scoreIeltsListeningPractice(ready, responses);
  assert.equal(result.correct, 10);
  assert.equal(result.total, 10);
  assert.deepEqual(result.outcomes.map((outcome) => outcome.expected), EXPECTED_ANSWERS);
  assert.match(result.disclosure, /not an official IELTS band score/i);
  assert.throws(
    () => projectIeltsListeningPractice(ready, ready.audio.localPath),
    /note completion is private-stage and cannot be projected before atomic promotion/,
  );
});

test('Part 4 transcript, one-voice generator and draft manifest reconcile exactly', () => {
  const source = inspectIeltsListeningStaticSource(fs.readFileSync(sourcePath, 'utf8'));
  const generator = fs.readFileSync(generatorPath, 'utf8');
  const generatorAudit = inspectGenerator(generator);
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const paragraphs = source.transcript.split(/\n\n+/);

  assertGeneratorContract(generator, generatorAudit);
  assertManifestContract(manifest, source, generatorAudit);
  assert.equal(paragraphs.length, generatorAudit.segments.length);
  assert.deepEqual(generatorAudit.segments.map(spokenText), paragraphs.map(spokenText));
  assert.equal(sha256(fs.readFileSync(rendererPath)), AUDITED_RENDERER_SHA256);
});

test('Part 4 candidate MP3, ASR and ten answer evidences match the manifest', () => {
  const source = inspectIeltsListeningStaticSource(fs.readFileSync(sourcePath, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const audio = fs.readFileSync(candidateAudioPath);
  const asr = fs.readFileSync(candidateAsrPath);
  const metadata = inspectMp3Buffer(audio);
  const id3Title = readId3v24TextFrame(audio, 'TIT2');
  const asrJson = JSON.parse(asr);
  const asrText = spokenText(asrJson.text);
  const blanks = sourceNoteBlanks(source);

  assert.equal(audio.length, AUDITED_AUDIO_BYTES);
  assert.equal(sha256(audio), AUDITED_AUDIO_SHA256);
  assert.equal(manifest.audio.bytes, AUDITED_AUDIO_BYTES);
  assert.equal(manifest.audio.sha256, AUDITED_AUDIO_SHA256);
  assert.equal(manifest.audio.durationSeconds, AUDITED_AUDIO_DURATION_SECONDS);
  assert.equal(id3Title, source.title);
  for (const answer of EXPECTED_ANSWERS) {
    assert.doesNotMatch(` ${spokenText(id3Title)} `, new RegExp(`\\b${spokenText(answer)}\\b`));
  }
  assert.equal(metadata.channels, manifest.audio.channels);
  assert.equal(metadata.sampleRateHz, manifest.audio.sampleRateHz);
  assert.equal(metadata.bitrateBps, manifest.audio.targetBitRate);
  assert.ok(Math.abs(metadata.durationSeconds - manifest.audio.durationSeconds) < 0.000001);
  assert.equal(asr.length, AUDITED_ASR_BYTES);
  assert.equal(sha256(asr), AUDITED_ASR_SHA256);
  assert.equal(manifest.automatedAsrAudit.bytes, AUDITED_ASR_BYTES);
  assert.equal(manifest.automatedAsrAudit.sha256, AUDITED_ASR_SHA256);
  assert.equal(manifest.automatedAsrAudit.inputAudioSha256, AUDITED_AUDIO_SHA256);
  assert.equal(asrJson.language, manifest.automatedAsrAudit.language);

  let asrCursor = 0;
  for (const [index, evidence] of manifest.automatedAsrAudit.answerEvidence.entries()) {
    const line = blanks[index];
    const answer = spokenText(line.blank.expected);
    const visibleContext = ` ${spokenText(`${line.before} ${line.after}`)} `;
    assert.deepEqual(line.blank.acceptedAnswers, [line.blank.expected]);
    assert.equal(evidence.question, 31 + index);
    assert.equal(evidence.answer, line.blank.expected);
    assert.match(` ${spokenText(source.transcript)} `, new RegExp(`\\b${answer}\\b`));
    assert.doesNotMatch(visibleContext, new RegExp(`\\b${answer}\\b`));
    assert.match(spokenText(evidence.transcriptEvidence), new RegExp(`\\b${answer}\\b`));
    assert.match(spokenText(evidence.asrEvidence), new RegExp(`\\b${answer}\\b`));
    assert.match(spokenText(source.transcript), new RegExp(spokenText(evidence.transcriptEvidence)));
    const evidencePosition = asrText.indexOf(spokenText(evidence.asrEvidence), asrCursor);
    assert.notEqual(evidencePosition, -1, `ASR evidence missing or out of order for Question ${evidence.question}`);
    asrCursor = evidencePosition + spokenText(evidence.asrEvidence).length;
  }
});

test('Part 4 authored content has no ten-word overlap with the tracked local data corpus', () => {
  const source = inspectIeltsListeningStaticSource(fs.readFileSync(sourcePath, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const candidateWindows = new Set(wordWindows(authoredCandidateText(source), 10));
  const overlaps = [];
  assert.deepEqual(manifest.originalitySearch.formatBoilerplateExcluded, [
    source.instructions,
    source.groups[0].instruction,
  ]);

  const corpusFiles = [
    ...walkTextFiles(path.join(root, 'src/data')),
    ...walkTextFiles(path.join(root, 'docs')),
  ].filter((filePath) =>
    !filePath.includes(`${path.sep}docs${path.sep}ielts-superhub${path.sep}candidates${path.sep}`)
    && !filePath.includes(`${path.sep}docs${path.sep}ielts-superhub${path.sep}originality${path.sep}`));
  for (const filePath of corpusFiles) {
    if (filePath === sourcePath) continue;
    for (const phrase of wordWindows(fs.readFileSync(filePath, 'utf8'), 10)) {
      if (candidateWindows.has(phrase)) {
        overlaps.push(`${path.relative(root, filePath)}: ${phrase}`);
        if (overlaps.length >= 20) break;
      }
    }
    if (overlaps.length >= 20) break;
  }
  assert.deepEqual(overlaps, []);
});

test('Part 4 source, generator and manifest mutations fail closed', () => {
  const sourceText = fs.readFileSync(sourcePath, 'utf8');
  const source = inspectIeltsListeningStaticSource(sourceText);
  const generator = fs.readFileSync(generatorPath, 'utf8');
  const generatorAudit = inspectGenerator(generator);
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  assert.throws(
    () => inspectIeltsListeningStaticSource(sourceText.replace(
      "title: 'From Fuzz to Wear-Off: Understanding Fabric Pilling'",
      'title: getTitle()',
    )),
    /must be deeply static/,
  );
  assert.throws(
    () => inspectIeltsListeningStaticSource(`${sourceText}\nSOURCE.groups = [];`),
    /only the three canonical imports, SOURCE and its six canonical exported adapters|unapproved reference/,
  );
  assert.throws(
    () => inspectIeltsListeningStaticSource(sourceText.replace(
      'return ieltsListeningQuestionNumbers(SOURCE);',
      'return ieltsListeningQuestionNumbers(OTHER_SOURCE);',
    )),
    /must receive SOURCE directly/,
  );
  const acceptedAliasSource = inspectIeltsListeningStaticSource(sourceText.replace(
    "acceptedAnswers: ['surface']",
    "acceptedAnswers: ['surface', 'fabric']",
  ));
  assert.throws(() => assertPart4SourceContract(acceptedAliasSource));
  const visibleAnswerSource = inspectIeltsListeningStaticSource(sourceText.replace(
    'Ordinary use causes a sequence of changes in loose fibre ends.',
    'Ordinary use brings the ends to the surface before the notes begin.',
  ));
  assert.throws(() => assertPart4SourceContract(visibleAnswerSource));
  assert.throws(() => assertPrivateRuntimeIsolation([{
    filePath: 'src/app/api/private-leak/route.ts',
    content: "import { scoreIeltsListeningPart4Practice } from '@/data/ielts/listening-part4-welearn-001.server';",
  }], source.transcript));
  assert.deepEqual(
    appEntriesForRoute([
      '(other-group)/practica/ielts/listening/part-4/page.js',
      '(site)/practica/ielts/listening/part-4/route.mts',
      '(site)/practica/ielts/listening/part-4/page.mdx',
      '(other-group)/practica/ielts/listening/[slug]/page.jsx',
      '(site)/practica/ielts/listening/[...slug]/route.ts',
      '(site)/practica/ielts/listening/[[...slug]]/page.tsx',
      '(site)/practica/ielts/listening/@modal/(.)part-4/page.tsx',
      '(site)/practica/ielts/listening/deep/@modal/(..)(..)listening/part-4/page.tsx',
      '@modal/(...)practica/ielts/listening/part-4/page.tsx',
    ], '/practica/ielts/listening/part-4'),
    [
      '(other-group)/practica/ielts/listening/part-4/page.js',
      '(site)/practica/ielts/listening/part-4/route.mts',
      '(site)/practica/ielts/listening/part-4/page.mdx',
      '(other-group)/practica/ielts/listening/[slug]/page.jsx',
      '(site)/practica/ielts/listening/[...slug]/route.ts',
      '(site)/practica/ielts/listening/[[...slug]]/page.tsx',
      '(site)/practica/ielts/listening/@modal/(.)part-4/page.tsx',
      '(site)/practica/ielts/listening/deep/@modal/(..)(..)listening/part-4/page.tsx',
      '@modal/(...)practica/ielts/listening/part-4/page.tsx',
    ],
  );
  assert.deepEqual(
    pagesEntriesForRoute([
      'practica/ielts/listening/part-4.tsx',
      'practica/ielts/listening/part-4/index.js',
      'practica/ielts/listening/[slug].jsx',
      'practica/ielts/listening/[...slug].ts',
      'practica/ielts/listening/[[...slug]].tsx',
    ], '/practica/ielts/listening/part-4'),
    [
      'practica/ielts/listening/part-4.tsx',
      'practica/ielts/listening/part-4/index.js',
      'practica/ielts/listening/[slug].jsx',
      'practica/ielts/listening/[...slug].ts',
      'practica/ielts/listening/[[...slug]].tsx',
    ],
  );
  assert.throws(() => assertRoutingControlLedger([
    {
      filePath: 'next.config.ts',
      content: `${fs.readFileSync(path.join(root, 'next.config.ts'), 'utf8')}\n// rewrite Part 4`,
    },
    { filePath: 'src/proxy.ts', content: fs.readFileSync(path.join(root, 'src/proxy.ts'), 'utf8') },
    { filePath: 'vercel.json', content: fs.readFileSync(path.join(root, 'vercel.json'), 'utf8') },
  ]));
  assert.throws(() => assertRoutingControlLedger([
    { filePath: 'next.config.ts', content: fs.readFileSync(path.join(root, 'next.config.ts'), 'utf8') },
    { filePath: 'src/middleware.ts', content: 'export function middleware() {}' },
    { filePath: 'src/proxy.ts', content: fs.readFileSync(path.join(root, 'src/proxy.ts'), 'utf8') },
    { filePath: 'vercel.json', content: fs.readFileSync(path.join(root, 'vercel.json'), 'utf8') },
  ]));
  assert.throws(() => assertPrivateRuntimeIsolation([{
    filePath: 'public/leaks/neutral.txt',
    content: source.transcript,
  }], source.transcript));
  assert.throws(() => assertPrivateRuntimeIsolation([{
    filePath: 'public/leaks/answers.json',
    content: JSON.stringify(EXPECTED_ANSWERS),
  }], source.transcript));
  const mutatedSegmentsGenerator = generator.replace(
    'const piperPython',
    "segments[0] = 'replacement';\n\nconst piperPython",
  );
  assert.throws(
    () => assertGeneratorContract(mutatedSegmentsGenerator, inspectGenerator(mutatedSegmentsGenerator)),
  );
  assert.throws(
    () => assertGeneratorContract(generator.replace('docs/ielts-superhub/candidates', 'public/audio'), generatorAudit),
  );

  for (const [label, mutate] of [
    ['practice ID', (value) => { value.practiceId = 'welearn-listening-part-4-999'; }],
    ['content version', (value) => { value.contentVersion = 'mutated'; }],
    ['transcript ownership', (value) => { value.ownership.borrowedTranscript = true; }],
    ['candidate path', (value) => { value.audio.candidatePath = 'public/leak.mp3'; }],
    ['generator checksum', (value) => { value.audio.generatorSha256 = '0'.repeat(64); }],
    ['renderer checksum', (value) => { value.audio.rendererSha256 = '0'.repeat(64); }],
    ['model checksum', (value) => { value.audio.voiceModel.sha256 = '0'.repeat(64); }],
    ['canonical route', (value) => { value.publicationIntent.canonicalRoute = '/practica/ielts/listening/section-4'; }],
    ['alias route', (value) => { value.publicationIntent.aliasRoute = '/practica/ielts/listening/section-4'; }],
    ['blog boundary', (value) => { value.publicationIntent.blogBoundary = ''; }],
    ['ASR answer evidence', (value) => { value.automatedAsrAudit.answerEvidence[0].answer = 'xylophone'; }],
    ['approval', (value) => { value.release.approvedBy = 'self-approved'; }],
  ]) {
    const mutatedManifest = structuredClone(manifest);
    mutate(mutatedManifest);
    assert.throws(
      () => assertManifestContract(mutatedManifest, source, generatorAudit),
      undefined,
      label,
    );
  }
});
