import { createEnglishEditorialPack, type EnglishEditorialChoiceSeed, type EnglishEditorialErrorSeed, type EnglishEditorialFinalSeed, type EnglishEditorialGapSeed, type EnglishEditorialMicroSeed, type EnglishEditorialSequenceSeed } from './english-editorial-builder.ts'

const micro: EnglishEditorialMicroSeed[] = [
  { title: 'The next corner', cue: 'a direct navigation instruction', segments: ['', ' left at the next corner.'], verb: 'turn', answers: ['Turn'], distractors: ['Turns', 'To turn', 'Will turn'] },
  { title: 'Electrical safety', cue: 'a negative direct command', segments: ['', ' that wire with wet hands.'], verb: 'not touch', answers: ['Do not touch', "Don't touch"], distractors: ['Not touch', 'Does not touch', 'To not touch'] },
  { title: 'A polite request', cue: 'a polite instruction with please', segments: ['Please ', ' patient while the file loads.'], verb: 'be', answers: ['be'], distractors: ['are', 'to be', 'will be'] },
  { title: 'Saving a document', cue: 'a direct software instruction', segments: ['', ' the file before closing the program.'], verb: 'save', answers: ['Save'], distractors: ['Saves', 'To save', 'Saved'] },
  { title: 'Keep the exit clear', cue: 'a negative safety instruction', segments: ['', ' boxes in front of this door.'], verb: 'not leave', answers: ['Do not leave', "Don't leave"], distractors: ['Not leave', 'Does not leave', 'To not leave'] },
  { title: 'Entering a code', cue: 'a polite direct instruction', segments: ['Please ', ' the six-digit code below.'], verb: 'enter', answers: ['enter'], distractors: ['enters', 'to enter', 'entered'] },
  { title: 'Following the guide', cue: 'a direct group instruction', segments: ['', ' the guide through the blue door.'], verb: 'follow', answers: ['Follow'], distractors: ['Follows', 'To follow', 'Following'] },
  { title: 'Protecting a password', cue: 'a negative instruction', segments: ['', ' your password with anyone.'], verb: 'not share', answers: ['Do not share', "Don't share"], distractors: ['Not share', 'Does not share', 'To not share'] },
  { title: 'Checking the label', cue: 'a direct procedural instruction', segments: ['', ' the label before using the product.'], verb: 'check', answers: ['Check'], distractors: ['Checks', 'To check', 'Checked'] },
  { title: 'Staying seated', cue: 'a polite safety request', segments: ['Please ', ' seated until the light turns off.'], verb: 'remain', answers: ['remain'], distractors: ['remains', 'to remain', 'remained'] },
]

const long: EnglishEditorialGapSeed[] = [
  { title: 'Starting the backup generator', instruction: 'Complete the connected safety procedure.', segments: ['', ' the main switch first. ', ' the fuel level, and ', ' the starter until the green light appears.'], entries: [['turn off', ['Turn off']], ['check', ['Check']], ['hold', ['hold']]] },
  { title: 'Submitting the online form', instruction: 'Complete the connected digital procedure.', segments: ['', ' every required field. ', ' the attached file, and ', ' Submit only once.'], entries: [['complete', ['Complete']], ['review', ['Review']], ['click', ['click']]] },
  { title: 'Leaving the laboratory', instruction: 'Complete the connected closing procedure.', segments: ['', ' the samples in the refrigerator. ', ' the workbench, and ', ' the door behind you.'], entries: [['place', ['Place']], ['clean', ['Clean']], ['lock', ['lock']]] },
  { title: 'Responding to a fire alarm', instruction: 'Complete the connected emergency procedure.', segments: ['', ' the nearest marked exit. ', ' the lifts, and ', ' outside at the assembly point.'], entries: [['use', ['Use']], ['not use', ['Do not use', "Don't use"]], ['wait', ['wait']]] },
  { title: 'Preparing a video call', instruction: 'Complete the connected setup procedure.', segments: ['', ' your microphone before joining. ', ' a quiet room, and ', ' the meeting link five minutes early.'], entries: [['test', ['Test']], ['choose', ['Choose']], ['open', ['open']]] },
  { title: 'Cleaning the coffee machine', instruction: 'Complete the connected maintenance procedure.', segments: ['', ' the machine from the outlet. ', ' the removable tray, and ', ' water into the motor housing.'], entries: [['disconnect', ['Disconnect']], ['wash', ['Wash']], ['not pour', ['do not pour', "don't pour"]]] },
  { title: 'Checking in at the clinic', instruction: 'Complete the connected visitor instructions.', segments: ['', ' your identification at reception. ', ' the short form, and ', ' near the blue sign.'], entries: [['show', ['Show']], ['complete', ['Complete']], ['wait', ['wait']]] },
  { title: 'Packing a fragile object', instruction: 'Complete the connected packing procedure.', segments: ['', ' the object in soft paper. ', ' it in the center of the box, and ', ' empty spaces with padding.'], entries: [['wrap', ['Wrap']], ['place', ['Place']], ['fill', ['fill']]] },
  { title: 'Crossing the workshop floor', instruction: 'Complete the connected safety instructions.', segments: ['', ' inside the marked walkway. ', ' moving equipment, and ', ' the supervisor’s signals.'], entries: [['stay', ['Stay']], ['not approach', ['Do not approach', "Don't approach"]], ['follow', ['follow']]] },
  { title: 'Recording an interview', instruction: 'Complete the connected recording procedure.', segments: ['', ' the participant’s permission. ', ' the recorder on a stable surface, and ', ' the file before leaving.'], entries: [['confirm', ['Confirm']], ['place', ['Place']], ['save', ['save']]] },
]

