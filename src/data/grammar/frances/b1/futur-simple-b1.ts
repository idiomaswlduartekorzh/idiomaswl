import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'futur-simple-b1',
  order: '03',
  color: '#1a2ecc',
  category: 'Verbes',
  level: 'B1',
  title: 'Le Futur Simple en Francés B1',
  shortTitle: 'Futur Simple',
  metaTitle: 'Futur Simple B1 — Conjugación y uso del futuro en francés',
  description:
    'El futur simple expresa acciones que ocurrirán en el futuro, promesas, predicciones y hechos inevitables. Se forma añadiendo las terminaciones -ai, -as, -a, -ons, -ez, -ont al infinitivo (o a una raíz irregular). Es esencial distinguirlo del futur proche para escoger el registro adecuado.',
  lead: 'Aprende el futur simple francés: conjugaciones regulares e irregulares, y cuándo preferirlo al futur proche en contextos formales o de largo plazo.',
  outcomes: [
    'Conjugas verbos regulares e irregulares en futur simple',
    'Distingues cuándo usar futur simple vs futur proche',
    'Expresas predicciones, promesas y planes a largo plazo',
    'Usas el futur simple después de "quand" y "si" (tipo 1)',
  ],

  guide: {
    goal: 'Usar el futur simple para expresar acciones futuras, promesas y predicciones con registro neutro o formal.',
    model: "Je partirai en vacances en juillet. / Elle finira ses études l'année prochaine. / Quand tu arriveras, nous commencerons.",
    formula: "Infinitivo (o raíz irregular) + -ai / -as / -a / -ons / -ez / -ont",
    decisions: [
      'Verbos regulares -er e -ir: infinitivo completo + terminación → parler → parlerai; finir → finirai.',
      'Verbos en -re: eliminar la -e final + terminación → prendre → prendrai; mettre → mettrai.',
      'Raíces irregulares frecuentes: être → ser-, avoir → aur-, aller → ir-, faire → fer-, venir → viendr-, pouvoir → pourr-, vouloir → voudr-, savoir → saur-, voir → verr-.',
      'Después de "quand", "lorsque", "dès que", "aussitôt que" con sentido futuro → siempre futur simple (no présent).',
      'Futur simple vs futur proche: futuro lejano/formal → futur simple; futuro inmediato/oral → futur proche (aller + inf).',
      'En condicionnel type 1: Si + présent → futur simple: "Si tu viens, nous irons au cinéma."',
    ],
    table: [
      ['Pronombre', 'Parler (regular)', 'Être (irregular)'],
      ['je', 'parlerai', 'serai'],
      ['tu', 'parleras', 'seras'],
      ['il/elle/on', 'parlera', 'sera'],
    ],
    mistakes: [
      '"Quand tu viens, on mangera" ❌ → "Quand tu viendras, on mangera" ✓ — después de quand con futuro → futur simple.',
      '"Je fairai" ❌ → "Je ferai" ✓ — raíz irregular de faire es fer-.',
      '"Ils vonteront" ❌ → "Ils iront" ✓ — aller es completamente irregular: ir-.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma el futur simple en francés?',
      paragraphs: [
        'El futur simple se forma tomando el infinitivo completo del verbo (para -er e -ir) y añadiendo las terminaciones: -ai, -as, -a, -ons, -ez, -ont. Para los verbos en -re, se elimina la -e final antes de añadir las terminaciones. Así: parler → je parlerai; choisir → je choisirai; prendre → je prendrai.',
        'Las terminaciones del futur simple son las mismas para todos los verbos: -ai, -as, -a, -ons, -ez, -ont. Lo que varía es únicamente la raíz, que puede ser irregular en muchos verbos comunes.',
      ],
    },
    {
      heading: '¿Cuáles son los verbos irregulares del futur simple?',
      paragraphs: [
        'Los verbos irregulares más importantes tienen raíces especiales que debes memorizar: être → ser- (je serai), avoir → aur- (j\'aurai), aller → ir- (j\'irai), faire → fer- (je ferai), venir → viendr- (je viendrai), pouvoir → pourr- (je pourrai), vouloir → voudr- (je voudrai), savoir → saur- (je saurai), voir → verr- (je verrai), devoir → devr- (je devrai).',
        'Un recurso útil: las terminaciones son siempre las mismas (-ai, -as, -a, -ons, -ez, -ont), así que solo tienes que aprender las raíces irregulares. En total hay unos 20 verbos con raíz irregular, pero los 10 más frecuentes cubren la mayoría de los contextos.',
      ],
      table: [
        ['Infinitivo', 'Raíz futur', 'Je / Il(elle)'],
        ['être', 'ser-', 'serai / sera'],
        ['avoir', 'aur-', 'aurai / aura'],
        ['aller', 'ir-', 'irai / ira'],
        ['faire', 'fer-', 'ferai / fera'],
        ['venir', 'viendr-', 'viendrai / viendra'],
        ['pouvoir', 'pourr-', 'pourrai / pourra'],
      ],
    },
    {
      heading: '¿Cuándo se usa el futur simple y cuándo el futur proche?',
      paragraphs: [
        'El futur proche (aller + infinitivo) se usa para acciones futuras inmediatas o ya planeadas: "Je vais partir dans cinq minutes." Es más común en el habla oral y para eventos que ocurrirán muy pronto. El futur simple es más formal, más común en la escritura, y se usa para predicciones, promesas a largo plazo o para hablar de hechos del futuro lejano.',
        'En la práctica cotidiana: usa futur proche para "esta tarde", "mañana", "la semana que viene" en conversaciones informales. Usa futur simple para predicciones ("Dans 50 ans, le monde sera différent"), promesas solemnes ("Je t\'aiderai toujours"), o en textos formales y escritos.',
      ],
    },
    {
      heading: 'El futur simple después de conectores temporales',
      paragraphs: [
        'Una regla clave que diferencia el francés del español: después de conectores temporales con sentido futuro (quand, lorsque, dès que, aussitôt que, une fois que), se usa el futur simple, no el présent. Esto contrasta con el español, donde se usa el presente de subjuntivo.',
        'Ejemplos: "Quand il arrivera, nous partirons." (Cuando llegue, partiremos.) / "Dès que j\'aurai le résultat, je t\'appellerai." (Tan pronto como tenga el resultado, te llamaré.) / "Lorsque vous serez prêts, commencez." (Cuando estén listos, empiecen.)',
      ],
    },
    {
      heading: 'Futur simple en la condición tipo 1',
      paragraphs: [
        'El futur simple aparece en la oración resultado de las condiciones tipo 1 (hipótesis realizables): Si + présent → futur simple. Ejemplos: "Si tu étudies, tu réussiras." / "S\'il fait beau demain, nous irons à la plage." / "Si vous avez des questions, je répondrai."',
        'Atención: nunca se usa el futur simple en la cláusula con "si" (la condición), solo en la cláusula resultado. "Si je partirai" es incorrecto. La condición siempre va en présent.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Futur simple con verbos regulares e irregulares en contextos de predicciones, planes y promesas.',
    graphicPrompt: 'Flecha hacia el futuro con predicciones y planes usando futur simple.',
    scene: [
      ["Demain, il fera beau toute la journée.", "Mañana hará buen tiempo todo el día."],
      ["Elle finira ses études en juin.", "Ella terminará sus estudios en junio."],
      ["Quand tu viendras, on ira au restaurant.", "Cuando vengas, iremos al restaurante."],
      ["Dans dix ans, tout sera différent.", "En diez años, todo será diferente."],
      ["Je t'enverrai un message dès mon arrivée.", "Te enviaré un mensaje en cuanto llegue."],
      ["Vous aurez les résultats la semaine prochaine.", "Recibirán los resultados la semana que viene."],
      ["Si vous étudiez, vous réussirez.", "Si estudian, tendrán éxito."],
      ["Nous pourrons partir dès que tu seras prêt.", "Podremos partir en cuanto estés listo."],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['partir', 'finir', 'être', 'avoir', 'aller', 'faire', 'venir', 'pouvoir', 'vouloir', 'savoir'],
    reviewFocus: ['raíces irregulares', 'futur après quand', 'futur simple vs futur proche'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la conjugación correcta en futur simple.',
        type: 'choice',
        items: [
          {
            scene: 'Predicción del tiempo',
            lines: [['', "Selon la météo, il ___ demain."]],
            options: ['pleuvra', 'pleuvera', 'pleuvoir', 'pleuva'],
            answer: 'pleuvra',
            explain: '"Pleuvoir" es irregular en futur: il pleuvra (raíz: pleuv-).',
          },
          {
            scene: 'Promesa a un amigo',
            lines: [['', "Je te ___ dès que j'arrive."]],
            options: ['appellerai', 'appelera', 'appelerai', 'appelle'],
            answer: 'appellerai',
            explain: '"Appeler" duplica la l en futur: appeller- → j\'appellerai.',
          },
          {
            scene: 'Plan de estudios',
            lines: [['', "Nous ___ nos examens en mai."]],
            options: ['passerons', 'passeront', 'passons', 'passerez'],
            answer: 'passerons',
            explain: '"Passer" regular + -ons → passerons (nous).',
          },
          {
            scene: 'Llegada futura',
            lines: [['', "Quand vous ___ à Paris, appelez-moi."]],
            options: ['arriverez', 'arrivez', 'arriviez'],
            answer: 'arriverez',
            explain: 'Después de "quand" con sentido futuro → futur simple: arriverez.',
          },
          {
            scene: 'Planes del jefe',
            lines: [['', "Le directeur ___ une réunion lundi matin."]],
            options: ['aura', 'a', 'avait', 'aurait'],
            answer: 'aura',
            explain: '"Avoir" irregular: il aura. Raíz futur: aur-.',
          },
          {
            scene: 'Condición realizable',
            lines: [['', "Si tu es libre ce soir, nous ___ au cinéma."]],
            options: ['irons', 'allons', 'irions', 'allions'],
            answer: 'irons',
            explain: 'Si + présent → futur simple en la consecuencia: aller → irons.',
          },
          {
            scene: 'Futuro lejano',
            lines: [['', "Dans vingt ans, les voitures électriques ___ la norme."]],
            options: ['seront', 'sont', 'seraient', 'soient'],
            answer: 'seront',
            explain: '"Être" irregular: ils seront. Raíz futur: ser-.',
          },
          {
            scene: 'Capacidad futura',
            lines: [['', "Avec plus de pratique, tu ___ parler sans accent."]],
            options: ['pourras', 'peux', 'pourrais', 'puisses'],
            answer: 'pourras',
            explain: '"Pouvoir" irregular: tu pourras. Raíz futur: pourr-.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Planes y predicciones',
        tag: '2 espacios',
        intro: 'Conjuga los verbos en futur simple para completar cada frase.',
        type: 'dual',
        items: [
          {
            scene: 'Vacaciones planeadas',
            lines: [['', "Cet été, nous [[0]] en Bretagne. On [[1]] à la plage tous les jours."]],
            blanks: [
              { options: ['partirons', 'partons', 'partions', 'partiront'], answer: 'partirons', explain: '"Partir" regular en futur: partirons (nous).' },
              { options: ['ira', 'irons', 'allons', 'allions'], answer: 'irons', explain: '"Aller" irregular: irons (nous). Raíz: ir-.' },
            ],
          },
          {
            scene: 'Predicción tecnológica',
            lines: [['', "Les robots [[0]] beaucoup de tâches et les humains [[1]] plus de temps libre."]],
            blanks: [
              { options: ['feront', 'font', 'faisaient', 'feraient'], answer: 'feront', explain: '"Faire" irregular: feront (ils). Raíz: fer-.' },
              { options: ['auront', 'ont', 'avaient', 'auraient'], answer: 'auront', explain: '"Avoir" irregular: auront (ils). Raíz: aur-.' },
            ],
          },
          {
            scene: 'Promesa de ayuda',
            lines: [['', "Ne t'inquiète pas. Je [[0]] là et je [[1]] tout le nécessaire."]],
            blanks: [
              { options: ['serai', 'suis', 'étais', 'serais'], answer: 'serai', explain: '"Être" irregular: serai (je). Raíz: ser-.' },
              { options: ['ferai', 'fais', 'faisais', 'ferais'], answer: 'ferai', explain: '"Faire" irregular: ferai (je). Raíz: fer-.' },
            ],
          },
          {
            scene: 'Condición con futuro',
            lines: [['', "Si elle [[0]] la vérité, tout le monde [[1]] surpris."]],
            blanks: [
              { options: ['dit', 'dira', 'disait', 'dirait'], answer: 'dit', explain: 'Cláusula con "si" tipo 1 → présent, no futur: elle dit.' },
              { options: ['sera', 'est', 'était', 'serait'], answer: 'sera', explain: 'Consecuencia de "si" tipo 1 → futur simple: sera.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'El viaje soñado',
        tag: 'Texto guiado',
        intro: 'Conjuga los verbos en futur simple para describir un viaje planeado.',
        type: 'guidedText',
        scene: 'Descripción de un viaje a Japón planificado con detalle.',
        text: "L'année prochaine, je [[0]] (partir) au Japon pendant un mois. Je [[1]] (visiter) Tokyo, Kyoto et Osaka. En premier, j'[[2]] (aller) voir le mont Fuji. Là-bas, je [[3]] (pouvoir) pratiquer mon japonais. Mon ami Kenji [[4]] (être) mon guide — il m'[[5]] (montrer) les endroits que les touristes ne connaissent pas. Le soir, nous [[6]] (manger) dans de petits restaurants locaux.",
        blanks: [
          { options: ['partirai', 'pars', 'partirais', 'partirait'], answer: 'partirai', explain: '"Partir" regular: partirai (je).' },
          { options: ['visiterai', 'visite', 'visiterais', 'visiterait'], answer: 'visiterai', explain: '"Visiter" regular: visiterai (je).' },
          { options: ['irai', 'vais', 'irais', 'irait'], answer: 'irai', explain: '"Aller" irregular: irai (je). Raíz: ir-.' },
          { options: ['pourrai', 'peux', 'pourrais', 'pourrait'], answer: 'pourrai', explain: '"Pouvoir" irregular: pourrai (je). Raíz: pourr-.' },
          { options: ['sera', 'est', 'serait', 'soit'], answer: 'sera', explain: '"Être" irregular: sera (il). Raíz: ser-.' },
          { options: ['montrera', 'montre', 'montrerait', 'montrât'], answer: 'montrera', explain: '"Montrer" regular: montrera (il).' },
          { options: ['mangerons', 'mangeons', 'mangerions', 'mangerait'], answer: 'mangerons', explain: '"Manger" regular: mangerons (nous).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el futuro',
        tag: 'Texto libre',
        intro: 'Escribe la forma de futur simple correcta para cada verbo entre paréntesis.',
        type: 'freeText',
        scene: 'Predicciones para el mundo en 50 años.',
        text: "Dans cinquante ans, le monde [[0]] (changer) radicalement. Les énergies renouvelables [[1]] (remplacer) le pétrole. Les gens [[2]] (vivre) plus longtemps grâce aux avancées médicales. Les villes [[3]] (être) plus vertes et moins polluées. On [[4]] (savoir) peut-être même s'il y a de la vie ailleurs dans l'univers.",
        blanks: [
          { answer: 'aura changé', accepted: ['aura changé', 'changera'], explain: 'Pour une transformation complète dans le futur: "aura changé" (futur antérieur) ou "changera" (futur simple).' },
          { answer: 'remplaceront', accepted: ['remplaceront'], explain: '"Remplacer" regular: remplaceront (elles/ils).' },
          { answer: 'vivront', accepted: ['vivront'], explain: '"Vivre" irregular: vivront (ils). Raíz: vivr-.' },
          { answer: 'seront', accepted: ['seront'], explain: '"Être" irregular: seront (elles). Raíz: ser-.' },
          { answer: 'saura', accepted: ['saura'], explain: '"Savoir" irregular: saura (on). Raíz: saur-.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción con futur simple',
        tag: 'Producción',
        intro: 'Escribe oraciones usando el futur simple según las instrucciones.',
        type: 'write',
        items: [
          {
            scene: 'Una promesa personal',
            prompt: "Escribe una promesa que te haces a ti mismo usando futur simple (je + verbo).",
            answer: "Je ferai plus de sport et je mangerai mieux cette année.",
            accepted: ['ferai', 'serai', 'irai', 'mangerai', 'étudierai', 'lirai', 'parlerai', 'prendrai'],
            explain: "Usa verbos en futur: je ferai, je serai, j'irai, je mangerai, j'arrêterai...",
          },
          {
            scene: 'Planes concretos',
            prompt: "Describe qué harás el próximo verano en dos oraciones (usa futur simple).",
            answer: "L'été prochain, j'irai en Colombie. Je visiterai Cartagena et je goûterai la gastronomie locale.",
            accepted: ['irai', 'partirai', 'visiterai', 'ferai', 'serai', 'resterai', 'voyagerai'],
            explain: "L'été prochain / L'année prochaine / Dans trois mois + futur simple.",
          },
          {
            scene: 'Predicción del futuro',
            prompt: "Escribe una predicción para el mundo dentro de 20 años (Dans vingt ans...).",
            answer: "Dans vingt ans, les voitures autonomes seront partout et on n'aura plus besoin de conduire.",
            accepted: ['seront', 'serai', 'sera', 'auront', 'aura', 'feront', 'fera', 'pourront', 'pourra'],
            explain: "Dans vingt ans + futur simple de être/avoir/faire/pouvoir/vivre...",
          },
          {
            scene: 'Condición tipo 1',
            prompt: "Escribe una oración condicional tipo 1: Si + présent, + futur simple.",
            answer: "Si tu m'envoies le document, je le lirai ce soir.",
            accepted: ['ferai', 'irai', 'serai', 'pourrai', 'aurai', 'dirai', 'verrai'],
            explain: "Si + [présent] → [futur simple]. NUNCA futur en la cláusula con 'si'.",
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Carta al futuro',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones de una carta a tu yo del futuro, usando futur simple.',
        type: 'write',
        items: [
          {
            scene: 'Lo que habrás logrado',
            prompt: "Escribe qué habrás logrado o dónde estarás en 5 años (Dans cinq ans, tu...).",
            answer: "Dans cinq ans, tu parleras couramment le français et tu auras voyagé en Europe.",
            accepted: ['parleras', 'seras', 'auras', 'vivras', 'travailleras', 'étudieras', 'auras'],
            explain: "Dans cinq ans, tu + [futur simple]. Usa verbos como: parler, être, avoir, vivre, travailler.",
          },
          {
            scene: 'Un consejo para el futuro',
            prompt: "Da un consejo a tu futuro yo usando futur simple (N'oublie pas que tu... / Tu devras...).",
            answer: "Tu devras toujours rester curieux et ne jamais arrêter d'apprendre.",
            accepted: ['devras', 'pourras', 'seras', 'feras', 'iras', 'sauras', 'auras'],
            explain: "Tu devras / Tu pourras / Tu seras + infinitivo. Consejos con futur simple.",
          },
          {
            scene: 'Una predicción optimista',
            prompt: "Escribe algo positivo que crees que pasará en el mundo (Le monde sera / Les gens pourront...).",
            answer: "Les gens pourront vivre sans frontières et le monde sera plus uni.",
            accepted: ['pourront', 'pourra', 'sera', 'seront', 'feront', 'fera', 'vivront', 'vivra'],
            explain: "Predicción positiva: Le monde sera / Les gens pourront/vivront/feront + complément.",
          },
        ],
      },
    ],
  },
}

export default topic
