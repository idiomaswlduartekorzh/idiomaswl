import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'present-continuous',
  order: '15',
  color: '#dc2626',
  category: 'Verbs',
  level: 'A1',
  title: 'Present Continuous en Inglés A1',
  shortTitle: 'Present Continuous',
  metaTitle: 'Present Continuous en Inglés A1 — am/is/are + verb-ing',
  description:
    'El present continuous en inglés se forma con am/is/are + verbo-ing y se usa para acciones que ocurren en este momento o están en progreso ahora mismo. A diferencia del español, el inglés obliga a usar esta forma para "lo que está pasando" — no puedes reemplazarlo con el presente simple en ese contexto.',
  lead: 'Aprende a describir lo que está ocurriendo ahora mismo: am/is/are + verbo-ing, sin errores de concordancia ni omisión del auxiliar.',
  outcomes: ['Forma be + -ing correctamente', 'Distingue present simple vs. continuous', 'Describe acciones en progreso'],

  guide: {
    goal: 'Usar am/is/are + verbo-ing para hablar de acciones que están ocurriendo en este momento.',
    model: 'I am studying. / She is cooking. / They are playing soccer.',
    formula: 'Subject + am/is/are + verb-ing',
    decisions: [
      'I → am; he/she/it → is; you/we/they → are',
      'Verbo monosílabo + vocal simple + consonante simple → duplicar consonante: run → running, sit → sitting',
      'Verbo terminado en -e → quitar -e y añadir -ing: write → writing, make → making',
      'Negativo: am/is/are + not + verb-ing → I am not eating. / She isn\'t sleeping.',
      'Pregunta: Am/Is/Are + subject + verb-ing? → Are you working? / Is he coming?',
    ],
    table: [
      ['Sujeto', 'Auxiliar', 'Ejemplo'],
      ['I', 'am', 'I am reading a book.'],
      ['He / She / It', 'is', 'She is cooking dinner.'],
      ['You / We / They', 'are', 'They are playing outside.'],
    ],
    mistakes: [
      'Nunca omitas el auxiliar: "She cooking" ❌ → "She is cooking" ✓',
      'No uses present continuous con verbos de estado: "I am knowing" ❌ → "I know" ✓',
      'Duplica la consonante cuando corresponde: "runing" ❌ → "running" ✓',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el present continuous en inglés?',
      paragraphs: [
        'El present continuous (también llamado present progressive) se usa para describir acciones que están ocurriendo en este preciso momento o que están en progreso actualmente. Se forma con el verbo "be" conjugado (am/is/are) seguido del verbo principal con terminación -ing.',
        'En español lo equivalente es el presente progresivo: "estoy comiendo", "está trabajando". La gran diferencia es que en inglés no puedes omitir el auxiliar — "She cooking" es incorrecto, siempre necesitas "She is cooking".',
      ],
    },
    {
      heading: 'Cómo formar el present continuous',
      paragraphs: [
        'La estructura es: sujeto + am/is/are + verbo-ing. La elección entre am, is y are depende del sujeto: I → am; he, she, it → is; you, we, they → are.',
        'Para agregar -ing al verbo hay tres reglas: (1) mayoría de verbos: simplemente añadir -ing (eat → eating, go → going); (2) verbos terminados en -e: quitar -e y añadir -ing (write → writing, make → making); (3) verbos monosílabos con patrón vocal-consonante: duplicar la consonante final (run → running, sit → sitting, swim → swimming).',
      ],
      table: [
        ['Tipo de verbo', 'Regla', 'Ejemplo'],
        ['General', '+ ing', 'eat → eating, work → working'],
        ['Termina en -e', '– e + ing', 'write → writing, come → coming'],
        ['CVC monosílabo', 'CC + ing', 'run → running, sit → sitting'],
      ],
    },
    {
      heading: 'Formas afirmativa, negativa e interrogativa',
      paragraphs: [
        'Afirmativa: I am studying. / She is listening to music. / We are watching a film.',
        'Negativa: añade "not" después de am/is/are. Forma contraída: I\'m not studying. / She isn\'t listening. / We aren\'t watching. (Nota: "amn\'t" no existe — la contracción de "I am not" siempre es "I\'m not".)',
        'Interrogativa: invierte el auxiliar y el sujeto. Are you studying? / Is she listening? / What are they doing?',
      ],
      examples: [
        ['Forma', 'Ejemplo'],
        ['Afirmativa', 'He is reading the newspaper.'],
        ['Negativa', 'He is not (isn\'t) reading the newspaper.'],
        ['Pregunta sí/no', 'Is he reading the newspaper?'],
        ['Pregunta con Wh-', 'What is he reading?'],
      ],
    },
    {
      heading: 'Present continuous vs. present simple',
      paragraphs: [
        'El present simple describe rutinas y hechos generales: "I eat breakfast at 7am." El present continuous describe lo que ocurre ahora mismo: "I am eating breakfast right now."',
        'Algunos verbos (llamados "stative verbs") no se usan en continuous porque expresan estados, no acciones: know, like, love, want, need, understand, believe. Decir "I am knowing" es un error muy frecuente en español — la forma correcta es simplemente "I know".',
        'Señales de tiempo que acompañan al present continuous: now, right now, at the moment, at this moment, currently, look! (¡mira!).',
      ],
    },
    {
      heading: 'Errores comunes de hispanohablantes',
      paragraphs: [
        'El error más común es omitir el auxiliar am/is/are: "She sleeping" — incorrecto. En inglés el verbo "be" es obligatorio: "She is sleeping".',
        'Otro error es no aplicar las reglas de -ing correctamente: "runing" en lugar de "running", o "writeing" en lugar de "writing".',
        'También es frecuente usar continuous con verbos de estado: "I am wanting a coffee" es incorrecto. Lo correcto es "I want a coffee". Verbos de estado comunes: want, need, know, like, love, see, hear, think (cuando significa "creer").',
      ],
    },
    {
      heading: '¿Cómo se forma el present continuous en inglés?',
      paragraphs: [
        'Con el verbo to be (am/is/are) + verbo -ing: "I am working", "She is eating", "They are playing". El to be concuerda con el sujeto y el verbo principal lleva -ing. En negativo: "I am not working"; en pregunta: "Are you working?".',
      ],
    },
    {
      heading: '¿Cuándo se usa el present continuous?',
      paragraphs: [
        'Para acciones que ocurren AHORA mismo ("I am studying now") y para planes futuros concretos ("I am meeting Bruno tomorrow"). Marca lo que está en curso, frente al present simple, que describe rutinas y hechos generales.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre present simple y present continuous?',
      paragraphs: [
        'El present simple = rutinas y hechos ("I work every day"); el present continuous = acción en curso ahora ("I am working now"). La trampa del hispanohablante: "estoy trabajando" es "I am working", no "I work". Verbos de estado (like, want, know) no suelen ir en continuous.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Acciones en progreso con los auxiliares am/is/are + verbo-ing en contextos A1.',
    graphicPrompt: 'Escena de personas realizando distintas actividades en tiempo real.',
    scene: [
      ['I am studying.', 'Estoy estudiando.'],
      ['She is cooking dinner.', 'Ella está cocinando la cena.'],
      ['They are playing soccer.', 'Ellos están jugando fútbol.'],
      ['He is reading a book.', 'Él está leyendo un libro.'],
      ['We are watching a movie.', 'Nosotros estamos viendo una película.'],
      ['Are you listening?', '¿Estás escuchando?'],
      ['She isn\'t sleeping.', 'Ella no está durmiendo.'],
      ['What are you doing?', '¿Qué estás haciendo?'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['study', 'cook', 'play', 'read', 'watch', 'listen', 'run', 'write', 'swim', 'sit'],
    reviewFocus: ['am/is/are omission', '-ing spelling rules', 'stative verbs'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de present continuous.',
        type: 'choice',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'She ___ a book right now.']],
            options: ['is reading', 'are reading', 'reads', 'reading'],
            answer: 'is reading',
            explain: '"She" → auxiliar "is" + verb-ing. "Reading" sin auxiliar es incompleto.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'I ___ to music at the moment.']],
            options: ['am listening', 'is listening', 'are listening', 'listen'],
            answer: 'am listening',
            explain: '"I" → auxiliar "am" + verb-ing.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'They ___ soccer in the park.']],
            options: ['are playing', 'is playing', 'am playing', 'plays'],
            answer: 'are playing',
            explain: '"They" → auxiliar "are" + verb-ing.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Look! The cat ___ on the sofa.']],
            options: ['is sleeping', 'are sleeping', 'sleeps', 'sleeping'],
            answer: 'is sleeping',
            explain: '"The cat" = tercera persona singular → "is". Present continuous para lo que ocurre ahora.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ you studying for the exam?']],
            options: ['Are', 'Is', 'Am', 'Do'],
            answer: 'Are',
            explain: 'Pregunta con "you" → "Are you studying?" El auxiliar va al inicio.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'He ___ to school today. He\'s sick.']],
            options: ['isn\'t going', 'aren\'t going', 'don\'t go', 'not going'],
            answer: 'isn\'t going',
            explain: '"He" + negativo → "isn\'t going". "Isn\'t" = is not.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'What ___ she ___ right now?']],
            options: ['is / doing', 'are / doing', 'does / doing', 'is / do'],
            answer: 'is / doing',
            explain: 'Pregunta con Wh-: What + is + she + doing? = ¿Qué está haciendo ella?',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'We ___ dinner. Come in!']],
            options: ['are cooking', 'is cooking', 'am cooking', 'cook'],
            answer: 'are cooking',
            explain: '"We" → "are" + verb-ing.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos decisiones',
        tag: '2 espacios',
        intro: 'Completa el auxiliar y la forma -ing de cada oración.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'She [[0]] [[1]] for the exam right now.']],
            blanks: [
              { options: ['is', 'are', 'am', 'was'], answer: 'is', explain: '"She" → auxiliar "is".' },
              { options: ['studying', 'study', 'studied', 'studies'], answer: 'studying', explain: '"Study" → no duplica → "studying".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'My brothers [[0]] [[1]] in the garden.']],
            blanks: [
              { options: ['are', 'is', 'am', 'be'], answer: 'are', explain: '"My brothers" (plural) → "are".' },
              { options: ['running', 'run', 'runing', 'runs'], answer: 'running', explain: '"Run" → CVC → duplicar n → "running".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] you [[1]] a good time at the party?']],
            blanks: [
              { options: ['Are', 'Is', 'Am', 'Do'], answer: 'Are', explain: 'Pregunta con "you" → "Are".' },
              { options: ['having', 'have', 'has', 'haveing'], answer: 'having', explain: '"Have" termina en -e → quitar -e → "having".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'I [[0]] [[1]] emails. Can I call you later?']],
            blanks: [
              { options: ['am', 'is', 'are', 'be'], answer: 'am', explain: '"I" → "am".' },
              { options: ['writing', 'write', 'writeing', 'writting'], answer: 'writing', explain: '"Write" termina en -e → quitar -e → "writing".' },
            ],
          },
        ],
      },
      {
          id: 'level-3',
          title: 'Completa el texto',
          tag: 'Texto guiado',
          intro: 'Elige la forma correcta de present continuous para cada oración del texto.',
          type: 'guidedText',
        scene: 'Elige la forma correcta de present continuous para cada oración del texto.',
        text: 'It is Saturday morning at the García family house. Ana [[0]] breakfast in the kitchen. Her brother Carlos [[1]] TV in the living room. Their parents [[2]] in the garden. The dog [[3]] under the table. Ana\'s phone [[4]] — someone [[5]] her a message. Carlos [[6]] to help with breakfast.',
        blanks: [
          { options: ['is making', 'makes', 'are making', 'make'], answer: 'is making', explain: '"Ana" → "is" + making (make → quitar -e → making).' },
          { options: ['is watching', 'watches', 'are watching', 'watch'], answer: 'is watching', explain: '"Carlos" → "is" + watching.' },
          { options: ['are working', 'is working', 'work', 'works'], answer: 'are working', explain: '"Their parents" (plural) → "are" + working.' },
          { options: ['is sleeping', 'are sleeping', 'sleeps', 'sleep'], answer: 'is sleeping', explain: '"The dog" → "is" + sleeping.' },
          { options: ['is ringing', 'are ringing', 'rings', 'ring'], answer: 'is ringing', explain: '"Her phone" → "is" + ringing.' },
          { options: ['is sending', 'are sending', 'send', 'sends'], answer: 'is sending', explain: '"Someone" → "is" + sending.' },
          { options: ['isn\'t offering', 'aren\'t offering', 'doesn\'t offer', 'not offer'], answer: 'isn\'t offering', explain: '"Carlos" + negativo → "isn\'t" + offering.' },
        ],
      },
      {
          id: 'level-4',
          title: 'Escribe sin ayuda',
          tag: 'Texto libre',
          intro: 'Conjuga el verbo entre paréntesis en present continuous.',
          type: 'freeText',
        scene: 'Conjuga el verbo entre paréntesis en present continuous.',
        text: 'Right now I [[0]] (study) English. My friend Marco [[1]] (not / study) — he [[2]] (play) video games. Our classmates [[3]] (work) on a group project. — [[4]] (you / listen) to me? — Yes, I am!',
        blanks: [
          { answer: 'am studying', accepted: ['am studying', '\'m studying'], explain: 'I + am + studying.' },
          { answer: 'isn\'t studying', accepted: ['isn\'t studying', 'is not studying', '\'s not studying'], explain: 'Marco → is + not → isn\'t studying.' },
          { answer: 'is playing', accepted: ['is playing', '\'s playing'], explain: 'He → is + playing.' },
          { answer: 'are working', accepted: ['are working', '\'re working'], explain: 'Our classmates (plural) → are + working.' },
          { answer: 'Are you listening', accepted: ['are you listening', 'Are you listening'], explain: 'Pregunta con you → Are you + listening?' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando present continuous.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Describe qué estás haciendo tú en este momento (por lo menos una acción).',
            answer: 'I am studying English.',
            accepted: ['i am', 'i\'m', "i am studying", "i'm studying", "i am learning", "i'm learning", "i am practicing", "i'm practicing"],
            explain: 'Ejemplo: I am studying grammar. / I\'m practicing English right now.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Describe qué está haciendo alguien que conoces en este momento.',
            answer: 'My sister is cooking dinner.',
            accepted: ['is cooking', 'is watching', 'is sleeping', 'is working', 'is studying', 'is playing', 'is talking', 'is reading', 'is running', 'is sitting'],
            explain: 'Ejemplo: My mom is cooking dinner. / My friend is studying at the library.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Escribe una oración negativa: ¿qué NO estás haciendo tú ahora?',
            answer: 'I am not watching TV.',
            accepted: ["i am not", "i'm not", "i am not watching", "i am not sleeping", "i am not eating", "i'm not watching", "i'm not sleeping", "i'm not eating"],
            explain: 'Ejemplo: I\'m not watching TV. / I am not sleeping — I am studying!',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Escribe una pregunta en present continuous sobre lo que hace alguien.',
            answer: 'Is she studying?',
            accepted: ['are you', 'is she', 'is he', 'are they', 'what are', 'what is', 'why are', 'why is'],
            explain: 'Ejemplo: Are you working right now? / Is he coming to the party?',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Misión: Tu amigo te pregunta qué está pasando en tu casa ahora mismo. Describe 3 cosas usando present continuous.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Describe qué estás haciendo tú (primera persona).',
            answer: 'I am studying English.',
            accepted: ['i am', "i'm", "i am studying", "i'm studying", "i am doing", "i'm doing", "i am working", "i'm working"],
            explain: 'Recuerda: I + am + verbo-ing. Ejemplo: I\'m practicing my English right now.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Describe qué está haciendo otra persona en tu casa (tercera persona).',
            answer: 'My mom is cooking.',
            accepted: ['is cooking', 'is watching', 'is sleeping', 'is talking', 'is reading', 'is cleaning', 'is working', 'is playing'],
            explain: 'He/She/It + is + verbo-ing. Ejemplo: My sister is watching a series. / My dad is working in his room.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Describe algo que NO está pasando ahora (negativo).',
            answer: 'Nobody is sleeping — it\'s only 8 pm.',
            accepted: ["isn't", "aren't", "is not", "are not", "i'm not", "i am not", "he isn't", "she isn't", "nobody is"],
            explain: 'Negativo: isn\'t / aren\'t + verb-ing. Ejemplo: My brother isn\'t studying — he\'s playing video games.',
          },
        ],
      },
    ],
  },
}

export default topic
