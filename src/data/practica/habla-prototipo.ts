import 'server-only'

export type SpeakingPrototypeRoleId = 'a' | 'b'

export type SpeakingPrototypeRole = {
  id: SpeakingPrototypeRoleId
  label: string
  identity: string
  goal: string
  knows: string[]
  needsToFindOut: string[]
  cannotAccept: string[]
  firstMove: string
  speakingCue: string
  usefulLanguage: string[]
  words: Array<{ word: string; meaning: string }>
  complication?: {
    instruction: string
    message: string
  }
}

export const SPEAKING_PROTOTYPE_PATH = '/practica/ingles/a1/habla/prototipo'

export const speakingPrototype = {
  title: 'One seat for two passengers',
  eyebrow: 'Speaking practice · English A1 · Two learners',
  duration: '8–10 min',
  route: 'San Gil → Bucaramanga',
  situation:
    'Yesterday, you bought two bus tickets from San Gil to Bucaramanga. You are traveling with your mother. She has a medical appointment in Bucaramanga at 10:00 a.m. Your bus leaves San Gil at 7:00 a.m.',
  problem:
    'You received the confirmation email, but both passengers were assigned seat 12. Two people cannot use the same seat.',
  sharedTask:
    'Talk to the bus company. Get two different seats. Try to keep both passengers on the same bus and close to each other.',
  finishWhen:
    'You both know the bus time, the two seat numbers, the arrival time and the final price.',
  sayTogether: [
    'We have two tickets from San Gil to Bucaramanga.',
    'Both tickets show seat 12.',
    'We need two different seats.',
  ],
  closingChecklist: [
    'What is the booking number?',
    'What time does the final bus leave?',
    'What are the two final seat numbers?',
    'What time does the bus arrive?',
    'Is there an extra cost?',
  ],
} as const

export const speakingPrototypeRoles: Record<SpeakingPrototypeRoleId, SpeakingPrototypeRole> = {
  a: {
    id: 'a',
    label: 'Passenger',
    identity: 'You are the passenger who bought the two tickets.',
    goal: 'Get two different seats on a bus that arrives before the medical appointment.',
    knows: [
      'Booking number: SG-482',
      'Bus time: 7:00 a.m.',
      'Passengers: Laura Gómez and Ana Gómez',
      'Both tickets show seat 12.',
      'The medical appointment is at 10:00 a.m.',
    ],
    needsToFindOut: [
      'The two new seat numbers',
      'If both passengers can take the same bus',
      'If there is an extra cost',
    ],
    cannotAccept: [
      'A bus that arrives after 9:30 a.m.',
      'One seat for two people',
    ],
    firstMove: 'Explain the problem and give your booking number.',
    speakingCue: 'You start. Look at your partner and explain the problem now.',
    usefulLanguage: [
      'Hello. I have a problem with my booking.',
      'The booking number is SG-482.',
      'Both tickets show seat 12.',
      'We need two different seats, please.',
      'What seats are available?',
      'Is there an extra cost?',
      'That works for us. Please change the booking.',
    ],
    words: [
      { word: 'booking', meaning: 'your ticket reservation' },
      { word: 'seat', meaning: 'the place where you sit' },
      { word: 'available', meaning: 'free and ready to use' },
      { word: 'extra cost', meaning: 'more money to pay' },
    ],
  },
  b: {
    id: 'b',
    label: 'Ticket agent',
    identity: 'You work for the bus company and can change bookings.',
    goal: 'Correct the booking and confirm one clear travel option.',
    knows: [
      'On the 7:00 a.m. bus, seats 3 and 18 are available. They are far apart.',
      'On the 6:30 a.m. bus, seats 10 and 11 are available together.',
      'Changing to the 6:30 a.m. bus is free.',
      'You need the booking number and both passenger names before you make a change.',
    ],
    needsToFindOut: [
      'The booking number',
      'Both passenger names',
      'The latest acceptable arrival time',
    ],
    cannotAccept: [
      'Two passengers with the same seat',
      'A booking change without the passenger names',
    ],
    firstMove: 'Ask for the booking number and both passenger names.',
    speakingCue: 'The passenger starts. Listen, then ask for the booking number and names.',
    usefulLanguage: [
      'Can I have the booking number, please?',
      'What are the passenger names?',
      'What time do you need to arrive?',
      'I can offer two options.',
      'Seats 10 and 11 are together.',
      'There is no extra cost.',
      'Does this option work for you?',
      'I will confirm the change now.',
    ],
    words: [
      { word: 'ticket agent', meaning: 'a person who helps with tickets' },
      { word: 'change', meaning: 'make something different' },
      { word: 'together', meaning: 'next to the other person' },
      { word: 'confirm', meaning: 'say that something is final' },
    ],
    complication: {
      instruction: 'Open this after the passenger and the agent have each spoken twice.',
      message:
        'New information: the 6:30 a.m. bus will arrive in Bucaramanga at 9:05 a.m., not 8:45 a.m. Tell the passenger. Check if this still works.',
    },
  },
}

export function isSpeakingPrototypeRole(value: string): value is SpeakingPrototypeRoleId {
  return value === 'a' || value === 'b'
}

export function speakingPrototypeRolePath(role: SpeakingPrototypeRoleId) {
  return `${SPEAKING_PROTOTYPE_PATH}/${role}`
}
