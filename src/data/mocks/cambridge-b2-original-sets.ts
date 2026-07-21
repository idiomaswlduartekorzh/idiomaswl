import type { MockExam, MockSection, MCQQuestion, FormBlank } from './types';
import { SET_LISTENING, buildListeningSections } from './cambridge-b2-listening-sets';

type TopicSpec = {
  set: number;
  theme: string;
  subtitle: string;
  project: string;
  short: string;
  community: string;
  place: string;
  protagonist: string;
  partner: string;
  problem: string;
  practicalSkill: string;
  p1Title: string;
  p2Title: string;
  essayTopic: string;
  part3Question: string;
  prompts: string[];
  photoA: string;
  photoB: string;
};

const TOPICS: TopicSpec[] = [
  {
    set: 2,
    theme: 'repair cafes',
    subtitle: 'Repair cafes - Community projects - Practical skills',
    project: 'repair cafe',
    short: 'waste and repair',
    community: 'Riverside',
    place: 'community hall',
    protagonist: 'Maya',
    partner: 'Jonas',
    problem: 'broken household items were being thrown away too quickly',
    practicalSkill: 'repairing everyday objects',
    p1Title: 'The return of repair cafes',
    p2Title: 'neighbourhood repair projects',
    essayTopic: 'Local councils should fund repair cafes and similar community projects.',
    part3Question: 'How can towns encourage people to repair things instead of replacing them?',
    prompts: ['school workshops', 'tool libraries', 'monthly repair events', 'online tutorials', 'discounts on spare parts'],
    photoA: 'people repairing a bicycle together in a busy workshop',
    photoB: 'a person alone at a kitchen table trying to fix a lamp with online instructions',
  },
  {
    set: 3,
    theme: 'micro-libraries',
    subtitle: 'Street libraries - Reading culture - Local volunteers',
    project: 'street library network',
    short: 'reading access',
    community: 'Mapleton',
    place: 'old bus shelter',
    protagonist: 'Oliver',
    partner: 'Aisha',
    problem: 'many families lived far from the public library',
    practicalSkill: 'sharing books and recommending reading',
    p1Title: 'Tiny libraries, big conversations',
    p2Title: 'street library networks',
    essayTopic: 'Every neighbourhood should provide free spaces where people can borrow and exchange books.',
    part3Question: 'How can communities encourage teenagers to read more for pleasure?',
    prompts: ['book clubs', 'reading challenges', 'author visits', 'free street libraries', 'student review blogs'],
    photoA: 'two teenagers choosing books from a small outdoor library box',
    photoB: 'a student reading an ebook alone on a crowded train',
  },
  {
    set: 4,
    theme: 'urban wildlife photography',
    subtitle: 'Urban wildlife - Photography - Environmental awareness',
    project: 'wildlife photography club',
    short: 'urban nature',
    community: 'Hillford',
    place: 'park visitor centre',
    protagonist: 'Priya',
    partner: 'Leo',
    problem: 'local residents rarely noticed the wildlife living around them',
    practicalSkill: 'observing and photographing urban wildlife',
    p1Title: 'Wildlife through a city lens',
    p2Title: 'urban nature clubs',
    essayTopic: 'Schools should spend more time teaching students about nature in their local area.',
    part3Question: 'How can cities help people notice and protect local wildlife?',
    prompts: ['guided walks', 'school gardens', 'photo competitions', 'clearer park signs', 'citizen science apps'],
    photoA: 'a small group photographing birds beside a city canal',
    photoB: 'a person scrolling through nature photos on a phone indoors',
  },
  {
    set: 5,
    theme: 'career change after volunteering',
    subtitle: 'Volunteering - Career change - Adult learning',
    project: 'career mentoring circle',
    short: 'career confidence',
    community: 'Northbridge',
    place: 'training room above a library',
    protagonist: 'Daniel',
    partner: 'Mei',
    problem: 'adults felt stuck in jobs they no longer enjoyed',
    practicalSkill: 'planning a realistic career change',
    p1Title: 'Volunteering into a new career',
    p2Title: 'career mentoring circles',
    essayTopic: 'Volunteering is one of the best ways for adults to develop new career skills.',
    part3Question: 'What helps adults make a successful career change?',
    prompts: ['short courses', 'mentoring', 'work experience', 'family support', 'career websites'],
    photoA: 'an adult volunteer helping at a community desk',
    photoB: 'a person in office clothes studying job adverts late at night',
  },
  {
    set: 6,
    theme: 'unused buildings',
    subtitle: 'Empty shops - Creative spaces - Town centres',
    project: 'empty shop studio',
    short: 'community spaces',
    community: 'Larchfield',
    place: 'former shoe shop',
    protagonist: 'Sofia',
    partner: 'Ravi',
    problem: 'empty buildings made the high street feel abandoned',
    practicalSkill: 'turning unused rooms into useful public spaces',
    p1Title: 'New life for empty shops',
    p2Title: 'temporary community spaces',
    essayTopic: 'Empty shops in town centres should be offered to community groups at low cost.',
    part3Question: 'What could make town centres more attractive places to spend time?',
    prompts: ['pop-up galleries', 'safe public seating', 'local markets', 'music events', 'youth clubs'],
    photoA: 'volunteers painting the walls of an empty shop',
    photoB: 'people walking past several closed shops on a quiet street',
  },
  {
    set: 7,
    theme: 'skill-swap evenings',
    subtitle: 'Skill swaps - Informal learning - Community confidence',
    project: 'skill-swap evening',
    short: 'informal learning',
    community: 'Brook End',
    place: 'secondary school cafeteria',
    protagonist: 'Nora',
    partner: 'Ethan',
    problem: 'formal classes were too expensive for many residents',
    practicalSkill: 'learning useful skills from neighbours',
    p1Title: 'Learning without a classroom',
    p2Title: 'skill-swap evenings',
    essayTopic: 'People learn more effectively from each other than from online courses.',
    part3Question: 'What makes an informal learning event successful?',
    prompts: ['friendly atmosphere', 'clear instructions', 'small groups', 'useful topics', 'follow-up practice'],
    photoA: 'neighbours teaching each other cooking and budgeting skills at tables',
    photoB: 'a person watching a tutorial alone with several browser tabs open',
  },
  {
    set: 8,
    theme: 'school life skills',
    subtitle: 'Life skills - Schools - Student independence',
    project: 'life skills workshop',
    short: 'student independence',
    community: 'Eastmere',
    place: 'school science lab',
    protagonist: 'Hannah',
    partner: 'Marco',
    problem: 'students lacked confidence with everyday practical tasks',
    practicalSkill: 'managing everyday adult responsibilities',
    p1Title: 'Lessons for life',
    p2Title: 'life skills workshops',
    essayTopic: 'Schools should teach practical life skills as seriously as academic subjects.',
    part3Question: 'Which practical skills are most useful for students before they leave school?',
    prompts: ['cooking', 'budgeting', 'first aid', 'time management', 'basic repairs'],
    photoA: 'students learning basic cooking skills in a school kitchen',
    photoB: 'a student reading exam notes beside unpaid bills and a calendar',
  },
  {
    set: 9,
    theme: 'local festivals',
    subtitle: 'Local events - Belonging - Volunteer teams',
    project: 'neighbourhood festival team',
    short: 'local belonging',
    community: 'Oak Lane',
    place: 'market square',
    protagonist: 'Sam',
    partner: 'Clara',
    problem: 'people rarely met their neighbours outside work',
    practicalSkill: 'organising inclusive local events',
    p1Title: 'The festival around the corner',
    p2Title: 'neighbourhood festivals',
    essayTopic: 'Local festivals are important because they create a stronger sense of community.',
    part3Question: 'How can local events include people of different ages and backgrounds?',
    prompts: ['free activities', 'food stalls', 'student performers', 'quiet spaces', 'volunteer guides'],
    photoA: 'families and older residents talking at a small street festival',
    photoB: 'a person watching a large concert from far back in a crowd',
  },
  {
    set: 10,
    theme: 'teen connection hubs',
    subtitle: 'Teen wellbeing - Safe spaces - Peer support',
    project: 'teen connection hub',
    short: 'youth connection',
    community: 'Westhaven',
    place: 'sports pavilion',
    protagonist: 'Elena',
    partner: 'Tom',
    problem: 'young people felt isolated after school and at weekends',
    practicalSkill: 'building supportive peer communities',
    p1Title: 'A place after school',
    p2Title: 'teen connection hubs',
    essayTopic: 'Teenagers need safe community spaces as much as they need online social networks.',
    part3Question: 'What helps teenagers feel more connected to their community?',
    prompts: ['sports clubs', 'creative workshops', 'mental health support', 'youth volunteering', 'safe transport'],
    photoA: 'teenagers planning a project together in a relaxed community room',
    photoB: 'a teenager sitting alone on a bed using a phone',
  },
];

