'use client';
import { useState } from 'react';
import Link from 'next/link';

const C = '#7c3aed';

interface FQ { s: string; opts: string[]; a: number; fb: string; }
interface TQ { prompt: string; s: string; opts: string[]; a: number; fb: string; }
interface EQ { s: string; q: string; opts: string[]; a: number; fb: string; }
interface Topic {
  id: string; title: string; icon: string;
  rule: string; tip: string;
  table: { headers: string[]; rows: string[][] };
  a1note: string; examples: string[];
  fills: FQ[]; transforms: TQ[]; errors: EQ[]; production: string;
}

const TOPICS: Topic[] = [
  {
    id: 'past_simple', title: 'Past Simple', icon: '⏰',
    rule: "Regular verbs: add -ed (walk→walked, finish→finished). Irregular verbs must be memorized (go→went, see→saw, have→had, come→came, buy→bought, eat→ate, take→took, make→made). Negative: didn't + verb base. Question: Did + subject + verb base?",
    tip: "Key trap: after 'did/didn't', ALWAYS use the verb BASE — never the past form! 'Did she go?' (correct) vs 'Did she went?' (wrong). 'I didn't see.' (correct) vs 'I didn't saw.' (wrong).",
    table: {
      headers: ['', 'Afirmativo', 'Negativo', 'Pregunta'],
      rows: [
        ['Regular (walk)', 'I / She walked', "I / She didn't walk", 'Did I / she walk?'],
        ['Irregular (go)', 'I / She went', "I / She didn't go", 'Did I / she go?'],
        ['Verb to be', 'I was / They were', "I wasn't / They weren't", 'Was I? / Were they?'],
      ]
    },
    a1note: "En A1 usaste el presente simple: 'I go to school every day' (habito). En A2, el pasado simple narra eventos terminados: 'Yesterday I went to school late.' Habito = presente; evento completo en el pasado = pasado simple.",
    examples: [
      "Yesterday, I called my mum and we talked for an hour. (regular: called / talked = -ed)",
      "Did you see the match last night? We won! (irregular: see→saw, win→won; pregunta con Did)",
      "She didn't come to the party because she wasn't feeling well. (didn't + verb base)",
    ],
    fills: [
      { s: "She ___ to the cinema last night.", opts: ['go', 'goes', 'went', 'gone'], a: 2, fb: "'Went' = pasado irregular de 'go'. Nunca usamos 'goed'." },
      { s: "They ___ (not) finish the project on time.", opts: ["didn't", "don't", "wasn't", "weren't"], a: 0, fb: "'Didn't' + verbo base: 'didn't finish'. Para negaciones pasadas con cualquier sujeto." },
      { s: "___ you enjoy the party last weekend?", opts: ['Did', 'Do', 'Were', 'Was'], a: 0, fb: "'Did you...?' = pregunta en pasado simple. 'Do' es presente, no pasado." },
      { s: "I ___ my keys this morning.", opts: ['lose', 'lost', 'losted', 'was losing'], a: 1, fb: "'Lost' = pasado de 'lose' (irregular). 'Losted' no existe en ingles." },
      { s: "We ___ a beautiful sunset on the beach.", opts: ['saw', 'see', 'seed', 'seen'], a: 0, fb: "'Saw' = pasado de 'see'. 'Seen' es participio — requiere have." },
    ],
    transforms: [
      { prompt: "Reescribe en pasado simple:", s: "She wakes up at 7 every day. (yesterday)", opts: ["She woke up at 7 yesterday.", "She wake up at 7 yesterday.", "She did wake up at 7 yesterday.", "She waked up at 7 yesterday."], a: 0, fb: "'Woke' = pasado irregular de 'wake' (wake→woke→woken). El presente 'wakes' desaparece." },
      { prompt: "Convierte a negativo:", s: "He finished the report on Friday.", opts: ["He didn't finish the report on Friday.", "He doesn't finished the report on Friday.", "He didn't finished the report on Friday.", "He wasn't finish the report on Friday."], a: 0, fb: "Negativo pasado: 'didn't + verbo BASE' (finish). Nunca 'didn't finished' — el verbo vuelve a la base." },
      { prompt: "Forma una pregunta:", s: "They visited Paris last summer.", opts: ["Did they visit Paris last summer?", "Visited they Paris last summer?", "Did they visited Paris last summer?", "Were they visiting Paris last summer?"], a: 0, fb: "Pregunta pasado: 'Did + sujeto + verbo BASE'. 'Did they visit?' — el verbo vuelve a la forma base." },
    ],
    errors: [
      { s: "Did she went to the party last night?", q: "¿Que esta mal?", opts: ["'went' debe ser 'go'", "'did' debe ser 'was'", "'last night' debe ir al inicio", "No hay error"], a: 0, fb: "Despues de 'did', el verbo va en su forma base: 'Did she go?' Nunca 'Did she went?' — es el error mas comun." },
      { s: "I didn't saw the film last week.", q: "¿Cual es el error?", opts: ["'didn't' debe ser 'don't'", "'saw' debe ser 'see'", "'last week' debe ser 'yesterday'", "No hay error"], a: 1, fb: "'Didn't' ya indica pasado — el verbo vuelve a la base: 'I didn't see'. 'Saw' no va despues de 'didn't'." },
    ],
    production: "Write 3-4 sentences about a memorable past event (a trip, a celebration, or an achievement). Use at least 2 irregular verbs from this list: went / saw / ate / had / came / bought. Start with: 'Last [month/year/week], I...'"
  },
  {
    id: 'comparatives', title: 'Comparatives & Superlatives', icon: '📊',
    rule: "Short adjectives (1-2 syllables): add -er/-est (fast→faster/fastest, happy→happier/happiest). Long adjectives (3+ syllables): more/most + adjective. Irregular: good→better→best, bad→worse→worst. Equal comparison: as + adjective + as.",
    tip: "Double the final consonant with CVC pattern: big→bigger, hot→hotter, thin→thinner. Change y→i before -er/-est: easy→easier, heavy→heavier. NEVER 'more' + short adjective: 'more big' is wrong → 'bigger' is correct.",
    table: {
      headers: ['Tipo', 'Adjetivo', 'Comparativo', 'Superlativo'],
      rows: [
        ['Corto', 'tall / fast', 'taller / faster than', 'the tallest / fastest'],
        ['CVC doble', 'big / hot', 'bigger / hotter than', 'the biggest / hottest'],
        ['-y → -ier', 'happy / easy', 'happier / easier than', 'the happiest / easiest'],
        ['Largo', 'interesting', 'more interesting than', 'the most interesting'],
        ['Irregular', 'good / bad', 'better / worse than', 'the best / worst'],
        ['Igualdad', '-', 'as + adj + as', '-'],
      ]
    },
    a1note: "En A1 usabas adjetivos simples: 'She is tall. The film is good.' En A2 comparas: 'She is taller than me. This film is better than that one. It was the most exciting film I have ever seen.'",
    examples: [
      "Bogota is bigger than Medellin, but Medellin has a warmer climate. (bigger = short adj -er)",
      "The IELTS exam is more difficult than I expected. (more + long adjective)",
      "That was the best meal I have eaten in years — even better than the restaurant! (irregular: best)",
    ],
    fills: [
      { s: "Mount Everest is ___ mountain in the world.", opts: ['the highest', 'the most high', 'higher', 'most highest'], a: 0, fb: "'The highest' — superlativo de 'high' (corto): high→higher→the highest." },
      { s: "My new phone is ___ than my old one.", opts: ['more expensive', 'expensiver', 'most expensive', 'the most expensive'], a: 0, fb: "'More expensive' — comparativo de adjetivo largo (3 silabas): more + adj + than." },
      { s: "Today is ___ than yesterday.", opts: ['hotter', 'more hot', 'hoter', 'most hot'], a: 0, fb: "'Hotter' — 'hot' sigue el patron CVC: dobla la t → hotter." },
      { s: "She is ___ student in the class.", opts: ['the best', 'the most good', 'the goodest', 'better'], a: 0, fb: "'The best' — superlativo irregular de 'good': good→better→the best." },
      { s: "This film is ___ than the book.", opts: ['worse', 'more bad', 'worst', 'badder'], a: 0, fb: "'Worse' — comparativo irregular de 'bad': bad→worse→the worst." },
    ],
    transforms: [
      { prompt: "Expresa igualdad con 'as...as':", s: "My city is beautiful. Your city is also beautiful.", opts: ["My city is as beautiful as yours.", "My city is more beautiful as yours.", "My city is beautiful than yours.", "My city is as beautiful than yours."], a: 0, fb: "Igualdad: 'as + adjective + as'. 'My city is as beautiful as yours.' — igualdad, no superioridad." },
      { prompt: "Usa el superlativo:", s: "The Amazon is a very long river. (en el mundo)", opts: ["The Amazon is the longest river in the world.", "The Amazon is the most long river in the world.", "The Amazon is longer river in the world.", "The Amazon is the most longest river in the world."], a: 0, fb: "Superlativo de adjetivo corto: 'the + adj + -est'. 'Long→the longest'. 'In the world' para lugares." },
      { prompt: "Corrige el comparativo erroneo:", s: "Paris is more beautiful that London.", opts: ["Paris is more beautiful than London.", "Paris is most beautiful than London.", "Paris is beautifuller than London.", "Paris is as beautiful London."], a: 0, fb: "Comparativo de superioridad: 'more + adj + THAN'. 'That' es incorrecto — siempre se usa 'than'." },
    ],
    errors: [
      { s: "She is more tall than her sister.", q: "¿Que esta mal?", opts: ["'more tall' → 'taller'", "'than' → 'that'", "'is' → 'are'", "No hay error"], a: 0, fb: "'Tall' es adjetivo corto (1 silaba) → comparativo con -er: 'taller than'. 'More tall' es incorrecto." },
      { s: "This is the most good film I have ever seen.", q: "¿Cual es el error?", opts: ["'most good' → 'best'", "'have ever' → 'ever have'", "'most good' → 'goodest'", "No hay error"], a: 0, fb: "'Good' es irregular: good → better → THE BEST. 'Most good' no existe en ingles." },
    ],
    production: "Compare your city or neighbourhood with another place you know well. Write 3-4 sentences using at least 2 comparative structures (-er / more...than) and 1 superlative (the most / the -est). Example: '[City A] is __ than [City B], but [City B] has the most __.'",
  },
  {
    id: 'present_continuous', title: 'Present Continuous', icon: '🔄',
    rule: "Form: am/is/are + verb-ing. Uses: (1) Action happening RIGHT NOW at the moment of speaking. (2) Future arrangement already confirmed and specific — already in your calendar. Spelling: remove -e before -ing (have→having); double consonant if CVC (run→running); -ie → -y+ing (lie→lying).",
    tip: "Cannot use with stative verbs (mental state, possession): know, understand, love, hate, want, need, have (possession), seem. Say 'I know you' — NEVER 'I am knowing you'. For future: continuous = already arranged with someone else.",
    table: {
      headers: ['Sujeto', 'Afirmativo', 'Negativo', 'Pregunta'],
      rows: [
        ['I', 'am working', 'am not working', 'Am I working?'],
        ['He / She / It', "is working (isn't)", "isn't working", 'Is she working?'],
        ['We / You / They', "are working (aren't)", "aren't working", 'Are they working?'],
        ['Spelling -e', 'have → having', 'make → making', 'write → writing'],
        ['Spelling CVC', 'run → running', 'sit → sitting', 'swim → swimming'],
      ]
    },
    a1note: "En A1 usaste el presente simple para habitos ('I work every day'). El presente continuo en A2 describe lo que pasa AHORA MISMO ('I am working now') o planes ya confirmados ('I am having dinner with Ana tomorrow' — ya tiene cita fija, no es solo intencion).",
    examples: [
      "Shhh! The baby is sleeping. (accion exactamente ahora — interrumpir seria un error)",
      "I am meeting my friend for coffee tomorrow at 3pm. She already confirmed. (arreglo futuro fijo)",
      "They are not coming to the party tonight — they cancelled this morning. (plan cancelado, negativo)",
    ],
    fills: [
      { s: "Shhh! The baby ___ .", opts: ['is sleeping', 'sleeps', 'sleep', 'sleeping'], a: 0, fb: "'Is sleeping' — accion que ocurre exactamente ahora. La senal 'Shhh!' indica presente inmediato." },
      { s: "I ___ my friend for lunch tomorrow — she already confirmed.", opts: ['am meeting', 'meet', 'will meet', 'meets'], a: 0, fb: "'Am meeting' — arreglo futuro ya confirmado. No es una intencion vaga, es un plan concreto." },
      { s: "What ___ you ___ right now?", opts: ['are / doing', 'do / do', 'is / do', 'were / doing'], a: 0, fb: "'Are you doing?' — pregunta en present continuous para accion en progreso ahora." },
      { s: "They ___ to Paris next week — the flights are booked.", opts: ['are flying', 'fly', 'will fly', 'flew'], a: 0, fb: "'Are flying' — vuelos reservados = arreglo futuro confirmado → present continuous." },
      { s: "She ___ (not) pay attention in class right now.", opts: ["isn't paying", "doesn't pay", "wasn't paying", "won't pay"], a: 0, fb: "'Isn't paying' — negativo present continuous = is not + verbo-ing." },
    ],
    transforms: [
      { prompt: "Convierte al presente continuo (ahora mismo):", s: "She works from home. (right now)", opts: ["She is working from home right now.", "She working from home right now.", "She does working from home.", "She works from home right now."], a: 0, fb: "Present continuous: 'She IS working from home right now.' Aniade 'is' + verb-ing." },
      { prompt: "Expresa un arreglo futuro confirmado:", s: "I have a meeting with the boss. (tomorrow at 10am — it is scheduled)", opts: ["I am meeting the boss tomorrow at 10.", "I will meet the boss tomorrow at 10.", "I meet the boss tomorrow at 10.", "I going to meet the boss tomorrow at 10."], a: 0, fb: "Arreglo ya fijado en la agenda = present continuous: 'I am meeting the boss tomorrow at 10.'" },
      { prompt: "Haz negativo:", s: "He is coming to dinner tonight.", opts: ["He isn't coming to dinner tonight.", "He not coming to dinner tonight.", "He doesn't coming to dinner tonight.", "He isn't come to dinner tonight."], a: 0, fb: "Negativo: 'He isn't (is not) coming'. El -ing se mantiene. 'Not coming' — nunca 'not come'." },
    ],
    errors: [
      { s: "I am go to the gym now.", q: "¿Que esta mal?", opts: ["'go' → 'going'", "'am' → 'is'", "'now' → 'right now'", "No hay error"], a: 0, fb: "Present continuous necesita verb + -ing: 'I am GOING to the gym now.' 'I am go' es incorrecto — falta el -ing." },
      { s: "She are studying right now.", q: "¿Cual es el error?", opts: ["'are' → 'is'", "'studying' → 'study'", "'right now' → 'now'", "No hay error"], a: 0, fb: "Con 'she' (3a persona singular) el auxiliar es 'IS': 'She IS studying'. 'Are' es para we/you/they." },
    ],
    production: "Write 3 sentences: (1) Something you are doing right now or today; (2) A confirmed plan you have for this week (a specific meeting or event); (3) Something you are NOT doing this month (and why). Use present continuous for all three.",
  },
  {
    id: 'going_to_will', title: "Going to vs Will", icon: '🔮',
    rule: "'Going to': plan/intention already decided BEFORE the moment of speaking. Also for predictions based on visible evidence. 'Will': spontaneous decision made AT the moment of speaking. Also for predictions based on belief/opinion (often with 'I think', 'probably', 'I believe').",
    tip: "Quick test: Did you decide BEFORE the conversation? → going to. Did you decide just NOW? → will. Evidence you can see? → going to ('Look! It is going to rain' — you see clouds). Prediction in your head, no evidence? → will ('I think it will be cold').",
    table: {
      headers: ['Estructura', 'Cuando usarla', 'Senal tipica', 'Ejemplo'],
      rows: [
        ["going to", 'Plan ya decidido antes', 'ya lo plane, ya decidi', "I am going to study medicine."],
        ["going to", 'Prediccion con evidencia', 'Look! I can see...', "It is going to rain (nubes visibles)."],
        ["will", 'Decision espontanea ahora', "OK, I'll... / Sure, I'll...", "A: The phone! B: I'll get it!"],
        ["will", 'Prediccion de opinion', 'I think, probably', "I think this film will be good."],
      ]
    },
    a1note: "En A1 hablabas del futuro con presente simple ('The class starts at 8'). En A2, el ingles distingue entre la decision espontanea (will) y el plan previo (going to). Esta distincion es clave para sonar natural en conversaciones reales.",
    examples: [
      "A: 'The phone is ringing!' B: 'I'll get it!' (decision espontanea en reaccion — will)",
      "I am going to take an IELTS course next year — I already researched the options. (plan previo — going to)",
      "Look at those clouds — it is going to rain. Take an umbrella! (evidencia visible — going to)",
    ],
    fills: [
      { s: "A: 'The phone is ringing!' B: 'Don't worry, ___ answer it.'", opts: ["I'll", "I'm going to", "I'm", "I was going to"], a: 0, fb: "'I'll answer it' — decision tomada en el momento de escuchar el telefono. Clasico uso espontaneo de 'will'." },
      { s: "I ___ learn Korean next year — I've already enrolled in a course.", opts: ["'m going to", "'ll", "would", "am"], a: 0, fb: "'I'm going to learn' — intencion ya decidida con preparacion (inscripcion). → going to." },
      { s: "Look at those clouds — it ___ rain.", opts: ["'s going to", "'ll", "would", "is"], a: 0, fb: "'It's going to rain' — prediccion basada en evidencia visible (las nubes). Going to = evidencia presente." },
      { s: "I think technology ___ change our lives completely.", opts: ["will", "is going to", "would", "is"], a: 0, fb: "'Will change' — prediccion basada en opinion ('I think'), no en evidencia fisica → will." },
      { s: "She ___ become a doctor. She has wanted this since she was 5.", opts: ["'s going to", "'ll", "would", "is"], a: 0, fb: "'She's going to become' — plan de largo plazo ya decidido con motivacion clara → going to." },
    ],
    transforms: [
      { prompt: "Usa 'will' — decision espontanea en el momento:", s: "Someone asks for help with their suitcase. You say:", opts: ["I'll help you with that!", "I'm going to help you with that!", "I help you with that!", "I would help you with that!"], a: 0, fb: "Respuesta espontanea a una peticion = WILL: 'I'll help you!' Decides en el momento de escuchar la peticion." },
      { prompt: "Usa 'going to' — plan ya decidido:", s: "You already booked flights to Barcelona. Tell a friend:", opts: ["I'm going to fly to Barcelona next month.", "I'll fly to Barcelona next month.", "I fly to Barcelona next month.", "I am planning flying to Barcelona."], a: 0, fb: "'I'm going to fly' — vuelo ya reservado = plan previo → going to." },
      { prompt: "Prediccion con evidencia visible — usa 'going to':", s: "A baby is about to fall off the sofa. You warn the parent:", opts: ["She's going to fall!", "She'll fall!", "She falls!", "She is falling!"], a: 0, fb: "'She's going to fall!' — evidencia inmediata y visible = going to. La caida esta a punto de ocurrir." },
    ],
    errors: [
      { s: "A: 'Who will present this?' B: 'OK, I'm going to do it.' (decides right now)", q: "¿Hay un error de uso (no gramatical)?", opts: ["Si: deberia ser 'I'll do it' (decision espontanea)", "Si: deberia ser 'I'm doing it' (present continuous)", "No hay error de uso", "Si: deberia ser 'I would do it'"], a: 0, fb: "Decision tomada en el momento = WILL: 'I'll do it.' Going to implica que ya lo habia decidido antes — aqui decide al escuchar la propuesta." },
      { s: "Look at those clouds. It wills rain soon.", q: "¿Cual es el error gramatical?", opts: ["'wills' → 'will'", "'soon' → 'later'", "'It' → 'This'", "No hay error"], a: 0, fb: "'Will' es un modal y NUNCA lleva -s en ninguna persona: 'it will rain', nunca 'it wills'. Los modales son invariables." },
    ],
    production: "Write 4 sentences: (1) A plan you decided before today (going to); (2) A prediction based on visible evidence right now (going to); (3) A spontaneous offer to help someone (I'll...); (4) A prediction based on your opinion (I think I will...). Label each: (going to) or (will).",
  },
  {
    id: 'modals', title: 'Modal Verbs: Can / Could / Would / Should', icon: '🎯',
    rule: "CAN: present ability or informal permission. COULD: past ability or polite request. WOULD: polite offer/request or conditional. SHOULD: advice/recommendation. CRITICAL: After ALL modals, ALWAYS use the verb base (no -s, no -ing, no -ed, no 'to').",
    tip: "Politeness scale for requests: 'Can you...?' (informal, with friends) → 'Could you...?' (polite, with strangers/colleagues) → 'Would you mind...?' (very polite, formal). Should vs must: 'should' = advice (you choose); 'must' = strong obligation (no choice).",
    table: {
      headers: ['Modal', 'Uso principal', 'Ejemplo A2', 'Forma negativa'],
      rows: [
        ['can', 'Habilidad presente / permiso', "I can drive. Can I help?", "can't / cannot"],
        ['could', 'Habilidad pasada / peticion cortes', "I couldn't swim. Could you help?", "couldn't"],
        ['would', 'Oferta cortes / condicional', "Would you like coffee?", "wouldn't"],
        ['should', 'Consejo / recomendacion', 'You should see a doctor.', "shouldn't"],
      ]
    },
    a1note: "En A1 usaste 'can' basicamente: 'Can you swim?' En A2, expandes el repertorio: 'could' para peticiones formales, 'would' para ofrecimientos corteses, 'should' para dar consejos. Estos modales son esenciales en el ambito profesional y social.",
    examples: [
      "Could you pass the salt, please? (mas educado que 'Can you pass the salt?')",
      "You should study a bit every day — it is much more effective than cramming once a week.",
      "Would you like me to help you with the report? I have some free time. (oferta muy cortes)",
    ],
    fills: [
      { s: "___ you speak French when you were a child?", opts: ['Could', 'Can', 'Should', 'Would'], a: 0, fb: "'Could' — habilidad en el pasado. 'Could you speak' = ¿Podias hablar? (de nino)." },
      { s: "You look tired. You ___ go to sleep earlier.", opts: ['should', 'could', 'would', 'can'], a: 0, fb: "'Should' — consejo/recomendacion. 'You should go to sleep earlier' = te recomiendo dormir mas temprano." },
      { s: "___ you pass the salt, please? (formal)", opts: ['Could', 'Can', 'Should', 'Would'], a: 0, fb: "'Could you pass...?' — peticion formal. Mas cortes que 'Can you pass...?'" },
      { s: "'___ you like some coffee?' 'Yes, please.'", opts: ['Would', 'Could', 'Should', 'Can'], a: 0, fb: "'Would you like...?' — oferta muy cortes. Formula fija en ingles para ofrecer algo." },
      { s: "She ___ (not) eat so much fast food. It is not good for you.", opts: ["shouldn't", "couldn't", "wouldn't", "can't"], a: 0, fb: "'Shouldn't eat' — consejo negativo. 'Shouldn't' = no deberias (recomendacion de no hacer algo)." },
    ],
    transforms: [
      { prompt: "Convierte a peticion formal con 'could':", s: "Help me with this, please.", opts: ["Could you help me with this, please?", "Could you helping me with this?", "You could help me with this, please?", "Should you help me with this?"], a: 0, fb: "Peticion formal: 'Could you + verb base + ...?' La forma mas cortes de pedir ayuda. Siempre verbo base." },
      { prompt: "Da un consejo usando 'should':", s: "My friend has a bad cold.", opts: ["She should see a doctor and rest.", "She could sees a doctor and rest.", "She would see a doctor and rest.", "She can to see a doctor and rest."], a: 0, fb: "Consejo: 'should + verb base'. 'She SHOULD see a doctor.' Despues de modal, siempre verbo base (sin to)." },
      { prompt: "Usa 'couldn't' para habilidad negativa en el pasado:", s: "When I was 5, I had no swimming ability.", opts: ["I couldn't swim when I was 5.", "I can't swim when I was 5.", "I wasn't swimming when I was 5.", "I didn't could swim when I was 5."], a: 0, fb: "'Couldn't swim' = no podia nadar (habilidad pasada negativa). 'Didn't could' NO existe — 'could' ya es el pasado de 'can'." },
    ],
    errors: [
      { s: "You could eat more vegetables. Doctors strongly recommend it.", q: "¿Es 'could' el modal correcto aqui?", opts: ["No: deberia ser 'should' (consejo fuerte)", "No: deberia ser 'would' (condicional)", "No: deberia ser 'can' (habilidad)", "Si, 'could' esta perfectamente bien"], a: 0, fb: "'Should' = consejo/recomendacion (especialmente de autoridades medicas). 'Could' solo sugiere posibilidad, no recomendacion. 'You SHOULD eat more vegetables.'" },
      { s: "I didn't could swim when I was young.", q: "¿Cual es el error gramatical?", opts: ["'didn't could' → 'couldn't'", "'swim' → 'swimming'", "'when I was young' → 'when young'", "No hay error"], a: 0, fb: "'Could' ya ES el pasado de 'can' — no necesita 'didn't'. Para negar: 'couldn't' (= could not). 'Didn't could' NO existe en ingles." },
    ],
    production: "Write 4 sentences — one for each modal: (1) Something you can do well now (can); (2) Something you couldn't do when you were a child (could); (3) Advice for a stressed friend (should); (4) A polite offer to help someone (Would you like me to...?). Label each: (can) / (could) / (should) / (would).",
  },
];

