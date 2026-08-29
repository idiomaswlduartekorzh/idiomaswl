import {
  createEnglishEditorialPack,
  type EnglishEditorialErrorSeed,
  type EnglishEditorialFinalSeed,
  type EnglishEditorialGapSeed,
  type EnglishEditorialMicroSeed,
  type EnglishEditorialSequenceSeed,
} from './english-editorial-builder.ts'

const micro: EnglishEditorialMicroSeed[] = [
  { title: 'The bakery shift', cue: 'a weekday routine', segments: ['Every weekday Nora ', ' the bakery at six.'], verb: 'open', answers: ['opens'], distractors: ['is opening', 'opened', 'will open'] },
  { title: 'A scientific fact', cue: 'a general fact', segments: ['Pure water ', ' at 100°C at sea level.'], verb: 'boil', answers: ['boils'], distractors: ['is boiling', 'boiled', 'has boiled'] },
  { title: 'The evening train', cue: 'a fixed timetable', segments: ['The last train ', ' at 11:30 tonight.'], verb: 'leave', answers: ['leaves'], distractors: ['is leaving', 'left', 'will leave'] },
  { title: 'Maya’s commute', cue: 'a repeated habit', segments: ['Maya usually ', ' to work by bicycle.'], verb: 'go', answers: ['goes'], distractors: ['is going', 'went', 'has gone'] },
  { title: 'Library policy', cue: 'a standing rule', segments: ['The library ', ' food near the computers.'], verb: 'not allow', answers: ['does not allow', "doesn't allow"], distractors: ['is not allowing', 'did not allow', 'will not allow'] },
  { title: 'A useful machine', cue: 'a permanent function', segments: ['This scanner ', ' both sides of a page automatically.'], verb: 'copy', answers: ['copies'], distractors: ['is copying', 'copied', 'has copied'] },
  { title: 'The school calendar', cue: 'a scheduled event', segments: ['The autumn term ', ' on September 3.'], verb: 'begin', answers: ['begins'], distractors: ['is beginning', 'began', 'will begin'] },
  { title: 'Family Sundays', cue: 'a regular family custom', segments: ['We ', ' lunch with our grandparents every Sunday.'], verb: 'have', answers: ['have'], distractors: ['are having', 'had', 'have had'] },
  { title: 'Night security', cue: 'a repeated work duty', segments: ['Two guards ', ' the entrance during the night shift.'], verb: 'watch', answers: ['watch'], distractors: ['are watching', 'watched', 'have watched'] },
  { title: 'The river route', cue: 'a stable geographical fact', segments: ['The river ', ' through three provinces before it reaches the sea.'], verb: 'flow', answers: ['flows'], distractors: ['is flowing', 'flowed', 'has flowed'] },
]

