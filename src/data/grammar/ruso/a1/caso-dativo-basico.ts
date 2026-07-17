import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'caso-dativo-basico',
  order: '20',
  color: '#1a2ecc',
  category: 'Падежи',
  level: 'A1',
  title: 'Caso dativo básico en ruso A1: мне, тебе, ему, ей — мне нравится',
  shortTitle: 'Caso dativo',
  metaTitle: 'Dativo en ruso A1 — мне нравится, мне надо, дать кому, pronombres dativo',
  description:
    'El dativo en ruso expresa el destinatario de una acción (dar A alguien, escribir A alguien) y también se usa en construcciones especiales para hablar de gustos (мне нравится), necesidades (мне надо) y edad (мне двадцать лет). Para A1, lo esencial es dominar los pronombres personales en dativo y las expresiones más frecuentes.',
  lead: 'Мне нравится рус ский (Me gusta el ruso), мне надо учить (Necesito estudiar), дай мне (dame) — el dativo en ruso no es difícil si empiezas con los pronombres. ¡Y мне нравится lo usarás desde el primer día!',
  outcomes: [
    'Usar los pronombres personales en dativo: мне, тебе, ему, ей, нам, вам, им',
    'Expresar gustos con мне нравится/нравятся',
    'Expresar necesidad con мне надо/нужно + infinitivo',
  ],
  guide: {
    goal: 'Expresar gustos, necesidades y destinatarios usando el dativo.',
    model: 'мне нравится [что] | мне надо [+ inf] | дать [кому] + [что]',
    formula: 'я→мне | ты→тебе | он→ему | она→ей | мы→нам | вы→вам | они→им',
    decisions: [
      '¿Expresas que algo te gusta? → мне нравится (singular) / мне нравятся (plural)',
      '¿Dices que necesitas hacer algo? → мне надо/нужно + infinitivo',
      '¿Das o dices algo A alguien? → дать/сказать + дативо pronombre',
      '¿Preguntas a quién? → Кому? + verbo → дательный падеж',
    ],
    table: [
      ['Nominativo', 'Dativo', 'Español'],
      ['я', 'мне', 'a mí / me'],
      ['ты', 'тебе', 'a ti / te'],
      ['он', 'ему', 'a él / le'],
      ['она', 'ей', 'a ella / le'],
      ['мы', 'нам', 'a nosotros / nos'],
      ['вам', 'вам', 'a ustedes / les'],
      ['они', 'им', 'a ellos / les'],
    ],
    mistakes: [
      'Мне нравится (singular) vs мне нравятся (plural): мне нравится рус ский (un libro), мне нравятся книги (libros).',
      'El sujeto real de "мне нравится" es el objeto que gusta: Мне нравится рус ский язык (El idioma ruso me gusta A MÍ). El dativo = quien siente el gusto.',
      'Мне надо (necesidad inmediata, coloquial) ≈ Мне нужно (necesidad general). Ambos + infinitivo.',
      'Los sustantivos también declinan en dativo, pero para A1 los pronombres son suficientes.',
    ],
  },
  seo: [
    {
      heading: '¿Cómo funciona el dativo en ruso para principiantes?',
      paragraphs: [
        'El dativo (дательный падеж) es el cuarto caso del ruso y expresa principalmente el destinatario indirecto: "dar A alguien", "escribir A alguien". Pero en A1 lo más importante es que el dativo aparece en tres construcciones esenciales: мне нравится (me gusta), мне надо (necesito), y para expresar la edad: мне двадцать лет (tengo 20 años, literalmente "a mí son 20 años").',
        'Para los hispanohablantes, el dativo en pronombres es relativamente intuitivo: мне = me/a mí, тебе = te/a ti, ему = le/a él, ей = le/a ella, нам = nos/a nosotros, вам = les/a ustedes, им = les/a ellos. La construcción мне нравится es casi como decir "a mí me place" en español literario, donde el gusto se expresa con dativo del que siente.',
      ],
      table: [
        ['Expresión', 'Significado', 'Ejemplo'],
        ['мне нравится', 'me gusta', 'Мне нравится рус ский язык'],
        ['мне надо', 'necesito', 'Мне надо учить русский'],
        ['скажи/те мне', 'dime / dígame', 'Скажите мне, пожалуйста'],
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'The A1 dative focus is: 1) pronoun paradigm (мне/тебе/ему/ей/нам/вам/им), 2) мне нравится construction (subject is what is liked, dative is the experiencer), 3) мне надо/нужно + infinitive. Noun dative declension (-е/-у for masc/neut, -е for fem) can be introduced but is not required at A1. Note: вам stays "вам" in both nominative (as formal "you") and dative.',
    graphicPrompt:
      'Pronoun transformation chart: я→мне, ты→тебе, он→ему, она→ей, мы→нам, вы→вам, они→им. Below: two key patterns: мне нравится + [noun] and мне надо + [verb]. Blue Russian theme.',
    scene: [
      ['мне нравится', 'Мне нравится рус ский. (Me gusta el ruso.) — Мне нравятся языки. (Me gustan los idiomas.)'],
      ['тебе нравится?', 'Тебе нравится кофе? (¿Te gusta el café?) — Ему нравится музыка. (A él le gusta la música.)'],
      ['мне надо', 'Мне надо учить слова. (Necesito estudiar palabras.) — Тебе надо практиковать. (Necesitas practicar.)'],
      ['дать/сказать', 'Скажи мне! (¡Dime!) — Дэвид объяснил нам правило. (David nos explicó la regla.)'],
    ],
    learnerModes: ['recognition', 'gap-fill', 'production'],
    practiceVerbs: ['нравиться', 'надо', 'нужно', 'дать', 'сказать', 'объяснить'],
    reviewFocus: ['мне/тебе/ему/ей/нам/вам/им', 'мне нравится (sg) / нравятся (pl)', 'мне надо + инфинитив'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Дательный падеж — местоимения',
        tag: 'Opción múltiple',
        intro: 'Elige el pronombre dativo correcto.',
        type: 'choice',
        items: [
          { scene: 'я → мне', lines: [['', '"Me gusta el ruso": ___ нравится русский.']], options: ['мне', 'меня', 'мной', 'мне'], answer: 'мне', explain: 'Я → мне (dativo). Мне нравится = me gusta (literalmente: a mí le place).' },
          { scene: 'ты → тебе', lines: [['', '"¿Te gusta el café?": ___ нравится кофе?']], options: ['тебя', 'тебе', 'тобой', 'тебе'], answer: 'тебе', explain: 'Ты → тебе (dativo). Тебе нравится = te gusta.' },
          { scene: 'он → ему', lines: [['', '"A él le gusta la música": ___ нравится музыка.']], options: ['его', 'ему', 'им', 'он'], answer: 'ему', explain: 'Он → ему (dativo). A él le gusta = ему нравится.' },
          { scene: 'они → им', lines: [['', '"A ellos les gusta estudiar": ___ нравится учиться.']], options: ['их', 'ими', 'им', 'они'], answer: 'им', explain: 'Они → им (dativo plural). Им нравится = a ellos les gusta.' },
          { scene: 'мы → нам', lines: [['', '"Necesitamos estudiar": ___ надо учить.']], options: ['нас', 'нами', 'нам', 'мы'], answer: 'нам', explain: 'Мы → нам (dativo). Нам надо = nosotros necesitamos.' },
          { scene: 'нравится vs нравятся', lines: [['', '"Me gustan los idiomas": Мне ___ языки.']], options: ['нравится', 'нравятся', 'нравиться', 'нравитесь'], answer: 'нравятся', explain: 'Языки = plural → мне нравятся. (нравится = singular, нравятся = plural).' },
          { scene: 'мне надо', lines: [['', '"Necesito hablar más": Мне ___ говорить больше.']], options: ['надо', 'нада', 'нужна', 'нужны'], answer: 'надо', explain: 'Мне надо + infinitivo = necesito hacer algo. Надо es invariable.' },
          { scene: 'скажи мне', lines: [['', '"¡Dime tu nombre!": Скажи ___ своё имя!']], options: ['меня', 'мне', 'мной', 'я'], answer: 'мне', explain: 'Дать/сказать кому? → дативо: скажи мне (дime = dí a mí).' },
        ],
      },
      {
        id: 'level-2',
        title: 'Мне нравится + мне надо',
        tag: '2 espacios',
        intro: 'Completa con pronombre dativo y la forma de нравиться correcta.',
        type: 'dual',
        items: [
          { scene: 'Me gusta el ruso', lines: [['', '"Me gusta el idioma ruso": [[0]] [[1]] русский язык.']], blanks: [{ options: ['мне', 'меня', 'мной', 'мне'], answer: 'мне', explain: 'Я → мне. Dativo del experimentador del gusto.' }, { options: ['нравится', 'нравятся', 'нравиться', 'нравился'], answer: 'нравится', explain: 'Русский язык = singular → нравится (concordancia con el sujeto).' }] },
          { scene: 'Te gustan los idiomas', lines: [['', '"¿Te gustan los idiomas?": [[0]] [[1]] языки?']], blanks: [{ options: ['тебе', 'тебя', 'тобой', 'ты'], answer: 'тебе', explain: 'Ты → тебе. Dativo.' }, { options: ['нравится', 'нравятся', 'нравиться', 'нравился'], answer: 'нравятся', explain: 'Языки = plural → нравятся.' }] },
          { scene: 'Necesito practicar', lines: [['', '"Necesito practicar el ruso": [[0]] [[1]] практиковать русский.']], blanks: [{ options: ['мне', 'меня', 'я', 'мне'], answer: 'мне', explain: 'Мне = a mí / me. Dativo para expresar necesidad.' }, { options: ['надо', 'нужны', 'нужна', 'нада'], answer: 'надо', explain: 'Мне надо + infinitivo = necesito hacer. Надо es invariable.' }] },
          { scene: 'A ella le gusta WeLearn', lines: [['', '"A ella le gusta WeLearn": [[0]] [[1]] WeLearn.']], blanks: [{ options: ['её', 'ей', 'она', 'неё'], answer: 'ей', explain: 'Она → ей. Dativo femenino.' }, { options: ['нравится', 'нравятся', 'нравиться', 'нравился'], answer: 'нравится', explain: 'WeLearn = singular → нравится.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Текст — что нравится в WeLearn',
        tag: 'Opciones',
        intro: 'Elige el pronombre dativo o la forma de нравиться correcta.',
        type: 'guidedText',
        scene: 'Los estudiantes de WeLearn hablan sobre sus gustos',
        text: '[[0]] нравится рус ский язык. (A mí me gusta el idioma ruso.) Моей подруге [[1]] корейский. (A mi amiga le gusta el coreano.) [[2]] нравятся все языки! (¡A nosotros nos gustan todos los idiomas!) Студентам [[3]] уроки Дэвида. (A los estudiantes les gustan las clases de David.) [[4]] нравится учиться онлайн. (A ti te gusta estudiar online.)',
        blanks: [
          { options: ['Мне', 'Меня', 'Мной', 'Я'], answer: 'Мне', explain: 'Я → мне. Pronombre dativo 1ª persona singular.' },
          { options: ['нравится', 'нравятся', 'нравиться', 'нравился'], answer: 'нравится', explain: 'Корейский (singular) → нравится.' },
          { options: ['Нам', 'Нас', 'Нами', 'Мы'], answer: 'Нам', explain: 'Мы → нам. Pronombre dativo 1ª persona plural.' },
          { options: ['нравятся', 'нравится', 'нравиться', 'нравился'], answer: 'нравятся', explain: 'Уроки (plural) → нравятся.' },
          { options: ['Тебе', 'Тебя', 'Тобой', 'Ты'], answer: 'Тебе', explain: 'Ты → тебе. Pronombre dativo 2ª persona singular.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Dativo — escritura libre',
        tag: 'Sin opciones',
        intro: 'Escribe el pronombre dativo o la forma correcta sin opciones.',
        type: 'freeText',
        scene: 'Gustos y necesidades',
        text: '1. "Me gusta el café": [[0]] нравится кофе. 2. "¿Te gusta la música?": [[1]] нравится музыка? 3. "Necesito estudiar palabras": Мне надо [[2]] слова. 4. "A ella le gustan los idiomas": [[3]] нравятся языки. 5. "A nosotros nos gusta WeLearn": [[4]] нравится WeLearn.',
        blanks: [
          { answer: 'Мне', accepted: ['Мне', 'мне'], explain: 'Я → мне. Pronombre dativo 1ª sg.' },
          { answer: 'Тебе', accepted: ['Тебе', 'тебе'], explain: 'Ты → тебе. Pronombre dativo 2ª sg.' },
          { answer: 'учить', accepted: ['учить', 'учиться'], explain: 'Мне надо + infinitivo: учить слова.' },
          { answer: 'Ей', accepted: ['Ей', 'ей'], explain: 'Она → ей. Pronombre dativo femenino.' },
          { answer: 'Нам', accepted: ['Нам', 'нам'], explain: 'Мы → нам. Pronombre dativo 1ª plural.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Expresiones con dativo',
        tag: 'Producción',
        intro: 'Construye frases completas con el dativo.',
        type: 'write',
        items: [
          { scene: 'Gusto personal', prompt: 'Expresa tu gusto por el ruso: "Me gusta mucho el idioma ruso."', answer: 'Мне очень нравится русский язык.', accepted: ['Мне очень нравится русский язык.', 'Мне нравится русский язык.'], explain: 'Мне нравится + singular. Очень = mucho (se coloca antes de нравится).' },
          { scene: 'Necesidad', prompt: 'Expresa una necesidad: "Necesito practicar más."', answer: 'Мне надо практиковать больше.', accepted: ['Мне надо практиковать больше.', 'Мне нужно практиковать больше.'], explain: 'Мне надо/нужно + infinitivo. Больше = más.' },
          { scene: 'Gusto de otra persona', prompt: 'Habla sobre el gusto de otra persona: "A ella le gustan los idiomas."', answer: 'Ей нравятся языки.', accepted: ['Ей нравятся языки.', 'Ей нравятся все языки.'], explain: 'Она → ей. Языки = plural → нравятся.' },
          { scene: 'Petición con dativo', prompt: 'Haz una petición con dativo: "Dime tu nombre, por favor."', answer: 'Скажи мне своё имя, пожалуйста.', accepted: ['Скажи мне своё имя, пожалуйста.', 'Скажите мне своё имя, пожалуйста.'], explain: 'Сказать кому? → мне (dativo). Скажи = informal, скажите = formal.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión — habla de tus gustos',
        tag: 'Libre',
        intro: 'Escribe dos oraciones sobre tus gustos o necesidades usando el dativo.',
        type: 'write',
        items: [
          { scene: 'Gustos en ruso', prompt: 'Escribe qué te gusta y qué no te gusta usando "мне нравится / не нравится".', answer: 'Мне нравится русский язык, но мне не нравится грамматика.', accepted: ['мне нравится', 'мне нравятся'], explain: 'Мне нравится (sg) / нравятся (pl). Но мне не нравится = pero no me gusta.' },
          { scene: 'Necesidades de la semana', prompt: 'Escribe qué necesitas hacer esta semana usando "мне надо".', answer: 'Мне надо учить новые слова и практиковать произношение.', accepted: ['мне надо', 'мне нужно'], explain: 'Мне надо + infinitivo. Произношение = pronunciación. Nuevas palabras = новые слова.' },
        ],
      },
    ],
  },
}

export default topic
