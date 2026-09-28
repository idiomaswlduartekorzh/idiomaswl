import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ENGLISH_LOCATOR_ROUTING_POLICY,
  LOCATOR_OBJECTIVE_SKILLS,
  routeEnglishLocator,
} from '../src/lib/diagnostic/mst.ts';

function scorecard(counts, omitted = 0) {
  assert.equal(counts.length, LOCATOR_OBJECTIVE_SKILLS.length, 'fixture must cover all locator skills');
  return Object.fromEntries(
    LOCATOR_OBJECTIVE_SKILLS.map((skill, index) => [
      skill,
      { correct: counts[index], decisions: 3, omitted },
    ]),
  );
}

function rank(routeId) {
  return ['low-a1-a2', 'mid-b1-b2', 'high-c1-c2'].indexOf(routeId);
}

test('routes representative low, middle and high locator profiles', () => {
  assert.equal(routeEnglishLocator(scorecard([1, 1, 1, 1, 1])).routeId, 'low-a1-a2');
  assert.equal(routeEnglishLocator(scorecard([2, 2, 2, 2, 1])).routeId, 'mid-b1-b2');
  assert.equal(routeEnglishLocator(scorecard([3, 3, 2, 2, 2])).routeId, 'high-c1-c2');
});

test('flags boundary and uneven profiles for confirmation', () => {
  const boundary = routeEnglishLocator(scorecard([2, 1, 1, 1, 1]));
  assert.equal(boundary.requiresConfirmation, true);
  assert.ok(boundary.reasons.includes('BOUNDARY_SCORE'));

  const uneven = routeEnglishLocator(scorecard([3, 3, 2, 0, 2]));
  assert.equal(uneven.routeId, 'mid-b1-b2');
  assert.equal(uneven.requiresConfirmation, true);
  assert.ok(uneven.reasons.includes('UNEVEN_PROFILE'));
});

test('a fully omitted listening locator does not lower the other skill routes or fabricate listening evidence', () => {
  const noAudio = scorecard([3, 0, 3, 3, 3]);
  noAudio.listening = { correct: 0, decisions: 3, omitted: 3 };
  const decision = routeEnglishLocator(noAudio);
  assert.equal(decision.routeId, 'high-c1-c2');
  assert.equal(decision.totalDecisions, 15);
  assert.equal(decision.effectiveCorrect, 15);
  assert.deepEqual(decision.skillRoutes, {
    reading: 'high-c1-c2',
    listening: null,
    'written-discourse': 'high-c1-c2',
    grammar: 'high-c1-c2',
    vocabulary: 'high-c1-c2',
  });
  assert.equal(decision.requiresConfirmation, true);
  assert.ok(decision.reasons.includes('SKILL_EVIDENCE_OMITTED'));
});

function scoreVectors(length, prefix = []) {
  if (prefix.length === length) return [prefix];
  return [0, 1, 2, 3].flatMap(value => scoreVectors(length, [...prefix, value]));
}

test('every possible complete five-skill locator scorecard receives exactly one valid route', () => {
  const routes = new Set();
  for (const counts of scoreVectors(LOCATOR_OBJECTIVE_SKILLS.length)) {
    const result = routeEnglishLocator(scorecard(counts));
    routes.add(result.routeId);
    assert.equal(result.totalDecisions, 15);
  }
  assert.deepEqual([...routes].sort(), ['high-c1-c2', 'low-a1-a2', 'mid-b1-b2']);
});

test('one additional correct answer never sends a profile to an easier route', () => {
  for (const counts of scoreVectors(LOCATOR_OBJECTIVE_SKILLS.length)) {
    const before = rank(routeEnglishLocator(scorecard(counts)).routeId);
    counts.forEach((value, index) => {
      if (value === 3) return;
      const improved = [...counts];
      improved[index] += 1;
      const after = rank(routeEnglishLocator(scorecard(improved)).routeId);
      assert.ok(after >= before, `${counts.join()} -> ${improved.join()} routed downward`);
    });
  }
});

test('rejects incomplete, inconsistent and overlapping routing inputs', () => {
  assert.throws(
    () => routeEnglishLocator({ ...scorecard([1, 1, 1, 1, 1]), reading: { correct: 1, decisions: 2, omitted: 0 } }),
    /exactly 3/,
  );
  assert.throws(() => routeEnglishLocator(scorecard([1, 1, 1, 1, 1], 3)), /exceed/);
  assert.throws(
    () => routeEnglishLocator(scorecard([1, 1, 1, 1, 1]), { ...ENGLISH_LOCATOR_ROUTING_POLICY, lowMaximumCorrect: 12 }),
    /overlap/,
  );
});
