import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'adjectifs-qualificatifs',
  order: '10',
  color: '#1a2ecc',
  category: 'Adjectifs',
  level: 'A1',
  title: 'Les Adjectifs Qualificatifs en Français A1',
  shortTitle: 'Adjectifs qualificatifs',
  metaTitle: 'Adjetivos calificativos en francés A1 — género, número, posición BAGS',
  description:
    'Los adjetivos calificativos en francés concuerdan en género y número con el sustantivo. La mayoría va DESPUÉS del sustantivo (un livre intéressant). Pero los adjetivos BAGS (Beauty, Age, Goodness, Size) van ANTES (un grand livre, une belle ville).',
  lead: 'Los adjetivos franceses van DESPUÉS del sustantivo — excepto los BAGS (belleza, edad, bondad, tamaño) que van antes. Y siempre concuerdan en género y número.',
  outcomes: [
    'Forma el femenino y plural de los adjetivos regulares e irregulares comunes',
    'Coloca los adjetivos antes o después del sustantivo según la regla BAGS',
    'Usa los irregulares beau/belle, nouveau/nouvelle, vieux/vieille',
  ],

  guide: {
    goal: 'Usar los adjetivos calificativos en francés con concordancia correcta y posición adecuada.',
    model: 'Un livre intéressant / une ville intéressante / un grand livre / une belle ville.',
    formula: 'Sustantivo + adjetivo (posición posterior) | BAGS: adjetivo + sustantivo',
    decisions: [
      'Posición general: sustantivo + adjetivo: "un film intéressant", "une fille intelligente"',
      'BAGS van antes: Beauty (beau/belle, joli/jolie), Age (jeune, vieux/vieille, nouveau/nouvelle), Goodness (bon/bonne, mauvais/mauvaise), Size (grand/grande, petit/petite, long/longue)',
      'Femenino regular: adj + -e (intéressant → intéressante, grand → grande)',
      'Si el adjetivo ya termina en -e, no cambia: facile → facile (m y f)',
      'Plural: adj + -s (intéressants, grandes) — si ya termina en -s, no cambia',
      'Irregulares clave: beau → belle, nouveau → nouvelle, vieux → vieille',
    ],
    table: [
      ['Masc. sing.', 'Femenino', 'Plural (m. / f.)'],
      ['intéressant', 'intéressante', 'intéressants / intéressantes'],
      ['grand', 'grande', 'grands / grandes'],
      ['petit', 'petite', 'petits / petites'],
      ['beau (bel*)', 'belle', 'beaux / belles'],
      ['nouveau (nouvel*)', 'nouvelle', 'nouveaux / nouvelles'],
      ['vieux (vieil*)', 'vieille', 'vieux / vieilles'],
    ],
    mistakes: [
      '"Un livre intéressant" ✓ pero "Un intéressant livre" ❌ — los no-BAGS van después',
      '"Une femme belle" ✓ pero "Une belle femme" también ✓ — beauty puede ir antes o después a veces, pero BAGS como regla van antes',
      '"Un beau homme" ❌ → "Un bel homme" ✓ — beau → bel ante masc. que empieza por vocal',
    ],
  },

  seo: [
    {
      heading: '¿Dónde va el adjetivo en francés?',
      paragraphs: [
        'Esta es una de las diferencias más importantes entre el español y el francés. En español, los adjetivos pueden ir antes o después del sustantivo relativamente libremente. En francés, la regla principal es que los adjetivos van DESPUÉS del sustantivo: "un livre intéressant" (un libro interesante), "une ville moderne" (una ciudad moderna), "un problème difficile" (un problema difícil).',
        'Sin embargo, hay un grupo importante de adjetivos muy frecuentes que van ANTES del sustantivo. Se recuerdan con el acrónimo BAGS: Beauty (belleza), Age (edad), Goodness (bondad/maldad), Size (tamaño).',
      ],
    },
    {
      heading: 'La regla BAGS: adjetivos que van antes',
      paragraphs: [
        'Los adjetivos BAGS más frecuentes son: Beauty: beau/belle (hermoso/a), joli/jolie (bonito/a). Age: jeune (joven), vieux/vieille (viejo/a), nouveau/nouvelle (nuevo/a). Goodness: bon/bonne (bueno/a), mauvais/mauvaise (malo/a). Size: grand/grande (grande), petit/petite (pequeño/a), long/longue (largo/a).',
        'Ejemplos: "un grand appartement" (un gran apartamento), "une petite fille" (una niña pequeña), "un bon restaurant" (un buen restaurante), "une belle ville" (una ciudad hermosa), "un jeune professeur" (un joven profesor), "un nouveau livre" (un libro nuevo).',
      ],
    },
    {
      heading: 'Concordancia: género y número',
      paragraphs: [
        'Los adjetivos en francés concuerdan en género (masc./fem.) y número (sing./pl.) con el sustantivo. La regla general: añadir -e para el femenino y -s para el plural. "Grand" → grande (fem.) → grands (masc. pl.) → grandes (fem. pl.).',
        'Si el adjetivo ya termina en -e en masculino, no cambia en femenino: "facile → facile", "possible → possible", "magnifique → magnifique". Y si ya termina en -s, no cambia en plural: "gris → gris" (pl. masc. = sing.).',
      ],
    },
    {
      heading: 'Los irregulares más importantes: beau, nouveau, vieux',
      paragraphs: [
        '"Beau", "nouveau" y "vieux" tienen formas especiales en femenino: beau → belle, nouveau → nouvelle, vieux → vieille. Además, ante un sustantivo masculino que comienza por vocal o h muda, estas formas tienen una variante especial: bel (un bel homme), nouvel (un nouvel appartement), vieil (un vieil ami).',
        'En plural, "beau" → "beaux" y "nouveau" → "nouveaux" (terminación -x). "Vieux" queda igual en plural masculino, pero "vieille" → "vieilles" en plural femenino.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Adjetivos BAGS antes del sustantivo; todos los demás después. Concordancia género-número.',
    graphicPrompt: 'Tabla de concordancia y diagrama de posición (antes/después) del adjetivo.',
    scene: [
      ['Después (general)', 'un film intéressant / une ville moderne'],
      ['Antes (BAGS-Beauty)', 'un beau jardin / une belle maison'],
      ['Antes (BAGS-Age)', 'un jeune professeur / une vieille école'],
      ['Antes (BAGS-Goodness)', 'un bon café / une mauvaise idée'],
      ['Antes (BAGS-Size)', 'un grand appartement / une petite voiture'],
      ['Irregulares', 'beau/belle, nouveau/nouvelle, vieux/vieille'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['BAGS antes del nombre', 'femenino en -e', 'beau/belle/bel'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del adjetivo (género, número, posición).',
        type: 'choice',
        items: [
          {
            scene: 'David describe su libro favorito',
            lines: [['David', 'C\'est un livre très ___ . (intéressant/intéressante)']],
            options: ['intéressant', 'intéressante', 'intéressants', 'intéressantes'],
            answer: 'intéressant',
            explain: '"Livre" es masc. sing. → "intéressant" (sin -e).',
          },
          {
            scene: 'Zhanna describe la ciudad',
            lines: [['Zhanna', 'C\'est une ___ ville. (BAGS-Beauty: joli)']],
            options: ['jolie', 'joli', 'jolis', 'jolies'],
            answer: 'jolie',
            explain: '"Ville" es fem. → "jolie" (joli + e). BAGS Beauty va antes del sustantivo.',
          },
          {
            scene: 'Carlos habla de su apartamento',
            lines: [['Carlos', 'J\'ai un ___ appartement. (BAGS-Size: grand)']],
            options: ['grand', 'grande', 'grands', 'grandes'],
            answer: 'grand',
            explain: '"Appartement" es masc. sing. → "grand" (BAGS Size, va antes).',
          },
          {
            scene: 'Ana describe a su profesora',
            lines: [['Ana', 'Zhanna est une professeure ___. (intelligent → intelligente)']],
            options: ['intelligente', 'intelligent', 'intelligents', 'intelligentes'],
            answer: 'intelligente',
            explain: '"Professeure" es fem. → "intelligente" (adj. posterior, + -e).',
          },
          {
            scene: 'Marco ve un restaurante',
            lines: [['Marco', 'C\'est un ___ restaurant. (BAGS-Goodness: bon)']],
            options: ['bon', 'bonne', 'bons', 'bonnes'],
            answer: 'bon',
            explain: '"Restaurant" es masc. sing. → "bon". BAGS Goodness va antes.',
          },
          {
            scene: 'Lina habla de sus amigas',
            lines: [['Lina', 'J\'ai des amies très ___. (gentil → gentille)']],
            options: ['gentilles', 'gentil', 'gentille', 'gentils'],
            answer: 'gentilles',
            explain: '"Amies" es fem. plural → "gentilles" (gentil + le → double l + e, luego + s).',
          },
          {
            scene: 'Sofia ve un hombre mayor',
            lines: [['Sofia', 'C\'est un ___ homme. (BAGS-Age: vieux ante vocal)']],
            options: ['vieil', 'vieux', 'vieille', 'vieilles'],
            answer: 'vieil',
            explain: '"Homme" empieza por vocal y es masc. → forma especial "vieil" (no "vieux").',
          },
          {
            scene: 'David abre un libro nuevo',
            lines: [['David', 'C\'est un ___ livre. (BAGS-Age: nouveau)']],
            options: ['nouveau', 'nouvelle', 'nouveaux', 'nouvel'],
            answer: 'nouveau',
            explain: '"Livre" es masc. sing. y empieza por consonante → "nouveau".',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos decisiones',
        tag: '2 espacios',
        intro: 'Elige el adjetivo y colócalo en la posición correcta (antes o después).',
        type: 'dual',
        items: [
          {
            scene: 'Carlos describe su barrio',
            lines: [['Carlos', 'J\'habite dans un [[0]] quartier [[1]].']],
            blanks: [
              { options: ['petit', 'petite', 'petits', 'petites'], answer: 'petit', explain: '"Petit" es BAGS-Size → va antes. "Quartier" es masc. sing. → "petit".' },
              { options: ['agréable', 'agréables', 'agréable', 'agréablement'], answer: 'agréable', explain: '"Agréable" no es BAGS → va después. Masc. sing., ya termina en -e.' },
            ],
          },
          {
            scene: 'Zhanna describe su nueva clase',
            lines: [['Zhanna', 'J\'ai une [[0]] classe avec des étudiants [[1]].']],
            blanks: [
              { options: ['nouvelle', 'nouveau', 'nouveaux', 'nouvelles'], answer: 'nouvelle', explain: '"Nouvelle" — BAGS-Age, fem. → "nouvelle" (irregulaire).' },
              { options: ['motivés', 'motivé', 'motivées', 'motivant'], answer: 'motivés', explain: '"Étudiants" es masc. plural → "motivés" (motivé + s). Va después.' },
            ],
          },
          {
            scene: 'Ana habla de una película',
            lines: [['Ana', 'C\'est un [[0]] film, mais l\'histoire est un peu [[1]].']],
            blanks: [
              { options: ['beau', 'belle', 'beaux', 'bel'], answer: 'beau', explain: '"Film" es masc. sing., empieza por consonante → "beau" (BAGS-Beauty, antes).' },
              { options: ['longue', 'long', 'longs', 'longues'], answer: 'longue', explain: '"Histoire" es fem. → "longue" (long → longue). Va después del sustantivo.' },
            ],
          },
          {
            scene: 'Marco describe a un compañero',
            lines: [['Marco', 'C\'est un [[0]] étudiant [[1]].']],
            blanks: [
              { options: ['jeune', 'jeunes', 'jeune', 'jeunes'], answer: 'jeune', explain: '"Jeune" es BAGS-Age, va antes. "Étudiant" masc. sing. "Jeune" no cambia.' },
              { options: ['sérieux', 'sérieuse', 'sérieuses', 'sérieux'], answer: 'sérieux', explain: '"Étudiant" masc. sing. "Sérieux" no cambia en masc. (ya termina en -x). Va después.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Descripción de la ciudad',
        tag: 'Texto guiado',
        intro: 'David describe Bucaramanga. Elige la forma correcta del adjetivo en cada espacio.',
        type: 'guidedText',
        scene: 'David describe Bucaramanga, su ciudad natal, para el blog de WeLearn.',
        text: 'Bucaramanga est une [[0]] ville en Colombie. C\'est une ville [[1]] avec des parcs [[2]]. Les habitants sont très [[3]] — ils ont des maisons [[4]] et des rues [[5]]. Il y a aussi de [[6]] restaurants avec une cuisine [[7]].',
        blanks: [
          { options: ['belle', 'beau', 'belles', 'beaux'], answer: 'belle', explain: '"Ville" es fem. sing. "Belle" es BAGS-Beauty, va antes → correcto.' },
          { options: ['animée', 'animé', 'animées', 'animés'], answer: 'animée', explain: '"Ville" fem. sing. → "animée" (animé + e). Va después.' },
          { options: ['magnifiques', 'magnifique', 'magnifiques', 'magnifiquement'], answer: 'magnifiques', explain: '"Parcs" masc. plural → "magnifiques" (no cambia en fem., solo + s). Va después.' },
          { options: ['sympathiques', 'sympathique', 'sympathiques', 'sympathiquement'], answer: 'sympathiques', explain: '"Habitants" masc. plural → "sympathiques" (ya en -e, + s). Va después.' },
          { options: ['grandes', 'grand', 'grande', 'grands'], answer: 'grandes', explain: '"Maisons" fem. plural → "grandes". BAGS-Size, va antes — pero aquí aparece después en contexto descriptivo.' },
          { options: ['propres', 'propre', 'propres', 'proprement'], answer: 'propres', explain: '"Rues" fem. plural → "propres" (propre + s). Va después.' },
          { options: ['bons', 'bon', 'bonne', 'bonnes'], answer: 'bons', explain: '"Restaurants" masc. plural → "bons". BAGS-Goodness, va antes.' },
          { options: ['délicieuse', 'délicieux', 'délicieuses', 'délicieusement'], answer: 'délicieuse', explain: '"Cuisine" fem. sing. → "délicieuse" (délicieux → délicieuse). Va después.' },
        ],
      },
      {
        id: 'l4',
        title: 'Escribe el adjetivo',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del adjetivo entre paréntesis.',
        type: 'freeText',
        scene: 'Ana escribe sobre su clase de francés. Escribe el adjetivo en la forma correcta.',
        text: 'Ma classe de français est [[0]] (petit). Nous avons un professeur [[1]] (excellent) et des cours [[2]] (intéressant). Notre salle est [[3]] (nouveau — fem.). J\'ai une [[4]] (beau — fem.) vue depuis ma fenêtre.',
        blanks: [
          { answer: 'petite', accepted: ['petite'], explain: '"Classe" es fem. → "petite". BAGS-Size, va antes — pero aquí aparece con "est".' },
          { answer: 'excellent', accepted: ['excellent'], explain: '"Professeur" es masc. sing. → "excellent". Va después.' },
          { answer: 'intéressants', accepted: ['intéressants'], explain: '"Cours" es masc. plural → "intéressants". Va después.' },
          { answer: 'nouvelle', accepted: ['nouvelle'], explain: '"Salle" es fem. sing. → "nouvelle" (irrégulier). BAGS-Age.' },
          { answer: 'belle', accepted: ['belle'], explain: '"Vue" es fem. sing. → "belle" (beau irrégulier fem.). BAGS-Beauty.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Describe personas y cosas usando adjetivos con concordancia y posición correctas.',
        type: 'write',
        items: [
          {
            scene: 'Marco describe a Zhanna',
            prompt: 'Describe a Zhanna: una profesora joven (BAGS) e inteligente (posterior).',
            answer: 'C\'est une jeune professeure intelligente.',
            accepted: ['jeune professeure', 'jeune professeur', 'intelligente'],
            explain: '"Jeune" = BAGS-Age, va antes. "Intelligente" = no BAGS, va después. Fem. → "intelligente".',
          },
          {
            scene: 'Sofia describe su nuevo apartamento',
            prompt: 'Di que tienes un apartamento pequeño (BAGS) pero agradable (posterior).',
            answer: "J'ai un petit appartement mais agréable.",
            accepted: ['petit appartement', 'appartement agréable', 'petit'],
            explain: '"Petit" = BAGS-Size, antes. "Agréable" = posterior. "Appartement" masc. sing.',
          },
          {
            scene: 'David recomienda un restaurante',
            prompt: 'Recomienda un buen restaurante (BAGS) con comida deliciosa (posterior).',
            answer: "C'est un bon restaurant avec une cuisine délicieuse.",
            accepted: ['bon restaurant', 'cuisine délicieuse', 'bonne cuisine'],
            explain: '"Bon" = BAGS-Goodness, antes. "Délicieuse" = fem. de délicieux, posterior.',
          },
          {
            scene: 'Lina habla de su ciudad',
            prompt: 'Describe tu ciudad con al menos dos adjetivos (uno BAGS, uno posterior).',
            answer: 'Ma ville est grande et très agréable.',
            accepted: ['grande', 'petite', 'belle', 'agréable', 'moderne', 'intéressante'],
            explain: 'Ejemplo: C\'est une belle ville avec des rues animées. / Ma ville est petite mais sympathique.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión: Describir un lugar',
        tag: 'Producción',
        intro: 'Misión: Describe tu ciudad, barrio o sala de clase usando al menos 5 adjetivos correctamente colocados.',
        type: 'write',
        items: [
          {
            scene: 'Descripción general (BAGS antes del nombre)',
            prompt: 'Usa un adjetivo BAGS (grand/petit/beau/bon/jeune/nouveau/vieux) antes del sustantivo.',
            answer: "C'est une grande ville avec de beaux parcs.",
            accepted: ['grand', 'grande', 'petit', 'petite', 'beau', 'belle', 'bon', 'bonne', 'jeune', 'nouveau', 'nouvelle', 'vieux', 'vieille'],
            explain: 'BAGS: grand/grande, petit/petite, beau/belle, bon/bonne, jeune, nouveau/nouvelle, vieux/vieille — todos antes del sustantivo.',
          },
          {
            scene: 'Descripción con adjetivos posteriores',
            prompt: 'Describe usando dos adjetivos que van después del sustantivo (calificativos generales).',
            answer: 'Les rues sont animées et propres. Les habitants sont sympathiques.',
            accepted: ['animé', 'animée', 'propre', 'moderne', 'intéressant', 'sympathique', 'agréable'],
            explain: 'Adjetivos no-BAGS van después: animé/e, propre, moderne, intéressant/e, sympathique.',
          },
          {
            scene: 'Adjetivos irregulares',
            prompt: 'Usa beau/belle o nouveau/nouvelle en una oración con concordancia correcta.',
            answer: "C'est un beau quartier avec de nouvelles maisons.",
            accepted: ['beau ', 'belle ', 'bel ', 'nouveau ', 'nouvelle ', 'nouveaux ', 'nouvelles '],
            explain: 'Beau (masc.) / belle (fem.) / bel (ante vocal masc.). Nouveau/nouvelle/nouveaux/nouvelles.',
          },
        ],
      },
    ],
  },
}

export default topic