export default function GramaticaInglesA2() {
  const [topicIdx, setTopicIdx] = useState(0);
  const [fillAns, setFillAns] = useState<Record<number, number>>({});
  const [transAns, setTransAns] = useState<Record<number, number>>({});
  const [errAns, setErrAns] = useState<Record<number, number>>({});
  const [prodText, setProdText] = useState('');
  const [prodDone, setProdDone] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const t = TOPICS[topicIdx];
  const allFill = t.fills.every((_, i) => fillAns[i] !== undefined);
  const allTrans = t.transforms.every((_, i) => transAns[i] !== undefined);
  const allErr = t.errors.every((_, i) => errAns[i] !== undefined);
  const allMCQ = allFill && allTrans && allErr;
  const total = t.fills.length + t.transforms.length + t.errors.length;
  const correct =
    t.fills.filter((q, i) => fillAns[i] === q.a).length +
    t.transforms.filter((q, i) => transAns[i] === q.a).length +
    t.errors.filter((q, i) => errAns[i] === q.a).length;

  function reset() {
    setFillAns({}); setTransAns({}); setErrAns({});
    setProdText(''); setProdDone(false); setShowResult(false);
  }

  function bs(done: boolean, ok: boolean, sel: boolean) {
    if (!done) return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--ink)' };
    if (ok) return { background: 'rgba(5,150,105,0.1)', border: '1px solid #059669', color: '#059669' };
    if (sel) return { background: 'rgba(220,38,38,0.1)', border: '1px solid #dc2626', color: '#dc2626' };
    return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--muted)' };
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 800 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ingles/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés A2</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>📐 Gramática</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Grammar · Inglés A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Gramática A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: 560, margin: '0 0 1.5rem', lineHeight: 1.6 }}>
          5 temas con tabla de conjugacion, ejemplos reales, 5 fill-in-blank, 3 transformaciones, 2 deteccion de errores y produccion libre.
        </p>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          {TOPICS.map((tp, i) => (
            <button key={tp.id} onClick={() => { setTopicIdx(i); reset(); }}
              className={topicIdx === i ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize: '0.78rem', ...(topicIdx === i ? { background: C, borderColor: C } : {}) }}>
              {tp.icon} {tp.title}
            </button>
          ))}
        </div>

        <div style={{ padding: '1.25rem 1.4rem', borderRadius: 16, background: `${C}08`, border: `1.5px solid ${C}22`, marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.5rem', fontSize: '1rem' }}>{t.icon} {t.title}</div>
          <p style={{ margin: '0 0 0.6rem', fontSize: '0.87rem', color: 'var(--muted)', lineHeight: 1.7 }}>{t.rule}</p>
          <div style={{ padding: '0.5rem 0.75rem', borderRadius: 8, background: `${C}0d`, fontSize: '0.82rem', color: C, borderLeft: `3px solid ${C}`, marginBottom: '0.85rem', lineHeight: 1.6 }}>
            💡 {t.tip}
          </div>
          <div style={{ overflowX: 'auto', marginBottom: '0.85rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', minWidth: 380 }}>
              <thead>
                <tr>{t.table.headers.map((h, hi) => (
                  <th key={hi} style={{ padding: '0.45rem 0.7rem', background: `${C}18`, border: '1px solid var(--line-soft)', textAlign: 'left', fontWeight: 800, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {t.table.rows.map((row, ri) => (
                  <tr key={ri}>{row.map((cell, ci) => (
                    <td key={ci} style={{ padding: '0.4rem 0.7rem', border: '1px solid var(--line-soft)', color: 'var(--ink)', lineHeight: 1.45, background: ri % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)' }}>{cell}</td>
                  ))}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', padding: '0.5rem 0.75rem', borderRadius: 8, background: 'rgba(0,0,0,0.04)', borderLeft: '3px solid var(--muted)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
            📌 <strong style={{ color: 'var(--ink)' }}>vs A1:</strong> {t.a1note}
          </div>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Ejemplos en contexto real</div>
          {t.examples.map((ex, ei) => (
            <p key={ei} style={{ margin: '0 0 0.3rem', fontSize: '0.84rem', color: 'var(--ink)', lineHeight: 1.6, borderLeft: '2px solid var(--line-soft)', paddingLeft: '0.6rem' }}>
              &ldquo;{ex}&rdquo;
            </p>
          ))}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>📝</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Completa las oraciones</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.fills.filter((_, i) => fillAns[i] !== undefined).length}/{t.fills.length}
            </span>
          </div>
          {t.fills.map((q, qi) => {
            const ans = fillAns[qi]; const done = ans !== undefined;
            const parts = q.s.split('___');
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <p style={{ margin: '0 0 0.7rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {qi + 1}.{' '}
                  {parts.map((part, pi) => (
                    <span key={pi}>{part}{pi < parts.length - 1 && (
                      <span style={{ display: 'inline-block', minWidth: 72, borderBottom: `2px solid ${C}`, margin: '0 3px', textAlign: 'center', verticalAlign: 'bottom' }}>
                        {done && <span style={{ fontSize: '0.85rem', fontWeight: 800, color: ans === q.a ? '#059669' : '#dc2626' }}>{q.opts[ans]}</span>}
                      </span>
                    )}</span>
                  ))}
                </p>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setFillAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.4rem 0.9rem', borderRadius: 7, fontSize: '0.88rem', fontWeight: 700, ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ Correcto. ' : `✗ Respuesta: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>🔄</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Transforma las oraciones</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.transforms.filter((_, i) => transAns[i] !== undefined).length}/{t.transforms.length}
            </span>
          </div>
          {t.transforms.map((q, qi) => {
            const ans = transAns[qi]; const done = ans !== undefined;
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#d97706', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔄 {q.prompt}</div>
                <p style={{ margin: '0 0 0.7rem', fontSize: '0.92rem', color: 'var(--ink)', fontStyle: 'italic', borderLeft: '3px solid var(--line-soft)', paddingLeft: '0.5rem', fontWeight: 600 }}>
                  &ldquo;{q.s}&rdquo;
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setTransAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.5rem 0.9rem', borderRadius: 8, fontSize: '0.87rem', ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.12s', lineHeight: 1.45 }}>
                        <span style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', opacity: 0.6, marginRight: '0.4rem' }}>{['A', 'B', 'C', 'D'][oi]}.</span>
                        {opt}{done && oi === q.a && ' ✓'}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ ' : `✗ Correcta: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>🔍</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Detecta el error</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.errors.filter((_, i) => errAns[i] !== undefined).length}/{t.errors.length}
            </span>
          </div>
          {t.errors.map((q, qi) => {
            const ans = errAns[qi]; const done = ans !== undefined;
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔍 Encuentra el error</div>
                <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: '#dc2626', fontSize: '0.93rem', fontFamily: 'var(--mono)', borderLeft: '3px solid #dc2626', paddingLeft: '0.5rem', lineHeight: 1.5 }}>{q.s}</p>
                <p style={{ margin: '0 0 0.65rem', fontSize: '0.83rem', color: 'var(--muted)' }}>{q.q}</p>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setErrAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.4rem 0.85rem', borderRadius: 7, fontSize: '0.85rem', fontWeight: 600, ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ Correcto. ' : `✗ Respuesta: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>✍️</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Produccion libre</span>
          </div>
          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.2)', marginBottom: '0.85rem' }}>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7 }}>{t.production}</p>
          </div>
          {!allMCQ && (
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic' }}>
              🔒 Completa todos los ejercicios de arriba para desbloquear la produccion libre.
            </p>
          )}
          {allMCQ && !prodDone && (
            <>
              <textarea value={prodText} onChange={e => setProdText(e.target.value)} rows={5}
                placeholder="Write your answer here..."
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.92rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                  {prodText.trim() ? prodText.trim().split(/\s+/).length : 0} palabras
                </span>
                <button className="btn btn-sm"
                  onClick={() => { if (prodText.trim().split(/\s+/).filter(Boolean).length >= 10) setProdDone(true); }}
                  disabled={prodText.trim().split(/\s+/).filter(Boolean).length < 10}
                  style={{ background: '#059669', borderColor: '#059669', opacity: prodText.trim().split(/\s+/).filter(Boolean).length >= 10 ? 1 : 0.5 }}>
                  Listo →
                </button>
              </div>
            </>
          )}
          {prodDone && (
            <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.25)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Tu produccion</div>
              <p style={{ margin: '0 0 0.7rem', fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{prodText}</p>
              <button className="btn btn-ghost btn-sm" onClick={() => { setProdText(''); setProdDone(false); }} style={{ fontSize: '0.78rem' }}>Editar</button>
            </div>
          )}
        </div>

        {allMCQ && prodDone && !showResult && (
          <button className="btn btn-sm" onClick={() => setShowResult(true)} style={{ background: C, borderColor: C, marginBottom: '1rem' }}>
            Ver resultado del tema →
          </button>
        )}

        {showResult && (
          <div style={{ padding: '1.75rem', borderRadius: 18, border: `2px solid ${C}33`, background: `${C}06`, textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {correct === total ? '🏆' : correct >= Math.ceil(total * 0.7) ? '⭐' : '📖'}
            </div>
            <h2 style={{ margin: '0 0 0.25rem', fontWeight: 800, color: 'var(--ink)', fontSize: '1.3rem' }}>
              {correct} / {total} ejercicios correctos
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '0 0 1.25rem', lineHeight: 1.6 }}>
              {correct === total
                ? '¡Perfecto! Dominas este tema A2.'
                : correct >= Math.ceil(total * 0.7)
                ? 'Muy bien. Repasa los ejercicios marcados con ✗.'
                : 'Estudia la explicacion arriba y vuelve a intentarlo.'}
            </p>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={reset} style={{ background: C, borderColor: C }}>Intentar de nuevo</button>
              {topicIdx < TOPICS.length - 1 && (
                <button className="btn btn-ghost btn-sm" onClick={() => { setTopicIdx(topicIdx + 1); reset(); }}>
                  Siguiente tema →
                </button>
              )}
              <Link href="/practica/ingles/a2" className="btn btn-ghost btn-sm">Volver a A2</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
