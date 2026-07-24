import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'present-verbes-ir',
  order: '12',
  color: '#1a2ecc',
  category: 'Verbes',
  level: 'A1',
  title: 'Le Présent des Verbes en -IR (2e groupe) en Français A1',
  shortTitle: 'Présent verbes -IR',
  metaTitle: 'Verbos -IR en francés A1 — finir, choisir, réussir, réfléchir (2.° grupo)',
  description:
    'Los verbos del segundo grupo terminan en -ir y se conjugan con una "intercalación" característica: -iss- antes de las terminaciones del plural (finissons, finissez, finissent). No confundas con los verbos -ir del tercer grupo (partir, dormir) que son irregulares y no usan -iss-.',
  lead: 'Los verbos -IR del 2.° grupo son regulares: añaden -iss- en plural. Finir, choisir, réussir... El truco es ese -iss- que aparece con nous/vous/ils. ¡No los confundas con partir!',
  outcomes: [
    'Conjuga verbos del segundo grupo (-ir) en las 6 personas del presente',
    'Reconoce el morfema -iss- como marca del 2.° grupo',
    'Distingue el 2.° grupo (finir) del 3.° grupo irregular (partir, dormir)',
  ],

  guide: {
    goal: 'Conjugar verbos del segundo grupo (-ir) en presente con el morfema -iss- correcto.',
    model: 'Je finis, tu finis, il finit, nous finissons, vous finissez, ils finissent.',
    formula: 'Raíz (infinitivo − ir) + terminación (-is/-is/-it/-issons/-issez/-issent)',
    decisions: [
      'Raíz: quitar -ir → finir → fin-; choisir → chois-; réussir → réuss-',
      'Singular: -is, -is, -it (je finis, tu finis, il finit)',
      'Plural: -issons, -issez, -issent (nous finissons, vous finissez, ils finissent)',
      'El -iss- es la marca distintiva del 2.° grupo — siempre aparece en plural',
      'Cuidado: partir, dormir, venir → 3.° grupo, irregulares, SIN -iss-: je pars (no "je partis")',
    ],
    table: [
      ['Pronombre', 'Terminación', 'finir / choisir'],
      ['je', '-is', 'je finis / je choisis'],
      ['tu', '-is', 'tu finis / tu choisis'],
      ['il / elle', '-it', 'il finit / elle choisit'],
      ['nous', '-issons', 'nous finissons / choisissons'],
      ['vous', '-issez', 'vous finissez / choisissez'],
      ['ils / elles', '-issent', 'ils finissent / choisissent'],
    ],
    mistakes: [
      '"Nous finons" ❌ → "nous finissons" ✓ — el -iss- es obligatorio en plural',
      '"Il partissait" ❌ — "partir" es del 3.° grupo: "il part" (sin -iss-)',
      '"Je finis" y "tu finis" tienen la misma forma — distinguirlos por el pronombre',
    ],
  },

  seo: [
    {
      heading: 'Los verbos -ir del segundo grupo: el -iss- como marca',
      paragraphs: [
        'El francés tiene dos tipos principales de verbos -ir. Los del segundo grupo son regulares y se caracterizan por intercalar -iss- antes de las terminaciones del plural. Los más frecuentes son: finir (terminar), choisir (elegir), réussir (tener éxito/aprobar), réfléchir (reflexionar/pensar), grandir (crecer), obéir (obedecer), remplir (rellenar), réunir (reunir).',
        'Esta -iss- hace que las formas del plural sean más largas: "nous finissons", "vous finissez", "ils finissent". Es una marca muy fiable para identificar el segundo grupo.',
      ],
    },
    {
      heading: 'Conjugación completa: finir como modelo',
      paragraphs: [
        'Je finis / tu finis / il finit / nous finissons / vous finissez / ils finissent. Las formas singulares son todas en -is/-is/-it. Las formas plurales tienen el infijo -iss- más las terminaciones -ons/-ez/-ent.',
        'Otros verbos frecuentes del 2.° grupo que siguen exactamente el mismo patrón: choisir (je choisis), réussir (je réussis), réfléchir (je réfléchis), bâtir (je bâtis), nourrir (je nourris), saisir (je saisis).',
      ],
      table: [
        ['Persona', 'finir', 'choisir', 'réussir'],
        ['je/tu', 'finis', 'choisis', 'réussis'],
        ['il/elle', 'finit', 'choisit', 'réussit'],
        ['nous', 'finissons', 'choisissons', 'réussissons'],
        ['vous', 'finissez', 'choisissez', 'réussissez'],
        ['ils/elles', 'finissent', 'choisissent', 'réussissent'],
      ],
    },
    {
      heading: '2.° vs 3.° grupo: la trampa de partir y dormir',
      paragraphs: [
        'Cuidado con los verbos -ir del tercer grupo, que son irregulares y NO usan -iss-: partir (partir/irse), dormir (dormir), venir (venir), tenir (tener), sortir (salir), sentir (sentir). Estos verbos se conjugan de manera diferente: "je pars, tu pars, il part, nous partons, vous partez, ils partent".',
        'Una pista rápida: si el verbo -ir tiene -iss- en "nous", es del 2.° grupo regular. Si no, es del 3.° grupo y hay que aprenderlo por separado. En A1, basta con conocer los más frecuentes de cada grupo.',
      ],
    },
    {
      heading: 'Usos frecuentes en A1: réussir, choisir, réfléchir',
      paragraphs: [
        '"Réussir" significa tener éxito o aprobar un examen: "Je réussis mon examen de français !" / "Elle réussit toujours ses recettes." "Choisir" es elegir: "Tu choisis quel cours ?" / "Nous choisissons le restaurant." "Réfléchir" es reflexionar o pensar: "Réfléchissez bien avant de répondre !" / "Je réfléchis à la solution."',
        'Estos tres verbos aparecen constantemente en contextos académicos y cotidianos, haciéndolos esenciales para el nivel A1.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Verbos -IR del 2.° grupo: morfema -iss- en plural. Distinción con 3.° grupo (partir/dormir).',
    graphicPrompt: 'Tabla de conjugación con finir y choisir como modelos + contraste con partir.',
    scene: [
      ['finir', 'je finis / nous finissons / ils finissent'],
      ['choisir', 'tu choisis / vous choisissez / elles choisissent'],
      ['réussir', 'il réussit / nous réussissons'],
      ['réfléchir', 'je réfléchis / vous réfléchissez'],
      ['partir (3.° irreg.)', 'je pars / nous partons — sin -iss-'],
      ['dormir (3.° irreg.)', 'je dors / nous dormons — sin -iss-'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    practiceVerbs: ['finir', 'choisir', 'réussir', 'réfléchir', 'grandir', 'obéir'],
    reviewFocus: ['-iss- en plural', '2.° vs 3.° grupo', 'je/tu finis (identiques)'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la conjugación correcta del verbo entre paréntesis.',
        type: 'choice',
        items: [
          {
            scene: 'Nico termina su clase',
            lines: [['Nico', 'Je ___ le cours à 18h. (finir)']],
            options: ['finis', 'finit', 'finissons', 'finissent'],
            answer: 'finis',
            explain: '"Je" → terminación -is: "je finis". Sin -iss- en singular.',
          },
          {
            scene: 'Vera elige un método',
            lines: [['Vera', 'Elle ___ la meilleure méthode. (choisir)']],
            options: ['choisit', 'choisis', 'choisissez', 'choisissent'],
            answer: 'choisit',
            explain: '"Elle" → terminación -it: "elle choisit".',
          },
          {
            scene: 'Carlos y Ana aprueban el examen',
            lines: [['Carlos', 'Nous ___ notre examen de français ! (réussir)']],
            options: ['réussissons', 'réussissez', 'réussit', 'réussis'],
            answer: 'réussissons',
            explain: '"Nous" → -issons: "nous réussissons". El -iss- aparece en plural.',
          },
          {
            scene: 'Lina piensa en una respuesta',
            lines: [['Lina', 'Tu ___ avant de répondre ? (réfléchir)']],
            options: ['réfléchis', 'réfléchit', 'réfléchissons', 'réfléchissez'],
            answer: 'réfléchis',
            explain: '"Tu" → -is: "tu réfléchis".',
          },
          {
            scene: 'Marco y Sofia hablan de sus hijos',
            lines: [['Marco', 'Les enfants ___ vite. (grandir)']],
            options: ['grandissent', 'grandissons', 'grandit', 'grandis'],
            answer: 'grandissent',
            explain: '"Les enfants" (ils) → -issent: "ils grandissent". -iss- en plural.',
          },
          {
            scene: 'Ana elige un curso',
            lines: [['Ana', 'Vous ___ quel cours ? (choisir)']],
            options: ['choisissez', 'choisissons', 'choisit', 'choisis'],
            answer: 'choisissez',
            explain: '"Vous" → -issez: "vous choisissez". -iss- en plural.',
          },
          {
            scene: 'Nico sobre partir (3.° grupo)',
            lines: [['Nico', 'Je ___ à Paris demain. (partir — 3.° grupo, irreg.)']],
            options: ['pars', 'partis', 'partissons'],
            answer: 'pars',
            explain: '"Partir" es del 3.° grupo irregular: "je pars" (sin -iss-, raíz: par-).',
          },
          {
            scene: 'Lina sobre dormir (3.° grupo)',
            lines: [['Lina', 'Il ___ huit heures par nuit. (dormir — 3.° grupo)']],
            options: ['dort', 'dormit', 'dormissent', 'dormis'],
            answer: 'dort',
            explain: '"Dormir" es 3.° grupo: "il dort" (sin -iss-).',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos decisiones',
        tag: '2 espacios',
        intro: 'Elige el pronombre y la forma verbal del verbo -IR indicado.',
        type: 'dual',
        items: [
          {
            scene: 'Carlos habla de terminar el trabajo',
            lines: [['Carlos', '[[0]] [[1]] toujours à l\'heure. (finir)']],
            blanks: [
              { options: ['Je', 'Nous', 'Ils', 'Vous'], answer: 'Je', explain: '"Je" — primera persona singular.' },
              { options: ['finis', 'finit', 'finissons', 'finissent'], answer: 'finis', explain: '"Je" + finir → "je finis".' },
            ],
          },
          {
            scene: 'Vera y Nico eligen actividades',
            lines: [['Vera', 'Nous [[0]] les activités et les étudiants [[1]] aussi. (choisir)']],
            blanks: [
              { options: ['choisissons', 'choisissez', 'choisit', 'choisis'], answer: 'choisissons', explain: '"Nous" → "choisissons" (-issons).' },
              { options: ['choisissent', 'choisissons', 'choisit', 'choisis'], answer: 'choisissent', explain: '"Les étudiants" (ils) → "choisissent" (-issent).' },
            ],
          },
          {
            scene: 'Sofia y Marco piensan antes de actuar',
            lines: [['Sofia', 'Je [[0]] avant et vous [[1]] après. (réfléchir)']],
            blanks: [
              { options: ['réfléchis', 'réfléchit', 'réfléchissons', 'réfléchissez'], answer: 'réfléchis', explain: '"Je" → "réfléchis" (-is).' },
              { options: ['réfléchissez', 'réfléchissons', 'réfléchis', 'réfléchit'], answer: 'réfléchissez', explain: '"Vous" → "réfléchissez" (-issez).' },
            ],
          },
          {
            scene: 'Lina habla de los niños',
            lines: [['Lina', 'Les enfants [[0]] vite et ils [[1]] bien. (grandir/obéir)']],
            blanks: [
              { options: ['grandissent', 'grandissons', 'grandit', 'grandis'], answer: 'grandissent', explain: '"Les enfants" (ils) → "grandissent" (-issent).' },
              { options: ['obéissent', 'obéissons', 'obéit', 'obéis'], answer: 'obéissent', explain: '"Ils" + obéir → "obéissent" (-issent).' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Un día en WeLearn',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta de cada verbo -IR del 2.° grupo en este texto.',
        type: 'guidedText',
        scene: 'Un día típico en la academia WeLearn. Elige la conjugación correcta de cada verbo -IR.',
        text: 'Chaque matin, les étudiants [[0]] (choisir) leurs exercices. Nico [[1]] (réfléchir) toujours à la meilleure méthode. À midi, les cours [[2]] (finir). L\'après-midi, les étudiants [[3]] (réussir) leurs exercices pratiques. Vera et Nico [[4]] (réunir) les étudiants pour une session spéciale. Tu [[5]] (choisir) de venir aussi ?',
        blanks: [
          { options: ['choisissent', 'choisissons', 'choisit', 'choisis'], answer: 'choisissent', explain: '"Les étudiants" (ils) → "choisissent".' },
          { options: ['réfléchit', 'réfléchis', 'réfléchissons', 'réfléchissez'], answer: 'réfléchit', explain: '"Nico" (il) → "réfléchit".' },
          { options: ['finissent', 'finissons', 'finit', 'finis'], answer: 'finissent', explain: '"Les cours" (ils) → "finissent".' },
          { options: ['réussissent', 'réussissons', 'réussit', 'réussis'], answer: 'réussissent', explain: '"Les étudiants" (ils) → "réussissent".' },
          { options: ['réunissent', 'réunissons', 'réunit', 'réunis'], answer: 'réunissent', explain: '"Vera et Nico" (ils) → "réunissent".' },
          { options: ['choisis', 'choisit', 'choisissons', 'choisissent'], answer: 'choisis', explain: '"Tu" → "choisis" (-is).' },
          { options: ['choisissent', 'choisissons', 'choisit', 'choisis'], answer: 'choisissent', explain: 'Confirmación.' },
        ],
      },
      {
        id: 'l4',
        title: 'Conjuga sin ayuda',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del verbo -IR entre paréntesis.',
        type: 'freeText',
        scene: 'Carlos describe su experiencia en WeLearn. Conjuga los verbos del 2.° grupo (-IR).',
        text: 'Quand j\'étudie le français, je [[0]] (réfléchir) beaucoup. Je [[1]] (choisir) toujours des textes difficiles. Finalement, je [[2]] (réussir) à comprendre. Mes amis et moi, nous [[3]] (finir) nos cours le vendredi. Est-ce que tu [[4]] (obéir) toujours aux règles de grammaire ?',
        blanks: [
          { answer: 'réfléchis', accepted: ['réfléchis'], explain: '"Je" + réfléchir → "réfléchis" (-is).' },
          { answer: 'choisis', accepted: ['choisis'], explain: '"Je" + choisir → "choisis" (-is).' },
          { answer: 'réussis', accepted: ['réussis'], explain: '"Je" + réussir → "réussis" (-is).' },
          { answer: 'finissons', accepted: ['finissons'], explain: '"Nous" + finir → "finissons" (-issons).' },
          { answer: 'obéis', accepted: ['obéis'], explain: '"Tu" + obéir → "obéis" (-is).' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando verbos del 2.° grupo (-IR).',
        type: 'write',
        items: [
          {
            scene: 'Nico habla de sus estudiantes',
            prompt: 'Di que los estudiantes de WeLearn eligen sus cursos y reflexionan mucho (choisir/réfléchir, ils).',
            answer: 'Les étudiants choisissent leurs cours et réfléchissent beaucoup.',
            accepted: ['choisissent', 'réfléchissent'],
            explain: '"Ils" + choisir → "choisissent" (-issent). "Ils" + réfléchir → "réfléchissent".',
          },
          {
            scene: 'Vera habla de sus clases',
            prompt: 'Di que la clase termina a las 6 y que todos eligen sus ejercicios (finir/choisir).',
            answer: 'Le cours finit à 18h et tous les étudiants choisissent leurs exercices.',
            accepted: ['finit', 'choisissent', 'finissent'],
            explain: '"Le cours" (il) → "finit". "Les étudiants" (ils) → "choisissent".',
          },
          {
            scene: 'Carlos describe su éxito',
            prompt: 'Di que Carlos siempre aprueba sus exámenes y que sus amigos también (réussir).',
            answer: 'Carlos réussit toujours ses examens et ses amis réussissent aussi.',
            accepted: ['réussit', 'réussissent'],
            explain: '"Carlos" (il) → "réussit". "Ses amis" (ils) → "réussissent".',
          },
          {
            scene: 'Lina compara 2.° y 3.° grupos',
            prompt: 'Escribe una frase con "finir" (2.° grupo) y otra con "partir" (3.° grupo, je pars).',
            answer: 'Je finis mes devoirs et je pars à la bibliothèque.',
            accepted: ['finis', 'pars'],
            explain: '"Finir" (2.°): je finis. "Partir" (3.° irreg.): je pars — sin -iss-.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión: Verbos -IR en acción',
        tag: 'Producción',
        intro: 'Misión: Escribe 3 oraciones sobre tu rutina de estudio usando verbos del 2.° grupo -IR.',
        type: 'write',
        items: [
          {
            scene: 'Tu rutina de estudio (je/tu)',
            prompt: 'Di cuándo terminas de estudiar y qué eliges estudiar (finir/choisir, je).',
            answer: 'Je finis mes exercices à 21h. Je choisis toujours des textes intéressants.',
            accepted: ['je finis', 'je choisis', 'tu finis', 'tu choisis'],
            explain: '"Je finis" (-is). "Je choisis" (-is). Recuerda: sin -iss- en singular.',
          },
          {
            scene: 'Tu grupo de estudio (nous)',
            prompt: 'Di que vosotros reflexionáis juntos y que al final todos tenéis éxito (nous réfléchissons / nous réussissons).',
            answer: 'Nous réfléchissons ensemble et nous réussissons nos examens.',
            accepted: ['réfléchissons', 'réussissons', 'finissons'],
            explain: '"Nous" → -issons. "Réfléchissons" / "réussissons". El -iss- es la clave del 2.° grupo.',
          },
          {
            scene: 'Otros estudiantes (ils/elles)',
            prompt: 'Di que los demás estudiantes eligen sus ejercicios y terminan rápido (choisir/finir, ils).',
            answer: 'Les autres étudiants choisissent leurs exercices et finissent rapidement.',
            accepted: ['choisissent', 'finissent', 'réussissent'],
            explain: '"Ils" → -issent. "Choisissent" / "finissent".',
          },
        ],
      },
    ],
  },
}

export default topic
