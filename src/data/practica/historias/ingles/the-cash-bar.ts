// ─── The Cash Bar — Historia B2 en inglés, TRES voces ─────────────────────────
//
// Segunda historia de tres ángulos, y la primera en la que dos de las tres voces
// están del mismo lado y aun así no coinciden: los novios discrepan entre ellos.
// Eso cierra la salida fácil de «los novios contra la invitada».
//
// EL DISEÑO. Un solo hecho objetivo: la invitación en papel no decía nada de la
// barra y la web sí, en su tercera página. Lo que está en disputa es qué dijo
// Priya en la barra, y esa frase llegó a la novia después de pasar por tres
// bocas. Los tres tienen un caso legítimo, y —esto es lo nuevo— los tres dicen
// algo que debilita su propia posición:
//   · Priya no fue avisada por el papel, pero abrió la web esa mañana y no leyó.
//   · Nadia no tenía los cuatro mil seiscientos, pero fue ella quien quitó la
//     línea de la tarjeta, y sabe por qué la quitó.
//   · Owen quería esa línea y no insistió, y a las diez menos veinte pagó el
//     resto de la noche con una tarjeta que ya lleva la luna de miel.
//
// Buscar la frase en la que cada uno se hace daño a sí mismo es la destreza que
// entrena el ejercicio. Es la misma que sirve para leer un peritaje o un correo
// de trabajo.
//
// LONGITUD DE LAS OPCIONES. Escrita ya equilibrada. En `the-tip-screen` hubo que
// alargar sesenta y seis distractores a posteriori porque la respuesta correcta
// era la más larga en el cien por cien de las preguntas: marcar la larga sin
// leer aprobaba. Aquí las cuatro opciones se redactaron a la vez y con el mismo
// peso. El guardián lo mide.
//
// AUDIO: /audio/historias/ingles/the-cash-bar/{a,b,c}.mp3
// a mujer (Priya, la invitada) · b mujer (Nadia, la novia) · c hombre (Owen, el novio).
// Las dos voces femeninas tienen que ser CLARAMENTE distintas: hablan seguidas.

import type { Historia, StoryQuestion as Question } from '../types';

const DICT: Record<string, string> = {
  // La boda
  wedding: 'boda',
  bride: 'novia (el día de la boda)',
  groom: 'novio (el día de la boda)',
  guest: 'invitado/a',
  guests: 'invitados',
  venue: 'el sitio donde se celebra algo',
  barn: 'granero (aquí: sitio de bodas rústico)',
  reception: 'la fiesta después de la ceremonia',
  speeches: 'los discursos',
  speech: 'discurso',
  cake: 'tarta',
  toast: 'brindis',
  invitation: 'invitación',
  invitations: 'invitaciones',
  card: 'tarjeta (la de la invitación… y la de crédito)',
  typeface: 'tipo de letra',
  heading: 'encabezado / título de sección',
  website: 'página web',
  post: 'el correo postal',
  aisle: 'pasillo (el de la ceremonia)',

  // La barra
  bar: 'barra / bar',
  bartender: 'camarero de barra',
  drinks: 'bebidas',
  wine: 'vino',
  beer: 'cerveza',
  jug: 'jarra',
  glass: 'copa / vaso',
  glasses: 'copas',
  tab: 'la cuenta abierta en un bar',
  quote: 'presupuesto',
  quoted: 'presupuestó / dio precio de',
  supplier: 'proveedor',
  suppliers: 'proveedores',
  purchase: 'compra / adquirir',

  // Dinero
  afford: 'poder permitirse',
  cost: 'coste / costar',
  bill: 'la cuenta / la factura',
  budget: 'presupuesto (lo que puedes gastar)',
  cash: 'efectivo',
  charge: 'cobrar',
  charging: 'cobrando',
  settle: 'liquidar / pagar lo que se debe',
  gift: 'regalo',
  generous: 'generoso/a',
  generosity: 'generosidad',
  cheap: 'tacaño/a (dicho de una persona)',
  honeymoon: 'luna de miel',
  contribute: 'aportar / poner dinero',
  contributed: 'aportó',
  spent: 'gastó / gastado',

  // Lo emocional
  ashamed: 'avergonzado/a',
  shame: 'vergüenza',
  embarrassed: 'avergonzado/a (por algo social)',
  embarrassing: 'que da vergüenza ajena',
  awkward: 'incómodo / violento',
  humiliating: 'humillante',
  hurt: 'dolido/a / herir',
  angry: 'enfadado/a',
  anger: 'enfado / ira',
  guilt: 'culpa',
  defensive: 'a la defensiva',
  apology: 'disculpa',
  apologise: 'disculparse',
  betrayed: 'traicionado/a',
  surprised: 'sorprendido/a',
  surprise: 'sorpresa',

  // Contar lo que pasó
  version: 'versión',
  versions: 'versiones',
  account: 'versión / relato de los hechos',
  witness: 'testigo',
  overheard: 'oyó sin querer',
  repeat: 'repetir',
  repeated: 'repitió',
  telling: 'el hecho de contarlo (una vez)',
  exactly: 'exactamente',
  roughly: 'más o menos',
  contested: 'en disputa',
  assume: 'dar por hecho / suponer',
  assumed: 'dio por hecho',
  assumption: 'suposición',
  deserve: 'merecer',
  fair: 'justo/a',
  unfair: 'injusto/a',
  reasonable: 'razonable',
  intention: 'intención',
  motive: 'motivo real de una acción',
  responsibility: 'responsabilidad',
  weaken: 'debilitar',
  weakens: 'debilita',
  admit: 'admitir / reconocer',
  admits: 'reconoce',
  admitting: 'reconociendo',
  deny: 'negar',
  honestly: 'honestamente / la verdad',
  genuinely: 'de verdad / genuinamente',
  actually: 'en realidad',
  technically: 'técnicamente (a menudo: «en teoría sí, pero»)',
  apparently: 'por lo visto',
  anyway: 'de todos modos',
  whatever: 'lo que sea / da igual',
};

