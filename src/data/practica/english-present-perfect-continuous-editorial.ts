import { createEnglishEditorialPack, type EnglishEditorialErrorSeed, type EnglishEditorialFinalSeed, type EnglishEditorialGapSeed, type EnglishEditorialMicroSeed, type EnglishEditorialSequenceSeed } from './english-editorial-builder.ts'

const micro: EnglishEditorialMicroSeed[] = [
  { title: 'Work since nine', cue: 'an activity continuing until now', segments: ['I ', ' on this design since nine o’clock.'], verb: 'work', answers: ['have been working'], distractors: ['am working', 'worked', 'have worked'] },
  { title: 'Tired eyes', cue: 'a recent activity explaining present evidence', segments: ['Her eyes are tired because she ', '.'], verb: 'read', answers: ['has been reading'], distractors: ['has read', 'was reading', 'reads'] },
  { title: 'A long wait', cue: 'duration continuing at present', segments: ['They ', ' for the bus for forty minutes.'], verb: 'wait', answers: ['have been waiting'], distractors: ['wait', 'are waiting', 'have waited'] },
  { title: 'Wet running shoes', cue: 'a recent activity with visible evidence', segments: ['Leo’s shoes are muddy because he ', ' in the park.'], verb: 'run', answers: ['has been running'], distractors: ['has run', 'is running', 'ran'] },
  { title: 'Lessons since January', cue: 'a repeated activity continuing until now', segments: ['We ', ' online lessons since January.'], verb: 'take', answers: ['have been taking'], distractors: ['take', 'are taking', 'have taken'] },
  { title: 'Noise all morning', cue: 'an ongoing temporary activity', segments: ['The neighbors ', ' their kitchen all morning.'], verb: 'renovate', answers: ['have been renovating'], distractors: ['renovate', 'are renovating', 'have renovated'] },
  { title: 'Why the road is wet', cue: 'a recent cause with a present result', segments: ['It ', ', so the road is slippery.'], verb: 'rain', answers: ['has been raining'], distractors: ['has rained', 'is raining', 'rained'] },
  { title: 'Practice for weeks', cue: 'duration of preparation up to now', segments: ['Mina ', ' this piece for three weeks.'], verb: 'practice', answers: ['has been practicing', 'has been practising'], distractors: ['practices', 'is practicing', 'has practiced'] },
  { title: 'Repeated calls today', cue: 'a repeated unfinished activity', segments: ['Someone ', ' me from an unknown number all day.'], verb: 'call', answers: ['has been calling'], distractors: ['calls', 'is calling', 'has called'] },
  { title: 'Learning the route', cue: 'an activity developing over a period', segments: ['The new drivers ', ' the route this week.'], verb: 'learn', answers: ['have been learning'], distractors: ['learn', 'are learning', 'have learned'] },
]

