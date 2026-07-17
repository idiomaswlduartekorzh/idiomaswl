import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'ageru-morau-kureru-a2',
  order: '19',
  color: '#dc2626',
  category: 'Verbos',
  level: 'A2',
  title: 'あげる/もらう/くれる en japonés A2: dar y recibir',
  shortTitle: 'あげる/もらう/くれる',
  metaTitle: 'Dar y recibir en japonés A2 — あげる, もらう, くれる y sus formas te-',
  description:
    'El japonés tiene tres verbos distintos para expresar dar y recibir según la dirección del intercambio: あげる (yo/nosotros → otros), もらう (yo/nosotros ← otros), くれる (otros → yo/mi grupo). Se combinan con la forma て para expresar hacer un favor: てあげる, てもらう, てくれる. Son estructuras indispensables en japonés A2.',
  lead: 'プレゼントをもらいました: los tres verbos de dar y recibir que todo estudiante necesita.',
  outcomes: [
    'Usar あげる (dar a alguien fuera de mi grupo)',
    'Usar もらう (recibir de alguien)',
    'Usar くれる (dar a mí/mi grupo)',
    'Usar て-form + あげる/もらう/くれる para favores',
  ],

  guide: {
    goal: 'Usar correctamente あげる, もらう y くれる para expresar intercambio y favores.',
    model: '友達にプレゼントをあげました。(Le di un regalo a mi amigo.) / 先生に教えてもらいました。(Me lo enseñó el profesor / Conseguí que me lo enseñara.)',
    formula: 'N に N を あげる/もらう/くれる | V-て + あげる/もらう/くれる',
    decisions: [
      'あげる: yo → otro (dar hacia fuera) → "花をあげた" (le di flores)',
      'もらう: yo ← otro (recibir, conseguir que) → "花をもらった" (recibí flores)',
      'くれる: otro → yo/mi grupo (dar hacia mí) → "花をくれた" (me dio flores)',
      'て + あげる: hacer un favor para otro → "手伝ってあげる" (lo ayudo / le hago el favor)',
      'て + もらう: pedir/conseguir que alguien haga algo por mí → "教えてもらう" (me lo enseñan)',
      'て + くれる: alguien hace un favor para mí → "助けてくれた" (me ayudó)',
    ],
    table: [
      ['Verbo', 'Dirección', 'Ejemplo'],
      ['あげる (dar)', 'yo/nosotros → otros', '友達にあげる'],
      ['もらう (recibir)', 'yo/nosotros ← otros', '友達にもらう'],
      ['くれる (dar a mí)', 'otros → yo/mi grupo', '友達がくれる'],
    ],
    mistakes: [
      '"先生はくれました" (cuando yo recibí) ❌ → "先生はくれました" ✓ — くれる sí es correcto cuando el beneficiario es yo.',
      '"私はあげました" (darse a uno mismo) ❌ — あげる no se usa cuando yo soy el receptor.',
      '"友達にもらいました" ✓ — もらう usa に para la fuente, no から (aunque から también es posible).',
    ],
  },

  seo: [
    {
      heading: 'あげる/もらう/くれる: la perspectiva lo cambia todo',
      paragraphs: [
        'En japonés, el verbo de dar/recibir que se usa depende de la perspectiva del hablante. あげる es para cuando yo (o alguien de mi grupo) da a otro: "友達にプレゼントをあげた" (le di un regalo a mi amigo). もらう es para cuando yo recibo: "友達にプレゼントをもらった" (recibí un regalo de mi amigo). くれる es para cuando alguien da a mí o a mi grupo: "友達がプレゼントをくれた" (mi amigo me dio un regalo).',
        'La diferencia entre もらう y くれる puede parecer sutil, pero el centro de perspectiva cambia: もらう = "yo recibí", くれる = "él/ella me dio". En español ambos se traducen como "me dio/recibí", pero en japonés hay que elegir el verbo correcto.',
      ],
    },
    {
      heading: 'Favores con て + あげる/もらう/くれる',
      paragraphs: [
        'Los mismos tres verbos se usan con la forma て del verbo para expresar favores. "手伝ってあげる" (te ayudo / le hago el favor de ayudar), "手伝ってもらう" (me ayuda / consigo que me ayude), "手伝ってくれる" (me ayuda / me hace el favor de ayudar).',
        '"〜てもらえませんか？" es una de las formas más educadas de hacer peticiones: "教えてもらえませんか？" (¿Podría enseñarme? / ¿Me haría el favor de enseñarme?). Es equivalente a una petición muy cortés.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'あげる (yo→otro), もらう (yo←otro), くれる (otro→yo). て-form para favores.',
    graphicPrompt: 'Diagrama de flechas: tres personas intercambiando objetos en diferentes direcciones.',
    scene: [
      ['友達に花をあげました。', 'Le di flores a mi amigo.'],
      ['友達に花をもらいました。', 'Recibí flores de mi amigo.'],
      ['友達が花をくれました。', 'Mi amigo me dio flores.'],
      ['荷物を持ってあげますよ。', 'Le llevo las bolsas (le hago el favor).'],
      ['先生に教えてもらいました。', 'Me lo enseñó el profesor.'],
      ['友達が助けてくれた。', 'Mi amigo me ayudó.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['あげる (yo→otro)', 'もらう (yo←otro)', 'くれる (otro→yo)', 'て + verbo de intercambio'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige あげる, もらう o くれる',
        tag: 'Opción múltiple',
        intro: 'Selecciona el verbo correcto según la dirección del intercambio.',
        type: 'choice',
        items: [
          {
            scene: 'Le di un libro a mi hermano.',
            lines: [['', '弟に本を___.']],
            options: ['あげました', 'もらいました', 'くれました', 'やりました'],
            answer: 'あげました',
            explain: '"あげました" = yo → otro (hermano menor). あげる cuando el hablante da.',
          },
          {
            scene: 'Recibí un regalo de mi madre.',
            lines: [['', 'お母さんにプレゼントを___.']],
            options: ['もらいました', 'あげました', 'くれました', 'もらいません'],
            answer: 'もらいました',
            explain: '"もらいました" = yo ← otro (madre). もらう cuando el hablante recibe.',
          },
          {
            scene: 'Mi amigo me prestó dinero.',
            lines: [['', '友達がお金を___.']],
            options: ['くれました', 'あげました', 'もらいました', 'あげてくれた'],
            answer: 'くれました',
            explain: '"くれました" = otro (amigo) → yo. くれる cuando alguien da al hablante.',
          },
          {
            scene: 'Le ayudé a mi amigo con la mudanza (favor).',
            lines: [['', '引っ越しを手伝って___.']],
            options: ['あげました', 'もらいました', 'くれました', 'もらいたい'],
            answer: 'あげました',
            explain: '"手伝ってあげました" = le hice el favor de ayudar. て + あげる = favor para otro.',
          },
          {
            scene: 'El profesor me explicó la gramática.',
            lines: [['', '先生に文法を説明して___.']],
            options: ['もらいました', 'あげました', 'くれました', 'もらってあげた'],
            answer: 'もらいました',
            explain: '"説明してもらいました" = conseguí que me explicara. て + もらう = recibir el favor.',
          },
          {
            scene: 'Mi amiga me cocinó la cena.',
            lines: [['', '友達が夕ご飯を作って___.']],
            options: ['くれました', 'あげました', 'もらいました', 'くれてあげた'],
            answer: 'くれました',
            explain: '"作ってくれました" = mi amiga me hizo el favor de cocinar. て + くれる = favor para mí.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Perspectiva del intercambio',
        tag: '2 espacios',
        intro: 'Completa el par de oraciones cambiando la perspectiva.',
        type: 'dual',
        items: [
          {
            scene: 'Desde mi perspectiva (recibí) / desde la perspectiva de mi amigo (dio).',
            lines: [['', '友達にプレゼントを[[0]]。/ 友達がプレゼントを[[1]]。']],
            blanks: [
              { options: ['もらいました', 'あげました', 'くれました', 'もらってくれた'], answer: 'もらいました', explain: '"もらいました" = yo recibí (perspectiva del receptor).' },
              { options: ['くれました', 'あげました', 'もらいました', 'くれてあげた'], answer: 'くれました', explain: '"くれました" = él/ella me dio (perspectiva: otro → yo).' },
            ],
          },
          {
            scene: 'Le expliqué (yo di) / Me explicó (él me dio la explicación).',
            lines: [['', '友達に説明して[[0]]。/ 友達が説明して[[1]]。']],
            blanks: [
              { options: ['あげました', 'もらいました', 'くれました', 'あげてくれた'], answer: 'あげました', explain: '"説明してあげました" = le expliqué (yo hice el favor).' },
              { options: ['くれました', 'あげました', 'もらいました', 'くれてあげた'], answer: 'くれました', explain: '"説明してくれました" = me explicó (él me hizo el favor).' },
            ],
          },
          {
            scene: 'Conseguí que me enseñara / Le enseñé.',
            lines: [['', '先生に教えて[[0]]。/ 先生に教えて[[1]]。']],
            blanks: [
              { options: ['もらいました', 'くれました', 'あげました', 'もらってくれた'], answer: 'もらいました', explain: '"教えてもらいました" = conseguí que me enseñara (yo recibo el favor).' },
              { options: ['あげました', 'もらいました', 'くれました', 'あげてもらった'], answer: 'あげました', explain: '"教えてあげました" = le enseñé (yo di el favor).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Historia de intercambios',
        tag: 'Texto guiado',
        intro: 'Completa la historia con el verbo correcto.',
        type: 'guidedText',
        scene: '誕生日パーティーの話です。',
        text: '昨日、友達の誕生日でした。私は花をプレゼントして[[0]]。友達はケーキを[[1]]。田中さんは手作りの料理を作って[[2]]。私は田中さんに料理の作り方を教えて[[1]]。とても楽しい誕生日でした。',
        blanks: [
          { options: ['あげました', 'もらいました', 'くれました', 'もらってあげた'], answer: 'あげました', explain: '"プレゼントしてあげました" = le regalé (yo → amigo). て + あげる.' },
          { options: ['くれました', 'あげました', 'もらいました', 'くれてあげた'], answer: 'くれました', explain: '"ケーキをくれました" = me dio pastel (amigo → yo). くれる.' },
          { options: ['くれました', 'あげました', 'もらいました', 'もらってくれた'], answer: 'くれました', explain: '"作ってくれました" = me cocinó (田中さん → yo). て + くれる.' },
          { options: ['もらいました', 'あげました', 'くれました', 'もらってあげた'], answer: 'もらいました', explain: '"教えてもらいました" = conseguí que me enseñara. て + もらう.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con el verbo correcto',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe あげる, もらう o くれる en la forma adecuada.',
        type: 'freeText',
        scene: '正しい動詞を書いてください。',
        text: '弟に本を___ました。(yo di al hermano) / 母にセーターを___ました。(yo recibí de la madre) / 田中さんが助けて___ました。(田中さん dio a mí) / 友達のために料理して___ました。(yo di el favor)',
        blanks: [
          { answer: 'あげ', explain: '"弟にあげました" = yo → hermano. あげる.' },
          { answer: 'もらい', explain: '"母にもらいました" = yo ← madre. もらう.' },
          { answer: 'くれ', explain: '"助けてくれました" = 田中さん → yo. て + くれる.' },
          { answer: 'あげ', explain: '"料理してあげました" = yo hice el favor. て + あげる.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Describe intercambios',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa con あげる, もらう o くれる.',
        type: 'write',
        items: [
          {
            scene: 'Le presté mi paraguas a una amiga.',
            prompt: '友達に傘を貸す (yo → amiga)',
            answer: '友達に傘を貸してあげました。',
            accepted: ['友達に傘をあげました。'],
            explain: '"貸してあげました" = le presté (favor yo → amigo). て + あげる.',
          },
          {
            scene: 'Mi madre me preparó el desayuno.',
            prompt: 'お母さんが朝ご飯を作る (madre → yo)',
            answer: 'お母さんが朝ご飯を作ってくれました。',
            accepted: ['お母さんが朝ご飯をくれました。'],
            explain: '"作ってくれました" = me cocinó (favor: madre → yo). て + くれる.',
          },
          {
            scene: 'Conseguí que el médico me explicara el tratamiento.',
            prompt: '医者に治療を説明してもらう',
            answer: '医者に治療を説明してもらいました。',
            accepted: ['先生に説明してもらいました。'],
            explain: '"説明してもらいました" = conseguí que me explicara. て + もらう.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe dar y recibir favores',
        tag: 'Escritura libre',
        intro: 'Escribe sobre favores que diste o recibiste usando あげる/もらう/くれる.',
        type: 'write',
        items: [
          {
            scene: 'Describe algo que alguien hizo por ti recientemente.',
            prompt: '最近誰かがしてくれたこと/もらったことを書いてください。',
            answer: '先週、友達が引っ越しを手伝ってくれました。重い荷物を運んでくれて、とても助かりました。後でお礼にご飯をごちそうしてあげました。',
            accepted: ['先生が試験について教えてくれました。とても親切にしてもらいました。'],
            explain: '"くれました" = otros me ayudaron; "あげました" = yo correspondí el favor.',
          },
          {
            scene: 'Describe un favor que hiciste por alguien.',
            prompt: '誰かのためにしてあげたことを書いてください。',
            answer: '妹が困っていたので、日本語の宿題を教えてあげました。また、スーパーに行く時に買い物もしてあげました。',
            accepted: ['友達が病気だったので、料理を作ってあげました。'],
            explain: '"してあげました" = favor de yo hacia otro. て + あげる.',
          },
        ],
      },
    ],
  },
}

export default topic
