import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'n-desu-a2',
  order: '12',
  color: '#dc2626',
  category: 'Explicación',
  level: 'A2',
  title: '~んです/のです en japonés A2: explicación y contexto',
  shortTitle: '~んです/のです',
  metaTitle: 'んです/のです en japonés A2 — explicar razones, buscar contexto, énfasis',
  description:
    '~んです (informal: んだ) y ~のです (formal/escrito) añaden un matiz de "resulta que...", "es que..." o "lo que pasa es que..." a cualquier oración. Se usan para explicar una razón, buscar confirmación de lo que ya se percibe, o pedir/dar contexto. Es uno de los patrones más frecuentes en el japonés cotidiano y fundamental para sonar natural.',
  lead: '頭が痛いんです: el patrón んです que convierte cualquier frase en explicación natural.',
  outcomes: [
    'Usar ~んです para dar explicaciones o contexto',
    'Usar ~んですか para pedir la razón de algo que se observa',
    'Distinguir んです (explicación) de ます/です (simple declaración)',
    'Construir ~んですが para preparar una petición educada',
  ],

  guide: {
    goal: 'Usar ~んです/のです para dar explicaciones, buscar contexto y pedir información con cortesía.',
    model: '頭が痛いんです。(Es que me duele la cabeza.) / 何をしているんですか？(¿Qué es lo que está haciendo?)',
    formula: 'V/い-adj (dic.) + んです | な-adj/N + な + んです',
    decisions: [
      'Verbos: forma diccionario + んです → "行くんです" (es que voy / resulta que voy)',
      'い-adj: adj + んです → "難しいんです" (es que es difícil)',
      'な-adj y N: な + んです → "元気なんです" (es que está bien) / "学生なんです" (es que es estudiante)',
      'Pregunta: V/adj + んですか → pide la razón de algo observable → "具合が悪いんですか？" (¿Es que se siente mal?)',
      '~んですが: suaviza petición → "お願いがあるんですが..." (Es que tengo algo que pedirle...)',
    ],
    table: [
      ['Tipo', 'Estructura', 'Ejemplo'],
      ['Verbo', 'V dic. + んです', '明日行くんです'],
      ['い-adj', 'い-adj + んです', '難しいんです'],
      ['な-adj/N', 'な/N + なんです', '元気なんです / 先生なんです'],
    ],
    mistakes: [
      '"元気いんです" ❌ → "元気なんです" ✓ — な-adj necesita な antes de んです.',
      '"学生いんです" ❌ → "学生なんです" ✓ — N también necesita な antes de んです.',
      '"行きますんです" ❌ → "行くんです" ✓ — se usa la forma diccionario, no -ます.',
    ],
  },

  seo: [
    {
      heading: '~んです: por qué es tan importante en japonés',
      paragraphs: [
        '~んです (también ~のです en registros formales) es uno de los patrones más importantes del japonés coloquial. La diferencia entre "頭が痛いです" (me duele la cabeza — declaración simple) y "頭が痛いんです" (ES QUE me duele la cabeza — explicación/contexto) es enorme en japonés.',
        'Cuando alguien te pregunta "どうしたんですか？" (¿Qué te pasa? / ¿Qué pasó?), está usando んです para pedir una explicación de algo que ya observa. Y cuando respondes "疲れているんです" (es que estoy cansado), das el contexto que explica lo que ven. Es el corazón de la conversación natural en japonés.',
      ],
    },
    {
      heading: '~んですが: la fórmula para pedir cosas educadamente',
      paragraphs: [
        '"~んですが..." es la estructura más educada para hacer peticiones en japonés. La oración queda intencionalmente incompleta para suavizar la petición: "すみません、ちょっと聞きたいんですが..." (Disculpe, es que quería preguntar algo...). El が al final indica que hay algo más, invitando al oyente a responder.',
        'Este patrón se usa constantemente en situaciones cotidianas: en tiendas, oficinas, con vecinos. Dominarlo te hará sonar significativamente más natural en japonés.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'んです: explicación, contexto y peticiones suaves.',
    graphicPrompt: 'Persona con cara de cansancio explicando que está agotada.',
    scene: [
      ['頭が痛いんです。', 'Es que me duele la cabeza.'],
      ['どうして来なかったんですか？', '¿Por qué es que no viniste?'],
      ['実は、好きじゃないんです。', 'La verdad es que no me gusta.'],
      ['お願いがあるんですが...', 'Es que tenía algo que pedirle...'],
      ['何を食べているんですか？', '¿Qué es lo que está comiendo?'],
      ['疲れているんです。', 'Es que estoy cansado/a.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['V dic. + んです', 'な/N + なんです', '~んですか (pedir razón)', '~んですが (petición suave)'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma correcta de んです',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma correcta de んです según el tipo de palabra.',
        type: 'choice',
        items: [
          {
            scene: 'Es que mañana tengo examen (verbo).',
            lines: [['', '明日、試験があるんです。→ "ある" + んです: ___']],
            options: ['あるんです', 'ありますんです', 'あるのです', 'あるいんです'],
            answer: 'あるんです',
            explain: '"あるんです" = es que hay/tengo. V dic. + んです (forma casual).',
          },
          {
            scene: 'Es que es difícil (い-adj).',
            lines: [['', '難しい + んです → ___']],
            options: ['難しいんです', '難しいなんです', '難しくんです', '難しいですんです'],
            answer: '難しいんです',
            explain: '"難しいんです" = es que es difícil. い-adj + んです directamente.',
          },
          {
            scene: 'Es que es estudiante (N).',
            lines: [['', '学生 + んです → ___']],
            options: ['学生なんです', '学生いんです', '学生のんです', '学生んです'],
            answer: '学生なんです',
            explain: '"学生なんです" = es que es estudiante. N + な + んです.',
          },
          {
            scene: '¿Por qué es que no fuiste? (pregunta de razón)',
            lines: [['', 'どうして行かなかった___？']],
            options: ['んですか', 'ですか', 'のか', 'んか'],
            answer: 'んですか',
            explain: '"行かなかったんですか？" = ¿Por qué es que no fuiste? Pide la razón.',
          },
          {
            scene: 'Es que me quería disculpar... (petición suave).',
            lines: [['', '謝りたい___...']],
            options: ['んですが', 'んです', 'ですが', 'のですが'],
            answer: 'んですが',
            explain: '"謝りたいんですが..." = Es que quería disculparme... Petición suave con が.',
          },
          {
            scene: 'Es que es conveniente (na-adj: 便利).',
            lines: [['', '便利 + んです → ___']],
            options: ['便利なんです', '便利いんです', '便利のんです', '便利んです'],
            answer: '便利なんです',
            explain: '"便利なんです" = es que es conveniente. な-adj + な + んです.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Explicación y petición',
        tag: '2 espacios',
        intro: 'Completa con んです en pregunta y respuesta.',
        type: 'dual',
        items: [
          {
            scene: 'Te preguntan qué te pasa y explicas que estás cansado.',
            lines: [['', 'どうし[[0]]？ — 疲れてい[[1]]。']],
            blanks: [
              { options: ['たんですか', 'ましたか', 'のですか', 'たか'], answer: 'たんですか', explain: '"どうしたんですか？" = ¿Qué te pasó? (razón de algo observable).' },
              { options: ['るんです', 'ます', 'るです', 'るのか'], answer: 'るんです', explain: '"疲れているんです" = es que estoy cansado.' },
            ],
          },
          {
            scene: 'Quieres preguntar algo y hacer una petición suave.',
            lines: [['', '聞きたいこと[[0]]... 少し時間[[1]]？']],
            blanks: [
              { options: ['があるんですが', 'があります', 'があるですが', 'があるのか'], answer: 'があるんですが', explain: '"聞きたいことがあるんですが" = es que tengo algo que preguntarle... (suave).' },
              { options: ['がありますか', 'があるんですか', 'があるか', 'はあるか'], answer: 'がありますか', explain: '"少し時間がありますか？" = ¿Tiene un momento? (petición directa educada).' },
            ],
          },
          {
            scene: 'Explicas que no puedes venir porque estás enfermo.',
            lines: [['', '行けない[[0]]。病気[[1]]。']],
            blanks: [
              { options: ['んです', 'です', 'ますんです', 'のか'], answer: 'んです', explain: '"行けないんです" = es que no puedo ir.' },
              { options: ['なんです', 'です', 'いんです', 'のです'], answer: 'なんです', explain: '"病気なんです" = es que estoy enfermo. N + なんです.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Conversación con んです',
        tag: 'Texto guiado',
        intro: 'Completa el diálogo usando んです correctamente.',
        type: 'guidedText',
        scene: '田中さんが遅れて来ました。',
        text: 'A: どうし[[0]]？B: すみません。電車が遅れ[[1]]。A: そう[[2]]か。大丈夫ですか？B: 実は、ちょっと具合が悪い[[3]]。A: えっ、早く帰った方がいい[[4]]ね。',
        blanks: [
          { options: ['たんですか', 'ましたか', 'たのか', 'たか'], answer: 'たんですか', explain: '"どうしたんですか？" = ¿Qué pasó? Pide explicación de algo observable.' },
          { options: ['たんです', 'ました', 'たです', 'たのか'], answer: 'たんです', explain: '"遅れたんです" / "悪いんです" = es que se atrasó / es que me siento mal.' },
          { options: ['なんです', 'ですね', 'なのか', 'か'], answer: 'なんです', explain: '"そうなんですか" = ¿Ah, es así? Confirma lo que acaba de escuchar con contexto.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Añade んです a las oraciones',
        tag: 'Texto libre',
        intro: 'Sin opciones: transforma las oraciones simples en explicaciones con んです.',
        type: 'freeText',
        scene: '普通の文をんです文に変えてください。',
        text: '疲れています → 疲れてい[[0]]。 / 学生です → 学生[[1]]。 / 難しいです → 難しい[[2]]。 / 行きたいです → 行きたい[[3]]が、お金がないです。',
        blanks: [
          { answer: 'るんです', explain: '"疲れているんです" = es que estoy cansado.' },
          { answer: 'なんです', explain: '"学生なんです" = es que soy estudiante. N + なんです.' },
          { answer: 'んです', explain: '"難しいんです" = es que es difícil. い-adj + んです.' },
          { answer: 'いんです', explain: '"行きたいんですが" = es que quiero ir... (petición suave).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Da explicaciones con んです',
        tag: 'Escritura guiada',
        intro: 'Escribe la explicación completa usando んです.',
        type: 'write',
        items: [
          {
            scene: 'Explica que no puedes salir porque tienes mucho trabajo.',
            prompt: '出かけられない... (仕事がたくさんある)',
            answer: '出かけられないんです。仕事がたくさんあるんです。',
            accepted: ['出かけられないんです。仕事が多いんです。'],
            explain: '"出かけられないんです" = es que no puedo salir. V neg. dic. + んです.',
          },
          {
            scene: 'Pide permiso para preguntar algo educadamente.',
            prompt: '一つ聞きたいことがある... (petición suave)',
            answer: '一つ聞きたいことがあるんですが...',
            accepted: ['聞いてもいいんですが...'],
            explain: '"あるんですが" = es que hay... (oración intencionalmente incompleta para suavizar).',
          },
          {
            scene: '¿Por qué no viniste ayer? (pregunta buscando razón)',
            prompt: 'どうして昨日来なかった... (¿?)',
            answer: 'どうして昨日来なかったんですか？',
            accepted: ['昨日なぜ来なかったんですか？'],
            explain: '"来なかったんですか？" = ¿Por qué es que no viniste? Busca la razón.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Explica una situación',
        tag: 'Escritura libre',
        intro: 'Escribe una breve explicación de una situación usando んです varias veces.',
        type: 'write',
        items: [
          {
            scene: 'Explica por qué llegas tarde a una cita.',
            prompt: '遅刻した理由をんですを使って説明してください。',
            answer: 'すみません、遅れたんです。実は、電車が止まったんです。駅でずっと待っていたんですが、全然来なかったんです。',
            accepted: ['すみません。道が込んでいたんです。バスもなかったんです。'],
            explain: 'んです añade el matiz de "resulta que / es que" — da explicación con contexto.',
          },
          {
            scene: 'Haz una petición educada para cambiar una reserva.',
            prompt: '予約を変えたい。んですを使って丁寧にお願いしてください。',
            answer: '実は予約を変えたいんですが、可能でしょうか？急用ができたんです。本当に申し訳ないんですが...',
            accepted: ['予約の日程を変えたいんですが、よろしいでしょうか？'],
            explain: '"変えたいんですが" = es que quería cambiar... La petición más cortés en japonés.',
          },
        ],
      },
    ],
  },
}

export default topic
