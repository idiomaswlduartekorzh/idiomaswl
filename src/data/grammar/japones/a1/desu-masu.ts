import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'desu-masu',
  order: '03',
  color: '#7c3aed',
  category: 'Verbos',
  level: 'A1',
  title: 'Desu y Masu en japonés A1 — Formas formales esenciales',
  shortTitle: 'です / ます',
  metaTitle: 'desu masu japonés A1 — formas formales presentes y negativas',
  description:
    'です (desu) y ます (masu) son los dos terminadores verbales formales del japonés A1. です funciona como cópula (= ser/estar para identificación). Los verbos en forma ます expresan acciones en presente formal. Ambas formas son las que aprende un principiante para hablar con corrección y cortesía.',
  lead: 'です = "es/soy/eres" (cópula formal). ます = terminación de verbos formales: たべます (como), のみます (bebo), いきます (voy). Negativa: ではありません (no es) / ません (no + verbo).',
  outcomes: [
    'Usa です para identificación y descripción en japonés formal',
    'Reconoce verbos en forma ます como formas formales de presente',
    'Construye negaciones con ではありません y ません',
  ],

  guide: {
    goal: 'Usar です y ます para construir frases formales en japonés A1.',
    model: 'わたしは がくせいです。(Soy estudiante.) / まいにち にほんごを べんきょうします。(Estudio japonés todos los días.)',
    formula: '[nombre/adj] + です | [verbo-stem] + ます',
    decisions: [
      'です → cópula formal: [sustantivo/adjetivo] + です',
      'Negativo de です → ではありません (formal) / じゃないです (informal)',
      'ます → verbo formal presente/futuro: たべます, のみます, いきます, きます, します',
      'Negativo de ます → ません: たべません (no como), いきません (no voy)',
      'Pregunta: mismo + か al final: がくせいですか？= ¿Eres estudiante?',
      'No existe "I/you/he" en la terminación — el sujeto se entiende por contexto',
    ],
    table: [
      ['Forma', 'Afirmativo', 'Negativo'],
      ['です (cópula)', 'がくせいです', 'がくせいではありません'],
      ['ます (verbo)', 'たべます', 'たべません'],
    ],
    mistakes: [
      '"です" se pronuncia "desu" pero la "u" final es casi silenciosa en japonés estándar.',
      '"ます" = presente Y futuro: たべます = "como" o "comeré" según contexto.',
      'La pregunta con か no sube en entonación como en español — es neutral o baja.',
    ],
  },
  seo: [
    {
      heading: 'Desu y masu: las formas de cortesía del japonés A1',
      paragraphs: [
        'El japonés tiene múltiples niveles de formalidad. Para principiantes, la forma estándar y segura es el estilo です/ます (desu-masu style), que es formal sin llegar a ser demasiado ceremonioso. Es el equivalente a hablar de "usted" de forma educada — apropiado para hablar con desconocidos, profesores, o en situaciones formales.',
        'です funciona como el verbo "ser/estar" en identificación: わたしは がくせいです = "Yo soy estudiante". ます termina los verbos de acción: たべます = "como", のみます = "bebo", いきます = "voy". Estos dos terminadores te permiten construir cientos de frases desde A1.',
      ],
    },
    {
      heading: 'Negaciones y preguntas en desu-masu',
      paragraphs: [
        'La negación de です es ではありません (de wa arimasen) en estilo formal, o じゃないです (ja nai desu) en estilo más coloquial. La negación de ます es ません (masen): たべません = "no como", いきません = "no voy".',
        'Las preguntas se forman añadiendo la partícula か (ka) al final de la frase. がくせいですか = ¿Eres estudiante? にほんごを べんきょうしますか = ¿Estudias japonés? En japonés escrito formal se usa el signo de interrogación か sin signo de cierre occidental.',
      ],
    },
  ],
  visual: {
    mode: 'copula-verb',
    teacherLens: 'El estudiante aprende です para identificación y ます para acciones, con sus negaciones y preguntas.',
    graphicPrompt: 'Tabla です/ます × afirmativo/negativo/pregunta. Nota pronunciación "desu".',
    scene: [
      ['です = es/soy/eres', 'cópula formal'],
      ['ます = verbo formal presente', 'たべます/のみます/いきます'],
      ['ません / ではありません', 'negaciones formales'],
    ],
    learnerModes: ['visual: tabla afirmativo/negativo/pregunta', 'analítico: desu vs masu', 'oral: preguntas con か'],
    reviewFocus: ['です para identidad', 'ます para acción', 'ません negación de ます', 'か para preguntas'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Desu o masu',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta: です o la forma ます del verbo.',
        type: 'choice',
        items: [
          {
            scene: 'Presentación',
            lines: [['Carlos', 'わたしは がくせい___.']],
            options: ['です', 'ます', 'ません', 'か'],
            answer: 'です',
            explain: 'Identidad: [sustantivo] + です. わたしは がくせいです = soy estudiante.',
          },
          {
            scene: 'Acción diaria',
            lines: [['Sofia', 'まいにち ごはんを たべ___.']],
            options: ['ます', 'です', 'ません', 'ではありません'],
            answer: 'ます',
            explain: 'Acción presente: たべます = como. Verbo + ます.',
          },
          {
            scene: 'Negación de identidad',
            lines: [['Marco', 'わたしは にほんじん___.  (No soy japonés.)']],
            options: ['ではありません', 'です', 'ません', 'ますか'],
            answer: 'ではありません',
            explain: 'Negación de です: ではありません. にほんじんではありません = no soy japonés.',
          },
          {
            scene: 'Negación de acción',
            lines: [['Ana', 'にほんごを べんきょうし___.  (No estudio japonés.)']],
            options: ['ません', 'ます', 'です', 'ではありません'],
            answer: 'ません',
            explain: 'Negación de ます: ません. べんきょうしません = no estudio.',
          },
          {
            scene: 'Pregunta',
            lines: [['Leo', 'にほんごを べんきょうし___.  (¿Estudias japonés?)']],
            options: ['ますか', 'ません', 'です', 'ますね'],
            answer: 'ますか',
            explain: 'Pregunta: ます + か. べんきょうしますか = ¿estudias?',
          },
          {
            scene: 'Adjetivo + desu',
            lines: [['Emma', 'にほんご___ おもしろいです。(El japonés es interesante.)']],
            options: ['は', 'を', 'に', 'で'],
            answer: 'は',
            explain: 'にほんごは [tema] + おもしろいです [adjetivo + です].',
          },
          {
            scene: 'Presentación de origen',
            lines: [['Lina', 'わたしは コロンビアじん___.']],
            options: ['です', 'ます', 'ません', 'か'],
            answer: 'です',
            explain: 'Identidad/origen: [sustantivo] + です. コロンビアじんです = soy colombiana.',
          },
          {
            scene: 'Voy a la escuela',
            lines: [['Carlos', 'がっこうに い___.']],
            options: ['きます', 'きません', 'きです', 'か'],
            answer: 'きます',
            explain: 'いきます = voy (ir). Verbo stem い + きます.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Desu y masu en diálogo',
        tag: '2 espacios',
        intro: 'Completa los dos finales verbales del diálogo.',
        type: 'dual',
        items: [
          {
            scene: 'Presentación',
            lines: [
 ['Carlos', 'わたしは カルロス[[0]]。がくせい[[1]]。'],
 ],
            blanks: [
              { options: ['です', 'ます', 'ません'], answer: 'です', explain: 'Nombre + です. Presentación.' },
              { options: ['です', 'ます', 'ません'], answer: 'です', explain: 'Identidad: がくせいです = soy estudiante.' },
            ],
          },
          {
            scene: 'Acciones del día',
            lines: [['Leo', 'まいにち コーヒーを の[[0]]。ランチを たべ[[1]]。']],
            blanks: [
              { options: ['みます', 'みません', 'みです'], answer: 'みます', explain: 'のみます = bebo. Verbo stem の + みます.' },
              { options: ['ます', 'ません', 'です'], answer: 'ます', explain: 'たべます = como. Verbo stem たべ + ます.' },
            ],
          },
          {
            scene: 'Negaciones',
            lines: [['Sofia', 'わたしは にほんじんでは[[0]]。えいごを はなし[[1]]。(No soy japonesa. No hablo inglés.)']],
            blanks: [
              { options: ['ありません', 'あります', 'ます'], answer: 'ありません', explain: 'ではありません = no es. Negación de です.' },
              { options: ['ません', 'ます', 'です'], answer: 'ません', explain: 'はなしません = no hablo. Negación de ます.' },
            ],
          },
          {
            scene: 'Preguntas',
            lines: [['Ana', 'にほんごを べんきょうし[[0]]？ がくせい[[1]]？']],
            blanks: [
              { options: ['ますか', 'ます', 'ません'], answer: 'ますか', explain: 'べんきょうしますか = ¿estudias? ます + か.' },
              { options: ['ですか', 'です', 'ではありません'], answer: 'ですか', explain: 'がくせいですか = ¿eres estudiante? です + か.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Elige el terminador verbal correcto en cada espacio.',
        type: 'guidedText',
        scene: 'Presentación de un estudiante de japonés A1',
        text: 'わたしは カルロス[[0]]。コロンビアじん[[1]]。まいにち にほんごを べんきょうし[[2]]。がっこうに い[[3]]。えいごは わかり[[4]] が、にほんごは まだです。にほんご[[5]] おもしろい[[6]]。',
        blanks: [
          { options: ['です', 'ます', 'ません'], answer: 'です', explain: 'Nombre + です. Cópula.' },
          { options: ['です', 'ます', 'ません'], answer: 'です', explain: 'Identidad: コロンビアじんです.' },
          { options: ['ます', 'です', 'ません'], answer: 'ます', explain: 'べんきょうします = estudio. ます.' },
          { options: ['きます', 'きません', 'きです'], answer: 'きます', explain: 'いきます = voy. い + きます.' },
          { options: ['ます', 'ません', 'です'], answer: 'ます', explain: 'わかります = entiendo. ます.' },
          { options: ['は', 'を', 'が'], answer: 'は', explain: 'にほんごは [tema] para el comentario que sigue.' },
          { options: ['です', 'ます', 'ますか'], answer: 'です', explain: 'おもしろいです = es interesante. Adjetivo + です.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe el terminador verbal correcto.',
        type: 'freeText',
        scene: 'Preguntas y respuestas en japonés A1',
        text: 'A: がくせい[[0]]か？ B: はい、がくせい[[1]]。A: にほんごを べんきょうし[[2]]か？ B: はい、まいにち べんきょうし[[3]]。A: にほんじん[[4]]か？ B: いいえ、にほんじんでは[[5]]。',
        blanks: [
          { answer: 'です', explain: 'がくせいですか = ¿eres estudiante?' },
          { answer: 'です', explain: 'はい、がくせいです = sí, soy estudiante.' },
          { answer: 'ます', explain: 'べんきょうしますか = ¿estudias?' },
          { answer: 'ます', explain: 'まいにち べんきょうします = estudio todos los días.' },
          { answer: 'です', explain: 'にほんじんですか = ¿eres japonés?' },
          { answer: 'ありません', explain: 'ではありません = no soy. Negación de です.' },
        ],
      },
      {
        id: 'l5',
        title: 'Frases completas',
        tag: 'Producción',
        intro: 'Escribe la frase completa con です o ます.',
        type: 'write',
        items: [
          {
            scene: 'Soy estudiante',
            prompt: 'Escribe en japonés: Soy estudiante → わたしは がくせい___',
            answer: 'わたしは がくせいです。',
            accepted: ['わたしは がくせいです', 'わたしは がくせいです。'],
            explain: '[sustantivo] + です. Cópula formal.',
          },
          {
            scene: 'No como carne',
            prompt: 'Escribe en japonés: No como carne → にくを たべ___',
            answer: 'にくを たべません。',
            accepted: ['にくを たべません', 'にくを たべません。'],
            explain: 'Negación de ます: ません. たべません = no como.',
          },
          {
            scene: '¿Hablas inglés?',
            prompt: 'Escribe en japonés: ¿Hablas inglés? → えいごを はなし___か？',
            answer: 'えいごを はなしますか？',
            accepted: ['えいごを はなしますか', 'えいごを はなしますか？'],
            explain: 'Pregunta: ます + か. はなしますか = ¿hablas?',
          },
          {
            scene: 'El japonés es difícil',
            prompt: 'Escribe en japonés: El japonés es difícil → にほんごは むずかしい___',
            answer: 'にほんごは むずかしいです。',
            accepted: ['にほんごは むずかしいです', 'にほんごは むずかしいです。'],
            explain: 'Adjetivo + です. むずかしいです = es difícil.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Preséntate en japonés usando です y ます.',
        type: 'write',
        items: [
          {
            scene: 'Tu presentación formal',
            prompt: 'わたしは ___です。___じんです。まいにち ___ます。',
            answer: 'わたしは カルロスです。コロンビアじんです。まいにち にほんごを べんきょうします。',
            accepted: [
              'わたしは カルロスです コロンビアじんです まいにち にほんごを べんきょうします',
              'わたしは ソフィアです スペインじんです まいにち にほんごを べんきょうします',
            ],
            explain: 'Nombre + です. [país]じんです. まいにち + [verbo]ます.',
          },
          {
            scene: 'Lo que no haces',
            prompt: 'わたしは ___ません。___ません。(dos cosas que no haces)',
            answer: 'わたしは にくを たべません。おさけを のみません。',
            accepted: ['わたしは にくを たべません おさけを のみません'],
            explain: 'Negación: ません. たべません = no como. のみません = no bebo.',
          },
          {
            scene: 'Pregunta a tu compañero',
            prompt: 'にほんごを べんきょうし___か？___じんです___か？',
            answer: 'にほんごを べんきょうしますか？コロンビアじんですか？',
            accepted: ['にほんごを べんきょうしますか コロンビアじんですか'],
            explain: 'ますか para acción. ですか para identidad.',
          },
        ],
      },
    ],
  },
}

export default topic
