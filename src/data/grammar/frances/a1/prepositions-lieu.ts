import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'prepositions-lieu',
  order: '14',
  color: '#1a2ecc',
  category: 'Prépositions',
  level: 'A1',
  title: 'Les Prépositions de Lieu en Français A1',
  shortTitle: 'Prépositions de lieu',
  metaTitle: 'Preposiciones de lugar en francés A1 — à, en, au, aux, dans, sur, sous',
  description:
    'Las preposiciones de lugar en francés dependen del tipo de lugar: à para ciudades, en para países femeninos o que empiezan por vocal, au para países masculinos, aux para países en plural, dans para "dentro de", sur/sous/devant/derrière para relaciones espaciales.',
  lead: 'À, en, au, aux — cuatro palabras para hablar de lugares, ¡y cada una depende del género y número del país o lugar! Memoriza el patrón y sitúa cualquier lugar del mundo.',
  outcomes: [
    'Usa à/en/au/aux correctamente con ciudades y países',
    'Distingue dans/sur/sous/devant/derrière para posiciones espaciales',
    'Identifica el género de los países más comunes',
  ],

  guide: {
    goal: 'Usar las preposiciones de lugar correctas con ciudades, países y posiciones espaciales.',
    model: 'Je vais à Paris. Elle habite en France. Il travaille au Mexique. Nous sommes aux États-Unis.',
    formula: 'à + ciudad | en + país fem./vocal | au + país masc. | aux + países plural',
    decisions: [
      'à + ciudad (sin artículo): à Paris, à Bogotá, à Tokyo, à Madrid',
      'en + país femenino o empezando por vocal: en France, en Espagne, en Italie, en Allemagne, en Australie',
      'au + país masculino: au Mexique, au Brésil, au Canada, au Japon, au Portugal',
      'aux + países en plural: aux États-Unis, aux Pays-Bas, aux Philippines',
      'dans (dentro de un espacio): dans la salle, dans le sac, dans la ville',
      'sur (sobre/encima): sur la table, sur le mur / sous (debajo): sous la chaise',
      'devant (delante) / derrière (detrás): devant la maison, derrière le bâtiment',
    ],
    table: [
      ['Tipo de lugar', 'Preposición', 'Ejemplo'],
      ['Ciudad', 'à', 'à Paris, à Bogotá'],
      ['País fem. / vocal', 'en', 'en France, en Italie'],
      ['País masc.', 'au', 'au Mexique, au Brésil'],
      ['País plural', 'aux', 'aux États-Unis'],
      ['Espacio interior', 'dans', 'dans la salle'],
      ['Encima / debajo', 'sur / sous', 'sur la table / sous le livre'],
    ],
    mistakes: [
      '"Je vais en Paris" ❌ → "à Paris" ✓ — ciudades siempre con "à" (sin artículo)',
      '"Il habite au France" ❌ → "en France" ✓ — France es femenino → en',
      '"Nous allons en Mexique" ❌ → "au Mexique" ✓ — Mexique es masculino → au',
    ],
  },

  seo: [
    {
      heading: 'À, en, au, aux: la clave es el género y número del lugar',
      paragraphs: [
        'Las preposiciones de lugar en francés son más sistemáticas de lo que parecen. La regla más importante: con ciudades siempre se usa "à" (à Paris, à Bogotá, à Rome). Con países, la preposición depende del género y número: "en" para países femeninos o que empiezan por vocal (en France, en Espagne, en Australie), "au" para países masculinos (au Brésil, au Canada, au Japon) y "aux" para países en plural (aux États-Unis, aux Pays-Bas).',
        'La mayoría de los países que terminan en -e son femeninos (France, Espagne, Italie, Allemagne, Belgique, Suisse, Chine). Los que no terminan en -e suelen ser masculinos (le Mexique excepción: termina en -e pero es masculino; le Brésil, le Canada, le Japon, le Portugal).',
      ],
    },
    {
      heading: 'Cómo saber el género de los países',
      paragraphs: [
        'La regla general: los países que terminan en -e son femeninos (la France, l\'Espagne, l\'Italie, l\'Allemagne). Las excepciones más importantes son: le Mexique, le Cambodge, le Zimbabwe (terminan en -e pero son masculinos).',
        'Países masculinos frecuentes: le Brésil, le Canada, le Japon, le Portugal, le Maroc, le Pérou, le Chili. Países que empiezan por vocal son siempre "en" independientemente del género: en Australie, en Iran, en Irak, en Ouganda.',
      ],
    },
    {
      heading: 'Dans, sur, sous, devant, derrière',
      paragraphs: [
        '"Dans" expresa estar dentro de un espacio: "dans la salle" (en la sala), "dans mon sac" (en mi bolsa), "dans le placard" (en el armario). Es la preposición de interioridad.',
        '"Sur" = sobre/encima: "sur la table" (sobre la mesa). "Sous" = debajo: "sous la chaise" (debajo de la silla). "Devant" = delante: "devant la maison" (delante de la casa). "Derrière" = detrás: "derrière le bâtiment" (detrás del edificio).',
      ],
    },
    {
      heading: 'Diferencia entre à y dans con lugares',
      paragraphs: [
        '"À" indica una ubicación general o destino: "Je suis à Paris" (estoy en París), "je vais à la bibliothèque" (voy a la biblioteca). "Dans" indica el interior de un espacio: "je suis dans la bibliothèque" (estoy dentro de la biblioteca), "je travaille dans un bureau" (trabajo en una oficina).',
        'Con nombres de villes (ciudades) y pays (países) siempre se usa "à/en/au/aux". Con edificios concretos, "dans" es más específico que "à".',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Preposiciones de lugar: à (ciudad), en/au/aux (país según género), dans/sur/sous (espacio).',
    graphicPrompt: 'Mapa del mundo con preposiciones y tabla de posiciones espaciales.',
    scene: [
      ['à + ciudad', 'à Paris, à Bogotá, à Tokyo, à Madrid'],
      ['en + país fem./vocal', 'en France, en Espagne, en Italie, en Australie'],
      ['au + país masc.', 'au Mexique, au Brésil, au Canada, au Japon'],
      ['aux + plural', 'aux États-Unis, aux Pays-Bas'],
      ['dans (interior)', 'dans la salle, dans le sac, dans la ville'],
      ['sur / sous / devant / derrière', 'sur la table / sous le livre / devant l\'école'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['à ciudad vs en/au país', 'género de países', 'dans = interior'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la preposición de lugar correcta.',
        type: 'choice',
        items: [
          {
            scene: 'David anuncia un viaje',
            lines: [['David', 'Je vais ___ Paris la semaine prochaine.']],
            options: ['à', 'en', 'au', 'aux'],
            answer: 'à',
            explain: 'Ciudad → siempre "à": "je vais à Paris".',
          },
          {
            scene: 'Zhanna habla de su origen',
            lines: [['Zhanna', 'Je viens ___ Ukraine. (Ukraine, femenino)']],
            options: ['d\'', 'du', 'des', 'de'],
            answer: "d'",
            explain: 'Origen de país fem./vocal: "de + pays" → "d\'Ukraine" (en francés, la preposición d\'origine es de/d\').',
          },
          {
            scene: 'Carlos describe su viaje de sueño',
            lines: [['Carlos', 'Je rêve d\'aller ___ Japon. (Japon, masculino)']],
            options: ['au', 'en', 'à', 'aux'],
            answer: 'au',
            explain: '"Japon" es masculino → "au Japon".',
          },
          {
            scene: 'Ana estudia idiomas',
            lines: [['Ana', 'Elle habite ___ Espagne depuis 2 ans.']],
            options: ['en', 'au', 'à', 'aux'],
            answer: 'en',
            explain: '"Espagne" termina en -e → femenino → "en Espagne".',
          },
          {
            scene: 'Marco habla de su familia',
            lines: [['Marco', 'Ma famille est ___ États-Unis. (plural)']],
            options: ['aux', 'au', 'en', 'à'],
            answer: 'aux',
            explain: '"États-Unis" es plural → "aux États-Unis".',
          },
          {
            scene: 'Sofia busca sus llaves',
            lines: [['Sofia', 'Mes clés sont ___ mon sac.']],
            options: ['dans', 'sur', 'sous', 'devant'],
            answer: 'dans',
            explain: '"Dans" = dentro de un espacio. Las llaves están dentro del bolso.',
          },
          {
            scene: 'Lina describe la clase',
            lines: [['Lina', 'Les livres sont ___ la table.']],
            options: ['sur', 'sous', 'dans', 'derrière'],
            answer: 'sur',
            explain: '"Sur" = encima/sobre. Los libros están sobre la mesa.',
          },
          {
            scene: 'David describe la escuela',
            lines: [['David', 'Il y a un jardin ___ l\'école.']],
            options: ['devant', 'sur', 'dans', 'sous'],
            answer: 'devant',
            explain: '"Devant" = delante. El jardín está delante de la escuela.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos decisiones',
        tag: '2 espacios',
        intro: 'Elige la preposición correcta para dos lugares en cada oración.',
        type: 'dual',
        items: [
          {
            scene: 'Carlos habla de sus países favoritos',
            lines: [['Carlos', 'Je veux vivre [[0]] France et [[1]] Japon. (femenino / masculino)']],
            blanks: [
              { options: ['en', 'à', 'au', 'aux'], answer: 'en', explain: '"France" es fem. → "en France".' },
              { options: ['au', 'en', 'à', 'aux'], answer: 'au', explain: '"Japon" es masc. → "au Japon".' },
            ],
          },
          {
            scene: 'Zhanna busca objetos',
            lines: [['Zhanna', 'Mon livre est [[0]] la table et mon stylo est [[1]] la chaise.']],
            blanks: [
              { options: ['sur', 'sous', 'dans', 'devant'], answer: 'sur', explain: '"Sur" = encima de la mesa.' },
              { options: ['sous', 'sur', 'dans', 'devant'], answer: 'sous', explain: '"Sous" = debajo de la silla.' },
            ],
          },
          {
            scene: 'David y Ana viajan',
            lines: [['David', 'David habite [[0]] Bogotá et il va [[1]] Brésil cet été.']],
            blanks: [
              { options: ['à', 'en', 'au', 'aux'], answer: 'à', explain: '"Bogotá" es una ciudad → "à Bogotá".' },
              { options: ['au', 'en', 'à', 'aux'], answer: 'au', explain: '"Brésil" es masc. → "au Brésil".' },
            ],
          },
          {
            scene: 'Lina describe el aula',
            lines: [['Lina', 'Le professeur est [[0]] le bureau et les étudiants sont [[1]] la salle.']],
            blanks: [
              { options: ['derrière', 'devant', 'sur', 'sous'], answer: 'derrière', explain: '"Derrière" = detrás (del escritorio).' },
              { options: ['dans', 'sur', 'devant', 'sous'], answer: 'dans', explain: '"Dans" = dentro de la sala.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Viaje con WeLearn',
        tag: 'Texto guiado',
        intro: 'David describe un viaje cultural de WeLearn. Elige la preposición correcta en cada caso.',
        type: 'guidedText',
        scene: 'David describe el viaje de estudiantes de WeLearn por el mundo.',
        text: 'Les étudiants de WeLearn voyagent ! Ana habite [[0]] Madrid — elle est [[1]] Espagne. Carlos est allé [[2]] Brésil l\'an dernier. Zhanna est originaire [[3]] Ukraine mais elle habite maintenant [[0a]] Bucaramanga. Marco vit [[4]] États-Unis. Et Lina va partir [[5]] Japon la semaine prochaine. Tout le monde se retrouve [[6]] la salle de classe virtuelle de WeLearn.',
        blanks: [
          { options: ['à', 'en', 'au', 'aux'], answer: 'à', explain: '"Madrid" es ciudad → "à Madrid".' },
          { options: ['en', 'au', 'à', 'aux'], answer: 'en', explain: '"Espagne" termina en -e → fem. → "en Espagne".' },
          { options: ['au', 'en', 'à', 'aux'], answer: 'au', explain: '"Brésil" es masc. → "au Brésil".' },
          { options: ["d'", 'du', 'de', 'des'], answer: "d'", explain: '"Ukraine" empieza por vocal → "d\'Ukraine" (origen: de/d\').' },
          { options: ['aux', 'au', 'en', 'à'], answer: 'aux', explain: '"États-Unis" es plural → "aux États-Unis".' },
          { options: ['au', 'en', 'à', 'aux'], answer: 'au', explain: '"Japon" es masc. → "au Japon".' },
          { options: ['dans', 'sur', 'devant', 'sous'], answer: 'dans', explain: '"Dans la salle" = dentro de la sala virtual.' },
          { options: ['à', 'en', 'au', 'aux'], answer: 'à', explain: 'Extra confirming blank.' },
        ],
      },
      {
        id: 'l4',
        title: 'Escribe la preposición',
        tag: 'Texto libre',
        intro: 'Escribe la preposición correcta en cada espacio.',
        type: 'freeText',
        scene: 'Marco habla de su trabajo y sus viajes. Completa con la preposición correcta.',
        text: 'Je travaille [[0]] Paris mais je viens [[1]] Portugal. Tous les étés, je vais [[2]] Italie pour voir ma famille. L\'an prochain, je veux aller [[3]] États-Unis. Mon bureau est [[4]] la salle principale — et mon chat dort [[5]] mon bureau !',
        blanks: [
          { answer: 'à', accepted: ['à'], explain: '"Paris" es ciudad → "à Paris".' },
          { answer: 'du', accepted: ['du', 'de'], explain: 'Origen: "du Portugal" (masc.) o simplemente "de Portugal" también aceptado.' },
          { answer: 'en', accepted: ['en'], explain: '"Italie" termina en -e → fem. → "en Italie".' },
          { answer: 'aux', accepted: ['aux'], explain: '"États-Unis" es plural → "aux États-Unis".' },
          { answer: 'dans', accepted: ['dans'], explain: '"Dans la salle" = dentro de la sala.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando preposiciones de lugar.',
        type: 'write',
        items: [
          {
            scene: 'David habla de sus viajes de trabajo',
            prompt: 'Di que David va a Seúl (ciudad en Corea del Sur) y a Japón este año.',
            answer: 'David va à Séoul et au Japon cette année.',
            accepted: ['à Séoul', 'au Japon', 'en Corée'],
            explain: '"Séoul" = ciudad → à. "Japon" = masc. → au.',
          },
          {
            scene: 'Zhanna describe la oficina',
            prompt: 'Di que los libros están sobre la mesa y que la bolsa está debajo de la silla.',
            answer: 'Les livres sont sur la table et le sac est sous la chaise.',
            accepted: ['sur la table', 'sous la chaise'],
            explain: '"Sur" = encima. "Sous" = debajo.',
          },
          {
            scene: 'Carlos habla de su origen',
            prompt: 'Di que Carlos es de Colombia (país fem.) y que ahora vive en España.',
            answer: 'Carlos vient de Colombie et il habite maintenant en Espagne.',
            accepted: ['de Colombie', 'en Espagne', 'en Colombie', 'en Espagne'],
            explain: 'Colombia = fem. (Colombie) → de Colombie. Espagne = fem. → en Espagne.',
          },
          {
            scene: 'Ana describe dónde está todo en su mochila',
            prompt: 'Escribe dónde están tres objetos en tu clase o tu mochila (dans/sur/sous/devant).',
            answer: 'Mon cahier est dans mon sac. Mon stylo est sur la table. Mon téléphone est devant moi.',
            accepted: ['dans mon sac', 'dans le sac', 'sur la table', 'sous', 'devant', 'derrière'],
            explain: 'Usa dans (interior), sur (encima), sous (debajo), devant (delante), derrière (detrás).',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión: Dónde estás y adónde vas',
        tag: 'Producción',
        intro: 'Misión: Escribe sobre tu ciudad, tu país y un país que quieres visitar, usando à/en/au/aux correctamente.',
        type: 'write',
        items: [
          {
            scene: 'Tu ciudad y país actuales',
            prompt: 'Di en qué ciudad y país vives (à + ciudad, en/au/aux + país).',
            answer: 'J\'habite à Bogotá, en Colombie.',
            accepted: ['à ', 'en Colombie', 'au Mexique', 'en Espagne', 'aux États-Unis', 'au Brésil'],
            explain: 'Ejemplo: J\'habite à Bogotá, en Colombie. / Je vis à Madrid, en Espagne.',
          },
          {
            scene: 'Un país que quieres visitar',
            prompt: 'Di a qué país quieres ir (au/en/aux) y a qué ciudad (à).',
            answer: 'Je veux aller au Japon et visiter Tokyo.',
            accepted: ['au Japon', 'en France', 'aux États-Unis', 'en Italie', 'au Brésil', 'à Tokyo', 'à Paris', 'à New York'],
            explain: 'País masc. → au. País fem. → en. Países plural → aux. Ciudad → à.',
          },
          {
            scene: 'Un objeto en tu espacio actual',
            prompt: 'Describe dónde está algo en tu habitación o sala usando dans/sur/sous/devant/derrière.',
            answer: 'Mon ordinateur est sur mon bureau et mes livres sont dans mon sac.',
            accepted: ['dans ', 'sur ', 'sous ', 'devant ', 'derrière '],
            explain: 'Usa la preposición espacial correcta: dans (interior), sur (encima), sous (debajo).',
          },
        ],
      },
    ],
  },
}

export default topic
