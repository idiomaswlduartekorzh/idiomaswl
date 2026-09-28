import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const REQUIRED_PROMPT_IDS = [
  'goethe-a2-coordinator',
  'goethe-a2-spec-guardian',
  'goethe-a2-listening-author',
  'goethe-a2-reading-author',
  'goethe-a2-productive-author',
  'goethe-a2-key-auditor',
  'goethe-a2-language-auditor',
  'goethe-a2-originality-auditor',
  'goethe-a2-media-director',
  'goethe-a2-audio-planner',
  'goethe-a2-integrator',
  'goethe-a2-ux-reviewer',
  'goethe-a2-release-warden',
];

export function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export const fingerprint = value => createHash('sha256').update(
  typeof value === 'string' || Buffer.isBuffer(value) ? value : stableStringify(value),
).digest('hex');

const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));

export function loadGoetheA2Harness(root) {
  const configRoot = path.join(root, 'config/goethe-a2-harness');
  const blueprint = readJson(path.join(configRoot, 'factory-blueprint.json'));
  const sources = readJson(path.join(configRoot, 'official-sources.json'));
  const ledger = readJson(path.join(configRoot, 'topic-ledger.json'));
  const release = readJson(path.join(root, 'src/data/mocks/goethe-a2-release.json'));
  const schemas = {
    workOrder: readJson(path.join(configRoot, 'work-order.schema.json')),
    candidate: readJson(path.join(configRoot, 'candidate.schema.json')),
    report: readJson(path.join(configRoot, 'report.schema.json')),
  };
  const prompts = Object.fromEntries(REQUIRED_PROMPT_IDS.map(id => {
    const file = path.join(root, '.claude/agents', `${id}.md`);
    return [id, { file, source: fs.readFileSync(file, 'utf8') }];
  }));
  return { root, blueprint, sources, ledger, release, schemas, prompts };
}

function same(actual, expected) {
  return stableStringify(actual) === stableStringify(expected);
}