// ─── Textos ───────────────────────────────────────────────────────────────────

const NARRATOR_PARAGRAPHS = [
  'Nadia and Owen were married on a Saturday in June, at a barn about an hour outside the city, in front of ninety-six guests.',
  'They paid for the wedding themselves. Neither set of parents contributed anything, and not because they did not want to.',
  'The venue quoted four thousand six hundred dollars for five hours of open bar. The couple chose the other option: a bar where the guests paid for their own drinks, wine at twelve dollars and beer at eight, card or cash.',
  'Owen priced it twice, from two different suppliers, hoping the second number would come back different. It did not.',
  'Two documents told the guests about the day. The printed invitation, sent out in February, gave the time, the place, and the words "dinner and dancing to follow." It said nothing at all about the bar.',
  'The wedding website said, on its third page, under the heading "Good to know": there would be a bar serving wine and beer, available for purchase.',
  'Both documents went to all ninety-six guests. Only one of them mentioned the bar, and it was not the one that arrived through the post.',
  'Priya flew in from another city on the Friday. She and Nadia had shared a flat for three years, and she was the one who had introduced the couple, at a party neither of them had wanted to go to.',
  'She gave a card with two hundred dollars in it.',
  'At around nine o\'clock, after the speeches, Priya went to the bar and ordered two glasses of wine. The bartender told her the total came to twenty-four dollars, and asked whether she was paying by card.',
  'There were four people waiting behind her. Two of them were from her own table.',
  'Priya said something.',
  "Owen's mother was standing at the end of the bar, waiting for a jug of water. She heard it.",
  'By the time the cake was cut, three people had told Nadia. The version that reached her had grown a sentence longer with each telling.',
  'Nadia spent eleven minutes in a bathroom at her own wedding. Her sister timed it, and not on purpose.',
  'At about twenty to ten, something changed at the bar. From that moment nobody was asked to pay for a drink again.',
  'Only one person at that wedding knows why, and he has not told his wife.',
];

