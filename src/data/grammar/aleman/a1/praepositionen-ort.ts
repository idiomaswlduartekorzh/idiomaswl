import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'praepositionen-ort',
  order: '13',
  color: '#c9a900',
  category: 'Präpositionen',
  level: 'A1',
  title: 'Präpositionen des Ortes im Deutschen A1',
  shortTitle: 'Präpositionen Ort',
  metaTitle: 'Preposiciones de lugar alemán A1 — in, an, auf, über, unter, neben',
  description:
    'Las preposiciones de lugar más frecuentes del alemán son las llamadas Wechselpräpositionen: rigen Dativo cuando expresan ubicación estática (¿Wo?) y Acusativo cuando expresan movimiento hacia un lugar (¿Wohin?). En A1 nos centramos en el Dativo para describir dónde están las cosas.',
  lead: 'In, an, auf, über, unter, neben, vor, hinter, zwischen: con Dativo para decir DÓNDE está algo (Wo?). Dativo: dem (m/n), der (f), den+n (pl).',
  outcomes: [
    'Usas in/an/auf/neben/über/unter/vor/hinter/zwischen + Dativo para ubicación',
    'Aplicas la declinación dativa: dem (m/n), der (f)',
    'Distingues la diferencia básica Wo? (Dativ) vs Wohin? (Akkusativ)',
  ],

  guide: {
    goal: 'Describir la ubicación de objetos y personas usando preposiciones + Dativo.',
    model: 'Das Buch liegt auf dem Tisch. / Die Katze sitzt unter dem Stuhl. / Er ist im Büro.',
    formula: 'Preposición + Dativo (dem/der/dem) para ubicación estática',
    decisions: [
      'in (en/dentro de): Das Buch ist in der Tasche.',
      'auf (sobre/encima de): Die Tasse steht auf dem Tisch.',
      'an (en/junto a, pegado a): Das Bild hängt an der Wand.',
      'unter (debajo de): Die Katze schläft unter dem Bett.',
      'über (encima de/por encima): Die Lampe hängt über dem Tisch.',
      'neben (al lado de): Der Stuhl steht neben dem Tisch.',
      'vor (delante de): Das Auto steht vor dem Haus.',
      'hinter (detrás de): Der Garten ist hinter dem Haus.',
      'zwischen (entre): Das Café ist zwischen der Bank und dem Supermarkt.',
    ],
    table: [
      ['Género', 'Nominativo', 'Dativo'],
      ['Masculino', 'der Tisch', 'auf dem Tisch'],
      ['Femenino', 'die Tasche', 'in der Tasche'],
      ['Neutro', 'das Bett', 'unter dem Bett'],
    ],
    mistakes: [
      '"Das Buch ist in der Tisch" ❌ — "Tisch" masc. → Dativo: "im Tisch" / "auf dem Tisch" ✓',
      '"Er sitzt auf der Stuhl" ❌ — "Stuhl" masc. → Dativ: "auf dem Stuhl" ✓',
      'Contracción obligatoria: in + dem = im / an + dem = am',
    ],
  },

  seo: [
    {
      heading: 'Las Wechselpräpositionen: Dativo o Acusativo según el significado',
      paragraphs: [
        'Las nueve preposiciones de lugar más importantes del alemán (in, an, auf, über, unter, neben, vor, hinter, zwischen) se llaman Wechselpräpositionen porque alternan entre dos casos: Dativo para responder ¿Wo? (¿Dónde?) y Acusativo para responder ¿Wohin? (¿A dónde?). En A1 nos centramos en el Dativo (ubicación estática).',
        'Ejemplos comparativos: Das Buch liegt auf dem Tisch (Wo? → Dativ: auf dem). / Ich lege das Buch auf den Tisch (Wohin? → Akkusativ: auf den). La misma preposición "auf" con dos casos distintos según si hay movimiento o no.',
      ],
    },
    {
      heading: 'Dativo: dem para masculino y neutro, der para femenino',
      paragraphs: [
        'En Dativo, el artículo definido cambia: masculino (der) → dem, neutro (das) → dem, femenino (die) → der, plural (die) → den (y los sustantivos plurales añaden -n). Esto es diferente del acusativo donde solo cambiaba el masculino — en dativo TODOS los géneros cambian.',
        'Contracciones habituales en A1: in + dem = im (Das Buch ist im Regal). / an + dem = am (Er hängt am Haken). Estas contracciones son obligatorias — no se dice "in dem" cuando hay artículo definido.',
      ],
    },
    {
      heading: 'Preposiciones siempre con Dativo',
      paragraphs: [
        'Además de las Wechselpräpositionen, hay preposiciones que SIEMPRE rigen Dativo (se ven en el tema 19): mit, bei, nach, seit, von, zu, aus, gegenüber. En A1 con preposiciones de lugar, es suficiente dominar las Wechselpräpositionen en su uso estático.',
        'Práctica recomendada: describe objetos en una habitación. Empieza con el artículo definido: "Der Tisch steht in der Ecke. Die Lampe hängt über dem Tisch. Das Buch liegt auf dem Tisch."',
      ],
    },
    {
      heading: 'Verbos de estado: liegen, stehen, hängen, sitzen, sein',
      paragraphs: [
        'Con preposiciones de ubicación en Dativo, los verbos más frecuentes son: liegen (estar tumbado/estar colocado — de objetos planos), stehen (estar de pie/estar colocado — de objetos verticales o en posición erguida), hängen (estar colgado), sitzen (estar sentado), sein (estar). Das Buch liegt auf dem Tisch. / Die Vase steht auf dem Regal. / Das Bild hängt an der Wand.',
        'La distinción liegen/stehen/hängen es importante en alemán (a diferencia del español donde todo es "estar"): nos dice la orientación o posición del objeto. En A1 basta con conocer estas formas básicas.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Wechselpräpositionen con Dativo para ubicación: dem/der/dem.',
    graphicPrompt: 'Ilustración de una habitación con objetos y preposiciones etiquetadas.',
    scene: [
      ['auf + dem (m/n)', 'Das Buch liegt auf dem Tisch.'],
      ['in + der (f)', 'Das Heft ist in der Tasche.'],
      ['an + der (f)', 'Das Bild hängt an der Wand.'],
      ['unter + dem (m)', 'Die Katze schläft unter dem Bett.'],
      ['neben + dem (n)', 'Der Stuhl steht neben dem Fenster.'],
      ['zwischen + der...dem', 'Das Café ist zwischen der Bank und dem Hotel.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['Wo? → Dativ', 'dem (m/n), der (f)', 'in+dem=im, an+dem=am'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Elige la forma dativa correcta para completar la frase de ubicación.',
        type: 'choice',
        items: [
          {
            scene: 'Sofía busca su libro',
            lines: [['Sofía', 'Das Buch liegt auf ___ Tisch. (der Tisch, masc.)']],
            options: ['dem', 'der', 'das', 'den'],
            answer: 'dem',
            explain: '"Tisch" = masculino, Dativo → "dem Tisch". Auf + Dativo para ubicación.',
          },
          {
            scene: 'Carlos no encuentra su bolígrafo',
            lines: [['Carlos', 'Der Stift ist in ___ Tasche. (die Tasche, fem.)']],
            options: ['der', 'dem', 'die', 'den'],
            answer: 'der',
            explain: '"Tasche" = femenino, Dativo → "der Tasche". Die → der en Dativo.',
          },
          {
            scene: 'Iris describe el aula',
            lines: [['Iris', 'Die Lampe hängt über ___ Tisch. (der Tisch, masc.)']],
            options: ['dem', 'der', 'den', 'das'],
            answer: 'dem',
            explain: '"Tisch" = masculino, Dativo → "dem Tisch". Der → dem en Dativo.',
          },
          {
            scene: 'Marco describe su habitación',
            lines: [['Marco', 'Meine Jacke hängt an ___ Tür. (die Tür, fem.)']],
            options: ['der', 'dem', 'die', 'den'],
            answer: 'der',
            explain: '"Tür" = femenino, Dativo → "der Tür".',
          },
          {
            scene: 'Tomás trabaja en su oficina',
            lines: [['', 'Tomás sitzt ___ Büro. (das Büro, neut.)']],
            options: ['im', 'in der', 'in den', 'auf dem'],
            answer: 'im',
            explain: '"im" = in + dem. "Büro" = neutro, Dativo → "dem Büro", contracción: "im Büro".',
          },
          {
            scene: 'Lina describe el salón',
            lines: [['Lina', 'Der Hund liegt unter ___ Sofa. (das Sofa, neut.)']],
            options: ['dem', 'der', 'das', 'den'],
            answer: 'dem',
            explain: '"Sofa" = neutro, Dativo → "dem Sofa".',
          },
          {
            scene: 'Ana habla de la academia',
            lines: [['Ana', 'Die Akademie ist zwischen ___ Bank und dem Hotel. (die Bank, fem.)']],
            options: ['der', 'dem', 'die', 'den'],
            answer: 'der',
            explain: '"Bank" = femenino, Dativo → "der Bank".',
          },
          {
            scene: 'Carlos busca su mochila',
            lines: [['Carlos', 'Die Tasche steht neben ___ Tür. (die Tür, fem.)']],
            options: ['der', 'dem', 'die', 'den'],
            answer: 'der',
            explain: '"Tür" = femenino, Dativo → "der Tür".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Preposición y dativo',
        tag: '2 espacios',
        intro: 'Elige la preposición y la forma dativa correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Sofía describe su habitación',
            lines: [['Sofía', 'Das Bett steht [[0]] [[1]] Fenster. (junto a, das Fenster, neut.)']],
            blanks: [
              { options: ['neben', 'über', 'unter', 'vor'], answer: 'neben', explain: '"Junto a" = "neben".' },
              { options: ['dem', 'der', 'das', 'den'], answer: 'dem', explain: '"Fenster" = neutro, Dativo → "dem Fenster".' },
            ],
          },
          {
            scene: 'Marco busca las llaves',
            lines: [['Marco', 'Die Schlüssel sind [[0]] [[1]] Schublade. (en/dentro de, die Schublade, fem.)']],
            blanks: [
              { options: ['in', 'auf', 'über', 'an'], answer: 'in', explain: '"Dentro de" = "in".' },
              { options: ['der', 'dem', 'die', 'den'], answer: 'der', explain: '"Schublade" = femenino, Dativo → "der Schublade".' },
            ],
          },
          {
            scene: 'Iris describe el aula de WeLearn',
            lines: [['Iris', 'Das Whiteboard hängt [[0]] [[1]] Wand. (en/pegado a, die Wand, fem.)']],
            blanks: [
              { options: ['an', 'auf', 'über', 'neben'], answer: 'an', explain: '"Pegado a la pared" = "an der Wand".' },
              { options: ['der', 'dem', 'die', 'den'], answer: 'der', explain: '"Wand" = femenino, Dativo → "der Wand".' },
            ],
          },
          {
            scene: 'Carlos describe el barrio',
            lines: [['Carlos', 'Das Café ist [[0]] [[1]] Supermarkt. (frente a, der Supermarkt, masc.)']],
            blanks: [
              { options: ['vor', 'hinter', 'neben', 'über'], answer: 'vor', explain: '"Delante de / frente a" = "vor".' },
              { options: ['dem', 'der', 'das', 'den'], answer: 'dem', explain: '"Supermarkt" = masculino, Dativo → "dem Supermarkt".' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa con la forma dativa correcta.',
        type: 'guidedText',
        scene: 'Sofía describe su habitación a Carlos.',
        text: 'Mein Zimmer ist nicht groß, aber gemütlich. Das Bett steht neben [[0]] Fenster (das Fenster, neut.). Ein Schreibtisch steht vor [[1]] Wand (die Wand, fem.). Auf [[2]] Schreibtisch (der Schreibtisch, masc.) liegt mein Laptop. Über [[3]] Schreibtisch (der, masc.) hängt ein Regal. Meine Bücher sind in [[4]] Regal (das Regal, neut.). Eine Pflanze steht zwischen [[5]] Schreibtisch (masc.) und [[6]] Tür (die Tür, fem.).',
        blanks: [
          { options: ['dem', 'der', 'das', 'den'], answer: 'dem', explain: '"Fenster" = neutro → Dativo: "dem Fenster".' },
          { options: ['der', 'dem', 'die', 'den'], answer: 'der', explain: '"Wand" = femenino → Dativo: "der Wand".' },
          { options: ['dem', 'der', 'das', 'den'], answer: 'dem', explain: '"Schreibtisch" = masculino → Dativo: "dem Schreibtisch".' },
          { options: ['dem', 'der', 'das', 'den'], answer: 'dem', explain: '"Schreibtisch" = masculino → Dativo: "dem Schreibtisch".' },
          { options: ['dem', 'der', 'das', 'den'], answer: 'dem', explain: '"Regal" = neutro → Dativo: "dem Regal". (También válido: "im Regal" = in + dem).' },
          { options: ['dem', 'der', 'das', 'den'], answer: 'dem', explain: '"Schreibtisch" = masculino → Dativo: "dem Schreibtisch".' },
          { options: ['der', 'dem', 'die', 'den'], answer: 'der', explain: '"Tür" = femenino → Dativo: "der Tür".' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la forma dativa correcta.',
        type: 'freeText',
        scene: 'Marco describe el aula de WeLearn.',
        text: 'Die Klasse ist klein. Das Whiteboard ist an [[0]] Wand (die Wand). Die Tische stehen in [[1]] Mitte (die Mitte, fem.). Neben [[2]] Tür (die Tür) steht ein Regal. Über [[3]] Tischen (die Tische, plural) hängen Lampen. Die Bücher liegen auf [[4]] Tischen (plural). ',
        blanks: [
          { answer: 'der', accepted: ['der'], explain: '"Wand" = femenino → Dativo: "der Wand".' },
          { answer: 'der', accepted: ['der'], explain: '"Mitte" = femenino → Dativo: "der Mitte".' },
          { answer: 'der', accepted: ['der'], explain: '"Tür" = femenino → Dativo: "der Tür".' },
          { answer: 'den', accepted: ['den'], explain: 'Plural → Dativo: "den Tischen" (plural añade -n en Dativo).' },
          { answer: 'den', accepted: ['den'], explain: 'Plural → Dativo: "den Tischen".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Describe la ubicación de objetos usando preposiciones + Dativo.',
        type: 'write',
        items: [
          {
            scene: 'Describe tu habitación',
            prompt: 'Di dónde están 3 objetos en tu habitación usando preposiciones de lugar + Dativo.',
            answer: 'Mein Bett steht neben dem Fenster. Meine Bücher liegen auf dem Schreibtisch. Die Lampe hängt über dem Tisch.',
            accepted: ['auf dem', 'in der', 'an der', 'unter dem', 'neben dem', 'vor dem', 'hinter dem', 'im ', 'am '],
            explain: 'Dativo: dem (m/n), der (f). Contracciones: im = in dem, am = an dem.',
          },
          {
            scene: 'Describe la ubicación de la academia',
            prompt: 'Describe dónde está WeLearn o algún lugar de tu ciudad usando preposiciones.',
            answer: 'Die Akademie ist in der Stadtmitte. Sie ist neben dem Park und vor dem Bahnhof.',
            accepted: ['in der', 'neben dem', 'vor dem', 'hinter dem', 'zwischen der', 'zwischen dem', 'am '],
            explain: 'Ejemplos: in der Mitte, neben dem Bahnhof, vor der Schule, zwischen dem... und dem...',
          },
          {
            scene: 'Juego de adivinar',
            prompt: 'Describe dónde está tu bolígrafo en este momento usando al menos 2 preposiciones distintas.',
            answer: 'Mein Stift liegt auf dem Tisch neben dem Buch.',
            accepted: ['auf dem', 'in der', 'an der', 'unter dem', 'neben dem', 'im '],
            explain: 'Combina dos preposiciones: "auf dem Tisch, neben dem Buch" — ambas en Dativo.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Describe un espacio completo usando 5 preposiciones distintas.',
        type: 'write',
        items: [
          {
            scene: 'Describe tu salón o cocina',
            prompt: 'Describe tu salón o cocina con 5 frases usando preposiciones de lugar distintas.',
            answer: 'In meinem Wohnzimmer steht ein Sofa vor dem Fernseher. Neben dem Sofa ist ein Tisch. Über dem Tisch hängt eine Lampe. Hinter dem Sofa ist ein Regal. Die Bücher liegen auf dem Regal.',
            accepted: ['auf dem', 'auf der', 'in dem', 'in der', 'im ', 'an der', 'an dem', 'am ', 'unter dem', 'neben dem', 'neben der', 'vor dem', 'vor der', 'hinter dem', 'zwischen'],
            explain: 'Usa variedad: in/auf/an/unter/über/neben/vor/hinter. Dativo: dem(m/n), der(f).',
          },
          {
            scene: 'Instrucciones para encontrar algo',
            prompt: 'Explica a alguien dónde está algo en tu casa o bolso usando preposiciones.',
            answer: 'Mein Schlüssel ist in der Tasche. Die Tasche liegt auf dem Stuhl neben der Tür.',
            accepted: ['in der', 'auf dem', 'neben der', 'vor der', 'in dem', 'im ', 'unter dem'],
            explain: 'Instrucciones de ubicación: in der Tasche, auf dem Tisch, neben der Tür.',
          },
          {
            scene: 'Describe un lugar público',
            prompt: 'Describe dónde está un lugar en tu ciudad (banco, café, parque) usando 3 preposiciones.',
            answer: 'Das Café ist in der Stadtmitte. Es ist zwischen dem Museum und dem Park. Der Eingang ist vor dem Brunnen.',
            accepted: ['in der', 'zwischen dem', 'zwischen der', 'vor dem', 'vor der', 'neben dem', 'neben der', 'hinter dem', 'am '],
            explain: 'Orientación en la ciudad: in der Stadtmitte, zwischen dem... und dem..., vor dem/der...',
          },
        ],
      },
    ],
  },
}

export default topic
