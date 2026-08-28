#!/usr/bin/env node

import { IELTS_GOLDEN_STANDARD_2026 as standard } from '../src/data/mocks/ielts-golden-standard.ts';
import { withIeltsAcademic2026Blueprint } from '../src/data/mocks/ielts-academic-2026.ts';

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

assert(standard.schemaVersion === 1, 'Golden schema version must remain explicit.');
assert(standard.positioning.contentOrigin === 'original-welearn', 'Content origin must be original WeLearn.');
assert(standard.positioning.officialMaterial === false, 'The product must never claim to be official IELTS material.');
assert(standard.positioning.psychometricEquivalenceClaim === false, 'The product must not claim psychometric equivalence.');
assert(standard.positioning.disclosureRequired, 'The simulation disclosure is mandatory.');
assert(Object.values(standard.officialSources).every((url) => url.startsWith('https://ielts.org/')), 'Every normative source must be an official ielts.org URL.');

const format = standard.officialFormat;
assert(format.delivery === 'computer', 'The 2026 delivery reference must be computer.');
assert(format.listening.parts === 4 && format.listening.responsesPerPart === 10 && format.listening.totalResponses === 40, 'Listening must be 4 × 10 = 40.');
assert(format.listening.playbackCount === 1, 'Listening must allow one playback.');
assert(format.reading.sections === 3 && format.reading.totalResponses === 40, 'Reading must be 3 sections / 40 responses.');
assert(format.reading.totalWords[0] === 2150 && format.reading.totalWords[1] === 2750, 'Reading word range must be 2,150–2,750.');
assert(format.writing.tasks === 2 && format.writing.task1.minimumWords === 150 && format.writing.task2.minimumWords === 250, 'Writing must preserve two tasks and 150/250 minimums.');
assert(format.writing.task2.weight === 2, 'Writing Task 2 must carry twice the weight of Task 1.');
assert(format.writing.criteria.length === 4, 'Writing must use four official analytical criteria.');
assert(format.speaking.parts === 3 && format.speaking.criteria.length === 4, 'Speaking must preserve three parts and four criteria.');
assert(format.speaking.part2PreparationSeconds === 60 && format.speaking.part2TalkSeconds[1] === 120, 'Speaking Part 2 must preserve one-minute preparation and up to two-minute talk.');
assert(format.speaking.officialDelivery !== format.speaking.welearnDelivery, 'The Speaking simulation difference must stay explicit.');

const blueprints = [];
for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
  const { default: mock } = await import(`../src/data/mocks/ielts-set-${setNumber}.ts`);
  blueprints.push(withIeltsAcademic2026Blueprint(mock));
}
for (const blueprint of blueprints) {
  const skillContract = Object.fromEntries(blueprint.ieltsAcademic2026Blueprint.sections.map((item) => [item.skill, item]));
  assert(skillContract.listening.targetResponses === format.listening.totalResponses, `${blueprint.id}: Listening target drifted from Golden.`);
  assert(skillContract.reading.targetResponses === format.reading.totalResponses, `${blueprint.id}: Reading target drifted from Golden.`);
  assert(skillContract.writing.targetResponses === format.writing.tasks, `${blueprint.id}: Writing target drifted from Golden.`);
  assert(skillContract.listening.timeLimitSeconds === format.listening.timeLimitSeconds, `${blueprint.id}: Listening timer drifted from Golden.`);
  assert(skillContract.reading.timeLimitSeconds === format.reading.timeLimitSeconds, `${blueprint.id}: Reading timer drifted from Golden.`);
  assert(skillContract.writing.timeLimitSeconds === format.writing.timeLimitSeconds, `${blueprint.id}: Writing timer drifted from Golden.`);
  const listeningPartWords = blueprint.sections.filter((section) => section.skill === 'listening')
    .map((section) => section.transcript.trim().split(/\s+/).filter(Boolean).length);
  assert(listeningPartWords.reduce((sum, count) => sum + count, 0) >= 2800, `${blueprint.id}: Listening script is below the pre-synthesis floor.`);
  assert(listeningPartWords.every((count) => count >= 680 && count <= 760), `${blueprint.id}: Listening part density drifted outside 680–760.`);
}

const set4Blueprint = blueprints[3];
const set5Blueprint = blueprints[4];
assert(set4Blueprint.ieltsAcademic2026Blueprint.listeningMediaStatus === 'legacy-audio-under-review', 'Set 4 must preserve its published master without misclassifying it after timing reassessment.');
assert(set5Blueprint.ieltsAcademic2026Blueprint.listeningMediaStatus !== 'ready-existing', 'Set 5 must not become Golden by bypassing final acceptance.');
assert(standard.welearnInternalGates.listening.scriptsFreezeBeforePaidAudio, 'Paid audio must remain deferred until scripts freeze.');
assert(standard.welearnInternalGates.listening.preSynthesisTimingWordsMinimum === 2800, 'Pre-synthesis scripts must satisfy the calibrated timing-density floor.');
assert(standard.welearnInternalGates.listening.maximumTrailingSilenceSeconds === 5, 'Artificial trailing padding must fail closed.');
assert(standard.welearnInternalGates.scoring.objectiveKeysServerOnly, 'Objective answer keys must remain server-only.');
assert(standard.welearnInternalGates.scoring.overallRequiresAllFourSkills, 'Overall must require L/R/W/S.');
assert(standard.welearnInternalGates.privacy.explicitRecordingConsent, 'Speaking recording consent must be explicit.');

if (failures.length) {
  console.error(`IELTS Golden Standard: BLOCKED (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('✓ IELTS Golden Standard 2026: official rules, WeLearn gates and all 20 reference contracts verified.');
}
