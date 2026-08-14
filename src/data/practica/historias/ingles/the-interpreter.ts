// ─── The Interpreter — Historia B2 en inglés, TRES voces ──────────────────────
//
// Idea de David: la jefa avisa al empleado nuevo de que mañana llega el señor
// de la corporación y que él va a ser el intérprete, porque en su currículum
// pone que habla italiano. No lo habla. O lo hablaba, hace seis años.
//
// LO QUE SE LE AÑADIÓ AL PLANTEAMIENTO ORIGINAL, y por qué:
//
// 1. UNA TERCERA VOZ. Con dos —el empleado aterrado y la jefa confiada— el
//    alumno se escapa repartiendo la culpa a medias. Sofía, la compañera que sí
//    habla italiano nativo y a la que nadie preguntó nunca, cierra esa salida y
//    convierte un apuro en un problema con causa: la empresa preguntó una vez,
//    lo apuntó en una ficha, y no volvió a mirar a nadie.
//
// 2. LA JEFA GRABA ANTES DE LA REUNIÓN. Su nota de voz a la secretaria de Salvi
//    sale a las tres y doce; la reunión con Dani es a las cuatro. Nunca da su
//    versión de lo que se dijo, porque cuando grabó todavía no había pasado. Su
//    coartada es la marca de tiempo, y el alumno tiene que hacer la resta él
//    solo. Es la pregunta de comprensión más difícil de las tres historias.
//
// 3. LA MENTIRA FUE VERDAD UNA VEZ. Dani escribió «italiano — avanzado» a los
//    veintidós, cuando era casi cierto, y lo ha copiado de un currículum al
//    siguiente durante seis años sin volver a mirarlo. Es la versión honesta del
//    caso y la única que le sirve al alumno de WeLearn, que tiene esa misma línea
//    escrita en algún sitio. La pregunta de debate se lo pregunta directamente.
//
// DÓNDE ESTÁ EL DESACUERDO. No en un mismo minuto contado tres veces, como en
// las dos historias anteriores —repetir esa forma una tercera vez la agotaba—.
// Aquí Dani y Sofía recuerdan las mismas dos palabras en italiano de dos maneras
// incompatibles: él, un silencio que no rompió; ella, una pequeña actuación que
// coló. Ninguno miente.
//
// LONGITUD DE LAS OPCIONES: escrita ya equilibrada, como the-cash-bar.
//
// AUDIO: /audio/historias/ingles/the-interpreter/{a,b,c}.mp3
// a hombre (Dani, 28) · b mujer (Marta, la directora) · c mujer (Sofía, 30s).
// Marta y Sofía tienen que sonar CLARAMENTE distintas: registro corporativo
// controlado frente a rabia privada de madrugada.

import type { Historia, StoryQuestion as Question } from '../types';

