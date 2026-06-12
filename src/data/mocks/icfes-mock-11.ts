import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 11
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Tema: Deportes y ejercicio
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-11',
  examSlug: 'icfes',
  title: 'Mock 11 · Deportes y ejercicio',
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
            'ALL SWIMMERS MUST SHOWER\nBefore entering the pool.\nThank you for helping us\nkeep the water clean.',
          text: 'Where would you most likely see this notice?',
          options: [
            'At a gym entrance',
            'At a public swimming pool',
            'On a sports field',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'HOME SUPPORTERS ONLY\nIN THIS SECTION\nVisiting supporters must use\nthe designated away area.',
          text: 'What is the purpose of this notice?',
          options: [
            'To tell fans where to buy tickets for the match',
            'To separate home and away supporters in the stands',
            'To inform visitors that the section is closed',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'PLEASE BOOK YOUR CLASS\n24 HOURS IN ADVANCE\nWalk-in spaces are limited\nand cannot be guaranteed.',
          text: 'Where would you most likely find this notice?',
          options: [
            'At a gym or fitness centre',
            'In a hospital reception area',
            'At a cinema or theatre',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'TRY ON SHOES BEFORE PURCHASE\nNo refunds on worn footwear.\nPlease ask a member of staff\nfor assistance.',
          text: 'What does this notice warn customers about?',
          options: [
            'Shoes cannot be tried on in the store',
            'Shoes that have been worn cannot be returned for a refund',
            'All sports shoes are sold at a discounted price',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'NO GLASS BOTTLES\nPERMITTED INSIDE THE VENUE\nPlastic bottles and cans\nare welcome.',
          text: 'What does this notice tell visitors?',
          options: [
            'No food or drink is allowed inside the building',
            'Glass bottles are not allowed inside, but plastic ones are',
            'All visitors must leave their bags at the entrance',
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
      topic: 'Sports',
      exampleText: 'A competition in which many teams or players try to win the same title.',
      exampleAnswer: 'tournament',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'The player chosen to lead a team and represent it during a match or competition.',
          options: ['captain', 'champion', 'compete', 'defeat', 'goalkeeper', 'trophy', 'uniform'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'A cup, medal, or other prize given to the winner of a competition.',
          options: ['captain', 'champion', 'compete', 'defeat', 'goalkeeper', 'trophy', 'uniform'],
          answer: 5,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'In football, the player whose job is to stop the ball from entering the net.',
          options: ['captain', 'champion', 'compete', 'defeat', 'goalkeeper', 'trophy', 'uniform'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'The special set of clothes worn by all members of the same team.',
          options: ['captain', 'champion', 'compete', 'defeat', 'goalkeeper', 'trophy', 'uniform'],
          answer: 6,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'The person or team that has won a competition or is the best in a sport.',
          options: ['captain', 'champion', 'compete', 'defeat', 'goalkeeper', 'trophy', 'uniform'],
          answer: 1,
        },
      ],
    },

    // ── PARTE 3 ── Diálogos (preguntas 11–15) ────────────────────────────────
    {
      part: 3,
      title: 'Parte 3 — Diálogos',
      sectionStyle: 'dialogs-grid',
      exampleStimulus: 'I really enjoy going for a run in the morning.',
      exampleOptions: ['That is healthy!', 'Running is bad.', 'I prefer sleeping.'],
      exampleAnswer: 'A',
      instructions:
        'Complete las cinco conversaciones. En las preguntas 11 – 15, marque A, B ó C en su hoja de respuestas.',
      questions: [
        {
          type: 'dialog',
          id: 'p3q1',
          part: 3,
          stimulus: 'Our team won the championship last night!',
          text: '',
          options: [
            "That's fantastic news!",
            "I don't like sport.",
            'Which team lost?',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q2',
          part: 3,
          stimulus: "I've been training every day this week.",
          text: '',
          options: [
            'Training every day is dangerous.',
            'You should take a rest day.',
            'Your hard work will pay off.',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q3',
          part: 3,
          stimulus: 'I twisted my ankle during football practice.',
          text: '',
          options: [
            'Play through the pain.',
            'You should rest and put ice on it.',
            'Ankles heal very quickly.',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q4',
          part: 3,
          stimulus: 'Do you prefer watching or playing sport?',
          text: '',
          options: [
            'Sport is not really important to me.',
            'I never watch sport on television.',
            'I love playing — it keeps me fit.',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q5',
          part: 3,
          stimulus: 'The Olympics are on TV tonight.',
          text: '',
          options: [
            "Let's watch the athletics together.",
            'The Olympics are always boring.',
            'TV is bad for you.',
          ],
          answer: 0,
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
        'Colombian (16) ___ have achieved remarkable results in international competitions in recent years. At the last Pan-American Games, the national team brought home several (17) ___, including gold in cycling and swimming. Behind every success story is years of dedicated (18) ___. Athletes often leave their families and their (19) ___ to move to high-performance centres where they can prepare professionally. It is not always easy to (20) ___ against athletes from much wealthier nations who have better equipment and facilities. However, the passion and (21) ___ of Colombian athletes often compensates for these differences. Fans across the country follow their favourite (22) ___ with enormous enthusiasm. Their vocal (23) ___ gives athletes the motivation to keep pushing even when the competition is tough.',
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['coaches', 'athletes', 'referees', 'managers'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['trophies', 'medals', 'prizes', 'points'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['studying', 'resting', 'training', 'travelling'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['country', 'school', 'language', 'hobby'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['play', 'fight', 'compete', 'argue'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['speed', 'height', 'support', 'experience'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['stadiums', 'sports', 'events', 'teams'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['silence', 'support', 'competition', 'watching'],
          answer: 1,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      sectionStyle: 'reading',
      passageTitle: 'The Benefits of Team Sports for Young People',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        'THE BENEFITS OF TEAM SPORTS FOR YOUNG PEOPLE\n\nJoining a sports team is one of the best decisions a young person can make. Team sports such as football, basketball, and volleyball offer a wide range of benefits that go far beyond physical fitness.\n\nFirst and most obviously, playing sport keeps the body healthy. Regular exercise strengthens the heart, improves flexibility, and helps young people maintain a healthy weight. Doctors recommend that teenagers get at least sixty minutes of physical activity every day, and team sports make it much easier to reach this goal.\n\nBeyond physical health, team sports are excellent for developing social skills. Players must communicate with their teammates, follow instructions from coaches, and learn to manage both victory and defeat with good spirit. These experiences build qualities that are useful in all areas of life, including school and future employment.\n\nAnother important benefit is the development of discipline and responsibility. To be a good team player, a young person must be punctual for training, give their best effort, and sometimes put the needs of the group before their own preferences. Learning these habits early in life can have a very positive effect on a person\'s character.\n\nFinally, sports teams provide a sense of belonging. Having a group of people who share the same goals and celebrate the same successes can greatly improve a young person\'s confidence and wellbeing.',
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'According to the text, what is the MOST obvious benefit of team sports?',
          options: [
            'Developing strong friendships with teammates',
            'Keeping the body physically healthy',
            'Learning to manage success and failure',
            'Improving academic performance at school',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: 'How much daily physical activity do doctors recommend for teenagers?',
          options: [
            'At least thirty minutes',
            'At least forty-five minutes',
            'At least sixty minutes',
            'At least ninety minutes',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'According to paragraph 3, what social skills can team sports develop?',
          options: [
            'Reading, writing, and speaking in a foreign language',
            'Managing money and organising time',
            'Communicating with others, following instructions, and handling results',
            'Designing strategies and leading business meetings',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: 'The phrase "put the needs of the group before their own preferences" means:',
          options: [
            'ignoring what your teammates want',
            'thinking about what is best for the team rather than yourself',
            'making all the decisions on behalf of the team',
            'choosing your own training schedule independently',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'What quality does the text say team sports help develop in paragraph 4?',
          options: [
            'Creativity and artistic expression',
            'Discipline and responsibility',
            'Mathematical and logical thinking',
            'Independence and self-reliance',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'According to the last paragraph, how can being part of a team improve a young person?',
          options: [
            'It gives them access to better training equipment.',
            'It helps them earn money from playing sport.',
            'It can improve their confidence and sense of belonging.',
            'It guarantees success in future professional sport.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'Which of the following is NOT mentioned as a benefit of team sports in the text?',
          options: [
            'Improved physical fitness',
            'Better social skills',
            'Higher grades at school',
            'A sense of belonging',
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
      passageTitle: 'The History of the Olympic Games',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        'THE HISTORY OF THE OLYMPIC GAMES\n\nThe Olympic Games are the world\'s most famous sporting competition, bringing together athletes from almost every nation on earth. But the Games have a long and fascinating history that stretches back more than 2,700 years.\n\nThe ancient Olympics began in Greece around 776 BC in a place called Olympia. They were held every four years and were dedicated to the god Zeus. In those early games, only Greek men were allowed to compete, and the events included running, wrestling, and chariot racing. The games continued for over a thousand years before being abolished by the Roman Emperor Theodosius in 393 AD.\n\nFor nearly fifteen centuries, the Olympics did not exist. Then, in 1896, a French educator named Pierre de Coubertin brought them back. He believed that sport could promote peace and friendship between nations. The first modern Olympics were held in Athens, Greece, and featured 241 athletes from 14 countries competing in nine different sports.\n\nOver the following decades, the Games grew rapidly. Women were allowed to compete for the first time in 1900. The Winter Olympics were added in 1924. Today, the Summer Olympics feature more than 300 events and attract over 10,000 athletes from around 200 countries.\n\nColombia has participated in the Olympics since 1932. One of the country\'s greatest Olympic achievements came in 2000, when María Isabel Urrutia won gold in weightlifting — the first Colombian woman to win an Olympic gold medal.\n\nDespite controversies over the years — including boycotts, doping scandals, and debates about commercialisation — the Olympic Games remain a powerful symbol of international unity and athletic excellence.',
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: 'When did the ancient Olympic Games begin?',
          options: [
            'Around 393 AD',
            'Around 1896',
            'Around 776 BC',
            'Around 1924',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'Why did Pierre de Coubertin revive the Olympic Games?',
          options: [
            'He wanted to make money from international sport.',
            'He believed sport could promote peace and friendship between nations.',
            'He wanted Greece to become the centre of world sport.',
            'He thought the ancient sports should be preserved exactly as they were.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'When were women first allowed to compete in the modern Olympics?',
          options: [
            '1896',
            '1900',
            '1924',
            '1932',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: 'What was significant about María Isabel Urrutia\'s achievement at the 2000 Olympics?',
          options: [
            'She was the first Colombian athlete ever to compete in the Olympics.',
            'She won silver in swimming, a first for Colombia.',
            'She became the first Colombian woman to win an Olympic gold medal.',
            'She won three gold medals at a single Olympic Games.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What can be inferred from the final paragraph about the Olympic Games?',
          options: [
            'The Olympic Games will soon be cancelled because of too many controversies.',
            'Despite problems, the Games continue to be valued as a symbol of international unity.',
            'All controversies in the Olympics have now been completely resolved.',
            'Commercialisation has made the Olympics less popular with athletes.',
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
      passageTitle: 'Should Extreme Sports Be Banned?',
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        'SHOULD EXTREME SPORTS BE BANNED?\n\nSkydiving, base jumping, rock climbing, and free diving are just a few of the activities that fall under the category of "extreme sports". These pursuits attract millions of participants worldwide who seek challenge, excitement, and a sense of achievement that they cannot find in conventional activities. Yet every year, extreme sports result in serious injuries and deaths, prompting calls from some quarters for greater regulation — or even outright bans.\n\nThose who advocate for restricting extreme sports argue primarily on safety grounds. Statistics show that certain activities carry injury and fatality rates far higher than mainstream sports. Critics also point out that emergency rescues of injured extreme sports participants cost taxpayers significant amounts of money. Families of participants often live in a state of constant anxiety.\n\nOn the other side, supporters of extreme sports make a compelling case for individual freedom. Adults in a free society, they argue, should have the right to choose how they spend their leisure time, provided they do not harm others. Banning an activity simply because it carries risk would, by the same logic, require banning cars, swimming, and countless other everyday activities.\n\nFurthermore, proponents argue that extreme sports are far safer than they appear to outsiders. The vast majority of participants train extensively, use high-quality equipment, and follow strict safety protocols. Fatalities are statistically rare when proper precautions are taken. The image of extreme sports as reckless activities is largely a media creation.\n\nThere is also a psychological dimension to consider. Many people who participate in extreme sports report significantly lower levels of stress and anxiety in their everyday lives. The intense focus required during these activities functions as a form of mental training, forcing participants to remain completely present in the moment.\n\nA reasonable position might be to promote better safety education and mandatory training requirements rather than outright prohibition. This would allow individuals to enjoy the benefits of extreme sports while reducing unnecessary risk — a solution that respects both personal freedom and the concern for public safety.',
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What is the main question this text explores?',
          options: [
            'Which extreme sports are the most dangerous in the world',
            'Whether extreme sports should be prohibited or regulated',
            'How extreme sports developed into a global industry',
            'Why young people are more attracted to extreme sports than traditional ones',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'According to paragraph 2, what financial concern do critics raise?',
          options: [
            'Extreme sports equipment is too expensive for average people.',
            'Extreme sports events reduce tourism income in local areas.',
            'Emergency rescues of injured participants cost taxpayers money.',
            'Insurance companies refuse to pay for injuries caused by extreme sports.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: 'What argument do supporters of extreme sports use in paragraph 3?',
          options: [
            'Extreme sports are always safe when the correct equipment is used.',
            'Adults have the right to choose their leisure activities freely.',
            'The government should fund extreme sports training programmes.',
            'Extreme sports teach skills that are useful in everyday life.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'The word "reckless" in paragraph 4 most likely means:',
          options: [
            'carefully planned and well-organised',
            'requiring a high level of skill and experience',
            'without thinking about the possible risks or consequences',
            'extremely exciting and enjoyable',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: 'According to paragraph 4, why do supporters say extreme sports are safer than they appear?',
          options: [
            'The sports are performed in completely controlled environments.',
            'Participants train carefully, use good equipment, and follow safety protocols.',
            'Modern technology has eliminated most of the risks involved.',
            'Only professional athletes are permitted to participate.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'What psychological benefit of extreme sports does the text mention in paragraph 5?',
          options: [
            'They help participants earn more money and improve their careers.',
            'They help reduce stress and anxiety in everyday life.',
            'They improve memory and mathematical ability.',
            'They help participants make friends more easily.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: 'The word "proponents" in paragraph 4 means:',
          options: [
            'people who are strongly against something',
            'people who are neutral and have no opinion',
            'people who support or advocate for something',
            'people who research a topic professionally',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: 'What solution does the author propose in the final paragraph?',
          options: [
            'A complete ban on all extreme sports to protect public safety',
            'Leaving the decision entirely to each individual with no rules at all',
            'Better safety education and mandatory training rather than prohibition',
            'Requiring all extreme sports participants to pay a special tax',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: 'What does the author suggest about the media\'s portrayal of extreme sports?',
          options: [
            'The media always presents extreme sports in a fair and balanced way.',
            'The media rarely covers extreme sports because they are not popular.',
            'The media\'s image of extreme sports as reckless is largely exaggerated.',
            'The media has helped make extreme sports much safer over time.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: "Which statement BEST summarises the author's overall position?",
          options: [
            'Extreme sports are far too dangerous and should be banned immediately.',
            'Extreme sports should be allowed without any form of regulation.',
            'Better regulation and safety training is a better solution than banning extreme sports.',
            'Only professional athletes should be permitted to take part in extreme sports.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