const MCQ_ANSWER_PATTERN = [0, 2, 1, 3, 2, 0, 3, 1, 1, 3, 0, 2, 3, 1, 2, 0];

function option(text: string, answer: number, targetAnswer = answer): Pick<MCQQuestion, 'options' | 'answer'> {
  const rawOptions = text.split('|');
  const target = ((targetAnswer % rawOptions.length) + rawOptions.length) % rawOptions.length;
  const rotation = ((target - answer) % rawOptions.length + rawOptions.length) % rawOptions.length;
  const options = rawOptions.map((_, index) => rawOptions[(index - rotation + rawOptions.length) % rawOptions.length]);
  return {
    options,
    answer: target,
  };
}

function optionShift(t: TopicSpec, questionIndex: number, optionCount = 4) {
  return MCQ_ANSWER_PATTERN[(t.set + questionIndex) % MCQ_ANSWER_PATTERN.length] % optionCount;
}

function makePart1(t: TopicSpec): MockSection {
  const questions: MCQQuestion[] = [
    { type: 'mcq', id: `s${t.set}-p1-q1`, part: 1, text: '(1) best fits the gap.', ...option('replace|predict|reshape|measure', 2, optionShift(t, 1)) },
    { type: 'mcq', id: `s${t.set}-p1-q2`, part: 1, text: '(2) best fits the gap.', ...option('paid|attracted|caught|earned', 1, optionShift(t, 2)) },
    { type: 'mcq', id: `s${t.set}-p1-q3`, part: 1, text: '(3) best fits the gap.', ...option('realised|announced|admired|remembered', 0, optionShift(t, 3)) },
    { type: 'mcq', id: `s${t.set}-p1-q4`, part: 1, text: '(4) best fits the gap.', ...option('from|than|for|over', 1, optionShift(t, 4)) },
    { type: 'mcq', id: `s${t.set}-p1-q5`, part: 1, text: '(5) best fits the gap.', ...option('receive|collect|capture|admit', 0, optionShift(t, 5)) },
    { type: 'mcq', id: `s${t.set}-p1-q6`, part: 1, text: '(6) best fits the gap.', ...option('shown|turned|made|proved', 3, optionShift(t, 6)) },
    { type: 'mcq', id: `s${t.set}-p1-q7`, part: 1, text: '(7) best fits the gap.', ...option('sure|bound|likely|able', 2, optionShift(t, 7)) },
    { type: 'mcq', id: `s${t.set}-p1-q8`, part: 1, text: '(8) best fits the gap.', ...option('through|beyond|beside|among', 1, optionShift(t, 8)) },
  ];

  return {
    part: 1,
    title: 'Reading & Use of English - Part 1: Multiple Choice Cloze',
    skill: 'reading',
    instructions: 'For questions 1-8, read the text below and decide which answer (A, B, C or D) best fits each gap.',
    passage: `${t.p1Title.toUpperCase()}\n\nAcross many towns, ${t.project}s have begun to (1) _____ how residents think about ${t.short}. At first, the idea (2) _____ little attention outside a small group of volunteers, but organisers soon (3) _____ that the project was meeting a need people had not been able to name. What surprised them most was not the level of interest, but the variety of people who arrived with questions, doubts and half-formed ideas.\n\nRather (4) _____ presenting themselves as experts, the volunteers created a relaxed space where visitors could (5) _____ practical advice, test simple techniques and talk about the problems they faced. This approach has (6) _____ to be effective because people are more (7) _____ to return when they feel respected rather than instructed. It also makes it easier for confident participants to become helpers without needing formal training.\n\nSupporters say the benefits go (8) _____ saving money. Projects like these can reduce waste, build confidence and help neighbours discover skills that already exist in their own community.`,
    questions,
  };
}

