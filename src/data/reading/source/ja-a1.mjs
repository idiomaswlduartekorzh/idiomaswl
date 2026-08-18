// Lectura — Japonés A1. Diez lecturas.
//
// Fuente de verdad. Los JSON se generan con `node scripts/build-reading-exercises.mjs --write`.
//
// Criterio del nivel
// -----------------
// Las diez cubren los 20 temas de gramática de japonés A1. El japonés es el único idioma del
// repositorio que NO se mide en palabras: se mide en CARACTERES (文字数), porque no separa
// palabras con espacios y contar tokens no significa nada. Banda A1: 160-240 caracteres.
//
// Y una segunda medida obligatoria que ningún otro idioma tiene: la DENSIDAD DE KANJI.
// 200 caracteres en hiragana y 200 con 45 % de kanji son textos distintos, y en japonés la
// dificultad la marca la densidad, no la longitud. En A1 el máximo es 12 %.
//
// Los textos de A1 llevan ESPACIOS entre palabras. No es japonés natural: es la convención de
// los materiales para principiantes, y sirve para que quien acaba de aprender los kana pueda
// segmentar. En A2 se reducen y en B1 desaparecen, que es como se lee de verdad.
//
// ⚠️ HUECO REAL DECLARADO: el guardián exige `scriptSupport.furigana: true` en A1 y A2, y
// aquí va puesto porque es obligatorio, pero `ReadingLesson.tsx` NO PINTA furigana todavía.
// El campo existe en `types.ts` y nada lo consume. Mientras eso no se implemente, el apoyo de
// lectura lo dan las entradas de vocabulario con su `reading` en kana, que el runner sí pinta.
// Poner furigana sobre el texto corrido es trabajo de motor, no de contenido.

const A1_GRAMMAR = [
  'adverbios-frecuencia', 'arimasu-imasu', 'conjunciones', 'desu-masu',
  'estructura-sov-particulas', 'expresiones-cotidianas', 'hiragana-basico', 'i-keiyoshi',
  'interrogativos-ka', 'jikan-tiempo', 'katakana-basico', 'masu-kei-conjugacion',
  'na-keiyoshi', 'negacion-completa', 'numeros-contadores', 'particula-de-e',
  'particula-wa-ga', 'particula-wo-ni', 'tai-form', 'te-form-permission',
]

