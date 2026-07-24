import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'superlatifs',
  order: '08',
  color: '#1a2ecc',
  category: 'Comparación',
  level: 'A2',
  title: 'Superlativos en francés A2: le plus, le moins, le meilleur',
  shortTitle: 'Superlativos',
  metaTitle: 'Superlativos en francés A2 — le plus, le moins, le meilleur, la pire',
  description:
    'Los superlativos en francés expresan el grado máximo: le/la/les plus + adj (el/la más), le/la/les moins + adj (el/la menos). El artículo concuerda con el sustantivo. Con sustantivos: le plus de / le moins de. Los irregulares: le meilleur (el mejor), le pire (el peor), le mieux (lo mejor — adverbio). El complemento llega con de: la plus grande ville de France.',
  lead: 'C\'est le restaurant le plus cher de Paris: los superlativos en francés A2.',
  outcomes: [
    'Formar superlativos con le/la/les plus/moins + adj',
    'Usar le/la + meilleur(e), le pire, le mieux',
    'Añadir el complemento con de + groupe nominal',
    'Distinguir la posición del superlativo según el adjetivo',
  ],

  guide: {
    goal: 'Expresar el grado máximo o mínimo con superlativos en francés.',
    model: 'C\'est le film le plus intéressant que j\'ai vu. (Es la película más interesante que he visto.) / C\'est la meilleure boulangerie du quartier. (Es la mejor panadería del barrio.)',
    formula: 'le/la/les + plus/moins + adj (+ de + N) | le/la/les + meilleur(e)(s) / le/la pire',
    decisions: [
      'Adj après le nom: N + le/la/les + plus/moins + adj → "le livre le plus intéressant"',
      'Adj avant le nom (court): le/la/les + plus/moins + adj + N → "la plus belle ville"',
      'Complément: + de + N → "la plus grande ville de France"',
      'Irréguliers: bon → le meilleur/la meilleure; bien → le mieux; mauvais → le pire/la pire',
      'De + article contracté: de + le = du, de + les = des → "le meilleur du monde"',
    ],
    table: [
      ['Tipo', 'Estructura', 'Ejemplo'],
      ['Adj largo (après)', 'N + le plus/moins + adj', 'le film le plus intéressant'],
      ['Adj corto (avant)', 'le/la plus/moins + adj + N', 'la plus belle actrice'],
      ['Irreg.', 'le/la meilleur(e), le pire', 'le meilleur café de Paris'],
    ],
    mistakes: [
      '"le plus bon" ❌ → "le meilleur" ✓ — bon tiene forma superlativa irregular.',
      '"le plus bien" ❌ → "le mieux" ✓ — bien también tiene irregular.',
      '"le plus grande ville" ❌ → "la plus grande ville" ✓ — el artículo concuerda con N (femenino).',
    ],
  },

  seo: [
    {
      heading: 'Superlativos en francés: posición del adjetivo',
      paragraphs: [
        'La posición del superlativo depende de dónde va el adjetivo normalmente. Si el adjetivo va después del sustantivo (la mayoría): "le film le plus intéressant" (la película más interesante) — el artículo aparece dos veces. Si el adjetivo va antes del sustantivo (grand, petit, beau, bon...): "la plus belle ville" (la ciudad más bonita) — un solo artículo delante del superlativo.',
        'El complemento del superlativo usa de (de + le = du, de + les = des): "le restaurant le plus cher de Paris", "le meilleur café du quartier", "les meilleures pizzas des États-Unis".',
      ],
    },
    {
      heading: 'Superlativos irregulares: le meilleur, le mieux, le pire',
      paragraphs: [
        'Los tres superlativos irregulares más importantes: le meilleur / la meilleure / les meilleurs / les meilleures (el/la mejor, los/las mejores) — de bon (adjetivo); le mieux (lo mejor) — de bien (adverbio); le pire / la pire / les pires (el/la peor) — de mauvais.',
        '"C\'est le meilleur film de l\'année" (Es la mejor película del año) — meilleur es adjetivo, concuerda. "C\'est lui qui chante le mieux" (Es él quien canta mejor) — mieux es adverbio, no concuerda.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'le/la/les plus + adj, le meilleur/pire, position del adjetivo.',
    graphicPrompt: 'Podio con los tres primeros puestos: primero, segundo, tercero.',
    scene: [
      ['C\'est la ville la plus peuplée de France.', 'Es la ciudad más poblada de Francia.'],
      ['Il est le meilleur étudiant de la classe.', 'Es el mejor estudiante de la clase.'],
      ['C\'est le pire film que j\'ai jamais vu.', 'Es la peor película que he visto jamás.'],
      ['La plus belle plage se trouve en Bretagne.', 'La playa más bonita está en Bretaña.'],
      ['C\'est lui qui travaille le mieux.', 'Es él quien trabaja mejor (de todos).'],
      ['Quel est le moins cher ?', '¿Cuál es el menos caro?'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['le/la/les + plus/moins + adj', 'le meilleur/la meilleure', 'le pire', '+ de + complément'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma el superlativo correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma superlativa correcta.',
        type: 'choice',
        items: [
          {
            scene: 'La ciudad más grande de Francia.',
            lines: [['', 'la ville ___ grande de France']],
            options: ['la plus', 'le plus', 'la moins', 'plus'],
            answer: 'la plus',
            explain: '"la ville la plus grande" — ville es femenino → la plus. El artículo concuerda.',
          },
          {
            scene: 'El mejor restaurante del barrio.',
            lines: [['', 'le ___ restaurant du quartier']],
            options: ['meilleur', 'plus bon', 'mieux', 'plus bien'],
            answer: 'meilleur',
            explain: '"le meilleur restaurant" = el mejor restaurante. Irregular de bon.',
          },
          {
            scene: 'Es la peor decisión que tomé.',
            lines: [['', 'C\'est la ___ décision que j\'ai prise.']],
            options: ['pire', 'moins bonne', 'plus mauvaise', 'pires'],
            answer: 'pire',
            explain: '"la pire décision" = la peor decisión. pire concuerda con décision (femenino).',
          },
          {
            scene: 'Los estudiantes menos serios de la clase.',
            lines: [['', 'les étudiants ___ sérieux de la classe']],
            options: ['les moins', 'le moins', 'les plus', 'moins de'],
            answer: 'les moins',
            explain: '"les étudiants les moins sérieux" — adjetivo après le nom (masculin pluriel → les).',
          },
          {
            scene: 'Es ella quien trabaja mejor (adverbio).',
            lines: [['', 'C\'est elle qui travaille ___.']],
            options: ['le mieux', 'la meilleure', 'le meilleur', 'le plus bien'],
            answer: 'le mieux',
            explain: '"le mieux" = superlativo de bien (adverbio). No concuerda.',
          },
          {
            scene: 'La película más aburrida que he visto.',
            lines: [['', 'le film ___ ennuyeux que j\'ai vu']],
            options: ['le plus', 'la plus', 'les plus', 'plus'],
            answer: 'le plus',
            explain: '"le film le plus ennuyeux" — film es masculino → le plus.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Superlativo y complemento',
        tag: '2 espacios',
        intro: 'Completa el superlativo y añade el complemento con de.',
        type: 'dual',
        items: [
          {
            scene: 'La ciudad más bonita de Europa.',
            lines: [['', 'la plus [[0]] ville [[1]] Europe']],
            blanks: [
              { options: ['belle', 'beau', 'belles', 'bon'], answer: 'belle', explain: '"la plus belle ville" — belle porque ville es femenino.' },
              { options: ['d\'', 'de', 'du', 'des'], answer: 'd\'', explain: '"d\'Europe" — de + voyelle → d\'.' },
            ],
          },
          {
            scene: 'El mejor café del mundo.',
            lines: [['', 'le [[0]] café [[1]] monde']],
            blanks: [
              { options: ['meilleur', 'plus bon', 'mieux', 'meilleure'], answer: 'meilleur', explain: '"le meilleur café" = el mejor café. Irregular de bon (masc.).' },
              { options: ['du', 'de', 'de le', 'd\''], answer: 'du', explain: '"du monde" = de + le = du.' },
            ],
          },
          {
            scene: 'Los mejores estudiantes de la escuela.',
            lines: [['', 'les [[0]] étudiants de [[1]] école']],
            blanks: [
              { options: ['meilleurs', 'meilleur', 'meilleures', 'plus bons'], answer: 'meilleurs', explain: '"les meilleurs étudiants" = los mejores estudiantes (masculin pluriel).' },
              { options: ['l\'', 'la', 'les', 'le'], answer: 'l\'', explain: '"de l\'école" — de + voyelle → de l\'.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Rankings y clasificaciones',
        tag: 'Texto guiado',
        intro: 'Completa el texto de clasificación con superlativos.',
        type: 'guidedText',
        scene: 'On fait un classement des villes françaises.',
        text: 'Paris est [[0]] grande ville de France. C\'est aussi [[1]] ville touristique du pays. La tour Eiffel est [[2]] monument de Paris. Lyon est connue pour avoir [[3]] gastronomie [[4]] réputée de France.',
        blanks: [
          { options: ['la plus', 'le plus', 'la moins', 'plus'], answer: 'la plus', explain: '"la plus grande ville" — ville femenino → la plus.' },
          { options: ['la plus', 'le plus', 'la moins', 'plus'], answer: 'la plus', explain: '"la plus touristique" — ville sous-entendu, femenino → la plus.' },
          { options: ['la', 'le', 'les', 'l\''], answer: 'la', explain: '"la meilleure gastronomie" — el artículo corresponde a gastronomie (femenino).' },
          { options: ['la plus', 'le plus', 'la moins', 'les plus'], answer: 'la plus', explain: '"la plus réputée de France" — réputée concuerda con gastronomie (femenino).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa el superlativo',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe el superlativo correcto.',
        type: 'freeText',
        scene: 'Complétez avec le bon superlatif.',
        text: 'C\'est [[0]] bon film de l\'année. (el mejor) / Ce sont [[1]] étudiantes sérieuses. (las más) / Elle chante [[2]]. (lo mejor — adverbio) / C\'est [[3]] pire solution. (la peor)',
        blanks: [
          { answer: 'le meilleur', explain: '"le meilleur film" = el mejor film. Irregular de bon (masc.).' },
          { answer: 'les plus', explain: '"les plus sérieuses" = las más serias. étudiantes femenino plural → les.' },
          { answer: 'le mieux', explain: '"chante le mieux" = canta lo mejor. Superlativo de bien (adverbio).' },
          { answer: 'la', explain: '"la pire solution" — pire ya lleva el superlativo implícito; el artículo es la (femenino).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Escribe superlativos',
        tag: 'Escritura guiada',
        intro: 'Escribe la frase superlativa completa.',
        type: 'write',
        items: [
          {
            scene: 'Es la mejor película del año.',
            prompt: 'film / bon / année (el mejor)',
            answer: 'C\'est le meilleur film de l\'année.',
            accepted: ['C\'est le meilleur film de cette année.'],
            explain: '"le meilleur film" = el mejor film. Irregular de bon + de l\'année.',
          },
          {
            scene: 'Es la ciudad más pequeña del país.',
            prompt: 'ville / petit / pays (la más pequeña)',
            answer: 'C\'est la plus petite ville du pays.',
            accepted: ['C\'est la ville la plus petite du pays.'],
            explain: '"la plus petite ville" — petit va avant le nom → la + plus + adj + N.',
          },
          {
            scene: 'Son los estudiantes menos motivados de la clase.',
            prompt: 'étudiants / motivé / classe (los menos)',
            answer: 'Ce sont les étudiants les moins motivés de la classe.',
            accepted: ['Ce sont les moins motivés de la classe.'],
            explain: '"les étudiants les moins motivés" — motivé après le nom → N + les moins + adj.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Tu top 3 personal',
        tag: 'Escritura libre',
        intro: 'Escribe tu top 3 personal usando superlativos.',
        type: 'write',
        items: [
          {
            scene: 'Escribe tu top 3 de películas, libros o lugares.',
            prompt: 'Faites votre top 3 avec des superlatifs.',
            answer: 'Le meilleur film que j\'ai vu est Parasite. La ville la plus belle que j\'ai visitée est Kyoto. Le plat le plus délicieux est les sushis.',
            accepted: ['Pour moi, le meilleur livre de l\'année est... La plus belle chanson est... Le pire film est...'],
            explain: 'Usa le/la/les + plus/moins + adj + de + N. Irregulares: meilleur, pire, mieux.',
          },
          {
            scene: 'Describe el mejor y el peor día de tu semana.',
            prompt: 'Décrivez le meilleur et le pire jour de votre semaine.',
            answer: 'Le meilleur jour de la semaine est le vendredi. C\'est le jour le plus agréable. Le pire jour est le lundi — c\'est le moins reposant.',
            accepted: ['Le samedi est le meilleur jour pour moi car c\'est le plus calme. Le lundi est le pire.'],
            explain: '"le meilleur jour" et "le pire jour" = los irregulares de bon y mauvais.',
          },
        ],
      },
    ],
  },
}

export default topic
