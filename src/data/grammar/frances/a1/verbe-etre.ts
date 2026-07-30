import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbe-etre',
  order: '02',
  color: '#7c3aed',
  category: 'Verbes',
  level: 'A1',
  title: 'Le Verbe Être en Français A1',
  shortTitle: 'Verbe être',
  metaTitle: 'Le verbe être en français A1 — suis, es, est, sommes, êtes, sont',
  description:
    'El verbo être (ser/estar) es el más fundamental del francés. Sus formas — suis, es, est, sommes, êtes, sont — son irregulares y deben memorizarse. Se usa para identidad, nacionalidad, profesión, descripción física y ubicación.',
  lead: 'Domina être: el verbo más usado en francés. Sus 6 formas son irregulares pero esenciales para toda presentación y descripción.',
  outcomes: ['Conjuga être en presente', 'Usa être para identidad y descripción', 'Forma negaciones e interrogaciones'],

  guide: {
    goal: 'Conjugar être (ser/estar) en presente de indicativo y usarlo en oraciones básicas.',
    model: 'Je suis étudiant. / Elle est française. / Nous sommes à Paris.',
    formula: 'Sujeto + être conjugado + atributo/lugar',
    decisions: [
      'Être = ser O estar (el francés no distingue como el español)',
      'Profesión y nacionalidad: sin artículo → Je suis médecin. / Il est espagnol.',
      'Negación: ne... pas → Je ne suis pas français. / Il n\'est pas ici.',
      'Pregunta: Est-ce que + ordre normal → Est-ce que tu es étudiant?',
      '"C\'est" (esto es) para presentar cosas: C\'est mon ami Pierre.',
    ],
    table: [
      ['Pronombre', 'Être', 'Español'],
      ['je', 'suis', 'soy / estoy'],
      ['tu', 'es', 'eres / estás'],
      ['il / elle / on', 'est', 'es / está'],
      ['nous', 'sommes', 'somos / estamos'],
      ['vous', 'êtes', 'sois / estáis / están'],
      ['ils / elles', 'sont', 'son / están'],
    ],
    mistakes: [
      'No confundir "es" (del verbe être) con el español "es" — pronunciación diferente.',
      'Profesión sin artículo: "Je suis un médecin" ❌ → "Je suis médecin" ✓',
      'La negación requiere NE antes del verbo y PAS después: "Je ne suis pas..."',
    ],
  },

  seo: [
    {
      heading: '¿Por qué être es el verbo más importante del francés?',
      paragraphs: [
        'Être (ser/estar) es el verbo más frecuente del francés. A diferencia del español, que separa "ser" de "estar", el francés usa être para ambas funciones: Je suis fatigué (estoy cansado), Il est médecin (es médico), Nous sommes à Paris (estamos en París).',
        'Sus seis formas en presente son completamente irregulares y hay que memorizarlas: suis, es, est, sommes, êtes, sont. Son tan fundamentales que el aprendizaje de cualquier otra estructura del francés depende de dominarlas.',
      ],
    },
    {
      heading: 'Conjugación completa de être en presente',
      paragraphs: [
        'Je suis (yo soy/estoy), tu es (tú eres/estás), il/elle/on est (él/ella es/está), nous sommes (nosotros somos/estamos), vous êtes (vosotros/ustedes son/están), ils/elles sont (ellos/ellas son/están).',
        'Un truco de memorización: suis-es-est (singular) y sommes-êtes-sont (plural). Las terminaciones del plural son más regulares que las del singular.',
      ],
      table: [
        ['Persona', 'Être', 'Ejemplo'],
        ['Je', 'suis', 'Je suis content(e).'],
        ['Tu', 'es', 'Tu es sympa.'],
        ['Il / elle / on', 'est', 'Il est médecin. / On est amis.'],
        ['Nous', 'sommes', 'Nous sommes à Lyon.'],
        ['Vous', 'êtes', 'Vous êtes professeur ?'],
        ['Ils / elles', 'sont', 'Elles sont étudiantes.'],
      ],
    },
    {
      heading: '¿Être significa "ser" o "estar" en francés?',
      paragraphs: [
        'En español distinguimos "soy médico" (ser, identidad permanente) de "estoy cansado" (estar, estado temporal). En francés, être cubre ambas funciones: Je suis médecin (soy médico) y Je suis fatigué (estoy cansado).',
        'Esto simplifica mucho el aprendizaje: no hay que decidir cuándo usar "ser" o "estar". Être sirve para todo: identidad, profesión, nacionalidad, descripción física, estados de ánimo y ubicación.',
      ],
    },
    {
      heading: '¿Cómo se niega y se pregunta con être en francés?',
      paragraphs: [
        'Para la negación, se envuelve el verbo entre ne... pas: Je ne suis pas français. / Elle n\'est pas à la maison (n\' antes de vocal). En el habla coloquial, el "ne" a menudo se omite: Je suis pas français.',
        'Para preguntas en A1, usa Est-ce que... + orden normal: Est-ce que tu es étudiant? / Est-ce qu\'il est là? También puedes invertir: Es-tu étudiant? / Êtes-vous français? (más formal).',
      ],
    },
    {
      heading: 'C\'est vs. il est: una distinción importante',
      paragraphs: [
        '"C\'est" (esto es / él es) se usa para presentar personas o cosas específicas: C\'est mon ami. / C\'est un médecin. Con artículo.',
        '"Il est / elle est" se usa para describir: Il est médecin (es médico, sin artículo). / Il est grand (es alto).',
        'En A1, basta con recordar: para presentar → C\'est; para describir → Il/Elle est.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Conjugación de être y sus usos principales en descripciones e identidad.',
    graphicPrompt: 'Tabla de conjugación de être con ejemplos de presentación personal.',
    scene: [
      ['je suis', 'Je suis étudiant(e). — Soy estudiante.'],
      ['tu es', 'Tu es sympa ! — ¡Eres simpático!'],
      ['il / elle est', 'Elle est française. — Es francesa.'],
      ['on est', 'On est amis. — Somos amigos. (coloquial)'],
      ['nous sommes', 'Nous sommes à Paris. — Estamos en París.'],
      ['vous êtes', 'Vous êtes professeur ? — ¿Es usted profesor?'],
      ['ils / elles sont', 'Ils sont contents. — Están contentos.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['formas irregulares', 'être para ser y estar', 'ne...pas con être'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de être.',
        type: 'choice',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Je ___ étudiant(e).']],
            options: ['suis', 'es', 'est', 'sont'],
            answer: 'suis',
            explain: '"Je" → "suis". Primera forma del paradigma de être.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Tu ___ française ?']],
            options: ['es', 'est', 'suis', 'êtes'],
            answer: 'es',
            explain: '"Tu" → "es". Segunda forma del paradigma de être.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Elle ___ médecin.']],
            options: ['est', 'es', 'sont', 'sommes'],
            answer: 'est',
            explain: '"Elle" → "est". Tercera persona singular de être.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Nous ___ à Paris ce week-end.']],
            options: ['sommes', 'sont', 'êtes', 'suis'],
            answer: 'sommes',
            explain: '"Nous" → "sommes". Primera persona plural de être.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Vous ___ professeur ?']],
            options: ['êtes', 'sont', 'sommes', 'est'],
            answer: 'êtes',
            explain: '"Vous" → "êtes". Segunda persona plural (o cortesía singular).',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Ils ___ espagnols.']],
            options: ['sont', 'est', 'sommes', 'êtes'],
            answer: 'sont',
            explain: '"Ils" → "sont". Tercera persona plural de être.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Je ne ___ pas français(e).']],
            options: ['suis', 'es', 'est', 'sommes'],
            answer: 'suis',
            explain: 'Negación: ne + verbe + pas. "Je ne suis pas français(e)".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'On ___ contents d\'être ici.']],
            options: ['est', 'sont', 'sommes', 'êtes'],
            answer: 'est',
            explain: '"On" se conjuga como "il/elle" → "est".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos decisiones',
        tag: '2 espacios',
        intro: 'Completa el pronombre y la forma de être.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] [[1]] colombienne. Je viens de Bogotá.']],
            blanks: [
              { options: ['Je', 'Tu', 'Elle', 'On'], answer: 'Je', explain: '"Je" = primera persona.' },
              { options: ['suis', 'es', 'est', 'sont'], answer: 'suis', explain: '"Je" → "suis".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] professeur [[1]] très sympa.']],
            blanks: [
              { options: ['Le', 'La', 'Les', 'Un'], answer: 'Le', explain: '"Le professeur" — masculino con artículo definido.' },
              { options: ['est', 'es', 'suis', 'sont'], answer: 'est', explain: '"Le professeur" = il → "est".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Nous [[0]] amis et nous [[1]] heureux.']],
            blanks: [
              { options: ['sommes', 'êtes', 'sont', 'suis'], answer: 'sommes', explain: '"Nous" → "sommes".' },
              { options: ['sommes', 'êtes', 'sont', 'suis'], answer: 'sommes', explain: 'De nuevo "nous sommes" para el segundo predicado.' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] êtes américain ? — Non, [[1]] suis canadien.']],
            blanks: [
              { options: ['Vous', 'Tu', 'Ils', 'On'], answer: 'Vous', explain: '"Vous êtes" — cortesía o plural.' },
              { options: ['je', 'tu', 'il', 'on'], answer: 'je', explain: 'Respuesta en primera persona → "je".' },
            ],
          },
        ],
      },
      {
          id: 'level-3',
          title: 'Completa el texto',
          tag: 'Texto guiado',
          intro: 'Elige la forma correcta de être según el sujeto de cada oración.',
          type: 'guidedText',
        scene: 'Elige la forma correcta de être según el sujeto de cada oración.',
        text: 'Bonjour ! Je m\'appelle Lucas. Je [[0]] étudiant à l\'université. Ma sœur Sophie [[1]] professeure de mathématiques. Nous [[2]] de Lyon. Mes parents [[3]] très sympathiques. Mon père [[4]] architecte et ma mère [[5]] avocate. Et toi, tu [[6]] étudiant(e) aussi ?',
        blanks: [
          { options: ['suis', 'es', 'est', 'sommes'], answer: 'suis', explain: '"Je" → "suis".' },
          { options: ['est', 'es', 'suis', 'sont'], answer: 'est', explain: '"Sophie" (elle) → "est".' },
          { options: ['sommes', 'êtes', 'sont', 'suis'], answer: 'sommes', explain: '"Nous" → "sommes".' },
          { options: ['sont', 'est', 'êtes', 'sommes'], answer: 'sont', explain: '"Mes parents" (ils) → "sont".' },
          { options: ['est', 'es', 'suis', 'sommes'], answer: 'est', explain: '"Mon père" (il) → "est".' },
          { options: ['est', 'es', 'suis', 'sont'], answer: 'est', explain: '"Ma mère" (elle) → "est".' },
          { options: ['es', 'est', 'suis', 'êtes'], answer: 'es', explain: '"Tu" → "es". Pregunta informalmente.' },
        ],
      },
      {
          id: 'level-4',
          title: 'Escribe sin ayuda',
          tag: 'Texto libre',
          intro: 'Conjuga être en la forma correcta para cada sujeto.',
          type: 'freeText',
        scene: 'Conjuga être en la forma correcta para cada sujeto.',
        text: 'Pablo et María [[0]] espagnols. Pablo [[1]] ingénieur. María [[2]] architecte. Nous [[3]] amis depuis dix ans. Et vous, vous [[4]] d\'où ?',
        blanks: [
          { answer: 'sont', accepted: ['sont'], explain: '"Pablo et María" (ils) → "sont".' },
          { answer: 'est', accepted: ['est'], explain: '"Pablo" (il) → "est".' },
          { answer: 'est', accepted: ['est'], explain: '"María" (elle) → "est".' },
          { answer: 'sommes', accepted: ['sommes'], explain: '"Nous" → "sommes".' },
          { answer: 'êtes', accepted: ['êtes'], explain: '"Vous" → "êtes".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones usando être.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Preséntate: di tu profesión o lo que eres (estudiante, etc.) usando "je suis".',
            answer: 'Je suis étudiant(e).',
            accepted: ['je suis'],
            explain: 'Ejemplo: Je suis étudiant. / Je suis professeure. / Je suis colombien(ne).',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di de dónde eres tú y de dónde es un amigo/a: usa "je suis" y "il/elle est".',
            answer: 'Je suis colombien(ne). Il est français.',
            accepted: ['je suis', 'il est', 'elle est'],
            explain: 'Ejemplo: Je suis mexicain. Elle est française. / Je suis péruvien. Il est espagnol.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di dónde están tú y tus amigos ahora usando "nous sommes" o "on est".',
            answer: 'Nous sommes à l\'école.',
            accepted: ['nous sommes', 'on est'],
            explain: 'Ejemplo: Nous sommes à la bibliothèque. / On est au café.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Escribe una frase negativa con être: algo que NO eres.',
            answer: 'Je ne suis pas médecin.',
            accepted: ['je ne suis pas', 'il n\'est pas', 'elle n\'est pas', 'ils ne sont pas'],
            explain: 'Negación: ne + être + pas. Ejemplo: Je ne suis pas français(e). / Elle n\'est pas ici.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Misión: Escribe una presentación corta de ti mismo usando être al menos 3 veces.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di quién eres: nombre, nacionalidad o país de origen.',
            answer: 'Je suis colombien(ne). Je m\'appelle Carlos.',
            accepted: ['je suis'],
            explain: 'Usa "je suis + nationalité" (sin artículo). Ejemplo: Je suis péruvien. Je suis de Lima.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di tu profesión o condición actual.',
            answer: 'Je suis étudiant(e) en linguistique.',
            accepted: ['je suis'],
            explain: 'Profesión sin artículo: Je suis architecte / étudiant(e) / professeur(e).',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Describe a un familiar o amigo con "il est" o "elle est".',
            answer: 'Ma sœur est médecin. Elle est très intelligente.',
            accepted: ['il est', 'elle est', 'ils sont', 'elles sont'],
            explain: 'Ejemplo: Mon frère est ingénieur. / Ma mère est professeure. / Ils sont sympas.',
          },
        ],
      },
    ],
  },
}

export default topic
