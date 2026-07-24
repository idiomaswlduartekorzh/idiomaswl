import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pronoms-y-en',
  order: '10',
  color: '#1a2ecc',
  category: 'Pronombres',
  level: 'A2',
  title: 'Pronombres y y en en francés A2: lugar, cosa y cantidad',
  shortTitle: 'Pronombres y/en',
  metaTitle: 'Pronombres y y en en francés A2 — y (lugar/à+cosa), en (de+cosa/partitivo)',
  description:
    'Los pronombres y y en son dos pronombres adverbiales esenciales del francés. Y reemplaza un complemento de lugar (à/dans/sur/en + lieu) o un complemento introduzido por à + cosa (no persona). En reemplaza un complemento introducido por de + cosa/cantidad/partitivo. Ambos van ANTES del verbo (excepto en imperativo afirmativo). Son muy frecuentes en el francés cotidiano.',
  lead: 'J\'y vais / J\'en veux: los dos pronombres más usados con lugar y cantidad en francés.',
  outcomes: [
    'Usar y para reemplazar un lugar o à + cosa',
    'Usar en para reemplazar de + cosa o cantidad partitiva',
    'Colocar y y en antes del verbo',
    'Distinguir en de le/la/les (COD) en contexto',
  ],

  guide: {
    goal: 'Usar y (lugar/à+cosa) y en (de+cosa/partitivo) para evitar repeticiones en francés.',
    model: 'Tu vas à Paris ? — Oui, j\'y vais. (¿Vas a París? — Sí, voy allí.) / Tu veux du café ? — Oui, j\'en veux. (¿Quieres café? — Sí, quiero.)',
    formula: 'y → à/dans/sur/en + lieu o à + chose | en → de + chose / du/de la/des + N',
    decisions: [
      'y (lugar): "Je vais à Paris" → "J\'y vais" / "Il est dans la salle" → "Il y est"',
      'y (à + chose): "Je pense à ce problème" → "J\'y pense"',
      'en (de + chose): "Je parle de ce film" → "J\'en parle"',
      'en (partitivo): "Tu veux du café ?" → "Oui, j\'en veux" (de ello, de él)',
      'en (cantidad): "J\'ai trois livres" → "J\'en ai trois" (de ellos tengo tres)',
    ],
    table: [
      ['Pronombre', 'Reemplaza', 'Ejemplo'],
      ['y', 'à/dans/sur/en + lieu', '"J\'y vais" (← Je vais à Paris)'],
      ['y', 'à + chose', '"J\'y pense" (← Je pense à ce projet)'],
      ['en', 'de + chose / partitivo', '"J\'en veux" (← Je veux du café)'],
    ],
    mistakes: [
      '"J\'y pense à elle" ❌ — y solo reemplaza à + chose, no personas (→ je pense à elle).',
      '"J\'en parle de lui" ❌ — en reemplaza de + chose, no personas (→ je parle de lui).',
      '"Vas-y !" ✓ — imperativo afirmativo: y va después del verbo.',
    ],
  },

  seo: [
    {
      heading: 'Y: el pronombre de lugar y à + chose',
      paragraphs: [
        'Y reemplaza cualquier complemento de lugar: "Je vais au supermarché" → "J\'y vais" (voy allí). También reemplaza un complemento introducido por à cuando se refiere a una cosa (no persona): "Je pense à mon travail" → "J\'y pense" (pienso en ello). Para personas, hay que usar à + pronom tonique: "Je pense à elle" (no ❌ "J\'y pense").',
        'La pregunta "Tu y vas souvent ?" (¿Vas allí a menudo?) y la respuesta "Oui, j\'y vais / Non, je n\'y vais pas" son modelos de este pronombre en la conversación cotidiana.',
      ],
    },
    {
      heading: 'En: partitivo, cantidad y de + cosa',
      paragraphs: [
        'En reemplaza los artículos partitivos (du/de la/des) + nombre: "Tu veux du pain ?" → "Oui, j\'en veux" (Sí, quiero). También reemplaza de + nombre en complementos verbales: "Je parle de ce film" → "J\'en parle". Y cuando hay una cantidad: "J\'ai trois frères" → "J\'en ai trois" — el número queda al final.',
        'La diferencia clave con COD le/la/les: "Je mange du gâteau" → "J\'en mange" (partitivo → en); "Je mange ce gâteau" → "Je le mange" (determinado → le).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'y = lieu/à+chose | en = du-de la-des+N / de+chose. Position: avant le verbe.',
    graphicPrompt: 'Mapa con flecha "j\'y vais" y una taza con "j\'en veux".',
    scene: [
      ['Tu vas à la boulangerie ? — J\'y vais maintenant.', '¿Vas a la panadería? — Voy ahora.'],
      ['Tu as du lait ? — Oui, j\'en ai.', '¿Tienes leche? — Sí, tengo.'],
      ['Il pense à son travail. — Il y pense.', 'Piensa en su trabajo.'],
      ['Elle parle souvent de ce film. — Elle en parle souvent.', 'Habla a menudo de esa película.'],
      ['Tu veux combien de baguettes ? — J\'en veux deux.', '¿Cuántas baguettes quieres? — Quiero dos.'],
      ['Vas-y ! N\'en mange pas trop !', '¡Ve allí! ¡No comas demasiado!'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['y = lieu/à+chose', 'en = du/de la/de+chose', 'position avant le verbe', 'Vas-y / N\'y va pas'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige y o en',
        tag: 'Opción múltiple',
        intro: 'Selecciona y o en para reemplazar el complemento.',
        type: 'choice',
        items: [
          {
            scene: 'Il va à l\'école. → Il ___ va.',
            lines: [['', 'Il ___ va.']],
            options: ['y', 'en', 'lui', 'le'],
            answer: 'y',
            explain: '"y va" = va allí (à l\'école → lieu → y).',
          },
          {
            scene: 'Je veux du café. → J\'___ veux.',
            lines: [['', 'J\'___ veux.']],
            options: ['en', 'y', 'le', 'lui'],
            answer: 'en',
            explain: '"j\'en veux" = quiero (du café → partitivo → en).',
          },
          {
            scene: 'Elle parle de ce problème. → Elle ___ parle.',
            lines: [['', 'Elle ___ parle.']],
            options: ['en', 'y', 'lui', 'le'],
            answer: 'en',
            explain: '"en parle" = habla de ello (de ce problème → de + chose → en).',
          },
          {
            scene: 'Il pense à son projet. → Il ___ pense.',
            lines: [['', 'Il ___ pense.']],
            options: ['y', 'en', 'lui', 'le'],
            answer: 'y',
            explain: '"y pense" = piensa en ello (à son projet → à + chose → y).',
          },
          {
            scene: 'Tu as des enfants ? — Oui, j\'___ ai deux.',
            lines: [['', 'Oui, j\'___ ai deux.']],
            options: ['en', 'y', 'les', 'lui'],
            answer: 'en',
            explain: '"j\'en ai deux" = tengo dos (de ellos). Cantidad + en.',
          },
          {
            scene: 'Vas à la gare ! → ___ va !',
            lines: [['', '___ va !']],
            options: ['Vas-y', 'Vas-en', 'Y vas', 'En vas'],
            answer: 'Vas-y',
            explain: '"Vas-y !" = ¡Ve allí! Imperativo afirmativo: V + y après le verbe.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'y y en en contexto',
        tag: '2 espacios',
        intro: 'Completa el diálogo con y o en.',
        type: 'dual',
        items: [
          {
            scene: 'Tu vas souvent à Paris ? / Tu as des amis là-bas ?',
            lines: [['', 'J\'[[0]] vais souvent. J\'[[1]] ai plusieurs.']],
            blanks: [
              { options: ['y', 'en', 'lui', 'le'], answer: 'y', explain: '"j\'y vais" = voy allí (à Paris → y).' },
              { options: ['en', 'y', 'les', 'lui'], answer: 'en', explain: '"j\'en ai plusieurs" = tengo varios (des amis → en + quantité).' },
            ],
          },
          {
            scene: 'Tu penses à ton examen ? / Tu parles souvent de tes études ?',
            lines: [['', 'Oui, j\'[[0]] pense tout le temps. Et j\'[[1]] parle beaucoup aussi.']],
            blanks: [
              { options: ['y', 'en', 'lui', 'le'], answer: 'y', explain: '"j\'y pense" = pienso en ello (à mon examen → y).' },
              { options: ['en', 'y', 'lui', 'le'], answer: 'en', explain: '"j\'en parle" = hablo de ello (de mes études → en).' },
            ],
          },
          {
            scene: 'Il reste du gâteau ? / Et des biscuits ?',
            lines: [['', 'Oui, il [[0]] reste encore. Mais il n\'[[1]] reste plus.']],
            blanks: [
              { options: ['en', 'y', 'le', 'lui'], answer: 'en', explain: '"il en reste encore" = queda aún (du gâteau → en).' },
              { options: ['en', 'y', 'le', 'lui'], answer: 'en', explain: '"il n\'en reste plus" = no queda más (de biscuits → en).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Conversación en la tienda',
        tag: 'Texto guiado',
        intro: 'Completa el diálogo con y o en.',
        type: 'guidedText',
        scene: 'Un client parle avec le vendeur dans une épicerie.',
        text: 'Client: Bonjour ! Vous avez du pain de campagne ? Vendeur: Oui, nous [[0]] avons. Client: J\'[[1]] prends deux. Et des tomates ? Vendeur: Il [[2]] reste quelques-unes. Client: Je vais aussi au marché — vous [[3]] allez ? Vendeur: J\'[[4]] vais parfois. Client: Vous pensez souvent aux promotions ? Vendeur: Oui, j\'[[5]] pense toujours !',
        blanks: [
          { options: ['en', 'y', 'le', 'lui'], answer: 'en', explain: '"en avons / j\'en prends / il en reste" = partitivo → en.' },
          { options: ['y', 'en', 'lui', 'le'], answer: 'y', explain: '"y allez / j\'y vais / j\'y pense" = lieu/à+chose → y.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Reemplaza con y o en',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe y o en para reemplazar el complemento.',
        type: 'freeText',
        scene: 'Remplacez le complément souligné par y ou en.',
        text: 'Elle va à la bibliothèque. → Elle [[0]] va. / Il mange de la pizza. → Il [[1]] mange. / Nous pensons à notre voyage. → Nous [[2]] pensons. / Il a des sœurs ? — Oui, il [[3]] a trois.',
        blanks: [
          { answer: 'y', explain: '"Elle y va" = va allí (lieu → y).' },
          { answer: 'en', explain: '"Il en mange" = come de ella (de la pizza → en partitivo).' },
          { answer: 'y', explain: '"Nous y pensons" = pensamos en ello (à notre voyage → à + chose → y).' },
          { answer: 'en', explain: '"Il en a trois" = tiene tres (des sœurs → en + quantité).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Contesta usando y o en',
        tag: 'Escritura guiada',
        intro: 'Responde la pregunta usando y o en en tu respuesta.',
        type: 'write',
        items: [
          {
            scene: 'Tu vas souvent au cinéma ?',
            prompt: 'Répondez avec "y" (oui ou non).',
            answer: 'Oui, j\'y vais souvent. / Non, je n\'y vais pas souvent.',
            accepted: ['Oui, j\'y vais le week-end.'],
            explain: '"j\'y vais" = voy allí (au cinéma → lieu → y).',
          },
          {
            scene: 'Tu as du temps libre ce week-end ?',
            prompt: 'Répondez avec "en" (oui ou non).',
            answer: 'Oui, j\'en ai beaucoup. / Non, je n\'en ai pas.',
            accepted: ['Oui, j\'en ai un peu.'],
            explain: '"j\'en ai" = tengo (du temps libre → en partitivo).',
          },
          {
            scene: 'Tu penses à tes vacances ?',
            prompt: 'Répondez avec "y".',
            answer: 'Oui, j\'y pense tout le temps !',
            accepted: ['Oui, j\'y pense souvent.'],
            explain: '"j\'y pense" = pienso en ello (à mes vacances → à + chose → y).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Habla de tu vida cotidiana con y y en',
        tag: 'Escritura libre',
        intro: 'Escribe sobre lugares que frecuentas y cosas que tienes usando y y en.',
        type: 'write',
        items: [
          {
            scene: 'Describe los lugares que visitas frecuentemente usando y.',
            prompt: 'Parlez de vos lieux habituels avec y.',
            answer: 'Je vais souvent à la bibliothèque — j\'y vais deux fois par semaine. J\'aime aussi le parc, j\'y passe du temps le week-end.',
            accepted: ['J\'habite près du marché. J\'y vais tous les samedis. Je n\'y vais jamais le dimanche.'],
            explain: '"j\'y vais / j\'y passe" = y reemplaza à + lieu.',
          },
          {
            scene: 'Describe qué tienes o no tienes en tu nevera usando en.',
            prompt: 'Parlez du contenu de votre réfrigérateur avec en.',
            answer: 'J\'ai du lait dans le frigo — j\'en ai beaucoup. Il y a aussi des légumes, j\'en ai peu. Par contre, je n\'en ai pas de jus de fruits.',
            accepted: ['J\'ai des œufs, j\'en ai six. Du fromage ? J\'en ai un peu. Du beurre ? Je n\'en ai plus.'],
            explain: '"j\'en ai + quantité" = tengo (cantidad) de ello. en reemplaza du/de la/des + N.',
          },
        ],
      },
    ],
  },
}

export default topic
