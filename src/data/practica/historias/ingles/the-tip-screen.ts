// ─── The Tip Screen — Historia B2 en inglés, TRES voces ───────────────────────
//
// Primera historia con tres ángulos en vez de dos. El formato mejora: con dos
// versiones el alumno puede escaparse repartiendo la culpa a medias; con tres,
// esa salida deja de funcionar.
//
// SOBRE LAS FUENTES. El tema sale de dos documentos internos de WeLearn: la
// lectura «Tipping culture» (propia) y una adaptación de la columna de ética del
// New York Times usada en clase. De la segunda NO se reutiliza texto: es material
// ajeno y esta página es pública. Se usó solo para calibrar qué argumentos
// existen de verdad en ese debate y qué léxico los acompaña. Todo lo que se lee
// aquí —escena, personajes, frases— es original.
//
// EL DISEÑO. Un solo hecho objetivo: la tablet giró mostrando 18/22/25 % y Dana
// pulsó «No tip». Lo que está en disputa es qué dijo en voz alta al hacerlo, y
// cada uno de los tres lo oyó distinto. Los tres tienen un caso legítimo:
//   · Dana no es tacaña —deja el veinte por ciento en restaurantes—, pero le
//     pusieron a decidir en público, delante de su hija y de la cola.
//   · Marcus gana once dólares la hora y no eligió esa tablet.
//   · Ray no puso los porcentajes (vienen por defecto en el datáfono) y el margen
//     del helado es el que es; pero también podría pagar más y lo sabe.
//
// AUDIO: /audio/historias/ingles/the-tip-screen/{a,b,c}.mp3
// a mujer (Dana, treintaytantos) · b hombre joven (Marcus) · c hombre mayor (Ray).

import type { Historia, StoryQuestion as Question } from '../types';

const DICT: Record<string, string> = {
  // La escena
  scoop: 'bola de helado / servir con cuchara',
  scooping: 'servir helado con la cuchara',
  scoops: 'bolas (de helado)',
  cone: 'cono / cucurucho',
  cones: 'conos',
  counter: 'mostrador',
  tablet: 'tablet / pantalla del datáfono',
  screen: 'pantalla',
  reader: 'lector (de tarjetas)',
  register: 'caja registradora',
  receipt: 'recibo',
  line: 'la fila / la cola',
  queue: 'cola / fila',
  shift: 'turno de trabajo',
  parlour: 'heladería',
  parlor: 'heladería',

  // Propinas
  tip: 'propina / dejar propina',
  tips: 'propinas',
  tipping: 'dejar propina (la costumbre)',
  tipped: 'dejó propina',
  gratuity: 'propina (palabra formal, la de los recibos)',
  jar: 'tarro (el de las propinas)',
  percent: 'por ciento',
  percentage: 'porcentaje',
  preset: 'preestablecido / puesto por defecto',
  presets: 'opciones que ya vienen puestas',
  default: 'valor por defecto',
  defaults: 'valores por defecto',
  prompt: 'aviso que te pide algo en pantalla',
  suggested: 'sugerido',
  optional: 'opcional',
  mandatory: 'obligatorio',

  // Dinero y trabajo
  wage: 'sueldo por hora',
  wages: 'sueldos',
  minimum: 'mínimo',
  living: 'digno (living wage: sueldo del que se puede vivir)',
  paycheck: 'nómina / paga',
  hourly: 'por hora',
  margin: 'margen (lo que queda tras los costes)',
  margins: 'márgenes',
  overhead: 'gastos fijos del negocio',
  rent: 'alquiler',
  supplier: 'proveedor',
  profit: 'beneficio / ganancia',
  raise: 'subida de sueldo',
  afford: 'poder permitirse',
  pocket: 'bolsillo (out of pocket: de su propio dinero)',

  // Lo emocional
  awkward: 'incómodo / violento',
  uncomfortable: 'incómodo',
  guilt: 'culpa',
  guilty: 'culpable',
  judged: 'juzgado/a',
  judging: 'juzgando',
  cornered: 'acorralado/a',
  pressure: 'presión',
  pressured: 'presionado/a',
  entitled: 'que se cree con derecho a todo',
  entitlement: 'sentirse con derecho a algo',
  cheap: 'tacaño/a (dicho de una persona)',
  stingy: 'agarrado/a / tacaño/a',
  humiliating: 'humillante',
  disrespect: 'falta de respeto',
  disrespectful: 'irrespetuoso/a',
  defensive: 'a la defensiva',
  muttered: 'murmuró / dijo entre dientes',
  mutter: 'murmurar',
  loud: 'alto / en voz alta',
  loudly: 'en voz alta',
  snapped: 'contestó de mala manera',
  overheard: 'oyó sin querer',
  review: 'reseña / valoración',
  reviews: 'reseñas',
  rating: 'puntuación',

  // Argumentación
  assume: 'dar por hecho / suponer',
  assumed: 'dio por hecho',
  assumption: 'suposición',
  deserve: 'merecer',
  deserves: 'merece',
  fair: 'justo/a',
  unfair: 'injusto/a',
  fairness: 'justicia / equidad',
  reasonable: 'razonable',
  intention: 'intención',
  perception: 'percepción',
  version: 'versión',
  account: 'versión / relato de los hechos',
  contested: 'en disputa',
  rhetorical: 'retórico/a',
  sarcasm: 'sarcasmo',
  sarcastic: 'sarcástico/a',
  irony: 'ironía',
  literally: 'literalmente',
  honestly: 'honestamente / la verdad',
  apparently: 'aparentemente / por lo visto',
  genuinely: 'de verdad / genuinamente',
  actually: 'en realidad',
  supposed: 'se supone que',
  whatever: 'lo que sea / da igual',
  anyway: 'de todos modos',
};

