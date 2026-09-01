import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  collectIeltsListeningPublicationInventory,
  findIeltsListeningInversePublicationFailures,
  validateIeltsListeningAudioMetadata,
  validateIeltsListeningMapAsset,
} from '../scripts/check-ielts-listening-public-registry.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PART_ONE_ID = 'welearn-listening-part-1-001';
const PART_TWO_ID = 'welearn-listening-part-2-001';
const PART_ONE_GUIDE = 'src/app/(site)/practica/ielts/listening/part-1/page.tsx';
const PART_TWO_GUIDE = 'src/app/(site)/practica/ielts/listening/part-2/page.tsx';
const PART_ONE_AUDIO = `public/audio/ielts/listening/${PART_ONE_ID}.mp3`;
const PART_TWO_AUDIO = `public/audio/ielts/listening/${PART_TWO_ID}.mp3`;
const PART_TWO_MAP = `public/images/ielts/listening/${PART_TWO_ID}-map.svg`;
const PART_TWO_MAP_URL = `/images/ielts/listening/${PART_TWO_ID}-map.svg`;
const PART_ONE_ROUTE = '/practica/ielts/listening/part-1';
const PART_TWO_ROUTE = '/practica/ielts/listening/part-2';
const MAP_WIDTH = 400;
const MAP_HEIGHT = 240;
const MAP_AREA_KEYS = ['A', 'B'];
const ORIGINAL_MAP_OWNERSHIP = { author: 'Idiomas WeLearn', borrowedMap: false };

function writeFixture(root, relativePath, contents = '') {
  const absolutePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, contents);
}

function releaseBlock(practiceId, contents = 'Published practice') {
  return [
    `// ielts-listening-release:${practiceId}:start`,
    contents,
    `// ielts-listening-release:${practiceId}:end`,
  ].join('\n');
}

function staticSourceWithGroups(groups, prefix = '') {
  return [
    prefix,
    "import 'server-only';",
    "import { resolveAudioUrl } from '@/lib/examAudio';",
    'import {',
    'ieltsListeningQuestionNumbers,',
    'ieltsListeningResponseSpecs,',
    'projectIeltsListeningPractice,',
    'scoreIeltsListeningPractice,',
    'type IeltsListeningPracticeSource,',
    "} from '@/lib/ielts/listening-practice-contract';",
    'const SOURCE: IeltsListeningPracticeSource = {',
    `id: '${PART_TWO_ID}',`,
    "contentVersion: 'test.1',",
    'part: 2,',
    'practiceNumber: 1,',
    'audio: {',
    `localPath: '/audio/ielts/listening/${PART_TWO_ID}.mp3',`,
    'durationSeconds: 120,',
    `sha256: '${'a'.repeat(64)}',`,
    '},',
    'groups: [',
    ...groups,
    '],',
    '};',
    'export function getIeltsListeningPart2Practice() {',
    'const resolved = resolveAudioUrl(SOURCE.audio.localPath) ?? SOURCE.audio.localPath;',
    'return projectIeltsListeningPractice(SOURCE, resolved);',
    '}',
    'export function getIeltsListeningPart2Identity() {',
    'return {',
    'id: SOURCE.id,',
    'contentVersion: SOURCE.contentVersion,',
    'part: SOURCE.part,',
    'practiceNumber: SOURCE.practiceNumber,',
    '} as const;',
    '}',
    'export function getIeltsListeningPart2QuestionNumbers() {',
    'return ieltsListeningQuestionNumbers(SOURCE);',
    '}',
    'export function getIeltsListeningPart2ResponseSpecs() {',
    'return ieltsListeningResponseSpecs(SOURCE);',
    '}',
    'export function scoreIeltsListeningPart2Practice(responses: Readonly<Record<string, string>>) {',
    'return scoreIeltsListeningPractice(SOURCE, responses);',
    '}',
    'export function scoreIeltsListeningPart2Registration(responses: Readonly<Record<string, string>>) {',
    'return {',
    'identity: getIeltsListeningPart2Identity(),',
    'result: scoreIeltsListeningPart2Practice(responses),',
    '} as const;',
    '}',
  ].join('\n');
}

function formOnlySource(prefix = '') {
  return staticSourceWithGroups(["{ type: 'form', id: 'form' },"], prefix);
}

