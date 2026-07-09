import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'questions-indirectes-b1',
  order: '14',
  color: '#2563eb',
  category: 'Preguntas',
  level: 'B1',
  title: 'Les Questions Indirectes en Francés B1',
  shortTitle: 'Questions Indirectes',
  metaTitle: 'Questions Indirectes B1 — Preguntas indirectas en francés: si, ce qui, ce que',
  description:
    "Las questions indirectes permiten hacer preguntas de forma indirecta, embebiéndolas en oraciones principales como 'Je voudrais savoir si...', 'Je me demande ce que...'. Requieren: eliminar la inversión del sujeto, usar 'si' para preguntas sí/no, 'ce qui/ce que' para el pronombre interrogativo 'que', y cambiar el signo de interrogación por punto.",
  lead: "Aprende a formular preguntas indirectas en francés: sin inversión, con si para sí/no, con ce qui/ce que en lugar de qu'est-ce qui/qu'est-ce que.",
  outcomes: [
    "Transformas preguntas directas en indirectas eliminando la inversión",
    "Usas 'si' para preguntas de respuesta sí/no en estilo indirecto",
    "Distingues 'ce qui' (sujeto) de 'ce que' (complemento) en preguntas indirectas",
    "Adaptas los tiempos verbales según la concordancia de tiempos",
  ],

  guide: {
    goal: "Reportar o hacer preguntas de forma educada e indirecta en francés.",
    model: "Je voudrais savoir si vous avez une table libre. / Je me demande ce qu'il pense de cette idée. / Peux-tu me dire où se trouve la gare?",
    formula: "verbe principal + si (oui/non) | verbe + ce qui/ce que (que) | verbe + où/quand/comment/pourquoi/combien + ordre affirmatif",
    decisions: [
      "Suprime la inversión: 'Où est-il?' → 'Je me demande où il est.' (No: où est-il).",
      "Preguntas oui/non: remplace 'est-ce que' o la inversión por 'si': 'Est-il là?' → 'Je voudrais savoir s'il est là.'",
      "Qu'est-ce qui (sujet) → ce qui: 'Je veux savoir ce qui se passe.'",
      "Qu'est-ce que / que (objet) → ce que: 'Je veux savoir ce qu'il fait.'",
      "Les autres pronoms (où, quand, comment, pourquoi, combien) restent: 'Dis-moi pourquoi tu pleures.'",
      "Pas de point d'interrogation en question indirecte: point final. 'Dites-moi quand vous arriverez.'",
      "Concordance des temps: si introducida en passé, les temps changent (comme discours indirect).",
    ],
    table: [
      ["Pregunta directa", "Transformación", "Pregunta indirecta"],
      ["Est-ce qu'il vient?", "si (oui/non)", "Je me demande s'il vient."],
      ["Qu'est-ce qui se passe?", "ce qui (sujet)", "Je veux savoir ce qui se passe."],
      ["Que fait-il?", "ce que (objet)", "Je veux savoir ce qu'il fait."],
    ],
    mistakes: [
      "\"Je me demande où est-il\" ❌ — sin inversión en pregunta indirecta: \"Je me demande où il est\" ✓.",
      "\"Je veux savoir qu'est-ce qu'il veut\" ❌ — qu'est-ce que → ce que: \"Je veux savoir ce qu'il veut\" ✓.",
      "\"Dites-moi quand arrivera-t-il?\" ❌ — sin inversión ni signo de interrogación: \"Dites-moi quand il arrivera.\" ✓.",
    ],
  },

  seo: [
    {
      heading: "¿Qué es una pregunta indirecta en francés?",
      paragraphs: [
        "Una question indirecte embebe una pregunta dentro de otra oración, usando verbos como 'se demander', 'savoir', 'dire', 'demander', 'expliquer'. Ejemplos: 'Je ne sais pas où il habite' (No sé dónde vive), 'Elle m'a demandé si j'étais libre ce soir' (Me preguntó si estaba libre esta noche). A diferencia de la pregunta directa, la indirecta no lleva inversión del sujeto ni signo de interrogación.",
        "Las preguntas indirectas son fundamentales para comunicarse de forma educada y formal. En lugar de '\"Où est la gare?\"' (directo, algo brusco), podemos decir 'Pourriez-vous me dire où se trouve la gare?' (mucho más cortés). También permiten reportar preguntas que hicimos o que nos hicieron sin citarlas textualmente.",
      ],
    },
    {
      heading: "Las reglas clave: sin inversión, si, ce qui/ce que",
      paragraphs: [
        "Tres reglas fundamentales de las questions indirectes: Primera — eliminar la inversión: 'Où va-t-il?' → 'Je me demande où il va' (no 'où va-t-il'). Segunda — preguntas de sí/no: sustituir 'est-ce que' o la inversión por 'si': 'Est-ce qu'il viendra?' → 'Je voudrais savoir s'il viendra'. Tercera — qu'est-ce qui / qu'est-ce que → ce qui / ce que: 'Qu'est-ce qui se passe?' → 'Je veux savoir ce qui se passe'; 'Qu'est-ce que tu veux?' → 'Je veux savoir ce que tu veux'.",
        "Los otros pronombres interrogativos (où, quand, comment, pourquoi, combien, quel) no cambian, solo se elimina la inversión: 'Pourquoi part-il?' → 'Je ne comprends pas pourquoi il part'. El signo de interrogación desaparece, reemplazado por punto: 'Dis-moi quand tu arriveras.' (no '...arriveras?').",
      ],
      table: [
        ["Pregunta directa", "Elemento clave", "Pregunta indirecta"],
        ["Est-ce qu'il vient?", "si", "Je me demande s'il vient."],
        ["Qu'est-ce qui manque?", "ce qui", "Je veux savoir ce qui manque."],
        ["Qu'est-ce qu'il fait?", "ce que", "Je veux savoir ce qu'il fait."],
      ],
    },
    {
      heading: "Verbos introductorios y usos de las preguntas indirectas",
      paragraphs: [
        "Los verbos más comunes para introducir preguntas indirectas son: se demander (preguntarse), savoir (saber), dire (decir), expliquer (explicar), comprendre (comprender), demander (preguntar), vouloir savoir (querer saber), ignorer (desconocer). Ejemplos: 'Je me demande pourquoi elle est partie' (Me pregunto por qué se fue), 'Il ne sait pas comment faire' (No sabe cómo hacerlo).",
        "En contextos formales y profesionales, las preguntas indirectas son esenciales: 'Pourriez-vous m'indiquer comment accéder au service client?' (¿Podría indicarme cómo acceder al servicio al cliente?). También en formularios y encuestas: 'Veuillez préciser dans quel secteur vous travaillez.' (Por favor, indique en qué sector trabaja). El dominio de las questions indirectes es marca de registro formal y educado en francés.",
      ],
    },
  ],

  visual: {
    mode: "scene",
    teacherLens: "Questions indirectes: sin inversión, si para oui/non, ce qui/ce que en lugar de qu'est-ce qui/que. Siempre con punto, nunca con signo de interrogación.",
    graphicPrompt: "Flecha de transformación entre pregunta directa (con inversión) y pregunta indirecta (sin inversión, con punto).",
    scene: [
      ["Je me demande où elle habite maintenant.", "Me pregunto dónde vive ahora."],
      ["Pouvez-vous me dire quand le train part?", "¿Puede decirme cuándo sale el tren?"],
      ["Il ne sait pas si la réunion est annulée.", "No sabe si la reunión está cancelada."],
      ["Je voudrais savoir ce qui s'est passé hier soir.", "Quisiera saber qué pasó anoche."],
      ["Elle m'a demandé ce que je pensais de son projet.", "Ella me preguntó qué pensaba de su proyecto."],
      ["Dites-moi combien de personnes ont confirmé leur présence.", "Dígame cuántas personas confirmaron su asistencia."],
      ["Je ne comprends pas pourquoi il ne répond jamais.", "No entiendo por qué nunca responde."],
      ["Tu sais comment on fait pour obtenir ce permis?", "¿Sabes cómo se hace para obtener ese permiso?"],
    ],
    learnerModes: ["reading", "typing", "choosing"],
    reviewFocus: ["sin inversión", "si (oui/non)", "ce qui vs ce que"],
  },

  practice: {
    levels: [
      {
        id: "level-1",
        title: "Transforma a pregunta indirecta",
        tag: "Opción múltiple",
        intro: "Elige la forma correcta de la pregunta indirecta.",
        type: "choice",
        items: [
          {
            scene: "Pregunta sobre el tiempo",
            lines: [["Directa:", "\"Est-ce qu'il pleut à Paris?\""], ["Indirecta:", "Je voudrais savoir ___ à Paris."]],
            options: ["s'il pleut", "si il pleut", "est-ce qu'il pleut", "s'il pleurait"],
            answer: "s'il pleut",
            explain: "Pregunta oui/non → si. Il: elision ante 'il': s'il. Je voudrais savoir s'il pleut à Paris.",
          },
          {
            scene: "Pregunta sobre un lugar",
            lines: [["Directa:", "\"Où se trouve la pharmacie?\""], ["Indirecta:", "Pouvez-vous me dire ___ la pharmacie?"]],
            options: ["où se trouve", "où est-ce que se trouve", "où se trouvent", "si la pharmacie se trouve"],
            answer: "où se trouve",
            explain: "'Où' no cambia en pregunta indirecta. Solo se elimina la inversión: où se trouve (orden normal sujeto-verbo).",
          },
          {
            scene: "Qu'est-ce qui → ce qui",
            lines: [["Directa:", "\"Qu'est-ce qui fait ce bruit?\""], ["Indirecta:", "Je voudrais savoir ___ ce bruit."]],
            options: ["ce qui fait", "ce que fait", "qu'est-ce qui fait", "ce qu'il fait"],
            answer: "ce qui fait",
            explain: "'Qu'est-ce qui' (sujeto) → 'ce qui' en pregunta indirecta. Ce qui fait ce bruit = qué hace ese ruido.",
          },
          {
            scene: "Qu'est-ce que → ce que",
            lines: [["Directa:", "\"Qu'est-ce qu'il veut?\""], ["Indirecta:", "Elle m'a demandé ___ il voulait."]],
            options: ["ce qu'il", "ce qu'", "qu'est-ce qu'il", "si il"],
            answer: "ce qu'il",
            explain: "'Qu'est-ce que' (objeto) → 'ce que/qu'' en pregunta indirecta. Ce qu'il = ce que + il (elision).",
          },
          {
            scene: "Pourquoi no cambia",
            lines: [["Directa:", "\"Pourquoi est-il en retard?\""], ["Indirecta:", "Je ne comprends pas ___ en retard."]],
            options: ["pourquoi il est", "pourquoi est-il", "si il est", "ce pourquoi il est"],
            answer: "pourquoi il est",
            explain: "'Pourquoi' no cambia. Solo se elimina la inversión: pourquoi il est (no est-il). Orden: sujet + verbe.",
          },
          {
            scene: "Sin signo de interrogación",
            lines: [["", "Dis-moi ___ tu penses de ce film."]],
            options: ["ce que", "qu'est-ce que", "ce qui", "si"],
            answer: "ce que",
            explain: "'Que' (objeto de penser) → ce que en pregunta indirecta. Dis-moi ce que tu penses = dime qué piensas. No lleva '?'.",
          },
          {
            scene: "Concordance des temps",
            lines: [["Directa:", "\"Quand arriveras-tu?\""], ["Indirecta (en pasado):", "Il m'a demandé quand ___."]],
            options: ["j'arriverais", "j'arriverai", "j'arrive", "j'arrivai"],
            answer: "j'arriverais",
            explain: "Concordance des temps: introductor en passé (a demandé) → futur → conditionnel. Quand j'arriverais = cuándo llegaría.",
          },
          {
            scene: "Combien no cambia",
            lines: [["Directa:", "\"Combien coûte ce billet?\""], ["Indirecta:", "Savez-vous ___ ce billet?"]],
            options: ["combien coûte", "combien est-ce que coûte", "combien coûte-t-il", "si le billet coûte"],
            answer: "combien coûte",
            explain: "'Combien' no cambia. Se elimina la inversión. Savez-vous combien coûte ce billet? (orden normal).",
          },
        ],
      },
      {
        id: "level-2",
        title: "Reordena la pregunta indirecta",
        tag: "2 espacios",
        intro: "Completa la pregunta indirecta con los dos elementos que faltan.",
        type: "dual",
        items: [
          {
            scene: "Servicio al cliente",
            lines: [["", "Je voudrais [[0]] si vous proposez [[1]] de livraison gratuite."]],
            blanks: [
              { options: ["savoir", "demander", "dire", "comprendre"], answer: "savoir", explain: "Verbe introducteur: vouloir savoir si... Je voudrais savoir = quisiera saber." },
              { options: ["un service", "une service", "le service", "des services"], answer: "un service", explain: "Artículo indefinido: un service (el servicio de entrega gratuita, no específico todavía). Si vous proposez un service de livraison." },
            ],
          },
          {
            scene: "Transformación de pregunta directa",
            lines: [["Directa:", "\"Qu'est-ce que vous cherchez?\""], ["Indirecta:", "Puis-je vous aider à trouver [[0]] vous [[1]]?"]],
            blanks: [
              { options: ["ce que", "qu'est-ce que", "ce qui", "si"], answer: "ce que", explain: "'Qu'est-ce que' (objeto) → 'ce que' en question indirecte. Ce que vous cherchez = qué busca usted." },
              { options: ["cherchez", "cherchiez", "cherchez-vous", "avez cherché"], answer: "cherchez", explain: "Sin inversión en question indirecte: vous cherchez (no cherchez-vous). Orden normal sujet-verbe." },
            ],
          },
          {
            scene: "Petición educada",
            lines: [["", "Pourriez-vous m'expliquer [[0]] je dois remplir [[1]] formulaire?"]],
            blanks: [
              { options: ["comment", "ce que", "si", "pourquoi"], answer: "comment", explain: "'Comment' no cambia en question indirecte. Comment je dois remplir = cómo debo rellenar. Sin inversión." },
              { options: ["ce", "quel", "lequel", "chaque"], answer: "ce", explain: "Ce formulaire = este formulario (demostratif). Quel formulaire = qué formulario (interrogatif). Aquí es anafórico: ce formulaire (el mencionado)." },
            ],
          },
          {
            scene: "No saber algo",
            lines: [["", "Je ne sais pas [[0]] le concert [[1]] annulé ou non."]],
            blanks: [
              { options: ["si", "ce qui", "ce que", "pourquoi"], answer: "si", explain: "'Si' para preguntas oui/non: je ne sais pas si le concert est... Pregunta de confirmación: ¿fue cancelado o no?" },
              { options: ["a été", "est", "sera", "avait été"], answer: "a été", explain: "Passé composé passif: a été annulé. El concierto fue cancelado. El tiempo depende del contexto: si est, a été, o sera." },
            ],
          },
        ],
      },
      {
        id: "level-3",
        title: "Encuesta de satisfacción",
        tag: "Texto guiado",
        intro: "Transforma este cuestionario de encuesta a preguntas indirectas.",
        type: "guidedText",
        scene: "Un servicio de atención al cliente quiere saber la opinión de los usuarios sobre su experiencia.",
        text: "Nous aimerions savoir [[0]] vous avez trouvé notre service satisfaisant. Pouvez-vous nous indiquer [[1]] votre visite a duré? Nous voudrions également comprendre [[2]] vous avez choisi notre entreprise plutôt qu'une autre. Dites-nous [[3]] vous souhaitez que nous améliorions en priorité. Enfin, nous vous demandons [[4]] vous recommanderiez nos services à vos proches, et [[5]] note vous nous donneriez sur 10.",
        blanks: [
          { options: ["si", "ce que", "ce qui", "pourquoi"], answer: "si", explain: "Pregunta oui/non → si. Est-ce que vous avez trouvé... → si vous avez trouvé. Si introduces la question indirecte fermée." },
          { options: ["combien de temps", "depuis combien", "comment", "quand"], answer: "combien de temps", explain: "'Combien de temps' no cambia. Combien de temps a duré votre visite? → combien de temps votre visite a duré." },
          { options: ["pourquoi", "ce que", "si", "comment"], answer: "pourquoi", explain: "'Pourquoi' no cambia. Pourquoi avez-vous choisi... → pourquoi vous avez choisi (sin inversión)." },
          { options: ["ce que", "ce qui", "si", "comment"], answer: "ce que", explain: "'Qu'est-ce que vous souhaitez améliorer?' → ce que vous souhaitez améliorer. 'Ce que' para el objeto directo." },
          { options: ["si", "ce que", "pourquoi", "comment"], answer: "si", explain: "Segunda pregunta oui/non: est-ce que vous recommanderiez... → si vous recommanderiez. Pregunta de sí o no." },
          { options: ["quelle", "quel", "ce que", "combien"], answer: "quelle", explain: "'Quelle note' — l'adjectif interrogatif 'quel' no cambia en question indirecte. Quelle note vous nous donneriez = qué nota nos daría." },
        ],
      },
      {
        id: "level-4",
        title: "Transforma las preguntas",
        tag: "Texto libre",
        intro: "Transforma las preguntas directas en indirectas.",
        type: "freeText",
        scene: "Convierte estas preguntas directas en preguntas indirectas usando el verbo indicado.",
        text: "\"Qu'est-ce qui s'est passé?\" → Je voudrais savoir [[0]]. / \"Est-ce qu'il est arrivé?\" → Tu sais [[1]]? / \"Où travaille-t-il?\" → Je me demande [[2]]. / \"Pourquoi n'a-t-elle pas répondu?\" → Je ne comprends pas [[3]]. / \"Combien ça coûte?\" → Pouvez-vous me dire [[4]]?",
        blanks: [
          { answer: "ce qui s'est passé", accepted: ["ce qui s'est passé", "ce qui est arrivé"], explain: "'Qu'est-ce qui' (sujeto) → 'ce qui'. Je voudrais savoir ce qui s'est passé. Sin signo de interrogación." },
          { answer: "s'il est arrivé", accepted: ["s'il est arrivé", "si il est arrivé"], explain: "Pregunta oui/non → si. Est-ce qu'il est arrivé? → si il est arrivé. Elision: s'il." },
          { answer: "où il travaille", accepted: ["où il travaille"], explain: "'Où' no cambia. Se elimina la inversión: où il travaille (no où travaille-t-il). Orden: sujet + verbe." },
          { answer: "pourquoi elle n'a pas répondu", accepted: ["pourquoi elle n'a pas répondu", "pourquoi elle n'avait pas répondu"], explain: "'Pourquoi' no cambia. Sin inversión: pourquoi elle n'a pas répondu (no n'a-t-elle pas)." },
          { answer: "combien ça coûte", accepted: ["combien ça coûte", "combien cela coûte"], explain: "'Combien' no cambia. Orden normal: combien ça coûte (no coûte ça). Sin signo de interrogación: punto." },
        ],
      },
      {
        id: "level-5",
        title: "Producción: pregunta con educación",
        tag: "Producción",
        intro: "Escribe preguntas indirectas educadas según las situaciones.",
        type: "write",
        items: [
          {
            scene: "Pedir información en una tienda",
            prompt: "Quieres saber si hay talla M disponible. Escribe una pregunta indirecta educada.",
            answer: "Je voudrais savoir si vous avez cette veste en taille M.",
            accepted: ["si vous avez", "savoir si", "me dire si"],
            explain: "Si para pregunta oui/non. Je voudrais savoir si = quisiera saber si. Sin inversión, sin signo de interrogación.",
          },
          {
            scene: "Pedir explicación",
            prompt: "No entiendes cómo funciona el nuevo sistema. Pregunta a un compañero de forma indirecta.",
            answer: "Tu pourrais m'expliquer comment ce nouveau système fonctionne?",
            accepted: ["comment ce système fonctionne", "comment fonctionne", "m'expliquer comment"],
            explain: "'Comment' no cambia. Sin inversión: comment ce système fonctionne (no comment fonctionne-t-il). Con '?' porque la oración principal sí es pregunta.",
          },
          {
            scene: "Qu'est-ce que → ce que",
            prompt: "Pregúntale indirectamente a alguien qué quiere de comer.",
            answer: "Dis-moi ce que tu veux manger.",
            accepted: ["ce que tu veux", "ce qu'il veut", "ce qu'elle veut"],
            explain: "'Qu'est-ce que tu veux?' → 'ce que tu veux'. Ce que = objeto del verbo. Sin inversión, sin signo de interrogación tras Dis-moi.",
          },
          {
            scene: "Pregunta formal por escrito",
            prompt: "En un correo formal, pregunta a qué hora empieza la reunión.",
            answer: "Je vous serais reconnaissant de me préciser à quelle heure commence la réunion.",
            accepted: ["à quelle heure commence la réunion", "à quelle heure la réunion commence"],
            explain: "'Quelle heure' no cambia como interrogatif. Sin inversión: à quelle heure commence (o: la réunion commence). Tono formal con 'je vous serais reconnaissant de'.",
          },
        ],
      },
      {
        id: "level-6",
        title: "Misión: reporta preguntas del día",
        tag: "Producción libre",
        intro: "Escribe 3 preguntas indirectas reportando lo que preguntaron diferentes personas.",
        type: "write",
        items: [
          {
            scene: "Tu jefe te preguntó algo",
            prompt: "Tu jefe te preguntó cuándo terminarías el informe. Reporta la pregunta usando 'il m'a demandé...'.",
            answer: "Mon chef m'a demandé quand je terminerais le rapport.",
            accepted: ["m'a demandé quand", "demandé quand je terminerais"],
            explain: "Concordance des temps: a demandé (passé) → je terminerais (conditionnel, futuro en el pasado). Quand no cambia, sin inversión.",
          },
          {
            scene: "Un amigo quería saber algo",
            prompt: "Tu amigo te preguntó si ibas a la fiesta. Reporta con 'il m'a demandé si...'.",
            answer: "Il m'a demandé si j'allais à la fête.",
            accepted: ["m'a demandé si j'allais", "si j'allais à la fête"],
            explain: "Oui/non → si. Concordance: il m'a demandé (passé) → j'allais (imparfait, presente en el pasado). S'il (elision).",
          },
          {
            scene: "Una clienta preguntó qué recomendabas",
            prompt: "Una clienta quería saber qué plato recomendabas. Reporta con 'elle voulait savoir ce que...'.",
            answer: "Elle voulait savoir ce que je recommandais comme plat.",
            accepted: ["voulait savoir ce que je recommandais", "ce que tu recommandais"],
            explain: "Qu'est-ce que → ce que. Concordance: voulait (imparfait) → recommandais (imparfait). Ce que je recommandais = lo que recomendaba.",
          },
        ],
      },
    ],
  },
}

export default topic