const DICT: Record<string, string> = {
  // La empresa
  corporation: 'la corporación / la matriz',
  headquarters: 'sede central',
  branch: 'sucursal / delegación',
  staff: 'la plantilla',
  colleague: 'compañero/a de trabajo',
  manager: 'jefe/a directo/a',
  director: 'directora / director',
  employee: 'empleado/a',
  hire: 'contratar',
  hired: 'contratado/a',
  hiring: 'contratación',
  application: 'la solicitud de empleo / el currículum',
  file: 'ficha / expediente',
  supplier: 'proveedor',
  account: 'cuenta / cliente grande',
  visit: 'visita',
  itinerary: 'itinerario / programa del viaje',
  schedule: 'agenda / horario',
  logistics: 'logística',
  protocol: 'protocolo',
  meeting: 'reunión',
  meetings: 'reuniones',
  deadline: 'fecha límite',
  pause: 'pausar / dejar en suspenso',
  arrange: 'organizar',
  arranged: 'organizado / todo listo',
  confirmed: 'confirmado',

  // El idioma
  interpret: 'interpretar (traducir en directo)',
  interpreting: 'interpretación simultánea',
  interpreter: 'intérprete',
  translate: 'traducir (por escrito)',
  fluent: 'que habla con soltura',
  fluency: 'soltura al hablar',
  advanced: 'avanzado',
  intermediate: 'intermedio',
  level: 'nivel',
  native: 'nativo/a',
  accent: 'acento',
  bridge: 'puente',
  rusty: 'oxidado (dicho de un idioma que no se practica)',
  overstate: 'exagerar / decir más de lo que es',
  overstated: 'exagerado',

  // El miedo
  scared: 'asustado/a',
  terrified: 'aterrado/a',
  panic: 'pánico',
  panicking: 'entrando en pánico',
  dread: 'pavor a algo que va a pasar',
  exposed: 'al descubierto / desenmascarado',
  expose: 'dejar al descubierto',
  bluff: 'farolear',
  bluffing: 'faroleando',
  confess: 'confesar',
  confession: 'confesión',
  admit: 'admitir / reconocer',
  cowardice: 'cobardía',
  coward: 'cobarde',
  humiliated: 'humillado/a',
  ashamed: 'avergonzado/a',
  shame: 'vergüenza',
  guilt: 'culpa',

  // Lo invisible
  overlooked: 'pasado/a por alto',
  overlook: 'pasar por alto',
  invisible: 'invisible',
  ignored: 'ignorado/a',
  option: 'opción',
  considered: 'tenido/a en cuenta',
  aware: 'consciente / enterado/a',
  assume: 'dar por hecho / suponer',
  assumed: 'dio por hecho',
  assumption: 'suposición',
  verify: 'comprobar',
  verified: 'comprobado',
  check: 'comprobar / revisar',
  checked: 'comprobó',
  evidence: 'prueba / pruebas',
  witness: 'testigo',
  silence: 'silencio',

  // Argumentación
  version: 'versión',
  account_: 'relato de los hechos',
  timeline: 'orden en el tiempo de los hechos',
  timestamp: 'la hora a la que se envió algo',
  responsibility: 'responsabilidad',
  blame: 'culpar / la culpa',
  fair: 'justo/a',
  unfair: 'injusto/a',
  reasonable: 'razonable',
  deserve: 'merecer',
  neglect: 'descuido / dejadez',
  honestly: 'honestamente / la verdad',
  genuinely: 'de verdad / genuinamente',
  actually: 'en realidad',
  exactly: 'exactamente',
  apparently: 'por lo visto',
  anyway: 'de todos modos',
  whatever: 'lo que sea / da igual',
};

// ─── Textos ───────────────────────────────────────────────────────────────────

const NARRATOR_PARAGRAPHS = [
  'The company makes labelling machines. Thirty-four people, one building, a small canteen with three tables, and a parent corporation in Milan that owns it and rarely visits.',
  'Pietro Salvi is sixty-one and works for the corporation. He is flying in on Tuesday morning, landing at twenty to eleven, and staying three days.',
  'He is coming to look at two offices before the corporation decides which of them gets a new production line. This one, and one in another country. He went to the other one in March.',
  'Marta is the director here. On Monday afternoon she sent a voice message to Chiara, who runs Mr Salvi\'s diary, telling her that everything was arranged and that somebody from the team would collect him, stay with him for the whole visit, and speak Italian to him throughout.',
  'She sent it at twelve minutes past three.',
  'At four o\'clock the same afternoon she called Dani into her office. Dani is twenty-eight and has worked there for five months. Two other people were in the room.',
  'She told him to pause everything else for three days, that he would build the itinerary, sit in every meeting, and interpret. She told him not to worry about the protocol, because somebody would help him with all of that. She said the important part was that he speaks Italian.',
  'Dani said he did not know anything about protocol or logistics, and that he had four things due on Friday.',
  'He did not say the other thing.',
  'Then he said two words in Italian, and the room laughed, and the meeting ended four minutes later.',
  'On his application, under languages, it says Italian, and beside it, advanced. He wrote that line when he was twenty-two. He has copied it from one application to the next ever since, and nobody has ever asked him about it.',
  'Sofía has worked there for four years, in the department along the corridor. Her mother was born in Trieste. She speaks Italian on the phone every Sunday, and has done all her life.',
  'It is on her application too, on the second page.',
  'At ten to twelve that night, Dani sent a voice message to a friend.',
  'At half past midnight, Sofía sent one to her brother.',
  'The three recordings were made within nine hours of each other, and no two of the three people have spoken since the meeting.',
  'One of the three has known for two weeks, and has said nothing.',
];

