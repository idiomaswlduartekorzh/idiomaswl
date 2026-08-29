import { createEnglishEditorialPack, type EnglishEditorialErrorSeed, type EnglishEditorialFinalSeed, type EnglishEditorialGapSeed, type EnglishEditorialMicroSeed, type EnglishEditorialSequenceSeed } from './english-editorial-builder.ts'

const micro: EnglishEditorialMicroSeed[] = [
  { title: 'A personal prediction', cue: 'a prediction introduced by I think', segments: ['I think the plan ', '.'], verb: 'work', answers: ['will work'], distractors: ['works', 'is working', 'has worked'] },
  { title: 'The ringing phone', cue: 'a decision made at the moment of speaking', segments: ['The phone is ringing—I ', ' it.'], verb: 'answer', answers: ['will answer'], distractors: ['answer', 'am answering', 'have answered'] },
  { title: 'A promise', cue: 'a promise about future conduct', segments: ['Do not worry; I ', ' your secret.'], verb: 'keep', answers: ['will keep'], distractors: ['keep', 'am keeping', 'have kept'] },
  { title: 'An offer of help', cue: 'a spontaneous offer', segments: ['Those boxes look heavy. We ', ' you carry them.'], verb: 'help', answers: ['will help'], distractors: ['help', 'are helping', 'have helped'] },
  { title: 'A weather forecast', cue: 'a neutral prediction about tomorrow', segments: ['Temperatures ', ' below zero tomorrow night.'], verb: 'fall', answers: ['will fall'], distractors: ['fall', 'are falling', 'have fallen'] },
  { title: 'A refusal', cue: 'a refusal to perform a future action', segments: ['The old printer ', ' properly, no matter what I try.'], verb: 'not work', answers: ['will not work', "won't work"], distractors: ['does not work', 'is not working', 'has not worked'] },
  { title: 'An immediate decision', cue: 'a decision made after hearing new information', segments: ['You are cold? I ', ' the window.'], verb: 'close', answers: ['will close'], distractors: ['close', 'am closing', 'have closed'] },
  { title: 'A likely result', cue: 'a prediction based on opinion', segments: ['I am sure the audience ', ' this ending.'], verb: 'love', answers: ['will love'], distractors: ['loves', 'is loving', 'has loved'] },
  { title: 'A formal assurance', cue: 'an assurance about future contact', segments: ['A member of our team ', ' you within one business day.'], verb: 'contact', answers: ['will contact'], distractors: ['contacts', 'is contacting', 'has contacted'] },
  { title: 'An offer to pay', cue: 'a voluntary decision made now', segments: ['You bought the tickets, so I ', ' for dinner.'], verb: 'pay', answers: ['will pay'], distractors: ['pay', 'am paying', 'have paid'] },
]

