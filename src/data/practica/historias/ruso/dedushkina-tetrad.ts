// ─── Дедушкина тетрадь — Historia B1 en ruso ──────────────────────────────────
// Adaptación de «The Grandfather's Ledger» al ruso. Nivel B1. Quien reclama los
// regalos es el ABUELO (Виктор) en las tres capas: narrador, transcripciones y
// preguntas.
//
// DICCIONARIO Y DECLINACIONES: las claves llevan la forma exacta que sale en el
// texto. Si cambias una frase, revisa su clave.
//
// AUDIO: /audio/historias/ruso/dedushkina-tetrad/{a,b}.mp3
// a con voz de mujer (Оля), b con voz de hombre mayor (Виктор).

import type { Historia, StoryQuestion as Question } from '../types';

const DICT: Record<string, string> = {
  дедушка: 'abuelo',
  дедушкина: 'del abuelo (adjetivo posesivo)',
  бабушка: 'abuela',
  дед: 'abuelo (coloquial)',
  внук: 'nieto',
  внука: 'del nieto / al nieto',
  внуку: 'para el nieto',
  невестка: 'nuera',
  свёкор: 'suegro (padre del marido)',
  дочь: 'hija',
  сын: 'hijo',
  тетрадь: 'cuaderno / libreta',
  таблицу: 'la tabla (acusativo)',
  таблица: 'tabla / hoja de cálculo',
  список: 'lista',
  чеки: 'recibos / tiques',
  чеков: 'de recibos (genitivo plural)',
  коляску: 'el cochecito (acusativo)',
  коляска: 'cochecito de bebé',
  кроватку: 'la cuna (acusativo)',
  комод: 'cómoda',
  мебель: 'muebles',
  игрушки: 'juguetes',
  учёбу: 'los estudios (acusativo)',
  накопления: 'ahorros',
  беременна: 'embarazada',
  беременности: 'del embarazo',
  имущество: 'bienes / patrimonio',
  вложил: 'invirtió / metió (dinero)',
  вложения: 'inversiones',
  щедрый: 'generoso',
  щедрость: 'generosidad',
  жадный: 'codicioso / avaro',
  злодей: 'villano / el malo de la historia',
  чудовище: 'monstruo',
  инвентаризацию: 'el inventario (acusativo)',
  складе: 'en el almacén',
  склад: 'almacén / bodega',
  организованный: 'organizado',
  бумаги: 'papeles / documentos',
  бумагами: 'con papeles',
  отношение: 'actitud / trato',
  благодарности: 'de gratitud',
  благодарность: 'gratitud',
  передавать: 'pasar / transmitir (a otro)',
  передать: 'pasar a otro',
  поколения: 'generaciones',
  поколение: 'generación',
  отказалась: 'ella se negó',
  отказ: 'negativa',
  шокирован: 'impactado / conmocionado',
  растерялся: 'se quedó desconcertado',
  защищаться: 'defenderse',
  конфликт: 'conflicto',
  намерение: 'intención',
  заранее: 'de antemano / con premeditación',
  доказательство: 'prueba / evidencia',
  ожидания: 'expectativas',
  условие: 'condición',
  подарки: 'regalos',
  подарков: 'de regalos',
  одолжил: 'prestó',
  справедливо: 'es justo',
  справедливость: 'justicia',
  безумие: 'locura',
  преступление: 'delito / crimen',
  оправдание: 'excusa / justificación',
  извините: 'perdón / disculpe',
  ирония: 'ironía',
  сарказм: 'sarcasmo',
  риторический: 'retórico',
  тон: 'tono',
  оказывается: 'resulta que / al parecer',
  вдруг: 'de repente',
  честно: 'sinceramente / honestamente',
  финансово: 'económicamente',
  пришёл: 'vino / llegó',
  смеются: 'se ríen / se burlan',
  правда: 'verdad / de verdad',
};