const A_PARAGRAPHS = [
  'Okay, I need to talk to somebody who was not there, because everybody who was there has already decided.',
  'So. Nadia got married on Saturday. The barn place, an hour out of the city. It was beautiful and she looked unbelievable.',
  'And I have not heard one word from her since, and I think I know why, so let me just tell you the whole thing.',
  'I flew in on the Friday. Hotel, dress, the flight, the taxi from the airport. Call it seven hundred dollars before I walked through the door.',
  'And I put two hundred in the card. Which, honestly, was more than I had. But it is Nadia. We shared a flat for three years.',
  'Right. So the speeches finish, everybody gets up, and I go to the bar to get one for me and one for Jess.',
  'And the guy says twenty-four dollars.',
  'And I just stood there for a second.',
  'Because it did not occur to me. It genuinely did not occur to me that there would be a bar you pay at.',
  'The invitation did not say anything. I have it here in front of me. It says the time, it says the place, it says dinner and dancing to follow. That is it.',
  'Now, before you say it. Yes. There was a website.',
  'And yes, I opened it. That morning, in the car, to get the address.',
  'And I looked at the map, and I closed it.',
  'So, fine. Technically it was there. Technically I could have known.',
  'But here is the thing I keep going back to.',
  'A wedding asks you to be a guest. A bar asks you to be a customer. And you cannot be both of those things in the same room.',
  'I had already given them everything I could give them, and then I had to take my card out at their party.',
  'And if somebody had told me, I would have brought cash and I would have told nobody. That is the whole point. It was never about the twenty-four dollars.',
  'And look. I said something at that bar. I did.',
  'I do not know exactly what it was. It was not the sentence that got back to her. I know it was not that one.',
  'But it was not nothing either, and I have been awake about it since Sunday.',
];

const B_PARAGRAPHS = [
  'I know you have to go, so just listen to this and call me back tomorrow.',
  'I found out at my own wedding that my oldest friend told a room full of people that I made her buy her own wine.',
  'Three separate people came and told me. Three. Before the cake.',
  'And each one had a slightly longer version than the last one, which I have only started thinking about since.',
  'You know what we spent. You know because you watched us do it.',
  "Twenty-eight thousand dollars, over two years. We lived in his mother's back room for eight months to do it.",
  'Nobody gave us anything. Not because they did not want to. Because they did not have it.',
  'And an open bar, five hours, ninety-six people, was four thousand six hundred dollars.',
  'Four thousand six hundred dollars so that everybody can drink for free.',
  'We did not have it. So we did not do it.',
  'And I know what you are going to ask me, so I will just say it myself.',
  'Yes. It was on the website and it was not on the card.',
  'And that was me. Owen wanted a line on the card. I said no.',
  'Because on a card, in that typeface, with the little flowers down the side, cash bar looks like an apology.',
  'You saw how many times I rewrote that card.',
  'And here is the part I have not said out loud to anybody yet.',
  'That sentence does not sound like her. It does not. Priya does not talk like that.',
  'And I believed it anyway. Immediately. I did not question it for one second.',
  'And I think I believed it because it was easier than the other thing.',
  'Which is that I was already ashamed of that bar before anybody said a word about it.',
  'And I am still angry. Both of those are true and I cannot make them fit together.',
  'I spent eleven minutes in a bathroom at my own wedding.',
];

const C_PARAGRAPHS = [
  'Right, this is going to be a long one, and I need you to not repeat any of it.',
  'The wedding was good. It was actually good. I want to say that first, because everything after this is going to sound like it was not.',
  'You heard about the thing at the bar.',
  'So. First, the invitation. I wanted a line on it. I wrote it out. There will be a bar, wine and beer, and you will need a card.',
  'One sentence. Nadia said no.',
  'And I did not push it, and I want to be honest with you about why I did not push it.',
  'She rewrote that card nine times. Nine. She was not allowed to want anything at that wedding, every single thing was a number, and that card was the one thing that was hers.',
  'So I let it go. That was my decision as much as it was hers.',
  'Now. The sentence. My mother is the one who heard it.',
  'And I asked her on Sunday what Priya said, and she told me.',
  'And I asked her again on Tuesday, because I was writing something down, and she told me again.',
  'And it was not the same sentence.',
  'It was close. But it was not the same. A word here, a word there.',
  'And I have not told Nadia that, because Nadia has built her entire week on that sentence.',
  'And now the part I really need you to keep to yourself.',
  'At about twenty to ten I went and found the bar manager, and I put the rest of the night on my card.',
  'Eight hundred and sixty dollars.',
  'Nadia does not know. She thinks the bar just stopped charging. She thinks the venue did it as a gift.',
  'And it is on the card that already has the honeymoon on it.',
  'And I have been sitting with this all week, and here is where I have got to.',
  'We did not hide it because we were cheap. We hid it because we were embarrassed.',
  'And people do not get angry about a cash bar. They get angry about being surprised.',
  'So the eight hundred and sixty dollars did not fix anything.',
  'It moved the bill from ninety-six people onto us, one day too late.',
  'That is not generosity. That is me paying so that I do not have to hear about it any more.',
];

