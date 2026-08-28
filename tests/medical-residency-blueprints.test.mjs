import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('el guardián rechaza perfiles universitarios sin evidencia completa', () => {
  const result = spawnSync(process.execPath, [
    '--experimental-strip-types',
    '--no-warnings',
    'scripts/check-medical-residency-blueprints.mjs',
  ], { cwd: ROOT, encoding: 'utf8' });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /9 perfiles/);
  assert.match(result.stdout, /2 simulacros completos habilitables/);
});

test('el perfil Universidad del Atlántico continúa bloqueado para producto', async () => {
  const { MEDICAL_RESIDENCY_BLUEPRINT_BY_SLUG } = await import(
    '../src/data/medical-residency/university-blueprints.ts'
  );
  const blueprint = MEDICAL_RESIDENCY_BLUEPRINT_BY_SLUG.uniatlantico;

  assert.equal(blueprint.readiness, 'monitor-only');
  assert.ok(Object.values(blueprint.capabilities).every((value) => value === false));
});

test('solo Caldas y Cartagena tienen contrato oficial suficiente para longitud completa', async () => {
  const { MEDICAL_RESIDENCY_BLUEPRINTS } = await import(
    '../src/data/medical-residency/university-blueprints.ts'
  );
  const enabled = MEDICAL_RESIDENCY_BLUEPRINTS
    .filter((blueprint) => blueprint.capabilities.fullLengthMock)
    .map((blueprint) => blueprint.slug)
    .sort();

  assert.deepEqual(enabled, ['ucaldas', 'unicartagena']);
});

test('Universidad Libre conserva el formato oficial y la ponderación incompleta', async () => {
  const { MEDICAL_RESIDENCY_BLUEPRINT_BY_SLUG } = await import(
    '../src/data/medical-residency/university-blueprints.ts'
  );
  const blueprint = MEDICAL_RESIDENCY_BLUEPRINT_BY_SLUG['unilibre-barranquilla'];
  const weights = blueprint.exam.selectionWeights.value;

  assert.equal(blueprint.exam.durationMinutes.value, 120);
  assert.deepEqual(
    blueprint.exam.composition.value?.map(({ percentage }) => percentage),
    [80, 20],
  );
  assert.match(blueprint.exam.itemFormat.value ?? '', /tres opciones/);
  assert.equal(weights?.complete, false);
  assert.equal(
    weights?.components.reduce((total, component) => total + component.percentage, 0),
    90,
  );
  assert.equal(blueprint.capabilities.cvPreparation, false);
});