const errors: EnglishEditorialErrorSeed[] = [
  { title: 'Generator procedure', pieces: [['First, ', 'Turns off'], [' the switch. Then ', 'Check'], [' the fuel and ', 'hold']], after: ' the starter.', wrong: 0, answers: ['Turn off'], reason: 'a direct instruction uses the base form Turn off' },
  { title: 'Online form', pieces: [['First, ', 'Complete'], [' each field. Next, ', 'To review'], [' the file and ', 'click']], after: ' Submit.', wrong: 1, answers: ['Review'], reason: 'a direct instruction uses the base form Review' },
  { title: 'Leaving the lab', pieces: [['First, ', 'Place'], [' samples in the refrigerator. Then ', 'Clean'], [' the bench and ', 'locks']], after: ' the door.', wrong: 2, answers: ['lock'], reason: 'a direct instruction uses the base form lock' },
  { title: 'Fire alarm', pieces: [['First, ', 'Uses'], [' the marked exit. ', 'Do not use'], [' lifts, and ', 'wait']], after: ' outside.', wrong: 0, answers: ['Use'], reason: 'a direct instruction uses the base form Use' },
  { title: 'Video call', pieces: [['First, ', 'Test'], [' the microphone. Then ', 'Choosing'], [' a quiet room and ', 'open']], after: ' the link.', wrong: 1, answers: ['Choose'], reason: 'a direct instruction uses the base form Choose' },
  { title: 'Coffee machine', pieces: [['First, ', 'Disconnect'], [' the machine. Then ', 'Wash'], [' the tray and ', 'Not pour']], after: ' water into the motor.', wrong: 2, answers: ['do not pour', "don't pour"], reason: 'a negative imperative uses do not plus the base verb' },
  { title: 'Clinic check-in', pieces: [['First, ', 'Shows'], [' identification. Then ', 'Complete'], [' the form and ', 'wait']], after: ' by the sign.', wrong: 0, answers: ['Show'], reason: 'a direct instruction uses the base form Show' },
  { title: 'Fragile packing', pieces: [['First, ', 'Wrap'], [' the object. Then ', 'To place'], [' it centrally and ', 'fill']], after: ' empty spaces.', wrong: 1, answers: ['Place'], reason: 'a direct instruction uses the base form Place' },
  { title: 'Workshop walkway', pieces: [['First, ', 'Stay'], [' in the walkway. ', 'Do not approach'], [' equipment, and ', 'follows']], after: ' signals.', wrong: 2, answers: ['follow'], reason: 'a direct instruction uses the base form follow' },
  { title: 'Interview recording', pieces: [['First, ', 'Confirms'], [' permission. Then ', 'Place'], [' the recorder and ', 'save']], after: ' the file.', wrong: 0, answers: ['Confirm'], reason: 'a direct instruction uses the base form Confirm' },
]

