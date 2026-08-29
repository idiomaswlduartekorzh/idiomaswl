import { createEnglishEditorialPack, type EnglishEditorialErrorSeed, type EnglishEditorialFinalSeed, type EnglishEditorialGapSeed, type EnglishEditorialMicroSeed, type EnglishEditorialSequenceSeed } from './english-editorial-builder.ts'

const micro: EnglishEditorialMicroSeed[] = [
  { title: 'Migration by Friday', cue: 'completion before Friday', segments: ['By Friday, we ', ' the migration.'], verb: 'finish', answers: ['will have finished'], distractors: ['will finish', 'finish', 'have finished'] },
  { title: 'Dinner before arrival', cue: 'completion before you arrive', segments: ['By the time you arrive, I ', ' dinner.'], verb: 'make', answers: ['will have made'], distractors: ['will make', 'make', 'will be making'] },
  { title: 'Twelve units by year end', cue: 'completion by the end of this year', segments: ['At the end of this year, she ', ' all twelve units.'], verb: 'complete', answers: ['will have completed'], distractors: ['will complete', 'complete', 'will be completing'] },
  { title: 'The report before noon', cue: 'completion before a future deadline', segments: ['Before noon tomorrow, the team ', ' the report.'], verb: 'submit', answers: ['will have submitted'], distractors: ['will submit', 'submits', 'will be submitting'] },
  { title: 'Arrival by sunset', cue: 'completion by a future point', segments: ['By sunset, the hikers ', ' the shelter.'], verb: 'reach', answers: ['will have reached'], distractors: ['will reach', 'reach', 'will be reaching'] },
  { title: 'No decision by Monday', cue: 'non-completion by a future deadline', segments: ['By Monday, the board ', ' a final decision.'], verb: 'not make', answers: ['will not have made', "won't have made"], distractors: ['will not make', 'does not make', 'will not be making'] },
  { title: 'The repaired bridge', cue: 'completion before traffic returns', segments: ['When traffic returns, engineers ', ' the bridge.'], verb: 'repair', answers: ['will have repaired'], distractors: ['will repair', 'repair', 'will be repairing'] },
  { title: 'Reading before the seminar', cue: 'completion before another future event', segments: ['Before the seminar begins, you ', ' both articles.'], verb: 'read', answers: ['will have read'], distractors: ['will read', 'read', 'will be reading'] },
  { title: 'Ten years by June', cue: 'a completed milestone at a future point', segments: ['By June, the museum ', ' for ten years.'], verb: 'operate', answers: ['will have operated'], distractors: ['will operate', 'operates', 'will be operating'] },
  { title: 'Guests before dinner', cue: 'arrival completed before dinner', segments: ['Before dinner, all the guests ', '.'], verb: 'arrive', answers: ['will have arrived'], distractors: ['will arrive', 'arrive', 'will be arriving'] },
]

