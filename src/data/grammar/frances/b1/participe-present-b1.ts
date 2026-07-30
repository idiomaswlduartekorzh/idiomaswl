import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'participe-present-b1',
  order: '19',
  color: '#2563eb',
  category: 'Verbos',
  level: 'B1',
  title: 'Le Participe Présent en Francés B1',
  shortTitle: 'Participe Présent',
  metaTitle: "Participe Présent B1 — El participio presente en francés: formas y usos",
  description:
    "El participe présent (terminación -ant) se forma con el radical de la 1ª persona plural del presente. Se usa para expresar simultaneidad como adjetivo verbal, como proposición participiale, o equivalente a una oración de relativo. A diferencia del gérondif, el participe présent no lleva 'en' y puede tener sujeto diferente al verbo principal.",
  lead: "Aprende el participio presente del francés (-ant): cómo formarlo, cómo usarlo como adjetivo verbal y en proposiciones participiales, y cuándo elegirlo en lugar del gérondif.",
  outcomes: [
    "Formas el participe présent con la regla del radical de 'nous'",
    "Usas el participe présent como adjectif verbal con su concordancia",
    "Construyes proposiciones participiales con el participe présent",
    "Distingues el participe présent del gérondif (en + -ant)",
  ],

  guide: {
    goal: "Usar el participe présent correctamente como adjetivo, en proposiciones participiales y como equivalente de relative clauses.",
    model: "une femme souriante / Sachant qu'il était tard, elle a pris un taxi. / un professeur aimant son travail",
    formula: "Radical de nous + -ant | Invariable comme participe | Accordé comme adjectif verbal (-ant/-ante/-ants/-antes)",
    decisions: [
      "Formation: nous parlons → parl- → parlant; nous finissons → finiss- → finissant.",
      "Irréguliers: être → étant; avoir → ayant; savoir → sachant. Mêmes que le gérondif.",
      "Adjectif verbal: accordé en genre et nombre. 'une eau courante / des eaux courantes'. Quelques différences orthographiques vs participe.",
      "Proposición participiale: peut avoir un sujet différent au verbe principal. 'Le soleil se couchant, nous sommes rentrés.'",
      "Équivalent d'une relative: 'un étudiant travaillant beaucoup' = 'un étudiant qui travaille beaucoup'.",
      "Différence avec le gérondif: participe présent = sans 'en', peut changer de sujet; gérondif = avec 'en', même sujet obligatoire.",
      "Simultanéité ou cause: 'Voyant qu'il allait pleuvoir, elle a pris son parapluie.' (cause → car elle voyait...)",
    ],
    table: [
      ["Verbe", "Participe présent", "Adjectif verbal (f.)"],
      ["parler", "parlant", "parlante"],
      ["sourire", "souriant", "souriante"],
      ["obéir", "obéissant", "obéissante"],
    ],
    mistakes: [
      "\"en sachant\" = gérondif (même sujet) | \"sachant que\" = participe présent (peut changer de sujet) — ne pas confondre.",
      "\"une femme souriant\" ❌ comme adjectif — accord obligatoire: \"une femme souriante\" ✓.",
      "\"Il mange en lisant\" ✓ gérondif (même sujet) | \"Il mange, lisant son journal\" ✓ participe présent (style littéraire).",
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma y se usa el participe présent en francés?',
      paragraphs: [
        "El participe présent se forma de la misma manera que el gérondif: se toma el radical de la primera persona del plural del présent de l'indicatif y se añade -ant. Nous parlons → parlant; nous finissons → finissant; nous prenons → prenant. Los mismos tres irregulares que en el gérondif: être → étant, avoir → ayant, savoir → sachant. Como forma verbal, el participe présent es invariable (no concuerda en género ni número).",
        "El participe présent tiene varios usos: como forma verbal equivalente a una proposición de relatif ('des étudiants travaillant la nuit' = 'des étudiants qui travaillent la nuit'), para expresar causa o simultaneidad con posibilidad de cambio de sujeto ('Entendant le bruit, il s'est réveillé'), y como adjectif verbal cuando modifica directamente un sustantivo (en este caso sí concuerda: 'une eau courante', 'des résultats satisfaisants').",
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre participe présent y adjectif verbal?',
      paragraphs: [
        "Cuando el participe présent funciona como adjetivo verbal (avant ou après un nom, avec être), debe concordar en género y número: 'Il est souriant' (m.sg.), 'Elle est souriante' (f.sg.), 'Ils sont souriants' (m.pl.), 'Elles sont souriantes' (f.pl.). Algunos adjectifs verbaux tienen una ortografía diferente a la del participe présent: communicant (participe) vs communicant (adj.) — a veces igual; fatigant (adj.) vs fatiguant (participe); négligent (adj.) vs négligeant (participe).",
        "La regla práctica: si funciona como verbo (tiene un COD, un adverbe, une prop. subordonnée), usa la forma invariable; si funciona como adjetivo (se puede sustituir por otro adjetivo), usa la forma concordada. 'C'est un résultat satisfaisant' (adjectif → satisfaisante/satisfaisants). 'C'est un travail satisfaisant toutes nos exigences' (verbe avec COD → invariable). En la práctica, muchos adjectifs verbaux han evolucionado desde el participe présent y se escriben y se conjugan como adjetivos regulares.",
      ],
      table: [
        ["Función", "Concordancia", "Ejemplo"],
        ["Verbe (participial)", "invariable", "des étudiants travaillant dur"],
        ["Adjectif verbal", "accordé", "une femme souriante"],
        ["Participe dans gérondif", "invariable", "en travaillant"],
      ],
    },
    {
      heading: '¿Qué es la proposición participial en francés?',
      paragraphs: [
        "La gran diferencia entre el participe présent y el gérondif es que el participe présent puede tener un sujeto diferente al del verbo principal, mientras que el gérondif siempre comparte el sujeto. 'Le soleil se couchant, nous sommes rentrés à la maison' (El sol se ponía/poniente, volvimos a casa) — el sol es el sujeto del participio, nosotros somos el sujeto del verbo principal. Esta construcción de proposition participiale absolue es más literaria y formal.",
        "Las proposiciones participiales con causa: 'Sachant qu'il était en retard, il a pris un taxi' (Sabiendo que llegaba tarde, tomó un taxi — puede interpretarse como causal: ya que sabía...). 'N'ayant pas d'argent, il ne pouvait pas payer' (No teniendo dinero / Como no tenía dinero, no podía pagar). Este uso con participe présent compuesto (ayant + participe passé) expresa anterioridad: la acción del participio ocurrió antes que la del verbo principal.",
      ],
    },
  ],

  visual: {
    mode: "scene",
    teacherLens: "Participe présent (-ant): sin 'en' (distingue del gérondif), puede tener sujeto diferente, como adjectif verbal concuerda. Tres irregulares: étant/ayant/sachant.",
    graphicPrompt: "Comparación visual entre participe présent (sin en) y gérondif (con en), con ejemplos de cada uso.",
    scene: [
      ["C'est une situation préoccupante — je ne sais pas quoi faire.", "Es una situación preocupante — no sé qué hacer."],
      ["Sachant qu'elle était fatiguée, il a décidé de ne pas insister.", "Sabiendo que estaba cansada, decidió no insistir."],
      ["Les enfants jouant dans le jardin faisaient beaucoup de bruit.", "Los niños que jugaban en el jardín hacían mucho ruido."],
      ["Ayant terminé son travail, elle est allée se promener.", "Habiendo terminado su trabajo, salió a pasear."],
      ["On cherche des candidats parlant plusieurs langues.", "Buscamos candidatos que hablen varios idiomas."],
      ["N'ayant pas de réponse, il a relancé l'email.", "Al no tener respuesta, reenvió el email."],
      ["C'est une offre très tentante — j'hésite vraiment.", "Es una oferta muy tentadora — realmente dudo."],
      ["Le temps se refroidissant, on a rentré les plantes.", "Al refrescarse el tiempo, entramos las plantas."],
    ],
    learnerModes: ["reading", "typing", "choosing"],
    reviewFocus: ["formación radical + -ant", "adjectif verbal accordé", "différence avec gérondif"],
  },

  practice: {
    levels: [
      {
        id: "level-1",
        title: "Forma el participe présent",
        tag: "Opción múltiple",
        intro: "Elige la forma correcta del participe présent.",
        type: "choice",
        items: [
          {
            scene: "Formación regular",
            lines: [["", "C'est une nouvelle très ___. (inquiéter)"]],
            options: ["inquiétante", "inquiétant", "inquiète", "inquiétée"],
            answer: "inquiétante",
            explain: "Inquiéter: nous inquiétons → inquiétant. Función de adjectif verbal con sustantivo féminin (nouvelle) → inquiétante (accordée).",
          },
          {
            scene: "Proposición participial",
            lines: [["", "___ qu'il était en retard, il a envoyé un message."]],
            options: ["Sachant", "En sachant", "Sachant que", "Savoir"],
            answer: "Sachant",
            explain: "Savoir irrégulier: sachant. Proposición participial de causa: Sachant qu'il était en retard = ya que sabía / sabiendo que. Sin 'en' (gérondif).",
          },
          {
            scene: "Adjectif verbal",
            lines: [["", "Nous cherchons des personnes ___ et ___. (motiver / communiquer)"]],
            options: ["motivées / communicantes", "motivant / communicant", "motivées / communicant", "motivés / communicants"],
            answer: "motivées / communicantes",
            explain: "Adjectifs verbaux accordés au féminin pluriel (personnes). Motivées: fém. plur. Communicantes: adjectif verbal de communiquer.",
          },
          {
            scene: "Participe présent composé",
            lines: [["", "___ tout son argent, il ne pouvait plus voyager. (avoir dépensé)"]],
            options: ["Ayant dépensé", "Étant dépensé", "Dépensant", "En ayant dépensé"],
            answer: "Ayant dépensé",
            explain: "Participe présent composé: avoir → ayant + participe passé (dépensé). Expresa anterioridad: habiendo gastado todo su dinero.",
          },
          {
            scene: "Equivalent relative",
            lines: [["", "On cherche un ingénieur ___ l'anglais couramment."]],
            options: ["parlant", "parlante", "en parlant", "qui parlant"],
            answer: "parlant",
            explain: "Participe présent como equivalent de relative: parlant l'anglais = qui parle l'anglais. Invariable (función verbal). Pas d'accord.",
          },
          {
            scene: "Distinguer gérondif et participe",
            lines: [["", "Le train ___, les voyageurs sont montés à bord."]],
            options: ["arrivant", "en arrivant", "étant arrivé", "arrivé"],
            answer: "arrivant",
            explain: "Proposition participiale absolue: le train arrivant (sujeto ≠ del verbo principal). Sin 'en'. Le train est le sujet du participe.",
          },
          {
            scene: "Irrégulier",
            lines: [["", "___ toutes les difficultés, elle a quand même réussi."]],
            options: ["Ayant affronté", "En ayant affronté", "Étant affrontée", "Affrontant"],
            answer: "Ayant affronté",
            explain: "Participe présent composé avec avoir: ayant + participe passé. Affronté (régulier): ayant affronté. Expresa anterioridad y causa.",
          },
          {
            scene: "Adjectif verbal concordance",
            lines: [["", "J'ai trouvé une solution ___. (satisfaire)"]],
            options: ["satisfaisante", "satisfaisant", "satisfaisants", "satisfaite"],
            answer: "satisfaisante",
            explain: "Satisfaire: nous satisfaisons → satisfaisant (participe). Comme adjectif verbal féminin: satisfaisante (solution est féminin).",
          },
        ],
      },
      {
        id: "level-2",
        title: "Construye proposiciones participiales",
        tag: "2 espacios",
        intro: "Completa las proposiciones participiales con los elementos correctos.",
        type: "dual",
        items: [
          {
            scene: "Causa y simultaneidad",
            lines: [["", "[[0]] très fatigué, il a décidé [[1]] se coucher tôt."]],
            blanks: [
              { options: ["Étant", "En étant", "Être", "Ayant été"], answer: "Étant", explain: "Être → étant. Proposición participial de causa: Étant très fatigué = como estaba muy cansado. Mismo sujeto que el verbo principal." },
              { options: ["de", "à", "que", "pour"], answer: "de", explain: "Décider de + infinitif: il a décidé de se coucher. La preposición de es obligatoria con décider." },
            ],
          },
          {
            scene: "Oferta de trabajo",
            lines: [["", "On cherche des candidats [[0]] l'anglais et [[1]] une expérience internationale."]],
            blanks: [
              { options: ["maîtrisant", "maîtrisants", "maîtrisantes", "en maîtrisant"], answer: "maîtrisant", explain: "Participe présent invariable (función verbal con COD: l'anglais). Maîtriser: nous maîtrisons → maîtrisant. Equivale a: qui maîtrisent." },
              { options: ["ayant", "étant", "avoir", "eu"], answer: "ayant", explain: "Avoir → ayant. Participe présent composé: ayant + participe passé. Aquí solo ayant + nom: ayant une expérience = qui ont une expérience." },
            ],
          },
          {
            scene: "Descripción literaria",
            lines: [["", "La nuit [[0]], les oiseaux ont cessé de chanter et un silence [[1]] s'est installé."]],
            blanks: [
              { options: ["tombant", "tombante", "en tombant", "tomber"], answer: "tombant", explain: "Tomber: nous tombons → tombant. Prop. participiale absolue: la nuit tombant = al caer la noche. Sujeto diferente (la nuit / les oiseaux)." },
              { options: ["pesant", "pesante", "pesants", "en pesant"], answer: "pesant", explain: "Peser: nous pesons → pesant. Adjectif verbal: silence pesant = un silencio opresivo. Masculin singulier → pesant (pas d'accord: silence est m.)." },
            ],
          },
          {
            scene: "Participe composé",
            lines: [["", "[[0]] toutes ses économies dans ce projet, il a dû [[1]] un prêt."]],
            blanks: [
              { options: ["Ayant investi", "Étant investi", "Investissant", "En investissant"], answer: "Ayant investi", explain: "Participe présent composé: ayant (avoir → ayant) + investi (participe passé). Expresa anterioridad: habiendo invertido todos sus ahorros." },
              { options: ["demander", "demandant", "en demandant", "demandé"], answer: "demander", explain: "Devoir + infinitif: il a dû demander un prêt. L'infinitif suit le verbe modal dû." },
            ],
          },
        ],
      },
      {
        id: "level-3",
        title: "Anuncio de empleo literario",
        tag: "Texto guiado",
        intro: "Completa este anuncio de empleo usando el participe présent o el adjectif verbal.",
        type: "guidedText",
        scene: "Una empresa publica un anuncio de trabajo muy detallado buscando candidatos con características específicas.",
        text: "Nous recrutons un responsable marketing [[0]] et [[1]]. Le candidat idéal est une personne [[2]], [[3]] plusieurs langues et [[4]] le monde du digital. Il ou elle doit être capable de proposer des solutions [[5]] à nos clients. [[0]] la direction commerciale de nos résultats, il ou elle saura adapter notre stratégie. [[6]] une première expérience en agence, vous ferez rapidement partie de notre équipe. Les candidats [[7]] par ce poste sont invités à envoyer leur CV avant le 30 mars.",
        blanks: [
          { options: ["dynamique", "dynamiques", "dynamisant", "dynamisante"], answer: "dynamique", explain: "Adjectif ordinaire (pas de participe présent ici). Nous recrutons un responsable dynamique et... Les adjectifs qualificatifs normaux no cambian." },
          { options: ["créatif", "créatifs", "créant", "créante"], answer: "créatif", explain: "Adjectif ordinaire: créatif (masculin singulier, responsable est masculin). Dynamique et créatif." },
          { options: ["motivée", "motivant", "motivée ou motivé", "motivé(e)"], answer: "motivée", explain: "Adjectif verbal accordé: une personne (féminin) → motivée. Comme adjectif: accordé avec le nom." },
          { options: ["maîtrisant", "maîtrisante", "maîtrisants", "en maîtrisant"], answer: "maîtrisant", explain: "Participe présent invariable (verbe avec COD: plusieurs langues). Maîtrisant plusieurs langues = qui maîtrise plusieurs langues." },
          { options: ["connaissant", "connaissante", "connaissants", "connue"], answer: "connaissant", explain: "Participe présent invariable (verbe avec COD: le monde du digital). Connaissant = qui connaît." },
          { options: ["satisfaisantes", "satisfaisant", "satisfaisants", "satisfaite"], answer: "satisfaisantes", explain: "Adjectif verbal accordé féminin pluriel (solutions). Satisfaisant → satisfaisantes (fem. pl.)." },
          { options: ["Ayant", "Étant", "Sachant", "En ayant"], answer: "Ayant", explain: "Avoir → ayant. Proposición participial de condición: Ayant une première expérience = si vous avez une première expérience." },
          { options: ["intéressés", "intéressant", "intéressants", "intéressées"], answer: "intéressés", explain: "Participe passé (pas présent ici): les candidats intéressés (qui sont intéressés). Adjectif verbal: intéressé accordé au masculin pluriel (candidats)." },
        ],
      },
      {
        id: "level-4",
        title: "Transforma con participe présent",
        tag: "Texto libre",
        intro: "Transforma las propositions relatives en participes présents.",
        type: "freeText",
        scene: "Reescribe estas oraciones sustituyendo la proposition relative por un participe présent.",
        text: "1. C'est un professeur qui explique bien. → C'est un professeur [[0]] bien. / 2. J'ai vu des étudiants qui dormaient en cours. → J'ai vu des étudiants [[1]] en cours. / 3. Comme il ne savait pas la réponse, il a gardé le silence. → [[2]] la réponse, il a gardé le silence. / 4. Après qu'elle a terminé son travail, elle est sortie. → [[3]] son travail, elle est sortie. / 5. Les touristes qui cherchent un hôtel bon marché peinent à en trouver un. → Les touristes [[4]] un hôtel bon marché peinent à en trouver un.",
        blanks: [
          { answer: "expliquant", accepted: ["expliquant"], explain: "Expliquer: nous expliquons → expliquant. Participe présent invariable remplace qui explique. Un professeur expliquant bien." },
          { answer: "dormant", accepted: ["dormant"], explain: "Dormir: nous dormons → dormant. Invariable: des étudiants dormant en cours. Équivalent de qui dormaient." },
          { answer: "Ne sachant pas", accepted: ["Ne sachant pas", "Sachant qu'il ne"], explain: "Savoir irrégulier → sachant. Négation du participe: ne... sachant pas. Ne sachant pas la réponse = comme il ne savait pas." },
          { answer: "Ayant terminé", accepted: ["Ayant terminé"], explain: "Participe présent composé: avoir → ayant + terminé. Anterioridad: Ayant terminé son travail = après avoir terminé. Féminin (elle) mais participe invariable." },
          { answer: "cherchant", accepted: ["cherchant"], explain: "Chercher: nous cherchons → cherchant. Invariable: les touristes cherchant un hôtel. Équivalent de qui cherchent." },
        ],
      },
      {
        id: "level-5",
        title: "Producción: usa el participe présent",
        tag: "Producción",
        intro: "Escribe oraciones usando el participe présent según las instrucciones.",
        type: "write",
        items: [
          {
            scene: "Equivalente de relative",
            prompt: "Escribe sobre personas que buscan trabajo usando el participe présent en lugar de la relative.",
            answer: "Les personnes cherchant un emploi peuvent consulter notre site d'offres.",
            accepted: ["cherchant un emploi", "recherchant un emploi"],
            explain: "Participe présent: cherchant = qui cherchent. Invariable car fonction verbale (avec COD: un emploi).",
          },
          {
            scene: "Adjectif verbal",
            prompt: "Describe una situación alarmante usando un adjectif verbal concordado.",
            answer: "C'est une situation vraiment alarmante — il faut agir immédiatement.",
            accepted: ["alarmante", "inquiétante", "préoccupante"],
            explain: "Adjectif verbal accordé: alarmante (féminin singulier, avec situation). Alarmer → alarmant → alarmante.",
          },
          {
            scene: "Proposición participial de causa",
            prompt: "Expresa la causa con participe présent: como no tenía dinero, no pudo pagar.",
            answer: "N'ayant pas d'argent, il n'a pas pu payer.",
            accepted: ["N'ayant pas d'argent", "Ayant", "n'ayant pas"],
            explain: "Participe présent composé négatif: n'ayant pas (ne + ayant + pas). N'ayant pas d'argent = puisqu'il n'avait pas d'argent.",
          },
          {
            scene: "Proposition participiale absolue",
            prompt: "Escribe una proposición participial con sujeto diferente: la lluvia comenzó / entraron en casa.",
            answer: "La pluie commençant à tomber, ils sont rentrés à la maison.",
            accepted: ["La pluie commençant", "Le soir tombant", "Le vent se levant"],
            explain: "Proposición participial absolue: la pluie (sujeto del participio) ≠ ils (sujeto del verbo principal). Commençant: invariable.",
          },
        ],
      },
      {
        id: "level-6",
        title: "Misión: texto con participes présents",
        tag: "Producción libre",
        intro: "Escribe 3 oraciones usando participes présents en diferentes funciones.",
        type: "write",
        items: [
          {
            scene: "Descripción de un candidato",
            prompt: "Describe a un candidato ideal usando participe présent como equivalente de relative (2 características).",
            answer: "On recherche un candidat maîtrisant l'anglais et connaissant le secteur informatique.",
            accepted: ["maîtrisant", "connaissant", "parlant", "ayant"],
            explain: "Participe présent invariable como equivalente de qui + verbe. Dos participes coordinados con et.",
          },
          {
            scene: "Adjectif verbal",
            prompt: "Describe una película usando dos adjectifs verbaux concordados.",
            answer: "C'est un film passionnant avec une intrigue surprenante et des personnages attachants.",
            accepted: ["passionnant", "surprenante", "attachants", "émouvants"],
            explain: "Adjectifs verbaux accordés: passionnant (m.sg. = un film), surprenante (f.sg. = une intrigue), attachants (m.pl. = des personnages).",
          },
          {
            scene: "Proposición participial de causa",
            prompt: "Expresa una causa usando 'ayant + participe passé' (habiendo + participio).",
            answer: "Ayant travaillé toute la semaine sans repos, elle avait besoin d'une vraie pause.",
            accepted: ["Ayant travaillé", "Ayant + participe"],
            explain: "Participe présent composé: ayant (avoir → ayant) + travaillé (participe passé). Expresa anterioridad y causa. Féminin (elle) pero participe invariable.",
          },
        ],
      },
    ],
  },
}

export default topic
