import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const Ajv = require('ajv');

export const BASELINE_MOCK_COUNT = 23;
export const REQUIRED_PARTS = Object.freeze([1, 2, 3, 4, 5, 6, 7]);
export const REVIEW_ROLES = Object.freeze([
  'english-language-specialist',
  'icfes-format-reviewer',
  'editorial-adjudicator',
]);

export function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

export function candidateDigestSubject(candidate) {
  return {
    candidateId: candidate.candidateId,
    mockId: candidate.mockId,
    modulePath: candidate.modulePath,
    route: candidate.route,
    contentVersion: candidate.contentVersion,
    contentHash: candidate.contentHash,
    provenance: candidate.provenance,
  };
}

export function calculateIcfesCandidateDigest(candidate) {
  return sha256(stableStringify(candidateDigestSubject(candidate)));
}

export function validateExpansionSchema(manifest, schema) {
  const ajv = new Ajv({ allErrors: true, jsonPointers: true });
  const validate = ajv.compile(schema);
  if (validate(manifest)) return [];
  return (validate.errors ?? []).map((error) => {
    const location = error.dataPath || '/';
    return `schema ${location}: ${error.message}`;
  });
}

function add(condition, failures, message) {
  if (!condition) failures.push(message);
}

function unique(values) {
  return new Set(values).size === values.length;
}

function hasBlockingFinding(report) {
  return (report.findings ?? []).some((finding) => finding.blockProduction === true
    || finding.severity === 'critical' || finding.severity === 'high');
}

