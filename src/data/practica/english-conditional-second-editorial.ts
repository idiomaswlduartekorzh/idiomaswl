import { createEnglishEditorialPack, type EnglishEditorialErrorSeed, type EnglishEditorialFinalSeed, type EnglishEditorialGapSeed, type EnglishEditorialMicroSeed, type EnglishEditorialSequenceSeed } from './english-editorial-builder.ts'

const micro: EnglishEditorialMicroSeed[] = [
  { title: 'More vacation time', cue: 'an unreal present result', segments: ['If I had more vacation time, I ', ' more.'], verb: 'travel', answers: ['would travel'], distractors: ['will travel', 'traveled', 'would have traveled'] },
  { title: 'A remote position', cue: 'a hypothetical present condition', segments: ['She would apply if the position ', ' remote.'], verb: 'be', answers: ['were'], distractors: ['is', 'will be', 'had been'] },
  { title: 'Living closer', cue: 'an unlikely present situation', segments: ['If we lived closer, we ', ' you every week.'], verb: 'visit', answers: ['would visit'], distractors: ['will visit', 'visited', 'would have visited'] },
  { title: 'A larger classroom', cue: 'a hypothetical present result', segments: ['If the classroom were larger, the teacher ', ' group projects.'], verb: 'assign', answers: ['would assign'], distractors: ['will assign', 'assigned', 'would have assigned'] },
  { title: 'Knowing the answer', cue: 'an unreal present condition', segments: ['I would tell you if I ', ' the answer.'], verb: 'know', answers: ['knew'], distractors: ['know', 'will know', 'had known'] },
  { title: 'An unlikely lottery win', cue: 'an imagined future result', segments: ['If Maya won the prize, she ', ' the community library.'], verb: 'support', answers: ['would support'], distractors: ['will support', 'supported', 'would have supported'] },
  { title: 'Being in your place', cue: 'hypothetical advice with were', segments: ['If I ', ' you, I would check the contract again.'], verb: 'be', answers: ['were'], distractors: ['am', 'will be', 'had been'] },
  { title: 'More reliable buses', cue: 'an unreal present result', segments: ['People ', ' less if buses were more reliable.'], verb: 'drive', answers: ['would drive'], distractors: ['will drive', 'drove', 'would have driven'] },
  { title: 'A quieter office', cue: 'a hypothetical present condition', segments: ['We would focus better if the office ', ' quieter.'], verb: 'be', answers: ['were'], distractors: ['is', 'will be', 'had been'] },
  { title: 'No internet access', cue: 'an imagined present result', segments: ['If the town had no internet, local businesses ', ' customers.'], verb: 'lose', answers: ['would lose'], distractors: ['will lose', 'lost', 'would have lost'] },
]