const A_PARAGRAPHS = [
  'Rubén. Rubén, pick up. Okay, you are asleep. Fine, listen to it in the morning.',
  'I need to say this out loud to somebody or I am not going to sleep at all.',
  'You know the Italian who is coming. Salvi. From the corporation.',
  'He lands at twenty to eleven on Tuesday. That is eleven hours from now.',
  'And I am the one picking him up. Me.',
  'Marta called me in this afternoon and told me I am off everything else for three days. Her words were, pause your activities.',
  'I build his whole itinerary, I sit in every meeting, I go to the dinner, and I do the interpreting.',
  'The interpreting, Rubén.',
  'And I did say something. I said I do not know anything about protocol, I have never organised a visit, and I have four things due on Friday.',
  'And she said do not worry about any of that, somebody will help you with the logistics.',
  'And then she said the other thing. She said, the important part is that you speak Italian.',
  'The important part is that you speak Italian.',
  'And I said two words in Italian, and everybody laughed, and I said nothing else.',
  'Because here is the part you already know and nobody in that building does.',
  'I do not speak Italian.',
  'I did two years of it at school. I did a summer in Bologna when I was nineteen, and I spent most of that summer with people from home.',
  'I can read a menu. I can follow the football if they are shouting. I understand about half of a slow conversation if I already know what it is about.',
  'That is not interpreting. That is not within a hundred miles of interpreting.',
  'And on my application it says advanced. The level that means you can hold a meeting.',
  'And I did not lie, exactly. I wrote that line when I was twenty-two and it was almost true then, and I have carried it from one application to the next for six years without ever reading it again.',
  'Every single year I thought, I should fix that.',
  'And now a sixty-one-year-old man is getting on a plane, and I am the reason this company thinks he does not need anybody else.',
  'Rubén, I am so frightened I feel sick.',
  'And the worst part is not Tuesday.',
  'The worst part is that there is a version of this where I walk into her office first thing tomorrow and just say it.',
  'And I already know that I am not going to.',
];

const B_PARAGRAPHS = [
  'Chiara, buongiorno. Sorry for the voice note, it is much faster than typing and I have about four minutes.',
  'So. Everything is arranged on this end for Mr Salvi. All confirmed, all booked, nothing left open.',
  'Somebody from our team is collecting him personally from the airport on Tuesday morning. Not a taxi, not a driver from an agency. A person from here.',
  'And that same person stays with him for the whole visit. Door to door, all three days.',
  'The meetings, the lunches, the factory floor on Wednesday, the dinner on Wednesday night, and back to the airport on Thursday afternoon.',
  'He is building the full itinerary today and I will send it to you tomorrow, so Mr Salvi can look at it on the plane and tell us if he wants anything moved.',
  'And now the part that I think will matter most to him.',
  'This person speaks Italian.',
  'So Mr Salvi does not have to work in English for three days. Not in the meetings, not in the car, not at dinner.',
  'And Chiara, I want to say this properly, because I know what happened in March at the other office.',
  'I know that nobody there could do it. I know he sat through two days of people speaking English at him, and then went back to the hotel on his own both nights.',
  'Somebody told me that afterwards he said he had understood the numbers and not the people.',
  'That is not going to happen here.',
  'So please tell him. Tell him he can arrive and just be a person for three days.',
  'On the practical side, anything at all that he needs. Food, medication, a quiet room between meetings, a later start on the Wednesday. Send it straight to me and we will have it ready.',
  'And I know this is not only a visit. I know what is being decided this week.',
  'I am not going to pretend otherwise to you, because you and I have been doing this together for a month now.',
  'I just want him to leave here feeling that somebody made an effort.',
  'Grazie mille, Chiara. A presto.',
];

const C_PARAGRAPHS = [
  'It is half past midnight, I am not going to sleep, so you will get this over your coffee.',
  'You remember the Italian I told you about. Salvi. He lands in ten hours.',
  'And Dani is collecting him. Dani is interpreting for him. Three days.',
  'Dani, who has been in this company for five months.',
  'I was in that room this afternoon. I want to tell you exactly what happened, because I have been over it about forty times tonight.',
  'Marta did not ask him. And she did not not ask him either, and that is the whole problem.',
  'She said, the important part is that you speak Italian.',
  'That is not a question. There is nowhere in that sentence to put a no.',
  'And he said two words. Two. And they were correct, and his accent was good, and the room laughed, and that was the entire hiring of an interpreter.',
  'Four minutes later we were all walking back down the corridor.',
  'And I sat there and said nothing.',
  'Mum was born in Trieste. I have spoken Italian with her on the phone every Sunday of my life. It is on the second page of my application.',
  'And in four years in this building, nobody has ever asked me. Not once. Not about a supplier, not about an email, not about anything.',
  'They did not choose him over me. That would be something. I could be angry at that, I would know what to do with that.',
  'They did not know that I was an option.',
  'And now the part I have not said to anybody.',
  'I have known for two weeks that his Italian is not real.',
  'I heard him on the phone to the hotel in Milan. He was reading. You can hear it when somebody is reading.',
  'Two weeks, and I have said nothing.',
  'And I have been telling myself that it is not my place, and that is not the reason.',
  'The reason is that some part of me wants Tuesday to go badly, so that somebody in this building finally has to ask who actually speaks Italian.',
  'And I do not like that about myself at all.',
  'He is twenty-eight and he is going to be taken apart on Tuesday, in front of a man who came here to decide something.',
  'And I could stop it with one message, right now, tonight.',
  'And I am lying here not sending it.',
];

