import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'will-future',
  order: '07',
  color: '#dc2626',
  category: 'Verbs',
  level: 'A2',
  title: 'El Futuro con Will en Inglés A2',
  shortTitle: 'Will',
  metaTitle: 'Will en Inglés A2 — Predicciones, Decisiones y Promesas',
  description:
    'Will es el auxiliar del futuro en inglés que usamos para predicciones, decisiones espontáneas, promesas y ofrecimientos. Se combina con el verbo en forma base (sin to) y es igual para todos los sujetos. Su negativo es "won\'t" (will not) — nunca "will not go" en conversación normal.',
  lead: 'Aprende a usar will/won\'t para predicciones, decisiones en el momento y promesas en inglés.',
  outcomes: [
    'Usa will + verbo base para predicciones y decisiones espontáneas',
    'Forma negativos con won\'t correctamente',
    'Distingue will de going to según el contexto',
    'Hace preguntas con Will...?',
  ],

  guide: {
    goal: 'Usar will/won\'t para hablar de predicciones, decisiones espontáneas, promesas y ofrecimientos futuros.',
    model: 'It will rain tomorrow. / I\'ll help you! / She won\'t come to the party.',
    formula: 'Subject + will + base verb / Subject + won\'t + base verb',
    decisions: [
      '"Will" es igual para todos los sujetos: I will, you will, he will, she will, we will, they will',
      'Contracción afirmativa: I\'ll, you\'ll, he\'ll, she\'ll, it\'ll, we\'ll, they\'ll',
      'Negativo: will not → won\'t (¡no "willn\'t"!) → I won\'t go, she won\'t call',
      'Pregunta: Will + sujeto + verbo base? → Will you help me? / Will it be ready?',
      'Uso 1 — Predicción: I think it will be cold tomorrow.',
      'Uso 2 — Decisión espontánea (en el momento): "I\'ll take the soup, please." (NOT going to)',
      'Uso 3 — Promesa: I\'ll call you later, I promise.',
      'Uso 4 — Ofrecimiento: I\'ll carry that for you.',
    ],
    table: [
      ['Uso', 'Ejemplo', 'Clave'],
      ['Predicción', 'It will be sunny.', 'I think / probably / maybe'],
      ['Decisión espontánea', 'I\'ll have the pasta.', 'Decides en ese momento'],
    ],
    mistakes: [
      '"I will to go" ❌ → "I will go" ✓ — will + verbo base sin "to".',
      '"She wills work hard" ❌ → "She will work hard" ✓ — will nunca añade -s.',
      '"I willn\'t" ❌ → "I won\'t" ✓ — la contracción correcta es won\'t.',
    ],
  },

  seo: [
    {
      heading: '¿Cuándo se usa "will" en inglés?',
      paragraphs: [
        '"Will" es el auxiliar del futuro más versátil en inglés. No es el único futuro (también existe "going to" y el presente continuo), pero tiene usos específicos que es importante conocer.',
        'Los cuatro usos principales de "will" son: predicciones basadas en opinión o creencia ("I think it will rain"), decisiones espontáneas tomadas en el momento de hablar ("I\'ll have the coffee"), promesas ("I\'ll never forget you"), y ofrecimientos voluntarios ("I\'ll open the door for you").',
      ],
    },
    {
      heading: 'Estructura de will: afirmativo, negativo e interrogativo',
      paragraphs: [
        'Afirmativo: sujeto + will + verbo base. Will es igual para TODOS los sujetos — nunca añade -s ni cambia: I will, you will, he will, she will, it will, we will, they will. Las contracciones son muy comunes: I\'ll, you\'ll, he\'ll, she\'ll, we\'ll, they\'ll.',
        'Negativo: sujeto + won\'t + verbo base. "Won\'t" = will not. Ejemplos: I won\'t be late. / She won\'t accept that. / They won\'t understand.',
        'Interrogativo: Will + sujeto + verbo base? Ejemplos: Will you help me? / Will it be ready on time? / What will you do?',
      ],
      examples: [
        ['Forma', 'Ejemplo'],
        ['Afirmativo', 'I\'ll call you tomorrow.'],
        ['Negativo', 'He won\'t come to the meeting.'],
        ['Pregunta', 'Will you be at the party?'],
        ['Pregunta Wh-', 'What will you do this weekend?'],
      ],
    },
    {
      heading: 'Will vs. going to: la diferencia clave',
      paragraphs: [
        '"Will" se usa para decisiones en el momento, predicciones basadas en opinión y promesas. "Going to" se usa para planes previamente decididos y predicciones basadas en evidencia visible.',
        'Ejemplo de decisión espontánea (will): Estás en un restaurante y ves el menú → "I\'ll have the pasta" (decides en ese momento). Si ya lo habías decidido antes de entrar → "I\'m going to have the pasta" (plan previo).',
        'Ejemplo de predicción: "I think it will rain" (opinión) vs. "Look at those clouds — it\'s going to rain!" (evidencia visible).',
      ],
    },
    {
      heading: 'Expresiones comunes con will',
      paragraphs: [
        '"Will" frecuentemente aparece con expresiones de opinión: "I think...", "I believe...", "I hope...", "I\'m sure...", "probably", "maybe", "perhaps". Estas señales contextuales te ayudan a identificar cuándo usar will.',
        'Promesas y decisiones rápidas en conversación: "I\'ll do it right away." / "Don\'t worry, I\'ll handle it." / "I promise I won\'t be late." Nota cómo en estas situaciones la decisión surge en el momento, no es un plan previo.',
      ],
    },
    {
      heading: 'Errores comunes de hispanohablantes',
      paragraphs: [
        'El error más frecuente es añadir "to" después de will: "I will to help you" es incorrecto. "Will" ya funciona como auxiliar — el verbo que sigue va en su forma base sin "to".',
        'También es común inventar "willn\'t" como negación. La forma correcta es "won\'t" (will + not contraído de una manera irregular). Memoriza: will → won\'t.',
        'Otro error: usar "will" para planes ya decididos. "I will go to the cinema tomorrow (I already have tickets)" debería ser "I\'m going to the cinema tomorrow" o "I\'m going to go to the cinema tomorrow".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Will/won\'t para predicciones, promesas y decisiones espontáneas en A2.',
    graphicPrompt: 'Conversaciones con decisiones en el momento, predicciones y promesas.',
    scene: [
      ['I\'ll help you with that!', '¡Te ayudo con eso!'],
      ['It will probably rain this afternoon.', 'Probablemente lloverá esta tarde.'],
      ['I promise I won\'t be late.', 'Prometo que no llegaré tarde.'],
      ['Will you come to the party?', '¿Vendrás a la fiesta?'],
      ['I think she\'ll love the gift.', 'Creo que le encantará el regalo.'],
      ['We won\'t have time for everything.', 'No tendremos tiempo para todo.'],
      ['I\'ll have the salad, please.', 'Tomaré la ensalada, por favor.'],
      ['Don\'t worry — it\'ll be fine!', '¡No te preocupes — saldrá bien!'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['will + base verb (no -s)', 'won\'t (not willn\'t)', 'will vs going to', 'contractions: I\'ll, she\'ll'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce el uso de will',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de will/won\'t para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Predicción sobre el tiempo',
            lines: [['', 'Don\'t forget your jacket — it ___ be cold tonight.']],
            options: ['will', 'won\'t', 'would', 'is going'],
            answer: 'will',
            explain: 'Predicción basada en experiencia → will.',
          },
          {
            scene: 'Promesa',
            lines: [['', 'I promise I ___ tell anyone your secret.']],
            options: ['won\'t', 'will', 'don\'t', 'didn\'t'],
            answer: 'won\'t',
            explain: 'Promesa negativa → won\'t (will not).',
          },
          {
            scene: 'En el restaurante',
            lines: [['', 'Hmm, I think ___ have the chicken soup.']],
            options: ['I\'ll', 'I\'m going to', 'I am', 'I was'],
            answer: 'I\'ll',
            explain: 'Decisión espontánea en el momento → I\'ll (contracción natural de "I will").',
          },
          {
            scene: 'Ofrecimiento',
            lines: [['', 'Your bag looks heavy — ___ carry it for you?']],
            options: ['Shall I', 'Will I', 'Am I', 'Do I'],
            answer: 'Shall I',
            explain: 'Ofrecimiento voluntario con pregunta → "Shall I…?" (más natural que "Will I…?" para ofrecimientos).',
          },
          {
            scene: 'Predicción con opinión',
            lines: [['', 'I think the new manager ___ make a lot of changes.']],
            options: ['will', 'is', 'goes', 'was'],
            answer: 'will',
            explain: '"I think + will" = predicción basada en opinión.',
          },
          {
            scene: 'Negación sobre el futuro',
            lines: [['', 'She ___ be at the meeting — she\'s traveling that day.']],
            options: ['won\'t', 'will', 'isn\'t', 'doesn\'t'],
            answer: 'won\'t',
            explain: '"Won\'t" = will not — certeza de que algo no va a pasar.',
          },
          {
            scene: 'Pregunta sobre el futuro',
            lines: [['', '___ you be free this Saturday?']],
            options: ['Will', 'Are', 'Do', 'Shall'],
            answer: 'Will',
            explain: 'Pregunta con will: Will + sujeto + verbo base.',
          },
          {
            scene: 'Error a detectar',
            lines: [['', 'She ___ works late tonight.']],
            options: ['will', 'won\'t', 'wills', 'will be'],
            answer: 'will',
            explain: '"Will" nunca lleva -s. "She will work" es correcto; "she wills work" es incorrecto.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Will y contexto',
        tag: '2 espacios',
        intro: 'Completa con la contracción o forma correcta de will/won\'t.',
        type: 'dual',
        items: [
          {
            scene: 'Planeando la semana',
            lines: [
 ['Friend:', '[[0]] you be at the office tomorrow?'],
 ['You:', 'No, [[1]] work from home — I have a call in the morning.'],
 ],
            blanks: [
              { options: ['Will', 'Are', 'Do', 'Shall'], answer: 'Will', explain: 'Pregunta sobre el futuro → Will + sujeto.' },
              { options: ['I\'ll', 'I\'m going to', 'I was', 'I am'], answer: 'I\'ll', explain: 'Respuesta: "I\'ll work from home" — contracción natural de I will.' },
            ],
          },
          {
            scene: 'Conversación sobre el tiempo',
            lines: [
 ['News:', 'Temperatures [[0]] drop significantly this weekend.'],
 ['Friend:', 'Oh no! I [[1]] go to the beach then.'],
 ],
            blanks: [
              { options: ['will', 'are', 'go', 'be'], answer: 'will', explain: 'Predicción → will.' },
              { options: ['won\'t', 'will', 'don\'t', 'haven\'t'], answer: 'won\'t', explain: 'Decisión negativa → won\'t.' },
            ],
          },
          {
            scene: 'Haciendo promesas',
            lines: [
 ['Parent:', 'Please call me when you arrive.'],
 ['Child:', 'I [[0]], I promise. And I [[1]] be late — don\'t worry!'],
 ],
            blanks: [
              { options: ['will', 'do', 'am', 'shall'], answer: 'will', explain: 'Promesa: "I will" (o "I will call").' },
              { options: ['won\'t', 'will', 'don\'t', 'wasn\'t'], answer: 'won\'t', explain: 'Promesa negativa → won\'t.' },
            ],
          },
          {
            scene: 'En la tienda',
            lines: [
 ['Salesperson:', 'Can I help you?'],
 ['Customer:', 'No, thanks, [[0]] just look. Actually — [[1]] take this one!'],
 ],
            blanks: [
              { options: ['I\'ll', 'I am', 'I go', 'I was'], answer: 'I\'ll', explain: '"I\'ll just look" — decisión espontánea.' },
              { options: ['I\'ll', 'I am going to', 'I was', 'I do'], answer: 'I\'ll', explain: '"I\'ll take this" — decisión tomada en ese momento al ver el producto.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Predicciones para el año próximo',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta de will/won\'t para completar estas predicciones.',
        type: 'guidedText',
        scene: 'Elige la forma correcta de will/won\'t para completar estas predicciones.',
        text: 'What [[0]] the world look like in 10 years? I think technology [[1]] continue to change our lives. Many jobs [[2]] exist anymore — robots [[3]] do them. But new jobs [[4]] appear that we can\'t imagine today. People probably [[5]] live longer, thanks to medical advances. And I hope countries [[6]] find better solutions to climate change.',
        blanks: [
          { options: ['will', 'is', 'does', 'shall'], answer: 'will', explain: '"What will…?" — pregunta sobre el futuro.' },
          { options: ['will', 'won\'t', 'is going to', 'has'], answer: 'will', explain: 'Predicción afirmativa → will.' },
          { options: ['won\'t', 'will', 'don\'t', 'aren\'t'], answer: 'won\'t', explain: '"won\'t exist" — muchos trabajos no existirán.' },
          { options: ['will', 'won\'t', 'is', 'are'], answer: 'will', explain: '"Robots will do them" — predicción.' },
          { options: ['will', 'won\'t', 'are', 'do'], answer: 'will', explain: '"New jobs will appear" — predicción optimista.' },
          { options: ['will', 'won\'t', 'do', 'are'], answer: 'will', explain: '"People will probably live longer" — will + adverbio de probabilidad.' },
          { options: ['will', 'won\'t', 'do', 'can'], answer: 'will', explain: '"I hope + will" — esperanza sobre el futuro.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Construye el futuro',
        tag: 'Texto libre',
        intro: 'Completa con will/won\'t + el verbo correcto.',
        type: 'freeText',
        scene: 'Completa con will/won\'t + el verbo correcto.',
        text: 'My plans for next year: I [[0]] (will/study) a new language — I\'m thinking Japanese. I [[1]] (won\'t/give up) even when it gets hard. I think it [[2]] (will/be) challenging but worth it. My friend Marco [[3]] (will/join) me — we [[4]] (will/practice) together every week.',
        blanks: [
          { answer: 'will study', accepted: ["'ll study", "will study"], explain: "I will study / I'll study — plan + decisión." },
          { answer: "won't give up", accepted: ["won't give up", "will not give up"], explain: "Promesa negativa: won't give up." },
          { answer: 'will be', accepted: ["'ll be", "will be"], explain: 'Predicción: it will be challenging.' },
          { answer: 'will join', accepted: ["'ll join", "will join"], explain: 'Predicción: Marco will join.' },
          { answer: 'will practice', accepted: ["'ll practice", "will practice", "'ll practise", "will practise"], explain: 'Plan: we will practice together.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones con will/won\'t en diferentes contextos.',
        type: 'write',
        items: [
          {
            scene: 'Tu predicción',
            prompt: 'Haz una predicción sobre el mundo en 10 años (usa "I think... will...").',
            answer: 'I think technology will completely change the way we work.',
            accepted: ['will', "i think", "i believe", "i hope", "probably"],
            explain: 'Ejemplo: I think electric cars will replace petrol cars. / I believe people will live longer.',
          },
          {
            scene: 'Una promesa',
            prompt: 'Escribe una promesa a alguien cercano (usa "I\'ll... / I won\'t...").',
            answer: 'I\'ll always be here for you when you need me.',
            accepted: ["i'll", "i will", "i won't", "i promise"],
            explain: 'Ejemplo: I won\'t forget your birthday. / I\'ll call you every week.',
          },
          {
            scene: 'Decisión espontánea',
            prompt: 'Imagina que estás en una situación donde decides algo en el momento — ¿qué dices?',
            answer: 'I\'ll help you carry those boxes — they look heavy!',
            accepted: ["i'll", "i will", "we'll", "shall i"],
            explain: 'Ejemplo: I\'ll get the door for you. / I\'ll take the vegetarian option.',
          },
          {
            scene: 'Predicción negativa',
            prompt: 'Escribe algo que crees que NO va a pasar en el futuro (usa "won\'t").',
            answer: 'I don\'t think robots won\'t completely replace human creativity.',
            accepted: ["won't", "will not", "won't be", "won't have", "won't get", "won't change"],
            explain: 'Ejemplo: AI won\'t replace teachers completely. / I won\'t need a car in the future — I\'ll use public transport.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu futuro en 5 años',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones sobre cómo crees que será tu vida en 5 años. Usa will/won\'t.',
        type: 'write',
        items: [
          {
            scene: 'Tu futuro',
            prompt: 'Escribe una predicción sobre tu vida profesional o de estudios (usa "I think I\'ll..." o "I\'ll probably...").',
            answer: 'I think I\'ll have a better job and maybe work in a different country.',
            accepted: ["i'll", "i will", "i think", "probably", "i hope", "i believe"],
            explain: 'Ejemplo: I\'ll probably have finished my degree by then. / I think I\'ll work in a different city.',
          },
          {
            scene: 'Tu futuro',
            prompt: 'Escribe algo que NO harás o que NO tendrá lugar en tu vida (usa "won\'t").',
            answer: 'I won\'t stop learning new things — I love education.',
            accepted: ["won't", "will not"],
            explain: 'Ejemplo: I won\'t live in my hometown forever. / I won\'t forget the goals I have today.',
          },
          {
            scene: 'Tu futuro',
            prompt: 'Escribe un deseo o esperanza para el futuro (usa "I hope + will").',
            answer: 'I hope my family will be healthy and happy.',
            accepted: ['i hope', 'i hope it will', 'i hope they will', 'i hope i will', 'i hope we will'],
            explain: 'Ejemplo: I hope I\'ll be living close to the ocean. / I hope the world will be a better place.',
          },
        ],
      },
    ],
  },
}

export default topic
