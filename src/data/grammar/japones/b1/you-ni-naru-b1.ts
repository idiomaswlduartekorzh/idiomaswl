import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'you-ni-naru-b1',
  order: '01',
  color: '#dc2626',
  category: 'Cambio de estado',
  level: 'B1',
  title: '〜ようになる — Llegar a hacer algo (Cambio gradual en japonés B1)',
  shortTitle: '〜ようになる (Llegar a)',
  metaTitle: '〜ようになる en japonés B1 — Expresar cambio gradual y habilidades adquiridas',
  description:
    'La estructura ようになる expresa un cambio gradual: algo que antes no ocurría ahora ocurre. Se usa con verbos en forma diccionario (para acciones que empezaron a hacerse) o con el potencial + ようになる (para habilidades que se adquirieron). Es la forma natural de narrar progreso y evolución en japonés.',
  lead: 'Aprende a expresar cambios graduales y habilidades recién adquiridas con ようになる: "llegué a poder hacer X" o "empecé a hacer X".',
  outcomes: [
    'Construir oraciones con ようになる usando la forma diccionario del verbo',
    'Distinguir ようになる (cambio) de ようにする (esfuerzo intencional)',
    'Usar el potencial + ようになる para hablar de habilidades adquiridas',
    'Narrar progreso de aprendizaje y cambios de hábitos con naturalidad',
  ],

  guide: {
    goal: 'Expresar que algo llegó a ocurrir gradualmente o que se adquirió una habilidad que antes no se tenía.',
    model: '毎日日本語を話すようになりました。(Maai nichi nihongo wo hanasu you ni narimashita.) — Llegué a hablar japonés todos los días.',
    formula: 'Verbo [forma diccionario / potencial / negativa] + ようになる',
    decisions: [
      'Cambio positivo (acción nueva): verbo diccionario + ようになった → 食べるようになった (empecé a comer)',
      'Habilidad adquirida: verbo potencial + ようになった → 話せるようになった (llegué a poder hablar)',
      'Cambio negativo (dejé de): verbo negativa + ようになった → 食べないようになった (dejé de comer)',
      'Forma presente: ようになる (el cambio aún ocurre o es reciente)',
      'Forma pasada: ようになった (el cambio ya se completó) — la más común en conversación',
      'No confundir con ようにする (hacer esfuerzo para que algo ocurra) — ese expresa intención activa',
    ],
    table: [
      ['Tipo de cambio', 'Estructura', 'Ejemplo'],
      ['Acción nueva', 'Diccionario + ようになった', '泳ぐようになった (empecé a nadar)'],
      ['Habilidad adquirida', 'Potencial + ようになった', '読めるようになった (llegué a poder leer)'],
      ['Hábito abandonado', 'Negativa + ようになった', '吸わないようになった (dejé de fumar)'],
      ['Estado en proceso', 'Diccionario + ようになる', '分かるようになる (voy a llegar a entender)'],
    ],
    mistakes: [
      '「話すようにした」(yō ni shita) ❌ para "llegué a hablar" — ese significa "hice un esfuerzo para hablar". Usa 話すようになった para el cambio natural.',
      '「話せるになった」❌ — nunca se omite ように. Siempre: 話せるようになった ✓.',
      '「子供の時、野菜を食べるようになりました」 ❌ si aún no hay cambio — ようになった implica que el cambio ya ocurrió y se mantiene.',
    ],
  },

  seo: [
    {
      heading: '¿Qué significa ようになる en japonés?',
      paragraphs: [
        'ようになる es una estructura del japonés B1 que expresa un cambio gradual en el tiempo. Literalmente podría traducirse como "llegar a ser de tal manera que..." y se usa para describir situaciones que ahora ocurren pero que antes no ocurrían.',
        'Es la estructura perfecta para hablar de progreso: "antes no podía leer kanji, ahora ya puedo" se dice 漢字が読めるようになりました (kanji ga yomeru yō ni narimashita). Esta construcción es muy frecuente en conversaciones sobre aprendizaje, salud, y cambios de vida.',
      ],
    },
    {
      heading: '¿Cómo se construye ようになる paso a paso?',
      paragraphs: [
        'La forma es sencilla: toma el verbo en forma diccionario (o potencial, o negativa) y añade ようになる. Para hablar del pasado usa ようになった o ようになりました (formal).',
        'Ejemplos con los tres tipos: 毎日走るようになった (empecé a correr todos los días) — forma diccionario. 日本語が話せるようになった (llegué a poder hablar japonés) — forma potencial. お酒を飲まないようになった (dejé de beber alcohol) — forma negativa.',
      ],
      table: [
        ['Forma del verbo', 'Significado del cambio', 'Ejemplo'],
        ['Diccionario + ようになった', 'Empecé a hacer X', '毎日歩くようになった'],
        ['Potencial + ようになった', 'Llegué a poder hacer X', '漢字が書けるようになった'],
        ['Negativa + ようになった', 'Dejé de hacer X', '肉を食べないようになった'],
      ],
    },
    {
      heading: '¿Cuál es la diferencia clave entre ようになる y ようにする?',
      paragraphs: [
        'ようになる describe un cambio que ocurre gradualmente, muchas veces sin un esfuerzo consciente específico. ようにする en cambio expresa la intención activa de hacer que algo ocurra: "me esfuerzo para que X pase".',
        '比较: 早く起きるようになった (llegué a levantarme temprano — cambio gradual) vs 早く起きるようにしている (me esfuerzo por levantarme temprano — intención activa). En el aprendizaje de idiomas, cuando describes tu progreso usarás ようになった; cuando describes tu disciplina actual usarás ようにしている.',
      ],
    },
    {
      heading: 'Usos naturales en conversación cotidiana',
      paragraphs: [
        'Esta estructura aparece constantemente cuando los japoneses hablan de cambios de vida: 結婚してから、料理するようになりました (desde que me casé empecé a cocinar), 子供が生まれて、よく眠れるようになりました (desde que nació mi hijo ya puedo dormir bien — ¡con ironía!).',
        'También es muy útil para hablar de aprendizaje de idiomas: 日本に来て半年で、日本語のニュースが分かるようになりました (después de medio año en Japón, llegué a entender las noticias en japonés). Este tipo de oración impresionará a nativos.',
      ],
    },
    {
      heading: 'Errores frecuentes de hispanohablantes',
      paragraphs: [
        'El error más común es confundir ようになる con ようにする. Otro error frecuente es omitir ように y decir solo なる: 「話せるになった」es incorrecto. La partícula ように es indispensable.',
        'También se confunde con だんだん + presente, que describe el proceso en curso. ようになった describe el resultado del proceso, no el proceso mismo. Usa ようになった cuando el cambio ya se consolidó.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Cambio gradual y adquisición de habilidades con ようになる. Enfatizar el contraste antes/después.',
    graphicPrompt: 'Línea de tiempo mostrando progreso: antes (×) → proceso → ahora (○) con ようになった.',
    scene: [
      ['日本語が話せるようになりました。(Nihongo ga hanaseru yō ni narimashita.)', 'Llegué a poder hablar japonés.'],
      ['毎日野菜を食べるようになりました。(Mainichi yasai wo taberu yō ni narimashita.)', 'Empecé a comer verduras todos los días.'],
      ['漢字が読めるようになった。(Kanji ga yomeru yō ni natta.)', 'Llegué a poder leer kanji.'],
      ['お酒を飲まないようになった。(Osake wo nomanai yō ni natta.)', 'Dejé de beber alcohol.'],
      ['早起きするようになりました。(Hayaoki suru yō ni narimashita.)', 'Empecé a madrugar.'],
      ['日本のドラマが分かるようになってきた。(Nihon no dorama ga wakaru yō ni natte kita.)', 'Poco a poco empecé a entender los dramas japoneses.'],
      ['一人で料理できるようになった。(Hitori de ryōri dekiru yō ni natta.)', 'Llegué a poder cocinar solo/a.'],
      ['難しい本が読めるようになりました。(Muzukashii hon ga yomeru yō ni narimashita.)', 'Llegué a poder leer libros difíciles.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['話す', '食べる', '読む', '書く', '泳ぐ', '走る', '起きる', '寝る'],
    reviewFocus: ['forma diccionario + ようになった', 'potencial + ようになった', 'negativa + ようになった', 'ようになる vs ようにする'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la opción correcta con ようになる para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Progreso en japonés',
            lines: [['', '日本語の新聞が___。(Llegué a poder leer el periódico japonés.)']],
            options: ['読めるようになった', '読めようになった', '読むようにした', '読めるになった'],
            answer: '読めるようになった',
            explain: 'Habilidad adquirida: forma potencial (読める) + ようになった. Nunca se omite ように.',
          },
          {
            scene: 'Cambio de hábito',
            lines: [['', '結婚してから、毎日料理___。(Desde que me casé empecé a cocinar todos los días.)']],
            options: ['するようになった', 'するようにした', 'するようになる', 'したようになった'],
            answer: 'するようになった',
            explain: 'Cambio gradual ya consolidado: forma diccionario (する) + ようになった. ようにした expresaría esfuerzo intencional.',
          },
          {
            scene: 'Hábito abandonado',
            lines: [['', '体の調子が悪くなって、お酒を___。(Debido a mi salud, dejé de beber alcohol.)']],
            options: ['飲まないようになった', '飲まないようにした', '飲むようになった', '飲めないようにした'],
            answer: '飲まないようになった',
            explain: 'Cambio negativo (dejar de): forma negativa (飲まない) + ようになった.',
          },
          {
            scene: 'Habilidad nueva',
            lines: [['', '練習して、ひらがなが___。(Con práctica llegué a poder escribir hiragana.)']],
            options: ['書けるようになった', '書けようになった', '書けるになった', '書くようになった'],
            answer: '書けるようになった',
            explain: 'Habilidad adquirida: 書ける (potencial de 書く) + ようになった.',
          },
          {
            scene: 'Cambio de preferencia',
            lines: [['', '日本に来てから、納豆を___。(Desde que vine a Japón empecé a comer nattō.)']],
            options: ['食べるようになった', '食べるようにした', '食べられるようになった', '食べたようになった'],
            answer: '食べるようになった',
            explain: 'Cambio de hábito/preferencia: forma diccionario (食べる) + ようになった.',
          },
          {
            scene: 'Progreso de estudio',
            lines: [['', '半年勉強して、日本語で___。(Tras medio año de estudio, llegué a poder pensar en japonés.)']],
            options: ['考えられるようになった', '考えるようになった', '考えるようにした', '考えられるになった'],
            answer: '考えられるようになった',
            explain: '考えられる es el potencial de 考える. Para habilidades cognitivas, el potencial + ようになった es lo más natural.',
          },
          {
            scene: 'Cambio de rutina',
            lines: [['', '健康のために、毎朝6時に___。(Por salud, empecé a levantarme a las 6 cada mañana.)']],
            options: ['起きるようになった', '起きるようにした', '起きられるようになった', '起きたようになった'],
            answer: '起きるようになった',
            explain: 'Cambio de rutina ya consolidado: 起きる + ようになった. (ようにした indicaría que sigo intentándolo.)',
          },
          {
            scene: 'Habilidad musical',
            lines: [['', '3年練習して、ピアノが___。(Con 3 años de práctica llegué a poder tocar el piano.)']],
            options: ['弾けるようになった', '弾くようになった', '弾けるようにした', '弾けるになった'],
            answer: '弾けるようになった',
            explain: '弾ける (potencial de 弾く "tocar instrumento") + ようになった para habilidades.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Antes y ahora',
        tag: '2 espacios',
        intro: 'Completa con la forma ようになった correcta en cada hueco.',
        type: 'dual',
        items: [
          {
            scene: 'Progreso en el idioma',
            lines: [['', '日本語を勉強して1年で、漢字が[[0]]、日本人と[[1]]。']],
            blanks: [
              { options: ['読めるようになった', '読めるになった', '読むようになった', '読めるようにした'], answer: '読めるようになった', explain: 'Habilidad adquirida: 読める (potencial) + ようになった.' },
              { options: ['話せるようになった', '話すようになった', '話せるになった', '話すようにした'], answer: '話せるようになった', explain: '話せる (potencial de 話す) + ようになった para habilidad comunicativa.' },
            ],
          },
          {
            scene: 'Cambio de estilo de vida',
            lines: [['', '医者に言われて、タバコを[[0]]、野菜を[[1]]。']],
            blanks: [
              { options: ['吸わないようになった', '吸わないようにした', '吸うようになった', '吸えないようになった'], answer: '吸わないようになった', explain: 'Dejar de fumar (cambio negativo consolidado): 吸わない + ようになった.' },
              { options: ['食べるようになった', '食べるようにした', '食べられるようになった', '食べるになった'], answer: '食べるようになった', explain: 'Nuevo hábito: 食べる + ようになった.' },
            ],
          },
          {
            scene: 'Infancia vs adultez',
            lines: [['', '子供の頃は嫌いだったが、大人になって魚が[[0]]、料理も[[1]]。']],
            blanks: [
              { options: ['食べられるようになった', '食べるようになった', '食べられるようにした', '食べられるになった'], answer: '食べられるようになった', explain: '食べられる (potencial de 食べる, grupo 2) + ようになった.' },
              { options: ['できるようになった', 'するようになった', 'できるようにした', 'できるになった'], answer: 'できるようになった', explain: 'できる es ya una forma potencial de する, así que se usa directamente + ようになった.' },
            ],
          },
          {
            scene: 'Aprendizaje con tecnología',
            lines: [['', 'アプリで勉強して、韓国語が[[0]]、中国語も少し[[1]]。']],
            blanks: [
              { options: ['聞けるようになった', '聞くようになった', '聞けるようにした', '聞けるになった'], answer: '聞けるようになった', explain: '聞ける (potencial de 聞く) + ようになった para comprensión auditiva.' },
              { options: ['読めるようになった', '読むようになった', '読めるようにした', '読めるになった'], answer: '読めるようになった', explain: '読める (potencial de 読む) + ようになった.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Carta de progreso',
        tag: 'Texto guiado',
        intro: 'Completa esta carta de un estudiante de japonés usando ようになった correctamente.',
        type: 'guidedText',
        scene: 'Un estudiante escribe a su profesor sobre su progreso en japonés.',
        text: '先生へ、日本語を勉強し始めて2年が経ちました。最初はひらがなも[[0]]、日本語のドラマも[[1]]。でも毎日練習して、今はニュースが[[2]]、外国人の友達と[[3]]。先月は日本語で手紙も[[4]]。仕事でも少し日本語を使う[[5]]、先生のおかげです。来年は日本に[[6]]と思っています。',
        blanks: [
          { options: ['書けなかった', '書けるようになった', '書かないようになった', '書けないようになった'], answer: '書けなかった', explain: 'Contexto de pasado negativo: "no podía escribir". Aquí no hay ようになった porque describe el estado inicial.' },
          { options: ['分からなかった', '分かるようになった', '分からないようになった', '分かるようにした'], answer: '分からなかった', explain: 'Estado inicial negativo: "no entendía". El ようになった vendrá después para contrastar.' },
          { options: ['分かるようになった', '分かるようにした', '分かるになった', '分かれるようになった'], answer: '分かるようになった', explain: 'Cambio: ahora entiende las noticias. 分かる + ようになった.' },
          { options: ['話せるようになった', '話すようになった', '話せるようにした', '話せるになった'], answer: '話せるようになった', explain: 'Habilidad adquirida: 話せる (potencial) + ようになった.' },
          { options: ['書けるようになった', '書くようになった', '書けるようにした', '書けるになった'], answer: '書けるようになった', explain: 'Logro concreto: llegó a poder escribir cartas en japonés.' },
          { options: ['使えるようになった', '使うようになった', '使えるようにした', '使えるになった'], answer: '使えるようになった', explain: '使える (potencial de 使う) + ようになった para uso laboral del japonés.' },
          { options: ['行けるようになりたい', '行くようになりたい', '行けるようにしたい', '行きたいようになった'], answer: '行けるようになりたい', explain: '行ける (potencial) + ようになりたい — querer llegar a poder ir. Forma de deseo futuro.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de ようになった o ようにする según el contexto.',
        type: 'freeText',
        scene: 'Escribe las palabras que faltan para completar las oraciones sobre cambios.',
        text: '日本に来る前、私はほとんど日本語が[[0]]。しかし毎日練習して、今は日常会話が[[1]]。健康のために、最近は毎日歩く[[2]]。以前はよくお菓子を食べていたが、今は食べない[[3]]。来年はもっと難しい漢字が読める[[4]]。',
        blanks: [
          { answer: '話せなかった', accepted: ['話せなかった', '分からなかった', '話せませんでした'], explain: 'Estado inicial antes del cambio: "no podía hablar". Pasado negativo simple.' },
          { answer: '話せるようになった', accepted: ['話せるようになった', '話せるようになりました', '分かるようになった'], explain: 'Habilidad adquirida: forma potencial + ようになった.' },
          { answer: 'ようになった', accepted: ['ようになった', 'ようになりました'], explain: '毎日歩く + ようになった = empecé a caminar todos los días. Cambio de hábito.' },
          { answer: 'ようになった', accepted: ['ようになった', 'ようになりました'], explain: '食べない (negativa) + ようになった = dejé de comer dulces. Cambio negativo consolidado.' },
          { answer: 'ようになりたい', accepted: ['ようになりたい', 'ようになりたいです'], explain: 'Deseo de cambio futuro: ようになりたい = quiero llegar a poder...' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción con ようになった',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando ようになった sobre cambios reales o imaginarios.',
        type: 'write',
        items: [
          {
            scene: 'Tu progreso en japonés',
            prompt: 'Escribe una oración sobre algo que llegaste a poder hacer en japonés (usa 〜ようになった).',
            answer: '日本語でメールが書けるようになった。',
            accepted: ['ようになった', 'ようになりました'],
            explain: 'Ejemplo: ひらがなが書けるようになった。/ 日本語の歌が歌えるようになった。',
          },
          {
            scene: 'Cambio de hábito',
            prompt: 'Describe un hábito nuevo que adquiriste (usa verbo diccionario + ようになった).',
            answer: '毎朝コーヒーを飲むようになった。',
            accepted: ['ようになった', 'ようになりました'],
            explain: 'Ejemplo: 毎日運動するようになった。/ 早く寝るようになった。',
          },
          {
            scene: 'Algo que dejaste',
            prompt: 'Describe algo que dejaste de hacer (usa verbo negativo + ようになった).',
            answer: 'テレビをあまり見ないようになった。',
            accepted: ['ないようになった', 'なくなった'],
            explain: 'Ejemplo: 肉を食べないようになった。/ 夜更かしをしないようになった。',
          },
          {
            scene: 'Habilidad recién adquirida',
            prompt: 'Escribe sobre una habilidad que adquiriste con práctica (usa potencial + ようになった).',
            answer: '自転車に乗れるようになった。',
            accepted: ['ようになった', 'ようになりました'],
            explain: 'Ejemplo: ピアノが弾けるようになった。/ 速く泳げるようになった。',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu progreso personal',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones sobre cambios en tu vida usando ようになった.',
        type: 'write',
        items: [
          {
            scene: 'Habilidad nueva',
            prompt: 'Escribe algo que llegaste a poder hacer que antes no podías (habilidad, idioma, deporte, etc.).',
            answer: '日本語で自己紹介ができるようになった。',
            accepted: ['ようになった', 'ようになりました', 'できるようになった'],
            explain: 'Usa el potencial + ようになった para habilidades: 〜できるようになった, 〜話せるようになった, 〜弾けるようになった.',
          },
          {
            scene: 'Cambio de hábito positivo',
            prompt: 'Escribe un nuevo hábito saludable o productivo que adoptaste.',
            answer: '毎朝30分ジョギングするようになった。',
            accepted: ['ようになった', 'ようになりました'],
            explain: 'Usa forma diccionario + ようになった: 〜するようになった, 〜食べるようになった, 〜起きるようになった.',
          },
          {
            scene: 'Algo que dejaste de hacer',
            prompt: 'Escribe sobre algo que dejaste de hacer (usa negativa + ようになった).',
            answer: 'コーラをあまり飲まないようになった。',
            accepted: ['ないようになった', 'なくなった', 'やめるようになった'],
            explain: 'Usa negativa + ようになった: 〜しないようになった, 〜食べないようになった. O なくなった (dejó de existir el hábito).',
          },
        ],
      },
    ],
  },
}

export default topic
