import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'masu-kei-conjugacion',
  order: '11',
  color: '#dc2626',
  category: 'Verbos',
  level: 'A1',
  title: 'Conjugación ます (masu-kei) en japonés A1 — Las 4 formas formales',
  shortTitle: 'Conjugación ます',
  metaTitle: 'Conjugación masu japonés A1 — presente pasado negativo formal',
  description:
    'La forma ます (masu-kei) es el registro formal del japonés y la base de la conjugación en A1. Tiene cuatro formas: presente afirmativo (ます), presente negativo (ません), pasado afirmativo (ました), pasado negativo (ませんでした). Los verbos se clasifican en tres grupos según cómo forman la raíz ます.',
  lead: 'Conjugación formal ます: たべます (como) → たべません / たべました / たべませんでした. Verbos irregulares: します (hacer), きます (venir). Preguntas: + か al final.',
  outcomes: [
    'Conjuga verbos en las cuatro formas de la masu-kei: presente y pasado, afirmativo y negativo',
    'Distingue los grupos verbales 1 (u-verbos), 2 (ru-verbos) e irregulares',
    'Forma preguntas añadiendo か al final de cualquier forma ます',
  ],

  guide: {
    goal: 'Dominar las cuatro formas formales de verbos japoneses en A1 y reconocer los tres grupos verbales.',
    model: 'たべます (como) / たべません (no como) / たべました (comí) / たべませんでした (no comí)',
    formula: 'Raíz + ます / ません / ました / ませんでした | + か para preguntas',
    decisions: [
      'Grupo 2 (ru-verbos): quitar る, añadir ます: たべ + ます, み + ます, おき + ます',
      'Grupo 1 (u-verbos): cambio de vocal u→i en la raíz: かく→かき+ます, のむ→のみ+ます',
      'Irregulares: する → します | くる → きます (raíces completamente distintas)',
      'Presente negativo: raíz + ません (たべません, いきません)',
      'Pasado afirmativo: raíz + ました (たべました, いきました)',
      'Pasado negativo: raíz + ませんでした (たべませんでした, いきませんでした)',
    ],
    table: [
      ['Forma', 'Afirmativo', 'Negativo'],
      ['Presente', 'たべます', 'たべません'],
      ['Pasado', 'たべました', 'たべませんでした'],
      ['Pregunta pres.', 'たべますか', 'たべませんか'],
      ['Pregunta pas.', 'たべましたか', 'たべませんでしたか'],
    ],
    mistakes: [
      '"たべましたか？" — respuesta afirmativa: "はい、たべました" (NO "たべましたです").',
      '"しました" (pasado de する) — nunca "しました" con う-verbo regular.',
      'El tiempo verbal del japonés solo va en el ÚLTIMO verbo de la frase: たべて、のんで、ねました.',
    ],
  },
  seo: [
    {
      heading: 'Los tres grupos verbales del japonés: ¿cómo saber cuál es cuál?',
      paragraphs: [
        'Los verbos japoneses se clasifican en tres grupos que determinan cómo forman la raíz ます. Grupo 2 (ichidan/ru-verbos): el infinitivo termina en る precedido de vocal i o e: たべる, みる, おきる, ねる. Para la forma ます, simplemente quitas る y añades ます: たべます, みます. Son los más predecibles.',
        'Grupo 1 (godan/u-verbos): terminan en una consonante + う, aunque pueden terminar también en る (si la vocal anterior no es i/e). Ejemplos: かく→かきます, のむ→のみます, はなす→はなします, かえる→かえります (este termina en る pero es godan). Los irregulares son solo dos: する (hacer)→します y くる (venir)→きます. Estos dos debes memorizar.',
      ],
    },
    {
      heading: 'El tiempo verbal va al final en japonés',
      paragraphs: [
        'Una característica clave del japonés es que solo el ÚLTIMO verbo de la frase se conjuga para tiempo. Si conectas varias acciones (levantarse, comer, ir), solo el último verbo lleva el tiempo: おきて、たべて、がっこうに いきました = me levanté, comí y fui a la escuela (solo いきました tiene pasado).',
        'Esto es muy diferente al español donde cada verbo en la cadena lleva su tiempo. En japonés la forma て (te-form) conecta verbos sin tiempo — el tiempo de toda la cadena lo determina el verbo final.',
      ],
    },
  ],
  visual: {
    mode: 'verb-conjugation-table',
    teacherLens: 'El estudiante aprende las 4 formas ます con verbos frecuentes de los tres grupos.',
    graphicPrompt: 'Tabla 4×2 (presente/pasado × afirmativo/negativo) con たべる y いく. Sección irregular: します/きます.',
    scene: [
      ['ます = presente formal', 'たべます, いきます'],
      ['ました = pasado formal', 'たべました, いきました'],
      ['ません / ませんでした', 'negación presente / pasado'],
    ],
    learnerModes: ['visual: tabla conjugación', 'analítico: 3 grupos verbales', 'oral: hablar de ayer'],
    reviewFocus: ['4 formas ます', 'する→します, くる→きます', 'pregunta + か', 'tiempo al final'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Forma ます correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del verbo en ます-kei.',
        type: 'choice',
        items: [
          {
            scene: 'No comí',
            lines: [['Carlos', 'きのう ひるごはんを ___。(Ayer no almorcé.)']],
            options: ['たべませんでした', 'たべません', 'たべました', 'たべますか'],
            answer: 'たべませんでした',
            explain: 'Pasado negativo: たべ + ませんでした.',
          },
          {
            scene: '¿Fuiste?',
            lines: [['Hugo', 'きのう がっこうに ___？(¿Fuiste a la escuela ayer?)']],
            options: ['いきましたか', 'いきますか', 'いきませんでしたか', 'いきました'],
            answer: 'いきましたか',
            explain: 'Pasado afirmativo + か: いきましたか.',
          },
          {
            scene: 'Hago ejercicio',
            lines: [['Sofia', 'まいにち うんどうを ___。(Hago ejercicio todos los días.)']],
            options: ['します', 'しません', 'しました', 'しませんでした'],
            answer: 'します',
            explain: 'します = presente afirmativo del irregular する (hacer).',
          },
          {
            scene: 'No viene',
            lines: [['Ana', 'デービッドさんは きょう ___。(Hugo no viene hoy.)']],
            options: ['きません', 'きます', 'きました', 'きませんでした'],
            answer: 'きません',
            explain: 'くる → irregular → きます → negativo: きません.',
          },
          {
            scene: 'Vine',
            lines: [['Marco', 'バスで ___。(Vine en bus.)']],
            options: ['きました', 'きます', 'きません', 'きませんでした'],
            answer: 'きました',
            explain: 'くる → きます → pasado afirmativo: きました.',
          },
          {
            scene: 'No durmió',
            lines: [['Lina', 'ゆうべ あまり ___。(Anoche no durmió mucho.)']],
            options: ['ねませんでした', 'ねません', 'ねました', 'ねます'],
            answer: 'ねませんでした',
            explain: 'ねる (grupo 2) → ね + ます → pasado negativo: ねませんでした.',
          },
          {
            scene: '¿Bebes café?',
            lines: [['Lía', 'コーヒーを ___？(¿Bebes café?)']],
            options: ['のみますか', 'のみます', 'のみませんか', 'のみました'],
            answer: 'のみますか',
            explain: 'のむ (grupo 1) → のみます → pregunta: のみますか.',
          },
          {
            scene: 'No estudié',
            lines: [['Carlos', 'きのう にほんごを ___。(Ayer no estudié japonés.)']],
            options: ['べんきょうしませんでした', 'べんきょうしません', 'べんきょうしました', 'べんきょうします'],
            answer: 'べんきょうしませんでした',
            explain: 'べんきょうする → します → pasado negativo: しませんでした.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos verbos conjugados',
        tag: '2 verbos',
        intro: 'Conjuga los dos verbos en la forma indicada.',
        type: 'dual',
        items: [
          {
            scene: 'Ayer por la tarde',
            lines: [['Hugo', 'きのう かふぇに [[0]] (ir, pasado) て、コーヒーを [[1]] (beber, pasado)。']],
            blanks: [
              { options: ['いきました', 'いきます', 'いきませんでした'], answer: 'いきました', explain: 'いく → いきます → pasado: いきました.' },
              { options: ['のみました', 'のみます', 'のみませんでした'], answer: 'のみました', explain: 'のむ → のみます → pasado: のみました.' },
            ],
          },
          {
            scene: 'Mañana',
            lines: [['Sofia', 'あした にほんごを [[0]] (estudiar, presente) か？— すみません、[[1]] (no voy, negativo presente)。']],
            blanks: [
              { options: ['べんきょうしますか', 'べんきょうしました', 'べんきょうします'], answer: 'べんきょうしますか', explain: 'べんきょうする → します → pregunta: しますか.' },
              { options: ['いきません', 'いきました', 'いきませんでした'], answer: 'いきません', explain: 'いく → いきます → negativo presente: いきません.' },
            ],
          },
          {
            scene: 'Irregulares',
            lines: [['Carlos', 'きのう なにを [[0]] (hacer, pasado)か？— ともだちと えいがを [[1]] (ver, pasado)。']],
            blanks: [
              { options: ['しましたか', 'しますか', 'しませんでしたか'], answer: 'しましたか', explain: 'する → します → pasado pregunta: しましたか.' },
              { options: ['みました', 'みます', 'みませんでした'], answer: 'みました', explain: 'みる (grupo 2) → みます → pasado: みました.' },
            ],
          },
          {
            scene: 'Hábitos',
            lines: [['Ana', 'まいあさ シャワーを [[0]] (ducharse-する, presente) か？— はい、[[1]] (sí, lo hago)。']],
            blanks: [
              { options: ['あびますか', 'あびます', 'あびました'], answer: 'あびますか', explain: 'あびる (grupo 2) → あびます → pregunta: あびますか.' },
              { options: ['あびます', 'あびました', 'あびません'], answer: 'あびます', explain: 'Respuesta afirmativa presente: あびます.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado — rutina de ayer',
        tag: 'Opciones',
        intro: 'Elige la forma correcta del verbo en ます-kei.',
        type: 'guidedText',
        scene: 'Marco cuenta lo que hizo ayer',
        text: 'きのう しちじに [[0]] (levantarse-おきる, pasado)。あさごはんを [[1]] (comer, pasado)。でんしゃで がっこうに [[2]] (ir, pasado)。にほんごを [[3]] (estudiar-する, pasado)。ひるごはんは [[4]] (no comer, pasado negativo)。よる うちに [[5]] (volver, pasado) て、ねました。',
        blanks: [
          { options: ['おきました', 'おきます', 'おきませんでした'], answer: 'おきました', explain: 'おきる (grupo 2) → おきます → pasado: おきました.' },
          { options: ['たべました', 'たべます', 'たべませんでした'], answer: 'たべました', explain: 'たべる (grupo 2) → たべます → pasado: たべました.' },
          { options: ['いきました', 'いきます', 'いきませんでした'], answer: 'いきました', explain: 'いく (grupo 1) → いきます → pasado: いきました.' },
          { options: ['べんきょうしました', 'べんきょうします', 'べんきょうしませんでした'], answer: 'べんきょうしました', explain: 'べんきょうする → します → pasado: しました.' },
          { options: ['たべませんでした', 'たべません', 'たべました'], answer: 'たべませんでした', explain: 'Pasado negativo: たべませんでした.' },
          { options: ['かえりました', 'かえります', 'かえりませんでした'], answer: 'かえりました', explain: 'かえる (grupo 1) → かえります → pasado: かえりました.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta del verbo en ます-kei.',
        type: 'freeText',
        scene: 'La semana de Lina en japonés',
        text: 'まいにち にほんごを [[0]] (estudiar, presente). きのう ともだちと えいがを [[1]] (ver, pasado). あした がっこうに [[2]] (no ir, negativo presente). せんしゅう コーヒーを あまり [[3]] (no beber, pasado negativo). うんどうを まいにち [[4]] (hacer-する, presente) か？',
        blanks: [
          { answer: 'べんきょうします', explain: 'べんきょうする → します (presente afirmativo).' },
          { answer: 'みました', explain: 'みる → みます → pasado: みました.' },
          { answer: 'いきません', explain: 'いく → いきます → negativo presente: いきません.' },
          { answer: 'のみませんでした', explain: 'のむ → のみます → pasado negativo: のみませんでした.' },
          { answer: 'しますか', explain: 'する → します → pregunta: しますか.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción verbos ます',
        tag: 'Producción',
        intro: 'Escribe la frase completa conjugando el verbo.',
        type: 'write',
        items: [
          {
            scene: 'Tu rutina matutina',
            prompt: 'Escribe: Hoy me levanté a las 7. → きょう しちじに ___。',
            answer: 'きょう しちじに おきました。',
            accepted: ['きょう しちじに おきました', 'しちじに おきました'],
            explain: 'おきる → おきます → pasado: おきました.',
          },
          {
            scene: 'Mañana no voy',
            prompt: 'Escribe: Mañana no voy a la escuela. → あした がっこうに ___。',
            answer: 'あした がっこうに いきません。',
            accepted: ['あした がっこうに いきません', 'がっこうに いきません'],
            explain: 'いく → いきます → negativo presente: いきません.',
          },
          {
            scene: 'Irregular: hacer',
            prompt: 'Escribe: Ayer no hice ejercicio. → きのう うんどうを ___。',
            answer: 'きのう うんどうを しませんでした。',
            accepted: ['きのう うんどうを しませんでした', 'うんどうを しませんでした'],
            explain: 'する → します → pasado negativo: しませんでした.',
          },
          {
            scene: 'Pregunta de hábito',
            prompt: 'Escribe: ¿Bebes café todos los días? → まいにち コーヒーを ___？',
            answer: 'まいにち コーヒーを のみますか？',
            accepted: ['まいにち コーヒーを のみますか', 'コーヒーを のみますか'],
            explain: 'のむ → のみます → pregunta: のみますか.',
          },
        ],
      },
    ],
  },
}

export default topic
