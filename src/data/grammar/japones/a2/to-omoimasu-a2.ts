import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'to-omoimasu-a2',
  order: '09',
  color: '#dc2626',
  category: 'Expresion',
  level: 'A2',
  title: '～と思います en japonés A2 — Expresar opinión',
  shortTitle: '～と思います',
  metaTitle: 'to omoimasu japones A2 — expresar opinion creo que pienso',
  description:
    '～と思います (to omoimasu) en japones A2 sirve para expresar opinion, creencia o suposicion personal: "creo que..., pienso que..., me parece que...". Se usa con frases en forma plana (diccionario) antes de と.',
  lead: '難しいと思います (muzukashii to omoimasu) = Creo que es dificil. 明日は雨が降ると思います (ashita wa ame ga furu to omoimasu) = Creo que manana va a llover.',
  outcomes: [
    'Forma ～と思います con verbos, adjetivos y sustantivos en forma plana',
    'Distingue ～と思います (opinion) de ～と思っています (opinion sostenida)',
    'Usa ～と思いません para expresar que no crees algo',
  ],

  guide: {
    goal: 'Expresar opinion y creencia personal con ～と思います en japones A2.',
    model: '彼は日本人だと思います。(Kare wa nihonjin da to omoimasu.) = Creo que el es japones. この映画は面白いと思います。= Creo que esta pelicula es interesante.',
    formula: '[Frase en forma plana] + と思います',
    decisions: [
      'Verbos: forma diccionario o forma た antes de と: 行くと思います, 行ったと思います',
      'Adjetivos い: forma plana directa: 難しいと思います, 難しくないと思います',
      'Adjetivos な: だ antes de と: 便利だと思います',
      'Sustantivos: だ antes de と: 先生だと思います',
      'Negacion del verbo antes de と: 行かないと思います = creo que no ira',
      'Negacion de おもいます: ～と思いません = no creo que... (menos comun que negar la frase interna)',
      '～と思っています = creo/pienso (opinion sostenida en el tiempo, no solo en el momento)',
    ],
    table: [
      ['Tipo', 'Forma plana', 'Con と思います'],
      ['Verbo pres.', '行く (iku)', '行くと思います (creo que va)'],
      ['Adjetivo い', '難しい (muzukashii)', '難しいと思います (creo que es dificil)'],
      ['Adjetivo な', '便利だ (benri da)', '便利だと思います (creo que es conveniente)'],
      ['Sustantivo', '先生だ (sensei da)', '先生だと思います (creo que es profesor)'],
    ],
    mistakes: [
      'No uses forma masu/desu antes de と: NO 行きますと思います. Usa forma plana: 行くと思います.',
      'Con adjetivos な y sustantivos, necesitas だ antes de と: 便利だと思います, no 便利と思います.',
      '～と思いません es menos natural que negar dentro de la frase: 行かないと思います (creo que no ira) es mas comun que 行くと思いません.',
    ],
  },

  seo: [
    {
      heading: '～と思います: dar tu opinion en japones A2',
      paragraphs: [
        '～と思います es una de las expresiones mas utiles del japones A2 para dar tu opinion de forma educada. La clave es usar la forma plana (diccionario) del verbo, adjetivo o sustantivo antes de と: 日本語は難しいと思います = Creo que el japones es dificil.',
        'Con sustantivos y adjetivos な, necesitas agregar だ: 東京は便利だと思います. Con adjetivos い, se usa directamente la forma plana sin だ.',
      ],
    },
    {
      heading: 'Diferencia entre と思います y と思っています',
      paragraphs: [
        '～と思います expresa una opinion en el momento de hablar. ～と思っています expresa una opinion sostenida en el tiempo o una decision que uno ha tomado: 来年日本に行こうと思っています = Tengo en mente ir a Japon el proximo ano.',
        'Para expresar que alguien mas cree algo, debes usar ～と思っています: 彼は忙しいと思っています (El cree que esta ocupado). Con ～と思います de tercera persona puede sonar raro sin contexto.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante forma opinion con forma plana + と思います para diferentes tipos de palabras.',
    graphicPrompt: 'Bocadillo de habla con forma plana + と思います, como un globo de pensamiento.',
    scene: [
      ['難しいと思います (muzukashii to omoimasu)', 'Creo que es dificil (adj. い)'],
      ['行くと思います (iku to omoimasu)', 'Creo que ira (verbo)'],
      ['先生だと思います (sensei da to omoimasu)', 'Creo que es profesor (sust.)'],
      ['面白くないと思います (omoshirokunai to omoimasu)', 'Creo que no es interesante'],
    ],
    learnerModes: [
      'oral: dar y pedir opiniones sobre temas cotidianos',
      'analitico: forma plana antes de と',
      'productivo: reaccionar con と思います a preguntas',
    ],
    reviewFocus: [
      'Forma plana (no masu) antes de と',
      'Adjetivos な y sustantivos: + だ',
      'Adjetivos い: directo',
      'Negacion dentro de la frase, no del おもいます',
    ],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Opinion correcta',
        tag: 'Opcion multiple',
        intro: 'Elige la forma correcta de ～と思います.',
        type: 'choice',
        items: [
          {
            scene: 'Opinion sobre el japones',
            lines: [['Carlos', '日本語は___と思います。(creo que el japones es dificil)']],
            options: ['難しい', '難しいです', '難しくない', '難しだ'],
            answer: '難しい',
            explain: 'Adjetivo い en forma plana: 難しい + と思います. NO usa です antes de と.',
          },
          {
            scene: 'Suposicion sobre el tiempo',
            lines: [['Sofia', '明日は___と思います。(creo que manana va a llover)']],
            options: ['雨が降る', '雨が降ります', '雨が降った', '雨が降りません'],
            answer: '雨が降る',
            explain: 'Verbo en forma diccionario: 降る + と思います. No uses ます antes de と.',
          },
          {
            scene: 'Opinion sobre una persona',
            lines: [['Gael', 'あの人は先生___と思います。(creo que esa persona es profesora)']],
            options: ['だ', 'は', 'が', 'を'],
            answer: 'だ',
            explain: 'Sustantivo: 先生 + だ + と思います. だ es necesario antes de と con sustantivos.',
          },
          {
            scene: 'Creo que no viene',
            lines: [['Ana', '田中さんは今日___と思います。(creo que Tanaka no viene hoy)']],
            options: ['来ない', '来ません', '来ないです', '来る'],
            answer: '来ない',
            explain: 'Verbo negativo forma plana: 来ない + と思います. Niega dentro de la frase.',
          },
          {
            scene: 'Opinion sobre un restaurante',
            lines: [['Marco', 'あのレストランはおいしい___と思います。(creo que ese restaurante es rico)']],
            options: ['と', 'が', 'は', 'を'],
            answer: 'と',
            explain: '形容詞 い + と + 思います. La particula que une la frase plana con 思います es と.',
          },
          {
            scene: 'Opinion sobre un lugar',
            lines: [['Lina', '東京は___と思います。(creo que Tokio es conveniente)']],
            options: ['便利だ', '便利です', '便利', '便利な'],
            answer: '便利だ',
            explain: 'Adjetivo な: 便利 + だ + と思います. Los adjetivos な necesitan だ antes de と.',
          },
          {
            scene: 'Creo que ya termino',
            lines: [['Iván', 'もう___と思います。(creo que ya termino — 終わる)']],
            options: ['終わった', '終わりました', '終わります', '終わっている'],
            answer: '終わった',
            explain: 'Verbo en forma た (pasado plano): 終わった + と思います = creo que ya termino.',
          },
          {
            scene: 'Opinion sobre la clase',
            lines: [['Vera', 'この授業は___と思います。(creo que esta clase es interesante)']],
            options: ['面白い', '面白いです', '面白だ', '面白くない'],
            answer: '面白い',
            explain: '面白い es adjetivo い: forma plana directa + と思います.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Intercambio de opiniones',
        tag: '2 espacios',
        intro: 'Completa los dos espacios de opinion.',
        type: 'dual',
        items: [
          {
            scene: 'Discusion sobre una pelicula',
            lines: [['Carlos', 'この映画は[[0]]と思います。'], ['Sofia', '私も[[1]]と思います。']],
            blanks: [
              { options: ['面白い', '面白いです', '面白だ'], answer: '面白い', explain: '面白い (adj. い): forma plana + と思います.' },
              { options: ['面白い', '面白いです', '面白ではない'], answer: '面白い', explain: 'Sofia tambien piensa lo mismo: 面白いと思います.' },
            ],
          },
          {
            scene: 'Suposicion sobre horario',
            lines: [['Gael', '田中さんはもう[[0]]と思います。'], ['Ana', 'でも、まだ[[1]]と思いますよ。']],
            blanks: [
              { options: ['帰った', '帰りました', '帰ります'], answer: '帰った', explain: '帰る→帰った (pasado plano) + と思います.' },
              { options: ['いる', 'います', 'いた'], answer: 'いる', explain: 'いる (forma plana presente) + と思います = creo que todavia esta.' },
            ],
          },
          {
            scene: 'Opinion sobre una ciudad',
            lines: [['Marco', '東京は[[0]]と思います。'], ['Lina', '私は大阪の方が[[1]]と思います。']],
            blanks: [
              { options: ['便利だ', '便利です', '便利'], answer: '便利だ', explain: '便利 (adj. な): + だ + と思います.' },
              { options: ['面白い', '面白いです', '面白だ'], answer: '面白い', explain: '面白い (adj. い): forma plana + と思います.' },
            ],
          },
          {
            scene: 'Sobre una persona',
            lines: [['Iván', 'あの人は田中さん[[0]]と思います。'], ['Vera', '私は鈴木さん[[1]]と思います。']],
            blanks: [
              { options: ['だ', 'が', 'は'], answer: 'だ', explain: '田中さん (sustantivo) + だ + と思います.' },
              { options: ['だ', 'が', 'は'], answer: 'だ', explain: '鈴木さん (sustantivo) + だ + と思います.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Reflexion sobre el japones',
        tag: 'Texto guiado',
        intro: 'Elige la forma plana correcta antes de と思います.',
        type: 'guidedText',
        scene: 'Carlos reflexiona sobre el aprendizaje del japones',
        text: '日本語は[[0]]と思います。でも、とても[[1]]と思います。毎日練習すれば、必ず[[2]]と思います。日本の文化は[[3]]と思います。いつか日本に[[4]]と思っています。',
        blanks: [
          { options: ['難しい', '難しいです', '難しだ'], answer: '難しい', explain: '難しい (adj. い): forma plana + と思います.' },
          { options: ['面白い', '面白いです', '面白だ'], answer: '面白い', explain: 'Tambien adjetivo い: 面白い + と思います.' },
          { options: ['上手になる', '上手になります', '上手になった'], answer: '上手になる', explain: 'Verbo en forma diccionario: 上手になる + と思います.' },
          { options: ['豊かだ', '豊かです', '豊か'], answer: '豊かだ', explain: '豊か (adj. な): + だ + と思います.' },
          { options: ['行きたい', '行きます', '行きたいです'], answer: '行きたい', explain: '行きたい (deseo, forma plana) + と思っています = tengo en mente ir.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma plana correcta del elemento indicado.',
        type: 'freeText',
        scene: 'Vera da su opinion sobre varios temas',
        text: 'この本は[[0]] (面白い)と思います。日本語は[[1]] (難しい)と思いますが、楽しいです。田中先生は[[2]] (優しい)と思います。明日は[[3]] (晴れる)と思います。この問題は[[4]] (簡単だ)と思います。',
        blanks: [
          { answer: '面白い', explain: 'Adjetivo い: forma plana 面白い.' },
          { answer: '難しい', explain: 'Adjetivo い: forma plana 難しい.' },
          { answer: '優しい', explain: '優しい (yasashii, adj. い): forma plana directa.' },
          { answer: '晴れる', explain: '晴れる (hareru, Gr.2): forma diccionario = forma plana.' },
          { answer: '簡単だ', explain: '簡単 (kantan, adj. な): + だ antes de と思います.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Expresa tu opinion',
        tag: 'Escritura guiada',
        intro: 'Escribe la oracion completa de opinion.',
        type: 'write',
        items: [
          {
            scene: 'Opinion sobre el japones',
            prompt: 'Escribe: Creo que el japones es interesante → 日本語 + 面白い',
            answer: '日本語は面白いと思います。',
            accepted: ['日本語は面白いと思います', '日本語が面白いと思います'],
            explain: '面白い (adj. い) + と思います. Sin です antes de と.',
          },
          {
            scene: 'Suposicion sobre manana',
            prompt: 'Escribe: Creo que manana hara buen tiempo → 明日 + 天気がいい',
            answer: '明日は天気がいいと思います。',
            accepted: ['明日は天気がいいと思います', '明日、天気がいいと思います'],
            explain: '天気がいい (adjetivo い en frase) + と思います.',
          },
          {
            scene: 'Opinion negativa',
            prompt: 'Escribe: Creo que esta tarea no es dificil → この宿題 + 難しくない',
            answer: 'この宿題は難しくないと思います。',
            accepted: ['この宿題は難しくないと思います', 'この宿題が難しくないと思います'],
            explain: '難しくない (negativo de adj. い) + と思います.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Mision final',
        tag: 'Escritura libre',
        intro: 'Expresa tus opiniones libremente usando ～と思います.',
        type: 'write',
        items: [
          {
            scene: 'Tu opinion sobre aprender idiomas',
            prompt: '外国語を勉強することは___と思います。',
            answer: '外国語を勉強することは大切だと思います。',
            accepted: ['と思います'],
            explain: 'Usa adjetivo な o い + と思います para tu opinion.',
          },
          {
            scene: 'Tu prediccion del futuro',
            prompt: '将来、___と思います。(tu prediccion personal)',
            answer: '将来、日本語が上手になると思います。',
            accepted: ['と思います', 'と思っています'],
            explain: 'Verbo en forma diccionario + と思います para prediccion.',
          },
          {
            scene: 'Opinion sobre algo en tu vida',
            prompt: '私の___は___と思います。(algo de tu vida)',
            answer: '私の日本語の勉強は楽しいと思います。',
            accepted: ['と思います'],
            explain: 'Usa forma plana + と思います para dar tu opinion personal.',
          },
        ],
      },
    ],
  },
}

export default topic
