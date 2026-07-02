import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pluriel-noms',
  order: '11',
  color: '#1a2ecc',
  category: 'Noms',
  level: 'A1',
  title: 'Le Pluriel des Noms en Français A1',
  shortTitle: 'Pluriel des noms',
  metaTitle: 'El plural de los sustantivos en francés A1 — reglas y excepciones',
  description:
    'El plural en francés sigue reglas claras: la mayoría añade -s (como en español), pero hay patrones especiales para -al → -aux, -eau → -eaux y algunos en -ou → -oux. Los artículos también cambian: le/la/l\' → les, un/une → des.',
  lead: 'El plural en francés es más predecible de lo que parece. La regla general es + -s. Pero algunos grupos siguen su propia lógica — ¡y los artículos no te perdonan!',
  outcomes: [
    'Forma el plural de sustantivos regulares e irregulares comunes',
    'Aplica los cambios -al → -aux y -eau → -eaux',
    'Usa correctamente les/des con sustantivos en plural',
  ],

  guide: {
    goal: 'Formar el plural de los sustantivos franceses y usar los artículos correctos.',
    model: 'un livre → des livres / un journal → des journaux / un gâteau → des gâteaux',
    formula: 'Artículo plural (les/des) + sustantivo + terminación de plural',
    decisions: [
      'Regla general: + -s: un étudiant → des étudiants, une maison → des maisons',
      'Si ya termina en -s, -x, -z: no cambia: un bras → des bras, une voix → des voix',
      '-al → -aux: un journal → des journaux, un animal → des animaux, un hôpital → des hôpitaux',
      '-eau → -eaux: un gâteau → des gâteaux, un chapeau → des chapeaux, un bureau → des bureaux',
      '-ou → -oux (7 excepciones): genou → genoux, caillou → cailloux; los demás: -ous (un clou → des clous)',
      'Artículos: le/la/l\' → les; un/une → des',
    ],
    table: [
      ['Regla', 'Singular', 'Plural'],
      ['General + -s', 'un livre', 'des livres'],
      ['Ya en -s/-x/-z', 'un bras / une voix', 'des bras / des voix'],
      ['-al → -aux', 'un journal', 'des journaux'],
      ['-eau → -eaux', 'un gâteau', 'des gâteaux'],
      ['-eu → -eux', 'un jeu', 'des jeux'],
      ['-ou → -oux (excep.)', 'un genou', 'des genoux'],
    ],
    mistakes: [
      '"Des journales" ❌ → "des journaux" ✓ (-al → -aux es muy frecuente)',
      '"Des gâteaus" ❌ → "des gâteaux" ✓ (-eau → -eaux)',
      '"Un bras / des brass" ❌ → "des bras" ✓ (ya termina en -s, no cambia)',
    ],
  },

  seo: [
    {
      heading: 'El plural en francés: la regla general y las excepciones',
      paragraphs: [
        'La mayoría de los sustantivos franceses forman el plural añadiendo -s al singular, exactamente igual que en español: "un étudiant → des étudiants", "une ville → des villes", "un professeur → des professeurs". Esta regla abarca la gran mayoría de los sustantivos del idioma.',
        'Sin embargo, hay varios grupos de excepciones importantes que debes conocer desde A1 porque aparecen constantemente: los sustantivos en -al, en -eau y en -eu tienen patrones propios de pluralización.',
      ],
    },
    {
      heading: '-al → -aux: el cambio más importante',
      paragraphs: [
        'Los sustantivos terminados en -al hacen el plural en -aux: "un journal" → "des journaux" (periódicos), "un animal" → "des animaux" (animales), "un hôpital" → "des hôpitaux" (hospitales), "un cheval" → "des chevaux" (caballos), "un festival" → "des festivals" (excepción: festivales conserva -s).',
        'Esta es la excepción más frecuente y la más importante para el nivel A1. "Journal" y "animal" son palabras de uso diario que aparecerán constantemente.',
      ],
    },
    {
      heading: '-eau → -eaux y los artículos en plural',
      paragraphs: [
        'Los sustantivos terminados en -eau añaden -x en lugar de -s: "un gâteau → des gâteaux" (pasteles), "un chapeau → des chapeaux" (sombreros), "un bureau → des bureaux" (despachos/escritorios), "un eau → des eaux" (aguas), "un bateau → des bateaux" (barcos).',
        'En cuanto a los artículos, en plural el artículo definido siempre es "les" (sin distinción de género): "le livre → les livres", "la maison → les maisons", "l\'enfant → les enfants". El artículo indefinido "un/une" se convierte en "des": "un étudiant → des étudiants", "une école → des écoles".',
      ],
    },
    {
      heading: 'Sustantivos que no cambian en plural',
      paragraphs: [
        'Si un sustantivo ya termina en -s, -x o -z en singular, no cambia en plural: "un bras → des bras" (brazos), "un choix → des choix" (elecciones), "un nez → des nez" (narices). Solo el artículo y el contexto indican que es plural.',
        'Es importante reconocer este patrón al leer y escuchar, ya que la marca del plural (-s en francés) es muda en pronunciación — "les livres" y "le livre" se distinguen solo por el artículo en la lengua oral.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Plural en francés: regla +s, excepciones -al/-aux, -eau/-eaux, artículos les/des.',
    graphicPrompt: 'Tabla de reglas de plural con ejemplos cotidianos.',
    scene: [
      ['+s (general)', 'un livre → des livres / une maison → des maisons'],
      ['No cambia (-s/-x/-z)', 'un bras → des bras / une voix → des voix'],
      ['-al → -aux', 'un journal → des journaux / un animal → des animaux'],
      ['-eau → -eaux', 'un gâteau → des gâteaux / un bureau → des bureaux'],
      ['-eu → -eux', 'un jeu → des jeux / un neveu → des neveux'],
      ['Artículos', 'le/la → les / un/une → des'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-al → -aux', '-eau → -eaux', 'les/des en plural'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige el plural correcto del sustantivo.',
        type: 'choice',
        items: [
          {
            scene: 'Zhanna lista materiales de clase',
            lines: [['Zhanna', 'Apportez vos ___ demain. (journal)']],
            options: ['journaux', 'journals', 'journales', 'journeaux'],
            answer: 'journaux',
            explain: '"Journal" termina en -al → plural: "journaux". (-al → -aux)',
          },
          {
            scene: 'Carlos compra en la panadería',
            lines: [['Carlos', 'Je voudrais deux ___. (gâteau)']],
            options: ['gâteaux', 'gâteaus', 'gâteaux', 'gâtaux'],
            answer: 'gâteaux',
            explain: '"Gâteau" termina en -eau → plural: "gâteaux". (-eau → -eaux)',
          },
          {
            scene: 'David habla de sus estudiantes',
            lines: [['David', 'Les ___ de WeLearn sont excellents. (étudiant)']],
            options: ['étudiants', 'étudianx', 'étudians', 'étudiant'],
            answer: 'étudiants',
            explain: '"Étudiant" → regla general +s: "étudiants".',
          },
          {
            scene: 'Sofia en el zoológico',
            lines: [['Sofia', 'J\'aime regarder les ___ . (animal)']],
            options: ['animaux', 'animals', 'animales', 'animauxs'],
            answer: 'animaux',
            explain: '"Animal" termina en -al → "animaux". (-al → -aux)',
          },
          {
            scene: 'Marco organiza la oficina',
            lines: [['Marco', 'Il y a trois ___ dans la salle. (bureau)']],
            options: ['bureaux', 'bureaus', 'bureaux', 'bureaux'],
            answer: 'bureaux',
            explain: '"Bureau" termina en -eau → "bureaux". (-eau → -eaux)',
          },
          {
            scene: 'Ana describe su barrio',
            lines: [['Ana', 'Il y a plusieurs ___ dans mon quartier. (hôpital)']],
            options: ['hôpitaux', 'hôpitals', 'hôpitales', 'hôpiteaux'],
            answer: 'hôpitaux',
            explain: '"Hôpital" termina en -al → "hôpitaux". (-al → -aux)',
          },
          {
            scene: 'Lina describe el pelo de alguien',
            lines: [['Lina', 'Elle a de beaux ___. (cheveu)']],
            options: ['cheveux', 'cheveus', 'chevelus', 'cheveaux'],
            answer: 'cheveux',
            explain: '"Cheveu" termina en -eu → "cheveux". (-eu → -eux)',
          },
          {
            scene: 'David sin artículo',
            lines: [['David', 'J\'ai des ___ dans mon sac. (bras — ya termina en -s)']],
            options: ['bras', 'brass', 'brases', 'brasx'],
            answer: 'bras',
            explain: '"Bras" ya termina en -s → no cambia en plural. "Des bras".',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos decisiones',
        tag: '2 espacios',
        intro: 'Elige el artículo plural correcto y la forma plural del sustantivo.',
        type: 'dual',
        items: [
          {
            scene: 'Carlos en la biblioteca',
            lines: [['Carlos', 'Je lis [[0]] [[1]] tous les matins. (journal)']],
            blanks: [
              { options: ['les', 'des', 'un', 'le'], answer: 'les', explain: '"Les journaux" — artículo definido plural.' },
              { options: ['journaux', 'journals', 'journales', 'journeaux'], answer: 'journaux', explain: '-al → -aux: "journaux".' },
            ],
          },
          {
            scene: 'Zhanna en la pastelería',
            lines: [['Zhanna', 'Nous voulons [[0]] [[1]]. (gâteau)']],
            blanks: [
              { options: ['des', 'les', 'un', 'de'], answer: 'des', explain: '"Des gâteaux" — artículo indefinido plural.' },
              { options: ['gâteaux', 'gâteaus', 'gâtaux', 'gâteauxs'], answer: 'gâteaux', explain: '-eau → -eaux: "gâteaux".' },
            ],
          },
          {
            scene: 'Ana en el parque',
            lines: [['Ana', 'Je vois [[0]] [[1]] dans le parc. (animal)']],
            blanks: [
              { options: ['des', 'les', 'un', 'de'], answer: 'des', explain: '"Des animaux" — artículo indefinido plural.' },
              { options: ['animaux', 'animals', 'animales', 'animes'], answer: 'animaux', explain: '-al → -aux: "animaux".' },
            ],
          },
          {
            scene: 'Marco en la sala de reuniones',
            lines: [['Marco', '[[0]] [[1]] de la salle sont neufs. (bureau)']],
            blanks: [
              { options: ['Les', 'Des', 'Un', 'Le'], answer: 'Les', explain: '"Les bureaux" — artículo definido plural.' },
              { options: ['bureaux', 'bureaus', 'bureauxs', 'bureaux'], answer: 'bureaux', explain: '-eau → -eaux: "bureaux".' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Lista de compras',
        tag: 'Texto guiado',
        intro: 'David hace una lista de compras. Elige la forma plural correcta de cada sustantivo.',
        type: 'guidedText',
        scene: 'David prepara una lista de la compra para la fiesta de WeLearn. Elige el plural correcto.',
        text: 'Pour la fête de WeLearn, j\'achète : des [[0]] (gâteau), des [[1]] (fruit), des [[2]] (boisson), des [[3]] (journal) pour la décoration, des [[4]] (chapeau) pour les invités, et des [[5]] (jeu) de société. Les [[6]] (animal) de compagnie ne sont pas invités !',
        blanks: [
          { options: ['gâteaux', 'gâteaus', 'gâtaux', 'gâteauxs'], answer: 'gâteaux', explain: '"Gâteau" → -eau → -eaux: "gâteaux".' },
          { options: ['fruits', 'fruites', 'fruix', 'fruit'], answer: 'fruits', explain: '"Fruit" → +s: "fruits".' },
          { options: ['boissons', 'boissonx', 'boisson', 'boissonaux'], answer: 'boissons', explain: '"Boisson" → +s: "boissons".' },
          { options: ['journaux', 'journals', 'journales', 'journeaux'], answer: 'journaux', explain: '"Journal" → -al → -aux: "journaux".' },
          { options: ['chapeaux', 'chapeaus', 'chapeas', 'chapeauxs'], answer: 'chapeaux', explain: '"Chapeau" → -eau → -eaux: "chapeaux".' },
          { options: ['jeux', 'jeus', 'jeus', 'jeuxs'], answer: 'jeux', explain: '"Jeu" → -eu → -eux: "jeux".' },
          { options: ['animaux', 'animals', 'animales', 'animeaux'], answer: 'animaux', explain: '"Animal" → -al → -aux: "animaux".' },
          { options: ['animaux', 'animals', 'animales', 'animeaux'], answer: 'animaux', explain: 'Confirmación.' },
        ],
      },
      {
        id: 'l4',
        title: 'Escribe el plural',
        tag: 'Texto libre',
        intro: 'Escribe la forma plural correcta del sustantivo entre paréntesis.',
        type: 'freeText',
        scene: 'Zhanna describe la sala de WeLearn. Escribe el plural correcto de cada sustantivo.',
        text: 'Dans notre salle de classe, il y a plusieurs [[0]] (bureau), de nombreux [[1]] (livre) et des [[2]] (journal) en plusieurs langues. Les murs sont décorés avec des [[3]] (tableau). Nos [[4]] (animal) préférés sont les [[5]] (chat) — mais ils ne sont pas dans la salle !',
        blanks: [
          { answer: 'bureaux', accepted: ['bureaux'], explain: '"Bureau" → -eau → -eaux: "bureaux".' },
          { answer: 'livres', accepted: ['livres'], explain: '"Livre" → +s: "livres".' },
          { answer: 'journaux', accepted: ['journaux'], explain: '"Journal" → -al → -aux: "journaux".' },
          { answer: 'tableaux', accepted: ['tableaux'], explain: '"Tableau" → -eau → -eaux: "tableaux".' },
          { answer: 'animaux', accepted: ['animaux'], explain: '"Animal" → -al → -aux: "animaux".' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones en plural usando los sustantivos indicados.',
        type: 'write',
        items: [
          {
            scene: 'Carlos describe lo que lee',
            prompt: 'Di que Carlos lee periódicos y revistas todos los días (journaux + magazines).',
            answer: 'Carlos lit des journaux et des magazines tous les jours.',
            accepted: ['journaux', 'magazines'],
            explain: '"Journal" → "journaux" (-al → -aux). "Magazine" → "magazines" (+s).',
          },
          {
            scene: 'Sofia en la pastelería',
            prompt: 'Di que Sofia compra pasteles y sombreros para la fiesta (gâteaux, chapeaux).',
            answer: 'Sofia achète des gâteaux et des chapeaux pour la fête.',
            accepted: ['gâteaux', 'chapeaux'],
            explain: '"Gâteau" → "gâteaux" / "Chapeau" → "chapeaux" (-eau → -eaux).',
          },
          {
            scene: 'Lina en el zoológico',
            prompt: 'Escribe dos sustantivos con plural irregular que ves en el zoológico.',
            answer: 'Je vois des animaux et des oiseaux au zoo.',
            accepted: ['animaux', 'oiseaux', 'chevaux', 'journaux'],
            explain: '"Animal" → "animaux", "oiseau" → "oiseaux". Irregulares en -al/-eau.',
          },
          {
            scene: 'Marco organiza juegos',
            prompt: 'Di que hay juegos y mesas en la sala (jeux, tables).',
            answer: 'Il y a des jeux et des tables dans la salle.',
            accepted: ['jeux', 'tables'],
            explain: '"Jeu" → "jeux" (-eu → -eux). "Table" → "tables" (+s).',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión: Plural en contexto',
        tag: 'Producción',
        intro: 'Misión: Describe tu clase o tu casa usando al menos 4 sustantivos en plural correctamente formados.',
        type: 'write',
        items: [
          {
            scene: 'Objetos en tu lugar de estudio (+s general)',
            prompt: 'Describe 2 o 3 objetos comunes en plural (+s): libros, cuadernos, sillas, etc.',
            answer: 'Dans ma salle, il y a des livres, des cahiers et des chaises.',
            accepted: ['livres', 'cahiers', 'chaises', 'stylos', 'tables'],
            explain: 'Plural regular +s: livre → livres, cahier → cahiers, chaise → chaises.',
          },
          {
            scene: 'Objetos con plural irregular (-au/-eau/-eu)',
            prompt: 'Usa al menos un sustantivo con plural en -aux o -eaux (bureau, tableau, journal, animal).',
            answer: 'Il y a des tableaux sur les murs et des bureaux pour les professeurs.',
            accepted: ['tableaux', 'bureaux', 'journaux', 'animaux', 'gâteaux', 'chapeaux', 'jeux'],
            explain: 'Plurales irregulares: tableau → tableaux, bureau → bureaux, journal → journaux.',
          },
          {
            scene: 'Descripción completa con artículos',
            prompt: 'Escribe 2 oraciones completas con les... y des... en plural.',
            answer: 'Les étudiants de WeLearn ont des journaux et des livres intéressants.',
            accepted: ['les ', 'des '],
            explain: '"Les" para definido plural, "des" para indefinido plural. Ambos sin género.',
          },
        ],
      },
    ],
  },
}

export default topic
