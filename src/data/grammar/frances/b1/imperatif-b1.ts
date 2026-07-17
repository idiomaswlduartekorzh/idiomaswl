import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'imperatif-b1',
  order: '18',
  color: '#2563eb',
  category: 'Verbos',
  level: 'B1',
  title: "L'Impératif en Francés B1",
  shortTitle: 'Impératif',
  metaTitle: "Impératif B1 — El imperativo en francés: órdenes, consejos y prohibiciones",
  description:
    "El impératif francés se usa para dar órdenes, instrucciones, consejos y prohibiciones. Solo tiene tres personas: tu, nous, vous. Los verbos en -er pierden la -s final en la forma tu. Los irregulares clave son être, avoir, savoir y vouloir. Con pronombres: orden postverbal en afirmativo, preverbal en negativo. La forma de cortesía usa el conditionnel.",
  lead: "Domina el imperativo francés: formas regulares e irregulares, uso con pronombres, negación y cómo dar órdenes o consejos con el tono correcto.",
  outcomes: [
    "Formas el impératif de los verbos regulares en -er, -ir y -re",
    "Usas correctamente los irregulares: être, avoir, savoir, vouloir",
    "Colocas correctamente los pronombres con el impératif affirmatif y négatif",
    "Distingues el imperativo de orden del de consejo o petición educada",
  ],

  guide: {
    goal: "Dar órdenes, instrucciones, consejos y hacer peticiones educadas usando el impératif.",
    model: "Parle plus lentement! / Ne mange pas si vite! / Soyons positifs! / Veuillez patienter.",
    formula: "Impératif = tu/nous/vous du présent (sans pronom) | -er: perd le -s à tu | Pronom: après verbe affirmatif, avant verbe négatif",
    decisions: [
      "Formations: tu (sans -s pour -er), nous, vous. Pas de sujet exprimé.",
      "Réguliers -er: Parle! (tu) / Parlons! (nous) / Parlez! (vous)",
      "Réguliers -ir: Finis! / Finissons! / Finissez!",
      "Réguliers -re: Réponds! / Répondons! / Répondez!",
      "Irréguliers: être → sois/soyons/soyez; avoir → aie/ayons/ayez; savoir → sache/sachons/sachez; vouloir → veuille/veuillons/veuillez.",
      "Pronoms affirmatifs: après le verbe avec tiret. 'Parle-moi! Lève-toi! Prends-en!' (moi/toi remplacent me/te).",
      "Pronoms négatifs: avant le verbe. 'Ne me parle pas! Ne te lève pas! N'en prends pas!'",
    ],
    table: [
      ["Verbe", "Tu / Nous", "Vous"],
      ["parler", "Parle! / Parlons!", "Parlez!"],
      ["finir", "Finis! / Finissons!", "Finissez!"],
      ["être", "Sois! / Soyons!", "Soyez!"],
    ],
    mistakes: [
      "\"Parles plus vite\" ❌ — verbes en -er perdent le -s à tu: \"Parle plus vite\" ✓.",
      "\"Ne me parle-pas\" ❌ — négatif: pronom avant verbe: \"Ne me parle pas\" ✓.",
      "\"Ayes confiance\" ❌ — irregular avoir: \"Aie confiance\" ✓.",
    ],
  },

  seo: [
    {
      heading: "La formación del impératif en francés",
      paragraphs: [
        "El impératif francés tiene solo tres formas: tu (tú/usted informal), nous (nosotros), vous (ustedes/usted formal). Se forma usando el présent del verbo sin el pronombre sujeto. Para los verbos en -er, la forma 'tu' pierde la -s final: 'tu parles' → 'Parle!' (no 'Parles!'). Para los verbos en -ir y -re, la forma 'tu' conserva la -s: 'tu finis' → 'Finis!', 'tu réponds' → 'Réponds!'.",
        "Sin embargo, la -s reaparece ante 'y' y 'en' en la forma 'tu' para facilitar la liaison: 'Va-y' → incorrecto, debe ser 'Vas-y!' (con -s para la liaison). Igualmente: 'Parles-en!' (aunque normalmente 'parle' sin -s). Este detalle fonético solo afecta la forma 'tu' de verbos -er ante 'y' y 'en'. Los irregulares esenciales a memorizar son: être (sois/soyons/soyez), avoir (aie/ayons/ayez), savoir (sache/sachons/sachez), vouloir (veuille/veuillez — usado principalmente en forma educada 'Veuillez...').",
      ],
    },
    {
      heading: "El impératif con pronombres: posición afirmativa y negativa",
      paragraphs: [
        "Con el impératif affirmatif, los pronombres se colocan DESPUÉS del verbo separados por un trait d'union. El orden es: verbe + COD + COI + y/en. Los pronombres me y te se convierten en moi y toi en posición postverbal: 'Appelle-moi!' (no 'Appelle-me'), 'Lève-toi!' (no 'Lève-te'). Con COD + COI: 'Donne-le-moi!' (dámelo), 'Explique-le-leur!' (explícaselo a ellos).",
        "Con el impératif négatif, los pronombres vuelven a su posición normal: ANTES del verbo, entre 'ne' y el verbo. Me y toi regresan a me y te: 'Ne m'appelle pas!', 'Ne te lève pas!'. El orden sigue siendo COI + COD: 'Ne me le donne pas!'. Esta inversión de posición (después en afirmativo, antes en negativo) es uno de los puntos más importantes del B1.",
      ],
      table: [
        ["Tipo", "Estructura", "Ejemplo"],
        ["Afirmatif (1 pronom)", "verbe + pronom", "Dis-moi! / Lève-toi!"],
        ["Afirmatif (2 pronoms)", "verbe + COD + COI", "Donne-le-moi!"],
        ["Négatif", "ne + pronom + verbe + pas", "Ne me dis pas! / Ne te lève pas!"],
      ],
    },
    {
      heading: "Usos del impératif: órdenes, consejos y peticiones",
      paragraphs: [
        "El impératif expresa varios matices según el contexto y la entonación. Las órdenes directas: 'Sortez immédiatement!' (¡Salgan inmediatamente!). Los consejos: 'Mange moins de sucre, c'est meilleur pour la santé' (Come menos azúcar, es mejor para la salud). Las instrucciones: 'Ajoutez deux œufs et mélangez bien' (Añada dos huevos y mezcle bien — en recetas). Las prohibiciones con impératif négatif: 'Ne touchez pas!' (¡No toquen!), 'Ne fumez pas ici' (No fume aquí).",
        "Para dar órdenes de forma educada (registre formel): 'Veuillez patienter un moment' (Tenga la bondad de esperar un momento), 'Veuillez trouver ci-joint...' (Encuentre adjunto...). 'Veuillez' es el impératif de 'vouloir' (2ª persona plural) y se usa en correspondencia formal, atención al cliente y comunicaciones oficiales. Más educado que 'Attendez un moment', que también es impératif pero más directo.",
      ],
    },
  ],

  visual: {
    mode: "scene",
    teacherLens: "El impératif: tres personas (tu/nous/vous), verbos -er pierden la -s, irregulares être/avoir/savoir, pronombres postverbales en afirmativo.",
    graphicPrompt: "Tabla del impératif con ejemplos de orden, consejo, instrucción y prohibición en diferentes contextos.",
    scene: [
      ["Parle moins fort, s'il te plaît — tu déranges tout le monde!", "Habla más bajo, por favor — ¡estás molestando a todo el mundo!"],
      ["Soyez à l'heure demain — la réunion commence à 9h précises.", "Sean puntuales mañana — la reunión empieza a las 9 en punto."],
      ["Ne mange pas si vite — tu vas avoir mal à l'estomac!", "No comas tan rápido — ¡te va a doler el estómago!"],
      ["Allons au parc — il fait tellement beau aujourd'hui!", "¡Vamos al parque — hace un tiempo tan bonito hoy!"],
      ["Appelle-moi dès que tu arrives — je serai inquiète!", "¡Llámame en cuanto llegues — estaré preocupada!"],
      ["Veuillez patienter quelques instants — on s'occupe de vous.", "Tenga la bondad de esperar un momento — en seguida le atendemos."],
      ["Aie confiance en toi — tu es capable de réussir!", "¡Ten confianza en ti mismo — eres capaz de lograrlo!"],
      ["Ne vous inquiétez pas — tout va bien se passer.", "No se preocupen — todo va a salir bien."],
    ],
    learnerModes: ["reading", "typing", "choosing"],
    reviewFocus: ["-er: sin -s en tu", "être/avoir/savoir irreguliers", "pronoms: postverbal affirmatif / preverbal négatif"],
  },

  practice: {
    levels: [
      {
        id: "level-1",
        title: "Forma el impératif correcto",
        tag: "Opción múltiple",
        intro: "Elige la forma correcta del impératif.",
        type: "choice",
        items: [
          {
            scene: "Instrucción informal (tu)",
            lines: [["", "___ tes devoirs avant de regarder la télévision! (faire)"]],
            options: ["Fais", "Fait", "Faites", "Faire"],
            answer: "Fais",
            explain: "Faire est irrégulier à l'impératif: tu → fais. Pas de -s ajouté car faire n'est pas -er. Fais tes devoirs!",
          },
          {
            scene: "Invitation (nous)",
            lines: [["", "___ un café ensemble après la réunion! (prendre)"]],
            options: ["Prenons", "Prenez", "Prends", "Prendre"],
            answer: "Prenons",
            explain: "Nous → impératif de prendre: nous prenons → Prenons! ¡Tomemos un café juntos!",
          },
          {
            scene: "Verbe -er tu",
            lines: [["", "___ la porte en partant, s'il te plaît. (fermer)"]],
            options: ["Ferme", "Fermes", "Fermez", "Fermez-la"],
            answer: "Ferme",
            explain: "Verbe -er: tu → ferme (sans -s). Ferme la porte = cierra la puerta. La -s disparaît pour les verbes -er à la forme tu.",
          },
          {
            scene: "Irrégulier être",
            lines: [["", "___ courageux — tu vas y arriver! (être, tu)"]],
            options: ["Sois", "Es", "Êtes", "Soyez"],
            answer: "Sois",
            explain: "Être est irrégulier: tu → sois. Sois courageux = sé valiente. Impératif de être: sois/soyons/soyez.",
          },
          {
            scene: "Irrégulier avoir",
            lines: [["", "___ de la patience — ça prendra du temps. (avoir, tu)"]],
            options: ["Aie", "Aye", "As", "Ayez"],
            answer: "Aie",
            explain: "Avoir est irrégulier: tu → aie. Aie de la patience = ten paciencia. Impératif de avoir: aie/ayons/ayez.",
          },
          {
            scene: "Négation",
            lines: [["", "___ si longtemps — on a besoin de toi! (ne pas attendre, tu)"]],
            options: ["N'attends pas", "N'attende pas", "Attends pas", "Ne pas attendre"],
            answer: "N'attends pas",
            explain: "Impératif négatif: ne + verbe + pas. Attendre (tu) → attends. Ne + attends + pas → N'attends pas!",
          },
          {
            scene: "Forme de politesse",
            lines: [["", "___ remplir ce formulaire et me le remettre avant vendredi."]],
            options: ["Veuillez", "Veuille", "Voulez", "Voulez-vous"],
            answer: "Veuillez",
            explain: "'Veuillez' = impératif de vouloir (vous), forma de cortesía formal. Veuillez + infinitif = Tenga la bondad de... / Por favor,...",
          },
          {
            scene: "Avec y (liaison)",
            lines: [["", "Tu hésites à aller à la fête? Mais ___! Tu vas t'amuser!"]],
            options: ["Vas-y", "Va-y", "Yas-y", "Allez-y"],
            answer: "Vas-y",
            explain: "Aller (tu): impératif = va. Mais devant y: vas-y (avec -s pour la liaison). Exception phonétique pour les verbes -er devant y et en.",
          },
        ],
      },
      {
        id: "level-2",
        title: "Imperativo con pronombres",
        tag: "2 espacios",
        intro: "Completa las instrucciones con el impératif y el pronombre correcto.",
        type: "dual",
        items: [
          {
            scene: "Dar un objeto",
            lines: [["", "Ce livre est à toi? — Non, [[0]] [[1]] ce livre, il est à Marc! (donner, lui)"]],
            blanks: [
              { options: ["Donne", "Donnes", "Donnez", "Donne-le"], answer: "Donne", explain: "Verbe -er, tu: impératif = donne (sans -s). Donne + lui + le livre." },
              { options: ["-lui", "lui", "à lui", "-le-lui"], answer: "-lui", explain: "Impératif affirmatif: verbe + COD (le) + COI (lui) ou verbe + lui si pas de COD avant. Donne-lui ce livre." },
            ],
          },
          {
            scene: "Instrucciones de cocina",
            lines: [["", "Pour faire ce gâteau, [[0]] les œufs et [[1]] bien."]],
            blanks: [
              { options: ["Cassez", "Casser", "Cassent", "Cassiez"], answer: "Cassez", explain: "Vous (instrucciones formales): cassez les œufs. Casser → vous cassez → cassez." },
              { options: ["mélangez", "mélanger", "mélange", "mélangent"], answer: "mélangez", explain: "Vous: mélangez bien. Deux impératifs coordonnés: cassez... et mélangez." },
            ],
          },
          {
            scene: "Consejos de salud",
            lines: [["", "[[0]] du sport régulièrement et [[1]] bien — c'est tout le secret!"]],
            blanks: [
              { options: ["Fais", "Fait", "Faire", "Faisez"], answer: "Fais", explain: "Faire irrégulier, tu: fais. Fais du sport = haz deporte." },
              { options: ["dors", "dort", "dormez", "dormir"], answer: "dors", explain: "Dormir, tu: dors (comme présent). Dors bien = duerme bien. Impératif = présent sans pronom." },
            ],
          },
          {
            scene: "Réflexif",
            lines: [["", "Tu dois te lever! Il est déjà 8 heures! [[0]] et [[1]] vite!"]],
            blanks: [
              { options: ["Lève-toi", "Te lève", "Lèves-toi", "Lève-te"], answer: "Lève-toi", explain: "Impératif réfléchi: verbe + -toi (me → moi, te → toi). Se lever: tu → lève-toi. Trait d'union obligatoire." },
              { options: ["habille-toi", "t'habille", "habilles-toi", "habille-te"], answer: "habille-toi", explain: "S'habiller: tu → habille-toi. Même structure: verbe + toi. Verbe -er (habiller) sans -s mais avec liaison possible devant toi." },
            ],
          },
        ],
      },
      {
        id: "level-3",
        title: "Receta de cocina",
        tag: "Texto guiado",
        intro: "Completa esta receta con el impératif correcto.",
        type: "guidedText",
        scene: "Receta de una tarte aux pommes francesa con instrucciones paso a paso en impératif.",
        text: "Voici notre recette de tarte aux pommes! D'abord, [[0]] le four à 180°C. Pendant ce temps, [[1]] 200g de farine avec 100g de beurre. [[2]]-y un oeuf et une pincée de sel. [[3]] bien la pâte et [[4]]-la dans un moule. Ensuite, [[5]] les pommes et [[6]]-les finement. [[7]]-les sur la pâte en cercles. [[8]] 40g de sucre sur les pommes. Enfin, [[9]]-la au four pendant 40 minutes. [[10]]-la sortir avant de servir — bon appétit!",
        blanks: [
          { options: ["Préchauffez", "Préchauffer", "Préchauffons", "Préchauffez-le"], answer: "Préchauffez", explain: "Vous (receta formal): préchauffez le four. Verbe -er: vous préchauffez → préchauffez." },
          { options: ["mélangez", "mélanges", "mélange", "mélangez-vous"], answer: "mélangez", explain: "Vous: mélangez la farine avec le beurre. Impératif -er: mélangez." },
          { options: ["Ajoutez", "Ajoutez-y", "Ajoute", "Ajoutons"], answer: "Ajoutez", explain: "Vous: ajoutez un oeuf. Ajoutez-y serait si on répétait le lieu; ici l'objet (un oeuf) suit directement." },
          { options: ["Pétrissez", "Pétrir", "Pétri", "Pétrissons"], answer: "Pétrissez", explain: "Pétrir (verbe -ir): vous pétrissez → pétrissez la pâte. Impératif -ir: conserva la radical." },
          { options: ["placez", "Plaçons", "place", "placez-y"], answer: "placez", explain: "Vous: placez la pâte dans un moule. Verbe -er: placez. La = la pâte (déjà mentionné). Placez-la dans le moule." },
          { options: ["Épluchez", "Épluche", "Éplucher", "Épluchez-les"], answer: "Épluchez", explain: "Vous: épluchez les pommes. Verbe -er: épluchez. COD (les pommes) suit." },
          { options: ["coupez", "couper", "coupe", "coupons"], answer: "coupez", explain: "Vous: coupez-les finement. Ici le pronom 'les' remplace 'les pommes'. Mais dans le texte on a coupez séparé." },
          { options: ["Disposez", "Disposer", "Dispose", "Disposons"], answer: "Disposez", explain: "Vous: disposez-les sur la pâte. Verbe -er: disposez. Lays them out in circles." },
          { options: ["Saupoudrez", "Saupoudrer", "Saupoudre", "Saupoudrons"], answer: "Saupoudrez", explain: "Vous: saupoudrez le sucre sur les pommes. Verbe -er: saupoudrez." },
          { options: ["enfournez", "enfourner", "enfourne", "enfournons"], answer: "enfournez", explain: "Vous: enfournez-la au four. Mettre au four = enfourner. Impératif: enfournez." },
          { options: ["Laissez", "Laisse", "Laissez-la", "Laisser"], answer: "Laissez", explain: "Vous: laissez-la refroidir. Laisser + infinitif. Laissez-la sortir du four avant de servir." },
        ],
      },
      {
        id: "level-4",
        title: "Transforma en imperativo",
        tag: "Texto libre",
        intro: "Transforma estas instrucciones en impératif.",
        type: "freeText",
        scene: "Transforma las frases usando el impératif con el pronombre indicado.",
        text: "Tu dois te lever tôt demain. → [[0]] tôt demain! (tu) / Vous ne devez pas oublier vos documents. → [[1]] vos documents! (vous, négatif) / Nous devons être plus attentifs. → [[2]] plus attentifs! (nous) / Tu dois m'appeler ce soir. → [[3]] ce soir! (tu) / Vous devez prendre cet ascenseur. → [[4]] cet ascenseur! (vous)",
        blanks: [
          { answer: "Lève-toi", accepted: ["Lève-toi"], explain: "Impératif réfléchi tu: lève-toi. Se lever → tu te lèves → lève-toi. Me/te → moi/toi en position postverbale." },
          { answer: "N'oubliez pas", accepted: ["N'oubliez pas"], explain: "Impératif négatif vous: ne + oubliez + pas. N'oubliez pas vos documents." },
          { answer: "Soyons", accepted: ["Soyons"], explain: "Être irrégulier, nous: soyons. Soyons plus attentifs = seamos más atentos." },
          { answer: "Appelle-moi", accepted: ["Appelle-moi"], explain: "Impératif tu avec pronom: appelle + moi (me → moi en position postverbale). Verbe -er: sans -s. Trait d'union." },
          { answer: "Prenez", accepted: ["Prenez"], explain: "Prendre, vous: prenez. Prenez cet ascenseur. Impératif vous = vous du présent sans pronom." },
        ],
      },
      {
        id: "level-5",
        title: "Producción: da instrucciones",
        tag: "Producción",
        intro: "Escribe instrucciones usando el impératif según las situaciones.",
        type: "write",
        items: [
          {
            scene: "Consejo de salud (tu)",
            prompt: "Escribe dos consejos de salud informales usando el impératif (tu): dormir y beber agua.",
            answer: "Dors au moins huit heures par nuit et bois beaucoup d'eau chaque jour!",
            accepted: ["Dors", "bois", "impératif tu"],
            explain: "Dormir → tu dors → dors! Boire → tu bois → bois! Dos impératifs coordinados, forma tu.",
          },
          {
            scene: "Instrucción con pronom (affirmatif)",
            prompt: "Escribe que le des el libro a Marc. Usa el impératif con el pronombre adecuado.",
            answer: "Donne-le à Marc! / Donne-le-lui!",
            accepted: ["Donne-le", "donne-lui", "Donne-le-lui"],
            explain: "Impératif tu + COD (le = le livre) + COI (à Marc ou lui). Donne-le-lui (doble pronom) o Donne-le à Marc.",
          },
          {
            scene: "Impératif négatif",
            prompt: "Escribe una advertencia: no corras en el pasillo. Usa impératif négatif (vous).",
            answer: "Ne courez pas dans le couloir — c'est dangereux!",
            accepted: ["Ne courez pas", "N'allez pas si vite"],
            explain: "Impératif négatif vous: ne + courez + pas. Courir → vous courez → ne courez pas.",
          },
          {
            scene: "Forma educada",
            prompt: "Escribe una petición formal a clientes para que esperen un momento.",
            answer: "Veuillez patienter un instant, notre équipe s'occupe de vous.",
            accepted: ["Veuillez patienter", "Veuillez"],
            explain: "Vouloir irrégulier, vous (formal): veuillez. Veuillez + infinitif = petición educada. Standard en atención al cliente.",
          },
        ],
      },
      {
        id: "level-6",
        title: "Misión: escribe instrucciones",
        tag: "Producción libre",
        intro: "Escribe 3 oraciones imperativas para situaciones diferentes.",
        type: "write",
        items: [
          {
            scene: "Instrucciones de seguridad",
            prompt: "Escribe dos instrucciones de seguridad para el aeropuerto usando impératif vous.",
            answer: "Préparez vos documents d'identité avant d'arriver au contrôle. Ne laissez pas vos bagages sans surveillance.",
            accepted: ["Préparez", "Ne laissez pas", "impératif vous"],
            explain: "Préparez = impératif vous de préparer. Ne laissez pas = impératif négatif vous. Registro formal/oficial.",
          },
          {
            scene: "Consejo a un amigo",
            prompt: "Da tres consejos a un amigo que está estresado usando impératif tu.",
            answer: "Respire profondément, sois patient et pense à ce qui te rend heureux!",
            accepted: ["Respire", "sois", "pense", "impératif tu"],
            explain: "Respirer (-er) → respire (tu, sans -s). Être irrégulier → sois. Penser (-er) → pense. Tres impératifs en serie.",
          },
          {
            scene: "Invitación con nous",
            prompt: "Invita a alguien a hacer algo juntos usando impératif nous con dos verbos.",
            answer: "Allons nous promener dans le parc et profitons de ce beau temps!",
            accepted: ["Allons", "Profitons", "impératif nous"],
            explain: "Aller → nous allons → allons (irregular, memorizar). Profiter → nous profitons → profitons. Impératif nous = invitation partagée.",
          },
        ],
      },
    ],
  },
}

export default topic
