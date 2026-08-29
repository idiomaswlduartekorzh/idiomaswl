import { createEnglishEditorialPack, type EnglishEditorialErrorSeed, type EnglishEditorialFinalSeed, type EnglishEditorialGapSeed, type EnglishEditorialMicroSeed, type EnglishEditorialSequenceSeed } from './english-editorial-builder.ts'

const micro: EnglishEditorialMicroSeed[] = [
  { title: 'Guests before arrival', cue: 'an event completed before I arrived', segments: ['By the time I arrived, the guests ', '.'], verb: 'leave', answers: ['had left'], distractors: ['left', 'have left', 'were leaving'] },
  { title: 'A familiar song', cue: 'an experience before she recognized the song', segments: ['She recognized the song because she ', ' it before.'], verb: 'hear', answers: ['had heard'], distractors: ['heard', 'has heard', 'was hearing'] },
  { title: 'The key inside', cue: 'an action completed before we noticed the key', segments: ['After we ', ' the door, we noticed the key inside.'], verb: 'lock', answers: ['had locked'], distractors: ['locked', 'have locked', 'were locking'] },
  { title: 'Breakfast before departure', cue: 'an action completed before the bus arrived', segments: ['Mina ', ' breakfast before the bus arrived.'], verb: 'eat', answers: ['had eaten'], distractors: ['ate', 'has eaten', 'was eating'] },
  { title: 'No snow before that night', cue: 'a negative experience before a past point', segments: ['Before that night, the children ', ' snow.'], verb: 'never see', answers: ['had never seen'], distractors: ['never saw', 'have never seen', 'were never seeing'] },
  { title: 'The emptied hall', cue: 'a result already complete when the guard checked', segments: ['When the guard checked the hall, everyone ', '.'], verb: 'go', answers: ['had gone'], distractors: ['went', 'has gone', 'was going'] },
  { title: 'Earlier preparation', cue: 'preparation completed before the meeting began', segments: ['We were calm because we ', ' every document before the meeting.'], verb: 'prepare', answers: ['had prepared'], distractors: ['prepared', 'have prepared', 'were preparing'] },
  { title: 'The missed deadline', cue: 'an action not completed before a past deadline', segments: ['At midnight, Leo ', ' the application.'], verb: 'not send', answers: ['had not sent', "hadn't sent"], distractors: ['did not send', 'has not sent', 'was not sending'] },
  { title: 'A repaired bicycle', cue: 'an earlier cause of a later successful ride', segments: ['The bicycle worked well because Ana ', ' the chain.'], verb: 'replace', answers: ['had replaced'], distractors: ['replaced', 'has replaced', 'was replacing'] },
  { title: 'Tickets before the announcement', cue: 'an action completed before prices rose', segments: ['They ', ' their tickets before the airline raised its prices.'], verb: 'buy', answers: ['had bought'], distractors: ['bought', 'have bought', 'were buying'] },
]

