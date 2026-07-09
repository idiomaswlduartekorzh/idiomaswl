import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'adjektivdeklination-b1',
  order: '09',
  color: '#1a2ecc',
  category: 'Sustantivos',
  level: 'B1',
  title: 'Adjektivdeklination — Declinación de adjetivos en alemán B1',
  shortTitle: 'Adjektivdeklination',
  metaTitle: 'Adjektivdeklination B1 — Las 3 tablas de declinación de adjetivos en alemán',
  description:
    'Los adjetivos alemanes cambian sus terminaciones según el género del sustantivo, el caso gramatical y el tipo de determinante (definido, indefinido o sin artículo). Existen tres tipos de declinación: débil (tras der/die/das), mixta (tras ein/eine) y fuerte (sin artículo). Dominar estas terminaciones es esencial en B1.',
  lead: 'Domina las tres tablas de declinación de adjetivos alemanes: después de der/die/das, después de ein/eine, y sin artículo.',
  outcomes: [
    'Aplicas las terminaciones de la declinación débil tras artículo definido',
    'Usas la declinación mixta correctamente tras ein/eine y posesivos',
    'Reconoces cuándo aplicar la declinación fuerte (sin artículo)',
    'Produces descripciones correctas en los casos Nominativo, Acusativo y Dativo',
  ],

  guide: {
    goal: 'Añadir la terminación correcta al adjetivo según el artículo y el caso gramatical.',
    model: 'der alte Mann — ein alter Mann — alter Wein (sin artículo)',
    formula: 'Artículo definido → declinación débil (-e/-en) | Artículo indefinido → declinación mixta | Sin artículo → declinación fuerte',
    decisions: [
      'Tras artículo definido (der/die/das/dieser): el artículo ya marca el género → adjetivo toma terminación débil. Nominativo singular: -e para todos los géneros.',
      'Tras artículo indefinido (ein/eine/kein) o posesivos: en Nom. Masc. y Nom./Akk. Neutr. el artículo no marca el género → adjetivo suple esa info con terminación fuerte (-er/-es).',
      'Sin artículo: el adjetivo carga con toda la info de género/caso → terminaciones como las del artículo definido.',
      'Dativo siempre termina en -en (débil y mixta), sea cual sea el género.',
      'Acusativo: Masculino cambia (den alten → accusativ -en), femenino y neutro igual que Nominativo.',
    ],
    table: [
      ['Tipo / Caso', 'Masculino (Nom.)', 'Femenino (Nom.)'],
      ['Débil (der/die/das)', 'der alte Mann (-e)', 'die alte Frau (-e)'],
      ['Mixta (ein/eine)', 'ein alter Mann (-er)', 'eine alte Frau (-e)'],
      ['Fuerte (sin art.)', 'alter Wein (-er)', 'alte Milch (-e)'],
    ],
    mistakes: [
      '"ein alte Mann" ❌ → "ein alter Mann" ✓ — tras "ein" en Nom. Masc. el adjetivo toma -er (declinación mixta).',
      '"der neuen Auto" ❌ → "das neue Auto" ✓ — el artículo "das" (neutr.) va con -e en Nom. (declinación débil).',
      '"mit dem neues Lehrer" ❌ → "mit dem neuen Lehrer" ✓ — Dativo siempre -en.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo funcionan las tres declinaciones de adjetivos en alemán?',
      paragraphs: [
        'La idea central es simple: alguien tiene que marcar el género y el caso — o el artículo, o el adjetivo. Si el artículo ya lo hace (der/die/das), el adjetivo solo necesita una terminación "débil" (-e/-en). Si el artículo no marca el género (ein, kein en ciertos casos), el adjetivo tiene que hacerlo con una terminación "fuerte".',
        'En la práctica: memoriza que Dativo siempre da -en, que Nominativo/Acusativo fem./neutr. suelen dar -e, y que Nominativo Masc. con artículo indefinido da -er.',
      ],
      table: [
        ['Caso', 'Débil (def.)', 'Mixta (indef.)', 'Fuerte (sin art.)'],
        ['Nom. M', 'der alte Mann', 'ein alter Mann', 'alter Mann'],
        ['Nom. F', 'die alte Frau', 'eine alte Frau', 'alte Frau'],
        ['Nom. N', 'das alte Kind', 'ein altes Kind', 'altes Kind'],
        ['Dat. (todos)', '-en', '-en', '-em (M/N) / -er (F)'],
      ],
    },
    {
      heading: 'El Dativo: siempre -en en declinación débil y mixta',
      paragraphs: [
        'Una regla que simplifica mucho: en Dativo (después de mit, bei, von, aus, nach, seit, zu, gegenüber, y los artículos dem/der/dem) el adjetivo siempre termina en -en tanto en declinación débil como mixta.',
        'Ejemplos: mit dem alten Mann, mit einem alten Mann, mit der alten Frau, mit einem alten Kind. La única excepción real es la declinación fuerte: mit altem Wein (-em M/N), mit alter Milch (-er F).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Adjektivdeklination B1: tres tipos según el determinante. Dativo siempre -en. Nominativo mixto M: -er, N: -es.',
    graphicPrompt: 'Tres columnas con ejemplos de cada tipo de declinación, código de colores por terminación.',
    scene: [
      ['Der alte Mann trinkt Kaffee.', 'El hombre mayor toma café.'],
      ['Das ist ein neuer Film.', 'Esta es una película nueva.'],
      ['Ich trinke kalte Milch.', 'Bebo leche fría. (sin artículo)'],
      ['Mit dem alten Lehrer lerne ich viel.', 'Con el profesor mayor aprendo mucho.'],
      ['Sie wohnt in einer schönen Stadt.', 'Ella vive en una ciudad bonita.'],
      ['Ich kaufe frisches Brot.', 'Compro pan fresco. (sin artículo)'],
      ['Der neue Computer ist schnell.', 'El ordenador nuevo es rápido.'],
      ['Ich sehe einen großen Hund.', 'Veo un perro grande.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['declinación débil', 'declinación mixta', 'declinación fuerte', 'Dativo -en'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la terminación correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la terminación adecuada del adjetivo según el artículo y el caso.',
        type: 'choice',
        items: [
          {
            scene: 'Presentación',
            lines: [['', 'Das ist ein alt___ Mann.']],
            options: ['-er', '-e', '-en', '-em'],
            answer: '-er',
            explain: 'Tras "ein" en Nom. Masc. → declinación mixta: -er (el artículo no marca el género).',
          },
          {
            scene: 'La ciudad',
            lines: [['', 'Ich sehe die groß___ Stadt.']],
            options: ['-e', '-er', '-en', '-em'],
            answer: '-e',
            explain: 'Tras "die" en Akk. Fem. → declinación débil: -e.',
          },
          {
            scene: 'El apartamento',
            lines: [['', 'Er wohnt in einem klein___ Apartment.']],
            options: ['-en', '-er', '-e', '-em'],
            answer: '-en',
            explain: 'Dativo (in einem...) → siempre -en en declinación mixta.',
          },
          {
            scene: 'El profesor',
            lines: [['', 'Der jung___ Lehrer ist sehr nett.']],
            options: ['-e', '-er', '-en', '-em'],
            answer: '-e',
            explain: 'Tras "der" en Nom. Masc. → declinación débil: -e.',
          },
          {
            scene: 'Sin artículo',
            lines: [['', 'Ich trinke kalt___ Wasser.']],
            options: ['-es', '-e', '-er', '-en'],
            answer: '-es',
            explain: 'Sin artículo, Nom./Akk. Neutr. → declinación fuerte: -es.',
          },
          {
            scene: 'El vestido',
            lines: [['', 'Sie hat ein schön___ Kleid.']],
            options: ['-es', '-e', '-er', '-en'],
            answer: '-es',
            explain: 'Tras "ein" en Nom./Akk. Neutr. → declinación mixta: -es.',
          },
          {
            scene: 'Con el maestro',
            lines: [['', 'Mit dem neu___ Lehrer lerne ich viel.']],
            options: ['-en', '-er', '-e', '-em'],
            answer: '-en',
            explain: 'Dativo (mit dem...) → siempre -en en declinación débil.',
          },
          {
            scene: 'La solución',
            lines: [['', 'Das ist die best___ Lösung.']],
            options: ['-e', '-er', '-en', '-em'],
            answer: '-e',
            explain: 'Tras "die" en Nom. Fem. → declinación débil: -e.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos adjetivos en contexto',
        tag: '2 espacios',
        intro: 'Completa los dos adjetivos de cada oración con las terminaciones correctas.',
        type: 'dual',
        items: [
          {
            scene: 'El vecino',
            lines: [['', 'Der alt[[0]] Mann mit dem grün[[1]] Hut ist mein Nachbar.']],
            blanks: [
              { options: ['-e', '-en', '-er', '-em'], answer: '-e', explain: 'Nom. Masc. con "der" → débil: -e.' },
              { options: ['-en', '-er', '-e', '-em'], answer: '-en', explain: 'Dat. Masc. (dem Hut) → -en.' },
            ],
          },
          {
            scene: 'El hotel',
            lines: [['', 'Ich suche ein günstig[[0]] Hotel in einer interessant[[1]] Stadt.']],
            blanks: [
              { options: ['-es', '-en', '-e', '-er'], answer: '-es', explain: 'Nom./Akk. Neutr. con "ein" → mixta: -es.' },
              { options: ['-en', '-es', '-e', '-er'], answer: '-en', explain: 'Dat. Fem. (einer Stadt) → -en.' },
            ],
          },
          {
            scene: 'En el escritorio',
            lines: [['', 'Sie hat ein dick[[0]] Buch auf den groß[[1]] Tisch gelegt.']],
            blanks: [
              { options: ['-es', '-en', '-e', '-er'], answer: '-es', explain: 'Nom. Neutr. con "ein" → mixta: -es.' },
              { options: ['-en', '-er', '-e', '-em'], answer: '-en', explain: 'Akk. Masc. (einen großen Tisch) → -en.' },
            ],
          },
          {
            scene: 'El niño',
            lines: [['', 'Das klein[[0]] Kind spielt mit einem rot[[1]] Ball.']],
            blanks: [
              { options: ['-e', '-en', '-er', '-es'], answer: '-e', explain: 'Nom. Neutr. con "das" → débil: -e.' },
              { options: ['-en', '-em', '-er', '-e'], answer: '-en', explain: 'Dat. Masc. (einem Ball) → -en.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'El nuevo amigo',
        tag: 'Texto guiado',
        intro: 'Completa la descripción con las terminaciones correctas de los adjetivos.',
        type: 'guidedText',
        scene: 'Presentación de un nuevo amigo.',
        text: 'Mein neu[[0]] Freund wohnt in einem klein[[1]] Apartment in einer groß[[2]] Stadt. Er hat ein alt[[3]] Auto und einen modern[[4]] Laptop. Er ist ein fleißig[[5]] Student.',
        blanks: [
          { options: ['-er', '-e', '-en', '-em'], answer: '-er', explain: 'Nom. Masc. con "mein" (posesivo = declinación mixta) → -er.' },
          { options: ['-en', '-es', '-e', '-er'], answer: '-en', explain: 'Dat. Neutr. (einem Apartment) → -en.' },
          { options: ['-en', '-e', '-er', '-es'], answer: '-en', explain: 'Dat. Fem. (einer Stadt) → -en.' },
          { options: ['-es', '-en', '-e', '-er'], answer: '-es', explain: 'Nom./Akk. Neutr. con "ein" → mixta: -es.' },
          { options: ['-en', '-er', '-e', '-em'], answer: '-en', explain: 'Akk. Masc. (einen... Laptop) → -en.' },
          { options: ['-er', '-e', '-en', '-em'], answer: '-er', explain: 'Nom. Masc. con "ein" → mixta: -er.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Adjetivo libre',
        tag: 'Texto libre',
        intro: 'Escribe la forma completa del adjetivo con su terminación correcta.',
        type: 'freeText',
        scene: 'Completa con el adjetivo declinado correctamente.',
        text: 'Ich kaufe [[0]] Brot. (frisch, sin artículo, Akk. Neutr.) / Das ist meine [[1]] Tasche. (neu, Nom. Fem. posesivo) / Er hilft dem [[2]] Mann. (alt, Dat. Masc.) / Sie wohnt in einem [[3]] Haus. (schön, Dat. Neutr.) / Das [[4]] Kind schläft. (klein, Nom. Neutr.)',
        blanks: [
          { answer: 'frisches', explain: 'Sin artículo, Akk. Neutr. → declinación fuerte: frisch + -es.' },
          { answer: 'neue', explain: 'Nom. Fem. con posesivo "meine" → declinación mixta: neu + -e.' },
          { answer: 'alten', explain: 'Dat. Masc. (dem Mann) → siempre -en.' },
          { answer: 'schönen', explain: 'Dat. Neutr. (einem Haus) → -en.' },
          { answer: 'kleine', explain: 'Nom. Neutr. con "das" → débil: klein + -e.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Describe usando adjetivos',
        tag: 'Producción guiada',
        intro: 'Escribe frases o textos cortos usando adjetivos correctamente declinados.',
        type: 'write',
        items: [
          {
            scene: 'Tu habitación',
            prompt: 'Describe tu habitación usando 4 adjetivos en al menos 3 casos diferentes (Nom/Akk/Dat).',
            answer: 'Mein Zimmer hat ein großes Fenster. Ich sehe den alten Baum. Ich schlafe auf einem bequemen Bett. Das kleine Regal steht neben der Tür.',
            explain: 'Nom. Neutr./mixta → -es; Akk. Masc./mixta → -en; Dat. → siempre -en.',
          },
          {
            scene: 'Tu ciudad favorita',
            prompt: 'Escribe 3 frases sobre tu ciudad favorita con adjetivos declinados correctamente.',
            answer: 'Meine Lieblingsstadt hat alte Gebäude. Ich mag die breiten Straßen. Man kann in einem gemütlichen Café sitzen.',
            explain: 'Plural → -en (débil y mixta). Dat. → -en.',
          },
          {
            scene: 'La diferencia',
            prompt: 'Explica la diferencia entre "ein alter Mann" y "der alte Mann". ¿Por qué cambia la terminación?',
            answer: 'Nach "der" (schwache Deklination, Nom. Mask.) → -e: der alte Mann. Nach "ein" (gemischte Deklination) → -er: ein alter Mann, weil "ein" keine Genusinformation gibt und der Adjektiv sie übernehmen muss.',
            explain: 'Declinación débil vs. mixta: según si el artículo marca el género.',
          },
          {
            scene: 'Anuncio',
            prompt: 'Escribe un anuncio corto describiendo un apartamento en venta. Usa mínimo 4 adjetivos declinados.',
            answer: 'Zu verkaufen: schöne Wohnung mit großem Balkon. Modernes Bad, helles Wohnzimmer. In ruhiger Lage.',
            explain: 'Sin artículo (Pl. -e: schöne), Dat. Neutr. (großem), Nom. Neutr. mixta (modernes), Nom. Neutr. débil (helles).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Descripción libre con adjetivos',
        tag: 'Escritura libre',
        intro: 'Escribe textos más largos usando todos los tipos de declinación.',
        type: 'write',
        items: [
          {
            scene: 'Anuncio de apartamento',
            prompt: 'Escribe un anuncio de alquiler (Wohnungsanzeige) describiendo un apartamento ideal. Usa mínimo 6 adjetivos correctamente declinados en diferentes géneros y casos.',
            answer: '',
            explain: 'Mezcla artículos definidos, indefinidos, posesivos y contextos sin artículo.',
          },
          {
            scene: 'Persona famosa',
            prompt: 'Describe a una persona famosa (físico y personalidad) usando adjetivos en todos los géneros y casos posibles.',
            answer: '',
            explain: 'Usa "der/die/das", "ein/eine" y si es posible, alguna construcción sin artículo.',
          },
          {
            scene: 'Análisis',
            prompt: '¿Por qué "kaltes Wasser trinken" lleva -es pero "das kalte Wasser" lleva -e? Explica el principio.',
            answer: '',
            explain: 'Sin artículo (declinación fuerte) el adjetivo marca el género: Akk. Neutr. → -es. Con "das" (débil), el artículo ya marcó el género → adjetivo solo -e.',
          },
        ],
      },
    ],
  },
}

export default topic
