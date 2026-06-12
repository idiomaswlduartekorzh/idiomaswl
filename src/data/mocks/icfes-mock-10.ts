import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 10
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Tema: Compras y dinero
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-10',
  examSlug: 'icfes',
  title: 'Mock 10 · Compras y dinero',
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
            'CCTV IN OPERATION\nFor your security, cameras are\nrecording in all public areas\nof this centre at all times.',
          text: 'Where could you most likely see this notice?',
          options: [
            'In a shopping centre or large store',
            'In a private home',
            'On a country road',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'PLEASE HAVE YOUR ID READY\nBefore approaching the counter.\nThank you for your patience.',
          text: 'What does this notice ask customers to do?',
          options: [
            'Wait outside until a staff member calls them',
            'Prepare their identification before reaching the desk',
            'Fill in a form before speaking to a cashier',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'PLEASE RETURN YOUR TROLLEY\nTo the designated trolley area\nafter use. Thank you.',
          text: 'Where would you most likely see this notice?',
          options: [
            'At a bus station',
            'In a car park near a supermarket',
            'Inside a clothes shop',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'SALE ITEMS\nCannot be returned or exchanged.\nAll sales are final.',
          text: 'What is the purpose of this notice?',
          options: [
            'To inform customers about the store opening hours',
            'To advertise new products at reduced prices',
            'To tell customers that discounted items cannot be brought back',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'FOR SECURITY\nPlease cover your PIN\nwhen entering it.\nDo not share your PIN with anyone.',
          text: 'Where would you most likely see this notice?',
          options: [
            'Inside a library',
            'At an ATM or cash machine',
            'In a hospital waiting room',
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
      topic: 'Shopping',
      exampleText: 'The place in a shop where you pay for your items before leaving.',
      exampleAnswer: 'checkout',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'A printed or digital document that shows the details and cost of things you have bought.',
          options: ['bargain', 'cashier', 'discount', 'exchange', 'receipt', 'refund', 'voucher'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'A reduction in the original price of a product, often shown as a percentage.',
          options: ['bargain', 'cashier', 'discount', 'exchange', 'receipt', 'refund', 'voucher'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'Money that a shop gives back to a customer who returns an item they bought.',
          options: ['bargain', 'cashier', 'discount', 'exchange', 'receipt', 'refund', 'voucher'],
          answer: 5,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'Something you buy at a much lower price than usual — a very good deal.',
          options: ['bargain', 'cashier', 'discount', 'exchange', 'receipt', 'refund', 'voucher'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'A piece of paper or a code that gives you money off when you shop at a particular store.',
          options: ['bargain', 'cashier', 'discount', 'exchange', 'receipt', 'refund', 'voucher'],
          answer: 6,
        },
      ],
    },

    // ── PARTE 3 ── Diálogos (preguntas 11–15) ────────────────────────────────
    {
      part: 3,
      title: 'Parte 3 — Diálogos',
      sectionStyle: 'dialogs-grid',
      exampleStimulus: 'I forgot my wallet at home.',
      exampleOptions: ["That's unlucky.", 'I need one too.', 'Wallets are expensive.'],
      exampleAnswer: 'A',
      instructions:
        'Complete las cinco conversaciones. En las preguntas 11 – 15, marque A, B ó C en su hoja de respuestas.',
      questions: [
        {
          type: 'dialog',
          id: 'p3q1',
          part: 3,
          stimulus: 'This jacket is too expensive.',
          text: '',
          options: [
            "Let's look for a cheaper one.",
            'Buy it anyway.',
            'Expensive things are always better.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q2',
          part: 3,
          stimulus: 'I lost my wallet on the bus this morning.',
          text: '',
          options: [
            'Buy a new one immediately.',
            'I lost mine last week too.',
            'You should report it to the bus company.',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q3',
          part: 3,
          stimulus: 'The shop is having a half-price sale today.',
          text: '',
          options: [
            'Sales are never real.',
            "Let's go and have a look.",
            "I don't need anything right now.",
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q4',
          part: 3,
          stimulus: 'I want to return this shirt — it has a hole in it.',
          text: '',
          options: [
            'Do you have the receipt with you?',
            'Holes in shirts can be repaired easily.',
            'Shirts are not very expensive.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q5',
          part: 3,
          stimulus: 'How much does this bag cost?',
          text: '',
          options: [
            'Everything in the store is free today.',
            "I don't know the price.",
            'It is forty-five thousand pesos.',
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
        'Shopping (16) ___ has grown enormously in Colombia over the past few years. More and more people prefer to compare (17) ___ on the internet before making a purchase. One of the main advantages is (18) ___, which allows customers to receive goods at their home without leaving. A wide range of (19) ___ is available through digital platforms, from electronics to food. As a result, (20) ___ no longer need to travel to a physical store. However, it is important to use a secure (21) ___ method to protect your bank details. Despite early doubts, online shopping has become very (22) ___ among people of all ages. Access to affordable (23) ___ has made this kind of shopping possible for millions of Colombians.',
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['online', 'outdoor', 'formal', 'local'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['colours', 'sizes', 'prices', 'names'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['storage', 'delivery', 'service', 'transport'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['opinions', 'messages', 'products', 'reviews'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['students', 'customers', 'workers', 'tourists'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['payment', 'identity', 'address', 'account'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['difficult', 'expensive', 'popular', 'unusual'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['electricity', 'television', 'internet', 'software'],
          answer: 2,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      sectionStyle: 'reading',
      passageTitle: 'How to Manage Your Personal Budget',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        'HOW TO MANAGE YOUR PERSONAL BUDGET\n\nManaging your money well is one of the most important skills in adult life. A personal budget helps you understand exactly how much money you earn and how much you spend. Without a budget, it is easy to spend more than you have.\n\nThe first step is to write down all your income — the money you receive each month. Then, list all your fixed expenses, such as rent, transport, and food. These are costs that stay the same every month. After that, note any flexible expenses, like entertainment and clothing. These can change from month to month.\n\nOnce you have this information, compare your total income with your total expenses. If you are spending more than you earn, you need to make changes. Look for areas where you can reduce your spending. For example, eating at home instead of going to restaurants can save a significant amount of money.\n\nFinancial experts recommend saving at least ten per cent of your monthly income. This money can be used for emergencies or future plans, such as travelling or buying something important. Even small, regular savings add up over time.\n\nLearning to budget does not mean you cannot enjoy life. It means you are in control of your money, rather than your money controlling you.',
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'What is the main purpose of this text?',
          options: [
            'To explain how banks lend money to individuals',
            'To give advice on how to control personal spending and saving',
            'To describe the difference between income and taxes',
            'To promote a specific budgeting application',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: 'According to the text, what are "fixed expenses"?',
          options: [
            'Costs that change every month depending on your needs',
            'Money you receive from your employer each month',
            'Costs that remain the same every month',
            'Items you buy to treat yourself',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'What should you do if your expenses are greater than your income?',
          options: [
            'Ask the bank for a loan immediately',
            'Look for ways to reduce your spending',
            'Stop saving money until the situation improves',
            'Find a second job straight away',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: 'The phrase "add up over time" in paragraph 4 most likely means:',
          options: [
            'become more difficult to manage',
            'disappear very quickly',
            'gradually increase to a larger total',
            'stay the same for a long period',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'How much of your monthly income do financial experts recommend saving?',
          options: [
            'At least five per cent',
            'At least ten per cent',
            'At least twenty per cent',
            'At least fifty per cent',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'Which of the following is given as an example of saving money?',
          options: [
            'Buying new clothes less often',
            'Cancelling your phone contract',
            'Cooking and eating at home instead of going to restaurants',
            'Moving to a smaller house',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: "What is the author's main message in the last paragraph?",
          options: [
            'People who budget have less fun in life.',
            'Budgeting gives you control over your money and your life.',
            'It is impossible to enjoy life without spending a lot.',
            'Only rich people can afford to save money.',
          ],
          answer: 1,
        },
      ],
    },

    // ── PARTE 6 ── Comprensión: texto largo (preguntas 31–35) ────────────────
    {
      part: 6,
      title: 'Parte 6 — Comprensión de lectura: texto largo',
      sectionStyle: 'reading',
      passageTitle: 'Traditional Markets vs Supermarkets in Colombia',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        'TRADITIONAL MARKETS VS SUPERMARKETS IN COLOMBIA\n\nFor centuries, traditional markets have been at the heart of Colombian commercial life. Known locally as "plazas de mercado", these open or semi-covered spaces bring together hundreds of small vendors who sell fresh fruit, vegetables, meat, fish, and a wide variety of local products. In cities such as Bogotá, Medellín, and Bucaramanga, these markets are much more than just shopping destinations — they are cultural spaces where communities meet, exchange news, and maintain local traditions.\n\nIn recent decades, however, large supermarket chains have expanded rapidly across Colombia. These modern stores offer a very different shopping experience: air conditioning, organised aisles, loyalty cards, and the convenience of finding almost everything under one roof. Customers can also pay with debit or credit cards, which many people find easier than carrying cash.\n\nDespite the rise of supermarkets, many Colombian families continue to prefer traditional markets for certain types of shopping. The produce sold there is often fresher and less expensive than in supermarkets, and buyers can negotiate prices directly with sellers. For many families, visiting the local market every week is a deeply ingrained cultural habit.\n\nSmall market vendors, however, face growing economic pressure. It is difficult to compete with the buying power and advertising budgets of major supermarket chains. Some markets have responded by modernising their facilities and accepting digital payments to attract younger customers.\n\nThe debate between the two models reflects a wider tension in Colombian society between modernisation and the preservation of cultural heritage. Many urban planners and community leaders argue that protecting traditional markets is not just about commerce — it is about maintaining a way of life.',
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: 'What is a "plaza de mercado" according to the text?',
          options: [
            'A modern shopping mall with international brands',
            'A government office where prices are regulated',
            'A traditional open or semi-covered space where local vendors sell produce',
            'A type of Colombian restaurant that sells regional food',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'According to paragraph 2, what advantage do supermarkets offer over traditional markets?',
          options: [
            'Their products are always fresher and locally grown.',
            'They offer a more convenient shopping experience with modern facilities.',
            'Their prices are always lower than in traditional markets.',
            'They are open 24 hours a day, seven days a week.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'Why do some Colombian families prefer traditional markets?',
          options: [
            'Because they are closer to their homes than supermarkets',
            'Because they offer loyalty card schemes and discounts',
            'Because the produce is often fresher and cheaper, and they can negotiate prices',
            'Because traditional markets sell products not available elsewhere',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: 'What challenge do small market vendors face?',
          options: [
            'The government wants to close traditional markets.',
            'They cannot compete with the resources and advertising of large supermarket chains.',
            'Young people refuse to buy food from traditional markets.',
            'Fresh produce is becoming increasingly difficult to source.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What can be inferred from the last paragraph?',
          options: [
            'Traditional markets will disappear completely within the next ten years.',
            'Protecting traditional markets is seen as important for cultural as well as economic reasons.',
            'Colombian urban planners prefer supermarkets to traditional markets.',
            'The Colombian government has decided to ban new supermarkets.',
          ],
          answer: 1,
        },
      ],
    },

    // ── PARTE 7 ── Texto de opinión/argumento (preguntas 36–45) ──────────────
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      sectionStyle: 'reading',
      passageTitle: 'Advertising and Its Influence on Young Consumers',
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        'ADVERTISING AND ITS INFLUENCE ON YOUNG CONSUMERS\n\nEvery day, young people are exposed to hundreds of advertising messages. These messages appear on television, on social media platforms, on billboards, and in mobile applications. The goal of advertising is always the same: to persuade people to buy a product or use a service. But when the target audience is children and teenagers, the question of whether advertising is ethical becomes much more complex.\n\nSupporters of advertising aimed at young people argue that it provides useful information. Young consumers need to know what products are available, and advertising helps them make informed choices. Furthermore, advertising funds many of the free digital services that young people use daily, such as video platforms and music streaming services. Without advertising revenue, these services could not exist in their current form.\n\nCritics, however, point to significant concerns. Research suggests that children under the age of eight often cannot distinguish between an advertisement and genuine content. This makes them particularly vulnerable to commercial messages. Advertising frequently promotes unhealthy food and drinks, expensive fashion items, and video games — creating desires that young people feel pressure to satisfy, sometimes causing financial stress for their families.\n\nThe rise of social media influencers has made the situation even more complicated. Influencers are paid to promote products, but they often present these promotions as personal recommendations. This blurs the line between honest opinion and paid commercial content, and many young followers do not realise they are watching an advertisement.\n\nSeveral countries have introduced regulations to protect young consumers. Some have banned advertising of unhealthy food during children\'s television programming. Others require influencers to clearly label sponsored content.\n\nThe debate ultimately raises a fundamental question: should the market be free to advertise to young people in any way it chooses, or does society have a responsibility to protect children from commercial influence? Most experts agree that some level of regulation is necessary — but they disagree about where the line should be drawn.',
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What is the main topic of this text?',
          options: [
            'How to create effective advertising campaigns for young people',
            'The positive and negative effects of advertising on young consumers',
            'How social media influencers earn money from companies',
            'Why young people spend too much money on unnecessary products',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'According to paragraph 2, how do supporters justify advertising aimed at young people?',
          options: [
            'They say it teaches young people about financial responsibility.',
            'They argue it helps young people make informed choices and funds free digital services.',
            'They believe it encourages young people to save money.',
            'They claim it helps young people communicate better with each other.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: 'Why are children under eight considered especially vulnerable to advertising?',
          options: [
            'They have no access to money of their own.',
            'They watch more television than older children.',
            'They often cannot tell the difference between an advertisement and real content.',
            'They are more likely to buy things without their parents\' permission.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'The word "vulnerable" in paragraph 3 most likely means:',
          options: [
            'intelligent and well-informed',
            'able to resist pressure easily',
            'easily harmed or influenced',
            'uninterested in commercial products',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: 'What problem does the text identify with social media influencers?',
          options: [
            'They do not have enough followers to make advertising effective.',
            'They charge companies too much money for their promotions.',
            'Their paid promotions are often presented as genuine personal opinions.',
            'They only promote products that are too expensive for most young people.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'The phrase "blurs the line" in paragraph 4 most likely means:',
          options: [
            'makes something completely clear',
            'makes it difficult to see a clear distinction between two things',
            'removes all regulations about a particular topic',
            'increases the number of people who watch advertisements',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: 'What regulation is mentioned as an example of protecting young consumers?',
          options: [
            'Banning all advertising on social media platforms',
            'Requiring all products advertised to children to be free of charge',
            'Banning unhealthy food advertising during children\'s television programming',
            'Allowing children to choose which advertisements they see',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: 'According to the text, what must social media influencers do in some countries?',
          options: [
            'Stop advertising products to audiences under the age of eighteen',
            'Clearly label content that has been paid for by a company',
            'Share a percentage of their income with the young people they influence',
            'Only promote products that have been approved by the government',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: 'What fundamental question does the author raise in the final paragraph?',
          options: [
            'Should advertising be completely abolished in modern society?',
            'How much money do young people spend because of advertising?',
            'Should the market advertise freely to young people, or should society protect them?',
            'Are social media platforms more dangerous than television advertising?',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: "Which statement BEST summarises the author's position?",
          options: [
            'Advertising is always harmful to young people and should be banned completely.',
            'Young people are clever enough to resist all forms of advertising pressure.',
            'Some regulation of advertising aimed at young people is necessary, though the exact limits are debated.',
            'Governments should have no role in deciding how companies advertise their products.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
