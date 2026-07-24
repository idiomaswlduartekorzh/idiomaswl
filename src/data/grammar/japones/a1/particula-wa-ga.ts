import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'particula-wa-ga',
  order: '04',
  color: '#0d9488',
  category: 'Partículas',
  level: 'A1',
  title: 'Partícula は vs が en japonés A1 — Tema vs Sujeto',
  shortTitle: 'は vs が',
  metaTitle: 'Partícula wa ga japonés A1 — diferencia tema sujeto',
  description:
    'は (wa) y が (ga) son las dos partículas más confundidas del japonés. は marca el tema de la conversación (contexto, contraste). が marca el sujeto gramatical (nueva información, énfasis en quién). La diferencia es sutil pero esencial para sonar natural en japonés.',
  lead: 'は (wa) = "hablando de..." (tema) | が (ga) = sujeto gramatical (énfasis en quién). わたしは → "en cuanto a mí". わたしが → "soy yo (y no otro)". La diferencia es de énfasis y contexto.',
  outcomes: [
    'Distingue は (tema) de が (sujeto) en contextos básicos',
    'Usa は para presentarse y establecer el tema de conversación',
    'Usa が con いる/ある, adjetivos de gusto (すきです) y énfasis en el sujeto',
  ],

  guide: {
    goal: 'Usar は y が correctamente en el nivel A1 del japonés, distinguiendo contextos principales.',
    model: 'わたしは がくせいです。(Yo [tema] estudiante soy.) / だれが きましたか？ (¿Quién [sujeto] vino?)',
    formula: '[tema]は → información conocida | [sujeto]が → información nueva o énfasis',
    decisions: [
      'は → tema o información ya conocida: わたしは + descripción',
      'は → contraste: コーヒーは すきです、おちゃは すきではありません',
      'が → sujeto de verbos existenciales: ねこが います, ほんが あります',
      'が → respuesta a preguntas con だれ/なに: だれが きた？→ たろうが きた',
      'が → adjetivos de gusto/odio/habilidad: にほんごが すきです',
      'Presentación: わたしは [nombre]です (は porque estableces el tema "yo")',
    ],
    table: [
      ['Partícula', 'Uso', 'Ejemplo'],
      ['は (wa)', 'Tema / contexto conocido', 'わたしは がくせいです (Soy estudiante [tema yo])'],
      ['は (wa)', 'Contraste', 'コーヒーは すきです (El café [en contraste] me gusta)'],
      ['が (ga)', 'Verbos existenciales', 'ねこが います (Hay un gato)'],
      ['が (ga)', 'Respuesta a だれ/なに', 'たろうが きた (Fue Taro quien vino)'],
      ['が (ga)', 'Adjetivos de gusto', 'にほんごが すきです (Me gusta el japonés)'],
    ],
    mistakes: [
      '"わたしが がくせいです" — no es incorrecto pero implica énfasis: "Soy YO el estudiante (no otro)".',
      '"にほんごは すきです" — el contraste implica que otras cosas no te gustan.',
      'No existe regla única — は/が depende del contexto y énfasis. En A1, aprende los patrones frecuentes.',
    ],
  },
  seo: [
    {
      heading: 'は vs が: la diferencia que todos preguntan',
      paragraphs: [
        'La distinción entre は (wa) y が (ga) es una de las preguntas más frecuentes en japonés. Ambas pueden traducirse como "el/la/los" o simplemente marcan el sujeto, pero sus funciones son distintas. は marca el TEMA de conversación — algo conocido o presentado como contexto. が marca el SUJETO gramatical — con énfasis en la nueva información o en "quién".',
        'Para el hispanohablante, la mejor aproximación es: は = "hablando de / en cuanto a" y が = "es [precisamente] quien". わたしは がくせいです = "Hablando de mí, soy estudiante" vs わたしが がくせいです = "Soy YO el estudiante (no tú, no él)".',
      ],
    },
    {
      heading: 'Cuándo usar が en A1: tres casos claros',
      paragraphs: [
        'En el nivel A1 hay tres contextos donde が es la elección correcta. Primero: verbos de existencia います (estar/haber para animados) y あります (estar/haber para inanimados) siempre van con が: ねこが います (hay un gato), ほんが あります (hay un libro).',
        'Segundo: adjetivos de gusto/odio/habilidad toman が: にほんごが すきです (me gusta el japonés), およぐのが とくいです (soy bueno nadando). Tercero: respuesta a preguntas de quién/qué con が: だれが きましたか → たろうが きました (¿Quién vino? → Fue Taro).',
      ],
    },
  ],
  visual: {
    mode: 'particle-comparison',
    teacherLens: 'El estudiante aprende los contextos principales de は y が con ejemplos concretos.',
    graphicPrompt: 'Comparativa は/が con flechas. Casos de が con います/あります/すきです.',
    scene: [
      ['は = tema, contexto', 'わたしは → presentación'],
      ['が = sujeto, énfasis', 'だれが？→ [quien]が'],
      ['います/あります + が', 'existencia con が'],
    ],
    learnerModes: ['visual: tabla comparativa', 'analítico: contextos de が', 'oral: preguntas だれが/なにが'],
    reviewFocus: ['は para tema/presentación', 'が con います/あります', 'すきです + が', 'だれが pregunta'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'は o が',
        tag: 'Opción múltiple',
        intro: 'Elige は o が según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Presentación',
            lines: [['Carlos', 'わたし___ カルロスです。(Me llamo Carlos.)']],
            options: ['は', 'が', 'を', 'に'],
            answer: 'は',
            explain: 'Presentación / tema: わたしは. Estableces "yo" como tema.',
          },
          {
            scene: 'Hay un gato',
            lines: [['Sofia', 'あそこに ねこ___ います。(Allí hay un gato.)']],
            options: ['が', 'は', 'を', 'に'],
            answer: 'が',
            explain: 'います (existencia) → siempre が: ねこが います.',
          },
          {
            scene: 'Me gusta el japonés',
            lines: [['Hugo', 'にほんご___ すきです。(Me gusta el japonés.)']],
            options: ['が', 'は', 'を', 'で'],
            answer: 'が',
            explain: 'すきです (gustar) → が. にほんごが すきです.',
          },
          {
            scene: 'Contraste',
            lines: [['Ana', 'コーヒー___ すきです が、おちゃ___ すきではありません。']],
            options: ['は', 'が', 'を', 'に'],
            answer: 'は',
            explain: 'Contraste entre dos cosas → は. コーヒーは vs おちゃは.',
          },
          {
            scene: '¿Quién vino?',
            lines: [['Marco', 'だれ___ きましたか？(¿Quién vino?)']],
            options: ['が', 'は', 'を', 'に'],
            answer: 'が',
            explain: 'Pregunta sobre el sujeto: だれが. Respuesta también con が.',
          },
          {
            scene: 'Hay un libro',
            lines: [['Lina', 'つくえの うえに ほん___ あります。(Hay un libro sobre la mesa.)']],
            options: ['が', 'は', 'を', 'の'],
            answer: 'が',
            explain: 'あります (existencia) → siempre が: ほんが あります.',
          },
          {
            scene: 'El japonés es difícil',
            lines: [['Carlos', 'にほんご___ むずかしいです。(El japonés es difícil.)']],
            options: ['は', 'が', 'を', 'に'],
            answer: 'は',
            explain: 'Descripción del tema: にほんごは [descripción]です. Tema.',
          },
          {
            scene: 'Énfasis en quién',
            lines: [['Sofia', '___ たろうです！(¡Soy yo Taro! / ¡Es Taro!)']],
            options: ['たろうが', 'たろうは', 'たろうを', 'たろうに'],
            answer: 'たろうが',
            explain: 'Énfasis en "quién es": たろうが です. (Soy/es precisamente Taro.)',
          },
        ],
      },
      {
        id: 'l2',
        title: 'は y が en diálogo',
        tag: '2 partículas',
        intro: 'Completa las dos partículas en el diálogo.',
        type: 'dual',
        items: [
          {
            scene: 'Presentación y gusto',
            lines: [
 ['Carlos', 'わたし[[0]] カルロスです。にほんご[[1]] すきです。'],
 ],
            blanks: [
              { options: ['は', 'が', 'を'], answer: 'は', explain: 'Presentación: わたしは [tema].' },
              { options: ['が', 'は', 'を'], answer: 'が', explain: 'すきです: [objeto]が すきです.' },
            ],
          },
          {
            scene: 'Hay y no hay',
            lines: [['Hugo', 'ここに つくえ[[0]] あります。でも、いす[[1]] ありません。']],
            blanks: [
              { options: ['が', 'は', 'を'], answer: 'が', explain: 'あります → が: つくえが あります.' },
              { options: ['は', 'が', 'を'], answer: 'は', explain: 'Contraste (でも): いすは ありません.' },
            ],
          },
          {
            scene: '¿Quién y qué?',
            lines: [['Ana', 'だれ[[0]] きましたか？ なに[[1]] ありますか？']],
            blanks: [
              { options: ['が', 'は', 'を'], answer: 'が', explain: 'Pregunta de sujeto: だれが.' },
              { options: ['が', 'は', 'を'], answer: 'が', explain: 'Pregunta de existencia: なにが あります.' },
            ],
          },
          {
            scene: 'Contraste entre idiomas',
            lines: [['Sofia', 'えいご[[0]] わかります。でも、にほんご[[1]] まだわかりません。']],
            blanks: [
              { options: ['は', 'が', 'を'], answer: 'は', explain: 'Contraste: えいごは [en contraste].' },
              { options: ['は', 'が', 'を'], answer: 'は', explain: 'Contraste (でも): にほんごは [en contraste].' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Elige は o が en cada espacio.',
        type: 'guidedText',
        scene: 'Conversación sobre gustos y existencia',
        text: 'わたし[[0]] デービッドです。にほんご[[1]] とても すきです。うちに ねこ[[2]] います。でも、いぬ[[3]] いません。にほんご[[4]] むずかしいですが、おもしろいです。だれ[[5]] にほんごを おしえますか？',
        blanks: [
          { options: ['は', 'が', 'を'], answer: 'は', explain: 'わたしは [tema] presentación.' },
          { options: ['が', 'は', 'を'], answer: 'が', explain: 'すきです: [objeto]が すきです.' },
          { options: ['が', 'は', 'を'], answer: 'が', explain: 'います: ねこが います.' },
          { options: ['は', 'が', 'を'], answer: 'は', explain: 'Contraste (でも): いぬは → pero perro no.' },
          { options: ['は', 'が', 'を'], answer: 'は', explain: 'Tema del comentario: にほんごは [描述].' },
          { options: ['が', 'は', 'を'], answer: 'が', explain: 'Pregunta de sujeto: だれが.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe は o が sin opciones.',
        type: 'freeText',
        scene: 'Descripción de la WeLearn en japonés',
        text: 'ウィーラーン[[0]] げんごがっこうです。デービッド[[1]] せんせいです。がくせい[[2]] たくさん います。にほんご[[3]] とても にんきです。ここに ほん[[4]] たくさん あります。だれ[[5]] にほんごを べんきょうしていますか？',
        blanks: [
          { answer: 'は', explain: 'WeLearnは [tema] → げんごがっこうです.' },
          { answer: 'は', explain: 'デービッドは [tema] → せんせいです.' },
          { answer: 'が', explain: 'がくせいが います [existencia].' },
          { answer: 'は', explain: 'にほんごは [tema] → にんきです.' },
          { answer: 'が', explain: 'ほんが あります [existencia].' },
          { answer: 'が', explain: 'だれが [pregunta de sujeto].' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la frase completa con は o が.',
        type: 'write',
        items: [
          {
            scene: 'Presentación',
            prompt: 'Escribe en japonés: Soy Carlos. → わたし___ カルロスです。',
            answer: 'わたしは カルロスです。',
            accepted: ['わたしは カルロスです', 'わたしは カルロスです。'],
            explain: 'わたしは [tema]. Presentación con は.',
          },
          {
            scene: 'Me gusta el japonés',
            prompt: 'Escribe en japonés: Me gusta el japonés. → にほんご___ すきです。',
            answer: 'にほんごが すきです。',
            accepted: ['にほんごが すきです', 'にほんごが すきです。'],
            explain: 'すきです siempre con が: にほんごが すきです.',
          },
          {
            scene: 'Hay un gato',
            prompt: 'Escribe en japonés: Hay un gato en el jardín. → にわに ねこ___ います。',
            answer: 'にわに ねこが います。',
            accepted: ['にわに ねこが います', 'にわに ねこが います。'],
            explain: 'います + が: ねこが います.',
          },
          {
            scene: 'Contraste',
            prompt: 'Escribe: El japonés me gusta, pero el inglés no. → にほんご___ すきです。えいご___ すきではありません。',
            answer: 'にほんごは すきです。えいごは すきではありません。',
            accepted: ['にほんごは すきです えいごは すきではありません'],
            explain: 'Contraste entre dos elementos: は para ambos.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Usa は y が para hablar de ti mismo y describir tu entorno.',
        type: 'write',
        items: [
          {
            scene: 'Tu presentación con gustos',
            prompt: 'わたし___ [名前]です。[idioma]___ すきです。[idioma]___ すきではありません。',
            answer: 'わたしは カルロスです。にほんごが すきです。えいごは すきではありません。',
            accepted: ['わたしは カルロスです にほんごが すきです えいごは すきではありません'],
            explain: 'わたしは [presentación]. [idioma]が すきです. [otro]は すきではありません.',
          },
          {
            scene: 'Describe tu cuarto',
            prompt: 'へやに [cosa]___ あります。でも [cosa]___ ありません。',
            answer: 'へやに ほんが あります。でも、テレビは ありません。',
            accepted: ['へやに ほんが あります でも テレビは ありません'],
            explain: 'あります + が. Contraste (でも) + は.',
          },
          {
            scene: 'Pregunta y respuesta',
            prompt: 'だれ___ にほんごを おしえますか？→ デービッド___ おしえます。',
            answer: 'だれが にほんごを おしえますか？→ デービッドが おしえます。',
            accepted: ['だれが にほんごを おしえますか デービッドが おしえます'],
            explain: 'Pregunta だれが. Respuesta: [quien]が.',
          },
        ],
      },
    ],
  },
}

export default topic