const long: EnglishEditorialGapSeed[] = [
  { title: 'Before the conference opened', instruction: 'Complete the earlier actions before the doors opened.', segments: ['By nine, the staff ', ' every badge. Technicians ', ' the microphones, and the director ', ' the schedule before the doors opened.'], entries: [['print', ['had printed']], ['test', ['had tested']], ['approve', ['had approved']]] },
  { title: 'Why the hikers turned back', instruction: 'Complete the earlier causes of the later decision.', segments: ['The group ', ' the wrong trail. They ', ' most of their water, and fog ', ' the ridge before they decided to turn back.'], entries: [['take', ['had taken']], ['use', ['had used']], ['cover', ['had covered']]] },
  { title: 'The apartment before inspection', instruction: 'Complete what was already finished when the agent arrived.', segments: ['The tenants ', ' every box. A cleaner ', ' the floors, and the owner ', ' the broken window when the agent arrived.'], entries: [['remove', ['had removed']], ['wash', ['had washed']], ['replace', ['had replaced']]] },
  { title: 'A smooth emergency drill', instruction: 'Complete the preparation before the alarm sounded.', segments: ['Teachers ', ' the exits. Students ', ' the instructions, and security ', ' every gate before the alarm sounded.'], entries: [['check', ['had checked']], ['read', ['had read']], ['unlock', ['had unlocked']]] },
  { title: 'The meal before the guests arrived', instruction: 'Complete the earlier kitchen sequence.', segments: ['Marta ', ' the soup. Her brother ', ' the table, and they ', ' the bread before the guests arrived.'], entries: [['finish', ['had finished']], ['set', ['had set']], ['warm', ['had warmed']]] },
  { title: 'The restored files', instruction: 'Complete the causes before the system restarted.', segments: ['The technician ', ' a backup. She ', ' the damaged disk, and the team ', ' the files before the system restarted.'], entries: [['create', ['had created']], ['replace', ['had replaced']], ['restore', ['had restored']]] },
  { title: 'Evidence before the interview', instruction: 'Complete the research done before the witness arrived.', segments: ['Detectives ', ' the camera footage. An analyst ', ' the vehicle, and officers ', ' its owner before the witness arrived.'], entries: [['review', ['had reviewed']], ['identify', ['had identified']], ['contact', ['had contacted']]] },
  { title: 'The garden after the holiday', instruction: 'Complete the changes that occurred before the family returned.', segments: ['Weeds ', ' over the path. Several branches ', ' in the wind, and the pond ', ' before the family returned.'], entries: [['grow', ['had grown']], ['fall', ['had fallen']], ['dry', ['had dried']]] },
  { title: 'The final exam results', instruction: 'Complete the work finished before results were announced.', segments: ['Every student ', ' both papers. The teachers ', ' the essays, and the board ', ' the scores before results were announced.'], entries: [['submit', ['had submitted']], ['mark', ['had marked']], ['verify', ['had verified']]] },
  { title: 'Before the ferry departed', instruction: 'Complete the preparations before departure.', segments: ['The crew ', ' the cargo. An officer ', ' the passenger list, and engineers ', ' the engines before the ferry departed.'], entries: [['secure', ['had secured']], ['check', ['had checked']], ['inspect', ['had inspected']]] },
]

const errors: EnglishEditorialErrorSeed[] = [
  { title: 'Conference setup', pieces: [['The staff ', 'had print'], [' the badges. Technicians ', 'had tested'], [' microphones, and the director ', 'had approved']], after: ' the schedule before the doors opened.', wrong: 0, answers: ['had printed'], reason: 'had requires the past participle printed' },
  { title: 'Turning back', pieces: [['The hikers ', 'had taken'], [' the wrong trail. They ', 'had use'], [' their water, and fog ', 'had covered']], after: ' the ridge before they turned back.', wrong: 1, answers: ['had used'], reason: 'had requires the past participle used' },
  { title: 'Apartment inspection', pieces: [['The tenants ', 'had removed'], [' boxes. A cleaner ', 'had washed'], [' floors, and the owner ', 'had replace']], after: ' the window before the agent arrived.', wrong: 2, answers: ['had replaced'], reason: 'had requires the past participle replaced' },
  { title: 'Emergency drill', pieces: [['Teachers ', 'had check'], [' exits. Students ', 'had read'], [' instructions, and security ', 'had unlocked']], after: ' gates before the alarm sounded.', wrong: 0, answers: ['had checked'], reason: 'had requires the past participle checked' },
  { title: 'Dinner preparation', pieces: [['Marta ', 'had finished'], [' the soup. Her brother ', 'had setted'], [' the table, and they ', 'had warmed']], after: ' bread before the guests arrived.', wrong: 1, answers: ['had set'], reason: 'set has the unchanged past participle set' },
  { title: 'System recovery', pieces: [['The technician ', 'had created'], [' a backup. She ', 'had replaced'], [' the disk, and the team ', 'had restore']], after: ' the files before the system restarted.', wrong: 2, answers: ['had restored'], reason: 'had requires the past participle restored' },
  { title: 'Earlier investigation', pieces: [['Detectives ', 'had review'], [' footage. An analyst ', 'had identified'], [' the car, and officers ', 'had contacted']], after: ' its owner before the witness arrived.', wrong: 0, answers: ['had reviewed'], reason: 'had requires the past participle reviewed' },
  { title: 'The neglected garden', pieces: [['Weeds ', 'had grown'], [' over the path. Branches ', 'had fell'], [' down, and the pond ', 'had dried']], after: ' before the family returned.', wrong: 1, answers: ['had fallen'], reason: 'fall has the past participle fallen' },
  { title: 'Exam results', pieces: [['Students ', 'had submitted'], [' papers. Teachers ', 'had marked'], [' essays, and the board ', 'had verify']], after: ' the scores before results were announced.', wrong: 2, answers: ['had verified'], reason: 'had requires the past participle verified' },
  { title: 'Ferry preparation', pieces: [['The crew ', 'had secure'], [' cargo. An officer ', 'had checked'], [' the list, and engineers ', 'had inspected']], after: ' engines before the ferry departed.', wrong: 0, answers: ['had secured'], reason: 'had requires the past participle secured' },
]

