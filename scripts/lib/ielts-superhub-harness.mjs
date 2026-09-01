import fs from 'node:fs';
import path from 'node:path';

export const REQUIRED_AGENT_IDS = [
  'orchestrator',
  'preservation-guardian',
  'seo-intelligence',
  'content-architect',
  'assessment-editor',
  'audio-qa',
  'implementer',
  'adversarial-qa',
  'analytics-steward',
  'release-guardian',
];

const VALID_AGENT_MODES = new Set(['coordination', 'read-only', 'writer']);
const VALID_EDITORIAL_STATES = new Set(['blocked', 'draft', 'pilot', 'audited', 'published', 'legacy']);

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(entryPath) : [entryPath];
  });
}

export function validateAgentsManifest(manifest) {
  const failures = [];
  const agents = Array.isArray(manifest?.agents) ? manifest.agents : [];
  const ids = agents.map((agent) => agent?.id).filter(Boolean);
  const idSet = new Set(ids);

  if (manifest?.scope !== 'ielts-superhub') failures.push('El alcance de agentes debe ser ielts-superhub.');
  if (agents.length < REQUIRED_AGENT_IDS.length) {
    failures.push(`Se requieren al menos ${REQUIRED_AGENT_IDS.length} agentes; hay ${agents.length}.`);
  }
  if (idSet.size !== ids.length) failures.push('Los identificadores de agentes deben ser únicos.');
  for (const requiredId of REQUIRED_AGENT_IDS) {
    if (!idSet.has(requiredId)) failures.push(`Falta el agente obligatorio: ${requiredId}.`);
  }

  const requiredHandoffFields = manifest?.requiredHandoffFields ?? [];
  for (const field of ['revision', 'changedPaths', 'commands', 'openDebt', 'nextOwner']) {
    if (!requiredHandoffFields.includes(field)) failures.push(`Falta el campo obligatorio de handoff: ${field}.`);
  }

  for (const agent of agents) {
    const label = agent?.id || '<sin-id>';
    if (!VALID_AGENT_MODES.has(agent?.mode)) failures.push(`${label} tiene un modo inválido: ${agent?.mode}.`);
    if (typeof agent?.mission !== 'string' || !agent.mission.trim()) failures.push(`${label} no define mission.`);
    for (const field of ['owns', 'gates', 'handoffTo']) {
      if (!Array.isArray(agent?.[field]) || agent[field].length === 0) failures.push(`${label} no define ${field}.`);
    }
    for (const target of agent?.handoffTo ?? []) {
      if (!idSet.has(target)) failures.push(`${label} entrega a un agente inexistente: ${target}.`);
    }
  }

  return failures;
}

function validateUniqueIntegerSet(values, label, failures) {
  if (!Array.isArray(values)) {
    failures.push(`${label} debe ser una lista.`);
    return [];
  }
  if (values.some((value) => !Number.isInteger(value) || value < 1)) {
    failures.push(`${label} solo puede contener enteros positivos.`);
  }
  if (new Set(values).size !== values.length) failures.push(`${label} contiene valores duplicados.`);
  return values;
}