function makePart2(t: TopicSpec): MockSection {
  const blanks: FormBlank[] = [
    { num: 9, answers: ['has'] },
    { num: 10, answers: ['a'] },
    { num: 11, answers: ['that', 'which'] },
    { num: 12, answers: ['well'] },
    { num: 13, answers: ['in'] },
    { num: 14, answers: ['out'] },
    { num: 15, answers: ['to'] },
    { num: 16, answers: ['this'] },
  ];

  return {
    part: 2,
    title: 'Reading & Use of English - Part 2: Open Cloze',
    skill: 'reading',
    instructions: 'For questions 9-16, read the text below and think of the word which best fits each gap. Use only one word in each gap.',
    questions: [
      {
        type: 'formgroup',
        id: `s${t.set}-p2`,
        part: 2,
        qRange: [9, 16],
        groupLabel: 'Write ONE word for each gap.',
        title: t.p2Title,
        template: `THE RISE OF ${t.p2Title.toUpperCase()}\n\nThere {{9}} been a steady increase in ${t.project}s during the last decade. In many cases, the people who start them are not experts, but residents with {{10}} clear sense of what their area needs. They often begin with one practical aim, then slowly discover that the project can answer social needs as well.\n\nThe best projects are those {{11}} make participation simple. As {{12}} as offering practical help, they provide a reason for people to meet regularly. Newcomers often join {{13}} order to solve one immediate problem, but they soon find out that the social side matters just as much.\n\nOrganisers point {{14}} that a project is unlikely {{15}} last unless responsibility is shared. Despite {{16}}, even a small group can have a visible effect when it meets consistently and welcomes beginners. The challenge is to stay open enough for new people while keeping the organisation clear.`,
        blanks,
      },
    ],
  };
}

