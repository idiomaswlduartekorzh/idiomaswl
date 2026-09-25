import type { CefrLevel } from '../../../lib/diagnostic/types.ts';
import type { DiagnosticBankRecord } from '../types.ts';

export const ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATE_VERSION = 'en-listening-legacy-rewrite-draft-1';

type QuestionSeed = {
  subdomain: 'main-idea' | 'detail' | 'speaker-intent' | 'inference' | 'discourse-tracking';
  prompt: string;
  options: readonly [string, string, string];
  correctIndex: 0 | 1 | 2;
  rationale: string;
  distractorRationales: readonly [string, string];
};

type TestletSeed = {
  level: Extract<CefrLevel, 'A1' | 'B1'>;
  order: number;
  sourceExerciseId: string;
  audioSha256: string;
  durationSeconds: number;
  questions: readonly [QuestionSeed, QuestionSeed];
};

const testlets: readonly TestletSeed[] = [
  {
    level: 'A1', order: 1, sourceExerciseId: 'hello-emma',
    audioSha256: 'b6300ad4a3ca54cd8f6216c8f6c8570c2517d15354972d2705b26ab54eeb6ed4', durationSeconds: 20.323,
    questions: [
      {
        subdomain: 'main-idea', prompt: 'What is Emma mainly talking about?', correctIndex: 1,
        options: ['A family celebration', 'Her home and studies', 'A journey to London'],
        rationale: 'Emma introduces herself, says where she lives, and explains what and when she studies.',
        distractorRationales: ['No celebration or relatives are mentioned.', 'London is her place of origin, not a journey she describes.'],
      },
      {
        subdomain: 'detail', prompt: 'Where is Emma from?', correctIndex: 0,
        options: ['London', 'A small town', 'New York'],
        rationale: 'Emma explicitly says, “I am from London.”',
        distractorRationales: ['She lives in a small town now; it is not where she says she is from.', 'New York is not mentioned.'],
      },
    ],
  },
  {
    level: 'A1', order: 2, sourceExerciseId: 'my-family',
    audioSha256: 'fffce79b71a39276f16028b4de12c89a22f4cebf6caf4e483ce8442af2c39244', durationSeconds: 20.584,
    questions: [
      {
        subdomain: 'main-idea', prompt: 'Who does the speaker describe?', correctIndex: 2,
        options: ['Some classmates', 'People at work', 'Members of the family'],
        rationale: 'The speaker describes both parents, one brother, and one sister.',
        distractorRationales: ['No classmates are described.', 'Jobs are details about the parents, not the main topic.'],
      },
      {
        subdomain: 'detail', prompt: 'What is the mother’s job?', correctIndex: 1,
        options: ['Bus driver', 'Nurse', 'Student'],
        rationale: 'The speaker says, “my mother is a nurse.”',
        distractorRationales: ['The father is the bus driver.', 'The mother is not identified as a student.'],
      },
    ],
  },
  {
    level: 'A1', order: 3, sourceExerciseId: 'my-bedroom',
    audioSha256: '7f24be0e6f0a947207cbfc08cd1721ee1922c3c4b5d75c5c29f2572937e8b075', durationSeconds: 19.931,
    questions: [
      {
        subdomain: 'main-idea', prompt: 'Which place does the speaker describe?', correctIndex: 0,
        options: ['A bedroom', 'A classroom', 'A clothing shop'],
        rationale: 'The speaker begins with “My bedroom” and describes its furniture and objects.',
        distractorRationales: ['A desk and books appear, but no class is described.', 'Clothes are one detail; there is no shop.'],
      },
      {
        subdomain: 'detail', prompt: 'Where are the books?', correctIndex: 2,
        options: ['Inside the cupboard', 'On top of the bed', 'On the desk'],
        rationale: 'The speaker explicitly says, “my books are on the desk.”',
        distractorRationales: ['The clothes, not the books, are in the cupboard.', 'The pillows, not the books, are on the bed.'],
      },
    ],
  },
  {
    level: 'A1', order: 4, sourceExerciseId: 'our-house',
    audioSha256: 'd32d89601154d55e9943bcd031dc23d6c4298928f7f734c228b20c5974fe7a46', durationSeconds: 24.346,
    questions: [
      {
        subdomain: 'main-idea', prompt: 'What does the speaker explain?', correctIndex: 1,
        options: ['A typical workday', 'The layout of a house', 'A visit to a shop'],
        rationale: 'The speaker locates rooms downstairs and upstairs and then locates the garden.',
        distractorRationales: ['No work routine is described.', 'No shopping visit occurs.'],
      },
      {
        subdomain: 'detail', prompt: 'Where is the garden?', correctIndex: 0,
        options: ['Behind the house', 'In front of the house', 'Upstairs'],
        rationale: 'The final sentence says the garden is behind the house.',
        distractorRationales: ['The audio never places it in front.', 'Bedrooms are upstairs; the garden is not.'],
      },
    ],
  },
  {
    level: 'A1', order: 5, sourceExerciseId: 'my-town',
    audioSha256: 'd82dedd5746e87d0fee4361c0e97c5d321bf6d9167e6d5ead839477536468523', durationSeconds: 21.603,
    questions: [
      {
        subdomain: 'main-idea', prompt: 'What is the speaker mainly describing?', correctIndex: 2,
        options: ['A family lunch', 'A room at home', 'Places in the town'],
        rationale: 'The speaker describes the supermarket, bank, library, park, and lake.',
        distractorRationales: ['No meal is described.', 'The locations are around town, not inside a room.'],
      },
      {
        subdomain: 'detail', prompt: 'What is opposite the supermarket?', correctIndex: 1,
        options: ['The library', 'The bank', 'The park'],
        rationale: 'The speaker says, “The bank is opposite the supermarket.”',
        distractorRationales: ['The library is used to locate the park.', 'The park is behind the library.'],
      },
    ],
  },
  {
    level: 'A1', order: 6, sourceExerciseId: 'morning-routine',
    audioSha256: '1c75b93a487a9c928de67822dbaf4a86c86a8e3110924c0f24262d4c44135e05', durationSeconds: 20.271,
    questions: [
      {
        subdomain: 'discourse-tracking', prompt: 'What sequence does the speaker describe?', correctIndex: 0,
        options: ['A morning before college', 'An evening at home', 'A weekend trip'],
        rationale: 'The events run from waking up through breakfast and the bus journey to college.',
        distractorRationales: ['All time references are in the morning.', 'There is no trip or weekend context.'],
      },
      {
        subdomain: 'detail', prompt: 'What time does the speaker reach college?', correctIndex: 2,
        options: ['Six thirty', 'Seven twenty', 'Eight o’clock'],
        rationale: 'The speaker says, “I get to college at eight o’clock.”',
        distractorRationales: ['Six thirty is the wake-up time.', 'Seven twenty is when the bus arrives.'],
      },
    ],
  },
  {
    level: 'B1', order: 1, sourceExerciseId: 'letter-on-the-door',
    audioSha256: '5f182b2d24b1ddbb3a636ba89a974cab6fee44e2b1ef09419b053d4fc5eccca6', durationSeconds: 35.344,
    questions: [
      {
        subdomain: 'main-idea', prompt: 'What news changes the mood at the café?', correctIndex: 1,
        options: ['Leo has decided to leave', 'The building is being sold', 'Rain has damaged the café'],
        rationale: 'Maya reads the landlord’s message and announces that the building is for sale.',
        distractorRationales: ['Leo does not resign.', 'Rain establishes the scene but does not damage the café.'],
      },
      {
        subdomain: 'detail', prompt: 'What was Maya doing when she noticed the envelope?', correctIndex: 2,
        options: ['Serving the final customer', 'Painting the front door', 'Locking up the café'],
        rationale: 'Maya says she was locking up the café when she saw the envelope.',
        distractorRationales: ['She refers to serving coffee earlier in the week.', 'No painting occurs in this scene.'],
      },
    ],
  },
  {
    level: 'B1', order: 2, sourceExerciseId: 'what-the-owner-had-decided',
    audioSha256: '235db677f644a1c2e7c823c1c571fd82383d17b99890ddbaaf90b276b7619fce', durationSeconds: 40.516,
    questions: [
      {
        subdomain: 'inference', prompt: 'Why does Maya feel excluded from the decision?', correctIndex: 0,
        options: ['The sale was arranged before she was told', 'Her neighbours refused to contact her', 'Leo had secretly bought the building'],
        rationale: 'The papers had already been signed before Maya called, and she says no one had asked them first.',
        distractorRationales: ['Two neighbours had called, so they did not refuse contact.', 'Leo did not buy the building.'],
      },
      {
        subdomain: 'detail', prompt: 'What had the landlord already done when Maya called?', correctIndex: 1,
        options: ['Closed the whole building', 'Signed the papers', 'Raised the monthly rent'],
        rationale: 'The narrator says the landlord had already signed the papers.',
        distractorRationales: ['The building has not been closed.', 'No rent increase is mentioned.'],
      },
    ],
  },
  {
    level: 'B1', order: 3, sourceExerciseId: 'were-going-to-fight',
    audioSha256: 'aff398c34ca4bd06a36698df6401f6537e5677520ca1e0811ed17a01b14a7941', durationSeconds: 31.321,
    questions: [
      {
        subdomain: 'speaker-intent', prompt: 'What does Maya intend to do?', correctIndex: 2,
        options: ['Move the café to another city', 'Let the landlord sell immediately', 'Ask the community to help buy the building'],
        rationale: 'Maya says they will ask the community to help raise money and save the place.',
        distractorRationales: ['Moving is not proposed.', 'She explicitly refuses to give up.'],
      },
      {
        subdomain: 'detail', prompt: 'What does Leo volunteer to do that evening?', correctIndex: 0,
        options: ['Design the posters', 'Call the landlord', 'Organise the bank loan'],
        rationale: 'Leo says, “I’ll design the posters tonight.”',
        distractorRationales: ['No call to the landlord is assigned to Leo.', 'A bank loan is not part of this conversation.'],
      },
    ],
  },
  {
    level: 'B1', order: 4, sourceExerciseId: 'everything-we-have-built',
    audioSha256: 'cb017b2b1f906460d71e0b161a4f2f669aaa4cf411d6414b4d79bbead0d3aca7', durationSeconds: 37.355,
    questions: [
      {
        subdomain: 'main-idea', prompt: 'What are Maya and the others reflecting on?', correctIndex: 1,
        options: ['Plans for a different business', 'What the café community has achieved', 'Reasons to end the project'],
        rationale: 'They list how the shop, building, and community have changed through their work.',
        distractorRationales: ['No different business is proposed.', 'Maya concludes that they will not quit.'],
      },
      {
        subdomain: 'detail', prompt: 'How long did it take to turn the shop into a home?', correctIndex: 2,
        options: ['One month', 'Five years', 'One year'],
        rationale: 'Maya begins, “In one year, we have turned an empty shop into a real home.”',
        distractorRationales: ['One month is not stated.', 'Five years is not stated.'],
      },
    ],
  },
  {
    level: 'B1', order: 5, sourceExerciseId: 'weve-been-working-for-months',
    audioSha256: 'c0b8e31e2ee0a3e1de43a44abcc67e1a6aed321dcbe7d361ab16557ccafa8c66', durationSeconds: 43.624,
    questions: [
      {
        subdomain: 'inference', prompt: 'What is Nora most concerned about?', correctIndex: 0,
        options: ['Maya is exhausted from carrying too much alone', 'The café has stopped attracting customers', 'Leo no longer wants to help the business'],
        rationale: 'Nora notices Maya’s tiredness and says Maya has been carrying too much on her own.',
        distractorRationales: ['Customer numbers are not discussed.', 'Leo’s commitment is not questioned.'],
      },
      {
        subdomain: 'detail', prompt: 'What has Maya not been doing much lately?', correctIndex: 1,
        options: ['Serving coffee', 'Sleeping', 'Saving money'],
        rationale: 'Maya says, “lately I haven’t been sleeping much.”',
        distractorRationales: ['She has continued working at the café.', 'She says they have been saving every coin.'],
      },
    ],
  },
  {
    level: 'B1', order: 6, sourceExerciseId: 'if-we-raise-enough',
    audioSha256: '041f0417af7a049132d769a8ec950beb6eec1d3d6975e1d8584a6eae8aa60b14', durationSeconds: 40.281,
    questions: [
      {
        subdomain: 'discourse-tracking', prompt: 'How do they plan to raise money?', correctIndex: 2,
        options: ['By selling the café furniture', 'By applying for a large bank loan', 'By holding a concert and collecting donations'],
        rationale: 'Maya proposes a concert where people will come and donate.',
        distractorRationales: ['Furniture sales are not proposed.', 'No bank loan is proposed.'],
      },
      {
        subdomain: 'detail', prompt: 'What will happen if they raise enough by Friday?', correctIndex: 0,
        options: ['They will make an offer on the building', 'They will close for the weekend', 'They will hire another company'],
        rationale: 'Maya says that if they raise enough by Friday, they will make an offer.',
        distractorRationales: ['Closing is not the intended outcome.', 'Hiring another company is not mentioned.'],
      },
    ],
  },
];

