import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'particula-de-e',
  order: '07',
  color: '#dc2626',
  category: 'Partículas',
  level: 'A1',
  title: 'Partículas で y へ en japonés A1 — Lugar de Acción y Dirección',
  shortTitle: 'で y へ',
  metaTitle: 'Partículas de e japonés A1 — lugar de acción y dirección en japonés',
  description:
    'で (de) marca el lugar donde ocurre una acción y también el medio o instrumento con el que se realiza algo. へ (e/he) marca la dirección o destino hacia el que uno se dirige, enfatizando el trayecto. Ambas partículas se confunden con に, pero cada una tiene una función distinta.',
  lead: 'で = lugar donde ocurre la acción (がっこうで べんきょう = estudio en la escuela) o medio (バスで = en bus). へ = dirección/trayecto (とうきょうへ いく = voy hacia Tokio). に marca el punto de llegada concreto; へ enfatiza el camino.',
  outcomes: [
    'Usa で para marcar el lugar donde se realiza una acción',
    'Usa で para indicar el medio o instrumento de una acción',
    'Distingue へ (dirección/trayecto) de に (destino concreto)',
  ],

  guide: {
    goal: 'Usar で y へ correctamente, y distinguirlos de に en contextos de lugar y movimiento.',
    model: 'カフェで べんきょうします (Estudio en el café) | バスで きます (Vengo en bus) | とうきょうへ いきます (Voy hacia Tokio)',
    formula: '[lugar]で + acción | [medio]で + verbo | [dirección]へ + verbo de movimiento',
    decisions: [
      'で → lugar de acción: がっこうで (en la escuela, para estudiar/hacer algo)',
      'で → medio/instrumento: バスで (en bus), にほんごで (en japonés), はしで (con palillos)',
      'で → material: きで (de madera), かみで (de papel)',
      'へ → dirección con énfasis en el trayecto: とうきょうへ いく',
      'に → destino concreto (punto de llegada): とうきょうに つく (llegar a Tokio)',
      'に → existencia/estar: うちに います — で sería incorrecto aquí',
    ],
    table: [
      ['Partícula', 'Uso', 'Ejemplo'],
      ['で (de)', 'Lugar de acción', 'としょかんで よみます (Leo en la biblioteca)'],
      ['で (de)', 'Medio/instrumento', 'バスで いきます (Voy en bus)'],
      ['で (de)', 'Material', 'きで つくります (Lo hago de madera)'],
      ['へ (e)', 'Dirección/trayecto', 'にほんへ いきます (Voy hacia Japón)'],
      ['に (ni)', 'Destino concreto', 'にほんに つきます (Llego a Japón)'],
    ],
    mistakes: [
      '"うちでいます" ✗ → "うちにいます". Existencia/estar → siempre に, nunca で.',
      '"バスにいきます" ✗ (con medio de transporte) → "バスでいきます". Medio de transporte → で.',
      'へ y に son intercambiables en muchos casos en A1, pero に es más frecuente para destino específico.',
    ],
  },
  seo: [
    {
      heading: 'La partícula で: lugar de acción y medio de transporte',
      paragraphs: [
        'La partícula で (de) tiene dos usos principales en A1. El primero es marcar el lugar donde se realiza una acción: がっこうで べんきょうします = "estudio en la escuela". La clave es que el lugar debe ser donde OCURRE algo — si solo estás ahí sin hacer nada, usas に: うちに います (estoy en casa, sin más).',
        'El segundo uso de で es marcar el medio o instrumento: バスで いきます (voy en bus), でんしゃで かえります (vuelvo en tren), にほんごで はなします (hablo en japonés), はしで たべます (como con palillos). Para el hispanohablante, equivale a "en" o "con" según el contexto — en bus, con palillos, en japonés.',
      ],
    },
    {
      heading: 'へ vs に: el matiz del trayecto frente al destino',
      paragraphs: [
        'En japonés A1, へ y に son casi intercambiables para indicar destino de verbos de movimiento como いく (ir), くる (venir), かえる (volver). La diferencia es de énfasis: へ pone el foco en la DIRECCIÓN o el trayecto hacia algo, mientras que に pone el foco en el PUNTO DE LLEGADA concreto.',
        'Prácticamente: とうきょうへ いきます enfatiza "me dirijo hacia Tokio", とうきょうに いきます enfatiza "voy A Tokio (y llego)". En A1, aprende los dos pero usa に para destino concreto — es más frecuente en el habla cotidiana. へ se escribe con el hiragana へ pero se pronuncia "e" (no "he") cuando es partícula.',
      ],
    },
  ],
  visual: {
    mode: 'particle-place-direction',
    teacherLens: 'El estudiante aprende で para acción/medio y へ para dirección, distinguiéndolos de に.',
    graphicPrompt: 'Diagrama: lugar に (existencia) vs lugar で (acción). Flecha へ hacia destino. Medio で con iconos de transporte.',
    scene: [
      ['で = acción en lugar', 'カフェで べんきょう'],
      ['で = medio', 'バスで / にほんごで'],
      ['へ = dirección', 'とうきょうへ いく'],
    ],
    learnerModes: ['visual: diagrama に vs で vs へ', 'analítico: tabla de usos', 'oral: describir trayectos'],
    reviewFocus: ['で para acción en lugar', 'で para medio de transporte', 'へ para dirección', 'に vs で con います'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'で, へ o に',
        tag: 'Opción múltiple',
        intro: 'Elige la partícula correcta según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Estudio en el café',
            lines: [['Carlos', 'カフェ___ にほんごを べんきょうします。(Estudio japonés en el café.)']],
            options: ['で', 'に', 'へ', 'を'],
            answer: 'で',
            explain: 'Lugar donde ocurre la acción (estudiar) → で. カフェで べんきょうします.',
          },
          {
            scene: 'Voy hacia Japón',
            lines: [['Dario', 'にほん___ いきます。(Voy hacia/a Japón.)']],
            options: ['へ', 'で', 'を', 'が'],
            answer: 'へ',
            explain: 'Dirección/trayecto → へ. にほんへ いきます. (に también es posible para destino.)',
          },
          {
            scene: 'Vengo en tren',
            lines: [['Sofia', 'でんしゃ___ きます。(Vengo en tren.)']],
            options: ['で', 'に', 'へ', 'は'],
            answer: 'で',
            explain: 'Medio de transporte → で. でんしゃで きます.',
          },
          {
            scene: 'Estoy en casa',
            lines: [['Ana', 'うち___ います。(Estoy en casa.)']],
            options: ['に', 'で', 'へ', 'を'],
            answer: 'に',
            explain: 'Existencia/estar → に. うちに います. (で sería incorrecto aquí.)',
          },
          {
            scene: 'Hablo en japonés',
            lines: [['Marco', 'にほんご___ はなします。(Hablo en japonés.)']],
            options: ['で', 'を', 'に', 'へ'],
            answer: 'で',
            explain: 'Medio/instrumento (idioma) → で. にほんごで はなします.',
          },
          {
            scene: 'Vuelvo a casa',
            lines: [['Lina', 'うち___ かえります。(Vuelvo a casa.)']],
            options: ['に', 'で', 'へ', 'が'],
            answer: 'に',
            explain: 'Destino concreto de movimiento (volver) → に. うちに かえります.',
          },
          {
            scene: 'Como con palillos',
            lines: [['Vera', 'はし___ たべます。(Como con palillos.)']],
            options: ['で', 'を', 'に', 'が'],
            answer: 'で',
            explain: 'Instrumento → で. はしで たべます. (palillos = はし)',
          },
          {
            scene: 'Trabajo en la oficina',
            lines: [['Carlos', 'かいしゃ___ はたらきます。(Trabajo en la empresa/oficina.)']],
            options: ['で', 'に', 'へ', 'は'],
            answer: 'で',
            explain: 'Lugar de acción (trabajar) → で. かいしゃで はたらきます.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'で y へ/に en la misma frase',
        tag: '2 partículas',
        intro: 'Completa las dos partículas de cada frase.',
        type: 'dual',
        items: [
          {
            scene: 'Trayecto y acción',
            lines: [['Dario', 'でんしゃ[[0]] がっこう[[1]] いきます。(Voy a la escuela en tren.)']],
            blanks: [
              { options: ['で', 'に', 'へ'], answer: 'で', explain: 'Medio: でんしゃで (en tren).' },
              { options: ['に', 'で', 'を'], answer: 'に', explain: 'Destino: がっこうに いきます.' },
            ],
          },
          {
            scene: 'Lugar y medio',
            lines: [['Carlos', 'レストラン[[0]] はし[[1]] たべます。(Como con palillos en el restaurante.)']],
            blanks: [
              { options: ['で', 'に', 'へ'], answer: 'で', explain: 'Lugar de acción: レストランで たべる.' },
              { options: ['で', 'に', 'を'], answer: 'で', explain: 'Instrumento: はしで たべる.' },
            ],
          },
          {
            scene: 'Dirección y medio',
            lines: [['Sofia', 'バス[[0]] とうきょう[[1]] いきます。(Voy hacia Tokio en bus.)']],
            blanks: [
              { options: ['で', 'に', 'へ'], answer: 'で', explain: 'Medio de transporte: バスで.' },
              { options: ['へ', 'で', 'を'], answer: 'へ', explain: 'Dirección/trayecto: とうきょうへ.' },
            ],
          },
          {
            scene: 'Idioma y lugar',
            lines: [['Ana', 'にほんご[[0]] ウィーラーン[[1]] はなします。(Hablo japonés en WeLearn.)']],
            blanks: [
              { options: ['で', 'に', 'を'], answer: 'で', explain: 'Medio (idioma): にほんごで はなす.' },
              { options: ['で', 'に', 'へ'], answer: 'で', explain: 'Lugar de acción: ウィーラーンで はなす.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado — rutina de Carlos',
        tag: 'Opciones',
        intro: 'Elige で, に o へ según el contexto.',
        type: 'guidedText',
        scene: 'La rutina diaria de Carlos estudiando japonés',
        text: 'まいにち でんしゃ[[0]] がっこう[[1]] いきます。がっこう[[2]] にほんご[[3]] べんきょうします。ひる、かふぇ[[4]] ともだちと はなします。よる うち[[5]] かえります。うち[[6]] います。',
        blanks: [
          { options: ['で', 'に', 'へ'], answer: 'で', explain: 'Medio de transporte: でんしゃで.' },
          { options: ['に', 'で', 'へ'], answer: 'に', explain: 'Destino: がっこうに いきます.' },
          { options: ['で', 'に', 'へ'], answer: 'で', explain: 'Lugar de acción: がっこうで べんきょうします.' },
          { options: ['を', 'で', 'に'], answer: 'を', explain: 'Objeto: にほんごを べんきょうします.' },
          { options: ['で', 'に', 'へ'], answer: 'で', explain: 'Lugar de acción: かふぇで はなします.' },
          { options: ['に', 'で', 'へ'], answer: 'に', explain: 'Destino (volver): うちに かえります.' },
          { options: ['に', 'で', 'を'], answer: 'に', explain: 'Existencia: うちに います.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe で, に o へ sin opciones.',
        type: 'freeText',
        scene: 'El viaje de Dario a Japón',
        text: 'ひこうき[[0]] にほん[[1]] いきます。とうきょう[[2]] ホテル[[3]] とまります。えいご[[4]] はなせます。レストラン[[5]] すし[[6]] たべます。',
        blanks: [
          { answer: 'で', explain: 'Medio de transporte: ひこうきで (en avión).' },
          { answer: 'へ', accepted: ['に'], explain: 'Dirección/destino: にほんへ (o に). Ambas son válidas.' },
          { answer: 'の', accepted: ['の'], explain: 'Modificador: とうきょうの ホテル (el hotel de Tokio). Posesivo の.' },
          { answer: 'に', explain: 'Lugar de existencia: ホテルに とまる (quedarse en hotel).' },
          { answer: 'で', explain: 'Medio (idioma): えいごで はなせます.' },
          { answer: 'で', explain: 'Lugar de acción: レストランで たべます.' },
          { answer: 'を', explain: 'Objeto: すしを たべます.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la frase completa con la partícula correcta.',
        type: 'write',
        items: [
          {
            scene: 'Transporte al trabajo',
            prompt: 'Escribe: Voy a la empresa en metro. → ちかてつ___ かいしゃ___ いきます。',
            answer: 'ちかてつで かいしゃに いきます。',
            accepted: ['ちかてつで かいしゃに いきます', 'ちかてつで かいしゃへ いきます'],
            explain: 'Medio: ちかてつで. Destino: かいしゃに (o へ) いきます.',
          },
          {
            scene: 'Idioma en clase',
            prompt: 'Escribe: En clase hablo en japonés. → じゅぎょう___ にほんご___ はなします。',
            answer: 'じゅぎょうで にほんごで はなします。',
            accepted: ['じゅぎょうで にほんごで はなします'],
            explain: 'Lugar de acción: じゅぎょうで. Medio (idioma): にほんごで.',
          },
          {
            scene: 'Hacia el restaurante',
            prompt: 'Escribe: Voy hacia el restaurante. → レストラン___ いきます。',
            answer: 'レストランへ いきます。',
            accepted: ['レストランへ いきます', 'レストランに いきます'],
            explain: 'Dirección: レストランへ. (に también es correcto para destino.)',
          },
        ],
      },
    ],
  },
}

export default topic
