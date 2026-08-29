import { createEnglishEditorialPack, type EnglishEditorialErrorSeed, type EnglishEditorialFinalSeed, type EnglishEditorialGapSeed, type EnglishEditorialMicroSeed, type EnglishEditorialSequenceSeed } from './english-editorial-builder.ts'

const micro: EnglishEditorialMicroSeed[] = [
  { title: 'This time tomorrow', cue: 'an action in progress at this time tomorrow', segments: ['This time tomorrow, we ', ' across the desert.'], verb: 'travel', answers: ['will be traveling', 'will be travelling'], distractors: ['will travel', 'travel', 'will have traveled'] },
  { title: 'The ten o’clock presentation', cue: 'an action in progress at ten tonight', segments: ['At ten tonight, she ', ' her presentation.'], verb: 'give', answers: ['will be giving'], distractors: ['will give', 'gives', 'will have given'] },
  { title: 'Driving at noon', cue: 'an activity in progress around noon tomorrow', segments: ['Do not call at noon; I ', '.'], verb: 'drive', answers: ['will be driving'], distractors: ['will drive', 'drive', 'will have driven'] },
  { title: 'Working during your visit', cue: 'an action already expected to be in progress', segments: ['When you visit on Monday, they ', ' on the new roof.'], verb: 'work', answers: ['will be working'], distractors: ['will work', 'work', 'will have worked'] },
  { title: 'The flight at dawn', cue: 'an activity in progress at a future clock time', segments: ['At six tomorrow morning, the plane ', ' over the Atlantic.'], verb: 'fly', answers: ['will be flying'], distractors: ['will fly', 'flies', 'will have flown'] },
  { title: 'A future temporary stay', cue: 'a temporary situation during a future period', segments: ['During July, I ', ' with my cousins in Medellín.'], verb: 'stay', answers: ['will be staying'], distractors: ['will stay', 'stay', 'will have stayed'] },
  { title: 'Meeting in progress', cue: 'an action in progress when another future event occurs', segments: ['When the courier arrives, we ', ' with the client.'], verb: 'meet', answers: ['will be meeting'], distractors: ['will meet', 'meet', 'will have met'] },
  { title: 'A polite question about plans', cue: 'a neutral inquiry about an expected future activity', segments: ['Will you ', ' the office this afternoon?'], verb: 'use', answers: ['be using'], distractors: ['use', 'have used', 'be used'] },
  { title: 'Not working at midnight', cue: 'a negative activity at a future moment', segments: ['At midnight, the technicians ', ' in the main server room.'], verb: 'not work', answers: ['will not be working', "won't be working"], distractors: ['will not work', 'do not work', 'will not have worked'] },
  { title: 'Dinner around eight', cue: 'an activity expected in progress at eight', segments: ['Around eight, we ', ' dinner on the terrace.'], verb: 'eat', answers: ['will be eating'], distractors: ['will eat', 'eat', 'will have eaten'] },
]

