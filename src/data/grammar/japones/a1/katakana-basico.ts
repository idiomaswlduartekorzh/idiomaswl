import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'katakana-basico',
  order: '06',
  color: '#dc2626',
  category: 'Escritura',
  level: 'A1',
  title: 'Katakana básico en japonés A1 — Silabario para palabras extranjeras',
  shortTitle: 'Katakana',
  metaTitle: 'Katakana básico japonés A1 — silabario palabras extranjeras préstamos',
  description:
    'El katakana es uno de los tres sistemas de escritura del japonés y se usa principalmente para transcribir palabras de origen extranjero (préstamos), onomatopeyas y nombres propios extranjeros. Sus 46 caracteres base equivalen exactamente a los hiragana pero con trazos más angulares. Reconocer katakana te permite leer cientos de palabras que ya conoces del español o el inglés.',
  lead: 'Katakana (カタカナ) = silabario angular para palabras extranjeras. コーヒー (kōhī = café), テレビ (terebi = TV), スペイン (Supein = España). Cada símbolo katakana tiene su equivalente exacto en hiragana — mismo sonido, forma diferente.',
  outcomes: [
    'Reconoce los 46 caracteres katakana base y los asocia a sus equivalentes hiragana',
    'Lee palabras de origen español e inglés escritas en katakana',
    'Entiende las adaptaciones fonológicas del japonés (L/R unificados, alargamiento de vocales con ー)',
  ],

  guide: {
    goal: 'Leer y escribir palabras cotidianas en katakana, especialmente préstamos del español y el inglés.',
    model: 'コーヒー (kōhī = café) | テレビ (terebi = televisión) | スペイン (Supein = España) | レストラン (resutoran = restaurante)',
    formula: 'Palabra extranjera → adaptar a sílabas japonesas → escribir en katakana + ー para vocales largas',
    decisions: [
      'Katakana para palabras extranjeras: コーヒー, テレビ, パン, レストラン',
      'Katakana para nombres propios extranjeros: デービッド (David), カルロス (Carlos)',
      'ー (línea larga) alarga la vocal anterior: コー = kō, ビー = bī',
      'L y R son el mismo símbolo en japonés: ら/ラ = ra (no hay distinción)',
      'Algunas consonantes no existen: el japonés adapta "sp" → ス+ぺ, "st" → ス+と',
      'Hiragana y katakana tienen el mismo silabario — aprende los pares juntos',
    ],
    table: [
      ['Katakana', 'Hiragana', 'Romaji'],
      ['ア', 'あ', 'a'],
      ['イ', 'い', 'i'],
      ['ウ', 'う', 'u'],
      ['エ', 'え', 'e'],
      ['オ', 'お', 'o'],
    ],
    mistakes: [
      'ソ (so) y ン (n) se confunden fácilmente — el trazo final de ソ va hacia abajo-derecha, ン hacia arriba-derecha.',
      'シ (shi) y ツ (tsu) también se confunden — shI tiene dos trazos cortos a la izquierda, tSU los tiene arriba.',
      'No omitas el ー para vocales largas: コヒー sin alargar suena diferente a コーヒー (café).',
    ],
  },
  seo: [
    {
      heading: 'Por qué el katakana es el silabario más accesible para hispanohablantes',
      paragraphs: [
        'El katakana es paradójicamente el silabario más útil para comenzar a leer japonés en contexto real, porque la mayoría de sus palabras provienen del inglés, francés, alemán, portugués y español. Al leer un menú, una revista o una señal en Japón, encontrarás katakana por todas partes: コーヒー (café), ビール (beer/cerveza), レストラン (restaurante), タクシー (taxi), ホテル (hotel).',
        'Para el hispanohablante, la "trampa" es que las palabras se adaptan a la fonología japonesa. El japonés no tiene sílabas cerradas (excepto ん/n) ni ciertos sonidos como la "v" española. Así, "vino" se convierte en ビノ (bino) y "España" en エスパーニャ (Esupānya) o スペイン (Supein). Con práctica, empiezas a "escuchar" las palabras originales detrás de la adaptación.',
      ],
    },
    {
      heading: 'Palabras del español y el inglés que ya puedes leer en katakana',
      paragraphs: [
        'Muchas palabras del vocabulario cotidiano japonés vienen del español, portugués o inglés. Del español: パン (pan = pan), タバコ (tabako = tabaco), テンポ (tenpo = tempo). Del inglés/internacional: テレビ (terebi = TV), コンピューター (konpyūtā = computadora), インターネット (intānetto = internet), スマートフォン (sumātofon = smartphone).',
        'La regla del ー (katakana prolongado) es clave: representa el alargamiento de una vocal. En español lo entiendes intuitivamente: コーヒー = "koo-hii" = café, ビール = "bii-ru" = beer/cerveza. Este marcador de longitud no existe en hiragana de la misma forma.',
      ],
    },
  ],
  visual: {
    mode: 'syllabary-katakana',
    teacherLens: 'El estudiante asocia katakana a su equivalente hiragana y practica leyendo préstamos del español/inglés.',
    graphicPrompt: 'Tabla de katakana vs hiragana. Palabras préstamo: コーヒー, テレビ, レストラン con imagen.',
    scene: [
      ['Katakana = silabario angular', 'Palabras extranjeras'],
      ['ー = vocal larga', 'コーヒー = kōhī = café'],
      ['L = R en japonés', 'レストラン = resutoran'],
    ],
    learnerModes: ['visual: tabla katakana/hiragana', 'auditivo: pronunciar préstamos', 'analítico: reglas de adaptación'],
    reviewFocus: ['46 katakana base', 'ー para vocales largas', 'L/R unificados', 'préstamos cotidianos'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Katakana → significado',
        tag: 'Opción múltiple',
        intro: 'Elige qué palabra española/inglesa representa cada katakana.',
        type: 'choice',
        items: [
          {
            scene: 'Bebida caliente',
            lines: [['David', 'コーヒー (kōhī) — ¿qué significa?']],
            options: ['Café', 'Té', 'Agua', 'Leche'],
            answer: 'Café',
            explain: 'コーヒー (kōhī) = café. Préstamo del neerlandés "koffie". La ー alarga la vocal.',
          },
          {
            scene: 'Electrodoméstico',
            lines: [['Ana', 'テレビ (terebi) — ¿qué es?']],
            options: ['Televisión', 'Radio', 'Computadora', 'Teléfono'],
            answer: 'Televisión',
            explain: 'テレビ (terebi) = televisión. Préstamo del inglés "television" / "TV".',
          },
          {
            scene: 'País hispanohablante',
            lines: [['Carlos', 'スペイン (Supein) — ¿qué país es?']],
            options: ['España', 'Argentina', 'México', 'Colombia'],
            answer: 'España',
            explain: 'スペイン (Supein) = España. La "sp" inicial se adapta con ス antes de ペ.',
          },
          {
            scene: 'Lugar para comer',
            lines: [['Sofia', 'レストラン (resutoran) — ¿qué lugar es?']],
            options: ['Restaurante', 'Hotel', 'Supermercado', 'Banco'],
            answer: 'Restaurante',
            explain: 'レストラン (resutoran) = restaurante. Préstamo del francés "restaurant".',
          },
          {
            scene: 'Alimento básico',
            lines: [['Marco', 'パン (pan) — ¿qué es?']],
            options: ['Pan', 'Arroz', 'Pasta', 'Carne'],
            answer: 'Pan',
            explain: 'パン (pan) = pan. Préstamo del portugués "pão" (o español "pan") — llegó con los misioneros portugueses.',
          },
          {
            scene: 'Transporte urbano',
            lines: [['Lina', 'タクシー (takushī) — ¿qué es?']],
            options: ['Taxi', 'Bus', 'Metro', 'Bicicleta'],
            answer: 'Taxi',
            explain: 'タクシー (takushī) = taxi. La ー final alarga la vocal "i". Préstamo internacional.',
          },
          {
            scene: 'Alojamiento',
            lines: [['Zhanna', 'ホテル (hoteru) — ¿qué es?']],
            options: ['Hotel', 'Casa', 'Apartamento', 'Hostel'],
            answer: 'Hotel',
            explain: 'ホテル (hoteru) = hotel. La "l" final se convierte en ル (ru) por la fonología japonesa.',
          },
          {
            scene: 'Tecnología',
            lines: [['David', 'スマートフォン (sumātofon) — ¿qué aparato es?']],
            options: ['Smartphone', 'Laptop', 'Tablet', 'Televisor'],
            answer: 'Smartphone',
            explain: 'スマートフォン (sumātofon) = smartphone. スマホ es la abreviatura común.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Katakana en contexto',
        tag: '2 katakana',
        intro: 'Completa los dos espacios con el katakana correcto.',
        type: 'dual',
        items: [
          {
            scene: 'En el café',
            lines: [['Carlos', '[[0]]を ください。あと、[[1]]も ください。(Un café por favor. Y también un pan.)']],
            blanks: [
              { options: ['コーヒー', 'テレビ', 'タクシー'], answer: 'コーヒー', explain: 'コーヒー (kōhī) = café.' },
              { options: ['パン', 'ホテル', 'レストラン'], answer: 'パン', explain: 'パン (pan) = pan. Préstamo del portugués.' },
            ],
          },
          {
            scene: 'Hablando de países',
            lines: [['Sofia', 'わたしは [[0]]じん です。[[1]]に いきたいです。(Soy española. Quiero ir a Japón.)']],
            blanks: [
              { options: ['スペイン', 'コーヒー', 'ホテル'], answer: 'スペイン', explain: 'スペイン (Supein) = España. + じん = persona española.' },
              { options: ['にほん', 'スペイン', 'レストラン'], answer: 'にほん', explain: 'にほん en hiragana = Japón. (También puede escribirse 日本 en kanji.)' },
            ],
          },
          {
            scene: 'Reservando alojamiento',
            lines: [['Ana', '[[0]]に とまります。[[1]]で たべます。(Me quedo en el hotel. Como en el restaurante.)']],
            blanks: [
              { options: ['ホテル', 'タクシー', 'パン'], answer: 'ホテル', explain: 'ホテル (hoteru) = hotel. Destino/existencia con に.' },
              { options: ['レストラン', 'コーヒー', 'スペイン'], answer: 'レストラン', explain: 'レストラン (resutoran) = restaurante. Lugar de acción con で.' },
            ],
          },
          {
            scene: 'Tecnología',
            lines: [['Marco', '[[0]]で [[1]]を みます。(Veo televisión en el smartphone.)']],
            blanks: [
              { options: ['スマートフォン', 'テレビ', 'パン'], answer: 'スマートフォン', explain: 'スマートフォン (sumātofon) = smartphone. Instrumento con で.' },
              { options: ['テレビ', 'コーヒー', 'ホテル'], answer: 'テレビ', explain: 'テレビ (terebi) = televisión. Objeto con を.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto con préstamos',
        tag: 'Opciones',
        intro: 'Elige la palabra en katakana correcta para cada espacio.',
        type: 'guidedText',
        scene: 'Un turista español en Tokio',
        text: 'わたしは [[0]]じんです。とうきょうの [[1]]に います。あさ、[[2]]を のんで、[[3]]を たべます。ひる、[[4]]で にほんしょくを たべます。よる、[[5]]で かえります。',
        blanks: [
          { options: ['スペイン', 'コーヒー', 'タクシー'], answer: 'スペイン', explain: 'スペイン (Supein) = España. スペインじん = español/a.' },
          { options: ['ホテル', 'レストラン', 'パン'], answer: 'ホテル', explain: 'ホテル (hoteru) = hotel. Lugar de existencia.' },
          { options: ['コーヒー', 'テレビ', 'スペイン'], answer: 'コーヒー', explain: 'コーヒー (kōhī) = café. Bebida de la mañana.' },
          { options: ['パン', 'ホテル', 'タクシー'], answer: 'パン', explain: 'パン (pan) = pan. Desayuno occidental.' },
          { options: ['レストラン', 'コーヒー', 'スマートフォン'], answer: 'レストラン', explain: 'レストラン (resutoran) = restaurante. Lugar para comer.' },
          { options: ['タクシー', 'テレビ', 'パン'], answer: 'タクシー', explain: 'タクシー (takushī) = taxi. Transporte urbano.' },
        ],
      },
      {
        id: 'l4',
        title: 'Escribe el katakana',
        tag: 'Sin opciones',
        intro: 'Escribe la palabra en katakana sin opciones.',
        type: 'freeText',
        scene: 'Lista de compras y actividades de Lina en Tokio',
        text: 'Lina quiere [[0]] (café), [[1]] (pan) y [[2]] (televisión). Vive en un [[3]] (hotel) y va al [[4]] (restaurante) en [[5]] (taxi).',
        blanks: [
          { answer: 'コーヒー', accepted: ['コーヒー'], explain: 'Café = コーヒー (kōhī). No olvidar el ー para alargar.' },
          { answer: 'パン', accepted: ['パン'], explain: 'Pan = パン (pan). Tres trazos: パ (pa) + ン (n).' },
          { answer: 'テレビ', accepted: ['テレビ'], explain: 'Televisión = テレビ (terebi). Te-re-bi.' },
          { answer: 'ホテル', accepted: ['ホテル'], explain: 'Hotel = ホテル (hoteru). La "l" final → ル.' },
          { answer: 'レストラン', accepted: ['レストラン'], explain: 'Restaurante = レストラン (resutoran). Re-su-to-ran.' },
          { answer: 'タクシー', accepted: ['タクシー'], explain: 'Taxi = タクシー (takushī). No olvidar ー al final.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción katakana',
        tag: 'Producción',
        intro: 'Escribe la frase completa usando el katakana indicado.',
        type: 'write',
        items: [
          {
            scene: 'Pidiendo café',
            prompt: 'Escribe en japonés: Quiero café por favor. → ___ を ください。',
            answer: 'コーヒーを ください。',
            accepted: ['コーヒーを ください', 'コーヒーを ください。'],
            explain: 'コーヒー (café) + を (objeto) + ください (por favor). No olvidar ー.',
          },
          {
            scene: 'Tu nacionalidad',
            prompt: 'Escribe: Soy español/a. → わたしは ___じん です。',
            answer: 'わたしは スペインじん です。',
            accepted: ['わたしは スペインじん です', 'わたしは スペインじんです', 'スペインじんです'],
            explain: 'スペイン (España) + じん (persona/nacional). わたしは [país]じん です.',
          },
          {
            scene: 'Lugar para dormir',
            prompt: 'Escribe: Me quedo en el hotel. → ___に とまります。',
            answer: 'ホテルに とまります。',
            accepted: ['ホテルに とまります', 'ホテルに とまります。'],
            explain: 'ホテル (hotel) + に (destino/lugar) + とまります (me quedo).',
          },
          {
            scene: 'Ver la tele',
            prompt: 'Escribe: Veo televisión. → ___を みます。',
            answer: 'テレビを みます。',
            accepted: ['テレビを みます', 'テレビを みます。'],
            explain: 'テレビ (televisión) + を (objeto) + みます (ver).',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión katakana',
        tag: 'Reto final',
        intro: 'Describe una visita a Japón usando palabras en katakana.',
        type: 'write',
        items: [
          {
            scene: 'Tu presentación como turista',
            prompt: 'わたしは ___じん です。___に います。(Soy [país]. Estoy en [hotel].)',
            answer: 'わたしは スペインじん です。ホテルに います。',
            accepted: ['わたしは スペインじん です ホテルに います', 'わたしはスペインじんです ホテルにいます'],
            explain: 'スペインじん (español) y ホテルに います (estoy en el hotel).',
          },
          {
            scene: 'Tu desayuno en Japón',
            prompt: 'あさ、___を のんで、___を たべます。(Por la mañana bebo café y como pan.)',
            answer: 'あさ、コーヒーを のんで、パンを たべます。',
            accepted: ['あさ コーヒーを のんで パンを たべます'],
            explain: 'コーヒー (café) と パン (pan) — dos préstamos en una frase.',
          },
          {
            scene: 'Tu tarde en Tokio',
            prompt: '___で ひるごはんを たべて、___で かえります。(Como en el restaurante y vuelvo en taxi.)',
            answer: 'レストランで ひるごはんを たべて、タクシーで かえります。',
            accepted: ['レストランで ひるごはんを たべて タクシーで かえります'],
            explain: 'レストランで (en el restaurante, lugar de acción) + タクシーで (en taxi, medio de transporte).',
          },
        ],
      },
    ],
  },
}

export default topic