// ─── Preguntas ────────────────────────────────────────────────────────────────

const NARRATOR_QS: Question[] = [
  {
    type: 'Comprehension',
    q: 'The narrator gives two times on Monday afternoon: twelve minutes past three, and four o\'clock. What do they establish?',
    opts: [
      'They are the start and the end of the meeting in which Dani was given the job',
      'Marta promised the Italian-speaking guide to Milan before she spoke to Dani at all',
      'They show how long Marta waited before telling Mr Salvi\'s assistant that all was arranged',
      'They are the times of the two flights the company had considered booking for Mr Salvi',
    ],
    correct: 1,
    explanation:
      'Forty-eight minutes separate a promise from a question, and the promise comes first. The narrator states both times flatly and draws no conclusion, because the arithmetic is the exercise.',
  },
  {
    type: 'Comprehension',
    q: 'What does the narrator tell us about the line on Dani\'s application?',
    opts: [
      'He added it five months ago to get this job, knowing perfectly well that it was untrue',
      'Somebody in the company wrote it into his file after he had already been hired here',
      'He wrote it at twenty-two, and has copied it from one application to the next since',
      'It claims that he is a qualified interpreter, which is a qualification he never held',
    ],
    correct: 2,
    explanation:
      'The narrator reports the line and its age, and nothing else. Whether a sentence that was almost true in the past and was never revisited counts as a lie is left to you, and it is the question the whole story is built on.',
  },
  {
    type: 'Inference',
    q: 'The narrator says Sofía\'s Italian is on her application too, "on the second page." Why include that detail?',
    opts: [
      'It shows that Sofía deliberately buried her Italian where nobody in the office would see it',
      'It proves her application was a good deal longer than the ones the other candidates sent',
      'It suggests that the second page of an application is where the real skills always are',
      'The information had been in the building for four years and nobody had read that far',
    ],
    correct: 3,
    explanation:
      'Two facts sit one line apart: Dani\'s claim is on his application, and so is hers. The difference is not truthfulness. It is that neither page had been read since the day it arrived.',
  },
  {
    type: 'Critical Thinking',
    q: 'The narrator ends: "One of the three has known for two weeks, and has said nothing." What is this line doing?',
    opts: [
      'It tells us that the person who could still stop this has chosen not to, without naming them',
      'It tells us the company has known about the problem for a fortnight and has ignored it',
      'It confirms that Mr Salvi already knows his interpreter is not really an interpreter',
      'It shows that Dani has been meaning to confess for two weeks and keeps putting it off',
    ],
    correct: 0,
    explanation:
      'Everything before this line is verifiable: times, ages, what is written on a page. This line is the first thing the narrator withholds, and it turns the third voice note into the one you wait for.',
  },
];