const sequences: EnglishEditorialSequenceSeed[] = [
  { events: ['The staff had printed the badges', 'Technicians had tested the microphones', 'The director had approved the schedule'], target: 0 },
  { events: ['The hikers had taken the wrong trail', 'They had used most of their water', 'Fog had covered the ridge'], target: 1 },
  { events: ['The tenants had removed the boxes', 'A cleaner had washed the floors', 'The owner had replaced the window'], target: 2 },
  { events: ['Teachers had checked the exits', 'Students had read the instructions', 'Security had unlocked the gates'], target: 0 },
  { events: ['Marta had finished the soup', 'Her brother had set the table', 'They had warmed the bread'], target: 1 },
  { events: ['The technician had created a backup', 'She had replaced the disk', 'The team had restored the files'], target: 2 },
  { events: ['Detectives had reviewed footage', 'An analyst had identified the car', 'Officers had contacted its owner'], target: 0 },
  { events: ['Weeds had grown over the path', 'Branches had fallen', 'The pond had dried'], target: 1 },
  { events: ['Students had submitted papers', 'Teachers had marked essays', 'The board had verified scores'], target: 2 },
  { events: ['The crew had secured cargo', 'An officer had checked the list', 'Engineers had inspected engines'], target: 0 },
]

const final: EnglishEditorialFinalSeed[] = [
  { before: 'By the time the nurse arrived, the patient ', after: ' consciousness.', answer: 'had regained', distractors: ['regained', 'has regained', 'was regaining'] },
  { before: 'Maya understood the reference because she ', after: ' the original article.', answer: 'had read', distractors: ['read yesterday', 'has read', 'was reading'] },
  { before: 'Before the storm reached us, we ', after: ' every window.', answer: 'had closed', distractors: ['closed', 'have closed', 'were closing'] },
  { before: 'At the audit, the company still ', after: ' the missing invoice.', answer: 'had not found', distractors: ['did not find', 'has not found', 'was not finding'] },
  { before: 'The road was clear because crews ', after: ' the fallen tree earlier.', answer: 'had removed', distractors: ['removed', 'have removed', 'were removing'] },
  { before: 'When the curtain rose, the orchestra ', after: ' its final tuning.', answer: 'had completed', distractors: ['completed', 'has completed', 'was completing'] },
  { before: 'They recognized the village although they ', after: ' it only once before.', answer: 'had visited', distractors: ['visited', 'have visited', 'were visiting'] },
  { before: 'Before prices increased, Nora ', after: ' a yearly pass.', answer: 'had bought', distractors: ['bought', 'has bought', 'was buying'] },
  { before: 'The room smelled fresh because someone ', after: ' the floor.', answer: 'had cleaned', distractors: ['cleaned', 'has cleaned', 'was cleaning'] },
  { before: 'By midnight, the final team ', after: ' its application.', answer: 'had submitted', distractors: ['submitted', 'has submitted', 'was submitting'] },
]

export const ENGLISH_PAST_PERFECT_EDITORIAL = createEnglishEditorialPack({ slug: 'past-perfect', form: 'past-perfect', focus: 'Past perfect', rule: 'Use the past perfect for an action already completed before another explicit past event or reference point.', micro, long, errors, sequences, final })
