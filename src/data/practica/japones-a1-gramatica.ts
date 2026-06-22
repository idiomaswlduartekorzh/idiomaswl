// Currículo de gramática profunda — Japonés A1 (初級, nivel JLPT N5).
// 15 temas indexables con explicación SEO + tablas + contraste español→japonés
// + ejemplos + errores comunes + ejercicios. Romaji en TODO (hispanohablante desde cero).
import type { GrammarTopic } from './grammar-types';
import { findTopic, topicNav } from './grammar-types';

export { GRAMMAR_COLOR } from './grammar-types';
export type { GQItem, GrammarTopic } from './grammar-types';

export const TOPICS: GrammarTopic[] = [
  // ───────────────────────── 1. KANA ─────────────────────────
  {
    slug: 'hiragana-katakana',
    order: 1,
    title: 'ひらがな・カタカナ — Los silabarios japoneses',
    shortTitle: 'Kana (ひらがな)',
    icon: '🈂️',
    seoTitle: 'Hiragana y Katakana: cómo leer los silabarios japoneses',
    seoDescription: 'Aprende a leer japonés desde cero: hiragana (palabras japonesas) y katakana (préstamos), cómo funcionan las sílabas y los tres sistemas de escritura. Con romaji y ejercicios.',
    keywords: ['hiragana', 'katakana', 'aprender a leer japones', 'silabarios japoneses', 'escritura japonesa', 'kana'],
    intro: [
      'El japonés se escribe combinando tres sistemas: hiragana (ひらがな), katakana (カタカナ) y kanji (漢字). Para empezar a leer, lo esencial son los dos primeros, los "kana", que son silabarios: cada signo representa una sílaba completa, no un sonido suelto. か = "ka", さ = "sa", と = "to".',
      'Hiragana (46 signos básicos) se usa para las palabras y la gramática japonesas: partículas, terminaciones verbales, palabras nativas. Katakana (otros 46, con los mismos sonidos) se reserva para los préstamos extranjeros y los nombres no japoneses: コーヒー (kōhī, café), テレビ (terebi, televisión), マリア (Maria).',
      'La buena noticia para un hispanohablante: los sonidos del japonés son casi idénticos a los del español (a, i, u, e, o; ka, ki, ku…), así que pronunciar es fácil. El reto es solo visual: memorizar las formas. En WeLearn empezamos por aquí, porque sin kana el vocabulario se queda a medias.',
    ],
    sections: [
      {
        heading: 'La estructura silábica (las 5 vocales)',
        body: [
          'Todo parte de 5 vocales: あ(a) い(i) う(u) え(e) お(o). A partir de ahí, cada consonante se combina con ellas en filas: か(ka) き(ki) く(ku) け(ke) こ(ko); さ(sa) し(shi) す(su) せ(se) そ(so); た(ta) ち(chi) つ(tsu) て(te) と(to)… Casi todas las sílabas son consonante + vocal.',
          'Hay marcas que modifican el sonido: el dakuten (゛) convierte sordas en sonoras (か ka → が ga, さ sa → ざ za, た ta → だ da), y el handakuten (゜) hace は ha → ぱ pa. Y las sílabas pequeñas ゃゅょ forman sonidos como きゃ (kya), しゅ (shu), ちょ (cho).',
        ],
      },
      {
        heading: 'Hiragana vs Katakana vs Kanji',
        body: [
          'Hiragana: palabras japonesas y gramática (わたし watashi "yo", です desu "ser", を partícula). Katakana: préstamos y onomatopeyas (パン pan, コンビニ konbini, アメリカ Amerika). Kanji: caracteres de origen chino con significado (日 día/sol, 本 libro/origen, 人 persona); cada uno se lee de varias formas y se aprenden poco a poco.',
          'En un texto real conviven los tres: 私はコーヒーを飲みます ("yo bebo café") mezcla kanji (私, 飲), hiragana (は, を, みます) y katakana (コーヒー). Para A1 nos apoyamos en hiragana/katakana y el romaji, e introducimos kanji muy básicos.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Las primeras filas de hiragana',
        headers: ['Vocal/Fila', 'a', 'i', 'u', 'e', 'o'],
        rows: [
          ['(vocales)', 'あ a', 'い i', 'う u', 'え e', 'お o'],
          ['k', 'か ka', 'き ki', 'く ku', 'け ke', 'こ ko'],
          ['s', 'さ sa', 'し shi', 'す su', 'せ se', 'そ so'],
          ['t', 'た ta', 'ち chi', 'つ tsu', 'て te', 'と to'],
          ['n', 'な na', 'に ni', 'ぬ nu', 'ね ne', 'の no'],
        ],
      },
      {
        caption: 'Sonidos modificados (dakuten)',
        headers: ['Base', '+ dakuten ゛', 'Ejemplo'],
        rows: [
          ['か ka', 'が ga', 'にほんご (nihongo)'],
          ['さ sa', 'ざ za', 'ざっし (zasshi)'],
          ['た ta', 'だ da', 'だいがく (daigaku)'],
          ['は ha', 'ば ba / ぱ pa', 'ばん / ぱん'],
        ],
      },
    ],
    contrast: [
      { es: 'La "a" de "casa"', en: 'あ (a)', note: 'Las vocales japonesas suenan como en español: ventaja enorme.' },
      { es: 'Café (préstamo)', en: 'コーヒー (kōhī)', note: 'Los préstamos van en katakana, no en hiragana.' },
      { es: 'Yo', en: 'わたし (watashi)', note: 'Palabra japonesa → hiragana (o el kanji 私).' },
      { es: 'No existe el sonido "l"', en: 'ら り る れ ろ (ra ri ru re ro)', note: 'El japonés solo tiene "r" suave; "Maria" se escribe マリア.' },
      { es: 'La "ñ" no existe; sí la "n" final', en: 'ん (n)', note: 'ん es la única consonante que va sola al final de sílaba.' },
    ],
    examples: [
      { en: 'あ (a)', es: 'la vocal a', note: 'Igual que el español.' },
      { en: 'か (ka)', es: 'sílaba ka', note: 'Consonante + vocal.' },
      { en: 'にほん (nihon)', es: 'Japón', note: 'に + ほん, todo hiragana.' },
      { en: 'コーヒー (kōhī)', es: 'café', note: 'Katakana (préstamo); ー alarga la vocal.' },
      { en: 'がっこう (gakkō)', es: 'escuela', note: 'が con dakuten; っ pequeña = doble consonante.' },
      { en: 'テレビ (terebi)', es: 'televisión', note: 'Katakana.' },
      { en: 'わたし (watashi)', es: 'yo', note: 'Hiragana; し = "shi".' },
    ],
    commonMistakes: [
      { wrong: 'leer し como "si"', right: 'し = "shi"', note: 'En la fila さ, し es irregular: "shi", no "si".' },
      { wrong: 'leer つ como "tu"', right: 'つ = "tsu"', note: 'Y ち = "chi", no "ti".' },
      { wrong: 'escribir préstamos en hiragana', right: 'préstamos → katakana', note: 'コーヒー, no こーひー.' },
      { wrong: 'pronunciar una "l"', right: 'usar la fila ら (r suave)', note: 'No hay "l" en japonés.' },
      { wrong: 'ignorar la っ pequeña', right: 'っ duplica la consonante siguiente', note: 'がっこう = "gak-kō".' },
    ],
    tip: 'Empieza por las 5 vocales y la fila か, y lee en voz alta cada día. Recuerda los tres "tramposos": し=shi, ち=chi, つ=tsu. Y separa mentalmente: japonés→hiragana, extranjero→katakana.',
    questions: [
      { s: 'か se lee ___', opts: ['ka', 'ki', 'ku', 'ke'], a: 0, fb: 'か = "ka".' },
      { s: 'し se lee ___', opts: ['shi', 'si', 'chi', 'su'], a: 0, fb: 'し es irregular: "shi", no "si".' },
      { s: 'つ se lee ___', opts: ['tsu', 'tu', 'chi', 'su'], a: 0, fb: 'つ = "tsu".' },
      { s: 'Los préstamos extranjeros (café, televisión) se escriben en ___', opts: ['katakana', 'hiragana', 'kanji', 'romaji'], a: 0, fb: 'Katakana: コーヒー, テレビ.' },
      { s: 'La gramática y las palabras japonesas usan ___', opts: ['hiragana', 'katakana', 'solo kanji', 'romaji'], a: 0, fb: 'Hiragana: は, です, わたし.' },
      { s: 'El dakuten (゛) convierte か (ka) en ___', opts: ['が (ga)', 'ぱ (pa)', 'きゃ (kya)', 'か (ka) larga'], a: 0, fb: 'か → が con dakuten.' },
      { s: '¿Cuántas vocales básicas tiene el japonés?', opts: ['5', '3', '8', '10'], a: 0, fb: 'あいうえお (a, i, u, e, o), como el español.' },
      { s: '"café" en japonés se escribe ___', opts: ['コーヒー', 'こうひい', '珈琲だけ', 'cafe'], a: 0, fb: 'Préstamo → katakana: コーヒー.' },
      { s: 'El japonés NO tiene el sonido ___', opts: ['l', 'k', 's', 'r'], a: 0, fb: 'No hay "l"; solo "r" suave (ら り る れ ろ).' },
      { s: 'La っ pequeña (como en がっこう) indica ___', opts: ['doble consonante', 'una pausa larga', 'una vocal extra', 'nada'], a: 0, fb: 'がっこう = "gak-kō".' },
      { s: 'と se lee ___', opts: ['to', 'ta', 'te', 'no'], a: 0, fb: 'と = "to".' },
      { s: 'ち se lee ___', opts: ['chi', 'ti', 'shi', 'tsu'], a: 0, fb: 'ち = "chi", no "ti".' },
    ],
  },

  // ───────────────────────── 2. ～は～です ─────────────────────────
  {
    slug: 'wa-desu-copula',
    order: 2,
    title: '～は～です — "X es Y" (tema + cópula)',
    shortTitle: 'は…です (ser)',
    icon: '🟰',
    seoTitle: 'La estructura は...です en japonés: cómo decir "ser"',
    seoDescription: 'La frase básica del japonés: AはBです ("A es B"). Cómo funciona la partícula de tema は (wa) y la cópula です (desu), con preguntas (か) y ejercicios A1.',
    keywords: ['は です', 'wa desu', 'ser en japones', 'copula japonesa', 'gramatica japonesa N5', 'watashi wa'],
    intro: [
      'La primera estructura del japonés es AはBです: "A es B". わたしは がくせいです = "yo soy estudiante". Tiene dos piezas clave: la partícula は (que aquí se pronuncia "wa", no "ha") marca el TEMA de la frase ("en cuanto a…"), y です (desu) es la cópula, el "ser/es" cortés que cierra la oración.',
      'El orden japonés es distinto del español: el verbo va SIEMPRE al final. Donde el español dice "yo SOY estudiante", el japonés dice "yo estudiante SOY": わたしは がくせいです. です es invariable: no cambia por persona ni número (がくせいです vale para "soy/eres/es estudiante").',
      'Para preguntar, basta con añadir か al final: わたしは がくせいです → あなたは がくせいですか ("¿eres estudiante?"). No se invierte nada ni se añaden verbos auxiliares: です + か y entonación. Esta estructura, más です, es la base de tus primeras conversaciones.',
    ],
    sections: [
      {
        heading: 'は se pronuncia "wa"',
        body: [
          'Cuando は funciona como partícula de tema, se lee "wa" aunque se escriba con el signo de "ha". わたしは = "watashi WA". Es una de las primeras rarezas que hay que memorizar: la は temática suena "wa".',
          'は presenta el tema, lo que en español sería "en cuanto a / hablando de": わたしは… = "en cuanto a mí…". Por eso AはBです se entiende como "(hablando de A), es B".',
        ],
      },
      {
        heading: 'Preguntas con か y negación con じゃありません',
        body: [
          'Pregunta: frase + か. がくせいですか (¿es estudiante?), にほんじんですか (¿es japonés?). En japonés no hace falta signo de interrogación; la か ya lo marca (aunque a menudo se escribe ？).',
          'Negación de です: じゃありません (o la más formal ではありません). わたしは せんせいじゃありません = "no soy profesor". La verás en detalle en el tema de la negación; por ahora basta reconocer que "no es" = じゃありません.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'La estructura AはBです',
        headers: ['Frase', 'Romaji', 'Significado'],
        rows: [
          ['わたしは がくせいです', 'watashi wa gakusei desu', 'soy estudiante'],
          ['たなかさんは せんせいです', 'Tanaka-san wa sensei desu', 'el Sr. Tanaka es profesor'],
          ['これは ほんです', 'kore wa hon desu', 'esto es un libro'],
          ['あなたは にほんじんですか', 'anata wa nihonjin desu ka', '¿eres japonés?'],
        ],
      },
    ],
    contrast: [
      { es: 'Yo soy estudiante', en: 'わたしは がくせいです', note: 'El verbo です va al final; は se lee "wa".' },
      { es: '¿Eres japonés?', en: 'にほんじんですか', note: 'Pregunta = です + か.' },
      { es: 'No soy profesor', en: 'せんせいじゃありません', note: 'Negación de です: じゃありません.' },
      { es: 'Esto es un libro', en: 'これは ほんです', note: 'です no cambia por la cosa.' },
      { es: 'El Sr. Tanaka es médico', en: 'たなかさんは いしゃです', note: 'さん = Sr./Sra., nunca para uno mismo.' },
    ],
    examples: [
      { en: 'わたしは マリアです。(Watashi wa Maria desu.)', es: 'Yo soy María.', note: 'は = "wa".' },
      { en: 'たなかさんは せんせいです。(Tanaka-san wa sensei desu.)', es: 'El Sr. Tanaka es profesor.', note: 'さん de cortesía.' },
      { en: 'これは ほんです。(Kore wa hon desu.)', es: 'Esto es un libro.', note: 'これ = esto.' },
      { en: 'にほんじんですか。(Nihonjin desu ka.)', es: '¿Eres japonés?', note: 'です + か.' },
      { en: 'いいえ、ちがいます。(Iie, chigaimasu.)', es: 'No, no es así.', note: 'Respuesta negativa común.' },
      { en: 'わたしは せんせいじゃありません。(…ja arimasen.)', es: 'No soy profesor.', note: 'Negación de です.' },
      { en: 'あのひとは だれですか。(Ano hito wa dare desu ka.)', es: '¿Quién es esa persona?', note: 'だれ = quién.' },
    ],
    commonMistakes: [
      { wrong: 'leer は como "ha" cuando es partícula', right: 'は (partícula) = "wa"', note: 'わたしは = "watashi wa".' },
      { wrong: 'poner です al principio', right: 'です va al final', note: 'わたしは がくせいです (verbo al final).' },
      { wrong: 'conjugar です por persona', right: 'です es invariable', note: 'Vale para soy/eres/es.' },
      { wrong: 'usar さん para uno mismo', right: 'さん solo para los demás', note: 'No digas わたしはマリアさんです.' },
      { wrong: 'negar con です…ない', right: 'じゃありません', note: 'せんせいじゃありません.' },
    ],
    tip: 'Memoriza el molde AはBです y tres detalles: は se lee "wa", です va al final y no cambia, y para preguntar añades か. Con eso ya construyes y entiendes decenas de frases.',
    questions: [
      { s: '"Soy estudiante" = わたしは がくせい___', opts: ['です', 'ます', 'か', 'を'], a: 0, fb: 'です = cópula "ser".' },
      { s: 'La partícula は (de tema) se pronuncia ___', opts: ['wa', 'ha', 'a', 'ba'], a: 0, fb: 'は temática = "wa".' },
      { s: 'Para hacer una pregunta se añade ___ al final', opts: ['か', 'です', 'は', 'の'], a: 0, fb: 'です + か = pregunta.' },
      { s: 'En japonés, el verbo です va ___', opts: ['al final de la frase', 'al principio', 'después del tema, antes del sujeto', 'en cualquier sitio'], a: 0, fb: 'El verbo cierra la oración.' },
      { s: '"Esto es un libro" = これは ほん___', opts: ['です', 'ます', 'を', 'に'], a: 0, fb: 'です = es.' },
      { s: 'です cambia según la persona (yo/tú/él)?', opts: ['No, es invariable', 'Sí, una por persona', 'Solo en plural', 'Solo con わたし'], a: 0, fb: 'です vale para soy/eres/es.' },
      { s: '"No soy profesor" = せんせい___', opts: ['じゃありません', 'です', 'ですか', 'くない'], a: 0, fb: 'Negación de です: じゃありません.' },
      { s: 'は en esta estructura marca el ___', opts: ['tema (tópico)', 'objeto directo', 'lugar', 'tiempo'], a: 0, fb: 'は = partícula de tema.' },
      { s: '"¿Eres japonés?" = にほんじん___', opts: ['ですか', 'です', 'じゃない', 'をか'], a: 0, fb: 'です + か.' },
      { s: 'El sufijo さん (Sr./Sra.) se usa ___', opts: ['para los demás, no para uno mismo', 'siempre, incluido uno mismo', 'solo en preguntas', 'solo con です'], a: 0, fb: 'さん es de cortesía hacia otros.' },
      { s: '"Yo soy María" = わたしは マリア___', opts: ['です', 'ます', 'か', 'の'], a: 0, fb: 'です = ser.' },
      { s: '¿Es correcto leer わたしは como "watashi ha"?', opts: ['No: se lee "watashi wa"', 'Sí', 'Solo formal', 'Solo escrito'], a: 0, fb: 'La は temática se pronuncia "wa".' },
    ],
  },

  // ───────────────────────── 3. これ・それ・あれ ─────────────────────────
  {
    slug: 'demostrativos-kore-sore-are',
    order: 3,
    title: 'これ・それ・あれ — Los demostrativos (ko-so-a-do)',
    shortTitle: 'Demostrativos (これ)',
    icon: '👉',
    seoTitle: 'Demostrativos en japonés: これ それ あれ (esto, eso, aquello)',
    seoDescription: 'El sistema ko-so-a-do del japonés: これ/それ/あれ (esto/eso/aquello), この/その/あの + sustantivo y ここ/そこ/あそこ (lugares). Con tabla y ejercicios A1.',
    keywords: ['これ それ あれ', 'demostrativos japones', 'kore sore are', 'ko so a do', 'este ese aquel japones'],
    intro: [
      'El japonés organiza los demostrativos en un sistema muy elegante de tres distancias, llamado ko-so-a-do: こ (cerca del hablante), そ (cerca del oyente), あ (lejos de ambos) y ど (la pregunta "¿cuál/dónde?"). Una vez entiendes esta lógica, reconoces familias enteras de palabras de golpe.',
      'Para "esto/eso/aquello" (cosas, como pronombre) se usan これ / それ / あれ: これは ほんです ("esto es un libro"). Para "este/ese/aquel + sustantivo" se usan この / その / あの DELANTE del nombre: この ほん ("este libro"), あの ひと ("aquella persona").',
      'Y para los lugares ("aquí/ahí/allí"): ここ / そこ / あそこ. La pregunta correspondiente es どこ ("¿dónde?"), どれ ("¿cuál?"), どの ("¿qué… (de varios)?"). Es el mismo patrón こ-そ-あ-ど aplicado a cosas, atributos y lugares.',
    ],
    sections: [
      {
        heading: 'これ (pronombre) vs この (+ sustantivo)',
        body: [
          'これ/それ/あれ van SOLOS, como "esto/eso/aquello": これは なんですか ("¿qué es esto?"). この/その/あの van SIEMPRE seguidos de un sustantivo: この ほん ("este libro"), その かばん ("esa bolsa"). No se mezclan: これ ほん es incorrecto.',
          'La distancia: こ (これ/この) = cerca de mí; そ (それ/その) = cerca de ti o algo ya mencionado; あ (あれ/あの) = lejos de los dos.',
        ],
      },
      {
        heading: 'Lugares (ここ・そこ・あそこ) y preguntas (ど〜)',
        body: [
          'Lugares: ここ (aquí), そこ (ahí), あそこ (allí, ojo: no "あこ"). トイレは どこですか ("¿dónde está el baño?"). También existen こちら/そちら/あちら, versiones más corteses para dirección o lugar.',
          'La fila ど- son las preguntas: どれ (¿cuál?, de varios), どの+sust. (¿qué…?), どこ (¿dónde?), どちら (¿cuál/dónde?, cortés). Completan el sistema: a こ-そ-あ (respuestas) les corresponde siempre un ど- (pregunta).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'El sistema ko-so-a-do',
        headers: ['', 'こ (cerca de mí)', 'そ (cerca de ti)', 'あ (lejos)', 'ど (¿?)'],
        rows: [
          ['cosa (pronombre)', 'これ (esto)', 'それ (eso)', 'あれ (aquello)', 'どれ (¿cuál?)'],
          ['+ sustantivo', 'この (este)', 'その (ese)', 'あの (aquel)', 'どの (¿qué?)'],
          ['lugar', 'ここ (aquí)', 'そこ (ahí)', 'あそこ (allí)', 'どこ (¿dónde?)'],
        ],
      },
    ],
    contrast: [
      { es: '¿Qué es esto?', en: 'これは なんですか', note: 'これ pronombre = esto.' },
      { es: 'Este libro', en: 'この ほん', note: 'この + sustantivo (no これ ほん).' },
      { es: 'Aquella persona', en: 'あの ひと', note: 'あ = lejos de ambos.' },
      { es: '¿Dónde está el baño?', en: 'トイレは どこですか', note: 'どこ = ¿dónde?' },
      { es: 'Eso (lo que tienes tú)', en: 'それ', note: 'そ = cerca del oyente.' },
    ],
    examples: [
      { en: 'これは ほんです。(Kore wa hon desu.)', es: 'Esto es un libro.', note: 'これ pronombre.' },
      { en: 'それは なんですか。(Sore wa nan desu ka.)', es: '¿Qué es eso?', note: 'それ + なん (qué).' },
      { en: 'あれは わたしの かばんです。(Are wa watashi no kaban desu.)', es: 'Aquello es mi bolsa.', note: 'あれ = lejos.' },
      { en: 'この ペンは いくらですか。(Kono pen wa ikura desu ka.)', es: '¿Cuánto cuesta este bolígrafo?', note: 'この + sustantivo.' },
      { en: 'トイレは どこですか。(Toire wa doko desu ka.)', es: '¿Dónde está el baño?', note: 'どこ = dónde.' },
      { en: 'あそこに えきが あります。(Asoko ni eki ga arimasu.)', es: 'Allí está la estación.', note: 'あそこ = allí.' },
      { en: 'どれが いいですか。(Dore ga ii desu ka.)', es: '¿Cuál es bueno?', note: 'どれ = cuál.' },
    ],
    commonMistakes: [
      { wrong: 'これ ほん (para "este libro")', right: 'この ほん', note: 'Ante sustantivo se usa この, no これ.' },
      { wrong: 'あこ (para "allí")', right: 'あそこ', note: 'El lugar lejano es irregular: あそこ.' },
      { wrong: 'usar これ para algo lejano', right: 'あれ', note: 'これ es cerca de mí; あれ es lejos.' },
      { wrong: 'この para "esto" suelto', right: 'これ', note: 'この necesita un sustantivo detrás.' },
      { wrong: 'usar それ para algo ya mencionado lejano sin contexto', right: 'depende: cerca de ti → それ', note: 'そ cubre lo cercano al oyente o ya mencionado.' },
    ],
    tip: 'Ancla la regla こ-そ-あ-ど: こ cerca de mí, そ cerca de ti, あ lejos, ど pregunta. Y distingue これ (esto, solo) de この (este + sustantivo). Cuidado con el irregular あそこ ("allí").',
    questions: [
      { s: '"¿Qué es esto?" = ___は なんですか', opts: ['これ', 'この', 'ここ', 'どれ'], a: 0, fb: 'これ = esto (pronombre).' },
      { s: '"este libro" = ___ ほん', opts: ['この', 'これ', 'ここ', 'どの'], a: 0, fb: 'この + sustantivo.' },
      { s: '"aquella persona" (lejos) = ___ ひと', opts: ['あの', 'この', 'その', 'どの'], a: 0, fb: 'あ = lejos: あの.' },
      { s: '"¿Dónde?" = ___', opts: ['どこ', 'ここ', 'そこ', 'あそこ'], a: 0, fb: 'どこ = pregunta de lugar.' },
      { s: '"aquí" = ___', opts: ['ここ', 'そこ', 'あそこ', 'どこ'], a: 0, fb: 'こ = cerca de mí: ここ.' },
      { s: '"allí" (lejos) = ___', opts: ['あそこ', 'あこ', 'そこ', 'ここ'], a: 0, fb: 'Irregular: あそこ (no あこ).' },
      { s: '"eso" (cerca de ti) = ___', opts: ['それ', 'これ', 'あれ', 'どれ'], a: 0, fb: 'そ = cerca del oyente: それ.' },
      { s: '¿Cuál es correcto para "este bolígrafo"?', opts: ['この ペン', 'これ ペン', 'ここ ペン', 'これの ペン'], a: 0, fb: 'Ante sustantivo va この.' },
      { s: '"¿Cuál?" (de varios) = ___', opts: ['どれ', 'どこ', 'どの', 'これ'], a: 0, fb: 'どれ = ¿cuál? (pronombre).' },
      { s: 'La fila ど- corresponde a ___', opts: ['las preguntas', 'lo cercano a mí', 'lo lejano', 'lo cercano a ti'], a: 0, fb: 'ど = どれ/どの/どこ (preguntas).' },
      { s: '"aquello es mi bolsa" = ___は わたしの かばんです', opts: ['あれ', 'この', 'ここ', 'どれ'], a: 0, fb: 'あれ = aquello (pronombre, lejos).' },
      { s: '¿Es correcto "これ ほん" para "este libro"?', opts: ['No: この ほん', 'Sí', 'Solo informal', 'Solo escrito'], a: 0, fb: 'Ante sustantivo → この.' },
    ],
  },

  // ───────────────────────── 4. の ─────────────────────────
  {
    slug: 'particula-no-posesivo',
    order: 4,
    title: 'の — La partícula posesiva y de enlace',
    shortTitle: 'Posesivo (の)',
    icon: '🔗',
    seoTitle: 'La partícula の en japonés: posesión y enlace entre sustantivos',
    seoDescription: 'Cómo usar la partícula の (no) en japonés para unir dos sustantivos: posesión (わたしの), origen (にほんの) y relación (A の B = B de A). Con ejemplos y ejercicios A1.',
    keywords: ['partícula の', 'no japones', 'posesivo japones', 'watashi no', 'A no B japones', 'gramatica N5'],
    intro: [
      'La partícula の (no) es una de las más útiles y frecuentes del japonés: une dos sustantivos en la estructura AのB, que significa "B de A". わたしの ほん = "el libro de mí" = "mi libro". にほんの くるま = "el coche de Japón" = "un coche japonés". El orden es inverso al español: el poseedor (A) va primero.',
      'Con esta única partícula cubres todo lo que el español reparte entre posesivos (mi, tu, su) y la preposición "de": わたしの (mi), あなたの (tu), たなかさんの (del Sr. Tanaka), にほんの (de Japón/japonés). Es invariable: no cambia por género ni número.',
      'の también encadena relaciones más amplias: えきの ちかく ("las cercanías de la estación" = "cerca de la estación"), にほんごの せんせい ("profesor de japonés"). Donde dos sustantivos se relacionan, casi siempre hay un の en medio.',
    ],
    sections: [
      {
        heading: 'AのB = "B de A" (orden inverso)',
        body: [
          'El poseedor o el modificador va PRIMERO, luego の, luego lo poseído: わたしの なまえ ("mi nombre"), せんせいの くるま ("el coche del profesor"). En español decimos "el coche del profesor"; en japonés es "profesor-の-coche".',
          'Para "mi/tu/su" se usan los pronombres + の: わたしの (mi), あなたの (tu), かれの (su, de él), かのじょの (su, de ella). No hay formas especiales: siempre pronombre + の.',
        ],
      },
      {
        heading: 'Omitir el segundo sustantivo',
        body: [
          'Cuando el contexto es claro, el sustantivo tras の puede omitirse, y の funciona como "el mío/el de…": これは わたしのです ("esto es mío"), この かばんは たなかさんのです ("esta bolsa es del Sr. Tanaka"). Aquí のです = "es el de…".',
          'No confundas este の con el の interrogativo/explicativo del final de frase (んです), que es otra cosa. En A1, の entre dos sustantivos = posesión/relación.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'La partícula の (AのB = "B de A")',
        headers: ['Japonés', 'Romaji', 'Literal', 'Significado'],
        rows: [
          ['わたしの ほん', 'watashi no hon', 'mí-の-libro', 'mi libro'],
          ['にほんごの せんせい', 'nihongo no sensei', 'japonés-の-profesor', 'profesor de japonés'],
          ['たなかさんの かばん', 'Tanaka-san no kaban', 'Tanaka-の-bolsa', 'la bolsa del Sr. Tanaka'],
          ['えきの ちかく', 'eki no chikaku', 'estación-の-cercanía', 'cerca de la estación'],
        ],
      },
    ],
    contrast: [
      { es: 'Mi libro', en: 'わたしの ほん', note: 'Poseedor primero: "mí-の-libro".' },
      { es: 'El coche del profesor', en: 'せんせいの くるま', note: 'A の B = B de A.' },
      { es: 'Profesor de japonés', en: 'にほんごの せんせい', note: 'の también une "materia + profesor".' },
      { es: 'Esto es mío', en: 'これは わたしのです', note: 'Segundo sustantivo omitido: のです = "el mío".' },
      { es: 'Comida de Japón / comida japonesa', en: 'にほんの たべもの', note: 'の expresa origen/tipo.' },
    ],
    examples: [
      { en: 'わたしの なまえは マリアです。(Watashi no namae wa Maria desu.)', es: 'Mi nombre es María.', note: 'わたしの = mi.' },
      { en: 'これは せんせいの ほんです。(Kore wa sensei no hon desu.)', es: 'Esto es el libro del profesor.', note: 'A の B.' },
      { en: 'にほんごの じゅぎょう。(Nihongo no jugyō.)', es: 'La clase de japonés.', note: 'の une materia + clase.' },
      { en: 'たなかさんの かぞく。(Tanaka-san no kazoku.)', es: 'La familia del Sr. Tanaka.', note: 'Poseedor primero.' },
      { en: 'えきの まえ。(Eki no mae.)', es: 'Delante de la estación.', note: 'の + posición.' },
      { en: 'この かばんは わたしのです。(Kono kaban wa watashi no desu.)', es: 'Esta bolsa es mía.', note: 'Sustantivo omitido.' },
      { en: 'にほんの くるま。(Nihon no kuruma.)', es: 'Un coche japonés.', note: 'の = origen.' },
    ],
    commonMistakes: [
      { wrong: 'ほんの わたし (para "mi libro")', right: 'わたしの ほん', note: 'El poseedor va PRIMERO: わたしの ほん.' },
      { wrong: 'わたし ほん (sin の)', right: 'わたしの ほん', note: 'Hace falta の entre los dos sustantivos.' },
      { wrong: 'usar の con un adjetivo (おおきいの いえ)', right: 'おおきい いえ (sin の)', note: 'Los adjetivos い no llevan の.' },
      { wrong: 'traducir AのB en el mismo orden del español', right: 'recordar que A の B = B de A', note: 'にほんの たべもの = comida de Japón, no "Japón de comida".' },
      { wrong: 'duplicar el sustantivo en "esto es mío"', right: 'これは わたしのです', note: 'El segundo sustantivo se omite.' },
    ],
    tip: 'Recuerda la fórmula AのB = "B de A", con el poseedor delante. Para "mi/tu/su" es simplemente pronombre + の. Y cuidado: los adjetivos い (おおきい, たかい) NO llevan の.',
    questions: [
      { s: '"mi libro" = ___ ほん', opts: ['わたしの', 'ほんの', 'わたしは', 'わたしを'], a: 0, fb: 'Poseedor + の: わたしの ほん.' },
      { s: 'En AのB, ¿qué significa の?', opts: ['B de A (posesión/relación)', 'A de B', 'A y B', 'A es B'], a: 0, fb: 'わたしの ほん = el libro de mí = mi libro.' },
      { s: '"el coche del profesor" = せんせい___ くるま', opts: ['の', 'は', 'を', 'が'], a: 0, fb: 'A の B: せんせいの くるま.' },
      { s: '"profesor de japonés" = にほんご___ せんせい', opts: ['の', 'を', 'は', 'で'], a: 0, fb: 'の une materia + profesor.' },
      { s: 'En "mi libro", el poseedor (わたし) va ___', opts: ['antes de の', 'después del sustantivo', 'al final', 'omitido'], a: 0, fb: 'わたしの ほん: poseedor primero.' },
      { s: '"Esto es mío" = これは わたし___です', opts: ['の', 'は', 'を', 'が'], a: 0, fb: 'のです con el sustantivo omitido = "el mío".' },
      { s: '"un coche japonés" (de Japón) = にほん___ くるま', opts: ['の', 'は', 'で', 'を'], a: 0, fb: 'の = origen/tipo.' },
      { s: 'Para "mi/tu/su" se usa ___', opts: ['pronombre + の', 'una palabra especial', 'は + sustantivo', 'を + sustantivo'], a: 0, fb: 'わたしの, あなたの, かれの.' },
      { s: '¿Llevan の los adjetivos い (おおきい)?', opts: ['No: おおきい いえ', 'Sí: おおきいの いえ', 'Solo en plural', 'Solo formal'], a: 0, fb: 'Los adjetivos い no usan の.' },
      { s: '"delante de la estación" = えき___ まえ', opts: ['の', 'は', 'を', 'に'], a: 0, fb: 'の + posición: えきの まえ.' },
      { s: '"Mi nombre es María" = ___ なまえは マリアです', opts: ['わたしの', 'わたしは', 'わたしを', 'なまえの'], a: 0, fb: 'わたしの なまえ = mi nombre.' },
      { s: '¿Es correcto "ほんの わたし" para "mi libro"?', opts: ['No: わたしの ほん', 'Sí', 'Solo informal', 'Solo escrito'], a: 0, fb: 'El poseedor va primero: わたしの.' },
    ],
  },

  // ───────────────────────── 5. が・あります・います ─────────────────────────
  {
    slug: 'arimasu-imasu-existencia',
    order: 5,
    title: 'あります・います — Hay / estar (existencia) y la partícula が',
    shortTitle: 'Hay (あります/います)',
    icon: '✅',
    seoTitle: 'あります e います en japonés: cómo decir "hay" y "tener"',
    seoDescription: 'La existencia en japonés: あります (cosas) e います (seres vivos), la partícula de sujeto が, y la negación ありません/いません. Con tabla, ejemplos y ejercicios A1.',
    keywords: ['あります います', 'arimasu imasu', 'hay en japones', 'particula が', 'existencia japones N5'],
    intro: [
      'Para decir que algo "hay" o "está", el japonés usa dos verbos según lo que exista: あります para cosas inanimadas (objetos, plantas, lugares) e います para seres vivos con voluntad (personas y animales). ほんが あります = "hay un libro"; ねこが います = "hay un gato".',
      'El sujeto de la existencia se marca con la partícula が (ga): lo que existe lleva が, no は. つくえの うえに ほんが あります = "sobre la mesa hay un libro". が señala normalmente información nueva o el sujeto de existencia/descripción.',
      'La negación de estos verbos es regular dentro del sistema -ます: あります → ありません ("no hay"), います → いません ("no está/no hay"). Con あります/います y が cubres "hay", "está" y, en muchos casos, "tener" (うちに くるまが あります = "en casa hay un coche" = "tengo coche").',
    ],
    sections: [
      {
        heading: 'あります (cosas) vs います (seres vivos)',
        body: [
          'あります: objetos, plantas, lugares, conceptos. ほんが あります (hay un libro), おかねが あります (hay dinero), じかんが あります (hay tiempo). います: personas y animales. せんせいが います (hay un profesor), いぬが います (hay un perro).',
          'La frontera es "tener voluntad de moverse": animales y personas → います; todo lo demás → あります. Un error típico es usar あります con personas.',
        ],
      },
      {
        heading: 'La partícula が y el lugar con に',
        body: [
          'Lo que existe lleva が: ねこが います. El LUGAR donde existe se marca con に: こうえんに こどもが います ("en el parque hay niños"). Estructura típica: [lugar]に [cosa/ser]が あります/います.',
          'Negación: ありません (no hay cosa), いません (no hay ser vivo). ここに トイレは ありません ("aquí no hay baño"). Para "tener", se usa la misma estructura: わたしは くるまが あります / うちに くるまが あります.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'あります vs います',
        headers: ['Verbo', 'Para…', 'Ejemplo', 'Significado'],
        rows: [
          ['あります', 'cosas inanimadas', 'ほんが あります', 'hay un libro'],
          ['います', 'personas y animales', 'ねこが います', 'hay un gato'],
          ['ありません', 'no hay (cosa)', 'じかんが ありません', 'no hay tiempo'],
          ['いません', 'no hay (ser vivo)', 'だれも いません', 'no hay nadie'],
        ],
      },
    ],
    contrast: [
      { es: 'Hay un libro', en: 'ほんが あります', note: 'Cosa → あります; sujeto con が.' },
      { es: 'Hay un gato', en: 'ねこが います', note: 'Animal → います.' },
      { es: 'No tengo tiempo', en: 'じかんが ありません', note: 'Negación de あります.' },
      { es: 'En el parque hay niños', en: 'こうえんに こどもが います', note: 'Lugar con に + persona con が + います.' },
      { es: 'Tengo coche', en: 'くるまが あります', note: 'La existencia también expresa posesión.' },
    ],
    examples: [
      { en: 'つくえの うえに ほんが あります。(Tsukue no ue ni hon ga arimasu.)', es: 'Sobre la mesa hay un libro.', note: 'Lugar に + cosa が + あります.' },
      { en: 'へやに ねこが います。(Heya ni neko ga imasu.)', es: 'En la habitación hay un gato.', note: 'Animal → います.' },
      { en: 'じかんが ありません。(Jikan ga arimasen.)', es: 'No hay tiempo / no tengo tiempo.', note: 'Negación de あります.' },
      { en: 'きょうしつに せんせいが います。(Kyōshitsu ni sensei ga imasu.)', es: 'En el aula hay un profesor.', note: 'Persona → います.' },
      { en: 'ここに トイレが あります。(Koko ni toire ga arimasu.)', es: 'Aquí hay un baño.', note: 'Lugar inanimado → あります.' },
      { en: 'だれも いません。(Dare mo imasen.)', es: 'No hay nadie.', note: 'いません = negación de います.' },
      { en: 'おかねが あります。(Okane ga arimasu.)', es: 'Tengo dinero.', note: 'Existencia = posesión.' },
    ],
    commonMistakes: [
      { wrong: 'usar あります con personas (せんせいが あります)', right: 'せんせいが います', note: 'Personas y animales → います.' },
      { wrong: 'usar います con objetos (ほんが います)', right: 'ほんが あります', note: 'Cosas → あります.' },
      { wrong: 'marcar lo que existe con は por defecto', right: 'usar が', note: 'ねこが います (sujeto de existencia → が).' },
      { wrong: 'あらない / いらない como negación', right: 'ありません / いません', note: 'Negación cortés -ます → -ません.' },
      { wrong: 'olvidar に en el lugar', right: '[lugar]に …が あります', note: 'こうえんに… (に marca el lugar de existencia).' },
    ],
    tip: 'Pregúntate si lo que "hay" tiene vida: persona/animal → います; cosa/lugar → あります. Lo que existe lleva が; el lugar lleva に. La negación es siempre -ません: ありません / いません.',
    questions: [
      { s: '"Hay un libro" = ほんが ___', opts: ['あります', 'います', 'です', 'ません'], a: 0, fb: 'Cosa → あります.' },
      { s: '"Hay un gato" = ねこが ___', opts: ['います', 'あります', 'です', 'ありません'], a: 0, fb: 'Animal → います.' },
      { s: 'います se usa para ___', opts: ['personas y animales', 'objetos', 'lugares', 'conceptos'], a: 0, fb: 'Seres con voluntad → います.' },
      { s: 'Lo que existe se marca con la partícula ___', opts: ['が', 'は', 'を', 'の'], a: 0, fb: 'ねこが います, ほんが あります.' },
      { s: '"No hay tiempo" = じかんが ___', opts: ['ありません', 'いません', 'です', 'ない'], a: 0, fb: 'Negación de あります → ありません.' },
      { s: 'El LUGAR de existencia se marca con ___', opts: ['に', 'が', 'を', 'は'], a: 0, fb: 'こうえんに こどもが います.' },
      { s: '"En el aula hay un profesor" = きょうしつに せんせいが ___', opts: ['います', 'あります', 'です', 'ません'], a: 0, fb: 'Persona → います.' },
      { s: '"No hay nadie" = だれも ___', opts: ['いません', 'ありません', 'です', 'ない'], a: 0, fb: 'Negación de います → いません.' },
      { s: '¿Es correcto "せんせいが あります"?', opts: ['No: せんせいが います', 'Sí', 'Solo formal', 'Solo escrito'], a: 0, fb: 'Las personas usan います.' },
      { s: '"Tengo dinero" (existencia) = おかねが ___', opts: ['あります', 'います', 'です', 'ません'], a: 0, fb: 'Cosa → あります; la existencia expresa posesión.' },
      { s: '"Aquí hay un baño" = ここに トイレが ___', opts: ['あります', 'います', 'です', 'ない'], a: 0, fb: 'Lugar/objeto → あります.' },
      { s: 'La negación cortés de あります es ___', opts: ['ありません', 'あらない', 'ありデない', 'いません'], a: 0, fb: '-ます → -ません: ありません.' },
    ],
  },

  // ───────────────────────── 6. を ─────────────────────────
  {
    slug: 'particula-o-objeto',
    order: 6,
    title: 'を — La partícula de objeto directo',
    shortTitle: 'Objeto (を)',
    icon: '🎁',
    seoTitle: 'La partícula を en japonés: el objeto directo (y el orden SOV)',
    seoDescription: 'Cómo marcar el objeto directo en japonés con を (o), el orden Sujeto-Objeto-Verbo y por qué el verbo va al final. Con ejemplos y ejercicios A1.',
    keywords: ['partícula を', 'wo o japones', 'objeto directo japones', 'orden SOV japones', 'gramatica N5'],
    intro: [
      'La partícula を (que se escribe con el signo "wo" pero se pronuncia "o") marca el OBJETO DIRECTO: lo que recibe la acción del verbo. ごはんを たべます = "como arroz/comida"; にほんごを べんきょうします = "estudio japonés". Lo que comes, bebes, lees o estudias lleva を justo antes del verbo.',
      'Aquí se ve con claridad el orden japonés, que es SOV: Sujeto – Objeto – Verbo, con el verbo SIEMPRE al final. "Bebo agua" no es "bebo agua" sino "agua-bebo": みずを のみます. El objeto (con を) precede al verbo, y el verbo cierra la frase.',
      'を se usa exclusivamente para esta función gramatical (objeto directo), así que en la práctica solo aparece pegada a un sustantivo seguido de un verbo de acción. Reconocerla te dice de un vistazo qué recibe la acción en cualquier oración.',
    ],
    sections: [
      {
        heading: 'を + verbo, con el verbo al final',
        body: [
          'Estructura típica: [tema は] [objeto を] [verbo ます]. わたしは パンを たべます ("yo como pan"). El objeto va inmediatamente antes del verbo, y el verbo termina la oración. Cambiar esto suena agramatical.',
          'Verbos frecuentes con を: たべます (comer), のみます (beber), よみます (leer), みます (ver), かいます (comprar), べんきょうします (estudiar), します (hacer). ほんを よみます, テレビを みます, コーヒーを のみます.',
        ],
      },
      {
        heading: 'を se pronuncia "o"',
        body: [
          'Aunque を corresponde al signo histórico "wo", como partícula se pronuncia simplemente "o". みずを のみます = "mizu O nomimasu". Solo se usa como partícula; no aparece dentro de palabras.',
          'No confundas を (objeto) con la vocal お (o), que sí aparece en palabras (おちゃ, ocha). El sonido es el mismo, pero を solo funciona como marca de objeto directo.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'La partícula を (objeto) y el orden SOV',
        headers: ['Frase', 'Romaji', 'Estructura', 'Significado'],
        rows: [
          ['ごはんを たべます', 'gohan o tabemasu', 'O + V', 'como arroz'],
          ['みずを のみます', 'mizu o nomimasu', 'O + V', 'bebo agua'],
          ['ほんを よみます', 'hon o yomimasu', 'O + V', 'leo un libro'],
          ['にほんごを べんきょうします', 'nihongo o benkyō shimasu', 'O + V', 'estudio japonés'],
        ],
      },
    ],
    contrast: [
      { es: 'Bebo agua', en: 'みずを のみます', note: 'Orden SOV: el objeto (みずを) va antes del verbo.' },
      { es: 'Estudio japonés', en: 'にほんごを べんきょうします', note: 'En español el verbo va en medio; en japonés, al final.' },
      { es: 'Veo la televisión', en: 'テレビを みます', note: 'テレビ + を + みます.' },
      { es: 'Compro pan', en: 'パンを かいます', note: 'を marca el objeto.' },
      { es: 'Leo un libro', en: 'ほんを よみます', note: 'を se pronuncia "o".' },
    ],
    examples: [
      { en: 'わたしは ごはんを たべます。(Watashi wa gohan o tabemasu.)', es: 'Como arroz/comida.', note: 'は tema + を objeto + verbo final.' },
      { en: 'みずを のみます。(Mizu o nomimasu.)', es: 'Bebo agua.', note: 'を = "o".' },
      { en: 'まいにち にほんごを べんきょうします。(Mainichi nihongo o benkyō shimasu.)', es: 'Estudio japonés todos los días.', note: 'べんきょうします.' },
      { en: 'テレビを みます。(Terebi o mimasu.)', es: 'Veo la televisión.', note: 'みます.' },
      { en: 'ほんを よみます。(Hon o yomimasu.)', es: 'Leo un libro.', note: 'よみます.' },
      { en: 'コーヒーを のみます。(Kōhī o nomimasu.)', es: 'Bebo café.', note: 'Préstamo + を.' },
      { en: 'なにを かいますか。(Nani o kaimasu ka.)', es: '¿Qué compras?', note: 'なに (qué) + を.' },
    ],
    commonMistakes: [
      { wrong: 'poner el verbo antes del objeto', right: 'objeto を + verbo (verbo al final)', note: 'みずを のみます, no のみます みずを.' },
      { wrong: 'leer を como "wo"', right: 'を se pronuncia "o"', note: 'みずを = "mizu o".' },
      { wrong: 'marcar el objeto con が o は por defecto', right: 'objeto directo → を', note: 'ごはんを たべます.' },
      { wrong: 'usar を con あります/います', right: 'esos verbos usan が', note: 'ほんが あります, no ほんを あります.' },
      { wrong: 'escribir を dentro de una palabra', right: 'を solo es partícula', note: 'La "o" de おちゃ es お, no を.' },
    ],
    tip: 'Piensa en japonés "comida-como, agua-bebo": el objeto + を va justo antes del verbo, y el verbo cierra la frase. Y recuerda que を, como partícula, se pronuncia "o".',
    questions: [
      { s: '"Como arroz" = ごはん___ たべます', opts: ['を', 'が', 'は', 'に'], a: 0, fb: 'Objeto directo → を.' },
      { s: '"Bebo agua" = みず___ のみます', opts: ['を', 'が', 'で', 'に'], a: 0, fb: 'を marca el objeto.' },
      { s: 'En japonés el verbo va ___', opts: ['al final de la frase', 'al principio', 'antes del objeto', 'en cualquier sitio'], a: 0, fb: 'Orden SOV: el verbo cierra la oración.' },
      { s: 'La partícula を se pronuncia ___', opts: ['o', 'wo', 'u', 'go'], a: 0, fb: 'を como partícula = "o".' },
      { s: '"Estudio japonés" = にほんご___ べんきょうします', opts: ['を', 'が', 'は', 'で'], a: 0, fb: 'Objeto → を.' },
      { s: '"Veo la televisión" = テレビ___ みます', opts: ['を', 'が', 'に', 'へ'], a: 0, fb: 'を + みます.' },
      { s: 'を marca el ___', opts: ['objeto directo', 'sujeto', 'tema', 'lugar'], a: 0, fb: 'Lo que recibe la acción.' },
      { s: 'Orden correcto de "leo un libro":', opts: ['ほんを よみます', 'よみます ほんを', 'ほんが よみます', 'よみます を ほん'], a: 0, fb: 'Objeto を + verbo al final.' },
      { s: '"¿Qué compras?" = なに___ かいますか', opts: ['を', 'が', 'は', 'に'], a: 0, fb: 'なに (objeto) + を.' },
      { s: '¿Se usa を con あります?', opts: ['No: あります usa が', 'Sí', 'Solo con personas', 'Solo formal'], a: 0, fb: 'ほんが あります (が, no を).' },
      { s: '"Bebo café" = コーヒー___ のみます', opts: ['を', 'が', 'は', 'で'], a: 0, fb: 'Objeto → を.' },
      { s: '¿Es correcto "のみます みずを"?', opts: ['No: みずを のみます', 'Sí', 'Solo informal', 'Solo poético'], a: 0, fb: 'El verbo va al final.' },
    ],
  },

  // ───────────────────────── 7. VERBOS ～ます ─────────────────────────
  {
    slug: 'verbos-masu-presente',
    order: 7,
    title: '～ます — Los verbos en forma cortés (presente)',
    shortTitle: 'Verbos ～ます',
    icon: '🗣️',
    seoTitle: 'Los verbos japoneses en forma ます: presente y futuro',
    seoDescription: 'La forma ます (masu) del verbo japonés: presente/futuro cortés, su negativo ません y por qué no cambia por persona. Verbos clave del N5 con ejemplos y ejercicios.',
    keywords: ['verbos japoneses', 'forma masu', '～ます ません', 'presente japones', 'conjugacion japonesa N5'],
    intro: [
      'La forma ～ます (masu) es la conjugación cortés estándar del verbo japonés, la que se usa en la vida diaria y la que aprendes primero. たべます (como), のみます (bebo), いきます (voy). Es a la vez presente y futuro: あした いきます puede ser "mañana voy" o "iré".',
      'Su gran ventaja para un hispanohablante: NO cambia por persona ni número. たべます vale para "como, comes, come, comemos, coméis, comen". El sujeto lo da el contexto o el tema (は). Memorizas una forma por verbo y la usas para todos.',
      'El sistema ～ます es muy regular: el negativo es ～ません (たべません, "no como"), el pasado ～ました ("comí") y el pasado negativo ～ませんでした ("no comí"). En este tema nos centramos en el presente afirmativo y negativo; el pasado tiene su propio tema.',
    ],
    sections: [
      {
        heading: 'Presente afirmativo y negativo (～ます / ～ません)',
        body: [
          'Afirmativo: ～ます. のみます (bebo), みます (veo), します (hago), きます (vengo). Negativo: cambia ます por ません. のみます → のみません (no bebo), いきます → いきません (no voy).',
          'Como no hay concordancia de persona, la misma forma sirve para cualquier sujeto: わたしは いきます / たなかさんは いきます / かれらは いきます — todas con いきます.',
        ],
      },
      {
        heading: 'Presente = futuro y verbos clave',
        body: [
          'El presente ～ます cubre acciones habituales y futuras: まいにち べんきょうします ("estudio todos los días"), あした はたらきます ("mañana trabajo/trabajaré"). No hay una forma de futuro aparte en A1.',
          'Verbos N5 muy útiles: いきます (ir), きます (venir), かえります (volver), たべます (comer), のみます (beber), みます (ver), よみます (leer), ききます (escuchar), はなします (hablar), かいます (comprar), します (hacer), べんきょうします (estudiar).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'La forma ～ます (presente/futuro)',
        headers: ['Afirmativo', 'Negativo', 'Significado'],
        rows: [
          ['たべます', 'たべません', 'como / no como'],
          ['のみます', 'のみません', 'bebo / no bebo'],
          ['いきます', 'いきません', 'voy / no voy'],
          ['します', 'しません', 'hago / no hago'],
        ],
      },
    ],
    contrast: [
      { es: 'Como / como (yo, tú, él…)', en: 'たべます', note: 'Una sola forma para todas las personas.' },
      { es: 'No bebo', en: 'のみません', note: 'Negativo: ます → ません.' },
      { es: 'Mañana voy / iré', en: 'あした いきます', note: 'El presente cubre el futuro.' },
      { es: 'Estudio todos los días', en: 'まいにち べんきょうします', note: 'Acción habitual.' },
      { es: 'No voy a la escuela', en: 'がっこうへ いきません', note: 'へ = dirección + いきません.' },
    ],
    examples: [
      { en: 'わたしは コーヒーを のみます。(…nomimasu.)', es: 'Bebo café.', note: 'のみます.' },
      { en: 'にくを たべません。(Niku o tabemasen.)', es: 'No como carne.', note: 'Negativo ません.' },
      { en: 'あした とうきょうへ いきます。(…ikimasu.)', es: 'Mañana voy a Tokio.', note: 'Presente = futuro.' },
      { en: 'まいにち にほんごを べんきょうします。(…shimasu.)', es: 'Estudio japonés todos los días.', note: 'します.' },
      { en: 'テレビを みません。(Terebi o mimasen.)', es: 'No veo la televisión.', note: 'みます → みません.' },
      { en: 'なにを しますか。(Nani o shimasu ka.)', es: '¿Qué haces/harás?', note: 'します + か.' },
      { en: 'うちへ かえります。(Uchi e kaerimasu.)', es: 'Vuelvo a casa.', note: 'かえります.' },
    ],
    commonMistakes: [
      { wrong: 'conjugar ます por persona', right: 'una sola forma para todas', note: 'いきます vale para yo/tú/él…' },
      { wrong: 'たべないます (negativo)', right: 'たべません', note: 'El negativo cortés es ません.' },
      { wrong: 'buscar una forma de futuro aparte', right: 'el presente ます cubre el futuro', note: 'あした いきます = mañana iré.' },
      { wrong: 'poner el verbo antes del objeto', right: 'objeto + verbo al final', note: 'コーヒーを のみます.' },
      { wrong: 'のみますか sin entonación de pregunta escrita', right: 'のみますか (か marca la pregunta)', note: 'No hace falta más que か.' },
    ],
    tip: 'Aprende cada verbo en su forma ます y recuerda: el negativo es ません, vale para todas las personas y el presente también expresa el futuro. Con eso conjugas casi todo el A1.',
    questions: [
      { s: '"como" en forma cortés = ___', opts: ['たべます', 'たべる', 'たべません', 'たべました'], a: 0, fb: 'Forma ます presente: たべます.' },
      { s: 'El negativo de のみます es ___', opts: ['のみません', 'のまない', 'のみないます', 'のみます'], a: 0, fb: 'ます → ません: のみません.' },
      { s: 'La forma ます cambia según la persona?', opts: ['No, es la misma para todas', 'Sí, una por persona', 'Solo en plural', 'Solo con わたし'], a: 0, fb: 'いきます vale para yo/tú/él…' },
      { s: '"Mañana voy a Tokio" = あした とうきょうへ ___', opts: ['いきます', 'いきました', 'いきません', 'いく'], a: 0, fb: 'El presente cubre el futuro.' },
      { s: '"No como carne" = にくを ___', opts: ['たべません', 'たべます', 'たべました', 'たべない'], a: 0, fb: 'Negativo: たべません.' },
      { s: 'La forma ます expresa ___', opts: ['presente y futuro', 'solo pasado', 'solo presente', 'solo órdenes'], a: 0, fb: 'あした いきます = mañana iré.' },
      { s: '"Estudio japonés" = にほんごを べんきょう___', opts: ['します', 'する', 'しません', 'しました'], a: 0, fb: 'べんきょうします (presente).' },
      { s: '"No veo la tele" = テレビを ___', opts: ['みません', 'みます', 'みました', 'みない'], a: 0, fb: 'みます → みません.' },
      { s: '"Vuelvo a casa" = うちへ ___', opts: ['かえります', 'かえりません', 'かえった', 'かえる'], a: 0, fb: 'かえります = vuelvo.' },
      { s: 'El negativo cortés se forma cambiando ます por ___', opts: ['ません', 'ない', 'なかった', 'ました'], a: 0, fb: 'たべません, いきません.' },
      { s: '"¿Qué haces?" = なにを し___', opts: ['ますか', 'ました', 'ません', 'る'], a: 0, fb: 'します + か.' },
      { s: '¿Es correcto "たべないます"?', opts: ['No: たべません', 'Sí', 'Solo informal', 'Solo escrito'], a: 0, fb: 'El negativo cortés es ません.' },
    ],
  },

  // ───────────────────────── 8. に・へ・で ─────────────────────────
  {
    slug: 'particulas-ni-e-de',
    order: 8,
    title: 'に・へ・で — Lugar, tiempo y dirección',
    shortTitle: 'Lugar/tiempo (に/へ/で)',
    icon: '📍',
    seoTitle: 'Las partículas に, へ y で en japonés: lugar, tiempo y dirección',
    seoDescription: 'Diferencia entre に (destino, tiempo, existencia), へ (dirección) y で (lugar donde ocurre la acción) en japonés A1. Con tabla comparativa, ejemplos y ejercicios.',
    keywords: ['に へ で', 'particulas japonesas lugar', 'ni e de japones', 'diferencia に で', 'gramatica N5'],
    intro: [
      'Tres partículas pequeñas organizan el lugar y el tiempo en japonés, y distinguirlas es uno de los pasos clave del A1. に (ni) marca el destino, la hora y el lugar de existencia; へ (e) marca la dirección; で (de) marca el lugar DONDE OCURRE una acción.',
      'La diferencia más importante es に vs で con lugares: に indica destino o ubicación estática (がっこうに いきます "voy a la escuela", うちに います "estoy en casa"), mientras que で indica el sitio donde se realiza una actividad (としょかんで べんきょうします "estudio EN la biblioteca").',
      'へ (que se escribe con el signo "he" pero se pronuncia "e") marca dirección y es muchas veces intercambiable con el に de destino: とうきょうへ いきます ≈ とうきょうに いきます. Y に es también la partícula del tiempo: しちじに おきます ("me levanto a las 7").',
    ],
    sections: [
      {
        heading: 'に: destino, tiempo y existencia',
        body: [
          'Destino (con いきます/きます/かえります): がっこうに いきます (voy a la escuela). Existencia (con あります/います): へやに ねこが います (en la habitación hay un gato). Tiempo (hora/fecha): しちじに おきます (me levanto a las 7), にちようびに (el domingo).',
          'Ojo: las palabras de tiempo "relativas" como きょう (hoy), あした (mañana), きのう (ayer), いま (ahora) NO llevan に. Se dice あした いきます, no あしたに いきます.',
        ],
      },
      {
        heading: 'で: lugar de la acción (y へ: dirección)',
        body: [
          'で marca dónde ocurre una acción: レストランで たべます (como en el restaurante), うちで べんきょうします (estudio en casa), がっこうで にほんごを はなします (hablo japonés en la escuela). で también marca el medio: でんしゃで いきます (voy en tren).',
          'へ marca dirección/destino, sobre todo con verbos de movimiento: とうきょうへ いきます. Se pronuncia "e". Compara: うちに います (estoy EN casa, ubicación → に) vs うちで べんきょうします (estudio EN casa, acción → で).',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'に vs で vs へ',
        headers: ['Partícula', 'Función', 'Verbo típico', 'Ejemplo'],
        rows: [
          ['に', 'destino', 'いきます, きます', 'がっこうに いきます'],
          ['に', 'existencia (lugar)', 'あります, います', 'うちに います'],
          ['に', 'tiempo (hora/día)', 'cualquiera', 'しちじに おきます'],
          ['で', 'lugar de la acción / medio', 'たべます, べんきょうします', 'としょかんで べんきょうします'],
          ['へ', 'dirección', 'いきます, きます', 'とうきょうへ いきます'],
        ],
      },
    ],
    contrast: [
      { es: 'Voy a la escuela', en: 'がっこうに いきます', note: 'Destino → に (o へ).' },
      { es: 'Estudio en la biblioteca', en: 'としょかんで べんきょうします', note: 'Acción → で.' },
      { es: 'Estoy en casa', en: 'うちに います', note: 'Ubicación con います → に.' },
      { es: 'A las siete', en: 'しちじに', note: 'El tiempo (hora) lleva に.' },
      { es: 'Voy en tren', en: 'でんしゃで いきます', note: 'で también marca el medio de transporte.' },
    ],
    examples: [
      { en: 'がっこうに いきます。(Gakkō ni ikimasu.)', es: 'Voy a la escuela.', note: 'Destino → に.' },
      { en: 'としょかんで べんきょうします。(Toshokan de benkyō shimasu.)', es: 'Estudio en la biblioteca.', note: 'Acción → で.' },
      { en: 'うちに ねこが います。(Uchi ni neko ga imasu.)', es: 'En casa hay un gato.', note: 'Existencia → に.' },
      { en: 'しちじに おきます。(Shichiji ni okimasu.)', es: 'Me levanto a las siete.', note: 'Tiempo → に.' },
      { en: 'レストランで ばんごはんを たべます。(…de…)', es: 'Ceno en el restaurante.', note: 'Acción → で.' },
      { en: 'でんしゃで かいしゃへ いきます。(Densha de kaisha e ikimasu.)', es: 'Voy a la empresa en tren.', note: 'で (medio) + へ (dirección).' },
      { en: 'あした きょうとへ いきます。(Ashita Kyōto e ikimasu.)', es: 'Mañana voy a Kioto.', note: 'あした sin に; へ dirección.' },
    ],
    commonMistakes: [
      { wrong: 'としょかんに べんきょうします', right: 'としょかんで べんきょうします', note: 'Una acción que ocurre en un lugar lleva で.' },
      { wrong: 'うちで います', right: 'うちに います', note: 'La existencia/ubicación con います lleva に.' },
      { wrong: 'あPSしたに いきます (あしたに)', right: 'あした いきます', note: 'きょう/あした/きのう no llevan に.' },
      { wrong: 'leer へ como "he"', right: 'へ (partícula) = "e"', note: 'とうきょうへ = "Tōkyō e".' },
      { wrong: 'usar で para destino (がっこうで いきます)', right: 'がっこうに/へ いきます', note: 'El destino con いきます va con に/へ.' },
    ],
    tip: 'Pregúntate qué hace el verbo: ¿moverse o existir (いきます/あります/います)? → に (destino/ubicación) o へ (dirección). ¿Una actividad que ocurre en un sitio (たべます/べんきょうします)? → で. La hora siempre con に, salvo きょう/あした/きのう.',
    questions: [
      { s: '"Voy a la escuela" = がっこう___ いきます', opts: ['に', 'で', 'を', 'は'], a: 0, fb: 'Destino → に (o へ).' },
      { s: '"Estudio en la biblioteca" = としょかん___ べんきょうします', opts: ['で', 'に', 'を', 'へ'], a: 0, fb: 'Acción → で.' },
      { s: '"Estoy en casa" = うち___ います', opts: ['に', 'で', 'を', 'へ'], a: 0, fb: 'Existencia/ubicación → に.' },
      { s: '"A las siete" = しちじ___ おきます', opts: ['に', 'で', 'を', 'へ'], a: 0, fb: 'El tiempo (hora) → に.' },
      { s: 'La partícula que marca el lugar de la ACCIÓN es ___', opts: ['で', 'に', 'へ', 'を'], a: 0, fb: 'で: としょかんで べんきょうします.' },
      { s: '"Ceno en el restaurante" = レストラン___ たべます', opts: ['で', 'に', 'へ', 'を'], a: 0, fb: 'Acción → で.' },
      { s: 'へ (de dirección) se pronuncia ___', opts: ['e', 'he', 'we', 'ha'], a: 0, fb: 'へ partícula = "e".' },
      { s: '"Voy en tren" = でんしゃ___ いきます', opts: ['で', 'に', 'を', 'へ'], a: 0, fb: 'で = medio de transporte.' },
      { s: '"Mañana voy" se dice ___', opts: ['あした いきます', 'あしたに いきます', 'あしたで いきます', 'あしたへに いきます'], a: 0, fb: 'あした no lleva に.' },
      { s: 'La existencia (あります/います) usa la partícula de lugar ___', opts: ['に', 'で', 'を', 'へ'], a: 0, fb: 'うちに います.' },
      { s: '"Mañana voy a Kioto" = あした きょうと___ いきます', opts: ['へ', 'で', 'を', 'が'], a: 0, fb: 'Dirección → へ (o に).' },
      { s: '¿Es correcto "としょかんに べんきょうします"?', opts: ['No: としょかんで べんきょうします', 'Sí', 'Solo formal', 'Solo escrito'], a: 0, fb: 'Acción en un lugar → で.' },
    ],
  },

  // ───────────────────────── 9. NÚMEROS ─────────────────────────
  {
    slug: 'numeros-y-contadores',
    order: 9,
    title: '数字 — Los números y los contadores',
    shortTitle: 'Números (数字)',
    icon: '🔢',
    seoTitle: 'Los números en japonés y los contadores (一, 二, 三… 人, 円)',
    seoDescription: 'Los números japoneses del 1 al 10.000, el dinero (円), la hora (時) y los contadores (人 personas, つ objetos). Con tabla, ejemplos y ejercicios A1.',
    keywords: ['numeros en japones', 'contar en japones', 'contadores japoneses', '円 時 人', 'numeros japoneses N5'],
    intro: [
      'Los números japoneses básicos: いち(1) に(2) さん(3) し/よん(4) ご(5) ろく(6) しち/なな(7) はち(8) きゅう/く(9) じゅう(10). A partir de ahí se combinan de forma muy regular: 11 = じゅういち (10+1), 20 = にじゅう (2×10), 35 = さんじゅうご (3×10+5).',
      'Las potencias: ひゃく (100), せん (1000), まん (10.000). 200 = にひゃく, 3000 = さんぜん. El japonés agrupa de 10.000 en 10.000 (まん), no de mil en mil como el español, algo a tener en cuenta con cifras grandes.',
      'La particularidad japonesa son los CONTADORES: para contar cosas no basta el número, hace falta un sufijo según el tipo de objeto. 人 (にん) para personas, 円 (えん) para dinero, 時 (じ) para horas, つ para objetos en general. ふたり (2 personas), ひゃくえん (100 yenes), さんじ (las 3).',
    ],
    sections: [
      {
        heading: 'Números del 1 al 10.000',
        body: [
          'Unidades: いち に さん よん ご ろく なな はち きゅう じゅう. Decenas: じゅう(10), にじゅう(20), さんじゅう(30)… Combinación: 48 = よんじゅうはち. Centenas/miles: ひゃく(100), せん(1000), まん(10.000).',
          'Algunos números tienen lecturas dobles o cambios fonéticos: 4 = し o よん, 7 = しち o なな, 9 = きゅう o く. Y hay alteraciones como さんびゃく (300) o ろっぴゃく (600); en A1 basta reconocer las formas regulares.',
        ],
      },
      {
        heading: 'Contadores: 人, 円, 時, つ',
        body: [
          'Personas (人 にん): ひとり (1, irregular), ふたり (2, irregular), さんにん (3), よにん (4)… Dinero (円 えん): ごえん (5 yenes), ひゃくえん (100), せんえん (1000). Horas (時 じ): いちじ (1:00), さんじ (3:00), よじ (4:00, irregular).',
          'Contador general (つ) para objetos sin contador específico, con lecturas nativas: ひとつ(1) ふたつ(2) みっつ(3) よっつ(4) いつつ(5)… とお(10). りんごを みっつ ("tres manzanas"). Es el contador "comodín" del A1.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Números y contadores clave',
        headers: ['Número', 'Lectura', 'Dinero (円)', 'Objetos (つ)'],
        rows: [
          ['1', 'いち', 'いちえん', 'ひとつ'],
          ['2', 'に', 'にえん', 'ふたつ'],
          ['3', 'さん', 'さんえん', 'みっつ'],
          ['100', 'ひゃく', 'ひゃくえん', '—'],
          ['1000', 'せん', 'せんえん', '—'],
        ],
      },
    ],
    contrast: [
      { es: '100 yenes', en: 'ひゃくえん', note: 'Dinero → contador 円 (えん).' },
      { es: 'Son las tres', en: 'さんじです', note: 'Hora → contador 時 (じ).' },
      { es: 'Tres manzanas', en: 'りんごを みっつ', note: 'Objetos → contador つ (lectura nativa みっつ).' },
      { es: 'Dos personas', en: 'ふたり', note: 'Personas → 人; 1 y 2 son irregulares (ひとり, ふたり).' },
      { es: 'Las cuatro', en: 'よじ', note: '4:00 es irregular: よじ, no しじ.' },
    ],
    examples: [
      { en: 'これは ひゃくえんです。(Kore wa hyaku-en desu.)', es: 'Esto cuesta 100 yenes.', note: 'えん = yenes.' },
      { en: 'いま さんじです。(Ima sanji desu.)', es: 'Ahora son las tres.', note: 'じ = hora.' },
      { en: 'りんごを みっつ ください。(Ringo o mittsu kudasai.)', es: 'Tres manzanas, por favor.', note: 'つ contador general.' },
      { en: 'かぞくは よにんです。(Kazoku wa yo-nin desu.)', es: 'Somos cuatro en la familia.', note: '人 = personas.' },
      { en: 'にじゅうごさいです。(Nijūgo-sai desu.)', es: 'Tengo 25 años.', note: 'さい = años de edad.' },
      { en: 'せんえんです。(Sen-en desu.)', es: 'Son 1000 yenes.', note: 'せん = 1000.' },
      { en: 'ともだちが ふたり います。(Tomodachi ga futari imasu.)', es: 'Tengo dos amigos.', note: 'ふたり = 2 personas (irregular).' },
    ],
    commonMistakes: [
      { wrong: 'contar objetos solo con el número (りんごを さん)', right: 'りんごを みっつ', note: 'Hace falta un contador (つ).' },
      { wrong: 'さんにん para "3:00"', right: 'さんじ', note: '人 (にん) es para personas; las horas usan 時 (じ).' },
      { wrong: 'いちり / にり para personas', right: 'ひとり / ふたり', note: '1 y 2 personas son irregulares.' },
      { wrong: 'しじ para "las 4"', right: 'よじ', note: '4:00 = よじ (irregular).' },
      { wrong: 'agrupar cifras grandes de mil en mil', right: 'japonés agrupa de まん (10.000)', note: '10.000 = いちまん, no じゅうせん.' },
    ],
    tip: 'Aprende 1-10 y la combinación regular (じゅういち=11, にじゅう=20). Luego suma los contadores básicos: 人 (personas, con ひとり/ふたり irregulares), 円 (dinero), 時 (horas, con よじ irregular) y つ (objetos: ひとつ・ふたつ・みっつ…).',
    questions: [
      { s: '"100 yenes" = ___', opts: ['ひゃくえん', 'ひゃくじ', 'ひゃくにん', 'ひゃくつ'], a: 0, fb: 'Dinero → 円 (えん): ひゃくえん.' },
      { s: '"Son las tres" = ___です', opts: ['さんじ', 'さんにん', 'さんえん', 'みっつ'], a: 0, fb: 'Hora → 時 (じ): さんじ.' },
      { s: '"Tres manzanas" = りんごを ___', opts: ['みっつ', 'さんにん', 'さんじ', 'さんえん'], a: 0, fb: 'Objetos → つ: みっつ.' },
      { s: '"Dos personas" = ___', opts: ['ふたり', 'にり', 'ににん', 'ふたつ'], a: 0, fb: 'Personas: 2 es irregular → ふたり.' },
      { s: '"10" en japonés es ___', opts: ['じゅう', 'ひゃく', 'せん', 'ご'], a: 0, fb: 'じゅう = 10.' },
      { s: '"Las cuatro" (4:00) = ___', opts: ['よじ', 'しじ', 'よんじ', 'よにん'], a: 0, fb: 'Irregular: よじ.' },
      { s: 'El contador para personas es ___', opts: ['人 (にん)', '円 (えん)', '時 (じ)', 'つ'], a: 0, fb: 'さんにん, よにん…' },
      { s: '"20" en japonés es ___', opts: ['にじゅう', 'じゅうに', 'にひゃく', 'ふたじゅう'], a: 0, fb: '2×10 = にじゅう.' },
      { s: 'El contador general para objetos usa lecturas como ___', opts: ['ひとつ・ふたつ・みっつ', 'ひとり・ふたり', 'いち・に・さん solo', 'えん・じ'], a: 0, fb: 'つ: ひとつ, ふたつ, みっつ…' },
      { s: '"1000 yenes" = ___', opts: ['せんえん', 'ひゃくえん', 'まんえん', 'じゅうえん'], a: 0, fb: 'せん = 1000.' },
      { s: '"Tengo 25 años" = にじゅうご___です', opts: ['さい', 'にん', 'じ', 'えん'], a: 0, fb: 'Edad → さい.' },
      { s: '¿Es correcto "りんごを さん" para "tres manzanas"?', opts: ['No: りんごを みっつ', 'Sí', 'Solo informal', 'Solo escrito'], a: 0, fb: 'Hace falta un contador (つ).' },
    ],
  },

  // ───────────────────────── 10. ADJETIVOS い ─────────────────────────
  {
    slug: 'adjetivos-i',
    order: 10,
    title: 'Adjetivos い — おおきい, たかい, おいしい',
    shortTitle: 'Adjetivos い',
    icon: '🎨',
    seoTitle: 'Los adjetivos い en japonés: cómo usarlos y conjugarlos',
    seoDescription: 'Qué son los adjetivos い en japonés (おおきい, たかい, おいしい), cómo se usan ante un sustantivo y con です, y su negativo ～くない. Con ejemplos y ejercicios A1.',
    keywords: ['adjetivos i japones', 'i adjetivos', 'おおきい たかい', 'adjetivos japoneses N5', 'gramatica japonesa'],
    intro: [
      'El japonés tiene dos clases de adjetivos, y la primera son los adjetivos い (i-keiyōshi), llamados así porque terminan en い: おおきい (grande), ちいさい (pequeño), たかい (caro/alto), やすい (barato), おいしい (rico), あたらしい (nuevo). Son una clase muy regular y la mitad del sistema adjetival.',
      'Se usan de dos formas. Ante un sustantivo, van directamente delante, sin nada en medio: おおきい いえ ("casa grande"), おいしい りょうり ("comida rica"). Como predicado, van con です: この いえは おおきいです ("esta casa es grande"). La い se mantiene siempre.',
      'Lo característico es que los adjetivos い se CONJUGAN solos (sin です): el negativo cambia la い final por くない (おおきくない, "no es grande") y el pasado por かった (おおきかった, "era grande"). です se añade por cortesía pero el adjetivo ya lleva la marca.',
    ],
    sections: [
      {
        heading: 'Ante sustantivo y con です',
        body: [
          'Atributivo (antes del sustantivo): adjetivo い + sustantivo, sin partícula. あたらしい くるま ("coche nuevo"), たかい とけい ("reloj caro"). Predicativo: sustantivo は adjetivoいです. この くるまは あたらしいです ("este coche es nuevo").',
          'A diferencia del tema del posesivo, los adjetivos い NUNCA llevan の: おおきい いえ, no おおきいの いえ.',
        ],
      },
      {
        heading: 'El negativo ～くない',
        body: [
          'Para negar, quita la い final y añade くない: おおきい → おおきくない ("no es grande"), たかい → たかくない ("no es caro"). Con です: たかくないです ("no es caro", cortés).',
          'Una sola irregularidad importante: いい (bueno) se conjuga sobre よ-, no い-. El negativo de いい es よくない (no いくない), y el pasado よかった. Conviene memorizarla desde el principio.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Adjetivos い: formas',
        headers: ['Adjetivo', 'Afirmativo', 'Negativo', 'Significado'],
        rows: [
          ['おおきい', 'おおきいです', 'おおきくないです', 'grande / no grande'],
          ['たかい', 'たかいです', 'たかくないです', 'caro / no caro'],
          ['おいしい', 'おいしいです', 'おいしくないです', 'rico / no rico'],
          ['いい (irreg.)', 'いいです', 'よくないです', 'bueno / no bueno'],
        ],
      },
    ],
    contrast: [
      { es: 'Una casa grande', en: 'おおきい いえ', note: 'Adjetivo い + sustantivo, sin の.' },
      { es: 'Esta comida es rica', en: 'この りょうりは おいしいです', note: 'Predicado: adjetivoいです.' },
      { es: 'No es caro', en: 'たかくないです', note: 'Negativo: い → くない.' },
      { es: 'Un coche nuevo', en: 'あたらしい くるま', note: 'Atributivo directo.' },
      { es: 'No es bueno', en: 'よくないです', note: 'いい es irregular → よくない.' },
    ],
    examples: [
      { en: 'おおきい いえですね。(Ōkii ie desu ne.)', es: 'Es una casa grande, ¿verdad?', note: 'Atributivo.' },
      { en: 'この ケーキは おいしいです。(…oishii desu.)', es: 'Este pastel está rico.', note: 'Predicativo + です.' },
      { en: 'この とけいは たかくないです。(…takakunai desu.)', es: 'Este reloj no es caro.', note: 'Negativo くない.' },
      { en: 'あたらしい くるまが ほしいです。(…hoshii desu.)', es: 'Quiero un coche nuevo.', note: 'Atributivo + ほしい.' },
      { en: 'てんきが いいです。(Tenki ga ii desu.)', es: 'Hace buen tiempo.', note: 'いい (bueno).' },
      { en: 'てんきが よくないです。(…yokunai desu.)', es: 'No hace buen tiempo.', note: 'いい → よくない (irregular).' },
      { en: 'やすい レストランです。(Yasui resutoran desu.)', es: 'Es un restaurante barato.', note: 'やすい + sustantivo.' },
    ],
    commonMistakes: [
      { wrong: 'おおきいの いえ', right: 'おおきい いえ', note: 'Los adjetivos い no llevan の.' },
      { wrong: 'おおきいくない', right: 'おおきくない', note: 'Se quita la い final antes de くない.' },
      { wrong: 'いくない (negativo de いい)', right: 'よくない', note: 'いい es irregular: negativo よくない.' },
      { wrong: 'quitar la い ante el sustantivo (おおき いえ)', right: 'おおきい いえ', note: 'La い se mantiene en la forma atributiva.' },
      { wrong: 'たかいじゃない', right: 'たかくない', note: 'じゃない es para sustantivos/adjetivos な, no para い.' },
    ],
    tip: 'Los adjetivos い se pegan directamente al sustantivo (おおきい いえ, sin の) y se niegan cambiando い → くない (たかくない). Memoriza la única gran irregular: いい → よくない / よかった.',
    questions: [
      { s: '"casa grande" = ___ いえ', opts: ['おおきい', 'おおきいの', 'おおきな', 'おおき'], a: 0, fb: 'Adjetivo い directo, sin の: おおきい いえ.' },
      { s: '"Este pastel está rico" = この ケーキは ___', opts: ['おいしいです', 'おいしいの', 'おいしくない', 'おいしな'], a: 0, fb: 'Predicativo: おいしいです.' },
      { s: 'El negativo de たかい (caro) es ___', opts: ['たかくない', 'たかいない', 'たかじゃない', 'たかくないい'], a: 0, fb: 'い → くない: たかくない.' },
      { s: '¿Llevan の los adjetivos い ante un sustantivo?', opts: ['No: おおきい いえ', 'Sí: おおきいの いえ', 'Solo en plural', 'Solo formal'], a: 0, fb: 'Los adjetivos い no usan の.' },
      { s: 'Para negar un adjetivo い se quita la い y se añade ___', opts: ['くない', 'じゃない', 'ない', 'ません'], a: 0, fb: 'おおきい → おおきくない.' },
      { s: 'El negativo de いい (bueno) es ___', opts: ['よくない', 'いくない', 'いいくない', 'いじゃない'], a: 0, fb: 'いい es irregular: よくない.' },
      { s: '"un coche nuevo" = ___ くるま', opts: ['あたらしい', 'あたらしいの', 'あたらしな', 'あたらし'], a: 0, fb: 'あたらしい + sustantivo.' },
      { s: '"No es caro" (cortés) = ___', opts: ['たかくないです', 'たかいじゃないです', 'たかいないです', 'たかません'], a: 0, fb: 'たかくない + です.' },
      { s: 'Los adjetivos い terminan en ___', opts: ['い', 'な', 'の', 'だ'], a: 0, fb: 'おおきい, たかい, おいしい.' },
      { s: '"Es un restaurante barato" = ___ レストランです', opts: ['やすい', 'やすいの', 'やすな', 'やす'], a: 0, fb: 'やすい + sustantivo.' },
      { s: 'El pasado de おおきい es ___', opts: ['おおきかった', 'おおきいでした', 'おおきくでした', 'おおきだった'], a: 0, fb: 'い → かった: おおきかった.' },
      { s: '¿Es correcto "おおきいの いえ"?', opts: ['No: おおきい いえ', 'Sí', 'Solo informal', 'Solo escrito'], a: 0, fb: 'Sin の: おおきい いえ.' },
    ],
  },

  // ───────────────────────── 11. ADJETIVOS な ─────────────────────────
  {
    slug: 'adjetivos-na',
    order: 11,
    title: 'Adjetivos な — きれい, げんき, しずか',
    shortTitle: 'Adjetivos な',
    icon: '🌸',
    seoTitle: 'Los adjetivos な en japonés: きれい, げんき y la partícula な',
    seoDescription: 'Qué son los adjetivos な en japonés, cómo añaden な ante un sustantivo (きれいな はな) y se niegan con じゃない. Diferencia con los adjetivos い. Ejercicios A1.',
    keywords: ['adjetivos na japones', 'na adjetivos', 'きれい げんき しずか', 'adjetivos japoneses N5', 'gramatica japonesa'],
    intro: [
      'La segunda clase de adjetivos son los adjetivos な (na-keiyōshi). A diferencia de los い, no terminan en い (o si lo hacen, como きれい, es engañoso) y se comportan casi como sustantivos. Ejemplos: きれい (bonito/limpio), げんき (sano/animado), しずか (tranquilo), ゆうめい (famoso), べんり (cómodo), すき (gustar).',
      'Su rasgo distintivo: cuando van ANTES de un sustantivo, necesitan la partícula な en medio. きれいな はな ("flor bonita"), しずかな まち ("ciudad tranquila"), ゆうめいな ひと ("persona famosa"). De ahí su nombre. Los adjetivos い, en cambio, no llevan nada.',
      'Como predicado (al final, con です), NO llevan な: この はなは きれいです ("esta flor es bonita"). Y se niegan como los sustantivos, con じゃありません / じゃない: きれいじゃありません ("no es bonito"). Por eso se dice que "funcionan como sustantivos".',
    ],
    sections: [
      {
        heading: 'な ante el sustantivo, です al final',
        body: [
          'Atributivo (antes del sustantivo): adjetivoな + sustantivo. しずかな へや ("habitación tranquila"), べんりな みせ ("tienda cómoda"). Predicativo (al final): adjetivo + です, SIN な. この へやは しずかです.',
          'El error nº1 es poner な al final (しずかなです ✗) o quitarla ante el sustantivo (しずか へや ✗). Regla: な solo aparece entre el adjetivo な y el sustantivo que describe.',
        ],
      },
      {
        heading: 'Negación con じゃありません y el caso すき',
        body: [
          'Negativo: como los sustantivos, con じゃありません (formal: ではありません) o じゃない (informal). きれいじゃありません ("no es bonito"), げんきじゃない ("no está bien/animado").',
          'すき (gustar) y きらい (no gustar) son adjetivos な y se construyen con が: にほんごが すきです ("me gusta el japonés"), やさいが きらいです ("no me gustan las verduras"). Ante sustantivo también llevan な: すきな たべもの ("comida favorita").',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Adjetivos な: con sustantivo vs predicado',
        headers: ['Adjetivo', 'Ante sustantivo', 'Predicado', 'Negativo'],
        rows: [
          ['きれい', 'きれいな はな', 'きれいです', 'きれいじゃありません'],
          ['しずか', 'しずかな まち', 'しずかです', 'しずかじゃありません'],
          ['げんき', 'げんきな こども', 'げんきです', 'げんきじゃありません'],
          ['すき', 'すきな たべもの', '〜が すきです', '〜が すきじゃありません'],
        ],
      },
    ],
    contrast: [
      { es: 'Una flor bonita', en: 'きれいな はな', note: 'Adjetivo な + な + sustantivo.' },
      { es: 'Esta ciudad es tranquila', en: 'この まちは しずかです', note: 'Predicado: SIN な.' },
      { es: 'No es famoso', en: 'ゆうめいじゃありません', note: 'Negación como un sustantivo.' },
      { es: 'Me gusta el japonés', en: 'にほんごが すきです', note: 'すき (な) se construye con が.' },
      { es: 'Una persona sana/animada', en: 'げんきな ひと', note: 'げんき + な + sustantivo.' },
    ],
    examples: [
      { en: 'きれいな はなですね。(Kirei na hana desu ne.)', es: 'Es una flor bonita, ¿verdad?', note: 'な atributivo.' },
      { en: 'この まちは しずかです。(…shizuka desu.)', es: 'Esta ciudad es tranquila.', note: 'Predicado sin な.' },
      { en: 'たなかさんは ゆうめいじゃありません。(…ja arimasen.)', es: 'El Sr. Tanaka no es famoso.', note: 'Negativo.' },
      { en: 'にほんごが すきです。(Nihongo ga suki desu.)', es: 'Me gusta el japonés.', note: 'すき + が.' },
      { en: 'べんりな みせです。(Benri na mise desu.)', es: 'Es una tienda cómoda.', note: 'べんり + な.' },
      { en: 'やさいが きらいです。(Yasai ga kirai desu.)', es: 'No me gustan las verduras.', note: 'きらい + が.' },
      { en: 'すきな たべものは すしです。(Suki na tabemono wa sushi desu.)', es: 'Mi comida favorita es el sushi.', note: 'すきな + sustantivo.' },
    ],
    commonMistakes: [
      { wrong: 'きれい はな (sin な)', right: 'きれいな はな', note: 'Ante el sustantivo, el adjetivo な necesita な.' },
      { wrong: 'しずかなです (な al final)', right: 'しずかです', note: 'En predicado no se usa な.' },
      { wrong: 'きれくない (como adjetivo い)', right: 'きれいじゃありません', note: 'Los な se niegan como sustantivos.' },
      { wrong: 'にほんごを すきです', right: 'にほんごが すきです', note: 'すき/きらい usan が, no を.' },
      { wrong: 'tratar きれい como adjetivo い', right: 'きれい es adjetivo な', note: 'Termina en い pero es な: きれいな.' },
    ],
    tip: 'Regla de oro de los adjetivos な: な aparece SOLO entre el adjetivo y el sustantivo (きれいな はな). Al final, solo です (きれいです). Y se niegan como sustantivos: じゃありません. Ojo con きれい: parece い pero es な.',
    questions: [
      { s: '"una flor bonita" = きれい___ はな', opts: ['な', 'の', 'い', 'を'], a: 0, fb: 'Adjetivo な + な + sustantivo.' },
      { s: '"Esta ciudad es tranquila" = この まちは ___', opts: ['しずかです', 'しずかなです', 'しずかいです', 'しずくない'], a: 0, fb: 'Predicado: sin な.' },
      { s: 'Los adjetivos な, ante un sustantivo, añaden ___', opts: ['な', 'の', 'い', 'で'], a: 0, fb: 'きれいな, しずかな, げんきな.' },
      { s: 'El negativo de きれい es ___', opts: ['きれいじゃありません', 'きれくない', 'きれいません', 'きれいない'], a: 0, fb: 'Se niega como sustantivo: じゃありません.' },
      { s: '"Me gusta el japonés" = にほんご___ すきです', opts: ['が', 'を', 'は', 'に'], a: 0, fb: 'すき se construye con が.' },
      { s: '¿Lleva な al final, como predicado? (この へやは しずか__です)', opts: ['No lleva な: しずかです', 'Sí: しずかなです', 'Lleva い', 'Lleva の'], a: 0, fb: 'En predicado no hay な.' },
      { s: '"una tienda cómoda" = べんり___ みせ', opts: ['な', 'の', 'い', 'が'], a: 0, fb: 'べんりな + sustantivo.' },
      { s: 'きれい (bonito) es un adjetivo ___', opts: ['な (aunque acabe en い)', 'い', 'sustantivo puro', 'verbo'], a: 0, fb: 'Es engañoso: きれい es adjetivo な.' },
      { s: '"No me gustan las verduras" = やさい___ きらいです', opts: ['が', 'を', 'は', 'に'], a: 0, fb: 'きらい usa が.' },
      { s: '"una persona famosa" = ゆうめい___ ひと', opts: ['な', 'の', 'い', 'を'], a: 0, fb: 'ゆうめいな + sustantivo.' },
      { s: '"mi comida favorita" = ___ たべもの', opts: ['すきな', 'すきの', 'すきい', 'すき'], a: 0, fb: 'すきな + sustantivo.' },
      { s: '¿Es correcto "きれい はな"?', opts: ['No: きれいな はな', 'Sí', 'Solo informal', 'Solo escrito'], a: 0, fb: 'Falta な ante el sustantivo.' },
    ],
  },

  // ───────────────────────── 12. NEGACIÓN ─────────────────────────
  {
    slug: 'negacion-masen-kunai-janai',
    order: 12,
    title: 'La negación: ません, ～くない, じゃない',
    shortTitle: 'Negación (ません)',
    icon: '🚫',
    seoTitle: 'La negación en japonés: ません, くない y じゃありません',
    seoDescription: 'Cómo negar en japonés según el tipo de palabra: verbos (ません), adjetivos い (くない), adjetivos な y sustantivos (じゃありません). Tabla, ejemplos y ejercicios A1.',
    keywords: ['negacion japones', 'ません くない じゃない', 'negar en japones', 'janai arimasen', 'gramatica N5'],
    intro: [
      'En japonés, "no" no es una sola palabra: la negación depende del tipo de palabra que niegas. Hay tres patrones que ya has visto por separado y que conviene reunir: verbos → ～ません, adjetivos い → ～くない(です), y adjetivos な / sustantivos → じゃありません.',
      'Verbos: cambia ます por ません. たべます → たべません ("no como"), いきます → いきません ("no voy"). Es la negación cortés del presente. Adjetivos い: quita la い y añade くない. たかい → たかくない ("no es caro"), おいしい → おいしくない.',
      'Adjetivos な y sustantivos: se niegan con じゃありません (formal: ではありません) o じゃない (informal). がくせいじゃありません ("no soy estudiante"), しずかじゃありません ("no es tranquilo"). Saber identificar qué tipo de palabra tienes delante te dice automáticamente qué negación usar.',
    ],
    sections: [
      {
        heading: 'Los tres patrones',
        body: [
          'Verbo: ～ます → ～ません (のみません, no bebo). Adjetivo い: ～い → ～くない (さむくない, no hace frío). Adjetivo な / sustantivo: + じゃありません (げんきじゃありません, no está bien; ほんじゃありません, no es un libro).',
          'La irregular de siempre: いい (bueno) → よくない (no いくない). Y recuerda que あります se niega como verbo → ありません, no "あらない".',
        ],
      },
      {
        heading: 'Registro: じゃありません vs じゃない vs ではありません',
        body: [
          'ではありません = formal/escrito. じゃありません = cortés estándar (la contracción de では). じゃない = informal/coloquial. Las tres niegan sustantivos y adjetivos な: がくせいではありません / がくせいじゃありません / がくせいじゃない.',
          'Para A1, usa じゃありません en conversación cortés. Reconoce じゃない en habla casual y ではありません en textos formales: son la misma idea con distinto nivel de formalidad.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'La negación según el tipo de palabra',
        headers: ['Tipo', 'Afirmativo', 'Negativo', 'Ejemplo'],
        rows: [
          ['Verbo', 'たべます', 'たべません', 'no como'],
          ['Adjetivo い', 'たかいです', 'たかくないです', 'no es caro'],
          ['Adjetivo な', 'しずかです', 'しずかじゃありません', 'no es tranquilo'],
          ['Sustantivo (です)', 'がくせいです', 'がくせいじゃありません', 'no soy estudiante'],
        ],
      },
    ],
    contrast: [
      { es: 'No como carne', en: 'にくを たべません', note: 'Verbo → ません.' },
      { es: 'No es caro', en: 'たかくないです', note: 'Adjetivo い → くない.' },
      { es: 'No es tranquilo', en: 'しずかじゃありません', note: 'Adjetivo な → じゃありません.' },
      { es: 'No soy estudiante', en: 'がくせいじゃありません', note: 'Sustantivo → じゃありません.' },
      { es: 'No hace buen tiempo', en: 'てんきが よくないです', note: 'いい → よくない (irregular).' },
    ],
    examples: [
      { en: 'コーヒーを のみません。(Kōhī o nomimasen.)', es: 'No bebo café.', note: 'Verbo → ません.' },
      { en: 'この とけいは たかくないです。(…takakunai desu.)', es: 'Este reloj no es caro.', note: 'Adjetivo い.' },
      { en: 'この まちは しずかじゃありません。(…ja arimasen.)', es: 'Esta ciudad no es tranquila.', note: 'Adjetivo な.' },
      { en: 'わたしは せんせいじゃありません。(…ja arimasen.)', es: 'No soy profesor.', note: 'Sustantivo.' },
      { en: 'じかんが ありません。(Jikan ga arimasen.)', es: 'No tengo tiempo.', note: 'あります → ありません.' },
      { en: 'にほんごは むずかしくないです。(…muzukashikunai desu.)', es: 'El japonés no es difícil.', note: 'Adjetivo い.' },
      { en: 'すしは すきじゃない。(Sushi wa suki janai.)', es: 'No me gusta el sushi (informal).', note: 'じゃない coloquial.' },
    ],
    commonMistakes: [
      { wrong: 'negar un verbo con じゃない (たべるじゃない)', right: 'たべません', note: 'Los verbos se niegan con ません.' },
      { wrong: 'たかいじゃありません', right: 'たかくないです', note: 'Los adjetivos い usan くない, no じゃありません.' },
      { wrong: 'しずかくない (adjetivo な con くない)', right: 'しずかじゃありません', note: 'Los な se niegan como sustantivos.' },
      { wrong: 'いくない (negativo de いい)', right: 'よくない', note: 'いい es irregular.' },
      { wrong: 'あらない (negativo de あります)', right: 'ありません', note: 'Se niega como verbo cortés.' },
    ],
    tip: 'Identifica la palabra y aplica su patrón: verbo → ません, adjetivo い → くない, adjetivo な/sustantivo → じゃありません. Memoriza las trampas: いい→よくない y あります→ありません.',
    questions: [
      { s: '"No como carne" = にくを ___', opts: ['たべません', 'たべない', 'たべじゃない', 'たべくない'], a: 0, fb: 'Verbo → ません.' },
      { s: '"No es caro" = たか___です', opts: ['くない', 'じゃない', 'ません', 'ない'], a: 0, fb: 'Adjetivo い → くない.' },
      { s: '"No soy estudiante" = がくせい___', opts: ['じゃありません', 'くないです', 'ません', 'ないです'], a: 0, fb: 'Sustantivo → じゃありません.' },
      { s: 'Los verbos se niegan cambiando ます por ___', opts: ['ません', 'くない', 'じゃない', 'ない'], a: 0, fb: 'たべます → たべません.' },
      { s: 'Los adjetivos い se niegan con ___', opts: ['くない', 'じゃない', 'ません', 'では'], a: 0, fb: 'たかい → たかくない.' },
      { s: '"No es tranquilo" (しずか, adjetivo な) = しずか___', opts: ['じゃありません', 'くないです', 'ません', 'ない'], a: 0, fb: 'Adjetivo な → じゃありません.' },
      { s: 'El negativo de いい (bueno) es ___', opts: ['よくない', 'いくない', 'いいじゃない', 'いません'], a: 0, fb: 'いい es irregular: よくない.' },
      { s: 'El negativo de あります es ___', opts: ['ありません', 'あらない', 'ありじゃない', 'あくない'], a: 0, fb: 'Se niega como verbo: ありません.' },
      { s: 'La forma informal de じゃありません es ___', opts: ['じゃない', 'ではない', 'ません', 'くない'], a: 0, fb: 'じゃない (coloquial).' },
      { s: '"El japonés no es difícil" = にほんごは むずかし___です', opts: ['くない', 'じゃない', 'ません', 'では'], a: 0, fb: 'むずかしい (adjetivo い) → むずかしくない.' },
      { s: '¿Es correcto "たかいじゃありません"?', opts: ['No: たかくないです', 'Sí', 'Solo informal', 'Solo escrito'], a: 0, fb: 'Los adjetivos い usan くない.' },
      { s: '"No bebo café" = コーヒーを ___', opts: ['のみません', 'のまない', 'のみくない', 'のみじゃない'], a: 0, fb: 'Verbo → ません.' },
    ],
  },

  // ───────────────────────── 13. PASADO ─────────────────────────
  {
    slug: 'pasado-mashita-deshita',
    order: 13,
    title: 'El pasado: ました, でした, ～かった',
    shortTitle: 'Pasado (ました)',
    icon: '⏪',
    seoTitle: 'El pasado en japonés: ました, でした y ～かったです',
    seoDescription: 'Cómo formar el pasado en japonés: verbos (ました), sustantivos y adjetivos な (でした), adjetivos い (～かった). Con negativos, tabla, ejemplos y ejercicios A1.',
    keywords: ['pasado japones', 'ました でした', 'かった', 'tiempo pasado japones', 'gramatica N5'],
    intro: [
      'El pasado japonés es muy regular y sigue la misma lógica de "según el tipo de palabra" que la negación. Verbos: ます → ました ("comí" = たべました). Sustantivos y adjetivos な: です → でした ("era estudiante" = がくせいでした). Adjetivos い: い → かった ("era caro" = たかかった).',
      'Como el presente, el pasado no cambia por persona: いきました vale para "fui, fuiste, fue…". Y mantiene el orden SOV con el verbo al final. La marca de pasado simplemente reemplaza la terminación del presente.',
      'Los negativos del pasado: verbos → ませんでした ("no comí" = たべませんでした); sustantivos/adjetivos な → じゃありませんでした; adjetivos い → くなかった(です). Con estas formas ya hablas del ayer en cualquier registro.',
    ],
    sections: [
      {
        heading: 'Afirmativo: ました / でした / かった',
        body: [
          'Verbo: ました. いきます → いきました (fui), たべます → たべました (comí). Sustantivo y adjetivo な: でした. がくせいです → がくせいでした (era estudiante), しずかです → しずかでした (era tranquilo). Adjetivo い: い → かった + です. たかい → たかかったです (era caro), おいしい → おいしかったです.',
          '¡Ojo! Los adjetivos い NO usan でした. "Era caro" es たかかったです, no たかいでした. Es el error más típico.',
        ],
      },
      {
        heading: 'Negativo del pasado',
        body: [
          'Verbo: ませんでした. いきませんでした (no fui). Sustantivo / adjetivo な: じゃありませんでした. がくせいじゃありませんでした (no era estudiante). Adjetivo い: くなかったです. たかくなかったです (no era caro).',
          'Resumen de adjetivos い en cuatro formas: たかいです (es caro), たかくないです (no es caro), たかかったです (era caro), たかくなかったです (no era caro). Un sistema cerrado y predecible.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'El pasado según el tipo de palabra',
        headers: ['Tipo', 'Presente', 'Pasado', 'Pasado negativo'],
        rows: [
          ['Verbo', 'たべます', 'たべました', 'たべませんでした'],
          ['Sustantivo', 'がくせいです', 'がくせいでした', 'がくせいじゃありませんでした'],
          ['Adjetivo な', 'しずかです', 'しずかでした', 'しずかじゃありませんでした'],
          ['Adjetivo い', 'たかいです', 'たかかったです', 'たかくなかったです'],
        ],
      },
    ],
    contrast: [
      { es: 'Ayer fui a Tokio', en: 'きのう とうきょうへ いきました', note: 'Verbo → ました.' },
      { es: 'Era estudiante', en: 'がくせいでした', note: 'Sustantivo → でした.' },
      { es: 'Estaba rico', en: 'おいしかったです', note: 'Adjetivo い → かった (¡no おいしいでした!).' },
      { es: 'No fui', en: 'いきませんでした', note: 'Pasado negativo del verbo.' },
      { es: 'No era tranquilo', en: 'しずかじゃありませんでした', note: 'Adjetivo な en pasado negativo.' },
    ],
    examples: [
      { en: 'きのう えいがを みました。(…mimashita.)', es: 'Ayer vi una película.', note: 'みます → みました.' },
      { en: 'テストは むずかしかったです。(…muzukashikatta desu.)', es: 'El examen fue difícil.', note: 'Adjetivo い → かった.' },
      { en: 'りょこうは たのしかったです。(…tanoshikatta desu.)', es: 'El viaje fue divertido.', note: 'たのしい → たのしかった.' },
      { en: 'がくせいでした。(Gakusei deshita.)', es: 'Era estudiante.', note: 'Sustantivo → でした.' },
      { en: 'きのうは あめでした。(Kinō wa ame deshita.)', es: 'Ayer fue lluvioso (hubo lluvia).', note: 'あめ + でした.' },
      { en: 'パーティーへ いきませんでした。(…ikimasen deshita.)', es: 'No fui a la fiesta.', note: 'Pasado negativo del verbo.' },
      { en: 'えいがは おもしろくなかったです。(…omoshirokunakatta desu.)', es: 'La película no fue interesante.', note: 'Adjetivo い, pasado negativo.' },
    ],
    commonMistakes: [
      { wrong: 'たかいでした (para "era caro")', right: 'たかかったです', note: 'Los adjetivos い no usan でした.' },
      { wrong: 'たべましたでした', right: 'たべました', note: 'El verbo ya marca el pasado con ました.' },
      { wrong: 'いきませんかった', right: 'いきませんでした', note: 'Pasado negativo del verbo = ませんでした.' },
      { wrong: 'おいしいかった', right: 'おいしかった', note: 'Se quita la い antes de かった.' },
      { wrong: 'がくせいかった', right: 'がくせいでした', note: 'Los sustantivos usan でした, no かった.' },
    ],
    tip: 'Pasado por tipo: verbo → ました, sustantivo/な → でした, adjetivo い → かった. La trampa eterna: "era caro" es たかかったです, NUNCA たかいでした. Negativos: ませんでした / じゃありませんでした / くなかったです.',
    questions: [
      { s: '"Ayer vi una película" = きのう えいがを ___', opts: ['みました', 'みます', 'みでした', 'みかった'], a: 0, fb: 'Verbo → ました.' },
      { s: '"Era estudiante" = がくせい___', opts: ['でした', 'かった', 'ました', 'くなかった'], a: 0, fb: 'Sustantivo → でした.' },
      { s: '"Estaba rico" = おいし___です', opts: ['かった', 'でした', 'ました', 'くなかった'], a: 0, fb: 'Adjetivo い → かった.' },
      { s: 'Los verbos forman el pasado con ___', opts: ['ました', 'でした', 'かった', 'です'], a: 0, fb: 'たべます → たべました.' },
      { s: 'Los adjetivos い forman el pasado con ___', opts: ['かった', 'でした', 'ました', 'じゃない'], a: 0, fb: 'たかい → たかかった.' },
      { s: '"El examen fue difícil" = テストは ___です', opts: ['むずかしかった', 'むずかしいでした', 'むずかしでした', 'むずかしました'], a: 0, fb: 'むずかしい → むずかしかった.' },
      { s: '"No fui" = ___', opts: ['いきませんでした', 'いきませんかった', 'いかなかった', 'いきでした'], a: 0, fb: 'Pasado negativo del verbo: ませんでした.' },
      { s: '"Ayer fue lluvioso" = きのうは あめ___', opts: ['でした', 'かった', 'ました', 'くない'], a: 0, fb: 'Sustantivo → でした.' },
      { s: 'El pasado negativo de un adjetivo い (たかい) es ___', opts: ['たかくなかったです', 'たかいでした', 'たかくないでした', 'たかかったじゃない'], a: 0, fb: 'たかくなかったです.' },
      { s: '¿Es correcto "たかいでした" para "era caro"?', opts: ['No: たかかったです', 'Sí', 'Solo informal', 'Solo escrito'], a: 0, fb: 'Los adjetivos い usan かった.' },
      { s: '"La película no fue interesante" = おもしろ___です', opts: ['くなかった', 'いでした', 'じゃなかった', 'ませんでした'], a: 0, fb: 'おもしろい → おもしろくなかった.' },
      { s: '"No fui a la fiesta" = パーティーへ ___', opts: ['いきませんでした', 'いきましたでした', 'いかないでした', 'いきでした'], a: 0, fb: 'ませんでした.' },
    ],
  },

  // ───────────────────────── 14. ～たい・～てください ─────────────────────────
  {
    slug: 'querer-tai-y-pedir-tekudasai',
    order: 14,
    title: '～たい・～てください — Querer hacer y pedir',
    shortTitle: 'Querer / Pedir',
    icon: '🙏',
    seoTitle: 'Cómo decir "quiero..." y "por favor" en japonés: ～たい y ～てください',
    seoDescription: 'Expresa deseos con ～たいです (quiero hacer) y peticiones con ～てください (por favor haz) y ～をください (deme) en japonés A1. Con ejemplos y ejercicios.',
    keywords: ['たい てください', 'quiero en japones', 'por favor japones', 'kudasai', 'tai desu', 'gramatica N5'],
    intro: [
      'Para expresar deseos y peticiones —dos funciones esenciales para sobrevivir en japonés— el A1 usa tres estructuras muy rentables: ～たいです ("quiero hacer…"), ～をください ("deme…, por favor") y ～てください ("haz…, por favor").',
      '～たいです expresa que TÚ quieres hacer algo. Se forma con la raíz del verbo ます + たいです: たべます → たべたいです ("quiero comer"), いきます → いきたいです ("quiero ir"). El objeto puede llevar を o が: すしを/が たべたいです.',
      'Para pedir cosas y acciones: ～をください = "deme ___" (みずを ください, "agua por favor"); ～てください = "por favor, haz ___", con la forma て del verbo (みて ください, "mire por favor"; まって ください, "espere por favor"). Con estas tres ya pides, deseas y das instrucciones básicas.',
    ],
    sections: [
      {
        heading: '～たいです: quiero hacer',
        body: [
          'Toma la base ます del verbo (quita ます) y añade たいです: のみます → のみたいです (quiero beber), みます → みたいです (quiero ver), いきます → いきたいです (quiero ir). El negativo es ～たくないです (いきたくないです, no quiero ir), igual que un adjetivo い.',
          '～たいです expresa el deseo del hablante (yo) o, en preguntas, del oyente (tú): なにを たべたいですか ("¿qué quieres comer?"). Para "querer una cosa" (sustantivo) se usa ～が ほしいです: くるまが ほしいです ("quiero un coche").',
        ],
      },
      {
        heading: '～をください y ～てください',
        body: [
          'Sustantivo + を ください = "deme ___, por favor": みずを ください, これを ください, コーヒーを ふたつ ください ("dos cafés, por favor"). Es la fórmula de tienda y restaurante por excelencia.',
          'Verbo en forma て + ください = "por favor, haz ___": みて ください (mire), きいて ください (escuche), まって ください (espere), もう いちど いって ください ("dígalo otra vez, por favor"). La forma て se aprende verbo a verbo; en A1 basta reconocer estas peticiones frecuentes.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Querer y pedir',
        headers: ['Estructura', 'Ejemplo', 'Significado'],
        rows: [
          ['～たいです', 'たべたいです', 'quiero comer'],
          ['～たくないです', 'いきたくないです', 'no quiero ir'],
          ['～が ほしいです', 'くるまが ほしいです', 'quiero un coche (cosa)'],
          ['～を ください', 'みずを ください', 'agua, por favor'],
          ['～て ください', 'まって ください', 'espere, por favor'],
        ],
      },
    ],
    contrast: [
      { es: 'Quiero comer sushi', en: 'すしを たべたいです', note: 'Base ます + たいです.' },
      { es: 'No quiero ir', en: 'いきたくないです', note: 'Negativo como adjetivo い: たくない.' },
      { es: 'Quiero un coche (cosa)', en: 'くるまが ほしいです', note: 'Para cosas: が ほしいです.' },
      { es: 'Agua, por favor', en: 'みずを ください', note: 'Sustantivo + を ください.' },
      { es: 'Espere, por favor', en: 'まって ください', note: 'Verbo en forma て + ください.' },
    ],
    examples: [
      { en: 'にほんへ いきたいです。(Nihon e ikitai desu.)', es: 'Quiero ir a Japón.', note: 'いきます → いきたいです.' },
      { en: 'なにを たべたいですか。(Nani o tabetai desu ka.)', es: '¿Qué quieres comer?', note: 'Pregunta de deseo.' },
      { en: 'きょうは いきたくないです。(…ikitakunai desu.)', es: 'Hoy no quiero ir.', note: 'Negativo たくない.' },
      { en: 'あたらしい くつが ほしいです。(…hoshii desu.)', es: 'Quiero zapatos nuevos.', note: 'が ほしいです (cosa).' },
      { en: 'コーヒーを ください。(Kōhī o kudasai.)', es: 'Un café, por favor.', note: 'を ください.' },
      { en: 'もう いちど いって ください。(…itte kudasai.)', es: 'Dígalo otra vez, por favor.', note: 'て + ください.' },
      { en: 'ちょっと まって ください。(Chotto matte kudasai.)', es: 'Espere un momento, por favor.', note: 'まって + ください.' },
    ],
    commonMistakes: [
      { wrong: 'たべるたいです', right: 'たべたいです', note: 'Se usa la base ます (たべ-), no el diccionario.' },
      { wrong: 'usar ～たい para "quiero una cosa"', right: '～が ほしいです', note: '～たい es para verbos (acciones); para cosas, ほしい.' },
      { wrong: 'いきたいじゃないです', right: 'いきたくないです', note: '～たい se niega como adjetivo い: たくない.' },
      { wrong: 'みずを てください', right: 'みずを ください', note: 'Con un sustantivo es を ください (no てください).' },
      { wrong: 'usar ～たい para la tercera persona sin más', right: 'en A1, ～たい es para yo/tú', note: 'El deseo de "él/ella" tiene otra forma; basta con yo/tú.' },
    ],
    tip: 'Tres comodines: para querer HACER algo → base ます + たいです; para querer una COSA → が ほしいです; para PEDIR → sustantivo を ください o verbo-て ください. Con ellos pides y deseas casi todo en A1.',
    questions: [
      { s: '"Quiero comer" = たべ___', opts: ['たいです', 'てください', 'ました', 'ません'], a: 0, fb: 'Base ます + たいです.' },
      { s: '"Quiero ir a Japón" = にほんへ ___', opts: ['いきたいです', 'いってください', 'いきました', 'いきません'], a: 0, fb: 'いきます → いきたいです.' },
      { s: '～たいです se forma sobre ___', opts: ['la base ます del verbo', 'el verbo de diccionario', 'el sustantivo', 'la forma て'], a: 0, fb: 'たべます → たべ + たいです.' },
      { s: '"Agua, por favor" = みずを ___', opts: ['ください', 'たいです', 'てください', 'ほしい'], a: 0, fb: 'Sustantivo + を ください.' },
      { s: '"Espere, por favor" = まって ___', opts: ['ください', 'たいです', 'ました', 'ほしい'], a: 0, fb: 'Verbo て + ください.' },
      { s: '"Quiero un coche" (cosa) = くるまが ___', opts: ['ほしいです', 'たいです', 'ください', 'します'], a: 0, fb: 'Para cosas: が ほしいです.' },
      { s: 'El negativo de いきたいです es ___', opts: ['いきたくないです', 'いきたいじゃない', 'いきません', 'いきたくありません→ok'], a: 0, fb: '～たい se niega como adjetivo い: たくない.' },
      { s: '"¿Qué quieres comer?" = なにを ___', opts: ['たべたいですか', 'たべてください', 'たべました', 'たべます'], a: 0, fb: 'たべたいですか.' },
      { s: 'Para pedir una ACCIÓN se usa ___', opts: ['verbo て + ください', 'sustantivo を ください', 'が ほしいです', '～たいです'], a: 0, fb: 'みて ください, まって ください.' },
      { s: '"Un café, por favor" = コーヒーを ___', opts: ['ください', 'たいです', 'ほしい', 'します'], a: 0, fb: 'を ください.' },
      { s: '¿Es correcto "たべるたいです"?', opts: ['No: たべたいです', 'Sí', 'Solo informal', 'Solo escrito'], a: 0, fb: 'Se usa la base ます: たべ + たいです.' },
      { s: '"Quiero zapatos nuevos" = あたらしい くつが ___', opts: ['ほしいです', 'たいです', 'ください', 'します'], a: 0, fb: 'Cosa → が ほしいです.' },
    ],
  },

  // ───────────────────────── 15. 疑問詞 ─────────────────────────
  {
    slug: 'palabras-interrogativas',
    order: 15,
    title: '疑問詞 — Las palabras interrogativas',
    shortTitle: 'Preguntar (なに, どこ…)',
    icon: '❓',
    seoTitle: 'Palabras interrogativas en japonés: なに, どこ, いつ, だれ, いくら',
    seoDescription: 'Aprende a preguntar en japonés con なに/なん (qué), どこ (dónde), いつ (cuándo), だれ (quién), いくら (cuánto), どうして (por qué) y la partícula か. Ejercicios A1.',
    keywords: ['palabras interrogativas japones', 'なに どこ いつ だれ', 'preguntar en japones', 'que donde cuando japones', 'gramatica N5'],
    intro: [
      'Preguntar en japonés es muy sistemático: NO se cambia el orden de la frase. La palabra interrogativa ocupa el lugar de la información que falta, y se añade か al final. Donde dirías "como sushi" (すしを たべます), para preguntar "¿qué comes?" pones なに en lugar de すし: なにを たべますか.',
      'Las interrogativas básicas: なに/なん (qué), だれ (quién), どこ (dónde), いつ (cuándo), どうして/なぜ (por qué), どう (cómo), いくら (cuánto, precio), いくつ (cuántos), どれ/どの/どちら (cuál). Con ellas y か cubres casi todas las preguntas del A1.',
      'Dos detalles útiles: なに se lee なん ("nan") delante de です y de ciertos sonidos (なんですか, "¿qué es?"; なんじ, "¿qué hora?"); y para "cuántos objetos/personas/años" se combinan los interrogativos con contadores (なんにん ¿cuántas personas?, なんじ ¿qué hora?, いくら ¿cuánto cuesta?).',
    ],
    sections: [
      {
        heading: 'Las interrogativas y か',
        body: [
          'なに/なん (qué): なにを しますか (¿qué haces?), これは なんですか (¿qué es esto?). だれ (quién): あのひとは だれですか (¿quién es esa persona?). どこ (dónde): トイレは どこですか (¿dónde está el baño?). いつ (cuándo): たんじょうびは いつですか (¿cuándo es tu cumpleaños?).',
          'いくら (cuánto, precio): これは いくらですか (¿cuánto cuesta esto?). どうして / なぜ (por qué): どうして いきませんか (¿por qué no vas?). どう (cómo): にほんは どうですか (¿qué tal Japón?). La か final convierte cualquier frase en pregunta.',
        ],
      },
      {
        heading: 'なに vs なん y los contadores interrogativos',
        body: [
          'なに se vuelve なん ("nan") ante です y ante sílabas de las filas d/t/n: なんですか (¿qué es?), なんの ほん (¿qué libro?), なんにん (¿cuántas personas?). Ante を, が, lugar, suele mantenerse なに: なにを, なにが.',
          'Para preguntar cantidades se une el interrogativo a un contador: なんじ (¿qué hora?), なんにん (¿cuántas personas?), なんさい / おいくつ (¿cuántos años?), いくら (¿cuánto dinero?), いくつ (¿cuántos objetos?). El sistema es coherente con los contadores que ya viste.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Palabras interrogativas',
        headers: ['Interrogativa', 'Significado', 'Ejemplo', 'Traducción'],
        rows: [
          ['なに / なん', 'qué', 'なにを たべますか', '¿qué comes?'],
          ['だれ', 'quién', 'だれですか', '¿quién es?'],
          ['どこ', 'dónde', 'どこですか', '¿dónde está?'],
          ['いつ', 'cuándo', 'いつ いきますか', '¿cuándo vas?'],
          ['いくら / どうして', 'cuánto / por qué', 'いくらですか / どうして', '¿cuánto? / ¿por qué?'],
        ],
      },
    ],
    contrast: [
      { es: '¿Qué comes?', en: 'なにを たべますか', note: 'Mismo orden que すしを たべます; solo cambia すし por なに.' },
      { es: '¿Quién es esa persona?', en: 'あのひとは だれですか', note: 'だれ = quién.' },
      { es: '¿Dónde está el baño?', en: 'トイレは どこですか', note: 'どこ = dónde.' },
      { es: '¿Cuánto cuesta esto?', en: 'これは いくらですか', note: 'いくら = precio.' },
      { es: '¿Qué es esto?', en: 'これは なんですか', note: 'なに → なん ante です.' },
    ],
    examples: [
      { en: 'これは なんですか。(Kore wa nan desu ka.)', es: '¿Qué es esto?', note: 'なん ante です.' },
      { en: 'なにを のみますか。(Nani o nomimasu ka.)', es: '¿Qué bebes?', note: 'なに + を.' },
      { en: 'たなかさんは どこですか。(…doko desu ka.)', es: '¿Dónde está el Sr. Tanaka?', note: 'どこ = dónde.' },
      { en: 'たんじょうびは いつですか。(…itsu desu ka.)', es: '¿Cuándo es tu cumpleaños?', note: 'いつ = cuándo.' },
      { en: 'これは いくらですか。(…ikura desu ka.)', es: '¿Cuánto cuesta esto?', note: 'いくら = precio.' },
      { en: 'いま なんじですか。(Ima nanji desu ka.)', es: '¿Qué hora es ahora?', note: 'なんじ = qué hora.' },
      { en: 'どうして いきませんか。(Dōshite ikimasen ka.)', es: '¿Por qué no vas?', note: 'どうして = por qué.' },
    ],
    commonMistakes: [
      { wrong: 'invertir el orden como en español', right: 'la interrogativa ocupa el hueco; el verbo va al final', note: 'なにを たべますか (orden de すしを たべます).' },
      { wrong: 'これは なにですか', right: 'これは なんですか', note: 'なに → なん ante です.' },
      { wrong: 'usar いくら para "cuántos objetos"', right: 'いくつ / なん+contador', note: 'いくら es solo precio.' },
      { wrong: 'olvidar か al final de la pregunta', right: 'añadir か', note: 'どこですか, no solo どこです.' },
      { wrong: 'なんじ→なにじ', right: 'なんじ (¿qué hora?)', note: 'Ante contador d/t/n se usa なん.' },
    ],
    tip: 'No inviertas nada: pon la interrogativa donde iría la respuesta y cierra con か. Recuerda なに→なん ante です y ante contadores (なんじ, なんにん). Y distingue いくら (precio) de いくつ (cuántos objetos).',
    questions: [
      { s: '"¿Qué comes?" = ___を たべますか', opts: ['なに', 'どこ', 'だれ', 'いつ'], a: 0, fb: 'なに = qué.' },
      { s: '"¿Qué es esto?" = これは ___ですか', opts: ['なん', 'なに', 'どこ', 'だれ'], a: 0, fb: 'なに → なん ante です.' },
      { s: '"¿Quién es?" = ___ですか', opts: ['だれ', 'なに', 'どこ', 'いつ'], a: 0, fb: 'だれ = quién.' },
      { s: '"¿Dónde está el baño?" = トイレは ___ですか', opts: ['どこ', 'いつ', 'だれ', 'なに'], a: 0, fb: 'どこ = dónde.' },
      { s: '"¿Cuándo vas?" = ___ いきますか', opts: ['いつ', 'どこ', 'なに', 'いくら'], a: 0, fb: 'いつ = cuándo.' },
      { s: '"¿Cuánto cuesta esto?" = これは ___ですか', opts: ['いくら', 'いくつ', 'なに', 'どこ'], a: 0, fb: 'いくら = precio.' },
      { s: 'Para hacer una pregunta se añade ___ al final', opts: ['か', 'は', 'を', 'の'], a: 0, fb: 'か convierte la frase en pregunta.' },
      { s: 'Al usar una interrogativa, el orden de la frase ___', opts: ['no cambia (verbo al final)', 'se invierte como en español', 'pone el verbo primero', 'elimina el tema'], a: 0, fb: 'La interrogativa ocupa el hueco de la respuesta.' },
      { s: '"¿Qué hora es?" = いま ___ですか', opts: ['なんじ', 'なにじ', 'いくら', 'どこ'], a: 0, fb: 'なに → なん ante contador: なんじ.' },
      { s: '"¿Por qué no vas?" = ___ いきませんか', opts: ['どうして', 'どこ', 'なに', 'いつ'], a: 0, fb: 'どうして / なぜ = por qué.' },
      { s: 'なに se transforma en なん ante ___', opts: ['です y los contadores d/t/n', 'を', 'が', 'el final de frase'], a: 0, fb: 'なんですか, なんじ, なんにん.' },
      { s: '¿Es correcto "これは なにですか"?', opts: ['Mejor: これは なんですか', 'Sí, siempre', 'Solo informal', 'Solo escrito'], a: 0, fb: 'Ante です se usa なん.' },
    ],
  },
];

export function getTopic(slug: string) {
  return findTopic(TOPICS, slug);
}

export function getTopicNav(slug: string) {
  return topicNav(TOPICS, slug);
}
