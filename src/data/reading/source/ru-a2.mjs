// Lectura — Ruso A2. Diez lecturas.
//
// Fuente de verdad. Los JSON se generan con `node scripts/build-reading-exercises.mjs --write`.
//
// Criterio del nivel
// -----------------
// Las diez cubren los 20 temas de gramática de ruso A2 —dos por lectura— y cada una arrastra
// un tema de A1. Banda propia del ruso: 170-210 palabras.
//
// A2 estrena el pasado, y en ruso el pasado trae consigo LO ÚNICO que de verdad separa al
// hispanohablante del ruso: el ASPECTO. No es el imperfecto contra el indefinido español,
// que es un eje de tiempo. El aspecto ruso es un eje distinto: proceso contra resultado.
// «Я красил дверь» y «Я покрасил дверь» son los dos pasado, y significan cosas distintas:
// estuve pintando, y quedó pintada. Y funciona también en futuro: «буду звонить» es la
// costumbre, «позвоню» es una llamada que se completa.
//
// Por eso las dos primeras lecturas están construidas sobre un par de aspecto cada una, y no
// como ejercicio: como escena. Un hombre que tarda once días en poder decir «покрасил», y
// una madre que en un aeropuerto acuerda con su hijo dos promesas distintas con el mismo
// verbo. Si el aspecto se entiende ahí, se entiende.
//
// Sigue el criterio del nivel anterior: `stressMarks: false` con la misma razón declarada.

const A1_GRAMMAR = [
  'adjetivos-concordancia', 'adjetivos-posesivos', 'alfabeto-cirilico', 'caso-acusativo',
  'caso-dativo-basico', 'caso-genitivo', 'caso-nominativo', 'futuro-byt',
  'genero-sustantivos', 'imperativo', 'negacion-ne', 'numeros', 'preguntas-vopros',
  'preposiciones-direccion', 'preposiciones-lugar-v-na', 'presente-verbos',
  'pronombres-personales', 'tiempo-expresiones', 'verbos-irregulares-basicos',
  'verbos-movimiento',
]

const A2_GRAMMAR = [
  'acusativo-movimiento', 'adverbios-tiempo', 'aspecto-verbal', 'comparativos',
  'condicional', 'dativo-uso', 'futuro-imperfectivo', 'futuro-perfectivo',
  'genitivo-cantidad', 'imperativo', 'instrumental-uso', 'oraciones-subordinadas',
  'pasado-verbos', 'plurales-irregulares', 'prepositivo-avanzado', 'pronombres-reflexivos',
  'pronombres-relativos', 'superlativos', 'verbos-movimiento', 'verbos-prefijados',
]

