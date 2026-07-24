import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'nagara-a2',
  order: '17',
  color: '#dc2626',
  category: 'Conjunciones',
  level: 'A2',
  title: '~ながら en japonés A2: hacer dos cosas a la vez',
  shortTitle: '~ながら (mientras)',
  metaTitle: '~ながら japonés A2 — hacer dos acciones simultáneamente, mientras',
  description:
    '~ながら expresa que dos acciones se realizan simultáneamente por el MISMO sujeto. Se forma con la raíz verbal (forma ます sin ます) + ながら. La acción principal va en la segunda cláusula; la acción secundaria (simultánea) va con ながら. A diferencia del español "mientras", ながら requiere el mismo sujeto para ambas acciones.',
  lead: '音楽を聴きながら、勉強します: hacer dos cosas al mismo tiempo en japonés.',
  outcomes: [
    'Formar ~ながら desde la raíz verbal',
    'Expresar dos acciones simultáneas del mismo sujeto',
    'Identificar la acción principal (cláusula 2) y la secundaria (ながら)',
    'Evitar el error de usar ながら con sujetos diferentes',
  ],

  guide: {
    goal: 'Expresar simultaneidad de dos acciones del mismo sujeto con ~ながら.',
    model: '音楽を聴きながら、走ります。(Corro mientras escucho música.) / 歩きながら、電話します。(Hablo por teléfono mientras camino.)',
    formula: 'V-ます stem + ながら + V principal',
    decisions: [
      'Formación: quitar ます y añadir ながら → 聴きます → 聴き + ながら',
      'El sujeto debe ser el MISMO para ambas acciones',
      'La acción principal va en la segunda cláusula: "ながら + [acción principal]"',
      'La acción ながら es la secundaria (de fondo): 歩きながら(歩く=secundaria) + 話す(=principal)',
      'Ejemplos comunes: 歩きながら、食べながら、聴きながら、見ながら',
    ],
    table: [
      ['Verbo', 'Raíz -ます', 'Forma ながら'],
      ['聴きます (escuchar)', '聴き', '聴きながら'],
      ['食べます (comer)', '食べ', '食べながら'],
      ['歩きます (caminar)', '歩き', '歩きながら'],
    ],
    mistakes: [
      '"音楽を聴きながら、友達が踊ります" ❌ — sujetos diferentes (yo escucho / amigo baila) → no usar ながら.',
      '"食べながらします" ❌ → "食べながら、話します" ✓ — especifica la acción principal.',
      '"食べてながら" ❌ → "食べながら" ✓ — ながら se une a la raíz, no a la forma て.',
    ],
  },

  seo: [
    {
      heading: '~ながら: simultaneidad con el mismo sujeto',
      paragraphs: [
        '~ながら es la forma de decir "mientras" cuando el mismo sujeto hace dos cosas a la vez. "テレビを見ながら、ご飯を食べます" (como mientras veo la tele). La diferencia clave con el español es que ~ながら SOLO funciona si el mismo sujeto realiza ambas acciones.',
        'La acción marcada con ながら es generalmente la secundaria o de fondo; la acción principal — la más importante — va en la segunda cláusula. "音楽を聴きながら(secundaria)、勉強します(principal)" = estudio mientras escucho música.',
      ],
    },
    {
      heading: 'Verbos comunes con ながら',
      paragraphs: [
        'Los verbos más frecuentes con ながら en situaciones cotidianas: 歩きながら (mientras caminas), 食べながら (mientras comes), 聴きながら (mientras escuchas), 話しながら (mientras hablas), 見ながら (mientras ves). Combinados crean expresiones muy naturales del japonés cotidiano.',
        'Un uso especial: "〜ながら" también puede expresar contraste leve (aunque / a pesar de que): "知りながら言わなかった" (aunque sabía, no lo dije). Este uso es más avanzado pero vale la pena conocerlo.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'ながら: dos acciones simultáneas del MISMO sujeto.',
    graphicPrompt: 'Persona caminando con audífonos puestos, haciendo dos cosas a la vez.',
    scene: [
      ['音楽を聴きながら、走ります。', 'Corro mientras escucho música.'],
      ['コーヒーを飲みながら、新聞を読みます。', 'Leo el periódico mientras tomo café.'],
      ['歩きながら、スマホを見ないでください。', 'Por favor, no mires el móvil mientras caminas.'],
      ['テレビを見ながら、ご飯を食べるのは良くない。', 'No es bueno comer mientras ves la tele.'],
      ['勉強しながら、音楽を聴けますか？', '¿Puedes escuchar música mientras estudias?'],
      ['笑いながら話してくれた。', 'Me lo contó riéndose.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['V stem + ながら', 'acción secundaria + ながら + principal', 'mismo sujeto'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma ながら correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma ながら correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Escuchar música mientras estudio (聴く).',
            lines: [['', '音楽を___、勉強します。']],
            options: ['聴きながら', '聴いてながら', '聴くながら', '聴いたながら'],
            answer: '聴きながら',
            explain: '"聴きながら" = 聴きます → 聴き + ながら. Raíz verbal + ながら.',
          },
          {
            scene: 'Comer mientras hablo (食べる).',
            lines: [['', '___、話します。']],
            options: ['食べながら', '食べてながら', '食べるながら', '食べたながら'],
            answer: '食べながら',
            explain: '"食べながら" = 食べます → 食べ + ながら. Raíz + ながら.',
          },
          {
            scene: 'Caminar mientras habla por teléfono (歩く).',
            lines: [['', '___、電話しています。']],
            options: ['歩きながら', '歩いてながら', '歩くながら', '歩いたながら'],
            answer: '歩きながら',
            explain: '"歩きながら" = 歩きます → 歩き + ながら.',
          },
          {
            scene: 'Ver la tele mientras como.',
            lines: [['', 'テレビを___、ご飯を食べます。']],
            options: ['見ながら', '見てながら', '見るながら', '見たながら'],
            answer: '見ながら',
            explain: '"見ながら" = 見ます → 見 + ながら.',
          },
          {
            scene: 'Hablar mientras ríe (笑う).',
            lines: [['', '___、話してくれた。']],
            options: ['笑いながら', '笑ってながら', '笑うながら', '笑いてながら'],
            answer: '笑いながら',
            explain: '"笑いながら" = 笑います → 笑い + ながら.',
          },
          {
            scene: '¿Puedes estudiar mientras escuchas música?',
            lines: [['', '音楽を聴き___、勉強できますか？']],
            options: ['ながら', 'てながら', 'るながら', 'たながら'],
            answer: 'ながら',
            explain: '"聴きながら" (聴き + ながら) ya está parcialmente escrito; la parte que falta es ながら.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos acciones simultáneas',
        tag: '2 espacios',
        intro: 'Completa la oración con la acción ながら y la acción principal.',
        type: 'dual',
        items: [
          {
            scene: 'Caminaba mientras escuchaba música.',
            lines: [['', '音楽を[[0]]、[[1]]いました。']],
            blanks: [
              { options: ['聴きながら', '聴いてながら', '聴くながら', '聴くと'], answer: '聴きながら', explain: '"聴きながら" = mientras escuchaba. Acción secundaria con ながら.' },
              { options: ['歩いて', '歩きながら', '歩くと', '歩いた'], answer: '歩いて', explain: '"歩いていました" = caminaba (acción principal en pasado).' },
            ],
          },
          {
            scene: 'Estudia mientras escucha las noticias.',
            lines: [['', 'ニュースを[[0]]、[[1]]します。']],
            blanks: [
              { options: ['聴きながら', '聴いてながら', '聴くと', '聴いたら'], answer: '聴きながら', explain: '"ニュースを聴きながら" = mientras escucha las noticias.' },
              { options: ['勉強', '勉強して', 'ながら', '勉強たら'], answer: '勉強', explain: '"勉強します" = estudia (acción principal).' },
            ],
          },
          {
            scene: 'Por favor, no uses el móvil mientras comes.',
            lines: [['', '食べ[[0]]、スマホを[[1]]ください。']],
            blanks: [
              { options: ['ながら', 'てながら', 'るながら', 'たながら'], answer: 'ながら', explain: '"食べながら" = mientras comes. 食べ + ながら.' },
              { options: ['見ないで', '見ながら', '見てください', '見ると'], answer: '見ないで', explain: '"スマホを見ないでください" = por favor no mires el móvil.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un día con multitarea',
        tag: 'Texto guiado',
        intro: 'Completa la descripción de actividades simultáneas con ながら.',
        type: 'guidedText',
        scene: '田中さんの忙しい一日です。',
        text: '田中さんは朝、コーヒーを飲み[[0]]、メールをチェックします。電車の中では、音楽を聴き[[1]]、本を読みます。昼ご飯を食べ[[2]]、友達と話します。帰りは歩き[[3]]、電話で家族と話します。',
        blanks: [
          { options: ['ながら', 'てながら', 'るながら', 'たながら'], answer: 'ながら', explain: '"〜ながら" se repite con la raíz verbal en cada caso: 飲みながら, 聴きながら, 食べながら, 歩きながら.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Forma ながら de los verbos',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma ながら de cada verbo.',
        type: 'freeText',
        scene: 'ながら形を作ってください。',
        text: '飲む → [[0]] (mientras bebe) / 働く → [[1]] (mientras trabaja) / 話す → [[2]] (mientras habla) / 考える → [[3]] (mientras piensa)',
        blanks: [
          { answer: '飲みながら', explain: '"飲みながら" = 飲みます → 飲み + ながら.' },
          { answer: '働きながら', explain: '"働きながら" = 働きます → 働き + ながら.' },
          { answer: '話しながら', explain: '"話しながら" = 話します → 話し + ながら.' },
          { answer: '考えながら', explain: '"考えながら" = 考えます → 考え + ながら.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Describe actividades simultáneas',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa con ~ながら.',
        type: 'write',
        items: [
          {
            scene: 'Escuchas música mientras estudias japonés.',
            prompt: '音楽を聴く + 日本語を勉強する',
            answer: '音楽を聴きながら、日本語を勉強します。',
            accepted: ['日本語を勉強しながら、音楽を聴きます。'],
            explain: '"聴きながら" = mientras escucho (secundaria). La principal puede ir en cualquier orden.',
          },
          {
            scene: 'El niño llora mientras habla.',
            prompt: '泣く + 話す (el niño)',
            answer: '泣きながら、話しました。',
            accepted: ['子供は泣きながら話しました。'],
            explain: '"泣きながら" = mientras llora. Mismo sujeto para ambas acciones.',
          },
          {
            scene: 'No es bueno caminar mientras miras el móvil.',
            prompt: 'スマホを見る + 歩く (no es bueno)',
            answer: 'スマホを見ながら歩くのは良くないです。',
            accepted: ['スマホを見ながら歩くのはよくない。'],
            explain: '"〜のは良くない" = no es bueno. ながら como argumento del predicado.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe tus hábitos de multitarea',
        tag: 'Escritura libre',
        intro: 'Escribe sobre qué haces mientras haces otras cosas usando ~ながら.',
        type: 'write',
        items: [
          {
            scene: 'Describe 3 actividades que haces mientras haces otra cosa.',
            prompt: 'ながらを使って自分の習慣を3つ書いてください。',
            answer: '毎朝、コーヒーを飲みながら、ニュースを読みます。電車では、音楽を聴きながら、勉強します。料理しながら、ポッドキャストを聴きます。',
            accepted: ['歩きながら考えるのが好きです。お風呂に入りながら歌います。'],
            explain: 'ながら describe el hábito de hacer dos cosas simultáneamente.',
          },
          {
            scene: 'Describe si es bueno o malo hacer ciertas cosas a la vez.',
            prompt: '〜ながら〜のはいい/良くないと思います。',
            answer: '食べながら勉強するのは良くないと思います。でも、音楽を聴きながら運動するのはいいと思います。',
            accepted: ['スマホを見ながら運転するのは危ないです。音楽を聴きながら走るのは楽しいです。'],
            explain: '"〜のはいい/良くない" = es bueno/no es bueno hacer 〜. ながら como tema de evaluación.',
          },
        ],
      },
    ],
  },
}

export default topic
