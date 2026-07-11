import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'genitiv-b1',
  order: '10',
  color: '#1a2ecc',
  category: 'Casos',
  level: 'B1',
  title: 'Der Genitiv — El caso genitivo en alemán B1',
  shortTitle: 'Genitiv',
  metaTitle: 'El Genitivo en alemán B1 — posesión, wegen, trotz y während',
  description:
    'El Genitiv expresa posesión y relación entre sustantivos ("de" en español). Los artículos cambian: des/der/des/der (M/F/N/Pl). Los sustantivos masculinos y neutros añaden -s o -es. Es también el caso de preposiciones como wegen, trotz, während, innerhalb y aufgrund.',
  lead: 'Aprende el Genitivo alemán: posesión, artículos, terminaciones del sustantivo y preposiciones que rigen este caso.',
  outcomes: [
    'Formas el Genitivo correctamente con los artículos des/der/des/der',
    'Añades -s o -es a los sustantivos masculinos y neutros según la regla',
    'Usas las preposiciones de Genitivo más frecuentes: wegen, trotz, während',
    'Distingues el Genitivo formal del coloquial "von + Dativ"',
  ],

  guide: {
    goal: 'Expresar posesión y relación usando el Genitivo, y manejar las preposiciones que lo rigen.',
    model: 'Das Auto meines Vaters. / Wegen des Regens bleiben wir zu Hause. / Während der Arbeit höre ich Musik.',
    formula: 'des (M/N) + Substantiv-s/es | der (F/Pl) + Substantiv | wegen/trotz/während/innerhalb + Genitiv',
    decisions: [
      'Masculino: des + Substantiv-es/-s. Monosílabos → -es: des Mannes. Polisílabos → -s: des Lehrers.',
      'Neutro: igual que masculino. des Kindes / des Computers.',
      'Femenino: der (sin terminación en el sustantivo). der Frau / der Schule.',
      'Plural: der (sin terminación adicional). der Kinder / der Lehrer.',
      'Preposiciones con Genitivo: wegen (a causa de), trotz (a pesar de), während (durante), innerhalb (dentro de), außerhalb (fuera de), aufgrund (debido a), anstatt (en lugar de).',
      'En el habla coloquial se puede reemplazar el Genitivo por "von + Dativ": das Auto meines Vaters → das Auto von meinem Vater.',
    ],
    table: [
      ['Género', 'Artículo Genitivo', 'Ejemplo'],
      ['Masculino', 'des + -(e)s', 'das Auto des Vater-s'],
      ['Femenino', 'der (sin cambio)', 'die Tasche der Lehrerin'],
      ['Neutro', 'des + -(e)s', 'das Zimmer des Kind-es'],
    ],
    mistakes: [
      '"wegen dem Regen" ❌ → "wegen des Regens" ✓ — wegen rige Genitivo (aunque coloquialmente se usa Dativ).',
      '"des Frau" ❌ → "der Frau" ✓ — femenino en Genitivo: der.',
      '"des Mann" ❌ → "des Mannes" ✓ — masculino monosílabo: -es.',
    ],
  },

  seo: [
    {
      heading: '¿Para qué sirve el Genitivo en alemán?',
      paragraphs: [
        'El Genitivo en alemán cumple principalmente dos funciones: expresar posesión o relación entre dos sustantivos (equivale al "de" español) y acompañar a ciertas preposiciones. En lenguaje formal y escrito es imprescindible; en el habla cotidiana se suele sustituir por "von + Dativ".',
        'Ejemplos de posesión: Das Haus meiner Schwester (La casa de mi hermana). Das Büro des Direktors (La oficina del director). El Genitivo también aparece en expresiones fijas y frases literarias del alemán.',
      ],
      table: [
        ['Preposición', 'Significado', 'Ejemplo'],
        ['wegen', 'a causa de', 'wegen des Wetters (a causa del tiempo)'],
        ['trotz', 'a pesar de', 'trotz der Kälte (a pesar del frío)'],
        ['während', 'durante', 'während der Nacht (durante la noche)'],
        ['innerhalb', 'dentro de', 'innerhalb der Stadt (dentro de la ciudad)'],
      ],
    },
    {
      heading: 'Cuándo añadir -s y cuándo -es al sustantivo',
      paragraphs: [
        'En masculino y neutro el sustantivo recibe una terminación de Genitivo: -es para palabras cortas o que terminan en sibilante (-s, -sch, -z, -tz, -x), y -s para palabras más largas.',
        'Ejemplos: des Tages (-es, monosílabo), des Hauses (-es, termina en -s), des Lehrers (-s, polisílabo), des Computers (-s, polisílabo). Las palabras femeninas y plurales no cambian.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Genitivo B1: des/der, terminaciones -s/-es, preposiciones wegen/trotz/während. Alternativa coloquial: von + Dativ.',
    graphicPrompt: 'Árbol genealógico con flechas de posesión: "Das Auto des Vaters, die Tasche der Mutter..."',
    scene: [
      ['Das ist das Auto meines Vaters.', 'Ese es el coche de mi padre.'],
      ['Die Tasche der Lehrerin ist schwer.', 'La bolsa de la profesora es pesada.'],
      ['Wegen des Regens bleiben wir drin.', 'A causa de la lluvia nos quedamos dentro.'],
      ['Trotz der Kälte geht sie spazieren.', 'A pesar del frío ella sale a pasear.'],
      ['Während der Pause esse ich einen Apfel.', 'Durante el descanso como una manzana.'],
      ['Das Zimmer des Kindes ist bunt.', 'La habitación del niño es colorida.'],
      ['Der Name der Straße ist lang.', 'El nombre de la calle es largo.'],
      ['Aufgrund des Problems mussten wir warten.', 'Debido al problema tuvimos que esperar.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['des/der Genitiv', 'terminación -s/-es', 'preposiciones de Genitivo', 'von + Dativ alternativo'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el artículo genitivo correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona el artículo en Genitivo correcto para cada sustantivo.',
        type: 'choice',
        items: [
          {
            scene: 'Posesión',
            lines: [['', 'Das Auto ___ Vaters ist neu. (mask.)']],
            options: ['des', 'der', 'dem', 'den'],
            answer: 'des',
            explain: 'Masculino en Genitivo → des.',
          },
          {
            scene: 'La bolsa',
            lines: [['', 'Die Tasche ___ Lehrerin ist schwer. (fem.)']],
            options: ['der', 'des', 'dem', 'die'],
            answer: 'der',
            explain: 'Femenino en Genitivo → der.',
          },
          {
            scene: 'La habitación',
            lines: [['', 'Das Zimmer ___ Kindes ist klein. (neutr.)']],
            options: ['des', 'der', 'dem', 'das'],
            answer: 'des',
            explain: 'Neutro en Genitivo → des.',
          },
          {
            scene: 'La lluvia',
            lines: [['', 'Wegen ___ Regens bleiben wir zu Hause. (mask.)']],
            options: ['des', 'dem', 'der', 'den'],
            answer: 'des',
            explain: 'wegen + Genitivo. Masculino → des.',
          },
          {
            scene: 'El frío',
            lines: [['', 'Trotz ___ Kälte gehen wir spazieren. (fem.)']],
            options: ['der', 'des', 'dem', 'die'],
            answer: 'der',
            explain: 'trotz + Genitivo. Femenino → der.',
          },
          {
            scene: 'La familia',
            lines: [['', 'Das Haus ___ Familie ist groß. (fem.)']],
            options: ['der', 'des', 'dem', 'die'],
            answer: 'der',
            explain: 'Familie es femenino → Genitivo: der.',
          },
          {
            scene: 'La clase',
            lines: [['', 'Während ___ Unterrichts darf man nicht sprechen. (mask.)']],
            options: ['des', 'der', 'dem', 'den'],
            answer: 'des',
            explain: 'während + Genitivo. Masculino (der Unterricht) → des.',
          },
          {
            scene: 'Los nombres',
            lines: [['', 'Die Namen ___ Kinder sind schön. (plural)']],
            options: ['der', 'des', 'dem', 'die'],
            answer: 'der',
            explain: 'Plural en Genitivo → der (sin cambio en el sustantivo).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Genitivo con preposiciones',
        tag: '2 espacios',
        intro: 'Completa con el artículo en Genitivo correcto en cada construcción.',
        type: 'dual',
        items: [
          {
            scene: 'Bicicleta y tráfico',
            lines: [['', 'Das ist das Fahrrad [[0]] Bruders. Er fährt damit wegen [[1]] Staus.']],
            blanks: [
              { options: ['des', 'der', 'dem', 'den'], answer: 'des', explain: 'Bruder es masculino → Genitivo: des Bruders.' },
              { options: ['des', 'der', 'dem', 'den'], answer: 'des', explain: 'Stau es masculino → wegen des Staus.' },
            ],
          },
          {
            scene: 'Historia triste',
            lines: [['', 'Das Ende [[0]] Geschichte ist traurig. Trotz [[1]] Traurigkeit lesen wir weiter.']],
            blanks: [
              { options: ['der', 'des', 'dem', 'die'], answer: 'der', explain: 'Geschichte es femenino → Genitivo: der Geschichte.' },
              { options: ['der', 'des', 'dem', 'die'], answer: 'der', explain: 'Traurigkeit es femenino → trotz der Traurigkeit.' },
            ],
          },
          {
            scene: 'En la oficina',
            lines: [['', 'Das Büro [[0]] Direktors ist groß. Während [[1]] Meetings spricht er viel.']],
            blanks: [
              { options: ['des', 'der', 'dem', 'den'], answer: 'des', explain: 'Direktor es masculino → des Direktors.' },
              { options: ['des', 'der', 'dem', 'den'], answer: 'des', explain: 'Meeting es neutro → während des Meetings.' },
            ],
          },
          {
            scene: 'La cantante',
            lines: [['', 'Die Stimme [[0]] Sängerin ist wunderschön. Wegen [[1]] Konzerts kommt sie früh.']],
            blanks: [
              { options: ['der', 'des', 'dem', 'die'], answer: 'der', explain: 'Sängerin es femenino → der Sängerin.' },
              { options: ['des', 'der', 'dem', 'den'], answer: 'des', explain: 'Konzert es neutro → wegen des Konzerts.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un día en la ciudad',
        tag: 'Texto guiado',
        intro: 'Completa el texto con los artículos de Genitivo correctos.',
        type: 'guidedText',
        scene: 'Descripción de una vecina y su barrio.',
        text: 'Die Wohnung [[0]] Freundin liegt im Zentrum. Das Dach [[1]] Gebäudes ist alt. Wegen [[2]] Lärms schläft sie schlecht. Trotz [[3]] Problems bleibt sie dort. Während [[4]] Woche fährt sie mit dem Bus.',
        blanks: [
          { options: ['der', 'des', 'dem', 'die'], answer: 'der', explain: 'Freundin es femenino → der Freundin.' },
          { options: ['des', 'der', 'dem', 'das'], answer: 'des', explain: 'Gebäude es neutro → des Gebäudes.' },
          { options: ['des', 'der', 'dem', 'den'], answer: 'des', explain: 'Lärm es masculino → wegen des Lärms.' },
          { options: ['des', 'der', 'dem', 'das'], answer: 'des', explain: 'Problem es neutro → trotz des Problems.' },
          { options: ['der', 'des', 'dem', 'die'], answer: 'der', explain: 'Woche es femenino → während der Woche.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Von + Dativ → Genitivo',
        tag: 'Texto libre',
        intro: 'Transforma las construcciones coloquiales con "von" al Genitivo formal.',
        type: 'freeText',
        scene: 'Escribe la forma de Genitivo formal.',
        text: 'Das Auto von meinem Vater → [[0]] / Die Wohnung von der Lehrerin → [[1]] / Das Spielzeug von dem Kind → [[2]] / Der Name von dem Hund → [[3]] / Wegen dem Regen (formal) → [[4]]',
        blanks: [
          { answer: 'Das Auto meines Vaters', explain: 'Posesivo "mein" en Genitivo Masc. → meines Vaters.' },
          { answer: 'Die Wohnung der Lehrerin', explain: 'Femenino Genitivo: der Lehrerin.' },
          { answer: 'Das Spielzeug des Kindes', explain: 'Neutro Genitivo: des Kindes (-es, monosílabo).' },
          { answer: 'Der Name des Hundes', explain: 'Masculino Genitivo: des Hundes (-es, monosílabo).' },
          { answer: 'wegen des Regens', explain: 'wegen + Genitivo formal: Regen (masc.) → des Regens.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Genitivo en contexto',
        tag: 'Producción guiada',
        intro: 'Escribe frases usando el Genitivo correctamente.',
        type: 'write',
        items: [
          {
            scene: 'Tu familia',
            prompt: 'Escribe 3 frases describiendo objetos de personas de tu familia usando el Genitivo.',
            answer: 'Das Auto meines Vaters ist silber. Die Handtasche meiner Mutter ist braun. Das Fahrrad meines Bruders ist neu.',
            explain: 'Posesivos en Genitivo: meines (M/N), meiner (F).',
          },
          {
            scene: 'Preposiciones',
            prompt: 'Usa 3 preposiciones de Genitivo (wegen, trotz, während) en frases completas.',
            answer: 'Wegen des Wetters bleiben wir zu Hause. Trotz der Kälte gehen wir spazieren. Während der Pause esse ich einen Apfel.',
            explain: 'Cada preposición rige un artículo de Genitivo (des/der según género).',
          },
          {
            scene: 'La regla',
            prompt: 'Explica cuándo se añade -es y cuándo solo -s al sustantivo en Genitivo.',
            answer: '-es: Wörter mit einer Silbe (des Mannes, des Tages, des Hauses). -s: längere Wörter (des Lehrers, des Computers, des Direktors).',
            explain: 'Regla simple: monosílabos y palabras terminadas en sibilante → -es; demás → -s.',
          },
          {
            scene: 'Alternativa coloquial',
            prompt: 'Escribe la alternativa con "von" para: "Das Büro des Direktors" y "Die Tasche der Studentin".',
            answer: 'Das Büro von dem Direktor / vom Direktor. Die Tasche von der Studentin.',
            explain: '"von + Dativ" es la alternativa coloquial al Genitivo formal.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Genitivo en uso real',
        tag: 'Escritura libre',
        intro: 'Usa el Genitivo en textos más largos y complejos.',
        type: 'write',
        items: [
          {
            scene: 'Tu ciudad',
            prompt: 'Escribe un párrafo de 5 oraciones describiendo una ciudad usando el Genitivo al menos 4 veces (edificios, calles, gente).',
            answer: '',
            explain: 'Usa des/der según el género de los sustantivos involucrados.',
          },
          {
            scene: 'Argumentación',
            prompt: 'Escribe 3 razones por las que haces o no haces algo, usando wegen, trotz y aufgrund con Genitivo.',
            answer: '',
            explain: 'wegen/trotz/aufgrund + des/der + sustantivo (con terminación -s/-es si masc./neutr.)',
          },
          {
            scene: 'Análisis lingüístico',
            prompt: '¿En qué situaciones prefiere el alemán hablado "von + Dativ" en lugar del Genitivo? Da ejemplos de ambas formas.',
            answer: '',
            explain: 'Formal/escrito → Genitivo. Coloquial/oral → von + Dativ.',
          },
        ],
      },
    ],
  },
}

export default topic
