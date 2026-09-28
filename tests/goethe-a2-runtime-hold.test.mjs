import assert from 'node:assert/strict';
import test from 'node:test';

import { getGoetheA2PracticeMock, getMock } from '../src/data/mocks/index.ts';
import { getGoetheA2Release, isGoetheA2Held, isGoetheA2PracticePublished, isGoetheA2Published } from '../src/lib/goethe/a2-release.ts';

test('all ten audio-blocked Goethe A2 mocks remain inaccessible through the public registry', () => {
  for (let set = 1; set <= 10; set += 1) {
    const id = `a2-${set}`;
    assert.equal(isGoetheA2Held(id), true);
    assert.equal(isGoetheA2Published(id), false);
    assert.equal(getGoetheA2Release(id)?.state, 'AUDIO_BLOCKED');
    assert.equal(getMock('goethe', id), null);
    assert.equal(isGoetheA2PracticePublished(id, 'reading'), true);
    assert.equal(isGoetheA2PracticePublished(id, 'writing'), true);
    assert.equal(isGoetheA2PracticePublished(id, 'speaking'), true);
    assert.equal(getGoetheA2PracticeMock(id, 'reading')?.sections.length, 4);
    assert.equal(getGoetheA2PracticeMock(id, 'writing')?.sections.length, 2);
    assert.equal(getGoetheA2PracticeMock(id, 'speaking')?.sections.length, 3);
    assert.equal(getGoetheA2PracticeMock(id, 'listening'), null);
  }
});

test('focused A2 practice exposes only the requested Teil and never listening', () => {
  const readingTeil = getGoetheA2PracticeMock('a2-1', 'reading', 2);
  assert.equal(readingTeil?.sections.length, 1);
  assert.equal(readingTeil?.sections[0].skill, 'reading');
  assert.equal(readingTeil?.sections[0].part, 2);
  assert.equal(readingTeil?.timeMinutes, 7);
  assert.equal(getGoetheA2PracticeMock('a2-1', 'reading', 5), null);
});

test('the A2 gate does not block released Goethe A1 material', () => {
  assert.ok(getMock('goethe', 'a1-1'));
  assert.equal(isGoetheA2Held('a1-1'), false);
});
