import type { MockExam } from './types';

// Cambridge B2 First (FCE) – Practice Test 1
// Structure follows the official Cambridge B2 First exam format.
const mock: MockExam = {
  id: 'set-1',
  examSlug: 'cambridge-b2',
  title: 'Cambridge B2 First – Practice Test 1',
  subtitle: 'Reading & Use of English · Writing · Listening · Speaking',
  timeMinutes: 209,
  sections: [
    // ─────────────────────────────────────────────────────────────────────────
    // PAPER 1 — Part 1: Multiple Choice Cloze (vocabulary)
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 1,
      title: 'Reading & Use of English – Part 1: Multiple Choice Cloze',
      skill: 'reading',
      instructions:
        'For questions 1–8, read the text below and decide which answer (A, B, C or D) best fits each gap. There is an example at the beginning (0).',
      passage:
        "THE SCIENCE OF SLEEP\n\nSleep is essential for human health, yet many people (0) _____ it for granted. Scientists have long known that sleep plays a critical (1) _____ in memory consolidation — the process by which short-term memories are (2) _____ into long-term ones. During sleep, the brain (3) _____ through several cycles, each containing different stages that serve distinct purposes.\n\nOne stage, known as REM sleep, is particularly (4) _____ with dreaming and emotional processing. Research has shown that people (5) _____ of REM sleep often experience increased irritability and difficulty (6) _____ with stress. The body also uses sleep time to (7) _____ tissues, strengthen the immune system and release hormones that regulate growth.\n\nDespite its importance, modern lifestyles (8) _____ with good sleep habits. Artificial light from screens, irregular schedules and workplace stress are among the most common obstacles to a restful night.",
      questions: [
        {
          type: 'mcq',
          id: 'p1-q1',
          part: 1,
          text: '(1) Sleep plays a critical _____ in memory consolidation.',
          options: ['A  role', 'B  part', 'C  function', 'D  place'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1-q2',
          part: 1,
          text: '(2) Short-term memories are _____ into long-term ones.',
          options: ['A  converted', 'B  transferred', 'C  translated', 'D  switched'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1-q3',
          part: 1,
          text: '(3) The brain _____ through several cycles.',
          options: ['A  passes', 'B  goes', 'C  moves', 'D  runs'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1-q4',
          part: 1,
          text: '(4) REM sleep is particularly _____ with dreaming.',
          options: ['A  joined', 'B  linked', 'C  related', 'D  associated'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p1-q5',
          part: 1,
          text: '(5) People _____ of REM sleep often experience irritability.',
          options: ['A  deprived', 'B  lacking', 'C  missed', 'D  absent'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1-q6',
          part: 1,
          text: '(6) Difficulty _____ with stress.',
          options: ['A  handling', 'B  treating', 'C  coping', 'D  managing'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1-q7',
          part: 1,
          text: '(7) The body uses sleep time to _____ tissues.',
          options: ['A  repair', 'B  fix', 'C  cure', 'D  heal'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p1-q8',
          part: 1,
          text: '(8) Modern lifestyles _____ with good sleep habits.',
          options: ['A  conflict', 'B  interfere', 'C  disturb', 'D  interrupt'],
          answer: 1,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PAPER 1 — Part 2: Open Cloze (grammar + vocabulary)
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 2,
      title: 'Reading & Use of English – Part 2: Open Cloze',
      skill: 'reading',
      instructions:
        'For questions 9–16, read the text below and think of the word which best fits each gap. Use only ONE word in each gap.',
      passage:
        "URBAN FARMING\n\nUrban farming — the practice of growing food within a city — has (9) _____ increasingly popular over the past decade. Supporters argue that it reduces (10) _____ carbon footprint associated with transporting food across long distances. Community gardens, rooftop farms and vertical growing systems (11) _____ all examples of this growing movement.\n\n(12) _____ well as providing fresh produce, urban farms can bring communities together and improve mental wellbeing. Studies (13) _____ shown that spending time in green spaces lowers stress levels and increases feelings of happiness.\n\nHowever, critics point (14) _____ that urban land is expensive and that the quantity of food produced is unlikely (15) _____ feed a city's entire population. Despite (16) _____, most experts agree that urban farming plays a valuable role in creating more sustainable cities.",
      questions: [
        {
          type: 'formgroup',
          id: 'p2-q1',
          part: 2,
          qRange: [9, 16],
          groupLabel: 'Write ONE word for each gap (9–16).',
          title: 'Urban Farming',
          template:
            '(9) {{9}} increasingly popular\n(10) {{10}} carbon footprint\n(11) {{11}} all examples\n(12) {{12}} well as providing\n(13) {{13}} shown\n(14) {{14}} that urban land is expensive\n(15) {{15}} feed a city\n(16) {{16}} this',
          blanks: [
            { num: 9,  answers: ['become', 'grown', 'got'] },
            { num: 10, answers: ['the'] },
            { num: 11, answers: ['are'] },
            { num: 12, answers: ['As'] },
            { num: 13, answers: ['have'] },
            { num: 14, answers: ['out'] },
            { num: 15, answers: ['to'] },
            { num: 16, answers: ['this', 'these'] },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PAPER 1 — Part 3: Word Formation
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 3,
      title: 'Reading & Use of English – Part 3: Word Formation',
      skill: 'reading',
      instructions:
        'For questions 17–24, use the word given in capitals at the end of some of the lines to form a word that fits in the gap in the same line.',
      passage:
        "ARTIFICIAL INTELLIGENCE IN EDUCATION\n\nArtificial intelligence is bringing about a (17) _____ [TRANSFORM] in the way students learn. Personalised learning platforms can now adapt to the (18) _____ [INDIVIDUAL] needs of each student, offering a level of (19) _____ [FLEXIBLE] that traditional classrooms cannot match.\n\nTeachers, however, remain (20) _____ [REPLACE] in areas such as emotional support and critical thinking development. The (21) _____ [INTRODUCE] of AI tools has also raised concerns about (22) _____ [DEPEND] on technology and the risk of students losing basic skills.\n\nDespite these (23) _____ [CONCERN], most (24) _____ [EDUCATE] believe that AI, when used wisely, can be a powerful complement to traditional teaching.",
      questions: [
        {
          type: 'formgroup',
          id: 'p3-q1',
          part: 3,
          qRange: [17, 24],
          groupLabel: 'Transform each base word to fit the gap (17–24).',
          title: 'AI in Education – Word Formation',
          template:
            '(17) a {{17}} in the way [TRANSFORM]\n(18) the {{18}} needs [INDIVIDUAL]\n(19) a level of {{19}} [FLEXIBLE]\n(20) teachers remain {{20}} [REPLACE]\n(21) the {{21}} of AI tools [INTRODUCE]\n(22) concerns about {{22}} [DEPEND]\n(23) despite these {{23}} [CONCERN]\n(24) most {{24}} believe [EDUCATE]',
          blanks: [
            { num: 17, answers: ['transformation'] },
            { num: 18, answers: ['individual'] },
            { num: 19, answers: ['flexibility'] },
            { num: 20, answers: ['irreplaceable'] },
            { num: 21, answers: ['introduction'] },
            { num: 22, answers: ['dependence', 'dependency'] },
            { num: 23, answers: ['concerns'] },
            { num: 24, answers: ['educators'] },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PAPER 1 — Part 4: Key Word Transformation
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 4,
      title: 'Reading & Use of English – Part 4: Key Word Transformation',
      skill: 'reading',
      instructions:
        'For questions 25–30, complete the second sentence so that it has a similar meaning to the first sentence, using the word given. Do not change the word given. You must use between TWO and FIVE words, including the word given.',
      questions: [
        {
          type: 'mcq',
          id: 'p4-q25',
          part: 4,
          stimulusLabel: 'Question 25 — Key word: UNLESS',
          stimulus: 'You will not get a refund if you don\'t have a receipt.\nYou will not get a refund _____ a receipt.',
          text: 'Choose the correct completion:',
          options: [
            'unless you have',
            'unless having',
            'unless you will have',
            'unless you had',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4-q26',
          part: 4,
          stimulusLabel: 'Question 26 — Key word: SUGGESTED',
          stimulus: '"Why don\'t we go to the cinema?" said Maria.\nMaria _____ to the cinema.',
          text: 'Choose the correct completion:',
          options: [
            'suggested going',
            'suggested to go',
            'suggested us going',
            'suggested that we go',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4-q27',
          part: 4,
          stimulusLabel: 'Question 27 — Key word: DESPITE',
          stimulus: 'Although it was cold, they went for a walk.\nThey went for a walk _____ cold.',
          text: 'Choose the correct completion:',
          options: [
            'despite it being',
            'despite the cold being',
            'despite of the',
            'despite it was',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4-q28',
          part: 4,
          stimulusLabel: 'Question 28 — Key word: ENOUGH',
          stimulus: 'She is too young to drive a car.\nShe is not _____ drive a car.',
          text: 'Choose the correct completion:',
          options: [
            'old enough to',
            'enough old to',
            'old enough for',
            'enough to be old to',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4-q29',
          part: 4,
          stimulusLabel: 'Question 29 — Key word: MADE',
          stimulus: 'It was the manager who forced them to work overtime.\nThey _____ work overtime by the manager.',
          text: 'Choose the correct completion:',
          options: [
            'were made to',
            'were made for',
            'were made into',
            'had made to',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4-q30',
          part: 4,
          stimulusLabel: 'Question 30 — Key word: USED',
          stimulus: 'I no longer find it difficult to wake up early.\nI _____ waking up early difficult.',
          text: 'Choose the correct completion:',
          options: [
            'used to find',
            'used to finding',
            'am used to finding',
            'got used to find',
          ],
          answer: 0,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PAPER 1 — Part 5: Multiple Choice Reading (long text)
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 5,
      title: 'Reading & Use of English – Part 5: Multiple Choice Reading',
      skill: 'reading',
      instructions:
        'You are going to read an article. For questions 31–36, choose the answer (A, B, C or D) which you think fits best according to the text.',
      passage:
        'THE LAST BOOKSHOP\n\nWhen Elena first walked past the small bookshop on Crane Street, she almost missed it entirely. A narrow door, barely visible between a bakery and an estate agent, led into a world that felt entirely separate from the busy high street outside. The owner, an elderly man named George, barely looked up from behind a towering pile of second-hand paperbacks.\n\n"We get all sorts," he told her later, after she had spent nearly two hours browsing. "Students writing dissertations, retired professors, teenagers who\'ve just discovered they love reading. What they all have in common is that they\'re not in a rush."\n\nElena had stumbled across the shop by accident, having taken a wrong turn while looking for a coffee shop. She had grown up in the town but had never noticed the place before. "It\'s the kind of shop that finds you when you\'re ready for it," George said, somewhat cryptically.\n\nThe shop had survived everything: two recessions, the arrival of internet booksellers, even a small fire in 2015 that destroyed the history section. Its walls were lined floor to ceiling with books of every description, organised in a system that appeared chaotic but which George navigated with effortless precision. He could locate any title within seconds.\n\n"People ask me why I don\'t just sell online," he said, straightening a row of travel books. "But that\'s not what this is about. It\'s about the experience of discovery, of picking up something you weren\'t looking for and finding exactly what you needed."\n\nElena bought three books she had never heard of and walked home feeling inexplicably lighter. She returned the following Saturday, and the one after that.',
      questions: [
        {
          type: 'mcq',
          id: 'p5-q31',
          part: 5,
          text: '(31) What does the reader learn about the bookshop in the first paragraph?',
          options: [
            'A  It was well-known in the town.',
            'B  It was difficult to notice from the street.',
            'C  It had recently been renovated.',
            'D  It was always full of customers.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5-q32',
          part: 5,
          text: '(32) What does George say is shared by all his customers?',
          options: [
            'A  They are all students or academics.',
            'B  They visit regularly.',
            'C  They are not in a hurry.',
            'D  They buy large quantities of books.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5-q33',
          part: 5,
          text: '(33) How did Elena first find the bookshop?',
          options: [
            'A  A friend had recommended it.',
            'B  She had always wanted to visit it.',
            'C  She came across it while lost.',
            'D  She saw it advertised online.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5-q34',
          part: 5,
          text: '(34) What does the writer suggest about the organisation of the shop?',
          options: [
            'A  It was impossible to find anything.',
            'B  Only George understood how it worked.',
            'C  It had recently been reorganised.',
            'D  Customers preferred it disorganised.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5-q35',
          part: 5,
          text: '(35) Why does George choose not to sell books online?',
          options: [
            'A  He does not know how to use the internet.',
            'B  He values the physical experience of browsing.',
            'C  His books are too old to be sold online.',
            'D  He makes more money in the physical shop.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5-q36',
          part: 5,
          text: '(36) How does Elena feel when she leaves the bookshop?',
          options: [
            'A  Tired but satisfied.',
            'B  Confused about her purchases.',
            'C  Surprisingly happy.',
            'D  Eager to tell her friends.',
          ],
          answer: 2,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PAPER 1 — Part 6: Gapped Text
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 6,
      title: 'Reading & Use of English – Part 6: Gapped Text',
      skill: 'reading',
      instructions:
        'You are going to read a magazine article. Six sentences have been removed from the article. Choose from the sentences A–G the one which fits each gap (37–42). There is one extra sentence you do not need to use.',
      passage:
        'THE MARATHON COMEBACK\n\nWhen David Chen crossed the finish line of his first marathon at the age of 42, he could barely walk. His knees ached, his feet were covered in blisters and his running shoes had completely fallen apart. [37] _____ That moment of triumph, however painful, would change his life.\n\nDavid had taken up running just eighteen months earlier, after his doctor warned him that his sedentary lifestyle was becoming a serious health risk. [38] _____ He started with short walks, then gradually increased his pace and distance over many months.\n\nThe hardest part, David admits, was not the physical training but the mental challenge of believing he could actually complete a marathon. [39] _____ "Everyone around me seemed so much fitter and more experienced," he recalled.\n\nA colleague at work had suggested entering a charity marathon, partly as motivation and partly to raise money for a cause they both cared about. [40] _____ But once he had committed publicly, there was no going back.\n\nOn race day, David ran with a group of strangers who became friends over the course of 42 kilometres. [41] _____ They encouraged each other through the painful final stretch and celebrated together at the finish line.\n\nNow, two years later, David runs four times a week and has completed three more marathons. [42] _____ "It taught me that the only limits are the ones you set for yourself," he says.',
      questions: [
        {
          type: 'mcq',
          id: 'p6-q37',
          part: 6,
          stimulusLabel: 'Sentences to choose from:',
          stimulus:
            'A  He had never exercised seriously in his life before and found the idea overwhelming.\nB  His first reaction had been to dismiss the idea as completely unrealistic.\nC  Yet he was smiling broadly as he collected his medal.\nD  He now coaches other beginner runners at a local athletics club.\nE  Several of them were also running their first marathon.\nF  The doctor had recommended he start with gentle exercise.\nG  He had entered and withdrawn from two previous races.',
          text: 'Gap [37]: Which sentence fits here?',
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6-q38',
          part: 6,
          text: 'Gap [38]: Which sentence fits here?',
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
          answer: 5,
        },
        {
          type: 'mcq',
          id: 'p6-q39',
          part: 6,
          text: 'Gap [39]: Which sentence fits here?',
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6-q40',
          part: 6,
          text: 'Gap [40]: Which sentence fits here?',
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6-q41',
          part: 6,
          text: 'Gap [41]: Which sentence fits here?',
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p6-q42',
          part: 6,
          text: 'Gap [42]: Which sentence fits here?',
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
          answer: 3,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PAPER 1 — Part 7: Multiple Matching
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 7,
      title: 'Reading & Use of English – Part 7: Multiple Matching',
      skill: 'reading',
      instructions:
        'You are going to read a magazine article in which four people talk about working from home. For questions 43–52, choose from the people (A–D). The people may be chosen more than once.',
      passage:
        "WORKING FROM HOME: FOUR PERSPECTIVES\n\nA – SARA, marketing manager\nI was initially excited about working from home, but after a few months I began to miss the energy of the office. I found it hard to separate work from personal time — I'd check emails late at night and feel guilty if I wasn't at my desk. On the positive side, I've saved a considerable amount on commuting costs and can now attend my children's school events, which I used to miss entirely. I've become more disciplined about planning my day, though I sometimes wish I had more face-to-face contact with my team.\n\nB – JAMES, software developer\nFor someone like me, who needs long periods of uninterrupted concentration, home working has been a revelation. I get far more done without the constant interruptions of an open-plan office. I've set up a dedicated workspace in my spare room, which helps me switch into work mode mentally. My only concern is the long-term impact on my career development — it's harder to build relationships with senior colleagues when you only meet them on a video call.\n\nC – PRIYA, HR director\nAs someone responsible for managing people, I've found the shift to remote work genuinely challenging. It's difficult to read body language over a screen, and I worry that some team members are struggling in silence. We've tried to compensate with regular video check-ins and virtual social events, but it's not the same as being in the same room. That said, our productivity data actually improved in the first year of remote working, which surprised everyone.\n\nD – MARCO, graphic designer\nI've always worked better alone, so the transition was relatively smooth for me. The creative process requires deep focus, and home provides that. What I hadn't anticipated was how much I'd miss the informal conversations — not about work, but just chatting over lunch or coffee. Those moments of connection are surprisingly important for motivation. I now make a point of calling a colleague at least once a day just for a chat, which has helped enormously.",
      questions: [
        {
          type: 'mcq',
          id: 'p7-q43',
          part: 7,
          text: '(43) Which person mentions saving money as a benefit of working from home?',
          options: ['A  Sara', 'B  James', 'C  Priya', 'D  Marco'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7-q44',
          part: 7,
          text: '(44) Which person found that their team\'s output actually increased with remote working?',
          options: ['A  Sara', 'B  James', 'C  Priya', 'D  Marco'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7-q45',
          part: 7,
          text: '(45) Which person worries about missing opportunities to advance their career?',
          options: ['A  Sara', 'B  James', 'C  Priya', 'D  Marco'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7-q46',
          part: 7,
          text: '(46) Which person now calls colleagues informally to maintain social connection?',
          options: ['A  Sara', 'B  James', 'C  Priya', 'D  Marco'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7-q47',
          part: 7,
          text: '(47) Which person mentions difficulty reading colleagues\' emotions remotely?',
          options: ['A  Sara', 'B  James', 'C  Priya', 'D  Marco'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7-q48',
          part: 7,
          text: '(48) Which person says they have become more organised about how they plan their working day?',
          options: ['A  Sara', 'B  James', 'C  Priya', 'D  Marco'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7-q49',
          part: 7,
          text: '(49) Which person specifically created a separate room to work in?',
          options: ['A  Sara', 'B  James', 'C  Priya', 'D  Marco'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7-q50',
          part: 7,
          text: '(50) Which person was surprised by what they missed most about the office?',
          options: ['A  Sara', 'B  James', 'C  Priya', 'D  Marco'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7-q51',
          part: 7,
          text: '(51) Which person mentions having had difficulty maintaining boundaries between work and home life?',
          options: ['A  Sara', 'B  James', 'C  Priya', 'D  Marco'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7-q52',
          part: 7,
          text: '(52) Which person says they prefer working without interruptions and found home working suited their style?',
          options: ['A  Sara', 'B  James', 'C  Priya', 'D  Marco'],
          answer: 1,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PAPER 2 — Writing
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 8,
      title: 'Writing – Part 1: Essay (compulsory)',
      skill: 'writing',
      instructions:
        'You must answer this question. Write your answer in 140–190 words in an appropriate style.',
      questions: [
        {
          type: 'write',
          id: 'wr-q1',
          part: 8,
          taskNumber: 1,
          stimulusLabel: 'Part 1 – Essay',
          stimulus:
            'In your English class you have been discussing the impact of social media on young people. Your teacher has asked you to write an essay.\n\nWrite an essay using all the notes and giving reasons for your point of view.\n\n"Social media has a mostly negative effect on young people\'s lives."\n\nNotes — Write about:\n1. mental health\n2. communication skills\n3. ……………… (your own idea)',
          text: 'Write your essay in 140–190 words. Give your opinion and support it with reasons and examples.',
          minWords: 140,
        },
        {
          type: 'write',
          id: 'wr-q2',
          part: 8,
          taskNumber: 2,
          stimulusLabel: 'Part 2 – Article (choose ONE task)',
          stimulus:
            'You see this announcement on an English-language website:\n\n— ARTICLES WANTED —\nA place that changed my life\nHave you ever visited a place that had a significant impact on you? Write an article telling us about the place, why it was important to you and how it changed you. The best articles will be published on our website.\n\nWrite your article.',
          text: 'Write your article in 140–190 words. Make it engaging and use an interesting title.',
          minWords: 140,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PAPER 3 — Listening (audio coming soon)
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 9,
      title: 'Listening – Part 1: Multiple Choice (short extracts)',
      skill: 'listening',
      instructions:
        'You will hear people talking in eight different situations. For questions 1–8, choose the best answer (A, B or C). You will hear each extract twice. 🎧 Audio coming soon — practice the other sections and return when available.',
      questions: [
        {
          type: 'mcq',
          id: 'li-p1-q1',
          part: 9,
          stimulusLabel: 'Extract 1 — You hear a woman talking to a friend about a film she saw.',
          text: 'What did she most enjoy about the film?',
          options: [
            'A  The acting performances.',
            'B  The visual effects.',
            'C  The storyline.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'li-p1-q2',
          part: 9,
          text: 'Extract 2 — You hear a man talking on the radio about his new book. Why did he write it?',
          options: [
            'A  To share his personal experience of illness.',
            'B  To help others going through similar difficulties.',
            'C  To explain a scientific discovery.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'li-p1-q3',
          part: 9,
          text: 'Extract 3 — You hear two colleagues discussing a project deadline. What do they agree to do?',
          options: [
            'A  Ask for more time from the client.',
            'B  Work extra hours this week.',
            'C  Reduce the scope of the project.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'li-p1-q4',
          part: 9,
          text: 'Extract 4 — You hear a woman describing a holiday. What was the problem she experienced?',
          options: [
            'A  The hotel was overbooked.',
            'B  The weather was poor.',
            'C  Her luggage was lost.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'li-p1-q5',
          part: 9,
          text: 'Extract 5 — You hear a teacher talking to his students about an assignment. What does he want them to do differently?',
          options: [
            'A  Include more personal opinions.',
            'B  Use more academic sources.',
            'C  Write a longer introduction.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'li-p1-q6',
          part: 9,
          text: 'Extract 6 — You hear a woman talking about starting a new job. How does she feel?',
          options: [
            'A  Nervous about making mistakes.',
            'B  Excited about the opportunity.',
            'C  Overwhelmed by the workload.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'li-p1-q7',
          part: 9,
          text: 'Extract 7 — You hear two people discussing a documentary. What do they agree about?',
          options: [
            'A  It was too long.',
            'B  The subject was more interesting than expected.',
            'C  The presenter was not engaging.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'li-p1-q8',
          part: 9,
          text: 'Extract 8 — You hear a man talking about learning a musical instrument. What does he recommend?',
          options: [
            'A  Taking regular lessons with a teacher.',
            'B  Practising for short periods every day.',
            'C  Learning with a friend.',
          ],
          answer: 1,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PAPER 4 — Speaking
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 10,
      title: 'Speaking',
      skill: 'speaking',
      instructions:
        'The Speaking test is taken with a partner. It has 4 parts and lasts approximately 14 minutes. Practise each part aloud.',
      questions: [
        {
          type: 'speak',
          id: 'sp-q1',
          part: 10,
          partNumber: 1,
          text: 'Part 1 — Interview (2 minutes)\nAnswer the examiner\'s questions about yourself.',
          followUp: [
            'Where are you from originally, and how long have you lived there?',
            'What do you enjoy doing in your free time?',
            'Are you currently studying or working? Tell me about that.',
            'What are your plans for the future?',
            'Do you prefer spending time indoors or outdoors? Why?',
          ],
        },
        {
          type: 'speak',
          id: 'sp-q2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Long Turn (4 minutes, 1 min per candidate)\nLook at the two photographs and compare them. Talk about what the people might be feeling and why this situation might be challenging for them.',
          cueCard:
            "Photo A: A student studying alone late at night surrounded by textbooks and notes.\nPhoto B: A group of students discussing and collaborating around a table in a library.\n\nTasks:\n• Compare the two situations (similarities and differences)\n• Say which situation you think is more effective for learning\n• (For your partner's photos): Do you prefer studying alone or with others?",
        },
        {
          type: 'speak',
          id: 'sp-q3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Collaborative Task (4 minutes)\nHere are some ways that cities can become more environmentally friendly. Talk together about how effective each idea might be, then decide which TWO would make the biggest difference.',
          cueCard:
            "Ideas for making cities greener:\n• Ban cars from city centres\n• Plant more trees and create parks\n• Make public transport free\n• Encourage rooftop solar panels on all buildings\n• Introduce a tax on single-use plastic packaging\n• Build more cycle lanes\n\nDiscuss each idea: How effective would it be? What problems might it cause?\nThen agree on the TWO most impactful ideas.",
        },
        {
          type: 'speak',
          id: 'sp-q4',
          part: 10,
          partNumber: 3,
          text: 'Part 4 — Discussion (4 minutes)\nThe examiner will ask you questions related to the topic in Part 3.',
          followUp: [
            'Do you think individuals or governments have more responsibility for protecting the environment?',
            'How has environmental awareness changed in your country over the last few years?',
            'Some people say that economic growth and environmental protection are incompatible. Do you agree?',
            'What changes in your own lifestyle have you made or would you consider making to reduce your environmental impact?',
          ],
        },
      ],
    },
  ],
};

export default mock;