const NARRATOR_PARAGRAPHS = [
  'Три года назад, когда родился маленький Миша, больше всех в семье потратил его дедушка Виктор.',
  'Он купил почти всё: дорогую коляску, всю мебель в детскую, дорогие игрушки — и даже открыл накопления на учёбу.',
  'Все думали, что он просто щедрый человек.',
  'Потом дочь Виктора, Катя, сказала, что беременна.',
  'Вдруг Виктор начал говорить, что часть вещей Миши можно «поделить» с новым ребёнком.',
  'Через несколько недель он пришёл к сыну и невестке с таблицей, где был записан каждый дорогой подарок, который он когда-либо купил.',
  'Он попросил вернуть вещей на несколько сотен тысяч рублей.',
  'Невестка отказалась.',
  'Теперь обе стороны рассказывают очень разные версии того, что произошло.',
];

const A_PARAGRAPHS = [
  'Слушай, у меня до сих пор руки трясутся.',
  'Ты же помнишь, как отец Саши всё покупал, когда родился Миша? Коляску, мебель в детскую, все эти дорогие подарки, которые он обязательно хотел купить сам.',
  'Так вот объясни мне, почему этот человек вчера пришёл ко мне домой с распечатанной таблицей.',
  'С таблицей.',
  'Я не шучу.',
  'Он сел за мой кухонный стол и начал проходить по пунктам, как будто делал инвентаризацию на складе.',
  'Коляска. Кроватка. Комод. Даже деньги, которые он положил Мише на учёбу.',
  'И потом говорит, совершенно серьёзно: «Мне кажется, будет справедливо, если часть этого теперь пойдёт ребёнку Кати».',
  'А я сижу и думаю... справедливо для кого?',
  'Миша же пользуется этими вещами. Каждый день.',
  'Это не коробки, которые стоят на складе. Это его вещи.',
  'Потом он начинает про то, что вложил много денег и что семейное имущество должно оставаться в семье.',
  'Семейное имущество?',
  'Виктор Петрович, это ваш внук, а не портфель недвижимости.',
  'И тут он достаёт чеки.',
  'Чеки.',
  'Трёхлетней давности.',
  'Кто хранит чеки от детских подарков, если не рассчитывает однажды забрать их обратно?',
  'Это было полное безумие.',
  'Хуже всего то, что он правда растерялся, когда я сказала нет.',
  'Он действительно ждал, что я отдам вещи своего ребёнка, потому что скоро будет другой внук.',
  'Клянусь: если бы он просто спросил, есть ли что-то, из чего Миша уже вырос, я бы с радостью отдала.',
  'Но приходить с бумагами и планом возврата?',
  'Нет уж.',
];

const B_PARAGRAPHS = [
  'Мне надо кому-то рассказать, как всё было на самом деле, потому что теперь я, оказывается, злодей.',
  'Три года назад, когда родился Миша, я потратил целое состояние, чтобы помочь этим детям.',
  'Целое состояние.',
  'Не потому что меня кто-то заставил. Потому что я хотел, чтобы у моего внука было всё.',
  'Одна мебель в детскую стоила дороже моей первой машины.',
  'Я жаловался? Нет.',
  'Я хоть раз просил благодарности? Ни разу.',
  'Теперь моя дочь Катя ждёт первого ребёнка, и ей финансово очень тяжело.',
  'Вот я и подумал, что часть дорогих вещей, которыми уже почти не пользуются, можно передать дальше.',
  'Как в семьях делали из поколения в поколение.',
  'А Оля отреагировала так, будто я собираюсь ограбить банк.',
  'Я никогда не говорил, что хочу забрать всё обратно.',
  'Я сказал, что, может быть, мы могли бы обсудить, как поделить некоторые крупные вещи.',
  'Но в ту же секунду, как я упомянул коляску, она начала защищаться.',
  'И если честно?',
  'Мне было обидно даже не из-за вещей.',
  'А из-за отношения.',
  'Из-за полного отсутствия благодарности.',
  'Три года я смотрел, как они пользуются тем, за что заплатил я, и в тот момент, когда я предлагаю помочь другому внуку, я вдруг становлюсь жадным стариком.',
  'И все ещё смеются над моей таблицей.',
  'Извините, что я организованный.',
  'Когда речь о сотнях тысяч, записать всё — наверное, не самое безумное решение в мире.',
  'Я не пытался что-то отнять у Миши.',
  'Я пытался помочь Кате.',
  'Но в этой семье это, оказывается, теперь преступление.',
];