const A_QS: Question[] = [
  {
    type: 'Comprehension',
    q: 'How does Dani describe what he can actually do in Italian?',
    opts: [
      'Nothing at all, since he has never studied the language at any point in his life',
      'Enough for a menu and about half of a slow conversation on a subject he knows',
      'Enough to hold a business meeting, but not enough to interpret between two people',
      'He was completely fluent six years ago and has simply forgotten most of it since',
    ],
    correct: 1,
    explanation:
      'He is precise, which is what makes it painful: two years at school, one summer at nineteen spent mostly with people from home. Not nothing, and nowhere near enough. Most people who overstate a language are describing exactly this gap.',
  },
  {
    type: 'Vocabulary',
    q: '"I did not lie, exactly." What is Dani claiming with the word "exactly"?',
    opts: [
      'He is admitting he lied outright and asking his friend to forgive him for it',
      'He means the line is still true, and that Marta has misunderstood what it says',
      'He is saying somebody else wrote the line and that he never noticed it was there',
      'That the line was true when he wrote it and has become false through neglect',
    ],
    correct: 3,
    explanation:
      'The whole defence rests on that one adverb. A lie is something you do; this is something he failed to do, six times, once a year. Whether that difference is worth anything is exactly what the story refuses to settle.',
  },
  {
    type: 'Tone',
    q: 'How would you best describe the tone of Dani\'s voice note?',
    opts: [
      'Calm and organised, working steadily through the practical problems one at a time',
      'Angry at Marta for putting him into a position that nobody could reasonably manage',
      'Panicking, and clear enough to predict exactly what he will fail to do tomorrow',
      'Relaxed about Tuesday, and mainly worried about the four things due on Friday',
    ],
    correct: 2,
    explanation:
      'He is not falling apart at random. He gets the facts out in order, and then arrives at a conclusion about his own character that nobody asked him for. Panic and self-knowledge are not opposites.',
  },
  {
    type: 'Inference',
    q: '"I said two words in Italian, and everybody laughed, and I said nothing else." Why does he go back to this moment?',
    opts: [
      'He is proud of the two words, which is the reason he mentions them to his friend',
      'He believes the laughter was aimed at him and that the room knew he was bluffing',
      'He is saying that the two words came out wrong, which is what made them laugh',
      'The silence is where it became a lie, and not the line on the application',
    ],
    correct: 3,
    explanation:
      'The application was written six years ago by somebody who was nearly telling the truth. The silence was Monday, at four o\'clock, by the person he is now. He knows the difference, which is why that sentence is the one he repeats.',
  },
  {
    type: 'Critical Thinking',
    q: 'He ends: "there is a version of this where I walk into her office first thing tomorrow and just say it. And I already know that I am not going to." What does this do to his case?',
    opts: [
      'It proves that he is going to tell Marta the truth first thing on Tuesday morning',
      'It shows he blames Marta for never giving him a private chance to correct himself',
      'He convicts himself in advance, which takes away the excuse of not having seen it',
      'It shows he has decided the visit will go well enough without any warning at all',
    ],
    correct: 2,
    explanation:
      'People usually discover their own cowardice afterwards. He describes his tomorrow accurately tonight, and does it anyway. That is a harder thing to admit than the lie, and it is why his account is more honest than his behaviour.',
  },
];

const B_QS: Question[] = [
  {
    type: 'Comprehension',
    q: 'What exactly does Marta promise Chiara?',
    opts: [
      'A professional interpreter, hired from an agency for the three days of the visit',
      'A driver from a company, and an itinerary Mr Salvi can adjust once he arrives',
      'That the whole visit will be conducted in English, exactly as it was back in March',
      'A person from the team who collects him, stays all three days, and speaks Italian',
    ],
    correct: 3,
    explanation:
      'Notice how specific she is, and how she rules out the cheaper options by name: not a taxi, not a driver from an agency. Every detail she adds is one more thing that has to be true by Tuesday.',
  },
  {
    type: 'Vocabulary',
    q: '"Tell him he can arrive and just be a person for three days." What is she promising?',
    opts: [
      'Working in a second language costs effort, and she is offering to take it away',
      'She is promising Mr Salvi will not have to attend any of the scheduled meetings',
      'She means the visit is social rather than professional, and nothing is decided',
      'She is saying the other office treated him as a number rather than as a guest',
    ],
    correct: 0,
    explanation:
      'It is the best sentence she says, and it is true: operating all day in a foreign language is tiring in a way that is hard to explain to people who have never done it. She has understood the real problem exactly, and solved it with somebody else\'s Italian.',
  },
  {
    type: 'Inference',
    q: 'Why does Marta bring up what happened in March at the other office?',
    opts: [
      'She is criticising the other office to Chiara in order to win the account for hers',
      'She was present in March herself and saw how those two days went for Mr Salvi',
      'She has evidence that this matters to him, which is why she promised it so fast',
      'She is explaining why Mr Salvi has refused to travel anywhere at all since then',
    ],
    correct: 2,
    explanation:
      '"He understood the numbers and not the people" is second-hand, and she treats it as decisive. It explains the speed: she was not inventing a nice extra, she was answering a complaint she had heard about. That does not make the promise safe.',
  },
  {
    type: 'Tone',
    q: 'Marta talks for much longer than a message of this kind needs. What does the excess suggest?',
    opts: [
      'She and Chiara are close personal friends and she has time to spare that afternoon',
      'She is nervous about her English and repeats herself to be sure she is understood',
      'She is reading aloud from a written script that somebody else prepared for her',
      'She is selling something she has not checked yet, and the detail is the cover',
    ],
    correct: 3,
    explanation:
      'Count what she offers that nobody asked for: medication, a quiet room, a later start. Certainty does not usually need that much decoration. Forty-eight minutes later she went to find out whether any of it was true.',
  },
  {
    type: 'Critical Thinking',
    q: 'Marta never gives her version of what was said in the meeting. Why is she unable to?',
    opts: [
      'She was not in the room herself, and heard about the exchange from somebody else',
      'Her recording was made before the meeting, so the promise came first and the asking second',
      'She has decided not to discuss the meeting with anybody outside her own company',
      'She genuinely cannot remember it, because it took only four minutes of her afternoon',
    ],
    correct: 1,
    explanation:
      'This is the hardest question in the story and it is pure arithmetic. She is the only one of the three who never describes the meeting, and the reason is not discretion or forgetfulness. When she pressed record, it had not happened yet.',
  },
];

