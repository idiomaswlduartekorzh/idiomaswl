import { createEnglishEditorialPack, type EnglishEditorialErrorSeed, type EnglishEditorialFinalSeed, type EnglishEditorialGapSeed, type EnglishEditorialMicroSeed, type EnglishEditorialSequenceSeed } from './english-editorial-builder.ts'

const micro: EnglishEditorialMicroSeed[] = [
  { title: 'The crying baby', cue: 'an action happening now', segments: ['Listen—the baby ', ' upstairs.'], verb: 'cry', answers: ['is crying'], distractors: ['cries', 'cried', 'has cried'] },
  { title: 'A temporary home office', cue: 'a temporary situation this month', segments: ['This month I ', ' from my sister’s apartment.'], verb: 'work', answers: ['am working'], distractors: ['work', 'worked', 'have worked'] },
  { title: 'Tomorrow’s client meeting', cue: 'a confirmed personal arrangement', segments: ['We ', ' the client at three tomorrow.'], verb: 'meet', answers: ['are meeting'], distractors: ['meet', 'met', 'have met'] },
  { title: 'Rain at the window', cue: 'an event visible now', segments: ['It ', ' heavily outside right now.'], verb: 'rain', answers: ['is raining'], distractors: ['rains', 'rained', 'has rained'] },
  { title: 'A changing neighborhood', cue: 'a developing change', segments: ['The neighborhood ', ' much quieter as traffic moves elsewhere.'], verb: 'become', answers: ['is becoming'], distractors: ['becomes', 'became', 'has become'] },
  { title: 'Dinner in progress', cue: 'an action in progress at this moment', segments: ['Dad ', ' dinner, so the kitchen is busy.'], verb: 'make', answers: ['is making'], distractors: ['makes', 'made', 'has made'] },
  { title: 'A short university course', cue: 'a temporary course this semester', segments: ['They ', ' Arabic this semester.'], verb: 'study', answers: ['are studying'], distractors: ['study', 'studied', 'have studied'] },
  { title: 'Tonight’s flight', cue: 'a fixed personal travel arrangement', segments: ['Mina ', ' to Quito tonight; her ticket is confirmed.'], verb: 'fly', answers: ['is flying'], distractors: ['flies', 'flew', 'has flown'] },
  { title: 'The current discussion', cue: 'an activity taking place now', segments: ['You ', ' the wrong document at the moment.'], verb: 'read', answers: ['are reading'], distractors: ['read', 'have read', 'were reading'] },
  { title: 'A temporary road closure', cue: 'a temporary present restriction', segments: ['The city ', ' this bridge to cars for two weeks.'], verb: 'close', answers: ['is closing'], distractors: ['closes', 'closed', 'has closed'] },
]