const NARRATOR_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: 'Рассказчик говорит, что Виктор купил «дорогую коляску» и открыл накопления на учёбу. Что показывает этот список?',
    opts: [
      'Он покупал недорогие практичные вещи',
      'Он тратил очень много, на дорогие вещи высокого класса',
      'Он предпочитал покупать б/у',
      'Он покупал только по скидке',
    ],
    correct: 1,
    explanation:
      'La lista sube de escalón en escalón: cochecito caro, muebles, juguetes y por fin unos ahorros para los estudios. No es una lista de regalos, es una lista de inversiones — y eso prepara todo lo que viene después.',
  },
  {
    type: 'Inferencia',
    q: 'Рассказчик использует слово «Вдруг», описывая перемену Виктора. Что это значит?',
    opts: [
      'Перемена была постепенной и давно ожидаемой',
      'Виктор всегда планировал забрать вещи обратно',
      'Перелом случился сразу после одного события: беременности дочери',
      'Катя сама попросила у Виктора эти вещи',
    ],
    correct: 2,
    explanation:
      '«Вдруг» contrasta con tres años de generosidad e implica que la motivación de Víktor cambió justo cuando su propia hija quedó embarazada — no poco a poco.',
  },
  {
    type: 'Comprensión',
    q: 'Что было записано в таблице Виктора?',
    opts: [
      'Список будущих покупок для нового ребёнка',
      'Каждый дорогой подарок, который он когда-либо купил',
      'Бюджет семьи на месяц',
      'Договор между Виктором и сыном',
    ],
    correct: 1,
    explanation:
      'El narrador dice: «с таблицей, где был записан каждый дорогой подарок, который он когда-либо купил».',
  },
  {
    type: 'Pensamiento crítico',
    q: '«Все думали, что он просто щедрый человек.» Что подсказывает слово «просто»?',
    opts: [
      'Виктор был точно щедрым, без скрытых мотивов',
      'За этой щедростью, возможно, стояло что-то ещё, чего тогда не заметили',
      'Семья всегда знала, что Виктор ставит условия',
      'Виктор открыто пытался контролировать семью',
    ],
    correct: 1,
    explanation:
      '«Просто» sugiere que las apariencias engañaban: deja abierta la posibilidad de que aquella generosidad llevara condiciones que nadie vio hasta ahora.',
  },
];

