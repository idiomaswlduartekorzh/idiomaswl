import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 19
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Tema: Ropa y moda
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-19',
  examSlug: 'icfes',
  title: 'Mock 19 · Ropa y moda',
  subtitle: 'Saber 11 · Componente de Inglés · 45 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [

    // ── PARTE 1 ── Avisos e instrucciones (preguntas 1–5) ────────────────────
    {
      part: 1,
      title: 'Parte 1 — Avisos e instrucciones',
      sectionStyle: 'notices-grid',
      exampleStimulus: 'FITTING ROOMS CLOSED FOR CLEANING.\nThey will reopen in 10 minutes.',
      exampleText: 'What is the purpose of this sign?',
      exampleAnswer: 'B',
      instructions:
        'The following notices give information about different places. Read each notice carefully and answer questions 1 to 5.',
      questions: [
        {
          type: 'mcq',
          id: 'p1q1',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'CHANGING ROOMS ARE ON THE LEFT.\nMaximum 3 items at a time.\nPlease ask staff for assistance.',
          text: 'Where would you most likely see this notice?',
          options: [
            "At a doctor's office",
            'In a clothing store',
            'At a gym',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'ALL SCHOOL UNIFORMS MUST BE WORN CORRECTLY.\nShirts must be tucked in at all times.',
          text: 'What is the purpose of this notice?',
          options: [
            'To describe the design of the school uniform',
            'To remind students to follow the dress code',
            'To announce that new uniforms are available',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'DRY CLEAN ONLY.\nDo not wash in water.\nDo not tumble dry.',
          text: 'What is the purpose of this notice?',
          options: [
            'To explain how to sell the item in a shop',
            'To give instructions for cleaning the garment',
            'To warn customers about possible allergies',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'SALE ENDS SUNDAY.\n50% off all winter clothing.\nWhile stocks last.',
          text: 'What does this notice tell you?',
          options: [
            'All clothes in the store are more expensive this week',
            'Winter clothes are half price until Sunday',
            'Only summer clothes are included in the sale',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'THIS ITEM HAS BEEN DONATED.\nAll money raised goes to charity.\nThank you for your support.',
          text: 'What does this notice tell you about the item?',
          options: [
            'The item was left behind by a customer',
            'The item is second-hand and sold to support a good cause',
            'The item has a defect and cannot be sold at full price',
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
      topic: 'Clothes',
      exampleText:
        'The material used to make clothes, such as cotton, wool, or silk.',
      exampleAnswer: 'fabric',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'The part of a shirt or jacket that covers your arm from shoulder to wrist.',
          options: ['collar', 'cotton', 'hem', 'jacket', 'sleeve', 'thread', 'zip'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'The part that goes around the neck of a shirt, jacket, or coat.',
          options: ['collar', 'cotton', 'hem', 'jacket', 'sleeve', 'thread', 'zip'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'A small device with metal teeth used to open and close bags or clothing.',
          options: ['collar', 'cotton', 'hem', 'jacket', 'sleeve', 'thread', 'zip'],
          answer: 6,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'The folded edge sewn at the bottom of trousers, a skirt, or a dress.',
          options: ['collar', 'cotton', 'hem', 'jacket', 'sleeve', 'thread', 'zip'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'A soft natural material that comes from a plant and is used to make many everyday clothes.',
          options: ['collar', 'cotton', 'hem', 'jacket', 'sleeve', 'thread', 'zip'],
          answer: 1,
        },
      ],
    },

    // ── PARTE 3 ── Diálogos (preguntas 11–15) ────────────────────────────────
    {
      part: 3,
      title: 'Parte 3 — Diálogos',
      sectionStyle: 'dialogs-grid',
      exampleStimulus: 'I love your new jacket!',
      exampleOptions: ['Thank you — I got it on sale.', 'I hate shopping.', 'Jackets are expensive.'],
      exampleAnswer: 'A',
      instructions:
        'Complete las cinco conversaciones. En las preguntas 11 – 15, marque A, B ó C en su hoja de respuestas.',
      questions: [
        {
          type: 'dialog',
          id: 'p3q1',
          part: 3,
          stimulus: "My school uniform doesn't fit me anymore.",
          text: '',
          options: [
            'You should ask for a larger size.',
            'School uniforms are not necessary.',
            'Just wear it anyway.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q2',
          part: 3,
          stimulus: 'I spent all my money on new trainers.',
          text: '',
          options: [
            'Trainers are a complete waste of money.',
            'Were they worth it?',
            'Money is not important at all.',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q3',
          part: 3,
          stimulus: 'Is there a dress code for the party?',
          text: '',
          options: [
            'Yes, smart casual is required.',
            'Wear absolutely anything you want.',
            'Parties never have rules.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q4',
          part: 3,
          stimulus: 'These jeans are on sale for half price.',
          text: '',
          options: [
            'Half price is still far too expensive.',
            'I never wear jeans at all.',
            "That's a great deal — I'll try them on.",
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q5',
          part: 3,
          stimulus: 'I want to learn how to sew my own clothes.',
          text: '',
          options: [
            "It's much faster to just buy them.",
            "That's a really useful skill to have.",
            'Sewing is extremely difficult.',
          ],
          answer: 1,
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
        'In many countries, (16) ___ are a common part of school life. They are usually worn by (17) ___ every day so that everyone looks the same and feels part of the same (18) ___. The most common colours are dark blue, black, grey, and white, but each (19) ___ chooses its own design. Supporters of uniforms say they create a sense of (20) ___ among students and reduce the (21) ___ of buying many different outfits. However, some students feel that uniforms are (22) ___ because they do not allow young people to express themselves through fashion. Despite this debate, many surveys show that most schools still consider uniforms (23) ___ for creating a focused and respectful learning environment.',
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['uniforms', 'costumes', 'outfits', 'suits'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['teachers', 'parents', 'students', 'workers'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['team', 'school', 'country', 'brand'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['teacher', 'family', 'school', 'government'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['colour', 'identity', 'fashion', 'comfort'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['habit', 'cost', 'problem', 'rule'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['required', 'comfortable', 'restrictive', 'colourful'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['optional', 'essential', 'expensive', 'fashionable'],
          answer: 1,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      sectionStyle: 'reading',
      passageTitle: 'Fashion and Self-Expression Among Teenagers',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        'FASHION AND SELF-EXPRESSION AMONG TEENAGERS\n\nFor many teenagers, the clothes they wear are far more than just fabric. Fashion is one of the main ways young people communicate who they are, what they believe in, and which social groups they belong to. A teenager who wears a certain style of trainers or a particular brand of hoodie may be making a very deliberate statement about their identity.\n\nResearchers who study adolescent behaviour say that experimenting with appearance is a normal and healthy part of growing up. During the teenage years, young people are developing their sense of identity and trying to understand how they fit into the world. Clothing and personal style give them a way to explore this without words.\n\nSocial media has made fashion trends spread much faster than in the past. A style that is popular among influencers in one country can reach teenagers on the other side of the world within days. This global spread of trends means that fashion today is more connected and diverse than ever before.\n\nHowever, not everyone views this positively. Some critics argue that social media creates pressure on young people to keep up with the latest trends, which can lead to overspending, anxiety about appearance, and a focus on materialism rather than deeper values.\n\nDespite these concerns, many fashion educators believe that developing personal style is a creative skill. Learning to choose colours, combine different pieces of clothing, and express personality through dress is a form of visual communication that young people can carry with them throughout life.',
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'According to the text, why is fashion important to many teenagers?',
          options: [
            'It helps them save money on expensive products.',
            'It is a way for them to communicate their identity and social group.',
            'It allows them to copy the style of their favourite celebrities.',
            'It helps them perform better at school.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: 'What do researchers say about teenagers experimenting with their appearance?',
          options: [
            'It is a sign that teenagers are spending too much money.',
            'It is a dangerous trend that parents should discourage.',
            'It is a normal and healthy part of developing identity.',
            'It is mainly caused by pressure from social media.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'How has social media changed fashion trends?',
          options: [
            'It has made fashion more expensive for young people.',
            'It has caused teenagers to stop following trends.',
            'It has made trends spread more quickly around the world.',
            'It has limited fashion choices for teenagers.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: 'The word "materialism" in paragraph 4 most likely refers to:',
          options: [
            'a love of art and creative activities',
            'an excessive focus on owning things and spending money',
            'a strong interest in environmental issues',
            'the study of different types of fabric and materials',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'What criticism does the text mention about social media and fashion?',
          options: [
            'It makes young people spend too much time on their phones.',
            'It encourages overspending and creates anxiety about appearance.',
            'It has reduced the quality of clothing sold in shops.',
            'It has made traditional clothing styles disappear.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'What do fashion educators say about developing personal style?',
          options: [
            'It is a waste of time for young people.',
            'It should only be taught in art schools.',
            'It is a form of creative and visual communication.',
            'It is only relevant for people who work in the fashion industry.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'Which of the following best describes the author\'s overall view of teenage fashion?',
          options: [
            'Fashion is a superficial concern that teenagers should ignore.',
            'Fashion can be a meaningful form of self-expression despite some risks.',
            'Social media has completely destroyed the value of personal style.',
            'Schools should teach fashion as a required subject.',
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
      passageTitle: 'Fast Fashion and Its Impact on the Environment',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        'FAST FASHION AND ITS IMPACT ON THE ENVIRONMENT\n\nThe fashion industry is one of the most polluting industries in the world. In recent decades, a business model known as "fast fashion" has transformed the way clothes are produced and consumed. Fast fashion companies produce large quantities of cheap, trendy clothing very quickly, encouraging customers to buy more and throw away old items rather than repair or reuse them.\n\nThe environmental consequences are serious. The production of textiles requires enormous amounts of water. It is estimated that making a single pair of jeans uses around 7,500 litres of water — roughly the amount one person drinks over seven years. In addition, many synthetic fabrics, such as polyester and nylon, are made from plastic and do not break down easily in the environment. Every time these garments are washed, tiny plastic particles called microplastics are released into the water system.\n\nFast fashion also generates huge quantities of waste. It is estimated that consumers in wealthy countries throw away around 30 kilograms of clothing per person every year. Much of this ends up in landfill sites, where it may take hundreds of years to decompose.\n\nIn response to these problems, a growing movement of consumers is choosing to buy second-hand clothes, swap garments with friends, or invest in higher-quality items that last longer. Some clothing brands have also introduced recycling programmes, encouraging customers to return old clothes instead of throwing them away.\n\nEducating young people about the environmental cost of their fashion choices is increasingly seen as important. Several schools and universities now include sustainability modules in their courses, helping students understand how their buying habits affect the planet. The message is simple: every time you choose to repair, reuse, or recycle a piece of clothing, you make a small but real difference.',
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: 'What is the main feature of the "fast fashion" business model?',
          options: [
            'Producing expensive, high-quality clothes for wealthy customers',
            'Encouraging customers to repair and reuse their old clothes',
            'Making large quantities of cheap, trendy clothes very quickly',
            'Using natural materials to reduce environmental damage',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'According to the text, what are microplastics?',
          options: [
            'Tiny pieces of fabric used to repair old clothing',
            'Small plastic particles released when synthetic clothes are washed',
            'Microscopic organisms that live in rivers and lakes',
            'Small labels sewn into garments by manufacturers',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'Approximately how much clothing does a person in a wealthy country throw away each year?',
          options: [
            'Around 7 kilograms',
            'Around 15 kilograms',
            'Around 30 kilograms',
            'Around 50 kilograms',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: 'What solution does the text suggest consumers are already adopting?',
          options: [
            'Buying only clothes made from natural materials',
            'Buying second-hand clothes, swapping garments, or choosing quality items',
            'Avoiding all fashion brands and making their own clothes',
            'Asking governments to ban synthetic fabrics',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What can be inferred from the final paragraph?',
          options: [
            'Individual consumer choices have no real effect on environmental problems.',
            'Young people are the only group responsible for the fast fashion crisis.',
            'Educating young people about sustainable fashion is increasingly valued.',
            'All universities now require students to study fashion sustainability.',
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
      passageTitle: 'Should All Schools Require Students to Wear Uniforms?',
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        'SHOULD ALL SCHOOLS REQUIRE STUDENTS TO WEAR UNIFORMS?\n\nThe question of whether schools should require students to wear uniforms is one that divides opinion among educators, parents, and students alike. In some countries, uniforms are standard in almost all schools. In others, students are free to wear whatever they choose. Both approaches have passionate supporters, and the debate shows no sign of ending.\n\nThose who support school uniforms argue that they create a sense of equality among students. When everyone wears the same clothing, it is harder to judge classmates by the brands they wear or the wealth of their families. This can reduce bullying related to appearance and help students focus on their studies rather than on fashion. Some research has suggested that schools with uniforms tend to have a more disciplined and focused atmosphere.\n\nUniform policies also benefit families financially. When parents know exactly what their child needs to wear, they are not pressured into buying expensive or fashionable clothes. A school uniform, though it has an upfront cost, is often cheaper overall than maintaining a wardrobe of casual clothes suitable for daily school wear.\n\nHowever, critics of uniform policies raise important objections. They argue that clothing is a fundamental form of self-expression, and requiring young people to dress identically removes an important creative outlet. During the teenage years in particular, developing a personal identity is crucial, and fashion plays a role in this process.\n\nSome educators also point out that uniforms do not automatically improve behaviour or academic results. There are plenty of schools without uniforms that maintain excellent discipline and achieve outstanding results. The quality of teaching, the school culture, and the support students receive at home are all more influential factors than what students wear.\n\nPerhaps the most balanced view is that a well-designed and affordable uniform, introduced with the involvement of students and parents, can contribute positively to a school\'s culture without being oppressive. Rigid enforcement of strict dress codes, on the other hand, can create resentment and distract from more important educational goals.\n\nIn the end, there is no single answer that suits every school or every community. What matters most is that decisions about uniform policies are made thoughtfully, with genuine consideration for the wellbeing and voices of the students who must live with them every day.',
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What is the main purpose of this text?',
          options: [
            'To argue that all schools should immediately introduce uniforms',
            'To explore different perspectives on whether school uniforms should be compulsory',
            'To describe the history of school uniforms in different countries',
            'To explain why students dislike wearing uniforms',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'According to paragraph 2, how can uniforms help reduce bullying?',
          options: [
            'By allowing teachers to identify troublemakers more easily',
            'By making it harder to judge classmates by their wealth or brand choices',
            'By encouraging students to report bullying to teachers',
            'By keeping students too busy with schoolwork to bully others',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: 'What financial argument does the text make in favour of uniforms?',
          options: [
            'School uniforms are given to students for free.',
            'Uniforms allow families to save money compared to buying casual school clothes.',
            'Schools earn money by selling uniforms to students.',
            'Families can sell old uniforms when their children grow out of them.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'What main objection do critics of uniform policies raise?',
          options: [
            'Uniforms are uncomfortable and cause health problems.',
            'Uniforms are too expensive for most families.',
            'Uniforms remove an important form of self-expression for young people.',
            'Uniforms make it difficult for teachers to recognise their students.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: 'The word "oppressive" in paragraph 6 most likely means:',
          options: [
            'unfair and causing unnecessary hardship or restriction',
            'very expensive and difficult to afford',
            'colourful and difficult to match with other clothes',
            'strict and well-organised',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'According to the text, what factors are MORE important than clothing in determining school quality?',
          options: [
            'The location of the school and the size of the classrooms',
            'The teaching quality, school culture, and home support',
            'The number of students in each class and their age',
            'The school\'s uniform policy and daily schedule',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: 'What condition does the author suggest could make uniforms more acceptable?',
          options: [
            'Uniforms should be replaced by sportswear.',
            'Schools should make uniforms compulsory only for older students.',
            'Uniforms should be well-designed, affordable, and introduced with student and parent input.',
            'Students should be allowed to choose their own uniform colour.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: 'The phrase "an upfront cost" in paragraph 3 most likely means:',
          options: [
            'a cost that is paid gradually over a long period',
            'a hidden cost that most families are not aware of',
            'a cost paid at the beginning before any savings are made',
            'a cost that is covered by the school or government',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: 'What is the author\'s conclusion?',
          options: [
            'Every school should be required by law to have a uniform policy.',
            'Uniforms should be abolished completely because they harm students.',
            'There is no universal answer — each school and community must decide thoughtfully.',
            'The most important thing is that uniforms are affordable for all families.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: "Which statement BEST summarises the author's overall position?",
          options: [
            'Uniforms are clearly superior to casual dress for all schools.',
            'Both uniforms and free dress have merits and weaknesses that depend on context.',
            'Students should always have the final say in school uniform policies.',
            'Academic results prove that schools without uniforms perform better.',
          ],
          answer: 1,
        },
      ],
    },
  ],
};

export default mock;
