import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'like-ing',
  order: '22',
  color: '#0369a1',
  category: 'Verbs',
  level: 'A1',
  title: 'Like + -ing en inglés A1',
  shortTitle: 'Like + -ing',
  metaTitle: 'Like + -ing en inglés A1 | Like, Love, Hate + gerundio',
  description:
    'Aprende a usar like, love, enjoy y hate seguidos de gerundio (-ing) en inglés A1. Habla sobre gustos, aficiones y preferencias con la estructura correcta.',
  lead: 'En inglés, después de like/love/hate/enjoy, el verbo va en forma -ing (gerundio). No se usa el infinitivo como en español. I like studying (no: I like to study*). I love watching movies. She hates waking up early.',
  outcomes: [
    'Usar like/love/enjoy + -ing: I like studying English.',
    'Usar hate/don\'t like + -ing: She doesn\'t like waking up early.',
    'Hablar de gustos y aficiones con la estructura correcta.',
  ],
  guide: {
    goal: 'Expresar gustos y preferencias usando like/love/enjoy/hate + gerundio (-ing).',
    model: 'I love watching movies in English. / She doesn\'t like waking up early. / Do you enjoy reading?',
    formula: 'like / love / enjoy / hate + verb + -ing',
    decisions: [
      'Afirmativa: I like studying. / She loves reading. / They enjoy learning.',
      'Negativa: I don\'t like waking up. / He doesn\'t enjoy doing homework.',
      'Pregunta: Do you like studying? / Does she enjoy learning?',
      'Nota: like + to infinitive también es correcto en algunos casos, pero like + -ing es más frecuente y siempre válido.',
      'Escala de gustos: love > like > enjoy > don\'t like > hate.',
    ],
    table: [
      ['Verbo de gusto', 'Estructura', 'Ejemplo A1'],
      ['love', 'love + -ing', 'I love learning new languages.'],
      ['like', 'like + -ing', 'She likes listening to music.'],
      ['enjoy', 'enjoy + -ing', 'We enjoy practicing speaking.'],
      ['don\'t like', 'don\'t like + -ing', 'He doesn\'t like doing homework.'],
      ['hate', 'hate + -ing', 'They hate waking up early.'],
    ],
    mistakes: [
      '"I like study English" ❌ → I like studying English ✓ — verbo en -ing.',
      '"She loves to watching movies" ❌ → She loves watching movies ✓ — no "to" con -ing.',
      '"I enjoy learn" ❌ → I enjoy learning ✓ — enjoy siempre con -ing.',
    ],
  },
  seo: [
    {
      heading: 'Like + -ing: expresar gustos en inglés A1',
      paragraphs: [
        'En inglés, los verbos de gusto y preferencia (like, love, enjoy, hate) van seguidos de gerundio (verbo + -ing) cuando preceden a otro verbo. Esto difiere del español donde decimos "me gusta estudiar" con infinitivo. En inglés: I like studying / I love watching / I enjoy learning / I hate waking up.',
        'Esta estructura es fundamental en A1 porque permite hablar de uno mismo: aficiones, hábitos, rutinas y preferencias. Es una de las primeras cosas que practicamos en WeLearn porque facilita la conversación desde el primer día.',
      ],
    },
    {
      heading: 'Love, like, enjoy, don\'t like, hate: la escala de gustos',
      paragraphs: [
        'Los verbos de gusto forman una escala natural de intensidad: love (encantar) > like (gustar) > enjoy (disfrutar) > don\'t like (no gustar) > hate (odiar). Todos van seguidos de -ing: I love swimming. / I like reading. / I enjoy cooking. / I don\'t like cleaning. / I hate getting up early.',
        'El verbo enjoy es especialmente importante porque SIEMPRE va con -ing, nunca con infinitivo: "I enjoy to read" es incorrecto en todos los casos. Con like y love, técnicamente ambas formas (like + -ing / like + to + infinitive) son posibles en inglés, pero like + -ing es más frecuente y siempre correcta.',
      ],
    },
    {
      heading: 'Negativa e interrogativa con like/love/hate + -ing',
      paragraphs: [
        'La negativa usa don\'t/doesn\'t antes del verbo de gusto: I don\'t like waking up early. / She doesn\'t enjoy doing homework. / They don\'t love studying on weekends. También se puede usar hate directamente: I hate waking up early (equivale a I don\'t like waking up early a lot).',
        'Las preguntas siguen la estructura del present simple: Do you like studying? / Does she enjoy reading? / What do you love doing in your free time? Esta última es perfecta para conversaciones de presentación en A1.',
      ],
    },
    {
      heading: '¿Por qué se usa el verbo con -ing después de "like"?',
      paragraphs: [
        'Verbos como like, love, hate, enjoy y prefer suelen ir seguidos de otro verbo en -ing para hablar de actividades en general: "I like swimming", "She loves reading", "They hate waiting". El -ing funciona como el nombre de la actividad.',
      ],
    },
    {
      heading: '¿Cómo se dice "me gusta hacer algo" en inglés?',
      paragraphs: [
        'Con "like" + verbo -ing: "I like cooking" (me gusta cocinar), "I like playing football". Ojo: en inglés el sujeto es la persona ("I like"), al revés que el español "me gusta", donde lo que gusta es el sujeto.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre "like doing" y "would like to do"?',
      paragraphs: [
        '"like + -ing" expresa un gusto general ("I like traveling" = me gusta viajar). "would like + to + verbo" expresa un deseo puntual y cortés ("I would like to travel" = me gustaría viajar / quisiera). No confundas el gusto habitual con el deseo del momento.',
      ],
    },
  ],
  visual: {
    mode: 'scale',
    teacherLens: 'El estudiante aprende la escala de gustos y la estructura verbo de gusto + -ing.',
    graphicPrompt: 'Escala de gustos: love ❤️ > like 😊 > enjoy 🙂 > don\'t like 😐 > hate 😤 — todos con + -ing.',
    scene: [
      ['love + -ing', 'I love watching movies in English.'],
      ['like + -ing', 'She likes listening to podcasts.'],
      ['enjoy + -ing', 'We enjoy practicing speaking.'],
      ['hate + -ing', 'He hates doing grammar exercises.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['verbo + -ing (no infinitivo)', 'escala love>like>enjoy>hate', 'don\'t like + -ing', 'enjoy siempre con -ing'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento de la estructura',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del verbo después de like/love/hate.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando de aficiones',
            lines: [['Carlos', 'I love ___ movies in English.']],
            options: ['watching', 'watch', 'to watching', 'watched'],
            answer: 'watching',
            explain: 'love + -ing: I love watching — verbo en gerundio.',
          },
          {
            scene: 'Hábito de estudio',
            lines: [['Ana', 'She likes ___ vocabulary every morning.']],
            options: ['reviewing', 'review', 'to reviewing', 'reviews'],
            answer: 'reviewing',
            explain: 'likes + -ing: She likes reviewing — gerundio.',
          },
          {
            scene: 'Preferencia negativa',
            lines: [['Marco', 'He doesn\'t like ___ up early.']],
            options: ['waking', 'wake', 'to wake', 'waked'],
            answer: 'waking',
            explain: 'doesn\'t like + -ing: waking up — gerundio.',
          },
          {
            scene: 'Usando enjoy',
            lines: [['Sofia', 'I enjoy ___ to music in English.']],
            options: ['listening', 'listen', 'to listening', 'listens'],
            answer: 'listening',
            explain: 'enjoy + -ing: I enjoy listening — siempre gerundio.',
          },
          {
            scene: 'Odio algo',
            lines: [['Diego', 'He hates ___ homework at the last minute.']],
            options: ['doing', 'do', 'to do', 'does'],
            answer: 'doing',
            explain: 'hates + -ing: doing homework — gerundio.',
          },
          {
            scene: 'Pregunta sobre gustos',
            lines: [['Teacher', 'Do you like ___ in class?']],
            options: ['speaking', 'speak', 'to speaking', 'spoke'],
            answer: 'speaking',
            explain: 'like + -ing: Do you like speaking? — gerundio.',
          },
          {
            scene: 'Escala de gustos',
            lines: [['Lina', 'I ___ waking up late on weekends.']],
            options: ['love', 'loves', 'loving', 'to love'],
            answer: 'love',
            explain: 'I love (verbo gusto) + waking up (-ing). love concuerda con I.',
          },
          {
            scene: 'Gerundio correcto',
            lines: [['Carlos', 'We enjoy ___ new words in context.']],
            options: ['learning', 'learn', 'to learn', 'learned'],
            answer: 'learning',
            explain: 'enjoy + -ing: learning — siempre con gerundio.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Verbo de gusto y gerundio',
        tag: '2 espacios',
        intro: 'Elige el verbo de gusto y la forma -ing correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Afición personal',
            lines: [['Ana', 'I [[0]] [[1]] English songs.']],
            blanks: [
              { options: ['love', 'loves', 'loving'], answer: 'love', explain: 'I love — 1.ª persona, sin -s.' },
              { options: ['singing', 'sing', 'to sing'], answer: 'singing', explain: 'love + singing — gerundio.' },
            ],
          },
          {
            scene: 'Preferencia negativa',
            lines: [['Carlos', 'He doesn\'t [[0]] [[1]] grammar tests.']],
            blanks: [
              { options: ['like', 'likes', 'liking'], answer: 'like', explain: 'doesn\'t like — verbo base en negativa.' },
              { options: ['taking', 'take', 'to take'], answer: 'taking', explain: 'doesn\'t like taking — gerundio.' },
            ],
          },
          {
            scene: 'Actividad favorita',
            lines: [['Sofia', 'She [[0]] [[1]] to podcasts while cooking.']],
            blanks: [
              { options: ['enjoys', 'enjoy', 'enjoying'], answer: 'enjoys', explain: 'She enjoys — 3.ª persona: enjoys.' },
              { options: ['listening', 'listen', 'to listen'], answer: 'listening', explain: 'enjoys listening — gerundio.' },
            ],
          },
          {
            scene: 'Opinión sobre tarea',
            lines: [['Marco', 'I [[0]] [[1]] homework on Friday nights.']],
            blanks: [
              { options: ['hate', 'hates', 'hating'], answer: 'hate', explain: 'I hate — 1.ª persona, sin -s.' },
              { options: ['doing', 'do', 'to do'], answer: 'doing', explain: 'hate doing — gerundio.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Perfil de un estudiante de WeLearn',
        tag: 'Opciones',
        intro: 'Elige la forma -ing correcta para completar el perfil de Carlos.',
        type: 'guidedText',
        scene: 'Perfil de Carlos — estudiante de inglés en WeLearn',
        text: 'Carlos loves [[0]] movies in English on weekends. He also likes [[1]] to music and [[2]] English podcasts. He doesn\'t like [[3]] up early, but he enjoys [[4]] in the morning. He hates [[5]] grammar exercises, but he knows they are important.',
        blanks: [
          { options: ['watching', 'watch', 'to watch'], answer: 'watching', explain: 'loves watching — gerundio.' },
          { options: ['listening', 'listen', 'to listen'], answer: 'listening', explain: 'likes listening — gerundio.' },
          { options: ['reading', 'read', 'to read'], answer: 'reading', explain: 'likes reading — gerundio (and reading).' },
          { options: ['waking', 'wake', 'to wake'], answer: 'waking', explain: 'doesn\'t like waking up — gerundio.' },
          { options: ['studying', 'study', 'to study'], answer: 'studying', explain: 'enjoys studying — gerundio.' },
          { options: ['doing', 'do', 'to do'], answer: 'doing', explain: 'hates doing — gerundio.' },
        ],
      },
      {
        id: 'l4',
        title: 'Mis gustos personales',
        tag: 'Sin opciones',
        intro: 'Escribe el gerundio (-ing) correcto de cada verbo.',
        type: 'freeText',
        scene: 'Formulario de gustos y aficiones — clase de inglés WeLearn',
        text: 'I love [[0]] (speak) English. She likes [[1]] (listen) to music. He doesn\'t like [[2]] (do) homework. We enjoy [[3]] (practice) speaking. I hate [[4]] (wake) up at 5 a.m. Do you like [[5]] (watch) series in English?',
        blanks: [
          { answer: 'speaking', accepted: ['speaking'], explain: 'love + speaking — gerundio de speak.' },
          { answer: 'listening', accepted: ['listening'], explain: 'likes + listening — gerundio de listen.' },
          { answer: 'doing', accepted: ['doing'], explain: 'doesn\'t like + doing — gerundio de do.' },
          { answer: 'practicing', accepted: ['practicing', 'practising'], explain: 'enjoy + practicing — gerundio.' },
          { answer: 'waking', accepted: ['waking'], explain: 'hate + waking — gerundio de wake.' },
          { answer: 'watching', accepted: ['watching'], explain: 'like + watching — gerundio de watch.' },
        ],
      },
      {
        id: 'l5',
        title: 'Hablando de gustos',
        tag: 'Producción',
        intro: 'Escribe oraciones completas con like/love/hate + -ing.',
        type: 'write',
        items: [
          {
            scene: 'Una cosa que amas',
            prompt: 'Escribe: "Me encanta ver películas en inglés." (I / love / watch movies / in English)',
            answer: 'I love watching movies in English.',
            accepted: ['i love watching movies in english', 'i love watching movies in english.'],
            explain: 'I love watching movies in English. — love + -ing.',
          },
          {
            scene: 'Una cosa que no te gusta',
            prompt: 'Escribe: "No me gusta hacer tarea." (I / don\'t like / do homework)',
            answer: 'I don\'t like doing homework.',
            accepted: ["i don't like doing homework", "i don't like doing homework.", 'i do not like doing homework'],
            explain: 'I don\'t like doing homework. — don\'t like + -ing.',
          },
          {
            scene: 'Descripción de otro',
            prompt: 'Escribe: "A ella le gusta escuchar podcasts." (She / like / listen to podcasts)',
            answer: 'She likes listening to podcasts.',
            accepted: ['she likes listening to podcasts', 'she likes listening to podcasts.'],
            explain: 'She likes listening to podcasts. — 3.ª persona: likes + -ing.',
          },
          {
            scene: 'Algo que disfrutas',
            prompt: 'Escribe: "Disfruto practicar conversación." (I / enjoy / practice speaking)',
            answer: 'I enjoy practicing speaking.',
            accepted: ['i enjoy practicing speaking', 'i enjoy practicing speaking.', 'i enjoy practising speaking'],
            explain: 'I enjoy practicing speaking. — enjoy siempre con -ing.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Mi perfil de aprendiz',
        tag: 'Reto final',
        intro: 'Escribe sobre tus gustos reales como estudiante de inglés.',
        type: 'write',
        items: [
          {
            scene: 'Actividades que disfrutas',
            prompt: 'Write 2 things you love or like doing to learn English: I love/like ___.',
            answer: 'I love watching series in English. I like listening to music.',
            accepted: ['i love', 'i like', 'i enjoy'],
            explain: 'I love/like/enjoy + verb-ing: watching, listening, reading, speaking, practicing...',
          },
          {
            scene: 'Algo que no te gusta',
            prompt: 'Write one thing you don\'t like or hate about studying English: I don\'t like/I hate ___.',
            answer: 'I don\'t like memorizing grammar rules.',
            accepted: ["i don't like", 'i hate', "i don't enjoy"],
            explain: 'I don\'t like + -ing or I hate + -ing: ...doing tests, memorizing, studying grammar...',
          },
          {
            scene: 'Sobre un amigo',
            prompt: 'Write what your friend likes or hates: My friend loves/hates ___.',
            answer: 'My friend loves playing video games in English.',
            accepted: ['my friend loves', 'my friend likes', 'my friend enjoys', 'my friend hates', "my friend doesn't like"],
            explain: 'My friend loves/likes/enjoys/hates + -ing. 3rd person: loves/likes/enjoys/hates (with -s).',
          },
        ],
      },
    ],
  },
}

export default topic
