import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbos-movimiento-prefijados-b1',
  order: '01',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'B1',
  title: 'Verbos de Movimiento con Prefijos en Ruso B1',
  shortTitle: 'Verbos de Movimiento con Prefijos',
  metaTitle: 'Verbos de movimiento con prefijos en ruso B1',
  description:
    'Los verbos de movimiento con prefijos son una de las estructuras más productivas del ruso. Al añadir prefijos como при-, у-, вы-, в-, пере-, под-, от- y за- a los verbos de movimiento base, se crean pares aspectuales perfectamente regulares que expresan dirección, llegada, salida y tránsito. Con este sistema dominas decenas de verbos a la vez.',
  lead: 'Aprende a combinar prefijos direccionales con los verbos идти/ходить y ехать/ездить para expresar llegada, salida, entrada, cruce y más.',
  outcomes: [
    'Usa los prefijos при-, у-, вы-, в- con verbos de movimiento para expresar dirección',
    'Forma pares aspectuales prefijados: приходить/прийти, уходить/уйти',
    'Distingue entre formas unidireccionales y multidireccionales con prefijo',
    'Construye oraciones de movimiento con destino, origen y tránsito explícitos',
  ],

  guide: {
    goal: 'Usar verbos de movimiento con prefijos para describir desplazamientos con dirección específica — llegada, salida, entrada, cruce — en contextos cotidianos.',
    model: 'Он пришёл домой в семь. / Она вышла из офиса. / Мы перешли через улицу.',
    formula: 'Prefijo + ходить/идти (o ездить/ехать) → par НСВ/СВ con dirección específica',
    decisions: [
      'при- (llegada hacia aquí): приходить/прийти — "Он приходит каждый день" / "Он пришёл вчера"',
      'у- (alejamiento, salida definitiva): уходить/уйти — "Она ушла час назад"',
      'вы- (salida desde un espacio cerrado): выходить/выйти — "Выйди из комнаты"',
      'в-/вo- (entrada a un espacio): входить/войти — "Войдите, пожалуйста"',
      'пере- (cruce de un límite): переходить/перейти — "Перейди дорогу на светофоре"',
      'под- (acercamiento): подходить/подойти — "Подойди ко мне"',
    ],
    table: [
      ['Prefijo', 'НСВ (imperfectivo)', 'СВ (perfectivo)'],
      ['при-', 'приходить / приезжать', 'прийти / приехать'],
      ['у-', 'уходить / уезжать', 'уйти / уехать'],
      ['вы-', 'выходить / выезжать', 'выйти / выехать'],
      ['в-', 'входить / въезжать', 'войти / въехать'],
      ['пере-', 'переходить / переезжать', 'перейти / переехать'],
    ],
    mistakes: [
      '"Он пришёл в магазин вчера" ✓ — usar СВ (прийти) para un evento único y completado en el pasado.',
      '"Он каждый день приходит" ✓ — usar НСВ (приходить) para acción repetida o habitual.',
      '"Выйди из дома" ✓ (не "выйди с дома") — вы- rige из + genitivo, no с.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo funcionan los prefijos con los verbos de movimiento?',
      paragraphs: [
        'En ruso, los verbos de movimiento base como идти (ir a pie, unidireccional) y ходить (ir a pie, multidireccional/habitual) adquieren significados de dirección muy precisos cuando se les añade un prefijo. El prefijo при- añade el significado de "llegada", у- de "alejamiento", вы- de "salida de un espacio", в- de "entrada en un espacio", etc.',
        'Lo más útil de este sistema es que todos los verbos prefijados forman pares aspectuales completamente regulares: la forma НСВ (imperfectiva) viene de -ходить/-ездить y la forma СВ (perfectiva) de -йти/-ехать. Una vez que aprendes los prefijos, puedes construir decenas de verbos.',
      ],
    },
    {
      heading: '¿Cuáles son los ocho prefijos de movimiento más importantes?',
      paragraphs: [
        'При- expresa llegada al punto de referencia: Он пришёл домой (On prishyól domóy) — "Él llegó a casa". У- expresa alejamiento o partida: Она ушла (Aná ushla) — "Ella se fue". Вы- indica salida de un espacio cerrado: Выйди из класса (Výjdi iz klássa) — "Sal del aula".',
        'В- expresa entrada en un espacio: Войдите (Vaydíte) — "Entren (usted/ustedes)". Пере- indica cruce de un límite o umbral: Переходить дорогу (Perekhadít darógu) — "Cruzar la calle". Под- indica acercamiento: Подойди сюда (Padaydi syudá) — "Acércate aquí". От- indica alejamiento desde un punto: Отойди от окна (Ataydi at akná) — "Aléjate de la ventana".',
      ],
      table: [
        ['Prefijo', 'Significado', 'Ejemplo con traducción'],
        ['при-', 'llegada', 'Он пришёл — Él llegó'],
        ['у-', 'partida', 'Она ушла — Ella se fue'],
        ['вы-', 'salida de espacio', 'Выйди! — ¡Sal!'],
        ['в-', 'entrada a espacio', 'Войдите — Entren'],
        ['пере-', 'cruce', 'Перейди улицу — Cruza la calle'],
        ['под-', 'acercamiento', 'Подойди — Acércate'],
      ],
    },
    {
      heading: 'Diferencia entre пешком (a pie) y на транспорте (en transporte)',
      paragraphs: [
        'Para movimiento a pie se usan los verbos basados en -ходить/-йти: приходить/прийти, уходить/уйти. Para movimiento en vehículo se usan los basados en -ездить/-ехать: приезжать/приехать, уезжать/уехать.',
        'Esta distinción es importante en B1: "Он пришёл на работу" (llegó al trabajo caminando) versus "Он приехал на работу" (llegó al trabajo en transporte). En contextos urbanos cotidianos, ambas formas son frecuentes.',
      ],
    },
    {
      heading: '¿Cómo se relacionan aspecto y prefijos (НСВ vs СВ)?',
      paragraphs: [
        'Con los verbos de movimiento prefijados, la elección de aspecto sigue las reglas generales: НСВ para acciones habituales, repetidas o en proceso; СВ para eventos únicos, completados o con resultado claro.',
        'Каждое утро он приходит в 9 (каждое — НСВ). Вчера он пришёл в 10 (вчера, evento único — СВ). La combinación prefijo + aspecto da toda la precisión que el ruso necesita para ubicar el movimiento en el espacio y en el tiempo.',
      ],
    },
    {
      heading: 'Errores frecuentes de hispanohablantes',
      paragraphs: [
        'El error más común es mezclar las preposiciones de dirección: вы- rige из + genitivo (выйти из магазина), в- rige в + acusativo (войти в магазин). No se puede decir *"выйти в магазин".',
        'Otro error frecuente es usar el НСВ para eventos únicos pasados: "Вчера он приходил" sugiere que llegó y luego se fue (viaje de ida y vuelta mental), mientras que "Вчера он пришёл" simplemente reporta su llegada. Esta distinción sutil es clave en B1.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Verbos de movimiento con prefijos direccionales — pares aspectuales НСВ/СВ en contexto cotidiano.',
    graphicPrompt: 'Diagrama de flechas mostrando dirección del movimiento: llegada, salida, entrada, cruce.',
    scene: [
      ['Он пришёл домой в семь часов. (On prishyól damóy v syem chasóv.)', 'Él llegó a casa a las siete.'],
      ['Она ушла из офиса рано. (Aná ushla iz ofísa ráno.)', 'Ella salió de la oficina temprano.'],
      ['Войдите, пожалуйста! (Vaydíte, pozháluista!)', '¡Entren, por favor!'],
      ['Перейди дорогу на светофоре. (Pereydí darógu na svetafóre.)', 'Cruza la calle en el semáforo.'],
      ['Подойди ко мне. (Padaydi ka mné.)', 'Acércate a mí.'],
      ['Он уехал в Москву вчера. (On uyékhal v Maskvu fchera.)', 'Él se fue a Moscú ayer.'],
      ['Выйди из комнаты! (Výjdi iz kómnaty!)', '¡Sal del cuarto!'],
      ['Мы переехали в новый город. (My pereékhali v nóvy górat.)', 'Nos mudamos a una ciudad nueva.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['приходить', 'прийти', 'уходить', 'уйти', 'выходить', 'выйти', 'входить', 'войти', 'переходить', 'перейти'],
    reviewFocus: ['prefijos direccionales', 'pares aspectuales', 'preposiciones con cada prefijo'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce el prefijo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el verbo prefijado correcto según el contexto de dirección.',
        type: 'choice',
        items: [
          {
            scene: 'Llegando a casa',
            lines: [['', 'Он ___ домой поздно вечером. (Él llegó a casa tarde en la noche.)']],
            options: ['пришёл', 'ушёл', 'вышел', 'перешёл'],
            answer: 'пришёл',
            explain: 'При- expresa llegada al punto de referencia. "Прийти" — llegar. "Пришёл" es la forma pasada СВ.',
          },
          {
            scene: 'Saliendo del trabajo',
            lines: [['', 'Она ___ из офиса в шесть часов. (Ella salió de la oficina a las seis.)']],
            options: ['вышла', 'пришла', 'перешла', 'подошла'],
            answer: 'вышла',
            explain: 'Вы- expresa salida de un espacio cerrado. "Выйти из офиса" — salir de la oficina.',
          },
          {
            scene: 'Entrando al edificio',
            lines: [['', '___, пожалуйста, и садитесь. (Entren, por favor, y siéntense.)']],
            options: ['Войдите', 'Выйдите', 'Придите', 'Уйдите'],
            answer: 'Войдите',
            explain: 'В- expresa entrada a un espacio. "Войти" — entrar. Imperativo plural/formal: "Войдите".',
          },
          {
            scene: 'Cruzando la calle',
            lines: [['', 'Нельзя ___ улицу на красный свет. (No se puede cruzar la calle en rojo.)']],
            options: ['переходить', 'приходить', 'выходить', 'уходить'],
            answer: 'переходить',
            explain: 'Пере- expresa cruce de un límite. "Переходить улицу" — cruzar la calle (НСВ, acción habitual/regla).',
          },
          {
            scene: 'Amigo que se fue',
            lines: [['Диалог', '— Где Иван? (¿Dónde está Iván?)'], ['', '— Он ___ домой час назад. (Se fue a casa hace una hora.)']],
            options: ['ушёл', 'пришёл', 'вышел', 'подошёл'],
            answer: 'ушёл',
            explain: 'У- expresa alejamiento o partida. "Уйти" — irse, marcharse. СВ pasado: "ушёл".',
          },
          {
            scene: 'Acercándose al mostrador',
            lines: [['', '___ к кассе, пожалуйста. (Acérquese a la caja, por favor.)']],
            options: ['Подойдите', 'Войдите', 'Выйдите', 'Перейдите'],
            answer: 'Подойдите',
            explain: 'Под- expresa acercamiento a un punto. "Подойти к кассе" — acercarse a la caja.',
          },
          {
            scene: 'Rutina diaria',
            lines: [['', 'Каждый день он ___ на работу пешком. (Cada día él va al trabajo a pie / llega caminando.)']],
            options: ['приходит', 'приходил', 'пришёл', 'уходит'],
            answer: 'приходит',
            explain: 'Acción habitual ("cada día") → НСВ: "приходить". Presente imperfectivo: "приходит".',
          },
          {
            scene: 'Moverse de ciudad',
            lines: [['', 'Они ___ в Санкт-Петербург в прошлом году. (Ellos se mudaron a San Petersburgo el año pasado.)']],
            options: ['переехали', 'приехали', 'уехали', 'выехали'],
            answer: 'переехали',
            explain: '"Переехать" con el sentido de mudanza — cruzar de un lugar de residencia a otro. СВ plural pasado: "переехали".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Movimiento con dos verbos',
        tag: '2 espacios',
        intro: 'Completa cada oración con dos verbos de movimiento prefijados correctos.',
        type: 'dual',
        items: [
          {
            scene: 'Mañana en el trabajo',
            lines: [['', 'Антон [[0]] в офис в девять, а Марина [[1]] из дома только в десять.']],
            blanks: [
              { options: ['пришёл', 'ушёл', 'вышел', 'перешёл'], answer: 'пришёл', explain: '"Прийти" — llegar (при- = llegada). Antón llegó a la oficina.' },
              { options: ['вышла', 'пришла', 'ушла', 'перешла'], answer: 'вышла', explain: '"Выйти из дома" — salir de casa. Вы- indica salida de un espacio.' },
            ],
          },
          {
            scene: 'Cruzando el parque',
            lines: [['', 'Мы [[0]] через парк и [[1]] к фонтану.']],
            blanks: [
              { options: ['перешли', 'вышли', 'ушли', 'пришли'], answer: 'перешли', explain: '"Перейти через парк" — cruzar el parque. Пере- + через para cruzar algo.' },
              { options: ['подошли', 'вошли', 'перешли', 'ушли'], answer: 'подошли', explain: '"Подойти к фонтану" — acercarse a la fuente. Под- + к + dativo.' },
            ],
          },
          {
            scene: 'En el metro',
            lines: [['', 'Поезд [[0]] на станцию, и пассажиры [[1]] в вагоны.']],
            blanks: [
              { options: ['пришёл', 'ушёл', 'отошёл', 'перешёл'], answer: 'пришёл', explain: '"Поезд пришёл" — el tren llegó. При- marca la llegada del tren a la estación.' },
              { options: ['вошли', 'вышли', 'перешли', 'ушли'], answer: 'вошли', explain: '"Войти в вагоны" — entrar a los vagones. В- + в + acusativo.' },
            ],
          },
          {
            scene: 'Fin de la reunión',
            lines: [['', 'После собрания все [[0]] из конференц-зала и [[1]] к лифтам.']],
            blanks: [
              { options: ['вышли', 'вошли', 'пришли', 'перешли'], answer: 'вышли', explain: '"Выйти из зала" — salir del salón. Вы- + из + genitivo.' },
              { options: ['подошли', 'перешли', 'ушли', 'вышли'], answer: 'подошли', explain: '"Подойти к лифтам" — acercarse a los ascensores. Под- + к + dativo.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un día en la ciudad',
        tag: 'Texto guiado',
        intro: 'Elige el verbo de movimiento prefijado correcto para completar la historia.',
        type: 'guidedText',
        scene: 'Una persona describe su día de trabajo en Moscú.',
        text: 'Сегодня я [[0]] из дома в восемь утра. Я [[1]] к остановке автобуса и подождал. Когда автобус остановился, я [[2]] в него и поехал на работу. На остановке у офиса я [[3]] из автобуса. Потом я [[4]] через дорогу и [[5]] в здание. Мой коллега уже [[6]] к своему рабочему месту.',
        blanks: [
          { options: ['вышел', 'пришёл', 'ушёл', 'подошёл'], answer: 'вышел', explain: '"Выйти из дома" — salir de casa. Вы- + из + genitivo.' },
          { options: ['подошёл', 'пришёл', 'перешёл', 'вошёл'], answer: 'подошёл', explain: '"Подойти к остановке" — acercarse a la parada. Под- + к + dativo.' },
          { options: ['вошёл', 'вышел', 'ушёл', 'перешёл'], answer: 'вошёл', explain: '"Войти в автобус" — entrar al autobús. В- + в + acusativo.' },
          { options: ['вышел', 'пришёл', 'ушёл', 'подошёл'], answer: 'вышел', explain: '"Выйти из автобуса" — bajar/salir del autobús.' },
          { options: ['перешёл', 'переходил', 'вышел', 'подошёл'], answer: 'перешёл', explain: '"Перейти дорогу" — cruzar la calle. СВ para acción única completada.' },
          { options: ['вошёл', 'выошёл', 'пришёл', 'ушёл'], answer: 'вошёл', explain: '"Войти в здание" — entrar al edificio.' },
          { options: ['подошёл', 'пришёл', 'переходил', 'выходил'], answer: 'подошёл', explain: '"Подойти к рабочему месту" — acercarse al puesto de trabajo.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe el verbo de movimiento prefijado correcto en la forma adecuada.',
        type: 'freeText',
        scene: 'Completa la descripción de movimientos con el verbo correcto.',
        text: 'Вчера вечером дети [[0]] домой из школы в три часа. Потом они [[1]] в свои комнаты делать уроки. Мама [[2]] из кухни и позвала их ужинать. Все [[3]] к столу и сели. После ужина папа [[4]] погулять.',
        blanks: [
          { answer: 'пришли', accepted: ['пришли', 'пришли домой'], explain: '"Прийти домой" — llegar a casa. СВ plural pasado: "пришли".' },
          { answer: 'ушли', accepted: ['ушли', 'пошли'], explain: '"Уйти в комнаты" — irse a los cuartos. СВ plural pasado: "ушли".' },
          { answer: 'вышла', accepted: ['вышла'], explain: '"Выйти из кухни" — salir de la cocina. СВ femenino singular pasado: "вышла".' },
          { answer: 'подошли', accepted: ['подошли', 'пришли'], explain: '"Подойти к столу" — acercarse a la mesa. СВ plural pasado: "подошли".' },
          { answer: 'ушёл', accepted: ['ушёл', 'вышел'], explain: '"Уйти погулять" — salir a pasear. СВ masculino singular pasado: "ушёл".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción dirigida',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando verbos de movimiento con prefijos.',
        type: 'write',
        items: [
          {
            scene: 'Tu llegada hoy',
            prompt: 'Describe a qué hora llegaste hoy a algún lugar (usa "прийти" o "приехать" en pasado).',
            answer: 'Я пришёл на работу в девять утра.',
            accepted: ['пришёл', 'пришла', 'приехал', 'приехала', 'пришли'],
            explain: 'Ejemplo: "Я приехал в офис на метро." / "Я пришла в университет в десять."',
          },
          {
            scene: 'Alguien que se fue',
            prompt: 'Di que alguien salió de algún lugar hoy (usa "уйти" o "уехать" en pasado).',
            answer: 'Мой друг ушёл домой после обеда.',
            accepted: ['ушёл', 'ушла', 'уехал', 'уехала', 'ушли', 'уехали'],
            explain: 'Ejemplo: "Коллега уехала в командировку." / "Дети ушли в школу утром."',
          },
          {
            scene: 'Cruzando algo',
            prompt: 'Describe que cruzaste una calle, un parque o un río (usa "перейти" o "переехать").',
            answer: 'Мы перешли дорогу на светофоре.',
            accepted: ['перешли', 'перешёл', 'перешла', 'переехали', 'переехал'],
            explain: 'Ejemplo: "Я перешёл через мост." / "Мы переехали через реку на пароме."',
          },
          {
            scene: 'Acercándose',
            prompt: 'Describe que te acercaste a alguien o algo (usa "подойти" en pasado).',
            answer: 'Я подошла к преподавателю после урока.',
            accepted: ['подошёл', 'подошла', 'подошли'],
            explain: 'Ejemplo: "Он подошёл к окну и посмотрел на улицу." / "Мы подошли к кассе."',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu itinerario de hoy',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones describiendo tus movimientos del día de hoy, usando diferentes verbos de movimiento con prefijos.',
        type: 'write',
        items: [
          {
            scene: 'Tu mañana',
            prompt: 'Escribe qué movimiento hiciste al salir de casa esta mañana (usa вышти/уйти/выехать).',
            answer: 'Я вышел из дома в восемь часов и поехал на работу.',
            accepted: ['вышел', 'вышла', 'ушёл', 'ушла', 'выехал', 'выехала'],
            explain: 'Recuerda: вы- + из + genitivo para salir de un lugar cerrado.',
          },
          {
            scene: 'Tu llegada',
            prompt: 'Escribe a dónde llegaste hoy y a qué hora (usa прийти/приехать).',
            answer: 'Я приехал на работу в девять утра.',
            accepted: ['пришёл', 'пришла', 'приехал', 'приехала'],
            explain: 'При- para la llegada. Recuerda: прийти (a pie), приехать (en transporte).',
          },
          {
            scene: 'Un movimiento más',
            prompt: 'Escribe otro movimiento: entrar a algún lugar, cruzar algo, acercarte a alguien (войти/перейти/подойти).',
            answer: 'Потом я вошёл в кафе и заказал кофе.',
            accepted: ['вошёл', 'вошла', 'перешёл', 'перешла', 'подошёл', 'подошла', 'вошли', 'перешли', 'подошли'],
            explain: 'Usa в- + в + acusativo (войти в...), пере- + через/acusativo, или под- + к + dativo.',
          },
        ],
      },
    ],
  },
}

export default topic
