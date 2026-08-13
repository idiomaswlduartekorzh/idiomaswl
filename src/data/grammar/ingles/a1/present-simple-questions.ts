import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'present-simple-questions',
  order: '11',
  color: '#0284c7',
  category: 'Verbs',
  level: 'A1',
  title: 'Present simple interrogativo en inglés A1',
  shortTitle: 'Present simple (preguntas)',
  metaTitle: 'Present simple interrogativo en inglés A1 — Do/Does y Wh-questions',
  description: 'Aprende a construir preguntas Yes/No con Do y Does, y preguntas Wh- con What, Where, When, Who y How, con práctica progresiva de 6 niveles orientada al hispanohablante.',
  lead: 'En español para preguntar puedes solo subir la entonación: ¿Estudias inglés? En inglés necesitas un auxiliar: Do you study English? Y para tercera persona: Does she study English? El auxiliar cambia; el verbo vuelve a su forma base.',
  outcomes: [
    'Construir preguntas Yes/No con Do y Does en present simple.',
    'Formar preguntas Wh- con what, where, when, who, how.',
    'Responder con Yes, I do / No, he doesn\'t de forma natural.',
  ],
  guide: {
    goal: 'Formular preguntas en present simple usando Do/Does + forma base, sin añadir -s al verbo principal.',
    model: 'Do lleva toda la carga del auxiliar. Por eso el verbo principal queda en forma base: Does she work? (No "Does she works?")',
    formula: 'Do/Does + subject + verb (base)? | Wh- word + do/does + subject + verb (base)?',
    decisions: [
      'Do → para I, you, we, they.',
      'Does → para he, she, it.',
      'Verbo siempre en forma base después de do/does.',
      'What/Where/When/Who/How → Wh- word va primero.',
      'Respuesta corta: Yes, I do. / No, she doesn\'t.',
    ],
    table: [
      ['Sujeto', 'Auxiliar', 'Ejemplo'],
      ['I / you / we / they', 'Do', 'Do you study every day?'],
      ['he / she / it', 'Does', 'Does she work here?'],
      ['Wh- + I/you/we/they', 'do', 'Where do you live?'],
      ['Wh- + he/she/it', 'does', 'What does he do?'],
    ],
    mistakes: [
      '"Does she works?" → Does she work? El auxiliar ya tiene la -s.',
      '"Do he study?" → Does he study? He necesita does.',
      '"What you do?" → What do you do? Falta el auxiliar.',
    ],
  },
  seo: [
    {
      heading: 'Por qué las preguntas en inglés necesitan do/does',
      paragraphs: [
        'En español el sistema de preguntas es flexible: basta con entonación ascendente (¿Estudias inglés?) o con invertir el sujeto (¿Estudia ella inglés?). El verbo mantiene su conjugación. En inglés el sistema es más rígido: las preguntas de presente simple necesitan el auxiliar do o does delante del sujeto, y el verbo principal vuelve a su forma base.',
        'Do you study English? Does she live here? Este auxiliar sirve como "operador" de la pregunta. Para el hispanohablante, aprender a insertar este auxiliar es el paso más importante porque sin él la pregunta suena a error grave: "You study English?" puede entenderse como pregunta con contexto, pero en inglés formal y académico siempre necesitas el auxiliar.',
      ],
    },
    {
      heading: 'Preguntas Yes/No: Do y Does',
      paragraphs: [
        'Do se usa con I, you, we y they. Does se usa con he, she e it. El auxiliar absorbe la -s de la tercera persona, así que el verbo principal vuelve a su forma base. Do you work here? Yes, I do. Does she study English? No, she doesn\'t. Does he go to the gym? Yes, he does.',
        'Las respuestas cortas son fundamentales en la conversación: Yes, I do. / No, I don\'t. / Yes, she does. / No, she doesn\'t. Nunca se repite el verbo principal en la respuesta corta: Do you like coffee? Yes, I do (no "Yes, I like"). La respuesta corta termina siempre en el auxiliar.',
      ],
      table: [
        ['Pregunta', 'Respuesta afirmativa', 'Respuesta negativa'],
        ['Do you study English?', 'Yes, I do.', 'No, I don\'t.'],
        ['Does she work here?', 'Yes, she does.', 'No, she doesn\'t.'],
        ['Do they live nearby?', 'Yes, they do.', 'No, they don\'t.'],
        ['Does it work?', 'Yes, it does.', 'No, it doesn\'t.'],
      ],
    },
    {
      heading: 'Preguntas Wh-: qué, dónde, cuándo, quién, cómo',
      paragraphs: [
        'Las preguntas con información específica usan una palabra interrogativa (Wh- word) seguida del auxiliar do/does y el sujeto. Estructura: Wh- word + do/does + subject + verb (base)? What do you do? Where does she live? When do they eat? Who do you know here? How does he travel?',
        'La excepción es cuando el Wh- word es el sujeto de la pregunta: Who lives here? (no "Who does live here?"). Si pregunto por el objeto, necesito do/does: Who do you call? Pero si pregunto quién realiza la acción, Who ya es el sujeto y no se añade auxiliar.',
      ],
    },
    {
      heading: 'El error más frecuente: Does + verbo conjugado',
      paragraphs: [
        'El error más común es Does she works? En español el estudiante piensa "Ella trabaja" y conjuga el verbo, luego añade el auxiliar. En inglés el auxiliar ya lleva la información de tercera persona, así que el verbo queda en forma base: Does she work? Work, no works.',
        'Otro error es olvidar el auxiliar en preguntas Wh-: What she does? en lugar de What does she do? La regla es: siempre do/does entre la palabra Wh- y el sujeto.',
      ],
    },
    {
      heading: 'Errores frecuentes y sus correcciones',
      paragraphs: [
        'Error 1: "Does he speaks English?" → Does he speak English? Error 2: "Do she work here?" → Does she work here? Error 3: "What you study?" → What do you study? Error 4: "Where lives she?" → Where does she live?',
      ],
      examples: [
        ['Incorrecto', 'Does she speaks French?', 'Correcto', 'Does she speak French?'],
        ['Incorrecto', 'Do he study here?', 'Correcto', 'Does he study here?'],
        ['Incorrecto', 'What you do on weekends?', 'Correcto', 'What do you do on weekends?'],
      ],
    },
    {
      heading: '¿Cómo se hacen preguntas en present simple?',
      paragraphs: [
        'Con el auxiliar Do/Does al principio + sujeto + verbo en forma base: "Do you work?", "Does she work?". El verbo principal no lleva -s en la pregunta ("Does he live here?", no "lives"). Con to be no se usa do: se invierte el orden ("Are you ready?").',
      ],
    },
    {
      heading: '¿Cuándo se usa "Do" y cuándo "Does" en las preguntas?',
      paragraphs: [
        '"Do" con I, you, we, they ("Do they speak English?"). "Does" con he, she, it ("Does he speak English?"). Como la -s de la tercera persona va en el auxiliar "does", el verbo principal se queda en forma base.',
      ],
    },
    {
      heading: '¿Cómo se hacen preguntas con "wh-" (what, where, when…) en inglés?',
      paragraphs: [
        'Con la palabra wh- + auxiliar + sujeto + verbo base: "Where do you live?", "What does she do?", "When do they arrive?". La estructura es igual que la pregunta yes/no, pero añadiendo la palabra interrogativa al principio.',
      ],
    },
  ],
  visual: {
    mode: 'question-builder',
    teacherLens: 'El estudiante aprende a insertar do/does como primer elemento después de la Wh- word, y a mantener el verbo en forma base.',
    graphicPrompt: 'Elige do o does → colócalo antes del sujeto → verbo en forma base.',
    scene: [['Do + I/you/we/they', 'do + base verb'], ['Does + he/she/it', 'does + base verb'], ['Wh- word + do/does', 'question word first']],
    learnerModes: ['visual: auxiliar como operador', 'analítico: do vs does', 'oral: preguntas de entrevista'],
    practiceVerbs: ['Pregunta', 'Elige', 'Completa', 'Responde', 'Forma', 'Entrevista'],
    reviewFocus: ['do vs does', 'forma base después del auxiliar', 'orden Wh-+do/does+sujeto', 'respuestas cortas'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige el auxiliar correcto para completar la pregunta.',
        type: 'choice',
        items: [
          {
            scene: 'Primer día de clase',
            lines: [['Teacher', '___ you study English every day?']],
            options: ['Do', 'Does', 'Are', 'Is'],
            answer: 'Do',
            explain: 'You → Do you study?',
          },
          {
            scene: 'Preguntando sobre ella',
            lines: [['Carlos', '___ your sister work on weekends?']],
            options: ['Do', 'Does', 'Is', 'Has'],
            answer: 'Does',
            explain: 'Your sister → she → Does she work?',
          },
          {
            scene: 'Entrevista de trabajo',
            lines: [['Manager', '___ they speak English in your company?']],
            options: ['Do', 'Does', 'Are', 'Is'],
            answer: 'Do',
            explain: 'They → Do they speak?',
          },
          {
            scene: 'Preguntando por el horario',
            lines: [['Student', 'What time ___ the class start?']],
            options: ['do', 'does', 'is', 'are'],
            answer: 'does',
            explain: 'The class → it → does it start? → What time does the class start?',
          },
          {
            scene: 'Sobre hábitos',
            lines: [['Teacher', 'Where ___ you live?']],
            options: ['do', 'does', 'are', 'is'],
            answer: 'do',
            explain: 'You → do you live? → Where do you live?',
          },
          {
            scene: 'Conociendo personas',
            lines: [['Ana', '___ Tomás speak Korean?']],
            options: ['Do', 'Does', 'Is', 'Are'],
            answer: 'Does',
            explain: 'Tomás → he → Does he speak?',
          },
          {
            scene: 'Respuesta corta afirmativa',
            lines: [['Teacher', 'Do you like English?'], ['Carlos', 'Yes, I ___.']],
            options: ['do', 'does', 'am', 'like'],
            answer: 'do',
            explain: 'Respuesta corta: Yes, I do.',
          },
          {
            scene: 'Respuesta corta negativa',
            lines: [['Lina', 'Does your brother study here?'], ['Sofia', 'No, he ___.']],
            options: ['doesn\'t', 'don\'t', 'isn\'t', 'aren\'t'],
            answer: 'doesn\'t',
            explain: 'Respuesta corta negativa 3a persona: No, he doesn\'t.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos preguntas en un diálogo',
        tag: '2 espacios',
        intro: 'Completa las dos preguntas en la misma conversación.',
        type: 'dual',
        items: [
          {
            scene: 'Conociendo a alguien',
            lines: [['Ana', '[[0]] you work near here?'], ['Carlos', 'Yes, I do. [[1]] you study at WeLearn?']],
            blanks: [
              { options: ['Do', 'Does', 'Are'], answer: 'Do', explain: 'You → Do you work?' },
              { options: ['Do', 'Does', 'Are'], answer: 'Do', explain: 'You → Do you study?' },
            ],
          },
          {
            scene: 'Hablando de un amigo',
            lines: [['Teacher', '[[0]] Carlos come to class every day?'], ['Ana', 'Yes, he does. [[1]] he speak English at home too?']],
            blanks: [
              { options: ['Do', 'Does', 'Is'], answer: 'Does', explain: 'Carlos → he → Does he come?' },
              { options: ['Do', 'Does', 'Is'], answer: 'Does', explain: 'He → Does he speak?' },
            ],
          },
          {
            scene: 'Investigando una empresa',
            lines: [['Journalist', 'What [[0]] WeLearn offer?'], ['Director', 'Language courses. Where [[1]] your students come from?']],
            blanks: [
              { options: ['do', 'does', 'is'], answer: 'does', explain: 'WeLearn → it → does it offer? → What does WeLearn offer?' },
              { options: ['do', 'does', 'are'], answer: 'do', explain: 'Your students → they → do they come? → Where do your students come from?' },
            ],
          },
          {
            scene: 'Planificando',
            lines: [['Sofia', 'How often [[0]] you practise English?'], ['Marco', 'Three times a week. When [[1]] your next class start?']],
            blanks: [
              { options: ['do', 'does', 'are'], answer: 'do', explain: 'You → do you practise? → How often do you practise?' },
              { options: ['do', 'does', 'is'], answer: 'does', explain: 'Your next class → it → does it start? → When does your next class start?' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa la entrevista eligiendo do o does.',
        type: 'guidedText',
        scene: 'Entrevista de diagnóstico en WeLearn',
        text: '[[0]] you speak any English already? [[1]] you study at home? How many hours [[2]] you practise per week? [[3]] your family speak English too? What [[4]] you do for work? [[5]] your job require English? Where [[6]] you use English most?',
        blanks: [
          { options: ['Do', 'Does'], answer: 'Do', explain: 'You → Do you speak?' },
          { options: ['Do', 'Does'], answer: 'Do', explain: 'You → Do you study?' },
          { options: ['do', 'does'], answer: 'do', explain: 'You → do you practise? → How many hours do you practise?' },
          { options: ['Do', 'Does'], answer: 'Does', explain: 'Your family → they but "your family" singular → Does (treated as unit).' },
          { options: ['do', 'does'], answer: 'do', explain: 'You → do you do? → What do you do?' },
          { options: ['Do', 'Does'], answer: 'Does', explain: 'Your job → it → Does your job require?' },
          { options: ['do', 'does'], answer: 'do', explain: 'You → do you use? → Where do you use?' },
        ],
      },
      {
        id: 'l4',
        title: 'Texto libre',
        tag: 'Sin opciones',
        intro: 'Escribe do o does sin ayuda para completar la encuesta.',
        type: 'freeText',
        scene: 'Encuesta de hábitos de estudio',
        text: '[[0]] you listen to music in English? [[1]] your teacher give you homework? What [[2]] you do after class? [[3]] your classmates practise outside school? How [[4]] the school evaluate progress?',
        blanks: [
          { answer: 'Do', accepted: ['do'], explain: 'You → Do you listen?' },
          { answer: 'Does', accepted: ['does'], explain: 'Your teacher → he/she → Does your teacher give?' },
          { answer: 'do', explain: 'You → do you do? → What do you do?' },
          { answer: 'Do', accepted: ['do'], explain: 'Your classmates → they → Do your classmates practise?' },
          { answer: 'does', explain: 'The school → it → does it evaluate? → How does the school evaluate?' },
        ],
      },
      {
        id: 'l5',
        title: 'Formando preguntas',
        tag: 'Producción',
        intro: 'Construye la pregunta correcta a partir de las palabras dadas.',
        type: 'write',
        items: [
          {
            scene: 'Pregunta Wh- con do',
            prompt: 'Form a question: Where / do / you / live?',
            answer: 'Where do you live?',
            accepted: ['where do you live'],
            explain: 'Where + do + you + live? Orden correcto.',
          },
          {
            scene: 'Pregunta Wh- con does',
            prompt: 'Form a question: What / does / she / study?',
            answer: 'What does she study?',
            accepted: ['what does she study'],
            explain: 'What + does + she + study? Verbo en forma base.',
          },
          {
            scene: 'Pregunta Yes/No',
            prompt: 'Form a question: Does / your brother / speak / English?',
            answer: 'Does your brother speak English?',
            accepted: ['does your brother speak english'],
            explain: 'Does + subject + verb (base)?',
          },
          {
            scene: 'Respuesta y repregunta',
            prompt: 'Ask and answer: Does Carlos live near school? Yes, he ___.',
            answer: 'Yes, he does.',
            accepted: ['yes he does', 'yes, he does.'],
            explain: 'Respuesta corta afirmativa: Yes, he does.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión de entrevista',
        tag: 'Reto final',
        intro: 'Haz preguntas reales para conocer a alguien en inglés.',
        type: 'write',
        items: [
          {
            scene: 'Preguntando por trabajo',
            prompt: 'Ask: What ___ (do/does) you do for work?',
            answer: 'What do you do for work?',
            accepted: ['what do you do for work', 'what do you do'],
            explain: 'What + do (you) + do? Forma base.',
          },
          {
            scene: 'Preguntando por el profesor',
            prompt: 'Ask about your teacher: Where ___ (do/does) he/she live?',
            answer: 'Where does he live?',
            accepted: ['where does he live', 'where does she live', 'where does your teacher live'],
            explain: 'He/she → does. Where does he/she live?',
          },
          {
            scene: 'Confirmando información',
            prompt: 'Confirm: ___ (Do/Does) your classmates study at home?',
            answer: 'Do your classmates study at home?',
            accepted: ['do your classmates study at home'],
            explain: 'Your classmates → they → Do they study?',
          },
        ],
      },
    ],
  },
}

export default topic
