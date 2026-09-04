import 'server-only';

import {
  assertIeltsSpeakingPart1PrivateBank,
  type IeltsSpeakingPart1PrivateBank,
} from '@/lib/ielts/speaking-part1-private-contract';

const BANK = {
  schemaVersion: 1,
  bankId: 'welearn-speaking-part-1-bank-001',
  contentVersion: '2026-09-01.1',
  part: 1,
  locale: 'en',
  title: 'Small Everyday Choices',
  responseKind: 'open-response',
  practiceDisclosure: 'Independent WeLearn text practice. It omits the identity check, records no response and does not produce an IELTS band score.',
  format: {
    officialPartDurationSeconds: [240, 300],
    publicQuestionCountRule: 'not-fixed',
    practiceComposition: 'two-topic-packs',
  },
  boundaries: {
    artifactMode: 'private-text-only',
    identityCheck: 'omitted',
    personalDataCollection: 'none',
    responseCapture: 'none',
    persistence: 'none',
    networkTransfer: 'none',
    assessment: 'none',
    feedback: 'none',
    modelAnswers: 'none',
  },
  topicPacks: [
    {
      id: 'seat-choices',
      label: 'Choosing seats',
      transition: "First, let's talk about choosing seats.",
      questions: [
        {
          id: 'seat-choices-q1',
          order: 1,
          prompt: 'When seats are not assigned, how do you choose where to sit?',
        },
        {
          id: 'seat-choices-q2',
          order: 2,
          prompt: 'In places you visit regularly, do you usually choose the same seat?',
        },
        {
          id: 'seat-choices-q3',
          order: 3,
          prompt: 'What makes one seat more comfortable for you than another?',
        },
        {
          id: 'seat-choices-q4',
          order: 4,
          prompt: 'Has the kind of seat you prefer changed over time?',
        },
      ],
    },
    {
      id: 'indoor-light',
      label: 'Light where you live',
      transition: "Now let's talk about light where you live.",
      questions: [
        {
          id: 'indoor-light-q1',
          order: 1,
          prompt: 'Which room where you live gets the best natural light?',
        },
        {
          id: 'indoor-light-q2',
          order: 2,
          prompt: 'Do you prefer bright or soft light when you are relaxing?',
        },
        {
          id: 'indoor-light-q3',
          order: 3,
          prompt: 'At what time of day do you usually switch on the lights?',
        },
        {
          id: 'indoor-light-q4',
          order: 4,
          prompt: 'Have you changed the lighting in a room recently?',
        },
      ],
    },
    {
      id: 'bags-and-pockets',
      label: 'Bags and pockets',
      transition: "Let's talk about the things you carry each day.",
      questions: [
        {
          id: 'bags-and-pockets-q1',
          order: 1,
          prompt: 'When you leave home, do you put most things in a bag or in your pockets?',
        },
        {
          id: 'bags-and-pockets-q2',
          order: 2,
          prompt: 'Which item do you check for before you go out?',
        },
        {
          id: 'bags-and-pockets-q3',
          order: 3,
          prompt: 'Is it easy for you to find things after you have packed them?',
        },
        {
          id: 'bags-and-pockets-q4',
          order: 4,
          prompt: 'Has the way you carry everyday items changed over time?',
        },
      ],
    },
    {
      id: 'signs-and-labels',
      label: 'Signs and labels',
      transition: "Let's talk about signs and labels.",
      questions: [
        {
          id: 'signs-and-labels-q1',
          order: 1,
          prompt: 'Which kinds of signs are easiest for you to notice?',
        },
        {
          id: 'signs-and-labels-q2',
          order: 2,
          prompt: 'Do you usually read a label before you buy or use something?',
        },
        {
          id: 'signs-and-labels-q3',
          order: 3,
          prompt: 'Is there a useful sign near a place you visit regularly?',
        },
        {
          id: 'signs-and-labels-q4',
          order: 4,
          prompt: 'On a sign, do you understand pictures or words more quickly?',
        },
      ],
    },
    {
      id: 'small-repairs',
      label: 'Small repairs',
      transition: "Let's talk about small repairs.",
      questions: [
        {
          id: 'small-repairs-q1',
          order: 1,
          prompt: 'When something small breaks, do you try to fix it yourself?',
        },
        {
          id: 'small-repairs-q2',
          order: 2,
          prompt: 'Which kinds of repairs do you prefer to leave to someone else?',
        },
        {
          id: 'small-repairs-q3',
          order: 3,
          prompt: 'Has anyone shown you how to repair an everyday object?',
        },
        {
          id: 'small-repairs-q4',
          order: 4,
          prompt: 'What simple repair would you like to learn?',
        },
      ],
    },
    {
      id: 'short-waits',
      label: 'Short waits',
      transition: "Let's talk about short waits.",
      questions: [
        {
          id: 'short-waits-q1',
          order: 1,
          prompt: 'In which part of your day do you most often have to wait?',
        },
        {
          id: 'short-waits-q2',
          order: 2,
          prompt: 'What do you usually do when the wait will be short?',
        },
        {
          id: 'short-waits-q3',
          order: 3,
          prompt: 'Would you rather wait indoors or outdoors?',
        },
        {
          id: 'short-waits-q4',
          order: 4,
          prompt: 'Are you more patient about waiting now than in the past?',
        },
      ],
    },
  ],
  pilotRecipe: {
    practiceId: 'welearn-speaking-part-1-001',
    practiceNumber: 1,
    topicPackIds: ['seat-choices', 'indoor-light'],
  },
} as const satisfies IeltsSpeakingPart1PrivateBank;

assertIeltsSpeakingPart1PrivateBank(BANK);

export function getIeltsSpeakingPart1PrivateBank() {
  return BANK;
}
