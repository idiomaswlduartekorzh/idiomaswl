import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'question-tags-b1',
  order: '18',
  color: '#dc2626',
  category: 'Grammar',
  level: 'B1',
  title: 'Question Tags en Inglés B1',
  shortTitle: 'Question Tags',
  metaTitle: 'Question Tags B1 — Coletillas interrogativas en inglés: isn\'t it, aren\'t you',
  description:
    'Las question tags son mini-preguntas que añadimos al final de una afirmación para buscar confirmación o iniciar conversación. En B1 debes dominar la regla esencial: oración afirmativa → tag negativa; oración negativa → tag afirmativa. Son omnipresentes en el inglés conversacional.',
  lead: 'Aprende a usar question tags para sonar natural y confirmar información en conversaciones en inglés B1.',
  outcomes: [
    'Aplicas la regla principal: afirmativo → tag negativo; negativo → tag afirmativo',
    'Usas el auxiliar correcto en el tag según el tiempo verbal de la oración principal',
    'Conoces las question tags irregulares: I am → aren\'t I; let\'s → shall we; imperative → will you',
    'Entiendes la entonación: tag descendente (certeza) vs tag ascendente (pregunta real)',
  ],

  guide: {
    goal: 'Formar question tags correctas usando el auxiliar y la polaridad adecuados.',
    model: 'She speaks French, doesn\'t she? / You haven\'t called him, have you? / Let\'s go, shall we?',
    formula: 'Affirmative clause + negative tag / Negative clause + positive tag',
    decisions: [
      'Oración afirmativa → tag negativa: "She is a doctor, isn\'t she?" / "They went home, didn\'t they?"',
      'Oración negativa → tag afirmativa: "He can\'t swim, can he?" / "She didn\'t call, did she?"',
      'El auxiliar del tag repite el auxiliar de la oración principal: is → isn\'t; can → can\'t; will → won\'t; have → haven\'t',
      'Sin auxiliar en la oración principal → usa do/does/did: "She likes coffee, doesn\'t she?" / "They left early, didn\'t they?"',
      'Irregulares: I am → aren\'t I? (no "amn\'t I"); let\'s → shall we?; imperative → will you? / won\'t you?',
      'Entonación descendente: el hablante está bastante seguro y busca confirmación. Entonación ascendente: es una pregunta real.',
    ],
    table: [
      ['Oración principal', 'Tag', 'Ejemplo completo'],
      ['Afirmativa (be)', 'not + be pronoun', 'She is late, isn\'t she?'],
      ['Negativa (do/does)', 'do/does + pronoun', 'He doesn\'t know, does he?'],
    ],
    mistakes: [
      '"She is coming, isn\'t it?" ❌ → "She is coming, isn\'t she?" ✓ — el pronombre del tag debe concordar con el sujeto.',
      '"I am right, am I not?" (demasiado formal) → "I\'m right, aren\'t I?" ✓ — la forma natural informal es "aren\'t I".',
      '"They work here, don\'t it?" ❌ → "They work here, don\'t they?" ✓ — they → they en el tag.',
    ],
  },

  seo: [
    {
      heading: '¿Qué son las question tags y para qué sirven?',
      paragraphs: [
        'Las question tags (también llamadas tag questions o coletillas interrogativas) son mini-preguntas que se añaden al final de una oración. Se usan principalmente para: (1) buscar confirmación de algo que creemos es verdad: "You\'re a teacher, aren\'t you?"; (2) invitar al interlocutor a participar en la conversación; (3) expresar sorpresa o escepticismo.',
        'Son extremadamente frecuentes en el inglés hablado cotidiano. Los hablantes nativos las usan constantemente, por lo que reconocerlas y usarlas te ayuda a sonar más natural y a participar en conversaciones de manera más fluida.',
      ],
    },
    {
      heading: 'La regla principal: polaridad opuesta',
      paragraphs: [
        'La regla más importante es que el tag tiene polaridad opuesta a la oración principal. Si la oración es afirmativa, el tag es negativo: "She can speak German, can\'t she?" Si la oración es negativa, el tag es afirmativo: "They haven\'t arrived yet, have they?"',
        'El auxiliar del tag siempre tiene que ser el mismo auxiliar que aparece (o se sobreentiende) en la oración principal. Si la oración principal usa "is", el tag usa "isn\'t / is". Si usa "will", el tag usa "won\'t / will". Si no hay auxiliar, se usa do/does (presente) o did (pasado).',
      ],
      table: [
        ['Tiempo verbal', 'Oración afirmativa → tag', 'Oración negativa → tag'],
        ['Present simple (be)', 'She is tired, isn\'t she?', 'She isn\'t tired, is she?'],
        ['Present simple (do)', 'He works here, doesn\'t he?', 'He doesn\'t work here, does he?'],
        ['Past simple', 'They left, didn\'t they?', 'They didn\'t leave, did they?'],
        ['Present perfect', 'You\'ve met him, haven\'t you?', 'You haven\'t met him, have you?'],
        ['Future will', 'She will come, won\'t she?', 'She won\'t come, will she?'],
        ['Modal can', 'He can drive, can\'t he?', 'He can\'t drive, can he?'],
      ],
    },
    {
      heading: 'Question tags irregulares y especiales',
      paragraphs: [
        '"I am" → tag: "aren\'t I?" — "I\'m late, aren\'t I?" (la forma "am I not?" existe pero es muy formal y poco usada en conversación). Con "Let\'s" → "shall we?": "Let\'s take a break, shall we?" Con imperativo → "will you?" (petición educada) o "won\'t you?" (más suave): "Close the door, will you?" / "Have some tea, won\'t you?"',
        'Cuando el sujeto es "nobody/no one/nothing" (palabras de sentido negativo), el tag va en afirmativo: "Nobody called, did they?" (they se refiere a nobody). Cuando hay "everything/nothing" como sujeto: "Nothing went wrong, did it?"',
      ],
    },
    {
      heading: 'Entonación: clave para el significado',
      paragraphs: [
        'La entonación del tag cambia su significado completamente. Entonación DESCENDENTE (↘): el hablante está bastante seguro de lo que dice y solo busca confirmación o acuerdo: "It\'s a beautiful day, isn\'t it? ↘" (el hablante sabe que hace buen tiempo). Entonación ASCENDENTE (↗): el hablante tiene una duda genuina y quiere saber la respuesta: "You haven\'t seen my keys, have you? ↗" (realmente no sabe).',
        'En el IELTS Speaking y Cambridge, los examinadores valoran el uso de question tags con la entonación correcta como señal de control del registro informal. También muestran que el hablante puede mantener una conversación natural y no solo responder preguntas.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Question tags con regla de polaridad opuesta, auxiliares correctos e irregulares.',
    graphicPrompt: 'Globos de diálogo: afirmación + tag negativa, negación + tag positiva. Flechas de entonación descendente y ascendente.',
    scene: [
      ['You speak Spanish, don\'t you?', '¿Hablas español, verdad?'],
      ['She hasn\'t called yet, has she?', 'Ella no ha llamado todavía, ¿verdad?'],
      ['The exam was difficult, wasn\'t it?', 'El examen fue difícil, ¿verdad?'],
      ['They can\'t come to the meeting, can they?', 'No pueden venir a la reunión, ¿verdad?'],
      ['You\'ll be at the conference tomorrow, won\'t you?', '¿Estarás en la conferencia mañana, no?'],
      ['Let\'s take a five-minute break, shall we?', 'Tomemos un descanso de cinco minutos, ¿de acuerdo?'],
      ['She\'s been to Korea before, hasn\'t she?', 'Ella ha estado en Corea antes, ¿verdad?'],
      ['I\'m on the right track, aren\'t I?', 'Voy por el buen camino, ¿verdad?'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['positive → negative tag', 'negative → positive tag', 'correct auxiliary in tag', 'irregular tags', 'pronoun agreement'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el tag correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona el question tag correcto para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'En la clase',
            lines: [['', 'You studied for the test last night, ___ ?']],
            options: ['didn\'t you', 'don\'t you', 'weren\'t you', 'didn\'t they'],
            answer: 'didn\'t you',
            explain: '"Studied" (past simple affirmative) → tag negativa con did: "didn\'t you?" Sujeto: you.',
          },
          {
            scene: 'El clima',
            lines: [['', 'It isn\'t raining anymore, ___ ?']],
            options: ['is it', 'isn\'t it', 'does it', 'did it'],
            answer: 'is it',
            explain: 'Oración negativa (isn\'t) → tag afirmativa: "is it?" El auxiliar es "is" (be).',
          },
          {
            scene: 'Una habilidad',
            lines: [['', 'She can speak four languages, ___ ?']],
            options: ['can\'t she', 'doesn\'t she', 'isn\'t she', 'can she'],
            answer: 'can\'t she',
            explain: 'Afirmativa + modal "can" → tag negativa: "can\'t she?" Sujeto: she.',
          },
          {
            scene: 'El viaje',
            lines: [['', 'They haven\'t been to Colombia before, ___ ?']],
            options: ['have they', 'haven\'t they', 'did they', 'do they'],
            answer: 'have they',
            explain: 'Negativa (haven\'t) → tag afirmativa: "have they?" Auxiliar: have (present perfect).',
          },
          {
            scene: 'Propuesta de descanso',
            lines: [['', 'Let\'s take a short break, ___ ?']],
            options: ['shall we', 'will we', 'do we', 'don\'t we'],
            answer: 'shall we',
            explain: '"Let\'s" + tag siempre usa "shall we?" — es la forma fija para propuestas con let\'s.',
          },
          {
            scene: 'Yo mismo',
            lines: [['', 'I\'m doing this correctly, ___ ?']],
            options: ['aren\'t I', 'am I not', 'isn\'t I', 'am I'],
            answer: 'aren\'t I',
            explain: '"I am" → tag: "aren\'t I?" Es la forma aceptada en inglés informal. ("Am I not?" es muy formal).',
          },
          {
            scene: 'Mañana',
            lines: [['', 'You will send me the report tomorrow, ___ ?']],
            options: ['won\'t you', 'will you', 'don\'t you', 'won\'t they'],
            answer: 'won\'t you',
            explain: 'Afirmativa + will → tag negativa: "won\'t you?" Auxiliar: will → won\'t.',
          },
          {
            scene: 'El resultado',
            lines: [['', 'The results weren\'t what we expected, ___ ?']],
            options: ['were they', 'weren\'t they', 'did they', 'do they'],
            answer: 'were they',
            explain: 'Negativa (weren\'t) → tag afirmativa: "were they?" Auxiliar: be (were).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Completa la conversación',
        tag: '2 espacios',
        intro: 'Completa con el auxiliar y el pronombre correctos del question tag.',
        type: 'dual',
        items: [
          {
            scene: 'Conociendo a alguien',
            lines: [['', 'You\'re from Colombia, [[0]] [[1]]?']],
            blanks: [
              { options: ['aren\'t', 'isn\'t', 'don\'t', 'weren\'t'], answer: 'aren\'t', explain: '"You are" → tag negativa: "aren\'t". Auxiliar be, negativo.' },
              { options: ['you', 'they', 'he', 'we'], answer: 'you', explain: 'El sujeto de la oración principal es "You" → el pronombre del tag también es "you".' },
            ],
          },
          {
            scene: 'El proyecto',
            lines: [['', 'We haven\'t finished the report yet, [[0]] [[1]]?']],
            blanks: [
              { options: ['have', 'haven\'t', 'do', 'did'], answer: 'have', explain: 'Negativa (haven\'t) → tag afirmativa: "have". Auxiliar: have (present perfect).' },
              { options: ['we', 'they', 'you', 'I'], answer: 'we', explain: 'Sujeto de la oración: "We" → pronombre del tag: "we".' },
            ],
          },
          {
            scene: 'Planes del fin de semana',
            lines: [['', 'She\'s going to the concert on Saturday, [[0]] [[1]]?']],
            blanks: [
              { options: ['isn\'t', 'aren\'t', 'doesn\'t', 'won\'t'], answer: 'isn\'t', explain: '"She is going to" → tag con "is": "isn\'t". Auxiliar: be (going to = presente).' },
              { options: ['she', 'he', 'they', 'we'], answer: 'she', explain: 'Sujeto: "She" → pronombre del tag: "she".' },
            ],
          },
          {
            scene: 'El futuro del equipo',
            lines: [['', 'The team won\'t be ready by Monday, [[0]] [[1]]?']],
            blanks: [
              { options: ['will', 'won\'t', 'do', 'would'], answer: 'will', explain: 'Negativa (won\'t) → tag afirmativa: "will". Auxiliar: will.' },
              { options: ['they', 'it', 'we', 'you'], answer: 'they', explain: 'Sujeto: "The team" → en inglés "team" es plural informal → "they" en el tag.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una entrevista de trabajo',
        tag: 'Texto guiado',
        intro: 'Completa las question tags en este diálogo de entrevista de trabajo.',
        type: 'guidedText',
        scene: 'Completa las coletillas del entrevistador.',
        text: 'Interviewer: You\'ve worked in customer service before, [[0]]? Candidate: Yes, for three years.\nInterviewer: And you can use Excel and PowerPoint, [[1]]? Candidate: Absolutely.\nInterviewer: You don\'t have any prior commitments in the next six months, [[2]]? Candidate: No, I\'m completely available.\nInterviewer: You studied marketing at university, [[3]]? Candidate: Yes, I have a degree from the National University.\nInterviewer: You\'re available to start immediately, [[4]]? Candidate: Yes, I can start anytime.\nInterviewer: Let\'s schedule a second interview, [[5]]?',
        blanks: [
          { options: ['haven\'t you', 'have you', 'didn\'t you', 'don\'t you'], answer: 'haven\'t you', explain: '"You\'ve worked" (present perfect, afirmativa) → tag negativa: "haven\'t you?"' },
          { options: ['can\'t you', 'can you', 'don\'t you', 'couldn\'t you'], answer: 'can\'t you', explain: '"Can" (afirmativa) → tag negativa: "can\'t you?"' },
          { options: ['do you', 'don\'t you', 'have you', 'are you'], answer: 'do you', explain: '"Don\'t have" (presente simple negativa) → tag afirmativa: "do you?"' },
          { options: ['didn\'t you', 'did you', 'don\'t you', 'haven\'t you'], answer: 'didn\'t you', explain: '"Studied" (past simple afirmativa) → tag negativa: "didn\'t you?"' },
          { options: ['aren\'t you', 'are you', 'don\'t you', 'won\'t you'], answer: 'aren\'t you', explain: '"You\'re available" (am/is/are, afirmativa) → tag negativa: "aren\'t you?"' },
          { options: ['shall we', 'will we', 'do we', 'should we'], answer: 'shall we', explain: '"Let\'s" → tag siempre: "shall we?" — forma fija para propuestas.',
          },
        ],
      },
      {
        id: 'level-4',
        title: 'Forma el tag correcto',
        tag: 'Texto libre',
        intro: 'Escribe el question tag correcto para cada oración.',
        type: 'freeText',
        scene: 'Escribe el question tag completo (auxiliar + pronombre).',
        text: 'She has been to Japan three times, [[0]]?\nYou didn\'t understand the instructions, [[1]]?\nThey can attend the conference, [[2]]?\nI\'m making progress with my English, [[3]]?\nLet\'s practise question tags together, [[4]]?',
        blanks: [
          { answer: 'hasn\'t she', accepted: ['hasn\'t she'], explain: '"has been" (pres. perfect, afirmativa) → tag negativa: "hasn\'t she?"' },
          { answer: 'did you', accepted: ['did you'], explain: '"didn\'t understand" (past simple, negativa) → tag afirmativa: "did you?"' },
          { answer: 'can\'t they', accepted: ['can\'t they'], explain: '"can attend" (modal afirmativo) → tag negativa: "can\'t they?"' },
          { answer: 'aren\'t I', accepted: ['aren\'t I'], explain: '"I am" + afirmativa → tag especial: "aren\'t I?" (la única forma natural en inglés informal).' },
          { answer: 'shall we', accepted: ['shall we'], explain: '"Let\'s" → tag fija: "shall we?" Siempre.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Producción',
        intro: 'Escribe oraciones completas con question tags según los contextos.',
        type: 'write',
        items: [
          {
            scene: 'Confirmando un hecho',
            prompt: 'Escribe una oración afirmativa sobre tu ciudad o país con un question tag negativo (e.g., "It\'s a beautiful city, isn\'t it?")',
            answer: 'Colombia is famous for its biodiversity, isn\'t it?',
            accepted: ['isn\'t it', 'aren\'t they', 'don\'t they', 'didn\'t it', 'hasn\'t it'],
            explain: 'Afirmativa + be → tag negativa con el mismo auxiliar. Sujeto → pronombre en tag.',
          },
          {
            scene: 'Una negativa con tag',
            prompt: 'Escribe una oración negativa con un question tag afirmativo sobre algo que no ocurrió.',
            answer: 'The meeting didn\'t start on time, did it?',
            accepted: ['did it', 'did they', 'did he', 'did she', 'did we', 'did you'],
            explain: 'Negativa (didn\'t) → tag afirmativa (did). Recuerda usar el auxiliar correcto.',
          },
          {
            scene: 'Una propuesta',
            prompt: 'Haz una propuesta a un amigo para hacer algo juntos usando "Let\'s... shall we?"',
            answer: 'Let\'s practise our English conversation every evening, shall we?',
            accepted: ['shall we'],
            explain: '"Let\'s" siempre va seguido de "shall we?" para hacer propuestas o sugerencias al grupo.',
          },
          {
            scene: 'Un futuro',
            prompt: 'Pregunta a alguien si va a hacer algo mañana usando will + won\'t.',
            answer: 'You\'ll be at the lesson tomorrow, won\'t you?',
            accepted: ['won\'t you', 'won\'t they', 'won\'t he', 'won\'t she', 'won\'t it'],
            explain: 'Afirmativa + will → tag negativa: "won\'t you?" Forma natural para confirmar planes.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Una conversación natural',
        tag: 'Producción libre',
        intro: 'Practica question tags en conversaciones reales.',
        type: 'write',
        items: [
          {
            scene: 'Conociendo a alguien',
            prompt: 'Escribe 2 preguntas con question tags para conocer a alguien nuevo (una afirmativa, una negativa).',
            answer: 'You\'re studying English for work, aren\'t you? You don\'t live far from here, do you?',
            accepted: ['aren\'t you', 'don\'t you', 'isn\'t it', 'can\'t you', 'haven\'t you', 'didn\'t you'],
            explain: 'Las question tags se usan mucho cuando conocemos a alguien para verificar suposiciones y mantener la conversación fluida.',
          },
          {
            scene: 'En clase',
            prompt: 'Escribe 2 question tags que usarías en clase de inglés: una para pedir confirmación, una para hacer una propuesta con let\'s.',
            answer: 'We need to practise more listening, don\'t we? Let\'s watch a documentary in English next class, shall we?',
            accepted: ['don\'t we', 'shall we', 'don\'t you', 'isn\'t it', 'haven\'t we', 'aren\'t we'],
            explain: '"Don\'t we?" confirma una opinión. "Shall we?" propone hacer algo juntos (solo con "Let\'s").',
          },
          {
            scene: 'Sobre tu aprendizaje',
            prompt: 'Escribe una reflexión sobre tu inglés usando un question tag para expresar incertidumbre (entonación ascendente, duda real).',
            answer: 'I haven\'t been practising enough lately, have I? I should do more speaking exercises.',
            accepted: ['have i', 'haven\'t i', 'do i', 'did i', 'am i', 'aren\'t i'],
            explain: 'Tag con entonación ascendente = duda real, pregunta genuina. Refleja autocrítica y conciencia de aprendizaje.',
          },
        ],
      },
    ],
  },
}

export default topic