const long: EnglishEditorialGapSeed[] = [
  { title: 'Preparing the live broadcast', instruction: 'Complete the connected scene in progress.', segments: ['The producer ', ' the running order while two technicians ', ' the cameras. In the studio, the presenter ', ' her opening lines.'], entries: [['revise', ['is revising']], ['test', ['are testing']], ['practice', ['is practicing', 'is practising']]] },
  { title: 'Moving into the new office', instruction: 'Complete the connected temporary scene.', segments: ['This week our team ', ' on the third floor. The designers ', ' the desks, and I ', ' labels on every box.'], entries: [['work', ['is working']], ['arrange', ['are arranging']], ['put', ['am putting']]] },
  { title: 'Waiting for the storm', instruction: 'Complete the connected scene happening now.', segments: ['Dark clouds ', ' over the harbor. Fishermen ', ' their boats, and the coast guard ', ' a warning.'], entries: [['gather', ['are gathering']], ['secure', ['are securing']], ['broadcast', ['is broadcasting']]] },
  { title: 'Setting up the exhibition', instruction: 'Complete the connected arrangement.', segments: ['The curator ', ' the final labels. Two assistants ', ' the photographs, and a lighting specialist ', ' each lamp.'], entries: [['write', ['is writing']], ['hang', ['are hanging']], ['adjust', ['is adjusting']]] },
  { title: 'A family video call', instruction: 'Complete the connected scene happening now.', segments: ['Grandma ', ' us her garden on camera. My cousins ', ' questions, and I ', ' the call for Dad.'], entries: [['show', ['is showing']], ['ask', ['are asking']], ['record', ['am recording']]] },
  { title: 'Tonight’s dinner plan', instruction: 'Complete the connected personal arrangements.', segments: ['We ', ' at Rosa’s apartment tonight. She ', ' the main course, and I ', ' dessert.'], entries: [['eat', ['are eating']], ['prepare', ['is preparing']], ['bring', ['am bringing']]] },
  { title: 'Repairing the town clock', instruction: 'Complete the connected temporary project.', segments: ['Engineers ', ' the old mechanism this month. One specialist ', ' the gears while another ', ' the wooden case.'], entries: [['restore', ['are restoring']], ['clean', ['is cleaning']], ['repair', ['is repairing']]] },
  { title: 'The school play rehearsal', instruction: 'Complete the connected action in progress.', segments: ['The actors ', ' the final scene. The director ', ' their positions, and the orchestra ', ' the closing music.'], entries: [['rehearse', ['are rehearsing']], ['correct', ['is correcting']], ['play', ['is playing']]] },
  { title: 'A changing shopping street', instruction: 'Complete the connected developing changes.', segments: ['More families ', ' into the district. Small cafés ', ' near the station, and rents ', ' quickly.'], entries: [['move', ['are moving']], ['open', ['are opening']], ['rise', ['are rising']]] },
  { title: 'Leaving for the airport', instruction: 'Complete the connected immediate scene.', segments: ['Mina ', ' her passport now. Her brother ', ' the taxi, and their parents ', ' the suitcases downstairs.'], entries: [['find', ['is finding']], ['call', ['is calling']], ['carry', ['are carrying']]] },
]

const errors: EnglishEditorialErrorSeed[] = [
  { title: 'Inside the studio', pieces: [['The producer ', 'is revising'], [' the schedule. Two technicians ', 'is testing'], [' the cameras, and the presenter ', 'is practicing']], after: '.', wrong: 1, answers: ['are testing'], reason: 'the plural subject technicians requires are testing' },
  { title: 'The office move', pieces: [['Our team ', 'is working'], [' upstairs. The designers ', 'are arranging'], [' desks, and I ', 'is labeling']], after: ' boxes.', wrong: 2, answers: ['am labeling', 'am labelling'], reason: 'the subject I requires am labeling' },
  { title: 'Storm preparations', pieces: [['Clouds ', 'is gathering'], [' above the harbor. Fishermen ', 'are securing'], [' boats, and the coast guard ', 'is broadcasting']], after: ' a warning.', wrong: 0, answers: ['are gathering'], reason: 'the plural subject clouds requires are gathering' },
  { title: 'Gallery setup', pieces: [['The curator ', 'is writing'], [' labels. Two assistants ', 'is hanging'], [' photographs, and a specialist ', 'is adjusting']], after: ' the lights.', wrong: 1, answers: ['are hanging'], reason: 'the plural subject assistants requires are hanging' },
  { title: 'The garden call', pieces: [['Grandma ', 'is showing'], [' us the flowers. My cousins ', 'are asking'], [' questions, and I ', 'are recording']], after: ' the call.', wrong: 2, answers: ['am recording'], reason: 'the subject I requires am recording' },
  { title: 'Dinner tonight', pieces: [['We ', 'is eating'], [' at Rosa’s. She ', 'is preparing'], [' dinner, and I ', 'am bringing']], after: ' dessert.', wrong: 0, answers: ['are eating'], reason: 'the subject we requires are eating' },
  { title: 'Clock restoration', pieces: [['Engineers ', 'are restoring'], [' the clock. One specialist ', 'are cleaning'], [' the gears, and another ', 'is repairing']], after: ' the case.', wrong: 1, answers: ['is cleaning'], reason: 'the singular subject specialist requires is cleaning' },
  { title: 'Play rehearsal', pieces: [['The actors ', 'are rehearsing'], ['. The director ', 'is correcting'], [' positions, and the orchestra ', 'are playing']], after: ' the finale.', wrong: 2, answers: ['is playing'], reason: 'orchestra is treated as a singular unit in this text' },
  { title: 'A changing district', pieces: [['Families ', 'is moving'], [' into the area. Cafés ', 'are opening'], [' nearby, and rents ', 'are rising']], after: '.', wrong: 0, answers: ['are moving'], reason: 'the plural subject families requires are moving' },
  { title: 'Airport departure', pieces: [['Mina ', 'is finding'], [' her passport. Her brother ', 'are calling'], [' a taxi, and their parents ', 'are carrying']], after: ' the bags.', wrong: 1, answers: ['is calling'], reason: 'the singular subject brother requires is calling' },
]

