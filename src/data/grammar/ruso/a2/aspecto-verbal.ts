import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'aspecto-verbal',
  order: '02',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A2',
  title: 'El aspecto verbal en ruso: imperfectivo y perfectivo',
  shortTitle: 'Aspecto verbal',
  metaTitle: 'Aspecto verbal ruso A2 | imperfectivo vs perfectivo читать/прочитать',
  description:
    'El aspecto verbal es la categoría más importante de la gramática rusa: cada verbo existe en dos formas, imperfectiva (acción en proceso o habitual) y perfectiva (acción completada o de un solo evento). Aprender los pares de aspecto es fundamental para comunicarse con precisión en ruso.',
  lead: 'Domina la diferencia entre читать (leer, proceso) y прочитать (leer, completar): el aspecto verbal ruso marca si una acción se completó o estaba en proceso.',
  outcomes: [
    'Distinguir verbos imperfectivos (proceso/hábito) de perfectivos (resultado/completado)',
    'Reconocer los pares de aspecto más frecuentes del A2',
    'Usar el aspecto correcto en contextos de narración en pasado',
  ],
  guide: {
    goal: 'Usar el aspecto verbal correcto según si la acción se completó o estaba en proceso.',
    model: 'Imperfectivo (НСВ): proceso, hábito, duración | Perfectivo (СВ): resultado, evento único, completado',
    formula: 'НСВ: читать, писать, говорить | СВ: прочитать, написать, сказать',
    decisions: [
      '¿La acción estaba en proceso o se repite habitualmente? → imperfectivo (НСВ)',
      '¿La acción se completó / tiene resultado? → perfectivo (СВ)',
      '¿Hay palabras como всегда, часто, каждый день? → imperfectivo',
      '¿Hay palabras como уже, наконец, вдруг, один раз? → perfectivo',
      'El perfectivo no tiene forma de presente — solo pasado y futuro',
    ],
    table: [
      ['Par de verbos', 'Imperfectivo (НСВ)', 'Perfectivo (СВ)'],
      ['leer', 'читать', 'прочитать'],
      ['escribir', 'писать', 'написать'],
      ['decir', 'говорить', 'сказать'],
      ['hacer', 'делать', 'сделать'],
      ['ver', 'смотреть', 'посмотреть'],
      ['comer', 'есть', 'съесть'],
    ],
    mistakes: [
      'NO uses el perfectivo para acciones habituales: NO "Каждый день я прочитал книгу" → debe ser читал.',
      'El perfectivo no existe en presente: NO "я прочитаю" en sentido de presente → usa imperfectivo.',
      'NO uses НСВ para resultados específicos: "Я читал письмо" implica proceso, no que lo terminaste.',
      'Reconoce los prefijos que forman perfectivos: про-, на-, по-, с-, за- + infinitivo imperfectivo.',
    ],
  },
  seo: [
    {
      heading: '¿Qué es el aspecto verbal en ruso?',
      paragraphs: [
        'El aspecto verbal es una categoría gramatical que no existe en español pero es fundamental en ruso. Cada verbo ruso tiene dos formas: el aspecto imperfectivo (несовершенный вид, НСВ) y el aspecto perfectivo (совершенный вид, СВ).',
        'El aspecto imperfectivo describe acciones en proceso, habituales o sin énfasis en su conclusión. El aspecto perfectivo describe acciones completadas, con resultado o que ocurrieron una sola vez. Esta distinción es obligatoria en ruso: siempre tienes que elegir.',
      ],
      table: [
        ['Contexto', 'Aspecto', 'Ejemplo'],
        ['Acción habitual', 'НСВ', 'Я каждый день читал (leía cada día)'],
        ['Acción completada', 'СВ', 'Я прочитал книгу (leí el libro — terminé)'],
        ['Proceso en curso', 'НСВ', 'Он писал письмо (estaba escribiendo)'],
        ['Resultado logrado', 'СВ', 'Он написал письмо (escribió la carta — lista)'],
      ],
    },
    {
      heading: '¿Cómo se reconocen los pares de aspecto?',
      paragraphs: [
        'La mayoría de los verbos perfectivos se forman añadiendo un prefijo al imperfectivo: читать → прочитать, писать → написать, делать → сделать. Algunos pares son irregulares: говорить (НСВ) / сказать (СВ), брать (НСВ) / взять (СВ).',
        'Hay palabras clave que indican qué aspecto usar. Palabras como всегда (siempre), часто (frecuentemente), каждый день (cada día) piden imperfectivo. Palabras como уже (ya), наконец (por fin), вдруг (de repente) piden perfectivo.',
      ],
    },
    {
      heading: '¿Cómo funciona el aspecto en el tiempo futuro?',
      paragraphs: [
        'El aspecto también afecta al futuro. El futuro imperfectivo se forma con буду + infinitivo: Я буду читать (voy a leer / estaré leyendo). El futuro perfectivo se forma conjugando el verbo perfectivo: Я прочитаю (leeré / terminaré de leer).',
        'Esta diferencia es crucial: "Я буду читать эту книгу" implica proceso continuo, mientras que "Я прочитаю эту книгу" implica que la terminarás.',
      ],
    },
  ],
  visual: {
    mode: 'comparison-table',
    teacherLens:
      'Verbal aspect is the single most challenging A2 concept for Spanish speakers. Use before/after scenarios and result-focus exercises to build intuition.',
    graphicPrompt:
      'Split screen: left side shows imperfective (ongoing action, looping arrow, "process") with читать; right side shows perfectivo (completed, checkmark, "result") with прочитать. Common pairs listed below.',
    scene: [
      ['НСВ (proceso/hábito)', 'читать, писать, делать, смотреть, говорить'],
      ['СВ (completado/resultado)', 'прочитать, написать, сделать, посмотреть, сказать'],
      ['Señales НСВ', 'каждый день, всегда, часто, долго, в то время как'],
      ['Señales СВ', 'уже, наконец, вдруг, один раз, за час'],
      ['Par irregular', 'говорить (НСВ) / сказать (СВ) | брать / взять'],
    ],
    learnerModes: ['recognition', 'aspect-choice', 'gap-fill', 'production'],
    practiceVerbs: ['читать/прочитать', 'писать/написать', 'делать/сделать', 'говорить/сказать'],
    reviewFocus: ['señales de tiempo que indican aspecto', 'НСВ para hábito', 'СВ para resultado'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Identificar el aspecto correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el verbo con el aspecto correcto según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Acción habitual',
            lines: [['', 'Каждый вечер я _____ книгу. (cada noche yo ___ un libro)']],
            options: ['читал', 'прочитал', 'прочитаю', 'читаю уже'],
            answer: 'читал',
            explain: 'Каждый вечер → hábito → imperfectivo: читал.',
          },
          {
            scene: 'Acción completada',
            lines: [['', 'Вчера я наконец _____ книгу. (ayer por fin ___ el libro)']],
            options: ['прочитал', 'читал', 'читаю', 'читать'],
            answer: 'прочитал',
            explain: 'Наконец → resultado completado → perfectivo: прочитал.',
          },
          {
            scene: 'Proceso en curso',
            lines: [['', 'Когда он позвонил, я _____ письмо. (cuando llamó, yo ___ la carta)']],
            options: ['писал', 'написал', 'написаю', 'писать'],
            answer: 'писал',
            explain: 'Proceso interrumpido → imperfectivo: писал (estaba escribiendo).',
          },
          {
            scene: 'Resultado logrado',
            lines: [['', 'Она уже _____ задание. (ella ya ___ la tarea)']],
            options: ['сделала', 'делала', 'делала бы', 'сделать'],
            answer: 'сделала',
            explain: 'Уже → resultado → perfectivo femenino: сделала.',
          },
          {
            scene: 'Par irregular',
            lines: [['', 'Он мне _____, что всё хорошо. (él me ___ que todo está bien)']],
            options: ['сказал', 'говорил', 'скажет', 'говорить'],
            answer: 'сказал',
            explain: 'Acción de un momento específico → perfectivo: сказал (par de говорить).',
          },
          {
            scene: 'Hábito pasado',
            lines: [['', 'Раньше она часто _____ фильмы. (antes ella frecuentemente ___ películas)']],
            options: ['смотрела', 'посмотрела', 'посмотрит', 'смотреть'],
            answer: 'смотрела',
            explain: 'Раньше часто → hábito pasado → imperfectivo: смотрела.',
          },
          {
            scene: 'Evento único completado',
            lines: [['', 'Вдруг он _____ и ушёл. (de repente él ___ y se fue)']],
            options: ['встал', 'вставал', 'вставать', 'встаёт'],
            answer: 'встал',
            explain: 'Вдруг → evento único → perfectivo: встал.',
          },
          {
            scene: 'Identificar par',
            lines: [['', '¿Cuál es el par perfectivo de читать?']],
            options: ['прочитать', 'прочитал', 'читался', 'перечитать'],
            answer: 'прочитать',
            explain: 'читать (НСВ) / прочитать (СВ) es el par estándar. Прочитал es la forma pasada, no el infinitivo.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Aspecto e indicador de tiempo',
        tag: '2 espacios',
        intro: 'Completa con el indicador de tiempo correcto y la forma verbal correspondiente.',
        type: 'dual',
        items: [
          {
            scene: 'Señal de aspecto + verbo',
            lines: [['', '[[0]] он читал газету. (señal de proceso habitual + читать)']],
            blanks: [
              { options: ['Каждый день', 'Наконец', 'Вдруг'], answer: 'Каждый день', explain: 'Каждый день → hábito → imperfectivo.' },
              { options: ['читал', 'прочитал', 'прочитает'], answer: 'читал', explain: 'Hábito pasado → imperfectivo: читал.' },
            ],
          },
          {
            scene: 'Resultado completado',
            lines: [['', 'Она [[0]] написала письмо. (señal de resultado)']],
            blanks: [
              { options: ['наконец', 'часто', 'долго'], answer: 'наконец', explain: 'Наконец = por fin → resultado → perfectivo.' },
              { options: ['написала', 'писала', 'пишет'], answer: 'написала', explain: 'Perfectivo femenino: написала.' },
            ],
          },
          {
            scene: 'Proceso interrumpido',
            lines: [['', 'Когда я , он вошёл. (yo [[0]] cuando él entró)']],
            blanks: [
              { options: ['читал', 'прочитал', 'прочитаю'], answer: 'читал', explain: 'Proceso que fue interrumpido → imperfectivo: читал.' },
              { options: ['вошёл', 'входил', 'войти'], answer: 'вошёл', explain: 'Acción que interrumpió → perfectivo: вошёл.' },
            ],
          },
          {
            scene: 'Pares de aspecto',
            lines: [['', 'Он книгу за два часа. (él [[0]] el libro en dos horas — completado)']],
            blanks: [
              { options: ['прочитал', 'читал', 'читает'], answer: 'прочитал', explain: 'За два часа (en dos horas, completado) → perfectivo.' },
              { options: ['книгу', 'книга', 'книге'], answer: 'книгу', explain: 'книга en acusativo → книгу (objeto directo).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — aspecto en contexto',
        tag: 'Opciones',
        intro: 'Elige el aspecto correcto de cada verbo en la historia.',
        type: 'guidedText',
        scene: 'Un día de Анна',
        text: 'Раньше Анна каждый день [[0]] книги. Вчера она наконец [[1]] роман. Пока она [[2]], позвонил друг. Он [[3]], что приедет. Анна [[4]] трубку и продолжила читать.',
        blanks: [
          { options: ['читала', 'прочитала', 'прочитает'], answer: 'читала', explain: 'Каждый день → hábito → imperfectivo: читала.' },
          { options: ['прочитала', 'читала', 'читает'], answer: 'прочитала', explain: 'Наконец → resultado → perfectivo: прочитала.' },
          { options: ['читала', 'прочитала', 'читает'], answer: 'читала', explain: 'Proceso interrumpido por llamada → imperfectivo: читала.' },
          { options: ['сказал', 'говорил', 'скажет'], answer: 'сказал', explain: 'Acción comunicativa única → perfectivo: сказал.' },
          { options: ['взяла', 'брала', 'брать'], answer: 'взяла', explain: 'Acción completada (tomó el teléfono) → perfectivo: взяла.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — aspecto sin opciones',
        tag: 'Sin opciones',
        intro: 'Elige el aspecto correcto y escribe el verbo en pasado.',
        type: 'freeText',
        scene: 'Seleccionar el aspecto correcto',
        text: '1. Она всегда [[0]] рано. (вставать/встать) 2. Он [[1]] задание за час. (делать/сделать) 3. Мы долго [[2]] фильм. (смотреть/посмотреть) 4. Наконец они [[3]] решение. (принимать/принять) 5. Каждый день он [[4]] кофе. (пить/выпить)',
        blanks: [
          { answer: 'вставала', accepted: ['вставала'], explain: 'Всегда → hábito → импerfectivo: вставала.' },
          { answer: 'сделал', accepted: ['сделал'], explain: 'За час (en una hora, completado) → perfectivo: сделал.' },
          { answer: 'смотрели', accepted: ['смотрели'], explain: 'Долго → proceso prolongado → imperfectivo: смотрели.' },
          { answer: 'приняли', accepted: ['приняли'], explain: 'Наконец → resultado → perfectivo: приняли.' },
          { answer: 'пил', accepted: ['пил'], explain: 'Каждый день → hábito → imperfectivo: пил.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Traduce usando el aspecto correcto.',
        type: 'write',
        items: [
          {
            scene: 'Hábito vs resultado',
            prompt: 'Escribe en ruso: "Ella siempre leía libros, pero ayer por fin leyó (terminó) este." (читать/прочитать + всегда/наконец)',
            answer: 'Она всегда читала книги, но вчера наконец прочитала эту.',
            accepted: ['читала', 'прочитала'],
            explain: 'Всегда + hábito → читала (НСВ); наконец + completado → прочитала (СВ).',
          },
          {
            scene: 'Proceso interrumpido',
            prompt: 'Escribe: "Yo estaba escribiendo cuando él llamó." (писать + позвонить)',
            answer: 'Я писал, когда он позвонил.',
            accepted: ['писал', 'позвонил', 'писала'],
            explain: 'Proceso: писал (НСВ). Acción que interrumpe: позвонил (СВ).',
          },
          {
            scene: 'Evento único completado',
            prompt: 'Escribe: "Él de repente se levantó y dijo algo." (вдруг, встать, сказать)',
            answer: 'Вдруг он встал и что-то сказал.',
            accepted: ['встал', 'сказал'],
            explain: 'Вдруг → evento único → perfectivos: встал, сказал.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción libre',
        intro: 'Narra un evento pasado usando ambos aspectos correctamente.',
        type: 'write',
        items: [
          {
            scene: 'Narración pasada',
            prompt: 'Escribe 3 oraciones: una acción que fue interrumpida (imperfectivo) y una acción completada (perfectivo) en tu día de ayer.',
            answer: 'Я читал книгу, когда зазвонил телефон. Потом я приготовил ужин. Вечером я посмотрел фильм.',
            accepted: ['читал', 'читала', 'писал', 'писала', 'прочитал', 'прочитала', 'приготовил', 'посмотрел'],
            explain: 'Proceso (imperfectivo) interrumpido, seguido de acciones completadas (perfectivo).',
          },
          {
            scene: 'Hábito pasado vs evento único',
            prompt: 'Describe un hábito que tenías antes (использовать НСВ) y algo que hiciste una vez (использовать СВ).',
            answer: 'Раньше я каждый день пил кофе. Один раз я попробовал чай и мне понравилось.',
            accepted: ['раньше', 'каждый', 'пил', 'пила', 'один раз', 'попробовал', 'попробовала'],
            explain: 'Раньше/каждый → imperfectivo; один раз → perfectivo.',
          },
          {
            scene: 'Usando pares de aspecto',
            prompt: 'Usa dos pares de aspecto (por ejemplo, читать/прочитать, делать/сделать) en dos oraciones contrastivas.',
            answer: 'Я долго делал домашнее задание, но наконец сделал. Он читал статью и потом прочитал её.',
            accepted: ['делал', 'сделал', 'читал', 'прочитал', 'делала', 'сделала', 'читала', 'прочитала'],
            explain: 'НСВ (proceso/duración) vs СВ (resultado/completado) en contraste directo.',
          },
        ],
      },
    ],
  },
}

export default topic
