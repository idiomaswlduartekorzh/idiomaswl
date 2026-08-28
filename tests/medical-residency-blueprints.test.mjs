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

test('el plan de Caldas es reproducible y conserva la proporción oficial 40+20', async () => {
  const {
    createCaldasStudyPlan,
    parseCaldasStudyPlanInput,
  } = await import('../src/data/medical-residency/mvp-plan.ts');

  const input = parseCaldasStudyPlanInput({
    especialidad: 'medicina-interna',
    semanas: '12',
    horas: '6',
  });

  assert.ok(input);
  const plan = createCaldasStudyPlan(input);
  assert.equal(plan.blueprintVersion, 'ucaldas-2027.v1');
  assert.equal(plan.totalHours, 72);
  assert.deepEqual(plan.weeklyAllocation.map(({ hours }) => hours), [4, 2]);
  assert.deepEqual(
    plan.weeklyAllocation.map(({ officialQuestionShare }) => officialQuestionShare),
    ['40 de 60 preguntas', '20 de 60 preguntas'],
  );
});

test('el generador rechaza parámetros fuera del contrato auditado', async () => {
  const { parseCaldasStudyPlanInput } = await import(
    '../src/data/medical-residency/mvp-plan.ts'
  );

  assert.equal(parseCaldasStudyPlanInput({
    especialidad: 'neurocirugia',
    semanas: '999',
    horas: '-3',
  }), null);
});

test('el log del MVP es secuencial y mantiene bloqueado el contenido clínico', async () => {
  const { MEDICAL_MVP_AUDIT_LOG } = await import(
    '../src/data/medical-residency/mvp-audit.ts'
  );

  assert.deepEqual(MEDICAL_MVP_AUDIT_LOG.map(({ sequence }) => sequence), [1, 2, 3, 4]);
  assert.equal(MEDICAL_MVP_AUDIT_LOG.at(-1)?.status, 'blocked');
  assert.match(MEDICAL_MVP_AUDIT_LOG.at(-1)?.phase ?? '', /lote clínico/i);
});