const long: EnglishEditorialGapSeed[] = [
  { title: 'Tomorrow at the field station', instruction: 'Complete the activities in progress at ten tomorrow.', segments: ['At ten tomorrow, Marta ', ' soil samples. Two students ', ' the weather station, and I ', ' observations in the cabin.'], entries: [['collect', ['will be collecting']], ['repair', ['will be repairing']], ['record', ['will be recording']]] },
  { title: 'The overnight train', instruction: 'Complete the activities in progress at midnight.', segments: ['At midnight, the train ', ' through the mountains. Most passengers ', ', and the conductor ', ' tickets in the rear carriage.'], entries: [['cross', ['will be crossing']], ['sleep', ['will be sleeping']], ['check', ['will be checking']]] },
  { title: 'During tomorrow’s conference', instruction: 'Complete the parallel future activities.', segments: ['While the director speaks, interpreters ', ' her remarks. Reporters ', ' notes, and technicians ', ' the session online.'], entries: [['translate', ['will be translating']], ['take', ['will be taking']], ['stream', ['will be streaming']]] },
  { title: 'A month in the new office', instruction: 'Complete the temporary future situations.', segments: ['During September, our team ', ' upstairs. Designers ', ' the main floor, and visitors ', ' through the east entrance.'], entries: [['work', ['will be working']], ['renovate', ['will be renovating']], ['enter', ['will be entering']]] },
  { title: 'When the storm reaches the coast', instruction: 'Complete the activities in progress at that future moment.', segments: ['When the storm reaches us, emergency crews ', ' the roads. The coast guard ', ' boats, and local radio ', ' hourly updates.'], entries: [['monitor', ['will be monitoring']], ['assist', ['will be assisting']], ['broadcast', ['will be broadcasting']]] },
  { title: 'Tomorrow evening at the theater', instruction: 'Complete the activities in progress at eight.', segments: ['At eight, actors ', ' the final scene. The orchestra ', ' below the stage, and ushers ', ' late guests to their seats.'], entries: [['perform', ['will be performing']], ['play', ['will be playing']], ['guide', ['will be guiding']]] },
  { title: 'The research trip next week', instruction: 'Complete the expected future activities.', segments: ['Next week we ', ' along the coast. Marta ', ' local fishers, and two biologists ', ' water quality.'], entries: [['travel', ['will be traveling', 'will be travelling']], ['interview', ['will be interviewing']], ['measure', ['will be measuring']]] },
  { title: 'At the airport tomorrow morning', instruction: 'Complete the scene in progress at seven.', segments: ['At seven, travelers ', ' at the counters. Staff ', ' passports, and ground crews ', ' the first aircraft.'], entries: [['queue', ['will be queuing']], ['inspect', ['will be inspecting']], ['prepare', ['will be preparing']]] },
  { title: 'During the system migration', instruction: 'Complete the activities in progress during the maintenance window.', segments: ['At two in the morning, engineers ', ' user accounts. The old server ', ' requests, and support agents ', ' any urgent calls.'], entries: [['transfer', ['will be transferring']], ['handle', ['will be handling']], ['answer', ['will be answering']]] },
  { title: 'Sunday afternoon at the park', instruction: 'Complete the expected scene in progress.', segments: ['This time Sunday, families ', ' near the lake. Children ', ' on the new field, and musicians ', ' beside the café.'], entries: [['picnic', ['will be picnicking']], ['play', ['will be playing']], ['perform', ['will be performing']]] },
]

const errors: EnglishEditorialErrorSeed[] = [
  { title: 'Field station at ten', pieces: [['Marta ', 'will be collecting'], [' samples. Students ', 'will repairing'], [' equipment, and I ', 'will be recording']], after: ' notes at ten.', wrong: 1, answers: ['will be repairing'], reason: 'the future continuous requires will be repairing' },
  { title: 'Midnight train', pieces: [['The train ', 'will be crossing'], [' mountains. Passengers ', 'will sleeping'], [', and the conductor ', 'will be checking']], after: ' tickets at midnight.', wrong: 1, answers: ['will be sleeping'], reason: 'the future continuous requires will be sleeping' },
  { title: 'Conference session', pieces: [['Interpreters ', 'will be translating'], ['. Reporters ', 'will be taking'], [' notes, and technicians ', 'will be streamed']], after: ' the session during tomorrow’s conference.', wrong: 2, answers: ['will be streaming'], reason: 'be is followed by the -ing form streaming' },
  { title: 'September office', pieces: [['Our team ', 'will be working'], [' upstairs. Designers ', 'will be renovating'], [' downstairs, and visitors ', 'will entering']], after: ' in the east during September.', wrong: 2, answers: ['will be entering'], reason: 'the future continuous requires will be entering' },
  { title: 'Coastal storm', pieces: [['Crews ', 'will be monitoring'], [' roads. The coast guard ', 'will assisting'], [' boats, and radio ', 'will be broadcasting']], after: ' updates when the storm reaches the coast.', wrong: 1, answers: ['will be assisting'], reason: 'the future continuous requires will be assisting' },
  { title: 'Theater at eight', pieces: [['Actors ', 'will be performing'], ['. The orchestra ', 'will be playing'], [' below, and ushers ', 'will be guided']], after: ' guests at eight tomorrow.', wrong: 2, answers: ['will be guiding'], reason: 'be is followed by the -ing form guiding' },
  { title: 'Research trip', pieces: [['We ', 'will traveling'], [' along the coast. Marta ', 'will be interviewing'], [' fishers, and biologists ', 'will be measuring']], after: ' water next week.', wrong: 0, answers: ['will be traveling', 'will be travelling'], reason: 'the future continuous requires will be traveling' },
  { title: 'Airport at seven', pieces: [['Travelers ', 'will be queuing'], ['. Staff ', 'will inspecting'], [' passports, and crews ', 'will be preparing']], after: ' aircraft at seven tomorrow.', wrong: 1, answers: ['will be inspecting'], reason: 'the future continuous requires will be inspecting' },
  { title: 'System migration', pieces: [['Engineers ', 'will be transferring'], [' accounts. The server ', 'will be handling'], [' requests, and agents ', 'will be answered']], after: ' calls at two tomorrow morning.', wrong: 2, answers: ['will be answering'], reason: 'be is followed by the -ing form answering' },
  { title: 'Sunday park', pieces: [['Families ', 'will picnicking'], [' by the lake. Children ', 'will be playing'], [' nearby, and musicians ', 'will be performing']], after: ' at the café.', wrong: 0, answers: ['will be picnicking'], reason: 'the future continuous requires will be picnicking' },
]

