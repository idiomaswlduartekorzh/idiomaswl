import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'relative-clauses-b1',
  order: '10',
  color: '#dc2626',
  category: 'Structure',
  level: 'B1',
  title: 'Oraciones de Relativo en Inglés B1 — Defining vs Non-Defining',
  shortTitle: 'Relative Clauses',
  metaTitle: 'Relative Clauses B1 — Who, Which, That, Whose, Where en Inglés',
  description:
    'Las oraciones de relativo (relative clauses) permiten añadir información sobre una persona, cosa o lugar dentro de la misma oración. En B1 aprendes a distinguir las oraciones de relativo especificativas (defining) — que identifican al sustantivo — de las explicativas (non-defining) — que añaden información extra entre comas. Dominas who, which, that, whose, where y cuándo puedes omitir el pronombre relativo.',
  lead: 'Domina las oraciones de relativo especificativas y explicativas con who, which, that, whose y where para enriquecer tus textos en inglés.',
  outcomes: [
    'Usa who, which, that, whose y where para unir oraciones con información relativa',
    'Distingue oraciones de relativo especificativas (sin comas) de las explicativas (con comas)',
    'Omite el pronombre relativo cuando funciona como objeto en oraciones defining',
    'Forma oraciones de relativo complejas para el writing y speaking de exámenes',
  ],

  guide: {
    goal: 'Construir oraciones de relativo especificativas y explicativas para identificar, definir y añadir información a sustantivos.',
    model: 'The woman who called me is my teacher. / London, which is the capital of England, has millions of visitors. / The book (that) I read was fascinating.',
    formula: 'Noun + relative pronoun (who/which/that/whose/where) + clause',
    decisions: [
      'Who: para personas → "The man who lives next door is a doctor."',
      'Which: para cosas, animales y conceptos → "The car which I bought is very reliable."',
      'That: puede reemplazar a who o which en oraciones defining (especificativas) → "The book that I lost was expensive." No se usa en non-defining.',
      'Whose: posesión (cuyo/cuya) → "The student whose project won is from Medellín."',
      'Where: para lugares → "The café where we met is still open."',
      'Defining (especificativas): identifican el sustantivo, sin comas. Si las eliminas, la oración pierde sentido → "The film that won the Oscar was amazing."',
      'Non-defining (explicativas): añaden información extra, siempre entre comas. Nunca uses "that" en estas → "My sister, who lives in London, is a nurse."',
      'Puedes omitir el pronombre relativo cuando es el OBJETO de la cláusula (solo en defining) → "The book (that) I read" / "The person (who) I met" — no se puede omitir si es el sujeto.',
    ],
    table: [
      ['Pronombre', 'Referencia', 'Ejemplo'],
      ['who', 'Personas', 'The teacher who helped me was kind.'],
      ['which', 'Cosas / animales', 'The film which I saw was great.'],
      ['that', 'Personas o cosas (solo defining)', 'The app that I use is free.'],
    ],
    mistakes: [
      '"My mother, that is a doctor, works long hours." ❌ → "My mother, who is a doctor, works long hours." ✓ — En oraciones non-defining nunca se usa "that".',
      '"The city where I was born it is beautiful." ❌ → "The city where I was born is beautiful." ✓ — Elimina el pronombre sujeto repetido ("it").',
      '"The man which I spoke to was helpful." ❌ → "The man who(m) I spoke to was helpful." ✓ — Para personas usa who/whom, no which.',
    ],
  },

  seo: [
    {
      heading: '¿Qué son las oraciones de relativo y para qué sirven?',
      paragraphs: [
        'Una oración de relativo (relative clause) es una cláusula subordinada que da información adicional sobre un sustantivo. Empieza con un pronombre relativo: who (personas), which (cosas), that (personas o cosas en defining), whose (posesión) o where (lugares).',
        'Sirven para unir dos oraciones simples en una sola más elaborada. En lugar de "I have a friend. She speaks five languages." puedes decir "I have a friend who speaks five languages." Este tipo de construcciones es esencial para obtener una puntuación alta en el Writing y Speaking del IELTS, Cambridge B2 y TOEFL.',
      ],
    },
    {
      heading: 'Defining vs non-defining: la diferencia fundamental',
      paragraphs: [
        'Una defining relative clause (especificativa) identifica exactamente a qué sustantivo nos referimos. Es esencial para el significado de la oración y no lleva comas. Si la eliminas, la oración pierde su referencia: "The students who study hard pass the exam." (No todos los estudiantes — solo los que estudian mucho.)',
        'Una non-defining relative clause (explicativa) añade información extra sobre un sustantivo que ya está identificado. Siempre va entre comas y puede eliminarse sin que la oración pierda su sentido básico: "My brother, who lives in Canada, is visiting us next month." (Ya sabemos quién es my brother — solo añadimos que vive en Canadá.)',
      ],
      table: [
        ['Tipo', 'Comas', 'That', 'Ejemplo'],
        ['Defining', 'No', 'Sí', 'The book that I need is expensive.'],
        ['Non-defining', 'Sí (obligatorias)', 'No', 'This book, which costs $50, is excellent.'],
        ['Defining (omisión)', 'No', 'Omitido', 'The person I met was very kind.'],
      ],
    },
    {
      heading: 'Cuándo puedes omitir el pronombre relativo',
      paragraphs: [
        'Solo puedes omitir el pronombre relativo en oraciones defining cuando ese pronombre funciona como el OBJETO de la cláusula de relativo, no como el sujeto. Identificas esto porque detrás del pronombre relativo hay un nuevo sujeto.',
        '"The film (that) I watched last night was brilliant." → Aquí "that" es el objeto de "I watched" → se puede omitir. Pero en "The film that won the Oscar was brilliant" → "that" es el sujeto de "won" → NO se puede omitir. La regla práctica: si detrás del pronombre hay otro sujeto, se puede omitir.',
      ],
    },
    {
      heading: 'Whose y where: los pronombres menos practicados',
      paragraphs: [
        'Whose expresa posesión y equivale al español "cuyo/cuya/cuyos/cuyas". Se usa tanto para personas como para cosas: "The author whose novel I read lives in Colombia." / "The company whose products we use is Japanese." Es una estructura muy valorada en B1-B2 porque demuestra precisión gramatical.',
        'Where se usa después de sustantivos que expresan lugar: "The school where I studied is near the city center." / "I remember the café where we first met." No confundas with "which" + preposición: "The city where I was born" = "The city in which I was born" (formal).',
      ],
    },
    {
      heading: 'Relative clauses en el IELTS y Cambridge',
      paragraphs: [
        'Las oraciones de relativo son un marcador clave de gramática compleja en el IELTS Writing Task 2 y en el Cambridge B2 Writing. Los examinadores buscan variedad estructural: "People who live in cities often suffer from higher levels of stress, which has a direct impact on their health." Esta oración usa who + which en un solo período.',
        'En el Speaking, usar relative clauses de forma natural eleva tu Lexical Resource y Grammatical Range. En lugar de "I like the restaurant. The restaurant has good food." di "I like the restaurant that does the best arepas in town." O para añadir detalle: "My hometown, which is a small city in the Andes, is known for its coffee."',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Oraciones de relativo defining y non-defining con todos los pronombres relativos en contextos cotidianos y académicos.',
    graphicPrompt: 'Dos burbujas de oración conectadas por un pronombre relativo destacado en color.',
    scene: [
      ['The teacher who inspired me the most was Mrs. Restrepo.', 'La profesora que más me inspiró fue la señora Restrepo.'],
      ['Bogotá, which is the capital of Colombia, is over 2,600 meters above sea level.', 'Bogotá, que es la capital de Colombia, está a más de 2.600 metros sobre el nivel del mar.'],
      ['The book that I lent you was a birthday gift.', 'El libro que te presté fue un regalo de cumpleaños.'],
      ['The student whose essay won first prize is from Medellín.', 'La estudiante cuyo ensayo ganó el primer premio es de Medellín.'],
      ['I still remember the café where we had our first class.', 'Todavía recuerdo la cafetería donde tuvimos nuestra primera clase.'],
      ['The film I watched last night — which won three Oscars — was amazing.', 'La película que vi anoche — que ganó tres Óscar — fue increíble.'],
      ['The people who live near the coast often eat a lot of fish.', 'Las personas que viven cerca de la costa suelen comer mucho pescado.'],
      ['My laptop, which I bought three years ago, still works perfectly.', 'Mi laptop, que compré hace tres años, todavía funciona perfectamente.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['who', 'which', 'that', 'whose', 'where'],
    reviewFocus: ['defining (no commas)', 'non-defining (commas, no that)', 'omitting relative pronoun'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el pronombre relativo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el pronombre relativo adecuado para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Describiendo a una persona',
            lines: [['', 'The man ___ helped me find my keys was very kind.']],
            options: ['who', 'which', 'whose', 'where'],
            answer: 'who',
            explain: 'Who = pronombre relativo para personas. "The man" es una persona → who.',
          },
          {
            scene: 'Hablando de un objeto',
            lines: [['', 'The laptop ___ I bought last year still works perfectly.']],
            options: ['that', 'who', 'whose', 'where'],
            answer: 'that',
            explain: 'That = pronombre relativo para cosas en oraciones defining. También se acepta "which".',
          },
          {
            scene: 'Un lugar especial',
            lines: [['', 'The city ___ I was born is in the mountains.']],
            options: ['where', 'which', 'that', 'who'],
            answer: 'where',
            explain: 'Where = pronombre relativo para lugares. "The city" es un lugar → where.',
          },
          {
            scene: 'Posesión',
            lines: [['', 'The student ___ project won the competition is from Cali.']],
            options: ['whose', 'who', 'which', 'where'],
            answer: 'whose',
            explain: 'Whose = posesión. "The student\'s project" → el proyecto de la estudiante → whose project.',
          },
          {
            scene: 'Non-defining — información extra',
            lines: [['', 'My grandmother, ___ lives in Cartagena, is 80 years old.']],
            options: ['who', 'that', 'which', 'whose'],
            answer: 'who',
            explain: 'Non-defining con persona → who (entre comas). Nunca se usa "that" en oraciones non-defining.',
          },
          {
            scene: 'Cosa en oración explicativa',
            lines: [['', 'The report, ___ took three weeks to write, was finally approved.']],
            options: ['which', 'that', 'who', 'whose'],
            answer: 'which',
            explain: 'Non-defining con cosa → which (entre comas). "That" nunca va en oraciones non-defining.',
          },
          {
            scene: 'Persona como objeto',
            lines: [['', 'The professor ___ I met at the conference is a specialist in linguistics.']],
            options: ['who', 'which', 'whose', 'where'],
            answer: 'who',
            explain: 'Who referido a persona. Aquí "who" es el objeto de "I met" → también se podría omitir: "The professor I met..."',
          },
          {
            scene: 'Posesión de cosa',
            lines: [['', 'The company ___ headquarters are in Seoul makes the best phones.']],
            options: ['whose', 'which', 'where', 'that'],
            answer: 'whose',
            explain: 'Whose se usa también con cosas para expresar posesión: "the company\'s headquarters" → whose headquarters.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Pronombre relativo y cláusula',
        tag: '2 espacios',
        intro: 'Completa las oraciones con el pronombre relativo y la forma verbal correctos.',
        type: 'dual',
        items: [
          {
            scene: 'Combinando dos oraciones',
            lines: [['', 'The doctor [[0]] treated my mother [[1]] very experienced.']],
            blanks: [
              { options: ['who', 'which', 'that', 'whose'], answer: 'who', explain: 'Who = para personas. The doctor es una persona.' },
              { options: ['was', 'is', 'were', 'has been'], answer: 'was', explain: '"Was" = pasado simple. La doctora trató a la madre → contexto pasado.' },
            ],
          },
          {
            scene: 'Non-defining con coma',
            lines: [['', 'My first car, [[0]] I bought for $500, [[1]] the best car I ever had.']],
            blanks: [
              { options: ['which', 'that', 'who', 'whose'], answer: 'which', explain: 'Non-defining con cosa → which. "That" no se usa entre comas.' },
              { options: ['was', 'is', 'were', 'has been'], answer: 'was', explain: '"Was" = pasado. El primer coche ya fue vendido o es un recuerdo del pasado.' },
            ],
          },
          {
            scene: 'Posesión y lugar',
            lines: [['', 'The school [[0]] uniform is blue and white is in a town [[1]] nothing ever happens.']],
            blanks: [
              { options: ['whose', 'which', 'where', 'who'], answer: 'whose', explain: '"The school\'s uniform" → cuyo uniforme → whose uniform.' },
              { options: ['where', 'which', 'that', 'who'], answer: 'where', explain: '"In a town where nothing happens." Where = en el que / donde (lugar).' },
            ],
          },
          {
            scene: 'Omisión del pronombre',
            lines: [['', 'The article [[0]] I read in the newspaper [[1]] about climate change.']],
            blanks: [
              { options: ['that', 'who', 'whose', 'where'], answer: 'that', explain: 'That (o which) para cosas. Se podría también omitir: "The article I read..." — que es el objeto de "I read".' },
              { options: ['was', 'were', 'is', 'has been'], answer: 'was', explain: '"Was" = pasado simple. "I read" indica que la acción de leer fue en el pasado.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Descripción de una ciudad',
        tag: 'Texto guiado',
        intro: 'Elige el pronombre relativo correcto para completar la descripción de Medellín.',
        type: 'guidedText',
        scene: 'Elige el pronombre relativo que mejor complete cada espacio.',
        text: 'Medellín is a city [[0]] has changed dramatically over the last 30 years. It is a place [[1]] creativity and innovation are celebrated. The neighborhoods [[2]] were once dangerous are now full of art and culture. Pablo Escobar, [[3]] story is known worldwide, was born near the city. The metro, [[4]] opened in 1995, was the first in Colombia. The people [[5]] I met during my visit were warm and welcoming. There is a large park near the center [[6]] locals go to relax on weekends.',
        blanks: [
          { options: ['that', 'who', 'whose', 'where'], answer: 'that', explain: '"That" o "which" para cosas (Medellín es una ciudad). Defining → that es natural aquí.' },
          { options: ['where', 'which', 'who', 'whose'], answer: 'where', explain: '"A place where" → un lugar donde. Where para lugares.' },
          { options: ['that', 'whose', 'who', 'where'], answer: 'that', explain: '"The neighborhoods that were dangerous." That/which para cosas (barrios). Defining → that es natural.' },
          { options: ['whose', 'who', 'which', 'where'], answer: 'whose', explain: '"Pablo Escobar, whose story..." — posesión (su historia). Non-defining entre comas.' },
          { options: ['which', 'that', 'who', 'whose'], answer: 'which', explain: '"The metro, which opened..." — non-defining entre comas → which (no that).' },
          { options: ['who', 'which', 'whose', 'where'], answer: 'who', explain: '"The people who I met" — personas → who. Aquí who es el objeto (se podría omitir).' },
          { options: ['where', 'which', 'that', 'who'], answer: 'where', explain: '"A large park where locals go" — lugar → where.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa las oraciones de relativo',
        tag: 'Texto libre',
        intro: 'Escribe el pronombre relativo correcto (who, which, that, whose, where) en cada espacio.',
        type: 'freeText',
        scene: 'Escribe el pronombre relativo apropiado para cada oración.',
        text: 'My favorite teacher is a woman [[0]] always makes her classes interesting. She teaches at a school [[1]] has students from 20 different countries. The method [[2]] she uses combines technology and traditional learning. A colleague [[3]] classes I observed was equally inspiring. The classroom [[4]] she teaches is always full.',
        blanks: [
          { answer: 'who', accepted: ['who', 'that'], explain: 'Who (o that en defining) para personas: "a woman who always makes..."' },
          { answer: 'that', accepted: ['that', 'which'], explain: 'That/which para cosas: "a school that has students." Defining → that es natural.' },
          { answer: 'that', accepted: ['that', 'which'], explain: '"The method that she uses" — that es el objeto de "she uses" y se puede omitir también.' },
          { answer: 'whose', accepted: ['whose'], explain: '"A colleague whose classes I observed" — posesión: las clases de mi colega → whose.' },
          { answer: 'where', accepted: ['where', 'that', 'which'], explain: '"The classroom where she teaches" — lugar → where. También "in which she teaches" (formal).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando oraciones de relativo según las instrucciones.',
        type: 'write',
        items: [
          {
            scene: 'Describir a una persona',
            prompt: 'Describe a alguien importante en tu vida usando una oración de relativo con "who" (defining o non-defining).',
            answer: 'My sister, who works as a nurse in Bogotá, is my biggest inspiration.',
            accepted: ['who works', 'who is', 'who lives', 'who helped', 'who taught', 'who speaks', 'who always', 'who studied'],
            explain: 'Ejemplo: My uncle, who is an engineer, helped me choose my career. / I have a friend who speaks four languages.',
          },
          {
            scene: 'Describir un lugar',
            prompt: 'Describe un lugar especial para ti usando "where" o "which" en una oración de relativo.',
            answer: 'I grew up in a small town where everyone knows each other.',
            accepted: ['where everyone', 'where i', 'where we', 'which is', 'which has', 'which i', 'which was'],
            explain: 'Ejemplo: The park where I used to play is now a shopping center. / My city, which is in the Andes, has a perfect climate.',
          },
          {
            scene: 'Posesión con whose',
            prompt: 'Escribe una oración usando "whose" para expresar posesión (persona o cosa).',
            answer: 'The author whose book I read last month is coming to speak at our school.',
            accepted: ['whose book', 'whose work', 'whose family', 'whose house', 'whose name', 'whose music', 'whose idea', 'whose company'],
            explain: 'Ejemplo: The student whose project was selected will present to the board. / I met a woman whose daughter studies at Oxford.',
          },
          {
            scene: 'Omitir el pronombre',
            prompt: 'Escribe una oración defining donde el pronombre relativo sea el objeto y pueda omitirse. Escríbela primero con el pronombre y luego sin él.',
            answer: 'The film (that) I watched yesterday was the best I\'ve seen this year.',
            accepted: ['the film', 'the book', 'the restaurant', 'the person', 'the song', 'the movie', 'the article', 'the course'],
            explain: 'Ejemplo: The song (that) I heard on the radio was stuck in my head. → Puedes decirlo con o sin "that" cuando es el objeto.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Describe tu ciudad o país',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones sobre tu ciudad o país usando oraciones de relativo distintas.',
        type: 'write',
        items: [
          {
            scene: 'Defining — lo esencial',
            prompt: 'Escribe una oración defining (sin comas) sobre un lugar o cosa en tu ciudad usando who/which/that/where.',
            answer: 'There is a market near my house where you can find fresh tropical fruit every morning.',
            accepted: ['where you', 'where i', 'where people', 'that i', 'that has', 'which has', 'which is', 'who work', 'who live'],
            explain: 'Ejemplo: The mountain that overlooks our city is called Monserrate. / There are many people who still speak indigenous languages in the region.',
          },
          {
            scene: 'Non-defining — detalle extra',
            prompt: 'Escribe una oración non-defining (con comas) sobre tu ciudad, país o un monumento famoso usando which o who.',
            answer: 'The Gold Museum, which is located in Bogotá, contains the world\'s largest collection of pre-Columbian gold.',
            accepted: [', which ', ', who '],
            explain: 'Ejemplo: Cartagena, which is on the Caribbean coast, is famous for its colonial walls. / Gabriel García Márquez, who won the Nobel Prize in 1982, was Colombian.',
          },
          {
            scene: 'Whose o where — avanzado',
            prompt: 'Escribe una oración con "whose" o "where" sobre algo o alguien relevante en tu contexto cultural.',
            answer: 'Colombia is a country whose biodiversity is among the richest in the world.',
            accepted: ['whose', 'where'],
            explain: 'Ejemplo: This is the neighborhood where my grandparents first met. / Shakira, whose songs are known around the world, was born in Barranquilla.',
          },
        ],
      },
    ],
  },
}

export default topic
