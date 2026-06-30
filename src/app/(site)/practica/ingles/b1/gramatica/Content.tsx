'use client';

import QuestEngine from '@/components/practica/QuestEngine';
import type { QuestLevel, QuestGuide } from '@/components/practica/QuestEngine';

const guide: QuestGuide = {
  title: 'English Grammar B1 — Guía de referencia',
  body: "Los 5 pilares del inglés B1: present perfect (have/has + participio · for/since · ever/never), past continuous (was/were + -ing · while/when), first conditional (if + present simple → will + base), second conditional (if + past simple → would + base) y voz pasiva (be + participio en todos los tiempos).\nLa diferencia clave A2→B1: en A2 narras en pasado simple ('I went'). En B1 el Present Perfect conecta pasado y presente ('I have lived here for 5 years' — todavía vivo aquí). El Second Conditional permite hablar de situaciones imaginarias ('If I were taller, I would play basketball').",
  tip: "Errores clásicos B1: (1) 'If you will study' → NUNCA will en el if; correcto: 'If you study, you will pass'. (2) 'The book was wrote' → participio: 'was written'. (3) 'I have seen him yesterday' → yesterday = pasado específico → 'I saw him yesterday'. (4) 'If I would have' → NUNCA would en el if del Second Conditional.",
  tableHead: ['Estructura', 'Forma', 'Ejemplo'],
  tableRows: [
    ['Present Perfect', "have/has + PP · for/since · ever/never", "I have never seen it · She has lived here for 5 years"],
    ['Past Continuous', 'was/were + -ing · while/when', 'She was reading when he called'],
    ['First Conditional', 'if + present simple → will + base', 'If it rains, we will stay home'],
    ['Second Conditional', 'if + past simple → would + base', 'If I were taller, I would play basketball'],
    ['Passive Voice', 'be + past participle (all tenses)', 'Was built · Is spoken · Will be sent'],
  ],
};