const A_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: 'Оля сравнивает визит свёкра с «инвентаризацией на складе». Что делает это сравнение?',
    opts: [
      'Метафора — он правда двигал её мебель',
      'Сравнение — он показан холодным и деловым, подарки для него как товар, который можно вернуть',
      'Гипербола — она просто преувеличивает ради шутки',
      'Олицетворение — она наделяет таблицу человеческими чертами',
    ],
    correct: 1,
    explanation:
      'La comparación le quita a la visita todo el calor familiar. Equipararla a un recuento de almacén muestra que Olia vivió la escena como una transacción, no como una conversación entre familia.',
  },
  {
    type: 'Inferencia',
    q: '«Кто хранит чеки от детских подарков?» Что подразумевает этот вопрос?',
    opts: [
      'Что все должны хранить чеки',
      'Что свёкор просто очень аккуратный человек',
      'Что чеки доказывают: он с самого начала рассчитывал их забрать',
      'Что Оля потеряла свои чеки',
    ],
    correct: 2,
    explanation:
      'Una pregunta retórica no espera respuesta: dicta un veredicto. Olia la usa para convertir los recibos en prueba de premeditación, no en simple orden.',
  },
  {
    type: 'Tono',
    q: 'Как лучше всего описать тон голосового сообщения Оли?',
    opts: [
      'Спокойный и аналитический',
      'Эмоциональный, возмущённый и недоверчивый',
      'Грустный и полный сожаления',
      'Официальный и деловой',
    ],
    correct: 1,
    explanation:
      '«У меня до сих пор руки трясутся», las frases de una sola palabra («С таблицей.», «Чеки.») y el sarcasmo («а не портфель недвижимости») marcan indignación emocional, no análisis.',
  },
  {
    type: 'Comprensión',
    q: 'По словам Оли, какая просьба свёкра БЫЛА БЫ нормальной?',
    opts: [
      'Прийти с подробной таблицей всех подарков',
      'Сразу потребовать назад коляску и кроватку',
      'Спросить, есть ли что-то, из чего Миша уже вырос',
      'Прислать официальное письмо',
    ],
    correct: 2,
    explanation:
      'Ella lo dice: «если бы он просто спросил, есть ли что-то, из чего Миша уже вырос, я бы с радостью отдала». El CÓMO pesó tanto como el QUÉ.',
  },
  {
    type: 'Registro',
    q: '«Виктор Петрович, это ваш внук, а не портфель недвижимости.» Что делает Оля?',
    opts: [
      'Серьёзно говорит о его бизнесе с недвижимостью',
      'Использует иронию и вдруг переходит на имя-отчество, чтобы подчеркнуть его деловое отношение к семье',
      'Вежливо соглашается с его точкой зрения',
      'Дословно цитирует таблицу',
    ],
    correct: 1,
    explanation:
      'Dos golpes a la vez: el vocabulario financiero («портфель недвижимости») se burla de su forma de tratar a la familia como cartera de inversión, y el cambio repentino al nombre y patronímico convierte la cortesía en distancia.',
  },
];