// ─── Preguntas ────────────────────────────────────────────────────────────────

const NARRATOR_QS: Question[] = [
  {
    type: 'Comprehension',
    q: 'What did the two documents sent to the guests say about the bar?',
    opts: [
      'The printed card said nothing about it, while the website mentioned it on its third page',
      'Both the printed card and the website stated clearly that guests would be paying for their drinks',
      'The printed card listed the prices in full, and the website then repeated the same information',
      'Neither the printed card nor the website mentioned the bar at any point, in any form at all',
    ],
    correct: 0,
    explanation:
      'The narrator sets the two documents side by side on purpose, and then adds the line that matters: only one of them mentioned the bar, and it was not the one that arrived through the post. Everything else in the story grows out of that gap.',
  },
  {
    type: 'Inference',
    q: '"The version that reached her had grown a sentence longer with each telling." What does this tell us?',
    opts: [
      'Three separate guests had each heard a different part of one long conversation at the bar',
      'The story was changing as it was passed on, so what Nadia heard was not what was said',
      'Priya kept repeating her complaint to more and more people as the evening went on',
      'The bartender wrote the words down at the time and read them aloud to everybody who asked',
    ],
    correct: 1,
    explanation:
      'The narrator does not say the tellers were lying. Stories grow when they are repeated, and this one grew twice before it arrived. That is the reason no version of the sentence can be treated as the record.',
  },
  {
    type: 'Critical Thinking',
    q: 'The narrator says the parents contributed nothing, "and not because they did not want to." Why add the second half?',
    opts: [
      'It shows that the parents were the real cause of everything that went wrong that day',
      'It suggests the couple should have waited a few more years before deciding to marry',
      'It removes an easy villain, so the reader cannot blame the parents and stop thinking',
      'It proves the couple had asked their parents for help and had been turned down flat',
    ],
    correct: 2,
    explanation:
      'A story about money will always offer you somebody to blame. The narrator closes that door in half a sentence, which forces the reader to keep looking for the actual cause instead of settling on the first available one.',
  },
  {
    type: 'Inference',
    q: 'The narrator ends: "Only one person at that wedding knows why, and he has not told his wife." What is this doing?',
    opts: [
      'It tells us the bar ran out of wine and beer, so there was nothing left for anyone to buy',
      'It shows the guests had agreed among themselves to stop buying drinks as a quiet protest',
      'It explains that the venue closed the bar early and never gave the couple any reason why',
      'It marks a private decision that changed the evening, and holds it back for the third voice',
    ],
    correct: 3,
    explanation:
      'Two facts are given and the link between them is withheld. The word "he" is the only clue offered, and it rules out both Priya and Nadia before you have heard a single voice note.',
  },
];

