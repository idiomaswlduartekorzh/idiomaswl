import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verb-to-be',
  order: '02',
  color: '#0066cc',
  category: 'Foundations',
  level: 'A1',
  title: 'Verb to be en inglés A1',
  shortTitle: 'Verb to be',
  metaTitle: 'Verb to be en inglés A1 | am, is, are — guía para hispanohablantes',
  description: 'Aprende a usar am, is y are con explicación orientada al hispanohablante, tabla completa de formas afirmativas, negativas e interrogativas, y práctica progresiva de 6 niveles.',
  lead: 'El verbo to be es la primera estructura que todo estudiante de inglés necesita dominar. No existe una sola traducción fija: a veces equivale a ser, a veces a estar. La clave está en saber cuándo usar am, is o are, y por qué en inglés nunca puedes omitir el sujeto.',
  outcomes: [
    'Conjugar to be correctamente con los 7 sujetos en forma afirmativa.',
    'Construir preguntas y negaciones básicas con am/is/are.',
    'Evitar el error de traducir ser/estar de forma literal.',
  ],
  guide: {
    goal: 'Elegir am, is o are según el sujeto sin dudar.',
    model: 'En inglés el sujeto y el verbo siempre van juntos. No se puede decir Am tired porque no se sabe quién. Siempre: I am tired, she is busy, they are ready.',
    formula: 'Subject pronoun + am / is / are + complement',
    decisions: [
      'I → am  (solo I)',
      'You / We / They → are',
      'He / She / It → is',
      'Negativo: am not / is not (isn\'t) / are not (aren\'t)',
      'Pregunta: Am I? / Is he/she/it? / Are you/we/they?',
    ],
    table: [
      ['I', 'am', 'I am a student.'],
      ['you', 'are', 'You are in class.'],
      ['he / she / it', 'is', 'She is my teacher.'],
      ['we / they', 'are', 'They are from Mexico.'],
    ],
    mistakes: [
      'Usar "is" para I: "I is tired." → I am tired.',
      'Omitir el sujeto: "Is my brother." → He is my brother.',
      'Usar ser vs estar en inglés: to be cubre los dos en A1.',
    ],
  },
  seo: [
    {
      heading: 'Qué es el verbo to be y por qué es el primero que debes aprender',
      paragraphs: [
        'To be es el verbo más importante del inglés. En niveles A1 lo usamos para identificar personas y objetos (I am a teacher), describir estados (She is tired), hablar de origen (We are from Colombia) y ubicar cosas en el espacio (The book is on the table). Todas estas funciones en español se dividen entre ser y estar, pero en inglés A1 to be las cubre todas.',
        'Sus formas en presente son tres: am (solo para I), is (para he, she, it) y are (para you, we, they). Esta es la única conjugación que necesitas memorizar en este nivel. Una vez que la tienes automática, puedes construir cientos de frases útiles desde el primer día.',
      ],
    },
    {
      heading: 'La trampa del hispanohablante: ser y estar en una sola palabra',
      paragraphs: [
        'En español usamos ser para identidad y origen (Soy profesor, Soy de Colombia) y estar para estados y ubicación (Estoy cansado, El libro está en la mesa). Para un estudiante colombiano o latinoamericano, esta distinción está tan arraigada que parece natural. En inglés, to be reemplaza a los dos: I am a teacher (soy), I am tired (estoy), The book is on the table (está).',
        'El error más común no es equivocarse entre ser y estar — es olvidar que en inglés el sujeto siempre debe aparecer. En español decimos Soy estudiante y el verbo ya incluye yo. En inglés la frase sin sujeto queda incompleta: Am a student no funciona. Debe ser I am a student.',
      ],
    },
    {
      heading: 'Afirmativo, negativo e interrogativo: las tres formas esenciales',
      paragraphs: [
        'Afirmativo: sujeto + am/is/are + complemento. I am ready. He is the manager. We are classmates. En conversación informal se usan contracciones: I\'m, you\'re, he\'s, she\'s, it\'s, we\'re, they\'re. Estas contracciones suenan más naturales en el habla cotidiana.',
        'Negativo: añade not. I am not late. She is not here. They are not ready. Las formas cortas son isn\'t (is not) y aren\'t (are not). No hay amn\'t en inglés estándar; se usa I\'m not. Interrogativo: invierte el orden entre sujeto y verbo. Is she the teacher? Are you ready? Am I on the list? La respuesta corta sigue el mismo orden: Yes, she is. / No, she isn\'t.',
      ],
      table: [
        ['Forma', 'Ejemplo con I', 'Ejemplo con she', 'Ejemplo con they'],
        ['Afirmativo', 'I am ready.', 'She is ready.', 'They are ready.'],
        ['Negativo', 'I am not ready.', 'She isn\'t ready.', 'They aren\'t ready.'],
        ['Pregunta', 'Am I on time?', 'Is she here?', 'Are they students?'],
      ],
    },
    {
      heading: 'Contextos reales: cuándo usas to be en una conversación A1',
      paragraphs: [
        'En una presentación personal: Hi, I\'m Carlos. I\'m from Barranquilla. I\'m a student at WeLearn. My teacher is David. He\'s very good. We\'re in the A1 group. Todas estas frases usan to be.',
        'Describiendo una habitación: The board is white. The chairs are blue. My notebook is on the desk. It\'s new. También para emociones y estados: I\'m nervous but excited. She\'s ready for the exam. They\'re tired after class.',
      ],
    },
    {
      heading: 'Errores frecuentes y sus correcciones',
      paragraphs: [
        'Error 1: Is my friend → He is my friend / She is my friend. Siempre necesitas el sujeto. Error 2: I is tired → I am tired. Con I solo funciona am. Error 3: She are from Peru → She is from Peru. She/he/it siempre van con is. Error 4: The room it is clean → The room is clean. No se duplica el sujeto con un pronombre.',
        'Una forma rápida de verificar: antes de hablar, identifica el sujeto (¿quién o qué?), elige el pronombre (I / you / he / she / it / we / they) y luego el verbo correspondiente (am / are / is). Con práctica este proceso se vuelve automático en segundos.',
      ],
      examples: [
        ['Incorrecto', 'Is my sister.', 'Correcto', 'She is my sister.'],
        ['Incorrecto', 'I is from Cali.', 'Correcto', 'I am from Cali.'],
        ['Incorrecto', 'They is students.', 'Correcto', 'They are students.'],
      ],
    },
  ],
  visual: {
    mode: 'conjugation-map',
    teacherLens: 'El estudiante conecta el sujeto con la forma correcta de to be antes de completar la frase.',
    graphicPrompt: 'Elige el sujeto, selecciona am/is/are y completa el contexto.',
    scene: [['I', 'am'], ['she / he / it', 'is'], ['you / we / they', 'are']],
    learnerModes: ['visual: tabla de conjugación', 'analítico: grupo del sujeto', 'oral: autodiagnóstico'],
    practiceVerbs: ['Identifica', 'Conjuga', 'Completa', 'Construye', 'Corrige', 'Describe'],
    reviewFocus: ['sujeto correcto', 'forma am/is/are', 'negativo', 'pregunta'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de to be para completar cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Primer día de clase',
            lines: [['Carlos', 'Hi! I ___ Carlos. Nice to meet you.']],
            options: ['am', 'is', 'are', 'be'],
            answer: 'am',
            explain: 'Con I siempre usamos am.',
          },
          {
            scene: 'Presentando a la profesora',
            lines: [['Student', 'This is Ms. Rivera. She ___ our English teacher.']],
            options: ['am', 'is', 'are', 'be'],
            answer: 'is',
            explain: 'She es tercera persona singular: she is.',
          },
          {
            scene: 'En el aula',
            lines: [['Teacher', 'Carlos and Ana, ___ you ready to start?']],
            options: ['am', 'is', 'are', 'be'],
            answer: 'are',
            explain: 'Para you (una o varias personas) usamos are.',
          },
          {
            scene: 'Describiendo la clase',
            lines: [['Student', 'This class ___ really interesting.']],
            options: ['am', 'is', 'are', 'be'],
            answer: 'is',
            explain: 'This class es singular (it): is.',
          },
          {
            scene: 'Hablando de dos compañeros',
            lines: [['Ana', 'Where are Pedro and Luis?'], ['Teacher', 'They ___ in the computer lab.']],
            options: ['am', 'is', 'are', 'be'],
            answer: 'are',
            explain: 'They (dos personas) → are.',
          },
          {
            scene: 'Mensaje de voz',
            lines: [['David', 'Hi Zhanna! We ___ at the coffee shop. Are you coming?']],
            options: ['am', 'is', 'are', 'be'],
            answer: 'are',
            explain: 'We (David + otra persona) → are.',
          },
          {
            scene: 'Revisando el horario',
            lines: [['Student', 'The exam ___ on Friday. I ___ nervous.']],
            options: ['is / am', 'am / is', 'are / am', 'is / are'],
            answer: 'is / am',
            explain: 'The exam (it) → is; I → am.',
          },
          {
            scene: 'Negando tardanza',
            lines: [['Teacher', 'Are you late?'], ['Carlos', 'No, I ___ not late. The clock ___ wrong.']],
            options: ['am / is', 'is / am', 'are / is', 'am / are'],
            answer: 'am / is',
            explain: 'I am not late; The clock (it) is wrong.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos formas en un diálogo',
        tag: '2 espacios',
        intro: 'Completa las dos formas de to be dentro de la misma situación.',
        type: 'dual',
        items: [
          {
            scene: 'Llegando al aeropuerto',
            lines: [['Officer', 'Is this your passport?'], ['Traveler', 'Yes, it [[0]] my passport. I [[1]] from Colombia.']],
            blanks: [
              { options: ['am', 'is', 'are'], answer: 'is', explain: 'It (passport) → is.' },
              { options: ['am', 'is', 'are'], answer: 'am', explain: 'I → am.' },
            ],
          },
          {
            scene: 'En la recepción de la academia',
            lines: [['Receptionist', 'Welcome! You [[0]] in group A1. The classroom [[1]] on the second floor.']],
            blanks: [
              { options: ['am', 'is', 'are'], answer: 'are', explain: 'You → are.' },
              { options: ['am', 'is', 'are'], answer: 'is', explain: 'The classroom (it) → is.' },
            ],
          },
          {
            scene: 'Presentando a dos amigos',
            lines: [['Ana', 'David, this [[0]] my friend Marco. He and I [[1]] in the same class.']],
            blanks: [
              { options: ['am', 'is', 'are'], answer: 'is', explain: 'This (Marco, third person) → is.' },
              { options: ['am', 'is', 'are'], answer: 'are', explain: 'He and I = we → are.' },
            ],
          },
          {
            scene: 'Revisando el equipo',
            lines: [['Coach', 'Luis, you [[0]] our best player. The other players [[1]] ready too.']],
            blanks: [
              { options: ['am', 'is', 'are'], answer: 'are', explain: 'You → are.' },
              { options: ['am', 'is', 'are'], answer: 'are', explain: 'The other players (they) → are.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa la presentación personal eligiendo la forma correcta de to be.',
        type: 'guidedText',
        scene: 'Presentación en redes sociales',
        text: 'Hi! My name [[0]] Sofia. I [[1]] twenty years old. My hometown [[2]] Medellín, but I [[3]] in Bogotá now. My parents [[4]] teachers. My brother [[5]] a university student. He and I [[6]] big fans of English music.',
        blanks: [
          { options: ['am', 'is', 'are'], answer: 'is', explain: 'My name (it) → is.' },
          { options: ['am', 'is', 'are'], answer: 'am', explain: 'I → am.' },
          { options: ['am', 'is', 'are'], answer: 'is', explain: 'My hometown (it) → is.' },
          { options: ['am', 'is', 'are'], answer: 'am', explain: 'I → am.' },
          { options: ['am', 'is', 'are'], answer: 'are', explain: 'My parents (they) → are.' },
          { options: ['am', 'is', 'are'], answer: 'is', explain: 'My brother (he) → is.' },
          { options: ['am', 'is', 'are'], answer: 'are', explain: 'He and I = we → are.' },
        ],
      },
      {
        id: 'l4',
        title: 'Texto libre',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta de to be sin banco de ayuda.',
        type: 'freeText',
        scene: 'Correo de presentación al profesor',
        text: 'Dear teacher, my name [[0]] Andrés. I [[1]] twenty-two years old and I [[2]] from Cali. My English [[3]] basic but I want to improve. My classmates [[4]] from different cities too.',
        blanks: [
          { answer: 'is', explain: 'My name (it) → is.' },
          { answer: 'am', explain: 'I → am.' },
          { answer: 'am', explain: 'I → am.' },
          { answer: 'is', explain: 'My English (it) → is.' },
          { answer: 'are', explain: 'My classmates (they) → are.' },
        ],
      },
      {
        id: 'l5',
        title: 'Descripción completa',
        tag: 'Producción',
        intro: 'Escribe la frase completa usando to be en la forma correcta.',
        type: 'write',
        items: [
          {
            scene: 'Autodescripción',
            prompt: 'Escribe: I / a student / at WeLearn.',
            answer: 'I am a student at WeLearn.',
            accepted: ['i am a student at welearn', 'I\'m a student at WeLearn', 'i\'m a student at welearn'],
            explain: 'I + am + complement.',
          },
          {
            scene: 'Describiendo al profesor',
            prompt: 'Escribe: He / from Colombia.',
            answer: 'He is from Colombia.',
            accepted: ['he is from colombia', 'He\'s from Colombia', 'he\'s from colombia'],
            explain: 'He + is + complement.',
          },
          {
            scene: 'Hablando del grupo',
            prompt: 'Escribe: We / ready for the exam.',
            answer: 'We are ready for the exam.',
            accepted: ['we are ready for the exam', 'We\'re ready for the exam', 'we\'re ready for the exam'],
            explain: 'We + are + complement.',
          },
          {
            scene: 'Describiendo un objeto',
            prompt: 'Escribe: The classroom / big and bright.',
            answer: 'The classroom is big and bright.',
            accepted: ['the classroom is big and bright'],
            explain: 'The classroom (it) + is + complement.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión de conversación',
        tag: 'Reto final',
        intro: 'Responde de forma natural usando to be afirmativo, negativo o interrogativo.',
        type: 'write',
        items: [
          {
            scene: 'Negando un estado',
            prompt: 'Your teacher asks: Are you tired? Answer honestly: No, I ___ not tired. I ___ ready.',
            answer: 'No, I am not tired. I am ready.',
            accepted: ['no i am not tired i am ready', 'no i\'m not tired i\'m ready', 'no, i am not tired. i am ready.', 'no, i\'m not tired. i\'m ready.'],
            explain: 'I am not (negativo) + I am (afirmativo).',
          },
          {
            scene: 'Preguntando por un compañero',
            prompt: 'Ask your teacher: ___ Pedro in class today?',
            answer: 'Is Pedro in class today?',
            accepted: ['is pedro in class today', 'is pedro in class today?'],
            explain: 'Pedro (he) → Is he...? → Is Pedro...?',
          },
          {
            scene: 'Describiendo tu ciudad',
            prompt: 'Escribe: Medellín / beautiful. The people / friendly.',
            answer: 'Medellín is beautiful. The people are friendly.',
            accepted: ['medellín is beautiful the people are friendly', 'medellin is beautiful the people are friendly', 'medellín is beautiful. the people are friendly.'],
            explain: 'Medellín (it) → is; The people (they) → are.',
          },
        ],
      },
    ],
  },
}

export default topic
