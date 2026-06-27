import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'present-simple-affirmative',
  order: '06',
  color: '#0891b2',
  category: 'Verbs',
  level: 'A1',
  title: 'Present simple afirmativo en inglés A1',
  shortTitle: 'Present simple (afirmativo)',
  metaTitle: 'Present simple afirmativo en inglés A1 | Guía para hispanohablantes',
  description: 'Aprende a conjugar el present simple afirmativo, cuándo añadir -s/-es a la tercera persona y para qué sirve este tiempo verbal, con práctica progresiva de 6 niveles.',
  lead: 'El present simple es el tiempo más usado del inglés. Describe rutinas, hábitos, hechos permanentes y verdades generales. La única conjugación especial es la tercera persona singular (he, she, it), que añade -s o -es al verbo. Una sola regla, pero se olvida con frecuencia.',
  outcomes: [
    'Conjugar verbos en present simple afirmativo con todos los pronombres.',
    'Aplicar correctamente la -s/-es de tercera persona singular.',
    'Identificar cuándo usar present simple (rutinas, hechos, verdades generales).',
  ],
  guide: {
    goal: 'Usar el present simple para hablar de rutinas y hechos, añadiendo -s/-es solo cuando el sujeto es he, she o it.',
    model: 'Primero piensa: ¿el sujeto es he, she o it? Si sí, añade -s al verbo (o -es según la terminación). Si no, el verbo queda en su forma base.',
    formula: 'I/you/we/they + verb (base) | he/she/it + verb + s/es',
    decisions: [
      'La mayoría de verbos: añade -s (works, lives, plays).',
      'Verbos en -s, -sh, -ch, -x, -o: añade -es (watches, goes, fixes).',
      'Verbos en consonante + -y: cambia -y por -ies (studies, tries).',
      'Irregulares be (is), have (has), do (does).',
    ],
    table: [
      ['Pronombre', 'Forma', 'Ejemplo'],
      ['I', 'work', 'I work at a school.'],
      ['you', 'work', 'You work in an office.'],
      ['he / she / it', 'works', 'She works every day.'],
      ['we / they', 'work', 'They work together.'],
    ],
    mistakes: [
      'Olvidar la -s de tercera persona: "She work" → She works.',
      'Añadir -s a I, you, we, they: "We works" → We work.',
      'Usar present simple para acciones en progreso ahora mismo: usa present continuous para eso.',
    ],
  },
  seo: [
    {
      heading: 'Para qué sirve el present simple y cuándo usarlo',
      paragraphs: [
        'El present simple en inglés describe tres tipos de situaciones: hábitos y rutinas (I wake up at seven every day), hechos permanentes o verdades generales (The sun rises in the east, Water boils at 100 degrees) y estados que no cambian (She lives in Bogotá, He speaks three languages). Es el tiempo verbal más frecuente en el inglés cotidiano de nivel A1.',
        'Un error común del hispanohablante es usar el present simple para describir lo que está ocurriendo ahora mismo: estoy comiendo → I am eating (present continuous), no I eat. El present simple en inglés describe lo que se hace regularmente, no lo que está pasando en este momento.',
      ],
    },
    {
      heading: 'La regla de la tercera persona: cuándo y cómo añadir -s',
      paragraphs: [
        'La única variación en present simple afirmativo es la tercera persona singular: he, she, it. Para todos los demás pronombres el verbo queda igual que el infinitivo. I work, you work, we work, they work. Pero: he works, she works, it works.',
        'Para añadir la -s o -es correctamente: La mayoría de verbos solo necesitan -s (live → lives, play → plays, read → reads). Verbos en -s, -ss, -sh, -ch, -x, -z o -o añaden -es (wash → washes, watch → watches, go → goes, fix → fixes). Verbos en consonante + -y cambian la -y por -ies (study → studies, try → tries, carry → carries). Los irregulares más importantes: have → has, do → does, be → is.',
      ],
      table: [
        ['Terminación del verbo', 'Cambio 3a persona', 'Ejemplo'],
        ['la mayoría', '+ s', 'work → works, live → lives'],
        ['-sh, -ch, -x, -o', '+ es', 'watch → watches, go → goes'],
        ['consonante + -y', '-y → -ies', 'study → studies'],
        ['have', 'has', 'she has'],
        ['do', 'does', 'he does'],
      ],
    },
    {
      heading: 'Expresiones de tiempo que acompañan al present simple',
      paragraphs: [
        'El present simple aparece frecuentemente con marcadores de frecuencia y tiempo: always (siempre), usually (normalmente), often (a menudo), sometimes (a veces), rarely (raramente), never (nunca), every day / week / month (cada día / semana / mes), on Mondays (los lunes), in the morning (por la mañana).',
        'Posición en la frase: estos adverbios van entre el sujeto y el verbo (I always study at night), o al final (I study English every day). Con to be van después del verbo: She is always on time.',
      ],
    },
    {
      heading: 'El error más frecuente del hispanohablante',
      paragraphs: [
        'El error número uno es olvidar la -s de tercera persona. En español la conjugación tercera persona tiene su propia terminación (trabaja, vive, estudia) y el estudiante ya está habituado a marcar el sujeto en el verbo. En inglés, work no cambia visualmente para I, you, we o they. Cuando llega he/she/it, el único cambio es esa -s o -es, y el cerebro hispanohablante frecuentemente la omite porque la forma base ya parece completa.',
        'La solución práctica es hacer una pausa mental cada vez que el sujeto es he, she o it, y verificar que el verbo lleve la terminación correcta. Con el tiempo esta verificación se vuelve automática.',
      ],
    },
    {
      heading: 'Errores frecuentes y sus correcciones',
      paragraphs: [
        'Error 1: "She study English." → She studies English. Study + tercera persona → studies. Error 2: "He go to work by bus." → He goes to work by bus. Go + tercera persona → goes. Error 3: "They works in a hospital." → They work in a hospital. They no necesita -s.',
      ],
      examples: [
        ['Incorrecto', 'She study English every day.', 'Correcto', 'She studies English every day.'],
        ['Incorrecto', 'He go to school by bus.', 'Correcto', 'He goes to school by bus.'],
        ['Incorrecto', 'We works in the same office.', 'Correcto', 'We work in the same office.'],
      ],
    },
  ],
  visual: {
    mode: 'conjugation-check',
    teacherLens: 'El estudiante aprende a hacer una pausa mental en he/she/it y verificar la terminación del verbo.',
    graphicPrompt: 'Sujeto → ¿es he/she/it? → verbo base o verbo + s/es.',
    scene: [['I / you / we / they', 'base verb'], ['he / she / it', 'verb + s/es'], ['study → studies', 'special ending']],
    learnerModes: ['visual: tabla de sujetos', 'analítico: regla de terminaciones', 'oral: rutina diaria'],
    practiceVerbs: ['Identifica', 'Conjuga', 'Completa', 'Describe', 'Corrige', 'Narra'],
    reviewFocus: ['-s de 3a persona', 'terminaciones especiales', 'verbos irregulares have/do/be', 'expresiones de frecuencia'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del verbo en present simple.',
        type: 'choice',
        items: [
          {
            scene: 'Rutina matutina',
            lines: [['Ana', 'I ___ English every morning before breakfast.']],
            options: ['study', 'studies', 'studys', 'to study'],
            answer: 'study',
            explain: 'I → forma base del verbo: study.',
          },
          {
            scene: 'Describiendo al profesor',
            lines: [['Student', 'Our teacher ___ three languages fluently.']],
            options: ['speak', 'speaks', 'speakes', 'speakies'],
            answer: 'speaks',
            explain: 'Our teacher → he/she → speaks (+ s).',
          },
          {
            scene: 'Hábito de estudio',
            lines: [['Carlos', 'My sister ___ every night for two hours.']],
            options: ['practice', 'practices', 'practicies', 'practicess'],
            answer: 'practices',
            explain: 'My sister → she → practices (+ s).',
          },
          {
            scene: 'Grupo de estudio',
            lines: [['David', 'We ___ at the library on Tuesdays.']],
            options: ['meet', 'meets', 'meetes', 'meeties'],
            answer: 'meet',
            explain: 'We → forma base: meet.',
          },
          {
            scene: 'Horario de clases',
            lines: [['Teacher', 'The class ___ at eight every morning.']],
            options: ['start', 'starts', 'startes', 'startss'],
            answer: 'starts',
            explain: 'The class → it → starts (+ s).',
          },
          {
            scene: 'Hábito familiar',
            lines: [['Lina', 'My parents ___ to work by bus.']],
            options: ['go', 'goes', 'gos', 'goies'],
            answer: 'go',
            explain: 'My parents → they → go (forma base).',
          },
          {
            scene: 'Verbo especial',
            lines: [['Carlos', 'She ___ a lot of homework every day.']],
            options: ['have', 'has', 'haves', 'havies'],
            answer: 'has',
            explain: 'She → has (irregular: have → has en 3a persona).',
          },
          {
            scene: 'Terminación -ch',
            lines: [['Teacher', 'He ___ the news every evening.']],
            options: ['watch', 'watchs', 'watches', 'watchies'],
            answer: 'watches',
            explain: 'He + watch (termina en -ch) → + es: watches.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos verbos en un texto',
        tag: '2 espacios',
        intro: 'Completa los dos verbos en present simple en la misma situación.',
        type: 'dual',
        items: [
          {
            scene: 'Rutina de un estudiante',
            lines: [['Narrator', 'Carlos [[0]] (wake) up at six and [[1]] (study) for one hour before school.']],
            blanks: [
              { options: ['wake', 'wakes', 'wakes up', 'wakes'], answer: 'wakes', explain: 'Carlos → he → wakes (+ s).' },
              { options: ['study', 'studies', 'studys'], answer: 'studies', explain: 'Carlos → he + study → studies (-y → -ies).' },
            ],
          },
          {
            scene: 'Descripción de dos personas',
            lines: [['Ana', 'My brother [[0]] (work) at a hospital. He [[1]] (start) at seven in the morning.']],
            blanks: [
              { options: ['work', 'works', 'workes'], answer: 'works', explain: 'My brother → he → works (+ s).' },
              { options: ['start', 'starts', 'startes'], answer: 'starts', explain: 'He + start → starts (+ s).' },
            ],
          },
          {
            scene: 'Clase de inglés',
            lines: [['Teacher', 'Our class [[0]] (meet) on Mondays and Fridays. The teacher always [[1]] (arrive) on time.']],
            blanks: [
              { options: ['meet', 'meets', 'meetes'], answer: 'meets', explain: 'Our class → it → meets (+ s).' },
              { options: ['arrive', 'arrives', 'arrivies'], answer: 'arrives', explain: 'The teacher → he/she → arrives (+ s).' },
            ],
          },
          {
            scene: 'Amigos y rutinas',
            lines: [['David', 'My friends and I [[0]] (go) to the gym on Saturdays. My friend Mateo [[1]] (play) football too.']],
            blanks: [
              { options: ['go', 'goes', 'gos'], answer: 'go', explain: 'My friends and I → we → go (forma base).' },
              { options: ['play', 'plays', 'playes'], answer: 'plays', explain: 'Mateo → he → plays (+ s).' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa la descripción eligiendo la forma correcta del present simple.',
        type: 'guidedText',
        scene: 'La rutina diaria de Zhanna',
        text: 'Zhanna [[0]] (wake) up at six every morning. She [[1]] (have) coffee and [[2]] (read) the news. Then she [[3]] (go) to the WeLearn office. Her students [[4]] (arrive) at eight. She always [[5]] (prepare) her lessons the night before. After class, she [[6]] (check) her emails and [[7]] (plan) the next day.',
        blanks: [
          { options: ['wake', 'wakes', 'wakes up', 'wakes'], answer: 'wakes', explain: 'Zhanna → she → wakes (+ s).' },
          { options: ['have', 'has', 'haves'], answer: 'has', explain: 'She → has (irregular).' },
          { options: ['read', 'reads', 'reades'], answer: 'reads', explain: 'She → reads (+ s).' },
          { options: ['go', 'goes', 'gos'], answer: 'goes', explain: 'She + go (termina en -o) → goes (+ es).' },
          { options: ['arrive', 'arrives', 'arrivies'], answer: 'arrive', explain: 'Her students → they → arrive (forma base).' },
          { options: ['prepare', 'prepares', 'preparys'], answer: 'prepares', explain: 'She → prepares (+ s).' },
          { options: ['check', 'checks', 'checkes'], answer: 'checks', explain: 'She → checks (+ s).' },
          { options: ['plan', 'plans', 'planes'], answer: 'plans', explain: 'She → plans (+ s).' },
        ],
      },
      {
        id: 'l4',
        title: 'Texto libre',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta del verbo en present simple sin ayuda.',
        type: 'freeText',
        scene: 'Mi rutina de estudio de inglés',
        text: 'I [[0]] (study) English three times a week. My teacher [[1]] (give) us homework every class. My classmate Carlos always [[2]] (finish) first. We sometimes [[3]] (practise) together at the café. The café [[4]] (open) at seven in the morning.',
        blanks: [
          { answer: 'study', explain: 'I → forma base: study.' },
          { answer: 'gives', explain: 'My teacher → he/she → gives (+ s).' },
          { answer: 'finishes', explain: 'Carlos → he + finish (termina en -sh) → finishes (+ es).' },
          { answer: 'practise', accepted: ['practice'], explain: 'We → forma base: practise/practice.' },
          { answer: 'opens', explain: 'The café → it → opens (+ s).' },
        ],
      },
      {
        id: 'l5',
        title: 'Describiendo rutinas',
        tag: 'Producción',
        intro: 'Escribe la frase completa con el present simple correcto.',
        type: 'write',
        items: [
          {
            scene: 'Rutina de tu amigo',
            prompt: 'Escribe: He / study / English / every day.',
            answer: 'He studies English every day.',
            accepted: ['he studies english every day'],
            explain: 'He + study → studies (-y → -ies).',
          },
          {
            scene: 'Hábito del grupo',
            prompt: 'Escribe: They / go / to the gym / on Saturdays.',
            answer: 'They go to the gym on Saturdays.',
            accepted: ['they go to the gym on saturdays'],
            explain: 'They → forma base: go.',
          },
          {
            scene: 'Descripción de una persona',
            prompt: 'Escribe: She / watch / the news / every evening.',
            answer: 'She watches the news every evening.',
            accepted: ['she watches the news every evening'],
            explain: 'She + watch (termina en -ch) → watches (+ es).',
          },
          {
            scene: 'Hecho permanente',
            prompt: 'Escribe: The sun / rise / in the east.',
            answer: 'The sun rises in the east.',
            accepted: ['the sun rises in the east'],
            explain: 'The sun → it → rises (+ s).',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión de conversación',
        tag: 'Reto final',
        intro: 'Responde usando present simple para describir tu rutina real.',
        type: 'write',
        items: [
          {
            scene: 'Tu rutina',
            prompt: 'Answer: What do you do every morning? (Use: I wake up / I have breakfast / I study)',
            answer: 'I wake up, I have breakfast and I study.',
            accepted: ['i wake up i have breakfast and i study', 'i wake up have breakfast and study', 'i wake up, have breakfast, and study english'],
            explain: 'I → forma base en todas las formas.',
          },
          {
            scene: 'Sobre un amigo',
            prompt: 'Tell me about your friend: ___ live / ___ study / ___ work (he/she + correct form)',
            answer: 'He lives in Bogotá. He studies English. He works every day.',
            accepted: ['he lives studies works', 'she lives in bogotá she studies english she works every day', 'he lives in bogotá he studies english he works every day'],
            explain: 'He/she → lives, studies, works (todas con -s o -ies).',
          },
          {
            scene: 'Hecho general',
            prompt: 'Complete: English ___ (open) doors around the world.',
            answer: 'English opens doors around the world.',
            accepted: ['english opens doors around the world'],
            explain: 'English → it → opens (+ s).',
          },
        ],
      },
    ],
  },
}

export default topic
