import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'nakereba-naranai-a2',
  order: '07',
  color: '#dc2626',
  category: 'Verbos',
  level: 'A2',
  title: '～なければならない en japonés A2 — Obligación',
  shortTitle: '～なければならない',
  metaTitle: 'nakereba naranai japones A2 — obligacion deber tener que',
  description:
    '～なければならない (nakereba naranai) y su variante ～なくてはいけない (nakute wa ikenai) expresan obligacion en japones A2: "tener que hacer algo / deber hacer algo". Son equivalentes al "must" del ingles o al "deber/tener que" del espanol.',
  lead: '行かなければなりません (ikanakerebanarimasen) = Tengo que ir. 宿題をしなくてはいけません (shukudai wo shinakute wa ikemasen) = Tengo que hacer la tarea.',
  outcomes: [
    'Forma ～なければなりません con verbos de los tres grupos',
    'Usa la variante ～なくてはいけません como alternativa equivalente',
    'Entiende el contexto de obligacion externa o necesidad',
  ],

  guide: {
    goal: 'Expresar obligacion en japones A2 con ～なければなりません y ～なくてはいけません.',
    model: '毎日練習しなければなりません。(Mainichi renshuu shinakereba narimasen.) = Tengo que practicar todos los dias. 早く起きなくてはいけません。= Tengo que levantarme temprano.',
    formula: '[Verbo en forma ない (sin い)] + ければなりません / [Verbo en forma なくて] + はいけません',
    decisions: [
      'Paso 1: forma la negacion simple del verbo: 行く→行かない, 食べる→食べない, する→しない',
      'Paso 2a: quita い y agrega ければなりません: 行かない→行かなければなりません',
      'Paso 2b (variante): cambia ない a なくて y agrega はいけません: 行かない→行かなくてはいけません',
      'Ambas formas son equivalentes en significado',
      'Forma coloquial: ～なきゃ (nakya) o ～なくちゃ (nakucha) — solo en habla informal',
      'Grupo 2: 食べる→食べない→食べなければなりません',
      'Irregular: する→しない→しなければなりません',
    ],
    table: [
      ['Verbo', 'Forma ない', 'Obligacion'],
      ['行く (iku)', '行かない', '行かなければなりません'],
      ['食べる (taberu)', '食べない', '食べなければなりません'],
      ['する (suru)', 'しない', 'しなければなりません'],
      ['来る (kuru)', 'こない', 'こなければなりません'],
    ],
    mistakes: [
      'La base es la forma ない (negacion): no uses la forma て ni la forma た.',
      'なければ no es lo mismo que なければならない: solo nakereba = "si no...", necesitas agregar ならない.',
      'En conversacion cotidiana es normal usar ～なきゃ (nakya) como abreviacion: 行かなきゃ = Tengo que ir.',
    ],
  },

  seo: [
    {
      heading: '～なければならない: la obligacion en japones A2',
      paragraphs: [
        '～なければなりません es la forma de expresar obligacion en japones A2. Se construye a partir de la forma negativa del verbo: 行く→行かない, quitas el い final y agregas ければなりません: 行かなければなりません. Para Grupo 2: 食べる→食べない→食べなければなりません.',
        'La variante ～なくてはいけません es igualmente correcta y comun: 行かなくてはいけません. En habla coloquial se abrevia mucho: ～なきゃ o ～なくちゃ.',
      ],
    },
    {
      heading: 'Diferencia entre las formas de obligacion',
      paragraphs: [
        '～なければならない y ～なくてはいけない son practicamente sinonimas en A2. La primera es ligeramente mas formal. En la escritura academica o noticias se usa ～なければならない; en la conversacion cotidiana ambas son igualmente frecuentes.',
        'Para la negacion de la obligacion (no es necesario), usa ～なくてもいいです: 行かなくてもいいです = No tienes que ir (no es necesario). Esta forma es la negacion semantica, no gramatical.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante forma la obligacion a partir de la forma ない del verbo.',
    graphicPrompt: 'Flecha: verbo → forma ない → quita い → + ければなりません.',
    scene: [
      ['行かなければなりません (ikanakereba narimasen)', 'Tengo que ir'],
      ['食べなければなりません (tabenakereba narimasen)', 'Tengo que comer'],
      ['しなければなりません (shinakereba narimasen)', 'Tengo que hacerlo'],
      ['早く起きなくてはいけません (hayaku okinakute wa ikemasen)', 'Tengo que levantarme temprano'],
    ],
    learnerModes: [
      'analitico: derivacion desde la forma ない',
      'oral: hablar de obligaciones diarias',
      'contextual: diferencia obligacion formal vs coloquial',
    ],
    reviewFocus: [
      'Forma ない como base',
      'Quita い + ければなりません',
      'Variante: なくてはいけません',
      'Coloquial: なきゃ / なくちゃ',
    ],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Obligacion correcta',
        tag: 'Opcion multiple',
        intro: 'Elige la forma correcta de obligacion para cada situacion.',
        type: 'choice',
        items: [
          {
            scene: 'Tengo que estudiar — 勉強する',
            lines: [['Carlos', '明日、試験があるから___。(tengo que estudiar)']],
            options: ['勉強しなければなりません', '勉強しなければなりませんか', '勉強しますか', '勉強してはいけません'],
            answer: '勉強しなければなりません',
            explain: 'する→しない→しなければなりません. Obligacion de estudiar.',
          },
          {
            scene: 'Tengo que ir al medico — 行く',
            lines: [['Sofia', '病院に___。(tengo que ir al hospital)']],
            options: ['行かなければなりません', '行かなければなりませんか', '行きません', '行ってはいけません'],
            answer: '行かなければなりません',
            explain: '行く (Gr.1): 行かない→行かなければなりません.',
          },
          {
            scene: 'Tengo que comer — 食べる',
            lines: [['David', '薬を飲む前に___。(tengo que comer antes de tomar la medicina)']],
            options: ['食べなければなりません', '食べなくてはなりません', '食べてはいけません', '食べません'],
            answer: '食べなければなりません',
            explain: '食べる (Gr.2): 食べない→食べなければなりません.',
          },
          {
            scene: 'Variante con なくてはいけません',
            lines: [['Ana', '早く___。(tengo que llegar temprano — はやく来る)']],
            options: ['来なくてはいけません', '来てはいけません', '来ません', '来なければなりませんか'],
            answer: '来なくてはいけません',
            explain: '来る (kuru, irregular): こない→来なくてはいけません. Variante de obligacion.',
          },
          {
            scene: 'Tengo que descansar — 休む',
            lines: [['Marco', '体のために___。(tengo que descansar por mi salud)']],
            options: ['休まなければなりません', '休みなければなりません', '休んではいけません', '休みません'],
            answer: '休まなければなりません',
            explain: '休む (yasumu, Gr.1): む→ま → 休まない → 休まなければなりません.',
          },
          {
            scene: 'Tengo que escribir un email — メールを書く',
            lines: [['Lina', '今日中に___。(tengo que escribir el email hoy)']],
            options: ['書かなければなりません', '書きなければなりません', '書いてはいけません', '書きません'],
            answer: '書かなければなりません',
            explain: '書く (Gr.1): 書かない→書かなければなりません.',
          },
          {
            scene: 'Tengo que volver pronto',
            lines: [['Jose', '早く家に___。(tengo que volver a casa pronto)']],
            options: ['帰らなければなりません', '帰りなければなりません', '帰ってはいけません', '帰りません'],
            answer: '帰らなければなりません',
            explain: '帰る (kaeru, Gr.1): 帰らない→帰らなければなりません.',
          },
          {
            scene: 'Coloquial — tengo que ir',
            lines: [['Zhanna', 'もう___。(tengo que irme ya — forma coloquial)']],
            options: ['行かなきゃ', '行かなければなりません', '行かなくてはいけません', '行きません'],
            answer: '行かなきゃ',
            explain: '行かなきゃ es la forma coloquial de 行かなければならない. Muy comun en conversacion.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Obligaciones del dia',
        tag: '2 espacios',
        intro: 'Completa los dos espacios de obligacion.',
        type: 'dual',
        items: [
          {
            scene: 'Antes del examen',
            lines: [['Carlos', '明日は試験だから、今晩たくさん[[0]]し、早く[[1]]。']],
            blanks: [
              { options: ['勉強しなければなりません', '勉強します', '勉強してはいけません'], answer: '勉強しなければなりません', explain: 'する→しない→しなければなりません.' },
              { options: ['寝なければなりません', '寝ます', '寝てはいけません'], answer: '寝なければなりません', explain: '寝る (Gr.2): 寝ない→寝なければなりません.' },
            ],
          },
          {
            scene: 'Trabajo importante',
            lines: [['Sofia', '今日は会議があるから、スーツを[[0]]し、9時までに[[1]]。']],
            blanks: [
              { options: ['着なければなりません', '着ます', '着てはいけません'], answer: '着なければなりません', explain: '着る (kiru, Gr.2): 着ない→着なければなりません.' },
              { options: ['来なければなりません', '来ます', '来てはいけません'], answer: '来なければなりません', explain: '来る→こない→来なければなりません.' },
            ],
          },
          {
            scene: 'Vida sana',
            lines: [['David', '健康のために野菜を[[0]]し、運動も[[1]]。']],
            blanks: [
              { options: ['食べなければなりません', '食べます', '食べてはいけません'], answer: '食べなければなりません', explain: '食べる→食べない→食べなければなりません.' },
              { options: ['しなければなりません', 'します', 'してはいけません'], answer: 'しなければなりません', explain: 'する→しない→しなければなりません.' },
            ],
          },
          {
            scene: 'Antes de salir',
            lines: [['Ana', '出かける前に宿題を[[0]]し、部屋も[[1]]。']],
            blanks: [
              { options: ['しなければなりません', 'します', 'してはいけません'], answer: 'しなければなりません', explain: 'する→しない→しなければなりません.' },
              { options: ['片付けなければなりません', '片付けます', '片付けてはいけません'], answer: '片付けなければなりません', explain: '片付ける (katazukeru, Gr.2): 片付けない→片付けなければなりません.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Las obligaciones de Yuki',
        tag: 'Texto guiado',
        intro: 'Elige la forma de obligacion correcta en cada espacio.',
        type: 'guidedText',
        scene: 'Yuki describe sus obligaciones de manana',
        text: '明日は忙しい日だ。まず8時に[[0]]。それから銀行に[[1]]し、スーパーで買い物を[[2]]。午後は病院に[[3]]し、夜は友達に電話を[[4]]。',
        blanks: [
          { options: ['起きなければなりません', '起きます', '起きてはいけません'], answer: '起きなければなりません', explain: '起きる (Gr.2): 起きない→起きなければなりません.' },
          { options: ['行かなければなりません', '行きます', '行ってはいけません'], answer: '行かなければなりません', explain: '行く→行かない→行かなければなりません.' },
          { options: ['しなければなりません', 'します', 'してはいけません'], answer: 'しなければなりません', explain: 'する→しない→しなければなりません.' },
          { options: ['行かなくてはいけません', '行きます', '行ってはいけません'], answer: '行かなくてはいけません', explain: '行く→行かない→行かなくてはいけません. Variante equivalente.' },
          { options: ['かけなければなりません', 'かけます', 'かけてはいけません'], answer: 'かけなければなりません', explain: 'かける (Gr.2): かけない→かけなければなりません.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma de obligacion del verbo en parentesis.',
        type: 'freeText',
        scene: 'Marco explica sus obligaciones de esta semana',
        text: '今週はレポートを[[0]] (書く)。月曜日に先生に[[1]] (会う)。火曜日に図書館に本を[[2]] (返す)。毎日1時間は[[3]] (練習する)。そして金曜日までに申請書を[[4]] (出す)。',
        blanks: [
          { answer: '書かなければなりません', explain: '書く→書かない→書かなければなりません.' },
          { answer: '会わなければなりません', explain: '会う (au, Gr.1): う→わ → 会わない → 会わなければなりません.' },
          { answer: '返さなければなりません', explain: '返す (kaesu, Gr.1): す→さ → 返さない → 返さなければなりません.' },
          { answer: '練習しなければなりません', explain: 'する→しない→練習しなければなりません.' },
          { answer: '出さなければなりません', explain: '出す (dasu, Gr.1): す→さ → 出さない → 出さなければなりません.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Escribe obligaciones',
        tag: 'Escritura guiada',
        intro: 'Escribe la oracion completa de obligacion.',
        type: 'write',
        items: [
          {
            scene: 'Tengo que estudiar japones',
            prompt: 'Escribe: Tengo que estudiar japones todos los dias → 毎日 + 日本語を勉強する',
            answer: '毎日日本語を勉強しなければなりません。',
            accepted: ['毎日日本語を勉強しなければなりません', '日本語を勉強しなければなりません'],
            explain: 'する→しない→しなければなりません.',
          },
          {
            scene: 'Tengo que llegar a tiempo',
            prompt: 'Escribe: Tengo que llegar a tiempo → 時間通りに来る',
            answer: '時間通りに来なければなりません。',
            accepted: ['時間通りに来なければなりません', '時間通りに来なくてはいけません'],
            explain: '来る→こない→来なければなりません.',
          },
          {
            scene: 'Tengo que comer verduras',
            prompt: 'Escribe: Tengo que comer verduras → 野菜を食べる',
            answer: '野菜を食べなければなりません。',
            accepted: ['野菜を食べなければなりません', '野菜を食べなくてはいけません'],
            explain: '食べる (Gr.2): 食べない→食べなければなりません.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Mision final',
        tag: 'Escritura libre',
        intro: 'Escribe sobre tus obligaciones usando ～なければなりません.',
        type: 'write',
        items: [
          {
            scene: 'Tu obligacion de hoy',
            prompt: '今日は___なければなりません。(algo que tienes que hacer hoy)',
            answer: '今日はレポートを書かなければなりません。',
            accepted: ['なければなりません', 'なくてはいけません'],
            explain: 'Usa la forma ない del verbo + ければなりません.',
          },
          {
            scene: 'Obligacion para la salud',
            prompt: '健康のために___なければなりません。(algo que debes hacer por tu salud)',
            answer: '健康のために毎日運動しなければなりません。',
            accepted: ['なければなりません', 'なくてはいけません'],
            explain: 'する→しない→しなければなりません. Habla de habitos saludables.',
          },
          {
            scene: 'Obligacion para aprender japones',
            prompt: '日本語を上手になるために___なければなりません。',
            answer: '日本語を上手になるために毎日練習しなければなりません。',
            accepted: ['なければなりません', 'なくてはいけません', 'なきゃ'],
            explain: 'Expresa que la obligacion es necesaria para un objetivo.',
          },
        ],
      },
    ],
  },
}

export default topic
