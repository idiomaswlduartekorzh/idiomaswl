import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'adjektivdeklination-a2',
  order: '14',
  color: '#c9a900',
  category: 'Adjektive',
  level: 'A2',
  title: 'Adjektivdeklination nach bestimmtem und unbestimmtem Artikel',
  shortTitle: 'Adjektivdeklination',
  metaTitle: 'Declinación de adjetivos alemán A2 — der/ein neue Mann',
  description:
    'Los adjetivos en alemán se declinan según el caso, el género y el tipo de artículo que los precede. Tras el artículo definido (der/die/das) se usa la terminación débil (-e/-en), mientras que tras el artículo indefinido (ein/eine) se usa la terminación mixta, que a veces incluye la información de género.',
  lead: 'El adjetivo cambia de terminación según el artículo: der neue Mann vs. ein neuer Mann.',
  outcomes: [
    'Usar terminaciones débiles (-e/-en) tras artículo definido',
    'Usar terminaciones mixtas tras artículo indefinido',
    'Aplicar la declinación en Nominativ y Akkusativ (casos más frecuentes)',
    'Reconocer que el adjetivo sin artículo lleva la terminación fuerte',
  ],

  guide: {
    goal: 'Declinar adjetivos tras artículo definido e indefinido en los casos principales.',
    model: 'Der alte Mann / Ein alter Mann / Die neue Lehrerin / Ein neues Auto / Den schönen Film',
    formula: 'Artículo + Adj.(terminación) + Nomen',
    decisions: [
      'Tras artículo DEFINIDO (der/die/das/den...): terminación débil = -e en Nom.sg. y -en en todo lo demás',
      'Tras artículo INDEFINIDO (ein/eine/ein...): terminación mixta = -er/-e/-es en Nom.sg., -en en el resto',
      'Nominativ: bestimmter Artikel → -e para todos los géneros singulares (m/f/n); Plural → -en',
      'Akkusativ masculino: -en siempre (con ambos tipos de artículo): den neuen Mann / einen neuen Mann',
      'Regla práctica: si el artículo ya muestra el género (der/die/das), el adj. toma -e/-en; si no (ein), el adj. compensa con -er/-es',
      'En plural siempre -en (con artículo): die neuen Bücher / keine neuen Bücher',
    ],
    table: [
      ['Kasus / Genus', 'Bestimmter Artikel', 'Unbestimmter Artikel'],
      ['Nom. Maskulin', 'der neu-e Mann', 'ein neu-er Mann'],
      ['Nom. Feminin', 'die neu-e Frau', 'eine neu-e Frau'],
      ['Nom. Neutrum', 'das neu-e Kind', 'ein neu-es Kind'],
      ['Akk. Maskulin', 'den neu-en Mann', 'einen neu-en Mann'],
      ['Akk. Feminin', 'die neu-e Frau', 'eine neu-e Frau'],
      ['Akk. Neutrum', 'das neu-e Kind', 'ein neu-es Kind'],
      ['Nom./Akk. Plural', 'die neu-en Bücher', 'keine neu-en Bücher'],
    ],
    mistakes: [
      'Olvidar la terminación en Nom. masculino indefinido: INCORRECTO "ein neue Mann" → CORRECTO "ein neuer Mann"',
      'Usar -e en Akk. masculino: INCORRECTO "Ich sehe den neue Film" → CORRECTO "Ich sehe den neuen Film"',
      'Aplicar terminación de definido en contexto de indefinido: INCORRECTO "ein neue Auto" → CORRECTO "ein neues Auto"',
    ],
  },

  seo: [
    {
      heading: 'La declinación débil: después de der/die/das',
      paragraphs: [
        'Cuando el adjetivo va precedido de un artículo definido (der, die, das, den, dem...), el artículo ya porta toda la información de género y caso. Por ello, el adjetivo usa terminaciones "débiles": -e en el Nominativ singular (der alte Mann, die alte Frau, das alte Kind) y -en en todos los demás casos y en plural.',
        'Regla simplificada para Nominativ y Akkusativ (los dos casos más frecuentes): si es Nominativ singular → -e; si es Akkusativ masculino o cualquier plural → -en; resto del Akkusativ singular → -e.',
      ],
    },
    {
      heading: 'La declinación mixta: después de ein/eine/ein',
      paragraphs: [
        'Cuando el artículo indefinido (ein, eine, ein en Nominativ) no porta la información de género (el "ein" neutro y masculino son idénticos), el adjetivo debe compensar aportando esa información mediante terminaciones "fuertes": ein alter Mann (-er), eine alte Frau (-e), ein altes Kind (-es).',
        'En Akkusativ, el Akkusativ masculino indefinido ya se distingue (einen), así que el adjetivo vuelve a -en: einen alten Mann. Para femenino y neutro Akkusativ, el adj. sigue con -e/-es igual que en Nominativ.',
      ],
    },
    {
      heading: 'Cómo memorizar las terminaciones',
      paragraphs: [
        'La estrategia más eficiente: aprende primero las terminaciones del artículo definido (der/die/das/den/dem/des) y cuando hay artículo definido, el adjetivo siempre es -e o -en. Con artículo indefinido, la terminación del adjetivo "roba" la terminación del artículo definido correspondiente en masculino y neutro Nominativ (-er, -es) y luego para el resto usa -en.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Adjektivdeklination: débil tras artículo definido, mixta tras indefinido.',
    graphicPrompt: 'Tabla de adjetivos declinados con colores para distinguir terminaciones -e/-en/-er/-es.',
    scene: [
      ['Der alte Mann kommt', 'El hombre viejo viene (def. Nom. m)'],
      ['Ein alter Mann kommt', 'Un hombre viejo viene (indef. Nom. m)'],
      ['Die neue Lehrerin ist gut', 'La nueva profesora es buena (def. Nom. f)'],
      ['Ich sehe den neuen Film', 'Veo la nueva película (def. Akk. m)'],
      ['Sie kauft ein rotes Auto', 'Compra un coche rojo (indef. Akk. n)'],
      ['Die kleinen Kinder spielen', 'Los niños pequeños juegan (def. pl)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-e/-en tras artículo definido', '-er/-e/-es tras indefinido', 'Akk. masculino siempre -en'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennung',
        tag: 'Opción múltiple',
        intro: 'Elige la terminación correcta del adjetivo.',
        type: 'choice',
        items: [
          {
            scene: 'Un hombre mayor (indefinido, Nominativ)',
            lines: [['', 'Ein alt___ Mann wohnt neben mir.']],
            options: ['-er', '-e', '-en', '-es'],
            answer: '-er',
            explain: 'Artículo indefinido + Nom. masculino: adjetivo toma -er (ein alter Mann).',
          },
          {
            scene: 'El hombre mayor (definido, Nominativ)',
            lines: [['', 'Der alt___ Mann ist mein Nachbar.']],
            options: ['-e', '-er', '-en', '-es'],
            answer: '-e',
            explain: 'Artículo definido + Nom. masculino: adjetivo toma -e (der alte Mann).',
          },
          {
            scene: 'Una ciudad bonita (indefinido, Nominativ)',
            lines: [['', 'Das ist eine schön___ Stadt.']],
            options: ['-e', '-er', '-es', '-en'],
            answer: '-e',
            explain: 'Artículo indefinido + Nom. femenino: adjetivo toma -e (eine schöne Stadt).',
          },
          {
            scene: 'Un coche rojo (indefinido, Nominativ neutro)',
            lines: [['', 'Das ist ein rot___ Auto.']],
            options: ['-es', '-e', '-er', '-en'],
            answer: '-es',
            explain: 'Artículo indefinido + Nom. neutro: adjetivo toma -es (ein rotes Auto).',
          },
          {
            scene: 'Veo el nuevo film (definido, Akkusativ masculino)',
            lines: [['', 'Ich sehe den neu___ Film.']],
            options: ['-en', '-e', '-er', '-es'],
            answer: '-en',
            explain: 'Artículo definido + Akk. masculino: adjetivo toma -en (den neuen Film).',
          },
          {
            scene: 'Compro un libro interesante (indefinido, Akkusativ masculino)',
            lines: [['', 'Ich kaufe einen interessant___ Roman.']],
            options: ['-en', '-e', '-er', '-es'],
            answer: '-en',
            explain: 'Artículo indefinido + Akk. masculino: adjetivo toma -en (einen interessanten Roman).',
          },
          {
            scene: 'La nueva profesora (definido, Nominativ femenino)',
            lines: [['', 'Die neu___ Lehrerin ist sehr nett.']],
            options: ['-e', '-er', '-en', '-es'],
            answer: '-e',
            explain: 'Artículo definido + Nom. femenino: adjetivo toma -e (die neue Lehrerin).',
          },
          {
            scene: 'Los pequeños niños (definido, Nominativ plural)',
            lines: [['', 'Die klein___ Kinder spielen draußen.']],
            options: ['-en', '-e', '-er', '-es'],
            answer: '-en',
            explain: 'Artículo definido + Nominativ plural: adjetivo toma -en (die kleinen Kinder).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Doppelergänzung',
        tag: '2 espacios',
        intro: 'Completa el artículo y la terminación del adjetivo.',
        type: 'dual',
        items: [
          {
            scene: 'Un libro interesante sobre la mesa',
            lines: [['', '[[0]] interessant[[1]] Buch liegt auf dem Tisch.']],
            blanks: [
              { options: ['Ein', 'Eine', 'Der', 'Das'], answer: 'Ein', explain: '"Buch" es neutro. Artículo indefinido neutro: Ein.' },
              { options: ['-es', '-e', '-er', '-en'], answer: '-es', explain: 'Indefinido + Nom. neutro: -es → ein interessantes Buch.' },
            ],
          },
          {
            scene: 'El perro pequeño duerme',
            lines: [['', '[[0]] klein[[1]] Hund schläft auf dem Sofa.']],
            blanks: [
              { options: ['Der', 'Die', 'Das', 'Ein'], answer: 'Der', explain: '"Hund" es masculino. Artículo definido masculino Nom: Der.' },
              { options: ['-e', '-er', '-en', '-es'], answer: '-e', explain: 'Definido + Nom. masculino: -e → der kleine Hund.' },
            ],
          },
          {
            scene: 'Comprando una falda nueva',
            lines: [['', 'Sie kauft [[0]] neu[[1]] Rock.']],
            blanks: [
              { options: ['einen', 'ein', 'eine', 'den'], answer: 'einen', explain: '"Rock" es masculino. Artículo indefinido Akk. masculino: einen.' },
              { options: ['-en', '-e', '-er', '-es'], answer: '-en', explain: 'Indefinido + Akk. masculino: -en → einen neuen Rock.' },
            ],
          },
          {
            scene: 'La ciudad grande y moderna',
            lines: [['', 'Wir besuchen [[0]] groß[[1]] Stadt.']],
            blanks: [
              { options: ['eine', 'ein', 'der', 'einen'], answer: 'eine', explain: '"Stadt" es femenino. Artículo indefinido Akk. femenino: eine.' },
              { options: ['-e', '-er', '-en', '-es'], answer: '-e', explain: 'Indefinido + Akk. femenino: -e → eine große Stadt.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Lückentext',
        tag: 'Texto guiado',
        intro: 'Completa el texto con las terminaciones correctas de los adjetivos.',
        type: 'guidedText',
        scene: 'Ana describe su nuevo apartamento.',
        text: 'Ich habe eine neu[[0]] Wohnung gefunden. Die groß[[1]] Küche hat ein modern[[2]] Design. Ich habe einen alt[[3]] Sessel gekauft. Das groß[[4]] Fenster gibt viel Licht.',
        blanks: [
          { options: ['-e', '-er', '-en', '-es'], answer: '-e', explain: 'Indefinido + Nom. femenino (Wohnung): -e → eine neue Wohnung.' },
          { options: ['-e', '-er', '-en', '-es'], answer: '-e', explain: 'Definido + Nom. femenino (Küche): -e → die große Küche.' },
          { options: ['-es', '-e', '-er', '-en'], answer: '-es', explain: 'Indefinido + Akk. neutro (Design): -es → ein modernes Design.' },
          { options: ['-en', '-e', '-er', '-es'], answer: '-en', explain: 'Indefinido + Akk. masculino (Sessel): -en → einen alten Sessel.' },
          { options: ['-e', '-er', '-en', '-es'], answer: '-e', explain: 'Definido + Nom. neutro (Fenster): -e → das große Fenster.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Freier Text',
        tag: 'Texto libre',
        intro: 'Escribe la terminación correcta del adjetivo sin opciones.',
        type: 'freeText',
        scene: 'Marco describe a su familia.',
        text: 'Mein Vater ist ein freundlich[[0]] Mann. Die alt[[1]] Frau neben uns heißt Oma Hilde. Mein Bruder hat ein schnell[[2]] Fahrrad. Die jung[[3]] Geschwister spielen gern. Wir haben einen groß[[4]] Garten.',
        blanks: [
          { answer: '-er', accepted: ['-er', 'er'], explain: 'Indefinido + Nom. masculino (Mann): -er → ein freundlicher Mann.' },
          { answer: '-e', accepted: ['-e', 'e'], explain: 'Definido + Nom. femenino (Frau): -e → die alte Frau.' },
          { answer: '-es', accepted: ['-es', 'es'], explain: 'Indefinido + Akk. neutro (Fahrrad): -es → ein schnelles Fahrrad.' },
          { answer: '-en', accepted: ['-en', 'en'], explain: 'Definido + Nom. plural (Geschwister): -en → die jungen Geschwister.' },
          { answer: '-en', accepted: ['-en', 'en'], explain: 'Indefinido + Akk. masculino (Garten): -en → einen großen Garten.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produktion',
        tag: 'Escritura guiada',
        intro: 'Escribe frases completas con adjetivos declinados correctamente.',
        type: 'write',
        items: [
          {
            scene: 'Describiendo un lugar que conoces',
            prompt: 'Describe un lugar usando dos adjetivos con artículo definido (Nom.).',
            answer: 'Das ist ein schönes, modernes Restaurant.',
            accepted: ['ein schönes', 'eine schöne', 'ein neues', 'einen neuen'],
            explain: 'Artículo indefinido + Nom. neutro: -es; Nom. femenino: -e; Nom. masculino: -er.',
          },
          {
            scene: 'Comprando algo',
            prompt: 'Di que compras un objeto con un adjetivo (ich kaufe einen/eine/ein + adj.).',
            answer: 'Ich kaufe einen neuen Laptop.',
            accepted: ['kaufe einen neuen', 'kaufe eine neue', 'kaufe ein neues'],
            explain: 'Akk. masculino indefinido: einen + adj.-en. Femenino: eine + adj.-e. Neutro: ein + adj.-es.',
          },
          {
            scene: 'Hablando de tu ciudad',
            prompt: 'Describe tu ciudad con un adjetivo + artículo definido.',
            answer: 'Die alte Stadt hat viele schöne Gebäude.',
            accepted: ['Die alte', 'Die schöne', 'Die große', 'Die kleine'],
            explain: 'Artículo definido + Nom. femenino: -e → die alte Stadt.',
          },
          {
            scene: 'Recomendando una película',
            prompt: 'Recomienda una película usando un adjetivo (Ich empfehle den/die/das + adj. Film/...).',
            answer: 'Ich empfehle den neuen Film von diesem Regisseur.',
            accepted: ['den neuen', 'den alten', 'den interessanten'],
            explain: 'Akk. masculino definido: den + adj.-en → den neuen Film.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Kommunikation',
        tag: 'Texto libre',
        intro: 'Describe personas, objetos o lugares usando adjetivos declinados.',
        type: 'write',
        items: [
          {
            scene: 'Tu habitación ideal',
            prompt: 'Describe tu habitación ideal usando 3-4 adjetivos con artículos distintos.',
            answer: 'Ich möchte ein großes Bett haben. Die weißen Wände sehen schön aus. Ich brauche einen bequemen Sessel und ein helles Fenster.',
            accepted: ['ein großes', 'einen bequemen', 'ein helles', 'die weißen'],
            explain: 'Neutro indefinido: -es; Maskulin Akk. indefinido: -en; Plural definido: -en.',
          },
          {
            scene: 'Describiendo a una persona',
            prompt: 'Describe a alguien que conoces usando 3 adjetivos con el artículo correcto.',
            answer: 'Mein Freund ist ein lustiger, intelligenter Mensch. Er hat einen langen Bart und kurze Haare.',
            accepted: ['ein lustiger', 'ein intelligenter', 'einen langen', 'kurze'],
            explain: 'Indefinido Nom. m: -er; Akk. m: -en. Sin artículo (Haare): terminación fuerte -e.',
          },
          {
            scene: 'Recomendaciones de compras',
            prompt: 'Haz 3 recomendaciones de compra describiendo qué buscar.',
            answer: 'Ich empfehle einen guten Rucksack, eine warme Jacke und ein bequemes Sofa.',
            accepted: ['einen guten', 'eine warme', 'ein bequemes', 'einen', 'eine', 'ein'],
            explain: 'Akk.: masculino indefinido -en, femenino indefinido -e, neutro indefinido -es.',
          },
        ],
      },
    ],
  },
}

export default topic
