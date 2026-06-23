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
  a2note: string; examples: string[];
  fills: FQ[]; transforms: TQ[]; errors: EQ[]; production: string;
}

const TOPICS: Topic[] = [
  {
    id: 'present_perfect', title: 'Present Perfect', icon: '✨',
    rule: "Form: have/has + past participle. Uses: (1) Experience in your life (ever/never). (2) Recent action with present result. (3) Action that started in the past and continues now (for/since). (4) Unfinished time period (today/this week).",
    tip: "Key contrast: Present Perfect vs Past Simple. Past Simple = specific finished time ('I visited Paris in 2019'). Present Perfect = no specific time, or unfinished time ('I have visited Paris' / 'I have lived here since 2019').",
    table: {
      headers: ['', 'Afirmativo', 'Negativo', 'Pregunta'],
      rows: [
        ['I / We / You / They', 'have worked / seen', "haven't worked / seen", 'Have you worked?'],
        ['He / She / It', 'has worked / seen', "hasn't worked / seen", 'Has she worked?'],
        ['For / Since', 'for 3 years / since 2020', 'for a long time', 'How long have you...?'],
        ['Ever / Never', 'Have you ever...?', 'I have never...', 'ever = alguna vez'],
      ]
    },
    a2note: "En A2 usaste el pasado simple para eventos terminados: 'I went to London last year.' En B1, el Present Perfect conecta el pasado con el presente: 'I have been to London' (experiencia) / 'She has just arrived' (resultado ahora mismo). La diferencia clave: ¿importa el momento exacto? Si sí → past simple. Si no → present perfect.",
    examples: [
      "Have you ever eaten sushi? — Yes, I have eaten it twice. It was delicious! (experiencia de vida)",
      "I can't find my keys. I think I have lost them somewhere. (resultado presente de acción pasada)",
      "She has worked at this company for five years — she is still working there now. (acción que continúa)",
    ],
    fills: [
      { s: "I ___ (never / see) the Eiffel Tower in person.", opts: ['have never seen', 'never saw', 'had never seen', 'never have seen'], a: 0, fb: "Present Perfect con 'never': have + never + participio. 'Have never seen' = no la has visto en toda tu vida (experiencia acumulada)." },
      { s: "She ___ (just / finish) her homework.", opts: ['has just finished', 'just finished', 'is just finishing', 'just has finished'], a: 0, fb: "'Has just finished' = acaba de terminar (resultado presente inmediato). 'Just' va entre have/has y el participio." },
      { s: "They ___ (live) in this city ___ 2015.", opts: ['have lived / since', 'lived / since', 'have lived / for', 'are living / for'], a: 0, fb: "'Have lived since 2015' — acción que empezó en 2015 y continúa ahora. 'Since' + fecha/momento específico." },
      { s: "___ you ever ___ (try) Korean food?", opts: ['Have / tried', 'Did / tried', 'Have / try', 'Did / try'], a: 0, fb: "Present Perfect para preguntar sobre experiencias de vida: 'Have you ever tried...?' No importa cuándo, importa si lo has hecho." },
      { s: "I ___ (not / see) Carlos ___ last Monday.", opts: ['haven't seen / since', 'didn't see / since', 'haven't seen / for', 'didn't see / for'], a: 0, fb: "'Haven't seen since last Monday' — período que empieza en el pasado (Monday) y llega al presente. 'Since' + momento específico." },
    ],
    transforms: [
      { prompt: "Convierte al Present Perfect:", s: "I visited London in 2019. (in your life experience)", opts: ["I have visited London.", "I visited London.", "I am visiting London.", "I had visited London."], a: 0, fb: "Experiencia de vida sin importar el momento exacto → Present Perfect: 'I have visited London.' Ya no mencionamos el año." },
      { prompt: "Expresa duración con 'for/since':", s: "She started working here 3 years ago. (She is still working here.)", opts: ["She has worked here for 3 years.", "She worked here for 3 years.", "She is working here for 3 years.", "She has been working here since 3 years."], a: 0, fb: "Acción que continúa: 'has worked for 3 years'. 'For' + período de tiempo. 'Since' sería con una fecha específica." },
      { prompt: "Transforma a Present Perfect con 'just':", s: "The train arrived 2 minutes ago.", opts: ["The train has just arrived.", "The train just arrived.", "The train is just arriving.", "The train had just arrived."], a: 0, fb: "'Has just arrived' — acción muy reciente con resultado presente (el tren está aquí ahora). 'Just' enfatiza lo inmediato." },
    ],
    errors: [
      { s: "I have seen him yesterday at the market.", q: "¿Qué está mal?", opts: ["'have seen' → 'saw' (tiempo pasado específico: yesterday)", "'seen' → 'see'", "'yesterday' → 'before'", "No hay error"], a: 0, fb: "'Yesterday' es tiempo pasado específico → Past Simple: 'I saw him yesterday.' El Present Perfect NO se usa con tiempos específicos terminados (yesterday, last year, in 2020)." },
      { s: "She has worked here since three years.", q: "¿Cuál es el error?", opts: ["'since' → 'for' (período de tiempo, no momento específico)", "'has worked' → 'worked'", "'three years' → 'three years ago'", "No hay error"], a: 0, fb: "'For' + período de tiempo ('for three years'). 'Since' + momento específico ('since 2021' / 'since Monday'). 'Since three years' es incorrecto." },
    ],
    production: "Write 4 sentences about your life experiences and ongoing situations: (1) Something you have never done but want to try (I have never...); (2) Something you have just done today (I have just...); (3) How long you have lived in your city/country (I have lived... for/since...); (4) Ask a friend about their travel experience (Have you ever visited...?).",
  },
  {
    id: 'past_continuous', title: 'Past Continuous', icon: '🔄',
    rule: "Form: was/were + verb-ing. Uses: (1) Action IN PROGRESS at a specific past time. (2) Background action that was interrupted by a shorter event (Past Simple). (3) Two simultaneous past actions (while...was...ing / was...ing). Key words: while, when, at that moment, at 8pm yesterday.",
    tip: "The classic B1 structure: 'I was doing X when Y happened.' The continuous action (was doing) is the background; the simple past (happened) is the interruption. 'When' introduces the interrupting event; 'while' introduces the ongoing action.",
    table: {
      headers: ['Sujeto', 'Afirmativo', 'Negativo', 'Pregunta'],
      rows: [
        ['I / He / She / It', 'was working', 'was not working', 'Was she working?'],
        ['We / You / They', 'were working', 'were not working', 'Were they working?'],
        ['Estructura clásica', 'was doing... when...', 'while... was happening...', 'What were you doing when...?'],
      ]
    },
    a2note: "En A2 aprendiste el Past Simple para eventos terminados. En B1, el Past Continuous añade contexto: 'It was raining when I left' — llovía (contexto, ya en progreso) cuando salí (evento). La lluvia es el fondo; salir es el evento puntual.",
    examples: [
      "I was studying when she called. (acción de fondo: studying; interrupción: called)",
      "While he was cooking, the children were playing in the garden. (dos acciones simultáneas)",
      "At 9pm last night, they were still working on the project. (acción en progreso en momento específico)",
    ],
    fills: [
      { s: "She ___ (read) when the lights went out.", opts: ['was reading', 'read', 'is reading', 'were reading'], a: 0, fb: "'Was reading' — acción de fondo en progreso cuando ocurrió la interrupción ('went out'). Sujeto singular: 'was'." },
      { s: "They ___ (not / sleep) when I arrived at midnight.", opts: ['were not sleeping', 'did not sleep', 'was not sleeping', 'have not slept'], a: 0, fb: "'Were not sleeping' — acción de fondo negativa en el pasado. 'They' → 'were'. La llegada a medianoche interrumpió (o no) su estado." },
      { s: "What ___ you ___ (do) at 8 o'clock last night?", opts: ['were / doing', 'did / do', 'are / doing', 'was / doing'], a: 0, fb: "'Were you doing?' — pregunta sobre acción en progreso en un momento específico del pasado (8 o'clock last night)." },
      { s: "While Maria ___ (prepare) dinner, her phone ___ (ring).", opts: ['was preparing / rang', 'prepared / was ringing', 'was preparing / was ringing', 'prepared / rang'], a: 0, fb: "'Was preparing' = acción de fondo larga; 'rang' = interrupción corta. La estructura clásica: while + past continuous + past simple." },
      { s: "___ it ___ (rain) when you left the house?", opts: ['Was / raining', 'Did / rain', 'Is / raining', 'Were / raining'], a: 0, fb: "'Was it raining?' — pregunta sobre acción de fondo en el pasado. Lluvia como contexto cuando saliste." },
    ],
    transforms: [
      { prompt: "Combina con 'when' (acción de fondo + interrupción):", s: "She was sleeping. The alarm rang.", opts: ["She was sleeping when the alarm rang.", "She slept when the alarm rang.", "She was sleeping while the alarm rang.", "While she was sleeping, the alarm was ringing."], a: 0, fb: "'Was sleeping when the alarm rang' — la clásica estructura B1. Dormir = fondo (continuous); sonó la alarma = interrupción (simple)." },
      { prompt: "Usa 'while' para dos acciones simultáneas:", s: "He was cooking. She was watching TV. (at the same time)", opts: ["While he was cooking, she was watching TV.", "While he cooked, she watched TV.", "He was cooking while she watched TV.", "He cooked while she was watching TV."], a: 0, fb: "Dos acciones largas simultáneas → ambas en Past Continuous: 'While he was cooking, she was watching TV.'" },
      { prompt: "Transforma a pregunta sobre el pasado:", s: "They were discussing the project at 3pm.", opts: ["What were they discussing at 3pm?", "What did they discuss at 3pm?", "What they were discussing at 3pm?", "Were they discussing what at 3pm?"], a: 0, fb: "Pregunta con Past Continuous: 'What were they discussing?' — para preguntar sobre una acción en progreso en el pasado." },
    ],
    errors: [
      { s: "I was study in the library when he called.", q: "¿Qué está mal?", opts: ["'study' → 'studying' (falta el -ing)", "'was' → 'were'", "'called' → 'was calling'", "No hay error"], a: 0, fb: "Past Continuous = was/were + VERB-ING. 'I was studying' — siempre el participio presente (-ing) después de was/were." },
      { s: "While I was walking to work, I was meeting an old friend.", q: "¿Cuál es el error?", opts: ["'was meeting' → 'met' (evento puntual, no acción de fondo)", "'was walking' → 'walked'", "'while' → 'when'", "No hay error"], a: 0, fb: "Encontrarse con alguien es un evento puntual/instantáneo → Past Simple: 'I met an old friend'. Las acciones de fondo son las largas; los eventos son cortos y van en Past Simple." },
    ],
    production: "Write 4 sentences using past continuous: (1) Describe what you were doing at 7pm yesterday; (2) Describe an interruption that happened while you were doing something; (3) Describe two things that were happening at the same time (while...was...ing...was...ing); (4) Ask a friend what they were doing at a specific time last weekend.",
  },
  {
    id: 'first_conditional', title: 'First Conditional', icon: '⚡',
    rule: "Structure: IF + present simple, WILL + verb base. Use: real and likely future situations. The 'if' clause states the condition; the main clause states the result. Key: NEVER use 'will' in the 'if' clause. You can switch the clauses: 'I will call you if I arrive late' OR 'If I arrive late, I will call you' (comma when 'if' comes first).",
    tip: "First Conditional = real possibility. 'If it rains tomorrow, I will take an umbrella.' (it might really rain). Second Conditional = hypothetical. 'If it rained every day, I would move away.' (unlikely or impossible). The verb tense in the 'if' clause signals which conditional you're using.",
    table: {
      headers: ['Cláusula IF', 'Resultado (MAIN)', 'Señal', 'Ejemplo'],
      rows: [
        ['if + present simple', 'will + verb base', 'real/posible', 'If you study, you will pass.'],
        ['if + present simple', 'can / may / might', 'posible resultado', 'If it clears up, we might go.'],
        ['NUNCA', "'if + will'", 'error clásico', "If he will come → WRONG"],
        ['Orden inverso', 'result + if + condition', 'sin coma', 'I will help you if you need me.'],
      ]
    },
    a2note: "En A2 usaste 'will' para predicciones y 'going to' para planes. En B1, el First Conditional combina el presente en la condición con 'will' en el resultado: 'If I get the job, I will celebrate.' Esto es más sofisticado que una simple predicción — añade una condición real.",
    examples: [
      "If you don't hurry up, we will miss the train. (condición real y urgente)",
      "I will lend you my notes if you promise to return them tomorrow. (condición con promesa)",
      "If the weather is good this weekend, we might go to the beach. (posibilidad más suave con 'might')",
    ],
    fills: [
      { s: "If she studies hard, she ___ (pass) the exam.", opts: ['will pass', 'passes', 'would pass', 'is passing'], a: 0, fb: "First Conditional: if + present simple → WILL + verb base. 'Will pass' = resultado probable si estudia." },
      { s: "If it ___ (rain) tomorrow, we will cancel the picnic.", opts: ['rains', 'will rain', 'rained', 'is raining'], a: 0, fb: "En la cláusula 'if' del First Conditional: siempre presente simple. NUNCA 'will rain'. 'If it rains' (presente) → 'we will cancel' (resultado)." },
      { s: "We ___ (be) late if we don't leave now.", opts: ['will be', 'are', 'would be', 'are going to be'], a: 0, fb: "'Will be' — resultado en First Conditional. La condición ('if we don't leave') es real y urgente." },
      { s: "If you ___ (not / eat) breakfast, you ___ (feel) tired all morning.", opts: ['don\'t eat / will feel', 'won\'t eat / feel', 'don\'t eat / feel', 'won\'t eat / will feel'], a: 0, fb: "Cláusula 'if': presente negativo = 'don't eat'. Resultado: 'will feel'. Ambas partes siguen la regla: presente en 'if', 'will' en el resultado." },
      { s: "She ___ (help) you if you ___ (ask) her nicely.", opts: ['will help / ask', 'helps / will ask', 'would help / asked', 'will help / will ask'], a: 0, fb: "'Will help' en el resultado + 'ask' (presente simple) en la cláusula 'if'. Recuerda: NUNCA 'will' en el 'if'." },
    ],
    transforms: [
      { prompt: "Forma el First Conditional:", s: "Maybe it rains. Then we stay at home.", opts: ["If it rains, we will stay at home.", "If it rains, we would stay at home.", "If it will rain, we will stay at home.", "If it rained, we would stay at home."], a: 0, fb: "First Conditional (situación real): 'If + present simple, will + verb base.' 'If it rains, we will stay at home.'" },
      { prompt: "Invierte las cláusulas:", s: "If I finish early, I will call you.", opts: ["I will call you if I finish early.", "I will call you if I will finish early.", "I call you if I finish early.", "I would call you if I finish early."], a: 0, fb: "Cuando el resultado va primero, NO hay coma: 'I will call you if I finish early.' La regla de 'if + presente' no cambia." },
      { prompt: "Usa 'might' para resultado más suave:", s: "Maybe we will go to the concert if tickets are available.", opts: ["We might go to the concert if tickets are available.", "We will might go if tickets are available.", "We go if tickets might be available.", "If tickets are available, we might to go."], a: 0, fb: "'Might' (posibilidad) puede reemplazar 'will': 'We might go if tickets are available.' — menos certeza que 'will'." },
    ],
    errors: [
      { s: "If you will study tonight, you will do well tomorrow.", q: "¿Qué está mal?", opts: ["'will study' → 'study' (presente simple en la cláusula 'if')", "'will do' → 'do'", "'tomorrow' → 'today'", "No hay error"], a: 0, fb: "NUNCA 'will' en la cláusula 'if' del First Conditional: 'If you study tonight, you will do well.' El error más común en B1." },
      { s: "If she doesn't come, I will goes alone.", q: "¿Cuál es el error?", opts: ["'goes' → 'go' (verb base después de 'will')", "'doesn't' → 'won't'", "'alone' → 'by myself'", "No hay error"], a: 0, fb: "Después de 'will', siempre el verbo en forma base: 'will GO' — nunca 'will goes', 'will going', 'will went'." },
    ],
    production: "Write 4 First Conditional sentences about real possible situations: (1) A consequence of studying (or not studying) English; (2) What you will do if the weather is good this weekend; (3) A warning to a friend (If you..., you will...); (4) A personal goal with a condition (I will ___ if I ___). Label each with the condition and the result.",
  },
  {
    id: 'second_conditional', title: 'Second Conditional', icon: '💭',
    rule: "Structure: IF + past simple, WOULD + verb base. Use: hypothetical, imaginary or unlikely situations in the present/future. The 'if' clause uses PAST SIMPLE (not really past — it signals 'not real now'). 'Would' signals the imaginary result. With 'to be': use 'were' for ALL persons (formal: 'If I were you...') though 'was' is acceptable in informal speech.",
    tip: "Second Conditional = imaginary. 'If I had a million dollars, I would travel the world.' (I don't have it). Contrast with First: 'If I get a raise, I will buy a car' (possible). 'If I got a raise, I would buy a car' (imaginary, unlikely). The shift from 'get' to 'got' makes it hypothetical.",
    table: {
      headers: ['Cláusula IF (hipotético)', 'Resultado (WOULD)', 'Nota', 'Ejemplo'],
      rows: [
        ['if + past simple', 'would + verb base', 'situación irreal ahora', 'If I lived there, I would be happy.'],
        ['if + were', 'would + verb base', 'todos los sujetos (formal)', 'If I were you, I would apologize.'],
        ['Pregunta', 'What would you do if...?', '', 'What would you do if you won?'],
        ['NUNCA', "'if + would'", 'error clásico', "If I would have → WRONG"],
      ]
    },
    a2note: "En B1, el Second Conditional permite hablar de situaciones imaginarias y dar consejos indirectos ('If I were you, I would...'). Es más sofisticado que el First Conditional porque trabaja con la imaginación, no con posibilidades reales. Es clave en entrevistas de trabajo ('What would you do if...?') y en conversaciones sobre sueños y aspiraciones.",
    examples: [
      "If I won the lottery, I would donate half to charity and travel the world. (hipotético — no lo he ganado)",
      "If I were you, I would accept the job offer immediately. (consejo indirecto con 'if I were you')",
      "What would you do if you could live anywhere in the world? (pregunta imaginaria para debate)",
    ],
    fills: [
      { s: "If I ___ (be) taller, I ___ (play) basketball professionally.", opts: ['were / would play', 'was / will play', 'am / would play', 'were / will play'], a: 0, fb: "Second Conditional: 'If I were taller' (hipotético — no soy alto), 'I would play' (resultado imaginario). 'Were' para todos los sujetos con 'be' en 2nd conditional." },
      { s: "She ___ (travel) more if she ___ (have) more free time.", opts: ['would travel / had', 'will travel / has', 'would travel / has', 'travels / would have'], a: 0, fb: "'Would travel' (resultado) + 'had' (pasado simple en el 'if' — situación irreal). Ambas partes usan la estructura correcta del 2nd conditional." },
      { s: "What ___ you ___ (do) if you ___ (find) a wallet in the street?", opts: ['would / do / found', 'will / do / find', 'would / do / find', 'did / do / found'], a: 0, fb: "'What would you do if you found...?' — pregunta en 2nd conditional para situaciones hipotéticas. 'Found' es el pasado de 'find'." },
      { s: "If I ___ (be) you, I ___ (not / accept) that offer.", opts: ['were / wouldn\'t accept', 'was / won\'t accept', 'am / wouldn\'t accept', 'were / won\'t accept'], a: 0, fb: "'If I were you' (consejo indirecto — no soy tú) + 'wouldn't accept' (resultado imaginario). Fórmula fija para dar consejos en B1." },
      { s: "He ___ (be) happier if he ___ (work) less.", opts: ['would be / worked', 'will be / works', 'would be / works', 'is / worked'], a: 0, fb: "'Would be' (resultado hipotético) + 'worked' (pasado simple = situación irreal). El contraste con First Conditional: 'will be / works' sería First Conditional (real)." },
    ],
    transforms: [
      { prompt: "Convierte del First al Second Conditional:", s: "If I have time, I will help you. (make it hypothetical)", opts: ["If I had time, I would help you.", "If I have time, I would help you.", "If I had time, I will help you.", "If I would have time, I would help you."], a: 0, fb: "First → Second: 'have' → 'had'; 'will' → 'would'. El cambio al pasado simple hace la situación hipotética (no tengo tiempo ahora)." },
      { prompt: "Usa 'If I were you...' para dar consejo:", s: "Your friend is stressed about an exam. Give advice.", opts: ["If I were you, I would make a study plan.", "If I was you, I will make a study plan.", "If I were you, I would to make a study plan.", "If I am you, I would make a study plan."], a: 0, fb: "'If I were you, I would + verb base.' Consejo indirecto clásico. 'Were' (no 'was') para registro formal. 'Would' + verbo base (sin 'to')." },
      { prompt: "Forma pregunta en Second Conditional:", s: "Imagine you could speak any language. Which one? (Ask a friend)", opts: ["If you could speak any language, which one would you choose?", "If you can speak any language, which one will you choose?", "If you could speak any language, which one you would choose?", "Which language would you speak if you will could?"], a: 0, fb: "'If you could speak...' (pasado hipotético) + 'would you choose?' (resultado imaginario). Pregunta para debates y conversaciones B1." },
    ],
    errors: [
      { s: "If I would have more money, I would travel more.", q: "¿Qué está mal?", opts: ["'would have' → 'had' (pasado simple en la cláusula 'if')", "'would travel' → 'will travel'", "'more' → 'much'", "No hay error"], a: 0, fb: "NUNCA 'would' en la cláusula 'if': 'If I had more money, I would travel more.' El error más común en el Second Conditional. El 'if' toma pasado simple, no 'would'." },
      { s: "If she knew the answer, she will tell us.", q: "¿Cuál es el error?", opts: ["'will' → 'would' (el 'if' está en pasado simple → Second Conditional)", "'knew' → 'knows'", "'tell' → 'tells'", "No hay error"], a: 0, fb: "Si la cláusula 'if' usa pasado simple ('knew'), el resultado DEBE ser 'would': 'she would tell us'. Mezclar 'if + past' con 'will' es una señal de confusión entre 1st y 2nd conditional." },
    ],
    production: "Write 4 sentences in the Second Conditional: (1) An imaginary scenario about your life (If I lived in...); (2) Advice to a friend using 'If I were you...'; (3) A dream job scenario (If I were a..., I would...); (4) A question you would ask at a job interview in an imaginary scenario (What would you do if...?). Label: (imaginary scenario) or (advice).",
  },
  {
    id: 'passive_voice', title: 'Passive Voice', icon: '🔀',
    rule: "Form: be (in the correct tense) + past participle. Use: (1) The action is more important than who does it. (2) We don't know or don't want to mention who does the action. (3) Formal/academic/news writing. Agent (doer) can be added with 'by'. All tenses can be passive: Present: is made. Past: was made. Present Perfect: has been made. Future: will be made.",
    tip: "Active → Passive: The object becomes the subject. 'They build houses' → 'Houses are built.' The verb changes to be + past participle. The original subject becomes 'by + agent' (optional). If the agent is unknown or obvious, omit it: 'The window was broken' (we don't need 'by someone').",
    table: {
      headers: ['Tiempo', 'Activa', 'Pasiva', 'Forma'],
      rows: [
        ['Present Simple', 'They make cars here.', 'Cars are made here.', 'am/is/are + PP'],
        ['Past Simple', 'They built this bridge in 1990.', 'This bridge was built in 1990.', 'was/were + PP'],
        ['Present Perfect', 'They have discovered a cure.', 'A cure has been discovered.', 'have/has been + PP'],
        ['Future', 'They will deliver the package tomorrow.', 'The package will be delivered tomorrow.', 'will be + PP'],
        ['Con agente', 'Shakespeare wrote Hamlet.', 'Hamlet was written by Shakespeare.', 'by + agente'],
      ]
    },
    a2note: "En A2 siempre usabas la voz activa: 'They speak English in Australia.' En B1, la voz pasiva te permite variar el enfoque: 'English is spoken in Australia' — el foco es el idioma, no quién lo habla. La pasiva es especialmente común en noticias, informes y textos académicos.",
    examples: [
      "This building was designed by a famous architect. (el foco es el edificio, no el arquitecto)",
      "English is spoken by over 1.5 billion people worldwide. (hecho general, agente enorme e impreciso)",
      "Three people have been injured in the accident. (noticia: foco en las víctimas, no en quién las hirió)",
    ],
    fills: [
      { s: "The Eiffel Tower ___ (build) in 1889.", opts: ['was built', 'built', 'is built', 'has been built'], a: 0, fb: "'Was built' — pasiva en pasado simple (1889 = tiempo específico pasado). 'Built' es el participio de 'build'." },
      { s: "This film ___ (make) in Colombia last year.", opts: ['was made', 'made', 'is made', 'were made'], a: 0, fb: "'Was made' — passive past simple. Sujeto singular 'this film' → 'was'. 'Made' es el participio de 'make'." },
      { s: "English ___ (speak) in many countries around the world.", opts: ['is spoken', 'speaks', 'was spoken', 'is speaking'], a: 0, fb: "'Is spoken' — pasiva presente simple para hechos generales y permanentes. El inglés sigue siendo hablado hoy." },
      { s: "A new hospital ___ (build) in our city next year.", opts: ['will be built', 'will build', 'is being built', 'has been built'], a: 0, fb: "'Will be built' — pasiva futura. 'Will + be + past participle'. El proyecto está planeado para el futuro." },
      { s: "The letter ___ (not / send) yet. I need to sign it first.", opts: ['has not been sent', 'was not sent', 'is not sent', 'will not be sent'], a: 0, fb: "'Has not been sent' — pasiva en Present Perfect. 'Has/have + been + past participle'. 'Yet' indica que no ha ocurrido pero se espera." },
    ],
    transforms: [
      { prompt: "Transforma de activa a pasiva:", s: "Shakespeare wrote Romeo and Juliet.", opts: ["Romeo and Juliet was written by Shakespeare.", "Romeo and Juliet is written by Shakespeare.", "Romeo and Juliet wrote by Shakespeare.", "Shakespeare was written Romeo and Juliet."], a: 0, fb: "Activa → Pasiva: El objeto ('Romeo and Juliet') → sujeto. Verbo: 'was + written' (Past Simple passive). El sujeto original → 'by Shakespeare'." },
      { prompt: "Transforma de pasiva a activa:", s: "The package will be delivered by the courier tomorrow.", opts: ["The courier will deliver the package tomorrow.", "The courier delivers the package tomorrow.", "The courier delivered the package tomorrow.", "Tomorrow the package will deliver."], a: 0, fb: "Pasiva → Activa: El agente 'the courier' → sujeto. Verbo: 'will deliver' (activo futuro). El sujeto pasivo → objeto." },
      { prompt: "Forma la pasiva sin agente (agente desconocido):", s: "Someone broke the window last night.", opts: ["The window was broken last night.", "The window is broken last night.", "The window has been broken last night.", "Someone was broken the window."], a: 0, fb: "Cuando el agente es 'someone' (desconocido), se omite: 'The window was broken last night.' Solo pasivo + tiempo + circunstancia." },
    ],
    errors: [
      { s: "The book was wrote by a Colombian author.", q: "¿Qué está mal?", opts: ["'wrote' → 'written' (participio irregular, no pasado simple)", "'was' → 'is'", "'Colombian' → 'Colombia'", "No hay error"], a: 0, fb: "Pasiva = be + PAST PARTICIPLE. 'Write' → pasado 'wrote', participio 'WRITTEN'. Error clásico: usar el pasado simple en vez del participio en la voz pasiva." },
      { s: "English is spoke in Australia.", q: "¿Cuál es el error?", opts: ["'spoke' → 'spoken' (participio, no pasado)", "'is' → 'are'", "'in' → 'at'", "No hay error"], a: 0, fb: "Pasiva presente: 'is + past participle'. 'Speak' → participio 'SPOKEN'. 'Spoke' es el pasado simple, no el participio. 'English is spoken in Australia.'" },
    ],
    production: "Write 4 passive sentences: (1) A historical fact about your country (was built/was discovered/was founded...); (2) A general fact about language or science (is spoken/is made/is used...); (3) A recent news headline (has been elected/has been announced...); (4) A future plan for your city (will be opened/will be built...). Avoid mentioning the agent unless it's important.",
  },
];

