import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'comparativos-superlativos-b1',
  order: '19',
  color: '#166534',
  category: 'Adjetivos',
  level: 'B1',
  title: 'Comparativos y Superlativos en Portugués B1',
  shortTitle: 'Comparativos y Superlativos',
  metaTitle: 'Comparativos y Superlativos Portugués B1 — Estructuras de Comparación',
  description:
    'Los comparativos comparan dos elementos (más...que, menos...que, tan...como), mientras que los superlativos expresan el grado máximo (el más..., el menos...). En portugués hay formas analíticas (com mais adjetivo) y sintéticas (adjetivo+-ísimo). Los comparativos irregulares (mejor, peor, mayor, menor) tienen formas especiales. Fundamental para B1.',
  lead: 'Domina comparativos y superlativos: estructuras analíticas, sintéticas e irregulares.',
  outcomes: [
    'Forma comparativos con "mais...que" y "menos...que"',
    'Usa comparativos de igualdad "tão...quanto"',
    'Forma superlativos absolutos con "-íssimo" y relativos con "o mais..."',
    'Reconoce irregulares: melhor, pior, maior, menor',
  ],

  guide: {
    goal: 'Comparar y expresar grados de intensidad con precisión.',
    model: 'Mais inteligente que você. / Menos caro que esperado. / Tão bonito quanto aquele. / O mais importante. / Belíssimo.',
    formula: 'Comparativo: mais/menos + adjetivo + que | Igualdad: tão + adjetivo + quanto | Superlativo: o + mais/menos + adjetivo | Superlativo absoluto: adjetivo + -íssimo',
    decisions: [
      'Comparativo de superioridad: mais + adjetivo + que (mais inteligente que)',
      'Comparativo de inferioridad: menos + adjetivo + que (menos bonito que)',
      'Comparativo de igualdad: tão + adjetivo + quanto (tão alto quanto você)',
      'Superlativo relativo: o + mais/menos + adjetivo + de (o mais bonito da turma)',
      'Superlativo absoluto: adjetivo + -íssimo/-íssima/-íssimos/-íssimas (belíssimo)',
      'Irregulares: bom→melhor, mau→pior, grande→maior, pequeno→menor',
      'Con adverbios: mais rapidamente que, tão lentamente quanto',
    ],
    table: [
      ['Adjetivo', 'Comparativo', 'Superlativo relativo', 'Superlativo absoluto'],
      ['bonito', 'mais bonito que', 'o mais bonito', 'belíssimo'],
      ['inteligente', 'mais inteligente que', 'o mais inteligente', 'inteligentíssimo'],
      ['bom', 'melhor que', 'o melhor', 'ótimo/bonísimo'],
      ['mau', 'pior que', 'o pior', 'péssimo'],
      ['grande', 'maior que', 'o maior', 'grandíssimo'],
      ['pequeno', 'menor que', 'o menor', 'pequenininho'],
    ],
    mistakes: [
      '"Mais bonito que você" ✓ vs "Bonito mais que você" ❌ (orden de palabras incorrecto).',
      '"Belíssima" ✓ (superlativo) vs "Bella ísima" ❌ (separado incorrectamente).',
      '"Bom" / "mejor" irregulares: "mais bom" ❌ → "melhor" ✓.',
    ],
  },

  seo: [
    {
      heading: '¿Qué son los comparativos y superlativos?',
      paragraphs: [
        'Los comparativos sirven para comparar dos elementos: "Este libro es más interesante que ese" (Este livro é mais interessante que esse). Los superlativos expresan el grado máximo o mínimo: "Este es el libro más interesante" (Este é o livro mais interessante).',
        'En portugués hay dos formas de superlativo: el relativo (con "o mais") y el absoluto (con "-íssimo"). Ambas son importantes para B1.',
      ],
    },
    {
      heading: 'Comparativos analíticos: más...que, menos...que, tan...como',
      paragraphs: [
        'Estructura: mais + adjetivo + que. Ejemplo: "Maria é mais alta que João" (Maria es más alta que João). Comparativo de inferioridad: "Paulo é menos inteligente que Pedro" (Paulo es menos inteligente que Pedro).',
        'Igualdad: "Você é tão bonito quanto seu irmão" (Eres tan guapo como tu hermano). Nota: "quanto" no "como" en portugués para comparar (aunque "como" también es aceptado en oralidad brasileña).',
      ],
    },
    {
      heading: 'Superlativos relativos: el más... de...',
      paragraphs: [
        'Estructura: o + mais/menos + adjetivo + de. Ejemplo: "Maria é a mais alta da turma" (Maria es la más alta de la clase). "Este é o livro menos interessante da biblioteca" (Este es el libro menos interesante de la biblioteca).',
        'El superlativo relativo se usa cuando el elemento es comparado dentro de un grupo o conjunto específico. La preposición "de" introduce el grupo.',
      ],
    },
    {
      heading: 'Superlativos absolutos: -íssimo, -íssima, -íssimas',
      paragraphs: [
        'El superlativo absoluto expresa grado máximo sin comparación: "Este livro é belíssimo" (Este libro es bellísimo). Se forma añadiendo -íssimo/a/os/as al adjetivo (eliminando vocal final si la hay).',
        'Ejemplos: bonito → belíssimo, inteligente → inteligentíssimo, grande → grandíssimo. Algunos adjetivos tienen formas especiales: bueno → óptimo, malo → pésimo, sagrado → sacratísimo.',
      ],
    },
    {
      heading: 'Comparativos y superlativos irregulares',
      paragraphs: [
        'Los irregulares no siguen la regla de "mais" + adjetivo. Los principales: bom (bueno) → melhor (mejor) → ótimo (óptimo). Mau (malo) → pior (peor) → péssimo (pésimo). Grande (grande) → maior (más grande) → grandíssimo. Pequeno (pequeño) → menor (más pequeño) → pequenininho.',
        'Estos irregulares son muy comunes y deben memorizarse. Nota: "melhor" y "pior" pueden funcionar como adjetivos o adverbios.',
      ],
    },
    {
      heading: 'Comparativos y superlativos con adverbios',
      paragraphs: [
        'Los comparativos y superlativos también se aplican a adverbios: "María corre más rápido que Pedro" (Maria corre mais rápido que Pedro). "Él trabaja menos diligentemente que ella" (Ele trabalha menos diligentemente que ela).',
        'Superlativo absoluto de adverbios: "Ele correu rapidíssimamente" (Él corrió rapidísimamente). La estructura es la misma que con adjetivos.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Comparativos: más que, menos que, tan como. Superlativos: relativo vs absoluto, irregulares.',
    graphicPrompt: 'Tabla: adjetivos → comparativos → superlativos (regulares e irregulares).',
    scene: [
      ['Maria é mais alta que João.', 'Maria es más alta que João.'],
      ['Este livro é tão interessante quanto aquele.', 'Este libro es tan interesante como ese.'],
      ['Paulo é menos inteligente que Pedro.', 'Paulo es menos inteligente que Pedro.'],
      ['Este é o filme mais emocionante do ano.', 'Esta es la película más emocionante del año.'],
      ['O gato é menor que o cachorro.', 'El gato es más pequeño que el perro.'],
      ['Melhor tarde do que nunca.', 'Más vale tarde que nunca.'],
      ['Este pão é delicíssimo!', '¡Este pan es deliciosísimo!'],
      ['A professora é a mais dedicada da escola.', 'La maestra es la más dedicada de la escuela.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['más que', 'menos que', 'tan como', 'superlativos', 'irregulares'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma comparativos',
        tag: 'Múltipla escolha',
        intro: 'Selecciona la forma correcta del comparativo.',
        type: 'choice',
        items: [
          {
            scene: 'Comparativo de superioridad',
            lines: [['', 'Maria é ___ que João. (alto)']],
            options: ['alto mais', 'mais alto que', 'altíssimo', 'o mais alto'],
            answer: 'mais alto que',
            explain: 'Comparativo: mais + adjetivo + que.',
          },
          {
            scene: 'Comparativo de inferioridad',
            lines: [['', 'Este carro é ___ que aquele. (caro)']],
            options: ['menos caro que', 'caro menos', 'baratíssimo', 'o menos caro'],
            answer: 'menos caro que',
            explain: 'Comparativo de inferioridad: menos + adjetivo + que.',
          },
          {
            scene: 'Comparativo de igualdad',
            lines: [['', 'Você é ___ que seu irmão. (inteligente)']],
            options: ['tão inteligente quanto', 'mais inteligente', 'inteligentíssimo', 'menos inteligente'],
            answer: 'tão inteligente quanto',
            explain: 'Igualdad: tão + adjetivo + quanto.',
          },
          {
            scene: 'Superlativo relativo',
            lines: [['', 'Maria é ___ da turma. (alta)']],
            options: ['mais alta que', 'tão alta quanto', 'a mais alta', 'altíssima'],
            answer: 'a mais alta',
            explain: 'Superlativo relativo: o/a + mais + adjetivo.',
          },
          {
            scene: 'Superlativo absoluto',
            lines: [['', 'Este livro é ___! (lindo)']],
            options: ['mais lindo', 'o mais lindo', 'lindíssimo', 'menos lindo'],
            answer: 'lindíssimo',
            explain: 'Superlativo absoluto: adjetivo + -íssimo.',
          },
          {
            scene: 'Irregular: bom',
            lines: [['', 'Esta é a ___ comida do Brasil.']],
            options: ['mais boa', 'boa mais', 'melhor', 'ótima'],
            answer: 'melhor',
            explain: 'Irregular: bom → melhor (comparativo).',
          },
          {
            scene: 'Irregular: malo',
            lines: [['', 'Este é o ___ filme que vi.']],
            options: ['mais mau', 'pior', 'mauíssimo', 'menos mau'],
            answer: 'pior',
            explain: 'Irregular: mau → pior (superlativo relativo).',
          },
          {
            scene: 'Irregular: grande',
            lines: [['', 'O Brasil é ___ que Portugal.']],
            options: ['mais grande', 'maior', 'grandíssimo', 'menos grande'],
            answer: 'maior',
            explain: 'Irregular: grande → maior (comparativo).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Comparativos vs superlativos',
        tag: '2 decisiones',
        intro: 'Completa frases distinguiendo comparativo de superlativo.',
        type: 'dual',
        items: [
          {
            scene: 'Comparativo y superlativo',
            lines: [['', "Este livro é [[0]] que aquele. Mas este é o [[1]] de todos."]],
            blanks: [
              { options: ['mais interessante que', 'o mais interessante', 'interessantíssimo'], answer: 'mais interessante que', explain: 'Comparativo: mais...que.' },
              { options: ['mais interessante', 'o mais interessante', 'interessantíssimo'], answer: 'o mais interessante', explain: 'Superlativo relativo: o mais.' },
            ],
          },
          {
            scene: 'Igualdad y superlativo',
            lines: [['', "Você é [[0]] quanto eu. Pero ela é [[1]]."]],
            blanks: [
              { options: ['tão bonito quanto', 'mais bonito que', 'belíssimo'], answer: 'tão bonito quanto', explain: 'Igualdad: tão...quanto.' },
              { options: ['mais bonita', 'a mais bonita', 'belíssima'], answer: 'belíssima', explain: 'Superlativo absoluto: -íssimo.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Comparaciones en narrativa',
        tag: 'Texto guiado',
        intro: 'Completa un texto comparando elementos.',
        type: 'guidedText',
        scene: 'Descripción comparativa de objetos o personas.',
        text: 'Este smartphone é [[0]] que aquele (novo). A bateria é [[1]] (durável). É também o [[2]] da marca. O design é [[3]] que o anterior. Mas [[4]] de tudo é o preço.',
        blanks: [
          { options: ['mais novo que', 'o mais novo', 'novíssimo'], answer: 'mais novo que', explain: 'Comparativo.' },
          { options: ['mais durável', 'a mais durável', 'duríssima'], answer: 'a mais durável', explain: 'Superlativo relativo.' },
          { options: ['mais inovador', 'o mais inovador', 'inovadíssimo'], answer: 'o mais inovador', explain: 'Superlativo relativo.' },
          { options: ['tão bonito quanto', 'mais bonito que', 'bonito'], answer: 'mais bonito que', explain: 'Comparativo.' },
          { options: ['mejor', 'lo mejor', 'lo mas bueno'], answer: 'melhor', explain: 'Irregular: mejor (mejor forma).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escritura comparativa',
        tag: 'Texto libre',
        intro: 'Escribe frases comparando dos cosas.',
        type: 'freeText',
        scene: 'Comparación personal de objetos o experiencias.',
        text: '1. [[0]] (Este es más caro que aquél). 2. [[1]] (Esa es tan bonita como ésta). 3. [[2]] (La mejor opción). 4. [[3]] (Absolutamente hermosísimo).',
        blanks: [
          { answer: 'Este é mais caro que aquele', accepted: ['Este é mais caro'], explain: 'Comparativo de superioridad.' },
          { answer: 'Essa é tão bonita quanto esta', accepted: ['tão bonita quanto'], explain: 'Comparativo de igualdad.' },
          { answer: 'A melhor opção', accepted: ['melhor', 'o melhor'], explain: 'Superlativo irregular.' },
          { answer: 'Absolutamente belíssimo', accepted: ['belíssimo', 'lindíssimo'], explain: 'Superlativo absoluto.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción de comparaciones',
        tag: 'Producción',
        intro: 'Escribe 3+ comparaciones sobre personas u objetos.',
        type: 'write',
        items: [
          {
            scene: 'Análisis comparativo',
            prompt: 'Compara dos idiomas: cuál es más fácil, cuál es el más útil, cuál es más bonito. Usa comparativos y superlativos.',
            answer: 'El portugués es más fácil que el chino. El inglés es el más útil internacionalmente. Pero el portugués es bellísimo.',
            accepted: ['más fácil que', 'el más útil', 'bellísimo'],
            explain: 'Comparativos y superlativos en contexto descriptivo.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de formas irregulares',
        tag: 'Análise',
        intro: 'Explica por qué ciertos adjetivos son irregulares.',
        type: 'write',
        items: [
          {
            scene: 'Justificación histórica',
            prompt: '¿Por qué "bom" → "melhor" es irregular y no "mais bom"? ¿De dónde vienen estos irregulares?',
            answer: '"Melhor" viene del latín "melior". Los irregulares son restos de formas latinas arcaicas que se mantuvieron en portugués. "Más bom" no existe porque "melhor" ya ocupó ese espacio gramatical.',
            accepted: ['latín', 'arcaico', 'histórico', 'etimología'],
            explain: 'Los irregulares tienen origen histórico en el latín romance.',
          },
        ],
      },
    ],
  },
}

export default topic
