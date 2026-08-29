import { createEnglishEditorialPack, type EnglishEditorialErrorSeed, type EnglishEditorialFinalSeed, type EnglishEditorialGapSeed, type EnglishEditorialMicroSeed, type EnglishEditorialSequenceSeed } from './english-editorial-builder.ts'

const micro: EnglishEditorialMicroSeed[] = [
  { title: 'Museum experience', cue: 'life experience with no finished time', segments: ['I ', ' that museum three times.'], verb: 'visit', answers: ['have visited'], distractors: ['visited', 'am visiting', 'had visited'] },
  { title: 'A report ready now', cue: 'a recent action with a present result', segments: ['Nora ', ' the report, so you can read it now.'], verb: 'finish', answers: ['has finished'], distractors: ['finished', 'is finishing', 'had finished'] },
  { title: 'This week’s inbox', cue: 'an unfinished time period', segments: ['We ', ' any complaints this week.'], verb: 'not receive', answers: ['have not received', "haven't received"], distractors: ['did not receive', 'are not receiving', 'had not received'] },
  { title: 'A missing key', cue: 'a past action causing a present problem', segments: ['Sam ', ' his key, so he cannot open the door.'], verb: 'lose', answers: ['has lost'], distractors: ['lost', 'is losing', 'had lost'] },
  { title: 'First train journey', cue: 'an experience up to now', segments: ['Maya ', ' abroad by train before.'], verb: 'never travel', answers: ['has never traveled', 'has never travelled'], distractors: ['never traveled', 'is never traveling', 'had never traveled'] },
  { title: 'News just announced', cue: 'very recent news', segments: ['The council ', ' the new route.'], verb: 'announce', answers: ['has announced'], distractors: ['announced', 'is announcing', 'had announced'] },
  { title: 'Progress so far', cue: 'achievement up to the present', segments: ['The class ', ' six units so far.'], verb: 'complete', answers: ['has completed'], distractors: ['completed', 'is completing', 'had completed'] },
  { title: 'Today’s calls', cue: 'repeated actions in an unfinished day', segments: ['I ', ' her twice today.'], verb: 'call', answers: ['have called'], distractors: ['called', 'am calling', 'had called'] },
  { title: 'An open invitation', cue: 'a situation continuing until now', segments: ['They ', ' us every summer since 2022.'], verb: 'invite', answers: ['have invited'], distractors: ['invited', 'are inviting', 'had invited'] },
  { title: 'The repaired lift', cue: 'a completed action relevant now', segments: ['The technicians ', ' the lift; it is working again.'], verb: 'repair', answers: ['have repaired'], distractors: ['repaired', 'are repairing', 'had repaired'] },
]

