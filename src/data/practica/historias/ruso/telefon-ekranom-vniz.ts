// ─── Телефон экраном вниз — Historia B1 en ruso ───────────────────────────────
// Adaptación de «The Locked Phone» al ruso. Nivel B1: frases más cortas y léxico
// más controlado que en las versiones europeas occidentales.
//
// DICCIONARIO Y DECLINACIONES: el motor busca la palabra tal cual aparece en el
// texto, con su terminación. Por eso las claves de abajo llevan la forma exacta
// que sale (телефон, телефона, телефоном…). Si cambias una frase, revisa que su
// clave siga existiendo aquí.
//
// AUDIO: /audio/historias/ruso/telefon-ekranom-vniz/{a,b}.mp3
// a con voz de mujer (Аня), b con voz de hombre (Дима).

import type { Historia, StoryQuestion as Question } from '../types';

const DICT: Record<string, string> = {
  телефон: 'teléfono / celular',
  телефона: 'del teléfono (genitivo)',
  телефоном: 'con el teléfono (instrumental)',
  экран: 'pantalla',
  экраном: 'con la pantalla (instrumental)',
  экрана: 'de la pantalla',
  уведомление: 'notificación',
  сообщение: 'mensaje',
  сообщения: 'mensajes',
  сообщений: 'de mensajes (genitivo plural)',
  загорелся: 'se encendió (la pantalla)',
  загорается: 'se enciende',
  перевернул: 'lo dio la vuelta',
  перевернуть: 'dar la vuelta',
  вниз: 'hacia abajo',
  вверх: 'hacia arriba',
  стол: 'mesa',
  столе: 'en la mesa',
  ужин: 'cena',
  ужином: 'durante la cena',
  кухне: 'en la cocina',
  диване: 'en el sofá',
  фотографий: 'de fotos (genitivo plural)',
  собаки: 'del perro',
  геолокация: 'geolocalización / ubicación',
  работы: 'del trabajo',
  пятницу: 'el viernes',
  субботу: 'el sábado',
  весной: 'en primavera',
  вместе: 'juntos',
  заметила: 'ella se dio cuenta',
  шутку: 'en broma',
  полушутя: 'medio en broma',
  спросила: 'ella preguntó',
  отказался: 'él se negó',
  отказ: 'negativa / rechazo',
  отдавать: 'entregar / dar',
  отдать: 'entregar',
  предложил: 'él ofreció',
  ответить: 'responder',
  ответ: 'respuesta',
  личное: 'personal / privado',
  личная: 'personal / privada',
  границы: 'límites / fronteras',
  граница: 'límite',
  принципы: 'principios',
  доверять: 'confiar',
  доверие: 'confianza',
  подозрение: 'sospecha',
  подозрительный: 'sospechoso',
  виноват: 'culpable',
  невиновен: 'inocente',
  доказательство: 'prueba / evidencia',
  доказать: 'demostrar',
  расследуют: 'están investigando',
  скрывать: 'esconder / ocultar',
  скрываешь: 'escondes',
  ревность: 'celos',
  ревнивая: 'celosa',
  обидели: 'hicieron daño / ofendieron',
  спокойствие: 'tranquilidad',
  защищаться: 'defenderse',
  отношения: 'relación / relaciones',
  девушка: 'chica / novia',
  парень: 'chico / novio',
  бывший: 'ex (pareja anterior)',
  честно: 'sinceramente / honestamente',
  правда: 'verdad / de verdad',
  вдруг: 'de repente',
  никто: 'nadie',
  привычка: 'costumbre / hábito',
  привычку: 'la costumbre (acusativo)',
  проверка: 'comprobación / control',
  проверить: 'comprobar / revisar',
  нормой: 'la norma (instrumental)',
  правило: 'regla',
  врун: 'mentiroso',
  речь: 'discurso',
  извиняться: 'disculparse',
  извинения: 'disculpas',
  ирония: 'ironía',
  риторический: 'retórico',
  тон: 'tono',
  оказывается: 'resulta que / al parecer',
  перешла: 'crucé / traspasé (fem.)',
  сошла: 'me vuelvo (loca)',
};

