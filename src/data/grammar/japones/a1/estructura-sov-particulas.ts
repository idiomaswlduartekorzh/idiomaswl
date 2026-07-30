import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'estructura-sov-particulas',
  order: '02',
  color: '#b45309',
  category: 'Estructura',
  level: 'A1',
  title: 'Estructura SOV y Partículas en japonés A1',
  shortTitle: 'SOV y partículas',
  metaTitle: 'Estructura SOV japonés A1 — partículas wa ga wo ni de',
  description:
    'El japonés tiene orden SOV (Sujeto-Objeto-Verbo): el verbo siempre va al final. Las partículas son marcas gramaticales que van después de cada elemento para indicar su función: は (wa) = tema, が (ga) = sujeto, を (wo/o) = objeto directo, に (ni) = dirección/lugar/tiempo, で (de) = lugar de acción.',
  lead: 'Japonés: Sujeto + Objeto + VERBO (al final siempre). Partículas después de cada palabra: は=tema, が=sujeto, を=objeto, に=lugar/destino. Es el cambio mental más grande del español al japonés.',
  outcomes: [
    'Comprende el orden SOV del japonés y que el verbo siempre va al final',
    'Usa las partículas は, が, を, に, で correctamente',
    'Construye frases básicas en japonés A1',
  ],

  guide: {
    goal: 'Construir frases básicas en japonés usando el orden SOV y las partículas esenciales.',
    model: 'わたしは がくせいです。(Yo [tema] estudiante soy.) / ほんを よみます。(Libro [obj] leo.)',
    formula: '[sujeto]は/が + [objeto]を + [verbo]',
    decisions: [
      'Orden SIEMPRE: S + O + V. "Como sushi" → "すしを たべます" (sushi-OBJ comer)',
      'は (wa) = marca el tema: わたしは = en cuanto a mí / yo [tema]',
      'が (ga) = marca el sujeto gramatical: ねこが います = hay un gato',
      'を (wo/o) = marca el objeto directo: ほんを よむ = leer el libro',
      'に (ni) = dirección/lugar/tiempo: がっこうに いく = ir a la escuela',
      'で (de) = lugar donde se realiza una acción: こうえんで あそぶ = jugar en el parque',
    ],
    table: [
      ['Partícula', 'Función', 'Ejemplo'],
      ['は (wa)', 'Tema', 'わたしは がくせいです (Soy estudiante)'],
      ['が (ga)', 'Sujeto', 'ねこが います (Hay un gato)'],
      ['を (wo)', 'Objeto directo', 'ほんを よみます (Leo el libro)'],
      ['に (ni)', 'Destino/lugar', 'とうきょうに いきます (Voy a Tokio)'],
      ['で (de)', 'Lugar de acción', 'かふぇで のみます (Bebo en el café)'],
    ],
    mistakes: [
      'El verbo SIEMPRE al final — no existe "Leo el libro" con el verbo en medio en japonés.',
      'は se lee "wa" (no "ha") cuando es partícula de tema.',
      'を se lee "o" (no "wo") en el japonés moderno — pero se escribe を.',
    ],
  },
  seo: [
    {
      heading: '¿Por qué el verbo va al final en japonés (SOV)?',
      paragraphs: [
        'La diferencia estructural más profunda entre el japonés y el español es el orden de palabras. El español es SVO (Sujeto-Verbo-Objeto): "Yo leo el libro". El japonés es SOV (Sujeto-Objeto-Verbo): "Yo el-libro leo" = わたしは ほんを よみます. El verbo SIEMPRE ocupa la última posición de la frase.',
        'Este cambio es el más difícil de asimilar para el hispanohablante. En el habla hay que "guardar" el verbo hasta el final mientras se procesa el resto de la frase. Con práctica se vuelve natural, pero requiere reprogramar el orden mental de construcción de frases.',
      ],
    },
    {
      heading: '¿Qué son las partículas en japonés?',
      paragraphs: [
        'Las partículas japonesas son marcas gramaticales que se colocan DESPUÉS del elemento que modifican. Indican la función de ese elemento en la frase. は (wa) marca el tema de conversación (similar al 은/는 coreano). が (ga) marca el sujeto gramatical. を (wo/o) marca el objeto directo. に (ni) indica dirección, lugar o tiempo. で (de) indica el lugar donde ocurre la acción.',
        'Para el hispanohablante, el concepto de partícula puede resultar extraño porque en español esas funciones las indica el orden de palabras o las preposiciones antes del elemento. En japonés, el orden es más flexible gracias a las partículas: cada elemento "lleva su función consigo".',
      ],
    },
    {
      heading: '¿Cómo se ordena una frase básica en japonés?',
      paragraphs: [
        'El japonés sigue el orden Sujeto–Objeto–Verbo (SOV): el verbo va SIEMPRE al final. Donde el español dice "Yo como pan", el japonés dice literalmente "Yo pan como": 私はパンを食べます (watashi wa pan o tabemasu). Cada elemento lleva detrás una partícula que marca su función (は tema, が sujeto, を objeto, に destino/tiempo, で lugar de acción), y gracias a ellas el orden de los complementos es flexible mientras el verbo permanezca al final. La mayor dificultad para el hispanohablante es doble: acostumbrarse a "guardar" el verbo hasta el final y confiar en las partículas —no en la posición— para saber quién hace qué.',
      ],
    },
  ],
  visual: {
    mode: 'particle-chart',
    teacherLens: 'El estudiante aprende SOV y las 5 partículas esenciales con ejemplos claros.',
    graphicPrompt: 'Diagrama SOV con flechas. Tabla de partículas con función y ejemplo.',
    scene: [
      ['SOV: sujeto + objeto + VERBO', 'el verbo siempre al final'],
      ['は=tema | が=sujeto | を=objeto', 'partículas principales'],
      ['に=destino | で=lugar de acción', 'partículas de lugar'],
    ],
    learnerModes: ['visual: diagrama SOV', 'analítico: tabla de partículas', 'oral: frases con partículas'],
    reviewFocus: ['verbo al final siempre', 'は = wa (no ha)', 'を = o (objeto)', 'に vs で'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Partícula correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la partícula correcta para cada frase japonesa.',
        type: 'choice',
        items: [
          {
            scene: 'Tema: yo',
            lines: [['Bruno', 'わたし___ がくせいです。(Yo soy estudiante.)']],
            options: ['は', 'が', 'を', 'に'],
            answer: 'は',
            explain: 'は (wa) marca el tema. わたしは = "en cuanto a mí".',
          },
          {
            scene: 'Objeto directo',
            lines: [['Sofia', 'ほん___ よみます。(Leo el libro.)']],
            options: ['を', 'は', 'が', 'に'],
            answer: 'を',
            explain: 'を marca el objeto directo. ほんを = libro [obj].',
          },
          {
            scene: 'Destino',
            lines: [['Carlos', 'とうきょう___ いきます。(Voy a Tokio.)']],
            options: ['に', 'で', 'を', 'は'],
            answer: 'に',
            explain: 'に marca el destino/dirección. とうきょうに = a Tokio.',
          },
          {
            scene: 'Lugar de acción',
            lines: [['Ana', 'かふぇ___ コーヒーを のみます。(Bebo café en el café.)']],
            options: ['で', 'に', 'を', 'が'],
            answer: 'で',
            explain: 'で marca el lugar donde ocurre la acción.',
          },
          {
            scene: 'Sujeto gramatical',
            lines: [['Marco', 'ねこ___ います。(Hay un gato.)']],
            options: ['が', 'は', 'を', 'で'],
            answer: 'が',
            explain: 'が marca el sujeto. Con います (hay/existe), se usa が.',
          },
          {
            scene: 'Objeto directo 2',
            lines: [['Lina', 'にほんご___ べんきょうします。(Estudio japonés.)']],
            options: ['を', 'は', 'に', 'で'],
            answer: 'を',
            explain: 'を = objeto directo. にほんごを = japonés [obj].',
          },
          {
            scene: 'Destino personal',
            lines: [['Carlos', 'がっこう___ いきます。(Voy a la escuela.)']],
            options: ['に', 'で', 'は', 'を'],
            answer: 'に',
            explain: 'に = dirección. がっこうに = a la escuela.',
          },
          {
            scene: 'Lugar de estudio',
            lines: [['Sofia', 'としょかん___ にほんごを べんきょうします。(Estudio japonés en la biblioteca.)']],
            options: ['で', 'に', 'を', 'は'],
            answer: 'で',
            explain: 'で = lugar de acción. Estudio en la biblioteca → としょかんで.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos partículas por frase',
        tag: '2 partículas',
        intro: 'Completa las dos partículas de la frase japonesa.',
        type: 'dual',
        items: [
          {
            scene: 'Sujeto y objeto',
            lines: [['Bruno', 'わたし[[0]] ほん[[1]] よみます。(Yo leo el libro.)']],
            blanks: [
              { options: ['は', 'が', 'を'], answer: 'は', explain: 'わたしは = yo [tema].' },
              { options: ['を', 'は', 'に'], answer: 'を', explain: 'ほんを = libro [objeto].' },
            ],
          },
          {
            scene: 'Destino y objeto',
            lines: [['Sofia', 'とうきょう[[0]] いって コーヒー[[1]] のみます。(Voy a Tokio y bebo café.)']],
            blanks: [
              { options: ['に', 'で', 'を'], answer: 'に', explain: 'とうきょうに = a Tokio (destino).' },
              { options: ['を', 'は', 'に'], answer: 'を', explain: 'コーヒーを = café [objeto].' },
            ],
          },
          {
            scene: 'Lugar y objeto',
            lines: [['Carlos', 'がっこう[[0]] にほんご[[1]] べんきょうします。(Estudio japonés en la escuela.)']],
            blanks: [
              { options: ['で', 'に', 'を'], answer: 'で', explain: 'がっこうで = en la escuela (lugar de acción).' },
              { options: ['を', 'は', 'が'], answer: 'を', explain: 'にほんごを = japonés [objeto].' },
            ],
          },
          {
            scene: 'Tema y destino',
            lines: [['Ana', 'わたし[[0]] まいにち がっこう[[1]] いきます。(Voy a la escuela todos los días.)']],
            blanks: [
              { options: ['は', 'が', 'を'], answer: 'は', explain: 'わたしは = yo [tema].' },
              { options: ['に', 'で', 'を'], answer: 'に', explain: 'がっこうに = a la escuela (destino).' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Elige la partícula correcta en cada espacio.',
        type: 'guidedText',
        scene: 'Un día de un estudiante de japonés en Tokio',
        text: 'わたし[[0]] がくせいです。まいにち がっこう[[1]] いきます。がっこう[[2]] にほんご[[3]] べんきょうします。ひる[[4]] かふぇ[[5]] ランチ[[6]] たべます。',
        blanks: [
          { options: ['は', 'が', 'を'], answer: 'は', explain: 'わたしは = yo [tema]. Presentación.' },
          { options: ['に', 'で', 'を'], answer: 'に', explain: 'がっこうに = a la escuela (destino).' },
          { options: ['で', 'に', 'を'], answer: 'で', explain: 'がっこうで = en la escuela (lugar de estudio).' },
          { options: ['を', 'は', 'に'], answer: 'を', explain: 'にほんごを = japonés [objeto directo].' },
          { options: ['は', 'を', 'に'], answer: 'は', explain: 'ひるは = en cuanto al mediodía [tema temporal].' },
          { options: ['で', 'に', 'は'], answer: 'で', explain: 'かふぇで = en el café (lugar de la acción comer).' },
          { options: ['を', 'は', 'が'], answer: 'を', explain: 'ランチを = almuerzo [objeto directo].' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la partícula correcta sin opciones.',
        type: 'freeText',
        scene: 'Presentación en japonés A1',
        text: 'わたし[[0]] デービッドです。にほん[[1]] きました。とうきょう[[2]] にほんご[[3]] べんきょうしています。まいにち えいご[[4]] おしえています。',
        blanks: [
          { answer: 'は', explain: 'わたしは = yo [tema]. Presentación.' },
          { answer: 'から', accepted: ['に', 'から'], explain: 'にほんから = desde Japón. (から = desde). Alternativa: Japón に vino.' },
          { answer: 'で', explain: 'とうきょうで = en Tokio (lugar de estudio).' },
          { answer: 'を', explain: 'にほんごを = japonés [objeto directo].' },
          { answer: 'を', explain: 'えいごを = inglés [objeto directo de おしえる].' },
        ],
      },
      {
        id: 'l5',
        title: 'Construyendo frases SOV',
        tag: 'Producción',
        intro: 'Escribe la frase japonesa en orden SOV con las partículas correctas.',
        type: 'write',
        items: [
          {
            scene: 'Yo leo el libro',
            prompt: 'Ordena en japonés SOV: わたし + ほん + よみます + は/を',
            answer: 'わたしは ほんを よみます。',
            accepted: ['わたしは ほんを よみます', 'わたしは ほんを よみます。'],
            explain: 'わたしは [tema] + ほんを [objeto] + よみます [verbo al final].',
          },
          {
            scene: 'Voy a la escuela',
            prompt: 'Ordena en japonés SOV: わたし + がっこう + いきます + は/に',
            answer: 'わたしは がっこうに いきます。',
            accepted: ['わたしは がっこうに いきます', 'わたしは がっこうに いきます。'],
            explain: 'わたしは [tema] + がっこうに [destino] + いきます [verbo al final].',
          },
          {
            scene: 'Estudio japonés en la biblioteca',
            prompt: 'Ordena: としょかん + にほんご + べんきょうします + で/を',
            answer: 'としょかんで にほんごを べんきょうします。',
            accepted: ['としょかんで にほんごを べんきょうします', 'としょかんで にほんごを べんきょうします。'],
            explain: 'としょかんで [lugar] + にほんごを [objeto] + べんきょうします [verbo al final].',
          },
          {
            scene: 'Hay un gato',
            prompt: 'Escribe: Hay un gato. → ねこ___ います。',
            answer: 'ねこが います。',
            accepted: ['ねこが います', 'ねこが います。'],
            explain: 'Con います (hay/existe) se usa が: ねこが います.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Construye frases sobre tu rutina en japonés usando partículas y orden SOV.',
        type: 'write',
        items: [
          {
            scene: 'Tu presentación',
            prompt: 'わたし___ [nombre]です。[lugar]___ すんでいます。',
            answer: 'わたしは カルロスです。コロンビアに すんでいます。',
            accepted: ['わたしは カルロスです コロンビアに すんでいます', 'わたしは ソフィアです スペインに すんでいます'],
            explain: 'わたしは [tema] + [nombre]です. [lugar]に すんでいます = vivo en [lugar].',
          },
          {
            scene: 'Tu actividad diaria',
            prompt: 'まいにち [lugar]___ [idioma]___ べんきょうします。',
            answer: 'まいにち がっこうで にほんごを べんきょうします。',
            accepted: ['まいにち がっこうで にほんごを べんきょうします'],
            explain: 'がっこうで [lugar de acción] + にほんごを [objeto] + べんきょうします.',
          },
          {
            scene: 'Tu destino favorito',
            prompt: 'わたしは [lugar]___ いきたいです。(Quiero ir a [lugar].)',
            answer: 'わたしは とうきょうに いきたいです。',
            accepted: ['わたしは とうきょうに いきたいです', 'わたしは にほんに いきたいです'],
            explain: '[lugar]に いきたいです = quiero ir a [lugar]. に para destino.',
          },
        ],
      },
    ],
  },
}

export default topic