const long: EnglishEditorialGapSeed[] = [
  { title: 'Imagining a car-free center', instruction: 'Complete the connected hypothetical proposal.', segments: ['If the city closed the central avenue, buses ', ' faster. More people would cycle if bike lanes ', ' safer, and local cafés ', ' more outdoor space.'], entries: [['move', ['would move']], ['be', ['were']], ['gain', ['would gain']]] },
  { title: 'A larger community library', instruction: 'Complete the connected unreal present scenario.', segments: ['If the library had another floor, it ', ' a media lab. Students would stay longer if study rooms ', ' available, and staff ', ' more workshops.'], entries: [['create', ['would create']], ['be', ['were']], ['offer', ['would offer']]] },
  { title: 'Working from a remote island', instruction: 'Complete the connected imagined situation.', segments: ['If I lived on the island, I ', ' before sunrise. I would use satellite internet if the signal ', ' stable, and my team ', ' me online each afternoon.'], entries: [['work', ['would work']], ['be', ['were']], ['meet', ['would meet']]] },
  { title: 'A school with a bigger garden', instruction: 'Complete the connected hypothetical plan.', segments: ['If the school owned more land, students ', ' vegetables. Teachers would hold science lessons outside if the weather ', ' mild, and families ', ' weekend markets.'], entries: [['grow', ['would grow']], ['remain', ['remained']], ['organize', ['would organize']]] },
  { title: 'Imagining a quieter airport', instruction: 'Complete the connected unreal scenario.', segments: ['If aircraft were quieter, nearby residents ', ' better. The airport would extend night service if noise ', ' lower, and airlines ', ' more late flights.'], entries: [['sleep', ['would sleep']], ['be', ['were']], ['schedule', ['would schedule']]] },
  { title: 'A museum without admission fees', instruction: 'Complete the connected hypothetical consequences.', segments: ['If entry were free, more families ', '. The museum would need more guides if attendance ', ', and donors ', ' a larger role.'], entries: [['visit', ['would visit']], ['increase', ['increased']], ['play', ['would play']]] },
  { title: 'Living near the mountains', instruction: 'Complete the connected imagined lifestyle.', segments: ['If we lived near the mountains, we ', ' every weekend. I would learn climbing if a local club ', ' beginner courses, and Maya ', ' nature photographs.'], entries: [['hike', ['would hike']], ['offer', ['offered']], ['take', ['would take']]] },
  { title: 'A more flexible workplace', instruction: 'Complete the connected hypothetical policy.', segments: ['If employees chose their hours, they ', ' peak traffic. Teams would meet less often if updates ', ' clearer, and managers ', ' results instead of attendance.'], entries: [['avoid', ['would avoid']], ['be', ['were']], ['measure', ['would measure']]] },
  { title: 'Imagining an electric bus fleet', instruction: 'Complete the connected unreal present scenario.', segments: ['If every bus were electric, the city ', ' less fuel. Air quality would improve if old engines ', ', and passengers ', ' quieter journeys.'], entries: [['use', ['would use']], ['disappear', ['disappeared']], ['enjoy', ['would enjoy']]] },
  { title: 'A year with unlimited study time', instruction: 'Complete the connected imagined choices.', segments: ['If Leo had a free year, he ', ' marine biology. He would volunteer at the aquarium if it ', ' him, and he ', ' a field journal.'], entries: [['study', ['would study']], ['accept', ['accepted']], ['keep', ['would keep']]] },
]

const errors: EnglishEditorialErrorSeed[] = [
  { title: 'Car-free center', pieces: [['If the avenue closed, buses ', 'will move'], [' faster. People would cycle if lanes ', 'were'], [' safer, and cafés ', 'would gain']], after: ' space.', wrong: 0, answers: ['would move'], reason: 'an unreal present result uses would, not will' },
  { title: 'Bigger library', pieces: [['If the library had space, it ', 'would create'], [' a lab. Students would stay if rooms ', 'are'], [' available, and staff ', 'would offer']], after: ' workshops.', wrong: 1, answers: ['were'], reason: 'the hypothetical if-clause uses a past form' },
  { title: 'Island work', pieces: [['If I lived there, I ', 'would work'], [' early. I would use satellite service if it ', 'were'], [' stable, and my team ', 'will meet']], after: ' me online.', wrong: 2, answers: ['would meet'], reason: 'an unreal present result uses would, not will' },
  { title: 'School garden', pieces: [['If the school owned land, students ', 'will grow'], [' food. Teachers would teach outside if weather ', 'remained'], [' mild, and families ', 'would organize']], after: ' markets.', wrong: 0, answers: ['would grow'], reason: 'an unreal present result uses would, not will' },
  { title: 'Quieter airport', pieces: [['If aircraft were quieter, residents ', 'would sleep'], [' better. Service would extend if noise ', 'is'], [' lower, and airlines ', 'would schedule']], after: ' flights.', wrong: 1, answers: ['were'], reason: 'the hypothetical if-clause uses were' },
  { title: 'Free museum', pieces: [['If entry were free, families ', 'would visit'], ['. The museum would need guides if attendance ', 'increased'], [', and donors ', 'will play']], after: ' a larger role.', wrong: 2, answers: ['would play'], reason: 'an unreal present result uses would, not will' },
  { title: 'Mountain life', pieces: [['If we lived nearby, we ', 'will hike'], [' weekly. I would climb if a club ', 'offered'], [' courses, and Maya ', 'would take']], after: ' photographs.', wrong: 0, answers: ['would hike'], reason: 'an unreal present result uses would, not will' },
  { title: 'Flexible workplace', pieces: [['If employees chose hours, they ', 'would avoid'], [' traffic. Teams would meet less if updates ', 'are'], [' clearer, and managers ', 'would measure']], after: ' results.', wrong: 1, answers: ['were'], reason: 'the hypothetical if-clause uses were' },
  { title: 'Electric buses', pieces: [['If buses were electric, the city ', 'would use'], [' less fuel. Air would improve if old engines ', 'disappeared'], [', and passengers ', 'will enjoy']], after: ' quiet journeys.', wrong: 2, answers: ['would enjoy'], reason: 'an unreal present result uses would, not will' },
  { title: 'A free study year', pieces: [['If Leo had a free year, he ', 'will study'], [' biology. He would volunteer if the aquarium ', 'accepted'], [' him, and he ', 'would keep']], after: ' a journal.', wrong: 0, answers: ['would study'], reason: 'an imagined result uses would, not will' },
]

