import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'futuro-perfectivo',
  order: '04',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A2',
  title: 'Futuro perfectivo en ruso: formas conjugadas simples',
  shortTitle: 'Futuro perfectivo',
  metaTitle: 'Futuro perfectivo ruso A2 | Я прочитаю, сделаю, напишу',
  description:
    'El futuro perfectivo ruso se forma conjugando directamente el verbo perfectivo en presente (las mismas terminaciones del presente). Expresa una acción futura que se completará o tendrá un resultado concreto. No usa буду — el verbo se conjuga solo, como en presente pero con significado futuro.',
  lead: 'Aprende el futuro perfectivo ruso: прочитаю (terminaré de leer), сделаю (haré/terminaré), напишу (escribiré/terminaré) — conjugado como el presente pero con sentido de resultado futuro.',
  outcomes: [
    'Reconocer que los verbos perfectivos conjugados en "presente" expresan futuro',
    'Conjugar verbos perfectivos frecuentes en todas las personas para el futuro',
    'Diferenciar el futuro perfectivo (resultado) del imperfectivo (proceso)',
  ],
  guide: {
    goal: 'Expresar acciones futuras completadas usando las formas conjugadas de los verbos perfectivos.',
    model: 'Verbo perfectivo conjugado (mismas terminaciones del presente) → significa futuro',
    formula: 'прочитаю / прочитаешь / прочитает / прочитаем / прочитаете / прочитают',
    decisions: [
      '¿La acción futura tiene un resultado esperado o se completará? → futuro perfectivo',
      '¿La acción futura es un proceso sin énfasis en conclusión? → буду + infinitivo (НСВ)',
      'Los verbos perfectivos solo tienen pasado y futuro — no tienen presente real',
      'Las terminaciones son idénticas a las del presente; el aspecto perfectivo da significado futuro',
    ],
    table: [
      ['Persona', 'прочитать (СВ)', 'сделать (СВ)'],
      ['я', 'прочитаю', 'сделаю'],
      ['ты', 'прочитаешь', 'сделаешь'],
      ['он/она/оно', 'прочитает', 'сделает'],
      ['мы', 'прочитаем', 'сделаем'],
      ['вы', 'прочитаете', 'сделаете'],
      ['они', 'прочитают', 'сделают'],
    ],
    mistakes: [
      'NO uses буду + perfectivo: NO «я буду прочитать» — incorrecto. Solo прочитаю.',
      'El perfectivo conjugado NUNCA es presente — siempre es futuro: прочитаю = leeré (no leo).',
      'No confundas я читаю (presente, НСВ) con я прочитаю (futuro, СВ).',
      'El futuro perfectivo implica que la acción se completará — no lo uses para procesos.',
    ],
  },
  seo: [
    {
      heading: '¿Qué es el futuro perfectivo en ruso?',
      paragraphs: [
        'En ruso, los verbos perfectivos no tienen presente real. Cuando los conjugas en "presente", significan futuro. Así, прочитаю no es "yo leo (ahora)" sino "yo leeré / terminaré de leer". Esto parece confuso al principio pero se vuelve natural rápidamente.',
        'El futuro perfectivo expresa acciones futuras que se completarán con un resultado concreto. Por ejemplo: Я прочитаю эту книгу = voy a terminar de leer este libro. Она сделает домашнее задание = ella terminará la tarea.',
      ],
      table: [
        ['Verbo (СВ)', 'yo-forma', 'Traducción'],
        ['прочитать', 'прочитаю', 'terminaré de leer'],
        ['написать', 'напишу', 'escribiré / terminaré de escribir'],
        ['сделать', 'сделаю', 'haré / terminaré'],
        ['сказать', 'скажу', 'diré'],
        ['посмотреть', 'посмотрю', 'miraré / veré'],
        ['взять', 'возьму', 'tomaré / agarraré'],
      ],
    },
    {
      heading: 'Comparación futuro perfectivo vs imperfectivo',
      paragraphs: [
        'La elección entre futuro perfectivo e imperfectivo depende de si el resultado importa. Я буду читать эту книгу (estaré leyendo — proceso) vs Я прочитаю эту книгу (terminaré de leer el libro — resultado).',
        'Palabras como обязательно (definitivamente), скоро (pronto), за час (en una hora) suelen acompañar al perfectivo. Palabras como весь день (todo el día), долго (mucho tiempo) suelen ir con el imperfectivo.',
      ],
    },
  ],
  visual: {
    mode: 'conjugation-table',
    teacherLens:
      'The key insight for learners: perfectivo "present" conjugation = future meaning. Drill pairs: НСВ present vs СВ "future" to build aspect intuition.',
    graphicPrompt:
      'Split table: left column "Presente НСВ" (читаю=I read now), right column "Futuro СВ" (прочитаю=I will finish reading). Same endings, different meaning. Color contrast between columns.',
    scene: [
      ['читаю (AHORA)', 'прочитаю (FUTURO completado)'],
      ['пишу (AHORA)', 'напишу (FUTURO completado)'],
      ['делаю (AHORA)', 'сделаю (FUTURO completado)'],
      ['смотрю (AHORA)', 'посмотрю (FUTURO completado)'],
      ['говорю (AHORA)', 'скажу (FUTURO completado)'],
    ],
    learnerModes: ['aspect-recognition', 'conjugation-drill', 'gap-fill', 'production'],
    practiceVerbs: ['прочитать', 'написать', 'сделать', 'сказать', 'посмотреть', 'взять'],
    reviewFocus: ['СВ conjugado = futuro', 'no usar буду + СВ', 'результат vs процесс'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Identificar el futuro perfectivo',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del futuro perfectivo.',
        type: 'choice',
        items: [
          {
            scene: 'прочитать — yo',
            lines: [['', '¿Cuál es el futuro perfectivo de прочитать para "я"?']],
            options: ['прочитаю', 'буду читать', 'читаю', 'прочитал'],
            answer: 'прочитаю',
            explain: 'Futuro perfectivo de прочитать → yo: прочитаю. No usa буду.',
          },
          {
            scene: 'сделать — она',
            lines: [['', 'Она _____ домашнее задание завтра. (hacer la tarea)']],
            options: ['сделает', 'будет делать', 'делает', 'сделала'],
            answer: 'сделает',
            explain: 'Resultado futuro → perfectivo: она сделает (terminará).',
          },
          {
            scene: 'написать — ты',
            lines: [['', 'Когда ты _____ письмо? (¿cuándo terminarás de escribir la carta?)']],
            options: ['напишешь', 'будешь писать', 'пишешь', 'написал'],
            answer: 'напишешь',
            explain: 'Resultado futuro (terminar de escribir) → perfectivo: напишешь.',
          },
          {
            scene: 'Contraste de aspecto',
            lines: [['', '¿Cuál oración expresa "terminaré de ver la película"?']],
            options: ['Я посмотрю фильм', 'Я буду смотреть фильм', 'Я смотрю фильм', 'Я смотрел фильм'],
            answer: 'Я посмотрю фильм',
            explain: 'Posмотрю (perfectivo) = terminaré de ver. Буду смотреть = estaré viendo (proceso).',
          },
          {
            scene: 'сказать — мы',
            lines: [['', 'Мы _____ правду. (diremos la verdad — completado)']],
            options: ['скажем', 'будем говорить', 'говорим', 'сказали'],
            answer: 'скажем',
            explain: 'Perfectivo de сказать → мы: скажем. Acción de resultado.',
          },
          {
            scene: 'взять — они',
            lines: [['', 'Они _____ книги из библиотеки. (tomarán los libros de la biblioteca)']],
            options: ['возьмут', 'будут брать', 'берут', 'взяли'],
            answer: 'возьмут',
            explain: 'взять (perfectivo) → они: возьмут. Результат: tomarán (completado).',
          },
          {
            scene: 'Error de aspecto',
            lines: [['', '¿Cuál oración es INCORRECTA para expresar "terminaré de escribir"?']],
            options: ['Я буду написать', 'Я напишу', 'Я написал', 'Я буду писать (proceso)'],
            answer: 'Я буду написать',
            explain: 'NO se puede usar буду + perfectivo. Correcto: Я напишу (sin буду).',
          },
          {
            scene: 'Futuro vs presente',
            lines: [['', '¿Cuál es el significado de "Она прочитает книгу"?']],
            options: ['Ella terminará de leer el libro', 'Ella lee el libro (ahora)', 'Ella leyó el libro', 'Ella leía el libro'],
            answer: 'Ella terminará de leer el libro',
            explain: 'Perfectivo conjugado = futuro con resultado. Прочитает = terminará de leer.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Persona y forma perfectiva futura',
        tag: '2 espacios',
        intro: 'Completa con la persona y la forma de futuro perfectivo correcta.',
        type: 'dual',
        items: [
          {
            scene: 'прочитать — yo',
            lines: [['', '[[0]] [[1]] книгу завтра. (yo terminaré de leer el libro mañana)']],
            blanks: [
              { options: ['Я', 'Он', 'Они'], answer: 'Я', explain: 'Primera persona singular.' },
              { options: ['прочитаю', 'прочитает', 'прочитают'], answer: 'прочитаю', explain: 'я → прочитаю (futuro perfectivo).' },
            ],
          },
          {
            scene: 'написать — ellos',
            lines: [['', 'Они отчёт к пятнице. (ellos [[0]] el informe para el viernes)']],
            blanks: [
              { options: ['напишут', 'напишет', 'напишу'], answer: 'напишут', explain: 'они → напишут.' },
              { options: ['к пятнице', 'в пятницу', 'в пятниц'], answer: 'к пятнице', explain: 'К + dativo = para el viernes.' },
            ],
          },
          {
            scene: 'сделать — tú',
            lines: [['', 'Ты [[0]] это [[1]]? (¿tú terminarás esto mañana?)']],
            blanks: [
              { options: ['сделаешь', 'сделает', 'сделаю'], answer: 'сделаешь', explain: 'ты → сделаешь.' },
              { options: ['завтра', 'вчера', 'сейчас'], answer: 'завтра', explain: 'Завтра = mañana (futuro).' },
            ],
          },
          {
            scene: 'посмотреть — nosotros',
            lines: [['', 'Мы [[0]] этот фильм вечером. (nosotros veremos esta película por la tarde)']],
            blanks: [
              { options: ['посмотрим', 'посмотрят', 'посмотрю'], answer: 'посмотрим', explain: 'мы → посмотрим.' },
              { options: ['вечером', 'вечера', 'вечер'], answer: 'вечером', explain: 'Вечером = por la tarde/noche (instrumental de tiempo).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — planes con resultado',
        tag: 'Opciones',
        intro: 'Completa con el futuro perfectivo correcto.',
        type: 'guidedText',
        scene: 'Planes concretos para esta semana',
        text: 'На этой неделе я [[0]] отчёт. Во вторник она [[1]] в магазин. Мы [[2]] это задание вместе. Ты [[3]] им правду? Они [[4]] всё до пятницы.',
        blanks: [
          { options: ['напишу', 'буду писать', 'пишу'], answer: 'напишу', explain: 'Resultado (completar informe) → напишу (perfectivo).' },
          { options: ['пойдёт', 'будет идти', 'идёт'], answer: 'пойдёт', explain: 'Ir una vez a un lugar → пойдёт (perfectivo de идти).' },
          { options: ['сделаем', 'будем делать', 'делаем'], answer: 'сделаем', explain: 'Resultado conjunto → сделаем.' },
          { options: ['скажешь', 'будешь говорить', 'говоришь'], answer: 'скажешь', explain: 'Acción de decir (resultado) → скажешь.' },
          { options: ['сделают', 'будут делать', 'делают'], answer: 'сделают', explain: 'Completar todo para el viernes → сделают.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — futuro perfectivo sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma de futuro perfectivo correcta.',
        type: 'freeText',
        scene: 'Completar con el futuro perfectivo',
        text: '1. Я [[0]] тебе завтра. (позвонить — llamaré) 2. Она [[1]] задание вечером. (сделать) 3. Они [[2]] правду. (сказать) 4. Мы [[3]] эту книгу. (прочитать) 5. Ты [[4]] письмо? (написать)',
        blanks: [
          { answer: 'позвоню', accepted: ['позвоню'], explain: 'позвонить → я: позвоню.' },
          { answer: 'сделает', accepted: ['сделает'], explain: 'сделать → она: сделает.' },
          { answer: 'скажут', accepted: ['скажут'], explain: 'сказать → они: скажут.' },
          { answer: 'прочитаем', accepted: ['прочитаем'], explain: 'прочитать → мы: прочитаем.' },
          { answer: 'напишешь', accepted: ['напишешь'], explain: 'написать → ты: напишешь.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Traduce al ruso usando el futuro perfectivo.',
        type: 'write',
        items: [
          {
            scene: 'Promesa',
            prompt: 'Escribe en ruso: "Te llamaré mañana." (позвонить, завтра, тебе)',
            answer: 'Я позвоню тебе завтра.',
            accepted: ['позвоню тебе завтра', 'я позвоню'],
            explain: 'Позвонить → perfectivo → я позвоню. Tебе = te (dativo).',
          },
          {
            scene: 'Resultado en el futuro',
            prompt: 'Escribe: "Ella terminará el informe para el viernes." (сделать, отчёт, к пятнице)',
            answer: 'Она сделает отчёт к пятнице.',
            accepted: ['она сделает отчёт к пятнице', 'сделает отчёт'],
            explain: 'Сделать → perfectivo → она сделает. К пятнице = para el viernes.',
          },
          {
            scene: 'Contraste futuro',
            prompt: 'Escribe dos oraciones: una de proceso (буду + НСВ) y una de resultado (СВ sin буду), sobre leer.',
            answer: 'Я буду читать весь вечер. Завтра я прочитаю эту статью.',
            accepted: ['буду читать', 'прочитаю'],
            explain: 'Proceso: буду читать. Resultado: прочитаю.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción libre',
        intro: 'Escribe sobre compromisos y resultados que lograrás esta semana.',
        type: 'write',
        items: [
          {
            scene: 'Compromisos de la semana',
            prompt: 'Escribe 3 cosas que terminarás de hacer esta semana (usa futuro perfectivo — sin буду).',
            answer: 'На этой неделе я прочитаю книгу, напишу письмо и позвоню маме.',
            accepted: ['прочитаю', 'напишу', 'позвоню', 'сделаю', 'скажу'],
            explain: 'Perfectivo: прочитаю, напишу, позвоню — resultados concretos futuros.',
          },
          {
            scene: 'Promesas',
            prompt: 'Escribe 2 promesas en futuro perfectivo (yo le prometo a alguien que haré algo).',
            answer: 'Я скажу тебе правду. Я принесу тебе подарок.',
            accepted: ['скажу', 'принесу', 'куплю', 'позвоню', 'напишу'],
            explain: 'Promesas = resultados futuros → perfectivo sin буду.',
          },
          {
            scene: 'Contraste final',
            prompt: 'Escribe una oración con буду + НСВ (proceso) y una con СВ (resultado), sobre el mismo tema.',
            answer: 'Завтра я буду учить русский весь день. К вечеру я выучу новые слова.',
            accepted: ['буду учить', 'буду читать', 'буду работать', 'выучу', 'прочитаю', 'сделаю'],
            explain: 'Proceso: буду учить; Resultado: выучу. Ambos válidos en contextos diferentes.',
          },
        ],
      },
    ],
  },
}

export default topic
