import {
  MEDICAL_EDITORIAL_TAXONOMY,
  MEDICAL_RESIDENCY_BLUEPRINTS,
  MEDICAL_RESIDENCY_OFFICIAL_SOURCES,
} from '../src/data/medical-residency/index.ts';

const failures = [];
const sourceIds = new Set(MEDICAL_RESIDENCY_OFFICIAL_SOURCES.map((source) => source.id));

function fail(scope, message) {
  failures.push(`${scope}: ${message}`);
}

function checkUnique(values, scope) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) fail(scope, `valor duplicado: ${value}`);
    seen.add(value);
  }
}

function checkSourceReferences(ids, scope) {
  if (!ids.length) fail(scope, 'debe citar al menos una fuente oficial');
  for (const id of ids) {
    if (!sourceIds.has(id)) fail(scope, `fuente inexistente: ${id}`);
  }
}

checkUnique(MEDICAL_RESIDENCY_OFFICIAL_SOURCES.map((source) => source.id), 'fuentes');
checkUnique(MEDICAL_RESIDENCY_BLUEPRINTS.map((blueprint) => blueprint.slug), 'blueprints');
checkUnique(MEDICAL_RESIDENCY_BLUEPRINTS.map((blueprint) => blueprint.version), 'versiones');

for (const source of MEDICAL_RESIDENCY_OFFICIAL_SOURCES) {
  if (!source.url.startsWith('https://')) fail(source.id, 'la URL oficial debe usar HTTPS');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(source.retrievedAt)) fail(source.id, 'retrievedAt debe usar YYYY-MM-DD');
  if (!source.supports.length) fail(source.id, 'supports no puede estar vacío');
}

for (const blueprint of MEDICAL_RESIDENCY_BLUEPRINTS) {
  checkSourceReferences(blueprint.sourceIds, blueprint.slug);
  checkUnique(blueprint.officialDomains.map((domain) => domain.id), `${blueprint.slug}.officialDomains`);

  for (const domain of blueprint.officialDomains) {
    checkSourceReferences(domain.sourceIds, `${blueprint.slug}.${domain.id}`);
  }

  for (const [field, evidence] of Object.entries(blueprint.exam)) {
    checkSourceReferences(evidence.sourceIds, `${blueprint.slug}.exam.${field}`);
    if (evidence.status === 'not-published' && evidence.value !== null) {
      fail(`${blueprint.slug}.exam.${field}`, 'not-published exige value null');
    }
    if (evidence.status !== 'not-published' && evidence.value === null) {
      fail(`${blueprint.slug}.exam.${field}`, `${evidence.status} exige un valor`);
    }
  }

  const { questionCount, durationMinutes, composition, selectionWeights } = blueprint.exam;

  if (blueprint.capabilities.fullLengthMock) {
    if (blueprint.readiness !== 'full-simulation-ready') {
      fail(blueprint.slug, 'fullLengthMock exige readiness full-simulation-ready');
    }
    if (questionCount.value == null || durationMinutes.value == null || composition.value == null) {
      fail(blueprint.slug, 'fullLengthMock exige cantidad, duración y composición oficiales');
    }
  }

  if (composition.value && questionCount.value != null) {
    if (composition.value.some((block) => block.questions == null)) {
      fail(blueprint.slug, 'questionCount publicado exige cantidad por bloque para un simulacro completo');
    } else {
      const total = composition.value.reduce((sum, block) => sum + block.questions, 0);
      if (total !== questionCount.value) {
        fail(blueprint.slug, `la composición suma ${total}, pero questionCount es ${questionCount.value}`);
      }
    }
  }

  if (composition.value) {
    for (const block of composition.value) {
      const measures = [block.questions, block.percentage].filter((value) => value != null);
      if (measures.length !== 1) {
        fail(blueprint.slug, `${block.id} debe declarar preguntas o porcentaje, no ambos ni ninguno`);
      }
    }
    if (composition.value.every((block) => block.percentage != null)) {
      const total = composition.value.reduce((sum, block) => sum + block.percentage, 0);
      if (total !== 100) fail(blueprint.slug, `los porcentajes de composición suman ${total} %, no 100 %`);
    }
  }

  if (selectionWeights.value) {
    const { components, complete } = selectionWeights.value;
    const total = components.reduce((sum, item) => sum + item.percentage, 0);
    if (complete && total !== 100) fail(blueprint.slug, `las ponderaciones completas suman ${total} %, no 100 %`);
    if (!complete && (total <= 0 || total >= 100)) {
      fail(blueprint.slug, `las ponderaciones parciales deben sumar entre 1 % y 99 %, suman ${total} %`);
    }
    checkUnique(components.map((item) => item.component), `${blueprint.slug}.selectionWeights`);
  }

  if (blueprint.readiness === 'monitor-only') {
    const enabled = Object.entries(blueprint.capabilities).filter(([, value]) => value).map(([key]) => key);
    if (enabled.length) fail(blueprint.slug, `monitor-only no puede habilitar capacidades: ${enabled.join(', ')}`);
  }

  if (!blueprint.independentPreparationNotice.includes('No es material oficial')) {
    fail(blueprint.slug, 'falta aviso explícito de independencia');
  }
  if (!blueprint.unknowns.length) fail(blueprint.slug, 'debe declarar vacíos oficiales');
}

for (const domain of MEDICAL_EDITORIAL_TAXONOMY) {
  checkSourceReferences(domain.evidenceSourceIds, `taxonomy.${domain.id}`);
  if (!domain.childTopics.length) fail(`taxonomy.${domain.id}`, 'debe tener temas hijos');
}
checkUnique(MEDICAL_EDITORIAL_TAXONOMY.map((domain) => domain.id), 'taxonomía');

const atlantico = MEDICAL_RESIDENCY_BLUEPRINTS.find((blueprint) => blueprint.slug === 'uniatlantico');
if (!atlantico || atlantico.readiness !== 'monitor-only') {
  fail('uniatlantico', 'debe permanecer en monitor-only hasta encontrar convocatoria oficial suficiente');
}

if (failures.length) {
  console.error(`Blueprints médico-residencia: ${failures.length} fallo(s)`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const ready = MEDICAL_RESIDENCY_BLUEPRINTS.filter((blueprint) => blueprint.capabilities.fullLengthMock);
const partial = MEDICAL_RESIDENCY_BLUEPRINTS.filter((blueprint) => blueprint.readiness === 'partial-structure');
console.log(
  `Blueprints médico-residencia OK: ${MEDICAL_RESIDENCY_BLUEPRINTS.length} perfiles, ` +
  `${MEDICAL_RESIDENCY_OFFICIAL_SOURCES.length} fuentes, ${ready.length} simulacros completos habilitables, ` +
  `${partial.length} perfiles parciales.`,
);
