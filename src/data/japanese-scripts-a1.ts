export type JapaneseScriptId = 'hiragana' | 'katakana' | 'kanji'

export interface JapaneseScriptItem {
  glyph: string
  reading: string
  meaning?: string
  code: number
  accepts: string[]
  audio: string
}

export interface JapaneseExample {
  japanese: string
  reading: string
  meaning: string
  audio: string
}

export interface JapaneseScriptLesson {
  id: JapaneseScriptId
  slug: string
  name: string
  title: string
  mark: string
  total: number
  totalLabel: string
  duration: string
  image: string
  imageAlt: string
  caption: string
  lead: string
  chartTitle: string
  chartCopy: string
  chartImage: string
  strokeCopy: string
  practiceTitle: string
  practiceCopy: string
  intro: {
    eyebrow: string
    title: string
    paragraphs: string[]
    cards: Array<[string, string, string]>
    callout: string
    examples: JapaneseExample[]
  }
  tips: Array<[string, string]>
  faqs: Array<[string, string]>
  items: JapaneseScriptItem[]
  resources: {
    chart: string
    pdf: string
    strokes: string
    image: string
  }
}

const kanaRows = [
  ['a', 'i', 'u', 'e', 'o'],
  ['ka', 'ki', 'ku', 'ke', 'ko'],
  ['sa', 'shi', 'su', 'se', 'so'],
  ['ta', 'chi', 'tsu', 'te', 'to'],
  ['na', 'ni', 'nu', 'ne', 'no'],
  ['ha', 'hi', 'fu', 'he', 'ho'],
  ['ma', 'mi', 'mu', 'me', 'mo'],
  ['ya', 'yu', 'yo'],
  ['ra', 'ri', 'ru', 're', 'ro'],
  ['wa', 'wo', 'n'],
].flat()

const hiraganaGlyphs = [...'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん']
const katakanaGlyphs = [...'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン']
const hiraganaCodes = [12354, 12356, 12358, 12360, 12362, 12363, 12365, 12367, 12369, 12371, 12373, 12375, 12377, 12379, 12381, 12383, 12385, 12388, 12390, 12392, 12394, 12395, 12396, 12397, 12398, 12399, 12402, 12405, 12408, 12411, 12414, 12415, 12416, 12417, 12418, 12420, 12422, 12424, 12425, 12426, 12427, 12428, 12429, 12431, 12434, 12435]
const katakanaCodes = [12450, 12452, 12454, 12456, 12458, 12459, 12461, 12463, 12465, 12467, 12469, 12471, 12473, 12475, 12477, 12479, 12481, 12484, 12486, 12488, 12490, 12491, 12492, 12493, 12494, 12495, 12498, 12501, 12504, 12507, 12510, 12511, 12512, 12513, 12514, 12516, 12518, 12520, 12521, 12522, 12523, 12524, 12525, 12527, 12530, 12531]

function makeKana(glyphs: string[], codes: number[]): JapaneseScriptItem[] {
  return glyphs.map((glyph, index) => {
    const reading = kanaRows[index]
    return {
      glyph,
      reading,
      code: codes[index],
      accepts: reading === 'wo' ? ['wo', 'o'] : [reading],
      audio: `/audio/japones/a1/scripts/kana/${reading}.mp3`,
    }
  })
}

