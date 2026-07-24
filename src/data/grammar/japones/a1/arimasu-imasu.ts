import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'arimasu-imasu',
  order: '08',
  color: '#dc2626',
  category: 'Verbos',
  level: 'A1',
  title: 'います vs あります en japonés A1 — Existencia animada e inanimada',
  shortTitle: 'います / あります',
  metaTitle: 'imasu arimasu japonés A1 — hay ser estar animado inanimado',
  description:
    'います (imasu) y あります (arimasu) son los dos verbos de existencia del japonés. います se usa para personas y animales — seres vivos que se mueven. あります se usa para cosas, objetos y plantas — elementos inanimados. En español ambos equivalen a "hay" o "estar", pero en japonés la distinción animado/inanimado es obligatoria.',
  lead: 'います (imasu) = "hay / está" para personas y animales. あります (arimasu) = "hay / está" para cosas. Estructura: [lugar]に + [sujeto]が + います/あります. Negativo: いません (imasen) / ありません (arimasen).',
  outcomes: [
    'Usa います para personas y animales y あります para cosas',
    'Construye frases de existencia con la estructura に + が + います/あります',
    'Forma las negaciones いません y ありません',
  ],

  guide: {
    goal: 'Usar います y あります correctamente según si el sujeto es animado o inanimado.',
    model: 'テーブルの うえに ねこが います。(Hay un gato sobre la mesa.) / つくえの うえに ほんが あります。(Hay un libro sobre el escritorio.)',
    formula: '[lugar]に + [sujeto]が + います (animado) / あります (inanimado)',
    decisions: [
      'います → personas: デービッドさんが います (está Diego)',
      'います → animales: ねこが います, いぬが います, さかなが います',
      'あります → objetos: ほんが あります, かばんが あります',
      'あります → plantas y árboles: はなが あります, きが あります',
      'あります → eventos y cosas abstractas: しゅくだいが あります (hay tarea)',
      'Negativo: います → いません | あります → ありません',
    ],
    table: [
      ['Verbo', 'Para qué', 'Ejemplo'],
      ['います (imasu)', 'Personas', 'デービッドさんが います (Está Diego)'],
      ['います (imasu)', 'Animales', 'ねこが います (Hay un gato)'],
      ['あります (arimasu)', 'Objetos/cosas', 'ほんが あります (Hay un libro)'],
      ['あります (arimasu)', 'Plantas', 'はなが あります (Hay flores)'],
      ['あります (arimasu)', 'Eventos/abstractos', 'じゅぎょうが あります (Hay clase)'],
    ],
    mistakes: [
      '"いぬが あります" ✗ — el perro está vivo → "いぬが います".',
      '"ほんが います" ✗ — el libro no está vivo → "ほんが あります".',
      'Las plantas usan あります aunque estén vivas — en japonés las plantas no "se mueven" por sí solas.',
    ],
  },
  seo: [
    {
      heading: 'La distinción animado/inanimado que el español no tiene',
      paragraphs: [
        'En español, "hay un libro" y "hay un gato" usan el mismo verbo "hay". En japonés no: ほんが あります (libro = inanimado) vs ねこが います (gato = animado). Esta distinción animado/inanimado es obligatoria en japonés y es uno de los primeros conceptos que distinguen la gramática japonesa de la española.',
        'La regla práctica: ¿El sujeto puede moverse por su propia voluntad? Si sí (personas, animales) → います. Si no (cosas, objetos, plantas) → あります. La excepción notable son las plantas: aunque estén vivas, usan あります porque no se mueven. Los robots y muñecos también usan あります por ser objetos, a menos que el hablante los trate como seres vivos (ficción, etc.).',
      ],
    },
    {
      heading: 'Estructura completa: lugar + sujeto + います/あります',
      paragraphs: [
        'La estructura más frecuente es [lugar]に [sujeto]が います/あります. El lugar va primero con la partícula に, luego el sujeto con が (nunca は en existencia), y finalmente el verbo al final. Ejemplos: テーブルの うえに ねこが います (sobre la mesa hay un gato), りょうしんは にほんに います (mis padres están en Japón).',
        'Para preguntar: [lugar]に なにが ありますか / だれが いますか (¿qué hay? / ¿quién está?). La negación es directa: ねこは いません (no hay gato), ほんは ありません (no hay libro). Nota que en la negación se puede usar は en lugar de が para dar un matiz contrastivo.',
      ],
    },
  ],
  visual: {
    mode: 'existence-verbs',
    teacherLens: 'El estudiante aprende います para animados y あります para inanimados con ejemplos visuales.',
    graphicPrompt: 'Dos columnas: います (gato, persona, pez) vs あります (libro, mesa, flor). Estructura [lugar]に + [sujeto]が + verb.',
    scene: [
      ['います = animados', 'ねこが います / Diegoさんが います'],
      ['あります = inanimados', 'ほんが あります / じゅぎょうが あります'],
      ['Negativo', 'いません / ありません'],
    ],
    learnerModes: ['visual: tabla animado vs inanimado', 'analítico: regla de movimiento voluntario', 'oral: describir una habitación'],
    reviewFocus: ['います para personas y animales', 'あります para objetos y plantas', 'に + が + verbo', 'いません / ありません'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'います o あります',
        tag: 'Opción múltiple',
        intro: 'Elige います o あります según el sujeto.',
        type: 'choice',
        items: [
          {
            scene: 'Hay un gato',
            lines: [['Sofia', 'にわに ねこが ___。(Hay un gato en el jardín.)']],
            options: ['います', 'あります', 'いません', 'ありません'],
            answer: 'います',
            explain: 'ねこ (gato) = animal → います. ねこが います.',
          },
          {
            scene: 'Hay un libro',
            lines: [['Carlos', 'つくえに ほんが ___。(Hay un libro en el escritorio.)']],
            options: ['あります', 'います', 'ありません', 'いません'],
            answer: 'あります',
            explain: 'ほん (libro) = objeto inanimado → あります.',
          },
          {
            scene: 'Está Diego',
            lines: [['Ana', 'きょうしつに デービッドさんが ___。(Diego está en el aula.)']],
            options: ['います', 'あります', 'いません', 'ありません'],
            answer: 'います',
            explain: 'デービッドさん (persona) = animado → います.',
          },
          {
            scene: 'Hay flores',
            lines: [['Marco', 'テーブルに はなが ___。(Hay flores en la mesa.)']],
            options: ['あります', 'います', 'ありません', 'いません'],
            answer: 'あります',
            explain: 'はな (flores) = planta → あります. Las plantas usan あります.',
          },
          {
            scene: 'No hay nadie',
            lines: [['Lina', 'うちに だれも ___。(No hay nadie en casa.)']],
            options: ['いません', 'ありません', 'います', 'あります'],
            answer: 'いません',
            explain: 'だれも (nadie) = persona → いません (negación de います).',
          },
          {
            scene: 'No hay tarea',
            lines: [['Alba', 'きょうは しゅくだいが ___。(Hoy no hay tarea.)']],
            options: ['ありません', 'いません', 'あります', 'います'],
            answer: 'ありません',
            explain: 'しゅくだい (tarea) = abstracto/cosa → ありません.',
          },
          {
            scene: 'Hay un perro',
            lines: [['Diego', 'こうえんに いぬが ___。(Hay un perro en el parque.)']],
            options: ['います', 'あります', 'いません', 'ありません'],
            answer: 'います',
            explain: 'いぬ (perro) = animal → います.',
          },
          {
            scene: 'Hay clase',
            lines: [['Carlos', 'あした じゅぎょうが ___。(Mañana hay clase.)']],
            options: ['あります', 'います', 'ありません', 'いません'],
            answer: 'あります',
            explain: 'じゅぎょう (clase/evento) = abstracto → あります.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Sujeto y verbo de existencia',
        tag: '2 respuestas',
        intro: 'Completa el sujeto (が) y el verbo de existencia correcto.',
        type: 'dual',
        items: [
          {
            scene: 'Describiendo el aula',
            lines: [['Diego', 'きょうしつに せんせい [[0]] 。(En el aula hay un profesor.)']],
            blanks: [
              { options: ['が', 'は', 'を'], answer: 'が', explain: 'Existencia: sujeto + が + います.' },
              { options: ['います', 'あります', 'いません'], answer: 'います', explain: 'せんせい (profesor) = persona → います.' },
            ],
          },
          {
            scene: 'En la biblioteca',
            lines: [['Sofia', 'としょかんに ほん [[0]] 。(En la biblioteca hay libros.)']],
            blanks: [
              { options: ['が', 'は', 'を'], answer: 'が', explain: 'Existencia: [sujeto]が + あります.' },
              { options: ['あります', 'います', 'ありません'], answer: 'あります', explain: 'ほん (libro) = objeto → あります.' },
            ],
          },
          {
            scene: 'El jardín de WeLearn',
            lines: [['Ana', 'にわに はな [[0]] 。でも、ねこ [[1]] 。']],
            blanks: [
              { options: ['が', 'は', 'を'], answer: 'が', explain: 'Partícula が para sujeto de existencia.' },
              { options: ['あります / います', 'います / あります', 'ありません / いません'], answer: 'あります / います', explain: 'はな → あります (planta). ねこ → います (animal).' },
            ],
          },
          {
            scene: 'Negaciones',
            lines: [['Marco', 'ここに じしょ [[0]] 。デービッドさんも [[1]] 。']],
            blanks: [
              { options: ['が', 'は', 'も'], answer: 'が', explain: 'じしょ (diccionario) = objeto, が para sujeto nuevo.' },
              { options: ['ありません / いません', 'います / あります', 'いません / ありません'], answer: 'ありません / いません', explain: 'じしょ → ありません. デービッドさん → いません.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado — descripción del aula',
        tag: 'Opciones',
        intro: 'Elige います o あります para cada espacio.',
        type: 'guidedText',
        scene: 'Describiendo la clase de WeLearn',
        text: 'ウィーラーンの きょうしつに デービッドさんが [[0]]。がくせいが たくさん [[1]]。きょうしつに つくえが [[2]]。テーブルの うえに ノートが [[3]]。まどの そとに きが [[4]]。でも、ねこは [[5]]。',
        blanks: [
          { options: ['います', 'あります'], answer: 'います', explain: 'デービッドさん (persona) → います.' },
          { options: ['います', 'あります'], answer: 'います', explain: 'がくせい (estudiantes, personas) → います.' },
          { options: ['あります', 'います'], answer: 'あります', explain: 'つくえ (escritorios, objetos) → あります.' },
          { options: ['あります', 'います'], answer: 'あります', explain: 'ノート (cuadernos, objetos) → あります.' },
          { options: ['あります', 'います'], answer: 'あります', explain: 'き (árboles, plantas) → あります.' },
          { options: ['いません', 'ありません'], answer: 'いません', explain: 'ねこ (gato, animal) → いません (negación de います).' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe います, あります, いません o ありません.',
        type: 'freeText',
        scene: 'Lina describe su cuarto',
        text: 'へやに ベッドが [[0]]。つくえの うえに パソコンが [[1]]。まどの そばに はなが [[2]]。でも、テレビは [[3]]。ねこが [[4]] けど、いぬは [[5]]。',
        blanks: [
          { answer: 'あります', explain: 'ベッド (cama, objeto) → あります.' },
          { answer: 'あります', explain: 'パソコン (computadora, objeto) → あります.' },
          { answer: 'あります', explain: 'はな (flores, planta) → あります.' },
          { answer: 'ありません', explain: 'テレビ (TV, objeto) → ありません (no hay).' },
          { answer: 'います', explain: 'ねこ (gato, animal) → います (hay).' },
          { answer: 'いません', explain: 'いぬ (perro, animal) → いません (no hay).' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la frase completa de existencia.',
        type: 'write',
        items: [
          {
            scene: 'Gato en la silla',
            prompt: 'Escribe: Hay un gato en la silla. → いすに ねこが ___。',
            answer: 'いすに ねこが います。',
            accepted: ['いすに ねこが います', 'いすに ねこが います。'],
            explain: 'ねこ (gato) = animal → います. Estructura: [lugar]に + [sujeto]が + います.',
          },
          {
            scene: 'Libro en la mesa',
            prompt: 'Escribe: Hay un libro en la mesa. → テーブルに ほんが ___。',
            answer: 'テーブルに ほんが あります。',
            accepted: ['テーブルに ほんが あります', 'テーブルに ほんが あります。'],
            explain: 'ほん (libro) = objeto → あります.',
          },
          {
            scene: 'No hay nadie en casa',
            prompt: 'Escribe: No hay nadie en casa. → うちに だれも ___。',
            answer: 'うちに だれも いません。',
            accepted: ['うちに だれも いません', 'うちに だれも いません。'],
            explain: 'だれも + negación de います = いません. No hay persona.',
          },
          {
            scene: 'Hay clases mañana',
            prompt: 'Escribe: Mañana hay clases. → あした じゅぎょうが ___。',
            answer: 'あした じゅぎょうが あります。',
            accepted: ['あした じゅぎょうが あります', 'あした じゅぎょうが あります。'],
            explain: 'じゅぎょう (clase/evento) = abstracto → あります.',
          },
        ],
      },
    ],
  },
}

export default topic