// ─── Textos ───────────────────────────────────────────────────────────────────

const NARRATOR_PARAGRAPHS = [
  'Scoop and Company is a small ice cream shop on a busy street, the kind with six flavours in the case and a hand-written sign in the window. Four employees, one card reader on the counter, and a queue that goes out of the door on a warm Saturday.',
  'It has been open eleven years. The owner, Ray, bought it from the man who opened it, kept the name, and repainted the sign himself.',
  'In March the shop changed to a new card system. A sales representative came, installed it, showed Ray which button meant refund, and left. The tipping options came switched on, already set at eighteen, twenty-two and twenty-five percent. Ray noticed them that first week.',
  'Last Saturday afternoon a woman named Dana came in with her seven-year-old daughter. Two cones, one strawberry and one with sprinkles. The total came to fourteen dollars.',
  'Marcus, who is nineteen and had been on since eleven that morning, made the cones, handed them over, and turned the tablet around so she could pay. He turns it around perhaps four hundred times in a shift, and he was already reaching for the scoop when he did it.',
  'The screen would not take the payment until she answered it. Three large buttons: eighteen percent, twenty-two percent, twenty-five percent. Underneath, in smaller grey letters, "No tip."',
  'There were two people in the line behind her. Her daughter was holding both cones.',
  'Dana pressed "No tip."',
  'She said something while she did it. All three accounts of that afternoon agree that she said something, and no two of them agree on what it was.',
  'Marcus said something back. Nobody agrees on that either, although Marcus and Dana do agree on one detail: it was the tone, not the words.',
  'Dana walked out past the line. Her daughter asked her a question on the pavement, which Dana remembers exactly and which nobody else heard.',
  'That evening Dana left a one-star review. The next morning Ray read it on his phone before he had finished his coffee, and by nine o\'clock he had called Marcus into the back room.',
  'Three people now tell three different versions of ninety seconds at a counter. Only one of them was not there.',
];

const A_PARAGRAPHS = [
  'Okay, so I need to tell somebody this, because Mark thinks I overreacted and I do not think I did.',
  'We went for ice cream on Saturday. Me and Lucy. Two cones. Fourteen dollars.',
  'Fourteen. For two cones.',
  'Fine. That is the city, whatever.',
  'So I go to pay, and the kid behind the counter spins the tablet around to face me.',
  'And there it is. Eighteen percent. Twenty-two. Twenty-five.',
  'Twenty-five percent. For handing me a cone.',
  'And the "no tip" button is down at the bottom, in grey, in tiny letters, like it is embarrassed to exist.',
  'So now I am standing there with my daughter next to me and two people behind me in line, and I have to decide, in public, how generous I am.',
  'And I want to be clear about something, because I know how this sounds.',
  'I tip. I tip twenty percent at restaurants. I tip the delivery guy in cash. When somebody actually serves me, I pay for it, happily.',
  'But this was a counter. He took two cones out of a case and gave them to me. That took about forty seconds.',
  'So I pressed no tip. And yes, I said something.',
  'I said, quietly, to myself, something like "we are not doing this today."',
  'I was not talking to him. I was talking to the screen.',
  'And he heard it as something else, apparently, because he made a face and said something back that I did not catch fully, but the tone was very clear.',
  'And then I had to walk out past the line with my kid asking me why the man was upset.',
  'That is the part I keep thinking about.',
  'The money was never the issue. Fourteen dollars, twenty dollars, whatever, I do not care.',
  'It is that the machine put me on trial in front of my daughter, and then a nineteen-year-old decided I was the villain for pressing the honest button.',
  'If they want more money for the ice cream, put it on the price. I will pay it and I will never know.',
  'Do not build a machine that makes me look like a bad person for saying no.',
];