export default {
  language: 'ja',
  variant: 'ja-JP',
  cefr: 'A1',
  displayLabel: 'Japonés A1',
  tutorLocales: ['es'],
  status: 'draft',
  seriesId: 'japones-a1-lectura-10',
  jlpt: 'N5',
  mappingDisclaimer: {
    es: 'La equivalencia entre el MCER y el JLPT es aproximada: son dos escalas distintas, con exámenes distintos. A1 se sitúa alrededor del N5, pero no es una correspondencia oficial.',
  },
  allowedGrammar: A1_GRAMMAR,
  disallowedGrammar: ['forma llana (辞書形) en oración principal', 'keigo', 'condicionales', 'voz pasiva'],
  maxOutOfLevelVocabularyPercent: 5,
  inferenceBand: 'minimal',
  scriptSupport: { furigana: true, romanization: 'a0-only', stressMarks: false, tokenizationMode: 'custom' },
  targetCanDo:
    'Puedes leer un texto corto en japonés escrito casi todo en kana, identificar de quién o de qué se habla gracias a las partículas, y justificar tu respuesta señalando la frase.',
  assessor: 'Preflight editorial — falta confirmación de hablante nativo',
  assessedAt: '2026-08-18T00:00:00-05:00',
  levelNotes: 'Forma です／ます, partículas básicas, adjetivos i y na. Kanji por debajo del 12 %, con espacios entre palabras. Furigana declarado pero no implementado en el runner: el apoyo lo dan las lecturas en kana del vocabulario.',
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
      slug: 'ho-san-to-yobimasu',
      title: 'Me llaman señor Ho',
      genre: 'presentación personal',
      topic: 'un nombre que nadie puede pronunciar',
      tags: ['japones a1', 'lectura', 'です／ます', 'partículas は y が'],
      intro: 'Su apellido es imposible en japonés, así que en la empresa le pusieron otro. Al principio le pareció raro. Lectura de japonés A1.',
      mission: 'Averigua qué piensa ahora de su nombre japonés.',
      seoTitle: 'Lectura de japonés A1: me llaman señor Ho | WeLearn',
      seoDescription: 'Lee un texto corto en japonés A1 y practica la forma です／ます y las partículas は y が. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['desu-masu', 'particula-wa-ga'],
      text: `わたしの なまえは ホセ・ドゥアルテです。コロンビアから きました。

日本人の ともだちは 「ホセ」が だいじょうぶです。でも 「ドゥアルテ」は とても むずかしいです。

かいしゃの 人は わたしを 「ホーさん」と よびます。

はじめは へんでした。わたしの なまえでは ありませんから、へんじが とても おそかったです。でも 今は すきです。とても すきです。

「ホーさん」は 日本の わたしです。コロンビアの わたしと ちがいますが、これも わたしです。

ははは でんわで 「ホーさん」と いいました。とても おもしろかったです。`,
      objectives: [
        'Usar la forma です／ます en frases afirmativas y negativas.',
        'Distinguir la partícula は (tema) de が (sujeto que se destaca).',
        'Leer un texto escrito casi todo en hiragana y katakana.',
      ],
      vocabulary: [
        { surface: 'なまえ', reading: 'なまえ', gloss: 'nombre' },
        { surface: 'ともだち', reading: 'ともだち', gloss: 'amigo, amiga' },
        { surface: 'むずかしい', reading: 'むずかしい', gloss: 'difícil' },
        { surface: 'かいしゃ', reading: 'かいしゃ', gloss: 'empresa' },
        { surface: 'よびます', reading: 'よびます', gloss: 'llaman (a alguien por un nombre)' },
        { surface: 'へん', reading: 'へん', gloss: 'raro, extraño' },
        { surface: 'ちがいます', reading: 'ちがいます', gloss: 'es distinto' },
        { surface: 'でんわ', reading: 'でんわ', gloss: 'teléfono' },
      ],
      culturalNote: 'En las empresas japonesas es habitual acortar los nombres extranjeros hasta una forma pronunciable y añadirle さん. No es una falta de respeto: さん es precisamente la marca de respeto.',
      spanishSpeakerNote: 'は marca el tema («de mí, mi nombre es…») y が destaca el sujeto («“ホセ” sí es fácil»). En «「ホセ」が だいじょうぶです» el が señala cuál de los dos nombres no da problema.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿De qué trata el texto?',
          options: [
            ['nombre', 'De cómo acabó aceptando el nombre japonés que le pusieron en el trabajo'],
            ['trabajo', 'De las dificultades de encontrar trabajo en Japón'],
            ['familia', 'De una discusión con su madre por teléfono'],
          ],
          answer: 'nombre',
          evidence: 'はじめは へんでした … でも 今は すきです。',
          correct: 'Sí: primero le pareció raro y ahora le gusta.',
          incorrect: 'No se habla de buscar trabajo, y con su madre no discute. Busca las frases con はじめは y 今は.',
          strategy: 'Cuando un texto contrapone はじめは (al principio) y 今は (ahora), el cambio es el asunto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué parte de su nombre resulta difícil en japonés?',
          options: [
            ['duarte', '«ドゥアルテ»'],
            ['jose', '«ホセ»'],
            ['ambos', 'Las dos partes por igual'],
          ],
          answer: 'duarte',
          evidence: '「ホセ」が だいじょうぶです。でも 「ドゥアルテ」は とても むずかしいです。',
          correct: 'Correcto: «ホセ» no da problema, el apellido sí.',
          incorrect: 'El texto dice expresamente que una de las dos está bien. Fíjate en la partícula が.',
          strategy: 'La partícula が destaca justo el elemento que se está contrastando.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice «はじめは へんでした». ¿Qué significa へん?',
          options: [
            ['raro', 'Raro, extraño'],
            ['facil', 'Fácil'],
            ['bonito', 'Bonito'],
          ],
          answer: 'raro',
          evidence: 'はじめは へんでした。わたしの なまえでは ありません。',
          correct: 'Eso es, y la frase siguiente lo explica: no era su nombre.',
          incorrect: 'La frase siguiente aclara por qué lo sentía así: no era su nombre.',
          strategy: 'Si la frase siguiente da la razón, úsala para deducir la palabra anterior.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué le hizo gracia que su madre dijera «ホーさん»?',
          options: [
            ['dos', 'Porque su nombre japonés llegó hasta Colombia, donde no hacía falta'],
            ['error', 'Porque su madre se equivocó de nombre'],
            ['enfado', 'Porque a su madre no le gustó el nombre'],
          ],
          answer: 'dos',
          evidence: '「ホーさん」は 日本の わたしです … ははは でんわで 「ホーさん」と いいました。とても おもしろかったです。',
          correct: 'Sí: el nombre era el de su vida japonesa y apareció en una llamada familiar.',
          incorrect: 'No hay error ni enfado: dice que le pareció muy divertido. Cruza las dos frases.',
          strategy: 'Para inferir, une el final con la frase donde se define qué es ese nombre.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: en la empresa le llaman por su apellido completo.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'かいしゃの 人は わたしを 「ホーさん」と よびます。',
          correct: 'Falso: le llaman «ホーさん», que no es su apellido.',
          incorrect: 'Busca la frase con かいしゃの 人は. Dice cómo le llaman.',
          strategy: 'La estructura 「…」と よびます indica exactamente con qué nombre se dirigen a alguien.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena el texto.',
          options: [
            ['p1', 'Se presenta y dice de dónde viene'],
            ['p2', 'Explica qué parte del nombre es difícil'],
            ['p3', 'En la empresa le llaman «ホーさん»'],
            ['p4', 'Su madre lo usa por teléfono'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'わたしの なまえは ホセ・ドゥアルテです … 「ドゥアルテ」は とても むずかしいです … かいしゃの 人は … ははは でんわで …',
          correct: 'Correcto: presentación, problema, solución y remate.',
          incorrect: 'Fíjate en el orden de los párrafos: primero quién es, luego el problema.',
          strategy: 'Una presentación personal empieza siempre por el nombre y el origen.',
        },
      ],
      production: {
        prompt: 'Escribe 5–7 frases en japonés presentándote y contando algo de tu nombre. Usa です／ます y las partículas は y が.',
        minWords: 60, maxWords: 160,
        hints: ['わたしの なまえは …です。', '…から きました。', '…は むずかしいです。', '今は すきです。'],
      },
    },
    // ---------------------------------------------------------------- 2
    {
      slug: 'neko-ga-imasu',
      title: 'Hay un gato',
      genre: 'descripción de un lugar',
      topic: 'una tienda de barrio y su gato',
      tags: ['japones a1', 'lectura', 'あります／います', 'partículas を y に'],
      intro: 'En la tienda hay muchas cosas, pero lo que la gente busca al entrar es otra. Lectura de japonés A1.',
      mission: 'Averigua qué hace el gato cuando entra un cliente.',
      seoTitle: 'Lectura de japonés A1: hay un gato | WeLearn',
      seoDescription: 'Lee un texto corto en japonés A1 y practica あります／います y las partículas を y に. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['arimasu-imasu', 'particula-wo-ni'],
      text: `うちの ちかくに 小さい みせが あります。

みせの 中に パンと ぎゅうにゅうと しんぶんが あります。 それから ねこが います。

ねこの なまえは 「たまご」です。しろい ねこです。

お客さんが 入ります。 たまごは ドアの ところに います。 お客さんを 見ます。 でも うごきません。

みせの おばあさんは たまごに ごはんを あげます。 一日に 二かい あげます。

みせに ものは たくさん あります。 でも みんなは ねこを 見に 来ます。`,
      objectives: [
        'Distinguir あります (cosas) de います (seres vivos).',
        'Usar を para el objeto directo y に para el lugar o el destinatario.',
        'Leer una descripción organizada por lo que hay en un espacio.',
      ],
      vocabulary: [
        { surface: 'ちかく', reading: 'ちかく', gloss: 'cerca, en las inmediaciones' },
        { surface: 'みせ', reading: 'みせ', gloss: 'tienda' },
        { surface: 'ぎゅうにゅう', reading: 'ぎゅうにゅう', gloss: 'leche' },
        { surface: 'しんぶん', reading: 'しんぶん', gloss: 'periódico' },
        { surface: 'お客さん', reading: 'おきゃくさん', gloss: 'cliente' },
        { surface: 'うごきません', reading: 'うごきません', gloss: 'no se mueve' },
        { surface: 'ごはん', reading: 'ごはん', gloss: 'comida, arroz cocido' },
        { surface: 'たくさん', reading: 'たくさん', gloss: 'mucho, en gran cantidad' },
      ],
      culturalNote: 'Las tiendas de barrio japonesas con gato residente son bastante comunes, y el gato suele tener nombre conocido en toda la calle. «たまご» significa huevo.',
      spanishSpeakerNote: 'El japonés usa dos verbos donde el español dice «hay»: あります para cosas y います para seres vivos. Por eso «パンが あります» pero «ねこが います».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué dice el texto sobre la tienda?',
          options: [
            ['gato', 'Que tiene muchas cosas, pero la gente va a ver al gato'],
            ['cierre', 'Que la tienda va a cerrar'],
            ['precios', 'Que los precios son muy baratos'],
          ],
          answer: 'gato',
          evidence: 'みせに ものは たくさん あります。 でも みんなは ねこを 見に 来ます。',
          correct: 'Sí, y esas dos frases finales lo dicen con un でも en medio.',
          incorrect: 'No se habla de cierre ni de precios. Busca las dos frases del final.',
          strategy: 'La palabra でも (pero) avisa de que lo importante viene después.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuántas veces al día le dan de comer al gato?',
          options: [
            ['dos', 'Dos veces'],
            ['una', 'Una vez'],
            ['tres', 'Tres veces'],
          ],
          answer: 'dos',
          evidence: '一日に 二かい あげます。',
          correct: 'Correcto: 二かい son dos veces.',
          incorrect: 'El contador かい cuenta veces. Busca la frase con 一日に.',
          strategy: 'El contador かい indica número de veces: localízalo y lee la cifra que lo precede.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: '¿Qué significa うごきません?',
          options: [
            ['nomueve', 'No se mueve'],
            ['nocome', 'No come'],
            ['noduerme', 'No duerme'],
          ],
          answer: 'nomueve',
          evidence: 'たまごは ドアの ところに います。 お客さんを 見ます。 でも うごきません。',
          correct: 'Eso es: mira al cliente pero se queda donde está.',
          incorrect: 'La frase anterior dice que mira al cliente: lo que no hace es cambiar de sitio.',
          strategy: 'Si la frase anterior describe una postura, el verbo negado suele ser el de moverse.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué el gato se queda junto a la puerta?',
          options: [
            ['ver', 'Porque desde ahí ve entrar a todo el mundo sin tener que moverse'],
            ['salir', 'Porque quiere salir a la calle'],
            ['comida', 'Porque ahí le ponen la comida'],
          ],
          answer: 'ver',
          evidence: 'たまごは ドアの ところに います。 お客さんを 見ます。 でも うごきません。',
          correct: 'Sí: mira a cada cliente desde el mismo sitio.',
          incorrect: 'No intenta salir, y la comida se la dan dos veces al día, sin decir dónde.',
          strategy: 'Si el texto une un lugar con una acción repetida, el lugar sirve para esa acción.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: en la tienda venden pan, leche y periódicos.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'みせの 中に パンと ぎゅうにゅうと しんぶんが あります。',
          correct: 'Verdadero: los tres aparecen unidos por と.',
          incorrect: 'Busca la frase con みせの 中に. Enumera tres cosas.',
          strategy: 'La partícula と enlaza elementos de una lista: cuéntalos.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la descripción.',
          options: [
            ['p1', 'Hay una tienda pequeña cerca de casa'],
            ['p2', 'Qué hay dentro, y además un gato'],
            ['p3', 'Qué hace el gato cuando entra un cliente'],
            ['p4', 'La gente va a ver al gato'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'うちの ちかくに 小さい みせが あります … みせの 中に パンと … お客さんが 入ります … みんなは ねこを 見に 来ます。',
          correct: 'Correcto: el lugar, el contenido, la escena y la conclusión.',
          incorrect: 'Fíjate en dónde entra el cliente y dónde está la frase final.',
          strategy: 'Una descripción va de fuera hacia dentro: del sitio a lo que ocurre en él.',
        },
      ],
      production: {
        prompt: 'Escribe 5–7 frases en japonés describiendo una tienda o una habitación. Usa tres veces あります y dos veces います.',
        minWords: 60, maxWords: 160,
        hints: ['うちの ちかくに …が あります。', '中に …と …が あります。', 'ねこが います。', 'みんなは …を 見に 来ます。'],
      },
    },
    // ---------------------------------------------------------------- 3
    {
      slug: 'maiasa-roku-ji-ni-okimasu',
      title: 'Me levanto a las seis',
      genre: 'rutina diaria',
      topic: 'una rutina que cambia los sábados',
      tags: ['japones a1', 'lectura', 'conjugación ます', 'adverbios de frecuencia'],
      intro: 'De lunes a viernes, siempre lo mismo. Los sábados, una sola cosa distinta. Lectura de japonés A1.',
      mission: 'Averigua qué hace los sábados que no hace el resto de la semana.',
      seoTitle: 'Lectura de japonés A1: me levanto a las seis | WeLearn',
      seoDescription: 'Lee una rutina en japonés A1 y practica la conjugación en ます y los adverbios de frecuencia. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['masu-kei-conjugacion', 'adverbios-frecuencia'],
      text: `まいあさ ろくじに おきます。 いつも ラジオを ききます。

あさごはんは いつも おなじです。 パンと コーヒー。 ときどき たまごを たべます。

しちじに うちを でます。 でんしゃで かいしゃに いきますが、 でんしゃの なかでは いつも ほんを よみます。

ぜんぜん ねません。 ねると、 えきを わすれます。 いちど とおくまで いきました。

どようびは ちがいます。 ろくじに おきますが、 どこにも いきません。

どようびの あさ、 わたしは なにも しません。 それが いちばん すきな じかんです。`,
      objectives: [
        'Conjugar en ます: おきます, ききます, 食べます, 行きます, 読みます.',
        'Usar los adverbios de frecuencia: いつも, ときどき, ぜんぜん.',
        'Reconocer un contraste entre la semana y el fin de semana.',
      ],
      vocabulary: [
        { surface: 'まいあさ', reading: 'まいあさ', gloss: 'todas las mañanas' },
        { surface: 'おきます', reading: 'おきます', gloss: 'me levanto' },
        { surface: 'おなじ', reading: 'おなじ', gloss: 'igual, lo mismo' },
        { surface: 'ときどき', reading: 'ときどき', gloss: 'a veces' },
        { surface: 'でんしゃ', reading: 'でんしゃ', gloss: 'tren' },
        { surface: 'ぜんぜん', reading: 'ぜんぜん', gloss: 'nunca, en absoluto (con negación)' },
        { surface: 'わすれます', reading: 'わすれます', gloss: 'me olvido, me paso' },
        { surface: 'どようび', reading: 'どようび', gloss: 'sábado' },
      ],
      culturalNote: 'Dormirse en el tren es tan habitual en Japón que tiene nombre propio, 居眠り, y pasarse de estación por eso es una experiencia compartida por casi todos los que van a trabajar en tren.',
      spanishSpeakerNote: 'Los adverbios de frecuencia mandan la forma del verbo: いつも y ときどき van con verbo afirmativo, pero ぜんぜん exige negativo. «ぜんぜん ねません» es «no duermo nunca», y no se puede decir «ぜんぜん ねます».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué cuenta el texto?',
          options: [
            ['sabado', 'Una rutina fija de lunes a viernes y un sábado en el que no hace nada, que es lo que más le gusta'],
            ['trabajo', 'Que su trabajo le gusta mucho'],
            ['tren', 'Que el tren siempre va lleno'],
          ],
          answer: 'sabado',
          evidence: '土曜日の 朝、 わたしは 何も しません。 それが いちばん すきな 時間です。',
          correct: 'Sí, y la última frase lo dice sin rodeos.',
          incorrect: 'No habla de su trabajo ni de lo lleno que va el tren. Lee la última frase.',
          strategy: 'En un texto corto, la última frase suele decir qué importa de todo lo anterior.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué hace en el tren?',
          options: [
            ['leer', 'Lee un libro'],
            ['dormir', 'Duerme'],
            ['radio', 'Escucha la radio'],
          ],
          answer: 'leer',
          evidence: '電車の 中で ほんを 読みます。 ぜんぜん ねません。',
          correct: 'Correcto, y dice expresamente que no duerme.',
          incorrect: 'La radio la escucha al levantarse, y dormir es justo lo que no hace. Busca la frase con 電車の 中で.',
          strategy: 'La partícula で marca el lugar donde se hace algo: úsala para localizar la frase.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: '¿Qué significa ぜんぜん en «ぜんぜん ねません»?',
          options: [
            ['nunca', 'Nunca, en absoluto'],
            ['siempre', 'Siempre'],
            ['aveces', 'A veces'],
          ],
          answer: 'nunca',
          evidence: 'ぜんぜん ねません。 ねると、 えきを わすれます。',
          correct: 'Eso es, y la frase siguiente da la razón: si se duerme, se pasa de estación.',
          incorrect: 'Va con un verbo en negativo (ねません), así que no puede ser «siempre» ni «a veces».',
          strategy: 'ぜんぜん exige verbo negativo: si ves ません, ya sabes el sentido.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué no duerme en el tren?',
          options: [
            ['estacion', 'Porque si se duerme se pasa de estación'],
            ['ruido', 'Porque hay demasiado ruido'],
            ['libro', 'Porque el libro es muy interesante'],
          ],
          answer: 'estacion',
          evidence: 'ぜんぜん ねません。 ねると、 えきを わすれます。',
          correct: 'Sí, y lo dice en la frase inmediatamente siguiente.',
          incorrect: 'No menciona ruido, y el libro no se presenta como la razón. Lee la frase de después.',
          strategy: 'Si la frase siguiente describe una consecuencia, esa consecuencia es el motivo.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: los sábados se levanta más tarde que entre semana.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: '六時に おきますが、 どこにも 行きません。',
          correct: 'Falso: se levanta también a las seis; lo que cambia es que no va a ninguna parte.',
          incorrect: 'Busca la frase del sábado: repite la misma hora y añade un が.',
          strategy: 'La partícula が en medio de una frase marca un contraste: lee las dos mitades.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la rutina.',
          options: [
            ['p1', 'Se levanta a las seis y escucha la radio'],
            ['p2', 'Desayuna siempre lo mismo'],
            ['p3', 'Sale a las siete y lee en el tren'],
            ['p4', 'El sábado no va a ninguna parte'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'まいあさ 六時に おきます … 朝ごはんは いつも 同じです … 七時に うちを 出ます … 土曜日は ちがいます。',
          correct: 'Correcto: el texto sigue el reloj y termina en el sábado.',
          incorrect: 'Guíate por las horas: 六時, 七時, y después 土曜日.',
          strategy: 'Si el texto da horas, ordénalas y tendrás la secuencia.',
        },
      ],
      production: {
        prompt: 'Escribe 5–7 frases en japonés sobre tu rutina de la mañana. Usa cinco verbos en ます y tres adverbios de frecuencia.',
        minWords: 60, maxWords: 160,
        hints: ['まいあさ 六時に おきます。', 'いつも コーヒーを のみます。', 'ときどき たまごを 食べます。', '土曜日は ちがいます。'],
      },
    },
    // ---------------------------------------------------------------- 4
    {
      slug: 'atarashii-jitensha',
      title: 'Una bicicleta nueva',
      genre: 'relato breve',
      topic: 'una bicicleta de segunda mano',
      tags: ['japones a1', 'lectura', 'adjetivos i', 'adjetivos na'],
      intro: 'La compró vieja, sucia y barata. Pero para él es nueva, y la palabra importa. Lectura de japonés A1.',
      mission: 'Averigua por qué dice que su bicicleta es nueva.',
      seoTitle: 'Lectura de japonés A1: una bicicleta nueva | WeLearn',
      seoDescription: 'Lee un relato en japonés A1 y practica los adjetivos i y los adjetivos na. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['i-keiyoshi', 'na-keiyoshi'],
      text: `せんしゅう じてんしゃを かいました。 やすかったです。 さんぜんえんでした。

あたらしい じてんしゃでは ありません。 ふるい じてんしゃです。 いろは あおですが、 きたない あおです。

でも わたしには あたらしいです。 わたしの はじめての じてんしゃですから。

ブレーキは あまり よくないです。 タイヤも しずかでは ありません。 うるさいです。

でも べんりです。 えきまで ごふんです。 まえは にじゅっぷんでした。

ともだちは 「ふるいね」と いいました。 わたしは 「あたらしいよ」と いいました。 ふたりとも ただしいです。`,
      objectives: [
        'Conjugar los adjetivos i: やすい, ふるい, きたない, うるさい.',
        'Usar los adjetivos na: しずか, べんり.',
        'Distinguir un dato objetivo de lo que significa para alguien.',
      ],
      vocabulary: [
        { surface: 'じてんしゃ', reading: 'じてんしゃ', gloss: 'bicicleta' },
        { surface: 'ふるい', reading: 'ふるい', gloss: 'viejo, usado' },
        { surface: 'きたない', reading: 'きたない', gloss: 'sucio' },
        { surface: 'はじめて', reading: 'はじめて', gloss: 'por primera vez' },
        { surface: 'しずか', reading: 'しずか', gloss: 'silencioso' },
        { surface: 'うるさい', reading: 'うるさい', gloss: 'ruidoso' },
        { surface: 'べんり', reading: 'べんり', gloss: 'práctico, cómodo' },
        { surface: 'ただしい', reading: 'ただしい', gloss: 'correcto, tiene razón' },
      ],
      culturalNote: 'La bicicleta de segunda mano es el medio de transporte estándar hasta la estación en las ciudades japonesas, y hay aparcamientos de pago pensados solo para eso.',
      spanishSpeakerNote: 'Hay dos clases de adjetivos: los i (ふるい, やすい) cambian ellos mismos —ふるくない, やすかった— y los na (しずか, べんり) necesitan です y no cambian: しずかでは ありません.',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué explica el texto?',
          options: [['nueva','Que la bicicleta es vieja de hecho, pero nueva para él porque es la primera que tiene'],['cara','Que le costó demasiado dinero'],['rota','Que la bicicleta está estropeada y no la puede usar']],
          answer: 'nueva',
          evidence: 'でも わたしには あたらしいです。 わたしの はじめての じてんしゃですから。',
          correct: 'Sí, y la razón va con から al final de la frase.',
          incorrect: 'Costó tres mil yenes y la usa a diario. Busca la frase con わたしには.',
          strategy: 'La partícula には señala «para mí», y suele introducir un punto de vista propio.' },
        { type: 'detail', skill: 'detail', prompt: '¿Cuánto tarda ahora hasta la estación?',
          options: [['cinco','Cinco minutos'],['veinte','Veinte minutos'],['tres','Tres minutos']],
          answer: 'cinco',
          evidence: 'えきまで ごふんです。 まえは にじゅっぷんでした。',
          correct: 'Correcto: los veinte minutos eran antes.',
          incorrect: 'Los veinte son lo de antes y los tres mil son yenes, no minutos.',
          strategy: 'まえは introduce lo de antes: compáralo con lo de ahora.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa べんり?',
          options: [['practico','Práctico, cómodo'],['barato','Barato'],['bonito','Bonito']],
          answer: 'practico',
          evidence: 'でも べんりです。 えきまで ごふんです。 まえは にじゅっぷんでした。',
          correct: 'Eso es: lo justifica con el ahorro de tiempo.',
          incorrect: 'Lo barato ya lo dijo antes con やすい. Fíjate en la razón que da a continuación.',
          strategy: 'Si la frase siguiente da una ventaja de tiempo, el adjetivo habla de utilidad.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué dice que los dos tienen razón?',
          options: [['dos','Porque «vieja» describe el objeto y «nueva» describe lo que es para él'],['broma','Porque su amigo estaba bromeando'],['error','Porque los dos se equivocaron de bicicleta']],
          answer: 'dos',
          evidence: 'ともだちは 「ふるいね」と いいました。 わたしは 「あたらしいよ」と いいました。 ふたりとも ただしいです。',
          correct: 'Sí: son dos afirmaciones sobre cosas distintas.',
          incorrect: 'No hay broma ni confusión: cada uno describe algo diferente.',
          strategy: 'Si dos personas se contradicen y el texto dice que ambas aciertan, hablan de planos distintos.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: la bicicleta hace ruido al rodar.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'vrai',
          evidence: 'タイヤも しずかでは ありません。 うるさいです。',
          correct: 'Verdadero, y lo dice dos veces: no es silenciosa, es ruidosa.',
          incorrect: 'Busca la frase sobre las ruedas. Usa dos adjetivos seguidos.',
          strategy: 'Si un adjetivo se niega y el contrario se afirma, la idea queda doblemente clara.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena el relato.',
          options: [['p1','La compró la semana pasada por tres mil yenes'],['p2','Describe su estado: vieja, azul, sucia'],['p3','Lo que no funciona bien: frenos y ruedas'],['p4','La conversación con su amigo']],
          answer: ['p1','p2','p3','p4'],
          evidence: 'せんしゅう じてんしゃを かいました … ふるい じてんしゃです … ブレーキは あまり よくないです … ともだちは 「ふるいね」と いいました。',
          correct: 'Correcto: compra, estado, defectos y diálogo.',
          incorrect: 'Fíjate en dónde aparecen los frenos y dónde el amigo.',
          strategy: 'Un relato breve suele acabar con la frase que le da sentido.' },
      ],
      production: { prompt: 'Escribe 5–7 frases en japonés describiendo algo tuyo de segunda mano. Usa tres adjetivos i y dos adjetivos na.', minWords: 60, maxWords: 160,
        hints: ['せんしゅう …を かいました。','ふるい …です。','べんりです。','わたしには あたらしいです。'] },
    },
    // ---------------------------------------------------------------- 5
    {
      slug: 'hachi-ji-juu-go-fun-no-basu',
      title: 'El autobús de las 8:15',
      genre: 'escena cotidiana',
      topic: 'un autobús que nunca llega a su hora',
      tags: ['japones a1', 'lectura', 'números y contadores', 'expresiones de tiempo'],
      intro: 'El horario dice 8:15. La realidad dice otra cosa, y una señora lleva años midiéndolo. Lectura de japonés A1.',
      mission: 'Averigua qué apunta la señora en su cuaderno.',
      seoTitle: 'Lectura de japonés A1: el autobús de las 8:15 | WeLearn',
      seoDescription: 'Lee una escena en japonés A1 y practica los números, los contadores y las expresiones de tiempo. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['numeros-contadores', 'jikan-tiempo'],
      text: `わたしは まいにち はちじ じゅうごふんの バスに のります。

でも バスは はちじ じゅうごふんに きません。 はちじ じゅうはっぷんか はちじ にじゅっぷんに きます。

バスていに おばあさんが います。 いつも ノートを もって います。

おばあさんは バスの じかんを かきます。 ろくねん かきました。

きのう おばあさんは わたしに いいました。 「さんねんまえは にふん おそかったです。 いまは ごふんです。」

わたしは びっくりしました。 だれも しりません。 でも おばあさんは しって います。`,
      objectives: [
        'Leer horas y minutos: 八時十五分, 二十分.',
        'Usar los contadores de tiempo: 年, 分, まえ.',
        'Reconocer un dato que solo tiene quien lo mide.',
      ],
      vocabulary: [
        { surface: 'まいにち', reading: 'まいにち', gloss: 'todos los días' },
        { surface: 'のります', reading: 'のります', gloss: 'me subo (a un transporte)' },
        { surface: 'バスてい', reading: 'バスてい', gloss: 'parada de autobús' },
        { surface: 'ノート', reading: 'ノート', gloss: 'cuaderno' },
        { surface: 'かきます', reading: 'かきます', gloss: 'escribe, apunta' },
        { surface: 'おそかった', reading: 'おそかった', gloss: 'llegaba tarde' },
        { surface: 'びっくり', reading: 'びっくり', gloss: 'sorpresa; びっくりしました es me sorprendí' },
        { surface: 'しって', reading: 'しって', gloss: 'saber; しって います es lo sabe' },
      ],
      culturalNote: 'La puntualidad del transporte japonés es real en tren, pero el autobús urbano depende del tráfico. Un retraso medio de cinco minutos es una queja seria en Japón.',
      spanishSpeakerNote: 'Los contadores cambian con lo que se cuenta: 分 para minutos, 時 para horas, 年 para años. Y まえ detrás de una cantidad significa «hace»: 三年まえ es «hace tres años».',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué muestra el texto?',
          options: [['medir','Que el retraso del autobús ha aumentado, y solo lo sabe quien lo lleva midiendo seis años'],['quejarse','Que los vecinos han puesto una queja formal'],['nuevo','Que van a cambiar el horario del autobús']],
          answer: 'medir',
          evidence: '六年 かきました … 「さんねんまえは にふん おそかったです。 いまは ごふんです。」 … だれも しりません。',
          correct: 'Sí, y el texto lo remata: nadie lo sabe, ella sí.',
          incorrect: 'No hay queja ni cambio de horario. Fíjate en los años que lleva apuntando.',
          strategy: 'Cuando un texto contrasta «nadie sabe» con «ella sabe», ahí está el asunto.' },
        { type: 'detail', skill: 'detail', prompt: '¿Cuánto se retrasa el autobús ahora?',
          options: [['cinco','Cinco minutos'],['dos','Dos minutos'],['quince','Quince minutos']],
          answer: 'cinco',
          evidence: '「さんねんまえは にふん おそかったです。 いまは ごふんです。」',
          correct: 'Correcto: los dos minutos eran hace tres años.',
          incorrect: 'Los dos minutos son de hace tres años y los quince forman parte de la hora.',
          strategy: 'まえ marca el pasado: separa lo de antes de lo de ahora.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa バスてい?',
          options: [['parada','La parada del autobús'],['billete','El billete de autobús'],['conductor','El conductor']],
          answer: 'parada',
          evidence: 'バスていに おばあさんが います。',
          correct: 'Eso es: es donde está la señora esperando.',
          incorrect: 'La partícula に marca un lugar, y allí hay una persona esperando.',
          strategy: 'Si la palabra va con に y con います, es un lugar donde hay alguien.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué se sorprende el narrador?',
          options: [['dato','Porque nadie más tenía ese dato y ella lo tiene medido'],['tarde','Porque no sabía que el autobús se retrasaba'],['edad','Porque la señora es muy mayor']],
          answer: 'dato',
          evidence: 'わたしは びっくりしました。 だれも しりません。 でも おばあさんは しって います。',
          correct: 'Sí, y las dos frases siguientes explican la sorpresa.',
          incorrect: 'Él coge ese autobús a diario: sabe que llega tarde. Lo que no sabía es cuánto ha empeorado.',
          strategy: 'Si tras la sorpresa vienen dos frases sobre quién sabe qué, ahí está la razón.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: la señora solo apunta la hora cuando el autobús se retrasa mucho.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'faux',
          evidence: 'おばあさんは バスの じかんを かきます。 ろくねん かきました。',
          correct: 'Falso: apunta la hora todos los días, y lleva seis años haciéndolo.',
          incorrect: 'Busca la frase con ろくねん: dice cuánto tiempo lleva, no en qué casos apunta.',
          strategy: 'Si el texto da una duración y ninguna condición, no hay excepciones que buscar.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena la escena.',
          options: [['p1','Coge todos los días el autobús de las 8:15'],['p2','El autobús llega entre las 8:18 y las 8:20'],['p3','La señora del cuaderno en la parada'],['p4','Lo que le contó ayer']],
          answer: ['p1','p2','p3','p4'],
          evidence: 'わたしは まいにち はちじ じゅうごふんの バスに のります … 八時十八分か 八時二十分に きます … バスていに おばあさんが います … きのう おばあさんは わたしに いいました。',
          correct: 'Correcto: rutina, hecho, personaje y revelación.',
          incorrect: 'Guíate por きのう, que marca el momento concreto.',
          strategy: 'La palabra きのう (ayer) sitúa la escena concreta dentro de lo habitual.' },
      ],
      production: { prompt: 'Escribe 5–7 frases en japonés sobre un transporte que usas. Usa cuatro horas o cantidades con su contador.', minWords: 60, maxWords: 160,
        hints: ['まいにち はちじ じゅうごふんの バスに のります。','バスは 八時二十分に きます。','三年まえは …でした。','今は 五分です。'] },
    },
    // ---------------------------------------------------------------- 6
    {
      slug: 'dare-mo-shirimasen',
      title: 'Nadie lo sabe',
      genre: 'misterio de barrio',
      topic: 'una puerta que nunca se abre',
      tags: ['japones a1', 'lectura', 'interrogativos', 'negación'],
      intro: 'Una puerta azul en la calle. Ni tienda, ni casa, ni nombre. Y nadie del barrio sabe qué hay dentro. Lectura de japonés A1.',
      mission: 'Averigua qué decidió hacer el narrador al final.',
      seoTitle: 'Lectura de japonés A1: nadie lo sabe | WeLearn',
      seoDescription: 'Lee un texto en japonés A1 y practica los interrogativos y la negación completa. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['interrogativos-ka', 'negacion-completa'],
      text: `うちの となりに あおい ドアが あります。

なんの ドアですか。 わかりません。 みせでは ありません。 うちでも ありません。 なまえも ありません。

だれが 入りますか。 だれも 入りません。 一年 見ましたが、 一かいも あきませんでした。

おとなりの 山田さんに ききました。 山田さんは 「しりません」と いいました。 パンやさんも しりません。 だれも しりません。

いつ あきますか。 どうして あかないですか。 わからないです。

わたしは かんがえました。 わかりたいですが、 きかないほうが いいです。

この まちに ひとつ ぐらい なぞが あっても いいです。`,
      objectives: [
        'Formular preguntas con なん, だれ, いつ, どうして + か.',
        'Negar por completo con だれも, 一かいも, なにも + verbo negativo.',
        'Leer una decisión que el narrador toma sin explicarla del todo.',
      ],
      vocabulary: [
        { surface: 'となり', reading: 'となり', gloss: 'al lado, contiguo' },
        { surface: 'わかりません', reading: 'わかりません', gloss: 'no lo sé, no lo entiendo' },
        { surface: 'あきません', reading: 'あきません', gloss: 'no se abre' },
        { surface: 'ききました', reading: 'ききました', gloss: 'pregunté' },
        { surface: 'パンやさん', reading: 'パンやさん', gloss: 'el panadero, la panadería' },
        { surface: 'かんがえました', reading: 'かんがえました', gloss: 'pensé, reflexioné' },
        { surface: 'まち', reading: 'まち', gloss: 'ciudad, barrio' },
        { surface: 'なぞ', reading: 'なぞ', gloss: 'misterio, enigma' },
      ],
      culturalNote: 'En los barrios japoneses la relación con los vecinos inmediatos —おとなりさん— es cercana y estable, así que una puerta de la que nadie sabe nada llama mucho la atención.',
      spanishSpeakerNote: 'La negación completa se forma con un interrogativo + も + verbo negativo: だれも 入りません («no entra nadie»), 一かいも あきませんでした («no se abrió ni una vez»).',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué decide el narrador?',
          options: [['nopreguntar','Que prefiere no averiguarlo: le parece bien que el barrio tenga un misterio'],['abrir','Que va a abrir la puerta él mismo'],['mudarse','Que se va a mudar de barrio']],
          answer: 'nopreguntar',
          evidence: 'わかりたいですが、 きかないほうが いいです。 この まちに ひとつ ぐらい なぞが あっても いいです。',
          correct: 'Sí, y reconoce a la vez que sí querría saberlo.',
          incorrect: 'No abre nada ni se muda. Lee las dos frases finales.',
          strategy: 'La estructura …が、…ほうが いいです plantea un deseo y la decisión contraria.' },
        { type: 'detail', skill: 'detail', prompt: '¿Cuánto tiempo lleva observando la puerta?',
          options: [['ano','Un año'],['mes','Un mes'],['semana','Una semana']],
          answer: 'ano',
          evidence: '一年 見ましたが、 一かいも あきませんでした。',
          correct: 'Correcto, y en todo ese tiempo no se abrió ni una vez.',
          incorrect: 'Busca la frase con 一年. Va seguida de 一かいも.',
          strategy: 'El contador 年 cuenta años; 一かい cuenta veces. No los confundas.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa なぞ?',
          options: [['misterio','Misterio, enigma'],['problema','Problema grave'],['secreto','Un secreto de familia']],
          answer: 'misterio',
          evidence: 'この まちに ひとつ ぐらい なぞが あっても いいです。',
          correct: 'Eso es: dice que no está mal que en el barrio haya uno.',
          incorrect: 'No lo presenta como un problema ni como algo familiar: le parece bien que exista.',
          strategy: 'Si el narrador dice que está bien que eso exista, no es un problema.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué no pregunta más?',
          options: [['valor','Porque para él el misterio vale más sin resolver'],['miedo','Porque tiene miedo de la respuesta'],['prohibido','Porque los vecinos le han pedido que no pregunte']],
          answer: 'valor',
          evidence: 'わかりたいですが、 きかないほうが いいです。 この まちに ひとつ ぐらい なぞが あっても いいです。',
          correct: 'Sí, y él mismo lo formula así en la última frase.',
          incorrect: 'Nadie le prohíbe nada y no habla de miedo. Lee la última frase.',
          strategy: 'La última frase de un texto corto suele explicar la decisión anterior.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: ni Yamada ni el panadero saben qué hay detrás de la puerta.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'vrai',
          evidence: '山田さんは 「しりません」と いいました。 パンやさんも しりません。 だれも しりません。',
          correct: 'Verdadero: el texto lo dice tres veces seguidas, y acaba en «だれも しりません».',
          incorrect: 'Busca la respuesta de Yamada, entrecomillada, y las dos frases siguientes.',
          strategy: 'Una cita entre 「」 reproduce literalmente lo que alguien dijo.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena el texto.',
          options: [['p1','Describe la puerta azul y lo que no es'],['p2','Un año observando sin que se abra'],['p3','Pregunta a los vecinos y nadie sabe'],['p4','Decide no averiguarlo']],
          answer: ['p1','p2','p3','p4'],
          evidence: 'うちの となりに あおい ドアが あります … 一年 見ましたが … おとなりの 山田さんに ききました … きかないほうが いいです。',
          correct: 'Correcto: el objeto, la observación, la búsqueda y la decisión.',
          incorrect: 'Fíjate en dónde pregunta a Yamada y dónde toma la decisión.',
          strategy: 'Un texto de misterio suele acabar con lo que el narrador decide hacer.' },
      ],
      production: { prompt: 'Escribe 5–7 frases en japonés sobre algo de tu barrio que no entiendes. Usa tres preguntas con か y dos negaciones completas.', minWords: 60, maxWords: 160,
        hints: ['うちの となりに …が あります。','なんの …ですか。','だれも しりません。','わかりたいですが…'] },
    },
    // ---------------------------------------------------------------- 7
    {
      slug: 'basu-de-ikimasu',
      title: 'Voy en autobús',
      genre: 'instrucciones',
      topic: 'cómo llegar a una casa sin dirección clara',
      tags: ['japones a1', 'lectura', 'partículas で y へ', 'orden de la frase'],
      intro: 'Su casa no tiene un número fácil de encontrar, así que escribió las instrucciones y las manda a todo el mundo. Lectura de japonés A1.',
      mission: 'Averigua cuál es la última referencia que da.',
      seoTitle: 'Lectura de japonés A1: voy en autobús | WeLearn',
      seoDescription: 'Lee unas instrucciones en japonés A1 y practica las partículas で y へ y el orden de la frase. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['particula-de-e', 'estructura-sov-particulas'],
      text: `わたしの うちは わかりにくいです。 ですから、 せつめいを かきました。

まず、 えきから バスで いきます。 十二ばんの バスです。

つぎに、 「みなみこうえん」で おります。 バスていから こうえんへ あるきます。 五分ぐらいです。

こうえんの まえに 白い ビルが あります。 わたしの うちでは ありません。

ビルの よこの ちいさい みちを 入ります。 その みちには なまえが ありません。

みちの おわりに あおい ドアが あります。 それが わたしの うちです。

みんな この せつめいで きます。 でも みんな 「ちいさい みち」で でんわを かけます。`,
      objectives: [
        'Usar で para el medio de transporte y へ para la dirección.',
        'Ordenar la frase japonesa: sujeto, complementos con partícula y verbo al final.',
        'Seguir un itinerario paso a paso.',
      ],
      vocabulary: [
        { surface: 'わかりにくい', reading: 'わかりにくい', gloss: 'difícil de encontrar o de entender' },
        { surface: 'せつめい', reading: 'せつめい', gloss: 'explicación, instrucciones' },
        { surface: 'まず', reading: 'まず', gloss: 'primero, en primer lugar' },
        { surface: 'おります', reading: 'おります', gloss: 'me bajo (de un transporte)' },
        { surface: 'こうえん', reading: 'こうえん', gloss: 'parque' },
        { surface: 'ビル', reading: 'ビル', gloss: 'edificio' },
        { surface: 'よこ', reading: 'よこ', gloss: 'al lado de' },
        { surface: 'おわり', reading: 'おわり', gloss: 'final' },
      ],
      culturalNote: 'Las direcciones japonesas no se basan en el nombre de la calle sino en distritos y bloques, así que explicar cómo llegar con referencias visuales es lo normal, no una excentricidad.',
      spanishSpeakerNote: 'で marca el medio: バスで いきます, «voy en autobús». へ marca la dirección: こうえんへ あるきます, «camino hacia el parque». Y el verbo va siempre al final de la frase.',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Para qué escribió las instrucciones?',
          options: [['dificil','Porque su casa es difícil de encontrar y así se lo manda a todo el mundo'],['mudanza','Porque acaba de mudarse'],['fiesta','Porque va a dar una fiesta']],
          answer: 'dificil',
          evidence: 'わたしの うちは わかりにくいです。 ですから、 せつめいを かきました。',
          correct: 'Sí, y lo dice en las dos primeras frases con ですから.',
          incorrect: 'No se habla de mudanza ni de fiesta. Lee las dos primeras frases.',
          strategy: 'La conjunción ですから (por eso) une una causa con su consecuencia.' },
        { type: 'detail', skill: 'detail', prompt: '¿Qué número de autobús hay que coger?',
          options: [['doce','El doce'],['cinco','El cinco'],['dos','El dos']],
          answer: 'doce',
          evidence: '十二ばんの バスです。',
          correct: 'Correcto: el contador ばん marca el número de línea.',
          incorrect: 'Los cinco son minutos andando. Busca el contador ばん.',
          strategy: 'El contador ばん indica número de orden: línea, planta, puesto.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa おります?',
          options: [['bajarse','Bajarse del autobús'],['subirse','Subirse al autobús'],['esperar','Esperar el autobús']],
          answer: 'bajarse',
          evidence: '「みなみこうえん」で おります。 バスていから こうえんへ あるきます。',
          correct: 'Eso es: después ya camina desde la parada.',
          incorrect: 'La frase siguiente dice que camina desde la parada, así que ya no va en el autobús.',
          strategy: 'Si después del verbo la persona camina, el verbo anterior era bajarse.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué todo el mundo llama por teléfono en la calle pequeña?',
          options: [['sinnombre','Porque esa calle no tiene nombre y ahí se pierde la referencia'],['lejos','Porque está demasiado lejos del parque'],['cerrada','Porque la calle está cortada']],
          answer: 'sinnombre',
          evidence: 'その みちには なまえが ありません … でも みんな 「ちいさい みち」で でんわを かけます。',
          correct: 'Sí, y es el único punto del itinerario sin nombre propio.',
          incorrect: 'La calle no está cortada y el parque queda a cinco minutos. Fíjate en qué le falta a esa calle.',
          strategy: 'Si el texto señala una carencia y luego un problema, están conectados.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: el edificio blanco frente al parque es su casa.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'faux',
          evidence: 'こうえんの まえに 白い ビルが あります。 わたしの うちでは ありません。',
          correct: 'Falso: lo aclara expresamente en la frase siguiente.',
          incorrect: 'Busca la frase justo después del edificio blanco: es una negación.',
          strategy: 'Si tras describir algo viene …では ありません, el texto está descartándolo.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena el itinerario.',
          options: [['p1','Coger el autobús doce en la estación'],['p2','Bajarse en «Minami-kōen» y andar al parque'],['p3','Entrar por la calle pequeña junto al edificio blanco'],['p4','La puerta azul al final de la calle']],
          answer: ['p1','p2','p3','p4'],
          evidence: 'まず、 えきから バスで いきます … つぎに、 「みなみこうえん」で おります … ビルの よこの ちいさい みちを 入ります … みちの おわりに あおい ドアが あります。',
          correct: 'Correcto, y el texto lo marca con まず y つぎに.',
          incorrect: 'Guíate por まず (primero) y つぎに (después).',
          strategy: 'Las palabras まず y つぎに ordenan cualquier instrucción japonesa.' },
      ],
      production: { prompt: 'Escribe 5–7 frases en japonés explicando cómo llegar a tu casa. Usa で para el transporte y へ para la dirección.', minWords: 60, maxWords: 160,
        hints: ['まず、 えきから バスで いきます。','つぎに、 …で おります。','こうえんへ あるきます。','それが わたしの うちです。'] },
    },
    // ---------------------------------------------------------------- 8
    {
      slug: 'katakana-wa-muzukashii',
      title: 'El katakana engaña',
      genre: 'cuaderno de estudiante',
      topic: 'palabras que parecen inglesas y no lo son',
      tags: ['japones a1', 'lectura', 'hiragana', 'katakana'],
      intro: 'Aprendió el hiragana en dos semanas. El katakana lo aprendió en dos días y le costó dos años. Lectura de japonés A1.',
      mission: 'Averigua por qué el katakana le resultó más difícil, si es más fácil de leer.',
      seoTitle: 'Lectura de japonés A1: el katakana engaña | WeLearn',
      seoDescription: 'Lee un cuaderno de estudiante en japonés A1 y practica el hiragana y el katakana. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['hiragana-basico', 'katakana-basico'],
      text: `ひらがなは 二しゅうかんで おぼえました。 たいへんでしたが、 わかりやすいです。

カタカナは 二日で おぼえました。 かんたんでした。 でも カタカナは 二年 わたしを こまらせました。

もんだいは じでは ありません。 ことばです。

「マンション」は えいごの mansion では ありません。 ふつうの アパートです。

「サービス」は ときどき 「ただ」の いみです。 「コーヒー、 サービスです」は 「コーヒーは ただです」です。

「バイキング」は りょうりの ビュッフェです。 ふねでは ありません。

いまは カタカナを 見て、 えいごを かんがえません。 日本語を かんがえます。

それが いちばん たいへんでした。`,
      objectives: [
        'Leer hiragana y katakana y saber qué se escribe con cada uno.',
        'Reconocer que una palabra en katakana no siempre significa lo que su origen.',
        'Distinguir la dificultad de leer de la dificultad de entender.',
      ],
      vocabulary: [
        { surface: 'おぼえました', reading: 'おぼえました', gloss: 'aprendí de memoria' },
        { surface: 'たいへん', reading: 'たいへん', gloss: 'duro, costoso' },
        { surface: 'かんたん', reading: 'かんたん', gloss: 'sencillo' },
        { surface: 'こまらせました', reading: 'こまらせました', gloss: 'me trajo problemas' },
        { surface: 'ことば', reading: 'ことば', gloss: 'palabra, vocabulario' },
        { surface: 'ふつう', reading: 'ふつう', gloss: 'normal, corriente' },
        { surface: 'ただ', reading: 'ただ', gloss: 'gratis' },
        { surface: 'いみ', reading: 'いみ', gloss: 'significado' },
      ],
      culturalNote: 'Las palabras tomadas de otras lenguas y escritas en katakana suelen cambiar de sentido al entrar en japonés. Se les llama 和製英語 cuando el japonés las construye por su cuenta.',
      spanishSpeakerNote: 'El katakana es fácil de leer y por eso engaña: parece que ya sabes la palabra. «マンション» no es una mansión, es un piso normal; «サービス» a veces significa «gratis».',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Cuál es la idea del texto?',
          options: [['significado','Que el katakana es fácil de leer pero sus palabras no significan lo que parece'],['dificil','Que aprender los kana japoneses lleva años'],['ingles','Que hay que saber inglés para aprender japonés']],
          answer: 'significado',
          evidence: 'もんだいは じでは ありません。 ことばです。',
          correct: 'Sí, y esas dos frases cortas separan el problema real del aparente.',
          incorrect: 'Los kana los aprendió en días o semanas, y no dice que haga falta inglés. Busca las dos frases sobre el problema.',
          strategy: 'Cuando un texto dice «el problema no es X, es Y», ahí está la tesis.' },
        { type: 'detail', skill: 'detail', prompt: '¿Qué significa «マンション» en japonés?',
          options: [['piso','Un piso normal'],['mansion','Una mansión'],['hotel','Un hotel']],
          answer: 'piso',
          evidence: '「マンション」は えいごの mansion では ありません。 ふつうの アパートです。',
          correct: 'Correcto, y el texto lo descarta expresamente.',
          incorrect: 'El texto niega justamente el significado inglés. Lee la frase completa.',
          strategy: 'La estructura …では ありません descarta la interpretación esperada.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa ただ en este texto?',
          options: [['gratis','Gratis'],['solo','Solamente'],['caro','Caro']],
          answer: 'gratis',
          evidence: '「サービス」は ときどき 「ただ」の いみです。 「コーヒー、 サービスです」は 「コーヒーは ただです」です。',
          correct: 'Eso es, y el ejemplo del café lo demuestra.',
          incorrect: 'El ejemplo del café aclara el sentido: no se paga.',
          strategy: 'Si el texto da un ejemplo con una frase completa, úsalo para fijar el significado.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué dice que eso fue lo más duro?',
          options: [['dejar','Porque tuvo que dejar de pensar en inglés al ver katakana'],['memoria','Porque memorizar los signos le costó dos años'],['acento','Porque no conseguía pronunciarlas bien']],
          answer: 'dejar',
          evidence: 'いまは カタカナを 見て、 えいごを かんがえません。 日本語を かんがえます。 それが いちばん たいへんでした。',
          correct: 'Sí: el それ se refiere al cambio de idioma mental, no a los signos.',
          incorrect: 'Los signos los aprendió en dos días. Fíjate a qué se refiere それ.',
          strategy: 'El pronombre それ remite a lo dicho justo antes: compruébalo antes de responder.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: aprendió los signos del katakana en dos días.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'vrai',
          evidence: 'カタカナは 二日で おぼえました。 かんたんでした。',
          correct: 'Verdadero, y le pareció sencillo: lo difícil vino después.',
          incorrect: 'Busca la frase con 二日. Las dos semanas son del hiragana.',
          strategy: 'Distingue los dos plazos: uno es del hiragana y otro del katakana.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena el cuaderno.',
          options: [['p1','El hiragana en dos semanas'],['p2','El katakana en dos días, y dos años de problemas'],['p3','Los tres ejemplos: mansión, servicio, bufé'],['p4','Ahora ya no piensa en inglés']],
          answer: ['p1','p2','p3','p4'],
          evidence: 'ひらがなは 二しゅうかんで おぼえました … カタカナは 二日で おぼえました … 「マンション」は … いまは カタカナを 見て、 えいごを かんがえません。',
          correct: 'Correcto: los dos sistemas, los ejemplos y el cambio.',
          incorrect: 'Fíjate en dónde empiezan los ejemplos entrecomillados.',
          strategy: 'La palabra いま (ahora) marca el final del recorrido de aprendizaje.' },
      ],
      production: { prompt: 'Escribe 5–7 frases en japonés sobre tres palabras en katakana que te engañaron. Explica qué significan de verdad.', minWords: 60, maxWords: 160,
        hints: ['カタカナは かんたんでした。','もんだいは ことばです。','「マンション」は …では ありません。','いまは 日本語を かんがえます。'] },
    },
    // ---------------------------------------------------------------- 9
    {
      slug: 'tabete-mo-ii-desu-ka',
      title: '¿Puedo comerlo?',
      genre: 'escena de trabajo',
      topic: 'una caja de dulces en la oficina',
      tags: ['japones a1', 'lectura', 'forma たい', 'てもいい'],
      intro: 'Una caja abierta encima de la mesa común. Nadie dice de quién es y nadie la toca. Lectura de japonés A1.',
      mission: 'Averigua qué pasó cuando por fin preguntó.',
      seoTitle: 'Lectura de japonés A1: ¿puedo comerlo? | WeLearn',
      seoDescription: 'Lee una escena en japonés A1 y practica la forma たい y la construcción てもいい. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['tai-form', 'te-form-permission'],
      text: `かいしゃの つくえの 上に はこが あります。 中に おかしが あります。

たべたいです。 とても たべたいです。 でも、 たべても いいですか。 わかりません。

はこには かみが ありません。 なまえも ありません。

三日 まちました。 だれも たべませんでした。 みんな 見ましたが、 だれも 手を 出しませんでした。

四日め、 わたしは 田中さんに ききました。 「これ、 たべても いいですか。」

田中さんは わらいました。 「どうぞ。 わたしが かいました。 みんなに 『どうぞ』と いいたかったですが、 はずかしかったです。」

その日、 はこは からに なりました。

いまは かならず かみを つけます。 「たべても いいです」と かきます。`,
      objectives: [
        'Usar la forma たい para expresar deseo: たべたいです.',
        'Pedir permiso con ても いいですか.',
        'Leer una situación donde nadie pregunta y todos esperan.',
      ],
      vocabulary: [
        { surface: 'つくえ', reading: 'つくえ', gloss: 'mesa de trabajo' },
        { surface: 'はこ', reading: 'はこ', gloss: 'caja' },
        { surface: 'おかし', reading: 'おかし', gloss: 'dulces' },
        { surface: 'かみ', reading: 'かみ', gloss: 'papel, nota' },
        { surface: 'まちました', reading: 'まちました', gloss: 'esperé' },
        { surface: 'わらいました', reading: 'わらいました', gloss: 'se rió' },
        { surface: 'はずかしかった', reading: 'はずかしかった', gloss: 'me daba vergüenza' },
        { surface: 'から', reading: 'から', gloss: 'vacío' },
      ],
      culturalNote: 'Llevar dulces a la oficina al volver de un viaje es una costumbre firme en Japón. Suelen dejarse en una mesa común, y quien los trae no siempre lo anuncia.',
      spanishSpeakerNote: 'たい expresa lo que uno quiere hacer: たべたいです. Y ても いいですか pide permiso: たべても いいですか, «¿puedo comerlo?». Las dos se construyen sobre la forma del verbo, no con un verbo aparte.',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué cuenta el texto?',
          options: [['nadie','Que nadie tocó los dulces tres días porque nadie preguntó, y quien los trajo tampoco lo dijo'],['robo','Que alguien se comió los dulces de otro'],['regalo','Que le regalaron una caja de dulces por su cumpleaños']],
          answer: 'nadie',
          evidence: '三日 まちました。 だれも たべませんでした … 「みんなに 『どうぞ』と いいたかったですが、 はずかしかったです。」',
          correct: 'Sí: el silencio venía de los dos lados.',
          incorrect: 'No hay robo ni cumpleaños. Cruza los tres días de espera con lo que dice Tanaka.',
          strategy: 'Si dos personajes callan por la misma razón, ese silencio compartido es el tema.' },
        { type: 'detail', skill: 'detail', prompt: '¿Cuántos días esperó antes de preguntar?',
          options: [['tres','Tres días; preguntó al cuarto'],['uno','Un día'],['siete','Una semana']],
          answer: 'tres',
          evidence: '三日 まちました … 四日め、 わたしは 田中さんに ききました。',
          correct: 'Correcto: esperó tres y preguntó el cuarto.',
          incorrect: 'Busca las dos frases con 三日 y 四日め.',
          strategy: 'El sufijo め convierte un número en ordinal: 四日め es «el cuarto día».' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa はずかしかった?',
          options: [['verguenza','Le daba vergüenza'],['alegria','Estaba contento'],['enfado','Estaba enfadado']],
          answer: 'verguenza',
          evidence: '「みんなに 『どうぞ』と いいたかったですが、 はずかしかったです。」',
          correct: 'Eso es: quería decirlo y no se atrevió.',
          incorrect: 'Va después de un が que contrasta con «quería decirlo»: es lo que se lo impidió.',
          strategy: 'La partícula が en medio de la frase opone el deseo y lo que lo frenó.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué ahora pone siempre una nota?',
          options: [['permiso','Para que nadie tenga que preguntar ni esperar tres días'],['limpieza','Para que no ensucien la mesa'],['nombre','Para que sepan quién los ha traído']],
          answer: 'permiso',
          evidence: 'いまは かならず かみを つけます。 「たべても いいです」と かきます。',
          correct: 'Sí: la nota dice exactamente el permiso que faltaba.',
          incorrect: 'La nota no lleva su nombre ni habla de limpieza: dice que se puede comer.',
          strategy: 'Si el texto cita lo que pone la nota, esa cita explica para qué sirve.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: la caja llevaba una nota con el nombre de quien la trajo.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'faux',
          evidence: 'はこには かみが ありません。 なまえも ありません。',
          correct: 'Falso: ni nota ni nombre, y de ahí viene todo.',
          incorrect: 'Busca las dos frases cortas sobre la caja. Las dos son negativas.',
          strategy: 'Dos negaciones seguidas describen lo que falta, y suele ser la causa del problema.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena la escena.',
          options: [['p1','Aparece la caja en la mesa común'],['p2','Tres días sin que nadie la toque'],['p3','Pregunta a Tanaka y él se ríe'],['p4','Ese día la caja se vacía']],
          answer: ['p1','p2','p3','p4'],
          evidence: 'かいしゃの つくえの 上に はこが あります … 三日 まちました … 四日め、 わたしは 田中さんに ききました … その日、 はこは からに なりました。',
          correct: 'Correcto: aparición, espera, pregunta y desenlace.',
          incorrect: 'Guíate por 三日, 四日め y その日.',
          strategy: 'Los días numerados ordenan la escena sin necesidad de interpretar.' },
      ],
      production: { prompt: 'Escribe 5–7 frases en japonés sobre algo que querías hacer y no sabías si podías. Usa dos veces たい y dos veces ても いいですか.', minWords: 60, maxWords: 160,
        hints: ['たべたいです。','たべても いいですか。','三日 まちました。','いまは かみを つけます。'] },
    },
    // ---------------------------------------------------------------- 10
    {
      slug: 'itadakimasu',
      title: 'Las palabras que se dicen',
      genre: 'reflexión breve',
      topic: 'las fórmulas fijas del día japonés',
      tags: ['japones a1', 'lectura', 'conjunciones', 'expresiones cotidianas'],
      intro: 'Al principio le parecían de adorno. Después de cuatro años cree que sostienen el día entero. Lectura de japonés A1.',
      mission: 'Averigua qué frase dice ahora aunque no haya nadie en casa.',
      seoTitle: 'Lectura de japonés A1: las palabras que se dicen | WeLearn',
      seoDescription: 'Lee una reflexión en japonés A1 y practica las conjunciones y las expresiones cotidianas. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['conjunciones', 'expresiones-cotidianas'],
      text: `日本語には いつも いう ことばが あります。

たべる まえに 「いただきます」。 でかける とき 「いってきます」。 かえる とき 「ただいま」。

はじめは、 これは かざりだと おもいました。 いみが ないと おもいました。

でも 四年 すんで、 かんがえが かわりました。

「いただきます」は 「ありがとう」では ありません。 「はじめます」です。 ごはんの じかんが ここから はじまります。

だから、 テレビを 見ながら たべる ときも いいます。

わたしは いま 一人で すんで います。

それでも 「いただきます」と いいます。 だれにも いいませんが、 じぶんに いいます。

しずかな へやで、 その ことばは とても おおきいです。`,
      objectives: [
        'Usar las conjunciones y conectores: でも, だから, それでも, まえに, あとで.',
        'Reconocer las fórmulas fijas del día y cuándo se dicen.',
        'Distinguir una fórmula de cortesía de una marca de comienzo.',
      ],
      vocabulary: [
        { surface: 'かざり', reading: 'かざり', gloss: 'adorno' },
        { surface: 'かんがえ', reading: 'かんがえ', gloss: 'idea, forma de pensar' },
        { surface: 'かわりました', reading: 'かわりました', gloss: 'cambió' },
        { surface: 'はじまります', reading: 'はじまります', gloss: 'empieza' },
        { surface: 'ながら', reading: 'ながら', gloss: 'mientras (haciendo dos cosas a la vez)' },
        { surface: '一人', reading: 'ひとり', gloss: 'solo, una persona' },
        { surface: 'それでも', reading: 'それでも', gloss: 'aun así' },
        { surface: 'じぶん', reading: 'じぶん', gloss: 'uno mismo' },
      ],
      culturalNote: 'いただきます no es exactamente «gracias»: marca el comienzo de la comida y se dice aunque se coma solo. Su pareja, ごちそうさま, marca el final.',
      spanishSpeakerNote: 'Fíjate en los conectores: でも y それでも introducen un contraste, だから una consecuencia, y まえに / あとで sitúan una acción antes o después de otra.',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué entendió el narrador con los años?',
          options: [['comienzo','Que «いただきます» no es dar las gracias: marca que la comida empieza'],['cortesia','Que los japoneses son muy corteses'],['solitario','Que vivir solo en Japón es difícil']],
          answer: 'comienzo',
          evidence: '「いただきます」は 「ありがとう」では ありません。 「はじめます」です。',
          correct: 'Sí, y el texto lo dice descartando primero la lectura fácil.',
          incorrect: 'No es un texto sobre cortesía ni sobre la soledad. Busca las dos frases sobre いただきます.',
          strategy: 'Cuando un texto dice «X no es Y, es Z», ahí está la definición.' },
        { type: 'detail', skill: 'detail', prompt: '¿Qué se dice al salir de casa?',
          options: [['ittekimasu','«いってきます»'],['tadaima','«ただいま»'],['gochisousama','«ごちそうさま»']],
          answer: 'ittekimasu',
          evidence: 'でかける とき 「いってきます」。 かえる とき 「ただいま」。',
          correct: 'Correcto: «ただいま» es al volver.',
          incorrect: 'Empareja cada fórmula con su momento: salir, volver, antes y después de comer.',
          strategy: 'La palabra とき (cuando) marca el momento de cada fórmula.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa かざり?',
          options: [['adorno','Adorno, algo puramente decorativo'],['costumbre','Costumbre antigua'],['regla','Regla obligatoria']],
          answer: 'adorno',
          evidence: 'はじめは、 これは かざりだと おもいました。 いみが ないと おもいました。',
          correct: 'Eso es, y la frase siguiente lo confirma: pensaba que no significaban nada.',
          incorrect: 'La frase siguiente aclara qué creía: que no tenían significado.',
          strategy: 'Si la frase siguiente repite la idea con otras palabras, úsala para deducir.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué lo dice aunque viva solo?',
          options: [['si','Porque no se lo dice a nadie: se lo dice a sí mismo, y así la comida empieza igual'],['costumbre','Porque ya no puede evitarlo'],['vecinos','Porque los vecinos podrían oírle']],
          answer: 'si',
          evidence: 'だれにも いいませんが、 じぶんに いいます。 しずかな へやで、 その ことばは とても おおきいです。',
          correct: 'Sí, y la última frase lo remata: en una habitación en silencio esa palabra suena grande.',
          incorrect: 'No lo presenta como un tic ni piensa en los vecinos. Lee las dos frases finales.',
          strategy: 'La estructura …が、… opone lo que no hace y lo que sí hace.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: dice «いただきます» también cuando come viendo la televisión.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'vrai',
          evidence: 'だから、 テレビを 見ながら たべる ときも いいます。',
          correct: 'Verdadero, y el だから la enlaza con lo anterior: si marca el comienzo, siempre vale.',
          incorrect: 'Busca la frase que empieza por だから.',
          strategy: 'La conjunción だから introduce la consecuencia de lo dicho antes.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena la reflexión.',
          options: [['p1','La lista de fórmulas y cuándo se dicen'],['p2','Al principio le parecían adorno'],['p3','Después de cuatro años cambia de idea'],['p4','Vive solo y sigue diciéndolo']],
          answer: ['p1','p2','p3','p4'],
          evidence: 'たべる まえに 「いただきます」… はじめは、 これは かざりだと おもいました … でも 四年 すんで、 かんがえが かわりました … わたしは いま 一人で すんで います。',
          correct: 'Correcto: las fórmulas, el prejuicio, el cambio y el presente.',
          incorrect: 'Guíate por はじめは, でも 四年, y いま.',
          strategy: 'Los marcadores はじめは y いま separan el antes del ahora.' },
      ],
      production: { prompt: 'Escribe 5–7 frases en japonés sobre una fórmula fija de tu idioma. Usa でも, だから y それでも.', minWords: 60, maxWords: 160,
        hints: ['たべる まえに 「いただきます」。','はじめは かざりだと おもいました。','でも かんがえが かわりました。','それでも いいます。'] },
    },
  ],
}
