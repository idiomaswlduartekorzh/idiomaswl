'use client';

import QuestEngine from '@/components/practica/QuestEngine';
import type { QuestLevel, QuestGuide } from '@/components/practica/QuestEngine';

const guide: QuestGuide = {
  title: 'English Grammar A2 — Guía de referencia',
  body: "Los 5 pilares del inglés A2: past simple (went/didn't go), comparativos/superlativos (taller/the tallest), presente continuo (is sleeping), going to vs will (planes vs decisiones espontáneas) y verbos modales (can/could/would/should).\nEn A1 usabas solo el presente; en A2 narras el pasado, comparas cosas, hablas de planes futuros y expresas cortesía.",
  tip: "Error más común: 'Did she went?' → NUNCA verbo en pasado después de did/didn't. Siempre verbo BASE: 'Did she go?' / 'I didn't see'. 'More tall' no existe → 'taller'. Regla CVC: big→bigger, hot→hotter (dobla la consonante final).",
  tableHead: ['Tema', 'Regla clave', 'Ejemplo'],
  tableRows: [
    ['Past Simple', "reg: +ed · irreg: memorizar · neg: didn't + base", "She went · I didn't see · Did you go?"],
    ['Comparatives', "-er/more + than · -est/most · good→better→best", "taller than · more interesting · the best"],
    ['Pres. Continuous', 'am/is/are + -ing · ahora o plan confirmado', "She is sleeping · I'm meeting her tomorrow"],
    ['Going to / Will', "going to = plan previo · will = decisión ahora", "I'm going to study · I'll get it!"],
    ['Modals', 'can (habilidad) · could (pasado/cortés) · should (consejo) · would (oferta)', "Could you help? · You should rest"],
  ],
};