function optionId(level: string, order: number, question: number, option: number): string {
  return `en-${level.toLowerCase()}-listening-${String(order).padStart(2, '0')}-q${question}-o${option + 1}`;
}

export const ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES: readonly DiagnosticBankRecord[] = testlets.flatMap((testlet) => {
  const mediaId = `en-${testlet.level.toLowerCase()}-legacy-listening-${String(testlet.order).padStart(2, '0')}`;
  return testlet.questions.map((question, questionIndex): DiagnosticBankRecord => {
    const number = questionIndex + 1;
    const id = `en-${testlet.level.toLowerCase()}-listening-${String(testlet.order).padStart(2, '0')}-q${number}`;
    const ids = question.options.map((_, optionIndex) => optionId(testlet.level, testlet.order, number, optionIndex));
    const distractorIndexes = [0, 1, 2].filter((index) => index !== question.correctIndex);
    return {
      publicItem: {
        id,
        contentVersion: 'draft-1',
        language: 'en',
        skill: 'listening',
        subdomain: question.subdomain,
        levelCandidate: testlet.level,
        prompt: question.prompt,
        stimulus: {
          kind: 'audio',
          mediaId,
          src: `/api/diagnostic/media/${mediaId}`,
          startMs: 0,
          endMs: Math.ceil(testlet.durationSeconds * 1000),
          maxPlays: 2,
        },
        response: { kind: 'single-choice', optionIds: ids },
        displayOptions: question.options.map((text, optionIndex) => ({ id: ids[optionIndex], text })),
      },
      status: 'reserved',
      exposure: 'previously-public',
      review: { status: 'draft' },
      scoring: { kind: 'single-choice', optionId: ids[question.correctIndex] },
      rationale: {
        key: question.rationale,
        distractors: Object.fromEntries(distractorIndexes.map((optionIndex, rationaleIndex) => [
          ids[optionIndex],
          question.distractorRationales[rationaleIndex],
        ])),
      },
      source: {
        kind: 'welearn-legacy',
        reference: `${ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATE_VERSION}:${testlet.sourceExerciseId}:audio-sha256:${testlet.audioSha256}`,
      },
      levelRange: [testlet.level, testlet.level],
      warnings: [
        'PREVIOUSLY_PUBLIC_AUDIO',
        'PENDING_INDEPENDENT_LINGUISTIC_REVIEW',
        'PENDING_HUMAN_AUDIO_ALIGNMENT',
        'PENDING_PILOT_CALIBRATION',
      ],
    };
  });
});