function makePart3(t: TopicSpec): MockSection {
  const blanks: FormBlank[] = [
    { num: 17, answers: ['importance'] },
    { num: 18, answers: ['popularity'] },
    { num: 19, answers: ['supportive'] },
    { num: 20, answers: ['practical'] },
    { num: 21, answers: ['confidence'] },
    { num: 22, answers: ['increasingly'] },
    { num: 23, answers: ['responsibility'] },
    { num: 24, answers: ['successful'] },
  ];

  return {
    part: 3,
    title: 'Reading & Use of English - Part 3: Word Formation',
    skill: 'reading',
    instructions: 'For questions 17-24, use the word given in capitals to form a word that fits in the gap.',
    questions: [
      {
        type: 'formgroup',
        id: `s${t.set}-p3`,
        part: 3,
        qRange: [17, 24],
        groupLabel: 'Form a word from the word in capitals.',
        title: 'A local idea with wider impact',
        template: `A LOCAL IDEA WITH WIDER IMPACT\n\nIt is easy to underestimate the {{17}} [IMPORTANT] of a small local project. One reason for the {{18}} [POPULAR] of the ${t.project} in ${t.community} is that the atmosphere is deliberately {{19}} [SUPPORT]. This matters because adults are often reluctant to admit that they need help with ordinary tasks.\n\nParticipants learn {{20}} [PRACTICE] skills, but many also gain {{21}} [CONFIDENT] when they realise that mistakes are a normal part of learning. The project has become {{22}} [INCREASE] visible because members share the {{23}} [RESPONSIBLE] for welcoming newcomers.\n\nAccording to local organisers, the most {{24}} [SUCCESS] sessions are not the ones with perfect results, but the ones where people leave wanting to come back. In that sense, progress is measured as much by attitude as by achievement.`,
        blanks,
      },
    ],
  };
}

function makePart4(t: TopicSpec): MockSection {
  return {
    part: 4,
    title: 'Reading & Use of English - Part 4: Key Word Transformations',
    skill: 'reading',
    instructions: 'For questions 25-30, complete the second sentence so that it has a similar meaning to the first sentence. Use the word given. Do not change the word given. Use two to five words.',
    questions: [
      {
        type: 'formgroup',
        id: `s${t.set}-p4`,
        part: 4,
        qRange: [25, 30],
        groupLabel: 'Write the missing words. Include the key word.',
        template: `25. It is possible that the ${t.project} will be postponed if too few people register.\nMAY\nThe ${t.project} {{25}} if too few people register.\n\n26. "Why don't we invite local students?" ${t.protagonist} said.\nSUGGESTED\n${t.protagonist} {{26}} local students.\n\n27. People think the project started in a spare room at the ${t.place}.\nBELIEVED\nThe project {{27}} in a spare room at the ${t.place}.\n\n28. The first meeting was so useful that everyone stayed late.\nSUCH\nIt {{28}} meeting that everyone stayed late.\n\n29. I last volunteered at the centre two months ago.\nFOR\nI {{29}} two months.\n\n30. The organisers will only accept late applications in exceptional cases.\nUNLESS\nLate applications {{30}} there are exceptional cases.`,
        blanks: [
          { num: 25, answers: ['may be postponed'] },
          { num: 26, answers: ['suggested inviting', 'suggested that they invite'] },
          { num: 27, answers: ['is believed to have started'] },
          { num: 28, answers: ['was such a useful'] },
          { num: 29, answers: ['have not volunteered for', "haven't volunteered for"] },
          { num: 30, answers: ['will not be accepted unless', "won't be accepted unless"] },
        ],
      },
    ],
  };
}

