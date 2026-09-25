import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const stableStringify = value => {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
};

export const fingerprintGoldenCandidate = candidate => createHash('sha256')
  .update(stableStringify(candidate))
  .digest('hex');

export function buildGoetheA2Candidate(golden) {
  const set = Number(golden.id.split('-')[1]);
  const unsigned = {
    schemaVersion: 1,
    set,
    levelProfile: golden.levelProfile,
    reading: golden.reading.parts,
    listening: golden.listening.parts,
    writing: golden.writing.tasks,
    speaking: golden.speaking.tasks,
    scoring: golden.scoring,
    media: golden.media,
    provenance: { originalWeLearn: true, officialSourcesUsedForArchitectureOnly: true },
  };
  return { ...unsigned, candidateFingerprint: fingerprintGoldenCandidate(unsigned) };
}

export const buildGoldenCandidate = buildGoetheA2Candidate;

export function buildGoetheA2AudioPlan(golden, candidateFingerprint) {
  const set = Number(golden.id.split('-')[1]);
  return {
    schemaVersion: 1,
    set,
    candidateFingerprint,
    status: 'script-ready-audio-blocked',
    provider: 'ElevenLabs',
    generation: { requiresFreshCreditSnapshot: true, requiresExplicitHumanAuthorization: true, publishesAutomatically: false },
    technical: { format: 'mp3 mono 44.1 kHz 64 kbps', targetLufs: -18, targetMinutes: golden.listening.masterTrack.targetMinutes },
    master: {
      path: golden.listening.masterTrack.path,
      containsSpokenInstructions: true,
      containsExamples: true,
      containsPauses: true,
      containsTransferWindow: true,
      navigation: { pause: false, seek: false, replay: false },
    },
    voices: [
      { id: 'announcer', profile: 'adult female, clear standard German, neutral examination delivery' },
      { id: 'adult-f-1', profile: 'adult female, natural everyday German' },
      { id: 'adult-f-2', profile: 'adult female, distinct from announcer' },
      { id: 'adult-m-1', profile: 'adult male, natural everyday German' },
      { id: 'adult-m-2', profile: 'adult male, distinct from adult-m-1' },
    ],
    sequence: golden.listening.parts.map(part => ({
      part: part.part,
      family: part.family,
      plays: part.plays,
      instruction: part.part === 1
        ? 'Sie hören fünf kurze Texte. Sie hören jeden Text zweimal.'
        : part.part === 2
          ? 'Sie hören ein Gespräch einmal. Ordnen Sie die Bilder zu.'
          : part.part === 3
            ? 'Sie hören fünf kurze Gespräche einmal. Wählen Sie das richtige Bild.'
            : 'Sie hören ein Radiointerview zweimal. Wählen Sie Ja oder Nein.',
      scripts: part.part === 1 || part.part === 3
        ? part.items.map(item => ({ id: item.id, turns: item.turns ?? [] }))
        : [{ id: part.part === 2 ? `g-a2-${set}-h2-conversation` : `g-a2-${set}-h4-interview`, turns: part.turns }],
    })),
    outro: 'Ende des Tests Hören. Sie haben jetzt fünf Minuten Zeit, Ihre Lösungen zu übertragen und zu kontrollieren.',
  };
}

export const buildGoldenAudioPlan = buildGoetheA2AudioPlan;

const wordCount = text => text.trim().split(/\s+/u).filter(Boolean).length;

