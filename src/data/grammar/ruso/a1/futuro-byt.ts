import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'futuro-byt',
  order: '17',
  color: '#1a2ecc',
  category: 'Глаголы',
  level: 'A1',
  title: 'Futuro en ruso A1: быть + infinitivo y el futuro perfecto básico',
  shortTitle: 'Futuro con быть',
  metaTitle: 'Futuro en ruso A1 — буду, будешь, будет, будем, будете, будут + infinitivo',
  description:
    'Para expresar el futuro en ruso imperfectivo (acciones que ocurrirán, no completadas) se usa буду/будешь/будет/будем/будете/будут + infinitivo. Буду работать = Voy a trabajar / Trabajaré. Es el equivalente de "will" + verb en inglés. Además, muchos verbos perfectivos forman el futuro directamente en el presente.',
  lead: 'Буду работать, будешь учить, будем говорить — con буду + infinitivo expresas lo que harás en el futuro en ruso. Similar al español "voy a + infinitivo".',
  outcomes: [
    'Conjugar быть en futuro: буду/будешь/будет/будем/будете/будут',
    'Usar буду + infinitivo para expresar acciones futuras continuas o habituales',
    'Distinguir el futuro imperfectivo (буду + inf) del perfectivo básico',
  ],
  guide: {
    goal: 'Expresar planes y acciones futuras con буду + infinitivo.',
    model: '[буду/будешь/будет...] + [infinitivo imperfectivo]',
    formula: 'Я буду + inf | Ты будешь + inf | Он/она будет + inf | Мы будем + inf',
    decisions: [
      '¿Hablas de una acción que durará o se repetirá en el futuro? → буду + infinitivo',
      '¿Es una predicción general? → буду работать (Trabajaré)',
      '¿Expresas un plan? → буду учить (Voy a estudiar)',
      '¿Quieres el futuro de быть mismo (seré/estaré)? → Я буду студентом (Seré estudiante)',
    ],
    table: [
      ['Persona', 'Futuro de быть', 'Ejemplo'],
      ['я', 'буду', 'Я буду работать (Voy a trabajar)'],
      ['ты', 'будешь', 'Ты будешь учить (Vas a estudiar)'],
      ['он/она/оно', 'будет', 'Он будет говорить (Va a hablar)'],
      ['мы', 'будем', 'Мы будем говорить (Vamos a hablar)'],
      ['вы', 'будете', 'Вы будете смотреть (Van a ver)'],
      ['они', 'будут', 'Они будут читать (Van a leer)'],
    ],
    mistakes: [
      '"Буду" + infinitivo (no la forma conjugada): Я буду работать (✓), NO Я буду работаю (✗).',
      'Быть tiene forma pasada también: я был/была (yo era/estaba), они были (ellos eran/estaban).',
      'Futuro perfectivo: algunos verbos forman futuro directamente en presente (perfectivo): я прочитаю = leeré (y terminaré). Para A1 foco en буду + inf.',
      'Буду solo (sin infinitivo) = seré/estaré: Я буду здесь = Estaré aquí. Я буду инженером = Seré ingeniero.',
    ],
  },
  seo: [
    {
      heading: '¿Cómo se forma el futuro en ruso para principiantes?',
      paragraphs: [
        'El futuro en ruso tiene dos formas. La más simple para A1 es буду + infinitivo del verbo imperfectivo: Я буду читать (Voy a leer / Leeré). Esta construcción es equivalente al español "voy a + infinitivo" y se usa para acciones que durarán o se repetirán en el futuro.',
        'El futuro "perfectivo" (para acciones completas y terminadas) usa el presente del verbo perfectivo: Я прочитаю (Leeré el libro y lo terminaré). Esta distinción perfectivo/imperfectivo es única del ruso y se aprende gradualmente. En A1, буду + infinitivo es suficiente para comunicarse.',
      ],
      table: [
        ['Pronombre', 'Futuro быть', 'Ejemplo'],
        ['я', 'буду', 'Я буду учить русский (Voy a estudiar ruso)'],
        ['ты', 'будешь', 'Ты будешь работать? (¿Vas a trabajar?)'],
        ['он/она', 'будет', 'Она будет дома (Ella estará en casa)'],
        ['мы', 'будем', 'Мы будем вместе (Estaremos juntos)'],
        ['они', 'будут', 'Они будут учиться (Van a estudiar)'],
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'буду + infinitive is the A1 future. The perfective future (я прочитаю) is too complex for A1. Focus on the pattern "буду + imperfective infinitive" as the go-to future tense, noting that быть alone (без infinitivo) means "will be".',
    graphicPrompt:
      'Forward arrow timeline with "СЕЙЧАС" (now) and "БУДУЩЕЕ" (future) label. Six pronoun boxes each showing буду/будешь/etc. + example infinitive. Blue Russian theme.',
    scene: [
      ['я', 'Я буду учить русский (búdu) — Voy a estudiar ruso'],
      ['ты', 'Ты будешь работать? (búdesh) — ¿Vas a trabajar?'],
      ['он/она', 'Он будет дома (búdet) — Él estará en casa'],
      ['мы', 'Мы будем говорить (búdem) — Vamos a hablar'],
      ['вы', 'Вы будете читать (búdete) — Van a leer'],
      ['они', 'Они будут жить там (búdut) — Van a vivir allí'],
    ],
    learnerModes: ['recognition', 'transformation', 'gap-fill', 'production'],
    practiceVerbs: ['работать', 'учить', 'говорить', 'читать', 'жить', 'быть'],
    reviewFocus: ['буду/будешь/будет/будем/будете/будут', 'буду + infinitivo imperfectivo', 'буду solo = seré/estaré'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Будущее время — буду',
        tag: 'Opción múltiple',
        intro: 'Identifica la forma correcta del futuro con быть.',
        type: 'choice',
        items: [
          { scene: 'Я + буду', lines: [['', '"Voy a trabajar mañana": Я ___ работать завтра.']], options: ['был', 'буду', 'будет', 'будем'], answer: 'буду', explain: 'Я буду работать. Futuro de быть para я = буду. + infinitivo: работать.' },
          { scene: 'Она + будет', lines: [['', '"Ella va a estudiar": Она ___ учить.']], options: ['буду', 'будешь', 'будет', 'будут'], answer: 'будет', explain: 'Она будет учить. Futuro de быть para она/он/оно = будет.' },
          { scene: 'Мы + будем', lines: [['', '"Vamos a hablar ruso": Мы ___ говорить по-русски.']], options: ['будут', 'будете', 'буду', 'будем'], answer: 'будем', explain: 'Мы будем говорить. Futuro de быть para мы = будем.' },
          { scene: 'Форма будущего', lines: [['', '¿Cuál es la forma correcta de "Voy a leer"?']], options: ['Я буду читаю', 'Я буду читать', 'Я читать буду', 'Я читаю буду'], answer: 'Я буду читать', explain: 'Буду + infinitivo. El infinitivo NUNCA se conjuga: буду читать, не буду читаю.' },
          { scene: 'Они + будут', lines: [['', '"Ellos van a vivir en Moscú": Они ___ жить в Москве.']], options: ['будет', 'будем', 'будут', 'будете'], answer: 'будут', explain: 'Они будут жить. Futuro de быть para они = будут.' },
          { scene: 'Буду solo', lines: [['', '"Estaré en casa": Я ___ дома.']], options: ['буду учить', 'буду', 'будет', 'будем'], answer: 'буду', explain: 'Буду solo (sin infinitivo) = seré/estaré. Я буду дома = Estaré en casa.' },
          { scene: 'Вы + будете', lines: [['', '"¿Van a trabajar mañana?": Вы ___ работать завтра?']], options: ['будет', 'будем', 'буду', 'будете'], answer: 'будете', explain: 'Вы будете работать? Futuro de быть para вы = будете.' },
          { scene: 'Ты + будешь', lines: [['', '"¿Vas a aprender japonés?": Ты ___ учить японский?']], options: ['буду', 'будет', 'будешь', 'будем'], answer: 'будешь', explain: 'Ты будешь учить японский? Futuro de быть para ты = будешь.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Буду + инфинитив',
        tag: '2 espacios',
        intro: 'Completa con la forma correcta de быть y el infinitivo.',
        type: 'dual',
        items: [
          { scene: 'Yo — leer', lines: [['', '"Voy a leer el libro": Я [[0]] [[1]] книгу.']], blanks: [{ options: ['буду', 'будешь', 'будет', 'будем'], answer: 'буду', explain: 'Я → буду (primera persona, futuro de быть).' }, { options: ['читаю', 'читать', 'читал', 'прочитать'], answer: 'читать', explain: 'Буду + infinitivo: читать. (No "буду читаю").' }] },
          { scene: 'Ellos — vivir', lines: [['', '"Ellos van a vivir en Brasil": Они [[0]] [[1]] в Бразилии.']], blanks: [{ options: ['буду', 'будет', 'будут', 'будем'], answer: 'будут', explain: 'Они → будут (tercera persona plural).' }, { options: ['живут', 'жить', 'жил', 'живёт'], answer: 'жить', explain: 'Будут + infinitivo: жить (vivir).' }] },
          { scene: 'Tú — estudiar', lines: [['', '"¿Vas a estudiar mañana?": Ты [[0]] [[1]] завтра?']], blanks: [{ options: ['буду', 'будешь', 'будет', 'будем'], answer: 'будешь', explain: 'Ты → будешь (segunda persona singular).' }, { options: ['учусь', 'учиться', 'учил', 'учит'], answer: 'учиться', explain: 'Будешь + infinitivo: учиться (estudiar, reflexivo).' }] },
          { scene: 'Nosotros — hablar', lines: [['', '"Vamos a hablar ruso en WeLearn": Мы [[0]] [[1]] по-русски в WeLearn.']], blanks: [{ options: ['будем', 'будут', 'будете', 'буду'], answer: 'будем', explain: 'Мы → будем (primera persona plural).' }, { options: ['говорим', 'говорить', 'говорил', 'говорит'], answer: 'говорить', explain: 'Будем + infinitivo: говорить (hablar).' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Текст — планы на будущее',
        tag: 'Opciones',
        intro: 'Elige la forma correcta del futuro con быть.',
        type: 'guidedText',
        scene: 'Los planes de Tomás para el próximo año',
        text: 'В следующем году Дэвид [[0]] работать в Сеуле. (Tomás va a trabajar en Seúl.) Он [[1]] учить корейский каждый день. (Va a estudiar coreano cada día.) Его студенты [[2]] готовиться к экзамену TOPIK. (Sus estudiantes van a prepararse.) Мы [[3]] встречаться по пятницам. (Nos vamos a ver los viernes.) Жанна [[4]] помогать онлайн. (Iris va a ayudar online.)',
        blanks: [
          { options: ['будет', 'буду', 'будем', 'будут'], answer: 'будет', explain: 'Дэвид (он) → будет. Tercera persona singular.' },
          { options: ['будет', 'буду', 'будем', 'будут'], answer: 'будет', explain: 'Он (Tomás) → будет. Aprendizaje futuro.' },
          { options: ['будет', 'буду', 'будут', 'будем'], answer: 'будут', explain: 'Студенты (они) → будут. Tercera persona plural.' },
          { options: ['будем', 'будут', 'будет', 'буду'], answer: 'будем', explain: 'Мы → будем. Primera persona plural.' },
          { options: ['будет', 'буду', 'будут', 'будем'], answer: 'будет', explain: 'Жанна (она) → будет. Tercera persona singular.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Свободное письмо — будущее',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta del futuro sin opciones.',
        type: 'freeText',
        scene: 'Expresando planes futuros',
        text: '1. "Mañana voy a estudiar ruso": Завтра я [[0]] учить русский. 2. "¿Vas a trabajar hoy?": Ты [[1]] работать сегодня? 3. "Ella va a estar en casa": Она [[2]] дома. 4. "Vamos a hablar español": Мы [[3]] говорить по-испански. 5. "Ellos van a aprender coreano": Они [[4]] учить корейский.',
        blanks: [
          { answer: 'буду', accepted: ['буду'], explain: 'Я → буду. Futuro de быть primera persona singular.' },
          { answer: 'будешь', accepted: ['будешь'], explain: 'Ты → будешь. Segunda persona singular.' },
          { answer: 'будет', accepted: ['будет'], explain: 'Она → будет. Tercera persona singular. Буду solo = seré/estaré.' },
          { answer: 'будем', accepted: ['будем'], explain: 'Мы → будем. Primera persona plural.' },
          { answer: 'будут', accepted: ['будут'], explain: 'Они → будут. Tercera persona plural.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Будущее в предложениях',
        tag: 'Producción',
        intro: 'Construye frases completas con el futuro de быть.',
        type: 'write',
        items: [
          { scene: 'Planes para el año que viene', prompt: 'Traduce al ruso: "El próximo año voy a vivir en Corea y voy a estudiar coreano." (в следующем году = el próximo año, жить = vivir, учить = estudiar)', answer: 'В следующем году я буду жить в Корее и буду учить корейский.', accepted: ['буду жить', 'буду учить'], explain: 'Я буду жить + я буду учить. Dos planes futuros con буду + infinitivo.' },
          { scene: 'Predicción', prompt: 'Traduce al ruso: "Tomás va a ser un famoso profesor de idiomas. Sus estudiantes van a hablar muchos idiomas." (знаменитый = famoso, преподаватель = profesor)', answer: 'Дэвид будет знаменитым преподавателем языков. Его студенты будут говорить на многих языках.', accepted: ['будет', 'будут говорить'], explain: 'Будет + sustantivo (seré). Будут говорить = van a hablar (futuro con inf).' },
          { scene: 'Pregunta y respuesta', prompt: 'Escribe en ruso: "¿Qué vas a hacer mañana? — Voy a trabajar por la mañana y por la tarde voy a aprender ruso." (утром = por la mañana, вечером = por la tarde)', answer: 'Что ты будешь делать завтра? — Утром я буду работать, а вечером я буду учить русский.', accepted: ['будешь делать', 'буду работать', 'буду учить'], explain: 'Будешь делать (pregunta). Буду работать + буду учить (respuesta con dos planes).' },
          { scene: 'Promesas', prompt: 'Escribe en ruso 3 "promesas" de aprendizaje de idiomas: "Voy a estudiar cada día. Voy a hablar más. Nunca voy a rendirme." (сдаваться = rendirse)', answer: 'Я буду учиться каждый день. Я буду говорить больше. Я никогда не буду сдаваться.', accepted: ['буду учиться', 'буду говорить', 'не буду сдаваться'], explain: 'Tres formas con буду + inf. Никогда не буду = nunca voy a (doble negación).' },
        ],
      },
      {
        id: 'level-6',
        title: 'Миссия будущего',
        tag: 'Producción',
        intro: 'Usa el futuro de быть para hablar de tus planes reales.',
        type: 'write',
        items: [
          { scene: 'Мои планы на год (Mis planes para el año)', prompt: 'Escribe un párrafo de 4-5 frases sobre tus planes para el próximo año usando буду + infinitivo. Usa al menos 4 verbos diferentes: жить, работать, учить, говорить, путешествовать (viajar), изучать (estudiar en profundidad).', answer: 'В следующем году я буду жить в новом городе. Я буду учить русский и японский языки. Я буду работать онлайн. Я буду путешествовать по Латинской Америке. Я буду говорить на пяти языках!', accepted: ['буду жить', 'буду учить', 'буду работать', 'буду путешествовать'], explain: 'Куatro глагола с буду + инфинитив. Será natural y fluido para A1+.' },
          { scene: 'Планы WeLearn', prompt: 'Escribe en ruso los planes de WeLearn para el próximo año: qué van a enseñar, cuántos estudiantes van a tener, y qué proyectos van a hacer. Usa они/мы будут/будем.', answer: 'В следующем году мы будем преподавать шесть языков. Мы будем работать с двумястами студентами. Они будут учиться онлайн и офлайн. Мы будем создавать новые курсы.', accepted: ['будем', 'будут'], explain: 'Мы будем (nuestros planes) + Они будут (los estudiantes). Futuro institucional.' },
        ],
      },
    ],
  },
}

export default topic
