// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 — Simulacros oficiales (exámenes reales ICFES)
// Fuente: Cuadernillos de preguntas publicados por ICFES Colombia
// ─────────────────────────────────────────────────────────────────────────────

export type QType = 'vocab' | 'notice' | 'dialog' | 'gap' | 'reading';

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
  year: number;
  grade: 9 | 10 | 11;
  title: string;
  source: string;
  timeMinutes: number;
  totalQuestions: number;
  passages: SimulacroPassage[];
  questions: SimulacroQuestion[];
}

// ─────────────────────────────────────────────────────────────────────────────
// SIMULACRO 1 — ICFES Saber 11 · Inglés · Grado 11 · 2023
// ─────────────────────────────────────────────────────────────────────────────
const exam2023: Simulacro = {
  id: 'icfes-2023-g11',
  year: 2023,
  grade: 11,
  title: 'Cuadernillo Oficial 2023 — Grado 11',
  source: 'ICFES, 2023. Cuadernillo 1, Grado 11.',
  timeMinutes: 60,
  totalQuestions: 25,

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
  year: 2022,
  grade: 11,
  title: 'Cuadernillo Oficial 2022 — Grado 11',
  source: 'ICFES, 2022. Cuadernillo 1, Grado 11.',
  timeMinutes: 60,
  totalQuestions: 25,

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
  year: 2019,
  grade: 11,
  title: 'Cuadernillo Oficial 2019 — Examen 1',
  source: 'ICFES, 2018–2019. Cuadernillo de preguntas Saber 11°. Examen 1.',
  timeMinutes: 60,
  totalQuestions: 25,

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
// Export
// ─────────────────────────────────────────────────────────────────────────────
export const SIMULACROS: Simulacro[] = [exam2023, exam2022, exam2019ex1];

export function getSimulacro(id: string): Simulacro | undefined {
  return SIMULACROS.find(s => s.id === id);
}