const A_QS: Question[] = [
  {
    type: 'Comprehension',
    q: 'What does Priya admit about the wedding website?',
    opts: [
      'She never opened it at any point, and only learned it existed several days afterwards',
      'She read every page of it carefully, and the line about the bar was simply not there',
      'She opened it that morning for the address, looked at the map, and closed it again',
      'She was never sent a link to it, because the invitation she received was only on paper',
    ],
    correct: 2,
    explanation:
      'She raises it herself, before her friend can: "Now, before you say it." She had the page open in her hand that same morning. It is the most damaging fact in her account and she is the one who supplies it.',
  },
  {
    type: 'Vocabulary',
    q: '"A wedding asks you to be a guest. A bar asks you to be a customer." What is Priya doing with these two lines?',
    opts: [
      'She names two roles that will not fit together, and that is her argument in one line',
      'She is complaining about the physical layout of the room where the bar had been placed',
      'She is saying that weddings should never have a bar of any kind in the same building',
      'She means she was asked to leave the room where the rest of the guests were standing',
    ],
    correct: 0,
    explanation:
      'Two short sentences with the same shape, and the difference sits in one word each time: guest, customer. It is the clearest thing anybody says in this story, and it explains why the twenty-four dollars was never the problem.',
  },
  {
    type: 'Tone',
    q: "How would you best describe the tone of Priya's voice note?",
    opts: [
      'Completely calm and detached, as though describing something that happened to somebody else',
      'Openly furious with the couple from the very first word to the last, with no doubt anywhere',
      'Light and joking all the way through, treating the whole evening as a story worth retelling',
      'Hurt and self-defending, but honest enough to damage her own case halfway through',
    ],
    correct: 3,
    explanation:
      'She is defending herself from the first line, to somebody who was not even there. And then she hands over the website, the sentence she cannot remember, and the fact that she has not slept. Defensive people do not usually do that.',
  },
  {
    type: 'Inference',
    q: '"If somebody had told me, I would have brought cash and I would have told nobody." What does this reveal?',
    opts: [
      'She is worried that paying by card at a wedding leaves a record other guests might see',
      'Her objection is to the surprise, not to the cost — being told in advance would have fixed it',
      'She wanted to be seen paying in cash so that the couple would notice how generous she was',
      'She believes cash is the only polite way to pay for anything at a private family event',
    ],
    correct: 1,
    explanation:
      '"I would have told nobody" is the key half. She is describing a version of the evening in which she pays the same money and nothing happens at all. The difference between that evening and the real one is information, not price.',
  },
  {
    type: 'Critical Thinking',
    q: 'Priya says the couple should have told her. What is the strongest reply a critic could make?',
    opts: [
      'Nobody is ever obliged to tell guests anything about the arrangements at a private wedding',
      'Two hundred dollars is a gift, and a gift never buys the person giving it anything in return',
      'She could have simply asked another guest what the bar arrangements were before ordering',
      'They did put it in writing on the website, and she opened that page without reading it',
    ],
    correct: 3,
    explanation:
      'It is the strongest reply because it is the one she has already conceded. Notice how she answers it in advance — "technically it was there" — which is what people say when they know an argument is coming and cannot beat it.',
  },
];

const B_QS: Question[] = [
  {
    type: 'Comprehension',
    q: 'Why did the couple choose a cash bar?',
    opts: [
      'The venue simply did not offer an open bar to couples who had booked a Saturday in June',
      'They wanted their guests to drink rather less, so that the dancing would go on for longer',
      'Owen preferred it, and Nadia agreed to it even though she was against the idea herself',
      'An open bar for five hours was quoted at four thousand six hundred dollars, and they did not have it',
    ],
    correct: 3,
    explanation:
      'Nadia gives the number twice in a row, and the second time she reframes it: "so that everybody can drink for free." The repetition is not information. It is her telling her sister how the figure felt.',
  },
  {
    type: 'Vocabulary',
    q: '"On a card, in that typeface, with the little flowers down the side, cash bar looks like an apology."',
    opts: [
      'She is saying the printer used the wrong typeface on the invitations they finally sent',
      'She is describing how the words would have looked to her, not what they would have meant',
      'She means the couple had already written an apology into the invitation and removed it',
      'She is explaining that the card was too small to fit any more lines of text onto it',
    ],
    correct: 1,
    explanation:
      'Nobody reading that card would have seen an apology. She would have. The whole sentence is about her own eye, which is why it points forward to what she confesses a minute later.',
  },
  {
    type: 'Inference',
    q: 'Nadia says the sentence "does not sound like her" — and she believed it anyway. Why?',
    opts: [
      'Because three different people had told her the same story in exactly the same words',
      'Because she and Priya had already fallen out badly some months before the wedding day',
      'Because believing it hurt less than admitting she was already ashamed of the bar herself',
      'Because Owen told her his mother never gets that kind of thing wrong about anybody',
    ],
    correct: 2,
    explanation:
      'Being wronged by a friend is painful. Being ashamed of your own choice is worse, because there is nobody to be angry at. She says plainly that the first was the easier of the two.',
  },
  {
    type: 'Tone',
    q: "What happens to Nadia's anger by the end of her voice note?",
    opts: [
      'It turns completely into guilt, and by the end she is no longer angry with anybody at all',
      'It moves off Priya and onto Owen, who she decides is the person really responsible for it',
      'It grows steadily louder, until she is far angrier at the end than she was at the start',
      'It does not go away — she understands it better and stays angry at the same time',
    ],
    correct: 3,
    explanation:
      '"Both of those are true and I cannot make them fit together." Understanding something does not switch the feeling off, and the story is more honest for refusing to let her arrive anywhere tidy.',
  },
  {
    type: 'Critical Thinking',
    q: '"Four thousand six hundred dollars so that everybody can drink for free." What does framing it that way do, and what does it leave out?',
    opts: [
      'It makes the cost vivid and the guests sound greedy, and it says nothing about telling them',
      'It proves the venue was overcharging them, which is the real cause of the whole argument',
      'It shows she had never actually asked the venue for a written quote in the first place',
      'It admits the couple could have afforded it and had simply decided against paying for it',
    ],
    correct: 0,
    explanation:
      'The framing is doing real work: "for free" turns ninety-six friends into people taking something. And notice what the sentence cannot answer — nobody in this story is angry about the price of the bar. They are angry about not being told.',
  },
];

