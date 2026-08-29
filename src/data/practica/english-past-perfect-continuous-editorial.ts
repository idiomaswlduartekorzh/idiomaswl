import { createEnglishEditorialPack, type EnglishEditorialErrorSeed, type EnglishEditorialFinalSeed, type EnglishEditorialGapSeed, type EnglishEditorialMicroSeed, type EnglishEditorialSequenceSeed } from './english-editorial-builder.ts'

const micro: EnglishEditorialMicroSeed[] = [
  { title: 'Waiting before the doctor arrived', cue: 'duration continuing up to a past event', segments: ['They ', ' for an hour when the doctor arrived.'], verb: 'wait', answers: ['had been waiting'], distractors: ['waited', 'were waiting', 'have been waiting'] },
  { title: 'Why the road was wet', cue: 'an earlier ongoing cause of past evidence', segments: ['The road was wet because it ', '.'], verb: 'rain', answers: ['had been raining'], distractors: ['rained', 'was raining', 'has been raining'] },
  { title: 'Years before a job change', cue: 'duration up to a past change', segments: ['I ', ' there for years before I changed jobs.'], verb: 'work', answers: ['had been working'], distractors: ['worked', 'was working', 'have worked'] },
  { title: 'Tired after the hike', cue: 'a prior extended activity explaining a past state', segments: ['Maya was exhausted because she ', ' since dawn.'], verb: 'hike', answers: ['had been hiking'], distractors: ['hiked', 'was hiking', 'has been hiking'] },
  { title: 'Practice before the audition', cue: 'repeated preparation up to a past event', segments: ['Leo ', ' daily for months before the audition.'], verb: 'practice', answers: ['had been practicing', 'had been practising'], distractors: ['practiced', 'was practicing', 'has been practicing'] },
  { title: 'Calls before the reply', cue: 'repeated attempts before a past response', segments: ['We ', ' all morning before someone answered.'], verb: 'call', answers: ['had been calling'], distractors: ['called', 'were calling', 'have been calling'] },
  { title: 'A noisy machine', cue: 'an ongoing earlier cause discovered later', segments: ['The machine failed after it ', ' strange noises for days.'], verb: 'make', answers: ['had been making'], distractors: ['made', 'was making', 'has been making'] },
  { title: 'Training before the injury', cue: 'an activity continuing until a past interruption', segments: ['The team ', ' for two hours when the captain was injured.'], verb: 'train', answers: ['had been training'], distractors: ['trained', 'was training', 'has been training'] },
  { title: 'No sleep before sunrise', cue: 'a negative ongoing situation up to a past point', segments: ['By sunrise, I ', ' well for several nights.'], verb: 'not sleep', answers: ['had not been sleeping', "hadn't been sleeping"], distractors: ['did not sleep', 'was not sleeping', 'have not been sleeping'] },
  { title: 'Studying before the exam', cue: 'duration of an activity before a past result', segments: ['They passed because they ', ' together since January.'], verb: 'study', answers: ['had been studying'], distractors: ['studied', 'were studying', 'have been studying'] },
]

