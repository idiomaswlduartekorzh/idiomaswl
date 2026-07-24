import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'te-mo-ii-a2',
  order: '08',
  color: '#dc2626',
  category: 'Verbos',
  level: 'A2',
  title: '～てもいい y ～てはいけない en japonés A2 — Permiso y prohibición',
  shortTitle: '～てもいい / ～てはいけない',
  metaTitle: 'te mo ii te wa ikenai japones A2 — permiso prohibicion',
  description:
    '～てもいいです (te mo ii desu) expresa permiso en japones A2: "puedes hacer algo / esta bien que hagas algo". Su opuesto ～てはいけません (te wa ikemasen) expresa prohibicion: "no puedes hacer algo / no esta permitido".',
  lead: 'ここで写真を撮ってもいいですか？(Koko de shashin wo totte mo ii desu ka?) = ¿Puedo tomar fotos aqui? / ここで写真を撮ってはいけません。= No se pueden tomar fotos aqui.',
  outcomes: [
    'Forma ～てもいいです para pedir y dar permiso',
    'Usa ～てはいけません para expresar prohibicion',
    'Distingue permiso explícito de prohibicion en contextos sociales',
  ],

  guide: {
    goal: 'Usar ～てもいい y ～てはいけない para permiso y prohibicion en japones A2.',
    model: 'ここに座ってもいいですか？(Koko ni suwatte mo ii desu ka?) = ¿Puedo sentarme aqui? / ここに座ってはいけません。= No se puede sentar aqui.',
    formula: '[Verbo en て形] + もいいです (permiso) / [Verbo en て形] + はいけません (prohibicion)',
    decisions: [
      'Permiso: て形 + もいいです/もいい: 食べてもいいです = puedes comer / esta bien comer',
      'Permiso pregunta: て形 + もいいですか？= ¿Puedo...? / ¿Esta permitido...?',
      'Prohibicion: て形 + はいけません/はいけない: 食べてはいけません = no puedes comer',
      'Respuesta positiva: はい、(どうぞ)。/ はい、いいですよ。',
      'Respuesta negativa: いいえ、〜てはいけません。/ すみません、できません。',
      'La negacion del permiso es ～てはいけません, no ～てもいいません (esta forma no existe)',
    ],
    table: [
      ['Forma', 'Ejemplo', 'Significado'],
      ['〜てもいいです', '入ってもいいです', 'Puedes entrar'],
      ['〜てもいいですか？', '開けてもいいですか？', '¿Puedo abrirlo?'],
      ['〜てはいけません', '入ってはいけません', 'No puedes entrar'],
      ['〜なくてもいいです', '来なくてもいいです', 'No tienes que venir (no es necesario)'],
    ],
    mistakes: [
      'No confundir ～てはいけません (prohibicion) con ～なくてはいけません (obligacion). Son opuestos en significado.',
      '～てもいいません no existe: para negar permiso, usa ～てはいけません directamente.',
      'La forma informal es ～てもいい y ～てはいけない: en conversacion entre amigos se usa sin です.',
    ],
  },

  seo: [
    {
      heading: '～てもいい y ～てはいけない: permiso y prohibicion en japones',
      paragraphs: [
        '～てもいいです se construye con la て形 del verbo mas もいいです: 食べてもいいです = puedes comer / esta permitido comer. Para pedir permiso, agrega か al final: 食べてもいいですか？= ¿Puedo comer?',
        'La prohibicion usa la misma base: て形 + はいけません: 食べてはいけません = no puedes comer. Esta construccion es muy comun en anuncios y normas publicas.',
      ],
    },
    {
      heading: 'Diferencia entre no-necesario y prohibicion',
      paragraphs: [
        'Una distincion importante: ～なくてもいいです significa "no es necesario / no tienes que" (sin obligacion), mientras que ～てはいけません significa "no esta permitido / no puedes" (prohibicion). 来なくてもいいです = no tienes que venir (pero puedes si quieres). 来てはいけません = no puedes venir (prohibicion).',
        'En el nivel A2 es esencial entender esta diferencia para comunicarse correctamente en situaciones cotidianas como restaurantes, museos, aulas o transportes publicos.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante usa てもいい para permiso y てはいけない para prohibicion.',
    graphicPrompt: 'Dos columnas con iconos: marca verde (てもいい) y marca roja (てはいけない).',
    scene: [
      ['写真を撮ってもいいです (shashin wo totte mo ii desu)', 'Se puede sacar fotos'],
      ['写真を撮ってはいけません (shashin wo totte wa ikemasen)', 'No se puede sacar fotos'],
      ['入ってもいいですか？(haitte mo ii desu ka?)', '¿Puedo entrar?'],
      ['ここで食べてはいけません (koko de tabete wa ikemasen)', 'No se puede comer aqui'],
    ],
    learnerModes: [
      'situacional: pedir permiso en lugares publicos',
      'oral: preguntas てもいいですか？',
      'lectura: anuncios de prohibicion en japones',
    ],
    reviewFocus: [
      'て形 + もいいです (permiso)',
      'て形 + はいけません (prohibicion)',
      'Diferencia: なくてもいいです vs てはいけません',
      'Pregunta de permiso: てもいいですか？',
    ],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Permiso o prohibicion',
        tag: 'Opcion multiple',
        intro: 'Elige la forma correcta segun la situacion.',
        type: 'choice',
        items: [
          {
            scene: 'Pedir permiso para sentarse',
            lines: [['Carlos', 'ここに___か？(¿Puedo sentarme aqui?)']],
            options: ['座ってもいいですか', '座ってはいけませんか', '座りますか', '座っていいですか'],
            answer: '座ってもいいですか',
            explain: '座る (suwaru, Gr.1): る→って → 座って + もいいですか？Pedir permiso.',
          },
          {
            scene: 'Prohibicion en el museo',
            lines: [['Aviso', '館内では写真を___。(No se pueden tomar fotos dentro del museo)']],
            options: ['撮ってはいけません', '撮ってもいいです', '撮りません', '撮ってもいいですか'],
            answer: '撮ってはいけません',
            explain: '撮る (toru, Gr.1): る→って → 撮って + はいけません. Prohibicion.',
          },
          {
            scene: 'Permiso dado',
            lines: [['Sofia', 'この本を___。(Puedes llevarte este libro)']],
            options: ['借りてもいいです', '借りてはいけません', '借りません', '借りてもいいですか'],
            answer: '借りてもいいです',
            explain: '借りる (kariru, Gr.2): 借りて + もいいです. Dar permiso.',
          },
          {
            scene: 'Prohibicion en el tren',
            lines: [['Aviso', '車内での飲食は___。(Esta prohibido comer y beber en el tren)']],
            options: ['してはいけません', 'してもいいです', 'しません', 'してもいいですか'],
            answer: 'してはいけません',
            explain: 'する→して + はいけません. Prohibicion en el tren.',
          },
          {
            scene: 'Pedir permiso para abrir',
            lines: [['Iván', '窓を___か？(¿Puedo abrir la ventana?)']],
            options: ['開けてもいいですか', '開けてはいけませんか', '開けますか', '開けてもいいです'],
            answer: '開けてもいいですか',
            explain: '開ける (akeru, Gr.2): 開けて + もいいですか？Pedir permiso.',
          },
          {
            scene: 'No es necesario venir',
            lines: [['Ana', '明日は___。(Manana no tienes que venir)']],
            options: ['来なくてもいいです', '来てはいけません', '来ません', '来てもいいですか'],
            answer: '来なくてもいいです',
            explain: 'くる→こない→来なくて + もいいです. No es necesario (no obligacion).',
          },
          {
            scene: 'Permiso para usar el bano',
            lines: [['Marco', 'お手洗いを___か？(¿Puedo usar el bano?)']],
            options: ['使ってもいいですか', '使ってはいけませんか', '使いますか', '使てもいいですか'],
            answer: '使ってもいいですか',
            explain: '使う (tsukau, Gr.1): う→って → 使って + もいいですか？',
          },
          {
            scene: 'Prohibicion de correr',
            lines: [['Lina', '廊下では___。(No se puede correr en el pasillo)']],
            options: ['走ってはいけません', '走ってもいいです', '走りません', '走ってもいいですか'],
            answer: '走ってはいけません',
            explain: '走る (hashiru, Gr.1): る→って → 走って + はいけません.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Permiso y prohibicion en contexto',
        tag: '2 espacios',
        intro: 'Completa los dos espacios de permiso o prohibicion.',
        type: 'dual',
        items: [
          {
            scene: 'En la biblioteca',
            lines: [['Carlos', '先生、この本を[[0]]か？'], ['Sensei', 'いいですよ。でも、飲み物は[[1]]ね。']],
            blanks: [
              { options: ['借りてもいいですか', '借りてはいけませんか', '借りますか'], answer: '借りてもいいですか', explain: '借りる→借りて + もいいですか？' },
              { options: ['持ってきてはいけません', '持ってきてもいいです', '持ちません'], answer: '持ってきてはいけません', explain: '持ってくる→持ってきて + はいけません. Prohibicion.' },
            ],
          },
          {
            scene: 'En el parque',
            lines: [['Sofia', 'ここで音楽を[[0]]か？'], ['Iván', 'いいえ、夜10時以降は[[1]]よ。']],
            blanks: [
              { options: ['聴いてもいいですか', '聴いてはいけませんか', '聴きますか'], answer: '聴いてもいいですか', explain: '聴く→聴いて + もいいですか？' },
              { options: ['してはいけません', 'してもいいです', 'しません'], answer: 'してはいけません', explain: 'する→して + はいけません. Prohibicion despues de las 10.' },
            ],
          },
          {
            scene: 'En casa de un amigo',
            lines: [['Ana', 'シャワーを[[0]]か？'], ['Marco', 'もちろん、[[1]]よ。どうぞ。']],
            blanks: [
              { options: ['浴びてもいいですか', '浴びてはいけませんか', '浴びますか'], answer: '浴びてもいいですか', explain: '浴びる (abiru, Gr.2): 浴びて + もいいですか？' },
              { options: ['浴びてもいいです', '浴びてはいけません', '浴びません'], answer: '浴びてもいいです', explain: '浴びて + もいいです. Dar permiso con もちろん.' },
            ],
          },
          {
            scene: 'Reglas del restaurante',
            lines: [['Lina', 'ここでタバコを[[0]]か？'], ['Empleado', 'すみません、当店では[[1]]。']],
            blanks: [
              { options: ['吸ってもいいですか', '吸ってはいけませんか', '吸いますか'], answer: '吸ってもいいですか', explain: '吸う (suu, Gr.1): う→って → 吸って + もいいですか？' },
              { options: ['吸ってはいけません', '吸ってもいいです', '吸いません'], answer: '吸ってはいけません', explain: '吸って + はいけません. No se permite fumar.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Normas de la escuela',
        tag: 'Texto guiado',
        intro: 'Elige permiso o prohibicion en cada espacio.',
        type: 'guidedText',
        scene: 'Reglas de la escuela de japones WeLearn',
        text: '教室では日本語を[[0]]。スマホは授業中に[[1]]。でも、休み時間には[[2]]。辞書を[[3]]。友達のノートを[[4]]。',
        blanks: [
          { options: ['話してもいいです', '話してはいけません', '話しません'], answer: '話してもいいです', explain: '話す→話して + もいいです. Se puede hablar japones en clase.' },
          { options: ['使ってはいけません', '使ってもいいです', '使いません'], answer: '使ってはいけません', explain: '使う→使って + はいけません. No se puede usar el movil en clase.' },
          { options: ['使ってもいいです', '使ってはいけません', '使いません'], answer: '使ってもいいです', explain: 'En el descanso si se puede usar el movil.' },
          { options: ['使ってもいいです', '使ってはいけません', '使いません'], answer: '使ってもいいです', explain: 'Se puede usar diccionario.' },
          { options: ['借りてもいいです', '借りてはいけません', '借りません'], answer: '借りてもいいです', explain: 'Se puede pedir prestado el cuaderno del companero.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma de permiso o prohibicion del verbo en parentesis.',
        type: 'freeText',
        scene: 'Dario explica las reglas de su casa',
        text: '私の家では猫を[[0]] (飼う)。でも、犬は[[1]] (飼う)。友達は[[2]] (来る)。夜12時以降は大きな音楽は[[3]] (聴く)。冷蔵庫の食べ物は自由に[[4]] (食べる)。',
        blanks: [
          { answer: '飼ってもいいです', explain: '飼う (kau, Gr.1): う→って → 飼って + もいいです.' },
          { answer: '飼ってはいけません', explain: '飼って + はいけません. Prohibicion de perros.' },
          { answer: '来てもいいです', explain: 'くる→きて → 来て + もいいです. Los amigos pueden venir.' },
          { answer: '聴いてはいけません', explain: '聴く→聴いて + はいけません. Prohibicion de musica fuerte de noche.' },
          { answer: '食べてもいいです', explain: '食べて + もいいです. Se puede comer libremente.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Escribe sobre permisos y prohibiciones',
        tag: 'Escritura guiada',
        intro: 'Escribe la oracion completa de permiso o prohibicion.',
        type: 'write',
        items: [
          {
            scene: 'Pedir permiso en clase',
            prompt: 'Escribe la pregunta: ¿Puedo ir al bano? → トイレに行く',
            answer: 'トイレに行ってもいいですか？',
            accepted: ['トイレに行ってもいいですか', 'お手洗いに行ってもいいですか'],
            explain: '行く (Gr.1, irregular): 行って + もいいですか？',
          },
          {
            scene: 'Prohibicion en el parque',
            prompt: 'Escribe: En este parque no se puede hacer barbacoa → バーベキューする',
            answer: 'この公園ではバーベキューをしてはいけません。',
            accepted: ['バーベキューをしてはいけません', 'バーベキューしてはいけません'],
            explain: 'する→して + はいけません.',
          },
          {
            scene: 'No es necesario',
            prompt: 'Escribe: No tienes que traer dinero → お金を持ってくる',
            answer: 'お金を持ってこなくてもいいです。',
            accepted: ['お金を持ってこなくてもいいです', 'お金は持ってこなくてもいいです'],
            explain: '持ってくる→持ってこない→持ってこなくて + もいいです.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Mision final',
        tag: 'Escritura libre',
        intro: 'Escribe reglas propias usando permiso y prohibicion.',
        type: 'write',
        items: [
          {
            scene: 'Reglas de tu aula ideal',
            prompt: '授業中は___てもいいです / ___てはいけません。(una regla)',
            answer: '授業中はスマホを使ってはいけません。',
            accepted: ['てもいいです', 'てはいけません'],
            explain: 'Inventa una regla de clase usando permiso o prohibicion.',
          },
          {
            scene: 'Pedir permiso en una situacion real',
            prompt: '___てもいいですか？ (pide permiso en una situacion real)',
            answer: 'ここで写真を撮ってもいいですか？',
            accepted: ['てもいいですか'],
            explain: 'Usa て形 + もいいですか？para pedir permiso cortesmente.',
          },
          {
            scene: 'Una regla de tu casa',
            prompt: '私の家では___てもいいです。でも、___てはいけません。',
            answer: '私の家では音楽を聴いてもいいです。でも、夜は大きな音を出してはいけません。',
            accepted: ['てもいいです', 'てはいけません'],
            explain: 'Combina permiso y prohibicion para describir una regla.',
          },
        ],
      },
    ],
  },
}

export default topic
