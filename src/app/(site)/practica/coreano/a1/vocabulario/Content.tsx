'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

const COLOR = '#534AB7';

interface VocabWord { word: string; romanization: string; es: string; emoji: string; example: string; exampleRom: string; exampleEs: string; }
interface VocabSet { id: string; name: string; romanization: string; nameEs: string; emoji: string; words: VocabWord[]; }

const SETS: VocabSet[] = [
  {
    id: 'familia', name: '가족', romanization: 'gajok', nameEs: 'La familia', emoji: '👨‍👩‍👧‍👦',
    words: [
      { word: '엄마', romanization: 'eomma', es: 'mamá (informal)', emoji: '👩', example: '우리 엄마는 의사예요.', exampleRom: 'Uri eomma-neun uisa-yeyo.', exampleEs: 'Mi mamá es médica.' },
      { word: '아빠', romanization: 'appa', es: 'papá (informal)', emoji: '👨', example: '아빠, 사랑해요!', exampleRom: 'Appa, saranghaeyo!', exampleEs: '¡Papá, te quiero!' },
      { word: '오빠', romanization: 'oppa', es: 'hermano mayor (para mujer)', emoji: '👦', example: '오빠가 있어요.', exampleRom: 'Oppa-ga isseoyo.', exampleEs: 'Tengo un hermano mayor.' },
      { word: '언니', romanization: 'eonni', es: 'hermana mayor (para mujer)', emoji: '👧', example: '언니는 대학생이에요.', exampleRom: 'Eonni-neun daehaksaeng-ieyo.', exampleEs: 'Mi hermana mayor es universitaria.' },
      { word: '형', romanization: 'hyeong', es: 'hermano mayor (para hombre)', emoji: '🧑', example: '형이 있어요?', exampleRom: 'Hyeong-i isseoyo?', exampleEs: '¿Tienes un hermano mayor?' },
      { word: '남동생', romanization: 'namdongsaeng', es: 'hermano menor', emoji: '👦', example: '남동생이 두 명이에요.', exampleRom: 'Namdongsaeng-i du myeong-ieyo.', exampleEs: 'Tengo dos hermanos menores.' },
      { word: '여동생', romanization: 'yeodongsaeng', es: 'hermana menor', emoji: '👧', example: '여동생이 귀여워요.', exampleRom: 'Yeodongsaeng-i gwiyeowoyo.', exampleEs: 'Mi hermana menor es linda.' },
      { word: '할머니', romanization: 'halmeoni', es: 'abuela', emoji: '👵', example: '할머니 생신이에요.', exampleRom: 'Halmeoni saengsin-ieyo.', exampleEs: 'Es el cumpleaños de la abuela.' },
      { word: '할아버지', romanization: 'harabeoji', es: 'abuelo', emoji: '👴', example: '할아버지가 건강하세요.', exampleRom: 'Harabeoji-ga geonganghaseyo.', exampleEs: 'El abuelo está saludable.' },
      { word: '친구', romanization: 'chingu', es: 'amigo/a', emoji: '🤝', example: '친구가 많아요.', exampleRom: 'Chingu-ga manayo.', exampleEs: 'Tengo muchos amigos.' },
    ],
  },
  {
    id: 'colores', name: '색깔', romanization: 'saekgkal', nameEs: 'Los colores', emoji: '🎨',
    words: [
      { word: '빨간색', romanization: 'ppalgan-saek', es: 'rojo', emoji: '🔴', example: '빨간색 가방이에요.', exampleRom: 'Ppalgan-saek gabang-ieyo.', exampleEs: 'Es una bolsa roja.' },
      { word: '파란색', romanization: 'paran-saek', es: 'azul', emoji: '🔵', example: '하늘이 파란색이에요.', exampleRom: 'Haneul-i paran-saek-ieyo.', exampleEs: 'El cielo es azul.' },
      { word: '노란색', romanization: 'noran-saek', es: 'amarillo', emoji: '🟡', example: '바나나가 노란색이에요.', exampleRom: 'Banana-ga noran-saek-ieyo.', exampleEs: 'El banano es amarillo.' },
      { word: '초록색', romanization: 'choroksaek', es: 'verde', emoji: '🟢', example: '나무가 초록색이에요.', exampleRom: 'Namu-ga choroksaek-ieyo.', exampleEs: 'El árbol es verde.' },
      { word: '흰색', romanization: 'huin-saek', es: 'blanco', emoji: '⬜', example: '눈이 흰색이에요.', exampleRom: 'Nun-i huin-saek-ieyo.', exampleEs: 'La nieve es blanca.' },
      { word: '검은색', romanization: 'geomeunsaek', es: 'negro', emoji: '⬛', example: '고양이가 검은색이에요.', exampleRom: 'Goyang-i-ga geomeunsaek-ieyo.', exampleEs: 'El gato es negro.' },
      { word: '분홍색', romanization: 'bunhong-saek', es: 'rosado', emoji: '🩷', example: '꽃이 분홍색이에요.', exampleRom: 'Kkouchi bunhong-saek-ieyo.', exampleEs: 'Las flores son rosadas.' },
      { word: '보라색', romanization: 'bora-saek', es: 'morado', emoji: '🟣', example: '포도가 보라색이에요.', exampleRom: 'Podo-ga bora-saek-ieyo.', exampleEs: 'Las uvas son moradas.' },
      { word: '주황색', romanization: 'juhwang-saek', es: 'naranja', emoji: '🟠', example: '당근이 주황색이에요.', exampleRom: 'Danggeun-i juhwang-saek-ieyo.', exampleEs: 'La zanahoria es naranja.' },
      { word: '갈색', romanization: 'galsaek', es: 'café/marrón', emoji: '🟫', example: '곰이 갈색이에요.', exampleRom: 'Gom-i galsaek-ieyo.', exampleEs: 'El oso es café.' },
    ],
  },
  {
    id: 'comida', name: '음식', romanization: 'eumsik', nameEs: 'La comida', emoji: '🍽️',
    words: [
      { word: '밥', romanization: 'bap', es: 'arroz cocinado / comida', emoji: '🍚', example: '밥 먹어요?', exampleRom: 'Bap meogeoyo?', exampleEs: '¿Estás comiendo (arroz)? / ¿Comes?' },
      { word: '김치', romanization: 'gimchi', es: 'kimchi (col fermentada picante)', emoji: '🌶️', example: '김치를 좋아해요.', exampleRom: 'Gimchi-reul joahaeyo.', exampleEs: 'Me gusta el kimchi.' },
      { word: '물', romanization: 'mul', es: 'agua', emoji: '💧', example: '물 주세요.', exampleRom: 'Mul juseyo.', exampleEs: 'Agua, por favor.' },
      { word: '커피', romanization: 'keopi', es: 'café (bebida)', emoji: '☕', example: '커피 한 잔이요.', exampleRom: 'Keopi han jan-iyo.', exampleEs: 'Un café, por favor.' },
      { word: '치킨', romanization: 'chikin', es: 'pollo frito (estilo coreano)', emoji: '🍗', example: '치킨이 맛있어요!', exampleRom: 'Chikin-i masisseoyo!', exampleEs: '¡El pollo está delicioso!' },
      { word: '라면', romanization: 'ramyeon', es: 'ramen / fideos instantáneos', emoji: '🍜', example: '라면을 좋아해요.', exampleRom: 'Ramyeon-eul joahaeyo.', exampleEs: 'Me gusta el ramen.' },
      { word: '고기', romanization: 'gogi', es: 'carne', emoji: '🥩', example: '고기를 먹어요.', exampleRom: 'Gogi-reul meogeoyo.', exampleEs: 'Como carne.' },
      { word: '과일', romanization: 'gwail', es: 'fruta', emoji: '🍎', example: '과일이 맛있어요.', exampleRom: 'Gwail-i masisseoyo.', exampleEs: 'La fruta está rica.' },
      { word: '빵', romanization: 'ppang', es: 'pan', emoji: '🍞', example: '빵집에 가요.', exampleRom: 'Ppangjib-e gayo.', exampleEs: 'Voy a la panadería.' },
      { word: '떡볶이', romanization: 'tteokbokki', es: 'tteokbokki (pastel de arroz picante)', emoji: '🌶️', example: '떡볶이가 매워요.', exampleRom: 'Tteokbokki-ga maewoyo.', exampleEs: 'El tteokbokki es picante.' },
    ],
  },
  {
    id: 'dias', name: '요일', romanization: 'yoil', nameEs: 'Días de la semana', emoji: '📅',
    words: [
      { word: '월요일', romanization: 'woryoil', es: 'lunes', emoji: '1️⃣', example: '월요일에 일해요.', exampleRom: 'Woryoil-e ilhaeyo.', exampleEs: 'Trabajo el lunes.' },
      { word: '화요일', romanization: 'hwayoil', es: 'martes', emoji: '2️⃣', example: '화요일에 수업이 있어요.', exampleRom: 'Hwayoil-e sueop-i isseoyo.', exampleEs: 'El martes tengo clase.' },
      { word: '수요일', romanization: 'suyoil', es: 'miércoles', emoji: '3️⃣', example: '수요일은 바빠요.', exampleRom: 'Suyoil-eun bappayo.', exampleEs: 'El miércoles estoy ocupado/a.' },
      { word: '목요일', romanization: 'mogyoil', es: 'jueves', emoji: '4️⃣', example: '목요일에 만나요.', exampleRom: 'Mogyoil-e mannayo.', exampleEs: 'Nos vemos el jueves.' },
      { word: '금요일', romanization: 'geumyoil', es: 'viernes', emoji: '5️⃣', example: '금요일을 좋아해요!', exampleRom: 'Geumyoil-eul joahaeyo!', exampleEs: '¡Me gusta el viernes!' },
      { word: '토요일', romanization: 'toyoil', es: 'sábado', emoji: '6️⃣', example: '토요일에 쉬어요.', exampleRom: 'Toyoil-e swieyo.', exampleEs: 'El sábado descanso.' },
      { word: '일요일', romanization: 'iryoil', es: 'domingo', emoji: '7️⃣', example: '일요일에 교회에 가요.', exampleRom: 'Iryoil-e gyohoe-e gayo.', exampleEs: 'El domingo voy a la iglesia.' },
      { word: '오늘', romanization: 'oneul', es: 'hoy', emoji: '📌', example: '오늘이 무슨 요일이에요?', exampleRom: 'Oneul-i museun yoil-ieyo?', exampleEs: '¿Qué día es hoy?' },
      { word: '내일', romanization: 'naeil', es: 'mañana', emoji: '➡️', example: '내일 만나요!', exampleRom: 'Naeil mannayo!', exampleEs: '¡Nos vemos mañana!' },
      { word: '어제', romanization: 'eoje', es: 'ayer', emoji: '⬅️', example: '어제 뭐 했어요?', exampleRom: 'Eoje mwo haesseoyo?', exampleEs: '¿Qué hiciste ayer?' },
    ],
  },
  {
    id: 'lugares', name: '장소', romanization: 'jangso', nameEs: 'Lugares', emoji: '📍',
    words: [
      { word: '학교', romanization: 'hakgyo', es: 'escuela / colegio', emoji: '🏫', example: '학교에 가요.', exampleRom: 'Hakgyo-e gayo.', exampleEs: 'Voy a la escuela.' },
      { word: '집', romanization: 'jip', es: 'casa / hogar', emoji: '🏠', example: '집에 있어요.', exampleRom: 'Jib-e isseoyo.', exampleEs: 'Estoy en casa.' },
      { word: '병원', romanization: 'byeongwon', es: 'hospital', emoji: '🏥', example: '병원에 가야 해요.', exampleRom: 'Byeongwon-e gaya haeyo.', exampleEs: 'Tengo que ir al hospital.' },
      { word: '편의점', romanization: 'pyeonuijeom', es: 'tienda de conveniencia', emoji: '🏪', example: '편의점에서 사요.', exampleRom: 'Pyeonuijeom-eseo sayo.', exampleEs: 'Lo compro en la tienda de conveniencia.' },
      { word: '카페', romanization: 'kape', es: 'café / cafetería', emoji: '☕', example: '카페에서 공부해요.', exampleRom: 'Kape-eseo gongbu-haeyo.', exampleEs: 'Estudio en el café.' },
      { word: '지하철역', romanization: 'jihacheol-yeok', es: 'estación de metro', emoji: '🚇', example: '지하철역이 어디예요?', exampleRom: 'Jihacheol-yeok-i eodiyeyo?', exampleEs: '¿Dónde está la estación de metro?' },
      { word: '공항', romanization: 'gonghang', es: 'aeropuerto', emoji: '✈️', example: '공항에 가요.', exampleRom: 'Gonghang-e gayo.', exampleEs: 'Voy al aeropuerto.' },
      { word: '식당', romanization: 'sikdang', es: 'restaurante', emoji: '🍽️', example: '식당에서 밥 먹어요.', exampleRom: 'Sikdang-eseo bap meogeoyo.', exampleEs: 'Como en el restaurante.' },
      { word: '서점', romanization: 'seojeom', es: 'librería', emoji: '📚', example: '서점에서 책을 사요.', exampleRom: 'Seojeom-eseo chaek-eul sayo.', exampleEs: 'Compro libros en la librería.' },
      { word: '공원', romanization: 'gongwon', es: 'parque', emoji: '🌳', example: '공원에서 산책해요.', exampleRom: 'Gongwon-eseo sanchaekhaeyo.', exampleEs: 'Paseo en el parque.' },
    ],
  },
  {
    id: 'numeros', name: '숫자', romanization: 'sutja', nameEs: 'Números', emoji: '🔢',
    words: [
      { word: '일 (1)', romanization: 'il', es: '1 (sino-coreano)', emoji: '1️⃣', example: '일 층이에요.', exampleRom: 'Il cheung-ieyo.', exampleEs: 'Es el primer piso.' },
      { word: '이 (2)', romanization: 'i', es: '2 (sino-coreano)', emoji: '2️⃣', example: '이월이에요.', exampleRom: 'Iwol-ieyo.', exampleEs: 'Es febrero.' },
      { word: '삼 (3)', romanization: 'sam', es: '3 (sino-coreano)', emoji: '3️⃣', example: '삼월 삼일이에요.', exampleRom: 'Samwol samil-ieyo.', exampleEs: 'Es el 3 de marzo.' },
      { word: '하나 (1)', romanization: 'hana', es: '1 (nativo coreano)', emoji: '☝️', example: '하나 주세요.', exampleRom: 'Hana juseyo.', exampleEs: 'Uno, por favor (contando objetos).' },
      { word: '둘 (2)', romanization: 'dul', es: '2 (nativo coreano)', emoji: '✌️', example: '두 개 주세요.', exampleRom: 'Du gae juseyo.', exampleEs: 'Dos (unidades), por favor.' },
      { word: '열 (10)', romanization: 'yeol', es: '10 (nativo coreano)', emoji: '🔟', example: '열 살이에요.', exampleRom: 'Yeol sal-ieyo.', exampleEs: 'Tengo 10 años.' },
      { word: '백 (100)', romanization: 'baek', es: '100 (sino-coreano)', emoji: '💯', example: '백 원이에요.', exampleRom: 'Baek won-ieyo.', exampleEs: 'Son 100 won.' },
      { word: '천 (1000)', romanization: 'cheon', es: '1000 (sino-coreano)', emoji: '💰', example: '이천 원이에요.', exampleRom: 'Icheon won-ieyo.', exampleEs: 'Son 2.000 won.' },
      { word: '만 (10000)', romanization: 'man', es: '10.000 (sino-coreano)', emoji: '💵', example: '일만 원이에요.', exampleRom: 'Ilman won-ieyo.', exampleEs: 'Son 10.000 won.' },
      { word: '몇?', romanization: 'myeot?', es: '¿Cuántos? (con contador)', emoji: '❓', example: '몇 개예요?', exampleRom: 'Myeot gae-yeyo?', exampleEs: '¿Cuántos son? (¿cuántas unidades?)' },
    ],
  },
  {
    id: 'jip', name: '집', romanization: 'jip', nameEs: 'La casa', emoji: '🏠',
    words: [
      { word: '집 (集)', romanization: 'jip', es: 'casa', emoji: '🏠', example: '저는 집에 있어요.', exampleRom: 'Jeoneun jibe isseoyo.', exampleEs: 'Estoy en casa.' },
      { word: '방 (房)', romanization: 'bang', es: 'habitación', emoji: '🚪', example: '제 방은 작아요.', exampleRom: 'Je bang-eun jagayo.', exampleEs: 'Mi habitación es pequeña.' },
      { word: '부엌', romanization: 'bueok', es: 'cocina', emoji: '🍳', example: '부엌에서 요리해요.', exampleRom: 'Bueog-eseo yorihaeyo.', exampleEs: 'Cocino en la cocina.' },
      { word: '화장실', romanization: 'hwajangsil', es: 'baño', emoji: '🚿', example: '화장실이 어디예요?', exampleRom: 'Hwajangsil-i eodiyeyo?', exampleEs: '¿Dónde está el baño?' },
      { word: '거실', romanization: 'geosil', es: 'sala de estar', emoji: '🛋️', example: '거실에서 TV를 봐요.', exampleRom: 'Geosil-eseo tibireul bwayo.', exampleEs: 'Veo TV en la sala.' },
      { word: '책상', romanization: 'chaeksang', es: 'escritorio', emoji: '🪑', example: '책상 위에 책이 있어요.', exampleRom: 'Chaeksang wie chaeg-i isseoyo.', exampleEs: 'Hay un libro sobre el escritorio.' },
      { word: '침대', romanization: 'chimdae', es: 'cama', emoji: '🛏️', example: '침대가 편해요.', exampleRom: 'Chimdae-ga pyeonhaeyo.', exampleEs: 'La cama es cómoda.' },
      { word: '창문', romanization: 'changmun', es: 'ventana', emoji: '🪟', example: '창문을 열어요.', exampleRom: 'Changmun-eul yeoreoyo.', exampleEs: 'Abro la ventana.' },
      { word: '문', romanization: 'mun', es: 'puerta', emoji: '🚪', example: '문을 닫아 주세요.', exampleRom: 'Mun-eul dada juseyo.', exampleEs: 'Por favor, cierre la puerta.' },
      { word: '냉장고', romanization: 'naengjanggo', es: 'refrigerador', emoji: '🧊', example: '냉장고에 우유가 있어요.', exampleRom: 'Naengjanggo-e uyu-ga isseoyo.', exampleEs: 'Hay leche en el refrigerador.' },
    ],
  },
  {
    id: 'gamjeong', name: '감정', romanization: 'gamjeong', nameEs: 'Emociones y estado', emoji: '😊',
    words: [
      { word: '행복해요', romanization: 'haengbokhaeyo', es: 'soy/estoy feliz', emoji: '😊', example: '오늘 정말 행복해요.', exampleRom: 'Oneul jeongmal haengbokhaeyo.', exampleEs: 'Hoy estoy muy feliz.' },
      { word: '슬퍼요', romanization: 'seulpeoyo', es: 'estoy triste', emoji: '😢', example: '영화가 슬퍼요.', exampleRom: 'Yeonghwa-ga seulpeoyo.', exampleEs: 'La película es triste.' },
      { word: '피곤해요', romanization: 'pigonhaeyo', es: 'estoy cansado/a', emoji: '😴', example: '오늘 너무 피곤해요.', exampleRom: 'Oneul neomu pigonhaeyo.', exampleEs: 'Hoy estoy muy cansado/a.' },
      { word: '배고파요', romanization: 'baegopayo', es: 'tengo hambre', emoji: '🍽️', example: '밥 먹어요, 배고파요!', exampleRom: 'Bap meogeoyo, baegopayo!', exampleEs: '¡Vamos a comer, tengo hambre!' },
      { word: '좋아요', romanization: 'johayo', es: 'me gusta / está bien', emoji: '👍', example: '이 음악이 너무 좋아요.', exampleRom: 'I eumagui neomu johayo.', exampleEs: 'Me gusta mucho esta música.' },
      { word: '싫어요', romanization: 'sireoyo', es: 'no me gusta / no quiero', emoji: '👎', example: '매운 음식이 싫어요.', exampleRom: 'Maeun eumsig-i sireoyo.', exampleEs: 'No me gusta la comida picante.' },
      { word: '무서워요', romanization: 'museowayo', es: 'tengo miedo / da miedo', emoji: '😱', example: '귀신이 무서워요!', exampleRom: 'Gwisin-i museowayo!', exampleEs: '¡Los fantasmas me dan miedo!' },
      { word: '기분이 좋아요', romanization: 'gibun-i johayo', es: 'me siento bien / de buen humor', emoji: '😄', example: '오늘 기분이 너무 좋아요!', exampleRom: 'Oneul gibun-i neomu johayo!', exampleEs: '¡Hoy me siento muy bien!' },
      { word: '괜찮아요', romanization: 'gwaenchanayo', es: 'estoy bien / no importa', emoji: '🙂', example: '괜찮아요, 걱정하지 마세요.', exampleRom: 'Gwaenchanayo, geokjeongha-ji maseyo.', exampleEs: 'Estoy bien, no se preocupe.' },
      { word: '신나요', romanization: 'sinnayo', es: 'estoy emocionado/a', emoji: '🤩', example: '여행이라서 신나요!', exampleRom: 'Yeohaeng-iraseo sinnayo!', exampleEs: '¡Estoy emocionado/a porque vamos de viaje!' },
    ],
  },
];