const long: EnglishEditorialGapSeed[] = [
  { title: 'Before the rescue boat arrived', instruction: 'Complete the ongoing activities up to the rescue.', segments: ['The sailors ', ' water from the deck for an hour. One passenger ', ' for help, and the radio operator ', ' the emergency signal when the rescue boat arrived.'], entries: [['remove', ['had been removing']], ['wave', ['had been waving']], ['repeat', ['had been repeating']]] },
  { title: 'A long night at the hospital', instruction: 'Complete the ongoing work before dawn.', segments: ['Doctors ', ' patients since midnight. Nurses ', ' between two wards, and the laboratory ', ' urgent samples when dawn came.'], entries: [['treat', ['had been treating']], ['move', ['had been moving']], ['process', ['had been processing']]] },
  { title: 'Why the garden was flooded', instruction: 'Complete the earlier ongoing causes.', segments: ['Rain ', ' for hours. Water ', ' from a blocked drain, and the river ', ' steadily before it crossed the path.'], entries: [['fall', ['had been falling']], ['spill', ['had been spilling']], ['rise', ['had been rising']]] },
  { title: 'Preparing for opening night', instruction: 'Complete the preparation leading to the premiere.', segments: ['Actors ', ' for six weeks. The director ', ' every transition, and designers ', ' the final costumes before opening night.'], entries: [['rehearse', ['had been rehearsing']], ['refine', ['had been refining']], ['adjust', ['had been adjusting']]] },
  { title: 'The delayed research report', instruction: 'Complete the work continuing before the deadline.', segments: ['Our team ', ' new data all month. An analyst ', ' the results, and I ', ' the methods section when the deadline changed.'], entries: [['collect', ['had been collecting']], ['verify', ['had been verifying']], ['rewrite', ['had been rewriting']]] },
  { title: 'A tired search team', instruction: 'Complete the search continuing until the dog was found.', segments: ['Volunteers ', ' the forest since afternoon. Police ', ' nearby roads, and a pilot ', ' above the valley when the dog was found.'], entries: [['search', ['had been searching']], ['patrol', ['had been patrolling']], ['circle', ['had been circling']]] },
  { title: 'Before the server crashed', instruction: 'Complete the ongoing technical symptoms.', segments: ['Users ', ' slow pages all day. The database ', ' memory, and engineers ', ' warning logs before the server crashed.'], entries: [['report', ['had been reporting']], ['consume', ['had been consuming']], ['monitor', ['had been monitoring']]] },
  { title: 'Training for the final', instruction: 'Complete the preparation up to the match.', segments: ['The players ', ' before sunrise for months. Their coach ', ' new formations, and the goalkeeper ', ' penalties before the final began.'], entries: [['run', ['had been running']], ['test', ['had been testing']], ['practice', ['had been practicing', 'had been practising']]] },
  { title: 'The dusty archive room', instruction: 'Complete the activities causing the past evidence.', segments: ['Researchers ', ' old boxes all morning. One assistant ', ' shelves, and another ', ' damaged papers, so everyone’s clothes were dusty.'], entries: [['open', ['had been opening']], ['move', ['had been moving']], ['sort', ['had been sorting']]] },
  { title: 'Before the family moved', instruction: 'Complete the ongoing preparations before moving day.', segments: ['The family ', ' belongings for two weeks. Ana ', ' unwanted furniture, and her brother ', ' every box before the truck arrived.'], entries: [['pack', ['had been packing']], ['sell', ['had been selling']], ['label', ['had been labeling', 'had been labelling']]] },
]

const errors: EnglishEditorialErrorSeed[] = [
  { title: 'Waiting for rescue', pieces: [['Sailors ', 'had been removing'], [' water. A passenger ', 'had waving'], [' and the operator ', 'had been repeating']], after: ' the signal when rescue arrived.', wrong: 1, answers: ['had been waving'], reason: 'the continuous form requires had been waving' },
  { title: 'Hospital night', pieces: [['Doctors ', 'had been treating'], [' patients. Nurses ', 'had moving'], [' between wards, and the lab ', 'had been processing']], after: ' samples before dawn.', wrong: 1, answers: ['had been moving'], reason: 'the continuous form requires had been moving' },
  { title: 'Flooded garden', pieces: [['Rain ', 'had been falling'], ['. Water ', 'had been spilling'], [' from a drain, and the river ', 'had been rose']], after: ' before it crossed the path.', wrong: 2, answers: ['had been rising'], reason: 'been is followed by the -ing form rising' },
  { title: 'Opening night', pieces: [['Actors ', 'had been rehearsing'], [' for weeks. The director ', 'had been refining'], [' transitions, and designers ', 'had adjusting']], after: ' costumes before opening night.', wrong: 2, answers: ['had been adjusting'], reason: 'the continuous form requires had been adjusting' },
  { title: 'Research deadline', pieces: [['We ', 'had been collecting'], [' data. An analyst ', 'had verifying'], [' results, and I ', 'had been rewriting']], after: ' methods when the deadline changed.', wrong: 1, answers: ['had been verifying'], reason: 'the continuous form requires had been verifying' },
  { title: 'Forest search', pieces: [['Volunteers ', 'had been searching'], ['. Police ', 'had been patrolling'], [' roads, and a pilot ', 'had been circled']], after: ' the valley when the dog was found.', wrong: 2, answers: ['had been circling'], reason: 'been is followed by the -ing form circling' },
  { title: 'Server warnings', pieces: [['Users ', 'had reporting'], [' delays. The database ', 'had been consuming'], [' memory, and engineers ', 'had been monitoring']], after: ' logs before the server crashed.', wrong: 0, answers: ['had been reporting'], reason: 'the continuous form requires had been reporting' },
  { title: 'Final training', pieces: [['Players ', 'had been running'], [' daily. The coach ', 'had testing'], [' formations, and the goalkeeper ', 'had been practicing']], after: ' penalties before the final began.', wrong: 1, answers: ['had been testing'], reason: 'the continuous form requires had been testing' },
  { title: 'Archive dust', pieces: [['Researchers ', 'had been opening'], [' boxes. An assistant ', 'had been moving'], [' shelves, and another ', 'had been sorted']], after: ' papers before the room closed.', wrong: 2, answers: ['had been sorting'], reason: 'been is followed by the -ing form sorting' },
  { title: 'Moving preparations', pieces: [['The family ', 'had packing'], [' belongings. Ana ', 'had been selling'], [' furniture, and her brother ', 'had been labeling']], after: ' boxes before the truck arrived.', wrong: 0, answers: ['had been packing'], reason: 'the continuous form requires had been packing' },
]