const B_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: 'Виктор говорит, что вещи можно «передать дальше». На какую традицию он ссылается?',
    opts: [
      'Вернуть товар в магазин и получить деньги',
      'Семейный обычай передавать вещи от одного члена семьи к другому из поколения в поколение',
      'Официальную процедуру наследования',
      'Отдать вещи на благотворительность',
    ],
    correct: 1,
    explanation:
      '«Передать дальше» invoca una costumbre familiar, no una devolución. Víktor presenta su petición como práctica cultural, no como exigencia económica.',
  },
  {
    type: 'Comprensión',
    q: 'По словам Виктора, что именно он попросил — в отличие от версии Оли?',
    opts: [
      'Каждую вещь из списка, вернуть немедленно',
      'Только деньги с накоплений на учёбу',
      'Разговор о том, чтобы поделить некоторые крупные вещи',
      'Письменные извинения от Оли',
    ],
    correct: 2,
    explanation:
      'Víktor dice: «Я никогда не говорил, что хочу забрать всё обратно. Я сказал, что, может быть, мы могли бы обсудить…». Contradice directamente el relato de Olia.',
  },
  {
    type: 'Inferencia',
    q: '«Мне было обидно даже не из-за вещей. А из-за отношения.» Что показывает эта фраза?',
    opts: [
      'Он только делает вид, что вещи ему безразличны',
      'Он чувствует, что его не уважают, несмотря на годы щедрости',
      'Он хочет вытеснить Олю из семьи',
      'Он жалеет, что купил подарки',
    ],
    correct: 1,
    explanation:
      'Al separar «вещи» de «отношение», Víktor deja claro que la herida emocional —sentirse desechado tras años de dar— le pesa más que el dinero.',
  },
  {
    type: 'Tono',
    q: '«Извините, что я организованный.» Какой тон у этой фразы?',
    opts: [
      'Настоящее раскаяние',
      'Саркастическая защита — он не считает, что сделал что-то не так',
      'Растерянность: он не понимает, почему все злятся',
      'Академический и официальный регистр',
    ],
    correct: 1,
    explanation:
      'Es una no-disculpa: tiene forma de disculpa y contenido de reproche. Defiende su acto mientras insinúa que criticarle la tabla es ridículo.',
  },
  {
    type: 'Vocabulario',
    q: '«Теперь я, оказывается, злодей.» Что показывает слово «злодей»?',
    opts: [
      'Он полностью признаёт, что был неправ',
      'Он чувствует, что ему несправедливо дали роль плохого персонажа в чужой истории',
      'Он использует юридический термин',
      'Он ищет жалости через лесть',
    ],
    correct: 1,
    explanation:
      '«Злодей» es vocabulario de cuento, no de vida real. Víktor lo usa para decir que le han asignado un papel narrativo injusto: es un personaje en la historia que cuentan otros.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Síntesis',
    q: 'С каким фактом согласны ОБА — и Оля, и Виктор?',
    opts: [
      'Виктор хотел навсегда забрать все вещи',
      'Оля сама предложила поделиться',
      'Виктор пришёл с таблицей',
      'Катя лично просила эти вещи',
    ],
    correct: 2,
    explanation:
      'La tabla es el único dato objetivo que confirman las dos versiones. Todo lo demás —intención, tono, alcance— está en disputa.',
  },
  {
    type: 'Perspectiva',
    q: 'Рассказчик говорит, что Виктор «попросил вернуть вещей на несколько сотен тысяч». Виктор говорит, что «предложил обсудить». Что показывает эта разница?',
    opts: [
      'Рассказчик настроен против Виктора',
      'Между заявленным намерением Виктора и тем, как его просьбу восприняли, огромная разница',
      'Оля почти всё выдумала',
      'Рассказчик ошибся в фактах',
    ],
    correct: 1,
    explanation:
      'Intención frente a impacto. Víktor creía estar abriendo una conversación; Olia (y el narrador) lo vivieron como una exigencia. Esa distancia es el motor de todo el conflicto.',
  },
  {
    type: 'Pensamiento crítico',
    q: 'Какова самая точная КОРЕННАЯ причина этого конфликта?',
    opts: [
      'Жадность Виктора',
      'Неблагодарность Оли',
      'Когда подарки дарили, никто не обсудил, чего от этого ждут',
      'Решение Кати родить ребёнка',
    ],
    correct: 2,
    explanation:
      '¿Eran regalos o préstamos con condiciones? Que nadie fijara ese límite en su momento —y no la avaricia ni la ingratitud por separado— es la causa estructural de la disputa.',
  },
  {
    type: 'Inferencia',
    q: 'Оля говорит, что Виктор «правда растерялся», получив отказ. Что показывает эта реакция?',
    opts: [
      'Он изображал удивление как приём',
      'Он действительно не предполагал, что его просьбу сочтут неуместной',
      'Он знал, что она откажет, и проверял её',
      'Ему никогда в жизни ни в чём не отказывали',
    ],
    correct: 1,
    explanation:
      'El asombro genuino revela que Víktor opera con un conjunto de supuestos completamente distinto: no esperaba una negativa porque, dentro de su marco, su petición era razonable.',
  },
  {
    type: 'Registro',
    q: 'Виктор называет сына и невестку «эти дети». Что подсказывает такой выбор слов?',
    opts: [
      'Его сын и Оля правда дети',
      'Виктор видит себя старшим и опорой, а их — менее опытными людьми, которым он помог',
      'Виктор забыл их имена',
      'В русском это официальное уважительное выражение',
    ],
    correct: 1,
    explanation:
      'Llamarlos «эти дети» los infantiliza: los coloca como receptores de su dinero y su criterio, no como iguales. Refuerza en voz baja su sensación de autoridad.',
  },
];

