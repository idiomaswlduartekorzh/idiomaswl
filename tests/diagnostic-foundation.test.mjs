import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ENGLISH_DIAGNOSTIC_BLUEPRINT,
  ENGLISH_LEVEL_EVIDENCE,
  validateDiagnosticBlueprint,
} from '../src/lib/diagnostic/blueprint.ts';
import { CEFR_LEVELS, DIAGNOSTIC_SKILLS } from '../src/lib/diagnostic/types.ts';

test('the blueprint exposes all five requested dimensions and every CEFR level', () => {
  assert.deepEqual(ENGLISH_DIAGNOSTIC_BLUEPRINT.levels, CEFR_LEVELS);
  assert.deepEqual(
    ENGLISH_DIAGNOSTIC_BLUEPRINT.dimensions.map(dimension => dimension.skill),
    DIAGNOSTIC_SKILLS,
  );
  assert.deepEqual(validateDiagnosticBlueprint(ENGLISH_DIAGNOSTIC_BLUEPRINT), []);
});

test('written discourse is an objective closed-task construct, not a claim about free writing production', () => {
  assert.equal(DIAGNOSTIC_SKILLS.includes('writing'), false);
  const dimension = ENGLISH_DIAGNOSTIC_BLUEPRINT.dimensions.find(item => item.skill === 'written-discourse');
  assert.ok(dimension);
  assert.equal(dimension.label, 'Construcción del discurso escrito');
  assert.match(dimension.construct, /mediante tareas cerradas/i);
  assert.doesNotMatch(dimension.construct, /producir|producción/i);
  assert.equal(dimension.minimumDecisions, 7);
  assert.equal(dimension.minimumDistinctStimuli, 6);
  assert.deepEqual(dimension.subdomains, [
    'organisation-sequencing',
    'cohesion-reference',
    'rhetorical-relations',
    'audience-register',
    'revision-coherence',
  ]);
});

test('the locator is balanced and every route covers exactly two adjacent levels', () => {
  assert.deepEqual(ENGLISH_DIAGNOSTIC_BLUEPRINT.locator.decisionsPerObjectiveSkill, {
    reading: 3,
    listening: 3,
    'written-discourse': 3,
    grammar: 3,
    vocabulary: 3,
  });
  assert.equal(ENGLISH_DIAGNOSTIC_BLUEPRINT.locator.decisions, 15);
  assert.deepEqual(ENGLISH_DIAGNOSTIC_BLUEPRINT.routes.map(route => route.levels), [
    ['A1', 'A2'],
    ['B1', 'B2'],
    ['C1', 'C2'],
  ]);
});

test('no requested skill can be estimated without an explicit evidence floor', () => {
  for (const dimension of ENGLISH_DIAGNOSTIC_BLUEPRINT.dimensions) {
    assert.ok(dimension.minimumDecisions >= 1, dimension.skill);
    assert.ok(dimension.minimumDistinctStimuli >= 1, dimension.skill);
  }
  for (const skill of DIAGNOSTIC_SKILLS) {
    const dimension = ENGLISH_DIAGNOSTIC_BLUEPRINT.dimensions.find(item => item.skill === skill);
    assert.ok(dimension.minimumDecisions >= 5, skill);
  }
});

test('each level has interpretable evidence statements for all five skills', () => {
  for (const level of CEFR_LEVELS) {
    assert.deepEqual(Object.keys(ENGLISH_LEVEL_EVIDENCE[level]), [...DIAGNOSTIC_SKILLS]);
    for (const skill of DIAGNOSTIC_SKILLS) {
      assert.ok(ENGLISH_LEVEL_EVIDENCE[level][skill].length >= 40, `${level}/${skill}`);
    }
  }
});

test('mutations that weaken coverage or routing fail validation', () => {
  const weak = structuredClone(ENGLISH_DIAGNOSTIC_BLUEPRINT);
  weak.locator.decisionsPerObjectiveSkill.listening = 0;
  weak.routes[2].levels = ['B2', 'C2'];
  weak.dimensions.find(item => item.skill === 'written-discourse').minimumDecisions = 0;
  const errors = validateDiagnosticBlueprint(weak);
  assert.ok(errors.some(error => error.includes('locator')));
  assert.ok(errors.some(error => error.includes('routes')));
  assert.ok(errors.some(error => error.includes('written-discourse')));
});
