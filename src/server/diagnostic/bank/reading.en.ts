import type { CefrLevel } from '../../../lib/diagnostic/types.ts';
import type { DiagnosticBankRecord } from '../types.ts';

export const ENGLISH_DIAGNOSTIC_READING_CANDIDATE_VERSION = 'en-reading-original-draft-1';

type ReadingQuestionSeed = {
  subdomain: 'main-idea' | 'detail' | 'inference' | 'purpose' | 'structure' | 'meaning-in-context';
  prompt: string;
  options: readonly [string, string, string];
  correctIndex: 0 | 1 | 2;
  rationale: string;
  distractorRationales: readonly [string, string];
};

type ReadingTestletSeed = {
  level: Extract<CefrLevel, 'A1' | 'A2'>;
  slug: string;
  title: string;
  text: string;
  questions: readonly [ReadingQuestionSeed, ReadingQuestionSeed];
};

const testlets: readonly ReadingTestletSeed[] = [
  {
    level: 'A1', slug: 'pool-hours', title: 'Pool notice',
    text: 'RIVER POOL\nOpen Monday, Tuesday, Thursday and Friday: 7:00 a.m.–7:00 p.m.\nSaturday and Sunday: 9:00 a.m.–4:00 p.m.\nClosed on Wednesday. Children under 12 must come with an adult.',
    questions: [
      {
        subdomain: 'detail', prompt: 'Which day is the pool closed?', correctIndex: 1,
        options: ['Tuesday', 'Wednesday', 'Sunday'],
        rationale: 'The notice explicitly says, “Closed on Wednesday.”',
        distractorRationales: ['Tuesday is listed as an open day.', 'Sunday has weekend opening hours.'],
      },
      {
        subdomain: 'detail', prompt: 'Who must come with an adult?', correctIndex: 2,
        options: ['All weekend visitors', 'People over 12', 'Children under 12'],
        rationale: 'The final line requires an adult for children under 12.',
        distractorRationales: ['The rule is based on age, not the day of the visit.', 'The notice says “under 12”, not “over 12”.'],
      },
    ],
  },
  {
    level: 'A1', slug: 'library-message', title: 'A message from Kim',
    text: 'Hi Alex,\nLet’s meet outside the library at 4:30. Please bring your blue notebook. After we study, we can get a sandwich at the café across the street.\nKim',
    questions: [
      {
        subdomain: 'purpose', prompt: 'Why did Kim write this message?', correctIndex: 0,
        options: ['To arrange a study meeting', 'To offer Alex a new job', 'To return a library book'],
        rationale: 'Kim proposes a meeting place and time, asks for a notebook, and says they will study.',
        distractorRationales: ['No job is mentioned or offered.', 'The library is the meeting place; no book return is discussed.'],
      },
      {
        subdomain: 'detail', prompt: 'What should Alex bring?', correctIndex: 1,
        options: ['A sandwich', 'A blue notebook', 'A library card'],
        rationale: 'Kim explicitly asks Alex to bring the blue notebook.',
        distractorRationales: ['They may buy a sandwich later.', 'No library card is requested.'],
      },
    ],
  },
  {
    level: 'A1', slug: 'cafe-special', title: 'Lunch special',
    text: 'GREEN CAFÉ — TODAY’S LUNCH\nTomato soup and a cheese sandwich: $8\nChicken salad: $9\nFruit: $3\nLunch special includes tea or water. Coffee is $2 extra.',
    questions: [
      {
        subdomain: 'detail', prompt: 'How much is the chicken salad?', correctIndex: 2,
        options: ['$3', '$8', '$9'],
        rationale: 'The menu lists chicken salad at nine dollars.',
        distractorRationales: ['Three dollars is the price of fruit.', 'Eight dollars is the soup-and-sandwich price.'],
      },
      {
        subdomain: 'inference', prompt: 'Which drink can come with the lunch special at no extra cost?', correctIndex: 0,
        options: ['Tea', 'Coffee', 'Orange juice'],
        rationale: 'Tea or water is included, while coffee costs extra.',
        distractorRationales: ['Coffee costs two dollars extra.', 'Orange juice is not listed.'],
      },
    ],
  },
  {
    level: 'A1', slug: 'bus-times', title: 'Bus timetable',
    text: 'BUS 18 — CITY CENTRE\nOak Street: 08:10\nMuseum: 08:25\nCentral Station: 08:40\nMarket Square: 08:55\nNo service on public holidays.',
    questions: [
      {
        subdomain: 'detail', prompt: 'What time does the bus reach the museum?', correctIndex: 1,
        options: ['08:10', '08:25', '08:55'],
        rationale: 'The timetable pairs “Museum” with 08:25.',
        distractorRationales: ['08:10 is the Oak Street time.', '08:55 is the Market Square time.'],
      },
      {
        subdomain: 'structure', prompt: 'Where does the bus stop after the museum?', correctIndex: 2,
        options: ['Oak Street', 'Market Square', 'Central Station'],
        rationale: 'Central Station is the next listed stop after the museum.',
        distractorRationales: ['Oak Street comes before the museum.', 'Market Square comes after Central Station.'],
      },
    ],
  },
  {
    level: 'A1', slug: 'weekend-email', title: 'Weekend email',
    text: 'Hello Mia,\nI’m free on Saturday afternoon. Would you like to visit the new park with me? We can take the number 6 bus at two o’clock. It may rain, so bring a jacket.\nSam',
    questions: [
      {
        subdomain: 'purpose', prompt: 'Why did Sam write this email?', correctIndex: 0,
        options: ['To invite Mia to the park', 'To cancel a bus journey', 'To return Mia’s jacket'],
        rationale: 'Sam asks Mia to visit the new park together on Saturday.',
        distractorRationales: ['Sam proposes taking a bus rather than cancelling it.', 'The jacket is advice for possible rain, not an item being returned.'],
      },
      {
        subdomain: 'detail', prompt: 'Why should Mia bring a jacket?', correctIndex: 1,
        options: ['The park closes early.', 'It may rain.', 'The bus is always cold.'],
        rationale: 'Sam directly connects the jacket with the possibility of rain.',
        distractorRationales: ['No closing time is mentioned.', 'The email says nothing about the bus temperature.'],
      },
    ],
  },
  {
    level: 'A1', slug: 'recycling-sign', title: 'Recycling room sign',
    text: 'PLEASE USE THE CORRECT BIN\nBlue: paper and cardboard\nGreen: glass bottles\nYellow: cans and plastic bottles\nDo not leave bags on the floor. Ask at reception if a bin is full.',
    questions: [
      {
        subdomain: 'detail', prompt: 'Which bin is for glass bottles?', correctIndex: 2,
        options: ['The blue bin', 'The yellow bin', 'The green bin'],
        rationale: 'The sign assigns glass bottles to the green bin.',
        distractorRationales: ['Blue is for paper and cardboard.', 'Yellow is for cans and plastic bottles.'],
      },
      {
        subdomain: 'purpose', prompt: 'What is the main purpose of the sign?', correctIndex: 0,
        options: ['To explain how to sort recycling', 'To advertise bottles for sale', 'To announce new reception hours'],
        rationale: 'The sign matches recyclable materials to bins and gives disposal instructions.',
        distractorRationales: ['Nothing is offered for sale.', 'Reception is mentioned only as a place to ask for help.'],
      },
    ],
  },
  {
    level: 'A2', slug: 'bike-library', title: 'The neighbourhood bike library',
    text: 'People in Westfield can now borrow a bicycle from the neighbourhood bike library. Membership costs ten dollars a year. Members may keep a bicycle for up to three days and can collect one from the community centre. The project started because many residents wanted to cycle but did not have space to store a bicycle at home.',
    questions: [
      {
        subdomain: 'main-idea', prompt: 'What does the text mainly explain?', correctIndex: 1,
        options: ['How to repair an old bicycle', 'How a local bicycle-lending project works', 'Why cycling is dangerous in Westfield'],
        rationale: 'The text explains membership, borrowing time, collection, and the reason for the bike library.',
        distractorRationales: ['No repair process is described.', 'The text presents a solution for cycling, not a safety warning.'],
      },
      {
        subdomain: 'detail', prompt: 'How long may a member keep a bicycle?', correctIndex: 2,
        options: ['One day', 'One week', 'Up to three days'],
        rationale: 'The borrowing limit is explicitly stated as up to three days.',
        distractorRationales: ['One day is shorter than the stated limit.', 'One week is longer than the stated limit.'],
      },
    ],
  },
  {
    level: 'A2', slug: 'lost-backpack', title: 'Lost backpack email',
    text: 'Dear Sports Centre team,\nI think I left my grey backpack in changing room 2 after the 6 p.m. swimming class on Tuesday. It has a red water bottle in the side pocket and my name, Elena Ruiz, is written inside. Could you let me know if anyone has found it? I can collect it after work tomorrow.\nThank you,\nElena',
    questions: [
      {
        subdomain: 'purpose', prompt: 'Why is Elena writing?', correctIndex: 0,
        options: ['To ask about a missing backpack', 'To change her swimming class', 'To complain about a water bottle'],
        rationale: 'Elena identifies a backpack she left behind and asks whether it has been found.',
        distractorRationales: ['She identifies the class only to locate the bag.', 'The water bottle helps identify the backpack; it is not the complaint.'],
      },
      {
        subdomain: 'detail', prompt: 'Which detail can help identify the backpack?', correctIndex: 1,
        options: ['It is in changing room 6.', 'A red bottle is in a side pocket.', 'The owner’s name is on the outside.'],
        rationale: 'Elena says a red water bottle is in the side pocket.',
        distractorRationales: ['She names changing room 2 and a 6 p.m. class.', 'Her name is written inside, not outside.'],
      },
    ],
  },
  {
    level: 'A2', slug: 'community-garden', title: 'A Saturday in the community garden',
    text: 'Last spring, an empty piece of land beside Park Road became a community garden. At first, only six people volunteered. Now more than thirty neighbours grow vegetables and flowers there. They share tools, and experienced gardeners help beginners. On Saturday mornings, the group sells some vegetables to pay for seeds and gives the rest to a local food bank.',
    questions: [
      {
        subdomain: 'main-idea', prompt: 'What is the text mainly about?', correctIndex: 2,
        options: ['A company that sells garden tools', 'A park that will close next spring', 'Neighbours developing and sharing a garden'],
        rationale: 'The text follows the growth of a volunteer garden and explains how neighbours work and share its produce.',
        distractorRationales: ['Tools are shared, not sold by a company.', 'No park closure is announced.'],
      },
      {
        subdomain: 'inference', prompt: 'Why does the group sell some vegetables?', correctIndex: 0,
        options: ['To cover part of the garden’s costs', 'To pay every volunteer a salary', 'To buy the empty land'],
        rationale: 'The money pays for seeds, so the sales help cover an operating cost.',
        distractorRationales: ['The members are described as volunteers.', 'Buying the land is not mentioned.'],
      },
    ],
  },
  {
    level: 'A2', slug: 'train-announcement', title: 'Station announcement',
    text: 'Attention, passengers for Lakeside. The 10:15 train from platform 4 is delayed by approximately twenty minutes because of a signalling problem. Please remain in the main waiting area. The platform may change, so check the information screens before boarding. Passengers who need assistance should speak to station staff near the ticket office.',
    questions: [
      {
        subdomain: 'detail', prompt: 'Why is the train delayed?', correctIndex: 1,
        options: ['The driver is absent.', 'There is a signalling problem.', 'The weather has damaged the track.'],
        rationale: 'The announcement directly attributes the delay to a signalling problem.',
        distractorRationales: ['No absent driver is mentioned.', 'No weather or track damage is mentioned.'],
      },
      {
        subdomain: 'inference', prompt: 'Why should passengers check the screens?', correctIndex: 2,
        options: ['The ticket office is closing.', 'The train time is now earlier.', 'The departure platform could be different.'],
        rationale: 'The announcement says the platform may change and then tells passengers to check the screens.',
        distractorRationales: ['The ticket office is only a location for assistance.', 'The train is delayed, not moved earlier.'],
      },
    ],
  },
  {
    level: 'A2', slug: 'book-club', title: 'New readers’ book club',
    text: 'Would you like to read more in English but find long novels difficult? Join our new readers’ book club on the first Thursday of each month. We choose short books and send members a vocabulary guide one week before each meeting. You do not need to finish every page. Come ready to share one idea or question. The first meeting is free.',
    questions: [
      {
        subdomain: 'purpose', prompt: 'Who is the club especially designed for?', correctIndex: 0,
        options: ['People who find long English books difficult', 'Writers preparing their first novel', 'Teachers choosing school textbooks'],
        rationale: 'The opening question directly addresses readers who want more English practice but struggle with long novels.',
        distractorRationales: ['The club reads books; it does not teach novel writing.', 'No textbook-selection task is described.'],
      },
      {
        subdomain: 'detail', prompt: 'When do members receive the vocabulary guide?', correctIndex: 1,
        options: ['At the end of each meeting', 'One week before the meeting', 'On the first day of the year'],
        rationale: 'The notice says the guide is sent one week before each meeting.',
        distractorRationales: ['The guide is preparation, so it comes before, not after.', 'The schedule is tied to each meeting, not the year.'],
      },
    ],
  },
  {
    level: 'A2', slug: 'office-kitchen', title: 'Shared kitchen update',
    text: 'From Monday, the shared kitchen on the third floor will close at 3 p.m. for five days while the sink is replaced. Staff may use the kitchen on the first floor, but its refrigerator is small, so please bring only food that you will eat that day. Cups and drinking water will remain available beside the third-floor meeting rooms.',
    questions: [
      {
        subdomain: 'main-idea', prompt: 'What is the main reason for this message?', correctIndex: 2,
        options: ['To introduce a new lunch menu', 'To ask staff to buy a refrigerator', 'To explain temporary kitchen arrangements'],
        rationale: 'The message explains a temporary closure and where staff can prepare food and find drinks meanwhile.',
        distractorRationales: ['No menu is introduced.', 'The small refrigerator affects what staff bring but is not a purchase request.'],
      },
      {
        subdomain: 'detail', prompt: 'What will still be available on the third floor?', correctIndex: 0,
        options: ['Cups and drinking water', 'A working kitchen sink', 'A large refrigerator'],
        rationale: 'The final sentence says cups and drinking water will remain beside the meeting rooms.',
        distractorRationales: ['The sink is being replaced.', 'The small refrigerator is on the first floor.'],
      },
    ],
  },
];

