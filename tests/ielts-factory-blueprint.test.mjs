import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const blueprint = JSON.parse(fs.readFileSync(path.join(root, 'config/ielts-harness/factory-blueprint.json'), 'utf8'));

test('expansion blueprint covers Sets 21-40 without authorizing audio spend', () => {
  assert.deepEqual(blueprint.currentRange, [1, 20]);
  assert.deepEqual(blueprint.nextRange, [21, 40]);
  assert.equal(blueprint.audioEconomics.generationRequiresExplicitHumanAuthorization, true);
  assert.equal(blueprint.audioEconomics.requireFreshAccountSnapshotBeforeEveryBatch, true);
  assert.ok(blueprint.audioEconomics.contingencyRatio >= 0.2);
});

test('expansion keeps every release gate from the audited twenty-set contract', () => {
  assert.deepEqual(blueprint.referenceContract, {
    listeningParts: 4, listeningQuestions: 40, readingPassages: 3, readingQuestions: 40,
    writingTasks: 2, speakingParts: 3, leadCaptureRequired: true,
    answerSheetBlueprintRequired: true, versionScopedDraftsRequired: true,
  });
  const gates = blueprint.agentStages.map(stage => stage.gate);
  for (const gate of ['STRUCTURE_PASS', 'ACADEMIC_PASS', 'WRITING_PASS', 'SPEAKING_PASS',
    'COST_AUTHORIZED', 'TECH_PASS', 'ASR_PASS', 'UX_PASS', 'RELEASE_READY']) assert.ok(gates.includes(gate));
  assert.equal(blueprint.reusePolicy.neverPublishDirectlyFromArchive, true);
});