const kanjiRows: Array<[string, string, string, number, string[]]> = [
  ['一', 'ichi', 'uno', 19968, ['uno', '1']],
  ['二', 'ni', 'dos', 20108, ['dos', '2']],
  ['三', 'san', 'tres', 19977, ['tres', '3']],
  ['四', 'yon', 'cuatro', 22235, ['cuatro', '4']],
  ['五', 'go', 'cinco', 20116, ['cinco', '5']],
  ['六', 'roku', 'seis', 20845, ['seis', '6']],
  ['七', 'nana', 'siete', 19971, ['siete', '7']],
  ['八', 'hachi', 'ocho', 20843, ['ocho', '8']],
  ['九', 'kyuu', 'nueve', 20061, ['nueve', '9']],
  ['十', 'juu', 'diez', 21313, ['diez', '10']],
  ['百', 'hyaku', 'cien', 30334, ['cien', '100']],
  ['千', 'sen', 'mil', 21315, ['mil', '1000']],
  ['日', 'hi / nichi', 'sol · día', 26085, ['sol', 'dia', 'día']],
  ['月', 'tsuki / getsu', 'luna · mes', 26376, ['luna', 'mes']],
  ['火', 'hi / ka', 'fuego', 28779, ['fuego']],
  ['水', 'mizu / sui', 'agua', 27700, ['agua']],
  ['木', 'ki / moku', 'árbol', 26408, ['arbol', 'árbol']],
  ['金', 'kane / kin', 'oro · dinero', 37329, ['oro', 'dinero']],
  ['土', 'tsuchi / do', 'tierra', 22303, ['tierra']],
  ['人', 'hito / jin', 'persona', 20154, ['persona', 'gente']],
]

const kanji = kanjiRows.map(([glyph, reading, meaning, code, accepts]) => ({
  glyph,
  reading,
  meaning,
  code,
  accepts,
  audio: `/audio/japones/a1/scripts/kanji/${code}.mp3`,
}))

const baseResources = (id: JapaneseScriptId) => ({
  chart: `/downloads/japanese-a1/idiomaswl-${id}-chart.png`,
  pdf: `/downloads/japanese-a1/idiomaswl-${id}-a1.pdf`,
  strokes: `/downloads/japanese-a1/idiomaswl-${id}-strokes.zip`,
  image: `/images/japanese-a1/${id}-editorial.jpg`,
})

