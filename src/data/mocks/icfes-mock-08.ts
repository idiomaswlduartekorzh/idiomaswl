import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 08
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Tema: Familia y hogar
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-08',
  examSlug: 'icfes',
  title: 'Mock 8 · Familia y hogar',
  subtitle: 'Saber 11 · Componente de Inglés · 45 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [

    // ── PARTE 1 ── Avisos e instrucciones (preguntas 1–5) ────────────────────
    {
      part: 1,
      title: 'Parte 1 — Avisos e instrucciones',
      sectionStyle: 'notices-grid',
      exampleStimulus: 'BUS STOP\nPlease stand behind the line.\nThank you.',
      exampleText: 'Where could you see this sign?',
      exampleAnswer: 'A',
      instructions:
        'The following notices give information about different places. Read each notice carefully and answer questions 1 to 5.',
      questions: [
        {
          type: 'mcq',
          id: 'p1q1',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'APARTMENT BUILDING\nQUIET HOURS: 10:00 PM – 7:00 AM\nPlease respect your neighbours.',
          text: 'What is the purpose of this notice?',
          options: [
            'To inform residents about building maintenance times',
            'To tell residents when they must not make noise',
            'To announce a meeting for all residents',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'LAUNDRY ROOM\nPLEASE REMOVE YOUR CLOTHES WITHIN 30 MINUTES OF CYCLE ENDING\nOther residents are waiting to use the machines.',
          text: 'What does this notice ask residents to do?',
          options: [
            'Collect their washing promptly so others can use the machine',
            'Wash their clothes only at certain times of day',
            'Pay for their laundry before starting the machine',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'COMMUNITY CENTRE\nRESIDENTS MUST SHOW ID TO USE FACILITIES\nNon-residents are not permitted.',
          text: 'Where would you most likely see this notice?',
          options: [
            'At the entrance to a public swimming pool',
            'At the door of a residential community centre',
            'Inside a shopping centre changing room',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'ESTATE AGENT\nVIEWING BY APPOINTMENT ONLY\nPlease call us on 601 555 0123 to book.',
          text: 'What does this notice tell people who want to see a property?',
          options: [
            'They must pay a deposit before visiting',
            'They can visit without calling first',
            'They need to book an appointment in advance',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'HOUSING OFFICE\nMAINTENANCE REQUESTS — CALL BETWEEN 8 AM AND 5 PM\nEmergency line available 24 hours.',
          text: 'What is the main purpose of this notice?',
          options: [
            'To inform residents of the emergency phone number only',
            'To tell residents when to call for non-emergency repairs',
            'To announce that the office is closed on weekends',
          ],
          answer: 1,
        },
      ],
    },

    // ── PARTE 2 ── Vocabulario: cuadrícula de emparejamiento (preguntas 6–10) ─
    {
      part: 2,
      title: 'Parte 2 — Vocabulario',
      sectionStyle: 'matching-grid',
      topic: 'Home',
      exampleText: 'An underground room or floor of a building, usually used for storage.',
      exampleAnswer: 'basement',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'A set of steps inside or outside a building that you use to go from one floor to another.',
          options: ['balcony', 'ceiling', 'curtain', 'garage', 'hallway', 'shelf', 'stairs'],
          answer: 6,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'A narrow passage or corridor inside a building that connects rooms and leads to the entrance.',
          options: ['balcony', 'ceiling', 'curtain', 'garage', 'hallway', 'shelf', 'stairs'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'An outdoor platform attached to the outside of a building, usually above ground level, with a railing.',
          options: ['balcony', 'ceiling', 'curtain', 'garage', 'hallway', 'shelf', 'stairs'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'A piece of cloth hung at a window or doorway to block light or provide privacy.',
          options: ['balcony', 'ceiling', 'curtain', 'garage', 'hallway', 'shelf', 'stairs'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'The surface that forms the top of a room, directly above your head when you stand inside.',
          options: ['balcony', 'ceiling', 'curtain', 'garage', 'hallway', 'shelf', 'stairs'],
          answer: 1,
        },
      ],
    },

    // ── PARTE 3 ── Diálogos (preguntas 11–15) ────────────────────────────────
    {
      part: 3,
      title: 'Parte 3 — Diálogos',
      sectionStyle: 'dialogs-grid',
      exampleStimulus: 'I think I am getting sick.',
      exampleOptions: ['I am sorry.', 'I can too.', 'I need it.'],
      exampleAnswer: 'A',
      instructions:
        'Complete las cinco conversaciones. En las preguntas 11 – 15, marque A, B ó C en su hoja de respuestas.',
      questions: [
        {
          type: 'dialog',
          id: 'p3q1',
          part: 3,
          stimulus: 'My parents are coming to visit this weekend.',
          text: '',
          options: [
            'You must be excited.',
            'Parents are boring.',
            'My parents never visit.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q2',
          part: 3,
          stimulus: 'I have to clean the whole house before the party.',
          text: '',
          options: [
            "Don't bother cleaning it.",
            'Parties are always fun.',
            "I'll help you if you want.",
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q3',
          part: 3,
          stimulus: 'My younger brother broke my tablet.',
          text: '',
          options: [
            'Tablets are not important.',
            'You should talk to him about it.',
            'Just buy a new one immediately.',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q4',
          part: 3,
          stimulus: 'We are moving to a new flat next month.',
          text: '',
          options: [
            "That's exciting!",
            'Moving is a terrible idea.',
            'You should stay where you are.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q5',
          part: 3,
          stimulus: 'My grandmother lives with us.',
          text: '',
          options: [
            'Old people are difficult.',
            'That is quite unusual.',
            'That must be nice.',
          ],
          answer: 2,
        },
      ],
    },

    // ── PARTE 4 ── Completar el texto (preguntas 16–23) ──────────────────────
    {
      part: 4,
      title: 'Parte 4 — Completar el texto',
      sectionStyle: 'cloze-text',
      instructions:
        'Read the text below. Choose the word (A, B, C, or D) that best fits each blank (questions 16 to 23).',
      passage:
        "Finding a (16) ___ in a Colombian city has become increasingly difficult for many young people. In cities like Bogotá and Medellín, the cost of (17) ___ has risen significantly in recent years, making it hard for low-income families to live close to the (18) ___. Many families live in small apartments with very few (19) ___, so space must be shared carefully. Renting a flat can be very (20) ___, especially in popular neighbourhoods. As a result, some people prefer to live with (21) ___ for longer than in previous generations. Despite these challenges, most people value having (22) ___ and safe housing above all else. A good home should make its occupants feel (23) ___ and welcome.",
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['house', 'garden', 'school', 'market'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['food', 'transport', 'rent', 'electricity'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['river', 'beach', 'forest', 'city'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['families', 'neighbours', 'floors', 'rooms'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['cheap', 'clean', 'expensive', 'empty'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['strangers', 'colleagues', 'neighbours', 'families'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['expensive', 'modern', 'comfortable', 'crowded'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['comfortable', 'tired', 'bored', 'confused'],
          answer: 0,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      sectionStyle: 'reading',
      passageTitle: 'Changing Family Structures in Latin America',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        "CHANGING FAMILY STRUCTURES IN LATIN AMERICA\n\nThe traditional image of a Latin American family — a large household with parents, children, grandparents, and extended relatives all living together — is changing. Across the region, including in Colombia, family structures have become smaller and more varied over the past few decades.\n\nThe most significant change is the decline of the extended family household. In the 1970s, it was common for three generations to live under the same roof. Today, the nuclear family — consisting of two parents and their children — is the most widespread model in urban areas. In cities such as Bogotá and Cali, single-parent families, couples without children, and individuals living alone have all become increasingly common.\n\nSeveral factors have contributed to this shift. Higher levels of education and employment opportunities for women have given them greater independence. Migration from rural to urban areas has separated many families geographically. Additionally, the rising cost of living in cities has forced some couples to delay having children or to have fewer than previous generations.\n\nDespite these changes, family ties remain extremely strong in Colombian society. Research consistently shows that most Colombians consider their family to be the most important aspect of their lives. Family members continue to provide emotional, financial, and practical support to one another, even when they do not share a home.",
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'What is the main idea of this text?',
          options: [
            'Extended families are becoming more common across Latin America.',
            'Family structures in Latin America have been changing in recent decades.',
            'Colombian families are moving from cities to rural areas.',
            'Governments in Latin America are changing family laws.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: 'According to paragraph 2, which family model is now most common in Colombian cities?',
          options: [
            'Large extended families with three generations',
            'Single people living alone',
            'The nuclear family with two parents and children',
            'Grandparents raising their grandchildren',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'The phrase "three generations" in paragraph 2 most likely refers to:',
          options: [
            'Three different branches of the same family',
            'Grandparents, parents, and children living together',
            'Three different types of nuclear family',
            'Three stages of childhood development',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: 'According to the text, how has women\'s education affected families?',
          options: [
            'It has caused women to move away from their families.',
            'It has given women greater independence.',
            'It has encouraged women to have more children.',
            'It has reduced the number of women who work.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'Why do some couples in Colombian cities have fewer children than before?',
          options: [
            'Children are not valued in modern Colombian society.',
            'The government limits the number of children families can have.',
            'The high cost of living makes raising children more difficult.',
            'Most couples in cities prefer to adopt children.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'According to the final paragraph, what has NOT changed about Colombian families?',
          options: [
            'The size of the typical family unit',
            'The importance of family to most Colombians',
            'The number of generations living in one house',
            'The types of family structures found in cities',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'Which of the following is NOT mentioned as a cause of smaller family units?',
          options: [
            'Better education and employment for women',
            'Migration from rural to urban areas',
            'Changes in government housing policy',
            'Rising costs of living in cities',
          ],
          answer: 2,
        },
      ],
    },

    // ── PARTE 6 ── Comprensión: texto largo (preguntas 31–35) ────────────────
    {
      part: 6,
      title: 'Parte 6 — Comprensión de lectura: texto largo',
      sectionStyle: 'reading',
      passageTitle: 'Colombian Family Traditions and Values',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        "COLOMBIAN FAMILY TRADITIONS AND VALUES\n\nIn Colombia, the family is at the centre of social and cultural life. Although modern pressures have changed the size and shape of families, the values that bind them together — love, loyalty, mutual support, and shared celebration — remain deeply important.\n\nOne of the most visible expressions of Colombian family culture is the tradition of gathering for Sunday lunch. In many households, the whole family — grandparents, parents, children, aunts, uncles, and cousins — comes together every week for a large meal. These gatherings are not just about food; they are an opportunity to share news, resolve conflicts, celebrate achievements, and maintain the bonds that hold the family together across the week.\n\nReligion also plays an important role in Colombian family life. The majority of Colombian families are Roman Catholic, and religious ceremonies such as baptisms, first communions, and confirmations are major family events. Even families that are not particularly devout often maintain these traditions as a way of marking important moments in life and bringing the family together.\n\nIn Colombian culture, the concept of 'family honour' — the idea that each person's behaviour reflects on the entire family — is still significant. Young people are generally expected to respect their elders, work hard, and avoid actions that might embarrass their family in the community.\n\nFinally, it is worth noting the important role that grandmothers — known as 'abuelas' — play in Colombian families. In many households, the grandmother is not only a cook and carer but also a keeper of family history and traditions, passing stories, recipes, and customs from one generation to the next.",
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: 'According to the text, what is the main purpose of Sunday family lunches?',
          options: [
            'To prepare large amounts of food for the whole week',
            'To celebrate only birthdays and anniversaries',
            'To maintain family bonds and share important moments',
            'To follow a religious tradition required by the Catholic Church',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'What does the text say about religion and families that are not very devout?',
          options: [
            'They do not participate in any religious ceremonies.',
            'They often still observe religious traditions as family milestones.',
            'They celebrate religious events in private, without extended family.',
            'They have replaced religious ceremonies with other celebrations.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'What does the concept of "family honour" mean in Colombian culture?',
          options: [
            'Families compete with each other to be the most successful.',
            'A person\'s actions are seen as a reflection of their entire family.',
            'Older relatives have the right to make decisions for younger ones.',
            'Families are judged only by the achievements of their eldest child.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: 'According to the final paragraph, what role do grandmothers play in Colombian families?',
          options: [
            'They manage the family\'s finances and important decisions.',
            'They mainly look after young children while parents work.',
            'They pass on family history, stories, and traditions to new generations.',
            'They organise all family events and celebrations.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What can be inferred from the text about Colombian family values?',
          options: [
            'Modern life has completely destroyed traditional family values.',
            'Colombian families are very similar to families in North America.',
            'Traditional values remain important even as family structures change.',
            'Only older generations care about maintaining family traditions.',
          ],
          answer: 2,
        },
      ],
    },

    // ── PARTE 7 ── Texto de opinión/argumento (preguntas 36–45) ──────────────
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      sectionStyle: 'reading',
      passageTitle: 'Should Young Adults Live With Their Parents?',
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        "SHOULD YOUNG ADULTS LIVE WITH THEIR PARENTS?\n\nIn many parts of the world, including Colombia, it is increasingly common for people in their twenties and even thirties to continue living in their family home. Some see this as a practical and even desirable arrangement. Others believe that young adults should move out as soon as they are financially able to do so. The debate touches on questions of independence, family values, economics, and personal development.\n\nThose who support young adults living with their parents point to the clear practical benefits. The cost of renting or buying a home has risen dramatically in Colombian cities, making independent living financially impossible for many. Living at home allows young people to save money, pay off university debts, and build financial stability before starting out on their own. It also means that adult children can support ageing parents, creating a mutually beneficial arrangement that is deeply rooted in Colombian culture.\n\nCritics of this living arrangement argue that staying at home delays the development of independence and self-reliance. When every meal is cooked and every bill is paid by parents, young adults may fail to develop the practical skills needed to manage their own lives. There is also the issue of personal freedom — living with parents often means accepting their rules and routines, which can limit the growth of adult identity.\n\nPsychologists offer a more balanced view. They suggest that the key is not where a young adult lives, but the nature of the relationship within the home. An adult living with parents who treat them as an equal, with responsibilities and freedoms appropriate to their age, can develop just as fully as one who lives independently.\n\nIn a society where family bonds are as central as they are in Colombia, perhaps the question is not whether young adults should live with their parents, but whether — regardless of address — they are truly growing into responsible and independent individuals.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What is the main topic of this text?',
          options: [
            'The rising cost of housing in Colombian cities',
            'Whether young adults should live with their parents or not',
            'How Colombian families have changed over time',
            'The relationship between parents and children in modern society',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'According to paragraph 2, what is one financial benefit of young adults living at home?',
          options: [
            'They can earn more money by working in the family business.',
            'They can save money and build financial stability.',
            'Their parents can help them find better jobs.',
            'They do not have to pay taxes while living with their parents.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: 'The phrase "mutually beneficial" in paragraph 2 most likely means:',
          options: [
            'causing problems for both people involved',
            'good for one person but not for the other',
            'depending entirely on money and finances',
            'advantageous for both parties involved',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'According to paragraph 3, what skill might young adults fail to develop if they live at home?',
          options: [
            'Communication and social skills',
            'The ability to manage their own daily lives',
            'Academic and professional knowledge',
            'Creative thinking and problem-solving',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: 'What is the main concern about personal freedom raised in paragraph 3?',
          options: [
            'Young adults cannot choose their own career while at home.',
            'Parents often read their children\'s private messages.',
            'Living with parents may limit the growth of adult identity.',
            'Young adults are not allowed to have friends visit.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'What view do psychologists express in paragraph 4?',
          options: [
            'Young adults should always move out as soon as possible.',
            'The quality of the parent-child relationship matters more than where they live.',
            'Living with parents is always damaging to a young adult\'s development.',
            'All young adults should be treated exactly like children at home.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: 'The word "self-reliance" in paragraph 3 most likely means:',
          options: [
            'the ability to depend on others for support',
            'confidence in social situations',
            'the ability to manage your own life without help from others',
            'physical fitness and health',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: 'What does the text say about the link between family bonds and this debate in Colombia?',
          options: [
            'Colombian family bonds make independent living impossible.',
            'The strength of family bonds in Colombia makes this question particularly relevant.',
            'Colombian parents prefer their children to leave home as quickly as possible.',
            'Family bonds in Colombia are weaker than in other Latin American countries.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: 'According to the final paragraph, what does the author suggest is truly important?',
          options: [
            'Where a young adult lives is the most important factor.',
            'Whether a young adult pays rent to their parents',
            'Whether a young adult is genuinely becoming responsible and independent',
            'Whether a young adult has a job and can support themselves financially',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: "Which statement BEST summarises the author's overall position?",
          options: [
            'Young adults should always leave home as soon as they are able.',
            'Living with parents is always bad for a young adult\'s development.',
            'The decision depends on circumstances, and what matters most is personal growth.',
            'Colombian tradition means young adults should never leave the family home.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