const B_PARAGRAPHS = [
  'Bro, I got written up. For a review. I need to tell you what actually happened.',
  'Saturday, busy afternoon, line out to the door.',
  'Lady comes in with her kid, orders two cones, I make them, I turn the tablet around. Same as I do four hundred times a shift.',
  'I do not even look at the screen when I turn it. I am already cleaning the scoop.',
  'I did not set those numbers. I want to say that first. Eighteen, twenty-two, twenty-five, that is whatever Ray set up with the card company. Nobody asked me.',
  'And honestly? I think the presets are too high. I do. Twenty-five percent on a cone is crazy.',
  'So she presses no tip. Cool. People press no tip all day. I genuinely do not track it.',
  'But she said something.',
  'And she says she said it to herself, and maybe she did, I do not know what is in her head.',
  'What I heard, standing three feet away, was "I am not tipping someone for scooping ice cream."',
  'And the guy behind her heard it too, because he did that thing where he looked at the floor.',
  'And look. I make eleven dollars an hour. Tips are maybe sixty, seventy a week. That is my phone and my bus.',
  'So that is not nothing.',
  'But that is not even what got me.',
  'What got me was "for scooping ice cream." Like the job is not a job. Like I am not standing here.',
  'And I said, and I am not proud of the tone, I said "have a good one" but I said it like that.',
  'That is it. That is the whole crime.',
  'And now Ray is telling me I cost him a one-star review and that the customer is always right.',
  'Ray, you set the tablet to twenty-five percent. I did not do that.',
  'You built the thing that makes people angry and then you got angry at me for standing in front of it.',
  'I am not saying she is a monster. She probably had a normal day and a machine ruined it.',
  'I am saying I am the only one in that story who does not get to choose anything.',
];

const C_PARAGRAPHS = [
  'Listen, before you hear about this from somebody else, let me tell you my side, because I am not sleeping great about it.',
  'We got a one-star review on Saturday. First one this year.',
  'Woman came in, bought two cones, did not tip, and says my employee was rude to her about it.',
  'And my first reaction, honestly, was to be angry at Marcus. I called him in and I was short with him.',
  'I have had two days to think about it and I think I was angry at the wrong person.',
  'Here is the thing nobody in that story knows.',
  'I did not choose those percentages.',
  'When we switched to the new card system in March, the sales guy set it up, and the defaults came out of the box at eighteen, twenty-two and twenty-five.',
  'I noticed. I remember thinking, that is high for a place like this.',
  'And I did not change it.',
  'And I need to be honest about why I did not change it, because it was not laziness.',
  'Tips went up. About forty dollars a week per person. And that forty dollars is money I am not paying out of my own pocket.',
  'So let us call it what it is. I let a machine ask my customers for the raise that I should be giving my staff myself.',
  'Now, I am not made of money either. The margin on a cone is about a dollar ten after milk, cups, rent and power. That is real.',
  'If I put a dollar an hour on four people, that is close to eight thousand a year, and I do not have eight thousand sitting there.',
  'But I could have raised the cone by fifty cents. Nobody would have left over fifty cents.',
  'Instead I let the screen do it, and the screen does not just ask. It asks in front of the line, with the kid watching, with the grey little "no" button.',
  'And then a nineteen-year-old who makes eleven dollars an hour stands there and takes the reaction.',
  'And I wrote him up for it.',
  'I am going to fix the tablet this week. Ten, fifteen, twenty, and the no-tip button the same size as the rest.',
  'The wage thing is harder and I am not going to pretend I have solved it.',
  'But I keep coming back to one thing.',
  'She said the machine made her feel like a bad person.',
  'It is my machine.',
];

// ─── Preguntas ────────────────────────────────────────────────────────────────

