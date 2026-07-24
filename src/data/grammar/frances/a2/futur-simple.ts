import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'futur-simple',
  order: '05',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A2',
  title: "El Futur simple — predicciones y promesas en el futuro",
  shortTitle: "Futur simple",
  metaTitle: "Le futur simple en français A2 — je parlerai, tu seras, il aura, nous irons",
  description: "El futur simple expresa predicciones, promesas y hechos futuros. Para los verbos regulares, se forma añadiendo las terminaciones -ai, -as, -a, -ons, -ez, -ont directamente al infinitivo (o al infinitivo sin -e final en verbos -RE).",
  lead: "Demain, je parlerai français avec des Parisiens. Dans dix ans, tu seras médecin. Nous irons en France l'été prochain. El futur simple da forma a tus planes, sueños y predicciones.",

  outcomes: [
    "Formar el futur simple de verbos regulares -ER, -IR y -RE añadiendo las terminaciones al infinitivo.",
    "Conjugar los verbos irregulares más frecuentes: être (ser-), avoir (aur-), aller (ir-), faire (fer-), voir (verr-), vouloir (voudr-).",
    "Usar el futur simple para predicciones, promesas y planes futuros.",
    "Reconocer los marcadores temporales del futuro: demain, la semaine prochaine, dans + tiempo, l'année prochaine.",
  ],

  guide: {
    goal: "Expresar acciones, planes y predicciones futuras usando el futur simple.",
    model: "Je parlerai français. / Tu seras heureux. / Il aura du succès. / Nous irons en vacances.",
    formula: "Infinitivo (o sin -e final para -RE) + terminaciones: -ai / -as / -a / -ons / -ez / -ont",
    decisions: [
      "Verbos -ER: infinitivo intacto + terminaciones. Parler → je parlerai, tu parleras, il parlera.",
      "Verbos -IR: infinitivo intacto + terminaciones. Finir → je finirai, tu finiras, il finira.",
      "Verbos -RE: quitar -e final, luego añadir terminaciones. Prendre → prendr- → je prendrai.",
      "Irregulares frecuentes: être→ser-, avoir→aur-, aller→ir-, faire→fer-, voir→verr-, vouloir→voudr-, pouvoir→pourr-, savoir→saur-, venir→viendr-.",
      "Marcadores del futur: demain, dans un mois, la semaine prochaine, l'année prochaine, bientôt, un jour.",
    ],
    table: [
      ["Personne", "Terminación", "Ejemplo (parler)"],
      ["je", "-ai", "je parlerai"],
      ["tu", "-as", "tu parleras"],
      ["il / elle / on", "-a", "il parlera"],
      ["nous", "-ons", "nous parlerons"],
      ["vous", "-ez", "vous parlerez"],
      ["ils / elles", "-ont", "ils parleront"],
    ],
    mistakes: [
      "\"Je parlerai\" ✓ — pero \"Je parlerais\" ❌: -ais es terminación del conditionnel, no del futur. Futur: -ai (sin -s).",
      "\"Il sera\" ✓ — pero \"Il seral\" ❌: être tiene raíz irregular ser-, terminación regular -a.",
      "\"Nous irons\" ✓ — pero \"Nous allerons\" ❌: aller tiene raíz irregular ir- en futur y conditionnel.",
    ],
  },

  seo: [
    {
      heading: "El futur simple: cómo hablar del futuro en francés",
      paragraphs: [
        "El futur simple es el tiempo verbal que expresa acciones que ocurrirán en el futuro. Se usa para predicciones (il fera beau demain), promesas (je t'appellerai ce soir) y planes (nous partirons en vacances en juillet). También aparece en las frases con 'quand' para eventos futuros: quand tu arriveras, je serai là.",
        "La formación regular es simple y consistente: infinitivo + terminaciones. Las terminaciones son -ai, -as, -a, -ons, -ez, -ont. Para los verbos -ER: manger → je mangerai. Para los verbos -IR: choisir → je choisirai. Para los verbos -RE: se elimina la -e final: prendre → prendr- → je prendrai.",
      ],
    },
    {
      heading: "Los futuros irregulares más frecuentes",
      paragraphs: [
        "Unos 20 verbos tienen raíces irregulares en el futur simple, pero todos comparten las mismas terminaciones regulares. Los más importantes son: être → je serai (seré); avoir → j'aurai (tendré); aller → j'irai (iré); faire → je ferai (haré); voir → je verrai (veré); vouloir → je voudrai (querré); pouvoir → je pourrai (podré); savoir → je saurai (sabré); venir → je viendrai (vendré).",
        "Un truco: la raíz del futur simple y del conditionnel présent es siempre la misma. Si sabes decir 'je voudrais' (conditionnel), la raíz de 'je voudrai' (futur) es idéntica: voudr-. Solo cambia la terminación: -ais (conditionnel) vs. -ai (futur).",
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: "Futur = infinitivo + terminaciones (-ai/-as/-a/-ons/-ez/-ont). Irregulares: ser-/aur-/ir-/fer-/verr-/voudr-. Misma raíz que conditionnel.",
    graphicPrompt: "Línea de tiempo con flecha hacia la derecha: MAINTENANT → FUTUR. Etiqueta: demain / l'année prochaine / bientôt. Conjugaciones flotando.",
    scene: [
      ["Demain, je parlerai français avec des collègues.", "Mañana hablaré francés con colegas."],
      ["Tu seras médecin un jour, j'en suis sûr.", "Serás médico(a) algún día, estoy seguro(a)."],
      ["Nous irons en France l'été prochain.", "Iremos a Francia el próximo verano."],
      ["Il fera beau ce week-end, selon la météo.", "Hará buen tiempo este fin de semana, según el pronóstico."],
      ["Vous aurez les résultats dans une semaine.", "Tendrán los resultados en una semana."],
    ],
    learnerModes: ["reading", "choosing", "typing"],
    reviewFocus: ["terminaciones del futur", "raíces irregulares", "marcadores temporales futuros"],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: "Reconocer el futur simple",
        tag: "Opción múltiple",
        intro: "Elige la forma correcta del futur simple para completar la frase.",
        type: 'choice',
        items: [
          {
            scene: "Los planes de mañana",
            lines: [["Paul", "Demain, je ___ au bureau en voiture."]],
            options: ["irai", "vais", "allais", "allé"],
            answer: "irai",
            explain: "Aller en futur simple: raíz ir- + -ai → j'irai.",
          },
          {
            scene: "La predicción del tiempo",
            lines: [["Météo", "Il ___ beau ce week-end dans toute la France."]],
            options: ["fera", "fait", "faisait", "ferait"],
            answer: "fera",
            explain: "Faire en futur simple: raíz fer- + -a → il fera.",
          },
          {
            scene: "La promesa",
            lines: [["Marie", "Je t'___ dès que j'arrive à Paris."]],
            options: ["appellerai", "appelle", "appelais", "appellerais"],
            answer: "appellerai",
            explain: "Appeler en futur simple: appeller- + -ai → j'appellerai.",
          },
          {
            scene: "El futuro de être",
            lines: [["Prof", "Dans dix ans, tu ___ médecin."]],
            options: ["seras", "es", "étais", "serais"],
            answer: "seras",
            explain: "Être en futur simple: raíz ser- + -as → tu seras.",
          },
          {
            scene: "La planificación",
            lines: [["Équipe", "Nous ___ les résultats dans une semaine."]],
            options: ["aurons", "avons", "avions", "aurions"],
            answer: "aurons",
            explain: "Avoir en futur simple: raíz aur- + -ons → nous aurons.",
          },
          {
            scene: "Los planes de vacaciones",
            lines: [["Ana", "Mes amis et moi, nous ___ en Espagne l'été prochain."]],
            options: ["partirons", "partons", "partions", "partirions"],
            answer: "partirons",
            explain: "Partir en futur simple: partir- + -ons → nous partirons.",
          },
        ],
      },
      {
        id: 'l2',
        title: "Dos formas del futur",
        tag: "2 espacios",
        intro: "Elige las formas correctas del futur simple para completar estas predicciones.",
        type: 'dual',
        items: [
          {
            scene: "Las predicciones del horóscopo",
            lines: [["Horóscopo", "Cette semaine, tu [[0]] de nouvelles opportunités et tu [[1]] de nouveaux amis."]],
            blanks: [
              { options: ["auras", "as", "avais"], answer: "auras", explain: "Avoir en futur: tu auras (raíz aur- + -as)." },
              { options: ["rencontreras", "rencontres", "rencontrais"], answer: "rencontreras", explain: "Rencontrer en futur: tu rencontreras (infinitivo + -as)." },
            ],
          },
          {
            scene: "Los planes del fin de semana",
            lines: [["Lucas", "Ce week-end, nous [[0]] à la montagne et nous [[1]] du ski."]],
            blanks: [
              { options: ["irons", "allons", "allions"], answer: "irons", explain: "Aller en futur: nous irons (raíz ir- + -ons)." },
              { options: ["ferons", "faisons", "faisions"], answer: "ferons", explain: "Faire en futur: nous ferons (raíz fer- + -ons)." },
            ],
          },
          {
            scene: "La promesa",
            lines: [["Père", "Je te promets: la semaine prochaine, je [[0]] à la maison et nous [[1]] ensemble."]],
            blanks: [
              { options: ["serai", "suis", "étais"], answer: "serai", explain: "Être en futur: je serai (raíz ser- + -ai)." },
              { options: ["dînerons", "dînons", "dînions"], answer: "dînerons", explain: "Dîner en futur: nous dînerons (infinitivo + -ons)." },
            ],
          },
          {
            scene: "El proyecto escolar",
            lines: [["Élève", "L'année prochaine, j'[[0]] en terminale et je [[1]] le bac."]],
            blanks: [
              { options: ["serai", "suis", "serais"], answer: "serai", explain: "Être en futur: je serai (raíz ser- + -ai)." },
              { options: ["passerai", "passe", "passais"], answer: "passerai", explain: "Passer en futur: je passerai (infinitivo + -ai)." },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: "El plan de Carlos",
        tag: "Texto guiado",
        intro: "Completa el texto eligiendo las formas correctas del futur simple.",
        type: 'guidedText',
        scene: "Carlos habla de sus planes para el año próximo",
        text: "L'année prochaine, je [[0]] à Paris pour étudier. J'[[1]] dans une colocation avec d'autres étudiants. Le matin, j'[[2]] le métro pour aller à l'université. Mes parents me [[3]] souvent et je leur [[4]] des photos de mes aventures.",
        blanks: [
          { options: ["partirai", "pars", "partais"], answer: "partirai", explain: "Partir en futur: je partirai (partir- + -ai)." },
          { options: ["habiterai", "habite", "habitais"], answer: "habiterai", explain: "Habiter en futur: j'habiterai (infinitivo + -ai)." },
          { options: ["prendrai", "prends", "prenais"], answer: "prendrai", explain: "Prendre en futur: je prendrai (prendr- + -ai, verbo -RE)." },
          { options: ["appelleront", "appellent", "appelaient"], answer: "appelleront", explain: "Appeler en futur: ils appelleront (appeller- + -ont)." },
          { options: ["enverrai", "envoie", "envoyais"], answer: "enverrai", explain: "Envoyer en futur: j'enverrai (enverra- → enverr- + -ai, irregular)." },
        ],
      },
      {
        id: 'l4',
        title: "La promesa de Léa",
        tag: "Texto libre",
        intro: "Escribe las formas correctas del futur simple sin ayuda de opciones.",
        type: 'freeText',
        scene: "Léa hace promesas a su amiga antes de irse de viaje",
        text: "Je te promets: je t'[[0]] tous les jours. Je ne t'[[1]] jamais. Nous [[2]] ensemble quand je reviendrai. Tu [[3]] me voir à Paris. Et on [[4]] un super voyage!",
        blanks: [
          { answer: "appellerai", accepted: ["appellerai", "écrirai", "enverrai"], explain: "Appeler en futur: je t'appellerai." },
          { answer: "oublierai", accepted: ["oublierai"], explain: "Oublier en futur: je ne t'oublierai jamais." },
          { answer: "sortirons", accepted: ["sortirons", "irons", "partirons"], explain: "Sortir en futur: nous sortirons (sortir- + -ons)." },
          { answer: "viendras", accepted: ["viendras"], explain: "Venir en futur: tu viendras (viendr- + -as, irregular)." },
          { answer: "fera", accepted: ["fera"], explain: "Faire en futur: on fera (fer- + -a, irregular)." },
        ],
      },
      {
        id: 'l5',
        title: "Construir frases en futur simple",
        tag: "Producción guiada",
        intro: "Escribe la frase completa en futur simple según las indicaciones.",
        type: 'write',
        items: [
          {
            scene: "El plan de vacaciones",
            prompt: "Escribe: \"Iremos a Italia el verano que viene.\" (Nous / aller / en Italie / l'été prochain)",
            answer: "Nous irons en Italie l'été prochain.",
            accepted: ["nous irons en italie", "irons en italie l'été prochain"],
            explain: "Aller en futur: nous irons. Raíz irregular: ir-.",
          },
          {
            scene: "La predicción",
            prompt: "Escribe: \"Mañana hará calor.\" (Demain / il / faire / chaud)",
            answer: "Demain, il fera chaud.",
            accepted: ["demain il fera chaud", "il fera chaud demain"],
            explain: "Faire en futur: il fera. Raíz irregular: fer-.",
          },
          {
            scene: "La promesa",
            prompt: "Escribe: \"Te llamaré esta noche.\" (Je / appeler / ce soir)",
            answer: "Je t'appellerai ce soir.",
            accepted: ["je t'appellerai", "je t appellerai", "j'appellerai"],
            explain: "Appeler en futur: j'appellerai. La doble -ll- se mantiene en todas las formas del futur.",
          },
        ],
      },
      {
        id: 'l6',
        title: "Mes projets pour l'avenir",
        tag: "Escritura libre",
        intro: "Escribe sobre tus planes de futuro usando al menos 4 verbos en futur simple.",
        type: 'write',
        items: [
          {
            scene: "Planes para la semana próxima",
            prompt: "¿Qué harás la próxima semana? (La semaine prochaine, je... / Nous...)",
            answer: "La semaine prochaine, je travaillerai beaucoup et je verrai mes amis vendredi.",
            accepted: ["je travaillerai", "je verrai", "j'irai", "nous partirons", "je ferai"],
            explain: "Futur simple para planes: je travaillerai, je verrai (verr-), j'irai (ir-)...",
          },
          {
            scene: "Predicciones para el año próximo",
            prompt: "¿Qué pasará el año próximo en tu vida? (L'année prochaine, je... / Il y aura...)",
            answer: "L'année prochaine, je serai diplômé et j'aurai un nouveau travail.",
            accepted: ["je serai", "j'aurai", "je partirai", "je ferai", "il y aura"],
            explain: "Être → je serai (ser-). Avoir → j'aurai (aur-). Aller → j'irai (ir-).",
          },
          {
            scene: "Un sueño de futuro",
            prompt: "Describe un sueño o ambición para el futuro: Dans 10 ans, je...",
            answer: "Dans 10 ans, j'aurai ma propre entreprise et je voyagerai dans le monde entier.",
            accepted: ["dans", "j'aurai", "je serai", "je voyagerai", "nous vivrons", "je pourrai"],
            explain: "Futur simple para proyecciones a largo plazo: j'aurai, je serai, je voyagerai, je vivrai...",
          },
        ],
      },
    ],
  },
}

export default topic
