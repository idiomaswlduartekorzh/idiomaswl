import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'komparativ-superlativ-a2',
  order: '04',
  color: '#c9a900',
  category: 'Adjektive',
  level: 'A2',
  title: 'Komparativ und Superlativ im Deutschen A2',
  shortTitle: 'Komparativ & Superlativ',
  metaTitle: 'Comparativo y Superlativo — Alemán A2: Komparativ und Superlativ',
  description:
    'Para comparar personas, objetos y situaciones en alemán se usa el Komparativ (mehr, besser) y el Superlativ (am schnellsten, der beste). Muchos adjetivos añaden una diéresis en el comparativo, y hay formas irregulares esenciales.',
  lead: 'Schnell → schneller → am schnellsten: comparar y superar en alemán.',
  outcomes: [
    'Formar el Komparativ añadiendo -er al adjetivo (schnell → schneller)',
    'Formar el Superlativ con am + -sten o der/die/das + -ste',
    'Usar las formas irregulares: gut → besser → am besten',
    'Reconocer los adjetivos que añaden diéresis en el comparativo',
  ],

  guide: {
    goal: 'Comparar cualidades y cantidades usando Komparativ y Superlativ.',
    model: 'Berlin ist größer als München. / Das ist das beste Restaurant in der Stadt.',
    formula: 'Komparativ: adj + -er | Superlativ predicativo: am + adj + -sten | Superlativ atributivo: der/die/das + adj + -ste',
    decisions: [
      'Komparativ: añade -er a la raíz del adjetivo: schnell → schneller, klein → kleiner, interessant → interessanter',
      'Comparación: "als" = que: Berlin ist größer als München. / Ich bin älter als du.',
      'Diéresis en comparativo (monosílabos comunes): alt → älter, jung → jünger, groß → größer, lang → länger, warm → wärmer, kalt → kälter, kurz → kürzer',
      'Superlativ predicativo (sin artículo): am + adj + -sten: Er ist am schnellsten. / Das schmeckt am besten.',
      'Superlativ atributivo (con artículo): der/die/das + adj + -ste/-sten: das beste Buch, die schönste Stadt',
      'Irregulares imprescindibles: gut → besser → am besten / viel → mehr → am meisten / gern → lieber → am liebsten',
    ],
    table: [
      ['Positivo', 'Komparativ', 'Superlativ'],
      ['schnell', 'schneller', 'am schnellsten'],
      ['groß', 'größer', 'am größten'],
      ['gut', 'besser', 'am besten'],
      ['viel', 'mehr', 'am meisten'],
      ['gern', 'lieber', 'am liebsten'],
      ['alt', 'älter', 'am ältesten'],
    ],
    mistakes: [
      'Usar "wie" en lugar de "als" para desigualdad: INCORRECTO "Er ist größer wie ich" → CORRECTO "Er ist größer als ich"',
      'Olvidar la diéresis en comparativos: INCORRECTO "alter" → CORRECTO "älter"',
      'Confundir am + sten (predicativo) con der/ste (atributivo): "am besten" vs "das beste"',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma el Komparativ en alemán?',
      paragraphs: [
        'El comparativo alemán es muy regular: simplemente añade -er al adjetivo. Así "schnell" (rápido) se convierte en "schneller" (más rápido), "klein" (pequeño) en "kleiner" (más pequeño), "schön" (bonito) en "schöner" (más bonito). La estructura de la comparación es: Adj + -er + als + el elemento comparado.',
        'Algunos adjetivos monosílabos muy comunes añaden diéresis en el comparativo: alt → älter (mayor), jung → jünger (más joven), groß → größer (más grande), lang → länger (más largo), warm → wärmer (más cálido), kalt → kälter (más frío), kurz → kürzer (más corto). Estos hay que memorizarlos.',
      ],
    },
    {
      heading: '¿Cómo se forma el Superlativ en alemán?',
      paragraphs: [
        'El superlativo tiene dos formas en alemán. El superlativo predicativo se usa cuando no hay artículo y el adjetivo sigue al verbo: "Er ist am schnellsten" (Él es el más rápido). Se forma con "am" + adjetivo + "-sten" (o "-esten" si el adjetivo termina en -d, -t, -s, -ß, -z).',
        'El superlativo atributivo va antes del sustantivo con artículo definido y sigue las reglas de declinación: "Das ist das beste Restaurant." / "Er hat den teuersten Wein bestellt." La raíz del superlativo es siempre adj + -st-, luego se añaden las terminaciones de declinación.',
      ],
    },
    {
      heading: '¿Cuáles son las formas irregulares del comparativo alemán?',
      paragraphs: [
        'Solo tres grupos de irregulares son realmente esenciales en A2: gut/besser/am besten (bueno), viel/mehr/am meisten (mucho), gern/lieber/am liebsten (con gusto, preferir). También hoch/höher/am höchsten (alto) y nah/näher/am nächsten (cerca).',
        '"Gern" es especialmente útil: "Ich esse gern Pizza" (Me gusta comer pizza), "Ich esse lieber Pasta" (Prefiero comer pasta), "Am liebsten esse ich Sushi" (Lo que más me gusta es comer sushi). Esta estructura aparece constantemente en conversaciones.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Komparativ (-er + als) y Superlativ (am -sten) con irregulares gut/viel/gern.',
    graphicPrompt: 'Tres barras de altura creciente con adjetivos en positivo, comparativo y superlativo.',
    scene: [
      ['schnell → schneller → am schnellsten', 'rápido → más rápido → el más rápido'],
      ['groß → größer → am größten', 'grande → más grande → el más grande'],
      ['gut → besser → am besten', 'bueno → mejor → el mejor'],
      ['viel → mehr → am meisten', 'mucho → más → el más/lo más'],
      ['alt → älter → am ältesten', 'viejo/mayor → más mayor → el más mayor'],
      ['Berlin ist größer als München', 'Berlín es más grande que Múnich'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-er + als', 'am + -sten', 'gut/besser/am besten'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennung',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del Komparativ o Superlativ.',
        type: 'choice',
        items: [
          {
            scene: 'Comparando ciudades',
            lines: [['', 'München ist ___ als Köln. (groß)']],
            options: ['größer', 'großer', 'am größten', 'größte'],
            answer: 'größer',
            explain: 'Comparativo de "groß" → größer (con diéresis). Se usa "als" para la comparación.',
          },
          {
            scene: 'Hablando de preferencias',
            lines: [['', 'Ich esse ___ Pizza als Pasta. (gern)']],
            options: ['lieber', 'mehr', 'gerner', 'am liebsten'],
            answer: 'lieber',
            explain: '"gern" es irregular: gern → lieber → am liebsten. Comparativo: lieber.',
          },
          {
            scene: 'El mejor restaurante',
            lines: [['', 'Das ist das ___ Restaurant in der Stadt. (gut)']],
            options: ['beste', 'besten', 'am besten', 'bessere'],
            answer: 'beste',
            explain: 'Superlativo atributivo: das + Adj + -ste. "gut" → "das beste".',
          },
          {
            scene: 'Comparando edades',
            lines: [['', 'Mein Bruder ist ___ als ich. (jung)']],
            options: ['jünger', 'junger', 'am jüngsten', 'jungster'],
            answer: 'jünger',
            explain: '"jung" → comparativo "jünger" (con diéresis).',
          },
          {
            scene: 'El más rápido',
            lines: [['', 'Von allen Schülern läuft sie ___. (schnell)']],
            options: ['am schnellsten', 'schnellste', 'schneller', 'die schnellste'],
            answer: 'am schnellsten',
            explain: 'Superlativo predicativo: am + adj + -sten. "am schnellsten".',
          },
          {
            scene: 'Hablando de cantidades',
            lines: [['', 'Er hat ___ Geld als sein Bruder. (viel)']],
            options: ['mehr', 'vieler', 'am meisten', 'viele'],
            answer: 'mehr',
            explain: '"viel" es irregular: viel → mehr → am meisten. Comparativo: mehr.',
          },
          {
            scene: 'La ciudad más fría',
            lines: [['', 'Im Januar ist es in Berlin ___ als in München. (kalt)']],
            options: ['kälter', 'kalter', 'am kältesten', 'kälteste'],
            answer: 'kälter',
            explain: '"kalt" → comparativo "kälter" (con diéresis).',
          },
          {
            scene: 'Lo que más te gusta',
            lines: [['', 'Ich mag Sport, aber ___ mag ich Musik. (gern)']],
            options: ['am liebsten', 'lieber', 'mehr', 'am meisten'],
            answer: 'am liebsten',
            explain: '"am liebsten" = lo que más me gusta. Es el superlativo de "gern".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Doppelergänzung',
        tag: '2 espacios',
        intro: 'Completa con el comparativo y la palabra de comparación.',
        type: 'dual',
        items: [
          {
            scene: 'Comparando hermanos',
            lines: [['', 'Meine Schwester ist [[0]] [[1]] ich. (alt)']],
            blanks: [
              { options: ['älter', 'alter', 'am ältesten', 'älteste'], answer: 'älter', explain: '"alt" → comparativo "älter" (con diéresis).' },
              { options: ['als', 'wie', 'dann', 'von'], answer: 'als', explain: 'En desigualdad siempre "als" (no "wie").' },
            ],
          },
          {
            scene: 'El mejor y la comparación',
            lines: [['', 'Dieses Hotel ist [[0]] und auch [[1]] als das andere. (gut, teuer)']],
            blanks: [
              { options: ['am besten', 'am beste', 'besser', 'beste'], answer: 'am besten', explain: '"gut" → superlativo predicativo "am besten".' },
              { options: ['teurer', 'teuerer', 'am teuersten', 'teureste'], answer: 'teurer', explain: '"teuer" → comparativo "teurer" (se pierde la -e-).' },
            ],
          },
          {
            scene: 'Comparando velocidades',
            lines: [['', 'Das Auto fährt [[0]] [[1]] das Fahrrad. (schnell)']],
            blanks: [
              { options: ['schneller', 'am schnellsten', 'schnellste', 'schneller'], answer: 'schneller', explain: '"schnell" → comparativo "schneller".' },
              { options: ['als', 'wie', 'wie', 'als'], answer: 'als', explain: '"als" para desigualdad (schneller als = más rápido que).' },
            ],
          },
          {
            scene: 'El más pequeño de todos',
            lines: [['', 'Von allen Kindern ist er [[0]] und hat auch [[1]] Spielzeug. (klein, wenig)']],
            blanks: [
              { options: ['am kleinsten', 'kleiner', 'die kleinste', 'kleinste'], answer: 'am kleinsten', explain: '"klein" → superlativo predicativo "am kleinsten".' },
              { options: ['am wenigsten', 'weniger', 'am meisten', 'wenigste'], answer: 'am wenigsten', explain: '"wenig" → superlativo "am wenigsten".' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Lückentext',
        tag: 'Texto guiado',
        intro: 'Completa el texto con las formas correctas de comparativo y superlativo.',
        type: 'guidedText',
        scene: 'Una persona compara tres restaurantes de su ciudad.',
        text: 'In unserer Stadt gibt es drei Restaurants. Das erste ist gut, aber das zweite ist [[0]]. Das dritte Restaurant ist [[1]] von allen — es hat das [[2]] Essen. Das erste Restaurant ist [[3]] als die anderen, aber es hat den [[4]] Service. Ich gehe [[5]] ins dritte Restaurant.',
        blanks: [
          { options: ['besser', 'gut', 'am besten', 'beste'], answer: 'besser', explain: '"gut" → comparativo "besser".' },
          { options: ['am besten', 'besser', 'beste', 'gut'], answer: 'am besten', explain: 'Superlativo predicativo: "am besten" (predicado).' },
          { options: ['beste', 'besten', 'am besten', 'besser'], answer: 'beste', explain: 'Superlativo atributivo: das + "beste" + Nomen.' },
          { options: ['billiger', 'billiger', 'am billigsten', 'billige'], answer: 'billiger', explain: '"billig" → comparativo "billiger" + als.' },
          { options: ['schnellsten', 'schnellste', 'am schnellsten', 'schneller'], answer: 'schnellsten', explain: 'Superlativo atributivo masculino Akkusativ: den + adj + -sten.' },
          { options: ['am liebsten', 'lieber', 'am meisten', 'gerne'], answer: 'am liebsten', explain: '"am liebsten" = lo que más me gusta (superlativo de gern).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Freier Text',
        tag: 'Texto libre',
        intro: 'Completa libremente con Komparativ o Superlativ.',
        type: 'freeText',
        scene: 'Marc compara su ciudad con otras.',
        text: 'Meine Stadt ist [[0]] als die Hauptstadt, aber sie ist auch [[1]]. Der Sommer hier ist [[2]] als in Berlin und der Winter ist [[3]]. Das [[4]] an meiner Stadt ist die Natur.',
        blanks: [
          { answer: 'kleiner', accepted: ['kleiner'], explain: '"klein" → comparativo "kleiner".' },
          { answer: 'schöner', accepted: ['schöner', 'ruhiger', 'billiger'], explain: 'Comparativo de "schön" → schöner, o "ruhig" → ruhiger.' },
          { answer: 'wärmer', accepted: ['wärmer', 'heißer'], explain: '"warm" → wärmer o "heiß" → heißer.' },
          { answer: 'kälter', accepted: ['kälter', 'kürzer'], explain: '"kalt" → kälter (con diéresis).' },
          { answer: 'Beste', accepted: ['Beste', 'beste', 'Schönste', 'schönste'], explain: 'Superlativo atributivo neutro: das Beste / das Schönste.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produktion',
        tag: 'Escritura guiada',
        intro: 'Escribe comparaciones usando Komparativ y Superlativ.',
        type: 'write',
        items: [
          {
            scene: 'Comparando dos ciudades',
            prompt: 'Compara dos ciudades que conoces usando "größer/kleiner/schöner als".',
            answer: 'Berlin ist größer als Hamburg, aber Hamburg ist schöner als Berlin.',
            accepted: ['als', 'größer', 'kleiner', 'schöner'],
            explain: 'Comparativo + als: A ist [Adj]-er als B.',
          },
          {
            scene: 'Tus preferencias',
            prompt: 'Di qué comida prefieres (gern → lieber → am liebsten).',
            answer: 'Ich esse gern Pizza, aber am liebsten esse ich Sushi.',
            accepted: ['am liebsten', 'lieber', 'gern'],
            explain: 'gern = me gusta, lieber = prefiero, am liebsten = lo que más me gusta.',
          },
          {
            scene: 'El mejor de tu familia',
            prompt: 'Di quién es el mayor y el más alto de tu familia.',
            answer: 'Mein Vater ist der Älteste in der Familie und mein Bruder ist am größten.',
            accepted: ['am ältesten', 'am größten', 'älteste', 'größte'],
            explain: 'Usa "der/die/das + -ste" (atributivo) o "am + -sten" (predicativo).',
          },
          {
            scene: 'Comparando estaciones',
            prompt: 'Compara dos estaciones del año usando Komparativ.',
            answer: 'Der Sommer ist wärmer als der Winter, aber der Winter ist kälter und länger.',
            accepted: ['wärmer', 'kälter', 'länger', 'als'],
            explain: 'Usa comparativos con diéresis: wärmer, kälter, länger.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Kommunikation',
        tag: 'Texto libre',
        intro: 'Escribe un párrafo comparando tres opciones.',
        type: 'write',
        items: [
          {
            scene: 'Tres restaurantes o cafés',
            prompt: 'Compara tres restaurantes o cafés usando bueno/mejor/el mejor y barato/más barato/el más barato.',
            answer: 'Das Café Mitte ist gut, das Café Nord ist besser und das Café Süd ist am besten. Aber das Café Mitte ist am billigsten.',
            accepted: ['besser', 'am besten', 'am billigsten', 'billiger'],
            explain: 'Tres niveles: Positivo (gut), Komparativ (besser), Superlativ (am besten).',
          },
          {
            scene: 'Preferencias personales',
            prompt: 'Describe tus tres actividades favoritas usando gern/lieber/am liebsten.',
            answer: 'Ich lese gern. Ich reise lieber. Aber am liebsten koche ich für meine Familie.',
            accepted: ['gern', 'lieber', 'am liebsten'],
            explain: 'gern < lieber < am liebsten: escala de preferencia en alemán.',
          },
          {
            scene: 'Comparación de personas',
            prompt: 'Compara dos personas famosas que conoces (altura, edad, popularidad).',
            answer: 'Messi ist älter als Mbappé, aber Mbappé ist schneller. Messi ist der berühmteste Spieler der Welt.',
            accepted: ['älter als', 'schneller', 'der berühmteste', 'am berühmtesten'],
            explain: 'Usa comparativos (älter als, schneller als) y superlativo (der berühmteste / am berühmtesten).',
          },
        ],
      },
    ],
  },
}

export default topic