const sequences: EnglishEditorialSequenceSeed[] = [
  { events: ['Turn off the main switch', 'Check the fuel level', 'Hold the starter'], target: 0 },
  { events: ['Complete every field', 'Review the attached file', 'Click Submit once'], target: 1 },
  { events: ['Place samples in the refrigerator', 'Clean the workbench', 'Lock the door'], target: 2 },
  { events: ['Use the marked exit', 'Do not use the lifts', 'Wait at the assembly point'], target: 0 },
  { events: ['Test the microphone', 'Choose a quiet room', 'Open the link early'], target: 1 },
  { events: ['Disconnect the machine', 'Wash the tray', 'Do not pour water into the motor'], target: 2 },
  { events: ['Show your identification at reception', 'Complete the form', 'Wait by the blue sign'], target: 0 },
  { events: ['Wrap the object', 'Place it in the box', 'Fill empty spaces'], target: 1 },
  { events: ['Stay on the walkway', 'Do not approach equipment', 'Follow the supervisor’s signals'], target: 2 },
  { events: ['Confirm permission before recording', 'Place the recorder securely', 'Save the file'], target: 0 },
]

const final: EnglishEditorialFinalSeed[] = [
  { verb: 'press', before: '', after: ' the blue button to begin.', answer: 'Press', distractors: ['Presses', 'To press', 'Pressed'] },
  { verb: 'take', before: '', after: ' this medicine on an empty stomach.', answer: 'Do not take', distractors: ['Not take', 'Does not take', 'To not take'] },
  { verb: 'write', before: 'Please ', after: ' your name at the top of the page.', answer: 'write', distractors: ['writes', 'to write', 'wrote'] },
  { verb: 'keep', before: '', after: ' the emergency exit clear at all times.', answer: 'Keep', distractors: ['Keeps', 'To keep', 'Kept'] },
  { verb: 'open', before: '', after: ' the lid while the machine is running.', answer: 'Do not open', distractors: ['Not open', 'Does not open', 'To not open'] },
  { verb: 'stand', before: 'Please ', after: ' behind the yellow line.', answer: 'stand', distractors: ['stands', 'to stand', 'stood'] },
  { verb: 'scan', before: '', after: ' both sides of the document.', answer: 'Scan', distractors: ['Scans', 'To scan', 'Scanned'] },
  { verb: 'enter', before: '', after: ' personal information in this field.', answer: 'Do not enter', distractors: ['Not enter', 'Does not enter', 'To not enter'] },
  { verb: 'keep', before: '', after: ' the receipt until the refund is complete.', answer: 'Keep', distractors: ['Keeps', 'To keep', 'Kept'] },
  { verb: 'close', before: 'Please ', after: ' the door quietly when you leave.', answer: 'close', distractors: ['closes', 'to close', 'closed'] },
]
const choices: EnglishEditorialChoiceSeed[] = [
  { cue: 'a direct instruction', segments: ['', ' the red switch before removing the cover.'], answer: final[0].answer, distractors: final[0].distractors },
  { cue: 'a negative health instruction', segments: ['', ' these tablets with grapefruit juice.'], answer: final[1].answer, distractors: final[1].distractors },
  { cue: 'a polite instruction', segments: ['Please ', ' your initials beside each correction.'], answer: final[2].answer, distractors: final[2].distractors },
  { cue: 'a safety instruction', segments: ['', ' the stairwell free of boxes.'], answer: final[3].answer, distractors: final[3].distractors },
  { cue: 'a prohibition', segments: ['', ' the battery compartment while the device is on.'], answer: final[4].answer, distractors: final[4].distractors },
  { cue: 'a polite direction', segments: ['Please ', ' to the right of the entrance.'], answer: final[5].answer, distractors: final[5].distractors },
  { cue: 'a direct technical instruction', segments: ['', ' the barcode on the back of the package.'], answer: final[6].answer, distractors: final[6].distractors },
  { cue: 'a privacy warning', segments: ['', ' your bank details in the comment box.'], answer: final[7].answer, distractors: final[7].distractors },
  { cue: 'a direct instruction', segments: ['', ' the confirmation email until your account is active.'], answer: final[8].answer, distractors: final[8].distractors },
  { cue: 'a polite request', segments: ['Please ', ' the window gently before you go.'], answer: final[9].answer, distractors: final[9].distractors },
]

export const ENGLISH_IMPERATIVE_EDITORIAL = createEnglishEditorialPack({ slug: 'imperative', form: 'imperative', focus: 'Imperative', rule: 'Use the base verb for direct instructions and do not plus the base verb for negative commands; please changes tone, not grammar.', choices, micro, long, errors, sequences, final, choicePositions: [0, 3, 2, 1, 0, 3, 2, 1, 0, 3] })