export default function GramaticaInglesB1() {
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
          <Link href="/practica/ingles/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés B1</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>📐 Gramática</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Grammar · Inglés B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Gramática B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: 560, margin: '0 0 1.5rem', lineHeight: 1.6 }}>
          5 temas B1 con tabla de referencia, ejemplos en contexto, 5 fill-in-blank, 3 transformaciones, 2 detección de errores y producción libre.
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
            📌 <strong style={{ color: 'var(--ink)' }}>vs A2:</strong> {t.a2note}
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
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Producción libre</span>
          </div>
          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.2)', marginBottom: '0.85rem' }}>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7 }}>{t.production}</p>
          </div>
          {!allMCQ && (
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic' }}>
              🔒 Completa todos los ejercicios de arriba para desbloquear la producción libre.
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
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Tu producción</div>
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
                ? '¡Perfecto! Dominas este tema B1.'
                : correct >= Math.ceil(total * 0.7)
                ? 'Muy bien. Repasa los ejercicios marcados con ✗.'
                : 'Estudia la explicación arriba y vuelve a intentarlo.'}
            </p>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={reset} style={{ background: C, borderColor: C }}>Intentar de nuevo</button>
              {topicIdx < TOPICS.length - 1 && (
                <button className="btn btn-ghost btn-sm" onClick={() => { setTopicIdx(topicIdx + 1); reset(); }}>
                  Siguiente tema →
                </button>
              )}
              <Link href="/practica/ingles/b1" className="btn btn-ghost btn-sm">Volver a B1</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
