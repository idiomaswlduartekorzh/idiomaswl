import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'expressions-temporelles-b1',
  order: '12',
  color: '#2563eb',
  category: 'Tiempo',
  level: 'B1',
  title: 'Les Expressions Temporelles en Francés B1',
  shortTitle: 'Expressions Temporelles',
  metaTitle: 'Expressions Temporelles B1 — Pendant, depuis, il y a, dans, pour en francés',
  description:
    "Las expresiones temporales permiten situar acciones en el tiempo. En francés B1 es esencial distinguir: 'depuis' (desde hace / hace X tiempo que), 'il y a' (hace X tiempo), 'pendant' (durante), 'dans' (dentro de / en), 'pour' (por X tiempo) y 'en' (en X tiempo). Cada una requiere un tiempo verbal específico.",
  lead: "Aprende a usar las expresiones de tiempo del francés: desde hace, hace X tiempo, durante, dentro de, en X tiempo — con el tiempo verbal correcto en cada caso.",
  outcomes: [
    "Distingues 'depuis' (duración presente) de 'il y a' (punto pasado)",
    "Usas 'pendant' para la duración de una acción completada",
    "Utilizas 'dans' y 'en' correctamente en contextos diferentes",
    "Combinas expresiones temporales con los tiempos verbales apropiados",
  ],

  guide: {
    goal: "Situar acciones en el tiempo con precisión usando las preposiciones y expresiones temporales correctas.",
    model: "J'apprends le français depuis deux ans. / Il a travaillé ici pendant cinq ans. / Elle arrivera dans une heure.",
    formula: "depuis + présent | il y a + passé composé | pendant + durée (passé/présent) | dans + futur | en + durée (para completar algo)",
    decisions: [
      "Depuis + présent: acción que comenzó en el pasado y continúa. 'Je vis à Paris depuis 2020.'",
      "Il y a + passé composé: punto en el pasado (hace X tiempo). 'Il est parti il y a une heure.'",
      "Pendant: duración de una acción ya terminada. 'J'ai étudié pendant trois heures.'",
      "Dans: tiempo que falta para el futuro. 'Elle reviendra dans deux jours.' (future)",
      "En: tiempo necesario para completar algo. 'Il a lu ce livre en une journée.'",
      "Pour: duración prevista (no siempre cumplida). 'Je pars pour un mois.' (previsto)",
      "Voilà / Ça fait + que: variantes coloquiales de depuis. 'Ça fait deux ans que j'étudie.'",
    ],
    table: [
      ["Expresión", "Tiempo verbal", "Significado"],
      ["depuis + durée", "présent o imparfait", "desde hace / llevaba X tiempo"],
      ["il y a + durée", "passé composé", "hace X tiempo (punto pasado)"],
      ["pendant + durée", "passé composé / présent", "durante X tiempo"],
    ],
    mistakes: [
      "\"J'étudie depuis deux ans\" ✓ — correcto. \"J'ai étudié depuis deux ans\" ❌ — depuis con acción continua exige présent.",
      "\"Il est parti depuis une heure\" ❌ — il y a para punto pasado: \"Il est parti il y a une heure\" ✓.",
      "\"Je reviendrai dans deux jours\" ✓ — dans + futur. \"Je reviendrai en deux jours\" significaría otra cosa: en menos de dos días.",
    ],
  },

  seo: [
    {
      heading: '¿Cuál es la diferencia entre depuis e il y a en francés?',
      paragraphs: [
        "La confusión más común entre hispanohablantes es entre 'depuis' e 'il y a'. 'Depuis' se usa con el présent (o imparfait) para acciones que comenzaron en el pasado y continúan: 'J'habite à Paris depuis 2018' (Vivo en París desde 2018 — y sigo viviendo allí). 'Il y a' se usa con el passé composé para señalar un punto en el pasado: 'Je suis arrivé à Paris il y a cinq ans' (Llegué a París hace cinco años).",
        "Un truco para no confundirlos: si la acción sigue ocurriendo ahora, usa 'depuis' + présent. Si la acción ya terminó y quieres decir cuándo ocurrió, usa 'il y a' + passé composé. 'Il a commencé à travailler il y a un an' (acción puntual pasada) vs 'Il travaille ici depuis un an' (sigue trabajando, acción continua). En español coloquial usamos 'hace' para ambos, lo que crea la confusión.",
      ],
    },
    {
      heading: '¿Cómo se usan pendant, en y pour en francés?',
      paragraphs: [
        "Pendant (durante) indica la duración de una acción que ya terminó o que ocurre durante un período: 'J'ai travaillé pendant trois heures' (Trabajé durante tres horas). En (en) indica el tiempo necesario para completar algo con éxito: 'Elle a appris les conjugaisons en deux semaines' (Aprendió las conjugaciones en dos semanas — tiempo que tardó). Pour (por/para) indica una duración prevista, especialmente con verbos de movimiento: 'Je pars pour trois jours' (Me voy por tres días — tiempo previsto).",
        "La diferencia entre 'pendant' y 'en' es clave: 'pendant' focaliza en la duración de la actividad; 'en' focaliza en el tiempo que se tarda en completar un resultado. 'J'ai travaillé pendant deux heures' (trabajé dos horas, sin especificar resultado). 'J'ai terminé le projet en deux heures' (tardé dos horas en terminarlo — el resultado está incluido).",
      ],
      table: [
        ["Expresión", "Enfoque", "Ejemplo"],
        ["pendant", "duración de actividad", "J'ai lu pendant une heure."],
        ["en", "tiempo para completar algo", "J'ai lu ce livre en une heure."],
        ["pour", "duración prevista", "Je pars pour une semaine."],
      ],
    },
    {
      heading: '¿Cómo se sitúa una acción en el futuro en francés (dans)?',
      paragraphs: [
        "Dans indica cuánto tiempo falta para que ocurra algo en el futuro: 'Le train part dans dix minutes' (El tren sale en diez minutos). Se usa siempre con el futuro o el présent con valor de futuro. No confundir con 'en': 'dans deux heures' (dentro de dos horas, en el futuro) vs 'en deux heures' (tardando dos horas en hacer algo).",
        "Otras expresiones temporales importantes: 'il y a... que' (hace X tiempo que): 'Il y a trois ans que je n'ai pas vu ma famille' (Hace tres años que no veo a mi familia). 'Ça fait... que' (coloquial): 'Ça fait longtemps qu'il pleut!' (Hace mucho que llueve). 'Voilà... que' (literario): 'Voilà deux heures que j'attends.' Todas estas variantes se usan con el présent para acciones continuas.",
      ],
    },
  ],

  visual: {
    mode: "scene",
    teacherLens: "Las expresiones temporales sitúan acciones en el tiempo: depuis (continua), il y a (pasada), pendant (duración), dans (futuro), en (tiempo empleado).",
    graphicPrompt: "Línea temporal con flechas y marcadores mostrando cuándo ocurre cada acción relativa al presente.",
    scene: [
      ["J'étudie le français depuis trois ans et j'adore ça.", "Estudio francés desde hace tres años y me encanta."],
      ["Elle a appelé il y a exactement vingt minutes.", "Ella llamó hace exactamente veinte minutos."],
      ["Il a travaillé sur ce projet pendant six mois.", "Trabajó en este proyecto durante seis meses."],
      ["Le vol arrive dans deux heures — prépare-toi!", "El vuelo llega en dos horas — ¡prepárate!"],
      ["Elle a fini tout le rapport en une matinée!", "Terminó todo el informe en una mañana."],
      ["Je pars en vacances pour quinze jours à la mer.", "Me voy de vacaciones por quince días al mar."],
      ["Ça fait longtemps qu'on ne s'est pas vus!", "¡Hace mucho que no nos veíamos!"],
      ["Il y a deux ans que j'habite dans ce quartier.", "Hace dos años que vivo en este barrio."],
    ],
    learnerModes: ["reading", "typing", "choosing"],
    reviewFocus: ["depuis vs il y a", "pendant vs en", "dans (futuro)"],
  },

  practice: {
    levels: [
      {
        id: "level-1",
        title: "Elige la expresión temporal correcta",
        tag: "Opción múltiple",
        intro: "Selecciona la expresión temporal que mejor completa cada oración.",
        type: "choice",
        items: [
          {
            scene: "Idiomas",
            lines: [["", "J'apprends le japonais ___ deux ans et je progresse bien."]],
            options: ["depuis", "il y a", "pendant", "dans"],
            answer: "depuis",
            explain: "'Depuis' + présent: la acción empezó hace dos años y continúa. J'apprends (présent) + depuis + durée.",
          },
          {
            scene: "Llegada al trabajo",
            lines: [["", "Il est arrivé au bureau ___ une demi-heure."]],
            options: ["il y a", "depuis", "pendant", "dans"],
            answer: "il y a",
            explain: "'Il y a' + passé composé: punto en el pasado. Il est arrivé (passé composé) + il y a + durée.",
          },
          {
            scene: "Duración de una actividad",
            lines: [["", "Elle a couru ___ une heure ce matin sans s'arrêter."]],
            options: ["pendant", "depuis", "dans", "en"],
            answer: "pendant",
            explain: "'Pendant' expresa la duración de una acción completada. Corrió durante una hora — la actividad ya terminó.",
          },
          {
            scene: "Futuro próximo",
            lines: [["", "Le médecin peut vous recevoir ___ une heure."]],
            options: ["dans", "en", "depuis", "il y a"],
            answer: "dans",
            explain: "'Dans' + durée + futur: tiempo que falta para el futuro. El médico puede recibirle en una hora (dentro de una hora).",
          },
          {
            scene: "Tiempo para completar algo",
            lines: [["", "Elle a rédigé sa thèse ___ deux ans — un vrai record!"]],
            options: ["en", "pendant", "depuis", "dans"],
            answer: "en",
            explain: "'En' indica el tiempo necesario para completar algo. Redactó su tesis en dos años = tardó dos años en terminarla.",
          },
          {
            scene: "Duración prevista",
            lines: [["", "Je pars en mission ___ trois semaines — je vous donnerai des nouvelles."]],
            options: ["pour", "pendant", "depuis", "dans"],
            answer: "pour",
            explain: "'Pour' indica duración prevista de un desplazamiento/ausencia. Me voy por tres semanas (tiempo planificado).",
          },
          {
            scene: "Variante coloquial",
            lines: [["", "___ longtemps que tu n'as pas appelé ta famille?"]],
            options: ["Ça fait", "Il y a", "Depuis", "Dans"],
            answer: "Ça fait",
            explain: "'Ça fait... que' es variante coloquial de 'depuis'. Ça fait longtemps que + présent = hace mucho tiempo que.",
          },
          {
            scene: "Tiempo verbal con depuis",
            lines: [["", "Il habitait à Lyon ___ dix ans quand il a décidé de partir à Paris."]],
            options: ["depuis", "pendant", "il y a", "dans"],
            answer: "depuis",
            explain: "'Depuis' + imparfait: cuando la acción continua se interrumpe por otra acción pasada. Habitait (imparfait) + depuis + durée.",
          },
        ],
      },
      {
        id: "level-2",
        title: "Desde hace o hace X tiempo",
        tag: "2 espacios",
        intro: "Completa con la expresión temporal y el verbo correcto.",
        type: "dual",
        items: [
          {
            scene: "Clases de idiomas",
            lines: [["", "Marie [[0]] le coréen [[1]] huit mois et elle fait déjà des progrès étonnants."]],
            blanks: [
              { options: ["apprend", "a appris", "apprenait", "a apprendu"], answer: "apprend", explain: "Depuis + présent: l'action continue. Marie apprend (présent) le coréen depuis huit mois." },
              { options: ["depuis", "il y a", "pendant", "dans"], answer: "depuis", explain: "'Depuis' pour l'action continue au présent. Elle apprend depuis huit mois = lleva ocho meses aprendiendo." },
            ],
          },
          {
            scene: "La última vez",
            lines: [["", "Je [[0]] mon ami espagnol [[1]] plus d'un an — on devrait se retrouver."]],
            blanks: [
              { options: ["n'ai pas vu", "ne vois pas", "ne voyais pas", "ne verrai pas"], answer: "n'ai pas vu", explain: "Il y a + passé composé: il y a un an que je n'ai pas vu = hace un año que no lo veo. Passé composé négatif." },
              { options: ["il y a", "depuis", "pendant", "dans"], answer: "il y a", explain: "Il y a + durée pour indiquer un point dans le passé. Il y a plus d'un an = hace más de un año." },
            ],
          },
          {
            scene: "Proyecto terminado",
            lines: [["", "L'équipe a travaillé [[0]] ce projet [[1]] dix-huit mois."]],
            blanks: [
              { options: ["sur", "à", "pour", "de"], answer: "sur", explain: "Travailler sur + projet: la preposición correcta. 'Travailler à' también existe pero 'sur' es más natural aquí." },
              { options: ["pendant", "depuis", "il y a", "dans"], answer: "pendant", explain: "'Pendant' pour la durée d'une action terminée. El equipo trabajó durante 18 meses (y terminó)." },
            ],
          },
          {
            scene: "Próxima reunión",
            lines: [["", "La réunion commencera [[0]] exactement trente minutes — [[1]] tôt!"]],
            blanks: [
              { options: ["dans", "depuis", "il y a", "pendant"], answer: "dans", explain: "'Dans' + futur: tiempo que falta. La reunión empezará dentro de exactamente treinta minutos." },
              { options: ["Arrive", "Arrivez", "Arriviez", "Arriver"], answer: "Arrivez", explain: "Impératif pour donner un conseil/ordre. Arrivez tôt = llegad pronto. Tutoyé: Arrive tôt." },
            ],
          },
        ],
      },
      {
        id: "level-3",
        title: "CV de una investigadora",
        tag: "Texto guiado",
        intro: "Completa el CV de una investigadora con las expresiones temporales correctas.",
        type: "guidedText",
        scene: "El CV de Sophie Martin, investigadora científica, incluye información temporal sobre su carrera.",
        text: "Sophie Martin travaille au CNRS [[0]] 2018. Elle a commencé ses recherches sur le changement climatique [[1]] elle était étudiante en master, [[2]] plus de dix ans. Elle a publié son premier article [[3]] seulement trois mois — un exploit! [[4]] six ans, elle a dirigé l'équipe principale. Elle partira en conférence internationale [[5]] deux semaines pour présenter ses résultats. [[6]] son retour, elle a prévu de rédiger un nouveau rapport [[7]] un trimestre.",
        blanks: [
          { options: ["depuis", "il y a", "pendant", "dans"], answer: "depuis", explain: "'Depuis' + présent: travaille (présent) depuis 2018. La acción continúa: trabaja desde 2018." },
          { options: ["quand", "depuis que", "pendant que", "après que"], answer: "depuis que", explain: "'Depuis que' + clause: desde que era estudiante. Depuis que + imparfait pour action passée continue." },
          { options: ["il y a", "depuis", "pendant", "dans"], answer: "il y a", explain: "'Il y a' + durée: hace más de diez años (punto de referencia en el pasado). Il y a + passé composé." },
          { options: ["en", "pendant", "depuis", "dans"], answer: "en", explain: "'En' = tiempo necesario para completar. Publicó su primer artículo en solo tres meses = tardó tres meses." },
          { options: ["Pendant", "Depuis", "Il y a", "Dans"], answer: "Pendant", explain: "'Pendant' + durée pour action terminée. Durante seis años dirigió el equipo (período completado)." },
          { options: ["dans", "depuis", "pendant", "il y a"], answer: "dans", explain: "'Dans' + futur: partirá dentro de dos semanas. Dans + durée + futur simple." },
          { options: ["À", "Depuis", "Pendant", "Dans"], answer: "À", explain: "'À son retour' = a su regreso (cuando regrese). Expresión temporal fija." },
          { options: ["en", "pendant", "dans", "depuis"], answer: "en", explain: "'En' = tiempo para completar el informe. Rédiger un rapport en un trimestre = tardar un trimestre en terminarlo." },
        ],
      },
      {
        id: "level-4",
        title: "Expresa las relaciones temporales",
        tag: "Texto libre",
        intro: "Escribe la expresión temporal correcta en cada espacio.",
        type: "freeText",
        scene: "Completa estas oraciones sobre rutinas y experiencias.",
        text: "Je n'ai pas dormi [[0]] la semaine — j'ai un gros projet. Mes parents se sont rencontrés [[1]] trente ans dans un café parisien. J'ai terminé ce livre difficile [[2]] deux jours seulement — j'étais vraiment motivé. Notre avion décolle [[3]] quelques heures — on devrait déjà être à l'aéroport. Je vis dans cette ville [[4]] toute mon enfance et je l'aime toujours autant.",
        blanks: [
          { answer: "pendant", accepted: ["pendant toute la semaine", "pendant"], explain: "'Pendant' pour la durée de l'insomnie. N'a pas dormi pendant la semaine = no durmió en toda la semana." },
          { answer: "il y a", accepted: ["il y a"], explain: "'Il y a' + passé composé: punto en el pasado. Se conocieron hace treinta años." },
          { answer: "en", accepted: ["en"], explain: "'En' pour le temps mis à terminer quelque chose. Terminé el libro en dos días = tardé dos días." },
          { answer: "dans", accepted: ["dans"], explain: "'Dans' + futur proche: el avión despega dentro de unas horas. Dans quelques heures." },
          { answer: "depuis", accepted: ["depuis"], explain: "'Depuis' + présent: vivo aquí desde toda mi infancia (= toda mi infancia he vivido aquí y sigo). Depuis + présent." },
        ],
      },
      {
        id: "level-5",
        title: "Producción: sitúa en el tiempo",
        tag: "Producción",
        intro: "Escribe oraciones completas con la expresión temporal indicada.",
        type: "write",
        items: [
          {
            scene: "Usa 'depuis'",
            prompt: "Escribe sobre algo que haces desde hace tres años y que sigue en el presente.",
            answer: "Je joue de la guitare depuis trois ans et je progresse chaque jour.",
            accepted: ["depuis trois ans", "depuis + présent"],
            explain: "Depuis + présent: la actividad continúa. Depuis trois ans (duración) + verbo en présent.",
          },
          {
            scene: "Usa 'il y a'",
            prompt: "Describe cuándo ocurrió algo en el pasado usando il y a. (un événement passé)",
            answer: "Il a appelé il y a exactement deux heures mais personne n'a répondu.",
            accepted: ["il y a", "passé composé + il y a"],
            explain: "Il y a + durée + passé composé: señala cuándo ocurrió el evento en el pasado.",
          },
          {
            scene: "Usa 'en' para completar algo",
            prompt: "Escribe que alguien terminó de aprender el vocabulario en un mes.",
            answer: "Elle a appris tout le vocabulaire en un mois — c'est impressionnant!",
            accepted: ["en un mois", "appris en"],
            explain: "'En' pour le temps mis à compléter quelque chose. Tardó un mes en aprenderlo = résultat accompli.",
          },
          {
            scene: "Usa 'dans' para el futuro",
            prompt: "Avisa de que la reunión empieza dentro de quince minutos.",
            answer: "La réunion commence dans quinze minutes — dépêchez-vous!",
            accepted: ["dans quinze minutes", "dans 15 minutes"],
            explain: "'Dans' + futur: tiempo que falta. Dans quinze minutes indica cuándo ocurrirá en el futuro.",
          },
        ],
      },
      {
        id: "level-6",
        title: "Misión: tu historia temporal",
        tag: "Producción libre",
        intro: "Escribe 3 oraciones sobre tu vida usando expresiones temporales diferentes.",
        type: "write",
        items: [
          {
            scene: "Una actividad continua",
            prompt: "Escribe sobre algo que haces regularmente desde hace tiempo. Usa 'depuis'.",
            answer: "J'étudie les langues étrangères depuis mon enfance et c'est ma plus grande passion.",
            accepted: ["depuis", "depuis + présent"],
            explain: "Depuis + présent pour l'action continue. Depuis mon enfance = desde mi infancia (sin año exacto).",
          },
          {
            scene: "Un evento pasado",
            prompt: "Menciona algo importante que ocurrió en el pasado usando 'il y a'.",
            answer: "J'ai changé de travail il y a deux ans et c'est la meilleure décision de ma vie.",
            accepted: ["il y a", "passé composé + il y a"],
            explain: "Il y a + passé composé pour un événement passé daté. Il y a deux ans = hace dos años.",
          },
          {
            scene: "Planes para el futuro",
            prompt: "Menciona algo que pasará pronto usando 'dans'.",
            answer: "Dans quelques mois, je partirai vivre à l'étranger pour une nouvelle aventure.",
            accepted: ["dans", "dans quelques mois", "dans"],
            explain: "'Dans' + futur pour situer dans le futur. Dans quelques mois = dentro de unos meses.",
          },
        ],
      },
    ],
  },
}

export default topic
