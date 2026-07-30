import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'ta-koto-ga-aru-a2',
  order: '03',
  color: '#dc2626',
  category: 'Verbos',
  level: 'A2',
  title: '〜たことがある en japonés A2 — Experiencia pasada',
  shortTitle: '〜たことがある',
  metaTitle: 'ta koto ga aru japones A2 — experiencia pasada',
  description:
    '〜たことがあります (ta koto ga arimasu) expresa experiencias pasadas en japones A2: si alguna vez has hecho algo en tu vida. Equivale al "he + participio" del espanol pero enfocado en la experiencia vital, no en el tiempo reciente.',
  lead: '〜たことがあります: 日本に行ったことがあります (Nihon ni itta koto ga arimasu) = He ido a Japon / He estado en Japon. 寿司を食べたことがありますか？ (¿Has comido sushi alguna vez?)',
  outcomes: [
    'Forma 〜たことがあります con verbos de accion para experiencias pasadas',
    'Niega con 〜たことがありません para "nunca he..."',
    'Formula preguntas de experiencia con 〜たことがありますか？',
  ],

  guide: {
    goal: 'Usar 〜たことがある para hablar de experiencias pasadas en la vida.',
    model: '日本料理を食べたことがあります。(Nihon ryouri wo tabeta koto ga arimasu.) = He comido comida japonesa. 富士山に登ったことがありません。= Nunca he subido al monte Fuji.',
    formula: '[Verbo en forma た (pasado)] + ことがあります / ことがありません',
    decisions: [
      'Forma た de verbos Grupo 2: elimina る y agrega た (食べる→食べた, 見る→見た)',
      'Forma た de verbos Grupo 1: mismas reglas que te-form pero con た (書く→書いた, 飲む→飲んだ, 行く→行った)',
      'Irregulares: する→した, くる→きた',
      'Afirmativo: 〜たことがあります (tengo la experiencia)',
      'Negativo: 〜たことがありません (no tengo esa experiencia / nunca he...)',
      'Pregunta: 〜たことがありますか？(¿Has...alguna vez?)',
      'Respuesta corta: はい、あります / いいえ、ありません',
    ],
    table: [
      ['Forma', 'Ejemplo japones', 'Traduccion'],
      ['Afirmativo', '寿司を食べたことがあります', 'He comido sushi'],
      ['Negativo', '雪を見たことがありません', 'Nunca he visto nieve'],
      ['Pregunta', 'ハングルを勉強したことがありますか？', '¿Has estudiado hangul?'],
      ['Respuesta', 'はい、あります / いいえ、ありません', 'Si, lo he hecho / No, nunca'],
    ],
    mistakes: [
      'No confundir con el pasado simple (〜ました = hice): 食べたことがある es experiencia vital, 食べました es "comi" en momento especifico.',
      'La forma た es la base: usa la misma regla que te-form pero con た en lugar de て.',
      'No agregar tiempo especifico: NO decir 昨日食べたことがある. Esa construccion es para experiencias indeterminadas en el tiempo.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se habla de experiencias de vida con 〜たことがある?',
      paragraphs: [
        '〜たことがあります es la forma de expresar experiencias pasadas en japones A2. Si alguna vez has hecho algo —sin importar cuando exactamente— usas esta construccion: 日本に行ったことがあります (He estado en Japon), 富士山に登ったことがあります (He subido al monte Fuji).',
        'Para negar, simplemente reemplaza あります por ありません: 生ものを食べたことがありません = Nunca he comido comida cruda. Para preguntar: 〜たことがありますか？= ¿Has...alguna vez? La respuesta corta es はい、あります o いいえ、ありません.',
      ],
    },
    {
      heading: '¿Qué diferencia hay entre 〜たことがある y el pasado simple?',
      paragraphs: [
        'En japones, el pasado simple (〜ました) indica que hiciste algo en un momento especifico: 昨日寿司を食べました = Ayer comi sushi. En cambio, 〜たことがあります habla de si la experiencia existe en tu vida o no: 寿司を食べたことがあります = He comido sushi (alguna vez en mi vida).',
        'No mezcles 〜たことがある con referencias temporales especificas como 昨日 o 去年. Esta construccion es para experiencias sin fecha fija.',
      ],
    },
    {
      heading: '¿Por qué no se puede usar 〜たことがある para "ayer fui"?',
      paragraphs: [
        '〜たことがある expresa la experiencia de haber hecho algo alguna vez en la vida, no un hecho concreto y datado. Se forma con el verbo en forma た + ことがある: 日本に行ったことがあります (he estado en Japón alguna vez). Por eso NO sirve para acciones con fecha o frecuencia reciente: "ayer fui a Japón" es 昨日日本に行きました (pasado simple), nunca 昨日日本に行ったことがあります. La regla práctica: si hay una marca temporal concreta (ayer, la semana pasada, a las 3), se usa el pasado simple ました; si se habla de experiencia acumulada ("¿alguna vez has...?"), se usa たことがある. En negativo, 食べたことがありません = nunca he comido (eso). La trampa para el hispanohablante es usarlo como un pasado normal.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende a hablar de experiencias pasadas usando la forma た + ことがあります.',
    graphicPrompt: 'Linea de tiempo con experiencias vitales marcadas: viajes, comidas nuevas, actividades nuevas.',
    scene: [
      ['食べたことがあります (tabeta koto ga arimasu)', 'He comido (alguna vez)'],
      ['行ったことがあります (itta koto ga arimasu)', 'He ido (alguna vez)'],
      ['見たことがありません (mita koto ga arimasen)', 'Nunca he visto'],
      ['したことがありますか？(shita koto ga arimasu ka?)', '¿Has hecho...?'],
    ],
    learnerModes: [
      'conversacional: preguntas de experiencia entre companeros',
      'analitico: tabla de verbos en forma た',
      'oral: describir experiencias de viaje',
    ],
    reviewFocus: [
      'Forma た del verbo',
      'Afirmativo: ことがあります',
      'Negativo: ことがありません',
      'Pregunta: ことがありますか？',
    ],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Experiencia pasada correcta',
        tag: 'Opcion multiple',
        intro: 'Elige la forma correcta de 〜たことがあります para cada situacion.',
        type: 'choice',
        items: [
          {
            scene: 'Experiencia con sushi',
            lines: [['Carlos', '寿司を___ (he comido sushi)']],
            options: ['食べたことがあります', '食べることがあります', '食べたことがありません', '食べます'],
            answer: '食べたことがあります',
            explain: '食べる (Gr.2): 食べ + た = 食べた → 食べたことがあります. Experiencia positiva.',
          },
          {
            scene: 'Nunca he visto nieve',
            lines: [['Sofia', '雪を___。(nunca he visto nieve)']],
            options: ['見たことがありません', '見たことがあります', '見ません', '見ませんでした'],
            answer: '見たことがありません',
            explain: '見る (Gr.2): 見た → 見たことがありません. Negacion de experiencia.',
          },
          {
            scene: 'Pregunta de experiencia',
            lines: [['Iván', '日本に___か？(¿Has estado en Japon?)']],
            options: ['行ったことがありますか', '行くことがありますか', '行きましたか', '行ったことがありませんか'],
            answer: '行ったことがありますか',
            explain: '行く (Gr.1, irregular て): 行った → 行ったことがありますか？Pregunta de experiencia.',
          },
          {
            scene: 'He montado en bicicleta',
            lines: [['Ana', '自転車に___ (he montado en bici)']],
            options: ['乗ったことがあります', '乗ることがあります', '乗りました', '乗ったことがありません'],
            answer: '乗ったことがあります',
            explain: '乗る (noru, Gr.1): る→った. 乗った → 乗ったことがあります.',
          },
          {
            scene: 'Nunca he cantado en karaoke',
            lines: [['Marco', 'カラオケで___。(nunca he cantado en karaoke)']],
            options: ['歌ったことがありません', '歌ったことがあります', '歌いません', '歌いました'],
            answer: '歌ったことがありません',
            explain: '歌う (utau, Gr.1): う→った. 歌った → 歌ったことがありません.',
          },
          {
            scene: 'He hecho sushi',
            lines: [['Lina', '寿司を作った___。(he hecho sushi)']],
            options: ['ことがあります', 'ことがありません', 'ことがありますか', 'ことです'],
            answer: 'ことがあります',
            explain: '作る (Gr.1): 作った + ことがあります. La forma た ya esta dada.',
          },
          {
            scene: 'Respuesta negativa',
            lines: [['Dario', '富士山に登ったことがありますか？— いいえ、___。']],
            options: ['ありません', 'あります', 'ありませんでした', 'ないです'],
            answer: 'ありません',
            explain: 'Respuesta corta negativa: いいえ、ありません = No, nunca lo he hecho.',
          },
          {
            scene: 'Experiencia con idiomas',
            lines: [['Alba', '韓国語を___か？(¿Has estudiado coreano?)']],
            options: ['勉強したことがありますか', '勉強することがありますか', '勉強しましたか', '勉強したことがありませんか'],
            answer: '勉強したことがありますか',
            explain: 'する→した → 勉強したことがありますか？Pregunta de experiencia de estudio.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dialogo de experiencias',
        tag: '2 espacios',
        intro: 'Completa los dos espacios sobre experiencias pasadas.',
        type: 'dual',
        items: [
          {
            scene: 'Conversacion sobre viajes',
            lines: [['Iván', 'タイに[[0]]か？'], ['Carlos', 'はい、去年[[1]]。とても楽しかったです。']],
            blanks: [
              { options: ['行ったことがありますか', '行きますか', '行ったことがありませんか'], answer: '行ったことがありますか', explain: '行く→行った → 行ったことがありますか？Pregunta de experiencia de viaje.' },
              { options: ['行ったことがあります', '行きました', '行ったことがありません'], answer: '行ったことがあります', explain: '行った + ことがあります. Afirma la experiencia de haber ido.' },
            ],
          },
          {
            scene: 'Sobre comida exotica',
            lines: [['Sofia', 'タコスを[[0]]か？'], ['Ana', 'いいえ、まだ[[1]]。']],
            blanks: [
              { options: ['食べたことがありますか', '食べますか', '食べたことがありませんか'], answer: '食べたことがありますか', explain: '食べる→食べた → 食べたことがありますか？' },
              { options: ['食べたことがありません', '食べません', '食べたことがあります'], answer: '食べたことがありません', explain: '食べた + ことがありません. Niega la experiencia (aun no).' },
            ],
          },
          {
            scene: 'Sobre actividades',
            lines: [['Marco', 'スキーを[[0]]か？'], ['Lina', 'はい、北海道で[[1]]よ。']],
            blanks: [
              { options: ['したことがありますか', 'しますか', 'したことがありませんか'], answer: 'したことがありますか', explain: 'する→した → したことがありますか？Pregunta de experiencia.' },
              { options: ['したことがあります', 'しました', 'したことがありません'], answer: 'したことがあります', explain: 'した + ことがあります. En Hokkaido lo ha hecho.' },
            ],
          },
          {
            scene: 'Sobre el idioma japones',
            lines: [['Alba', '日本語の試験を[[0]]か？'], ['Dario', 'いいえ、一度も[[1]]。']],
            blanks: [
              { options: ['受けたことがありますか', '受けますか', '受けましたか'], answer: '受けたことがありますか', explain: '受ける (ukeru, Gr.2): 受けた → 受けたことがありますか？' },
              { options: ['受けたことがありません', '受けません', '受けませんでした'], answer: '受けたことがありません', explain: '受けた + ことがありません. 一度も = ni una sola vez.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Parrafo de experiencias de viaje',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta en cada espacio de este texto sobre experiencias.',
        type: 'guidedText',
        scene: 'Carlos habla de sus experiencias en Asia',
        text: '私はアジアを旅行したことが[[0]]。日本料理を[[1]]し、お茶を[[2]]ことがあります。まだ韓国には[[3]]が、いつか行きたいです。日本語を少し[[4]]ことがあります。',
        blanks: [
          { options: ['あります', 'ありません', 'ありますか'], answer: 'あります', explain: '旅行した + ことがあります → ことが + あります. Ha viajado por Asia.' },
          { options: ['食べたことがあります', '食べます', '食べました'], answer: '食べたことがあります', explain: '食べた + ことがあります. Ha comido comida japonesa.' },
          { options: ['飲んだ', '飲みました', '飲みます'], answer: '飲んだ', explain: '飲む (Gr.1): む→んだ. 飲んだことがあります → 飲んだ + ことがあります.' },
          { options: ['行ったことがありません', '行ったことがあります', '行きません'], answer: '行ったことがありません', explain: '行く→行った + ことがありません. Nunca ha ido a Corea.' },
          { options: ['勉強した', '勉強します', '勉強しました'], answer: '勉強した', explain: 'する→した. 勉強したことがあります → 勉強した + ことがあります.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta usando 〜たことがあります.',
        type: 'freeText',
        scene: 'Sofia responde preguntas sobre sus experiencias',
        text: '富士山に[[0]] (登る)ことがあります。京都のお寺を[[1]] (見る)ことがあります。でも、北海道には[[2]] (行く)ことがありません。温泉に[[3]] (入る)ことがあります。生のたこを[[4]] (食べる)ことがありません。',
        blanks: [
          { answer: '登った', explain: '登る (noboru, Gr.1): る→った. 登った + ことがあります.' },
          { answer: '見た', explain: '見る (Gr.2): 見 + た = 見た. 見たことがあります.' },
          { answer: '行った', explain: '行く (Gr.1): く→った (irregular: 行った). 行ったことがありません.' },
          { answer: '入った', explain: '入る (hairu, Gr.1): る→った. 入った + ことがあります.' },
          { answer: '食べた', explain: '食べる (Gr.2): 食べ + た = 食べた. 食べたことがありません.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Escribe sobre experiencias',
        tag: 'Escritura guiada',
        intro: 'Escribe la oracion completa de experiencia pasada.',
        type: 'write',
        items: [
          {
            scene: 'He visto una pelicula japonesa',
            prompt: 'Escribe: He visto una pelicula japonesa → 日本映画を___ (見る)',
            answer: '日本映画を見たことがあります。',
            accepted: ['日本映画を見たことがあります', '日本の映画を見たことがあります'],
            explain: '見る (Gr.2): 見た + ことがあります = 見たことがあります.',
          },
          {
            scene: 'Nunca he comido kimchi',
            prompt: 'Escribe: Nunca he comido kimchi → キムチを___ (食べる)',
            answer: 'キムチを食べたことがありません。',
            accepted: ['キムチを食べたことがありません', 'キムチをたべたことがありません'],
            explain: '食べる (Gr.2): 食べた + ことがありません = 食べたことがありません.',
          },
          {
            scene: 'Pregunta: ¿Has estado en Brasil?',
            prompt: 'Escribe la pregunta: ¿Has estado en Brasil? → ブラジルに___ (行く)',
            answer: 'ブラジルに行ったことがありますか？',
            accepted: ['ブラジルに行ったことがありますか', 'ブラジルに行ったことがありますか？'],
            explain: '行く→行った + ことがありますか？Pregunta de experiencia.',
          },
          {
            scene: 'He hecho yoga',
            prompt: 'Escribe: He hecho yoga → ヨガを___ (する)',
            answer: 'ヨガをしたことがあります。',
            accepted: ['ヨガをしたことがあります', 'ヨガを したことがあります'],
            explain: 'する→した + ことがあります = したことがあります.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Mision final',
        tag: 'Escritura libre',
        intro: 'Escribe sobre tus propias experiencias usando 〜たことがあります.',
        type: 'write',
        items: [
          {
            scene: 'Tu experiencia con idiomas',
            prompt: '___語を勉強したことが___。 (¿Has estudiado algun idioma?)',
            answer: '日本語を勉強したことがあります。',
            accepted: ['勉強したことがあります', '勉強したことがありません'],
            explain: 'Usa el nombre de tu idioma + 勉強したことがあります/ありません.',
          },
          {
            scene: 'Un lugar que has visitado o no',
            prompt: '___に行ったことが___。 (un lugar que hayas o no hayas visitado)',
            answer: '日本に行ったことがあります。',
            accepted: ['行ったことがあります', '行ったことがありません'],
            explain: '行く→行った + ことがあります/ありません. Habla de un viaje real o deseado.',
          },
          {
            scene: 'Una comida que nunca has probado',
            prompt: 'まだ___を食べたことがありません。(una comida que nunca has probado)',
            answer: 'まだたこ焼きを食べたことがありません。',
            accepted: ['食べたことがありません'],
            explain: 'まだ (todavia) + 〜たことがありません refuerza el sentido de "aun no".',
          },
        ],
      },
    ],
  },
}

export default topic