const long: EnglishEditorialGapSeed[] = [
  { title: 'Preparing the community garden', instruction: 'Complete the connected work continuing until now.', segments: ['Volunteers ', ' the soil since sunrise. Marta ', ' seedlings into rows, and I ', ' the irrigation lines.'], entries: [['turn', ['have been turning']], ['place', ['has been placing']], ['check', ['have been checking']]] },
  { title: 'A difficult software morning', instruction: 'Complete the connected recent causes.', segments: ['The server ', ' errors all morning. Users ', ' support repeatedly, and our engineers ', ' for the cause.'], entries: [['report', ['has been reporting']], ['contact', ['have been contacting']], ['look', ['have been looking']]] },
  { title: 'Training for the charity race', instruction: 'Complete the connected preparation period.', segments: ['Nina ', ' before work for two months. Her friends ', ' with her on weekends, and their coach ', ' their times.'], entries: [['run', ['has been running']], ['train', ['have been training']], ['record', ['has been recording']]] },
  { title: 'Restoring the old cinema', instruction: 'Complete the connected temporary project.', segments: ['Workers ', ' the ceiling since March. A painter ', ' the entrance, and local historians ', ' photographs for the lobby.'], entries: [['repair', ['have been repairing']], ['restore', ['has been restoring']], ['collect', ['have been collecting']]] },
  { title: 'A busy afternoon in the kitchen', instruction: 'Complete the connected activity and evidence.', segments: ['Dad ', ' bread, so flour covers the counter. We ', ' vegetables for an hour, and the oven ', ' the room.'], entries: [['bake', ['has been baking']], ['chop', ['have been chopping']], ['heat', ['has been heating']]] },
  { title: 'Researching the river', instruction: 'Complete the connected study in progress over time.', segments: ['Our class ', ' water samples this term. Two groups ', ' pollution levels, and the teacher ', ' our field notes.'], entries: [['collect', ['has been collecting']], ['measure', ['have been measuring']], ['review', ['has been reviewing']]] },
  { title: 'Searching for the lost dog', instruction: 'Complete the connected ongoing search.', segments: ['Neighbors ', ' the streets since noon. One family ', ' posters, and the shelter ', ' every new report.'], entries: [['search', ['have been searching']], ['print', ['has been printing']], ['check', ['has been checking']]] },
  { title: 'Rehearsing the spring concert', instruction: 'Complete the connected repeated practice.', segments: ['The choir ', ' twice a week since February. Its director ', ' the difficult passages, and the soloists ', ' after each rehearsal.'], entries: [['meet', ['has been meeting']], ['repeat', ['has been repeating']], ['stay', ['have been staying']]] },
  { title: 'Building a family archive', instruction: 'Complete the connected activity continuing until now.', segments: ['I ', ' old photographs for several days. My aunt ', ' names on the back, and my cousins ', ' relatives for dates.'], entries: [['scan', ['have been scanning']], ['write', ['has been writing']], ['contact', ['have been contacting']]] },
  { title: 'Improving the bus service', instruction: 'Complete the connected trial period.', segments: ['The city ', ' a new route this month. Drivers ', ' passenger numbers, and planners ', ' the travel times.'], entries: [['test', ['has been testing']], ['count', ['have been counting']], ['compare', ['have been comparing']]] },
]

const errors: EnglishEditorialErrorSeed[] = [
  { title: 'Garden work', pieces: [['Volunteers ', 'has been turning'], [' the soil. Marta ', 'has been placing'], [' seedlings, and I ', 'have been checking']], after: ' the pipes.', wrong: 0, answers: ['have been turning'], reason: 'the plural subject volunteers requires have been turning' },
  { title: 'Server trouble', pieces: [['The server ', 'has been reporting'], [' errors. Users ', 'has been contacting'], [' support, and engineers ', 'have been looking']], after: ' for the cause.', wrong: 1, answers: ['have been contacting'], reason: 'the plural subject users requires have been contacting' },
  { title: 'Race training', pieces: [['Nina ', 'has been running'], [' daily. Her friends ', 'have been training'], [' too, and the coach ', 'have been recording']], after: ' their times.', wrong: 2, answers: ['has been recording'], reason: 'the singular subject coach requires has been recording' },
  { title: 'Cinema restoration', pieces: [['Workers ', 'has been repairing'], [' the ceiling. A painter ', 'has been restoring'], [' the entrance, and historians ', 'have been collecting']], after: ' photographs.', wrong: 0, answers: ['have been repairing'], reason: 'the plural subject workers requires have been repairing' },
  { title: 'Kitchen work', pieces: [['Dad ', 'has been baking'], [' bread. We ', 'has been chopping'], [' vegetables, and the oven ', 'has been heating']], after: ' the room.', wrong: 1, answers: ['have been chopping'], reason: 'the subject we requires have been chopping' },
  { title: 'River research', pieces: [['Our class ', 'has been collecting'], [' samples. Two groups ', 'have been measuring'], [' pollution, and the teacher ', 'have been reviewing']], after: ' notes.', wrong: 2, answers: ['has been reviewing'], reason: 'the singular subject teacher requires has been reviewing' },
  { title: 'The dog search', pieces: [['Neighbors ', 'has been searching'], [' the streets. A family ', 'has been printing'], [' posters, and the shelter ', 'has been checking']], after: ' reports.', wrong: 0, answers: ['have been searching'], reason: 'the plural subject neighbors requires have been searching' },
  { title: 'Concert practice', pieces: [['The choir ', 'has been meeting'], [' weekly. Its director ', 'have been repeating'], [' passages, and soloists ', 'have been staying']], after: ' late.', wrong: 1, answers: ['has been repeating'], reason: 'the singular subject director requires has been repeating' },
  { title: 'Family archive', pieces: [['I ', 'have been scanning'], [' photos. My aunt ', 'has been writing'], [' names, and my cousins ', 'has been contacting']], after: ' relatives.', wrong: 2, answers: ['have been contacting'], reason: 'the plural subject cousins requires have been contacting' },
  { title: 'Bus trial', pieces: [['The city ', 'have been testing'], [' a route. Drivers ', 'have been counting'], [' riders, and planners ', 'have been comparing']], after: ' times.', wrong: 0, answers: ['has been testing'], reason: 'the singular subject city requires has been testing' },
]