export function validateHarnessManifest(manifest) {
  const failures = [];
  const minimums = manifest?.minimums ?? {};
  const routeInventory = manifest?.routeInventory ?? {};
  const knownRoutes = routeInventory.knownSitemapOnlyRoutes ?? [];
  const noindexRoutes = routeInventory.noindexQueryRoutes ?? [];

  for (const [name, value] of Object.entries(minimums)) {
    if (!Number.isInteger(value) || value < 1) failures.push(`minimums.${name} debe ser un entero positivo.`);
  }
  if (!Number.isInteger(routeInventory.documentedCanonicalFloor) || routeInventory.documentedCanonicalFloor < 1) {
    failures.push('routeInventory.documentedCanonicalFloor debe ser un entero positivo.');
  }
  if (new Set(knownRoutes).size !== knownRoutes.length) failures.push('knownSitemapOnlyRoutes contiene duplicados.');
  if (knownRoutes.some((route) => !route.startsWith('/practica/ielts/') || route.includes('?'))) {
    failures.push('knownSitemapOnlyRoutes solo puede contener rutas canónicas IELTS sin query string.');
  }
  if (noindexRoutes.some((route) => !route.startsWith('/practica/ielts/') || !route.includes('?'))) {
    failures.push('noindexQueryRoutes debe contener rutas IELTS con query string.');
  }
  if (routeInventory.documentedCanonicalFloor + knownRoutes.length !== minimums.canonicalRoutes) {
    failures.push('El total canónico debe ser documentedCanonicalFloor + knownSitemapOnlyRoutes.');
  }

  for (const [area, state] of Object.entries(manifest?.editorialState ?? {})) {
    if (!VALID_EDITORIAL_STATES.has(state)) failures.push(`Estado editorial inválido para ${area}: ${state}.`);
  }
  for (const area of ['reading', 'academic-writing', 'general-training', 'listening', 'speaking']) {
    if (!manifest?.editorialState?.[area]) failures.push(`Falta el estado editorial de ${area}.`);
  }

  const stateGroups = {
    assetPresentUnverified: validateUniqueIntegerSet(
      manifest?.listeningSets?.assetPresentUnverified,
      'listeningSets.assetPresentUnverified',
      failures,
    ),
    assetMissingBlocked: validateUniqueIntegerSet(
      manifest?.listeningSets?.assetMissingBlocked,
      'listeningSets.assetMissingBlocked',
      failures,
    ),
    published: validateUniqueIntegerSet(manifest?.listeningSets?.published, 'listeningSets.published', failures),
  };
  const seenSets = new Map();
  for (const [state, values] of Object.entries(stateGroups)) {
    for (const setNumber of values) {
      if (seenSets.has(setNumber)) failures.push(`IELTS set ${setNumber} aparece en ${seenSets.get(setNumber)} y ${state}.`);
      seenSets.set(setNumber, state);
    }
  }
  for (let setNumber = 1; setNumber <= (minimums.registeredMocks ?? 0); setNumber += 1) {
    if (!seenSets.has(setNumber)) failures.push(`IELTS set ${setNumber} no tiene estado editorial de Listening.`);
  }
  if (seenSets.size !== minimums.registeredMocks) {
    failures.push(`Los estados de Listening cubren ${seenSets.size} sets; se esperaban ${minimums.registeredMocks}.`);
  }
  const setsWithAssets = stateGroups.assetPresentUnverified.length + stateGroups.published.length;
  if (setsWithAssets !== minimums.physicalListeningAudioSets) {
    failures.push(`Hay ${setsWithAssets} sets declarados con audio; el mínimo registrado es ${minimums.physicalListeningAudioSets}.`);
  }
  if (stateGroups.published.length > 0 && manifest?.editorialState?.listening !== 'published') {
    failures.push('No puede haber sets Listening publicados mientras el área Listening siga bloqueada.');
  }
  for (const [setKey, debt] of Object.entries(manifest?.knownListeningStructureDebt ?? {})) {
    const setNumber = Number(setKey);
    if (!stateGroups.assetPresentUnverified.includes(setNumber)) {
      failures.push(`La deuda estructural del set ${setKey} solo puede existir en assetPresentUnverified.`);
    }
    if (!Array.isArray(debt?.partAnswerSlots) || debt.partAnswerSlots.length !== minimums.listeningPartsPerMock) {
      failures.push(`La deuda estructural del set ${setKey} debe declarar ${minimums.listeningPartsPerMock} partes.`);
      continue;
    }
    const total = debt.partAnswerSlots.reduce((sum, slots) => sum + slots, 0);
    if (total !== minimums.listeningAnswersPerMock) {
      failures.push(`La deuda estructural del set ${setKey} suma ${total}; debe sumar ${minimums.listeningAnswersPerMock}.`);
    }
    if (typeof debt?.reason !== 'string' || debt.reason.trim().length < 20) {
      failures.push(`La deuda estructural del set ${setKey} necesita una razón auditable.`);
    }
  }

  return failures;
}

