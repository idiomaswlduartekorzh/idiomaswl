import type { CefrLevel } from '../../../lib/diagnostic/types.ts';

export const ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_VERSION = 'en-listening-original-lower-production-1';

type LowerLevel = Extract<CefrLevel, 'A1' | 'A2'>;
type ListeningSubdomain = 'main-idea' | 'detail' | 'speaker-intent' | 'inference' | 'discourse-tracking';

export interface DiagnosticListeningProductionBrief {
  id: string;
  level: LowerLevel;
  exposure: 'reserved';
  status: 'production-brief';
  benchmark: {
    source: 'aggregate-legacy-duration-profile';
    note: string;
  };
  recording: {
    targetDurationSeconds: readonly [number, number];
    paceWordsPerMinute: readonly [number, number];
    delivery: string;
    turns: readonly { speaker: 'narrator' | 'speaker-a' | 'speaker-b'; text: string }[];
  };
  questions: readonly {
    subdomain: ListeningSubdomain;
    prompt: string;
    options: readonly [string, string, string];
    correctIndex: 0 | 1 | 2;
    rationale: string;
    distractorRationales: readonly [string, string];
  }[];
  audioArtifact: {
    mediaId: string;
    privateObjectPath: string;
    status: 'not-recorded';
    sha256: null;
    durationSeconds: null;
    transcriptReview: 'pending';
    alignmentReview: 'pending';
  };
}

