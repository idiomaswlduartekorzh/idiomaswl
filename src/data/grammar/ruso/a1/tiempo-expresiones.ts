import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'tiempo-expresiones',
  order: '16',
  color: '#1a2ecc',
  category: 'Лексика',
  level: 'A1',
  title: 'Expresiones de tiempo en ruso A1: сейчас, вчера, завтра, часто',
  shortTitle: 'Expresiones de tiempo',
  metaTitle: 'Expresiones de tiempo ruso A1 — сейчас, вчера, завтра, каждый день, часто',
  description:
    'Las expresiones de tiempo en ruso permiten situar las acciones en el tiempo sin necesidad de conocer los tiempos verbales complejos. Сейчас (ahora), вчера (ayer), завтра (mañana), каждый день (cada día), часто (a menudo). Su posición es flexible, aunque van típicamente al inicio o al final de la oración.',
  lead: 'Сейчас, вчера, завтра, каждый день — con estas expresiones de tiempo ubicas cualquier acción en ruso. Son indispensables para comunicarse desde el primer día.',
  outcomes: [
    'Usar las expresiones temporales más frecuentes del ruso',
    'Posicionar las expresiones de tiempo en la oración',
    'Combinar expresiones temporales con verbos en distintos tiempos',
  ],
  guide: {
    goal: 'Situar acciones en el tiempo usando expresiones temporales básicas del ruso.',
    model: '[Expresión tiempo] + [sujeto] + [verbo] / [sujeto] + [verbo] + [expresión tiempo]',
    formula: 'сейчас/вчера/завтра + глагол | часто/всегда/иногда + глагол (habitual)',
    decisions: [
      '¿Acción que pasa ahora? → сейчас (Я сейчас работаю — Estoy trabajando ahora)',
      '¿Acción pasada? → вчера/на прошлой неделе (Вчера я был в Москве)',
      '¿Acción futura? → завтра/на следующей неделе (Завтра мы идём в кино)',
      '¿Frecuencia habitual? → всегда/часто/иногда/никогда (Я всегда пью кофе утром)',
    ],
    table: [
      ['Expresión', 'Significado', 'Ejemplo'],
      ['сейчас', 'ahora / en este momento', 'Я сейчас читаю (Estoy leyendo ahora)'],
      ['вчера', 'ayer', 'Вчера я был дома (Ayer estuve en casa)'],
      ['завтра', 'mañana', 'Завтра я иду в школу (Mañana voy a la escuela)'],
      ['каждый день', 'cada día', 'Каждый день я работаю (Trabajo cada día)'],
      ['часто / иногда / никогда', 'a menudo / a veces / nunca', 'Я часто смотрю фильмы'],
    ],
    mistakes: [
      '"Сейчас" puede ir al inicio o al final: Я сейчас иду = Сейчас я иду. Ambas correctas.',
      '"Вчера" necesita verbo en pasado: Вчера я читал (no "вчера я читаю"). El tiempo verbal debe concordar.',
      '"Завтра" puede ir con presente (informal) o futuro: Завтра я иду (presente con valor futuro) o Завтра я пойду.',
      '"Никогда" + negación: Я никогда не смотрю TV. Ruso usa doble negación: никогда + не.',
    ],
  },
  seo: [
    {
      heading: '¿Cómo expresar el tiempo en ruso sin saber todos los tiempos verbales?',
      paragraphs: [
        'Una estrategia excelente para A1 es usar expresiones temporales + presente del verbo, y dejar que el contexto aclare cuándo ocurre la acción. Завтра я иду в кино (Mañana voy al cine) usa el presente рigo con valor futuro — completamente natural en ruso coloquial.',
        'Para el pasado, sí necesitas la forma pasada del verbo, pero es bastante regular: студент → студент + л (masc), студентка → студентка + ла (fem), мы → мы + ли. Вчера я читал (Ayer leí). Вчера она читала (Ayer ella leyó).',
      ],
      table: [
        ['Expresión', 'Ruso', 'Ejemplo completo'],
        ['Ahora', 'сейчас', 'Я сейчас пишу (Estoy escribiendo ahora)'],
        ['Ayer', 'вчера', 'Вчера я ел пиццу (Ayer comí pizza)'],
        ['Mañana', 'завтра', 'Завтра я учусь (Mañana estudio)'],
        ['Siempre', 'всегда', 'Я всегда пью чай (Siempre tomo té)'],
        ['A veces', 'иногда', 'Иногда я хожу в кино (A veces voy al cine)'],
        ['Nunca', 'никогда', 'Я никогда не курю (Nunca fumo)'],
      ],
    },
    {
      heading: '¿Cómo se dicen los días de la semana en ruso?',
      paragraphs: [
        'Los días: понедельник (lunes), вторник (martes), среда (miércoles), четверг (jueves), пятница (viernes), суббота (sábado), воскресенье (domingo). Se escriben en minúscula, igual que en español. Para decir "el lunes" (¿qué día?) se usa в + acusativo: в понедельник, в субботу, во вторник.',
        'La trampa para el hispanohablante es que среда y пятница son femeninos y cambian a в среду / в пятницу en acusativo, mientras que los días masculinos no cambian su forma (в понедельник). Para "los lunes" (habitual) se usa по + dativo: по понедельникам.',
      ],
    },
    {
      heading: '¿Cómo se expresa la hora en ruso?',
      paragraphs: [
        'Para "¿qué hora es?" (Который час? / Сколько времени?) la forma sencilla de A1 usa el número + час/часа/часов: час (la 1), два часа (las 2), пять часов (las 5) —de nuevo el patrón 1 / 2-4 / 5+ del genitivo—. Para "¿a qué hora?" se usa в + número: в час (a la 1), в три часа (a las 3), в семь часов (a las 7).',
        'La trampa para el hispanohablante es la concordancia del número con час: час (1), часа (2-4), часов (5-12). En A1 basta con la hora "en punto"; las medias y los cuartos se ven más adelante.',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'Temporal adverbs allow A1 students to communicate past and future without mastering aspect or full conjugation tables. Encourage using вчера + past form and завтра + present (colloquial future). This unlocks early communication.',
    graphicPrompt:
      'Timeline with Russian expressions marked: прошлой неделе (izq) → вчера → сейчас (centro) → завтра → следующей неделе (der). Below: frequency bar with всегда→часто→иногда→никогда. Blue Russian theme.',
    scene: [
      ['сейчас', 'Я сейчас учу русский (seychás) — Estoy aprendiendo ruso ahora'],
      ['вчера', 'Вчера я смотрел фильм (vchyerá) — Ayer vi una película'],
      ['завтра', 'Завтра у нас урок (závtra) — Mañana tenemos clase'],
      ['каждый день', 'Каждый день я занимаюсь (kázhdiy) — Estudio cada día'],
      ['всегда', 'Я всегда пью кофе (vsyegdá) — Siempre tomo café'],
      ['никогда не', 'Я никогда не курю (nikogdá) — Nunca fumo'],
    ],
    learnerModes: ['recognition', 'transformation', 'gap-fill', 'production'],
    practiceVerbs: ['читать', 'смотреть', 'работать', 'учить', 'идти'],
    reviewFocus: ['сейчас/вчера/завтра (posición flexible)', 'никогда + не (doble negación)', 'вчера + pasado concordado'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Временные выражения',
        tag: 'Opción múltiple',
        intro: 'Identifica la expresión de tiempo correcta.',
        type: 'choice',
        items: [
          { scene: 'Ahora', lines: [['', '"Estoy estudiando ahora": Я ___ учу русский.']], options: ['вчера', 'завтра', 'сейчас', 'иногда'], answer: 'сейчас', explain: 'Сейчас = ahora. Я сейчас учу русский = Estoy estudiando ruso ahora.' },
          { scene: 'Ayer + pasado', lines: [['', '"Ayer vi una película": ___ я смотрел фильм.']], options: ['Сейчас', 'Завтра', 'Вчера', 'Иногда'], answer: 'Вчера', explain: 'Вчера = ayer. Смотрел = forma pasada de смотреть (vi). Вчера я смотрел фильм.' },
          { scene: 'Mañana', lines: [['', '"Mañana tenemos clase": ___ у нас урок.']], options: ['Вчера', 'Сейчас', 'Завтра', 'Никогда'], answer: 'Завтра', explain: 'Завтра = mañana. Завтра у нас урок = Mañana tenemos clase.' },
          { scene: 'Frecuencia — a menudo', lines: [['', '"A menudo voy al cine": Я ___ хожу в кино.']], options: ['никогда', 'вчера', 'завтра', 'часто'], answer: 'часто', explain: 'Часто = a menudo / frecuentemente. Я часто хожу в кино.' },
          { scene: 'Nunca + negación', lines: [['', '"Nunca fumo": Я никогда ___ курю.']], options: ['да', 'не', 'уже', 'ещё'], answer: 'не', explain: 'Никогда + не = nunca. Doble negación obligatoria en ruso. Никогда не курю.' },
          { scene: 'Cada día', lines: [['', '"Estudio ruso cada día": Я ___ учу русский.']], options: ['иногда', 'каждый день', 'вчера', 'никогда'], answer: 'каждый день', explain: 'Каждый день = cada día. Я каждый день учу русский = Estudio ruso cada día.' },
          { scene: 'Иногда', lines: [['', '¿Qué significa "Я иногда смотрю TV"?']], options: ['Nunca veo TV', 'Siempre veo TV', 'A veces veo TV', 'Ayer vi TV'], answer: 'A veces veo TV', explain: 'Иногда = a veces / en ocasiones. Иногда veo = a veces veo.' },
          { scene: 'Уже / ещё', lines: [['', '¿Qué significa "Я уже знаю"?']], options: ['Todavía sé', 'Ya sé', 'No sé todavía', 'Pronto sabré'], answer: 'Ya sé', explain: 'Уже = ya (implica que algo ha ocurrido). Я уже знаю = Ya sé / Ya lo sé.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Время — два пробела',
        tag: '2 espacios',
        intro: 'Completa con la expresión temporal y el verbo correcto.',
        type: 'dual',
        items: [
          { scene: 'Вчера + pasado', lines: [['', '"Ayer estuve en casa": [[0]] я [[1]] дома.']], blanks: [{ options: ['Сейчас', 'Завтра', 'Вчера', 'Иногда'], answer: 'Вчера', explain: 'Вчера = ayer. Necesita verbo en pasado.' }, { options: ['буду', 'есть', 'был', 'иду'], answer: 'был', explain: 'Был = estuve/estaba (pasado masc de быть). Вчера я был дома.' }] },
          { scene: 'Сейчас + presente', lines: [['', '"Ahora Gael trabaja": [[0]] Дэвид [[1]].']], blanks: [{ options: ['Вчера', 'Завтра', 'Сейчас', 'Иногда'], answer: 'Сейчас', explain: 'Сейчас = ahora. Verbo en presente.' }, { options: ['работал', 'будет работать', 'работает', 'работал'], answer: 'работает', explain: 'Работает = trabaja (presente, 3ª sing). Сейчас Дэвид работает.' }] },
          { scene: 'Никогда не', lines: [['', '"Clara nunca llega tarde": Жанна [[0]] [[1]] опаздывает.']], blanks: [{ options: ['иногда', 'часто', 'никогда', 'всегда'], answer: 'никогда', explain: 'Никогда = nunca. Con doble negación обязательно: никогда не.' }, { options: ['да', 'уже', 'не', 'ещё'], answer: 'не', explain: 'Никогда + не = nunca. Жанна никогда не опаздывает = Clara nunca llega tarde.' }] },
          { scene: 'Каждый день + habitual', lines: [['', '"Cada día Leo el periódico": [[0]] я [[1]] газету.']], blanks: [{ options: ['Вчера', 'Завтра', 'Каждый день', 'Сейчас'], answer: 'Каждый день', explain: 'Каждый день = cada día.' }, { options: ['читал', 'прочитаю', 'читаю', 'читать'], answer: 'читаю', explain: 'Читаю = leo (presente habitual, 1ª sing). Каждый день я читаю газету.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Текст — время в контексте',
        tag: 'Opciones',
        intro: 'Elige la expresión temporal correcta en cada espacio.',
        type: 'guidedText',
        scene: 'Rutina de Gael — español, ruso y coreano',
        text: 'Дэвид [[0]] преподаёт в академии. (Cada día enseña.) [[1]] он был в Москве на конференции. (Ayer estuvo en Moscú.) [[2]] он возвращается в Буcaramangu. (Mañana regresa.) Он [[3]] изучает новые языки. (Siempre estudia nuevos idiomas.) Он [[4]] не опаздывает на уроки. (Nunca llega tarde.)',
        blanks: [
          { options: ['вчера', 'завтра', 'сейчас', 'каждый день'], answer: 'каждый день', explain: 'Каждый день = cada día. Habitual presente.' },
          { options: ['Каждый день', 'Завтра', 'Вчера', 'Сейчас'], answer: 'Вчера', explain: 'Вчера = ayer. Verb en pasado: был (estivo, masc).' },
          { options: ['Вчера', 'Сейчас', 'Каждый день', 'Завтра'], answer: 'Завтра', explain: 'Завтра = mañana. Futuro próximo.' },
          { options: ['никогда', 'иногда', 'вчера', 'всегда'], answer: 'всегда', explain: 'Всегда = siempre. Frequencia habitual total.' },
          { options: ['иногда', 'часто', 'никогда', 'всегда'], answer: 'никогда', explain: 'Никогда не = nunca. Doble negación en ruso.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Свободное письмо — время',
        tag: 'Sin opciones',
        intro: 'Escribe la expresión temporal correcta sin opciones.',
        type: 'freeText',
        scene: 'Describiendo acciones en el tiempo',
        text: '1. "Siempre tomo café": Я [[0]] пью кофе. 2. "Ayer estudié ruso": [[1]] я учил русский. 3. "Ahora estoy en casa": Я [[2]] дома. 4. "Nunca fumo": Я [[3]] не курю. 5. "Mañana voy al teatro": [[4]] я иду в театр.',
        blanks: [
          { answer: 'всегда', accepted: ['всегда'], explain: 'Всегда = siempre.' },
          { answer: 'Вчера', accepted: ['Вчера', 'вчера'], explain: 'Вчера = ayer. Con verbo en pasado (учил).' },
          { answer: 'сейчас', accepted: ['сейчас'], explain: 'Сейчас = ahora.' },
          { answer: 'никогда', accepted: ['никогда'], explain: 'Никогда + не = nunca. La ne ya está.' },
          { answer: 'Завтра', accepted: ['Завтра', 'завтра'], explain: 'Завтра = mañana.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Временные выражения в предложениях',
        tag: 'Producción',
        intro: 'Construye frases completas con expresiones de tiempo.',
        type: 'write',
        items: [
          { scene: 'Describir rutina', prompt: 'Traduce al ruso: "Siempre desayuno en casa. A veces voy al café. Nunca como carne." (завтракать = desayunar, кафе = café, есть мясо = comer carne)', answer: 'Я всегда завтракаю дома. Иногда я хожу в кафе. Я никогда не ем мясо.', accepted: ['всегда', 'иногда', 'никогда не'], explain: 'Всегда (siempre), иногда (a veces), никогда не (nunca + doble negación).' },
          { scene: 'Ayer, hoy, mañana', prompt: 'Traduce al ruso: "Ayer fui al cine. Hoy trabajo en casa. Mañana tengo clase de ruso." (фильм = película, работаю дома = trabajo en casa, урок = clase)', answer: 'Вчера я ходил в кино. Сегодня я работаю дома. Завтра у меня урок русского.', accepted: ['вчера', 'сегодня', 'завтра'], explain: 'Вчера + pasado (ходил). Сегодня + presente (работаю). Завтра + presente valor futuro (у меня урок).' },
          { scene: 'Frecuencia personal', prompt: 'Escribe 4 frases sobre tus hábitos usando: всегда, часто, иногда, никогда не.', answer: 'Я всегда пью кофе утром. Я часто хожу в магазин пешком. Иногда я смотрю русские фильмы. Я никогда не курю.', accepted: ['всегда', 'часто', 'иногда', 'никогда не'], explain: 'Los cuatro adverbios de frecuencia. Никогда + не es obligatorio.' },
          { scene: 'Уже и ещё', prompt: 'Traduce: "¿Ya hablas ruso? — Un poco ya. ¿Todavía estudias inglés? — Sí, todavía." (немного = un poco, ещё = todavía, уже = ya)', answer: 'Ты уже говоришь по-русски? — Немного уже. Ты ещё учишь английский? — Да, ещё.', accepted: ['уже', 'ещё'], explain: 'Уже = ya (algo que ha ocurrido). Ещё = todavía (algo que continúa). Par importante en A1.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Временная миссия',
        tag: 'Producción',
        intro: 'Habla de tu tiempo con expresiones temporales en ruso.',
        type: 'write',
        items: [
          { scene: 'Моя неделя (Mi semana)', prompt: 'Escribe un párrafo sobre tu semana usando: вчера, сегодня, завтра, каждый день, иногда. Al menos 5 frases.', answer: 'Каждый день я учу русский язык. Вчера я смотрел русский фильм. Сегодня я пишу упражнения. Завтра у меня урок с Дэвидом. Иногда я слушаю русскую музыку.', accepted: ['каждый день', 'вчера', 'сегодня', 'завтра', 'иногда'], explain: 'Пять временных выражений — cinco expresiones temporales en un texto coherente.' },
          { scene: 'Описание распорядка дня', prompt: 'Describe tu día típico en ruso usando expresiones de frecuencia (всегда, часто, иногда, никогда) y expresiones de tiempo (утром/вечером/ночью = por la mañana/tarde/noche).', answer: 'Утром я всегда пью кофе. Потом я часто читаю новости. Днём я работаю. Иногда вечером я смотрю фильмы. Я никогда не сплю днём.', accepted: ['всегда', 'часто', 'иногда', 'никогда'], explain: 'Комбинация времени дня + частоты — combinación de hora del día y frecuencia.' },
        ],
      },
    ],
  },
}

export default topic
