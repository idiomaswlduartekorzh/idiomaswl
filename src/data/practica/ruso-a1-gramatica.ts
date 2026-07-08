// Currículo de gramática profunda — Ruso A1 (Начинающий, nivel TORFL-A1 / А1).
// 15 temas indexables con explicación SEO + tablas + contraste español→ruso
// + ejemplos + errores comunes + ejercicios. Transliteración en TODO (hispanohablante desde cero).
import type { GrammarTopic } from './grammar-types';
import { findTopic, topicNav } from './grammar-types';

export { GRAMMAR_COLOR } from './grammar-types';
export type { GQItem, GrammarTopic } from './grammar-types';

export const TOPICS: GrammarTopic[] = [
  // ───────────────────────── 1. ALFABETO ─────────────────────────
  {
    slug: 'alfabeto-cirilico',
    order: 1,
    title: 'Алфавит — El alfabeto cirílico',
    shortTitle: 'El cirílico (Алфавит)',
    icon: '🔤',
    seoTitle: 'El alfabeto cirílico ruso: cómo leerlo desde cero',
    seoDescription: 'Aprende a leer el alfabeto cirílico ruso paso a paso: las 33 letras, las "falsas amigas", las que no existen en español y la transliteración. Con ejemplos y ejercicios.',
    keywords: ['alfabeto cirilico', 'aprender a leer ruso', 'letras rusas', 'cirilico ruso', 'leer ruso desde cero'],
    intro: [
      'El ruso se escribe con el alfabeto cirílico (кириллица), que tiene 33 letras: 10 vocales, 21 consonantes y dos signos sin sonido propio (ь, ъ). Parece intimidante, pero buena parte se aprende en pocos días porque muchas letras coinciden con el español en forma y sonido (А, К, М, О, Т…).',
      'El reto está en tres grupos: las "falsas amigas", que se parecen a letras latinas pero suenan distinto (В = "v", Н = "n", Р = "r", С = "s", У = "u", Х = "j"); las nuevas que no existen en español (Ж, Ш, Щ, Ч, Ц, Ы, Э, Ю, Я, Ё); y los dos signos ь/ъ, que no suenan pero modifican la consonante anterior.',
      'En WeLearn empezamos siempre por aquí: aprender a LEER cirílico es lo primero, porque el ruso es bastante fonético (se lee casi como se escribe). Una vez que descifras привет o спасибо sin pensar, el resto del idioma deja de parecer un muro.',
    ],
    sections: [
      {
        heading: 'Las "falsas amigas" que más confunden',
        body: [
          'Estas letras tienen forma latina pero sonido ruso distinto: В suena "v" (no "b"), Е suena "ye", Н suena "n", Р suena "r" (vibrante), С suena "s", У suena "u", Х suena "j" (como en "jamón"). Así, "ВОДА" no se lee "boda" sino "vodá" (agua), y "РОТ" es "rot" (boca), no "pot".',
          'Truco: la palabra РЕСТОРАН se lee "restorán" — si la descifras letra a letra (Р-Е-С-Т-О-Р-А-Н), ya dominas seis de las falsas amigas de golpe.',
        ],
      },
      {
        heading: 'Las letras nuevas y los signos ь / ъ',
        body: [
          'Sonidos que el español no tiene letra propia para ellos: Ж = "zh" (como la j francesa de "jour"), Ш = "sh", Щ = "shch" (más suave y largo), Ч = "ch", Ц = "ts", Ы = una "i" gutural, Э = "e" abierta, Ю = "yu", Я = "ya", Ё = "yo".',
          'El signo blando (ь) "ablanda" la consonante anterior (la palataliza) y no suena solo: мать (mat\', madre). El signo duro (ъ) es raro y solo separa sonidos. Para A1 basta reconocer que ninguno de los dos añade un sonido vocálico.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Falsas amigas (forma latina, sonido ruso)',
        headers: ['Letra', 'Suena', 'Ejemplo', 'Se lee'],
        rows: [
          ['В в', 'v', 'вода', 'vodá (agua)'],
          ['Е е', 'ye', 'нет', 'nyet (no)'],
          ['Н н', 'n', 'нос', 'nos (nariz)'],
          ['Р р', 'r', 'рот', 'rot (boca)'],
          ['С с', 's', 'спасибо', 'spasíba (gracias)'],
          ['У у', 'u', 'утро', 'útra (mañana)'],
          ['Х х', 'j', 'хорошо', 'jarashó (bien)'],
        ],
      },
      {
        caption: 'Letras nuevas',
        headers: ['Letra', 'Suena', 'Como en…'],
        rows: [
          ['Ж ж', 'zh', 'j francesa (jour)'],
          ['Ш ш', 'sh', 'sh inglesa (ship)'],
          ['Ч ч', 'ch', 'ch española (chico)'],
          ['Ц ц', 'ts', 'tz (pizza)'],
          ['Ы ы', 'y', 'i gutural'],
          ['Я / Ю / Ё', 'ya / yu / yo', 'con [y] inicial'],
        ],
      },
    ],
    contrast: [
      { es: 'La "b" de "boca"… ¡pero en ruso es В!', en: 'Р (r) → рот = "boca"', note: 'Р con forma de "p" latina suena "r"; В con forma de "B" suena "v".' },
      { es: 'La "j" de "jamón"', en: 'Х (j) → хорошо', note: 'El sonido [j] español se escribe con Х en ruso.' },
      { es: 'La "ñ" no existe; se usa Н + signo blando', en: 'нь (n suave)', note: 'El ablandamiento con ь da un sonido cercano a la ñ.' },
      { es: 'La "y" de "yo"', en: 'Я (ya), Ю (yu), Ё (yo)', note: 'Estas vocales llevan la [y] incorporada.' },
      { es: '"b" y "v" son lo mismo para ti', en: 'Б (b) ≠ В (v)', note: 'El ruso SÍ distingue: Б = "b", В = "v". No los mezcles.' },
    ],
    examples: [
      { en: 'мама (máma)', es: 'mamá', note: 'М, А, М, А: todas iguales al español.' },
      { en: 'да (da)', es: 'sí', note: 'Д = "d", А = "a".' },
      { en: 'нет (nyet)', es: 'no', note: 'Н="n", Е="ye", Т="t".' },
      { en: 'спасибо (spasíba)', es: 'gracias', note: 'С="s", П="p", А, С, И, Б, О.' },
      { en: 'вода (vodá)', es: 'agua', note: 'В="v" (no "b"), не "bodá".' },
      { en: 'хорошо (jarashó)', es: 'bien', note: 'Х="j", Ш="sh".' },
      { en: 'Россия (Rassíya)', es: 'Rusia', note: 'Р="r", двойная СС, Я="ya".' },
    ],
    commonMistakes: [
      { wrong: 'leer В como "b"', right: 'В = "v"', note: 'вода es "vodá" (agua), no "boda".' },
      { wrong: 'leer Р como "p"', right: 'Р = "r"', note: 'рот es "rot" (boca), no "pot".' },
      { wrong: 'leer Н como "h"', right: 'Н = "n"', note: 'нос es "nos" (nariz).' },
      { wrong: 'leer С como "c/k"', right: 'С = "s"', note: 'спасибо empieza con sonido "s".' },
      { wrong: 'pronunciar el signo blando ь', right: 'ь no suena; ablanda la consonante', note: 'мать = "mat\'", no "mati".' },
    ],
    tip: 'Dedica los primeros días SOLO a leer en voz alta, sin traducir. Memoriza primero las 7 falsas amigas (В Е Н Р С У Х): son las que más errores causan, y dominarlas desbloquea la lectura del resto.',
    questions: [
      { s: 'La letra В se lee ___', opts: ['v', 'b', 'n', 'r'], a: 0, fb: 'В = "v": вода = "vodá" (agua).' },
      { s: 'La letra Р se lee ___', opts: ['r', 'p', 'b', 'f'], a: 0, fb: 'Р = "r" vibrante: рот = "rot" (boca).' },
      { s: 'La letra Н se lee ___', opts: ['n', 'h', 'm', 'i'], a: 0, fb: 'Н = "n": нос = "nos" (nariz).' },
      { s: 'La letra Х se lee como la ___ española', opts: ['j (de jamón)', 'x (de taxi)', 'h muda', 'k'], a: 0, fb: 'Х = "j": хорошо = "jarashó".' },
      { s: 'спасибо se lee ___', opts: ['spasíba', 'cpacибo', 'snacибo', 'spasíbo con b fuerte'], a: 0, fb: 'С="s", П="p"… = "spasíba" (gracias).' },
      { s: 'La letra С se lee ___', opts: ['s', 'c/k', 'g', 'ch'], a: 0, fb: 'С = "s", no "k".' },
      { s: 'El signo blando ь ___', opts: ['no suena, ablanda la consonante', 'suena "i"', 'suena "e"', 'suena "y"'], a: 0, fb: 'ь palataliza la consonante anterior; no añade vocal.' },
      { s: 'Я se lee ___', opts: ['ya', 'r', 'a', 'ia sin y'], a: 0, fb: 'Я = "ya" (lleva la [y] incorporada).' },
      { s: 'Ж se lee parecido a ___', opts: ['zh (j francesa)', 'sh', 'ch', 'z española'], a: 0, fb: 'Ж = "zh", como la j de "jour".' },
      { s: '¿Cuántas letras tiene el alfabeto ruso?', opts: ['33', '26', '30', '28'], a: 0, fb: '33 letras: 10 vocales, 21 consonantes y 2 signos.' },
      { s: 'вода significa "agua" y se lee ___', opts: ['vodá', 'bodá', 'voda con d muda', 'fodá'], a: 0, fb: 'В="v", не "b": "vodá".' },
      { s: 'нет se lee ___', opts: ['nyet', 'net con n latina', 'het', 'pet'], a: 0, fb: 'Н="n", Е="ye": "nyet" (no).' },
      { s: 'Ш se lee ___', opts: ['sh', 's', 'ch', 'shch'], a: 0, fb: 'Ш = "sh"; Щ = "shch" (más largo).' },
    ],
  },

  // ───────────────────────── 2. PRONOMBRES + sin "ser" ─────────────────────────
  {
    slug: 'pronombres-y-omision-de-ser',
    order: 2,
    title: 'Pronombres y la ausencia de "ser" en presente',
    shortTitle: 'Pronombres · sin "ser"',
    icon: '👤',
    seoTitle: 'Pronombres personales en ruso y por qué no se dice "ser"',
    seoDescription: 'Los pronombres rusos (я, ты, он, она, мы, вы, они) y la regla clave del A1: en presente no se usa el verbo "ser" (быть). Con ejemplos y ejercicios.',
    keywords: ['pronombres rusos', 'я ты он она', 'verbo ser en ruso', 'byt ruso', 'gramatica rusa A1'],
    intro: [
      'Los pronombres personales rusos son: я (yo), ты (tú), он (él), она (ella), оно (ello/neutro), мы (nosotros), вы (vosotros/usted), они (ellos). Ojo con вы: sirve a la vez como "vosotros" y como "usted" formal — escrito con mayúscula (Вы) es el "usted" de respeto.',
      'La gran sorpresa para un hispanohablante: en PRESENTE, el ruso NO usa el verbo "ser/estar". El verbo быть ("ser") existe, pero se omite por completo en presente. "Yo soy estudiante" es simplemente Я студент ("yo estudiante"). Donde el español pone "soy/eres/es", el ruso pone… nada, a menudo un guion en la escritura: Москва — столица ("Moscú es la capital").',
      'Esto hace que las primeras frases sean facilísimas: pronombre + sustantivo o adjetivo, sin verbo. Я врач (soy médico), Ты дома (estás en casa), Он русский (él es ruso). El verbo "ser" solo reaparece en pasado (был) y futuro (буду), que verás más adelante.',
    ],
    sections: [
      {
        heading: 'ты vs вы: la cortesía',
        body: [
          'ты es el "tú" informal: para amigos, familia, niños. вы (con mayúscula Вы en cartas) es el "usted" de respeto: para desconocidos, mayores, contextos formales. вы también es el plural "vosotros/ustedes". Usar ты con un desconocido mayor puede sonar grosero; ante la duda, usa вы.',
          'No confundas: вы puede significar "usted" (una persona, formal) o "vosotros" (varias personas). El contexto lo aclara.',
        ],
      },
      {
        heading: 'Frases sin verbo: el guion',
        body: [
          'Cuando "ser" uniría dos sustantivos, el ruso escrito suele poner un guion: Мой брат — врач ("mi hermano es médico"). Con adjetivos no hace falta guion: Дом большой ("la casa es grande").',
          'Para negar "no soy / no es" en presente se usa не + palabra: Я не студент ("no soy estudiante"). Para "no hay / no está" se usa нет (que verás con el genitivo).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Pronombres personales',
        headers: ['Ruso', 'Translit.', 'Español'],
        rows: [
          ['я', 'ya', 'yo'],
          ['ты', 'ty', 'tú (informal)'],
          ['он / она / оно', 'on / oná / onó', 'él / ella / ello'],
          ['мы', 'my', 'nosotros'],
          ['вы', 'vy', 'vosotros / usted (formal)'],
          ['они', 'oní', 'ellos / ellas'],
        ],
      },
    ],
    contrast: [
      { es: 'Yo soy estudiante', en: 'Я студент', note: 'Sin verbo "ser": literalmente "yo estudiante".' },
      { es: 'Él es ruso', en: 'Он русский', note: 'Pronombre + adjetivo, sin "es".' },
      { es: 'Moscú es la capital', en: 'Москва — столица', note: 'El guion sustituye al verbo "ser" entre dos sustantivos.' },
      { es: '¿Cómo está usted?', en: 'Как Вы?', note: 'вы (Вы) = "usted" formal; nota la mayúscula de respeto.' },
      { es: 'No soy médico', en: 'Я не врач', note: 'Negación con не antes de la palabra.' },
    ],
    examples: [
      { en: 'Я студент. (Ya student.)', es: 'Soy estudiante.', note: 'Sin verbo.' },
      { en: 'Ты дома. (Ty doma.)', es: 'Estás en casa.', note: '"Estar" tampoco se dice.' },
      { en: 'Он врач. (On vrach.)', es: 'Él es médico.', note: 'врач vale para hombre o mujer.' },
      { en: 'Она русская. (Oná rússkaya.)', es: 'Ella es rusa.', note: 'Adjetivo en femenino.' },
      { en: 'Мы друзья. (My druzyá.)', es: 'Somos amigos.', note: 'мы + sustantivo plural.' },
      { en: 'Вы преподаватель? (Vy prepodavátel\'?)', es: '¿Es usted profesor?', note: 'Pregunta solo por entonación.' },
      { en: 'Это мой дом. (Eta moy dom.)', es: 'Esto es mi casa.', note: 'это = "esto es", también sin verbo.' },
    ],
    commonMistakes: [
      { wrong: 'Я есть студент', right: 'Я студент', note: 'En presente NO se usa el verbo "ser" (есть aquí sobra).' },
      { wrong: 'usar ты con un desconocido mayor', right: 'вы', note: 'ты es informal; con respeto/distancia se usa вы.' },
      { wrong: 'Я являюсь студент (calco)', right: 'Я студент', note: 'No traduzcas "soy" con un verbo; simplemente omítelo.' },
      { wrong: 'confundir вы (vosotros/usted) con ты (tú)', right: 'ты = informal singular; вы = formal o plural', note: 'Son registros distintos.' },
      { wrong: 'Москва столица (sin guion en escrito formal)', right: 'Москва — столица', note: 'Entre dos sustantivos, el guion marca el "ser" omitido.' },
    ],
    tip: 'Graba esta idea: en presente, "soy/eres/es/somos/sois/son" NO se dicen en ruso. Pronombre + sustantivo/adjetivo y listo. El verbo "ser" solo vuelve en pasado y futuro.',
    questions: [
      { s: '"Soy estudiante" en ruso es ___', opts: ['Я студент', 'Я есть студент', 'Я быть студент', 'Я являюсь студент'], a: 0, fb: 'En presente no se usa "ser": Я студент.' },
      { s: '"yo" en ruso es ___', opts: ['я', 'ты', 'он', 'мы'], a: 0, fb: 'я = yo.' },
      { s: 'El "usted" formal es ___', opts: ['вы', 'ты', 'он', 'они'], a: 0, fb: 'вы (Вы) = usted formal (y también "vosotros").' },
      { s: '"Él es médico" = Он ___ врач', opts: ['(nada)', 'есть', 'быть', 'это'], a: 0, fb: 'No hay verbo en presente: Он врач.' },
      { s: '"ella" en ruso es ___', opts: ['она', 'он', 'оно', 'они'], a: 0, fb: 'она = ella.' },
      { s: 'Entre dos sustantivos, el "ser" omitido se marca con ___', opts: ['un guion (—)', 'una coma', 'есть', 'dos puntos'], a: 0, fb: 'Москва — столица.' },
      { s: '"No soy médico" = Я ___ врач', opts: ['не', 'нет', 'ни', 'без'], a: 0, fb: 'Negación con не: Я не врач.' },
      { s: 'ты se usa con ___', opts: ['amigos y familia (informal)', 'desconocidos mayores', 'siempre, en todo contexto', 'solo por escrito'], a: 0, fb: 'ты es informal; para respeto se usa вы.' },
      { s: '"nosotros" es ___', opts: ['мы', 'вы', 'они', 'я'], a: 0, fb: 'мы = nosotros.' },
      { s: 'вы también significa ___', opts: ['vosotros (plural)', 'nosotros', 'ellos', 'yo'], a: 0, fb: 'вы = "usted" (formal) y "vosotros/ustedes" (plural).' },
      { s: '"ellos/ellas" es ___', opts: ['они', 'оно', 'он', 'она'], a: 0, fb: 'они = ellos/ellas.' },
      { s: '¿Es correcto "Я есть русский"?', opts: ['No: es Я русский', 'Sí', 'Solo formal', 'Solo en pasado'], a: 0, fb: 'En presente no se usa "ser": Я русский.' },
    ],
  },

  // ───────────────────────── 3. GÉNERO ─────────────────────────
  {
    slug: 'genero-de-los-sustantivos',
    order: 3,
    title: 'Род — El género de los sustantivos',
    shortTitle: 'Género (род)',
    icon: '⚥',
    seoTitle: 'El género de los sustantivos en ruso: masculino, femenino y neutro',
    seoDescription: 'Cómo saber el género de un sustantivo ruso por su terminación: masculino (consonante), femenino (-а/-я) y neutro (-о/-е). Regla, excepciones y ejercicios A1.',
    keywords: ['genero sustantivos ruso', 'masculino femenino neutro ruso', 'род существительных', 'terminaciones rusas', 'gramatica rusa A1'],
    intro: [
      'El ruso, como el español, clasifica los sustantivos por género, pero tiene TRES: masculino (мужской), femenino (женский) y neutro (средний). El género no es un capricho: determina la forma de los posesivos, los adjetivos y los pasados que acompañan a la palabra, así que es la base sobre la que se construye casi todo.',
      'La gran ventaja es que el género casi siempre se ve en la terminación. Masculino: termina en consonante (стол, дом, брат). Femenino: termina en -а o -я (мама, книга, семья). Neutro: termina en -о o -е (окно, море, утро). Con esta regla aciertas la enorme mayoría de los casos.',
      'Hay dos avisos: las palabras terminadas en signo blando -ь pueden ser masculinas o femeninas (hay que memorizarlas: словарь es masc., ночь es fem.), y algunas que terminan en -а se refieren a hombres y por tanto son masculinas (папа, дедушка). Pero para A1, la regla de la terminación te lleva muy lejos.',
    ],
    sections: [
      {
        heading: 'La regla de la terminación',
        body: [
          'Masculino → consonante final: стол (mesa), дом (casa), студент. Femenino → -а / -я: книга (libro), вода (agua), Россия. Neutro → -о / -е: окно (ventana), море (mar), имя (nombre).',
          'El neutro no existe en español y suele despistar: окно, письмо, утро, кафе son neutros. Reconócelos por el -о/-е final.',
        ],
      },
      {
        heading: 'Por qué importa el género',
        body: [
          'El género arrastra concordancia: posesivo (мой стол, моя книга, моё окно), adjetivo (новый стол, новая книга, новое окно) y pasado (он был, она была, оно было). Si te equivocas de género, se desajusta toda la frase.',
          'Las palabras en -ь hay que aprenderlas con su género. Útiles femeninas en -ь: ночь (noche), дверь (puerta), мать (madre). Útiles masculinas en -ь: словарь (diccionario), день (día), учитель (maestro).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Género por terminación',
        headers: ['Género', 'Termina en', 'Ejemplos', 'Posesivo "mi"'],
        rows: [
          ['Masculino', 'consonante', 'стол, дом, брат', 'мой'],
          ['Femenino', '-а / -я', 'мама, книга, семья', 'моя'],
          ['Neutro', '-о / -е', 'окно, море, утро', 'моё'],
          ['En -ь', 'memorizar', 'день (m.), ночь (f.)', 'мой / моя'],
        ],
      },
    ],
    contrast: [
      { es: 'La mesa (femenino en español)', en: 'стол (¡masculino en ruso!)', note: 'El género no coincide con el español: hay que aprenderlo en ruso.' },
      { es: 'Mi libro', en: 'моя книга', note: 'книга es femenino (-а) → моя.' },
      { es: 'Mi casa', en: 'мой дом', note: 'дом es masculino (consonante) → мой.' },
      { es: 'La ventana (neutro: no existe en español)', en: 'окно (neutro)', note: 'El neutro es una categoría nueva para el hispanohablante.' },
      { es: 'El día / la noche', en: 'день (m.) / ночь (f.)', note: 'Ambas en -ь, pero distinto género: memorízalas.' },
    ],
    examples: [
      { en: 'стол (stol)', es: 'mesa', note: 'Consonante final → masculino.' },
      { en: 'книга (kníga)', es: 'libro', note: '-а → femenino.' },
      { en: 'окно (aknó)', es: 'ventana', note: '-о → neutro.' },
      { en: 'мой брат (moy brat)', es: 'mi hermano', note: 'masc. → мой.' },
      { en: 'моя сестра (mayá sestrá)', es: 'mi hermana', note: 'fem. → моя.' },
      { en: 'моё имя (mayó ímya)', es: 'mi nombre', note: 'neutro → моё.' },
      { en: 'словарь (slavár\')', es: 'diccionario', note: 'En -ь pero masculino (excepción a memorizar).' },
    ],
    commonMistakes: [
      { wrong: 'asignar el género del español', right: 'mirar la terminación rusa', note: 'стол es masculino aunque "mesa" sea femenino.' },
      { wrong: 'моя дом', right: 'мой дом', note: 'дом es masculino → мой.' },
      { wrong: 'мой книга', right: 'моя книга', note: 'книга es femenino → моя.' },
      { wrong: 'tratar окно como masculino', right: 'окно es neutro → моё окно', note: 'Terminación -о = neutro.' },
      { wrong: 'suponer que toda palabra en -ь es femenina', right: 'depende: день (m.), ночь (f.)', note: 'Las de -ь se memorizan con su género.' },
    ],
    tip: 'Mira la última letra: consonante → masculino, -а/-я → femenino, -о/-е → neutro. Aprende cada palabra en -ь con su género desde el primer día (день m., ночь f.).',
    questions: [
      { s: 'стол (mesa) es de género ___', opts: ['masculino', 'femenino', 'neutro', 'no tiene'], a: 0, fb: 'Termina en consonante → masculino.' },
      { s: 'книга (libro) es ___', opts: ['femenino', 'masculino', 'neutro', 'común'], a: 0, fb: 'Termina en -а → femenino.' },
      { s: 'окно (ventana) es ___', opts: ['neutro', 'masculino', 'femenino', 'plural'], a: 0, fb: 'Termina en -о → neutro.' },
      { s: '"mi" con un sustantivo femenino es ___', opts: ['моя', 'мой', 'моё', 'мои'], a: 0, fb: 'fem. → моя (моя книга).' },
      { s: '"mi casa" (дом, masc.) = ___ дом', opts: ['мой', 'моя', 'моё', 'мои'], a: 0, fb: 'дом es masculino → мой.' },
      { s: 'Los sustantivos masculinos terminan típicamente en ___', opts: ['consonante', '-а/-я', '-о/-е', '-ь siempre'], a: 0, fb: 'Masculino = consonante final.' },
      { s: 'имя (nombre) es ___', opts: ['neutro', 'femenino', 'masculino', 'plural'], a: 0, fb: 'Termina en -я pero es neutro (grupo especial -мя).' },
      { s: '"mi" con un neutro es ___', opts: ['моё', 'мой', 'моя', 'мои'], a: 0, fb: 'neutro → моё (моё окно).' },
      { s: 'día (день) y noche (ночь) terminan en -ь. ¿Mismo género?', opts: ['No: день masc., ночь fem.', 'Sí, ambos fem.', 'Sí, ambos masc.', 'Ambos neutros'], a: 0, fb: 'Las de -ь se memorizan: день (m.), ночь (f.).' },
      { s: '"mi hermana" (сестра) = ___ сестра', opts: ['моя', 'мой', 'моё', 'мои'], a: 0, fb: 'сестра es femenino → моя.' },
      { s: 'море (mar) es ___', opts: ['neutro', 'masculino', 'femenino', 'plural'], a: 0, fb: 'Termina en -е → neutro.' },
      { s: 'El género en ruso decide la forma de ___', opts: ['posesivos, adjetivos y pasados', 'solo el plural', 'nada importante', 'la entonación'], a: 0, fb: 'El género arrastra toda la concordancia.' },
    ],
  },

  // ───────────────────────── 4. POSESIVOS ─────────────────────────
  {
    slug: 'posesivos-moy-moya-moyo',
    order: 4,
    title: 'Притяжательные — Los posesivos (мой, моя, моё)',
    shortTitle: 'Posesivos (мой/моя)',
    icon: '🔑',
    seoTitle: 'Posesivos en ruso: мой, моя, моё, мои y la concordancia',
    seoDescription: 'Cómo usar los posesivos rusos (мой/моя/моё/мои, твой, наш, ваш) según el género del sustantivo. Los invariables его, её, их. Con tabla y ejercicios A1.',
    keywords: ['posesivos rusos', 'мой моя моё', 'mi en ruso', 'твой наш ваш', 'gramatica rusa A1'],
    intro: [
      'Los posesivos rusos ("mi, tu, nuestro, vuestro") concuerdan en género con el sustantivo poseído, igual que la lógica que viste en el género. "Mi" tiene cuatro formas: мой (con masculino), моя (con femenino), моё (con neutro) y мои (con plural). No depende del sexo del que habla, sino del género de lo poseído.',
      'Lo mismo ocurre con твой/твоя/твоё/твои (tu, informal), наш/наша/наше/наши (nuestro) y ваш/ваша/ваше/ваши (vuestro / de usted). Todos cambian su terminación según el sustantivo que acompañan.',
      'La excepción cómoda: los posesivos de tercera persona его (su, de él), её (su, de ella) e их (su, de ellos) son INVARIABLES — no cambian nunca. его дом, его книга, его окно: siempre его. Así que para "su" tienes menos que memorizar.',
    ],
    sections: [
      {
        heading: 'мой / моя / моё / мои',
        body: [
          'мой + masculino (мой брат, мой дом), моя + femenino (моя сестра, моя книга), моё + neutro (моё имя, моё окно), мои + plural (мои друзья, мои книги). El patrón -ой/-я/-ё/-и se repite en твой y se adapta en наш/ваш.',
          'Recuerda: lo que decide la forma es el género del sustantivo poseído, no quién posee. Por eso un hombre dice моя книга (книга es femenino) y una mujer dice мой дом (дом es masculino).',
        ],
      },
      {
        heading: 'его, её, их: invariables',
        body: [
          'Para "su/sus" de tercera persona: его (de él), её (de ella), их (de ellos/ellas). No cambian con el género: его брат, его сестра, его дети; её дом, её машина; их семья. Una sola forma cada uno.',
          'No los confundas con los pronombres objeto его/её/их ("lo/la/los"), que se escriben igual: el contexto distingue "su casa" (его дом) de "lo veo" (вижу его).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Posesivos según el género del sustantivo',
        headers: ['Posesivo', 'Masc.', 'Fem.', 'Neutro', 'Plural'],
        rows: [
          ['mi', 'мой', 'моя', 'моё', 'мои'],
          ['tu (inf.)', 'твой', 'твоя', 'твоё', 'твои'],
          ['nuestro', 'наш', 'наша', 'наше', 'наши'],
          ['vuestro / de usted', 'ваш', 'ваша', 'ваше', 'ваши'],
          ['su (де él/ella/ellos)', 'его / её / их (invariables)', '—', '—', '—'],
        ],
      },
    ],
    contrast: [
      { es: 'Mi hermano', en: 'мой брат', note: 'брат masc. → мой.' },
      { es: 'Mi hermana', en: 'моя сестра', note: 'сестра fem. → моя.' },
      { es: 'Mis amigos', en: 'мои друзья', note: 'plural → мои.' },
      { es: 'Su casa (de él)', en: 'его дом', note: 'его es invariable: no cambia con el género.' },
      { es: 'Nuestra familia', en: 'наша семья', note: 'семья fem. → наша.' },
    ],
    examples: [
      { en: 'мой друг (moy drug)', es: 'mi amigo', note: 'masc. → мой.' },
      { en: 'моя мама (mayá máma)', es: 'mi mamá', note: 'fem. → моя.' },
      { en: 'моё окно (mayó aknó)', es: 'mi ventana', note: 'neutro → моё.' },
      { en: 'мои книги (maí knígi)', es: 'mis libros', note: 'plural → мои.' },
      { en: 'твой телефон (tvoy telefón)', es: 'tu teléfono', note: 'masc. → твой.' },
      { en: 'её сестра (yeyó sestrá)', es: 'su hermana (de ella)', note: 'её invariable.' },
      { en: 'наш дом (nash dom)', es: 'nuestra casa', note: 'masc. → наш.' },
    ],
    commonMistakes: [
      { wrong: 'моя брат', right: 'мой брат', note: 'брат es masculino → мой.' },
      { wrong: 'мой сестра', right: 'моя сестра', note: 'сестра es femenino → моя.' },
      { wrong: 'cambiar его según el género (егоя/егоо)', right: 'его es invariable', note: 'его дом, его книга, его окно: siempre его.' },
      { wrong: 'наш семья', right: 'наша семья', note: 'семья fem. → наша.' },
      { wrong: 'usar el género del poseedor', right: 'usar el género del sustantivo poseído', note: 'Un hombre dice моя книга porque книга es femenino.' },
    ],
    tip: 'Pregúntate qué género tiene la COSA poseída, no quién la posee. Y respira: его, её, их no cambian nunca. Eso ya te quita un tercio del trabajo.',
    questions: [
      { s: '"mi hermano" (брат) = ___ брат', opts: ['мой', 'моя', 'моё', 'мои'], a: 0, fb: 'брат masc. → мой.' },
      { s: '"mi hermana" (сестра) = ___ сестра', opts: ['моя', 'мой', 'моё', 'мои'], a: 0, fb: 'сестра fem. → моя.' },
      { s: '"mis libros" (книги, plural) = ___ книги', opts: ['мои', 'моя', 'мой', 'моё'], a: 0, fb: 'plural → мои.' },
      { s: '"mi ventana" (окно, neutro) = ___ окно', opts: ['моё', 'мой', 'моя', 'мои'], a: 0, fb: 'neutro → моё.' },
      { s: '"su casa (de él)" = ___ дом', opts: ['его', 'мой', 'наш', 'свой'], a: 0, fb: 'его (de él), invariable.' },
      { s: 'Los posesivos его, её, их son ___', opts: ['invariables', 'variables por género', 'solo plurales', 'femeninos'], a: 0, fb: 'No cambian nunca con el género.' },
      { s: '"nuestra familia" (семья) = ___ семья', opts: ['наша', 'наш', 'наше', 'наши'], a: 0, fb: 'семья fem. → наша.' },
      { s: 'Lo que decide мой/моя/моё es ___', opts: ['el género del sustantivo poseído', 'el sexo del que habla', 'la entonación', 'el número de sílabas'], a: 0, fb: 'Concuerda con la cosa poseída.' },
      { s: '"tu teléfono" (телефон, masc.) = ___ телефон', opts: ['твой', 'твоя', 'твоё', 'твои'], a: 0, fb: 'masc. → твой.' },
      { s: '"su hermana (de ella)" = ___ сестра', opts: ['её', 'его', 'их', 'моя'], a: 0, fb: 'её (de ella), invariable.' },
      { s: '"vuestra casa" (дом) = ___ дом', opts: ['ваш', 'ваша', 'ваше', 'ваши'], a: 0, fb: 'дом masc. → ваш.' },
      { s: '¿Es correcto "мой книга"?', opts: ['No: моя книга', 'Sí', 'Solo formal', 'Solo plural'], a: 0, fb: 'книга es femenino → моя.' },
    ],
  },

  // ───────────────────────── 5. PRESENTE 1ª CONJUGACIÓN ─────────────────────────
  {
    slug: 'presente-primera-conjugacion',
    order: 5,
    title: 'El presente: 1ª conjugación (-е-)',
    shortTitle: 'Presente 1ª conj.',
    icon: '🟢',
    seoTitle: 'Verbos rusos en presente: la 1ª conjugación (читать, работать)',
    seoDescription: 'Cómo conjugar los verbos rusos de la 1ª conjugación en presente (читать → читаю, читаешь…). Las 6 terminaciones, con tabla, ejemplos y ejercicios A1.',
    keywords: ['conjugacion rusa', 'presente ruso', 'primera conjugacion ruso', 'читать работать', 'verbos rusos A1'],
    intro: [
      'A diferencia del español, el ruso SÍ conjuga el verbo según la persona, pero con un sistema muy regular: solo hay dos conjugaciones. La mayoría de los verbos terminados en -ать/-ять pertenecen a la primera (1ª), y se conjugan quitando -ть y añadiendo las terminaciones -ю, -ешь, -ет, -ем, -ете, -ют.',
      'Tomemos читать (leer): raíz чита- → я читаю, ты читаешь, он/она читает, мы читаем, вы читаете, они читают. El mismo patrón sirve para работать (trabajar), знать (saber), думать (pensar), делать (hacer), понимать (entender) y cientos más. Memorizas un patrón y desbloqueas muchísimos verbos.',
      'Como en presente no hay verbo "ser", estos verbos cargan con casi toda la acción de tus primeras frases: Я работаю (trabajo), Ты знаешь (sabes), Мы понимаем (entendemos). Y como el ruso marca la persona en la terminación, el pronombre a veces se omite.',
    ],
    sections: [
      {
        heading: 'Las seis terminaciones (-ю, -ешь, -ет…)',
        body: [
          'Quita -ть del infinitivo y añade: я +ю, ты +ешь, он/она +ет, мы +ем, вы +ете, они +ют. читать → читаю/читаешь/читает/читаем/читаете/читают. La vocal temática de la 1ª conjugación es -е- (visible en читаешь, читает, читаем, читаете).',
          'Una pista para reconocer la persona: la 1ª persona (я) acaba en -ю/-у; la 2ª (ты) en -ешь; la 3ª plural (они) en -ют/-ут. Estas terminaciones se repiten en todos los verbos de 1ª conjugación.',
        ],
      },
      {
        heading: 'Un solo presente, sin "estar + gerundio"',
        body: [
          'El presente ruso cubre lo que el español reparte entre "leo" y "estoy leyendo": я читаю significa ambas. No existe la perífrasis "estar + gerundio"; un único presente basta.',
          'Verbos de 1ª conjugación muy útiles en A1: работать (trabajar), знать (saber), думать (pensar), делать (hacer), понимать (entender), слушать (escuchar), играть (jugar), гулять (pasear), отдыхать (descansar).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'читать (leer) — 1ª conjugación',
        headers: ['Persona', 'Terminación', 'Forma', 'Translit.'],
        rows: [
          ['я', '-ю', 'читаю', 'chitáyu'],
          ['ты', '-ешь', 'читаешь', 'chitáyesh'],
          ['он / она', '-ет', 'читает', 'chitáyet'],
          ['мы', '-ем', 'читаем', 'chitáyem'],
          ['вы', '-ете', 'читаете', 'chitáyete'],
          ['они', '-ют', 'читают', 'chitáyut'],
        ],
      },
    ],
    contrast: [
      { es: 'Leo / estoy leyendo', en: 'я читаю', note: 'Un solo presente cubre ambas ideas.' },
      { es: 'Trabajas', en: 'ты работаешь', note: 'Terminación de "ты": -ешь.' },
      { es: 'Entendemos', en: 'мы понимаем', note: 'Terminación de "мы": -ем.' },
      { es: 'Ellos saben', en: 'они знают', note: 'Terminación de "они": -ют.' },
      { es: '¿Qué haces?', en: 'Что ты делаешь?', note: 'делать → делаешь.' },
    ],
    examples: [
      { en: 'Я работаю. (Ya rabótayu.)', es: 'Trabajo.', note: 'работать → работаю.' },
      { en: 'Ты знаешь. (Ty znáyesh.)', es: 'Sabes.', note: 'знать → знаешь.' },
      { en: 'Он думает. (On dúmayet.)', es: 'Él piensa.', note: 'думать → думает.' },
      { en: 'Мы понимаем. (My panimáyem.)', es: 'Entendemos.', note: 'понимать → понимаем.' },
      { en: 'Вы играете. (Vy igráyete.)', es: 'Vosotros jugáis.', note: 'играть → играете.' },
      { en: 'Они отдыхают. (Oní atdykháyut.)', es: 'Ellos descansan.', note: 'отдыхать → отдыхают.' },
      { en: 'Я слушаю музыку. (Ya slúshayu múzyku.)', es: 'Escucho música.', note: 'слушать → слушаю.' },
    ],
    commonMistakes: [
      { wrong: 'Я читаешь', right: 'Я читаю', note: 'La forma de "я" es -ю: читаю.' },
      { wrong: 'Они читает', right: 'Они читают', note: 'La forma de "они" es -ют: читают.' },
      { wrong: 'Я есть читать', right: 'Я читаю', note: 'No se usa auxiliar; el verbo ya se conjuga.' },
      { wrong: 'Я am reading → "я есть читающий"', right: 'я читаю', note: 'No hay "estar + gerundio"; un solo presente.' },
      { wrong: 'мы работаете', right: 'мы работаем', note: '"мы" → -ем; -ете es de "вы".' },
    ],
    tip: 'Memoriza el patrón con читать: -ю, -ешь, -ет, -ем, -ете, -ют. Casi todos los verbos en -ать lo siguen. Y recuerda: un presente ruso = "leo" y "estoy leyendo" a la vez.',
    questions: [
      { s: 'Я ___ (yo leo) — читать', opts: ['читаю', 'читаешь', 'читает', 'читают'], a: 0, fb: '"я" → -ю: читаю.' },
      { s: 'Ты ___ (tú trabajas) — работать', opts: ['работаешь', 'работаю', 'работает', 'работаем'], a: 0, fb: '"ты" → -ешь: работаешь.' },
      { s: 'Он ___ (él piensa) — думать', opts: ['думает', 'думаю', 'думаешь', 'думают'], a: 0, fb: '"он" → -ет: думает.' },
      { s: 'Мы ___ (entendemos) — понимать', opts: ['понимаем', 'понимаю', 'понимаете', 'понимают'], a: 0, fb: '"мы" → -ем: понимаем.' },
      { s: 'Они ___ (ellos saben) — знать', opts: ['знают', 'знает', 'знаю', 'знаешь'], a: 0, fb: '"они" → -ют: знают.' },
      { s: 'Вы ___ (vosotros jugáis) — играть', opts: ['играете', 'играем', 'играю', 'играют'], a: 0, fb: '"вы" → -ете: играете.' },
      { s: 'La vocal temática de la 1ª conjugación es ___', opts: ['-е-', '-и-', '-а-', '-о-'], a: 0, fb: 'Visible en читаешь, читает, читаем.' },
      { s: '"я читаю" significa ___', opts: ['leo / estoy leyendo', 'solo "leo"', 'solo "estoy leyendo"', 'leeré'], a: 0, fb: 'Un presente cubre ambas ideas.' },
      { s: 'Я ___ музыку (escucho música) — слушать', opts: ['слушаю', 'слушаешь', 'слушает', 'слушают'], a: 0, fb: '"я" → слушаю.' },
      { s: 'La terminación de "они" es ___', opts: ['-ют/-ут', '-ешь', '-ет', '-ем'], a: 0, fb: 'они читают, они знают.' },
      { s: '¿Es correcto "Я читаешь"?', opts: ['No: Я читаю', 'Sí', 'Solo informal', 'Solo plural'], a: 0, fb: '"я" usa -ю: читаю.' },
      { s: 'Что ты ___? (¿qué haces?) — делать', opts: ['делаешь', 'делаю', 'делает', 'делаем'], a: 0, fb: '"ты" → делаешь.' },
    ],
  },

  // ───────────────────────── 6. PRESENTE 2ª CONJUGACIÓN ─────────────────────────
  {
    slug: 'presente-segunda-conjugacion',
    order: 6,
    title: 'El presente: 2ª conjugación (-и-)',
    shortTitle: 'Presente 2ª conj.',
    icon: '🔵',
    seoTitle: 'La 2ª conjugación rusa en presente: говорить → говорю, говоришь',
    seoDescription: 'Cómo conjugar los verbos rusos de la 2ª conjugación (говорить, любить, видеть) en presente. Las terminaciones -ю/-ишь/-ит y la diferencia con la 1ª. Ejercicios A1.',
    keywords: ['segunda conjugacion ruso', 'говорить любить', 'presente ruso 2 conjugacion', 'verbos rusos -ить', 'gramatica rusa A1'],
    intro: [
      'La segunda conjugación reúne sobre todo los verbos terminados en -ить (y algunos en -еть). Su seña de identidad es la vocal temática -и-, frente a la -е- de la primera. Se conjuga quitando -ить y añadiendo -ю/-у, -ишь, -ит, -им, -ите, -ят/-ат.',
      'El verbo modelo es говорить (hablar): я говорю, ты говоришь, он/она говорит, мы говорим, вы говорите, они говорят. Compáralo con читать (1ª): la diferencia está en la vocal (говорИшь vs читаЕшь) y en la 3ª persona del plural (говорЯт vs читаЮт).',
      'Muchos verbos clave del A1 son de 2ª conjugación: говорить (hablar), любить (amar/gustar), видеть (ver), слышать (oír), учить (estudiar/enseñar), помнить (recordar). Saber distinguir las dos conjugaciones te permite conjugar correctamente casi cualquier verbo nuevo.',
    ],
    sections: [
      {
        heading: 'Las terminaciones -ишь, -ит, -ят',
        body: [
          'Quita -ить y añade: я +ю/у, ты +ишь, он/она +ит, мы +им, вы +ите, они +ят/ат. говорить → говорю/говоришь/говорит/говорим/говорите/говорят. La marca inconfundible es la -и- en ты/он/мы/вы y la -ят/-ат en они.',
          'Atención al verbo любить (amar/gustar): tiene una "л" extra en la 1ª persona (я люблю), pero el resto es regular: ты любишь, он любит, они любят. Este "л mobile" aparece en varios verbos en -бить/-вить/-пить/-мить.',
        ],
      },
      {
        heading: 'Cómo saber si un verbo es de 1ª o 2ª',
        body: [
          'Regla práctica: los verbos en -ить suelen ser de 2ª conjugación (vocal -и-); los verbos en -ать/-ять, de 1ª (vocal -е-). Hay excepciones que se memorizan, pero esta regla acierta la mayoría de las veces en A1.',
          'La diferencia tiene consecuencias reales: si dijeras "говориешь" (mezclando la -е- de la 1ª) sonaría mal; lo correcto es говоришь. Por eso conviene clasificar cada verbo nuevo al aprenderlo.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'говорить (hablar) — 2ª conjugación',
        headers: ['Persona', 'Terminación', 'Forma', 'Translit.'],
        rows: [
          ['я', '-ю', 'говорю', 'gavarýu'],
          ['ты', '-ишь', 'говоришь', 'gavarísh'],
          ['он / она', '-ит', 'говорит', 'gavarít'],
          ['мы', '-им', 'говорим', 'gavarím'],
          ['вы', '-ите', 'говорите', 'gavaríte'],
          ['они', '-ят', 'говорят', 'gavaryát'],
        ],
      },
    ],
    contrast: [
      { es: 'Hablo ruso', en: 'я говорю по-русски', note: 'говорить → говорю.' },
      { es: 'Te quiero / me gustas', en: 'я тебя люблю', note: 'любить → люблю (con "л" extra en "я").' },
      { es: 'Él ve', en: 'он видит', note: 'видеть (2ª) → видит, no "видет".' },
      { es: 'Ellos hablan', en: 'они говорят', note: 'они → -ят (no -ют).' },
      { es: '¿Hablas español?', en: 'Ты говоришь по-испански?', note: 'ты → говоришь.' },
    ],
    examples: [
      { en: 'Я говорю по-русски. (Ya gavarýu pa-rússki.)', es: 'Hablo ruso.', note: 'говорить → говорю.' },
      { en: 'Ты любишь кофе? (Ty lyúbish kófe?)', es: '¿Te gusta el café?', note: 'любить → любишь.' },
      { en: 'Он видит дом. (On vídit dom.)', es: 'Él ve la casa.', note: 'видеть → видит.' },
      { en: 'Мы учим русский. (My úchim rússkiy.)', es: 'Estudiamos ruso.', note: 'учить → учим.' },
      { en: 'Вы говорите медленно. (Vy gavaríte médlenno.)', es: 'Habláis despacio.', note: 'говорить → говорите.' },
      { en: 'Они любят музыку. (Oní lyúbyat múzyku.)', es: 'Les gusta la música.', note: 'любить → любят.' },
      { en: 'Я люблю тебя. (Ya lyublyú tebyá.)', es: 'Te amo.', note: '"л" extra en la 1ª: люблю.' },
    ],
    commonMistakes: [
      { wrong: 'говориешь', right: 'говоришь', note: 'La 2ª usa -и-, no -е-.' },
      { wrong: 'они говорют', right: 'они говорят', note: 'La 2ª hace -ят en "они", no -ют.' },
      { wrong: 'я любю', right: 'я люблю', note: 'любить añade "л" en la 1ª persona: люблю.' },
      { wrong: 'он видет', right: 'он видит', note: 'видеть es de 2ª: видит.' },
      { wrong: 'tratar -ить como 1ª conjugación', right: 'los verbos en -ить son de 2ª', note: 'Vocal temática -и-.' },
    ],
    tip: 'Pregúntate: ¿el infinitivo acaba en -ить? Casi seguro es 2ª conjugación (-и-): говоришь, любишь, видишь, y они -ят. Memoriza aparte я люблю con su "л".',
    questions: [
      { s: 'Я ___ по-русски (hablo ruso) — говорить', opts: ['говорю', 'говоришь', 'говорит', 'говорят'], a: 0, fb: '"я" → говорю.' },
      { s: 'Ты ___ кофе? (¿te gusta el café?) — любить', opts: ['любишь', 'любю', 'любит', 'любят'], a: 0, fb: '"ты" → любишь.' },
      { s: 'Он ___ дом (él ve la casa) — видеть', opts: ['видит', 'видет', 'видишь', 'видят'], a: 0, fb: 'видеть (2ª) → видит.' },
      { s: 'Они ___ музыку (les gusta la música) — любить', opts: ['любят', 'любют', 'любит', 'любишь'], a: 0, fb: 'они → -ят: любят.' },
      { s: 'La vocal temática de la 2ª conjugación es ___', opts: ['-и-', '-е-', '-а-', '-о-'], a: 0, fb: 'говорИшь, говорИт, говорИм.' },
      { s: '"я amo" (любить) es ___', opts: ['я люблю', 'я любю', 'я любишь', 'я любит'], a: 0, fb: 'любить añade "л" en la 1ª: люблю.' },
      { s: 'Мы ___ русский (estudiamos ruso) — учить', opts: ['учим', 'учем', 'училим', 'учат'], a: 0, fb: '"мы" → учим.' },
      { s: 'En "они", la 2ª conjugación termina en ___', opts: ['-ят/-ат', '-ют/-ут', '-ешь', '-ем'], a: 0, fb: 'говорят, любят (no говорют).' },
      { s: 'Los verbos en -ить suelen ser de la ___ conjugación', opts: ['2ª', '1ª', 'ninguna', 'ambas'], a: 0, fb: '-ить → 2ª (vocal -и-).' },
      { s: 'Вы ___ медленно (habláis despacio) — говорить', opts: ['говорите', 'говорете', 'говорим', 'говорят'], a: 0, fb: '"вы" → говорите.' },
      { s: '¿Es correcto "они говорют"?', opts: ['No: они говорят', 'Sí', 'Solo informal', 'Solo escrito'], a: 0, fb: 'La 2ª hace -ят: говорят.' },
      { s: 'Ты ___ испанский? (¿hablas español?)', opts: ['говоришь', 'говоришь→говориешь', 'говорю', 'говорят'], a: 0, fb: '"ты" → говоришь.' },
    ],
  },

  // ───────────────────────── 7. ACUSATIVO ─────────────────────────
  {
    slug: 'caso-acusativo-objeto-directo',
    order: 7,
    title: 'Винительный — El caso acusativo (objeto directo)',
    shortTitle: 'Acusativo (objeto)',
    icon: '🎯',
    seoTitle: 'El caso acusativo ruso: el objeto directo explicado',
    seoDescription: 'Qué es el acusativo en ruso y cómo marca el objeto directo (вижу книгу). Cambios en femeninos (-а→-у) y masculinos animados. Con tabla y ejercicios A1.',
    keywords: ['acusativo ruso', 'caso acusativo', 'objeto directo ruso', 'винительный падеж', 'casos rusos A1'],
    intro: [
      'Aquí llegamos al corazón del ruso: los casos. En español el papel de una palabra se marca con el orden y las preposiciones; en ruso se marca cambiando la TERMINACIÓN del sustantivo. El acusativo (винительный падеж) es el caso del objeto directo: lo que recibe la acción (lo que ves, lees, compras, amas).',
      'La buena noticia para empezar: muchos sustantivos casi no cambian en acusativo. Los neutros (окно) y los masculinos inanimados (стол, дом) tienen acusativo IGUAL al nominativo: Я вижу дом ("veo la casa"), Я читаю письмо ("leo la carta"). No tienes que hacer nada.',
      'El cambio principal está en los femeninos en -а/-я, que pasan a -у/-ю: книга → Я читаю книгу ("leo el libro"). Y en los masculinos animados (personas, animales), que toman la terminación del genitivo: Я вижу брата ("veo a mi hermano"). Con estas dos reglas cubres lo esencial del A1.',
    ],
    sections: [
      {
        heading: 'Femeninos: -а/-я → -у/-ю',
        body: [
          'El cambio más visible: los femeninos en -а cambian a -у, y los en -я a -ю. книга → книгу, вода → воду, Москва → Москву, Россия → Россию. "Я люблю Москву" = "amo Moscú".',
          'Por eso "Я читаю книга" es incorrecto: como книга es objeto directo, va en acusativo → Я читаю книгу.',
        ],
      },
      {
        heading: 'Lo que NO cambia y los animados',
        body: [
          'No cambian (acusativo = nominativo): neutros (окно, письмо, море) y masculinos INANIMADOS (стол, дом, журнал, чай). Я покупаю журнал ("compro la revista") — журнал igual.',
          'Sí cambian los masculinos ANIMADOS (personas, animales): toman -а/-я (como el genitivo). брат → Я вижу брата; студент → Я знаю студента; кот → Я люблю кота. La regla "animado = como genitivo" es clave en ruso.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'El acusativo según el tipo de sustantivo',
        headers: ['Tipo', 'Nominativo', 'Acusativo', 'Ejemplo'],
        rows: [
          ['Femenino -а/-я', 'книга / Россия', 'книгу / Россию', 'читаю книгу'],
          ['Masc. inanimado', 'стол / журнал', 'стол / журнал (igual)', 'вижу стол'],
          ['Neutro', 'окно / письмо', 'окно / письмо (igual)', 'читаю письмо'],
          ['Masc. animado', 'брат / студент', 'брата / студента', 'вижу брата'],
        ],
      },
    ],
    contrast: [
      { es: 'Leo el libro', en: 'Я читаю книгу', note: 'книга (fem.) → книгу en acusativo.' },
      { es: 'Veo la casa', en: 'Я вижу дом', note: 'дом (masc. inanimado) no cambia.' },
      { es: 'Veo a mi hermano', en: 'Я вижу брата', note: 'брат (masc. animado) → брата.' },
      { es: 'Amo Moscú', en: 'Я люблю Москву', note: 'Москва → Москву.' },
      { es: 'Leo la carta', en: 'Я читаю письмо', note: 'письмо (neutro) no cambia.' },
    ],
    examples: [
      { en: 'Я читаю книгу. (Ya chitáyu knígu.)', es: 'Leo el libro.', note: 'книга → книгу.' },
      { en: 'Я вижу дом. (Ya vízhu dom.)', es: 'Veo la casa.', note: 'дом no cambia.' },
      { en: 'Я люблю Москву. (Ya lyublyú Maskvú.)', es: 'Amo Moscú.', note: 'Москва → Москву.' },
      { en: 'Я знаю студента. (Ya znáyu studénta.)', es: 'Conozco al estudiante.', note: 'animado → студента.' },
      { en: 'Я покупаю воду. (Ya pakupáyu vódu.)', es: 'Compro agua.', note: 'вода → воду.' },
      { en: 'Я читаю письмо. (Ya chitáyu pis\'mó.)', es: 'Leo la carta.', note: 'neutro, no cambia.' },
      { en: 'Я вижу брата. (Ya vízhu bráta.)', es: 'Veo a mi hermano.', note: 'animado → брата.' },
    ],
    commonMistakes: [
      { wrong: 'Я читаю книга', right: 'Я читаю книгу', note: 'Objeto directo femenino → -у: книгу.' },
      { wrong: 'Я люблю Москва', right: 'Я люблю Москву', note: 'Москва → Москву.' },
      { wrong: 'Я вижу брат', right: 'Я вижу брата', note: 'Masculino animado → brata.' },
      { wrong: 'cambiar стол en acusativo (стола)', right: 'стол no cambia (inanimado)', note: 'Masc. inanimado = nominativo.' },
      { wrong: 'cambiar окно', right: 'окно no cambia', note: 'Neutro = nominativo en acusativo.' },
    ],
    tip: 'Tres reglas y ya: femenino -а/-я → -у/-ю; masculino animado → como genitivo (-а/-я); todo lo demás (neutro y masc. inanimado) no cambia. Con eso aciertas la mayoría de los objetos directos del A1.',
    questions: [
      { s: 'Я читаю ___ (leo el libro) — книга', opts: ['книгу', 'книга', 'книги', 'книге'], a: 0, fb: 'fem. → книгу.' },
      { s: 'Я вижу ___ (veo la casa) — дом', opts: ['дом', 'дома', 'дому', 'домо'], a: 0, fb: 'masc. inanimado → no cambia.' },
      { s: 'Я люблю ___ (amo Moscú) — Москва', opts: ['Москву', 'Москва', 'Москве', 'Москвы'], a: 0, fb: 'Москва → Москву.' },
      { s: 'Я вижу ___ (veo a mi hermano) — брат', opts: ['брата', 'брат', 'брату', 'братом'], a: 0, fb: 'animado → брата.' },
      { s: 'El acusativo marca el ___', opts: ['objeto directo', 'sujeto', 'posesión', 'lugar'], a: 0, fb: 'Es el caso de lo que recibe la acción.' },
      { s: 'Я читаю ___ (leo la carta) — письмо', opts: ['письмо', 'письма', 'письме', 'письму'], a: 0, fb: 'neutro → no cambia.' },
      { s: 'Los femeninos en -а pasan en acusativo a ___', opts: ['-у', '-ы', '-е', '-ой'], a: 0, fb: 'книга → книгу.' },
      { s: 'Я покупаю ___ (compro agua) — вода', opts: ['воду', 'вода', 'воды', 'воде'], a: 0, fb: 'вода → воду.' },
      { s: 'Los masculinos animados toman la terminación del ___', opts: ['genitivo', 'nominativo', 'preposicional', 'dativo'], a: 0, fb: 'брат → брата (como genitivo).' },
      { s: '¿Cambia "стол" (mesa) en acusativo?', opts: ['No (masc. inanimado)', 'Sí, a стола', 'Sí, a столу', 'Sí, a столы'], a: 0, fb: 'Masc. inanimado = nominativo.' },
      { s: 'Я знаю ___ (conozco al estudiante) — студент', opts: ['студента', 'студент', 'студенту', 'студенты'], a: 0, fb: 'animado → студента.' },
      { s: 'Я пью ___ (bebo café) — кофе (indeclinable)', opts: ['кофе', 'кофу', 'кофя', 'кофей'], a: 0, fb: 'кофе es indeclinable: no cambia.' },
    ],
  },

  // ───────────────────────── 8. PREPOSICIONAL ─────────────────────────
  {
    slug: 'caso-preposicional-lugar',
    order: 8,
    title: 'Предложный — El caso preposicional (¿dónde?)',
    shortTitle: 'Preposicional (где?)',
    icon: '📍',
    seoTitle: 'El caso preposicional ruso: decir dónde estás (в, на + -е)',
    seoDescription: 'El caso preposicional en ruso para indicar ubicación (где?): в Москве, на работе. La terminación -е y las preposiciones в/на. Con tabla y ejercicios A1.',
    keywords: ['preposicional ruso', 'caso preposicional', 'где en ruso', 'в на ruso', 'ubicacion ruso A1'],
    intro: [
      'El caso preposicional (предложный падеж) sirve sobre todo para decir DÓNDE está algo o alguien (где?), siempre con las preposiciones в (en/dentro de) o на (en/sobre). Responde a la pregunta где? y es uno de los casos más fáciles porque su terminación es casi siempre -е.',
      'La regla básica: a la mayoría de los sustantivos se les añade -е. Москва → в Москве (en Moscú), работа → на работе (en el trabajo), стол → на столе (sobre la mesa), окно → в окне. No importa el género: casi todos hacen -е.',
      'Solo necesitas elegir entre в y на. En general, в se usa con espacios cerrados y lugares "dentro" (в доме, в городе, в школе), y на con superficies y ciertos lugares de actividad (на работе, на улице, на уроке). Algunos usos de на son fijos y se memorizan.',
    ],
    sections: [
      {
        heading: 'La terminación -е',
        body: [
          'Quita la vocal final (si la hay) y añade -е: Москва → Москве, школа → школе, театр → театре, море → море (ya acaba en -е). в Москве, в школе, в театре, на работе. Es la terminación más predecible de todo el sistema de casos.',
          'Unas pocas palabras hacen -у en vez de -е tras на (на полу, в саду, в углу), pero son excepciones que se aprenden con el uso; la inmensa mayoría sigue la regla -е.',
        ],
      },
      {
        heading: 'в vs на y "¿dónde?" (где) vs "¿a dónde?" (куда)',
        body: [
          'в = en/dentro (lugares cerrados, ciudades, países): в доме, в Москве, в России. на = en/sobre (superficies y ciertos sustantivos fijos): на столе, на работе, на улице, на уроке, на концерте.',
          'Ojo con la diferencia ubicación vs destino: где? (¿dónde?) → preposicional (в Москве); куда? (¿a dónde?) → acusativo (в Москву). "Vivo EN Moscú" = в Москве; "Voy A Moscú" = в Москву. Misma preposición, distinto caso.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'El preposicional (где?)',
        headers: ['Nominativo', 'Preposición', 'Preposicional', 'Significado'],
        rows: [
          ['Москва', 'в', 'в Москве', 'en Moscú'],
          ['работа', 'на', 'на работе', 'en el trabajo'],
          ['стол', 'на', 'на столе', 'sobre la mesa'],
          ['школа', 'в', 'в школе', 'en la escuela'],
          ['Россия', 'в', 'в России', 'en Rusia'],
        ],
      },
    ],
    contrast: [
      { es: 'Vivo en Moscú', en: 'Я живу в Москве', note: 'Ubicación → preposicional (-е).' },
      { es: 'Voy a Moscú', en: 'Я еду в Москву', note: 'Destino → acusativo (-у). ¡Compara!' },
      { es: 'Estoy en el trabajo', en: 'Я на работе', note: 'работа → на работе.' },
      { es: 'El libro está sobre la mesa', en: 'Книга на столе', note: 'стол → на столе.' },
      { es: 'Estudio en la escuela', en: 'Я учусь в школе', note: 'школа → в школе.' },
    ],
    examples: [
      { en: 'Я живу в Москве. (Ya zhivú v Maskvé.)', es: 'Vivo en Moscú.', note: 'Москва → Москве.' },
      { en: 'Я на работе. (Ya na rabóte.)', es: 'Estoy en el trabajo.', note: 'работа → работе.' },
      { en: 'Книга на столе. (Kníga na stalé.)', es: 'El libro está sobre la mesa.', note: 'стол → столе.' },
      { en: 'Мы в России. (My v Rassíi.)', es: 'Estamos en Rusia.', note: 'Россия → России.' },
      { en: 'Он в школе. (On v shkóle.)', es: 'Él está en la escuela.', note: 'школа → школе.' },
      { en: 'Я думаю о тебе. (Ya dúmayu a tebé.)', es: 'Pienso en ti.', note: 'о + preposicional también para "sobre/acerca de".' },
      { en: 'Мы говорим о фильме. (My gavarím a fíl\'me.)', es: 'Hablamos de la película.', note: 'о фильме (фильм → фильме).' },
    ],
    commonMistakes: [
      { wrong: 'Я живу в Москва', right: 'Я живу в Москве', note: 'Ubicación → preposicional: Москве.' },
      { wrong: 'usar в con работа', right: 'на работе', note: 'работа va con на (uso fijo).' },
      { wrong: 'confundir destino y ubicación (в Москве для "voy a")', right: 'Я еду в Москву (acusativo)', note: 'куда → acusativo; где → preposicional.' },
      { wrong: 'на Москве', right: 'в Москве', note: 'Las ciudades van con в.' },
      { wrong: 'olvidar la -е (в школа)', right: 'в школе', note: 'El preposicional añade -е.' },
    ],
    tip: 'Para "¿dónde?" (где): preposición в/на + sustantivo en -е. Y distingue: где (ubicación) → -е; куда (destino) → acusativo. в Москве = estoy ahí; в Москву = voy ahí.',
    questions: [
      { s: 'Я живу в ___ (vivo en Moscú) — Москва', opts: ['Москве', 'Москва', 'Москву', 'Москвы'], a: 0, fb: 'Ubicación → Москве.' },
      { s: 'Я на ___ (en el trabajo) — работа', opts: ['работе', 'работа', 'работу', 'работы'], a: 0, fb: 'работа → работе.' },
      { s: 'Книга на ___ (sobre la mesa) — стол', opts: ['столе', 'стол', 'стола', 'столу'], a: 0, fb: 'стол → столе.' },
      { s: 'El caso preposicional responde a la pregunta ___', opts: ['¿dónde? (где)', '¿a dónde? (куда)', '¿qué? (что)', '¿de quién? (чей)'], a: 0, fb: 'Indica ubicación: где.' },
      { s: 'La terminación típica del preposicional es ___', opts: ['-е', '-у', '-ом', '-а'], a: 0, fb: 'в Москве, на столе, в школе.' },
      { s: 'Мы в ___ (en Rusia) — Россия', opts: ['России', 'Россия', 'Россию', 'Россие'], a: 0, fb: 'Россия → России.' },
      { s: '"Voy A Moscú" usa ___', opts: ['в Москву (acusativo)', 'в Москве (preposicional)', 'в Москва', 'на Москве'], a: 0, fb: 'Destino (куда) → acusativo: Москву.' },
      { s: 'Las ciudades llevan la preposición ___', opts: ['в', 'на', 'о', 'у'], a: 0, fb: 'в Москве, в Петербурге.' },
      { s: 'Он в ___ (él está en la escuela) — школа', opts: ['школе', 'школа', 'школу', 'школы'], a: 0, fb: 'школа → школе.' },
      { s: '"Hablamos de la película" = Мы говорим о ___ — фильм', opts: ['фильме', 'фильм', 'фильма', 'фильму'], a: 0, fb: 'о + preposicional: фильме.' },
      { s: '¿Cuál preposición va con работа?', opts: ['на (на работе)', 'в (в работе)', 'о', 'у'], a: 0, fb: 'работа es de las que usan на.' },
      { s: '¿Es correcto "Я живу в Москва"?', opts: ['No: в Москве', 'Sí', 'Solo destino', 'Solo informal'], a: 0, fb: 'Ubicación → preposicional: Москве.' },
    ],
  },

  // ───────────────────────── 9. GENITIVO ─────────────────────────
  {
    slug: 'caso-genitivo-posesion',
    order: 9,
    title: 'Родительный — El caso genitivo (de, tener, no hay)',
    shortTitle: 'Genitivo (de / у меня)',
    icon: '🔗',
    seoTitle: 'El caso genitivo ruso: posesión, "у меня есть" y la negación "нет"',
    seoDescription: 'El genitivo en ruso para expresar "de", la posesión (у меня есть), la ausencia (нет + genitivo) y después de números. Con tabla, ejemplos y ejercicios A1.',
    keywords: ['genitivo ruso', 'caso genitivo', 'у меня есть', 'нет ruso', 'posesion rusa A1'],
    intro: [
      'El genitivo (родительный падеж) es probablemente el caso más usado del ruso. Su idea central es "de": expresa posesión y relación (книга брата = "el libro del hermano", центр города = "el centro de la ciudad"). Pero hace mucho más, y por eso conviene dominarlo pronto.',
      'En ruso, "tener" se expresa con el genitivo: la estructura es у + (alguien en genitivo) + есть + (lo que tiene). У меня есть кот = literalmente "junto a mí hay un gato" = "tengo un gato". Aquí меня es el genitivo de я.',
      'Y para negar la existencia ("no hay / no tengo") se usa нет + genitivo: У меня нет машины = "no tengo coche" (машина → машины). El genitivo también aparece después de la mayoría de los números y de cantidades (много, мало). Es el caso que más rinde aprender bien.',
    ],
    sections: [
      {
        heading: 'Las terminaciones del genitivo',
        body: [
          'Masculino y neutro → -а/-я: брат → брата, город → города, окно → окна. Femenino → -ы/-и: машина → машины, Москва → Москвы, книга → книги (tras г/к/х se usa -и). "центр города" = el centro de la ciudad.',
          'Los pronombres tienen formas propias: я → меня, ты → тебя, он → его, она → её, мы → нас, вы → вас, они → их. Son las que usas en у меня, у тебя, у него…',
        ],
      },
      {
        heading: 'Tener (у… есть) y no tener (нет + genitivo)',
        body: [
          'Posesión positiva: у + genitivo + есть + nominativo. У меня есть собака ("tengo un perro"), У него есть машина ("él tiene coche"). есть puede omitirse si lo importante es la cualidad, no la existencia.',
          'Posesión/existencia negativa: нет + genitivo. У меня нет времени ("no tengo tiempo"; время → времени), Здесь нет молока ("aquí no hay leche"; молоко → молока). Tras нет, el sustantivo SIEMPRE va en genitivo.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Usos del genitivo',
        headers: ['Uso', 'Estructura', 'Ejemplo', 'Significado'],
        rows: [
          ['"de" (posesión)', 'N + N(gen.)', 'книга брата', 'el libro del hermano'],
          ['tener', 'у + gen. + есть', 'у меня есть кот', 'tengo un gato'],
          ['no tener / no hay', 'нет + gen.', 'у меня нет машины', 'no tengo coche'],
          ['tras números', '2-4 → gen. sing.', 'два брата', 'dos hermanos'],
        ],
      },
    ],
    contrast: [
      { es: 'El libro del hermano', en: 'книга брата', note: 'брат → брата (de quién).' },
      { es: 'Tengo un gato', en: 'У меня есть кот', note: 'Literalmente "junto a mí hay un gato".' },
      { es: 'No tengo tiempo', en: 'У меня нет времени', note: 'нет + genitivo: времени.' },
      { es: 'El centro de la ciudad', en: 'центр города', note: 'город → города.' },
      { es: '¿Tienes hermana?', en: 'У тебя есть сестра?', note: 'тебя = genitivo de ты.' },
    ],
    examples: [
      { en: 'У меня есть кот. (U menyá yest\' kot.)', es: 'Tengo un gato.', note: 'меня = genitivo de я.' },
      { en: 'У меня нет машины. (U menyá nyet mashíny.)', es: 'No tengo coche.', note: 'машина → машины tras нет.' },
      { en: 'Книга брата. (Kníga bráta.)', es: 'El libro del hermano.', note: 'брат → брата.' },
      { en: 'Центр города. (Tsentr górada.)', es: 'El centro de la ciudad.', note: 'город → города.' },
      { en: 'У него есть машина. (U nevó yest\' mashína.)', es: 'Él tiene coche.', note: 'него = genitivo de он.' },
      { en: 'Здесь нет молока. (Zdes\' nyet malaká.)', es: 'Aquí no hay leche.', note: 'молоко → молока.' },
      { en: 'У тебя есть время? (U tebyá yest\' vrémya?)', es: '¿Tienes tiempo?', note: 'тебя = genitivo de ты.' },
    ],
    commonMistakes: [
      { wrong: 'Я имею кот (calco de "tener")', right: 'У меня есть кот', note: 'El ruso usa у + genitivo + есть, no un verbo "tener".' },
      { wrong: 'У меня нет машина', right: 'У меня нет машины', note: 'Tras нет, genitivo: машины.' },
      { wrong: 'у я есть', right: 'у меня есть', note: 'я → меня en esta estructura.' },
      { wrong: 'книга брат', right: 'книга брата', note: 'El poseedor va en genitivo: брата.' },
      { wrong: 'usar nominativo tras нет', right: 'нет siempre + genitivo', note: 'нет времени, нет молока, нет денег.' },
    ],
    tip: 'Memoriza tres bloques: "de" → genitivo; "tener" → у + меня/тебя/него… + есть; "no tener/no hay" → нет + genitivo. Y aprende los pronombres en genitivo (меня, тебя, него, неё, нас, вас, них) como un set.',
    questions: [
      { s: '"Tengo un gato" = У меня есть ___', opts: ['кот', 'кота', 'коту', 'котом'], a: 0, fb: 'Lo que se tiene va en nominativo: кот. (меня es el genitivo).' },
      { s: '"No tengo coche" = У меня нет ___ — машина', opts: ['машины', 'машина', 'машину', 'машине'], a: 0, fb: 'Tras нет → genitivo: машины.' },
      { s: '"El libro del hermano" = книга ___ — брат', opts: ['брата', 'брат', 'брату', 'братом'], a: 0, fb: 'Poseedor en genitivo: брата.' },
      { s: 'Para decir "tener" el ruso usa ___', opts: ['у + genitivo + есть', 'el verbo иметь siempre', 'есть + acusativo', 'в + preposicional'], a: 0, fb: 'У меня есть… es la estructura normal.' },
      { s: 'Tras la palabra нет, el sustantivo va en ___', opts: ['genitivo', 'nominativo', 'acusativo', 'preposicional'], a: 0, fb: 'нет времени, нет молока.' },
      { s: 'El genitivo de "я" (en у… есть) es ___', opts: ['меня', 'мне', 'мной', 'мой'], a: 0, fb: 'у меня есть.' },
      { s: '"El centro de la ciudad" = центр ___ — город', opts: ['города', 'город', 'городу', 'городе'], a: 0, fb: 'город → города.' },
      { s: '"¿Tienes tiempo?" = У тебя есть ___ — время', opts: ['время', 'времени', 'временем', 'времю'], a: 0, fb: 'Lo poseído en nominativo: время (тебя ya es genitivo).' },
      { s: 'Los masculinos hacen el genitivo en ___', opts: ['-а/-я', '-ы/-и', '-е', '-ом'], a: 0, fb: 'брат → брата, город → города.' },
      { s: '"Aquí no hay leche" = Здесь нет ___ — молоко', opts: ['молока', 'молоко', 'молоку', 'молоком'], a: 0, fb: 'нет + genitivo: молока.' },
      { s: 'El genitivo de "он" es ___', opts: ['него (у него)', 'ему', 'им', 'его→ему'], a: 0, fb: 'у него есть.' },
      { s: '¿Es correcto "У меня нет машина"?', opts: ['No: нет машины', 'Sí', 'Solo informal', 'Solo plural'], a: 0, fb: 'Tras нет → genitivo: машины.' },
    ],
  },

  // ───────────────────────── 10. NÚMEROS + EDAD ─────────────────────────
  {
    slug: 'numeros-y-edad',
    order: 10,
    title: 'Числа — Los números y la edad',
    shortTitle: 'Números y edad',
    icon: '🔢',
    seoTitle: 'Los números en ruso y cómo decir la edad (мне ... лет)',
    seoDescription: 'Los números rusos del 1 al 100, cómo decir la edad con мне ... год/года/лет y la concordancia de los números con el sustantivo. Con tabla y ejercicios A1.',
    keywords: ['numeros en ruso', 'contar en ruso', 'edad en ruso', 'мне лет', 'numeros rusos A1'],
    intro: [
      'Los números rusos básicos: один (1), два (2), три (3), четыре (4), пять (5), шесть (6), семь (7), восемь (8), девять (9), десять (10). Las decenas: двадцать (20), тридцать (30), сорок (40), пятьдесят (50), сто (100). Se combinan como en español: двадцать один (21), пятьдесят два (52).',
      'La particularidad rusa es que el sustantivo que sigue al número CAMBIA de forma según el número. Con 1 va en nominativo singular (один год), con 2-3-4 en genitivo singular (два года), y con 5 en adelante en genitivo plural (пять лет). Este patrón rige también la edad.',
      'Para la edad se usa мне/тебе/ему… (dativo del pronombre) + número + год/года/лет: Мне двадцать лет ("tengo 20 años"). No se usa el verbo "tener": literalmente es "a mí veinte años". La palabra para "año" cambia: год (1), года (2-4), лет (5+).',
    ],
    sections: [
      {
        heading: 'Números 1-100',
        body: [
          'Unidades: один, два, три, четыре, пять, шесть, семь, восемь, девять, десять. Del 11 al 19 acaban en -надцать: одиннадцать (11), двенадцать (12)… девятнадцать (19). Decenas: двадцать, тридцать, сорок, пятьдесят, шестьдесят, семьдесят, восемьдесят, девяносто, сто.',
          'один tiene género (один/одна/одно) y два cambia a две con femeninos (две книги). El resto de números (3+) no cambian de género.',
        ],
      },
      {
        heading: 'La edad: год / года / лет',
        body: [
          'Estructura: dativo (мне, тебе, ему, ей, нам, вам, им) + número + palabra "año". La palabra cambia según el último dígito: termina en 1 → год (21 → год), en 2-4 → года (22-24 → года), en 5-20 y 0 → лет (25, 30, 11-14 → лет).',
          'Ejemplos: Мне один год (1), Мне двадцать два года (22), Мне пять лет (5), Мне двадцать лет (20). Los "teens" (11-14) siempre usan лет: одиннадцать лет.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Números y la palabra que sigue',
        headers: ['Número', 'Sustantivo', 'Ejemplo (año)', 'Edad'],
        rows: [
          ['1, 21, 31…', 'nominativo sing.', 'год', 'Мне 21 год'],
          ['2-3-4, 22-24…', 'genitivo sing.', 'года', 'Мне 22 года'],
          ['5-20, 25…', 'genitivo plural', 'лет', 'Мне 25 лет'],
          ['11-14', 'genitivo plural', 'лет', 'Мне 13 лет'],
        ],
      },
    ],
    contrast: [
      { es: 'Tengo veinte años', en: 'Мне двадцать лет', note: 'Sin "tener": "a mí veinte años". 20 → лет.' },
      { es: 'Tengo veintidós años', en: 'Мне двадцать два года', note: 'Acaba en 2 → года.' },
      { es: 'Tengo veintiún años', en: 'Мне двадцать один год', note: 'Acaba en 1 → год.' },
      { es: 'dos libros', en: 'две книги', note: 'два → две con femeninos; книга → genitivo sing. книги.' },
      { es: 'cinco años', en: 'пять лет', note: '5+ → genitivo plural: лет.' },
    ],
    examples: [
      { en: 'Мне двадцать лет. (Mne dvádtsat\' let.)', es: 'Tengo 20 años.', note: '20 → лет.' },
      { en: 'Мне двадцать один год. (Mne dvádtsat\' adín got.)', es: 'Tengo 21 años.', note: 'acaba en 1 → год.' },
      { en: 'Мне двадцать два года. (Mne dvádtsat\' dva góda.)', es: 'Tengo 22 años.', note: 'acaba en 2 → года.' },
      { en: 'У меня два брата. (U menyá dva bráta.)', es: 'Tengo dos hermanos.', note: '2 → genitivo sing.: брата.' },
      { en: 'пять книг (pyat\' knig)', es: 'cinco libros', note: '5+ → genitivo plural: книг.' },
      { en: 'две сестры (dve sestrý)', es: 'dos hermanas', note: 'две (fem.) + genitivo sing. сестры.' },
      { en: 'Сколько тебе лет? (Skól\'ka tebé let?)', es: '¿Cuántos años tienes?', note: 'Pregunta de edad estándar.' },
    ],
    commonMistakes: [
      { wrong: 'Я двадцать лет (calco)', right: 'Мне двадцать лет', note: 'La edad usa dativo (мне), no "я".' },
      { wrong: 'Мне 22 лет', right: 'Мне 22 года', note: 'Acaba en 2 → года.' },
      { wrong: 'Мне 21 лет', right: 'Мне 21 год', note: 'Acaba en 1 → год.' },
      { wrong: 'два книги', right: 'две книги', note: 'два → две con femeninos.' },
      { wrong: 'пять год', right: 'пять лет', note: '5+ → genitivo plural лет.' },
    ],
    tip: 'Para la edad: мне + número + (1→год, 2-4→года, 5+→лет), mirando el ÚLTIMO dígito. Y recuerda que 11-14 siempre usan лет. Nada de "я"; la edad va con мне.',
    questions: [
      { s: '"Tengo 20 años" = Мне двадцать ___', opts: ['лет', 'год', 'года', 'годов'], a: 0, fb: '20 → лет.' },
      { s: '"Tengo 22 años" = Мне двадцать два ___', opts: ['года', 'лет', 'год', 'годы'], a: 0, fb: 'acaba en 2 → года.' },
      { s: '"Tengo 21 años" = Мне двадцать один ___', opts: ['год', 'года', 'лет', 'годов'], a: 0, fb: 'acaba en 1 → год.' },
      { s: 'La edad en ruso usa el pronombre en caso ___', opts: ['dativo (мне, тебе)', 'nominativo (я, ты)', 'genitivo (меня)', 'acusativo'], a: 0, fb: 'Мне двадцать лет.' },
      { s: '"dos hermanos" = два ___ — брат', opts: ['брата', 'брат', 'братов', 'братья'], a: 0, fb: '2 → genitivo sing.: брата.' },
      { s: '"cinco libros" = пять ___ — книга', opts: ['книг', 'книги', 'книга', 'книгу'], a: 0, fb: '5+ → genitivo plural: книг.' },
      { s: '"dos libros" (книга, fem.) = ___ книги', opts: ['две', 'два', 'двое', 'двух'], a: 0, fb: 'два → две con femeninos.' },
      { s: 'Con números 2-3-4, el sustantivo va en ___', opts: ['genitivo singular', 'nominativo plural', 'genitivo plural', 'dativo'], a: 0, fb: 'два года, три книги.' },
      { s: '"¿Cuántos años tienes?" = Сколько тебе ___?', opts: ['лет', 'год', 'года', 'годов'], a: 0, fb: 'Сколько тебе лет? (forma fija).' },
      { s: '"10" en ruso es ___', opts: ['десять', 'два', 'пять', 'сто'], a: 0, fb: 'десять = 10.' },
      { s: '"Tengo 13 años" = Мне тринадцать ___', opts: ['лет', 'года', 'год', 'годы'], a: 0, fb: '11-14 siempre usan лет.' },
      { s: '¿Es correcto "Я двадцать лет"?', opts: ['No: Мне двадцать лет', 'Sí', 'Solo informal', 'Solo escrito'], a: 0, fb: 'La edad usa dativo: мне.' },
    ],
  },

  // ───────────────────────── 11. ADJETIVOS ─────────────────────────
  {
    slug: 'adjetivos-concordancia',
    order: 11,
    title: 'Прилагательные — Los adjetivos y su concordancia',
    shortTitle: 'Adjetivos (новый/новая)',
    icon: '🎨',
    seoTitle: 'Los adjetivos en ruso: concordancia de género (новый, новая, новое)',
    seoDescription: 'Cómo concuerdan los adjetivos rusos con el sustantivo en género y número: новый дом, новая машина, новое окно, новые книги. Terminaciones y ejercicios A1.',
    keywords: ['adjetivos rusos', 'concordancia adjetivos ruso', 'новый новая новое', 'terminaciones adjetivos ruso', 'gramatica rusa A1'],
    intro: [
      'Los adjetivos rusos concuerdan con el sustantivo en género, número (y caso, que verás más adelante). En su forma de diccionario, el adjetivo masculino acaba en -ый/-ой/-ий: новый (nuevo), большой (grande), хороший (bueno). De ahí se derivan las demás formas.',
      'Las terminaciones según el género: masculino -ый/-ой/-ий, femenino -ая/-яя, neutro -ое/-ее, plural -ые/-ие. Así: новый дом (masc.), новая машина (fem.), новое окно (neutro), новые книги (plural). El adjetivo se adapta a la palabra a la que acompaña.',
      'A diferencia del español, el adjetivo va normalmente ANTES del sustantivo (большой дом, "casa grande" → literalmente "grande casa") y, como en presente no hay "ser", también sirve para predicados: Дом большой ("la casa es grande"). Una misma forma cubre "la casa grande" y "la casa es grande".',
    ],
    sections: [
      {
        heading: 'Las terminaciones por género',
        body: [
          'Masculino: -ый (новый), -ой si es tónica (большой), -ий tras ciertas consonantes (хороший, русский). Femenino: -ая (новая, большая) / -яя (синяя). Neutro: -ое (новое) / -ее (хорошее). Plural (todos los géneros): -ые (новые) / -ие (хорошие, русские).',
          'La regla ortográfica: tras г, к, х, ж, ш, щ, ч no se escribe -ы sino -и (русские, хорошие). Por eso русский hace plural русские.',
        ],
      },
      {
        heading: 'Posición y uso predicativo',
        body: [
          'Atributivo (antes del sustantivo): красивый город ("ciudad bonita"), интересная книга ("libro interesante"). Predicativo (sin "ser"): Город красивый ("la ciudad es bonita"), Книга интересная ("el libro es interesante"). La forma larga del adjetivo sirve para ambos.',
          'El adjetivo debe concordar con el género real del sustantivo, no con el del español: машина (coche) es femenino en ruso → новая машина, aunque "coche" sea masculino en español.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Terminaciones del adjetivo (новый = nuevo)',
        headers: ['Género', 'Terminación', 'Forma', 'Ejemplo'],
        rows: [
          ['Masculino', '-ый/-ой/-ий', 'новый', 'новый дом'],
          ['Femenino', '-ая/-яя', 'новая', 'новая машина'],
          ['Neutro', '-ое/-ее', 'новое', 'новое окно'],
          ['Plural', '-ые/-ие', 'новые', 'новые книги'],
        ],
      },
    ],
    contrast: [
      { es: 'Casa nueva (masc. en ruso)', en: 'новый дом', note: 'дом masc. → новый.' },
      { es: 'Coche nuevo (¡fem. en ruso!)', en: 'новая машина', note: 'машина fem. → новая, aunque "coche" sea masc. en español.' },
      { es: 'Ventana nueva (neutro)', en: 'новое окно', note: 'окно neutro → новое.' },
      { es: 'La ciudad es bonita', en: 'Город красивый', note: 'Predicado sin "ser": adjetivo solo.' },
      { es: 'Libros interesantes', en: 'интересные книги', note: 'plural → -ые.' },
    ],
    examples: [
      { en: 'новый дом (nóvyy dom)', es: 'casa nueva', note: 'masc. → -ый.' },
      { en: 'новая машина (nóvaya mashína)', es: 'coche nuevo', note: 'fem. → -ая.' },
      { en: 'новое окно (nóvaye aknó)', es: 'ventana nueva', note: 'neutro → -ое.' },
      { en: 'новые книги (nóvye knígi)', es: 'libros nuevos', note: 'plural → -ые.' },
      { en: 'большой город (bal\'shóy górat)', es: 'ciudad grande', note: '-ой tónica.' },
      { en: 'русская музыка (rússkaya múzyka)', es: 'música rusa', note: 'fem. → русская.' },
      { en: 'Книга интересная. (Kníga interésnaya.)', es: 'El libro es interesante.', note: 'Uso predicativo, sin "ser".' },
    ],
    commonMistakes: [
      { wrong: 'новый машина', right: 'новая машина', note: 'машина es femenino → новая.' },
      { wrong: 'новая дом', right: 'новый дом', note: 'дом es masculino → новый.' },
      { wrong: 'новый окно', right: 'новое окно', note: 'окно es neutro → новое.' },
      { wrong: 'русые книги', right: 'русские книги', note: 'Tras с/к se usa -ие: русские.' },
      { wrong: 'usar el género del español', right: 'usar el género ruso del sustantivo', note: 'машина (coche) es femenino en ruso.' },
    ],
    tip: 'Empareja la terminación del adjetivo con el género del sustantivo ruso: -ый/-ой/-ий (masc.), -ая (fem.), -ое (neutro), -ые/-ие (plural). Y como no hay "ser", el mismo adjetivo dice "casa grande" y "la casa es grande".',
    questions: [
      { s: '"casa nueva" (дом, masc.) = ___ дом', opts: ['новый', 'новая', 'новое', 'новые'], a: 0, fb: 'дом masc. → новый.' },
      { s: '"coche nuevo" (машина, fem.) = ___ машина', opts: ['новая', 'новый', 'новое', 'новые'], a: 0, fb: 'машина fem. → новая.' },
      { s: '"ventana nueva" (окно, neutro) = ___ окно', opts: ['новое', 'новый', 'новая', 'новые'], a: 0, fb: 'окно neutro → новое.' },
      { s: '"libros nuevos" (книги, plural) = ___ книги', opts: ['новые', 'новый', 'новая', 'новое'], a: 0, fb: 'plural → новые.' },
      { s: 'El adjetivo masculino acaba en ___', opts: ['-ый/-ой/-ий', '-ая', '-ое', '-ые'], a: 0, fb: 'новый, большой, хороший.' },
      { s: '"música rusa" (музыка, fem.) = ___ музыка', opts: ['русская', 'русский', 'русское', 'русские'], a: 0, fb: 'fem. → русская.' },
      { s: '"La ciudad es bonita" = Город ___', opts: ['красивый', 'есть красивый', 'красивая', 'красиво быть'], a: 0, fb: 'Sin "ser": adjetivo masc. красивый.' },
      { s: 'El plural de русский es ___', opts: ['русские', 'русскые', 'русская', 'русское'], a: 0, fb: 'Tras к se escribe -ие: русские.' },
      { s: 'El adjetivo normalmente va ___ del sustantivo', opts: ['antes', 'después', 'al final de la frase', 'separado por coma'], a: 0, fb: 'большой дом ("grande casa").' },
      { s: '"ciudad grande" (город) = ___ город', opts: ['большой', 'большая', 'большое', 'большие'], a: 0, fb: 'город masc. → большой.' },
      { s: 'El adjetivo neutro acaba en ___', opts: ['-ое/-ее', '-ый', '-ая', '-ые'], a: 0, fb: 'новое окно, хорошее.' },
      { s: '¿Es correcto "новый машина"?', opts: ['No: новая машина', 'Sí', 'Solo informal', 'Solo predicativo'], a: 0, fb: 'машина es femenino → новая.' },
    ],
  },

  // ───────────────────────── 12. PASADO ─────────────────────────
  {
    slug: 'tiempo-pasado',
    order: 12,
    title: 'Прошедшее время — El pasado',
    shortTitle: 'Pasado (был/была)',
    icon: '⏪',
    seoTitle: 'El pasado en ruso: cómo formar -л/-ла/-ло/-ли (был, была)',
    seoDescription: 'El tiempo pasado ruso es muy fácil: se forma con -л/-ла/-ло/-ли según el GÉNERO del sujeto, no la persona. был/была/было, читал/читала. Ejercicios A1.',
    keywords: ['pasado ruso', 'был была', 'tiempo pasado ruso', 'читал читала', 'gramatica rusa A1'],
    intro: [
      'El pasado ruso es, paradójicamente, más fácil que el presente: no se conjuga por persona, sino por GÉNERO del sujeto. Se forma quitando -ть del infinitivo y añadiendo -л (masculino), -ла (femenino), -ло (neutro) o -ли (plural). читать → читал/читала/читало/читали.',
      'Esto significa que la misma forma sirve para yo/tú/él si son del mismo género: я читал, ты читал, он читал (todos masculinos). Una mujer diría я читала, ты читала, она читала. El plural читали vale para мы/вы/они sin distinción.',
      'Y por fin reaparece el verbo "ser": быть, que no existe en presente, sí tiene pasado: был (él era/estuvo), была (ella era), было (neutro), были (plural). Я был в Москве = "estuve en Moscú". Es la forma de hablar de estados pasados que en presente simplemente se omitían.',
    ],
    sections: [
      {
        heading: 'La regla -л / -ла / -ло / -ли',
        body: [
          'Quita -ть y añade según el sujeto: masculino -л (работал), femenino -ла (работала), neutro -ло (работало), plural -ли (работали). Lo que decide es el género/número del SUJETO, no la persona gramatical.',
          'Por eso "yo trabajé" depende de quién habla: un hombre dice я работал, una mujer я работала. "Nosotros trabajamos (pasado)" siempre es мы работали.',
        ],
      },
      {
        heading: 'El pasado de быть (ser/estar) y la negación',
        body: [
          'быть → был / была / было / были. Я был дома ("estuve en casa", hombre), Она была врачом ("ella era médica"), Это было интересно ("fue interesante"), Мы были друзьями ("éramos amigos").',
          'Para negar: не + verbo en pasado. Я не знал ("yo no sabía"), Её не было дома ("ella no estaba en casa" — nota: con нет en pasado se usa не было + genitivo). En A1 basta con не + был/была/работал…',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'El pasado: -л/-ла/-ло/-ли (читать = leer)',
        headers: ['Sujeto', 'Terminación', 'Forma', 'быть (ser)'],
        rows: [
          ['masculino (он, я♂, ты♂)', '-л', 'читал', 'был'],
          ['femenino (она, я♀, ты♀)', '-ла', 'читала', 'была'],
          ['neutro (оно)', '-ло', 'читало', 'было'],
          ['plural (мы, вы, они)', '-ли', 'читали', 'были'],
        ],
      },
    ],
    contrast: [
      { es: 'Yo trabajé (dice un hombre)', en: 'Я работал', note: 'Masculino → -л.' },
      { es: 'Yo trabajé (dice una mujer)', en: 'Я работала', note: 'Femenino → -ла.' },
      { es: 'Estuve en Moscú', en: 'Я был в Москве', note: 'быть → был (reaparece "ser/estar" en pasado).' },
      { es: 'Ella era médica', en: 'Она была врачом', note: 'была + instrumental para profesión pasada.' },
      { es: 'Nosotros leímos', en: 'Мы читали', note: 'plural → -ли.' },
    ],
    examples: [
      { en: 'Я читал книгу. (Ya chitál knígu.)', es: 'Leí un libro. (hombre)', note: 'masc. → читал.' },
      { en: 'Она работала. (Oná rabótala.)', es: 'Ella trabajaba.', note: 'fem. → работала.' },
      { en: 'Я был в Москве. (Ya byl v Maskvé.)', es: 'Estuve en Moscú.', note: 'быть → был.' },
      { en: 'Это было интересно. (Eta býla interésna.)', es: 'Fue interesante.', note: 'neutro → было.' },
      { en: 'Мы были дома. (My býli dóma.)', es: 'Estuvimos en casa.', note: 'plural → были.' },
      { en: 'Он не знал. (On ne znal.)', es: 'Él no sabía.', note: 'Negación: не + знал.' },
      { en: 'Вчера я гулял. (Vcherá ya gulyál.)', es: 'Ayer paseé.', note: 'вчера = ayer.' },
    ],
    commonMistakes: [
      { wrong: 'conjugar el pasado por persona (читаю→читалю)', right: 'el pasado va por género: читал/читала/читали', note: 'No hay terminaciones de persona en pasado.' },
      { wrong: 'una mujer dice "я работал"', right: 'я работала', note: 'El género del sujeto decide la terminación.' },
      { wrong: 'omitir быть en pasado (Я в Москве для "estuve")', right: 'Я был в Москве', note: 'En pasado SÍ se usa был/была.' },
      { wrong: 'мы был', right: 'мы были', note: 'Plural → -ли: были.' },
      { wrong: 'Это был интересно', right: 'Это было интересно', note: 'Predicado neutro → было.' },
    ],
    tip: 'El pasado no se conjuga por persona, sino por género del sujeto: -л (♂), -ла (♀), -ло (neutro), -ли (plural). Y recuerda que быть, ausente en presente, reaparece en pasado: был/была/было/были.',
    questions: [
      { s: '"Yo leí" (lo dice un hombre) = Я ___ — читать', opts: ['читал', 'читала', 'читало', 'читаю'], a: 0, fb: 'Masculino → -л: читал.' },
      { s: '"Yo leí" (lo dice una mujer) = Я ___', opts: ['читала', 'читал', 'читало', 'читали'], a: 0, fb: 'Femenino → -ла: читала.' },
      { s: '"Nosotros leímos" = Мы ___', opts: ['читали', 'читал', 'читала', 'читало'], a: 0, fb: 'Plural → -ли: читали.' },
      { s: 'El pasado ruso se forma según ___', opts: ['el género/número del sujeto', 'la persona (yo/tú/él)', 'el caso', 'la conjugación'], a: 0, fb: '-л/-ла/-ло/-ли por género.' },
      { s: '"Estuve en Moscú" (hombre) = Я ___ в Москве', opts: ['был', 'была', 'было', 'были'], a: 0, fb: 'быть → был.' },
      { s: '"Ella trabajaba" = Она ___ — работать', opts: ['работала', 'работал', 'работало', 'работали'], a: 0, fb: 'fem. → работала.' },
      { s: '"Fue interesante" = Это ___ интересно', opts: ['было', 'был', 'была', 'были'], a: 0, fb: 'Predicado neutro → было.' },
      { s: 'El verbo "ser" (быть) en pasado masculino es ___', opts: ['был', 'была', 'есть', 'буду'], a: 0, fb: 'был / была / было / были.' },
      { s: '"Estuvimos en casa" = Мы ___ дома', opts: ['были', 'был', 'была', 'было'], a: 0, fb: 'Plural → были.' },
      { s: 'La terminación del pasado femenino es ___', opts: ['-ла', '-л', '-ло', '-ли'], a: 0, fb: 'читала, работала, была.' },
      { s: '"Él no sabía" = Он не ___ — знать', opts: ['знал', 'знала', 'знаю', 'знает'], a: 0, fb: 'не + знал (masc.).' },
      { s: '¿Cómo dice "yo trabajé" una mujer?', opts: ['Я работала', 'Я работал', 'Я работаю', 'Я работать'], a: 0, fb: 'Femenino → работала.' },
    ],
  },

  // ───────────────────────── 13. FUTURO / MOVIMIENTO ─────────────────────────
  {
    slug: 'futuro-y-verbos-de-movimiento',
    order: 13,
    title: 'Futuro con быть y verbos de movimiento (идти/ехать)',
    shortTitle: 'Futuro · идти/ехать',
    icon: '🚶',
    seoTitle: 'El futuro en ruso (буду) y los verbos идти / ехать',
    seoDescription: 'Cómo formar el futuro imperfectivo ruso con буду + infinitivo, y la diferencia entre идти (ir a pie) y ехать (ir en transporte). Con ejemplos y ejercicios A1.',
    keywords: ['futuro ruso', 'буду ruso', 'идти ехать', 'verbos de movimiento ruso', 'gramatica rusa A1'],
    intro: [
      'Para hablar del futuro, el A1 usa el futuro imperfectivo: el verbo быть conjugado (буду, будешь, будет, будем, будете, будут) + el infinitivo del verbo. Я буду работать = "voy a trabajar / trabajaré". Es un futuro analítico, parecido a "ir a + infinitivo" del español.',
      'быть, que se omitía en presente y reaparecía en pasado, aquí presta su conjugación al futuro: я буду, ты будешь, он будет, мы будем, вы будете, они будут. Y solo, sin infinitivo, significa "estaré/habrá": Я буду дома ("estaré en casa").',
      'El otro punto del tema son los verbos de movimiento, donde el ruso distingue lo que el español junta en "ir": идти es ir A PIE y ехать es ir EN TRANSPORTE (coche, metro, tren). Я иду в школу (voy a la escuela caminando) vs Я еду в Москву (voy a Moscú en transporte). Elegir mal suena raro a un ruso.',
    ],
    sections: [
      {
        heading: 'El futuro: буду + infinitivo',
        body: [
          'Conjuga быть en futuro y añade el infinitivo imperfectivo: Я буду читать (leeré), Ты будешь работать (trabajarás), Мы будем жить в Москве (viviremos en Moscú). быть se conjuga como un verbo normal (буду/будешь/будет/будем/будете/будут).',
          'быть solo (sin infinitivo) = "estar/haber" en futuro: Завтра я буду дома ("mañana estaré en casa"), Там будет вода ("ahí habrá agua").',
        ],
      },
      {
        heading: 'идти (a pie) vs ехать (en transporte)',
        body: [
          'идти = desplazarse a pie: Я иду домой (voy a casa caminando), Куда ты идёшь? (¿a dónde vas, a pie?). ехать = desplazarse en vehículo: Я еду на работу (voy al trabajo en transporte), Мы едем в Москву (vamos a Moscú).',
          'Ambos son verbos de movimiento "unidireccionales" (un viaje concreto, ahora). El destino va en acusativo con в/на (в школу, на работу), igual que con "куда". No confundas идти con ехать: a pie vs en vehículo es una distinción obligatoria en ruso.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Futuro con быть + идти / ехать',
        headers: ['Persona', 'быть (futuro)', 'идти (a pie)', 'ехать (en transp.)'],
        rows: [
          ['я', 'буду', 'иду', 'еду'],
          ['ты', 'будешь', 'идёшь', 'едешь'],
          ['он / она', 'будет', 'идёт', 'едет'],
          ['мы', 'будем', 'идём', 'едем'],
          ['они', 'будут', 'идут', 'едут'],
        ],
      },
    ],
    contrast: [
      { es: 'Trabajaré / voy a trabajar', en: 'Я буду работать', note: 'буду + infinitivo.' },
      { es: 'Mañana estaré en casa', en: 'Завтра я буду дома', note: 'быть solo = "estar" en futuro.' },
      { es: 'Voy a la escuela (a pie)', en: 'Я иду в школу', note: 'идти = a pie.' },
      { es: 'Voy a Moscú (en tren/avión)', en: 'Я еду в Москву', note: 'ехать = en transporte.' },
      { es: 'Viviremos en Rusia', en: 'Мы будем жить в России', note: 'будем + жить.' },
    ],
    examples: [
      { en: 'Я буду читать. (Ya búdu chitát\'.)', es: 'Leeré.', note: 'буду + читать.' },
      { en: 'Ты будешь дома? (Ty búdesh dóma?)', es: '¿Estarás en casa?', note: 'быть solo.' },
      { en: 'Я иду домой. (Ya idú damóy.)', es: 'Voy a casa (a pie).', note: 'идти → иду.' },
      { en: 'Мы едем в Москву. (My yédem v Maskvú.)', es: 'Vamos a Moscú (en transporte).', note: 'ехать → едем; в Москву (acus.).' },
      { en: 'Завтра будет дождь. (Závtra búdet dozhd\'.)', es: 'Mañana lloverá (habrá lluvia).', note: 'будет + sustantivo.' },
      { en: 'Куда ты идёшь? (Kudá ty idyósh?)', es: '¿A dónde vas (a pie)?', note: 'идти → идёшь.' },
      { en: 'Я еду на работу. (Ya yédu na rabótu.)', es: 'Voy al trabajo (en transporte).', note: 'ехать → еду.' },
    ],
    commonMistakes: [
      { wrong: 'Я работаю завтра (para futuro)', right: 'Я буду работать завтра', note: 'Para futuro: буду + infinitivo.' },
      { wrong: 'Я иду в Москву (en avión)', right: 'Я еду в Москву', note: 'Distancias/vehículo → ехать.' },
      { wrong: 'Я еду домой (caminando)', right: 'Я иду домой', note: 'A pie → идти.' },
      { wrong: 'Я буду читаю', right: 'Я буду читать', note: 'буду va con INFINITIVO, no con presente conjugado.' },
      { wrong: 'я буду + идти/ехать como único futuro', right: 'иду/еду ya pueden expresar plan cercano', note: 'Los verbos de movimiento usan a menudo el presente para el futuro próximo.' },
    ],
    tip: 'Futuro fácil: conjuga буду/будешь/будет… + infinitivo. Y para "ir", decide cómo: a pie → идти (иду), en vehículo → ехать (еду). El destino va en acusativo con в/на.',
    questions: [
      { s: '"Leeré / voy a leer" = Я ___ читать', opts: ['буду', 'был', 'есть', 'иду'], a: 0, fb: 'Futuro: буду + infinitivo.' },
      { s: '"Voy a la escuela (a pie)" = Я ___ в школу', opts: ['иду', 'еду', 'буду', 'был'], a: 0, fb: 'A pie → идти: иду.' },
      { s: '"Voy a Moscú (en tren)" = Я ___ в Москву', opts: ['еду', 'иду', 'буду', 'был'], a: 0, fb: 'En transporte → ехать: еду.' },
      { s: 'El futuro imperfectivo se forma con быть + ___', opts: ['infinitivo', 'presente conjugado', 'pasado', 'sustantivo'], a: 0, fb: 'буду читать, будешь работать.' },
      { s: '"¿Estarás en casa?" = Ты ___ дома?', opts: ['будешь', 'был', 'есть', 'едешь'], a: 0, fb: 'быть en futuro, 2ª persona: будешь.' },
      { s: 'идти se usa para desplazarse ___', opts: ['a pie', 'en transporte', 'en avión solo', 'largas distancias'], a: 0, fb: 'идти = caminando.' },
      { s: 'ехать se usa para desplazarse ___', opts: ['en vehículo', 'a pie', 'sin moverse', 'volando solo'], a: 0, fb: 'ехать = en transporte.' },
      { s: '"Vamos a Moscú (en transporte)" = Мы ___ в Москву', opts: ['едем', 'идём', 'будем', 'были'], a: 0, fb: 'ехать → едем.' },
      { s: '"Mañana lloverá" = Завтра ___ дождь', opts: ['будет', 'был', 'есть', 'идёт'], a: 0, fb: 'быть en futuro 3ª: будет.' },
      { s: '¿Es correcto "Я буду читаю"?', opts: ['No: Я буду читать (infinitivo)', 'Sí', 'Solo informal', 'Solo escrito'], a: 0, fb: 'буду + infinitivo: читать.' },
      { s: '"¿A dónde vas (a pie)?" = Куда ты ___?', opts: ['идёшь', 'едешь', 'будешь', 'был'], a: 0, fb: 'идти → идёшь.' },
      { s: 'El destino con идти/ехать va en caso ___', opts: ['acusativo (в школу)', 'preposicional (в школе)', 'genitivo', 'dativo'], a: 0, fb: 'куда → acusativo: в школу, на работу.' },
    ],
  },

  // ───────────────────────── 14. NEGACIÓN ─────────────────────────
  {
    slug: 'negacion-ne-net',
    order: 14,
    title: 'La negación: не y нет',
    shortTitle: 'Negación (не / нет)',
    icon: '🚫',
    seoTitle: 'La negación en ruso: diferencia entre не y нет',
    seoDescription: 'Cómo negar en ruso: не (no + verbo/palabra) frente a нет (no hay / no, como respuesta). La negación con genitivo y la doble negación. Ejemplos y ejercicios A1.',
    keywords: ['negacion rusa', 'не нет', 'diferencia не нет', 'no en ruso', 'doble negacion ruso A1'],
    intro: [
      'El ruso tiene dos palabras que el español confunde en una sola "no": не y нет. La regla básica es clara: не niega la palabra que va justo después (un verbo, un adjetivo, un sustantivo); нет significa "no hay / no existe" o es la respuesta "no" a una pregunta.',
      'не se coloca delante de lo que niega: Я не знаю ("no sé"), Это не мой дом ("esta no es mi casa"), Он не русский ("él no es ruso"). Es la negación más frecuente y la que necesitas para casi todo.',
      'нет tiene dos vidas: como respuesta ("¿Tienes tiempo? — Нет" = "No") y como verbo de inexistencia, que exige genitivo: У меня нет времени ("no tengo tiempo"), Здесь нет воды ("aquí no hay agua"). Recuerda también que el ruso usa doble negación: Я ничего не знаю ("no sé nada", literalmente "no sé nada no").',
    ],
    sections: [
      {
        heading: 'не: negar la palabra siguiente',
        body: [
          'Pon не justo delante de lo que niegas: не знаю (no sé), не хочу (no quiero), не здесь (no aquí), не я (no yo). Cambiar la posición de не cambia el foco: Я не читаю книгу ("no leo el libro") vs Я читаю не книгу ("leo, pero no el libro").',
          'не también niega adjetivos y la cópula ausente: Это не правда ("eso no es verdad"), Он не врач ("él no es médico").',
        ],
      },
      {
        heading: 'нет y la doble negación',
        body: [
          'нет = "no hay / no está", siempre con genitivo: У меня нет машины, В городе нет метро, Его нет дома ("él no está en casa"). En pasado se vuelve не было + genitivo (Меня не было дома) y en futuro не будет + genitivo.',
          'La doble (o múltiple) negación es OBLIGATORIA en ruso: con palabras como ничего (nada), никто (nadie), никогда (nunca), нигде (en ningún sitio) se usa SIEMPRE не en el verbo: Я никогда не курю ("nunca fumo"), Никто не знает ("nadie sabe"). Para un hispanohablante esto es natural ("no sé nada"), pero conviene tenerlo presente.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'не vs нет',
        headers: ['Palabra', 'Función', 'Ejemplo', 'Significado'],
        rows: [
          ['не', 'niega la palabra siguiente', 'Я не знаю', 'no sé'],
          ['не', 'niega cópula/adjetivo', 'Он не русский', 'no es ruso'],
          ['нет', 'respuesta "no"', '— Нет.', '— No.'],
          ['нет + genitivo', 'no hay / no tener', 'у меня нет времени', 'no tengo tiempo'],
        ],
      },
    ],
    contrast: [
      { es: 'No sé', en: 'Я не знаю', note: 'не niega el verbo siguiente.' },
      { es: 'No (respuesta)', en: 'Нет', note: 'нет como respuesta a una pregunta.' },
      { es: 'No tengo tiempo', en: 'У меня нет времени', note: 'нет + genitivo: времени.' },
      { es: 'Él no está en casa', en: 'Его нет дома', note: 'нет de inexistencia + genitivo его.' },
      { es: 'Nunca fumo', en: 'Я никогда не курю', note: 'Doble negación obligatoria: никогда + не.' },
    ],
    examples: [
      { en: 'Я не знаю. (Ya ne znáyu.)', es: 'No sé.', note: 'не + verbo.' },
      { en: 'Это не мой дом. (Eta ne moy dom.)', es: 'Esta no es mi casa.', note: 'не + sustantivo.' },
      { en: 'У меня нет машины. (U menyá nyet mashíny.)', es: 'No tengo coche.', note: 'нет + genitivo.' },
      { en: 'Его нет дома. (Yevó nyet dóma.)', es: 'Él no está en casa.', note: 'нет + его (genitivo).' },
      { en: 'Я ничего не понимаю. (Ya nichevó ne panimáyu.)', es: 'No entiendo nada.', note: 'Doble negación: ничего + не.' },
      { en: 'Никто не знает. (Niktó ne znáyet.)', es: 'Nadie sabe.', note: 'никто + не.' },
      { en: '— Ты студент? — Нет. (Ty student? Nyet.)', es: '— ¿Eres estudiante? — No.', note: 'нет como respuesta.' },
    ],
    commonMistakes: [
      { wrong: 'usar нет para negar un verbo (Я нет знаю)', right: 'Я не знаю', note: 'Para negar un verbo se usa не, no нет.' },
      { wrong: 'У меня не машины', right: 'У меня нет машины', note: '"No tener" usa нет + genitivo.' },
      { wrong: 'У меня нет машина', right: 'У меня нет машины', note: 'Tras нет, genitivo.' },
      { wrong: 'Я никогда курю (sin не)', right: 'Я никогда не курю', note: 'La doble negación es obligatoria.' },
      { wrong: 'responder "не" a una pregunta sí/no', right: 'Нет', note: 'La respuesta "no" es нет, no не.' },
    ],
    tip: 'Regla rápida: para negar una palabra (verbo, adjetivo…) usa не delante; para "no hay/no tengo" usa нет + genitivo; para responder "no" usa нет. Y con никогда/ничего/никто, no olvides el не en el verbo.',
    questions: [
      { s: '"No sé" = Я ___ знаю', opts: ['не', 'нет', 'ни', 'без'], a: 0, fb: 'Para negar el verbo → не.' },
      { s: '"No tengo coche" = У меня ___ машины', opts: ['нет', 'не', 'ни', 'без'], a: 0, fb: '"No tener" → нет + genitivo.' },
      { s: '"— ¿Eres estudiante? — No." La respuesta "no" es ___', opts: ['Нет', 'Не', 'Ни', 'Никак'], a: 0, fb: 'Respuesta sí/no → нет.' },
      { s: '"Él no está en casa" = Его ___ дома', opts: ['нет', 'не', 'ни', 'без'], a: 0, fb: 'Inexistencia → нет + genitivo (его).' },
      { s: '"No entiendo nada" = Я ничего ___ понимаю', opts: ['не', 'нет', 'ни', 'без'], a: 0, fb: 'Doble negación: ничего + не.' },
      { s: 'не se coloca ___ de la palabra que niega', opts: ['delante', 'detrás', 'al final de la frase', 'separado por coma'], a: 0, fb: 'Я не знаю, не мой дом.' },
      { s: 'Tras нет (de inexistencia), el sustantivo va en ___', opts: ['genitivo', 'nominativo', 'acusativo', 'preposicional'], a: 0, fb: 'нет времени, нет воды.' },
      { s: '"Nadie sabe" = Никто ___ знает', opts: ['не', 'нет', 'ни', 'без'], a: 0, fb: 'Doble negación obligatoria: никто + не.' },
      { s: '"Esta no es mi casa" = Это ___ мой дом', opts: ['не', 'нет', 'ни', 'без'], a: 0, fb: 'не niega la cópula/sustantivo.' },
      { s: '¿Es correcto "Я нет знаю"?', opts: ['No: Я не знаю', 'Sí', 'Solo informal', 'Solo escrito'], a: 0, fb: 'Para negar un verbo → не.' },
      { s: '"Nunca fumo" = Я никогда ___ курю', opts: ['не', 'нет', 'ни', 'без'], a: 0, fb: 'никогда exige не en el verbo.' },
      { s: '"No hay leche" = ___ молока', opts: ['Нет', 'Не', 'Ни', 'Без'], a: 0, fb: 'Inexistencia → нет + genitivo.' },
    ],
  },

  // ───────────────────────── 15. PREGUNTAS ─────────────────────────
  {
    slug: 'palabras-interrogativas',
    order: 15,
    title: 'Вопросы — Las palabras interrogativas',
    shortTitle: 'Preguntar (кто, что…)',
    icon: '❓',
    seoTitle: 'Palabras interrogativas en ruso: кто, что, где, когда, почему',
    seoDescription: 'Aprende a preguntar en ruso con кто (quién), что (qué), где (dónde), куда (a dónde), когда (cuándo), почему (por qué), как (cómo), сколько (cuánto). Ejercicios A1.',
    keywords: ['palabras interrogativas ruso', 'кто что где', 'preguntar en ruso', 'como cuando donde ruso', 'preguntas rusas A1'],
    intro: [
      'Preguntar en ruso es sorprendentemente directo: las preguntas de sí/no no cambian el orden de las palabras, solo la entonación (Ты студент? = "¿eres estudiante?"). Y las preguntas con interrogativa colocan la palabra interrogativa al principio, sin inversión ni verbos auxiliares.',
      'Las interrogativas básicas: кто (quién), что (qué), где (dónde), куда (a dónde), когда (cuándo), почему (por qué), как (cómo), сколько (cuánto), какой (qué/cuál, con género), чей (de quién). Cubren prácticamente todas las preguntas del A1.',
      'Dos pares conviene distinguir: где (¿dónde estás?, ubicación) vs куда (¿a dónde vas?, destino) — el mismo contraste preposicional/acusativo que ya viste; y кто/что, que además se declinan por casos (кого = "a quién", у кого = "de quién/quién tiene"). Para empezar basta con reconocerlas en nominativo.',
    ],
    sections: [
      {
        heading: 'Las interrogativas y cómo se usan',
        body: [
          'кто (quién): Кто это? (¿quién es?). что (qué): Что это? (¿qué es esto?), Что ты делаешь? (¿qué haces?). где (dónde): Где ты? (¿dónde estás?). куда (a dónde): Куда ты идёшь? (¿a dónde vas?). когда (cuándo): Когда ты придёшь? (¿cuándo vendrás?).',
          'почему (por qué): Почему ты не работаешь? (¿por qué no trabajas?). как (cómo): Как дела? (¿qué tal?), Как тебя зовут? (¿cómo te llamas?). сколько (cuánto): Сколько это стоит? (¿cuánto cuesta?), Сколько тебе лет? (¿cuántos años tienes?).',
        ],
      },
      {
        heading: 'какой y чей (concuerdan con el género)',
        body: [
          'какой (qué/cuál) concuerda como un adjetivo: какой (masc.), какая (fem.), какое (neutro), какие (plural). Какой это город? (¿qué ciudad es?), Какая сегодня погода? (¿qué tiempo hace hoy?).',
          'чей (de quién) también concuerda: чей (masc.), чья (fem.), чьё (neutro), чьи (plural). Чей это дом? (¿de quién es esta casa?), Чья это книга? (¿de quién es este libro?).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Palabras interrogativas',
        headers: ['Interrogativa', 'Significado', 'Ejemplo', 'Traducción'],
        rows: [
          ['кто / что', 'quién / qué', 'Кто это? / Что это?', '¿quién es? / ¿qué es?'],
          ['где / куда', 'dónde / a dónde', 'Где ты? / Куда ты идёшь?', '¿dónde estás? / ¿a dónde vas?'],
          ['когда / почему', 'cuándo / por qué', 'Когда? / Почему?', '¿cuándo? / ¿por qué?'],
          ['как / сколько', 'cómo / cuánto', 'Как дела? / Сколько стоит?', '¿qué tal? / ¿cuánto cuesta?'],
          ['какой / чей', 'qué/cuál / de quién', 'Какой? / Чей?', '(concuerdan por género)'],
        ],
      },
    ],
    contrast: [
      { es: '¿Quién es?', en: 'Кто это?', note: 'кто = quién.' },
      { es: '¿Dónde estás? (ubicación)', en: 'Где ты?', note: 'где → preposicional.' },
      { es: '¿A dónde vas? (destino)', en: 'Куда ты идёшь?', note: 'куда → acusativo. ¡Distinto de где!' },
      { es: '¿Cómo te llamas?', en: 'Как тебя зовут?', note: 'Literalmente "¿cómo te llaman?".' },
      { es: '¿De quién es esta casa?', en: 'Чей это дом?', note: 'чей concuerda con дом (masc.).' },
    ],
    examples: [
      { en: 'Кто это? (Kto eta?)', es: '¿Quién es?', note: 'кто + это.' },
      { en: 'Что ты делаешь? (Chto ty délayesh?)', es: '¿Qué haces?', note: 'что = qué.' },
      { en: 'Где ты живёшь? (Gde ty zhivyósh?)', es: '¿Dónde vives?', note: 'где = ubicación.' },
      { en: 'Куда ты идёшь? (Kudá ty idyósh?)', es: '¿A dónde vas?', note: 'куда = destino.' },
      { en: 'Сколько это стоит? (Skól\'ka eta stóit?)', es: '¿Cuánto cuesta?', note: 'сколько = cuánto.' },
      { en: 'Как тебя зовут? (Kak tebyá zavút?)', es: '¿Cómo te llamas?', note: 'как = cómo.' },
      { en: 'Почему ты не дома? (Pachemú ty ne dóma?)', es: '¿Por qué no estás en casa?', note: 'почему = por qué.' },
    ],
    commonMistakes: [
      { wrong: 'usar где para preguntar destino (Где ты идёшь?)', right: 'Куда ты идёшь?', note: 'Destino → куда; ubicación → где.' },
      { wrong: 'invertir el orden como en español', right: 'la interrogativa va al inicio, sin inversión', note: 'Что ты делаешь? (no "делаешь ты что").' },
      { wrong: 'какой это книга', right: 'какая это книга', note: 'какой concuerda: книга fem. → какая.' },
      { wrong: 'usar как para "cuánto"', right: 'сколько', note: 'как = cómo; сколько = cuánto.' },
      { wrong: 'añadir un verbo auxiliar ("do") para preguntar', right: 'no existe auxiliar; solo entonación o interrogativa', note: 'Ты студент? = ¿eres estudiante?' },
    ],
    tip: 'Memoriza el set кто/что/где/куда/когда/почему/как/сколько y dos pares: где (¿dónde?) vs куда (¿a dónde?), y какой/чей que concuerdan por género. Para sí/no, no inviertas: solo sube la entonación.',
    questions: [
      { s: '"¿Quién es?" = ___ это?', opts: ['Кто', 'Что', 'Где', 'Как'], a: 0, fb: 'кто = quién.' },
      { s: '"¿Qué haces?" = ___ ты делаешь?', opts: ['Что', 'Кто', 'Как', 'Где'], a: 0, fb: 'что = qué.' },
      { s: '"¿Dónde vives?" (ubicación) = ___ ты живёшь?', opts: ['Где', 'Куда', 'Когда', 'Почему'], a: 0, fb: 'где = ubicación.' },
      { s: '"¿A dónde vas?" (destino) = ___ ты идёшь?', opts: ['Куда', 'Где', 'Когда', 'Кто'], a: 0, fb: 'куда = destino.' },
      { s: '"¿Cuánto cuesta?" = ___ это стоит?', opts: ['Сколько', 'Как', 'Что', 'Какой'], a: 0, fb: 'сколько = cuánto.' },
      { s: '"¿Por qué?" = ___', opts: ['Почему', 'Когда', 'Как', 'Где'], a: 0, fb: 'почему = por qué.' },
      { s: '"¿Cómo te llamas?" = ___ тебя зовут?', opts: ['Как', 'Что', 'Кто', 'Сколько'], a: 0, fb: 'как = cómo.' },
      { s: 'Para preguntas de sí/no, el ruso ___', opts: ['solo cambia la entonación', 'invierte el orden', 'añade un auxiliar', 'usa нет al inicio'], a: 0, fb: 'Ты студент? — solo entonación.' },
      { s: '"¿De quién es esta casa?" (дом, masc.) = ___ это дом?', opts: ['Чей', 'Чья', 'Чьё', 'Чьи'], a: 0, fb: 'чей concuerda: дом masc. → чей.' },
      { s: '"¿Cuándo?" = ___', opts: ['Когда', 'Куда', 'Где', 'Кто'], a: 0, fb: 'когда = cuándo.' },
      { s: '"¿Qué tiempo hace hoy?" (погода, fem.) = ___ сегодня погода?', opts: ['Какая', 'Какой', 'Какое', 'Какие'], a: 0, fb: 'какой concuerda: погода fem. → какая.' },
      { s: '¿Es correcto "Где ты идёшь?" para "¿a dónde vas?"', opts: ['No: Куда ты идёшь?', 'Sí', 'Solo informal', 'Solo escrito'], a: 0, fb: 'Destino → куда.' },
    ],
  },
];

export function getTopic(slug: string) {
  return findTopic(TOPICS, slug);
}

export function getTopicNav(slug: string) {
  return topicNav(TOPICS, slug);
}