const long: EnglishEditorialGapSeed[] = [
  { title: 'Opening the neighborhood café', instruction: 'Complete the connected morning routine.', segments: ['Every morning Priya ', ' the shutters at six. Her brother ', ' the coffee machines while she ', ' the first delivery.'], entries: [['raise', ['raises']], ['check', ['checks']], ['receive', ['receives']]] },
  { title: 'A normal day at the clinic', instruction: 'Complete the connected work routine.', segments: ['Dr. Hall ', ' the appointments before breakfast. At eight, the receptionist ', ' the front desk, and the first patient usually ', ' a few minutes later.'], entries: [['review', ['reviews']], ['open', ['opens']], ['arrive', ['arrives']]] },
  { title: 'The museum timetable', instruction: 'Complete the connected public schedule.', segments: ['The museum ', ' at ten. A guide ', ' the first tour at ten thirty, and the café ', ' lunch from noon.'], entries: [['open', ['opens']], ['lead', ['leads']], ['serve', ['serves']]] },
  { title: 'Cycling to school', instruction: 'Complete the connected weekday habit.', segments: ['Leo ', ' home at seven fifteen. He ', ' his friend at the park, and they ', ' at school before eight.'], entries: [['leave', ['leaves']], ['meet', ['meets']], ['arrive', ['arrive']]] },
  { title: 'The radio newsroom', instruction: 'Complete the connected broadcast routine.', segments: ['The producer ', ' the headlines at five. The editor ', ' every name, and the presenter ', ' the bulletin live at six.'], entries: [['select', ['selects']], ['verify', ['verifies']], ['read', ['reads']]] },
  { title: 'Keeping the greenhouse healthy', instruction: 'Complete the connected maintenance routine.', segments: ['A sensor ', ' the temperature every minute. If the air gets too warm, a fan ', ' automatically, and the gardener ', ' an alert.'], entries: [['measure', ['measures']], ['start', ['starts']], ['receive', ['receives']]] },
  { title: 'Saturday football practice', instruction: 'Complete the connected team routine.', segments: ['The team ', ' at nine every Saturday. The coach ', ' a short warm-up, and the players then ', ' passing drills.'], entries: [['gather', ['gathers']], ['lead', ['leads']], ['practice', ['practice']]] },
  { title: 'How the recycling line works', instruction: 'Complete the connected process description.', segments: ['A conveyor belt ', ' the material forward. A magnet ', ' the steel, and workers ', ' the remaining items by hand.'], entries: [['carry', ['carries']], ['remove', ['removes']], ['sort', ['sort']]] },
  { title: 'Evening at the bookshop', instruction: 'Complete the connected closing routine.', segments: ['At seven the cashier ', ' the final announcement. Customers ', ' their purchases, and the manager ', ' the doors at seven fifteen.'], entries: [['make', ['makes']], ['finish', ['finish']], ['lock', ['locks']]] },
  { title: 'The island ferry', instruction: 'Complete the connected travel schedule.', segments: ['The ferry ', ' the island at six. It ', ' at two smaller ports and ', ' the mainland just before nine.'], entries: [['leave', ['leaves']], ['stop', ['stops']], ['reach', ['reaches']]] },
]

const errors: EnglishEditorialErrorSeed[] = [
  { title: 'The first café shift', pieces: [['Every morning Priya ', 'raises'], [' the shutters. Her brother ', 'checks'], [' the machines, and the baker ', 'bring']], after: ' fresh bread.', wrong: 2, answers: ['brings'], reason: 'the singular subject baker requires brings' },
  { title: 'Clinic reception', pieces: [['Dr. Hall ', 'reviews'], [' the list. The receptionist ', 'open'], [' the desk, and patients ', 'wait']], after: ' nearby.', wrong: 1, answers: ['opens'], reason: 'the singular subject receptionist requires opens' },
  { title: 'A scheduled tour', pieces: [['The museum ', 'opens'], [' at ten. The guide ', 'starts'], [' at ten thirty, and the visitors ', 'follows']], after: ' her upstairs.', wrong: 2, answers: ['follow'], reason: 'the plural subject visitors requires the base form follow' },
  { title: 'Leo’s morning ride', pieces: [['Leo ', 'leave'], [' home at seven. He ', 'meets'], [' Nina, and they ', 'cycle']], after: ' to school.', wrong: 0, answers: ['leaves'], reason: 'the singular subject Leo requires leaves' },
  { title: 'The six o’clock bulletin', pieces: [['The producer ', 'selects'], [' the stories. The editor ', 'check'], [' the facts, and the presenter ', 'reads']], after: ' them live.', wrong: 1, answers: ['checks'], reason: 'the singular subject editor requires checks' },
  { title: 'Greenhouse controls', pieces: [['A sensor ', 'measures'], [' the heat. The fan ', 'starts'], [' automatically, and two vents ', 'opens']], after: ' at the top.', wrong: 2, answers: ['open'], reason: 'the plural subject vents requires open' },
  { title: 'Football practice', pieces: [['The team ', 'gather'], [' at nine. The coach ', 'leads'], [' the warm-up, and the players ', 'practice']], after: ' passing.', wrong: 0, answers: ['gathers'], reason: 'team is treated as a singular unit in this text' },
  { title: 'The recycling line', pieces: [['The belt ', 'carries'], [' the waste. A magnet ', 'remove'], [' the steel, and workers ', 'sort']], after: ' the rest.', wrong: 1, answers: ['removes'], reason: 'the singular subject magnet requires removes' },
  { title: 'Closing the shop', pieces: [['The cashier ', 'makes'], [' an announcement. Customers ', 'finish'], [' paying, and the manager ', 'lock']], after: ' the doors.', wrong: 2, answers: ['locks'], reason: 'the singular subject manager requires locks' },
  { title: 'The morning ferry', pieces: [['The ferry ', 'leave'], [' at six. It ', 'stops'], [' twice and commuters ', 'reach']], after: ' the city before nine.', wrong: 0, answers: ['leaves'], reason: 'the singular subject ferry requires leaves' },
]