const briefs: readonly Omit<DiagnosticListeningProductionBrief, 'id' | 'benchmark' | 'audioArtifact'>[] = [
  {
    level: 'A1', exposure: 'reserved', status: 'production-brief',
    recording: {
      targetDurationSeconds: [22, 30], paceWordsPerMinute: [105, 120], delivery: 'One clear neutral voice; short pauses after the opening hours and collection time.',
      turns: [{ speaker: 'narrator', text: 'Hello, this is Green Street Pharmacy. On Friday, we close early at five o’clock. Your medicine is ready now. Please collect it before four thirty and bring your name card. If Friday is difficult, we open again on Saturday at nine in the morning.' }],
    },
    questions: [
      { subdomain: 'detail', prompt: 'What time does the pharmacy close on Friday?', options: ['At five o’clock', 'At four thirty', 'At nine o’clock'], correctIndex: 0, rationale: 'The message states that the pharmacy closes at five on Friday.', distractorRationales: ['Four thirty is the requested collection time.', 'Nine is the Saturday opening time.'] },
      { subdomain: 'speaker-intent', prompt: 'Why is the pharmacy calling?', options: ['To ask for a new name card', 'To cancel the Saturday opening', 'To say that medicine is ready'], correctIndex: 2, rationale: 'The caller says the listener’s medicine is ready for collection.', distractorRationales: ['The listener should bring an existing name card.', 'Saturday opening is offered as an alternative.'] },
    ],
  },
  {
    level: 'A1', exposure: 'reserved', status: 'production-brief',
    recording: {
      targetDurationSeconds: [22, 30], paceWordsPerMinute: [105, 120], delivery: 'Warm teacher voice; clear stress on Sunday, red gate and water.',
      turns: [{ speaker: 'narrator', text: 'Our class picnic is this Sunday. Meet at the red gate of Hill Park at eleven. Please bring water and a hat. You do not need food because the school has sandwiches and fruit. Parents can collect students from the same gate at three o’clock.' }],
    },
    questions: [
      { subdomain: 'detail', prompt: 'Where should students meet?', options: ['Beside the school bus', 'At the red park gate', 'Near the fruit shop'], correctIndex: 1, rationale: 'The teacher names the red gate of Hill Park as the meeting point.', distractorRationales: ['No school bus meeting point is given.', 'Fruit is provided for lunch; no shop is mentioned.'] },
      { subdomain: 'detail', prompt: 'What should students bring?', options: ['Sandwiches and fruit', 'Money for lunch', 'Water and a hat'], correctIndex: 2, rationale: 'Students are explicitly asked to bring water and a hat.', distractorRationales: ['The school provides the food.', 'No payment is requested.'] },
    ],
  },
  {
    level: 'A1', exposure: 'reserved', status: 'production-brief',
    recording: {
      targetDurationSeconds: [20, 28], paceWordsPerMinute: [105, 120], delivery: 'Station announcement, calm and intelligible, with a pause before the replacement platform.',
      turns: [{ speaker: 'narrator', text: 'Attention, please. The number twelve bus to Lakeside will not leave from stop B today. Please wait at stop D, next to the ticket office. The bus leaves at ten fifteen, five minutes later than usual. Thank you.' }],
    },
    questions: [
      { subdomain: 'detail', prompt: 'Which stop should passengers use today?', options: ['Stop D', 'Stop B', 'Stop twelve'], correctIndex: 0, rationale: 'The announcement directs passengers to stop D.', distractorRationales: ['Stop B is explicitly not in use.', 'Twelve is the bus number, not a stop.'] },
      { subdomain: 'detail', prompt: 'When will the bus leave?', options: ['At ten ten', 'At ten fifteen', 'At ten fifty'], correctIndex: 1, rationale: 'The announced departure time is ten fifteen.', distractorRationales: ['Ten ten is the usual time implied by a five-minute delay.', 'Ten fifty is not stated.'] },
    ],
  },
  {
    level: 'A1', exposure: 'reserved', status: 'production-brief',
    recording: {
      targetDurationSeconds: [24, 32], paceWordsPerMinute: [105, 120], delivery: 'Two friendly adult voices; natural but distinct turns and no overlap.',
      turns: [
        { speaker: 'speaker-a', text: 'Good morning. I ordered a birthday cake for Sam Lee.' },
        { speaker: 'speaker-b', text: 'Yes, here it is. It is chocolate with strawberries. Would you like candles too?' },
        { speaker: 'speaker-a', text: 'No, thank you. I have candles at home. Can I collect the cake at two?' },
        { speaker: 'speaker-b', text: 'Of course. It will be ready.' },
      ],
    },
    questions: [
      { subdomain: 'detail', prompt: 'What fruit is on the cake?', options: ['Cherries', 'Oranges', 'Strawberries'], correctIndex: 2, rationale: 'The bakery worker says the chocolate cake has strawberries.', distractorRationales: ['Cherries are not mentioned.', 'Oranges are not mentioned.'] },
      { subdomain: 'speaker-intent', prompt: 'Why does the customer say no?', options: ['There are candles at home', 'The collection time is wrong', 'Sam does not like chocolate'], correctIndex: 0, rationale: 'The customer declines candles because they already have some at home.', distractorRationales: ['The bakery agrees to the requested time.', 'The customer does not object to the cake flavour.'] },
    ],
  },
  {
    level: 'A1', exposure: 'reserved', status: 'production-brief',
    recording: {
      targetDurationSeconds: [22, 30], paceWordsPerMinute: [105, 120], delivery: 'Helpful reception voice with careful description of colour and location.',
      turns: [{ speaker: 'narrator', text: 'This is a message for Nina. We found your gloves in the sports centre. They are black with two small yellow stars. They were under a chair near court three. Please come to reception before eight tonight, or after ten tomorrow morning.' }],
    },
    questions: [
      { subdomain: 'detail', prompt: 'What is on the gloves?', options: ['Two white lines', 'Two yellow stars', 'Three black circles'], correctIndex: 1, rationale: 'The message describes two small yellow stars on the gloves.', distractorRationales: ['White lines are not mentioned.', 'The number, colour and shape do not match the description.'] },
      { subdomain: 'detail', prompt: 'Where were the gloves found?', options: ['Inside reception', 'On court eight', 'Under a chair'], correctIndex: 2, rationale: 'The gloves were under a chair near court three.', distractorRationales: ['Reception is where Nina should collect them.', 'Eight is a reception deadline, not a court number.'] },
    ],
  },
  {
    level: 'A1', exposure: 'reserved', status: 'production-brief',
    recording: {
      targetDurationSeconds: [22, 30], paceWordsPerMinute: [105, 120], delivery: 'Clear library staff voice; slight pause between the two return dates.',
      turns: [{ speaker: 'narrator', text: 'You can take these two books today. Please return the travel book by Monday the eighth. The cooking book is yours until Thursday the eleventh. Put both books in the blue box if the library is closed. The box is beside the main door.' }],
    },
    questions: [
      { subdomain: 'detail', prompt: 'Which book is due first?', options: ['The travel book', 'The cooking book', 'Both books on Thursday'], correctIndex: 0, rationale: 'The travel book is due on Monday, before the cooking book on Thursday.', distractorRationales: ['The cooking book has the later date.', 'The books have different return dates.'] },
      { subdomain: 'discourse-tracking', prompt: 'What should the listener do if the library is closed?', options: ['Keep both books for another week', 'Use the blue box by the door', 'Leave the books at the cooking school'], correctIndex: 1, rationale: 'The final instruction is to use the blue box beside the main door.', distractorRationales: ['No extension is offered.', 'No cooking school is mentioned.'] },
    ],
  },
  {
    level: 'A2', exposure: 'reserved', status: 'production-brief',
    recording: {
      targetDurationSeconds: [34, 45], paceWordsPerMinute: [120, 140], delivery: 'Community radio voice; clear grouping of what visitors bring and what volunteers provide.',
      turns: [{ speaker: 'narrator', text: 'The Riverside Repair Café opens this Saturday in the community hall. Volunteers can help with small electrical items, bicycles and torn clothes. Bring only one object, and arrive between ten and one. Repairs are free, but visitors may buy tea or cake to support the project. The team has tools, so you only need the broken object and any special replacement part it requires.' }],
    },
    questions: [
      { subdomain: 'main-idea', prompt: 'What is the main purpose of the event?', options: ['To help people repair everyday things', 'To sell new electrical equipment', 'To collect bicycles for a race'], correctIndex: 0, rationale: 'The event brings volunteers and visitors together to repair small household objects, bicycles and clothes.', distractorRationales: ['New equipment is not being sold.', 'Bicycles are repaired, not collected for a race.'] },
      { subdomain: 'detail', prompt: 'What may a visitor need to bring besides the broken object?', options: ['A complete set of tools', 'A special replacement part', 'Tea and cake for everyone'], correctIndex: 1, rationale: 'The team provides tools, but the visitor should bring a special replacement part if one is needed.', distractorRationales: ['The volunteers already have tools.', 'Tea and cake are available to buy.'] },
    ],
  },
  {
    level: 'A2', exposure: 'reserved', status: 'production-brief',
    recording: {
      targetDurationSeconds: [35, 48], paceWordsPerMinute: [120, 140], delivery: 'Two neighbours speaking naturally with a brief hesitation before the changed feeding instruction.',
      turns: [
        { speaker: 'speaker-a', text: 'Thanks for looking after Milo this weekend. His food is in the kitchen cupboard.' },
        { speaker: 'speaker-b', text: 'Should I feed him twice a day?' },
        { speaker: 'speaker-a', text: 'Usually, yes, but the vet says only once on Saturday because of his appointment. On Sunday, give him breakfast and dinner as normal. He can go into the garden, but please keep the side gate closed.' },
        { speaker: 'speaker-b', text: 'All right. I’ll write that down.' },
      ],
    },
    questions: [
      { subdomain: 'detail', prompt: 'How often should Milo be fed on Saturday?', options: ['Twice', 'Three times', 'Once'], correctIndex: 2, rationale: 'The owner changes the normal routine to one meal on Saturday because of the appointment.', distractorRationales: ['Twice is the usual routine and Sunday plan.', 'Three meals are never requested.'] },
      { subdomain: 'speaker-intent', prompt: 'Why does the second speaker say, “I’ll write that down”?', options: ['The weekend instructions have changed', 'The food cupboard is locked', 'The side gate needs painting'], correctIndex: 0, rationale: 'The feeding schedule differs across Saturday and Sunday, so the neighbour wants to remember it.', distractorRationales: ['The cupboard is only identified as the food location.', 'The gate must stay closed; no painting is discussed.'] },
    ],
  },
  {
    level: 'A2', exposure: 'reserved', status: 'production-brief',
    recording: {
      targetDurationSeconds: [34, 45], paceWordsPerMinute: [120, 140], delivery: 'Realistic but intelligible station announcement; contrast the delayed train with the on-time connection.',
      turns: [{ speaker: 'narrator', text: 'The eleven twenty train to Brighton is delayed by twenty minutes because of a signalling problem. It will now leave from platform six, not platform four. Passengers for Brighton should remain in the station. The connecting train to Seaford will wait at Brighton, so you will not need to buy a new ticket. We apologise for the delay.' }],
    },
    questions: [
      { subdomain: 'detail', prompt: 'Where will the Brighton train leave from?', options: ['Platform four', 'Platform six', 'The Seaford platform'], correctIndex: 1, rationale: 'The new departure point is platform six.', distractorRationales: ['Platform four is the original platform.', 'No platform number is given for the connection.'] },
      { subdomain: 'inference', prompt: 'What concern does the announcement answer for Seaford passengers?', options: ['Whether the station will close', 'Whether Brighton tickets are sold out', 'Whether they can still make their connection'], correctIndex: 2, rationale: 'Saying the Seaford train will wait reassures passengers that the delayed arrival will not break the connection.', distractorRationales: ['Station closing is not discussed.', 'Ticket availability is not the issue.'] },
    ],
  },
  {
    level: 'A2', exposure: 'reserved', status: 'production-brief',
    recording: {
      targetDurationSeconds: [38, 50], paceWordsPerMinute: [120, 140], delivery: 'Friendly museum coordinator; numbered sequence signalled with first, after that and finally.',
      turns: [{ speaker: 'narrator', text: 'Welcome to your first morning as museum volunteers. First, leave your coats and bags in the staff room downstairs. At nine thirty, meet Carla beside the dinosaur gallery for a short safety tour. After that, you will help visitors find the new photography exhibition. Please do not answer questions about the pictures yet; an exhibition guide will join you after lunch. Finally, sign out at the front desk before you leave.' }],
    },
    questions: [
      { subdomain: 'discourse-tracking', prompt: 'What happens immediately after the safety tour?', options: ['Volunteers help visitors find an exhibition', 'Volunteers answer questions about the pictures', 'Volunteers sign out at the front desk'], correctIndex: 0, rationale: 'After the safety tour, volunteers are assigned to direct visitors to the photography exhibition.', distractorRationales: ['They are told not to answer picture questions yet.', 'Signing out is the final action before leaving.'] },
      { subdomain: 'detail', prompt: 'Where should volunteers meet Carla?', options: ['In the downstairs staff room', 'Beside the dinosaur gallery', 'At the photography desk'], correctIndex: 1, rationale: 'Carla will meet them beside the dinosaur gallery at nine thirty.', distractorRationales: ['The staff room is for belongings.', 'No photography desk is mentioned.'] },
    ],
  },
  {
    level: 'A2', exposure: 'reserved', status: 'production-brief',
    recording: {
      targetDurationSeconds: [36, 48], paceWordsPerMinute: [120, 140], delivery: 'Club organiser leaving an upbeat voice message; emphasize the venue change and unchanged time.',
      turns: [{ speaker: 'narrator', text: 'Hi everyone, a quick change for Tuesday’s cooking club. The college kitchen has a water problem, so we will meet at Rosa’s Café across from the library. The start time is still six thirty. Rosa will show us how to make vegetable soup, but there is only space for twelve people. Reply to my message by Monday evening if you want to come. You do not need to bring any equipment.' }],
    },
    questions: [
      { subdomain: 'detail', prompt: 'What has changed about Tuesday’s club?', options: ['The lesson topic', 'The starting time', 'The meeting place'], correctIndex: 2, rationale: 'The venue moves from the college kitchen to Rosa’s Café, while the time remains six thirty.', distractorRationales: ['The soup topic is simply announced, not described as a change.', 'The speaker explicitly says the time is unchanged.'] },
      { subdomain: 'speaker-intent', prompt: 'Why should members reply by Monday evening?', options: ['The café has limited space', 'They must borrow cooking equipment', 'The library closes on Tuesday'], correctIndex: 0, rationale: 'The organiser needs confirmations because only twelve people can fit.', distractorRationales: ['Members are told not to bring equipment.', 'The library only helps locate the café.'] },
    ],
  },
  {
    level: 'A2', exposure: 'reserved', status: 'production-brief',
    recording: {
      targetDurationSeconds: [38, 52], paceWordsPerMinute: [120, 140], delivery: 'Polite shop conversation with a small misunderstanding resolved in the final turn.',
      turns: [
        { speaker: 'speaker-a', text: 'I bought these walking shoes yesterday, but one feels smaller than the other.' },
        { speaker: 'speaker-b', text: 'Let me check. The shoes are the same size, but this one has the wrong insole inside. I can replace the insoles now.' },
        { speaker: 'speaker-a', text: 'Could I change the shoes for a different colour instead?' },
        { speaker: 'speaker-b', text: 'Yes, but the blue pair costs ten pounds more. The brown pair is the same price.' },
        { speaker: 'speaker-a', text: 'Then I’ll take the brown pair, please.' },
      ],
    },
    questions: [
      { subdomain: 'inference', prompt: 'What caused the shoes to feel different?', options: ['They were different sizes', 'One had the wrong insole', 'One shoe was already used'], correctIndex: 1, rationale: 'The assistant finds that the size matches but one insole is wrong.', distractorRationales: ['The assistant explicitly says both shoes are the same size.', 'Nothing suggests either shoe was used.'] },
      { subdomain: 'detail', prompt: 'Which replacement does the customer choose?', options: ['The original shoes with new insoles', 'The more expensive blue pair', 'The brown pair at the same price'], correctIndex: 2, rationale: 'The customer accepts the brown pair after learning it costs the same.', distractorRationales: ['The customer asks to change colour rather than keep the original pair.', 'The customer avoids the blue pair’s additional cost.'] },
    ],
  },
];

export const ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS: readonly DiagnosticListeningProductionBrief[] = briefs.map((brief, index) => {
  const order = briefs.slice(0, index).filter(candidate => candidate.level === brief.level).length + 1;
  const id = `en-${brief.level.toLowerCase()}-listening-original-${String(order).padStart(2, '0')}`;
  return {
    ...brief,
    id,
    benchmark: {
      source: 'aggregate-legacy-duration-profile',
      note: 'Duration and delivery envelope informed by recovered WeLearn audio; script, construct and questions are newly authored and reserved.',
    },
    audioArtifact: {
      mediaId: id,
      privateObjectPath: `en/reserved/${ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_VERSION}/${id}.mp3`,
      status: 'not-recorded',
      sha256: null,
      durationSeconds: null,
      transcriptReview: 'pending',
      alignmentReview: 'pending',
    },
  };
});
