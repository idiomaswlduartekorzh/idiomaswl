import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'tari-tari-a2',
  order: '04',
  color: '#dc2626',
  category: 'Verbos',
  level: 'A2',
  title: '〜たり〜たりする en japonés A2 — Lista no exhaustiva de acciones',
  shortTitle: '〜たり〜たりする',
  metaTitle: 'tari tari suru japones A2 — lista de acciones entre otras',
  description:
    '〜たり〜たりする (tari tari suru) en japones A2 sirve para enumerar acciones o estados como ejemplos representativos, sin ser exhaustivo. Equivale a "hacer cosas como X o Y" o "a veces X, a veces Y".',
  lead: '週末は音楽を聴いたり、本を読んだりします (Shuumatsu wa ongaku wo kiitari, hon wo yondari shimasu) = Los fines de semana hago cosas como escuchar musica o leer libros.',
  outcomes: [
    'Forma 〜たり〜たりします con verbos para describir actividades tipicas',
    'Entiende que la lista es ejemplificativa, no exhaustiva',
    'Usa 〜たり〜たりします tanto para rutinas como para alternancia de estados',
  ],

  guide: {
    goal: 'Usar 〜たり〜たりする para enumerar acciones o estados representativos.',
    model: '休みの日は映画を見たり、友達と話したり、料理したりします。= Los dias libres hago cosas como ver peliculas, charlar con amigos o cocinar.',
    formula: '[Verbo た] + り + [Verbo た] + り + します/する',
    decisions: [
      'La forma たり se hace igual que la forma た: mismas reglas de conjugacion',
      'Grupo 2: elimina る, agrega たり (食べる→食べたり, 見る→見たり)',
      'Grupo 1: く→いたり, む/ぬ/ぶ→んだり, す→したり, つ/う/る→ったり',
      'Irregulares: する→したり, くる→きたり',
      'Siempre termina en します (formal) o する (informal)',
      'Puede usarse con adjetivos y sustantivos tambien: 暑かったり寒かったりする (a veces hace calor, a veces frio)',
      'La lista implica "entre otras cosas": no es una lista completa',
    ],
    table: [
      ['Verbo', 'Forma たり', 'Ejemplo'],
      ['食べる (Gr.2)', '食べたり', '寿司を食べたりします'],
      ['飲む (Gr.1)', '飲んだり', 'お茶を飲んだりします'],
      ['行く (Gr.1)', '行ったり', '公園に行ったりします'],
      ['する (irregular)', 'したり', '運動したりします'],
    ],
    mistakes: [
      'No olvidar el します/する al final: la cadena de たり no es completa sin el verbo final.',
      'No confundir con て-form (secuencia fija): たり implica variedad y ejemplos, no orden.',
      'Se puede usar un solo たり: 映画を見たりします = hago cosas como ver peliculas (entre otras).',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se enumeran actividades típicas con 〜たり〜たりする?',
      paragraphs: [
        '〜たり〜たりします es la forma de hablar de actividades tipicas o habituales sin ser exhaustivo. Cuando dices 週末は映画を見たり、音楽を聴いたりします, no estas diciendo que solo haces eso: estas dando ejemplos representativos de lo que haces los fines de semana.',
        'Se forma con la misma base que la forma た: 見る→見た→見たり, 飲む→飲んだ→飲んだり. La cadena siempre termina en します (formal) o する (informal).',
      ],
    },
    {
      heading: '¿Qué otros usos tiene 〜たり〜たりする?',
      paragraphs: [
        'Ademas de acciones, 〜たり〜たりする se usa para describir alternancia de estados: 天気が良かったり悪かったりします = El tiempo a veces esta bien y a veces mal. Con adjetivos い: 形容詞 + かったり; con adjetivos な y sustantivos: だったり.',
        'Tambien puedes usar un solo たり para indicar "entre otras cosas": コーヒーを飲んだりします = Hago cosas como tomar cafe. Este uso con un solo verbo es natural en el habla cotidiana.',
      ],
    },
    {
      heading: '¿En qué se diferencia 〜たり〜たり de la forma て para enumerar?',
      paragraphs: [
        '〜たり〜たりする enumera acciones como EJEMPLOS representativos, no como lista completa ni en orden fijo: sugiere "cosas como A, B (entre otras)". Se forma con la forma た + り: 週末は、映画を見たり、買い物したりします (los fines de semana veo películas, voy de compras, etc.). La forma て en cadena (見て、買い物して), en cambio, presenta acciones en SECUENCIA ordenada, una tras otra. Por eso たり implica "hago cosas de este tipo" sin comprometerse con el orden ni con que sean todas. Siempre cierra con する conjugado según el tiempo: 〜たりしました (pasado), 〜たりしたい (deseo). La trampa para el hispanohablante es olvidar el する final y usar たり como si fuera un simple "y": su matiz es "entre otras cosas".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende a dar ejemplos de actividades habituales sin ser exhaustivo.',
    graphicPrompt: 'Lista visual de actividades con puntos suspensivos al final para indicar "entre otras cosas".',
    scene: [
      ['映画を見たり (eiga wo mitari)', 'ver peliculas (entre otras)'],
      ['音楽を聴いたり (ongaku wo kiitari)', 'escuchar musica (entre otras)'],
      ['料理したり (ryouri shitari)', 'cocinar (entre otras)'],
      ['〜したりします', 'hago cosas como... (verbo final)'],
    ],
    learnerModes: [
      'oral: describir el fin de semana tipico',
      'analitico: comparar たり con て-form',
      'productivo: hablar de hobbies y rutinas',
    ],
    reviewFocus: [
      'Forma た base para たり',
      'Cadena termina en します/する',
      'Lista ejemplificativa, no exhaustiva',
      'Un solo たり tambien es posible',
    ],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma たり correcta',
        tag: 'Opcion multiple',
        intro: 'Elige la forma correcta de たり para cada verbo.',
        type: 'choice',
        items: [
          {
            scene: 'Ver peliculas — 映画を見る',
            lines: [['Carlos', '週末は映画を___、音楽を聴いたりします。']],
            options: ['見たり', '見って', '見るたり', '見ます'],
            answer: '見たり',
            explain: '見る (Gr.2): 見 + た = 見た → 見たり. La forma たり usa la misma base que た.',
          },
          {
            scene: 'Cocinar — 料理する',
            lines: [['Sofia', '料理___、掃除したりします。']],
            options: ['したり', 'することり', 'します', 'するたり'],
            answer: 'したり',
            explain: 'する → した → したり. Irregular: する→したり.',
          },
          {
            scene: 'Beber cafe — コーヒーを飲む',
            lines: [['Leo', '朝はコーヒーを___、新聞を読んだりします。']],
            options: ['飲んだり', '飲いたり', '飲みたり', '飲うたり'],
            answer: '飲んだり',
            explain: '飲む (Gr.1): む→んだ → 飲んだ → 飲んだり.',
          },
          {
            scene: 'Ir al parque — 公園に行く',
            lines: [['Ana', '休みは公園に___、友達に会ったりします。']],
            options: ['行ったり', '行きたり', '行いたり', '行くたり'],
            answer: '行ったり',
            explain: '行く (irregular te/ta): 行った → 行ったり.',
          },
          {
            scene: 'Fin de la cadena',
            lines: [['Marco', '映画を見たり、本を読んだり___。']],
            options: ['します', 'する', 'しました', 'しています'],
            answer: 'します',
            explain: 'La cadena 〜たり〜たり siempre termina en します (formal) o する (informal).',
          },
          {
            scene: 'Escuchar musica — 音楽を聴く',
            lines: [['Lina', '音楽を___、踊ったりします。']],
            options: ['聴いたり', '聴くたり', '聴きたり', '聴って'],
            answer: '聴いたり',
            explain: '聴く (Gr.1): く→いた → 聴いた → 聴いたり.',
          },
          {
            scene: 'Hablar — 話す',
            lines: [['Bruno', '友達と話___、笑ったりしました。']],
            options: ['したり', 'すたり', 'するたり', 'しており'],
            answer: 'したり',
            explain: '話す (Gr.1): す→した → 話した → 話したり.',
          },
          {
            scene: 'Alternancia de clima',
            lines: [['Iris', '今日は暑かっ___、寒かったりします。']],
            options: ['たり', 'たり、', 'て', 'ました'],
            answer: 'たり',
            explain: 'Adjetivo い en pasado + たり: 暑かった → 暑かったり. Alternancia de estados.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Actividades de fin de semana',
        tag: '2 espacios',
        intro: 'Completa los dos verbos en forma たり.',
        type: 'dual',
        items: [
          {
            scene: 'Fin de semana de Carlos',
            lines: [['Carlos', '週末は映画を[[0]]、公園で散歩[[1]]します。']],
            blanks: [
              { options: ['見たり', '見るたり', '見ます'], answer: '見たり', explain: '見る (Gr.2): 見た → 見たり.' },
              { options: ['したり', 'するたり', 'します'], answer: 'したり', explain: 'する→した → したり. 散歩したり = hago cosas como pasear.' },
            ],
          },
          {
            scene: 'Hobbies de Sofia',
            lines: [['Sofia', '私は本を[[0]]、音楽を[[1]]します。']],
            blanks: [
              { options: ['読んだり', '読みたり', '読んで'], answer: '読んだり', explain: '読む (Gr.1): む→んだ → 読んだり.' },
              { options: ['聴いたり', '聴くたり', '聴いて'], answer: '聴いたり', explain: '聴く (Gr.1): く→いた → 聴いたり.' },
            ],
          },
          {
            scene: 'Tarde tipica de Ana',
            lines: [['Ana', '放課後は友達と話[[0]]、カフェでコーヒーを[[1]]します。']],
            blanks: [
              { options: ['したり', 'するたり', 'して'], answer: 'したり', explain: '話す→話した → 話したり.' },
              { options: ['飲んだり', '飲みたり', '飲んで'], answer: '飲んだり', explain: '飲む→飲んだ → 飲んだり.' },
            ],
          },
          {
            scene: 'Actividades de Marco',
            lines: [['Marco', '休みは写真を[[0]]、料理を[[1]]します。']],
            blanks: [
              { options: ['撮ったり', '撮りたり', '撮って'], answer: '撮ったり', explain: '撮る (toru, Gr.1): る→った → 撮った → 撮ったり.' },
              { options: ['したり', 'するたり', 'して'], answer: 'したり', explain: '料理する→料理した → 料理したり.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Parrafo de actividades tipicas',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta de たり en cada espacio.',
        type: 'guidedText',
        scene: 'Leo describe su fin de semana tipico',
        text: '週末は友達と映画を[[0]]、レストランで食事を[[1]]します。家では音楽を[[2]]、本を[[3]]、ゆっくり[[4]]します。',
        blanks: [
          { options: ['見たり', '見て', '見ます'], answer: '見たり', explain: '見る (Gr.2): 見た → 見たり.' },
          { options: ['したり', 'して', 'します'], answer: 'したり', explain: '食事する→食事した → 食事したり.' },
          { options: ['聴いたり', '聴いて', '聴きます'], answer: '聴いたり', explain: '聴く (Gr.1): 聴いた → 聴いたり.' },
          { options: ['読んだり', '読んで', '読みます'], answer: '読んだり', explain: '読む (Gr.1): 読んだ → 読んだり.' },
          { options: ['したり', 'して', 'します'], answer: 'したり', explain: 'する→した → したり. ゆっくりする = descansar tranquilamente.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma たり del verbo en parentesis.',
        type: 'freeText',
        scene: 'Lina describe su dia libre',
        text: '今日は家で料理を[[0]] (する)、映画を[[1]] (見る)します。友達に電話を[[2]] (かける)、メッセージを[[3]] (送る)します。夜は音楽を[[4]] (聴く)しました。',
        blanks: [
          { answer: 'したり', explain: 'する→した → したり.' },
          { answer: '見たり', explain: '見る (Gr.2): 見た → 見たり.' },
          { answer: 'かけたり', explain: 'かける (Gr.2): かけ + た = かけた → かけたり.' },
          { answer: '送ったり', explain: '送る (okuru, Gr.1): る→った → 送った → 送ったり.' },
          { answer: '聴いたり', explain: '聴く (Gr.1): く→いた → 聴いた → 聴いたり.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Describe actividades tipicas',
        tag: 'Escritura guiada',
        intro: 'Escribe la oracion completa con 〜たり〜たりします.',
        type: 'write',
        items: [
          {
            scene: 'Fin de semana tipico',
            prompt: 'Escribe: Los fines de semana hago cosas como correr o escuchar musica → 走る + 音楽を聴く',
            answer: '週末は走ったり、音楽を聴いたりします。',
            accepted: ['週末は走ったり、音楽を聴いたりします', '週末は走ったり音楽を聴いたりします'],
            explain: '走る (hashiru, Gr.1): る→った → 走ったり. 聴く: 聴いた → 聴いたり.',
          },
          {
            scene: 'Tarde en casa',
            prompt: 'Escribe: En casa a veces cocino o miro la tele → 料理する + テレビを見る',
            answer: '家では料理したり、テレビを見たりします。',
            accepted: ['家では料理したり、テレビを見たりします', '料理したり、テレビを見たりします'],
            explain: 'する→したり, 見る→見たり. Termina en します.',
          },
          {
            scene: 'Actividades con amigos',
            prompt: 'Escribe: Con mis amigos hacemos cosas como ir al cine o comer fuera → 映画を見る + 外食する',
            answer: '友達と映画を見たり、外食したりします。',
            accepted: ['友達と映画を見たり、外食したりします', '映画を見たり、外食したりします'],
            explain: '見る→見たり, 外食する→外食した → 外食したり.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Mision final',
        tag: 'Escritura libre',
        intro: 'Describe tus actividades tipicas usando 〜たり〜たりします.',
        type: 'write',
        items: [
          {
            scene: 'Tu fin de semana tipico',
            prompt: '週末は___たり、___たりします。 (dos actividades que haces)',
            answer: '週末は映画を見たり、音楽を聴いたりします。',
            accepted: ['たり', 'します'],
            explain: 'Usa dos verbos en forma たり y termina en します.',
          },
          {
            scene: 'Tus hobbies',
            prompt: '趣味は___たり、___たりすることです。 (dos hobbies)',
            answer: '趣味は音楽を聴いたり、本を読んだりすることです。',
            accepted: ['たり', 'することです', 'たりする'],
            explain: '趣味は〜たり〜たりすること = Mi hobby es hacer cosas como...',
          },
          {
            scene: 'Lo que haces cuando tienes tiempo libre',
            prompt: '暇なとき、___たりします。 (una o dos actividades)',
            answer: '暇なとき、散歩したり、音楽を聴いたりします。',
            accepted: ['たり', 'します'],
            explain: '暇なとき = cuando tengo tiempo libre. Usa 〜たりします para dar ejemplos.',
          },
        ],
      },
    ],
  },
}

export default topic