const long: EnglishEditorialGapSeed[] = [
  { title: 'A decision during the meeting', instruction: 'Complete the spontaneous decisions and promise.', segments: ['The projector has failed, so I ', ' the slides from my laptop. Marta ', ' the handouts, and we ', ' everyone the full file afterward.'], entries: [['show', ['will show']], ['distribute', ['will distribute']], ['send', ['will send']]] },
  { title: 'Helping after a flat tire', instruction: 'Complete the offers made at the roadside.', segments: ['I ', ' the warning triangle. Leo ', ' the spare tire, and our friends ', ' the mechanic.'], entries: [['place', ['will place']], ['find', ['will find']], ['call', ['will call']]] },
  { title: 'Predictions for the new park', instruction: 'Complete the neutral predictions.', segments: ['The new trees ', ' shade within a few years. Families ', ' the paths, and nearby shops ', ' more weekend customers.'], entries: [['provide', ['will provide']], ['use', ['will use']], ['receive', ['will receive']]] },
  { title: 'A promise to the client', instruction: 'Complete the connected assurances.', segments: ['We ', ' the figures today. Our designer ', ' the diagram, and I ', ' the revised proposal before five.'], entries: [['verify', ['will verify']], ['update', ['will update']], ['send', ['will send']]] },
  { title: 'Decisions when a guest arrives', instruction: 'Complete the immediate decisions.', segments: ['The doorbell is ringing. I ', ' the door, you ', ' the coffee, and Nina ', ' another chair.'], entries: [['open', ['will open']], ['bring', ['will bring']], ['find', ['will find']]] },
  { title: 'A forecast for the coast', instruction: 'Complete the connected forecast.', segments: ['Clouds ', ' overnight. Winds ', ' after midnight, and heavy rain ', ' the northern coast by dawn.'], entries: [['increase', ['will increase']], ['strengthen', ['will strengthen']], ['reach', ['will reach']]] },
  { title: 'Offering support at the event', instruction: 'Complete the voluntary offers.', segments: ['I ', ' visitors at the entrance. Marta ', ' questions near the stage, and our volunteers ', ' anyone who needs directions.'], entries: [['welcome', ['will welcome']], ['answer', ['will answer']], ['assist', ['will assist']]] },
  { title: 'The engineer’s assurance', instruction: 'Complete the connected assurances.', segments: ['The patch ', ' the login error. It ', ' existing passwords, and the update ', ' less than five minutes.'], entries: [['fix', ['will fix']], ['preserve', ['will preserve']], ['take', ['will take']]] },
  { title: 'A family decision at dinner', instruction: 'Complete the decisions made now.', segments: ['The kitchen is messy, so I ', ' the dishes. Dad ', ' the leftovers, and the children ', ' the table.'], entries: [['wash', ['will wash']], ['store', ['will store']], ['clear', ['will clear']]] },
  { title: 'Predictions for the final', instruction: 'Complete the opinions about the match.', segments: ['I think our defense ', ' firm. The midfield ', ' more chances, and the captain ', ' the decisive goal.'], entries: [['remain', ['will remain']], ['create', ['will create']], ['score', ['will score']]] },
]

const errors: EnglishEditorialErrorSeed[] = [
  { title: 'Meeting decisions', pieces: [['I ', 'will showing'], [' the slides. Marta ', 'will distribute'], [' handouts, and we ', 'will send']], after: ' the file later.', wrong: 0, answers: ['will show'], reason: 'will is followed by the base form show' },
  { title: 'Roadside offers', pieces: [['I ', 'will place'], [' the triangle. Leo ', 'will finds'], [' the tire, and our friends ', 'will call']], after: ' the mechanic.', wrong: 1, answers: ['will find'], reason: 'will is followed by the base form find' },
  { title: 'Park predictions', pieces: [['Trees ', 'will provide'], [' shade. Families ', 'will use'], [' paths, and shops ', 'will received']], after: ' more customers.', wrong: 2, answers: ['will receive'], reason: 'will is followed by the base form receive' },
  { title: 'Client assurances', pieces: [['We ', 'will verifying'], [' the figures. The designer ', 'will update'], [' the diagram, and I ', 'will send']], after: ' the proposal.', wrong: 0, answers: ['will verify'], reason: 'will is followed by the base form verify' },
  { title: 'The doorbell', pieces: [['I ', 'will open'], [' the door. You ', 'will brings'], [' coffee, and Nina ', 'will find']], after: ' a chair.', wrong: 1, answers: ['will bring'], reason: 'will is followed by the base form bring' },
  { title: 'Coastal forecast', pieces: [['Clouds ', 'will increase'], ['. Winds ', 'will strengthen'], [', and rain ', 'will reaching']], after: ' the coast.', wrong: 2, answers: ['will reach'], reason: 'will is followed by the base form reach' },
  { title: 'Event support', pieces: [['I ', 'will welcoming'], [' visitors. Marta ', 'will answer'], [' questions, and volunteers ', 'will assist']], after: ' guests.', wrong: 0, answers: ['will welcome'], reason: 'will is followed by the base form welcome' },
  { title: 'Software assurance', pieces: [['The patch ', 'will fix'], [' the error. It ', 'will preserves'], [' passwords, and the update ', 'will take']], after: ' five minutes.', wrong: 1, answers: ['will preserve'], reason: 'will is followed by the base form preserve' },
  { title: 'Cleaning decisions', pieces: [['I ', 'will wash'], [' dishes. Dad ', 'will store'], [' food, and the children ', 'will cleared']], after: ' the table.', wrong: 2, answers: ['will clear'], reason: 'will is followed by the base form clear' },
  { title: 'Match predictions', pieces: [['Our defense ', 'will remaining'], [' firm. The midfield ', 'will create'], [' chances, and the captain ', 'will score']], after: '.', wrong: 0, answers: ['will remain'], reason: 'will is followed by the base form remain' },
]