export const JAPANESE_SCRIPTS_A1: Record<JapaneseScriptId, JapaneseScriptLesson> = {
  hiragana: {
    id: 'hiragana',
    slug: 'hiragana-basico',
    name: 'Hiragana',
    title: 'Hiragana básico',
    mark: 'あ',
    total: 46,
    totalLabel: 'kana básicos',
    duration: '35 min',
    image: '/images/japanese-a1/hiragana-editorial.jpg',
    imageAlt: 'Cuaderno de práctica de hiragana con materiales de Idiomas WeLearn',
    caption: 'Formas fluidas para escribir palabras japonesas, terminaciones y partículas.',
    lead: 'Aprende los 46 caracteres esenciales, comprende cómo suenan, practica su orden de trazos y comprueba que puedes reconocerlos sin depender del rōmaji.',
    chartTitle: 'Los 46 hiragana en una sola imagen',
    chartCopy: 'Identifica las cinco vocales, recorre cada fila consonántica y usa la tabla como mapa de referencia mientras dejas atrás el rōmaji.',
    chartImage: '/downloads/japanese-a1/idiomaswl-hiragana-chart.png',
    strokeCopy: 'Selecciona cualquier hiragana. La animación muestra por dónde empezar, la dirección y el orden correcto de todos sus trazos.',
    practiceTitle: 'Reconoce el hiragana en ambas direcciones',
    practiceCopy: 'Cada sesión mezcla diez caracteres sin repetir: primero de la forma al sonido y después del sonido a la forma.',
    intro: {
      eyebrow: 'Fundamento antes de memorizar',
      title: 'Qué es el hiragana y por qué se aprende primero',
      paragraphs: [
        'El hiragana (ひらがな) es uno de los tres sistemas de escritura del japonés. Es un silabario: cada signo representa una mora, una unidad rítmica breve parecida —aunque no idéntica— a una sílaba. Por eso か no se descompone en una letra k y una letra a: la forma completa se reconoce como ka.',
        'Se usa para palabras japonesas sin kanji, partículas gramaticales y terminaciones. En 食べます, por ejemplo, el kanji 食 aporta la idea de comer y べます, escrito en hiragana, muestra la terminación. Aprender hiragana primero permite leer cómo funciona realmente la gramática japonesa.',
        'Para un hispanohablante la pronunciación inicial es favorable: las cinco vocales se parecen mucho a las del español. El reto no es producir sonidos exóticos, sino conectar cada forma directamente con su sonido y mantener el ritmo de las moras.',
      ],
      cards: [
        ['Su función', 'あ', 'Escribe palabras japonesas, partículas como は y terminaciones como ます.'],
        ['Cómo se reconoce', 'の', 'Sus trazos suelen ser más curvos y continuos que los del katakana.'],
        ['Meta A1', 'ん', 'Reconocer, pronunciar y escribir los 46 básicos antes de estudiar combinaciones.'],
      ],
      callout: 'No traduzcas cada signo ni digas el nombre de una letra. Mira か y recupera un sonido breve: ka. El rōmaji es un puente temporal, no el destino.',
      examples: [
        { japanese: 'いえ', reading: 'ie', meaning: 'casa', audio: '/audio/japones/a1/scripts/examples/ie.mp3' },
        { japanese: 'ねこ', reading: 'neko', meaning: 'gato', audio: '/audio/japones/a1/scripts/examples/neko.mp3' },
        { japanese: 'いぬ', reading: 'inu', meaning: 'perro', audio: '/audio/japones/a1/scripts/examples/inu.mp3' },
        { japanese: 'さかな', reading: 'sakana', meaning: 'pez', audio: '/audio/japones/a1/scripts/examples/sakana.mp3' },
        { japanese: 'つき', reading: 'tsuki', meaning: 'luna', audio: '/audio/japones/a1/scripts/examples/tsuki.mp3' },
        { japanese: 'わたし', reading: 'watashi', meaning: 'yo', audio: '/audio/japones/a1/scripts/examples/watashi.mp3' },
      ],
    },
    tips: [
      ['Lee por filas', 'Empieza por a–i–u–e–o y después añade una consonante: ka–ki–ku–ke–ko.'],
      ['Atención a las parejas', 'Compara さ/き, ぬ/め y れ/ね; di en voz alta una diferencia visual.'],
      ['Úsalo activamente', 'Señala un carácter, escucha su sonido y escríbelo sin copiar.'],
    ],
    faqs: [
      ['¿Hiragana o rōmaji?', 'Usa rōmaji solo como puente. La meta es reconocer el carácter sin traducir mentalmente.'],
      ['¿Debo memorizar los 46 en un día?', 'No. Trabaja en grupos pequeños y mezcla reconocimiento, producción, escucha y escritura.'],
      ['¿Qué sigue después?', 'Dakuten, combinaciones pequeñas como きゃ y lectura de palabras breves.'],
      ['¿Los trazos importan?', 'Sí. El orden correcto mejora proporción, fluidez, memoria y legibilidad.'],
    ],
    items: makeKana(hiraganaGlyphs, hiraganaCodes),
    resources: baseResources('hiragana'),
  },
  katakana: {
    id: 'katakana',
    slug: 'katakana-basico',
    name: 'Katakana',
    title: 'Katakana básico',
    mark: 'ア',
    total: 46,
    totalLabel: 'kana básicos',
    duration: '35 min',
    image: '/images/japanese-a1/katakana-editorial.jpg',
    imageAlt: 'Café urbano japonés con rótulos en katakana y materiales de Idiomas WeLearn',
    caption: 'Trazos angulares para préstamos, nombres extranjeros, marcas y énfasis.',
    lead: 'Domina los 46 katakana básicos para leer préstamos, nombres extranjeros y expresiones visuales frecuentes en el japonés cotidiano.',
    chartTitle: 'Los 46 katakana en una sola imagen',
    chartCopy: 'La organización sonora es la misma que en hiragana; lo que cambia es la forma gráfica y la función que cumple en el texto.',
    chartImage: '/downloads/japanese-a1/idiomaswl-katakana-chart.png',
    strokeCopy: 'Selecciona cualquier katakana y observa el orden y la dirección de sus trazos rectos y angulares.',
    practiceTitle: 'Reconoce el katakana en ambas direcciones',
    practiceCopy: 'Una sesión aleatoria de diez caracteres te obliga a recordar la forma sin apoyarte en el orden de la tabla.',
    intro: {
      eyebrow: 'Mismos sonidos, otra función',
      title: 'Qué es el katakana y cuándo lo verás',
      paragraphs: [
        'El katakana (カタカナ) representa los mismos sonidos básicos que el hiragana, pero cumple otra función. Aparece sobre todo en palabras tomadas de otros idiomas, nombres extranjeros, onomatopeyas, marcas, términos técnicos y palabras destacadas.',
        'No debes pronunciar un préstamo como en inglés o español. El japonés lo adapta a su inventario de sonidos: hotel se convierte en ホテル (hoteru) y coffee en コーヒー (kōhī). La raya ー alarga la vocal anterior y forma parte de la palabra.',
        'La dificultad visual está concentrada en parejas muy parecidas. シ/ツ y ソ/ン se distinguen por la posición y dirección de sus trazos cortos. Practicarlas juntas es más eficaz que evitarlas.',
      ],
      cards: [
        ['Su función', 'カ', 'Adapta palabras extranjeras al sistema sonoro japonés.'],
        ['Cómo se reconoce', 'シ', 'Sus trazos suelen ser rectos, cortos y angulares.'],
        ['Meta A1', 'ン', 'Distinguir pares visuales y leer préstamos frecuentes sin rōmaji.'],
      ],
      callout: 'Cada katakana tiene el mismo sonido que su pareja en hiragana. ア y あ suenan a; カ y か suenan ka. Reutiliza lo aprendido y concentra el esfuerzo en la forma.',
      examples: [
        { japanese: 'ホテル', reading: 'hoteru', meaning: 'hotel', audio: '/audio/japones/a1/scripts/examples/hoteru.mp3' },
        { japanese: 'コーヒー', reading: 'kōhī', meaning: 'café', audio: '/audio/japones/a1/scripts/examples/koohii.mp3' },
        { japanese: 'テレビ', reading: 'terebi', meaning: 'televisión', audio: '/audio/japones/a1/scripts/examples/terebi.mp3' },
        { japanese: 'バス', reading: 'basu', meaning: 'bus', audio: '/audio/japones/a1/scripts/examples/basu.mp3' },
        { japanese: 'カメラ', reading: 'kamera', meaning: 'cámara', audio: '/audio/japones/a1/scripts/examples/kamera.mp3' },
        { japanese: 'スペイン', reading: 'supein', meaning: 'España', audio: '/audio/japones/a1/scripts/examples/supein.mp3' },
      ],
    },
    tips: [
      ['Misma cuadrícula sonora', 'Si ya sabes hiragana, reutiliza sus sonidos y concentra el esfuerzo en la forma.'],
      ['Pares críticos', 'Compara シ/ツ y ソ/ン atendiendo al punto de inicio y la dirección de los trazos.'],
      ['Lee el mundo real', 'Busca katakana en menús, empaques, estaciones y marcas.'],
    ],
    faqs: [
      ['¿Katakana tiene sonidos distintos?', 'No en los 46 básicos: comparte el inventario principal con hiragana.'],
      ['¿Por qué hay una raya ー?', 'Alarga la vocal anterior y es especialmente común en préstamos.'],
      ['¿Debo estudiar hiragana primero?', 'Suele ser más fácil, pero practicar ambos en paralelo también funciona.'],
      ['¿Qué sigue después?', 'Dakuten, combinaciones pequeñas y préstamos con sonidos extendidos.'],
    ],
    items: makeKana(katakanaGlyphs, katakanaCodes),
    resources: baseResources('katakana'),
  },
  kanji: {
    id: 'kanji',
    slug: 'kanji-esencial-a1',
    name: 'Kanji A1',
    title: 'Kanji esencial A1',
    mark: '日',
    total: 20,
    totalLabel: 'kanji iniciales',
    duration: '45 min',
    image: '/images/japanese-a1/kanji-editorial.jpg',
    imageAlt: 'Caligrafía japonesa con naturaleza y cuaderno de estudio de Idiomas WeLearn',
    caption: 'Caracteres con significado: aprende forma, idea, lectura y contexto.',
    lead: 'Construye una base útil con 20 kanji de alta frecuencia: números, naturaleza, tiempo y personas, siempre unidos a significado y lectura.',
    chartTitle: '20 kanji esenciales para comenzar A1',
    chartCopy: 'No son un alfabeto: cada carácter aporta significado y puede cambiar de lectura según la palabra en la que aparece.',
    chartImage: '/downloads/japanese-a1/idiomaswl-kanji-chart.png',
    strokeCopy: 'Selecciona un kanji para observar su construcción. Sigue el orden indicado antes de practicarlo de memoria.',
    practiceTitle: 'Relaciona forma, significado y lectura',
    practiceCopy: 'Primero identifica qué significa el kanji; después parte del significado para escoger el carácter correcto.',
    intro: {
      eyebrow: 'Significado antes que listas',
      title: 'Qué es un kanji y cómo estudiarlo sin memorizar dibujos',
      paragraphs: [
        'Los kanji (漢字) son caracteres de origen chino usados en japonés para representar significado. No sustituyen al hiragana ni al katakana: los tres sistemas conviven en una misma oración y cada uno ayuda a reconocer la función de lo escrito.',
        'Un kanji puede tener varias lecturas. 日 se lee hi en 日 (día o sol) y nichi en 日本 (Nihon, Japón). Por eso conviene aprender cada carácter como un paquete de forma, significado central, una lectura útil y una palabra real.',
        'Los componentes también cuentan historias visuales. 休 combina 人, persona, y 木, árbol: una persona que descansa junto a un árbol. No todas las etimologías son tan transparentes, pero buscar estructura es mucho más eficaz que copiar una forma sin entenderla.',
      ],
      cards: [
        ['Forma e idea', '木', '木 representa árbol y reaparece como componente en caracteres más complejos.'],
        ['Lecturas', '日', '日 puede leerse hi, nichi o jitsu según la palabra y el contexto.'],
        ['Meta A1', '人', 'Reconocer 20 formas frecuentes y relacionarlas con su campo de significado.'],
      ],
      callout: 'Estudia cada kanji como cuatro piezas conectadas: forma, significado central, una lectura útil y una palabra real. Nunca memorices solo una traducción aislada.',
      examples: [
        { japanese: '日本', reading: 'nihon', meaning: 'Japón', audio: '/audio/japones/a1/scripts/examples/nihon.mp3' },
        { japanese: '一人', reading: 'hitori', meaning: 'una persona', audio: '/audio/japones/a1/scripts/examples/hitori.mp3' },
        { japanese: '火山', reading: 'kazan', meaning: 'volcán', audio: '/audio/japones/a1/scripts/examples/kazan.mp3' },
        { japanese: '水', reading: 'mizu', meaning: 'agua', audio: '/audio/japones/a1/scripts/examples/mizu.mp3' },
        { japanese: '月', reading: 'tsuki', meaning: 'luna', audio: '/audio/japones/a1/scripts/examples/tsuki-kanji.mp3' },
        { japanese: '千円', reading: 'sen en', meaning: 'mil yenes', audio: '/audio/japones/a1/scripts/examples/sen-en.mp3' },
      ],
    },
    tips: [
      ['No es un alfabeto', 'Relaciona cada forma con una idea antes de añadir lecturas.'],
      ['Aprende en palabras', '日 aislado no basta: observa 日本, 日曜日 y 毎日 en etapas posteriores.'],
      ['Escribe por componentes', 'El orden de trazos ayuda a recordar estructura y proporción.'],
    ],
    faqs: [
      ['¿Cuántos kanji hay que saber?', 'Miles se usan en japonés, pero esta ruta empieza con 20 de alto valor pedagógico.'],
      ['¿Por qué tienen varias lecturas?', 'La historia del japonés combinó lecturas chinas y japonesas según palabras y contextos.'],
      ['¿Debo escribirlos a mano?', 'Sí, al menos al inicio: escribir refuerza la memoria visual y los componentes.'],
      ['¿Qué sigue después?', 'Vocabulario compuesto, radicales básicos y un conjunto A1 más amplio.'],
    ],
    items: kanji,
    resources: baseResources('kanji'),
  },
}

export const JAPANESE_SCRIPT_SLUGS = Object.values(JAPANESE_SCRIPTS_A1).map((lesson) => lesson.slug)

export function getJapaneseScriptLesson(slug: string): JapaneseScriptLesson | null {
  return Object.values(JAPANESE_SCRIPTS_A1).find((lesson) => lesson.slug === slug) ?? null
}
