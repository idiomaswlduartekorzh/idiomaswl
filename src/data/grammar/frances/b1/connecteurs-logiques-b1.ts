import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'connecteurs-logiques-b1',
  order: '13',
  color: '#2563eb',
  category: 'Conectores',
  level: 'B1',
  title: 'Les Connecteurs Logiques en Francés B1',
  shortTitle: 'Connecteurs Logiques',
  metaTitle: 'Connecteurs Logiques B1 — Por tanto, sin embargo, aunque, debido a en francés',
  description:
    "Los conectores lógicos permiten organizar y articular ideas con precisión. En francés B1 es esencial dominar: connecteurs d'addition (de plus, en outre), d'opposition (cependant, pourtant, néanmoins), de cause (car, puisque, étant donné que), de conséquence (donc, ainsi, par conséquent), de concession (bien que + subjonctif, quoique) y d'illustration (par exemple, notamment).",
  lead: "Conecta tus ideas en francés con precisión: aprende los conectores de adición, oposición, causa, consecuencia y concesión para escribir y hablar con fluidez.",
  outcomes: [
    "Usas correctamente los conectores de adición: de plus, en outre, par ailleurs",
    "Expresas oposición y concesión: cependant, pourtant, néanmoins, bien que",
    "Introduces causa y consecuencia: car, puisque, donc, ainsi, par conséquent",
    "Distingues los conectores que exigen indicatif de los que exigen subjonctif",
  ],

  guide: {
    goal: "Articular ideas de forma lógica y cohesionada en textos escritos y orales.",
    model: "Il fait froid, cependant elle ne porte pas de manteau. / Puisque tu insistes, je viens. / Par conséquent, nous avons décidé d'annuler.",
    formula: "Causa: car / puisque / étant donné que | Consecuencia: donc / ainsi / par conséquent | Oposición: cependant / pourtant / néanmoins | Concesión: bien que + subjonctif",
    decisions: [
      "Car: causa, más formal que 'parce que'. Se coloca en medio de frase, no al inicio.",
      "Puisque: causa conocida por ambos. 'Puisque tu es là, aide-moi!' (causa obvia)",
      "Donc/ainsi/par conséquent: consecuencia. 'Il pleut, donc je reste.' (alors es más coloquial)",
      "Cependant/pourtant/néanmoins: oposición. Más formal que 'mais'.",
      "Bien que + subjonctif: concesión. 'Bien qu'il soit fatigué, il continue.'",
      "De plus/en outre/par ailleurs: adición de argumentos progresivos.",
      "En revanche: contraste neutro (en cambio). 'Paris est chère. En revanche, Lyon est abordable.'",
    ],
    table: [
      ["Función", "Conectores principales", "Registro"],
      ["Causa", "car, puisque, étant donné que", "formal/estándar"],
      ["Consecuencia", "donc, ainsi, par conséquent", "estándar/formal"],
      ["Oposición", "cependant, pourtant, néanmoins", "formal"],
    ],
    mistakes: [
      "\"Car il est malade, il reste\" ❌ — car no va al inicio: \"Il reste car il est malade\" ✓.",
      "\"Bien que il soit\" ❌ — elision ante vocal: \"Bien qu'il soit\" ✓.",
      "\"Donc il a décidé\" en mitad de oración — también válido, pero en inicio de oración requiere coma: \"Il a réfléchi. Donc, il a décidé.\" ✓.",
    ],
  },

  seo: [
    {
      heading: "Los conectores lógicos en francés: organizar el discurso",
      paragraphs: [
        "Los conectores lógicos (mots de liaison o articulateurs) son palabras o expresiones que establecen relaciones lógicas entre ideas: causa, consecuencia, oposición, concesión, adición, ilustración. Sin ellos, el discurso parece una lista de afirmaciones sin relación. Con ellos, el texto fluye de forma argumentativa y persuasiva.",
        "Para hispanohablantes, muchos conectores tienen equivalentes directos: 'donc' = por tanto/entonces, 'cependant' = sin embargo, 'car' = pues/ya que, 'de plus' = además. Sin embargo, el registro varía: 'mais' (pero, oral/informal), 'cependant' (sin embargo, formal), 'néanmoins' (no obstante, muy formal). Conocer estos matices de registro es clave para el nivel B1.",
      ],
    },
    {
      heading: "Causa y consecuencia: car, puisque, donc, par conséquent",
      paragraphs: [
        "Para expresar causa: 'parce que' (porque, oral) y 'car' (pues/ya que, escrito/formal) introducen la causa desconocida por el interlocutor. 'Puisque' (puesto que, ya que) introduce una causa conocida por ambos o una evidencia: 'Puisque tout le monde est d'accord, on commence!' 'Étant donné que' y 'vu que' son más formales y se usan en textos académicos y profesionales.",
        "Para expresar consecuencia: 'donc' y 'alors' son los más comunes en la lengua oral. En escrito formal: 'ainsi', 'par conséquent', 'c'est pourquoi', 'de ce fait'. 'Ainsi' puede colocarse al inicio de oración con inversión del sujeto: 'Ainsi peut-on conclure que...' — solo en francés muy formal. 'C'est pourquoi' es el más neutro y frecuente en composiciones escritas de nivel B1.",
      ],
      table: [
        ["Conector", "Significado", "Registro"],
        ["car / puisque", "porque / ya que", "estándar / formal"],
        ["donc / alors", "entonces / así que", "estándar / oral"],
        ["par conséquent", "por consiguiente", "formal"],
      ],
    },
    {
      heading: "Oposición y concesión: cependant, bien que, pourtant, en revanche",
      paragraphs: [
        "Los conectores de oposición señalan un contraste entre dos ideas sin que una anule a la otra: 'cependant' (sin embargo), 'pourtant' (sin embargo, a pesar de todo), 'néanmoins' (no obstante), 'toutefois' (sin embargo). 'En revanche' (en cambio) señala un contraste neutro, más descriptivo. 'Or' introduce una información inesperada que modifica el razonamiento anterior.",
        "Los conectores de concesión admiten una idea contraria pero no la refutan completamente: 'bien que + subjonctif' (aunque), 'quoique + subjonctif' (aunque), 'même si + indicatif' (incluso si), 'malgré + nom' (a pesar de). Ejemplo: 'Bien qu'il soit épuisé, il continue à travailler' (Aunque está agotado, sigue trabajando). La clave de 'bien que' y 'quoique' es que requieren subjuntivo.",
      ],
    },
  ],

  visual: {
    mode: "scene",
    teacherLens: "Conectores lógicos para articular ideas: adición (de plus), oposición (cependant), causa (car/puisque), consecuencia (donc/par conséquent), concesión (bien que).",
    graphicPrompt: "Diagrama de conectores organizados por función lógica con flechas entre ideas conectadas.",
    scene: [
      ["Ce restaurant est cher. Cependant, la qualité est exceptionnelle.", "Este restaurante es caro. Sin embargo, la calidad es excepcional."],
      ["Il ne parle pas espagnol; par conséquent, il a besoin d'un traducteur.", "No habla español; por consiguiente, necesita un traductor."],
      ["Puisque tu connais déjà la réponse, dis-la nous!", "¡Puesto que ya sabes la respuesta, dínosla!"],
      ["De plus, le gouvernement a annoncé de nouvelles mesures sociales.", "Además, el gobierno anunció nuevas medidas sociales."],
      ["Bien qu'il soit novice, il a réussi à impressionner tout le jury.", "Aunque es novato, logró impresionar a todo el jurado."],
      ["Elle travaille beaucoup; c'est pourquoi elle réussit toujours.", "Trabaja mucho; es por eso que siempre tiene éxito."],
      ["Il est intelligent. En revanche, il manque de motivation.", "Es inteligente. En cambio, le falta motivación."],
      ["Étant donné que les délais sont courts, on doit accélérer le rythme.", "Dado que los plazos son cortos, debemos acelerar el ritmo."],
    ],
    learnerModes: ["reading", "typing", "choosing"],
    reviewFocus: ["car vs puisque", "donc/par conséquent", "cependant/pourtant", "bien que + subjonctif"],
  },

  practice: {
    levels: [
      {
        id: "level-1",
        title: "Identifica la relación lógica",
        tag: "Opción múltiple",
        intro: "Elige el conector que mejor expresa la relación indicada entre paréntesis.",
        type: "choice",
        items: [
          {
            scene: "Argumentación",
            lines: [["", "Il n'a pas pu venir à la réunion ___ il était souffrant. (causa formal)"]],
            options: ["car", "donc", "cependant", "de plus"],
            answer: "car",
            explain: "'Car' introduce la causa de forma formal. No va al inicio de frase. Il n'a pas pu venir car il était souffrant.",
          },
          {
            scene: "Consecuencia",
            lines: [["", "Les négociations ont échoué; ___, les deux entreprises ont décidé d'aller en justice."]],
            options: ["par conséquent", "cependant", "puisque", "de plus"],
            answer: "par conséquent",
            explain: "'Par conséquent' expresa consecuencia formal. Las negociaciones fracasaron; por consiguiente, decidieron ir a juicio.",
          },
          {
            scene: "Oposición",
            lines: [["", "Le projet est ambitieux; ___, nous avons décidé de le réaliser malgré les risques."]],
            options: ["cependant", "donc", "car", "puisque"],
            answer: "cependant",
            explain: "'Cependant' expresa oposición formal (sin embargo). El proyecto es ambicioso; sin embargo, decidimos realizarlo.",
          },
          {
            scene: "Adición de argumentos",
            lines: [["", "Ce candidat a de l'expérience. ___, il parle trois langues étrangères."]],
            options: ["De plus", "Cependant", "Car", "Pourtant"],
            answer: "De plus",
            explain: "'De plus' añade un argumento adicional (además). Primero la experiencia, luego los idiomas como argumento extra.",
          },
          {
            scene: "Causa conocida",
            lines: [["", "___ tu es déjà au courant, je ne répéterai pas toute l'histoire."]],
            options: ["Puisque", "Car", "Donc", "Cependant"],
            answer: "Puisque",
            explain: "'Puisque' introduce una causa conocida por ambos. Puisque = ya que / dado que (hecho evidente o compartido).",
          },
          {
            scene: "Concesión con subjonctif",
            lines: [["", "___ il ___ beaucoup de difficultés, il ne se décourage jamais."]],
            options: ["Bien qu' / ait", "Bien que / a", "Quoique / a", "Malgré / ait"],
            answer: "Bien qu' / ait",
            explain: "'Bien que + subjonctif'. Avoir → subjonctif présent: qu'il ait. Bien qu'il ait = aunque tiene. Elision: bien qu' (avant voyelle).",
          },
          {
            scene: "Contraste neutro",
            lines: [["", "Lyon est moins chère que Paris. ___, elle offre moins d'opportunités professionnelles."]],
            options: ["En revanche", "De plus", "Car", "Ainsi"],
            answer: "En revanche",
            explain: "'En revanche' expresa contraste neutro (en cambio). Lyon es más barata; en cambio, ofrece menos oportunidades.",
          },
          {
            scene: "Consecuencia coloquial",
            lines: [["", "Il a oublié son rendez-vous; ___ il a dû s'excuser auprès de ses clients."]],
            options: ["donc", "car", "cependant", "puisque"],
            answer: "donc",
            explain: "'Donc' es el conector de consecuencia más común y neutro. Il a oublié, donc il a dû s'excuser.",
          },
        ],
      },
      {
        id: "level-2",
        title: "Completa los conectores",
        tag: "2 espacios",
        intro: "Completa las dos partes de la articulación lógica.",
        type: "dual",
        items: [
          {
            scene: "Texto argumentativo",
            lines: [["", "Ce médicament est efficace; [[0]], il peut provoquer des effets secondaires. [[1]], il est déconseillé aux enfants de moins de 12 ans."]],
            blanks: [
              { options: ["cependant", "donc", "puisque", "car"], answer: "cependant", explain: "'Cependant' pour l'opposition: el medicamento es eficaz; sin embargo, puede tener efectos secundarios." },
              { options: ["De plus", "Car", "Cependant", "Puisque"], answer: "De plus", explain: "'De plus' para añadir otro argumento negativo: además, está desaconsejado para niños." },
            ],
          },
          {
            scene: "Análisis de situación",
            lines: [["", "[[0]] les prix ont augmenté, les consommateurs achètent moins. [[1]], les commerces perdent de l'argent."]],
            blanks: [
              { options: ["Étant donné que", "Cependant", "De plus", "Par conséquent"], answer: "Étant donné que", explain: "'Étant donné que' introduce la causa (dado que). Los precios subieron → los consumidores compran menos." },
              { options: ["Par conséquent", "Cependant", "Puisque", "De plus"], answer: "Par conséquent", explain: "'Par conséquent' introduce la consecuencia formal. Por consiguiente, los comercios pierden dinero." },
            ],
          },
          {
            scene: "Recomendación profesional",
            lines: [["", "Je vous recommande chaudement ce candidat: il est très compétent. [[0]], il est disponible immédiatement. [[1]] ces qualités, je pense qu'il sera un atout pour votre équipe."]],
            blanks: [
              { options: ["En outre", "Cependant", "Car", "Pourtant"], answer: "En outre", explain: "'En outre' (además, por otra parte): añade un argumento en el mismo sentido. Más formal que 'de plus'." },
              { options: ["Étant donné", "Puisque", "Bien que", "Donc"], answer: "Étant donné", explain: "'Étant donné + nom' (dado / habida cuenta de). Étant donné ces qualités = dado estas cualidades." },
            ],
          },
          {
            scene: "Concesión y consecuencia",
            lines: [["", "[[0]] les résultats soient décevants, l'équipe ne renonce pas. [[1]], elle a décidé de revoir entièrement sa stratégie."]],
            blanks: [
              { options: ["Bien que", "Car", "Donc", "Puisque"], answer: "Bien que", explain: "'Bien que + subjonctif': concesión. Bien que les résultats soient = aunque los resultados sean. Soient = subjonctif de être." },
              { options: ["Au contraire", "Cependant", "Car", "Puisque"], answer: "Au contraire", explain: "'Au contraire' refuerza la idea opuesta: al contrario, decidió revisar toda su estrategia (reacción positiva ante la adversidad)." },
            ],
          },
        ],
      },
      {
        id: "level-3",
        title: "Editorial de prensa",
        tag: "Texto guiado",
        intro: "Completa este editorial usando los conectores lógicos correctos.",
        type: "guidedText",
        scene: "Un editorial sobre el teletrabajo en una revista de economía.",
        text: "Le télétravail s'est généralisé ces dernières années. [[0]], il présente des avantages indéniables pour les salariés: flexibilité, gain de temps, meilleure qualité de vie. [[1]], certaines études montrent que la productivité augmente quand on travaille de chez soi. [[2]], des inconvénients existent: l'isolement social et la difficulté à séparer vie professionnelle et personnelle. [[3]] ces problèmes sont réels, les entreprises qui offrent du télétravail attirent plus facilement les talents. [[4]], elles doivent mettre en place des solutions pour maintenir le lien social. [[5]] les difficultés, la tendance au télétravail semble irréversible. [[6]], les experts prévoient que plus de 30% des emplois seront en télétravail d'ici 2030.",
        blanks: [
          { options: ["D'abord", "Cependant", "Car", "Pourtant"], answer: "D'abord", explain: "'D'abord' (primero/en primer lugar): introduce el primer argumento. Estructura: d'abord... de plus... cependant..." },
          { options: ["De plus", "Cependant", "Car", "Pourtant"], answer: "De plus", explain: "'De plus' añade un argumento en el mismo sentido. Además de la flexibilidad, la productividad también aumenta." },
          { options: ["Cependant", "De plus", "Car", "Puisque"], answer: "Cependant", explain: "'Cependant' introduce la oposición: sin embargo, existen inconvenientes." },
          { options: ["Bien que", "Car", "Donc", "De plus"], answer: "Bien que", explain: "'Bien que + subjonctif': concesión. Bien que ces problèmes soient réels = aunque estos problemas son reales." },
          { options: ["C'est pourquoi", "Cependant", "Puisque", "De plus"], answer: "C'est pourquoi", explain: "'C'est pourquoi' = es por eso que / es la razón por la que. Introduce la consecuencia de manera neutral." },
          { options: ["Malgré", "Bien que", "Car", "Donc"], answer: "Malgré", explain: "'Malgré + nom': a pesar de. Malgré les difficultés = a pesar de las dificultades. No requiere subjuntivo (+ nom, pas de verbe)." },
          { options: ["Ainsi", "Cependant", "Car", "Puisque"], answer: "Ainsi", explain: "'Ainsi' introduce la conclusión o consecuencia. Así, los expertos prevén que... Puede ir al inicio con inversión en textos muy formales." },
        ],
      },
      {
        id: "level-4",
        title: "Conecta las ideas",
        tag: "Texto libre",
        intro: "Escribe el conector que mejor articula las ideas.",
        type: "freeText",
        scene: "Completa este texto argumentativo sobre el deporte.",
        text: "Faire du sport régulièrement présente de nombreux avantages pour la santé. [[0]], il permet de prévenir de nombreuses maladies chroniques. [[1]], les personnes qui bougent peu manquent souvent d'énergie. [[2]] le sport soit bénéfique, il est important de ne pas en abuser. [[3]] un excès de sport peut entraîner des blessures graves. [[4]], il est recommandé de consulter un médecin avant de commencer un programme intensif.",
        blanks: [
          { answer: "En effet", accepted: ["En effet", "Ainsi", "D'abord", "De plus"], explain: "'En effet' (en efecto / de hecho): confirma e ilustra la afirmación anterior. En efecto, previene enfermedades crónicas." },
          { answer: "En revanche", accepted: ["En revanche", "À l'inverse", "Par contre"], explain: "'En revanche' (en cambio): contraste. Por otro lado, las personas sedentarias carecen de energía." },
          { answer: "Bien que", accepted: ["Bien que", "Quoique"], explain: "'Bien que + subjonctif': aunque el deporte sea beneficioso. Bien que le sport soit bénéfique." },
          { answer: "Car", accepted: ["car", "puisque", "étant donné que", "parce que"], explain: "'Car' introduce la causa de forma formal. No puede ir al inicio de frase: ...ne pas abuser car un excès peut..." },
          { answer: "C'est pourquoi", accepted: ["C'est pourquoi", "Ainsi", "Par conséquent", "Donc"], explain: "'C'est pourquoi' = es por eso que. Introduce la recomendación como consecuencia lógica del argumento anterior." },
        ],
      },
      {
        id: "level-5",
        title: "Producción: argumenta con conectores",
        tag: "Producción",
        intro: "Escribe oraciones argumentativas usando los conectores indicados.",
        type: "write",
        items: [
          {
            scene: "Usa 'bien que'",
            prompt: "Escribe una oración de concesión sobre alguien que sigue trabajando aunque está cansado. Usa 'bien que + subjonctif'.",
            answer: "Bien qu'elle soit épuisée, elle continue à travailler jusqu'à très tard.",
            accepted: ["Bien qu'il soit", "Bien qu'elle soit", "bien que + subjonctif"],
            explain: "'Bien que + subjonctif': être → soit. Bien qu'elle soit épuisée = aunque está agotada. Elision: bien qu' (antes de voyelle).",
          },
          {
            scene: "Usa 'par conséquent'",
            prompt: "Escribe una consecuencia de la subida de precios del transporte.",
            answer: "Les prix du transport ont augmenté; par conséquent, de plus en plus de gens utilisent le vélo.",
            accepted: ["par conséquent", "c'est pourquoi", "donc"],
            explain: "'Par conséquent' expresa consecuencia formal. Se usa preferentemente con punto y coma antes o al inicio del segundo elemento.",
          },
          {
            scene: "Usa 'puisque'",
            prompt: "Escribe una frase donde alguien usa 'puisque' para referirse a algo evidente.",
            answer: "Puisque tu es déjà là, aide-moi à préparer la réunion!",
            accepted: ["Puisque tu es", "Puisque vous êtes", "Puisqu'il est"],
            explain: "'Puisque' introduce una causa conocida o evidente. Puisque (ya que) = evidencia compartida por ambos interlocutores.",
          },
          {
            scene: "Usa 'en revanche'",
            prompt: "Compara dos ciudades usando 'en revanche' para señalar un contraste.",
            answer: "Marseille est moins chère que Paris. En revanche, le marché du travail y est moins développé.",
            accepted: ["En revanche", "en revanche"],
            explain: "'En revanche' expresa contraste neutro sin juicio de valor: una cosa sí, la otra no. Diferente de 'mais' que es más informal.",
          },
        ],
      },
      {
        id: "level-6",
        title: "Misión: escribe un párrafo argumentativo",
        tag: "Producción libre",
        intro: "Escribe 3 oraciones sobre un tema de tu elección usando tres conectores diferentes.",
        type: "write",
        items: [
          {
            scene: "Causa y consecuencia",
            prompt: "Escribe dos oraciones enlazadas por causa (car/puisque) y consecuencia (donc/par conséquent) sobre el impacto de Internet.",
            answer: "Internet a révolutionné l'accès à l'information, car on peut trouver n'importe quelle donnée en quelques secondes. Par conséquent, les encyclopédies papier sont de moins en moins utilisées.",
            accepted: ["car", "puisque", "donc", "par conséquent", "c'est pourquoi"],
            explain: "Car introduce la causa; par conséquent introduce la consecuencia. Estructura argumentativa completa.",
          },
          {
            scene: "Adición de argumentos",
            prompt: "Escribe sobre las ventajas del bilingüismo usando 'de plus' y 'en outre'.",
            answer: "Le bilinguisme améliore les fonctions cognitives. De plus, il ouvre des portes dans le monde professionnel. En outre, il permet de découvrir d'autres cultures.",
            accepted: ["De plus", "En outre", "Par ailleurs"],
            explain: "De plus y en outre añaden argumentos sucesivos en el mismo sentido. Estructura de enumeración argumentativa.",
          },
          {
            scene: "Oposición y concesión",
            prompt: "Usa 'cependant' y 'bien que' para presentar las ventajas e inconvenientes de vivir en ciudad.",
            answer: "Vivre en ville offre de nombreuses commodités. Cependant, le bruit et la pollution sont des inconvénients majeurs. Bien qu'elle soit pratique, la vie citadine peut être stressante.",
            accepted: ["Cependant", "Bien que", "bien qu'"],
            explain: "Cependant para la oposición; bien que + subjonctif para la concesión. Elle soit = subjonctif de être (femenino: la vie).",
          },
        ],
      },
    ],
  },
}

export default topic
