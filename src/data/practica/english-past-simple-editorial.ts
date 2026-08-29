import { createEnglishEditorialPack, type EnglishEditorialErrorSeed, type EnglishEditorialFinalSeed, type EnglishEditorialGapSeed, type EnglishEditorialMicroSeed, type EnglishEditorialSequenceSeed } from './english-editorial-builder.ts'

const micro: EnglishEditorialMicroSeed[] = [
  { title: 'Yesterday’s call', cue: 'a completed event yesterday', segments: ['Leo ', ' me yesterday afternoon.'], verb: 'call', answers: ['called'], distractors: ['has called', 'was calling', 'had called'] },
  { title: 'The keys two hours ago', cue: 'a completed event at a finished past time', segments: ['We ', ' the keys two hours ago.'], verb: 'find', answers: ['found'], distractors: ['have found', 'were finding', 'had found'] },
  { title: 'Last Friday’s closing', cue: 'a completed event last Friday', segments: ['The store ', ' early last Friday.'], verb: 'close', answers: ['closed'], distractors: ['has closed', 'was closing', 'had closed'] },
  { title: 'The 2019 move', cue: 'a dated past event', segments: ['Maya ', ' to Bogotá in 2019.'], verb: 'move', answers: ['moved'], distractors: ['has moved', 'was moving', 'had moved'] },
  { title: 'Breakfast this morning', cue: 'a completed event in a finished morning', segments: ['I ', ' breakfast at seven this morning.'], verb: 'eat', answers: ['ate'], distractors: ['have eaten', 'was eating', 'had eaten'] },
  { title: 'The match on Sunday', cue: 'a completed event on Sunday', segments: ['Our team ', ' the final on Sunday.'], verb: 'win', answers: ['won'], distractors: ['has won', 'was winning', 'had won'] },
  { title: 'No reply last night', cue: 'a negative completed event last night', segments: ['Nora ', ' my message last night.'], verb: 'not answer', answers: ['did not answer', "didn't answer"], distractors: ['has not answered', 'was not answering', 'had not answered'] },
  { title: 'A question after class', cue: 'a completed question after class', segments: ['The student ', ' for help after class.'], verb: 'ask', answers: ['asked'], distractors: ['has asked', 'was asking', 'had asked'] },
  { title: 'The storm in June', cue: 'a completed event in a named past month', segments: ['A storm ', ' the old pier in June.'], verb: 'damage', answers: ['damaged'], distractors: ['has damaged', 'was damaging', 'had damaged'] },
  { title: 'Arrival at midnight', cue: 'a completed arrival last night', segments: ['They ', ' home at midnight last night.'], verb: 'get', answers: ['got'], distractors: ['have gotten', 'were getting', 'had gotten'] },
]

const long: EnglishEditorialGapSeed[] = [
  { title: 'The missed morning train', instruction: 'Complete the connected finished story.', segments: ['Yesterday Nina ', ' home late. She ', ' to the station, but the train ', ' before she reached the platform.'], entries: [['leave', ['left']], ['run', ['ran']], ['depart', ['departed']]] },
  { title: 'A surprise at the archive', instruction: 'Complete the connected finished story.', segments: ['Last Tuesday we ', ' the town archive. The librarian ', ' an unmarked box, and we ', ' a century-old map inside.'], entries: [['visit', ['visited']], ['open', ['opened']], ['discover', ['discovered']]] },
  { title: 'Dinner without electricity', instruction: 'Complete the connected finished story.', segments: ['The lights ', ' out during dinner. Dad ', ' two candles, and we ', ' the meal on the balcony.'], entries: [['go', ['went']], ['light', ['lit', 'lighted']], ['finish', ['finished']]] },
  { title: 'The school tournament', instruction: 'Complete the connected finished story.', segments: ['Our class ', ' the semifinal on Friday. Sara ', ' the winning goal, and everyone ', ' in the courtyard afterward.'], entries: [['play', ['played']], ['score', ['scored']], ['celebrate', ['celebrated']]] },
  { title: 'A flat tire on the coast', instruction: 'Complete the connected finished story.', segments: ['We ', ' a strange noise near the beach. Omar ', ' the car, and I ', ' a nail in the rear tire.'], entries: [['hear', ['heard']], ['stop', ['stopped']], ['see', ['saw']]] },
  { title: 'The rescued painting', instruction: 'Complete the connected finished story.', segments: ['Smoke ', ' the gallery yesterday. A guard ', ' the alarm, and firefighters ', ' the oldest painting.'], entries: [['fill', ['filled']], ['activate', ['activated']], ['save', ['saved']]] },
  { title: 'A difficult first presentation', instruction: 'Complete the connected finished story.', segments: ['Mila ', ' her notes at home. She ', ' nervous at first, but she ', ' every question clearly.'], entries: [['leave', ['left']], ['feel', ['felt']], ['answer', ['answered']]] },
  { title: 'The market in the rain', instruction: 'Complete the connected finished story.', segments: ['Rain ', ' suddenly at noon. Vendors ', ' their produce, and shoppers ', ' under the awnings.'], entries: [['start', ['started']], ['cover', ['covered']], ['wait', ['waited']]] },
  { title: 'A letter from the attic', instruction: 'Complete the connected finished story.', segments: ['Last weekend Ana ', ' the attic. She ', ' a loose floorboard and ', ' her grandfather’s letters beneath it.'], entries: [['clean', ['cleaned']], ['lift', ['lifted']], ['find', ['found']]] },
  { title: 'The final ferry home', instruction: 'Complete the connected finished story.', segments: ['The ferry ', ' the island at eight. It ', ' rough water for an hour and ', ' the mainland just before ten.'], entries: [['leave', ['left']], ['cross', ['crossed']], ['reach', ['reached']]] },
]

