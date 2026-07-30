import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'kamoshirenai-a2',
  order: '10',
  color: '#dc2626',
  category: 'Expresion',
  level: 'A2',
  title: '～かもしれない en japonés A2 — Posibilidad',
  shortTitle: '～かもしれない',
  metaTitle: 'kamoshirenai japones A2 — posibilidad quizas tal vez',
  description:
    '～かもしれません (kamoshiremasen) en japones A2 expresa posibilidad o incertidumbre: "quizas, tal vez, puede que...". Se usa cuando el hablante no esta seguro y solo especula. Equivale a "maybe / perhaps" en ingles.',
  lead: '雨が降るかもしれません (ame ga furu kamoshiremasen) = Quizas llueva. 田中さんは来ないかもしれない = Puede que Tanaka no venga.',
  outcomes: [
    'Forma ～かもしれません con verbos, adjetivos y sustantivos en forma plana',
    'Usa ～かもしれません para especulaciones y suposiciones inciertas',
    'Distingue el grado de certeza: かもしれない (baja) vs と思います (media) vs でしょう (media-alta)',
  ],

  guide: {
    goal: 'Expresar posibilidad e incertidumbre con ～かもしれません en japones A2.',
    model: '明日は雪かもしれません。(Ashita wa yuki kamoshiremasen.) = Quizas manana nieve. 彼は忙しいかもしれません。= Puede que el este ocupado.',
    formula: '[Forma plana] + かもしれません (formal) / かもしれない (informal)',
    decisions: [
      'Verbos: forma diccionario o forma ta antes de かもしれない: 来るかもしれない, 来たかもしれない',
      'Adjetivos い: forma plana + かもしれない: 難しいかもしれない',
      'Adjetivos な: sin だ antes de かもしれない: 便利かもしれない (NO 便利だかもしれない)',
      'Sustantivos: sin だ antes de かもしれない: 先生かもしれない (NO 先生だかもしれない)',
      'La diferencia clave con adjetivos な y sustantivos: NO se usa だ (a diferencia de と思います)',
      'Negacion del verbo dentro: 来ないかもしれない = puede que no venga',
    ],
    table: [
      ['Tipo', 'Forma plana', 'Con かもしれない'],
      ['Verbo', '来る (kuru)', '来るかもしれない (quizas venga)'],
      ['Adjetivo い', '難しい', '難しいかもしれない (quizas sea dificil)'],
      ['Adjetivo な', '便利 (benri)', '便利かもしれない (quizas sea conveniente)'],
      ['Sustantivo', '先生 (sensei)', '先生かもしれない (quizas sea profesor)'],
    ],
    mistakes: [
      'Con adjetivos な y sustantivos, NO uses だ antes de かもしれない: 便利かもしれない (correcto), 便利だかもしれない (incorrecto en el nivel A2 estandar).',
      'La diferencia con と思います: かもしれない implica mas incertidumbre (50% o menos). と思います es mas firme (60-80%).',
      'En habla rapida, かもしれない se contrae a かも: 来るかも (puede que venga). Solo informal.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se expresa posibilidad con ～かもしれない?',
      paragraphs: [
        '～かもしれません (kamoshiremasen) es la forma de expresar posibilidad o incertidumbre en japones. Se construye con la forma plana del verbo o adjetivo: 雨が降るかもしれません = Quizas llueva. La clave importante: con adjetivos な y sustantivos, NO se agrega だ antes de かもしれない.',
        'La forma informal es かもしれない (sin ます): 遅れるかもしれない = puede que llegue tarde. En habla muy casual, se abrevia a solo かも: 遅れるかも.',
      ],
    },
    {
      heading: '¿Cómo se gradúa la certeza en japonés (かもしれない, でしょう, にちがいない)?',
      paragraphs: [
        'El japones tiene varias formas de expresar certeza con diferentes grados: かもしれない (quizas, ~50% o menos), でしょう (probablemente, ~70%), と思います (creo que, ~70-80%), に違いない (sin duda, ~90%). Aprende estas expresiones para comunicar exactamente que tan seguro estas.',
        'En conversacion cotidiana, かもしれない es muy frecuente para no afirmar demasiado. Los japoneses tienden a ser indirectos y el uso de かもしれない refleja esa tendencia.',
      ],
    },
    {
      heading: '¿Cómo se conecta かもしれない con cada tipo de palabra?',
      paragraphs: [
        'かもしれない (o su forma cortés かもしれません) se une a la forma PLANA de la palabra. Con verbos y adjetivos い va directo: 雨が降るかもしれない (quizá llueva), 高いかもしれない (quizá sea caro). Con sustantivos y adjetivos な se une sin だ: 学生かもしれない (quizá sea estudiante), 静かかもしれない (quizá esté tranquilo) —nunca 学生だかもしれない—. Expresa una posibilidad baja o insegura, más débil que でしょう. En conversación casual se acorta a かも: 行くかも (a lo mejor voy). La trampa para el hispanohablante es meter だ delante con sustantivos/な-adjetivos: la regla es quitar el だ antes de かもしれない.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante usa forma plana + かもしれない sin だ para adjetivos な y sustantivos.',
    graphicPrompt: 'Escala de certeza: かもしれない (nube) → でしょう (sol con nubes) → と思います (sol).',
    scene: [
      ['来るかもしれません (kuru kamoshiremasen)', 'Quizas venga'],
      ['難しいかもしれません (muzukashii kamoshiremasen)', 'Quizas sea dificil'],
      ['便利かもしれません (benri kamoshiremasen)', 'Quizas sea conveniente (adj. な, sin だ)'],
      ['雨かもしれません (ame kamoshiremasen)', 'Quizas llueva (sustantivo, sin だ)'],
    ],
    learnerModes: [
      'oral: hacer suposiciones sobre el tiempo, personas, situaciones',
      'analitico: diferencia con だ y sin だ segun tipo de palabra',
      'contextual: gradacion de certeza',
    ],
    reviewFocus: [
      'Verbos y adj. い: forma plana + かもしれない',
      'Adj. な y sustantivos: SIN だ antes de かもしれない',
      'Negacion dentro: 〜ないかもしれない',
      'Informal: かも',
    ],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Posibilidad correcta',
        tag: 'Opcion multiple',
        intro: 'Elige la forma correcta de かもしれません.',
        type: 'choice',
        items: [
          {
            scene: 'Quizas llueva manana',
            lines: [['Carlos', '明日は___かもしれません。(quizas llueva manana)']],
            options: ['雨', '雨だ', '雨は', '雨を'],
            answer: '雨',
            explain: 'Sustantivo + かもしれない: sin だ. 雨かもしれません = quizas (sea) lluvia / llueva.',
          },
          {
            scene: 'Quizas sea dificil',
            lines: [['Sofia', 'この試験は___かもしれません。(quizas sea dificil)']],
            options: ['難しい', '難しいです', '難しくない', '難しだ'],
            answer: '難しい',
            explain: 'Adjetivo い: forma plana directa + かもしれません.',
          },
          {
            scene: 'Quizas no venga — 来る',
            lines: [['Enzo', '田中さんは___かもしれません。(quizas Tanaka no venga)']],
            options: ['来ない', '来ません', '来ないです', '来る'],
            answer: '来ない',
            explain: 'Verbo negativo forma plana: 来ない + かもしれません = quizas no venga.',
          },
          {
            scene: 'Quizas sea conveniente — 便利',
            lines: [['Ana', 'このアプリは___かもしれません。(quizas sea util)']],
            options: ['便利', '便利だ', '便利です', '便利な'],
            answer: '便利',
            explain: 'Adjetivo な: SIN だ antes de かもしれない. 便利かもしれません.',
          },
          {
            scene: 'Quizas ya termino',
            lines: [['Marco', '映画はもう___かもしれません。(quizas la pelicula ya termino)']],
            options: ['終わった', '終わりました', '終わります', '終わる'],
            answer: '終わった',
            explain: 'Verbo en forma た (pasado plano) + かもしれない = quizas ya termino.',
          },
          {
            scene: 'Quizas sea el director',
            lines: [['Lina', 'あの人は社長___かもしれません。(quizas sea el director)']],
            options: ['かもしれません', 'だかもしれません', 'はかもしれません', 'がかもしれません'],
            answer: 'かもしれません',
            explain: 'Sustantivo (社長) + かもしれません. Sin だ antes de かもしれない.',
          },
          {
            scene: 'Quizas este perdido',
            lines: [['Gael', '彼は道に___かもしれません。(quizas este perdido — 迷う)']],
            options: ['迷っている', '迷います', '迷いました', '迷う'],
            answer: '迷っている',
            explain: '迷っている (progresivo plano) + かもしれません = quizas este perdido ahora.',
          },
          {
            scene: 'Forma informal',
            lines: [['Elena', '電車、遅れてる___。(quizas el tren este retrasado — informal)']],
            options: ['かも', 'かもしれません', 'かもしれない', 'でしょう'],
            answer: 'かも',
            explain: 'かも es la forma informal muy abreviada de かもしれない. Muy usada en el habla cotidiana.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Suposiciones en dialogo',
        tag: '2 espacios',
        intro: 'Completa los dos espacios con かもしれません.',
        type: 'dual',
        items: [
          {
            scene: 'Sobre el tiempo',
            lines: [['Carlos', '空が暗いね。明日は[[0]]かもしれない。'], ['Sofia', 'そうだね。傘を持っていった方が[[1]]かもしれないね。']],
            blanks: [
              { options: ['雨', '雨だ', '雨が'], answer: '雨', explain: 'Sustantivo (雨) + かもしれない: sin だ.' },
              { options: ['いい', 'いいです', 'よく'], answer: 'いい', explain: '形容詞 い (いい): forma plana + かもしれない.' },
            ],
          },
          {
            scene: 'Sobre una persona',
            lines: [['Enzo', 'あの人、田中さん[[0]]かもしれないよ。'], ['Ana', 'でも、もっと若い[[1]]かもしれない。']],
            blanks: [
              { options: ['かもしれません', 'だかもしれません', 'はかもしれません'], answer: 'かもしれません', explain: '田中さん (sustantivo) + かもしれません. Sin だ.' },
              { options: ['かもしれない', 'だかもしれない', 'はかもしれない'], answer: 'かもしれない', explain: 'もっと若い (adj. い comparativo) + かもしれない.' },
            ],
          },
          {
            scene: 'Planes inciertos',
            lines: [['Marco', '明日、パーティーに[[0]]かもしれない。'], ['Lina', 'じゃあ、私も[[1]]かもしれないよ。']],
            blanks: [
              { options: ['行けない', '行きません', '行かない'], answer: '行けない', explain: '行けない (no puedo ir, potencial negativo plano) + かもしれない.' },
              { options: ['行かない', '行きません', '行けない'], answer: '行かない', explain: '行かない (no voy, negativo voluntario plano) + かもしれない.' },
            ],
          },
          {
            scene: 'Sobre el examen',
            lines: [['Gael', 'この試験は[[0]]かもしれない。'], ['Elena', '私は[[1]]かもしれない、ちゃんと勉強したから。']],
            blanks: [
              { options: ['難しい', '難しいです', '難しだ'], answer: '難しい', explain: '難しい (adj. い) + かもしれない.' },
              { options: ['大丈夫', '大丈夫だ', '大丈夫です'], answer: '大丈夫', explain: '大丈夫 (adj. な): SIN だ antes de かもしれない.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Suposiciones sobre el dia',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta para expresar posibilidad.',
        type: 'guidedText',
        scene: 'Carlos especula sobre su dia de manana',
        text: '明日は忙しい[[0]]かもしれません。会議が[[1]]かもしれません。でも、もし終わったら、友達に[[2]]かもしれません。夜は[[3]]かもしれません。とにかく、明日は大変[[4]]かもしれない。',
        blanks: [
          { options: ['かもしれません', 'だかもしれません', 'はかもしれません'], answer: 'かもしれません', explain: '忙しい (adj. い) + かもしれません.' },
          { options: ['ある', 'あります', 'あった'], answer: 'ある', explain: 'ある (forma diccionario plana) + かもしれません.' },
          { options: ['会える', '会えます', '会います'], answer: '会える', explain: '会える (potencial de 会う, forma plana) + かもしれません.' },
          { options: ['疲れている', '疲れています', '疲れる'], answer: '疲れている', explain: '疲れている (progresivo plano) + かもしれません = quizas este cansado.' },
          { options: ['だ', 'かもしれない', 'です'], answer: 'だ', explain: '大変 (adj. な): 大変 + かもしれない. Aqui la opcion correcta es solo かもしれない ya que 大変 ya es adjetivo na sin だ.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma plana correcta antes de かもしれません.',
        type: 'freeText',
        scene: 'Sofia especula sobre varias situaciones',
        text: 'あの人は外国人[[0]]かもしれません。日本語が[[1]]かもしれません。でも、韓国語は[[2]]かもしれません。今日は早く[[3]]かもしれません。天気が悪い[[4]]かもしれません。',
        blanks: [
          { answer: '外国人', explain: 'Sustantivo + かもしれません (sin だ): 外国人かもしれません.' },
          { answer: '上手', explain: 'Adjetivo な (上手): sin だ. 上手かもしれません.' },
          { answer: '話せない', explain: '話せない (no puede hablar, potencial negativo) + かもしれません.' },
          { answer: '帰る', explain: '帰る (forma diccionario) + かもしれません.' },
          { answer: '悪い', explain: '悪い (adj. い) + かもしれません. 天気が悪いかもしれません.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Escribe posibilidades',
        tag: 'Escritura guiada',
        intro: 'Escribe la oracion completa de posibilidad.',
        type: 'write',
        items: [
          {
            scene: 'Quizas llueva manana',
            prompt: 'Escribe: Quizas manana llueva → 明日 + 雨が降る',
            answer: '明日は雨が降るかもしれません。',
            accepted: ['明日は雨が降るかもしれません', '明日、雨が降るかもしれない'],
            explain: '降る (forma diccionario) + かもしれません.',
          },
          {
            scene: 'Quizas no venga a la clase',
            prompt: 'Escribe: Quizas Enzo no venga a la clase → 授業 + 来ない',
            answer: 'ダビッドさんは授業に来ないかもしれません。',
            accepted: ['来ないかもしれません', '来ないかもしれない'],
            explain: '来ない (negativo plano) + かもしれません.',
          },
          {
            scene: 'Quizas sea japones',
            prompt: 'Escribe: Quizas aquella persona sea japonesa → あの人 + 日本人',
            answer: 'あの人は日本人かもしれません。',
            accepted: ['あの人は日本人かもしれません', 'あの人が日本人かもしれない'],
            explain: '日本人 (sustantivo): SIN だ. 日本人かもしれません.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Mision final',
        tag: 'Escritura libre',
        intro: 'Expresa posibilidades usando ～かもしれません.',
        type: 'write',
        items: [
          {
            scene: 'Tu prediccion del tiempo',
            prompt: '明日の天気は___かもしれません。(predice el tiempo de manana)',
            answer: '明日の天気は晴れかもしれません。',
            accepted: ['かもしれません', 'かもしれない', 'かも'],
            explain: 'Sustantivo de tiempo (晴れ, 雨, 雪) + かもしれません.',
          },
          {
            scene: 'Una suposicion sobre alguien',
            prompt: '___さんは___かもしれません。(suposicion sobre alguien)',
            answer: 'あの人は学生かもしれません。',
            accepted: ['かもしれません', 'かもしれない'],
            explain: 'Sustantivo o adjetivo + かもしれません para especular sobre alguien.',
          },
          {
            scene: 'Algo que tal vez haras',
            prompt: '今週末、___かもしれません。(algo que quizas hagas este fin de semana)',
            answer: '今週末、友達と映画を見るかもしれません。',
            accepted: ['かもしれません', 'かもしれない', 'かも'],
            explain: 'Verbo en forma diccionario + かもしれません para planes inciertos.',
          },
        ],
      },
    ],
  },
}

export default topic