const long: EnglishEditorialGapSeed[] = [
  { title: 'Preparing today’s exhibition', instruction: 'Complete the connected present result.', segments: ['The curator ', ' the final room. Her assistants ', ' every label, and the museum ', ' the doors to the first visitors.'], entries: [['inspect', ['has inspected']], ['check', ['have checked']], ['open', ['has opened']]] },
  { title: 'A productive week', instruction: 'Complete the connected unfinished period.', segments: ['This week our team ', ' two prototypes. We ', ' them with volunteers, and the director ', ' the early results.'], entries: [['build', ['has built']], ['test', ['have tested']], ['review', ['has reviewed']]] },
  { title: 'The missing backpack', instruction: 'Complete the connected present problem.', segments: ['Leo ', ' his backpack. He ', ' the classroom and the bus, but nobody ', ' it yet.'], entries: [['lose', ['has lost']], ['search', ['has searched']], ['find', ['has found']]] },
  { title: 'Changes in the neighborhood', instruction: 'Complete the connected changes up to now.', segments: ['Several cafés ', ' near the station. The council ', ' wider sidewalks, and more families ', ' into the area.'], entries: [['open', ['have opened']], ['build', ['has built']], ['move', ['have moved']]] },
  { title: 'Today at the help desk', instruction: 'Complete the connected unfinished day.', segments: ['I ', ' eight requests today. Marta ', ' four password issues, and we ', ' every urgent ticket.'], entries: [['answer', ['have answered']], ['solve', ['has solved']], ['close', ['have closed']]] },
  { title: 'A traveler’s experience', instruction: 'Complete the connected experience report.', segments: ['Nina ', ' across Canada twice. She ', ' both coasts and ', ' friends in five provinces.'], entries: [['travel', ['has traveled', 'has travelled']], ['visit', ['has visited']], ['make', ['has made']]] },
  { title: 'The restored town hall', instruction: 'Complete the connected present result.', segments: ['Workers ', ' the roof. A specialist ', ' the old clock, and the mayor ', ' the building again.'], entries: [['repair', ['have repaired']], ['restore', ['has restored']], ['open', ['has opened']]] },
  { title: 'Our course so far', instruction: 'Complete the connected progress report.', segments: ['We ', ' six chapters so far. Everyone ', ' the first project, and the teacher ', ' our drafts.'], entries: [['study', ['have studied']], ['submit', ['has submitted']], ['read', ['has read']]] },
  { title: 'A newly available apartment', instruction: 'Complete the connected recent result.', segments: ['The tenants ', ' out. The owner ', ' the walls, and an agent ', ' new photographs online.'], entries: [['move', ['have moved']], ['paint', ['has painted']], ['post', ['has posted']]] },
  { title: 'Updates from the storm', instruction: 'Complete the connected news report.', segments: ['The wind ', ' several trees. Emergency crews ', ' two roads, and the weather service ', ' a new warning.'], entries: [['damage', ['has damaged']], ['close', ['have closed']], ['issue', ['has issued']]] },
]

const errors: EnglishEditorialErrorSeed[] = [
  { title: 'Exhibition update', pieces: [['The curator ', 'have inspected'], [' the room. Her assistants ', 'have checked'], [' the labels, and the museum ', 'has opened']], after: '.', wrong: 0, answers: ['has inspected'], reason: 'the singular subject curator requires has inspected' },
  { title: 'This week’s prototypes', pieces: [['Our team ', 'has built'], [' two models. We ', 'have tested'], [' them, and the director ', 'have reviewed']], after: ' the results.', wrong: 2, answers: ['has reviewed'], reason: 'the singular subject director requires has reviewed' },
  { title: 'Looking for the backpack', pieces: [['Leo ', 'have lost'], [' his bag. He ', 'has searched'], [' the bus, but nobody ', 'has found']], after: ' it.', wrong: 0, answers: ['has lost'], reason: 'the singular subject Leo requires has lost' },
  { title: 'Neighborhood changes', pieces: [['Several cafés ', 'have opened'], ['. The council ', 'have built'], [' sidewalks, and families ', 'have moved']], after: ' in.', wrong: 1, answers: ['has built'], reason: 'the singular subject council requires has built' },
  { title: 'Help-desk progress', pieces: [['I ', 'have answered'], [' eight requests. Marta ', 'has solved'], [' four issues, and we ', 'has closed']], after: ' every urgent ticket.', wrong: 2, answers: ['have closed'], reason: 'the subject we requires have closed' },
  { title: 'Travel experience', pieces: [['Nina ', 'have traveled'], [' across Canada. She ', 'has visited'], [' both coasts and ', 'has made']], after: ' many friends.', wrong: 0, answers: ['has traveled', 'has travelled'], reason: 'the singular subject Nina requires has traveled' },
  { title: 'Town-hall restoration', pieces: [['Workers ', 'have repaired'], [' the roof. A specialist ', 'have restored'], [' the clock, and the mayor ', 'has opened']], after: ' the hall.', wrong: 1, answers: ['has restored'], reason: 'the singular subject specialist requires has restored' },
  { title: 'Course progress', pieces: [['We ', 'have studied'], [' six chapters. Everyone ', 'has submitted'], [' a project, and the teacher ', 'have read']], after: ' our drafts.', wrong: 2, answers: ['has read'], reason: 'the singular subject teacher requires has read' },
  { title: 'Apartment update', pieces: [['The tenants ', 'has moved'], [' out. The owner ', 'has painted'], [' the walls, and an agent ', 'has posted']], after: ' photos.', wrong: 0, answers: ['have moved'], reason: 'the plural subject tenants requires have moved' },
  { title: 'Storm report', pieces: [['The wind ', 'has damaged'], [' trees. Crews ', 'has closed'], [' two roads, and the service ', 'has issued']], after: ' a warning.', wrong: 1, answers: ['have closed'], reason: 'the plural subject crews requires have closed' },
]

