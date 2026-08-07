// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 — Cuadernillos divulgados por el ICFES
// Fuente: Cuadernillos de preguntas publicados por ICFES Colombia
// ─────────────────────────────────────────────────────────────────────────────

export type QType = 'vocab' | 'notice' | 'dialog' | 'gap' | 'reading';
export type IcfesAssessment = 'saber-11' | 'saber-10' | 'saber-9' | 'saber-tyt';

export interface SimulacroQuestion {
  n: number;
  type: QType;
  passageId?: string;
  vocabWords?: string[];    // word bank for vocab-match
  stem: string;
  options: string[];
  answer: number;           // 0-indexed
}

export interface SimulacroPassage {
  id: string;
  title?: string;
  text: string;             // for gap fill: blanks marked as [n]
  isGap?: boolean;
}

export interface Simulacro {
  id: string;
  assessment: IcfesAssessment;
  year: number;
  grade: 9 | 10 | 11 | null;
  title: string;
  source: string;
  timeMinutes: number;
  totalQuestions: number;
  /** Current seven-part taxonomy, explicit because published samples can omit parts. */
  partRanges: { part: 1 | 2 | 3 | 4 | 5 | 6 | 7; from: number; to: number }[];
  passages: SimulacroPassage[];
  questions: SimulacroQuestion[];
}