const long: EnglishEditorialGapSeed[] = [
  { title: 'Before the conference starts', instruction: 'Complete the actions finished before nine tomorrow.', segments: ['By nine, the staff ', ' every badge. Technicians ', ' the microphones, and the director ', ' the final schedule.'], entries: [['print', ['will have printed']], ['test', ['will have tested']], ['approve', ['will have approved']]] },
  { title: 'The house by moving day', instruction: 'Complete what will be finished before the truck arrives.', segments: ['By moving day, we ', ' every box. Marta ', ' the utility accounts, and Leo ', ' the new keys.'], entries: [['pack', ['will have packed']], ['transfer', ['will have transferred']], ['collect', ['will have collected']]] },
  { title: 'Research milestones by May', instruction: 'Complete the work finished by the May review.', segments: ['By the review, students ', ' the samples. An analyst ', ' the data, and the professor ', ' the conclusions.'], entries: [['collect', ['will have collected']], ['process', ['will have processed']], ['draft', ['will have drafted']]] },
  { title: 'The theater before reopening', instruction: 'Complete the restoration before the audience returns.', segments: ['Before reopening, workers ', ' the roof. Electricians ', ' the lights, and the city ', ' the entrance.'], entries: [['repair', ['will have repaired']], ['replace', ['will have replaced']], ['renovate', ['will have renovated']]] },
  { title: 'The trip by lunchtime', instruction: 'Complete the stages finished by noon.', segments: ['By noon, we ', ' the mountain pass. The driver ', ' three hundred kilometers, and everyone ', ' at the coastal hotel.'], entries: [['cross', ['will have crossed']], ['cover', ['will have covered']], ['arrive', ['will have arrived']]] },
  { title: 'The software release by midnight', instruction: 'Complete the release steps before midnight.', segments: ['By midnight, engineers ', ' the final patch. Testers ', ' every critical path, and the team ', ' the release notes.'], entries: [['deploy', ['will have deployed']], ['check', ['will have checked']], ['publish', ['will have published']]] },
  { title: 'Dinner before the guests arrive', instruction: 'Complete the preparations before seven.', segments: ['By seven, Dad ', ' the main course. We ', ' the table, and Maya ', ' the dessert.'], entries: [['cook', ['will have cooked']], ['set', ['will have set']], ['finish', ['will have finished']]] },
  { title: 'The course by graduation', instruction: 'Complete the achievements before graduation.', segments: ['By graduation, each student ', ' six projects. The class ', ' two exhibitions, and every learner ', ' a portfolio.'], entries: [['complete', ['will have completed']], ['organize', ['will have organized']], ['build', ['will have built']]] },
  { title: 'The storm response by dawn', instruction: 'Complete the work finished before dawn.', segments: ['By dawn, crews ', ' the main road. The utility company ', ' power, and inspectors ', ' the damaged bridge.'], entries: [['clear', ['will have cleared']], ['restore', ['will have restored']], ['assess', ['will have assessed']]] },
  { title: 'The archive before publication', instruction: 'Complete the work finished before the catalog appears.', segments: ['Before publication, researchers ', ' every photograph. An editor ', ' the captions, and the museum ', ' the digital catalog.'], entries: [['identify', ['will have identified']], ['verify', ['will have verified']], ['complete', ['will have completed']]] },
]

const errors: EnglishEditorialErrorSeed[] = [
  { title: 'Conference deadline', pieces: [['The staff ', 'will have print'], [' badges. Technicians ', 'will have tested'], [' microphones, and the director ', 'will have approved']], after: ' the schedule by nine.', wrong: 0, answers: ['will have printed'], reason: 'have requires the past participle printed' },
  { title: 'Moving day', pieces: [['We ', 'will have packed'], [' boxes. Marta ', 'will have transfer'], [' accounts, and Leo ', 'will have collected']], after: ' keys by moving day.', wrong: 1, answers: ['will have transferred'], reason: 'have requires the past participle transferred' },
  { title: 'May review', pieces: [['Students ', 'will have collected'], [' samples. An analyst ', 'will have processed'], [' data, and the professor ', 'will have draft']], after: ' conclusions by May.', wrong: 2, answers: ['will have drafted'], reason: 'have requires the past participle drafted' },
  { title: 'Theater reopening', pieces: [['Workers ', 'will have repair'], [' the roof. Electricians ', 'will have replaced'], [' lights, and the city ', 'will have renovated']], after: ' the entrance before reopening.', wrong: 0, answers: ['will have repaired'], reason: 'have requires the past participle repaired' },
  { title: 'Arrival by noon', pieces: [['We ', 'will have crossed'], [' the pass. The driver ', 'will have cover'], [' the distance, and everyone ', 'will have arrived']], after: ' by noon.', wrong: 1, answers: ['will have covered'], reason: 'have requires the past participle covered' },
  { title: 'Midnight release', pieces: [['Engineers ', 'will have deployed'], [' the patch. Testers ', 'will have checked'], [' paths, and the team ', 'will have publish']], after: ' notes by midnight.', wrong: 2, answers: ['will have published'], reason: 'have requires the past participle published' },
  { title: 'Dinner at seven', pieces: [['Dad ', 'will have cook'], [' dinner. We ', 'will have set'], [' the table, and Maya ', 'will have finished']], after: ' dessert by seven.', wrong: 0, answers: ['will have cooked'], reason: 'have requires the past participle cooked' },
  { title: 'Graduation milestones', pieces: [['Each student ', 'will have completed'], [' projects. The class ', 'will have organize'], [' exhibitions, and everyone ', 'will have built']], after: ' a portfolio by graduation.', wrong: 1, answers: ['will have organized'], reason: 'have requires the past participle organized' },
  { title: 'Response by dawn', pieces: [['Crews ', 'will have cleared'], [' the road. The company ', 'will have restored'], [' power, and inspectors ', 'will have assess']], after: ' the bridge by dawn.', wrong: 2, answers: ['will have assessed'], reason: 'have requires the past participle assessed' },
  { title: 'Archive publication', pieces: [['Researchers ', 'will have identify'], [' photos. An editor ', 'will have verified'], [' captions, and the museum ', 'will have completed']], after: ' the catalog before publication.', wrong: 0, answers: ['will have identified'], reason: 'have requires the past participle identified' },
]