const levels: QuestLevel[] = [
  {
    type: 'choice',
    icon: '✨',
    title: 'Present Perfect — have/has + PP',
    desc: "Form: have/has + past participle. Uses: (1) Life experience (ever/never). (2) Recent result (just). (3) Action continuing from past to now (for/since). Key contrast: 'I saw him yesterday' (specific past) vs 'I have seen him before' (experience, no specific time).",
    items: [
      { text: "I ___ (never / see) the Eiffel Tower in person.", opts: ['have never seen', 'never saw', 'had never seen', 'never have seen'], ans: 'have never seen', hint: "Present Perfect con 'never': have + never + participio. Experiencia acumulada de vida." },
      { text: "She ___ (just / finish) her homework.", opts: ['has just finished', 'just finished', 'is just finishing', 'just has finished'], ans: 'has just finished', hint: "'Has just finished' — acaba de terminar. 'Just' va entre have/has y el participio." },
      { text: "They ___ (live) in this city ___ 2015.", opts: ['have lived / since', 'lived / since', 'have lived / for', 'are living / for'], ans: 'have lived / since', hint: "'Have lived since 2015' — acción que empezó en 2015 y continúa ahora. 'Since' + fecha/momento específico." },
      { text: "___ you ever ___ (try) Korean food?", opts: ['Have / tried', 'Did / tried', 'Have / try', 'Did / try'], ans: 'Have / tried', hint: "Present Perfect para experiencias de vida: 'Have you ever tried...?' No importa cuándo, importa si lo has hecho." },
      { text: "I ___ (not / see) Carlos ___ last Monday.", opts: ["haven't seen / since", "didn't see / since", "haven't seen / for", "didn't see / for"], ans: "haven't seen / since", hint: "'Haven't seen since last Monday' — período desde el pasado hasta el presente. 'Since' + momento específico." },
      { text: "Convierte al Present Perfect: 'I visited London in 2019.' (life experience)", opts: ["I have visited London.", "I visited London.", "I am visiting London.", "I had visited London."], ans: "I have visited London.", hint: "Experiencia de vida sin mencionar el momento exacto → Present Perfect. Ya no decimos 'in 2019'." },
      { text: "Expresa duración: 'She started working here 3 years ago. (She is still working here.)'", opts: ["She has worked here for 3 years.", "She worked here for 3 years.", "She is working here for 3 years.", "She has been working here since 3 years."], ans: "She has worked here for 3 years.", hint: "Acción que continúa: 'has worked for 3 years'. 'For' + período de tiempo (no fecha específica)." },
      { text: "Transforma con 'just': 'The train arrived 2 minutes ago.'", opts: ["The train has just arrived.", "The train just arrived.", "The train is just arriving.", "The train had just arrived."], ans: "The train has just arrived.", hint: "'Has just arrived' — acción muy reciente con resultado presente. 'Just' enfatiza lo inmediato." },
      { text: "I have seen him yesterday at the market. ¿Qué está mal?", opts: ["'have seen' → 'saw' (tiempo pasado específico: yesterday)", "'seen' → 'see'", "'yesterday' → 'before'", "No hay error"], ans: "'have seen' → 'saw' (tiempo pasado específico: yesterday)", hint: "'Yesterday' es tiempo pasado específico → Past Simple: 'I saw him yesterday.' Present Perfect NO con tiempos terminados." },
      { text: "She has worked here since three years. ¿Cuál es el error?", opts: ["'since' → 'for' (período de tiempo, no momento específico)", "'has worked' → 'worked'", "'three years' → 'three years ago'", "No hay error"], ans: "'since' → 'for' (período de tiempo, no momento específico)", hint: "'For' + período ('for three years'). 'Since' + momento específico ('since 2021'). 'Since three years' es incorrecto." },
    ],
  },
  {
    type: 'choice',
    icon: '🔄',
    title: 'Past Continuous — was/were + -ing',
    desc: "Form: was/were + verb-ing. Uses: (1) Action IN PROGRESS at a specific past time. (2) Background action interrupted by a shorter event (Past Simple). (3) Two simultaneous past actions (while). Classic B1: 'I was doing X WHEN Y happened.'",
    items: [
      { text: "She ___ (read) when the lights went out.", opts: ['was reading', 'read', 'is reading', 'were reading'], ans: 'was reading', hint: "'Was reading' — acción de fondo en progreso cuando ocurrió la interrupción ('went out'). Sujeto singular → 'was'." },
      { text: "They ___ (not / sleep) when I arrived at midnight.", opts: ['were not sleeping', 'did not sleep', 'was not sleeping', 'have not slept'], ans: 'were not sleeping', hint: "'Were not sleeping' — acción de fondo negativa en el pasado. 'They' → 'were'." },
      { text: "What ___ you ___ (do) at 8 o'clock last night?", opts: ['were / doing', 'did / do', 'are / doing', 'was / doing'], ans: 'were / doing', hint: "'Were you doing?' — pregunta sobre acción en progreso en un momento específico del pasado." },
      { text: "While Maria ___ (prepare) dinner, her phone ___ (ring).", opts: ['was preparing / rang', 'prepared / was ringing', 'was preparing / was ringing', 'prepared / rang'], ans: 'was preparing / rang', hint: "'Was preparing' = acción de fondo larga; 'rang' = interrupción corta. Estructura clásica: while + past continuous + past simple." },
      { text: "___ it ___ (rain) when you left the house?", opts: ['Was / raining', 'Did / rain', 'Is / raining', 'Were / raining'], ans: 'Was / raining', hint: "'Was it raining?' — pregunta sobre acción de fondo en el pasado. Lluvia como contexto cuando saliste." },
      { text: "Combina con 'when': 'She was sleeping. The alarm rang.'", opts: ["She was sleeping when the alarm rang.", "She slept when the alarm rang.", "She was sleeping while the alarm rang.", "While she was sleeping, the alarm was ringing."], ans: "She was sleeping when the alarm rang.", hint: "'Was sleeping when the alarm rang' — dormir es el fondo (continuous); sonó la alarma es la interrupción (simple)." },
      { text: "Usa 'while' para dos acciones simultáneas: 'He was cooking. She was watching TV.'", opts: ["While he was cooking, she was watching TV.", "While he cooked, she watched TV.", "He was cooking while she watched TV.", "He cooked while she was watching TV."], ans: "While he was cooking, she was watching TV.", hint: "Dos acciones largas simultáneas → ambas en Past Continuous: 'While he was cooking, she was watching TV.'" },
      { text: "Transforma a pregunta: 'They were discussing the project at 3pm.'", opts: ["What were they discussing at 3pm?", "What did they discuss at 3pm?", "What they were discussing at 3pm?", "Were they discussing what at 3pm?"], ans: "What were they discussing at 3pm?", hint: "Pregunta Past Continuous: 'What were they discussing?' — acción en progreso en momento específico del pasado." },
      { text: "I was study in the library when he called. ¿Qué está mal?", opts: ["'study' → 'studying' (falta el -ing)", "'was' → 'were'", "'called' → 'was calling'", "No hay error"], ans: "'study' → 'studying' (falta el -ing)", hint: "Past Continuous = was/were + VERB-ING. 'I was studying' — siempre -ing después de was/were." },
      { text: "While I was walking to work, I was meeting an old friend. ¿Cuál es el error?", opts: ["'was meeting' → 'met' (evento puntual, no acción de fondo)", "'was walking' → 'walked'", "'while' → 'when'", "No hay error"], ans: "'was meeting' → 'met' (evento puntual, no acción de fondo)", hint: "Encontrarse con alguien es un evento puntual → Past Simple 'met'. Acciones de fondo son largas; eventos son cortos." },
    ],
  },
  {
    type: 'choice',
    icon: '⚡',
    title: 'First Conditional — If + present → will',
    desc: "Structure: IF + present simple, WILL + verb base. Use: real and likely future situations. NEVER 'will' in the 'if' clause. Order can be reversed: 'I will call you if I arrive late.' (no comma when 'if' comes second).",
    items: [
      { text: "If she studies hard, she ___ (pass) the exam.", opts: ['will pass', 'passes', 'would pass', 'is passing'], ans: 'will pass', hint: "First Conditional: if + present simple → WILL + verb base. 'Will pass' = resultado probable si estudia." },
      { text: "If it ___ (rain) tomorrow, we will cancel the picnic.", opts: ['rains', 'will rain', 'rained', 'is raining'], ans: 'rains', hint: "En la cláusula 'if' del First Conditional: siempre presente simple. NUNCA 'will rain' en el if." },
      { text: "We ___ (be) late if we don't leave now.", opts: ['will be', 'are', 'would be', 'are going to be'], ans: 'will be', hint: "'Will be' — resultado en First Conditional. La condición 'if we don't leave' es real y urgente." },
      { text: "If you ___ (not / eat) breakfast, you ___ (feel) tired all morning.", opts: ["don't eat / will feel", "won't eat / feel", "don't eat / feel", "won't eat / will feel"], ans: "don't eat / will feel", hint: "Cláusula 'if': presente negativo = 'don't eat'. Resultado: 'will feel'. Presente en if, will en resultado." },
      { text: "She ___ (help) you if you ___ (ask) her nicely.", opts: ['will help / ask', 'helps / will ask', 'would help / asked', 'will help / will ask'], ans: 'will help / ask', hint: "'Will help' en resultado + 'ask' (presente simple) en cláusula 'if'. NUNCA 'will' en el if." },
      { text: "Forma el First Conditional: 'Maybe it rains. Then we stay at home.'", opts: ["If it rains, we will stay at home.", "If it rains, we would stay at home.", "If it will rain, we will stay at home.", "If it rained, we would stay at home."], ans: "If it rains, we will stay at home.", hint: "First Conditional (real/posible): 'If + present simple, will + verb base.'" },
      { text: "Invierte las cláusulas: 'If I finish early, I will call you.'", opts: ["I will call you if I finish early.", "I will call you if I will finish early.", "I call you if I finish early.", "I would call you if I finish early."], ans: "I will call you if I finish early.", hint: "Resultado primero → sin coma: 'I will call you if I finish early.' La regla if + presente no cambia." },
      { text: "Usa 'might' para resultado más suave: 'Maybe we will go to the concert if tickets are available.'", opts: ["We might go to the concert if tickets are available.", "We will might go if tickets are available.", "We go if tickets might be available.", "If tickets are available, we might to go."], ans: "We might go to the concert if tickets are available.", hint: "'Might' reemplaza 'will' para indicar menos certeza. 'We might go if tickets are available.'" },
      { text: "If you will study tonight, you will do well tomorrow. ¿Qué está mal?", opts: ["'will study' → 'study' (presente simple en la cláusula 'if')", "'will do' → 'do'", "'tomorrow' → 'today'", "No hay error"], ans: "'will study' → 'study' (presente simple en la cláusula 'if')", hint: "NUNCA 'will' en la cláusula 'if': 'If you study tonight, you will do well.' El error más común en B1." },
      { text: "If she doesn't come, I will goes alone. ¿Cuál es el error?", opts: ["'goes' → 'go' (verb base después de 'will')", "'doesn't' → 'won't'", "'alone' → 'by myself'", "No hay error"], ans: "'goes' → 'go' (verb base después de 'will')", hint: "Después de 'will', siempre verbo base: 'will GO'. Nunca 'will goes', 'will going', 'will went'." },
    ],
  },
  {
    type: 'choice',
    icon: '💭',
    title: 'Second Conditional — If + past → would',
    desc: "Structure: IF + past simple, WOULD + verb base. Use: hypothetical or unlikely situations in the present/future. The past tense in 'if' signals 'not real now'. With 'to be': 'were' for all persons (formal). NEVER 'would' in the 'if' clause.",
    items: [
      { text: "If I ___ (be) taller, I ___ (play) basketball professionally.", opts: ['were / would play', 'was / will play', 'am / would play', 'were / will play'], ans: 'were / would play', hint: "Second Conditional: 'If I were taller' (hipotético) → 'I would play' (resultado imaginario). 'Were' para todos los sujetos con 'be'." },
      { text: "She ___ (travel) more if she ___ (have) more free time.", opts: ['would travel / had', 'will travel / has', 'would travel / has', 'travels / would have'], ans: 'would travel / had', hint: "'Would travel' (resultado) + 'had' (pasado en el 'if' = situación irreal). Segunda condicional completa." },
      { text: "What ___ you ___ (do) if you ___ (find) a wallet in the street?", opts: ['would / do / found', 'will / do / find', 'would / do / find', 'did / do / found'], ans: 'would / do / found', hint: "'What would you do if you found...?' — pregunta en 2nd conditional. 'Found' es el pasado de 'find'." },
      { text: "If I ___ (be) you, I ___ (not / accept) that offer.", opts: ["were / wouldn't accept", "was / won't accept", "am / wouldn't accept", "were / won't accept"], ans: "were / wouldn't accept", hint: "'If I were you' (consejo indirecto) + 'wouldn't accept' (resultado imaginario). Fórmula fija para dar consejos en B1." },
      { text: "He ___ (be) happier if he ___ (work) less.", opts: ['would be / worked', 'will be / works', 'would be / works', 'is / worked'], ans: 'would be / worked', hint: "'Would be' (resultado hipotético) + 'worked' (pasado = situación irreal en el if)." },
      { text: "Convierte al Second Conditional: 'If I have time, I will help you.' (make it hypothetical)", opts: ["If I had time, I would help you.", "If I have time, I would help you.", "If I had time, I will help you.", "If I would have time, I would help you."], ans: "If I had time, I would help you.", hint: "First → Second: 'have' → 'had'; 'will' → 'would'. El pasado simple hace la situación hipotética." },
      { text: "Usa 'If I were you...' para dar consejo: 'Your friend is stressed about an exam.'", opts: ["If I were you, I would make a study plan.", "If I was you, I will make a study plan.", "If I were you, I would to make a study plan.", "If I am you, I would make a study plan."], ans: "If I were you, I would make a study plan.", hint: "'If I were you, I would + verb base.' Consejo indirecto clásico. 'Were' (formal). 'Would' + verbo base sin 'to'." },
      { text: "Forma pregunta: 'Imagine you could speak any language. (Ask a friend)'", opts: ["If you could speak any language, which one would you choose?", "If you can speak any language, which one will you choose?", "If you could speak any language, which one you would choose?", "Which language would you speak if you will could?"], ans: "If you could speak any language, which one would you choose?", hint: "'If you could speak...' (pasado hipotético) + 'would you choose?' (resultado imaginario). Debate clásico B1." },
      { text: "If I would have more money, I would travel more. ¿Qué está mal?", opts: ["'would have' → 'had' (pasado simple en la cláusula 'if')", "'would travel' → 'will travel'", "'more' → 'much'", "No hay error"], ans: "'would have' → 'had' (pasado simple en la cláusula 'if')", hint: "NUNCA 'would' en la cláusula 'if': 'If I had more money, I would travel more.' Error clásico del Second Conditional." },
      { text: "If she knew the answer, she will tell us. ¿Cuál es el error?", opts: ["'will' → 'would' (el 'if' en pasado simple → Second Conditional)", "'knew' → 'knows'", "'tell' → 'tells'", "No hay error"], ans: "'will' → 'would' (el 'if' en pasado simple → Second Conditional)", hint: "Si el 'if' usa pasado ('knew'), el resultado DEBE ser 'would'. Mezclar 'if + past' con 'will' confunde 1st y 2nd conditional." },
    ],
  },
  {
    type: 'choice',
    icon: '🔀',
    title: 'Passive Voice — be + past participle',
    desc: "Form: be (in correct tense) + past participle. Use: action more important than the doer; unknown agent; formal/news writing. All tenses: Present (is made) · Past (was made) · Present Perfect (has been made) · Future (will be made). Agent added with 'by' if important.",
    items: [
      { text: "The Eiffel Tower ___ (build) in 1889.", opts: ['was built', 'built', 'is built', 'has been built'], ans: 'was built', hint: "'Was built' — pasiva pasado simple (1889 = tiempo específico). 'Built' es el participio de 'build'." },
      { text: "This film ___ (make) in Colombia last year.", opts: ['was made', 'made', 'is made', 'were made'], ans: 'was made', hint: "'Was made' — pasiva pasado simple. Sujeto singular 'this film' → 'was'." },
      { text: "English ___ (speak) in many countries around the world.", opts: ['is spoken', 'speaks', 'was spoken', 'is speaking'], ans: 'is spoken', hint: "'Is spoken' — pasiva presente simple para hechos generales. 'Spoken' es el participio de 'speak'." },
      { text: "A new hospital ___ (build) in our city next year.", opts: ['will be built', 'will build', 'is being built', 'has been built'], ans: 'will be built', hint: "'Will be built' — pasiva futura: will + be + participio." },
      { text: "The letter ___ (not / send) yet. I need to sign it first.", opts: ['has not been sent', 'was not sent', 'is not sent', 'will not be sent'], ans: 'has not been sent', hint: "'Has not been sent' — pasiva Present Perfect: have/has + been + participio. 'Yet' indica que se espera pronto." },
      { text: "Transforma de activa a pasiva: 'Shakespeare wrote Romeo and Juliet.'", opts: ["Romeo and Juliet was written by Shakespeare.", "Romeo and Juliet is written by Shakespeare.", "Romeo and Juliet wrote by Shakespeare.", "Shakespeare was written Romeo and Juliet."], ans: "Romeo and Juliet was written by Shakespeare.", hint: "Activa → Pasiva: objeto → sujeto. Verbo: 'was + written' (Past Simple passive). Sujeto original → 'by Shakespeare'." },
      { text: "Transforma de pasiva a activa: 'The package will be delivered by the courier tomorrow.'", opts: ["The courier will deliver the package tomorrow.", "The courier delivers the package tomorrow.", "The courier delivered the package tomorrow.", "Tomorrow the package will deliver."], ans: "The courier will deliver the package tomorrow.", hint: "Pasiva → Activa: agente 'the courier' → sujeto. Verbo: 'will deliver'. Sujeto pasivo → objeto." },
      { text: "Forma la pasiva sin agente: 'Someone broke the window last night.'", opts: ["The window was broken last night.", "The window is broken last night.", "The window has been broken last night.", "Someone was broken the window."], ans: "The window was broken last night.", hint: "Agente 'someone' (desconocido) → se omite: 'The window was broken last night.'" },
      { text: "The book was wrote by a Colombian author. ¿Qué está mal?", opts: ["'wrote' → 'written' (participio, no pasado simple)", "'was' → 'is'", "'Colombian' → 'Colombia'", "No hay error"], ans: "'wrote' → 'written' (participio, no pasado simple)", hint: "Pasiva = be + PAST PARTICIPLE. 'Write' → pasado 'wrote', participio 'WRITTEN'. Error clásico: pasado simple en la pasiva." },
      { text: "English is spoke in Australia. ¿Cuál es el error?", opts: ["'spoke' → 'spoken' (participio, no pasado)", "'is' → 'are'", "'in' → 'at'", "No hay error"], ans: "'spoke' → 'spoken' (participio, no pasado)", hint: "Pasiva presente: 'is + past participle'. 'Speak' → participio 'SPOKEN'. 'Spoke' es el pasado simple. 'English is spoken.'" },
    ],
  },
  {
    type: 'sprint',
    icon: '⚡',
    title: 'Sprint — all topics!',
    desc: 'Mix of all 5 B1 topics. Write fast!',
    inputWidth: 90,
    items: [
      { text: "She ___ (just / finish) her homework.", ans: "has just finished", hint: "have/has + just + participio" },
      { text: "I ___ (never / see) the Eiffel Tower in person.", ans: "have never seen", hint: "have + never + participio" },
      { text: "She ___ (read) when the lights went out.", ans: "was reading", hint: "acción de fondo: was + -ing" },
      { text: "She was sleeping when the alarm ___.", ans: "rang", hint: "interrupción corta → past simple: rang" },
      { text: "If she studies hard, she ___ (pass) the exam.", ans: "will pass", hint: "First Conditional: will + verb base" },
      { text: "If it ___ (rain) tomorrow, we will cancel the picnic.", ans: "rains", hint: "cláusula 'if': presente simple" },
      { text: "If I ___ (be) taller, I would play basketball.", ans: "were", hint: "Second Conditional: if + were" },
      { text: "She ___ (travel) more if she had more free time.", ans: "would travel", hint: "Second Conditional: would + verb base" },
      { text: "The Eiffel Tower ___ (build) in 1889.", ans: "was built", hint: "pasiva pasado: was + participio" },
      { text: "English ___ (speak) in many countries.", ans: "is spoken", hint: "pasiva presente: is + participio" },
    ],
  },
];

export default function GramaticaInglesB1() {
  return (
    <QuestEngine
      color="#cf142b"
      flag="🇬🇧"
      storageKey="quest-en-b1-grammatik"
      guide={guide}
      levels={levels}
      backHref="/practica/ingles/b1"
      backLabel="English B1"
      title="Grammar B1"
      subtitle="English B1 — Grammar"
    />
  );
}
