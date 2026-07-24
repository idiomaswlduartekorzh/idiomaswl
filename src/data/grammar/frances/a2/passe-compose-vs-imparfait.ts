import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'passe-compose-vs-imparfait',
  order: '04',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A2',
  title: "Passé composé vs. Imparfait — acción vs. contexto",
  shortTitle: "PC vs. Imparfait",
  metaTitle: "Passé composé vs imparfait en français A2 — action vs contexte: j'ai mangé / je mangeais",
  description: "El passé composé expresa acciones concretas, terminadas y con límites claros en el tiempo. El imparfait describe el contexto, las circunstancias, los hábitos o los estados duraderos. Aprender a combinarlos es clave para narrar en francés.",
  lead: "Il faisait nuit quand j'ai entendu un bruit. El imparfait pinta el escenario — il faisait nuit — y el passé composé introduce la acción — j'ai entendu. Domina esta combinación y tu francés sonará natural.",

  outcomes: [
    "Distinguir las funciones del passé composé (acción puntual y terminada) y del imparfait (contexto, descripción, hábito).",
    "Combinar ambos tiempos en una narración coherente.",
    "Reconocer los marcadores temporales asociados a cada tiempo: hier, soudain (PC) vs. toujours, souvent, d'habitude (imparfait).",
    "Producir frases narrativas que alternen passé composé e imparfait correctamente.",
  ],

  guide: {
    goal: "Narrar en el pasado usando el passé composé para acciones y el imparfait para el contexto.",
    model: "Il pleuvait quand je suis sorti. / D'habitude, je prenais le bus, mais hier j'ai pris un taxi.",
    formula: "Imparfait (escenario/hábito) + Passé composé (acción/cambio/evento)",
    decisions: [
      "Passé composé = acción puntual terminada: J'ai mangé une pizza. / Il a appelé. / Nous sommes partis.",
      "Imparfait = descripción/estado: Il faisait beau. / J'étais fatigué. / Il y avait du monde.",
      "Imparfait = hábito o acción repetida: Je lisais chaque soir. / Nous allions souvent au cinéma.",
      "Los dos juntos: imparfait = fondo + PC = acción que interrumpe: Je dormais quand le téléphone a sonné.",
      "Señales del PC: hier, ce matin, soudain, tout à coup, une fois, d'abord... ensuite... enfin.",
      "Señales del imparfait: toujours, souvent, d'habitude, tous les jours, quand j'étais jeune.",
    ],
    table: [
      ["Criterio", "Passé composé", "Imparfait"],
      ["Tipo de acción", "Puntual y terminada", "Continua o repetida"],
      ["Función narrativa", "Acción / Evento", "Contexto / Descripción"],
      ["Marcadores típicos", "hier, soudain, une fois", "toujours, souvent, d'habitude"],
    ],
    mistakes: [
      "\"Il faisait beau quand je suis sorti\" ✓ — pero \"Il a fait beau quand je sortais\" ❌: el clima es el contexto (imparfait), la salida es la acción (PC).",
      "\"D'habitude, j'allais au bureau\" ✓ — pero \"D'habitude, je suis allé au bureau\" ❌: d'habitude indica hábito → imparfait.",
      "\"Soudain, il a crié\" ✓ — pero \"Soudain, il criait\" ❌: soudain introduce un evento puntual → passé composé.",
    ],
  },

  seo: [
    {
      heading: "Passé composé vs. imparfait: la clave para narrar en francés",
      paragraphs: [
        "Uno de los mayores retos para los hispanohablantes al aprender francés es elegir entre el passé composé y el imparfait. En español, la distinción entre pretérito perfecto/indefinido e imperfecto existe, pero no siempre coincide con la francesa. En francés, la elección depende del rol que juega cada acción en la narración.",
        "El passé composé es el tiempo de la acción: algo ocurrió, tuvo un inicio y un fin, y avanzó la historia. El imparfait es el tiempo del escenario: describe cómo eran las cosas, qué se hacía habitualmente, cuál era el estado del mundo en ese momento.",
      ],
    },
    {
      heading: "La regla del fondo y la figura: cómo combinar los dos tiempos",
      paragraphs: [
        "Imagina una película: el imparfait es el fondo (la música ambiente, la lluvia, el escenario), y el passé composé es la figura (la acción que ocurre sobre ese fondo). Il pleuvait (imparfait = escenario) quand je suis entré dans le café (passé composé = acción). Cuando dominas esta imagen mental, la elección se vuelve intuitiva.",
        "Los marcadores temporales son tus aliados. 'Toujours', 'souvent', 'd'habitude', 'tous les jours', 'chaque soir' → imparfait. 'Hier', 'ce matin', 'soudain', 'tout à coup', 'd'abord... ensuite... enfin' → passé composé. Aprende estos marcadores y la gramática se vuelve predecible.",
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: "PC = acción puntual (pincelada). Imparfait = fondo continuo (telón). Combinados: imparfait da el contexto, PC introduce el evento.",
    graphicPrompt: "Lienzo con fondo de acuarela suave (imparfait): 'Il pleuvait, il faisait nuit'. Sobre el fondo, un punto vivo rojo (passé composé): 'J'ai entendu un bruit'.",
    scene: [
      ["Il faisait nuit quand je suis rentré.", "Era de noche cuando volví a casa."],
      ["D'habitude, je prenais le bus, mais hier j'ai pris un taxi.", "Normalmente tomaba el bus, pero ayer tomé un taxi."],
      ["Je lisais quand le téléphone a sonné.", "Estaba leyendo cuando sonó el teléfono."],
      ["Il y avait beaucoup de monde. Soudain, quelqu'un a crié.", "Había mucha gente. De repente, alguien gritó."],
      ["Quand j'étais enfant, j'adorais le chocolat.", "Cuando era niño(a), me encantaba el chocolate."],
    ],
    learnerModes: ["reading", "choosing", "typing"],
    reviewFocus: ["PC = acción puntual", "imparfait = contexto/hábito", "marcadores temporales"],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: "PC o imparfait: elegir el tiempo correcto",
        tag: "Opción múltiple",
        intro: "Elige el tiempo correcto: passé composé o imparfait, según el contexto.",
        type: 'choice',
        items: [
          {
            scene: "Descripción del tiempo",
            lines: [["Paul", "Hier, il ___ très froid."]],
            options: ["faisait", "a fait", "fait", "fera"],
            answer: "faisait",
            explain: "Descripción del clima = imparfait: il faisait froid.",
          },
          {
            scene: "Acción puntual",
            lines: [["Ana", "Soudain, elle ___ et elle est sortie."]],
            options: ["s'est levée", "se levait", "se lève", "se lèvera"],
            answer: "s'est levée",
            explain: "Soudain + acción puntual = passé composé: elle s'est levée.",
          },
          {
            scene: "Hábito pasado",
            lines: [["Grand-mère", "Quand j'étais jeune, je ___ tous les matins."]],
            options: ["courais", "ai couru", "cours", "courrai"],
            answer: "courais",
            explain: "Hábito pasado + quand j'étais jeune = imparfait: je courais.",
          },
          {
            scene: "La interrupción",
            lines: [["Lucie", "Je ___ quand mon ami a appelé."]],
            options: ["dormais", "ai dormi", "dors", "dormirai"],
            answer: "dormais",
            explain: "Acción continua interrumpida = imparfait: je dormais (fondo). L'appel = PC (acción).",
          },
          {
            scene: "El evento de ayer",
            lines: [["Marco", "Hier matin, j'___ mon café et j'___ mon ami."]],
            options: ["ai pris / ai appelé", "prenais / appelais", "prends / appelle", "prendrai / appellerai"],
            answer: "ai pris / ai appelé",
            explain: "Hier + acciones secuenciales puntuales = passé composé: j'ai pris, j'ai appelé.",
          },
          {
            scene: "El marcador d'habitude",
            lines: [["Sofia", "D'habitude, nous ___ ensemble le vendredi."]],
            options: ["dînions", "avons dîné", "dînons", "dînerons"],
            answer: "dînions",
            explain: "D'habitude = hábito → imparfait: nous dînions.",
          },
        ],
      },
      {
        id: 'l2',
        title: "Fondo y figura",
        tag: "2 espacios",
        intro: "Elige el imparfait para el fondo y el passé composé para la acción.",
        type: 'dual',
        items: [
          {
            scene: "Una noche de lluvia",
            lines: [["Narrateur", "Il [[0]] quand nous [[1]] chez Marie."]],
            blanks: [
              { options: ["pleuvait", "a plu", "pleut"], answer: "pleuvait", explain: "Il pleuvait = contexto (imparfait)." },
              { options: ["sommes arrivés", "arrivions", "arrivons"], answer: "sommes arrivés", explain: "Acción puntual = passé composé: nous sommes arrivés." },
            ],
          },
          {
            scene: "El accidente",
            lines: [["Lucas", "Je [[0]] vite quand soudain une voiture [[1]]."]],
            blanks: [
              { options: ["conduisais", "ai conduit", "conduis"], answer: "conduisais", explain: "Acción continua = imparfait: je conduisais (fondo)." },
              { options: ["a freiné", "freinait", "freine"], answer: "a freiné", explain: "Evento puntual con soudain = passé composé: a freiné." },
            ],
          },
          {
            scene: "La rutina rota",
            lines: [["Kim", "D'habitude, je [[0]] au bureau, mais hier je [[1]] chez moi."]],
            blanks: [
              { options: ["travaillais", "ai travaillé", "travaille"], answer: "travaillais", explain: "D'habitude = hábito → imparfait: je travaillais." },
              { options: ["ai travaillé", "travaillais", "travaillerai"], answer: "ai travaillé", explain: "Hier = excepción puntual → passé composé: j'ai travaillé." },
            ],
          },
          {
            scene: "El hallazgo",
            lines: [["Chercheuse", "Je [[0]] des documents quand je [[1]] quelque chose d'étrange."]],
            blanks: [
              { options: ["lisais", "ai lu", "lis"], answer: "lisais", explain: "Acción continua como fondo = imparfait: je lisais." },
              { options: ["ai trouvé", "trouvais", "trouve"], answer: "ai trouvé", explain: "Descubrimiento puntual = passé composé: j'ai trouvé." },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: "Una noche inesperada",
        tag: "Texto guiado",
        intro: "Elige el tiempo verbal correcto para completar esta narración.",
        type: 'guidedText',
        scene: "Pierre narra una noche extraña",
        text: "Il [[0]] nuit et il faisait froid. Je [[1]] dans mon fauteuil quand soudain j'[[2]] un bruit dehors. Je [[3]] à la fenêtre. C'[[4]] mon chat qui jouait avec une feuille!",
        blanks: [
          { options: ["faisait", "a fait", "fait"], answer: "faisait", explain: "Descripción nocturna = imparfait: il faisait nuit." },
          { options: ["lisais", "ai lu", "lis"], answer: "lisais", explain: "Acción continua como fondo = imparfait: je lisais." },
          { options: ["ai entendu", "entendais", "entends"], answer: "ai entendu", explain: "Soudain + evento puntual = passé composé: j'ai entendu." },
          { options: ["me suis levé", "me levais", "me lève"], answer: "me suis levé", explain: "Acción puntual secuencial = passé composé: je me suis levé." },
          { options: ["était", "a été", "est"], answer: "était", explain: "Descripción del estado = imparfait: c'était." },
        ],
      },
      {
        id: 'l4',
        title: "El recuerdo de Léa",
        tag: "Texto libre",
        intro: "Escribe el tiempo verbal correcto sin ayuda de opciones.",
        type: 'freeText',
        scene: "Léa cuenta un recuerdo de sus vacaciones",
        text: "L'été dernier, nous [[0]] en Espagne. Il [[1]] très chaud. Un soir, nous [[2]] une promenade sur la plage. Soudain, on [[3]] un concert au loin. C'[[4]] magnifique!",
        blanks: [
          { answer: "étions", accepted: ["étions"], explain: "Essere en imparfait (descripción dónde estaban): nous étions." },
          { answer: "faisait", accepted: ["faisait"], explain: "Descripción del clima = imparfait: il faisait." },
          { answer: "avons fait", accepted: ["avons fait", "avons pris", "sommes allés"], explain: "Acción puntual = passé composé: nous avons fait." },
          { answer: "a entendu", accepted: ["a entendu", "avons entendu"], explain: "Evento puntual con soudain = passé composé: on a entendu." },
          { answer: "était", accepted: ["était"], explain: "Estado = imparfait: c'était." },
        ],
      },
      {
        id: 'l5',
        title: "Narrar combinando los dos tiempos",
        tag: "Producción guiada",
        intro: "Escribe frases que combinen passé composé e imparfait según las indicaciones.",
        type: 'write',
        items: [
          {
            scene: "La interrupción clásica",
            prompt: "Escribe: \"Yo dormía cuando sonó el teléfono.\" (Je / dormir / quand / le téléphone / sonner)",
            answer: "Je dormais quand le téléphone a sonné.",
            accepted: ["je dormais quand le téléphone a sonné", "dormais quand", "a sonné"],
            explain: "Je dormais (imparfait = acción continua) + a sonné (passé composé = acción puntual).",
          },
          {
            scene: "El hábito roto",
            prompt: "Escribe: \"Normalmente leía, pero ayer salí.\" (D'habitude / je / lire / mais / hier / sortir)",
            answer: "D'habitude, je lisais, mais hier je suis sorti.",
            accepted: ["je lisais, mais hier je suis sorti", "je suis sorti hier"],
            explain: "D'habitude + imparfait (lisais) vs. hier + passé composé (suis sorti).",
          },
          {
            scene: "La descripción + evento",
            prompt: "Escribe: \"Había mucha gente cuando llegué.\" (Il y avoir / beaucoup de monde / quand / j'arriver)",
            answer: "Il y avait beaucoup de monde quand je suis arrivé.",
            accepted: ["il y avait beaucoup de monde quand je suis arrivé", "il y avait", "je suis arrivé"],
            explain: "Il y avait (imparfait = descripción) + je suis arrivé (passé composé = evento).",
          },
        ],
      },
      {
        id: 'l6',
        title: "Un souvenir inoubliable",
        tag: "Escritura libre",
        intro: "Narra un recuerdo usando passé composé e imparfait correctamente.",
        type: 'write',
        items: [
          {
            scene: "El escenario",
            prompt: "Describe el contexto de tu recuerdo: cómo era el lugar, el tiempo, cómo te sentías. (C'était... / Il y avait... / Je me sentais...)",
            answer: "C'était une belle journée. Il y avait du soleil et je me sentais heureux.",
            accepted: ["c'était", "il y avait", "il faisait", "je me sentais", "j'étais"],
            explain: "Imparfait para el contexto: c'était, il y avait, il faisait, j'étais, je me sentais...",
          },
          {
            scene: "Lo que ocurrió",
            prompt: "Narra qué pasó usando passé composé: (Soudain / Ensuite / D'abord...)",
            answer: "Soudain, j'ai vu un arc-en-ciel. J'ai pris une photo.",
            accepted: ["j'ai vu", "j'ai pris", "nous avons", "ils ont", "soudain", "ensuite"],
            explain: "Passé composé para eventos puntuales: j'ai vu, j'ai pris, nous avons décidé...",
          },
          {
            scene: "Tu historia completa",
            prompt: "Escribe 3-4 frases combinando los dos tiempos para contar un recuerdo.",
            answer: "Il faisait beau et nous étions au parc. Soudain, il a commencé à pleuvoir. Nous avons cherché un abri et nous avons ri.",
            accepted: ["imparfait", "passé composé", "faisait", "ai", "sommes", "avons"],
            explain: "Imparfait (faisait, étions) para el escenario + passé composé (a commencé, avons cherché, avons ri) para los eventos.",
          },
        ],
      },
    ],
  },
}

export default topic
