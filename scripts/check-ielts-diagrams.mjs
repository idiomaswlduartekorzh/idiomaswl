import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { IELTS_SET1_DIAGRAM_LAYOUTS, getIeltsDiagramLayout } from '../src/data/ielts/set1-diagram-layouts.ts';
import mock from '../src/data/mocks/ielts-set-1.ts';
import { ieltsQuestionNumber } from '../src/data/ielts/question-number.ts';

// These hashes identify the visually reviewed source images. A changed asset
// requires a new visual review, not silently adapting the expected hash.
const approved = {
  'r1-flowchart': { hash: '44bfb9b82931b24896d342842ce3c7cdc0f0798224f47cb53f4ebd7a3877edc3', numbers: [4, 5, 6, 7, 8] },
  'r2-diagram': { hash: 'afefc08fc9980250942634d266df85d10082e612019c3b4ce5d367f4e7f98215', numbers: [21, 22, 23] },
};
assert.deepEqual(Object.keys(IELTS_SET1_DIAGRAM_LAYOUTS).sort(), Object.keys(approved).sort());
for (const [id, layout] of Object.entries(IELTS_SET1_DIAGRAM_LAYOUTS)) {
  const question = mock.sections.flatMap(s => s.questions).find(q => q.id === id);
  assert.equal(question?.type, 'formgroup', id);
  assert.equal(question.imageUrl, layout.imageUrl, id);
  assert.deepEqual(layout.blanks.map(b => b.num), approved[id].numbers, `${id}: visual order`);
  assert.deepEqual(question.blanks.map(b => b.num), approved[id].numbers, `${id}: answer mapping`);
  const png = fs.readFileSync(new URL(`../public${layout.imageUrl}`, import.meta.url));
  assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(png.readUInt32BE(16), layout.width, `${id}: image width`);
  assert.equal(png.readUInt32BE(20), layout.height, `${id}: image height`);
  assert.equal(createHash('sha256').update(png).digest('hex'), approved[id].hash, `${id}: image changed; review coordinates visually`);
  for (const b of layout.blanks) {
    assert.ok(b.width >= 100 && b.height >= 32 && b.context.trim(), `${id}:${b.num}: legibility/context`);
    assert.ok(b.x >= 0 && b.y >= 0 && b.x + b.width <= layout.width && b.y + b.height <= layout.height, `${id}:${b.num}: bounds`);
    for (const c of layout.blanks.filter(c => c.num !== b.num)) {
      assert.ok(b.x + b.width <= c.x || c.x + c.width <= b.x || b.y + b.height <= c.y || c.y + c.height <= b.y, `${id}: overlapping blanks`);
    }
  }
  assert.equal(getIeltsDiagramLayout(id, '/different-image.png'), null, 'Do not apply Set 1 coordinates to other images');
  assert.equal(getIeltsDiagramLayout(id, layout.imageUrl), layout);
}
assert.equal(getIeltsDiagramLayout('unknown', '/unknown.png'), null);
assert.equal(ieltsQuestionNumber('r2-q20'), 20, 'Do not reset MCQ numbering to section position 7');
assert.equal(ieltsQuestionNumber('l3-q21'), 21);
assert.throws(() => ieltsQuestionNumber('r2-question'));
assert.throws(() => ieltsQuestionNumber('r2-q41'));
for (let n = 1; n <= 20; n++) {
  const { default: set } = await import(`../src/data/mocks/ielts-set-${n}.ts`);
  for (const q of set.sections.flatMap(s => s.questions).filter(q => ['mcq', 'dialog'].includes(q.type))) {
    assert.ok(ieltsQuestionNumber(q.id));
  }
}
console.log('✓ IELTS diagrams: 2 preserved images, 8 ordered answer fields, geometry and mapping verified (visual QA remains required)');
