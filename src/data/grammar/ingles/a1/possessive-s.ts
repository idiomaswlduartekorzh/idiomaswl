import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'possessive-s',
  order: '23',
  color: '#0369a1',
  category: 'Nouns',
  level: 'A1',
  title: 'El genitivo sajón en inglés A1',
  shortTitle: 'Genitivo sajón (\'s)',
  metaTitle: 'Genitivo sajón en inglés A1 | David\'s book, My sister\'s car',
  description:
    'Aprende el genitivo sajón (\'s) en inglés A1 para expresar posesión entre personas. Usa David\'s book, my sister\'s car y the teacher\'s name correctamente.',
  lead: 'El genitivo sajón es la forma inglesa de expresar "el libro DE David" → David\'s book. Se forma añadiendo \'s al poseedor. Es diferente del it\'s (it is) y del plural (books). Solo se usa con personas, animales y grupos.',
  outcomes: [
    'Formar posesivos con \'s: David\'s book / my mother\'s phone.',
    'Distinguir \'s posesivo de is/has contraído y del plural.',
    'Usar el genitivo en oraciones sobre personas y relaciones.',
  ],
  guide: {
    goal: 'Expresar posesión usando el genitivo sajón (\'s) con personas y grupos.',
    model: 'David\'s class / Zhanna\'s students / my sister\'s car / the teacher\'s name',
    formula: 'Poseedor + \'s + cosa poseída',
    decisions: [
      'Singular: David\'s book. / my friend\'s phone. / the teacher\'s name.',
      'Plural irregular (men, children): men\'s shoes / children\'s books.',
      'Plural regular con -s: se añade solo el apóstrofe: the students\' books / my parents\' house.',
      'Con nombres propios: Carlos\'s car o Carlos\' car — ambos aceptados.',
      'NUNCA confundir: David\'s (posesivo) ≠ David\'s (contraction of "David is") — el contexto determina.',
    ],
    table: [
      ['Tipo de poseedor', 'Regla', 'Ejemplo A1'],
      ['Singular', 'nombre + \'s', 'David\'s phone / my sister\'s car'],
      ['Plural en -s', 'solo apóstrofe (\')', 'my parents\' house / the students\' books'],
      ['Plural irregular', '+ \'s', 'children\'s toys / men\'s clothing'],
    ],
    mistakes: [
      '"The book of David" ❌ (no existe en inglés cotidiano) → David\'s book ✓ — en inglés se invierte el orden.',
      '"Davids book" ❌ → David\'s book ✓ — el apóstrofe es obligatorio.',
      '"The students\'s books" ❌ → The students\' books ✓ — plural con -s: solo apóstrofe.',
    ],
  },
  seo: [
    {
      heading: 'Qué es el genitivo sajón y cómo se usa',
      paragraphs: [
        'El genitivo sajón (\'s) es la forma que usa el inglés para expresar posesión entre personas. En lugar de decir "el libro de David" como en español, en inglés se dice "David\'s book" — el poseedor primero, luego el apóstrofe + s, y finalmente la cosa poseída.',
        'Esta estructura es fundamental en A1 porque aparece constantemente: en presentaciones (my teacher\'s name is...), descripciones (my sister\'s house), y conversaciones cotidianas. Es una de las primeras diferencias estructurales que los hispanohablantes deben internalizar.',
      ],
    },
    {
      heading: 'Singular y plural: reglas del apóstrofe',
      paragraphs: [
        'Para poseedores en singular, la regla es sencilla: añade \'s al nombre. David → David\'s. My teacher → my teacher\'s. Para poseedores en plural que ya terminan en -s, solo se añade el apóstrofe sin s adicional: my parents → my parents\'. Los students → the students\' books.',
        'Para plurales irregulares (que no terminan en -s), se añade \'s como en singular: children → children\'s. Women → women\'s. Men → men\'s. Este es un caso especial que hay que memorizar.',
      ],
    },
    {
      heading: 'Diferencias: \'s posesivo, \'s = is, y plural con -s',
      paragraphs: [
        'Es importante no confundir tres usos del apóstrofe en inglés. El \'s posesivo (David\'s book = el libro de David). La contracción \'s de is (David\'s happy = David is happy). Y el plural regular NO usa apóstrofe: books, students, teachers — sin apóstrofe.',
        'En A1 la regla práctica es: ¿Viene antes de un sustantivo? → posesivo. ¿Viene antes de un adjetivo o verbo? → contracción de is. ¿Es el final de la palabra con -s? → plural sin apóstrofe.',
      ],
    },
  ],
  visual: {
    mode: 'table',
    teacherLens: 'El estudiante aprende a construir posesivos con \'s y a reconocer sus usos en contexto.',
    graphicPrompt: 'Diagrama: David \'s book → POSEEDOR + \'s + COSA POSEÍDA. Contraejemplos: books (plural) ≠ book\'s.',
    scene: [
      ['Poseedor singular', 'David\'s phone / Ana\'s notebook / the teacher\'s name'],
      ['Poseedor plural (-s)', 'my parents\' house / the students\' classroom'],
      ['Poseedor plural irregular', 'the children\'s toys / the men\'s team'],
      ['Contexto WeLearn', 'Zhanna\'s class / Carlos\'s progress / WeLearn\'s method'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['poseedor + \'s + cosa', 'plural -s solo apóstrofe', 'no confundir con plural', 'orden inverso al español'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento del genitivo',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del genitivo sajón.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando del libro del profesor',
            lines: [['Carlos', 'This is ___ grammar book.']],
            options: ['the teacher\'s', 'the teachers', 'the teacher of', 'the teachers\'s'],
            answer: 'the teacher\'s',
            explain: 'the teacher\'s grammar book — poseedor singular + \'s.',
          },
          {
            scene: 'El teléfono de Ana',
            lines: [['David', 'Is that ___ phone? She\'s looking for it.']],
            options: ['Ana\'s', 'Anas', 'Ana of', 'Ana\''],
            answer: 'Ana\'s',
            explain: 'Ana\'s phone — nombre propio singular + \'s.',
          },
          {
            scene: 'La clase de los estudiantes',
            lines: [['Teacher', 'This is the ___ classroom. (los estudiantes)']],
            options: ['students\'', 'student\'s', 'students\'s', 'students'],
            answer: 'students\'',
            explain: 'students\' classroom — plural en -s: solo apóstrofe.',
          },
          {
            scene: 'La casa de los padres de Carlos',
            lines: [['Carlos', 'My ___ house is in Medellín.']],
            options: ['parents\'', 'parent\'s', 'parents', 'parent of'],
            answer: 'parents\'',
            explain: 'parents\' house — plural en -s: solo apóstrofe.',
          },
          {
            scene: 'El nombre del profesor',
            lines: [['New student', 'What is ___ name?']],
            options: ['the teacher\'s', 'the teacher', 'the teachers\'', 'teacher of'],
            answer: 'the teacher\'s',
            explain: 'the teacher\'s name — poseedor singular.',
          },
          {
            scene: 'El método de WeLearn',
            lines: [['Student', '___ method is very effective.']],
            options: ['WeLearn\'s', 'WeLearn', 'WeLearn of', 'WeLearns'],
            answer: 'WeLearn\'s',
            explain: 'WeLearn\'s method — nombre de organización + \'s.',
          },
          {
            scene: 'Los juguetes de los niños',
            lines: [['Parent', 'These are the ___ toys. (los niños)']],
            options: ['children\'s', 'childrens\'', 'children', 'child\'s'],
            answer: 'children\'s',
            explain: 'children\'s toys — plural irregular + \'s.',
          },
          {
            scene: 'El coche de mi hermana',
            lines: [['Marco', '___ car is red. (mi hermana)']],
            options: ['My sister\'s', 'My sisters\'', 'My sister', 'My sister of'],
            answer: 'My sister\'s',
            explain: 'My sister\'s car — poseedor singular + \'s.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Posesivo en contexto',
        tag: '2 espacios',
        intro: 'Elige el poseedor y la forma \'s correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Hablando del profesor',
            lines: [['Ana', '[[0]] [[1]] is very helpful.']],
            blanks: [
              { options: ['David\'s', 'Davids', 'David'], answer: 'David\'s', explain: 'David\'s — poseedor + \'s.' },
              { options: ['class', 'classes', 'classroom'], answer: 'class', explain: 'David\'s class — la clase de David.' },
            ],
          },
          {
            scene: 'La directora académica',
            lines: [['Carlos', '[[0]] [[1]] is excellent.']],
            blanks: [
              { options: ['Zhanna\'s', 'Zhannas', 'Zhanna'], answer: 'Zhanna\'s', explain: 'Zhanna\'s — nombre propio + \'s.' },
              { options: ['teaching', 'teach', 'teacher'], answer: 'teaching', explain: 'Zhanna\'s teaching — la enseñanza de Zhanna.' },
            ],
          },
          {
            scene: 'Libro del compañero',
            lines: [['Teacher', 'Is this [[0]] [[1]]?']],
            blanks: [
              { options: ['Carlos\'s', 'Carlos', 'Carloss'], answer: 'Carlos\'s', explain: 'Carlos\'s — nombre en -s: Carlos\'s o Carlos\'.' },
              { options: ['notebook', 'notebooks', 'noting'], answer: 'notebook', explain: 'Carlos\'s notebook — el cuaderno de Carlos.' },
            ],
          },
          {
            scene: 'El progreso de los alumnos',
            lines: [['David', 'The [[0]] [[1]] is amazing this month.']],
            blanks: [
              { options: ['students\'', 'student\'s', 'students'], answer: 'students\'', explain: 'students\' — plural en -s, solo apóstrofe.' },
              { options: ['progress', 'progresses', 'progressing'], answer: 'progress', explain: 'students\' progress — el progreso de los estudiantes.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'En la clase de WeLearn',
        tag: 'Opciones',
        intro: 'Elige la forma posesiva correcta para completar el texto.',
        type: 'guidedText',
        scene: 'Descripción de la clase de inglés de WeLearn',
        text: 'This is [[0]] classroom. [[1]] name is Zhanna and she is very patient. The [[2]] notebooks are on the desks. [[3]] phone is off — she follows the rules. [[4]] method is based on 17 steps. [[5]] homework is very important.',
        blanks: [
          { options: ['WeLearn\'s', 'WeLearn', 'WeLearns'], answer: 'WeLearn\'s', explain: 'WeLearn\'s classroom — poseedor + \'s.' },
          { options: ['The teacher\'s', 'The teacher', 'Teachers\'s'], answer: 'The teacher\'s', explain: 'The teacher\'s name — singular.' },
          { options: ['students\'', 'student\'s', 'students\'s'], answer: 'students\'', explain: 'students\' notebooks — plural en -s.' },
          { options: ['Ana\'s', 'Anas', 'Ana'], answer: 'Ana\'s', explain: 'Ana\'s phone — nombre propio + \'s.' },
          { options: ['David\'s', 'Davids', 'David'], answer: 'David\'s', explain: 'David\'s method — nombre propio + \'s.' },
          { options: ['The class\'s', 'The class\'', 'The class'], answer: 'The class\'s', explain: 'The class\'s homework — singular: class\'s.' },
        ],
      },
      {
        id: 'l4',
        title: 'Relaciones y posesiones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma posesiva correcta.',
        type: 'freeText',
        scene: 'Describiendo a personas y sus posesiones en clase',
        text: '___ (David) class is at 7 p.m. I love ___ (my mother) cooking. The ___ (students) exam is on Friday. ___ (Zhanna) explanation is always clear. ___ (my brother) car is blue. The ___ (children) books are on the shelf.',
        blanks: [
          { answer: 'David\'s', accepted: ["David's"], explain: 'David\'s class — nombre propio + \'s.' },
          { answer: 'my mother\'s', accepted: ["my mother's", "mother's"], explain: 'my mother\'s cooking — singular + \'s.' },
          { answer: 'students\'', accepted: ["students'"], explain: 'students\' exam — plural en -s: solo apóstrofe.' },
          { answer: 'Zhanna\'s', accepted: ["Zhanna's"], explain: 'Zhanna\'s explanation — nombre propio + \'s.' },
          { answer: 'my brother\'s', accepted: ["my brother's", "brother's"], explain: 'my brother\'s car — singular + \'s.' },
          { answer: 'children\'s', accepted: ["children's"], explain: 'children\'s books — plural irregular + \'s.' },
        ],
      },
      {
        id: 'l5',
        title: 'Construyendo frases posesivas',
        tag: 'Producción',
        intro: 'Escribe la frase completa usando el genitivo sajón.',
        type: 'write',
        items: [
          {
            scene: 'El libro del profesor',
            prompt: 'Escribe: "El libro del profesor es interesante." (The teacher\'s / book / is / interesting)',
            answer: 'The teacher\'s book is interesting.',
            accepted: ["the teacher's book is interesting", "the teacher's book is interesting."],
            explain: 'The teacher\'s book — poseedor + \'s + cosa poseída.',
          },
          {
            scene: 'El teléfono de Ana',
            prompt: 'Escribe: "El teléfono de Ana es nuevo." (Ana\'s / phone / is / new)',
            answer: 'Ana\'s phone is new.',
            accepted: ["ana's phone is new", "ana's phone is new."],
            explain: 'Ana\'s phone — nombre propio + \'s.',
          },
          {
            scene: 'Los cuadernos de los estudiantes',
            prompt: 'Escribe: "Los cuadernos de los estudiantes están en los escritorios." (students\' / notebooks / are / on the desks)',
            answer: 'The students\' notebooks are on the desks.',
            accepted: ["the students' notebooks are on the desks", "students' notebooks are on the desks"],
            explain: 'students\' notebooks — plural en -s: solo apóstrofe.',
          },
          {
            scene: 'La clase de David',
            prompt: 'Escribe: "La clase de David empieza a las 7." (David\'s / class / starts / at 7)',
            answer: 'David\'s class starts at 7.',
            accepted: ["david's class starts at 7", "david's class starts at 7."],
            explain: 'David\'s class — nombre propio + \'s.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Mi mundo en inglés',
        tag: 'Reto final',
        intro: 'Escribe sobre personas y sus posesiones usando el genitivo sajón.',
        type: 'write',
        items: [
          {
            scene: 'Alguien de tu familia',
            prompt: 'Write 2 sentences about a family member\'s possessions: My [family]\'s ___ is ___.',
            answer: 'My sister\'s phone is very old. My dad\'s car is black.',
            accepted: ["'s"],
            explain: 'My [person]\'s [thing] is [adjective]. Use \'s for all singular possessors.',
          },
          {
            scene: 'Tu profesor',
            prompt: 'Write about your teacher: My teacher\'s ___ is ___.',
            answer: 'My teacher\'s name is Zhanna.',
            accepted: ["my teacher's"],
            explain: 'My teacher\'s name/class/explanation is... — singular possessive.',
          },
          {
            scene: 'Tu clase',
            prompt: 'Write about your class: My classmates\' ___ is/are ___.',
            answer: 'My classmates\' pronunciation is getting better.',
            accepted: ["classmates'", "classmates's"],
            explain: 'My classmates\' [thing] — plural ending in -s: only apostrophe.',
          },
        ],
      },
    ],
  },
}

export default topic
