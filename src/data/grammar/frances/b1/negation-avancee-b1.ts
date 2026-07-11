import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'negation-avancee-b1',
  order: '11',
  color: '#2563eb',
  category: 'Negación',
  level: 'B1',
  title: 'La Négation Avancée en Francés B1',
  shortTitle: 'Négation Avancée',
  metaTitle: 'Négation Avancée B1 — Ne...plus, jamais, rien, personne, que en francés',
  description:
    "Más allá de ne...pas, el francés tiene un rico sistema de negaciones: ne...plus (ya no), ne...jamais (nunca), ne...rien (nada), ne...personne (nadie), ne...que (solo), ne...ni...ni (ni...ni). Cada negación tiene su posición específica y altera las contracciones del artículo, convirtiendo du/de la/des en 'de' tras la negación.",
  lead: "Domina las negaciones avanzadas del francés: ya no, nunca, nada, nadie, solo, ni...ni — con sus reglas de posición y los cambios de artículo.",
  outcomes: [
    "Usas ne...plus, ne...jamais, ne...rien, ne...personne en oraciones simples y compuestas",
    "Aplicas ne...que para expresar restricción ('solo')",
    "Cambias du/de la/des a 'de' tras la negación",
    "Colocas 'personne' y 'rien' correctamente en tiempos compuestos",
  ],

  guide: {
    goal: "Expresar negaciones específicas (nunca, nada, nadie, ya no, solo) con la estructura y posición correctas.",
    model: "Je ne mange plus de viande. / Elle n'a jamais voyagé en Asie. / Il ne fait que travailler.",
    formula: "ne + verbo + pas/plus/jamais/rien/que | ne + verbo + personne (après participe)",
    decisions: [
      "ne...pas: negación básica. 'Je ne comprends pas.'",
      "ne...plus: ya no. 'Je ne fume plus.' (Antes fumaba, ahora no.)",
      "ne...jamais: nunca. 'Il n'est jamais en retard.' (No late, nunca.)",
      "ne...rien: nada. 'Elle ne dit rien.' / 'Elle n'a rien dit.' (Rien avant le participe.)",
      "ne...personne: nadie. 'Il ne connaît personne.' / 'Il n'a vu personne.' (Personne après le participe.)",
      "ne...que: solo, únicamente. 'Je n'ai qu'un frère.' (Que est une restriction, pas une vraie négation.)",
      "Article après négation: du/de la/des → de. 'Je mange du pain' → 'Je ne mange pas de pain.' Exception: ne...que conserva l'article normal.",
    ],
    table: [
      ["Négation", "Posición", "Ejemplo"],
      ["ne...plus", "encadre le verbe", "Je ne mange plus de fromage."],
      ["ne...rien", "rien avant participe passé", "Il n'a rien mangé."],
      ["ne...personne", "personne après participe", "Elle n'a vu personne."],
    ],
    mistakes: [
      "\"Je ne mange pas du pain\" ❌ après négation: \"Je ne mange pas de pain\" ✓ (du → de).",
      "\"Il n'a personne vu\" ❌ — personne va después del participio: \"Il n'a vu personne\" ✓.",
      "\"Je ne fais que de travailler\" ❌ — ne...que ne change pas l'article: \"Je ne fais que travailler\" ✓.",
    ],
  },

  seo: [
    {
      heading: "Las negaciones avanzadas del francés: más allá de ne...pas",
      paragraphs: [
        "El francés tiene un sistema rico de negaciones. Además de la básica 'ne...pas', encontramos: ne...plus (ya no: antes era así, ahora no), ne...jamais (nunca: ni antes ni ahora), ne...rien (nada: ninguna cosa), ne...personne (nadie: ninguna persona), ne...que (solo, únicamente: restricción), ne...ni...ni (ni...ni: exclusión doble). Cada una aporta un matiz específico que no puede expresarse con ne...pas.",
        "La estructura básica encuadra el verbo entre 'ne' y la segunda parte: 'Je ne comprends rien' (ne...rien alrededor de comprends). En los tiempos compuestos, 'rien' y 'plus' y 'jamais' van entre el auxiliar y el participio: 'Il n'a rien compris', 'Elle n'a jamais voyagé'. Pero 'personne' es la excepción: siempre va después del participio pasado: 'Il n'a vu personne'.",
      ],
    },
    {
      heading: "El artículo tras la negación: du/de la/des → de",
      paragraphs: [
        "Después de una negación (ne...pas, ne...plus, ne...jamais, ne...rien), los artículos partitivos y los artículos indefinidos plurales cambian: du → de, de la → de, des → de. Ejemplos: 'Je bois du café' → 'Je ne bois pas de café'; 'Il mange des fruits' → 'Il ne mange plus de fruits'; 'Elle a de la patience' → 'Elle n'a aucune patience'. Esta regla es obligatoria y muy marcada estilísticamente si se omite.",
        "Importante excepción: ne...que no causa este cambio de artículo, porque no es una verdadera negación sino una restricción. 'Je ne mange que du fromage' (Solo como queso) — el artículo partitif 'du' se mantiene. Tampoco cambia el artículo definido (le, la, les): 'Je n'aime pas le fromage' — el artículo definido permanece igual tras la negación.",
      ],
      table: [
        ["Artículo original", "Tras negación", "Excepción ne...que"],
        ["du / de la", "de", "se mantiene du/de la"],
        ["des (pl. indef.)", "de", "se mantiene des"],
        ["le / la / les", "le / la / les", "siempre se mantiene"],
      ],
    },
    {
      heading: "Ne...que: la restricción que no es negación",
      paragraphs: [
        "Ne...que significa 'solo/solamente' y expresa restricción, no negación verdadera. Su estructura coloca 'que' directamente antes del elemento restringido, no del verbo: 'Il ne travaille que le soir' (Solo trabaja por la tarde). 'Je n'ai qu'une seule chance' (Solo tengo una oportunidad). 'Elle ne parle qu'à ses amis proches' (Solo habla con sus amigos cercanos).",
        "Ne...que puede substituirse por 'seulement' sin cambiar el sentido: 'Il travaille seulement le soir'. Sin embargo, ne...que es más literario y enfático. En conversación coloquial, se usa mucho 'seulement' o incluso se omite 'ne': 'J'ai qu'une chance!' (lengua oral). En el nivel B1, es importante dominar la forma escrita completa con ne.",
      ],
    },
  ],

  visual: {
    mode: "scene",
    teacherLens: "Las negaciones avanzadas del francés: ne...plus, jamais, rien, personne, que — cada una con su posición específica y cambios de artículo.",
    graphicPrompt: "Tabla visual con cada negación, su posición en la frase y un ejemplo ilustrativo.",
    scene: [
      ["Je ne fume plus — j'ai arrêté l'année dernière.", "Ya no fumo — lo dejé el año pasado."],
      ["Elle n'a jamais mangé de sushi de sa vie.", "Ella nunca ha comido sushi en su vida."],
      ["Il ne dit rien quand il est contrarié.", "No dice nada cuando está molesto."],
      ["Je n'ai vu personne dans la rue à cette heure-là.", "No vi a nadie en la calle a esa hora."],
      ["Elle ne boit que de l'eau — pas d'alcool du tout.", "Solo bebe agua — nada de alcohol."],
      ["Ils n'ont ni le temps ni l'argent pour voyager.", "No tienen ni el tiempo ni el dinero para viajar."],
      ["Je ne mange plus de viande depuis six mois.", "Ya no como carne desde hace seis meses."],
      ["Il n'a rien compris à cette explication compliquée.", "No entendió nada de esa explicación complicada."],
    ],
    learnerModes: ["reading", "typing", "choosing"],
    reviewFocus: ["ne...plus/jamais/rien/personne/que", "posición en temps composés", "du/des → de tras negación"],
  },

  practice: {
    levels: [
      {
        id: "level-1",
        title: "Identifica la negación correcta",
        tag: "Opción múltiple",
        intro: "Elige la negación que corresponde al significado indicado entre paréntesis.",
        type: "choice",
        items: [
          {
            scene: "Cambio de hábitos",
            lines: [["", "Depuis janvier, il ___ mange ___ de fast-food. (ya no)"]],
            options: ["ne / plus", "ne / jamais", "ne / pas", "ne / rien"],
            answer: "ne / plus",
            explain: "'Ya no' = ne...plus. Indica un cambio: antes sí comía fast-food, ahora no.",
          },
          {
            scene: "Experiencias de vida",
            lines: [["", "Elle ___ a ___ visité l'Australie. (nunca)"]],
            options: ["n' / jamais", "n' / plus", "n' / pas encore", "ne / rien"],
            answer: "n' / jamais",
            explain: "'Nunca' = ne...jamais. En temps composé: n'a jamais + participe. El auxiliar va entre 'n'' y 'jamais'.",
          },
          {
            scene: "Silencio total",
            lines: [["", "Il a assisté à toute la réunion et ___ a ___ dit. (nada)"]],
            options: ["n' / rien", "ne / pas", "n' / jamais", "ne / que"],
            answer: "n' / rien",
            explain: "'Nada' = ne...rien. En temps composé: n'a rien dit. 'Rien' va entre el auxiliar y el participio.",
          },
          {
            scene: "Lugar vacío",
            lines: [["", "J'ai cherché partout mais je ___ ai vu ___. (nadie)"]],
            options: ["n' / personne", "n' / rien", "ne / pas", "n' / jamais"],
            answer: "n' / personne",
            explain: "'Nadie' = ne...personne. En temps composé: personne va DESPUÉS del participio: n'ai vu personne.",
          },
          {
            scene: "Restricción",
            lines: [["", "Elle ___ parle ___ à ses collègues les plus proches. (solo)"]],
            options: ["ne / qu'", "ne / que", "n' / que", "ne / pas que"],
            answer: "n' / qu'",
            explain: "'Solo' = ne...que. Antes de vocal (à), 'que' se elide en 'qu'': ne parle qu'à ses collègues.",
          },
          {
            scene: "Artículo tras negación",
            lines: [["", "Depuis qu'il est végétarien, il ne mange plus ___ viande."]],
            options: ["de", "de la", "la", "du"],
            answer: "de",
            explain: "Tras ne...plus, el artículo partitif de la → de. 'Il ne mange plus de viande' (no 'de la viande').",
          },
          {
            scene: "Doble negación",
            lines: [["", "Je n'ai ___ le temps ___ l'énergie pour ça en ce moment."]],
            options: ["ni / ni", "pas / pas", "ni / pas", "pas / ni"],
            answer: "ni / ni",
            explain: "Ne...ni...ni: neither...nor. Excluye dos elementos. Los artículos se omiten: ni le temps ni l'énergie (se mantiene el art. défini).",
          },
          {
            scene: "Ne...que (posición)",
            lines: [["", "Il ne travaille ___ le week-end — les autres jours, il est libre."]],
            options: ["que", "pas que", "qu'", "jamais que"],
            answer: "que",
            explain: "Ne...que antes de un elemento consonántico: que (no qu'). Que se coloca directamente antes del elemento restringido: que le week-end.",
          },
        ],
      },
      {
        id: "level-2",
        title: "Transforma a negativo",
        tag: "2 espacios",
        intro: "Completa las dos partes de la negación en cada oración.",
        type: "dual",
        items: [
          {
            scene: "Dieta vegetariana",
            lines: [["", "Depuis un an, Marc [[0]] boit [[1]] de café."]],
            blanks: [
              { options: ["ne", "n'", "pas", "ni"], answer: "ne", explain: "La negación comienza con 'ne' antes del verbo. 'Boit' comienza con consonante: ne (no n')." },
              { options: ["plus", "jamais", "rien", "pas"], answer: "plus", explain: "'Ya no' = ne...plus. Indica cambio de hábito. Ne boit plus de café = ya no bebe café." },
            ],
          },
          {
            scene: "Conversación sobre viajes",
            lines: [["", "Tu as [[0]] visité le Japon? — Non, je [[1]] ai jamais eu l'occasion."]],
            blanks: [
              { options: ["déjà", "jamais", "encore", "plus"], answer: "déjà", explain: "'¿Has visitado ya...?' — 'déjà' en la pregunta afirmativa. Déjà en pregunta vs jamais en respuesta negativa." },
              { options: ["n'", "ne", "pas", "ni"], answer: "n'", explain: "Ante vocal: n' + ai jamais. Je n'ai jamais eu = nunca he tenido. N' se usa ante vocal (ai empieza por 'a')." },
            ],
          },
          {
            scene: "Situación de apuro",
            lines: [["", "Je [[0]] comprends [[1]] — tu peux m'expliquer?"]],
            blanks: [
              { options: ["ne", "n'", "pas", "ni"], answer: "ne", explain: "'Comprends' empieza con consonante: ne (no n'). La negación básica: ne + verbo + pas/rien/..." },
              { options: ["rien", "pas", "personne", "jamais"], answer: "rien", explain: "'Nada' = rien. Ne comprends rien = no entiendo nada. Rien va después del verbo en presente." },
            ],
          },
          {
            scene: "Lugar desierto",
            lines: [["", "On a cherché dans tout l'immeuble mais on [[0]] a trouvé [[1]]."]],
            blanks: [
              { options: ["n'", "ne", "pas", "ni"], answer: "n'", explain: "Ante vocal: n' + a (auxiliar). On n'a trouvé personne = no encontramos a nadie." },
              { options: ["personne", "rien", "jamais", "plus"], answer: "personne", explain: "'Nadie' = personne. En temps composé: personne va APRÈS le participe passé: n'a trouvé personne." },
            ],
          },
        ],
      },
      {
        id: "level-3",
        title: "Diálogo con negaciones",
        tag: "Texto guiado",
        intro: "Completa este diálogo sobre cambios de vida usando las negaciones correctas.",
        type: "guidedText",
        scene: "Lucas ha cambiado mucho su estilo de vida. Su amiga Sophie le hace preguntas.",
        text: "Sophie: Tu as l'air en forme! Tu fumes encore? Lucas: Non, je [[0]] fume [[1]] — j'ai arrêté il y a six mois. Sophie: Et tu bois toujours autant? Lucas: Pas du tout. Je [[0]] bois [[2]] d'alcool maintenant. Sophie: C'est incroyable! Tu as vu tes anciens amis? Lucas: Non, je [[3]] ai vu [[4]] depuis ma transformation. Sophie: Tu veux qu'on aille au restaurant? Lucas: Je [[5]] mange [[6]] dans les fast-foods. Mais une bonne brasserie, pourquoi pas? Sophie: Tu as vraiment changé! Il te reste [[7]] tes habitudes d'avant?",
        blanks: [
          { options: ["ne", "n'", "pas", "ni"], answer: "ne", explain: "Negación antes de 'fume' (consonante): ne. Je ne fume plus." },
          { options: ["plus", "jamais", "pas", "rien"], answer: "plus", explain: "'Ya no' = ne...plus. Indica que antes fumaba y ahora ha parado." },
          { options: ["plus", "jamais", "pas", "rien"], answer: "plus", explain: "'Ya no' otra vez: je ne bois plus d'alcool. Du/de la → de tras negación: plus d'alcool." },
          { options: ["n'", "ne", "pas", "ni"], answer: "n'", explain: "Ante vocal (ai): n'. Je n'ai vu personne." },
          { options: ["personne", "rien", "jamais", "plus"], answer: "personne", explain: "'Nadie' = personne. En temps composé, personne va APRÈS el participio: n'ai vu personne." },
          { options: ["ne", "n'", "pas", "ni"], answer: "ne", explain: "Negación antes de 'mange' (consonante): ne. Je ne mange plus..." },
          { options: ["plus", "que", "jamais", "rien"], answer: "plus", explain: "'Ya no' = ne...plus. Ne mange plus dans les fast-foods = ya no como en fast-foods." },
          { options: ["ne", "n'", "plus", "que"], answer: "ne", explain: "Ne...que: ¿te queda solo...? Il te reste ne...que. Aquí empieza la estructura restrictiva." },
        ],
      },
      {
        id: "level-4",
        title: "Niega estas oraciones",
        tag: "Texto libre",
        intro: "Transforma cada oración usando la negación indicada entre paréntesis.",
        type: "freeText",
        scene: "Escribe las formas negativas correctas.",
        text: "Je mange du fromage. → Je [[0]] de fromage. (ne...plus) / Elle a rencontré quelqu'un d'intéressant. → Elle [[1]] d'intéressant. (ne...rien) / Il connaît tout le monde. → Il [[2]]. (ne...personne) / Ils ont vu quelqu'un. → Ils [[3]]. (ne...personne) / J'ai un seul objectif. → Je [[4]] gagner. (ne...que)",
        blanks: [
          { answer: "ne mange plus", accepted: ["ne mange plus de fromage", "ne mange plus"], explain: "Ne...plus: je ne mange plus de fromage. Du → de tras la negación." },
          { answer: "n'a rien trouvé", accepted: ["n'a rien trouvé", "n'a rien rencontré"], explain: "Ne...rien en temps composé: rien antes del participio. Elle n'a rien trouvé de (rien + de + adjectif)." },
          { answer: "ne connaît personne", accepted: ["ne connaît personne"], explain: "Ne...personne: il ne connaît personne. Personne al final, después del verbo." },
          { answer: "n'ont vu personne", accepted: ["n'ont vu personne", "n'ont vue personne"], explain: "Ne...personne en temps composé: personne APRÈS le participe. Ils n'ont vu personne." },
          { answer: "ne veux que", accepted: ["n'ai qu'un objectif", "ne veux que", "ne cherche qu'à"], explain: "Ne...que: restricción. Je ne veux que gagner = solo quiero ganar. Que directamente antes del elemento restringido." },
        ],
      },
      {
        id: "level-5",
        title: "Producción: expresa negaciones precisas",
        tag: "Producción",
        intro: "Escribe oraciones completas usando la negación indicada.",
        type: "write",
        items: [
          {
            scene: "Ya no hace algo",
            prompt: "Describe un cambio de hábito: antes bebías café, ahora ya no. Usa ne...plus.",
            answer: "Je ne bois plus de café depuis que j'ai des problèmes de sommeil.",
            accepted: ["ne bois plus de café", "ne mange plus", "ne fais plus"],
            explain: "Ne...plus: indica cambio. Du café → de café tras la negación. Depuis que marque el inicio del cambio.",
          },
          {
            scene: "No vio a nadie",
            prompt: "Alguien llegó a la fiesta pero no vio a nadie. Usa ne...personne en passé composé.",
            answer: "Je suis arrivé à la fête mais je n'ai vu personne.",
            accepted: ["n'ai vu personne", "n'avait vu personne"],
            explain: "Ne...personne en temps composé: personne APRÈS le participe passé. N'ai vu personne.",
          },
          {
            scene: "Solo come una cosa",
            prompt: "Escribe que solo comes verduras usando ne...que.",
            answer: "Je ne mange que des légumes — je suis végétarien.",
            accepted: ["ne mange que des légumes", "ne mange que de", "ne mange que"],
            explain: "Ne...que: restricción. Des légumes se mantiene (ne...que no cambia el artículo). Que se coloca antes del elemento restringido.",
          },
          {
            scene: "Ni...ni",
            prompt: "Escribe que no tienes ni tiempo ni dinero para las vacaciones.",
            answer: "Je n'ai ni le temps ni l'argent pour partir en vacances.",
            accepted: ["n'ai ni le temps ni l'argent", "ni temps ni argent"],
            explain: "Ne...ni...ni: excluye dos elementos. Los artículos définis (le, l') se mantienen tras ni...ni.",
          },
        ],
      },
      {
        id: "level-6",
        title: "Misión: carta de cambios",
        tag: "Producción libre",
        intro: "Escribe 3 oraciones sobre cambios en tu vida o en la vida de alguien, usando negaciones diferentes.",
        type: "write",
        items: [
          {
            scene: "Cambio de estilo de vida",
            prompt: "Usa ne...plus para describir algo que alguien ya no hace desde que cambió de trabajo.",
            answer: "Depuis qu'il a changé de travail, il ne rentre plus tard le soir.",
            accepted: ["ne rentre plus", "ne travaille plus", "ne fait plus"],
            explain: "Ne...plus indica ruptura con el pasado. Depuis que + passé composé + ne...plus en presente.",
          },
          {
            scene: "Experiencia nunca vivida",
            prompt: "Escribe sobre algo que alguien nunca ha hecho usando ne...jamais en passé composé.",
            answer: "Elle n'a jamais pris l'avion — elle a toujours voyagé en train.",
            accepted: ["n'a jamais", "n'avais jamais"],
            explain: "Ne...jamais en temps composé: n'a jamais + participe. Jamais entre el auxiliar y el participio.",
          },
          {
            scene: "Una sola cosa importa",
            prompt: "Escribe que alguien solo piensa en su trabajo usando ne...que.",
            answer: "Il ne pense qu'à son travail — c'est devenu une obsession.",
            accepted: ["ne pense qu'à", "ne fait que travailler"],
            explain: "Ne...que: que antes del elemento restringido. Penser à: ne pense qu'à son travail.",
          },
        ],
      },
    ],
  },
}

export default topic
