import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'questions',
  order: '08',
  color: '#1a2ecc',
  category: 'Syntaxe',
  level: 'A1',
  title: 'Las Preguntas en Francés A1',
  shortTitle: 'Questions',
  metaTitle: 'Cómo hacer preguntas en francés A1 — entonación, est-ce que, inversión',
  description:
    'El francés tiene tres formas de hacer preguntas: por entonación (la más oral), con est-ce que (la más versátil) y por inversión sujeto-verbo (la más formal). En A1 dominarás las dos primeras y conocerás las palabras interrogativas esenciales.',
  lead: 'En francés hay tres formas de preguntar. La más fácil: solo sube la entonación. La más común: añade "est-ce que". La más formal: invierte el verbo.',
  outcomes: [
    'Formula preguntas con las tres estructuras básicas',
    'Usa las palabras interrogativas (qui, où, quand, comment, pourquoi, combien)',
    'Distingue el registro formal del informal en preguntas',
  ],

  guide: {
    goal: 'Formular preguntas básicas en francés usando las tres estructuras principales.',
    model: 'Tu parles français ? / Est-ce que tu parles français ? / Parles-tu français ?',
    formula: '[Interrogativa +] (est-ce que +) sujeto + verbo | verbo + sujeto (inversión)',
    decisions: [
      'Entonación (oral): oración afirmativa + ¿?: "Tu viens ?" — solo sube el tono al final',
      'Est-ce que (universal): est-ce que + orden normal → "Est-ce que tu viens ?"',
      'Est-ce que → est-ce qu\' ante vocal: "Est-ce qu\'il vient ?"',
      'Inversión (formal): verbo-sujeto unidos por guion: "Viens-tu ?" — "Parlez-vous ?"',
      'Palabras interrogativas: qui (quién), que/qu\'est-ce que (qué), où (dónde), quand (cuándo), comment (cómo), pourquoi (por qué), combien (cuánto)',
      'Con palabra interrogativa: interrogativa + est-ce que + sujeto + verbo: "Où est-ce que tu habites ?"',
    ],
    table: [
      ['Forma', 'Ejemplo', 'Registro'],
      ['Entonación', 'Tu parles français ?', 'Oral/informal'],
      ['Est-ce que', 'Est-ce que tu parles français ?', 'Neutro/universal'],
      ['Inversión', 'Parles-tu français ?', 'Formal/escrito'],
      ['Qui + est-ce que', 'Qui est-ce que tu appelles ?', 'Neutro'],
      ['Où + est-ce que', 'Où est-ce que tu habites ?', 'Neutro'],
    ],
    mistakes: [
      '"Est-ce que tu parles ?" ✓ pero "Est-ce qu\'tu parles ?" ❌ — "tu" no empieza por vocal en este contexto estrictamente, pero est-ce qu\' se usa solo ante vocal o h muda real',
      'Inversión con il/elle/on ante vocal: "il parle" → "parle-t-il ?" (se añade -t-): "Parle-t-il français ?"',
      '"Pourquoi tu es fatigué ?" ✓ (oral) vs "Pourquoi es-tu fatigué ?" ✓ (formal) — ambas correctas según registro',
    ],
  },

  seo: [
    {
      heading: 'Las tres formas de preguntar en francés',
      paragraphs: [
        'A diferencia del español, donde solo se invierte el orden o se añade una entonación, el francés tiene tres sistemas distintos de pregunta. Conocerlos todos te permitirá entender francés en cualquier contexto: conversación informal, textos formales o documentos escritos.',
        'La más fácil de aprender es la pregunta por entonación: tomas una oración afirmativa normal y solo subes la voz al final. "Tu travailles ici ?" Es la forma más usada en el habla cotidiana.',
      ],
    },
    {
      heading: 'Est-ce que: la forma más versátil',
      paragraphs: [
        '"Est-ce que" es literalmente "¿es que...?" y se coloca al principio de la pregunta sin cambiar el orden de la oración. "Est-ce que vous parlez espagnol ?" = "¿Hablan español?" Es la forma más recomendada para principiantes porque nunca falla y es correcta en todos los contextos.',
        'Ante vocal o h muda, "que" pierde la "e": "Est-ce qu\'il habite ici ?" / "Est-ce qu\'elle aime le café ?" Esta elisión es obligatoria en la escritura.',
      ],
    },
    {
      heading: 'Las palabras interrogativas esenciales',
      paragraphs: [
        'Las palabras interrogativas más importantes en A1: qui (quién), que / qu\'est-ce que (qué), où (dónde), quand (cuándo), comment (cómo), pourquoi (por qué), combien (cuánto / cuántos).',
        'Con estas palabras, la estructura más común en A1 es: interrogativa + est-ce que + sujeto + verbo. "Où est-ce que tu habites ?" / "Quand est-ce qu\'elle arrive ?" / "Pourquoi est-ce que vous étudiez le français ?"',
      ],
    },
    {
      heading: 'La inversión: preguntas formales',
      paragraphs: [
        'La inversión sujeto-verbo es la forma más formal y aparece mucho en textos escritos, cartas y el francés cuidado. El verbo va delante, el sujeto detrás, unidos por un guion: "Parlez-vous français ?" / "Habitez-vous à Paris ?"',
        'Ojo con il/elle/on antes de vocal: cuando el verbo termina en vocal, se añade una -t- para facilitar la pronunciación: "A-t-il une voiture ?" / "Parle-t-elle anglais ?" En A1 conviene reconocerla, pero no es prioritario producirla.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Tres formas de preguntar en francés: entonación, est-ce que, inversión.',
    graphicPrompt: 'Tabla comparativa de las tres formas de preguntas con ejemplos.',
    scene: [
      ['Entonación', 'Tu parles français ? (solo sube el tono)'],
      ['Est-ce que', 'Est-ce que tu parles français ?'],
      ['Est-ce qu\'', 'Est-ce qu\'il habite ici ?'],
      ['Inversión', 'Parles-tu français ?'],
      ['Où est-ce que', 'Où est-ce que vous habitez ?'],
      ['Quand est-ce que', 'Quand est-ce qu\'elle arrive ?'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['est-ce que / est-ce qu\'', 'palabras interrogativas', 'inversión formal'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la pregunta correctamente formulada para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Gael quiere saber si Carlos habla inglés',
            lines: [['Gael', '___-tu anglais ?']],
            options: ['Parles', 'Parle', 'Parlons', 'Parlent'],
            answer: 'Parles',
            explain: 'Inversión con "tu": "Parles-tu anglais ?" Recuerda el guion.',
          },
          {
            scene: 'Nora pregunta dónde vive Ana',
            lines: [['Nora', '___ est-ce que tu habites ?']],
            options: ['Où', 'Quand', 'Comment', 'Pourquoi'],
            answer: 'Où',
            explain: '"Où" = dónde. "Où est-ce que tu habites ?" pregunta la ubicación.',
          },
          {
            scene: 'Marco pregunta cuándo llega Lina',
            lines: [['Marco', '___ est-ce qu\'elle arrive ?']],
            options: ['Quand', 'Où', 'Qui', 'Combien'],
            answer: 'Quand',
            explain: '"Quand" = cuándo. "Quand est-ce qu\'elle arrive ?"',
          },
          {
            scene: 'Sofia pregunta informalmente a Carlos',
            lines: [['Sofia', 'Tu ___ le français ?']],
            options: ['parles', 'parle', 'parlez', 'parlons'],
            answer: 'parles',
            explain: 'Pregunta por entonación: orden normal + sube el tono. "Tu parles le français ?"',
          },
          {
            scene: 'Gael pregunta cómo se llama alguien',
            lines: [['Gael', '___ est-ce que vous vous appelez ?']],
            options: ['Comment', 'Où', 'Quand', 'Combien'],
            answer: 'Comment',
            explain: '"Comment" = cómo. "Comment est-ce que vous vous appelez ?"',
          },
          {
            scene: 'Ana pregunta cuántos estudiantes hay',
            lines: [['Ana', '___ d\'étudiants est-ce qu\'il y a ?']],
            options: ['Combien', 'Qui', 'Où', 'Quand'],
            answer: 'Combien',
            explain: '"Combien" = cuántos. "Combien d\'étudiants est-ce qu\'il y a ?"',
          },
          {
            scene: 'Lina en una situación formal',
            lines: [['Lina', 'Parlez-___ espagnol, Monsieur ?']],
            options: ['vous', 'tu', 'ils', 'nous'],
            answer: 'vous',
            explain: 'Inversión formal: "Parlez-vous espagnol ?" — el sujeto va después del verbo unido por guion.',
          },
          {
            scene: 'Marco pregunta por qué estudia francés Sofia',
            lines: [['Marco', '___ est-ce que tu étudies le français ?']],
            options: ['Pourquoi', 'Comment', 'Où', 'Qui'],
            answer: 'Pourquoi',
            explain: '"Pourquoi" = por qué. "Pourquoi est-ce que tu étudies le français ?"',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos decisiones',
        tag: '2 espacios',
        intro: 'Completa la palabra interrogativa y la estructura de la pregunta.',
        type: 'dual',
        items: [
          {
            scene: 'Carlos pregunta la ubicación',
            lines: [['Carlos', '[[0]] est-ce que vous [[1]] ? (habiter)']],
            blanks: [
              { options: ['Où', 'Quand', 'Comment', 'Pourquoi'], answer: 'Où', explain: '"Où" pregunta por el lugar.' },
              { options: ['habitez', 'habites', 'habitons', 'habite'], answer: 'habitez', explain: '"Vous" → "habitez" (terminación -ez).' },
            ],
          },
          {
            scene: 'Gael quiere saber el nombre',
            lines: [['Gael', '[[0]] est-ce qu\'il [[1]] ? (s\'appeler → s\'appelle)']],
            blanks: [
              { options: ['Comment', 'Où', 'Quand', 'Qui'], answer: 'Comment', explain: '"Comment" pregunta el nombre o la manera.' },
              { options: ["s'appelle", "s'appelles", "s'appellent", "s'appellez"], answer: "s'appelle", explain: '"Il" → "s\'appelle".' },
            ],
          },
          {
            scene: 'Sofia pregunta informalmente',
            lines: [['Sofia', 'Tu [[0]] le café ? (aimer → aimes) [[1]] ?']],
            blanks: [
              { options: ['aimes', 'aime', 'aimez', 'aimons'], answer: 'aimes', explain: '"Tu" → "aimes" (terminación -es).' },
              { options: ['Non ?', 'Oui ?', '?', '!'], answer: 'Non ?', explain: 'Pregunta por entonación: la frase afirmativa con signo de interrogación.' },
            ],
          },
          {
            scene: 'Nora pregunta cuándo estudia Marco',
            lines: [['Nora', '[[0]] est-ce que Marco [[1]] ? (étudier → étudie)']],
            blanks: [
              { options: ['Quand', 'Où', 'Comment', 'Combien'], answer: 'Quand', explain: '"Quand" = cuándo.' },
              { options: ['étudie', 'étudies', 'étudiez', 'étudient'], answer: 'étudie', explain: '"Marco" (il) → "étudie".' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Entrevista en contexto',
        tag: 'Texto guiado',
        intro: 'Lina entrevista a Gael para un artículo del blog WeLearn. Elige la forma correcta de cada pregunta.',
        type: 'guidedText',
        scene: 'Lina entrevista a Gael para el blog de WeLearn. Completa las preguntas con la forma correcta.',
        text: 'Lina : [[0]] habitez-vous, Gael ? — Gael : J\'habite à Bucaramanga. Lina : [[1]] langues est-ce que vous parlez ? — Gael : Huit langues. Lina : [[2]] est-ce que vous avez commencé à étudier les langues ? — Gael : À l\'âge de 12 ans. Lina : [[3]] est-ce que vous aimez le plus ? — Gael : La connexion humaine. Lina : Et [[4]] êtes-vous professeur ? — Gael : Parce que j\'adore partager.',
        blanks: [
          { options: ['Où', 'Quand', 'Comment', 'Pourquoi'], answer: 'Où', explain: '"Où habitez-vous ?" — inversión formal para preguntar el lugar.' },
          { options: ['Combien de', 'Qui', 'Où', 'Quand'], answer: 'Combien de', explain: '"Combien de langues ?" — cuántos/cuántas.' },
          { options: ['Quand', 'Où', 'Comment', 'Qui'], answer: 'Quand', explain: '"Quand est-ce que vous avez commencé ?" — cuándo.' },
          { options: ['Qu\'', 'Où', 'Quand', 'Qui'], answer: 'Qu\'', explain: '"Qu\'est-ce que vous aimez le plus ?" — qué (ante vocal: qu\'est-ce que).' },
          { options: ['pourquoi', 'où', 'comment', 'combien'], answer: 'pourquoi', explain: '"Pourquoi êtes-vous professeur ?" — por qué con inversión formal.' },
          { options: ['Où', 'Quand', 'Comment', 'Pourquoi'], answer: 'Où', explain: 'Extra confirming blank.' },
        ],
      },
      {
        id: 'l4',
        title: 'Formula la pregunta',
        tag: 'Texto libre',
        intro: 'Escribe la pregunta correcta usando la palabra interrogativa y la estructura indicada.',
        type: 'freeText',
        scene: 'Ana prepara preguntas para entrevistar a nuevos estudiantes. Escribe cada pregunta con est-ce que.',
        text: 'Ana pregunta: 1) ¿Cómo te llamas? → [[0]] est-ce que tu t\'appelles ? 2) ¿Dónde vives? → [[1]] est-ce que tu habites ? 3) ¿Por qué estudias francés? → [[2]] est-ce que tu étudies le français ? 4) ¿Cuánto tiempo tienes para estudiar? → [[3]] de temps est-ce que tu as ? 5) ¿Cuándo puedes asistir a clase? → [[4]] est-ce que tu peux venir ?',
        blanks: [
          { answer: 'Comment', accepted: ['Comment', 'comment'], explain: '"Comment" = cómo. "Comment est-ce que tu t\'appelles ?"' },
          { answer: 'Où', accepted: ['Où', 'où'], explain: '"Où" = dónde. "Où est-ce que tu habites ?"' },
          { answer: 'Pourquoi', accepted: ['Pourquoi', 'pourquoi'], explain: '"Pourquoi" = por qué. "Pourquoi est-ce que tu étudies le français ?"' },
          { answer: 'Combien', accepted: ['Combien', 'combien'], explain: '"Combien de temps" = cuánto tiempo.' },
          { answer: 'Quand', accepted: ['Quand', 'quand'], explain: '"Quand" = cuándo.' },
        ],
      },
      {
        id: 'l5',
        title: 'Escribe preguntas',
        tag: 'Producción',
        intro: 'Escribe las preguntas completas con est-ce que sobre los personajes.',
        type: 'write',
        items: [
          {
            scene: 'Gael conoce a un nuevo estudiante',
            prompt: 'Escribe la pregunta: "¿Dónde vives?" usando est-ce que (tú informal).',
            answer: 'Où est-ce que tu habites ?',
            accepted: ['où est-ce que tu habites', "où est-ce qu'il habite", 'où habites-tu'],
            explain: 'Ejemplo: Où est-ce que tu habites ? / Où est-ce qu\'il habite ?',
          },
          {
            scene: 'Nora entrevista a Carlos',
            prompt: 'Escribe: "¿Cuántas lenguas hablas?" con est-ce que.',
            answer: 'Combien de langues est-ce que tu parles ?',
            accepted: ['combien de langues est-ce que', 'combien de langues parles-tu'],
            explain: 'Combien de + sustantivo + est-ce que + sujeto + verbo.',
          },
          {
            scene: 'Marco le pregunta a Sofia',
            prompt: 'Pregunta a Sofia por qué no viene a clase hoy (pourquoi + est-ce que).',
            answer: "Pourquoi est-ce que tu ne viens pas aujourd'hui ?",
            accepted: ["pourquoi est-ce que tu ne viens pas", 'pourquoi tu ne viens pas'],
            explain: 'Pourquoi est-ce que + sujeto + negación + verbo.',
          },
          {
            scene: 'Ana pregunta formalmente',
            prompt: 'Escribe una pregunta formal con inversión: "¿Habla usted español?"',
            answer: 'Parlez-vous espagnol ?',
            accepted: ['parlez-vous espagnol', 'parlez-vous'],
            explain: 'Inversión formal: verbo-vous. "Parlez-vous espagnol ?"',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión: La entrevista',
        tag: 'Producción',
        intro: 'Misión: Eres periodista de WeLearn. Escribe 3 preguntas para entrevistar a un nuevo estudiante.',
        type: 'write',
        items: [
          {
            scene: 'Pregunta sobre la identidad (qui/comment)',
            prompt: 'Pregunta cómo se llama el estudiante y de dónde es (dos preguntas en una).',
            answer: "Comment est-ce que tu t'appelles ? D'où est-ce que tu viens ?",
            accepted: ['comment est-ce que', 'comment tu t\'appelles', 'd\'où', 'tu viens'],
            explain: 'Comment est-ce que tu t\'appelles ? / D\'où est-ce que tu viens ?',
          },
          {
            scene: 'Pregunta sobre motivación (pourquoi)',
            prompt: 'Pregunta por qué estudia francés y cuánto tiempo lleva aprendiendo.',
            answer: 'Pourquoi est-ce que tu étudies le français ? Depuis combien de temps ?',
            accepted: ['pourquoi est-ce que', 'pourquoi tu étudies', 'depuis combien'],
            explain: 'Pourquoi est-ce que tu étudies le français ? Depuis combien de temps tu étudies ?',
          },
          {
            scene: 'Pregunta sobre rutina (quand/où)',
            prompt: 'Pregunta cuándo y dónde estudia el estudiante.',
            answer: 'Quand est-ce que tu étudies ? Où est-ce que tu étudies ?',
            accepted: ['quand est-ce que', 'où est-ce que', 'quand tu étudies', 'où tu étudies'],
            explain: 'Quand est-ce que tu étudies ? / Où est-ce que tu étudies ?',
          },
        ],
      },
    ],
  },
}

export default topic
