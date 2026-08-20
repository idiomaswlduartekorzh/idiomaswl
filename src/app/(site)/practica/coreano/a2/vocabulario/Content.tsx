'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = 'var(--wlp-accent-vocabulario)';
/** El color al N % de opacidad. Antes se escribía pegando la transparencia en
    hexadecimal (`${COLOR}14`), que con una variable CSS no se puede. */
const COLORMix = (p: number) => `color-mix(in srgb, ${COLOR} ${p}%, transparent)`;

interface Word { word: string; romaja: string; es: string; emoji: string; example: string; exampleRomaja: string; exampleEs: string; }
interface VocabSet { id: string; name: string; nameKo: string; icon: string; words: Word[]; }

const SETS: VocabSet[] = [
  {
    id: 'yehaeng', name: 'Viajes y transporte', nameKo: '여행과 교통', icon: '✈️',
    words: [
      { word: '티켓', romaja: 'tiket', es: 'billete / tiquete', emoji: '🎫', example: '비행기 티켓을 예매했어요.', exampleRomaja: 'Bihaenggi tiketeul yeamaehasseoyo.', exampleEs: 'Reservé el billete de avión.' },
      { word: '여권', romaja: 'yeogwon', es: 'pasaporte', emoji: '📕', example: '여권을 잃어버렸어요.', exampleRomaja: 'Yeogwoneul ireobeoryeosseoyo.', exampleEs: 'Perdí el pasaporte.' },
      { word: '짐', romaja: 'jim', es: 'equipaje', emoji: '🧳', example: '짐이 너무 무거워요.', exampleRomaja: 'Jimi neomu mugeowoyo.', exampleEs: 'El equipaje es demasiado pesado.' },
      { word: '세관', romaja: 'segwan', es: 'aduana', emoji: '🛃', example: '세관을 통과했어요.', exampleRomaja: 'Segwaneul tonggwahaesseoyo.', exampleEs: 'Pasé por la aduana.' },
      { word: '탑승구', romaja: 'tapseunggu', es: 'puerta de embarque', emoji: '🚪', example: '탑승구가 어디예요?', exampleRomaja: 'Tapseunggu ga eodiyeyo?', exampleEs: '¿Dónde está la puerta de embarque?' },
      { word: '목적지', romaja: 'mokjeokji', es: 'destino', emoji: '📍', example: '목적지는 서울이에요.', exampleRomaja: 'Mokjeokjineun Seouli-eyo.', exampleEs: 'El destino es Seúl.' },
      { word: '출발', romaja: 'chulbal', es: 'salida / partida', emoji: '🚀', example: '출발 시간이 언제예요?', exampleRomaja: 'Chulbal sigani eonjeyeyo?', exampleEs: '¿A qué hora es la salida?' },
      { word: '도착', romaja: 'dochak', es: 'llegada', emoji: '🛬', example: '도착 시간은 오후 3시예요.', exampleRomaja: 'Dochak siganeun ohu 3si-eyo.', exampleEs: 'La llegada es a las 3 de la tarde.' },
      { word: '환승', romaja: 'hwanseung', es: 'transbordo / trasbordo', emoji: '🔄', example: '인천에서 환승해야 해요.', exampleRomaja: 'Incheone-seo hwanseunghaeeya haeyo.', exampleEs: 'Tengo que hacer transbordo en Incheon.' },
      { word: '예약', romaja: 'yeyak', es: 'reserva', emoji: '📅', example: '호텔을 예약했어요.', exampleRomaja: 'Hoteleul yeyakhaesseoyo.', exampleEs: 'Hice una reserva de hotel.' },
    ],
  },
  {
    id: 'il', name: 'Trabajo y carrera', nameKo: '일과 직업', icon: '💼',
    words: [
      { word: '월급', romaja: 'wolgeup', es: 'salario / sueldo mensual', emoji: '💰', example: '월급이 올랐어요.', exampleRomaja: 'Wolgeubi olrasseoyo.', exampleEs: 'El salario aumentó.' },
      { word: '동료', romaja: 'dongnyo', es: 'colega / compañero/a', emoji: '🤝', example: '동료들이 친절해요.', exampleRomaja: 'Dongnyodeuri chinjeolhaeyo.', exampleEs: 'Los colegas son amables.' },
      { word: '상사', romaja: 'sangsa', es: 'jefe / jefa', emoji: '👔', example: '상사에게 보고했어요.', exampleRomaja: 'Sangsaege bogohasseoyo.', exampleEs: 'Le informé a mi jefe.' },
      { word: '마감', romaja: 'magam', es: 'fecha límite / plazo', emoji: '⏰', example: '마감이 내일이에요.', exampleRomaja: 'Magami naeil-i-eyo.', exampleEs: 'La fecha límite es mañana.' },
      { word: '회의', romaja: 'hoeui', es: 'reunión', emoji: '📋', example: '오전에 회의가 있어요.', exampleRomaja: 'Ojeone hoeui-ga isseoyo.', exampleEs: 'Hay una reunión por la mañana.' },
      { word: '승진', romaja: 'seungjin', es: 'ascenso / promoción', emoji: '⬆️', example: '이번 달에 승진했어요.', exampleRomaja: 'Ibeon dare seungjinhaesseoyo.', exampleEs: 'Me ascendieron este mes.' },
      { word: '사직하다', romaja: 'sajikada', es: 'renunciar / dimitir', emoji: '🚪', example: '그녀는 회사를 사직했어요.', exampleRomaja: 'Geunyeoneun hoesareul sajikhaesseoyo.', exampleEs: 'Ella renunció a la empresa.' },
      { word: '채용하다', romaja: 'chaeyonghada', es: 'contratar', emoji: '📝', example: '새 직원을 채용했어요.', exampleRomaja: 'Sae jiGwoneul chaeyonghaesseoyo.', exampleEs: 'Contrataron a un nuevo empleado.' },
      { word: '초과 근무', romaja: 'chogwa geunmu', es: 'horas extra', emoji: '⌚', example: '어제 초과 근무를 했어요.', exampleRomaja: 'Eoje chogwa geunmureul haesseoyo.', exampleEs: 'Ayer hice horas extra.' },
      { word: '취업하다', romaja: 'chwieopada', es: 'encontrar empleo', emoji: '🎯', example: '드디어 취업했어요!', exampleRomaja: 'Deudie-o chwieop-haesseoyo!', exampleEs: '¡Por fin encontré trabajo!' },
    ],
  },
  {
    id: 'shoping', name: 'Compras y dinero', nameKo: '쇼핑과 돈', icon: '🛍️',
    words: [
      { word: '영수증', romaja: 'yeongsujeung', es: 'recibo', emoji: '🧾', example: '영수증을 주세요.', exampleRomaja: 'Yeongsujeungeul juseyo.', exampleEs: 'Deme el recibo, por favor.' },
      { word: '할인', romaja: 'halin', es: 'descuento', emoji: '🏷️', example: '10% 할인이 있어요.', exampleRomaja: '10% halini isseoyo.', exampleEs: 'Hay un descuento del 10%.' },
      { word: '환불', romaja: 'hwanbul', es: 'reembolso / devolución', emoji: '↩️', example: '환불이 가능해요?', exampleRomaja: 'Hwanbul-i ganeunghaeyo?', exampleEs: '¿Es posible el reembolso?' },
      { word: '득템', romaja: 'deukttem', es: 'ganga / buena compra', emoji: '🤑', example: '이건 완전 득템이에요!', exampleRomaja: 'Igeon wanjeon deukttem-ieyo!', exampleEs: '¡Esto es una ganga total!' },
      { word: '현금', romaja: 'hyeongeum', es: 'efectivo', emoji: '💵', example: '현금으로 계산할게요.', exampleRomaja: 'Hyeongeumero gyesanhalgeyo.', exampleEs: 'Pagaré en efectivo.' },
      { word: '신용카드', romaja: 'sinyong kadeu', es: 'tarjeta de crédito', emoji: '💳', example: '신용카드로 결제해요.', exampleRomaja: 'Sinyong kadeuro gyeoljeehaeyo.', exampleEs: 'Pago con tarjeta de crédito.' },
      { word: '거스름돈', romaja: 'geoseureumddon', es: 'cambio / vuelto', emoji: '🪙', example: '거스름돈이 틀려요.', exampleRomaja: 'Geoseureumdoni teullye-yo.', exampleEs: 'El cambio es incorrecto.' },
      { word: '가격', romaja: 'gagyeok', es: 'precio', emoji: '🏷️', example: '가격이 얼마예요?', exampleRomaja: 'Gagyeogi eolmayeyo?', exampleEs: '¿Cuánto es el precio?' },
      { word: '세일', romaja: 'sel', es: 'rebajas / oferta', emoji: '📉', example: '세일 기간이 이번 주예요.', exampleRomaja: 'Sel gigani ibeon juyeyo.', exampleEs: 'El período de rebajas es esta semana.' },
      { word: '가격표', romaja: 'gagyeokpyo', es: 'etiqueta de precio', emoji: '🏷️', example: '가격표를 확인해요.', exampleRomaja: 'Gagyeokpyoreul hwagin-haeyo.', exampleEs: 'Reviso la etiqueta de precio.' },
    ],
  },
  {
    id: 'geongang', name: 'Salud y cuerpo', nameKo: '건강과 몸', icon: '🏥',
    words: [
      { word: '두통', romaja: 'dutong', es: 'dolor de cabeza', emoji: '🤕', example: '두통이 심해요.', exampleRomaja: 'Dutong-i simhaeyo.', exampleEs: 'El dolor de cabeza es fuerte.' },
      { word: '열', romaja: 'yeol', es: 'fiebre', emoji: '🌡️', example: '열이 38도예요.', exampleRomaja: 'Yeoli 38do-yeyo.', exampleEs: 'La fiebre es de 38 grados.' },
      { word: '처방전', romaja: 'cheopangjeon', es: 'receta médica', emoji: '📋', example: '처방전이 있어야 해요.', exampleRomaja: 'Cheopangjeon-i isseoya haeyo.', exampleEs: 'Se necesita receta médica.' },
      { word: '약국', romaja: 'yakguk', es: 'farmacia', emoji: '💊', example: '약국이 근처에 있어요.', exampleRomaja: 'Yakgug-i geuncheoe isseoyo.', exampleEs: 'Hay una farmacia cerca.' },
      { word: '증상', romaja: 'jeungsang', es: 'síntoma', emoji: '🔍', example: '증상이 어떠세요?', exampleRomaja: 'Jeungsang-i eotteo-seyo?', exampleEs: '¿Cuáles son sus síntomas?' },
      { word: '진찰', romaja: 'jinchal', es: 'consulta médica', emoji: '🩺', example: '의사한테 진찰을 받았어요.', exampleRomaja: 'Uisahante jinchareul badasseoyo.', exampleEs: 'Me hice una consulta con el médico.' },
      { word: '외과 의사', romaja: 'oegwa uisa', es: 'cirujano/a', emoji: '🔬', example: '외과 의사가 수술했어요.', exampleRomaja: 'Oegwa uisa-ga susulhaesseoyo.', exampleEs: 'El cirujano realizó la operación.' },
      { word: '회복하다', romaja: 'hoebokada', es: 'recuperarse', emoji: '💪', example: '빨리 회복하세요!', exampleRomaja: 'Ppalli hoebokaseyo!', exampleEs: '¡Recupérese pronto!' },
      { word: '알레르기', romaja: 'allereuggi', es: 'alergia', emoji: '🤧', example: '꽃가루 알레르기가 있어요.', exampleRomaja: 'Kkotgaru allereuggi-ga isseoyo.', exampleEs: 'Tengo alergia al polen.' },
      { word: '주사', romaja: 'jusa', es: 'inyección', emoji: '💉', example: '주사를 맞았어요.', exampleRomaja: 'Jusareul majasseoyo.', exampleEs: 'Me pusieron una inyección.' },
    ],
  },
  {
    id: 'seonggyeok', name: 'Describir personas', nameKo: '성격과 성품', icon: '👤',
    words: [
      { word: '자신감이 있는', romaja: 'jajin-gami inneun', es: 'seguro/a de sí mismo/a', emoji: '😎', example: '그녀는 자신감이 있는 사람이에요.', exampleRomaja: 'Geunyeoneun jajin-gami inneun saram-ieyo.', exampleEs: 'Ella es una persona segura de sí misma.' },
      { word: '야망 있는', romaja: 'yamang inneun', es: 'ambicioso/a', emoji: '🚀', example: '그는 야망 있는 직원이에요.', exampleRomaja: 'Geuneun yamang inneun jig-won-ieyo.', exampleEs: 'Él es un empleado ambicioso.' },
      { word: '믿음직한', romaja: 'mideumjikhan', es: 'confiable / de confianza', emoji: '🤝', example: '믿음직한 친구가 있어요.', exampleRomaja: 'Mideumjikhan chingu-ga isseoyo.', exampleEs: 'Tengo un amigo confiable.' },
      { word: '고집이 센', romaja: 'gojib-i sen', es: 'terco/a / obstinado/a', emoji: '🐂', example: '그는 고집이 센 사람이에요.', exampleRomaja: 'Geuneun gojib-i sen saram-ieyo.', exampleEs: 'Él es una persona terca.' },
      { word: '관대한', romaja: 'gwandaehan', es: 'generoso/a', emoji: '🎁', example: '선생님이 아주 관대해요.', exampleRomaja: 'Seonsaengnim-i aju gwandaehaeyo.', exampleEs: 'El/la profesor/a es muy generoso/a.' },
      { word: '인내심이 있는', romaja: 'innaesim-i inneun', es: 'paciente', emoji: '⏳', example: '좋은 선생님은 인내심이 있어야 해요.', exampleRomaja: 'Joeun seonsaengnim-eun innaesim-i isseoya haeyo.', exampleEs: 'Un buen maestro debe ser paciente.' },
      { word: '호기심이 많은', romaja: 'hogisim-i manheun', es: 'curioso/a', emoji: '🔍', example: '아이들은 호기심이 많아요.', exampleRomaja: 'Aideureun hogisim-i manhayo.', exampleEs: 'Los niños son muy curiosos.' },
      { word: '수줍은', romaja: 'sujubeun', es: 'tímido/a', emoji: '😊', example: '저는 원래 수줍은 편이에요.', exampleRomaja: 'Jeoneun wollae sujubeun pyeon-ieyo.', exampleEs: 'Yo soy un poco tímido/a de naturaleza.' },
      { word: '사교적인', romaja: 'sagyo-jogin', es: 'sociable', emoji: '🎉', example: '그녀는 아주 사교적인 성격이에요.', exampleRomaja: 'Geunyeoneun aju sagyo-jogin seonggyeog-ieyo.', exampleEs: 'Ella tiene un carácter muy sociable.' },
      { word: '정직한', romaja: 'jeongjikhan', es: 'honesto/a', emoji: '✅', example: '정직한 사람을 좋아해요.', exampleRomaja: 'Jeongjikhan sarameul joahaeyo.', exampleEs: 'Me gustan las personas honestas.' },
    ],
  },
  {
    id: 'jip', name: 'Casa y hogar', nameKo: '집과 주거', icon: '🏠',
    words: [
      { word: '원룸', romaja: 'wonrum', es: 'estudio / monoambiente', emoji: '🏢', example: '저는 원룸에 살아요.', exampleRomaja: 'Jeoneun wonrum-e sarayo.', exampleEs: 'Yo vivo en un estudio.' },
      { word: '월세', romaja: 'wolse', es: 'alquiler mensual', emoji: '💸', example: '월세가 많이 올랐어요.', exampleRomaja: 'Wolse-ga mani ollasseoyo.', exampleEs: 'El alquiler subió mucho.' },
      { word: '집주인', romaja: 'jipjuin', es: 'dueño/a del inmueble / casero/a', emoji: '🔑', example: '집주인이 친절해요.', exampleRomaja: 'Jipjuin-i chinjeolhaeyo.', exampleEs: 'El/la dueño/a es amable.' },
      { word: '세입자', romaja: 'seipcja', es: 'inquilino/a', emoji: '🏠', example: '세입자가 이사를 갔어요.', exampleRomaja: 'Seipcja-ga isa-reul gasseoyo.', exampleEs: 'El/la inquilino/a se mudó.' },
      { word: '가구', romaja: 'gagu', es: 'muebles', emoji: '🪑', example: '새 가구를 샀어요.', exampleRomaja: 'Sae gagureul sasseoyo.', exampleEs: 'Compré muebles nuevos.' },
      { word: '아파트 단지', romaja: 'apateu danji', es: 'conjunto residencial', emoji: '🏙️', example: '이 아파트 단지는 커요.', exampleRomaja: 'I apateu danji-neun keoyo.', exampleEs: 'Este conjunto residencial es grande.' },
      { word: '이사', romaja: 'isa', es: 'mudanza', emoji: '📦', example: '다음 달에 이사해요.', exampleRomaja: 'Daeum dare isahaeyo.', exampleEs: 'Me mudo el próximo mes.' },
      { word: '인테리어', romaja: 'intelieo', es: 'decoración / diseño de interiores', emoji: '🛋️', example: '인테리어가 예뻐요.', exampleRomaja: 'Intelieo-ga yeppeyo.', exampleEs: 'La decoración es bonita.' },
      { word: '관리비', romaja: 'gwallbi', es: 'gastos de administración', emoji: '🧾', example: '관리비가 따로 있어요.', exampleRomaja: 'Gwallbi-ga ttaro isseoyo.', exampleEs: 'Los gastos de administración son aparte.' },
      { word: '리모델링', romaja: 'rimodelling', es: 'remodelación / renovación', emoji: '🔨', example: '집을 리모델링했어요.', exampleRomaja: 'Jibeul rimodellinghaesseoyo.', exampleEs: 'Renovamos la casa.' },
    ],
  },
  {
    id: 'gisul', name: 'Tecnología', nameKo: '기술과 디지털', icon: '💻',
    words: [
      { word: '다운로드하다', romaja: 'daunrodeuhada', es: 'descargar', emoji: '⬇️', example: '앱을 다운로드했어요.', exampleRomaja: 'Aebeul daunrodeuhaesseoyo.', exampleEs: 'Descargué la aplicación.' },
      { word: '업로드하다', romaja: 'eomrodeuhada', es: 'subir / cargar', emoji: '⬆️', example: '사진을 업로드했어요.', exampleRomaja: 'Sajineul eomrodeuhaesseoyo.', exampleEs: 'Subí las fotos.' },
      { word: '접속하다', romaja: 'jeopsokada', es: 'conectarse / acceder', emoji: '📶', example: '인터넷에 접속해요.', exampleRomaja: 'Inteone-te jeopsok-haeyo.', exampleEs: 'Me conecto a internet.' },
      { word: '기기', romaja: 'gigi', es: 'dispositivo', emoji: '📱', example: '새 기기를 샀어요.', exampleRomaja: 'Sae gigireul sasseoyo.', exampleEs: 'Compré un nuevo dispositivo.' },
      { word: '앱', romaja: 'aep', es: 'aplicación / app', emoji: '📲', example: '이 앱이 정말 유용해요.', exampleRomaja: 'I aep-i jeongmal yuyonghaeyo.', exampleEs: 'Esta aplicación es muy útil.' },
      { word: '업데이트하다', romaja: 'eomdeiteuhada', es: 'actualizar', emoji: '🔄', example: '앱을 업데이트해야 해요.', exampleRomaja: 'Aebeul eomdeiteuhaeeya haeyo.', exampleEs: 'Hay que actualizar la aplicación.' },
      { word: '비밀번호', romaja: 'bimilbeonho', es: 'contraseña', emoji: '🔑', example: '비밀번호를 잊어버렸어요.', exampleRomaja: 'Bimilbeonhoreul ijeobeoryeosseoyo.', exampleEs: 'Olvidé la contraseña.' },
      { word: '공유하다', romaja: 'gongyuhada', es: 'compartir', emoji: '🔗', example: '사진을 공유해요.', exampleRomaja: 'Sajineul gongyuhaeyo.', exampleEs: 'Comparto fotos.' },
      { word: '프로필', romaja: 'peurofil', es: 'perfil', emoji: '👤', example: '프로필을 수정했어요.', exampleRomaja: 'Peurofireul sujeonghaesseoyo.', exampleEs: 'Actualicé mi perfil.' },
      { word: '알림', romaja: 'allim', es: 'notificación', emoji: '🔔', example: '알림을 껐어요.', exampleRomaja: 'Allimeul kkeosseoyo.', exampleEs: 'Apagué las notificaciones.' },
    ],
  },
  {
    id: 'jayeon', name: 'Naturaleza y medio ambiente', nameKo: '자연과 환경', icon: '🌿',
    words: [
      { word: '풍경', romaja: 'punggyeong', es: 'paisaje / vista', emoji: '🏞️', example: '풍경이 아름다워요.', exampleRomaja: 'Punggyeong-i areumdawoyo.', exampleEs: 'El paisaje es hermoso.' },
      { word: '숲', romaja: 'sup', es: 'bosque', emoji: '🌲', example: '숲속을 걸었어요.', exampleRomaja: 'Supsogeul georeosseoyo.', exampleEs: 'Caminé por el bosque.' },
      { word: '폭포', romaja: 'pokpo', es: 'cascada', emoji: '💦', example: '폭포가 정말 멋있어요.', exampleRomaja: 'Pokpo-ga jeongmal meositsseoyo.', exampleEs: 'La cascada es realmente impresionante.' },
      { word: '오염', romaja: 'oyeom', es: 'contaminación', emoji: '🏭', example: '공기 오염이 심각해요.', exampleRomaja: 'Gonggi oyeom-i simgak-haeyo.', exampleEs: 'La contaminación del aire es grave.' },
      { word: '재활용하다', romaja: 'jaehwaryonghada', es: 'reciclar', emoji: '♻️', example: '쓰레기를 재활용해요.', exampleRomaja: 'Sseuregireul jaehwaryonghaeyo.', exampleEs: 'Reciclamos la basura.' },
      { word: '절약하다', romaja: 'jeoryakhada', es: 'ahorrar / economizar', emoji: '💡', example: '에너지를 절약해야 해요.', exampleRomaja: 'Eneojireul jeoryakhaeeya haeyo.', exampleEs: 'Hay que ahorrar energía.' },
      { word: '기후', romaja: 'gihu', es: 'clima', emoji: '🌍', example: '기후 변화가 심각해요.', exampleRomaja: 'Gihu byeonhwa-ga simgak-haeyo.', exampleEs: 'El cambio climático es grave.' },
      { word: '가뭄', romaja: 'gamum', es: 'sequía', emoji: '🌵', example: '올해 가뭄이 심해요.', exampleRomaja: 'Olhae gamum-i simhaeyo.', exampleEs: 'La sequía este año es intensa.' },
      { word: '생물 다양성', romaja: 'saengmul dayangseong', es: 'biodiversidad', emoji: '🦋', example: '생물 다양성을 보호해야 해요.', exampleRomaja: 'Saengmul dayangseong-eul bohohaeya haeyo.', exampleEs: 'Hay que proteger la biodiversidad.' },
      { word: '화산', romaja: 'hwasan', es: 'volcán', emoji: '🌋', example: '화산이 폭발했어요.', exampleRomaja: 'Hwasan-i pokbalhasseoyo.', exampleEs: 'El volcán hizo erupción.' },
    ],
  },
];

