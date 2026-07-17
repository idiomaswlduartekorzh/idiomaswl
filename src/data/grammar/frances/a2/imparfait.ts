import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'imparfait',
  order: '03',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A2',
  title: "El Imparfait — descripción y hábitos en el pasado",
  shortTitle: "Imparfait",
  metaTitle: "L'imparfait en français A2 — formation et emploi: il faisait beau, je mangeais toujours",
  description: "El imparfait describe situaciones pasadas continuas, hábitos repetidos y el contexto de una historia. Se forma tomando la raíz de la forma nous del presente y añadiendo las terminaciones -ais, -ais, -ait, -ions, -iez, -aient.",
  lead: "Quand j'étais enfant, je jouais au football tous les jours. Il faisait beau et nous allions souvent à la plage. El imparfait pinta el escenario del pasado — aprende a usarlo para describir y narrar.",

  outcomes: [
    "Formar el imparfait de verbos regulares -ER, -IR y -RE a partir de la raíz de nous.",
    "Conjugar être en imparfait (forme irrégulière: j'étais, tu étais...).",
    "Usar el imparfait para descripciones, hábitos pasados y contexto narrativo.",
    "Reconocer los marcadores temporales que señalan el imparfait: toujours, souvent, tous les jours, quand j'étais enfant.",
  ],

  guide: {
    goal: "Expresar descripciones, estados y hábitos pasados usando el imparfait.",
    model: "Il faisait beau. / Je mangeais toujours des céréales le matin. / Nous habitions à Lyon.",
    formula: "Raíz de nous (présent) - ons + terminaciones: -ais/-ais/-ait/-ions/-iez/-aient",
    decisions: [
      "Tomar la forma nous del présent: nous parlons → raíz: parl-; nous finissons → raíz: finiss-.",
      "Añadir las terminaciones: -ais (je/tu), -ait (il/elle/on), -ions (nous), -iez (vous), -aient (ils/elles).",
      "Único irregular frecuente: être → raíz ét- (j'étais, tu étais, il était, nous étions, vous étiez, ils étaient).",
      "Imparfait = descripción/estado (il faisait froid) o hábito (je lisais chaque soir).",
      "Marcadores del imparfait: toujours, souvent, tous les jours/soirs, d'habitude, quand j'étais enfant, autrefois.",
    ],
    table: [
      ["Personne", "Terminación", "Ejemplo (parler)"],
      ["je", "-ais", "je parlais"],
      ["tu", "-ais", "tu parlais"],
      ["il / elle / on", "-ait", "il parlait"],
      ["nous", "-ions", "nous parlions"],
      ["vous", "-iez", "vous parliez"],
      ["ils / elles", "-aient", "ils parlaient"],
    ],
    mistakes: [
      "\"Je parlais\" ✓ — pero \"Je parleais\" ❌: la terminación va directamente sobre la raíz de nous, sin -e extra.",
      "\"Il était\" ✓ — pero \"Il étais\" ❌: 3.ª persona singular del imparfait siempre termina en -ait.",
      "\"Nous parlions\" ✓ — pero \"Nous parlions\" ✓ — ¡cuidado! Presente: nous parlons / Imparfait: nous parlions (con -i-).",
    ],
  },

  seo: [
    {
      heading: "El imparfait: el tiempo de la descripción y la costumbre",
      paragraphs: [
        "El imparfait es el tiempo del pasado que describe situaciones continuas, hábitos repetidos y el contexto de una narración. Mientras el passé composé expresa acciones puntuales y terminadas, el imparfait pinta el escenario: cómo era algo, qué se hacía regularmente, cuál era el estado de las cosas.",
        "La formación es muy regular: se toma la forma nous del présent, se elimina -ons y se añaden las terminaciones -ais, -ais, -ait, -ions, -iez, -aient. Así, nous mangeons → mang- → je mangeais, tu mangeais, il mangeait. El único verbo realmente irregular es être, con raíz ét-.",
      ],
    },
    {
      heading: "Cuándo usar el imparfait vs. el passé composé",
      paragraphs: [
        "El imparfait se usa para: 1) describir el contexto o escenario de una historia (il faisait nuit, il y avait beaucoup de monde); 2) expresar hábitos o acciones repetidas en el pasado (tous les étés, nous allions à la mer); 3) indicar un estado mental o físico continuo (j'étais fatigué, elle avait peur).",
        "Los marcadores temporales te ayudan a identificar qué tiempo usar. El imparfait aparece con: toujours, souvent, d'habitude, tous les jours, chaque matin, quand j'étais enfant, autrefois. El passé composé aparece con: hier, une fois, soudain, tout à coup, ce matin.",
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: "Imparfait = raíz de nous + terminaciones. Único irregular: être → ét-. Contraste con PC: contexto vs. acción.",
    graphicPrompt: "Línea de tiempo continua con fondo gris (imparfait = escenario) vs. punto rojo (passé composé = acción). Ejemplo: Il pleuvait / J'ai ouvert mon parapluie.",
    scene: [
      ["Quand j'étais enfant, j'habitais à Lyon.", "Cuando era niño(a), vivía en Lyon."],
      ["Il faisait beau et nous jouions dans le jardin.", "Hacía buen tiempo y jugábamos en el jardín."],
      ["Tous les soirs, elle lisait avant de dormir.", "Todas las noches, ella leía antes de dormir."],
      ["Nous allions souvent au marché le dimanche.", "Íbamos al mercado frecuentemente los domingos."],
      ["Il était tard et j'étais fatigué.", "Era tarde y estaba cansado."],
    ],
    learnerModes: ["reading", "choosing", "typing"],
    reviewFocus: ["raíz de nous + terminaciones", "être irrégulier", "marcadores temporales"],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: "Reconocer el imparfait",
        tag: "Opción múltiple",
        intro: "Elige la forma correcta del imparfait para completar la frase.",
        type: 'choice',
        items: [
          {
            scene: "La infancia",
            lines: [["Mamá", "Quand j'étais petite, je ___ au tennis tous les samedis."]],
            options: ["jouais", "joue", "jouerai", "ai joué"],
            answer: "jouais",
            explain: "Imparfait de jouer (hábito pasado): je jouais. Raíz: jou- + -ais.",
          },
          {
            scene: "El clima",
            lines: [["Ana", "Il ___ très froid ce jour-là."]],
            options: ["faisait", "fait", "fera", "a fait"],
            answer: "faisait",
            explain: "Imparfait de faire (descripción): il faisait. Raíz: fais- + -ait.",
          },
          {
            scene: "El estado de ánimo",
            lines: [["Tom", "J'___ très heureux quand j'habitais à Paris."]],
            options: ["étais", "suis", "serai", "ai été"],
            answer: "étais",
            explain: "Imparfait de être (estado pasado): j'étais. Raíz irregular: ét- + -ais.",
          },
          {
            scene: "La rutina",
            lines: [["Prof", "Nous ___ au café tous les matins avant le travail."]],
            options: ["allions", "allons", "irons", "sommes allés"],
            answer: "allions",
            explain: "Imparfait de aller (hábito): nous allions. Raíz: all- + -ions.",
          },
          {
            scene: "La descripción",
            lines: [["Lucie", "Les rues ___ vides et il n'y avait personne."]],
            options: ["étaient", "sont", "seront", "ont été"],
            answer: "étaient",
            explain: "Imparfait de être (descripción): ils/elles étaient. Raíz: ét- + -aient.",
          },
          {
            scene: "La costumbre",
            lines: [["Carlos", "Vous ___ souvent ensemble quand vous étiez étudiants?"]],
            options: ["sortiez", "sortez", "sortirez", "êtes sortis"],
            answer: "sortiez",
            explain: "Imparfait de sortir (hábito): vous sortiez. Raíz de nous (nous sortons → sort-) + -iez.",
          },
        ],
      },
      {
        id: 'l2',
        title: "Dos formas del imparfait",
        tag: "2 espacios",
        intro: "Elige la raíz y la terminación correctas para formar el imparfait.",
        type: 'dual',
        items: [
          {
            scene: "Recuerdos de infancia",
            lines: [["Grand-père", "Quand j'[[0]] enfant, nous [[1]] souvent à la campagne."]],
            blanks: [
              { options: ["étais", "suis", "serai"], answer: "étais", explain: "Être en imparfait: j'étais." },
              { options: ["allions", "allons", "irons"], answer: "allions", explain: "Aller en imparfait: nous allions." },
            ],
          },
          {
            scene: "La descripción de una noche",
            lines: [["Marie", "Il [[0]] nuit et il [[1]] beaucoup."]],
            blanks: [
              { options: ["faisait", "fait", "fera"], answer: "faisait", explain: "Faire en imparfait: il faisait (nuit = era de noche)." },
              { options: ["pleuvait", "pleut", "pleuvra"], answer: "pleuvait", explain: "Pleuvoir en imparfait: il pleuvait." },
            ],
          },
          {
            scene: "Los hábitos de antes",
            lines: [["Sofía", "Avant, tu [[0]] souvent et tu [[1]] beaucoup de livres."]],
            blanks: [
              { options: ["sortais", "sors", "sortiras"], answer: "sortais", explain: "Sortir en imparfait: tu sortais." },
              { options: ["lisais", "lis", "liras"], answer: "lisais", explain: "Lire en imparfait: tu lisais." },
            ],
          },
          {
            scene: "El ambiente en el café",
            lines: [["Lucas", "Les gens [[0]] et il y [[1]] une belle musique."]],
            blanks: [
              { options: ["parlaient", "parlent", "parleront"], answer: "parlaient", explain: "Parler en imparfait: ils parlaient." },
              { options: ["avait", "a", "aura"], answer: "avait", explain: "Avoir en imparfait: il y avait." },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: "Los recuerdos de Emma",
        tag: "Texto guiado",
        intro: "Completa el texto eligiendo las formas correctas del imparfait.",
        type: 'guidedText',
        scene: "Emma recuerda su infancia en Bretaña",
        text: "Quand j'[[0]] enfant, nous [[1]] dans une petite maison en Bretagne. L'été, il [[2]] souvent beau et nous [[3]] à la plage tous les jours. Le soir, ma mère nous [[4]] des histoires avant de dormir.",
        blanks: [
          { options: ["étais", "suis", "serai"], answer: "étais", explain: "Être en imparfait, 1.ª pers. sing.: j'étais." },
          { options: ["habitions", "habitons", "habiterons"], answer: "habitions", explain: "Habiter en imparfait, 1.ª pers. pl.: nous habitions." },
          { options: ["faisait", "fait", "fera"], answer: "faisait", explain: "Faire en imparfait, 3.ª pers. sing.: il faisait." },
          { options: ["allions", "allons", "irons"], answer: "allions", explain: "Aller en imparfait, 1.ª pers. pl.: nous allions." },
          { options: ["racontait", "raconte", "racontera"], answer: "racontait", explain: "Raconter en imparfait, 3.ª pers. sing.: elle racontait." },
        ],
      },
      {
        id: 'l4',
        title: "Antes y ahora",
        tag: "Texto libre",
        intro: "Escribe las formas correctas del imparfait sin ayuda de opciones.",
        type: 'freeText',
        scene: "Julien compara su vida de antes con la de ahora",
        text: "Avant, je ___ à Lyon. Tous les jours, je ___ au bureau à pied. Mes collègues et moi, nous ___ souvent au café. Le week-end, il ___ généralement beau. Maintenant, tout ça ___ un beau souvenir.",
        blanks: [
          { answer: "habitais", accepted: ["habitais"], explain: "Habiter en imparfait: je habitais." },
          { answer: "allais", accepted: ["allais"], explain: "Aller en imparfait: j'allais." },
          { answer: "allions", accepted: ["allions"], explain: "Aller en imparfait, nous: nous allions." },
          { answer: "faisait", accepted: ["faisait"], explain: "Faire en imparfait: il faisait (beau)." },
          { answer: "est", accepted: ["est", "reste"], explain: "\"Maintenant\" indica presente, no imparfait." },
        ],
      },
      {
        id: 'l5',
        title: "Construir frases en imparfait",
        tag: "Producción guiada",
        intro: "Escribe la frase completa en imparfait según las indicaciones.",
        type: 'write',
        items: [
          {
            scene: "Un hábito de infancia",
            prompt: "Escribe: \"De niño(a), yo leía todos los días.\" (Quand j'étais enfant / je / lire / tous les jours)",
            answer: "Quand j'étais enfant, je lisais tous les jours.",
            accepted: ["je lisais tous les jours", "j'étais enfant, je lisais"],
            explain: "Imparfait de lire: je lisais. Raíz de nous (nous lisons → lis-) + -ais.",
          },
          {
            scene: "La descripción del tiempo",
            prompt: "Escribe: \"Hacía buen tiempo y había mucha gente.\" (Il / faire / beau / et / il y avoir / beaucoup de monde)",
            answer: "Il faisait beau et il y avait beaucoup de monde.",
            accepted: ["il faisait beau et il y avait", "faisait beau", "y avait beaucoup de monde"],
            explain: "Faire → il faisait. Avoir (il y a) → il y avait. Ambos en imparfait para descripción.",
          },
          {
            scene: "La costumbre de los abuelos",
            prompt: "Escribe: \"Mis abuelos vivían en el campo.\" (Mes grands-parents / habiter / à la campagne)",
            answer: "Mes grands-parents habitaient à la campagne.",
            accepted: ["mes grands-parents habitaient", "habitaient à la campagne"],
            explain: "Habiter en imparfait: ils habitaient. Raíz: habit- + -aient.",
          },
        ],
      },
      {
        id: 'l6',
        title: "Mon enfance en imparfait",
        tag: "Escritura libre",
        intro: "Describe tu infancia usando el imparfait con al menos 3 verbos diferentes.",
        type: 'write',
        items: [
          {
            scene: "Tu ciudad o pueblo de infancia",
            prompt: "¿Dónde vivías y cómo era? (J'habitais... / C'était... / Il y avait...)",
            answer: "J'habitais à Bogotá. C'était une grande ville. Il y avait beaucoup de circulation.",
            accepted: ["j'habitais", "c'était", "il y avait", "nous habitions"],
            explain: "Imparfait para descripción: j'habitais, c'était, il y avait, il faisait...",
          },
          {
            scene: "Tus actividades de infancia",
            prompt: "¿Qué hacías habitualmente de niño(a)? (Quand j'étais enfant, je...)",
            answer: "Quand j'étais enfant, je jouais au football et je regardais des dessins animés.",
            accepted: ["je jouais", "je regardais", "j'allais", "nous allions", "je lisais", "je mangeais"],
            explain: "Imparfait para hábitos: jouer → je jouais; regarder → je regardais.",
          },
          {
            scene: "Una comparación",
            prompt: "Compara tu vida de antes con la de ahora. (Avant, je... / Maintenant, je...)",
            answer: "Avant, j'habitais à Lyon. Maintenant, j'habite à Paris.",
            accepted: ["avant", "maintenant", "imparfait"],
            explain: "Avant + imparfait para el pasado; maintenant + présent para el ahora.",
          },
        ],
      },
    ],
  },
}

export default topic
