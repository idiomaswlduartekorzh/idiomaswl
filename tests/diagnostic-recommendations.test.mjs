import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import test from 'node:test';

import { buildEnglishDiagnosticRecommendations } from '../src/server/diagnostic/recommendations.ts';

const skills = [
  { skill: 'reading', decisions: 8, distinctStimuli: 4, status: 'provisional', estimatedLevel: 'B2', confidence: 0.6 },
  { skill: 'listening', decisions: 8, distinctStimuli: 4, status: 'provisional', estimatedLevel: 'A2', confidence: 0.5 },
  { skill: 'written-discourse', decisions: 7, distinctStimuli: 7, status: 'provisional', estimatedLevel: 'B1', confidence: 0.6 },
  { skill: 'grammar', decisions: 8, distinctStimuli: 8, status: 'provisional', estimatedLevel: 'B1', confidence: 0.55 },
  { skill: 'vocabulary', decisions: 8, distinctStimuli: 8, status: 'provisional', estimatedLevel: 'C1', confidence: 0.5 },
];

test('recommendations prioritize the weakest measured skill and set the next observable target', () => {
  const recommendations = buildEnglishDiagnosticRecommendations(skills);
  assert.equal(recommendations.length, 5);
  assert.equal(recommendations[0].skill, 'listening');
  assert.equal(recommendations[0].currentLevel, 'A2');
  assert.equal(recommendations[0].targetLevel, 'B1');
  assert.match(recommendations[0].reason, /A2/);
  assert.match(recommendations[0].reason, /ideas principales/);
});

test('missing evidence is the first priority and never appears as a zero score', () => {
  const missing = skills.map(skill => skill.skill === 'written-discourse'
    ? { skill: 'written-discourse', decisions: 7, distinctStimuli: 7, status: 'not-estimated' }
    : skill);
  const recommendations = buildEnglishDiagnosticRecommendations(missing);
  assert.equal(recommendations[0].skill, 'written-discourse');
  assert.equal(recommendations[0].currentLevel, null);
  assert.doesNotMatch(recommendations[0].reason, /0%|cero/iu);
});

test('recommendation links resolve to existing application routes', async () => {
  const recommendations = buildEnglishDiagnosticRecommendations(skills);
  for (const recommendation of recommendations) {
    for (const link of [recommendation.practice, recommendation.course]) {
      await assert.doesNotReject(access(new URL(`../src/app/(site)${link.href}/page.tsx`, import.meta.url)));
    }
  }
});

test('different skill profiles do not produce the same priority text', () => {
  const first = buildEnglishDiagnosticRecommendations(skills);
  const second = buildEnglishDiagnosticRecommendations(skills.map(skill => skill.skill === 'listening'
    ? { ...skill, estimatedLevel: 'C2' }
    : skill.skill === 'vocabulary' ? { ...skill, estimatedLevel: 'A1' } : skill));
  assert.equal(first[0].skill, 'listening');
  assert.equal(second[0].skill, 'vocabulary');
  assert.notEqual(first[0].reason, second[0].reason);
});