const NARRATOR_QS: Question[] = [
  {
    type: 'Comprehension',
    q: 'According to the narrator, what is the ONE thing all three accounts agree on?',
    opts: [
      'What Dana said out loud, which all three of them quote using almost the same words',
      'That the tablet was turned around showing three preset percentages, and Dana pressed "No tip"',
      'That Marcus was rude to her, a point both Dana and Ray name as the trigger',
      'That fourteen dollars for two cones is too much, which all three of them say plainly',
    ],
    correct: 1,
    explanation:
      'The narrator is careful: the screen, the presets and the "No tip" press are reported as fact. The two sentences that follow — "she said something", "he said something back" — are immediately followed by "nobody agrees on what". That is the line between fact and interpretation.',
  },
  {
    type: 'Vocabulary',
    q: 'The narrator says the "No tip" option was in "smaller grey letters" underneath the three percentages. Why does this detail matter?',
    opts: [
      'It shows the card reader was faulty and drew part of the interface at the wrong size',
      'It shows the shop was hiding the real total from customers until after they had paid',
      'The design makes refusing look like the small, shameful option — the layout itself applies pressure',
      'It proves the shop broke a law about how payment options have to be displayed on screen',
    ],
    correct: 2,
    explanation:
      'Nothing on that screen is neutral. Three big buttons versus one small grey one is a design that pushes. Dana names it later ("like it is embarrassed to exist") and Ray admits it at the end.',
  },
  {
    type: 'Inference',
    q: 'The narrator ends with "three different versions of ninety seconds at a counter." What does the phrase "ninety seconds" do?',
    opts: [
      'It tells us the shop was about to close, so everyone at the counter was in a hurry',
      'It contrasts how small the event was with how much meaning three people built on top of it',
      'It proves Marcus was working too slowly and had kept the whole line waiting behind Dana',
      'It is the exact time the card payment needed to process on the tablet that afternoon',
    ],
    correct: 1,
    explanation:
      'The whole conflict rests on a minute and a half. Putting the number there invites you to notice that the size of the argument has almost nothing to do with the size of the event.',
  },
  {
    type: 'Critical Thinking',
    q: 'The narrator mentions Ray read the review "before he had finished his coffee." What does this small detail suggest?',
    opts: [
      'Ray drinks a great deal of coffee in the mornings, which is the reason he tends to react badly to his own staff',
      'Ray was reacting early, fast and alone — before he had heard anyone, and before he was properly awake',
      'The review was written by Ray himself, which is how he could quote it so exactly',
      'The shop opens very early, so the morning shift begins before most of the city wakes',
    ],
    correct: 1,
    explanation:
      'It sets up Ray\'s own confession later: his first move was to be angry at Marcus. A detail about coffee is doing quiet work — it tells you the decision was made in the worst possible conditions.',
  },
];

