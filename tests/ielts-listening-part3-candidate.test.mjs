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
const practiceId = 'welearn-listening-part-3-001';
const sourcePath = path.join(root, 'src/data/ielts/listening-part3-welearn-001.server.ts');
const generatorPath = path.join(root, 'scripts/generate-ielts-listening-part3-audio.mjs');
const rendererPath = path.join(root, 'scripts/lib/render-ielts-piper-segments.py');
const manifestPath = path.join(root, `docs/ielts-superhub/originality/${practiceId}.json`);
const candidateRoot = path.join(root, `docs/ielts-superhub/candidates/${practiceId}`);
const candidateAudioPath = path.join(candidateRoot, `${practiceId}.mp3`);
const candidateAsrPath = path.join(candidateRoot, 'asr', `${practiceId}.json`);
const pronunciationDictionaryPath = path.join(root, 'src/data/fonetica');
const AUDITED_GENERATOR_SHA256 = 'b66d4c3ef61edfb52b7057667634778e966acdfe39661389ed555d24bdfebf4a';
const AUDITED_RENDERER_SHA256 = '7445edddb7193c1178a9d794b85385583e05aadd76cac06a140e05ec22e3a0a0';
const AUDITED_PIPER_VERSION = '1.7.0';
const AUDITED_PIPER_MODEL_SHA256 = '4e9fc85ab9009385319fc6bae7f55577f8a2d7ee77fd9159a5500eb6531f41e6';
const AUDITED_PIPER_CONFIG_SHA256 = '7f85e6391ed0f7f46e4abd19345929a16be931a0c9945086f96692dce2087fa8';

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function assertAuditedRenderer(buffer) {
  assert.equal(sha256(buffer), AUDITED_RENDERER_SHA256);
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
    return /\.(?:ts|tsx|js|mjs|json|md)$/.test(entry.name) ? [absolutePath] : [];
  });
}

function findVariableInitializer(sourceFile, variableName) {
  const matches = sourceFile.statements.flatMap((statement) => {
    if (!ts.isVariableStatement(statement)) return [];
    return statement.declarationList.declarations.filter((declaration) =>
      ts.isIdentifier(declaration.name) && declaration.name.text === variableName);
  });
  assert.equal(matches.length, 1, `expected one ${variableName} declaration`);
  assert.ok(
    (matches[0].parent.flags & ts.NodeFlags.Const) !== 0,
    `${variableName} must be declared with const`,
  );
  assert.ok(matches[0].initializer, `${variableName} needs an initializer`);
  return matches[0].initializer;
}

