import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'subjonctif-present-b1',
  order: '05',
  color: '#1a2ecc',
  category: 'Verbes',
  level: 'B1',
  title: 'Le Subjonctif Présent en Francés B1',
  shortTitle: 'Subjonctif Présent',
  metaTitle: 'Subjonctif Présent B1 — Cuándo y cómo usar el subjuntivo en francés',
  description:
    'El subjonctif présent se usa en francés después de verbos de deseo, emoción, duda y expresiones impersonales. Se forma con la raíz de la tercera persona plural del présent + terminaciones especiales. Comprender sus usos es esencial para alcanzar el nivel B1 en francés.',
  lead: 'Aprende el subjonctif présent: cuándo es obligatorio, cómo se forma y qué expresiones lo desencadenan en el francés cotidiano.',
  outcomes: [
    'Formas el subjonctif présent de verbos regulares e irregulares',
    'Identificas expresiones que desencadenan el subjonctif',
    'Usas el subjonctif después de verbos de deseo, emoción y duda',
    'Aplicas el subjonctif con expresiones impersonales como il faut que',
  ],

  guide: {
    goal: 'Usar el subjonctif présent correctamente después de expresiones de deseo, emoción, necesidad y duda.',
    model: "Il faut que tu finisses ton travail. / Je veux qu'elle vienne. / Je suis content(e) que tu sois là.",
    formula: "Raíz de ils/elles (présent) + terminaciones: -e, -es, -e, -ions, -iez, -ent",
    decisions: [
      'Formación regular: raíz = 3ª persona plural del présent sin -ent → parler: ils parlent → parl- → que je parle.',
      'Verbos con doble raíz (nous/vous diferentes): prendre → je prenne / nous prenions; venir → je vienne / nous venions.',
      'Irregulares clave: être (je sois, tu sois, il soit, nous soyons, vous soyez, ils soient), avoir (j\'aie, tu aies, il ait, nous ayons, vous ayez, ils aient), aller (j\'aille, nous allions), faire (je fasse), pouvoir (je puisse), savoir (je sache).',
      'Después de que (que) + verbo de deseo/voluntad: vouloir, souhaiter, désirer, préférer, demander, exiger.',
      'Después de expresiones de emoción: être content(e)/triste/surpris(e)/heureux/heureuse/fâché(e) que.',
      'Después de expresiones impersonales: il faut que, il est important que, il est possible que, il est dommage que.',
    ],
    table: [
      ['Persona', 'Parler (regular)', 'Être (irregular)'],
      ['je / tu / il/elle', 'parle / parles / parle', 'sois / sois / soit'],
      ['nous / vous', 'parlions / parliez', 'soyons / soyez'],
      ['ils/elles', 'parlent', 'soient'],
    ],
    mistakes: [
      '"Il faut que tu finis" ❌ → "Il faut que tu finisses" ✓ — faut que siempre exige subjonctif.',
      '"Je veux que tu es là" ❌ → "Je veux que tu sois là" ✓ — vouloir que + subjonctif (sois, no es).',
      '"Bien que il est fatigué" ❌ → "Bien qu\'il soit fatigué" ✓ — bien que siempre + subjonctif.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el subjonctif en francés y cuándo se usa?',
      paragraphs: [
        'El subjonctif (subjuntivo) es un modo verbal que expresa subjetividad: deseo, emoción, duda, necesidad o incertidumbre. A diferencia del indicatif, que presenta hechos como reales, el subjonctif presenta situaciones como deseadas, temidas, dudosas o dependientes de la perspectiva del hablante.',
        'En francés, el subjonctif aparece casi siempre en oraciones subordinadas introducidas por "que", después de ciertos verbos y expresiones. Para hispanohablantes es más fácil de entender que para angloparlantes, porque el español también tiene subjuntivo y su lógica es similar.',
      ],
    },
    {
      heading: 'Formación del subjonctif présent',
      paragraphs: [
        'La regla base para verbos regulares: toma la forma de la 3ª persona plural del présent de l\'indicatif, quita -ent, y añade -e, -es, -e, -ions, -iez, -ent. Ejemplo: "parler" → ils parlent → raíz: parl- → que je parle, que tu parles, qu\'il parle, que nous parlions, que vous parliez, qu\'ils parlent.',
        'Los verbos "être" y "avoir" son completamente irregulares y deben memorizarse: être → que je sois, que tu sois, qu\'il soit, que nous soyons, que vous soyez, qu\'ils soient. Avoir → que j\'aie, que tu aies, qu\'il ait, que nous ayons, que vous ayez, qu\'ils aient.',
      ],
      table: [
        ['Verbo', 'Je / Tu', 'Il/Elle', 'Nous / Vous'],
        ['parler', 'parle / parles', 'parle', 'parlions / parliez'],
        ['finir', 'finisse / finisses', 'finisse', 'finissions / finissiez'],
        ['prendre', 'prenne / prennes', 'prenne', 'prenions / preniez'],
        ['être', 'sois / sois', 'soit', 'soyons / soyez'],
        ['avoir', 'aie / aies', 'ait', 'ayons / ayez'],
      ],
    },
    {
      heading: 'Expresiones que desencadenan el subjonctif',
      paragraphs: [
        'Verbos de deseo y voluntad: vouloir que, souhaiter que, désirer que, préférer que, demander que, exiger que. Ejemplo: "Je veux que tu viennes." / "Elle souhaite que nous réussissions."',
        'Verbos de emoción: être content(e) / triste / surpris(e) / heureux(se) / fâché(e) / désolé(e) / inquiet(ète) que. Ejemplo: "Je suis heureux qu\'il soit guéri." / "Elle est triste que tu partes."',
      ],
    },
    {
      heading: 'Expresiones impersonales con subjonctif',
      paragraphs: [
        'Las expresiones impersonales (con "il") que desencadenan el subjonctif son muy frecuentes: il faut que (hay que), il est important que, il est nécessaire que, il est possible que, il est impossible que, il est dommage que (es una lástima que), il vaut mieux que (es mejor que).',
        'Ejemplos: "Il faut que vous fassiez vos devoirs." / "Il est important qu\'elle prenne une décision." / "Il est possible que le train soit en retard." / "Il vaut mieux que tu restes chez toi."',
      ],
    },
    {
      heading: 'Conectores que exigen subjonctif',
      paragraphs: [
        'Además de "que" subordinante, hay conectores que siempre exigen subjonctif: bien que/quoique (aunque), pour que/afin que (para que), avant que (antes de que), à moins que (a menos que), jusqu\'à ce que (hasta que), sans que (sin que).',
        'Ejemplos: "Il travaille bien qu\'il soit fatigué." / "Je te téléphone avant que tu partes." / "Je resterai jusqu\'à ce que tu arrives." Estos conectores son cruciales para el nivel B1 y aparecen mucho en textos escritos.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Subjonctif présent en expresiones de deseo, necesidad y emoción.',
    graphicPrompt: 'Nubes de pensamiento con subjonctif vs hechos reales en indicatif.',
    scene: [
      ["Il faut que tu étudies ce soir.", "Hace falta que estudies esta noche."],
      ["Je veux que vous soyez ponctuels.", "Quiero que sean puntuales."],
      ["Bien qu'il soit malade, il travaille.", "Aunque esté enfermo, trabaja."],
      ["Je suis content(e) qu'elle soit là.", "Estoy contento/a de que ella esté aquí."],
      ["Il est important que nous parlions.", "Es importante que hablemos."],
      ["Pour que tu réussisses, travaille bien.", "Para que tengas éxito, trabaja bien."],
      ["Elle est triste que tu partes.", "Ella está triste de que te vayas."],
      ["Il vaut mieux que tu restes.", "Es mejor que te quedes."],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['formación subjonctif', 'être/avoir irregulares', 'conectores + subjonctif'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el subjonctif correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de subjonctif présent.',
        type: 'choice',
        items: [
          {
            scene: 'Obligación con il faut',
            lines: [['', "Il faut que tu ___ avant 18h."]],
            options: ['partes', 'pars', 'partiras', 'parte'],
            answer: 'partes',
            explain: '"Il faut que" + subjonctif: partir → que tu partes.',
          },
          {
            scene: 'Deseo del jefe',
            lines: [['', "Le directeur veut que nous ___ ce rapport."]],
            options: ['finissions', 'finissons', 'finirons', 'finissez'],
            answer: 'finissions',
            explain: '"Vouloir que" + subjonctif: finir → que nous finissions.',
          },
          {
            scene: 'Emoción de la madre',
            lines: [['', "Sa mère est heureuse qu'elle ___ reçue à l'université."]],
            options: ['soit', 'est', 'sera', 'serait'],
            answer: 'soit',
            explain: '"Être heureux/heureuse que" + subjonctif: être → qu\'elle soit.',
          },
          {
            scene: 'Aunque tenga miedo',
            lines: [['', "Bien qu'elle ___ peur, elle a fait le saut en parachute."]],
            options: ['ait', 'a', 'aura', 'avait'],
            answer: 'ait',
            explain: '"Bien que" siempre + subjonctif: avoir → qu\'elle ait.',
          },
          {
            scene: 'Para que entiendan',
            lines: [['', "Je parle lentement pour que vous ___."]],
            options: ['compreniez', 'comprenez', 'comprendrez'],
            answer: 'compreniez',
            explain: '"Pour que" + subjonctif: comprendre → que vous compreniez.',
          },
          {
            scene: 'Necesidad',
            lines: [['', "Il est nécessaire que tu ___ une décision aujourd'hui."]],
            options: ['prennes', 'prends', 'prendras', 'prendes'],
            answer: 'prennes',
            explain: '"Il est nécessaire que" + subjonctif: prendre → que tu prennes.',
          },
          {
            scene: 'Hasta que llegue',
            lines: [['', "Attends ici jusqu'à ce qu'elle ___."]],
            options: ['arrive', 'arrivera', 'est arrivée', 'arriverait'],
            answer: 'arrive',
            explain: '"Jusqu\'à ce que" + subjonctif: arriver → qu\'elle arrive.',
          },
          {
            scene: 'Lástima',
            lines: [['', "Il est dommage que vous ne ___ pas venir."]],
            options: ['puissiez', 'pouvez', 'pourrez', 'pouviez'],
            answer: 'puissiez',
            explain: '"Il est dommage que" + subjonctif: pouvoir → que vous puissiez.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Subjuntivo en contexto',
        tag: '2 espacios',
        intro: 'Completa con las formas correctas de subjonctif.',
        type: 'dual',
        items: [
          {
            scene: 'Requisitos del trabajo',
            lines: [['', "Il est essentiel que vous [[0]] couramment l'anglais et que vous [[1]] de l'expérience."]],
            blanks: [
              { options: ['parliez', 'parlez', 'parlerez', 'parlez'], answer: 'parliez', explain: '"Il est essentiel que" + subjonctif: parler → que vous parliez.' },
              { options: ['ayez', 'avez', 'aurez', 'ayiez'], answer: 'ayez', explain: 'Avoir en subjonctif: que vous ayez.' },
            ],
          },
          {
            scene: 'Preocupación de los padres',
            lines: [['', "Ses parents sont contents qu'il [[0]] ses études et qu'il [[1]] un bon travail."]],
            blanks: [
              { options: ['finisse', 'finit', 'finira', 'finissait'], answer: 'finisse', explain: '"Être content que" + subjonctif: finir → qu\'il finisse.' },
              { options: ['trouve', 'trouve', 'trouvera', 'trouvait'], answer: 'trouve', explain: 'Trouver en subjonctif: qu\'il trouve (= parle + 3ème pers pl: ils trouvent → trouv-).' },
            ],
          },
          {
            scene: 'Instrucciones antes del viaje',
            lines: [['', "Avant que tu [[0]], vérifie que tu [[1]] tous tes documents."]],
            blanks: [
              { options: ['partes', 'pars', 'partiras', 'parte'], answer: 'partes', explain: '"Avant que" + subjonctif: partir → que tu partes.' },
              { options: ['aies', 'as', 'auras', 'avais'], answer: 'aies', explain: 'Avoir en subjonctif: que tu aies.' },
            ],
          },
          {
            scene: 'Condición del médico',
            lines: [['', "Le médecin recommande qu'elle [[0]] du repos et qu'elle ne [[1]] pas de sport pendant une semaine."]],
            blanks: [
              { options: ['prenne', 'prend', 'prendra', 'prenait'], answer: 'prenne', explain: 'Prendre en subjonctif: qu\'elle prenne.' },
              { options: ['fasse', 'fait', 'fera', 'faisait'], answer: 'fasse', explain: 'Faire en subjonctif: qu\'elle ne fasse pas.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Instrucciones para el viaje',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta de subjonctif o indicatif según la expresión.',
        type: 'guidedText',
        scene: 'Una madre da instrucciones a su hijo antes de un viaje largo.',
        text: "Avant que tu [[0]] (partir), je veux que tu [[1]] (appeler) ta grand-mère. Il est important que tu [[2]] (avoir) assez d'argent et que tu [[3]] (ne pas oublier) ton passeport. Bien que tu [[4]] (être) grand maintenant, je m'inquiète toujours. Je suis contente que tu [[5]] (pouvoir) voyager, mais il faut que tu me [[6]] (écrire) tous les jours.",
        blanks: [
          { options: ['partes', 'pars', 'partiras', 'parte'], answer: 'partes', explain: '"Avant que" + subjonctif: partir → que tu partes.' },
          { options: ['appelles', 'appelle', 'appellerai', 'appeleras'], answer: 'appelles', explain: '"Je veux que" + subjonctif: appeler → que tu appelles.' },
          { options: ['aies', 'as', 'auras', 'avais'], answer: 'aies', explain: '"Il est important que" + subjonctif: avoir → que tu aies.' },
          { options: ["n'oublies", "n'oublie", "n'oublieras", "n'oubliais"], answer: "n'oublies", explain: 'Subjonctif negativo: que tu n\'oublies pas.' },
          { options: ['sois', 'es', 'seras', 'étais'], answer: 'sois', explain: '"Bien que" + subjonctif: être → que tu sois.' },
          { options: ['puisses', 'peux', 'pourras', 'pouvais'], answer: 'puisses', explain: '"Je suis content(e) que" + subjonctif: pouvoir → que tu puisses.' },
          { options: ['écrives', 'écris', 'écriras', 'écrivais'], answer: 'écrives', explain: '"Il faut que" + subjonctif: écrire → que tu écrives.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el subjonctif',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del subjonctif para cada verbo.',
        type: 'freeText',
        scene: 'Discurso de un director en una reunión de empresa.',
        text: "Il est essentiel que chaque employé [[0]] (comprendre) les nouveaux objectifs. Je voudrais que nous [[1]] (travailler) en équipe. Il faut que tout le monde [[2]] (être) impliqué dans ce projet. Il est important que les résultats [[3]] (être) visibles avant la fin du mois. Bien que ce [[4]] (être) difficile, je suis sûr que nous réussirons.",
        blanks: [
          { answer: 'comprenne', accepted: ['comprenne'], explain: 'Comprendre en subjonctif: que chaque employé comprenne.' },
          { answer: 'travaillions', accepted: ['travaillions'], explain: 'Travailler en subjonctif: que nous travaillions.' },
          { answer: 'soit', accepted: ['soit'], explain: 'Être en subjonctif: que tout le monde soit.' },
          { answer: 'soient', accepted: ['soient'], explain: 'Être en subjonctif plural: que les résultats soient.' },
          { answer: 'soit', accepted: ['soit'], explain: '"Bien que ce soit" → être en subjonctif: soit.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción con subjonctif',
        tag: 'Producción',
        intro: 'Escribe oraciones usando el subjonctif présent según las instrucciones.',
        type: 'write',
        items: [
          {
            scene: 'Tu deseo para un amigo',
            prompt: "Expresa un deseo para un amigo con 'Je veux que tu...' o 'Je voudrais que tu...'",
            answer: "Je veux que tu sois heureux et que tu réussisses dans tout ce que tu fais.",
            accepted: ['que tu sois', 'que tu réussisses', 'que tu ailles', 'que tu aies', 'que tu puisses', 'que tu fasses'],
            explain: "Je veux/voudrais que + subjonctif. Usa: sois, aies, fasses, ailles, puisses, réussisses...",
          },
          {
            scene: 'Una necesidad en la clase',
            prompt: "Escribe una regla de clase con 'Il faut que les étudiants...'",
            answer: "Il faut que les étudiants fassent leurs devoirs et qu'ils soient attentifs en classe.",
            accepted: ['fassent', 'soient', 'apprennent', 'parlent', 'viennent', 'arrivent', 'finissent'],
            explain: "Il faut que + subjonctif. Verbos irregulares clave: fasse/fassent, soit/soient, vienne/viennent.",
          },
          {
            scene: 'Aunque sea difícil',
            prompt: "Escribe una oración de concesión con 'bien que + subjonctif'.",
            answer: "Bien qu'il soit difficile d'apprendre le français, c'est une expérience enrichissante.",
            accepted: ['bien que', 'quoique', 'même si', 'sois', 'soit', 'ayons', 'fasse', 'puisse'],
            explain: "Bien que / quoique + subjonctif (bien que ce soit difficile / bien qu'il fasse froid...).",
          },
          {
            scene: 'Para que comprendan',
            prompt: "Explica el propósito de algo con 'pour que + subjonctif'.",
            answer: "J'explique en espagnol pour que vous compreniez mieux la grammaire française.",
            accepted: ['pour que', 'afin que', 'compreniez', 'puissiez', 'appreniez', 'fassiez', 'soyez'],
            explain: "Pour que / afin que + subjonctif. Expresan el objetivo o finalidad.",
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tus deseos para el mundo',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones expresando tus deseos o necesidades usando subjonctif présent.',
        type: 'write',
        items: [
          {
            scene: 'Un deseo global',
            prompt: "Expresa algo que deseas que cambie en el mundo (Je voudrais que le monde...).",
            answer: "Je voudrais que le monde soit plus juste et que les gens aient plus d'empathie.",
            accepted: ['soit', 'ait', 'fasse', 'puisse', 'aille', 'vienne', 'prenne', 'apprenne'],
            explain: "Je voudrais que le monde + [subjonctif]. Usa: soit, ait, fasse, devienne, aille...",
          },
          {
            scene: 'Una necesidad urgente',
            prompt: "Expresa algo urgente que necesita pasar (Il est urgent que...).",
            answer: "Il est urgent que les gouvernements agissent contre le changement climatique.",
            accepted: ['agissent', 'fassent', 'prennent', 'soient', 'aient', 'décident', 'trouvent'],
            explain: "Il est urgent/nécessaire/important que + [subjonctif]. Verbos: agir, faire, prendre, décider...",
          },
          {
            scene: 'Aunque sea complicado',
            prompt: "Expresa algo que haces a pesar de una dificultad (Bien que ce soit... / Bien qu'il soit...).",
            answer: "Bien que ce soit parfois décourageant, je continue à étudier le français chaque jour.",
            accepted: ['bien que', 'quoique', 'sois', 'soit', 'ait', 'fasse', 'puisse', 'aille'],
            explain: "Bien que + [subjonctif], [résultat en indicatif]. La concesión siempre lleva subjonctif.",
          },
        ],
      },
    ],
  },
}

export default topic
