// Lectura — Ruso B1. Diez lecturas.
//
// Fuente de verdad. Los JSON se generan con `node scripts/build-reading-exercises.mjs --write`.
//
// Criterio del nivel
// -----------------
// Las diez cubren los 20 temas de gramática de ruso B1 —dos por lectura— y cada una arrastra
// además un tema de A1 o de A2. Banda propia del ruso: 300-360 palabras.
//
// B1 estrena las dos formas que separan el ruso hablado del ruso escrito: los PARTICIPIOS
// (построенный, работающий, сделано) y los ДЕЕПРИЧАСТИЯ (говоря, начав, выйдя). Un ruso
// las usa poco al hablar y muchísimo al leer, así que son exactamente lo que hace falta para
// pasar de entender una conversación a entender un texto.
//
// El aspecto no desaparece en B1: se agrava. En A2 era pintar contra dejar pintado; en B1 es
// la diferencia entre una tarea que se puede terminar y una que no. La quinta lectura está
// construida sobre eso, con un año de listas de sábados como prueba.
//
// Sigue en pie el criterio del nivel anterior: `stressMarks: false` con la misma razón
// declarada, y revisión de hablante nativo pendiente —aquí más que nunca, por los participios.

const EARLIER = [
  // A1
  'adjetivos-concordancia', 'adjetivos-posesivos', 'alfabeto-cirilico', 'caso-acusativo',
  'caso-dativo-basico', 'caso-genitivo', 'caso-nominativo', 'futuro-byt',
  'genero-sustantivos', 'imperativo', 'negacion-ne', 'numeros', 'preguntas-vopros',
  'preposiciones-direccion', 'preposiciones-lugar-v-na', 'presente-verbos',
  'pronombres-personales', 'tiempo-expresiones', 'verbos-irregulares-basicos',
  'verbos-movimiento',
  // A2
  'acusativo-movimiento', 'adverbios-tiempo', 'aspecto-verbal', 'comparativos',
  'condicional', 'dativo-uso', 'futuro-imperfectivo', 'futuro-perfectivo',
  'genitivo-cantidad', 'instrumental-uso', 'oraciones-subordinadas', 'pasado-verbos',
  'plurales-irregulares', 'prepositivo-avanzado', 'pronombres-reflexivos',
  'pronombres-relativos', 'superlativos', 'verbos-prefijados',
]

const B1_GRAMMAR = [
  'adverbios-circunstanciales-b1', 'aspecto-perfectivo-imperfectivo-b1',
  'comparativos-superlativos-b1', 'condicional-subjuntivo-b1', 'dativo-b1',
  'deeprichastiya-b1', 'diminutivos-aumentativos-b1', 'discurso-indirecto-b1',
  'futuro-perfectivo-b1', 'genitivo-negacion-b1', 'impersonales-modales-b1',
  'instrumental-b1', 'oraciones-subordinadas-b1', 'participios-activos-b1',
  'participios-adjetivales-b1', 'participios-pasivos-b1', 'prefijos-verbos-b1',
  'preposiciones-casos-b1', 'verbos-movimiento-prefijados-b1', 'verbos-reflexivos-b1',
]

