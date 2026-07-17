import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'mae-ni-ato-de-a2',
  order: '18',
  color: '#dc2626',
  category: 'Sintaxis',
  level: 'A2',
  title: '前に/後で en japonés A2: antes y después de',
  shortTitle: '前に/後で (antes/después)',
  metaTitle: 'Antes y después en japonés A2 — 前に, 後で, secuencia temporal',
  description:
    '前に (mae ni) y 後で (ato de) expresan "antes de" y "después de" en japonés. Con verbos: V dic. + 前に (antes de hacer algo) y V-た + 後で (después de haber hecho algo). Con sustantivos: N + の前に / N + の後で. Son estructuras de secuencia temporal fundamentales en A2, equivalentes al coreano -기 전에 / -(으)ㄴ 후에.',
  lead: '寝る前に歯を磨きます: antes y después en japonés con 前に y 後で.',
  outcomes: [
    'Usar V dic. + 前に para "antes de hacer algo"',
    'Usar V-た + 後で para "después de haber hecho algo"',
    'Combinar 前に/後で con sustantivos usando の',
    'Distinguir la forma verbal requerida por cada expresión',
  ],

  guide: {
    goal: 'Expresar secuencias temporales con 前に (antes) y 後で (después) en japonés.',
    model: '寝る前に歯を磨きます。(Me cepillo los dientes antes de dormir.) / ご飯を食べた後で、散歩します。(Doy un paseo después de comer.)',
    formula: 'V dic. + 前に | V-た + 後で | N + の + 前に/後で',
    decisions: [
      'V dic. + 前に: SIEMPRE diccionario (sin conjugar por tiempo) → "食べる前に" (antes de comer)',
      'V-た + 後で: forma ta (pasado) + 後で → "食べた後で" (después de comer)',
      'N + の前に: "授業の前に" (antes de la clase), "食事の前に" (antes de la comida)',
      'N + の後で: "授業の後で" (después de la clase), "仕事の後で" (después del trabajo)',
      'El tiempo de la oración principal indica cuándo ocurre todo; 前に/後で no cambian de tiempo',
    ],
    table: [
      ['Expresión', 'Estructura', 'Ejemplo'],
      ['antes de + V', 'V dic. + 前に', '食べる前に手を洗う'],
      ['después de + V', 'V-た + 後で', '食べた後で、歯を磨く'],
      ['antes/después + N', 'N + の + 前に/後で', '授業の前に / 仕事の後で'],
    ],
    mistakes: [
      '"食べた前に" ❌ → "食べる前に" ✓ — 前に siempre con forma diccionario, NUNCA た.',
      '"食べる後で" ❌ → "食べた後で" ✓ — 後で siempre con forma た, NUNCA diccionario.',
      '"授業前に" ❌ → "授業の前に" ✓ — entre N y 前に/後で necesitas の.',
    ],
  },

  seo: [
    {
      heading: '前に y 後で: la regla de las formas verbales',
      paragraphs: [
        'La clave de 前に y 後で es la forma verbal que llevan. 前に siempre va con la FORMA DICCIONARIO: "食べる前に" (antes de comer), sin importar si la oración está en pasado o futuro. 後で siempre va con la FORMA た: "食べた後で" (después de haber comido).',
        'Esto es diferente del español donde ambas expresiones usan el infinitivo ("antes de comer", "después de comer"). En japonés, la forma reflejada la completitud de la acción: 後で usa た porque la acción ya está completada (aunque el contexto global sea futuro).',
      ],
    },
    {
      heading: 'Con sustantivos: siempre の前に / の後で',
      paragraphs: [
        'Con sustantivos, tanto 前に como 後で necesitan の entre el sustantivo y la expresión temporal: "授業の前に" (antes de la clase), "仕事の後で" (después del trabajo), "昼ご飯の後で" (después del almuerzo). Sin の es agramatical: "授業前に" ❌.',
        'Las expresiones más frecuentes en japonés cotidiano: 食事の前に (antes de comer), 寝る前に (antes de dormir), 起きた後で (después de levantarse), 仕事の後で (después del trabajo).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'V dic.+前に (antes) / V-た+後で (después) / N+の+前に/後で.',
    graphicPrompt: 'Línea del tiempo con dos eventos marcados: antes y después.',
    scene: [
      ['寝る前に、歯を磨きます。', 'Me cepillo los dientes antes de dormir.'],
      ['ご飯を食べた後で、散歩します。', 'Doy un paseo después de comer.'],
      ['授業の前に、宿題をします。', 'Hago los deberes antes de la clase.'],
      ['仕事の後で、友達と飲みます。', 'Quedo con amigos después del trabajo.'],
      ['日本に来る前に、日本語を勉強しました。', 'Estudié japonés antes de venir a Japón.'],
      ['映画を見た後で、感想を話しましょう。', 'Hablemos de impresiones después de ver la película.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['V dic. + 前に', 'V-た + 後で', 'N + の + 前に/後で'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Antes o después: forma verbal correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma verbal correcta con 前に o 後で.',
        type: 'choice',
        items: [
          {
            scene: 'Antes de comer (食べる).',
            lines: [['', '___ 前に、手を洗います。']],
            options: ['食べる', '食べた', '食べて', '食べ'],
            answer: '食べる',
            explain: '"食べる前に" = antes de comer. 前に + forma diccionario SIEMPRE.',
          },
          {
            scene: 'Después de comer (食べる → た).',
            lines: [['', '___ 後で、歯を磨きます。']],
            options: ['食べた', '食べる', '食べて', '食べ'],
            answer: '食べた',
            explain: '"食べた後で" = después de comer. 後で + forma た SIEMPRE.',
          },
          {
            scene: 'Antes de dormir (寝る).',
            lines: [['', '___ 前に、日記を書きます。']],
            options: ['寝る', '寝た', '寝て', '寝'],
            answer: '寝る',
            explain: '"寝る前に" = antes de dormir. 寝る = diccionario + 前に.',
          },
          {
            scene: 'Después de llegar a casa (帰る → た).',
            lines: [['', '家に帰っ___ 後で、シャワーを浴びます。']],
            options: ['た', 'る', 'て', 'く'],
            answer: 'た',
            explain: '"帰った後で" = 帰る → 帰った + 後で. 後で con た siempre.',
          },
          {
            scene: 'Antes de la clase (N).',
            lines: [['', '授業___ 前に、教科書を読みます。']],
            options: ['の', 'を', 'が', 'に'],
            answer: 'の',
            explain: '"授業の前に" = antes de la clase. N + の + 前に.',
          },
          {
            scene: 'Después del trabajo (N).',
            lines: [['', '仕事___ 後で、ジムに行きます。']],
            options: ['の', 'を', 'が', 'に'],
            answer: 'の',
            explain: '"仕事の後で" = después del trabajo. N + の + 後で.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Antes y después en secuencia',
        tag: '2 espacios',
        intro: 'Completa la secuencia temporal con 前に y 後で.',
        type: 'dual',
        items: [
          {
            scene: 'Antes de comer te lavas las manos; después de comer, te cepillas.',
            lines: [['', 'ご飯を食べ[[0]]、手を洗います。食べ[[1]] 歯を磨きます。']],
            blanks: [
              { options: ['る前に', 'た前に', 'て前に', 'の前に'], answer: 'る前に', explain: '"食べる前に" = antes de comer. V dic. + 前に.' },
              { options: ['た後で、', 'る後で、', 'て後で、', 'の後で、'], answer: 'た後で、', explain: '"食べた後で" = después de comer. V-た + 後で.' },
            ],
          },
          {
            scene: 'Antes del viaje estudia; después del viaje escribe un diario.',
            lines: [['', '旅行[[0]]、日本語を勉強します。旅行[[1]] 日記を書きます。']],
            blanks: [
              { options: ['の前に', 'の後で', 'する前に', 'した後で'], answer: 'の前に', explain: '"旅行の前に" = antes del viaje. N + の前に.' },
              { options: ['の後で、', 'の前に、', 'する後で、', 'した後で、'], answer: 'の後で、', explain: '"旅行の後で" = después del viaje. N + の後で.' },
            ],
          },
          {
            scene: 'Antes de dormir lee; después de levantarse desayuna.',
            lines: [['', '寝[[0]]、本を読みます。起き[[1]] 朝ご飯を食べます。']],
            blanks: [
              { options: ['る前に', 'た前に', 'て前に', 'の前に'], answer: 'る前に', explain: '"寝る前に" = antes de dormir. 寝る (dic.) + 前に.' },
              { options: ['た後で、', 'る後で、', 'の後で、', 'て後で、'], answer: 'た後で、', explain: '"起きた後で" = después de levantarse. 起きる → 起きた + 後で.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Rutina diaria con 前に/後で',
        tag: 'Texto guiado',
        intro: 'Completa la rutina usando 前に y 後で correctamente.',
        type: 'guidedText',
        scene: '山田さんの一日のルーティンを説明します。',
        text: '山田さんは毎朝、起き[[0]] シャワーを浴びます。シャワー[[1]]、朝ご飯を食べます。出かけ[[0]]、バッグを確認します。学校[[1]]、友達に会います。帰宅し[[0]]、手を洗います。',
        blanks: [
          { options: ['た後で、', 'る前に、', 'て後で、', 'の後で、'], answer: 'た後で、', explain: '"起きた後で" = después de levantarse. 起きる → 起きた + 後で.' },
          { options: ['の後で、', 'の前に、', 'した後で、', 'する前に、'], answer: 'の後で、', explain: '"シャワーの後で" = después de la ducha. N + の + 後で.' },
          { options: ['る前に、', 'た前に、', 'の前に、', 'て前に、'], answer: 'る前に、', explain: '"出かける前に" = antes de salir. V dic. + 前に.' },
          { options: ['の後で、', 'の前に、', 'する前に、', 'した後で、'], answer: 'の後で、', explain: '"学校の後で" = después de la escuela. N + の + 後で.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Forma correcta de 前に/後で',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma verbal correcta con 前に o 後で.',
        type: 'freeText',
        scene: '正しい形を書いてください。',
        text: '寝る___ (前に), 歯を磨きます。 / 映画を見___ 後で, 感想を話します。 / 日本に来___ (前に), 日本語を勉強しました。 / 仕事が終わっ___ 後で, 帰ります。',
        blanks: [
          { answer: '前に', explain: '"寝る前に" = 寝る (dic.) + 前に. Forma completa ya dada.' },
          { answer: 'た', explain: '"映画を見た後で" = 見る → 見た + 後で.' },
          { answer: 'る', explain: '"日本に来る前に" = 来る (dic.) + 前に. Forma diccionario.' },
          { answer: 'た', explain: '"終わった後で" = 終わる → 終わった + 後で.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye la secuencia temporal',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa con 前に o 後で.',
        type: 'write',
        items: [
          {
            scene: 'Me cepillo los dientes antes de dormir.',
            prompt: '寝る + 前に + 歯を磨く',
            answer: '寝る前に、歯を磨きます。',
            accepted: ['毎晩寝る前に歯を磨きます。'],
            explain: '"寝る前に" = V dic. + 前に. Acción previa siempre en diccionario.',
          },
          {
            scene: 'Doy un paseo después de cenar.',
            prompt: '夕ご飯を食べる + 後で + 散歩する',
            answer: '夕ご飯を食べた後で、散歩します。',
            accepted: ['夜ご飯の後で散歩します。'],
            explain: '"食べた後で" = V-た + 後で. Acción completada antes de la segunda.',
          },
          {
            scene: 'Antes de viajar a Japón estudié japonés.',
            prompt: '日本に来る + 前に + 日本語を勉強した',
            answer: '日本に来る前に、日本語を勉強しました。',
            accepted: ['日本に行く前に日本語を勉強しました。'],
            explain: '"来る前に" = V dic. + 前に. El tiempo pasado está en el verbo principal (勉強しました).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe tu rutina con secuencias temporales',
        tag: 'Escritura libre',
        intro: 'Describe tu rutina diaria o semanal usando 前に y 後で.',
        type: 'write',
        items: [
          {
            scene: 'Describe tu rutina de la mañana usando 前に y 後で.',
            prompt: '朝のルーティンを前に/後でを使って書いてください。',
            answer: '起きた後で、まずシャワーを浴びます。シャワーの後で、朝ご飯を食べます。出かける前に、天気を確認します。',
            accepted: ['朝ご飯を食べる前に、ストレッチをします。食べた後で、歯を磨きます。'],
            explain: 'V-た + 後で para lo que ya se completó; V dic. + 前に para la acción previa.',
          },
          {
            scene: 'Describe qué hiciste antes y después de un evento importante.',
            prompt: '大切なイベントの前後にしたことを書いてください。',
            answer: 'テストを受ける前に、たくさん勉強しました。テストが終わった後で、友達と食事をしました。',
            accepted: ['旅行に行く前に、荷物をまとめました。旅行から帰った後で、写真を整理しました。'],
            explain: '前に con V dic. incluso en pasado; 後で con V-た siempre.',
          },
        ],
      },
    ],
  },
}

export default topic
