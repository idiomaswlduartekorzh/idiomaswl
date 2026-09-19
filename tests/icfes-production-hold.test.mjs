import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { EXAMS } from '../src/data/exams.ts';
import { GUIDED_MOCK_IDS, hasGuidedMock } from '../src/data/icfes/guided-registry.ts';
import { getMock } from '../src/data/mocks/index.ts';

const heldIds = ['mock-21', 'mock-22', 'mock-23'];

test('editorial hold rejects direct exam and guided access', () => {
  for (const id of heldIds) {
    assert.equal(getMock('icfes', id), null, id);
    assert.equal(hasGuidedMock(id), false, id);
    assert.ok(!GUIDED_MOCK_IDS.includes(id), id);
    assert.ok(!EXAMS.icfes.mocks.some((mock) => mock.id === id), id);
  }
  const secureRegistry = readFileSync('src/lib/icfes/exam-registry.server.ts', 'utf8');
  assert.match(secureRegistry, /const own = getMock\('icfes', examId\)/);
  assert.match(secureRegistry, /return getMock\('icfes', examId\)/);
  assert.match(secureRegistry, /Boolean\(getMock\('icfes', examId\)\)/);
});

test('the existing twenty own mocks and other exam families remain available', () => {
  const own = EXAMS.icfes.mocks.filter((mock) => !mock.badge);
  assert.equal(own.length, 20);
  assert.equal(GUIDED_MOCK_IDS.length, 20);
  for (let index = 1; index <= 20; index += 1) {
    const id = `mock-${String(index).padStart(2, '0')}`;
    assert.ok(getMock('icfes', id), id);
    assert.ok(hasGuidedMock(id), id);
  }
  assert.ok(getMock('ielts', 'set-1'));
  assert.equal(EXAMS.icfes.mocks.length + 1, 31);
});

test('public ICFES copy does not promise held mocks or stale inventory counts', () => {
  for (const file of [
    'src/app/(site)/examenes/[exam]/MockGrid.tsx',
    'src/app/(site)/examenes/[exam]/page.tsx',
    'src/app/(site)/examenes/[exam]/ExamInfoGraphic.tsx',
    'src/app/(site)/examenes/[exam]/ExamJsonLd.tsx',
    'src/data/examGuides.ts',
    'src/data/blog.ts',
  ]) {
    const source = readFileSync(file, 'utf8');
    assert.doesNotMatch(source, /23 prácticas propias|23 recorridos|34 recursos|62 rutas/, file);
  }
});

test('release manifest records the editorial and rights hold truthfully', () => {
  const manifest = JSON.parse(readFileSync('src/data/icfes/own-mock-expansion-manifest.json', 'utf8'));
  for (const id of heldIds) {
    const record = manifest.mocks.find((mock) => mock.mockId === id);
    assert.ok(record, id);
    assert.equal(record.provenance.kind, 'unverified-draft', id);
    assert.equal(record.provenance.rights, 'provenance-pending', id);
    assert.equal(record.editorial.status, 'blocked', id);
    assert.equal(record.releaseStatus, 'draft', id);
  }
});
