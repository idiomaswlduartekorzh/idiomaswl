import assert from 'node:assert/strict';
import test from 'node:test';

import { getMock } from '../src/data/mocks/index.ts';
import { getGoetheA2Release, isGoetheA2Held, isGoetheA2Published } from '../src/lib/goethe/a2-release.ts';

test('all ten audio-blocked Goethe A2 mocks remain inaccessible through the public registry', () => {
  for (let set = 1; set <= 10; set += 1) {
    const id = `a2-${set}`;
    assert.equal(isGoetheA2Held(id), true);
    assert.equal(isGoetheA2Published(id), false);
    assert.equal(getGoetheA2Release(id)?.state, 'AUDIO_BLOCKED');
    assert.equal(getMock('goethe', id), null);
  }
});

test('the A2 gate does not block released Goethe A1 material', () => {
  assert.ok(getMock('goethe', 'a1-1'));
  assert.equal(isGoetheA2Held('a1-1'), false);
});
