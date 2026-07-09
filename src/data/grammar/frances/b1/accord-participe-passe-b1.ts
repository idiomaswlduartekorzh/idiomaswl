import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'accord-participe-passe-b1',
  order: '16',
  color: '#2563eb',
  category: 'Concordancia',
  level: 'B1',
  title: "L'Accord du Participe Passé en Francés B1",
  shortTitle: 'Accord Participe Passé',
  metaTitle: "Accord du Participe Passé B1 — Concordancia del participio pasado en francés",
  description:
    "La concordancia del participio pasado es una de las reglas más complejas del francés. Con être, el participio concuerda siempre con el sujeto. Con avoir, el participio concuerda con el complemento directo solo si este precede al verbo (pronom COD ou relative clause). Los verbos pronominaux siguen reglas especiales.",
  lead: "Aprende cuándo y cómo hacer concordar el participio pasado en francés: con être siempre acuerda, con avoir sólo si el objeto directo precede al verbo.",
  outcomes: [
    "Haces concordar el participio con être según el género y número del sujeto",
    "Aplicas la concordancia con avoir cuando el COD precede al verbo",
    "Manejas los casos especiales de los verbos pronominaux",
    "Reconoces los 17 verbos que se conjugan con être en los tiempos compuestos",
  ],

  guide: {
    goal: "Aplicar correctamente la concordancia del participio pasado en todos los contextos de uso.",
    model: "Elle est partie tôt. / La lettre que j'ai écrite. / Ils se sont regardés.",
    formula: "Être + pp: accord avec le sujet | Avoir + pp: accord si COD précède | Pronominaux: accord avec le sujet (sauf si COD après)",
    decisions: [
      "Avec être: le pp s'accorde toujours avec le sujet. 'Elle est partie. Ils sont partis. Elles sont parties.'",
      "Avec avoir: le pp reste invariable si le COD suit. 'Il a mangé une pizza.' (invariable)",
      "Avec avoir + COD avant: accord avec le COD. 'La pizza qu'il a mangée.' / 'Il l'a mangée.' (mangée: fém.)",
      "Pronominaux réfléchis: accord avec le sujet si le COD est le pronom réfléchi. 'Elles se sont lavées.'",
      "Pronominaux + COD explicite: pas d'accord avec le sujet. 'Elle s'est lavé les mains.' (les mains = COD après)",
      "Les 17 verbes avec être: aller/venir, partir/arriver, entrer/sortir, naître/mourir, rester, monter/descendre, tomber, passer, retourner, devenir, rentrer.",
      "Passif: toujours avec être, accord avec le sujet. 'La maison a été construite.' (construite: fém.)",
    ],
    table: [
      ["Auxiliaire", "Règle d'accord", "Exemple"],
      ["être", "accord avec le sujet", "Elle est arrivée tard."],
      ["avoir + COD après", "pas d'accord", "J'ai lu un livre."],
      ["avoir + COD avant", "accord avec le COD", "La lettre que j'ai écrite."],
    ],
    mistakes: [
      "\"Ils ont mangés\" ❌ — avec avoir, pas d'accord si le COD suit: \"Ils ont mangé\" ✓.",
      "\"Elle s'est lavé\" ❌ (si réfléchi) — avec verbe pronominal réfléchi: \"Elle s'est lavée\" ✓.",
      "\"La chanson que j'ai entendu\" ❌ — COD 'que' (fém.) précède: \"La chanson que j'ai entendue\" ✓.",
    ],
  },

  seo: [
    {
      heading: "La concordancia del participio pasado: la regla de être",
      paragraphs: [
        "Con el auxiliar être, el participio pasado concuerda siempre con el sujeto en género y número. Esta regla se aplica a los 17 verbos de movimiento y cambio de estado que se conjugan con être (aller, venir, partir, arriver, entrer, sortir, naître, mourir, rester, monter, descendre, tomber, passer, retourner, devenir, rentrer y sus compuestos), así como a todos los verbos en voz pasiva y a todos los verbos pronominales.",
        "La regla es simple: si el sujeto es femenino, añadir -e; si es plural, añadir -s; si es femenino plural, añadir -es. 'Il est parti' (m.sg.), 'Elle est partie' (f.sg.), 'Ils sont partis' (m.pl.), 'Elles sont parties' (f.pl.). Los 17 verbos con être se memorizan con el acrónimo DR y MRS VAN DER TRAMP (inglés) o con el recurso de 'la casa de être': entrar, salir, subir, bajar, llegar, partir, nacer, morir, quedarse, volver, retornar y sus compuestos.",
      ],
    },
    {
      heading: "La concordancia con avoir: el COD que precede",
      paragraphs: [
        "Con el auxiliar avoir, el participio NO concuerda con el sujeto sino con el complemento directo (COD), pero solo si este COD precede al verbo. Hay dos casos frecuentes donde el COD precede: cuando es un pronombre personal (le, la, les, me, te, nous, vous) o cuando es un pronombre relativo (que). 'J'ai vu Marie' (invariable, Marie va después). 'Je l'ai vue' (vue: concordancia con 'l'' que representa Marie, femenino). 'La fille que j'ai vue' (vue: concordancia con 'que' = la fille, femenino).",
        "En la práctica oral, esta concordancia es casi imperceptible en muchos casos (las marcas -e y -es no se pronuncian en participios regulares). Sin embargo, es obligatoria en la escritura. Los participios irregulares donde la diferencia sí se oye: fait/faite, ouvert/ouverte, mis/mise, pris/prise. 'Les clés que j'ai prises' — se oye la diferencia entre 'pris' (m.) y 'prises' (f.pl.).",
      ],
      table: [
        ["Posición del COD", "Concordancia", "Ejemplo"],
        ["COD después del verbo", "sin concordancia", "J'ai lu un roman."],
        ["COD pronombre antes", "acuerdo con pronom", "Je l'ai lu. / Je l'ai lue."],
        ["COD 'que' relativo", "acuerdo con antecedente", "Le livre que j'ai lu."],
      ],
    },
    {
      heading: "Los verbos pronominaux: reglas especiales",
      paragraphs: [
        "Con los verbos pronominales, la regla general es: el participio concuerda con el sujeto si el pronom réfléchi es el COD (objeto directo). 'Elle s'est habillée' (s' = elle = COD, femenino → habillée). 'Ils se sont levés' (se = ils = COD, masculino plural → levés). Sin embargo, si el verbo pronominal tiene un COD explícito diferente del pronom réfléchi, no hay concordancia con el sujeto: 'Elle s'est lavé les mains' (les mains = COD, s' = COI → pas d'accord).",
        "Los verbos pronominaux réciproques (acciones mutuas) tienen concordancia si el pronom es COD: 'Ils se sont embrassés' (se = COD de embracer l'un l'autre → accord). Pero 'Ils se sont parlé' (parler à quelqu'un → se = COI, pas de COD avant → pas d'accord). Este punto es complejo y es uno de los más difíciles del francés, incluso para hablantes nativos.",
      ],
    },
  ],

  visual: {
    mode: "scene",
    teacherLens: "La concordancia del participio: avec être → accord sujet; avec avoir → accord COD seulement si précède; pronominaux → accord sujet si se = COD.",
    graphicPrompt: "Diagrama de árbol mostrando las tres reglas de concordancia con ejemplos en cada rama.",
    scene: [
      ["Lucie est arrivée en retard ce matin — encore!", "Lucie llegó tarde esta mañana — ¡otra vez!"],
      ["J'ai vu Marie mais je ne l'ai pas reconnue tout de suite.", "Vi a Marie pero no la reconocí enseguida."],
      ["La lettre que tu m'as envoyée était très touchante.", "La carta que me enviaste era muy conmovedora."],
      ["Elles se sont retrouvées après dix ans de séparation.", "Se reencontraron tras diez años de separación."],
      ["Les films que nous avons regardés étaient tous excellents.", "Las películas que vimos eran todas excelentes."],
      ["Il s'est blessé en tombant dans les escaliers.", "Se hirió al caer por las escaleras."],
      ["La décision a été prise à l'unanimité par le conseil.", "La decisión fue tomada por unanimidad por el consejo."],
      ["Elles se sont téléphoné tous les jours pendant un mois.", "Se llamaron por teléfono todos los días durante un mes."],
    ],
    learnerModes: ["reading", "typing", "choosing"],
    reviewFocus: ["être → accord sujet", "avoir + COD avant → accord", "pronominaux"],
  },

  practice: {
    levels: [
      {
        id: "level-1",
        title: "Elige la concordancia correcta",
        tag: "Opción múltiple",
        intro: "Selecciona la forma correcta del participio pasado.",
        type: "choice",
        items: [
          {
            scene: "Voyage de retour",
            lines: [["", "Sophie et Emma sont ___ de Paris hier soir."]],
            options: ["revenues", "revenue", "revenu", "revenus"],
            answer: "revenues",
            explain: "Être + pp: accord avec le sujet (Sophie et Emma = féminin pluriel). Revenue → revenues.",
          },
          {
            scene: "Recherche infructueuse",
            lines: [["", "J'ai ___ mes clés partout mais je ne les ai pas ___!"]],
            options: ["cherché / trouvées", "cherchée / trouvés", "cherché / trouvé", "cherchés / trouvées"],
            answer: "cherché / trouvées",
            explain: "Cherché: avoir + COD après (mes clés suit) → invariable. Trouvées: avoir + 'les' (COD féminin pluriel) avant → accord: trouvées.",
          },
          {
            scene: "Oubli",
            lines: [["", "La réunion que tu avais ___ a finalement eu lieu."]],
            options: ["oubliée", "oublié", "oublié(e)", "oublié(s)"],
            answer: "oubliée",
            explain: "Avoir + pronom relatif 'que' (antécédent: la réunion, féminin) avant → accord: oubliée.",
          },
          {
            scene: "Verbe pronominal",
            lines: [["", "Les deux équipes se sont ___ avant le match."]],
            options: ["affrontées", "affrontés", "affronté", "affrontée"],
            answer: "affrontées",
            explain: "Verbe pronominal réciproque: les deux équipes (féminin pluriel) + se (COD) avant → accord: affrontées.",
          },
          {
            scene: "Voix passive",
            lines: [["", "Ces règles ont été ___ par le comité la semaine dernière."]],
            options: ["établies", "établis", "établi", "établie"],
            answer: "établies",
            explain: "Passif avec être: accord avec le sujet (ces règles = féminin pluriel). Établies.",
          },
          {
            scene: "Avoir sans COD avant",
            lines: [["", "Ils ont ___ des erreurs dans ce rapport."]],
            options: ["fait", "faites", "faits", "faite"],
            answer: "fait",
            explain: "Avoir + COD après (des erreurs suit) → pas d'accord. Fait reste invariable.",
          },
          {
            scene: "Pronominal avec COD explicite",
            lines: [["", "Elle s'est ___ les cheveux ce matin."]],
            options: ["lavé", "lavée", "lavées", "lavés"],
            answer: "lavé",
            explain: "Pronominal avec COD explicite (les cheveux): se = COI, les cheveux = COD après le verbe → pas d'accord. Lavé invariable.",
          },
          {
            scene: "Pronom personnel COD",
            lines: [["", "Tu as vu les enfants? — Oui, je les ai ___ au parc."]],
            options: ["vus", "vu", "vue", "vues"],
            answer: "vus",
            explain: "Avoir + 'les' (COD masculin pluriel) avant → accord: vus. Les enfants (masculin pluriel) → vus.",
          },
        ],
      },
      {
        id: "level-2",
        title: "Dos concordancias en una frase",
        tag: "2 espacios",
        intro: "Completa con los dos participios correctamente concordados.",
        type: "dual",
        items: [
          {
            scene: "Soirée d'hier",
            lines: [["", "Marie et ses amies sont [[0]] ensemble et elles se sont bien [[1]]."]],
            blanks: [
              { options: ["sorties", "sortis", "sorti", "sortie"], answer: "sorties", explain: "Être + sujet féminin pluriel (Marie et ses amies): sorties. Avec être, accord toujours avec le sujet." },
              { options: ["amusées", "amusés", "amusé", "amusée"], answer: "amusées", explain: "Pronominal: se sont amusées. Sujet féminin pluriel + se = COD → accord: amusées." },
            ],
          },
          {
            scene: "Documents importants",
            lines: [["", "Les contrats que tu as [[0]] ont été [[1]] par le directeur ce matin."]],
            blanks: [
              { options: ["préparés", "préparé", "préparée", "préparées"], answer: "préparés", explain: "Avoir + 'que' (antécédent: les contrats, masculin pluriel): préparés. Accord avec le COD avant." },
              { options: ["signés", "signé", "signée", "signées"], answer: "signés", explain: "Voix passive avec être: accord avec le sujet (les contrats, masculin pluriel): signés." },
            ],
          },
          {
            scene: "Rencontre inattendue",
            lines: [["", "Nous nous sommes [[0]] par hasard et nous avons [[1]] une longue conversation."]],
            blanks: [
              { options: ["rencontrés", "rencontrées", "rencontré", "rencontrée"], answer: "rencontrés", explain: "Pronominal réciproque: nous nous sommes rencontrés. Sujet: nous (masculin ou mixte → masculin pluriel). Se = COD → accord: rencontrés." },
              { options: ["eu", "eue", "eus", "eues"], answer: "eu", explain: "Avoir + COD après (une longue conversation suit) → pas d'accord. Eu reste invariable." },
            ],
          },
          {
            scene: "Film de la semaine",
            lines: [["", "J'ai lu les critiques et je les ai [[0]]. Le film que j'ai [[1]] était décevant."]],
            blanks: [
              { options: ["trouvées", "trouvés", "trouvé", "trouvée"], answer: "trouvées", explain: "Avoir + 'les' (= les critiques, féminin pluriel) avant → accord: trouvées." },
              { options: ["vu", "vue", "vus", "vues"], answer: "vu", explain: "Avoir + 'que' (antécédent: le film, masculin singulier) avant → accord: vu. Film est masculin." },
            ],
          },
        ],
      },
      {
        id: "level-3",
        title: "Carta de una viajera",
        tag: "Texto guiado",
        intro: "Completa la carta de viaje con los participios correctamente concordados.",
        type: "guidedText",
        scene: "Sophie escribe a su familia desde su viaje por Europa.",
        text: "Chère famille! Je suis [[0]] à Rome il y a trois jours. J'ai [[1]] plusieurs musées et j'ai pris plein de photos — vous les verrez quand je serai [[2]]. Hier, j'ai rencontré deux Espagnoles très sympa. On s'est [[3]] dans la file d'attente du Colisée. On est [[4]] toutes les trois visiter le Forum romain ensemble. Les monuments que nous avons [[5]] étaient magnifiques. Ce soir, nous nous sommes [[6]] dans un petit restaurant. J'ai [[7]] une pasta délicieuse. La ville que j'ai [[8]] est absolument extraordinaire!",
        blanks: [
          { options: ["arrivée", "arrivé", "arrivées", "arrivés"], answer: "arrivée", explain: "Être + sujet féminin singulier (Sophie = je): arrivée. Je (= Sophie) est féminin." },
          { options: ["visité", "visitée", "visités", "visitées"], answer: "visité", explain: "Avoir + COD après (plusieurs musées suit) → pas d'accord. Visité invariable." },
          { options: ["rentrée", "rentré", "rentrées", "rentrés"], answer: "rentrée", explain: "Être + sujet féminin (je = Sophie): rentrée. Rentrer se conjugue avec être." },
          { options: ["rencontrées", "rencontrés", "rencontré", "rencontrée"], answer: "rencontrées", explain: "Pronominal réciproque: on s'est rencontrées. On désigne 3 femmes → féminin pluriel: rencontrées." },
          { options: ["allées", "allés", "allé", "allée"], answer: "allées", explain: "Être + sujet féminin pluriel (toutes les trois → on = elles): allées." },
          { options: ["vus", "vue", "vu", "vues"], answer: "vus", explain: "Avoir + 'que' (antécédent: les monuments, masculin pluriel) avant → accord: vus." },
          { options: ["retrouvées", "retrouvés", "retrouvé", "retrouvée"], answer: "retrouvées", explain: "Pronominal: nous nous sommes retrouvées. Nous = 3 femmes → féminin pluriel: retrouvées." },
          { options: ["mangé", "mangée", "mangés", "mangées"], answer: "mangé", explain: "Avoir + COD après (une pasta suit) → pas d'accord. Mangé invariable." },
          { options: ["découverte", "découvert", "découverts", "découvertes"], answer: "découverte", explain: "Avoir + 'que' (antécédent: la ville, féminin singulier) avant → accord: découverte." },
        ],
      },
      {
        id: "level-4",
        title: "Corrige los errores de concordancia",
        tag: "Texto libre",
        intro: "Escribe la forma correcta del participio en cada espacio.",
        type: "freeText",
        scene: "Estas oraciones contienen errores de concordancia. Escribe la forma correcta.",
        text: "La décision qu'ils ont pris* a surpris tout le monde. → [[0]] / Les filles se sont levé* très tôt ce matin. → [[1]] / J'ai apporté les documents et je vous les ai envoyé*. → [[2]] / Elle est parti* en vacances sans prévenir personne. → [[3]] / Nous avons vu les films que tu nous avais recommandé*. → [[4]]",
        blanks: [
          { answer: "prise", accepted: ["prise"], explain: "Avoir + 'que' (antécédent: la décision, féminin): prise. La décision qu'ils ont prise (accord avec féminin singulier)." },
          { answer: "levées", accepted: ["levées"], explain: "Pronominal: se sont levées. Sujet: les filles (féminin pluriel), se = COD → accord: levées." },
          { answer: "envoyés", accepted: ["envoyés"], explain: "Avoir + 'les' (= les documents, masculin pluriel) avant → accord: envoyés. Je vous les ai envoyés." },
          { answer: "partie", accepted: ["partie"], explain: "Être + sujet féminin (elle): partie. Partir se conjugue avec être → accord: partie." },
          { answer: "recommandés", accepted: ["recommandés"], explain: "Avoir + 'que' (antécédent: les films, masculin pluriel): recommandés. Les films que tu nous avais recommandés." },
        ],
      },
      {
        id: "level-5",
        title: "Producción: escribe con concordancias",
        tag: "Producción",
        intro: "Escribe oraciones con la concordancia correcta del participio.",
        type: "write",
        items: [
          {
            scene: "Verbe avec être",
            prompt: "Escribe sobre dos amigas (Emma y Léa) que llegaron juntas a la fiesta.",
            answer: "Emma et Léa sont arrivées ensemble à la fête — tout le monde les attendait.",
            accepted: ["sont arrivées", "arrivées"],
            explain: "Être + sujet féminin pluriel: arrivées. Emma et Léa = 2 femmes → -ées.",
          },
          {
            scene: "COD pronom avant",
            prompt: "Escribe que encontraste las llaves y las dejaste en la mesa. Usa 'les' como pronombre.",
            answer: "J'ai trouvé les clés et je les ai posées sur la table.",
            accepted: ["les ai posées", "les ai trouvées"],
            explain: "Avoir + 'les' (= les clés, féminin pluriel) avant → accord: posées. Clés est féminin pluriel.",
          },
          {
            scene: "Pronom relatif 'que'",
            prompt: "Escribe una oración sobre una película que viste usando la proposition relative.",
            answer: "La comédie que j'ai vue hier soir était absolument hilarante.",
            accepted: ["que j'ai vue", "que tu as vue", "que nous avons vue"],
            explain: "Avoir + 'que' (antécédent: la comédie, féminin singulier) avant → accord: vue.",
          },
          {
            scene: "Pronominal",
            prompt: "Describe cómo dos amigos se llamaron y luego se reconciliaron.",
            answer: "Ils se sont téléphoné et finalement ils se sont réconciliés.",
            accepted: ["se sont téléphoné", "se sont réconciliés"],
            explain: "Téléphoner à: se = COI → pas d'accord. Se réconcilier: se = COD → accord: réconciliés (masculin pluriel).",
          },
        ],
      },
      {
        id: "level-6",
        title: "Misión: relato con concordancias",
        tag: "Producción libre",
        intro: "Escribe 3 oraciones usando diferentes reglas de concordancia del participio pasado.",
        type: "write",
        items: [
          {
            scene: "Une soirée entre amis",
            prompt: "Narra una noche usando un verbe avec être (3 personas femeninas), un verbe avec avoir et COD avant.",
            answer: "Mes amies sont venues chez moi samedi soir. On a regardé les films qu'elles avaient choisis.",
            accepted: ["sont venues", "que + accord", "avaient choisis"],
            explain: "Être + féminin pluriel: venues. Avoir + 'que' (les films, m.pl.): choisis. Double concordance dans un texte naturel.",
          },
          {
            scene: "Objet retrouvé",
            prompt: "Describe que alguien encontró las llaves que habías perdido. Usa COD pronom et pronom relatif.",
            answer: "Quelqu'un a trouvé les clés que j'avais perdues et me les a rapportées.",
            accepted: ["les clés que j'avais perdues", "me les a rapportées"],
            explain: "Que (= les clés, f.pl.): perdues. Me les (= les clés, f.pl.): rapportées. Dos concordancias en una oración.",
          },
          {
            scene: "Verbe pronominal",
            prompt: "Escribe que dos mujeres se encontraron por primera vez y se saludaron.",
            answer: "Les deux femmes se sont rencontrées pour la première fois et se sont saluées chaleureusement.",
            accepted: ["se sont rencontrées", "se sont saluées"],
            explain: "Pronominaux réciproques: les deux femmes (f.pl.) + se = COD → rencontrées, saluées. Accord féminin pluriel.",
          },
        ],
      },
    ],
  },
}

export default topic
