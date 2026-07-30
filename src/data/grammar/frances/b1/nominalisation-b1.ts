import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'nominalisation-b1',
  order: '20',
  color: '#2563eb',
  category: 'Vocabulario',
  level: 'B1',
  title: 'La Nominalisation en Francés B1',
  shortTitle: 'Nominalisation',
  metaTitle: "Nominalisation B1 — Transformar verbos y adjetivos en sustantivos en francés",
  description:
    "La nominalisation consiste en transformar verbos y adjetivos en sustantivos para variar el estilo, especialmente en textos escritos formales. En francés, los sufijos más productivos son -tion/-sion (partir → la partition), -ment (développer → le développement), -ure (fermer → la fermeture), -age (laver → le lavage), y el infinitif nominalisé (le savoir, le pouvoir).",
  lead: "Aprende a nominalizar verbos y adjetivos en francés: sus sufijos principales, cómo enriquecer tu expresión escrita y cómo reconocer formas nominalizadas en textos auténticos.",
  outcomes: [
    "Formas sustantivos desde verbos usando los sufijos -tion, -ment, -age, -ure, -ée",
    "Derivas sustantivos desde adjetivos con -ité, -eur, -ance, -esse",
    "Transformas oraciones verbales en construcciones nominales para el registro formal",
    "Reconoces y usas la nominalización en textos periodísticos y académicos",
  ],

  guide: {
    goal: "Enriquecer el vocabulario y variar el estilo transformando verbos y adjetivos en sustantivos con los sufijos correctos.",
    model: "développer → le développement / réduire → la réduction / arriver → une arrivée / libre → la liberté",
    formula: "Verbe + suffixe → nom | Adjectif + suffixe → nom | Infinitif → nom (le savoir, le fait de)",
    decisions: [
      "Suffixe -tion/-sion: transformer → la transformation; décider → la décision; communiquer → la communication.",
      "Suffixe -ment: développer → le développement; gouverner → le gouvernement; améliorer → l'amélioration (attention: ici -tion).",
      "Suffixe -age: laver → le lavage; voyager → le voyage; chauffer → le chauffage.",
      "Suffixe -ure: fermer → la fermeture; ouvrir → l'ouverture; casser → la cassure.",
      "Suffixe -ée: arriver → une arrivée; entrée/sortie: entrer → une entrée.",
      "Adjectifs: libre → la liberté (-ité); beau → la beauté; actif → l'activité; juste → la justice.",
      "Infinitif nominalisé: le savoir, le pouvoir, le devoir, le faire, le dire — le + infinitif.",
    ],
    table: [
      ["Suffixe", "Verbe/Adjectif", "Substantif"],
      ["-tion / -sion", "communiquer / décider", "la communication / la décision"],
      ["-ment", "développer / gouverner", "le développement / le gouvernement"],
      ["-ité", "libre / actif", "la liberté / l'activité"],
    ],
    mistakes: [
      "\"le amélioration\" ❌ — Élision: \"l'amélioration\" ✓. Les substantifs commençant par voyelle: l'.",
      "Confondre genre: la décision (fém.), le développement (masc.) — apprendre le genre avec le mot.",
      "\"faire une développement\" ❌ — masc.: \"faire un développement\" ✓.",
    ],
  },

  seo: [
    {
      heading: '¿Qué es la nominalización en francés y para qué sirve?',
      paragraphs: [
        "La nominalización es el proceso de convertir un verbo o un adjetivo en un sustantivo. Es fundamental en el francés escrito formal, periodístico y académico. En lugar de 'Le gouvernement a décidé de réduire les impôts' (con verbo), se puede escribir 'La décision du gouvernement de réduire les impôts...' (con sustantivo). La nominalización permite condensar información, variar el estilo y crear un registro más objetivo y formal.",
        "Para hispanohablantes, la nominalización es muy familiar: en español también transformamos verbos en sustantivos (correr → la carrera, llegar → la llegada). En francés, los mecanismos son similares aunque los sufijos difieren. Dominar la nominalización es esencial para escribir buenos textos de nivel B1-B2 y para leer con comprensión artículos de prensa, informes y textos académicos franceses.",
      ],
    },
    {
      heading: '¿Cuáles son los sufijos de nominalización en francés?',
      paragraphs: [
        "Los sufijos verbales más frecuentes: -tion/-sion (para verbos en -er/-ir/-re: communiquer → la communication, décider → la décision, comprendre → la compréhension), -ment (especialmente para verbos -er: développer → le développement, établir → l'établissement), -age (lavage, chauffage, voyage), -ure (fermeture, ouverture, blessure), y -ée (arrivée, entrée, sortie, journée). Muchos verbos tienen más de un sustantivo posible con significados diferentes: changer → le changement (el proceso de cambio) / la change (poco usado); arriver → l'arrivée (la llegada).",
        "Para los adjetivos: -ité (actif → l'activité; libre → la liberté; possible → la possibilité), -eur (chaleureux → la chaleur; supérieur → la supériorité), -ance/-ence (patient → la patience; différent → la différence), -esse (gentil → la gentillesse; doux → la douceur — -eur), -ise (franc → la franchise; sage → la sagesse). Estas formaciones son productivas y permiten construir vocabulario de forma sistemática a partir de palabras ya conocidas.",
      ],
      table: [
        ["Adjectif", "Suffixe", "Substantif"],
        ["libre", "-ité", "la liberté"],
        ["patient", "-ence", "la patience"],
        ["gentil", "-esse", "la gentillesse"],
      ],
    },
    {
      heading: '¿Dónde se usa la nominalización en francés?',
      paragraphs: [
        "En los periódicos y textos académicos franceses, la nominalización es omnipresente. Los titulares usan constantemente sustantivos en lugar de verbos: 'Hausse des prix alimentaires' (en lugar de 'Les prix alimentaires ont augmenté'), 'Accord entre les deux parties' (en lugar de 'Les deux parties ont trouvé un accord'). Esta condensación nominal hace el texto más informativo y objetivo.",
        "Transformar oraciones verbales en nominales: 'Le président a annoncé qu'il réduirait les dépenses' → 'L'annonce par le président d'une réduction des dépenses'. Esta transformación implica: verbe → nom (annoncé → l'annonce), sujet → complément (le président → par le président), COD/clause → nom (réduirait les dépenses → d'une réduction des dépenses). Practicar esta transformación ayuda a entender y producir textos de nivel superior en francés.",
      ],
    },
  ],

  visual: {
    mode: "scene",
    teacherLens: "Nominalización: verbos y adjetivos → sustantivos con sufijos (-tion, -ment, -ité, -eur, -ance). Esencial para el registro formal y el vocabulario avanzado.",
    graphicPrompt: "Flecha de transformación entre verbo/adjetivo y sustantivo, con el sufijo etiquetado en color.",
    scene: [
      ["Le développement économique de la région est remarquable.", "El desarrollo económico de la región es notable."],
      ["La fermeture de l'usine a causé beaucoup de chômage.", "El cierre de la fábrica causó mucho desempleo."],
      ["La liberté d'expression est un droit fondamental.", "La libertad de expresión es un derecho fundamental."],
      ["L'amélioration des conditions de travail est une priorité.", "La mejora de las condiciones de trabajo es una prioridad."],
      ["La gentillesse de cet accueil m'a beaucoup touché.", "La amabilidad de esta acogida me ha conmovido mucho."],
      ["La réduction des émissions de CO₂ est urgente.", "La reducción de las emisiones de CO₂ es urgente."],
      ["Le gouvernement a annoncé la création de nouveaux emplois.", "El gobierno anunció la creación de nuevos empleos."],
      ["Sa patience et sa générosité sont ses plus grandes qualités.", "Su paciencia y su generosidad son sus mejores cualidades."],
    ],
    learnerModes: ["reading", "typing", "choosing"],
    reviewFocus: ["-tion/-ment/-age/-ité", "género del substantif", "transformation oracion verbal → nominal"],
  },

  practice: {
    levels: [
      {
        id: "level-1",
        title: "Identifica el sustantivo correcto",
        tag: "Opción múltiple",
        intro: "Elige el sustantivo nominalizado correcto a partir del verbo o adjetivo dado.",
        type: "choice",
        items: [
          {
            scene: "Verbe → nom (-tion)",
            lines: [["", "communiquer → ___"]],
            options: ["la communication", "le communication", "la communiquement", "la communiquétion"],
            answer: "la communication",
            explain: "Communiquer → communication (verbo en -quer → -cation). Genre féminin: la communication. Sufijo -tion muy productivo para verbos en -er.",
          },
          {
            scene: "Verbe → nom (-ment)",
            lines: [["", "développer → ___"]],
            options: ["le développement", "la développement", "le développation", "le développ"],
            answer: "le développement",
            explain: "Développer → le développement. Sufijo -ment (masculin). Transformación frecuente: verbes en -er → -ement.",
          },
          {
            scene: "Verbe → nom (-age)",
            lines: [["", "Quel est le nom de l'action de 'chauffer'?"]],
            options: ["le chauffage", "la chauffure", "le chauffement", "la chauffe"],
            answer: "le chauffage",
            explain: "Chauffer → le chauffage. Sufijo -age: frecuente para procesos técnicos (lavage, chauffage, voyage, passage).",
          },
          {
            scene: "Verbe → nom (-ure)",
            lines: [["", "ouvrir → ___"]],
            options: ["l'ouverture", "l'ouvertion", "le ouvert", "l'ouvrement"],
            answer: "l'ouverture",
            explain: "Ouvrir → l'ouverture. Sufijo -ure (féminin). Élision: l'ouverture. Paires: ouvrir/ouverture, fermer/fermeture.",
          },
          {
            scene: "Adjectif → nom (-ité)",
            lines: [["", "actif (active) → ___"]],
            options: ["l'activité", "l'actifité", "l'activeté", "l'activisme"],
            answer: "l'activité",
            explain: "Actif → l'activité. Sufijo -ité convierte adjetivos en sustantivos abstractos: actif/active → activité, libre → liberté.",
          },
          {
            scene: "Adjectif → nom (-ence)",
            lines: [["", "différent → ___"]],
            options: ["la différence", "la différentation", "le différement", "la différentité"],
            answer: "la différence",
            explain: "Différent → la différence. Muchos adjetivos en -ent/-ant → sustantivo en -ence/-ance: patient → la patience.",
          },
          {
            scene: "Verbe → nom (-ée)",
            lines: [["", "arriver → ___"]],
            options: ["l'arrivée", "l'arrivation", "l'arrivure", "l'arrivément"],
            answer: "l'arrivée",
            explain: "Arriver → l'arrivée. Sufijo -ée (féminin): arrivée, entrée, sortie, journée, soirée, matinée. Frecuente para acciones puntuales.",
          },
          {
            scene: "Adjectif → nom (-esse)",
            lines: [["", "gentil (gentille) → ___"]],
            options: ["la gentillesse", "la gentilité", "la gentillure", "le gentillement"],
            answer: "la gentillesse",
            explain: "Gentil → la gentillesse. Sufijo -esse para adjetivos de cualidad humana: gentil → gentillesse, triste → tristesse, sage → sagesse.",
          },
        ],
      },
      {
        id: "level-2",
        title: "Transforma con el sufijo correcto",
        tag: "2 espacios",
        intro: "Completa las nominalizaciones con el artículo y el sufijo correctos.",
        type: "dual",
        items: [
          {
            scene: "Titular de prensa",
            lines: [["", "Le gouvernement annonce [[0]] (réduire) [[1]] (dépenser) publiques."]],
            blanks: [
              { options: ["la réduction", "le réduction", "la réduire", "le réduisage"], answer: "la réduction", explain: "Réduire → la réduction. Sufijo -tion (féminin). Le gouvernement annonce la réduction des..." },
              { options: ["des dépenses", "du dépensement", "la dépense", "les dépensures"], answer: "des dépenses", explain: "Dépenser → la dépense (no es nominalización aquí, es sustantivo ya existente). Des dépenses publiques = los gastos públicos." },
            ],
          },
          {
            scene: "Informe empresarial",
            lines: [["", "Nous constatons [[0]] (améliorer) significative de nos résultats et [[1]] (développer) de nouveaux marchés."]],
            blanks: [
              { options: ["une amélioration", "un améliorement", "une améliore", "un amélioration"], answer: "une amélioration", explain: "Améliorer → une amélioration (féminin). Sufijo -tion. Une amélioration significative." },
              { options: ["le développement", "la développement", "le développation", "une développée"], answer: "le développement", explain: "Développer → le développement (masculin). Sufijo -ment. Le développement de nouveaux marchés." },
            ],
          },
          {
            scene: "Descripción de una persona",
            lines: [["", "Ce qu'on apprécie chez lui, c'est sa [[0]] (patient) et sa [[1]] (généreux)."]],
            blanks: [
              { options: ["patience", "patientité", "patientment", "patientesse"], answer: "patience", explain: "Patient → la patience. Sufijo -ence. Sa patience = su paciencia. Adjectif en -ent → substantif en -ence." },
              { options: ["générosité", "généreuseté", "généreurité", "généreuseesse"], answer: "générosité", explain: "Généreux → la générosité. Sufijo -ité. Sa générosité = su generosidad. Généreux (adj.) → générosité (nom)." },
            ],
          },
          {
            scene: "Artículo de opinión",
            lines: [["", "[[0]] (libérer) de la presse et [[1]] (informer) du public sont des piliers de la démocratie."]],
            blanks: [
              { options: ["La libération", "Le libérement", "La liberture", "Le libéral"], answer: "La libération", explain: "Libérer → la libération. Sufijo -tion (féminin). La libération de la presse = la libertad de prensa (acto de liberar)." },
              { options: ["L'information", "Le informement", "L'informage", "La informe"], answer: "L'information", explain: "Informer → l'information (féminin). Sufijo -tion. Élision: l'information. L'information du public = la información del público." },
            ],
          },
        ],
      },
      {
        id: "level-3",
        title: "Artículo de prensa",
        tag: "Texto guiado",
        intro: "Completa este artículo de prensa usando nominalizaciones.",
        type: "guidedText",
        scene: "Un artículo de prensa sobre políticas medioambientales usa numerosas nominalizaciones.",
        text: "[[0]] (lutter) contre le réchauffement climatique est une urgence mondiale. Le sommet international a permis [[1]] (conclure) d'un accord historique entre les nations participantes. Les pays signataires s'engagent à [[2]] (réduire) de 40% de leurs émissions de CO₂ d'ici 2035. [[3]] (adopter) de ces nouvelles mesures marque un tournant important. Cependant, [[4]] (mettre en oeuvre) de ces engagements reste le véritable défi. Certains experts soulignent [[5]] (nécessaire) d'actions concrètes et immédiates. [[6]] (espérer) que les générations futures pourront bénéficier de ces efforts est ce qui motive les militants écologistes.",
        blanks: [
          { options: ["La lutte", "Le luttement", "La luttation", "Le lutter"], answer: "La lutte", explain: "Lutter → la lutte (féminin). Sustantivo ya formado (no sufijo regular). La lutte contre... = La lucha contra..." },
          { options: ["la conclusion", "le concluement", "la concluure", "le conclu"], answer: "la conclusion", explain: "Conclure → la conclusion (féminin). Sufijo -sion. Permettre + la conclusion d'un accord = la conclusión de un acuerdo." },
          { options: ["la réduction", "le réducement", "la réduire", "le réduisage"], answer: "la réduction", explain: "Réduire → la réduction (féminin). Sufijo -tion. S'engager à la réduction de... = comprometerse a la reducción de..." },
          { options: ["L'adoption", "Le adoptement", "La adoptation", "L'adopter"], answer: "L'adoption", explain: "Adopter → l'adoption (féminin). Élision: l'adoption. L'adoption de ces mesures = la adopción de estas medidas." },
          { options: ["la mise en oeuvre", "le mettement", "la metteure", "le mise"], answer: "la mise en oeuvre", explain: "Mettre en oeuvre → la mise en oeuvre. Expresión nominal fija: la mise en oeuvre = la implementación/puesta en marcha." },
          { options: ["la nécessité", "la nécessaire", "le nécessaire", "la nécessitation"], answer: "la nécessité", explain: "Nécessaire (adj.) → la nécessité (nom). Sufijo -ité. La nécessité d'actions = la necesidad de acciones." },
          { options: ["L'espoir", "Le espérement", "L'espération", "La espérée"], answer: "L'espoir", explain: "Espérer → l'espoir (masculin). Sustantivo irregular: espérer/l'espoir (no sufijo regular). Élision: l'espoir." },
        ],
      },
      {
        id: "level-4",
        title: "Nominaliza estas oraciones",
        tag: "Texto libre",
        intro: "Transforma cada oración verbal en una construcción nominal.",
        type: "freeText",
        scene: "Reescribe las frases transformando el verbo principal en un sustantivo nominalizado.",
        text: "1. Le gouvernement a décidé de réduire les impôts. → [[0]] de réduire les impôts est surprenante. / 2. La société a développé de nouveaux produits. → [[1]] de nouveaux produits a boosté les ventes. / 3. Les travailleurs sont arrivés à 8h. → [[2]] des travailleurs a été ponctuell. / 4. Le prix de l'énergie a augmenté. → [[3]] du prix de l'énergie inquiète les ménages. / 5. Il est nécessaire d'agir vite. → [[4]] d'agir vite est évidente.",
        blanks: [
          { answer: "La décision", accepted: ["La décision du gouvernement", "La décision"], explain: "Décider → la décision (féminin, -sion). La décision du gouvernement de réduire les impôts est surprenante." },
          { answer: "Le développement", accepted: ["Le développement"], explain: "Développer → le développement (masculin, -ment). Le développement de nouveaux produits." },
          { answer: "L'arrivée", accepted: ["L'arrivée"], explain: "Arriver → l'arrivée (féminin, -ée). L'arrivée des travailleurs. Élision: l'arrivée." },
          { answer: "La hausse", accepted: ["La hausse", "L'augmentation"], explain: "Augmenter → l'augmentation ou la hausse (mot courant). La hausse/l'augmentation du prix de l'énergie." },
          { answer: "La nécessité", accepted: ["La nécessité"], explain: "Nécessaire → la nécessité (adjectif → substantif, -ité). La nécessité d'agir vite est évidente." },
        ],
      },
      {
        id: "level-5",
        title: "Producción: enriquece tu estilo",
        tag: "Producción",
        intro: "Escribe oraciones usando nominalizaciones según las instrucciones.",
        type: "write",
        items: [
          {
            scene: "Titular de prensa",
            prompt: "Escribe un titular sobre la contaminación del aire usando dos nominalizaciones.",
            answer: "Augmentation de la pollution atmosphérique: la nécessité d'une action immédiate.",
            accepted: ["Augmentation", "pollution", "nécessité", "réduction"],
            explain: "Augmenter → augmentation (-tion); polluer → pollution (-tion); nécessaire → nécessité (-ité). Titulares usan sustantivos sin verbos conjugados.",
          },
          {
            scene: "Inicio de un informe",
            prompt: "Escribe la primera oración de un informe usando nominalización para expresar: el análisis de los resultados muestra una mejora significativa.",
            answer: "L'analyse des résultats montre une amélioration significative de nos performances.",
            accepted: ["L'analyse", "une amélioration", "le développement"],
            explain: "Analyser → l'analyse; améliorer → une amélioration (-tion). Registro formal gracias a las nominalizaciones.",
          },
          {
            scene: "Cualidades de una persona",
            prompt: "Describe a una persona admirada usando tres sustantivos nominalizados desde adjetivos.",
            answer: "Ce qu'on admire en elle, c'est sa générosité, sa patience et sa gentillesse.",
            accepted: ["générosité", "patience", "gentillesse", "liberté", "honnêteté"],
            explain: "Généreux → générosité (-ité); patient → patience (-ence); gentil → gentillesse (-esse). Tres sufijos diferentes para variar el estilo.",
          },
          {
            scene: "Infinitif nominalisé",
            prompt: "Usa un infinitif como sustantivo para expresar: el saber es poder.",
            answer: "Le savoir, c'est le pouvoir — cette idée guide toute notre approche pédagogique.",
            accepted: ["Le savoir", "le pouvoir", "le faire"],
            explain: "Infinitif nominalisé: le savoir (= el conocimiento), le pouvoir (= el poder). Le + infinitif = sustantivo abstracto. Muy común en francés filosófico y literario.",
          },
        ],
      },
      {
        id: "level-6",
        title: "Misión: estilo periodístico",
        tag: "Producción libre",
        intro: "Escribe 3 oraciones en registro formal usando al menos una nominalización en cada una.",
        type: "write",
        items: [
          {
            scene: "Política económica",
            prompt: "Escribe una oración de opinión sobre las medidas económicas usando una nominalización.",
            answer: "La création d'emplois reste la priorité absolue du nouveau gouvernement.",
            accepted: ["La création", "Le développement", "La réduction", "L'augmentation"],
            explain: "Créer → la création (-tion). Nominalización formal que condensa información: 'créer des emplois' → 'la création d'emplois'.",
          },
          {
            scene: "Medio ambiente",
            prompt: "Escribe sobre la necesidad de proteger el medio ambiente usando dos nominalizaciones.",
            answer: "La protection de l'environnement et la réduction des déchets sont des impératifs pour les générations futures.",
            accepted: ["La protection", "la réduction", "la préservation", "l'amélioration"],
            explain: "Protéger → la protection (-tion); réduire → la réduction (-tion). Dos nominalizaciones coordinadas. Registro formal y objetivo.",
          },
          {
            scene: "Educación",
            prompt: "Usa una nominalización de adjetivo para hablar de la importancia de la curiosidad en la educación.",
            answer: "La curiosité intellectuelle est le fondement de tout apprentissage véritable.",
            accepted: ["La curiosité", "L'importance", "La liberté", "la créativité"],
            explain: "Curieux → la curiosité (-ité). Fondement: fonder → le fondement (-ment). Uso de nominalizaciones para expresar conceptos abstractos con precisión.",
          },
        ],
      },
    ],
  },
}

export default topic
