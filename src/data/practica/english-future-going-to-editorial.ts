import { createEnglishEditorialPack, type EnglishEditorialErrorSeed, type EnglishEditorialFinalSeed, type EnglishEditorialGapSeed, type EnglishEditorialMicroSeed, type EnglishEditorialSequenceSeed } from './english-editorial-builder.ts'

const micro: EnglishEditorialMicroSeed[] = [
  { title: 'Supplies for the kitchen', cue: 'a prior plan supported by purchased supplies', segments: ['We bought the supplies because we ', ' the kitchen.'], verb: 'paint', answers: ['are going to paint'], distractors: ['will paint', 'paint', 'are painting'] },
  { title: 'Dark clouds', cue: 'a prediction based on visible evidence', segments: ['Look at those clouds. It ', '.'], verb: 'rain', answers: ['is going to rain'], distractors: ['will rain', 'rains', 'is raining'] },
  { title: 'A declared study plan', cue: 'an intention already decided', segments: ['Mila has decided she ', ' medicine.'], verb: 'study', answers: ['is going to study'], distractors: ['studies', 'will study', 'has studied'] },
  { title: 'The leaning glass', cue: 'an immediate prediction from present evidence', segments: ['That glass is leaning over the edge; it ', '.'], verb: 'fall', answers: ['is going to fall'], distractors: ['will fall', 'falls', 'is falling'] },
  { title: 'Tickets already bought', cue: 'a prior travel plan with evidence', segments: ['They have their tickets, so they ', ' to Lima in July.'], verb: 'fly', answers: ['are going to fly'], distractors: ['will fly', 'fly', 'are flying now'] },
  { title: 'A chosen course', cue: 'an intention formed before speaking', segments: ['I have chosen a course and I ', ' Japanese next term.'], verb: 'learn', answers: ['am going to learn'], distractors: ['will learn', 'learn', 'am learning now'] },
  { title: 'The overflowing bath', cue: 'a prediction from an observable situation', segments: ['Turn off the tap—the bath ', '.'], verb: 'overflow', answers: ['is going to overflow'], distractors: ['will overflow', 'overflows', 'is overflowing already'] },
  { title: 'No renovation this year', cue: 'a prior negative decision', segments: ['The owners decided they ', ' the roof this year.'], verb: 'not replace', answers: ['are not going to replace', "aren't going to replace"], distractors: ['will not replace', 'do not replace', 'are not replacing now'] },
  { title: 'Packed boxes', cue: 'an intention shown by present preparation', segments: ['Nora has packed every box; she ', ' this weekend.'], verb: 'move', answers: ['is going to move'], distractors: ['will move', 'moves', 'is moving now'] },
  { title: 'A rehearsed announcement', cue: 'a planned future action', segments: ['The director has prepared a statement and ', ' it at noon.'], verb: 'read', answers: ['is going to read'], distractors: ['will read', 'reads', 'is reading now'] },
]

