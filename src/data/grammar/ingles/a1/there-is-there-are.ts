import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'there-is-there-are',
  order: '09',
  color: '#ea580c',
  category: 'Structure',
  level: 'A1',
  title: 'There is / There are en inglés A1',
  shortTitle: 'There is / There are',
  metaTitle: 'There is / There are en inglés A1 | Guía para hispanohablantes',
  description: 'Aprende a usar there is y there are para describir existencia, incluyendo negaciones e interrogaciones, con explicación orientada al hispanohablante y práctica progresiva de 6 niveles.',
  lead: 'En español "hay" sirve para todo: hay un libro, hay dos libros. En inglés la estructura cambia según si la cantidad es singular o plural: there is para uno, there are para más de uno. Este cambio que el español no exige es el principal punto de error para hispanohablantes.',
  outcomes: [
    'Usar there is (singular) y there are (plural) para describir existencia.',
    'Construir preguntas con is there? y are there? y responderlas.',
    'Formar negaciones con there isn\'t y there aren\'t.',
  ],
  guide: {
    goal: 'Describir qué hay en un lugar o situación usando la estructura correcta según el número.',
    model: '"Hay" en español es invariable. En inglés debes mirar si lo que hay es singular → there is, o plural → there are.',
    formula: 'There is + a/an + noun (singular) | There are + number/some + noun (plural)',
    decisions: [
      'There is → hay uno (singular): There is a book.',
      'There are → hay varios (plural): There are three books.',
      'Negativo: There isn\'t / There aren\'t.',
      'Pregunta: Is there? / Are there?',
      'Contracción: There\'s (there is) — muy frecuente en conversación.',
    ],
    table: [
      ['Forma', 'Singular', 'Plural'],
      ['Afirmativo', 'There is a student.', 'There are twenty students.'],
      ['Negativo', 'There isn\'t a parking lot.', 'There aren\'t any chairs.'],
      ['Pregunta', 'Is there a café nearby?', 'Are there any bookshops?'],
      ['Respuesta', 'Yes, there is. / No, there isn\'t.', 'Yes, there are. / No, there aren\'t.'],
    ],
    mistakes: [
      '"There are a book on the table." → There is a book. Book es singular.',
      '"There is two chairs." → There are two chairs. Two indica plural.',
      '"Is there books?" → Are there books? Libros es plural.',
    ],
  },
  seo: [
    {
      heading: 'Hay en español vs there is/there are en inglés',
      paragraphs: [
        'En español el verbo haber en su forma impersonal hay es invariable: hay una persona, hay diez personas, hay mucha gente. Esta comodidad del español es la raíz del error en inglés. En inglés la estructura there is / there are concuerda con el sustantivo que sigue: singular → there is, plural → there are. No existe una forma única que cubra ambos.',
        'Para un estudiante colombiano el reto no es memorizar la estructura: es recordar que hay que mirar lo que viene después y decidir si es singular o plural. Con la práctica esta verificación se vuelve automática.',
      ],
    },
    {
      heading: 'Afirmativo: there is vs there are',
      paragraphs: [
        'There is (o su contracción there\'s) se usa con sustantivos singulares o incontables. There is a bank near here. There\'s a problem. There is some water in the glass. There are se usa con sustantivos plurales. There are three students in the room. There are some books on the table.',
        'Cuando hay una lista de cosas y la primera es singular, el inglés normalmente usa there is: There is a pen and two notebooks on the desk. Pero cuando la primera es plural: There are two notebooks and a pen on the desk. En A1 conviene practicar los casos básicos: una cosa → there is, varias cosas → there are.',
      ],
    },
    {
      heading: 'Negativo e interrogativo: la misma lógica que to be',
      paragraphs: [
        'Para negar: There is not (there isn\'t) / There are not (there aren\'t). There isn\'t a supermarket nearby. There aren\'t any seats available. Any es la palabra que acompaña la negación (no some), similar a cómo en español no hay ningún.',
        'Para preguntar: invierte there y is/are. Is there a pharmacy near here? Are there any vegetarian options? Las respuestas cortas usan the same structure: Yes, there is. / No, there isn\'t. / Yes, there are. / No, there aren\'t.',
      ],
    },
    {
      heading: 'Contextos reales en A1',
      paragraphs: [
        'Describiendo un aula: There is a whiteboard at the front. There are twenty chairs. There are two windows. Is there a projector? Yes, there is.',
        'Preguntando por un lugar: Is there a café nearby? Are there any ATMs in this area? There isn\'t a pharmacy on this street but there are two on the next block.',
        'Describiendo una ciudad: In Medellín there are many parks. There is a famous cable car. There aren\'t many cold days.',
      ],
    },
    {
      heading: 'Errores frecuentes y sus correcciones',
      paragraphs: [
        'Error 1: "There are a student in the classroom." → There is a student. Student es singular. Error 2: "There is many people here." → There are many people here. Many people es plural. Error 3: "Is there books in the library?" → Are there books in the library? Books es plural → Are there.',
      ],
      examples: [
        ['Incorrecto', 'There are a problem.', 'Correcto', 'There is a problem.'],
        ['Incorrecto', 'There is five students.', 'Correcto', 'There are five students.'],
        ['Incorrecto', 'Is there chairs in the room?', 'Correcto', 'Are there chairs in the room?'],
      ],
    },
  ],
  visual: {
    mode: 'existence-map',
    teacherLens: 'El estudiante aprende a mirar qué hay (singular o plural) antes de elegir is o are.',
    graphicPrompt: '¿Singular o plural? → elige there is o there are → completa la frase.',
    scene: [['a book → there is', 'singular'], ['books → there are', 'plural'], ['any? → is there? / are there?', 'question']],
    learnerModes: ['visual: tabla singular/plural', 'analítico: concordancia', 'oral: describir espacios'],
    practiceVerbs: ['Describe', 'Identifica', 'Pregunta', 'Niega', 'Completa', 'Responde'],
    reviewFocus: ['is vs are según número', 'isn\'t / aren\'t', 'Is there? / Are there?', 'respuestas cortas'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta (there is / there are) para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Describiendo el aula',
            lines: [['Teacher', '___ a whiteboard at the front of the room.']],
            options: ['There is', 'There are', 'Is there', 'Are there'],
            answer: 'There is',
            explain: 'A whiteboard es singular → There is.',
          },
          {
            scene: 'Contando estudiantes',
            lines: [['Director', '___ twenty students in this A1 class.']],
            options: ['There is', 'There are', 'Is there', 'Are there'],
            answer: 'There are',
            explain: 'Twenty students es plural → There are.',
          },
          {
            scene: 'Preguntando por servicio',
            lines: [['Visitor', 'Excuse me, ___ a café nearby?']],
            options: ['There is', 'There are', 'Is there', 'Are there'],
            answer: 'Is there',
            explain: 'Pregunta sobre algo singular (a café) → Is there?',
          },
          {
            scene: 'Negando existencia',
            lines: [['Student', '___ any chairs left in the classroom.']],
            options: ['There isn\'t', 'There aren\'t', 'Is there', 'Are there'],
            answer: 'There aren\'t',
            explain: 'Any chairs es plural → There aren\'t.',
          },
          {
            scene: 'En el vecindario',
            lines: [['Neighbor', '___ three supermarkets in this neighborhood.']],
            options: ['There is', 'There are', 'Is there', 'Are there'],
            answer: 'There are',
            explain: 'Three supermarkets es plural → There are.',
          },
          {
            scene: 'Buscar una farmacia',
            lines: [['Tourist', 'Excuse me, ___ a pharmacy on this street?'], ['Local', 'Yes, there is!']],
            options: ['There is', 'There are', 'Is there', 'Are there'],
            answer: 'Is there',
            explain: 'Pregunta sobre algo singular (a pharmacy) → Is there?',
          },
          {
            scene: 'Negando problema',
            lines: [['Teacher', "Don't worry. ___ a problem with your registration."]],
            options: ['There is', 'There isn\'t', 'There are', 'There aren\'t'],
            answer: 'There isn\'t',
            explain: 'Negando algo singular (a problem) → There isn\'t.',
          },
          {
            scene: 'Pregunta plural',
            lines: [['Student', '___ any English bookshops near the school?']],
            options: ['There is', 'There are', 'Is there', 'Are there'],
            answer: 'Are there',
            explain: 'Pregunta sobre algo plural (bookshops) → Are there?',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos frases en un diálogo',
        tag: '2 espacios',
        intro: 'Completa las dos estructuras en el mismo contexto.',
        type: 'dual',
        items: [
          {
            scene: 'Describiendo la clase',
            lines: [['Teacher', '[[0]] a projector in this room and [[1]] twenty desks for the students.']],
            blanks: [
              { options: ['There is', 'There are', 'Is there', 'Are there'], answer: 'There is', explain: 'A projector es singular → There is.' },
              { options: ['there is', 'there are', 'is there', 'are there'], answer: 'there are', explain: 'Twenty desks es plural → there are.' },
            ],
          },
          {
            scene: 'Buscando restaurante',
            lines: [['Tourist', '[[0]] any vegetarian restaurants here?'], ['Local', 'Yes! [[1]] a great one on Main Street.']],
            blanks: [
              { options: ['There is', 'There are', 'Is there', 'Are there'], answer: 'Are there', explain: 'Pregunta sobre plural (restaurants) → Are there?' },
              { options: ['There is', 'There are', 'Is there', 'Are there'], answer: 'There is', explain: 'Respondiendo con singular (a great one) → There is.' },
            ],
          },
          {
            scene: 'Describiendo el apartamento',
            lines: [['Carlos', 'In my apartment [[0]] two bedrooms and [[1]] a small kitchen.']],
            blanks: [
              { options: ['there is', 'there are', 'is there', 'are there'], answer: 'there are', explain: 'Two bedrooms es plural → there are.' },
              { options: ['there is', 'there are', 'is there', 'are there'], answer: 'there is', explain: 'A small kitchen es singular → there is.' },
            ],
          },
          {
            scene: 'En el aeropuerto',
            lines: [['Traveler', '[[0]] any luggage lockers here?'], ['Staff', 'I\'m sorry, [[1]] any right now.']],
            blanks: [
              { options: ['There is', 'There are', 'Is there', 'Are there'], answer: 'Are there', explain: 'Pregunta sobre plural (luggage lockers) → Are there?' },
              { options: ['there isn\'t', 'there aren\'t', 'is there', 'are there'], answer: 'there aren\'t', explain: 'Respuesta negativa plural → there aren\'t.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Elige there is, there are, there isn\'t o there aren\'t para completar la descripción.',
        type: 'guidedText',
        scene: 'Descripción de la academia WeLearn',
        text: 'Welcome to WeLearn! [[0]] three classrooms on the first floor. [[1]] a reception area at the entrance. [[2]] a cafeteria in the building, but [[3]] a coffee machine. [[4]] many students from different cities. [[5]] any English books to borrow? Yes! [[6]] a small library on the second floor.',
        blanks: [
          { options: ['There is', 'There are', 'There isn\'t', 'There aren\'t'], answer: 'There are', explain: 'Three classrooms es plural → There are.' },
          { options: ['There is', 'There are', 'There isn\'t', 'There aren\'t'], answer: 'There is', explain: 'A reception area es singular → There is.' },
          { options: ['There is', 'There are', 'There isn\'t', 'There aren\'t'], answer: 'There isn\'t', explain: 'Negando algo singular (a cafeteria) → There isn\'t.' },
          { options: ['there is', 'there are', 'there isn\'t', 'there aren\'t'], answer: 'there is', explain: 'A coffee machine es singular → there is.' },
          { options: ['There is', 'There are', 'There isn\'t', 'There aren\'t'], answer: 'There are', explain: 'Many students es plural → There are.' },
          { options: ['There is', 'There are', 'Is there', 'Are there'], answer: 'Are there', explain: 'Pregunta sobre plural (English books) → Are there?' },
          { options: ['there is', 'there are', 'there isn\'t', 'there aren\'t'], answer: 'there is', explain: 'A small library es singular → there is.' },
        ],
      },
      {
        id: 'l4',
        title: 'Texto libre',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta (there is, there are, there isn\'t, there aren\'t) sin ayuda.',
        type: 'freeText',
        scene: 'Describiendo mi ciudad',
        text: 'My city is Medellín. [[0]] many beautiful parks. [[1]] a famous cable car. [[2]] any beaches, but [[3]] a lot of mountains. [[4]] many universities in the city.',
        blanks: [
          { answer: 'There are', accepted: ['there are'], explain: 'Many beautiful parks es plural → There are.' },
          { answer: 'There is', accepted: ['there is', 'There\'s', 'there\'s'], explain: 'A famous cable car es singular → There is.' },
          { answer: 'There aren\'t', accepted: ['there aren\'t', 'There aren\'t', 'There are not', 'there are not'], explain: 'Negando plural (beaches) → There aren\'t.' },
          { answer: 'there is', accepted: ['there is', 'there\'s'], explain: 'A lot of mountains puede ir con there are (mountains plural) o there is (a lot singular). Aceptamos ambos.' },
          { answer: 'There are', accepted: ['there are'], explain: 'Many universities es plural → There are.' },
        ],
      },
      {
        id: 'l5',
        title: 'Preguntas y respuestas',
        tag: 'Producción',
        intro: 'Escribe la pregunta o la respuesta usando there is / there are.',
        type: 'write',
        items: [
          {
            scene: 'Preguntando por parking',
            prompt: 'Ask: Is ___ a parking lot near the school?',
            answer: 'Is there a parking lot near the school?',
            accepted: ['is there a parking lot near the school', 'is there a parking lot near the school?'],
            explain: 'A parking lot es singular → Is there a...?',
          },
          {
            scene: 'Describiendo existencia',
            prompt: 'Say: There ___ three coffee shops on this street.',
            answer: 'There are three coffee shops on this street.',
            accepted: ['there are three coffee shops on this street'],
            explain: 'Three coffee shops es plural → There are.',
          },
          {
            scene: 'Negando',
            prompt: 'Say: ___ (no) any taxis available right now.',
            answer: 'There aren\'t any taxis available right now.',
            accepted: ['there aren\'t any taxis available right now', 'there are not any taxis available right now'],
            explain: 'Negando plural (taxis) → There aren\'t any.',
          },
          {
            scene: 'Respuesta corta',
            prompt: 'Answer: Are there any supermarkets near here? Yes, ___ .',
            answer: 'Yes, there are.',
            accepted: ['yes there are', 'yes, there are.', 'yes there are.'],
            explain: 'Respuesta corta afirmativa plural: Yes, there are.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión de conversación',
        tag: 'Reto final',
        intro: 'Describe un lugar usando there is / there are en contexto real.',
        type: 'write',
        items: [
          {
            scene: 'Describiendo tu barrio',
            prompt: 'Describe your neighborhood: ___ a park, ___ some shops, and ___ a school.',
            answer: 'There is a park, there are some shops, and there is a school.',
            accepted: ['there is a park there are some shops and there is a school', 'there\'s a park there are some shops and there\'s a school'],
            explain: 'A park y a school son singulares (there is); some shops es plural (there are).',
          },
          {
            scene: 'Negando lo que no hay',
            prompt: 'Say what\'s NOT in your building: ___ any elevator.',
            answer: 'There isn\'t any elevator.',
            accepted: ['there isn\'t any elevator', 'there is not any elevator', 'there isn\'t an elevator', 'there is no elevator'],
            explain: 'Elevator es singular → There isn\'t (any).',
          },
          {
            scene: 'Preguntando en la academia',
            prompt: 'Ask: ___ (is/are) any grammar books in the library?',
            answer: 'Are there any grammar books in the library?',
            accepted: ['are there any grammar books in the library', 'are there any grammar books in the library?'],
            explain: 'Grammar books es plural → Are there any...?',
          },
        ],
      },
    ],
  },
}

export default topic