function makePart5(t: TopicSpec): MockSection {
  const passage = `WHEN ${t.protagonist.toUpperCase()} SAID YES

${t.protagonist} did not intend to become the person everyone associated with the ${t.project} in ${t.community}. The idea began on a wet Tuesday evening when ${t.partner}, a neighbour she knew only slightly, knocked on her door and asked whether she could help with a simple but persistent problem: ${t.problem}. ${t.protagonist} agreed to attend one planning meeting, mostly because saying no felt unkind.

The first meeting took place in the ${t.place}. Only six people came, and two of them left early because they had expected a more professional presentation. The group had no logo, no budget and no clear system for deciding what to do first. What it did have was a table full of notes, a kettle that took too long to boil and a strong feeling that the community was wasting something valuable.

The lack of polish was uncomfortable, especially for people who had spent years being told that community work needed glossy leaflets and confident public speakers. Yet it also made the project easier to enter. Nobody had to pretend to be an expert, and suggestions could be tested quickly because there was no complicated structure to protect. ${t.protagonist} later realised that this rough beginning gave residents a sense of ownership that a more carefully managed launch might have prevented.

For several weeks progress was slow. Some residents doubted that a small volunteer group could make any difference, while others worried that beginners would be embarrassed if they made mistakes. ${t.protagonist} nearly gave up after a session where almost nothing went according to plan. Then, at a public demonstration, an older visitor looked around the room and said, "I thought this was not for people like me." That sentence stayed with ${t.protagonist} because it revealed the real purpose of the project.

After that, the organisers changed their approach. Instead of trying to look polished, they made every session welcoming. They explained that confusion was normal, paired new visitors with patient volunteers and celebrated small successes. People began returning with friends, and the project became less about ${t.practicalSkill} than about giving residents permission to try.

The change also affected the volunteers. They stopped measuring success only by the number of problems solved in a session and began noticing quieter results: a teenager asking a question without apologising, a retired neighbour offering to show someone else what he had learned, or two strangers agreeing to meet again the following week. These moments were difficult to record on a funding form, but they were exactly what made the project matter.

There were still disagreements. Some volunteers wanted the project to expand into nearby towns, while others argued that growth would destroy the atmosphere that made beginners feel safe. ${t.protagonist} found herself in the unexpected position of defending slowness. She was not against ambition, but she had seen how quickly a useful local idea could become exhausting if every new success created another demand.

The project also made ${t.protagonist} more cautious about the word "success". A crowded room could look impressive in a photograph, but it did not always mean people had learned anything or felt able to return. A quieter session, where two newcomers stayed long enough to ask a second question, often told her more about whether the project was working.

Two years later, ${t.protagonist} still refuses to describe the project as finished. There are problems with space, money and time, but she has learned that a community project does not need to be perfect to be useful. It needs to be trusted.`;

  const questions: MCQQuestion[] = [
    {
      type: 'mcq',
      id: `s${t.set}-p5-q31`,
      part: 5,
      text: '(31) Why did the protagonist first get involved in the project?',
      ...option('She had been looking for a leadership role.|She wanted to improve her professional skills.|Someone asked her to help with a specific local problem.|She had previously organised a similar project.', 2, optionShift(t, 11)),
    },
    {
      type: 'mcq',
      id: `s${t.set}-p5-q32`,
      part: 5,
      text: '(32) What is suggested about the first meeting?',
      ...option('It was more successful than expected.|It lacked organisation and confidence.|It attracted a large number of residents.|It was led by professional advisers.', 1, optionShift(t, 12)),
    },
    {
      type: 'mcq',
      id: `s${t.set}-p5-q33`,
      part: 5,
      text: '(33) Why was the older visitor\'s comment important?',
      ...option('It helped the organisers understand who felt excluded.|It proved that the project needed more money.|It showed that the volunteers had made a serious mistake.|It persuaded the council to support the project.', 0, optionShift(t, 13)),
    },
    {
      type: 'mcq',
      id: `s${t.set}-p5-q34`,
      part: 5,
      text: '(34) How did the organisers change the project?',
      ...option('They introduced stricter rules for volunteers.|They focused on making sessions feel less intimidating.|They reduced the number of public events.|They asked beginners to observe before taking part.', 1, optionShift(t, 14)),
    },
    {
      type: 'mcq',
      id: `s${t.set}-p5-q35`,
      part: 5,
      text: '(35) What has the protagonist learned?',
      ...option('Community projects should avoid ambitious goals.|Professional presentation matters more than results.|Trust can be more important than perfection.|Projects only succeed when they have secure funding.', 2, optionShift(t, 15)),
    },
    {
      type: 'mcq',
      id: `s${t.set}-p5-q36`,
      part: 5,
      text: '(36) What is the best description of the writer\'s attitude to the project?',
      ...option('Critical but amused.|Hopeful but realistic.|Surprised and confused.|Proud but regretful.', 1, optionShift(t, 16)),
    },
  ];

  return {
    part: 5,
    title: 'Reading & Use of English - Part 5: Multiple Choice Reading',
    skill: 'reading',
    instructions: 'You are going to read an article. For questions 31-36, choose the answer (A, B, C or D) which you think fits best according to the text.',
    passage,
    questions,
  };
}