const NARRATOR_PARAGRAPHS = [
  'Аня и Дима вместе уже два года. Прошлой весной они стали жить вместе.',
  'В пятницу за ужином телефон Димы загорелся на столе, и он молча перевернул его экраном вниз.',
  'Аня это заметила. В тот момент она ничего не сказала.',
  'Поздно вечером, полушутя, она спросила, можно ли посмотреть его телефон.',
  'Дима сказал нет.',
  'Он не злился. Он объяснил, что телефон — это личное и что он не отдаёт его никому, даже ей.',
  'Вместо этого он предложил ответить на любой вопрос.',
  'Аня ответила, что отказ — это уже ответ.',
  'В ту ночь оба спали плохо, а в субботу утром каждый уже рассказывал эту историю кому-то другому.',
];

const A_PARAGRAPHS = [
  'Мне надо сказать это вслух, иначе я сойду с ума.',
  'Ты же знаешь, как Дима обращается с телефоном. Он оставляет его везде. На диване, на кухне, экраном вверх. Никогда не было проблемой.',
  'И вот в пятницу мы ужинаем, его телефон загорается, и он его переворачивает.',
  'Экраном вниз.',
  'Даже не посмотрел на меня.',
  'А я целый час сидела и делала вид, что ничего не произошло.',
  'Потом я говорю, наполовину в шутку: «Покажи мне телефон».',
  'А он: «Нет».',
  'Не «конечно, держи». Не «а зачем?». Просто нет.',
  'Два года вместе, и ответ — нет?',
  'И тут он начинает про личное пространство, про принципы, про границы.',
  'Границы. Ну конечно.',
  'Я не собиралась читать его сообщения. Я хотела увидеть, как он его отдаёт. В этом и была вся проверка.',
  'Если тебе нечего скрывать, почему тебе так тяжело это показать?',
  'И чем дольше он объяснял, тем хуже это звучало.',
  'Никто не готовит речь о личных границах, если раньше об этом не думал.',
  'Он всё повторял: «Спроси меня о чём угодно, я скажу правду».',
  'Отлично. То есть я должна доверять тому, кто не даёт мне проверить.',
  'А теперь он ведёт себя так, будто виновата я.',
  'Оказывается, я «перешла границу».',
  'Я перешла границу.',
  'Честно, если бы он просто отдал телефон, я бы его, наверное, даже не открыла.',
  'Вот это и есть самое тяжёлое.',
];

const B_PARAGRAPHS = [
  'Слушай, я не знаю, как это рассказать и не выглядеть плохим.',
  'Вечер пятницы. Ужин. Телефон загорается, я переворачиваю его вниз.',
  'Я всегда кладу телефон экраном вниз, когда мы едим. Так с девятнадцати лет.',
  'Оказывается, теперь это доказательство.',
  'Потом она просит показать телефон.',
  'И слушай — в этом телефоне ничего нет. Вообще ничего.',
  'Рабочие чаты, мама, результаты матчей, сорок фотографий собаки.',
  'Но дело не в этом.',
  'Дело в том, что я не отдаю телефон, чтобы доказать, что я не врун.',
  'Потому что если ты сделал это один раз, дальше это становится нормой.',
  'В этом месяце телефон. В следующем — геолокация, а потом с кем я обедал.',
  'Я сказал ей: спрашивай что хочешь. Правда что угодно. Я отвечу.',
  'Ей не нужны были ответы. Ей нужен был телефон.',
  'И я её понимаю. Я знаю, что её раньше обидели, и её бывший был правда ужасным.',
  'Но я не он.',
  'Меня расследуют за то, что сделал другой человек.',
  'И теперь подозрительный — это я, потому что я сказал нет.',
  'Вот с этим я никак не могу справиться.',
  'Если сказать нет — уже значит быть виноватым, то правильного ответа просто не существует.',
  'Слушай, может быть, я мог бы сказать это мягче в тот момент. Может быть.',
  'Но я не буду извиняться за то, что у меня есть граница.',
];

