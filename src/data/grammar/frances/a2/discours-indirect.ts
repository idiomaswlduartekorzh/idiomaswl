import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'discours-indirect',
  order: '16',
  color: '#1a2ecc',
  category: 'Sintaxis',
  level: 'A2',
  title: 'Discurso indirecto en francés A2: il dit que, il demande si',
  shortTitle: 'Discurso indirecto',
  metaTitle: 'Discurso indirecto francés A2 — il dit que, il demande si, discours indirect',
  description:
    'El discurso indirecto en francés permite reportar lo que alguien dice o pregunta. Para afirmaciones: il dit que + indicatif. Para preguntas de sí/no: il demande si. Para preguntas con pronombre interrogativo: il demande où/quand/qui/comment/combien + indicatif. Los pronombres personales y los posesivos cambian. Con verbo introductor en presente, no hay cambio de tiempo verbal.',
  lead: 'Il dit qu\'il est fatigué / Elle demande si tu viens: el discurso indirecto en francés A2.',
  outcomes: [
    'Usar il dit que para reportar afirmaciones',
    'Usar il demande si para preguntas de sí/no',
    'Usar il demande + mot interrogatif para preguntas informativas',
    'Adaptar pronombres personales en el paso a indirecto',
  ],

  guide: {
    goal: 'Reportar las palabras de otros usando il dit que, il demande si y pronombres interrogativos.',
    model: 'Direct: "Je suis fatigué." → Indirect: Il dit qu\'il est fatigué. / Direct: "Tu viens ?" → Indirect: Elle demande si tu viens.',
    formula: 'afirmación: dire que + indicatif | pregunta sí/no: demander si | pregunta info: demander + mot interrog.',
    decisions: [
      'Afirmación: "J\'aime Paris" → Il dit qu\'il aime Paris.',
      'Pregunta sí/no: "Tu viens ?" → Il demande si tu viens.',
      'Pregunta con mot: "Où habites-tu ?" → Il demande où tu habites.',
      'Cambio pronominal: "Je" → il/elle | "tu" → je (según contexto) | "mon" → son',
      'Verbo en présent: no hay concordance des temps en A2 → mismo tiempo',
    ],
    table: [
      ['Tipo discurso', 'Conector', 'Ejemplo'],
      ['Afirmación', 'dire que', 'Il dit qu\'il est malade'],
      ['Pregunta sí/no', 'demander si', 'Elle demande si vous avez le livre'],
      ['Pregunta informativa', 'demander + mot interrog.', 'Il demande où elle habite'],
    ],
    mistakes: [
      '"Il dit que je suis fatiguée" ❌ (si era ella) → verificar el cambio de pronombre.',
      '"Il demande si est-il fatigué" ❌ → "Il demande s\'il est fatigué" ✓ — no se invierte en indirecto.',
      '"Il demande qu\'est-ce que tu fais" ❌ → "Il demande ce que tu fais" ✓ — qu\'est-ce que → ce que.',
    ],
  },

  seo: [
    {
      heading: 'Dire que y demander si: la base del discurso indirecto',
      paragraphs: [
        'Para reportar afirmaciones, se usa dire (o un sinónimo: expliquer, raconter, répondre...) + que + la frase en indicativo: "Marie dit qu\'elle part demain" (María dice que se va mañana). Para preguntas de sí/no, se usa demander si: "Il demande si tu es disponible" (Pregunta si estás disponible). Si empieza por vocal: demander s\': "Il demande s\'il peut venir".',
        'Al pasar al discurso indirecto, los pronombres personales y posesivos cambian según el nuevo contexto: "Je" (hablante original) → il/elle, "tu" (interlocutor original) → il/elle o je según quién sea, "mon/ma/mes" → son/sa/ses. Con verbo introductor en présent, los tiempos verbales NO cambian (en nivel A2).',
      ],
    },
    {
      heading: 'Preguntas informativas en discurso indirecto',
      paragraphs: [
        'Las preguntas con pronombre interrogativo (où, quand, comment, pourquoi, combien, qui) se introducen directamente sin inversión ni est-ce que: "Où habites-tu ?" → "Il demande où tu habites" (el verbo va al final, orden afirmativo). "Qu\'est-ce que tu fais ?" → "Il demande ce que tu fais" (qu\'est-ce que → ce que). "Qu\'est-ce qui se passe ?" → "Il demande ce qui se passe".',
        'Los verbos introductores más comunes: dire (decir), demander (preguntar), expliquer (explicar), répondre (responder), raconter (contar), ajouter (añadir), préciser (precisar).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'dire que / demander si / demander + mot interrog. Cambio pronominal.',
    graphicPrompt: 'Dos personajes: uno habla, otro reporta lo dicho a un tercero.',
    scene: [
      ['"Je suis malade." → Il dit qu\'il est malade.', '"Estoy enfermo." → Dice que está enfermo.'],
      ['"Tu viens ?" → Elle demande si tu viens.', '"¿Vienes?" → Pregunta si vienes.'],
      ['"Où habites-tu ?" → Il demande où tu habites.', '"¿Dónde vives?" → Pregunta dónde vives.'],
      ['"J\'ai faim." → Elle dit qu\'elle a faim.', '"Tengo hambre." → Dice que tiene hambre.'],
      ['"Quand pars-tu ?" → Il demande quand tu pars.', '"¿Cuándo te vas?" → Pregunta cuándo te vas.'],
      ['"Qu\'est-ce que tu fais ?" → Il demande ce que tu fais.', '"¿Qué haces?" → Pregunta qué haces.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['dire que + indicatif', 'demander si (sí/no)', 'demander où/quand/comment', 'ce que/ce qui para qu\'est-ce que'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el conector correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona que, si o el pronombre interrogativo correcto.',
        type: 'choice',
        items: [
          {
            scene: '"J\'ai un problème." → Il dit ___ il a un problème.',
            lines: [['', 'Il dit ___ il a un problème.']],
            options: ["qu'", 'si', 'où', 'comment'],
            answer: "qu'",
            explain: '"Il dit qu\'il..." — afirmación → dire que (qu\' devant voyelle).',
          },
          {
            scene: '"Tu as les clés ?" → Il demande ___ tu as les clés.',
            lines: [['', 'Il demande ___ tu as les clés.']],
            options: ['si', 'que', 'où', 'quand'],
            answer: 'si',
            explain: '"Il demande si..." — pregunta sí/no → demander si.',
          },
          {
            scene: '"Où est-ce que tu travailles ?" → Il demande ___ tu travailles.',
            lines: [['', 'Il demande ___ tu travailles.']],
            options: ['où', 'si', 'que', 'quand'],
            answer: 'où',
            explain: '"Il demande où..." — mot interrogatif où → se conserva en indirecto.',
          },
          {
            scene: '"Comment t\'appelles-tu ?" → Elle demande ___ tu t\'appelles.',
            lines: [['', 'Elle demande ___ tu t\'appelles.']],
            options: ['comment', 'si', 'que', 'qui'],
            answer: 'comment',
            explain: '"Elle demande comment..." — mot interrogatif comment → directo en indirecto.',
          },
          {
            scene: '"Qu\'est-ce que vous voulez ?" → Il demande ___ vous voulez.',
            lines: [['', 'Il demande ___ vous voulez.']],
            options: ['ce que', 'que', 'qu\'est-ce que', 'si'],
            answer: 'ce que',
            explain: '"Il demande ce que..." — qu\'est-ce que → ce que en discurso indirecto.',
          },
          {
            scene: '"Je ne viens pas." → Elle dit ___ elle ne vient pas.',
            lines: [['', 'Elle dit ___ elle ne vient pas.']],
            options: ["qu'", 'si', 'où', 'que'],
            answer: "qu'",
            explain: '"Elle dit qu\'elle..." — afirmación negativa → dire que también.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Pasa al discurso indirecto',
        tag: '2 espacios',
        intro: 'Completa el discurso indirecto con el conector y el pronombre correctos.',
        type: 'dual',
        items: [
          {
            scene: '"J\'ai faim." / "Tu veux manger ?"',
            lines: [['', 'Il dit [[0]] il a faim. Il demande [[1]] tu veux manger.']],
            blanks: [
              { options: ["qu'", 'si', 'où', 'que'], answer: "qu'", explain: '"Il dit qu\'il..." — afirmación → que/qu\'.' },
              { options: ['si', "qu'", 'où', 'quand'], answer: 'si', explain: '"Il demande si..." — pregunta sí/no → si.' },
            ],
          },
          {
            scene: '"Où est la gare ?" / "Quand part le train ?"',
            lines: [['', 'Il demande [[0]] est la gare. Il demande [[1]] part le train.']],
            blanks: [
              { options: ['où', 'si', "qu'", 'quand'], answer: 'où', explain: '"Il demande où..." — mot interrogatif de lugar → où.' },
              { options: ['quand', 'où', 'si', "qu'"], answer: 'quand', explain: '"Il demande quand..." — mot interrogatif de tiempo → quand.' },
            ],
          },
          {
            scene: '"Je suis content." / "Qu\'est-ce qu\'il fait ?"',
            lines: [['', 'Elle dit [[0]] elle est contente. Elle demande [[1]] il fait.']],
            blanks: [
              { options: ["qu'", 'si', 'où', 'que'], answer: "qu'", explain: '"Elle dit qu\'elle est contente" — afirmación → que.' },
              { options: ['ce que', 'que', "qu'est-ce que", 'si'], answer: 'ce que', explain: '"Elle demande ce qu\'il fait" — qu\'est-ce que → ce que.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un mensaje de Marie',
        tag: 'Texto guiado',
        intro: 'Completa el resumen en discurso indirecto.',
        type: 'guidedText',
        scene: 'Pierre résume le message qu\'il a reçu de Marie.',
        text: 'Marie m\'a envoyé un message. Elle dit [[0]] elle arrivera demain matin. Elle demande [[1]] je peux aller la chercher à la gare. Elle veut savoir [[2]] le train arrive. Elle précise aussi [[0]] elle a deux valises. Elle demande [[1]] j\'ai une voiture assez grande.',
        blanks: [
          { options: ["qu'", 'si', 'où', 'ce que'], answer: "qu'", explain: '"Elle dit qu\' / Elle précise qu\'" — afirmaciones → que/qu\'.' },
          { options: ['si', "qu'", 'où', 'quand'], answer: 'si', explain: '"Elle demande si..." — preguntas sí/no → si.' },
          { options: ['quand', 'si', "qu'", 'où'], answer: 'quand', explain: '"Elle veut savoir quand..." — mot interrog. de tiempo → quand.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Pasa al discurso indirecto',
        tag: 'Texto libre',
        intro: 'Sin opciones: transforma las frases directas a discurso indirecto.',
        type: 'freeText',
        scene: 'Écrivez au discours indirect.',
        text: '"Je suis en retard." → Il dit ___. / "Tu as mangé ?" → Elle demande ___. / "Pourquoi tu pleures ?" → Il demande ___. / "Qu\'est-ce que vous cherchez ?" → Elle demande ___.',
        blanks: [
          { answer: "qu'il est en retard", explain: '"il dit qu\'il est en retard" — je → il.' },
          { answer: 'si tu as mangé', explain: '"elle demande si tu as mangé" — pregunta sí/no → si.' },
          { answer: 'pourquoi tu pleures', explain: '"il demande pourquoi tu pleures" — mot interrogatif → directo, sin inversión.' },
          { answer: 'ce que vous cherchez', explain: '"elle demande ce que vous cherchez" — qu\'est-ce que → ce que.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Resume lo que dijo alguien',
        tag: 'Escritura guiada',
        intro: 'Resume en discurso indirecto lo que dijo tu amigo.',
        type: 'write',
        items: [
          {
            scene: '"Je suis très occupé cette semaine."',
            prompt: 'Reporta con "Il/Elle dit que..."',
            answer: 'Il dit qu\'il est très occupé cette semaine.',
            accepted: ['Elle dit qu\'elle est très occupée cette semaine.'],
            explain: '"qu\'il est" — je → il/elle. Mismo tiempo (présent→présent).',
          },
          {
            scene: '"Est-ce que tu veux venir à ma fête ?"',
            prompt: 'Reporta con "Il/Elle demande si..."',
            answer: 'Il demande si tu veux venir à sa fête.',
            accepted: ['Elle demande si vous voulez venir à sa fête.'],
            explain: '"demande si tu veux" — sí/no → si. "ma" → sa (posesivo).',
          },
          {
            scene: '"Où est-ce que tu as acheté ce manteau ?"',
            prompt: 'Reporta con "Il/Elle demande où..."',
            answer: 'Il demande où tu as acheté ce manteau.',
            accepted: ['Elle demande où j\'ai acheté ce manteau.'],
            explain: '"demande où tu as acheté" — où se conserva, no inversión.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Reporta una conversación',
        tag: 'Escritura libre',
        intro: 'Describe una conversación reciente usando il dit que, il demande si, etc.',
        type: 'write',
        items: [
          {
            scene: 'Reporta 3 cosas que te dijo un amigo ayer.',
            prompt: 'Utilisez dire que, expliquer que, raconter que pour rapporter ses paroles.',
            answer: 'Mon ami m\'a appelé hier. Il m\'a dit qu\'il avait trouvé un nouveau travail. Il m\'a expliqué qu\'il commençait la semaine prochaine. Il m\'a aussi raconté qu\'il était très content.',
            accepted: ['Ma collègue m\'a dit qu\'elle partait en vacances. Elle m\'a expliqué qu\'elle allait en Espagne. Elle m\'a raconté qu\'elle avait réservé un hôtel sympa.'],
            explain: '"qu\'il avait / qu\'il commençait / qu\'il était" — je → il, cambio pronominal.',
          },
          {
            scene: 'Reporta 3 preguntas que te hizo alguien.',
            prompt: 'Utilisez demander si, demander où, demander quand, demander comment.',
            answer: 'Ma mère m\'a demandé si j\'avais bien mangé. Elle m\'a demandé quand je revenais à la maison. Elle a aussi demandé comment j\'allais à l\'université.',
            accepted: ['Mon prof m\'a demandé si j\'avais fait mes devoirs. Il m\'a demandé pourquoi j\'étais en retard. Il m\'a demandé ce que je comptais faire.'],
            explain: '"si / quand / comment / pourquoi / ce que" — conectores del discurso indirecto según el tipo de pregunta.',
          },
        ],
      },
    ],
  },
}

export default topic