// ─────────────────────────────────────────────────────────────────────────────
// SIMULACRO 1 — ICFES Saber 11 · Inglés · Grado 11 · 2023
// ─────────────────────────────────────────────────────────────────────────────
const exam2023: Simulacro = {
  id: 'icfes-2023-g11',
  assessment: 'saber-11',
  year: 2023,
  grade: 11,
  title: 'Cuadernillo Oficial 2023 — Grado 11',
  source: 'ICFES, 2023. Cuadernillo 1, Grado 11.',
  timeMinutes: 60,
  totalQuestions: 25,
  partRanges: [
    { part: 1, from: 1, to: 5 }, { part: 3, from: 6, to: 8 },
    { part: 5, from: 9, to: 14 }, { part: 6, from: 15, to: 19 },
    { part: 7, from: 20, to: 25 },
  ],

  passages: [
    {
      id: 'p2023-pasta',
      title: 'The World\'s Favorite Food',
      text: `According to information collected in 17 countries, pasta is what people like to eat most. Not only is pasta the number one food in its home country, Italy, but it is also enjoyed in distant places like the Philippines, Mexico and South Africa. Italy is the biggest pasta-eating community of the world. Italy is followed by Venezuela, then Tunisia.

Pasta has become popular because it is a low-cost meal and it is not difficult to prepare. Just cook spaghetti or other forms of pasta with tomato to go with it and you're finished. It tastes delicious and fills your stomach. It also produces energy, which is why athletes eat pasta.

Before it became popular in Italy during the 19th century, earlier civilizations ate some forms of pasta. People say that by the 13th century Marco Polo brought pasta to Italy from China, but this is not true. Arabs brought a noodle-like pasta to Sicily, an island in Italy, in the 8th century.

When many Italians immigrated to America in the 20th century, they took their eating habits with them, so pasta and pizza became popular. Although many people think of spaghetti as the most popular form of pasta, there are over 600 types and they are cooked in different ways. Pasta has simple ingredients, so it can be kept longer.`,
    },
    {
      id: 'p2023-smiling',
      title: 'Smiling Often',
      text: `Smiling often has many benefits. People who smile regularly can experience an increase in their health and state of mind. Unfortunately, many people don't smile enough. It's a good idea to smile more often in order to feel better. Here are some reasons to smile more often.

Smiling brings health benefits. It increases natural substances in the body which improve your state of mind. Besides, smiling helps your facial structure give you a more youthful look; combined with healthy teeth, smiling can make you seem healthier and more attractive. Smiling also has positive effects on the immune and cardiovascular systems.

There are psychological benefits to smiling frequently, too. It makes you happy almost immediately. Sometimes when we can't smile, we find that anyone's smile helps us feel better. Smiling can also reduce stress levels since the body reacts quickly to it. A great way to make someone cheerful is to help them smile.

Smiling more often can also make you look more attractive and confident. In general, people like to show happiness and be near those who are happy. Smiling in the presence of others shows you are a happy person, and you can transmit the feeling to them. People are naturally attracted to smiling; therefore, smiling frequently can help you get the attention you want from others.

If you don't smile much, find ways to smile more often; try to make others smile more often too. Smiling is a fast way to feel happy. Feeling happy and making others feel happy is very positive and will bring many benefits. Although it seems difficult, it is in fact very easy; all it takes is moving some muscles and you will be happy almost immediately.`,
    },
    {
      id: 'p2023-tomatoes',
      title: 'Tomatoes',
      isGap: true,
      text: `The tomato is the world's most popular fruit. And yes, scientifically speaking, it is a fruit, [20] a vegetable. More than 60 million tons of tomatoes are produced every year, 16 million tons more than the banana, the [21] one in popularity.

Tomatoes were first [22] by Aztecs and Incas. Explorers returning from Mexico introduced the tomato [23] Europe in 1556. The French called it "the apple of love," the Germans "the apple of paradise."

Tomatoes are [24] in vitamins A and C, and are fat free. An average size tomato has only 35 calories. In addition, new medical [25] suggests that eating tomatoes may prevent cancer.

Tomatoes are used in many food products as pasta and pizza. According to a survey from 1997, 68% of chefs use canned tomatoes because of their quality and taste. It hasn't changed much since.`,
    },
  ],

  questions: [
    // ── PARTE 1 — Vocabulario: Health (Q1–5) ──────────────────────────────────
    { n:1, type:'vocab',
      vocabWords:['cold','cough','cry','doctor','hospital','medicine','stomach-ache'],
      stem:'Some people do this when they feel really sad or sick.',
      options:['cold','cough','cry','doctor','hospital','medicine','stomach-ache'], answer:2 },
    { n:2, type:'vocab',
      vocabWords:['cold','cough','cry','doctor','hospital','medicine','stomach-ache'],
      stem:'You can take this when you have a terrible headache.',
      options:['cold','cough','cry','doctor','hospital','medicine','stomach-ache'], answer:5 },
    { n:3, type:'vocab',
      vocabWords:['cold','cough','cry','doctor','hospital','medicine','stomach-ache'],
      stem:'You need to see this person when you are sick or hurt.',
      options:['cold','cough','cry','doctor','hospital','medicine','stomach-ache'], answer:3 },
    { n:4, type:'vocab',
      vocabWords:['cold','cough','cry','doctor','hospital','medicine','stomach-ache'],
      stem:'You can go to this place when your body isn\'t OK.',
      options:['cold','cough','cry','doctor','hospital','medicine','stomach-ache'], answer:4 },
    { n:5, type:'vocab',
      vocabWords:['cold','cough','cry','doctor','hospital','medicine','stomach-ache'],
      stem:'You can have this when you eat too much.',
      options:['cold','cough','cry','doctor','hospital','medicine','stomach-ache'], answer:6 },

    // ── PARTE 2 — Conversaciones (Q6–8) ────────────────────────────────────────
    { n:6, type:'dialog',
      stem:'I don\'t think I\'m going to enter the poster competition.',
      options:['Certainly!','Good luck!','What a pity!'], answer:2 },
    { n:7, type:'dialog',
      stem:'What do you think of my hat?',
      options:['Don\'t come.','Very well.','It\'s too big.'], answer:2 },
    { n:8, type:'dialog',
      stem:'We haven\'t discussed our tour plans yet.',
      options:['You poor thing.','Let\'s do it now.','As late as possible.'], answer:1 },

    // ── PARTE 3 — Lectura: The World's Favorite Food (Q9–14) ──────────────────
    { n:9, type:'reading', passageId:'p2023-pasta',
      stem:'The second country where most people eat pasta is',
      options:['the Philippines.','Mexico.','Venezuela.'], answer:2 },
    { n:10, type:'reading', passageId:'p2023-pasta',
      stem:'Pasta has become a favorite food because it',
      options:['has tomato.','is cheap.','is complicated.'], answer:1 },
    { n:11, type:'reading', passageId:'p2023-pasta',
      stem:'Sports people prefer pasta because it',
      options:['improves activity levels.','helps empty stomachs.','is simple to prepare.'], answer:0 },
    { n:12, type:'reading', passageId:'p2023-pasta',
      stem:'Pasta became well-known in the United States because Italians',
      options:['arrived there.','liked pizza.','were famous.'], answer:0 },
    { n:13, type:'reading', passageId:'p2023-pasta',
      stem:'Who first brought pasta to Italy?',
      options:['Marco Polo','Sicilians','Arabs'], answer:2 },
    { n:14, type:'reading', passageId:'p2023-pasta',
      stem:'Both pizza and pasta',
      options:['stay fresh for a long time.','come to America from Italy.','are prepared in only one way.'], answer:1 },

    // ── PARTE 4 — Lectura: Smiling Often (Q15–19) ─────────────────────────────
    { n:15, type:'reading', passageId:'p2023-smiling',
      stem:'What is the author doing in the text?',
      options:['convincing people that smiling at others is polite','describing the consequences of not smiling','discussing the effects of smiling in difficult situations','encouraging people to smile more frequently'], answer:3 },
    { n:16, type:'reading', passageId:'p2023-smiling',
      stem:'What can the reader find out about smiling in paragraph 2?',
      options:['how smiling helps people appear better','how smiling shows people you are interested in them','how smiling makes people be popular','how smiling lets people transmit happiness to others'], answer:0 },
    { n:17, type:'reading', passageId:'p2023-smiling',
      stem:'According to paragraph 3, what can smiling cause in people?',
      options:['It makes them react to funny situations frequently.','It helps them know when they need to feel good.','It makes them want to help others to feel happy.','It helps them feel happy very quickly.'], answer:3 },
    { n:18, type:'reading', passageId:'p2023-smiling',
      stem:'What does smiling do in a social situation?',
      options:['It tells others you need their attention to feel confident.','It makes others do what you want and show happiness.','It shows you are happy and makes others smile, too.','It makes you look attractive and want people\'s acceptance.'], answer:2 },
    { n:19, type:'reading', passageId:'p2023-smiling',
      stem:'Which is the best advertisement for the author\'s ideas about smiling?',
      options:[
        'Want to look older? Smile. It will control your stress levels, your state of mind and your popularity.',
        'Want to be natural? Smile often. It helps you improve your teeth, your mind, and your figure quickly.',
        'Want to be happy fast and easily? Smile more frequently. It will make you healthier, happier, and more attractive.',
        'Want to look professional? Smile more. It is important for your body, your mind, and your personal life.',
      ], answer:2 },

    // ── PARTE 5 — Completar espacios: Tomatoes (Q20–25) ──────────────────────
    { n:20, type:'gap', passageId:'p2023-tomatoes',
      stem:'it is a fruit, [20] a vegetable',
      options:['neither','nor','not','no'], answer:2 },
    { n:21, type:'gap', passageId:'p2023-tomatoes',
      stem:'the banana, the [21] one in popularity',
      options:['two','both','twice','second'], answer:3 },
    { n:22, type:'gap', passageId:'p2023-tomatoes',
      stem:'Tomatoes were first [22] by Aztecs and Incas',
      options:['achieved','done','grown','invented'], answer:2 },
    { n:23, type:'gap', passageId:'p2023-tomatoes',
      stem:'introduced the tomato [23] Europe in 1556',
      options:['out','on','at','into'], answer:3 },
    { n:24, type:'gap', passageId:'p2023-tomatoes',
      stem:'Tomatoes are [24] in vitamins A and C',
      options:['charged','rich','loaded','full'], answer:1 },
    { n:25, type:'gap', passageId:'p2023-tomatoes',
      stem:'new medical [25] suggests that eating tomatoes may prevent cancer',
      options:['operation','prescription','drug','research'], answer:3 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SIMULACRO 2 — ICFES Saber 11 · Inglés · Grado 11 · 2022
// ─────────────────────────────────────────────────────────────────────────────
const exam2022: Simulacro = {
  id: 'icfes-2022-g11',
  assessment: 'saber-11',
  year: 2022,
  grade: 11,
  title: 'Cuadernillo Oficial 2022 — Grado 11',
  source: 'ICFES, 2022. Cuadernillo 1, Grado 11.',
  timeMinutes: 60,
  totalQuestions: 25,
  partRanges: [
    { part: 1, from: 1, to: 5 }, { part: 3, from: 6, to: 8 },
    { part: 5, from: 9, to: 14 }, { part: 6, from: 15, to: 19 },
    { part: 7, from: 20, to: 25 },
  ],

  passages: [
    {
      id: 'p2022-bodylan',
      title: 'Body Language across Cultures',
      text: `If you are planning a holiday in another country, you should pay attention to body language across cultures. In the world of travel you may have uncomfortable moments if you give wrong messages. For example, in the Middle East, it is very unkind to show the under-side of one's foot in another person's direction — so crossing your legs while sitting is a bad idea. People from Pakistan move their head from side to side to mean "you're welcome", or "hello". Moving your hand from side to side is understood by Indians as "no" or "go away". In Nigeria, you mustn't use your left hand to give or receive things. This hand is considered dirty. The Maori of New Zealand press noses together and shout to say hello.

You can also see body language differences in the personal space people need when having a conversation. In South America, this space is often small. People stand very close to each other to talk, except when they meet for the first time or are at the office. In the United States this space becomes much larger; people are not as comfortable when others stand close to them, especially when they do not know each other very well. Others whose personal space is small are the Arabs, French and Italians, while the Germans and Japanese need more.`,
    },
    {
      id: 'p2022-cats',
      title: 'Cats Make Wonderful Pets!',
      text: `There are certain points to consider before you decide to get a cat. First of all, be prepared to spend time with your cat. Although cats don't have a closer relationship with humans than most other pets, they still require attention and care. Cats have their own different characters and their own special habits and choices. It is a good idea to prepare yourself with some basic knowledge about cats before you get one.

As distant as they may be, cats really love to play. But cats usually don't fetch like dogs; don't just throw a ball to your cat and expect it to be entertained. Cats like to be spoiled by humans. They like to have "communication" with you. Spend time playing and having contact with your cat.

Cats show their love to you not only through making their typical sounds, but also by touching your arms, legs, or another part of your body. If you are new to cats and you don't know this, you may think they want to hurt you. However, it is just friendly play.

They probably love to see what is going on around them more than other pets. They do this by jumping to high places like a sofa, cupboard, or table to keep an eye on you and what you're doing.

Cats love to have sharp nails, so buying a cushion for your cat will keep your furniture safe. In order to avoid any damage, keep your cat's nails short and train it to use the cushion. This will save you money and lots of headaches in the future.`,
    },
    {
      id: 'p2022-tomatoes',
      title: 'Tomatoes',
      isGap: true,
      text: `The tomato is the world's most popular fruit. And yes, scientifically speaking, it is a fruit, [20] a vegetable. More than 60 million tons of tomatoes are produced every year, 16 million tons more than the banana, the [21] one in popularity.

Tomatoes were first [22] by Aztecs and Incas. Explorers returning from Mexico introduced the tomato [23] Europe in 1556. The French called it "the apple of love," the Germans "the apple of paradise."

Tomatoes are [24] in vitamins A and C, and are fat free. An average size tomato has only 35 calories. In addition, new medical [25] suggests that eating tomatoes may prevent cancer.

Tomatoes are used in many food products as pasta and pizza. According to a survey from 1997, 68% of chefs use canned tomatoes because of their quality and taste. It hasn't changed much since.`,
    },
  ],

  questions: [
    // ── PARTE 1 — Vocabulario: Professions (Q1–5) ─────────────────────────────
    { n:1, type:'vocab',
      vocabWords:['clown','doctor','driver','farmer','footballer','nurse','pirate'],
      stem:'You can see this person in the countryside picking fruit.',
      options:['clown','doctor','driver','farmer','footballer','nurse','pirate'], answer:3 },
    { n:2, type:'vocab',
      vocabWords:['clown','doctor','driver','farmer','footballer','nurse','pirate'],
      stem:'When children see this person, they often laugh and have fun.',
      options:['clown','doctor','driver','farmer','footballer','nurse','pirate'], answer:0 },
    { n:3, type:'vocab',
      vocabWords:['clown','doctor','driver','farmer','footballer','nurse','pirate'],
      stem:'This person has a boat and hides treasure.',
      options:['clown','doctor','driver','farmer','footballer','nurse','pirate'], answer:6 },
    { n:4, type:'vocab',
      vocabWords:['clown','doctor','driver','farmer','footballer','nurse','pirate'],
      stem:'This person takes you from one place to another.',
      options:['clown','doctor','driver','farmer','footballer','nurse','pirate'], answer:2 },
    { n:5, type:'vocab',
      vocabWords:['clown','doctor','driver','farmer','footballer','nurse','pirate'],
      stem:'This person plays a sport for work.',
      options:['clown','doctor','driver','farmer','footballer','nurse','pirate'], answer:4 },

    // ── PARTE 2 — Conversaciones (Q6–8) ────────────────────────────────────────
    { n:6, type:'dialog',
      stem:'Have you got a dress I can wear?',
      options:['That\'s fine!','Sure!','Enjoy!'], answer:1 },
    { n:7, type:'dialog',
      stem:'Where did they buy their new car?',
      options:['I don\'t know.','You are right.','It\'s bigger.'], answer:0 },
    { n:8, type:'dialog',
      stem:'We haven\'t discussed our tour plans yet.',
      options:['You poor thing.','Let\'s do it now.','As late as possible.'], answer:1 },

    // ── PARTE 3 — Lectura: Body Language (Q9–14) ──────────────────────────────
    { n:9, type:'reading', passageId:'p2022-bodylan',
      stem:'You can have problems in the Middle East if you show',
      options:['any head movement.','the bottom of your feet.','your legs and nose.'], answer:1 },
    { n:10, type:'reading', passageId:'p2022-bodylan',
      stem:'People usually move their heads in Pakistan when someone is',
      options:['arriving.','chatting.','traveling.'], answer:0 },
    { n:11, type:'reading', passageId:'p2022-bodylan',
      stem:'In India, what should you use to tell someone to leave?',
      options:['your foot','your head','your hand'], answer:2 },
    { n:12, type:'reading', passageId:'p2022-bodylan',
      stem:'To get something from another person, Nigerians use the right hand because',
      options:['it\'s strong.','it\'s soft.','it\'s clean.'], answer:2 },
    { n:13, type:'reading', passageId:'p2022-bodylan',
      stem:'In New Zealand, when the Maori say hello, they speak',
      options:['quietly.','loudly.','normally.'], answer:1 },
    { n:14, type:'reading', passageId:'p2022-bodylan',
      stem:'If someone stands very close to you in a conversation, they might come from',
      options:['France.','Germany.','Japan.'], answer:0 },

    // ── PARTE 4 — Lectura: Cats (Q15–19) ──────────────────────────────────────
    { n:15, type:'reading', passageId:'p2022-cats',
      stem:'What is the purpose of the writer?',
      options:['describe the experience of having a pet','advise people on how to deal with cats as pets','explain how to save money if getting a cat','name differences between cats and other pets'], answer:1 },
    { n:16, type:'reading', passageId:'p2022-cats',
      stem:'What can the reader find out from the text?',
      options:['how easy it is to love a pet','why cats are so special and friendly','advantages of having cats','important facts about cats behavior'], answer:3 },
    { n:17, type:'reading', passageId:'p2022-cats',
      stem:'How is the relationship between cats and humans?',
      options:['Humans enjoy spoiling cats.','Cats love to play with humans just like dogs do.','Cats need attention from humans.','Humans like to show their love to their cats.'], answer:2 },
    { n:18, type:'reading', passageId:'p2022-cats',
      stem:'What do cats like about high furniture?',
      options:['This can help them communicate.','This helps them get closer relationships.','This provides cats comfortable places to play.','This helps cats to see you easily.'], answer:3 },
    { n:19, type:'reading', passageId:'p2022-cats',
      stem:'What can you think about cats from the text?',
      options:['Cats are great, but owners need to learn about them.','Cats are very complicated pets.','Cats are independent pets.','Cats and dogs are pets with very similar characters.'], answer:0 },

    // ── PARTE 5 — Completar espacios: Tomatoes (Q20–25) ──────────────────────
    { n:20, type:'gap', passageId:'p2022-tomatoes',
      stem:'it is a fruit, [20] a vegetable',
      options:['neither','nor','not','no'], answer:2 },
    { n:21, type:'gap', passageId:'p2022-tomatoes',
      stem:'the banana, the [21] one in popularity',
      options:['two','both','twice','second'], answer:3 },
    { n:22, type:'gap', passageId:'p2022-tomatoes',
      stem:'Tomatoes were first [22] by Aztecs and Incas',
      options:['achieved','done','grown','invented'], answer:2 },
    { n:23, type:'gap', passageId:'p2022-tomatoes',
      stem:'introduced the tomato [23] Europe in 1556',
      options:['out','on','at','into'], answer:3 },
    { n:24, type:'gap', passageId:'p2022-tomatoes',
      stem:'Tomatoes are [24] in vitamins A and C',
      options:['charged','rich','loaded','full'], answer:1 },
    { n:25, type:'gap', passageId:'p2022-tomatoes',
      stem:'new medical [25] suggests that eating tomatoes may prevent cancer',
      options:['operation','prescription','drug','research'], answer:3 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SIMULACRO 3 — ICFES Saber 11 · Inglés · 2019 · Examen 1
// Respuestas oficiales verificadas por clave publicada por ICFES
// ─────────────────────────────────────────────────────────────────────────────
const exam2019ex1: Simulacro = {
  id: 'icfes-2019-ex1',
  assessment: 'saber-11',
  year: 2019,
  grade: 11,
  title: 'Cuadernillo Oficial 2019 — Examen 1',
  source: 'ICFES, 2018–2019. Cuadernillo de preguntas Saber 11°. Examen 1.',
  timeMinutes: 60,
  totalQuestions: 25,
  partRanges: [
    { part: 1, from: 1, to: 5 }, { part: 2, from: 6, to: 6 },
    { part: 3, from: 7, to: 8 }, { part: 4, from: 9, to: 16 },
    { part: 5, from: 17, to: 23 }, { part: 6, from: 24, to: 25 },
  ],

  passages: [
    {
      id: 'p2019e1-coffee',
      title: 'Coffee',
      isGap: true,
      text: `Coffee is popular around the world. Over the past centuries, few subjects have been as carefully studied as coffee. Its [9] important component is caffeine and it has lots of benefits.

Coffee has been well-known [10] the beginning of the 14th century, [11] Sufi Yemenis started using coffee to stay alert during special activities. It became a popular medicine [12] Europeans in the 1600s.

Caffeine was first [13] in the 1800s by Ferdinand Runge, a doctor that found out some effects that coffee has on people.

Some people say [14] coffee isn't good, but doctors say you [15] believe this. Thanks to caffeine you don't get hungry. Coffee can also reduce headaches and blood problems. [16] many people believe coffee is bad, studies show it is good for your heart.`,
    },
    {
      id: 'p2019e1-salter',
      title: "James Salter's Days in Film",
      text: `James Salter was a pilot in the United States Air Force. He abandoned the military profession in 1957 after the publication of his first novel, The Hunters. He is best known as a novelist, but during the sixties and seventies, he worked in film making. Salter made documentaries, wrote texts for films, and even was the director of a film called Three, starring Charlotte Rampling and Sam Waterston.

In Passionate Falsehoods, which was adapted from Salter's book Burning the Days, published in The New Yorker in 1997, Salter tells the story of his life in film.

Salter's time in the film world is both good and bad. In Rome, he met directors and stars. In New York, he explored the city with Robert Redford and enjoyed being famous. Deborah Treisman and Michael Agger have talked about Salter. Nick Paumgarten in The Last Book describes Salter's opinion about his film career:

"Of sixteen texts for movies, only four were popular. There was money, attractive women, and entrance into rooms where there were stories more for the dinner table than for the page." Salter thought he was wasting his time.

Perhaps he wasted his time in a larger artistic way, but it still makes for attractive reading. The Last Book is available to everyone in online stores.`,
    },
    {
      id: 'p2019e1-pizza',
      title: 'Swift Pizza and Sandwich House',
      text: `Today we have the pleasure of showing you the best letter written by our customer Mark. He wins £25 for writing about us this week. He is so happy with the orders at Swift Pizza and Sandwich House that he wants to declare a holiday to celebrate his experience here: "Happy burgerday and Merry Sandwichmas to everyone!" he wrote.

One typical day I was too tired after working all day long to cook for myself, and I was very hungry. I really wanted something to eat, so I decided to find a burger. I ordered a half-pound burger and a lamb and chicken sandwich. I also made some special orders for extra cheese and vegetables.

Food arrived very fast (less than twenty minutes) and was hot and fresh. The burger was delicious, and left me wanting more — fortunately I had the sandwich left. It felt as if it had been cut just a minute before I opened it — juicy, fresh, and great.

Every single special request I made was completely satisfied, 100%! And the best thing was that all of the above and some drinks cost me ONLY 10 dollars! If that doesn't say value for money, I don't know what does.

It certainly feels great to find new excellent food delivery companies for whenever you don't feel like cooking yourself. I recently had a sad experience with my usual take away restaurant, so I decided to change to something else — and on my first try I got what I wanted!`,
    },
  ],

  questions: [
    // ── PARTE 1 — Vocabulario: Clothes and accessories (Q1–5) ─────────────────
    { n:1, type:'vocab',
      vocabWords:['glasses','handbags','pajamas','scarf','skirt','socks','watch'],
      stem:'A woman carries her things in one of these.',
      options:['glasses','handbags','pajamas','scarf','skirt','socks','watch'], answer:1 },
    { n:2, type:'vocab',
      vocabWords:['glasses','handbags','pajamas','scarf','skirt','socks','watch'],
      stem:'Many girls wear this when they don\'t want to wear trousers.',
      options:['glasses','handbags','pajamas','scarf','skirt','socks','watch'], answer:4 },
    { n:3, type:'vocab',
      vocabWords:['glasses','handbags','pajamas','scarf','skirt','socks','watch'],
      stem:'With this, your neck won\'t be cold.',
      options:['glasses','handbags','pajamas','scarf','skirt','socks','watch'], answer:3 },
    { n:4, type:'vocab',
      vocabWords:['glasses','handbags','pajamas','scarf','skirt','socks','watch'],
      stem:'When people can\'t see well, they need them.',
      options:['glasses','handbags','pajamas','scarf','skirt','socks','watch'], answer:0 },
    { n:5, type:'vocab',
      vocabWords:['glasses','handbags','pajamas','scarf','skirt','socks','watch'],
      stem:'These are for your feet.',
      options:['glasses','handbags','pajamas','scarf','skirt','socks','watch'], answer:5 },

    // ── PARTE 2 — Aviso (Q6) ──────────────────────────────────────────────────
    { n:6, type:'notice',
      stem:'Where could you find this notice? "Draw a line to complete the snake and color it"',
      options:['on a rug','on a test','on a bookcase'], answer:1 },

    // ── PARTE 3 — Conversaciones (Q7–8) ───────────────────────────────────────
    { n:7, type:'dialog',
      stem:'Grandma, shall I hold those bags for you?',
      options:['I\'m not afraid!','What\'s the matter?','That\'s fine.'], answer:2 },
    { n:8, type:'dialog',
      stem:'How much is that umbrella?',
      options:['Anything else?','50 dollars.','Cash only!'], answer:1 },

    // ── PARTE 4 — Completar texto: Coffee (Q9–16) ─────────────────────────────
    { n:9, type:'gap', passageId:'p2019e1-coffee',
      stem:'Its [9] important component is caffeine',
      options:['much','more','most'], answer:2 },
    { n:10, type:'gap', passageId:'p2019e1-coffee',
      stem:'Coffee has been well-known [10] the beginning of the 14th century',
      options:['during','until','since'], answer:2 },
    { n:11, type:'gap', passageId:'p2019e1-coffee',
      stem:'[11] Sufi Yemenis started using coffee to stay alert',
      options:['when','which','who'], answer:0 },
    { n:12, type:'gap', passageId:'p2019e1-coffee',
      stem:'It became a popular medicine [12] Europeans in the 1600s',
      options:['among','about','along'], answer:0 },
    { n:13, type:'gap', passageId:'p2019e1-coffee',
      stem:'Caffeine was first [13] in the 1800s by Ferdinand Runge',
      options:['describe','described','describes'], answer:1 },
    { n:14, type:'gap', passageId:'p2019e1-coffee',
      stem:'Some people say [14] coffee isn\'t good',
      options:['drink','drinking','drunk'], answer:1 },
    { n:15, type:'gap', passageId:'p2019e1-coffee',
      stem:'doctors say you [15] believe this (that coffee is bad)',
      options:['mustn\'t','couldn\'t','wouldn\'t'], answer:0 },
    { n:16, type:'gap', passageId:'p2019e1-coffee',
      stem:'[16] many people believe coffee is bad, studies show it is good',
      options:['while','if','because'], answer:0 },

    // ── PARTE 5 — Lectura: James Salter (Q17–23) ──────────────────────────────
    { n:17, type:'reading', passageId:'p2019e1-salter',
      stem:'James Salter played an important part in the making of movies from',
      options:['1960 to 1979.','1960 to 1970.','1960 to 1985.'], answer:0 },
    { n:18, type:'reading', passageId:'p2019e1-salter',
      stem:'Passionate Falsehoods is',
      options:['a newspaper.','a play.','a movie.'], answer:2 },
    { n:19, type:'reading', passageId:'p2019e1-salter',
      stem:'Salter had nice and difficult times in his',
      options:['acting years.','big screen work.','visit to one city.'], answer:1 },
    { n:20, type:'reading', passageId:'p2019e1-salter',
      stem:'The Last Book was written by',
      options:['James Salter.','Deborah Treisman.','Nick Paumgarten.'], answer:2 },
    { n:21, type:'reading', passageId:'p2019e1-salter',
      stem:'James Salter thinks that his work in the cinema business was',
      options:['not useful.','not hard.','not usual.'], answer:0 },
    { n:22, type:'reading', passageId:'p2019e1-salter',
      stem:'Reading about James Salter\'s years in the cinema could be',
      options:['clever enough.','just fair.','quite interesting.'], answer:2 },
    { n:23, type:'reading', passageId:'p2019e1-salter',
      stem:'The Last Book can be found',
      options:['in museums.','at a café.','on the web.'], answer:2 },

    // ── PARTE 6 — Lectura: Swift Pizza (Q24–25) ───────────────────────────────
    { n:24, type:'reading', passageId:'p2019e1-pizza',
      stem:'According to the text, the customer',
      options:['left a £25 tip to the waiters who work there.','celebrated Christmas and New Year at this restaurant.','found this great restaurant after many attempts.','posted an excellent review about this restaurant.'], answer:3 },
    { n:25, type:'reading', passageId:'p2019e1-pizza',
      stem:'It can be inferred from the text that Mark',
      options:['does not like cooking food for himself.','almost always eats hamburgers.','enjoys eating fast food sometimes.','is tired of going to restaurants.'], answer:2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SIMULACRO 4 — ICFES Saber 11 · Inglés · Grado 11 · 2021 · Examen 1
// Fuente oficial con clave de respuestas publicada por ICFES
// ─────────────────────────────────────────────────────────────────────────────
const exam2021ex1: Simulacro = {
  id: 'icfes-2021-ex1',
  assessment: 'saber-11',
  year: 2021,
  grade: 11,
  title: 'Cuadernillo Oficial 2021 — Grado 11 · Examen 1',
  source: 'ICFES, 2021. Cuadernillo de preguntas Saber 11.° Inglés, Examen 1.',
  timeMinutes: 60,
  totalQuestions: 25,
  partRanges: [
    { part: 1, from: 1, to: 5 }, { part: 2, from: 6, to: 6 },
    { part: 3, from: 7, to: 8 }, { part: 4, from: 9, to: 16 },
    { part: 5, from: 17, to: 23 }, { part: 6, from: 24, to: 25 },
  ],

  passages: [
    {
      id: 'p21e1-notice6',
      title: 'Aviso',
      text: 'Answer all questions below.\nWrite your name clearly at the top of this page.',
    },
    {
      id: 'p21e1-gap',
      title: 'Tea Around the World',
      isGap: true,
      text: `Tea is the [9] popular hot drink in the world. People have been enjoying it [10] ancient times. It is especially loved [11] people want to relax or chat with friends. It is enjoyed [12] people of all ages and cultures. Tea has been [13] as a perfect way to begin the day. People enjoy [14] a warm cup in the morning. You [15] forget to let it cool before drinking. [16] drinking tea, many people also like to eat biscuits or cakes.`,
    },
    {
      id: 'p21e1-salter',
      title: 'A Life in Words and Film',
      text: `James Salter is a well-known American writer famous for his novels and short stories. He also played an important part in the making of movies from 1960 to 1979. One of his most discussed films was Passionate Falsehoods.

Salter had both pleasant and difficult times in his big screen work. While some film projects were successful, others proved frustrating. He collaborated with directors and studios, but the creative process was often challenging.

Writer Nick Paumgarten published a piece called The Last Book about Salter's life and work. In it, James Salter suggests that his work in the cinema business was not useful compared to writing novels. Yet, reading about James Salter's years in the cinema could be quite interesting for anyone who loves both literature and film.

The Last Book, Nick Paumgarten's profile of Salter, can be found on the web at the New Yorker website.`,
    },
    {
      id: 'p21e1-review',
      title: 'Restaurant Review',
      text: `★★★★★  A must-visit restaurant!

I discovered this wonderful place six months ago, and it has quickly become my favorite restaurant in the city. The chef creates amazing dishes using fresh, local ingredients, and the service is always friendly and attentive.

My last visit was on a Friday evening with my family. We ordered a variety of dishes and everything was delicious. The warm atmosphere and beautiful decoration made it special.

I decided to post an excellent review about this restaurant on all the major travel and food websites, because more people should know about it. Although I enjoy eating fast food sometimes during a busy workweek, a meal here is a completely different and superior experience.

— Mark, loyal customer`,
    },
  ],

  questions: [
    // ── PARTE 1 — Vocabulario: Clothes and Accessories (Q1–5) ─────────────────
    { n:1, type:'vocab',
      vocabWords:['glasses','handbags','pajamas','scarf','skirt','socks','watch'],
      stem:'A woman carries her things in one of these.',
      options:['glasses','handbags','pajamas','scarf','skirt','socks','watch'], answer:1 },
    { n:2, type:'vocab',
      vocabWords:['glasses','handbags','pajamas','scarf','skirt','socks','watch'],
      stem:'Many girls wear this when they don\'t want to wear trousers.',
      options:['glasses','handbags','pajamas','scarf','skirt','socks','watch'], answer:4 },
    { n:3, type:'vocab',
      vocabWords:['glasses','handbags','pajamas','scarf','skirt','socks','watch'],
      stem:'With this, your neck won\'t be cold.',
      options:['glasses','handbags','pajamas','scarf','skirt','socks','watch'], answer:3 },
    { n:4, type:'vocab',
      vocabWords:['glasses','handbags','pajamas','scarf','skirt','socks','watch'],
      stem:'When people can\'t see well, they need them.',
      options:['glasses','handbags','pajamas','scarf','skirt','socks','watch'], answer:0 },
    { n:5, type:'vocab',
      vocabWords:['glasses','handbags','pajamas','scarf','skirt','socks','watch'],
      stem:'These are for your feet.',
      options:['glasses','handbags','pajamas','scarf','skirt','socks','watch'], answer:5 },

    // ── PARTE 2 — Aviso (Q6) ──────────────────────────────────────────────────
    { n:6, type:'notice', passageId:'p21e1-notice6',
      stem:'Where can you see this notice?',
      options:['on a rug','on a test','on a bookcase'], answer:1 },

    // ── PARTE 3 — Diálogos (Q7–8) ────────────────────────────────────────────
    { n:7, type:'dialog',
      stem:'Grandma, shall I hold those bags for you?',
      options:['I\'m not afraid!','What\'s the matter?','That\'s fine.'], answer:2 },
    { n:8, type:'dialog',
      stem:'How much is that umbrella?',
      options:['Anything else?','50 dollars.','Cash only!'], answer:1 },

    // ── PARTE 4 — Gap-fill: Tea (Q9–16) ──────────────────────────────────────
    { n:9, type:'gap', passageId:'p21e1-gap',
      stem:'Tea is the ___ popular hot drink in the world.',
      options:['much','more','most'], answer:2 },
    { n:10, type:'gap', passageId:'p21e1-gap',
      stem:'People have been enjoying it ___ ancient times.',
      options:['during','until','since'], answer:2 },
    { n:11, type:'gap', passageId:'p21e1-gap',
      stem:'It is especially loved ___ people want to relax.',
      options:['when','which','who'], answer:0 },
    { n:12, type:'gap', passageId:'p21e1-gap',
      stem:'It is enjoyed ___ people of all ages.',
      options:['among','about','along'], answer:0 },
    { n:13, type:'gap', passageId:'p21e1-gap',
      stem:'Tea has been ___ as a perfect way to begin the day.',
      options:['describe','described','describes'], answer:1 },
    { n:14, type:'gap', passageId:'p21e1-gap',
      stem:'People enjoy ___ a warm cup in the morning.',
      options:['drink','drinking','drunk'], answer:1 },
    { n:15, type:'gap', passageId:'p21e1-gap',
      stem:'You ___ forget to let it cool before drinking.',
      options:['mustn\'t','couldn\'t','wouldn\'t'], answer:0 },
    { n:16, type:'gap', passageId:'p21e1-gap',
      stem:'___ drinking tea, many people also like to eat biscuits.',
      options:['While','If','Because'], answer:0 },

    // ── PARTE 5 — Lectura: James Salter (Q17–23) ─────────────────────────────
    { n:17, type:'reading', passageId:'p21e1-salter',
      stem:'James Salter played an important part in the making of movies from',
      options:['1960 to 1979.','1960 to 1970.','1960 to 1985.'], answer:0 },
    { n:18, type:'reading', passageId:'p21e1-salter',
      stem:'Passionate Falsehoods is',
      options:['a newspaper.','a play.','a movie.'], answer:2 },
    { n:19, type:'reading', passageId:'p21e1-salter',
      stem:'Salter had nice and difficult times in his',
      options:['acting years.','big screen work.','visit to one city.'], answer:1 },
    { n:20, type:'reading', passageId:'p21e1-salter',
      stem:'The Last Book was written by',
      options:['James Salter.','Deborah Treisman.','Nick Paumgarten.'], answer:2 },
    { n:21, type:'reading', passageId:'p21e1-salter',
      stem:'James Salter thinks that his work in the cinema business was',
      options:['not useful.','not hard.','not usual.'], answer:0 },
    { n:22, type:'reading', passageId:'p21e1-salter',
      stem:'Reading about James Salter\'s years in the cinema could be',
      options:['clever enough.','just fair.','quite interesting.'], answer:2 },
    { n:23, type:'reading', passageId:'p21e1-salter',
      stem:'The Last Book can be found',
      options:['in museums.','at a café.','on the web.'], answer:2 },

    // ── PARTE 6 — Lectura: Restaurant Review (Q24–25) ────────────────────────
    { n:24, type:'reading', passageId:'p21e1-review',
      stem:'According to the text, the customer',
      options:['left a £25 tip to the waiters who work there.','celebrated Christmas and New Year at this restaurant.','found this great restaurant after many attempts.','posted an excellent review about this restaurant.'], answer:3 },
    { n:25, type:'reading', passageId:'p21e1-review',
      stem:'It can be inferred from the text that Mark',
      options:['does not like cooking food for himself.','almost always eats hamburgers.','enjoys eating fast food sometimes.','is tired of going to restaurants.'], answer:2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SIMULACRO 5 — ICFES Saber 11 · Inglés · Grado 11 · 2021 · Examen 2
// ─────────────────────────────────────────────────────────────────────────────
const exam2021ex2: Simulacro = {
  id: 'icfes-2021-ex2',
  assessment: 'saber-11',
  year: 2021,
  grade: 11,
  title: 'Cuadernillo Oficial 2021 — Grado 11 · Examen 2',
  source: 'ICFES, 2021. Cuadernillo de preguntas Saber 11.° Inglés, Examen 2.',
  timeMinutes: 60,
  totalQuestions: 25,
  partRanges: [
    { part: 1, from: 1, to: 3 }, { part: 2, from: 4, to: 6 },
    { part: 3, from: 7, to: 9 }, { part: 4, from: 10, to: 14 },
    { part: 5, from: 15, to: 19 }, { part: 6, from: 20, to: 21 },
    { part: 7, from: 22, to: 25 },
  ],

  passages: [
    {
      id: 'p21e2-gap',
      title: 'The Blue Whale',
      isGap: true,
      text: `The blue whale is a creature which lives in the ocean. A scientist recently [10] that it is the most extraordinary animal on Earth. [11] body can reach up to 30 meters in length. [12] animals spend their entire lives at sea. The blue whale is the [13] animal species in the world. It is found [14] the deep, cold waters of every ocean.`,
    },
    {
      id: 'p21e2-painter',
      title: 'The Painter',
      text: `When I was seven years old, I had difficulty sleeping at night. One night I found a show on television about a painter from France. He used oil paints to create beautiful pictures and I was completely amazed by the painter's ability to make such wonderful art.

I watched his show once a week, and each time I felt more excited about painting. I tried to make my own paintings at home, but I could not get oil paints because I was too young. My mother said the paints were not suitable for children my age.

Stopping painting was my mother's order, though I continued to draw with pencils and crayons. Years later, I returned to painting as a hobby, and I am grateful for those early memories.`,
    },
    {
      id: 'p21e2-coffee',
      title: 'Visit a Colombian Coffee Farm',
      text: `Are you dreaming of an unforgettable holiday in the heart of Colombia? Hacienda El Cafetal is nestled in the rolling hills of the Eje Cafetero, surrounded by beautiful green coffee plants and spectacular mountain views.

Visit us and experience authentic Colombian culture. Our guides will show you every step of the coffee process, from picking the ripe red berries to preparing the perfect cup.

Our accommodation packages include everything you need: a comfortable private room, all three daily meals prepared with fresh local produce, a guided tour of the farm, and a coffee tasting session each afternoon.

Come and discover why Colombia is one of the most exciting travel destinations in South America. Book your visit today and encourage your friends and family to join you.`,
    },
    {
      id: 'p21e2-gap7',
      title: 'The Power of Reading',
      isGap: true,
      text: `Reading stories shows us something important about the world. This is [22] people everywhere love books so much. The best [23] take us to new places, times, and adventures. Step [24] of your daily life for a while and open a book. [25] every person who reads regularly says it helps them think better and feel calmer.`,
    },
  ],

  questions: [
    // ── PARTE 1 — Vocabulario: Transportation (Q1–3) ─────────────────────────
    { n:1, type:'vocab',
      vocabWords:['ambulance','boat','bus','motorbike','plane','truck','train'],
      stem:'People drive it on a road and it carries big things.',
      options:['ambulance','boat','bus','motorbike','plane','truck','train'], answer:5 },
    { n:2, type:'vocab',
      vocabWords:['ambulance','boat','bus','motorbike','plane','truck','train'],
      stem:'People pay to take this public transport by road.',
      options:['ambulance','boat','bus','motorbike','plane','truck','train'], answer:2 },
    { n:3, type:'vocab',
      vocabWords:['ambulance','boat','bus','motorbike','plane','truck','train'],
      stem:'Many people fly on it to go to a place.',
      options:['ambulance','boat','bus','motorbike','plane','truck','train'], answer:4 },

    // ── PARTE 2 — Avisos (Q4–6) ──────────────────────────────────────────────
    { n:4, type:'notice',
      stem:'¿Dónde puede ver este aviso?',
      options:['on a plane','on a bus','on a boat'], answer:1 },
    { n:5, type:'notice',
      stem:'¿Dónde puede ver este aviso?',
      options:['in a house','in a shop','in a zoo'], answer:1 },
    { n:6, type:'notice',
      stem:'¿Dónde puede ver este aviso?',
      options:['on a board','on a computer','on a bookcase'], answer:2 },

    // ── PARTE 3 — Diálogos (Q7–9) ────────────────────────────────────────────
    { n:7, type:'dialog',
      stem:'I can\'t eat a cold sandwich. It is horrible!',
      options:['I hope so.','I agree.','I am not.'], answer:1 },
    { n:8, type:'dialog',
      stem:'I am going on vacation to Vancouver!',
      options:['That\'s great!','I like swimming!','You are first!'], answer:0 },
    { n:9, type:'dialog',
      stem:'It rained a lot last night!',
      options:['Did you accept?','Did you understand?','Did you sleep?'], answer:2 },

    // ── PARTE 4 — Gap-fill: The Blue Whale (Q10–14) ──────────────────────────
    { n:10, type:'gap', passageId:'p21e2-gap',
      stem:'A scientist recently ___ that it is the most extraordinary animal on Earth.',
      options:['saying','said','say'], answer:1 },
    { n:11, type:'gap', passageId:'p21e2-gap',
      stem:'___ body can reach up to 30 meters in length.',
      options:['Its','His','Your'], answer:0 },
    { n:12, type:'gap', passageId:'p21e2-gap',
      stem:'___ animals spend their entire lives at sea.',
      options:['This','That','These'], answer:2 },
    { n:13, type:'gap', passageId:'p21e2-gap',
      stem:'The blue whale is the ___ animal species in the world.',
      options:['larger','largest','large'], answer:1 },
    { n:14, type:'gap', passageId:'p21e2-gap',
      stem:'It is found ___ the deep, cold waters of every ocean.',
      options:['in','along','on'], answer:0 },

    // ── PARTE 5 — Lectura: The Painter (Q15–19) ──────────────────────────────
    { n:15, type:'reading', passageId:'p21e2-painter',
      stem:'Where was the painter from?',
      options:['Ireland','Spain','France'], answer:2 },
    { n:16, type:'reading', passageId:'p21e2-painter',
      stem:'She was mostly excited by the',
      options:['painter\'s ability.','painter\'s voice.','painter\'s show.'], answer:0 },
    { n:17, type:'reading', passageId:'p21e2-painter',
      stem:'How often did she watch the show?',
      options:['three times a week','once a week','twice a week'], answer:1 },
    { n:18, type:'reading', passageId:'p21e2-painter',
      stem:'She could not get oil paints because she',
      options:['didn\'t speak Spanish.','was too young.','always watched TV.'], answer:1 },
    { n:19, type:'reading', passageId:'p21e2-painter',
      stem:'Stopping painting was',
      options:['the painter\'s idea.','her mother\'s order.','her own decision.'], answer:1 },

    // ── PARTE 6 — Lectura: Colombian Coffee Farm (Q20–21) ────────────────────
    { n:20, type:'reading', passageId:'p21e2-coffee',
      stem:'What is the writer trying to do in this article?',
      options:['convince people to buy a Colombian coffee farm','tell readers to run a coffee business in Colombia','invite tourists to write about places they visit in Colombia','encourage tourists to visit Colombia'], answer:3 },
    { n:21, type:'reading', passageId:'p21e2-coffee',
      stem:'What can a reader find out from this text?',
      options:['which activities tourists prefer to do at the farm','when the best time is to visit the farm','what the accommodation price includes','how to grow coffee on the farm'], answer:2 },

    // ── PARTE 7 — Gap-fill: The Power of Reading (Q22–25) ────────────────────
    { n:22, type:'gap', passageId:'p21e2-gap7',
      stem:'This is ___ people everywhere love books so much.',
      options:['where','why','when','what'], answer:1 },
    { n:23, type:'gap', passageId:'p21e2-gap7',
      stem:'The best ___ take us to new places, times, and adventures.',
      options:['essays','stories','reports','letters'], answer:1 },
    { n:24, type:'gap', passageId:'p21e2-gap7',
      stem:'Step ___ of your daily life for a while and open a book.',
      options:['off','in','at','out'], answer:3 },
    { n:25, type:'gap', passageId:'p21e2-gap7',
      stem:'___ every person who reads regularly says it helps them think better.',
      options:['Almost','Only','Hardly','Just'], answer:0 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SIMULACRO 6 — ICFES Saber 11 · Inglés · Grado 11 · 2016
// Clave oficial publicada en Cuadernillo Saber 11° 2016 (posiciones 101–125)
// ─────────────────────────────────────────────────────────────────────────────
const exam2016: Simulacro = {
  id: 'icfes-2016',
  assessment: 'saber-11',
  year: 2016,
  grade: 11,
  title: 'Cuadernillo Oficial 2016 — Grado 11',
  source: 'ICFES, 2016. Cuadernillo de prueba Saber 11°, publicación de preguntas Inglés.',
  timeMinutes: 60,
  totalQuestions: 25,
  partRanges: [
    { part: 2, from: 1, to: 3 }, { part: 1, from: 4, to: 6 },
    { part: 3, from: 7, to: 9 }, { part: 4, from: 10, to: 14 },
    { part: 5, from: 15, to: 19 }, { part: 6, from: 20, to: 21 },
    { part: 7, from: 22, to: 25 },
  ],

  passages: [
    {
      id: 'p2016-gap',
      title: 'The Blue Whale',
      isGap: true,
      text: `The blue whale is a creature which lives in the ocean. A scientist recently [10] that it is the most extraordinary animal on Earth. [11] body can reach up to 30 meters in length. [12] animals spend their entire lives at sea. The blue whale is the [13] animal species in the world. It is found [14] the deep, cold waters of every ocean.`,
    },
    {
      id: 'p2016-painter',
      title: 'The Painter',
      text: `When I was seven years old, I had difficulty sleeping at night. One night I found a show on television about a painter from France. He used oil paints to create beautiful pictures and I was completely amazed by the painter's ability to make such wonderful art.

I watched his show once a week, and each time I felt more excited about painting. I tried to make my own paintings at home, but I could not get oil paints because I was too young. My mother said the paints were not suitable for children my age.

Stopping painting was my mother's order, though I continued to draw with pencils and crayons.`,
    },
    {
      id: 'p2016-coffee',
      title: 'Visit a Colombian Coffee Farm',
      text: `Are you dreaming of an unforgettable holiday in the heart of Colombia? Hacienda El Cafetal is nestled in the rolling hills of the Eje Cafetero, surrounded by beautiful green coffee plants and spectacular mountain views.

Visit us and experience authentic Colombian culture. Our guides will show you every step of the coffee process, from picking the ripe red berries to preparing the perfect cup.

Our accommodation packages include everything you need: a comfortable private room, all three daily meals prepared with fresh local produce, a guided tour of the farm, and a coffee tasting session each afternoon.

Come and discover why Colombia is one of the most exciting travel destinations in South America.`,
    },
    {
      id: 'p2016-gap7',
      title: 'The Power of Reading',
      isGap: true,
      text: `Reading stories shows us something important about the world. This is [22] people everywhere love books so much. The best [23] take us to new places, times, and adventures. Step [24] of your daily life for a while and open a book. [25] every person who reads regularly says it helps them think better and feel calmer.`,
    },
  ],

  questions: [
    // ── PARTE 1 — Avisos (Q1–3, orig. 101–103) ───────────────────────────────
    { n:1, type:'notice',
      stem:'¿Dónde puede ver este aviso?',
      options:['on a plane','on a bus','on a boat'], answer:1 },
    { n:2, type:'notice',
      stem:'¿Dónde puede ver este aviso?',
      options:['in a house','in a shop','in a zoo'], answer:1 },
    { n:3, type:'notice',
      stem:'¿Dónde puede ver este aviso?',
      options:['on a board','on a computer','on a bookcase'], answer:2 },

    // ── PARTE 2 — Vocabulario: Transporte (Q4–6, orig. 104–106) ─────────────
    { n:4, type:'vocab',
      vocabWords:['bike','boat','bus','helicopter','motorbike','plane','truck','train'],
      stem:'People drive it on a road and it carries big things.',
      options:['bike','boat','bus','helicopter','motorbike','plane','truck','train'], answer:6 },
    { n:5, type:'vocab',
      vocabWords:['bike','boat','bus','helicopter','motorbike','plane','truck','train'],
      stem:'This is for only one or two people to go by road.',
      options:['bike','boat','bus','helicopter','motorbike','plane','truck','train'], answer:4 },
    { n:6, type:'vocab',
      vocabWords:['bike','boat','bus','helicopter','motorbike','plane','truck','train'],
      stem:'Many people fly on it to go to a place.',
      options:['bike','boat','bus','helicopter','motorbike','plane','truck','train'], answer:5 },

    // ── PARTE 3 — Diálogos (Q7–9, orig. 107–109) ─────────────────────────────
    { n:7, type:'dialog',
      stem:'I can\'t eat a cold sandwich. It is horrible!',
      options:['I hope so.','I agree.','I am not.'], answer:1 },
    { n:8, type:'dialog',
      stem:'I am going on vacation to Vancouver!',
      options:['That\'s great!','I like swimming!','You are first!'], answer:0 },
    { n:9, type:'dialog',
      stem:'It rained a lot last night!',
      options:['Did you accept?','Did you understand?','Did you sleep?'], answer:2 },

    // ── PARTE 4 — Gap-fill (Q10–14, orig. 110–114) ───────────────────────────
    { n:10, type:'gap', passageId:'p2016-gap',
      stem:'A scientist recently ___ that it is the most extraordinary animal.',
      options:['saying','said','say'], answer:1 },
    { n:11, type:'gap', passageId:'p2016-gap',
      stem:'___ body can reach up to 30 meters in length.',
      options:['Its','His','Your'], answer:0 },
    { n:12, type:'gap', passageId:'p2016-gap',
      stem:'___ animals spend their entire lives at sea.',
      options:['This','That','These'], answer:2 },
    { n:13, type:'gap', passageId:'p2016-gap',
      stem:'The blue whale is the ___ animal species in the world.',
      options:['larger','largest','large'], answer:1 },
    { n:14, type:'gap', passageId:'p2016-gap',
      stem:'It is found ___ the deep, cold waters of every ocean.',
      options:['in','at','on'], answer:0 },

    // ── PARTE 5 — Lectura: The Painter (Q15–19, orig. 115–119) ──────────────
    { n:15, type:'reading', passageId:'p2016-painter',
      stem:'Where was the painter from?',
      options:['Ireland','Spain','France'], answer:2 },
    { n:16, type:'reading', passageId:'p2016-painter',
      stem:'She was mostly excited by the',
      options:['painter\'s ability.','painter\'s voice.','painter\'s show.'], answer:0 },
    { n:17, type:'reading', passageId:'p2016-painter',
      stem:'How often did she watch the show?',
      options:['three times a week','once a week','twice a week'], answer:1 },
    { n:18, type:'reading', passageId:'p2016-painter',
      stem:'She could not get oil paints because she',
      options:['didn\'t speak Spanish.','was too young.','always watched TV.'], answer:1 },
    { n:19, type:'reading', passageId:'p2016-painter',
      stem:'Stopping painting was',
      options:['the painter\'s idea.','her mother\'s order.','her own decision.'], answer:1 },

    // ── PARTE 6 — Lectura: Colombian Coffee Farm (Q20–21, orig. 120–121) ─────
    { n:20, type:'reading', passageId:'p2016-coffee',
      stem:'What is the writer trying to do in this article?',
      options:['describe a tourism-leading Colombian coffee farm','tell readers to run a coffee business in Colombia','invite tourists to write about places they visit in Colombia','encourage tourists to visit Colombia'], answer:3 },
    { n:21, type:'reading', passageId:'p2016-coffee',
      stem:'What can a reader find out from this text?',
      options:['which activities tourists prefer to do at the farm','when the best time is to visit the farm','what the accommodation price includes','how to grow coffee on the farm'], answer:2 },

    // ── PARTE 7 — Gap-fill: The Power of Reading (Q22–25, orig. 122–125) ─────
    { n:22, type:'gap', passageId:'p2016-gap7',
      stem:'This is ___ people everywhere love books so much.',
      options:['where','why','when','what'], answer:1 },
    { n:23, type:'gap', passageId:'p2016-gap7',
      stem:'The best ___ take us to new places, times, and adventures.',
      options:['essays','stories','reports','letters'], answer:1 },
    { n:24, type:'gap', passageId:'p2016-gap7',
      stem:'Step ___ of your daily life for a while and open a book.',
      options:['off','in','at','out'], answer:3 },
    { n:25, type:'gap', passageId:'p2016-gap7',
      stem:'___ every person who reads regularly says it helps them think better.',
      options:['Almost','Only','Hardly','Just'], answer:0 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SIMULACRO 7 — ICFES Saber 11 · Inglés · Grado 11 · 2012
// Formato original con 45 preguntas — clave oficial publicada
// ─────────────────────────────────────────────────────────────────────────────
const exam2012: Simulacro = {
  id: 'icfes-2012',
  assessment: 'saber-11',
  year: 2012,
  grade: 11,
  title: 'Cuadernillo Oficial 2012 — Grado 11 · 45 preguntas',
  source: 'ICFES, 2012. Cuadernillo de pruebas Saber 11°, prueba de Inglés.',
  timeMinutes: 75,
  totalQuestions: 45,
  partRanges: [
    { part: 2, from: 1, to: 5 }, { part: 1, from: 6, to: 10 },
    { part: 3, from: 11, to: 15 }, { part: 4, from: 16, to: 23 },
    { part: 5, from: 24, to: 30 }, { part: 6, from: 31, to: 35 },
    { part: 7, from: 36, to: 45 },
  ],

  passages: [
    { id: 'p12-n1', title: 'Aviso 1', text: 'All students must show their ID card to enter the building.' },
    { id: 'p12-n2', title: 'Aviso 2', text: 'No visitors after 10 PM. Please be respectful of neighbors.' },
    { id: 'p12-n3', title: 'Aviso 3', text: 'NEW! Today\'s special: fresh bread and pastries 50% off.' },
    { id: 'p12-n4', title: 'Aviso 4', text: 'Please check in at the front desk. Visitors must sign the register.' },
    { id: 'p12-n5', title: 'Aviso 5', text: 'Reminder: Please clean your brushes and put all art materials away before leaving.' },
    {
      id: 'p12-gap',
      title: 'The Rainforest',
      isGap: true,
      text: `The rainforest is found in many places around the world. It provides [16] with food, clean air, and water. Scientists study it [17] it holds many secrets of nature. The Amazon is a great river [18] crosses this forest. It is [19] longest river in the world. The Amazon is [20] river system in South America. It rains [21] much that the forest stays green all year. People have been [22] the forest's resources for centuries. [23] wants to see this amazing ecosystem disappear.`,
    },
    {
      id: 'p12-eurotunnel',
      title: 'The Eurotunnel',
      text: `In 1957, an engineering company started studying the possibility to join Britain and France through a tunnel under the sea. It would have two trains for passengers as well as a small service train. In 1973 the ideas went into action and the hard work began. A short time later, they were stopped because there wasn't enough money to complete the project.

In 1984, several companies showed their ideas to re-start the project: two variations of railway, a road and a big bridge over the English Channel. The chosen project was the railway solution that was very similar to the one presented back in 1973. This time with help from both the British and French, a private company began the construction.

On January 20th 1986, the company TransMancheLink (TML) said that a long tunnel would be constructed. They chose a route from Folkestone in England to Calais in France. This wasn't the shortest possible way and the company needed to work harder than 13 years before.

It took seven years to complete the Eurotunnel and about 13,000 people worked on it. The two ends of the smallest platform met on December 1st 1990 and lots of journalists and photographers went to the opening ceremony. Later, in 1991 the two long trains met. The hard work continued and three years later the project was completed.`,
    },
    {
      id: 'p12-japan',
      title: 'A Year in Japan',
      text: `When I got the job offer to work in Japan for a year, I was excited but nervous. My family and close friends thought that I would miss them and would return before my contract ended. They were worried I would find it too difficult to adjust.

They were completely wrong! When I arrived in Tokyo, I quickly felt comfortable with the culture. I loved the food, the people, and especially the efficiency of the public transport. Japanese taxi drivers don't speak much English, but they always knew how to get me where I needed to go. I got to work on foot most mornings because I like running and it was a great way to explore the city.

Living with colleagues in a shared house was sometimes difficult — everyone has different habits — but we became good friends by the end of the year. I shared many curious experiences in this wonderful country.

I am very grateful for the amazing experience my company gave me. I will tell everyone all about Japanese culture!`,
    },
    {
      id: 'p12-gap7',
      title: 'Cities Around the World',
      isGap: true,
      text: `Cities around the world have in [0:past] years grown quickly. Technology has [36] the way we live and work. Many years [37], cities were smaller and life was simpler. People [38] new ways to travel between them. Cities have many [39] for tourists to explore. People enjoy walking through [40] streets and parks. Local governments [41] the city's museums and cultural events. It is important to keep [42] traditions for future generations. Each city [43] something unique and special to offer. Some historic buildings are still [44] and welcoming. They have stood long [45] to become famous landmarks.`,
    },
  ],

  questions: [
    // ── PARTE 1 — Avisos (Q1–5) ───────────────────────────────────────────────
    { n:1, type:'notice', passageId:'p12-n1',
      stem:'¿Dónde puede ver este aviso?',
      options:['in a school','in a playground','in a bathroom'], answer:0 },
    { n:2, type:'notice', passageId:'p12-n2',
      stem:'¿Dónde puede ver este aviso?',
      options:['on a boat','in a house','in the street'], answer:1 },
    { n:3, type:'notice', passageId:'p12-n3',
      stem:'¿Dónde puede ver este aviso?',
      options:['on a train','in a park','in a shop'], answer:2 },
    { n:4, type:'notice', passageId:'p12-n4',
      stem:'¿Dónde puede ver este aviso?',
      options:['in a hall','in a flat','on a beach'], answer:0 },
    { n:5, type:'notice', passageId:'p12-n5',
      stem:'¿Dónde puede ver este aviso?',
      options:['in a soccer class','in a drawing class','in a computer class'], answer:1 },

    // ── PARTE 2 — Vocabulario: Sports (Q6–10) ────────────────────────────────
    { n:6, type:'vocab',
      vocabWords:['ball','bike','competition','field','player','prize','stadium','uniform'],
      stem:'All members of the same team wear this.',
      options:['ball','bike','competition','field','player','prize','stadium','uniform'], answer:7 },
    { n:7, type:'vocab',
      vocabWords:['ball','bike','competition','field','player','prize','stadium','uniform'],
      stem:'You need this if you want to play tennis.',
      options:['ball','bike','competition','field','player','prize','stadium','uniform'], answer:0 },
    { n:8, type:'vocab',
      vocabWords:['ball','bike','competition','field','player','prize','stadium','uniform'],
      stem:'At the end of this there is usually one winner.',
      options:['ball','bike','competition','field','player','prize','stadium','uniform'], answer:2 },
    { n:9, type:'vocab',
      vocabWords:['ball','bike','competition','field','player','prize','stadium','uniform'],
      stem:'This is a place outdoors where you can play sports.',
      options:['ball','bike','competition','field','player','prize','stadium','uniform'], answer:3 },
    { n:10, type:'vocab',
      vocabWords:['ball','bike','competition','field','player','prize','stadium','uniform'],
      stem:'If you travel on it, you will do exercise and save time.',
      options:['ball','bike','competition','field','player','prize','stadium','uniform'], answer:1 },

    // ── PARTE 3 — Diálogos (Q11–15) ──────────────────────────────────────────
    { n:11, type:'dialog',
      stem:'Be careful!',
      options:['Yes, I do.','I will.','What a pity!'], answer:1 },
    { n:12, type:'dialog',
      stem:'Who\'s that girl?',
      options:['Yes, she is.','That\'s right.','My sister.'], answer:2 },
    { n:13, type:'dialog',
      stem:'What do you think of the teacher?',
      options:['Great school!','I think so.','I love his class.'], answer:2 },
    { n:14, type:'dialog',
      stem:'Do you know Martha?',
      options:['Who?','Which?','How?'], answer:0 },
    { n:15, type:'dialog',
      stem:'Can you pass me the salt?',
      options:['Here you are.','I like it.','It\'s all right.'], answer:0 },

    // ── PARTE 4 — Gap-fill: The Rainforest (Q16–23) ──────────────────────────
    { n:16, type:'gap', passageId:'p12-gap',
      stem:'It provides ___ with food, clean air, and water.',
      options:['ours','us','our'], answer:1 },
    { n:17, type:'gap', passageId:'p12-gap',
      stem:'Scientists study it ___ it holds many secrets of nature.',
      options:['while','but','because'], answer:2 },
    { n:18, type:'gap', passageId:'p12-gap',
      stem:'The Amazon is a great river ___ crosses this forest.',
      options:['which','who','where'], answer:0 },
    { n:19, type:'gap', passageId:'p12-gap',
      stem:'It is ___ longest river in the world.',
      options:['one','a','the'], answer:2 },
    { n:20, type:'gap', passageId:'p12-gap',
      stem:'The Amazon is ___ river system in South America.',
      options:['large','larger','largest'], answer:2 },
    { n:21, type:'gap', passageId:'p12-gap',
      stem:'It rains ___ much that the forest stays green all year.',
      options:['such','so','too'], answer:1 },
    { n:22, type:'gap', passageId:'p12-gap',
      stem:'People have been ___ the forest\'s resources for centuries.',
      options:['use','using','used'], answer:1 },
    { n:23, type:'gap', passageId:'p12-gap',
      stem:'___ wants to see this amazing ecosystem disappear.',
      options:['Nobody','Anybody','Somebody'], answer:0 },

    // ── PARTE 5 — Lectura: The Eurotunnel (Q24–30) ───────────────────────────
    { n:24, type:'reading', passageId:'p12-eurotunnel',
      stem:'They first started to build the Eurotunnel in',
      options:['1957.','1973.','1984.'], answer:1 },
    { n:25, type:'reading', passageId:'p12-eurotunnel',
      stem:'Some time after starting the construction, the company building Eurotunnel',
      options:['finished the tunnels.','had problems with time.','couldn\'t continue.'], answer:2 },
    { n:26, type:'reading', passageId:'p12-eurotunnel',
      stem:'What did companies want to do in 1984?',
      options:['build more tunnels','continue building the project','change the project'], answer:1 },
    { n:27, type:'reading', passageId:'p12-eurotunnel',
      stem:'The way in which the company built the tunnel was',
      options:['a long one.','completed in 13 years.','impossible to build.'], answer:0 },
    { n:28, type:'reading', passageId:'p12-eurotunnel',
      stem:'Compared to what the first company did, TML\'s work was',
      options:['easier.','shorter.','more difficult.'], answer:2 },
    { n:29, type:'reading', passageId:'p12-eurotunnel',
      stem:'There was a ceremony when the',
      options:['smallest platform was completed.','travelers\' train met.','project was completed.'], answer:0 },
    { n:30, type:'reading', passageId:'p12-eurotunnel',
      stem:'When was the Eurotunnel project finished?',
      options:['in 1990','in 1994','in 1991'], answer:1 },

    // ── PARTE 6 — Lectura: A Year in Japan (Q31–35) ──────────────────────────
    { n:31, type:'reading', passageId:'p12-japan',
      stem:'What is the writer trying to do in this article?',
      options:['encourage tourists to visit Japan','invite colleagues to learn Japanese','describe her job in Japan','share her curious experiences in Japan'], answer:3 },
    { n:32, type:'reading', passageId:'p12-japan',
      stem:'What can the reader find in this article?',
      options:['facts about Japanese culture','ways to take a taxi in Tokyo','an amusing story about a foreigner','how to order food in restaurants'], answer:2 },
    { n:33, type:'reading', passageId:'p12-japan',
      stem:'One of the ideas presented in the text is that',
      options:['it is difficult to share a house with colleagues.','she quickly felt comfortable with the culture.','Japanese taxi drivers can speak English.','she got to work on foot because she likes running.'], answer:1 },
    { n:34, type:'reading', passageId:'p12-japan',
      stem:'The writer\'s family and close friends thought that she',
      options:['would be treated badly by colleagues.','would enjoy the Japanese culture and way of life.','would not be able to make friends.','would miss them and would return before time.'], answer:3 },
    { n:35, type:'reading', passageId:'p12-japan',
      stem:'The most suitable note for the writer\'s employers would be:',
      options:['"I am very grateful for the amazing experience you gave me. I will tell people all about Japanese culture!"','"Thank you. I would appreciate living in a more comfortable house next time."','"It was a pleasure to work for your company. Next time, provide a map for foreign employees."','"I am really happy because it is time to leave Japan."'], answer:0 },

    // ── PARTE 7 — Gap-fill: Cities Around the World (Q36–45) ─────────────────
    { n:36, type:'gap', passageId:'p12-gap7',
      stem:'Technology has ___ the way we live and work.',
      options:['brought','caused','built','changed'], answer:3 },
    { n:37, type:'gap', passageId:'p12-gap7',
      stem:'Many years ___, cities were smaller and life was simpler.',
      options:['afterwards','ago','already','along'], answer:1 },
    { n:38, type:'gap', passageId:'p12-gap7',
      stem:'People ___ new ways to travel between them.',
      options:['found','caught','contained','taken'], answer:0 },
    { n:39, type:'gap', passageId:'p12-gap7',
      stem:'Cities have many ___ for tourists to explore.',
      options:['agencies','plans','attractions','reservations'], answer:2 },
    { n:40, type:'gap', passageId:'p12-gap7',
      stem:'People enjoy walking through ___ streets and parks.',
      options:['his','our','your','their'], answer:3 },
    { n:41, type:'gap', passageId:'p12-gap7',
      stem:'Local governments ___ the city\'s museums and cultural events.',
      options:['provide','support','afford','compete'], answer:1 },
    { n:42, type:'gap', passageId:'p12-gap7',
      stem:'It is important to keep ___ traditions for future generations.',
      options:['extreme','good','strict','changing'], answer:1 },
    { n:43, type:'gap', passageId:'p12-gap7',
      stem:'Each city ___ something unique and special to offer.',
      options:['was','are','have','has'], answer:3 },
    { n:44, type:'gap', passageId:'p12-gap7',
      stem:'Some historic buildings are still ___ and welcoming.',
      options:['alive','busy','cool','close'], answer:0 },
    { n:45, type:'gap', passageId:'p12-gap7',
      stem:'They have stood long ___ to become famous landmarks.',
      options:['quite','much','enough','rather'], answer:2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SIMULACRO 8 — ICFES Saber 10 · Inglés · Grado 10 · 2022
// ─────────────────────────────────────────────────────────────────────────────
const exam2022g10: Simulacro = {
  id: 'icfes-2022-g10',
  assessment: 'saber-10',
  year: 2022,
  grade: 10,
  title: 'Cuadernillo Oficial 2022 — Grado 10 · 22 preguntas',
  source: 'ICFES, 2022. Cuadernillo 1 Inglés, Saber 10.°',
  timeMinutes: 60,
  totalQuestions: 22,
  partRanges: [
    { part: 1, from: 1, to: 5 }, { part: 3, from: 6, to: 10 },
    { part: 4, from: 11, to: 16 }, { part: 5, from: 17, to: 22 },
  ],

  passages: [
    {
      id: 'p22g10-superman',
      title: 'Superman',
      isGap: true,
      text: `Kal-El is the last Kryptonian. Jor-El, Kal-El's father, sent the spaceship to Earth.

Jonathan and Martha Kent found the baby. [11], they brought him to their farm in Smallville, Kansas. The Kents called him Clark and loved him as their son.

[12] Clark was older, his Kryptonian body began to [13] super-human abilities. [14] telling his childhood friend Lana Lang where he really came from, Clark left Smallville to study at Metropolis University.

At first, people [15] know who was helping them. But Clark decided to do it in public to prevent the accident of a NASA space-plane. Later, he and his parents thought of a name. They called him "Superman."

Later on, Clark got a job at the Daily Planet newspaper, [16] he works until now.`,
    },
    {
      id: 'p22g10-holidays',
      title: 'Tired of Spending Your Holidays at the Beach?',
      text: `When it comes to holidays, people get really happy. They want to enjoy those few weeks as much as possible, but they are getting tired of doing the same. That is why some people have stopped going to sunny beaches and have started working on different activities that may help animals and nature.

"What's another trip to the Bahamas?" asks Debbie Jacobs, owner of a trip company. "Today, people want to do something different. Many people know they have a very good life, and they would enjoy to give something back." Short-time helping programs in which people do not get any money are the ones people choose the most.

For animal lovers, that means getting into nature-friendly activities that they would never have in their normal lives. From taking photos of sea animals in the Alaskan coast to saving cows and pigs, these people are finding that spending their time helping animals is a greater option than visiting well-known places.

There are several places where you can spend a few days, a week, or longer giving some help to wild and domesticated animals. On most of these trips, people need to participate in cleaning and other difficult activities; Jacob says they return home with more than sunburn because they see the difference they can make.`,
    },
  ],

  questions: [
    // ── PARTE 1 — Vocabulario: Sports (Q1–5) ─────────────────────────────────
    { n:1, type:'vocab',
      vocabWords:['baseball','basketball','bike riding','dancing','football','skiing','swimming'],
      stem:'People who play this are usually very tall.',
      options:['baseball','basketball','bike riding','dancing','football','skiing','swimming'], answer:1 },
    { n:2, type:'vocab',
      vocabWords:['baseball','basketball','bike riding','dancing','football','skiing','swimming'],
      stem:'To play this, you hit the ball and run.',
      options:['baseball','basketball','bike riding','dancing','football','skiing','swimming'], answer:0 },
    { n:3, type:'vocab',
      vocabWords:['baseball','basketball','bike riding','dancing','football','skiing','swimming'],
      stem:'People do this on mountains with snow.',
      options:['baseball','basketball','bike riding','dancing','football','skiing','swimming'], answer:5 },
    { n:4, type:'vocab',
      vocabWords:['baseball','basketball','bike riding','dancing','football','skiing','swimming'],
      stem:'You can only do this in the water.',
      options:['baseball','basketball','bike riding','dancing','football','skiing','swimming'], answer:6 },
    { n:5, type:'vocab',
      vocabWords:['baseball','basketball','bike riding','dancing','football','skiing','swimming'],
      stem:'People do this at parties or in a disco.',
      options:['baseball','basketball','bike riding','dancing','football','skiing','swimming'], answer:3 },

    // ── PARTE 2 — Diálogos (Q6–10) ───────────────────────────────────────────
    { n:6, type:'dialog',
      stem:'Did you get the appointment?',
      options:['Never again!','Come back!','Of course!'], answer:2 },
    { n:7, type:'dialog',
      stem:'It will rain.',
      options:['Why not?','For sure.','Lucky you.'], answer:1 },
    { n:8, type:'dialog',
      stem:'If I get the money, I will travel next month.',
      options:['What a pity!','No, you can\'t!','Let\'s drive!'], answer:0 },
    { n:9, type:'dialog',
      stem:'I can\'t see. Is there anybody out there?',
      options:['Too bad.','No. Never mind.','Yes. Where are you?'], answer:2 },
    { n:10, type:'dialog',
      stem:'Shall we go?',
      options:['Not yet.','How often?','Don\'t worry!'], answer:0 },

    // ── PARTE 3 — Gap-fill: Superman (Q11–16) ────────────────────────────────
    { n:11, type:'gap', passageId:'p22g10-superman',
      stem:'___, they brought him to their farm in Smallville, Kansas.',
      options:['Before','Now','Then'], answer:2 },
    { n:12, type:'gap', passageId:'p22g10-superman',
      stem:'___ Clark was older, his Kryptonian body began to develop abilities.',
      options:['Still','How','When'], answer:2 },
    { n:13, type:'gap', passageId:'p22g10-superman',
      stem:'His body began to ___ super-human abilities.',
      options:['develop','developed','developing'], answer:0 },
    { n:14, type:'gap', passageId:'p22g10-superman',
      stem:'___ telling his childhood friend where he came from, Clark left Smallville.',
      options:['Until','After','Since'], answer:1 },
    { n:15, type:'gap', passageId:'p22g10-superman',
      stem:'At first, people ___ know who was helping them.',
      options:['weren\'t','didn\'t','hadn\'t'], answer:1 },
    { n:16, type:'gap', passageId:'p22g10-superman',
      stem:'Clark got a job at the Daily Planet newspaper, ___ he works until now.',
      options:['who','which','where'], answer:2 },

    // ── PARTE 4 — Lectura: Holidays and Animals (Q17–22) ─────────────────────
    { n:17, type:'reading', passageId:'p22g10-holidays',
      stem:'Some people now want to spend their holidays',
      options:['doing new activities.','resting outdoors.','enjoying the sun.'], answer:0 },
    { n:18, type:'reading', passageId:'p22g10-holidays',
      stem:'What does Debbie Jacobs do?',
      options:['She takes pictures.','She helps animals.','She plans trips.'], answer:2 },
    { n:19, type:'reading', passageId:'p22g10-holidays',
      stem:'Many people who live well like',
      options:['helping people travel.','giving nature a hand.','getting animals\' help.'], answer:1 },
    { n:20, type:'reading', passageId:'p22g10-holidays',
      stem:'In most helping programs people work',
      options:['but aren\'t paid.','on usual activities.','and visit famous places.'], answer:0 },
    { n:21, type:'reading', passageId:'p22g10-holidays',
      stem:'Animal lovers have learned that these trips are very',
      options:['common.','safe.','interesting.'], answer:2 },
    { n:22, type:'reading', passageId:'p22g10-holidays',
      stem:'What do you have to do on these trips?',
      options:['help people','do some hard work','travel a lot'], answer:1 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SIMULACRO 9 — ICFES Saber 9 · Inglés · Grado 9 · 2022
// ─────────────────────────────────────────────────────────────────────────────
const exam2022g9: Simulacro = {
  id: 'icfes-2022-g9',
  assessment: 'saber-9',
  year: 2022,
  grade: 9,
  title: 'Cuadernillo Oficial 2022 — Grado 9 · 22 preguntas',
  source: 'ICFES, 2022. Cuadernillo 1 Inglés, Saber 9.°',
  timeMinutes: 60,
  totalQuestions: 22,
  partRanges: [
    { part: 1, from: 1, to: 5 }, { part: 2, from: 6, to: 10 },
    { part: 3, from: 11, to: 15 }, { part: 4, from: 16, to: 22 },
  ],

  passages: [
    { id: 'p22g9-n6', title: 'Aviso', text: 'Children under 8 must be accompanied by an adult at all times.' },
    { id: 'p22g9-n7', title: 'Aviso', text: 'Buy your favorite baseball and football computer games now!' },
    { id: 'p22g9-n8', title: 'Aviso', text: 'Bags behind the desks. Jackets next to the door.' },
    { id: 'p22g9-n9', title: 'Aviso', text: 'Today open for water games!' },
    { id: 'p22g9-n10', title: 'Aviso', text: 'Alex, there\'s a burger for you on the table.' },
    {
      id: 'p22g9-paper',
      title: 'History of Paper',
      isGap: true,
      text: `Since the beginning of writing, people have tried to think of something easy and cheap to write on, [16] it took 3000 years until the Chinese people made paper.

Only one thousand years afterwards, people were [17] paper all over Europe and Asia. In the 8th century, the Arabs and the Chinese were enemies, and the Arabs captured [18] Chinese men. Many of [19] men knew how to make paper, and [20] explained it to the Arabs as the price to be able to go home.

Almost eight centuries later, Europeans began to make [21] own paper. At that time, people in the country of the Aztecs [22] the way to make paper too, while the Chinese people were already famous for paper kites and toilet paper!`,
    },
  ],

  questions: [
    // ── PARTE 1 — Vocabulario: Parts of the Body (Q1–5) ─────────────────────
    { n:1, type:'vocab',
      vocabWords:['arms','ears','face','foot','hair','hands','head'],
      stem:'You can kick a ball with this.',
      options:['arms','ears','face','foot','hair','hands','head'], answer:3 },
    { n:2, type:'vocab',
      vocabWords:['arms','ears','face','foot','hair','hands','head'],
      stem:'You can listen to your mom and dad with these.',
      options:['arms','ears','face','foot','hair','hands','head'], answer:1 },
    { n:3, type:'vocab',
      vocabWords:['arms','ears','face','foot','hair','hands','head'],
      stem:'People wear a hat on this.',
      options:['arms','ears','face','foot','hair','hands','head'], answer:6 },
    { n:4, type:'vocab',
      vocabWords:['arms','ears','face','foot','hair','hands','head'],
      stem:'People usually write their name with these.',
      options:['arms','ears','face','foot','hair','hands','head'], answer:5 },
    { n:5, type:'vocab',
      vocabWords:['arms','ears','face','foot','hair','hands','head'],
      stem:'Some people like to have this in different colors.',
      options:['arms','ears','face','foot','hair','hands','head'], answer:4 },

    // ── PARTE 2 — Avisos (Q6–10) ─────────────────────────────────────────────
    { n:6, type:'notice', passageId:'p22g9-n6',
      stem:'¿Dónde puede ver este aviso?',
      options:['in a shop','in a street','in a playground'], answer:2 },
    { n:7, type:'notice', passageId:'p22g9-n7',
      stem:'¿Dónde puede ver este aviso?',
      options:['in a school','in a store','in a train'], answer:1 },
    { n:8, type:'notice', passageId:'p22g9-n8',
      stem:'¿Dónde puede ver este aviso?',
      options:['in a hall','in a bathroom','in a classroom'], answer:2 },
    { n:9, type:'notice', passageId:'p22g9-n9',
      stem:'¿Dónde puede ver este aviso?',
      options:['in a beach','in a garden','in a zoo'], answer:2 },
    { n:10, type:'notice', passageId:'p22g9-n10',
      stem:'¿Dónde puede ver este aviso?',
      options:['in a dining room','in a bedroom','in a living room'], answer:0 },

    // ── PARTE 3 — Diálogos (Q11–15) ──────────────────────────────────────────
    { n:11, type:'dialog',
      stem:'Mom, can I go with you?',
      options:['Not well.','Not mine.','Not today.'], answer:2 },
    { n:12, type:'dialog',
      stem:'We don\'t understand our homework.',
      options:['You are wrong.','Let me help.','It\'s very good.'], answer:1 },
    { n:13, type:'dialog',
      stem:'How often do you go to the gym?',
      options:['Yesterday afternoon.','At 2 o\'clock.','Once a week.'], answer:2 },
    { n:14, type:'dialog',
      stem:'This place is very dirty.',
      options:['I agree.','It\'s ready.','Thank you.'], answer:0 },
    { n:15, type:'dialog',
      stem:'Have you been to the doctor\'s lately?',
      options:['Yes, twice.','Tomorrow morning.','What time?'], answer:0 },

    // ── PARTE 4 — Gap-fill: History of Paper (Q16–22) ────────────────────────
    { n:16, type:'gap', passageId:'p22g9-paper',
      stem:'People tried to think of something cheap to write on, ___ it took 3000 years.',
      options:['or','so','but'], answer:2 },
    { n:17, type:'gap', passageId:'p22g9-paper',
      stem:'People were ___ paper all over Europe and Asia.',
      options:['uses','used','using'], answer:2 },
    { n:18, type:'gap', passageId:'p22g9-paper',
      stem:'The Arabs captured ___ Chinese men.',
      options:['some','any','much'], answer:0 },
    { n:19, type:'gap', passageId:'p22g9-paper',
      stem:'Many of ___ men knew how to make paper.',
      options:['that','these','this'], answer:1 },
    { n:20, type:'gap', passageId:'p22g9-paper',
      stem:'___ explained it to the Arabs as the price to go home.',
      options:['He','They','It'], answer:1 },
    { n:21, type:'gap', passageId:'p22g9-paper',
      stem:'Europeans began to make ___ own paper.',
      options:['their','our','your'], answer:0 },
    { n:22, type:'gap', passageId:'p22g9-paper',
      stem:'People in the country of the Aztecs ___ the way to make paper too.',
      options:['find','finding','found'], answer:2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SIMULACRO 10 — Saber TyT · Módulo de Inglés
// Fuente: ICFES, 2018. Cuadernillo de preguntas Saber TyT, Módulo de inglés.
// Clave oficial publicada
// ─────────────────────────────────────────────────────────────────────────────
const examTyT: Simulacro = {
  id: 'icfes-tyt',
  assessment: 'saber-tyt',
  year: 2018,
  grade: null,
  title: 'Cuadernillo Oficial Saber TyT · Módulo Inglés',
  source: 'ICFES, 2018. Cuadernillo de preguntas Saber TyT, Módulo de inglés.',
  timeMinutes: 60,
  totalQuestions: 25,
  partRanges: [
    { part: 1, from: 1, to: 5 }, { part: 2, from: 6, to: 10 },
    { part: 5, from: 11, to: 16 }, { part: 7, from: 17, to: 25 },
  ],

  passages: [
    {
      id: 'ptyt-hawking',
      title: 'What a Story! — Stephen Hawking',
      text: `Stephen William Hawking, a well-known scientist from Oxford, studied physics at Oxford University. When he was 21 and was doing studies on the universe at Cambridge University, the doctors found he had a neuro motor problem. Later, his problem got worse but he wanted to finish his studies. He thought he was going to live only a few months because most people like him only live for 18 months after diagnosis. In 1985, he had an operation and lost his ability to speak. At first, he could talk by spelling words moving his eyes when someone showed him a letter. Then, he was able to choose words from a computer screen with a switch.

In 1998, his first book, which was about the universe, was very popular, but many people did not finish it because it was difficult to understand. In 2005, he wrote a simple version called A Brief History of Time.

"Before I got ill, my life was boring," he said. But then he had dreams about giving something good to the world, so he began to improve his work and now we can understand the universe better. He said his success came from the help of his wife and children, other people, and government organizations. Hawking worked as a Lucasian Professor of mathematics at the University of Cambridge, a job that Newton also had had in 1663.`,
    },
    {
      id: 'ptyt-bigmac',
      title: 'Big Mac Attack',
      isGap: true,
      text: `David Gorske, 57, has eaten his 25,000th Big Mac. It's been 39 years since he first ate a burger. At the age of 19 he had [17] eaten his first 1,000 burgers and he really liked them. He thought: "How [18] will I be before I reach 10,000?" During a celebration that some friends [19] in his name, he said he would [20] to eat burgers until he died.

Mr. Gorske [21] he can eat a burger in 16 bites and registers the food he eats on calendars. He appeared in the 2004 documentary film "Super Size Me", [22] looks at the effects of eating McDonald's food daily.

Every week, he goes to the restaurant and [23] six burgers on Monday and eight on Thursday and keeps them frozen in his [24] until he is ready to eat. Doctors noted that they do not recommend Mr. Gorske's [25].`,
    },
  ],

  questions: [
    // ── PARTE 1 — Vocabulario: Entertainment (Q1–5) ──────────────────────────
    { n:1, type:'vocab',
      vocabWords:['CD','comics','DVD','films','map','messages','ticket'],
      stem:'You use this to watch videos or movies.',
      options:['CD','comics','DVD','films','map','messages','ticket'], answer:2 },
    { n:2, type:'vocab',
      vocabWords:['CD','comics','DVD','films','map','messages','ticket'],
      stem:'You can read exciting stories that have many drawings on their pages.',
      options:['CD','comics','DVD','films','map','messages','ticket'], answer:1 },
    { n:3, type:'vocab',
      vocabWords:['CD','comics','DVD','films','map','messages','ticket'],
      stem:'People go to the cinema to see one of these.',
      options:['CD','comics','DVD','films','map','messages','ticket'], answer:3 },
    { n:4, type:'vocab',
      vocabWords:['CD','comics','DVD','films','map','messages','ticket'],
      stem:'People use it to find an address.',
      options:['CD','comics','DVD','films','map','messages','ticket'], answer:4 },
    { n:5, type:'vocab',
      vocabWords:['CD','comics','DVD','films','map','messages','ticket'],
      stem:'People need this to go inside some places.',
      options:['CD','comics','DVD','films','map','messages','ticket'], answer:6 },

    // ── PARTE 2 — Avisos (Q6–10) ─────────────────────────────────────────────
    { n:6, type:'notice',
      stem:'¿Dónde puede ver este aviso?',
      options:['at a zoo','at a garden','at a beach'], answer:1 },
    { n:7, type:'notice',
      stem:'¿Dónde puede ver este aviso?',
      options:['by a soccer field','in a cinema','at a playground'], answer:2 },
    { n:8, type:'notice',
      stem:'¿Dónde puede ver este aviso?',
      options:['at a lake','in a pool','on a field'], answer:0 },
    { n:9, type:'notice',
      stem:'¿Dónde puede ver este aviso?',
      options:['in a classroom','in a library','in a bookstore'], answer:2 },
    { n:10, type:'notice',
      stem:'¿Dónde puede ver este aviso?',
      options:['in a sports center','in a bus station','in a shopping center'], answer:0 },

    // ── PARTE 5 — Lectura: Stephen Hawking (Q11–16) ──────────────────────────
    { n:11, type:'reading', passageId:'ptyt-hawking',
      stem:'After his 21st birthday, he believed he was going to',
      options:['die soon.','study more.','discover new things.'], answer:0 },
    { n:12, type:'reading', passageId:'ptyt-hawking',
      stem:'Before he died, he could talk using',
      options:['his face.','a machine.','some letters.'], answer:1 },
    { n:13, type:'reading', passageId:'ptyt-hawking',
      stem:'His second book was',
      options:['easier to read.','for famous people.','very advanced.'], answer:0 },
    { n:14, type:'reading', passageId:'ptyt-hawking',
      stem:'When did he start needing help to communicate?',
      options:['in 1985','in 1988','in 2005'], answer:0 },
    { n:15, type:'reading', passageId:'ptyt-hawking',
      stem:'Being sick, he decided to',
      options:['help the planet.','be interesting.','get better at numbers.'], answer:0 },
    { n:16, type:'reading', passageId:'ptyt-hawking',
      stem:'Hawking thought his dreams had come true thanks to his',
      options:['professors.','family.','company.'], answer:1 },

    // ── PARTE 7 — Gap-fill: Big Mac Attack (Q17–25) ──────────────────────────
    { n:17, type:'gap', passageId:'ptyt-bigmac',
      stem:'At the age of 19 he had ___ eaten his first 1,000 burgers.',
      options:['never','already','yet','again'], answer:1 },
    { n:18, type:'gap', passageId:'ptyt-bigmac',
      stem:'"How ___ will I be before I reach 10,000?"',
      options:['far','old','much','often'], answer:1 },
    { n:19, type:'gap', passageId:'ptyt-bigmac',
      stem:'During a celebration that some friends ___ in his name...',
      options:['designed','conducted','composed','organized'], answer:3 },
    { n:20, type:'gap', passageId:'ptyt-bigmac',
      stem:'He said he would ___ to eat burgers until he died.',
      options:['start','develop','continue','think'], answer:2 },
    { n:21, type:'gap', passageId:'ptyt-bigmac',
      stem:'Mr. Gorske ___ he can eat a burger in 16 bites.',
      options:['says','talks','speaks','asks'], answer:0 },
    { n:22, type:'gap', passageId:'ptyt-bigmac',
      stem:'He appeared in the documentary film "Super Size Me", ___ looks at the effects of eating McDonald\'s food daily.',
      options:['where','when','who','which'], answer:3 },
    { n:23, type:'gap', passageId:'ptyt-bigmac',
      stem:'Every week, he goes to the restaurant and ___ six burgers on Monday.',
      options:['spends','buys','carries','uses'], answer:1 },
    { n:24, type:'gap', passageId:'ptyt-bigmac',
      stem:'Keeps them frozen in his ___ until he is ready to eat.',
      options:['cupboard','oven','cabinet','fridge'], answer:3 },
    { n:25, type:'gap', passageId:'ptyt-bigmac',
      stem:'Doctors noted that they do not recommend Mr. Gorske\'s ___.',
      options:['dinner','snack','diet','supper'], answer:2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────────────────────
export const SIMULACROS: Simulacro[] = [
  exam2023, exam2022, exam2019ex1,
  exam2021ex1, exam2021ex2, exam2016,
  exam2012, exam2022g10, exam2022g9, examTyT,
];

export function getSimulacro(id: string): Simulacro | undefined {
  return SIMULACROS.find(s => s.id === id);
}

export function getSimulacroQuestionPart(simulacro: Simulacro, questionNumber: number): 1 | 2 | 3 | 4 | 5 | 6 | 7 {
  const range = simulacro.partRanges.find(({ from, to }) => questionNumber >= from && questionNumber <= to);
  if (!range) throw new Error(`Pregunta ${questionNumber} sin parte oficial explícita en ${simulacro.id}`);
  return range.part;
}
