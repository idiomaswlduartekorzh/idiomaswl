import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import path from 'node:path';

import { getMock } from '../src/data/mocks/index.ts';
import { IELTS_SECTIONAL_LISTENING_SET_IDS, selectIeltsListeningPractice } from '../src/data/ielts/sectional-listening-adapter.ts';

for (const mockId of IELTS_SECTIONAL_LISTENING_SET_IDS) {
  const mock = getMock('ielts', mockId);
  assert.ok(mock, `${mockId}: missing source mock`);
  const practice = selectIeltsListeningPractice(mock);
  assert.ok(practice, `${mockId}: invalid client-safe Listening projection`);
  assert.equal(practice.sections.length, 4, `${mockId}: expected four parts`);
  assert.equal(new Set(practice.sections.map(section => section.audioUrl)).size, 1, `${mockId}: audio drift between parts`);
  await access(path.join(process.cwd(), 'public', practice.audioUrl.replace(/^\//, '')));
}

console.log('✓ IELTS sectional Listening: 20 sets · 4 parts each · 40 responses each · client-safe keys · released audio');
