'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

const COLOR = '#bc002d';

interface VocabWord { word: string; romaji: string; es: string; emoji: string; example: string; exampleRom: string; exampleEs: string; }
interface VocabSet { id: string; name: string; romaji: string; nameEs: string; emoji: string; words: VocabWord[]; }

const SETS: VocabSet[] = [
  {
    id: 'familia', name: 'かぞく', romaji: 'kazoku', nameEs: 'La familia', emoji: '👨‍👩‍👧‍👦',
    words: [
      { word: 'おかあさん', romaji: 'okaasan', es: 'mamá (respetuoso)', emoji: '👩', example: 'おかあさんは せんせいです。', exampleRom: 'Okaasan wa sensei desu.', exampleEs: 'Mi mamá es profesora.' },
      { word: 'おとうさん', romaji: 'otousan', es: 'papá (respetuoso)', emoji: '👨', example: 'おとうさんは いしゃです。', exampleRom: 'Otousan wa isha desu.', exampleEs: 'Mi papá es médico.' },
      { word: 'あに', romaji: 'ani', es: 'hermano mayor (el mío)', emoji: '🧑', example: 'あには だいがくせいです。', exampleRom: 'Ani wa daigakusei desu.', exampleEs: 'Mi hermano mayor es universitario.' },
      { word: 'あね', romaji: 'ane', es: 'hermana mayor (la mía)', emoji: '👧', example: 'あねは かいしゃいんです。', exampleRom: 'Ane wa kaishain desu.', exampleEs: 'Mi hermana mayor es empleada.' },
      { word: 'おとうと', romaji: 'otouto', es: 'hermano menor (el mío)', emoji: '👦', example: 'おとうとは こうこうせいです。', exampleRom: 'Otouto wa kookoosei desu.', exampleEs: 'Mi hermano menor es de secundaria.' },
      { word: 'いもうと', romaji: 'imouto', es: 'hermana menor (la mía)', emoji: '👧', example: 'いもうとは かわいいです。', exampleRom: 'Imouto wa kawaii desu.', exampleEs: 'Mi hermana menor es linda.' },
      { word: 'おじいさん', romaji: 'ojiisan', es: 'abuelo', emoji: '👴', example: 'おじいさんは げんきです。', exampleRom: 'Ojiisan wa genki desu.', exampleEs: 'El abuelo está bien de salud.' },
      { word: 'おばあさん', romaji: 'obaasan', es: 'abuela', emoji: '👵', example: 'おばあさんは にほんごが じょうずです。', exampleRom: 'Obaasan wa nihongo ga jouzu desu.', exampleEs: 'La abuela habla bien japonés.' },
      { word: 'ともだち', romaji: 'tomodachi', es: 'amigo/a', emoji: '🤝', example: 'ともだちが たくさん います。', exampleRom: 'Tomodachi ga takusan imasu.', exampleEs: 'Tengo muchos amigos.' },
      { word: 'かぞく', romaji: 'kazoku', es: 'familia', emoji: '👨‍👩‍👧‍👦', example: 'かぞくが すきです。', exampleRom: 'Kazoku ga suki desu.', exampleEs: 'Me gusta (quiero a) mi familia.' },
    ],
  },
  {
    id: 'colores', name: 'いろ', romaji: 'iro', nameEs: 'Los colores', emoji: '🎨',
    words: [
      { word: 'あかい', romaji: 'akai', es: 'rojo/a', emoji: '🔴', example: 'りんごは あかいです。', exampleRom: 'Ringo wa akai desu.', exampleEs: 'La manzana es roja.' },
      { word: 'あおい', romaji: 'aoi', es: 'azul (y verde en algunos contextos)', emoji: '🔵', example: 'そらは あおいです。', exampleRom: 'Sora wa aoi desu.', exampleEs: 'El cielo es azul.' },
      { word: 'しろい', romaji: 'shiroi', es: 'blanco/a', emoji: '⬜', example: 'ゆきは しろいです。', exampleRom: 'Yuki wa shiroi desu.', exampleEs: 'La nieve es blanca.' },
      { word: 'くろい', romaji: 'kuroi', es: 'negro/a', emoji: '⬛', example: 'ねこは くろいです。', exampleRom: 'Neko wa kuroi desu.', exampleEs: 'El gato es negro.' },
      { word: 'きいろい', romaji: 'kiiroi', es: 'amarillo/a', emoji: '🟡', example: 'ひまわりは きいろいです。', exampleRom: 'Himawari wa kiiroi desu.', exampleEs: 'El girasol es amarillo.' },
      { word: 'みどり', romaji: 'midori', es: 'verde (color)', emoji: '🟢', example: 'みどりの き。', exampleRom: 'Midori no ki.', exampleEs: 'Un árbol verde.' },
      { word: 'むらさき', romaji: 'murasaki', es: 'morado/violeta', emoji: '🟣', example: 'むらさきの はな。', exampleRom: 'Murasaki no hana.', exampleEs: 'Flores moradas.' },
      { word: 'ちゃいろ', romaji: 'chairo', es: 'café/marrón', emoji: '🟫', example: 'くまは ちゃいろです。', exampleRom: 'Kuma wa chairo desu.', exampleEs: 'El oso es café.' },
      { word: 'ピンク', romaji: 'pinku', es: 'rosado (del inglés "pink")', emoji: '🩷', example: 'さくらは ピンクです。', exampleRom: 'Sakura wa pinku desu.', exampleEs: 'Los cerezos son rosados.' },
      { word: 'オレンジ', romaji: 'orenji', es: 'naranja (del inglés "orange")', emoji: '🟠', example: 'オレンジいろの くるま。', exampleRom: 'Orenji-iro no kuruma.', exampleEs: 'Un auto de color naranja.' },
    ],
  },
  {
    id: 'comida', name: 'たべもの', romaji: 'tabemono', nameEs: 'La comida', emoji: '🍽️',
    words: [
      { word: 'ごはん', romaji: 'gohan', es: 'arroz cocinado / comida (en general)', emoji: '🍚', example: 'ごはんを たべます。', exampleRom: 'Gohan o tabemasu.', exampleEs: 'Como (arroz/comida).' },
      { word: 'すし', romaji: 'sushi', es: 'sushi', emoji: '🍣', example: 'すしが すきです。', exampleRom: 'Sushi ga suki desu.', exampleEs: 'Me gusta el sushi.' },
      { word: 'ラーメン', romaji: 'raamen', es: 'ramen (fideos)', emoji: '🍜', example: 'ラーメンは おいしいです。', exampleRom: 'Raamen wa oishii desu.', exampleEs: 'El ramen está delicioso.' },
      { word: 'てんぷら', romaji: 'tenpura', es: 'tempura (fritura japonesa)', emoji: '🍤', example: 'てんぷらを たべました。', exampleRom: 'Tenpura o tabemashita.', exampleEs: 'Comí tempura.' },
      { word: 'みず', romaji: 'mizu', es: 'agua', emoji: '💧', example: 'みずを ください。', exampleRom: 'Mizu o kudasai.', exampleEs: 'Agua, por favor.' },
      { word: 'おちゃ', romaji: 'ocha', es: 'té (especialmente verde)', emoji: '🍵', example: 'おちゃを のみます。', exampleRom: 'Ocha o nomimasu.', exampleEs: 'Tomo té.' },
      { word: 'コーヒー', romaji: 'koohii', es: 'café (bebida)', emoji: '☕', example: 'コーヒーが すきです。', exampleRom: 'Koohii ga suki desu.', exampleEs: 'Me gusta el café.' },
      { word: 'パン', romaji: 'pan', es: 'pan (del portugués "pão")', emoji: '🍞', example: 'あさは パンを たべます。', exampleRom: 'Asa wa pan o tabemasu.', exampleEs: 'En la mañana como pan.' },
      { word: 'さかな', romaji: 'sakana', es: 'pescado / pez', emoji: '🐟', example: 'さかなは からだに いいです。', exampleRom: 'Sakana wa karada ni ii desu.', exampleEs: 'El pescado es bueno para el cuerpo.' },
      { word: 'くだもの', romaji: 'kudamono', es: 'fruta', emoji: '🍎', example: 'くだものが すきです。', exampleRom: 'Kudamono ga suki desu.', exampleEs: 'Me gusta la fruta.' },
    ],
  },
  {
    id: 'dias', name: 'ようび', romaji: 'youbi', nameEs: 'Días de la semana', emoji: '📅',
    words: [
      { word: 'げつようび', romaji: 'getsuyoubi', es: 'lunes (月=luna)', emoji: '1️⃣', example: 'げつようびに がっこうに いきます。', exampleRom: 'Getsuyoubi ni gakkou ni ikimasu.', exampleEs: 'El lunes voy a la escuela.' },
      { word: 'かようび', romaji: 'kayoubi', es: 'martes (火=fuego)', emoji: '2️⃣', example: 'かようびに テストが あります。', exampleRom: 'Kayoubi ni tesuto ga arimasu.', exampleEs: 'El martes hay examen.' },
      { word: 'すいようび', romaji: 'suiyoubi', es: 'miércoles (水=agua)', emoji: '3️⃣', example: 'すいようびは やすみです。', exampleRom: 'Suiyoubi wa yasumi desu.', exampleEs: 'El miércoles es día libre.' },
      { word: 'もくようび', romaji: 'mokuyoubi', es: 'jueves (木=madera)', emoji: '4️⃣', example: 'もくようびに えいがを みます。', exampleRom: 'Mokuyoubi ni eiga o mimasu.', exampleEs: 'El jueves veo una película.' },
      { word: 'きんようび', romaji: 'kinyoubi', es: 'viernes (金=metal/oro)', emoji: '5️⃣', example: 'きんようびが すきです。', exampleRom: 'Kinyoubi ga suki desu.', exampleEs: 'Me gusta el viernes.' },
      { word: 'どようび', romaji: 'doyoubi', es: 'sábado (土=tierra)', emoji: '6️⃣', example: 'どようびに どこに いきますか？', exampleRom: 'Doyoubi ni doko ni ikimasu ka?', exampleEs: '¿Adónde vas el sábado?' },
      { word: 'にちようび', romaji: 'nichiyoubi', es: 'domingo (日=sol)', emoji: '7️⃣', example: 'にちようびは やすみます。', exampleRom: 'Nichiyoubi wa yasumimasu.', exampleEs: 'El domingo descanso.' },
      { word: 'きょう', romaji: 'kyou', es: 'hoy', emoji: '📌', example: 'きょうは なんようびですか？', exampleRom: 'Kyou wa nan-youbi desu ka?', exampleEs: '¿Qué día es hoy?' },
      { word: 'あした', romaji: 'ashita', es: 'mañana', emoji: '➡️', example: 'あしたまた ねっ。', exampleRom: 'Ashita mata ne.', exampleEs: 'Hasta mañana.' },
      { word: 'きのう', romaji: 'kinou', es: 'ayer', emoji: '⬅️', example: 'きのうは たのしかったです。', exampleRom: 'Kinou wa tanoshikatta desu.', exampleEs: 'Ayer fue divertido.' },
    ],
  },
  {
    id: 'lugares', name: 'ばしょ', romaji: 'basho', nameEs: 'Lugares', emoji: '📍',
    words: [
      { word: 'がっこう', romaji: 'gakkou', es: 'escuela', emoji: '🏫', example: 'がっこうに いきます。', exampleRom: 'Gakkou ni ikimasu.', exampleEs: 'Voy a la escuela.' },
      { word: 'いえ / うち', romaji: 'ie / uchi', es: 'casa / hogar', emoji: '🏠', example: 'うちに います。', exampleRom: 'Uchi ni imasu.', exampleEs: 'Estoy en casa.' },
      { word: 'びょういん', romaji: 'byouin', es: 'hospital', emoji: '🏥', example: 'びょういんに いきました。', exampleRom: 'Byouin ni ikimashita.', exampleEs: 'Fui al hospital.' },
      { word: 'コンビニ', romaji: 'konbini', es: 'tienda de conveniencia (7-Eleven, Lawson...)', emoji: '🏪', example: 'コンビニで かいます。', exampleRom: 'Konbini de kaimasu.', exampleEs: 'Compro en la tienda de conveniencia.' },
      { word: 'えき', romaji: 'eki', es: 'estación (de tren/metro)', emoji: '🚇', example: 'えきは どこですか？', exampleRom: 'Eki wa doko desu ka?', exampleEs: '¿Dónde está la estación?' },
      { word: 'こうえん', romaji: 'kouen', es: 'parque', emoji: '🌳', example: 'こうえんで さんぽします。', exampleRom: 'Kouen de sanpo shimasu.', exampleEs: 'Paseo en el parque.' },
      { word: 'レストラン', romaji: 'resutoran', es: 'restaurante', emoji: '🍽️', example: 'レストランで たべます。', exampleRom: 'Resutoran de tabemasu.', exampleEs: 'Como en el restaurante.' },
      { word: 'ほんや', romaji: 'honya', es: 'librería', emoji: '📚', example: 'ほんやで ほんを かいます。', exampleRom: 'Honya de hon o kaimasu.', exampleEs: 'Compro libros en la librería.' },
      { word: 'くうこう', romaji: 'kuukou', es: 'aeropuerto', emoji: '✈️', example: 'くうこうに いきます。', exampleRom: 'Kuukou ni ikimasu.', exampleEs: 'Voy al aeropuerto.' },
      { word: 'ホテル', romaji: 'hoteru', es: 'hotel', emoji: '🏨', example: 'ホテルに とまります。', exampleRom: 'Hoteru ni tomarimasu.', exampleEs: 'Me hospedo en el hotel.' },
    ],
  },
  {
    id: 'numeros', name: 'すうじ', romaji: 'suuji', nameEs: 'Números', emoji: '🔢',
    words: [
      { word: 'いち (1)', romaji: 'ichi', es: '1', emoji: '1️⃣', example: 'いちじです。', exampleRom: 'Ichi-ji desu.', exampleEs: 'Es la 1:00.' },
      { word: 'に (2)', romaji: 'ni', es: '2', emoji: '2️⃣', example: 'にほん (日本)', exampleRom: 'Nihon', exampleEs: 'Japón (日=sol, 本=origen → "origen del sol")' },
      { word: 'さん (3)', romaji: 'san', es: '3', emoji: '3️⃣', example: 'さんびゃくえん', exampleRom: 'sanbyaku en', exampleEs: '300 yenes' },
      { word: 'ご (5)', romaji: 'go', es: '5', emoji: '5️⃣', example: 'ごじです。', exampleRom: 'Go-ji desu.', exampleEs: 'Son las 5:00.' },
      { word: 'じゅう (10)', romaji: 'juu', es: '10', emoji: '🔟', example: 'じゅうえん', exampleRom: 'juu en', exampleEs: '10 yenes' },
      { word: 'ひゃく (100)', romaji: 'hyaku', es: '100', emoji: '💯', example: 'ひゃくえんショップ', exampleRom: 'hyaku-en shoppu', exampleEs: 'Tienda de 100 yenes' },
      { word: 'せん (1000)', romaji: 'sen', es: '1.000', emoji: '💰', example: 'せんえん', exampleRom: 'sen-en', exampleEs: '1.000 yenes' },
      { word: 'まん (10000)', romaji: 'man', es: '10.000', emoji: '💵', example: 'いちまんえん', exampleRom: 'ichi-man-en', exampleEs: '10.000 yenes (billete de ¥10.000)' },
      { word: 'なんじ？', romaji: 'nanji?', es: '¿Qué hora?', emoji: '🕐', example: 'いまは なんじですか？', exampleRom: 'Ima wa nanji desu ka?', exampleEs: '¿Qué hora es ahora?' },
      { word: 'いくら？', romaji: 'ikura?', es: '¿Cuánto cuesta?', emoji: '💴', example: 'これは いくらですか？', exampleRom: 'Kore wa ikura desu ka?', exampleEs: '¿Cuánto cuesta esto?' },
    ],
  },
  {
    id: 'ie', name: 'いえ・うち', romaji: 'ie / uchi', nameEs: 'La casa', emoji: '🏠',
    words: [
      { word: 'いえ / うち', romaji: 'ie / uchi', es: 'casa (ie=formal, uchi=informal)', emoji: '🏠', example: 'うちに かえります。', exampleRom: 'Uchi ni kaerimasu.', exampleEs: 'Regreso a casa.' },
      { word: 'へや', romaji: 'heya', es: 'habitación', emoji: '🚪', example: 'わたしの へやは ちいさいです。', exampleRom: 'Watashi no heya wa chiisai desu.', exampleEs: 'Mi habitación es pequeña.' },
      { word: 'だいどころ', romaji: 'daidokoro', es: 'cocina', emoji: '🍳', example: 'だいどころで りょうりします。', exampleRom: 'Daidokoro de ryouri shimasu.', exampleEs: 'Cocino en la cocina.' },
      { word: 'おふろ', romaji: 'ofuro', es: 'baño/tina', emoji: '🛁', example: 'まいばん おふろに はいります。', exampleRom: 'Maiban ofuro ni hairimasu.', exampleEs: 'Me baño todas las noches.' },
      { word: 'リビング', romaji: 'ribingu', es: 'sala de estar', emoji: '🛋️', example: 'リビングで テレビを みます。', exampleRom: 'Ribingu de terebi wo mimasu.', exampleEs: 'Veo televisión en la sala.' },
      { word: 'つくえ', romaji: 'tsukue', es: 'escritorio', emoji: '🪑', example: 'つくえの うえに ほんが あります。', exampleRom: 'Tsukue no ue ni hon ga arimasu.', exampleEs: 'Hay un libro sobre el escritorio.' },
      { word: 'いす', romaji: 'isu', es: 'silla', emoji: '🪑', example: 'いすに すわってください。', exampleRom: 'Isu ni suwatte kudasai.', exampleEs: 'Por favor, siéntese.' },
      { word: 'まど', romaji: 'mado', es: 'ventana', emoji: '🪟', example: 'まどを あけてください。', exampleRom: 'Mado wo akete kudasai.', exampleEs: 'Por favor, abra la ventana.' },
      { word: 'ドア', romaji: 'doa', es: 'puerta', emoji: '🚪', example: 'ドアを しめてください。', exampleRom: 'Doa wo shimete kudasai.', exampleEs: 'Por favor, cierre la puerta.' },
      { word: 'ベッド', romaji: 'beddo', es: 'cama', emoji: '🛏️', example: 'ベッドで ねます。', exampleRom: 'Beddo de nemasu.', exampleEs: 'Duermo en la cama.' },
    ],
  },
  {
    id: 'kimochi', name: 'きもち', romaji: 'kimochi', nameEs: 'Emociones y estado', emoji: '😊',
    words: [
      { word: 'うれしい', romaji: 'ureshii', es: 'feliz/contento', emoji: '😊', example: 'プレゼントを もらって うれしいです。', exampleRom: 'Purezento wo moratte ureshii desu.', exampleEs: 'Estoy contento/a de recibir el regalo.' },
      { word: 'かなしい', romaji: 'kanashii', es: 'triste', emoji: '😢', example: 'その えいがは かなしいです。', exampleRom: 'Sono eiga wa kanashii desu.', exampleEs: 'Esa película es triste.' },
      { word: 'つかれた', romaji: 'tsukareta', es: 'cansado/a', emoji: '😴', example: 'きょうは とても つかれました。', exampleRom: 'Kyou wa totemo tsukaremashita.', exampleEs: 'Hoy me cansé mucho.' },
      { word: 'おなかが すいた', romaji: 'onaka ga suita', es: 'tengo hambre', emoji: '🍽️', example: 'おなかが すきました！', exampleRom: 'Onaka ga sukimashita!', exampleEs: '¡Tengo hambre!' },
      { word: 'すき', romaji: 'suki', es: 'me gusta / gusto', emoji: '❤️', example: 'にほんごが すきです。', exampleRom: 'Nihongo ga suki desu.', exampleEs: 'Me gusta el japonés.' },
      { word: 'きらい', romaji: 'kirai', es: 'no me gusta / disgusto', emoji: '💔', example: 'たばこが きらいです。', exampleRom: 'Tabako ga kirai desu.', exampleEs: 'No me gusta el tabaco.' },
      { word: 'こわい', romaji: 'kowai', es: 'da miedo / aterrador', emoji: '😱', example: 'その えいがは こわいです。', exampleRom: 'Sono eiga wa kowai desu.', exampleEs: 'Esa película da miedo.' },
      { word: 'たのしい', romaji: 'tanoshii', es: 'divertido/agradable', emoji: '😄', example: 'りょこうは とても たのしいです。', exampleRom: 'Ryokou wa totemo tanoshii desu.', exampleEs: 'El viaje es muy divertido.' },
      { word: 'だいじょうぶ', romaji: 'daijoubu', es: 'está bien / no hay problema', emoji: '🙂', example: 'だいじょうぶですか？', exampleRom: 'Daijoubu desu ka?', exampleEs: '¿Estás bien? / ¿Todo bien?' },
      { word: 'びっくりした', romaji: 'bikkuri shita', es: 'me sorprendí / ¡qué susto!', emoji: '😲', example: 'びっくりしました！', exampleRom: 'Bikkuri shimashita!', exampleEs: '¡Me sorprendí! / ¡Qué susto!' },
    ],
  },
];