const errors: EnglishEditorialErrorSeed[] = [
  { title: 'Missing the train', pieces: [['Yesterday Nina ', 'left'], [' home late. She ', 'runned'], [' to the station, but the train ', 'departed']], after: '.', wrong: 1, answers: ['ran'], reason: 'run has the irregular past form ran' },
  { title: 'The archive box', pieces: [['We ', 'visited'], [' the archive. The librarian ', 'open'], [' a box, and we ', 'discovered']], after: ' a map.', wrong: 1, answers: ['opened'], reason: 'the completed regular event requires opened' },
  { title: 'Dinner by candlelight', pieces: [['The lights ', 'went'], [' out. Dad ', 'lit'], [' candles, and we ', 'finish']], after: ' dinner outside.', wrong: 2, answers: ['finished'], reason: 'the completed sequence requires finished' },
  { title: 'Friday’s tournament', pieces: [['Our class ', 'played'], [' the semifinal. Sara ', 'scored'], [' the last goal, and everyone ', 'celebrate']], after: '.', wrong: 2, answers: ['celebrated'], reason: 'the finished event requires celebrated' },
  { title: 'The flat tire', pieces: [['We ', 'heard'], [' a noise. Omar ', 'stoped'], [' the car, and I ', 'saw']], after: ' a nail.', wrong: 1, answers: ['stopped'], reason: 'stop doubles its final consonant in stopped' },
  { title: 'Smoke in the gallery', pieces: [['Smoke ', 'filled'], [' the room. A guard ', 'activated'], [' the alarm, and firefighters ', 'safed']], after: ' the painting.', wrong: 2, answers: ['saved'], reason: 'save forms its past by adding d: saved' },
  { title: 'The presentation', pieces: [['Mila ', 'leaved'], [' her notes at home. She ', 'felt'], [' nervous but ', 'answered']], after: ' clearly.', wrong: 0, answers: ['left'], reason: 'leave has the irregular past form left' },
  { title: 'Rain at the market', pieces: [['Rain ', 'started'], [' suddenly. Vendors ', 'coverred'], [' their produce, and shoppers ', 'waited']], after: ' nearby.', wrong: 1, answers: ['covered'], reason: 'cover takes one r in covered' },
  { title: 'The attic letters', pieces: [['Ana ', 'cleaned'], [' the attic. She ', 'lifted'], [' a board and ', 'finded']], after: ' old letters.', wrong: 2, answers: ['found'], reason: 'find has the irregular past form found' },
  { title: 'The island ferry', pieces: [['The ferry ', 'leaved'], [' at eight. It ', 'crossed'], [' rough water and ', 'reached']], after: ' the mainland.', wrong: 0, answers: ['left'], reason: 'leave has the irregular past form left' },
]

const sequences: EnglishEditorialSequenceSeed[] = [
  { events: ['Nina left home late', 'She ran to the station', 'The train departed'], target: 0 },
  { events: ['We visited the archive', 'The librarian opened a box', 'We discovered a map'], target: 1 },
  { events: ['The lights went out', 'Dad lit candles', 'We finished dinner outside'], target: 2 },
  { events: ['Our class played the semifinal', 'Sara scored the winning goal', 'Everyone celebrated'], target: 0 },
  { events: ['We heard a strange noise', 'Omar stopped the car', 'I saw a nail'], target: 1 },
  { events: ['Smoke filled the gallery', 'A guard activated the alarm', 'Firefighters saved the painting'], target: 2 },
  { events: ['Mila left her notes at home', 'She felt nervous', 'She answered every question'], target: 0 },
  { events: ['Rain started at noon', 'Vendors covered their produce', 'Shoppers waited under awnings'], target: 1 },
  { events: ['Ana cleaned the attic', 'She lifted a board', 'She found old letters'], target: 2 },
  { events: ['The ferry left the island', 'It crossed rough water', 'It reached the mainland'], target: 0 },
]

const final: EnglishEditorialFinalSeed[] = [
  { before: 'Last Thursday the committee ', after: ' the revised proposal.', answer: 'approved', distractors: ['has approved', 'was approving', 'had approved'] },
  { before: 'I ', after: ' that photograph during my 2021 trip.', answer: 'took', distractors: ['have taken', 'was taking', 'had taken'] },
  { before: 'The alarm ', after: ' at 2:14 yesterday morning.', answer: 'rang', distractors: ['has rung', 'was ringing', 'had rung'] },
  { before: 'We ', after: ' the old bridge two summers ago.', answer: 'crossed', distractors: ['have crossed', 'were crossing', 'had crossed'] },
  { before: 'Nora ', after: ' the wrong platform and missed her train last night.', answer: 'chose', distractors: ['has chosen', 'was choosing', 'had chosen'] },
  { before: 'The shop ', after: ' any deliveries during the holiday.', answer: 'did not receive', distractors: ['has not received', 'was not receiving', 'had not received'] },
  { before: 'A local carpenter ', after: ' this table in 1984.', answer: 'made', distractors: ['has made', 'was making', 'had made'] },
  { before: 'They ', after: ' the final question correctly at yesterday’s quiz.', answer: 'answered', distractors: ['have answered', 'were answering', 'had answered'] },
  { before: 'The river ', after: ' its banks during the storm last June.', answer: 'broke', distractors: ['has broken', 'was breaking', 'had broken'] },
  { before: 'Mila ', after: ' home just after midnight on Saturday.', answer: 'got', distractors: ['has gotten', 'was getting', 'had gotten'] },
]

export const ENGLISH_PAST_SIMPLE_EDITORIAL = createEnglishEditorialPack({ slug: 'past-simple', form: 'past-simple', focus: 'Past simple', rule: 'Use the past simple for completed events anchored to a finished past time or advancing a finished narrative.', micro, long, errors, sequences, final })
