import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const practiceId = 'welearn-listening-part-2-001';
const sourcePath = path.join(root, 'src/data/ielts/listening-part2-welearn-001.server.ts');
const generatorPath = path.join(root, 'scripts/generate-ielts-listening-part2-audio.mjs');
const manifestPath = path.join(root, `docs/ielts-superhub/originality/${practiceId}.json`);
const candidateRoot = path.join(root, `docs/ielts-superhub/candidates/${practiceId}`);
const candidateAudioPath = path.join(candidateRoot, `${practiceId}.mp3`);
const candidateMapPath = path.join(candidateRoot, `${practiceId}-map.svg`);
const candidateAsrPath = path.join(candidateRoot, 'asr', `${practiceId}.json`);

function sha256(filePath) {
  return createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function spokenText(value) {
  return value
    .replace(/^COORDINATOR:\s*/i, '')
    .normalize('NFKC')
    .toLocaleLowerCase('en')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

test('Part 2 candidate remains private and fail-closed until atomic promotion', () => {
  const source = fs.readFileSync(sourcePath, 'utf8');
  const registry = fs.readFileSync(path.join(root, 'src/data/ielts/listening-practice-registry.server.ts'), 'utf8');
  const catalog = fs.readFileSync(path.join(root, 'config/ielts-listening-practices.json'), 'utf8');
  const sitemap = fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8');

  assert.match(source, /^import 'server-only';/);
  assert.match(source, /durationSeconds: 0/);
  assert.match(source, /sha256: '0{64}'/);
  assert.doesNotMatch(registry, /listening-part2-welearn-001|welearn-listening-part-2-001/);
  assert.doesNotMatch(catalog, /welearn-listening-part-2-001/);
  assert.doesNotMatch(sitemap, /\/practica\/ielts\/listening\/part-2/);
  assert.equal(fs.existsSync(path.join(root, 'src/app/(site)/practica/ielts/listening/part-2/page.tsx')), false);
  assert.equal(fs.existsSync(path.join(root, `public/audio/ielts/listening/${practiceId}.mp3`)), false);
  assert.equal(fs.existsSync(path.join(root, `public/images/ielts/listening/${practiceId}-map.svg`)), false);
});

test('Part 2 candidate source covers Questions 11–20 with aligned private option keys', () => {
  const source = fs.readFileSync(sourcePath, 'utf8');
  const numbers = [...source.matchAll(/^\s+number: (\d+),$/gm)].map((match) => Number(match[1]));
  const correctKeys = [...source.matchAll(/correctOptionKey: '([A-H])'/g)].map((match) => match[1]);
  const expectedKeys = [...source.matchAll(/^\s+expected: '([A-H])',$/gm)].map((match) => match[1]);

  assert.deepEqual(numbers, [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  assert.deepEqual(correctKeys, ['C', 'B', 'A', 'C', 'B', 'H', 'F', 'A', 'E', 'C']);
  assert.deepEqual(expectedKeys, correctKeys);
  assert.match(source, /type: 'single-choice'[\s\S]*questionRange: \[11, 15\]/);
  assert.match(source, /type: 'map-labelling'[\s\S]*questionRange: \[16, 20\]/);
  assert.match(source, /areaKeys: \['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'\]/);
});

test('candidate audio, map and generator are reproducibly documented outside public', () => {
  const source = fs.readFileSync(sourcePath, 'utf8');
  const generator = fs.readFileSync(generatorPath, 'utf8');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const svg = fs.readFileSync(candidateMapPath, 'utf8');
  const transcript = source.match(/transcript: `([\s\S]*?)`,\n  audio:/)?.[1];
  const segmentBlock = generator.match(/const segments = \[([\s\S]*?)\n\];/)?.[1] ?? '';
  const segments = [...segmentBlock.matchAll(/`([^`]*)`/g)].map((match) => match[1]);

  assert.equal(typeof transcript, 'string');
  assert.equal(segments.length, 13);
  assert.equal(spokenText(segments.join(' ')), spokenText(transcript));
  assert.match(generator, /docs\/ielts-superhub\/candidates/);
  assert.doesNotMatch(generator, /public\/audio/);
  assert.doesNotMatch(generator, /run\(['"]say['"]|voiceByRole|['"]Daniel['"]|['"]Karen['"]/);

  assert.equal(fs.statSync(candidateAudioPath).size, manifest.audio.bytes);
  assert.equal(sha256(candidateAudioPath), manifest.audio.sha256);
  assert.equal(fs.statSync(candidateMapPath).size, manifest.map.bytes);
  assert.equal(sha256(candidateMapPath), manifest.map.sha256);
  assert.equal(fs.statSync(candidateAsrPath).size, manifest.automatedAsrAudit.bytes);
  assert.equal(sha256(candidateAsrPath), manifest.automatedAsrAudit.sha256);
  assert.equal(manifest.automatedAsrAudit.checkedAt, '2026-09-04');
  assert.equal(manifest.automatedAsrAudit.bytes, 42541);
  assert.equal(manifest.automatedAsrAudit.sha256, 'a9009128d06a5271d81bebb4b64c6e75f111c80618d7ddf3d26c24c752db3ec0');
  assert.equal(manifest.automatedAsrAudit.inputAudioSha256, sha256(candidateAudioPath));
  assert.deepEqual(manifest.automatedAsrAudit.supersededEvidence, {
    path: `docs/ielts-superhub/candidates/${practiceId}/asr/archive/${practiceId}.2026-09-01.json`,
    bytes: 29444,
    sha256: 'a2d7cf677273e8761dfdfa9d37ec48c4cf6810608303748334ad780ad8ac6ebb',
    checkedAt: '2026-09-01',
  });
  assert.deepEqual(manifest.automatedAsrAudit.provenance, {
    path: `docs/ielts-superhub/candidates/${practiceId}/asr/${practiceId}.provenance.json`,
    bytes: 1736,
    sha256: '6d6c8bf653c4ee50271ac77876f44ddaff01b1a4ae1fcd7fc0f3e55ac8660e22',
  });
  const archivedAsrPath = path.join(root, manifest.automatedAsrAudit.supersededEvidence.path);
  assert.equal(fs.statSync(archivedAsrPath).size, manifest.automatedAsrAudit.supersededEvidence.bytes);
  assert.equal(sha256(archivedAsrPath), manifest.automatedAsrAudit.supersededEvidence.sha256);
  const provenancePath = path.join(root, manifest.automatedAsrAudit.provenance.path);
  assert.equal(fs.statSync(provenancePath).size, manifest.automatedAsrAudit.provenance.bytes);
  assert.equal(sha256(provenancePath), manifest.automatedAsrAudit.provenance.sha256);
  const provenance = JSON.parse(fs.readFileSync(provenancePath, 'utf8'));
  assert.equal(provenance.inputAudioSha256, sha256(candidateAudioPath));
  assert.equal(provenance.output.sha256, sha256(candidateAsrPath));
  assert.equal(provenance.review.humanApproval, null);
  assert.equal(provenance.review.publicationDecision, 'BLOCK');
  assert.equal(manifest.release.status, 'draft');
  assert.equal(manifest.map.altReviewed, false);
  assert.equal(manifest.map.visualAmbiguityReview, 'pending');

  assert.match(svg, /<svg[^>]+viewBox="0 0 1000 650"/);
  assert.match(svg, /<title[\s>]/);
  assert.match(svg, /<desc[\s>]/);
  assert.doesNotMatch(svg, /<script|foreignObject|\son[a-z]+\s*=|(?:href|xlink:href)\s*=\s*["'](?:https?:|\/\/|data:)/i);
  assert.deepEqual([...svg.matchAll(/data-option-key="([A-H])"/g)].map((match) => match[1]), manifest.map.areaKeys);

  const asrText = spokenText(JSON.parse(fs.readFileSync(candidateAsrPath, 'utf8')).text);
  for (const evidence of [
    'practical tables themselves open at half past nine',
    'one small portable household item',
    'six bicycle stands need considerably more working room',
    'accompanying adult must stay beside them',
    'booking fee covers the small materials',
    'welcome desk',
    'tool library',
    'textile studio',
    'testing bench',
    'community kitchen',
    'turn immediately to your right',
    'large room in the far south west corner',
    'immediately to the right of the toilets',
    'directly opposite the courtyard s western materials shop',
    'immediately to the left of that exit',
  ]) {
    assert.match(asrText, new RegExp(spokenText(evidence)));
  }
});
