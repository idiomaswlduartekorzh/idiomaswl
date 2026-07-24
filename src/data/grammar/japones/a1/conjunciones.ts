import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'conjunciones',
  order: '20',
  color: '#dc2626',
  category: '文法',
  level: 'A1',
  title: 'Conjunciones y conectores básicos en japonés A1',
  shortTitle: 'Conjunciones',
  metaTitle: 'Conjunciones japonés A1 — でも、そして、だから、それから、でも',
  description:
    'Las conjunciones y conectores del japonés conectan oraciones y expresan relaciones de contraste, adición, causa y secuencia. でも (pero), そして (y además/y luego), だから (por eso), それから (y después/además). Son esenciales para pasar de frases sueltas a discurso conectado.',
  lead: 'でも (pero), そして (y), だから (por eso), それから (y después) — con estos conectores empiezas a hablar japonés de forma natural, conectando ideas en lugar de decirlas sueltas.',
  outcomes: [
    'Usar でも para contrastar ideas (pero)',
    'Conectar acciones con そして y それから (y, y después)',
    'Expresar causa-efecto con だから (por eso/entonces)',
  ],
  guide: {
    goal: 'Conectar oraciones simples para expresar relaciones lógicas entre ideas.',
    model: '[Oración 1] + [conector] + [Oración 2]',
    formula: 'でも = pero | そして = y/además | だから = por eso | それから = y después',
    decisions: [
      '¿Contradicción o contraste? → でも (Japonés は難しいです。でも、おもしろいです — Es difícil. Pero es interesante.)',
      '¿Adición de información similar? → そして (Panamá は きれい です。そして、たのしい です — Panamá es bonito. Y además es divertido.)',
      '¿Secuencia temporal? → それから (朝ごはんを食べます。それから、学校へ行きます — Como desayuno. Y después voy a la escuela.)',
      '¿Causa → consecuencia? → だから (日本語が好きです。だから、毎日勉強します — Me gusta japonés. Por eso, estudio cada día.)',
    ],
    table: [
      ['Conector', 'Equivalente español', 'Posición'],
      ['でも (demo)', 'pero / sin embargo', 'Inicio de oración 2: ...です。でも、...'],
      ['そして (soshite)', 'y / y además', 'Inicio de oración 2: ...です。そして、...'],
      ['それから (sorekara)', 'y después / y luego', 'Inicio de oración 2: ...ます。それから、...'],
      ['だから (dakara)', 'por eso / entonces', 'Inicio de oración 2: ...です。だから、...'],
    ],
    mistakes: [
      'Todos los conectores van al INICIO de la segunda oración, no en el medio: ...です。でも、... — nunca al final.',
      'でも NO es lo mismo que が (partícula de contraste suave). でも es más enfático y va entre frases separadas.',
      'それから implica secuencia temporal (primero X, después Y). そして no requiere secuencia temporal.',
      'だから requiere que la primera oración sea la CAUSA. No usar para contraste (ese es でも).',
    ],
  },
  seo: [
    {
      heading: '¿Cómo conectar frases en japonés A1?',
      paragraphs: [
        'En japonés A1, los conectores van siempre al inicio de la segunda oración, separados de la primera por un punto. Esta estructura es diferente del español donde los conectores pueden ir en medio de la oración: en japonés siempre tienes dos oraciones con el conector al inicio de la segunda.',
        'Los cuatro conectores esenciales en A1 cubren los cuatro tipos de relación más frecuentes: でも (contraste), そして (adición), それから (secuencia), y だから (causa). Con estos cuatro puedes construir discurso coherente básico.',
      ],
      table: [
        ['Relación', 'Conector', 'Ejemplo'],
        ['Contraste', 'でも (pero)', '難しいです。でも、おもしろい。(Es difícil. Pero interesante.)'],
        ['Adición', 'そして (y/además)', 'きれいです。そして、やさしい。(Es bonito. Y amable.)'],
        ['Secuencia', 'それから (y después)', '食べます。それから、寝ます。(Como. Y después duermo.)'],
        ['Causa', 'だから (por eso)', '好きです。だから、勉強します。(Me gusta. Por eso estudio.)'],
      ],
    },
    {
      heading: 'でも vs が: dos formas de decir "pero" en japonés',
      paragraphs: [
        'El japonés tiene dos formas principales de expresar "pero": でも (demo) y が (ga). La diferencia es sutileza y posición. でも va al inicio de una nueva oración (パンが好きです。でも、ごはんも好きです). が va dentro de la misma oración uniendo dos cláusulas (パンが好きですが、ごはんも好きです).',
        'Para A1, aprender でも es más fácil porque solo necesitas poner un punto y empezar la nueva frase. が es más avanzado. Con でも dominas el contraste básico.',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'Japanese conjunctions always start the second sentence (after a period), never appear mid-sentence at A1 level. This is the main structural difference from Spanish. Drill the pattern: S1。Conj、S2。',
    graphicPrompt:
      'Four connector bubbles: でも (contrast arrow), そして (plus sign), それから (clock/time arrow), だから (cause→effect arrow). Japanese red/white theme with hiragana for each connector.',
    scene: [
      ['でも', '日本語は難しいです。でも、おもしろいです。 — Es difícil. Pero es interesante.'],
      ['そして', 'Ivánはやさしいです。そして、じょうずです。 — Iván es amable. Y además es hábil.'],
      ['それから', '朝ごはんを食べます。それから、学校に行きます。 — Como desayuno. Y después voy a la escuela.'],
      ['だから', '日本語が好きです。だから、毎日勉強します。 — Me gusta japonés. Por eso estudio cada día.'],
      ['でも (neg)', 'ねこが好きです。でも、いぬはちょっと... — Me gustan los gatos. Pero los perros...'],
      ['そして (lista)', 'りんごがあります。そして、みかんもあります。 — Hay manzanas. Y también hay mandarinas.'],
    ],
    learnerModes: ['recognition', 'transformation', 'gap-fill', 'production'],
    practiceVerbs: ['です', 'ます', 'があります', 'が好きです'],
    reviewFocus: ['でも (contraste)', 'そして vs それから (adición vs secuencia)', 'だから (causa)'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: '接続詞 認識',
        tag: 'Opción múltiple',
        intro: 'Identifica el conector correcto.',
        type: 'choice',
        items: [
          { scene: 'でも — contraste', lines: [['', '"El japonés es difícil. ____ es interesante." ¿Qué conector?']], options: ['そして', 'だから', 'でも', 'それから'], answer: 'でも', explain: 'でも = pero. Contraste entre difícil e interesante. 難しいです。でも、おもしろいです。' },
          { scene: 'だから — causa', lines: [['', '"Me gusta el japonés. ____ lo estudio cada día." ¿Qué conector?']], options: ['でも', 'それから', 'そして', 'だから'], answer: 'だから', explain: 'だから = por eso / entonces. Causa (me gusta) → consecuencia (lo estudio). 好きです。だから、勉強します。' },
          { scene: 'それから — secuencia', lines: [['', '"Como desayuno. ____ voy a la escuela." ¿Qué conector?']], options: ['でも', 'だから', 'そして', 'それから'], answer: 'それから', explain: 'それから = y después / y luego. Secuencia temporal: primero come, después va. 食べます。それから、行きます。' },
          { scene: 'そして — adición', lines: [['', '"Iván es amable. ____ es muy hábil." ¿Qué conector?']], options: ['でも', 'だから', 'それから', 'そして'], answer: 'そして', explain: 'そして = y / y además. Adición de cualidades positivas similares. やさしいです。そして、じょうずです。' },
          { scene: 'Posición del conector', lines: [['', '¿Cuál es el orden correcto en japonés?']], options: ['日本語はでもむずかしいです', '日本語はむずかしいです。でも、おもしろいです。', 'でも日本語むずかしいです', 'むずかしいでもです'], answer: '日本語はむずかしいです。でも、おもしろいです。', explain: 'Conector al INICIO de la segunda oración. Primero frase 1 completa con 。, luego でも、 y frase 2.' },
          { scene: 'だから vs でも', lines: [['', '"Tengo hambre. ____ como ramen." (hambre → como: causa-efecto)']], options: ['でも', 'それから', 'そして', 'だから'], answer: 'だから', explain: 'だから = por eso (causa → efecto). お腹がすいています。だから、ラーメンを食べます。' },
          { scene: 'そして vs それから', lines: [['', '¿Cuál implica SECUENCIA TEMPORAL?']], options: ['そして', 'でも', 'それから', 'だから'], answer: 'それから', explain: 'それから implica secuencia temporal (primero X, DESPUÉS Y). そして puede ser adición sin orden temporal.' },
          { scene: 'Frase completa', lines: [['', '"Hay café. Y también hay té." ¿Cuál es correcta?']], options: ['コーヒーがあります。でも、おちゃもあります。', 'コーヒーがあります。そして、おちゃもあります。', 'コーヒーがあります。だから、おちゃもあります。', 'コーヒーがあります。それから、おちゃもあります。'], answer: 'コーヒーがあります。そして、おちゃもあります。', explain: 'そして = y / además. Adición de elementos similares. Hay café. Y además hay té.' },
        ],
      },
      {
        id: 'level-2',
        title: '接続詞 — ふたつのスペース',
        tag: '2 espacios',
        intro: 'Completa con el conector y el elemento que falta.',
        type: 'dual',
        items: [
          { scene: 'でも — contraste', lines: [['', '"Es pequeño. Pero es bonito.": ちいさいです。[[0]]、[[1]]です。']], blanks: [{ options: ['でも', 'そして', 'だから', 'それから'], answer: 'でも', explain: 'でも = pero. Contraste: pequeño ↔ bonito.' }, { options: ['きれい', 'むずかしい', 'たかい', 'おいしい'], answer: 'きれい', explain: 'きれい = bonito/a. ちいさいです。でも、きれいです。' }] },
          { scene: 'だから — causa/consecuencia', lines: [['', '"Llueve. Por eso no salgo.": あめがふります。[[0]]、そとに[[1]]。']], blanks: [{ options: ['だから', 'でも', 'それから', 'そして'], answer: 'だから', explain: 'だから = por eso. Llueve → consecuencia: no salgo.' }, { options: ['行きます', '行きません', '行った', '行こう'], answer: '行きません', explain: '行きません = no voy/no salgo. あめです。だから、そとに行きません。' }] },
          { scene: 'それから — secuencia', lines: [['', '"Me levanto. Y después me ducho.": おきます。[[0]]、[[1]]。']], blanks: [{ options: ['それから', 'でも', 'だから', 'そして'], answer: 'それから', explain: 'それから = y después. Secuencia: levantarse → ducharse.' }, { options: ['シャワーをあびます', 'ねます', 'たべます', 'いきます'], answer: 'シャワーをあびます', explain: 'シャワーをあびます = me ducho. おきます。それから、シャワーをあびます。' }] },
          { scene: 'そして — adición', lines: [['', '"Esta ciudad es grande. Y también es moderna.": このまちはおおきいです。[[0]]、[[1]]です。']], blanks: [{ options: ['そして', 'でも', 'だから', 'それから'], answer: 'そして', explain: 'そして = y / y además. Adición de atributos similares.' }, { options: ['あたらしい', 'むずかしい', 'たかい', 'さむい'], answer: 'あたらしい', explain: 'あたらしい = moderno/nuevo. おおきいです。そして、あたらしいです。' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'ぶんしょう でつなぐ',
        tag: 'Opciones',
        intro: 'Elige el conector correcto en cada espacio.',
        type: 'guidedText',
        scene: 'Iván habla sobre WeLearn y el aprendizaje de japonés',
        text: 'WeLearnはとてもいい学校です。[[0]]、はたらく先生がやさしいです。(Y además los profesores son amables.) 日本語はむずかしいです。[[1]]、おもしろいです。(Pero es interesante.) まいにちべんきょうします。[[2]]、じょうずになります。(Por eso me vuelvo mejor.) あさ、ひらがなをおぼえます。[[3]]、カタカナもべんきょうします。(Y después también estudio katakana.)',
        blanks: [
          { options: ['でも', 'だから', 'そして', 'それから'], answer: 'そして', explain: 'そして = y/además. Adición: escuela buena + profesores amables (mismo tono positivo).' },
          { options: ['そして', 'だから', 'それから', 'でも'], answer: 'でも', explain: 'でも = pero. Contraste: difícil ↔ interesante.' },
          { options: ['でも', 'そして', 'それから', 'だから'], answer: 'だから', explain: 'だから = por eso. Causa (estudio cada día) → consecuencia (me vuelvo mejor).' },
          { options: ['でも', 'だから', 'それから', 'そして'], answer: 'それから', explain: 'それから = y después. Secuencia temporal: primero ひらがな, después カタカナ.' },
        ],
      },
      {
        id: 'level-4',
        title: '接続詞 自由記述',
        tag: 'Sin opciones',
        intro: 'Escribe el conector correcto sin opciones.',
        type: 'freeText',
        scene: 'Conectando ideas en japonés',
        text: '1. "El café es rico. Pero es caro.": コーヒーはおいしいです。[[0]]、たかいです。 2. "Me gusta el japonés. Por eso lo estudio.": 日本語がすきです。[[1]]、べんきょうします。 3. "Como. Y después duermo.": たべます。[[2]]、ねます。 4. "Es grande y también bonito.": おおきいです。[[3]]、きれいです。',
        blanks: [
          { answer: 'でも', accepted: ['でも'], explain: 'でも = pero. Contraste rico ↔ caro.' },
          { answer: 'だから', accepted: ['だから'], explain: 'だから = por eso. Causa (me gusta) → consecuencia (estudio).' },
          { answer: 'それから', accepted: ['それから', 'そして'], explain: 'それから = y después (secuencia). Comer → dormir.' },
          { answer: 'そして', accepted: ['そして', 'それから'], explain: 'そして = y/además. Adición de cualidades.' },
        ],
      },
      {
        id: 'level-5',
        title: '作文 練習',
        tag: 'Producción',
        intro: 'Construye frases conectadas con los cuatro conectores.',
        type: 'write',
        items: [
          { scene: 'Describir WeLearn', prompt: 'Escribe en japonés: "WeLearn es una buena school. And además los profesores son gentiles. Por eso estudio allí." Usa: いいです (buena), やさしいです (gentiles/amables), だから, そして.', answer: 'WeLearnはいいです。そして、せんせいはやさしいです。だから、そこでべんきょうします。', accepted: ['そして', 'だから'], explain: 'そして (adición de lo positivo) + だから (causa → estudio allí). そこで = allí.' },
          { scene: 'Contraste y causa', prompt: 'Escribe en japonés: "El japonés es difícil. Pero es divertido. Por eso estudio cada día." Usa: むずかしい, たのしい, まいにち.', answer: '日本語はむずかしいです。でも、たのしいです。だから、まいにちべんきょうします。', accepted: ['でも', 'だから'], explain: 'でも (contraste difícil/divertido) + だから (causa/consecuencia). Encadenamiento de dos conectores.' },
          { scene: 'Secuencia de rutina', prompt: 'Escribe tu rutina matinal con それから. Al menos 3 acciones encadenadas.', answer: 'あさ、おきます。それから、シャワーをあびます。それから、あさごはんをたべます。', accepted: ['それから'], explain: 'それから (y después) para secuencia. Se puede repetir: X、それから、Y、それから、Z.' },
          { scene: 'Conectar todo', prompt: 'Escribe 4 frases sobre el aprendizaje de coreano usando todos los conectores: でも、そして、それから、だから.', answer: 'かんこくごはむずかしいです。でも、おもしろいです。そして、音楽もすきです。だから、まいにちべんきょうします。それから、ドラマもみます。', accepted: ['でも', 'そして', 'だから', 'それから'], explain: 'Los 4 conectores en un texto cohesionado: contraste, adición, causa, secuencia.' },
        ],
      },
      {
        id: 'level-6',
        title: '自己紹介 ミッション',
        tag: 'Producción',
        intro: 'Usa los conectores para expresarte con fluidez.',
        type: 'write',
        items: [
          { scene: 'Hablar sobre ti mismo', prompt: 'Escríbete en japonés usando los 4 conectores. Habla de: tu idioma favorito, por qué lo estudias, qué haces en tu rutina para aprenderlo, y algo que es difícil pero interesante.', answer: '日本語がすきです。だから、WeLearnでべんきょうします。まいあさ、ひらがなをよみます。それから、たんごをおぼえます。日本語はむずかしいです。でも、たのしいです。そして、アニメもわかります！', accepted: ['だから', 'それから', 'でも', 'そして'], explain: '４つの接続詞を全部つかいます! Conectores: だから (razón), それから (secuencia), でも (contraste), そして (adición).' },
          { scene: 'Describir un lugar', prompt: 'Describe en japonés un lugar (ciudad, restaurant, escuela) usando al menos 3 conectores. 80 caracteres aprox.', answer: 'このレストランはおいしいです。そして、やすいです。でも、ちょっとこんでいます。だから、はやくいきましょう。', accepted: ['そして', 'でも', 'だから'], explain: 'そして (adición), でも (contraste/matiz), だから (consecuencia). Descripción natural con conectores.' },
        ],
      },
    ],
  },
}

export default topic
