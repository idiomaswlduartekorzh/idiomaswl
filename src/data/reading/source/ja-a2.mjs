// Lectura — Japonés A2. Diez lecturas.
//
// Fuente de verdad. Los JSON se generan con `node scripts/build-reading-exercises.mjs --write`.
//
// Criterio del nivel
// -----------------
// Las diez cubren los 20 temas de gramática de japonés A2 —dos por lectura— y cada una
// arrastra un tema de A1. Banda: 300-400 CARACTERES y densidad de kanji del 12 al 30 %.
//
// AQUÍ DESAPARECEN LOS ESPACIOS. En A1 los textos iban separados por palabras, que es la
// convención de los materiales para principiantes. En A2 se escriben como se escribe de
// verdad: sin espacios. Lo que segmenta ahora es el kanji, y por eso la banda de densidad
// sube del 12 % al 30 %: el kanji no es un adorno de dificultad, es lo que hace legible el
// japonés corrido. Sin él, 350 caracteres seguidos de kana son un muro.
//
// A2 estrena la forma て y todo lo que cuelga de ella: encadenar acciones, el estado con
// ている, el permiso con てもいい, la simultaneidad con ながら. Es el nivel donde el japonés
// deja de ser una lista de frases y empieza a tener párrafos.
//
// ⚠️ Sigue el hueco declarado en A1: `scriptSupport.furigana: true` es obligatorio para el
// guardián y `ReadingLesson.tsx` no lo pinta. El apoyo lo dan las lecturas en kana del
// vocabulario, que el runner sí pinta. Es trabajo de motor, no de contenido.

const A1_GRAMMAR = [
  'adverbios-frecuencia', 'arimasu-imasu', 'conjunciones', 'desu-masu',
  'estructura-sov-particulas', 'expresiones-cotidianas', 'hiragana-basico', 'i-keiyoshi',
  'interrogativos-ka', 'jikan-tiempo', 'katakana-basico', 'masu-kei-conjugacion',
  'na-keiyoshi', 'negacion-completa', 'numeros-contadores', 'particula-de-e',
  'particula-wa-ga', 'particula-wo-ni', 'tai-form', 'te-form-permission',
]

const A2_GRAMMAR = [
  'ageru-morau-kureru-a2', 'dake-shika-bakari-a2', 'deshou-a2', 'hikaku-a2',
  'kamoshirenai-a2', 'kanoukei-a2', 'mae-ni-ato-de-a2', 'n-desu-a2', 'nagara-a2',
  'nakereba-naranai-a2', 'noun-modification-a2', 'ta-koto-ga-aru-a2', 'tara-condicional-a2',
  'tari-tari-a2', 'te-form-sequence-a2', 'te-iru-a2', 'te-mo-ii-a2', 'to-condicional-a2',
  'to-omoimasu-a2', 'ukemi-a2',
]

