import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pronoms-y-en-b1',
  order: '17',
  color: '#2563eb',
  category: 'Pronombres',
  level: 'B1',
  title: 'Les Pronoms Y et En en Francés B1',
  shortTitle: 'Pronoms Y et En',
  metaTitle: "Pronoms Y et En B1 — Reemplazar complementos de lugar y de cantidad en francés",
  description:
    "Los pronombres 'y' y 'en' son dos de los más versátiles del francés. 'Y' reemplaza un complemento de lugar (à/dans/sur + lieu) o un complemento introducido por 'à' (no persona). 'En' reemplaza un complemento introducido por 'de' o los artículos partitivos y expresiones de cantidad. Su posición siempre es antes del verbo.",
  lead: "Domina los pronombres 'y' y 'en' del francés: reemplaza complementos de lugar, de cantidad y las estructuras con 'à' y 'de' para hablar con fluidez y naturalidad.",
  outcomes: [
    "Usas 'y' para reemplazar complementos de lugar y complementos en 'à' (no personas)",
    "Usas 'en' para reemplazar partitivos, 'de + lieu' y expresiones de cantidad",
    "Colocas 'y' y 'en' correctamente antes del verbo conjugado",
    "Manejas 'y' y 'en' con el impératif afirmatif (posición postverbal)",
  ],

  guide: {
    goal: "Reemplazar complementos repetitivos con los pronombres 'y' y 'en' para un francés más fluido y natural.",
    model: "Je vais à Paris → J'y vais. / Il mange du pain → Il en mange. / Tu penses à ton travail? → Tu y penses?",
    formula: "Y: remplace à/dans/sur/chez + lieu, ou à + chose | En: remplace de + nom, du/de la/des + nom, ou quantité",
    decisions: [
      "Y = lugar: 'Tu vas au cinéma?' → 'Tu y vas?' (y = au cinéma)",
      "Y = à + chose (no persona): 'Tu penses à l'examen?' → 'Tu y penses?' (y = à l'examen)",
      "Y pas pour les personnes avec penser à: 'Tu penses à Marie?' → 'Tu penses à elle?' (pas y)",
      "En = du/de la/des + nom: 'Tu veux du café?' → 'Tu en veux?' (en = du café)",
      "En = de + lieu: 'Il revient de Paris' → 'Il en revient' (en = de Paris)",
      "En + quantité: 'J'ai deux sœurs' → 'J'en ai deux' (quantité reste explicite!)",
      "Position: avant le verbe conjugué. 'Il y va. Elle en mange.' Impératif affirmatif: verbe + y/en. 'Vas-y! Prends-en!'",
    ],
    table: [
      ["Pronom", "Remplace", "Exemple"],
      ["y", "à/dans/chez + lieu", "J'y vais. (à Paris)"],
      ["y", "à + chose (non-personne)", "J'y pense. (à ce problème)"],
      ["en", "du/de la/des + nom", "J'en veux. (du café)"],
    ],
    mistakes: [
      "\"Je pense y\" ❌ — y va avant le verbe: \"J'y pense\" ✓.",
      "\"J'y pense à Marie\" ❌ — y no reemplaza personas: \"Je pense à elle\" ✓.",
      "\"J'en ai\" sans quantité quand il y en a une ❌ — conservar el número: \"J'en ai deux\" ✓.",
    ],
  },

  seo: [
    {
      heading: '¿Cuándo se usa el pronombre "y" en francés?',
      paragraphs: [
        "El pronombre 'y' tiene dos funciones principales. Primero, reemplaza un complemento de lugar introducido por 'à', 'dans', 'sur', 'en', 'chez': 'Je vais à la bibliothèque' → 'J'y vais' (y = a la biblioteca). 'Nous habitons en France' → 'Nous y habitons' (y = en France). Segundo, reemplaza un complemento introducido por 'à' que se refiere a una cosa, una idea o un concepto (no una persona): 'Il croit à ce projet' → 'Il y croit' (y = à ce projet).",
        "Importante limitación: 'y' no reemplaza a personas cuando el verbo se construye con 'à + personne'. Con verbos como 'penser à', 'tenir à', 's'intéresser à' seguidos de personas, se usa el pronombre tónico: 'Tu penses à tes parents?' → 'Tu penses à eux?' (no 'tu y penses' para personas). Pero 'Tu penses à ce problème?' → 'Tu y penses?' (cosa → y). Esta distinción persona/cosa es crucial.",
      ],
    },
    {
      heading: '¿Cuándo se usa el pronombre "en" en francés?',
      paragraphs: [
        "El pronombre 'en' reemplaza principalmente tres tipos de complementos: los artículos partitivos (du, de la, des) + sustantivo: 'Vous voulez du thé?' → 'Vous en voulez?'; las expresiones de cantidad con 'de': 'Elle a beaucoup de travail' → 'Elle en a beaucoup' (la cantidad queda explícita); y el complemento de lugar introducido por 'de': 'Il revient de Lyon' → 'Il en revient' (en = de Lyon).",
        "Con las expresiones de cantidad, 'en' reemplaza el sustantivo pero la cantidad permanece: 'J'ai deux frères' → 'J'en ai deux' (dos permanece). 'Il y a beaucoup de monde' → 'Il y en a beaucoup'. Si no hay cantidad expresada: 'Tu as des frères?' → 'Oui, j'en ai' (sin especificar cuántos). Con la negación, la cantidad desaparece: 'Je n'en ai pas'.",
      ],
      table: [
        ["Contexto de uso", "Pronombre", "Ejemplo completo"],
        ["Du/de la/des + nom", "en", "'du pain' → J'en mange."],
        ["De + lieu", "en", "'de Paris' → J'en reviens."],
        ["Quantité + de + nom", "en + quantité", "'deux amis' → J'en ai deux."],
      ],
    },
    {
      heading: '¿Dónde se colocan "y" y "en" en francés?',
      paragraphs: [
        "La regla de posición es simple: 'y' y 'en' se colocan siempre delante del verbe conjugué (o del infinitif si hay dos verbos). 'Il y va' (va conjugué). 'Je veux y aller' (y avant l'infinitif aller). 'J'en voudrais un peu' (en avant voudrais). Con les temps composés: 'J'y suis allé' (y avant l'auxiliaire), 'J'en ai mangé' (en avant l'auxiliaire).",
        "Con el impératif affirmatif, la posición cambia: 'y' y 'en' se colocan después del verbo con un trait d'union: 'Vas-y!' (¡Ve allí!), 'Prends-en!' (¡Toma algo/un poco!), 'Penses-y!' (¡Piénsalo!). Atención: el verbo 'aller' a l'impératif añade una -s ante 'y' para la liaison: 'Vas-y' (no 'Va-y'). Con el impératif négatif: posición normal antes del verbo: 'N'y va pas! N'en prends pas!'",
      ],
    },
  ],

  visual: {
    mode: "scene",
    teacherLens: "Y = lugar/à+chose; En = de+nom/partitif/quantité. Ambos van antes del verbo. Con impératif affirmatif: posición postverbal.",
    graphicPrompt: "Dos columnas con ejemplos de 'y' y 'en', mostrando la sustitución y la posición del pronombre en la frase.",
    scene: [
      ["Tu vas souvent au gymnase? — J'y vais trois fois par semaine.", "¿Vas al gimnasio a menudo? — Voy tres veces por semana."],
      ["Tu penses encore à ce problème? — Oui, j'y pense tout le temps.", "¿Sigues pensando en ese problema? — Sí, pienso en él todo el tiempo."],
      ["Il reste du gâteau? — Oui, il en reste encore un peu.", "¿Queda pastel? — Sí, queda un poco todavía."],
      ["Vous revenez de vacances? — Oui, nous en revenons ce matin.", "¿Vuelven de vacaciones? — Sí, volvemos de ellas esta mañana."],
      ["Tu veux du café? — Non merci, je n'en bois jamais le soir.", "¿Quieres café? — No gracias, nunca lo bebo por la noche."],
      ["C'est une bonne idée — penses-y ce week-end!", "Es una buena idea — ¡piénsalo este fin de semana!"],
      ["Vous avez des enfants? — Oui, nous en avons trois.", "¿Tienen hijos? — Sí, tenemos tres."],
      ["Il faut aller à la pharmacie — vas-y maintenant!", "Hay que ir a la farmacia — ¡ve ahora mismo!"],
    ],
    learnerModes: ["reading", "typing", "choosing"],
    reviewFocus: ["y (lugar / à+cosa)", "en (partitif / quantité)", "posición + impératif"],
  },

  practice: {
    levels: [
      {
        id: "level-1",
        title: "Y ou en?",
        tag: "Opción múltiple",
        intro: "Elige el pronombre correcto (y o en) y la forma de la oración.",
        type: "choice",
        items: [
          {
            scene: "Destino de viaje",
            lines: [["", "Tu vas souvent en Italie? — Oui, ___ vais chaque été."]],
            options: ["j'y", "j'en", "je lui", "je la"],
            answer: "j'y",
            explain: "'Y' reemplaza complemento de lugar (en Italie). J'y vais chaque été. Y = en Italie.",
          },
          {
            scene: "Partitif",
            lines: [["", "Vous mangez du fromage? — Oui, nous ___ mangeons beaucoup."]],
            options: ["en", "y", "le", "la"],
            answer: "en",
            explain: "'En' reemplaza du + nom (du fromage). Nous en mangeons = nous mangeons du fromage.",
          },
          {
            scene: "Quantité",
            lines: [["", "Tu as des frères? — Oui, j'___ ai deux."]],
            options: ["en", "y", "les", "leur"],
            answer: "en",
            explain: "'En' reemplaza des + nom con quantité. J'en ai deux: la quantité (deux) reste explicite.",
          },
          {
            scene: "Complément avec à (chose)",
            lines: [["", "Tu t'intéresses à ce projet? — Oui, je ___ intéresse beaucoup."]],
            options: ["m'y", "m'en", "me le", "me lui"],
            answer: "m'y",
            explain: "'Y' reemplaza à + chose (à ce projet). S'intéresser à + chose → y. Je m'y intéresse.",
          },
          {
            scene: "Retour d'un lieu",
            lines: [["", "Tu reviens de la bibliothèque? — Oui, j'___ reviens à l'instant."]],
            options: ["en", "y", "lui", "le"],
            answer: "en",
            explain: "'En' reemplaza de + lieu (de la bibliothèque). Je reviens de... → j'en reviens.",
          },
          {
            scene: "Impératif affirmatif",
            lines: [["", "Tu dois aller à la poste! — D'accord, ___!"]],
            options: ["Vas-y", "Vais-y", "Y-va", "Va-y"],
            answer: "Vas-y",
            explain: "Impératif affirmatif: verbe + trait d'union + y. Aller → va + s devant y pour liaison: Vas-y.",
          },
          {
            scene: "Complément avec à (personne)",
            lines: [["", "Tu penses encore à Sophie? — Oui, je pense ___ tout le temps."]],
            options: ["à elle", "y", "en", "lui"],
            answer: "à elle",
            explain: "Y ne remplace pas les personnes avec penser à. Sophie = personne → pronom tonique à elle. Pas 'j'y pense'.",
          },
          {
            scene: "Négation avec en",
            lines: [["", "Vous avez du temps libre? — Non, nous ___ avons pas du tout."]],
            options: ["n'en", "n'y", "ne le", "ne la"],
            answer: "n'en",
            explain: "'En' reemplaza du + nom. Negación: nous n'en avons pas du tout = nous n'avons pas de temps libre du tout.",
          },
        ],
      },
      {
        id: "level-2",
        title: "Reemplaza con y y en",
        tag: "2 espacios",
        intro: "Completa las respuestas usando los pronombres y y en correctamente.",
        type: "dual",
        items: [
          {
            scene: "Vie au bureau",
            lines: [["Preguntas:", "Est-ce que tu vas souvent à la cafétéria? Tu y [[0]] souvent? Est-ce qu'il reste du café? Il [[1]] encore?"]],
            blanks: [
              { options: ["vas", "y vas", "vas y", "yas"], answer: "vas", explain: "Y est déjà dans la phrase: 'Tu y ___'. Solo falta el verbo: vas. J'y vais = je vais à la cafétéria." },
              { options: ["en reste", "reste en", "y reste", "en reste-t-il"], answer: "en reste", explain: "En reemplaza du café. Il en reste encore = il reste encore du café. En antes del verbo." },
            ],
          },
          {
            scene: "Conversation sur les voyages",
            lines: [["", "Tu es [[0]] à Tokyo? — Non, je n'[[1]] jamais allé(e)."]],
            blanks: [
              { options: ["déjà allé", "y allé", "allé y", "déjà y allé"], answer: "déjà allé", explain: "Pregunta directa sin pronom: Tu es déjà allé à Tokyo? La pregunta usa el lieu directamente." },
              { options: ["y suis", "en suis", "suis y", "y ai"], answer: "y suis", explain: "Y reemplaza à Tokyo. Je n'y suis jamais allé(e). Y avant l'auxiliaire être: je n'y suis jamais." },
            ],
          },
          {
            scene: "À la boulangerie",
            lines: [["", "Vous voulez de la baguette? — Oui, donnez-m'[[0]] deux s'il vous plaît. Et de la tarte? — Oui, j'[[1]] prendrai une part."]],
            blanks: [
              { options: ["en", "y", "en-", "y-"], answer: "en", explain: "Impératif affirmatif: donnez-m'en (de la baguette). En après l'impératif + quantité (deux reste explicite)." },
              { options: ["en", "y", "le", "la"], answer: "en", explain: "En reemplaza de la tarte. J'en prendrai une part: en avant le verbe conjugué (futur)." },
            ],
          },
          {
            scene: "Activités du week-end",
            lines: [["", "Tu penses à faire du sport ce week-end? — J'[[0]] pense, oui. Et tu as des projets? — J'[[1]] ai plein!"]],
            blanks: [
              { options: ["y", "en", "lui", "le"], answer: "y", explain: "Y remplace à + chose (à faire du sport). Je y pense = j'y pense. Y avant le verbe." },
              { options: ["en", "y", "les", "leur"], answer: "en", explain: "En remplace des + nom (des projets). J'en ai plein: plein = quantité, reste explicit." },
            ],
          },
        ],
      },
      {
        id: "level-3",
        title: "Conversación en la oficina",
        tag: "Texto guiado",
        intro: "Completa este diálogo reemplazando los complementos con y o en.",
        type: "guidedText",
        scene: "Luc y Camille hablan sobre el trabajo y los planes del equipo.",
        text: "Luc: Tu as assisté à la réunion d'hier? Camille: Oui, j'[[0]] ai assisté — c'était long! Luc: On a parlé du nouveau projet aussi. Camille: Ah oui, tu [[1]] as parlé? C'est bien. Et tu penses souvent à cette nouvelle stratégie? Luc: Oui, j'[[2]] pense constamment. C'est complexe. Camille: Il reste du temps avant la deadline? Luc: Il [[3]] reste peu — il faut se dépêcher! Camille: Est-ce qu'on va au séminaire vendredi? Luc: Oui, on [[4]] va tous ensemble. Camille: Bien. J'ai beaucoup de questions à poser. Luc: Moi aussi, j'[[5]] ai plein. Alors, prépare tes arguments et [[6]] réfléchis ce soir.",
        blanks: [
          { options: ["y", "en", "lui", "le"], answer: "y", explain: "Y remplace à + lieu/événement: à la réunion. J'y ai assisté = j'ai assisté à la réunion." },
          { options: ["en", "y", "lui", "le"], answer: "en", explain: "En remplace de + nom: du nouveau projet. Tu en as parlé = tu as parlé du projet." },
          { options: ["y", "en", "lui", "le"], answer: "y", explain: "Y remplace à + chose: à cette nouvelle stratégie. J'y pense = je pense à cette stratégie." },
          { options: ["en", "y", "lui", "le"], answer: "en", explain: "En remplace du + nom: du temps. Il en reste peu = il reste peu de temps. Peu = quantité explicite." },
          { options: ["y", "en", "lui", "le"], answer: "y", explain: "Y remplace lieu: au séminaire. On y va = on va au séminaire." },
          { options: ["en", "y", "les", "leur"], answer: "en", explain: "En remplace des + nom: des questions. J'en ai plein = j'ai plein de questions. Plein = quantité." },
          { options: ["y", "en", "les", "leur"], answer: "y", explain: "Y impératif affirmatif: réfléchis-y (piénsalo). Pero aquí sin trait d'union en texto: réfléchis-y. Y remplace à ça (à tes arguments)." },
        ],
      },
      {
        id: "level-4",
        title: "Reemplaza los complementos",
        tag: "Texto libre",
        intro: "Escribe la respuesta reemplazando el complemento subrayado con y o en.",
        type: "freeText",
        scene: "Sustituye el complemento de cada pregunta con el pronombre correcto.",
        text: "1. Tu vas à la gym ce soir? → Oui, j'[[0]] ce soir. / 2. Tu penses à ta retraite? → Oui, j'[[1]] souvent. / 3. Il reste de la soupe? → Oui, il [[2]] encore. / 4. Vous revenez de Lyon? → Oui, on [[3]] ce matin. / 5. Tu as des amis à Paris? → Oui, j'[[4]] quelques-uns.",
        blanks: [
          { answer: "y vais", accepted: ["y vais"], explain: "Y remplace à la gym. J'y vais ce soir = je vais à la gym ce soir." },
          { answer: "y pense", accepted: ["y pense"], explain: "Y remplace à + chose: à ta retraite. J'y pense souvent = je pense souvent à ma retraite." },
          { answer: "en reste", accepted: ["en reste"], explain: "En remplace de la + nom: de la soupe. Il en reste encore = il reste encore de la soupe." },
          { answer: "en revient", accepted: ["en revient", "en revenons"], explain: "En remplace de + lieu: de Lyon. On en revient ce matin = on revient de Lyon ce matin." },
          { answer: "en ai", accepted: ["en ai"], explain: "En remplace des + nom: des amis. J'en ai quelques-uns = j'ai quelques amis. Quantité (quelques-uns) reste." },
        ],
      },
      {
        id: "level-5",
        title: "Producción: usa y y en naturalmente",
        tag: "Producción",
        intro: "Escribe respuestas completas usando y o en.",
        type: "write",
        items: [
          {
            scene: "Hablas de tus hábitos",
            prompt: "Alguien te pregunta si vas a menudo al mercado. Responde afirmativamente con 'y'.",
            answer: "Oui, j'y vais chaque samedi matin — j'adore les marchés locaux.",
            accepted: ["j'y vais", "y vais"],
            explain: "'Y' remplace au marché. J'y vais = je vais au marché. Position: y avant le verbe conjugué.",
          },
          {
            scene: "Cantidad de libros",
            prompt: "Alguien te pregunta cuántos libros has leído este año. Responde con 'en' y la cantidad.",
            answer: "J'en ai lu une dizaine — j'essaie de lire au moins un par mois.",
            accepted: ["j'en ai lu", "en ai lu"],
            explain: "'En' remplace des livres. J'en ai lu une dizaine = j'ai lu une dizaine de livres. La quantité reste explicite.",
          },
          {
            scene: "Impératif avec y",
            prompt: "Un amigo duda si ir a la fiesta. Anímale con el impératif usando 'y'.",
            answer: "Vas-y! Tu vas t'amuser, j'en suis sûr!",
            accepted: ["Vas-y", "Vas-y!"],
            explain: "Impératif affirmatif: verbe + -y. Aller → vas + y → Vas-y (avec -s pour la liaison). J'en suis sûr: en remplace de ça.",
          },
          {
            scene: "Pensar en algo",
            prompt: "Alguien te pregunta si piensas en el examen de mañana. Responde con 'y'.",
            answer: "Oui, j'y pense depuis ce matin — j'espère que tout ira bien.",
            accepted: ["j'y pense", "y pense"],
            explain: "'Y' remplace à + chose: à l'examen. J'y pense = je pense à l'examen. Y pas pour personnes.",
          },
        ],
      },
      {
        id: "level-6",
        title: "Misión: conversación fluida",
        tag: "Producción libre",
        intro: "Escribe 3 pares de pregunta-respuesta usando y y en de forma natural.",
        type: "write",
        items: [
          {
            scene: "Pregunta sobre un lugar",
            prompt: "Escribe una pregunta sobre ir a un lugar y una respuesta usando 'y'.",
            answer: "Tu vas souvent au cinéma? — Non, je n'y vais que rarement — c'est trop cher.",
            accepted: ["n'y vais", "j'y vais", "y aller"],
            explain: "'Y' remplace au cinéma. Je n'y vais que rarement = ne...que (restriction) avec y. Position: n'y vais (y entre ne et verbe).",
          },
          {
            scene: "Pregunta sobre cantidad",
            prompt: "Pregunta sobre cuántos idiomas habla alguien y responde con 'en' y la cantidad.",
            answer: "Tu parles combien de langues? — J'en parle trois: français, espagnol et anglais.",
            accepted: ["j'en parle", "en parle trois"],
            explain: "'En' remplace des langues. J'en parle trois: la quantité (trois) reste explicite après le verbe.",
          },
          {
            scene: "Impératif négatif avec en",
            prompt: "Aconseja a alguien que no tome demasiado azúcar. Usa el impératif négatif con 'en'.",
            answer: "N'en prends pas trop — le sucre en excès est mauvais pour la santé!",
            accepted: ["N'en prends pas", "n'en mange pas"],
            explain: "Impératif négatif: ne + en + verbe + pas. N'en prends pas = ne prends pas de sucre. Y et en restent avant le verbe à l'impératif négatif.",
          },
        ],
      },
    ],
  },
}

export default topic
