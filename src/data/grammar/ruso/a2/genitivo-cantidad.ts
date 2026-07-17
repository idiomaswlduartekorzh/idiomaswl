import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'genitivo-cantidad',
  order: '05',
  color: '#1a2ecc',
  category: 'Casos',
  level: 'A2',
  title: 'El genitivo para cantidad y negación en ruso',
  shortTitle: 'Genitivo: cantidad y negación',
  metaTitle: 'Genitivo cantidad negación ruso A2 | нет, много, мало, несколько',
  description:
    'El genitivo ruso es obligatorio después de нет (no hay), много (mucho), мало (poco), несколько (algunos/unos pocos), сколько (cuánto) y números del 5 en adelante. Dominar estos contextos es clave para expresar existencia, cantidad y negación en ruso.',
  lead: 'Aprende cuándo usar el genitivo: У меня нет времени (no tengo tiempo), Много студентов (muchos estudiantes), Несколько книг (varios libros) — el caso que acompaña a la cantidad y la negación.',
  outcomes: [
    'Usar el genitivo después de нет para expresar negación de existencia',
    'Construir expresiones de cantidad con много, мало, несколько + genitivo',
    'Usar el genitivo plural después de números del 5 en adelante',
  ],
  guide: {
    goal: 'Usar el genitivo correctamente en contextos de negación y cantidad.',
    model: 'нет / много / мало / несколько + sustantivo en genitivo',
    formula: 'Genitivo sg: -а/-я (masc/neut) -ы/-и (fem) | Genitivo pl: -ов/-ей/-∅',
    decisions: [
      '¿Hay нет, у меня нет, не было? → sustantivo en genitivo',
      '¿Hay много, мало, несколько, сколько? → sustantivo en genitivo',
      '¿Hay número 5-20 o decenas? → sustantivo en genitivo plural',
      '¿Hay 2-4? → genitivo singular (dos libros = две книги)',
      'Femininos: книга → книги | студентка → студентки',
    ],
    table: [
      ['Contexto', 'Ejemplo', 'Traducción'],
      ['нет + gen.', 'У меня нет времени', 'no tengo tiempo'],
      ['много + gen.', 'Много студентов', 'muchos estudiantes'],
      ['мало + gen.', 'Мало денег', 'poco dinero'],
      ['несколько + gen.', 'Несколько книг', 'varios libros'],
      ['5+ + gen. pl.', 'Пять яблок', 'cinco manzanas'],
      ['сколько + gen.', 'Сколько времени?', '¿cuánto tiempo?'],
    ],
    mistakes: [
      'NO uses nominativo con нет: NO «нет книга» → нет книги (genitivo singular).',
      'NO confundas много + genitivo plural con nominativo: NO «много студент» → много студентов.',
      'Recuerda: 2-4 piden genitivo singular, 5+ piden genitivo plural.',
      'Deneg. de existencia: У меня нет + gen. | Existencia: У меня есть + nominativo.',
    ],
  },
  seo: [
    {
      heading: 'El genitivo con нет en ruso',
      paragraphs: [
        'Uno de los usos más frecuentes del genitivo es con нет (no hay / no tengo). La estructura У меня нет + genitivo es equivalente a "yo no tengo". Por ejemplo: У меня нет денег (no tengo dinero), У него нет машины (él no tiene coche).',
        'En el pasado, нет se convierte en не было + genitivo, y en el futuro en не будет + genitivo. Esta regla es constante: después de нет/не было/не будет siempre va genitivo.',
      ],
      table: [
        ['Expresión', 'Ejemplo', 'Traducción'],
        ['нет + gen.', 'У меня нет книги', 'no tengo el libro'],
        ['не было + gen.', 'У неё не было времени', 'ella no tenía tiempo'],
        ['не будет + gen.', 'У нас не будет денег', 'no tendremos dinero'],
      ],
    },
    {
      heading: 'Palabras de cantidad + genitivo',
      paragraphs: [
        'Las palabras много (mucho), мало (poco), несколько (varios/algunos), сколько (cuánto) siempre rigen genitivo plural. Ejemplos: Много студентов (muchos estudiantes), Мало денег (poco dinero), Несколько книг (varios libros).',
        'Los números también rigen genitivo: 2-4 piden genitivo singular (два студента, три книги), y 5 en adelante piden genitivo plural (пять студентов, шесть книг).',
      ],
    },
  ],
  visual: {
    mode: 'case-table',
    teacherLens:
      'The нет + genitive and много/мало + genitive patterns are the most frequent genitive triggers at A2. Focus on high-frequency nouns.',
    graphicPrompt:
      'Three panels: 1) нет + genitive (X mark over noun), 2) много/мало scale with genitive endings, 3) number line showing which numbers need which genitive form.',
    scene: [
      ['нет + genitivo', 'нет времени / нет денег / нет места / нет книги'],
      ['много/мало + genitivo pl.', 'много студентов / мало денег / много книг / мало времени'],
      ['несколько + genitivo pl.', 'несколько книг / несколько друзей / несколько дней'],
      ['2-4 + genitivo sg.', 'два студента / три книги / четыре яблока'],
      ['5+ + genitivo pl.', 'пять студентов / шесть книг / десять яблок'],
    ],
    learnerModes: ['recognition', 'case-selection', 'gap-fill', 'production'],
    practiceVerbs: ['нет', 'много', 'мало', 'несколько', 'сколько'],
    reviewFocus: ['нет + gen.', 'много/мало + gen. pl.', '2-4 vs 5+ gen.'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocer genitivo de cantidad',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del genitivo según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'нет + genitivo singular',
            lines: [['', 'У меня нет _____ . (libro — genitivo de книга)']],
            options: ['книги', 'книга', 'книгу', 'книге'],
            answer: 'книги',
            explain: 'нет + genitivo singular femenino: книга → книги (-а → -и).',
          },
          {
            scene: 'много + genitivo plural',
            lines: [['', 'В библиотеке много _____ . (libros — genitivo plural de книга)']],
            options: ['книг', 'книги', 'книга', 'книгам'],
            answer: 'книг',
            explain: 'много + genitivo plural: книга → книг (genitivo pl. con raíz sin desinencia).',
          },
          {
            scene: 'мало + genitivo',
            lines: [['', 'У нас мало _____ . (tiempo — genitivo de время)']],
            options: ['времени', 'время', 'времени', 'временем'],
            answer: 'времени',
            explain: 'мало + genitivo: время → времени (irregular neutro -мя → -мени).',
          },
          {
            scene: 'несколько + genitivo plural',
            lines: [['', 'Я купил несколько _____. (manzanas — genitivo plural de яблоко)']],
            options: ['яблок', 'яблоко', 'яблоки', 'яблокам'],
            answer: 'яблок',
            explain: 'несколько + genitivo plural: яблоко → яблок.',
          },
          {
            scene: 'Número 5+ + genitivo plural',
            lines: [['', 'В классе пять _____ . (estudiantes — genitivo pl. de студент)']],
            options: ['студентов', 'студент', 'студенты', 'студентам'],
            answer: 'студентов',
            explain: '5 + genitivo plural: студент → студентов (-ов para masculinos duros).',
          },
          {
            scene: 'нет + genitivo masculino',
            lines: [['', 'У него нет _____. (tiempo libre — genitivo de время)']],
            options: ['времени', 'время', 'временем', 'времен'],
            answer: 'времени',
            explain: 'нет + genitivo: время (neutro) → времени.',
          },
          {
            scene: 'сколько + genitivo',
            lines: [['', 'Сколько _____ в классе? (personas — genitivo pl. de человек)']],
            options: ['человек', 'люди', 'людей', 'человека'],
            answer: 'человек',
            explain: 'Сколько + genitivo plural: человек (irregular — genitivo pl. = человек, sin cambio).',
          },
          {
            scene: 'Negación de existencia',
            lines: [['', '¿Cuál es correcto para "no hay agua"?']],
            options: ['Нет воды', 'Нет вода', 'Воды нет нет', 'Не вода'],
            answer: 'Нет воды',
            explain: 'нет + genitivo: вода → воды (femenino -а → -ы).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Contexto y forma de genitivo',
        tag: '2 espacios',
        intro: 'Completa con la palabra de cantidad y la forma de genitivo correcta.',
        type: 'dual',
        items: [
          {
            scene: 'нет + sustantivo',
            lines: [['', 'У меня [[0]] [[1]]. (no tengo dinero)']],
            blanks: [
              { options: ['нет', 'много', 'мало'], answer: 'нет', explain: 'нет = no hay / no tengo.' },
              { options: ['денег', 'деньги', 'деньгам'], answer: 'денег', explain: 'деньги → genitivo plural: денег.' },
            ],
          },
          {
            scene: 'много + plural',
            lines: [['', 'В городе [[0]] [[1]]. (hay muchos museos)']],
            blanks: [
              { options: ['много', 'нет', 'мало'], answer: 'много', explain: 'много = muchos.' },
              { options: ['музеев', 'музей', 'музеи'], answer: 'музеев', explain: 'музей → genitivo plural: музеев.' },
            ],
          },
          {
            scene: 'несколько + plural',
            lines: [['', 'Я купила [[0]] [[1]] в магазине. (compré varias manzanas)']],
            blanks: [
              { options: ['несколько', 'много', 'нет'], answer: 'несколько', explain: 'несколько = varios/algunas.' },
              { options: ['яблок', 'яблоки', 'яблоку'], answer: 'яблок', explain: 'яблоко → genitivo plural: яблок.' },
            ],
          },
          {
            scene: 'число 5+ + plural',
            lines: [['', 'В классе [[0]] [[1]]. (hay diez estudiantes)']],
            blanks: [
              { options: ['десять', 'два', 'один'], answer: 'десять', explain: '10 = десять → genitivo plural.' },
              { options: ['студентов', 'студент', 'студенты'], answer: 'студентов', explain: '5+ → genitivo plural: студентов.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — cantidad y negación',
        tag: 'Opciones',
        intro: 'Completa el texto con las formas de genitivo correctas.',
        type: 'guidedText',
        scene: 'En la tienda',
        text: 'В магазине много [[0]], но мало [[1]]. У нас нет [[2]]. Я купил несколько [[3]]. На полке пять [[4]].',
        blanks: [
          { options: ['товаров', 'товар', 'товары'], answer: 'товаров', explain: 'много + genitivo plural: товар → товаров.' },
          { options: ['денег', 'деньги', 'деньгам'], answer: 'денег', explain: 'мало + genitivo plural: деньги → денег.' },
          { options: ['времени', 'время', 'временем'], answer: 'времени', explain: 'нет + genitivo singular: время → времени.' },
          { options: ['яблок', 'яблоко', 'яблоки'], answer: 'яблок', explain: 'несколько + genitivo plural: яблоко → яблок.' },
          { options: ['книг', 'книга', 'книги'], answer: 'книг', explain: 'пять + genitivo plural: книга → книг.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — genitivo sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta del genitivo.',
        type: 'freeText',
        scene: 'Completar con genitivo de cantidad',
        text: '1. У меня нет [[0]]. (брат — hermano) 2. В школе много [[1]]. (учитель — profesores) 3. Мало [[2]] в холодильнике. (молоко — leche) 4. Несколько [[3]] на столе. (тетрадь — cuadernos) 5. Три [[4]] в сумке. (книга — libros)',
        blanks: [
          { answer: 'брата', accepted: ['брата'], explain: 'нет + genitivo sg. masculino: брат → брата.' },
          { answer: 'учителей', accepted: ['учителей'], explain: 'много + genitivo pl.: учитель → учителей.' },
          { answer: 'молока', accepted: ['молока'], explain: 'мало + genitivo sg. neutro: молоко → молока.' },
          { answer: 'тетрадей', accepted: ['тетрадей'], explain: 'несколько + genitivo pl.: тетрадь → тетрадей.' },
          { answer: 'книги', accepted: ['книги'], explain: '3 (2-4) + genitivo sg.: книга → книги.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones usando нет, много, мало y несколько.',
        type: 'write',
        items: [
          {
            scene: 'Negación de posesión',
            prompt: 'Escribe en ruso: "No tengo tiempo." (у меня, нет, время)',
            answer: 'У меня нет времени.',
            accepted: ['у меня нет времени'],
            explain: 'У меня нет + genitivo: время → времени.',
          },
          {
            scene: 'Cantidad grande',
            prompt: 'Escribe: "En la ciudad hay muchos museos." (в городе, много, музей)',
            answer: 'В городе много музеев.',
            accepted: ['в городе много музеев'],
            explain: 'много + genitivo plural: музей → музеев.',
          },
          {
            scene: 'Cantidad pequeña',
            prompt: 'Escribe: "Tengo pocos amigos aquí." (у меня, мало, друг, здесь)',
            answer: 'У меня мало друзей здесь.',
            accepted: ['у меня мало друзей', 'мало друзей здесь'],
            explain: 'мало + genitivo plural: друг → друзей.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción libre',
        intro: 'Describe tu ciudad o tu casa usando genitivos de cantidad.',
        type: 'write',
        items: [
          {
            scene: 'Mi ciudad',
            prompt: 'Escribe 3 oraciones sobre tu ciudad usando много, мало y нет.',
            answer: 'В моём городе много парков. Мало музеев. Нет метро.',
            accepted: ['много', 'мало', 'нет'],
            explain: 'Cada palabra de cantidad rige genitivo: парков, музеев, метро.',
          },
          {
            scene: 'Lo que no tengo',
            prompt: 'Escribe 2 cosas que no tienes (У меня нет + genitivo).',
            answer: 'У меня нет машины. У меня нет времени на отдых.',
            accepted: ['у меня нет', 'нет машины', 'нет времени', 'нет денег'],
            explain: 'У меня нет + genitivo singular.',
          },
          {
            scene: 'Descripción cuantitativa',
            prompt: 'Describe lo que hay en tu habitación usando несколько y числа (números).',
            answer: 'В моей комнате несколько книг. Пять тетрадей на столе. Два стула.',
            accepted: ['несколько', 'книг', 'тетрадей', 'пять', 'два', 'три'],
            explain: 'несколько + gen. pl., 5+ + gen. pl., 2-4 + gen. sg.',
          },
        ],
      },
    ],
  },
}

export default topic