export default {
  language: 'ja',
  variant: 'ja-JP',
  cefr: 'A2',
  displayLabel: 'Japonés A2',
  tutorLocales: ['es'],
  status: 'draft',
  seriesId: 'japones-a2-lectura-10',
  jlpt: 'N4',
  mappingDisclaimer: {
    es: 'La equivalencia entre el MCER y el JLPT es aproximada: son dos escalas distintas, con exámenes distintos. A2 se sitúa alrededor del N4, pero no es una correspondencia oficial.',
  },
  allowedGrammar: [...A1_GRAMMAR, ...A2_GRAMMAR],
  disallowedGrammar: ['keigo (尊敬語・謙譲語)', 'causativo-pasivo', 'japonés clásico', 'registro periodístico nominal'],
  maxOutOfLevelVocabularyPercent: 6,
  inferenceBand: 'light',
  scriptSupport: { furigana: true, romanization: 'a0-only', stressMarks: false, tokenizationMode: 'custom' },
  targetCanDo:
    'Puedes seguir un texto japonés escrito sin espacios, encadenar lo que ocurre con la forma て, distinguir un estado de una acción, y justificar tu respuesta con la frase exacta.',
  assessor: 'Preflight editorial — falta confirmación de hablante nativo',
  assessedAt: '2026-08-18T00:00:00-05:00',
  levelNotes: 'Forma て y sus usos, ている, condicionales たら y と, comparativos, pasiva sencilla. Sin keigo ni causativo-pasivo. Sin espacios: el kanji segmenta. Furigana declarado pero no implementado en el runner.',
  lastModified: '2026-08-18T00:00:00-05:00',
  review: {
    author: 'José David Duarte Silva',
    languageReviewer: 'Pendiente',
    pedagogyReviewer: 'Pendiente',
    reviewedAt: '2026-08-18T00:00:00-05:00',
    copyrightChecked: true,
    cultureChecked: true,
    aiAssisted: true,
    aiUseNote: 'Borrador asistido por IA. Falta revisión de lengua por hablante nativo de japonés y revisión pedagógica antes de publicar.',
    languageDecision: 'pending',
    pedagogyDecision: 'pending',
  },

  exercises: [
    // ---------------------------------------------------------------- 1
    {
      slug: 'shinbun-o-tori-ni-iku',
      title: 'Ir a por el periódico',
      genre: 'relato en primera persona',
      topic: 'una rutina de veinte años a la que le falta un paso',
      tags: ['japones a2', 'lectura', 'forma て encadenada', 'ている'],
      intro: 'Cuatro acciones en el mismo orden durante veinte años. Una desaparece y las manos se le paran en la cocina. Lectura de japonés A2.',
      mission: 'Averigua qué le dijo su mujer esta mañana.',
      seoTitle: 'Lectura de japonés A2: ir a por el periódico | WeLearn',
      seoDescription: 'Lee un relato en japonés A2 y practica la forma て encadenada y ている. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['te-form-sequence-a2', 'te-iru-a2', 'masu-kei-conjugacion'],
      text: `朝起きて、顔を洗って、コーヒーを入れて、それから新聞を取りに行く。二十年間、毎朝この順番でやっている。

先月、新聞の配達が止まった。近所の店が閉まったからだ。

朝の順番が一つ消えた。たった一つだけだ。でも私はとても困っている。

コーヒーを入れた後、何をすればいいか分からない。台所に立って、手が止まってしまう。二分か三分、何もしないで立っている。

妻はそれを見て笑っている。「散歩に行けばいいでしょう」と言っている。

それで先週から、コーヒーを飲んだ後、外を十分歩いている。空気は冷たいが、悪くない。

でもまだ慣れていない。歩きながら、いつも新聞のことを考えている。

二十年やっていることは、習慣ではないと思う。習慣なら、変えられる。これは体の一部だ。

今朝、妻が私に言った。「あなたは新聞を読みたいんじゃない。取りに行きたいんです。」

たぶん、そのとおりだ。`,
      objectives: [
        'Encadenar acciones con la forma て: 起きて、洗って、入れて.',
        'Distinguir ている de estado (困っている) de ている de acción en curso (歩いている).',
        'Separar la costumbre del gesto físico.',
      ],
      vocabulary: [
        { surface: '順番', reading: 'じゅんばん', gloss: 'orden, secuencia' },
        { surface: '配達', reading: 'はいたつ', gloss: 'reparto a domicilio' },
        { surface: '困って', reading: 'こまって', gloss: 'estar en apuros, no saber qué hacer' },
        { surface: '台所', reading: 'だいどころ', gloss: 'cocina' },
        { surface: '散歩', reading: 'さんぽ', gloss: 'paseo' },
        { surface: '慣れて', reading: 'なれて', gloss: 'acostumbrarse' },
        { surface: '習慣', reading: 'しゅうかん', gloss: 'costumbre, hábito' },
        { surface: '一部', reading: 'いちぶ', gloss: 'una parte de algo' },
      ],
      culturalNote: 'El reparto de periódico a domicilio sigue siendo habitual en Japón y lo hacen tiendas de barrio, no grandes distribuidoras. Cuando la tienda cierra, el reparto desaparece de golpe.',
      spanishSpeakerNote: 'La forma て encadena acciones como el español encadena con «y luego». Y ている no siempre es «estar haciendo»: 困っている es un estado («estoy en apuros»), no una acción en curso.',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué le pasa al narrador?',
          options: [['orden','Que al desaparecer un paso de su rutina de veinte años se le desmonta la mañana entera'],['periodico','Que echa de menos leer el periódico'],['mujer','Que discute con su mujer por el paseo']],
          answer: 'orden',
          evidence: '朝の順番が一つ消えた。たった一つだけだ。でも私はとても困っている。',
          correct: 'Sí, y el final lo confirma: no echa de menos leerlo, sino ir a por él.',
          incorrect: 'Su mujer se ríe, no discute, y al final se descarta lo de leer. Busca la frase con 順番が一つ消えた.',
          strategy: 'Si el texto insiste en que solo cambió una cosa pequeña, el efecto desproporcionado es el tema.' },
        { type: 'detail', skill: 'detail', prompt: '¿Por qué dejó de llegar el periódico?',
          options: [['tienda','Porque cerró la tienda del barrio que lo repartía'],['cancelo','Porque él canceló la suscripción'],['precio','Porque subió demasiado de precio']],
          answer: 'tienda',
          evidence: '先月、新聞の配達が止まった。近所の店が閉まったからだ。',
          correct: 'Correcto, y la razón va con からだ al final.',
          incorrect: 'No lo canceló él ni se habla de precio. Busca la frase con 店が閉まった.',
          strategy: 'La fórmula …からだ cierra una frase dando la causa de la anterior.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa 慣れていない?',
          options: [['acostumbrado','Que todavía no se ha acostumbrado'],['cansado','Que está cansado'],['enfadado','Que está enfadado']],
          answer: 'acostumbrado',
          evidence: 'でもまだ慣れていない。歩きながら、いつも新聞のことを考えている。',
          correct: 'Eso es: lleva una semana paseando y sigue pensando en el periódico.',
          incorrect: 'Va con まだ (todavía) y con una semana de paseos: habla de adaptación, no de ánimo.',
          strategy: 'El adverbio まだ con verbo negativo indica que algo aún no ha ocurrido.' },
        { type: 'inference', skill: 'inference', prompt: '¿Qué quiere decir su mujer con la frase final?',
          options: [['ir','Que lo que echa de menos no es la lectura, sino el acto de ir a buscarlo'],['viejo','Que se está haciendo mayor'],['comprar','Que debería comprarlo en otra tienda']],
          answer: 'ir',
          evidence: '「あなたは新聞を読みたいんじゃない。取りに行きたいんです。」 たぶん、そのとおりだ。',
          correct: 'Sí, y él lo acepta en la frase siguiente.',
          incorrect: 'No le propone otra tienda ni habla de su edad. Lee su frase entera, que tiene dos mitades.',
          strategy: 'La estructura …んじゃない。…んです corrige una idea y pone la verdadera en su lugar.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: desde la semana pasada sale a caminar diez minutos después del café.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'vrai',
          evidence: 'それで先週から、コーヒーを飲んだ後、外を十分歩いている。',
          correct: 'Verdadero, y dice que el aire frío no está mal.',
          incorrect: 'Busca la frase que empieza por それで先週から.',
          strategy: 'La expresión …てから／…後 sitúa una acción después de otra: úsala para localizar la frase.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena el relato.',
          options: [['p1','Las cuatro acciones de la mañana durante veinte años'],['p2','Cierra la tienda y se acaba el reparto'],['p3','Se queda parado en la cocina sin saber qué hacer'],['p4','Empieza a pasear y su mujer le explica por qué']],
          answer: ['p1','p2','p3','p4'],
          evidence: '朝起きて、顔を洗って… 先月、新聞の配達が止まった… 台所に立って、手が止まってしまう… 今朝、妻が私に言った。',
          correct: 'Correcto: rutina, ruptura, efecto y explicación.',
          incorrect: 'Guíate por 先月, 先週から y 今朝.',
          strategy: 'Las marcas de tiempo al principio de párrafo ordenan el texto.' },
      ],
      production: { prompt: 'Escribe 8–10 frases en japonés sobre tu rutina de la mañana y qué pasa si falta un paso. Usa cuatro formas て encadenadas y tres ている.', minWords: 110, maxWords: 260,
        hints: ['朝起きて、顔を洗って、…','二十年間、毎朝この順番でやっている。','とても困っている。','まだ慣れていない。'] },
    },
    // ---------------------------------------------------------------- 2
    {
      slug: 'fuji-san-ni-nobotta-koto-ga-aru',
      title: 'He subido al Fuji',
      genre: 'anécdota',
      topic: 'una frase que se repite en las presentaciones',
      tags: ['japones a2', 'lectura', 'ことがある', '前に / 後で'],
      intro: 'En Japón, a los extranjeros les preguntan siempre lo mismo. Él aprendió a contestarlo y luego dejó de hacerlo. Lectura de japonés A2.',
      mission: 'Averigua qué empezó a contestar en su lugar.',
      seoTitle: 'Lectura de japonés A2: he subido al Fuji | WeLearn',
      seoDescription: 'Lee una anécdota en japonés A2 y practica ことがある y las expresiones 前に y 後で. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['ta-koto-ga-aru-a2', 'mae-ni-ato-de-a2', 'jikan-tiempo'],
      text: `日本に来る前に、私は山に登ったことがなかった。一度もない。コロンビアの町に住んでいたが、山は見るものだった。

日本に来た後で、みんなに同じ質問をされた。「富士山に登ったことがありますか。」

三年間、私の答えは「いいえ」だった。そのたびに、少し気まずくなった。

去年の八月、友達と一緒に登った。夜十時に出発して、朝五時に頂上に着いた。とても寒かった。とても疲れた。日の出はきれいだったが、写真の方がきれいだと思った。

今は「はい、あります」と答えられる。でも、あまり言わない。

なぜか。答えた後で、会話が終わってしまうからだ。「すごいですね」で終わる。

今は違うことを言っている。「まだありません。でも、あなたは？」

すると、みんな話し始める。登った人は自分の話をする。登っていない人は「私もない」と言って、笑う。

登ったことより、その方が面白い。嘘ではない。二回目はまだ登っていないから。`,
      objectives: [
        'Usar ことがある para hablar de experiencias vividas.',
        'Situar acciones con 前に (antes de) y 後で (después de).',
        'Distinguir una respuesta correcta de una respuesta útil.',
      ],
      vocabulary: [
        { surface: '登った', reading: 'のぼった', gloss: 'subí, escalé' },
        { surface: '質問', reading: 'しつもん', gloss: 'pregunta' },
        { surface: '気まずく', reading: 'きまずく', gloss: 'incómodo, violento' },
        { surface: '出発', reading: 'しゅっぱつ', gloss: 'salida, partida' },
        { surface: '頂上', reading: 'ちょうじょう', gloss: 'cumbre' },
        { surface: '日の出', reading: 'ひので', gloss: 'amanecer' },
        { surface: '会話', reading: 'かいわ', gloss: 'conversación' },
        { surface: '嘘', reading: 'うそ', gloss: 'mentira' },
      ],
      culturalNote: 'Subir al Fuji de noche para ver el amanecer desde la cumbre es la forma habitual de hacerlo, y la pregunta «¿has subido al Fuji?» es un clásico de las presentaciones con extranjeros.',
      spanishSpeakerNote: 'ことがある no es un pasado: es «tener la experiencia de». 登ったことがある es «he subido alguna vez». Y 前に／後で ordenan: 来る前に (antes de venir), 来た後で (después de venir).',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué descubrió el narrador?',
          options: [['pregunta','Que devolver la pregunta abre conversación, y contestar «sí» la cierra'],['fuji','Que subir al Fuji no merece la pena'],['foto','Que las fotos del amanecer son mejores que el amanecer']],
          answer: 'pregunta',
          evidence: '答えた後で、会話が終わってしまうからだ。「すごいですね」で終わる … すると、みんな話し始める。',
          correct: 'Sí, y lo dice comparando qué pasa con cada respuesta.',
          incorrect: 'Lo de la foto es un comentario de pasada y no dice que no merezca la pena. Compara las dos respuestas.',
          strategy: 'Si el texto contrapone dos respuestas y sus efectos, la comparación es el asunto.' },
        { type: 'detail', skill: 'detail', prompt: '¿A qué hora llegó a la cumbre?',
          options: [['cinco','A las cinco de la mañana'],['diez','A las diez de la noche'],['ocho','En agosto, a las ocho']],
          answer: 'cinco',
          evidence: '夜十時に出発して、朝五時に頂上に着いた。',
          correct: 'Correcto: salió a las diez de la noche y llegó a las cinco.',
          incorrect: 'Las diez de la noche son la salida y agosto es el mes. Busca la frase con 頂上に着いた.',
          strategy: 'Empareja cada hora con su verbo: 出発 es salir, 着く es llegar.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa 気まずくなった?',
          options: [['incomodo','Se hacía un poco incómodo'],['enfadado','Se enfadaba'],['contento','Se ponía contento']],
          answer: 'incomodo',
          evidence: '三年間、私の答えは「いいえ」だった。そのたびに、少し気まずくなった。',
          correct: 'Eso es: cada vez que decía «no», la conversación se quedaba tensa.',
          incorrect: 'Va después de responder «no» a una pregunta esperada: describe una situación violenta, no un enfado.',
          strategy: 'Si la palabra va tras una respuesta negativa repetida, describe la incomodidad de esa escena.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué dice que su respuesta actual no es mentira?',
          options: [['segunda','Porque todavía no ha subido una segunda vez'],['nunca','Porque en realidad nunca subió'],['otro','Porque subió otra montaña, no el Fuji']],
          answer: 'segunda',
          evidence: '嘘ではない。二回目はまだ登っていないから。',
          correct: 'Sí, y es un juego con la pregunta: nadie especifica cuántas veces.',
          incorrect: 'El texto cuenta con detalle la subida de agosto. Lee la última frase.',
          strategy: 'Si el narrador justifica que algo no es mentira, la justificación está en la misma frase.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: antes de llegar a Japón ya había subido montañas en Colombia.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'faux',
          evidence: '日本に来る前に、私は山に登ったことがなかった。一度もない。',
          correct: 'Falso: dice que no lo había hecho ni una sola vez.',
          incorrect: 'Busca la primera frase del texto. Usa 前に y una negación reforzada.',
          strategy: 'La expresión 一度もない refuerza la negación: ni una sola vez.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena la anécdota.',
          options: [['p1','Antes de venir no había subido ninguna montaña'],['p2','Tres años contestando «no» a la misma pregunta'],['p3','La subida de agosto con sus amigos'],['p4','Ahora devuelve la pregunta']],
          answer: ['p1','p2','p3','p4'],
          evidence: '日本に来る前に… 三年間、私の答えは「いいえ」だった… 去年の八月、友達と一緒に登った… 今は違うことを言っている。',
          correct: 'Correcto: antes, los tres años, la subida y el presente.',
          incorrect: 'Guíate por 前に, 三年間, 去年の八月 y 今は.',
          strategy: 'Las marcas 前に y 後で, más los años, ordenan la anécdota entera.' },
      ],
      production: { prompt: 'Escribe 8–10 frases en japonés sobre algo que has hecho una vez y algo que nunca has hecho. Usa tres veces ことがある y dos veces 前に o 後で.', minWords: 110, maxWords: 260,
        hints: ['日本に来る前に、…たことがなかった。','去年の八月、…に登った。','今は「はい、あります」と答えられる。','まだ…ていない。'] },
    },
    // ---------------------------------------------------------------- 3
    {
      slug: 'ame-ga-furu-to',
      title: 'Cuando llueve',
      genre: 'escena de trabajo',
      topic: 'un restaurante que se llena los días de lluvia',
      tags: ['japones a2', 'lectura', 'condicional たら', 'condicional と'],
      intro: 'Si llueve, el restaurante se llena. La dueña lo sabe desde hace once años y ha organizado la cocina en torno a eso. Lectura de japonés A2.',
      mission: 'Averigua qué prepara los días de lluvia y por qué.',
      seoTitle: 'Lectura de japonés A2: cuando llueve | WeLearn',
      seoDescription: 'Lee una escena en japonés A2 y practica los condicionales たら y と. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['tara-condicional-a2', 'to-condicional-a2', 'conjunciones'],
      text: `駅の近くに小さい食堂がある。店長は田口さんという女の人で、十一年ここで働いている。

雨が降ると、店が混む。晴れの日より、ずっと混む。

りゆうはかんたんだ。雨の日は、みんなとおくまで行かない。近い店に入る。

田口さんはそれを知っているので、朝天気予報を見る。雨だったら、ご飯を多く炊く。晴れだったら、少なくする。

十一年間、このやり方でやっている。

「むずかしくないですよ」と田口さんは言う。「天気を見れば、その日のお客さんのかずが分かります。」

でも、一つだけむずかしいことがあるそうだ。

雨がきゅうに降ると、困る。朝晴れていて、昼から雨が降ったら、ご飯が足りなくなる。そういう日は、パンを出す。

「日本の食堂でパンを出すと、お客さんは驚きます」と田口さんは笑った。「でも、何もないよりいいでしょう。」

先月、そういう日が三回あった。田口さんはもう慣れている。

「雨の日にパンが出たら、天気予報が外れた日です」とお客さんが言った。店の中でみんな笑った。`,
      objectives: [
        'Distinguir el condicional と (consecuencia automática) del condicional たら (supuesto).',
        'Usar los conectores ので, でも, そういう.',
        'Leer una decisión de trabajo tomada a partir de un dato repetido.',
      ],
      vocabulary: [
        { surface: '食堂', reading: 'しょくどう', gloss: 'comedor, restaurante sencillo' },
        { surface: '店長', reading: 'てんちょう', gloss: 'encargado, dueño del local' },
        { surface: '混む', reading: 'こむ', gloss: 'llenarse de gente' },
        { surface: '天気予報', reading: 'てんきよほう', gloss: 'previsión del tiempo' },
        { surface: '炊く', reading: 'たく', gloss: 'cocer arroz' },
        { surface: '足りなく', reading: 'たりなく', gloss: 'no ser suficiente' },
        { surface: '驚きます', reading: 'おどろきます', gloss: 'se sorprenden' },
        { surface: '外れた', reading: 'はずれた', gloss: 'falló, no acertó' },
      ],
      culturalNote: 'El 食堂 es el comedor de barrio japonés, con menú corto y arroz cocido cada mañana en cantidad calculada. Sacar pan en un sitio así es una improvisación visible para cualquier cliente.',
      spanishSpeakerNote: 'と introduce una consecuencia que siempre ocurre: 雨が降ると、店が混む («cuando llueve, se llena»). たら plantea un supuesto concreto: 雨だったら、ご飯を多く炊く («si es día de lluvia, cuece más arroz»).',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué explica el texto?',
          options: [['prevision','Que la dueña calcula el arroz según la previsión del tiempo, porque la lluvia le llena el local'],['cierre','Que el restaurante pierde clientes cuando llueve'],['pan','Que quiere cambiar el menú y servir pan']],
          answer: 'prevision',
          evidence: '雨が降ると、店が混む … 雨だったら、ご飯を多く炊く。晴れだったら、少なくする。',
          correct: 'Sí: la lluvia llena el local y por eso el arroz se calcula con la previsión.',
          incorrect: 'Con lluvia se llena, no se vacía, y el pan es un recurso de emergencia. Busca las frases con 雨だったら.',
          strategy: 'Si un texto une un fenómeno y una decisión repetida, esa relación es el asunto.' },
        { type: 'detail', skill: 'detail', prompt: '¿Qué hace cuando la lluvia llega por sorpresa a mediodía?',
          options: [['pan','Sacar pan porque el arroz no llega'],['cerrar','Cerrar antes de tiempo'],['pedir','Pedir más arroz a otro local']],
          answer: 'pan',
          evidence: '朝晴れていて、昼から雨が降ったら、ご飯が足りなくなる。そういう日は、パンを出す。',
          correct: 'Correcto, y admite que a los clientes les sorprende.',
          incorrect: 'No cierra ni pide fuera. Busca la frase con そういう日は.',
          strategy: 'La expresión そういう日は remite al caso que se acaba de describir.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa 混む?',
          options: [['llenarse','Llenarse de gente'],['cerrar','Cerrar'],['ensuciarse','Ensuciarse']],
          answer: 'llenarse',
          evidence: '雨が降ると、店が混む。晴れの日より、ずっと混む。',
          correct: 'Eso es, y se compara con los días de sol usando より.',
          incorrect: 'Se compara con los días de sol y explica por qué la gente entra: habla de clientes.',
          strategy: 'Si la frase siguiente explica que la gente entra, el verbo describe afluencia.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué se ríen todos con el comentario del cliente?',
          options: [['prevision','Porque el pan delata que la previsión del tiempo falló ese día'],['malo','Porque el pan está malo'],['nuevo','Porque es un cliente nuevo']],
          answer: 'prevision',
          evidence: '「雨の日にパンが出たら、天気予報が外れた日です」とお客さんが言った。',
          correct: 'Sí: el cliente ha entendido el sistema entero de la cocina.',
          incorrect: 'No se dice nada del sabor ni de quién es el cliente. Fíjate en qué deduce de ver pan.',
          strategy: 'Si un personaje deduce algo a partir de un detalle, el chiste está en esa deducción.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: Taguchi lleva once años trabajando en ese local.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'vrai',
          evidence: '店長は田口さんという女の人で、十一年ここで働いている。',
          correct: 'Verdadero, y el mismo método lo lleva usando esos once años.',
          incorrect: 'Busca la primera frase larga del texto, donde se presenta a la dueña.',
          strategy: 'Los datos de una persona van en la frase donde se la presenta.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena el texto.',
          options: [['p1','El local, la dueña y sus once años'],['p2','Cuando llueve, se llena, y por qué'],['p3','El cálculo del arroz según la previsión'],['p4','Los días de lluvia imprevista y el pan']],
          answer: ['p1','p2','p3','p4'],
          evidence: '駅の近くに小さい食堂がある… 雨が降ると、店が混む… 雨だったら、ご飯を多く炊く… そういう日は、パンを出す。',
          correct: 'Correcto: el sitio, el fenómeno, el método y la excepción.',
          incorrect: 'Fíjate en dónde se explica el cálculo y dónde aparece el pan.',
          strategy: 'Un texto que explica un método deja la excepción para el final.' },
      ],
      production: { prompt: 'Escribe 8–10 frases en japonés sobre algo que cambia según el tiempo o el día. Usa tres veces と y tres veces たら.', minWords: 110, maxWords: 260,
        hints: ['雨が降ると、店が混む。','雨だったら、…する。','晴れだったら、…する。','そういう日は、…を出す。'] },
    },
    // ---------------------------------------------------------------- 4
    {
      slug: 'onigiri-bakari',
      title: 'Solo bolas de arroz',
      genre: 'escena de tienda',
      topic: 'un estudiante que compra siempre lo mismo',
      tags: ['japones a2', 'lectura', 'comparación', 'だけ・しか・ばかり'],
      intro: 'Ciento cuarenta días comprando lo mismo a la misma hora. La dependienta lo notó antes que él. Lectura de japonés A2.',
      mission: 'Averigua qué le puso un día en la bolsa.',
      seoTitle: 'Lectura de japonés A2: solo bolas de arroz | WeLearn',
      seoDescription: 'Lee una escena en japonés A2 y practica la comparación y las partículas だけ, しか y ばかり. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['hikaku-a2', 'dake-shika-bakari-a2', 'i-keiyoshi'],
      text: `大学の近くのコンビニで、毎晩十時におにぎりを二つ買っていた。はんとし、それだけだった。

安いからだ。おにぎりは百二十円で、弁当は五百八十円だ。弁当の方がおいしいが、四ばいいじょう高い。

私は奨学金しかない。だから、おにぎりばかり食べていた。

店員さんは五十歳ぐらいの女の人だった。何も言わなかった。毎晩「ありがとうございました」だけ言った。

ある夜、袋の中におにぎりが三つ入っていた。私は二つしか買っていない。

つぎの日、店員さんに言った。「一つ多かったです。」

店員さんは言った。「知っています。期限が近いものです。捨てるより、いいでしょう。」

それから週に二回ぐらい、袋の中に一つ多く入っていた。いつも期限が近いものだった。

三月に大学を卒業して、その町を出た。さいごの夜、店員さんに手紙をわたした。

店員さんは読まないで、ポケットに入れた。そして言った。「今日は四つ入れました。」`,
      objectives: [
        'Comparar con より y con 方が: 弁当の方がおいしい.',
        'Distinguir だけ, しか…ない y ばかり.',
        'Leer un gesto repetido que nadie nombra.',
      ],
      vocabulary: [
        { surface: 'おにぎり', reading: 'おにぎり', gloss: 'bola de arroz' },
        { surface: '弁当', reading: 'べんとう', gloss: 'comida preparada en caja' },
        { surface: '奨学金', reading: 'しょうがくきん', gloss: 'beca' },
        { surface: '店員', reading: 'てんいん', gloss: 'dependiente, dependienta' },
        { surface: '袋', reading: 'ふくろ', gloss: 'bolsa' },
        { surface: '期限', reading: 'きげん', gloss: 'fecha de caducidad' },
        { surface: '捨てる', reading: 'すてる', gloss: 'tirar a la basura' },
        { surface: '卒業', reading: 'そつぎょう', gloss: 'graduación' },
      ],
      culturalNote: 'Los konbini japoneses retiran la comida poco antes de su hora de caducidad y la tiran. Que un dependiente la regale no está permitido oficialmente, y por eso nunca se dice en voz alta.',
      spanishSpeakerNote: 'Tres formas de decir «solo»: だけ es neutro (二つだけ), しか exige verbo negativo y suena a escasez (奨学金しかない), y ばかり sugiere que es demasiado siempre lo mismo (おにぎりばかり).',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué cuenta el texto?',
          options: [['ayuda','Que la dependienta le fue añadiendo comida sin decirlo nunca abiertamente'],['robo','Que él se llevaba comida sin pagar'],['precio','Que los precios del konbini son abusivos']],
          answer: 'ayuda',
          evidence: '「期限が近いものです。捨てるより、いいでしょう。」… それから週に二回ぐらい、袋の中に一つ多く入っていた。',
          correct: 'Sí, y la explicación de la caducidad es la forma de no llamarlo regalo.',
          incorrect: 'Él paga siempre, y no se critican los precios. Busca lo que dice la dependienta.',
          strategy: 'Si un personaje justifica un gesto con una razón práctica, la razón es la excusa.' },
        { type: 'detail', skill: 'detail', prompt: '¿Cuánto cuesta un bentō frente a una bola de arroz?',
          options: [['580','580 yenes frente a 120'],['120','120 yenes frente a 580'],['igual','Cuestan lo mismo']],
          answer: '580',
          evidence: 'おにぎりは百二十円で、弁当は五百八十円だ … 四倍以上高い。',
          correct: 'Correcto, y el texto añade que es más de cuatro veces más caro.',
          incorrect: 'Los 120 son la bola de arroz. Busca la frase con las dos cifras.',
          strategy: 'Cuando el texto da dos precios seguidos, empareja cada uno con su producto.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa 期限が近い?',
          options: [['caducar','Que está a punto de caducar'],['nuevo','Que acaba de llegar'],['barato','Que está rebajado']],
          answer: 'caducar',
          evidence: '「期限が近いものです。捨てるより、いいでしょう。」',
          correct: 'Eso es, y por eso dice que es mejor que tirarlo.',
          incorrect: 'La frase siguiente habla de tirarlo a la basura: no es novedad ni rebaja.',
          strategy: 'Si lo siguiente es «mejor que tirarlo», el producto está por caducar.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué la dependienta guardó la carta sin leerla?',
          options: [['despues','Para leerla luego a solas y no romper el trato discreto de siempre'],['no','Porque no sabía leer'],['prisa','Porque tenía mucha prisa']],
          answer: 'despues',
          evidence: '店員さんは読まないで、ポケットに入れた。そして言った。「今日は四つ入れました。」',
          correct: 'Sí, y lo remata con la misma discreción: cuatro en vez de tres.',
          incorrect: 'No hay prisa ni problema de lectura. Fíjate en lo que dice justo después.',
          strategy: 'Si tras un gesto viene una frase en el mismo tono, el gesto es coherente con el trato de siempre.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: descubrió la bola de arroz de más al abrir la bolsa y preguntó al día siguiente.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'vrai',
          evidence: 'ある夜、袋の中におにぎりが三つ入っていた … 次の日、店員さんに言った。「一つ多かったです。」',
          correct: 'Falso: él lo descubrió al abrir la bolsa y tuvo que preguntar al día siguiente.',
          incorrect: 'Busca la noche en que aparecieron tres. La explicación llega después.',
          strategy: 'Si el narrador tiene que preguntar, es que no se lo habían dicho antes.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena la escena.',
          options: [['p1','Medio año comprando dos bolas de arroz cada noche'],['p2','Una noche aparecen tres en la bolsa'],['p3','Ella le explica lo de la caducidad'],['p4','La última noche, la carta y las cuatro']],
          answer: ['p1','p2','p3','p4'],
          evidence: '毎晩十時におにぎりを二つ買っていた… ある夜、袋の中におにぎりが三つ入っていた… 「期限が近いものです」… 最後の夜、店員さんに手紙を渡した。',
          correct: 'Correcto: rutina, anomalía, explicación y despedida.',
          incorrect: 'Guíate por ある夜, 次の日 y 最後の夜.',
          strategy: 'Las marcas de noche ordenan el relato sin ambigüedad.' },
      ],
      production: { prompt: 'Escribe 8–10 frases en japonés comparando dos cosas que compras. Usa より y 方が, y una vez cada uno de だけ, しか y ばかり.', minWords: 110, maxWords: 260,
        hints: ['おにぎりは百二十円で、弁当は五百八十円だ。','弁当の方がおいしい。','奨学金しかない。','おにぎりばかり食べていた。'] },
    },
    // ---------------------------------------------------------------- 5
    {
      slug: 'yasai-o-moratta',
      title: 'Me dieron verduras',
      genre: 'escena de vecindad',
      topic: 'bolsas de verdura en la puerta',
      tags: ['japones a2', 'lectura', 'あげる・もらう・くれる', 'てもいい'],
      intro: 'Aparecían en la puerta sin nota y sin nombre. Tardó siete meses en averiguar de quién eran. Lectura de japonés A2.',
      mission: 'Averigua qué hace ahora él con lo que le sobra.',
      seoTitle: 'Lectura de japonés A2: me dieron verduras | WeLearn',
      seoDescription: 'Lee una escena en japonés A2 y practica あげる, もらう y くれる y la construcción てもいい. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['ageru-morau-kureru-a2', 'te-mo-ii-a2', 'particula-wo-ni'],
      text: `去年の六月、うちのドアの前に袋があった。中に野菜が入っていた。名前も手紙もなかった。

次の週も、その次の週もあった。だれがくれたか分からなかった。

七か月後、やっと分かった。上の階の佐藤さんだ。畑を持っていて、夏はきゅうりとトマトが多すぎるそうだ。

私は佐藤さんに「ありがとうございます」と言った。佐藤さんは困った顔をした。

「知られたくなかったんです」と佐藤さんは言った。「お礼を言われると、次から置けなくなりますから。」

それで私は考えた。何かをあげたいが、佐藤さんは受け取らないだろう。

だから、私は別のことをした。私も多すぎるとき、下の階の学生に置くことにした。名前は書かない。

先月、その学生が階段で私に聞いた。「あの野菜、食べてもいいんですか。」

私は「知りません」と答えた。嘘だが、いい嘘だと思う。

佐藤さんは今も置いてくれる。私も置く。だれも何も言わない。`,
      objectives: [
        'Distinguir あげる (yo doy), もらう (yo recibo) y くれる (me dan a mí).',
        'Pedir y dar permiso con てもいい.',
        'Leer una cadena de favores que nadie nombra.',
      ],
      vocabulary: [
        { surface: '野菜', reading: 'やさい', gloss: 'verdura' },
        { surface: '階', reading: 'かい', gloss: 'planta de un edificio' },
        { surface: '畑', reading: 'はたけ', gloss: 'huerto' },
        { surface: 'きゅうり', reading: 'きゅうり', gloss: 'pepino' },
        { surface: 'お礼', reading: 'おれい', gloss: 'agradecimiento' },
        { surface: '受け取らない', reading: 'うけとらない', gloss: 'no lo acepta' },
        { surface: '階段', reading: 'かいだん', gloss: 'escalera' },
        { surface: '嘘', reading: 'うそ', gloss: 'mentira' },
      ],
      culturalNote: 'Repartir el excedente de un huerto entre vecinos es habitual en Japón, y a menudo se hace sin identificarse para que quien lo recibe no se sienta obligado a devolver el favor.',
      spanishSpeakerNote: 'El japonés marca la dirección del regalo: あげる es dar yo, もらう es recibir yo, y くれる es que alguien me da a mí. «佐藤さんは置いてくれる» lleva くれる porque el beneficio viene hacia el narrador.',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué hace el narrador al final?',
          options: [['cadena','Repetir el mismo gesto con otro vecino, también sin decir quién es'],['pagar','Pagarle las verduras a Satō'],['rechazar','Dejar de aceptar las bolsas']],
          answer: 'cadena',
          evidence: '私も多すぎるとき、下の階の学生に置くことにした。名前は書かない。',
          correct: 'Sí, y mantiene la regla de Satō: sin nombre.',
          incorrect: 'No paga ni rechaza nada: sigue recibiendo. Busca qué decidió hacer él.',
          strategy: 'La expresión …ことにした marca una decisión propia: ahí está lo que hace el narrador.' },
        { type: 'detail', skill: 'detail', prompt: '¿Cuánto tardó en descubrir quién dejaba las bolsas?',
          options: [['siete','Siete meses'],['seis','Seis semanas'],['ano','Un año']],
          answer: 'siete',
          evidence: '七か月後、やっと分かった。上の階の佐藤さんだ。',
          correct: 'Correcto, y el やっと indica que costó.',
          incorrect: 'Junio es cuando empezó, no cuánto tardó. Busca la frase con 七か月後.',
          strategy: 'El contador か月 cuenta meses: localízalo antes de responder.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa 受け取らない?',
          options: [['aceptar','Que no lo aceptaría'],['entender','Que no lo entendería'],['recordar','Que no lo recordaría']],
          answer: 'aceptar',
          evidence: '何かをあげたいが、佐藤さんは受け取らないだろう。',
          correct: 'Eso es: por eso busca otra forma de devolver el gesto.',
          incorrect: 'La frase habla de darle algo a Satō: lo que no haría es quedárselo.',
          strategy: 'Si la frase anterior habla de dar algo, el verbo negado es el de recibir.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué contesta «no sé» al estudiante?',
          options: [['regla','Para que el estudiante no se sienta en deuda, igual que hizo Satō con él'],['seguro','Porque no está seguro de que sean suyas'],['broma','Porque quiere gastarle una broma']],
          answer: 'regla',
          evidence: '「知りません」と答えた。嘘だが、いい嘘だと思う … 「お礼を言われると、次から置けなくなりますから。」',
          correct: 'Sí, y la razón está en la frase de Satō, varios párrafos antes.',
          incorrect: 'Sabe perfectamente que son suyas: las puso él. Cruza su mentira con lo que dijo Satō.',
          strategy: 'Para inferir, busca la regla que otro personaje formuló antes en el texto.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: Satō dejó de poner bolsas cuando el narrador le dio las gracias.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'faux',
          evidence: '佐藤さんは今も置いてくれる。私も置く。だれも何も言わない。',
          correct: 'Falso: sigue poniéndolas, y ahora los dos lo hacen.',
          incorrect: 'Busca la última línea del texto: dice qué pasa ahora.',
          strategy: 'El adverbio 今も (todavía ahora) indica que algo continúa.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena la escena.',
          options: [['p1','Aparecen bolsas sin nombre en la puerta'],['p2','Siete meses después descubre que es Satō'],['p3','Satō le explica por qué no quería que se supiera'],['p4','Él empieza a dejar bolsas al estudiante de abajo']],
          answer: ['p1','p2','p3','p4'],
          evidence: '去年の六月、うちのドアの前に袋があった… 七か月後、やっと分かった… 「知られたくなかったんです」… 下の階の学生に置くことにした。',
          correct: 'Correcto: misterio, descubrimiento, explicación y continuación.',
          incorrect: 'Guíate por 去年の六月 y 七か月後.',
          strategy: 'Las marcas de tiempo iniciales de cada párrafo ordenan el relato.' },
      ],
      production: { prompt: 'Escribe 8–10 frases en japonés sobre algo que alguien te dio o que tú diste. Usa あげる, もらう y くれる al menos una vez cada uno.', minWords: 110, maxWords: 260,
        hints: ['ドアの前に袋があった。','だれがくれたか分からなかった。','何かをあげたいが…','佐藤さんは今も置いてくれる。'] },
    },
    // ---------------------------------------------------------------- 6
    {
      slug: 'naze-nihongo-o-benkyou-suru-n-desu-ka',
      title: '¿Por qué estudias japonés?',
      genre: 'reflexión breve',
      topic: 'una pregunta que se hace siempre y una respuesta que cambia',
      tags: ['japones a2', 'lectura', 'んです', 'と思います'],
      intro: 'Cinco años dando la misma respuesta correcta. Un día dijo la verdadera y la conversación duró cuarenta minutos. Lectura de japonés A2.',
      mission: 'Averigua cuál es la respuesta que da ahora.',
      seoTitle: 'Lectura de japonés A2: ¿por qué estudias japonés? | WeLearn',
      seoDescription: 'Lee una reflexión en japonés A2 y practica んです y と思います. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['n-desu-a2', 'to-omoimasu-a2', 'desu-masu'],
      text: `日本語を勉強していると言うと、みんな同じ質問をする。「どうして日本語を勉強しているんですか。」

五年間、私の答えは同じだった。「アニメが好きだからです。」

これは本当だが、全部ではない。この答えは簡単で、みんな納得する。そして会話が終わる。

去年、京都のバーで、隣の人に同じ質問をされた。その日は疲れていて、正しい答えを考えたくなかった。

だから、本当のことを言った。

「私の国では、私はよく話す人でした。日本語では、私はあまり話せません。だから、聞く人になりました。聞く人の方が、たくさん分かると思います。」

隣の人は少し黙って、それから自分の話を始めた。四十分話した。

私は思った。正しい答えは会話を終わらせる。本当の答えは会話を始める。

今も「アニメが好きだから」と言うことがある。急いでいるときだ。

でも時間があるときは、本当のことを言う。そうすると、たいてい相手も本当のことを言ってくれる。

言葉ができないのは不便だ。でも、悪いことばかりではないと思う。`,
      objectives: [
        'Usar んです para explicar o pedir una explicación.',
        'Formular una opinión con と思います.',
        'Distinguir una respuesta correcta de una respuesta verdadera.',
      ],
      vocabulary: [
        { surface: '勉強', reading: 'べんきょう', gloss: 'estudio' },
        { surface: '納得', reading: 'なっとく', gloss: 'quedar convencido' },
        { surface: '隣', reading: 'となり', gloss: 'de al lado' },
        { surface: '正しい', reading: 'ただしい', gloss: 'correcto' },
        { surface: '黙って', reading: 'だまって', gloss: 'callado, en silencio' },
        { surface: '相手', reading: 'あいて', gloss: 'la otra persona, el interlocutor' },
        { surface: '不便', reading: 'ふべん', gloss: 'incómodo, poco práctico' },
        { surface: '急いで', reading: 'いそいで', gloss: 'con prisa' },
      ],
      culturalNote: 'La pregunta «¿por qué estudias japonés?» es casi obligatoria en cualquier primera conversación con un extranjero en Japón, y la respuesta del anime es la más frecuente y la que menos se comenta.',
      spanishSpeakerNote: 'んです pide o da una explicación, y por eso la pregunta es 勉強しているんですか y no 勉強していますか: quien pregunta espera un motivo. Y と思います marca que lo que sigue es opinión, no hecho.',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué descubrió el narrador?',
          options: [['abrir','Que la respuesta correcta cierra la conversación y la verdadera la abre'],['anime','Que el anime no es una buena razón para estudiar japonés'],['kioto','Que en Kioto la gente habla más']],
          answer: 'abrir',
          evidence: '正しい答えは会話を終わらせる。本当の答えは会話を始める。',
          correct: 'Sí, y son dos frases paralelas puestas una detrás de otra.',
          incorrect: 'Sigue usando la respuesta del anime cuando tiene prisa. Busca las dos frases paralelas.',
          strategy: 'Dos frases con la misma estructura y sentido opuesto suelen ser la tesis.' },
        { type: 'detail', skill: 'detail', prompt: '¿Cuánto duró la conversación en el bar?',
          options: [['cuarenta','Cuarenta minutos'],['cinco','Cinco años'],['diez','Diez minutos']],
          answer: 'cuarenta',
          evidence: '隣の人は少し黙って、それから自分の話を始めた。四十分話した。',
          correct: 'Correcto: cuarenta minutos, y hablando el otro.',
          incorrect: 'Los cinco años son el tiempo dando la respuesta de siempre. Busca la cifra con 分.',
          strategy: 'Empareja cada cifra con su unidad: años de costumbre, minutos de conversación.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa 納得する?',
          options: [['convencerse','Quedar convencido y no preguntar más'],['sorprenderse','Sorprenderse mucho'],['enfadarse','Molestarse']],
          answer: 'convencerse',
          evidence: 'この答えは簡単で、みんな納得する。そして会話が終わる。',
          correct: 'Eso es, y por eso la conversación se acaba ahí.',
          incorrect: 'La frase siguiente dice que la conversación termina: la gente se da por satisfecha.',
          strategy: 'Si tras la palabra la conversación se acaba, esa palabra indica satisfacción, no sorpresa.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué dijo la verdad aquel día en Kioto?',
          options: [['cansado','Porque estaba cansado y no quiso pensar la respuesta de siempre'],['bebido','Porque había bebido demasiado'],['amigo','Porque el vecino de barra era amigo suyo']],
          answer: 'cansado',
          evidence: 'その日は疲れていて、正しい答えを考えたくなかった。 だから、本当のことを言った。',
          correct: 'Sí, y el だから enlaza la causa con lo que hizo.',
          incorrect: 'No se dice que hubiera bebido ni que se conocieran. Lee la frase antes del だから.',
          strategy: 'La conjunción だから introduce la consecuencia de la frase anterior.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: ya no usa nunca la respuesta del anime.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'faux',
          evidence: '今も「アニメが好きだから」と言うことがある。急いでいるときだ。',
          correct: 'Falso: la sigue usando cuando tiene prisa.',
          incorrect: 'Busca el párrafo que empieza por 今も. Dice cuándo la usa.',
          strategy: 'La expresión ことがある indica que algo ocurre a veces: no es un abandono total.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena la reflexión.',
          options: [['p1','La pregunta que le hacen siempre'],['p2','Cinco años con la respuesta del anime'],['p3','La noche de Kioto y la respuesta verdadera'],['p4','Lo que hace ahora según el tiempo que tenga']],
          answer: ['p1','p2','p3','p4'],
          evidence: 'みんな同じ質問をする… 五年間、私の答えは同じだった… 去年、京都のバーで… 今も「アニメが好きだから」と言うことがある。',
          correct: 'Correcto: la pregunta, la costumbre, la excepción y el presente.',
          incorrect: 'Guíate por 五年間, 去年 y 今も.',
          strategy: 'Los marcadores temporales separan la costumbre de la excepción y del presente.' },
      ],
      production: { prompt: 'Escribe 8–10 frases en japonés respondiendo por qué estudias un idioma. Usa tres veces んです y tres veces と思います.', minWords: 110, maxWords: 260,
        hints: ['どうして日本語を勉強しているんですか。','アニメが好きだからです。','…と思います。','時間があるときは、本当のことを言う。'] },
    },
    // ---------------------------------------------------------------- 7
    {
      slug: 'hanko-o-motte-konakereba-naranai',
      title: 'Hay que traer el sello',
      genre: 'trámite',
      topic: 'un sello personal para abrir una cuenta',
      tags: ['japones a2', 'lectura', 'なければならない', 'potencial'],
      intro: 'Cuatro visitas al banco por un sello de madera de trescientos yenes. Y una cosa que sí pudo hacer sola. Lectura de japonés A2.',
      mission: 'Averigua qué le dijo la empleada la cuarta vez.',
      seoTitle: 'Lectura de japonés A2: hay que traer el sello | WeLearn',
      seoDescription: 'Lee un texto sobre trámites en japonés A2 y practica なければならない y la forma potencial. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['nakereba-naranai-a2', 'kanoukei-a2', 'negacion-completa'],
      text: `日本で銀行の口座を作るには、判子がなければならない。サインではだめだ。

私はそれを知らなかった。

一かいめ、パスポートだけ持って行った。「判子を持って来なければなりません」と言われた。

二かいめ、判子を買って持って行った。三百円の木の判子だ。でも住所の証明が足りなかった。

三かいめ、ぜんぶ持って行った。こんどは名前の字がちがった。判子は「ドゥアルテ」だが、カードは「ドゥアルテ・シルバ」だった。

四かいめ、私はもう何も言えなかった。書類を出して、黙って待った。

窓口の人は五十歳ぐらいの女の人だった。書類を見て、少し考えて、こう言った。

「私が直します。もう来なくていいです。」

そして自分でカードの名前を短くして、判子と同じにした。

私は「できるんですか」と聞いた。その人は答えた。「できます。だれもやらないだけです。」

今、私はその銀行しか使わない。ほかの銀行の方が近いが、行かない。`,
      objectives: [
        'Expresar obligación con なければならない.',
        'Formar el potencial: 言えない, できる, 使える.',
        'Distinguir lo que no se puede hacer de lo que nadie hace.',
      ],
      vocabulary: [
        { surface: '口座', reading: 'こうざ', gloss: 'cuenta bancaria' },
        { surface: '判子', reading: 'はんこ', gloss: 'sello personal' },
        { surface: '住所', reading: 'じゅうしょ', gloss: 'domicilio' },
        { surface: '証明', reading: 'しょうめい', gloss: 'justificante, prueba' },
        { surface: '書類', reading: 'しょるい', gloss: 'documentación' },
        { surface: '窓口', reading: 'まどぐち', gloss: 'ventanilla' },
        { surface: '直します', reading: 'なおします', gloss: 'lo corrijo' },
        { surface: '短く', reading: 'みじかく', gloss: 'más corto' },
      ],
      culturalNote: 'El 判子 —sello personal tallado— sustituye a la firma en la mayoría de trámites japoneses. Para un extranjero, el problema no es comprarlo: es que el nombre del sello coincida exactamente con el del documento.',
      spanishSpeakerNote: 'なければならない es la obligación: 判子がなければならない, «hace falta sello». Y el potencial dice lo que se puede: できます es «se puede», frente a だれもやらない, «nadie lo hace». No es lo mismo.',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué revela la cuarta visita?',
          options: [['podia','Que el problema se podía resolver desde el principio, pero nadie lo hacía'],['error','Que el banco se había equivocado con su nombre'],['ley','Que la ley cambió ese año']],
          answer: 'podia',
          evidence: '「できます。だれもやらないだけです。」',
          correct: 'Sí, y esa frase es el remate del texto.',
          incorrect: 'No hubo error del banco ni cambio de ley. Busca la respuesta de la empleada.',
          strategy: 'Cuando alguien distingue «se puede» de «nadie lo hace», ahí está la tesis.' },
        { type: 'detail', skill: 'detail', prompt: '¿Qué faltó en la segunda visita?',
          options: [['direccion','El justificante de domicilio'],['sello','El sello'],['pasaporte','El pasaporte']],
          answer: 'direccion',
          evidence: '二かいめ、判子を買って持って行った … でも住所の証明が足りなかった。',
          correct: 'Correcto: el sello ya lo llevaba.',
          incorrect: 'El sello es lo que faltó la primera vez. Busca la frase de la segunda visita.',
          strategy: 'Los ordinales 一回目, 二回目 organizan el texto: ve directo al que se pregunta.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué es un 判子?',
          options: [['sello','Un sello personal que sustituye a la firma'],['carnet','Un carnet de identidad'],['formulario','Un formulario del banco']],
          answer: 'sello',
          evidence: '判子がなければならない。サインではだめだ … 三百円の木の判子だ。',
          correct: 'Eso es: se opone a la firma y es de madera.',
          incorrect: 'El texto lo opone expresamente a la firma y dice que es de madera.',
          strategy: 'Si el texto opone la palabra a «firma», es lo que la sustituye.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué sigue usando ese banco aunque haya otros más cerca?',
          options: [['gesto','Por lo que hizo aquella empleada: alguien que resolvió en vez de repetir la norma'],['comision','Porque cobra menos comisiones'],['idioma','Porque allí hablan español']],
          answer: 'gesto',
          evidence: '「私が直します。もう来なくていいです。」… 今、私はその銀行しか使わない。ほかの銀行の方が近いが、行かない。',
          correct: 'Sí, y el texto lo deja implícito poniendo las dos cosas al final.',
          incorrect: 'No se habla de comisiones ni de idiomas. Cruza lo que hizo la empleada con la última frase.',
          strategy: 'Si el texto termina con una fidelidad sin explicarla, la causa está en la escena anterior.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: el sello le costó trescientos yenes y era de madera.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'vrai',
          evidence: '判子を買って持って行った。三百円の木の判子だ。',
          correct: 'Verdadero, y el precio bajo contrasta con las cuatro visitas que costó usarlo.',
          incorrect: 'Busca la frase de la segunda visita: da precio y material.',
          strategy: 'Los datos de un objeto suelen ir en la frase donde aparece por primera vez.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena las visitas.',
          options: [['p1','Solo con el pasaporte'],['p2','Con el sello, pero sin justificante de domicilio'],['p3','Con todo, pero el nombre no coincide'],['p4','La empleada lo arregla ella misma']],
          answer: ['p1','p2','p3','p4'],
          evidence: '一かいめ、パスポートだけ持って行った… 二かいめ、判子を買って… 三回目、全部持って行った… 四かいめ、私はもう何も言えなかった。',
          correct: 'Correcto: el texto numera las cuatro visitas.',
          incorrect: 'Sigue los ordinales 一回目 a 四回目.',
          strategy: 'Si el texto numera sus partes, el orden ya está dado.' },
      ],
      production: { prompt: 'Escribe 8–10 frases en japonés sobre un trámite que te costó varias visitas. Usa tres veces なければならない y tres formas potenciales.', minWords: 110, maxWords: 260,
        hints: ['判子がなければならない。','一回目、…を持って行った。','私はもう何も言えなかった。','「できます。だれもやらないだけです。」'] },
    },
    // ---------------------------------------------------------------- 8
    {
      slug: 'ashita-wa-yuki-deshou',
      title: 'Mañana nevará, probablemente',
      genre: 'crónica de pueblo',
      topic: 'un hombre que acierta el tiempo mejor que la previsión',
      tags: ['japones a2', 'lectura', 'でしょう', 'かもしれない'],
      intro: 'La previsión oficial dice una cosa y el señor Kudō dice otra. En el pueblo hacen caso al señor Kudō. Lectura de japonés A2.',
      mission: 'Averigua en qué se fija Kudō para acertar.',
      seoTitle: 'Lectura de japonés A2: mañana nevará, probablemente | WeLearn',
      seoDescription: 'Lee una crónica en japonés A2 y practica でしょう y かもしれない. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['deshou-a2', 'kamoshirenai-a2', 'interrogativos-ka'],
      text: `青森の小さいまちに、工藤さんという人がいる。七十四さいで、むかしは郵便局で働いていた。

工藤さんは天気がわかる。天気予報よりただしいと、まちのみんなが言う。

私はさいしょ、信じなかった。工藤さんは機械を持っていないし、べんきょうもしていない。

でも去年の十二月、テレビは「明日は晴れでしょう」と言った。工藤さんは「明日は雪かもしれない」と言った。

つぎの日、四十センチ積もった。

三月、私は工藤さんに聞いた。「どうしてわかるんですか。」

工藤さんは少し笑って、こう答えた。「鳥です。雪の前の日、鳥が低いところを飛びます。それだけです。」

ほんとうかどうか、私にはわからない。偶然かもしれない。

でも工藤さんは五十年ここにすんでいる。五十年、毎日空を見ている。それは機械ではないが、データではあるでしょう。

まちの人は天気予報も見る。そして工藤さんにも聞く。両方違うときは、工藤さんを信じる。`,
      objectives: [
        'Usar でしょう para una previsión con seguridad media.',
        'Usar かもしれない para una posibilidad más débil.',
        'Distinguir un dato acumulado de una casualidad.',
      ],
      vocabulary: [
        { surface: '郵便局', reading: 'ゆうびんきょく', gloss: 'oficina de correos' },
        { surface: '信じ', reading: 'しんじ', gloss: 'creer' },
        { surface: '機械', reading: 'きかい', gloss: 'aparato, máquina' },
        { surface: '積もった', reading: 'つもった', gloss: 'se acumuló (nieve)' },
        { surface: '鳥', reading: 'とり', gloss: 'pájaro' },
        { surface: '低い', reading: 'ひくい', gloss: 'bajo' },
        { surface: '偶然', reading: 'ぐうぜん', gloss: 'casualidad' },
        { surface: '両方', reading: 'りょうほう', gloss: 'ambos, las dos cosas' },
      ],
      culturalNote: 'Aomori es una de las regiones con más nieve del mundo habitado, con acumulaciones de varios metros al año. Saber si va a nevar no es curiosidad: cambia el día entero.',
      spanishSpeakerNote: 'でしょう y かもしれない no son lo mismo: でしょう es «probablemente sí» y かもしれない es «puede que». El texto los usa a propósito uno frente a otro: la tele dice でしょう y Kudō dice かもしれない.',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué defiende el texto?',
          options: [['datos','Que cincuenta años mirando el cielo también son datos, aunque no haya máquina'],['tele','Que la previsión oficial es inútil'],['pajaros','Que los pájaros predicen el tiempo con seguridad']],
          answer: 'datos',
          evidence: '五十年、毎日空を見ている。それは機械ではないが、データではあるでしょう。',
          correct: 'Sí, y el narrador lo dice con でしょう: es su opinión, no un hecho probado.',
          incorrect: 'La gente sigue viendo la previsión, y el narrador admite que puede ser casualidad.',
          strategy: 'Si el narrador matiza con でしょう, está proponiendo una idea, no afirmando.' },
        { type: 'detail', skill: 'detail', prompt: '¿Cuánta nieve cayó aquel día de diciembre?',
          options: [['cuarenta','Cuarenta centímetros'],['cincuenta','Cincuenta centímetros'],['nada','No nevó']],
          answer: 'cuarenta',
          evidence: 'つぎの日、四十センチ積もった。',
          correct: 'Correcto, y ese día la tele había dicho que haría sol.',
          incorrect: 'Los cincuenta son los años que lleva viviendo allí. Busca la frase con センチ.',
          strategy: 'Empareja cada cifra con su unidad: centímetros de nieve, años de vida.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa 偶然?',
          options: [['casualidad','Casualidad'],['costumbre','Costumbre'],['error','Error']],
          answer: 'casualidad',
          evidence: 'ほんとうかどうか、私にはわからない。偶然かもしれない。',
          correct: 'Eso es: el narrador admite que puede no haber relación.',
          incorrect: 'Va con かもしれない después de decir que no sabe si es cierto: habla de azar.',
          strategy: 'Si acompaña a una duda sobre la causa, la palabra se refiere al azar.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué la gente consulta las dos previsiones?',
          options: [['contraste','Porque las compara, y cuando no coinciden se fía de Kudō'],['ley','Porque la previsión oficial es obligatoria'],['duda','Porque no entienden la previsión de la tele']],
          answer: 'contraste',
          evidence: 'まちの人は天気予報も見る。そして工藤さんにも聞く。両方違うときは、工藤さんを信じる。',
          correct: 'Sí, y la última frase resuelve el empate.',
          incorrect: 'No se habla de obligación ni de dificultad para entender la tele. Lee las tres frases finales.',
          strategy: 'La expresión 両方違うとき plantea el caso en que las dos fuentes chocan.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: Kudō usa aparatos de medición para acertar el tiempo.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'faux',
          evidence: '工藤さんは機械を持っていないし、べんきょうもしていない … 「鳥です。」',
          correct: 'Falso: no tiene aparatos ni ha estudiado. Se fija en los pájaros.',
          incorrect: 'Busca la frase donde el narrador cuenta por qué no le creía al principio.',
          strategy: 'La construcción …ないし、…ないenumera dos cosas que faltan.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena la crónica.',
          options: [['p1','Quién es Kudō y qué dice el pueblo de él'],['p2','El diciembre en que la tele falló y él acertó'],['p3','Su explicación: los pájaros vuelan bajo'],['p4','Qué hace la gente cuando las dos previsiones chocan']],
          answer: ['p1','p2','p3','p4'],
          evidence: '工藤さんという人がいる… 去年の十二月、テレビは「明日は晴れでしょう」と言った… 「鳥です。」… 両方違うときは、工藤さんを信じる。',
          correct: 'Correcto: el personaje, la prueba, la explicación y el uso.',
          incorrect: 'Guíate por 去年の十二月 y 三月.',
          strategy: 'Una crónica presenta al personaje, aporta la prueba y termina con la consecuencia.' },
      ],
      production: { prompt: 'Escribe 8–10 frases en japonés sobre alguien que sabe algo sin estudiarlo. Usa tres veces でしょう y tres veces かもしれない.', minWords: 110, maxWords: 260,
        hints: ['明日は晴れでしょう。','明日は雪かもしれない。','偶然かもしれない。','両方違うときは、…を信じる。'] },
    },
    // ---------------------------------------------------------------- 9
    {
      slug: 'nagara-benkyou-shitari',
      title: 'Estudiar haciendo otra cosa',
      genre: 'cuaderno de estudiante',
      topic: 'un experimento de tres meses sobre cómo estudiar',
      tags: ['japones a2', 'lectura', 'ながら', 'たり…たり'],
      intro: 'Tres meses probando si se puede estudiar con música, con vídeo o en el tren. Con los resultados apuntados. Lectura de japonés A2.',
      mission: 'Averigua qué método le funcionó y cuál no.',
      seoTitle: 'Lectura de japonés A2: estudiar haciendo otra cosa | WeLearn',
      seoDescription: 'Lee un cuaderno de estudiante en japonés A2 y practica ながら y la forma たり…たり. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['nagara-a2', 'tari-tari-a2', 'adverbios-frecuencia'],
      text: `三か月、実験をした。日本語の勉強を、どうやったら続けられるか。

一つめ。音楽を聞きながら、漢字を書いた。まいにち三十分。けっかは悪くなかった。歌詞がない音楽なら、だいじょうぶだった。

二つめ。動画を見ながら、単語を覚えた。これはだめだった。ぜんぜん覚えられなかった。動画を見たり、電話を見たりして、勉強していない時間がはんぶんいじょうあった。

三つめ。電車の中で、立ちながら読んだ。これがいちばんよかった。りゆうはかんたんだ。電車の中では、ほかにすることがない。

つまり、「ながら」が悪いのではない。同じ目をつかう「ながら」が悪い。

音楽は耳で、漢字は目だ。だから両方できる。動画も単語も目だから、できない。

今は毎日、朝は電車で読んだり書いたりして、夜は音楽を聞きながら漢字を練習している。

三か月前より、たぶん少し上手になった。でもいちばん変わったのは、続けられるようになったことだ。`,
      objectives: [
        'Usar ながら para dos acciones simultáneas del mismo sujeto.',
        'Enumerar actividades con たり…たりする.',
        'Leer una conclusión sacada de datos propios.',
      ],
      vocabulary: [
        { surface: '実験', reading: 'じっけん', gloss: 'experimento' },
        { surface: '続けられる', reading: 'つづけられる', gloss: 'poder mantener, poder seguir' },
        { surface: '歌詞', reading: 'かし', gloss: 'letra de una canción' },
        { surface: '動画', reading: 'どうが', gloss: 'vídeo' },
        { surface: '単語', reading: 'たんご', gloss: 'palabra de vocabulario' },
        { surface: '覚え', reading: 'おぼえ', gloss: 'memorizar' },
        { surface: '練習', reading: 'れんしゅう', gloss: 'práctica' },
        { surface: '上手', reading: 'じょうず', gloss: 'hábil, bueno en algo' },
      ],
      culturalNote: 'La expresión ながら勉強 tiene mala fama en Japón y muchos profesores la desaconsejan sin matices. El texto propone una distinción más útil: depende de qué sentido usa cada tarea.',
      spanishSpeakerNote: 'ながら une dos acciones de la misma persona a la vez: 音楽を聞きながら書いた. たり…たりする enumera actividades sin orden fijo: 読んだり書いたりする, «leo y escribo, entre otras cosas».',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿A qué conclusión llega?',
          options: [['ojo','Que el problema no es hacer dos cosas, sino que las dos usen el mismo sentido'],['nunca','Que nunca hay que estudiar haciendo otra cosa'],['tren','Que solo se puede estudiar en el tren']],
          answer: 'ojo',
          evidence: 'つまり、「ながら」が悪いのではない。同じ目をつかう「ながら」が悪い。',
          correct: 'Sí, y lo explica enseguida: música al oído, kanji a la vista.',
          incorrect: 'Dos de los tres métodos le funcionaron. Busca la frase que empieza por つまり.',
          strategy: 'La palabra つまり (o sea) anuncia la conclusión de lo anterior.' },
        { type: 'detail', skill: 'detail', prompt: '¿Qué método le funcionó mejor?',
          options: [['tren','Leer de pie en el tren'],['video','Aprender vocabulario viendo vídeos'],['musica','Escribir kanji con música']],
          answer: 'tren',
          evidence: '三つめ。電車の中で、立ちながら読んだ。これがいちばんよかった。',
          correct: 'Correcto, y explica por qué: en el tren no hay otra cosa que hacer.',
          incorrect: 'Lo de la música salió bien, pero el mejor fue otro. Busca 一番よかった.',
          strategy: 'El superlativo 一番 señala el mejor de la lista: localízalo.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa 歌詞?',
          options: [['letra','La letra de la canción'],['cantante','El cantante'],['volumen','El volumen']],
          answer: 'letra',
          evidence: '歌詞がない音楽なら、だいじょうぶだった。',
          correct: 'Eso es: la música sin palabras no le estorbaba.',
          incorrect: 'Lo relevante es si la música tiene palabras o no, porque compiten con lo que escribe.',
          strategy: 'Si el texto distingue música con y sin algo, ese algo es lo que interfiere.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué funciona el tren?',
          options: [['nada','Porque allí no hay ninguna otra cosa que hacer'],['asiento','Porque va sentado y cómodo'],['gente','Porque la gente le ayuda']],
          answer: 'nada',
          evidence: 'これがいちばんよかった。りゆうはかんたんだ。電車の中では、ほかにすることがない。',
          correct: 'Sí, y el texto lo llama razón sencilla.',
          incorrect: 'Va de pie, no sentado, y no menciona a nadie. Lee la frase tras りゆうはかんたんだ.',
          strategy: 'La fórmula りゆうはかんたんだ anuncia la explicación inmediata.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: lo que más cambió en tres meses fue su capacidad de mantener el estudio.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'vrai',
          evidence: 'たぶん少し上手になった。でもいちばん変わったのは、続けられるようになったことだ。',
          correct: 'Verdadero, y el でも lo separa de la mejora de nivel, que llama pequeña.',
          incorrect: 'Busca la última frase: compara dos cambios y dice cuál es el mayor.',
          strategy: 'La estructura いちばん変わったのは…ことだ señala el cambio principal.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena el experimento.',
          options: [['p1','Música mientras escribe kanji'],['p2','Vídeo mientras memoriza vocabulario'],['p3','Leer de pie en el tren'],['p4','La conclusión sobre los sentidos']],
          answer: ['p1','p2','p3','p4'],
          evidence: '一つめ。音楽を聞きながら… 二つめ。動画を見ながら… 三つめ。電車の中で… つまり、「ながら」が悪いのではない。',
          correct: 'Correcto: el texto numera los tres métodos y cierra con la conclusión.',
          incorrect: 'Sigue 一つ目, 二つ目, 三つ目.',
          strategy: 'Los ordinales 一つ目, 二つ目 ordenan cualquier lista japonesa.' },
      ],
      production: { prompt: 'Escribe 8–10 frases en japonés sobre cómo estudias. Usa tres veces ながら y dos veces たり…たりする.', minWords: 110, maxWords: 260,
        hints: ['音楽を聞きながら、漢字を書いた。','動画を見ながら、単語を覚えた。','読んだり書いたりする。','これがいちばんよかった。'] },
    },
    // ---------------------------------------------------------------- 10
    {
      slug: 'kabe-ni-kakareta-e',
      title: 'El dibujo pintado en la pared',
      genre: 'crónica de barrio',
      topic: 'una pintada que nadie borra',
      tags: ['japones a2', 'lectura', 'pasiva', 'modificación de sustantivo'],
      intro: 'Una pintada apareció una noche en la pared de la escuela. Nadie sabe quién la hizo y nadie la ha borrado en seis años. Lectura de japonés A2.',
      mission: 'Averigua qué decidió el colegio en la reunión de padres.',
      seoTitle: 'Lectura de japonés A2: el dibujo pintado en la pared | WeLearn',
      seoDescription: 'Lee una crónica en japonés A2 y practica la voz pasiva y la modificación de sustantivos. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['ukemi-a2', 'noun-modification-a2', 'estructura-sov-particulas'],
      text: `六年前、小学校の壁に絵が描かれた。夜のうちに描かれたので、だれが描いたか分からない。

絵は大きくない。子どもが二人と、犬が一匹。青と白だけで描かれた絵だ。

次の日、校長先生は消そうとした。でも、そこでもんだいが起きた。

その絵を見た子どもたちが、消さないでほしいと言ったのだ。

保護者の会議が開かれた。二時間はなし合われた。いけんは二つに分かれた。

消すべきだと言う人のりゆうはかんたんだ。学校の壁に勝手に描くのは、いいことではない。

消さないでほしいと言う人のりゆうもかんたんだ。あの絵は子どもに好かれている。

会議で決まったことは、すこしかわっている。絵は消さない。でも、学校は「いい絵だ」とも言わない。何も言わない。

六年たった。絵はまだある。色はすこし落ちたが、まだ見える。

去年、その壁の前で写真を撮る子が増えた。だれが描いたかは、今も知られていない。`,
      objectives: [
        'Formar la pasiva: 描かれた, 開かれた, 好かれている, 知られていない.',
        'Modificar sustantivos con una oración: その絵を見た子どもたち.',
        'Leer una decisión que consiste en no decidir.',
      ],
      vocabulary: [
        { surface: '壁', reading: 'かべ', gloss: 'pared' },
        { surface: '描かれた', reading: 'かかれた', gloss: 'fue pintado' },
        { surface: '校長', reading: 'こうちょう', gloss: 'director del colegio' },
        { surface: '消そう', reading: 'けそう', gloss: 'intentar borrar' },
        { surface: '保護者', reading: 'ほごしゃ', gloss: 'padres y tutores' },
        { surface: '会議', reading: 'かいぎ', gloss: 'reunión' },
        { surface: '勝手に', reading: 'かってに', gloss: 'por su cuenta, sin permiso' },
        { surface: '増えた', reading: 'ふえた', gloss: 'aumentó' },
      ],
      culturalNote: 'Las reuniones de 保護者会 tienen peso real en las escuelas japonesas y sus acuerdos se aplican. Una decisión de «no decidir» es una salida reconocible cuando el consenso es imposible.',
      spanishSpeakerNote: 'La pasiva japonesa se usa muchísimo más que la española: 描かれた, 開かれた, 知られていない. Y para describir un sustantivo se le pone delante una oración entera: その絵を見た子どもたち, «los niños que vieron ese dibujo».',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué decidió la reunión?',
          options: [['nada','No borrarlo, pero tampoco aprobarlo: no decir nada'],['borrar','Borrarlo cuanto antes'],['premiar','Premiar a quien lo pintó']],
          answer: 'nada',
          evidence: '絵は消さない。でも、学校は「いい絵だ」とも言わない。何も言わない。',
          correct: 'Sí, y el texto lo llama «un poco raro».',
          incorrect: 'No se borra y no se sabe quién lo hizo. Busca las tres frases del acuerdo.',
          strategy: 'Si un acuerdo se describe con dos negaciones, la decisión es no pronunciarse.' },
        { type: 'detail', skill: 'detail', prompt: '¿Qué hay pintado en la pared?',
          options: [['ninos','Dos niños y un perro, en azul y blanco'],['escuela','El edificio de la escuela'],['nombre','El nombre de quien lo pintó']],
          answer: 'ninos',
          evidence: '子どもが二人と、犬が一匹。青と白だけで描かれた絵だ。',
          correct: 'Correcto, y con solo dos colores.',
          incorrect: 'No hay ningún nombre: precisamente nadie sabe quién fue.',
          strategy: 'Los contadores 人 y 匹 cuentan personas y animales: úsalos para leer la descripción.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa 勝手に?',
          options: [['sinpermiso','Por su cuenta, sin pedir permiso'],['deprisa','Muy deprisa'],['denoche','De noche']],
          answer: 'sinpermiso',
          evidence: '学校の壁に勝手に描くのは、いいことではない。',
          correct: 'Eso es: ese es el argumento de quienes querían borrarlo.',
          incorrect: 'Lo de la noche se dice con 夜のうちに, en otra frase. Aquí se habla del permiso.',
          strategy: 'Si la frase da un argumento contra algo, la palabra señala lo que se reprocha.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué el colegio no dice que el dibujo es bueno?',
          options: [['norma','Porque aprobarlo sería autorizar que se pinte sin permiso'],['feo','Porque a los profesores no les gusta'],['ley','Porque la ley se lo prohíbe']],
          answer: 'norma',
          evidence: '学校の壁に勝手に描くのは、いいことではない … 学校は「いい絵だ」とも言わない。何も言わない。',
          correct: 'Sí: callar es la única forma de no borrarlo y no autorizarlo a la vez.',
          incorrect: 'No se dice que no guste, ni se menciona ninguna ley. Cruza el argumento con el acuerdo.',
          strategy: 'Para inferir, une la objeción de un grupo con la forma del acuerdo final.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: hoy ya se sabe quién pintó el dibujo.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'faux',
          evidence: 'だれが描いたかは、今も知られていない。',
          correct: 'Falso: sigue sin saberse, y el texto lo dice en pasiva.',
          incorrect: 'Busca la última frase del texto. Termina en pasiva negativa.',
          strategy: 'La pasiva 知られていない dice que algo sigue sin conocerse.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena la crónica.',
          options: [['p1','Aparece el dibujo una noche hace seis años'],['p2','El director intenta borrarlo y los niños protestan'],['p3','La reunión de padres y el acuerdo'],['p4','Seis años después, se hacen fotos delante']],
          answer: ['p1','p2','p3','p4'],
          evidence: '六年前、小学校の壁に絵が描かれた… 校長先生は消そうとした… 保護者の会議が開かれた… 去年、その壁の前で写真を撮る子が増えた。',
          correct: 'Correcto: aparición, conflicto, acuerdo y presente.',
          incorrect: 'Guíate por 六年前, 次の日 y 去年.',
          strategy: 'Las marcas temporales ordenan la crónica de principio a fin.' },
      ],
      production: { prompt: 'Escribe 8–10 frases en japonés sobre algo que apareció en tu barrio sin que nadie supiera quién lo hizo. Usa cuatro pasivas y dos oraciones que modifiquen un sustantivo.', minWords: 110, maxWords: 260,
        hints: ['壁に絵が描かれた。','だれが描いたか分からない。','会議が開かれた。','今も知られていない。'] },
    },
  ],
}
