'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const COLOR = '#534AB7';

interface ReadingText { id: number; title: string; titleRom: string; titleEs: string; topic: string; words: number; grammar: string; text: string; textRom: string; vocab: Record<string, [string, string]>; preQ: { q: string; opts: string[]; }[]; mcq: { q: string; cat: string; opts: string[]; a: number; fb: string }[]; openQ: string; production: string; }

const TEXTS: ReadingText[] = [
  {
    id: 1, title: '안녕하세요! 저는 미나예요.', titleRom: 'Annyeonghaseyo! Jeoneun Mina-yeyo.', titleEs: '¡Hola! Soy Mina.', topic: '소개 · Presentación', words: 48, grammar: '이에요/예요 · 은/는 · 있어요',
    text: '안녕하세요! 저는 미나예요. 저는 학생이에요. 저는 한국 사람이에요. 서울에서 살아요. 저는 한국어와 영어를 해요. 취미는 음악이에요. 저는 커피를 좋아해요. 친구들이 많아요. 반가워요!',
    textRom: 'Annyeonghaseyo! Jeoneun Mina-yeyo. Jeoneun haksaeng-ieyo. Jeoneun hanguk saram-ieyo. Seoul-eseo sarayo. Jeoneun hangugeo-wa yeongeoreul haeyo. Chwimi-neun eumak-ieyo. Jeoneun keopi-reul joahaeyo. Chingudeuri manayo. Bangawoyo!',
    vocab: {
      저는: ['jeoneun', 'yo (formal + tema 는)'],
      학생이에요: ['haksaeng-ieyo', 'soy estudiante'],
      한국: ['hanguk', 'Corea'],
      사람이에요: ['saram-ieyo', 'soy una persona (de)'],
      서울에서: ['Seoul-eseo', 'en Seúl (에서=en, lugar de acción)'],
      살아요: ['sarayo', 'vivo (de 살다=vivir)'],
      취미는: ['chwimi-neun', 'mi hobby (취미=hobby + 는=tema)'],
      음악이에요: ['eumak-ieyo', 'es música'],
      좋아해요: ['joahaeyo', 'me gusta / amo'],
      친구들이: ['chingudeuri', 'los amigos (들=plural + 이=sujeto)'],
      많아요: ['manayo', 'son muchos / hay muchos'],
    },
    preQ: [
      { q: '¿Cuántos idiomas hablas?', opts: ['Solo uno', 'Dos', 'Tres o más'] },
      { q: '¿Cuál es tu hobby?', opts: ['Música', 'Deportes', 'Lectura', 'Viajes'] },
    ],
    mcq: [
      { q: '¿Qué significa "저는 학생이에요"?', cat: 'Vocabulario', opts: ['Tengo un estudiante', 'Soy estudiante', 'El estudiante vino', 'Estudio coreano'], a: 1, fb: '"저는" = yo (tópico/tema), "학생이에요" = soy estudiante. La copula 이에요/예요 = ser.' },
      { q: '¿De dónde es Mina?', cat: 'Comprensión', opts: ['Japón', 'China', 'Corea', 'EE.UU.'], a: 2, fb: '"저는 한국 사람이에요" (jeoneun hanguk saram-ieyo) = Soy coreana. 한국 = Corea.' },
      { q: '¿Cuál es el hobby de Mina?', cat: 'Comprensión', opts: ['커피 (café)', '음악 (música)', '영어 (inglés)', '친구들 (amigos)'], a: 1, fb: '"취미는 음악이에요" = Mi hobby es la música. 취미 = hobby; 음악 = música.' },
      { q: '"좋아해요" (joahaeyo) significa:', cat: 'Vocabulario', opts: ['Tengo', 'Voy', 'Me gusta / Amo', 'Es bonito'], a: 2, fb: '"좋아해요" (joahaeyo) = me gusta / amo. De "좋아하다" (joahada). "커피를 좋아해요" = Me gusta el café.' },
      { q: '¿Cuántos amigos tiene Mina?', cat: 'Comprensión', opts: ['Pocos', 'Muchos', 'Ninguno', 'No se menciona'], a: 1, fb: '"친구들이 많아요" (chingudeuri manayo) = Tengo muchos amigos. 많아요 = son muchos.' },
    ],
    openQ: 'Preséntate en coreano en 3–4 oraciones. Usa: "저는 ___예요/이에요." "저는 ___ 사람이에요." "취미는 ___이에요/예요."',
    production: 'Puedes usar romanización si aún no dominas el hangul. Ejemplo: "Jeoneun ___ieyo. Jeoneun ___ saram-ieyo."',
  },
  {
    id: 2, title: '우리 가족', titleRom: 'Uri gajok', titleEs: 'Mi familia', topic: '가족 · Familia', words: 52, grammar: '있어요/없어요 · 이/가 · 은/는',
    text: '저는 가족이 네 명이에요. 아빠, 엄마, 오빠, 그리고 저예요. 아빠는 의사예요. 엄마는 선생님이에요. 오빠는 대학생이에요. 오빠는 스물두 살이에요. 저는 고등학생이에요. 우리 가족은 서울에 살아요. 강아지도 있어요. 이름이 코코예요.',
    textRom: 'Jeoneun gajok-i ne myeong-ieyo. Appa, eomma, oppa, geurigo jeo-yeyo. Appa-neun uisa-yeyo. Eomma-neun seonsaengnim-ieyo. Oppa-neun daehaksaeng-ieyo. Oppa-neun seumuldu sal-ieyo. Jeoneun godeungHakssaeng-ieyo. Uri gajok-eun Seoul-e sarayo. Gangaji-do isseoyo. Ireum-i Koko-yeyo.',
    vocab: {
      가족이: ['gajok-i', 'familia (+ partícula sujeto 이)'],
      네: ['ne', 'cuatro (número nativo)'],
      명이에요: ['myeong-ieyo', 'son ___ personas (명=contador de personas)'],
      그리고: ['geurigo', 'y / y también'],
      의사예요: ['uisa-yeyo', 'es médico/a'],
      선생님이에요: ['seonsaengnim-ieyo', 'es profesor/a'],
      대학생이에요: ['daehaksaeng-ieyo', 'es universitario/a'],
      스물두: ['seumuldu', '22 (números nativos)'],
      살이에요: ['sal-ieyo', 'tiene ___ años (살=año de edad)'],
      강아지도: ['gangaji-do', 'también hay un perro (도=también)'],
      이름이: ['ireum-i', 'el nombre (이름 + partícula sujeto 이)'],
    },
    preQ: [
      { q: '¿Cuántos miembros tiene tu familia?', opts: ['2-3 personas', '4-5 personas', '6 o más'] },
      { q: '¿Tienes mascota?', opts: ['Sí, un perro', 'Sí, un gato', 'Otra mascota', 'No'] },
    ],
    mcq: [
      { q: '¿Cuántos son en la familia de Mina?', cat: 'Comprensión', opts: ['3', '4', '5', '6'], a: 1, fb: '"가족이 네 명이에요" = en mi familia somos cuatro. 네 = 4 (número nativo); 명 = contador de personas.' },
      { q: '¿Cuál es la profesión del papá?', cat: 'Comprensión', opts: ['선생님 (profesor)', '학생 (estudiante)', '의사 (médico)', '변호사 (abogado)'], a: 2, fb: '"아빠는 의사예요" (appa-neun uisa-yeyo) = El papá es médico.' },
      { q: '¿Qué significa "도" en "강아지도 있어요"?', cat: 'Gramática', opts: ['Solo', 'También', 'No', 'Hay'], a: 1, fb: '"도" (do) = también. "강아지도 있어요" = También hay un perro / También tenemos un perro.' },
      { q: '"스물두 살이에요" — ¿cuántos años tiene el hermano?', cat: 'Comprensión', opts: ['20', '21', '22', '23'], a: 2, fb: '"스물두 살" = 22 años. 스물 = 20 (nativo); 두 = 2 (nativo). Para edades se usan números nativos.' },
      { q: '¿Cómo se llama el perro?', cat: 'Comprensión', opts: ['몽이 (Mongi)', '코코 (Koko)', '바둑이 (Baduki)', '복실이 (Boksiri)'], a: 1, fb: '"이름이 코코예요" = El nombre es Koko. 이름 = nombre; 이에요/예요 = es.' },
    ],
    openQ: 'Describe a tu familia en coreano (romanización OK). Menciona cuántos son, sus profesiones y edades.',
    production: 'Usa: "가족이 ___ 명이에요." "___(은/는) ___예요/이에요." "___ 살이에요."',
  },
  {
    id: 3, title: '오늘 뭐 해요?', titleRom: 'Oneul mwo haeyo?', titleEs: '¿Qué haces hoy?', topic: '일상 · Rutina diaria', words: 55, grammar: '-아/어요 verbos · 에 (hora) · 에서 (lugar)',
    text: '오늘은 바빠요. 아침에 학교에 가요. 열 시에 한국어 수업이 있어요. 점심에 친구랑 식당에서 밥을 먹어요. 오후에 도서관에서 공부해요. 저녁에 집에 와요. 집에서 숙제를 해요. 그다음에 음악을 들어요. 밤에 열한 시에 자요.',
    textRom: 'Oneul-eun bappayo. Achim-e hakgyo-e gayo. Yeol si-e hangugeo sueop-i isseoyo. Jeomsim-e chingu-rang sikdang-eseo bab-eul meogeoyo. Ohu-e doseogwan-eseo gongbu-haeyo. Jeonyeok-e jib-e wayo. Jib-eseo sukje-reul haeyo. Geudaeum-e eumak-eul deoreoyo. Bam-e yeolhan si-e jayo.',
    vocab: {
      바빠요: ['bappayo', 'estoy ocupado/a (bappuda=estar ocupado)'],
      아침에: ['achim-e', 'en la mañana (아침=mañana, 에=en/a tiempo)'],
      수업이: ['sueop-i', 'la clase (sujeto)'],
      점심에: ['jeomsim-e', 'al almuerzo / en el almuerzo'],
      친구랑: ['chingu-rang', 'con el/la amigo/a (랑=con, informal)'],
      식당에서: ['sikdang-eseo', 'en el restaurante (에서=en, lugar de acción)'],
      밥을: ['bab-eul', 'el arroz/comida (objeto, 을)'],
      먹어요: ['meogeoyo', 'como (de 먹다=comer)'],
      공부해요: ['gongbu-haeyo', 'estudio (공부하다=estudiar)'],
      숙제를: ['sukje-reul', 'la tarea (objeto, 를)'],
      들어요: ['deoreoyo', 'escucho (de 듣다=escuchar)'],
      자요: ['jayo', 'me duermo / duermo (de 자다=dormir)'],
    },
    preQ: [
      { q: '¿Cuándo eres más productivo/a?', opts: ['Mañana', 'Tarde', 'Noche', 'Cualquier hora'] },
      { q: '¿Dónde sueles estudiar?', opts: ['En casa', 'En la biblioteca', 'En un café', 'En la universidad'] },
    ],
    mcq: [
      { q: '¿A qué hora tiene clase de coreano?', cat: 'Comprensión', opts: ['아홉 시 (9h)', '열 시 (10h)', '열한 시 (11h)', '열두 시 (12h)'], a: 1, fb: '"열 시에 한국어 수업이 있어요" = A las 10 hay clase de coreano. 열 = 10 (número nativo); 시 = hora.' },
      { q: '¿Con quién almuerza?', cat: 'Comprensión', opts: ['Sola', 'Con su familia', 'Con un/a amigo/a', 'Con su profesor/a'], a: 2, fb: '"친구랑 식당에서 밥을 먹어요" = Come con un/a amigo/a en el restaurante. 친구랑 = con el/la amigo/a.' },
      { q: '¿Cuál es la diferencia entre 에 y 에서 en este texto?', cat: 'Gramática', opts: ['"에" = de dónde; "에서" = hacia dónde', '"에" = para tiempo/destino; "에서" = lugar donde ocurre la acción', 'Son intercambiables', '"에서" = en un edificio; "에" = al aire libre'], a: 1, fb: '"에" después de tiempo = "a las ___" / "en la mañana"; "에" después de lugar = destino (학교에 가요=voy a la escuela). "에서" = lugar donde ocurre la acción (식당에서 먹어요=como EN el restaurante).' },
      { q: '"음악을 들어요" significa:', cat: 'Vocabulario', opts: ['Escucho música', 'Toco música', 'Canto música', 'Bailo música'], a: 0, fb: '"음악을 들어요" (eumak-eul deoreoyo) = Escucho música. 음악 = música; 들다 = escuchar.' },
      { q: '¿A qué hora se duerme?', cat: 'Comprensión', opts: ['열 시 (10h)', '열한 시 (11h)', '열두 시 (12h)', '자정 (medianoche)'], a: 1, fb: '"밤에 열한 시에 자요" = Me duermo a las 11 de la noche. 열한 = 11 (nativo); 자요 = duermo.' },
    ],
    openQ: 'Describe tu día de hoy (o un día típico) en coreano. Usa al menos 4 verbos en -아요/어요 y menciona los horarios.',
    production: 'Patrón: "아침에 ___에 가요. ___ 시에 ___이/가 있어요. 저녁에 집에서 ___해요."',
  },
  {
    id: 4, title: '시장에서 쇼핑해요', titleRom: 'Sijang-eseo syoping-haeyo', titleEs: 'De compras en el mercado', topic: '쇼핑 · Compras', words: 58, grammar: '얼마예요? · 주세요 · 개/병 (contadores)',
    text: '오늘 시장에 가요. 시장에 과일이 많아요. 사과를 사요. "사과 얼마예요?" "한 개에 오백 원이에요." "다섯 개 주세요." 바나나도 사요. 바나나 한 묶음에 천 원이에요. 물도 필요해요. 편의점에서 물 한 병을 사요. 이백 원이에요. 모두 이천칠백 원이에요.',
    textRom: 'Oneul sijang-e gayo. Sijang-e gwail-i manayo. Sagwa-reul sayo. "Sagwa eolmayeyo?" "Han gae-e obaek won-ieyo." "Daseot gae juseyo." Banana-do sayo. Banana han mukeum-e cheon won-ieyo. Mul-do piryohaeyo. Pyeonuijeom-eseo mul han byeong-eul sayo. Ibaek won-ieyo. Modu icheon chilbaek won-ieyo.',
    vocab: {
      시장에: ['sijang-e', 'al mercado (시장=mercado, 에=a/en)'],
      과일이: ['gwail-i', 'la fruta (sujeto)'],
      사과를: ['sagwa-reul', 'la manzana (objeto)'],
      사요: ['sayo', 'compro (de 사다=comprar)'],
      얼마예요: ['eolmayeyo', '¿cuánto es? (precio)'],
      '한 개에': ['han gae-e', 'por unidad (개=unidad contador general)'],
      '오백 원': ['obaek won', '500 wones (오백=500)'],
      묶음: ['mukeum', 'racimo/manojo (contador para racimos)'],
      필요해요: ['piryohaeyo', 'necesito (필요하다=necesitar)'],
      편의점: ['pyeonuijeom', 'tienda de conveniencia (7-Eleven, GS25...)'],
      '한 병': ['han byeong', 'una botella (병=botella, contador)'],
      모두: ['modu', 'en total/todo'],
    },
    preQ: [
      { q: '¿Has ido alguna vez a un mercado coreano o asiático?', opts: ['Sí, varias veces', 'Solo una vez', 'No, pero me gustaría'] },
      { q: '¿Sabes cómo decir los números del 100 al 1000 en coreano?', opts: ['Sí', 'Algunos', 'No aún'] },
    ],
    mcq: [
      { q: '¿Qué significa "얼마예요?" (eolmayeyo?)', cat: 'Vocabulario', opts: ['¿Dónde está?', '¿Cuánto cuesta?', '¿Qué es esto?', '¿Cuántos hay?'], a: 1, fb: '"얼마예요?" = ¿cuánto cuesta? / ¿cuánto es? Imprescindible para hacer compras en Corea.' },
      { q: '¿Cuántas manzanas compra?', cat: 'Comprensión', opts: ['한 개 (1)', '세 개 (3)', '다섯 개 (5)', '열 개 (10)'], a: 2, fb: '"다섯 개 주세요" = cinco unidades, por favor. 다섯 = 5 (número nativo); 개 = unidad (contador general).' },
      { q: '"주세요" al final de una frase significa:', cat: 'Gramática', opts: ['¿Cuánto cuesta?', '___ por favor (deme)', 'Aquí tiene', '¿Tiene ___?'], a: 1, fb: '"주세요" (juseyo) = por favor deme / deme. De 주다 (juda) = dar. [objeto] + 주세요 es la forma más útil para pedir cosas.' },
      { q: '¿Dónde compra el agua?', cat: 'Comprensión', opts: ['En el mercado', 'En el supermercado', 'En la tienda de conveniencia', 'En casa'], a: 2, fb: '"편의점에서 물 한 병을 사요" = compra una botella de agua en la tienda de conveniencia (편의점 = GS25, 7-Eleven...).' },
      { q: '¿Cuál es el total de la compra?', cat: 'Comprensión', opts: ['천 원', '이천 원', '이천칠백 원', '삼천 원'], a: 2, fb: '"모두 이천칠백 원이에요" = en total son 2.700 wones. 이천=2000, 칠백=700.' },
    ],
    openQ: 'Escribe un diálogo corto de compras: "___이/가 얼마예요?" / "___ 원이에요." / "___ 개/병 주세요."',
    production: 'Usa: 얼마예요?, ___ 원이에요, ___ 개/병/묶음 주세요, 모두 ___ 원이에요.',
  },
  {
    id: 5, title: '우리 동네', titleRom: 'Uri dongne', titleEs: 'Mi barrio', topic: '장소 · Lugares', words: 62, grammar: '있어요/없어요 + 장소 · 에서 · 근처에',
    text: '저는 서울에 살아요. 우리 동네는 아주 좋아요. 집 근처에 편의점이 있어요. 슈퍼마켓도 있어요. 카페도 있어요. 저는 카페를 좋아해요. 카페에서 커피를 마셔요. 그런데 지하철역이 없어요. 버스로 가요. 공원도 있어요. 주말에 공원에서 산책해요. 우리 동네에 학교가 많아요.',
    textRom: 'Jeoneun Seoul-e sarayo. Uri dongne-neun aju johayo. Jip geuncheo-e pyeonuijeom-i isseoyo. Syupeomaket-do isseoyo. Kape-do isseoyo. Jeoneun kape-reul johahaeyo. Kape-eseo keopi-reul masyeoyo. Geureonde jihachelyeog-i eopseoyo. Beosu-ro gayo. Gongwon-do isseoyo. Jumal-e gongwon-eseo sanchaek-haeyo. Uri dongne-e hakgyo-ga manayo.',
    vocab: {
      살아요: ['sarayo', 'vivo (de 살다=vivir)'],
      동네는: ['dongne-neun', 'el barrio (tópico)'],
      아주: ['aju', 'muy/bastante'],
      근처에: ['geuncheo-e', 'cerca de / en las cercanías'],
      그런데: ['geureonde', 'pero/sin embargo/por cierto'],
      지하철역이: ['jihachelyeog-i', 'la estación de metro (sujeto)'],
      없어요: ['eopseoyo', 'no hay / no existe (eobda)'],
      버스로: ['beosu-ro', 'en bus (로=medio de transporte)'],
      공원에서: ['gongwon-eseo', 'en el parque (에서=lugar de acción)'],
      산책해요: ['sanchaek-haeyo', 'paseo/camino (산책하다=dar un paseo)'],
      주말에: ['jumal-e', 'los fines de semana (주말=fin de semana)'],
    },
    preQ: [
      { q: '¿Cómo es tu barrio?', opts: ['Muy animado', 'Tranquilo', 'Está en desarrollo', 'Es nuevo para mí'] },
      { q: '¿Qué tienes cerca de tu casa?', opts: ['Tiendas y cafés', 'Parques', 'Metro/bus', 'Todo lo anterior'] },
    ],
    mcq: [
      { q: '"있어요" y "없어요" — ¿cuál es la diferencia?', cat: 'Gramática', opts: ['"있어요"=hay; "없어요"=no hay', '"있어요"=es; "없어요"=no es', '"있어요"=va; "없어요"=no va', 'Son sinónimos'], a: 0, fb: '"있어요" (isseoyo) = hay/existe/tengo; "없어요" (eopseoyo) = no hay/no existe/no tengo. Son los verbos de existencia del coreano.' },
      { q: '¿Qué NO hay cerca del barrio?', cat: 'Comprensión', opts: ['편의점', '슈퍼마켓', '지하철역', '카페'], a: 2, fb: '"지하철역이 없어요" = no hay estación de metro. Pero sí hay: tienda de conveniencia (편의점), supermercado y café.' },
      { q: '¿Cómo va al lugar de transporte?', cat: 'Comprensión', opts: ['En metro', 'Caminando', 'En bus', 'En taxi'], a: 2, fb: '"버스로 가요" = voy en bus. 버스로 = en bus (로 después de vocal indica medio de transporte).' },
      { q: '"카페를 좋아해요" significa:', cat: 'Vocabulario', opts: ['Voy al café', 'Me gusta el café', 'Trabajo en un café', 'El café es bueno'], a: 1, fb: '"좋아해요" (johahaeyo) = me gusta (de 좋아하다). ¡Ojo! "좋아요" (johayo) = es bueno/está bien. "좋아해요" = me gusta activamente.' },
      { q: '¿Qué hace en el parque los fines de semana?', cat: 'Comprensión', opts: ['Estudia', 'Da un paseo', 'Practica deportes', 'Toma café'], a: 1, fb: '"주말에 공원에서 산책해요" = los fines de semana paseo en el parque. 산책 = paseo/caminata.' },
    ],
    openQ: 'Describe tu barrio: "우리 동네에 ___이/가 있어요. ___ 없어요. 저는 ___을/를 좋아해요."',
    production: 'Usa: 동네에/근처에 + [lugar] + 있어요/없어요; 에서 (lugar de acción); 좋아해요/싫어요.',
  },
];

