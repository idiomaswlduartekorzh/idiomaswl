import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

import { getMock } from '../src/data/mocks/index.ts';
import { selectToeflListeningPractice } from '../src/data/toefl/sectional-listening-adapter.ts';

const ROOT = process.cwd();
const source = getMock('toefl', 'set-1');
assert.ok(source, 'TOEFL Set 1 must exist.');
const practice = selectToeflListeningPractice(source);
assert.ok(practice, 'TOEFL Listening Set 1 projection must exist.');

const sourceSections = source.sections.filter((section) => section.skill === 'listening');
const sourceQuestions = sourceSections.flatMap((section) => section.questions);
const projectedQuestions = practice.sections.flatMap((section) => section.questions);

test('Listening Set 1 keeps exact source identity and order', () => {
  assert.equal(practice.sourceMockId, 'set-1');
  assert.equal(practice.sections.length, 8);
  assert.equal(projectedQuestions.length, 34);
  assert.deepEqual(
    practice.sections.map((section) => section.moduleId),
    sourceSections.map((section) => section.moduleId),
  );
  assert.deepEqual(
    projectedQuestions.map((question) => question.id),
    sourceQuestions.map((question) => question.id),
  );
  assert.deepEqual(
    projectedQuestions.map((question) => question.mediaId),
    sourceQuestions.map((question) => question.mediaId),
  );
});

test('client projection contains no answer keys and every audio is released', async () => {
  for (const question of projectedQuestions) {
    assert.equal(question.type, 'toefl-listening-single');
    assert.equal('answer' in question, false, `${question.id} must not expose an answer key.`);
    assert.equal(question.mediaStatus, 'ready-existing', `${question.id} needs released audio.`);
  }

  const media = new Map();
  for (const section of practice.sections) {
    if (section.audioUrl) media.set(section.mediaId, section.audioUrl);
    for (const question of section.questions) {
      if (question.type === 'toefl-listening-single' && question.audioUrl) {
        media.set(question.mediaId, question.audioUrl);
      }
    }
  }

  assert.equal(media.size, 22);
  await Promise.all([...media.values()].map((audioUrl) =>
    access(path.join(ROOT, 'public', audioUrl.replace(/^\//, '')))));
});

test('runner is noindex/follow and absent from sitemap', async () => {
  const pagePath = path.join(
    ROOT,
    'src/app/(site)/practica/toefl/listening/simulacros/practica/[mockId]/page.tsx',
  );
  const [page, sitemap] = await Promise.all([
    readFile(pagePath, 'utf8'),
    readFile(path.join(ROOT, 'src/app/sitemap.ts'), 'utf8'),
  ]);

  assert.match(page, /index:\s*false/);
  assert.match(page, /follow:\s*true/);
  assert.doesNotMatch(sitemap, /listening\/simulacros\/practica/);
});
