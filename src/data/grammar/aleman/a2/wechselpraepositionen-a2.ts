import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'wechselpraepositionen-a2',
  order: '08',
  color: '#c9a900',
  category: 'Kasus',
  level: 'A2',
  title: 'Wechselpräpositionen: Akkusativ vs. Dativ',
  shortTitle: 'Wechselpräpositionen',
  metaTitle: 'Wechselpräpositionen alemán A2 — Movimiento vs. Lugar',
  description:
    'Las Wechselpräpositionen (an, auf, in, unter, über, vor, hinter, neben, zwischen) son preposiciones que rigen Akkusativ cuando expresan movimiento hacia un lugar (Wohin?) y Dativ cuando expresan ubicación o estado (Wo?). Esta distinción es clave para describir el espacio en alemán.',
  lead: 'Preposiciones que cambian de caso según movimiento (Akkusativ) o lugar (Dativ).',
  outcomes: [
    'Identificar las 9 Wechselpräpositionen del alemán',
    'Usar Akkusativ para responder a "Wohin?" (¿Adónde?)',
    'Usar Dativ para responder a "Wo?" (¿Dónde?)',
    'Aplicar las contracciones frecuentes: ins, ans, im, am, aufs',
  ],

  guide: {
    goal: 'Elegir Akkusativ (movimiento) o Dativ (lugar) con las Wechselpräpositionen.',
    model: 'Ich lege das Buch auf den Tisch. (Akk, Wohin?) / Das Buch liegt auf dem Tisch. (Dat, Wo?)',
    formula: 'Wechselpräp. + Akkusativ → Wohin? / Wechselpräp. + Dativ → Wo?',
    decisions: [
      'Las 9 Wechselpräpositionen: an, auf, in, unter, über, vor, hinter, neben, zwischen',
      'Pregunta clave Wohin? → Akkusativ: Ich hänge das Bild an die Wand / Ich gehe in den Park',
      'Pregunta clave Wo? → Dativ: Das Bild hängt an der Wand / Ich bin im Park',
      'Verbos de movimiento típicos (Akk): legen, stellen, hängen, setzen, stecken → indican acción hacia un lugar',
      'Verbos de estado típicos (Dat): liegen, stehen, hängen (estado), sitzen, stecken → indican dónde está algo',
      'Contracciones frecuentes: in + dem → im, in + das → ins, an + dem → am, an + das → ans, auf + das → aufs',
    ],
    table: [
      ['Präposition', 'Akkusativ (Wohin?)', 'Dativ (Wo?)'],
      ['an', 'Ich hänge es an die Wand', 'Es hängt an der Wand'],
      ['auf', 'Ich lege es auf den Tisch', 'Es liegt auf dem Tisch'],
      ['in', 'Ich gehe in den Supermarkt', 'Ich bin im Supermarkt'],
      ['unter', 'Ich stelle es unter das Regal', 'Es steht unter dem Regal'],
      ['über', 'Ich hänge es über die Tür', 'Es hängt über der Tür'],
      ['vor', 'Ich stelle mich vor das Haus', 'Ich stehe vor dem Haus'],
      ['hinter', 'Ich lege es hinter das Sofa', 'Es liegt hinter dem Sofa'],
      ['neben', 'Ich setze mich neben den Tisch', 'Ich sitze neben dem Tisch'],
      ['zwischen', 'Ich stelle es zwischen die Bücher', 'Es steht zwischen den Büchern'],
    ],
    mistakes: [
      'Usar Dativ con verbos de movimiento: INCORRECTO "Ich gehe in dem Park" → CORRECTO "Ich gehe in den Park"',
      'Usar Akkusativ con verbos de estado: INCORRECTO "Das liegt auf den Tisch" → CORRECTO "Das liegt auf dem Tisch"',
      'Olvidar las contracciones: INCORRECTO "in dem Haus" (en habla informal) → preferible "im Haus"',
    ],
  },

  seo: [
    {
      heading: 'Cómo recordar cuándo usar Akkusativ o Dativ',
      paragraphs: [
        'La clave es hacerse la pregunta correcta. Si la oración responde a "Wohin?" (¿Adónde va algo?), la preposición lleva Akkusativ. Si responde a "Wo?" (¿Dónde está algo?), lleva Dativ. Por ejemplo: "Ich stelle die Lampe auf den Tisch" (Wohin? → Akk) vs "Die Lampe steht auf dem Tisch" (Wo? → Dat).',
        'Una regla mnemotécnica útil: los verbos que terminan en -en y expresan acción de colocar (legen, stellen, hängen, setzen) van con Akkusativ, mientras los verbos que expresan posición (liegen, stehen, hängen como estado, sitzen) van con Dativ.',
      ],
    },
    {
      heading: 'Las contracciones más importantes',
      paragraphs: [
        'En alemán cotidiano es obligatorio contraer ciertos artículos con las preposiciones. Las más frecuentes son: im (in + dem), ins (in + das), am (an + dem), ans (an + das), aufs (auf + das). Decir "in dem Kino" en lugar de "im Kino" suena muy formal o incorrecto en el habla cotidiana.',
      ],
    },
    {
      heading: 'Verbos pares: movimiento vs. estado',
      paragraphs: [
        'En alemán existen pares de verbos que se corresponden semánticamente pero que rigen Akkusativ (movimiento) o Dativ (estado). Los pares más importantes son: legen/liegen, stellen/stehen, hängen(transitivo)/hängen(intransitivo), setzen/sitzen, stecken(colocar)/stecken(estar metido).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Wechselpräpositionen: la pregunta Wohin/Wo determina Akkusativ o Dativ.',
    graphicPrompt: 'Diagrama de habitación con flechas (Wohin → Akk) y objetos estáticos (Wo → Dat).',
    scene: [
      ['Ich lege das Buch auf den Tisch', '¿Adónde? → Akkusativ'],
      ['Das Buch liegt auf dem Tisch', '¿Dónde? → Dativ'],
      ['Ich gehe in den Park', '¿Adónde? → Akkusativ'],
      ['Ich bin im Park', '¿Dónde? → Dativ (im = in+dem)'],
      ['Sie hängt das Bild an die Wand', '¿Adónde? → Akkusativ'],
      ['Das Bild hängt an der Wand', '¿Dónde? → Dativ'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['Wohin? → Akkusativ', 'Wo? → Dativ', 'im/ins/am/ans'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennung',
        tag: 'Opción múltiple',
        intro: 'Elige el artículo correcto (Akkusativ o Dativ) según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Colocando un libro en la mesa',
            lines: [['', 'Ich lege das Buch auf ___ Tisch. (der)']],
            options: ['den', 'dem', 'der', 'die'],
            answer: 'den',
            explain: '"Tisch" es masculino. Wohin? → Akkusativ masculino: den Tisch.',
          },
          {
            scene: 'El libro ya está sobre la mesa',
            lines: [['', 'Das Buch liegt auf ___ Tisch. (der)']],
            options: ['dem', 'den', 'der', 'die'],
            answer: 'dem',
            explain: '"Tisch" es masculino. Wo? → Dativ masculino: dem Tisch.',
          },
          {
            scene: 'Yendo al cine',
            lines: [['', 'Ich gehe ___ Kino. (in + das)']],
            options: ['ins', 'im', 'in den', 'in dem'],
            answer: 'ins',
            explain: '"Kino" es neutro. Wohin? → Akkusativ neutro: in das → ins Kino.',
          },
          {
            scene: 'Estando en el cine',
            lines: [['', 'Ich bin ___ Kino. (in + das)']],
            options: ['im', 'ins', 'in den', 'in der'],
            answer: 'im',
            explain: '"Kino" es neutro. Wo? → Dativ neutro: in dem → im Kino.',
          },
          {
            scene: 'Colgando una foto en la pared',
            lines: [['', 'Sie hängt das Foto an ___ Wand. (die)']],
            options: ['die', 'der', 'den', 'das'],
            answer: 'die',
            explain: '"Wand" es femenino. Wohin? → Akkusativ femenino: die (sin cambio).',
          },
          {
            scene: 'La foto ya está en la pared',
            lines: [['', 'Das Foto hängt an ___ Wand. (die)']],
            options: ['der', 'die', 'dem', 'den'],
            answer: 'der',
            explain: '"Wand" es femenino. Wo? → Dativ femenino: der Wand.',
          },
          {
            scene: 'Poniendo el gato bajo la cama',
            lines: [['', 'Die Katze legt sich unter ___ Bett. (das)']],
            options: ['das', 'dem', 'der', 'den'],
            answer: 'das',
            explain: '"Bett" es neutro. Wohin? → Akkusativ neutro: das Bett.',
          },
          {
            scene: 'El gato está bajo la cama',
            lines: [['', 'Die Katze liegt unter ___ Bett. (das)']],
            options: ['dem', 'das', 'der', 'den'],
            answer: 'dem',
            explain: '"Bett" es neutro. Wo? → Dativ neutro: dem Bett.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Doppelergänzung',
        tag: '2 espacios',
        intro: 'Completa la preposición y el artículo (Akkusativ o Dativ).',
        type: 'dual',
        items: [
          {
            scene: 'Poniendo la silla frente a la ventana',
            lines: [['', 'Er stellt die Stühle [[0]] [[1]] Fenster. (vor, das)']],
            blanks: [
              { options: ['vor', 'hinter', 'neben', 'unter'], answer: 'vor', explain: '"delante de la ventana" → vor.' },
              { options: ['das', 'dem', 'der', 'den'], answer: 'das', explain: '"Fenster" es neutro. Wohin? → Akkusativ neutro: das.' },
            ],
          },
          {
            scene: 'La silla ya está frente a la ventana',
            lines: [['', 'Die Stühle stehen [[0]] [[1]] Fenster. (vor, das)']],
            blanks: [
              { options: ['vor', 'hinter', 'über', 'unter'], answer: 'vor', explain: '"delante de la ventana" → vor.' },
              { options: ['dem', 'das', 'den', 'der'], answer: 'dem', explain: '"Fenster" es neutro. Wo? → Dativ neutro: dem.' },
            ],
          },
          {
            scene: 'Metiéndose en la cama',
            lines: [['', 'Sie geht [[0]] [[1]] Bett. (in, das)']],
            blanks: [
              { options: ['ins', 'im', 'in der', 'in den'], answer: 'ins', explain: '"Wohin? in + das" → ins Bett.' },
              { options: ['Bett', 'Bett.', 'bett', 'BETT'], answer: 'Bett', explain: 'La contracción "ins" ya incluye el artículo: ins Bett.' },
            ],
          },
          {
            scene: 'El cuaderno está entre los libros',
            lines: [['', 'Das Heft liegt [[0]] [[1]] Büchern. (zwischen, die)']],
            blanks: [
              { options: ['zwischen', 'neben', 'hinter', 'vor'], answer: 'zwischen', explain: '"entre los libros" → zwischen.' },
              { options: ['den', 'die', 'dem', 'der'], answer: 'den', explain: '"Büchern" es plural. Wo? → Dativ plural: den (+ -n al sustantivo).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Lückentext',
        tag: 'Texto guiado',
        intro: 'Completa el texto con el artículo correcto según movimiento o lugar.',
        type: 'guidedText',
        scene: 'Julia describe cómo ordena su habitación.',
        text: 'Zuerst lege ich meine Bücher auf [[0]] Regal. Dann stelle ich die Lampe neben [[1]] Schreibtisch. Die Blume hängt an [[2]] Wand. Meine Schuhe liegen unter [[3]] Bett. Jetzt ist alles auf [[4]] Platz.',
        blanks: [
          { options: ['das', 'dem', 'die', 'den'], answer: 'das', explain: '"Regal" es neutro. Wohin? (lege) → Akkusativ neutro: das.' },
          { options: ['den', 'dem', 'die', 'der'], answer: 'den', explain: '"Schreibtisch" es masculino. Wohin? (stelle) → Akkusativ masculino: den.' },
          { options: ['der', 'die', 'dem', 'den'], answer: 'der', explain: '"Wand" es femenino. Wo? (hängt, estado) → Dativ femenino: der.' },
          { options: ['dem', 'das', 'der', 'den'], answer: 'dem', explain: '"Bett" es neutro. Wo? (liegen) → Dativ neutro: dem.' },
          { options: ['dem', 'den', 'der', 'die'], answer: 'dem', explain: '"Platz" es masculino. Wo? (auf seinem Platz) → Dativ masculino: dem.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Freier Text',
        tag: 'Texto libre',
        intro: 'Escribe el artículo correcto (Akkusativ o Dativ) sin opciones.',
        type: 'freeText',
        scene: 'Tom organiza la cocina.',
        text: 'Tom stellt die Tassen in [[0]] Schrank. Die Messer liegen in [[1]] Schublade. Er legt das Brot auf [[2]] Tisch. Der Kühlschrank steht neben [[3]] Herd. Tom hängt den Kalender an [[4]] Wand.',
        blanks: [
          { answer: 'den', accepted: ['den'], explain: '"Schrank" es masculino. Wohin? (stellt) → Akkusativ masculino: den.' },
          { answer: 'der', accepted: ['der'], explain: '"Schublade" es femenino. Wo? (liegen) → Dativ femenino: der.' },
          { answer: 'den', accepted: ['den'], explain: '"Tisch" es masculino. Wohin? (legt) → Akkusativ masculino: den.' },
          { answer: 'dem', accepted: ['dem'], explain: '"Herd" es masculino. Wo? (steht) → Dativ masculino: dem.' },
          { answer: 'die', accepted: ['die'], explain: '"Wand" es femenino. Wohin? (hängt, acción) → Akkusativ femenino: die.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produktion',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones usando Wechselpräpositionen con el caso correcto.',
        type: 'write',
        items: [
          {
            scene: 'Describiendo dónde está tu mochila',
            prompt: 'Di dónde está tu mochila (usa "liegen" o "stehen" con Dativ).',
            answer: 'Meine Tasche liegt neben dem Stuhl.',
            accepted: ['neben dem', 'auf dem', 'unter dem', 'hinter dem'],
            explain: 'Wo? → Dativ: neben dem Stuhl (masculino Dativ), auf dem Tisch, etc.',
          },
          {
            scene: 'Describiendo una acción de colocar',
            prompt: 'Di que pones algo sobre la mesa (usa "legen" con Akkusativ).',
            answer: 'Ich lege das Heft auf den Tisch.',
            accepted: ['auf den Tisch', 'auf das Regal', 'auf die Bank'],
            explain: 'Wohin? → Akkusativ: auf den Tisch (masculino), auf das Bett (neutro), auf die Bank (femenino).',
          },
          {
            scene: 'Ir a un lugar',
            prompt: 'Di que vas al parque o a la escuela (usa "gehen" + "in" + Akkusativ).',
            answer: 'Ich gehe in den Park.',
            accepted: ['in den Park', 'in die Schule', 'ins Kino', 'ins Museum'],
            explain: 'Wohin? → Akkusativ: in den Park (m), in die Schule (f), ins Kino/Museum (n).',
          },
          {
            scene: 'Estar en un lugar',
            prompt: 'Di dónde estás ahora (usa "sein" + Wechselpräposition + Dativ).',
            answer: 'Ich bin im Supermarkt.',
            accepted: ['im Supermarkt', 'in der Schule', 'auf dem Markt'],
            explain: 'Wo? → Dativ: im Supermarkt (im = in+dem), in der Schule (f), auf dem Markt (m).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Kommunikation',
        tag: 'Texto libre',
        intro: 'Describe tu habitación o espacio favorito usando Wechselpräpositionen.',
        type: 'write',
        items: [
          {
            scene: 'Tu habitación',
            prompt: 'Describe dónde están 3 objetos en tu habitación (Wo? → Dativ).',
            answer: 'Mein Bett steht neben dem Fenster. Meine Bücher liegen auf dem Schreibtisch. Die Lampe hängt über dem Tisch.',
            accepted: ['neben dem', 'auf dem', 'unter dem', 'hinter dem', 'an der', 'über dem'],
            explain: 'Wo? → Dativ. liegen/stehen/hängen(estado)/sitzen → Dativ.',
          },
          {
            scene: 'Ordenando tu espacio',
            prompt: 'Describe 2 acciones de ordenar tu habitación (Wohin? → Akkusativ).',
            answer: 'Ich lege die Bücher auf das Regal. Ich stelle die Lampe neben den Schreibtisch.',
            accepted: ['auf das', 'auf den', 'auf die', 'neben den', 'in den', 'an die'],
            explain: 'Wohin? → Akkusativ. legen/stellen/hängen(acción)/setzen → Akkusativ.',
          },
          {
            scene: 'Una historia de un día',
            prompt: 'Escribe 2-3 oraciones sobre adónde fuiste y dónde estuviste hoy.',
            answer: 'Ich bin heute in die Bibliothek gegangen. Dort habe ich am Tisch gesessen und gearbeitet.',
            accepted: ['in die', 'in den', 'ins', 'am Tisch', 'im', 'an der'],
            explain: 'Movimiento (Wohin) → Akk; estado (Wo) → Dativ. Ej: gehe in die Bibliothek / bin in der Bibliothek.',
          },
        ],
      },
    ],
  },
}

export default topic