function catalogPractice(practiceId, guidePath, guideRoute) {
  return { practiceId, guidePath, guideRoute };
}

function validMapSvg(keys = ['A', 'B']) {
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">',
    '<title>Community garden visitor map</title>',
    '<desc>Two labelled areas used in an original listening practice.</desc>',
    '<defs><circle id="pin" cx="0" cy="0" r="4" /></defs>',
    ...keys.map((key, index) => `<g data-option-key="${key}"><use href="#pin" x="${20 + index * 40}" y="30" /></g>`),
    '</svg>',
  ].join('');
}

function mapGroupLines({
  url = PART_TWO_MAP_URL,
  width = MAP_WIDTH,
  height = MAP_HEIGHT,
  areaKeys = MAP_AREA_KEYS,
  id = 'map',
} = {}) {
  return [
    '{',
    "type: 'map-labelling',",
    `id: '${id}',`,
    'map: {',
    `url: '${url}',`,
    `width: ${width},`,
    `height: ${height},`,
    `areaKeys: [${areaKeys.map((key) => `'${key}'`).join(', ')}],`,
    '},',
    '},',
  ];
}

function validMapSource(options = {}) {
  return staticSourceWithGroups(mapGroupLines(options));
}

function canonicalCatalogMap(overrides = {}) {
  return {
    url: PART_TWO_MAP_URL,
    path: PART_TWO_MAP,
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    areaKeys: MAP_AREA_KEYS,
    ...overrides,
  };
}

function writeMapAsset(root, svg, overrides = {}) {
  const buffer = Buffer.from(svg);
  writeFixture(root, PART_TWO_MAP, buffer);
  return {
    path: PART_TWO_MAP,
    bytes: buffer.length,
    sha256: createHash('sha256').update(buffer).digest('hex'),
    status: 'approved-original-vector',
    author: 'Idiomas WeLearn',
    borrowedArtwork: false,
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    altReviewed: true,
    visualAmbiguityReview: 'approved',
    areaKeys: MAP_AREA_KEYS,
    ...overrides,
  };
}