export const ENGLISH_DIAGNOSTIC_READING_CANDIDATES: readonly DiagnosticBankRecord[] = testlets.flatMap((testlet, testletIndex) => {
  const stimulusId = `en-${testlet.level.toLowerCase()}-reading-${String((testletIndex % 6) + 1).padStart(2, '0')}`;
  return testlet.questions.map((question, questionIndex): DiagnosticBankRecord => {
    const id = `${stimulusId}-q${questionIndex + 1}`;
    const optionIds = question.options.map((_, optionIndex) => `${id}-o${optionIndex + 1}`);
    const distractorIndexes = [0, 1, 2].filter((optionIndex) => optionIndex !== question.correctIndex);
    return {
      publicItem: {
        id,
        contentVersion: 'draft-1',
        language: 'en',
        skill: 'reading',
        subdomain: question.subdomain,
        levelCandidate: testlet.level,
        prompt: question.prompt,
        stimulus: { kind: 'text', stimulusId, title: testlet.title, body: testlet.text },
        response: { kind: 'single-choice', optionIds },
        displayOptions: question.options.map((text, optionIndex) => ({ id: optionIds[optionIndex], text })),
      },
      status: 'reserved',
      exposure: 'reserved',
      review: { status: 'draft' },
      scoring: { kind: 'single-choice', optionId: optionIds[question.correctIndex] },
      rationale: {
        key: question.rationale,
        distractors: Object.fromEntries(distractorIndexes.map((optionIndex, rationaleIndex) => [
          optionIds[optionIndex], question.distractorRationales[rationaleIndex],
        ])),
      },
      source: { kind: 'welearn-original', reference: `${ENGLISH_DIAGNOSTIC_READING_CANDIDATE_VERSION}:${testlet.slug}` },
      levelRange: [testlet.level, testlet.level],
      warnings: ['PENDING_INDEPENDENT_LINGUISTIC_REVIEW', 'PENDING_PILOT_CALIBRATION'],
    };
  });
});
