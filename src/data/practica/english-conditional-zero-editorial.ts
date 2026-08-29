import { createEnglishEditorialPack, type EnglishEditorialErrorSeed, type EnglishEditorialFinalSeed, type EnglishEditorialGapSeed, type EnglishEditorialMicroSeed, type EnglishEditorialSequenceSeed } from './english-editorial-builder.ts'

const micro: EnglishEditorialMicroSeed[] = [
  { title: 'Melting ice', cue: 'a general physical result', segments: ['If you heat ice, it ', '.'], verb: 'melt', answers: ['melts'], distractors: ['will melt', 'would melt', 'melted'] },
  { title: 'Plants without water', cue: 'a general biological condition', segments: ['Plants die if they ', ' enough water.'], verb: 'not get', answers: ['do not get', "don't get"], distractors: ['will not get', 'would not get', 'did not get'] },
  { title: 'Automatic doors', cue: 'an automatic repeated result', segments: ['When the alarm rings, the doors ', '.'], verb: 'unlock', answers: ['unlock'], distractors: ['will unlock', 'would unlock', 'unlocked'] },
  { title: 'A password rule', cue: 'a standing system rule', segments: ['If a password expires, the system ', ' a reset.'], verb: 'require', answers: ['requires'], distractors: ['will require', 'would require', 'required'] },
  { title: 'Salt in water', cue: 'a general scientific result', segments: ['Salt dissolves when you ', ' it to warm water.'], verb: 'add', answers: ['add'], distractors: ['will add', 'would add', 'added'] },
  { title: 'The library scanner', cue: 'a repeated machine response', segments: ['If a book has an overdue flag, the scanner ', ' red.'], verb: 'flash', answers: ['flashes'], distractors: ['will flash', 'would flash', 'flashed'] },
  { title: 'Training recovery', cue: 'a predictable general consequence', segments: ['Athletes recover slowly if they ', ' enough.'], verb: 'not rest', answers: ['do not rest', "don't rest"], distractors: ['will not rest', 'would not rest', 'did not rest'] },
  { title: 'A fire door', cue: 'a permanent safety mechanism', segments: ['When smoke reaches the sensor, the fire door ', '.'], verb: 'close', answers: ['closes'], distractors: ['will close', 'would close', 'closed'] },
  { title: 'Freezing water', cue: 'a universal result', segments: ['If water reaches 0°C, it ', '.'], verb: 'freeze', answers: ['freezes'], distractors: ['will freeze', 'would freeze', 'froze'] },
  { title: 'Late registration', cue: 'a standing administrative consequence', segments: ['Students pay a fee if they ', ' after the deadline.'], verb: 'register', answers: ['register'], distractors: ['will register', 'would register', 'registered'] },
]

