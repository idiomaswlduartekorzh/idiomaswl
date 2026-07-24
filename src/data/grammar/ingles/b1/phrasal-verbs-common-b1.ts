import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'phrasal-verbs-common-b1',
  order: '16',
  color: '#dc2626',
  category: 'Vocabulary',
  level: 'B1',
  title: 'Phrasal Verbs Comunes en Inglés B1',
  shortTitle: 'Phrasal Verbs',
  metaTitle: 'Phrasal Verbs B1 — Los 20 phrasal verbs más frecuentes en inglés',
  description:
    'Los phrasal verbs son combinaciones de verbo + partícula (preposición o adverbio) con un significado nuevo. En B1 debes conocer los más frecuentes en conversación, escritura y exámenes IELTS y Cambridge. Son indispensables para sonar natural en inglés.',
  lead: 'Domina los phrasal verbs más usados del inglés B1 para conversaciones, exámenes y comunicación profesional.',
  outcomes: [
    'Reconoces y usas phrasal verbs separables (put off, give up) e inseparables (look after)',
    'Comprendes el significado de los 20 phrasal verbs más frecuentes en contexto',
    'Distingues phrasal verbs con múltiples significados (take off, make out)',
    'Usas phrasal verbs en producción escrita y oral de nivel B1',
  ],

  guide: {
    goal: 'Reconocer y usar los phrasal verbs más comunes en inglés B1 en conversación y escritura.',
    model: 'I gave up smoking. / She looks after her grandmother. / The meeting was put off until Friday.',
    formula: 'Verb + particle(s) = new meaning (often idiomatic)',
    decisions: [
      'Separable: el objeto puede ir entre el verbo y la partícula → "Turn off the TV" / "Turn the TV off" / "Turn it off" (pronombre siempre en el medio)',
      'Inseparable: el objeto va DESPUÉS de la partícula → "She looks after her children." (NO "She looks her children after.")',
      'give up + -ing = dejar un hábito; give up on = abandonar una esperanza',
      'take off: (avión) despegar; (ropa) quitarse; (ser exitoso) despegar en popularidad',
      'look: look after (cuidar), look for (buscar), look up (buscar en diccionario/internet), look forward to (esperar con ilusión)',
      'make: make up (inventar / reconciliarse / maquillarse), make out (descifrar / besarse), make up for (compensar)',
    ],
    table: [
      ['Phrasal verb', 'Significado', 'Ejemplo'],
      ['give up', 'dejar / abandonar', 'She gave up smoking five years ago.'],
      ['look after', 'cuidar de (inseparable)', 'He looks after his younger sister.'],
    ],
    mistakes: [
      '"She looked her baby after." ❌ → "She looked after her baby." ✓ — look after es inseparable.',
      '"I gave it up smoking." ❌ → "I gave up smoking." ✓ — con gerundio, no se separa: gave up smoking.',
      '"Turn off it." ❌ → "Turn it off." ✓ — con pronombre, siempre va entre verbo y partícula.',
    ],
  },

  seo: [
    {
      heading: '¿Qué son los phrasal verbs y por qué son esenciales?',
      paragraphs: [
        'Un phrasal verb es la combinación de un verbo con una o más partículas (preposiciones o adverbios) que forman un significado nuevo, frecuentemente idiomático. Por ejemplo: "give" significa dar, pero "give up" significa rendirse o abandonar un hábito. Este nuevo significado no siempre se puede deducir de las palabras por separado.',
        'Los hablantes nativos de inglés usan phrasal verbs constantemente en conversación informal y también en textos escritos. Para el IELTS, Cambridge B1 (PET) y situaciones laborales, conocer los phrasal verbs más frecuentes es indispensable para alcanzar la naturalidad.',
      ],
    },
    {
      heading: 'Phrasal verbs separables vs inseparables',
      paragraphs: [
        'Los phrasal verbs separables permiten que el objeto vaya entre el verbo y la partícula: "Turn off the light" / "Turn the light off." Ambas son correctas. Sin embargo, con pronombres el objeto SIEMPRE va en el medio: "Turn it off" (NO "Turn off it").',
        'Los phrasal verbs inseparables NO se pueden separar: "She looks after her parents." Es incorrecto decir "She looks her parents after." Los más comunes inseparables: look after, look for, come across, run into, get on with, go through, deal with.',
      ],
      table: [
        ['Tipo', 'Phrasal verb', 'Correcto', 'Incorrecto'],
        ['Separable', 'turn off', '"Turn the TV off." / "Turn it off."', '"Turn off it."'],
        ['Inseparable', 'look after', '"Look after your health."', '"Look your health after."'],
      ],
    },
    {
      heading: 'Los 20 phrasal verbs más frecuentes en B1',
      paragraphs: [
        'Grupo 1 — Hábitos y cambios: give up (dejar), take up (empezar un hobby), carry on (continuar), keep on (seguir haciendo), put off (posponer/aplazar), cut down on (reducir). Grupo 2 — Buscar y encontrar: look for (buscar), look up (buscar en diccionario), come across (encontrar por casualidad), find out (descubrir información).',
        'Grupo 3 — Relaciones y comunicación: get on with (llevarse bien con), make up (reconciliarse / inventar), fall out with (pelearse), look after (cuidar de), get along with (llevarse bien con). Grupo 4 — Movimiento y cambios: turn up (aparecer / llegar), show up (aparecer), set off (emprender un viaje), pick up (recoger / aprender informalmente), go through (pasar por una experiencia difícil).',
      ],
    },
    {
      heading: 'Phrasal verbs con múltiples significados',
      paragraphs: [
        'Algunos phrasal verbs tienen varios significados según el contexto. Take off: (avión) despegar ("The plane took off at 9 am"), (ropa) quitarse ("Take off your coat"), (ser exitoso) volverse popular ("Her career took off after that film"). Make out: entender/descifrar ("I can\'t make out what he\'s saying"), besarse/hacer el amor (informal). Turn down: rechazar ("She turned down the job offer"), bajar el volumen ("Turn down the music").',
        'Break down: (máquina) averiarse ("My car broke down on the highway"), (persona) tener un colapso emocional, descomponerse en partes para analizar. Run out of: quedarse sin algo ("We\'ve run out of milk"). Come up with: idear/proponer ("She came up with a brilliant solution").',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Los phrasal verbs más frecuentes del B1 con distinción separable/inseparable y múltiples significados.',
    graphicPrompt: 'Tarjetas de phrasal verbs con el verbo en rojo y la partícula en azul, con ejemplo visual.',
    scene: [
      ['She gave up eating sugar and feels much better now.', 'Ella dejó de comer azúcar y ahora se siente mucho mejor.'],
      ['I\'ve been looking for my keys for twenty minutes.', 'He estado buscando mis llaves por veinte minutos.'],
      ['The meeting has been put off until next Thursday.', 'La reunión ha sido aplazada hasta el próximo jueves.'],
      ['He came across an interesting article about language learning.', 'Se encontró por casualidad con un artículo interesante sobre el aprendizaje de idiomas.'],
      ['She looks after her grandmother on weekends.', 'Ella cuida de su abuela los fines de semana.'],
      ['The plane took off two hours late due to the storm.', 'El avión despegó dos horas tarde debido a la tormenta.'],
      ['Turn down the music, please. I can\'t concentrate.', 'Baja la música, por favor. No puedo concentrarme.'],
      ['We ran out of time before we could finish the exercise.', 'Se nos acabó el tiempo antes de que pudiéramos terminar el ejercicio.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['give up', 'look for', 'put off', 'come across', 'look after', 'take off', 'turn down', 'run out of', 'find out', 'set off'],
    reviewFocus: ['separable vs inseparable', 'phrasal verbs + gerund', 'multiple meanings', 'pronoun position'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce el significado',
        tag: 'Opción múltiple',
        intro: 'Elige el significado correcto del phrasal verb en cada contexto.',
        type: 'choice',
        items: [
          {
            scene: 'En el aeropuerto',
            lines: [['', 'The flight finally took off after a three-hour delay.']],
            options: ['departed / left the ground', 'landed', 'was cancelled', 'was delayed again'],
            answer: 'departed / left the ground',
            explain: '"Take off" cuando se habla de un avión significa despegar / partir.',
          },
          {
            scene: 'Una mala noticia',
            lines: [['Ana:', '"I\'ve given up on getting the promotion this year."']],
            options: ['stopped hoping for', 'started working for', 'applied for', 'received'],
            answer: 'stopped hoping for',
            explain: '"Give up on" = abandonar la esperanza de algo. Diferente a "give up + -ing" (dejar un hábito).',
          },
          {
            scene: 'En la oficina',
            lines: [['', 'The manager put off the team meeting until next Monday.']],
            options: ['postponed', 'cancelled', 'started', 'attended'],
            answer: 'postponed',
            explain: '"Put off" = aplazar/posponer. La reunión se movió a otra fecha.',
          },
          {
            scene: 'Una relación',
            lines: [['', 'After their argument, they fell out and didn\'t speak for weeks.']],
            options: ['had a disagreement', 'made up', 'moved in together', 'started dating'],
            answer: 'had a disagreement',
            explain: '"Fall out (with someone)" = pelearse / dejar de ser amigos temporalmente.',
          },
          {
            scene: 'Habilidad nueva',
            lines: [['', 'He picked up Italian just by watching films — no formal classes!']],
            options: ['learned informally', 'studied formally', 'forgot', 'translated'],
            answer: 'learned informally',
            explain: '"Pick up" + idioma/habilidad = aprender de manera informal, sin clases.',
          },
          {
            scene: 'Cuidado familiar',
            lines: [['', 'Who looks after the children when you\'re at work?']],
            options: ['takes care of', 'looks for', 'looks at', 'searches for'],
            answer: 'takes care of',
            explain: '"Look after" = cuidar de alguien. Es inseparable: look after + objeto.',
          },
          {
            scene: 'Una sorpresa',
            lines: [['', 'I came across my old school photos while cleaning the attic.']],
            options: ['found by chance', 'was looking for', 'threw away', 'photographed'],
            answer: 'found by chance',
            explain: '"Come across" = encontrar algo por casualidad, sin buscarlo.',
          },
          {
            scene: 'Sin provisiones',
            lines: [['', 'We\'ve run out of coffee. Can you buy some on your way home?']],
            options: ['have no more', 'spilled', 'found extra', 'ordered'],
            answer: 'have no more',
            explain: '"Run out of" = quedarse sin algo. Se usa con sustantivos: run out of time/money/coffee.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Completa con el phrasal verb correcto',
        tag: '2 espacios',
        intro: 'Completa las conversaciones con los phrasal verbs correctos.',
        type: 'dual',
        items: [
          {
            scene: 'Hablar de hábitos',
            lines: [['Friend:', 'Did you finally [[0]] [give up/put off] eating fast food?'], ['You:', 'Yes! I also [[1]] [take up/run out] going to the gym.']],
            blanks: [
              { options: ['give up', 'put off', 'take up', 'look up'], answer: 'give up', explain: '"Give up" + -ing = dejar un hábito: gave up eating fast food.' },
              { options: ['took up', 'gave up', 'put off', 'looked up'], answer: 'took up', explain: '"Take up" = empezar un nuevo hobby o actividad: took up going to the gym.' },
            ],
          },
          {
            scene: 'Investigación',
            lines: [['', 'I couldn\'t [[0]] [find out/look for] who sent the email, so I decided to [[1]] [look up/give up] the sender\'s name online.']],
            blanks: [
              { options: ['find out', 'look for', 'take up', 'put off'], answer: 'find out', explain: '"Find out" = descubrir información: couldn\'t find out who sent it.' },
              { options: ['look up', 'look for', 'look after', 'look into'], answer: 'look up', explain: '"Look up" = buscar información en un libro o internet: look up the sender\'s name.' },
            ],
          },
          {
            scene: 'Problemas con el coche',
            lines: [['', 'My car [[0]] [broke down/ran out] on the highway and I [[1]] [ran out of/gave up] petrol.']],
            blanks: [
              { options: ['broke down', 'ran out', 'gave up', 'took off'], answer: 'broke down', explain: '"Break down" (máquina) = averiarse: my car broke down.' },
              { options: ['ran out of', 'gave up', 'put off', 'looked up'], answer: 'ran out of', explain: '"Run out of" = quedarse sin algo: ran out of petrol.' },
            ],
          },
          {
            scene: 'Preparación para el examen',
            lines: [['', 'I know it\'s hard, but don\'t [[0]] [give up/put off]. You should [[1]] [carry on/take up] studying every day.']],
            blanks: [
              { options: ['give up', 'put off', 'take off', 'fall out'], answer: 'give up', explain: '"Give up" = rendirse/abandonar. "Don\'t give up" = no te rindas.' },
              { options: ['carry on', 'take up', 'fall out', 'break down'], answer: 'carry on', explain: '"Carry on" = continuar haciendo algo: carry on studying.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un día en la oficina',
        tag: 'Texto guiado',
        intro: 'Completa el texto con los phrasal verbs correctos en su forma correcta.',
        type: 'guidedText',
        scene: 'Elige el phrasal verb correcto para completar cada espacio.',
        text: 'Yesterday was a chaotic day at work. The project meeting was [[0]] (postponed) because the director had to [[1]] (start a journey) to Madrid unexpectedly. My colleague Ana usually [[2]] (takes care of) scheduling, but she had [[3]] (discovered) that the venue had double-booked. I spent the afternoon [[4]] (searching for) a solution and finally [[5]] (found by chance) an available conference room nearby. By the end of the day, we had [[6]] (exhausted our supply of) patience, but at least the problem was solved.',
        blanks: [
          { options: ['put off', 'taken off', 'given up', 'turned down'], answer: 'put off', explain: '"Put off" = aplazar/posponer: the meeting was put off.' },
          { options: ['set off', 'take off', 'put off', 'carry on'], answer: 'set off', explain: '"Set off" = emprender un viaje: had to set off to Madrid.' },
          { options: ['looks after', 'looks for', 'looks up', 'looks into'], answer: 'looks after', explain: '"Look after" = encargarse de / cuidar: looks after scheduling.' },
          { options: ['found out', 'given up', 'come across', 'put off'], answer: 'found out', explain: '"Find out" = descubrir información: had found out that the venue had double-booked.' },
          { options: ['looking for', 'looking up', 'looking after', 'looking into'], answer: 'looking for', explain: '"Look for" = buscar: spent the afternoon looking for a solution.' },
          { options: ['came across', 'gave up', 'put off', 'took up'], answer: 'came across', explain: '"Come across" = encontrar por casualidad: came across an available conference room.' },
          { options: ['run out of', 'given up on', 'taken up', 'set off'], answer: 'run out of', explain: '"Run out of" = quedarse sin: had run out of patience.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe el phrasal verb correcto en su forma apropiada.',
        type: 'freeText',
        scene: 'Completa con el phrasal verb correcto conjugado.',
        text: 'I [[0]] (found by chance) an old diary last week when I was cleaning my room. Reading it, I realized how much I had changed. I used to [[1]] (postpone) studying until the last minute. I also remember that I [[2]] (stopped) smoking when I was twenty-two. Since then, I [[3]] (started a new hobby) running every morning. Now I never [[4]] (have no more) energy — I feel great.',
        blanks: [
          { answer: 'came across', accepted: ['came across'], explain: '"Come across" en pasado simple: came across an old diary.' },
          { answer: 'put off', accepted: ['put off'], explain: '"Put off" = posponer: used to put off studying.' },
          { answer: 'gave up', accepted: ['gave up'], explain: '"Give up" + -ing = dejar un hábito en pasado: gave up smoking.' },
          { answer: 'took up', accepted: ['took up'], explain: '"Take up" = empezar una nueva actividad: took up running.' },
          { answer: 'run out of', accepted: ['run out of'], explain: '"Run out of" = quedarse sin: never run out of energy.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando los phrasal verbs indicados.',
        type: 'write',
        items: [
          {
            scene: 'Un hábito que dejaste',
            prompt: 'Describe un hábito que dejaste usando "give up" + gerundio.',
            answer: 'I gave up drinking coffee at night because it was affecting my sleep.',
            accepted: ['gave up', 'given up'],
            explain: '"Give up" + verbo-ing: gave up + [hábito]. Ejemplo: give up eating junk food / give up watching TV late.',
          },
          {
            scene: 'Algo que encontraste',
            prompt: 'Cuéntame algo interesante que encontraste por casualidad (usa "come across").',
            answer: 'I came across a great podcast about learning languages while scrolling through Spotify.',
            accepted: ['came across', 'come across'],
            explain: '"Come across" = encontrar algo sin buscarlo activamente.',
          },
          {
            scene: 'Un rechazo',
            prompt: 'Describe algo que rechazaste o algo que fue aplazado (usa "turn down" o "put off").',
            answer: 'I turned down a job offer in another city because I didn\'t want to leave my family.',
            accepted: ['turned down', 'put off'],
            explain: '"Turn down" = rechazar una oferta. "Put off" = aplazar una actividad o evento.',
          },
          {
            scene: 'Sin recursos',
            prompt: 'Describe una situación en la que te quedaste sin algo importante (usa "run out of").',
            answer: 'During the exam, I ran out of time and couldn\'t finish the last question.',
            accepted: ['ran out of', 'run out of'],
            explain: '"Run out of" + sustantivo = quedarse sin. Común con: time, money, patience, ideas, energy.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu historia con los phrasal verbs',
        tag: 'Producción libre',
        intro: 'Cuenta tu historia usando al menos 3 phrasal verbs diferentes.',
        type: 'write',
        items: [
          {
            scene: 'Un cambio en tu vida',
            prompt: 'Describe un cambio importante en tu vida usando give up, take up o carry on.',
            answer: 'I gave up my job in an office and took up freelance translation. It was difficult at first, but I carried on and now I love what I do.',
            accepted: ['gave up', 'took up', 'carried on', 'keep on', 'put off', 'give up'],
            explain: 'Give up = abandonar algo, take up = empezar algo nuevo, carry on = continuar a pesar de las dificultades.',
          },
          {
            scene: 'Un descubrimiento',
            prompt: 'Cuéntame algo que descubriste o encontraste por casualidad que cambió algo en tu vida (come across / find out).',
            answer: 'I came across a WeLearn video online and found out that there was a structured method to learn Korean. It completely changed how I study.',
            accepted: ['came across', 'found out', 'come across', 'find out'],
            explain: '"Come across" = encontrar algo por casualidad, "find out" = descubrir información nueva.',
          },
          {
            scene: 'Consejos para un amigo',
            prompt: 'Da tres consejos a un amigo que quiere mejorar su inglés usando phrasal verbs (look for, look up, set off, take up, give up, carry on...).',
            answer: 'First, look for a good podcast to listen to every day. When you don\'t understand a word, look it up in a dictionary. Don\'t give up even when it feels hard — carry on practising.',
            accepted: ['look for', 'look up', 'give up', 'carry on', 'take up', 'find out', 'put off'],
            explain: 'look for = buscar, look up = buscar en diccionario, give up = rendirse, carry on = continuar.',
          },
        ],
      },
    ],
  },
}

export default topic
