import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'conectivos-b1',
  order: '14',
  color: '#166534',
  category: 'Estructura del discurso',
  level: 'B1',
  title: 'Conectivos y Marcadores de Secuencia en Portugués B1',
  shortTitle: 'Conectivos',
  metaTitle: 'Conectivos y Marcadores de Secuencia Portugués B1 — Discurso Coherente y Estructura de Textos',
  description:
    'Los conectivos (también llamados marcadores de discurso o palabras de transición) son esenciales para unir ideas, organizar el texto y crear coherencia. En portugués incluyen palabras de secuencia (primeiramente, depois, finalmente), contraste (porém, entretanto, contudo), causalidad (porque, pois, portanto) y adición (além disso, também). Son fundamentales para el CELPE-Bras.',
  lead: 'Domina conectivos portugueses: secuencia, contraste, causa-efecto, adición. Estructura textos coherentes para B1.',
  outcomes: [
    'Usa marcadores de secuencia (primeiramente, depois, finalmente) correctamente',
    'Conecta ideas con palabras de contraste (porém, entretanto, contudo)',
    'Expresa causa-efecto con palabras adecuadas (porque, pois, portanto)',
    'Añade ideas con conectivos de adición (além disso, também, inclusive)',
  ],

  guide: {
    goal: 'Conectar ideas y estructurar discursos usando marcadores de transición para crear textos coherentes.',
    model: 'Primeiramente estudei inglês. Depois, comecei português. Finalmente, consegui trabalhar no exterior. Além disso, viajei por todo o Brasil.',
    formula: 'Conectivos de secuencia + Conectivos de contraste + Conectivos de causa-efecto + Conectivos de adición',
    decisions: [
      'Secuencia temporal: primeiramente/em primeiro lugar → depois/em seguida → finalmente/por fim',
      'Adición: além disso, também, inclusive, ainda mais, tampouco',
      'Contraste: porém, contudo, entretanto, no entanto, todavia (más formal)',
      'Causa-efecto: porque, pois (causa), portanto, logo, assim (consecuencia)',
      'Ejemplificación: por exemplo, como, tal como, nomeadamente',
      'Reformulación: ou seja, quer dizer, melhor dizendo, em outras palavras',
      'Conclusión: finalmente, em conclusão, em resumo, portanto',
    ],
    table: [
      ['Tipo', 'Conectivos', 'Ejemplo'],
      ['Secuencia', 'primeiramente, depois, finalmente', 'Primeiramente fui à universidade. Depois, trabalhei.'],
      ['Adición', 'além disso, também, inclusive', 'Ele é inteligente. Além disso, é criativo.'],
      ['Contraste', 'porém, contudo, entretanto', 'Estudei muito, porém não passei.'],
      ['Causa-efecto', 'porque, pois, portanto', 'Choveu, portanto não fomos ao parque.'],
      ['Ejemplificación', 'por exemplo, como, nomeadamente', 'Existem muitos idiomas, por exemplo, chinês e japonês.'],
    ],
    mistakes: [
      '"Porque, não posso ir." ❌ (conjunción al inicio sin coma) → "Porque não posso ir, não vou." ✓ (en la proposición causal).',
      '"Contudo, mas também..." ❌ (redundancia de dos conectivos) → "Contudo, também..." ✓ (uno solo).',
      '"Primeiramente de tudo..." ❌ (redundancia con tudo) → "Primeiramente,..." ✓ (sin tudo).',
    ],
  },

  seo: [
    {
      heading: '¿Qué son los conectivos en portugués?',
      paragraphs: [
        'Los conectivos (también llamados "palavras de transição" o "marcadores de discurso") son palabras o expresiones que sirven para conectar ideas, oraciones y párrafos. Hacen que el texto sea más coherente y fácil de seguir.',
        'En portugués, los conectivos son especialmente importantes para el CELPE-Bras, donde se evalúa la capacidad de estructurar textos complejos. Sin conectivos adecuados, el discurso parece fragmentado.',
      ],
    },
    {
      heading: 'Conectivos de secuencia y orden temporal',
      paragraphs: [
        'Sirven para ordenar eventos en el tiempo: "primeiramente" (primero), "em seguida" (después), "depois" (luego), "finalmente" (finalmente), "por fim" (al fin), "anteriormente" (antes).',
        'Ejemplo: "Primeiramente, chegamos em São Paulo. Em seguida, fomos ao Rio. Finalmente, voltamos para casa." Esta secuencia clara es valorada en CELPE-Bras.',
      ],
    },
    {
      heading: '¿Qué conectivos de contraste hay en portugués?',
      paragraphs: [
        'Expresan oposición entre ideas: "porém" (pero), "contudo" (sin embargo), "entretanto" (mientras tanto), "no entanto" (no obstante), "todavia" (aún así, muy formal).',
        'Diferencia de "mas" (pero conjunción simple) vs "porém" (conectivo formal). "Porém" es más formal y se usa en textos escritos: "Estudei muito, porém não passei" (pero/sin embargo, no pasé).',
      ],
    },
    {
      heading: '¿Cómo se expresan causa y consecuencia en portugués?',
      paragraphs: [
        'Para expresar relaciones lógicas: "porque" (porque), "pois" (pues, porque), "portanto" (por lo tanto), "logo" (luego, por lo tanto), "assim" (así, de este modo), "para que" (para que), "a fim de que" (a fin de que).',
        'Ejemplo de causa-efecto: "Choveu, portanto não fomos à praia" (Llovió, por lo tanto no fuimos a la playa). "Portanto" enlaza la causa con la consecuencia de manera clara.',
      ],
    },
    {
      heading: 'Conectivos de adición y elaboración',
      paragraphs: [
        'Sirven para añadir información: "além disso" (además), "também" (también), "inclusive" (incluso), "ainda mais" (aún más), "tampouco" (tampoco).',
        'En textos CELPE-Bras, estos conectivos son clave para desarrollar ideas: "Ele é inteligente. Além disso, é criativo. Ainda mais, fala três idiomas." La acumulación de ideas muestra profundidad de pensamiento.',
      ],
    },
    {
      heading: 'Conectivos de ejemplificación, reformulación y conclusión',
      paragraphs: [
        'Ejemplificación: "por exemplo" (por ejemplo), "como" (como), "nomeadamente" (específicamente), "tal como" (tal como). Reformulación: "ou seja" (o sea), "quer dizer" (quiero decir), "melhor dizendo" (mejor dicho), "em outras palavras" (en otras palabras).',
        'Conclusión: "em conclusão" (en conclusión), "em resumo" (en resumen), "finalmente" (finalmente), "portanto" (por lo tanto). Estos cierren textos: "Em conclusão, aprender português é essencial para trabalhar no Brasil."',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Conectivos: secuencia, contraste, causa-efecto, adición, ejemplificación, conclusión.',
    graphicPrompt: 'Mapa mental: 6 categorías de conectivos con ejemplos clave para estructura de textos.',
    scene: [
      ['Primeiramente, estudei inglês. Depois, português. Finalmente, consegui trabalhar.', 'Primero estudié inglés. Después, portugués. Finalmente, conseguí trabajar.'],
      ['Ele é inteligente. Além disso, é criativo. Inclusive, fala cinco idiomas.', 'Es inteligente. Además, es creativo. Incluso, habla cinco idiomas.'],
      ['Estudei muito, porém não passei. Contudo, vou tentar novamente.', 'Estudié mucho, pero no pasé. Sin embargo, intentaré de nuevo.'],
      ['Choveu, portanto não fomos ao parque. Logo, ficamos em casa.', 'Llovió, por lo tanto no fuimos al parque. Luego, nos quedamos en casa.'],
      ['Existem muitos idiomas, por exemplo, mandarim e japonês.', 'Existen muchos idiomas, por ejemplo, mandarín y japonés.'],
      ['Ele não viajou. Tampouco eu. Por fim, ficamos em casa.', 'Él no viajó. Tampoco yo. Finalmente, nos quedamos en casa.'],
      ['Ou seja, o português é essencial para oportunidades internacionais.', 'O sea, el portugués es esencial para oportunidades internacionales.'],
      ['Em conclusão, dominar conectivos melhora significativamente a escrita.', 'En conclusión, dominar conectivos mejora significativamente la escritura.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['secuencia', 'contraste', 'causa-efecto', 'adición'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Selecciona el conectivo correcto',
        tag: 'Múltipla escolha',
        intro: 'Elige el conectivo que mejor completa cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Secuencia temporal',
            lines: [['', 'Primeiramente fui à universidade. ___, trabalhei como engenheiro.']],
            options: ['Porque', 'Depois', 'Contudo', 'Ainda mais'],
            answer: 'Depois',
            explain: 'Después de primeiramente, necesitas un conectivo de secuencia: Depois.',
          },
          {
            scene: 'Adición',
            lines: [['', 'Ele é inteligente. ___, é muito criativo.']],
            options: ['Porém', 'Além disso', 'Porque', 'Finalmente'],
            answer: 'Além disso',
            explain: 'Para añadir otra característica: Além disso.',
          },
          {
            scene: 'Contraste',
            lines: [['', 'Estudei muito, ___ não passei no exame.']],
            options: ['também', 'portanto', 'porém', 'por exemplo'],
            answer: 'porém',
            explain: 'Para expresar contraste: porém (pero, sin embargo).',
          },
          {
            scene: 'Causa-efecto',
            lines: [['', 'Choveu muito, ___ não fomos ao parque.']],
            options: ['também', 'portanto', 'contudo', 'primeiramente'],
            answer: 'portanto',
            explain: 'Para expresar consecuencia: portanto (por lo tanto).',
          },
          {
            scene: 'Ejemplificación',
            lines: [['', 'Existem muitos idiomas no mundo, ___, chinês e árabe.']],
            options: ['entretanto', 'ou seja', 'por exemplo', 'finalmente'],
            answer: 'por exemplo',
            explain: 'Para dar ejemplos: por exemplo.',
          },
          {
            scene: 'Reformulación',
            lines: [['', 'Ele não tem tempo para estudar. ___, está ocupadíssimo com trabalho.']],
            options: ['Além disso', 'Ou seja', 'Finalmente', 'Porque'],
            answer: 'Ou seja',
            explain: 'Para reformular la idea: Ou seja (o sea).',
          },
          {
            scene: 'Conclusión',
            lines: [['', 'Estudei português por dois anos. Trabalhei com nativos. ___, agora sou fluente.']],
            options: ['Entretanto', 'Porém', 'Finalmente', 'Porque'],
            answer: 'Finalmente',
            explain: 'Para conclusión: Finalmente.',
          },
          {
            scene: 'Negación paralela',
            lines: [['', 'Ele não viajou. ___ eu. Ficamos em casa.']],
            options: ['Também', 'Tampouco', 'Além disso', 'Contudo'],
            answer: 'Tampouco',
            explain: 'Para negar en paralelo: Tampouco (tampoco).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Conectivos en contexto',
        tag: '2 decisiones',
        intro: 'Completa textos con dos conectivos diferentes.',
        type: 'dual',
        items: [
          {
            scene: 'Contraste y adición',
            lines: [['', "Viajei para Brasil em 2020. [[0]], covid me impediu de explorar. [[1]], passei por Brasília rapidamente."]],
            blanks: [
              { options: ['Entretanto', 'Além disso', 'Porque'], answer: 'Entretanto', explain: 'Contraste con la expectativa: Entretanto.' },
              { options: ['Finalmente', 'Apenas', 'Tampouco'], answer: 'Apenas', explain: 'Limitación (solo): Apenas.' },
            ],
          },
          {
            scene: 'Secuencia y conclusión',
            lines: [['', "[[0]] aprendi inglês. [[1]], português. [[2]], consegui trabalhar internacionalmente."]],
            blanks: [
              { options: ['Primeiramente', 'Logo', 'Contudo'], answer: 'Primeiramente', explain: 'Primer paso: Primeiramente.' },
              { options: ['Depois', 'Porém', 'Tampouco'], answer: 'Depois', explain: 'Segundo paso: Depois.' },
              { options: ['Finalmente', 'Entretanto', 'Porque'], answer: 'Finalmente', explain: 'Resultado final: Finalmente.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Construcción de párrafos',
        tag: 'Texto guiado',
        intro: 'Completa párrafo estructurado con conectivos.',
        type: 'guidedText',
        scene: 'Narración de un viaje con estructura clara.',
        text: 'Passei um mês em Portugal. [[0]] visitei Lisboa e vi a Torre de Belém. [[1]], explorei o Algarve, uma região muito bonita. [[2]], a culinária portuguesa é excelente. [[3]] disso, os preços são mais baixos que no Brasil. [[4]], recomendo Portugal para qualquer viajante interessado em cultura europeia.',
        blanks: [
          { options: ['Primeiramente', 'Depois', 'Logo'], answer: 'Primeiramente', explain: 'Inicio de secuencia: Primeiramente.' },
          { options: ['Em seguida', 'Contudo', 'Porque'], answer: 'Em seguida', explain: 'Continuación de secuencia: Em seguida.' },
          { options: ['Além disso', 'Porém', 'Portanto'], answer: 'Além disso', explain: 'Adición de información: Além disso.' },
          { options: ['Ainda mais', 'Finalmente', 'Logo'], answer: 'Ainda mais', explain: 'Énfasis adicional: Ainda mais.' },
          { options: ['Em conclusão', 'Entretanto', 'Porque'], answer: 'Em conclusão', explain: 'Cierre y conclusión: Em conclusão.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escritura con conectivos',
        tag: 'Texto libre',
        intro: 'Escribe frases conectadas con marcadores de transición.',
        type: 'freeText',
        scene: 'Descripción de un proceso o experiencia.',
        text: '1. [[0]] aprendi português. 2. [[1]], praticava diariamente. 3. [[2]], achei um trabalho em uma empresa brasileira. 4. [[3]], minha vida mudou completamente.',
        blanks: [
          { answer: 'Primeiramente', accepted: ['Primeiramente', 'Em primeiro lugar'], explain: 'Primer paso con conectivo de secuencia.' },
          { answer: 'Depois', accepted: ['Depois', 'Em seguida', 'A seguir'], explain: 'Segundo paso: Depois.' },
          { answer: 'Finalmente', accepted: ['Finalmente', 'Por fim'], explain: 'Resultado final: Finalmente.' },
          { answer: 'Portanto', accepted: ['Portanto', 'Logo'], explain: 'Conclusión lógica: Portanto.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción contextualizada',
        tag: 'Producción',
        intro: 'Escribe párrafo con 4+ conectivos sobre un tema.',
        type: 'write',
        items: [
          {
            scene: 'Narración estructurada',
            prompt: 'Escribe sobre un logro en tu vida: primero, qué querías; segundo, qué hiciste; tercero, cuál fue el resultado. Usa conectivos de secuencia.',
            answer: 'Primeiramente, queria aprender um novo idioma. Depois, comecei um curso intensivo. Finalmente, consegui conseguir um emprego internacional graças ao português.',
            accepted: ['Primeiramente', 'Depois', 'Finalmente', 'secuencia'],
            explain: 'Conectivos de secuencia estructuran la narración de manera clara.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de conectivos',
        tag: 'Análise',
        intro: 'Explica la función de los conectivos en un texto.',
        type: 'write',
        items: [
          {
            scene: 'Explicación funcional',
            prompt: '¿Por qué "Além disso" es mejor que "Também" en: "Ele é criativo. Além disso, fala português fluentemente"?',
            answer: '"Também" solo suma; "Além disso" suma Y enfatiza una relación más formal. "Além disso" es apropiado para CELPE-Bras por su tono más académico.',
            accepted: ['énfasis', 'formal', 'CELPE-Bras', 'estructurado'],
            explain: 'En portugués académico y de examen, la elección de conectivos refleja dominio del registro.',
          },
        ],
      },
    ],
  },
}

export default topic