export function validateGoetheA2Harness(harness) {
  const failures = [];
  const fail = message => failures.push(message);
  const { blueprint, sources, ledger, release, schemas, prompts } = harness;

  if (blueprint.schemaVersion !== 1 || blueprint.examFamily !== 'goethe' || blueprint.level !== 'A2') fail('blueprint: identity must be goethe/A2 schemaVersion 1');
  if (!same(blueprint.targetRange, [1, 10])) fail('blueprint: targetRange must be 1..10');
  const contract = blueprint.officialContract;
  if (contract.parts !== 13 || contract.totalResponses !== 45) fail('blueprint: official contract must declare 13 parts and 45 responses');
  if (contract.skills?.reading?.parts !== 4 || contract.skills.reading.scoredItems !== 20) fail('blueprint: reading must be 4 parts/20 items');
  if (contract.skills?.listening?.parts !== 4 || contract.skills.listening.scoredItems !== 20) fail('blueprint: listening must be 4 parts/20 items');
  if (!same(contract.skills?.listening?.playsByPart, [2, 1, 1, 2])) fail('blueprint: listening play sequence must be 2/1/1/2');
  if (!same(contract.skills?.writing?.wordRanges, [[20, 30], [30, 40]])) fail('blueprint: writing word ranges must be 20-30 and 30-40');
  if (!same(contract.passRules, { totalMinimum: 60, writtenMinimum: 45, writtenMaximum: 75, oralMinimum: 15, oralMaximum: 25 })) fail('blueprint: pass rules drifted');
  if (blueprint.taskContracts?.reading?.length !== 4 || blueprint.taskContracts?.listening?.length !== 4 || blueprint.taskContracts?.writing?.length !== 2 || blueprint.taskContracts?.speaking?.length !== 3) fail('blueprint: task family count drifted');
  if (blueprint.taskContracts?.reading?.[3]?.requiredNoMatchX !== 1) fail('blueprint: Lesen Teil 4 must require exactly one X');
  if (blueprint.visualPolicy?.forbiddenLooks?.every(value => !value.includes('AI')) ?? true) fail('blueprint: visual policy must reject obvious AI photography');
  if (blueprint.audioPolicy?.generationDefault !== 'blocked' || blueprint.audioPolicy?.generationRequiresExplicitHumanAuthorization !== true || blueprint.audioPolicy?.generationNeverPublishes !== true) fail('blueprint: audio must remain blocked and must never auto-publish');
  if (blueprint.originalityPolicy?.copyingOfficialTextAudioOrVisualsForbidden !== true || blueprint.originalityPolicy?.authorCannotApproveOwnWork !== true) fail('blueprint: originality and reviewer separation are mandatory');
  if (Object.values(blueprint.fairnessPolicy ?? {}).length !== 5 || Object.values(blueprint.fairnessPolicy ?? {}).some(value => value !== true)) fail('blueprint: all five fairness guardrails are mandatory');

  const stages = blueprint.agentStages ?? [];
  if (stages.length !== REQUIRED_PROMPT_IDS.length) fail(`blueprint: expected ${REQUIRED_PROMPT_IDS.length} agent stages`);
  const promptIds = stages.map(stage => stage.prompt);
  if (!same([...promptIds].sort(), [...REQUIRED_PROMPT_IDS].sort())) fail('blueprint: agent prompt inventory drifted');
  for (const id of REQUIRED_PROMPT_IDS) {
    const prompt = prompts[id]?.source ?? '';
    if (!prompt.includes(`name: ${id}`)) fail(`${id}: prompt frontmatter name is missing or wrong`);
  }

  if (sources.schemaVersion !== 1 || sources.usage !== 'architecture-and-public-assessment-contract-only') fail('sources: usage boundary is invalid');
  if ((sources.sources ?? []).length < 3 || sources.sources.some(source => !source.url.startsWith('https://www.goethe.de/'))) fail('sources: only complete official Goethe sources are allowed');
  if (sources.copyrightBoundary?.mustCreateOriginal?.length < 6) fail('sources: copyright boundary is incomplete');

  const sets = ledger.sets ?? [];
  if (ledger.targetSets !== 10 || sets.length !== 10 || !same(sets.map(row => row.set), [1,2,3,4,5,6,7,8,9,10])) fail('ledger: must reserve sets 1 through 10 exactly once');
  const domainKeys = sets.flatMap(row => row.domains ?? []).map(value => value.trim().toLowerCase());
  if (new Set(domainKeys).size !== domainKeys.length) fail('ledger: domains must be unique across sets');
  const interactionKeys = sets.map(row => row.interaction?.trim().toLowerCase());
  if (interactionKeys.some(value => !value) || new Set(interactionKeys).size !== interactionKeys.length) fail('ledger: interactions must be non-empty and unique');

  if (release.schemaVersion !== 1 || release.level !== 'A2') fail('release: invalid identity');
  if ((release.sets ?? []).length !== 10 || !same(release.sets.map(row => row.id), Array.from({ length: 10 }, (_, index) => `a2-${index + 1}`))) fail('release: sets a2-1 through a2-10 must be represented in order');
  for (const row of release.sets ?? []) {
    if (row.state !== 'AUDIO_BLOCKED' || row.published || !row.contentReady || !row.visualsReady || row.audioReady || !row.scoringReady || row.humanApproved) fail(`release: ${row.id} must be content/visual/scoring ready, audio blocked, unapproved and unpublished`);
  }

  for (const [name, schema] of Object.entries(schemas)) {
    if (schema.$schema !== 'https://json-schema.org/draft/2020-12/schema' || schema.type !== 'object' || schema.additionalProperties !== false) fail(`schema ${name}: must be a closed draft-2020-12 object`);
  }
  return failures;
}

export function harnessFingerprints(harness) {
  return {
    blueprint: fingerprint(harness.blueprint),
    sources: fingerprint(harness.sources),
    ledger: fingerprint(harness.ledger),
    prompts: fingerprint(Object.fromEntries(Object.entries(harness.prompts).map(([id, prompt]) => [id, prompt.source]))),
    harness: fingerprint({ core: fs.readFileSync(new URL(import.meta.url), 'utf8'), schemas: harness.schemas }),
  };
}

export function createGoetheA2WorkOrder(harness, set, run, baseCommit) {
  if (!Number.isInteger(set) || set < 1 || set > 10) throw new Error('set must be an integer from 1 to 10');
  if (!run || !/^[a-z0-9][a-z0-9-]{0,63}$/i.test(run)) throw new Error('run must be a short alphanumeric slug');
  if (!baseCommit || baseCommit.length < 7) throw new Error('baseCommit is required');
  const topicReservation = harness.ledger.sets.find(row => row.set === set);
  if (!topicReservation) throw new Error(`set ${set} has no topic reservation`);
  return {
    schemaVersion: 1,
    set,
    run,
    baseCommit,
    fingerprints: harnessFingerprints(harness),
    topicReservation,
    requiredStages: harness.blueprint.agentStages.map(stage => stage.id),
    releaseTarget: 'AUDIO_BLOCKED',
  };
}

export function emptyGoetheA2Run(order, blueprint) {
  const reports = Object.fromEntries(blueprint.agentStages.map(stage => [stage.output, null]));
  return {
    order,
    candidate: null,
    reports,
    derivedState: 'NEEDS_DRAFT',
    note: 'Audio generation is outside this scaffold and remains blocked.',
  };
}
