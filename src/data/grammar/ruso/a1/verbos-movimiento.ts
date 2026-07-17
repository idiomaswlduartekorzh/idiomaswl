import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbos-movimiento',
  order: '14',
  color: '#1a2ecc',
  category: 'Глаголы',
  level: 'A1',
  title: 'Verbos de movimiento en ruso A1: идти vs ехать, ходить vs ездить',
  shortTitle: 'Verbos de movimiento',
  metaTitle: 'Verbos de movimiento ruso A1 — идти, ехать, ходить, ездить, идти vs ехать',
  description:
    'El ruso tiene dos tipos de verbos de movimiento: unidireccionales (una sola vez, en este momento: идти/ехать) y multidireccionales (habitual o en múltiples direcciones: ходить/ездить). Идти = ir a pie ahora. Ходить = ir a pie habitualmente. Ехать = ir en vehículo ahora. Ездить = ir en vehículo habitualmente.',
  lead: 'Идти o ехать — ¿a pie o en vehículo? ¿Ahora o habitualmente? El ruso distingue todo esto con sus verbos de movimiento. Domina эти cuatro verbos y evita el error más frecuente de A1.',
  outcomes: [
    'Distinguir идти (a pie, ahora) de ехать (en vehículo, ahora)',
    'Usar ходить (a pie, habitual) y ездить (en vehículo, habitual)',
    'Escoger el verbo correcto según medio de transporte y frecuencia',
  ],
  guide: {
    goal: 'Usar los cuatro verbos de movimiento básicos según el medio de transporte y la frecuencia.',
    model: '[¿A pie o vehículo?] + [¿Ahora o habitual?] → verbo correcto',
    formula: 'A pie+ahora: иду | En vehículo+ahora: еду | A pie+habitual: хожу | En vehículo+habitual: езжу',
    decisions: [
      '¿Ahora, a pie, dirección única? → идти (Я иду в магазин — Voy a la tienda ahora)',
      '¿Ahora, en metro/autobús/carro? → ехать (Я еду в школу на метро — Voy a la escuela en metro)',
      '¿Hábito, a pie? → ходить (Я хожу в парк каждый день — Voy al parque cada día)',
      '¿Hábito, en transporte? → ездить (Я езжу на работу на автобусе — Voy al trabajo en autobús)',
    ],
    table: [
      ['Tipo', 'A pie', 'En vehículo'],
      ['Ahora (unidireccional)', 'идти → иду/идёшь/идёт', 'ехать → еду/едешь/едет'],
      ['Habitual (multidireccional)', 'ходить → хожу/ходишь/ходит', 'ездить → езжу/ездишь/ездит'],
    ],
    mistakes: [
      'Иду vs еду: si usas metro, autobús o carro → еду. Si vas caminando → иду. Nunca иду en metro.',
      'Хожу vs езжу: habitual + a pie = хожу. Habitual + vehículo = езжу. La alternancia ж/зд es fonética normal.',
      'Con идти/ехать (unidireccionales): indica destino con в + acusativo: иду в магазин (no "иду в магазине").',
      'Ходить/ездить también pueden indicar "haber ido y vuelto": Я ходил в кино вчера = Fui al cine ayer (y volví).',
    ],
  },
  seo: [
    {
      heading: '¿Por qué el ruso tiene tantos verbos de movimiento?',
      paragraphs: [
        'El sistema de verbos de movimiento del ruso parece complejo al principio, pero responde a una lógica clara: el idioma distingue SI la acción ocurre ahora (dirección única) o es habitual (múltiples direcciones), Y si el movimiento es a pie o en vehículo. Estas dos distinciones crean cuatro verbos básicos en A1.',
        'En español solo tenemos "ir" para todo. En ruso: идти (voy a pie, ahora) ≠ ехать (voy en metro, ahora) ≠ ходить (suelo ir a pie) ≠ ездить (suelo ir en transporte). Una vez que entiendas la lógica, el sistema es consistente.',
      ],
      table: [
        ['Verbo', 'Yo (eu)', 'Cuándo', 'Ejemplo'],
        ['идти', 'иду', 'A pie, ahora, una dirección', 'Иду домой (Voy a casa a pie)'],
        ['ехать', 'еду', 'Vehículo, ahora, una dirección', 'Еду в Москву на поезде (Voy a Moscú en tren)'],
        ['ходить', 'хожу', 'A pie, habitual / ida y vuelta', 'Хожу в школу каждый день'],
        ['ездить', 'езжу', 'Vehículo, habitual / ida y vuelta', 'Езжу на метро каждый день'],
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'The key split is on-foot vs. vehicle AND now/one-direction vs. habitual/multi-direction. The 2x2 grid is the best mental model. Start with иду (I\'m walking now) vs еду (I\'m riding now) — this pair is most immediately useful.',
    graphicPrompt:
      '2x2 grid: rows = a pie / en vehículo; columns = ahora / habitual. Each cell has the verb and a pictogram. Blue Russian theme.',
    scene: [
      ['идти', 'Я иду в магазин (idú) — Voy a la tienda a pie (ahora)'],
      ['ехать', 'Я еду на работу (yedú) — Voy al trabajo (en vehículo, ahora)'],
      ['ходить', 'Я хожу в парк каждый день (khózhу) — Voy al parque cada día (a pie)'],
      ['ездить', 'Я езжу на метро (yézhzhу) — Voy en metro (habitual)'],
      ['идти — pregunta', 'Куда ты идёшь? (idyósh) — ¿Adónde vas (a pie)?'],
      ['ехать — pregunta', 'Куда ты едешь? (yéдesh) — ¿Adónde vas (en vehículo)?'],
    ],
    learnerModes: ['recognition', 'transformation', 'gap-fill', 'production'],
    practiceVerbs: ['идти', 'ехать', 'ходить', 'ездить'],
    reviewFocus: ['a pie vs vehículo', 'ahora vs habitual', 'destino con в + acusativo'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento de verbos de movimiento',
        tag: 'Opción múltiple',
        intro: 'Identifica el verbo de movimiento correcto.',
        type: 'choice',
        items: [
          { scene: 'Ahora a pie', lines: [['', '"Voy a la tienda a pie ahora": Я ___ в магазин.']], options: ['хожу', 'езжу', 'еду', 'иду'], answer: 'иду', explain: 'Иду = voy a pie, ahora, dirección única. Я иду в магазин.' },
          { scene: 'Habitual en metro', lines: [['', '"Voy al trabajo en metro cada día": Я ___ на работу на метро каждый день.']], options: ['иду', 'еду', 'хожу', 'езжу'], answer: 'езжу', explain: 'Езжу = voy habitualmente en vehículo. ездить → езжу (yo habitual).' },
          { scene: 'Ahora en taxi', lines: [['', '"Vamos al aeropuerto en taxi ahora": Мы ___ в аэропорт на такси.']], options: ['идём', 'ходим', 'ездим', 'едем'], answer: 'едем', explain: 'Едем = vamos en vehículo ahora (мы). ехать → едем.' },
          { scene: 'Habitual a pie', lines: [['', '"Ella va a la escuela a pie cada mañana": Она ___ в школу каждое утро.']], options: ['идёт', 'едет', 'ездит', 'ходит'], answer: 'ходит', explain: 'Ходит = va habitualmente a pie. ходить → ходит (она).' },
          { scene: 'Distinción vehículo', lines: [['', '¿Cuál verbo usas si vas en autobús ahora?']], options: ['идти', 'ходить', 'ехать', 'ездить'], answer: 'ехать', explain: 'ехать = ir en vehículo, ahora, dirección única. Autobús, metro, tren, carro → ехать.' },
          { scene: 'Куда + verbo', lines: [['', '"¿Adónde vas (a pie)?" — Куда ты ___?']], options: ['едешь', 'ходишь', 'ездишь', 'идёшь'], answer: 'идёшь', explain: 'Идёшь = vas (a pie, ahora, tú). ты + идти → идёшь.' },
          { scene: 'Ездить conjugado', lines: [['', '"Yo suelo ir en carro (habitual)": Я ___ на машине.']], options: ['иду', 'еду', 'езжу', 'хожу'], answer: 'езжу', explain: 'Езжу = voy habitualmente en vehículo. ездить → езжу (irregularidad: зд → зж).' },
          { scene: 'Ходить habitual', lines: [['', '"¿Vas a menudo al gimnasio (a pie)?": Ты ___ в спортзал часто?']], options: ['идёшь', 'едешь', 'ездишь', 'ходишь'], answer: 'ходишь', explain: 'Ходишь = vas habitualmente (a pie). ходить → ходишь (ты).' },
        ],
      },
      {
        id: 'level-2',
        title: 'Movimiento — два пробела',
        tag: '2 espacios',
        intro: 'Completa con el verbo de movimiento y el transporte.',
        type: 'dual',
        items: [
          { scene: 'Ahora en metro', lines: [['', '"Voy en metro al centro ahora": Я [[0]] в центр [[1]].']], blanks: [{ options: ['иду', 'еду', 'хожу', 'езжу'], answer: 'еду', explain: 'Еду = voy en vehículo ahora (yo). ехать → еду.' }, { options: ['пешком', 'на метро', 'в метро', 'метро'], answer: 'на метро', explain: 'На метро = en metro. В + acusativo para destino; на + dativo para transporte.' }] },
          { scene: 'Habitual a pie', lines: [['', '"Siempre voy a la escuela a pie": Я всегда [[0]] в школу [[1]].']], blanks: [{ options: ['иду', 'еду', 'хожу', 'езжу'], answer: 'хожу', explain: 'Хожу = voy habitualmente a pie (yo). ходить → хожу.' }, { options: ['на автобусе', 'на метро', 'пешком', 'на машине'], answer: 'пешком', explain: 'Пешком = a pie. Хожу пешком = voy caminando.' }] },
          { scene: 'Pregunta de movimiento', lines: [['', '"¿Adónde vas ahora (en vehículo)?": Куда ты [[0]] [[1]]?']], blanks: [{ options: ['идёшь', 'едешь', 'ходишь', 'ездишь'], answer: 'едешь', explain: 'Едешь = vas en vehículo ahora (тебе/ты). ехать → едешь.' }, { options: ['пешком', 'сейчас', 'вчера', 'часто'], answer: 'сейчас', explain: 'Сейчас = ahora. Куда ты едешь сейчас? = ¿Adónde vas ahora?' }] },
          { scene: 'Habitual + destino', lines: [['', '"Zhanna va habitualmente a la academia en carro": Жанна [[0]] в академию [[1]].']], blanks: [{ options: ['идёт', 'едет', 'ходит', 'ездит'], answer: 'ездит', explain: 'Ездит = va habitualmente en vehículo (она). ездить → ездит.' }, { options: ['пешком', 'на метро', 'на машине', 'на работу'], answer: 'на машине', explain: 'На машине = en carro. Transporte: на + vehículo.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Текст — глаголы движения',
        tag: 'Opciones',
        intro: 'Elige el verbo de movimiento correcto en cada espacio.',
        type: 'guidedText',
        scene: 'La rutina de David y su viaje a Moscú',
        text: 'Каждый день Дэвид [[0]] в академию на метро. (Va habitualmente en metro) Сегодня он [[1]] в Москву на самолёте. (Hoy va a Moscú en avión) Его студенты [[2]] в академию пешком каждый день. (Van a pie habitualmente) Сейчас Жанна [[3]] домой на такси. (Ahora va a casa en taxi) Дэвид [[4]] на конференции много. (Va a conferencias habitualmente en vehículo)',
        blanks: [
          { options: ['идёт', 'едет', 'ходит', 'ездит'], answer: 'ездит', explain: 'Ездит = va habitualmente en vehículo (он). Cada día en metro = habitual + vehículo.' },
          { options: ['ходит', 'ездит', 'идёт', 'едет'], answer: 'едет', explain: 'Едет = va ahora en vehículo (он). Сегодня (hoy) = ahora, único viaje.' },
          { options: ['едут', 'ездят', 'идут', 'ходят'], answer: 'ходят', explain: 'Ходят = van habitualmente a pie (они). Los estudiantes cada día a pie.' },
          { options: ['идёт', 'ходит', 'ездит', 'едет'], answer: 'едет', explain: 'Едет = va ahora en vehículo (она). Сейчас (ahora) + en taxi = unidireccional en vehículo.' },
          { options: ['идёт', 'ходит', 'едет', 'ездит'], answer: 'ездит', explain: 'Ездит = va habitualmente en vehículo (он). Много = a menudo, implica hábito.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Свободный текст — движение',
        tag: 'Sin opciones',
        intro: 'Escribe el verbo de movimiento correcto sin opciones.',
        type: 'freeText',
        scene: 'Describiendo rutinas y viajes',
        text: '1. "Voy a la tienda a pie ahora" (я, иду/еду): Я [[0]] в магазин пешком. 2. "Ella va en metro habitualmente" (она, ездит/ходит): Она [[1]] на метро. 3. "¿Adónde vas (en vehículo, ahora)?" (ты): Куда ты [[2]]? 4. "Vamos a pie habitualmente" (мы, ходим/ездим): Мы [[3]] пешком. 5. "Ellos van ahora en tren" (они): Они [[4]] на поезде.',
        blanks: [
          { answer: 'иду', accepted: ['иду'], explain: 'Иду = voy a pie, ahora (я). идти → иду.' },
          { answer: 'ездит', accepted: ['ездит'], explain: 'Ездит = va habitualmente en vehículo (она). ездить → ездит.' },
          { answer: 'едешь', accepted: ['едешь'], explain: 'Едешь = vas en vehículo ahora (ты). ехать → едешь.' },
          { answer: 'ходим', accepted: ['ходим'], explain: 'Ходим = vamos habitualmente a pie (мы). ходить → ходим.' },
          { answer: 'едут', accepted: ['едут'], explain: 'Едут = van ahora en vehículo (они). ехать → едут.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Производство предложений',
        tag: 'Producción',
        intro: 'Construye frases completas con verbos de movimiento.',
        type: 'write',
        items: [
          { scene: 'Ahora vs habitual', prompt: 'Traduce al ruso: "Normalmente voy al trabajo en metro. Hoy voy en taxi porque llueve." (на работу = al trabajo, сегодня = hoy, потому что = porque, идёт дождь = llueve)', answer: 'Обычно я езжу на работу на метро. Сегодня я еду на такси, потому что идёт дождь.', accepted: ['езжу', 'еду'], explain: 'Обычно (normalmente) + езжу (habitual vehículo). Сегодня + еду (ahora, vehículo). La situación cambia el verbo.' },
          { scene: 'A pie vs vehículo', prompt: 'Traduce al ruso: "Mi madre va al mercado a pie, pero mi padre siempre va en carro." (мать = madre, отец = padre, рынок = mercado, всегда = siempre)', answer: 'Моя мать ходит на рынок пешком, но мой отец всегда ездит на машине.', accepted: ['ходит', 'ездит'], explain: 'Ходит (habitual a pie) vs ездит (habitual en vehículo). Contraste perfecto de los dos pares.' },
          { scene: 'Preguntar y responder', prompt: 'Traduce: "¿Adónde vas ahora? — Voy a la academia a pie. ¿Y tú? — Voy en metro."', answer: 'Куда ты идёшь сейчас? — Я иду в академию пешком. А ты? — Я еду на метро.', accepted: ['идёшь', 'иду', 'еду'], explain: 'Куда + идёшь (ты, a pie, ahora). Иду (yo, a pie, ahora). Еду (yo, metro, ahora).' },
          { scene: 'Narración habitual', prompt: 'Traduce: "David va a la universidad todos los días en metro. Los estudiantes van a pie porque viven cerca." (университет = universidad, каждый день = cada día, живут = viven, рядом = cerca)', answer: 'Дэвид каждый день ездит в университет на метро. Студенты ходят пешком, потому что живут рядом.', accepted: ['ездит', 'ходят'], explain: 'Ездит (habitual + metro) vs ходят (habitual + a pie). Caída completa de los cuatro verbos.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Коммуникативная миссия',
        tag: 'Producción',
        intro: 'Usa los verbos de movimiento en contextos comunicativos reales.',
        type: 'write',
        items: [
          { scene: 'Describe tu rutina de transporte', prompt: 'Escribe un párrafo (4-5 frases) sobre cómo te mueves normalmente: a la escuela/trabajo, al supermercado, y un viaje especial que hiciste. Usa los 4 verbos: идти, ехать, ходить, ездить.', answer: 'Каждый день я езжу на работу на метро. Иногда я хожу в магазин пешком. Вчера я ехал в аэропорт на такси. Обычно я езжу на велосипеде в выходные. Сегодня я иду в парк.', accepted: ['езжу', 'хожу', 'ехал', 'иду'], explain: 'Езжу (habitual+metro), хожу (habitual+pie), ехал (viaje único pasado), иду (ahora a pie). Los 4 verbos en contexto.' },
          { scene: 'Conversación sobre transporte', prompt: 'Escribe un diálogo de 4 turnos sobre cómo ir a un lugar: una persona pregunta cómo llegar, la otra explica (combinando opciones: a pie, en metro, en autobús). Usa Куда ты едешь/идёшь? y distintos verbos.', answer: 'А: Куда ты едешь? Б: Я еду в центр на метро. А: Ты всегда ездишь на метро? Б: Нет, иногда я хожу пешком. Сегодня я еду, потому что далеко.', accepted: ['едешь', 'еду', 'ездишь', 'хожу'], explain: 'Куда + едешь (pregunta). Еду (respuesta ahora). Ездишь (habitual pregunta). Хожу (habitual pie). Natural y variado.' },
        ],
      },
    ],
  },
}

export default topic