function ReadingLesson({ t, onBack }: { t: ReadingText; onBack: () => void }) {
  const [phase, setPhase] = useState<'pre' | 'read' | 'questions' | 'done'>('pre');
  const [preAnswers, setPreAnswers] = useState<Record<number, number>>({});
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [activeInfo, setActiveInfo] = useState<[string, string] | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [openAns, setOpenAns] = useState('');
  const [showRom, setShowRom] = useState(false);

  const tokens = t.text.split(/(\s+|[!?.,·]+)/).filter(Boolean).map(tk => ({
    raw: tk, isSpace: /^\s+$/.test(tk), isPunct: /^[!?.,·]+$/.test(tk),
    clean: tk.replace(/[^가-힣]/g, ''),
  }));
  const allDone = t.mcq.every((_, i) => answers[i] !== undefined);
  const score = t.mcq.filter((q, i) => answers[i] === q.a).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={onBack} className="btn btn-ghost btn-sm">← 모든 텍스트</button>
        <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>텍스트 {t.id} / 3 — {t.titleEs}</span>
        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>📝 ~{t.words} 단어 · {t.grammar}</span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {(['pre', 'read', 'questions', 'done'] as const).map((p, i) => {
          const labels = ['Antes', 'Lectura', 'Preguntas', 'Resultado'];
          const phaseOrder = ['pre', 'read', 'questions', 'done'];
          const current = phase === p; const past = phaseOrder.indexOf(p) < phaseOrder.indexOf(phase);
          return (
            <div key={p} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: '100%', height: 4, borderRadius: 2, background: current ? COLOR : past ? `${COLOR}66` : 'var(--line-soft)' }} />
              <span style={{ fontSize: '0.62rem', fontFamily: 'var(--mono)', color: current ? COLOR : 'var(--muted)', fontWeight: current ? 800 : 400 }}>{labels[i]}</span>
            </div>
          );
        })}
      </div>

      {phase === 'pre' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="ink-line" />읽기 전에 — antes de leer</p>
          {t.preQ.map((pq, i) => (
            <div key={i} style={{ marginBottom: '1.25rem' }}>
              <p style={{ margin: '0 0 0.65rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.96rem' }}>{i + 1}. {pq.q}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {pq.opts.map((opt, oi) => (
                  <button key={oi} onClick={() => setPreAnswers(p => ({ ...p, [i]: oi }))}
                    className={preAnswers[i] === oi ? 'btn btn-sm' : 'btn btn-ghost btn-sm'} style={{ fontSize: '0.84rem' }}>{opt}</button>
                ))}
              </div>
            </div>
          ))}
          <button className="btn btn-sm" onClick={() => setPhase('read')} style={{ background: COLOR, borderColor: COLOR }}>읽기 시작 →</button>
        </div>
      )}

      {phase === 'read' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <p className="eyebrow" style={{ margin: 0 }}><span className="ink-line" />{t.title}</p>
            <button onClick={() => setShowRom(!showRom)} className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem' }}>
              {showRom ? '🔤 Ocultar romanización' : '🔤 Ver romanización'}
            </button>
          </div>
          {showRom && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: 10, background: `${COLOR}08`, border: `1px solid ${COLOR}22`, fontSize: '0.84rem', color: COLOR, lineHeight: 1.7, fontStyle: 'italic' }}>
              {t.textRom}
            </div>
          )}
          <div style={{ lineHeight: 2.4, fontSize: '1.1rem', color: 'var(--ink)', position: 'relative', marginBottom: '1.25rem' }}>
            {tokens.map((tk, i) => {
              if (tk.isSpace || tk.isPunct) return <span key={i}>{tk.raw}</span>;
              const info = t.vocab[tk.clean] ?? null;
              const isActive = activeIdx === i;
              return (
                <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                  <button onClick={() => { setActiveInfo(info); setActiveIdx(i); }}
                    style={{ background: isActive ? `${COLOR}18` : info ? `${COLOR}08` : 'transparent', border: isActive ? `1.5px solid ${COLOR}` : info ? `1px dashed ${COLOR}44` : 'none', borderRadius: 6, padding: '0 3px', cursor: info ? 'pointer' : 'default', fontSize: 'inherit', fontFamily: 'inherit', color: isActive ? COLOR : 'inherit', fontWeight: isActive ? 700 : 'inherit' }}>{tk.raw}</button>
                  {isActive && (
                    <span style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', background: info ? '#1e1b4b' : '#6f7691', color: '#fff', borderRadius: 8, padding: '0.3rem 0.85rem', fontSize: '0.73rem', fontWeight: 600, whiteSpace: 'nowrap', zIndex: 10, boxShadow: '0 4px 16px rgba(83,74,183,0.3)', marginTop: 4, maxWidth: 280, textAlign: 'center' }}>
                      {info ? <>{info[0]} — {info[1]}</> : '(sin notas)'}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--line-soft)' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('questions'); setActiveInfo(null); setActiveIdx(null); }} style={{ background: COLOR, borderColor: COLOR }}>이해 확인 →</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setPhase('pre')}>← 처음으로</button>
          </div>
        </div>
      )}

      {phase === 'questions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setPhase('read')}>← 텍스트 다시</button>
          {t.mcq.map((q, qi) => {
            const ans = answers[qi]; const done = ans !== undefined;
            return (
              <div key={qi} className="wl-card" style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>{q.cat} · 질문 {qi + 1}</div>
                <p style={{ margin: '0 0 0.85rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{q.q}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {q.opts.map((opt, oi) => {
                    const isCorrect = oi === q.a; const isSelected = ans === oi;
                    let bg = 'var(--bg)'; let border = '1.5px solid var(--line-soft)'; let color = 'var(--ink)';
                    if (done && isSelected && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
                    if (done && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
                    if (done && !isSelected && isCorrect) { bg = 'rgba(5,150,105,0.06)'; border = '1.5px solid #059669'; color = '#059669'; }
                    return (
                      <button key={oi} onClick={() => { if (answers[qi] !== undefined) return; setAnswers(p => ({ ...p, [qi]: oi })); }} disabled={done}
                        style={{ textAlign: 'left', padding: '0.6rem 0.9rem', borderRadius: 10, border, background: bg, color, fontSize: '0.9rem', cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', fontWeight: 700, opacity: 0.55 }}>{String.fromCharCode(65 + oi)}.</span>{opt}
                        {done && isCorrect && <span style={{ marginLeft: 'auto' }}>✓</span>}
                        {done && isSelected && !isCorrect && <span style={{ marginLeft: 'auto' }}>✗</span>}
                      </button>
                    );
                  })}
                </div>
                {done && <div style={{ marginTop: '0.7rem', padding: '0.6rem 0.85rem', borderRadius: 8, background: ans === q.a ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--ink-2)' }}>{ans === q.a ? '✅ ' : '💡 '}{q.fb}</div>}
              </div>
            );
          })}
          <div className="wl-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>자유 쓰기 — Producción libre</div>
            <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{t.openQ}</p>
            <p style={{ margin: '0 0 0.85rem', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>💡 {t.production}</p>
            <textarea value={openAns} onChange={e => setOpenAns(e.target.value)} rows={4} placeholder="한국어로 써요... (o en romanización)" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          {allDone && <button className="btn btn-sm" onClick={() => setPhase('done')} style={{ background: COLOR, borderColor: COLOR }}>결과 보기 →</button>}
        </div>
      )}

      {phase === 'done' && (
        <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>{score === t.mcq.length ? '🏆' : score >= 3 ? '⭐' : '📚'}</div>
          <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)' }}>{score} / {t.mcq.length} 정답</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>
            {score === t.mcq.length ? '완벽해요! ¡Perfecto!' : score >= 3 ? '잘 했어요! Muy bien.' : '다시 읽어요. Vuelve a leer.'}
          </p>
          {openAns && (
            <div style={{ padding: '1rem', borderRadius: 12, background: `${COLOR}08`, border: `1px solid ${COLOR}22`, marginBottom: '1.25rem', textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', marginBottom: '0.4rem' }}>자유 쓰기</div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{openAns}</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('read'); setAnswers({}); setOpenAns(''); }} style={{ background: COLOR, borderColor: COLOR }}>다시 읽기</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← 모든 텍스트</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LecturaCoreanoA1() {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/coreano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano A1</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>📖 읽기</span>
          </div>
          <ReadingLesson t={TEXTS[selected]} onBack={() => setSelected(null)} />
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
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 읽기 · Lectura</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />읽기 · Lectura Coreano A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Lectura A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>3 textos en 한글 con romanización disponible y vocabulario interactivo. Haz clic en las palabras resaltadas para ver su romanización y significado.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TEXTS.map((t, i) => (
            <button key={t.id} onClick={() => setSelected(i)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}06` }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, flexShrink: 0 }}>{t.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem', marginBottom: '0.1rem' }}>{t.title}</div>
                  <div style={{ fontSize: '0.73rem', color: COLOR, fontStyle: 'italic', marginBottom: '0.1rem' }}>{t.titleRom}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>~{t.words} 단어 · {t.grammar} · {t.mcq.length} preguntas</p>
                </div>
                <span style={{ color: COLOR, fontSize: '1.1rem', fontWeight: 700, flexShrink: 0 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