const NARRATOR_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: 'Рассказчик говорит, что телефон «загорелся на столе». Что это значит?',
    opts: [
      'Телефон и правда начал гореть прямо на столе',
      'Экран включился сам, потому что пришло уведомление',
      'Дима сам взял телефон со стола и разблокировал его',
      'В тот вечер яркость экрана была очень высокой',
    ],
    correct: 1,
    explanation:
      'Aquí «загореться» significa que la pantalla se enciende sola, normalmente porque acaba de llegar una notificación. Ese es el detonante de toda la historia; el sentido de «arder» solo funcionaría con otro contexto.',
  },
  {
    type: 'Inferencia',
    q: 'Аня спрашивает «полушутя». Что показывает этот выбор слова?',
    opts: [
      'Аню содержимое телефона совсем не интересовало, весь вопрос был просто шуткой',
      'Аня хотела посмеяться над Димой и выбрала лёгкий тон, чтобы больнее его задеть',
      'Просьба была завёрнута в шутку, но за ней стояло настоящее намерение',
      'Аня уже смотрела его телефон раньше на этой неделе, поэтому спросила спокойно',
    ],
    correct: 2,
    explanation:
      '«Полушутя» deja a los dos margen para leer el momento de forma distinta: ella puede decir que solo bromeaba; él puede oír una acusación seria. Esa ambigüedad es donde empieza la pelea.',
  },
  {
    type: 'Comprensión',
    q: 'Что Дима предложил вместо того, чтобы отдать телефон?',
    opts: [
      'Удалить все сообщения прямо при ней',
      'Ответить на любой вопрос',
      'Показать ей только фотографии собаки',
      'Отдать телефон на следующий день',
    ],
    correct: 1,
    explanation:
      'El narrador dice: «он предложил ответить на любой вопрос». Dima separa dos cosas que Ania trata como una sola: dar información y dar acceso.',
  },
  {
    type: 'Pensamiento crítico',
    q: '«Отказ — это уже ответ.» Какое предположение стоит за этой фразой?',
    opts: [
      'Что человек, который отказывается, обычно просто устал или занят чем-то другим',
      'Что невиновный согласился бы, значит отказ сам по себе — доказательство вины',
      'Что Дима когда-то обещал делиться телефоном и теперь нарушает обещание',
      'Что отказывать в такой просьбе всегда невежливо и обидно',
    ],
    correct: 1,
    explanation:
      'Ania trata la negativa como prueba. La suposición escondida —«el inocente acepta»— deja a Dima sin ninguna forma posible de demostrar su inocencia, que es justo lo que él denuncia después.',
  },
];

const A_QS: Question[] = [
  {
    type: 'Comprensión',
    q: 'По словам Ани, что она на самом деле хотела, когда попросила телефон?',
    opts: [
      'Прочитать всю их переписку за последние два года',
      'Узнать, кто именно прислал ему то уведомление за ужином',
      'Увидеть, как он сам его отдаёт — просьба была проверкой',
      'Проверить историю геолокации в его телефоне за неделю',
    ],
    correct: 2,
    explanation:
      'Lo dice sin rodeos: «Я хотела увидеть, как он его отдаёт. В этом и была вся проверка.» Para ella contaba el gesto, no el contenido.',
  },
  {
    type: 'Inferencia',
    q: '«Если тебе нечего скрывать, почему тебе так тяжело?» В чём проблема этого вопроса?',
    opts: [
      'Он построен неправильно грамматически, и поэтому Дима просто не понял, о чём речь',
      'Он приравнивает отказ к вине, поэтому никакой ответ Диму не оправдает',
      'Он показывает, что Аня уже знает, что у него в телефоне, и только ждёт признания',
      'Он доказывает, что Ане не важны отношения, раз она готова так давить',
    ],
    correct: 1,
    explanation:
      'Una pregunta retórica no espera respuesta: dicta un veredicto. La lógica está cerrada — aceptar parece prueba, negarse parece culpa. Dima nombra la misma trampa desde su lado.',
  },
  {
    type: 'Tono',
    q: 'Как лучше всего описать тон голосового сообщения Ани?',
    opts: [
      'Спокойный и аналитический: она по порядку разбирает, что произошло в пятницу',
      'Официальный и деловой, будто она пересказывает случившееся чужому человеку',
      'Злой и саркастичный, но в рамке из сомнения и боли',
      'Лёгкий и весёлый от начала до конца: она сама называет всё это шуткой',
    ],
    correct: 2,
    explanation:
      'El sarcasmo es real («Границы. Ну конечно.»), pero mira el marco: abre con «иначе я сойду с ума» y cierra con «вот это и есть самое тяжёлое». La rabia está montada encima del dolor.',
  },
  {
    type: 'Vocabulario',
    q: '«Границы. Ну конечно.» Что делает Аня этой репликой?',
    opts: [
      'Вежливо соглашается, что границы в отношениях действительно важны, и закрывает тему',
      'Повторяет его же слово с сарказмом, чтобы отбросить его как отговорку',
      'Просит объяснить ей это слово, потому что раньше они так друг с другом не говорили',
      'Цитирует психолога, у которого они когда-то были вдвоём',
    ],
    correct: 1,
    explanation:
      'Devolver la palabra del otro suelta y añadir «ну конечно» es un recurso sarcástico habitual en ruso hablado: rechaza la palabra misma por falsa o pretenciosa.',
  },
  {
    type: 'Registro',
    q: 'Аня говорит: Оказывается, я «перешла границу». Зачем здесь кавычки?',
    opts: [
      'Она цитирует юридический текст, в котором выражение «перейти границу» имеет точный правовой смысл',
      'Она цитирует его слова, чтобы дистанцироваться и показать, что не принимает обвинение',
      'В русском языке это выражение всегда пишется в кавычках, таково правило орфографии',
      'Она не знает, как точно перевести это выражение, и потому ставит кавычки',
    ],
    correct: 1,
    explanation:
      'Son comillas de distancia. El «оказывается» marca que la frase es de otro, y al repetirla luego en seco —«Я перешла границу.»— deja claro que la acusación es de él, no suya, y que le parece absurda.',
  },
];

