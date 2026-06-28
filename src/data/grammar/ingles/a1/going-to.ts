import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'going-to',
  order: '21',
  color: '#0369a1',
  category: 'Tenses',
  level: 'A1',
  title: 'Going to en inglés A1',
  shortTitle: 'Going to (futuro)',
  metaTitle: 'Going to en inglés A1 | Planes y predicciones futuras',
  description:
    'Aprende a usar going to en inglés A1 para hablar de planes, intenciones y predicciones futuras. Domina las formas afirmativa, negativa e interrogativa con ejemplos del día a día.',
  lead: 'Going to es la forma más usada en A1 para hablar del futuro. Se usa para planes decididos (I\'m going to study tonight) y predicciones basadas en evidencia (Look at those clouds — it\'s going to rain!). Estructura: am/is/are + going to + verbo base.',
  outcomes: [
    'Usar going to para planes: I\'m going to take the IELTS in June.',
    'Usar going to para predicciones con evidencia: It\'s going to rain.',
    'Formar negativas (I\'m not going to) e interrogativas (Are you going to?).',
  ],
  guide: {
    goal: 'Expresar planes futuros e intenciones usando la estructura am/is/are + going to + verbo base.',
    model: 'I\'m going to study tonight. / She isn\'t going to come. / Are you going to take the exam?',
    formula: 'Subject + am/is/are + going to + verb (base)',
    decisions: [
      'Afirmativa: I am going to → I\'m going to. She is going to → She\'s going to.',
      'Negativa: I am not going to → I\'m not going to. He is not going to → He isn\'t going to.',
      'Interrogativa: Are you going to study? / Is she going to come?',
      'Planes con tiempo específico: I\'m going to take the exam in June.',
      'NUNCA: "I going to study" — siempre necesita am/is/are: I AM going to study.',
    ],
    table: [
      ['Forma', 'Estructura', 'Ejemplo A1'],
      ['Afirmativa', 'am/is/are + going to + verb', 'I\'m going to study. / She\'s going to work.'],
      ['Negativa', 'am/is/are + not + going to + verb', 'I\'m not going to miss class. / He isn\'t going to come.'],
      ['Interrogativa', 'Am/Is/Are + subject + going to + verb?', 'Are you going to take the IELTS?'],
    ],
    mistakes: [
      '"I going to study" ❌ → I\'m going to study ✓ — no se puede omitir am/is/are.',
      '"She\'s going to studies" ❌ → She\'s going to study ✓ — verbo en forma base después de to.',
      '"I am go to study" ❌ → I\'m going to study ✓ — going to, no "go to".',
    ],
  },
  seo: [
    {
      heading: 'Qué es going to y cuándo usarlo',
      paragraphs: [
        'Going to es la estructura más frecuente para hablar del futuro en inglés A1. Se usa para planes e intenciones ya decididas (I\'m going to take an English course next month) y para predicciones basadas en evidencia visible (Look at the clouds — it\'s going to rain). Es más concreto que will, que expresa decisiones espontáneas.',
        'La estructura es: sujeto + verbo to be (am/is/are) + going to + verbo en forma base. Las contracciones son muy naturales en conversación: I\'m going to, she\'s going to, they\'re going to.',
      ],
    },
    {
      heading: 'Going to: afirmativa, negativa e interrogativa',
      paragraphs: [
        'Afirmativa: I\'m going to study. / She\'s going to travel. / We\'re going to practice speaking. Negativa: I\'m not going to miss class. / He isn\'t going to come. / They aren\'t going to take the exam. Interrogativa: Are you going to study? / Is she going to come? / What are you going to do?',
        'El error más común del hispanohablante es omitir el verbo to be: "I going to study" en lugar de "I\'m going to study". El auxiliar (am/is/are) es obligatorio — sin él la oración es incorrecta.',
      ],
    },
    {
      heading: 'Going to en contexto: planes para el futuro en inglés',
      paragraphs: [
        'Going to es ideal para hablar de metas de aprendizaje: I\'m going to take the IELTS in June. / I\'m going to practice speaking every day. / She\'s going to study English in Canada. Estas frases muestran planes concretos con cierta determinación.',
        'También se usa para describir lo que ves que va a pasar: Look! That student is going to answer correctly! / He\'s going to pass the exam — he\'s very prepared. Esta función de predicción con evidencia es muy útil en conversación.',
      ],
    },
  ],
  visual: {
    mode: 'table',
    teacherLens: 'El estudiante aprende a expresar planes futuros usando la estructura going to con contracciones naturales.',
    graphicPrompt: 'Diagrama de going to: línea temporal con planes marcados: "Tonight: I\'m going to study."',
    scene: [
      ['Planes personales', 'I\'m going to take the IELTS. / She\'s going to study Korean.'],
      ['Planes negativos', 'I\'m not going to miss class. / He isn\'t going to be late.'],
      ['Preguntas de planes', 'Are you going to study tonight? / What are you going to do?'],
      ['Predicciones', 'Look at those clouds — it\'s going to rain!'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['am/is/are obligatorio', 'verbo base después de going to', 'contracciones', 'planes vs predicciones'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento de going to',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de going to.',
        type: 'choice',
        items: [
          {
            scene: 'Plan para esta noche',
            lines: [['Carlos', 'I ___ study English for two hours tonight.']],
            options: ['\'m going to', 'going to', '\'s going to', 'am go to'],
            answer: '\'m going to',
            explain: 'I\'m going to study — I am (\'m) + going to + verb base.',
          },
          {
            scene: 'Plan de la profesora',
            lines: [['Student', 'Zhanna ___ explain the grammar again.']],
            options: ['\'s going to', '\'m going to', 'going to', 'are going to'],
            answer: '\'s going to',
            explain: 'She\'s going to explain — she is (\'s) + going to.',
          },
          {
            scene: 'Plan negativo',
            lines: [['Ana', 'I ___ miss the exam — I\'m ready.']],
            options: ['\'m not going to', '\'m going to', 'not going to', '\'s not going to'],
            answer: '\'m not going to',
            explain: 'I\'m not going to miss — negativa de I am going to.',
          },
          {
            scene: 'Pregunta sobre planes',
            lines: [['David', '___ you going to take the IELTS this year?']],
            options: ['Are', 'Is', 'Am', 'Do'],
            answer: 'Are',
            explain: 'Are you going to? — pregunta con you.',
          },
          {
            scene: 'Plan del grupo',
            lines: [['Teacher', 'We ___ practice speaking every class this month.']],
            options: ['\'re going to', '\'s going to', '\'m going to', 'going to'],
            answer: '\'re going to',
            explain: 'We\'re going to practice — we are (\'re) + going to.',
          },
          {
            scene: 'Verbo correcto',
            lines: [['Carlos', 'She\'s going to ___ the exam next month.']],
            options: ['take', 'takes', 'taking', 'took'],
            answer: 'take',
            explain: 'going to + verbo base (sin to, sin -s, sin -ing): take.',
          },
          {
            scene: 'Plan negativo de él',
            lines: [['Lina', 'He ___ come to class tomorrow — he\'s sick.']],
            options: ['isn\'t going to', '\'m not going to', 'aren\'t going to', 'not going to'],
            answer: 'isn\'t going to',
            explain: 'He isn\'t going to come — negativa 3.ª persona.',
          },
          {
            scene: 'Predicción con evidencia',
            lines: [['Sofia', 'Look at Carlos! He ___ pass the test — he knows everything!']],
            options: ['\'s going to', '\'m going to', 'going to', 'are going to'],
            answer: '\'s going to',
            explain: 'He\'s going to pass — predicción con evidencia visible.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Estructura completa',
        tag: '2 espacios',
        intro: 'Elige el auxiliar y completa el plan futuro.',
        type: 'dual',
        items: [
          {
            scene: 'Plan de estudio',
            lines: [['Carlos', 'I [[0]] going to [[1]] every day this week.']],
            blanks: [
              { options: ['\'m', '\'s', '\'re'], answer: '\'m', explain: 'I\'m (= I am) + going to.' },
              { options: ['practice', 'practices', 'practicing'], answer: 'practice', explain: 'going to + verbo base: practice.' },
            ],
          },
          {
            scene: 'Plan de viaje',
            lines: [['Ana', 'She [[0]] going to [[1]] Canada next year.']],
            blanks: [
              { options: ['\'s', '\'m', '\'re'], answer: '\'s', explain: 'She\'s (= she is) + going to.' },
              { options: ['visit', 'visits', 'visiting'], answer: 'visit', explain: 'going to + verbo base: visit.' },
            ],
          },
          {
            scene: 'Pregunta de planes',
            lines: [['David', '[[0]] you going to [[1]] the IELTS?']],
            blanks: [
              { options: ['Are', 'Is', 'Am'], answer: 'Are', explain: 'Are you going to? — pregunta con you.' },
              { options: ['take', 'takes', 'taking'], answer: 'take', explain: 'going to + verbo base: take.' },
            ],
          },
          {
            scene: 'Plan negativo del grupo',
            lines: [['Teacher', 'We [[0]] going to [[1]] class next Monday.']],
            blanks: [
              { options: ['aren\'t', 'isn\'t', '\'m not'], answer: 'aren\'t', explain: 'We aren\'t going to — negativa de we are.' },
              { options: ['have', 'has', 'having'], answer: 'have', explain: 'going to + verbo base: have.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Planes de Ana para el mes',
        tag: 'Opciones',
        intro: 'Elige la forma correcta de going to para completar los planes de Ana.',
        type: 'guidedText',
        scene: 'Planes de estudio de Ana para mejorar su inglés este mes',
        text: 'Ana [[0]] going to study English every morning. She [[1]] going to miss any class this month. [[2]] she going to take the IELTS? Yes! She [[3]] going to register next week. Her friend Carlos [[4]] going to study with her on weekends. They [[5]] going to practice speaking together.',
        blanks: [
          { options: ['\'s', '\'m', '\'re'], answer: '\'s', explain: 'She\'s (= she is) + going to.' },
          { options: ['isn\'t', 'aren\'t', '\'s'], answer: 'isn\'t', explain: 'She isn\'t going to miss — negativa 3.ª persona.' },
          { options: ['Is', 'Are', 'Am'], answer: 'Is', explain: 'Is she going to? — pregunta 3.ª persona.' },
          { options: ['\'s', '\'m', 'isn\'t'], answer: '\'s', explain: 'She\'s going to register — afirmativa.' },
          { options: ['\'s', '\'re', '\'m'], answer: '\'s', explain: 'Carlos\'s = he\'s going to — 3.ª persona.' },
          { options: ['\'re', '\'s', '\'m'], answer: '\'re', explain: 'They\'re (= they are) going to practice.' },
        ],
      },
      {
        id: 'l4',
        title: 'Mis planes de inglés',
        tag: 'Sin opciones',
        intro: 'Completa los planes futuros con la forma correcta de going to.',
        type: 'freeText',
        scene: 'Formulario de metas de estudio en WeLearn',
        text: 'I ___ study English every day. (afirmativa) She ___ take the IELTS in June. (afirmativa) We ___ miss any class. (negativa) ___ you going to practice speaking? (pregunta) He ___ arrive late tomorrow. (negativa) They ___ join the advanced group. (afirmativa)',
        blanks: [
          { answer: '\'m going to', accepted: ["'m going to", "am going to", "I'm going to", "I am going to"], explain: 'I\'m going to study — afirmativa 1.ª persona.' },
          { answer: '\'s going to', accepted: ["'s going to", "is going to", "She's going to", "She is going to"], explain: 'She\'s going to take — 3.ª persona afirmativa.' },
          { answer: 'aren\'t going to', accepted: ["aren't going to", "are not going to", "We aren't going to"], explain: 'We aren\'t going to miss — negativa de we are.' },
          { answer: 'Are', accepted: ['Are', 'are'], explain: 'Are you going to? — pregunta con you.' },
          { answer: 'isn\'t going to', accepted: ["isn't going to", "is not going to", "He isn't going to"], explain: 'He isn\'t going to arrive — negativa 3.ª persona.' },
          { answer: '\'re going to', accepted: ["'re going to", "are going to", "They're going to", "They are going to"], explain: 'They\'re going to join — 3.ª persona plural.' },
        ],
      },
      {
        id: 'l5',
        title: 'Escribiendo mis planes',
        tag: 'Producción',
        intro: 'Escribe oraciones completas con going to.',
        type: 'write',
        items: [
          {
            scene: 'Plan para esta semana',
            prompt: 'Escribe: "Voy a practicar inglés esta semana." (I / going to / practice English / this week)',
            answer: 'I\'m going to practice English this week.',
            accepted: ["i'm going to practice english this week", "i am going to practice english this week"],
            explain: 'I\'m going to practice English this week. — plan futuro con going to.',
          },
          {
            scene: 'Plan negativo',
            prompt: 'Escribe: "No voy a faltar a clase." (I / not / going to / miss class)',
            answer: 'I\'m not going to miss class.',
            accepted: ["i'm not going to miss class", "i am not going to miss class"],
            explain: 'I\'m not going to miss class. — negativa con going to.',
          },
          {
            scene: 'Plan de otro',
            prompt: 'Escribe: "Ella va a tomar el IELTS." (She / going to / take the IELTS)',
            answer: 'She\'s going to take the IELTS.',
            accepted: ["she's going to take the ielts", "she is going to take the ielts"],
            explain: 'She\'s going to take the IELTS. — 3.ª persona.',
          },
          {
            scene: 'Pregunta sobre planes',
            prompt: 'Escribe: "¿Vas a estudiar esta noche?" (Are / you / going to / study / tonight?)',
            answer: 'Are you going to study tonight?',
            accepted: ['are you going to study tonight', 'are you going to study tonight?'],
            explain: 'Are you going to study tonight? — pregunta con Are you going to.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Mis metas de inglés',
        tag: 'Reto final',
        intro: 'Escribe sobre tus planes reales para mejorar tu inglés.',
        type: 'write',
        items: [
          {
            scene: 'Tus metas de estudio',
            prompt: 'Write 2 real plans for your English learning: I\'m going to ___ and I\'m going to ___.',
            answer: 'I\'m going to practice speaking every day. I\'m going to take the IELTS.',
            accepted: ["i'm going to", "i am going to"],
            explain: 'I\'m going to + verb (base): I\'m going to study, practice, take, read, watch...',
          },
          {
            scene: 'Un plan negativo',
            prompt: 'Write one thing you are NOT going to do: I\'m not going to ___.',
            answer: 'I\'m not going to miss class.',
            accepted: ["i'm not going to", "i am not going to"],
            explain: 'I\'m not going to + verb: ...miss, forget, skip, be late.',
          },
          {
            scene: 'Pregunta a un compañero',
            prompt: 'Ask your classmate about their plans: Are you going to ___?',
            answer: 'Are you going to study tonight?',
            accepted: ['are you going to'],
            explain: 'Are you going to + verb? Great for conversations about future plans.',
          },
        ],
      },
    ],
  },
}

export default topic
