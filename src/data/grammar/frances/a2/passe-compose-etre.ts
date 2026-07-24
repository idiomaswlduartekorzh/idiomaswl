import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'passe-compose-etre',
  order: '02',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A2',
  title: "El Passé composé con être — verbos de movimiento y pronominales",
  shortTitle: "Passé composé (être)",
  metaTitle: "Passé composé avec être en français A2 — je suis allé, elle est venue",
  description: "Unos 14 verbos de movimiento (aller, venir, partir, arriver, naître, mourir...) y todos los verbos pronominales forman el passé composé con être. El participio pasado concuerda en género y número con el sujeto.",
  lead: "Je suis allé au cinéma. Elle est venue avec moi. Nous nous sommes levés tôt. Con être, el participio cambia según quién realiza la acción. Aprende las reglas de concordancia y domina este grupo especial de verbos.",

  outcomes: [
    "Identificar los 14 verbos de movimiento que se conjugan con être en el passé composé.",
    "Aplicar la concordancia del participio pasado en género y número con el sujeto.",
    "Formar el passé composé de verbos pronominales con être.",
    "Distinguir cuándo usar avoir y cuándo usar être como auxiliar en el passé composé.",
  ],

  guide: {
    goal: "Expresar acciones de movimiento o reflexivas en el pasado usando être + participe passé concordado con el sujeto.",
    model: "Je suis allé(e) au marché. / Elle est arrivée en retard. / Nous nous sommes levés tôt.",
    formula: "être (présent) + participe passé (concordado con el sujeto en género y número)",
    decisions: [
      "14 verbos de movimiento usan être: aller, venir, partir, arriver, naître, mourir, sortir, entrer, rester, monter, descendre, retourner, tomber, passer.",
      "Todos los verbos pronominales (se lever, se coucher, se souvenir...) también usan être.",
      "Concordancia del participio: femenino → añadir -e; plural → añadir -s; femenino plural → añadir -es.",
      "Il est parti ✓ / Elle est partie ✓ / Ils sont partis ✓ / Elles sont parties ✓.",
      "Mnemotecnia DR MRS VANDERTRAMP: D(escendre), R(ester), M(onter), R(etourner), S(ortir), V(enir), A(ller), N(aître), D(escendre), E(ntrer), R(entrer), T(omber), R(evenir), A(rriver), M(ourir), P(artir).",
    ],
    table: [
      ["Genre/Nombre", "Terminación", "Ejemplo (partir)"],
      ["Masculin singulier", "(ninguna)", "il est parti"],
      ["Féminin singulier", "-e", "elle est partie"],
      ["Masculin pluriel", "-s", "ils sont partis"],
      ["Féminin pluriel", "-es", "elles sont parties"],
    ],
    mistakes: [
      "\"Il est allé\" ✓ — pero \"Il a allé\" ❌: aller siempre usa être, nunca avoir.",
      "\"Elle est venue\" ✓ — pero \"Elle est venu\" ❌: el participio concuerda con sujeto femenino → venue.",
      "\"Ils se sont levés\" ✓ — pero \"Ils se sont levé\" ❌: masculino plural → -s obligatorio en el participio.",
    ],
  },

  seo: [
    {
      heading: "El passé composé con être: movimiento y concordancia",
      paragraphs: [
        "Aunque la mayoría de verbos franceses usa avoir en el passé composé, un grupo especial requiere être como auxiliar. Son los verbos de movimiento y cambio de estado: aller, venir, partir, arriver, naître, mourir, sortir, entrer, rester, monter, descendre, retourner, tomber y passer.",
        "Con être, el participio pasado funciona como un adjetivo: concuerda en género y número con el sujeto. Je suis allé (hombre) y je suis allée (mujer) son formas diferentes del mismo verbo. Dominar esta concordancia es esencial para escribir correctamente en francés.",
      ],
    },
    {
      heading: "Los verbos pronominales y être en el passé composé",
      paragraphs: [
        "Todos los verbos pronominales también usan être en el passé composé. Se lever → je me suis levé(e). Se coucher → tu t'es couché(e). Se retrouver → ils se sont retrouvés. La concordancia sigue las mismas reglas: el participio concuerda con el sujeto.",
        "El truco mnemotécnico DR MRS VANDERTRAMP o la MAISON DE MRS VANDERTRAMP ayuda a memorizar los 14 verbos de movimiento. Cada letra representa uno de los verbos clave. Una vez memorizados estos 14 verbos, sabrás cuándo usar être en lugar de avoir.",
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: "être + participé passé concordado. 14 verbos mouvement + tous les pronominaux. Acuerdo: -e (fém.), -s (pl.), -es (fém. pl.).",
    graphicPrompt: "Casa (MAISON) con flechas de entrada/salida: Je suis entré(e) → je suis sorti(e). Etiqueta: être + accord du participe.",
    scene: [
      ["Je suis allé au cinéma hier soir.", "Fui al cine anoche."],
      ["Elle est arrivée en retard ce matin.", "Ella llegó tarde esta mañana."],
      ["Ils sont partis en vacances lundi.", "Se fueron de vacaciones el lunes."],
      ["Nous nous sommes levés à six heures.", "Nos levantamos a las seis."],
      ["Elles sont restées à la maison.", "Ellas se quedaron en casa."],
    ],
    learnerModes: ["reading", "choosing", "typing"],
    reviewFocus: ["être conjugado", "concordancia del participio", "verbos pronominales"],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: "Reconocer être en el passé composé",
        tag: "Opción múltiple",
        intro: "Elige la forma correcta de être o el participio con la concordancia adecuada.",
        type: 'choice',
        items: [
          {
            scene: "El fin de semana",
            lines: [["Marc", "Ce week-end, je ___ allé au marché."]],
            options: ["suis", "ai", "es", "sommes"],
            answer: "suis",
            explain: "\"Je\" + être → je suis. Aller usa être en el passé composé.",
          },
          {
            scene: "La llegada",
            lines: [["Prof", "Elle ___ arrivée en retard ce matin."]],
            options: ["est", "a", "ai", "sont"],
            answer: "est",
            explain: "\"Elle\" + être → elle est. Arriver usa être.",
          },
          {
            scene: "Las vacaciones",
            lines: [["Ana", "Ils ___ partis en vacances la semaine dernière."]],
            options: ["sont", "ont", "est", "suis"],
            answer: "sont",
            explain: "\"Ils\" + être → ils sont. Partir usa être.",
          },
          {
            scene: "La concordancia femenina",
            lines: [["Lucie", "Sophie est ___ à Paris hier."]],
            options: ["allée", "allé", "allés", "aller"],
            answer: "allée",
            explain: "Sophie es femenino → allée (con -e). La concordancia es obligatoria con être.",
          },
          {
            scene: "El verbo rester",
            lines: [["Kim", "Nous ___ restés à la maison tout le week-end."]],
            options: ["sommes", "avons", "sont", "êtes"],
            answer: "sommes",
            explain: "\"Nous\" + être → nous sommes. Rester usa être.",
          },
          {
            scene: "Verbo pronominal",
            lines: [["Mia", "Elle s'___ levée très tôt ce matin."]],
            options: ["est", "a", "ont", "suis"],
            answer: "est",
            explain: "Los verbos pronominales usan être. Elle s'est levée (femenino → -e).",
          },
          {
            scene: "Concordancia plural femenino",
            lines: [["Prof", "Elles ___ sorties ensemble après le cours."]],
            options: ["sont", "ont", "avons", "est"],
            answer: "sont",
            explain: "\"Elles\" + être → elles sont. Sortir usa être. Sorties = femenino plural (-es).",
          },
        ],
      },
      {
        id: 'l2',
        title: "Être + participio concordado",
        tag: "2 espacios",
        intro: "Elige la forma de être correcta y el participio con la concordancia adecuada.",
        type: 'dual',
        items: [
          {
            scene: "Esta mañana",
            lines: [["Paul", "Ce matin, je [[0]] [[1]] au travail à pied."]],
            blanks: [
              { options: ["suis", "ai", "sommes"], answer: "suis", explain: "\"Je\" + être → je suis." },
              { options: ["allé", "allée", "allés"], answer: "allé", explain: "Paul es masculino → allé (sin -e)." },
            ],
          },
          {
            scene: "El viaje de Sara",
            lines: [["Ami", "Hier, Sara [[0]] [[1]] de Paris en TGV."]],
            blanks: [
              { options: ["est", "a", "sont"], answer: "est", explain: "\"Sara\" (elle) + être → elle est." },
              { options: ["partie", "parti", "parties"], answer: "partie", explain: "Sara es femenino → partie (con -e)." },
            ],
          },
          {
            scene: "Los niños en casa",
            lines: [["Papa", "Les enfants [[0]] [[1]] de l'école à 16h."]],
            blanks: [
              { options: ["sont", "ont", "est"], answer: "sont", explain: "\"Les enfants\" (ils) + être → ils sont." },
              { options: ["rentrés", "rentré", "rentrées"], answer: "rentrés", explain: "Masculino plural (enfants) → rentrés (con -s)." },
            ],
          },
          {
            scene: "Verbo pronominal femenino",
            lines: [["Lucie", "Hier soir, Lucie s'[[0]] [[1]] à 22h."]],
            blanks: [
              { options: ["est", "a", "sont"], answer: "est", explain: "Verbos pronominales usan être. Lucie (elle) → s'est." },
              { options: ["couchée", "couché", "couchés"], answer: "couchée", explain: "Lucie es femenino → couchée (con -e)." },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: "Un día en movimiento",
        tag: "Texto guiado",
        intro: "Completa el texto eligiendo las formas correctas de être.",
        type: 'guidedText',
        scene: "Claire cuenta su día de ayer a su amiga",
        text: "Hier, je [[0]] partie de chez moi à 8h. Je [[1]] allée à la bibliothèque en bus. À midi, Marie [[2]] arrivée pour déjeuner. Nous [[3]] sorties ensemble à 15h. Le soir, je me [[4]] couchée à 22h.",
        blanks: [
          { options: ["suis", "ai", "sommes"], answer: "suis", explain: "\"Je\" + être → je suis. Partir usa être." },
          { options: ["suis", "ai", "sont"], answer: "suis", explain: "\"Je\" + être → je suis. Aller usa être." },
          { options: ["est", "a", "sont"], answer: "est", explain: "\"Marie\" (elle) → elle est. Arriver usa être." },
          { options: ["sommes", "avons", "sont"], answer: "sommes", explain: "\"Nous\" → nous sommes. Sortir usa être." },
          { options: ["suis", "ai", "est"], answer: "suis", explain: "Verbo pronominal se coucher usa être. Je me suis couchée." },
        ],
      },
      {
        id: 'l4',
        title: "El fin de semana de Thomas",
        tag: "Texto libre",
        intro: "Escribe las formas correctas de être sin ayuda de opciones.",
        type: 'freeText',
        scene: "Thomas describe su fin de semana a su colega",
        text: "Ce week-end, je [[0]] allé chez mes parents. Samedi matin, ma sœur [[1]] arrivée de Lyon. Nous [[2]] sortis faire une promenade. Le soir, nous [[3]] rentrés tard. Dimanche, je [[4]] resté à la maison.",
        blanks: [
          { answer: "suis", accepted: ["suis"], explain: "\"Je\" + être → je suis." },
          { answer: "est", accepted: ["est"], explain: "\"Ma sœur\" (elle) → elle est arrivée." },
          { answer: "sommes", accepted: ["sommes"], explain: "\"Nous\" + être → nous sommes sortis." },
          { answer: "sommes", accepted: ["sommes"], explain: "\"Nous\" + être → nous sommes rentrés." },
          { answer: "suis", accepted: ["suis"], explain: "\"Je\" + être → je suis resté." },
        ],
      },
      {
        id: 'l5',
        title: "Construir frases con être",
        tag: "Producción guiada",
        intro: "Escribe la frase completa en passé composé con être y la concordancia correcta.",
        type: 'write',
        items: [
          {
            scene: "El viaje",
            prompt: "Escribe: \"Ella fue a Madrid.\" (Elle / aller / à Madrid)",
            answer: "Elle est allée à Madrid.",
            accepted: ["elle est allée à madrid", "elle est allée a madrid"],
            explain: "Elle est allée à Madrid. — être (est) + allée (femenino → -e).",
          },
          {
            scene: "La llegada",
            prompt: "Escribe: \"Ellos llegaron temprano.\" (Ils / arriver / tôt)",
            answer: "Ils sont arrivés tôt.",
            accepted: ["ils sont arrivés tôt", "ils sont arrivés tot"],
            explain: "Ils sont arrivés tôt. — être (sont) + arrivés (masculino plural → -s).",
          },
          {
            scene: "El regreso",
            prompt: "Escribe: \"Las chicas volvieron a casa.\" (Les filles / rentrer / à la maison)",
            answer: "Les filles sont rentrées à la maison.",
            accepted: ["les filles sont rentrées", "les filles sont rentrees"],
            explain: "Les filles sont rentrées à la maison. — être (sont) + rentrées (femenino plural → -es).",
          },
        ],
      },
      {
        id: 'l6',
        title: "Mon week-end en mouvement",
        tag: "Escritura libre",
        intro: "Escribe sobre tu fin de semana usando verbos con être en el passé composé.",
        type: 'write',
        items: [
          {
            scene: "Tus movimientos del fin de semana",
            prompt: "Escribe 2 cosas que hiciste usando être: Je suis... / Nous sommes...",
            answer: "Je suis allé(e) au parc. Je suis rentré(e) tard.",
            accepted: ["je suis allé", "je suis allée", "je suis parti", "je suis sortie", "nous sommes"],
            explain: "Usa verbos de movimiento: aller, partir, sortir, rentrer, arriver, rester... + être + participio concordado.",
          },
          {
            scene: "Tu rutina matinal",
            prompt: "Escribe sobre tu mañana usando un verbo pronominal: Je me suis...",
            answer: "Je me suis levé(e) à 8h.",
            accepted: ["je me suis levé", "je me suis levée", "je me suis réveillé", "je me suis couché"],
            explain: "Verbos pronominales: se lever, se réveiller, se coucher, se doucher → être en el passé composé.",
          },
          {
            scene: "Un(a) amigo(a)",
            prompt: "Describe lo que hizo un(a) amigo(a): Il/Elle est...",
            answer: "Mon ami est venu chez moi samedi.",
            accepted: ["est venu", "est venue", "est allé", "est allée", "est parti", "est sortie"],
            explain: "Usa être + participio concordado con el sujeto (masculino/femenino).",
          },
        ],
      },
    ],
  },
}

export default topic
