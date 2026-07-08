import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'relativsaetze-a2',
  order: '10',
  color: '#c9a900',
  category: 'Satzstruktur',
  level: 'A2',
  title: 'Relativsätze mit der, die, das',
  shortTitle: 'Relativsätze',
  metaTitle: 'Oraciones de relativo en alemán A2 — der, die, das',
  description:
    'Las oraciones de relativo (Relativsätze) permiten ampliar información sobre un sustantivo usando el pronombre relativo der, die o das. En alemán, el pronombre relativo concuerda en género con el sustantivo al que se refiere, y el verbo va al final de la cláusula relativa.',
  lead: 'Amplía información sobre sustantivos: das Buch, das ich lese — der Mann, der kommt.',
  outcomes: [
    'Identificar el género del antecedente para elegir el pronombre relativo correcto',
    'Colocar el verbo al final de la oración de relativo',
    'Usar el pronombre relativo en Nominativ y Akkusativ',
    'Separar la oración de relativo con coma en escritura',
  ],

  guide: {
    goal: 'Construir Relativsätze con der/die/das en Nominativ y Akkusativ.',
    model: 'Das Buch, das ich lese, ist interessant. / Der Mann, der dort steht, ist mein Lehrer.',
    formula: 'Hauptsatz + , + Relativpronomen + ... + Verb (final)',
    decisions: [
      'El pronombre relativo concuerda en GÉNERO con el sustantivo antecedente: der Mann → der/den; die Frau → die; das Kind → das',
      'Nominativ (sujeto de la relativa): der (m), die (f), das (n), die (pl) → Der Mann, der spricht...',
      'Akkusativ (objeto de la relativa): den (m), die (f), das (n), die (pl) → Der Mann, den ich sehe...',
      'El verbo de la oración relativa va SIEMPRE al final: das Buch, das ich gestern gekauft habe',
      'Separar siempre con coma: Das ist die Frau, die Deutsch lernt.',
      'El caso del pronombre relativo depende de su función dentro de la oración relativa, no de la principal',
    ],
    table: [
      ['Genus', 'Nominativ (sujeto)', 'Akkusativ (objeto)'],
      ['Maskulin', 'der → der Mann, der lacht', 'der → den Mann, den ich kenne'],
      ['Feminin', 'die → die Frau, die lacht', 'die → die Frau, die ich kenne'],
      ['Neutrum', 'das → das Kind, das lacht', 'das → das Kind, das ich kenne'],
      ['Plural', 'die → Kinder, die lachen', 'die → Kinder, die ich kenne'],
    ],
    mistakes: [
      'Poner el verbo en posición 2 dentro de la relativa: INCORRECTO "das Buch, das ist interessant" → CORRECTO "das Buch, das interessant ist"',
      'Olvidar la coma antes del pronombre relativo: INCORRECTO "Das ist der Mann der kommt" → CORRECTO "Das ist der Mann, der kommt"',
      'Confundir el género del antecedente: INCORRECTO "Das Mädchen, der singt" → CORRECTO "Das Mädchen, das singt" (Mädchen es neutro)',
    ],
  },

  seo: [
    {
      heading: 'Cómo funciona el pronombre relativo en alemán',
      paragraphs: [
        'El pronombre relativo en alemán (der, die, das) funciona de manera similar al "que" español, pero con dos diferencias clave: primero, concuerda en género y número con el sustantivo al que se refiere (el antecedente); segundo, el verbo de la oración relativa siempre va al final.',
        'Para elegir el pronombre correcto, debes saber el género del antecedente: "der Mann" → der/den; "die Frau" → die; "das Kind" → das; plural → die. Luego debes determinar si el pronombre es sujeto (Nominativ) u objeto (Akkusativ) dentro de la oración relativa.',
      ],
    },
    {
      heading: 'Nominativ vs. Akkusativ en la oración relativa',
      paragraphs: [
        'Si el pronombre relativo es el sujeto de la oración relativa, usa el Nominativ: "Der Mann, der dort steht, ist mein Chef." (der Mann = sujeto de la relativa). Si es el objeto, usa el Akkusativ: "Der Mann, den ich sehe, ist mein Chef." (den Mann = objeto de "sehe").',
        'La distinción más visible es en masculino: el Nominativ es "der" y el Akkusativ es "den". En femenino y neutro, el Nominativ y Akkusativ son iguales: "die" y "das" respectivamente.',
      ],
    },
    {
      heading: 'El verbo al final de la oración de relativo',
      paragraphs: [
        'Una regla fundamental del alemán es que en las cláusulas subordinadas (incluyendo las de relativo), el verbo conjugado va al final. Esto significa que si hay un Perfekt en la relativa, el verbo auxiliar va al último lugar: "das Buch, das ich gestern gekauft habe" — "habe" va al final, después incluso del Partizip II.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Relativsätze: pronombre relativo concuerda con antecedente, verbo al final.',
    graphicPrompt: 'Diagrama con sustantivo → pronombre relativo → verbo al final de la cláusula.',
    scene: [
      ['Der Mann, der dort steht, ist mein Lehrer', 'El hombre que está allí es mi profesor'],
      ['Die Frau, die ich kenne, heißt Anna', 'La mujer que conozco se llama Anna'],
      ['Das Buch, das ich lese, ist interessant', 'El libro que leo es interesante'],
      ['Die Kinder, die spielen, sind laut', 'Los niños que juegan son ruidosos'],
      ['Das ist der Film, den ich empfehle', 'Esa es la película que recomiendo'],
      ['Sie ist die Lehrerin, die ich mag', 'Ella es la profesora que me cae bien'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['der/die/das pronombre relativo', 'verbo al final', 'coma obligatoria'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennung',
        tag: 'Opción múltiple',
        intro: 'Elige el pronombre relativo correcto.',
        type: 'choice',
        items: [
          {
            scene: 'Describiendo a un hombre',
            lines: [['', 'Der Mann, ___ dort steht, ist mein Vater.']],
            options: ['der', 'die', 'das', 'den'],
            answer: 'der',
            explain: '"Mann" es masculino. Nominativ masculino → der.',
          },
          {
            scene: 'Hablando de una mujer',
            lines: [['', 'Die Frau, ___ Deutsch unterrichtet, heißt Frau Müller.']],
            options: ['die', 'der', 'das', 'den'],
            answer: 'die',
            explain: '"Frau" es femenino. Nominativ femenino → die.',
          },
          {
            scene: 'Hablando de un libro',
            lines: [['', 'Das Buch, ___ auf dem Tisch liegt, ist meins.']],
            options: ['das', 'der', 'die', 'den'],
            answer: 'das',
            explain: '"Buch" es neutro. Nominativ neutro → das.',
          },
          {
            scene: 'Describiendo niños',
            lines: [['', 'Die Kinder, ___ im Park spielen, sind meine Nachbarn.']],
            options: ['die', 'der', 'das', 'den'],
            answer: 'die',
            explain: 'Plural, independientemente del género. Nominativ plural → die.',
          },
          {
            scene: 'El amigo que conociste',
            lines: [['', 'Das ist der Freund, ___ ich gestern getroffen habe.']],
            options: ['den', 'der', 'die', 'das'],
            answer: 'den',
            explain: '"Freund" es masculino. Akkusativ masculino → den (objeto de "getroffen").',
          },
          {
            scene: 'La película que recomiendas',
            lines: [['', 'Das ist der Film, ___ ich empfehle.']],
            options: ['den', 'der', 'die', 'das'],
            answer: 'den',
            explain: '"Film" es masculino. Akkusativ masculino → den (objeto de "empfehle").',
          },
          {
            scene: 'La ciudad que visitaste',
            lines: [['', 'Das ist die Stadt, ___ ich besucht habe.']],
            options: ['die', 'der', 'das', 'den'],
            answer: 'die',
            explain: '"Stadt" es femenino. Akkusativ femenino → die (igual al Nominativ en femenino).',
          },
          {
            scene: 'El libro que compraste',
            lines: [['', 'Das Buch, ___ ich gekauft habe, ist sehr gut.']],
            options: ['das', 'der', 'die', 'den'],
            answer: 'das',
            explain: '"Buch" es neutro. Akkusativ neutro → das (igual al Nominativ en neutro).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Doppelergänzung',
        tag: '2 espacios',
        intro: 'Completa el pronombre relativo y el verbo al final.',
        type: 'dual',
        items: [
          {
            scene: 'Una profesora que habla bien',
            lines: [['', 'Die Lehrerin, [[0]] so gut spricht, [[1]] aus Österreich.']],
            blanks: [
              { options: ['die', 'der', 'das', 'den'], answer: 'die', explain: '"Lehrerin" es femenino. Nominativ femenino: die.' },
              { options: ['kommt', 'kommen', 'komme', 'kommst'], answer: 'kommt', explain: 'Verbo de la oración principal: sie kommt (3.ª pers. sg.).' },
            ],
          },
          {
            scene: 'Un restaurante que conoces',
            lines: [['', 'Das Restaurant, [[0]] ich empfehle, [[1]] sehr gut.']],
            blanks: [
              { options: ['das', 'der', 'die', 'den'], answer: 'das', explain: '"Restaurant" es neutro. Akkusativ neutro: das.' },
              { options: ['ist', 'sind', 'bin', 'bist'], answer: 'ist', explain: 'Verbo de la oración principal: es ist (3.ª pers. sg.).' },
            ],
          },
          {
            scene: 'El estudiante que estudia mucho',
            lines: [['', 'Der Student, [[0]] viel lernt, [[1]] den Kurs.']],
            blanks: [
              { options: ['der', 'die', 'das', 'den'], answer: 'der', explain: '"Student" es masculino. Nominativ masculino: der.' },
              { options: ['besteht', 'bestehen', 'bestehe', 'besteht'], answer: 'besteht', explain: 'Verbo principal: er besteht den Kurs (3.ª pers. sg.).' },
            ],
          },
          {
            scene: 'La música que escuchas',
            lines: [['', 'Die Musik, [[0]] du hörst, [[1]] sehr schön.']],
            blanks: [
              { options: ['die', 'der', 'das', 'den'], answer: 'die', explain: '"Musik" es femenino. Akkusativ femenino: die.' },
              { options: ['klingt', 'klingen', 'klinge', 'klingst'], answer: 'klingt', explain: 'Verbo principal: sie klingt (3.ª pers. sg.).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Lückentext',
        tag: 'Texto guiado',
        intro: 'Completa el texto con los pronombres relativos correctos.',
        type: 'guidedText',
        scene: 'Luis describe la escuela y sus compañeros.',
        text: 'Ich gehe in eine Schule, [[0]] sehr modern ist. Der Lehrer, [[1]] Mathematik unterrichtet, erklärt alles sehr gut. Die Schüler, [[2]] ich täglich sehe, sind nett. Das Buch, [[3]] wir benutzen, ist neu. Die Freundin, [[4]] neben mir sitzt, heißt Sofia.',
        blanks: [
          { options: ['die', 'der', 'das', 'den'], answer: 'die', explain: '"Schule" es femenino. Nominativ femenino: die.' },
          { options: ['der', 'die', 'das', 'den'], answer: 'der', explain: '"Lehrer" es masculino. Nominativ masculino: der.' },
          { options: ['die', 'der', 'das', 'den'], answer: 'die', explain: '"Schüler" es plural. Akkusativ plural: die.' },
          { options: ['das', 'die', 'der', 'den'], answer: 'das', explain: '"Buch" es neutro. Akkusativ neutro: das.' },
          { options: ['die', 'der', 'das', 'den'], answer: 'die', explain: '"Freundin" es femenino. Nominativ femenino: die.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Freier Text',
        tag: 'Texto libre',
        intro: 'Escribe el pronombre relativo correcto sin opciones.',
        type: 'freeText',
        scene: 'María habla de su ciudad favorita.',
        text: 'Berlin ist eine Stadt, [[0]] ich sehr mag. Das Museum, [[1]] ich besucht habe, war fantastisch. Der Park, [[2]] mitten in der Stadt liegt, ist sehr groß. Die Menschen, [[3]] ich getroffen habe, waren freundlich. Das Hotel, [[4]] wir gewohnt haben, war gemütlich.',
        blanks: [
          { answer: 'die', accepted: ['die'], explain: '"Stadt" es femenino. Akkusativ femenino: die.' },
          { answer: 'das', accepted: ['das'], explain: '"Museum" es neutro. Akkusativ neutro: das.' },
          { answer: 'der', accepted: ['der'], explain: '"Park" es masculino. Nominativ masculino: der.' },
          { answer: 'die', accepted: ['die'], explain: '"Menschen" es plural. Akkusativ plural: die.' },
          { answer: 'das', accepted: ['das'], explain: '"Hotel" es neutro. Akkusativ neutro: das (objeto de "gewohnt").' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produktion',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones de relativo completas.',
        type: 'write',
        items: [
          {
            scene: 'Describiendo a un amigo',
            prompt: 'Describe a un amigo usando una oración de relativo (Der Freund, der...).',
            answer: 'Der Freund, der bei mir wohnt, kommt aus Spanien.',
            accepted: ['der ... wohnt', 'der ... kommt', 'den ich kenne'],
            explain: '"Freund" es masculino. Nominativ: der. Verbo al final de la relativa.',
          },
          {
            scene: 'Recomendando un libro',
            prompt: 'Recomienda un libro usando una oración de relativo (Das ist das Buch, das...).',
            answer: 'Das ist das Buch, das ich dir empfehle.',
            accepted: ['das ich', 'das sehr interessant ist', 'das du lesen solltest'],
            explain: '"Buch" es neutro. Akkusativ neutro: das. Verbo al final.',
          },
          {
            scene: 'Describiendo una película',
            prompt: 'Habla de una película que te gustó usando una oración de relativo.',
            answer: 'Der Film, den ich gestern gesehen habe, war sehr gut.',
            accepted: ['den ich gesehen habe', 'den ich empfehle', 'der sehr bekannt ist'],
            explain: '"Film" es masculino. Akkusativ: den. Verbo al final: habe gesehen → habe al final.',
          },
          {
            scene: 'Describiendo un lugar',
            prompt: 'Describe un lugar que conoces usando una oración de relativo.',
            answer: 'Die Stadt, die ich besucht habe, war wunderschön.',
            accepted: ['die ich besucht', 'die sehr groß ist', 'die ich kenne'],
            explain: '"Stadt" es femenino. Akkusativ: die. Verbo al final de la oración relativa.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Kommunikation',
        tag: 'Texto libre',
        intro: 'Escribe sobre personas, lugares u objetos usando oraciones de relativo.',
        type: 'write',
        items: [
          {
            scene: 'Tu mejor amigo o amiga',
            prompt: 'Describe a tu mejor amigo/a con 2-3 oraciones de relativo.',
            answer: 'Meine Freundin, die in Madrid wohnt, studiert Medizin. Sie ist die Person, die mich am besten kennt. Das Foto, das ich von ihr habe, steht auf meinem Schreibtisch.',
            accepted: ['die in ... wohnt', 'der in ... wohnt', 'die ich kenne', 'den ich kenne', 'das ich'],
            explain: 'Pronombre relativo concuerda con el sustantivo antecedente. Verbo al final de cada oración relativa.',
          },
          {
            scene: 'Tu lugar favorito',
            prompt: 'Describe tu lugar favorito con 2-3 oraciones de relativo.',
            answer: 'Der Park, der neben meinem Haus liegt, ist sehr schön. Das Cafe, das ich oft besuche, heißt Bella Vista. Die Menschen, die dort arbeiten, sind sehr freundlich.',
            accepted: ['der neben', 'das ich', 'die ich', 'den ich'],
            explain: 'Der Park (m) → der/den; Das Cafe (n) → das; Die Menschen (pl) → die.',
          },
          {
            scene: 'Recomendaciones personales',
            prompt: 'Haz 3 recomendaciones (libro, película, restaurante) usando oraciones de relativo.',
            answer: 'Das Buch, das ich empfehle, ist sehr interessant. Der Film, den ich gesehen habe, ist toll. Das Restaurant, das ich kenne, ist sehr gut.',
            accepted: ['das ich empfehle', 'den ich', 'die ich', 'das ich kenne'],
            explain: 'Recuerda: Akkusativ si el pronombre es objeto (den/die/das según género).',
          },
        ],
      },
    ],
  },
}

export default topic
