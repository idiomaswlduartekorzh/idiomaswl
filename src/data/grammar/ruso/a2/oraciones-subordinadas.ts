import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'oraciones-subordinadas',
  order: '17',
  color: '#1a2ecc',
  category: 'Sintaxis',
  level: 'A2',
  title: 'Oraciones subordinadas en ruso A2: что, чтобы, потому что',
  shortTitle: 'Subordinadas (что, чтобы)',
  metaTitle: 'Subordinadas ruso A2 — что, чтобы, потому что, conjunciones subordinantes rusas',
  description:
    'Las oraciones subordinadas en ruso se introducen con conjunciones: что (que, afirmación/pensamiento), чтобы (para que/que con subjuntivo), потому что (porque), когда (cuando), если (si). La conjunción что introduce complementos de verbos de pensamiento y comunicación. Чтобы introduce subordinadas de finalidad y deseo cuando los sujetos son diferentes: Я хочу, чтобы ты пришёл (Quiero que vengas) — siempre con verbo en pasado.',
  lead: 'Я думаю, что это правда / Я хочу, чтобы ты позвонил: subordinadas en ruso A2.',
  outcomes: [
    'Usar что para introducir oraciones declarativas subordinadas',
    'Usar чтобы para expresar finalidad y deseo con sujeto diferente',
    'Distinguir чтобы (+ pasado) de infinitivo con un solo sujeto',
    'Construir subordinadas causales con потому что',
  ],

  guide: {
    goal: 'Conectar ideas con что, чтобы y потому что en oraciones subordinadas rusas.',
    model: 'Я думаю, что он прав. (Creo que él tiene razón.) / Я хочу, чтобы ты позвонил. (Quiero que llames.) / Он остался дома, потому что был болен. (Se quedó en casa porque estaba enfermo.)',
    formula: 'V comunicación + что + V cualquier tiempo | хотеть/просить + чтобы + V pasado | V + потому что + causa',
    decisions: [
      'Что: Я знаю, что он учится. / Она сказала, что придёт. / Я думаю, что это неправда.',
      'Чтобы + pasado (sujetos distintos): Я хочу, чтобы она позвонила. / Он просил, чтобы мы не шумели.',
      'Чтобы + infinitivo (mismo sujeto = finalidad): Я учу русский, чтобы понять культуру.',
      'Потому что: Я опоздал, потому что пробки. / Она грустна, потому что уехал друг.',
      'Когда: Я позвоню, когда приеду. / Потому что responde ¿por qué?; если responde ¿en qué caso?',
    ],
    table: [
      ['Conjunción', 'Uso', 'Ejemplo'],
      ['что', 'completiva (que)', 'Я знаю, что он здесь.'],
      ['чтобы', 'finalidad / deseo', 'Хочу, чтобы ты пришёл.'],
      ['потому что', 'causa (porque)', 'Я устал, потому что работал.'],
    ],
    mistakes: [
      '"Я хочу, чтобы ты приходил" con imperfectivo → acción habitual. "чтобы ты пришёл" → una vez específica.',
      '"Я хочу чтобы учиться" ❌ → mismo sujeto = infinitivo: "Я хочу учиться" ✓. чтобы solo con sujetos distintos.',
      '"Потому" solo no es conjunción. Siempre "потому что" (dos palabras). "Поэтому" = por eso (consecuencia).',
    ],
  },

  seo: [
    {
      heading: 'Что y чтобы: dos conjunciones rusas esenciales',
      paragraphs: [
        'La conjunción что (pronunciada "što") introduce oraciones completivas declarativas: pensamientos, hechos, declaraciones. Se usa con verbos como думать (pensar), знать (saber), говорить (decir), понимать (entender): "Я знаю, что ты устал" (Sé que estás cansado), "Она говорит, что придёт" (Dice que vendrá). El verbo de la subordinada puede ir en cualquier tiempo gramatical.',
        'La conjunción чтобы introduce oraciones de finalidad y deseo. Cuando los sujetos son diferentes, el verbo va en pasado: "Я прошу, чтобы ты позвонил" (Te pido que llames). Cuando el sujeto es el mismo, se usa чтобы + infinitivo para expresar finalidad: "Я учу русский, чтобы жить в России" (Estudio ruso para vivir en Rusia). Esta distinción es fundamental.',
      ],
    },
    {
      heading: 'Потому что, поэтому y когда',
      paragraphs: [
        'Потому что (porque) introduce la causa de una acción o estado: "Я не пришёл, потому что был занят" (No vine porque estaba ocupado). No confundir con поэтому (por eso/por lo tanto), que introduce la consecuencia: "Я был занят, поэтому не пришёл" (Estaba ocupado, por eso no vine). Потому что responde a ¿por qué?; поэтому encabeza la oración resultado.',
        'La conjunción когда (cuando) introduce temporales: "Я позвоню тебе, когда приеду" (Te llamaré cuando llegue). En ruso, el futuro en la subordinada temporal es normal después de когда — a diferencia del español donde se usa el subjuntivo. "Когда я был маленьким" (Cuando era pequeño) con pasado para acciones habituales del pasado.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'что (declarativa) | чтобы + прош. (deseo/sujeto distinto) | чтобы + inf. (finalidad misma persona) | потому что (causa)',
    graphicPrompt: 'Diagrama de dos oraciones conectadas con "что", "чтобы" y "потому что".',
    scene: [
      ['Я думаю, что он говорит правду.', 'Creo que él dice la verdad.'],
      ['Она хочет, чтобы мы позвонили.', 'Ella quiere que llamemos.'],
      ['Я учу русский, чтобы жить в России.', 'Estudio ruso para vivir en Rusia.'],
      ['Он не пришёл, потому что заболел.', 'No vino porque enfermó.'],
      ['Я рад, что ты здесь.', 'Me alegra que estés aquí.'],
      ['Скажи ему, чтобы он позвонил.', 'Dile que llame.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['что (completiva)', 'чтобы + pasado (sujeto distinto)', 'чтобы + inf. (mismo sujeto)', 'потому что (causa)'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la conjunción correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona что, чтобы o потому что según el sentido.',
        type: 'choice',
        items: [
          {
            scene: 'Я знаю, ___ он живёт в Москве.',
            lines: [['', 'Я знаю, ___ он живёт в Москве.']],
            options: ['что', 'чтобы', 'потому что', 'когда'],
            answer: 'что',
            explain: '"что" — completiva declarativa. знать + что + declaración.',
          },
          {
            scene: 'Он учит испанский, ___ говорить с коллегами.',
            lines: [['', 'Он учит испанский, ___ говорить с коллегами.']],
            options: ['чтобы', 'что', 'потому что', 'если'],
            answer: 'чтобы',
            explain: '"чтобы" — finalidad (mismo sujeto) → чтобы + infinitivo.',
          },
          {
            scene: 'Она устала, ___ много работала.',
            lines: [['', 'Она устала, ___ много работала.']],
            options: ['потому что', 'что', 'чтобы', 'когда'],
            answer: 'потому что',
            explain: '"потому что" — causa. Устала ← porque mucho trabajó.',
          },
          {
            scene: 'Я хочу, ___ ты пришёл на вечеринку.',
            lines: [['', 'Я хочу, ___ ты пришёл на вечеринку.']],
            options: ['чтобы', 'что', 'потому что', 'если'],
            answer: 'чтобы',
            explain: '"чтобы" — deseo con sujeto distinto (yo quiero, tú vengas) + pasado пришёл.',
          },
          {
            scene: 'Она сказала, ___ придёт позже.',
            lines: [['', 'Она сказала, ___ придёт позже.']],
            options: ['что', 'чтобы', 'потому что', 'когда'],
            answer: 'что',
            explain: '"что" — сказала + что + declaración. Verbo en futuro en subordinada.',
          },
          {
            scene: 'Мы остались дома, ___ шёл дождь.',
            lines: [['', 'Мы остались дома, ___ шёл дождь.']],
            options: ['потому что', 'что', 'чтобы', 'если'],
            answer: 'потому что',
            explain: '"потому что" — causa: ¿por qué se quedaron? Porque llovía.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Completa las subordinadas',
        tag: '2 espacios',
        intro: 'Completa la conjunción y el verbo de la subordinada.',
        type: 'dual',
        items: [
          {
            scene: 'Quiero que él venga mañana.',
            lines: [['', 'Я хочу, [[0]] он [[1]] завтра.']],
            blanks: [
              { options: ['чтобы', 'что', 'потому что', 'если'], answer: 'чтобы', explain: '"чтобы" — deseo con sujeto distinto (я/он).' },
              { options: ['пришёл', 'придёт', 'приходит', 'прийти'], answer: 'пришёл', explain: '"пришёл" — чтобы + verbo en pasado (pf. masc.).' },
            ],
          },
          {
            scene: 'Ella sabe que nosotros estudiamos ruso.',
            lines: [['', 'Она знает, [[0]] мы [[1]] русский.']],
            blanks: [
              { options: ['что', 'чтобы', 'потому что', 'когда'], answer: 'что', explain: '"что" — знает + что + declaración.' },
              { options: ['учим', 'учили бы', 'учить', 'учили'], answer: 'учим', explain: '"учим" — presente de учить (мы). declaración actual.' },
            ],
          },
          {
            scene: 'Él llegó tarde porque había tráfico.',
            lines: [['', 'Он пришёл поздно, [[0]] были [[1]].']],
            blanks: [
              { options: ['потому что', 'что', 'чтобы', 'когда'], answer: 'потому что', explain: '"потому что" — causa del retraso.' },
              { options: ['пробки', 'пробку', 'пробок', 'пробками'], answer: 'пробки', explain: '"пробки" — nom. plural (atascos). Sujeto de la subordinada causal.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Carta de un estudiante',
        tag: 'Texto guiado',
        intro: 'Completa la carta con las conjunciones correctas.',
        type: 'guidedText',
        scene: 'Алексей пишет письмо другу.',
        text: 'Привет! Я рад, [[0]] ты написал мне. Я знаю, [[1]] ты сейчас занят. Я учу испанский, [[2]] путешествовать по Латинской Америке. Я хочу, [[3]] ты тоже начал учить язык. Я не пишу часто, [[4]] у меня много работы.',
        blanks: [
          { options: ['что', 'чтобы', 'потому что', 'если'], answer: 'что', explain: '"что" — рад + что = me alegra que. completiva.' },
          { options: ['что', 'чтобы', 'потому что', 'когда'], answer: 'что', explain: '"что" — знаю + что = sé que. declarativa.' },
          { options: ['чтобы', 'что', 'потому что', 'если'], answer: 'чтобы', explain: '"чтобы" — finalidad con mismo sujeto (yo) + infinitivo путешествовать.' },
          { options: ['чтобы', 'что', 'потому что', 'если'], answer: 'чтобы', explain: '"чтобы" — deseo con sujeto distinto (я хочу / ты начал) + pasado начал.' },
          { options: ['потому что', 'что', 'чтобы', 'когда'], answer: 'потому что', explain: '"потому что" — causa: ¿por qué no escribe? Porque tiene trabajo.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Construye subordinadas',
        tag: 'Texto libre',
        intro: 'Escribe la conjunción y forma verbal correctas.',
        type: 'freeText',
        scene: 'Соедини предложения с нужными союзами.',
        text: 'Она думает, ___ (que él llegará = придёт) / Мы хотим, ___ вы ___ (que ustedes vengan = пришли) / Я читаю книги, ___ (para aprender = узнавать) новое / Он устал, ___ (porque trabajó = работал)',
        blanks: [
          { answer: 'что он придёт', explain: '"что он придёт" — думает + что + declaración futura.' },
          { answer: 'чтобы вы пришли', explain: '"чтобы вы пришли" — deseo con sujeto distinto + pasado (вы пришли).' },
          { answer: 'чтобы', explain: '"чтобы узнавать" — finalidad con mismo sujeto + infinitivo.' },
          { answer: 'потому что работал', explain: '"потому что работал" — causa. pasado de работать (masc.).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Escribe oraciones subordinadas',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones completas con subordinadas.',
        type: 'write',
        items: [
          {
            scene: 'Expresa que sabes que ella estudia música.',
            prompt: 'Usa знать + что + учиться (presente).',
            answer: 'Я знаю, что она учится музыке.',
            accepted: ['Я знаю, что она занимается музыкой.'],
            explain: '"что она учится" — completiva declarativa. знаю + что + presente.',
          },
          {
            scene: 'Di que quieres que tu amigo llame mañana.',
            prompt: 'Usa хотеть + чтобы + позвонить (pasado masc.).',
            answer: 'Я хочу, чтобы мой друг позвонил завтра.',
            accepted: ['Я хочу, чтобы он позвонил мне завтра.'],
            explain: '"чтобы позвонил" — sujetos distintos (yo/él) + pasado pf. masc.',
          },
          {
            scene: 'Explica que no fuiste porque estabas enfermo.',
            prompt: 'Usa не прийти + потому что + быть болен (pasado masc.).',
            answer: 'Я не пришёл, потому что был болен.',
            accepted: ['Я не пришёл, потому что болел.'],
            explain: '"потому что был болен" — causa. был bolен (masc. pasado).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Tus opiniones y razones',
        tag: 'Escritura libre',
        intro: 'Expresa opiniones, deseos y causas con subordinadas.',
        type: 'write',
        items: [
          {
            scene: 'Escribe 3 cosas que piensas/sabes sobre estudiar idiomas.',
            prompt: 'Используй я думаю, что... / я знаю, что... / я считаю, что...',
            answer: 'Я думаю, что учить языки очень важно. Я знаю, что это требует времени и терпения. Я считаю, что практика важнее теории.',
            accepted: ['Я думаю, что русский язык красивый. Я знаю, что нужно много практиковаться. Я верю, что каждый может выучить язык.'],
            explain: 'что + indicativo para hechos y opiniones. Sin modo subjuntivo en ruso.',
          },
          {
            scene: 'Explica por qué estudias ruso y qué quieres lograr.',
            prompt: 'Используй потому что... / чтобы + inf. / хочу, чтобы...',
            answer: 'Я учу русский, потому что мне нравится культура России. Я хочу говорить по-русски, чтобы путешествовать. Я также хочу, чтобы мои друзья тоже учили этот язык.',
            accepted: ['Я учу русский потому что хочу жить в Москве. Я учусь, чтобы понять русскую литературу.'],
            explain: 'потому что (causa) + чтобы + inf. (finalidad misma persona) + чтобы + pasado (deseo otro sujeto).',
          },
        ],
      },
    ],
  },
}

export default topic
