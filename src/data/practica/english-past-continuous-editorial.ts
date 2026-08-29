import { createEnglishEditorialPack, type EnglishEditorialErrorSeed, type EnglishEditorialFinalSeed, type EnglishEditorialGapSeed, type EnglishEditorialMicroSeed, type EnglishEditorialSequenceSeed } from './english-editorial-builder.ts'

const micro: EnglishEditorialMicroSeed[] = [
  { title: 'Cooking at eight', cue: 'an action in progress at eight last night', segments: ['At eight last night, I ', '.'], verb: 'cook', answers: ['was cooking'], distractors: ['cooked', 'have cooked', 'had cooked'] },
  { title: 'The lights went out', cue: 'background interrupted by a shorter event', segments: ['They ', ' when the lights went out.'], verb: 'dance', answers: ['were dancing'], distractors: ['danced', 'have danced', 'had danced'] },
  { title: 'Two parallel actions', cue: 'a parallel action in progress in the past', segments: ['While Sam was driving, Mia ', ' the map.'], verb: 'check', answers: ['was checking'], distractors: ['checked', 'has checked', 'had checked'] },
  { title: 'Rain at dawn', cue: 'weather in progress at a past moment', segments: ['It ', ' when we left at dawn.'], verb: 'rain', answers: ['was raining'], distractors: ['rained', 'has rained', 'had rained'] },
  { title: 'Students at ten', cue: 'an activity in progress at a stated past time', segments: ['At ten yesterday, the students ', ' their presentations.'], verb: 'prepare', answers: ['were preparing'], distractors: ['prepared', 'have prepared', 'had prepared'] },
  { title: 'The interrupted call', cue: 'an ongoing past action interrupted by a knock', segments: ['Nora ', ' to her mother when someone knocked.'], verb: 'talk', answers: ['was talking'], distractors: ['talked', 'has talked', 'had talked'] },
  { title: 'Work throughout the afternoon', cue: 'an extended activity around a past period', segments: ['We ', ' in the garden all afternoon.'], verb: 'work', answers: ['were working'], distractors: ['worked', 'have worked', 'had worked'] },
  { title: 'A temporary past stay', cue: 'a temporary situation during a past period', segments: ['That summer I ', ' with my aunt in Cali.'], verb: 'stay', answers: ['was staying'], distractors: ['stayed', 'have stayed', 'had stayed'] },
  { title: 'What the dog was doing', cue: 'background activity when another event occurred', segments: ['The dog ', ' by the gate when the courier arrived.'], verb: 'sleep', answers: ['was sleeping'], distractors: ['slept', 'has slept', 'had slept'] },
  { title: 'Negative background', cue: 'an action not in progress at a past moment', segments: ['At noon, the machines ', ' because of the inspection.'], verb: 'not run', answers: ['were not running', "weren't running"], distractors: ['did not run', 'have not run', 'had not run'] },
]

