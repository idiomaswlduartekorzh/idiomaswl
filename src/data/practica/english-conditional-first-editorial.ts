import { createEnglishEditorialPack, type EnglishEditorialErrorSeed, type EnglishEditorialFinalSeed, type EnglishEditorialGapSeed, type EnglishEditorialMicroSeed, type EnglishEditorialSequenceSeed } from './english-editorial-builder.ts'

const micro: EnglishEditorialMicroSeed[] = [
  { title: 'Rain tomorrow', cue: 'a real future result', segments: ['If it rains tomorrow, we ', ' home.'], verb: 'stay', answers: ['will stay'], distractors: ['stay', 'would stay', 'stayed'] },
  { title: 'Leaving for the bus', cue: 'a possible future condition after if', segments: ['You will miss the bus if you ', ' now.'], verb: 'not leave', answers: ['do not leave', "don't leave"], distractors: ['will not leave', 'would not leave', 'did not leave'] },
  { title: 'Ana may finish early', cue: 'a likely future result', segments: ['If Ana finishes early, she ', ' us.'], verb: 'join', answers: ['will join'], distractors: ['joins', 'would join', 'joined'] },
  { title: 'The road may close', cue: 'a real future contingency', segments: ['If the road closes tonight, the bus ', ' the eastern route.'], verb: 'take', answers: ['will take'], distractors: ['takes', 'would take', 'took'] },
  { title: 'A condition for approval', cue: 'a possible future condition after if', segments: ['The board will approve the plan if costs ', ' within budget.'], verb: 'remain', answers: ['remain'], distractors: ['will remain', 'would remain', 'remained'] },
  { title: 'No ticket, no entry', cue: 'a likely future result', segments: ['If you do not show the ticket, staff ', ' you enter.'], verb: 'not let', answers: ['will not let', "won't let"], distractors: ['do not let', 'would not let', 'did not let'] },
  { title: 'A call after arrival', cue: 'a future result dependent on arrival', segments: ['When I arrive tonight, I ', ' you.'], verb: 'call', answers: ['will call'], distractors: ['call', 'would call', 'called'] },
  { title: 'Possible equipment failure', cue: 'a real future condition after if', segments: ['We will use the backup room if the projector ', '.'], verb: 'fail', answers: ['fails'], distractors: ['will fail', 'would fail', 'failed'] },
  { title: 'Enough volunteers', cue: 'a possible future result', segments: ['If enough volunteers register, we ', ' both entrances.'], verb: 'open', answers: ['will open'], distractors: ['open', 'would open', 'opened'] },
  { title: 'Missing the deadline', cue: 'a future result from a possible condition', segments: ['If the file arrives after five, I ', ' it tomorrow.'], verb: 'review', answers: ['will review'], distractors: ['review', 'would review', 'reviewed'] },
]