export function validateCandidateState(candidate, { source = null, publicSurfaces = [] } = {}) {
  const failures = [];
  const state = candidate.editorial.status;
  const releaseState = candidate.release.status;
  const reports = candidate.editorial.reviewReports ?? [];
  const expectedModulePath = `src/data/mocks/icfes-${candidate.mockId}.ts`;
  const expectedRoute = `/examenes/icfes/practica/${candidate.mockId}`;

  add(candidate.modulePath === expectedModulePath, failures, `${candidate.mockId}: modulePath no canónico`);
  add(candidate.route === expectedRoute, failures, `${candidate.mockId}: route no canónica`);
  add(candidate.candidateDigest === calculateIcfesCandidateDigest(candidate), failures, `${candidate.mockId}: candidateDigest obsoleto`);
  add(unique(reports.map(({ role }) => role)), failures, `${candidate.mockId}: solo se permite un reporte por rol`);
  add(unique(reports.map(({ actorId }) => actorId)), failures, `${candidate.mockId}: los revisores deben ser distintos`);

  const reportRoles = new Set(reports.map(({ role }) => role));
  for (const report of reports) {
    add(report.candidateDigest === candidate.candidateDigest, failures, `${candidate.mockId}: reporte ${report.role} ligado a un digest obsoleto`);
    if (report.verdict === 'PASS') {
      add(!hasBlockingFinding(report), failures, `${candidate.mockId}: ${report.role} declara PASS con hallazgos bloqueantes`);
    }
  }
  const contradictory = reports.some((report) => report.verdict !== 'PASS')
    && reports.some((report) => report.verdict === 'PASS');
  add(!contradictory, failures, `${candidate.mockId}: reportes PASS y FAIL/BLOCKED contradictorios`);

  const flags = candidate.release;
  if (state === 'draft' || state === 'in-review' || state === 'rejected' || state === 'approved') {
    add(flags.catalogEligible === false, failures, `${candidate.mockId}: ${state} no puede entrar al catálogo`);
    add(flags.premiumEligible === false, failures, `${candidate.mockId}: ${state} no puede monetizarse`);
  }
  add(flags.indexEligible === false, failures, `${candidate.mockId}: los runners nunca son indexables`);

  if (state === 'draft') {
    add(releaseState === 'draft', failures, `${candidate.mockId}: draft editorial exige release draft`);
    add(candidate.contentHash === null, failures, `${candidate.mockId}: draft debe empezar sin hash aprobado`);
    add(reports.length === 0, failures, `${candidate.mockId}: draft no puede conservar revisiones`);
  }

  if (state === 'in-review') {
    add(releaseState === 'draft', failures, `${candidate.mockId}: in-review exige release draft`);
    add(candidate.editorial.adjudication === null, failures, `${candidate.mockId}: in-review no puede tener adjudicación final`);
  }

  const reviewedStates = new Set(['in-review', 'approved', 'release-candidate', 'published']);
  if (reviewedStates.has(state)) {
    add(Boolean(source), failures, `${candidate.mockId}: ${state} exige módulo de contenido`);
    add(typeof candidate.contentHash === 'string', failures, `${candidate.mockId}: ${state} exige contentHash`);
    if (source && candidate.contentHash) {
      add(sha256(JSON.stringify(source)) === candidate.contentHash, failures, `${candidate.mockId}: contentHash no coincide con el módulo`);
      add(source.id === candidate.mockId, failures, `${candidate.mockId}: id del módulo no coincide`);
      add(source.examSlug === 'icfes', failures, `${candidate.mockId}: examSlug debe ser icfes`);
      const sections = Array.isArray(source.sections) ? source.sections : [];
      add(JSON.stringify(sections.map(({ part }) => part)) === JSON.stringify(REQUIRED_PARTS), failures, `${candidate.mockId}: el módulo debe contener las partes 1–7 en orden`);
      const questions = sections.flatMap(({ questions }) => Array.isArray(questions) ? questions : []);
      add(questions.length === 45, failures, `${candidate.mockId}: el módulo debe contener 45 preguntas`);
      add(unique(questions.map(({ id }) => id)), failures, `${candidate.mockId}: itemId duplicado en el módulo`);
      for (const question of questions) {
        add(['mcq', 'dialog'].includes(question.type), failures, `${candidate.mockId}:${question.id}: tipo no machine-scored`);
        add(Array.isArray(question.options) && question.options.length >= 3, failures, `${candidate.mockId}:${question.id}: opciones insuficientes`);
        add(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length, failures, `${candidate.mockId}:${question.id}: answer fuera de rango`);
      }
      const evidenceIds = new Set(candidate.provenance.itemEvidence.map(({ itemId }) => itemId));
      add(questions.every(({ id }) => evidenceIds.has(id)), failures, `${candidate.mockId}: evidencia por ítem no coincide con el módulo`);
    }
    add(candidate.provenance.status === 'verified', failures, `${candidate.mockId}: ${state} exige procedencia verificada`);
    add(candidate.provenance.rights === 'owned-content', failures, `${candidate.mockId}: ${state} exige derechos propios verificados`);
    add(candidate.provenance.itemEvidence.length === 45, failures, `${candidate.mockId}: ${state} exige evidencia para 45 ítems`);
    add(unique(candidate.provenance.itemEvidence.map(({ itemId }) => itemId)), failures, `${candidate.mockId}: evidencia por ítem duplicada`);
  }

  const approvedStates = new Set(['approved', 'release-candidate', 'published']);
  if (approvedStates.has(state)) {
    add(REVIEW_ROLES.every((role) => reportRoles.has(role)), failures, `${candidate.mockId}: faltan los tres reportes editoriales`);
    add(reports.every((report) => report.verdict === 'PASS' && !hasBlockingFinding(report)), failures, `${candidate.mockId}: todos los reportes deben aprobar sin bloqueos`);
    add(candidate.editorial.adjudication?.decision === 'APPROVE', failures, `${candidate.mockId}: falta adjudicación humana aprobatoria`);
    add(candidate.editorial.adjudication?.candidateDigest === candidate.candidateDigest, failures, `${candidate.mockId}: adjudicación ligada a digest obsoleto`);
  }

  if (state === 'approved') add(releaseState === 'approved', failures, `${candidate.mockId}: estado de release incoherente`);
  if (state === 'release-candidate') {
    add(releaseState === 'release-candidate', failures, `${candidate.mockId}: estado de release incoherente`);
    add(flags.catalogEligible === true, failures, `${candidate.mockId}: release-candidate debe habilitar catálogo explícitamente`);
    add(flags.premiumEligible === false, failures, `${candidate.mockId}: release-candidate no puede monetizarse antes del deploy verificado`);
    add(flags.deploymentEvidence === null, failures, `${candidate.mockId}: release-candidate aún no tiene evidencia postdeploy`);
  }
  if (state === 'published') {
    add(releaseState === 'published', failures, `${candidate.mockId}: estado de release incoherente`);
    add(flags.catalogEligible === true, failures, `${candidate.mockId}: published debe estar en catálogo`);
    add(flags.premiumEligible === true, failures, `${candidate.mockId}: published debe declarar monetización explícita`);
    add(Boolean(flags.deploymentEvidence), failures, `${candidate.mockId}: published exige evidencia postdeploy`);
  }

  if (state === 'rejected') {
    add(releaseState === 'rejected', failures, `${candidate.mockId}: estado rechazado incoherente`);
    add(reports.some((report) => report.verdict !== 'PASS') || candidate.editorial.adjudication?.decision === 'REJECT', failures, `${candidate.mockId}: rejected exige un rechazo trazable`);
  }

  const publicText = publicSurfaces.join('\n');
  if (flags.catalogEligible === false) {
    add(!publicText.includes(candidate.mockId), failures, `${candidate.mockId}: candidato no elegible aparece en catálogo, registry o sitemap`);
  } else if (publicSurfaces.length >= 4) {
    add(publicSurfaces[0].includes(candidate.mockId), failures, `${candidate.mockId}: release-candidate falta en catálogo`);
    add(publicSurfaces[1].includes(candidate.mockId), failures, `${candidate.mockId}: release-candidate falta en registry`);
    add(publicSurfaces[2].includes(candidate.mockId), failures, `${candidate.mockId}: release-candidate falta en registro guiado`);
    add(!publicSurfaces[3].includes(candidate.mockId) && !publicSurfaces[3].includes(candidate.route), failures, `${candidate.mockId}: runner privado apareció en sitemap`);
  }
  return failures;
}

export function validateExpansionManifest(manifest, schema, options = {}) {
  const failures = validateExpansionSchema(manifest, schema);
  if (failures.length > 0) return failures;
  const ids = [...manifest.mocks.map(({ mockId }) => mockId), ...manifest.candidates.map(({ mockId }) => mockId)];
  add(unique(ids), failures, 'manifest: mockId duplicado entre baseline y candidatos');
  for (const candidate of manifest.candidates) {
    const source = options.sources?.get(candidate.mockId) ?? null;
    failures.push(...validateCandidateState(candidate, { source, publicSurfaces: options.publicSurfaces }));
  }
  return failures;
}
