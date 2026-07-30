import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pronombres-personales',
  order: '02',
  color: '#dc2626',
  category: 'Pronombres',
  level: 'A1',
  title: 'Pronombres personales en ruso: я, ты, он, она, мы, вы, они',
  shortTitle: 'Pronombres personales',
  metaTitle: 'Pronombres personales en ruso A1 | я ты он она мы вы они',
  description:
    'El ruso tiene 8 pronombres personales en caso nominativo. A diferencia del español, no se omiten: siempre aparecen explícitos cuando el sujeto no es un nombre propio. вы funciona tanto como "usted" formal como "ustedes" plural — el contexto lo define.',
  lead: 'Aprende los 8 pronombres sujeto del ruso — я, ты, он, она, оно, мы, вы, они — y entiende por qué вы puede ser singular de cortesía y plural a la vez.',
  outcomes: [
    'Identificar los 8 pronombres personales en caso nominativo',
    'Distinguir вы formal singular de вы plural',
    'Usar оно para sustantivos de género neutro',
  ],
  guide: {
    goal: 'Usar los pronombres personales nominativos correctamente en oraciones simples.',
    model: '[Pronombre] + [verbo o sustantivo predicativo]',
    formula: 'я/ты/он/она/оно/мы/вы/они + predicado',
    decisions: [
      '¿Hablas de ti mismo? → я',
      '¿Hablas con un amigo o familiar? → ты',
      '¿Hablas con alguien de mayor rango o desconocido? → вы (formal)',
      '¿Es un objeto/animal masculino? → он · ¿femenino? → она · ¿neutro? → оно',
      '¿Es un grupo que te incluye? → мы · ¿Grupo ajeno? → они',
    ],
    table: [
      ['Pronombre', 'Significado', 'Ejemplo'],
      ['я', 'yo', 'Я студент — Soy estudiante'],
      ['ты', 'tú (informal)', 'Ты здесь? — ¿Estás aquí?'],
      ['он', 'él / ello (masc.)', 'Он врач — Él es médico'],
      ['она', 'ella', 'Она учительница — Ella es maestra'],
      ['оно', 'ello (neutro)', 'Оно большое — Es grande'],
      ['мы', 'nosotros', 'Мы дома — Estamos en casa'],
      ['вы', 'ustedes / usted formal', 'Вы говорите? — ¿Habla usted?'],
      ['они', 'ellos/ellas', 'Они студенты — Son estudiantes'],
    ],
    mistakes: [
      'No confundas вы (formal sg o plural) con ты (informal sg) — tutear a un desconocido en Rusia resulta grosero.',
      'оно casi nunca se refiere a personas — es para objetos neutros: окно (ventana), письмо (carta).',
      'En ruso los pronombres NO se omiten como en español: siempre escribe я, ты, он, etc.',
      'он y она se usan también para objetos según su género gramatical: стол (mesa) → он; книга (libro) → она.',
    ],
  },
  seo: [
    {
      heading: '¿Cuáles son los pronombres personales en ruso?',
      paragraphs: [
        'El ruso tiene 8 pronombres personales en caso nominativo: я (yo), ты (tú informal), он (él/ello masc.), она (ella), оно (ello neutro), мы (nosotros), вы (ustedes/usted formal), они (ellos/ellas).',
        'A diferencia del español, donde se puede omitir el pronombre ("Soy estudiante" sin "yo"), en ruso el pronombre es necesario cuando el sujeto no es un nombre: Я студент, no simplemente «Студент».',
      ],
      table: [
        ['Persona', 'Singular', 'Plural'],
        ['1.ª', 'я — yo', 'мы — nosotros'],
        ['2.ª informal', 'ты — tú', 'вы — ustedes'],
        ['2.ª formal', 'вы — usted', '—'],
        ['3.ª masc.', 'он — él', 'они — ellos/ellas'],
        ['3.ª fem.', 'она — ella', '—'],
        ['3.ª neutro', 'оно — ello', '—'],
      ],
    },
    {
      heading: '¿Por qué вы sirve para el formal singular y el plural?',
      paragraphs: [
        'вы es el pronombre más versátil del ruso. Como "usted" en español, se usa para personas de mayor edad, desconocidos o en situaciones profesionales. Pero también es el plural de ты — "ustedes".',
        'La conjugación verbal es idéntica en ambos casos, así que solo el contexto distingue si вы = usted o ustedes. Cuando escribes вы formal, algunos libros lo capitalizan (Вы) para marcar el respeto, aunque esto no es obligatorio.',
      ],
    },
    {
      heading: '¿Por qué он, она y оно también se usan para objetos?',
      paragraphs: [
        'En ruso, todos los sustantivos tienen género gramatical: masculino, femenino o neutro. Los pronombres он/она/оно siguen ese género, no el sexo biológico del referente.',
        'Стол (mesa) es masculino → он. Книга (libro) es femenino → она. Окно (ventana) es neutro → оно. Esto exige saber el género de los sustantivos para usar el pronombre correcto.',
      ],
    },
    {
      heading: 'El verbo "ser/estar" se omite en presente',
      paragraphs: [
        'Una particularidad clave del ruso A1: en el tiempo presente, el verbo быть (ser/estar) se omite en la mayoría de los contextos. "Yo soy estudiante" se dice simplemente Я студент — sin verbo.',
        'Esto hace que las primeras oraciones en ruso parezcan telegramas: Я дома (Yo [estoy] en casa), Он врач (Él [es] médico). El pronombre se mantiene siempre, pero el verbo desaparece.',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'Pronouns are the skeleton of Russian sentences — once students match pronoun to person reliably, verb conjugation becomes a natural next step.',
    graphicPrompt:
      'Clean 3×3 grid with Russian pronouns, each in a distinct color block with Spanish translation and a small icon (person silhouette, group, object). Bold Cyrillic, minimal design.',
    scene: [
      ['я', 'yo → primera persona singular'],
      ['ты', 'tú informal → segunda persona singular'],
      ['он / она / оно', 'él / ella / ello → tercera persona singular'],
      ['мы', 'nosotros → primera persona plural'],
      ['вы', 'ustedes / usted → segunda persona plural/formal'],
      ['они', 'ellos/ellas → tercera persona plural'],
    ],
    learnerModes: ['recognition', 'matching', 'gap-fill', 'production'],
    practiceVerbs: ['ser estudiante', 'estar en casa', 'trabajar', 'hablar'],
    reviewFocus: ['вы formal vs вы plural', 'оно para neutros', 'pronombre obligatorio en ruso'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Identifica el pronombre personal correcto para cada situación.',
        type: 'choice',
        items: [
          { scene: 'Pronombres básicos', lines: [['', '¿Cuál es el pronombre de primera persona singular en ruso?']], options: ['я', 'мы', 'ты', 'вы'], answer: 'я', explain: 'я = yo. Primera persona singular en caso nominativo.' },
          { scene: 'Pronombres básicos', lines: [['', '¿Cómo se dice "ella" en ruso?']], options: ['он', 'она', 'оно', 'они'], answer: 'она', explain: 'она = ella. он = él, оно = ello (neutro), они = ellos/ellas.' },
          { scene: 'Cortesía', lines: [['', 'Quieres hablar con respeto con tu jefe (singular formal). ¿Qué pronombre usas?']], options: ['ты', 'вы', 'он', 'они'], answer: 'вы', explain: 'вы es el pronombre de cortesía. Usar ты con un desconocido o superior resulta grosero.' },
          { scene: 'Pronombres básicos', lines: [['', '¿Cuál es el pronombre ruso para "nosotros"?']], options: ['вы', 'они', 'мы', 'мне'], answer: 'мы', explain: 'мы = nosotros. вы = ustedes/usted, они = ellos.' },
          { scene: 'Género neutro', lines: [['', 'окно (ventana) es de género neutro. ¿Qué pronombre la sustituye?']], options: ['он', 'она', 'оно', 'они'], answer: 'оно', explain: 'оно se usa para sustantivos de género neutro. окно (ventana) → оно.' },
          { scene: 'Pronombres básicos', lines: [['', '¿Qué significa они?']], options: ['nosotros', 'ustedes', 'ellos/ellas', 'usted formal'], answer: 'ellos/ellas', explain: 'они = ellos/ellas. Es el pronombre de tercera persona plural.' },
          { scene: 'Género masculino', lines: [['', 'En "Он студент" (Él es estudiante), ¿qué indica он?']], options: ['Primera persona', 'Segunda persona', 'Tercera persona masculino', 'Tercera persona femenino'], answer: 'Tercera persona masculino', explain: 'он es el pronombre de tercera persona masculino singular.' },
          { scene: 'Pronombre obligatorio', lines: [['', 'En ruso, ¿se puede omitir el pronombre sujeto como en español?']], options: ['Sí, siempre', 'No, casi nunca', 'Solo con я', 'Solo en preguntas'], answer: 'No, casi nunca', explain: 'En ruso el pronombre es obligatorio cuando no hay nombre propio como sujeto.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Pronombres y sus equivalentes',
        tag: '2 espacios',
        intro: 'Relaciona cada pronombre ruso con su equivalente en español y un ejemplo.',
        type: 'dual',
        items: [
          { scene: 'Pronombres personales', lines: [['', '[[0]] = yo → ejemplo: [[1]] дома (estoy en casa).']], blanks: [{ options: ['я', 'ты', 'мы', 'они'], answer: 'я', explain: 'я = yo.' }, { options: ['Я', 'Ты', 'Мы', 'Они'], answer: 'Я', explain: 'Я дома = Estoy en casa.' }] },
          { scene: 'Pronombres personales', lines: [['', '[[0]] = él → ejemplo: [[1]] врач (él es médico).']], blanks: [{ options: ['он', 'она', 'оно', 'они'], answer: 'он', explain: 'он = él.' }, { options: ['Он', 'Она', 'Оно', 'Они'], answer: 'Он', explain: 'Он врач = Él es médico.' }] },
          { scene: 'Pronombres personales', lines: [['', '[[0]] = nosotros → ejemplo: [[1]] учимся (estudiamos).']], blanks: [{ options: ['мы', 'вы', 'они', 'я'], answer: 'мы', explain: 'мы = nosotros.' }, { options: ['Мы', 'Вы', 'Они', 'Я'], answer: 'Мы', explain: 'Мы учимся = Nosotros estudiamos.' }] },
          { scene: 'Pronombres personales', lines: [['', '[[0]] = usted/ustedes → ejemplo: [[1]] говорите? (¿Habla usted?)']], blanks: [{ options: ['вы', 'ты', 'они', 'мы'], answer: 'вы', explain: 'вы = usted (formal) / ustedes.' }, { options: ['Вы', 'Ты', 'Они', 'Мы'], answer: 'Вы', explain: 'Вы говорите? = ¿Habla usted?' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — pronombres en contexto',
        tag: 'Opciones',
        intro: 'Elige el pronombre correcto para completar cada oración en ruso.',
        type: 'guidedText',
        scene: 'Pronombres en oraciones rusas',
        text: '[[0]] студент. (Yo soy estudiante.) [[1]] говоришь по-русски? (¿Hablas ruso?) [[2]] врач. (Él es médico.) [[3]] учительница. (Ella es maestra.) [[4]] дома. (Nosotros estamos en casa.) [[5]] говорите по-английски? (¿Habla usted inglés?) [[6]] студенты. (Ellos son estudiantes.)',
        blanks: [
          { options: ['Я', 'Ты', 'Он', 'Мы'], answer: 'Я', explain: 'Я студент. я = yo. Sin verbo "ser" en presente ruso.' },
          { options: ['Ты', 'Вы', 'Он', 'Я'], answer: 'Ты', explain: 'Ты говоришь. ты = tú informal. La forma говоришь confirma 2.ª persona sing.' },
          { options: ['Он', 'Она', 'Оно', 'Они'], answer: 'Он', explain: 'Он врач. врач es masculino → он.' },
          { options: ['Она', 'Он', 'Оно', 'Они'], answer: 'Она', explain: 'Она учительница. учительница es femenino → она.' },
          { options: ['Мы', 'Вы', 'Они', 'Я'], answer: 'Мы', explain: 'Мы дома. мы = nosotros. дома = en casa.' },
          { options: ['Вы', 'Ты', 'Они', 'Мы'], answer: 'Вы', explain: 'Вы говорите. вы formal → conjugación говорите.' },
          { options: ['Они', 'Он', 'Мы', 'Вы'], answer: 'Они', explain: 'Они студенты. они = ellos/ellas. студенты = plural.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — pronombres',
        tag: 'Sin opciones',
        intro: 'Escribe el pronombre ruso correcto sin opciones.',
        type: 'freeText',
        scene: 'Escribiendo pronombres en ruso',
        text: '1. "nosotros" en ruso: [[0]]. 2. "usted" (formal singular): [[1]]. 3. письмо (carta, neutro) → pronombre: [[2]]. 4. "ellos" en ruso (plural): [[3]]. 5. Yo leo: "[[4]] читаю книгу." (solo el pronombre)',
        blanks: [
          { answer: 'мы', accepted: ['мы', 'Мы'], explain: 'мы = nosotros.' },
          { answer: 'вы', accepted: ['вы', 'Вы'], explain: 'вы es el pronombre de cortesía. También significa "ustedes".' },
          { answer: 'оно', accepted: ['оно', 'Оно'], explain: 'оно es el pronombre para género neutro. письмо → оно.' },
          { answer: 'они', accepted: ['они', 'Они'], explain: 'они = ellos/ellas. Tercera persona plural.' },
          { answer: 'Я', accepted: ['я', 'Я'], explain: 'Я читаю книгу. я = yo.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Construye oraciones completas con pronombres personales en ruso.',
        type: 'write',
        items: [
          { scene: 'Produción', prompt: 'Traduce al ruso: "Yo soy estudiante."', answer: 'Я студент', accepted: ['я студент', 'я студент.'], explain: 'Я студент. En ruso no se usa el verbo "ser" en presente — se omite.' },
          { scene: 'Producción', prompt: 'Traduce al ruso: "Ella es maestra."', answer: 'Она учительница', accepted: ['она учительница', 'она учительница.'], explain: 'Она учительница. она = ella, учительница = maestra (forma femenina).' },
          { scene: 'Producción', prompt: 'Traduce al ruso: "Nosotros estamos en casa."', answer: 'Мы дома', accepted: ['мы дома', 'мы дома.'], explain: 'Мы дома. мы = nosotros, дома = en casa. El verbo "estar" también se omite.' },
          { scene: 'Producción', prompt: 'Traduce al ruso: "Ellos son estudiantes."', answer: 'Они студенты', accepted: ['они студенты', 'они студенты.'], explain: 'Они студенты. они = ellos, студенты = estudiantes (plural).' },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción',
        intro: 'Usa pronombres personales para presentar personas y hablar de ti.',
        type: 'write',
        items: [
          { scene: 'Presentando personas', prompt: 'Escribe tres oraciones: (1) preséntate, (2) presenta a una maestra, (3) habla de un grupo de amigos. Usa я, она, они.', answer: 'Я студент. Она учительница. Они мои друзья.', accepted: ['я', 'она', 'они'], explain: 'Modelo: Я студент. Она учительница. Они мои друзья. ¡Adapta según tu situación!' },
          { scene: 'Cortesía', prompt: 'Quieres decirle respetuosamente a tu profesor: "¿Habla usted ruso?" Escríbelo en ruso.', answer: 'Вы говорите по-русски?', accepted: ['вы говорите по-русски', 'вы говорите по-русски?'], explain: 'Вы говорите по-русски? вы formal + говорите.' },
          { scene: 'Identidad', prompt: '¿Cómo dices en ruso "Yo soy de Colombia"? (из = de, Колумбия = Colombia)', answer: 'Я из Колумбии', accepted: ['я из колумбии', 'я из Колумбии'], explain: 'Я из Колумбии. я = yo, из = de (con genitivo), Колумбии = Colombia en genitivo.' },
        ],
      },
    ],
  },
}

export default topic
