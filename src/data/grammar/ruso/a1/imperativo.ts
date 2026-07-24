import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'imperativo',
  order: '19',
  color: '#1a2ecc',
  category: 'Глаголы',
  level: 'A1',
  title: 'Imperativo en ruso A1: читай, говори, идите, давай',
  shortTitle: 'Imperativo',
  metaTitle: 'Imperativo en ruso A1 — читай!, говорите!, давай + infinitivo',
  description:
    'El imperativo ruso (modo mandato) tiene dos formas principales: тебе (informal, singular) y вам (formal/plural). Se forma desde la 3ª persona plural del presente: убирают→убирай. Para español hablantes la diferencia está en la terminación: -й/-и/-ь para тебе, -йте/-ите/-ьте para вам. Давай + infinitivo es la forma de "vamos a..." para proponer acciones conjuntas.',
  lead: 'Читай! (¡Lee!), Говорите! (¡Hablen!), Давай поговорим! (¡Hablemos!) — el imperativo en ruso se forma de manera sistemática desde el presente y es esencial para la comunicación real desde A1.',
  outcomes: [
    'Formar el imperativo informal (ты) y formal/plural (вы) a partir del presente',
    'Usar давай/давайте + infinitivo para propuestas ("vamos a + infinitivo")',
    'Suavizar mandatos con пожалуйста (por favor) para sonar más cortés',
  ],
  guide: {
    goal: 'Dar instrucciones, hacer peticiones y proponer acciones con el imperativo ruso.',
    model: '3ª pl. presente → quitar -ут/-ют/-ат/-ят → + -й/-и/-ь (тебе) | + -йте/-ите/-ьте (вам)',
    formula: 'читают → чита + й → читай (tú) / читайте (vosotros/usted)',
    decisions: [
      '¿Te diriges a un amigo/estudiante? → тебе: читай, говори, иди',
      '¿Te diriges a un adulto formal o grupo? → вам: читайте, говорите, идите',
      '¿Propones hacer algo juntos? → давай + infinitivo: Давай поговорим (Hablemos)',
      '¿Quieres suavizar la petición? → + пожалуйста: Говорите медленнее, пожалуйста',
    ],
    table: [
      ['Infinitivo', 'Тебе (тú)', 'Вам (usted/ustedes)'],
      ['читать (leer)', 'читай', 'читайте'],
      ['говорить (hablar)', 'говори', 'говорите'],
      ['писать (escribir)', 'пиши', 'пишите'],
      ['идти (ir)', 'иди', 'идите'],
      ['слушать (escuchar)', 'слушай', 'слушайте'],
    ],
    mistakes: [
      'El negativo: НЕ + imperativo. НЕ читай! (¡No leas!) — igual que en español.',
      'Irregular básico: быть → будь (тебе) / будьте (вам) [sé / sean]. Muy usado.',
      'Давай + infinitivo imperfectivo (propuesta de proceso): Давай учить! (¡Estudiemos!)',
      'No existe "тебе + plural" ni "вам + singular" — son dos formas distintas, no de número.',
    ],
  },
  seo: [
    {
      heading: '¿Cómo se forma el imperativo en ruso para principiantes?',
      paragraphs: [
        'El imperativo ruso se deriva de la tercera persona plural del presente. Por ejemplo: говорят (hablan) → говори/говорите. Si la raíz termina en vocal, añades -й/-йте: читают → читай/читайте. Si termina en consonante, añades -и/-ите: говорят → говори/говорите. Este sistema es muy regular y cubre la mayoría de los verbos en A1.',
        'Para hablar con alguien de forma informal (amigos, compañeros, niños) usa la forma corta: читай, иди, слушай. Para adultos desconocidos, profesores o grupos, usa la forma larga: читайте, идите, слушайте. En clase de ruso siempre oirás: Слушайте! (¡Escuchen!), Повторяйте! (¡Repitan!), Читайте! (¡Lean!).',
      ],
      table: [
        ['Informal (тебе)', 'Formal/Plural (вам)', 'Español'],
        ['читай', 'читайте', '¡Lee! / ¡Lean!'],
        ['говори', 'говорите', '¡Habla! / ¡Hablen!'],
        ['иди', 'идите', '¡Ve! / ¡Vayan!'],
      ],
    },
  ],
  visual: {
    mode: 'paradigm',
    teacherLens:
      'The Russian imperative is derived from 3rd person plural: drop -ут/-ют/-ат/-ят, then add -й (after vowel) or -и (after consonant). Вам adds -те. Irregular in A1: иди (from идти, not *идй), будь (from быть). Давай + imperfective infinitive for suggestions. Emphasize пожалуйста to soften commands — cultural note: bare imperatives can sound rude.',
    graphicPrompt:
      'Two columns: informal (тебе) and formal (вам) imperative forms with arrows showing the derivation from 3rd pl. present. Examples: читай/читайте, говори/говорите, иди/идите. Blue Russian theme.',
    scene: [
      ['давай', 'Давай учить русский вместе! (¡Estudiemos ruso juntos!) — Давайте начнём. (¡Empecemos!)'],
      ['слушай/те', 'Слушай меня! (¡Escúchame!) — Слушайте внимательно! (¡Escuchen con atención!)'],
      ['читай/те', 'Читай текст. (Lee el texto.) — Читайте медленно, пожалуйста. (Lean despacio, por favor.)'],
      ['иди/те', 'Иди домой. (Ve a casa.) — Идите сюда. (Vengan aquí.)'],
    ],
    learnerModes: ['recognition', 'transformation', 'production'],
    practiceVerbs: ['читать', 'говорить', 'слушать', 'идти', 'писать', 'повторять'],
    reviewFocus: ['тебе: -й/-и', 'вам: -йте/-ите', 'давай + infinitivo', 'не + imperativo'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Imperativo — reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Identifica la forma imperativa correcta.',
        type: 'choice',
        items: [
          { scene: 'читать → тебе', lines: [['', '"¡Lee el texto! (informal)": ___ текст!']], options: ['читай', 'читайте', 'читаешь', 'читает'], answer: 'читай', explain: 'Читай — imperativo informal (тебе). Читают → читай.' },
          { scene: 'говорить → вам', lines: [['', '"¡Hablen más lento! (formal)": ___ медленнее!']], options: ['говори', 'говорите', 'говоришь', 'говорит'], answer: 'говорите', explain: 'Говорите — imperativo formal/plural (вам). Говорят → говори + те.' },
          { scene: 'слушать → тебе', lines: [['', '"¡Escúchame! (informal)": ___ меня!']], options: ['слушайте', 'слушай', 'слушаешь', 'слушает'], answer: 'слушай', explain: 'Слушай — imperativo informal. Слушают → слушай.' },
          { scene: 'давай + inf', lines: [['', '"¡Estudiemos juntos!": ___ учить вместе!']], options: ['давай', 'давайте', 'дай', 'дайте'], answer: 'давай', explain: 'Давай + infinitivo = propuesta informal a alguien. Давайте es la versión formal/plural.' },
          { scene: 'идти → вам', lines: [['', '"¡Vengan aquí! (formal)": ___ сюда!']], options: ['иди', 'идёт', 'идите', 'идём'], answer: 'идите', explain: 'Идите — imperativo formal/plural de идти. Irregular: иди/идите (no *идй).' },
          { scene: 'писать → тебе', lines: [['', '"¡Escribe tu nombre!": ___ своё имя!']], options: ['пишите', 'писай', 'пиши', 'пишешь'], answer: 'пиши', explain: 'Пиши — imperativo informal de писать. Пишут → пиш + и (consonante final → -и).' },
          { scene: 'повторять → вам', lines: [['', '"¡Repitan, por favor!": ___ пожалуйста!']], options: ['повторяй', 'повторяйте', 'повторяют', 'повторяет'], answer: 'повторяйте', explain: 'Повторяйте — imperativo formal/plural. Повторяют → повторяй + те.' },
          { scene: 'negativo + читать', lines: [['', '"¡No leas eso!": ___ это!']], options: ['не читай', 'не читайте', 'читай не', 'не читает'], answer: 'не читай', explain: 'НЕ + imperativo informal: не читай. El НЕ va antes del imperativo.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Imperativo formal e informal',
        tag: '2 espacios',
        intro: 'Elige entre la forma informal (тебе) y formal (вам) según el contexto.',
        type: 'dual',
        items: [
          { scene: 'A tu amigo', lines: [['', '"¡Escucha la canción y escribe!": [[0]] песню и [[1]]!']], blanks: [{ options: ['слушай', 'слушайте', 'слушает', 'слушаешь'], answer: 'слушай', explain: 'A un amigo → informal: слушай.' }, { options: ['пиши', 'пишите', 'пишешь', 'пишут'], answer: 'пиши', explain: 'Pishi — imperativo informal de писать (пишут→пиши).' }] },
          { scene: 'Al profesor (formal)', lines: [['', '"Por favor, hable más lento": [[0]] медленнее, [[1]].']], blanks: [{ options: ['говорите', 'говори', 'говорит', 'говоришь'], answer: 'говорите', explain: 'Al profesor → formal: говорите.' }, { options: ['пожалуйста', 'спасибо', 'извините', 'пожалуй'], answer: 'пожалуйста', explain: 'Пожалуйста = por favor. Suaviza el imperativo.' }] },
          { scene: 'Propuesta (давай)', lines: [['', '"¡Estudiemos ruso hoy!": [[0]] [[1]] сегодня!']], blanks: [{ options: ['давай', 'давайте', 'дай', 'дайте'], answer: 'давай', explain: 'Давай + inf = propuesta informal (solo dos personas).' }, { options: ['учить', 'учи', 'учиться', 'учишь'], answer: 'учить', explain: 'Давай + infinitivo imperfectivo. Учить = enseñar/estudiar.' }] },
          { scene: 'A grupo (вам)', lines: [['', '"¡Lean el texto en voz alta!": [[0]] текст [[1]]!']], blanks: [{ options: ['читайте', 'читай', 'читает', 'читают'], answer: 'читайте', explain: 'A un grupo → вам: читайте.' }, { options: ['вслух', 'громко', 'тихо', 'быстро'], answer: 'вслух', explain: 'Вслух = en voz alta. Слушайте вслух / читайте вслух.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Класс — урок русского',
        tag: 'Opciones',
        intro: 'Elige los imperativos correctos en un contexto de clase.',
        type: 'guidedText',
        scene: 'Primera clase de ruso con Hugo en WeLearn',
        text: 'Дэвид говорит: «[[0]] внимательно!» (¡Escuchen con atención!) Потом: «[[1]] это слово». (Repitan esta palabra.) «[[2]] в тетради». (Escriban en el cuaderno.) Студент спрашивает: «Можно [[3]] вопрос?» (¿Puedo hacer una pregunta?) «Конечно! [[4]] всё, что хочешь». (¡Por supuesto! Pregunta todo lo que quieras.)',
        blanks: [
          { options: ['Слушайте', 'Слушай', 'Слушает', 'Слушайте-ка'], answer: 'Слушайте', explain: 'Al grupo de estudiantes → вам: слушайте.' },
          { options: ['Повторяйте', 'Повторяй', 'Повторяет', 'Повторять'], answer: 'Повторяйте', explain: 'Al grupo → вам: повторяйте (повторяют → повторяй + те).' },
          { options: ['Пишите', 'Пиши', 'Пишет', 'Писать'], answer: 'Пишите', explain: 'Al grupo → вам: пишите (пишут → пиш + ите).' },
          { options: ['задать', 'задаю', 'задаёт', 'задавай'], answer: 'задать', explain: 'Можно + infinitivo: Можно задать вопрос? (¿Puedo hacer una pregunta?)' },
          { options: ['Спрашивай', 'Спрашивайте', 'Спрашивает', 'Спрашивать'], answer: 'Спрашивай', explain: 'Al estudiante individual → тебе: спрашивай (informal, friendly).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Imperativo — escritura libre',
        tag: 'Sin opciones',
        intro: 'Escribe los imperativos correctos sin opciones.',
        type: 'freeText',
        scene: 'Instrucciones de clase',
        text: '1. "¡Escucha! (informal)": [[0]]! 2. "¡Escriban! (formal)": [[1]]! 3. "¡No leas! (informal)": Не [[2]]! 4. "¡Hablemos ruso!": Давай [[3]] по-русски! 5. "¡Vengan! (formal)": [[4]] сюда!',
        blanks: [
          { answer: 'Слушай', accepted: ['Слушай', 'слушай'], explain: 'Слушай — imperativo informal de слушать.' },
          { answer: 'Пишите', accepted: ['Пишите', 'пишите'], explain: 'Пишите — imperativo formal/plural de писать.' },
          { answer: 'читай', accepted: ['читай'], explain: 'Не читай — negativo informal. НЕ + imperativo informal.' },
          { answer: 'говорить', accepted: ['говорить', 'учить'], explain: 'Давай + infinitivo: давай говорить (propuesta).' },
          { answer: 'Идите', accepted: ['Идите', 'идите'], explain: 'Идите — imperativo formal/plural de идти.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Instrucciones reales',
        tag: 'Producción',
        intro: 'Escribe instrucciones usando el imperativo.',
        type: 'write',
        items: [
          { scene: 'Instrucción informal', prompt: 'Da una instrucción informal: "¡Lee el texto y escribe las palabras!"', answer: 'Читай текст и пиши слова!', accepted: ['Читай текст и пиши слова!', 'Читай текст и пишите слова!'], explain: 'Imperativo informal: читай (читать) y пиши (писать).' },
          { scene: 'Instrucción formal', prompt: 'Da una instrucción formal a un grupo: "¡Escuchen y repitan!"', answer: 'Слушайте и повторяйте!', accepted: ['Слушайте и повторяйте!'], explain: 'Imperativo formal: слушайте y повторяйте.' },
          { scene: 'Propuesta conjunta', prompt: 'Propón algo juntos: "¡Hablemos ruso en WeLearn!"', answer: 'Давай говорить по-русски в WeLearn!', accepted: ['Давай говорить по-русски в WeLearn!', 'Давайте говорить по-русски в WeLearn!'], explain: 'Давай/давайте + infinitivo para propuestas.' },
          { scene: 'Petición cortés', prompt: 'Pide amablemente: "Por favor, hable más despacio."', answer: 'Говорите медленнее, пожалуйста.', accepted: ['Говорите медленнее, пожалуйста.', 'Пожалуйста, говорите медленнее.'], explain: 'Imperativo formal + пожалуйста. Медленнее = más despacio.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión — ¡Dile a alguien qué hacer!',
        tag: 'Libre',
        intro: 'Escribe dos instrucciones o propuestas originales usando el imperativo ruso.',
        type: 'write',
        items: [
          { scene: 'Instrucciones de clase', prompt: 'Escribe dos instrucciones de clase para un grupo de estudiantes (imperativo formal).', answer: 'Читайте текст и пишите ответы! Слушайте внимательно, пожалуйста.', accepted: ['йте', 'ите'], explain: 'Imperativo вам: -йте o -ите. Por ejemplo: слушайте, читайте, пишите, повторяйте.' },
          { scene: 'Propuesta a un amigo', prompt: 'Propón una actividad a un amigo usando "давай + infinitivo".', answer: 'Давай учить русский слова вместе!', accepted: ['давай', 'давайте'], explain: 'Давай + infinitivo imperfectivo = ¡vamos a...! Expresa propuesta conjunta.' },
        ],
      },
    ],
  },
}

export default topic