const sequences: EnglishEditorialSequenceSeed[] = [
  { events: ['Sailors had been removing water', 'A passenger had been waving', 'The operator had been repeating the signal'], target: 0 },
  { events: ['Doctors had been treating patients', 'Nurses had been moving between wards', 'The lab had been processing samples'], target: 1 },
  { events: ['Rain had been falling', 'Water had been spilling from a drain', 'The river had been rising'], target: 2 },
  { events: ['Actors had been rehearsing', 'The director had been refining transitions', 'Designers had been adjusting costumes'], target: 0 },
  { events: ['We had been collecting data', 'An analyst had been verifying results', 'I had been rewriting methods'], target: 1 },
  { events: ['Volunteers had been searching', 'Police had been patrolling roads', 'A pilot had been circling the valley'], target: 2 },
  { events: ['Users had been reporting delays', 'The database had been consuming memory', 'Engineers had been monitoring logs'], target: 0 },
  { events: ['Players had been running daily', 'The coach had been testing formations', 'The goalkeeper had been practicing penalties'], target: 1 },
  { events: ['Researchers had been opening boxes', 'An assistant had been moving shelves', 'Another had been sorting papers'], target: 2 },
  { events: ['The family had been packing', 'Ana had been selling furniture', 'Her brother had been labeling boxes'], target: 0 },
]

const final: EnglishEditorialFinalSeed[] = [
  { before: 'When help arrived, the driver ', after: ' to restart the engine for twenty minutes.', answer: 'had been trying', distractors: ['tried', 'was trying', 'has been trying'] },
  { before: 'The pavement was shiny because it ', after: ' since late afternoon.', answer: 'had been raining', distractors: ['rained', 'was raining', 'has been raining'] },
  { before: 'Before the promotion, Maya ', after: ' on the same team for five years.', answer: 'had been working', distractors: ['worked', 'was working', 'has worked'] },
  { before: 'The children were muddy because they ', after: ' beside the river.', answer: 'had been playing', distractors: ['played', 'were playing', 'have been playing'] },
  { before: 'By the inspection, the machine ', after: ' oil for several days.', answer: 'had been leaking', distractors: ['leaked', 'was leaking', 'has been leaking'] },
  { before: 'They were confident because they ', after: ' the route every weekend.', answer: 'had been practicing', distractors: ['practiced', 'were practicing', 'have been practicing'] },
  { before: 'When the reply arrived, I ', after: ' the office all morning.', answer: 'had been calling', distractors: ['called', 'was calling', 'have been calling'] },
  { before: 'The team looked exhausted because it ', after: ' since dawn.', answer: 'had been training', distractors: ['trained', 'was training', 'has been training'] },
  { before: 'Before the doctor changed the treatment, the patient ', after: ' well for weeks.', answer: 'had not been sleeping', distractors: ['did not sleep', 'was not sleeping', 'has not been sleeping'] },
  { before: 'The room smelled of paint because workers ', after: ' the ceiling all day.', answer: 'had been repainting', distractors: ['repainted', 'were repainting', 'have been repainting'] },
]

export const ENGLISH_PAST_PERFECT_CONTINUOUS_EDITORIAL = createEnglishEditorialPack({ slug: 'past-perfect-continuous', form: 'past-perfect-continuous', focus: 'Past perfect continuous', rule: 'Use the past perfect continuous for duration or repeated activity extending up to a past event, often explaining past evidence.', micro, long, errors, sequences, final, choicePositions: [0, 3, 2, 1, 0, 3, 2, 1, 0, 3] })
