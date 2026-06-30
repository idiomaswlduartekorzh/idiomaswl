'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#e11d48';

interface Word { id: number; ko: string; romaja: string; es: string; emoji: string; example: string; exampleRomaja: string; exampleEs: string; }
interface VocabSet { id: string; name: string; nameKo: string; icon: string; words: Word[]; }

const SETS: VocabSet[] = [
  {
    id: 'trabajo', name: 'Trabajo y carrera', nameKo: '직장과 경력 (Jigjang-gwa gyeongnyeok)', icon: '💼',
    words: [
      { id: 1, ko: '협상하다', romaja: 'hyeopssanghada', es: 'negociar', emoji: '🤝', example: '계약을 협상했어요.', exampleRomaja: 'Gyeyageul hyeopssanghaesseoyo.', exampleEs: 'Negocié el contrato.' },
      { id: 2, ko: '기한', romaja: 'gihan', es: 'plazo / fecha límite', emoji: '⏰', example: '기한이 이번 주예요.', exampleRomaja: 'Gihani ibeon juyeyo.', exampleEs: 'El plazo es esta semana.' },
      { id: 3, ko: '동료', romaja: 'dongnyo', es: 'colega / compañero/a', emoji: '🤝', example: '동료들과 잘 지내요.', exampleRomaja: 'Dongnyodeulgwa jal jinaeyo.', exampleEs: 'Me llevo bien con los colegas.' },
      { id: 4, ko: '승진', romaja: 'seungjin', es: 'ascenso / promoción', emoji: '⬆️', example: '승진을 축하해요.', exampleRomaja: 'Seungjineul chukahaeyo.', exampleEs: 'Felicitaciones por el ascenso.' },
      { id: 5, ko: '사직하다', romaja: 'sajikada', es: 'renunciar / dimitir', emoji: '🚪', example: '회사를 사직했어요.', exampleRomaja: 'Hoesareul sajikhasseoyo.', exampleEs: 'Renuncié a la empresa.' },
      { id: 6, ko: '계약서', romaja: 'gyeyakseo', es: 'contrato', emoji: '📄', example: '계약서에 서명했어요.', exampleRomaja: 'Gyeyakseoe seomyeonghaesseoyo.', exampleEs: 'Firmé el contrato.' },
      { id: 7, ko: '채용하다', romaja: 'chaeyonghada', es: 'contratar / reclutar', emoji: '📝', example: '새 직원을 채용했어요.', exampleRomaja: 'Sae jigwoneul chaeyonghaesseoyo.', exampleEs: 'Contrataron a un nuevo empleado.' },
      { id: 8, ko: '급여', romaja: 'geubyeo', es: 'salario / paga', emoji: '💰', example: '급여가 올랐어요.', exampleRomaja: 'Geubyeoga ollasseoyo.', exampleEs: 'El salario aumentó.' },
      { id: 9, ko: '성과', romaja: 'seonggwa', es: 'resultado / desempeño', emoji: '📊', example: '이번 달 성과가 좋아요.', exampleRomaja: 'Ibeon dal seonggwaga joayo.', exampleEs: 'Los resultados de este mes son buenos.' },
      { id: 10, ko: '부서', romaja: 'buseo', es: 'departamento / división', emoji: '🏢', example: '어느 부서에서 일해요?', exampleRomaja: 'Eoneu buseoe-seo ilhaeyo?', exampleEs: '¿En qué departamento trabaja?' },
    ],
  },
  {
    id: 'tecnologia', name: 'Tecnología avanzada', nameKo: '기술 (Gisul)', icon: '💻',
    words: [
      { id: 1, ko: '소프트웨어', romaja: 'sopeuteuweo', es: 'software', emoji: '💾', example: '소프트웨어를 업데이트해야 해요.', exampleRomaja: 'Sopeuteuwereul eopdeiteuhaeeya haeyo.', exampleEs: 'Hay que actualizar el software.' },
      { id: 2, ko: '데이터베이스', romaja: 'deiteobeyiseu', es: 'base de datos', emoji: '🗄️', example: '데이터베이스를 백업했어요.', exampleRomaja: 'Deiteobeyiseureul baekopeasseoyo.', exampleEs: 'Hice una copia de seguridad de la base de datos.' },
      { id: 3, ko: '다운로드하다', romaja: 'daunloduhada', es: 'descargar', emoji: '⬇️', example: '파일을 다운로드했어요.', exampleRomaja: 'Paireul daunloduhaesseoyo.', exampleEs: 'Descargué el archivo.' },
      { id: 4, ko: '암호화하다', romaja: 'amhohwahada', es: 'cifrar / encriptar', emoji: '🔒', example: '데이터를 암호화해야 해요.', exampleRomaja: 'Deiteoreul amhohwahaeeya haeyo.', exampleEs: 'Hay que cifrar los datos.' },
      { id: 5, ko: '인터페이스', romaja: 'inteopeiseu', es: 'interfaz', emoji: '🖥️', example: '인터페이스가 직관적이에요.', exampleRomaja: 'Inteopeiseuga jikgwanjeog-ieyo.', exampleEs: 'La interfaz es intuitiva.' },
      { id: 6, ko: '악성코드', romaja: 'akseongkodeu', es: 'malware / código malicioso', emoji: '🦠', example: '악성코드가 발견됐어요.', exampleRomaja: 'Akseongkodeuga balgyeondwaesseoyo.', exampleEs: 'Se detectó malware.' },
      { id: 7, ko: '알고리즘', romaja: 'algorijeum', es: 'algoritmo', emoji: '🔢', example: '알고리즘이 복잡해요.', exampleRomaja: 'Algorijeum-i bokjapaeyo.', exampleEs: 'El algoritmo es complejo.' },
      { id: 8, ko: '대역폭', romaja: 'daeyeokpok', es: 'ancho de banda', emoji: '📶', example: '대역폭이 부족해요.', exampleRomaja: 'Daeyeokpogi bujokaeyo.', exampleEs: 'El ancho de banda es insuficiente.' },
      { id: 9, ko: '무선', romaja: 'museon', es: 'inalámbrico / wifi', emoji: '📡', example: '무선 연결이 느려요.', exampleRomaja: 'Museon yeongyeoli neuryeoyo.', exampleEs: 'La conexión inalámbrica es lenta.' },
      { id: 10, ko: '네트워크', romaja: 'neteuwokeu', es: 'red / network', emoji: '🌐', example: '네트워크가 다운됐어요.', exampleRomaja: 'Neteuwokeu-ga daundwaesseoyo.', exampleEs: 'La red está caída.' },
    ],
  },
  {
    id: 'salud', name: 'Salud y medicina', nameKo: '건강 (Geongang)', icon: '🏥',
    words: [
      { id: 1, ko: '진단', romaja: 'jindan', es: 'diagnóstico', emoji: '🔬', example: '의사가 진단을 내렸어요.', exampleRomaja: 'Uisaga jindaneul naeryeosseoyo.', exampleEs: 'El médico emitió el diagnóstico.' },
      { id: 2, ko: '증상', romaja: 'jeungsang', es: 'síntoma', emoji: '🤒', example: '증상이 심각해요.', exampleRomaja: 'Jeungsangi simgakaeyo.', exampleEs: 'Los síntomas son graves.' },
      { id: 3, ko: '처방전', romaja: 'cheobangjeon', es: 'receta médica', emoji: '📋', example: '처방전이 필요해요.', exampleRomaja: 'Cheobangjeoni piryohaeyo.', exampleEs: 'Se necesita receta médica.' },
      { id: 4, ko: '수술', romaja: 'susul', es: 'cirugía / operación', emoji: '🏥', example: '수술을 받아야 해요.', exampleRomaja: 'Susureul badaya haeyo.', exampleEs: 'Hay que operarse.' },
      { id: 5, ko: '만성적인', romaja: 'manseongjeogin', es: 'crónico/a', emoji: '📆', example: '만성적인 통증이 있어요.', exampleRomaja: 'ManseongjeogIn tongjeung-i isseoyo.', exampleEs: 'Tengo dolor crónico.' },
      { id: 6, ko: '알레르기의', romaja: 'allereugiui', es: 'alérgico/a (adjetivo)', emoji: '🤧', example: '알레르기의 반응이 나타났어요.', exampleRomaja: 'Allereugiui baneung-i natanasseoyo.', exampleEs: 'Apareció una reacción alérgica.' },
      { id: 7, ko: '예방접종', romaja: 'yebangjeopsong', es: 'vacunación', emoji: '💉', example: '예방접종을 맞았어요.', exampleRomaja: 'Yebangjeopsong-eul majasseoyo.', exampleEs: 'Me vacuné.' },
      { id: 8, ko: '치료', romaja: 'chiryo', es: 'tratamiento / terapia', emoji: '💊', example: '치료를 시작해야 해요.', exampleRomaja: 'Chiryoreul sijakaeya haeyo.', exampleEs: 'Hay que comenzar el tratamiento.' },
      { id: 9, ko: '면역력', romaja: 'myeonyeongnyeok', es: 'inmunidad / sistema inmune', emoji: '🛡️', example: '면역력을 높여야 해요.', exampleRomaja: 'Myeonyeongnyeogeul nopyeoya haeyo.', exampleEs: 'Hay que fortalecer la inmunidad.' },
      { id: 10, ko: '회복', romaja: 'hoebok', es: 'recuperación', emoji: '💪', example: '빠른 회복을 바랍니다.', exampleRomaja: 'Ppareun hoebogeul baramnida.', exampleEs: 'Le deseo una pronta recuperación.' },
    ],
  },
  {
    id: 'medioambiente', name: 'Medio ambiente', nameKo: '환경 (Hwangyeong)', icon: '🌿',
    words: [
      { id: 1, ko: '오염', romaja: 'oyeom', es: 'contaminación / polución', emoji: '🏭', example: '공기 오염이 심해요.', exampleRomaja: 'Gonggi oyeom-i simhaeyo.', exampleEs: 'La contaminación del aire es grave.' },
      { id: 2, ko: '재생 가능한', romaja: 'jaeseong ganeunghan', es: 'renovable', emoji: '♻️', example: '재생 가능한 에너지가 필요해요.', exampleRomaja: 'Jaeseong ganeunghan eneoji-ga piryohaeyo.', exampleEs: 'Se necesita energía renovable.' },
      { id: 3, ko: '삼림 벌채', romaja: 'sallim beolchae', es: 'deforestación', emoji: '🪓', example: '삼림 벌채가 계속되고 있어요.', exampleRomaja: 'Sallim beolchae-ga gyesoktoegoisseoyo.', exampleEs: 'La deforestación continúa.' },
      { id: 4, ko: '배출', romaja: 'baechwul', es: 'emisión / descarga', emoji: '💨', example: '탄소 배출을 줄여야 해요.', exampleRomaja: 'Tanso baechwureul juryeoya haeyo.', exampleEs: 'Hay que reducir las emisiones de carbono.' },
      { id: 5, ko: '생물 다양성', romaja: 'saengmul dayangseong', es: 'biodiversidad', emoji: '🦋', example: '생물 다양성을 보호해야 해요.', exampleRomaja: 'Saengmul dayangseong-eul bohohaeya haeyo.', exampleEs: 'Hay que proteger la biodiversidad.' },
      { id: 6, ko: '지속 가능한', romaja: 'jisok ganeunghan', es: 'sostenible', emoji: '🌱', example: '지속 가능한 농업이 중요해요.', exampleRomaja: 'Jisok ganeunghan nong-eob-i jungyohaeyo.', exampleEs: 'La agricultura sostenible es importante.' },
      { id: 7, ko: '서식지', romaja: 'seosikji', es: 'hábitat', emoji: '🏡', example: '동물의 서식지가 줄었어요.', exampleRomaja: 'Dongmur-ui seosikji-ga jureosseoyo.', exampleEs: 'El hábitat de los animales se redujo.' },
      { id: 8, ko: '가뭄', romaja: 'gamum', es: 'sequía', emoji: '🌵', example: '올해 가뭄이 심해요.', exampleRomaja: 'Olhae gamum-i simhaeyo.', exampleEs: 'La sequía este año es intensa.' },
      { id: 9, ko: '자연 보호', romaja: 'jayeon boho', es: 'protección de la naturaleza', emoji: '🌍', example: '자연 보호가 중요해요.', exampleRomaja: 'Jayeon boho-ga jungyohaeyo.', exampleEs: 'La protección de la naturaleza es importante.' },
      { id: 10, ko: '재활용하다', romaja: 'jaehwallyonghada', es: 'reciclar', emoji: '♻️', example: '쓰레기를 재활용해야 해요.', exampleRomaja: 'Sseuregireul jaehwallyonghaeeya haeyo.', exampleEs: 'Hay que reciclar la basura.' },
    ],
  },
  {
    id: 'viajes', name: 'Viajes y cultura', nameKo: '여행과 문화 (Yeohaeng-gwa munhwa)', icon: '✈️',
    words: [
      { id: 1, ko: '여행 일정', romaja: 'yeohaeng iljeong', es: 'itinerario de viaje', emoji: '📅', example: '여행 일정을 짜야 해요.', exampleRomaja: 'Yeohaeng iljeong-eul jjaya haeyo.', exampleEs: 'Hay que preparar el itinerario.' },
      { id: 2, ko: '숙박', romaja: 'sukbak', es: 'alojamiento', emoji: '🏨', example: '숙박을 예약했어요.', exampleRomaja: 'Sukbag-eul yeyakhaesseoyo.', exampleEs: 'Reservé el alojamiento.' },
      { id: 3, ko: '화폐', romaja: 'hwapye', es: 'moneda / divisa', emoji: '💱', example: '현지 화폐가 필요해요.', exampleRomaja: 'Hyeonji hwapye-ga piryohaeyo.', exampleEs: 'Se necesita moneda local.' },
      { id: 4, ko: '문화유산', romaja: 'munhwayusan', es: 'patrimonio cultural', emoji: '🏛️', example: '문화유산을 보호해야 해요.', exampleRomaja: 'Munhwayusan-eul bohohaeya haeyo.', exampleEs: 'Hay que proteger el patrimonio cultural.' },
      { id: 5, ko: '관습', romaja: 'gwanseup', es: 'costumbre / tradición', emoji: '🎎', example: '현지 관습을 존중해요.', exampleRomaja: 'Hyeonji gwanseub-eul jonjunghaeyo.', exampleEs: 'Respeto las costumbres locales.' },
      { id: 6, ko: '국경', romaja: 'gukgyeong', es: 'frontera nacional', emoji: '🛂', example: '국경을 넘었어요.', exampleRomaja: 'Gukgyeong-eul neomeosseoyo.', exampleEs: 'Cruzamos la frontera.' },
      { id: 7, ko: '기념품', romaja: 'ginyeompum', es: 'recuerdo / souvenir', emoji: '🎁', example: '기념품을 샀어요.', exampleRomaja: 'Ginyeompum-eul sasseoyo.', exampleEs: 'Compré recuerdos.' },
      { id: 8, ko: '탐험', romaja: 'tamheom', es: 'exploración / aventura', emoji: '🗺️', example: '새로운 곳을 탐험했어요.', exampleRomaja: 'Saeroun gos-eul tamheomhaesseoyo.', exampleEs: 'Exploramos un lugar nuevo.' },
      { id: 9, ko: '관광객', romaja: 'gwangwanggaek', es: 'turista', emoji: '📸', example: '관광객이 많아요.', exampleRomaja: 'Gwangwanggaeg-i manhayo.', exampleEs: 'Hay muchos turistas.' },
      { id: 10, ko: '명소', romaja: 'myeongso', es: 'lugar famoso / atracción', emoji: '🗺️', example: '유명한 명소를 방문했어요.', exampleRomaja: 'Yumyeonghan myeongso-reul bangmunhaesseoyo.', exampleEs: 'Visité un lugar famoso.' },
    ],
  },
  {
    id: 'sociedad', name: 'Problemas sociales', nameKo: '사회 문제 (Sahoe munje)', icon: '🏙️',
    words: [
      { id: 1, ko: '빈곤', romaja: 'bingon', es: 'pobreza', emoji: '📉', example: '빈곤을 줄여야 해요.', exampleRomaja: 'Bingon-eul juryeoya haeyo.', exampleEs: 'Hay que reducir la pobreza.' },
      { id: 2, ko: '불평등', romaja: 'bulpyeongdeung', es: 'desigualdad', emoji: '⚖️', example: '불평등이 심각한 문제예요.', exampleRomaja: 'Bulpyeongdeung-i simgakhan munjeyeyo.', exampleEs: 'La desigualdad es un problema grave.' },
      { id: 3, ko: '차별', romaja: 'chabyeol', es: 'discriminación', emoji: '🚫', example: '차별 없는 사회를 만들어야 해요.', exampleRomaja: 'Chabyeol eomneun sahoereul mandeureoya haeyo.', exampleEs: 'Hay que crear una sociedad sin discriminación.' },
      { id: 4, ko: '난민', romaja: 'nanmin', es: 'refugiado/a', emoji: '🌍', example: '난민을 도와야 해요.', exampleRomaja: 'Nanmin-eul dowaya haeyo.', exampleEs: 'Hay que ayudar a los refugiados.' },
      { id: 5, ko: '자선', romaja: 'jaseon', es: 'caridad / beneficencia', emoji: '❤️', example: '자선 단체에 기부했어요.', exampleRomaja: 'Jaseon danche-e gibuhasseoyo.', exampleEs: 'Doné a una organización benéfica.' },
      { id: 6, ko: '자원봉사자', romaja: 'jawonbongsaja', es: 'voluntario/a', emoji: '🙋', example: '자원봉사자가 많이 필요해요.', exampleRomaja: 'Jawonbongsaja-ga mani piryohaeyo.', exampleEs: 'Se necesitan muchos voluntarios.' },
      { id: 7, ko: '캠페인', romaja: 'kaempein', es: 'campaña', emoji: '📢', example: '환경 캠페인에 참여했어요.', exampleRomaja: 'Hwangyeong kaempein-e chamyeohasseoyo.', exampleEs: 'Participé en una campaña ambiental.' },
      { id: 8, ko: '인식', romaja: 'insik', es: 'conciencia / percepción', emoji: '💡', example: '사회 문제에 대한 인식이 필요해요.', exampleRomaja: 'Sahoe munje-e daehan insig-i piryohaeyo.', exampleEs: 'Se necesita conciencia sobre los problemas sociales.' },
      { id: 9, ko: '시위', romaja: 'siwi', es: 'manifestación / protesta', emoji: '✊', example: '평화로운 시위가 있었어요.', exampleRomaja: 'Pyeonghwaroun siwi-ga isseosseoyo.', exampleEs: 'Hubo una manifestación pacífica.' },
      { id: 10, ko: '공동체', romaja: 'gongdongche', es: 'comunidad', emoji: '👥', example: '공동체 의식이 중요해요.', exampleRomaja: 'Gongdongche uisig-i jungyohaeyo.', exampleEs: 'La conciencia de comunidad es importante.' },
    ],
  },
  {
    id: 'educacion', name: 'Educación', nameKo: '교육 (Gyoyuk)', icon: '🎓',
    words: [
      { id: 1, ko: '교육과정', romaja: 'gyoyukgwajeong', es: 'currículo / plan de estudios', emoji: '📚', example: '교육과정이 바뀌었어요.', exampleRomaja: 'Gyoyukgwajeong-i bakkwieosseoyo.', exampleEs: 'El plan de estudios cambió.' },
      { id: 2, ko: '장학금', romaja: 'janghakgeum', es: 'beca', emoji: '🎓', example: '장학금을 받았어요.', exampleRomaja: 'Janghakgeum-eul badasseoyo.', exampleEs: 'Recibí una beca.' },
      { id: 3, ko: '수업료', romaja: 'sueomyo', es: 'matrícula / colegiatura', emoji: '💸', example: '수업료가 비싸요.', exampleRomaja: 'Sueomyo-ga bissayo.', exampleEs: 'La matrícula es cara.' },
      { id: 4, ko: '논문', romaja: 'nonmun', es: 'tesis / trabajo académico', emoji: '📝', example: '논문을 쓰고 있어요.', exampleRomaja: 'Nonmun-eul sseugeo isseoyo.', exampleEs: 'Estoy escribiendo la tesis.' },
      { id: 5, ko: '연구', romaja: 'yeongu', es: 'investigación', emoji: '🔬', example: '연구 결과가 중요해요.', exampleRomaja: 'Yeongu gyeolgwa-ga jungyohaeyo.', exampleEs: 'Los resultados de investigación son importantes.' },
      { id: 6, ko: '졸업생', romaja: 'joreopssaeng', es: 'graduado/a / egresado/a', emoji: '🎓', example: '졸업생 모임이 있어요.', exampleRomaja: 'Joreopssaeng moim-i isseoyo.', exampleEs: 'Hay una reunión de egresados.' },
      { id: 7, ko: '학문적인', romaja: 'hangmunjeog-in', es: 'académico/a', emoji: '📖', example: '학문적인 글을 써야 해요.', exampleRomaja: 'Hangmunjeog-in geureul sseoya haeyo.', exampleEs: 'Hay que escribir textos académicos.' },
      { id: 8, ko: '학과', romaja: 'hakgwa', es: 'departamento / carrera universitaria', emoji: '🏫', example: '어느 학과에 다녀요?', exampleRomaja: 'Eoneu hakgwa-e danyeoyo?', exampleEs: '¿En qué carrera estudia?' },
      { id: 9, ko: '강의', romaja: 'gangui', es: 'conferencia / clase magistral', emoji: '🎤', example: '강의가 재미있어요.', exampleRomaja: 'Gangui-ga jaemiisseoyo.', exampleEs: 'La conferencia es interesante.' },
      { id: 10, ko: '학기', romaja: 'hakgi', es: 'semestre / período académico', emoji: '📅', example: '이번 학기가 어려워요.', exampleRomaja: 'Ibeon hakgi-ga eoryeowoyo.', exampleEs: 'Este semestre es difícil.' },
    ],
  },
  {
    id: 'emociones', name: 'Emociones avanzadas', nameKo: '감정 (Gamjeong)', icon: '💭',
    words: [
      { id: 1, ko: '불안한', romaja: 'buranhan', es: 'ansioso/a / inquieto/a', emoji: '😰', example: '시험 때문에 불안해요.', exampleRomaja: 'Siheom ttaemune buranaeyo.', exampleEs: 'Estoy ansioso/a por el examen.' },
      { id: 2, ko: '질투하는', romaja: 'jiltuhaneun', es: 'celoso/a / envidioso/a', emoji: '😒', example: '질투하는 감정을 느껴요.', exampleRomaja: 'Jiltuhaneun gamjeong-eul neukkyeoyo.', exampleEs: 'Siento celos.' },
      { id: 3, ko: '감사하는', romaja: 'gamsahaneun', es: 'agradecido/a', emoji: '🙏', example: '도움에 감사해요.', exampleRomaja: 'Doum-e gamsahaeyo.', exampleEs: 'Le agradezco la ayuda.' },
      { id: 4, ko: '좌절한', romaja: 'jwajolhan', es: 'frustrado/a', emoji: '😤', example: '실패해서 좌절했어요.', exampleRomaja: 'Silpaehaeseo jwajolhasseoyo.', exampleEs: 'Fracasé y me frustré.' },
      { id: 5, ko: '자신감 있는', romaja: 'jasingam inneun', es: 'seguro/a de sí mismo/a / confiado/a', emoji: '😎', example: '자신감 있는 태도가 중요해요.', exampleRomaja: 'Jasingam inneun taedo-ga jungyohaeyo.', exampleEs: 'La actitud segura es importante.' },
      { id: 6, ko: '공감하는', romaja: 'gonggamhaneun', es: 'empático/a', emoji: '💞', example: '공감하는 능력이 필요해요.', exampleRomaja: 'Gonggamhaneun neungnyeog-i piryohaeyo.', exampleEs: 'Se necesita capacidad de empatía.' },
      { id: 7, ko: '충실한', romaja: 'chungsilhan', es: 'leal / fiel / dedicado/a', emoji: '💪', example: '충실한 친구를 사귀었어요.', exampleRomaja: 'Chungsilhan chingu-reul sagwieosseoyo.', exampleEs: 'Hice amigos leales.' },
      { id: 8, ko: '억울한', romaja: 'eogulan', es: 'injustamente tratado/a / resentido/a', emoji: '😢', example: '억울한 상황이 생겼어요.', exampleRomaja: 'Eogulan sanghwang-i saenggyeosseoyo.', exampleEs: 'Surgió una situación injusta.' },
      { id: 9, ko: '다정한', romaja: 'dajeonghan', es: 'afectuoso/a / cariñoso/a', emoji: '❤️', example: '다정한 말이 위로가 돼요.', exampleRomaja: 'Dajeonghan mar-i wiroga dwaeyo.', exampleEs: 'Las palabras cariñosas consuelan.' },
      { id: 10, ko: '낙관적인', romaja: 'nakgwanjeog-in', es: 'optimista', emoji: '🌟', example: '낙관적인 시각이 도움이 돼요.', exampleRomaja: 'Nakgwanjeog-in sigag-i doum-i dwaeyo.', exampleEs: 'La perspectiva optimista ayuda.' },
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
      <div onClick={() => setFlipped(f => !f)} style={{ width: '100%', maxWidth: 400, minHeight: 200, cursor: 'pointer', borderRadius: 18, border: `2px solid ${flipped ? COLOR : 'var(--line-soft)'}`, background: flipped ? `${COLOR}08` : 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', padding: '1.5rem', transition: 'all 0.3s', textAlign: 'center' }}>
        {!flipped ? (
          <>
            <div style={{ fontSize: '2.5rem' }}>{w.emoji}</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink)' }}>{w.ko}</div>
            <div style={{ fontSize: '0.85rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.1rem 0.5rem', borderRadius: 5, background: `${COLOR}15` }}>{w.romaja}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Toca para ver</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '1.1rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.ko} <span style={{ fontSize: '0.85rem', color: COLOR }}>({w.romaja})</span></div>
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
  const distractors = shuffle(shuffled.filter(x => x.ko !== w.ko)).slice(0, 3).map(x => x.es);
  const allOpts = shuffle([w.es, ...distractors]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ink)' }}>{w.ko}</div>
        <div style={{ fontSize: '0.85rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.12rem 0.5rem', borderRadius: 5, background: `${COLOR}15`, display: 'inline-block', marginTop: '0.3rem' }}>{w.romaja}</div>
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
  const isCorrect = input.trim().toLowerCase() === w.ko.toLowerCase() || input.trim().toLowerCase() === w.romaja.toLowerCase();

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
            {isCorrect ? '✅ ¡정답!' : `✗ Respuesta: ${w.ko} (${w.romaja})`}
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

export default function VocabularioCoreanoB1() {
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
        <button onClick={() => setSetId(null)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem' }}>← 어휘 B1</button>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.3rem', border: `1.5px solid ${COLOR}22`, borderRadius: 14, background: `${COLOR}04`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLOR}14`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
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
              <div key={w.ko} style={{ padding: '0.55rem 0.7rem', borderRadius: 9, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>{w.emoji} {w.ko}</div>
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
          <Link href="/practica/coreano/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📚 어휘</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />어휘 · Coreano B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabulario B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>8 temas B1 — 80 palabras con Hangul y romanización. Flashcards, opción múltiple y práctica de escritura.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.85rem' }}>
          {SETS.map(s => (
            <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ padding: '1.25rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}04`, height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLOR}14`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
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