const B_QS: Question[] = [
  {
    type: 'Comprensión',
    q: 'Какую причину отказа называет Дима?',
    opts: [
      'В телефоне есть переписка, которую он не хочет показывать, и поэтому он тянет время и спорит',
      'Телефон принадлежит его компании, и по правилам он не имеет права показывать рабочие чаты',
      'Не то, что он что-то скрывает — а то, что одно согласие сделает проверки нормой',
      'Он забыл пароль от телефона и не хочет признаваться в этом при ней',
    ],
    correct: 2,
    explanation:
      'Insiste en que el contenido es irrelevante («в этом телефоне ничего нет») y construye su negativa alrededor de lo que el acto establecería hacia adelante, no de lo que revelaría.',
  },
  {
    type: 'Vocabulario',
    q: '«В этом месяце телефон. В следующем — геолокация.» Что это за приём?',
    opts: [
      'Скользкий склон — маленькая уступка подаётся как начало цепочки',
      'Точная цитата того, что требовала от него Аня',
      'Извинение за своё поведение в тот вечер',
      'Изложение фактов, которые уже успели случиться',
    ],
    correct: 0,
    explanation:
      'La pendiente resbaladiza («скользкий склон») predice una reacción en cadena a partir de un primer paso. Convence — pero fíjate en que describe un futuro que él imagina, no hechos ocurridos.',
  },
  {
    type: 'Inferencia',
    q: '«Меня расследуют за то, что сделал другой человек.» Что показывает эта фраза?',
    opts: [
      'Полицейские действительно ведут дело против Димы, и слово «расследуют» здесь буквальное',
      'Дима считает, что платит за поведение бывшего парня Ани',
      'Дима сделал ровно то же самое, что когда-то сделал её бывший парень',
      'Дима хочет, чтобы Аня сама поговорила с бывшим и закрыла тему',
    ],
    correct: 1,
    explanation:
      'La metáfora judicial («расследуют», «подозрительный», «доказательство») recorre todo su relato. Se retrata como acusado injustamente: pagando por una historia que no es la suya.',
  },
  {
    type: 'Pensamiento crítico',
    q: '«Если сказать нет — уже значит быть виноватым, то правильного ответа не существует.» На что указывает Дима?',
    opts: [
      'На то, что Аня никогда не задаёт ему прямых вопросов, а сразу требует доказательств',
      'На то, что просьбу нельзя пройти честно: любая реакция подтверждает подозрение',
      'На то, что он уже решил расстаться и ищет для этого удобный повод',
      'На то, что он просто не понял, о чём именно его спрашивают',
    ],
    correct: 1,
    explanation:
      'Está señalando una sospecha infalsable: ninguna prueba podría refutarla. Es el espejo exacto de la pregunta retórica de Ania — la misma lógica, vista desde el otro lado.',
  },
  {
    type: 'Tono',
    q: '«Может быть, я мог бы сказать это мягче. Может быть.» Что передаёт повтор «может быть»?',
    opts: [
      'Полное принятие ответственности: он признаёт, что говорил слишком резко, и хочет это исправить',
      'Полное непонимание того, что произошло: он до сих пор не видит, чем именно обидел Аню',
      'Минимальную уступку, которую он тут же забирает обратно — фразу в форме извинения, которая ничего не признаёт',
      'Настоящее раскаяние и намерение измениться: повтор здесь звучит как искреннее сомнение в собственной правоте',
    ],
    correct: 2,
    explanation:
      'El primer «может быть» abre una puerta; el segundo la cierra. Concede la forma, nunca la decisión — y la frase siguiente («Но я не буду извиняться…») lo confirma.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Síntesis',
    q: 'Какая деталь подтверждается ОБЕИМИ версиями?',
    opts: [
      'Диме в тот вечер написала другая женщина',
      'Аня уже успела прочитать часть его переписки в телефоне',
      'Дима перевернул телефон экраном вниз за ужином',
      'Дима извинился на следующее утро',
    ],
    correct: 2,
    explanation:
      'El celular boca abajo es el único hecho objetivo que cuentan los dos. Su significado está en disputa total: para ella es una reacción, para él una costumbre que tiene desde los diecinueve.',
  },
  {
    type: 'Perspectiva',
    q: 'Аня называет просьбу «проверкой». Дима говорит, что его «расследуют». Что показывает эта разница?',
    opts: [
      'Один из них намеренно врёт о том вечере, потому что две версии не совпадают',
      'Одно и то же действие получает противоположные значения в зависимости от того, символом чего его считают',
      'Ни один из них толком не помнит тот вечер, поэтому детали расходятся',
      'Дима использует более сложную лексику, чем Аня, и потому звучит убедительнее',
    ],
    correct: 1,
    explanation:
      'Intención frente a impacto. Ella buscaba un gesto pequeño de tranquilidad; él vivió una acusación que exigía pruebas. Ninguno inventa la noche: describen experiencias distintas de la misma noche.',
  },
  {
    type: 'Pensamiento crítico',
    q: 'Какова самая точная КОРЕННАЯ причина этого конфликта?',
    opts: [
      'Дима действительно что-то скрывает в телефоне, иначе он отдал бы его сразу',
      'Аня просто ревнивая, и любой отказ она читает как доказательство измены',
      'Пара никогда не договаривалась, что для них значит личное пространство, пока это не проверили',
      'Бывший парень Ани, из-за которого она теперь не может поверить ни одному мужчине, включая Диму',
    ],
    correct: 2,
    explanation:
      '¿Compartir el celular es normal en esta pareja o no? Nadie lo había decidido nunca. La regla se inventó en mitad de la discusión, y por eso los dos sienten que el otro la rompió.',
  },
  {
    type: 'Registro',
    q: 'Аня говорит, что Дима обвиняет её в том, что она «перешла границу». Дима говорит, что не будет извиняться «за то, что у него есть граница». Что показывает общая метафора?',
    opts: [
      'Они цитируют один и тот же фильм, поэтому у обоих в речи появляется одно и то же слово',
      'Оба используют один образ границы, чтобы защищать противоположные позиции — каждый считает себя тем, кто границу защищает',
      'Слово «граница» означает у них совершенно разные вещи, поэтому никакого общего образа здесь нет',
      'Это доказывает, что Дима копирует лексику Ани и повторяет за ней её же слова',
    ],
    correct: 1,
    explanation:
      'La misma imagen —una línea que no se cruza— hace trabajos opuestos en cada relato. En la mayoría de los conflictos de pareja, los dos creen estar defendiendo un límite, no atacándolo.',
  },
  {
    type: 'Inferencia',
    q: '«Если бы он просто отдал телефон, я бы его даже не открыла.» Что раскрывает эта фраза?',
    opts: [
      'Аня врала, когда говорила, что хочет посмотреть телефон, — на самом деле она всё решила про Диму ещё за ужином в ту пятницу',
      'Ане нужно было спокойствие, а не информация — и дать его могло только то самое действие, от которого Дима отказался из принципа',
      'Аня уже не раз открывала его телефон раньше и знает, что ничего интересного там нет',
      'Аня не знает пароль от его телефона, поэтому не смогла бы ничего прочитать, даже если бы он согласился',
    ],
    correct: 1,
    explanation:
      'Aquí está la trampa central de la historia. Ella necesitaba un gesto; él solo podía ver un precedente. No había ninguna versión de esa noche en la que los dos consiguieran lo que necesitaban.',
  },
];

