import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'numeros-contadores',
  order: '13',
  color: '#dc2626',
  category: 'Números',
  level: 'A1',
  title: 'Números y contadores en japonés A1 — 1 al 100 y clasificadores',
  shortTitle: 'Números y contadores',
  metaTitle: 'Números japonés A1 — contadores tsu hon mai satsu nin',
  description:
    'Los números japoneses del 1 al 100 combinan una serie base (一, 二, 三...) con decenas formadas por multiplicación (二十=20, 三十=30). La singularidad más sorprendente es el sistema de CONTADORES: en japonés no se dice "tres libros" sino "tres [contador de libros] libros". El contador varía según la forma del objeto: 〜つ (objetos generales), 〜本 (hon, cilíndricos), 〜枚 (mai, planos), 〜冊 (satsu, libros), 〜人 (nin/ri, personas).',
  lead: '一(ichi), 二(ni), 三(san)... pero para contar objetos necesitas el contador correcto: 本を 三冊(sansatsu) ください (tres libros por favor). La forma del objeto determina el contador — ¡es obligatorio en japonés!',
  outcomes: [
    'Lee y escribe los números del 1 al 100 en japonés con su lectura correcta',
    'Usa los contadores principales: 〜つ, 〜個, 〜本, 〜枚, 〜冊, 〜人',
    'Reconoce las pronunciaciones irregulares de 一人 (hitori) y 二人 (futari)',
  ],

  guide: {
    goal: 'Contar objetos en japonés usando el contador correcto según la forma o categoría del objeto.',
    model: 'えんぴつを 三本(さんぼん) ください。(Tres lápices por favor.) / ほんが 二冊(にさつ) あります。(Hay dos libros.)',
    formula: '[número] + [contador] + [nombre del objeto] o [nombre del objeto] + [número+contador]',
    decisions: [
      '〜つ (tsu) → objetos generales 1-9: ひとつ, ふたつ, みっつ, よっつ, いつつ, むっつ, ななつ, やっつ, ここのつ',
      '〜個 (ko) → objetos pequeños redondeados: いっこ(1個), にこ(2個), さんこ(3個)',
      '〜本 (hon/bon/pon) → cilíndricos (lápiz, botella, árbol, pierna): 一本, 二本, 三本',
      '〜枚 (mai) → planos delgados (papel, plato, ropa): 一枚, 二枚, 三枚',
      '〜冊 (satsu) → libros y cuadernos: 一冊, 二冊, 三冊',
      '〜人 (nin) → personas: excepción 一人=ひとり, 二人=ふたり, desde 三人=さんにん',
    ],
    table: [
      ['Contador', 'Uso', 'Ejemplo (1, 2, 3)'],
      ['〜つ (tsu)', 'Objetos generales (1-9)', 'ひとつ, ふたつ, みっつ'],
      ['〜個 (ko)', 'Objetos pequeños/redondos', 'いっこ, にこ, さんこ'],
      ['〜本 (hon)', 'Objetos cilíndricos', 'いっぽん, にほん, さんぼん'],
      ['〜枚 (mai)', 'Objetos planos y delgados', 'いちまい, にまい, さんまい'],
      ['〜冊 (satsu)', 'Libros y cuadernos', 'いっさつ, にさつ, さんさつ'],
      ['〜人 (nin/ri)', 'Personas', 'ひとり, ふたり, さんにん'],
    ],
    mistakes: [
      '一本 NO es "いちほん" — es "いっぽん" (ipppon). Los contadores cambian la pronunciación del número.',
      '一人 = ひとり (hitori), 二人 = ふたり (futari) — son irregulares, no siguen la regla general.',
      '〜つ solo funciona del 1 al 9 — para 10 en adelante usa 〜個 u otro contador específico.',
    ],
  },
  seo: [
    {
      heading: '¿Cuáles son los dos sistemas de números en japonés?',
      paragraphs: [
        'El japonés tiene dos sistemas numéricos: el chino-japonés (一/いち, 二/に, 三/さん...) que es el más usado, y el japonés nativo (ひとつ, ふたつ, みっつ...) que se usa principalmente con el contador 〜つ para objetos generales del 1 al 9. Para números grandes, siempre usarás el sistema chino-japonés: 十(jū=10), 百(hyaku=100), 千(sen=1000).',
        'La estructura del 11 al 99 es predecible: 十一(jūichi=11), 二十(nijū=20), 三十五(sanjūgo=35). No hay palabras especiales para 11, 12, 20, etc. — todo es multiplicación y suma. Esta regularidad hace que los números sean más fáciles de memorizar que en español (once, doce, trece...).',
      ],
    },
    {
      heading: '¿Por qué los contadores japoneses son obligatorios?',
      paragraphs: [
        'En japonés, no puedes decir simplemente "tres libros" — necesitas el contador 冊 (satsu): 三冊の本 (sansatsu no hon). El sistema de contadores clasifica los objetos por su forma física: los cilíndricos usan 本 (hon), los planos usan 枚 (mai), los libros usan 冊 (satsu). Esta categorización refleja una forma diferente de conceptualizar los objetos en el mundo.',
        'La buena noticia para principiantes: en situaciones informales, el contador 〜つ funciona para casi cualquier objeto del 1 al 9. Es como un "contador comodín" que los japoneses también usan cuando no están seguros. A medida que avanzas, vas incorporando los contadores específicos de forma natural.',
      ],
    },
    {
      heading: '¿Cuáles son los contadores más usados en japonés A1?',
      paragraphs: [
        'Para contar objetos se pega un contador al número, y el que se elige depende de la forma del objeto. Los básicos de A1: 〜つ (hitotsu, futatsu, mittsu... para objetos generales, hasta 10), 〜人 (nin, personas: ひとり, ふたり, さんにん), 〜枚 (mai, cosas planas: hojas, billetes), 〜本 (hon, cosas largas: bolígrafos, botellas), 〜個 (ko, cosas pequeñas y redondas) y 〜歳 (sai, edad). Hay lecturas irregulares que se memorizan: ひとり/ふたり para 1 y 2 personas, 一本 いっぽん, 二十歳 はたち (20 años). La trampa para el hispanohablante es que en español basta el número ("tres libros"), pero en japonés NO se puede contar sin contador: hay que decir 本を三冊 (tres volúmenes de libro), eligiendo el contador correcto según el objeto.',
      ],
    },
  ],
  visual: {
    mode: 'numbers-counters',
    teacherLens: 'El estudiante aprende los números 1-100 y los cinco contadores más frecuentes con su lógica de clasificación.',
    graphicPrompt: 'Tabla de números 1-10 con dos lecturas. Iconos de objetos con su contador: lápiz→本, papel→枚, libro→冊, persona→人.',
    scene: [
      ['一〜十 (ichi〜jū)', 'números base'],
      ['〜つ (tsu) comodín', 'ひとつ, ふたつ, みっつ (1-9)'],
      ['〜本/枚/冊/人', 'contadores por forma'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['números 1-100', 'contador 〜つ para objetos generales', '〜本 cilíndricos', '一人/二人 irregulares'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Números y lecturas',
        tag: 'Opción múltiple',
        intro: 'Elige la lectura correcta del número o contador.',
        type: 'choice',
        items: [
          {
            scene: 'Lápices',
            lines: [['Carlos', 'えんぴつを ___ ください。(Tres lápices por favor.)']],
            options: ['さんぼん', 'さんほん', 'みっつ', 'さんまい'],
            answer: 'さんぼん',
            explain: 'えんぴつ (lápiz) = cilíndrico → 〜本 (hon). 三本 = さんぼん (la h cambia a b). Cilíndrico → 〜本.',
          },
          {
            scene: 'Hojas de papel',
            lines: [['Ana', 'かみを ___ ください。(Dos hojas de papel por favor.)']],
            options: ['にまい', 'ふたつ', 'にほん', 'にさつ'],
            answer: 'にまい',
            explain: 'かみ (papel) = plano → 〜枚 (mai). 二枚 = にまい. Objetos planos y delgados → 〜枚.',
          },
          {
            scene: 'Libros',
            lines: [['Iván', 'ほんが ___ あります。(Hay un libro.)']],
            options: ['いっさつ', 'いちまい', 'いっぽん', 'ひとつ'],
            answer: 'いっさつ',
            explain: 'ほん (libro) = 〜冊 (satsu). 一冊 = いっさつ. Libros y cuadernos → 〜冊.',
          },
          {
            scene: 'Personas',
            lines: [['Sofia', 'きょうしつに がくせいが ___ います。(Hay dos estudiantes en el aula.)']],
            options: ['ふたり', 'にほん', 'にまい', 'にこ'],
            answer: 'ふたり',
            explain: '二人 = ふたり (futari). ¡Irregular! 一人=ひとり, 二人=ふたり. Personas → 〜人.',
          },
          {
            scene: 'Naranjas',
            lines: [['Marco', 'みかんを ___ たべました。(Comí tres mandarinas.)']],
            options: ['みっつ', 'さんほん', 'さんまい', 'さんにん'],
            answer: 'みっつ',
            explain: 'みかん (mandarina) = objeto pequeño/redondo. Sin contador específico → 〜つ (comodín). みっつ = tres.',
          },
          {
            scene: 'Número',
            lines: [['Lina', '三十五 を よんでください。']],
            options: ['さんじゅうご', 'さんごじゅう', 'じゅうさんご', 'ごじゅうさん'],
            answer: 'さんじゅうご',
            explain: '三十五 = 3×10+5 = さんじゅうご (sanjūgo = 35). Tens = número × じゅう.',
          },
          {
            scene: 'Camisetas',
            lines: [['Elena', 'Tシャツを ___ かいました。(Compré cuatro camisetas.)']],
            options: ['よんまい', 'よんぼん', 'よっつ', 'よんにん'],
            answer: 'よんまい',
            explain: 'Tシャツ (camiseta) = ropa plana → 〜枚 (mai). 四枚 = よんまい.',
          },
          {
            scene: 'Botellas',
            lines: [['Carlos', 'みずを ___ のみました。(Bebí dos botellas de agua.)']],
            options: ['にほん', 'にまい', 'ふたつ', 'にさつ'],
            answer: 'にほん',
            explain: 'ボトル/びん (botella) = cilíndrico → 〜本 (hon). 二本 = にほん.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Contador y número',
        tag: '2 espacios',
        intro: 'Completa el número y el contador correcto.',
        type: 'dual',
        items: [
          {
            scene: 'En la librería',
            lines: [['Ana', 'ほんを [[0]][[1]] かいました。(Compré tres libros.)']],
            blanks: [
              { options: ['さん', 'に', 'ご'], answer: 'さん', explain: 'さん (san) = tres (3).' },
              { options: ['さつ', 'まい', 'ほん'], answer: 'さつ', explain: '〜冊 (satsu) para libros. 三冊 = さんさつ.' },
            ],
          },
          {
            scene: 'En la clase',
            lines: [['Iván', 'きょうしつに がくせいが [[0]][[1]] います。(Hay cinco estudiantes.)']],
            blanks: [
              { options: ['ご', 'ろく', 'に'], answer: 'ご', explain: 'ご (go) = cinco (5).' },
              { options: ['にん', 'まい', 'ほん'], answer: 'にん', explain: '〜人 (nin) para personas. 五人 = ごにん.' },
            ],
          },
          {
            scene: 'Comprando lápices',
            lines: [['Sofia', 'えんぴつを [[0]][[1]] ください。(Dos lápices por favor.)']],
            blanks: [
              { options: ['に', 'さん', 'いち'], answer: 'に', explain: 'に (ni) = dos (2).' },
              { options: ['ほん', 'まい', 'さつ'], answer: 'ほん', explain: '〜本 (hon) para cilíndricos. 二本 = にほん.' },
            ],
          },
          {
            scene: 'Papeles en el escritorio',
            lines: [['Marco', 'つくえに かみが [[0]][[1]] あります。(Hay cuatro hojas de papel.)']],
            blanks: [
              { options: ['よん', 'し', 'ご'], answer: 'よん', explain: 'よん (yon) = cuatro (4). し también es correcto pero よん es más común en contadores.' },
              { options: ['まい', 'ほん', 'さつ'], answer: 'まい', explain: '〜枚 (mai) para objetos planos. 四枚 = よんまい.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado — la mochila de Carlos',
        tag: 'Opciones',
        intro: 'Elige el contador correcto para cada objeto.',
        type: 'guidedText',
        scene: 'Carlos describe lo que tiene en su mochila para clase de japonés',
        text: 'かばんの なかに ほんが [[0]] あります。ノートも [[1]] あります。えんぴつが [[2]] と ボールペンが [[3]] あります。あと、かみが [[4]] あります。きょうは ウィーラーンで [[5]] べんきょうします。',
        blanks: [
          { options: ['いっさつ', 'いちまい', 'いっぽん'], answer: 'いっさつ', explain: 'ほん (libro) → 〜冊 (satsu). 一冊 = いっさつ.' },
          { options: ['にさつ', 'にまい', 'にほん'], answer: 'にさつ', explain: 'ノート (cuaderno) → 〜冊 (satsu). 二冊 = にさつ.' },
          { options: ['さんぼん', 'さんまい', 'みっつ'], answer: 'さんぼん', explain: 'えんぴつ (lápiz, cilíndrico) → 〜本. 三本 = さんぼん.' },
          { options: ['いっぽん', 'いちまい', 'ひとつ'], answer: 'いっぽん', explain: 'ボールペン (bolígrafo, cilíndrico) → 〜本. 一本 = いっぽん.' },
          { options: ['ごまい', 'ごほん', 'ごさつ'], answer: 'ごまい', explain: 'かみ (papel, plano) → 〜枚 (mai). 五枚 = ごまい.' },
          { options: ['ひとり', 'いちにん', 'ひとつ'], answer: 'ひとり', explain: '一人 (una persona = yo) = ひとり (hitori). Irregular.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe el número + contador correcto.',
        type: 'freeText',
        scene: 'Lina hace el inventario de la clase de WeLearn',
        text: 'つくえが [[0]] (10) あります。いすも [[1]] (10) あります。ほんが [[2]] (5 libros) あります。えんぴつが [[3]] (3 lápices) あります。せんせいが [[4]] (2 profesores) います。がくせいが [[5]] (7 personas) います。',
        blanks: [
          { answer: 'じゅっこ', accepted: ['じゅうこ', '十こ'], explain: '机 (escritorio): objeto → 〜個. 十個 = じゅっこ.' },
          { answer: 'じゅっこ', accepted: ['じゅうこ', '十こ'], explain: 'いす (silla): objeto → 〜個. 十個 = じゅっこ.' },
          { answer: 'ごさつ', accepted: ['五冊'], explain: 'ほん (libros) → 〜冊. 五冊 = ごさつ.' },
          { answer: 'さんぼん', accepted: ['三本'], explain: 'えんぴつ (lápices, cilíndricos) → 〜本. 三本 = さんぼん.' },
          { answer: 'ふたり', accepted: ['二人'], explain: '先生 (profesores, personas) → 〜人. 二人 = ふたり. ¡Irregular!' },
          { answer: 'ななにん', accepted: ['七人', 'しちにん'], explain: 'がくせい (estudiantes) → 〜人. 七人 = ななにん.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción con contadores',
        tag: 'Producción',
        intro: 'Escribe la frase con el número y contador correcto.',
        type: 'write',
        items: [
          {
            scene: 'Comprando libros',
            prompt: 'Escribe: Quiero tres libros. → ほんを ___ ください。',
            answer: 'ほんを さんさつ ください。',
            accepted: ['ほんを さんさつ ください', 'ほんを 三冊 ください'],
            explain: '本 (libro) → 〜冊. 三冊 = さんさつ. Cilíndrico → ✗ hon; libro → ○ satsu.',
          },
          {
            scene: 'Hay dos personas',
            prompt: 'Escribe: Hay dos personas en el aula. → きょうしつに ひとが ___ います。',
            answer: 'きょうしつに ひとが ふたり います。',
            accepted: ['きょうしつに ひとが ふたり います', 'きょうしつに 二人 います'],
            explain: '二人 = ふたり. ¡Irregular! No es "にじん" sino "ふたり".',
          },
          {
            scene: 'Papel y lápiz',
            prompt: 'Escribe: Un papel y un lápiz. → かみが ___ と えんぴつが ___。',
            answer: 'かみが いちまい と えんぴつが いっぽん。',
            accepted: ['かみが いちまい と えんぴつが いっぽん', 'かみ一枚とえんぴつ一本'],
            explain: 'かみ (papel, plano) → 一枚 = いちまい. えんぴつ (lápiz, cilíndrico) → 一本 = いっぽん.',
          },
          {
            scene: 'Número grande',
            prompt: 'Escribe en japonés: 47 → ___',
            answer: 'よんじゅうなな',
            accepted: ['よんじゅうしち', '四十七'],
            explain: '47 = 4×10+7 = よんじゅう (40) + なな/しち (7) = よんじゅうなな.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión de inventario',
        tag: 'Reto final',
        intro: 'Describe objetos con el contador correcto en japonés.',
        type: 'write',
        items: [
          {
            scene: 'Tu escritorio',
            prompt: 'つくえに ___ (2 libros) と ___ (3 lápices) と ___ (5 papeles) があります。',
            answer: 'つくえに にさつ と さんぼん と ごまい があります。',
            accepted: ['つくえに にさつ と さんぼん と ごまい があります'],
            explain: '二冊(にさつ)=libros, 三本(さんぼん)=lápices, 五枚(ごまい)=papeles.',
          },
          {
            scene: 'Tu familia',
            prompt: 'わたしの かぞくは ___ (4 personas) います。(Mi familia tiene 4 personas.)',
            answer: 'わたしの かぞくは よにん います。',
            accepted: ['わたしの かぞくは よにん います', 'わたしの かぞくは よんにん います'],
            explain: '四人 = よにん (yonin). Personas → 〜人. よ o よん + にん.',
          },
          {
            scene: 'En la librería',
            prompt: 'ほんを ___ (1) と ノートを ___ (2) と えんぴつを ___ (5) かいました。',
            answer: 'ほんを いっさつ と ノートを にさつ と えんぴつを ごほん かいました。',
            accepted: ['ほんを いっさつ と ノートを にさつ と えんぴつを ごほん かいました'],
            explain: '本→一冊(いっさつ), ノート→二冊(にさつ), えんぴつ→五本(ごほん).',
          },
        ],
      },
    ],
  },
}

export default topic
