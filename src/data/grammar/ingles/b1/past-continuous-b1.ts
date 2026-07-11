import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'past-continuous-b1',
  order: '01',
  color: '#dc2626',
  category: 'Verbs',
  level: 'B1',
  title: 'Past Continuous en Inglés B1',
  shortTitle: 'Past Continuous',
  metaTitle: 'Past Continuous B1 — Was/Were + -ing para acciones en progreso en el pasado',
  description:
    'El past continuous (was/were + -ing) describe acciones que estaban en progreso en un momento específico del pasado. En B1 aprendes a combinar el past continuous con el past simple para narrar interrupciones, acciones simultáneas y establecer el escenario de una historia.',
  lead: 'Domina el past continuous para describir acciones en progreso en el pasado y narrar historias con contexto y dinamismo.',
  outcomes: [
    'Forma el past continuous con was/were + verbo -ing correctamente',
    'Usa past continuous para acciones en progreso en un momento pasado',
    'Combina past continuous + past simple con when/while para interrupciones',
    'Describe dos acciones simultáneas en el pasado con while',
  ],

  guide: {
    goal: 'Usar el past continuous para describir acciones en progreso en el pasado y combinarlas con el past simple.',
    model: 'I was reading when she called. / While he was cooking, I was setting the table.',
    formula: 'Subject + was/were + verb-ing (+ when + past simple)',
    decisions: [
      'Usa was con I / he / she / it — usa were con you / we / they',
      'Past continuous solo: acción en progreso en un momento específico → "At 9 pm I was watching TV."',
      'Past continuous + when + past simple: la acción larga es interrupted por la corta → "I was sleeping when the alarm rang."',
      'While + past continuous + past simple: misma idea, "while" introduce la acción larga → "While I was sleeping, the alarm rang."',
      'Dos past continuous con while: dos acciones simultáneas → "While she was studying, he was playing."',
      'Nunca uses past continuous con stative verbs: know, want, like, need, understand → usa past simple.',
    ],
    table: [
      ['Estructura', 'Ejemplo', 'Uso'],
      ['was/were + -ing', 'She was reading a book.', 'Acción en progreso en el pasado'],
      ['P.Cont + when + P.Simple', 'I was cooking when he arrived.', 'Acción interrumpida'],
      ['While + P.Cont + P.Simple', 'While I was cooking, he arrived.', 'Misma idea, orden diferente'],
    ],
    mistakes: [
      '"I was know the answer" ❌ → "I knew the answer" ✓ — verbos estativos usan past simple, no continuous.',
      '"She were working" ❌ → "She was working" ✓ — she/he/it usan was, no were.',
      '"While I studied, she was cooking" ❌ → "While I was studying, she was cooking" ✓ — ambas acciones simultáneas usan continuous.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el past continuous y cuándo se usa?',
      paragraphs: [
        'El past continuous (también llamado past progressive) describe una acción que estaba en progreso en un momento específico del pasado. Se forma con was (para I/he/she/it) o were (para you/we/they) más el verbo con -ing.',
        'A diferencia del past simple que describe eventos completados, el past continuous "pausa el video" en el pasado y muestra lo que estaba ocurriendo en ese instante: "At midnight, the baby was crying." / "This time last year I was living in London."',
      ],
    },
    {
      heading: 'Past continuous + when/while: interrupciones y simultaneidad',
      paragraphs: [
        'La combinación más importante en B1 es past continuous + when + past simple para expresar una interrupción. La acción larga (past continuous) estaba en progreso cuando la acción corta (past simple) la interrumpió: "I was having dinner when my boss called me."',
        'Con while puedes presentar la misma idea o mostrar dos acciones simultáneas: "While she was cooking, he was watching TV." Aquí ambas acciones ocurrían al mismo tiempo y ambas van en past continuous.',
      ],
      table: [
        ['Conector', 'Estructura', 'Significado'],
        ['when', 'P.Cont + when + P.Simple', 'La 2ª acción interrumpe la 1ª'],
        ['while (interrupción)', 'While + P.Cont, P.Simple', 'Igual a la línea anterior'],
        ['while (simultáneo)', 'While + P.Cont, P.Cont', 'Dos acciones a la vez'],
      ],
    },
    {
      heading: 'Was vs Were: el error más común',
      paragraphs: [
        'La elección entre was y were sigue las mismas reglas que el verbo to be en pasado. Was se usa con I, he, she e it. Were se usa con you, we y they. No hay excepciones.',
        'El error más frecuente es usar were con she/he/it: "She were cooking" es incorrecto. Siempre: "She was cooking." / "He was driving." / "It was raining."',
      ],
    },
    {
      heading: 'Verbos que NO van en continuous (stative verbs)',
      paragraphs: [
        'Los verbos estativos describen estados, no acciones dinámicas. Los más importantes: know, want, need, like, love, hate, understand, believe, remember, belong, seem, appear, mean. Estos verbos no se usan en forma continuous.',
        'Incorrecto: "I was knowing the answer." Correcto: "I knew the answer." En contextos del pasado, estos verbos siempre van en past simple.',
      ],
    },
    {
      heading: 'El past continuous para establecer escenario en narrativas',
      paragraphs: [
        'En textos narrativos, el past continuous aparece al inicio para "pintar el escenario": "It was a cold evening. The rain was falling and the wind was howling. I was sitting by the fire..." Luego la historia avanza con past simple.',
        'Este uso es fundamental para el Writing en IELTS, Cambridge y exámenes de inglés: la introducción en past continuous crea atmósfera, y los eventos principales van en past simple.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Past continuous combinado con past simple para narrar interrupciones y escenarios en el pasado.',
    graphicPrompt: 'Línea de tiempo con una acción larga en progreso y una flecha de interrupción.',
    scene: [
      ['I was working when the power went out.', 'Estaba trabajando cuando se fue la luz.'],
      ['She was reading while he was cooking dinner.', 'Ella estaba leyendo mientras él cocinaba.'],
      ['What were you doing at 8 pm last night?', '¿Qué estabas haciendo a las 8 pm anoche?'],
      ['They were watching a movie when it started to rain.', 'Estaban viendo una película cuando empezó a llover.'],
      ['While I was driving, I heard the news.', 'Mientras conducía, escuché la noticia.'],
      ['The kids were sleeping when we arrived.', 'Los niños estaban durmiendo cuando llegamos.'],
      ['It was snowing and the streets were getting icy.', 'Estaba nevando y las calles se estaban poniendo heladas.'],
      ['She wasn\'t feeling well, so she went home early.', 'No se sentía bien, así que se fue a casa temprano.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['work', 'study', 'sleep', 'cook', 'drive', 'watch', 'read', 'run', 'talk', 'listen'],
    reviewFocus: ['was/were selection', 'past cont + when + past simple', 'while + simultaneous actions'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la opción correcta de past continuous para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Una llamada inesperada',
            lines: [['', 'I ___ a shower when my phone rang.']],
            options: ['was having', 'were having', 'had', 'am having'],
            answer: 'was having',
            explain: 'I → was (not were). La acción estaba en progreso cuando el teléfono interrumpió.',
          },
          {
            scene: 'En la oficina',
            lines: [['', 'What ___ you ___ when the meeting started?']],
            options: ['were / doing', 'was / doing', 'did / do', 'are / doing'],
            answer: 'were / doing',
            explain: 'You → were. Pregunta por la acción en progreso antes de la reunión.',
          },
          {
            scene: 'Una tormenta sorpresa',
            lines: [['', 'We ___ in the park when it started to rain.']],
            options: ['were walking', 'was walking', 'walked', 'are walking'],
            answer: 'were walking',
            explain: 'We → were + walking. Acción en progreso interrumpida por la lluvia.',
          },
          {
            scene: 'La noche del accidente',
            lines: [['', 'She ___ to music while her brother was driving.']],
            options: ['was listening', 'were listening', 'listened', 'is listening'],
            answer: 'was listening',
            explain: 'She → was. Acción simultánea con otra acción (her brother was driving).',
          },
          {
            scene: 'A las 11 de la noche',
            lines: [['', 'The children ___ when we finally got home.']],
            options: ['were sleeping', 'was sleeping', 'slept', 'are sleeping'],
            answer: 'were sleeping',
            explain: 'The children → were. Acción en progreso en ese momento del pasado.',
          },
          {
            scene: 'Conversación de amigos',
            lines: [['Alex:', 'Did you see the accident?'], ['Sam:', 'No, I ___ in the other direction.']],
            options: ['was looking', 'were looking', 'looked', 'look'],
            answer: 'was looking',
            explain: 'I → was. Acción en progreso en el momento del accidente.',
          },
          {
            scene: 'Una reunión de trabajo',
            lines: [['', 'While the manager ___ the report, the clients arrived.']],
            options: ['was presenting', 'were presenting', 'presented', 'presents'],
            answer: 'was presenting',
            explain: 'The manager → was (tercera persona singular). Past continuous interrumpido por la llegada de los clientes.',
          },
          {
            scene: 'El partido de fútbol',
            lines: [['', 'It ___ heavily when the referee stopped the match.']],
            options: ['was raining', 'were raining', 'rained', 'rains'],
            answer: 'was raining',
            explain: 'It → was (sujeto impersonal). La lluvia estaba en progreso cuando el árbitro paró el partido.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Was/were + acción simultánea',
        tag: '2 espacios',
        intro: 'Completa con la forma correcta de past continuous para cada sujeto.',
        type: 'dual',
        items: [
          {
            scene: 'Domingo por la tarde',
            lines: [['', 'While Maria [[0]] the house, her husband [[1]] in the garden.']],
            blanks: [
              { options: ['was cleaning', 'were cleaning', 'cleaned', 'is cleaning'], answer: 'was cleaning', explain: 'Maria → was cleaning. Acción simultánea en past continuous.' },
              { options: ['was working', 'were working', 'worked', 'is working'], answer: 'was working', explain: 'Her husband → was working. Ambas acciones simultáneas usan past continuous.' },
            ],
          },
          {
            scene: 'La conferencia',
            lines: [['', 'The speaker [[0]] when the lights suddenly [[1]] off.']],
            blanks: [
              { options: ['was talking', 'were talking', 'talked', 'has talked'], answer: 'was talking', explain: 'The speaker → was talking. Acción en progreso interrumpida.' },
              { options: ['went', 'were going', 'was going', 'go'], answer: 'went', explain: '"Go off" (apagarse) es la acción interrupciones → past simple: went.' },
            ],
          },
          {
            scene: 'En el restaurante',
            lines: [['', 'We [[0]] our meal when the fire alarm [[1]].']],
            blanks: [
              { options: ['were enjoying', 'was enjoying', 'enjoyed', 'enjoy'], answer: 'were enjoying', explain: 'We → were enjoying. Acción larga interrumpida.' },
              { options: ['went off', 'was going off', 'were going off', 'goes off'], answer: 'went off', explain: 'La alarma sonar es la interrupción → past simple: went off.' },
            ],
          },
          {
            scene: 'Una noche de trabajo',
            lines: [['', 'I [[0]] on my essay while my roommates [[1]] loudly in the living room.']],
            blanks: [
              { options: ['was working', 'were working', 'worked', 'am working'], answer: 'was working', explain: 'I → was working. Acción simultánea.' },
              { options: ['were laughing', 'was laughing', 'laughed', 'laugh'], answer: 'were laughing', explain: 'My roommates → were laughing. Dos acciones simultáneas, ambas en past continuous.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'La noche del apagón',
        tag: 'Texto guiado',
        intro: 'Completa la historia eligiendo la forma verbal correcta (past continuous o past simple).',
        type: 'guidedText',
        scene: 'Elige la forma correcta para completar esta historia.',
        text: 'It was a stormy evening last October. I [[0]] (study) at my desk when the electricity suddenly [[1]] (go) out. The whole neighborhood [[2]] (lose) power. Outside, the wind [[3]] (blow) and the rain [[4]] (fall) hard. I [[5]] (look) for some candles when I heard a knock at the door. My neighbor [[6]] (stand) there with a flashlight, looking scared.',
        blanks: [
          { options: ['was studying', 'studied', 'were studying', 'am studying'], answer: 'was studying', explain: 'I → was studying. Acción en progreso interrumpida por el apagón.' },
          { options: ['went', 'was going', 'goes', 'gone'], answer: 'went', explain: 'El apagón es un evento repentino e interrumpe → past simple: went out.' },
          { options: ['lost', 'was losing', 'were losing', 'loses'], answer: 'lost', explain: 'Evento puntual/resultado → past simple: lost.' },
          { options: ['was blowing', 'blew', 'were blowing', 'blows'], answer: 'was blowing', explain: 'El viento como escenario en progreso → past continuous: was blowing.' },
          { options: ['was falling', 'fell', 'were falling', 'falls'], answer: 'was falling', explain: 'La lluvia como escenario en progreso → past continuous: was falling.' },
          { options: ['was looking', 'looked', 'were looking', 'look'], answer: 'was looking', explain: 'Acción en progreso cuando escuché el golpe → past continuous: was looking.' },
          { options: ['was standing', 'stood', 'were standing', 'stands'], answer: 'was standing', explain: 'Posición/estado en progreso en ese momento → past continuous: was standing.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma verbal correcta (past continuous o past simple) según el contexto.',
        type: 'freeText',
        scene: 'Escribe la forma verbal correcta para cada verbo en paréntesis.',
        text: 'Yesterday afternoon was quite eventful. At 4 pm I [[0]] (work) from home when my friend [[1]] (call) me. While we [[2]] (talk), I heard a loud noise outside. I [[3]] (look) out the window and saw a car accident. The drivers [[4]] (argue) in the street.',
        blanks: [
          { answer: 'was working', accepted: ['was working'], explain: 'I → was working. Acción en progreso a las 4 pm.' },
          { answer: 'called', accepted: ['called'], explain: 'La llamada es la interrupción → past simple: called.' },
          { answer: 'were talking', accepted: ['were talking'], explain: 'We → were talking. Acción en progreso cuando escuché el ruido.' },
          { answer: 'looked', accepted: ['looked'], explain: 'Acción puntual de respuesta → past simple: looked.' },
          { answer: 'were arguing', accepted: ['were arguing'], explain: 'The drivers → were arguing. Acción en progreso que yo observé.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Producción',
        intro: 'Escribe oraciones completas combinando past continuous y past simple.',
        type: 'write',
        items: [
          {
            scene: 'Una interrupción',
            prompt: 'Describe qué estabas haciendo cuando sonó tu teléfono ayer (usa past continuous + when + past simple).',
            answer: 'I was having lunch when my phone rang.',
            accepted: ['was cooking', 'was sleeping', 'was studying', 'was watching', 'was reading', 'was working', 'was driving', 'was running'],
            explain: 'Ejemplo: I was studying when my phone rang. / I was cooking when my friend called.',
          },
          {
            scene: 'Dos acciones simultáneas',
            prompt: 'Describe dos cosas que tú y otra persona hacían al mismo tiempo (usa while + past continuous).',
            answer: 'While I was studying, my sister was watching TV.',
            accepted: ['while i was', 'while she was', 'while he was', 'while we were', 'while they were'],
            explain: 'Ejemplo: While I was cooking, my roommate was cleaning. Usa while + past continuous para ambas acciones.',
          },
          {
            scene: 'Un momento específico',
            prompt: 'Describe qué estabas haciendo a las 10 pm anoche (usa past continuous + time expression).',
            answer: 'At 10 pm last night I was watching a series on Netflix.',
            accepted: ['at 10', 'at nine', 'at midnight', 'at that time', 'last night i was', 'yesterday i was'],
            explain: 'Ejemplo: At 10 pm I was getting ready for bed. / Last night at that time I was talking to my family.',
          },
          {
            scene: 'Establecer escenario',
            prompt: 'Escribe 2 oraciones de past continuous para establecer el escenario de una historia (clima, personas, etc.).',
            answer: 'It was raining and the streets were getting dark. People were rushing home.',
            accepted: ['it was raining', 'the sun was shining', 'people were walking', 'the wind was blowing', 'birds were singing', 'children were playing'],
            explain: 'Ejemplo: The sun was shining and children were playing in the park. A dog was barking in the distance.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Cuéntame tu día',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones sobre ayer combinando past continuous y past simple.',
        type: 'write',
        items: [
          {
            scene: 'Tu historia',
            prompt: 'Escribe lo que estabas haciendo ayer a una hora específica (e.g., at 7 pm).',
            answer: 'At 7 pm I was having dinner with my family.',
            accepted: ['was having', 'was watching', 'was cooking', 'was studying', 'was working', 'was talking', 'was reading', 'was playing', 'was driving'],
            explain: 'Usa: At [hora] I was [verbo -ing]. Ej: At 3 pm I was working on a project.',
          },
          {
            scene: 'Tu historia',
            prompt: 'Cuéntame algo que te interrumpió mientras hacías algo ayer (past continuous + when + past simple).',
            answer: 'I was reading when my neighbor knocked at the door.',
            accepted: ['was reading', 'was sleeping', 'was working', 'was studying', 'was eating', 'was watching', 'was cooking', 'was exercising'],
            explain: 'Usa: I was [acción] when [interrupción]. Ej: I was studying when the power went out.',
          },
          {
            scene: 'Tu historia',
            prompt: 'Describe dos cosas simultáneas que tú y alguien más hacían ayer (while + past continuous).',
            answer: 'While I was working, my partner was cooking a delicious meal.',
            accepted: ['while i was', 'while my', 'while she was', 'while he was', 'while they were', 'while we were'],
            explain: 'Usa: While I was [acción], [persona] was [acción]. Ej: While I was studying, my roommate was playing music.',
          },
        ],
      },
    ],
  },
}

export default topic