const long: EnglishEditorialGapSeed[] = [
  { title: 'When the museum alarm sounded', instruction: 'Complete the connected background scene.', segments: ['A guide ', ' the final room while visitors ', ' near the exit. Two guards ', ' the cameras when the alarm sounded.'], entries: [['close', ['was closing']], ['wait', ['were waiting']], ['watch', ['were watching']]] },
  { title: 'At the harbor during the storm', instruction: 'Complete the connected scene in progress.', segments: ['Rain ', ' across the harbor. Sailors ', ' the boats, and the coast guard ', ' instructions over the radio.'], entries: [['fall', ['was falling']], ['secure', ['were securing']], ['give', ['was giving']]] },
  { title: 'A call during rehearsal', instruction: 'Complete the connected background scene.', segments: ['The actors ', ' the second scene. The director ', ' notes, and the pianist ', ' quietly when the phone rang.'], entries: [['rehearse', ['were rehearsing']], ['write', ['was writing']], ['play', ['was playing']]] },
  { title: 'The kitchen at six', instruction: 'Complete the connected past moment.', segments: ['At six, Dad ', ' soup. We ', ' the table, and the children ', ' glasses from the cupboard.'], entries: [['make', ['was making']], ['set', ['were setting']], ['carry', ['were carrying']]] },
  { title: 'Crossing the mountains', instruction: 'Complete the connected travel background.', segments: ['The bus ', ' a steep road. Snow ', ' against the windows, and several passengers ', ' uneasily at the map.'], entries: [['climb', ['was climbing']], ['blow', ['was blowing']], ['look', ['were looking']]] },
  { title: 'At the lab when power failed', instruction: 'Complete the connected interrupted scene.', segments: ['I ', ' the samples while Marta ', ' the results. Two assistants ', ' the equipment when the power failed.'], entries: [['label', ['was labeling', 'was labelling']], ['record', ['was recording']], ['clean', ['were cleaning']]] },
  { title: 'Saturday at the market', instruction: 'Complete the connected scene in progress.', segments: ['Vendors ', ' fruit under the awnings. A musician ', ' near the fountain, and shoppers ', ' between the stalls.'], entries: [['sell', ['were selling']], ['perform', ['was performing']], ['move', ['were moving']]] },
  { title: 'The interrupted online lesson', instruction: 'Complete the connected background scene.', segments: ['The teacher ', ' a diagram. Students ', ' notes, and I ', ' a question when the connection failed.'], entries: [['explain', ['was explaining']], ['take', ['were taking']], ['ask', ['was asking']]] },
  { title: 'Searching after sunset', instruction: 'Complete the connected past activity.', segments: ['Volunteers ', ' the riverbank. A helicopter ', ' above them, and police officers ', ' every path.'], entries: [['search', ['were searching']], ['circle', ['was circling']], ['check', ['were checking']]] },
  { title: 'A quiet hour in the library', instruction: 'Complete the connected past moment.', segments: ['At four, a student ', ' newspapers near the window. Two researchers ', ' photographs, and the librarian ', ' returned books.'], entries: [['read', ['was reading']], ['compare', ['were comparing']], ['sort', ['was sorting']]] },
]

const errors: EnglishEditorialErrorSeed[] = [
  { title: 'Museum background', pieces: [['A guide ', 'were closing'], [' a room. Visitors ', 'were waiting'], [' nearby, and guards ', 'were watching']], after: ' the cameras.', wrong: 0, answers: ['was closing'], reason: 'the singular subject guide requires was closing' },
  { title: 'Harbor storm', pieces: [['Rain ', 'was falling'], ['. Sailors ', 'was securing'], [' boats, and the coast guard ', 'was giving']], after: ' instructions.', wrong: 1, answers: ['were securing'], reason: 'the plural subject sailors requires were securing' },
  { title: 'The rehearsal call', pieces: [['Actors ', 'were rehearsing'], ['. The director ', 'was writing'], [' notes, and the pianist ', 'were playing']], after: ' quietly.', wrong: 2, answers: ['was playing'], reason: 'the singular subject pianist requires was playing' },
  { title: 'Dinner at six', pieces: [['Dad ', 'were making'], [' soup. We ', 'were setting'], [' the table, and the children ', 'were carrying']], after: ' glasses.', wrong: 0, answers: ['was making'], reason: 'the singular subject Dad requires was making' },
  { title: 'Mountain road', pieces: [['The bus ', 'was climbing'], ['. Snow ', 'were blowing'], [' outside, and passengers ', 'were looking']], after: ' at the map.', wrong: 1, answers: ['was blowing'], reason: 'the uncountable singular subject snow requires was blowing' },
  { title: 'Power failure', pieces: [['I ', 'was labeling'], [' samples. Marta ', 'was recording'], [' results, and assistants ', 'was cleaning']], after: ' equipment.', wrong: 2, answers: ['were cleaning'], reason: 'the plural subject assistants requires were cleaning' },
  { title: 'The market', pieces: [['Vendors ', 'was selling'], [' fruit. A musician ', 'was performing'], [' nearby, and shoppers ', 'were moving']], after: ' between stalls.', wrong: 0, answers: ['were selling'], reason: 'the plural subject vendors requires were selling' },
  { title: 'Online lesson', pieces: [['The teacher ', 'was explaining'], [' a diagram. Students ', 'was taking'], [' notes, and I ', 'was asking']], after: ' a question.', wrong: 1, answers: ['were taking'], reason: 'the plural subject students requires were taking' },
  { title: 'River search', pieces: [['Volunteers ', 'were searching'], ['. A helicopter ', 'was circling'], [' above, and officers ', 'was checking']], after: ' the paths.', wrong: 2, answers: ['were checking'], reason: 'the plural subject officers requires were checking' },
  { title: 'Library hour', pieces: [['A student ', 'were reading'], [' newspapers. Researchers ', 'were comparing'], [' photos, and the librarian ', 'was sorting']], after: ' books.', wrong: 0, answers: ['was reading'], reason: 'the singular subject student requires was reading' },
]