const long: EnglishEditorialGapSeed[] = [
  { title: 'Renovating the community hall', instruction: 'Complete the connected prior plans.', segments: ['The council has approved the budget and ', ' the roof. Volunteers ', ' the walls, and a local company ', ' new lights.'], entries: [['replace', ['is going to replace']], ['paint', ['are going to paint']], ['install', ['is going to install']]] },
  { title: 'Evidence of an approaching storm', instruction: 'Complete the connected evidence-based predictions.', segments: ['Those black clouds ', ' the valley. The wind ', ' stronger, and the loose sign ', ' unless someone secures it.'], entries: [['cover', ['are going to cover']], ['become', ['is going to become']], ['fall', ['is going to fall']]] },
  { title: 'Planning a school podcast', instruction: 'Complete the connected intentions already decided.', segments: ['Our class ', ' a weekly podcast. Marta ', ' the interviews, and I ', ' the sound.'], entries: [['produce', ['is going to produce']], ['conduct', ['is going to conduct']], ['edit', ['am going to edit']]] },
  { title: 'The family’s summer plan', instruction: 'Complete the connected prior arrangements.', segments: ['We have rented a cabin and ', ' near the lake. Dad ', ' the bicycles, and the children ', ' swimming lessons.'], entries: [['stay', ['are going to stay']], ['bring', ['is going to bring']], ['take', ['are going to take']]] },
  { title: 'A dangerous stack of boxes', instruction: 'Complete the predictions from visible evidence.', segments: ['The top box ', '. Those books ', ' onto the floor, and the glass frame ', ' if nobody moves it.'], entries: [['slide', ['is going to slide']], ['fall', ['are going to fall']], ['break', ['is going to break']]] },
  { title: 'Launching the new service', instruction: 'Complete the connected company intentions.', segments: ['The company ', ' a support portal in May. Engineers ', ' it with current accounts, and trainers ', ' staff before launch.'], entries: [['launch', ['is going to launch']], ['integrate', ['are going to integrate']], ['prepare', ['are going to prepare']]] },
  { title: 'Plans after graduation', instruction: 'Complete the decisions already made.', segments: ['Leo ', ' for a research internship. His sister ', ' abroad, and their friend Nina ', ' a small business.'], entries: [['apply', ['is going to apply']], ['study', ['is going to study']], ['start', ['is going to start']]] },
  { title: 'Preparing the charity dinner', instruction: 'Complete the connected prior plans.', segments: ['We ', ' eighty guests. A restaurant ', ' the main course, and local musicians ', ' after dinner.'], entries: [['invite', ['are going to invite']], ['provide', ['is going to provide']], ['perform', ['are going to perform']]] },
  { title: 'Signs of a traffic jam', instruction: 'Complete the evidence-based predictions.', segments: ['Cars are already backing up. The queue ', ' the bridge, buses ', ' delays, and commuters ', ' the next train.'], entries: [['reach', ['is going to reach']], ['experience', ['are going to experience']], ['miss', ['are going to miss']]] },
  { title: 'The weekend garden project', instruction: 'Complete the intentions supported by preparation.', segments: ['I bought new soil and ', ' the herb bed. Maya ', ' the fence, and we ', ' a rain barrel.'], entries: [['expand', ['am going to expand']], ['repair', ['is going to repair']], ['add', ['are going to add']]] },
]

const errors: EnglishEditorialErrorSeed[] = [
  { title: 'Hall renovation', pieces: [['The council ', 'is going replace'], [' the roof. Volunteers ', 'are going to paint'], [' walls, and a company ', 'is going to install']], after: ' lights.', wrong: 0, answers: ['is going to replace'], reason: 'the structure requires be going to plus the base verb' },
  { title: 'Storm evidence', pieces: [['Clouds ', 'are going to cover'], [' the valley. The wind ', 'is going become'], [' stronger, and the sign ', 'is going to fall']], after: '.', wrong: 1, answers: ['is going to become'], reason: 'the structure requires going to before become' },
  { title: 'Podcast plan', pieces: [['Our class ', 'is going to produce'], [' a podcast. Marta ', 'is going to conduct'], [' interviews, and I ', 'is going to edit']], after: ' sound.', wrong: 2, answers: ['am going to edit'], reason: 'the subject I requires am going to edit' },
  { title: 'Summer plan', pieces: [['We ', 'is going to stay'], [' by the lake. Dad ', 'is going to bring'], [' bicycles, and the children ', 'are going to take']], after: ' lessons.', wrong: 0, answers: ['are going to stay'], reason: 'the subject we requires are going to stay' },
  { title: 'Falling boxes', pieces: [['The top box ', 'is going to slide'], ['. Those books ', 'is going to fall'], [' and the frame ', 'is going to break']], after: '.', wrong: 1, answers: ['are going to fall'], reason: 'the plural subject books requires are going to fall' },
  { title: 'Service launch', pieces: [['The company ', 'is going to launch'], [' a portal. Engineers ', 'are going to integrate'], [' it, and trainers ', 'is going to prepare']], after: ' staff.', wrong: 2, answers: ['are going to prepare'], reason: 'the plural subject trainers requires are going to prepare' },
  { title: 'Graduation plans', pieces: [['Leo ', 'are going to apply'], [' for an internship. His sister ', 'is going to study'], [' abroad, and Nina ', 'is going to start']], after: ' a business.', wrong: 0, answers: ['is going to apply'], reason: 'the singular subject Leo requires is going to apply' },
  { title: 'Charity dinner', pieces: [['We ', 'are going to invite'], [' guests. A restaurant ', 'are going to provide'], [' dinner, and musicians ', 'are going to perform']], after: '.', wrong: 1, answers: ['is going to provide'], reason: 'the singular subject restaurant requires is going to provide' },
  { title: 'Traffic signs', pieces: [['The queue ', 'is going to reach'], [' the bridge. Buses ', 'are going to experience'], [' delays, and commuters ', 'is going to miss']], after: ' trains.', wrong: 2, answers: ['are going to miss'], reason: 'the plural subject commuters requires are going to miss' },
  { title: 'Garden project', pieces: [['I ', 'is going to expand'], [' the bed. Maya ', 'is going to repair'], [' the fence, and we ', 'are going to add']], after: ' a barrel.', wrong: 0, answers: ['am going to expand'], reason: 'the subject I requires am going to expand' },
]