type Mode = 'browse' | 'flashcard' | 'quiz';

export default function VocabularioJaponesA1() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('browse');
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizOpts, setQuizOpts] = useState<string[][]>([]);

  const currentSet = SETS.find(s => s.id === setId);
  const generateOpts = useCallback((set: VocabSet) => set.words.map((w, i) => { const others = set.words.filter((_, j) => j !== i).map(x => x.es); const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3); return [...shuffled, w.es].sort(() => Math.random() - 0.5); }), []);
  function startMode(m: Mode, set: VocabSet) { setMode(m); setCardIdx(0); setFlipped(false); setQuizAnswers({}); if (m === 'quiz') setQuizOpts(generateOpts(set)); }

  if (!currentSet) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/japones/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés A1</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>📚 語彙 · Vocabulario</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />語彙 · Vocabulario Japonés A1</p>
          <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabulario A1</h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>6 conjuntos temáticos. Cada palabra: 日本語 + ローマ字 (romaji) + Español. 3 modos de práctica.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {SETS.map(s => (
              <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
                <div style={{ padding: '1.25rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}06` }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.emoji}</div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.1rem' }}>{s.name}</div>
                  <div style={{ fontSize: '0.73rem', color: COLOR, fontWeight: 600, fontStyle: 'italic', marginBottom: '0.1rem' }}>{s.romaji}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{s.nameEs} · {s.words.length} palabras</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/japones/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés A1</Link>
          <span>/</span>
          <button onClick={() => setSetId(null)} style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}>📚 語彙</button>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>{currentSet.emoji} {currentSet.name}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {(['browse', 'flashcard', 'quiz'] as Mode[]).map(m => {
            const labels = { browse: '📖 Explorar', flashcard: '🃏 Flashcards', quiz: '🎯 Quiz' };
            return <button key={m} onClick={() => startMode(m, currentSet)} className={mode === m ? 'btn btn-sm' : 'btn btn-ghost btn-sm'} style={{ ...(mode === m ? { background: COLOR, borderColor: COLOR } : {}) }}>{labels[m]}</button>;
          })}
        </div>
        {mode === 'browse' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '0.85rem' }}>
            {currentSet.words.map(w => (
              <div key={w.word} style={{ padding: '1rem 1.2rem', border: `1.5px solid ${COLOR}22`, borderRadius: 14, background: `${COLOR}06` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{w.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink)' }}>{w.word}</div>
                    <div style={{ fontSize: '0.72rem', color: COLOR, fontWeight: 700, fontStyle: 'italic' }}>{w.romaji}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--wl-on-panel-alert, #bc002d)', fontWeight: 700 }}>{w.es}</div>
                  </div>
                </div>
                <p style={{ margin: '0.3rem 0 0.1rem', fontSize: '0.9rem', color: 'var(--ink)' }}>{w.example}</p>
                <p style={{ margin: '0.05rem 0 0.05rem', fontSize: '0.73rem', color: COLOR, fontStyle: 'italic' }}>{w.exampleRom}</p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--muted)' }}>{w.exampleEs}</p>
              </div>
            ))}
          </div>
        )}
        {mode === 'flashcard' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)', alignSelf: 'flex-start' }}>{cardIdx + 1} / {currentSet.words.length}</span>
            <div onClick={() => setFlipped(!flipped)} style={{ width: '100%', maxWidth: 480, minHeight: 200, padding: '2rem', border: `2px solid ${COLOR}44`, borderRadius: 20, background: flipped ? `${COLOR}0d` : 'var(--bg)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', textAlign: 'center' }}>
              {!flipped ? <>
                <span style={{ fontSize: '2rem' }}>{currentSet.words[cardIdx].emoji}</span>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink)' }}>{currentSet.words[cardIdx].word}</span>
                <span style={{ fontSize: '0.85rem', color: COLOR, fontStyle: 'italic' }}>{currentSet.words[cardIdx].romaji}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.5rem' }}>toca para ver el significado</span>
              </> : <>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: COLOR }}>{currentSet.words[cardIdx].es}</span>
                <p style={{ margin: 0, fontSize: '0.87rem', color: 'var(--ink)', maxWidth: 340 }}>{currentSet.words[cardIdx].example}</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: COLOR, fontStyle: 'italic', maxWidth: 340 }}>{currentSet.words[cardIdx].exampleRom}</p>
              </>}
            </div>
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button className="btn btn-ghost btn-sm" disabled={cardIdx === 0} onClick={() => { setCardIdx(i => i - 1); setFlipped(false); }}>← 前</button>
              <button className="btn btn-sm" disabled={cardIdx === currentSet.words.length - 1} onClick={() => { setCardIdx(i => i + 1); setFlipped(false); }} style={{ background: COLOR, borderColor: COLOR }}>次 →</button>
            </div>
          </div>
        )}
        {mode === 'quiz' && quizOpts.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {currentSet.words.map((w, wi) => {
              const ans = quizAnswers[wi]; const isDone = ans !== undefined;
              return (
                <div key={wi} className="wl-card" style={{ padding: '1.1rem' }}>
                  <p style={{ margin: '0 0 0.2rem', fontWeight: 800, fontSize: '1.2rem', color: 'var(--ink)' }}>{w.emoji} {w.word}</p>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.73rem', color: COLOR, fontStyle: 'italic' }}>{w.romaji}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {quizOpts[wi]?.map((opt, oi) => {
                      const isCorrect = opt === w.es; const isSelected = ans === oi;
                      let bg = 'var(--bg-2)'; let border = '1px solid var(--line-soft)'; let color = 'var(--ink)';
                      if (isDone && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1px solid #059669'; color = '#059669'; }
                      if (isDone && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1px solid #dc2626'; color = '#dc2626'; }
                      return <button key={oi} disabled={isDone} onClick={() => setQuizAnswers(p => ({ ...p, [wi]: oi }))} style={{ padding: '0.5rem 1rem', borderRadius: 8, border, background: bg, color, cursor: isDone ? 'default' : 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.9rem' }}>{opt}</button>;
                    })}
                  </div>
                </div>
              );
            })}
            {Object.keys(quizAnswers).length === currentSet.words.length && (
              <div className="wl-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <p style={{ margin: '0 0 1rem', fontWeight: 700, color: 'var(--ink)' }}>{currentSet.words.filter((w, i) => quizOpts[i]?.[quizAnswers[i]] === w.es).length} / {currentSet.words.length} correctas</p>
                <button className="btn btn-sm" onClick={() => startMode('quiz', currentSet)} style={{ background: COLOR, borderColor: COLOR }}>もう一度</button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
