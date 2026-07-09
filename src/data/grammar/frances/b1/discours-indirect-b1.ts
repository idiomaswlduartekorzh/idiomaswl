import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'discours-indirect-b1',
  order: '07',
  color: '#2563eb',
  category: 'Discurso',
  level: 'B1',
  title: 'Le Discours Indirect en Francés B1',
  shortTitle: 'Discours Indirect',
  metaTitle: 'Discours Indirect B1 — Estilo indirecto en francés: transformaciones',
  description:
    "El discours indirect (estilo indirecto) permite reportar lo que alguien dijo sin citar sus palabras exactas. Implica transformar tiempos verbales (concordance des temps), cambiar pronombres y adaptar expresiones de tiempo. Es fundamental para contar conversaciones, reportar noticias y narrar eventos en francés.",
  lead: "Domina el estilo indirecto en francés: transforma tiempos verbales, cambia pronombres y adapta expresiones temporales para reportar conversaciones y noticias con precisión.",
  outcomes: [
    "Transformas el discurso directo a indirecto usando dire que con concordancia de tiempos",
    "Usas demander si para reportar preguntas de respuesta sí/no",
    "Aplicas demander de + infinitivo para reportar órdenes e instrucciones",
    "Cambias correctamente pronombres y expresiones de tiempo en el estilo indirecto",
  ],

  guide: {
    goal: "Reportar lo que alguien dijo, preguntó u ordenó sin citar sus palabras exactas.",
    model: "Il a dit qu'il partait le lendemain. / Elle a demande si je voulais venir. / Le prof nous a demande de faire l'exercice.",
    formula: "dire que + verbo (concordancia) | demander si + oracion | demander de + infinitivo",
    decisions: [
      "Present → imparfait en estilo indirecto pasado: 'Je suis pret' → Il a dit qu'il etait pret.",
      "Passe compose → plus-que-parfait: 'J'ai fini' → Elle a dit qu'elle avait fini.",
      "Futur simple → conditionnel present: 'Je viendrai' → Il a dit qu'il viendrait.",
      "Preguntas si/no: demander si + oracion afirmativa sin inversion verbal.",
      "Ordenes directas: demander de + infinitivo. 'Venez!' → Il nous a demande de venir.",
      "Cambios de pronombres: je → il/elle; tu → je o il/elle segun contexto.",
      "Cambios temporales: aujourd'hui → ce jour-la, demain → le lendemain, hier → la veille.",
    ],
    table: [
      ["Discours direct", "Transformation", "Discours indirect"],
      ["present (je mange)", "→ imparfait", "il a dit qu'il mangeait"],
      ["passe compose (j'ai lu)", "→ plus-que-parfait", "il a dit qu'il avait lu"],
      ["futur (je viendrai)", "→ conditionnel", "il a dit qu'il viendrait"],
    ],
    mistakes: [
      "\"Il a dit qu'il vient\" ❌ — en relato pasado el present debe convertirse en imparfait: \"Il a dit qu'il venait\" ✓.",
      "\"Elle a demande si viendrait-il\" ❌ — con demander si no hay inversion verbal: \"Elle a demande s'il viendrait\" ✓.",
      "\"Il a dit qu'il partait demain\" ❌ — demain se transforma: \"Il a dit qu'il partait le lendemain\" ✓.",
    ],
  },

  seo: [
    {
      heading: "¿Que es el discours indirect en frances?",
      paragraphs: [
        "El discours indirect (discurso indirecto) permite reportar las palabras de otra persona sin citarlas directamente. En lugar de decir 'Paul a dit: Je suis fatigue', usamos 'Paul a dit qu'il etait fatigue'. Esta transformacion requiere varios cambios: los tiempos verbales se modifican (concordance des temps), los pronombres cambian segun el nuevo contexto, y las expresiones de tiempo se adaptan.",
        "Para hispanohablantes, la logica es similar al espanol. Cuando alguien dijo 'Vendre manana' y lo reportamos como 'Dijo que vendria al dia siguiente', aplicamos exactamente los mismos principios que en frances. La principal diferencia es que en frances la concordance des temps es obligatoria y mas sistematica que en espanol coloquial.",
      ],
    },
    {
      heading: "La concordance des temps: cambios de tiempo verbal",
      paragraphs: [
        "Cuando el verbo introductor (dire, affirmer, annoncer, raconter) esta en pasado, los tiempos del discurso original sufren un retroceso: el present se convierte en imparfait ('je suis pret' → 'il a dit qu'il etait pret'), el passe compose se convierte en plus-que-parfait ('j'ai vu' → 'il a dit qu'il avait vu'), y el futur simple se convierte en conditionnel present ('je partirai' → 'il a dit qu'il partirait').",
        "Si el verbo introductor esta en present (il dit que...), no hay cambio de tiempos: 'Il dit qu'il est fatigue.' En el nivel B1, el relato en pasado es el mas importante, ya que exige la concordance des temps. El imparfait no cambia: 'Je voulais partir' → 'il a dit qu'il voulait partir'.",
      ],
      table: [
        ["Discours direct", "Discours indirect (pasado)"],
        ["present: je pars", "imparfait: il a dit qu'il partait"],
        ["passe compose: j'ai vu", "plus-que-parfait: il a dit qu'il avait vu"],
        ["futur: je viendrai", "conditionnel: il a dit qu'il viendrait"],
        ["imparfait: je voulais", "sin cambio: il a dit qu'il voulait"],
      ],
    },
    {
      heading: "Reportar preguntas y ordenes en estilo indirecto",
      paragraphs: [
        "Para reportar preguntas de si/no se usa 'demander si': '\"Viens-tu?\"' → 'Il a demande si je venais.' Para preguntas con pronombre interrogativo se conserva el pronombre: '\"Ou vas-tu?\"' → 'Il a demande ou j'allais.' Nota clave: no hay inversion verbo-sujeto en el estilo indirecto.",
        "Para reportar ordenes e instrucciones se usa 'demander de + infinitivo': '\"Fermez la porte!\"' → 'Le professeur nous a demande de fermer la porte.' Para sugerencias: 'proposer de + infinitivo'. Para peticiones formales: 'prier de + infinitivo'. El infinitivo no cambia en estas estructuras.",
      ],
    },
    {
      heading: "Cambios de pronombres y expresiones de tiempo",
      paragraphs: [
        "Los pronombres personales cambian segun el nuevo contexto: 'je' suele convertirse en 'il/elle', 'tu' puede convertirse en 'je' o 'il/elle' segun quien habla a quien, 'nous' puede convertirse en 'ils/elles'. Ejemplo: 'Je t'aime' (Sophie a Marc) → 'Sophie a dit a Marc qu'elle l'aimait.' Estos cambios dependen del contexto enunciativo.",
        "Las expresiones de tiempo tambien se transforman: aujourd'hui → ce jour-la, demain → le lendemain, hier → la veille, cette semaine → cette semaine-la, l'annee prochaine → l'annee suivante, maintenant → alors, ici → la. Ejemplo: 'Je pars demain' → 'Elle a dit qu'elle partirait le lendemain.' Estas transformaciones son obligatorias en el relato formal.",
      ],
    },
  ],

  visual: {
    mode: "scene",
    teacherLens: "Transformacion sistematica de discurso directo a indirecto con cambios de tiempo, pronombres y expresiones temporales.",
    graphicPrompt: "Burbujas de dialogo que se transforman en narracion, con flechas indicando los cambios de tiempo verbal.",
    scene: [
      ["Il a dit qu'il etait tres content de son nouveau travail.", "El dijo que estaba muy contento con su nuevo trabajo."],
      ["Elle a demande si je voulais aller au cinema.", "Ella pregunto si yo queria ir al cine."],
      ["Le prof nous a demande de finir l'exercice pour le lendemain.", "El profesor nos pidio terminar el ejercicio para el dia siguiente."],
      ["Paul a annonce qu'il partirait en voyage le lendemain.", "Paul anuncio que se iria de viaje al dia siguiente."],
      ["Marie a dit qu'elle avait deja mange avant d'arriver.", "Marie dijo que ya habia comido antes de llegar."],
      ["Il a demande ou se trouvait la gare la plus proche.", "El pregunto donde estaba la estacion mas cercana."],
      ["Elle a affirme qu'elle ne savait rien de cette affaire.", "Ella afirmo que no sabia nada de ese asunto."],
      ["Le directeur a annonce que la reunion aurait lieu ce jour-la.", "El director anuncio que la reunion tendria lugar ese mismo dia."],
    ],
    learnerModes: ["reading", "typing", "choosing"],
    reviewFocus: ["concordance des temps", "demander si/de", "expressions de temps"],
  },

  practice: {
    levels: [
      {
        id: "level-1",
        title: "Reconoce el discurso indirecto",
        tag: "Opcion multiple",
        intro: "Elige la forma correcta para transformar el discurso directo a indirecto.",
        type: "choice",
        items: [
          {
            scene: "Conversacion reportada",
            lines: [["Direct:", "\"Je suis tres fatigue.\""], ["Indirect:", "Il a dit qu'il ___."]],
            options: ["etait tres fatigue", "est tres fatigue", "sera tres fatigue", "avait ete tres fatigue"],
            answer: "etait tres fatigue",
            explain: "Present (est) → imparfait (etait) en discurso indirecto cuando el introductor esta en pasado (a dit).",
          },
          {
            scene: "Noticias del dia",
            lines: [["Direct:", "\"Le president partira demain.\""], ["Indirect:", "Le journaliste a annonce que le president ___ le lendemain."]],
            options: ["partirait", "partira", "est parti", "partait"],
            answer: "partirait",
            explain: "Futur (partira) → conditionnel (partirait) en discurso indirecto pasado. Demain → le lendemain (cambio temporal).",
          },
          {
            scene: "Conversacion entre amigas",
            lines: [["Direct:", "\"J'ai vu ce film hier.\""], ["Indirect:", "Sophie a dit qu'elle ___ ce film la veille."]],
            options: ["avait vu", "a vu", "voyait", "verra"],
            answer: "avait vu",
            explain: "Passe compose (a vu) → plus-que-parfait (avait vu) en discurso indirecto pasado. Hier → la veille.",
          },
          {
            scene: "Pregunta reportada",
            lines: [["Direct:", "\"Est-ce que tu viens a la fete?\""], ["Indirect:", "Marc a demande ___ je venais a la fete."]],
            options: ["si", "que", "qu'", "comment"],
            answer: "si",
            explain: "Para reportar preguntas de si/no se usa 'demander si'. No hay inversion en el estilo indirecto.",
          },
          {
            scene: "Orden de un profesor",
            lines: [["Direct:", "\"Ouvrez vos livres!\""], ["Indirect:", "Le professeur nous a demande ___ nos livres."]],
            options: ["d'ouvrir", "si nous ouvrons", "que nous ouvrions", "ouvrir"],
            answer: "d'ouvrir",
            explain: "Ordenes en estilo indirecto: demander de + infinitivo. '\"Ouvrez!\"' → demande d'ouvrir.",
          },
          {
            scene: "Expresion de tiempo",
            lines: [["Direct (lunes):", "\"Je pars aujourd'hui.\""], ["Indirect:", "Clara a dit qu'elle partait ___."]],
            options: ["ce jour-la", "aujourd'hui", "ce jour", "alors"],
            answer: "ce jour-la",
            explain: "Aujourd'hui en discurso directo → ce jour-la en discurso indirecto (relato posterior).",
          },
          {
            scene: "Pregunta con pronombre interrogativo",
            lines: [["Direct:", "\"Ou sont les toilettes?\""], ["Indirect:", "La cliente a demande ___ les toilettes."]],
            options: ["ou se trouvaient", "si les toilettes etaient", "que les toilettes", "comment etaient"],
            answer: "ou se trouvaient",
            explain: "Preguntas con pronombre interrogativo: demander + ou/quand/comment + oracion. Sont → se trouvaient (imparfait).",
          },
          {
            scene: "Anuncio oficial",
            lines: [["Direct:", "\"Nous construirons un nouveau parc.\""], ["Indirect:", "Le maire a declare qu'ils ___ un nouveau parc."]],
            options: ["construiraient", "construiront", "ont construit", "construisaient"],
            answer: "construiraient",
            explain: "Futur (construiront) → conditionnel (construiraient) en discurso indirecto pasado. Nous → ils (cambio pronombre).",
          },
        ],
      },
      {
        id: "level-2",
        title: "Transforma el discurso",
        tag: "2 espacios",
        intro: "Completa las dos transformaciones de discurso directo a indirecto en cada oracion.",
        type: "dual",
        items: [
          {
            scene: "Noticias de politica",
            lines: [["", "Le ministre a annonce que les impots [[0]] et que de nouveaux emplois [[1]] crees l'annee suivante."]],
            blanks: [
              { options: ["baisseraient", "baisseront", "baissaient", "ont baisse"], answer: "baisseraient", explain: "Futur (baisseront) → conditionnel (baisseraient) en discurso indirecto con introductor pasado." },
              { options: ["seraient", "seront", "ont ete", "etaient"], answer: "seraient", explain: "Futur pasivo (seront crees) → conditionnel pasivo (seraient crees) en discurso indirecto." },
            ],
          },
          {
            scene: "Conversacion sobre planes de viaje",
            lines: [["", "Emma a dit qu'elle [[0]] a Paris le lendemain et qu'elle [[1]] toute la semaine la-bas."]],
            blanks: [
              { options: ["partirait", "partira", "est partie", "partait"], answer: "partirait", explain: "Futur (partira) → conditionnel (partirait). Demain → le lendemain (cambio de expresion temporal)." },
              { options: ["resterait", "restera", "est restee", "restait"], answer: "resterait", explain: "Futur (restera) → conditionnel (resterait) en discurso indirecto pasado." },
            ],
          },
          {
            scene: "Preguntas del medico",
            lines: [["", "Le medecin a demande au patient [[0]] il avait mal et [[1]] il dormait bien la nuit."]],
            blanks: [
              { options: ["si", "que", "qu'", "comment"], answer: "si", explain: "Pregunta si/no en estilo indirecto: demander si + oracion afirmativa sin inversion. '\"Avez-vous mal?\"' → si il avait mal." },
              { options: ["si", "que", "qu'", "comment"], answer: "si", explain: "Segunda pregunta si/no: demander si. '\"Dormez-vous bien?\"' → s'il dormait bien." },
            ],
          },
          {
            scene: "Instrucciones en clase",
            lines: [["", "La professeure a demande aux eleves [[0]] les telephones et [[1]] en silence."]],
            blanks: [
              { options: ["de ranger", "qu'ils rangent", "si ils rangent", "ranger"], answer: "de ranger", explain: "Ordenes: demander de + infinitivo. '\"Rangez vos telephones!\"' → demande de ranger les telephones." },
              { options: ["de travailler", "qu'ils travaillent", "si ils travaillent", "travailler"], answer: "de travailler", explain: "Segunda orden: demander de + infinitivo. '\"Travaillez en silence!\"' → demande de travailler en silence." },
            ],
          },
        ],
      },
      {
        id: "level-3",
        title: "Reportaje periodistico",
        tag: "Texto guiado",
        intro: "Transforma el discurso directo al indirecto en este reportaje de prensa.",
        type: "guidedText",
        scene: "Un periodista reporta lo que dijeron varios personajes durante una conferencia de prensa empresarial.",
        text: "Lors de la conference de presse, le directeur a annonce que l'entreprise [[0]] l'annee suivante. Il a ajoute qu'ils [[1]] deja signe plusieurs contrats importants. La porte-parole a precise que de nouveaux produits [[2]] bientot. Un journaliste a demande [[3]] les prix [[4]]. Elle a repondu qu'elle ne [[5]] pas encore de reponse. Elle a finalement demande aux journalistes [[6]] leurs questions par ecrit.",
        blanks: [
          { options: ["s'agrandirait", "s'agrandira", "s'est agrandie", "s'agrandissait"], answer: "s'agrandirait", explain: "Futur (s'agrandira) → conditionnel (s'agrandirait) en discurso indirecto con introductor pasado (a annonce)." },
          { options: ["avaient", "ont", "auraient", "avaient eu"], answer: "avaient", explain: "Passe compose (ont signe) → plus-que-parfait: 'ils avaient deja signe'. Avaient es el auxiliar del plus-que-parfait." },
          { options: ["seraient lances", "seront lances", "ont ete lances", "etaient lances"], answer: "seraient lances", explain: "Futur pasivo (seront lances) → conditionnel pasivo (seraient lances) en discurso indirecto." },
          { options: ["si", "que", "qu'", "comment"], answer: "si", explain: "Pregunta si/no reportada: demander si. '\"Les prix augmenteront-ils?\"' → demande si les prix..." },
          { options: ["augmenteraient", "augmenteront", "augmentaient", "ont augmente"], answer: "augmenteraient", explain: "Futur (augmenteront) → conditionnel (augmenteraient) en la pregunta indirecta." },
          { options: ["avait", "a", "aurait", "avait eu"], answer: "avait", explain: "Present (n'a pas) → imparfait (n'avait pas) en discurso indirecto: 'elle ne savait pas encore' o 'elle n'avait pas encore de reponse'." },
          { options: ["d'envoyer", "si ils envoient", "qu'ils envoient", "envoyer"], answer: "d'envoyer", explain: "Instruccion: demander de + infinitivo. '\"Envoyez vos questions!\"' → demande d'envoyer leurs questions." },
        ],
      },
      {
        id: "level-4",
        title: "Reporta una conversacion",
        tag: "Texto libre",
        intro: "Escribe las formas correctas para reportar esta conversacion sobre unas vacaciones.",
        type: "freeText",
        scene: "Reportar una conversacion entre dos amigos sobre planes de vacaciones.",
        text: "Marc a confie a Julie qu'il [[0]] en vacances le lendemain. Il a ajoute qu'il [[1]] deja Rome l'annee precedente et qu'il [[2]] decouvrir une nouvelle ville cette fois. Julie a demande [[3]] il avait deja achete son billet. Elle a ensuite demande a Marc [[4]] son appartement pendant son absence.",
        blanks: [
          { answer: "partirait", accepted: ["partirait"], explain: "Futur (partira) → conditionnel (partirait) en discurso indirecto con introductor pasado (a confie). Demain → le lendemain." },
          { answer: "avait visite", accepted: ["avait visite", "avait deja visite"], explain: "Passe compose (a visite) → plus-que-parfait (avait visite) en discurso indirecto." },
          { answer: "voulait", accepted: ["voulait", "souhaitait"], explain: "Imparfait (voulait) no cambia en discurso indirecto. O bien: present (veut) → imparfait (voulait)." },
          { answer: "si", accepted: ["si"], explain: "Pregunta si/no: demander si. '\"As-tu deja achete ton billet?\"' → demande si il avait deja achete son billet." },
          { answer: "de garder", accepted: ["de garder", "de surveiller", "de s'occuper de"], explain: "Peticion: demander de + infinitivo. '\"Garde mon appartement!\"' → demande de garder son appartement." },
        ],
      },
      {
        id: "level-5",
        title: "Produccion: reporta discursos",
        tag: "Produccion",
        intro: "Escribe el discurso indirecto completo segun las instrucciones.",
        type: "write",
        items: [
          {
            scene: "Declaracion de un amigo",
            prompt: "Tu amigo dijo: '\"Je suis tres content, j'ai trouve un nouveau travail hier.\"' Reporta lo que dijo.",
            answer: "Mon ami a dit qu'il etait tres content et qu'il avait trouve un nouveau travail la veille.",
            accepted: ["etait tres content", "avait trouve", "la veille"],
            explain: "Present (est) → imparfait (etait); passe compose (a trouve) → plus-que-parfait (avait trouve); hier → la veille.",
          },
          {
            scene: "Pregunta de un companero",
            prompt: "Tu companero pregunto: '\"Est-ce que tu viendras a la reunion demain?\"' Reporta la pregunta.",
            answer: "Mon collegue a demande si je viendrais a la reunion le lendemain.",
            accepted: ["a demande si", "viendrais", "le lendemain"],
            explain: "Pregunta si/no: demander si. Futur (viendras) → conditionnel (viendrais). Demain → le lendemain.",
          },
          {
            scene: "Instruccion de un jefe",
            prompt: "Tu jefe dijo: '\"Envoyez le rapport avant vendredi!\"' Reporta la instruccion.",
            answer: "Le chef nous a demande d'envoyer le rapport avant vendredi.",
            accepted: ["a demande d'envoyer", "demande d'envoyer", "a dit de envoyer"],
            explain: "Orden: demander de + infinitivo. '\"Envoyez!\"' → a demande d'envoyer. El plazo 'avant vendredi' no cambia.",
          },
          {
            scene: "Anuncio de una empresa",
            prompt: "La empresa anuncio: '\"Nous lancerons un nouveau produit l'annee prochaine.\"' Reporta el anuncio.",
            answer: "La societe a annonce qu'elle lancerait un nouveau produit l'annee suivante.",
            accepted: ["a annonce que", "lancerait", "l'annee suivante"],
            explain: "Futur (lancerons) → conditionnel (lancerait). Nous → elle (cambio pronombre). L'annee prochaine → l'annee suivante.",
          },
        ],
      },
      {
        id: "level-6",
        title: "Mision: cronica periodistica",
        tag: "Produccion libre",
        intro: "Escribe 3 oraciones reportando declaraciones de diferentes personas en estilo periodistico.",
        type: "write",
        items: [
          {
            scene: "Declaracion de un politico",
            prompt: "Un politico dijo: '\"Je vais reduire les impots et creer des emplois.\"' Escribe la cronica periodistica.",
            answer: "Le politicien a declare qu'il allait reduire les impots et creer des emplois.",
            accepted: ["a declare que", "allait reduire", "creer des emplois"],
            explain: "Futur proche (va reduire) → conditionnel proche (allait reduire). Je → il (cambio pronombre). Creer no cambia (infinitivo dependiente).",
          },
          {
            scene: "Pregunta de un periodista",
            prompt: "Un periodista pregunto: '\"Quand les resultats seront-ils publies?\"' Reporta la pregunta.",
            answer: "Le journaliste a demande quand les resultats seraient publies.",
            accepted: ["a demande quand", "seraient publies"],
            explain: "Pregunta con pronombre interrogativo: demander + quand. Futur pasivo (seront publies) → conditionnel pasivo (seraient publies).",
          },
          {
            scene: "Instruccion de un organizador",
            prompt: "El organizador dijo: '\"Restez calmes et attendez les instructions!\"' Reporta sus instrucciones.",
            answer: "L'organisateur a demande aux participants de rester calmes et d'attendre les instructions.",
            accepted: ["demande de rester", "d'attendre", "rester calmes"],
            explain: "Ordenes multiples: demander de + infinitivo (1) + et de + infinitivo (2). Los participantes son los destinatarios de las ordenes.",
          },
        ],
      },
    ],
  },
}

export default topic
