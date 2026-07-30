import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'genre-noms',
  order: '05',
  color: '#dc2626',
  category: 'Noms',
  level: 'A1',
  title: 'Le Genre des Noms en Français A1',
  shortTitle: 'Genre des noms',
  metaTitle: 'Le genre des noms en français A1 — masculin et féminin',
  description:
    'En francés, todos los sustantivos son masculinos o femeninos — incluso los inanimados. No existen reglas infalibles, pero sí patrones útiles por terminación. El artículo (le/la/un/une) es la señal de género más confiable. Conocer el género es esencial porque afecta artículos, adjetivos y pronombres.',
  lead: 'En francés, "la table" y "le livre" — cada sustantivo tiene género. Aprende los patrones de terminación y por qué el artículo es tu mejor aliado.',
  outcomes: ['Identifica sustantivos masculinos y femeninos', 'Aplica patrones de terminación', 'Forma el femenino de personas y adjetivos'],

  guide: {
    goal: 'Reconocer el género de los sustantivos franceses y usar los artículos y adjetivos correctamente.',
    model: 'Le garçon → la fille; le professeur → la professeure; un ami → une amie.',
    formula: 'Artículo (le/la/un/une) + sustantivo en género correcto',
    decisions: [
      'Masculino frecuente: -ment, -age, -isme, -eau, -er: le mouvement, le garage, le cinéma',
      'Femenino frecuente: -tion, -sion, -ure, -ette, -ance, -ence: la nation, la voiture, la chance',
      'Femenino de personas: ajouter -e (ami → amie), doubler + e (acteur → actrice, directeur → directrice)',
      'Excepciones: le problème, le programme, le musée (masculinos en -e); la mer, la mer (femeninos sin -e)',
    ],
    table: [
      ['Terminación masculina', 'Ejemplos masc.', 'Terminación femenina'],
      ['-ment', 'le moment', '-tion/-sion'],
      ['-age', 'le voyage', '-ure'],
      ['-eau / -er/-é', 'le gâteau, le café', '-ette / -ance/-ence'],
    ],
    mistakes: [
      'No hay género neutro en francés — todo es masculino o femenino.',
      '"Le musée" es masculino a pesar de terminar en -e.',
      'El femenino de "acteur" es "actrice" (no "acteure").',
    ],
  },

  seo: [
    {
      heading: '¿Por qué el género es tan difícil en francés?',
      paragraphs: [
        'En francés, todos los sustantivos tienen género gramatical — masculino o femenino — incluso los objetos inanimados: la table (femenino), le livre (masculino), la voiture (femenino), le téléphone (masculino). No existen reglas perfectas, pero hay patrones de terminación que aciertan el 75-80% de las veces.',
        'El género importa porque determina qué artículo usar (le/la/un/une), cómo se conjugan los adjetivos (grand/grande, petit/petite) y qué pronombres usar (il/elle). Aprender los sustantivos siempre con su artículo — "le livre", "la table" — es la estrategia más eficaz.',
      ],
    },
    {
      heading: '¿Qué terminaciones indican género masculino en francés?',
      paragraphs: [
        'Varios sufijos en francés apuntan al género masculino: -ment (le mouvement, le document), -age (le voyage, le fromage), -isme (le tourisme, le réalisme), -eau (le gâteau, le manteau), -er/-é (le marché, le café, le premier).',
        'También son masculinos en general: países no terminados en -e (le Brésil, le Canada, le Maroc), nombres de días (le lundi), meses (janvier, février), y metales/materiales (le bois, le fer).',
      ],
    },
    {
      heading: '¿Qué terminaciones indican género femenino en francés?',
      paragraphs: [
        'Sufijos frecuentemente femeninos: -tion/-sion (la nation, la télévision, la décision), -ure (la voiture, la culture, la nature), -ette (la baguette, la cassette, la tablette), -ance/-ence (la chance, la science, la patience), -ie (la boulangerie, la librairie).',
        'También son femeninos en general: países terminados en -e (la France, la Belgique, l\'Espagne — excepto le Mexique), muchas frutas (la pomme, la poire, la banane), y la mayoría de países europeos terminados en -e.',
      ],
    },
    {
      heading: 'El femenino de personas y profesiones',
      paragraphs: [
        'Para personas, el femenino suele formarse añadiendo -e al masculino: un ami → une amie, un étudiant → une étudiante, un Français → une Française. Si el masculino ya termina en -e, no cambia: un artiste → une artiste.',
        'Algunas profesiones tienen formas irregulares: acteur → actrice, directeur → directrice, chanteur → chanteuse, vendeur → vendeuse. Cada vez más, el francés acepta formas en -e: une professeure, une auteure (debate lingüístico activo).',
      ],
    },
    {
      heading: 'Estrategia práctica: aprende con el artículo',
      paragraphs: [
        'La estrategia más efectiva para hispanohablantes es nunca aprender un sustantivo sin su artículo: no "livre" sino "le livre"; no "table" sino "la table". Así el género se interioriza naturalmente.',
        'Cuando tengas duda, fíjate en la terminación: -tion → casi siempre femenino; -ment → casi siempre masculino. Para el resto, el artículo en el diccionario (n.m. = nom masculin, n.f. = nom féminin) es siempre la referencia.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Género de los sustantivos franceses: patrones de terminación y estrategias prácticas.',
    graphicPrompt: 'Tabla de terminaciones masculinas y femeninas con ejemplos cotidianos.',
    scene: [
      ['Masculino', 'le café, le voyage, le moment, le gâteau'],
      ['Femenino', 'la nation, la voiture, la baguette, la science'],
      ['l\' (vocal)', 'l\'ami (m), l\'amie (f), l\'école (f), l\'hôtel (m)'],
      ['Femenino de personas', 'étudiant → étudiante, acteur → actrice'],
      ['Truco: -tion', 'la station, la solution, la natation — siempre femenino'],
      ['Truco: -age', 'le courage, le garage, le voyage — casi siempre masculino'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-tion femenino', '-age masculino', 'femenino de personas'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige el artículo correcto según el género del sustantivo.',
        type: 'choice',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ nation (¿masculino o femenino?)']],
            options: ['la', 'le', 'l\'', 'les'],
            answer: 'la',
            explain: '"Nation" termina en -tion → femenino → "la nation".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ voyage']],
            options: ['le', 'la', 'l\'', 'les'],
            answer: 'le',
            explain: '"Voyage" termina en -age → masculino → "le voyage".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ culture']],
            options: ['la', 'le', 'l\'', 'les'],
            answer: 'la',
            explain: '"Culture" termina en -ure → femenino → "la culture".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ document']],
            options: ['le', 'la', 'l\'', 'les'],
            answer: 'le',
            explain: '"Document" termina en -ment → masculino → "le document".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ décision']],
            options: ['la', 'le', 'l\'', 'les'],
            answer: 'la',
            explain: '"Décision" termina en -sion → femenino → "la décision".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ hôtel']],
            options: ['l\'', 'le', 'la', 'les'],
            answer: 'l\'',
            explain: '"Hôtel" empieza por h aspirada pero sigue siendo tratada como vocal → "l\'hôtel". Masculino.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ chance']],
            options: ['la', 'le', 'l\'', 'les'],
            answer: 'la',
            explain: '"Chance" termina en -ance → femenino → "la chance".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ tourisme']],
            options: ['le', 'la', 'l\'', 'les'],
            answer: 'le',
            explain: '"Tourisme" termina en -isme → masculino → "le tourisme".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos decisiones',
        tag: '2 espacios',
        intro: 'Completa el artículo y la forma femenina cuando corresponda.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] étudiant et [[1]] étudiante sont amis.']],
            blanks: [
              { options: ['Un', 'Une', 'Le', 'La'], answer: 'Un', explain: '"Étudiant" = masculino → "un étudiant".' },
              { options: ['une', 'un', 'la', 'le'], answer: 'une', explain: '"Étudiante" = femenino → "une étudiante".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] acteur joue bien. [[1]] actrice aussi.']],
            blanks: [
              { options: ['L\'', 'Le', 'La', 'Un'], answer: 'L\'', explain: '"Acteur" empieza por vocal → "l\'acteur".' },
              { options: ['L\'', 'Le', 'La', 'Une'], answer: 'L\'', explain: '"Actrice" empieza por vocal → "l\'actrice".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] solution est [[1]].']],
            blanks: [
              { options: ['La', 'Le', 'L\'', 'Une'], answer: 'La', explain: '"Solution" en -tion → femenino → "la solution".' },
              { options: ['bonne', 'bon', 'bons', 'bonnes'], answer: 'bonne', explain: 'Adjetivo concuerda con "solution" (femenino): "bonne".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] voyage est long mais [[1]] aventure est belle.']],
            blanks: [
              { options: ['Le', 'La', 'L\'', 'Un'], answer: 'Le', explain: '"Voyage" en -age → masculino → "le voyage".' },
              { options: ['l\'', 'le', 'la', 'les'], answer: 'l\'', explain: '"Aventure" empieza por vocal → "l\'aventure". Femenino (-ure).' },
            ],
          },
        ],
      },
      {
          id: 'level-3',
          title: 'Completa el texto',
          tag: 'Texto guiado',
          intro: 'Elige el artículo correcto según el género de cada sustantivo.',
          type: 'guidedText',
        scene: 'Elige el artículo correcto según el género de cada sustantivo.',
        text: '[[0]] vie à Paris est chère mais intéressante. [[1]] loyer d\'un appartement dans [[2]] capital est très élevé. Mais [[3]] culture est incroyable — [[4]] musées sont magnifiques et [[5]] cuisine française est délicieuse. C\'est [[6]] ville unique au monde.',
        blanks: [
          { options: ['La', 'Le', 'L\'', 'Une'], answer: 'La', explain: '"Vie" = femenino (pas de terminaison claire, à mémoriser) → "la vie".' },
          { options: ['Le', 'La', 'L\'', 'Un'], answer: 'Le', explain: '"Loyer" = masculino → "le loyer".' },
          { options: ['la', 'le', 'l\'', 'les'], answer: 'la', explain: '"Capital" = femenino quand il s\'agit de la ville → "la capitale" / "la capital".' },
          { options: ['la', 'le', 'l\'', 'une'], answer: 'la', explain: '"Culture" en -ure → femenino → "la culture".' },
          { options: ['les', 'des', 'le', 'la'], answer: 'les', explain: '"Les musées" — definido plural, museos ya conocidos/específicos.' },
          { options: ['la', 'le', 'l\'', 'une'], answer: 'la', explain: '"Cuisine" = femenino → "la cuisine".' },
          { options: ['une', 'un', 'la', 'le'], answer: 'une', explain: '"Une ville" — indefinido, se introduce por primera vez aquí.' },
        ],
      },
      {
          id: 'level-4',
          title: 'Escribe sin ayuda',
          tag: 'Texto libre',
          intro: 'Escribe el artículo definido correcto (le, la, l\') en cada espacio.',
          type: 'freeText',
        scene: 'Completa con le, la, l\' o les.',
        text: 'J\'aime [[0]] musique et [[1]] cinéma. [[2]] culture française est très riche. [[3]] monuments de Paris sont célèbres dans [[4]] monde entier.',
        blanks: [
          { answer: 'la', accepted: ['la'], explain: '"Musique" = femenino → "la musique".' },
          { answer: 'le', accepted: ['le'], explain: '"Cinéma" = masculino (-ma) → "le cinéma".' },
          { answer: 'La', accepted: ['la', 'La'], explain: '"Culture" en -ure → femenino → "la culture".' },
          { answer: 'Les', accepted: ['les', 'Les'], explain: '"Les monuments" — definido plural.' },
          { answer: 'le', accepted: ['le'], explain: '"Le monde" = masculino → "le monde".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe el artículo correcto y usa el sustantivo en una oración.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Escribe una oración con "solution" y el artículo correcto.',
            answer: 'La solution est simple.',
            accepted: ['la solution', 'une solution'],
            explain: '"Solution" en -tion → femenino: "la solution" o "une solution".',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Escribe una oración con "voyage" y el artículo correcto.',
            answer: 'Le voyage était magnifique.',
            accepted: ['le voyage', 'un voyage'],
            explain: '"Voyage" en -age → masculino: "le voyage" o "un voyage".',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Escribe el femenino de "un acteur" en una oración.',
            answer: 'Une actrice joue dans ce film.',
            accepted: ['une actrice', 'l\'actrice'],
            explain: '"Acteur" → "actrice" (femenino irregular). No "acteure".',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Menciona tres cosas que te gustan con sus artículos correctos.',
            answer: 'J\'aime le sport, la musique et l\'art.',
            accepted: ["j'aime le", "j'aime la", "j'aime les", "j'aime l'"],
            explain: 'Aimer + artículo definido para cosas en general: J\'aime le sport, la danse, l\'art.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Misión: Écris 3 phrases sur ta ville en utilisant correctement le genre des noms.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Describe tu ciudad con "la ville" o "le quartier" y un adjetivo.',
            answer: 'La ville de Bogotá est grande et moderne.',
            accepted: ['la ville', 'le quartier', 'la capitale', 'le centre'],
            explain: 'Ejemplo: La ville est belle. / Le quartier est tranquille.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Menciona algo específico de tu ciudad: un monumento, un parque, una calle.',
            answer: 'Le parc est très agréable le week-end.',
            accepted: ['le parc', 'la rue', "l'avenue", 'le musée', 'la place', 'le monument'],
            explain: 'Ejemplo: Le musée est magnifique. / La place centrale est animée.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué hay o no hay en tu ciudad usando "il y a" + artículo.',
            answer: 'Il y a une université et des restaurants excellents.',
            accepted: ['il y a un', 'il y a une', 'il y a des', "il n'y a pas"],
            explain: 'Ejemplo: Il y a des parcs et une belle cathédrale. / Il n\'y a pas de métro.',
          },
        ],
      },
    ],
  },
}

export default topic
