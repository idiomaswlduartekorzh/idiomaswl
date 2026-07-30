import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'interrogativos-ka',
  order: '12',
  color: '#dc2626',
  category: 'Preguntas',
  level: 'A1',
  title: 'Palabras interrogativas en japonés A1 — Preguntas con か',
  shortTitle: 'Interrogativos',
  metaTitle: 'Interrogativos japonés A1 — doko itsu nani dare dō ikura',
  description:
    'Las palabras interrogativas del japonés (疑問詞, gimonshi) se colocan en la misma posición que el elemento que reemplazan, no al inicio de la frase como en español. どこ (dónde), いつ (cuándo), なに/なん (qué), だれ (quién), どれ (cuál), どう (cómo), なぜ/どうして (por qué), いくら (cuánto dinero), いくつ (cuántos/cuántos años). El orden de la frase NO cambia: el interrogativo simplemente ocupa el lugar del elemento desconocido.',
  lead: 'En japonés la pregunta NO mueve el interrogativo al inicio. 何を食べますか？(nani wo tabemasu ka?) = ¿Qué comes? — el qué (なに) va donde iría el objeto. Añade か al final para convertir cualquier frase en pregunta.',
  outcomes: [
    'Usa los interrogativos básicos del japonés en posición correcta (SOV)',
    'Formula preguntas con か sin cambiar el orden de la frase',
    'Distingue なに (nani) de なん (nan) según el contexto',
  ],

  guide: {
    goal: 'Usar las palabras interrogativas japonesas en la posición correcta dentro de la estructura SOV.',
    model: 'どこに いきますか？(doko ni ikimasu ka? = ¿Adónde vas?) / 何を たべますか？(nani wo tabemasu ka? = ¿Qué comes?)',
    formula: '[S]は + [interrogativo + partícula] + [verbo]ますか？',
    decisions: [
      'El interrogativo ocupa la posición del elemento desconocido — no se mueve al inicio',
      'どこ (doko) = dónde — va con partícula de lugar: どこに, どこで, どこへ',
      'いつ (itsu) = cuándo — puede ir al inicio o en posición temporal',
      'なに (nani) vs なん (nan) — なん antes de contador o です: なんですか, なんじ',
      'だれ (dare) = quién — usa が como partícula: だれが きましたか',
      'いくら (ikura) = cuánto (precio) | いくつ (ikutsu) = cuántos objetos / cuántos años',
    ],
    table: [
      ['Interrogativo', 'Romaji', 'Significado y uso'],
      ['どこ', 'doko', 'dónde — どこに いきますか？(¿adónde vas?)'],
      ['いつ', 'itsu', 'cuándo — いつ きましたか？(¿cuándo viniste?)'],
      ['なに/なん', 'nani/nan', 'qué — 何を たべますか？/ なんじですか？'],
      ['だれ', 'dare', 'quién — だれが いますか？(¿quién está?)'],
      ['どれ', 'dore', 'cuál (de varios) — どれが すきですか？'],
      ['どう', 'dō', 'cómo — どう おもいますか？(¿qué piensas?)'],
      ['なぜ/どうして', 'naze/dōshite', 'por qué — なぜ べんきょうしますか？'],
      ['いくら', 'ikura', 'cuánto (precio) — これは いくらですか？'],
      ['いくつ', 'ikutsu', 'cuántos / cuántos años — いくつですか？(¿cuántos años?)'],
    ],
    mistakes: [
      '"¿Qué comes?" NO es "なに たべますか？" al inicio — es "何を たべますか？" con を en posición de objeto.',
      'なに vs なん: usa なん antes de じ (なんじ=qué hora), です (なんですか=¿qué es?), y contadores.',
      'どう (cómo) es diferente de どうして (por qué) — どうして = "¿cómo es así?" → "¿por qué?".',
    ],
  },
  seo: [
    {
      heading: '¿Dónde van las palabras interrogativas en japonés?',
      paragraphs: [
        'Esta es la diferencia más sorprendente para el hispanohablante: en japonés, el interrogativo NO se mueve al inicio de la pregunta. En español preguntamos "¿Qué comes?" poniendo "qué" al inicio. En japonés, el interrogativo simplemente reemplaza al elemento desconocido en su posición natural: 何を たべますか？= "[tú] qué [objeto] comes [pregunta]". El orden SOV se mantiene intacto.',
        'Esto hace que las preguntas japonesas sean muy predecibles una vez que conoces la estructura base. Si la frase afirmativa es "にくを たべます" (como carne), la pregunta es "何を たべますか？" (¿qué comes?), donde solo reemplazas にく por 何 y añades か al final. No hay inversión verbal ni cambio de orden.',
      ],
    },
    {
      heading: '¿Cuándo se usa なに y cuándo なん en japonés?',
      paragraphs: [
        'なに (nani) y なん (nan) son la misma palabra con dos pronunciaciones. La regla práctica: usa なん antes de sonidos d/t/n y antes de contadores. なんじ (nanji = qué hora), なんにん (nannin = cuántas personas), なんですか (nan desu ka = ¿qué es esto?). Usa なに antes de partículas: 何を (nani wo), 何が (nani ga), 何に (nani ni).',
        'En la práctica cotidiana, なん es más frecuente en conversación hablada y なに más frecuente en japonés escrito y formal. En A1, la distinción más importante es なんじですか (¿qué hora es?) — siempre なん porque va antes del contador じ (hora).',
      ],
    },
    {
      heading: '¿Cómo se forma una pregunta con か en japonés?',
      paragraphs: [
        'Basta con añadir la partícula か (ka) al final de una frase afirmativa, sin cambiar el orden de las palabras ni invertir nada: 学生です → 学生ですか (¿eres estudiante?), 食べます → 食べますか (¿comes?). No hace falta signo de interrogación ni entonación especial en el registro cortés. Para las preguntas con palabra interrogativa (何 nani/qué, どこ doko/dónde, いつ itsu/cuándo, だれ dare/quién), esta va en el lugar del elemento por el que se pregunta —no al inicio como en español— y la frase sigue terminando en か: 何を食べますか (¿qué comes?), どこに行きますか (¿a dónde vas?). La trampa para el hispanohablante es no anteponer la palabra interrogativa: en japonés se queda en su posición dentro de la frase.',
      ],
    },
  ],
  visual: {
    mode: 'interrogative-words',
    teacherLens: 'El estudiante aprende que el interrogativo ocupa la posición del elemento desconocido en la estructura SOV.',
    graphicPrompt: 'Tabla de interrogativos con flechas mostrando posición en la frase SOV. Comparativa español vs japonés.',
    scene: [
      ['どこ = dónde', 'どこに いきますか？'],
      ['なに/なん = qué', '何を たべますか？'],
      ['だれ = quién', 'だれが きましたか？'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['posición del interrogativo en SOV', 'なに vs なん', 'どこ con partículas de lugar', 'か final para preguntas'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'El interrogativo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el interrogativo japonés que corresponde a cada pregunta.',
        type: 'choice',
        items: [
          {
            scene: 'Preguntando el lugar',
            lines: [['Carlos', '___に いきますか？ (¿Adónde vas?)']],
            options: ['どこ', 'いつ', 'なに', 'だれ'],
            answer: 'どこ',
            explain: 'どこ (doko) = dónde. Lugar → どこ + に/で/へ. どこに いきますか = ¿adónde vas?',
          },
          {
            scene: 'Preguntando el tiempo',
            lines: [['Ana', '___ きましたか？ (¿Cuándo viniste?)']],
            options: ['いつ', 'どこ', 'なに', 'いくら'],
            answer: 'いつ',
            explain: 'いつ (itsu) = cuándo. Tiempo → いつ (sin partícula obligatoria). いつ きましたか？',
          },
          {
            scene: 'Preguntando el objeto',
            lines: [['Gael', '___ を たべますか？ (¿Qué comes?)']],
            options: ['なに', 'だれ', 'どれ', 'どう'],
            answer: 'なに',
            explain: 'なに (nani) = qué. Objeto con を → なにを. 何を たべますか？= ¿qué comes?',
          },
          {
            scene: 'Preguntando el precio',
            lines: [['Sofia', 'これは ___ ですか？ (¿Cuánto cuesta esto?)']],
            options: ['いくら', 'いくつ', 'なに', 'どう'],
            answer: 'いくら',
            explain: 'いくら (ikura) = cuánto (precio). これは いくらですか？= ¿cuánto cuesta esto?',
          },
          {
            scene: 'Preguntando la persona',
            lines: [['Marco', '___ が きましたか？ (¿Quién vino?)']],
            options: ['だれ', 'どれ', 'なに', 'いつ'],
            answer: 'だれ',
            explain: 'だれ (dare) = quién. Persona → だれ + が. だれが きましたか？= ¿quién vino?',
          },
          {
            scene: 'Preguntando la cantidad/edad',
            lines: [['Lina', '___ ですか？ (¿Cuántos años tienes?)']],
            options: ['いくつ', 'いくら', 'いつ', 'どれ'],
            answer: 'いくつ',
            explain: 'いくつ (ikutsu) = cuántos / cuántos años. いくつですか = ¿cuántos años tienes? (informal).',
          },
          {
            scene: 'Preguntando la opinión',
            lines: [['Vera', 'にほんご は ___ おもいますか？ (¿Qué piensas del japonés?)']],
            options: ['どう', 'なに', 'どこ', 'なぜ'],
            answer: 'どう',
            explain: 'どう (dō) = cómo / qué tal. Opinión → どう おもいますか = ¿qué piensas?',
          },
          {
            scene: 'La hora',
            lines: [['Carlos', 'いま ___ じ ですか？ (¿Qué hora es ahora?)']],
            options: ['なん', 'なに', 'どこ', 'いつ'],
            answer: 'なん',
            explain: 'なんじ (nanji) = qué hora. Ante contador じ usa なん (no なに). いま なんじですか？',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Interrogativo y partícula',
        tag: '2 espacios',
        intro: 'Completa el interrogativo y la partícula correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Dónde estudias',
            lines: [['Ana', '[[0]] [[1]] べんきょうしますか？ (¿Dónde estudias?)']],
            blanks: [
              { options: ['どこ', 'いつ', 'なに'], answer: 'どこ', explain: 'どこ (doko) = dónde. Lugar de acción.' },
              { options: ['で', 'に', 'を'], answer: 'で', explain: 'Lugar de acción → で. どこで べんきょうしますか？' },
            ],
          },
          {
            scene: 'Qué comes',
            lines: [['Gael', '[[0]] [[1]] たべますか？ (¿Qué comes?)']],
            blanks: [
              { options: ['なに', 'だれ', 'どこ'], answer: 'なに', explain: 'なに (nani) = qué. Elemento desconocido = objeto.' },
              { options: ['を', 'が', 'に'], answer: 'を', explain: 'Objeto de comer → を. 何を たべますか？' },
            ],
          },
          {
            scene: 'Quién está aquí',
            lines: [['Sofia', '[[0]] [[1]] いますか？ (¿Quién está aquí?)']],
            blanks: [
              { options: ['だれ', 'なに', 'どれ'], answer: 'だれ', explain: 'だれ (dare) = quién. Persona desconocida.' },
              { options: ['が', 'は', 'を'], answer: 'が', explain: 'Sujeto de います → が. だれが いますか？' },
            ],
          },
          {
            scene: 'Adónde vas',
            lines: [['Marco', '[[0]] [[1]] いきますか？ (¿Adónde vas?)']],
            blanks: [
              { options: ['どこ', 'いつ', 'なに'], answer: 'どこ', explain: 'どこ (doko) = dónde/adónde. Dirección.' },
              { options: ['に', 'で', 'を'], answer: 'に', explain: 'Destino de movimiento → に. どこに いきますか？' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado — preguntas en WeLearn',
        tag: 'Opciones',
        intro: 'Elige el interrogativo correcto para cada espacio.',
        type: 'guidedText',
        scene: 'Gael pregunta a Carlos sobre sus estudios de japonés',
        text: 'デービッド: カルロスさん、[[0]]に すんでいますか？カルロス: コロンビアに すんでいます。デービッド: [[1]]から にほんごを べんきょうしていますか？カルロス: 6ヶ月前からです。デービッド: [[2]]を べんきょうしていますか？カルロス: にほんごと コリア語です。デービッド: [[3]] べんきょうしますか？カルロス: まいにち 2じかんです。デービッド: [[4]]で べんきょうしますか？カルロス: ウィーラーンで べんきょうします。デービッド: [[5]] にほんごが すきですか？カルロス: おもしろいから すきです！',
        blanks: [
          { options: ['どこ', 'いつ', 'なに'], answer: 'どこ', explain: 'どこ (doko) = dónde. Preguntando lugar de residencia.' },
          { options: ['いつ', 'どこ', 'なぜ'], answer: 'いつ', explain: 'いつ (itsu) = cuándo. Preguntando desde cuándo estudia.' },
          { options: ['なに', 'だれ', 'どれ'], answer: 'なに', explain: 'なに (nani) = qué. Objeto: ¿qué estudias?' },
          { options: ['どのくらい', 'どこ', 'いくら'], answer: 'どのくらい', explain: 'どのくらい (dono kurai) = cuánto tiempo. Preguntando duración.' },
          { options: ['どこ', 'いつ', 'なぜ'], answer: 'どこ', explain: 'どこで (doko de) = dónde (acción). Lugar de estudio.' },
          { options: ['なぜ', 'どこ', 'いつ'], answer: 'なぜ', explain: 'なぜ (naze) = por qué. Preguntando la razón.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe el interrogativo correcto sin opciones.',
        type: 'freeText',
        scene: 'Sofia hace preguntas en la clase de japonés',
        text: '[[0]]を たべますか？(¿Qué comes?) — [[1]]に いきますか？(¿Adónde vas?) — [[2]]が きましたか？(¿Quién vino?) — [[3]] べんきょうしますか？(¿Cuándo estudias?) — これは [[4]]ですか？(¿Cuánto cuesta esto?) — [[5]]じですか？(¿Qué hora es?)',
        blanks: [
          { answer: 'なに', accepted: ['何'], explain: 'なに/何 (nani) = qué. Objeto con を → 何を たべますか。' },
          { answer: 'どこ', explain: 'どこ (doko) = dónde/adónde. Destino con に → どこに いきますか。' },
          { answer: 'だれ', explain: 'だれ (dare) = quién. Sujeto con が → だれが きましたか。' },
          { answer: 'いつ', explain: 'いつ (itsu) = cuándo. Tiempo → いつ べんきょうしますか。' },
          { answer: 'いくら', explain: 'いくら (ikura) = cuánto (precio). これは いくらですか？' },
          { answer: 'なん', explain: 'なんじ (nanji) = qué hora. Antes de contador じ → なん.' },
        ],
      },
      {
        id: 'l5',
        title: 'Produce preguntas',
        tag: 'Producción',
        intro: 'Escribe la pregunta completa con el interrogativo correcto.',
        type: 'write',
        items: [
          {
            scene: '¿Dónde vives?',
            prompt: 'Escribe en japonés: ¿Dónde vives? → ___ に すんでいますか？',
            answer: 'どこに すんでいますか？',
            accepted: ['どこに すんでいますか', 'どこに すんでいますか？'],
            explain: 'どこ (dónde) + に (lugar) + すんでいますか (¿vives?). Interrogativo en posición SOV.',
          },
          {
            scene: '¿Qué estudias?',
            prompt: 'Escribe en japonés: ¿Qué estudias? → ___ を べんきょうしますか？',
            answer: 'なにを べんきょうしますか？',
            accepted: ['なにを べんきょうしますか', '何を べんきょうしますか', 'なにを べんきょうしますか？'],
            explain: 'なに/何 (qué) + を (objeto) + べんきょうしますか (¿estudias?). なに ocupa posición del objeto.',
          },
          {
            scene: '¿Cuánto cuesta?',
            prompt: 'Escribe en japonés: ¿Cuánto cuesta esto? → これは ___ ですか？',
            answer: 'これは いくらですか？',
            accepted: ['これは いくらですか', 'これは いくらですか？'],
            explain: 'いくら (cuánto-precio) + ですか. Pregunta de precio.',
          },
          {
            scene: '¿Quién es?',
            prompt: 'Escribe en japonés: ¿Quién es esa persona? → あの ひとは ___ ですか？',
            answer: 'あの ひとは だれですか？',
            accepted: ['あの ひとは だれですか', 'あの ひとは だれですか？'],
            explain: 'だれ (quién) en posición de predicado. あの ひとは だれですか？= ¿quién es esa persona?',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión de preguntas',
        tag: 'Reto final',
        intro: 'Escribe tres preguntas usando distintos interrogativos japoneses.',
        type: 'write',
        items: [
          {
            scene: 'Preguntar dónde y cuándo',
            prompt: '___に いきますか？ いつ ___ますか？(¿Adónde vas? ¿Cuándo [verbo]?)',
            answer: 'どこに いきますか？いつ いきますか？',
            accepted: ['どこに いきますか いつ いきますか'],
            explain: 'どこに いきますか (¿adónde vas?) + いつ いきますか (¿cuándo vas?).',
          },
          {
            scene: 'Preguntar qué y quién',
            prompt: '___を たべますか？ ___と たべますか？(¿Qué comes? ¿Con quién comes?)',
            answer: 'なにを たべますか？だれと たべますか？',
            accepted: ['なにを たべますか だれと たべますか', '何を たべますか だれと たべますか'],
            explain: 'なに/何 (qué) + を. だれと (con quién) + たべますか.',
          },
          {
            scene: 'Preguntar precio y cantidad',
            prompt: 'これは ___ですか？___ですか？(¿Cuánto cuesta esto? ¿Cuántos [tienes]?)',
            answer: 'これは いくらですか？いくつですか？',
            accepted: ['これは いくらですか いくつですか'],
            explain: 'いくら (cuánto-precio) y いくつ (cuántos/cuántos años).',
          },
        ],
      },
    ],
  },
}

export default topic