const KEY_LANGUAGE = [
  { phrase: 'загореться', meaning: 'que la pantalla se encienda sola al llegar una notificación' },
  { phrase: 'экраном вниз', meaning: 'boca abajo — acto literal, significado simbólico' },
  { phrase: 'полушутя', meaning: 'medio en broma: deja abiertas dos lecturas del mismo acto' },
  { phrase: 'скользкий склон', meaning: 'argumento de que una concesión pequeña lleva a otras peores' },
  { phrase: 'Оказывается, я «…»', meaning: 'comillas de distancia: repites la acusación ajena sin asumirla' },
  { phrase: 'Может быть… Может быть.', meaning: 'no-disculpa: concede la forma y retira el fondo' },
];

export const telefonEkranomVniz: Historia = {
  slug: 'telefon-ekranom-vniz',
  lang: 'ruso',
  icon: '📵',
  color: '#be185d',
  level: 'B1',
  title: 'Телефон экраном вниз',
  tagline: 'Ella pidió ver el celular. Él dijo que no. Dos versiones del mismo viernes.',
  metaTitle: 'Телефон экраном вниз — comprensión en ruso B1',
  metaDescription:
    
    
    'Ella pidió ver el celular. Él dijo que no. Dos versiones del mismo viernes. Dos audios, transcripción y 19 preguntas en ruso B1.',
  intro:
    'Una pareja, un celular y dos versiones completamente distintas del mismo viernes por la noche. Lee el relato del narrador, escucha las dos notas de voz y responde 19 preguntas de vocabulario, inferencia, tono y pensamiento crítico.',
  narrator: {
    paragraphs: NARRATOR_PARAGRAPHS,
    questions: NARRATOR_QS,
    tip: 'Al hacer clic verás la palabra tal como aparece, con su terminación: «телефон», «телефона», «телефоном» son la misma palabra en tres casos distintos. Fíjate también en lo poco que pasó de verdad: nadie leyó ningún mensaje.',
  },
  voices: [
    {
      key: 'a',
      name: 'Аня',
      role: 'девушка',
      sex: 'female',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/ruso/telefon-ekranom-vniz/a.mp3',
      paragraphs: A_PARAGRAPHS,
      questions: A_QS,
      listenHint: 'Escucha con atención. Todavía no hay transcripción — concéntrate en lo que puedas entender.',
      transcriptHint: 'las marcas y ves su traducción. Salen declinadas, como suenan en la frase.',
      write1Prompt: 'Sin mirar ninguna transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Аня.',
      write1Hint: 'No te preocupes por que salga perfecto: es una primera impresión. Escribe en español o en ruso.',
      write2Prompt: 'Ahora escríbelo otra vez — esta vez puedes entrar en más detalle.',
    },
    {
      key: 'b',
      name: 'Дима',
      role: 'парень',
      sex: 'male',
      color: '#7c3aed',
      audioSrc: '/audio/historias/ruso/telefon-ekranom-vniz/b.mp3',
      paragraphs: B_PARAGRAPHS,
      questions: B_QS,
      listenHint: 'Escucha primero sin transcripción. Дима repite un detalle que Аня también menciona: búscalo.',
      transcriptHint: 'compara la versión de Дима con la de Аня: ¿qué detalles cuentan los dos? ¿Dónde se contradicen?',
      write1Prompt: 'Sin la transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Дима.',
      write1Hint: 'Esta es la otra cara de la historia. ¿Qué dice él que pasó? Escribe en español o en ruso.',
      write2Prompt: 'Ahora escribe otra vez lo que entendiste desde la perspectiva de Дима.',
    },
  ],
  finalQuestions: FINAL_QS,
  finalIntro: [
    'Ahora sabes algo que ninguno de los dos sabe: has oído las dos versiones. Estas preguntas te piden ponerlas una al lado de la otra — qué detalles sobreviven en las dos, dónde tiene razón cada uno y dónde tener razón no es lo mismo que ser justo.',
  ],
  dict: DICT,
  keyLanguage: KEY_LANGUAGE,
  discussion: {
    question: '¿Negarse es lo mismo que esconder? ¿Y puede una petición ser razonable y aun así injusta?',
    note: 'No hay una única respuesta correcta. Lo que se evalúa es defender tu posición con evidencia del texto: palabras y frases concretas de cada versión. Esa es la destreza que separa un B1 sólido de un B1 de examen.',
  },
  ui: 'es',
};

export default telefonEkranomVniz;
