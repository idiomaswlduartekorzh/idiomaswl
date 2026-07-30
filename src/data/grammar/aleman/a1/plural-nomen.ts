import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'plural-nomen',
  order: '06',
  color: '#dc2626',
  category: 'Nomen',
  level: 'A1',
  title: 'Der Plural der Nomen im Deutschen A1',
  shortTitle: 'Plural der Nomen',
  metaTitle: 'Plural der Nomen Deutsch A1 — Pluralbildung im Deutschen',
  description:
    'El plural de los sustantivos alemanes no sigue una regla única: hay 6 patrones principales. La buena noticia es que el artículo plural siempre es "die". Para nivel A1 es suficiente reconocer el plural y usar los más frecuentes.',
  lead: 'El plural alemán no tiene una regla perfecta — hay 6 patrones. Buena noticia: el artículo es siempre "die". Aprende los plurales más comunes.',
  outcomes: ['Reconoce los 6 patrones de plural', 'Usa "die" para todos los plurales', 'Conoce los plurales más frecuentes del A1'],

  guide: {
    goal: 'Reconocer y usar los plurales más comunes de los sustantivos alemanes.',
    model: 'das Buch → die Bücher / der Mann → die Männer / die Frau → die Frauen.',
    formula: 'Artículo plural = sempre "die" + sustantivo con su forma de plural',
    decisions: [
      'El artículo plural SIEMPRE es "die", sin importar el género singular',
      '-e: der Tag → die Tage; die Stadt → die Städte (con Umlaut)',
      '-er: das Buch → die Bücher; das Kind → die Kinder',
      '-en / -n: die Frau → die Frauen; die Lampe → die Lampen',
      '-s: das Auto → die Autos (extranjerismos)',
      'Sin cambio: der Lehrer → die Lehrer; der Onkel → die Onkel',
    ],
    table: [
      ['Patrón', 'Singular', 'Plural'],
      ['-e', 'der Tag', 'die Tage'],
      ['-¨e (Umlaut)', 'die Stadt', 'die Städte'],
      ['-er', 'das Kind', 'die Kinder'],
      ['-en/-n', 'die Frau', 'die Frauen'],
      ['-s', 'das Auto', 'die Autos'],
      ['Sin cambio', 'der Lehrer', 'die Lehrer'],
    ],
    mistakes: [
      'El plural no es siempre -s como en inglés o español',
      'NO existe "die Kinders" ❌ — el plural es "die Kinder" (sin -s)',
      'El Umlaut (ä/ö/ü) es parte del plural: Stadt → Städte (no Stadte)',
    ],
  },

  seo: [
    {
      heading: '¿Por qué el plural alemán es diferente del español?',
      paragraphs: [
        'El plural de los sustantivos alemanes es conocido por ser uno de los aspectos más desafiantes del idioma para hablantes de español o inglés. No existe una sola regla universal como "-s" en español o inglés. En cambio, hay varios patrones que deben memorizarse con cada sustantivo.',
        'Sin embargo, hay una simplificación importante: el artículo plural es siempre "die", independientemente del género del singular. Der Tisch (masculino) → die Tische; die Frau (femenino) → die Frauen; das Kind (neutro) → die Kinder. Todos usan "die" en plural.',
      ],
    },
    {
      heading: '¿Cuáles son los patrones de plural del alemán?',
      paragraphs: [
        'Patrón 1 (-e): añadir -e, a veces con Umlaut. Der Tag → die Tage, die Stadt → die Städte. Patrón 2 (-er): añadir -er, casi siempre con Umlaut si es posible. Das Kind → die Kinder, das Buch → die Bücher.',
        'Patrón 3 (-en/-n): añadir -en o -n. Die Frau → die Frauen, die Lampe → die Lampen. Patrón 4 (-s): solo extranjerismos y acónimos. Das Auto → die Autos, das Foto → die Fotos. Patrón 5 (sin cambio): der Lehrer → die Lehrer. Patrón 6 (Umlaut sin sufijo): der Vater → die Väter.',
      ],
    },
    {
      heading: '¿Qué plurales conviene memorizar en alemán A1?',
      paragraphs: [
        'Para comunicarse en A1, estos plurales son los más necesarios: Kinder (niños), Eltern (padres — siempre plural), Bücher (libros), Tische (mesas), Stühle (sillas), Häuser (casas), Städte (ciudades), Länder (países), Freunde (amigos), Sprachen (idiomas).',
        'El diccionario alemán siempre indica el plural junto al género: "der Tag, -e" significa que el plural es "die Tage". Aprende el plural desde el principio.',
      ],
    },
    {
      heading: 'Estrategia para hispanohablantes',
      paragraphs: [
        'La mejor estrategia en A1 es memorizar los plurales de los 50-100 sustantivos más frecuentes y no intentar deducir el resto. Con el tiempo, la intuición se desarrolla.',
        'Algunos patrones útiles: sustantivos terminados en -er suelen no cambiar en plural (der Lehrer → die Lehrer); sustantivos de origen extranjero toman -s (das Auto → die Autos). Los femeninos en -e añaden -n (die Lampe → die Lampen, die Tasse → die Tassen).',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Patrones de plural alemán con los sustantivos más frecuentes del A1.',
    graphicPrompt: 'Tabla de plurales agrupados por patrón con ejemplos cotidianos.',
    scene: [
      ['-e: Tag → Tage', 'der Tisch → die Tische, der Stuhl → die Stühle'],
      ['-er: Kind → Kinder', 'das Buch → die Bücher, das Haus → die Häuser'],
      ['-en/-n: Frau → Frauen', 'die Lampe → die Lampen, die Sprache → die Sprachen'],
      ['-s: Auto → Autos', 'das Foto → die Fotos, das Café → die Cafés'],
      ['Sin cambio: Lehrer', 'der Onkel → die Onkel, das Mädchen → die Mädchen'],
      ['Plural = siempre "die"', 'der Freund → die Freunde / die Freundin → die Freundinnen'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['artículo plural = die', 'Umlaut en algunos patrones', '-s para extranjerismos'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Elige el plural correcto.',
        type: 'choice',
        items: [
          { scene: 'Vocabulario general', lines: [['', 'das Kind → ___']], options: ['die Kinder', 'die Kinds', 'die Kinde', 'die Kindern'], answer: 'die Kinder', explain: '"Kind" → Plural: Kinder (patrón -er, sin Umlaut pues ya tiene i).' },
          { scene: 'Vocabulario general', lines: [['', 'das Buch → ___']], options: ['die Bücher', 'die Buchs', 'die Buche', 'die Büche'], answer: 'die Bücher', explain: '"Buch" → Plural: Bücher (patrón -er + Umlaut: u → ü).' },
          { scene: 'Vocabulario general', lines: [['', 'die Frau → ___']], options: ['die Frauen', 'die Fraus', 'die Fraue', 'die Frauern'], answer: 'die Frauen', explain: '"Frau" → Plural: Frauen (patrón -en).' },
          { scene: 'Vocabulario general', lines: [['', 'das Auto → ___']], options: ['die Autos', 'die Autoen', 'die Autoe', 'die Auteer'], answer: 'die Autos', explain: '"Auto" (extranjerismo) → Plural: Autos (patrón -s).' },
          { scene: 'Vocabulario general', lines: [['', 'der Tag → ___']], options: ['die Tage', 'die Tags', 'die Tagen'], answer: 'die Tage', explain: '"Tag" → Plural: Tage (patrón -e, sin Umlaut).' },
          { scene: 'Vocabulario general', lines: [['', 'die Stadt → ___']], options: ['die Städte', 'die Stadte', 'die Stadts', 'die Städten'], answer: 'die Städte', explain: '"Stadt" → Plural: Städte (patrón -e + Umlaut: a → ä).' },
          { scene: 'Vocabulario general', lines: [['', 'der Lehrer → ___']], options: ['die Lehrer', 'die Lehrers', 'die Lehrern', 'die Lehrere'], answer: 'die Lehrer', explain: '"Lehrer" → Plural: Lehrer (sin cambio — patrón 0).' },
          { scene: 'Vocabulario general', lines: [['', 'die Lampe → ___']], options: ['die Lampen', 'die Lampes', 'die Lampeen', 'die Lampe'], answer: 'die Lampen', explain: '"Lampe" termina en -e → Plural: Lampen (patrón -n).' },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Doble espacio',
        tag: '2 espacios',
        intro: 'Completa el artículo plural y la forma correcta del sustantivo.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Ich habe zwei [[0]] (Buch) und drei [[1]] (Heft).']],
            blanks: [
              { options: ['Bücher', 'Buchs', 'Büche', 'Buchen'], answer: 'Bücher', explain: '"Buch" → "Bücher".' },
              { options: ['Hefte', 'Hefts', 'Heften', 'Heft'], answer: 'Hefte', explain: '"Heft" → "Hefte" (patrón -e).' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] (Freund) und [[1]] (Freundin) kommen heute.']],
            blanks: [
              { options: ['Freunde', 'Freunds', 'Freunden', 'Freunder'], answer: 'Freunde', explain: '"Freund" → "Freunde" (patrón -e).' },
              { options: ['Freundinnen', 'Freundins', 'Freundine', 'Freundinne'], answer: 'Freundinnen', explain: '"Freundin" → "Freundinnen" (patrón -nen).' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'In Deutschland gibt es viele große [[0]] (Stadt) und schöne [[1]] (Dorf).']],
            blanks: [
              { options: ['Städte', 'Stadte', 'Stadts', 'Städten'], answer: 'Städte', explain: '"Stadt" → "Städte".' },
              { options: ['Dörfer', 'Dorfs', 'Dörfe', 'Dorfe'], answer: 'Dörfer', explain: '"Dorf" → "Dörfer" (patrón -er + Umlaut).' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Die [[0]] (Kind) spielen im Garten. Die [[1]] (Eltern) arbeiten.']],
            blanks: [
              { options: ['Kinder', 'Kinds', 'Kinde', 'Kindern'], answer: 'Kinder', explain: '"Kind" → "Kinder".' },
              { options: ['Eltern', 'Elterns', 'Elterne', 'Elternen'], answer: 'Eltern', explain: '"Eltern" ya es plural (die Eltern — sin singular estándar).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa con el plural correcto de cada sustantivo.',
        type: 'guidedText',
        scene: 'Completa con el plural correcto de cada sustantivo.',
        text: 'Im Klassenzimmer gibt es viele [[0]] (Tisch), [[1]] (Stuhl) und [[2]] (Buch). An der Wand hängen Bilder von verschiedenen [[3]] (Land). Auf dem Lehrertisch liegen [[4]] (Heft) und [[5]] (Stift). Die [[6]] (Schüler) kommen um 8 Uhr.',
        blanks: [
          { options: ['Tische', 'Tischen', 'Tische', 'Tischs'], answer: 'Tische', explain: '"Tisch" → "Tische".' },
          { options: ['Stühle', 'Stuhlen', 'Stuhl', 'Stühls'], answer: 'Stühle', explain: '"Stuhl" → "Stühle" (-e + Umlaut).' },
          { options: ['Bücher', 'Buchern', 'Buche', 'Buchs'], answer: 'Bücher', explain: '"Buch" → "Bücher".' },
          { options: ['Länder', 'Landers', 'Lände', 'Landes'], answer: 'Länder', explain: '"Land" → "Länder" (-er + Umlaut).' },
          { options: ['Hefte', 'Hefts', 'Heftens', 'Heften'], answer: 'Hefte', explain: '"Heft" → "Hefte".' },
          { options: ['Stifte', 'Stifts', 'Stiften', 'Stiftens'], answer: 'Stifte', explain: '"Stift" → "Stifte".' },
          { options: ['Schüler', 'Schülers', 'Schülern', 'Schülere'], answer: 'Schüler', explain: '"Schüler" (patrón sin cambio) → "Schüler".' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe el plural de cada sustantivo.',
        type: 'freeText',
        scene: 'Escribe el plural de cada sustantivo.',
        text: 'In meiner Familie gibt es drei [[0]] (Kind). Wir haben zwei [[1]] (Auto). In unserem Haus gibt es fünf [[2]] (Zimmer). Meine [[3]] (Freund) kommen aus verschiedenen [[4]] (Land).',
        blanks: [
          { answer: 'Kinder', accepted: ['Kinder'], explain: '"Kind" → "Kinder".' },
          { answer: 'Autos', accepted: ['Autos'], explain: '"Auto" → "Autos" (-s).' },
          { answer: 'Zimmer', accepted: ['Zimmer'], explain: '"Zimmer" → "Zimmer" (sin cambio).' },
          { answer: 'Freunde', accepted: ['Freunde'], explain: '"Freund" → "Freunde".' },
          { answer: 'Länder', accepted: ['Länder'], explain: '"Land" → "Länder".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones usando plurales alemanes.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di cuántos libros tienes usando el plural de "Buch".',
            answer: 'Ich habe viele Bücher zu Hause.',
            accepted: ['bücher', 'viele bücher', 'drei bücher', 'zwei bücher'],
            explain: '"Buch" → "Bücher". Ich habe 20 Bücher. / Meine Bücher sind auf Spanisch.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Describe tu familia usando el plural de "Kind" o "Eltern".',
            answer: 'Meine Eltern wohnen in Madrid. Wir haben keine Kinder.',
            accepted: ['kinder', 'eltern'],
            explain: '"Kind" → "Kinder". "Eltern" es siempre plural. Ejemplo: Ich habe zwei Kinder.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Menciona algo que hay en tu ciudad usando 2-3 sustantivos en plural.',
            answer: 'In meiner Stadt gibt es viele Parks, Restaurants und Museen.',
            accepted: ['parks', 'restaurants', 'museen', 'schulen', 'straßen', 'häuser', 'geschäfte'],
            explain: 'Ejemplo: Es gibt Cafés, Hotels und Universitäten in meiner Stadt.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di cuántos amigos tienes usando el plural de "Freund/Freundin".',
            answer: 'Ich habe viele Freunde und Freundinnen.',
            accepted: ['freunde', 'freundinnen'],
            explain: '"Freund" → "Freunde". "Freundin" → "Freundinnen".',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Describe tu hogar o ciudad usando formas de plural.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué hay en tu casa usando 2 plurales (Zimmer, Tische, Stühle, Bücher...).',
            answer: 'In meinem Haus gibt es fünf Zimmer und viele Bücher.',
            accepted: ['zimmer', 'bücher', 'tische', 'stühle', 'fenster', 'lampen', 'betten'],
            explain: 'Ejemplo: Es gibt drei Schlafzimmer und zwei Bäder. / Auf dem Tisch liegen viele Bücher.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Describe tu ciudad mencionando 2 cosas en plural.',
            answer: 'In meiner Stadt gibt es viele Parks und schöne Cafés.',
            accepted: ['parks', 'cafés', 'häuser', 'straßen', 'restaurants', 'museen', 'schulen', 'kirchen'],
            explain: 'Ejemplo: Es gibt historische Kirchen und moderne Museen. / Die Parks sind sehr schön.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Habla de la gente que hay en tu vida usando plurales (Freunde, Kinder, Kollegen...).',
            answer: 'Meine Freunde sind sehr nett. Wir treffen uns oft.',
            accepted: ['freunde', 'freundinnen', 'kollegen', 'kinder', 'geschwister', 'eltern', 'nachbarn'],
            explain: 'Ejemplo: Meine Kollegen sind nett. / Meine Geschwister wohnen in verschiedenen Städten.',
          },
        ],
      },
    ],
  },
}

export default topic