type PracticeMode = 'flashcard' | 'mcq' | 'fillblank';

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function Flashcard({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  if (idx >= words.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎴</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>¡Mazo completado!</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>{known}/{words.length} palabras marcadas como conocidas.</p>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setFlipped(false); setKnown(0); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir mazo</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = words[idx];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{idx + 1}/{words.length}</div>
      <div onClick={() => setFlipped(f => !f)} style={{ width: '100%', maxWidth: 400, minHeight: 200, cursor: 'pointer', borderRadius: 18, border: `2px solid ${flipped ? COLOR : 'var(--line-soft)'}`, background: flipped ? `${COLORMix(3.1)}` : 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', padding: '1.5rem', transition: 'all 0.3s', textAlign: 'center' }}>
        {!flipped ? (
          <>
            <div style={{ fontSize: '2.5rem' }}>{w.emoji}</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink)' }}>{w.word}</div>
            <div style={{ fontSize: '0.85rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.1rem 0.5rem', borderRadius: 5, background: `${COLORMix(8.2)}` }}>{w.romaja}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Toca para ver</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '1.1rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.word} <span style={{ fontSize: '0.85rem', color: COLOR }}>({w.romaja})</span></div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: COLOR }}>{w.es}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.5rem', lineHeight: 1.5, borderTop: '1px solid var(--line-soft)', paddingTop: '0.5rem', width: '100%', textAlign: 'left' }}>
              <span style={{ fontStyle: 'italic', color: 'var(--ink)' }}>{w.example}</span><br />
              <span style={{ fontSize: '0.75rem', color: COLOR }}>{w.exampleRomaja}</span><br />
              <span>{w.exampleEs}</span>
            </div>
          </>
        )}
      </div>
      {flipped && (
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-sm" onClick={() => { setKnown(k => k + 1); setIdx(i => i + 1); setFlipped(false); }} style={{ background: COLOR, borderColor: COLOR }}>✓ La sé</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setIdx(i => i + 1); setFlipped(false); }}>Repasar →</button>
        </div>
      )}
    </div>
  );
}