const sequences: EnglishEditorialSequenceSeed[] = [
  { events: ['Volunteers have been turning the soil', 'Marta has been placing seedlings', 'I have been checking irrigation'], target: 0 },
  { events: ['The server has been reporting errors', 'Users have been contacting support', 'Engineers have been looking for the cause'], target: 1 },
  { events: ['Nina has been running daily', 'Friends have been training with her', 'The coach has been recording their times'], target: 2 },
  { events: ['Workers have been repairing the ceiling', 'A painter has been restoring the entrance', 'Historians have been collecting photographs'], target: 0 },
  { events: ['Dad has been baking bread', 'We have been chopping vegetables', 'The oven has been heating the room'], target: 1 },
  { events: ['The class has been collecting samples', 'Groups have been measuring pollution', 'The teacher has been reviewing notes'], target: 2 },
  { events: ['Neighbors have been searching the streets', 'A family has been printing posters', 'The shelter has been checking reports'], target: 0 },
  { events: ['The choir has been meeting weekly', 'The director has been repeating passages', 'Soloists have been staying late'], target: 1 },
  { events: ['I have been scanning photographs', 'My aunt has been writing names', 'My cousins have been contacting relatives'], target: 2 },
  { events: ['The city has been testing a route', 'Drivers have been counting riders', 'Planners have been comparing times'], target: 0 },
]

const final: EnglishEditorialFinalSeed[] = [
  { before: 'The technicians ', after: ' the signal since early morning.', answer: 'have been monitoring', distractors: ['monitor', 'are monitoring', 'have monitored'] },
  { before: 'Maya’s hands are covered in paint because she ', after: ' the hallway.', answer: 'has been decorating', distractors: ['has decorated', 'is decorating', 'decorated'] },
  { before: 'I ', after: ' for your reply for nearly an hour.', answer: 'have been waiting', distractors: ['wait', 'am waiting', 'have waited'] },
  { before: 'The children ', after: ' in the snow, so their coats are wet.', answer: 'have been playing', distractors: ['have played', 'are playing', 'played'] },
  { before: 'Our team ', after: ' customer interviews throughout this month.', answer: 'has been conducting', distractors: ['conducts', 'is conducting', 'has conducted'] },
  { before: 'Someone ', after: ' the side gate repeatedly tonight.', answer: 'has been opening', distractors: ['opens', 'is opening', 'has opened'] },
  { before: 'We ', after: ' this route every weekend since May.', answer: 'have been hiking', distractors: ['hike', 'are hiking', 'have hiked'] },
  { before: 'The dog ', after: ' at the empty cupboard, which explains the noise.', answer: 'has been scratching', distractors: ['has scratched', 'is scratching', 'scratched'] },
  { before: 'Local groups ', after: ' money for the new library all year.', answer: 'have been raising', distractors: ['raise', 'are raising', 'have raised'] },
  { before: 'The river ', after: ' steadily since yesterday’s storm.', answer: 'has been rising', distractors: ['rises', 'is rising', 'has risen'] },
]

export const ENGLISH_PRESENT_PERFECT_CONTINUOUS_EDITORIAL = createEnglishEditorialPack({ slug: 'present-perfect-continuous', form: 'present-perfect-continuous', focus: 'Present perfect continuous', rule: 'Use the present perfect continuous for duration, repetition or recent activity extending to now or explaining present evidence.', micro, long, errors, sequences, final, choicePositions: [0, 3, 2, 1, 0, 3, 2, 1, 0, 3] })