function makePart6(t: TopicSpec): MockSection {
  return {
    part: 6,
    title: 'Reading & Use of English - Part 6: Gapped Text',
    skill: 'reading',
    instructions: 'Six sentences have been removed from the article. Choose from sentences A-G the one which fits each gap. There is one extra sentence.',
    passage: `FROM SMALL IDEA TO LASTING HABIT

When the ${t.project} first opened in ${t.community}, the organisers knew that strangers would not automatically trust a new community scheme. Previous initiatives in the area had started with enthusiasm but disappeared after a few months, leaving residents doubtful about the next promise. [37] The first sessions were therefore designed to feel more like conversations than classes. Visitors were greeted by name, shown exactly where to go and encouraged to watch for a few minutes before deciding whether to join in.

There were practical limits too. The group had too little equipment, not enough storage and no paid staff. Every decision had to be realistic because the volunteers were fitting the project around jobs, families and study. [38] Instead of trying to offer everything, they chose one clear activity and became good at delivering it. This disappointed a few people at first, but the organisers preferred to be reliable in a narrow area rather than impressive for a single afternoon. It also meant that publicity could be honest: the project promised one useful thing, not a complete transformation of local life.

That decision had an unexpected benefit. Because the project was limited, volunteers could explain it easily and newcomers understood what was expected of them. The project was not advertised as a complete solution, and that honesty made it easier for people to ask modest questions without feeling foolish. [39] It also meant that regular visitors could measure their own progress, because each session built on skills or decisions they had already seen.

After six months, the atmosphere had changed. People who had arrived as nervous beginners were now showing others where to start. Some even arrived early to prepare materials, welcome first-time visitors or translate instructions for neighbours whose English was less confident. [40] The project had begun to produce new volunteers rather than depend on the original team.

The organisers also kept simple records: how many people came, what they learned and which problems appeared repeatedly. They added comments from participants because numbers alone did not explain why the sessions mattered. [41] These notes were not complicated, but they helped the group make a stronger case for support. More importantly, they helped the organisers notice patterns before small frustrations became reasons for people to leave. When several visitors mentioned the same difficulty, the team changed the following session rather than waiting for a formal review.

Most importantly, the project became part of local routine. People stopped asking whether it would continue and started asking what they could bring next time. That shift was small, but it showed that the project had moved from being an interesting experiment to something residents expected to share. For the organisers, this was the first sign that the idea could survive ordinary weeks, not only special launch events. [42]`,
    questions: [
      {
        type: 'matching',
        id: `s${t.set}-p6`,
        part: 6,
        qRange: [37, 42],
        groupLabel: 'Choose the sentence that fits each gap.',
        endings: [
          { letter: 'A', text: 'Without that early limit, the team might have tried to solve too many problems at once.' },
          { letter: 'B', text: 'That decision made the project feel less like a service and more like a shared habit.' },
          { letter: 'C', text: 'For this reason, the first meetings were deliberately small and informal.' },
          { letter: 'D', text: 'The records also helped them explain the value of the project to people who had never attended.' },
          { letter: 'E', text: 'Some members wanted publicity immediately, but others argued that trust had to come first.' },
          { letter: 'F', text: 'By then, several participants had begun teaching the same skills to newcomers.' },
          { letter: 'G', text: 'This was frustrating at first, but it forced the organisers to clarify their priorities.' },
        ],
        items: [
          { num: 37, stem: 'Gap 37', answer: 'C' },
          { num: 38, stem: 'Gap 38', answer: 'G' },
          { num: 39, stem: 'Gap 39', answer: 'A' },
          { num: 40, stem: 'Gap 40', answer: 'F' },
          { num: 41, stem: 'Gap 41', answer: 'D' },
          { num: 42, stem: 'Gap 42', answer: 'B' },
        ],
      },
    ],
  };
}

