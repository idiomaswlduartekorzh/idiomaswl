import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'have-to-must',
  order: '10',
  color: '#dc2626',
  category: 'Modals',
  level: 'A2',
  title: 'Have to y Must en Inglés A2',
  shortTitle: 'Have to / Must',
  metaTitle: 'Have to y Must en Inglés A2 — Obligación en Inglés',
  description:
    'Have to y must expresan obligación en inglés. "Must" viene del hablante (obligación interna o personal). "Have to" viene de fuera (reglas, leyes, circunstancias). En negativo son opuestos: "mustn\'t" prohíbe, "don\'t have to" significa que no es necesario.',
  lead: 'Expresa obligación y necesidad con must y have to — y aprende por qué sus negativos significan cosas completamente distintas.',
  outcomes: [
    'Usa must para obligación interna o fuerte',
    'Usa have to para obligación externa o práctica',
    'Distingue mustn\'t (prohibición) de don\'t have to (no es necesario)',
    'Conjuga have to en presente y pasado (had to)',
  ],

  guide: {
    goal: 'Usar must y have to para expresar obligación, y mustn\'t / don\'t have to para prohibición y ausencia de obligación.',
    model: 'You must show your ID. / I have to work on Saturday. / You mustn\'t park here. / You don\'t have to come.',
    formula: 'Must + base verb / Have to + base verb / Don\'t have to + base verb',
    decisions: [
      '"Must" = obligación que siente el hablante (personal, moral, fuerte): "I must call my parents."',
      '"Have to" = obligación externa (reglas, necesidad práctica): "I have to take the exam tomorrow."',
      '"Mustn\'t" = prohibición (NO debes hacerlo): "You mustn\'t smoke here."',
      '"Don\'t have to" = no es necesario (opcional, no hay obligación): "You don\'t have to come if you\'re busy."',
      'Pasado de must → had to: "I had to work late yesterday."',
    ],
    table: [
      ['Forma', 'Significado', 'Ejemplo'],
      ['must / have to', 'Obligación', 'You must wear a mask.'],
      ['mustn\'t', 'Prohibición', 'You mustn\'t park here.'],
    ],
    mistakes: [
      '"You don\'t must do it" ❌ → "You mustn\'t do it" ✓ (prohibición) o "You don\'t have to do it" ✓ (no es necesario)',
      '"I must to go" ❌ → "I must go" ✓ — must + verbo base sin "to"',
      '"She have to" ❌ → "She has to" ✓ — have to sí cambia con he/she/it',
    ],
  },

  seo: [
    {
      heading: 'Diferencia entre must y have to',
      paragraphs: [
        'Aunque "must" y "have to" ambos expresan obligación, tienen matices diferentes. "Must" se usa cuando la obligación viene del hablante mismo — es una obligación interna, personal o moral: "I must study more" (me impongo esa obligación). "Have to" se usa cuando la obligación viene de afuera — una regla, una ley, una circunstancia: "I have to attend the meeting" (es un requisito externo).',
        'En la práctica cotidiana, la diferencia es sutil y a veces intercambiable. Lo que SÍ es crucial es la diferencia entre sus formas negativas, que son radicalmente distintas.',
      ],
    },
    {
      heading: 'Mustn\'t vs. don\'t have to: la distinción más importante',
      paragraphs: [
        '"Mustn\'t" expresa PROHIBICIÓN — algo que no está permitido hacer: "You mustn\'t use your phone during the exam." No puedes hacerlo.',
        '"Don\'t have to" expresa AUSENCIA DE OBLIGACIÓN — algo que no es necesario, pero puedes hacerlo si quieres: "You don\'t have to attend the optional workshop." No es obligatorio, pero puedes ir si quieres.',
        'La diferencia en español: "No debes hacerlo" (mustn\'t) vs. "No tienes que hacerlo / No es necesario que lo hagas" (don\'t have to). Esta distinción es fundamental y un error común puede cambiar completamente el significado.',
      ],
      examples: [
        ['Forma', 'Significado', 'Ejemplo'],
        ['must', 'Obligación fuerte', 'You must submit the form by Friday.'],
        ['have to', 'Obligación práctica', 'I have to take three buses to get to work.'],
        ['mustn\'t', 'Prohibición', 'You mustn\'t enter without permission.'],
        ["don't have to", 'No es necesario', "You don't have to pay — it's free."],
      ],
    },
    {
      heading: 'Conjugación de have to',
      paragraphs: [
        '"Have to" cambia según el sujeto (a diferencia de "must" que es invariable): I/you/we/they have to, pero he/she/it HAS to.',
        'En pasado, "must" no tiene forma propia — se usa "had to": "I had to work all weekend." / "She had to cancel her plans." / "Did you have to wait long?"',
        'Para hacer preguntas con "have to": Do/Does + sujeto + have to + verbo base? → Do you have to work on Sundays? / Does she have to attend?',
      ],
    },
    {
      heading: 'Contextos típicos de must y have to',
      paragraphs: [
        '"Must" es muy común en avisos, normas escritas, instrucciones formales: "Passengers must fasten their seatbelts." / "Candidates must arrive 30 minutes early." En conversación, "have to" suena más natural.',
        '"Have to" es el favorito en la conversación diaria: "I have to pick up my daughter at 3." / "Do you have to work this weekend?" / "She had to leave early because of the traffic."',
      ],
    },
    {
      heading: 'Errores comunes de hispanohablantes',
      paragraphs: [
        'El error más grave es confundir "mustn\'t" con "don\'t have to". En español "no tienes que" puede usarse tanto para prohibición como para ausencia de obligación, pero en inglés son formas distintas con significados opuestos.',
        'Otro error frecuente es olvidar que "have to" cambia con tercera persona: "She have to" es incorrecto — debe ser "She has to". "Must" no cambia: "She must" (sin -s).',
        'También es común añadir "to" después de "must": "You must to go" — incorrecto. Como todos los modales, "must" + verbo BASE sin "to".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Must/have to para obligación y mustn\'t/don\'t have to para prohibición y ausencia de necesidad.',
    graphicPrompt: 'Señales, avisos y conversaciones con obligaciones y prohibiciones.',
    scene: [
      ['You must show your ID to enter.', 'Debes mostrar tu identificación para entrar.'],
      ['I have to finish this report today.', 'Tengo que terminar este informe hoy.'],
      ['You mustn\'t use your phone in here.', 'No debes usar tu teléfono aquí.'],
      ['You don\'t have to pay — it\'s free!', '¡No tienes que pagar — es gratis!'],
      ['She has to take three buses to work.', 'Ella tiene que tomar tres autobuses al trabajo.'],
      ['I had to work all weekend last month.', 'Tuve que trabajar todo el fin de semana el mes pasado.'],
      ['Do you have to wear a uniform?', '¿Tienes que usar uniforme?'],
      ['We mustn\'t be late — it starts at 8 sharp.', 'No debemos llegar tarde — empieza a las 8 en punto.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['must vs have to', "mustn't (prohibition) vs don't have to (not necessary)", 'has to (3rd person)', 'had to (past)'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Obligación, prohibición o no necesario',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta según el contexto de cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Reglas del aeropuerto',
            lines: [['', 'You ___ show your passport at the gate.']],
            options: ['must', 'don\'t have to', 'mustn\'t', 'haven\'t'],
            answer: 'must',
            explain: '"Must" para obligación formal/oficial — regla del aeropuerto.',
          },
          {
            scene: 'Es una opción voluntaria',
            lines: [['', 'You ___ come to the optional lecture — it\'s not required.']],
            options: ['don\'t have to', 'mustn\'t', 'must', 'should to'],
            answer: 'don\'t have to',
            explain: '"Don\'t have to" = no es obligatorio. No confundir con prohibición.',
          },
          {
            scene: 'Señal en un museo',
            lines: [['', 'Visitors ___ touch the exhibits.']],
            options: ['mustn\'t', 'don\'t have to', 'must', 'should'],
            answer: 'mustn\'t',
            explain: '"Mustn\'t" = prohibición. Está expresamente prohibido tocar las exhibiciones.',
          },
          {
            scene: 'Obligación práctica',
            lines: [['', 'She ___ take medicine three times a day for two weeks.']],
            options: ['has to', 'have to', 'must to', 'should to'],
            answer: 'has to',
            explain: '"She has to" — obligación externa (prescripción médica). He/she/it → "has to".',
          },
          {
            scene: 'Diferencia clave',
            lines: [['', 'You ___ bring food — we have plenty. Bring yourself!']],
            options: ['don\'t have to', 'mustn\'t', 'must', 'should'],
            answer: 'don\'t have to',
            explain: '"Don\'t have to" = no es necesario (pero puedes si quieres). No está prohibido.',
          },
          {
            scene: 'Regla de tráfico',
            lines: [['', 'Drivers ___ use their phone while driving — it\'s illegal.']],
            options: ['mustn\'t', 'don\'t have to', 'must', 'should'],
            answer: 'mustn\'t',
            explain: '"Mustn\'t" = prohibición legal.',
          },
          {
            scene: 'En el trabajo',
            lines: [['', 'I ___ prepare a presentation for Friday\'s board meeting.']],
            options: ['have to', 'must to', 'don\'t have to', 'haven\'t'],
            answer: 'have to',
            explain: '"Have to" = obligación externa (requisito del trabajo).',
          },
          {
            scene: 'El pasado de must',
            lines: [['', 'I ___ call five clients yesterday — it was a busy day.']],
            options: ['had to', 'must', 'have to', 'musted'],
            answer: 'had to',
            explain: 'Pasado de must/have to = "had to". "Musted" no existe.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Obligación y su contrario',
        tag: '2 espacios',
        intro: 'Completa con must, mustn\'t, have to o don\'t have to.',
        type: 'dual',
        items: [
          {
            scene: 'Reglas de la biblioteca',
            lines: [['', 'You [[0]] be quiet in the library. You [[1]] use your phone for calls.']],
            blanks: [
              { options: ['must', 'mustn\'t', 'have to', 'don\'t have to'], answer: 'must', explain: '"Must be quiet" — regla formal de la biblioteca.' },
              { options: ['mustn\'t', 'must', 'don\'t have to', 'should'], answer: 'mustn\'t', explain: '"Mustn\'t use your phone" — prohibición.' },
            ],
          },
          {
            scene: 'Preparando un viaje',
            lines: [['', 'You [[0]] book accommodation in advance — the city gets very busy. But you [[1]] bring a lot of cash; cards work everywhere.']],
            blanks: [
              { options: ['should', 'must', 'have to', 'mustn\'t'], answer: 'should', explain: '"Should book" — recomendación fuerte pero no prohibición.' },
              { options: ['don\'t have to', 'mustn\'t', 'must', 'have to'], answer: 'don\'t have to', explain: '"Don\'t have to bring cash" — no es necesario, no obligatorio.' },
            ],
          },
          {
            scene: 'Antes del examen',
            lines: [['', 'Candidates [[0]] arrive 15 minutes early. They [[1]] use dictionaries during the test.']],
            blanks: [
              { options: ['must', 'mustn\'t', 'don\'t have to', 'should'], answer: 'must', explain: '"Must arrive early" — regla oficial del examen.' },
              { options: ['mustn\'t', 'must', 'don\'t have to', 'should'], answer: 'mustn\'t', explain: '"Mustn\'t use dictionaries" — prohibición en el examen.' },
            ],
          },
          {
            scene: 'En el hospital',
            lines: [
              ['Nurse:', 'You [[0]] stay overnight for observation. You [[1]] worry — it\'s just a precaution.'],
            ],
            blanks: [
              { options: ['have to', 'don\'t have to', 'mustn\'t', 'must to'], answer: 'have to', explain: '"Have to stay" — obligación médica.' },
              { options: ['don\'t have to', 'mustn\'t', 'must', 'have to'], answer: 'don\'t have to', explain: '"Don\'t have to worry" — tranquilizando al paciente, no es necesario preocuparse.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Primer día de trabajo',
        tag: 'Texto guiado',
        intro: 'Completa con must, mustn\'t, have to, don\'t have to o had to.',
        type: 'guidedText',
        scene: 'Completa con must, mustn\'t, have to, don\'t have to o had to.',
        text: 'My first day at the new company was intense. I [[0]] remember so many new names and procedures. The manager explained the rules: "You [[1]] wear the company badge at all times. You [[2]] share confidential information outside the office — it\'s in your contract. You [[3]] work overtime — we respect your time. But you [[4]] meet your project deadlines. That\'s essential." I [[5]] take lots of notes, but by the end of the day I felt more confident.',
        blanks: [
          { options: ['had to', 'have to', 'must', 'musted'], answer: 'had to', explain: '"Had to" = pasado de have to. Obligación en el pasado.' },
          { options: ['must', 'mustn\'t', 'don\'t have to', 'have to'], answer: 'must', explain: '"Must wear the badge" — regla formal de la empresa.' },
          { options: ['mustn\'t', 'must', 'don\'t have to', 'have to'], answer: 'mustn\'t', explain: '"Mustn\'t share confidential information" — prohibición contractual.' },
          { options: ['don\'t have to', 'mustn\'t', 'must', 'have to'], answer: 'don\'t have to', explain: '"Don\'t have to work overtime" — no es una obligación.' },
          { options: ['must', 'mustn\'t', 'don\'t have to', 'should'], answer: 'must', explain: '"Must meet deadlines" — obligación esencial.' },
          { options: ['had to', 'have to', 'must', 'should'], answer: 'had to', explain: '"Had to take notes" — pasado, lo que fue necesario hacer.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe la obligación',
        tag: 'Texto libre',
        intro: 'Completa con must, mustn\'t, have to, has to, don\'t have to o had to.',
        type: 'freeText',
        scene: 'Completa con must, mustn\'t, have to, has to, don\'t have to o had to.',
        text: 'Living in a city means I [[0]] commute every day — it takes me 45 minutes. My flatmate [[1]] commute though, because she works from home. Yesterday we both [[2]] attend a compulsory building meeting. The manager said: "You [[3]] leave emergency exits blocked — it\'s a safety hazard." The meeting was mandatory, but we [[4]] stay for the social part at the end — we just left.',
        blanks: [
          { answer: 'have to', accepted: ['have to', 'must'], explain: '"I have to commute" — obligación práctica externa.' },
          { answer: "doesn't have to", accepted: ["doesn't have to", 'does not have to'], explain: '"She doesn\'t have to" — ella no tiene esa obligación.' },
          { answer: 'had to', accepted: ['had to'], explain: '"Had to attend" — obligación en el pasado.' },
          { answer: 'mustn\'t', accepted: ["mustn't", 'must not'], explain: '"Mustn\'t leave exits blocked" — prohibición de seguridad.' },
          { answer: "didn't have to", accepted: ["didn't have to", 'did not have to'], explain: '"We didn\'t have to stay" — no fue necesario/obligatorio.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones sobre obligaciones y prohibiciones reales.',
        type: 'write',
        items: [
          {
            scene: 'Tu trabajo o estudios',
            prompt: 'Escribe dos cosas que tienes que hacer en tu trabajo o estudios (have to).',
            answer: 'I have to attend weekly team meetings and submit reports every Friday.',
            accepted: ['i have to', 'she has to', 'he has to', 'we have to', 'students have to', 'i must'],
            explain: 'Ejemplo: I have to meet deadlines. / Students have to complete three assignments per term.',
          },
          {
            scene: 'Las reglas del lugar donde vives',
            prompt: 'Escribe una prohibición donde vives o estudias (mustn\'t).',
            answer: 'You mustn\'t make noise after 10pm in my building.',
            accepted: ["mustn't", 'must not'],
            explain: 'Ejemplo: Students mustn\'t use their phones in class. / You mustn\'t park in front of the building.',
          },
          {
            scene: 'Algo que no tienes que hacer',
            prompt: 'Escribe algo que NO tienes que hacer en tu vida pero que otras personas creen que debes (don\'t have to).',
            answer: 'I don\'t have to explain every decision I make — I trust my own judgment.',
            accepted: ["i don't have to", "you don't have to", "we don't have to", "she doesn't have to", "he doesn't have to"],
            explain: 'Ejemplo: I don\'t have to work on weekends. / You don\'t have to finish everything on the plate.',
          },
          {
            scene: 'El pasado',
            prompt: 'Describe algo que tuviste que hacer la semana pasada (had to).',
            answer: 'I had to work overtime three days last week because of a deadline.',
            accepted: ['i had to', 'she had to', 'he had to', 'we had to', 'they had to'],
            explain: 'Ejemplo: I had to cancel my plans because of work. / She had to take an exam on Saturday.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Las reglas de tu mundo',
        tag: 'Producción libre',
        intro: 'Escribe sobre las obligaciones y prohibiciones de un lugar o contexto que conoces bien (trabajo, escuela, deporte, etc.).',
        type: 'write',
        items: [
          {
            scene: 'Tu mundo',
            prompt: 'Describe una obligación importante de tu trabajo, escuela o deporte (must o have to).',
            answer: 'Athletes must follow the coach\'s training plan and have to attend all practice sessions.',
            accepted: ['must', 'have to', 'has to'],
            explain: 'Ejemplo: We have to sign in every morning. / Students must submit work before the deadline.',
          },
          {
            scene: 'Tu mundo',
            prompt: 'Describe una prohibición de ese mismo contexto (mustn\'t).',
            answer: 'Players mustn\'t argue with the referee — it results in immediate disqualification.',
            accepted: ["mustn't", 'must not'],
            explain: 'Ejemplo: Employees mustn\'t share company data with competitors. / Students mustn\'t cheat in exams.',
          },
          {
            scene: 'Tu mundo',
            prompt: 'Escribe algo que NO es obligatorio en ese contexto (don\'t/doesn\'t have to).',
            answer: 'Part-time employees don\'t have to attend full-day training sessions.',
            accepted: ["don't have to", "doesn't have to", 'do not have to', 'does not have to'],
            explain: 'Ejemplo: Members don\'t have to pay for the first month. / You don\'t have to wear a uniform on Fridays.',
          },
        ],
      },
    ],
  },
}

export default topic