const long: EnglishEditorialGapSeed[] = [
  { title: 'How the greenhouse responds', instruction: 'Complete the connected automatic rules.', segments: ['If the temperature rises above 28°C, a fan ', '. When the soil becomes dry, sensors ', ' the pump. If humidity drops too far, the system ', ' the roof vents.'], entries: [['start', ['starts']], ['activate', ['activate']], ['close', ['closes']]] },
  { title: 'Library checkout rules', instruction: 'Complete the connected standing procedures.', segments: ['If a card expires, the desk ', ' proof of address. When a book is overdue, the account ', ' new loans. If a reader pays the balance, access ', ' immediately.'], entries: [['request', ['requests']], ['block', ['blocks']], ['return', ['returns']]] },
  { title: 'What happens in the water cycle', instruction: 'Complete the connected natural processes.', segments: ['When the sun heats the sea, water ', '. If vapor cools, it ', ' clouds. When droplets become heavy, rain ', '.'], entries: [['evaporate', ['evaporates']], ['form', ['forms']], ['fall', ['falls']]] },
  { title: 'The building’s fire system', instruction: 'Complete the connected safety responses.', segments: ['If a detector senses smoke, the alarm ', '. When the alarm sounds, lifts ', ' at the ground floor. If pressure falls, emergency lights ', ' on.'], entries: [['activate', ['activates']], ['stop', ['stop']], ['switch', ['switch']]] },
  { title: 'Rules for the training pool', instruction: 'Complete the connected standing rules.', segments: ['If swimmers enter without a cap, staff ', ' them to leave. When a lane closes, a red sign ', ' at the entrance. If children attend, an adult ', ' with them.'], entries: [['ask', ['ask']], ['appear', ['appears']], ['stay', ['stays']]] },
  { title: 'How the payment terminal works', instruction: 'Complete the connected automatic responses.', segments: ['If a card fails twice, the terminal ', ' the transaction. When payment succeeds, it ', ' a receipt. If the network goes offline, purchases ', ' in a local queue.'], entries: [['cancel', ['cancels']], ['print', ['prints']], ['remain', ['remain']]] },
  { title: 'Basic bread-making rules', instruction: 'Complete the connected general results.', segments: ['If the water is too hot, the yeast ', '. When dough rests, it ', '. If the oven is not hot enough, the crust ', ' pale.'], entries: [['die', ['dies']], ['rise', ['rises']], ['remain', ['remains']]] },
  { title: 'The school attendance system', instruction: 'Complete the connected administrative rules.', segments: ['If a student arrives late, the office ', ' the time. When three absences appear, the system ', ' an alert. If a family updates the record, the warning ', '.'], entries: [['record', ['records']], ['send', ['sends']], ['disappear', ['disappears']]] },
  { title: 'How the recycling line sorts waste', instruction: 'Complete the connected machine rules.', segments: ['If metal reaches the magnet, it ', ' upward. When glass passes the scanner, air jets ', ' it aside. If an item is unclear, workers ', ' it manually.'], entries: [['move', ['moves']], ['push', ['push']], ['inspect', ['inspect']]] },
  { title: 'Cold-weather road rules', instruction: 'Complete the connected safety principles.', segments: ['If the temperature falls below zero, bridges ', ' first. When ice forms, stopping distance ', '. If drivers reduce speed, collisions ', ' less likely.'], entries: [['freeze', ['freeze']], ['increase', ['increases']], ['become', ['become']]] },
]

const errors: EnglishEditorialErrorSeed[] = [
  { title: 'Greenhouse rules', pieces: [['If heat rises, the fan ', 'starts'], ['. When soil dries, sensors ', 'will activate'], [' the pump, and if humidity drops, vents ', 'close']], after: '.', wrong: 1, answers: ['activate'], reason: 'a general automatic result uses the present simple, not will' },
  { title: 'Library procedures', pieces: [['If a card expires, the desk ', 'requests'], [' proof. When a book is overdue, the account ', 'would block'], [' loans, and after payment access ', 'returns']], after: '.', wrong: 1, answers: ['blocks'], reason: 'a standing rule uses the present simple, not would' },
  { title: 'Water cycle', pieces: [['When sunlight heats water, it ', 'evaporates'], ['. If vapor cools, it ', 'forms'], [' clouds, and when drops become heavy, rain ', 'will fall']], after: '.', wrong: 2, answers: ['falls'], reason: 'a natural law uses the present simple, not will' },
  { title: 'Fire system', pieces: [['If smoke appears, the alarm ', 'activates'], ['. When it sounds, lifts ', 'stop'], [' downstairs, and if pressure falls, lights ', 'will switch']], after: ' on.', wrong: 2, answers: ['switch'], reason: 'an automatic system response uses the present simple' },
  { title: 'Pool rules', pieces: [['If swimmers lack caps, staff ', 'ask'], [' them to leave. When a lane closes, a sign ', 'will appear'], [', and if children attend, an adult ', 'stays']], after: '.', wrong: 1, answers: ['appears'], reason: 'a standing procedure uses the present simple' },
  { title: 'Payment terminal', pieces: [['If a card fails, the terminal ', 'cancels'], [' the payment. When it succeeds, it ', 'prints'], [' a receipt, and offline purchases ', 'would remain']], after: ' queued.', wrong: 2, answers: ['remain'], reason: 'a repeated system behavior uses the present simple' },
  { title: 'Bread rules', pieces: [['If water is too hot, yeast ', 'will die'], ['. When dough rests, it ', 'rises'], [', and if the oven is cool, crust ', 'remains']], after: ' pale.', wrong: 0, answers: ['dies'], reason: 'a general baking result uses the present simple' },
  { title: 'Attendance rules', pieces: [['If a student is late, the office ', 'records'], [' it. When absences accumulate, the system ', 'would send'], [' an alert, and after an update it ', 'disappears']], after: '.', wrong: 1, answers: ['sends'], reason: 'a standing administrative rule uses the present simple' },
  { title: 'Recycling line', pieces: [['If metal reaches a magnet, it ', 'moves'], [' upward. When glass passes, jets ', 'push'], [' it aside, and unclear items ', 'will go']], after: ' to workers.', wrong: 2, answers: ['go'], reason: 'a repeated process uses the present simple' },
  { title: 'Winter roads', pieces: [['If temperatures fall, bridges ', 'will freeze'], [' first. When ice forms, distance ', 'increases'], [', and if drivers slow down, crashes ', 'become']], after: ' less likely.', wrong: 0, answers: ['freeze'], reason: 'a general safety principle uses the present simple' },
]

