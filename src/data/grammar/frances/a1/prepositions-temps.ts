import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'prepositions-temps',
  order: '15',
  color: '#1a2ecc',
  category: 'Prépositions',
  level: 'A1',
  title: 'Les Prépositions de Temps en Français A1',
  shortTitle: 'Prépositions de temps',
  metaTitle: 'Preposiciones de tiempo en francés A1 — à, le, en, dans, au printemps',
  description:
    'Las preposiciones de tiempo en francés tienen lógicas propias: à para horas, le para días de la semana, en para meses y años y estaciones (excepto primavera: au printemps), dans para indicar tiempo futuro.',
  lead: '"En janvier", "le lundi", "à 8 heures", "dans 5 minutes" — cada preposición de tiempo en francés tiene su dominio. Aprende cuál usar con horas, días, meses, estaciones y duraciones.',
  outcomes: [
    'Usa à para horas y le para días de la semana',
    'Aplica en con meses, años y estaciones (excepto au printemps)',
    'Usa dans para expresar tiempo futuro (dans 5 minutes)',
  ],

  guide: {
    goal: 'Usar las preposiciones de tiempo correctas con horas, días, meses, estaciones y tiempo futuro.',
    model: 'Le cours commence à 8 heures. Le lundi, je travaille. En janvier, il fait froid. Au printemps, il fait beau. Dans cinq minutes, je suis prêt.',
    formula: 'à + hora | le + día | en + mes/año/estación (exc. au printemps) | dans + duración futura',
    decisions: [
      'à + hora exacta: à 8 heures, à midi, à minuit, à 14h30',
      'le + día de la semana (sin artículo para "todos los...": le lundi = los lunes)',
      'le matin / le soir / l\'après-midi / la nuit — momentos del día',
      'en + mes: en janvier, en mars, en septembre',
      'en + año: en 2024, en 1990',
      'en + estación (salvo primavera): en été, en automne, en hiver — PERO: au printemps',
      'dans + duración futura: dans 5 minutes, dans une heure, dans deux jours',
    ],
    table: [
      ['Tipo de tiempo', 'Preposición', 'Ejemplo'],
      ['Hora exacta', 'à', 'à 8 heures, à midi'],
      ['Día de la semana', 'le', 'le lundi, le vendredi'],
      ['Mes', 'en', 'en janvier, en mars'],
      ['Año', 'en', 'en 2024, en 1999'],
      ['Estación (exc. printemps)', 'en', 'en été, en automne, en hiver'],
      ['Primavera', 'au', 'au printemps'],
      ['Tiempo futuro', 'dans', 'dans 5 minutes, dans une semaine'],
    ],
    mistakes: [
      '"En lundi" ❌ → "Le lundi" ✓ — los días de la semana usan "le" (no "en")',
      '"En printemps" ❌ → "Au printemps" ✓ — única estación con "au" (es masculino)',
      '"À janvier" ❌ → "En janvier" ✓ — los meses usan "en" (no "à")',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se dice la hora en francés?',
      paragraphs: [
        '"À" es la preposición para indicar la hora exacta: "Le cours commence à 9 heures" (la clase empieza a las 9), "Je mange à midi" (como a mediodía), "Il arrive à 14h30" (llega a las 14:30).',
        'Palabras especiales del tiempo: midi (mediodía), minuit (medianoche), matin (mañana), après-midi (tarde), soir (noche/tarde-noche), nuit (noche). Con estos: "le matin" / "l\'après-midi" / "le soir" / "la nuit" — sin preposición cuando van solos, pero con "à" cuando hay una hora específica.',
      ],
    },
    {
      heading: '¿Cómo se usan los días de la semana en francés?',
      paragraphs: [
        '"Le" con el día de la semana indica una acción habitual (todos los...): "Le lundi, je travaille" (Los lunes, trabajo). Sin "le", se refiere a un día específico: "Lundi, je travaille" (El lunes [próximo], trabajo).',
        'Los días de la semana en francés: lundi (lunes), mardi (martes), mercredi (miércoles), jeudi (jueves), vendredi (viernes), samedi (sábado), dimanche (domingo). Nunca se escriben con mayúscula.',
      ],
    },
    {
      heading: '¿Cuándo se usa "en" con meses, años y estaciones en francés?',
      paragraphs: [
        '"En" es la preposición multipropósito para el tiempo: meses (en janvier, en août), años (en 2024, en 1990) y tres de las cuatro estaciones: en été (en verano), en automne (en otoño), en hiver (en invierno).',
        'La excepción que todo el mundo debe recordar: "au printemps" (en primavera). "Printemps" es masculino y usa "au" (= à + le). Las otras tres estaciones son femeninas: l\'été, l\'automne, l\'hiver — por eso usan "en".',
      ],
    },
    {
      heading: 'Dans: el tiempo futuro desde ahora',
      paragraphs: [
        '"Dans" indica que algo ocurrirá a partir del momento presente: "dans 5 minutes" (en 5 minutos, dentro de 5 minutos), "dans une heure" (dentro de una hora), "dans deux jours" (en dos días), "dans une semaine" (en una semana).',
        'No confundas "dans" con "en": "en" puede indicar duración ("je fais ça en 5 minutes" = lo hago en 5 minutos, expresando rapidez), mientras que "dans" indica el momento futuro de inicio ("je commence dans 5 minutes" = empiezo dentro de 5 minutos).',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Preposiciones de tiempo: à (hora), le (día), en (mes/año/estación), au printemps, dans (futuro).',
    graphicPrompt: 'Línea de tiempo con preposiciones: horas, días, meses, estaciones, futuro.',
    scene: [
      ['à + hora', 'à 8h, à midi, à minuit'],
      ['le + día', 'le lundi, le vendredi, le dimanche'],
      ['en + mes', 'en janvier, en juillet, en décembre'],
      ['en + año', 'en 2024, en 1999'],
      ['en + estación', 'en été, en automne, en hiver'],
      ['au printemps', '← excepción: masculino → au'],
      ['dans + futuro', 'dans 5 minutes, dans une semaine'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['au printemps (excepción)', 'le lundi = los lunes', 'dans = tiempo futuro'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la preposición de tiempo correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Nico anuncia el horario de clase',
            lines: [['Nico', 'Le cours commence ___ 9 heures.']],
            options: ['à', 'en', 'le', 'dans'],
            answer: 'à',
            explain: 'Hora exacta → "à 9 heures".',
          },
          {
            scene: 'Nora describe su rutina',
            lines: [['Nora', '___ lundi, j\'ai trois classes.']],
            options: ['Le', 'En', 'À', 'Dans'],
            answer: 'Le',
            explain: '"Le lundi" = los lunes (habitual). Días de la semana → "le".',
          },
          {
            scene: 'Carlos habla del tiempo que hace',
            lines: [['Carlos', '___ été, il fait très chaud à Bucaramanga.']],
            options: ['En', 'Au', 'Le', 'À'],
            answer: 'En',
            explain: '"Été" es fem. → "en été". (Solo "printemps" usa "au").',
          },
          {
            scene: 'Ana recuerda una fecha importante',
            lines: [['Ana', 'Je suis née ___ 1998.']],
            options: ['en', 'au', 'le', 'dans'],
            answer: 'en',
            explain: 'Años → "en": "en 1998".',
          },
          {
            scene: 'Marco habla del tiempo libre',
            lines: [['Marco', '___ printemps, j\'adore me promener.']],
            options: ['Au', 'En', 'Le', 'À'],
            answer: 'Au',
            explain: '"Printemps" es masculino → "au printemps" (la única excepción entre las estaciones).',
          },
          {
            scene: 'Lina tiene prisa',
            lines: [['Lina', 'Je pars ___ cinq minutes.']],
            options: ['dans', 'en', 'à', 'le'],
            answer: 'dans',
            explain: '"Dans" + tiempo indica que algo ocurrirá a partir de ahora: "dans cinq minutes".',
          },
          {
            scene: 'Sofia habla del invierno',
            lines: [['Sofia', '___ hiver, il neige dans les Alpes.']],
            options: ['En', 'Au', 'Le', 'Dans'],
            answer: 'En',
            explain: '"Hiver" es masc. pero usa "en" (la excepción es solo printemps → au).',
          },
          {
            scene: 'Nico describe su semana',
            lines: [['Nico', 'Je travaille ___ vendredi soir.']],
            options: ['le', 'en', 'à', 'dans'],
            answer: 'le',
            explain: '"Le vendredi soir" = todos los viernes por la noche. Día → "le".',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos decisiones',
        tag: '2 espacios',
        intro: 'Elige las dos preposiciones de tiempo correctas en cada oración.',
        type: 'dual',
        items: [
          {
            scene: 'Carlos describe su horario',
            lines: [['Carlos', '[[0]] lundi, j\'ai cours [[1]] 10 heures.']],
            blanks: [
              { options: ['Le', 'En', 'À', 'Dans'], answer: 'Le', explain: '"Le lundi" = los lunes (habitual).' },
              { options: ['à', 'en', 'le', 'dans'], answer: 'à', explain: '"À 10 heures" — hora exacta.' },
            ],
          },
          {
            scene: 'Nora habla de las estaciones',
            lines: [['Nora', '[[0]] hiver il fait froid mais [[1]] printemps il fait doux.']],
            blanks: [
              { options: ['En', 'Au', 'Le', 'Dans'], answer: 'En', explain: '"En hiver" — estación fem. → en.' },
              { options: ['au', 'en', 'le', 'dans'], answer: 'au', explain: '"Au printemps" — ¡única excepción! Masc. → au.' },
            ],
          },
          {
            scene: 'Ana habla de sus planes',
            lines: [['Ana', 'Je commence [[0]] une heure et je finis [[1]] 3 heures.']],
            blanks: [
              { options: ['dans', 'à', 'en', 'le'], answer: 'dans', explain: '"Dans une heure" = dentro de una hora (futuro).' },
              { options: ['dans', 'à', 'en', 'le'], answer: 'dans', explain: '"Dans 3 heures" = dentro de 3 horas (futuro).' },
            ],
          },
          {
            scene: 'Marco habla del calendario',
            lines: [['Marco', 'Nous commençons [[0]] septembre et nous finissons [[1]] juin.']],
            blanks: [
              { options: ['en', 'au', 'le', 'dans'], answer: 'en', explain: '"En septembre" — mes → en.' },
              { options: ['en', 'au', 'le', 'dans'], answer: 'en', explain: '"En juin" — mes → en.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Un año en WeLearn',
        tag: 'Texto guiado',
        intro: 'Nico describe el calendario de WeLearn. Elige la preposición de tiempo correcta.',
        type: 'guidedText',
        scene: 'Nico explica el calendario anual de la academia WeLearn.',
        text: 'WeLearn commence ses cours [[0]] septembre. [[1]] hiver, les cours intensifs commencent [[2]] 8 heures du matin. [[3]] printemps, on organise des ateliers spéciaux. [[4]] lundi et [[5]] vendredi, Nico enseigne le coréen. Le programme finit [[6]] juin. [[7]] deux semaines, nous publions le calendrier complet.',
        blanks: [
          { options: ['en', 'au', 'le', 'dans'], answer: 'en', explain: '"En septembre" — mes → en.' },
          { options: ['En', 'Au', 'Le', 'Dans'], answer: 'En', explain: '"En hiver" — estación (exc. printemps) → en.' },
          { options: ['à', 'en', 'le', 'dans'], answer: 'à', explain: '"À 8 heures" — hora exacta → à.' },
          { options: ['Au', 'En', 'Le', 'Dans'], answer: 'Au', explain: '"Au printemps" — ¡excepción! Masc. → au.' },
          { options: ['Le', 'En', 'À', 'Dans'], answer: 'Le', explain: '"Le lundi" — día habitual → le.' },
          { options: ['le', 'en', 'à', 'dans'], answer: 'le', explain: '"Le vendredi" — día habitual → le.' },
          { options: ['en', 'au', 'le', 'dans'], answer: 'en', explain: '"En juin" — mes → en.' },
          { options: ['Dans', 'En', 'À', 'Le'], answer: 'Dans', explain: '"Dans deux semaines" — tiempo futuro → dans.' },
        ],
      },
      {
        id: 'l4',
        title: 'Escribe la preposición',
        tag: 'Texto libre',
        intro: 'Escribe la preposición de tiempo correcta en cada espacio.',
        type: 'freeText',
        scene: 'Sofia describe su semana y sus planes. Completa con la preposición correcta.',
        text: 'Je commence à travailler [[0]] lundi à 9 heures. [[1]] janvier, les cours reprennent. J\'ai un examen [[2]] une semaine exactement. [[3]] automne, j\'adore aller à la campagne. Et [[4]] printemps, je fais du jardinage.',
        blanks: [
          { answer: 'le', accepted: ['le', 'Le'], explain: '"Le lundi" — día de la semana con acción habitual.' },
          { answer: 'En', accepted: ['En', 'en'], explain: '"En janvier" — mes → en.' },
          { answer: 'dans', accepted: ['dans', 'Dans'], explain: '"Dans une semaine" — tiempo futuro → dans.' },
          { answer: 'En', accepted: ['En', 'en'], explain: '"En automne" — estación (no printemps) → en.' },
          { answer: 'au', accepted: ['au', 'Au'], explain: '"Au printemps" — ¡única excepción! Masc. → au.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones completas con las preposiciones de tiempo indicadas.',
        type: 'write',
        items: [
          {
            scene: 'Nico anuncia el comienzo de clases',
            prompt: 'Di que las clases empiezan en septiembre, los lunes a las 9 de la mañana.',
            answer: 'Les cours commencent en septembre, le lundi à 9 heures du matin.',
            accepted: ['en septembre', 'le lundi', 'à 9', 'à 9 heures'],
            explain: '"En septembre" (mes), "le lundi" (día habitual), "à 9 heures" (hora).',
          },
          {
            scene: 'Carlos habla de sus estaciones favoritas',
            prompt: 'Di qué haces en verano y en primavera (en été / au printemps).',
            answer: 'En été, je vais à la plage. Au printemps, je fais du vélo.',
            accepted: ['en été', 'au printemps'],
            explain: '"En été" (est. fem.) / "au printemps" (excepción: masc. → au).',
          },
          {
            scene: 'Nora anuncia algo inminente',
            prompt: 'Di que la reunión empieza dentro de diez minutos (dans).',
            answer: 'La réunion commence dans dix minutes.',
            accepted: ['dans dix minutes', 'dans 10 minutes', 'dans une heure', 'dans deux jours'],
            explain: '"Dans" + duración = evento que ocurrirá a partir de ahora.',
          },
          {
            scene: 'Lina describe su año favorito',
            prompt: 'Di en qué año naciste y en qué mes (en + año, en + mes).',
            answer: 'Je suis né(e) en 1995, en mars.',
            accepted: ['en 19', 'en 20', 'en janvier', 'en mars', 'en juillet'],
            explain: 'Años → en. Meses → en. Ejemplo: "Je suis né(e) en 2000, en octobre."',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión: Mi agenda semanal',
        tag: 'Producción',
        intro: 'Misión: Describe tu semana y tus planes usando à, le, en y dans correctamente.',
        type: 'write',
        items: [
          {
            scene: 'Tu horario semanal (le + día / à + hora)',
            prompt: 'Di dos días de la semana y a qué hora tienes clase o trabajo (le lundi à Xh).',
            answer: 'Le lundi à 9 heures, j\'ai cours de français. Le vendredi à 18 heures, je travaille.',
            accepted: ['le lundi', 'le mardi', 'le mercredi', 'le jeudi', 'le vendredi', 'le samedi', 'le dimanche', 'à '],
            explain: '"Le + día" para habitual. "À + hora" para la hora exacta.',
          },
          {
            scene: 'Tu mes y estación favorita (en / au)',
            prompt: 'Di en qué mes y estación prefieres estudiar (en + mes / en o au + estación).',
            answer: "J'aime étudier en octobre, en automne. C'est ma saison préférée.",
            accepted: ['en janvier', 'en mars', 'en juillet', 'en été', 'en automne', 'en hiver', 'au printemps'],
            explain: '"En + mes" siempre. "En + estación" (hiver/été/automne) pero "au printemps".',
          },
          {
            scene: 'Tus planes próximos (dans)',
            prompt: 'Di dos cosas que vas a hacer pronto (dans + duración).',
            answer: 'Dans une heure, je vais faire du sport. Dans deux jours, j\'ai un examen.',
            accepted: ['dans ', 'dans une heure', 'dans deux', 'dans cinq', 'dans une semaine'],
            explain: '"Dans" + duración = futuro desde ahora. Ejemplo: dans 5 minutes, dans une heure.',
          },
        ],
      },
    ],
  },
}

export default topic