export function requiredFileAndMarkerFailures(repoRoot, manifest) {
  const failures = [];
  for (const relativePath of manifest.requiredFiles ?? []) {
    if (!fs.existsSync(path.join(repoRoot, relativePath))) failures.push(`Falta el archivo protegido: ${relativePath}`);
  }
  for (const [relativePath, markers] of Object.entries(manifest.requiredMarkers ?? {})) {
    const absolutePath = path.join(repoRoot, relativePath);
    if (!fs.existsSync(absolutePath)) {
      failures.push(`Falta el archivo con marcadores protegidos: ${relativePath}`);
      continue;
    }
    const source = fs.readFileSync(absolutePath, 'utf8');
    for (const marker of markers) {
      if (!source.includes(marker)) failures.push(`${relativePath} perdió el marcador: ${marker}`);
    }
  }
  return failures;
}

export function countQuestionSlots(question) {
  if (Array.isArray(question?.qRange) && question.qRange.length === 2) {
    const [start, end] = question.qRange;
    if (!Number.isInteger(start) || !Number.isInteger(end) || end < start) return Number.NaN;
    return end - start + 1;
  }
  return 1;
}

export function validateListeningMock(mock, setNumber, minimums, options = {}) {
  const failures = [];
  const label = `IELTS set ${setNumber}`;
  if (mock?.id !== `set-${setNumber}`) failures.push(`${label} tiene id ${mock?.id ?? '<ausente>'}.`);
  if (mock?.examSlug !== 'ielts') failures.push(`${label} perdió examSlug=ielts.`);
  const sections = (mock?.sections ?? []).filter((section) => section.skill === 'listening');
  if (sections.length !== minimums.listeningPartsPerMock) {
    failures.push(`${label} tiene ${sections.length} secciones Listening; se esperaban ${minimums.listeningPartsPerMock}.`);
  }

  const expectedParts = Array.from({ length: minimums.listeningPartsPerMock }, (_, index) => index + 1);
  const actualParts = sections.map((section) => section.part).sort((a, b) => a - b);
  if (JSON.stringify(actualParts) !== JSON.stringify(expectedParts)) {
    failures.push(`${label} debe conservar las partes ${expectedParts.join(', ')}; tiene ${actualParts.join(', ')}.`);
  }

  const questionIds = [];
  let totalSlots = 0;
  const actualPartSlots = [];
  for (const section of sections) {
    const sectionSlots = (section.questions ?? []).reduce((sum, question) => sum + countQuestionSlots(question), 0);
    actualPartSlots.push(sectionSlots);
    if (!Number.isFinite(sectionSlots)) failures.push(`${label}, parte ${section.part}, contiene un qRange inválido.`);
    const expectedSectionSlots = options.expectedPartSlots?.[section.part - 1] ?? 10;
    if (sectionSlots !== expectedSectionSlots) {
      failures.push(`${label}, parte ${section.part}, cubre ${sectionSlots} respuestas; debe cubrir ${expectedSectionSlots}.`);
    }
    totalSlots += sectionSlots;
    if (typeof section.transcript !== 'string' || section.transcript.trim().length < 100) {
      failures.push(`${label}, parte ${section.part}, no conserva una transcripción auditable.`);
    }
    const expectedAudio = `/audio/ielts/ielts-listening-set-${setNumber}.mp3`;
    if (section.audioUrl !== expectedAudio) {
      failures.push(`${label}, parte ${section.part}, referencia ${section.audioUrl ?? '<sin audio>'}; se esperaba ${expectedAudio}.`);
    }
    for (const question of section.questions ?? []) questionIds.push(question.id);
  }
  if (totalSlots !== minimums.listeningAnswersPerMock) {
    failures.push(`${label} cubre ${totalSlots} respuestas Listening; se esperaban ${minimums.listeningAnswersPerMock}.`);
  }
  if (new Set(questionIds).size !== questionIds.length) failures.push(`${label} contiene IDs de pregunta Listening duplicados.`);

  if (options.expectedPartSlots && JSON.stringify(actualPartSlots) !== JSON.stringify(options.expectedPartSlots)) {
    failures.push(`${label} ya no coincide con su deuda estructural declarada ${options.expectedPartSlots.join('/')}.`);
  }

  return failures;
}