const C_QS: Question[] = [
  {
    type: 'Comprehension',
    q: 'What did Owen want on the printed invitation, and what happened to it?',
    opts: [
      'A note asking the guests to bring a fixed amount of cash with them for the evening',
      'Nothing at all about the bar, because he thought the website was already quite enough',
      'An apology in advance for the fact that the couple could not afford an open bar',
      'One plain line saying there would be a bar and guests would need a card — Nadia said no',
    ],
    correct: 3,
    explanation:
      'He had already written it out. What matters more is what he says next: he did not push, and he explains why in a way that makes it his decision too. He does not let himself off.',
  },
  {
    type: 'Inference',
    q: 'Owen asked his mother twice what she heard. Why does he tell his brother this?',
    opts: [
      'It shows he had already decided not to believe a single word his own mother said that night',
      'She gave a different sentence each time, so the version that reached Nadia has no fixed source',
      'It proves that Priya said nothing at all, and that his mother invented the entire sentence',
      'It means his mother was standing much too far from the bar to hear anything that was said',
    ],
    correct: 1,
    explanation:
      'He is not calling his mother a liar, and he says so: "It was close." Memory moves. But a sentence that changes between Sunday and Tuesday cannot carry the weight his wife has put on it.',
  },
  {
    type: 'Comprehension',
    q: 'What did Owen do at about twenty to ten?',
    opts: [
      'He put the rest of the night on his own card, and has told nobody in his family',
      'He asked the bar manager to close the bar early so that nobody else could complain',
      'He went to find Priya and apologised to her privately for the way the evening had gone',
      'He told the guests that the couple would settle up with each of them later that week',
    ],
    correct: 0,
    explanation:
      'This is the answer to the question the narrator left open at the end of the opening text. Notice that it also creates a new secret: Nadia believes the venue made them a gift.',
  },
  {
    type: 'Tone',
    q: '"That is not generosity. That is me paying so that I do not have to hear about it any more."',
    opts: [
      'He is asking his brother to tell other people what he did, so that the story gets around',
      'He regrets spending the money and now wants the bar manager to give some of it back',
      'He refuses to let himself be the hero of his own story, and names his real motive instead',
      'He is blaming Nadia for a decision that he believes was hers alone and never his at all',
    ],
    correct: 2,
    explanation:
      'He had an easy exit here. Eight hundred and sixty dollars of his own money, spent quietly, told to nobody — that is a story he could have finished well. He takes it apart in two sentences instead.',
  },
  {
    type: 'Critical Thinking',
    q: '"People do not get angry about a cash bar. They get angry about being surprised." Why is this the most useful line in the story?',
    opts: [
      'It removes all responsibility from the couple, since a surprise cannot really be anyone\'s fault',
      'It is contradicted by his wife, who says plainly that the money was the only real issue',
      'It applies only to weddings, and would explain nothing at all about any other kind of event',
      'It moves the question from money to information, which is where all three accounts point',
    ],
    correct: 3,
    explanation:
      'Test it against the other two. Priya would have paid the same money without complaint if she had known. Nadia is not defending the price, she is defending the choice to hide it. He has named the thing they were all circling.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Synthesis',
    q: 'On the disputed point — what Priya said at the bar — what do the three accounts actually give us?',
    opts: [
      'A clear recording of the exact words, which two of the three of them have now listened to',
      'A speaker who admits saying something without knowing what, and a witness whose version moved',
      'Complete agreement about the words, with disagreement only over the tone they were said in',
      'Proof that the sentence was invented, since nobody standing at the bar reported hearing it',
    ],
    correct: 1,
    explanation:
      'Priya does not deny it and cannot reconstruct it. The only witness produced two versions three days apart. What reached Nadia had already passed through three people. There is no bottom to this, and the exercise does not want one.',
  },
  {
    type: 'Perspective',
    q: 'What do all three speakers turn out to agree on, even though only one of them says it directly?',
    opts: [
      'That the cash bar itself was a mistake and should never have been arranged in the first place',
      "That Owen's mother repeated the sentence accurately and that Priya really did say those words",
      'That two hundred dollars was too generous a gift for a wedding of that particular size',
      'That the problem was the not-knowing, although only Owen puts it into those words',
    ],
    correct: 3,
    explanation:
      'Priya: "I would have brought cash and I would have told nobody." Nadia: ashamed of the bar before anybody spoke. Owen: they get angry about being surprised. Three people, one shape — and none of them has heard the other two.',
  },
  {
    type: 'Critical Thinking',
    q: 'What is the most accurate ROOT cause of this conflict?',
    opts: [
      'A decision that embarrassed them was moved onto a page nobody had a reason to read',
      'The sentence Priya said at the bar, which is what turned the evening into an argument',
      'The price of an open bar, which no couple paying for their own wedding could ever meet',
      "Owen's mother repeating something she had heard from the far end of a noisy wedding bar",
    ],
    correct: 0,
    explanation:
      'The sentence and the mother are the sparks. The fuel was laid in February, when a fact that would have been ordinary in the post became a discovery at the counter. Owen names it himself: they hid it because they were embarrassed.',
  },
  {
    type: 'Critical Thinking',
    q: 'Owen paid for the rest of the bar out of his own pocket. What did that solve, and what did it not?',
    opts: [
      'It solved the whole problem, since nobody was asked to pay for anything after that point',
      'It solved nothing at all, because the guests never noticed that the bar had changed',
      'It stopped the evening getting worse, and left the couple with a bill they cannot pay',
      'It repaid Priya the money she had spent and settled the question of who had been right',
    ],
    correct: 2,
    explanation:
      'He says it better than any summary could: it moved the bill from ninety-six people onto two, one day too late. And it bought a second secret, because his wife believes the venue made them a present.',
  },
  {
    type: 'Critical Thinking',
    q: 'Suppose the printed card had carried the line Owen wrote. What would still have been true?',
    opts: [
      'Nothing at all would have changed, because Priya does not read what she is sent anyway',
      'The couple would still have had to find four thousand six hundred dollars from somewhere',
      'The wedding would have cost them more, because fewer guests would have come to it',
      'The guests would have known, and the couple would still have been embarrassed by it',
    ],
    correct: 3,
    explanation:
      'This is the sting. Telling people fixes the surprise, and the surprise is what everybody was actually angry about — but it does not touch the feeling that made Nadia take the line off the card. The information problem and the shame problem are two different problems.',
  },
];