function makePart7(t: TopicSpec): MockSection {
  return {
    part: 7,
    title: 'Reading & Use of English - Part 7: Multiple Matching',
    skill: 'reading',
    instructions: 'You are going to read five short texts about people involved in a community project. For questions 43-52, choose from sections A-E. The sections may be chosen more than once.',
    passage: `${t.theme.toUpperCase()}: FIVE EXPERIENCES

A - ${t.protagonist}
I joined for practical reasons rather than enthusiasm. I needed help with ${t.practicalSkill}, and I thought one evening would be enough. During the first session I made a mistake that everyone could see, but instead of laughing, the group turned it into a better checklist for beginners. That changed how I felt about learning in public. I stayed because the mistake became useful rather than embarrassing, and that is still the best explanation of why the project works. It is easier to be brave when the people around you treat uncertainty as information. By the end of the first month, I was still making mistakes, but I no longer treated them as proof that I should leave. That shift has made me more patient outside the project too.

B - ${t.partner}
My grandmother persuaded me to go. She has always believed that people are more patient than we expect, and she was right. I was surprised by how calmly experienced members explained things, even when I asked basic questions. They did not rush to take over, which helped me remember the steps myself. Without that family push, I would probably still assume the project was meant for other people. Now I bring friends who say exactly the same thing I used to say: that they are interested, but not ready. A personal invitation can be more persuasive than any poster because it answers the worry people rarely admit.

C - Council volunteer
Getting permission was harder than running the sessions. Some decision-makers liked the idea but were unsure whether residents would attend regularly. I collected photos, attendance figures and short comments from participants, then used that evidence to persuade them that the project deserved a chance. The evidence was not dramatic, but it showed steady commitment, and that mattered more to the council than one enthusiastic speech. I also learned to describe the project in practical terms, because officials need to know what support will actually achieve. Once permission was granted, keeping records became less of a formality and more of a way to protect the project.

D - Online learner
Before joining, I watched dozens of videos and compared our small local project with impressive examples online. That nearly put me off because everything on the internet looked more professional. The videos made me familiar with the vocabulary, but they could not tell me whether I was hesitating for a good reason or simply losing confidence. In the end, online tools helped me prepare, but face-to-face support made the biggest difference. A person standing beside you can notice the exact moment when encouragement is more useful than another explanation. I still use online resources, but now I treat them as preparation rather than replacement.

E - Workshop host
Teaching others has forced me to understand the project more clearly. It is not enough to know how to do something; you have to explain it in a way that makes people feel capable. I have learned to pause, ask what someone has already tried and leave space for them to make the next decision. The reason the project works is that responsibility is shared. No single person has to be the expert all the time. That keeps the atmosphere relaxed, but it also protects the project from depending too heavily on one confident organiser. New hosts now take turns leading small parts of the session, which makes the project feel less fragile. It has become a place where teaching is treated as a skill people can learn, not a role reserved for naturally confident speakers.`,
    questions: [
      {
        type: 'matching',
        id: `s${t.set}-p7`,
        part: 7,
        qRange: [43, 52],
        groupLabel: 'Which section mentions the following?',
        endings: [
          { letter: 'A', text: `${t.protagonist}` },
          { letter: 'B', text: `${t.partner}` },
          { letter: 'C', text: 'Council volunteer' },
          { letter: 'D', text: 'Online learner' },
          { letter: 'E', text: 'Workshop host' },
        ],
        items: [
          { num: 43, stem: 'being motivated by a family member', answer: 'B' },
          { num: 44, stem: 'an early mistake leading to an improvement', answer: 'A' },
          { num: 45, stem: 'having to persuade people in authority', answer: 'C' },
          { num: 46, stem: 'using online tools but preferring in-person help', answer: 'D' },
          { num: 47, stem: 'teaching others changing their own understanding', answer: 'E' },
          { num: 48, stem: 'joining for practical reasons rather than enthusiasm', answer: 'A' },
          { num: 49, stem: 'being surprised by the patience of experienced members', answer: 'B' },
          { num: 50, stem: 'collecting evidence to get support', answer: 'C' },
          { num: 51, stem: 'finding online examples discouraging at first', answer: 'D' },
          { num: 52, stem: 'saying shared responsibility is central to success', answer: 'E' },
        ],
      },
    ],
  };
}

function makeWriting(t: TopicSpec): MockSection {
  return {
    part: 8,
    title: 'Writing',
    skill: 'writing',
    instructions: 'Answer Part 1 and one task from Part 2. Write 140-190 words for each answer.',
    questions: [
      {
        type: 'write',
        id: `s${t.set}-wr1`,
        part: 8,
        taskNumber: 1,
        stimulusLabel: 'Part 1 - Essay',
        stimulus: `In your English class you have been discussing community projects. Your teacher has asked you to write an essay.\n\n${t.essayTopic}\n\nNotes - Write about:\n1. benefits for local people\n2. cost and organisation\n3. your own idea`,
        text: 'Write your essay in 140-190 words. Use all the notes and give reasons for your point of view.',
        minWords: 140,
      },
      {
        type: 'write',
        id: `s${t.set}-wr2`,
        part: 8,
        taskNumber: 2,
        stimulusLabel: 'Part 2 - Choose ONE task',
        stimulus: `Write an answer to ONE of the questions 2-4. Write 140-190 words.\n\n2. Article\nAn English-language website is asking for articles about local projects that bring people together. Describe the ${t.project} in ${t.community}, explain why it matters and say who should take part.\n\n3. Email\nYou have received an email from a friend who wants to start a similar project. Give practical advice about finding volunteers, choosing a place and avoiding one possible problem.\n\n4. Review\nYour school newsletter wants reviews of community events or workshops. Review a session at the ${t.project}, describe what happened and say whether you would recommend it to other students.`,
        text: 'Write the answer to ONE Part 2 task. Begin with the task number you chose: 2, 3 or 4.',
        minWords: 140,
      },
    ],
  };
}