test('inverse publication inventory is IELTS-only and detects every uncatalogued public surface', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-listening-public-registry-'));
  try {
    const privateCandidateBytes = Buffer.from('private Part 3 audio fingerprint');
    writeFixture(root, PART_ONE_GUIDE, releaseBlock(PART_ONE_ID));
    writeFixture(root, PART_TWO_GUIDE, releaseBlock(PART_TWO_ID));
    writeFixture(root, PART_ONE_AUDIO);
    writeFixture(root, PART_TWO_AUDIO);
    writeFixture(root, PART_TWO_MAP, validMapSvg());
    writeFixture(root, 'public/audio/ielts/listening/unrelated.mp3');
    writeFixture(
      root,
      'docs/ielts-superhub/candidates/welearn-listening-part-3-001/candidate.mp3',
      privateCandidateBytes,
    );
    writeFixture(root, 'public/audio/ielts/listening/renamed-private-audio.mp3', privateCandidateBytes);
    writeFixture(root, 'public/audio/ielts/listening/draft-welearn-listening-part-3-001.mp3');
    writeFixture(
      root,
      'public/leaks/answer-key.json',
      JSON.stringify({ practiceId: 'welearn-listening-part-3-001', answers: ['A'] }),
    );
    writeFixture(
      root,
      'src/app/(site)/practica/toefl/listening/page.tsx',
      releaseBlock('welearn-listening-part-4-999', 'TOEFL must remain outside the IELTS inventory'),
    );
    writeFixture(
      root,
      'src/app/(site)/practica/icfes-saber-11/page.tsx',
      releaseBlock('welearn-listening-part-3-999', 'ICFES must remain outside the IELTS inventory'),
    );

    const sitemapSource = [
      "`${BASE}/practica/ielts/listening/part-1`",
      "`${BASE}/practica/ielts/listening/part-2`",
      "`${BASE}/practica/toefl/listening/part-4`",
      "`${BASE}/practica/icfes-saber-11/part-3`",
    ].join('\n');
    const inventory = collectIeltsListeningPublicationInventory(root, sitemapSource);

    assert.deepEqual(inventory.physicalGuidePaths, [PART_ONE_GUIDE, PART_TWO_GUIDE]);
    assert.deepEqual(inventory.publicAudioPaths, [PART_ONE_AUDIO, PART_TWO_AUDIO]);
    assert.deepEqual(inventory.publicMapPaths, [PART_TWO_MAP]);
    assert.deepEqual(inventory.unexpectedPublicPracticePaths, [
      'public/audio/ielts/listening/draft-welearn-listening-part-3-001.mp3',
      'public/audio/ielts/listening/renamed-private-audio.mp3',
      'public/leaks/answer-key.json',
    ]);
    assert.deepEqual(inventory.sitemapGuideRoutes, [PART_ONE_ROUTE, PART_TWO_ROUTE]);
    assert.deepEqual(inventory.releaseMarkerIds, [PART_ONE_ID, PART_TWO_ID]);
    assert.deepEqual(inventory.markerStructureFailures, []);

    const failures = findIeltsListeningInversePublicationFailures({
      catalogPractices: [catalogPractice(PART_ONE_ID, PART_ONE_GUIDE, PART_ONE_ROUTE)],
      catalogAudioPaths: [PART_ONE_AUDIO],
      catalogMapPaths: [],
      inventory,
    }).join('\n');

    assert.match(failures, new RegExp(PART_TWO_GUIDE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(failures, new RegExp(PART_TWO_AUDIO.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(failures, new RegExp(PART_TWO_MAP.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(failures, /Unrecognized public IELTS Listening practice artifact: public\/audio\/ielts\/listening\/draft-welearn-listening-part-3-001\.mp3/i);
    assert.match(failures, /Unrecognized public IELTS Listening practice artifact: public\/audio\/ielts\/listening\/renamed-private-audio\.mp3/i);
    assert.match(failures, /Unrecognized public IELTS Listening practice artifact: public\/leaks\/answer-key\.json/i);
    assert.match(failures, /sitemap route is not catalogued: \/practica\/ielts\/listening\/part-2/i);
    assert.match(failures, new RegExp(`uncatalogued practice: ${PART_TWO_ID}`, 'i'));
    assert.doesNotMatch(failures, /part-4-999|part-3-999|TOEFL|ICFES/);

    assert.deepEqual(findIeltsListeningInversePublicationFailures({
      catalogPractices: [
        catalogPractice(PART_ONE_ID, PART_ONE_GUIDE, PART_ONE_ROUTE),
        catalogPractice(PART_TWO_ID, PART_TWO_GUIDE, PART_TWO_ROUTE),
      ],
      catalogAudioPaths: [PART_ONE_AUDIO, PART_TWO_AUDIO],
      catalogMapPaths: [PART_TWO_MAP],
      inventory,
    }), [
      'Unrecognized public IELTS Listening practice artifact: public/audio/ielts/listening/draft-welearn-listening-part-3-001.mp3.',
      'Unrecognized public IELTS Listening practice artifact: public/audio/ielts/listening/renamed-private-audio.mp3.',
      'Unrecognized public IELTS Listening practice artifact: public/leaks/answer-key.json.',
    ]);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('inverse publication parity also fails when catalogued artifacts disappear', () => {
  const failures = findIeltsListeningInversePublicationFailures({
    catalogPractices: [
      catalogPractice(PART_ONE_ID, PART_ONE_GUIDE, PART_ONE_ROUTE),
      catalogPractice(PART_TWO_ID, PART_TWO_GUIDE, PART_TWO_ROUTE),
    ],
    catalogAudioPaths: [PART_ONE_AUDIO, PART_TWO_AUDIO],
    catalogMapPaths: [PART_TWO_MAP],
    inventory: {
      physicalGuidePaths: [PART_ONE_GUIDE],
      publicAudioPaths: [PART_ONE_AUDIO],
      publicMapPaths: [],
      sitemapGuideRoutes: [PART_ONE_ROUTE],
      releaseMarkerIds: [PART_ONE_ID, PART_TWO_ID],
      markerStructureFailures: [],
    },
  }).join('\n');

  assert.match(failures, /Catalog guide has no physical IELTS Listening Part landing.*part-2/i);
  assert.match(failures, /Catalog audio has no matching public original IELTS Listening MP3.*part-2/i);
  assert.match(failures, /Catalog map has no matching public original IELTS Listening SVG.*part-2/i);
  assert.match(failures, /Catalog guide route is missing from the IELTS Listening Part sitemap.*part-2/i);
});

test('every IELTS release marker ID must resolve to a catalog practice', () => {
  const failures = findIeltsListeningInversePublicationFailures({
    catalogPractices: [catalogPractice(PART_ONE_ID, PART_ONE_GUIDE, PART_ONE_ROUTE)],
    catalogAudioPaths: [PART_ONE_AUDIO],
    catalogMapPaths: [],
    inventory: {
      physicalGuidePaths: [PART_ONE_GUIDE],
      publicAudioPaths: [PART_ONE_AUDIO],
      publicMapPaths: [],
      sitemapGuideRoutes: [PART_ONE_ROUTE],
      releaseMarkerIds: [PART_ONE_ID, 'invalid-or-unreleased-practice'],
      markerStructureFailures: [],
    },
  }).join('\n');

  assert.match(failures, /uncatalogued practice: invalid-or-unreleased-practice/i);
});

test('map contract is optional for Part 1 and mandatory for a catalogued map-labelling source', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-listening-map-contract-'));
  try {
    assert.deepEqual(validateIeltsListeningMapAsset({
      root,
      practiceId: PART_ONE_ID,
      source: formOnlySource(),
      manifestMap: undefined,
      catalogMap: undefined,
    }), []);

    assert.match(validateIeltsListeningMapAsset({
      root,
      practiceId: PART_ONE_ID,
      source: formOnlySource(),
      manifestMap: { path: 'unused.svg' },
      catalogMap: undefined,
    }).join('\n'), /declares a map.*no map-labelling/i);

    assert.match(validateIeltsListeningMapAsset({
      root,
      practiceId: PART_ONE_ID,
      source: formOnlySource(),
      manifestMap: undefined,
      catalogMap: canonicalCatalogMap(),
    }).join('\n'), /Catalog declares a map.*no map-labelling/i);

    assert.match(validateIeltsListeningMapAsset({
      root,
      practiceId: PART_TWO_ID,
      source: validMapSource(),
      ownership: ORIGINAL_MAP_OWNERSHIP,
      manifestMap: undefined,
      catalogMap: canonicalCatalogMap(),
    }).join('\n'), /manifest\.map is missing/i);

    const manifestMap = writeMapAsset(root, validMapSvg());
    assert.deepEqual(validateIeltsListeningMapAsset({
      root,
      practiceId: PART_TWO_ID,
      source: validMapSource(),
      ownership: ORIGINAL_MAP_OWNERSHIP,
      manifestMap,
      catalogMap: canonicalCatalogMap(),
    }), []);

    for (const [mutation, pattern] of [
      [{ path: 'public/images/ielts/listening/wrong.svg' }, /Map path must be/i],
      [{ bytes: 0 }, /bytes must be a positive integer/i],
      [{ sha256: 'invalid' }, /sha256 is invalid/i],
      [{ bytes: manifestMap.bytes + 1 }, /Map size drift/i],
      [{ sha256: 'a'.repeat(64) }, /Map checksum drift/i],
      [{ status: 'pilot' }, /approved-original-vector/i],
      [{ author: '' }, /artwork author/i],
      [{ borrowedArtwork: true }, /borrowedArtwork=false/i],
      [{ width: MAP_WIDTH + 1 }, /dimensions do not match the catalog/i],
      [{ height: MAP_HEIGHT + 1 }, /dimensions do not match the catalog/i],
      [{ altReviewed: false }, /alt text review/i],
      [{ visualAmbiguityReview: 'pending' }, /visual ambiguity review/i],
      [{ areaKeys: ['A', 'A'] }, /areaKeys.*unique strings/i],
    ]) {
      assert.match(validateIeltsListeningMapAsset({
        root,
        practiceId: PART_TWO_ID,
        source: validMapSource(),
        ownership: ORIGINAL_MAP_OWNERSHIP,
        manifestMap: { ...manifestMap, ...mutation },
        catalogMap: canonicalCatalogMap(),
      }).join('\n'), pattern);
    }

    for (const [ownership, pattern] of [
      [{ ...ORIGINAL_MAP_OWNERSHIP, borrowedMap: true }, /borrowedMap=false/i],
      [{ ...ORIGINAL_MAP_OWNERSHIP, author: '' }, /ownership author/i],
    ]) {
      assert.match(validateIeltsListeningMapAsset({
        root,
        practiceId: PART_TWO_ID,
        source: validMapSource(),
        ownership,
        manifestMap,
        catalogMap: canonicalCatalogMap(),
      }).join('\n'), pattern);
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('map SVG mutations fail closed on accessibility, active content, external resources and area parity', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-listening-map-svg-'));
  const validateSvg = (svg, overrides = {}) => validateIeltsListeningMapAsset({
    root,
    practiceId: PART_TWO_ID,
    source: validMapSource(),
    ownership: ORIGINAL_MAP_OWNERSHIP,
    manifestMap: writeMapAsset(root, svg, overrides),
    catalogMap: canonicalCatalogMap(),
  }).join('\n');

  try {
    assert.match(validateSvg(validMapSvg().replace(' viewBox="0 0 400 240"', '')), /viewBox/i);
    assert.match(validateSvg(validMapSvg().replace('viewBox="0 0 400 240"', 'viewBox="0 0 0 240"')), /viewBox/i);
    assert.match(validateSvg(validMapSvg().replace(/<title>[\s\S]*?<\/title>/, '')), /non-empty title/i);
    assert.match(validateSvg(validMapSvg().replace(/<desc>[\s\S]*?<\/desc>/, '')), /non-empty desc/i);
    assert.match(validateSvg(validMapSvg().replace('</svg>', '<script>alert(1)</script></svg>')), /script element/i);
    assert.match(validateSvg(validMapSvg().replace('</svg>', '<foreignObject><p>unsafe</p></foreignObject></svg>')), /foreignObject/i);
    assert.match(validateSvg(validMapSvg().replace('<svg ', '<svg onload="alert(1)" ')), /event handler/i);
    assert.match(validateSvg(validMapSvg().replace('href="#pin"', 'href="https://example.test/pin.svg"')), /external resource/i);
    assert.match(validateSvg(validMapSvg().replace('</svg>', '<style>.x{fill:url(//example.test/fill.svg)}</style></svg>')), /external resource/i);
    assert.match(validateSvg(validMapSvg(['A', 'C'])), /data-option-key.*exactly once/i);
    assert.match(validateSvg(validMapSvg(['B', 'A'])), /data-option-key.*exactly once/i);
    assert.match(validateSvg(validMapSvg(['A', 'A'])), /data-option-key.*exactly once/i);
    assert.match(validateSvg(validMapSvg(['A'])), /data-option-key.*exactly once/i);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('catalog, source, manifest and SVG map identities must reconcile exactly', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-listening-map-identity-'));
  try {
    const manifestMap = writeMapAsset(root, validMapSvg());
    const validate = ({
      source = validMapSource(),
      catalogMap = canonicalCatalogMap(),
      map = manifestMap,
    } = {}) => validateIeltsListeningMapAsset({
      root,
      practiceId: PART_TWO_ID,
      source,
      ownership: ORIGINAL_MAP_OWNERSHIP,
      manifestMap: map,
      catalogMap,
    }).join('\n');

    assert.match(validate({ catalogMap: null }), /catalog map is missing/i);
    assert.match(validate({ catalogMap: { ...canonicalCatalogMap(), extra: true } }), /exact canonical fields/i);
    assert.match(validate({ catalogMap: canonicalCatalogMap({ url: '/images/wrong.svg' }) }), /Catalog map URL must be/i);
    assert.match(validate({ catalogMap: canonicalCatalogMap({ path: 'public/images/wrong.svg' }) }), /Catalog map path must be/i);
    assert.match(validate({ catalogMap: canonicalCatalogMap({ width: MAP_WIDTH + 1 }) }), /dimensions do not match/i);
    assert.match(validate({ catalogMap: canonicalCatalogMap({ areaKeys: ['B', 'A'] }) }), /areaKeys do not match/i);

    assert.match(validate({ source: validMapSource({ url: '/images/wrong.svg' }) }), /Source map URL does not match/i);
    assert.match(validate({ source: validMapSource({ width: MAP_WIDTH + 1 }) }), /Source map dimensions do not match/i);
    assert.match(validate({ source: validMapSource({ areaKeys: ['B', 'A'] }) }), /Source map areaKeys do not match/i);
    assert.match(validate({
      source: staticSourceWithGroups(["{ type: 'map-labelling', id: 'map', map: dynamicMap },"]),
    }), /not statically auditable|direct object literal/i);

    assert.match(validate({ map: { ...manifestMap, path: 'public/images/wrong.svg' } }), /Manifest map path does not match/i);
    assert.match(validate({ map: { ...manifestMap, areaKeys: ['B', 'A'] } }), /Manifest map areaKeys do not match/i);
    assert.match(validate({
      map: writeMapAsset(root, validMapSvg().replace('viewBox="0 0 400 240"', 'viewBox="0 0 500 240"')),
    }), /viewBox dimensions do not match/i);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('map source extraction ignores comment/string decoys and audits every real map group', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-listening-map-source-scope-'));
  try {
    const manifestMap = writeMapAsset(root, validMapSvg());
    const validate = (source, map = manifestMap, catalogMap = canonicalCatalogMap()) =>
      validateIeltsListeningMapAsset({
        root,
        practiceId: PART_TWO_ID,
        source,
        ownership: ORIGINAL_MAP_OWNERSHIP,
        manifestMap: map,
        catalogMap,
      }).join('\n');

    const canonicalDecoy = validMapSource();
    const wrongRealMap = validMapSource({ url: '/images/ielts/listening/wrong-map.svg' });
    assert.match(validate(`/* ${canonicalDecoy} */\n${wrongRealMap}`), /Source map URL does not match/i);
    const wrongMapWithStringDecoy = wrongRealMap.replace(
      'practiceNumber: 1,',
      `practiceNumber: 1,\ndecoy: ${JSON.stringify(canonicalDecoy)},`,
    );
    assert.notEqual(wrongMapWithStringDecoy, wrongRealMap);
    assert.match(validate(wrongMapWithStringDecoy), /Source map URL does not match/i);

    const noRealMap = formOnlySource(`/* ${canonicalDecoy} */`).replace(
      'practiceNumber: 1,',
      `practiceNumber: 1,\ndecoy: ${JSON.stringify(canonicalDecoy)},`,
    );
    assert.deepEqual(validateIeltsListeningMapAsset({
      root,
      practiceId: PART_ONE_ID,
      source: noRealMap,
      manifestMap: undefined,
      catalogMap: undefined,
    }), []);

    const twoRealMaps = staticSourceWithGroups([
      ...mapGroupLines({ id: 'map-one' }),
      ...mapGroupLines({ id: 'map-two', width: MAP_WIDTH + 1 }),
    ]);
    assert.match(validate(twoRealMaps), /Source map dimensions do not match.*group 2/i);

    const duplicateSource = `${validMapSource()}\n${validMapSource()}`;
    assert.match(validate(duplicateSource), /exactly one top-level const SOURCE/i);

    const regexSourceProbe = 'const SOURCE_PATTERN = /const SOURCE = { groups: [] };/;';
    assert.match(validateIeltsListeningMapAsset({
      root,
      practiceId: PART_ONE_ID,
      source: regexSourceProbe,
      manifestMap: undefined,
      catalogMap: undefined,
    }).join('\n'), /exactly one top-level const SOURCE/i);
    assert.match(validate(`${regexSourceProbe}\n${validMapSource()}`), /module may contain only/i);

    const afterIfRegexProbe = 'if (false) /const SOURCE = { groups: [] };x/;';
    assert.match(validateIeltsListeningMapAsset({
      root,
      practiceId: PART_ONE_ID,
      source: afterIfRegexProbe,
      manifestMap: undefined,
      catalogMap: undefined,
    }).join('\n'), /exactly one top-level const SOURCE/i);
    assert.match(validate(`${afterIfRegexProbe}\n${validMapSource()}`), /module may contain only/i);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('public audio metadata reconciles MPEG bytes, manifest and server source', () => {
  const manifest = JSON.parse(fs.readFileSync(
    path.join(root, 'docs/ielts-superhub/originality/welearn-listening-part-1-001.json'),
    'utf8',
  ));
  const source = fs.readFileSync(
    path.join(root, 'src/data/ielts/listening-part1-welearn-001.server.ts'),
    'utf8',
  );
  const buffer = fs.readFileSync(path.join(root, PART_ONE_AUDIO));
  const validate = (manifestAudio = manifest.audio, sourceText = source, audioBuffer = buffer) =>
    validateIeltsListeningAudioMetadata({
      practiceId: PART_ONE_ID,
      source: sourceText,
      manifestAudio,
      buffer: audioBuffer,
    }).join('\n');

  assert.equal(validate(), '');
  assert.match(validate({ ...manifest.audio, durationSeconds: manifest.audio.durationSeconds + 1 }), /duration drift/i);
  assert.match(validate({ ...manifest.audio, channels: 2 }), /channel drift/i);
  assert.match(validate({ ...manifest.audio, sampleRateHz: 48_000 }), /sample-rate drift/i);
  assert.match(validate({ ...manifest.audio, bitRate: 128_000 }), /bit-rate drift/i);
  assert.match(validate(manifest.audio, source.replace(`durationSeconds: ${manifest.audio.durationSeconds}`, 'durationSeconds: 1')), /Source audio duration/i);
  assert.match(validate(manifest.audio, source, buffer.subarray(0, buffer.length - 17)), /MPEG metadata is invalid/i);

  const wrongDurationWithCommentDecoy = source
    .replace(`durationSeconds: ${manifest.audio.durationSeconds}`, 'durationSeconds: 999')
    .concat(`\n// durationSeconds: ${manifest.audio.durationSeconds}`);
  assert.match(validate(manifest.audio, wrongDurationWithCommentDecoy), /Source audio duration/i);

  const wrongPathWithStringDecoy = source
    .replace("localPath: '/audio/ielts/listening/welearn-listening-part-1-001.mp3'", "localPath: '/audio/ielts/listening/wrong.mp3'")
    .replace(
      '  practiceNumber: 1,',
      `  practiceNumber: 1,\n  decoy: ${JSON.stringify(`localPath: '/audio/ielts/listening/welearn-listening-part-1-001.mp3'`)},`,
    );
  assert.match(validate(manifest.audio, wrongPathWithStringDecoy), /Source audio path/i);

  const wrongChecksumWithBlockCommentDecoy = source
    .replace(`sha256: '${manifest.audio.sha256}'`, `sha256: '${'0'.repeat(64)}'`)
    .concat(`\n/* sha256: '${manifest.audio.sha256}' */`);
  assert.match(validate(manifest.audio, wrongChecksumWithBlockCommentDecoy), /Source audio checksum/i);

  const duplicateDuration = source.replace(
    `durationSeconds: ${manifest.audio.durationSeconds},`,
    `durationSeconds: 999,\n    durationSeconds: ${manifest.audio.durationSeconds},`,
  );
  assert.match(validate(manifest.audio, duplicateDuration), /exactly one durationSeconds property/i);

  const commentedSourceDeclaration = `/* const SOURCE = { audio: decoy, groups: [] }; */\n${source}`;
  assert.equal(validate(manifest.audio, commentedSourceDeclaration), '');
  assert.match(validate(manifest.audio, `${source}\n${source}`), /exactly one top-level const SOURCE/i);

  const suffixedInitializer = source.replace(
    '\n};\n\nexport function getIeltsListeningPart1Practice',
    '\n} as unknown as true && OTHER;\n\nexport function getIeltsListeningPart1Practice',
  );
  assert.notEqual(suffixedInitializer, source);
  assert.match(validate(manifest.audio, suffixedInitializer), /initializer must be a direct object literal/i);

  const assertedInitializer = source.replace(
    '\n};\n\nexport function getIeltsListeningPart1Practice',
    '\n} as const;\n\nexport function getIeltsListeningPart1Practice',
  );
  assert.notEqual(assertedInitializer, source);
  assert.match(validate(manifest.audio, assertedInitializer), /initializer must be a direct object literal/i);
  assert.match(
    validate(manifest.audio, 'const SOURCE: IeltsListeningPracticeSource = OTHER;'),
    /initializer must be a direct object literal/i,
  );
  assert.match(validate(manifest.audio, 'const SOURCE = {'), /TypeScript parse errors/i);

  const spreadAudio = source.replace('  audio: {', '  audio: {\n    ...AUDIO_DEFAULTS,');
  assert.notEqual(spreadAudio, source);
  assert.match(validate(manifest.audio, spreadAudio), /SOURCE\.audio cannot contain spreads/i);

  const computedAudioProperty = source.replace('    durationSeconds:', "    ['durationSeconds']:");
  assert.notEqual(computedAudioProperty, source);
  assert.match(validate(manifest.audio, computedAudioProperty), /computed, quoted or numeric property names/i);

  for (const mutation of [
    `${source}\nSOURCE.audio.localPath = '/audio/ielts/listening/changed.mp3';`,
    `${source}\nSOURCE.practiceNumber++;`,
    `${source}\ndelete SOURCE.groups;`,
    `${source}\nconst SOURCE_ALIAS = SOURCE;`,
    `${source}\nexport function leakSource() { return SOURCE; }`,
    `${source}\nReflect.set(SOURCE, 'groups', []);`,
    `${source}\nObject.assign(SOURCE, { groups: [] });`,
    `${source}\nunknownConsumer(SOURCE);`,
  ]) {
    assert.match(validate(manifest.audio, mutation), /module may contain only/i);
  }

  const responseSpecsAdapter = [
    'export function getIeltsListeningPart1ResponseSpecs() {',
    '  return ieltsListeningResponseSpecs(SOURCE);',
    '}',
  ].join('\n');
  const missingAdapter = source.replace(responseSpecsAdapter, '');
  assert.notEqual(missingAdapter, source);
  assert.match(validate(manifest.audio, missingAdapter), /exactly one exported getIeltsListeningPart1ResponseSpecs adapter/i);

  const divertedAdapter = source.replace(
    'return ieltsListeningQuestionNumbers(SOURCE);',
    'return ieltsListeningQuestionNumbers(OTHER_SOURCE);',
  );
  assert.notEqual(divertedAdapter, source);
  assert.match(validate(manifest.audio, divertedAdapter), /getIeltsListeningPart1QuestionNumbers must receive SOURCE directly/i);

  const shadowedScorer = source
    .replace(
      'scoreIeltsListeningPart1Practice(responses: Readonly<Record<string, string>>)',
      'scoreIeltsListeningPart1Practice(SOURCE: Readonly<Record<string, string>>)',
    )
    .replace(
      'return scoreIeltsListeningPractice(SOURCE, responses);',
      'return scoreIeltsListeningPractice(SOURCE, SOURCE);',
    );
  assert.notEqual(shadowedScorer, source);
  assert.match(validate(manifest.audio, shadowedScorer), /exactly one required responses parameter/i);

  const shadowedProjection = source
    .replace(
      'const resolved = resolveAudioUrl(SOURCE.audio.localPath) ?? SOURCE.audio.localPath;',
      'const SOURCE = resolveAudioUrl(SOURCE.audio.localPath) ?? SOURCE.audio.localPath;',
    )
    .replace(
      'return projectIeltsListeningPractice(SOURCE, resolved);',
      'return projectIeltsListeningPractice(SOURCE, SOURCE);',
    );
  assert.notEqual(shadowedProjection, source);
  assert.match(validate(manifest.audio, shadowedProjection), /store the canonical audio fallback in resolved/i);

  const fakeResolverImport = source.replace(
    "import { resolveAudioUrl } from '@/lib/examAudio';",
    'function resolveAudioUrl(value: string) { return value; }',
  );
  assert.notEqual(fakeResolverImport, source);
  assert.match(validate(manifest.audio, fakeResolverImport), /exactly the three canonical IELTS Listening imports/i);

  const evalMutation = `${source}\neval("SOURCE.audio.localPath = '/audio/ielts/listening/changed.mp3'");`;
  assert.match(validate(manifest.audio, evalMutation), /module may contain only/i);

  const divertedRegistration = source.replace(
    'result: scoreIeltsListeningPart1Practice(responses),',
    'result: scoreIeltsListeningPart1Practice(OTHER_RESPONSES),',
  );
  assert.notEqual(divertedRegistration, source);
  assert.match(validate(manifest.audio, divertedRegistration), /must use responses directly/i);

  const dynamicRootLiteral = source.replace(
    "contentVersion: '2026-09-01.1',",
    'contentVersion: loadContentVersion(),',
  );
  assert.notEqual(dynamicRootLiteral, source);
  assert.match(validate(manifest.audio, dynamicRootLiteral), /SOURCE\.contentVersion must be deeply static/i);

  const dynamicNestedLiteral = source.replace(
    "acceptedAnswers: ['Benton']",
    'acceptedAnswers: [loadAnswer()]',
  );
  assert.notEqual(dynamicNestedLiteral, source);
  assert.match(validate(manifest.audio, dynamicNestedLiteral), /must be deeply static/i);
});