const sequences: EnglishEditorialSequenceSeed[] = [
  { events: ['The staff will have printed badges by nine', 'Technicians will have tested microphones by nine', 'The director will have approved the schedule by nine'], target: 0 },
  { events: ['We will have packed boxes by moving day', 'Marta will have transferred accounts by moving day', 'Leo will have collected keys by moving day'], target: 1 },
  { events: ['Students will have collected samples by May', 'An analyst will have processed data by May', 'The professor will have drafted conclusions by May'], target: 2 },
  { events: ['Workers will have repaired the roof before reopening', 'Electricians will have replaced lights before reopening', 'The city will have renovated the entrance before reopening'], target: 0 },
  { events: ['We will have crossed the pass by noon', 'The driver will have covered the distance by noon', 'Everyone will have arrived by noon'], target: 1 },
  { events: ['Engineers will have deployed the patch by midnight', 'Testers will have checked paths by midnight', 'The team will have published notes by midnight'], target: 2 },
  { events: ['Dad will have cooked dinner by seven', 'We will have set the table by seven', 'Maya will have finished dessert by seven'], target: 0 },
  { events: ['Students will have completed projects by graduation', 'The class will have organized exhibitions by graduation', 'Everyone will have built a portfolio by graduation'], target: 1 },
  { events: ['Crews will have cleared the road by dawn', 'The company will have restored power by dawn', 'Inspectors will have assessed the bridge by dawn'], target: 2 },
  { events: ['Researchers will have identified photos before publication', 'An editor will have verified captions before publication', 'The museum will have completed the catalog before publication'], target: 0 },
]

const final: EnglishEditorialFinalSeed[] = [
  { before: 'By next Tuesday, the jury ', after: ' every submission.', answer: 'will have reviewed', distractors: ['will review', 'reviews', 'will be reviewing'] },
  { before: 'Before you reach the station, the express train ', after: '.', answer: 'will have departed', distractors: ['will depart', 'departs', 'will be departing'] },
  { before: 'By the end of June, we ', after: ' the entire roof.', answer: 'will have replaced', distractors: ['will replace', 'replace', 'will be replacing'] },
  { before: 'When the audit begins, Maya ', after: ' all the invoices.', answer: 'will have organized', distractors: ['will organize', 'organizes', 'will be organizing'] },
  { before: 'By sunset, the rescue team ', after: ' the northern trail.', answer: 'will have searched', distractors: ['will search', 'searches', 'will be searching'] },
  { before: 'By Friday, the supplier ', after: ' the missing parts.', answer: 'will not have delivered', distractors: ['will not deliver', 'does not deliver', 'will not be delivering'] },
  { before: 'Before the doors open, staff ', after: ' every seat.', answer: 'will have numbered', distractors: ['will number', 'number', 'will be numbering'] },
  { before: 'At the end of the course, you ', after: ' ten recorded interviews.', answer: 'will have completed', distractors: ['will complete', 'complete', 'will be completing'] },
  { before: 'By tomorrow morning, the snow ', after: ' from the lower road.', answer: 'will have melted', distractors: ['will melt', 'melts', 'will be melting'] },
  { before: 'When the guests sit down, we ', after: ' every dish.', answer: 'will have served', distractors: ['will serve', 'serve', 'will be serving'] },
]

export const ENGLISH_FUTURE_PERFECT_EDITORIAL = createEnglishEditorialPack({ slug: 'future-perfect', form: 'future-perfect', focus: 'Future perfect', rule: 'Use the future perfect for an action completed before an explicit future deadline or event.', micro, long, errors, sequences, final, choicePositions: [0, 1, 2, 3, 2, 3, 0, 1, 2, 3] })