const sequences: EnglishEditorialSequenceSeed[] = [
  { events: ['The producer is revising the order', 'Technicians are testing the cameras', 'The presenter is practicing her lines'], target: 0 },
  { events: ['The team is moving upstairs', 'Designers are arranging desks', 'I am labeling the boxes'], target: 1 },
  { events: ['Clouds are gathering', 'Fishermen are securing boats', 'The coast guard is broadcasting a warning'], target: 2 },
  { events: ['The curator is writing labels', 'Assistants are hanging photographs', 'A specialist is adjusting the lights'], target: 0 },
  { events: ['Grandma is showing the garden', 'My cousins are asking questions', 'I am recording the call'], target: 1 },
  { events: ['We are meeting at Rosa’s', 'She is preparing dinner', 'I am bringing dessert'], target: 2 },
  { events: ['Engineers are opening the clock', 'A specialist is cleaning the gears', 'Another is repairing the case'], target: 0 },
  { events: ['The actors are rehearsing', 'The director is correcting positions', 'The orchestra is playing the finale'], target: 1 },
  { events: ['Families are moving into the district', 'Cafés are opening nearby', 'Rents are rising'], target: 2 },
  { events: ['Mina is finding her passport', 'Her brother is calling a taxi', 'Their parents are carrying the bags'], target: 0 },
]

const final: EnglishEditorialFinalSeed[] = [
  { before: 'At this moment the rescue team ', after: ' the northern trail.', answer: 'is searching', distractors: ['searches', 'searched', 'has searched'] },
  { before: 'For this semester, I ', after: ' with a host family near campus.', answer: 'am living', distractors: ['live', 'lived', 'have lived'] },
  { before: 'We ', after: ' the architect tomorrow morning; the appointment is confirmed.', answer: 'are meeting', distractors: ['meet', 'met', 'have met'] },
  { before: 'Look—the tide ', after: ' much faster than expected.', answer: 'is rising', distractors: ['rises', 'rose', 'has risen'] },
  { before: 'The company ', after: ' its customer service system this month.', answer: 'is changing', distractors: ['changes', 'changed', 'has changed'] },
  { before: 'Right now two volunteers ', after: ' the donated books by age group.', answer: 'are sorting', distractors: ['sort', 'sorted', 'have sorted'] },
  { before: 'Tonight Elena ', after: ' with the city orchestra; her seat is reserved.', answer: 'is performing', distractors: ['performs', 'performed', 'has performed'] },
  { before: 'The mechanic ', after: ' the engine, so please wait outside.', answer: 'is testing', distractors: ['tests', 'tested', 'has tested'] },
  { before: 'You ', after: ' much more confidently these days.', answer: 'are speaking', distractors: ['speak', 'spoke', 'have spoken'] },
  { before: 'This week the south entrance ', after: ' as the main access point.', answer: 'is serving', distractors: ['serves', 'served', 'has served'] },
]

export const ENGLISH_PRESENT_CONTINUOUS_EDITORIAL = createEnglishEditorialPack({ slug: 'present-continuous', form: 'present-continuous', focus: 'Present continuous', rule: 'Use the present continuous for actions in progress, temporary situations, developing changes and confirmed personal arrangements.', micro, long, errors, sequences, final, choicePositions: [0, 3, 2, 1, 0, 3, 2, 1, 0, 3] })