const sequences: EnglishEditorialSequenceSeed[] = [
  { events: ['If heat rises, the fan starts', 'When soil dries, sensors activate the pump', 'If humidity drops, vents close'], target: 0 },
  { events: ['If a card expires, the desk requests proof', 'When a book is overdue, the account blocks loans', 'After payment, access returns'], target: 1 },
  { events: ['When sunlight heats water, it evaporates', 'If vapor cools, clouds form', 'When droplets become heavy, rain falls'], target: 2 },
  { events: ['If smoke appears, the alarm activates', 'When it sounds, lifts stop', 'If pressure falls, lights switch on'], target: 0 },
  { events: ['If swimmers lack caps, staff ask them to leave', 'When a lane closes, a sign appears', 'If children attend, an adult stays'], target: 1 },
  { events: ['If a card fails twice, the terminal cancels', 'When payment succeeds, it prints a receipt', 'If offline, purchases remain queued'], target: 2 },
  { events: ['If water is too hot, yeast dies', 'When dough rests, it rises', 'If the oven is cool, crust remains pale'], target: 0 },
  { events: ['If a student is late, the office records it', 'When absences accumulate, the system sends an alert', 'After an update, the warning disappears'], target: 1 },
  { events: ['If metal reaches the magnet, it moves upward', 'When glass passes, jets push it aside', 'If an item is unclear, workers inspect it'], target: 2 },
  { events: ['If temperatures fall, bridges freeze', 'When ice forms, stopping distance increases', 'If drivers slow down, crashes become less likely'], target: 0 },
]

const final: EnglishEditorialFinalSeed[] = [
  { before: 'If iron stays in damp air, it ', after: '.', answer: 'rusts', distractors: ['will rust', 'would rust', 'rusted'] },
  { before: 'The gate opens when a valid badge ', after: ' the sensor.', answer: 'touches', distractors: ['will touch', 'would touch', 'touched'] },
  { before: 'If users enter the wrong code three times, the account ', after: '.', answer: 'locks', distractors: ['will lock', 'would lock', 'locked'] },
  { before: 'Seeds do not germinate if they ', after: ' enough moisture.', answer: 'do not receive', distractors: ['will not receive', 'would not receive', 'did not receive'] },
  { before: 'When the pressure reaches this level, the valve ', after: ' automatically.', answer: 'opens', distractors: ['will open', 'would open', 'opened'] },
  { before: 'If the temperature drops, this material ', after: '.', answer: 'contracts', distractors: ['will contract', 'would contract', 'contracted'] },
  { before: 'The register prints a copy whenever a customer ', after: ' by card.', answer: 'pays', distractors: ['will pay', 'would pay', 'paid'] },
  { before: 'If batteries remain unused for years, they ', after: ' capacity.', answer: 'lose', distractors: ['will lose', 'would lose', 'lost'] },
  { before: 'When a file exceeds the limit, the server ', after: ' it.', answer: 'rejects', distractors: ['will reject', 'would reject', 'rejected'] },
  { before: 'People feel dehydrated if they ', after: ' enough water.', answer: 'do not drink', distractors: ['will not drink', 'would not drink', 'did not drink'] },
]

export const ENGLISH_CONDITIONAL_ZERO_EDITORIAL = createEnglishEditorialPack({ slug: 'conditional-zero', form: 'conditional-zero', focus: 'Zero conditional', rule: 'Use the zero conditional for general truths, standing rules and automatic results: present simple in both clauses.', micro, long, errors, sequences, final, choicePositions: [0, 1, 2, 3, 0, 1, 2, 3, 0, 1] })