const sequences: EnglishEditorialSequenceSeed[] = [
  { events: ['Priya raises the shutters', 'Her brother checks the machines', 'The baker brings the bread'], target: 0 },
  { events: ['Dr. Hall reviews the list', 'The receptionist opens the desk', 'The first patient arrives'], target: 1 },
  { events: ['The museum opens', 'A guide starts the tour', 'The café serves lunch'], target: 2 },
  { events: ['Leo leaves home', 'He meets Nina at the park', 'They arrive at school'], target: 0 },
  { events: ['The producer selects the stories', 'The editor verifies the facts', 'The presenter reads the bulletin'], target: 1 },
  { events: ['The sensor measures the heat', 'The fan starts', 'The gardener receives an alert'], target: 2 },
  { events: ['The team gathers', 'The coach leads the warm-up', 'The players practice passing'], target: 0 },
  { events: ['The belt carries the material', 'The magnet removes the steel', 'Workers sort the rest'], target: 1 },
  { events: ['The cashier makes an announcement', 'Customers finish paying', 'The manager locks the doors'], target: 2 },
  { events: ['The ferry leaves the island', 'It stops at two ports', 'It reaches the mainland'], target: 0 },
]

const final: EnglishEditorialFinalSeed[] = [
  { before: 'Every dawn the lighthouse keeper ', after: ' the main lens before checking the radio.', answer: 'cleans', distractors: ['is cleaning', 'cleaned', 'will clean'] },
  { before: 'The university shuttle ', after: ' outside the library every twenty minutes.', answer: 'stops', distractors: ['is stopping', 'stopped', 'has stopped'] },
  { before: 'Our accounting system automatically ', after: ' a receipt after each payment.', answer: 'creates', distractors: ['is creating', 'created', 'will create'] },
  { before: 'My neighbors ', after: ' their vegetable stall on Saturdays.', answer: 'run', distractors: ['are running', 'ran', 'have run'] },
  { before: 'The moon ', after: ' light from the sun rather than producing its own.', answer: 'reflects', distractors: ['is reflecting', 'reflected', 'has reflected'] },
  { before: 'This door ', after: ' when the green indicator appears.', answer: 'unlocks', distractors: ['is unlocking', 'unlocked', 'will unlock'] },
  { before: 'The coastal path ', after: ' at the old watchtower.', answer: 'ends', distractors: ['is ending', 'ended', 'has ended'] },
  { before: 'Our choir ', after: ' in the community hall every Thursday.', answer: 'rehearses', distractors: ['is rehearsing', 'rehearsed', 'will rehearse'] },
  { before: 'Two technicians ', after: ' the backup generator once a month.', answer: 'test', distractors: ['are testing', 'tested', 'have tested'] },
  { before: 'The winter exhibition ', after: ' on the first Monday of December.', answer: 'opens', distractors: ['is opening', 'opened', 'will open'] },
]

export const ENGLISH_PRESENT_SIMPLE_EDITORIAL = createEnglishEditorialPack({
  slug: 'present-simple',
  form: 'present-simple',
  focus: 'Present simple',
  rule: 'Use the present simple for routines, stable facts, regular processes and official schedules.',
  micro,
  long,
  errors,
  sequences,
  final,
})