const sequences: EnglishEditorialSequenceSeed[] = [
  { events: ['The council is going to replace the roof', 'Volunteers are going to paint the walls', 'A company is going to install lights'], target: 0 },
  { events: ['Clouds are going to cover the valley', 'The wind is going to strengthen', 'The sign is going to fall'], target: 1 },
  { events: ['Our class is going to produce a podcast', 'Marta is going to conduct interviews', 'I am going to edit the sound'], target: 2 },
  { events: ['We are going to stay by the lake', 'Dad is going to bring bicycles', 'The children are going to take lessons'], target: 0 },
  { events: ['The top box is going to slide', 'The books are going to fall', 'The frame is going to break'], target: 1 },
  { events: ['The company is going to launch a portal', 'Engineers are going to integrate it', 'Trainers are going to prepare staff'], target: 2 },
  { events: ['Leo is going to apply', 'His sister is going to study abroad', 'Nina is going to start a business'], target: 0 },
  { events: ['We are going to invite guests', 'A restaurant is going to provide dinner', 'Musicians are going to perform'], target: 1 },
  { events: ['The queue is going to reach the bridge', 'Buses are going to experience delays', 'Commuters are going to miss trains'], target: 2 },
  { events: ['I am going to expand the bed', 'Maya is going to repair the fence', 'We are going to add a barrel'], target: 0 },
]

const final: EnglishEditorialFinalSeed[] = [
  { before: 'We have signed the lease and ', after: ' offices next month.', answer: 'are going to move', distractors: ['will move', 'move', 'are moving now'] },
  { before: 'Watch that cyclist—he ', after: ' the open gate.', answer: 'is going to hit', distractors: ['will hit', 'hits', 'is hitting already'] },
  { before: 'Nora has chosen her topic and ', after: ' urban transport.', answer: 'is going to research', distractors: ['will research', 'researches', 'is researching now'] },
  { before: 'The shelf is bending; it ', after: ' under that weight.', answer: 'is going to collapse', distractors: ['will collapse', 'collapses', 'is collapsing already'] },
  { before: 'They bought camping equipment because they ', after: ' in the national park.', answer: 'are going to stay', distractors: ['will stay', 'stay', 'are staying now'] },
  { before: 'I have made my decision: I ', after: ' the evening course.', answer: 'am going to join', distractors: ['will join', 'join', 'am joining now'] },
  { before: 'The pan is smoking. The oil ', after: ' if you do not lower the heat.', answer: 'is going to burn', distractors: ['will burn', 'burns', 'is burning already'] },
  { before: 'The board decided it ', after: ' the branch this year.', answer: 'is not going to close', distractors: ['will not close', 'does not close', 'is not closing now'] },
  { before: 'Mina has laid out her tools; she ', after: ' the bicycle this afternoon.', answer: 'is going to repair', distractors: ['will repair', 'repairs', 'is repairing now'] },
  { before: 'The team has rehearsed the announcement and ', after: ' it after lunch.', answer: 'is going to record', distractors: ['will record', 'records', 'is recording now'] },
]

export const ENGLISH_FUTURE_GOING_TO_EDITORIAL = createEnglishEditorialPack({ slug: 'future-going-to', form: 'future-going-to', focus: 'Be going to', rule: 'Use be going to for an intention decided before speaking or a prediction grounded in present evidence.', micro, long, errors, sequences, final, choicePositions: [0, 3, 2, 1, 0, 3, 2, 1, 0, 3] })
