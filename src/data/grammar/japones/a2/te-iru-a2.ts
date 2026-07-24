import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'te-iru-a2',
  order: '02',
  color: '#dc2626',
  category: 'Verbos',
  level: 'A2',
  title: '〜ている en japonés A2 — Progresivo y estado resultante',
  shortTitle: '〜ている',
  metaTitle: 'te iru japones A2 — progresivo y estado resultante',
  description:
    '〜ている (te-iru) en japones A2 expresa dos ideas clave: una accion en progreso (estoy haciendo) y un estado resultante de una accion pasada (esta abierto, esta casado). Es el equivalente del presente continuo y tambien de estados permanentes.',
  lead: '〜ています (te imasu): 今、勉強しています (ima, benkyou shite imasu) = Estoy estudiando ahora. 窓が開いています (mado ga aite imasu) = La ventana esta abierta (estado resultante).',
  outcomes: [
    'Forma 〜ています con verbos de accion para el progresivo',
    'Distingue entre accion en progreso y estado resultante con 〜ている',
    'Usa verbos clave de estado: 知っています, 住んでいます, 結婚しています',
  ],

  guide: {
    goal: 'Usar 〜ている para progresivo y estado resultante en japones A2.',
    model: '今、音楽を聴いています。(Ima, ongaku wo kiite imasu.) = Estoy escuchando musica ahora. / 田中さんは結婚しています。(Tanaka-san wa kekkon shite imasu.) = Tanaka-san esta casado.',
    formula: '[Verbo en て形] + います (formal) / いる (informal)',
    decisions: [
      'Progresivo: accion en curso ahora: 食べています (estoy comiendo), 走っています (estoy corriendo)',
      'Estado resultante: resultado visible de una accion pasada: 窓が開いています (la ventana esta abierta)',
      'Verbos de estado tipicos: 知っています (se/conozco), 住んでいます (vivo en), 結婚しています (esta casado)',
      'Negativo progresivo: 〜ていません (no estoy haciendo), 〜ていない (informal)',
      'Pregunta: 〜ていますか？= ¿Estas...? / ¿Esta...?',
    ],
    table: [
      ['Uso', 'Ejemplo japones', 'Traduccion'],
      ['Progresivo', '今、食べています', 'Estoy comiendo ahora'],
      ['Estado resultante', '窓が開いています', 'La ventana esta abierta'],
      ['Estado permanente', '東京に住んでいます', 'Vivo en Tokio'],
      ['Negacion', '食べていません', 'No estoy comiendo'],
    ],
    mistakes: [
      '知る (saber) no se usa como 知っている en negacion: "no se" = 知りません, no 知っていません.',
      'Un verbo como 死ぬ (morir) da 死んでいます = esta muerto (estado), no "esta muriendo".',
      '〜ている no siempre es progresivo: depende del tipo de verbo (accion vs cambio de estado).',
    ],
  },

  seo: [
    {
      heading: '〜ている: el presente continuo y los estados en japones',
      paragraphs: [
        '〜ている (te-iru) es una de las construcciones mas utiles del japones A2. En su uso mas basico expresa una accion en progreso: 今、勉強しています = Estoy estudiando ahora. Se forma con la て形 del verbo seguida de います (formal) o いる (informal).',
        'Sin embargo, 〜ている tambien describe estados resultantes: 窓が開いています no significa "la ventana esta abriendose" sino "la ventana esta abierta" — es el resultado de haberse abierto. Esta doble funcion es clave para entender el japones natural.',
      ],
    },
    {
      heading: 'Verbos de estado tipicos con 〜ている',
      paragraphs: [
        'Algunos verbos del japones se usan casi siempre en 〜ている porque expresan estados: 知っています (se / conozco), 住んでいます (vivo en), 結婚しています (estoy casado), 着ています (llevo puesto), 持っています (tengo / llevo). Aprende estos verbos como frases hechas.',
        'La negacion de 〜ています es 〜ていません: 田中さんは結婚していません = Tanaka-san no esta casado. En japones informal, ている se contrae frecuentemente a てる: 食べてる = estoy comiendo.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante distingue progresivo y estado resultante con 〜ている, y aprende verbos de estado clave.',
    graphicPrompt: 'Dos columnas: accion en progreso (con icono de movimiento) vs estado resultante (con icono de estado fijo).',
    scene: [
      ['食べています (tabete imasu)', 'estoy comiendo (progresivo)'],
      ['窓が開いています (mado ga aite imasu)', 'la ventana esta abierta (estado)'],
      ['東京に住んでいます (Toukyou ni sunde imasu)', 'vivo en Tokio (estado)'],
      ['結婚しています (kekkon shite imasu)', 'esta casado (estado resultante)'],
    ],
    learnerModes: [
      'visual: tabla progresivo vs estado',
      'analitico: tipo de verbo determina el uso',
      'oral: preguntas con 〜ていますか？',
    ],
    reviewFocus: [
      'て形 + います',
      'Progresivo vs estado resultante',
      'Verbos de estado: 知っている, 住んでいる, 結婚している',
      'Negacion: 〜ていません',
    ],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Progresivo o estado',
        tag: 'Opcion multiple',
        intro: 'Elige la forma correcta de 〜ている para cada situacion.',
        type: 'choice',
        items: [
          {
            scene: 'Accion en progreso',
            lines: [['Carlos', '今、テレビを___ (ver la tele ahora mismo)']],
            options: ['見ています', '見ました', '見ます', '見ていません'],
            answer: '見ています',
            explain: '見る (Grupo 2): 見て + います = 見ています. Progresivo: estoy viendo.',
          },
          {
            scene: 'Estado resultante',
            lines: [['Bruno', 'ドアが___ (la puerta esta cerrada)']],
            options: ['閉まっています', '閉まりました', '閉まります', '閉まっていません'],
            answer: '閉まっています',
            explain: '閉まる (shimaru) Gr.1: る→って → 閉まって + います. Estado: la puerta esta cerrada.',
          },
          {
            scene: 'Vivir en un lugar',
            lines: [['Sofia', '大阪に___ (vivo en Osaka)']],
            options: ['住んでいます', '住みます', '住んでいました', '住みました'],
            answer: '住んでいます',
            explain: '住む (sumu) Gr.1: む→んで → 住んで + います. Estado permanente: vivo en Osaka.',
          },
          {
            scene: 'Saber algo',
            lines: [['Ana', '田中さんを___ (conozco a Tanaka)']],
            options: ['知っています', '知ります', '知っていません', '知りました'],
            answer: '知っています',
            explain: '知る (shiru) Gr.1: る→って → 知って + います. 知っています = se / conozco.',
          },
          {
            scene: 'Negacion progresiva',
            lines: [['Marco', '今、___ (no estoy durmiendo)']],
            options: ['寝ていません', '寝ません', '寝ています', '寝ました'],
            answer: '寝ていません',
            explain: '寝る (Grupo 2): 寝て + いません = 寝ていません. Negacion progresiva.',
          },
          {
            scene: 'Casado/a',
            lines: [['Lina', '鈴木さんは___ (Suzuki-san esta casado)']],
            options: ['結婚しています', '結婚します', '結婚していません', '結婚しました'],
            answer: '結婚しています',
            explain: '結婚する → して + います = 結婚しています. Estado permanente resultante.',
          },
          {
            scene: 'Llevar puesto',
            lines: [['Diego', '田中さんは赤いシャツを___ (Tanaka lleva una camisa roja)']],
            options: ['着ています', '着ます', '着ていません', '着ました'],
            answer: '着ています',
            explain: '着る (kiru, Grupo 2): 着て + います = 着ています. Estado: lleva puesto.',
          },
          {
            scene: 'Pregunta progresiva',
            lines: [['Clara', '今、何を___か？ (¿Que estas haciendo ahora?)']],
            options: ['していますか', 'しますか', 'しましたか', 'してはいけません'],
            answer: 'していますか',
            explain: 'する → して + います + か = していますか. Pregunta progresiva.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos verbos en 〜ている',
        tag: '2 espacios',
        intro: 'Completa los dos verbos en 〜ている del dialogo.',
        type: 'dual',
        items: [
          {
            scene: 'Conversacion en el cafe',
            lines: [['Carlos', '今、何を[[0]]か？'], ['Bruno', 'コーヒーを[[1]]。']],
            blanks: [
              { options: ['していますか', 'しますか', 'しましたか'], answer: 'していますか', explain: 'する→して + います + か. Pregunta progresiva.' },
              { options: ['飲んでいます', '飲みます', '飲みました'], answer: '飲んでいます', explain: '飲む (Gr.1): む→んで + います = 飲んでいます.' },
            ],
          },
          {
            scene: 'Descripcion de la familia',
            lines: [['Sofia', '姉は東京に[[0]]。兄は会社で[[1]]。']],
            blanks: [
              { options: ['住んでいます', '住みます', '住みました'], answer: '住んでいます', explain: '住む (Gr.1): 住んで + います. Estado permanente.' },
              { options: ['働いています', '働きます', '働きました'], answer: '働いています', explain: '働く (hataraku, Gr.1): く→いて → 働いて + います.' },
            ],
          },
          {
            scene: 'Estado de la habitacion',
            lines: [['Ana', '窓が[[0]]、電気も[[1]]。']],
            blanks: [
              { options: ['開いています', '開きます', '開きました'], answer: '開いています', explain: '開く (aku, Gr.1): く→いて → 開いて + います. Estado: esta abierta.' },
              { options: ['ついています', 'つきます', 'つきました'], answer: 'ついています', explain: '付く (tsuku, Gr.1): く→いて → ついて + います. La luz esta encendida.' },
            ],
          },
          {
            scene: 'Sobre una persona',
            lines: [['Marco', '田中さんは結婚[[0]]か？ — はい、[[1]]。']],
            blanks: [
              { options: ['していますか', 'しますか', 'しましたか'], answer: 'していますか', explain: 'する + て + います + か. Pregunta de estado.' },
              { options: ['結婚しています', '結婚します', '結婚しました'], answer: '結婚しています', explain: '結婚して + います. Estado: esta casado.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Parrafo con 〜ている',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta de 〜ている en cada espacio.',
        type: 'guidedText',
        scene: 'Una tarde en casa de la familia Tanaka',
        text: 'お父さんは居間でニュースを[[0]]。お母さんは台所で夕食を[[1]]。姉はスマホで音楽を[[2]]、弟は宿題を[[3]]。窓は[[4]]、部屋は少し寒い。',
        blanks: [
          { options: ['見ています', '見ます', '見ました'], answer: '見ています', explain: '見る (Gr.2): 見て + います. Progresivo: esta viendo.' },
          { options: ['作っています', '作ります', '作りました'], answer: '作っています', explain: '作る (tsukuru, Gr.1): る→って → 作って + います. Progresivo.' },
          { options: ['聴いています', '聴きます', '聴きました'], answer: '聴いています', explain: '聴く (Gr.1): く→いて → 聴いて + います.' },
          { options: ['しています', 'します', 'しました'], answer: 'しています', explain: 'する→して + います. Progresivo: esta haciendo.' },
          { options: ['開いています', '開きます', '開きました'], answer: '開いています', explain: '開く (Gr.1): く→いて → 開いて + います. Estado: esta abierta.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma 〜ています del verbo en parentesis.',
        type: 'freeText',
        scene: 'Describiendo a personas en el parque',
        text: 'あの人は走って[[0]] (いる)。子どもたちはサッカーを[[1]] (する)。女の人は犬と[[2]] (歩く)。ベンチで男の人が本を[[3]] (読む)。空は青くて、太陽が[[4]] (輝く)。',
        blanks: [
          { answer: 'います', explain: '走って + います = 走っています (esta corriendo). Aqui el て ya esta en el texto.' },
          { answer: 'しています', explain: 'する→して + います = しています. Esta jugando.' },
          { answer: '歩いています', explain: '歩く (Gr.1): く→いて → 歩いて + います = 歩いています.' },
          { answer: '読んでいます', explain: '読む (Gr.1): む→んで → 読んで + います = 読んでいます.' },
          { answer: '輝いています', explain: '輝く (kagayaku, Gr.1): く→いて → 輝いて + います = 輝いています.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Describe una accion o estado',
        tag: 'Escritura guiada',
        intro: 'Escribe la oracion completa usando 〜ています.',
        type: 'write',
        items: [
          {
            scene: 'Progresivo: estoy leyendo',
            prompt: 'Escribe: Estoy leyendo un libro ahora → 今、本を___ (読む)',
            answer: '今、本を読んでいます。',
            accepted: ['今、本を読んでいます', '今 本を読んでいます'],
            explain: '読む (Gr.1): む→んで → 読んで + います = 読んでいます.',
          },
          {
            scene: 'Estado: la luz esta apagada',
            prompt: 'Escribe: La luz esta apagada → 電気が___ (消える)',
            answer: '電気が消えています。',
            accepted: ['電気が消えています', '電気が消えています。'],
            explain: '消える (kieru, Gr.2): 消え + て + います = 消えています. Estado resultante.',
          },
          {
            scene: 'Vivir en',
            prompt: 'Escribe: Vivo en Bucaramanga → ブカラマンガに___ (住む)',
            answer: 'ブカラマンガに住んでいます。',
            accepted: ['ブカラマンガに住んでいます', 'ブカラマンガに住んでいます。'],
            explain: '住む (Gr.1): む→んで → 住んで + います = 住んでいます.',
          },
          {
            scene: 'No estoy durmiendo',
            prompt: 'Escribe la negacion: No estoy durmiendo → 寝て___',
            answer: '寝ていません。',
            accepted: ['寝ていません', '寝ていません。'],
            explain: '寝る (Gr.2): 寝て + いません = 寝ていません. Negacion progresiva.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Mision final',
        tag: 'Escritura guiada',
        intro: 'Describe lo que ves a tu alrededor ahora mismo usando 〜ています.',
        type: 'write',
        items: [
          {
            scene: 'Describe tu entorno',
            prompt: '今、___ています。___ています。 (dos oraciones de lo que estas haciendo)',
            answer: '今、日本語を勉強しています。音楽を聴いています。',
            accepted: ['勉強しています', '聴いています', '見ています', '読んでいます'],
            explain: 'Cualquier verbo en て + います que describa una accion en progreso.',
          },
          {
            scene: 'Estado de tu habitacion',
            prompt: '窓が___ (abierta/cerrada). 電気が___ (encendida/apagada).',
            answer: '窓が開いています。電気がついています。',
            accepted: ['開いています', '閉まっています', 'ついています', '消えています'],
            explain: 'Estado resultante: 開いています (abierta) o 閉まっています (cerrada).',
          },
          {
            scene: 'Sobre ti mismo',
            prompt: '私は___に住んでいます。___ています。 (donde vives y que haces)',
            answer: '私はブカラマンガに住んでいます。日本語を勉強しています。',
            accepted: ['住んでいます', '勉強しています', '働いています'],
            explain: '住む: 住んでいます. Usa 〜ています para hablar de tu vida.',
          },
        ],
      },
    ],
  },
}

export default topic
