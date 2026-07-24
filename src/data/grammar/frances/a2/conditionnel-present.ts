import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'conditionnel-present',
  order: '06',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A2',
  title: "El Conditionnel présent — cortesía e hipótesis",
  shortTitle: "Conditionnel présent",
  metaTitle: "Le conditionnel présent en français A2 — je voudrais, tu pourrais, ce serait bien",
  description: "El conditionnel présent se usa para expresar cortesía, deseos y situaciones hipotéticas. Se forma con la misma raíz que el futur simple más las terminaciones del imparfait: -ais, -ais, -ait, -ions, -iez, -aient.",
  lead: "Je voudrais un café, s'il vous plaît. Tu pourrais m'aider? Ce serait super! El conditionnel présent es la clave de la educación en francés — imprescindible para pedir, sugerir y soñar.",

  outcomes: [
    "Formar el conditionnel présent con la raíz del futur simple + terminaciones del imparfait.",
    "Usar el conditionnel para expresar cortesía al pedir algo: je voudrais, tu pourrais, vous auriez.",
    "Expresar deseos y situaciones hipotéticas: j'aimerais, ce serait bien, on pourrait.",
    "Construir frases con si + imparfait → conditionnel para hipótesis.",
  ],

  guide: {
    goal: "Expresar peticiones corteses, deseos y situaciones hipotéticas usando el conditionnel présent.",
    model: "Je voudrais un café. / Tu pourrais m'aider? / Ce serait parfait. / J'aimerais voyager.",
    formula: "Raíz del futur simple + terminaciones del imparfait: -ais/-ais/-ait/-ions/-iez/-aient",
    decisions: [
      "La raíz es idéntica al futur simple: parler → parler-; finir → finir-; prendre → prendr-.",
      "Irregulares (misma raíz que futur): être→ser-, avoir→aur-, aller→ir-, faire→fer-, voir→verr-, vouloir→voudr-, pouvoir→pourr-.",
      "Uso 1 — Cortesía: Je voudrais (quisiera), Tu pourrais (¿podrías?), Vous auriez (¿tendría usted?).",
      "Uso 2 — Deseo o sueño: J'aimerais voyager. On pourrait aller au cinéma. Ce serait bien.",
      "Uso 3 — Hipótesis: Si j'avais le temps, je lirais plus. (si + imparfait → conditionnel).",
    ],
    table: [
      ["Personne", "Terminación", "Ejemplo (vouloir)"],
      ["je", "-ais", "je voudrais"],
      ["tu", "-ais", "tu voudrais"],
      ["il / elle / on", "-ait", "il voudrait"],
      ["nous", "-ions", "nous voudrions"],
      ["vous", "-iez", "vous voudriez"],
      ["ils / elles", "-aient", "ils voudraient"],
    ],
    mistakes: [
      "\"Je voudrais\" ✓ — pero \"Je voudrai\" ❌: sin -s en futur (je voudrai), con -s en conditionnel (je voudrais).",
      "\"Tu pourrais m'aider?\" ✓ — mucho más cortés que \"Tu peux m'aider?\" — usa el conditionnel para peticiones educadas.",
      "\"Si j'avais du temps, je lirais\" ✓ — pero \"Si j'aurais du temps, je lirais\" ❌: después de 'si' hipotético, nunca conditionnel — siempre imparfait.",
    ],
  },

  seo: [
    {
      heading: "El conditionnel présent: educación y cortesía en francés",
      paragraphs: [
        "El conditionnel présent es esencial para comunicarse de manera cortés en francés. Cuando pides algo en una tienda, en un restaurante o a un colega, el conditionnel présent transforma una petición directa en una solicitud educada: 'Je veux un café' (quiero un café) vs. 'Je voudrais un café' (quisiera un café). Esta diferencia es crucial en la cultura francesa.",
        "La formación es muy lógica: se toma exactamente la misma raíz que el futur simple y se añaden las terminaciones del imparfait. Si sabes el futur, ya tienes la mitad del trabajo hecho. Por ejemplo: je parlerai (futur) → je parlerais (conditionnel). Je serai (futur) → je serais (conditionnel).",
      ],
    },
    {
      heading: "Usos del conditionnel: más allá de la cortesía",
      paragraphs: [
        "Además de la cortesía, el conditionnel présent tiene otros usos importantes. Para expresar deseos: J'aimerais visiter le Japon (me gustaría visitar Japón). Para dar consejos: Tu devrais étudier davantage (deberías estudiar más). Para hacer sugerencias: On pourrait aller au cinéma? (¿Podríamos ir al cine?).",
        "El uso más avanzado es la hipótesis con 'si': Si j'avais plus d'argent, je voyagerais partout. La regla es clara: si + imparfait → conditionnel. Nunca uses el conditionnel después de 'si' hipotético. Este uso se estudia en detalle en el tema 'Si + conditionnel'.",
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: "Conditionnel = raíz del futur + terminaciones del imparfait. Uso principal: cortesía (voudrais, pourrait, serait). Si + imparfait → conditionnel.",
    graphicPrompt: "Globo de diálogo cortés: \"Je voudrais un café, s'il vous plaît.\" vs. globo directo: \"Je veux un café.\" Contraste visual entre los dos registros.",
    scene: [
      ["Je voudrais un café, s'il vous plaît.", "Quisiera un café, por favor."],
      ["Tu pourrais m'expliquer ce problème?", "¿Podrías explicarme este problema?"],
      ["Ce serait super de partir en vacances!", "¡Sería genial irse de vacaciones!"],
      ["Vous auriez une table pour deux personnes?", "¿Tendrían una mesa para dos personas?"],
      ["On pourrait aller au cinéma ce soir?", "¿Podríamos ir al cine esta noche?"],
    ],
    learnerModes: ["reading", "choosing", "typing"],
    reviewFocus: ["raíz del futur + terminaciones del imparfait", "cortesía con voudrais/pourrais", "deseos con aimerais/pourrait"],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: "Reconocer el conditionnel présent",
        tag: "Opción múltiple",
        intro: "Elige la forma correcta del conditionnel présent para completar la frase.",
        type: 'choice',
        items: [
          {
            scene: "En el restaurante",
            lines: [["Cliente", "Je ___ un steak, s'il vous plaît."]],
            options: ["voudrais", "veux", "voudrai", "voulus"],
            answer: "voudrais",
            explain: "Conditionnel de vouloir: je voudrais. Es la forma más cortés para pedir.",
          },
          {
            scene: "Pidiendo ayuda",
            lines: [["Étudiant", "Tu ___ m'aider avec cet exercice?"]],
            options: ["pourrais", "peux", "pourrai", "pourras"],
            answer: "pourrais",
            explain: "Conditionnel de pouvoir: tu pourrais. Petición cortés.",
          },
          {
            scene: "El deseo",
            lines: [["Rêveur", "J'___ voyager en Asie un jour."]],
            options: ["aimerais", "aime", "aimerai", "aimerait"],
            answer: "aimerais",
            explain: "Conditionnel de aimer: j'aimerais. Expresa un deseo.",
          },
          {
            scene: "La sugerencia",
            lines: [["Ami", "On ___ aller au cinéma ce soir, non?"]],
            options: ["pourrait", "peut", "pourra", "pouvait"],
            answer: "pourrait",
            explain: "Conditionnel de pouvoir: on pourrait. Sugerencia cortés.",
          },
          {
            scene: "La hipótesis",
            lines: [["Paul", "Si j'avais plus d'argent, je ___ un appartement."]],
            options: ["achèterais", "achète", "achèterai", "achetais"],
            answer: "achèterais",
            explain: "Si + imparfait → conditionnel: j'achèterais (si j'avais...).",
          },
          {
            scene: "El consejo",
            lines: [["Médecin", "Vous ___ faire plus de sport."]],
            options: ["devriez", "devez", "devrez", "deviez"],
            answer: "devriez",
            explain: "Conditionnel de devoir: vous devriez. Consejo cortés.",
          },
        ],
      },
      {
        id: 'l2',
        title: "Cortesía y sugerencias",
        tag: "2 espacios",
        intro: "Completa estas peticiones corteses con dos formas del conditionnel.",
        type: 'dual',
        items: [
          {
            scene: "En la oficina de turismo",
            lines: [["Touriste", "Vous [[0]] me donner un plan de la ville? Ce [[1]] très utile."]],
            blanks: [
              { options: ["pourriez", "pouvez", "pourrez"], answer: "pourriez", explain: "Conditionnel de pouvoir: vous pourriez. Petición muy cortés." },
              { options: ["serait", "est", "sera"], answer: "serait", explain: "Conditionnel de être: ce serait. Expresa que algo sería útil." },
            ],
          },
          {
            scene: "En el café",
            lines: [["Cliente", "Je [[0]] un thé chaud et tu [[1]] m'apporter du lait?"]],
            blanks: [
              { options: ["voudrais", "veux", "voudrai"], answer: "voudrais", explain: "Conditionnel de vouloir: je voudrais. La forma más cortés para pedir." },
              { options: ["pourrais", "peux", "pourras"], answer: "pourrais", explain: "Conditionnel de pouvoir: tu pourrais. Petición amable." },
            ],
          },
          {
            scene: "La sugerencia de fin de semana",
            lines: [["Lucie", "On [[0]] aller à la mer ce week-end? Ce [[1]] une bonne idée!"]],
            blanks: [
              { options: ["pourrait", "peut", "pourra"], answer: "pourrait", explain: "Conditionnel de pouvoir: on pourrait. Sugerencia." },
              { options: ["serait", "est", "sera"], answer: "serait", explain: "Conditionnel de être: ce serait une bonne idée." },
            ],
          },
          {
            scene: "El consejo de salud",
            lines: [["Médecin", "Vous [[0]] manger moins de sucre et vous [[1]] faire du sport trois fois par semaine."]],
            blanks: [
              { options: ["devriez", "devez", "devrez"], answer: "devriez", explain: "Conditionnel de devoir: vous devriez. Consejo médico cortés." },
              { options: ["devriez", "devez", "devrez"], answer: "devriez", explain: "Conditionnel de devoir: vous devriez (segunda recomendación)." },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: "Un día idílico",
        tag: "Texto guiado",
        intro: "Completa el texto eligiendo las formas correctas del conditionnel présent.",
        type: 'guidedText',
        scene: "Sophie describe su día de ensueño",
        text: "Si je pouvais faire tout ce que je veux, je me [[0]] tôt. Je [[1]] courir au parc. L'après-midi, j'[[2]] du piano et on [[3]] dîner dans un bon restaurant. Ce [[4]] une journée parfaite!",
        blanks: [
          { options: ["lèverais", "lève", "levais"], answer: "lèverais", explain: "Conditionnel de se lever: je me lèverais." },
          { options: ["irais", "vais", "allais"], answer: "irais", explain: "Conditionnel de aller: j'irais (raíz ir- + -ais)." },
          { options: ["jouerais", "joue", "jouais"], answer: "jouerais", explain: "Conditionnel de jouer: je jouerais." },
          { options: ["irait", "va", "allait"], answer: "irait", explain: "Conditionnel de aller: on irait (raíz ir- + -ait)." },
          { options: ["serait", "est", "sera"], answer: "serait", explain: "Conditionnel de être: ce serait (raíz ser- + -ait)." },
        ],
      },
      {
        id: 'l4',
        title: "Las sugerencias de Marc",
        tag: "Texto libre",
        intro: "Escribe las formas correctas del conditionnel présent sin ayuda de opciones.",
        type: 'freeText',
        scene: "Marc hace sugerencias para la reunión de amigos",
        text: "On [[0]] se retrouver samedi soir. Ce [[1]] super de faire une raclette. Tu [[2]] apporter du fromage? Léa et Pierre [[3]] pouvoir venir vers 19h. Ça [[4]] être une super soirée!",
        blanks: [
          { answer: "pourrait", accepted: ["pourrait"], explain: "Pouvoir en conditionnel: on pourrait (ir- + -ait)." },
          { answer: "serait", accepted: ["serait"], explain: "Être en conditionnel: ce serait (ser- + -ait)." },
          { answer: "pourrais", accepted: ["pourrais"], explain: "Pouvoir en conditionnel: tu pourrais (pourr- + -ais)." },
          { answer: "pourraient", accepted: ["pourraient"], explain: "Pouvoir en conditionnel: ils pourraient (pourr- + -aient)." },
          { answer: "pourrait", accepted: ["pourrait", "serait"], explain: "Pouvoir/être en conditionnel: ça pourrait être / ça serait." },
        ],
      },
      {
        id: 'l5',
        title: "Producir con el conditionnel",
        tag: "Producción guiada",
        intro: "Escribe la frase completa en conditionnel présent según las indicaciones.",
        type: 'write',
        items: [
          {
            scene: "En el hotel",
            prompt: "Escribe: \"Quisiera una habitación para dos noches.\" (Je / vouloir / une chambre / pour deux nuits)",
            answer: "Je voudrais une chambre pour deux nuits.",
            accepted: ["je voudrais une chambre", "voudrais une chambre pour deux nuits"],
            explain: "Vouloir en conditionnel: je voudrais. La forma más cortés para pedir en un hotel.",
          },
          {
            scene: "La sugerencia",
            prompt: "Escribe: \"¿Podríamos ir al museo mañana?\" (On / pouvoir / aller au musée / demain)",
            answer: "On pourrait aller au musée demain?",
            accepted: ["on pourrait aller au musée", "on pourrait aller au musee demain"],
            explain: "Pouvoir en conditionnel: on pourrait. Sugerencia en forma de pregunta.",
          },
          {
            scene: "El sueño",
            prompt: "Escribe: \"Me gustaría vivir en París.\" (J' / aimer / vivre / à Paris)",
            answer: "J'aimerais vivre à Paris.",
            accepted: ["j'aimerais vivre à paris", "j aimerais vivre a paris"],
            explain: "Aimer en conditionnel: j'aimerais (aimer- + -ais). Expresa un deseo.",
          },
        ],
      },
      {
        id: 'l6',
        title: "Mes désirs et suggestions",
        tag: "Escritura libre",
        intro: "Usa el conditionnel présent para expresar tus deseos y hacer sugerencias.",
        type: 'write',
        items: [
          {
            scene: "Tus deseos de viaje",
            prompt: "¿Adónde te gustaría ir de vacaciones? (J'aimerais... / Je voudrais... / Ce serait...)",
            answer: "J'aimerais aller au Japon. Ce serait une expérience incroyable.",
            accepted: ["j'aimerais", "je voudrais", "ce serait", "j aimerais", "il serait"],
            explain: "Conditionnel para deseos: j'aimerais, je voudrais, je serais + adj...",
          },
          {
            scene: "Una sugerencia para el fin de semana",
            prompt: "Haz una sugerencia a tus amigos: On pourrait... / Vous pourriez... / Ce serait...",
            answer: "On pourrait faire un pique-nique au parc. Ce serait sympa!",
            accepted: ["on pourrait", "vous pourriez", "tu pourrais", "ce serait"],
            explain: "On pourrait + infinitivo = sugerencia. Ce serait + adj. = evaluación.",
          },
          {
            scene: "Una petición cortés",
            prompt: "Pide algo de manera muy cortés (en un restaurante, tienda u hotel): Je voudrais... / Vous auriez... / Tu pourrais...",
            answer: "Vous auriez une table libre? Je voudrais dîner ici.",
            accepted: ["je voudrais", "vous auriez", "tu pourrais", "pourriez-vous", "auriez-vous"],
            explain: "Formas muy corteses: je voudrais, vous auriez, vous pourriez, auriez-vous...?",
          },
        ],
      },
    ],
  },
}

export default topic