const sequences: EnglishEditorialSequenceSeed[] = [
  { events: ['I will show the slides', 'Marta will distribute the handouts', 'We will send the file'], target: 0 },
  { events: ['I will place the triangle', 'Leo will find the spare tire', 'Our friends will call the mechanic'], target: 1 },
  { events: ['Trees will provide shade', 'Families will use the paths', 'Shops will receive more customers'], target: 2 },
  { events: ['We will verify the figures', 'The designer will update the diagram', 'I will send the proposal'], target: 0 },
  { events: ['I will open the door', 'You will bring the coffee', 'Nina will find a chair'], target: 1 },
  { events: ['Clouds will increase', 'Winds will strengthen', 'Rain will reach the coast'], target: 2 },
  { events: ['I will welcome visitors', 'Marta will answer questions', 'Volunteers will assist guests'], target: 0 },
  { events: ['The patch will fix the error', 'It will preserve passwords', 'The update will take five minutes'], target: 1 },
  { events: ['I will wash the dishes', 'Dad will store the food', 'The children will clear the table'], target: 2 },
  { events: ['Our defense will remain firm', 'The midfield will create chances', 'The captain will score'], target: 0 },
]

const final: EnglishEditorialFinalSeed[] = [
  { before: 'I think this route ', after: ' us at least twenty minutes.', answer: 'will save', distractors: ['saves', 'is saving', 'has saved'] },
  { before: 'The kettle is boiling; I ', after: ' the tea.', answer: 'will make', distractors: ['make', 'am making', 'have made'] },
  { before: 'I promise I ', after: ' you as soon as the results arrive.', answer: 'will call', distractors: ['call', 'am calling', 'have called'] },
  { before: 'Those bags are heavy. We ', after: ' them upstairs.', answer: 'will carry', distractors: ['carry', 'are carrying', 'have carried'] },
  { before: 'Analysts expect fuel prices ', after: ' again next quarter.', answer: 'will rise', distractors: ['rise', 'are rising', 'have risen'] },
  { before: 'The lock is frozen and ', after: ', despite all our attempts.', answer: 'will not open', distractors: ['does not open', 'is not opening', 'has not opened'] },
  { before: 'You forgot your umbrella? I ', after: ' mine with you.', answer: 'will share', distractors: ['share', 'am sharing', 'have shared'] },
  { before: 'I am certain the judges ', after: ' her final design.', answer: 'will admire', distractors: ['admire', 'are admiring', 'have admired'] },
  { before: 'Our support team ', after: ' within twenty-four hours.', answer: 'will respond', distractors: ['responds', 'is responding', 'has responded'] },
  { before: 'You cooked tonight, so I ', after: ' the kitchen.', answer: 'will clean', distractors: ['clean', 'am cleaning', 'have cleaned'] },
]

export const ENGLISH_FUTURE_WILL_EDITORIAL = createEnglishEditorialPack({ slug: 'future-will', form: 'future-will', focus: 'Future with will', rule: 'Use will for neutral predictions, spontaneous decisions, offers, promises, refusals and formal assurances.', micro, long, errors, sequences, final })