const A_QS: Question[] = [
  {
    type: 'Comprehension',
    q: 'Dana insists on one point about herself before telling the rest. What is it?',
    opts: [
      'That she worked behind a counter like this one for years, so she knows exactly how the job feels from the other side',
      'That money is genuinely tight this month, so fourteen dollars was already more than she had meant to spend on an afternoon out',
      'That she does tip — twenty percent at restaurants, cash to delivery drivers — so this is not about being cheap',
      'That she almost never buys ice cream any more, so she had no idea what two cones are supposed to cost these days',
    ],
    correct: 2,
    explanation:
      'She stops her own story to say it: "I know how this sounds." She is defending herself against a charge nobody has made yet, which tells you what she is most afraid of being called.',
  },
  {
    type: 'Vocabulary',
    q: '"The no tip button is down at the bottom, in grey, in tiny letters, like it is embarrassed to exist." What is Dana doing here?',
    opts: [
      'Personification — she gives the button a human feeling to expose how the design shames the user',
      'A literal description of a software error that rendered the button smaller than intended',
      'Hyperbole about the physical size of the text, and nothing more than a complaint about eyesight',
      'A direct quotation from the card company manual describing how the button should look',
    ],
    correct: 0,
    explanation:
      'Buttons cannot feel embarrassed. By lending it that feeling she moves the shame from herself onto the design — which is exactly the argument she is making.',
  },
  {
    type: 'Tone',
    q: 'How would you best describe the tone of Dana\'s voice note?',
    opts: [
      'Calm and neutral throughout, as if reporting something that happened to somebody else',
      'Amused and light-hearted, treating the whole thing as a funny story for a dinner party',
      'Defensive and self-justifying, but landing on a clear argument rather than pure complaint',
      'Cold and formal from beginning to end, closer to a written complaint than to a message',
    ],
    correct: 2,
    explanation:
      'She opens defending herself against her own husband\'s verdict ("Mark thinks I overreacted"), keeps justifying, and then arrives somewhere real: put it in the price. The defensiveness is the route, not the destination.',
  },
  {
    type: 'Inference',
    q: 'Dana says the machine "put me on trial in front of my daughter." What does this reveal about what actually upset her?',
    opts: [
      'She was genuinely worried that refusing to tip might carry some kind of legal consequence',
      'Her daughter had been asking for more ice cream and she had to refuse her in public',
      'The cost was never the problem — being made to perform her generosity publicly was',
      'She thought the shop was going to call the police over the fourteen dollars she owed',
    ],
    correct: 2,
    explanation:
      'She says it directly two lines earlier: "the money was never the issue." The courtroom image tells you what replaced it — being judged, in public, with a witness who matters to her.',
  },
  {
    type: 'Critical Thinking',
    q: '"If they want more money for the ice cream, put it on the price. I will pay it and I will never know." What is the weakness a critic could point out in this argument?',
    opts: [
      'It is not really an argument at all, only an opinion that she states firmly without offering a single supporting reason for any part of it',
      'It contradicts her earlier claim, because she had already told us that she tips twenty percent whenever she is served',
      'It works for her comfort but says nothing about who receives the money — a higher price goes to the shop, not automatically to the worker',
      'It would be illegal, because shops are not allowed to change their advertised prices without warning their customers first',
    ],
    correct: 2,
    explanation:
      'Her solution solves the awkwardness beautifully and the wage question not at all. Ray later completes the thought she leaves unfinished: the fifty cents would have to actually reach Marcus, and that is a decision only Ray can make.',
  },
];

const B_QS: Question[] = [
  {
    type: 'Comprehension',
    q: 'What does Marcus say about the three percentages on the screen?',
    opts: [
      'He chose those percentages himself, hoping the higher presets would earn him more each week',
      'He did not set them, and he personally thinks they are too high',
      'He has never noticed the presets at all, because he never looks at the customer side',
      'He asks every customer to pick the highest one, which is why Dana felt so pressured',
    ],
    correct: 1,
    explanation:
      'He puts it first, before anything else: "I did not set those numbers. I want to say that first." And then he goes further and agrees with Dana that twenty-five percent on a cone is unreasonable — which is why he is not simply her opponent.',
  },
  {
    type: 'Inference',
    q: 'Marcus reports that the man behind Dana "did that thing where he looked at the floor." Why does he include this?',
    opts: [
      'To show that the shop floor badly needed cleaning, which happens to be one of the jobs he is expected to do during a busy afternoon shift',
      'To prove that the other customer agreed with Dana and also thought the preset percentages were completely unreasonable',
      'As a witness detail: someone else reacted, so the words were audible — it is his evidence that she was not only talking to herself',
      'To explain why the line behind her was moving so slowly on what was already a very busy Saturday afternoon',
    ],
    correct: 2,
    explanation:
      'It is the closest thing to proof in the whole story. He cannot replay what she said, so he offers the reaction of a third person as evidence that it was heard.',
  },
  {
    type: 'Vocabulary',
    q: '"What got me was \'for scooping ice cream.\' Like the job is not a job." What is Marcus objecting to?',
    opts: [
      'The amount of money he lost on that sale, which he says adds up over a week',
      'Being told he scoops ice cream, which is factually wrong',
      'The implication that his work does not count as work deserving of anything',
      'That she used the wrong verb, since what he does is not technically called scooping',
    ],
    correct: 2,
    explanation:
      'He separates the money from the insult, exactly as Dana separated the money from the humiliation. Both of them are saying the same sentence about different wounds: it was never about the fourteen dollars.',
  },
  {
    type: 'Tone',
    q: '"I said \'have a good one\' but I said it like that." What is Marcus admitting?',
    opts: [
      'That he said nothing at all to her, and that Dana simply invented the reply she now remembers hearing',
      'That his words were polite but his tone was not — and he knows the tone was the message',
      'That he shouted at her across the counter, loudly enough for everyone waiting in the line to hear it',
      'That he genuinely cannot remember what he said to her, because the shift was long and the shop was full',
    ],
    correct: 1,
    explanation:
      'This is an unusually honest moment. He does not hide behind the literal words, which were faultless. "I am not proud of the tone" is the admission — and it explains why Dana heard rudeness in a friendly phrase.',
  },
  {
    type: 'Critical Thinking',
    q: '"I am the only one in that story who does not get to choose anything." Is this claim fair?',
    opts: [
      'Completely fair: he had no choice about the wage, the screen, the presets or anything else that afternoon',
      'Completely unfair: he had exactly the same range of choices available to him as the other two people standing in that story',
      'Largely fair about the system, but he did choose his tone, which is the one thing that turned a non-tip into a review',
      'It cannot be judged at all without knowing exactly how much he earns in tips over a normal week',
    ],
    correct: 2,
    explanation:
      'He is right that he set neither the wage nor the screen. But he chose the one action that escalated it, and he has already admitted so himself. Both things are true at once, which is what makes him the most reliable narrator of the three.',
  },
];

