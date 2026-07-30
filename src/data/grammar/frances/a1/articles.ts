import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'articles',
  order: '04',
  color: '#b45309',
  category: 'Noms',
  level: 'A1',
  title: 'Les Articles en Français A1',
  shortTitle: 'Articles',
  metaTitle: 'Les articles en français A1 — le, la, les, un, une, des',
  description:
    'En francés todo sustantivo lleva artículo. Los artículos definidos (le/la/l\'/les) especifican algo conocido; los indefinidos (un/une/des) introducen algo nuevo. El artículo también revela el género (masculino/femenino) y número (singular/plural) del sustantivo.',
  lead: 'El, la, lo, un, una: en francés nunca se omite el artículo. Aprende los artículos definidos e indefinidos con sus contracciones obligatorias au y du.',
  outcomes: ['Usa le/la/les/l\'', 'Usa un/une/des', 'Aplica au (à+le) y du (de+le)'],

  guide: {
    goal: 'Usar correctamente los artículos definidos e indefinidos en género y número.',
    model: 'Le chat est noir. / J\'ai un chien. / Des étudiants arrivent.',
    formula: 'Artículo (género/número) + sustantivo',
    decisions: [
      'le → masculino singular: le livre, le chat',
      'la → femenino singular: la table, la maison',
      'l\' → antes de vocal o h muda (m/f): l\'ami, l\'hôtel',
      'les → plural (m/f): les livres, les maisons',
      'un/une → indefinido singular; des → indefinido plural',
      'Contracción obligatoria: à + le = au; de + le = du (no "de le" ni "à le")',
    ],
    table: [
      ['', 'Masculino', 'Femenino'],
      ['Definido', "le (l')", "la (l')"],
      ['Indefinido', 'un', 'une'],
    ],
    mistakes: [
      '"À le cinéma" ❌ → "Au cinéma" ✓ (contracción obligatoria)',
      '"De le café" ❌ → "Du café" ✓ (contracción obligatoria)',
      'Omitir el artículo: "J\'aime cinéma" ❌ → "J\'aime le cinéma" ✓',
    ],
  },

  seo: [
    {
      heading: '¿Por qué los artículos son tan importantes en francés?',
      paragraphs: [
        'En francés, prácticamente todos los sustantivos llevan artículo. A diferencia del inglés (donde puedes decir "I like music") o del español (donde en algunos contextos se puede omitir), en francés normalmente se dice "J\'aime la musique" — con artículo.',
        'El artículo es también la señal principal del género del sustantivo. Como el francés tiene dos géneros (masculino y femenino) y no existen terminaciones tan claras como en español, el artículo se convierte en la marca de género más visible.',
      ],
    },
    {
      heading: '¿Cuándo se usan le, la, l\' y les en francés?',
      paragraphs: [
        '"Le" (el) va con sustantivos masculinos singulares: le livre (el libro), le chat (el gato). "La" (la) con femeninos singulares: la table (la mesa), la rue (la calle). "L\'" reemplaza le y la antes de vocal o h muda: l\'ami (el amigo), l\'école (la escuela), l\'hôtel (el hotel).',
        '"Les" (los/las) es el artículo definido para todos los plurales sin distinción de género: les livres, les tables, les amis, les écoles.',
      ],
      table: [
        ['', 'Singular masculino', 'Singular femenino'],
        ['Definido', 'le livre', 'la table'],
        ['Antes de vocal', "l'ami", "l'école"],
      ],
    },
    {
      heading: 'Artículos indefinidos: un, une, des',
      paragraphs: [
        '"Un" (un/uno) con masculinos singulares: un livre (un libro), un ami (un amigo). "Une" (una) con femeninos singulares: une table (una mesa), une école (una escuela). "Des" (unos/unas/varios) es el plural indefinido: des livres, des amis, des tables.',
        '"Des" no tiene equivalente directo en español moderno — equivale al plural de "un/una" que en español se omite frecuentemente. "Hay estudiantes" = "Il y a des étudiants" (con "des", no sin artículo).',
      ],
    },
    {
      heading: '¿Cómo se forman las contracciones au y du en francés?',
      paragraphs: [
        'Cuando la preposición "à" (a/en/al) va seguida de "le", la contracción es obligatoria: à + le = au. Je vais au cinéma ✓ (no "à le cinéma"). "À la" y "à l\'" no se contraen.',
        'Cuando la preposición "de" (de/del) va seguida de "le", también hay contracción obligatoria: de + le = du. Je parle du film ✓ (no "de le film"). "De la" y "de l\'" no se contraen.',
      ],
      table: [
        ['Preposición + artículo', 'Contracción', 'Ejemplo'],
        ['à + le', 'au', 'Je vais au café.'],
        ['à + les', 'aux', 'Je parle aux étudiants.'],
        ['de + le', 'du', 'Je viens du marché.'],
        ['de + les', 'des', 'Je viens des États-Unis.'],
      ],
    },
    {
      heading: 'El artículo con profesión y negación',
      paragraphs: [
        'Con el verbo être y profesiones/nacionalidades, NO se usa artículo: Il est médecin ✓ (no "il est un médecin"). Esta excepción es importante y diferente al inglés.',
        'En negaciones, el artículo indefinido y el partitivo se convierten en "de/d\'": J\'ai un chien → Je n\'ai pas de chien. J\'ai du lait → Je n\'ai pas de lait. El artículo definido no cambia en negación: J\'aime le café → Je n\'aime pas le café.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Artículos definidos e indefinidos con contracciones au/du.',
    graphicPrompt: 'Tabla de artículos con ejemplos de género y número.',
    scene: [
      ['le / la / l\'', 'le chat, la maison, l\'ami — el/la'],
      ['les', 'les chats, les maisons — los/las'],
      ['un / une', 'un livre, une table — un/una'],
      ['des', 'des amis, des tables — unos/unas'],
      ['au (à+le)', 'Je vais au cinéma. — Voy al cine.'],
      ['du (de+le)', 'Je parle du film. — Hablo de la película.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['le vs la', 'l\' antes de vocal', 'au y du obligatorios'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige el artículo correcto.',
        type: 'choice',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ chat est sur ___ table.']],
            options: ['Le / la', 'La / le', 'L\' / la', 'Le / les'],
            answer: 'Le / la',
            explain: '"Chat" = masculino → "le chat". "Table" = femenino → "la table".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'J\'ai ___ chien et ___ chat.']],
            options: ['un / un', 'une / un', 'un / une', 'des / des'],
            answer: 'un / un',
            explain: '"Chien" y "chat" son masculinos → "un chien, un chat".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Je vais ___ cinéma ce soir.']],
            options: ['au', 'à le', 'du', 'de le'],
            answer: 'au',
            explain: '"À + le" → contracción obligatoria = "au". "Le cinéma" es masculino.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Je viens ___ marché avec ma mère.']],
            options: ['du', 'de le', 'au', 'de la'],
            answer: 'du',
            explain: '"De + le" → "du". "Le marché" es masculino.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ amis de Marie sont sympas.']],
            options: ['Les', 'Des', 'Le', 'La'],
            answer: 'Les',
            explain: '"Les amis" — artículo definido plural. Hablamos de amigos específicos (los de Marie).',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Il y a ___ étudiants dans la salle.']],
            options: ['des', 'les', 'un', 'de'],
            answer: 'des',
            explain: '"Des étudiants" — artículo indefinido plural. Estudiantes no específicos.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ école est grande et moderne.']],
            options: ['L\'', 'Le', 'La', 'Les'],
            answer: 'L\'',
            explain: '"École" empieza por vocal → "l\'école". Femenino pero con "l\'".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'J\'aime ___ café le matin.']],
            options: ['le', 'un', 'la', 'des'],
            answer: 'le',
            explain: 'Con "aimer" + cosa en general → artículo definido: "j\'aime le café" (el café en general).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos decisiones',
        tag: '2 espacios',
        intro: 'Completa los dos artículos en cada oración.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] livre est sur [[1]] bureau.']],
            blanks: [
              { options: ['Le', 'La', 'Un', 'L\''], answer: 'Le', explain: '"Livre" = masculino → "le livre".' },
              { options: ['le', 'la', 'l\'', 'les'], answer: 'le', explain: '"Bureau" = masculino → "le bureau".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'J\'ai [[0]] sœur et [[1]] frère.']],
            blanks: [
              { options: ['une', 'un', 'des', 'la'], answer: 'une', explain: '"Sœur" = femenino → "une sœur".' },
              { options: ['un', 'une', 'des', 'le'], answer: 'un', explain: '"Frère" = masculino → "un frère".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Je vais [[0]] supermarché et [[1]] pharmacie.']],
            blanks: [
              { options: ['au', 'à le', 'à la', 'du'], answer: 'au', explain: 'À + le supermarché → "au supermarché".' },
              { options: ['à la', 'au', 'à le', 'de la'], answer: 'à la', explain: 'Pharmacie = femenino → "à la pharmacie" (sin contracción).' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Je reviens [[0]] marché avec [[1]] légumes.']],
            blanks: [
              { options: ['du', 'de le', 'de la', 'au'], answer: 'du', explain: 'De + le marché → "du marché".' },
              { options: ['des', 'les', 'de', 'du'], answer: 'des', explain: '"Des légumes" — artículo indefinido plural.' },
            ],
          },
        ],
      },
      {
          id: 'level-3',
          title: 'Completa el texto',
          tag: 'Texto guiado',
          intro: 'Elige el artículo adecuado en cada espacio del texto.',
          type: 'guidedText',
        scene: 'Elige el artículo adecuado en cada espacio del texto.',
        text: 'Le matin, je vais [[0]] boulangerie pour acheter [[1]] croissants. [[2]] boulangerie de mon quartier est excellente. Ensuite, je passe [[3]] supermarché pour prendre [[4]] lait. J\'aime [[5]] café avec [[6]] croissant — c\'est mon rituel du matin.',
        blanks: [
          { options: ['à la', 'au', 'à l\'', 'de la'], answer: 'à la', explain: '"Boulangerie" = femenino → "à la boulangerie".' },
          { options: ['des', 'les', 'un', 'de'], answer: 'des', explain: '"Des croissants" — indefinido plural.' },
          { options: ['La', 'Le', 'L\'', 'Les'], answer: 'La', explain: '"La boulangerie" — definido femenino, referencia ya introducida.' },
          { options: ['au', 'à la', 'à l\'', 'du'], answer: 'au', explain: 'À + le supermarché → "au supermarché".' },
          { options: ['du', 'de le', 'le', 'un'], answer: 'du', explain: '"Du lait" — artículo partitivo (parte de algo no contable).' },
          { options: ['le', 'un', 'du', 'la'], answer: 'le', explain: '"J\'aime le café" — aimer + cosa general → artículo definido.' },
          { options: ['un', 'le', 'du', 'des'], answer: 'un', explain: '"Un croissant" — indefinido singular, uno específico.' },
        ],
      },
      {
          id: 'level-4',
          title: 'Escribe sin ayuda',
          tag: 'Texto libre',
          intro: 'Completa el texto escribiendo el artículo correcto en cada espacio.',
          type: 'freeText',
        scene: 'Completa el texto escribiendo el artículo correcto en cada espacio.',
        text: 'Paris est [[0]] capitale de [[1]] France. C\'est [[2]] grande ville avec [[3]] monuments célèbres. J\'aime [[4]] architecture parisienne.',
        blanks: [
          { answer: 'la', accepted: ['la'], explain: '"La capitale" — femenino singular definido.' },
          { answer: 'la', accepted: ['la'], explain: '"La France" — nombre de país femenino.' },
          { answer: 'une', accepted: ['une'], explain: '"Une grande ville" — indefinido, se introduce la descripción.' },
          { answer: 'des', accepted: ['des'], explain: '"Des monuments" — indefinido plural.' },
          { answer: 'l\'', accepted: ["l'", 'l\''], explain: '"L\'architecture" — femenino antes de vocal, artículo definido.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones usando los artículos correctos.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Describe tu ciudad: "... est une ville..." o "il y a des..."',
            answer: 'Bogotá est une grande ville. Il y a des parcs magnifiques.',
            accepted: ["est une", "est un", "il y a des", "il y a un", "il y a une"],
            explain: 'Ejemplo: Madrid est une ville moderne. Il y a des musées célèbres.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di adónde vas el fin de semana: usa "au", "à la" o "à l\'".',
            answer: 'Je vais au cinéma avec mes amis.',
            accepted: ['je vais au', 'je vais à la', "je vais à l'"],
            explain: 'Ejemplo: Je vais au parc. / Je vais à la plage. / Je vais à l\'université.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di algo que te gusta en general usando "j\'aime le/la/les/l\'".',
            answer: 'J\'aime le sport et la musique.',
            accepted: ["j'aime le", "j'aime la", "j'aime les", "j'aime l'"],
            explain: 'Con "aimer" + cosa en general → artículo definido. J\'aime le cinéma. / J\'aime les voyages.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Describe lo que hay en tu habitación usando "il y a un/une/des".',
            answer: 'Il y a un bureau et des livres sur la table.',
            accepted: ['il y a un', 'il y a une', 'il y a des'],
            explain: 'Ejemplo: Il y a un lit, une armoire et des livres. / Il y a des photos sur le mur.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Misión: Décris ta ville ou ton quartier en utilisant au moins 5 articles différents.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Presenta tu ciudad con un artículo definido (le/la/l\').',
            answer: 'La ville de Medellín est magnifique.',
            accepted: ['le ', 'la ', "l'"],
            explain: 'Ejemplo: La capitale du pays est... / Le quartier est... / L\'université est...',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di adónde vas regularmente en tu ciudad (au/à la/à l\').',
            answer: 'Je vais souvent au parc et à la bibliothèque.',
            accepted: ['au ', 'à la ', "à l'", 'aux '],
            explain: 'Contracciones: au + masc., à la + fem., à l\' + vocal, aux + plural.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Menciona qué hay en tu ciudad usando "des" o "un/une".',
            answer: 'Il y a des musées, des parcs et un grand marché.',
            accepted: ['il y a des', 'il y a un', 'il y a une'],
            explain: 'Indefinido plural: des + sustantivo. Ejemplo: Il y a des restaurants et un cinéma moderne.',
          },
        ],
      },
    ],
  },
}

export default topic