function identifierReferences(sourceFile, variableName) {
  const references = [];
  function visit(node) {
    if (
      ts.isIdentifier(node)
      && node.text === variableName
      && !(ts.isVariableDeclaration(node.parent) && node.parent.name === node)
      && !(ts.isPropertyAssignment(node.parent) && node.parent.name === node)
    ) {
      references.push(node);
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return references;
}

function assertGeneratorReferenceShape(sourceFile) {
  const turnsReferences = identifierReferences(sourceFile, 'turns');
  assert.equal(turnsReferences.length, 2, 'turns must have only its canonical map and forEach uses');
  assert.deepEqual(
    turnsReferences.map((node) => {
      assert.ok(
        ts.isPropertyAccessExpression(node.parent) && node.parent.expression === node,
        'turns cannot be aliased, assigned or passed to a mutator',
      );
      return node.parent.name.text;
    }).sort(),
    ['forEach', 'map'],
  );

  for (const variableName of ['speakerByRole', 'lengthScaleByRole']) {
    const references = identifierReferences(sourceFile, variableName);
    assert.equal(references.length, 1, `${variableName} must have one canonical lookup`);
    assert.ok(
      ts.isElementAccessExpression(references[0].parent)
      && references[0].parent.expression === references[0],
      `${variableName} cannot be aliased, assigned or passed to a mutator`,
    );
    assert.ok(
      ts.isIdentifier(references[0].parent.argumentExpression)
      && references[0].parent.argumentExpression.text === 'role',
      `${variableName} must be indexed only by the current role`,
    );
  }
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
    'generate-ielts-listening-part3-audio.mjs',
    generator,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  );
  assert.deepEqual(sourceFile.parseDiagnostics ?? [], []);
  assertGeneratorReferenceShape(sourceFile);

  const turnsNode = findVariableInitializer(sourceFile, 'turns');
  assert.ok(ts.isArrayLiteralExpression(turnsNode));
  const turns = turnsNode.elements.map((turn, index) => {
    assert.ok(ts.isArrayLiteralExpression(turn), `turn ${index + 1} must be a direct array`);
    assert.equal(turn.elements.length, 2);
    return [
      staticString(turn.elements[0], `turn ${index + 1} role`),
      staticString(turn.elements[1], `turn ${index + 1} text`),
    ];
  });

  const speakersNode = findVariableInitializer(sourceFile, 'speakerByRole');
  assert.ok(ts.isObjectLiteralExpression(speakersNode));
  const speakers = Object.fromEntries(speakersNode.properties.map((property) => {
    assert.ok(ts.isPropertyAssignment(property) && ts.isIdentifier(property.name));
    return [
      property.name.text,
      staticNumber(property.initializer, `${property.name.text} speaker ID`),
    ];
  }));

  const modelSha256 = staticString(
    findVariableInitializer(sourceFile, 'expectedPiperModelSha256'),
    'expected Piper model checksum',
  );
  const configSha256 = staticString(
    findVariableInitializer(sourceFile, 'expectedPiperConfigSha256'),
    'expected Piper config checksum',
  );
  const piperVersion = staticString(
    findVariableInitializer(sourceFile, 'expectedPiperVersion'),
    'expected Piper version',
  );
  const rendererSha256 = staticString(
    findVariableInitializer(sourceFile, 'expectedRendererSha256'),
    'expected renderer checksum',
  );

  return {
    turns,
    speakers,
    modelSha256,
    configSha256,
    piperVersion,
    rendererSha256,
    sourceSha256: sha256(Buffer.from(generator)),
  };
}

function authoredCandidateText(source) {
  return [
    source.title,
    source.scenario,
    source.transcript,
    ...source.groups.flatMap((group) => [
      ...group.questions.flatMap((question) => [
        question.prompt,
        question.explanation,
        ...(question.options ?? []).map((option) => option.label),
      ]),
      ...(group.options ?? []).map((option) => option.label),
    ]),
  ].join('\n');
}

function releaseReadySource(source, manifest) {
  const ready = structuredClone(source);
  ready.audio.durationSeconds = manifest.audio.durationSeconds;
  ready.audio.sha256 = manifest.audio.sha256;
  return ready;
}

function assertPart3ManifestContract(manifest, source, generatorAudit) {
  assert.deepEqual(Object.keys(manifest).sort(), [
    'audio',
    'automatedAsrAudit',
    'automatedChecks',
    'contentAudit',
    'contentVersion',
    'createdAt',
    'formatSources',
    'originalitySearch',
    'ownership',
    'practiceId',
    'release',
    'schemaVersion',
  ]);
  assert.equal(manifest.schemaVersion, 1);
  assert.equal(manifest.practiceId, source.id);
  assert.equal(manifest.contentVersion, source.contentVersion);
  assert.equal(manifest.createdAt, '2026-09-01');
  assert.deepEqual(manifest.ownership, {
    author: 'Idiomas WeLearn',
    status: 'draft-original-independent-practice',
    borrowedQuestions: false,
    borrowedTranscript: false,
    borrowedAudio: false,
    trademarkDisclosure: 'IELTS is a protected trademark. This resource is not affiliated with or endorsed by its owners.',
  });
  assert.deepEqual(manifest.formatSources, [
    'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening',
    'https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test',
  ]);
  assert.deepEqual(manifest.originalitySearch, {
    status: 'completed-automated-search-review',
    checkedAt: '2026-09-01',
    localCorpusScope: 'Tracked authored TS/TSX/JS/MJS/JSON/Markdown under src/data and docs, including IELTS, TOEFL and other exam banks; the pronunciation dictionary, candidate/originality directories and three operational instruction templates are explicitly excluded.',
    queries: [
      '"Mereford Ensemble Feedback Trial"',
      '"rehearsal feedback cards" ensemble timing balance entries',
      '"treated green as a compliment" "amber as a warning"',
      '"after each four-minute performance" "ninety seconds"',
    ],
    queryUrls: [
      'https://www.google.com/search?q=%22Mereford+Ensemble+Feedback+Trial%22',
      'https://www.google.com/search?q=%22rehearsal+feedback+cards%22+ensemble+timing+balance+entries',
      'https://www.google.com/search?q=%22treated+green+as+a+compliment%22+%22amber+as+a+warning%22',
      'https://www.google.com/search?q=%22after+each+four-minute+performance%22+%22ninety+seconds%22',
    ],
    formatBoilerplateExcluded: [
      source.instructions,
      ...source.groups.map((group) => group.instruction),
    ],
    result: 'No local match and no material exact-match result was observed for the four recorded Google phrase queries. This is an automated collision signal, not a legal conclusion or a substitute for final editorial review.',
    rejectedConcepts: [
      {
        concept: 'University library quiet-booth pilot',
        reason: 'Rejected before authoring because local WeLearn content and a public university pilot shared the library, quiet-space, booking and student-evaluation fingerprint.',
      },
      {
        concept: 'Geology teaching collection',
        reason: 'Rejected before authoring because an existing local IELTS Part 3 already uses geology fieldwork and another IELTS set uses a geological gallery.',
      },
    ],
  });

  assert.deepEqual(Object.keys(manifest.audio).sort(), [
    'bytes',
    'candidatePath',
    'channels',
    'durationSeconds',
    'engine',
    'futurePublicPath',
    'generator',
    'generatorSha256',
    'isolatedPartAsset',
    'renderer',
    'rendererSha256',
    'rightsReview',
    'sampleRateHz',
    'sha256',
    'targetBitRate',
    'voiceModel',
    'voices',
  ]);
  assert.equal(manifest.audio.candidatePath, `docs/ielts-superhub/candidates/${practiceId}/${practiceId}.mp3`);
  assert.equal(manifest.audio.futurePublicPath, `public/audio/ielts/listening/${practiceId}.mp3`);
  assert.equal(manifest.audio.generator, 'scripts/generate-ielts-listening-part3-audio.mjs');
  assert.equal(manifest.audio.generatorSha256, AUDITED_GENERATOR_SHA256);
  assert.equal(generatorAudit.sourceSha256, AUDITED_GENERATOR_SHA256);
  assert.equal(manifest.audio.renderer, 'scripts/lib/render-ielts-piper-segments.py');
  assert.equal(manifest.audio.rendererSha256, AUDITED_RENDERER_SHA256);
  assert.equal(generatorAudit.rendererSha256, AUDITED_RENDERER_SHA256);
  assertAuditedRenderer(fs.readFileSync(rendererPath));
  assert.deepEqual(manifest.audio.engine, {
    name: 'Piper',
    version: AUDITED_PIPER_VERSION,
    source: 'https://github.com/OHF-Voice/piper1-gpl',
    license: 'GPL-3.0-or-later',
  });
  assert.deepEqual(manifest.audio.voiceModel, {
    id: 'en_GB-vctk-medium',
    sha256: AUDITED_PIPER_MODEL_SHA256,
    configSha256: AUDITED_PIPER_CONFIG_SHA256,
    repositoryLicense: 'MIT',
    repositoryCommit: '39ab474be869e9181350af6a65e4953eef67aaa0',
    modelCard: 'https://huggingface.co/rhasspy/piper-voices/blob/39ab474be869e9181350af6a65e4953eef67aaa0/en/en_GB/vctk/medium/MODEL_CARD',
    modelCardSha256: '53ec6b1fd90d9125d5bebac55261efd27f7e8d6dc962f605a5b5f796df2ec7fb',
    modelCardBytes: 326,
    trainingDataset: 'CSTR VCTK Corpus',
    datasetSource: 'https://datashare.ed.ac.uk/handle/10283/3443',
    datasetLicense: 'CC-BY-4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    attribution: 'VCTK Corpus, University of Edinburgh, used through the Piper en_GB-vctk-medium voice model under CC BY 4.0.',
  });
  assert.equal(generatorAudit.piperVersion, AUDITED_PIPER_VERSION);
  assert.equal(generatorAudit.modelSha256, AUDITED_PIPER_MODEL_SHA256);
  assert.equal(generatorAudit.configSha256, AUDITED_PIPER_CONFIG_SHA256);
  assert.deepEqual(manifest.audio.voices, [
    { role: 'tutor', speaker: 'p230', speakerId: 74, locale: 'en_GB' },
    { role: 'lara', speaker: 'p225', speakerId: 107, locale: 'en_GB' },
    { role: 'jonah', speaker: 'p226', speakerId: 95, locale: 'en_GB' },
  ]);
  assert.deepEqual(manifest.audio.rightsReview, {
    status: 'documented-open-licence',
    checkedAt: '2026-09-01',
    publicationUse: 'permitted-with-attribution',
    attributionLocation: 'pending future Part 3 landing',
  });
  assert.equal(manifest.audio.isolatedPartAsset, true);

  assert.deepEqual(manifest.automatedAsrAudit, {
    status: 'candidate-evidence-only',
    checkedAt: '2026-09-01',
    engine: 'OpenAI Whisper small',
    language: 'en',
    path: `docs/ielts-superhub/candidates/${practiceId}/asr/${practiceId}.json`,
    bytes: 33664,
    sha256: 'a3956b985e975b47e6d24e67d197e68edff1a658fb6c09436eeec72d9beafb35',
    criticalAnswerEvidence: '10-of-10 present and non-contradictory in ASR output',
    observedCautions: [
      'Mereford was decoded as Mayerford.',
      'Lara was sometimes decoded as Laura and the opening Lara and Jonah became Lauren Jonah.',
      'Compliment was decoded as complement; the decisive green-versus-amber colour interpretation remains explicit.',
      "The tutor's explanation of why balance attracted most comments was imperfectly decoded, but the decisive louder-or-quieter evidence for Question 21 remains explicit.",
      "Select two and time them was decoded as select two in time than; Jonah's timed-extract confirmation remains explicit.",
      'The closing Lara confirmation was decoded as La and that comparison as their comparison; the visual responsibility remains semantically explicit.',
    ],
    disclosure: 'Automated ASR is diagnostic evidence only and cannot satisfy the required human pronunciation, pacing, voice differentiation and intelligibility review.',
  });

  assert.deepEqual(manifest.contentAudit, {
    speakerCount: 3,
    educationalContext: true,
    questionRange: [21, 30],
    singleChoiceRange: [21, 25],
    matchingRange: [26, 30],
    singleChoiceOptionsPerQuestion: 3,
    matchingOptionKeys: ['A', 'B', 'C'],
    matchingOptionReuse: 'may-repeat',
    difficultyProfile: 'guided-initial-part-3-candidate',
    answerKeys: ['A', 'B', 'A', 'C', 'B', 'A', 'B', 'C', 'B', 'A'],
    rawScoreOnly: true,
    bandPrediction: false,
  });
  assert.deepEqual(manifest.automatedChecks, {
    tenContinuousQuestions: 'pass',
    staticSourceAstAudit: 'pass',
    privateProjectionGate: 'pass',
    serverOnlyScoring: 'pass',
    postSubmitExplanations: 'authored-pending-promotion',
    audioChecksum: 'candidate-recorded',
    asrEvidence: '10-of-10-present',
    legacySetImported: false,
  });
  assert.deepEqual(manifest.release, {
    status: 'draft',
    blockers: [
      'Complete a human pronunciation, pacing, voice differentiation and intelligibility review.',
      'Complete an editorial review of musical naturalness and distractor fairness.',
      'Replace non-release-ready audio metadata in the server source.',
      'Implement and audit the public matching DTO and renderer only during atomic promotion.',
      'Promote the approved MP3 to public only in the same change that registers and tests Part 3.',
    ],
    approvedBy: null,
    approvedAt: null,
  });
}

function transcriptTurns(transcript) {
  const roleByLabel = {
    'DR HARLOW': 'tutor',
    LARA: 'lara',
    JONAH: 'jonah',
  };
  return transcript.split(/\n\n+/).map((paragraph, index) => {
    const match = /^(DR HARLOW|LARA|JONAH):\s*([\s\S]+)$/.exec(paragraph);
    assert.ok(match, `transcript paragraph ${index + 1} needs one canonical speaker label`);
    return [roleByLabel[match[1]], match[2]];
  });
}

test('Part 3 source is canonical, private and structurally exact', () => {
  const sourceText = fs.readFileSync(sourcePath, 'utf8');
  const source = inspectIeltsListeningStaticSource(sourceText);
  const registry = fs.readFileSync(path.join(root, 'src/data/ielts/listening-practice-registry.server.ts'), 'utf8');
  const catalog = fs.readFileSync(path.join(root, 'config/ielts-listening-practices.json'), 'utf8');
  const sitemap = fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8');

  assert.equal(source.id, practiceId);
  assert.equal(source.contentVersion, '2026-09-01.draft.1');
  assert.equal(source.part, 3);
  assert.equal(source.practiceNumber, 1);
  assert.deepEqual(source.audio, {
    localPath: `/audio/ielts/listening/${practiceId}.mp3`,
    durationSeconds: 0,
    sha256: '0'.repeat(64),
  });
  assert.deepEqual(source.groups.map((group) => [group.type, group.questionRange]), [
    ['single-choice', [21, 25]],
    ['matching', [26, 30]],
  ]);
  assert.deepEqual(
    source.groups.flatMap((group) => group.questions.map((question) => question.number)),
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  );
  assert.equal(source.groups[1].optionReuse, 'may-repeat');
  assert.deepEqual(source.groups[1].options.map((option) => option.key), ['A', 'B', 'C']);
  assert.equal(source.groups[1].questions.some((question) => 'expected' in question), false);

  assert.doesNotMatch(registry, /listening-part3-welearn-001|welearn-listening-part-3-001/);
  assert.doesNotMatch(catalog, /welearn-listening-part-3-001/);
  assert.doesNotMatch(sitemap, /\/practica\/ielts\/listening\/part-3/);
  assert.equal(fs.existsSync(path.join(root, 'src/app/(site)/practica/ielts/listening/part-3/page.tsx')), false);
  assert.equal(fs.existsSync(path.join(root, `public/audio/ielts/listening/${practiceId}.mp3`)), false);
  assert.equal(fs.existsSync(path.join(root, `public/images/ielts/listening/${practiceId}-map.svg`)), false);

  const inventory = collectIeltsListeningPublicationInventory(root, sitemap);
  assert.equal(inventory.releaseMarkerIds.includes(practiceId), false);
  assert.equal(inventory.publicAudioPaths.some((filePath) => filePath.includes(practiceId)), false);
  assert.equal(inventory.publicMapPaths.some((filePath) => filePath.includes(practiceId)), false);
  assert.deepEqual(inventory.unexpectedPublicPracticePaths, []);
  const publicIeltsText = walkTextFiles(path.join(root, 'src/app/(site)/practica/ielts'))
    .map((filePath) => fs.readFileSync(filePath, 'utf8'))
    .join('\n');
  assert.doesNotMatch(publicIeltsText, new RegExp(practiceId));
});

test('Part 3 matching is privately scoreable but impossible to project', () => {
  const source = inspectIeltsListeningStaticSource(fs.readFileSync(sourcePath, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const ready = releaseReadySource(source, manifest);
  const expectedKeys = ['A', 'B', 'A', 'C', 'B', 'A', 'B', 'C', 'B', 'A'];
  const responses = Object.fromEntries(expectedKeys.map((key, index) => [String(21 + index), key]));

  assert.deepEqual(ieltsListeningQuestionNumbers(ready), [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
  assert.deepEqual(
    ready.groups.flatMap((group) => group.questions.map((question) => question.correctOptionKey)),
    expectedKeys,
  );
  const specs = ieltsListeningResponseSpecs(ready);
  assert.deepEqual(specs.slice(5), [26, 27, 28, 29, 30].map((number) => ({
    number,
    kind: 'choice',
    allowedValues: ['A', 'B', 'C'],
  })));
  assert.equal(validateIeltsListeningResponses(responses, specs), true);
  assert.equal(validateIeltsListeningResponses({ ...responses, 30: 'a' }, specs), false);

  const result = scoreIeltsListeningPractice(ready, responses);
  assert.equal(result.correct, 10);
  assert.equal(result.total, 10);
  assert.equal(result.outcomes.length, 10);
  assert.match(result.disclosure, /not an official IELTS band score/i);
  assert.throws(
    () => projectIeltsListeningPractice(ready, ready.audio.localPath),
    /matching is private-stage and cannot be projected before atomic promotion/,
  );

  const unknownKey = structuredClone(ready);
  unknownKey.groups[1].questions[0].correctOptionKey = 'D';
  assert.throws(() => scoreIeltsListeningPractice(unknownKey, responses), /unknown correct option/);
  const onceOnly = structuredClone(ready);
  onceOnly.groups[1].optionReuse = 'once-only';
  assert.throws(() => scoreIeltsListeningPractice(onceOnly, responses), /repeats an answer despite its once-only policy/);
});

test('Part 3 transcript, three-voice generator and manifest reconcile exactly', () => {
  const source = inspectIeltsListeningStaticSource(fs.readFileSync(sourcePath, 'utf8'));
  const generator = fs.readFileSync(generatorPath, 'utf8');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const generatorAudit = inspectGenerator(generator);
  const { turns, speakers } = generatorAudit;
  const sourceTurns = transcriptTurns(source.transcript);

  assertPart3ManifestContract(manifest, source, generatorAudit);

  assert.equal(turns.length, 48);
  assert.deepEqual(Object.keys(speakers).sort(), ['jonah', 'lara', 'tutor']);
  assert.equal(new Set(Object.values(speakers)).size, 3);
  assert.deepEqual(
    Object.fromEntries(manifest.audio.voices.map((voice) => [voice.role, voice.speakerId])),
    speakers,
  );
  const answerKeys = source.groups.flatMap((group) =>
    group.questions.map((question) => question.correctOptionKey));
  assert.equal(manifest.contentAudit.speakerCount, manifest.audio.voices.length);
  assert.deepEqual(manifest.contentAudit.questionRange, [21, 30]);
  assert.deepEqual(manifest.contentAudit.singleChoiceRange, source.groups[0].questionRange);
  assert.deepEqual(manifest.contentAudit.matchingRange, source.groups[1].questionRange);
  assert.equal(
    source.groups[0].questions.every((question) =>
      question.options.length === manifest.contentAudit.singleChoiceOptionsPerQuestion),
    true,
  );
  assert.deepEqual(
    manifest.contentAudit.matchingOptionKeys,
    source.groups[1].options.map((option) => option.key),
  );
  assert.equal(manifest.contentAudit.matchingOptionReuse, source.groups[1].optionReuse);
  assert.deepEqual(manifest.contentAudit.answerKeys, answerKeys);
  assert.equal(manifest.contentAudit.rawScoreOnly, true);
  assert.equal(manifest.contentAudit.bandPrediction, false);
  assert.deepEqual([...new Set(turns.map(([role]) => role))].sort(), ['jonah', 'lara', 'tutor']);
  assert.deepEqual(turns.map(([role]) => role), sourceTurns.map(([role]) => role));
  assert.deepEqual(
    turns.map(([, text]) => spokenText(text)),
    sourceTurns.map(([, text]) => spokenText(text)),
  );
  assert.equal([...generator.matchAll(/speakerId:/g)].length, 1);
  assert.match(generator, /speakerId: Number\(speakerByRole\[role\]\)/);
  assert.match(generator, /lengthScale: lengthScaleByRole\[role\]/);
  assert.match(generator, /fileSha256\(piperModel\) !== expectedPiperModelSha256/);
  assert.match(generator, /fileSha256\(piperConfig\) !== expectedPiperConfigSha256/);
  assert.match(generator, /docs\/ielts-superhub\/candidates/);
  assert.doesNotMatch(generator, /public\/audio/);
  assert.doesNotMatch(generator, /run\(['"]say['"]|voiceByRole|['"]Daniel['"]|['"]Karen['"]/);
});

test('Part 3 generator and manifest mutations fail closed', () => {
  const source = inspectIeltsListeningStaticSource(fs.readFileSync(sourcePath, 'utf8'));
  const generator = fs.readFileSync(generatorPath, 'utf8');
  const generatorAudit = inspectGenerator(generator);
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  assert.throws(() => assertAuditedRenderer(Buffer.from('mutated renderer')));

  for (const [label, mutatedGenerator] of [
    ['turn rewrite', generator.replace('const piperPython', "turns[0][1] = 'replacement';\n\nconst piperPython")],
    ['speaker rewrite', generator.replace('const lengthScaleByRole', "Object.assign(speakerByRole, { tutor: 107 });\n\nconst lengthScaleByRole")],
    ['global JSON rewrite', generator.replace('const piperPython', "JSON.stringify = () => 'MUTATED AUDIO';\n\nconst piperPython")],
    ['output rewrite', generator.replace("'docs/ielts-superhub/candidates/welearn-listening-part-3-001/welearn-listening-part-3-001.mp3'", "'docs/ielts-superhub/candidates/welearn-listening-part-3-001/other.mp3'")],
    ['checksum bypass', generator.replace('function fileSha256(filePath) {', "fileSha256 = () => '${AUDITED_PIPER_MODEL_SHA256}';\n\nfunction fileSha256(filePath) {")],
  ]) {
    assert.throws(() => {
      const mutatedAudit = inspectGenerator(mutatedGenerator);
      assertPart3ManifestContract(manifest, source, mutatedAudit);
    }, undefined, label);
  }

  for (const [label, mutate] of [
    ['practice ID', (value) => { value.practiceId = 'welearn-listening-part-3-999'; }],
    ['content version', (value) => { value.contentVersion = 'mutated'; }],
    ['transcript ownership', (value) => { value.ownership.borrowedTranscript = true; }],
    ['candidate path', (value) => { value.audio.candidatePath = 'public/leak.mp3'; }],
    ['ASR path', (value) => { value.automatedAsrAudit.path = 'public/leak.json'; }],
    ['generator path', (value) => { value.audio.generator = 'scripts/other.mjs'; }],
    ['renderer path', (value) => { value.audio.renderer = 'scripts/other.py'; }],
    ['generator checksum', (value) => { value.audio.generatorSha256 = '0'.repeat(64); }],
    ['renderer checksum', (value) => { value.audio.rendererSha256 = '0'.repeat(64); }],
    ['model checksum', (value) => { value.audio.voiceModel.sha256 = '0'.repeat(64); }],
    ['config checksum', (value) => { value.audio.voiceModel.configSha256 = '0'.repeat(64); }],
    ['originality queries', (value) => { value.originalitySearch.queries = ['', '', '', '']; }],
    ['originality URLs', (value) => { value.originalitySearch.queryUrls = Array(4).fill('https://www.google.com/search?q='); }],
    ['originality scope', (value) => { value.originalitySearch.localCorpusScope = 'none'; }],
    ['originality result', (value) => { value.originalitySearch.result = 'copied'; }],
    ['rejected concepts', (value) => { value.originalitySearch.rejectedConcepts = [{}, {}]; }],
  ]) {
    const mutatedManifest = structuredClone(manifest);
    mutate(mutatedManifest);
    assert.throws(
      () => assertPart3ManifestContract(mutatedManifest, source, generatorAudit),
      undefined,
      label,
    );
  }
});

test('Part 3 candidate MP3 and ASR match the draft manifest with ten answer evidences', () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const audio = fs.readFileSync(candidateAudioPath);
  const asr = fs.readFileSync(candidateAsrPath);
  const metadata = inspectMp3Buffer(audio);
  const asrJson = JSON.parse(asr);
  const asrText = spokenText(asrJson.text);

  assert.equal(audio.length, manifest.audio.bytes);
  assert.equal(sha256(audio), manifest.audio.sha256);
  assert.equal(metadata.channels, manifest.audio.channels);
  assert.equal(metadata.sampleRateHz, manifest.audio.sampleRateHz);
  assert.equal(metadata.bitrateBps, manifest.audio.targetBitRate);
  assert.ok(Math.abs(metadata.durationSeconds - manifest.audio.durationSeconds) < 0.000001);
  assert.equal(asr.length, manifest.automatedAsrAudit.bytes);
  assert.equal(sha256(asr), manifest.automatedAsrAudit.sha256);
  assert.equal(asrJson.language, manifest.automatedAsrAudit.language);
  assert.equal(manifest.release.status, 'draft');
  assert.equal(manifest.release.approvedBy, null);
  assert.equal(manifest.release.approvedAt, null);

  for (const evidence of [
    '18 of the 24 cards only said that a section should play louder or more quietly',
    'treated green as a complement and amber as a warning',
    'after each four minute performance allow 90 seconds',
    'performed the same short passage twice',
    'problem identified after the first performance is reduced in the repeated performance',
    'laura should take the headings forward and turn those drafts into the final set',
    'jonah bring me two timed extracts by friday',
    'that remains your task dr harlow',
    'jonah you ll handle the rehearsal materials and keep both rounds apart',
    'take responsibility for presenting their comparison visually',
  ]) {
    assert.match(asrText, new RegExp(spokenText(evidence)));
  }
});

test('Part 3 authored content has no ten-word overlap with the tracked local data corpus', () => {
  const source = inspectIeltsListeningStaticSource(fs.readFileSync(sourcePath, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const candidateWindows = new Set(wordWindows(authoredCandidateText(source), 10));
  const overlaps = [];
  const expectedBoilerplate = [
    source.instructions,
    ...source.groups.map((group) => group.instruction),
  ];
  assert.deepEqual(manifest.originalitySearch.formatBoilerplateExcluded, expectedBoilerplate);
  assert.notEqual(path.resolve(path.join(root, 'src/data/fonetica-copy')), pronunciationDictionaryPath);
  assert.notEqual(path.resolve(path.join(root, 'src/data/not-fonetica')), pronunciationDictionaryPath);

  const corpusFiles = [
    ...walkTextFiles(path.join(root, 'src/data')),
    ...walkTextFiles(path.join(root, 'docs')),
  ].filter((filePath) =>
    !filePath.includes(`${path.sep}docs${path.sep}ielts-superhub${path.sep}candidates${path.sep}`)
    && !filePath.includes(`${path.sep}docs${path.sep}ielts-superhub${path.sep}originality${path.sep}`));
  for (const filePath of corpusFiles) {
    if (filePath === sourcePath) continue;
    const corpusWindows = wordWindows(fs.readFileSync(filePath, 'utf8'), 10);
    for (const phrase of corpusWindows) {
      if (candidateWindows.has(phrase)) {
        overlaps.push(`${path.relative(root, filePath)}: ${phrase}`);
        if (overlaps.length >= 20) break;
      }
    }
    if (overlaps.length >= 20) break;
  }

  assert.deepEqual(overlaps, []);
});

test('the canonical AST inspector rejects dynamic or non-canonical candidate modules', () => {
  const source = fs.readFileSync(sourcePath, 'utf8');
  assert.throws(
    () => inspectIeltsListeningStaticSource(source.replace(
      "title: 'Mereford Ensemble Feedback Trial'",
      'title: getTitle()',
    )),
    /must be deeply static/,
  );
  assert.throws(
    () => inspectIeltsListeningStaticSource(`${source}\nSOURCE.groups = [];`),
    /only the three canonical imports, SOURCE and its six canonical exported adapters|unapproved reference/,
  );
  assert.throws(
    () => inspectIeltsListeningStaticSource(source.replace(
      'return ieltsListeningQuestionNumbers(SOURCE);',
      'return ieltsListeningQuestionNumbers(OTHER_SOURCE);',
    )),
    /must receive SOURCE directly/,
  );
});