function MCQPractice({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{score >= shuffled.length * 0.8 ? '🏆' : '⭐'}</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} correctas</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const distractors = shuffle(shuffled.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.es);
  const allOpts = shuffle([w.es, ...distractors]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ink)' }}>{w.word}</div>
        <div style={{ fontSize: '0.85rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.12rem 0.5rem', borderRadius: 5, background: `${COLORMix(8.2)}`, display: 'inline-block', marginTop: '0.3rem' }}>{w.romaja}</div>
      </div>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)', textAlign: 'center' }}>¿Cuál es la traducción correcta?</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {allOpts.map((opt, i) => {
          const isCorrect = opt === w.es, isSel = answered !== null && allOpts[answered] === opt;
          let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', color = 'var(--ink)';
          if (answered !== null && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
          if (answered !== null && isSel && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
          return (
            <button key={i} disabled={answered !== null} onClick={() => { setAnswered(i); if (isCorrect) setScore(s => s + 1); }}
              style={{ padding: '0.65rem 1rem', borderRadius: 10, border, background: bg, color, fontSize: '0.95rem', cursor: answered !== null ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s' }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered !== null && (
        <div>
          <div style={{ padding: '0.65rem 0.9rem', borderRadius: 8, background: allOpts[answered] === w.es ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.65rem' }}>
            <span style={{ fontStyle: 'italic', color: 'var(--ink)' }}>{w.example}</span><br />
            <span style={{ fontSize: '0.75rem', color: COLOR }}>{w.exampleRomaja}</span><br />
            <span>{w.exampleEs}</span>
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>
            {idx < shuffled.length - 1 ? 'Siguiente →' : 'Ver resultado →'}
          </button>
        </div>
      )}
    </div>
  );
}

function FillBlank({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{score >= shuffled.length * 0.7 ? '🎉' : '📝'}</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} correctas</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const isCorrect = input.trim().toLowerCase() === w.word.toLowerCase() || input.trim().toLowerCase() === w.romaja.toLowerCase();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: COLOR }}>{w.es}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.25rem', fontStyle: 'italic' }}>{w.exampleEs}</div>
      </div>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>Escribe la palabra en coreano (Hangul o romanización):</p>
      <input value={input} onChange={e => setInput(e.target.value)} disabled={checked}
        placeholder="한국어 또는 romanización..."
        onKeyDown={e => { if (e.key === 'Enter' && input.trim() && !checked) { setChecked(true); if (isCorrect) setScore(s => s + 1); } }}
        style={{ padding: '0.7rem 1rem', borderRadius: 10, border: `1.5px solid ${checked ? (isCorrect ? '#059669' : '#dc2626') : 'var(--line-soft)'}`, background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', outline: 'none' }} />
      {!checked && input.trim() && <button className="btn btn-sm" onClick={() => { setChecked(true); if (isCorrect) setScore(s => s + 1); }} style={{ background: COLOR, borderColor: COLOR }}>확인 (Verificar)</button>}
      {checked && (
        <div>
          <div style={{ padding: '0.7rem 0.9rem', borderRadius: 9, background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.88rem', marginBottom: '0.65rem' }}>
            {isCorrect ? '✅ ¡정답!' : `✗ Respuesta: ${w.word} (${w.romaja})`}
            <div style={{ marginTop: '0.3rem', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.example}</div>
            <div style={{ fontSize: '0.75rem', color: COLOR }}>{w.exampleRomaja}</div>
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>
            {idx < shuffled.length - 1 ? '다음 →' : 'Ver resultado →'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function VocabularioCoreanoA2() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<PracticeMode | null>(null);

  const set = SETS.find(s => s.id === setId);

  if (set && mode) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 580 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <button onClick={() => setMode(null)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 0, fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>← {set.nameKo}</button>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>{mode === 'flashcard' ? '🎴 Flashcards' : mode === 'mcq' ? '🎯 Opción múltiple' : '✏️ Escribir'}</span>
        </div>
        {mode === 'flashcard' && <Flashcard words={set.words} onDone={() => setMode(null)} />}
        {mode === 'mcq' && <MCQPractice words={set.words} onDone={() => setMode(null)} />}
        {mode === 'fillblank' && <FillBlank words={set.words} onDone={() => setMode(null)} />}
      </div>
    </section>
  );

  if (set) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 600 }}>
        <button onClick={() => setSetId(null)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem' }}>← 어휘 A2</button>
        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />{set.icon} {set.nameKo}</p>
        <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.25rem', fontWeight: 700 }}>{set.name}</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>{set.words.length} palabras · Elige un modo de práctica</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            { id: 'flashcard' as PracticeMode, icon: '🎴', title: 'Flashcards', desc: 'Ve cada palabra en Hangul y romanización. Marca las que ya conoces.' },
            { id: 'mcq' as PracticeMode, icon: '🎯', title: 'Opción múltiple', desc: 'Elige la traducción correcta de 4 opciones.' },
            { id: 'fillblank' as PracticeMode, icon: '✏️', title: 'Escribir la palabra', desc: 'Escribe en Hangul o romanización a partir de la traducción.' },
          ].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.3rem', border: `1.5px solid ${COLORMix(13.3)}`, borderRadius: 14, background: `${COLORMix(1.6)}`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(33.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLORMix(7.8)}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(13.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>{m.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.1rem' }}>{m.title}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{m.desc}</p>
                </div>
                <span style={{ color: COLOR, fontWeight: 700 }}>→</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '1.25rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem' }}>어휘 ({set.words.length} 단어)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px,1fr))', gap: '0.55rem' }}>
            {set.words.map(w => (
              <div key={w.word} style={{ padding: '0.55rem 0.7rem', borderRadius: 9, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>{w.emoji} {w.word}</div>
                <div style={{ fontSize: '0.7rem', fontFamily: 'var(--mono)', color: COLOR, marginTop: '0.1rem' }}>{w.romaja}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{w.es}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/coreano/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📚 어휘</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />어휘 · Coreano A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabulario A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>8 temas esenciales — 80 palabras con Hangul y romanización. Flashcards, opción múltiple y práctica de escritura.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.85rem' }}>
          {SETS.map(s => (
            <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ padding: '1.25rem', border: `1.5px solid ${COLORMix(13.3)}`, borderRadius: 16, background: `${COLORMix(1.6)}`, height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(33.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLORMix(7.8)}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(13.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ fontSize: '1.75rem' }}>{s.icon}</div>
                <div style={{ fontWeight: 800, color: 'var(--ink)' }}>{s.nameKo}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{s.name} · {s.words.length} palabras</div>
                <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: COLOR, fontWeight: 700 }}>시작하기 →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