export function validateGoetheA2Set(golden, root) {
  const failures = [];
  const fail = message => failures.push(message);
  if (golden.schemaVersion !== 1 || !/^a2-(?:[1-9]|10)$/.test(golden.id) || golden.status !== 'AUDIO_BLOCKED') fail('identity/status must be schema 1, a2-1..a2-10 and AUDIO_BLOCKED');
  if (golden.authorship?.original !== true || golden.authorship?.officialSourcesUsedForArchitectureOnly !== true) fail('authorship boundary is missing');
  if (golden.reading?.parts?.length !== 4 || golden.listening?.parts?.length !== 4 || golden.writing?.tasks?.length !== 2 || golden.speaking?.tasks?.length !== 3) fail('the golden set must contain 4/4/2/3 task families');

  const readingCounts = golden.reading.parts.map(part => part.items?.length ?? part.profiles?.length ?? 0);
  const listeningCounts = golden.listening.parts.map(part => part.items?.length ?? 0);
  if (readingCounts.join('/') !== '5/5/5/5') fail(`reading item shape drifted: ${readingCounts.join('/')}`);
  if (listeningCounts.join('/') !== '5/5/5/5') fail(`listening item shape drifted: ${listeningCounts.join('/')}`);
  if (golden.listening.parts.map(part => part.plays).join('/') !== '2/1/1/2') fail('listening repetitions must remain 2/1/1/2');

  if (!golden.reading.parts[0].example || !golden.reading.parts[1].example) fail('Lesen Teil 1 and 2 require a worked example 0');
  const readingStimulusRanges = [[193, 230], [118, 210], [250, 280]];
  golden.reading.parts.slice(0, 3).forEach((part, index) => {
    const count = wordCount(part.text);
    const [minimum, maximum] = readingStimulusRanges[index];
    if (count < minimum || count > maximum) fail(`Lesen Teil ${index + 1}: stimulus has ${count} words; expected ${minimum}-${maximum}`);
  });

  const choices = [
    ...golden.reading.parts.slice(0, 3).flatMap(part => part.items),
    ...golden.listening.parts.filter(part => part.part === 1 || part.part === 3).flatMap(part => part.items),
  ];
  for (const item of choices) {
    if (item.options.length !== 3 || !Number.isInteger(item.answer) || item.answer < 0 || item.answer > 2) fail(`${item.id}: must be a keyed three-option item`);
    if (!item.rationale || item.distractorRationales.length !== 3) fail(`${item.id}: answer and distractor rationales are required`);
  }
  const readingPositions = [0, 1, 2].map(position => golden.reading.parts.slice(0, 3).flatMap(part => part.items).filter(item => item.answer === position).length);
  if (readingPositions.join('/') !== '5/5/5') fail(`reading answer positions must remain balanced 5/5/5, got ${readingPositions.join('/')}`);
  const listeningPositions = [0, 1, 2].map(position => [golden.listening.parts[0], golden.listening.parts[2]].flatMap(part => part.items).filter(item => item.answer === position).length);
  if ([...listeningPositions].sort((a, b) => a - b).join('/') !== '3/3/4') fail(`listening A/B/C positions must remain near-balanced, got ${listeningPositions.join('/')}`);
  const ids = [
    ...choices.map(item => item.id),
    ...golden.reading.parts[3].profiles.map(item => item.id),
    ...golden.listening.parts[1].items.map(item => item.id),
    ...golden.listening.parts[3].items.map(item => item.id),
  ];
  if (new Set(ids).size !== ids.length) fail('objective item ids must be unique');

  const reading4 = golden.reading.parts[3];
  if (reading4.profiles.filter(profile => profile.answer === 'X').length !== 1) fail('Lesen Teil 4 needs exactly one X response');
  const usedAds = new Set([reading4.example.answer, ...reading4.profiles.map(profile => profile.answer).filter(answer => answer !== 'X')]);
  if (usedAds.size !== 5) fail('Lesen Teil 4 must use the example plus four different advertisements');
  if (reading4.adverts.filter(ad => !usedAds.has(ad.letter)).length !== 1) fail('Lesen Teil 4 needs exactly one unused advertisement');
  for (const advert of reading4.adverts) {
    const count = wordCount(`${advert.heading} ${advert.text}`);
    if (count < 30 || count > 45) fail(`Lesen Teil 4 advert ${advert.letter}: ${count} words; expected 30-45`);
  }

  const listening2 = golden.listening.parts[1];
  if (!listening2.example || listening2.options.length !== 9) fail('Hören Teil 2 requires example 0 and nine visual options');
  const listening2Used = new Set([listening2.example.answer, ...listening2.items.map(item => item.answer)]);
  if (listening2Used.size !== 6 || listening2.options.filter(option => !listening2Used.has(option.letter)).length !== 3) fail('Hören Teil 2 requires one consumed example, five unique scored answers and three distractors');
  if (!golden.listening.parts[3].example) fail('Hören Teil 4 requires a worked example 0');
  const h1Counts = golden.listening.parts[0].items.map(item => wordCount(item.turns.map(turn => turn.text).join(' ')));
  h1Counts.forEach((count, index) => { if (count < 45 || count > 70) fail(`Hören Teil 1 item ${index + 1}: ${count} words; expected 45-70`); });
  const h2Count = wordCount(listening2.turns.map(turn => turn.text).join(' '));
  if (h2Count < 220 || h2Count > 260) fail(`Hören Teil 2: ${h2Count} words; expected 220-260`);
  const h3Counts = golden.listening.parts[2].items.map(item => wordCount(item.turns.map(turn => turn.text).join(' ')));
  h3Counts.forEach((count, index) => { if (count < 43 || count > 70) fail(`Hören Teil 3 item ${index + 11}: ${count} words; expected 43-70`); });
  const h3Total = h3Counts.reduce((total, count) => total + count, 0);
  if (h3Total < 280 || h3Total > 310) fail(`Hören Teil 3: ${h3Total} total words; expected 280-310`);
  const h4Count = wordCount(golden.listening.parts[3].turns.map(turn => turn.text).join(' '));
  if (h4Count < 190 || h4Count > 230) fail(`Hören Teil 4: ${h4Count} words; expected 190-230`);

  const ranges = [[20, 30], [30, 40]];
  golden.writing.tasks.forEach((task, index) => {
    if (task.functions.length !== 3) fail(`writing task ${index + 1}: exactly three functions are required`);
    if (task.minWords !== ranges[index][0] || task.maxWords !== ranges[index][1]) fail(`writing task ${index + 1}: word range drifted`);
    const count = wordCount(task.modelAnswer);
    if (count < task.minWords || count > task.maxWords) fail(`writing task ${index + 1}: model answer has ${count} words`);
  });
  if (golden.speaking.tasks[0].cards.length !== 4) fail('Sprechen Teil 1 requires one shared pool of four question cards');
  const speaking2 = golden.speaking.tasks[1];
  for (const [candidate, card] of Object.entries({ A: speaking2.candidateA, B: speaking2.candidateB })) {
    if (card.cues.length !== 4 || card.followUps.length < 1 || card.followUps.length > 2) fail(`Sprechen Teil 2 candidate ${candidate} requires four cues and one or two follow-ups`);
  }
  if (speaking2.candidateA.prompt === speaking2.candidateB.prompt) fail('Sprechen Teil 2 requires distinct topics for candidates A and B');
  const writingRubric = golden.scoring.writing.rubric;
  if (writingRubric.pointsPerCriterion.join('/') !== '5/3.5/2/0.5/0' || golden.scoring.writing.rawMaximum !== 20 || golden.scoring.writing.multiplier !== 1.25) fail('writing scoring grid must preserve the official 20 raw points and A-E values');
  const speakingRubric = golden.scoring.speaking.rubric;
  const speakingMaximum = (speakingRubric.part1PointsPerCriterion[0] * 2) + (speakingRubric.part2PointsPerCriterion[0] * 2) + (speakingRubric.part3PointsPerCriterion[0] * 2) + speakingRubric.pronunciationPoints[0];
  if (speakingMaximum !== 25 || golden.scoring.speaking.resultMaximum !== 25) fail(`speaking rubric must total 25 points, got ${speakingMaximum}`);
  if (stableStringify(golden.scoring.pass) !== stableStringify({ totalMinimum: 60, writtenMinimum: 45, writtenMaximum: 75, oralMinimum: 15, oralMaximum: 25 })) fail('pass thresholds drifted');

  if (golden.media?.style !== 'functional-exam-editorial' || golden.media?.photography !== 'none') fail('golden media must use functional exam-editorial vectors without photography');
  for (const asset of golden.media?.assets ?? []) {
    const file = path.join(root, 'public', asset.path.replace(/^\//, ''));
    if (!fs.existsSync(file)) fail(`missing media asset: ${asset.path}`);
    if (!asset.alt.trim()) fail(`missing alt text: ${asset.id}`);
  }
  const masterFile = path.join(root, 'public', golden.listening.masterTrack.path.replace(/^\//, ''));
  if (fs.existsSync(masterFile)) fail('audio must remain absent while the set is AUDIO_BLOCKED');

  const serialized = stableStringify(golden).toLowerCase();
  for (const forbidden of ['ins kino gehen', 'für einen deutschkurs anmelden', 'generic cinema cancellation', 'generic language-course registration']) {
    if (serialized.includes(forbidden)) fail(`forbidden carryover found: ${forbidden}`);
  }
  const comparisonFiles = Array.from({ length: 10 }, (_, index) => path.join(root, 'src/data/mocks', `goethe-a1-set-${index + 1}.ts`)).filter(fs.existsSync);
  const comparisonCorpus = comparisonFiles.map(file => fs.readFileSync(file, 'utf8')).join('\n');
  for (const prompt of choices.map(item => item.prompt).filter(value => value.length >= 28)) {
    if (comparisonCorpus.includes(prompt)) fail(`prompt repeats legacy material exactly: ${prompt}`);
  }
  return failures;
}

export const validateGoldenSet = validateGoetheA2Set;

export function validateGoetheA2Collection(sets, root) {
  const failures = sets.flatMap(set => validateGoetheA2Set(set, root).map(message => `${set.id}: ${message}`));
  const ids = sets.map(set => set.id);
  if (sets.length !== 10 || new Set(ids).size !== 10 || ids.join('/') !== Array.from({ length: 10 }, (_, index) => `a2-${index + 1}`).join('/')) {
    failures.push('collection must contain ordered, unique sets a2-1 through a2-10');
  }
  const domains = sets.flatMap(set => set.levelProfile.lexicalDomains.map(value => value.trim().toLowerCase()));
  if (new Set(domains).size !== domains.length) failures.push('lexical domains must not repeat across the ten sets');
  const stimulusGroups = sets.flatMap(set => [
    ...set.reading.parts.slice(0, 3).map(part => part.text),
    set.listening.parts[1].turns.map(turn => turn.text).join(' '),
    set.listening.parts[3].turns.map(turn => turn.text).join(' '),
    ...set.writing.tasks.map(task => task.situation),
    ...[set.speaking.tasks[1].candidateA.prompt, set.speaking.tasks[1].candidateB.prompt, set.speaking.tasks[2].situation],
  ]).map(value => value.trim().toLowerCase());
  if (new Set(stimulusGroups).size !== stimulusGroups.length) failures.push('full task stimuli must be original across the ten sets');
  const objectiveIds = sets.flatMap(set => [
    ...set.reading.parts.slice(0, 3).flatMap(part => part.items.map(item => item.id)),
    ...set.reading.parts[3].profiles.map(item => item.id),
    ...set.listening.parts.flatMap(part => part.items.map(item => item.id)),
  ]);
  if (new Set(objectiveIds).size !== objectiveIds.length) failures.push('objective ids must be globally unique');
  return failures;
}

export function countMockResponses(mock) {
  return mock.sections.reduce((total, section) => total + section.questions.reduce((subtotal, question) => {
    if (question.type === 'matching') return subtotal + question.items.length;
    return subtotal + 1;
  }, 0), 0);
}
