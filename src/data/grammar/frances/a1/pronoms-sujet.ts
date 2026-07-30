import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pronoms-sujet',
  order: '01',
  color: '#1a2ecc',
  category: 'Pronoms',
  level: 'A1',
  title: 'Les Pronoms Sujets en Français A1',
  shortTitle: 'Pronoms sujets',
  metaTitle: 'Pronoms sujets en français A1 — je, tu, il, elle, nous, vous, ils, elles',
  description:
    'Los pronombres de sujeto en francés (je, tu, il, elle, on, nous, vous, ils, elles) son obligatorios en toda oración — nunca se omiten como en español. Además, el francés distingue entre "tu" (informal) y "vous" (formal o plural), y entre "ils" (ellos/mixto) y "elles" (ellas, solo femenino).',
  lead: 'En francés, el sujeto nunca se omite. Aprende los 9 pronombres personales, la distinción tu/vous y el truco del pronombre "on".',
  outcomes: ['Usa los 9 pronombres sujeto', 'Distingue tu/vous', 'Comprende "on" como "nosotros"'],

  guide: {
    goal: 'Identificar y usar los pronombres sujeto del francés en oraciones básicas.',
    model: 'Je suis étudiant. / Tu parles français. / Ils habitent à Paris.',
    formula: 'Pronombre sujeto + verbo conjugado',
    decisions: [
      'je → yo (elide a j\' antes de vocal: j\'aime)',
      'tu → tú (solo informal, una persona)',
      'il/elle → él/ella; on → uno/nosotros (muy frecuente en conversación)',
      'nous → nosotros (más formal); vous → vosotros o usted/ustedes (cortesía)',
      'ils → ellos o ellos+ellas; elles → solo ellas',
    ],
    table: [
      ['Pronombre', 'Español', 'Nota'],
      ['je (j\')', 'yo', 'Elide antes de vocal'],
      ['tu', 'tú', 'Solo informal'],
      ['il / elle', 'él / ella', 'También: il = hombre o cosa'],
      ['on', 'uno / nosotros', 'Muy usado en conversación'],
      ['nous', 'nosotros', 'Más formal/escrito'],
      ['vous', 'ustedes / usted', 'También singular de cortesía'],
      ['ils / elles', 'ellos / ellas', 'Ils = mixto o solo masculino'],
    ],
    mistakes: [
      'En español puedes decir "soy estudiante" — en francés DEBES decir "je suis étudiant".',
      '"On" se conjuga como "il/elle" aunque signifique "nosotros" en conversación.',
      '"Vous" puede ser singular (cortesía) o plural — el contexto indica cuál.',
    ],
  },

  seo: [
    {
      heading: '¿Por qué los pronombres sujeto son obligatorios en francés?',
      paragraphs: [
        'En español puedes decir "Hablo francés" sin mencionar "yo", porque la terminación verbal indica la persona. En francés, las terminaciones de muchos verbos suenan igual (je parle, tu parles, il parle — las tres se pronuncian igual), por eso el pronombre sujeto es indispensable para saber quién hace la acción.',
        'Esta es la primera diferencia fundamental que debes interiorizar: en francés, el sujeto nunca se omite. Siempre escribes y dices "je parle", "tu parles", "il parle", etc.',
      ],
    },
    {
      heading: 'Los 9 pronombres sujeto del francés',
      paragraphs: [
        'El francés tiene 9 pronombres sujeto: je, tu, il, elle, on, nous, vous, ils, elles. A diferencia del español, que tiene 7 (yo, tú, él, ella, nosotros, vosotros, ellos), el francés añade "on" y distingue "ils" de "elles" en plural.',
        '"Je" se convierte en "j\'" antes de una vocal o h muda: j\'aime (amo), j\'habite (vivo). Esta elisión es obligatoria.',
      ],
      table: [
        ['Singular', 'Plural'],
        ['je (yo)', 'nous (nosotros)'],
        ['tu (tú)', 'vous (vosotros/usted)'],
        ['il (él), elle (ella), on (uno)', 'ils (ellos), elles (ellas)'],
      ],
    },
    {
      heading: '¿Cuándo se usa "tu" y cuándo "vous" en francés?',
      paragraphs: [
        '"Tu" se usa con amigos, familia, niños y en situaciones informales. "Vous" se usa para una persona desconocida, mayor o en un contexto profesional (el equivalente de "usted"). También se usa "vous" para hablar con más de una persona.',
        'Esta distinción es importante en la cultura francesa — tutear a alguien sin permiso puede resultar irrespetuoso en ciertos contextos.',
      ],
    },
    {
      heading: '¿Qué significa el pronombre "on" en francés?',
      paragraphs: [
        '"On" es formalmente el pronombre impersonal (= uno, en español: "on dit que..." = "se dice que..."). Pero en francés conversacional, "on" reemplaza muy frecuentemente a "nous" (nosotros): "On va au cinéma" = "Nous allons au cinéma" = "Vamos al cine".',
        '"On" se conjuga siempre como "il/elle" — tercera persona del singular. Así que "on parle", "on mange", "on est" (y no "on sommes").',
      ],
    },
    {
      heading: 'Ils vs. elles: el género en el plural',
      paragraphs: [
        '"Ils" se usa para un grupo masculino o de género mixto (hombres y mujeres). "Elles" se usa solo cuando todos los referentes son femeninos. Esto significa que un grupo de 100 mujeres y un solo hombre usa "ils".',
        'Este sistema de género por defecto al masculino es un debate lingüístico en el francés contemporáneo, pero para el nivel A1 basta con conocer la regla clásica.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Pronombres sujeto del francés con énfasis en las diferencias con el español.',
    graphicPrompt: 'Tabla visual de pronombres sujeto con ejemplos de uso cotidiano.',
    scene: [
      ['je', 'Je suis français. — Soy francés.'],
      ['tu', 'Tu parles bien ! — ¡Hablas bien!'],
      ['il / elle', 'Il est médecin. / Elle est avocate.'],
      ['on', 'On mange ensemble ? — ¿Comemos juntos?'],
      ['nous', 'Nous habitons à Lyon. — Vivimos en Lyon.'],
      ['vous', 'Vous parlez anglais ? — ¿Habla usted inglés?'],
      ['ils / elles', 'Ils travaillent ici. / Elles étudient le soir.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['tu vs vous', 'on como nosotros', 'je vs j\''],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige el pronombre sujeto correcto para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ suis étudiant(e). (yo)']],
            options: ['Je', 'Tu', 'Il', 'On'],
            answer: 'Je',
            explain: '"Je" = yo. Antes de vocal se convierte en "j\'" (j\'aime), pero antes de "s" se escribe "je".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ parles très bien français ! (tú, informal)']],
            options: ['Tu', 'Vous', 'On', 'Ils'],
            answer: 'Tu',
            explain: '"Tu" es el pronombre informal de segunda persona singular.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Marie est française. ___ habite à Paris.']],
            options: ['Elle', 'Il', 'Elles', 'On'],
            answer: 'Elle',
            explain: 'Marie es femenino → pronombre "elle".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Pierre et Paul travaillent ensemble. ___ sont amis.']],
            options: ['Ils', 'Elles', 'On', 'Nous'],
            answer: 'Ils',
            explain: 'Pierre y Paul son masculinos → "ils". Grupo masculino o mixto → siempre "ils".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ mangeons souvent ici. (nosotros, formal)']],
            options: ['Nous', 'On', 'Vous', 'Ils'],
            answer: 'Nous',
            explain: '"Nous" es el pronombre formal de primera persona plural.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ êtes le professeur ? (usted, cortesía singular)']],
            options: ['Vous', 'Tu', 'Ils', 'On'],
            answer: 'Vous',
            explain: '"Vous" puede ser singular de cortesía (equivale a "usted") o plural (vosotros/ustedes).',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Sophie et Emma étudient le soir. ___ sont sérieuses.']],
            options: ['Elles', 'Ils', 'On', 'Vous'],
            answer: 'Elles',
            explain: 'Sophie y Emma son femeninas → "elles". Solo cuando TODOS son femeninos.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ va au cinéma ce soir ? (nosotros, conversacional)']],
            options: ['On', 'Nous', 'Vous', 'Tu'],
            answer: 'On',
            explain: '"On" reemplaza a "nous" en el habla coloquial. Se conjuga como "il/elle".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos decisiones',
        tag: '2 espacios',
        intro: 'Completa el pronombre y la forma verbal básica.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] suis espagnol et [[1]] êtes américain.']],
            blanks: [
              { options: ['Je', 'Tu', 'Il', 'On'], answer: 'Je', explain: 'Primera persona singular → "je".' },
              { options: ['vous', 'tu', 'ils', 'elle'], answer: 'vous', explain: '"Vous" para cortesía o plural.' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] est médecin et [[1]] est avocate.']],
            blanks: [
              { options: ['Il', 'Elle', 'Ils', 'On'], answer: 'Il', explain: 'Un médico (masculino no especificado) → "il".' },
              { options: ['elle', 'il', 'elles', 'on'], answer: 'elle', explain: 'Una abogada (femenino) → "elle".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] parlons français et [[1]] parlez anglais.']],
            blanks: [
              { options: ['Nous', 'On', 'Vous', 'Ils'], answer: 'Nous', explain: '"Nous" = nosotros, primera persona plural formal.' },
              { options: ['vous', 'nous', 'ils', 'tu'], answer: 'vous', explain: '"Vous" = vosotros/ustedes/usted.' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] chante bien et [[1]] dansent très bien.']],
            blanks: [
              { options: ['Elle', 'Elles', 'Il', 'On'], answer: 'Elle', explain: '"Elle" + chante (tercera singular) para una mujer.' },
              { options: ['elles', 'ils', 'on', 'nous'], answer: 'elles', explain: '"Elles" + dansent para un grupo femenino.' },
            ],
          },
        ],
      },
      {
          id: 'level-3',
          title: 'Completa el texto',
          tag: 'Texto guiado',
          intro: 'Elige el pronombre sujeto correcto para cada personaje del texto.',
          type: 'guidedText',
        scene: 'Elige el pronombre sujeto correcto para cada personaje del texto.',
        text: 'La famille García est grande. Le père s\'appelle Carlos — [[0]] est médecin. La mère s\'appelle Ana — [[1]] travaille dans une école. Les enfants s\'appellent Lucas et Sofia. [[2]] habitent à Madrid. Sofia et sa cousine Emma sont amies — [[3]] étudient ensemble. Carlos et Ana, [[4]] mangent souvent au restaurant le dimanche. Et moi, [[5]] suis l\'ami de Lucas. [[6]], on joue au football chaque semaine.',
        blanks: [
          { options: ['il', 'elle', 'ils', 'on'], answer: 'il', explain: 'Carlos = masculino → "il".' },
          { options: ['elle', 'il', 'elles', 'on'], answer: 'elle', explain: 'Ana = femenino → "elle".' },
          { options: ['Ils', 'Elles', 'On', 'Nous'], answer: 'Ils', explain: 'Lucas y Sofia (mixto) → "ils".' },
          { options: ['elles', 'ils', 'on', 'nous'], answer: 'elles', explain: 'Sofia y Emma (femenino) → "elles".' },
          { options: ['ils', 'elles', 'on', 'nous'], answer: 'ils', explain: 'Carlos y Ana (mixto) → "ils".' },
          { options: ['je', 'tu', 'il', 'on'], answer: 'je', explain: '"Moi, je" — primera persona, sujeto obligatorio.' },
          { options: ['Nous', 'On', 'Ils', 'Vous'], answer: 'Nous', explain: '"Nous" (o "on") para la acción compartida de los dos amigos.' },
        ],
      },
      {
          id: 'level-4',
          title: 'Escribe sin ayuda',
          tag: 'Texto libre',
          intro: 'Escribe el pronombre sujeto correcto en cada espacio.',
          type: 'freeText',
        scene: 'Escribe el pronombre sujeto correcto en cada espacio.',
        text: 'María et Pablo sont espagnols. [[0]] habitent à Barcelone. María est architecte — [[1]] travaille beaucoup. Pablo aime le sport — [[2]] joue au tennis. Et toi, [[3]] es étudiant(e) ? Et vous deux, [[4]] parlez espagnol ou catalan ?',
        blanks: [
          { answer: 'Ils', accepted: ['Ils', 'ils'], explain: 'María et Pablo (mixto) → "ils".' },
          { answer: 'elle', accepted: ['elle', 'Elle'], explain: 'María (femenino) → "elle".' },
          { answer: 'il', accepted: ['il', 'Il'], explain: 'Pablo (masculino) → "il".' },
          { answer: 'tu', accepted: ['tu', 'Tu'], explain: 'Tú informal → "tu".' },
          { answer: 'vous', accepted: ['vous', 'Vous'], explain: 'Plural segunda persona → "vous".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando el pronombre sujeto correcto.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Preséntate con "je": di tu nombre y tu nacionalidad.',
            answer: 'Je suis espagnol(e). Je m\'appelle Carlos.',
            accepted: ['je suis', 'je m\'appelle', "j'habite", "j'ai"],
            explain: 'Ejemplo: Je suis colombien. Je m\'appelle Ana.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Habla de tu amigo/a usando "il" o "elle": di cómo se llama y qué hace.',
            answer: 'Il s\'appelle Marco. Il est étudiant.',
            accepted: ['il s\'appelle', 'elle s\'appelle', 'il est', 'elle est', 'il habite', 'elle habite', 'il travaille', 'elle travaille'],
            explain: 'Ejemplo: Elle s\'appelle Sofia. Elle est professeure.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Habla de lo que hacen tú y tus amigos usando "on" o "nous".',
            answer: 'On mange ensemble le vendredi.',
            accepted: ['on ', 'nous '],
            explain: 'Ejemplo: On parle français ensemble. / Nous étudions le soir.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Escribe una oración sobre un grupo de mujeres usando "elles".',
            answer: 'Elles sont professeurs.',
            accepted: ['elles sont', 'elles habitent', 'elles travaillent', 'elles étudient', 'elles parlent'],
            explain: 'Ejemplo: Elles habitent à Paris. / Elles étudient le droit.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Misión: Escribe una pequeña presentación de tu familia o amigos usando al menos 4 pronombres distintos.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Preséntate a ti mismo (je).',
            answer: 'Je suis étudiant(e). Je m\'appelle...',
            accepted: ['je suis', 'je m\'appelle', "j'habite", "j'ai", "j'aime"],
            explain: 'Empieza siempre con el pronombre. Ejemplo: Je m\'appelle María. Je suis colombienne.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Presenta a un familiar o amigo (il/elle).',
            answer: 'Il s\'appelle Carlos. Il est médecin.',
            accepted: ['il s\'appelle', 'elle s\'appelle', 'il est', 'elle est', 'il habite', 'elle habite'],
            explain: 'Ejemplo: Elle s\'appelle Ana. Elle est professeure. Elle habite à Bogotá.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Habla de un grupo (ils/elles/nous/on).',
            answer: 'Nous habitons à Madrid. On parle espagnol.',
            accepted: ['nous ', 'ils ', 'elles ', 'on '],
            explain: 'Ejemplo: Ils travaillent ensemble. / Elles étudient à l\'université. / On est une famille nombreuse.',
          },
        ],
      },
    ],
  },
}

export default topic