const KEY_LANGUAGE = [
  { phrase: 'делать инвентаризацию', meaning: 'hacer recuento de existencias — aquí, aplicado a una familia' },
  { phrase: 'передать дальше', meaning: 'pasar algo a otro miembro de la familia, de generación en generación' },
  { phrase: 'риторический вопрос', meaning: 'pregunta que no espera respuesta: dicta un veredicto' },
  { phrase: 'Извините, что я…', meaning: 'no-disculpa: forma de disculpa, contenido de reproche' },
  { phrase: 'перейти на имя-отчество', meaning: 'pasar al nombre y patronímico de golpe: cortesía convertida en distancia' },
];

export const dedushkinaTetrad: Historia = {
  slug: 'dedushkina-tetrad',
  lang: 'ruso',
  icon: '🎙️',
  color: '#059669',
  level: 'B1',
  title: 'Дедушкина тетрадь',
  tagline: 'Lo pagó todo cuando nació el nieto. Tres años después llegó con la tabla impresa.',
  metaTitle: 'Дедушкина тетрадь — comprensión en ruso B1',
  metaDescription:
    
    
    'Lo pagó todo cuando nació el nieto. Tres años después llegó con la tabla impresa. Dos audios, transcripción y 19 preguntas en ruso B1.',
  intro:
    'Un conflicto de familia. Dos versiones. Tú decides quién tiene razón. Lee el relato del narrador, escucha las dos notas de voz y responde 19 preguntas de vocabulario, inferencia, tono y pensamiento crítico.',
  narrator: {
    paragraphs: NARRATOR_PARAGRAPHS,
    questions: NARRATOR_QS,
    tip: 'Fíjate en cómo se dirigen el uno al otro. Cuando la nuera pasa de golpe a «Виктор Петрович», el ruso no se está volviendo más amable: se está volviendo más frío. Ese salto de registro es medio ejercicio.',
  },
  voices: [
    {
      key: 'a',
      name: 'Оля',
      role: 'невестка',
      sex: 'female',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/ruso/dedushkina-tetrad/a.mp3',
      paragraphs: A_PARAGRAPHS,
      questions: A_QS,
      listenHint: 'Escucha con atención. Todavía no hay transcripción — concéntrate en lo que puedas entender.',
      transcriptHint: 'las marcas y ves su traducción. Salen declinadas, como suenan en la frase.',
      write1Prompt: 'Sin mirar ninguna transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Оля.',
      write1Hint: 'No te preocupes por que salga perfecto: es una primera impresión. Escribe en español o en ruso.',
      write2Prompt: 'Ahora escríbelo otra vez — esta vez puedes entrar en más detalle.',
    },
    {
      key: 'b',
      name: 'Виктор',
      role: 'свёкор',
      sex: 'male',
      color: '#7c3aed',
      audioSrc: '/audio/historias/ruso/dedushkina-tetrad/b.mp3',
      paragraphs: B_PARAGRAPHS,
      questions: B_QS,
      listenHint: 'Escucha primero sin transcripción. Esta es la otra mitad del conflicto.',
      transcriptHint: 'compara la versión de Виктор con la de Оля: ¿en qué coinciden? ¿Dónde se contradicen?',
      write1Prompt: 'Sin la transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Виктор.',
      write1Hint: '¿Qué dice él que pasó de verdad? Escribe en español o en ruso.',
      write2Prompt: 'Ahora escribe otra vez lo que entendiste desde la perspectiva de Виктор.',
    },
  ],
  finalQuestions: FINAL_QS,
  finalIntro: [
    'Estas preguntas te piden sostener las dos versiones a la vez y pensar con calma qué pasó, por qué, y cómo el idioma que elige cada uno moldea lo que creemos que pasó.',
  ],
  dict: DICT,
  keyLanguage: KEY_LANGUAGE,
  discussion: {
    question: 'Después de oír a los dos: ¿quién tiene el argumento más fuerte, y por qué?',
    note: 'No hay una única respuesta correcta. Lo que importa es sostener tu posición con evidencia del texto: palabras y frases concretas. Esa es la destreza que separa un B1 sólido de un B1 de examen.',
  },
  ui: 'es',
};

export default dedushkinaTetrad;