export function extractDocumentedIeltsRoutes(source) {
  return [...source.matchAll(/`(\/practica\/ielts[^`]*)`/g)].map((match) => match[1]);
}

export function validateRouteInventory(routeMapSource, sitemapSource, manifest) {
  const failures = [];
  const inventory = manifest.routeInventory;
  const documented = new Set(extractDocumentedIeltsRoutes(routeMapSource));
  const canonicalDocumented = new Set([...documented].filter((route) => !route.includes('?')));
  if (canonicalDocumented.size < inventory.documentedCanonicalFloor) {
    failures.push(`El mapa documenta ${canonicalDocumented.size} rutas canónicas IELTS; el piso es ${inventory.documentedCanonicalFloor}.`);
  }
  for (const route of inventory.noindexQueryRoutes) {
    if (!documented.has(route)) failures.push(`El mapa perdió la ruta noindex controlada: ${route}.`);
  }
  for (const route of inventory.knownSitemapOnlyRoutes) {
    if (documented.has(route)) failures.push(`${route} ya está documentada: debe salir de knownSitemapOnlyRoutes al integrar el mapa.`);
    if (route.endsWith('/mixed-practice')) {
      if (!sitemapSource.includes('`${BASE}/practica/ielts/reading/mixed-practice`')) {
        failures.push('El sitemap perdió IELTS Reading mixed-practice.');
      }
      continue;
    }
    const slug = route.split('/').at(-1);
    if (!sitemapSource.includes(`'${slug}'`) || !sitemapSource.includes('/linking-language/${f}')) {
      failures.push(`El sitemap no demuestra la ruta dinámica ${route}.`);
    }
  }
  const totalCanonical = canonicalDocumented.size + inventory.knownSitemapOnlyRoutes.length;
  if (totalCanonical < manifest.minimums.canonicalRoutes) {
    failures.push(`El inventario suma ${totalCanonical} rutas canónicas IELTS; el mínimo es ${manifest.minimums.canonicalRoutes}.`);
  }
  if (sitemapSource.includes('/examenes/ielts/practica/set-')) {
    failures.push('Las sesiones completas IELTS noindex no pueden entrar al sitemap.');
  }
  return failures;
}

function normalizeRepoPath(filePath) {
  return filePath.replaceAll('\\', '/').replace(/^\.\//, '');
}

export function findScopeViolations(paths, manifest, options = {}) {
  const failures = [];
  const normalized = [...new Set(paths.map(normalizeRepoPath).filter(Boolean))];
  for (const filePath of normalized) {
    if ((manifest.forbiddenScopePrefixes ?? []).some((prefix) => filePath.startsWith(prefix))) {
      failures.push(`${filePath}: el alcance IELTS no puede modificar TOEFL.`);
    }
    if (!options.allowSharedIntegration && (manifest.sharedFilesDeferredUntilIntegration ?? []).includes(filePath)) {
      failures.push(`${filePath}: archivo compartido diferido hasta la integración coordinada con TOEFL.`);
    }
  }
  return failures;
}

export function countIeltsPodcastEntries(source) {
  return [...source.matchAll(/examSlug:\s*'ielts',/g)].length;
}

export function findPublicAnswerKeyPaths(value, currentPath = '$', seen = new Set()) {
  if (value === null || typeof value !== 'object') return [];
  if (seen.has(value)) return [];
  seen.add(value);
  const leaks = [];
  for (const [key, child] of Object.entries(value)) {
    const childPath = `${currentPath}.${key}`;
    if (key === 'answer' || key === 'answers') leaks.push(childPath);
    leaks.push(...findPublicAnswerKeyPaths(child, childPath, seen));
  }
  return leaks;
}