const sequences: EnglishEditorialSequenceSeed[] = [
  { events: ['A guide was closing the room', 'Visitors were waiting near the exit', 'Guards were watching the cameras'], target: 0 },
  { events: ['Rain was falling over the harbor', 'Sailors were securing boats', 'The coast guard was giving instructions'], target: 1 },
  { events: ['Actors were rehearsing', 'The director was writing notes', 'The pianist was playing quietly'], target: 2 },
  { events: ['Dad was making soup', 'We were setting the table', 'The children were carrying glasses'], target: 0 },
  { events: ['The bus was climbing', 'Snow was blowing outside', 'Passengers were looking at the map'], target: 1 },
  { events: ['I was labeling samples', 'Marta was recording results', 'Assistants were cleaning equipment'], target: 2 },
  { events: ['Vendors were selling fruit', 'A musician was performing', 'Shoppers were moving between stalls'], target: 0 },
  { events: ['The teacher was explaining a diagram', 'Students were taking notes', 'I was asking a question'], target: 1 },
  { events: ['Volunteers were searching the riverbank', 'A helicopter was circling', 'Officers were checking paths'], target: 2 },
  { events: ['A student was reading newspapers', 'Researchers were comparing photos', 'The librarian was sorting books'], target: 0 },
]

const final: EnglishEditorialFinalSeed[] = [
  { before: 'At 7:30 yesterday evening, Maya ', after: ' the final chapter.', answer: 'was reading', distractors: ['read', 'has read', 'had read'] },
  { before: 'The children ', after: ' in the yard when the rain began.', answer: 'were playing', distractors: ['played', 'have played', 'had played'] },
  { before: 'While I was packing, Leo ', after: ' the train times.', answer: 'was checking', distractors: ['checked', 'has checked', 'had checked'] },
  { before: 'That winter we ', after: ' in a small apartment near the hospital.', answer: 'were living', distractors: ['lived', 'have lived', 'had lived'] },
  { before: 'At noon the technicians ', after: ' the backup cables.', answer: 'were testing', distractors: ['tested', 'have tested', 'had tested'] },
  { before: 'The wind ', after: ' hard when the old tree fell.', answer: 'was blowing', distractors: ['blew', 'has blown', 'had blown'] },
  { before: 'Nora ', after: ' home when she saw the accident.', answer: 'was walking', distractors: ['walked', 'has walked', 'had walked'] },
  { before: 'At nine, I ', after: ' the report while my colleagues prepared the slides.', answer: 'was editing', distractors: ['edited', 'have edited', 'had edited'] },
  { before: 'The machines ', after: ' during the inspection at three.', answer: 'were not running', distractors: ['did not run', 'have not run', 'had not run'] },
  { before: 'When the bell rang, the audience ', after: ' quietly for the doors to open.', answer: 'was waiting', distractors: ['waited', 'has waited', 'had waited'] },
]

export const ENGLISH_PAST_CONTINUOUS_EDITORIAL = createEnglishEditorialPack({ slug: 'past-continuous', form: 'past-continuous', focus: 'Past continuous', rule: 'Use the past continuous for an activity in progress around a past moment, as background, or alongside another ongoing past activity.', micro, long, errors, sequences, final, choicePositions: [0, 3, 2, 1, 0, 3, 2, 1, 0, 3] })