const sequences: EnglishEditorialSequenceSeed[] = [
  { events: ['Marta will be collecting samples', 'Students will be repairing equipment', 'I will be recording observations'], target: 0 },
  { events: ['The train will be crossing the mountains', 'Passengers will be sleeping', 'The conductor will be checking tickets'], target: 1 },
  { events: ['Interpreters will be translating', 'Reporters will be taking notes', 'Technicians will be streaming the session'], target: 2 },
  { events: ['Our team will be working upstairs', 'Designers will be renovating downstairs', 'Visitors will be entering in the east'], target: 0 },
  { events: ['Crews will be monitoring roads', 'The coast guard will be assisting boats', 'Radio will be broadcasting updates'], target: 1 },
  { events: ['Actors will be performing', 'The orchestra will be playing', 'Ushers will be guiding guests'], target: 2 },
  { events: ['We will be traveling along the coast', 'Marta will be interviewing fishers', 'Biologists will be measuring water'], target: 0 },
  { events: ['Travelers will be queuing', 'Staff will be inspecting passports', 'Crews will be preparing aircraft'], target: 1 },
  { events: ['Engineers will be transferring accounts', 'The server will be handling requests', 'Agents will be answering calls'], target: 2 },
  { events: ['Families will be picnicking', 'Children will be playing', 'Musicians will be performing'], target: 0 },
]

const final: EnglishEditorialFinalSeed[] = [
  { before: 'At this time tomorrow, the crew ', after: ' the final section of the bridge.', answer: 'will be painting', distractors: ['will paint', 'paint', 'will have painted'] },
  { before: 'At eleven tonight, I ', after: ' over the Pacific.', answer: 'will be flying', distractors: ['will fly', 'fly', 'will have flown'] },
  { before: 'Do not visit at three; we ', after: ' the safety drill.', answer: 'will be conducting', distractors: ['will conduct', 'conduct', 'will have conducted'] },
  { before: 'When you reach the cabin, Maya ', after: ' dinner.', answer: 'will be preparing', distractors: ['will prepare', 'prepares', 'will have prepared'] },
  { before: 'Throughout August, they ', after: ' from a temporary studio.', answer: 'will be broadcasting', distractors: ['will broadcast', 'broadcast', 'will have broadcast'] },
  { before: 'At dawn, the rescue teams ', after: ' the eastern slope.', answer: 'will be searching', distractors: ['will search', 'search', 'will have searched'] },
  { before: 'Will you ', after: ' the projector after lunch?', answer: 'be using', distractors: ['use', 'have used', 'be used'] },
  { before: 'At midnight, the public entrance ', after: ' during maintenance.', answer: 'will not be operating', distractors: ['will not operate', 'does not operate', 'will not have operated'] },
  { before: 'This time Saturday, we ', after: ' through the old quarter.', answer: 'will be walking', distractors: ['will walk', 'walk', 'will have walked'] },
  { before: 'When the results arrive, the board ', after: ' in the upstairs room.', answer: 'will be meeting', distractors: ['will meet', 'meets', 'will have met'] },
]

export const ENGLISH_FUTURE_CONTINUOUS_EDITORIAL = createEnglishEditorialPack({ slug: 'future-continuous', form: 'future-continuous', focus: 'Future continuous', rule: 'Use the future continuous for an activity expected to be in progress at or around an explicit future time.', micro, long, errors, sequences, final })
