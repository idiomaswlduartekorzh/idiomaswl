import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'prepositions-movement-a2',
  order: '17',
  color: '#dc2626',
  category: 'Preposiciones',
  level: 'A2',
  title: 'Preposiciones de movimiento en Inglés A2: into, out of, past, through, along',
  shortTitle: 'Into / Through / Along',
  metaTitle: 'Preposiciones de Movimiento en Inglés A2 — Into, Out of, Past, Through, Along',
  description:
    'Las preposiciones de movimiento describen la trayectoria o dirección de un desplazamiento. Son distintas a las preposiciones de lugar porque indican dinamismo. Aprende into, out of, through, along y past para describir cómo te mueves de un lugar a otro.',
  lead: 'Describe trayectorias y rutas con into, out of, through, along y past.',
  outcomes: [
    'Usa "into" y "out of" para entrar y salir de lugares',
    'Usa "through" para movimiento de lado a lado (interior)',
    'Usa "along" para movimiento paralelo a una línea o superficie',
    'Usa "past" para pasar al lado de un punto de referencia',
  ],

  guide: {
    goal: 'Describir la dirección y trayectoria de movimientos usando preposiciones específicas.',
    model: 'She walked into the café. / We drove through the tunnel. / He ran past the school.',
    formula: 'Verbo de movimiento + preposición + lugar',
    decisions: [
      'Moverse hacia adentro → into (She went into the room.)',
      'Moverse hacia afuera → out of (He came out of the office.)',
      'Cruzar de lado a lado por el interior → through (We walked through the park.)',
      'Avanzar siguiendo una línea o superficie → along (They ran along the beach.)',
      'Pasar al lado sin entrar → past (I drove past your house.)',
      'Cruzar de un lado al otro en superficie plana → across (She walked across the bridge.)',
    ],
    table: [
      ['Preposición', 'Significado', 'Ejemplo'],
      ['into', 'Hacia el interior', 'She went into the café.'],
      ['out of', 'Hacia el exterior', 'He came out of the office.'],
      ['through', 'De lado a lado (interior)', 'We walked through the park.'],
      ['along', 'A lo largo de (paralelo)', 'They ran along the beach.'],
      ['past', 'Pasando al lado de', 'I drove past your house.'],
      ['across', 'De un lado al otro (superficie)', 'She walked across the bridge.'],
    ],
    mistakes: [
      '"I walked in the tunnel." ❌ → "I walked through the tunnel." ✓ — "in" indica estado; "through" indica movimiento de lado a lado.',
      '"She ran to past the school." ❌ → "She ran past the school." ✓ — "past" ya lleva la idea de dirección, no necesita "to".',
      '"We walked along through the park." ❌ — Elige uno: "along" (paralelo) o "through" (de lado a lado). No los combines.',
    ],
  },

  seo: [
    {
      heading: '¿Qué son las preposiciones de movimiento en inglés?',
      paragraphs: [
        'Las preposiciones de movimiento (prepositions of movement) describen cómo algo o alguien se desplaza de un lugar a otro. A diferencia de las preposiciones de lugar (in, on, at), estas implican acción y dirección.',
        'En el nivel A2 es fundamental distinguir entre "into" (entrar), "out of" (salir), "through" (cruzar), "along" (seguir), "past" (pasar al lado) y "across" (cruzar una superficie).',
      ],
    },
    {
      heading: 'Into vs out of: entrar y salir',
      paragraphs: [
        '"Into" indica movimiento hacia el interior: She walked into the room. / The cat ran into the garden.',
        '"Out of" indica movimiento desde el interior hacia afuera: He jumped out of bed. / They ran out of the building.',
        'Compáralos con "in" (estado: She is in the room.) vs "into" (movimiento: She walked into the room.).',
      ],
    },
    {
      heading: 'Through vs across: dos formas de cruzar',
      paragraphs: [
        '"Through" implica pasar por el interior de algo de un lado al otro (tridimensional): We drove through the tunnel. / They walked through the forest.',
        '"Across" implica cruzar de un punto a otro en una superficie o espacio abierto (bidimensional): She swam across the lake. / He walked across the bridge.',
      ],
      examples: [
        ['Preposición', 'Tipo de espacio', 'Ejemplo'],
        ['through', 'Interior (3D)', 'through the tunnel, through the crowd'],
        ['across', 'Superficie (2D)', 'across the street, across the river'],
        ['along', 'Paralelo a una línea', 'along the coast, along the highway'],
        ['past', 'Al lado de un punto', 'past the school, past my house'],
      ],
    },
    {
      heading: '¿Cuáles son las preposiciones de movimiento en inglés?',
      paragraphs: [
        'to (a, dirección), into (hacia dentro), out of (hacia fuera), through (a través de), across (de un lado a otro), along (a lo largo de), up/down (arriba/abajo), towards (hacia), onto (encima de). Indican la dirección del movimiento: "walk to school", "go into the room".',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre "to" e "into"?',
      paragraphs: [
        '"to" marca el destino de un movimiento ("I go to the office"); "into" enfatiza entrar dentro de un espacio ("I go into the office" = cruzo la puerta). Con "arrive" no se usa "to": "arrive at/in", no "arrive to".',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre "in" y "into", "on" y "onto"?',
      paragraphs: [
        '"in/on" indican posición (dónde está algo): "The cat is in the box". "into/onto" indican movimiento hacia ese lugar: "The cat jumped into the box", "The cat jumped onto the table". Movimiento → into/onto; posición → in/on.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Preposiciones de movimiento en rutas y desplazamientos cotidianos A2.',
    graphicPrompt: 'Mapa urbano con personas moviéndose: entrando a tiendas, cruzando parques, pasando edificios.',
    scene: [
      ['She walked into the café.', 'Ella entró al café.'],
      ["He came out of the office.", 'Él salió de la oficina.'],
      ['We drove through the tunnel.', 'Manejamos a través del túnel.'],
      ['They ran along the beach.', 'Corrieron por la playa.'],
      ['I walk past the school every day.', 'Paso frente al colegio todos los días.'],
      ['She swam across the lake.', 'Nadó a través del lago.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['into vs out of', 'through vs across', 'along vs past'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la preposición de movimiento correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la preposición que describe el movimiento de cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'En el supermercado.',
            lines: [['Amiga', 'I walked ___ the store and bought some milk.']],
            options: ['into', 'along', 'past', 'from'],
            answer: 'into',
            explain: 'Se entra a la tienda → "into" (movimiento hacia adentro).',
          },
          {
            scene: 'Describiendo el camino al trabajo.',
            lines: [['Colega', 'Every day I walk ___ the park to get to the office.']],
            options: ['through', 'into', 'out of', 'along'],
            answer: 'through',
            explain: 'Cruzar el parque de un extremo al otro → "through".',
          },
          {
            scene: 'Dando indicaciones.',
            lines: [
              ['Turista', 'How do I get there?'],
              ['Local', 'Just walk ___ this street and turn left at the corner.'],
            ],
            options: ['along', 'into', 'past', 'through'],
            answer: 'along',
            explain: 'Avanzar siguiendo la calle → "along".',
          },
          {
            scene: 'Hablando de una ruta en carro.',
            lines: [['GPS', 'Turn right after you drive ___ the old church.']],
            options: ['past', 'through', 'along', 'into'],
            answer: 'past',
            explain: 'Pasar al lado de la iglesia sin entrar → "past".',
          },
          {
            scene: 'En la clase de natación.',
            lines: [['Instructor', 'Try to swim ___ the entire pool without stopping.']],
            options: ['across', 'along', 'past', 'into'],
            answer: 'across',
            explain: 'Nadar de un lado al otro de la piscina → "across".',
          },
          {
            scene: 'Observando pájaros.',
            lines: [['Niño', 'Look! Those birds are flying ___ the building!']],
            options: ['over', 'into', 'along', 'out of'],
            answer: 'over',
            explain: 'Volar por encima del edificio → "over".',
          },
          {
            scene: 'Saliendo en una emergencia.',
            lines: [['Voz', 'Please leave the building quickly. Everyone must go ___ the emergency exit.']],
            options: ['out of', 'into', 'along', 'past'],
            answer: 'out of',
            explain: 'Salir del edificio → "out of".',
          },
          {
            scene: 'Describiendo un paseo.',
            lines: [['María', 'We walked ___ the lake and then had a picnic by the trees.']],
            options: ['around', 'into', 'through', 'past'],
            answer: 'around',
            explain: 'Rodear el lago → "around".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Preposición + verbo de movimiento',
        tag: '2 espacios',
        intro: 'Completa con la preposición correcta y la forma verbal adecuada.',
        type: 'dual',
        items: [
          {
            scene: 'Describiendo lo que pasó ayer.',
            lines: [['', 'Yesterday, a cat ran [[0]] our garden and [[1]] under the car.']],
            blanks: [
              { options: ['into', 'along', 'past', 'over'], answer: 'into', explain: '"Into" = el gato entró al jardín.' },
              { options: ['hid', 'hide', 'hiding', 'hidden'], answer: 'hid', explain: 'Past simple de "hide" → "hid".' },
            ],
          },
          {
            scene: 'En el parque de la ciudad.',
            lines: [['', 'We [[0]] through the botanical garden and stopped to take photos [[1]] the fountain.']],
            blanks: [
              { options: ['walked', 'walk', 'walking', 'were walk'], answer: 'walked', explain: 'Evento pasado → past simple "walked".' },
              { options: ['near', 'into', 'past', 'along'], answer: 'near', explain: '"Near the fountain" = cerca de la fuente. Indica ubicación final, no movimiento.' },
            ],
          },
          {
            scene: 'Dando direcciones en la calle.',
            lines: [['', 'Go [[0]] this road until you see a big supermarket. Then walk [[1]] it and you\'ll find the metro station.']],
            blanks: [
              { options: ['along', 'into', 'through', 'out of'], answer: 'along', explain: '"Along this road" = siguiendo esta calle.' },
              { options: ['past', 'into', 'across', 'along'], answer: 'past', explain: '"Walk past it" = pasar al lado del supermercado sin entrar.' },
            ],
          },
          {
            scene: 'Una historia de aventura.',
            lines: [['', 'The explorers swam [[0]] the river and then climbed [[1]] the hill.']],
            blanks: [
              { options: ['across', 'along', 'into', 'past'], answer: 'across', explain: '"Across the river" = cruzar de un lado al otro.' },
              { options: ['up', 'into', 'along', 'through'], answer: 'up', explain: '"Climbed up the hill" = subir el cerro. "Up" indica movimiento vertical ascendente.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una historia con preposiciones de movimiento',
        tag: 'Texto guiado',
        intro: 'Completa el relato con las preposiciones de movimiento correctas.',
        type: 'guidedText',
        scene: 'Clara describe su ruta a la universidad.',
        text: 'Every morning I leave my apartment and walk [[0]] the main street. I walk [[1]] the old colonial church without stopping because I\'m usually in a hurry. Then I go [[2]] a small tunnel under the train tracks. After that, I cross [[3]] the bridge over the river. Finally, I walk [[4]] the university gates and my day begins.',
        blanks: [
          { options: ['along', 'into', 'past', 'through'], answer: 'along', explain: '"Along the main street" = a lo largo de la calle principal.' },
          { options: ['past', 'into', 'through', 'along'], answer: 'past', explain: '"Walk past the church" = pasar al lado de la iglesia sin entrar.' },
          { options: ['through', 'along', 'past', 'into'], answer: 'through', explain: '"Through a tunnel" = pasar por dentro del túnel de un lado al otro.' },
          { options: ['across', 'along', 'past', 'into'], answer: 'across', explain: '"Across the bridge" = de un lado al otro del puente.' },
          { options: ['into', 'along', 'past', 'through'], answer: 'into', explain: '"Into the university gates" = entrar por las puertas.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe las preposiciones',
        tag: 'Texto libre',
        intro: 'Sin opciones. Recuerda: into, out of, through, along, past, across, over, around.',
        type: 'freeText',
        scene: 'Un corredor describe su ruta de jogging matutina.',
        text: 'I start my run at 6 a.m. First, I go [[0]] my building and turn right. I jog [[1]] the riverside boulevard for about two kilometers. Then I run [[2]] the sports complex without going inside. After that, I swim [[3]] the Olympic pool. Finally, I walk [[4]] the park, do some stretching, and go home.',
        blanks: [
          { answer: 'out of', explain: '"Out of my building" = salir del edificio.' },
          { answer: 'along', explain: '"Along the riverside boulevard" = a lo largo del bulevar.' },
          { answer: 'past', explain: '"Past the sports complex" = pasar al lado sin entrar.' },
          { answer: 'across', explain: '"Across the pool" = cruzar la piscina de un lado al otro.' },
          { answer: 'through', explain: '"Through the park" = cruzar el parque de extremo a extremo.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Transforma las oraciones',
        tag: 'Escritura guiada',
        intro: 'Reescribe usando la preposición de movimiento indicada.',
        type: 'write',
        items: [
          {
            scene: 'Usa "through" para describir: She entered the forest and exited on the other side.',
            prompt: 'She entered the forest and exited on the other side.',
            answer: 'She walked through the forest.',
            accepted: ['She ran through the forest.', 'She went through the forest.'],
            explain: '"Through" = entrar y salir de un espacio tridimensional. Reemplaza "entered...and exited" con un solo verbo + "through".',
          },
          {
            scene: 'Usa "past" para describir: I drove and the school was on my right. I didn\'t stop.',
            prompt: 'I drove and the school was on my right. I didn\'t stop.',
            answer: 'I drove past the school.',
            accepted: ["I drove past the school without stopping."],
            explain: '"Past" = pasar al lado de un punto de referencia sin detenerse.',
          },
          {
            scene: 'Usa "into" para describir: The dog entered the house.',
            prompt: 'The dog entered the house.',
            answer: 'The dog ran into the house.',
            accepted: ['The dog went into the house.', 'The dog walked into the house.', 'The dog jumped into the house.'],
            explain: '"Into" = movimiento hacia el interior. Agrega un verbo de movimiento adecuado.',
          },
          {
            scene: 'Usa "along" para describir: We followed the coast for 3 km.',
            prompt: 'We followed the coast for 3 km.',
            answer: 'We walked along the coast for 3 km.',
            accepted: ['We ran along the coast for 3 km.', 'We cycled along the coast for 3 km.'],
            explain: '"Along" = seguir una línea o superficie larga en paralelo.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe movimientos reales',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones originales con preposiciones de movimiento.',
        type: 'write',
        items: [
          {
            scene: 'Describe tu camino a un lugar usando al menos 3 preposiciones de movimiento.',
            prompt: 'Describe cómo llegas a un lugar (trabajo, escuela, tienda) usando preposiciones de movimiento.',
            answer: 'I walk out of my building, along the main avenue, and into the subway station.',
            accepted: [
              'I go out of my house, walk past the park, and into the office.',
              'I drive along the highway, through the tunnel, and into the parking lot.',
            ],
            explain: 'Combina preposiciones de movimiento para crear una secuencia lógica. Usa verbos apropiados.',
          },
          {
            scene: 'Describe un recuerdo de viaje o paseo.',
            prompt: 'Escribe 2 oraciones sobre un lugar que visitaste usando preposiciones de movimiento.',
            answer: 'We walked through the old city center and stopped to take photos. Then we walked along the river until we found a nice restaurant.',
            accepted: [
              'We drove past many beautiful towns and then went into a small café.',
              'I swam across the lake and then ran along the beach for half an hour.',
            ],
            explain: 'Usa diferentes preposiciones para enriquecer la descripción. Piensa en la dirección real del movimiento.',
          },
          {
            scene: 'Da indicaciones para llegar a un lugar.',
            prompt: 'Da indicaciones usando into, along, past y through.',
            answer: 'Walk along this street, go past the church, through the small park, and into the building with the blue door.',
            accepted: ["Go along the main road, past the school, through the tunnel, and you'll see the entrance."],
            explain: 'Usa "along" (seguir la calle), "past" (punto de referencia), "through" (cruzar un espacio) e "into" (llegar al destino).',
          },
        ],
      },
    ],
  },
}

export default topic