export default {
  language: 'ru',
  variant: 'ru-RU',
  cefr: 'B1',
  displayLabel: 'Ruso B1',
  tutorLocales: ['es'],
  status: 'draft',
  seriesId: 'ruso-b1-lectura-10',
  allowedGrammar: [...EARLIER, ...B1_GRAMMAR],
  disallowedGrammar: ['participios de registro literario raro', 'sintaxis nominal administrativa', 'arcaísmos', 'jerga profesional cerrada'],
  maxOutOfLevelVocabularyPercent: 6,
  inferenceBand: 'moderate',
  scriptSupport: { furigana: false, romanization: 'none', stressMarks: false, tokenizationMode: 'space' },
  targetCanDo:
    'Puedes seguir un texto ruso largo con participios y gerundios, distinguir lo que alguien afirma de lo que solo dice que intentará, y justificar una inferencia cruzando dos pasajes distintos.',
  assessor: 'Preflight editorial — falta confirmación de hablante nativo',
  assessedAt: '2026-08-18T00:00:00-05:00',
  levelNotes: 'Participios activos, pasivos y adjetivales; деепричастия de los dos aspectos; condicional con бы; impersonales modales. Acento sin marcar: pendiente con revisión nativa.',
  lastModified: '2026-08-18T00:00:00-05:00',
  review: {
    author: 'José David Duarte Silva',
    languageReviewer: 'Pendiente',
    pedagogyReviewer: 'Pendiente',
    reviewedAt: '2026-08-18T00:00:00-05:00',
    copyrightChecked: true,
    cultureChecked: true,
    aiAssisted: true,
    aiUseNote: 'Borrador asistido por IA. Falta revisión de lengua por hablante nativo de ruso —imprescindible por los participios y los gerundios— y revisión pedagógica antes de publicar.',
    languageDecision: 'pending',
    pedagogyDecision: 'pending',
  },

  exercises: [
    // ---------------------------------------------------------------- 1
    {
      slug: 'vsyo-chto-zdes-sdelano',
      title: 'Todo lo que aquí se hizo',
      genre: 'crónica de un edificio',
      topic: 'una segunda placa puesta por los vecinos',
      tags: ['ruso b1', 'lectura', 'participios pasivos', 'participios adjetivales'],
      intro: 'La placa oficial dice quién construyó la casa en 1957. Al lado hay otra, más grande, que dice todo lo demás. Lectura de ruso B1.',
      mission: 'Averigua qué frase de Tamara Petrovna hizo callar a todo el mundo.',
      seoTitle: 'Lectura de ruso B1: todo lo que aquí se hizo | WeLearn',
      seoDescription: 'Lee una crónica en ruso B1 y practica los participios pasivos y las formas cortas adjetivales. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['participios-pasivos-b1', 'participios-adjetivales-b1', 'pasado-verbos'],
      text: `Наш дом на улице Кирова построен в 1957 году. На стене у входа висит табличка, где написано: «Дом построен в 1957 году. Архитектор — В. П. Смирнов».

Табличка не врёт, но она рассказывает не всё.

Три года назад мы, жильцы, сделали свою табличку. Она висит рядом и намного больше. На ней написано вот что.

«Скамейка у второго подъезда сделана Николаем Ивановым в 1974 году».

«Детская площадка построена родителями в 1981 году. Песок привезён Виктором Гуровым».

«Полка для писем сделана из старой двери в 1993 году. Дверь найдена на чердаке».

«Дорожка к мусорным бакам залита цементом в 1998 году. Цемент куплен вскладчину».

«Деревья у дома посажены в 2003 году. Восемь из одиннадцати живы».

«Домофон установлен в 2011 году. Оплачен четырнадцатью квартирами из двадцати четырёх».

«Козырёк над первым подъездом переделан в 1988 году, потому что старый упал. Никто не пострадал».

«Стекло в двери вставлено одиннадцать раз. Последний раз — в 2019 году».

«Лампочка на четвёртом этаже меняется Тамарой Петровной с 1974 года».

Последняя строчка — единственная, написанная в настоящем времени. Мы обсуждали её долго и оставили как есть.

Идея была не моя. Идея была Тамары Петровны, которой сейчас восемьдесят шесть лет и которая живёт здесь с 1957 года. Она сказала одну фразу, и мы все замолчали: «Дом построен архитектором один раз. Всё остальное здесь сделано нами, и об этом не написано нигде».

Некоторые соседи были против. Они говорили, что это выглядит как жалоба на государство. Тамара Петровна ответила, что это не жалоба, а список.

Табличка сделана из железа. Её сварил сын Николая Иванова — того самого, который сделал скамейку в 1974 году. Он не взял денег.

Сейчас люди останавливаются у входа и читают. Иногда читают долго. Один раз я видел мужчину лет пятидесяти, который прочитал всё, постоял и спросил меня, где живёт Тамара Петровна. Он оказался внуком Виктора Гурова — того, который привёз песок.

Я живу здесь двенадцать лет и до этой таблички не знал, кто посадил деревья под моим окном. Теперь знаю. Их посадил человек, которого я никогда не видел.

Новую строчку мы добавим в этом году. Дверь в подвал наконец покрашена.`,
      objectives: [
        'Reconocer el participio pasivo pasado: построен, сделана, привезён, посажены.',
        'Distinguir la forma corta (сделано) de la larga (сделанный) y su función.',
        'Leer una lista y ver qué añade a un documento oficial.',
      ],
      vocabulary: [
        { surface: 'табличка', gloss: 'placa, letrero' },
        { surface: 'жильцы', lemma: 'жилец', gloss: 'vecinos, inquilinos' },
        { surface: 'подъезда', lemma: 'подъезд', gloss: 'portal, escalera del edificio' },
        { surface: 'песок', gloss: 'arena' },
        { surface: 'чердаке', lemma: 'чердак', gloss: 'desván' },
        { surface: 'вскладчину', gloss: 'a escote, entre todos' },
        { surface: 'сварил', lemma: 'сварить', gloss: 'soldó' },
        { surface: 'подвал', gloss: 'sótano' },
      ],
      culturalNote: 'En los bloques soviéticos casi todo lo que hay fuera del edificio —bancos, columpios, caminos, árboles— lo pusieron los propios vecinos por su cuenta a lo largo de décadas. No consta en ningún registro.',
      spanishSpeakerNote: 'El participio pasivo corto funciona como el español «está hecho»: «дом построен», «песок привезён», «дверь покрашена». Concuerda en género y número pero no se declina, y es la forma con la que el ruso escrito dice quién hizo algo, en instrumental: «сделана Николаем Ивановым».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Para qué pusieron los vecinos la segunda placa?',
          options: [
            ['registro', 'Para dejar constancia de todo lo que hicieron ellos y que no figura en ningún sitio'],
            ['queja', 'Para presentar una queja formal contra el Estado'],
            ['turismo', 'Para atraer visitantes al edificio'],
          ],
          answer: 'registro',
          evidence: 'Всё остальное здесь сделано нами, и об этом не написано нигде … это не жалоба, а список.',
          correct: 'Sí, y Tamara Petrovna lo aclara ella misma: es una lista, no una queja.',
          incorrect: 'El texto descarta expresamente la queja, y no busca visitantes. Busca su respuesta a los vecinos que se oponían.',
          strategy: 'Cuando un personaje corrige la interpretación de otros, esa corrección es la tesis.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuántos de los once árboles plantados siguen vivos?',
          options: [
            ['ocho', 'Ocho'],
            ['once', 'Los once'],
            ['catorce', 'Catorce'],
          ],
          answer: 'ocho',
          evidence: '«Деревья у дома посажены в 2003 году. Восемь из одиннадцати живы».',
          correct: 'Correcto, y la placa lo dice sin adornar: ocho de once.',
          incorrect: 'Los catorce son los pisos que pagaron el portero automático. Busca la línea de los árboles.',
          strategy: 'Cada línea de la placa lleva sus propias cifras: localiza la línea antes que el número.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El cemento fue comprado «вскладчину». ¿Qué significa?',
          options: [
            ['escote', 'Pagándolo entre todos'],
            ['credito', 'A crédito'],
            ['rebajado', 'Con descuento'],
          ],
          answer: 'escote',
          evidence: '«Дорожка к мусорным бакам залита цементом в 1998 году. Цемент куплен вскладчину».',
          correct: 'Eso es, y encaja con la línea del portero automático, pagado por catorce pisos.',
          incorrect: 'No se habla de crédito ni de descuentos. Compárala con la línea del domofón.',
          strategy: 'Si otra línea del texto describe el mismo tipo de pago, úsala para deducir.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué el nieto de Víktor Gúrov preguntó dónde vivía Tamara Petrovna?',
          options: [
            ['gracias', 'Porque reconoció el nombre de su abuelo en la placa y quiso agradecerlo'],
            ['queja', 'Porque quería que quitaran el nombre de su abuelo'],
            ['casa', 'Porque buscaba comprar un piso en el edificio'],
          ],
          answer: 'gracias',
          evidence: 'который прочитал всё, постоял и спросил меня, где живёт Тамара Петровна. Он оказался внуком Виктора Гурова — того, который привёз песок.',
          correct: 'Sí, y el texto lo deja implícito: leyó todo, se quedó parado y luego preguntó.',
          incorrect: 'No pide quitar nada ni busca piso. Fíjate en la secuencia: leyó, se quedó parado, preguntó.',
          strategy: 'Cuando el texto describe una pausa antes de una pregunta, la pausa es la emoción.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: todos los vecinos estuvieron de acuerdo con poner la segunda placa.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Некоторые соседи были против. Они говорили, что это выглядит как жалоба на государство.',
          correct: 'Falso: algunos se opusieron por miedo a que pareciera una queja.',
          incorrect: 'Busca el párrafo que empieza por «Некоторые соседи».',
          strategy: 'La palabra «некоторые» (algunos) avisa de que no hubo unanimidad.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la crónica.',
          options: [
            ['p1', 'La placa oficial de 1957'],
            ['p2', 'Las líneas de la placa de los vecinos'],
            ['p3', 'La frase de Tamara Petrovna y la oposición de algunos'],
            ['p4', 'El nieto que reconoce el nombre de su abuelo'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'На стене у входа висит табличка … «Скамейка у второго подъезда сделана…» … Она сказала одну фразу … Он оказался внуком Виктора Гурова.',
          correct: 'Correcto: la placa oficial, la lista, el origen y el efecto.',
          incorrect: 'Fíjate en dónde aparece la frase de Tamara y dónde el hombre de cincuenta años.',
          strategy: 'Una crónica suele terminar con el efecto de lo que ha contado antes.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en ruso describiendo lo que se hizo en un lugar que conoces y quién lo hizo. Usa seis participios pasivos cortos.',
        minWords: 65, maxWords: 120,
        hints: ['Дом построен в … году.', 'Скамейка сделана Николаем в 1974 году.', 'Цемент куплен вскладчину.', 'Об этом не написано нигде.'],
      },
    },
    // ---------------------------------------------------------------- 2
    {
      slug: 'govorya-v-mikrofon-v-tri-nochi',
      title: 'Hablando al micrófono a las tres',
      genre: 'diario de oficio',
      topic: 'un programa de radio de dos a seis de la mañana',
      tags: ['ruso b1', 'lectura', 'gerundios (деепричастия)', 'participios activos'],
      intro: 'Creía que de noche llamaban los solitarios. Después de cuatro años sabe que no es así. Lectura de ruso B1.',
      mission: 'Averigua qué le agradeció la madre del chico en su carta.',
      seoTitle: 'Lectura de ruso B1: hablando al micrófono a las tres | WeLearn',
      seoDescription: 'Lee un diario de oficio en ruso B1 y practica los деепричастия y los participios activos. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['deeprichastiya-b1', 'participios-activos-b1', 'aspecto-verbal'],
      text: `Я работаю на радио в Челябинске. Ночной эфир: с двух до шести утра. Программа называется «Не спится».

Говоря в микрофон в три часа ночи, ты не знаешь, кто тебя слушает. Это главное отличие от дневного радио. Днём слушают люди, едущие на работу. Ночью слушают люди, которые не спят, и это совсем другие люди.

Начав работать здесь, я думал, что ночью звонят одинокие. Проработав четыре года, я знаю, что это не так.

Ночью звонят работающие: охранники, водители дальних рейсов, медсёстры, пекари. Люди, делающие ночью то, что днём делают другие. Они не одинокие. Они просто не спят, потому что им нельзя.

Есть постоянные. Женщина по имени Люба звонит каждую пятницу, слушая программу из машины: она развозит хлеб. Мужчина, работающий на насосной станции, звонит два раза в месяц и всегда говорит про футбол.

Один раз, в феврале, позвонил мальчик. Голос лет тринадцати. Он сказал, что не может спать, потому что утром экзамен. Я спросил, знают ли родители, что он звонит на радио в четыре утра. Он ответил: «Мама спит. Она встаёт в пять».

Я говорил с ним восемь минут в прямом эфире. Не про экзамен. Про то, что в четыре утра всё кажется хуже, чем оно есть, и что это свойство четырёх утра, а не свойство экзамена.

Через неделю пришло письмо от его матери. Она написала, что услышала передачу, выйдя на кухню за водой, и что узнала голос сына.

Она не была злой. Она написала так: «Спасибо, что не сказали ему, что всё будет хорошо. Он бы не поверил, и он бы больше вам не позвонил».

Самое трудное в ночном эфире — не темы, а тишина. Днём, если ведущий молчит три секунды, это ошибка. Ночью три секунды тишины — это нормально, и иногда это лучше, чем слова. Я научился этому не сразу, слушая записи своих первых передач и слыша, как я говорю слишком много. Мой редактор считал это ленью. Потом он послушал цифры звонков и перестал считать.

Заканчивая смену в шесть, я выхожу на улицу. Зимой в шесть ещё темно. Мне это нравится: город, ещё не начавший день.`,
      objectives: [
        'Formar el gerundio imperfectivo (говоря, слушая) y el perfectivo (начав, выйдя).',
        'Reconocer el participio activo: едущие, работающие, делающие, начавший.',
        'Distinguir la suposición de partida de lo comprobado con los años.',
      ],
      vocabulary: [
        { surface: 'эфир', gloss: 'emisión; «в прямом эфире» es en directo' },
        { surface: 'отличие', gloss: 'diferencia' },
        { surface: 'охранники', lemma: 'охранник', gloss: 'vigilantes de seguridad' },
        { surface: 'рейсов', lemma: 'рейс', gloss: 'trayectos; «дальние рейсы» son las rutas largas' },
        { surface: 'пекари', lemma: 'пекарь', gloss: 'panaderos' },
        { surface: 'развозит', lemma: 'развозить', gloss: 'reparte, lleva a varios sitios' },
        { surface: 'передачу', lemma: 'передача', gloss: 'programa de radio o televisión' },
        { surface: 'свойство', gloss: 'propiedad, característica de algo' },
      ],
      culturalNote: 'La radio nocturna con llamadas en directo sigue siendo popular en las ciudades rusas industriales, donde muchísima gente trabaja en turnos de noche: no es un formato para insomnes, es para trabajadores.',
      spanishSpeakerNote: 'El деепричастие condensa una oración entera: «выйдя на кухню» es «al salir a la cocina», y «проработав четыре года» es «después de trabajar cuatro años». El imperfectivo (говоря) es acción simultánea; el perfectivo (начав, выйдя) es acción previa.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué descubrió el locutor con los años?',
          options: [
            ['trabajan', 'Que de noche llaman personas que trabajan, no personas solas'],
            ['audiencia', 'Que la audiencia nocturna es más pequeña de lo que creía'],
            ['insomnio', 'Que el insomnio es un problema de salud extendido'],
          ],
          answer: 'trabajan',
          evidence: 'Начав работать здесь, я думал, что ночью звонят одинокие. Проработав четыре года, я знаю, что это не так … Они просто не спят, потому что им нельзя.',
          correct: 'Sí, y el texto lo construye con dos gerundios opuestos: al empezar y después de cuatro años.',
          incorrect: 'No se habla del tamaño de la audiencia ni del insomnio como enfermedad. Compara los dos gerundios.',
          strategy: 'Si dos gerundios contraponen el antes y el después del narrador, ahí está el hallazgo.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuánto habló en directo con el chico?',
          options: [
            ['ocho', 'Ocho minutos'],
            ['cuatro', 'Cuatro horas'],
            ['dos', 'Dos minutos'],
          ],
          answer: 'ocho',
          evidence: 'Я говорил с ним восемь минут в прямом эфире. Не про экзамен.',
          correct: 'Correcto, y aclara de qué no hablaron: del examen.',
          incorrect: 'Las cuatro son los años trabajados. Busca la frase con «в прямом эфире».',
          strategy: 'Empareja cada cifra con lo que mide: minutos de conversación, años de oficio, horas de turno.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice que eso es un «свойство четырёх утра». ¿Qué significa?',
          options: [
            ['propiedad', 'Una propiedad, algo característico de esa hora'],
            ['problema', 'Un problema de esa hora'],
            ['horario', 'Un horario fijo'],
          ],
          answer: 'propiedad',
          evidence: 'в четыре утра всё кажется хуже, чем оно есть, и что это свойство четырёх утра, а не свойство экзамена',
          correct: 'Eso es. La frase la usa dos veces para contraponer la hora y el examen.',
          incorrect: 'La palabra se repite en la misma frase aplicada a dos cosas: habla de a qué pertenece el efecto.',
          strategy: 'Si una palabra se repite en la misma frase con dos complementos, está atribuyendo algo a uno y no al otro.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué la madre le da las gracias por lo que NO dijo?',
          options: [
            ['creible', 'Porque una promesa de que todo iría bien le habría parecido falsa y no habría vuelto a llamar'],
            ['examen', 'Porque no quería que hablaran del examen'],
            ['nombre', 'Porque no dijo el nombre de su hijo en directo'],
          ],
          answer: 'creible',
          evidence: '«Спасибо, что не сказали ему, что всё будет хорошо. Он бы не поверил, и он бы больше вам не позвонил».',
          correct: 'Sí, y ella misma añade la consecuencia con un condicional.',
          incorrect: 'No menciona el nombre ni pide evitar el tema. Lee su frase entera, incluida la segunda mitad.',
          strategy: 'Cuando alguien da las gracias por una omisión, la razón viene en la misma frase.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: una de las oyentes habituales llama mientras reparte pan en coche.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Женщина по имени Люба звонит каждую пятницу, слушая программу из машины: она развозит хлеб.',
          correct: 'Verdadero, y el gerundio «слушая» dice que lo hace a la vez.',
          incorrect: 'Busca el párrafo de los oyentes habituales: hay dos, una mujer y un hombre.',
          strategy: 'Un gerundio imperfectivo («слушая») indica que las dos acciones son simultáneas.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena el diario.',
          options: [
            ['p1', 'El horario del programa y la diferencia con el día'],
            ['p2', 'Quién llama de noche: gente que trabaja'],
            ['p3', 'La llamada del chico de trece años'],
            ['p4', 'La carta de su madre y la salida a las seis'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Ночной эфир: с двух до шести утра … Ночью звонят работающие … Один раз, в феврале, позвонил мальчик … Через неделю пришло письмо от его матери.',
          correct: 'Correcto: contexto, hallazgo, caso y consecuencia.',
          incorrect: 'Guíate por «Один раз, в феврале» y por «Через неделю».',
          strategy: 'Un diario de oficio suele pasar del patrón general a un caso concreto.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en ruso sobre un trabajo de noche o de madrugada. Usa cuatro gerundios (dos imperfectivos y dos perfectivos) y tres participios activos.',
        minWords: 65, maxWords: 120,
        hints: ['Говоря в микрофон в три часа ночи…', 'Начав работать здесь, я думал…', 'Проработав четыре года, я знаю…', 'Заканчивая смену в шесть, я выхожу.'],
      },
    },
    // ---------------------------------------------------------------- 3
    {
      slug: 'on-govoril-chto-priedet',
      title: 'Decía que vendría',
      genre: 'relato familiar',
      topic: 'nueve años de una visita anunciada',
      tags: ['ruso b1', 'lectura', 'estilo indirecto', 'subordinadas'],
      intro: 'Nueve años diciendo que vendría. Y la mujer del narrador fue la primera en notar qué palabra usaba en realidad. Lectura de ruso B1.',
      mission: 'Averigua qué frase fue la primera en nueve años que contenía un hecho terminado.',
      seoTitle: 'Lectura de ruso B1: decía que vendría | WeLearn',
      seoDescription: 'Lee un relato familiar en ruso B1 y practica el estilo indirecto y las oraciones subordinadas. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['discurso-indirecto-b1', 'oraciones-subordinadas-b1', 'pronombres-relativos'],
      text: `Мой отец девять лет говорил, что приедет.

Он живёт в Одессе, я в Екатеринбурге. Это далеко, но не так далеко, чтобы девять лет.

Каждый год в январе он звонил и говорил, что приедет летом. Каждый год в мае он звонил и говорил, что приедет осенью. Каждый год в октябре он говорил, что зимой билеты дорогие, и что приедет летом.

Моя жена первая заметила разницу. Она сказала, что я слышу не то, что он говорит. Она была права.

Отец никогда не говорил: «Я приеду». Он говорил: «Я постараюсь приехать». Или: «Я думаю приехать». Или: «Надо бы приехать». Девять лет я слышал первое, а он девять лет говорил второе.

Когда я это понял, я не обиделся. Мне стало легче. Я перестал ждать в июне и в сентябре, и это освободило мне два месяца в году.

В прошлом августе он позвонил и сказал: «Я купил билет». Он не сказал, что приедет. Он сказал, что купил билет. Это было первое предложение за девять лет, в котором был законченный факт.

Он приехал на одиннадцать дней. Мы почти не разговаривали о том, почему он не приезжал раньше. Один раз он начал, сказав, что сначала были деньги, потом здоровье, потом опять деньги. Я ответил, что я знаю. Он посмотрел на меня и сказал, что я вырос.

Мне сорок четыре года. Я вырос давно, но он этого не видел, и это не его вина и не моя.

Моя дочь, которой двенадцать, спросила один раз, почему дедушка не приезжает. Я не знал, что ответить, и сказал правду: что он хочет, но не решается. Она подумала и сказала, что это разные вещи — хотеть и собираться. Ей двенадцать лет, и на это ей понадобилось четыре секунды. Мне понадобилось девять лет. Я не рассказал ей, что она права.

Уезжая, он сказал в аэропорту, что приедет в следующем году. Я ответил: «Купи билет, и тогда скажешь мне».

Он засмеялся. Он понял, что я понял.

Билет он пока не купил. Но он звонит по субботам, а раньше звонил три раза в год. Это тоже что-то значит.`,
      objectives: [
        'Reproducir en estilo indirecto lo que otro dijo: он сказал, что…',
        'Encadenar subordinadas con что, потому что, чтобы, в котором.',
        'Distinguir una promesa de una intención declarada.',
      ],
      vocabulary: [
        { surface: 'заметила', lemma: 'заметить', gloss: 'notó, se dio cuenta' },
        { surface: 'постараюсь', lemma: 'постараться', gloss: 'intentaré' },
        { surface: 'обиделся', lemma: 'обидеться', gloss: 'me ofendí' },
        { surface: 'освободило', lemma: 'освободить', gloss: 'liberó, dejó libre' },
        { surface: 'билет', gloss: 'billete de viaje' },
        { surface: 'предложение', gloss: 'frase, oración. ¡No es una «proposición»!' },
        { surface: 'законченный', gloss: 'terminado, cerrado' },
        { surface: 'вина', gloss: 'culpa' },
      ],
      culturalNote: 'Odesa y Ekaterimburgo están a más de dos mil kilómetros y, desde 2022, sin conexión directa. El viaje entre las dos ciudades dejó de ser una cuestión solo de dinero.',
      spanishSpeakerNote: 'El ruso no cambia el tiempo del verbo en estilo indirecto: «он сказал, что приедет» mantiene el futuro, donde el español pondría «dijo que vendría». Lo que hay que oír es el verbo elegido: «приеду» frente a «постараюсь приехать».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué comprende el narrador?',
          options: [
            ['verbo', 'Que su padre nunca prometió venir: dijo que lo intentaría, y él oyó otra cosa'],
            ['dinero', 'Que su padre no venía por falta de dinero'],
            ['enfado', 'Que su padre no quería verlo'],
          ],
          answer: 'verbo',
          evidence: 'Отец никогда не говорил: «Я приеду». Он говорил: «Я постараюсь приехать» … Девять лет я слышал первое, а он девять лет говорил второе.',
          correct: 'Sí, y la frase final del párrafo lo resume: uno decía una cosa y el otro oía otra.',
          incorrect: 'El dinero es una de las razones que el padre menciona, pero no es lo que el narrador comprende. Y no hay rechazo.',
          strategy: 'Si el texto contrapone dos formas verbales entre comillas, la diferencia entre ellas es el asunto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuántos días se quedó el padre cuando por fin vino?',
          options: [
            ['once', 'Once días'],
            ['nueve', 'Nueve días'],
            ['dos', 'Dos meses'],
          ],
          answer: 'once',
          evidence: 'Он приехал на одиннадцать дней. Мы почти не разговаривали о том, почему он не приезжал раньше.',
          correct: 'Correcto, y en esos once días apenas hablaron del asunto.',
          incorrect: 'Los nueve son años y los dos meses son lo que el narrador dejó de pasar esperando.',
          strategy: 'Empareja cada cifra con su unidad: años de espera, días de visita, meses liberados.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El narrador dice que fue la primera «предложение» en nueve años con un hecho cerrado. ¿Qué significa?',
          options: [
            ['frase', 'Una frase, una oración'],
            ['propuesta', 'Una propuesta de negocio'],
            ['oferta', 'Una oferta de viaje'],
          ],
          answer: 'frase',
          evidence: 'Это было первое предложение за девять лет, в котором был законченный факт.',
          correct: 'Eso es. Se refiere a la frase «я купил билет», no a ninguna propuesta.',
          incorrect: 'Se refiere a lo que su padre acababa de decir: «he comprado el billete». Es una frase.',
          strategy: 'Si la palabra se refiere a algo que alguien acaba de decir, es una frase, no una oferta.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué contesta «compra el billete y entonces me lo dices»?',
          options: [
            ['aprendido', 'Porque ya distingue una intención de un hecho y no quiere volver a esperar'],
            ['enfado', 'Porque está enfadado y le habla con dureza'],
            ['dinero', 'Porque quiere que su padre pague el viaje él mismo'],
          ],
          answer: 'aprendido',
          evidence: 'Уезжая, он сказал … что приедет в следующем году. Я ответил: «Купи билет, и тогда скажешь мне». Он засмеялся. Он понял, что я понял.',
          correct: 'Sí, y la reacción del padre lo confirma: se ríe porque entiende.',
          incorrect: 'El padre se ríe, así que no fue dureza, y el dinero no está en juego ahí. Fíjate en la reacción.',
          strategy: 'Si el otro personaje se ríe en vez de ofenderse, la frase no era un reproche.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: cuando el narrador entendió la diferencia, se ofendió con su padre.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Когда я это понял, я не обиделся. Мне стало легче.',
          correct: 'Falso: dice expresamente que no se ofendió, y que le alivió.',
          incorrect: 'Busca la frase que empieza por «Когда я это понял». Es una negación.',
          strategy: 'Si el narrador niega una reacción esperable, esa negación es la respuesta.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena el relato.',
          options: [
            ['p1', 'Nueve años de anuncios en enero, mayo y octubre'],
            ['p2', 'Su mujer nota qué verbo usa el padre en realidad'],
            ['p3', 'La llamada de agosto: «he comprado el billete»'],
            ['p4', 'Los once días y la despedida en el aeropuerto'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Каждый год в январе он звонил … Моя жена первая заметила разницу … В прошлом августе он позвонил и сказал: «Я купил билет» … Уезжая, он сказал в аэропорту…',
          correct: 'Correcto: el patrón, el hallazgo, el cambio y la despedida.',
          incorrect: 'Guíate por «Каждый год», «В прошлом августе» y «Уезжая».',
          strategy: 'El gerundio «уезжая» sitúa la escena en el momento de la marcha: va al final.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en ruso contando lo que alguien te dijo que haría y qué pasó. Usa seis frases en estilo indirecto con «сказал, что».',
        minWords: 65, maxWords: 120,
        hints: ['Он говорил, что приедет летом.', 'Он никогда не говорил: «Я приеду».', 'Она сказала, что я слышу не то.', 'Он понял, что я понял.'],
      },
    },
    // ---------------------------------------------------------------- 4
    {
      slug: 'chitalnyy-zal-kotoryy-ne-zakryvaetsya',
      title: 'Una sala de lectura que no cierre',
      genre: 'artículo de opinión',
      topic: 'una bibliotecaria pide abrir de noche',
      tags: ['ruso b1', 'lectura', 'condicional con бы', 'impersonales modales'],
      intro: 'Se olvidó de cerrar la puerta una noche de invierno y entraron cuatro personas. Ninguna preguntó si estaba abierto. Lectura de ruso B1.',
      mission: 'Averigua qué decía la nota que encontró por la mañana.',
      seoTitle: 'Lectura de ruso B1: una sala de lectura que no cierre | WeLearn',
      seoDescription: 'Lee un artículo de opinión en ruso B1 y practica el condicional con бы y los impersonales modales. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['condicional-subjuntivo-b1', 'impersonales-modales-b1', 'condicional'],
      text: `Я библиотекарь в Иркутске, и я хочу, чтобы у нас был читальный зал, работающий всю ночь.

Мне говорят, что это невозможно. Мне говорят, что нужны деньги, что нужен охранник, что нельзя оставлять книги без присмотра. Всё это правда.

Но давайте посчитаем. Если бы зал работал с девяти вечера до семи утра, нужен был бы один человек в смену и свет. Больше ничего. Книги не надо выдавать: читай здесь, а уходя — оставь на столе.

Кому это нужно? Мне отвечают: никому.

Я работаю здесь девятнадцать лет и знаю, кому. Студентам, живущим в общежитии по четыре человека в комнате, где нельзя включить свет после одиннадцати. Матерям, у которых дети засыпают в десять и которым надо готовиться к экзаменам. Людям, работающим в две смены. Людям, которым просто негде сидеть.

В общежитии нельзя. В кафе нужно покупать кофе каждый час. Дома, если в доме четыре человека, тоже нельзя.

Если бы я могла выбрать одну вещь для этого города, я бы выбрала не новую библиотеку. Я бы выбрала старую библиотеку, открытую ночью.

Я спросила у коллег в других городах. В Казани такой зал был два года, а потом закрылся: не хватило не денег, а желания директора. В Красноярске он есть до сих пор, но только в сессию, три недели в году. Значит, это возможно. Значит, вопрос не в том, можно ли, а в том, кто захочет. Мне пятьдесят четыре года. Я успею ещё лет десять просить.

Один раз, зимой, я осталась до двух ночи, чтобы закончить каталог. Я забыла закрыть дверь. Пришли четыре человека. Никто из них не спросил, работает ли зал. Они просто вошли, сели и стали читать. Один парень спал сорок минут за столом, потом проснулся и продолжил читать.

Никто ничего не украл. Утром на столе лежала записка: «Спасибо. Мы вернёмся, если можно». Я не знаю, кто её написал.

Я показала записку директору. Он сказал, что это очень трогательно и что денег нет.

Записка лежит у меня в столе третий год. Иногда я думаю, что её надо будет показать кому-то другому, и что этот кто-то, наверное, ещё не работает в мэрии.`,
      objectives: [
        'Construir el condicional con бы: если бы зал работал, нужен был бы.',
        'Usar los impersonales modales: нужно, надо, нельзя, можно, негде.',
        'Distinguir un argumento de coste de un argumento de necesidad.',
      ],
      vocabulary: [
        { surface: 'читальный', lemma: 'читальный зал', gloss: 'de lectura; «читальный зал» es la sala de lectura' },
        { surface: 'присмотра', lemma: 'присмотр', gloss: 'vigilancia; «без присмотра» es sin vigilar' },
        { surface: 'выдавать', gloss: 'prestar, entregar en préstamo' },
        { surface: 'общежитии', lemma: 'общежитие', gloss: 'residencia de estudiantes' },
        { surface: 'засыпают', lemma: 'засыпать', gloss: 'se duermen' },
        { surface: 'негде', gloss: 'no hay dónde' },
        { surface: 'записка', gloss: 'nota escrita a mano' },
        { surface: 'трогательно', gloss: 'conmovedor' },
      ],
      culturalNote: 'Las residencias universitarias rusas suelen alojar a cuatro estudiantes por habitación con horarios de luces, y por eso las salas de lectura públicas cumplen una función que en otros países cubre la propia vivienda.',
      spanishSpeakerNote: 'Los impersonales rusos no llevan sujeto: «нужно», «надо», «нельзя», «негде». Y la persona a la que afectan va en dativo: «мне надо», «людям негде сидеть». El español pone ahí un sujeto o un «se».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué defiende la bibliotecaria?',
          options: [
            ['noche', 'Abrir de noche la biblioteca que ya existe, en lugar de construir una nueva'],
            ['nueva', 'Construir una biblioteca nueva y moderna'],
            ['prestamo', 'Ampliar el préstamo de libros a domicilio'],
          ],
          answer: 'noche',
          evidence: 'Я бы выбрала не новую библиотеку. Я бы выбрала старую библиотеку, открытую ночью.',
          correct: 'Sí, y lo dice con dos condicionales seguidos que descartan la opción obvia.',
          incorrect: 'Descarta expresamente la biblioteca nueva, y dice que los libros no hace falta prestarlos.',
          strategy: 'Cuando dos frases con бы se oponen, la segunda es la propuesta.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué haría falta según ella para abrir de noche?',
          options: [
            ['dos', 'Una persona por turno y la luz encendida'],
            ['tres', 'Un vigilante, un bibliotecario y un caterero'],
            ['nada', 'Nada: se podría hacer sin personal'],
          ],
          answer: 'dos',
          evidence: 'Если бы зал работал с девяти вечера до семи утра, нужен был бы один человек в смену и свет. Больше ничего.',
          correct: 'Correcto, y ella misma cierra con «больше ничего».',
          incorrect: 'No propone dejarlo sin nadie ni contratar a tres personas. Busca la frase con «нужен был бы».',
          strategy: 'La forma «нужен был бы» introduce lo que haría falta en la hipótesis.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'Dice que a algunas personas «негде сидеть». ¿Qué significa?',
          options: [
            ['sitio', 'Que no tienen dónde sentarse'],
            ['prohibido', 'Que tienen prohibido sentarse'],
            ['gratis', 'Que no pueden pagar un asiento'],
          ],
          answer: 'sitio',
          evidence: 'Людям, работающим в две смены. Людям, которым просто негде сидеть … В общежитии нельзя. В кафе нужно покупать кофе каждый час.',
          correct: 'Eso es, y los dos ejemplos siguientes lo demuestran: la residencia y el café.',
          incorrect: 'La prohibición es «нельзя», otra palabra. Aquí se habla de falta de lugar.',
          strategy: 'La partícula «не-» + «где» construye la idea de «ningún lugar donde».',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué es importante que nadie preguntara si la sala estaba abierta?',
          options: [
            ['esperando', 'Porque demuestra que había gente esperando esa posibilidad, no que se colara por casualidad'],
            ['descuido', 'Porque prueba que la biblioteca es insegura'],
            ['norma', 'Porque significa que la norma no estaba clara'],
          ],
          answer: 'esperando',
          evidence: 'Никто из них не спросил, работает ли зал. Они просто вошли, сели и стали читать … Никто ничего не украл.',
          correct: 'Sí, y el texto añade la prueba contraria a la desconfianza: no faltó nada.',
          incorrect: 'El texto dice justamente que no robaron nada, así que no habla de inseguridad.',
          strategy: 'Si el texto añade que no hubo daño, está respondiendo a la objeción previsible.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: el director le dijo que la idea era conmovedora pero que no había dinero.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Я показала записку директору. Он сказал, что это очень трогательно и что денег нет.',
          correct: 'Verdadero, y las dos mitades de la frase van juntas a propósito.',
          incorrect: 'Busca la frase del director: dice dos cosas seguidas.',
          strategy: 'Cuando alguien elogia y niega en la misma frase, las dos partes cuentan.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena el artículo.',
          options: [
            ['p1', 'Lo que le contestan: hace falta dinero y vigilante'],
            ['p2', 'El cálculo: una persona por turno y luz'],
            ['p3', 'Para quién sería: estudiantes, madres, turnos dobles'],
            ['p4', 'La noche que olvidó cerrar y la nota de la mañana'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Мне говорят, что это невозможно … Но давайте посчитаем … Я работаю здесь девятнадцать лет и знаю, кому … Один раз, зимой, я осталась до двух ночи.',
          correct: 'Correcto: objeción, cálculo, destinatarios y prueba.',
          incorrect: 'Fíjate en dónde empieza el cálculo y dónde el episodio de la puerta abierta.',
          strategy: 'Un artículo de opinión suele guardar la anécdota probatoria para el final.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en ruso proponiendo algo para tu ciudad. Usa tres condicionales con бы y cinco impersonales modales distintos.',
        minWords: 65, maxWords: 120,
        hints: ['Если бы зал работал всю ночь…', 'Нужен был бы один человек.', 'В кафе нужно покупать кофе.', 'Людям просто негде сидеть.'],
      },
    },
    // ---------------------------------------------------------------- 5
    {
      slug: 'chto-ya-sdelayu-v-subbotu',
      title: 'Lo que haré el sábado',
      genre: 'confesión con datos',
      topic: 'un año de listas de sábados',
      tags: ['ruso b1', 'lectura', 'aspecto perfectivo e imperfectivo', 'futuro perfectivo'],
      intro: 'Ciento ochenta y siete tareas planificadas en un año y sesenta y una hechas. Lo interesante no es la cifra. Lectura de ruso B1.',
      mission: 'Averigua qué tenían en común todas las tareas que nunca hizo.',
      seoTitle: 'Lectura de ruso B1: lo que haré el sábado | WeLearn',
      seoDescription: 'Lee una confesión con datos en ruso B1 y practica el aspecto perfectivo e imperfectivo y el futuro perfectivo. Con seis preguntas.',
      grammarFocus: ['aspecto-perfectivo-imperfectivo-b1', 'futuro-perfectivo-b1', 'futuro-imperfectivo'],
      text: `В январе прошлого года я начал вести список. Каждую пятницу вечером я писал, что я сделаю в субботу. В воскресенье я писал, что я сделал на самом деле.

Год. Пятьдесят две пары строчек.

Результат такой. Я запланировал сто восемьдесят семь дел. Сделал шестьдесят одно.

Но интересно не это. Интересно, какие дела я делал, а какие не сделал ни разу.

Дела, которые я сделал, почти все были маленькие и конкретные: «позвонить в поликлинику», «купить лампочку», «отдать книгу Свете». Такие дела я обычно делал.

Дела, которые я не сделал, были все написаны другими словами: «разобрать балкон», «заняться английским», «привести в порядок документы». Не «сделать», а «заниматься». Не результат, а процесс без конца.

В русском языке разница видна сразу. «Я разберу балкон» — это конец. «Я буду разбирать балкон» — это можно делать всю жизнь. Год я писал в списке процессы и удивлялся, почему они не заканчиваются.

В сентябре я изменил правило. Теперь я пишу только то, что можно закончить за один день. Не «разобрать балкон», а «вынести с балкона четыре коробки». Не «заняться английским», а «выучить двадцать слов».

С сентября по декабрь я запланировал сорок четыре дела и сделал тридцать девять.

Балкон, кстати, разобран. На это понадобилось одиннадцать суббот и сорок три коробки. Ни в одну субботу я не разбирал балкон. В каждую из одиннадцати я выносил коробки.

Я показал список другу, который работает программистом. Он посмотрел и сказал, что у них на работе это называется по-другому, но проблема та же: если задачу нельзя закрыть, её никто не берёт. Он спросил, сколько мне это стоило. Я ответил: год и одну тетрадь за сорок рублей. Он сказал, что у них на это тратят гораздо больше. Тетрадь, кстати, ещё не кончилась.

Моя сестра говорит, что я просто обманул сам себя. Может быть. Но балкон пустой, а обман, после которого балкон становится пустым, я готов терпеть каждую субботу.

Список я продолжаю вести. Сейчас идёт второй год. Я больше не пишу «привести в порядок документы». Я пишу «найти документы на машину», и в прошлую субботу я их нашёл.`,
      objectives: [
        'Elegir el aspecto según haya final posible o no: разберу frente a буду разбирать.',
        'Usar el futuro perfectivo para lo que se puede terminar en un día.',
        'Leer un dato numérico y ver qué lo explica.',
      ],
      vocabulary: [
        { surface: 'вести', gloss: 'llevar; «вести список» es llevar una lista' },
        { surface: 'строчек', lemma: 'строчка', gloss: 'líneas, renglones' },
        { surface: 'лампочку', lemma: 'лампочка', gloss: 'bombilla' },
        { surface: 'разобрать', gloss: 'despejar, desmontar, poner en orden' },
        { surface: 'удивлялся', lemma: 'удивляться', gloss: 'me extrañaba' },
        { surface: 'вынести', gloss: 'sacar algo de un sitio' },
        { surface: 'понадобилось', lemma: 'понадобиться', gloss: 'hicieron falta' },
        { surface: 'обманул', lemma: 'обмануть', gloss: 'engañé' },
      ],
      culturalNote: 'El balcón cerrado de los pisos rusos funciona como despensa y trastero: patatas, conservas, esquís y cajas. Vaciarlo es una tarea que se aplaza durante años en muchas casas.',
      spanishSpeakerNote: 'Aquí el aspecto se vuelve práctico: «разберу» tiene final, «буду разбирать» no. Si te escribes una tarea en imperfectivo, te has escrito un proceso sin fin. El español no marca esa diferencia y por eso el problema pasa desapercibido.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué descubrió el narrador con su lista?',
          options: [
            ['aspecto', 'Que las tareas que nunca hacía estaban escritas como procesos sin final'],
            ['pereza', 'Que es una persona perezosa y debe organizarse mejor'],
            ['listas', 'Que las listas de tareas no sirven para nada'],
          ],
          answer: 'aspecto',
          evidence: 'Дела, которые я не сделал, были все написаны другими словами … Не «сделать», а «заниматься». Не результат, а процесс без конца.',
          correct: 'Sí, y lo demuestra con la lista de ejemplos.',
          incorrect: 'No se llama perezoso, y la lista acabó funcionando: la sigue el segundo año.',
          strategy: 'Cuando un texto agrupa los fracasos y busca qué tienen en común, ese rasgo es la tesis.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuántas tareas planificó y cuántas hizo entre septiembre y diciembre?',
          options: [
            ['4439', 'Planificó cuarenta y cuatro e hizo treinta y nueve'],
            ['18761', 'Planificó ciento ochenta y siete e hizo sesenta y una'],
            ['1143', 'Planificó once e hizo cuarenta y tres'],
          ],
          answer: '4439',
          evidence: 'С сентября по декабрь я запланировал сорок четыре дела и сделал тридцать девять.',
          correct: 'Correcto: las cifras del año completo son las otras.',
          incorrect: 'Los 187 y 61 son de todo el año, y once y cuarenta y tres son sábados y cajas.',
          strategy: 'Antes de elegir cifras, comprueba de qué periodo habla la pregunta.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: '¿Qué significa «разобрать балкон»?',
          options: [
            ['despejar', 'Vaciarlo y ponerlo en orden'],
            ['derribar', 'Derribar el balcón'],
            ['cerrar', 'Cerrarlo con cristales'],
          ],
          answer: 'despejar',
          evidence: 'Балкон, кстати, разобран. Понадобилось одиннадцать суббот и сорок три коробки … В каждую из одиннадцати я выносил коробки.',
          correct: 'Eso es: cuarenta y tres cajas sacadas en once sábados.',
          incorrect: 'No derriba ni acristala nada: saca cajas. Fíjate en qué hizo cada sábado.',
          strategy: 'Si el texto dice qué acciones concretas componen una tarea, esas acciones la definen.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué acepta que se engañó a sí mismo?',
          options: [
            ['resultado', 'Porque el engaño produjo un resultado real: el balcón está vacío'],
            ['hermana', 'Porque su hermana tiene siempre razón'],
            ['facil', 'Porque así las tareas le cuestan menos'],
          ],
          answer: 'resultado',
          evidence: 'Моя сестра говорит, что я просто обманул сам себя. Может быть. Но балкон пустой, а обман, после которого балкон становится пустым, я готов терпеть каждую субботу.',
          correct: 'Sí, y él mismo formula la condición: un engaño con ese resultado le vale.',
          incorrect: 'No dice que su hermana tenga razón sin más ni que busque comodidad. Lee su respuesta entera.',
          strategy: 'Cuando alguien concede una crítica y luego dice «pero», su argumento va después.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: dejó de escribir la lista al terminar el primer año.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Список я продолжаю вести. Сейчас идёт второй год.',
          correct: 'Falso: va por el segundo año.',
          incorrect: 'La respuesta está en el último párrafo, en la primera frase.',
          strategy: 'El presente («продолжаю») indica que la acción sigue: descarta el pasado cerrado.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la confesión.',
          options: [
            ['p1', 'El método: viernes lo previsto, domingo lo hecho'],
            ['p2', 'Las cifras del año: 187 planificadas, 61 hechas'],
            ['p3', 'El hallazgo: las que fallaban eran procesos'],
            ['p4', 'El cambio de regla en septiembre y el balcón vacío'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Каждую пятницу вечером я писал, что я сделаю в субботу … Я запланировал сто восемьдесят семь дел … Дела, которые я не сделал, были все написаны другими словами … В сентябре я изменил правило.',
          correct: 'Correcto: método, datos, hallazgo y corrección.',
          incorrect: 'Fíjate en dónde aparecen las cifras y dónde el cambio de regla.',
          strategy: 'Un texto con datos suele ir de la medición al hallazgo y de ahí al cambio.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en ruso sobre una tarea que aplazas siempre. Reescríbela en perfectivo y en imperfectivo, y explica la diferencia.',
        minWords: 65, maxWords: 120,
        hints: ['Каждую пятницу я писал, что сделаю в субботу.', '«Я разберу балкон» — это конец.', '«Я буду разбирать балкон» — это всю жизнь.', 'Теперь я пишу только то, что можно закончить.'],
      },
    },
    // ---------------------------------------------------------------- 6
    {
      slug: 'provodnitsa-nochnogo-poezda',
      title: 'Auxiliar de un tren nocturno',
      genre: 'retrato de oficio',
      topic: 'treinta y cinco horas de Moscú a Múrmansk',
      tags: ['ruso b1', 'lectura', 'caso instrumental', 'caso dativo'],
      intro: 'Treinta y seis personas en el vagón y tres que no duermen. Siempre tres. En nueve años esa regla no ha fallado. Lectura de ruso B1.',
      mission: 'Averigua qué le preguntó la mujer que viajaba a un entierro.',
      seoTitle: 'Lectura de ruso B1: auxiliar de un tren nocturno | WeLearn',
      seoDescription: 'Lee un retrato de oficio en ruso B1 y practica el caso instrumental y el dativo. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['instrumental-b1', 'dativo-b1', 'instrumental-uso'],
      text: `Я работаю проводницей в поезде Москва — Мурманск. Тридцать пять часов в одну сторону.

Пассажирам я нужна не как проводница. Я нужна им как человек, который знает расписание, где кипяток и когда в вагоне будет тихо.

Моя работа делится на три части. Первая — бельё, чай, билеты. Это два часа. Вторая — отвечать на вопросы. Это шесть часов. Третья — ночь.

Ночью в вагоне тридцать шесть человек, и трое из них не спят. Всегда трое, редко четверо. Я не знаю, почему всегда трое, но за девять лет это правило не нарушалось ни разу.

Один из них выходит в тамбур курить, хотя курить нельзя. Второй сидит в коридоре с телефоном. Третий приходит ко мне.

Тому, кто приходит ко мне, я даю чай. Мужчинам обычно чай, женщинам чаще воду. Детям — печенье, если оно есть.

Люди в поезде рассказывают вещи, которые не рассказывают дома. Я думаю, это из-за двух причин. Первая: меня они больше никогда не увидят. Вторая: за окном темно и ничего не происходит.

Мне рассказывали о разводах, о долгах, о болезнях, об одном убийстве в 1996 году. Я не рассказываю никому. Я не рассказываю даже мужу, и он этим недоволен.

Летом работать легче. Летом на севере светло всю ночь, и людям не так страшно. Зимой, когда за окном темно с трёх часов дня, разговоров больше. Я считала: зимой ко мне приходят почти в два раза чаще, чем летом. Это не моё впечатление, это записано у меня в тетради за девять лет. Тетрадь я никому не показываю. В ней нет имён — только даты и одно слово: «приходил» или «приходила».

Один раз женщина лет шестидесяти ехала в Мурманск на похороны брата, с которым не разговаривала одиннадцать лет. Она спросила меня, что ей сказать на похоронах. Я ответила, что не знаю. Она сказала: «Я тоже не знаю. Но я хотела спросить у кого-нибудь, кто не знал его».

Мы молчали двадцать минут, глядя в окно. Потом она пошла спать.

Я работаю проводницей девять лет. Мне сорок один год. Я не буду делать это до пенсии, но пока я не нашла ничего, что делало бы меня настолько нужной кому-то в четыре часа ночи.`,
      objectives: [
        'Usar el instrumental del oficio y del medio: работаю проводницей, ехать поездом.',
        'Usar el dativo del beneficiario: пассажирам, мужчинам, детям, кому-то.',
        'Distinguir la función oficial de un puesto de la función real.',
      ],
      vocabulary: [
        { surface: 'проводницей', lemma: 'проводница', gloss: 'auxiliar de coche en un tren ruso' },
        { surface: 'расписание', gloss: 'horario de trenes' },
        { surface: 'бельё', gloss: 'ropa de cama' },
        { surface: 'вагоне', lemma: 'вагон', gloss: 'vagón' },
        { surface: 'тамбур', gloss: 'plataforma entre vagones' },
        { surface: 'нарушалось', lemma: 'нарушаться', gloss: 'se incumplía' },
        { surface: 'разводах', lemma: 'развод', gloss: 'divorcios' },
        { surface: 'похороны', gloss: 'entierro, funeral' },
      ],
      culturalNote: 'La проводница es la responsable de un vagón entero en los trenes de largo recorrido rusos: reparte la ropa de cama, sirve el té y no se baja del vagón durante todo el trayecto.',
      spanishSpeakerNote: 'El dativo marca a quién le hace falta algo o para quién es: «пассажирам я нужна» es literalmente «a los pasajeros yo (les) soy necesaria». El español lo dice al revés: «los pasajeros me necesitan».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué explica el retrato?',
          options: [
            ['necesaria', 'Que su función real no es servir té: es estar disponible a las cuatro de la mañana'],
            ['sueldo', 'Que el trabajo está mal pagado para las horas que son'],
            ['seguridad', 'Que fumar en el tren es un problema de seguridad'],
          ],
          answer: 'necesaria',
          evidence: 'Пассажирам я нужна не как проводница … пока я не нашла ничего, что делало бы меня настолько нужной кому-то в четыре часа ночи.',
          correct: 'Sí, y el texto abre y cierra con la misma idea.',
          incorrect: 'No se habla de sueldo, y el tabaco es un detalle. Compara la primera frase del segundo párrafo con la última del texto.',
          strategy: 'Si la idea del principio reaparece al final, es la tesis del texto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿En cuántas partes divide su trabajo?',
          options: [
            ['tres', 'Tres: ropa y té, preguntas, y la noche'],
            ['dos', 'Dos: el día y la noche'],
            ['cuatro', 'Cuatro turnos de nueve horas'],
          ],
          answer: 'tres',
          evidence: 'Моя работа делится на три части. Первая — бельё, чай, билеты … Вторая — отвечать на вопросы … Третья — ночь.',
          correct: 'Correcto, y da la duración de las dos primeras.',
          incorrect: 'El texto dice expresamente «на три части». Busca esa frase.',
          strategy: 'Si el texto anuncia cuántas partes hay, cuéntalas en las frases siguientes.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'Uno de los pasajeros sale al «тамбур» a fumar. ¿Qué es?',
          options: [
            ['plataforma', 'La plataforma entre dos vagones'],
            ['anden', 'El andén de la estación'],
            ['baño', 'El aseo del vagón'],
          ],
          answer: 'plataforma',
          evidence: 'Один из них выходит в тамбур курить, хотя курить нельзя.',
          correct: 'Eso es: es el sitio donde se sale a fumar sin bajarse del tren.',
          incorrect: 'El tren está en marcha por la noche: no puede ser el andén. Y no es el aseo.',
          strategy: 'Si la acción ocurre con el tren en marcha, descarta cualquier lugar fuera del tren.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué la mujer quería preguntar a alguien que no conocía a su hermano?',
          options: [
            ['neutral', 'Porque necesitaba una respuesta sin historia familiar detrás'],
            ['experta', 'Porque creía que la auxiliar sabría qué decir en un funeral'],
            ['idioma', 'Porque no sabía cómo decirlo en ruso'],
          ],
          answer: 'neutral',
          evidence: 'Она спросила меня, что ей сказать на похоронах. Я ответила, что не знаю. Она сказала: «Я тоже не знаю. Но я хотела спросить у кого-нибудь, кто не знал его».',
          correct: 'Sí, y ella misma lo dice: buscaba a alguien ajeno, no a una experta.',
          incorrect: 'La auxiliar contesta que no sabe, y la mujer acepta eso. No buscaba una experta.',
          strategy: 'Si un personaje explica su propia pregunta, esa explicación es la respuesta.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: no le cuenta a su marido lo que oye en el tren, y a él le molesta.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Я не рассказываю никому. Я не рассказываю даже мужу, и он этим недоволен.',
          correct: 'Verdadero, y el texto añade el detalle del malestar de él.',
          incorrect: 'Busca el párrafo donde enumera lo que le cuentan los pasajeros.',
          strategy: 'La palabra «даже» (incluso) amplía una negación al caso más difícil.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena el retrato.',
          options: [
            ['p1', 'El trayecto y para qué la necesitan los pasajeros'],
            ['p2', 'Las tres partes del trabajo'],
            ['p3', 'Los tres que no duermen cada noche'],
            ['p4', 'La mujer que iba a un entierro'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Я работаю проводницей в поезде Москва — Мурманск … Моя работа делится на три части … Ночью в вагоне тридцать шесть человек … Один раз женщина лет шестидесяти…',
          correct: 'Correcto: contexto, estructura, patrón y caso.',
          incorrect: 'Fíjate en dónde entra la división en tres partes y dónde la mujer de sesenta años.',
          strategy: 'Un retrato de oficio suele acabar con el caso que resume el trabajo.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en ruso sobre un trabajo de atención a personas. Usa tres instrumentales de oficio y cinco dativos.',
        minWords: 65, maxWords: 120,
        hints: ['Я работаю проводницей.', 'Пассажирам я нужна как человек, который…', 'Мужчинам обычно чай, женщинам воду.', 'Детям — печенье, если оно есть.'],
      },
    },
    // ---------------------------------------------------------------- 7
    {
      slug: 'net-kassy-net-problem',
      title: 'No hay caja, no hay problemas',
      genre: 'reportaje',
      topic: 'un taller de bicicletas que no cobra dinero',
      tags: ['ruso b1', 'lectura', 'genitivo de negación', 'preposiciones y casos'],
      intro: 'Sin rótulo, sin caja, sin precios. Se paga con mermelada, con clavos o con una hora de trabajo. Lectura de ruso B1.',
      mission: 'Averigua por qué no trabaja así los doce meses del año.',
      seoTitle: 'Lectura de ruso B1: no hay caja, no hay problemas | WeLearn',
      seoDescription: 'Lee un reportaje en ruso B1 y practica el genitivo de negación y el uso de preposiciones con caso. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['genitivo-negacion-b1', 'preposiciones-casos-b1', 'genitivo-cantidad'],
      text: `В городе Кимры есть мастерская, у которой нет вывески.

Внутри чинят велосипеды. Мастера зовут Артём, ему пятьдесят два года, и у него нет кассы, нет терминала и нет цен.

Денег он не берёт. Это не благотворительность и не идея. Это система, которую он придумал в 2016 году, когда у него не было денег на аренду.

Работает это так. Ты приносишь велосипед. Артём его чинит. Ты приносишь ему что-нибудь: банку варенья, старый ключ на семнадцать, пакет гвоздей, час работы у него в мастерской, помощь с переездом.

У него нет прайса, но есть представление о справедливости, и это представление знает весь город.

Я спросил, не обманывают ли его. Он сказал, что обманывают, но редко — примерно один человек из тридцати. И добавил: «У меня нет бухгалтера, поэтому у меня нет и проблем с бухгалтером».

В мастерской нет отопления, поэтому в декабре и январе он не работает. В эти два месяца он ездит к брату в Тверь и работает там на стройке, за деньги, потому что за квартиру платить всё равно надо.

Я спросил, почему он не делает так круглый год: на стройке платят больше. Он ответил, что на стройке никто не приносит ему варенье.

За девять лет у него не было ни одного конфликта, ни одной жалобы и ни одной проверки. Проверять нечего: нет кассы, нет чеков, нет оборота.

Один раз в мастерскую пришёл человек из налоговой. Не по работе — с велосипедом дочери. Артём починил колесо. Человек принёс ему на следующий день коробку конфет и больше не приходил.

Я спросил, что он будет делать, когда не сможет работать руками. Он сказал, что не думал об этом. Потом подумал и добавил, что в городе живёт около сорока человек, которым он чинил велосипеды больше пяти раз, и что кто-нибудь из них, наверное, придёт. Он сказал это не как надежду, а как расчёт.

У Артёма нет ни машины, ни сбережений, ни отпуска. Он говорит, что у него нет и долгов, и что для него это важнее.`,
      objectives: [
        'Formar el genitivo de negación: нет кассы, нет цен, не было денег.',
        'Elegir el caso que pide cada preposición: у него, на стройке, за квартиру, с велосипедом.',
        'Distinguir una postura ideológica de una solución práctica.',
      ],
      vocabulary: [
        { surface: 'вывески', lemma: 'вывеска', gloss: 'rótulo de un local' },
        { surface: 'кассы', lemma: 'касса', gloss: 'caja registradora' },
        { surface: 'варенья', lemma: 'варенье', gloss: 'mermelada casera' },
        { surface: 'гвоздей', lemma: 'гвоздь', gloss: 'clavos' },
        { surface: 'справедливости', lemma: 'справедливость', gloss: 'justicia, equidad' },
        { surface: 'отопления', lemma: 'отопление', gloss: 'calefacción' },
        { surface: 'стройке', lemma: 'стройка', gloss: 'obra de construcción' },
        { surface: 'сбережений', lemma: 'сбережения', gloss: 'ahorros' },
      ],
      culturalNote: 'El trueque de servicios sigue vivo en las ciudades pequeñas rusas, sobre todo desde los años noventa. No es una moda alternativa: nació de la falta de dinero en circulación.',
      spanishSpeakerNote: 'La negación de existencia pide genitivo: «нет кассы», «нет цен», «не было денег». Y con «ни… ни…» se refuerza: «нет ни машины, ни сбережений». El español dice «no hay caja» sin cambiar la palabra.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Cómo presenta el texto el sistema de Artiom?',
          options: [
            ['practico', 'Como una solución práctica que nació de no tener dinero, no como una idea alternativa'],
            ['ideologia', 'Como una crítica ideológica al dinero'],
            ['caridad', 'Como una obra de caridad para gente sin recursos'],
          ],
          answer: 'practico',
          evidence: 'Это не благотворительность и не идея. Это система, которую он придумал в 2016 году, когда у него не было денег на аренду.',
          correct: 'Sí, y el texto descarta las dos lecturas fáciles en una sola frase.',
          incorrect: 'El texto niega expresamente que sea caridad o una idea. Busca esa frase.',
          strategy: 'Cuando un texto descarta dos interpretaciones seguidas, la buena viene después.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Con qué frecuencia calcula Artiom que le engañan?',
          options: [
            ['treinta', 'Una persona de cada treinta'],
            ['nunca', 'Nunca'],
            ['mitad', 'Aproximadamente la mitad'],
          ],
          answer: 'treinta',
          evidence: 'Он сказал, что обманывают, но редко — примерно один человек из тридцати.',
          correct: 'Correcto, y lo dice sin dramatizarlo.',
          incorrect: 'Dice expresamente que sí le engañan, aunque poco. Busca la cifra que sigue a «редко».',
          strategy: 'Cuando el narrador pregunta algo, la cifra suele venir en la respuesta inmediata.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El taller no tiene «вывеска». ¿Qué es?',
          options: [
            ['rotulo', 'El rótulo con el nombre del local'],
            ['licencia', 'La licencia de actividad'],
            ['escaparate', 'El escaparate'],
          ],
          answer: 'rotulo',
          evidence: 'В городе Кимры есть мастерская, у которой нет вывески. Внутри чинят велосипеды.',
          correct: 'Eso es: desde fuera no se sabe qué hay, aunque dentro se arreglan bicicletas.',
          incorrect: 'La palabra va en la frase que describe el local por fuera, no sus papeles.',
          strategy: 'Si la palabra aparece antes de decir qué hay dentro, describe el exterior.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué no trabaja en la obra todo el año, si pagan más?',
          options: [
            ['mermelada', 'Porque en la obra nadie le lleva mermelada: lo que recibe en el taller no es solo pago'],
            ['salud', 'Porque el trabajo de obra es demasiado duro para su edad'],
            ['ciudad', 'Porque su hermano vive en otra ciudad y no quiere mudarse'],
          ],
          answer: 'mermelada',
          evidence: 'Я спросил, почему он не делает так круглый год: на стройке платят больше. Он ответил, что на стройке никто не приносит ему варенье.',
          correct: 'Sí, y su respuesta es literal: la mermelada es lo que la obra no paga.',
          incorrect: 'Sí trabaja en la obra dos meses al año, así que ni la edad ni la ciudad lo impiden.',
          strategy: 'Si la respuesta a un «por qué» parece una anécdota, es una metáfora concreta.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: el hombre de Hacienda fue al taller a hacer una inspección.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Один раз в мастерскую пришёл человек из налоговой. Не по работе — с велосипедом дочери.',
          correct: 'Falso: fue con la bicicleta de su hija, no por trabajo.',
          incorrect: 'Busca la frase con «не по работе». Aclara a qué fue.',
          strategy: 'La fórmula «не по работе» descarta expresamente el motivo profesional.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena el reportaje.',
          options: [
            ['p1', 'El taller sin rótulo, sin caja y sin precios'],
            ['p2', 'Cómo funciona el pago en especie'],
            ['p3', 'Los dos meses de invierno en la obra'],
            ['p4', 'El hombre de Hacienda y la caja de bombones'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'есть мастерская, у которой нет вывески … Работает это так. Ты приносишь велосипед … В мастерской нет отопления … Один раз в мастерскую пришёл человек из налоговой.',
          correct: 'Correcto: el local, el sistema, la excepción del invierno y la anécdota.',
          incorrect: 'Fíjate en dónde se explica el sistema y dónde aparecen diciembre y enero.',
          strategy: 'Un reportaje suele dejar la anécdota más redonda para el final.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en ruso sobre alguien que hace las cosas fuera del sistema habitual. Usa seis genitivos de negación con нет.',
        minWords: 65, maxWords: 120,
        hints: ['У него нет вывески.', 'У меня нет кассы, нет цен.', 'Денег он не берёт.', 'У него нет ни машины, ни сбережений.'],
      },
    },
    // ---------------------------------------------------------------- 8
    {
      slug: 'ona-ne-doshla',
      title: 'Aquel día no llegó',
      genre: 'reportaje rural',
      topic: 'una cartera que recorre catorce kilómetros diarios',
      tags: ['ruso b1', 'lectura', 'verbos de movimiento con prefijo', 'prefijos verbales'],
      intro: 'Cuatro aldeas, catorce kilómetros al día y un río que en invierno hay que rodear. Un día de febrero no llegó. Lectura de ruso B1.',
      mission: 'Averigua qué contestó cuando le preguntaron por qué volvió al día siguiente.',
      seoTitle: 'Lectura de ruso B1: aquel día no llegó | WeLearn',
      seoDescription: 'Lee un reportaje rural en ruso B1 y practica los verbos de movimiento con prefijo. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['verbos-movimiento-prefijados-b1', 'prefijos-verbos-b1', 'verbos-prefijados'],
      text: `Валентина Сергеевна разносит почту в четырёх деревнях под Костромой. Ей пятьдесят девять лет. Зимой она проходит около четырнадцати километров в день.

Маршрут выглядит так. Она выезжает из Судиславля на автобусе в семь двадцать, доезжает до поворота, сходит и дальше идёт пешком.

Сначала она обходит Гридино — двадцать два дома, из них жилых одиннадцать. Потом переходит поле и заходит в Малое Ивановское: девять домов, жилых четыре.

Потом самое трудное. От Малого Ивановского до Заречья надо перейти реку. Летом есть мостик. Зимой мостик подо льдом, и она обходит по дороге — это лишних три километра.

В Заречье живут четыре человека. Все старше восьмидесяти.

Она приносит им пенсию, газеты, лекарства из аптеки и хлеб, если попросят. Хлеб не входит в её обязанности. Она всё равно приносит.

Я спросил, что будет, когда она уйдёт на пенсию. Она сказала, что не знает. Молодые не идут: зарплата маленькая, а идти надо в любую погоду.

Один раз, в феврале 2021 года, она не дошла. Была метель, она заблудилась между Малым Ивановским и Заречьем и просидела в снегу четыре часа. Её нашли около восьми вечера. Она отошла от дороги всего на восемьсот метров.

На следующий день она вышла на маршрут.

Я спросил, зачем. Она посмотрела на меня как на человека, который задаёт глупые вопросы, и ответила: «Там четыре человека ждут пенсию».

Я прошёл с ней один день, в марте. Мы вышли из автобуса в семь сорок и вернулись в Судиславль в шестом часу вечера. За день она сказала мне, наверное, двадцать фраз, а с жителями деревень разговаривала у каждой двери по пять-десять минут.

В Заречье нас ждали. Не почту ждали — её. Чайник стоял уже горячий, и это было видно. Я насчитал за день девять чашек чая. Она выпила три и семь раз объяснила, что больше не может.

Теперь у неё в кармане всегда свисток. Его купил ей почтальон из соседнего района. Она говорит, что свисток не нужен, и носит его каждый день.`,
      objectives: [
        'Distinguir los prefijos de movimiento: вы-, до-, с-, об-, пере-, за-, от-, при-.',
        'Reconstruir una ruta a partir de los verbos prefijados.',
        'Separar lo que entra en un trabajo de lo que se hace igualmente.',
      ],
      vocabulary: [
        { surface: 'разносит', lemma: 'разносить', gloss: 'reparte a domicilio' },
        { surface: 'маршрут', gloss: 'ruta, recorrido' },
        { surface: 'жилых', lemma: 'жилой', gloss: 'habitadas' },
        { surface: 'мостик', lemma: 'мост', gloss: 'puentecillo' },
        { surface: 'метель', gloss: 'ventisca de nieve' },
        { surface: 'заблудилась', lemma: 'заблудиться', gloss: 'se perdió' },
        { surface: 'свисток', gloss: 'silbato' },
        { surface: 'обязанности', lemma: 'обязанность', gloss: 'obligaciones del puesto' },
      ],
      culturalNote: 'En la Rusia rural el cartero entrega la pensión en mano: en aldeas sin banco ni cajero, la visita del cartero es el único acceso al dinero para la gente mayor.',
      spanishSpeakerNote: 'Cada prefijo cambia el trayecto: выехать (salir de), доехать (llegar hasta), сойти (bajarse), обойти (rodear o recorrer), перейти (cruzar), зайти (entrar un momento), отойти (apartarse), дойти (llegar a pie). La raíz es siempre идти o ехать.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué retrata el reportaje?',
          options: [
            ['pension', 'Un trabajo que sostiene a cuatro personas mayores y que nadie quiere heredar'],
            ['nieve', 'Los peligros de la nieve en la región de Kostromá'],
            ['correos', 'La mala gestión del servicio de correos'],
          ],
          answer: 'pension',
          evidence: 'Молодые не идут: зарплата маленькая, а идти надо в любую погоду … «Там четыре человека ждут пенсию».',
          correct: 'Sí, y las dos frases juntas son el reportaje entero.',
          incorrect: 'La ventisca es un episodio y no se critica la gestión. Cruza lo que dice de los jóvenes con su respuesta final.',
          strategy: 'Si el texto plantea qué pasará cuando alguien falte, ahí está su preocupación.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuántos kilómetros de más supone rodear el río en invierno?',
          options: [
            ['tres', 'Tres kilómetros'],
            ['catorce', 'Catorce kilómetros'],
            ['ocho', 'Ochocientos metros'],
          ],
          answer: 'tres',
          evidence: 'Зимой мостик подо льдом, и она обходит по дороге — это лишних три километра.',
          correct: 'Correcto: los catorce son el total del día.',
          incorrect: 'Los catorce son la jornada entera y los ochocientos metros, lo que se apartó al perderse.',
          strategy: 'Empareja cada distancia con lo que mide: la jornada, el rodeo, el extravío.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice que en febrero «она не дошла». ¿Qué significa?',
          options: [
            ['llegar', 'Que no llegó a su destino'],
            ['salir', 'Que no salió de casa'],
            ['entregar', 'Que no entregó la pensión a tiempo'],
          ],
          answer: 'llegar',
          evidence: 'Один раз, в феврале 2021 года, она не дошла. Была метель, она заблудилась.',
          correct: 'Eso es: el prefijo до- marca llegar hasta el final del trayecto.',
          incorrect: 'Sí salió, y el problema no fue el horario: se perdió en la ventisca. Fíjate en el prefijo до-.',
          strategy: 'El prefijo до- añade siempre la idea de llegar hasta el final.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué lleva el silbato todos los días si dice que no hace falta?',
          options: [
            ['regalo', 'Porque se lo regaló un compañero y llevarlo es aceptar el gesto'],
            ['norma', 'Porque la oficina se lo exige desde el accidente'],
            ['miedo', 'Porque en el fondo tiene miedo de volver a perderse'],
          ],
          answer: 'regalo',
          evidence: 'Его купил ей почтальон из соседнего района. Она говорит, что свисток не нужен, и носит его каждый день.',
          correct: 'Sí, y el texto lo deja en esa contradicción sin explicarla.',
          incorrect: 'No se menciona ninguna norma, y ella niega el miedo. Fíjate en quién se lo compró.',
          strategy: 'Cuando alguien dice que algo no sirve y aun así lo usa a diario, mira de dónde vino.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: llevar el pan no entra en sus funciones y aun así lo lleva.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Хлеб не входит в её обязанности. Она всё равно приносит.',
          correct: 'Verdadero, y el texto lo dice en dos frases muy cortas y seguidas.',
          incorrect: 'Busca las dos frases sobre el pan: una dice la norma y la otra lo que hace.',
          strategy: 'Dos frases cortas seguidas que se contradicen suelen ser un rasgo de carácter.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la ruta.',
          options: [
            ['p1', 'Sale en autobús y se baja en el cruce'],
            ['p2', 'Recorre Gridino y cruza el campo hasta Máloye Ivánovskoye'],
            ['p3', 'Rodea el río por la carretera hasta Zaréchie'],
            ['p4', 'Entrega pensiones, periódicos, medicinas y pan'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Она выезжает из Судиславля на автобусе … Сначала она обходит Гридино … Зимой мостик подо льдом, и она обходит по дороге … Она приносит им пенсию, газеты, лекарства.',
          correct: 'Correcto: los prefijos marcan cada tramo del recorrido.',
          incorrect: 'Sigue los verbos: выезжает, доезжает, обходит, переходит, обходит по дороге.',
          strategy: 'En un texto de ruta, los verbos de movimiento son el mapa.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en ruso describiendo un recorrido que haces a menudo. Usa seis verbos de movimiento con prefijos distintos.',
        minWords: 65, maxWords: 120,
        hints: ['Я выезжаю из дома в семь двадцать.', 'Доезжаю до поворота и схожу.', 'Обхожу площадь и захожу в магазин.', 'Дохожу до работы за сорок минут.'],
      },
    },
    // ---------------------------------------------------------------- 9
    {
      slug: 'minutochku',
      title: 'Un minutito',
      genre: 'cuaderno de estudiante',
      topic: 'para qué sirven los diminutivos rusos',
      tags: ['ruso b1', 'lectura', 'diminutivos', 'adverbios circunstanciales'],
      intro: 'Tardó tres años en entender por qué el ruso lo empequeñece todo. La respuesta se la dio una cajera sin querer. Lectura de ruso B1.',
      mission: 'Averigua qué hace pequeño en realidad un diminutivo, según el texto.',
      seoTitle: 'Lectura de ruso B1: un minutito | WeLearn',
      seoDescription: 'Lee un cuaderno de estudiante en ruso B1 y practica los diminutivos y los adverbios circunstanciales. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['diminutivos-aumentativos-b1', 'adverbios-circunstanciales-b1', 'adverbios-tiempo'],
      text: `«Минуточку» — так говорят, когда просят подождать. Не «минуту», а «минуточку». Разница между этими двумя словами — это половина русской вежливости.

Я живу в России девять лет и первые три года не понимал, зачем всё уменьшают. Сумочка, денежки, водичка, тихонько, стаканчик, соседушка.

Сначала я думал, что это про размер. Стаканчик — маленький стакан. Это неправильно: стаканчик может быть большой.

Потом я думал, что это детский язык. Тоже неправильно: так говорят мужчины пятидесяти лет в автосервисе.

Правильный ответ мне дала кассирша в магазине, совершенно случайно. Она сказала женщине впереди меня: «Подождите секундочку, у меня чек застрял». Женщина, которая до этого стояла злая, сразу успокоилась.

Уменьшительное слово не делает вещь маленькой. Оно делает просьбу маленькой.

«Подождите минуту» — это распоряжение. «Подождите минуточку» — это просьба, которую легко выполнить, потому что она сама себя объявила крошечной.

То же самое с деньгами. «Дай денег» звучит тяжело. «Дай денежек» звучит легко, и поэтому этой формой пользуются осторожно: она может звучать фальшиво.

Есть и обратная сторона. Врач, который говорит «сейчас будет укольчик», иногда преувеличивает в другую сторону. Начальник, который просит «задержаться на часок», обычно имеет в виду три.

Мой сосед Игорь объяснил это лучше всех. Он сказал: «Уменьшительное — это когда я прошу тебя о чём-то и заранее извиняюсь, ещё не начав просить».

Есть ещё одна вещь, которую я понял поздно. Уменьшительное работает лучше всего тогда, когда его говорят тебе. Когда ты говоришь его сам, ты рискуешь.

Русский, который просит «секундочку», ничем не рискует. Иностранец, который просит «секундочку» с акцентом, звучит либо очень мило, либо очень странно, и заранее ты не знаешь, как получится.

Я решил эту проблему просто. Я использую уменьшительные только с теми, кого знаю больше года. С остальными я говорю «минуту» и живу с этим.

Теперь я тоже так говорю. Не всегда правильно. Один раз я сказал коллеге «принеси документики», и она смеялась минут пять. Документы уменьшать нельзя. Почему — я до сих пор не знаю, и никто мне так и не объяснил.`,
      objectives: [
        'Reconocer los sufijos diminutivos: -очк-, -ечк-, -ик, -чик, -ушк-.',
        'Colocar los adverbios circunstanciales: сначала, потом, совершенно случайно, сразу, заранее, осторожно.',
        'Entender un recurso de cortesía que no tiene equivalente directo en español.',
      ],
      vocabulary: [
        { surface: 'уменьшают', lemma: 'уменьшать', gloss: 'empequeñecen, reducen' },
        { surface: 'вежливости', lemma: 'вежливость', gloss: 'cortesía' },
        { surface: 'кассирша', gloss: 'cajera' },
        { surface: 'застрял', lemma: 'застрять', gloss: 'se atascó' },
        { surface: 'успокоилась', lemma: 'успокоиться', gloss: 'se calmó' },
        { surface: 'распоряжение', gloss: 'orden, instrucción' },
        { surface: 'крошечной', lemma: 'крошечный', gloss: 'diminuta' },
        { surface: 'укольчик', lemma: 'укол', gloss: 'pinchacito, inyección' },
      ],
      culturalNote: 'El diminutivo ruso no se limita al lenguaje afectivo: aparece en el trato comercial, en la consulta médica y entre desconocidos. Es un recurso de cortesía cotidiano, no un rasgo infantil.',
      spanishSpeakerNote: 'El español también tiene diminutivos de cortesía («un momentito»), pero el ruso los usa mucho más y en más contextos. Y hay límites que nadie explica: «документики» hace reír, y no hay regla que lo prediga.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué concluye el texto sobre los diminutivos?',
          options: [
            ['peticion', 'Que no empequeñecen la cosa: empequeñecen la petición'],
            ['tamano', 'Que sirven para hablar de objetos pequeños'],
            ['infantil', 'Que son lenguaje infantil que los adultos deberían evitar'],
          ],
          answer: 'peticion',
          evidence: 'Уменьшительное слово не делает вещь маленькой. Оно делает просьбу маленькой.',
          correct: 'Sí, y el texto descarta antes las dos hipótesis equivocadas del propio narrador.',
          incorrect: 'El texto descarta expresamente lo del tamaño y lo del lenguaje infantil. Busca las dos frases seguidas.',
          strategy: 'Cuando el narrador cuenta dos hipótesis erróneas suyas, la tercera es la buena.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué dijo la cajera?',
          options: [
            ['secundochku', '«Espere un segundito, se me ha atascado el tique»'],
            ['minutu', '«Espere un minuto»'],
            ['dengi', '«Deme el dinero justo»'],
          ],
          answer: 'secundochku',
          evidence: 'Она сказала женщине впереди меня: «Подождите секундочку, у меня чек застрял».',
          correct: 'Correcto, y la mujer que estaba enfadada se calmó al instante.',
          incorrect: '«Подождите минуту» es el ejemplo que el texto usa después para comparar. Busca la cita de la cajera.',
          strategy: 'Distingue la cita real de los ejemplos que el texto construye para comparar.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice que la petición «сама себя объявила крошечной». ¿Qué significa «крошечный»?',
          options: [
            ['diminuto', 'Diminuto, minúsculo'],
            ['urgente', 'Urgente'],
            ['educado', 'Educado'],
          ],
          answer: 'diminuto',
          evidence: 'это просьба, которую легко выполнить, потому что она сама себя объявила крошечной',
          correct: 'Eso es: la petición se presenta a sí misma como mínima, y por eso es fácil aceptarla.',
          incorrect: 'El texto habla del tamaño que la petición se atribuye, no de su urgencia ni de su tono.',
          strategy: 'Si el adjetivo describe el efecto de un diminutivo, tendrá que ver con el tamaño.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué dice que «дай денежек» hay que usarlo con cuidado?',
          options: [
            ['falso', 'Porque suavizar una petición de dinero puede sonar falso'],
            ['grosero', 'Porque es una forma grosera'],
            ['antiguo', 'Porque ya nadie lo dice'],
          ],
          answer: 'falso',
          evidence: '«Дай денежек» звучит легко, и поэтому этой формой пользуются осторожно: она может звучать фальшиво.',
          correct: 'Sí, y el propio texto lo explica tras los dos puntos.',
          incorrect: 'No dice que sea grosero ni que esté en desuso. Lee lo que viene después de los dos puntos.',
          strategy: 'Después de dos puntos suele venir la razón de la advertencia anterior.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: el narrador entendió el uso de los diminutivos en su primer año en Rusia.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Я живу в России девять лет и первые три года не понимал, зачем всё уменьшают.',
          correct: 'Falso: tardó al menos tres años, y la respuesta le llegó por casualidad.',
          incorrect: 'Busca la segunda frase del texto: da los años que tardó.',
          strategy: 'Cuando el texto da un plazo de aprendizaje, compáralo con el de la pregunta.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena el razonamiento.',
          options: [
            ['p1', 'Primera hipótesis: es cuestión de tamaño'],
            ['p2', 'Segunda hipótesis: es lenguaje infantil'],
            ['p3', 'La escena de la cajera y la conclusión'],
            ['p4', 'Los límites: «документики» hace reír'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Сначала я думал, что это про размер … Потом я думал, что это детский язык … Правильный ответ мне дала кассирша … Один раз я сказал коллеге «принеси документики».',
          correct: 'Correcto: dos errores, la respuesta y el límite.',
          incorrect: 'Guíate por «Сначала», «Потом», «Правильный ответ» y «Один раз».',
          strategy: 'Los adverbios «сначала» y «потом» ordenan el razonamiento del narrador.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en ruso sobre una forma de cortesía de tu idioma que a un extranjero le costaría entender. Usa cinco diminutivos rusos y cuatro adverbios circunstanciales.',
        minWords: 65, maxWords: 120,
        hints: ['«Минуточку» — так говорят, когда просят подождать.', 'Сначала я думал, что это про размер.', 'Оно делает просьбу маленькой.', 'Документы уменьшать нельзя.'],
      },
    },
    // ---------------------------------------------------------------- 10
    {
      slug: 'chem-kholodnee-tem-luchshe',
      title: 'Cuanto más frío, mejor',
      genre: 'crónica',
      topic: 'un club de baño invernal en el Obi',
      tags: ['ruso b1', 'lectura', 'comparativos y superlativos', 'verbos reflexivos'],
      intro: 'Ochenta y tres personas, de diecinueve a ochenta y un años, en un agujero abierto en el hielo. Y cuarenta minutos de té después. Lectura de ruso B1.',
      mission: 'Averigua en qué se equivoca el socio más joven, según el narrador.',
      seoTitle: 'Lectura de ruso B1: cuanto más frío, mejor | WeLearn',
      seoDescription: 'Lee una crónica en ruso B1 y practica los comparativos, los superlativos y los verbos reflexivos. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['comparativos-superlativos-b1', 'verbos-reflexivos-b1', 'comparativos'],
      text: `Клуб зимнего плавания в Новосибирске существует с 1974 года. Сейчас в нём восемьдесят три человека. Самому старшему — восемьдесят один год, самому младшему — девятнадцать.

Они купаются в проруби на Оби с ноября по апрель, два раза в неделю.

Я пришёл посмотреть в январе, при минус двадцати трёх. Я не купался. Я стоял в куртке и мёрз сильнее, чем люди в воде.

Это не преувеличение, это физика. Вода в проруби — плюс один. Воздух — минус двадцать три. В воде теплее, чем на берегу, и это первое, что тебе говорят.

Самое трудное не вода. Самое трудное — раздеться и потом одеться. Раздеваются они быстро, а одеваются ещё быстрее: это самая холодная минута всего процесса.

Люда, шестьдесят восемь лет, купается двадцать девять лет. Она говорит: «Чем холоднее, тем лучше себя чувствуешь потом». Я спросил, не боится ли она заболеть. Она ответила, что болеет реже, чем её дочь, которая никогда не купалась.

Я не знаю, правда ли это. Врачи спорят, и я не врач.

Но одно я видел сам. После купания эти люди пьют чай в раздевалке и разговаривают сорок минут. Не пять. Сорок.

Я спросил, много ли новых людей приходит. Мне ответили, что каждый ноябрь приходит человек сорок, а к февралю остаётся пять или шесть. Остальные уходят не потому, что холодно. Они уходят потому, что не выдерживают не воду, а расписание: два раза в неделю, в семь утра, всю зиму, без исключений. Вода — это две минуты. Расписание — это пять месяцев.

Самый молодой, Кирилл, сказал мне вещь, которую я запомнил: «Я пришёл сюда закаляться. Я остался, потому что здесь мне девятнадцать лет, а не двадцать девять и не шестьдесят восемь. Здесь возраст никого не интересует».

Он ошибается только в одном. Возраст здесь интересует всех, но с другой стороны: чем ты старше и чем дольше купаешься, тем больше уважения.

Люде осталось шесть лет до тридцати пяти лет стажа. Она уже знает, что будет в тот день. Ничего особенного не будет. Все просто искупаются, а потом кто-нибудь скажет: «Ну, Люда, тридцать пять».`,
      objectives: [
        'Formar comparativos y superlativos: сильнее, теплее, реже, самый молодой, самое трудное.',
        'Usar la construcción чем… тем…: чем холоднее, тем лучше.',
        'Conjugar los reflexivos: купаться, раздеваться, одеваться, закаляться.',
      ],
      vocabulary: [
        { surface: 'проруби', lemma: 'прорубь', gloss: 'agujero abierto en el hielo' },
        { surface: 'мёрз', lemma: 'мёрзнуть', gloss: 'pasaba frío' },
        { surface: 'преувеличение', gloss: 'exageración' },
        { surface: 'берегу', lemma: 'берег', gloss: 'orilla' },
        { surface: 'раздеться', gloss: 'desnudarse, quitarse la ropa' },
        { surface: 'раздевалке', lemma: 'раздевалка', gloss: 'vestuario' },
        { surface: 'закаляться', gloss: 'endurecerse con el frío' },
        { surface: 'стажа', lemma: 'стаж', gloss: 'antigüedad, años de práctica' },
      ],
      culturalNote: 'Los clubes de «морж» (morsa) existen en casi todas las ciudades rusas con río helado y funcionan como asociaciones con décadas de historia. Los años de antigüedad se cuentan y se anuncian.',
      spanishSpeakerNote: 'La construcción «чем…, тем…» equivale a «cuanto más…, más…»: «чем холоднее, тем лучше». Los dos elementos van en comparativo, y el orden es fijo.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué descubre el narrador sobre el club?',
          options: [
            ['pertenencia', 'Que la gente se queda por el grupo, aunque haya venido por la salud'],
            ['salud', 'Que bañarse en hielo previene las enfermedades'],
            ['peligro', 'Que es una práctica peligrosa a partir de cierta edad'],
          ],
          answer: 'pertenencia',
          evidence: 'После купания эти люди пьют чай в раздевалке и разговаривают сорок минут. Не пять. Сорок … «Я пришёл сюда закаляться. Я остался, потому что…»',
          correct: 'Sí, y el propio Kiril separa por qué vino de por qué se quedó.',
          incorrect: 'El narrador dice expresamente que no sabe si previene enfermedades, y no habla de peligro.',
          strategy: 'Cuando alguien distingue por qué empezó de por qué sigue, la segunda razón es la tesis.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuál es, según el texto, la parte más difícil?',
          options: [
            ['vestirse', 'Desvestirse y sobre todo volver a vestirse'],
            ['agua', 'El momento de entrar en el agua'],
            ['te', 'Los cuarenta minutos de té'],
          ],
          answer: 'vestirse',
          evidence: 'Самое трудное не вода. Самое трудное — раздеться и потом одеться … это самая холодная минута всего процесса.',
          correct: 'Correcto, y el texto lo llama el minuto más frío de todo el proceso.',
          incorrect: 'El texto descarta expresamente el agua. Busca las dos frases con «самое трудное».',
          strategy: 'Cuando un texto dice «lo más difícil no es X», lo que sigue es la respuesta.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: '¿Qué es una «прорубь»?',
          options: [
            ['agujero', 'Un agujero abierto en el hielo del río'],
            ['piscina', 'Una piscina climatizada'],
            ['fuente', 'Un manantial de agua caliente'],
          ],
          answer: 'agujero',
          evidence: 'Они купаются в проруби на Оби с ноября по апрель … Вода в проруби — плюс один. Воздух — минус двадцать три.',
          correct: 'Eso es: está en el río Obi y el agua está a un grado.',
          incorrect: 'El agua está a un grado y el aire a menos veintitrés: no es una piscina ni un manantial caliente.',
          strategy: 'Si el texto da la temperatura del agua, ya sabes qué tipo de sitio es.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿En qué se equivoca Kiril, según el narrador?',
          options: [
            ['importa', 'La edad sí importa allí, pero al revés: cuanta más antigüedad, más respeto'],
            ['joven', 'En que se cree el más joven cuando no lo es'],
            ['salud', 'En que cree que el baño le hará más fuerte'],
          ],
          answer: 'importa',
          evidence: 'Он ошибается только в одном. Возраст здесь интересует всех, но с другой стороны: чем ты старше и чем дольше купаешься, тем больше уважения.',
          correct: 'Sí, y el narrador lo formula con la misma construcción чем… тем…',
          incorrect: 'Sí es el más joven, y no se discute lo de la salud aquí. Lee la corrección del narrador.',
          strategy: 'Cuando el narrador dice «se equivoca en una cosa», la corrección viene inmediatamente.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: el narrador no se bañó y pasó más frío que quienes estaban en el agua.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Я не купался. Я стоял в куртке и мёрз сильнее, чем люди в воде … В воде теплее, чем на берегу.',
          correct: 'Verdadero, y el texto lo explica con las dos temperaturas.',
          incorrect: 'Busca las dos frases seguidas donde el narrador habla de sí mismo.',
          strategy: 'Si el texto explica una paradoja con datos, la paradoja es cierta.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la crónica.',
          options: [
            ['p1', 'El club, sus años y las edades de sus socios'],
            ['p2', 'La visita en enero y las temperaturas'],
            ['p3', 'Liuda y sus veintinueve años bañándose'],
            ['p4', 'Los cuarenta minutos de té y la frase de Kiril'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Клуб зимнего плавания в Новосибирске существует с 1974 года … Я пришёл посмотреть в январе … Люда, шестьдесят восемь лет, купается двадцать девять лет … После купания эти люди пьют чай.',
          correct: 'Correcto: datos, visita, testimonio y hallazgo.',
          incorrect: 'Fíjate en dónde aparece Liuda y dónde el té del vestuario.',
          strategy: 'Una crónica suele dejar para el final lo que descubre el propio narrador.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en ruso sobre una actividad de grupo que conoces. Usa cuatro comparativos, tres superlativos y la construcción чем… тем…',
        minWords: 65, maxWords: 120,
        hints: ['Самому старшему — восемьдесят один год.', 'В воде теплее, чем на берегу.', 'Чем холоднее, тем лучше.', 'Самое трудное — одеться потом.'],
      },
    },
  ],
}