export default {
  language: 'ru',
  variant: 'ru-RU',
  cefr: 'A2',
  displayLabel: 'Ruso A2',
  tutorLocales: ['es'],
  status: 'published',
  seriesId: 'ruso-a2-lectura-10',
  allowedGrammar: [...A1_GRAMMAR, ...A2_GRAMMAR],
  disallowedGrammar: ['participios (причастия)', 'gerundios (деепричастия)', 'discurso indirecto complejo', 'voz pasiva con -ся literaria'],
  maxOutOfLevelVocabularyPercent: 5,
  inferenceBand: 'light',
  scriptSupport: { furigana: false, romanization: 'none', stressMarks: false, tokenizationMode: 'space' },
  targetCanDo:
    'Puedes seguir un relato en ruso sobre hechos pasados, distinguir el aspecto imperfectivo del perfectivo, y justificar tu respuesta con la frase exacta.',
  assessor: 'Zhanna Korzh — revisión de lengua y pedagogía',
  assessedAt: '2026-08-18T00:00:00-05:00',
  levelNotes: 'Pasado y futuro con los dos aspectos, instrumental, condicional con бы, verbos prefijados de movimiento. Sin participios ni gerundios. Acento sin marcar: pendiente con revisión nativa.',
  lastModified: '2026-08-18T00:00:00-05:00',
  review: {
    author: 'José David Duarte Silva',
    languageReviewer: 'Zhanna Korzh',
    pedagogyReviewer: 'Zhanna Korzh',
    reviewedAt: '2026-08-18T00:00:00-05:00',
    copyrightChecked: true,
    cultureChecked: true,
    aiAssisted: true,
    aiUseNote: 'Borrador asistido por IA, revisado y aprobado por Zhanna Korzh (lengua y pedagogía).',
    languageDecision: 'approved',
    pedagogyDecision: 'approved',
  },

  exercises: [
    // ---------------------------------------------------------------- 1
    {
      slug: 'odinnadtsat-dney-ya-krasil-dver',
      title: 'Once días pintando la puerta',
      genre: 'relato en primera persona',
      topic: 'una puerta que tarda once días en quedar pintada',
      tags: ['ruso a2', 'lectura', 'pasado', 'aspecto verbal'],
      intro: 'Cada tarde la vecina preguntaba «¿la ha pintado?» y él respondía «estuve pintando». Once días con la misma conversación. Lectura de ruso A2.',
      mission: 'Averigua qué le pide la vecina el día que por fin puede decir «покрасил».',
      seoTitle: 'Lectura de ruso A2: once días pintando la puerta | WeLearn',
      seoDescription: 'Lee un relato en ruso A2 y practica el pasado y el aspecto verbal (красил / покрасил). Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['pasado-verbos', 'aspecto-verbal', 'presente-verbos'],
      text: `В прошлом году я решил покрасить входную дверь нашей квартиры. Дверь была старая, коричневая, и краска на ней облезла.

Я думал, что это работа на два часа. Это была работа на одиннадцать дней.

Первый день я купил краску и кисть. Второй день я мыл дверь. Третий день я ждал, потому что дверь была мокрая. Четвёртый и пятый день я красил — но не докрасил.

Шестой и седьмой день была плохая погода: шёл дождь, и краска не сохла. Восьмой день я красил снова. Девятый день я красил второй раз, потому что первый слой был плохой.

Каждый вечер моя соседка Тамара Сергеевна выходила из лифта, смотрела на дверь и спрашивала: «Покрасили?»

И каждый вечер я отвечал: «Красил».

Она не понимала. Она говорила: «Так покрасили или нет?»

Я говорил: «Красил. Не покрасил».

В русском языке это два разных слова, и они значат совсем разные вещи. «Красил» — это процесс. «Покрасил» — это результат. Одиннадцать дней у меня был только процесс.

На одиннадцатый день я закончил. Вечером Тамара Сергеевна вышла из лифта, и я сказал первым: «Покрасил».

Она посмотрела на дверь две секунды и сказала: «Хорошо. Теперь покрасьте мою».

Я покрасил её дверь. Это заняло три дня. Я уже знал, как это делать.`,
      objectives: [
        'Formar el pasado ruso con -л y concordarlo en género y número.',
        'Distinguir el imperfectivo (proceso) del perfectivo (resultado): красил / покрасил.',
        'Leer un diálogo donde la gramática es el malentendido.',
      ],
      vocabulary: [
        { surface: 'входную', lemma: 'входной', gloss: 'de entrada; «входная дверь» es la puerta de la calle' },
        { surface: 'облезла', lemma: 'облезть', gloss: 'se descascarilló' },
        { surface: 'кисть', gloss: 'pincel' },
        { surface: 'мокрая', lemma: 'мокрый', gloss: 'mojada' },
        { surface: 'докрасил', lemma: 'докрасить', gloss: 'terminé de pintar' },
        { surface: 'лифта', lemma: 'лифт', gloss: 'ascensor' },
        { surface: 'заняло', lemma: 'занять', gloss: 'llevó, tardó (tiempo)' },
        { surface: 'первым', lemma: 'первый', gloss: 'primero; «я сказал первым» es lo dije yo antes' },
      ],
      culturalNote: 'En los bloques rusos la puerta de entrada de cada piso da al rellano común, así que su estado lo ve todo el vecindario. Pintarla es un asunto medio privado y medio público.',
      spanishSpeakerNote: 'Aquí está el aspecto en una sola escena. «Красил» y «покрасил» son los dos pasado: el primero cuenta el proceso, el segundo el resultado. El español no tiene esta pareja: «pinté» sirve para las dos cosas, y por eso hay que fijarse en el prefijo.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué cuenta el texto?',
          options: [
            ['aspecto', 'Once días de proceso hasta poder decir por fin que la puerta quedó pintada'],
            ['vecina', 'Un conflicto con una vecina metomentodo'],
            ['pintura', 'Que compró una pintura de mala calidad'],
          ],
          answer: 'aspecto',
          evidence: '«Красил» — это процесс. «Покрасил» — это результат. Одиннадцать дней у меня был только процесс.',
          correct: 'Sí, y el texto lo explica él mismo con las dos palabras.',
          incorrect: 'La vecina no es el conflicto y la pintura no falla. Busca las frases sobre las dos palabras.',
          strategy: 'Si un texto se detiene a explicar dos palabras parecidas, la diferencia entre ellas es el asunto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué hizo el segundo día?',
          options: [
            ['lavar', 'Lavó la puerta'],
            ['comprar', 'Compró la pintura y el pincel'],
            ['esperar', 'Esperó a que se secara'],
          ],
          answer: 'lavar',
          evidence: 'Первый день я купил краску и кисть. Второй день я мыл дверь. Третий день я ждал.',
          correct: 'Correcto, y fíjate en que ahí usa el imperfectivo «мыл»: estuvo lavando.',
          incorrect: 'Comprar fue el primer día y esperar, el tercero. Cuenta los días.',
          strategy: 'Cuando el texto numera los días, empareja cada acción con su número.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice «краска на ней облезла». ¿Qué significa?',
          options: [
            ['descascarillo', 'La pintura se había descascarillado'],
            ['seco', 'La pintura se había secado bien'],
            ['cambio', 'La pintura había cambiado de color'],
          ],
          answer: 'descascarillo',
          evidence: 'Дверь была старая, коричневая, и краска на ней облезла.',
          correct: 'Eso es, y es la razón por la que decide pintarla.',
          incorrect: 'Va junto a «старая»: es una descripción del mal estado de la puerta.',
          strategy: 'Si la palabra va en una lista de defectos, describe un deterioro.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué la vecina no entendía sus respuestas?',
          options: [
            ['aspecto', 'Porque ella preguntaba por el resultado y él contestaba con el proceso'],
            ['sordera', 'Porque no oía bien'],
            ['idioma', 'Porque él no hablaba ruso'],
          ],
          answer: 'aspecto',
          evidence: 'Она говорила: «Так покрасили или нет?» Я говорил: «Красил. Не покрасил».',
          correct: 'Sí, y su pregunta lo demuestra: «entonces, ¿la pintó o no?».',
          incorrect: 'Él habla ruso perfectamente y ella oye bien: la pregunta y la respuesta no son del mismo tipo.',
          strategy: 'Si dos personajes usan el mismo verbo con formas distintas, el malentendido está ahí.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: el narrador se negó a pintar la puerta de la vecina.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Я покрасил её дверь. Это заняло три дня.',
          correct: 'Falso: la pintó, y en tres días en lugar de once.',
          incorrect: 'La respuesta está en las dos últimas frases del texto.',
          strategy: 'Si el texto da una duración concreta para algo, es porque ese algo ocurrió.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena lo que ocurre.',
          options: [
            ['p1', 'Decide pintar la puerta y calcula dos horas'],
            ['p2', 'Los primeros días: comprar, lavar, esperar'],
            ['p3', 'La conversación diaria con la vecina'],
            ['p4', 'El día once puede decir «покрасил», y ella le pide su puerta'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'В прошлом году я решил покрасить входную дверь … Первый день я купил краску … Каждый вечер моя соседка … На одиннадцатый день я закончил.',
          correct: 'Correcto: decisión, días, diálogo y remate.',
          incorrect: 'Guíate por «Первый день», «Каждый вечер» y «На одиннадцатый день».',
          strategy: 'Los números de los días ordenan el relato sin que haya que interpretar nada.',
        },
      ],
      production: {
        prompt: 'Escribe 8–10 frases en ruso sobre algo que tardaste mucho en acabar. Usa cuatro verbos imperfectivos de proceso y tres perfectivos de resultado.',
        minWords: 45, maxWords: 90,
        hints: ['В прошлом году я решил…', 'Первый день я купил…', 'Я красил, но не докрасил.', 'На одиннадцатый день я закончил.'],
      },
    },
    // ---------------------------------------------------------------- 2
    {
      slug: 'ya-pozvonyu-i-budu-zvonit',
      title: 'Llamaré e iré llamando',
      genre: 'memoria familiar',
      topic: 'dos promesas distintas con el mismo verbo',
      tags: ['ruso a2', 'lectura', 'futuro imperfectivo', 'futuro perfectivo'],
      intro: 'En el aeropuerto acordaron dos cosas, y las dos eran «llamar». Una madre oye perfectamente la diferencia. Lectura de ruso A2.',
      mission: 'Averigua por qué ella decidió no llamar primero.',
      seoTitle: 'Lectura de ruso A2: llamaré e iré llamando | WeLearn',
      seoDescription: 'Lee una memoria familiar en ruso A2 y practica los dos futuros: imperfectivo y perfectivo. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['futuro-imperfectivo', 'futuro-perfectivo', 'futuro-byt'],
      text: `В августе мой сын уехал в Иркутск. Это четыре тысячи километров и пять часов разницы.

В аэропорту мы договорились о двух вещах.

Первая: он позвонит, когда приедет. Один звонок, один раз, чтобы я знала, что всё хорошо. «Позвонит» — это законченное действие.

Вторая: он будет звонить каждое воскресенье. «Будет звонить» — это не один звонок, а привычка. В русском языке это два разных будущих, и мать слышит разницу очень хорошо.

Он позвонил через шестнадцать часов. Я не спала. Он сказал четыре слова: «Мама, я на месте».

Потом началось воскресенье. Первое воскресенье он позвонил. Второе тоже. Третье — нет.

Я не звонила ему. Я решила, что не буду звонить первой: это его обещание, не моё.

Четвёртое воскресенье он позвонил и сказал: «Мама, извини. Я забыл».

Я ответила: «Я знаю. Я буду ждать каждое воскресенье».

Мой муж говорил, что я слишком много думаю о словах. Может быть. Но я тридцать лет работала в школе и знаю одну вещь: если человек обещает один звонок, он обещает мало. Если он обещает привычку, он обещает много.

Теперь он звонит каждое воскресенье, уже год. Иногда мы говорим две минуты, иногда сорок. Это не важно.

Важно другое: я никогда не спрашиваю, почему он звонит. Я спрашиваю только: как ты.`,
      objectives: [
        'Formar el futuro imperfectivo con буду + infinitivo para la costumbre.',
        'Formar el futuro perfectivo para una acción única que se completa.',
        'Leer una decisión que el texto explica en una sola frase.',
      ],
      vocabulary: [
        { surface: 'разницы', lemma: 'разница', gloss: 'diferencia; aquí, de horario' },
        { surface: 'договорились', lemma: 'договориться', gloss: 'nos pusimos de acuerdo' },
        { surface: 'законченное', lemma: 'законченный', gloss: 'acabado, completo' },
        { surface: 'привычка', gloss: 'costumbre, hábito' },
        { surface: 'месте', lemma: 'место', gloss: 'sitio; «я на месте» es ya he llegado' },
        { surface: 'обещание', gloss: 'promesa' },
        { surface: 'забыл', lemma: 'забыть', gloss: 'olvidé' },
        { surface: 'ждать', gloss: 'esperar' },
      ],
      culturalNote: 'Irkutsk está a cuatro mil kilómetros de Moscú y a cinco husos horarios: la llamada del domingo se hace a una hora que a alguien de los dos siempre le viene mal.',
      spanishSpeakerNote: 'El ruso tiene dos futuros y la diferencia no es de tiempo, es de aspecto. «Позвоню» es una llamada que se completa; «буду звонить» es la costumbre de llamar. El español usa «llamaré» para las dos y pierde la distinción.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Cuál es el asunto del texto?',
          options: [
            ['promesas', 'Que las dos promesas del aeropuerto eran distintas, y ella respetó cuál le tocaba a cada uno'],
            ['distancia', 'Que Irkutsk está demasiado lejos para mantener el contacto'],
            ['enfado', 'Que la madre se enfadó cuando el hijo falló un domingo'],
          ],
          answer: 'promesas',
          evidence: 'Я решила, что не буду звонить первой: это его обещание, не моё.',
          correct: 'Sí, y esa frase es la decisión que sostiene todo el texto.',
          incorrect: 'No hay enfado —ella no llama— y el contacto se mantiene un año. Busca la frase con «обещание».',
          strategy: 'Si el narrador cuenta una decisión propia con «я решила», ahí está el centro del texto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuánto tardó el hijo en hacer la primera llamada?',
          options: [
            ['dieciseis', 'Dieciséis horas'],
            ['cinco', 'Cinco horas'],
            ['semana', 'Una semana'],
          ],
          answer: 'dieciseis',
          evidence: 'Он позвонил через шестнадцать часов. Я не спала.',
          correct: 'Correcto, y ella no durmió en ese tiempo.',
          incorrect: 'Las cinco horas son la diferencia de husos. Busca la frase con «через».',
          strategy: 'La estructura «через + tiempo» indica al cabo de cuánto ocurrió algo.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'Dice que llamar cada domingo es una «привычка». ¿Qué significa?',
          options: [
            ['costumbre', 'Una costumbre, un hábito'],
            ['obligacion', 'Una obligación impuesta'],
            ['favor', 'Un favor'],
          ],
          answer: 'costumbre',
          evidence: '«Будет звонить» — это не один звонок, а привычка.',
          correct: 'Eso es, y se opone en la misma frase a «un solo telefonazo».',
          incorrect: 'Se opone a «один звонок»: habla de repetición, no de obligación ni de favor.',
          strategy: 'La estructura «не A, а B» te da el sentido de B por contraste con A.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué al final solo pregunta «cómo estás» y no por qué llama?',
          options: [
            ['libre', 'Porque quiere que la llamada siga siendo suya y no una cuenta que rendir'],
            ['idioma', 'Porque no sabe cómo formular la otra pregunta'],
            ['tiempo', 'Porque las llamadas son demasiado cortas'],
          ],
          answer: 'libre',
          evidence: 'Иногда мы говорим две минуты, иногда сорок. Это не важно. Важно другое: я никогда не спрашиваю, почему он звонит.',
          correct: 'Sí, y encaja con su decisión anterior de no llamar ella primero.',
          incorrect: 'El texto dice que la duración no importa. Une esta frase con su decisión de no llamar primero.',
          strategy: 'Cuando el texto dice «это не важно. Важно другое», lo que sigue es la conclusión.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: el hijo se saltó el tercer domingo y no llamó.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Первое воскресенье он позвонил. Второе тоже. Третье — нет.',
          correct: 'Verdadero, y el cuarto domingo llamó para disculparse.',
          incorrect: 'Busca la enumeración de los domingos. Está en tres frases muy cortas.',
          strategy: 'Tres frases cortas seguidas con ordinales son una lista: léelas juntas.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena los hechos.',
          options: [
            ['p1', 'El acuerdo del aeropuerto: dos promesas'],
            ['p2', 'La llamada a las dieciséis horas'],
            ['p3', 'El tercer domingo sin llamada, y ella no llama'],
            ['p4', 'Un año llamando cada domingo'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'В аэропорту мы договорились о двух вещах … Он позвонил через шестнадцать часов … Третье — нет … Теперь он звонит каждое воскресенье, уже год.',
          correct: 'Correcto: acuerdo, primera llamada, fallo y presente.',
          incorrect: 'Guíate por «В аэропорту», «через шестнадцать часов» y «Теперь».',
          strategy: 'La palabra «теперь» marca el presente: lo que va con ella cierra el relato.',
        },
      ],
      production: {
        prompt: 'Escribe 8–10 frases en ruso sobre un acuerdo que tienes con alguien de tu familia. Usa tres futuros con буду y tres futuros perfectivos.',
        minWords: 45, maxWords: 90,
        hints: ['Он позвонит, когда приедет.', 'Он будет звонить каждое воскресенье.', 'Я не буду звонить первой.', 'Я буду ждать.'],
      },
    },
    // ---------------------------------------------------------------- 3
    {
      slug: 'ya-rabotayu-perevodchikom',
      title: 'Trabajo de intérprete',
      genre: 'diario de oficio',
      topic: 'una intérprete judicial que escribe a lápiz',
      tags: ['ruso a2', 'lectura', 'caso instrumental', 'caso dativo'],
      intro: 'Doce años traduciendo en un juzgado de San Petersburgo, a lápiz y no a bolígrafo, y por una razón concreta. Lectura de ruso A2.',
      mission: 'Averigua qué es lo más difícil de su trabajo, y no son las palabras.',
      seoTitle: 'Lectura de ruso A2: trabajo de intérprete | WeLearn',
      seoDescription: 'Lee un diario de oficio en ruso A2 y practica el caso instrumental y el dativo. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['instrumental-uso', 'dativo-uso', 'caso-dativo-basico'],
      text: `Я работаю переводчиком в суде в Санкт-Петербурге. Испанский и русский. Двенадцать лет.

Я не перевожу книги. Я перевожу людям, которые не понимают, что с ними происходит.

Обычно это рабочие: строители, водители, повара. Они приехали сюда работать, а не судиться. Я помогаю им понять вопросы судьи, и я помогаю судье понять их ответы.

Я пишу карандашом, не ручкой. Карандашом можно стереть. В суде это важно.

Самое трудное — не слова. Самое трудное — когда человек говорит мне что-то и просит: «Не переводите это». Я обязана переводить всё. Я объясняю ему это заранее, перед началом, каждый раз.

Один раз колумбиец сказал судье четыре слова, и я перевела их точно. Судья долго молчал. Потом он изменил решение. Я не знаю, из-за моих слов или нет.

В плохие дни в суде бывает три или четыре дела подряд. Тогда я не помню лиц, только голоса. В хорошие дни бывает одно дело, и я запоминаю всё: имя, город, работу, детей.

Вечером я езжу домой автобусом, сорок минут. Я не слушаю музыку. Я молчу, потому что весь день я говорю чужими словами.

Моя мать была учительницей. Она говорила: «Твоя работа — быть мостом». Мосты не выбирают, кто по ним идёт.`,
      objectives: [
        'Usar el instrumental para el oficio y el medio: работаю переводчиком, пишу карандашом.',
        'Usar el dativo del destinatario con помогать y переводить.',
        'Distinguir la dificultad técnica de la dificultad moral de un oficio.',
      ],
      vocabulary: [
        { surface: 'суде', lemma: 'суд', gloss: 'juzgado, tribunal' },
        { surface: 'строители', lemma: 'строитель', gloss: 'albañiles, obreros de la construcción' },
        { surface: 'повара', lemma: 'повар', gloss: 'cocineros' },
        { surface: 'судиться', gloss: 'pleitear, ir a juicio' },
        { surface: 'стереть', gloss: 'borrar' },
        { surface: 'обязана', lemma: 'обязанный', gloss: 'obligada' },
        { surface: 'заранее', gloss: 'de antemano' },
        { surface: 'мостом', lemma: 'мост', gloss: 'puente (en instrumental)' },
      ],
      culturalNote: 'En Rusia el intérprete judicial jura traducir íntegramente y responde por ello. No puede omitir nada de lo que oye, ni aunque la persona se lo pida.',
      spanishSpeakerNote: 'El instrumental hace dos trabajos que el español reparte: dice el oficio («работаю переводчиком», trabajo DE intérprete) y el medio («пишу карандашом», escribo CON lápiz). La misma terminación para «de» y para «con».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué explica el diario?',
          options: [
            ['todo', 'Que lo difícil no es traducir bien, sino estar obligada a traducirlo todo'],
            ['sueldo', 'Que los intérpretes judiciales están mal pagados'],
            ['idioma', 'Que el español y el ruso son lenguas muy distintas'],
          ],
          answer: 'todo',
          evidence: 'Самое трудное — не слова. Самое трудное — когда человек говорит мне что-то и просит: «Не переводите это». Я обязана переводить всё.',
          correct: 'Sí, y el texto lo dice descartando primero lo que no es difícil.',
          incorrect: 'No se habla de sueldos, y la distancia entre lenguas no aparece. Busca las dos frases con «самое трудное».',
          strategy: 'Cuando un texto repite «lo más difícil» dos veces, la segunda es la de verdad.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Por qué escribe a lápiz y no a bolígrafo?',
          options: [
            ['borrar', 'Porque a lápiz se puede borrar'],
            ['barato', 'Porque el lápiz es más barato'],
            ['rapido', 'Porque a lápiz escribe más rápido'],
          ],
          answer: 'borrar',
          evidence: 'Я пишу карандашом, не ручкой. Карандашом можно стереть. В суде это важно.',
          correct: 'Correcto, y añade que en un juzgado eso importa.',
          incorrect: 'No habla de precio ni de velocidad. Busca la frase que empieza por «Карандашом можно».',
          strategy: 'Si el texto repite la palabra en la frase siguiente, ahí está la explicación.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'Dice que vinieron a trabajar «а не судиться». ¿Qué significa el verbo?',
          options: [
            ['pleitear', 'Ir a juicio, pleitear'],
            ['juzgar', 'Juzgar a otros'],
            ['estudiar', 'Estudiar derecho'],
          ],
          answer: 'pleitear',
          evidence: 'Они приехали сюда работать, а не судиться.',
          correct: 'Eso es. Se opone a «работать» y comparte raíz con «суд», juzgado.',
          incorrect: 'Ellos no juzgan a nadie: son quienes están en el juicio. Fíjate en la raíz «суд».',
          strategy: 'Si reconoces la raíz de una palabra que ya viste («суд»), tienes medio significado.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué vuelve a casa en silencio, sin música?',
          options: [
            ['ajenas', 'Porque se ha pasado el día hablando con palabras que no son suyas'],
            ['cansada', 'Porque el autobús va demasiado lleno'],
            ['multa', 'Porque en el autobús no se puede escuchar música'],
          ],
          answer: 'ajenas',
          evidence: 'Я не слушаю музыку. Я молчу, потому что весь день я говорю чужими словами.',
          correct: 'Sí, y ella misma lo explica con un «потому что».',
          incorrect: 'No se dice que el autobús esté lleno ni que haya prohibiciones. Lee la explicación.',
          strategy: 'Una explicación con «потому что» es literal: no hay que deducirla.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: ella sabe con seguridad que sus palabras hicieron cambiar la decisión del juez.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Потом он изменил решение. Я не знаю, из-за моих слов или нет.',
          correct: 'Falso: dice expresamente que no lo sabe.',
          incorrect: 'La decisión cambió, pero busca la frase siguiente: dice qué sabe y qué no.',
          strategy: 'Si el narrador dice «я не знаю», la certeza absoluta es falsa.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la información.',
          options: [
            ['p1', 'Su oficio, sus idiomas y sus años'],
            ['p2', 'A quién traduce: obreros, no libros'],
            ['p3', 'El lápiz y lo más difícil del trabajo'],
            ['p4', 'La vuelta a casa en silencio y la frase de su madre'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Я работаю переводчиком в суде … Я не перевожу книги. Я перевожу людям … Я пишу карандашом … Вечером я езжу домой автобусом.',
          correct: 'Correcto: quién es, para quién trabaja, cómo trabaja y qué le cuesta.',
          incorrect: 'Fíjate en dónde entra el lápiz y dónde la vuelta a casa.',
          strategy: 'Un diario de oficio suele acabar en el momento de salir del trabajo.',
        },
      ],
      production: {
        prompt: 'Escribe 8–10 frases en ruso sobre tu trabajo o el de alguien cercano. Usa cuatro instrumentales (oficio y medio) y tres dativos.',
        minWords: 45, maxWords: 90,
        hints: ['Я работаю переводчиком.', 'Я пишу карандашом, не ручкой.', 'Я помогаю людям понять…', 'Моя мать была учительницей.'],
      },
    },
    // ---------------------------------------------------------------- 4
    {
      slug: 'samyy-korotkiy-put',
      title: 'El camino más corto',
      genre: 'investigación doméstica',
      topic: 'un año midiendo seis rutas al trabajo',
      tags: ['ruso a2', 'lectura', 'comparativos', 'superlativos'],
      intro: 'Seis kilómetros, seis rutas y un año apuntando tiempos. El resultado no es el que esperaba. Lectura de ruso A2.',
      mission: 'Averigua qué ruta eligió al final, y por qué no fue la más rápida.',
      seoTitle: 'Lectura de ruso A2: el camino más corto | WeLearn',
      seoDescription: 'Lee una investigación doméstica en ruso A2 y practica los comparativos y superlativos. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['comparativos', 'superlativos', 'adjetivos-concordancia'],
      text: `Я живу в Новосибирске и работаю в центре. От дома до работы шесть километров.

Год назад я решил найти самый быстрый путь. Я проверил шесть вариантов и записывал время каждый день.

Метро: тридцать одна минута. Автобус: сорок две минуты, а зимой дольше. Пешком: час двадцать. Велосипед: двадцать шесть минут — самый быстрый вариант, но только пять месяцев в году.

Самый короткий путь — не самый быстрый. Пешком через парк короче на километр, но там нет асфальта, и весной там грязь.

Самый дешёвый — велосипед. Самый дорогой — такси, конечно.

Но интересно другое. Метро быстрее автобуса на одиннадцать минут, а автобус приятнее метро на сто процентов. В автобусе есть окно. В метро окна нет.

Через год я выбрал автобус. Не самый быстрый, не самый дешёвый. Просто утром я смотрю в окно двадцать минут, и это лучше, чем смотреть в телефон.

Жена спросила, зачем я записывал время каждый день, если разница такая маленькая. Я ответил, что заранее я этого не знал. Именно поэтому я и записывал. Она сказала: «Логично». Это самое доброе слово, которое она говорит о моих проектах.

Моя жена говорит, что я потратил год на глупость. Может быть. Но теперь я знаю точно, и я больше не думаю об этом каждое утро. Это тоже время.`,
      objectives: [
        'Formar el comparativo con -ее y con «чем»: быстрее, короче, приятнее.',
        'Formar el superlativo con «самый»: самый быстрый, самый дешёвый.',
        'Distinguir la mejor opción medida de la mejor opción elegida.',
      ],
      vocabulary: [
        { surface: 'путь', gloss: 'camino, trayecto' },
        { surface: 'проверил', lemma: 'проверить', gloss: 'comprobé, probé' },
        { surface: 'записывал', lemma: 'записывать', gloss: 'apuntaba' },
        { surface: 'грязь', gloss: 'barro, lodo' },
        { surface: 'дешёвый', gloss: 'barato' },
        { surface: 'приятнее', lemma: 'приятный', gloss: 'más agradable' },
        { surface: 'потратил', lemma: 'потратить', gloss: 'gasté' },
        { surface: 'глупость', gloss: 'tontería' },
      ],
      culturalNote: 'Novosibirsk tiene metro pero también inviernos de treinta grados bajo cero: la bicicleta solo sirve unos cinco meses al año, y eso cambia cualquier cálculo de rutas.',
      spanishSpeakerNote: 'El comparativo ruso se forma con -ее o -е y no necesita «más»: «быстрее» ya es «más rápido». Y la comparación admite dos formas: «быстрее автобуса» (genitivo) o «быстрее, чем автобус».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué concluye el narrador?',
          options: [
            ['ventana', 'Que eligió el autobús por la ventana, no por el tiempo ni por el precio'],
            ['bici', 'Que la bicicleta es la mejor opción del año'],
            ['metro', 'Que el metro es lo más razonable'],
          ],
          answer: 'ventana',
          evidence: 'Через год я выбрал автобус. Не самый быстрый, не самый дешёвый … я смотрю в окно двадцать минут.',
          correct: 'Sí, y el texto lo dice descartando expresamente los dos superlativos.',
          incorrect: 'La bici solo sirve cinco meses y el metro no tiene ventana. Busca qué eligió al final.',
          strategy: 'Si el texto niega dos superlativos seguidos, la razón real viene después.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuánto tarda en metro?',
          options: [
            ['31', 'Treinta y un minutos'],
            ['26', 'Veintiséis minutos'],
            ['42', 'Cuarenta y dos minutos'],
          ],
          answer: '31',
          evidence: 'Метро: тридцать одна минута. Автобус: сорок две минуты … Велосипед: двадцать шесть минут.',
          correct: 'Correcto: los 26 son en bici y los 42 en autobús.',
          incorrect: 'Empareja cada tiempo con su medio de transporte: están en la misma lista.',
          strategy: 'Cuando el texto da una lista de tiempos, localiza el medio antes que la cifra.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'Dice que en primavera en el parque hay «грязь». ¿Qué significa?',
          options: [
            ['barro', 'Barro'],
            ['hielo', 'Hielo'],
            ['gente', 'Mucha gente'],
          ],
          answer: 'barro',
          evidence: 'там нет асфальта, и весной там грязь',
          correct: 'Eso es, y la razón va antes: no hay asfalto.',
          incorrect: 'La frase anterior dice que no hay asfalto: es lo que pasa en primavera sin asfalto.',
          strategy: 'Si la frase anterior da la causa, la palabra que sigue es su consecuencia.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué dice que el año no fue perdido, aunque su mujer piense que sí?',
          options: [
            ['dejar', 'Porque ahora lo sabe con certeza y ha dejado de decidirlo cada mañana'],
            ['salud', 'Porque andar tanto le mejoró la salud'],
            ['dinero', 'Porque acabó ahorrando dinero'],
          ],
          answer: 'dejar',
          evidence: 'теперь я знаю точно, и я больше не думаю об этом каждое утро. Это тоже время.',
          correct: 'Sí, y su argumento final es que eso también es tiempo ganado.',
          incorrect: 'No habla de salud ni de ahorro: el autobús no es el más barato. Lee la última frase.',
          strategy: 'La frase final de un texto de opinión suele contener el argumento de cierre.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: el camino más corto en distancia es también el más rápido.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Самый короткий путь — не самый быстрый. Пешком через парк короче на километр, но там нет асфальта.',
          correct: 'Falso: el texto lo dice con una frase entera dedicada a eso.',
          incorrect: 'Busca la frase que compara «короткий» con «быстрый». Es corta y está sola.',
          strategy: 'Cuando dos superlativos se enfrentan en una frase, esa frase es la respuesta.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la investigación.',
          options: [
            ['p1', 'Decide buscar la ruta más rápida y apunta tiempos'],
            ['p2', 'Los tiempos de cada medio de transporte'],
            ['p3', 'La comparación entre metro y autobús'],
            ['p4', 'La elección final y la opinión de su mujer'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Год назад я решил найти самый быстрый путь … Метро: тридцать одна минута … Метро быстрее автобуса на одиннадцать минут … Через год я выбрал автобус.',
          correct: 'Correcto: método, datos, comparación y decisión.',
          incorrect: 'Guíate por «Год назад» y por «Через год».',
          strategy: 'Un texto de investigación suele terminar con la decisión que se toma con los datos.',
        },
      ],
      production: {
        prompt: 'Escribe 8–10 frases en ruso comparando dos o tres formas de ir a un sitio. Usa cuatro comparativos y tres superlativos con «самый».',
        minWords: 45, maxWords: 90,
        hints: ['От дома до работы шесть километров.', 'Метро быстрее автобуса.', 'Самый дешёвый — велосипед.', 'Это лучше, чем смотреть в телефон.'],
      },
    },
    // ---------------------------------------------------------------- 5
    {
      slug: 'prishel-ushel-vernulsya',
      title: 'Vino, se fue, volvió',
      genre: 'cuaderno de guardia',
      topic: 'una noche en la recepción de un hospital',
      tags: ['ruso a2', 'lectura', 'verbos prefijados', 'verbos de movimiento'],
      intro: 'Un mismo verbo, ocho prefijos y ocho historias distintas. Y una noche de febrero anotada hora por hora. Lectura de ruso A2.',
      mission: 'Averigua qué hizo el hombre en la esquina antes de irse.',
      seoTitle: 'Lectura de ruso A2: vino, se fue, volvió | WeLearn',
      seoDescription: 'Lee un cuaderno de guardia en ruso A2 y practica los verbos de movimiento con prefijo. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['verbos-prefijados', 'verbos-movimiento', 'caso-acusativo'],
      text: `Я работаю на вахте в больнице в Перми. Ночная смена: с восьми вечера до восьми утра. Я записываю всех, кто пришёл и кто ушёл.

В русском языке приставка меняет всё. Пришёл — это сюда. Ушёл — это отсюда. Вошёл — внутрь. Вышел — наружу. Зашёл — на минуту. Дошёл — до конца. Одно слово «идти» и восемь разных историй.

В ту ночь в феврале я записал вот что.

21:40. Пришёл мужчина, лет сорока. Спросил третий этаж. Вошёл в лифт.

22:15. Вышел. Сел на скамейку у входа. Не ушёл.

23:30. Всё ещё сидел.

00:20. Вышел на улицу, постоял, вернулся. Сел на ту же скамейку.

01:10. Зашёл ко мне и спросил, есть ли кипяток. Я дал ему чай.

03:15. Спросил, сколько времени. Я сказал. Он кивнул и больше ничего не спросил.

02:00–05:00. Сидел.

05:40. Встал и снова вошёл в лифт.

06:20. Вышел, подошёл ко мне и сказал: «Мальчик. Три двести».

Потом он ушёл. Дошёл до угла и остановился. Постоял минуту. И побежал.

Я записываю всех девять лет, и я знаю одну вещь: люди, которые сидят на скамейке всю ночь, никогда не спрашивают, можно ли.

В тетради я записал: «06:20 — ушёл». Это правда, но это не вся правда.`,
      objectives: [
        'Reconocer el prefijo del verbo de movimiento: при-, у-, во-, вы-, за-, до-, подо-.',
        'Leer un registro horario y reconstruir la escena.',
        'Ver la diferencia entre lo que un documento anota y lo que ocurre.',
      ],
      vocabulary: [
        { surface: 'вахте', lemma: 'вахта', gloss: 'puesto de recepción, portería' },
        { surface: 'смена', gloss: 'turno de trabajo' },
        { surface: 'приставка', gloss: 'prefijo' },
        { surface: 'наружу', gloss: 'hacia fuera' },
        { surface: 'скамейку', lemma: 'скамейка', gloss: 'banco para sentarse' },
        { surface: 'кипяток', gloss: 'agua hirviendo' },
        { surface: 'угла', lemma: 'угол', gloss: 'esquina' },
        { surface: 'тетради', lemma: 'тетрадь', gloss: 'cuaderno' },
      ],
      culturalNote: 'En Rusia se anuncia el nacimiento diciendo el sexo y el peso: «мальчик, три двести» son un niño de tres kilos doscientos. Es la fórmula con la que se da la noticia por teléfono.',
      spanishSpeakerNote: 'El ruso pone en el prefijo lo que el español pone en el verbo o en la preposición: пришёл (vino), ушёл (se fue), вошёл (entró), вышел (salió), зашёл (pasó un momento), дошёл (llegó hasta). La raíz es siempre la misma.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué cuenta el cuaderno de guardia?',
          options: [
            ['espera', 'La noche de espera de un padre, contada por quien apunta las entradas y salidas'],
            ['seguridad', 'Un problema de seguridad en el hospital'],
            ['prefijos', 'Una clase sobre los prefijos rusos'],
          ],
          answer: 'espera',
          evidence: '06:20. Вышел, подошёл ко мне и сказал: «Мальчик. Три двести» … Это правда, но это не вся правда.',
          correct: 'Sí, y la última frase señala justamente lo que el registro no recoge.',
          incorrect: 'Los prefijos son la herramienta, no el asunto, y no hay problema de seguridad. Lee las dos frases finales.',
          strategy: 'Si un texto acaba diciendo que algo «no es toda la verdad», ahí está su tema.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué pidió el hombre a la una y diez de la madrugada?',
          options: [
            ['agua', 'Agua hirviendo'],
            ['telefono', 'Un teléfono'],
            ['manta', 'Una manta'],
          ],
          answer: 'agua',
          evidence: '01:10. Зашёл ко мне и спросил, есть ли кипяток. Я дал ему чай.',
          correct: 'Correcto, y el de la recepción le dio té.',
          incorrect: 'No pide teléfono ni manta. Busca la entrada de la 01:10.',
          strategy: 'En un registro horario, ve directamente a la hora que pide la pregunta.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice que la «приставка» cambia todo. ¿Qué es?',
          options: [
            ['prefijo', 'El prefijo del verbo'],
            ['acento', 'El acento de la palabra'],
            ['terminacion', 'La terminación del verbo'],
          ],
          answer: 'prefijo',
          evidence: 'В русском языке приставка меняет всё. Пришёл — это сюда. Ушёл — это отсюда.',
          correct: 'Eso es, y los ejemplos que siguen solo cambian por delante: при-, у-.',
          incorrect: 'Los ejemplos siguientes cambian el principio de la palabra, no el final.',
          strategy: 'Si el texto pone ejemplos justo después, compáralos y verás qué parte cambia.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué se detuvo un minuto en la esquina y luego echó a correr?',
          options: [
            ['asimilar', 'Porque necesitó un momento para asimilar la noticia antes de salir corriendo a contarla'],
            ['perdido', 'Porque no sabía qué dirección tomar'],
            ['olvido', 'Porque había olvidado algo en el hospital'],
          ],
          answer: 'asimilar',
          evidence: 'Дошёл до угла и остановился. Постоял минуту. И побежал.',
          correct: 'Sí, y el narrador lo deja sin explicar a propósito: por eso dice que el registro no es toda la verdad.',
          incorrect: 'No volvió al hospital ni se dice que dudara del camino. Fíjate en la secuencia de tres verbos.',
          strategy: 'Tres verbos seguidos y muy cortos describen una reacción: no busques una explicación literal.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: entre las diez y cuarto de la noche y las cinco y cuarenta el hombre se fue del hospital.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: '22:15. Вышел. Сел на скамейку у входа. Не ушёл … 02:00–05:00. Сидел.',
          correct: 'Falso: salió del edificio pero no se marchó. El texto lo subraya con «Не ушёл».',
          incorrect: 'Ojo con los dos verbos: «вышел» es salir del edificio, «ушёл» es marcharse. Busca las 22:15.',
          strategy: 'Distingue вышел (salió) de ушёл (se fue): el prefijo cambia el sentido por completo.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la noche.',
          options: [
            ['p1', 'Llega, pregunta por la tercera planta y sube'],
            ['p2', 'Baja y se sienta en el banco sin irse'],
            ['p3', 'A la una y diez pide agua caliente'],
            ['p4', 'A las 6:20 baja y anuncia el nacimiento'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: '21:40. Пришёл мужчина … 22:15. Вышел. Сел на скамейку … 01:10. Зашёл ко мне … 06:20. Вышел, подошёл ко мне.',
          correct: 'Correcto: el cuaderno está ordenado por horas.',
          incorrect: 'Sigue las horas del registro: 21:40, 22:15, 01:10, 06:20.',
          strategy: 'Un registro con horas ya viene ordenado: solo hay que leerlas.',
        },
      ],
      production: {
        prompt: 'Escribe 8–10 frases en ruso registrando los movimientos de una tarde tuya. Usa cinco verbos de movimiento con prefijos distintos.',
        minWords: 45, maxWords: 90,
        hints: ['Пришёл мужчина, лет сорока.', 'Вышел и сел на скамейку.', 'Зашёл ко мне на минуту.', 'Дошёл до угла и остановился.'],
      },
    },
    // ---------------------------------------------------------------- 6
    {
      slug: 'chelovek-kotoryy-chinit-chasy',
      title: 'El hombre que arregla relojes',
      genre: 'retrato de oficio',
      topic: 'un relojero que hace siempre la misma pregunta',
      tags: ['ruso a2', 'lectura', 'oraciones subordinadas', 'pronombres relativos'],
      intro: 'Un taller en Kazán desde 1987, y una pregunta que en realidad son dos: ¿que anden, o que estén enteros? Lectura de ruso A2.',
      mission: 'Averigua qué contestan los mayores de sesenta y qué los jóvenes.',
      seoTitle: 'Lectura de ruso A2: el hombre que arregla relojes | WeLearn',
      seoDescription: 'Lee un retrato de oficio en ruso A2 y practica las oraciones subordinadas y los pronombres relativos. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['oraciones-subordinadas', 'pronombres-relativos', 'preguntas-vopros'],
      text: `На улице Баумана в Казани есть маленькая мастерская, где один человек чинит часы. Его зовут Рустам, ему шестьдесят три года, и он работает здесь с 1987 года.

Люди, которые приносят ему часы, обычно приносят не часы. Они приносят историю. Часы, которые остановились в день, когда умер отец. Часы, которые бабушка носила сорок лет. Часы, которые муж подарил на свадьбу и которые больше никто не носит.

Рустам говорит, что он понял это не сразу. Первые десять лет он думал, что его работа — механизм. Потом он понял, что механизм — это только половина.

Он всегда спрашивает одно: «Вам нужно, чтобы часы шли, или вам нужно, чтобы они были целые?» Это не один вопрос, а два. Иногда человек хочет носить часы. Иногда человек хочет только, чтобы они лежали в ящике и были целые.

Если человек отвечает «чтобы шли», Рустам ставит новый механизм. Если человек отвечает «чтобы были целые», Рустам чинит старый — дольше и дороже.

Я спросил, что выбирают чаще. Он ответил: «Молодые говорят — чтобы шли. Те, кому больше шестидесяти, говорят — чтобы были целые».

Мои часы стоят в ящике уже четыре года. Я знаю, что я скажу, когда пойду к нему.`,
      objectives: [
        'Encadenar subordinadas con что, если, когда, чтобы, потому что.',
        'Declinar el relativo который según su función en la subordinada.',
        'Distinguir dos preguntas que suenan como una sola.',
      ],
      vocabulary: [
        { surface: 'мастерская', gloss: 'taller' },
        { surface: 'чинит', lemma: 'чинить', gloss: 'arregla, repara' },
        { surface: 'приносят', lemma: 'приносить', gloss: 'traen' },
        { surface: 'остановились', lemma: 'остановиться', gloss: 'se pararon' },
        { surface: 'свадьбу', lemma: 'свадьба', gloss: 'boda' },
        { surface: 'целые', lemma: 'целый', gloss: 'enteros, intactos' },
        { surface: 'ящике', lemma: 'ящик', gloss: 'cajón' },
        { surface: 'дороже', lemma: 'дорогой', gloss: 'más caro' },
      ],
      culturalNote: 'Los relojes mecánicos soviéticos —Rakéta, Poliot, Vostok— se heredan mucho en Rusia, y su valor es casi siempre sentimental: repararlos cuesta más de lo que valen.',
      spanishSpeakerNote: 'El relativo который se declina según lo que hace en su frase: «часы, которые остановились» (sujeto) frente a «те, кому больше шестидесяти» (dativo). El español usa «que» y «a quienes» sin cambiar la palabra.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué entendió Rustam con los años?',
          options: [
            ['historia', 'Que la gente no le trae relojes sino historias, y que hay dos maneras distintas de arreglarlos'],
            ['negocio', 'Que reparar relojes ya no es rentable'],
            ['nuevos', 'Que es mejor vender relojes nuevos'],
          ],
          answer: 'historia',
          evidence: 'Люди, которые приносят ему часы, обычно приносят не часы. Они приносят историю … механизм — это только половина.',
          correct: 'Sí, y de ahí sale su pregunta doble.',
          incorrect: 'No habla de rentabilidad ni de vender. Busca la frase «приносят не часы».',
          strategy: 'Cuando el texto dice «no traen X, traen Y», ahí empieza la tesis.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Desde cuándo trabaja Rustam en ese taller?',
          options: [
            ['1987', 'Desde 1987'],
            ['1961', 'Desde 1961'],
            ['diez', 'Desde hace diez años'],
          ],
          answer: '1987',
          evidence: 'Его зовут Рустам, ему шестьдесят три года, и он работает здесь с 1987 года.',
          correct: 'Correcto, y los diez años son los primeros, cuando aún creía que el oficio era el mecanismo.',
          incorrect: 'Los diez años son el periodo en que pensaba otra cosa. Busca la fecha con «с».',
          strategy: 'La preposición «с» + año indica el punto de partida de algo que sigue.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'Los clientes piden a veces que el reloj esté «целый». ¿Qué significa?',
          options: [
            ['entero', 'Entero, completo, sin piezas cambiadas'],
            ['limpio', 'Limpio por dentro'],
            ['caro', 'De valor'],
          ],
          answer: 'entero',
          evidence: 'Если человек отвечает «чтобы были целые», Рустам чинит старый — дольше и дороже.',
          correct: 'Eso es: se opone a poner un mecanismo nuevo, y por eso cuesta más.',
          incorrect: 'Se opone a «новый механизм»: no habla de limpieza ni de precio, aunque salga más caro.',
          strategy: 'Si una opción se opone a otra en el texto, defínela por contraste.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué los mayores de sesenta piden que el reloj esté entero y no que ande?',
          options: [
            ['objeto', 'Porque para ellos el reloj vale como objeto heredado, no como aparato de uso'],
            ['dinero', 'Porque la reparación entera es más barata'],
            ['vista', 'Porque ya no ven bien la hora'],
          ],
          answer: 'objeto',
          evidence: 'Иногда человек хочет только, чтобы они лежали в ящике и были целые … «Те, кому больше шестидесяти, говорят — чтобы были целые».',
          correct: 'Sí, y el propio texto lo dice antes: hay quien solo quiere que esté en el cajón.',
          incorrect: 'El texto dice que esa opción es más cara, y no se habla de la vista. Cruza las dos frases.',
          strategy: 'Para inferir, cruza la respuesta de un personaje con una explicación anterior del narrador.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: el narrador tiene un reloj guardado en un cajón desde hace cuatro años.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Мои часы стоят в ящике уже четыре года. Я знаю, что я скажу, когда пойду к нему.',
          correct: 'Verdadero, y la frase siguiente insinúa qué va a pedir.',
          incorrect: 'Busca la penúltima frase del texto: habla de sus propios relojes.',
          strategy: 'Cuando el narrador aparece al final hablando de sí mismo, ahí hay un dato concreto.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena el retrato.',
          options: [
            ['p1', 'El taller, el nombre y los años de oficio'],
            ['p2', 'Que la gente trae historias, no relojes'],
            ['p3', 'La pregunta doble y las dos formas de arreglar'],
            ['p4', 'Qué contestan los jóvenes y qué los mayores'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'На улице Баумана в Казани есть маленькая мастерская … Люди, которые приносят ему часы … Он всегда спрашивает одно … Я спросил, что выбирают чаще.',
          correct: 'Correcto: lugar, hallazgo, método y datos.',
          incorrect: 'Fíjate en dónde aparece la pregunta doble y dónde la comparación por edades.',
          strategy: 'Un retrato de oficio suele acabar con lo que el oficio enseña sobre la gente.',
        },
      ],
      production: {
        prompt: 'Escribe 8–10 frases en ruso sobre alguien que arregla o hace algo con las manos. Usa cuatro oraciones con который y tres subordinadas con что o если.',
        minWords: 45, maxWords: 90,
        hints: ['Есть мастерская, где…', 'Люди, которые приносят часы…', 'Он всегда спрашивает, нужно ли…', 'Если человек отвечает…, он…'],
      },
    },
    // ---------------------------------------------------------------- 7
    {
      slug: 'esli-by-ya-nachala-ranshe',
      title: 'Si hubiera empezado antes',
      genre: 'confesión',
      topic: 'aprender a nadar a los cincuenta y uno',
      tags: ['ruso a2', 'lectura', 'condicional con бы', 'verbos reflexivos'],
      intro: 'Treinta años de miedo al agua, cuatro meses de clases, y una primera sesión entera sentada en el borde. Lectura de ruso A2.',
      mission: 'Averigua qué le faltaba en realidad, si no era valentía.',
      seoTitle: 'Lectura de ruso A2: si hubiera empezado antes | WeLearn',
      seoDescription: 'Lee una confesión en ruso A2 y practica el condicional con бы y los verbos reflexivos. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['condicional', 'pronombres-reflexivos', 'pronombres-personales'],
      text: `Я научилась плавать в пятьдесят один год.

До этого я боялась воды тридцать лет. Не глубокой воды — любой. В детстве я упала в реку под Тверью, и меня вытащил сосед. Я не помню этого. Я помню только то, что мне рассказывали.

Если бы я начала в двадцать лет, было бы легче. Тело моложе, и стыда меньше. Но в двадцать я не могла даже подойти к бассейну.

В сорок девять я записалась в группу и не пришла. В пятьдесят я записалась снова и пришла один раз.

В пятьдесят один я нашла тренера, которая работает только со взрослыми, которые боятся. Она называет нас «мои взрослые». Нас было шесть человек: пять женщин и один мужчина, все от сорока до семидесяти.

Первое занятие мы не входили в воду. Мы сидели на краю бассейна и опускали ноги. Сорок минут. Я заплатила деньги, чтобы сидеть на краю, и это было правильно.

Через четыре месяца я проплыла двадцать пять метров.

Если бы мне сказали в двадцать лет, что это займёт тридцать лет и четыре месяца, я бы не поверила. Тридцать лет — это страх. Четыре месяца — это работа. Я всё время думала, что мне нужно больше смелости. Мне нужен был только правильный тренер.`,
      objectives: [
        'Construir el condicional con бы: если бы я начала, было бы легче.',
        'Conjugar verbos reflexivos en pasado: научилась, боялась, записалась.',
        'Separar el tiempo de miedo del tiempo de trabajo real.',
      ],
      vocabulary: [
        { surface: 'плавать', gloss: 'nadar' },
        { surface: 'боялась', lemma: 'бояться', gloss: 'tenía miedo' },
        { surface: 'вытащил', lemma: 'вытащить', gloss: 'sacó (del agua)' },
        { surface: 'стыда', lemma: 'стыд', gloss: 'vergüenza' },
        { surface: 'бассейна', lemma: 'бассейн', gloss: 'piscina' },
        { surface: 'краю', lemma: 'край', gloss: 'borde' },
        { surface: 'проплыла', lemma: 'проплыть', gloss: 'nadé (una distancia)' },
        { surface: 'смелости', lemma: 'смелость', gloss: 'valentía' },
      ],
      culturalNote: 'En Rusia hay clases de natación específicas para adultos con miedo al agua, a menudo llamadas «para los que no flotan». Empezar sin entrar en el agua es un método reconocido.',
      spanishSpeakerNote: 'El condicional ruso es más simple que el español: una sola partícula, бы, con el verbo en pasado. «Если бы я начала…, было бы легче» sirve para hipótesis presentes y pasadas. No hay que elegir tiempo.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Cuál es la conclusión de la narradora?',
          options: [
            ['tren', 'Que no le faltaba valentía: le faltaba la profesora adecuada'],
            ['edad', 'Que a los cincuenta ya es tarde para aprender'],
            ['rio', 'Que el accidente del río le arruinó la vida'],
          ],
          answer: 'tren',
          evidence: 'Я всё время думала, что мне нужно больше смелости. Мне нужен был только правильный тренер.',
          correct: 'Sí, y son las dos últimas frases: una corrige a la otra.',
          incorrect: 'Aprendió a los cincuenta y uno, así que no es tarde, y el río es el origen, no la conclusión.',
          strategy: 'Si las dos últimas frases se contradicen, la segunda es la conclusión.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué hicieron en la primera clase?',
          options: [
            ['borde', 'Se sentaron en el borde y metieron los pies, cuarenta minutos'],
            ['nadar', 'Nadaron veinticinco metros'],
            ['teoria', 'Dieron una clase teórica'],
          ],
          answer: 'borde',
          evidence: 'Первое занятие мы не входили в воду. Мы сидели на краю бассейна и опускали ноги. Сорок минут.',
          correct: 'Correcto, y ella dice que pagar por eso estuvo bien.',
          incorrect: 'Los veinticinco metros llegan cuatro meses después. Busca la primera clase.',
          strategy: 'Los ordinales («первое занятие») te llevan al momento exacto.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'Dice que a los veinte habría habido menos «стыда». ¿Qué significa?',
          options: [
            ['verguenza', 'Vergüenza'],
            ['tiempo', 'Tiempo libre'],
            ['dinero', 'Dinero'],
          ],
          answer: 'verguenza',
          evidence: 'Если бы я начала в двадцать лет, было бы легче. Тело моложе, и стыда меньше.',
          correct: 'Eso es, y va emparejado con el cuerpo más joven: dos razones, una física y una social.',
          incorrect: 'La frase compara dos ventajas de tener veinte años, y una es el cuerpo. La otra no es material.',
          strategy: 'Si dos cosas van emparejadas en una comparación, suelen ser de tipos distintos: cuerpo y ánimo.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué separa «treinta años» de «cuatro meses»?',
          options: [
            ['dos', 'Porque los treinta años fueron miedo y los cuatro meses, aprendizaje real'],
            ['edad', 'Porque quiere decir que empezó demasiado tarde'],
            ['lento', 'Porque aprende más despacio que los jóvenes'],
          ],
          answer: 'dos',
          evidence: 'Тридцать лет — это страх. Четыре месяца — это работа.',
          correct: 'Sí, y lo dice con dos frases cortas y paralelas.',
          incorrect: 'No se lamenta de la edad ni se compara con nadie. Lee las dos frases con guion.',
          strategy: 'Dos frases con la misma estructura y distinto contenido están contraponiendo dos cosas.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: a los cuarenta y nueve se apuntó a un grupo y no llegó a ir.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'В сорок девять я записалась в группу и не пришла. В пятьдесят я записалась снова и пришла один раз.',
          correct: 'Verdadero, y al año siguiente fue una sola vez.',
          incorrect: 'Busca las dos frases con las edades cuarenta y nueve y cincuenta.',
          strategy: 'Cuando el texto enumera intentos por edades, léelos en orden antes de responder.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la historia.',
          options: [
            ['p1', 'La caída en el río de niña, que no recuerda'],
            ['p2', 'Dos intentos fallidos a los cuarenta y nueve y a los cincuenta'],
            ['p3', 'El grupo de adultos y la primera clase en el borde'],
            ['p4', 'Veinticinco metros a los cuatro meses'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'В детстве я упала в реку под Тверью … В сорок девять я записалась в группу и не пришла … Первое занятие мы не входили в воду … Через четыре месяца я проплыла двадцать пять метров.',
          correct: 'Correcto: origen, intentos, método y resultado.',
          incorrect: 'Guíate por «В детстве», «В сорок девять», «Первое занятие» y «Через четыре месяца».',
          strategy: 'Las edades y los plazos ordenan una confesión sin necesidad de interpretar.',
        },
      ],
      production: {
        prompt: 'Escribe 8–10 frases en ruso sobre algo que aprendiste tarde o que aún no has aprendido. Usa tres condicionales con бы y cuatro verbos reflexivos.',
        minWords: 45, maxWords: 90,
        hints: ['Я научилась плавать в пятьдесят один год.', 'Если бы я начала раньше, было бы легче.', 'Я записалась и не пришла.', 'Мне нужен был правильный тренер.'],
      },
    },
    // ---------------------------------------------------------------- 8
    {
      slug: 'skolko-lyudey-prikhodit',
      title: 'Cuánta gente viene',
      genre: 'reportaje breve',
      topic: 'un comedor gratuito y veintiocho sillas',
      tags: ['ruso a2', 'lectura', 'genitivo de cantidad', 'plurales irregulares'],
      intro: 'En septiembre vienen treinta personas; en enero, ciento cuarenta. Y hay veintiocho sillas. Lectura de ruso A2.',
      mission: 'Averigua qué es lo más difícil, y no es la comida.',
      seoTitle: 'Lectura de ruso A2: cuánta gente viene | WeLearn',
      seoDescription: 'Lee un reportaje breve en ruso A2 y practica el genitivo de cantidad y los plurales irregulares. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['genitivo-cantidad', 'plurales-irregulares', 'numeros'],
      text: `В нашем приходе на юге Москвы четыре раза в неделю работает бесплатная столовая. Я вожу туда хлеб по вторникам.

Сколько людей приходит? Это зависит от месяца.

В сентябре приходит мало людей: тридцать, сорок. В январе приходит много: сто двадцать, сто сорок. В феврале ещё больше.

Приходят разные люди. Есть несколько стариков, которые приходят каждый раз. Есть матери с детьми — обычно две или три женщины и четверо детей. Есть мужчины лет тридцати, которые приходят один раз и больше не приходят никогда: они стесняются.

Есть друзья, которые приходят вместе, потому что вдвоём легче войти в дверь.

Мы даём суп, второе и чай. Иногда есть немного мяса. Хлеба всегда достаточно, потому что хлеб дают три пекарни.

Самое трудное — не еда. Самое трудное — стулья. У нас двадцать восемь стульев, а зимой приходит сто человек. Люди стоят и ждут, и это стыдно.

В прошлом году мы попросили денег на стулья. Нам дали денег на еду. Это тоже хорошо, но стульев по-прежнему двадцать восемь.

Я вожу хлеб уже два года. Я не знаю имён почти никого, и никто не знает моего. Так проще для всех.`,
      objectives: [
        'Usar el genitivo tras cuantificadores: много людей, мало денег, несколько стариков.',
        'Formar los plurales irregulares: люди, дети, друзья, матери, стулья.',
        'Distinguir el problema declarado del problema real de un servicio.',
      ],
      vocabulary: [
        { surface: 'приходе', lemma: 'приход', gloss: 'parroquia' },
        { surface: 'столовая', gloss: 'comedor' },
        { surface: 'вожу', lemma: 'возить', gloss: 'llevo (en coche, habitualmente)' },
        { surface: 'зависит', lemma: 'зависеть', gloss: 'depende' },
        { surface: 'стесняются', lemma: 'стесняться', gloss: 'les da apuro, se cortan' },
        { surface: 'вдвоём', gloss: 'entre dos, los dos juntos' },
        { surface: 'пекарни', lemma: 'пекарня', gloss: 'panaderías' },
        { surface: 'стульев', lemma: 'стул', gloss: 'sillas' },
      ],
      culturalNote: 'Muchos comedores gratuitos rusos los llevan parroquias con voluntarios y donaciones de panaderías del barrio. Las ayudas suelen concederse para comida y casi nunca para mobiliario.',
      spanishSpeakerNote: 'Las palabras de cantidad piden genitivo plural: «много людей», «мало денег», «несколько стариков». Y varios plurales son irregulares: человек hace люди, ребёнок hace дети, друг hace друзья.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Cuál es el problema real del comedor?',
          options: [
            ['sillas', 'Que hay veintiocho sillas para cien personas y la gente come de pie'],
            ['comida', 'Que falta comida en invierno'],
            ['voluntarios', 'Que no hay suficientes voluntarios'],
          ],
          answer: 'sillas',
          evidence: 'Самое трудное — не еда. Самое трудное — стулья … Люди стоят и ждут, и это стыдно.',
          correct: 'Sí, y el texto descarta expresamente la comida.',
          incorrect: 'El texto dice que de pan hay siempre bastante, y no habla de voluntarios. Busca las dos frases con «самое трудное».',
          strategy: 'Cuando un texto repite «lo más difícil» dos veces, la segunda es la verdadera.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuánta gente viene en enero?',
          options: [
            ['120140', 'Entre ciento veinte y ciento cuarenta'],
            ['3040', 'Entre treinta y cuarenta'],
            ['28', 'Veintiocho'],
          ],
          answer: '120140',
          evidence: 'В сентябре приходит мало людей: тридцать, сорок. В январе приходит много: сто двадцать, сто сорок.',
          correct: 'Correcto: las treinta o cuarenta son de septiembre.',
          incorrect: 'Los veintiocho son las sillas, y treinta o cuarenta es septiembre. Empareja cada cifra con su mes.',
          strategy: 'Empareja cada número con lo que cuenta: personas, meses, sillas.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'Los hombres de treinta años vienen una vez porque «стесняются». ¿Qué significa?',
          options: [
            ['apuro', 'Les da apuro, se cortan'],
            ['enfado', 'Se enfadan'],
            ['prisa', 'Tienen prisa'],
          ],
          answer: 'apuro',
          evidence: 'Есть мужчины лет тридцати, которые приходят один раз и больше не приходят никогда: они стесняются.',
          correct: 'Eso es, y encaja con la frase siguiente sobre entrar por la puerta entre dos.',
          incorrect: 'No hay enfado ni prisa: el texto explica por qué no vuelven. Fíjate en la frase siguiente.',
          strategy: 'Si la frase siguiente habla de lo difícil que es entrar, la palabra anterior habla de pudor.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué dice que es mejor no saberse los nombres?',
          options: [
            ['pudor', 'Porque el anonimato le quita apuro a quien viene a comer'],
            ['memoria', 'Porque son demasiados para recordarlos'],
            ['norma', 'Porque la parroquia lo prohíbe'],
          ],
          answer: 'pudor',
          evidence: 'они стесняются … Я не знаю имён почти никого, и никто не знает моего. Так проще для всех.',
          correct: 'Sí, y encaja con lo que dijo antes de los hombres que no vuelven.',
          incorrect: 'No hay ninguna norma, y la razón que da es «así es más fácil para todos». Cruza esa frase con la del pudor.',
          strategy: 'Para inferir, une la frase final con la explicación de por qué alguien no vuelve.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: pidieron dinero para sillas y les dieron dinero para comida.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'В прошлом году мы попросили денег на стулья. Нам дали денег на еду. Это тоже хорошо, но стульев по-прежнему двадцать восемь.',
          correct: 'Verdadero, y el narrador lo cuenta sin reprochar nada: «это тоже хорошо».',
          incorrect: 'Busca las dos frases del penúltimo párrafo: una pide y la otra concede.',
          strategy: 'Dos frases consecutivas con «попросили» y «дали» cuentan una petición y su respuesta.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena el reportaje.',
          options: [
            ['p1', 'Qué es el comedor y cuándo abre'],
            ['p2', 'Cuánta gente viene según el mes'],
            ['p3', 'Quiénes vienen: mayores, madres, hombres jóvenes'],
            ['p4', 'Las veintiocho sillas y la ayuda del año pasado'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'В нашем приходе … работает бесплатная столовая … В сентябре приходит мало людей … Приходят разные люди … У нас двадцать восемь стульев.',
          correct: 'Correcto: qué es, cuánta gente, quiénes y el problema.',
          incorrect: 'Fíjate en dónde entran las cifras por mes y dónde aparecen las sillas.',
          strategy: 'Un reportaje breve va de los datos generales al problema concreto.',
        },
      ],
      production: {
        prompt: 'Escribe 8–10 frases en ruso sobre un sitio de tu ciudad donde se ayuda a alguien. Usa cuatro cuantificadores con genitivo y tres plurales irregulares.',
        minWords: 45, maxWords: 90,
        hints: ['В сентябре приходит мало людей.', 'В январе приходит много.', 'Есть несколько стариков.', 'У нас двадцать восемь стульев.'],
      },
    },
    // ---------------------------------------------------------------- 9
    {
      slug: 'v-derevnyu-i-v-derevne',
      title: 'A la aldea y en la aldea',
      genre: 'memoria de verano',
      topic: 'una aldea de cuatro habitantes en invierno',
      tags: ['ruso a2', 'lectura', 'prepositivo avanzado', 'acusativo de dirección'],
      intro: 'Cuatro habitantes en invierno, veintidós en verano, y una tía que se aburre en julio. Lectura de ruso A2.',
      mission: 'Averigua qué contesta la tía cuando le preguntan si se aburre en invierno.',
      seoTitle: 'Lectura de ruso A2: a la aldea y en la aldea | WeLearn',
      seoDescription: 'Lee una memoria de verano en ruso A2 y practica el prepositivo y el acusativo de dirección. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['prepositivo-avanzado', 'acusativo-movimiento', 'preposiciones-lugar-v-na'],
      text: `Каждое лето я езжу в деревню под Вологдой. Не «на дачу» — в деревню. Это разные вещи, и русские слышат разницу.

В деревне живёт моя тётя, одна, в доме, который построил её отец в 1961 году. Зимой в деревне живут четыре человека. Летом — двадцать два.

Когда я в Москве, я думаю о деревне. Когда я в деревне, я не думаю о Москве. Об этом я никому не рассказываю, потому что это звучит как реклама.

В деревне нет магазина. Магазин — в соседнем селе, в шести километрах. К нам приезжает автолавка по средам и по субботам. В среду покупают хлеб. В субботу покупают всё.

В доме нет интернета, и это самое лучшее и самое трудное. Первые три дня я думаю о работе. На четвёртый день перестаю.

Моя тётя работала в школе тридцать восемь лет. Она говорит о своих учениках так, как будто им до сих пор двенадцать лет. Некоторым из них уже шестьдесят.

Я спросил её, не скучно ли ей зимой, когда в деревне четыре человека. Она подумала и ответила: «Мне скучно в июле, когда двадцать два».`,
      objectives: [
        'Distinguir в + prepositivo (lugar) de в + acusativo (dirección): в деревне frente a в деревню.',
        'Usar о + prepositivo para el tema: думаю о деревне, говорит о своих учениках.',
        'Leer una respuesta que invierte la pregunta.',
      ],
      vocabulary: [
        { surface: 'деревню', lemma: 'деревня', gloss: 'aldea, pueblo pequeño' },
        { surface: 'дачу', lemma: 'дача', gloss: 'casa de campo de fin de semana' },
        { surface: 'построил', lemma: 'построить', gloss: 'construyó' },
        { surface: 'селе', lemma: 'село', gloss: 'pueblo mayor, con iglesia' },
        { surface: 'автолавка', gloss: 'tienda ambulante en camioneta' },
        { surface: 'перестаю', lemma: 'перестать', gloss: 'dejo de hacerlo' },
        { surface: 'скучно', gloss: 'aburrido; «мне скучно» es me aburro' },
        { surface: 'учениках', lemma: 'ученик', gloss: 'alumnos' },
      ],
      culturalNote: 'La деревня es la aldea pequeña de casas de madera, y la дача es la segunda vivienda de fin de semana de la gente de ciudad. Decir una por la otra cambia por completo de qué se está hablando.',
      spanishSpeakerNote: 'La misma preposición cambia de caso según lugar o dirección: «я езжу в деревню» (voy hacia allí, acusativo) y «в деревне живёт моя тётя» (allí vive, prepositivo). Y para el tema de que se habla va о + prepositivo: «думаю о деревне».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué cuenta el texto?',
          options: [
            ['aldea', 'Una aldea casi vacía en invierno donde el narrador desconecta, y una tía que prefiere el invierno'],
            ['dacha', 'Que quiere comprarse una casa de campo'],
            ['internet', 'Que hace falta llevar internet a las aldeas'],
          ],
          answer: 'aldea',
          evidence: 'Зимой в деревне живут четыре человека. Летом — двадцать два … «Мне скучно в июле, когда двадцать два».',
          correct: 'Sí, y la respuesta final de la tía es el remate.',
          incorrect: 'No quiere comprar nada y la falta de internet la valora. Compara las cifras de invierno y verano.',
          strategy: 'Si el texto abre con dos cifras opuestas y cierra con ellas, ahí está el asunto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuándo pasa la tienda ambulante?',
          options: [
            ['mierc', 'Los miércoles y los sábados'],
            ['diario', 'Todos los días'],
            ['nunca', 'No pasa: hay que ir al pueblo de al lado'],
          ],
          answer: 'mierc',
          evidence: 'Автолавка приезжает по средам и по субботам. В среду покупают хлеб. В субботу покупают всё.',
          correct: 'Correcto, y cada día se compra una cosa distinta.',
          incorrect: 'Sí pasa, y el pueblo de al lado es donde está la tienda fija. Busca la frase con «по средам».',
          strategy: 'La estructura «по + dativo plural» indica los días en que algo se repite.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice «Не "на дачу" — в деревню». ¿Qué es una «дача»?',
          options: [
            ['casa', 'Una casa de campo de fin de semana'],
            ['aldea', 'Una aldea de casas de madera'],
            ['huerta', 'Una huerta comunal'],
          ],
          answer: 'casa',
          evidence: 'Каждое лето я езжу в деревню под Вологдой. Не «на дачу» — в деревню. Это разные вещи.',
          correct: 'Eso es, y el texto insiste en que no es lo mismo que una aldea.',
          incorrect: 'La aldea es «деревня», la otra palabra de la frase. El texto las opone precisamente.',
          strategy: 'Si el texto opone dos palabras, cada una define a la otra por contraste.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Qué quiere decir la tía con su respuesta final?',
          options: [
            ['invierno', 'Que el invierno con cuatro personas le sienta mejor que el verano con veintidós'],
            ['visitas', 'Que quiere que la visiten más en invierno'],
            ['calor', 'Que en julio hace demasiado calor'],
          ],
          answer: 'invierno',
          evidence: 'Я спросил её, не скучно ли ей зимой … Она подумала и ответила: «Мне скучно в июле, когда двадцать два».',
          correct: 'Sí: invierte la pregunta y coloca el aburrimiento justo en el mes contrario.',
          incorrect: 'No pide visitas y no habla del calor. Fíjate en qué mes menciona ella.',
          strategy: 'Si un personaje contesta con el mes contrario al de la pregunta, está invirtiendo la premisa.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: en la aldea hay una tienda.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'В деревне нет магазина. Магазин — в соседнем селе, в шести километрах.',
          correct: 'Falso: la tienda está en el pueblo de al lado, a seis kilómetros.',
          incorrect: 'Busca la frase con «нет магазина». Va seguida de dónde sí está.',
          strategy: 'La palabra «нет» + genitivo niega la existencia: localízala y tendrás la respuesta.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la información.',
          options: [
            ['p1', 'La distinción entre ir a la aldea y a la dacha'],
            ['p2', 'Cuánta gente vive allí en invierno y en verano'],
            ['p3', 'La tienda ambulante y la falta de internet'],
            ['p4', 'La tía, sus alumnos y su respuesta final'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Не «на дачу» — в деревню … Зимой в деревне живут четыре человека … Автолавка приезжает по средам … Моя тётя работала в школе тридцать восемь лет.',
          correct: 'Correcto: la distinción, los datos, la vida práctica y la persona.',
          incorrect: 'Fíjate en dónde aparece la tienda ambulante y dónde entra la tía como protagonista.',
          strategy: 'Una memoria suele dejar a la persona más importante para el final.',
        },
      ],
      production: {
        prompt: 'Escribe 8–10 frases en ruso sobre un sitio al que vuelves cada año. Usa tres veces в + prepositivo (estar) y tres veces в + acusativo (ir).',
        minWords: 45, maxWords: 90,
        hints: ['Каждое лето я езжу в деревню.', 'В деревне живёт моя тётя.', 'Когда я в Москве, я думаю о деревне.', 'В деревне нет магазина.'],
      },
    },
    // ---------------------------------------------------------------- 10
    {
      slug: 'nikogda-ne-vykhodi-s-mokrymi-volosami',
      title: 'Nunca salgas con el pelo mojado',
      genre: 'lista de consejos',
      topic: 'las ocho reglas del invierno, escritas a mano',
      tags: ['ruso a2', 'lectura', 'imperativo', 'adverbios de tiempo'],
      intro: 'Ocho reglas escritas a mano en cinco minutos por un vecino, y cada una es la mala historia de alguien. Lectura de ruso A2.',
      mission: 'Averigua a qué se refiere la regla del gorro, según el narrador.',
      seoTitle: 'Lectura de ruso A2: nunca salgas con el pelo mojado | WeLearn',
      seoDescription: 'Lee una lista de consejos en ruso A2 y practica el imperativo y los adverbios de tiempo. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['imperativo', 'adverbios-tiempo', 'tiempo-expresiones'],
      text: `Когда я приехал в Россию в октябре, мой сосед Игорь дал мне список. Он написал его от руки, за пять минут, и этот список полезнее всех сайтов о России.

«Одевайся слоями. Три тонких лучше, чем один толстый».

«Никогда не выходи на улицу с мокрыми волосами. Никогда».

«Всегда носи шапку. Не потому, что холодно. Потому что ухо болит».

«Сначала сними шапку, потом заходи в магазин. Иначе через две минуты ты вспотеешь».

«Не пей алкоголь, когда тебе холодно на улице. Сначала зайди в тепло».

«Купи вторые ботинки. Одни всегда мокрые».

«Зимой выходи раньше. Всегда раньше. Не пять минут — двадцать».

«Не держи телефон в кармане куртки. На морозе он умирает за десять минут».

«Смотри вниз, когда идёшь. Лёд не видно, лёд слышно».

«Если упал — не вставай сразу. Сначала посмотри, что болит».

Я прочитал список и подумал, что это слишком. Потом наступил январь.

Сейчас я знаю, что каждая строчка в этом списке — это чья-то плохая история. Про шапку — это про ухо Игоря в 1998 году. Про лёд — это про его руку.

Я держу список в кухне. Иногда я даю его другим иностранцам. Они тоже сначала смеются.`,
      objectives: [
        'Formar el imperativo de tú, afirmativo y negativo: одевайся, не выходи, купи, зайди.',
        'Colocar los adverbios de tiempo: сначала, потом, всегда, никогда, иногда, раньше.',
        'Reconocer que detrás de una norma práctica hay una experiencia concreta.',
      ],
      vocabulary: [
        { surface: 'слоями', lemma: 'слой', gloss: 'por capas' },
        { surface: 'тонких', lemma: 'тонкий', gloss: 'finos' },
        { surface: 'толстый', gloss: 'gordo, grueso' },
        { surface: 'шапку', lemma: 'шапка', gloss: 'gorro de invierno' },
        { surface: 'вспотеешь', lemma: 'вспотеть', gloss: 'sudarás' },
        { surface: 'ботинки', lemma: 'ботинок', gloss: 'botas, zapatos cerrados' },
        { surface: 'строчка', gloss: 'línea, renglón' },
        { surface: 'лёд', gloss: 'hielo' },
      ],
      culturalNote: 'Quitarse el gorro al entrar en un local es una norma práctica en Rusia, no de cortesía: la diferencia de temperatura entre la calle y el interior puede pasar de treinta grados.',
      spanishSpeakerNote: 'El imperativo de tú se forma quitando la terminación del presente: «выходи», «купи», «смотри». Para prohibir, se le pone «не» delante y suele ir en imperfectivo: «не выходи», «не пей».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué comprende el narrador con el tiempo?',
          options: [
            ['historia', 'Que cada línea de la lista es la mala experiencia concreta de alguien'],
            ['exagerado', 'Que la lista exageraba y no hacía falta'],
            ['frio', 'Que el invierno ruso es más suave de lo que dicen'],
          ],
          answer: 'historia',
          evidence: 'каждая строчка в этом списке — это чья-то плохая история. Про шапку — это про ухо Игоря в 1998 году.',
          correct: 'Sí, y da dos ejemplos: el oído y la mano de Ígor.',
          incorrect: 'Al principio pensó que era exagerado, y luego llegó enero. Lee el penúltimo párrafo.',
          strategy: 'Si el narrador dice «сейчас я знаю», lo que sigue es lo que aprendió.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuánto antes recomienda salir en invierno?',
          options: [
            ['veinte', 'Veinte minutos antes'],
            ['cinco', 'Cinco minutos antes'],
            ['dos', 'Dos minutos antes'],
          ],
          answer: 'veinte',
          evidence: '«Зимой выходи раньше. Всегда раньше. Не пять минут — двадцать».',
          correct: 'Correcto: los cinco minutos son justamente lo que descarta.',
          incorrect: 'Los cinco van precedidos de «не» y los dos son lo que tardas en sudar con el gorro puesto.',
          strategy: 'En la fórmula «не A — B», A es lo insuficiente y B la respuesta.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'La primera regla dice «одевайся слоями». ¿Qué significa?',
          options: [
            ['capas', 'Vístete por capas'],
            ['lana', 'Vístete de lana'],
            ['rapido', 'Vístete rápido'],
          ],
          answer: 'capas',
          evidence: '«Одевайся слоями. Три тонких лучше, чем один толстый».',
          correct: 'Eso es, y la frase siguiente lo explica: tres finas mejor que una gruesa.',
          incorrect: 'La frase siguiente compara tres prendas finas con una gruesa: habla de cantidad, no de material.',
          strategy: 'Si la frase siguiente compara cantidades, la palabra anterior habla de cómo se acumulan.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué la regla del gorro no dice «porque hace frío»?',
          options: [
            ['oido', 'Porque el motivo concreto es el dolor de oído, que Ígor sufrió en 1998'],
            ['moda', 'Porque en Rusia el gorro es cuestión de elegancia'],
            ['norma', 'Porque es obligatorio por ley'],
          ],
          answer: 'oido',
          evidence: '«Всегда носи шапку. Не потому, что холодно. Потому что ухо болит» … Про шапку — это про ухо Игоря в 1998 году.',
          correct: 'Sí, y el narrador lo ata al final con la fecha exacta.',
          incorrect: 'No es elegancia ni ley: la propia regla descarta el frío como razón. Cruza la regla con el penúltimo párrafo.',
          strategy: 'Cuando una regla niega el motivo obvio, el verdadero está en otra parte del texto.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: Ígor escribió la lista a mano en unos cinco minutos.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Он написал его от руки, за пять минут, и этот список полезнее всех сайтов о России.',
          correct: 'Verdadero, y el narrador la considera más útil que cualquier web.',
          incorrect: 'La respuesta está en la primera frase larga del texto.',
          strategy: 'La estructura «за + tiempo» dice cuánto se tardó en completar algo.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena las reglas según el texto.',
          options: [
            ['p1', 'Vístete por capas'],
            ['p2', 'Nunca salgas con el pelo mojado'],
            ['p3', 'Lleva siempre gorro'],
            ['p4', 'Quítatelo antes de entrar en una tienda'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: '«Одевайся слоями…» «Никогда не выходи на улицу с мокрыми волосами…» «Всегда носи шапку…» «Сначала сними шапку, потом заходи в магазин…»',
          correct: 'Correcto: el texto pone cada regla en su propia línea.',
          incorrect: 'Cada regla va entre comillas y en una línea distinta: sigue ese orden.',
          strategy: 'Si el texto separa las reglas en líneas, el orden ya está dado.',
        },
      ],
      production: {
        prompt: 'Escribe 8–10 frases en ruso con consejos para alguien que llega a tu ciudad. Usa cinco imperativos, dos de ellos negativos, y cuatro adverbios de tiempo.',
        minWords: 45, maxWords: 90,
        hints: ['Одевайся слоями.', 'Никогда не выходи с мокрыми волосами.', 'Сначала сними шапку, потом заходи.', 'Зимой выходи раньше.'],
      },
    },
  ],
}
