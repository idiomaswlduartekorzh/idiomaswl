import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

import { getMock } from '../src/data/mocks/index.ts';
import {
  isToeflSectionalListeningSetId,
  selectToeflListeningPractice,
  TOEFL_SECTIONAL_LISTENING_SET_IDS,
} from '../src/data/toefl/sectional-listening-adapter.ts';
import { TOEFL_FIXED_LISTENING_BY_SET } from '../src/data/toefl/listening-fixed-registry.ts';

const ROOT = process.cwd();
const sets = TOEFL_SECTIONAL_LISTENING_SET_IDS.map((mockId, index) => {
  const source = getMock('toefl', mockId);
  assert.ok(source, `TOEFL ${mockId} must exist.`);
  const practice = selectToeflListeningPractice(source);
  assert.ok(practice, `TOEFL Listening ${mockId} projection must exist.`);
  return { mockId, setNumber: index + 1, source, practice };
});

test('sectional Listening catalog enables exactly Sets 1–20', () => {
  assert.deepEqual(
    TOEFL_SECTIONAL_LISTENING_SET_IDS,
    Array.from({ length: 20 }, (_, index) => `set-${index + 1}`),
  );
  for (const mockId of TOEFL_SECTIONAL_LISTENING_SET_IDS) {
    assert.equal(isToeflSectionalListeningSetId(mockId), true);
  }
  for (const invalid of ['set-0', 'set-01', 'set-21', 'set-x', 'mock-1']) {
    assert.equal(isToeflSectionalListeningSetId(invalid), false, `${invalid} must stay unavailable.`);
  }
});

test('all 20 Listening projections keep exact source identity and order', () => {
  for (const { mockId, setNumber, source, practice } of sets) {
    const sourceSections = source.sections.filter((section) => section.skill === 'listening');
    const sourceQuestions = sourceSections.flatMap((section) => section.questions);
    const projectedQuestions = practice.sections.flatMap((section) => section.questions);

    assert.equal(practice.sourceMockId, mockId);
    assert.equal(practice.objectId, TOEFL_FIXED_LISTENING_BY_SET[setNumber].scoringObjectId);
    assert.equal(practice.sections.length, 8);
    assert.equal(projectedQuestions.length, 34);
    assert.deepEqual(practice.sections, sourceSections, `${mockId} must preserve every source field.`);
    assert.notEqual(practice.sections[0], sourceSections[0], 'Projection must not mutate the source.');
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
  }
});

test('all client projections omit answer keys and reference released audio', async () => {
  const audioPaths = new Set();
  for (const { mockId, practice } of sets) {
    const projectedQuestions = practice.sections.flatMap((section) => section.questions);
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
    assert.equal(media.size, 22, `${mockId} must preserve its released audio inventory.`);
    for (const audioUrl of media.values()) {
      audioPaths.add(path.join(ROOT, 'public', audioUrl.replace(/^\//, '')));
    }
  }

  await Promise.all([...audioPaths].map((audioPath) => access(audioPath)));
});

test('library exposes the shared catalog while every runner stays noindex', async () => {
  const pagePath = path.join(
    ROOT,
    'src/app/(site)/practica/toefl/listening/simulacros/practica/[mockId]/page.tsx',
  );
  const [page, library, sitemap] = await Promise.all([
    readFile(pagePath, 'utf8'),
    readFile(path.join(ROOT, 'src/app/(site)/practica/toefl/listening/simulacros/page.tsx'), 'utf8'),
    readFile(path.join(ROOT, 'src/app/sitemap.ts'), 'utf8'),
  ]);

  assert.match(page, /index:\s*false/);
  assert.match(page, /follow:\s*true/);
  assert.match(page, /isToeflSectionalListeningSetId\(mockId\)/);
  assert.match(page, /key=\{practice\.id\}/, 'Changing sets must reset runner component state.');
  assert.doesNotMatch(page, /mockId\s*!==\s*['"]set-1['"]/);
  assert.match(library, /TOEFL_SECTIONAL_LISTENING_SET_IDS\.map/);
  assert.doesNotMatch(sitemap, /listening\/simulacros\/practica/);
});