const C_QS: Question[] = [
  {
    type: 'Comprehension',
    q: 'Why does Ray say he did not change the preset percentages when he noticed they were high?',
    opts: [
      'He did not know how to change them, because the card company keeps control of those settings after installation',
      'The card company would not have allowed him to change the presets once the new system was installed',
      'Because tips went up about forty dollars a week per person — money he did not have to pay himself',
      'He thought his own customers preferred being offered the higher options, and that they would have said so otherwise',
    ],
    correct: 2,
    explanation:
      'He refuses the easy excuse: "it was not laziness." Then he says the uncomfortable thing out loud. That refusal to take the comfortable explanation is what makes his account the turning point of the exercise.',
  },
  {
    type: 'Vocabulary',
    q: '"I let a machine ask my customers for the raise that I should be giving my staff myself." What does this sentence do?',
    opts: [
      'It blames the card company for everything and quietly takes the whole decision out of his own hands',
      'It names his own responsibility precisely, using the word "raise" to admit it was a wage problem all along',
      'It announces that he is closing the shop rather than face the wage problem he has just described',
      'It is sarcasm aimed at Dana for leaving a one-star review over a fourteen dollar sale',
    ],
    correct: 1,
    explanation:
      'Calling it a "raise" is the key. A tip is a gift from a customer; a raise is an obligation of an employer. By using the second word for the first thing, he admits what the screen was really doing.',
  },
  {
    type: 'Inference',
    q: 'Ray gives real numbers: a dollar ten margin per cone, eight thousand a year for a dollar an hour. What is the effect of these numbers?',
    opts: [
      'They prove beyond doubt that he cannot afford to pay any more, which ends the argument there',
      'They make his constraint concrete and credible — but he immediately undercuts himself with the fifty cents, so they explain rather than excuse',
      'They show that he is rather bad at mathematics, since almost none of the numbers he quotes in that section actually add up',
      'They are there to bury the listener in detail so that the wage question quietly gets forgotten',
    ],
    correct: 1,
    explanation:
      'Notice the order. The numbers arrive as a defence, and the very next line dismantles it: "But I could have raised the cone by fifty cents." He builds his own excuse and then takes it apart, which is rarer than either.',
  },
  {
    type: 'Tone',
    q: 'How does Ray\'s tone change across his voice note?',
    opts: [
      'It stays angry at Dana from beginning to end, and never moves off that first reaction',
      'It starts angry at Marcus and moves towards accepting his own responsibility',
      'It is cheerful throughout, because the review did not really affect his business',
      'It becomes increasingly angry at the card company for installing the presets he kept',
    ],
    correct: 1,
    explanation:
      'Track the movement: "my first reaction was to be angry at Marcus" → "I was angry at the wrong person" → "I wrote him up for it" → "It is my machine." He is the only one of the three whose position actually changes while he speaks.',
  },
  {
    type: 'Critical Thinking',
    q: 'Ray ends with "She said the machine made her feel like a bad person. It is my machine." Why is this an effective ending?',
    opts: [
      'Because it puts the blame back on Dana for complaining about something no small shop can really control',
      'Because it promises to give the money back to her and to apologise to her face in person',
      'Because it takes her exact words and answers them with ownership, in four words, without asking to be forgiven',
      'Because it explains the technical settings in enough detail to clear him of any blame at all',
    ],
    correct: 2,
    explanation:
      'He quotes her complaint and then accepts the object of it as his. No apology is offered and none is needed — the possessive does the work. Compare it with the non-apologies elsewhere in these stories ("Excuse me for being organised").',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Synthesis',
    q: 'On the disputed point — what Dana said out loud — what do the three accounts actually give us?',
    opts: [
      'Proof that Dana lied about what she said, since the other two people both contradict her version',
      'Proof that Marcus simply invented what he thought he heard, in order to justify the tone he then decided to use with her',
      'Two incompatible reports and one piece of indirect evidence: Dana\'s intention, Marcus\'s hearing, and a stranger looking at the floor',
      'A recording from the shop camera that settles the question of what was actually said at the counter',
    ],
    correct: 2,
    explanation:
      'Nobody can settle it, and the exercise does not want you to. What she meant and what he heard can both be honest. The man looking at the floor only tells us it was audible, not what it was.',
  },
  {
    type: 'Perspective',
    q: 'Dana, Marcus and Ray all separate the money from something else. What is the pattern?',
    opts: [
      'All three of them secretly care only about the money, and each one reaches for other reasons to disguise that',
      'Each says the money was not the point: for Dana it was public judgement, for Marcus it was being told his job is not a job, for Ray it was his own responsibility',
      'Only Ray talks about money at all in his recording, because he is the only one of the three of them who actually runs a business and has to count it',
      'Each one of them wants a different amount of money out of the same fourteen dollar sale at the counter',
    ],
    correct: 1,
    explanation:
      'Three people, three sentences with the same shape: "it was not about the money." When everyone in a conflict says that, the argument is not about the thing being argued over — and that is the reading skill this story trains.',
  },
  {
    type: 'Critical Thinking',
    q: 'What is the most accurate ROOT cause of this conflict?',
    opts: [
      'Dana\'s refusal to tip, which is the single decision that set the whole ninety seconds in motion',
      'Marcus\'s tone at the counter, which is the thing that turned an ordinary routine non-tip into a public argument in front of the whole line',
      'A wage decision was moved onto a screen, so a question about pay was asked of a customer, in public, by a worker who controlled neither',
      'The price of ice cream in this city, which has risen far faster than local wages have',
    ],
    correct: 2,
    explanation:
      'Ray says it himself and it is the answer the whole story is built towards. The tone and the refusal are the sparks; the design that put a pay negotiation between two people who did not set it is the fuel.',
  },
  {
    type: 'Perspective',
    q: 'Which of the three changes their position during their own voice note?',
    opts: [
      'Dana — she decides she should have tipped',
      'Marcus — he decides the customer was right about everything',
      'Ray — he starts blaming his employee and ends holding it himself',
      'None of them changes at all: each one defends the position they arrived with',
    ],
    correct: 2,
    explanation:
      'Dana and Marcus each arrive already holding their conclusion and defend it. Ray thinks while he talks. Noticing who moves and who defends is a comprehension skill that works far beyond this story.',
  },
  {
    type: 'Critical Thinking',
    q: 'If the shop changes the screen to ten, fifteen and twenty percent with an equal-sized "No tip" button, what does that fix and what does it leave untouched?',
    opts: [
      'It fixes everything, including the wages, because lower presets mean more people tip',
      'It fixes nothing at all, since the customer would still have to make the same decision in public, in front of everyone waiting in the line',
      'It fixes the pressure on the customer, but Marcus still earns eleven dollars an hour and will now probably earn less in tips',
      'It only helps Ray, who keeps his margin while his customers feel worse about paying',
    ],
    correct: 2,
    explanation:
      'This is the sting in the tail. The humane fix for Dana takes money out of Marcus\'s week unless Ray also raises the wage — and Ray says plainly that he has not solved that. Fixing the visible problem can quietly deepen the invisible one.',
  },
];