const sequences: EnglishEditorialSequenceSeed[] = [
  { events: ['The curator has inspected the room', 'Assistants have checked the labels', 'The museum has opened the doors'], target: 0 },
  { events: ['The team has built two prototypes', 'We have tested them', 'The director has reviewed the results'], target: 1 },
  { events: ['Leo has lost his backpack', 'He has searched the bus', 'A driver has found it'], target: 2 },
  { events: ['Cafés have opened', 'The council has widened the sidewalk', 'Families have moved in'], target: 0 },
  { events: ['I have answered the requests', 'Marta has solved the passwords', 'We have closed the urgent tickets'], target: 1 },
  { events: ['Nina has crossed Canada', 'She has visited both coasts', 'She has made friends there'], target: 2 },
  { events: ['Workers have repaired the roof', 'A specialist has restored the clock', 'The mayor has reopened the hall'], target: 0 },
  { events: ['We have studied six chapters', 'Everyone has submitted a project', 'The teacher has read our drafts'], target: 1 },
  { events: ['The tenants have moved out', 'The owner has painted the walls', 'An agent has posted photographs'], target: 2 },
  { events: ['The wind has damaged trees', 'Crews have closed two roads', 'The service has issued a warning'], target: 0 },
]

const final: EnglishEditorialFinalSeed[] = [
  { before: 'The laboratory ', after: ' the water samples, so the results are available now.', answer: 'has analyzed', distractors: ['analyzed', 'is analyzing', 'had analyzed'] },
  { before: 'I ', after: ' three of her novels so far.', answer: 'have read', distractors: ['read yesterday', 'am reading', 'had read'] },
  { before: 'The courier ', after: ' the parcel; it is on the reception desk.', answer: 'has delivered', distractors: ['delivered', 'is delivering', 'had delivered'] },
  { before: 'We ', after: ' no power cuts this month.', answer: 'have had', distractors: ['had', 'are having', 'had had'] },
  { before: 'Mila ', after: ' in a kayak before.', answer: 'has never traveled', distractors: ['never traveled', 'is never traveling', 'had never traveled'] },
  { before: 'The judges ', after: ' all twelve entries, so voting can begin.', answer: 'have reviewed', distractors: ['reviewed', 'are reviewing', 'had reviewed'] },
  { before: 'Our town ', after: ' two new cycle routes since January.', answer: 'has added', distractors: ['added', 'is adding', 'had added'] },
  { before: 'You ', after: ' remarkable progress this term.', answer: 'have made', distractors: ['made', 'are making', 'had made'] },
  { before: 'The snow ', after: ', and the mountain road is clear again.', answer: 'has melted', distractors: ['melted', 'is melting', 'had melted'] },
  { before: 'I ', after: ' the support desk twice today.', answer: 'have contacted', distractors: ['contacted yesterday', 'am contacting', 'had contacted'] },
]

export const ENGLISH_PRESENT_PERFECT_EDITORIAL = createEnglishEditorialPack({ slug: 'present-perfect', form: 'present-perfect', focus: 'Present perfect', rule: 'Use the present perfect for experience, change, unfinished time and past actions whose result matters now.', micro, long, errors, sequences, final })