const C_QS: Question[] = [
  {
    type: 'Comprehension',
    q: 'How does Sofía describe what Marta said to Dani in the meeting?',
    opts: [
      'A direct question, asked twice, which Dani answered clearly and in front of witnesses',
      'Nothing about Italian at all, which is why Dani had no chance to correct anybody',
      'A statement dressed as a question, which nobody in that room could have refused',
      'An order, given in a tone that made it obvious refusing would cost him his job',
    ],
    correct: 2,
    explanation:
      '"There is nowhere in that sentence to put a no." She does not defend Dani and she does not accuse Marta. She describes the shape of the sentence, which is a more useful thing to notice than either.',
  },
  {
    type: 'Inference',
    q: 'Dani and Sofía both describe the same two words in Italian. How do their descriptions differ?',
    opts: [
      'He says there were two words, and she is certain that he spoke a full sentence',
      'He remembers them as correct, and she is quite sure that both of them were wrong',
      'He says the room laughed, and she says that nobody in the room reacted at all',
      'He remembers failing to speak up; she remembers a small performance that worked',
    ],
    correct: 3,
    explanation:
      'Two honest accounts of one second. From inside, it was a silence he did not break. From three metres away, it was a man saying something correct with a good accent. Neither of them is wrong, and that is the reading skill this story trains.',
  },
  {
    type: 'Comprehension',
    q: 'Why has nobody in the company ever asked Sofía to use her Italian?',
    opts: [
      'Her Italian sits on page two of a file nobody reads, so she was never an option',
      'She was asked four years ago and turned it down, so nobody has asked her again',
      'Marta considered her and chose Dani because he had more time free that week',
      'She works in a different building, so the office simply did not think of her',
    ],
    correct: 0,
    explanation:
      'Notice that her complaint is not about a decision. Nobody weighed her against anybody. She names that distinction herself in the next breath, and it is the sharpest thing anybody says in the three recordings.',
  },
  {
    type: 'Tone',
    q: '"They did not choose him over me. That would be something. I could be angry at that." What is she saying?',
    opts: [
      'She would rather have been rejected openly, and is asking her brother to agree',
      'She is not angry at all, and is telling her brother that the choice was correct',
      'Being overlooked is worse than losing, because there is nothing to argue with',
      'She thinks Dani got the job unfairly and intends to complain about it on Tuesday',
    ],
    correct: 2,
    explanation:
      'A decision can be appealed, or resented, or understood. Not existing as an option gives you nothing to hold. That is why she has spent the night going over four minutes she was not even part of.',
  },
  {
    type: 'Critical Thinking',
    q: 'Sofía has known for two weeks and said nothing. What reason does she finally give?',
    opts: [
      'She believes that it is not her place to report a colleague to their own manager',
      'She has no proof beyond a single phone call that nobody else in the office heard',
      'She was waiting for Dani to come to her and ask for the help he obviously needs',
      'Part of her wants Tuesday to fail, so that somebody finally has to ask the question',
    ],
    correct: 3,
    explanation:
      'She offers the respectable reason first and then takes it away herself: "that is not the reason." Being able to name the ugly motive under the presentable one is a rarer skill than either honesty or self-interest.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Synthesis',
    q: 'Put the three recordings in order of when they were made. What does that order prove?',
    opts: [
      'Dani spoke first, which is why Marta felt able to promise anything to Chiara at all',
      'All three were recorded after the meeting, so all three describe the same events',
      'Marta promised, then asked, then two people lay awake — the question was never real',
      'Sofía recorded hers first, and the other two are answers to what she had said there',
    ],
    correct: 2,
    explanation:
      'Twelve minutes past three, four o\'clock, ten to twelve, half past midnight. The order is the argument: by the time anybody was asked anything, the answer had already been sent to Milan.',
  },
  {
    type: 'Perspective',
    q: 'Dani\'s Italian is overstated on his file, and Sofía\'s is buried on page two of hers. What do these two facts have in common?',
    opts: [
      'Both of them deliberately misrepresented their own languages at the point of hiring',
      'Both of their files were filled in by somebody in the office rather than by them',
      'The company asked once, wrote the answer down, and never looked at a person again',
      'Italian is the only language this company has ever needed, and it never once checked',
    ],
    correct: 2,
    explanation:
      'One page says more than the truth and the other says exactly the truth, and both produce the same outcome, because neither has been read since the day it arrived. The failure is not in what people wrote. It is in nobody asking twice.',
  },
  {
    type: 'Critical Thinking',
    q: 'What is the most accurate ROOT cause of what is about to happen on Tuesday?',
    opts: [
      'A manager needed an answer more than she needed the truth, and asked accordingly',
      'Dani leaving an old line on his application across four different job applications',
      'Sofía\'s silence, which is the one thing that could still have prevented all of it',
      'The corporation sending a visitor who will not work in English for three whole days',
    ],
    correct: 0,
    explanation:
      'The stale line and the silence are real, and both come later. Look at the shape of the sentence Marta used: it was not built to find out anything. A question you cannot receive a no from is not a question, and she had already told Milan the answer.',
  },
  {
    type: 'Perspective',
    q: 'At the moment the three recordings end, who could still prevent Tuesday from going wrong?',
    opts: [
      'Only Marta, and only if Chiara tells her what the other office went through in March',
      'Nobody at all, because Mr Salvi is already on his way to the airport by that point',
      'Only Sofía, since Dani has no way of reaching Marta before the plane actually lands',
      'Dani and Sofía both can, and each has already predicted that they will not do it',
    ],
    correct: 3,
    explanation:
      'Two people, awake, nine hours apart, each holding the same sentence: I could fix this and I am not going to. The story does not tell you whether either of them moves. It makes sure you understand that both of them could.',
  },
  {
    type: 'Critical Thinking',
    q: 'Suppose Dani confesses on Tuesday morning and Sofía takes over the visit. What would still not be fixed?',
    opts: [
      'Nothing at all: the visit would go well and the whole problem would be solved',
      'Dani would still be responsible for an itinerary and a protocol he does not know',
      'The company would still have no way of knowing what its own people can do',
      'Mr Salvi would arrive and find that the promise Marta made had not been kept',
    ],
    correct: 2,
    explanation:
      'The rescue works, the visit is saved, and the cause is untouched. Sofía would be found by accident, in a crisis, at half past midnight — which is not a system for knowing who works for you. Next time it will be a different language and a different Tuesday.',
  },
];