type Mode = 'browse' | 'flashcard' | 'quiz';

export default function VocabularioCoreanoA1() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('browse');
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizOpts, setQuizOpts] = useState<string[][]>([]);

  const currentSet = SETS.find(s => s.id === setId);

  const generateOpts = useCallback((set: VocabSet) => {
    return set.words.map((w, i) => {
      const others = set.words.filter((_, j) => j !== i).map(x => x.es);
      const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
      return [...shuffled, w.es].sort(() => Math.random() - 0.5);
    });
  }, []);

  function startMode(m: Mode, set: VocabSet) {
    setMode(m); setCardIdx(0); setFlipped(false); setQuizAnswers({});
    if (m === 'quiz') setQuizOpts(generateOpts(set));
  }

  if (!currentSet) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/coreano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano A1</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>📚 어휘 · Vocabulario</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />어휘 · Vocabulario Coreano A1</p>
          <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabulario A1</h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>6 conjuntos temáticos. Cada palabra: 한글 + Romanización + Español. 3 modos de práctica.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {SETS.map(s => (
              <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
                <div style={{ padding: '1.25rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}06` }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.emoji}</div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.1rem' }}>{s.name}</div>
                  <div style={{ fontSize: '0.73rem', color: COLOR, fontWeight: 600, marginBottom: '0.1rem' }}>{s.romanization}</div>
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
          <Link href="/practica/coreano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano A1</Link>
          <span>/</span>
          <button onClick={() => setSetId(null)} style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}>📚 어휘</button>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>{currentSet.emoji} {currentSet.name}</span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {(['browse', 'flashcard', 'quiz'] as Mode[]).map(m => {
            const labels = { browse: '📖 Explorar', flashcard: '🃏 Flashcards', quiz: '🎯 Quiz' };
            return (
              <button key={m} onClick={() => startMode(m, currentSet)}
                className={mode === m ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
                style={{ ...(mode === m ? { background: COLOR, borderColor: COLOR } : {}) }}>
                {labels[m]}
              </button>
            );
          })}
        </div>

        {mode === 'browse' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '0.85rem' }}>
            {currentSet.words.map(w => (
              <div key={w.word} style={{ padding: '1rem 1.2rem', border: `1.5px solid ${COLOR}22`, borderRadius: 14, background: `${COLOR}06` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{w.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--ink)' }}>{w.word}</div>
                    <div style={{ fontSize: '0.72rem', color: COLOR, fontWeight: 700, fontStyle: 'italic' }}>{w.romanization}</div>
                    <div style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700 }}>{w.es}</div>
                  </div>
                </div>
                <p style={{ margin: '0.35rem 0 0.1rem', fontSize: '0.9rem', color: 'var(--ink)' }}>{w.example}</p>
                <p style={{ margin: '0.05rem 0 0.1rem', fontSize: '0.73rem', color: COLOR, fontStyle: 'italic' }}>{w.exampleRom}</p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--muted)' }}>{w.exampleEs}</p>
              </div>
            ))}
          </div>
        )}

        {mode === 'flashcard' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)', alignSelf: 'flex-start' }}>{cardIdx + 1} / {currentSet.words.length}</span>
            <div onClick={() => setFlipped(!flipped)} style={{ width: '100%', maxWidth: 480, minHeight: 200, padding: '2rem', border: `2px solid ${COLOR}44`, borderRadius: 20, background: flipped ? `${COLOR}0d` : 'var(--bg)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', textAlign: 'center' }}>
              {!flipped ? (
                <>
                  <span style={{ fontSize: '2rem' }}>{currentSet.words[cardIdx].emoji}</span>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink)' }}>{currentSet.words[cardIdx].word}</span>
                  <span style={{ fontSize: '0.9rem', color: COLOR, fontWeight: 600, fontStyle: 'italic' }}>{currentSet.words[cardIdx].romanization}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.5rem' }}>toca para ver el significado</span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#7c3aed' }}>{currentSet.words[cardIdx].es}</span>
                  <p style={{ margin: 0, fontSize: '0.87rem', color: 'var(--ink)', maxWidth: 340 }}>{currentSet.words[cardIdx].example}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: COLOR, fontStyle: 'italic', maxWidth: 340 }}>{currentSet.words[cardIdx].exampleRom}</p>
                </>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button className="btn btn-ghost btn-sm" disabled={cardIdx === 0} onClick={() => { setCardIdx(i => i - 1); setFlipped(false); }}>← Anterior</button>
              <button className="btn btn-sm" disabled={cardIdx === currentSet.words.length - 1} onClick={() => { setCardIdx(i => i + 1); setFlipped(false); }} style={{ background: COLOR, borderColor: COLOR }}>Siguiente →</button>
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
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.75rem', color: COLOR, fontStyle: 'italic' }}>{w.romanization}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {quizOpts[wi]?.map((opt, oi) => {
                      const isCorrect = opt === w.es; const isSelected = ans === oi;
                      let bg = 'var(--bg-2)'; let border = '1px solid var(--line-soft)'; let color = 'var(--ink)';
                      if (isDone && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1px solid #059669'; color = '#059669'; }
                      if (isDone && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1px solid #dc2626'; color = '#dc2626'; }
                      return (
                        <button key={oi} disabled={isDone} onClick={() => setQuizAnswers(p => ({ ...p, [wi]: oi }))}
                          style={{ padding: '0.5rem 1rem', borderRadius: 8, border, background: bg, color, cursor: isDone ? 'default' : 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.9rem' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {Object.keys(quizAnswers).length === currentSet.words.length && (
              <div className="wl-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <p style={{ margin: '0 0 1rem', fontWeight: 700, color: 'var(--ink)' }}>
                  {currentSet.words.filter((w, i) => quizOpts[i]?.[quizAnswers[i]] === w.es).length} / {currentSet.words.length} correctas
                </p>
                <button className="btn btn-sm" onClick={() => startMode('quiz', currentSet)} style={{ background: COLOR, borderColor: COLOR }}>Repetir quiz</button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