function makeSpeaking(t: TopicSpec): MockSection {
  return {
    part: 9,
    title: 'Speaking',
    skill: 'speaking',
    instructions: 'Practise the four parts of the B2 First Speaking test aloud. The real exam is taken with another candidate and two examiners.',
    questions: [
      {
        type: 'speak',
        id: `s${t.set}-sp1`,
        part: 9,
        partNumber: 1,
        text: 'Part 1 - Interview. Answer the examiner\'s questions about yourself.',
        followUp: [
          'What kind of activities do you usually enjoy doing with other people?',
          'Do you prefer learning something new alone or in a group? Why?',
          'Tell us about a place in your area where people can meet.',
          `Would you like to take part in a ${t.project}? Why or why not?`,
          'How important is it for young people to feel useful in their community?',
        ],
      },
      {
        type: 'speak',
        id: `s${t.set}-sp2`,
        part: 9,
        partNumber: 2,
        text: 'Part 2 - Long turn. Compare the photographs and answer the question.',
        imageUrls: [`/images/cambridge-b2/speaking-set-${t.set}.png`],
        imageAlts: [`Speaking Part 2 comparison: ${t.photoA}; ${t.photoB}`],
        cueCard: `Candidate A photographs:\nPhoto 1: ${t.photoA}.\nPhoto 2: ${t.photoB}.\nQuestion: What might the people enjoy or find difficult about these situations?\n\nCandidate B follow-up: Which situation would help someone learn more effectively?\n\nCandidate B photographs:\nPhoto 1: a small group planning a local event around a table.\nPhoto 2: one person organising notes alone on a laptop.\nQuestion: Why might people choose to work in these different ways?\n\nCandidate A follow-up: Do you usually prefer group planning or independent planning?`,
      },
      {
        type: 'speak',
        id: `s${t.set}-sp3`,
        part: 9,
        partNumber: 3,
        text: 'Part 3 - Collaborative task. Talk together for about two minutes, then make a decision.',
        cueCard: `${t.part3Question}\n\nPrompts:\n- ${t.prompts[0]}\n- ${t.prompts[1]}\n- ${t.prompts[2]}\n- ${t.prompts[3]}\n- ${t.prompts[4]}\n\nFirst discuss how useful each idea might be. Then decide which two ideas would have the biggest impact.`,
      },
      {
        type: 'speak',
        id: `s${t.set}-sp4`,
        part: 9,
        partNumber: 4,
        text: 'Part 4 - Discussion. Answer questions connected to the topic in Part 3.',
        followUp: [
          'Do you think community projects should be organised mainly by volunteers or by local government?',
          'What makes people continue attending a local activity after the first visit?',
          'Some people say online communities are as valuable as local communities. Do you agree?',
          'How can schools encourage students to take responsibility for their local area?',
          `Could a project like a ${t.project} work well in your city? Why or why not?`,
        ],
      },
    ],
  };
}

function buildMock(t: TopicSpec): MockExam {
  const listeningSpec = SET_LISTENING[t.set];
  const listening = listeningSpec ? buildListeningSections(listeningSpec) : [];
  const hasListening = listening.length > 0;
  return {
    id: `set-${t.set}`,
    examSlug: 'cambridge-b2',
    title: `Cambridge B2 First - Practice Test ${t.set}`,
    subtitle: hasListening
      ? `${t.subtitle} - Reading & Use of English · Writing · Listening · Speaking`
      : `${t.subtitle} - Listening pending`,
    timeMinutes: hasListening ? 209 : 169,
    sections: [
      makePart1(t),
      makePart2(t),
      makePart3(t),
      makePart4(t),
      makePart5(t),
      makePart6(t),
      makePart7(t),
      makeWriting(t),
      ...listening,
      makeSpeaking(t),
    ],
  };
}

export const cambridgeB2Set2 = buildMock(TOPICS[0]);
export const cambridgeB2Set3 = buildMock(TOPICS[1]);
export const cambridgeB2Set4 = buildMock(TOPICS[2]);
export const cambridgeB2Set5 = buildMock(TOPICS[3]);
export const cambridgeB2Set6 = buildMock(TOPICS[4]);
export const cambridgeB2Set7 = buildMock(TOPICS[5]);
export const cambridgeB2Set8 = buildMock(TOPICS[6]);
export const cambridgeB2Set9 = buildMock(TOPICS[7]);
export const cambridgeB2Set10 = buildMock(TOPICS[8]);