const long: EnglishEditorialGapSeed[] = [
  { title: 'Contingency plan for the outdoor concert', instruction: 'Complete the connected real possibilities.', segments: ['If it rains, we ', ' the concert indoors. Staff will open the gym if the forecast ', ' worse, and we ', ' every ticket holder when the venue changes.'], entries: [['move', ['will move']], ['become', ['becomes']], ['notify', ['will notify']]] },
  { title: 'Tomorrow’s delivery plan', instruction: 'Complete the connected future conditions.', segments: ['If the truck arrives before noon, we ', ' it immediately. The warehouse will call us if any box ', ' damaged, and we ', ' replacements before closing.'], entries: [['unload', ['will unload']], ['look', ['looks']], ['request', ['will request']]] },
  { title: 'A plan for the mountain hike', instruction: 'Complete the connected real contingencies.', segments: ['If the weather remains clear, we ', ' at six. We will turn back if the wind ', ' too strong, and the guide ', ' the shelter if anyone feels ill.'], entries: [['leave', ['will leave']], ['become', ['becomes']], ['contact', ['will contact']]] },
  { title: 'The examination backup plan', instruction: 'Complete the connected possible responses.', segments: ['If the network fails, students ', ' printed papers. The supervisor will extend the time if the outage ', ' longer than ten minutes, and staff ', ' every interruption.'], entries: [['use', ['will use']], ['last', ['lasts']], ['record', ['will record']]] },
  { title: 'Preparing for a busy clinic', instruction: 'Complete the connected future possibilities.', segments: ['If appointments increase, the clinic ', ' another nurse. The manager will open room four if demand ', ' high, and patients ', ' a message if schedules change.'], entries: [['add', ['will add']], ['remain', ['remains']], ['receive', ['will receive']]] },
  { title: 'The community garden vote', instruction: 'Complete the connected likely outcomes.', segments: ['If residents approve the plan, the council ', ' the land. Volunteers will begin in May if funding ', ' on time, and local schools ', ' weekend workshops.'], entries: [['prepare', ['will prepare']], ['arrive', ['arrives']], ['organize', ['will organize']]] },
  { title: 'A family airport plan', instruction: 'Complete the connected real contingencies.', segments: ['If traffic is light, we ', ' the airport by seven. Dad will call the airline if the flight ', ' delayed, and we ', ' breakfast after security.'], entries: [['reach', ['will reach']], ['be', ['is']], ['have', ['will have']]] },
  { title: 'The software release decision', instruction: 'Complete the connected possible outcomes.', segments: ['If the final tests pass, we ', ' tonight. The team will postpone the release if any critical error ', ', and customers ', ' an update before midnight.'], entries: [['deploy', ['will deploy']], ['appear', ['appears']], ['receive', ['will receive']]] },
  { title: 'Plans for the school fair', instruction: 'Complete the connected future possibilities.', segments: ['If enough families attend, we ', ' the second hall. The band will perform outside if the weather ', ' dry, and volunteers ', ' food until eight.'], entries: [['open', ['will open']], ['stay', ['stays']], ['serve', ['will serve']]] },
  { title: 'A response to rising river levels', instruction: 'Complete the connected real contingencies.', segments: ['If the river rises again, authorities ', ' the lower road. Buses will change route if water ', ' the bridge, and emergency teams ', ' residents near the bank.'], entries: [['close', ['will close']], ['reach', ['reaches']], ['warn', ['will warn']]] },
]

const errors: EnglishEditorialErrorSeed[] = [
  { title: 'Concert plan', pieces: [['If it rains, we ', 'would move'], [' indoors. Staff will open the gym if the forecast ', 'becomes'], [' worse, and we ', 'will notify']], after: ' guests.', wrong: 0, answers: ['will move'], reason: 'a real future result takes will, not would' },
  { title: 'Delivery plan', pieces: [['If the truck arrives, we ', 'will unload'], [' it. The warehouse will call if a box ', 'will look'], [' damaged, and we ', 'will request']], after: ' a replacement.', wrong: 1, answers: ['looks'], reason: 'the if-clause uses the present simple, not will' },
  { title: 'Mountain plan', pieces: [['If weather stays clear, we ', 'will leave'], [' early. We will turn back if wind ', 'becomes'], [' strong, and the guide ', 'would contact']], after: ' the shelter.', wrong: 2, answers: ['will contact'], reason: 'a real future result takes will, not would' },
  { title: 'Exam backup', pieces: [['If the network fails, students ', 'would use'], [' paper. Time will extend if the outage ', 'lasts'], [', and staff ', 'will record']], after: ' interruptions.', wrong: 0, answers: ['will use'], reason: 'a real future result takes will, not would' },
  { title: 'Clinic demand', pieces: [['If appointments increase, the clinic ', 'will add'], [' a nurse. It will open room four if demand ', 'will remain'], [' high, and patients ', 'will receive']], after: ' messages.', wrong: 1, answers: ['remains'], reason: 'the if-clause uses the present simple, not will' },
  { title: 'Garden vote', pieces: [['If residents approve, the council ', 'will prepare'], [' land. Work will begin if funding ', 'arrives'], [', and schools ', 'would organize']], after: ' workshops.', wrong: 2, answers: ['will organize'], reason: 'a real future result takes will, not would' },
  { title: 'Airport plan', pieces: [['If traffic is light, we ', 'would reach'], [' the airport. Dad will call if the flight ', 'is'], [' delayed, and we ', 'will have']], after: ' breakfast.', wrong: 0, answers: ['will reach'], reason: 'a real future result takes will, not would' },
  { title: 'Release decision', pieces: [['If tests pass, we ', 'will deploy'], ['. We will postpone if an error ', 'will appear'], [', and customers ', 'will receive']], after: ' an update.', wrong: 1, answers: ['appears'], reason: 'the if-clause uses the present simple, not will' },
  { title: 'School fair', pieces: [['If families attend, we ', 'will open'], [' another hall. The band will play if weather ', 'stays'], [' dry, and volunteers ', 'would serve']], after: ' food.', wrong: 2, answers: ['will serve'], reason: 'a real future result takes will, not would' },
  { title: 'River response', pieces: [['If the river rises, authorities ', 'would close'], [' the road. Buses will reroute if water ', 'reaches'], [' the bridge, and teams ', 'will warn']], after: ' residents.', wrong: 0, answers: ['will close'], reason: 'a real future result takes will, not would' },
]

