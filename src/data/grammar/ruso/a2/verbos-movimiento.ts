import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbos-movimiento',
  order: '10',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A2',
  title: 'Verbos de movimiento en ruso A2: идти/ехать vs ходить/ездить',
  shortTitle: 'Verbos movimiento',
  metaTitle: 'Verbos de movimiento ruso A2 — идти vs ходить, ехать vs ездить, unidireccional',
  description:
    'El ruso tiene verbos de movimiento en pares: unidireccionales (un viaje concreto en curso) vs multidireccionales (hábito, ida y vuelta, sin dirección específica). Pares clave: идти (a pie, ahora) / ходить (a pie, hábito); ехать (en transporte, ahora) / ездить (en transporte, hábito); лететь (volando, ahora) / летать (volar, hábito); бежать (corriendo, ahora) / бегать (correr, hábito). El contexto y los adverbios temporales determinan cuál usar.',
  lead: 'Я иду в школу (ahora) / Я хожу в школу (todos los días): verbos de movimiento en ruso A2.',
  outcomes: [
    'Distinguir идти/ехать (unidireccional) de ходить/ездить (multidireccional)',
    'Usar идти/ходить para movimiento a pie',
    'Usar ехать/ездить para movimiento en transporte',
    'Reconocer contextos de uso según la dirección y la frecuencia',
  ],

  guide: {
    goal: 'Elegir el verbo de movimiento correcto según si es habitual o un desplazamiento concreto.',
    model: 'Сейчас я иду в магазин. (Ahora voy a la tienda — a pie, un viaje concreto.) / Каждый день я хожу в магазин. (Todos los días voy a la tienda — hábito.)',
    formula: 'unidireccional (ahora/concreto): идти/ехать/лететь | multidireccional (hábito/ida-vuelta): ходить/ездить/летать',
    decisions: [
      'Acción en curso, dirección concreta → идти: "Куда ты идёшь?" — "Я иду в библиотеку"',
      'Hábito, frecuencia → ходить: "Ты часто ходишь в кино?" — "Да, хожу каждую неделю"',
      'Transporte, viaje concreto → ехать: "Мы едем в Москву" (ahora viajamos)',
      'Transporte, hábito → ездить: "Он ездит на работу на метро" (siempre)',
      'Ida y vuelta expresada → ходить: "Вчера я ходил в аптеку" (fui y volví)',
    ],
    table: [
      ['Par', 'Unidireccional', 'Multidireccional'],
      ['A pie', 'идти (voy ahora)', 'ходить (voy habitualmente)'],
      ['Transporte', 'ехать (viajo ahora)', 'ездить (viajo habitualmente)'],
      ['Volando', 'лететь (vuelo ahora)', 'летать (vuelo habitualmente)'],
    ],
    mistakes: [
      '"Каждый день я иду в школу" ❌ → "Каждый день я хожу в школу" ✓ — hábito → ходить.',
      '"Вчера я шёл в магазин и купил хлеб" — puede ser correcto si describe el trayecto.',
      '"Сейчас я езжу на работе" ❌ → "Сейчас я еду на работу" ✓ — ahora, concreto → ехать.',
    ],
  },

  seo: [
    {
      heading: 'Идти vs ходить: la diferencia clave',
      paragraphs: [
        'Идти se usa para un movimiento a pie en curso en el momento presente, con una dirección específica: "Куда ты идёшь?" (¿Adónde vas?) — "Я иду домой" (Voy a casa — ahora mismo). En pasado, шёл/шла describe el trayecto: "Я шёл по улице" (Iba caminando por la calle).',
        'Ходить expresa movimiento habitual, frecuente o sin dirección específica: "Я хожу в спортзал три раза в неделю" (Voy al gimnasio tres veces a la semana). También indica una ida y vuelta completada: "Вчера я ходил в магазин" (Ayer fui a la tienda — y volví). Esta distinción es clave en ruso.',
      ],
    },
    {
      heading: 'Ехать vs ездить: transporte',
      paragraphs: [
        'Ехать indica un viaje en transporte (coche, metro, tren, autobús) que está ocurriendo ahora o en un momento específico: "Мы едем в Санкт-Петербург" (Viajamos a San Petersburgo — ahora). La conjugación de ехать: я еду, ты едешь, он/она едет, мы едем, вы едете, они едут.',
        'Ездить expresa el hábito de ir en transporte: "Он ездит на работу на метро каждый день" (Él va al trabajo en metro todos los días). También: "Прошлым летом мы ездили в Испанию" (El verano pasado fuimos a España — viaje completo de ida y vuelta).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'идти/ехать = ahora/concreto | ходить/ездить = hábito/ida-vuelta.',
    graphicPrompt: 'Dos flechas: una recta (идти/ехать) y una circular (ходить/ездить).',
    scene: [
      ['Куда ты идёшь? — Я иду в библиотеку.', '¿Adónde vas? — Voy a la biblioteca (ahora).'],
      ['Ты часто ходишь в кино? — Да, хожу каждую неделю.', '¿Vas al cine a menudo? — Sí, voy cada semana.'],
      ['Сейчас мы едем в Москву на поезде.', 'Ahora viajamos a Moscú en tren.'],
      ['Каждое лето мы ездим на море.', 'Cada verano vamos al mar.'],
      ['Вчера я ходил в аптеку.', 'Ayer fui a la farmacia (y volví).'],
      ['Самолёт летит из Парижа в Лондон.', 'El avión vuela de París a Londres.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['идти = ahora/a pie', 'ходить = hábito/a pie', 'ехать = ahora/transporte', 'ездить = hábito/transporte'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige идти/ходить o ехать/ездить',
        tag: 'Opción múltiple',
        intro: 'Selecciona el verbo de movimiento correcto según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Куда ты ___ ? — В магазин. (ahora, a pie)',
            lines: [['', 'Куда ты ___ ? — В магазин.']],
            options: ['идёшь', 'ходишь', 'едешь', 'ездишь'],
            answer: 'идёшь',
            explain: '"идёшь" — movimiento a pie en curso ahora. идти: я иду, ты идёшь, он идёт.',
          },
          {
            scene: 'Каждый день он ___ в университет на метро.',
            lines: [['', 'Каждый день он ___ в университет на метро.']],
            options: ['ездит', 'едет', 'идёт', 'ходит'],
            answer: 'ездит',
            explain: '"ездит" — hábito diario en transporte → ездить. Каждый день = señal de hábito.',
          },
          {
            scene: 'Сейчас мы ___ на работу.',
            lines: [['', 'Сейчас мы ___ на работу.']],
            options: ['едем', 'ездим', 'идём', 'ходим'],
            answer: 'едем',
            explain: '"едем" — ahora, en este momento, viaje concreto en transporte → ехать.',
          },
          {
            scene: 'Вчера она ___ в больницу. (hizo el viaje, volvió)',
            lines: [['', 'Вчера она ___ в больницу.']],
            options: ['ходила', 'шла', 'ехала', 'ездила'],
            answer: 'ходила',
            explain: '"ходила" — pasado ida y vuelta completada, a pie → ходить. Шла sería el trayecto en curso.',
          },
          {
            scene: 'Я ___ в Испанию каждое лето. (hábito, en avión)',
            lines: [['', 'Я ___ в Испанию каждое лето.']],
            options: ['езжу', 'еду', 'иду', 'хожу'],
            answer: 'езжу',
            explain: '"езжу" — hábito anual en transporte → ездить (1ª sg: я езжу).',
          },
          {
            scene: 'Самолёт сейчас ___ в Париж.',
            lines: [['', 'Самолёт сейчас ___ в Париж.']],
            options: ['летит', 'летает', 'идёт', 'едет'],
            answer: 'летит',
            explain: '"летит" — vuelo concreto en curso → лететь (unidireccional).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Ahora vs hábito',
        tag: '2 espacios',
        intro: 'Completa con el verbo de movimiento correcto (ahora / hábito).',
        type: 'dual',
        items: [
          {
            scene: 'María va ahora a la tienda / María va a la tienda cada día.',
            lines: [['', 'Сейчас Мария [[0]] в магазин. Каждый день она [[1]] в магазин.']],
            blanks: [
              { options: ['идёт', 'ходит', 'едет', 'ездит'], answer: 'идёт', explain: '"идёт" — сейчас, a pie, concreto → идти (она идёт).' },
              { options: ['ходит', 'идёт', 'ездит', 'едет'], answer: 'ходит', explain: '"ходит" — каждый день, hábito → ходить (она ходит).' },
            ],
          },
          {
            scene: 'Ahora viajamos en metro / Habitualmente vamos en metro.',
            lines: [['', 'Мы сейчас [[0]] на метро. Обычно мы [[1]] на метро.']],
            blanks: [
              { options: ['едем', 'ездим', 'идём', 'ходим'], answer: 'едем', explain: '"едем" — сейчас, transporte, concreto → ехать (мы едем).' },
              { options: ['ездим', 'едем', 'ходим', 'идём'], answer: 'ездим', explain: '"ездим" — обычно, hábito en transporte → ездить (мы ездим).' },
            ],
          },
          {
            scene: 'El avión vuela ahora a Roma / Los pilotos vuelan habitualmente a Roma.',
            lines: [['', 'Самолёт [[0]] в Рим сейчас. Пилоты часто [[1]] в Рим.']],
            blanks: [
              { options: ['летит', 'летает', 'едет', 'ездит'], answer: 'летит', explain: '"летит" — ahora, vuelo concreto → лететь (он летит).' },
              { options: ['летают', 'летят', 'ездят', 'едут'], answer: 'летают', explain: '"летают" — habitualmente → летать (они летают).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un día y una semana',
        tag: 'Texto guiado',
        intro: 'Completa el texto con el verbo de movimiento correcto.',
        type: 'guidedText',
        scene: 'Катя рассказывает о своих поездках.',
        text: 'Сейчас я [[0]] домой пешком. Обычно я [[1]] домой на автобусе. Вчера я [[2]] в библиотеку и вернулась. Каждую пятницу мы [[3]] с друзьями в кино. Летом мы [[4]] на море на машине.',
        blanks: [
          { options: ['иду', 'хожу', 'еду', 'езжу'], answer: 'иду', explain: '"иду" — сейчас, a pie → идти (я иду).' },
          { options: ['езжу', 'еду', 'иду', 'хожу'], answer: 'езжу', explain: '"езжу" — habitualmente, transporte → ездить (я езжу).' },
          { options: ['ходила', 'шла', 'ехала', 'ездила'], answer: 'ходила', explain: '"ходила" — pasado ida y vuelta (вернулась confirma la vuelta) → ходить.' },
          { options: ['ходим', 'идём', 'ездим', 'едем'], answer: 'ходим', explain: '"ходим / ездим" — каждую пятницу/летом = hábito. Кино a pie → ходим; al mar en coche → ездим.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Conjuga el verbo',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma correcta del verbo de movimiento.',
        type: 'freeText',
        scene: 'Напишите правильную форму глагола движения.',
        text: 'Куда ты [[0]] ? (идти, tú) / Каждый день он [[1]] в офис на машине. (ездить) / Вчера мы [[2]] в ресторан. (ходить, pasado pl) / Сейчас поезд [[3]] в Москву. (ехать)',
        blanks: [
          { answer: 'идёшь', explain: '"идёшь" — идти, 2ª sg presente: я иду, ты идёшь.' },
          { answer: 'ездит', explain: '"ездит" — ездить, 3ª sg presente: он ездит.' },
          { answer: 'ходили', explain: '"ходили" — ходить, pasado plural: мы ходили.' },
          { answer: 'едет', explain: '"едет" — ехать, 3ª sg presente: поезд едет.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Describe el movimiento',
        tag: 'Escritura guiada',
        intro: 'Escribe la frase con el verbo de movimiento correcto.',
        type: 'write',
        items: [
          {
            scene: '¿Adónde vas ahora? (a pie, a la biblioteca)',
            prompt: 'Usa идти + destino en acusativo.',
            answer: 'Я иду в библиотеку.',
            accepted: ['Сейчас я иду в библиотеку читать.'],
            explain: '"иду в библиотеку" — ahora, a pie → идти. библиотека → библиотеку (-а→-у).',
          },
          {
            scene: '¿Con qué frecuencia vas al gimnasio?',
            prompt: 'Usa ходить + frecuencia.',
            answer: 'Я хожу в спортзал три раза в неделю.',
            accepted: ['Я хожу в спортзал каждый день.'],
            explain: '"хожу в спортзал" — hábito, a pie → ходить.',
          },
          {
            scene: 'El año pasado fuisteis a Francia (en avión, viaje completo).',
            prompt: 'Usa ездить/летать en pasado plural.',
            answer: 'В прошлом году мы летали во Францию.',
            accepted: ['В прошлом году мы ездили во Францию на самолёте.'],
            explain: '"летали / ездили" — viaje de ida y vuelta en pasado → multidireccional.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Tus desplazamientos habituales',
        tag: 'Escritura libre',
        intro: 'Escribe sobre cómo te desplazas habitualmente y algún viaje reciente.',
        type: 'write',
        items: [
          {
            scene: 'Describe cómo te desplazas cada día.',
            prompt: 'Используй ходить/ездить для habitual; идти/ехать para ahora o viaje concreto.',
            answer: 'Каждый день я хожу в университет пешком — это занимает 15 минут. Обычно я езжу в центр на автобусе. Но сегодня утром я шёл в магазин и купил продукты.',
            accepted: ['Я езжу на работу на метро каждый день. Иногда я хожу пешком, если погода хорошая. Вчера я ходил на почту.'],
            explain: 'ходить/ездить = hábito (каждый день, обычно) | идти/ехать = ahora/concreto (сегодня, сейчас).',
          },
          {
            scene: 'Describe un viaje reciente y tus planes para el próximo.',
            prompt: 'Usa ездить/летать (pasado, viaje completo) и ехать/лететь (futuro concreto).',
            answer: 'В прошлом году мы ездили в Испанию на машине. Это было замечательно ! В следующем месяце я лечу в Лондон на самолёте. Оттуда я поеду в Оксфорд на поезде.',
            accepted: ['Летом я летал в Японию. В следующем году я поеду в Германию на поезде. Обычно я езжу на поезде, потому что люблю смотреть в окно.'],
            explain: 'ездили/летал = viaje pasado completo; лечу/поеду = viaje futuro concreto (unidireccional en ese contexto).',
          },
        ],
      },
    ],
  },
}

export default topic