const levels: QuestLevel[] = [
  {
    type: 'choice',
    icon: '⏰',
    title: 'Past Simple — went, didn\'t, Did you...?',
    desc: "Regular verbs: +ed (walk→walked). Irregular: memorize (go→went, see→saw, have→had). Negative: didn't + verb BASE. Question: Did + subject + verb BASE?",
    items: [
      { text: "She ___ to the cinema last night.", opts: ['go', 'goes', 'went', 'gone'], ans: 'went', hint: "'Went' = pasado irregular de 'go'. Nunca 'goed'." },
      { text: "They ___ (not) finish the project on time.", opts: ["didn't", "don't", "wasn't", "weren't"], ans: "didn't", hint: "'Didn't' + verbo base: 'didn't finish'. Para todas las personas." },
      { text: "___ you enjoy the party last weekend?", opts: ['Did', 'Do', 'Were', 'Was'], ans: 'Did', hint: "'Did you...?' = pregunta en pasado simple. 'Do' es presente." },
      { text: "I ___ my keys this morning.", opts: ['lose', 'lost', 'losted', 'was losing'], ans: 'lost', hint: "'Lost' = pasado de 'lose' (irregular). 'Losted' no existe." },
      { text: "We ___ a beautiful sunset on the beach.", opts: ['saw', 'see', 'seed', 'seen'], ans: 'saw', hint: "'Saw' = pasado de 'see'. 'Seen' es participio — requiere have." },
      { text: "Reescribe en pasado: She wakes up at 7 every day. (yesterday)", opts: ["She woke up at 7 yesterday.", "She wake up at 7 yesterday.", "She did wake up at 7 yesterday.", "She waked up at 7 yesterday."], ans: "She woke up at 7 yesterday.", hint: "'Woke' = pasado irregular de 'wake'. El presente 'wakes' desaparece." },
      { text: "Convierte a negativo: He finished the report on Friday.", opts: ["He didn't finish the report on Friday.", "He doesn't finished the report on Friday.", "He didn't finished the report on Friday.", "He wasn't finish the report on Friday."], ans: "He didn't finish the report on Friday.", hint: "Negativo pasado: 'didn't + verbo BASE' (finish). Nunca 'didn't finished'." },
      { text: "Forma una pregunta: They visited Paris last summer.", opts: ["Did they visit Paris last summer?", "Visited they Paris last summer?", "Did they visited Paris last summer?", "Were they visiting Paris last summer?"], ans: "Did they visit Paris last summer?", hint: "Pregunta pasado: 'Did + sujeto + verbo BASE'." },
      { text: "Encuentra el error: Did she went to the party last night?", opts: ["'went' debe ser 'go'", "'did' debe ser 'was'", "'last night' debe ir al inicio", "No hay error"], ans: "'went' debe ser 'go'", hint: "Después de 'did', verbo BASE: 'Did she go?' Nunca 'Did she went?'" },
      { text: "Encuentra el error: I didn't saw the film last week.", opts: ["'didn't' debe ser 'don't'", "'saw' debe ser 'see'", "'last week' debe ser 'yesterday'", "No hay error"], ans: "'saw' debe ser 'see'", hint: "'Didn't' ya indica pasado — verbo vuelve a la base: 'I didn't see'." },
    ],
  },
  {
    type: 'choice',
    icon: '📊',
    title: 'Comparatives & Superlatives',
    desc: "Short adjectives: add -er/-est (fast→faster/fastest). Long adjectives (3+ syllables): more/most + adj. Irregular: good→better→best, bad→worse→worst. CVC: double the consonant (big→bigger).",
    items: [
      { text: "Mount Everest is ___ mountain in the world.", opts: ['the highest', 'the most high', 'higher', 'most highest'], ans: 'the highest', hint: "Superlativo de 'high' (corto): high→higher→the highest." },
      { text: "My new phone is ___ than my old one.", opts: ['more expensive', 'expensiver', 'most expensive', 'the most expensive'], ans: 'more expensive', hint: "Comparativo de adjetivo largo (3+ sílabas): more + adj + than." },
      { text: "Today is ___ than yesterday.", opts: ['hotter', 'more hot', 'hoter', 'most hot'], ans: 'hotter', hint: "'Hot' sigue el patrón CVC: dobla la t → hotter." },
      { text: "She is ___ student in the class.", opts: ['the best', 'the most good', 'the goodest', 'better'], ans: 'the best', hint: "Superlativo irregular de 'good': good→better→the best." },
      { text: "This film is ___ than the book.", opts: ['worse', 'more bad', 'worst', 'badder'], ans: 'worse', hint: "Comparativo irregular de 'bad': bad→worse→the worst." },
      { text: "Expresa igualdad: My city is beautiful. Your city is also beautiful.", opts: ["My city is as beautiful as yours.", "My city is more beautiful as yours.", "My city is beautiful than yours.", "My city is as beautiful than yours."], ans: "My city is as beautiful as yours.", hint: "Igualdad: 'as + adjective + as'. Siempre 'as', no 'than'." },
      { text: "Usa el superlativo: The Amazon is a very long river. (en el mundo)", opts: ["The Amazon is the longest river in the world.", "The Amazon is the most long river in the world.", "The Amazon is longer river in the world.", "The Amazon is the most longest river in the world."], ans: "The Amazon is the longest river in the world.", hint: "Superlativo corto: 'the + adj + -est'. Long→the longest." },
      { text: "Corrige: Paris is more beautiful that London.", opts: ["Paris is more beautiful than London.", "Paris is most beautiful than London.", "Paris is beautifuller than London.", "Paris is as beautiful London."], ans: "Paris is more beautiful than London.", hint: "Comparativo: 'more + adj + THAN'. 'That' es incorrecto — siempre 'than'." },
      { text: "Encuentra el error: She is more tall than her sister.", opts: ["'more tall' → 'taller'", "'than' → 'that'", "'is' → 'are'", "No hay error"], ans: "'more tall' → 'taller'", hint: "'Tall' es adjetivo corto → comparativo con -er: 'taller than'." },
      { text: "Encuentra el error: This is the most good film I have ever seen.", opts: ["'most good' → 'best'", "'have ever' → 'ever have'", "'most good' → 'goodest'", "No hay error"], ans: "'most good' → 'best'", hint: "Irregular: good → better → THE BEST. 'Most good' no existe." },
    ],
  },
  {
    type: 'choice',
    icon: '🔄',
    title: 'Present Continuous — is/are + -ing',
    desc: "Form: am/is/are + verb-ing. Uses: (1) Action happening RIGHT NOW. (2) Future arrangement already confirmed. Spelling: remove -e (have→having), double consonant if CVC (run→running).",
    items: [
      { text: "Shhh! The baby ___ .", opts: ['is sleeping', 'sleeps', 'sleep', 'sleeping'], ans: 'is sleeping', hint: "'Is sleeping' — acción exactamente ahora. 'Shhh!' indica presente inmediato." },
      { text: "I ___ my friend for lunch tomorrow — she already confirmed.", opts: ['am meeting', 'meet', 'will meet', 'meets'], ans: 'am meeting', hint: "'Am meeting' — arreglo futuro ya confirmado (no es una intención vaga)." },
      { text: "What ___ you ___ right now?", opts: ['are / doing', 'do / do', 'is / do', 'were / doing'], ans: 'are / doing', hint: "'Are you doing?' — pregunta en present continuous para acción en progreso ahora." },
      { text: "They ___ to Paris next week — the flights are booked.", opts: ['are flying', 'fly', 'will fly', 'flew'], ans: 'are flying', hint: "'Are flying' — vuelos reservados = arreglo futuro confirmado → present continuous." },
      { text: "She ___ (not) pay attention in class right now.", opts: ["isn't paying", "doesn't pay", "wasn't paying", "won't pay"], ans: "isn't paying", hint: "'Isn't paying' — negativo present continuous = is not + verbo-ing." },
      { text: "Convierte al pres. continuo: She works from home. (right now)", opts: ["She is working from home right now.", "She working from home right now.", "She does working from home.", "She works from home right now."], ans: "She is working from home right now.", hint: "Present continuous: 'She IS working from home right now.' Añade 'is' + verb-ing." },
      { text: "Expresa un arreglo futuro: I have a meeting with the boss. (tomorrow at 10am — scheduled)", opts: ["I am meeting the boss tomorrow at 10.", "I will meet the boss tomorrow at 10.", "I meet the boss tomorrow at 10.", "I going to meet the boss tomorrow at 10."], ans: "I am meeting the boss tomorrow at 10.", hint: "Arreglo ya fijado = present continuous: 'I am meeting the boss tomorrow at 10.'" },
      { text: "Haz negativo: He is coming to dinner tonight.", opts: ["He isn't coming to dinner tonight.", "He not coming to dinner tonight.", "He doesn't coming to dinner tonight.", "He isn't come to dinner tonight."], ans: "He isn't coming to dinner tonight.", hint: "Negativo: 'He isn't (is not) coming'. El -ing se mantiene." },
      { text: "Encuentra el error: I am go to the gym now.", opts: ["'go' → 'going'", "'am' → 'is'", "'now' → 'right now'", "No hay error"], ans: "'go' → 'going'", hint: "Present continuous necesita verb + -ing: 'I am GOING to the gym now.'" },
      { text: "Encuentra el error: She are studying right now.", opts: ["'are' → 'is'", "'studying' → 'study'", "'right now' → 'now'", "No hay error"], ans: "'are' → 'is'", hint: "Con 'she' el auxiliar es 'IS': 'She IS studying'. 'Are' es para we/you/they." },
    ],
  },
  {
    type: 'choice',
    icon: '🔮',
    title: 'Going to vs Will',
    desc: "'Going to': plan/intention decided BEFORE speaking, or prediction based on visible evidence. 'Will': spontaneous decision made AT the moment of speaking, or prediction based on belief/opinion (I think, probably).",
    items: [
      { text: "A: 'The phone is ringing!' B: 'Don't worry, ___ answer it.'", opts: ["I'll", "I'm going to", "I'm", "I was going to"], ans: "I'll", hint: "'I'll answer it' — decisión tomada en el momento. Uso espontáneo de 'will'." },
      { text: "I ___ learn Korean next year — I've already enrolled in a course.", opts: ["'m going to", "'ll", "would", "am"], ans: "'m going to", hint: "'I'm going to learn' — intención ya decidida con preparación (inscripción)." },
      { text: "Look at those clouds — it ___ rain.", opts: ["'s going to", "'ll", "would", "is"], ans: "'s going to", hint: "'It's going to rain' — predicción basada en evidencia visible (las nubes)." },
      { text: "I think technology ___ change our lives completely.", opts: ["will", "is going to", "would", "is"], ans: "will", hint: "'Will change' — predicción de opinión ('I think'), no evidencia física." },
      { text: "She ___ become a doctor. She has wanted this since she was 5.", opts: ["'s going to", "'ll", "would", "is"], ans: "'s going to", hint: "'She's going to become' — plan de largo plazo ya decidido." },
      { text: "Usa 'will' — decisión espontánea: Someone asks for help with their suitcase. You say:", opts: ["I'll help you with that!", "I'm going to help you with that!", "I help you with that!", "I would help you with that!"], ans: "I'll help you with that!", hint: "Respuesta espontánea a una petición = WILL: 'I'll help you!'" },
      { text: "Usa 'going to' — plan ya decidido: You already booked flights to Barcelona. Tell a friend:", opts: ["I'm going to fly to Barcelona next month.", "I'll fly to Barcelona next month.", "I fly to Barcelona next month.", "I am planning flying to Barcelona."], ans: "I'm going to fly to Barcelona next month.", hint: "Vuelo ya reservado = plan previo → going to." },
      { text: "Predicción con evidencia — A baby is about to fall. You warn the parent:", opts: ["She's going to fall!", "She'll fall!", "She falls!", "She is falling!"], ans: "She's going to fall!", hint: "Evidencia inmediata y visible = going to. La caída está a punto de ocurrir." },
      { text: "Encuentra el error: Je vais à voyager en Espagne cet été.", opts: ["'vais à voyager' → 'vais voyager' (going to = aller + inf. direct)", "'cet été' → 'cette été'", "'en' → 'à'", "No hay error"], ans: "'vais à voyager' → 'vais voyager' (going to = aller + inf. direct)", hint: "Going to = aller + INFINITIF (sin 'à'). Nota: este es un ejemplo del francés." },
      { text: "Encuentra el error: Look at those clouds. It wills rain soon.", opts: ["'wills' → 'will'", "'soon' → 'later'", "'It' → 'This'", "No hay error"], ans: "'wills' → 'will'", hint: "'Will' es un modal y NUNCA lleva -s en ninguna persona. Los modales son invariables." },
    ],
  },
  {
    type: 'choice',
    icon: '🎯',
    title: 'Modal Verbs — Can, Could, Would, Should',
    desc: "CAN: present ability or informal permission. COULD: past ability or polite request. WOULD: polite offer/request. SHOULD: advice/recommendation. After ALL modals: ALWAYS verb base (no -s, -ing, -ed, no 'to').",
    items: [
      { text: "___ you speak French when you were a child?", opts: ['Could', 'Can', 'Should', 'Would'], ans: 'Could', hint: "'Could' — habilidad en el pasado. 'Could you speak' = ¿Podías hablar? (de niño)." },
      { text: "You look tired. You ___ go to sleep earlier.", opts: ['should', 'could', 'would', 'can'], ans: 'should', hint: "'Should' — consejo/recomendación." },
      { text: "___ you pass the salt, please? (formal)", opts: ['Could', 'Can', 'Should', 'Would'], ans: 'Could', hint: "'Could you pass...?' — petición formal. Más cortés que 'Can you pass...?'" },
      { text: "'___ you like some coffee?' 'Yes, please.'", opts: ['Would', 'Could', 'Should', 'Can'], ans: 'Would', hint: "'Would you like...?' — oferta muy cortés. Fórmula fija en inglés." },
      { text: "She ___ (not) eat so much fast food. It is not good for you.", opts: ["shouldn't", "couldn't", "wouldn't", "can't"], ans: "shouldn't", hint: "'Shouldn't eat' — consejo negativo (no deberías hacer algo)." },
      { text: "Convierte a petición formal con 'could': Help me with this, please.", opts: ["Could you help me with this, please?", "Could you helping me with this?", "You could help me with this, please?", "Should you help me with this?"], ans: "Could you help me with this, please?", hint: "Petición formal: 'Could you + verb base + ...?' Siempre verbo base." },
      { text: "Da un consejo con 'should': My friend has a bad cold.", opts: ["She should see a doctor and rest.", "She could sees a doctor and rest.", "She would see a doctor and rest.", "She can to see a doctor and rest."], ans: "She should see a doctor and rest.", hint: "Consejo: 'should + verb base'. Después de modal, siempre verbo base (sin to)." },
      { text: "Usa 'couldn't' para habilidad negativa: When I was 5, I had no swimming ability.", opts: ["I couldn't swim when I was 5.", "I can't swim when I was 5.", "I wasn't swimming when I was 5.", "I didn't could swim when I was 5."], ans: "I couldn't swim when I was 5.", hint: "'Couldn't swim' = no podía nadar. 'Didn't could' NO existe — 'could' ya es el pasado." },
      { text: "¿Es 'could' correcto? You could eat more vegetables. Doctors strongly recommend it.", opts: ["No: debería ser 'should' (consejo fuerte)", "No: debería ser 'would' (condicional)", "No: debería ser 'can' (habilidad)", "Sí, 'could' está perfectamente bien"], ans: "No: debería ser 'should' (consejo fuerte)", hint: "'Should' = consejo/recomendación médica. 'Could' solo sugiere posibilidad." },
      { text: "Encuentra el error: I didn't could swim when I was young.", opts: ["'didn't could' → 'couldn't'", "'swim' → 'swimming'", "'when I was young' → 'when young'", "No hay error"], ans: "'didn't could' → 'couldn't'", hint: "'Could' ya ES el pasado de 'can'. Para negar: 'couldn't'. 'Didn't could' NO existe." },
    ],
  },
  {
    type: 'sprint',
    icon: '⚡',
    title: 'Sprint — all topics!',
    desc: 'Mix of all 5 A2 topics. Write fast!',
    inputWidth: 85,
    items: [
      { text: "She ___ to the cinema last night. (go, past)", ans: "went", hint: "go → went (irregular)" },
      { text: "___ you enjoy the party last weekend? (past question)", ans: "Did", hint: "preguntas pasado → Did + verbo base" },
      { text: "Today is ___ than yesterday. (hot, CVC)", ans: "hotter", hint: "CVC: hot → hotter (dobla t)" },
      { text: "This film is ___ than the book. (bad, irregular)", ans: "worse", hint: "bad → worse (irregular)" },
      { text: "Shhh! The baby ___ . (right now)", ans: "is sleeping", hint: "present continuous: is + -ing" },
      { text: "She ___ (not) pay attention in class right now.", ans: "isn't paying", hint: "negativo pres. cont.: isn't + -ing" },
      { text: "A: 'The phone!' B: 'Don't worry, ___ answer it.' (spontaneous)", ans: "I'll", hint: "decisión espontánea → will: I'll" },
      { text: "I think technology ___ change our lives completely.", ans: "will", hint: "predicción de opinión → will" },
      { text: "___ you speak French when you were a child?", ans: "Could", hint: "habilidad pasada → Could" },
      { text: "You look tired. You ___ go to sleep earlier.", ans: "should", hint: "consejo → should" },
    ],
  },
];

export default function GramaticaInglesA2() {
  return (
    <QuestEngine
      color="#0066cc"
      flag="🇬🇧"
      storageKey="quest-en-a2-grammatik"
      guide={guide}
      levels={levels}
      backHref="/practica/ingles/a2"
      backLabel="English A2"
      title="Grammar A2"
      subtitle="English A2 — Grammar"
    />
  );
}
