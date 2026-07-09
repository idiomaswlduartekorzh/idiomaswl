import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'wechselprapositionen-b1',
  order: '14',
  color: '#1a2ecc',
  category: 'Preposiciones',
  level: 'B1',
  title: 'Wechselpräpositionen — Las preposiciones de dos vías en alemán B1',
  shortTitle: 'Wechselpräpositionen',
  metaTitle: 'Wechselpräpositionen B1 — Akkusativ (wohin) vs. Dativ (wo) en alemán',
  description:
    'Las Wechselpräpositionen son 9 preposiciones que rigen Akkusativ para expresar movimiento hacia un lugar (wohin?) y Dativ para expresar posición estática (wo?): an, auf, hinter, in, neben, über, unter, vor, zwischen. Son fundamentales para describir dónde están las cosas y adónde van.',
  lead: 'Aprende las 9 preposiciones de dos vías del alemán: Akkusativ para movimiento (wohin) y Dativ para posición (wo).',
  outcomes: [
    'Usas Akkusativ para expresar movimiento dirigido hacia un lugar (wohin?)',
    'Usas Dativ para expresar posición estática (wo?)',
    'Distingues los pares de verbos stellen/stehen, legen/liegen, hängen/hängen',
    'Aplicas las contracciones frecuentes: im, ins, am, ans',
  ],

  guide: {
    goal: 'Elegir entre Akkusativ y Dativ con las 9 Wechselpräpositionen según si hay movimiento o posición.',
    model: 'Ich lege das Buch auf den Tisch. (wohin → Akk.) / Das Buch liegt auf dem Tisch. (wo → Dat.)',
    formula: 'Wohin? → Akkusativ (movimiento) | Wo? → Dativ (posición) | Contracciones: in+dem=im, in+das=ins, an+dem=am, an+das=ans',
    decisions: [
      'Las 9 preposiciones: an, auf, hinter, in, neben, über, unter, vor, zwischen.',
      'Wohin? (¿adónde?) → Akkusativ: expresa movimiento hacia ese lugar. Ich gehe in den Park.',
      'Wo? (¿dónde?) → Dativ: expresa posición, estado estático. Ich bin im Park.',
      'Par stellen (Akk.) / stehen (Dat.): stellen = poner de pie (acción); stehen = estar de pie (estado).',
      'Par legen (Akk.) / liegen (Dat.): legen = poner tumbado (acción); liegen = estar tumbado (estado).',
      'Par hängen (Akk.) / hängen (Dat.): hängen = colgar (acción); hängen = estar colgado (estado).',
      'Contracciones: in + dem = im, in + das = ins, an + dem = am, an + das = ans.',
    ],
    table: [
      ['Pregunta', 'Caso', 'Ejemplo'],
      ['Wohin? (movimiento)', 'Akkusativ', 'Ich gehe in den Supermarkt.'],
      ['Wo? (posición)', 'Dativ', 'Ich bin im Supermarkt.'],
      ['Verbo de posición', 'Akkusativ', 'Ich stelle das Buch ins Regal.'],
    ],
    mistakes: [
      '"Das Buch liegt auf den Tisch" ❌ → "Das Buch liegt auf dem Tisch" ✓ — liegen (estado) → Dativ.',
      '"Ich gehe in dem Park" ❌ → "Ich gehe in den Park" ✓ — gehen (movimiento) → Akkusativ.',
      '"Ich hänge das Bild an der Wand" ❌ → "Ich hänge das Bild an die Wand" ✓ — hängen (acción) → Akkusativ.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo recordar cuándo usar Akkusativ y cuándo Dativ?',
      paragraphs: [
        'El truco más sencillo: hazte la pregunta "¿adónde?" (wohin) o "¿dónde?" (wo). Si la respuesta implica movimiento hacia un lugar (adónde van las cosas) → Akkusativ. Si describe una posición estática (dónde están las cosas) → Dativ.',
        'Los pares de verbos son tu mejor aliado: stellen/stehen, legen/liegen, hängen/hängen, setzen/sitzen. Los verbos de acción (stellen, legen) llevan Akkusativ; los verbos de estado (stehen, liegen) llevan Dativ.',
      ],
      table: [
        ['Acción (Akk.)', 'Estado (Dat.)', 'Significado'],
        ['stellen', 'stehen', 'poner/estar de pie'],
        ['legen', 'liegen', 'poner/estar tumbado'],
        ['hängen', 'hängen', 'colgar/estar colgado'],
        ['setzen', 'sitzen', 'sentar/estar sentado'],
      ],
    },
    {
      heading: 'Las contracciones más frecuentes con Wechselpräpositionen',
      paragraphs: [
        'En alemán se usan contracciones cuando la preposición + artículo se combinan: in + dem = im (Dativ), in + das = ins (Akkusativ), an + dem = am (Dativ), an + das = ans (Akkusativ).',
        'Estas contracciones son obligatorias en el habla y muy frecuentes en la escritura. Nunca se dice "in dem Zimmer" en contexto normal, sino siempre "im Zimmer".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Wechselpräpositionen B1: 9 preposiciones con Akk. (wohin) vs. Dat. (wo). Pares stellen/stehen, legen/liegen. Contracciones im/ins/am/ans.',
    graphicPrompt: 'Habitación con flechas: flechas de movimiento hacia objetos (Akk.) y puntos de posición de objetos (Dat.).',
    scene: [
      ['Ich lege das Buch auf den Tisch.', 'Pongo el libro sobre la mesa.'],
      ['Das Buch liegt auf dem Tisch.', 'El libro está sobre la mesa.'],
      ['Sie geht in den Supermarkt.', 'Ella va al supermercado.'],
      ['Sie ist im Supermarkt.', 'Ella está en el supermercado.'],
      ['Er hängt das Bild an die Wand.', 'Él cuelga el cuadro en la pared.'],
      ['Das Bild hängt an der Wand.', 'El cuadro está en la pared.'],
      ['Das Kind sitzt unter dem Tisch.', 'El niño está sentado debajo de la mesa.'],
      ['Stell die Flasche ins Regal!', '¡Pon la botella en la estantería!'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['wohin → Akkusativ', 'wo → Dativ', 'pares stellen/stehen', 'pares legen/liegen', 'contracciones'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Akkusativ o Dativ: elige el artículo',
        tag: 'Opción múltiple',
        intro: 'Selecciona el artículo correcto (Akkusativ o Dativ) según si hay movimiento o posición.',
        type: 'choice',
        items: [
          {
            scene: 'Estado',
            lines: [['', 'Das Buch liegt auf ___ Tisch. (¿dónde?)']],
            options: ['dem', 'den', 'das', 'die'],
            answer: 'dem',
            explain: '"liegen" = estado. Wo? → Dativ. Tisch es masculino → Dativ: dem.',
          },
          {
            scene: 'Acción',
            lines: [['', 'Er stellt das Buch auf ___ Regal. (¿adónde?)']],
            options: ['das', 'dem', 'den', 'die'],
            answer: 'das',
            explain: '"stellen" = acción. Wohin? → Akkusativ. Regal es neutro → Akkusativ: das.',
          },
          {
            scene: 'Estado',
            lines: [['', 'Die Katze sitzt auf ___ Sofa. (¿dónde?)']],
            options: ['dem', 'das', 'den', 'die'],
            answer: 'dem',
            explain: '"sitzen" = estado. Wo? → Dativ. Sofa es neutro → Dativ: dem.',
          },
          {
            scene: 'Movimiento',
            lines: [['', 'Ich gehe in ___ Supermarkt. (¿adónde?)']],
            options: ['den', 'dem', 'das', 'die'],
            answer: 'den',
            explain: '"gehen" = movimiento. Wohin? → Akkusativ. Supermarkt es masculino → Akkusativ: den.',
          },
          {
            scene: 'Estado',
            lines: [['', 'Sie wohnt in ___ Stadtmitte. (¿dónde? fem.)']],
            options: ['der', 'die', 'dem', 'den'],
            answer: 'der',
            explain: '"wohnen" = estado. Wo? → Dativ. Stadtmitte es femenino → Dativ: der.',
          },
          {
            scene: 'Acción de colgar',
            lines: [['', 'Er hängt das Bild an ___ Wand. (¿adónde? fem.)']],
            options: ['die', 'der', 'dem', 'das'],
            answer: 'die',
            explain: '"hängen" (transitivo, acción). Wohin? → Akkusativ. Wand es femenino → Akkusativ: die.',
          },
          {
            scene: 'Estado de colgado',
            lines: [['', 'Das Bild hängt an ___ Wand. (¿dónde? fem.)']],
            options: ['der', 'die', 'dem', 'das'],
            answer: 'der',
            explain: '"hängen" (estado). Wo? → Dativ. Wand es femenino → Dativ: der.',
          },
          {
            scene: 'Los niños',
            lines: [['', 'Die Kinder spielen hinter ___ Haus. (¿dónde? neutr.)']],
            options: ['dem', 'das', 'den', 'die'],
            answer: 'dem',
            explain: '"spielen" en posición fija. Wo? → Dativ. Haus es neutro → Dativ: dem.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Par de verbos: acción vs. estado',
        tag: '2 espacios',
        intro: 'Elige el verbo correcto y el artículo (Akk. o Dat.) que corresponde.',
        type: 'dual',
        items: [
          {
            scene: 'La lámpara',
            lines: [['', 'Sie [[0]] die Lampe über [[1]] Tisch. (colgar — acción)']],
            blanks: [
              { options: ['hängt', 'liegt', 'steht', 'sitzt'], answer: 'hängt', explain: '"hängen" (transitivo) = colgar (acción).' },
              { options: ['den', 'dem', 'das', 'die'], answer: 'den', explain: 'Wohin? → Akkusativ. Tisch masc. → den.' },
            ],
          },
          {
            scene: 'La lámpara (estado)',
            lines: [['', 'Die Lampe [[0]] über [[1]] Tisch. (estar colgada — estado)']],
            blanks: [
              { options: ['hängt', 'liegt', 'stellt', 'legt'], answer: 'hängt', explain: '"hängen" (intransitivo) = estar colgado (estado).' },
              { options: ['dem', 'den', 'das', 'die'], answer: 'dem', explain: 'Wo? → Dativ. Tisch masc. → dem.' },
            ],
          },
          {
            scene: 'Poner la taza',
            lines: [['', 'Er [[0]] die Tasse auf [[1]] Küchentisch. (poner — acción)']],
            blanks: [
              { options: ['stellt', 'steht', 'legt', 'liegt'], answer: 'stellt', explain: '"stellen" = poner algo de pie (acción). Tasse es de pie.' },
              { options: ['den', 'dem', 'das', 'die'], answer: 'den', explain: 'Wohin? → Akkusativ. Küchentisch masc. → den.' },
            ],
          },
          {
            scene: 'La taza (estado)',
            lines: [['', 'Die Tasse [[0]] auf [[1]] Küchentisch. (estar — estado)']],
            blanks: [
              { options: ['steht', 'stellt', 'liegt', 'hängt'], answer: 'steht', explain: '"stehen" = estar de pie (estado).' },
              { options: ['dem', 'den', 'das', 'die'], answer: 'dem', explain: 'Wo? → Dativ. Küchentisch masc. → dem.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'En la cocina',
        tag: 'Texto guiado',
        intro: 'Completa el texto sobre la cocina con el artículo correcto (Akk. o Dat.).',
        type: 'guidedText',
        scene: 'Preparar la mesa para cenar.',
        text: 'Ich gehe in [[0]] Küche. Das Essen steht auf [[1]] Herd. Ich stelle die Teller auf [[2]] Tisch. Die Gläser stehen schon neben [[3]] Tellern. Ich setze mich auf [[4]] Stuhl.',
        blanks: [
          { options: ['die', 'der', 'das', 'dem'], answer: 'die', explain: 'Wohin? → Akkusativ. Küche fem. → die.' },
          { options: ['dem', 'den', 'das', 'die'], answer: 'dem', explain: 'Wo? → Dativ. Herd masc. → dem.' },
          { options: ['den', 'dem', 'das', 'die'], answer: 'den', explain: 'Wohin? (stellen = acción) → Akkusativ. Tisch masc. → den.' },
          { options: ['den', 'dem', 'das', 'die'], answer: 'den', explain: 'Wo? → Dativ. Teller plural → Dativ plural: den.' },
          { options: ['den', 'dem', 'das', 'die'], answer: 'den', explain: 'Wohin? (setzen = acción) → Akkusativ. Stuhl masc. → den.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Traduce con Wechselpräposition',
        tag: 'Texto libre',
        intro: 'Traduce cada oración al alemán con la preposición y el caso correctos.',
        type: 'freeText',
        scene: 'Escribe cada oración en alemán.',
        text: 'El gato está debajo de la mesa. → [[0]] / Pongo el libro en la estantería. → [[1]] / El perro está entre la silla y la puerta. → [[2]] / Ella cuelga el abrigo detrás de la puerta. → [[3]] / El café está sobre la mesa. → [[4]]',
        blanks: [
          { answer: 'Die Katze liegt unter dem Tisch.', explain: 'Wo? → Dativ. Tisch masc. → dem.' },
          { answer: 'Ich lege das Buch ins Regal. / in das Regal.', explain: 'Wohin? (legen = acción) → Akkusativ. ins = in das.' },
          { answer: 'Der Hund sitzt zwischen dem Stuhl und der Tür.', explain: 'Wo? → Dativ. Stuhl masc. → dem; Tür fem. → der.' },
          { answer: 'Sie hängt den Mantel hinter die Tür.', explain: 'Wohin? → Akkusativ. Tür fem. → die.' },
          { answer: 'Der Kaffee steht auf dem Tisch.', explain: 'Wo? → Dativ. Tisch masc. → dem.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Descripción espacial',
        tag: 'Producción guiada',
        intro: 'Escribe descripciones de lugares y movimientos usando Wechselpräpositionen.',
        type: 'write',
        items: [
          {
            scene: 'Tu habitación',
            prompt: 'Describe dónde están 5 objetos en tu habitación usando Wechselpräpositionen en Dativ.',
            answer: 'Das Bett steht an der Wand. Der Schrank ist neben dem Fenster. Das Buch liegt auf dem Schreibtisch. Die Lampe hängt über dem Bett. Der Teppich liegt unter dem Bett.',
            explain: 'Todos en Dativ (wo?) porque es posición estática.',
          },
          {
            scene: 'Ordenar el escritorio',
            prompt: 'Describe cómo organizas tu escritorio usando verbos de movimiento + Akkusativ.',
            answer: 'Ich stelle den Computer auf den Tisch. Ich lege das Buch neben den Computer. Ich hänge den Kalender an die Wand. Ich stelle die Tasse vor den Monitor.',
            explain: 'Verbos de acción (stellen, legen, hängen) → Akkusativ (wohin).',
          },
          {
            scene: 'La diferencia',
            prompt: 'Explica con tus propias palabras la diferencia entre stellen/stehen y legen/liegen. Da 2 ejemplos de cada par.',
            answer: '"stellen" = Aktion aufrecht: Ich stelle die Flasche ins Regal. "stehen" = Zustand aufrecht: Die Flasche steht im Regal. "legen" = Aktion liegend: Ich lege das Heft auf den Tisch. "liegen" = Zustand liegend: Das Heft liegt auf dem Tisch.',
            explain: 'La postura del objeto (de pie o tumbado) determina el verbo.',
          },
          {
            scene: 'Instrucciones',
            prompt: 'Escribe instrucciones para ordenar una habitación desordenada. Usa 4 Wechselpräpositionen con Akkusativ.',
            answer: 'Leg die Kleider in den Schrank. Stell die Bücher ins Regal. Hänge das Bild an die Wand. Räum die Schuhe unter das Bett.',
            explain: 'Imperativo + Akkusativ (wohin): acción hacia un lugar.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Descripción espacial libre',
        tag: 'Escritura libre',
        intro: 'Usa las 9 Wechselpräpositionen en textos más largos.',
        type: 'write',
        items: [
          {
            scene: 'Casa ideal',
            prompt: 'Escribe un texto describiendo tu casa o apartamento ideal: qué hay en cada cuarto y dónde está cada cosa. Usa todas las 9 Wechselpräpositionen.',
            answer: '',
            explain: 'an, auf, hinter, in, neben, über, unter, vor, zwischen — todas con Dativ (wo).',
          },
          {
            scene: 'Instrucciones de ruta',
            prompt: 'Escribe instrucciones detalladas para llegar desde la estación de tren hasta tu escuela o trabajo, usando Wechselpräpositionen con Dativ y Akkusativ.',
            answer: '',
            explain: 'Movimiento (Akk.) para los pasos, posición (Dat.) para los puntos de referencia.',
          },
          {
            scene: 'Análisis',
            prompt: '¿Por qué "hängen" puede ir tanto con Akkusativ como con Dativ? ¿Cómo distinguir los dos usos?',
            answer: '',
            explain: 'hängen transitivo (ich hänge es auf die Wand) = acción → Akk. hängen intransitivo (es hängt an der Wand) = estado → Dat.',
          },
        ],
      },
    ],
  },
}

export default topic