const KEY_LANGUAGE = [
  { phrase: 'to pause your activities', meaning: 'el eufemismo de oficina para «deja todo lo demás»' },
  { phrase: 'advanced / fluent', meaning: 'las dos palabras que casi todo el mundo se pone de más en el currículum' },
  { phrase: 'rusty', meaning: 'oxidado — lo que Dani debería haber escrito hace seis años' },
  { phrase: 'door to door', meaning: 'de puerta a puerta, sin dejarlo solo en ningún momento' },
  { phrase: 'it is not my place', meaning: 'no me corresponde a mí — la excusa que Sofía se retira sola' },
  { phrase: 'to be taken apart', meaning: 'quedar destrozado en público (informal)' },
  { phrase: 'you can hear when somebody is reading', meaning: 'la prueba de Sofía: leer un idioma no es hablarlo' },
];

// ─── Historia ─────────────────────────────────────────────────────────────────

export const theInterpreter: Historia = {
  slug: 'the-interpreter',
  lang: 'ingles',
  icon: '🛬',
  color: '#b45309',
  level: 'B2',
  title: 'The Interpreter',
  tagline: 'Escribió «italiano, avanzado» en su currículum a los veintidós. Mañana a las once aterriza el señor Salvi.',
  metaTitle: 'The Interpreter — comprensión en inglés B2',
  metaDescription:
    'Puso «italiano avanzado» en el currículum hace seis años y mañana llega el señor Salvi. Tres audios, transcripción y 24 preguntas en inglés B2.',
  intro:
    'Eleven hours before an Italian director lands, three people record three messages: the man who has to interpret for him, the director who promised he could, and the colleague who actually speaks Italian and was never asked. Read the narrator, listen to all three, and answer 24 comprehension questions on vocabulary, inference, tone and critical thinking.',
  narrator: {
    paragraphs: NARRATOR_PARAGRAPHS,
    questions: NARRATOR_QS,
    tip: 'The narrator gives you four exact times. Write them down in order before you go on — one of the three speakers has an alibi hidden in them, and it is not the one you will expect.',
  },
  voices: [
    {
      key: 'a',
      name: 'Dani',
      sex: 'male',
      role: 'the employee',
      color: '#b45309',
      audioSrc: '/audio/historias/ingles/the-interpreter/a.mp3',
      paragraphs: A_PARAGRAPHS,
      questions: A_QS,
      listenHint: 'Listen carefully. There is no transcript yet — just focus on what you can understand.',
      transcriptHint: 'mark them and see their translation. Then write again what you understood.',
      write1Prompt: "Without looking at any transcript, write in your own words what you understood from Dani's voice note.",
      write1Hint: "Don't worry about being perfect — this is a first impression. Write in English or Spanish.",
      write2Prompt: 'Now write again what you understood — you can be more detailed this time.',
    },
    {
      key: 'b',
      name: 'Marta',
      sex: 'female',
      role: 'the director',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/ingles/the-interpreter/b.mp3',
      paragraphs: B_PARAGRAPHS,
      questions: B_QS,
      listenHint: 'This one was recorded earlier the same afternoon. Keep the time in mind while you listen — it matters more than anything she says.',
      transcriptHint: 'she promises five separate things. Count them, and ask yourself which one she had checked.',
      write1Prompt: "Without the transcript, write in your own words what you understood from Marta's voice note.",
      write1Hint: 'What exactly is she promising, and to whom? Write in English or Spanish.',
      write2Prompt: "Now write again what you understood from Marta's perspective.",
    },
    {
      key: 'c',
      name: 'Sofía',
      sex: 'female',
      role: 'the colleague',
      color: '#166534',
      audioSrc: '/audio/historias/ingles/the-interpreter/c.mp3',
      paragraphs: C_PARAGRAPHS,
      questions: C_QS,
      listenHint: 'The third voice was in the room and says nothing about herself for a full minute. Wait for the moment she does.',
      transcriptHint: 'she gives one reason for her silence and then takes it back. Find both.',
      write1Prompt: "Without the transcript, write in your own words what you understood from Sofía's voice note.",
      write1Hint: 'What has she known, for how long, and why has she said nothing? Write in English or Spanish.',
      write2Prompt: "Now write again what you understood from Sofía's perspective.",
    },
  ],
  finalQuestions: FINAL_QS,
  finalIntro: [
    'You now hold all four times and all three secrets. Marta does not know that the man she promised cannot do it. Dani does not know that the woman three doors down has spoken Italian her whole life. Sofía knows both of those things and has been awake since midnight deciding not to send one message.',
    'These questions ask you to put the recordings in order — because in this story the order is the argument — and then to work out what would still be broken even if everything went right on Tuesday.',
  ],
  dict: DICT,
  keyLanguage: KEY_LANGUAGE,
  discussion: {
    question: 'Sofía can fix this tonight with one message, and Dani can fix it tomorrow morning with one sentence. Neither of them is going to. Which silence is worse, and why?',
    note: 'There is no single correct answer. Defend your position with specific words from the three recordings. And one question that is not about the story: what does your own CV say about your languages, and how long ago did you write that line? Dani was not lying when he wrote his. He was twenty-two, and it was almost true.',
  },
  ui: 'en',
};

export default theInterpreter;