const KEY_LANGUAGE = [
  { phrase: 'preset / default', meaning: 'lo que la máquina ya trae puesto — y que casi nadie cambia' },
  { phrase: 'living wage', meaning: 'sueldo del que se puede vivir, frente a «minimum wage», el legal' },
  { phrase: 'out of pocket', meaning: 'de tu propio dinero — la frase con la que Ray se delata' },
  { phrase: 'margin', meaning: 'lo que queda de un precio tras pagar costes' },
  { phrase: 'to get written up', meaning: 'recibir una amonestación por escrito en el trabajo' },
  { phrase: 'personification', meaning: 'dar sentimientos a una cosa («the button is embarrassed to exist»)' },
  { phrase: 'I said it like that', meaning: 'admitir que el tono, no las palabras, fue el mensaje' },
];

// ─── Historia ─────────────────────────────────────────────────────────────────

export const theTipScreen: Historia = {
  slug: 'the-tip-screen',
  lang: 'ingles',
  icon: '🍦',
  color: '#0891b2',
  level: 'B2',
  title: 'The Tip Screen',
  tagline: 'Dos conos, catorce dólares y una pantalla que pide el veinticinco por ciento delante de la fila.',
  metaTitle: 'The Tip Screen — comprensión en inglés B2',
  metaDescription:
    'Dos conos, catorce dólares y una pantalla que pide propina delante de la fila. Tres audios, transcripción y 24 preguntas en inglés B2.',
  intro:
    'Ninety seconds at an ice cream counter, told by the customer, the employee and the owner. Nobody is lying and nobody fully agrees. Read the narrator, listen to all three voice notes, and answer 24 comprehension questions on vocabulary, inference, tone and critical thinking.',
  narrator: {
    paragraphs: NARRATOR_PARAGRAPHS,
    questions: NARRATOR_QS,
    tip: 'Watch where the narrator stops reporting facts and starts reporting disagreement — the shift happens in a single short line. Everything before it is safe ground; everything after it is contested.',
  },
  voices: [
    {
      key: 'a',
      name: 'Dana',
      sex: 'female',
      role: 'the customer',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/ingles/the-tip-screen/a.mp3',
      paragraphs: A_PARAGRAPHS,
      questions: A_QS,
      listenHint: 'Listen carefully. There is no transcript yet — just focus on what you can understand.',
      transcriptHint: 'mark them and see their translation. Then write again what you understood.',
      write1Prompt: "Without looking at any transcript, write in your own words what you understood from Dana's voice note.",
      write1Hint: "Don't worry about being perfect — this is a first impression. Write in English or Spanish.",
      write2Prompt: 'Now write again what you understood — you can be more detailed this time.',
    },
    {
      key: 'b',
      name: 'Marcus',
      sex: 'male',
      role: 'the employee',
      color: '#7c3aed',
      audioSrc: '/audio/historias/ingles/the-tip-screen/b.mp3',
      paragraphs: B_PARAGRAPHS,
      questions: B_QS,
      listenHint: 'This is the other side of the counter. Listen for the one thing he says he did wrong — he says it plainly, and it is not what you might expect.',
      transcriptHint: "compare his account with Dana's. Which details match exactly? Which one word do they remember completely differently?",
      write1Prompt: "Without the transcript, write in your own words what you understood from Marcus's voice note.",
      write1Hint: 'What does he say happened? And what does he say he did not choose? Write in English or Spanish.',
      write2Prompt: "Now write again what you understood from Marcus's perspective.",
    },
    {
      key: 'c',
      name: 'Ray',
      sex: 'male',
      role: 'the owner',
      color: '#c2410c',
      audioSrc: '/audio/historias/ingles/the-tip-screen/c.mp3',
      paragraphs: C_PARAGRAPHS,
      questions: C_QS,
      listenHint: 'The third angle, and the only one who was not there. Listen for the moment he stops defending himself.',
      transcriptHint: 'he knows something the other two do not. Find the sentence where he says it.',
      write1Prompt: "Without the transcript, write in your own words what you understood from Ray's voice note.",
      write1Hint: 'He was not at the counter. So what is he actually confessing to? Write in English or Spanish.',
      write2Prompt: "Now write again what you understood from Ray's perspective.",
    },
  ],
  finalQuestions: FINAL_QS,
  finalIntro: [
    'You have now heard something none of the three has heard: all of it. Dana does not know Marcus agrees with her about the percentages. Marcus does not know Ray decided he was angry at the wrong person. Ray never heard what was actually said.',
    'These questions ask you to hold all three at once — and to notice that the fix which would make one of them happy takes money out of another one\'s week.',
  ],
  dict: DICT,
  keyLanguage: KEY_LANGUAGE,
  discussion: {
    question: 'Who should pay Marcus more — the customer, or the owner? And if your answer is the owner, why does almost every shop choose the screen instead?',
    note: 'There is no single correct answer. The skill being tested is defending your position with evidence from the three accounts — specific words, phrases and numbers. Notice that all three speakers actually agree the presets are too high; they disagree about who should carry the cost of lowering them.',
  },
  ui: 'en',
};

export default theTipScreen;
