import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'demonstratives',
  order: '12',
  color: '#7c3aed',
  category: 'Nouns',
  level: 'A1',
  title: 'Demostrativos en inglés A1',
  shortTitle: 'Demonstratives',
  metaTitle: 'Demostrativos en inglés A1 | this, that, these, those — guía para hispanohablantes',
  description: 'Aprende a usar this, that, these y those con explicación para hispanohablantes, reglas de distancia y número, y práctica progresiva de 6 niveles.',
  lead: 'En español los demostrativos tienen tres distancias: este/esta, ese/esa, aquel/aquella. En inglés solo hay dos: this/these (cerca) y that/those (lejos). La simplificación de distancias es una buena noticia, pero la concordancia singular/plural sí es obligatoria.',
  outcomes: [
    'Usar this y these para objetos cercanos (singular y plural).',
    'Usar that y those para objetos lejanos (singular y plural).',
    'Evitar confundir singular y plural en contextos reales.',
  ],
  guide: {
    goal: 'Elegir el demostrativo correcto según distancia y número sin dudar.',
    model: 'Dos preguntas: ¿cerca o lejos? → this/that. ¿Uno o varios? → singular/plural. This=cerca+singular, these=cerca+plural, that=lejos+singular, those=lejos+plural.',
    formula: 'this/that + noun (singular) | these/those + noun (plural)',
    decisions: [
      'this → cerca + singular: this book, this person.',
      'these → cerca + plural: these books, these people.',
      'that → lejos + singular: that car, that building.',
      'those → lejos + plural: those cars, those buildings.',
    ],
    table: [
      ['Distancia', 'Singular', 'Plural'],
      ['cerca (here)', 'this', 'these'],
      ['lejos (there)', 'that', 'those'],
    ],
    mistakes: [
      '"This books are new." → These books are new. Books es plural: these.',
      '"Those book is interesting." → That book is interesting. Book es singular: that.',
      'Confundir that (demostrativo) con that (conjunción): I know that she is here.',
    ],
  },
  seo: [
    {
      heading: 'Demostrativos en inglés vs español: dos distancias en vez de tres',
      paragraphs: [
        'En español los demostrativos tienen tres niveles de distancia: este/esta/esto (muy cerca, junto al hablante), ese/esa/eso (un poco más lejos, cerca del oyente), aquel/aquella/aquello (lejos de ambos). En inglés el sistema es binario: this/these para lo que está cerca del hablante, that/those para lo que está lejos. Este (cerca) y ese o aquel (lejos) se fusionan en that.',
        'Además, en español los demostrativos concuerdan en género y número: este libro, esta mesa, estos libros, estas mesas. En inglés no hay concordancia de género: solo de número. This book, this table, these books, these tables. La simplificación del género es una ventaja; la concordancia de número es el único punto a vigilar.',
      ],
    },
    {
      heading: 'this vs these / that vs those: la regla del número',
      paragraphs: [
        'This y that son singulares. These y those son sus plurales respectivos. This → these, that → those. La relación es directa: cuando el sustantivo es singular usas this o that; cuando es plural usas these o those. El error más frecuente es usar this con un sustantivo plural: "This students are great" → These students are great.',
        'Una forma de memorizar los pares: this/these comparten el inicio "th" y la "is"/"ese" → this (singular = corto), these (plural = una e extra). That/those → that tiene 4 letras, those tiene 5 → plural más grande. En la práctica, lo mejor es conectar el demostrativo con el verbo: this/that + is, these/those + are.',
      ],
      table: [
        ['Demostrativo', 'Número', 'Con verbo to be', 'Ejemplo'],
        ['this', 'singular', 'this is', 'This is my book.'],
        ['these', 'plural', 'these are', 'These are my books.'],
        ['that', 'singular', 'that is', 'That is the school.'],
        ['those', 'plural', 'those are', 'Those are my friends.'],
      ],
    },
    {
      heading: 'Usos cotidianos de los demostrativos en A1',
      paragraphs: [
        'Presentaciones: This is my teacher, David. That is my classmate Ana. These are my notes. Señalando objetos: This is my phone. That is your book on the desk. Comercio: How much is this? Those shoes are expensive. En un aula: These exercises are easy. That board is hard to read from here.',
        'En inglés hablado también se usa this para introducir algo o alguien por teléfono: Hi, this is Carlos. Y that para referirse a algo que acaba de suceder: That was great! Was that your teacher?',
      ],
    },
    {
      heading: 'Errores frecuentes y sus correcciones',
      paragraphs: [
        'Error 1: "This students are friendly." → These students are friendly. Students es plural: these. Error 2: "Those book is old." → That book is old. Book es singular: that. Error 3: "These is my notebook." → This is my notebook. Singular: this.',
      ],
      examples: [
        ['Incorrecto', 'This books are new.', 'Correcto', 'These books are new.'],
        ['Incorrecto', 'Those student is my friend.', 'Correcto', 'That student is my friend.'],
        ['Incorrecto', 'These is a great idea.', 'Correcto', 'This is a great idea.'],
      ],
    },
  ],
  visual: {
    mode: 'distance-grid',
    teacherLens: 'El estudiante aprende a hacer dos preguntas en secuencia: distancia y número.',
    graphicPrompt: '¿Cerca o lejos? + ¿singular o plural? → elige el demostrativo.',
    scene: [['this book', 'near + singular'], ['these books', 'near + plural'], ['that car / those cars', 'far + sing/pl']],
    learnerModes: ['visual: tabla 2×2', 'analítico: distancia + número', 'oral: señalar objetos'],
    practiceVerbs: ['Señala', 'Clasifica', 'Completa', 'Describe', 'Corrige', 'Presenta'],
    reviewFocus: ['this vs these (número)', 'that vs those (número)', 'near vs far (distancia)', 'concordancia con to be'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige el demostrativo correcto para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Mostrando tu libro',
            lines: [['Carlos', '___ is my English textbook. (pointing to the book in his hand)']],
            options: ['This', 'These', 'That', 'Those'],
            answer: 'This',
            explain: 'Cerca + singular: This is my textbook.',
          },
          {
            scene: 'Señalando a compañeros cercanos',
            lines: [['Teacher', '___ are the new students in group A1. (pointing to students nearby)']],
            options: ['This', 'These', 'That', 'Those'],
            answer: 'These',
            explain: 'Cerca + plural: These are the new students.',
          },
          {
            scene: 'Señalando un edificio lejano',
            lines: [['Guide', '___ is the WeLearn building over there.']],
            options: ['This', 'These', 'That', 'Those'],
            answer: 'That',
            explain: 'Lejos + singular: That is the building.',
          },
          {
            scene: 'Señalando personas lejanas',
            lines: [['Ana', '___ are my classmates from the B1 group. (pointing across the room)']],
            options: ['This', 'These', 'That', 'Those'],
            answer: 'Those',
            explain: 'Lejos + plural: Those are my classmates.',
          },
          {
            scene: 'Preguntando el precio',
            lines: [['Shopper', 'Excuse me, how much is ___ watch?  (pointing to one watch right in front)']],
            options: ['this', 'these', 'that', 'those'],
            answer: 'this',
            explain: 'Cerca + singular: how much is this watch?',
          },
          {
            scene: 'Señalando libros en el estante',
            lines: [['Student', '___ books on that shelf look very interesting.']],
            options: ['This', 'These', 'That', 'Those'],
            answer: 'Those',
            explain: 'Los libros están en un estante lejano + plural: Those books.',
          },
          {
            scene: 'Presentación por teléfono',
            lines: [['Carlos', 'Hello, ___ is Carlos calling from WeLearn.']],
            options: ['this', 'these', 'that', 'those'],
            answer: 'this',
            explain: 'Al presentarse por teléfono: This is Carlos. (convención fija)',
          },
          {
            scene: 'Comentando algo reciente',
            lines: [['Sofia', '___ was a really interesting English class!']],
            options: ['This', 'These', 'That', 'Those'],
            answer: 'That',
            explain: 'La clase ya terminó (referencia a algo pasado/alejado): That was great.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos demostrativos en un diálogo',
        tag: '2 espacios',
        intro: 'Completa los dos demostrativos en la misma situación.',
        type: 'dual',
        items: [
          {
            scene: 'En la librería',
            lines: [['Customer', '[[0]] book in my hand is for A1. [[1]] books on the top shelf look like B2.']],
            blanks: [
              { options: ['This', 'These', 'That', 'Those'], answer: 'This', explain: 'En la mano = cerca + singular: This book.' },
              { options: ['This', 'These', 'That', 'Those'], answer: 'Those', explain: 'En el estante arriba = lejos + plural: Those books.' },
            ],
          },
          {
            scene: 'Presentando personas',
            lines: [['David', '[[0]] is Zhanna, my co-director. [[1]] are our star students from group A1.']],
            blanks: [
              { options: ['This', 'These', 'That', 'Those'], answer: 'This', explain: 'Presentando a alguien cercano singular: This is Zhanna.' },
              { options: ['This', 'These', 'That', 'Those'], answer: 'These', explain: 'Presentando a un grupo cercano: These are our students.' },
            ],
          },
          {
            scene: 'En el aula',
            lines: [['Teacher', '[[0]] exercises are easy. [[1]] test on Friday will be harder.']],
            blanks: [
              { options: ['This', 'These', 'That', 'Those'], answer: 'These', explain: 'Los ejercicios actuales, en la hoja = cerca + plural: These exercises.' },
              { options: ['This', 'These', 'That', 'Those'], answer: 'That', explain: 'El examen del viernes = lejos en el tiempo + singular: That test.' },
            ],
          },
          {
            scene: 'Hablando de distancias',
            lines: [['Sofia', '[[0]] café right here is my favourite. [[1]] restaurants across the street are too expensive.']],
            blanks: [
              { options: ['This', 'These', 'That', 'Those'], answer: 'This', explain: 'Café aquí mismo = cerca + singular: This café.' },
              { options: ['This', 'These', 'That', 'Those'], answer: 'Those', explain: 'Restaurantes al otro lado = lejos + plural: Those restaurants.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Elige el demostrativo correcto para completar la descripción de la academia.',
        type: 'guidedText',
        scene: 'Recorrido por WeLearn',
        text: 'Welcome to WeLearn! [[0]] building is our main location. [[1]] room on the left is the A1 classroom. [[2]] chairs near the window are very comfortable. [[3]] whiteboard at the back needs cleaning. [[4]] students right here are in group A1. [[5]] building across the street is the library. [[6]] books on the table are for today\'s class.',
        blanks: [
          { options: ['This', 'These', 'That', 'Those'], answer: 'This', explain: 'Estamos en el edificio → cerca + singular: This building.' },
          { options: ['This', 'These', 'That', 'Those'], answer: 'This', explain: 'La sala a la izquierda está cerca → cerca + singular: This room.' },
          { options: ['This', 'These', 'That', 'Those'], answer: 'These', explain: 'Las sillas junto a la ventana, cerca → cerca + plural: These chairs.' },
          { options: ['This', 'These', 'That', 'Those'], answer: 'That', explain: 'La pizarra al fondo, lejos → lejos + singular: That whiteboard.' },
          { options: ['This', 'These', 'That', 'Those'], answer: 'These', explain: 'Los estudiantes justo aquí → cerca + plural: These students.' },
          { options: ['This', 'These', 'That', 'Those'], answer: 'That', explain: 'El edificio al otro lado → lejos + singular: That building.' },
          { options: ['This', 'These', 'That', 'Those'], answer: 'These', explain: 'Los libros sobre la mesa, aquí → cerca + plural: These books.' },
        ],
      },
      {
        id: 'l4',
        title: 'Texto libre',
        tag: 'Sin opciones',
        intro: 'Escribe el demostrativo correcto sin ayuda.',
        type: 'freeText',
        scene: 'Describiendo el salón de clases',
        text: '[[0]] pen in my hand is blue. [[1]] notebooks on my desk are new. [[2]] clock on the wall is correct. [[3]] students next to me are my study partners. [[4]] board at the front is easy to read.',
        blanks: [
          { answer: 'This', accepted: ['this'], explain: 'En la mano → cerca + singular: This pen.' },
          { answer: 'These', accepted: ['these'], explain: 'En mi escritorio → cerca + plural: These notebooks.' },
          { answer: 'That', accepted: ['that'], explain: 'En la pared → lejos + singular: That clock.' },
          { answer: 'These', accepted: ['these'], explain: 'A mi lado → cerca + plural: These students.' },
          { answer: 'That', accepted: ['that'], explain: 'Al frente → lejos + singular: That board.' },
        ],
      },
      {
        id: 'l5',
        title: 'Corrección de errores',
        tag: 'Producción',
        intro: 'Corrige el demostrativo incorrecto en cada frase.',
        type: 'write',
        items: [
          {
            scene: 'Número incorrecto',
            prompt: 'Corrige: This exercises are difficult.',
            answer: 'These exercises are difficult.',
            accepted: ['these exercises are difficult'],
            explain: 'Exercises es plural: These exercises.',
          },
          {
            scene: 'Número incorrecto (lejos)',
            prompt: 'Corrige: Those student over there is very talented.',
            answer: 'That student over there is very talented.',
            accepted: ['that student over there is very talented'],
            explain: 'Student es singular: That student.',
          },
          {
            scene: 'Distancia incorrecta',
            prompt: 'Corrige: That book in my hand is for A1. (El libro está en tu mano.)',
            answer: 'This book in my hand is for A1.',
            accepted: ['this book in my hand is for a1'],
            explain: 'En tu mano = cerca: This book.',
          },
          {
            scene: 'Presentación',
            prompt: 'Corrige: These is my teacher, David. (Un solo profesor.)',
            answer: 'This is my teacher, David.',
            accepted: ['this is my teacher david', 'this is my teacher, david'],
            explain: 'Singular: This is my teacher.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión de presentación',
        tag: 'Reto final',
        intro: 'Usa demostrativos para presentar personas y objetos en contexto real.',
        type: 'write',
        items: [
          {
            scene: 'Presentando a un compañero cercano',
            prompt: 'Introduce the person next to you: ___ is my classmate, Carlos.',
            answer: 'This is my classmate, Carlos.',
            accepted: ['this is my classmate carlos', 'this is my classmate, carlos.'],
            explain: 'Persona cercana + singular: This is…',
          },
          {
            scene: 'Describiendo objetos del aula',
            prompt: 'Describe books on your desk: ___ books are for today\'s class.',
            answer: 'These books are for today\'s class.',
            accepted: ['these books are for today\'s class', 'these books are for todays class'],
            explain: 'En tu escritorio, cerca + plural: These books.',
          },
          {
            scene: 'Señalando algo lejano',
            prompt: 'Point to a building far away: ___ building over there is the WeLearn campus.',
            answer: 'That building over there is the WeLearn campus.',
            accepted: ['that building over there is the welearn campus'],
            explain: 'Lejos + singular: That building.',
          },
        ],
      },
    ],
  },
}

export default topic