const sequences: EnglishEditorialSequenceSeed[] = [
  { events: ['If it rains, we will move indoors', 'If the forecast worsens, staff will open the gym', 'If the venue changes, we will notify guests'], target: 0 },
  { events: ['If the truck arrives, we will unload it', 'If a box looks damaged, the warehouse will call', 'If anything is missing, we will request replacements'], target: 1 },
  { events: ['If weather stays clear, we will leave early', 'If wind strengthens, we will turn back', 'If anyone is ill, the guide will contact the shelter'], target: 2 },
  { events: ['If the network fails, students will use paper', 'If the outage lasts, time will extend', 'If interruptions occur, staff will record them'], target: 0 },
  { events: ['If appointments increase, the clinic will add a nurse', 'If demand remains high, it will open room four', 'If schedules change, patients will receive a message'], target: 1 },
  { events: ['If residents approve, the council will prepare the land', 'If funding arrives, work will begin', 'If schools join, they will organize workshops'], target: 2 },
  { events: ['If traffic is light, we will reach the airport by seven', 'If the flight is delayed, Dad will call', 'If we clear security early, we will have breakfast'], target: 0 },
  { events: ['If tests pass, we will deploy', 'If an error appears, we will postpone', 'If timing changes, customers will receive an update'], target: 1 },
  { events: ['If families attend, we will open another hall', 'If weather stays dry, the band will play outside', 'If guests stay late, volunteers will serve food'], target: 2 },
  { events: ['If the river rises, authorities will close the road', 'If water reaches the bridge, buses will reroute', 'If homes are at risk, teams will warn residents'], target: 0 },
]

const final: EnglishEditorialFinalSeed[] = [
  { before: 'If the forecast improves tomorrow, the ferry ', after: ' at six.', answer: 'will leave', distractors: ['leaves', 'would leave', 'left'] },
  { before: 'We will open the terrace if the wind ', after: ' before noon.', answer: 'drops', distractors: ['will drop', 'would drop', 'dropped'] },
  { before: 'If Maya finishes the audit early, she ', after: ' the afternoon meeting.', answer: 'will attend', distractors: ['attends', 'would attend', 'attended'] },
  { before: 'The school will add a class if enrollment ', after: ' twenty students.', answer: 'exceeds', distractors: ['will exceed', 'would exceed', 'exceeded'] },
  { before: 'If the replacement part arrives today, engineers ', after: ' the lift tonight.', answer: 'will repair', distractors: ['repair', 'would repair', 'repaired'] },
  { before: 'You will lose access if you ', after: ' the renewal deadline.', answer: 'miss', distractors: ['will miss', 'would miss', 'missed'] },
  { before: 'If enough teams register, organizers ', after: ' a second division.', answer: 'will create', distractors: ['create', 'would create', 'created'] },
  { before: 'The clinic will call you if a slot ', after: ' available.', answer: 'becomes', distractors: ['will become', 'would become', 'became'] },
  { before: 'If the road remains closed, buses ', after: ' through the northern district.', answer: 'will travel', distractors: ['travel', 'would travel', 'traveled'] },
  { before: 'We will postpone the launch if the final test ', after: '.', answer: 'fails', distractors: ['will fail', 'would fail', 'failed'] },
]

export const ENGLISH_CONDITIONAL_FIRST_EDITORIAL = createEnglishEditorialPack({ slug: 'conditional-first', form: 'conditional-first', focus: 'First conditional', rule: 'Use the first conditional for a real future possibility: present simple in the condition and will plus base verb in the result.', micro, long, errors, sequences, final, choicePositions: [0, 3, 2, 1, 0, 3, 2, 1, 0, 3] })