const KEY_LANGUAGE = [
  { phrase: 'open bar / cash bar', meaning: 'barra libre (paga el anfitrión) frente a barra de pago (paga el invitado)' },
  { phrase: 'card', meaning: 'la palabra que sostiene la historia: la tarjeta de la invitación y la de crédito' },
  { phrase: 'to put something on the card', meaning: 'pagarlo con la tarjeta — y también: escribirlo en la invitación' },
  { phrase: 'to get back to someone', meaning: 'llegarle a alguien (un comentario, por terceros)' },
  { phrase: 'technically', meaning: 'casi siempre significa «en teoría sí, pero no cuenta»' },
  { phrase: 'to let it go', meaning: 'dejarlo estar, no insistir' },
  { phrase: 'it was never about the money', meaning: 'la frase que dicen los tres, cada uno de otra herida' },
];

// ─── Historia ─────────────────────────────────────────────────────────────────

export const theCashBar: Historia = {
  slug: 'the-cash-bar',
  lang: 'ingles',
  icon: '🥂',
  color: '#9d174d',
  level: 'B2',
  title: 'The Cash Bar',
  tagline: 'Noventa y seis invitados, una barra donde hay que pagar y una frase que nadie recuerda igual.',
  metaTitle: 'The Cash Bar — comprensión en inglés B2',
  metaDescription:
    'Una boda, una barra de pago y una frase que nadie recuerda igual. Tres audios, transcripción y 24 preguntas de comprensión en inglés B2.',
  intro:
    'A wedding, a bar the guests had to pay at, and one sentence nobody remembers the same way. Told by the guest, the bride and the groom — and each of them says something that damages their own case. Read the narrator, listen to all three voice notes, and answer 24 comprehension questions on vocabulary, inference, tone and critical thinking.',
  narrator: {
    paragraphs: NARRATOR_PARAGRAPHS,
    questions: NARRATOR_QS,
    tip: 'Two documents went out to the same ninety-six people and they did not say the same thing. Find that difference before you go on — everything the three speakers argue about grows out of it.',
  },
  voices: [
    {
      key: 'a',
      name: 'Priya',
      sex: 'female',
      role: 'the guest',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/ingles/the-cash-bar/a.mp3',
      paragraphs: A_PARAGRAPHS,
      questions: A_QS,
      listenHint: 'Listen carefully. There is no transcript yet — just focus on what you can understand.',
      transcriptHint: 'mark them and see their translation. Then write again what you understood.',
      write1Prompt: "Without looking at any transcript, write in your own words what you understood from Priya's voice note.",
      write1Hint: "Don't worry about being perfect — this is a first impression. Write in English or Spanish.",
      write2Prompt: 'Now write again what you understood — you can be more detailed this time.',
    },
    {
      key: 'b',
      name: 'Nadia',
      sex: 'female',
      role: 'the bride',
      color: '#9d174d',
      audioSrc: '/audio/historias/ingles/the-cash-bar/b.mp3',
      paragraphs: B_PARAGRAPHS,
      questions: B_QS,
      listenHint: 'The other side, and she is angry. Listen for the moment she stops talking about Priya and starts talking about herself.',
      transcriptHint: "compare her account with Priya's. They agree on far more facts than either of them realises.",
      write1Prompt: "Without the transcript, write in your own words what you understood from Nadia's voice note.",
      write1Hint: 'What is she angry about? And what does she admit was her own decision? Write in English or Spanish.',
      write2Prompt: "Now write again what you understood from Nadia's perspective.",
    },
    {
      key: 'c',
      name: 'Owen',
      sex: 'male',
      role: 'the groom',
      color: '#166534',
      audioSrc: '/audio/historias/ingles/the-cash-bar/c.mp3',
      paragraphs: C_PARAGRAPHS,
      questions: C_QS,
      listenHint: 'He knows two things the other two do not, and he has told nobody. Listen for both.',
      transcriptHint: 'he answers the question the narrator left open at the very end of the opening text. Find that line.',
      write1Prompt: "Without the transcript, write in your own words what you understood from Owen's voice note.",
      write1Hint: 'What is he keeping from his wife, and why? Write in English or Spanish.',
      write2Prompt: "Now write again what you understood from Owen's perspective.",
    },
  ],
  finalQuestions: FINAL_QS,
  finalIntro: [
    'You now know things none of the three knows. Priya does not know that Nadia was ashamed of the bar before a word was said about it. Nadia does not know that the sentence changed between Sunday and Tuesday, or that the bar did not stop charging by itself. Owen does not know why his wife really took his line off the card, because she has never told him.',
    'These questions ask you to hold all three at once — and to notice that every one of the three hands you the fact that weakens their own case.',
  ],
  dict: DICT,
  keyLanguage: KEY_LANGUAGE,
  discussion: {
    question: 'Whose job was it to make sure Priya knew? And does your answer change once you learn that she opened the website that same morning?',
    note: 'There is no single correct answer. The skill being tested is defending your position with evidence from the three accounts — specific words, phrases and numbers. Notice that the couple never hid the bar to save money: the money was already saved. They hid it because of how it would look, which is a different decision with a different cost.',
  },
  ui: 'en',
};

export default theCashBar;
