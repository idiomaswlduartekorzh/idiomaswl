import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'gerondif-b1',
  order: '09',
  color: '#2563eb',
  category: 'Verbos',
  level: 'B1',
  title: 'Le Gérondif en Francés B1',
  shortTitle: 'Gérondif',
  metaTitle: 'Gérondif B1 — En + participe présent en francés: simultaneidad y manera',
  description:
    "El gérondif (en + participe présent) expresa simultaneidad, manera, condición o causa. Es una forma verbal invariable que se construye con 'en' seguido del participe présent. A diferencia del español, el gérondif en francés es más limitado en uso y siempre tiene el mismo sujeto que el verbo principal.",
  lead: "Aprende a usar el gérondif francés (en + participe présent) para expresar 'mientras', 'haciendo algo' o 'al hacer algo' con precisión y naturalidad.",
  outcomes: [
    "Formas el gérondif correctamente con verbos regulares e irregulares",
    "Usas 'en + participe présent' para expresar simultaneidad y manera",
    "Distingues el gérondif del participe présent simple",
    "Reconoces las restricciones: el gérondif comparte sujeto con el verbo principal",
  ],

  guide: {
    goal: "Expresar que dos acciones ocurren simultáneamente o que una acción describe la manera de realizar otra.",
    model: "Il écoute de la musique en travaillant. / Elle a appris le français en regardant des films.",
    formula: "en + participe présent (radical de la 1ª persona plural + -ant)",
    decisions: [
      "Formation: radical nous + -ant. Nous parlons → parl- → parlant → en parlant.",
      "Irreguliers: être → étant, avoir → ayant, savoir → sachant. Solo 3 irregulares.",
      "Simultaneidad: J'écoute la radio en conduisant. (Las dos acciones ocurren al mismo tiempo.)",
      "Manera/modo: Elle est entrée en souriant. (Sonriendo describe cómo entró.)",
      "Condición: En travaillant dur, tu réussiras. (Si trabajas duro, tendrás éxito.)",
      "Sujeto único: el gérondif comparte sujeto con el verbo principal. Nunca cambies de sujeto.",
      "Tout en + gérondif enfatiza oposición o simultaneidad intensa: Tout en disant cela, il souriait.",
    ],
    table: [
      ["Infinitif", "Nous (radical)", "Gérondif"],
      ["parler", "parl-", "en parlant"],
      ["finir", "finiss-", "en finissant"],
      ["prendre", "pren-", "en prenant"],
    ],
    mistakes: [
      "\"En il parle\" ❌ — el gérondif es invariable y no lleva sujeto explícito: \"en parlant\" ✓.",
      "\"Il mange en elle lit\" ❌ — el gérondif debe compartir sujeto: sólo válido si el mismo sujeto hace ambas cosas.",
      "\"En soyant\" ❌ — être es irregular: \"en étant\" ✓.",
    ],
  },

  seo: [
    {
      heading: "¿Qué es el gérondif en francés y cómo se forma?",
      paragraphs: [
        "El gérondif es una construcción verbal francesa formada por la preposición 'en' seguida del participe présent (en + -ant). El participe présent se forma tomando el radical de la primera persona del plural del presente (nous) y añadiendo -ant: nous parlons → parlant → en parlant. Esta forma es completamente invariable: no cambia según el género, número ni persona.",
        "Solo hay tres formas irregulares: être → étant, avoir → ayant, savoir → sachant. Todos los demás verbos, incluyendo los verbos en -ir, -re y -oir, siguen la regla regular: nous finissons → finissant, nous prenons → prenant, nous savons → sachant. Aprendidos estos tres irregulares, el resto es completamente predecible.",
      ],
    },
    {
      heading: "Usos principales del gérondif: simultaneidad, manera y condición",
      paragraphs: [
        "El uso más común del gérondif es expresar simultaneidad: dos acciones realizadas al mismo tiempo por el mismo sujeto. 'Il écoute de la musique en travaillant' (Escucha música mientras trabaja). También expresa la manera o modo de realizar una acción: 'Elle est entrée en souriant' (Entró sonriendo). Aquí el gérondif describe cómo se realizó la acción principal.",
        "También puede expresar condición (equivalente a 'si'): 'En arrivant tôt, tu auras une bonne place' (Si llegas temprano, tendrás un buen asiento). Y puede expresar causa: 'Il s'est blessé en tombant' (Se lastimó al caerse). La variante 'tout en + gérondif' añade un matiz de oposición o contraste: 'Tout en comprenant tes raisons, je ne suis pas d'accord' (Aunque entiendo tus razones, no estoy de acuerdo).",
      ],
      table: [
        ["Uso", "Ejemplo", "Traducción"],
        ["Simultaneidad", "en parlant", "mientras habla / al hablar"],
        ["Manera", "en souriant", "sonriendo / con una sonrisa"],
        ["Condición", "en travaillant", "si trabaja / trabajando"],
      ],
    },
    {
      heading: "Diferencia entre gérondif y participe présent",
      paragraphs: [
        "Una confusión frecuente es entre el gérondif (en + -ant) y el participe présent (solo -ant). El participe présent puede modificar un sustantivo (como un adjetivo): 'une femme souriante' (una mujer sonriente), 'des étudiants travaillant dur' (estudiantes que trabajan duro). El gérondif, en cambio, siempre va precedido de 'en' y modifica el verbo principal.",
        "Otra diferencia clave: el participe présent puede tener un sujeto diferente al del verbo principal en construcciones absolutas, mientras que el gérondif siempre comparte sujeto con el verbo principal. 'Le soleil se couchant, nous sommes rentrés' (Participe présent — el sol se pone, nosotros entramos: sujetos distintos). 'Nous sommes rentrés en voyant le soleil se coucher' (Gérondif — nosotros somos el sujeto de ambas acciones).",
      ],
    },
  ],

  visual: {
    mode: "scene",
    teacherLens: "El gérondif francés expresa simultaneidad y manera. Siempre se forma con 'en' + participe présent y comparte sujeto con el verbo principal.",
    graphicPrompt: "Dos acciones paralelas realizadas por la misma persona, representadas con flechas simultáneas o superpuestas.",
    scene: [
      ["Il apprend l'espagnol en regardant des films.", "Aprende español viendo películas."],
      ["Elle a trouvé un emploi en cherchant sur Internet.", "Encontró trabajo buscando en Internet."],
      ["Il s'est coupé en cuisinant ce matin.", "Se cortó mientras cocinaba esta mañana."],
      ["Tout en souriant, elle a refusé l'invitation.", "Sonriendo, rechazó la invitación."],
      ["On améliore son français en lisant tous les jours.", "Uno mejora su francés leyendo todos los días."],
      ["En faisant du sport régulièrement, tu seras en meilleure santé.", "Haciendo deporte regularmente, estarás más sano."],
      ["Elle écoute les informations en prenant son petit-déjeuner.", "Escucha las noticias mientras desayuna."],
      ["Il a répondu à mes questions en hésitant beaucoup.", "Respondió mis preguntas dudando mucho."],
    ],
    learnerModes: ["reading", "typing", "choosing"],
    reviewFocus: ["en + participe présent", "sujeto compartido", "irreguliers étant/ayant/sachant"],
  },

  practice: {
    levels: [
      {
        id: "level-1",
        title: "Identifica el gérondif correcto",
        tag: "Opción múltiple",
        intro: "Elige la forma correcta del gérondif para completar cada oración.",
        type: "choice",
        items: [
          {
            scene: "Estudio de idiomas",
            lines: [["", "Elle a appris le chinois ___ des cours en ligne pendant deux ans."]],
            options: ["en suivant", "en suivit", "en suit", "suivant"],
            answer: "en suivant",
            explain: "Gérondif de 'suivre': nous suivons → suivant → en suivant. Siempre 'en' + participe présent.",
          },
          {
            scene: "Accidente doméstico",
            lines: [["", "Il s'est blessé à la main ___ la cuisine."]],
            options: ["en faisant", "en faisant de", "faisant", "en faisait"],
            answer: "en faisant",
            explain: "Gérondif de 'faire': nous faisons → faisant → en faisant. Expresa simultanéidad: se lastimó mientras cocinaba.",
          },
          {
            scene: "Deportes",
            lines: [["", "Tu maigris ___ régulièrement et ___ équilibré."]],
            options: ["en mangeant / en faisant du sport", "en faisant du sport / en mangeant", "faisant / mangeant", "en fait / en mange"],
            answer: "en faisant du sport / en mangeant",
            explain: "Dos gérondifs coordinados. Orden lógico: en faisant du sport... et en mangeant équilibré.",
          },
          {
            scene: "Presentación en el trabajo",
            lines: [["", "Le directeur est entré dans la salle ___."]],
            options: ["en souriant", "en sourit", "en souriait", "souriant"],
            answer: "en souriant",
            explain: "Gérondif de 'sourire': nous sourions → souriant → en souriant. Describe la manera de entrar.",
          },
          {
            scene: "Irregular del gérondif",
            lines: [["", "Il a tout compris ___ très attentif en classe."]],
            options: ["en étant", "en soyant", "en est", "étant"],
            answer: "en étant",
            explain: "Être es irregular: gérondif = en étant (no 'en soyant', que no existe).",
          },
          {
            scene: "Consejo práctico",
            lines: [["", "___ bien cette règle, vous éviterez beaucoup d'erreurs."]],
            options: ["En sachant", "En savant", "En savoir", "En sache"],
            answer: "En sachant",
            explain: "Savoir es irregular: gérondif = en sachant. Expresa condición: si conoces bien esta regla...",
          },
          {
            scene: "Tout en + gérondif",
            lines: [["", "___ les difficultés, il a refusé de renoncer."]],
            options: ["Tout en reconnaissant", "Tout en reconnaît", "En reconnaissant tout", "Tout reconnaissant"],
            answer: "Tout en reconnaissant",
            explain: "'Tout en + gérondif' expresa oposición o concesión: Aunque reconocía las dificultades, se negó a rendirse.",
          },
          {
            scene: "Aprendizaje activo",
            lines: [["", "On retient mieux le vocabulaire ___ régulièrement."]],
            options: ["en pratiquant", "en pratique", "pratiquant", "à pratiquer"],
            answer: "en pratiquant",
            explain: "Gérondif de 'pratiquer': nous pratiquons → pratiquant → en pratiquant. Expresa el modo de retener mejor.",
          },
        ],
      },
      {
        id: "level-2",
        title: "Combina las acciones",
        tag: "2 espacios",
        intro: "Completa con los dos gérondifs que faltan en cada oración.",
        type: "dual",
        items: [
          {
            scene: "Vida cotidiana",
            lines: [["", "Sophie prépare le dîner [[0]] la radio et [[1]] avec ses enfants."]],
            blanks: [
              { options: ["en écoutant", "en écoutait", "écoutant", "en écoute"], answer: "en écoutant", explain: "Gérondif de 'écouter': nous écoutons → écoutant → en écoutant. Simultaneidad con preparer." },
              { options: ["en chantant", "en chantait", "chantant", "en chante"], answer: "en chantant", explain: "Gérondif de 'chanter': nous chantons → chantant → en chantant. Segundo gérondif coordinado." },
            ],
          },
          {
            scene: "Descripción de una reunión",
            lines: [["", "Le chef a exposé son projet [[0]] des graphiques et [[1]] de façon très claire."]],
            blanks: [
              { options: ["en montrant", "en montrait", "montrant", "en montre"], answer: "en montrant", explain: "Gérondif de 'montrer': nous montrons → montrant → en montrant. Describe la manera de exponer." },
              { options: ["en expliquant", "en expliquait", "expliquant", "en explique"], answer: "en expliquant", explain: "Gérondif de 'expliquer': nous expliquons → expliquant → en expliquant. Segundo gérondif paralelo." },
            ],
          },
          {
            scene: "Consejos de salud",
            lines: [["", "Vous resterez en bonne santé [[0]] équilibré et [[1]] régulièrement."]],
            blanks: [
              { options: ["en mangeant", "en mangeait", "mangeant", "en mange"], answer: "en mangeant", explain: "Gérondif de 'manger': nous mangeons → mangeant → en mangeant. Condición para buena salud." },
              { options: ["en dormant", "en dormait", "dormant", "en dort"], answer: "en dormant", explain: "Gérondif de 'dormir': nous dormons → dormant → en dormant." },
            ],
          },
          {
            scene: "Historias contrastadas",
            lines: [["", "Tout en [[0]] qu'il avait tort, il a continué [[1]] la même chose."]],
            blanks: [
              { options: ["en sachant", "sachant", "en savant", "sait"], answer: "sachant", explain: "Aquí es participe présent (sin 'en') porque modifica el sujeto: Tout en sachant = aunque sabía. Equivale a Tout en + participe présent." },
              { options: ["à faire", "en faisant", "faisant", "de faire"], answer: "à faire", explain: "Continuer + à + infinitivo: continué à faire la même chose. No es gérondif aquí." },
            ],
          },
        ],
      },
      {
        id: "level-3",
        title: "Relato de una mañana",
        tag: "Texto guiado",
        intro: "Completa el relato usando gérondifs para describir cómo Marie pasó su mañana.",
        type: "guidedText",
        scene: "Marie describe su mañana productiva usando el gérondif para mostrar cómo realizó sus tareas.",
        text: "Ce matin, Marie a commencé sa journée [[0]] et [[1]] son café. Puis, elle a relu ses notes [[2]] ses révisions. Elle a aussi envoyé plusieurs emails [[3]] sa liste de tâches. [[4]] tôt, elle a pu finir tout son travail avant midi. Elle a même amélioré sa présentation [[5]] de nouveaux graphiques. Elle est repartie [[6]] d'avoir accompli autant en si peu de temps.",
        blanks: [
          { options: ["en se levant", "en se lève", "se levant", "en s'était levée"], answer: "en se levant", explain: "Gérondif reflexivo: en se levant. 'Lever' → nous nous levons → se levant → en se levant." },
          { options: ["en buvant", "en buvait", "buvant", "en boit"], answer: "en buvant", explain: "Gérondif de 'boire': nous buvons → buvant → en buvant. Beve café mientras empieza el día." },
          { options: ["en faisant", "en faisait", "faisant", "en fait"], answer: "en faisant", explain: "Gérondif de 'faire': nous faisons → faisant → en faisant. Mientras repasaba sus notas hacía sus revisiones." },
          { options: ["en consultant", "en consultait", "consultant", "en consulte"], answer: "en consultant", explain: "Gérondif de 'consulter': nous consultons → consultant → en consultant. Enviaba emails mientras consultaba la lista." },
          { options: ["En commençant", "En commence", "Commençant", "En commençait"], answer: "En commençant", explain: "Gérondif al inicio de oración expresa condición: Al empezar temprano. En commençant tôt = si empezaba / por empezar temprano." },
          { options: ["en ajoutant", "en ajoutait", "ajoutant", "en ajoute"], answer: "en ajoutant", explain: "Gérondif de 'ajouter': nous ajoutons → ajoutant → en ajoutant. Mejoró la presentación añadiendo gráficos." },
          { options: ["en étant", "en soyant", "étant", "en est"], answer: "en étant", explain: "Être irregular: en étant. Partió sintiéndose satisfecha (en étant satisfaite de...). Être → étant." },
        ],
      },
      {
        id: "level-4",
        title: "Expresa simultaneidad",
        tag: "Texto libre",
        intro: "Escribe la forma correcta del gérondif en cada espacio.",
        type: "freeText",
        scene: "Completa estas oraciones sobre hábitos cotidianos y consejos prácticos.",
        text: "Pour progresser en français, il faut s'exercer [[0]] chaque jour des textes authentiques. Lucas gagne du temps le matin [[1]] ses affaires la veille. Les scientifiques ont fait cette découverte [[2]] des expériences différentes. En [[3]] régulièrement, on maintient sa forme physique. Elle a résolu le problème [[4]] à ses collègues.",
        blanks: [
          { answer: "en lisant", accepted: ["en lisant"], explain: "Gérondif de 'lire': nous lisons → lisant → en lisant. Progresa leyendo textos auténticos cada día." },
          { answer: "en préparant", accepted: ["en préparant"], explain: "Gérondif de 'préparer': nous préparons → préparant → en préparant. Gana tiempo preparando sus cosas la víspera." },
          { answer: "en essayant", accepted: ["en essayant", "en testant"], explain: "Gérondif de 'essayer': nous essayons → essayant → en essayant. Hicieron el descubrimiento probando experimentos." },
          { answer: "s'entraînant", accepted: ["s'entraînant", "pratiquant", "faisant du sport"], explain: "Participio tras 'En': en s'entraînant. Mantiene la forma entrenando regularmente." },
          { answer: "en parlant", accepted: ["en parlant", "en demandant", "en consultant"], explain: "Gérondif de 'parler': nous parlons → parlant → en parlant. Resolvió el problema hablando con sus colegas." },
        ],
      },
      {
        id: "level-5",
        title: "Producción: expresa manera y simultanéidad",
        tag: "Producción",
        intro: "Escribe oraciones completas usando el gérondif según las indicaciones.",
        type: "write",
        items: [
          {
            scene: "Combina dos acciones simultáneas",
            prompt: "Escribe una oración sobre alguien que escucha música mientras estudia (écouter de la musique + étudier).",
            answer: "Il étudie en écoutant de la musique.",
            accepted: ["en écoutant de la musique", "en étudiant"],
            explain: "Gérondif de 'écouter': en écoutant. El sujeto realiza ambas acciones simultáneamente: estudia mientras escucha música.",
          },
          {
            scene: "Expresa la manera de hacer algo",
            prompt: "¿Cómo mejoró su pronunciación? (répéter les mots → améliorer sa prononciation)",
            answer: "Il a amélioré sa prononciation en répétant les mots.",
            accepted: ["en répétant", "a amélioré sa prononciation en répétant"],
            explain: "Gérondif de 'répéter': nous répétons → répétant → en répétant. Describe la manera de mejorar.",
          },
          {
            scene: "Expresa una condición",
            prompt: "Escribe un consejo usando el gérondif: trabajar en equipo → tener mejores resultados.",
            answer: "En travaillant en équipe, vous obtiendrez de meilleurs résultats.",
            accepted: ["En travaillant en équipe", "obtiendrez de meilleurs résultats"],
            explain: "Gérondif al inicio expresa condición. En travaillant = si trabajan / trabajando en equipo.",
          },
          {
            scene: "Usa 'tout en' para contraste",
            prompt: "Escribe una oración de contraste: entender el problema / no encontrar solución (comprendre / ne pas trouver).",
            answer: "Tout en comprenant le problème, il n'a pas trouvé de solution.",
            accepted: ["Tout en comprenant", "n'a pas trouvé de solution"],
            explain: "Tout en + gérondif expresa concesión/oposición: aunque entendía el problema, no encontró solución.",
          },
        ],
      },
      {
        id: "level-6",
        title: "Misión: reescribe usando el gérondif",
        tag: "Producción libre",
        intro: "Reescribe las siguientes oraciones usando el gérondif para combinar las dos ideas.",
        type: "write",
        items: [
          {
            scene: "Combinar dos acciones",
            prompt: "Reescribe: 'Elle regarde la télévision. Elle fait du sport.' → usa 'en + gérondif' para combinarlas.",
            answer: "Elle fait du sport en regardant la télévision.",
            accepted: ["en regardant la télévision", "fait du sport en regardant"],
            explain: "Gérondif de 'regarder': en regardant. La acción principal es 'faire du sport'; la simultánea va en gérondif.",
          },
          {
            scene: "Expresar la causa de un accidente",
            prompt: "Reescribe: 'Il courait. Il est tombé.' → usa el gérondif para expresar simultaneidad/causa.",
            answer: "Il est tombé en courant.",
            accepted: ["en courant", "est tombé en courant"],
            explain: "Gérondif de 'courir': nous courons → courant → en courant. La causa del accidente es correr.",
          },
          {
            scene: "Dar un consejo",
            prompt: "Da un consejo: para ganar tiempo por la mañana, prepara tus cosas la noche anterior.",
            answer: "En préparant tes affaires la veille, tu gagneras du temps le matin.",
            accepted: ["En préparant tes affaires", "gagneras du temps"],
            explain: "Gérondif al inicio = condición/consejo: En préparant (si preparas / preparando). Futur après la condition.",
          },
        ],
      },
    ],
  },
}

export default topic