const sequences: EnglishEditorialSequenceSeed[] = [
  { events: ['If the avenue closed, buses would move faster', 'If lanes were safer, more people would cycle', 'If space opened, cafés would add tables'], target: 0 },
  { events: ['If the library had space, it would create a lab', 'If rooms were available, students would stay', 'If attendance grew, staff would offer workshops'], target: 1 },
  { events: ['If I lived on the island, I would work early', 'If the signal were stable, I would use satellite internet', 'If schedules aligned, my team would meet me online'], target: 2 },
  { events: ['If the school owned land, students would grow food', 'If weather remained mild, teachers would work outside', 'If families joined, they would organize markets'], target: 0 },
  { events: ['If aircraft were quieter, residents would sleep better', 'If noise were lower, the airport would extend service', 'If service extended, airlines would schedule late flights'], target: 1 },
  { events: ['If entry were free, more families would visit', 'If attendance increased, the museum would need guides', 'If costs rose, donors would play a larger role'], target: 2 },
  { events: ['If we lived near the mountains, we would hike weekly', 'If a club offered courses, I would learn climbing', 'If we explored more, Maya would take photographs'], target: 0 },
  { events: ['If employees chose hours, they would avoid traffic', 'If updates were clearer, teams would meet less', 'If attendance mattered less, managers would measure results'], target: 1 },
  { events: ['If buses were electric, the city would use less fuel', 'If old engines disappeared, air would improve', 'If buses were quieter, passengers would enjoy journeys'], target: 2 },
  { events: ['If Leo had a free year, he would study biology', 'If the aquarium accepted him, he would volunteer', 'If he joined the team, he would keep a journal'], target: 0 },
]

const final: EnglishEditorialFinalSeed[] = [
  { before: 'If I spoke Mandarin, I ', after: ' for that position.', answer: 'would apply', distractors: ['will apply', 'applied', 'would have applied'] },
  { before: 'The garden would produce more food if it ', after: ' sunnier.', answer: 'were', distractors: ['is', 'will be', 'had been'] },
  { before: 'If we owned a larger van, we ', after: ' all the equipment at once.', answer: 'would carry', distractors: ['will carry', 'carried', 'would have carried'] },
  { before: 'Maya would cycle to work if the route ', after: ' safer.', answer: 'were', distractors: ['is', 'will be', 'had been'] },
  { before: 'If the town had a theater, local groups ', after: ' there.', answer: 'would perform', distractors: ['will perform', 'performed', 'would have performed'] },
  { before: 'I would take the earlier train if it ', after: ' at our station.', answer: 'stopped', distractors: ['stops', 'will stop', 'had stopped'] },
  { before: 'If the software were simpler, more customers ', after: ' it.', answer: 'would use', distractors: ['will use', 'used', 'would have used'] },
  { before: 'We would spend more time outside if the air ', after: ' cleaner.', answer: 'were', distractors: ['is', 'will be', 'had been'] },
  { before: 'If Leo knew the director, he ', after: ' for an introduction.', answer: 'would ask', distractors: ['will ask', 'asked', 'would have asked'] },
  { before: 'The clinic would open later if demand ', after: ' higher.', answer: 'were', distractors: ['is', 'will be', 'had been'] },
]

export const ENGLISH_CONDITIONAL_SECOND_EDITORIAL = createEnglishEditorialPack({ slug: 'conditional-second', form: 'conditional-second', focus: 'Second conditional', rule: 'Use the second conditional for unreal or unlikely present and future situations: past form in the condition and would plus base verb in the result.', micro, long, errors, sequences, final, choicePositions: [0, 1, 2, 3, 1, 2, 3, 1, 2, 3] })
