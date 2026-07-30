import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'imperativ-b1',
  order: '16',
  color: '#1a2ecc',
  category: 'Modus',
  level: 'B1',
  title: 'El Imperativo Alemán B1 — du, ihr y Sie con Irregulares',
  shortTitle: 'Imperativ',
  metaTitle: 'Imperativo Alemán B1 — du Geh!, ihr Geht!, Sie Gehen Sie! con irregulares',
  description:
    'El imperativo alemán tiene tres formas: du (informal singular), ihr (informal plural) y Sie (formal). Los verbos con cambio vocálico e→i mantienen el cambio en du. Los verbos sein, haben y los modales tienen formas propias.',
  lead: 'Aprende a dar órdenes, instrucciones y recomendaciones en las tres formas del imperativo alemán: du, ihr y Sie, incluyendo los verbos irregulares más frecuentes.',
  outcomes: [
    'Forma el imperativo en du, ihr y Sie para verbos regulares',
    'Aplica el cambio vocálico e→i en el imperativo du de verbos como geben, nehmen, lesen',
    'Distingue cuándo se añade -e en el imperativo du (verbos en -ten, -nen)',
    'Usa las formas irregulares sein (Sei!/Seid!/Seien Sie!)',
    'Construye frases de instrucción, ruego y recomendación con imperativo',
  ],

  guide: {
    goal: 'Dar órdenes, instrucciones y recomendaciones en las tres personas del imperativo alemán de forma natural.',
    model: 'Komm bitte! (du) / Kommt bitte! (ihr) / Kommen Sie bitte! (Sie)',
    formula: 'du: raíz  |  ihr: presente ihr  |  Sie: Infinitiv + Sie (invertido)',
    decisions: [
      'Para du: toma la raíz del presente (quita -en del infinitivo). Verbos regulares: kommen → Komm!, gehen → Geh!, machen → Mach!',
      'Si la raíz termina en -t, -d, -ig o consonante difícil de pronunciar, añade -e: arbeiten → Arbeite!, öffnen → Öffne!, atmen → Atme!',
      'Verbos con cambio e→i en el presente du conservan ese cambio en el imperativo: geben → Gib!, nehmen → Nimm!, lesen → Lies!, sprechen → Sprich!',
      'Verbos con cambio e→ie también conservan el cambio: sehen → Sieh!, empfehlen → Empfiehl!',
      'ATENCIÓN: verbos con cambio a→ä NO conservan la Umlaut en imperativo: fahren → Fahr! (no: Fähr!), schlafen → Schlaf!',
      'Para ihr: usa exactamente la forma del presente ihr: ihr kommt → Kommt!, ihr geht → Geht!, ihr arbeitet → Arbeitet!',
      'Para Sie: Infinitiv + Sie en orden invertido: kommen → Kommen Sie!, gehen → Gehen Sie!, sein → Seien Sie!',
      'sein es irregular en todos: du → Sei!, ihr → Seid!, Sie → Seien Sie!',
    ],
    table: [
      ['Forma', 'Regla', 'Ejemplo (kommen / geben / sein)'],
      ['du', 'raíz verbal (+ -e si necesario)', 'Komm! / Gib! / Sei!'],
      ['ihr', 'presente ihr sin cambio', 'Kommt! / Gebt! / Seid!'],
      ['Sie', 'Infinitiv + Sie (invertido)', 'Kommen Sie! / Geben Sie! / Seien Sie!'],
    ],
    mistakes: [
      '"Gehst!" para du ❌ → "Geh!" ✓ — el imperativo du no lleva la terminación -st del presente.',
      '"Gebe!" para du de geben ❌ → "Gib!" ✓ — los verbos con cambio e→i conservan ese cambio.',
      '"Fahre!" ❌ → "Fahr!" ✓ — los verbos con a→ä NO conservan la Umlaut en el imperativo.',
      '"Kommen Sie?" ❌ → "Kommen Sie!" ✓ — el imperativo Sie termina en signo de exclamación, no en interrogación.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma el imperativo en alemán?',
      paragraphs: [
        'El imperativo alemán (Imperativ) tiene tres personas: du para una persona de confianza, ihr para un grupo de confianza y Sie para el trato formal. Cada forma tiene su propia regla de construcción.',
        'La forma du es la más compleja porque parte de la raíz verbal y tiene excepciones con cambio vocálico. La forma ihr coincide exactamente con el presente y la forma Sie invierte el orden del infinitivo y el pronombre.',
      ],
      table: [
        ['Persona', 'Base de formación', 'kommen', 'geben (e→i)', 'sein (irr.)'],
        ['du', 'raíz verbal', 'Komm!', 'Gib!', 'Sei!'],
        ['ihr', 'presente ihr', 'Kommt!', 'Gebt!', 'Seid!'],
        ['Sie', 'Infinitiv + Sie', 'Kommen Sie!', 'Geben Sie!', 'Seien Sie!'],
      ],
    },
    {
      heading: '¿Cómo es el imperativo con du en alemán?',
      paragraphs: [
        'Para el imperativo du se quita la terminación -en del infinitivo y queda la raíz: machen → Mach!, kommen → Komm!, gehen → Geh!. Algunos verbos añaden -e final si la raíz termina en -t, -d o en consonante difícil: arbeiten → Arbeite!, öffnen → Öffne!',
        'Los verbos con cambio vocálico e→i (o e→ie) en la forma du del presente mantienen ese cambio en el imperativo: geben → du gibst → Gib!, nehmen → du nimmst → Nimm!, lesen → du liest → Lies!, sehen → du siehst → Sieh!. En cambio, los verbos con a→ä NO conservan la Umlaut: fahren → Fahr! (no: Fähr!).',
      ],
      table: [
        ['Infinitivo', 'Presente du', 'Imperativo du'],
        ['geben', 'du gibst', 'Gib!'],
        ['nehmen', 'du nimmst', 'Nimm!'],
        ['lesen', 'du liest', 'Lies!'],
        ['sehen', 'du siehst', 'Sieh!'],
        ['sprechen', 'du sprichst', 'Sprich!'],
        ['fahren', 'du fährst', 'Fahr! (sin Umlaut)'],
      ],
    },
    {
      heading: '¿Para qué se usa el imperativo en alemán?',
      paragraphs: [
        'El imperativo no solo expresa órdenes directas; con palabras como bitte (por favor), doch o mal se suaviza el tono: "Komm bitte!" (¡Ven, por favor!), "Mach mal die Tür zu!" (¡Cierra la puerta, anda!). En recetas, manuales e instrucciones se usa el imperativo Sie o el infinitivo como forma impersonal.',
        'En contextos cotidianos de B1 aparece constantemente: dar direcciones, pedir ayuda, hacer recomendaciones. "Nehmen Sie die erste Straße links" (Tome la primera calle a la izquierda), "Sei nicht so nervös!" (¡No estés tan nervioso!).',
      ],
      examples: [
        ['Orden directa', 'Geh sofort ins Bett! (¡Vete a la cama ahora mismo!)'],
        ['Ruego suavizado', 'Ruf mich bitte an! (¡Llámame, por favor!)'],
        ['Instrucción formal', 'Füllen Sie das Formular aus. (Rellene el formulario.)'],
        ['Recomendación', 'Lern täglich Vokabeln! (¡Aprende vocabulario cada día!)'],
      ],
    },
    {
      heading: 'Verbos irregulares: sein, haben y los modales',
      paragraphs: [
        'El verbo sein es el más irregular en el imperativo: du → Sei!, ihr → Seid!, Sie → Seien Sie!. El verbo haben es regular en la práctica: Hab!/Habt!/Haben Sie!, pero se usa mucho más con otras construcciones.',
        'Los verbos modales no tienen imperativo propio en la práctica cotidiana. En lugar de un imperativo de können o müssen se usan construcciones con sollen: "Du sollst kommen" o simplemente el imperativo de otro verbo. La excepción es la fórmula "Sei bitte so nett und..." (Sé tan amable de...).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Imperativo B1: tres formas (du/ihr/Sie), cambio vocálico e→i, sein irregular, partículas suavizadoras bitte/doch/mal.',
    graphicPrompt: 'Tres personajes: uno recibe una instrucción informal (du), un grupo recibe una orden colectiva (ihr) y una persona formal recibe una petición cortés (Sie). Bocadillos con el imperativo correspondiente.',
    scene: [
      ['Freund (du)', 'Komm bitte mal her!'],
      ['Klasse (ihr)', 'Öffnet eure Bücher auf Seite 20!'],
      ['Arzt (Sie)', 'Nehmen Sie bitte Platz!'],
      ['Eltern (ihr)', 'Seid bitte ruhig!'],
      ['Chef (Sie)', 'Schicken Sie mir die E-Mail.'],
    ],
    learnerModes: ['Identifica la forma correcta según el contexto (du/ihr/Sie)', 'Aplica el cambio vocálico en du', 'Suaviza órdenes con bitte, doch, mal'],
    practiceVerbs: ['kommen', 'gehen', 'geben', 'nehmen', 'lesen', 'sein', 'haben', 'machen', 'sprechen', 'schreiben'],
    reviewFocus: ['¿Lleva -e el imperativo du de arbeiten?', '¿Conserva la Umlaut fahren en imperativo?', '¿Cómo es el imperativo Sie de sein?'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        type: 'choice',
        title: 'Reconoce la forma correcta',
        tag: 'Comprensión',
        intro: 'Elige el imperativo correcto para cada persona y verbo.',
        items: [
          {
            scene: 'Un amigo te pide que vengas. ¿Cuál es el imperativo du de "kommen"?',
            lines: [['Amigo', '___ bitte her!']],
            options: ['Kommst', 'Komm', 'Kommen', 'Kommt'],
            answer: 'Komm',
            explain: 'Imperativo du de kommen: raíz kom- → Komm! (sin -st, sin -en).',
          },
          {
            scene: 'Un profesor habla a toda la clase. ¿Cuál es el imperativo ihr de "lesen"?',
            lines: [['Lehrer', '___ bitte Seite 15!']],
            options: ['Lies', 'Lest', 'Lesen', 'Liest'],
            answer: 'Lest',
            explain: 'Imperativo ihr de lesen: coincide con el presente ihr lest → Lest! (sin Umlaut, sin -en).',
          },
          {
            scene: 'Un médico habla a un paciente (Sie). ¿Cuál es el imperativo formal de "nehmen"?',
            lines: [['Arzt', '___ diese Tablette dreimal täglich!']],
            options: ['Nimm Sie', 'Nehmt Sie', 'Nehmen Sie', 'Nimmst Sie'],
            answer: 'Nehmen Sie',
            explain: 'Imperativo Sie: Infinitiv + Sie invertido. nehmen → Nehmen Sie!',
          },
          {
            scene: '¿Cuál es el imperativo du del verbo "geben" (e→i)?',
            lines: [['Mutter', '___ mir bitte das Buch!']],
            options: ['Gebe', 'Gebt', 'Geben', 'Gib'],
            answer: 'Gib',
            explain: 'geben tiene cambio e→i: du gibst → imperativo du: Gib! (no Gebe).',
          },
          {
            scene: '¿Cuál es el imperativo du de "fahren" (a→ä)?',
            lines: [['Vater', '___ vorsichtig!']],
            options: ['Fährt', 'Fähr', 'Fahre', 'Fahr'],
            answer: 'Fahr',
            explain: 'fahren: a→ä en el presente PERO en el imperativo du NO se conserva la Umlaut: Fahr! (no Fähr!).',
          },
        ],
      },
      {
        id: 'level-2',
        type: 'choice',
        title: 'Imperativo vs. otras formas',
        tag: 'Distinción',
        intro: 'Identifica qué forma del imperativo corresponde al contexto dado.',
        items: [
          {
            scene: 'Hablas con tu hermano (informal, singular). ¿Cómo le pides que espere?',
            lines: [['Tú', '___ kurz!']],
            options: ['Wartet', 'Warte', 'Warten Sie', 'Wartest'],
            answer: 'Warte',
            explain: 'Para singular informal (du): imperativo du. warten termina en -ten → añade -e: Warte!',
          },
          {
            scene: 'Un jefe habla a dos empleados (plural informal). ¿Cómo les pide que escriban un informe?',
            lines: [['Chef', '___ einen Bericht!']],
            options: ['Schreib', 'Schreibt', 'Schreiben Sie', 'Schreibst'],
            answer: 'Schreibt',
            explain: 'Para plural informal (ihr): presente ihr schreibt → Schreibt!',
          },
          {
            scene: 'En una reunión formal con un cliente. ¿Cómo le pides que hable más despacio?',
            lines: [['Tú (formal)', '___ bitte langsamer!']],
            options: ['Sprich', 'Sprecht', 'Sprechen Sie', 'Spreche'],
            answer: 'Sprechen Sie',
            explain: 'Para formal (Sie): Infinitiv + Sie → Sprechen Sie! La forma du Sprich es solo para amigos.',
          },
          {
            scene: '¿Cómo le dices a un amigo "¡Sé puntual!" usando sein?',
            lines: [['Tú', '___ bitte pünktlich!']],
            options: ['Sind Sie', 'Seid', 'Sei', 'Bist'],
            answer: 'Sei',
            explain: 'sein es irregular. Imperativo du: Sei! (ihr: Seid!, Sie: Seien Sie!).',
          },
          {
            scene: 'Un instructor dice a un grupo de estudiantes que abran sus cuadernos.',
            lines: [['Instructor', '___ eure Hefte auf!']],
            options: ['Öffne', 'Öffnet', 'Öffnen Sie', 'Öffnest'],
            answer: 'Öffnet',
            explain: 'Para ihr: presente ihr öffnet → Öffnet! (ihr = plural informal = todo el grupo).',
          },
        ],
      },
      {
        id: 'level-3',
        type: 'dual',
        title: 'Forma el imperativo correcto',
        tag: 'Producción',
        intro: 'Completa cada imperativo con la forma correcta según la persona indicada.',
        items: [
          {
            scene: 'Imperativo du de "sprechen" (e→i)',
            lines: [['Mutter a niño', '[[0]] bitte deutlicher!']],
            blanks: [
              { answer: 'Sprich', explain: 'sprechen e→i: du sprichst → Sprich!' },
            ],
          },
          {
            scene: 'Imperativo ihr de "sein" (irregular)',
            lines: [['Lehrer a clase', '[[0]] bitte ruhig!']],
            blanks: [
              { answer: 'Seid', explain: 'sein irregular: ihr → Seid!' },
            ],
          },
          {
            scene: 'Imperativo Sie de "warten"',
            lines: [['Sekretärin al cliente', '[[0]] bitte einen Moment, Herr Müller.']],
            blanks: [
              { answer: 'Warten Sie', explain: 'Sie formal: Infinitiv + Sie → Warten Sie!' },
            ],
          },
          {
            scene: 'Imperativo du de "nehmen" (e→i)',
            lines: [['Freund', '[[0]] noch ein Stück Kuchen!']],
            blanks: [
              { answer: 'Nimm', explain: 'nehmen e→i: du nimmst → Nimm!' },
            ],
          },
          {
            scene: 'Imperativo du de "arbeiten" (necesita -e)',
            lines: [['Vater', '[[0]] fleißiger!']],
            blanks: [
              { answer: 'Arbeite', explain: 'arbeiten termina en -ten → du: Arbeite! (con -e).' },
            ],
          },
        ],
      },
      {
        id: 'level-4',
        type: 'guidedText',
        title: 'Instrucciones de receta',
        tag: 'Texto guiado',
        intro: 'Completa esta receta con el imperativo Sie correcto (instrucciones formales).',
        scene: 'Receta de sopa de tomate — instrucciones formales',
        text: 'Zuerst [[0]] Sie die Tomaten. Dann [[1]] Sie etwas Öl in einem Topf. [[2]] Sie die Zwiebeln dazu und [[3]] Sie alles gut. Am Ende [[4]] Sie mit Salz und Pfeffer.',
        blanks: [
          { answer: 'waschen', explain: 'waschen → Waschen Sie (instrucción formal con Sie).' },
          { answer: 'erhitzen', explain: 'erhitzen → Erhitzen Sie.' },
          { answer: 'Geben', explain: 'geben → Geben Sie (al inicio de oración, con mayúscula).' },
          { answer: 'rühren', explain: 'rühren → rühren Sie (continuación de la misma oración).' },
          { answer: 'würzen', explain: 'würzen → Würzen Sie.' },
        ],
      },
      {
        id: 'level-5',
        type: 'freeText',
        title: 'Señales y advertencias',
        tag: 'Lectura activa',
        intro: 'Lee las señales e indica qué imperativo contienen y a quién van dirigidas.',
        scene: 'Señales públicas en alemán — ¿qué dicen?',
        text: 'Señal 1: "Nicht rauchen!" → forma: [[0]] / persona: [[1]]. Señal 2: "Fahren Sie rechts!" → forma: [[2]] / persona: [[3]]. Señal 3: "Bleibt auf dem Weg!" → forma: [[4]] / persona: [[5]].',
        blanks: [
          { answer: 'Imperativo', explain: 'Nicht + imperativo es una forma de prohibición.' },
          { answer: 'Sie (impersonal)', explain: '"Nicht rauchen" usa el infinitivo como imperativo impersonal/público.' },
          { answer: 'Fahren Sie', explain: 'Fahren Sie: imperativo formal Sie.' },
          { answer: 'Sie (formal)', explain: 'Sie indica trato formal.' },
          { answer: 'Bleibt', explain: 'Bleibt: imperativo ihr de bleiben.' },
          { answer: 'ihr (plural informal)', explain: 'Bleibt va dirigido a un grupo de personas (ihr).' },
        ],
      },
      {
        id: 'level-6',
        type: 'write',
        title: 'Redacta instrucciones y ruegos',
        tag: 'Escritura libre',
        intro: 'Escribe el imperativo completo según el contexto dado.',
        items: [
          {
            scene: 'Le pides a tu amigo (du) que cierre la ventana.',
            prompt: '¿Cómo dices "¡Cierra la ventana!" en alemán?',
            answer: 'Mach das Fenster zu!',
            accepted: ['Schließ das Fenster!', 'Mach das Fenster bitte zu!', 'Schließe das Fenster!'],
            explain: 'zumachen (separable) → Mach das Fenster zu! / schließen → Schließ das Fenster!',
          },
          {
            scene: 'Un médico (Sie) le dice a un paciente que descanse mucho.',
            prompt: '¿Cómo dice "Descanse mucho" formalmente?',
            answer: 'Ruhen Sie sich bitte viel aus.',
            accepted: ['Erholen Sie sich gut!', 'Schlafen Sie viel!', 'Ruhen Sie viel.'],
            explain: 'ausruhen (reflexivo separable): Ruhen Sie sich aus. / erholen: Erholen Sie sich.',
          },
          {
            scene: 'Le dices a un grupo de amigos (ihr) que sean puntuales.',
            prompt: 'Escribe el imperativo ihr de sein + pünktlich.',
            answer: 'Seid bitte pünktlich!',
            accepted: ['Seid pünktlich!'],
            explain: 'sein → ihr: Seid! Seid bitte pünktlich! es la forma más natural.',
          },
          {
            scene: 'Un amigo te pregunta cómo hablar mejor alemán. Dale tres consejos con imperativo du.',
            prompt: 'Escribe tres consejos con imperativo du (una oración por consejo).',
            answer: 'Lern jeden Tag Vokabeln! Lies viele Bücher auf Deutsch! Sprich mit Muttersprachlern!',
            accepted: ['Übe täglich!', 'Schau deutsche Filme!', 'Höre Podcasts auf Deutsch!'],
            explain: 'lernen → Lern!, lesen (e→ie) → Lies!, sprechen (e→i) → Sprich!',
          },
        ],
      },
    ],
  },
}

export default topic
