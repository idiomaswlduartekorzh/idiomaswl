import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  TOEFL_EXERCISE_COUNT,
  TOEFL_EXERCISE_SECTIONS,
  TOEFL_MOCK_LIBRARY_HREF,
} from '../src/data/practica/toefl-exercise-catalog.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const expectedCounts = { reading: 3, listening: 4, writing: 3, speaking: 2 };
const items = TOEFL_EXERCISE_SECTIONS.flatMap((section) => section.items);

assert.equal(TOEFL_EXERCISE_COUNT, 12, 'The TOEFL catalog must expose exactly 12 current task families.');
assert.equal(new Set(items.map((item) => item.id)).size, items.length, 'TOEFL catalog IDs must be unique.');

for (const section of TOEFL_EXERCISE_SECTIONS) {
  assert.equal(
    section.items.length,
    expectedCounts[section.id],
    `${section.label} must keep the approved ${expectedCounts[section.id]} task families.`,
  );
  assert.ok(section.guideHref.startsWith('/practica/toefl/'), `${section.label} needs a TOEFL guide route.`);
  assert.ok(section.sourceClaimId, `${section.label} needs an approved academic claim.`);
}

for (const item of items) {
  assert.ok(item.sourceClaimIds.length > 0, `${item.id} needs at least one approved academic claim.`);

  if (item.availability.kind === 'mock-only') {
    assert.equal(item.availability.href, TOEFL_MOCK_LIBRARY_HREF, `${item.id} must use the real mock anchor.`);
    continue;
  }

  const pagePath = path.join(ROOT, 'src/app/(site)', item.availability.href, 'page.tsx');
  await access(pagePath);
}

await access(path.join(ROOT, 'src/app/(site)/practica/toefl/ejercicios/page.tsx'));

console.log('✓ TOEFL sectional catalog: 12 unique tasks · 3/4/3/2 · live routes · real mock anchor');
