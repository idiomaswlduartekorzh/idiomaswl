import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'presente-verbos',
  order: '04',
  color: '#059669',
  category: 'Verbos',
  level: 'A1',
  title: 'Presente de verbos en ruso: primera y segunda conjugación',
  shortTitle: 'Presente de verbos',
  metaTitle: 'Presente de verbos en ruso A1 | primera segunda conjugación',
  description:
    'Los verbos rusos en presente se conjugan según dos patrones: primera conjugación (infinitivos en -ать/-ять/-еть/-оть) y segunda conjugación (infinitivos en -ить/-еть especiales). Las terminaciones cambian para cada persona, y memorizarlas en par — primera/segunda conjugación — es la estrategia más eficiente.',
  lead: 'Aprende los dos patrones de conjugación del presente ruso y conjuga verbos clave como читать (leer), говорить (hablar) y работать (trabajar) en todas las personas.',
  outcomes: [
    'Conjugar verbos de primera conjugación en todas las personas',
    'Conjugar verbos de segunda conjugación en todas las personas',
    'Distinguir ambos patrones por el infinitivo',
  ],
  guide: {
    goal: 'Conjugar en presente los verbos más frecuentes del A1 usando los dos patrones de conjugación.',
    model: 'Raíz del verbo + terminación según conjugación y persona',
    formula: '1.ª conj: -ю/-ешь/-ет/-ем/-ете/-ют | 2.ª conj: -ю/-ишь/-ит/-им/-ите/-ят',
    decisions: [
      '¿El infinitivo termina en -ать/-ять/-еть/-оть? → primera conjugación',
      '¿El infinitivo termina en -ить o -еть (tipo смотреть)? → segunda conjugación',
      '¿Es я o мы? → terminaciones más fáciles: -ю / -ем o -им',
      'Atención a las alternancias consonánticas en segunda conjugación: говорить → говорю (в→ø), любить → люблю (б→бл)',
    ],
    table: [
      ['Persona', '1.ª conj. (читать)', '2.ª conj. (говорить)'],
      ['я', 'читаю', 'говорю'],
      ['ты', 'читаешь', 'говоришь'],
      ['он/она/оно', 'читает', 'говорит'],
      ['мы', 'читаем', 'говорим'],
      ['вы', 'читаете', 'говорите'],
      ['они', 'читают', 'говорят'],
    ],
    mistakes: [
      'Nunca uses el infinitivo con un pronombre: NO «я читать» — debe ser «я читаю».',
      'La ы de ты-форма es larga: читаЕШЬ, говорИШЬ — no la omitas.',
      'En segunda conjugación, я siempre sufre alternancia consonántica: говорить → говорю (no говорию).',
      'они: 1.ª conj. → -ют (читают); 2.ª conj. → -ят (говорят) — confundirlos es el error más frecuente.',
    ],
  },
  seo: [
    {
      heading: '¿Cuántas conjugaciones tiene el ruso?',
      paragraphs: [
        'El ruso tiene dos conjugaciones principales en presente. La primera conjugación incluye la mayoría de los verbos en -ать/-ять (работать, читать, знать) y algunos en -еть/-оть. La segunda conjugación incluye los verbos en -ить (говорить, любить, учить) y ciertos verbos en -еть (смотреть, видеть).',
        'La buena noticia es que, una vez memorizadas las seis terminaciones de cada conjugación, todos los verbos regulares de ese grupo siguen el mismo patrón. No hay irregulares por caso como en español ("soy, eres, es").',
      ],
      table: [
        ['Persona', '1.ª conj. читать', '2.ª conj. говорить'],
        ['я', 'читаю', 'говорю'],
        ['ты', 'читаешь', 'говоришь'],
        ['он/она', 'читает', 'говорит'],
        ['мы', 'читаем', 'говорим'],
        ['вы', 'читаете', 'говорите'],
        ['они', 'читают', 'говорят'],
      ],
    },
    {
      heading: 'Primera conjugación: verbos en -ать/-ять',
      paragraphs: [
        'Los verbos más frecuentes del A1 pertenecen a la primera conjugación: работать (trabajar), читать (leer), знать (saber/conocer), понимать (entender), думать (pensar), слушать (escuchar).',
        'Para conjugarlos, quita la terminación -ть del infinitivo y añade: -ю, -ешь, -ет, -ем, -ете, -ют. Ejemplo: работа- + -ю = работаю (yo trabajo).',
      ],
    },
    {
      heading: 'Segunda conjugación: verbos en -ить/-еть',
      paragraphs: [
        'Los verbos más importantes de la segunda conjugación: говорить (hablar), учить (aprender/enseñar), любить (amar/gustar), смотреть (mirar), видеть (ver).',
        'Las terminaciones son: -ю, -ишь, -ит, -им, -ите, -ят. Hay que prestar atención a las alternancias consonánticas en la forma "yo": любить → люблю (б + л), смотреть → смотрю, видеть → вижу.',
      ],
    },
    {
      heading: 'El verbo быть (ser/estar) en presente',
      paragraphs: [
        'El verbo быть (ser/estar) es el más irregular del ruso — y el más importante de conocer: en el tiempo presente, prácticamente desaparece. En lugar de conjugarlo, los hablantes rusos simplemente lo omiten.',
        'Donde en español decimos "Yo soy estudiante" o "Ella está en casa", el ruso dice Я студент y Она дома — sin ningún verbo. Esta característica única hace que las primeras oraciones sean muy compactas.',
      ],
    },
  ],
  visual: {
    mode: 'conjugation-table',
    teacherLens:
      'The two-conjugation system is the core verbal competency for A1 Russian. Drilling both tables in parallel prevents pattern confusion at A2.',
    graphicPrompt:
      'Side-by-side conjugation tables for читать and говорить, color-coded by conjugation type (blue for 1st, green for 2nd). Endings highlighted in bold. Clean, minimal layout.',
    scene: [
      ['читать (1.ª conj.)', 'читаю / читаешь / читает / читаем / читаете / читают'],
      ['работать (1.ª conj.)', 'работаю / работаешь / работает / работаем / работаете / работают'],
      ['говорить (2.ª conj.)', 'говорю / говоришь / говорит / говорим / говорите / говорят'],
      ['учить (2.ª conj.)', 'учу / учишь / учит / учим / учите / учат'],
      ['Alternancia consonántica', 'любить → люблю | смотреть → смотрю | видеть → вижу'],
    ],
    learnerModes: ['recognition', 'conjugation-drill', 'gap-fill', 'production'],
    practiceVerbs: ['читать', 'работать', 'говорить', 'учить', 'знать', 'любить'],
    reviewFocus: ['terminaciones они: -ют vs -ят', 'alternancias 2.ª conj. en я', 'no usar infinitivo con pronombre'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Identifica la forma verbal correcta para cada pronombre.',
        type: 'choice',
        items: [
          { scene: 'Primera conjugación', lines: [['', '¿Cuál es la forma correcta de читать (leer) para "я" (yo)?']], options: ['читать', 'читаю', 'читает', 'читаешь'], answer: 'читаю', explain: 'читать → 1.ª conj. → yo: читаю. Raíz чита- + terminación -ю.' },
          { scene: 'Segunda conjugación', lines: [['', '¿Cuál es la forma de говорить (hablar) para "он" (él)?']], options: ['говорит', 'говоришь', 'говорю', 'говорят'], answer: 'говорит', explain: 'говорить → 2.ª conj. → él/ella: говорит. Terminación -ит.' },
          { scene: 'Primera conjugación', lines: [['', '¿Cómo se conjuga работать (trabajar) para "они" (ellos)?']], options: ['работают', 'работает', 'работаят', 'работаем'], answer: 'работают', explain: 'работать → 1.ª conj. → они: работают. Terminación -ют (no -ят).' },
          { scene: 'Segunda conjugación', lines: [['', '¿Cuál es la forma de учить (aprender) para "ты" (tú)?']], options: ['учишь', 'учить', 'учеешь', 'учишш'], answer: 'учишь', explain: 'учить → 2.ª conj. → ты: учишь. Terminación -ишь.' },
          { scene: 'Alternancia consonántica', lines: [['', 'любить (amar) es 2.ª conj. ¿Cuál es la forma "я" (con alternancia)?']], options: ['любию', 'люблю', 'любью', 'любю'], answer: 'люблю', explain: 'любить → 2.ª conj. → yo: люблю. La б se convierte en бл (alternancia consonántica).' },
          { scene: 'Identificando conjugación', lines: [['', '¿Qué verbo pertenece a la primera conjugación?']], options: ['говорить', 'учить', 'читать', 'любить'], answer: 'читать', explain: 'читать termina en -ать → primera conjugación. Los otros (-ить) son segunda conjugación.' },
          { scene: 'Primera conjugación', lines: [['', '¿Cuál es la forma de знать (saber) para "мы" (nosotros)?']], options: ['знаем', 'знает', 'знают', 'знаешь'], answer: 'знаем', explain: 'знать → 1.ª conj. → мы: знаем. Terminación -ем.' },
          { scene: 'Error común', lines: [['', '¿Qué es incorrecto en ruso para "yo hablo"?']], options: ['говорю', 'я говорю', 'Я говорить', 'говорю по-русски'], answer: 'Я говорить', explain: 'En ruso el infinitivo no se usa como forma personal. Я говорить es incorrecto — debe ser Я говорю.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Pronombre y forma verbal',
        tag: '2 espacios',
        intro: 'Conecta cada pronombre con la forma verbal correcta.',
        type: 'dual',
        items: [
          { scene: 'читать — 1.ª conj.', lines: [['', '[[0]] → читать → [[1]]']], blanks: [{ options: ['я', 'ты', 'он'], answer: 'я', explain: 'Primera persona singular.' }, { options: ['читаю', 'читает', 'читаешь'], answer: 'читаю', explain: 'я → читаю (-ю).' }] },
          { scene: 'читать — 1.ª conj.', lines: [['', '[[0]] → читать → [[1]]']], blanks: [{ options: ['ты', 'я', 'мы'], answer: 'ты', explain: 'Segunda persona singular informal.' }, { options: ['читаешь', 'читаю', 'читает'], answer: 'читаешь', explain: 'ты → читаешь (-ешь).' }] },
          { scene: 'говорить — 2.ª conj.', lines: [['', '[[0]] → говорить → [[1]]']], blanks: [{ options: ['мы', 'я', 'вы'], answer: 'мы', explain: 'Primera persona plural.' }, { options: ['говорим', 'говорю', 'говорите'], answer: 'говорим', explain: 'мы → говорим (-им).' }] },
          { scene: 'говорить — 2.ª conj.', lines: [['', '[[0]] → говорить → [[1]]']], blanks: [{ options: ['вы', 'они', 'ты'], answer: 'вы', explain: 'Segunda persona plural / cortesía.' }, { options: ['говорите', 'говорят', 'говоришь'], answer: 'говорите', explain: 'вы → говорите (-ите).' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — conjugación',
        tag: 'Opciones',
        intro: 'Conjuga cada verbo en la persona indicada.',
        type: 'guidedText',
        scene: 'Conjugando verbos rusos en presente',
        text: 'Я [[0]] книгу. (читать) Он [[1]] по-испански. (говорить) Мы [[2]] в офисе. (работать) Ты [[3]] музыку? (слушать) Они [[4]] по-русски. (говорить) Вы [[5]] русский язык? (учить) Я [[6]] тебя. (любить)',
        blanks: [
          { options: ['читаю', 'читает', 'читаешь'], answer: 'читаю', explain: 'читать → 1.ª conj. → я читаю. Raíz чита- + -ю.' },
          { options: ['говорит', 'говоришь', 'говорю'], answer: 'говорит', explain: 'говорить → 2.ª conj. → он говорит. Terminación -ит.' },
          { options: ['работаем', 'работают', 'работает'], answer: 'работаем', explain: 'работать → 1.ª conj. → мы работаем. Terminación -ем.' },
          { options: ['слушаешь', 'слушает', 'слушаю'], answer: 'слушаешь', explain: 'слушать → 1.ª conj. → ты слушаешь. Terminación -ешь.' },
          { options: ['говорят', 'говорит', 'говоришь'], answer: 'говорят', explain: 'говорить → 2.ª conj. → они говорят. Terminación -ят (¡no -ют!).' },
          { options: ['учите', 'учат', 'учишь'], answer: 'учите', explain: 'учить → 2.ª conj. → вы учите. Terminación -ите.' },
          { options: ['люблю', 'любит', 'любишь'], answer: 'люблю', explain: 'любить → 2.ª conj. → я люблю. La б → бл (alternancia consonántica).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — conjugación sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma verbal correcta sin opciones.',
        type: 'freeText',
        scene: 'Conjugando verbos en presente (sin opciones)',
        text: '1. знать (saber) → я [[0]]. 2. говорить (hablar) → ты [[1]]. 3. читать (leer) → они [[2]]. 4. учить (aprender) → она [[3]]. 5. работать (trabajar) → вы [[4]].',
        blanks: [
          { answer: 'знаю', accepted: ['знаю'], explain: 'знать → 1.ª conj. → я знаю. Raíz зна- + -ю.' },
          { answer: 'говоришь', accepted: ['говоришь'], explain: 'говорить → 2.ª conj. → ты говоришь. Terminación -ишь.' },
          { answer: 'читают', accepted: ['читают'], explain: 'читать → 1.ª conj. → они читают. Terminación -ют.' },
          { answer: 'учит', accepted: ['учит'], explain: 'учить → 2.ª conj. → она учит. Terminación -ит.' },
          { answer: 'работаете', accepted: ['работаете'], explain: 'работать → 1.ª conj. → вы работаете. Terminación -ете.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones completas conjugando correctamente.',
        type: 'write',
        items: [
          { scene: 'Producción', prompt: 'Escribe en ruso: "Yo leo ruso." (читать + по-русски)', answer: 'Я читаю по-русски', accepted: ['я читаю по-русски'], explain: 'Я читаю по-русски. читать → 1.ª conj. → я читаю.' },
          { scene: 'Producción', prompt: 'Escribe: "Ellos hablan español." (говорить + по-испански)', answer: 'Они говорят по-испански', accepted: ['они говорят по-испански'], explain: 'Они говорят по-испански. говорить → 2.ª conj. → они говорят.' },
          { scene: 'Producción', prompt: 'Escribe: "¿Trabajas tú aquí?" (работать + здесь = aquí)', answer: 'Ты работаешь здесь?', accepted: ['ты работаешь здесь', 'ты работаешь здесь?'], explain: 'Ты работаешь здесь? работать → 1.ª conj. → ты работаешь.' },
          { scene: 'Producción', prompt: 'Escribe: "Nosotros aprendemos ruso." (учить + русский язык)', answer: 'Мы учим русский язык', accepted: ['мы учим русский язык'], explain: 'Мы учим русский язык. учить → 2.ª conj. → мы учим.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción',
        intro: 'Describe tu rutina diaria en ruso con verbos en presente.',
        type: 'write',
        items: [
          { scene: 'Mi rutina', prompt: 'Escribe tres oraciones sobre lo que haces: qué lees, dónde trabajas y qué idioma hablas.', answer: 'Я читаю книги. Я работаю дома. Я говорю по-испански.', accepted: ['читаю', 'работаю', 'говорю'], explain: 'Modelo: Я читаю книги (Leo libros). Я работаю дома (Trabajo en casa). Я говорю по-испански.' },
          { scene: 'Haciendo preguntas', prompt: 'Pregúntale a alguien (ты) si sabe ruso y si lo estudia. Dos preguntas.', answer: 'Ты знаешь русский язык? Ты учишь русский?', accepted: ['знаешь', 'учишь'], explain: 'Ты знаешь русский язык? (¿Sabes ruso?) Ты учишь русский? (¿Estudias ruso?)' },
          { scene: 'Tercera persona plural', prompt: 'Describe qué hacen "ellos": hablan, trabajan y leen (tres verbos en они).', answer: 'Они говорят, работают и читают.', accepted: ['говорят', 'работают', 'читают'], explain: 'Они говорят (2.ª -ят), работают (1.ª -ют) и читают (1.ª -ют).' },
        ],
      },
    ],
  },
}

export default topic
