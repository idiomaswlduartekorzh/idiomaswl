import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'adjectives-basic',
  order: '13',
  color: '#0d9488',
  category: 'Nouns',
  level: 'A1',
  title: 'Adjetivos básicos en inglés A1',
  shortTitle: 'Adjectives (basic)',
  metaTitle: 'Adjetivos básicos en inglés A1 | Posición y concordancia — guía para hispanohablantes',
  description: 'Aprende los adjetivos más usados en A1, su posición antes del sustantivo y la gran diferencia con el español: no tienen género ni número en inglés.',
  lead: 'En español los adjetivos concuerdan con el sustantivo: niño alto, niña alta, niños altos. En inglés los adjetivos son invariables: tall boy, tall girl, tall boys, tall girls. Además, casi siempre van antes del sustantivo, no después como en español.',
  outcomes: [
    'Usar adjetivos descriptivos básicos en inglés sin concordancia de género o número.',
    'Colocar los adjetivos antes del sustantivo (posición atributiva).',
    'Reconocer los adjetivos más frecuentes en A1: big, small, new, old, good, bad, fast, slow, hot, cold.',
  ],
  guide: {
    goal: 'Describir personas, lugares y objetos con adjetivos sin añadir marcas de género o número.',
    model: 'En inglés el adjetivo nunca cambia. A tall student, a tall teacher, tall students, tall teachers. Siempre la misma forma antes del sustantivo.',
    formula: 'adjective + noun | subject + to be + adjective',
    decisions: [
      'Posición: el adjetivo va ANTES del sustantivo (a big city, not a city big).',
      'Sin concordancia: un adjetivo → una sola forma para todos.',
      'Con to be: sujeto + is/are/am + adjective (The city is big. The students are happy).',
      'Varios adjetivos: de mayor a menor especificidad (a beautiful old Spanish building).',
    ],
    table: [
      ['Español (concordancia)', 'Inglés (invariable)', 'Nota'],
      ['un chico alto / una chica alta', 'a tall boy / a tall girl', 'mismo adjetivo'],
      ['niños simpáticos / niñas simpáticas', 'friendly boys / friendly girls', 'sin -os/-as'],
      ['ciudad grande / ciudades grandes', 'big city / big cities', 'sin -e/-es'],
    ],
    mistakes: [
      '"A city big" → a big city. El adjetivo va antes del sustantivo.',
      '"She is intelligents" → She is intelligent. Los adjetivos no llevan -s.',
      '"A goods student" → a good student. Good no cambia.',
    ],
  },
  seo: [
    {
      heading: 'Por qué los adjetivos ingleses son más simples que en español',
      paragraphs: [
        'En español los adjetivos siguen reglas de concordancia: deben coincidir en género (masculino/femenino) y número (singular/plural) con el sustantivo que modifican. Alto → altos, alta, altas. Inteligente → inteligentes. Para el hispanohablante esto es tan automático que al aprender inglés el cerebro intenta aplicar la misma lógica.',
        'En inglés los adjetivos son invariables. No importa si el sustantivo es masculino, femenino, singular o plural: el adjetivo no cambia. A tall man, a tall woman, tall men, tall women. La forma es siempre tall. Esta simplicidad es una ventaja, pero requiere desactivar el hábito de concordar.',
      ],
    },
    {
      heading: 'Posición del adjetivo: antes del sustantivo',
      paragraphs: [
        'En inglés el adjetivo normalmente va antes del sustantivo que modifica. Esto se llama posición atributiva. A big house, an interesting book, a friendly teacher. En español muchos adjetivos van después: una casa grande, un libro interesante, una profesora simpática. Esta diferencia de orden es una de las principales fuentes de error.',
        'La segunda posición posible es después del verbo to be o de verbos copulativos (look, seem, feel). Esta se llama posición predicativa. The house is big. The book seems interesting. The teacher looks friendly. En esta posición tanto el inglés como el español coinciden en el orden.',
      ],
    },
    {
      heading: 'Los adjetivos más importantes en A1',
      paragraphs: [
        'Tamaño: big/large (grande), small/little (pequeño), long (largo), short (corto). Cualidad: good (bueno), bad (malo), beautiful (bonito), ugly (feo), clean (limpio), dirty (sucio), easy (fácil), difficult/hard (difícil). Temperatura y ambiente: hot (caliente/caluroso), cold (frío), warm (cálido). Velocidad: fast (rápido), slow (lento). Estado: new (nuevo), old (viejo/antiguo), young (joven).',
        'En A1 el objetivo no es memorizar todos los adjetivos posibles, sino aprender los más frecuentes y aplicarlos con confianza. Con big, small, good, bad, new, old, fast, slow, hot y cold puedes describir la mayoría de situaciones cotidianas.',
      ],
    },
    {
      heading: 'Errores frecuentes y sus correcciones',
      paragraphs: [
        'Error 1: "A house big" → A big house. Adjetivo antes del sustantivo. Error 2: "She is intelligents." → She is intelligent. Los adjetivos no llevan -s. Error 3: "He is a goods teacher." → He is a good teacher. Good no cambia. Error 4: "A beautifully city" → A beautiful city. Beautiful es adjetivo, no adverbio (-ly).',
      ],
      examples: [
        ['Incorrecto', 'She is a student intelligent.', 'Correcto', 'She is an intelligent student.'],
        ['Incorrecto', 'They are friendlys people.', 'Correcto', 'They are friendly people.'],
        ['Incorrecto', 'A good teachers.', 'Correcto', 'Good teachers. (sin artículo en plural genérico)'],
      ],
    },
  ],
  visual: {
    mode: 'adjective-position',
    teacherLens: 'El estudiante aprende que el adjetivo es una forma fija que va antes del sustantivo, sin cambiar por género ni número.',
    graphicPrompt: 'Adjetivo invariable + sustantivo → misma forma siempre.',
    scene: [['tall boy / tall girl', 'no gender change'], ['big city / big cities', 'no number change'], ['adjective + noun', 'always before noun']],
    learnerModes: ['visual: orden de palabras', 'analítico: invariabilidad', 'oral: descripciones rápidas'],
    practiceVerbs: ['Describe', 'Ordena', 'Completa', 'Clasifica', 'Corrige', 'Habla'],
    reviewFocus: ['posición antes del sustantivo', 'sin concordancia de género', 'sin -s de plural', 'adjetivos con to be'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del adjetivo para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Describiendo la academia',
            lines: [['David', 'WeLearn is a ___ school. Our classes are very good.']],
            options: ['good', 'goods', 'goode', 'biens'],
            answer: 'good',
            explain: 'Los adjetivos en inglés son invariables: a good school.',
          },
          {
            scene: 'Describiendo a una estudiante',
            lines: [['Teacher', 'Sofia is a very ___ student.']],
            options: ['intelligent', 'intelligents', 'intelligente', 'intelligentes'],
            answer: 'intelligent',
            explain: 'Adjetivo invariable: an intelligent student (sin -s ni cambios).',
          },
          {
            scene: 'Orden en la frase',
            lines: [['Student', 'I live in ___.']],
            options: ['a big city', 'a city big', 'city a big', 'big a city'],
            answer: 'a big city',
            explain: 'El adjetivo va antes del sustantivo: a big city.',
          },
          {
            scene: 'Describiendo el tiempo',
            lines: [['Weather app', 'Today is ___ in Bogotá.']],
            options: ['cold', 'colds', 'colder than', 'coldly'],
            answer: 'cold',
            explain: 'Adjetivo después de to be: it is cold.',
          },
          {
            scene: 'Describiendo personas',
            lines: [['Ana', 'My classmates are very ___.']],
            options: ['friendly', 'friendlys', 'friendlies', 'friend'],
            answer: 'friendly',
            explain: 'Friendly no cambia para el plural: they are friendly.',
          },
          {
            scene: 'Describiendo un objeto',
            lines: [['Carlos', 'I have a ___ phone. I bought it yesterday.']],
            options: ['new', 'news', 'newe', 'nuevo'],
            answer: 'new',
            explain: 'A new phone. Adjetivo invariable antes del sustantivo.',
          },
          {
            scene: 'Describiendo un lugar',
            lines: [['Tour guide', 'Medellín is a ___ and ___ city.']],
            options: ['beautiful / modern', 'beautifuls / moderns', 'beautifully / modernly', 'beauty / modernity'],
            answer: 'beautiful / modern',
            explain: 'Adjetivos predicativos (después de is) sin cambios: beautiful and modern.',
          },
          {
            scene: 'Tamaño',
            lines: [['Student', 'My room is ___. I only have a bed and a desk.']],
            options: ['small', 'smalls', 'little small', 'smaller'],
            answer: 'small',
            explain: 'My room is small. Adjetivo predicativo invariable.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos adjetivos en un texto',
        tag: '2 espacios',
        intro: 'Completa los dos adjetivos en la misma situación.',
        type: 'dual',
        items: [
          {
            scene: 'Describiendo la ciudad',
            lines: [['Tour guide', 'Medellín is a [[0]] city with [[1]] weather almost all year.']],
            blanks: [
              { options: ['beautiful', 'beautifuls', 'beautifully'], answer: 'beautiful', explain: 'A beautiful city. Adjetivo antes del sustantivo, invariable.' },
              { options: ['warm', 'warms', 'warmly'], answer: 'warm', explain: 'Warm weather. Adjetivo antes del sustantivo, invariable.' },
            ],
          },
          {
            scene: 'Hablando del profesor',
            lines: [['Student', 'Our teacher is very [[0]] and the classes are never [[1]].']],
            blanks: [
              { options: ['patient', 'patients', 'patiently'], answer: 'patient', explain: 'He is patient. Adjetivo predicativo, invariable.' },
              { options: ['boring', 'borings', 'boringly'], answer: 'boring', explain: 'The classes are boring. Adjetivo predicativo, invariable.' },
            ],
          },
          {
            scene: 'Describiendo una escuela',
            lines: [['Parent', 'WeLearn has a [[0]] building and [[1]] teachers.']],
            blanks: [
              { options: ['modern', 'moderns', 'modernly'], answer: 'modern', explain: 'A modern building. Adjetivo antes de sustantivo singular, sin cambio.' },
              { options: ['excellent', 'excellents', 'excellently'], answer: 'excellent', explain: 'Excellent teachers. Adjetivo antes de sustantivo plural, sin -s.' },
            ],
          },
          {
            scene: 'Contraste de temperaturas',
            lines: [['Traveler', 'Bogotá is [[0]] but Cartagena is very [[1]].']],
            blanks: [
              { options: ['cold', 'colds', 'coldly'], answer: 'cold', explain: 'Bogotá is cold. Adjetivo predicativo.' },
              { options: ['hot', 'hots', 'hotly'], answer: 'hot', explain: 'Cartagena is hot. Adjetivo predicativo.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Elige el adjetivo correcto para completar la descripción.',
        type: 'guidedText',
        scene: 'Descripción de WeLearn',
        text: 'WeLearn is a [[0]] academy in Bucaramanga. The classrooms are [[1]] and [[2]]. The teachers are very [[3]] and [[4]]. The method is [[5]] because it combines explanation with practice. Students say the classes are never [[6]].',
        blanks: [
          { options: ['great', 'greats', 'greatly'], answer: 'great', explain: 'A great academy. Adjetivo antes del sustantivo.' },
          { options: ['big', 'bigs', 'bigly'], answer: 'big', explain: 'The classrooms are big. Adjetivo predicativo.' },
          { options: ['clean', 'cleans', 'cleanly'], answer: 'clean', explain: 'Clean. Adjetivo predicativo.' },
          { options: ['experienced', 'experienceds', 'experience'], answer: 'experienced', explain: 'Very experienced. Adjetivo predicativo.' },
          { options: ['patient', 'patients', 'patiently'], answer: 'patient', explain: 'Patient. Adjetivo predicativo sin cambios.' },
          { options: ['effective', 'effectives', 'effectively'], answer: 'effective', explain: 'The method is effective. Predicativo.' },
          { options: ['boring', 'borings', 'boringly'], answer: 'boring', explain: 'Never boring. Predicativo.' },
        ],
      },
      {
        id: 'l4',
        title: 'Texto libre',
        tag: 'Sin opciones',
        intro: 'Escribe el adjetivo correcto (¡sin añadir -s ni cambios de género!) sin ayuda.',
        type: 'freeText',
        scene: 'Mi ciudad en Colombia',
        text: 'My city is [[0]] (large). It has [[1]] (beautiful) parks and [[2]] (modern) buildings. The people are very [[3]] (friendly). The weather is [[4]] (warm) most of the year. It is a [[5]] (great) place to live.',
        blanks: [
          { answer: 'large', explain: 'My city is large. Predicativo, invariable.' },
          { answer: 'beautiful', explain: 'Beautiful parks. Atributivo antes del sustantivo plural, sin -s.' },
          { answer: 'modern', explain: 'Modern buildings. Atributivo, sin cambios.' },
          { answer: 'friendly', explain: 'They are friendly. Predicativo, sin -s.' },
          { answer: 'warm', explain: 'The weather is warm. Predicativo.' },
          { answer: 'great', explain: 'A great place. Atributivo singular.' },
        ],
      },
      {
        id: 'l5',
        title: 'Describiendo personas y lugares',
        tag: 'Producción',
        intro: 'Escribe la descripción completa usando los adjetivos correctamente.',
        type: 'write',
        items: [
          {
            scene: 'Describiendo a tu profesor',
            prompt: 'Escribe: My teacher is patient / young / good.',
            answer: 'My teacher is patient, young and good.',
            accepted: ['my teacher is patient young and good', 'my teacher is patient, young, and good'],
            explain: 'Adjetivos predicativos (después de is), invariables.',
          },
          {
            scene: 'Describiendo tu ciudad',
            prompt: 'Escribe: I live in a big / beautiful / modern city.',
            answer: 'I live in a big, beautiful, modern city.',
            accepted: ['i live in a big beautiful modern city', 'i live in a big, beautiful, modern city'],
            explain: 'Tres adjetivos atributivos antes del sustantivo.',
          },
          {
            scene: 'Describiendo estudiantes',
            prompt: 'Escribe: The students are intelligent and hard-working.',
            answer: 'The students are intelligent and hard-working.',
            accepted: ['the students are intelligent and hard-working', 'the students are intelligent and hardworking'],
            explain: 'Adjetivos predicativos en plural, sin -s.',
          },
          {
            scene: 'Describiendo un objeto',
            prompt: 'Escribe: I have a new and fast computer.',
            answer: 'I have a new and fast computer.',
            accepted: ['i have a new and fast computer'],
            explain: 'Dos adjetivos atributivos antes del sustantivo singular.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión de descripción',
        tag: 'Reto final',
        intro: 'Describe personas, lugares y objetos reales usando adjetivos correctamente.',
        type: 'write',
        items: [
          {
            scene: 'Tu escuela',
            prompt: 'Describe WeLearn in two sentences using two adjectives each.',
            answer: 'WeLearn is a great and modern school. The teachers are patient and excellent.',
            accepted: ['welearn is a great modern school the teachers are patient and excellent', 'welearn is a small but excellent school the classrooms are clean and comfortable'],
            explain: 'Adjetivos atributivos (antes del sustantivo) y predicativos (después de to be).',
          },
          {
            scene: 'Tu ciudad',
            prompt: 'Describe your city: My city is ___ and ___. It has ___ ___.',
            answer: 'My city is big and beautiful. It has modern buildings.',
            accepted: ['my city is big and beautiful it has modern buildings', 'my city is warm and friendly it has beautiful parks'],
            explain: 'is + predicativo; has + atributivo + sustantivo.',
          },
          {
            scene: 'Una persona que admiras',
            prompt: 'Describe a person you admire: He/She is ___ and ___. He/She is a ___ person.',
            answer: 'She is intelligent and kind. She is a great person.',
            accepted: ['she is intelligent and kind she is a great person', 'he is hardworking and patient he is a wonderful person'],
            explain: 'Adjetivos predicativos y atributivos, todos invariables.',
          },
        ],
      },
    ],
  },
}

export default topic
