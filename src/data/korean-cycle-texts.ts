export type Nivel = 'A1' | 'A2' | 'B1';
export type QuizLevel = 'principiante' | 'intermedio' | 'avanzado';

export interface VocabItem {
  word: string;
  translation: string;
}

export interface QuestionMC {
  type: 'multiple';
  question: string;
  options: string[];
  correct: string;
}
export interface QuestionTF {
  type: 'truefalse';
  question: string;
  correct: boolean;
}
export interface QuestionOrder {
  type: 'order';
  question: string;
  words: string[];
  correct: string[];
}
export interface QuestionOpen {
  type: 'open';
  question: string;
}
export type Question = QuestionMC | QuestionTF | QuestionOrder | QuestionOpen;

export interface CycleText {
  id: string;
  nivel: Nivel;
  titulo: string;
  tituloKo: string;
  korean: string;
  vocab: VocabItem[];
  questions: {
    principiante: Question[];
    intermedio: Question[];
    avanzado: Question[];
  };
}

export const CYCLE_TEXTS: CycleText[] = [
  // ──────────────────────────────── A1 ────────────────────────────────
  {
    id: 'a1-1',
    nivel: 'A1',
    titulo: 'Presentarse',
    tituloKo: '자기소개',
    korean: '안녕하세요! 저는 소피아예요. 스물세 살이에요. 브라질 사람이에요. 저는 학생이에요. 한국어를 공부해요. 음악 듣는 것을 좋아해요. 그리고 커피도 좋아해요. 만나서 반가워요!',
    vocab: [
      { word: '안녕하세요', translation: 'Hola / Buenos días' },
      { word: '학생', translation: 'estudiante' },
      { word: '공부해요', translation: 'estudio / estudia' },
      { word: '좋아해요', translation: 'me gusta / le gusta' },
      { word: '반가워요', translation: 'mucho gusto / encantado/a' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "학생"?', options: ['estudiante', 'médico', 'profesora', 'amigo'], correct: 'estudiante' },
        { type: 'multiple', question: '¿Cuál de estas palabras aparece en el texto?', options: ['좋아해요', '먹어요', '마셔요', '자요'], correct: '좋아해요' },
        { type: 'truefalse', question: 'La persona habla sobre su trabajo de oficina.', correct: false },
        { type: 'order', question: 'Ordena las palabras para formar una oración del texto:', words: ['한국어를', '저는', '공부해요'], correct: ['저는', '한국어를', '공부해요'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿De dónde es la persona que habla?', options: ['De Brasil', 'De Japón', 'De México', 'De España'], correct: 'De Brasil' },
        { type: 'multiple', question: '¿Qué le gusta a Sofia?', options: ['La música y el café', 'El deporte y la música', 'El café y el deporte', 'Los viajes y la música'], correct: 'La música y el café' },
        { type: 'multiple', question: '¿Qué está estudiando Sofia?', options: ['Coreano', 'Inglés', 'Japonés', 'Español'], correct: 'Coreano' },
        { type: 'multiple', question: '¿Cuántos años tiene la persona?', options: ['23', '22', '25', '20'], correct: '23' },
      ],
      avanzado: [
        { type: 'open', question: 'Usando las palabras del vocabulario del texto, escríbete una breve presentación propia en coreano (2-3 oraciones).' },
        { type: 'open', question: '¿Qué información da sobre sí misma la persona en el texto? Responde en español con todos los detalles.' },
      ],
    },
  },
  {
    id: 'a1-2',
    nivel: 'A1',
    titulo: 'Rutina diaria',
    tituloKo: '일상 생활',
    korean: '저는 매일 아침 일곱 시에 일어나요. 세수하고 아침밥을 먹어요. 보통 밥이랑 김치를 먹어요. 그다음 지하철을 타고 회사에 가요. 오후 여섯 시에 집에 와요. 저녁밥을 먹고 텔레비전을 봐요.',
    vocab: [
      { word: '매일', translation: 'todos los días' },
      { word: '아침', translation: 'mañana / desayuno' },
      { word: '일어나요', translation: 'me levanto' },
      { word: '지하철', translation: 'metro / subterráneo' },
      { word: '회사', translation: 'empresa / trabajo' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "매일"?', options: ['todos los días', 'a veces', 'los fines de semana', 'nunca'], correct: 'todos los días' },
        { type: 'multiple', question: '¿Cuál de estas palabras aparece en el texto?', options: ['지하철', '버스', '택시', '비행기'], correct: '지하철' },
        { type: 'truefalse', question: 'La persona se levanta a las ocho de la mañana.', correct: false },
        { type: 'order', question: 'Ordena las palabras correctamente:', words: ['타고', '지하철을', '가요'], correct: ['지하철을', '타고', '가요'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿A qué hora se levanta la persona?', options: ['A las 7', 'A las 6', 'A las 8', 'A las 7:30'], correct: 'A las 7' },
        { type: 'multiple', question: '¿Qué come normalmente en el desayuno?', options: ['Arroz y kimchi', 'Pan y huevos', 'Cereal y leche', 'Nada, no desayuna'], correct: 'Arroz y kimchi' },
        { type: 'multiple', question: '¿Cómo va al trabajo?', options: ['En metro', 'En autobús', 'En coche', 'Caminando'], correct: 'En metro' },
        { type: 'multiple', question: '¿Qué hace por la noche?', options: ['Come y ve televisión', 'Sale con amigos', 'Estudia coreano', 'Lee libros'], correct: 'Come y ve televisión' },
      ],
      avanzado: [
        { type: 'open', question: 'Describe tu propia rutina diaria en coreano usando el vocabulario del texto.' },
        { type: 'open', question: 'Compara la rutina del texto con la tuya. ¿En qué se parecen y en qué se diferencian?' },
      ],
    },
  },
  {
    id: 'a1-3',
    nivel: 'A1',
    titulo: 'En el restaurante',
    tituloKo: '식당에서',
    korean: '어서 오세요! 뭐 드릴까요? 삼겹살 이 인분 주세요. 그리고 된장찌개도 하나 주세요. 물도 좀 주세요. 얼마예요? 이만 원이에요. 여기 있어요. 감사합니다!',
    vocab: [
      { word: '주세요', translation: 'por favor deme / quiero' },
      { word: '얼마예요', translation: '¿cuánto es? / ¿cuánto cuesta?' },
      { word: '인분', translation: 'porción / ración (para una persona)' },
      { word: '물', translation: 'agua' },
      { word: '감사합니다', translation: 'gracias (formal)' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "물"?', options: ['agua', 'leche', 'jugo', 'café'], correct: 'agua' },
        { type: 'multiple', question: '¿Cuál de estas palabras aparece en el texto?', options: ['주세요', '먹어요', '요리해요', '마셔요'], correct: '주세요' },
        { type: 'truefalse', question: 'La cuenta total es treinta mil won.', correct: false },
        { type: 'order', question: 'Ordena la pregunta correctamente:', words: ['얼마', '?', '예요'], correct: ['얼마', '예요', '?'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿Qué plato pide la persona?', options: ['Samgyeopsal (panza de cerdo)', 'Bibimbap', 'Tteokbokki', 'Ramyeon'], correct: 'Samgyeopsal (panza de cerdo)' },
        { type: 'multiple', question: '¿Para cuántas personas pide el samgyeopsal?', options: ['Para 2 personas', 'Para 1 persona', 'Para 3 personas', 'Para 4 personas'], correct: 'Para 2 personas' },
        { type: 'multiple', question: '¿Cuánto cuesta la comida?', options: ['20.000 won', '12.000 won', '30.000 won', '15.000 won'], correct: '20.000 won' },
        { type: 'multiple', question: '¿Qué sopa adicional pide la persona?', options: ['Doenjang jjigae (sopa de pasta de soya)', 'Kimchi jjigae', 'Sundubu jjigae', 'Galbitang'], correct: 'Doenjang jjigae (sopa de pasta de soya)' },
      ],
      avanzado: [
        { type: 'open', question: 'Imagina que estás en un restaurante coreano. Escribe un pequeño diálogo para pedir tu comida favorita usando las expresiones del texto.' },
        { type: 'open', question: '¿Qué expresiones del texto te parecen más útiles para pedir comida en Corea? Explica por qué.' },
      ],
    },
  },

  // ──────────────────────────────── A2 ────────────────────────────────
  {
    id: 'a2-1',
    nivel: 'A2',
    titulo: 'Planes para el fin de semana',
    tituloKo: '주말 계획',
    korean: '안녕, 지민아! 이번 주말에 뭐 할 거야? 나는 토요일에 친구들이랑 한강에 갈 거야. 같이 갈래? 날씨가 좋을 것 같아. 거기서 치킨이랑 맥주를 먹을 거야. 일요일에는 집에서 영화를 볼 거야. 너는 어때? 같이 가면 정말 재밌을 것 같아!',
    vocab: [
      { word: '이번 주말', translation: 'este fin de semana' },
      { word: '할 거야', translation: 'voy a hacer / va a hacer' },
      { word: '같이', translation: 'juntos / junto a' },
      { word: '날씨', translation: 'el clima / el tiempo (meteorológico)' },
      { word: '재밌을 것 같아', translation: 'creo que será divertido' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "날씨"?', options: ['el clima', 'el dinero', 'el tiempo libre', 'el lugar'], correct: 'el clima' },
        { type: 'multiple', question: '¿Cuál de estas palabras aparece en el texto?', options: ['한강', '바다', '산', '공원'], correct: '한강' },
        { type: 'truefalse', question: 'La persona hará algo diferente el sábado y el domingo.', correct: true },
        { type: 'order', question: 'Ordena las palabras para formar la pregunta del texto:', words: ['할', '뭐', '거야?'], correct: ['뭐', '할', '거야?'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿Adónde van a ir el sábado?', options: ['Al río Han', 'A la montaña', 'A la playa', 'Al parque'], correct: 'Al río Han' },
        { type: 'multiple', question: '¿Qué van a comer en el río Han?', options: ['Pollo frito y cerveza', 'Pizza y refresco', 'Ramen y soju', 'Kimbap y agua'], correct: 'Pollo frito y cerveza' },
        { type: 'multiple', question: '¿Qué tiene planeado la persona para el domingo?', options: ['Ver una película en casa', 'Salir de viaje', 'Ir al gimnasio', 'Estudiar todo el día'], correct: 'Ver una película en casa' },
        { type: 'multiple', question: '¿Por qué la persona invita a Jimin a salir?', options: ['Porque el clima estará bien y será divertido', 'Porque está aburrida', 'Porque necesita ayuda', 'Porque es el cumpleaños de alguien'], correct: 'Porque el clima estará bien y será divertido' },
      ],
      avanzado: [
        { type: 'open', question: 'Responde al mensaje como si fueras Jimin. Acepta o rechaza la invitación y explica tus propios planes para el fin de semana en coreano.' },
        { type: 'open', question: '¿Qué estructura gramatical se usa para hablar de planes futuros en este texto? Da dos ejemplos del texto y explica cómo funciona.' },
      ],
    },
  },
  {
    id: 'a2-2',
    nivel: 'A2',
    titulo: 'Describir mi apartamento',
    tituloKo: '내 집 소개',
    korean: '저는 서울 홍대 근처에 살아요. 집은 원룸이에요. 작지만 깨끗해요. 거실에는 소파랑 텔레비전이 있어요. 부엌은 좀 작아요. 하지만 냉장고랑 전자레인지가 있어요. 창문에서 공원이 보여요. 월세는 팔십만 원이에요. 지하철역에서 걸어서 오 분이에요. 정말 편해요!',
    vocab: [
      { word: '원룸', translation: 'estudio / apartamento de un solo cuarto' },
      { word: '깨끗해요', translation: 'está limpio/a' },
      { word: '월세', translation: 'alquiler mensual' },
      { word: '지하철역', translation: 'estación de metro' },
      { word: '편해요', translation: 'es cómodo/a / es conveniente' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "깨끗해요"?', options: ['está limpio', 'está grande', 'está lejos', 'está caro'], correct: 'está limpio' },
        { type: 'multiple', question: '¿Cuál de estas palabras aparece en el texto?', options: ['월세', '전세', '자가', '기숙사'], correct: '월세' },
        { type: 'truefalse', question: 'El apartamento tiene vista a un parque.', correct: true },
        { type: 'order', question: 'Ordena correctamente:', words: ['편해요', '정말', '!'], correct: ['정말', '편해요', '!'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿Dónde está ubicado el apartamento?', options: ['Cerca de Hongdae, Seúl', 'En Busan, cerca del mar', 'En Daejeon, centro', 'En Incheon, aeropuerto'], correct: 'Cerca de Hongdae, Seúl' },
        { type: 'multiple', question: '¿Cómo describe la sala de estar?', options: ['Tiene sofá y televisión', 'Tiene sofá y mesa', 'Está vacía', 'Tiene mesa y sillas'], correct: 'Tiene sofá y televisión' },
        { type: 'multiple', question: '¿Cuánto es el alquiler mensual?', options: ['800.000 won', '500.000 won', '1.000.000 won', '300.000 won'], correct: '800.000 won' },
        { type: 'multiple', question: '¿A cuántos minutos de la estación de metro está?', options: ['5 minutos', '10 minutos', '2 minutos', '15 minutos'], correct: '5 minutos' },
      ],
      avanzado: [
        { type: 'open', question: 'Describe tu propio apartamento o casa ideal en coreano, usando al menos 3 palabras del vocabulario del texto.' },
        { type: 'open', question: '¿Cuáles son las ventajas y desventajas del apartamento descrito en el texto? Responde con detalle.' },
      ],
    },
  },
  {
    id: 'a2-3',
    nivel: 'A2',
    titulo: 'El clima y las estaciones',
    tituloKo: '날씨와 계절',
    korean: '한국에는 사계절이 있어요. 봄에는 날씨가 따뜻하고 꽃이 많이 피어요. 여름은 덥고 비가 많이 와요. 특히 칠월에 장마가 있어요. 가을은 제 계절이에요! 날씨가 시원하고 단풍이 아름다워요. 겨울에는 눈이 와요. 많이 추워요. 저는 가을을 가장 좋아해요.',
    vocab: [
      { word: '사계절', translation: 'las cuatro estaciones' },
      { word: '따뜻하고', translation: 'cálido y / tibio y' },
      { word: '장마', translation: 'temporada de lluvias (junio-julio)' },
      { word: '단풍', translation: 'hojas de otoño (rojas y amarillas)' },
      { word: '추워요', translation: 'hace frío / está frío' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "사계절"?', options: ['las cuatro estaciones', 'los siete meses', 'los doce meses', 'la temporada de lluvias'], correct: 'las cuatro estaciones' },
        { type: 'multiple', question: '¿Cuál de estas palabras aparece en el texto?', options: ['단풍', '꽃잎', '나뭇잎', '이파리'], correct: '단풍' },
        { type: 'truefalse', question: 'A la persona le gusta más el invierno que el otoño.', correct: false },
        { type: 'order', question: 'Ordena las estaciones según aparecen en el texto:', words: ['여름', '봄', '가을'], correct: ['봄', '여름', '가을'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿En qué mes hay temporada de lluvias en Corea?', options: ['En julio', 'En junio', 'En agosto', 'En mayo'], correct: 'En julio' },
        { type: 'multiple', question: '¿Cómo describe el otoño?', options: ['Fresco con hojas coloridas', 'Cálido con flores', 'Muy frío con nieve', 'Lluvioso y nublado'], correct: 'Fresco con hojas coloridas' },
        { type: 'multiple', question: '¿Cuál es la estación favorita de la persona?', options: ['El otoño', 'La primavera', 'El verano', 'El invierno'], correct: 'El otoño' },
        { type: 'multiple', question: '¿Cómo es el verano en Corea según el texto?', options: ['Caluroso y lluvioso', 'Frío y soleado', 'Templado y seco', 'Muy húmedo pero sin lluvia'], correct: 'Caluroso y lluvioso' },
      ],
      avanzado: [
        { type: 'open', question: 'Compara el clima de Corea con el de tu país. ¿Tienen las mismas cuatro estaciones? ¿Cuál es tu estación favorita y por qué? Responde en coreano.' },
        { type: 'open', question: '¿Qué actividades relacionas tú con cada estación del año? Menciona al menos una actividad por estación en coreano.' },
      ],
    },
  },

  // ──────────────────────────────── B1 ────────────────────────────────
  {
    id: 'b1-1',
    nivel: 'B1',
    titulo: 'Experiencias de viaje',
    tituloKo: '여행 경험',
    korean: '작년에 일본 도쿄에 다녀왔어요. 처음에는 일본어를 전혀 몰라서 걱정했는데, 생각보다 괜찮았어요. 사람들이 친절하게 도와줬어요. 신주쿠랑 아사쿠사를 구경했는데 정말 신기하고 아름다웠어요. 음식은 라멘이랑 초밥을 먹었는데 너무 맛있었어요. 특히 밤에 본 도쿄 야경이 잊을 수 없어요. 다음에는 더 오래 있고 싶어요. 언젠가 오사카도 꼭 가보고 싶어요.',
    vocab: [
      { word: '다녀왔어요', translation: 'fui y regresé / visité (ida y vuelta)' },
      { word: '전혀', translation: 'en absoluto / para nada' },
      { word: '걱정했는데', translation: 'estaba preocupado/a, pero...' },
      { word: '신기하고', translation: 'curioso/a y / fascinante y' },
      { word: '야경', translation: 'vista nocturna de la ciudad' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "전혀"?', options: ['en absoluto', 'a veces', 'siempre', 'casi'], correct: 'en absoluto' },
        { type: 'multiple', question: '¿Cuál de estas palabras aparece en el texto?', options: ['야경', '경치', '풍경', '뷰'], correct: '야경' },
        { type: 'truefalse', question: 'La persona habla de un viaje que hará en el futuro.', correct: false },
        { type: 'order', question: 'Ordena correctamente:', words: ['다녀왔어요', '도쿄에', '작년에'], correct: ['작년에', '도쿄에', '다녀왔어요'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿Por qué estaba preocupada la persona antes del viaje?', options: ['Por no saber japonés', 'Por el costo del viaje', 'Por el clima en Tokio', 'Por no tener compañía'], correct: 'Por no saber japonés' },
        { type: 'multiple', question: '¿Qué lugares visitó en Tokio?', options: ['Shinjuku y Asakusa', 'Shibuya y Harajuku', 'Akihabara y Ginza', 'Ueno y Roppongi'], correct: 'Shinjuku y Asakusa' },
        { type: 'multiple', question: '¿Qué fue lo más memorable del viaje según el texto?', options: ['La vista nocturna de Tokio', 'La comida japonesa', 'La amabilidad de la gente', 'Los templos y shrines'], correct: 'La vista nocturna de Tokio' },
        { type: 'multiple', question: '¿Cuál es el próximo destino que quiere visitar?', options: ['Osaka', 'Kioto', 'Hiroshima', 'Nara'], correct: 'Osaka' },
      ],
      avanzado: [
        { type: 'open', question: 'Habla sobre un viaje que hayas hecho o que te gustaría hacer. ¿Qué fue lo más impresionante? ¿Qué fue lo más difícil? Escribe en coreano usando los tiempos del pasado.' },
        { type: 'open', question: '¿Cuáles son las similitudes y diferencias culturales entre Corea y Japón que conoces? ¿Cómo crees que estas diferencias afectan la experiencia de viaje? Responde en detalle.' },
      ],
    },
  },
  {
    id: 'b1-2',
    nivel: 'B1',
    titulo: 'Ciudad vs campo',
    tituloKo: '도시 vs 시골',
    korean: '저는 원래 시골에서 자랐는데 지금은 서울에서 살고 있어요. 도시 생활은 정말 편리해요. 교통이 잘 되어 있고 다양한 편의시설이 많아요. 하지만 사람이 너무 많고 복잡해서 가끔 힘들어요. 공기도 좀 안 좋아요. 반면에 시골은 공기가 맑고 조용해서 스트레스를 덜 받아요. 자연이 가까이 있어서 산책하기도 좋아요. 하지만 교통이 불편하고 할 수 있는 것이 적어요. 저는 두 가지를 비교하면 도시가 더 맞는 것 같아요.',
    vocab: [
      { word: '자랐는데', translation: 'crecí, pero... / me crié, pero...' },
      { word: '편리해요', translation: 'es conveniente / es práctico/a' },
      { word: '편의시설', translation: 'instalaciones / servicios y comodidades' },
      { word: '반면에', translation: 'por otro lado / en cambio' },
      { word: '비교하면', translation: 'si comparo / al comparar' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "편리해요"?', options: ['es conveniente', 'es difícil', 'es barato', 'es cercano'], correct: 'es conveniente' },
        { type: 'multiple', question: '¿Cuál de estas palabras aparece en el texto?', options: ['반면에', '그래서', '왜냐하면', '그러므로'], correct: '반면에' },
        { type: 'truefalse', question: 'La persona creció en la ciudad y ahora vive en el campo.', correct: false },
        { type: 'order', question: 'Ordena la oración del texto:', words: ['살고', '서울에서', '있어요'], correct: ['서울에서', '살고', '있어요'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿Dónde creció la persona y dónde vive ahora?', options: ['En el campo / en Seúl', 'En Seúl / en el campo', 'En Busan / en Seúl', 'En el campo / en Busan'], correct: 'En el campo / en Seúl' },
        { type: 'multiple', question: '¿Qué aspecto negativo menciona sobre la ciudad?', options: ['Mucha gente, caótico y aire contaminado', 'El alquiler es muy caro', 'No hay transporte público', 'Hace mucho calor en verano'], correct: 'Mucha gente, caótico y aire contaminado' },
        { type: 'multiple', question: '¿Qué ventaja menciona del campo?', options: ['Aire limpio, tranquilidad y naturaleza cercana', 'Mejor comida y gente más amable', 'Trabajo más fácil de encontrar', 'Mejores colegios para los niños'], correct: 'Aire limpio, tranquilidad y naturaleza cercana' },
        { type: 'multiple', question: '¿Cuál es la conclusión de la persona al comparar ambos estilos de vida?', options: ['Prefiere la ciudad', 'Prefiere el campo', 'Le gustan los dos por igual', 'No puede decidir'], correct: 'Prefiere la ciudad' },
      ],
      avanzado: [
        { type: 'open', question: '¿Prefieres vivir en la ciudad o en el campo? Argumenta tu posición en coreano usando vocabulario y estructuras del texto. Menciona al menos 2 ventajas y 1 desventaja de tu elección.' },
        { type: 'open', question: 'El texto usa la estructura "~는데" para contrastar ideas. Encuentra dos ejemplos en el texto y explica qué contraste se establece en cada uno.' },
      ],
    },
  },
  {
    id: 'b1-3',
    nivel: 'B1',
    titulo: 'Aprendizaje de idiomas',
    tituloKo: '언어 공부와 목표',
    korean: '저는 한국어를 배운 지 일 년이 됐어요. 처음에는 발음이 너무 어려워서 포기할 뻔했어요. 하지만 꾸준히 하다 보니 점점 나아지고 있어요. 요즘은 매일 드라마를 보면서 듣기 연습을 해요. 그리고 언어 교환 앱으로 한국인 친구랑 대화 연습을 해요. 공부할 때 가장 도움이 된 것은 반복이에요. 같은 표현을 여러 번 써야 자연스러워져요. 목표는 내년에 토픽 삼 급을 따는 거예요. 할 수 있을 것 같아요!',
    vocab: [
      { word: '배운 지', translation: 'desde que empecé a aprender / llevo ... aprendiendo' },
      { word: '포기할 뻔했어요', translation: 'casi me rendí / estuvo a punto de abandonar' },
      { word: '꾸준히', translation: 'constantemente / con constancia / de forma regular' },
      { word: '언어 교환', translation: 'intercambio de idiomas (language exchange)' },
      { word: '토픽', translation: 'TOPIK (Test of Proficiency in Korean, examen oficial de coreano)' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "꾸준히"?', options: ['constantemente', 'rápidamente', 'fácilmente', 'raramente'], correct: 'constantemente' },
        { type: 'multiple', question: '¿Cuál de estas palabras aparece en el texto?', options: ['토픽', '한자', '히라가나', 'JLPT'], correct: '토픽' },
        { type: 'truefalse', question: 'La persona encontró la pronunciación coreana muy fácil al principio.', correct: false },
        { type: 'order', question: 'Ordena la oración del texto:', words: ['됐어요', '일 년이', '배운 지'], correct: ['배운 지', '일 년이', '됐어요'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿Cuánto tiempo lleva estudiando coreano?', options: ['Un año', 'Seis meses', 'Dos años', 'Tres meses'], correct: 'Un año' },
        { type: 'multiple', question: '¿Qué método usa para practicar la comprensión auditiva?', options: ['Ver dramas coreanos a diario', 'Escuchar podcasts', 'Tomar clases presenciales', 'Leer libros de texto'], correct: 'Ver dramas coreanos a diario' },
        { type: 'multiple', question: '¿Qué dice que es lo más útil para aprender?', options: ['La repetición constante', 'La gramática formal', 'Los exámenes frecuentes', 'La memorización de vocabulario'], correct: 'La repetición constante' },
        { type: 'multiple', question: '¿Cuál es el objetivo de la persona para el año siguiente?', options: ['Aprobar el TOPIK nivel 3', 'Vivir en Corea', 'Hablar con fluidez sin estudiar', 'Hacer el TOPIK nivel 5'], correct: 'Aprobar el TOPIK nivel 3' },
      ],
      avanzado: [
        { type: 'open', question: '¿Cuáles son tus métodos de estudio para aprender coreano? ¿Qué ha funcionado mejor para ti y qué ha sido más difícil? Responde en coreano con detalle.' },
        { type: 'open', question: 'El texto menciona "포기할 뻔했어요". ¿Alguna vez has querido rendirte con el coreano? ¿Qué te motivó a seguir adelante? Comparte tu experiencia personal en coreano.' },
      ],
    },
  },
];
