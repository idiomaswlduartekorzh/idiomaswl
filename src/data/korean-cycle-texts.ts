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

  {
    id: 'a1-4',
    nivel: 'A1',
    titulo: 'En el autobús',
    tituloKo: '버스에서',
    korean: '버스 정류장에 있어요. 버스가 와요. 문이 열려요. 저는 타요. 버스에 사람이 많아요. 자리가 없어요. 서서 가요. 다음 정류장에서 내려요.',
    vocab: [
      { word: '버스 정류장', translation: 'parada de autobús' },
      { word: '문', translation: 'puerta' },
      { word: '자리', translation: 'asiento / lugar' },
      { word: '서서', translation: 'de pie / parado/a' },
      { word: '내려요', translation: 'me bajo / desciendo' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "자리"?', options: ['asiento', 'ventana', 'puerta', 'billete'], correct: 'asiento' },
        { type: 'truefalse', question: 'Hay asientos disponibles en el autobús.', correct: false },
        { type: 'multiple', question: '¿Qué hace la persona cuando no hay asientos?', options: ['Va de pie', 'Espera el siguiente bus', 'Se sienta en el suelo', 'Llama un taxi'], correct: 'Va de pie' },
        { type: 'order', question: 'Ordena las palabras correctamente:', words: ['가요', '서서'], correct: ['서서', '가요'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿Por qué no hay asiento?', options: ['Hay mucha gente en el autobús', 'El autobús es muy pequeño', 'Llegó tarde', 'Los asientos están rotos'], correct: 'Hay mucha gente en el autobús' },
        { type: 'multiple', question: '¿Qué se abre cuando llega el autobús?', options: ['La puerta', 'La ventana', 'El techo', 'El maletero'], correct: 'La puerta' },
        { type: 'multiple', question: '¿Dónde baja la persona?', options: ['En la siguiente parada', 'En la parada final', 'En la escuela', 'En su casa'], correct: 'En la siguiente parada' },
        { type: 'multiple', question: '¿Qué hace la persona al inicio del texto?', options: ['Espera en la parada', 'Ya está en el autobús', 'Camina', 'Llama a un taxi'], correct: 'Espera en la parada' },
      ],
      avanzado: [
        { type: 'open', question: 'Describe tu trayecto habitual en transporte público usando vocabulario del texto. ¿Qué haces cuando no hay asientos?' },
        { type: 'open', question: '¿Cómo es el transporte público en tu ciudad comparado con el de Corea? Responde en coreano con al menos tres diferencias.' },
      ],
    },
  },
  {
    id: 'a1-5',
    nivel: 'A1',
    titulo: 'Mi familia',
    tituloKo: '우리 가족',
    korean: '저는 가족이 네 명이에요. 아버지, 어머니, 언니, 그리고 저예요. 아버지는 회사원이에요. 어머니는 선생님이에요. 언니는 대학생이에요. 저는 고등학생이에요. 우리 가족은 서울에 살아요.',
    vocab: [
      { word: '가족', translation: 'familia' },
      { word: '아버지', translation: 'padre' },
      { word: '어머니', translation: 'madre' },
      { word: '언니', translation: 'hermana mayor (dicho por mujer)' },
      { word: '고등학생', translation: 'estudiante de bachillerato / secundaria' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "가족"?', options: ['familia', 'trabajo', 'escuela', 'ciudad'], correct: 'familia' },
        { type: 'truefalse', question: 'La familia tiene cinco miembros.', correct: false },
        { type: 'multiple', question: '¿Cuántas personas hay en la familia?', options: ['Cuatro', 'Tres', 'Cinco', 'Dos'], correct: 'Cuatro' },
        { type: 'order', question: 'Ordena correctamente:', words: ['살아요', '서울에', '우리 가족은'], correct: ['우리 가족은', '서울에', '살아요'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿A qué se dedica el padre?', options: ['Es empleado de empresa', 'Es médico', 'Es profesor', 'Es cocinero'], correct: 'Es empleado de empresa' },
        { type: 'multiple', question: '¿Qué estudia la hermana mayor?', options: ['Está en la universidad', 'Está en la secundaria', 'Ya trabaja', 'Está en primaria'], correct: 'Está en la universidad' },
        { type: 'multiple', question: '¿Dónde vive la familia?', options: ['En Seúl', 'En Busan', 'En Incheon', 'En Jeju'], correct: 'En Seúl' },
        { type: 'multiple', question: '¿Cuál es la profesión de la madre?', options: ['Profesora', 'Médica', 'Abogada', 'Ingeniera'], correct: 'Profesora' },
      ],
      avanzado: [
        { type: 'open', question: 'Presenta a tu propia familia en coreano. Menciona cuántos son, sus roles y ocupaciones.' },
        { type: 'open', question: '¿Qué palabras coreanas para "hermano/a" conoces además de "언니"? Explica las diferencias según el hablante y el género del familiar.' },
      ],
    },
  },
  {
    id: 'a1-6',
    nivel: 'A1',
    titulo: 'El fin de semana',
    tituloKo: '주말',
    korean: '주말에 집에 있어요. 음악을 들어요. 책도 읽어요. 친구랑 영화도 봐요. 운동도 해요. 공원에서 달려요. 피곤해요. 하지만 행복해요.',
    vocab: [
      { word: '주말', translation: 'fin de semana' },
      { word: '읽어요', translation: 'leo / lees' },
      { word: '달려요', translation: 'corro / corre' },
      { word: '피곤해요', translation: 'estoy cansado/a' },
      { word: '행복해요', translation: 'estoy feliz / soy feliz' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "피곤해요"?', options: ['estoy cansado/a', 'tengo hambre', 'tengo frío', 'estoy aburrido/a'], correct: 'estoy cansado/a' },
        { type: 'truefalse', question: 'La persona pasa el fin de semana en casa.', correct: true },
        { type: 'multiple', question: '¿Qué hace la persona en el parque?', options: ['Corre', 'Lee', 'Duerme', 'Come'], correct: 'Corre' },
        { type: 'order', question: 'Ordena correctamente:', words: ['행복해요', '하지만'], correct: ['하지만', '행복해요'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿Cuántas actividades diferentes hace la persona?', options: ['Cinco', 'Tres', 'Cuatro', 'Dos'], correct: 'Cinco' },
        { type: 'multiple', question: '¿Con quién ve películas la persona?', options: ['Con un/a amigo/a', 'Con su familia', 'Sola', 'Con sus compañeros de trabajo'], correct: 'Con un/a amigo/a' },
        { type: 'multiple', question: '¿Cómo se siente la persona al final del texto?', options: ['Cansada pero feliz', 'Triste y aburrida', 'Enérgica y feliz', 'Cansada y triste'], correct: 'Cansada pero feliz' },
        { type: 'multiple', question: '¿Dónde corre la persona?', options: ['En el parque', 'En el gimnasio', 'En la calle', 'En la universidad'], correct: 'En el parque' },
      ],
      avanzado: [
        { type: 'open', question: 'Describe tu fin de semana típico en coreano. ¿En qué se parece y en qué se diferencia al del texto?' },
        { type: 'open', question: 'El texto usa "도" varias veces (책도, 영화도, 운동도). ¿Qué función cumple esta partícula? Escribe tres oraciones propias usando "도".' },
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

  {
    id: 'a2-4',
    nivel: 'A2',
    titulo: 'En el hospital',
    tituloKo: '병원에서',
    korean: '오늘 병원에 갔어요. 머리가 너무 아파요. 의사 선생님이 진찰했어요. "열이 있어요. 감기예요." 약을 받았어요. 이틀 동안 쉬어야 해요. 물을 많이 마셔야 해요. 빨리 나을 것 같아요.',
    vocab: [
      { word: '아파요', translation: 'duele / me duele / estoy enfermo/a' },
      { word: '의사', translation: 'médico/a' },
      { word: '진찰했어요', translation: 'examinó / hizo la consulta médica' },
      { word: '열', translation: 'fiebre' },
      { word: '나을 것 같아요', translation: 'creo que me voy a recuperar pronto' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "열"?', options: ['fiebre', 'dolor de cabeza', 'tos', 'resfriado'], correct: 'fiebre' },
        { type: 'truefalse', question: 'El médico dice que la persona tiene gripe.', correct: true },
        { type: 'multiple', question: '¿Qué recibe la persona del médico?', options: ['Medicamentos', 'Un certificado', 'Una vacuna', 'Una radiografía'], correct: 'Medicamentos' },
        { type: 'order', question: 'Ordena correctamente:', words: ['마셔야', '많이', '물을', '해요'], correct: ['물을', '많이', '마셔야', '해요'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿Cuál es el síntoma principal que tiene la persona?', options: ['Dolor de cabeza intenso', 'Fiebre alta', 'Tos fuerte', 'Dolor de estómago'], correct: 'Dolor de cabeza intenso' },
        { type: 'multiple', question: '¿Cuántos días debe descansar?', options: ['Dos días', 'Un día', 'Tres días', 'Una semana'], correct: 'Dos días' },
        { type: 'multiple', question: '¿Qué recomienda el médico además de descansar?', options: ['Beber mucha agua', 'Hacer ejercicio suave', 'Salir a caminar', 'Comer mucho'], correct: 'Beber mucha agua' },
        { type: 'multiple', question: '¿Cómo termina el texto?', options: ['La persona cree que se va a recuperar pronto', 'Tiene que volver mañana', 'Se siente muy mal', 'Necesita una cirugía'], correct: 'La persona cree que se va a recuperar pronto' },
      ],
      avanzado: [
        { type: 'open', question: 'Imagina que estás en un hospital en Corea. Escribe el diálogo con el médico donde describes tus síntomas y recibes sus recomendaciones. Usa al menos 4 palabras del vocabulario.' },
        { type: 'open', question: 'El texto usa "어야 해요" para expresar obligación. Encuentra los dos ejemplos del texto y escribe tres oraciones propias con esta estructura sobre situaciones cotidianas.' },
      ],
    },
  },
  {
    id: 'a2-5',
    nivel: 'A2',
    titulo: 'De compras',
    tituloKo: '슈퍼마켓에서',
    korean: '오늘 슈퍼마켓에 갔어요. 냉장고에 음식이 없어서 장을 봤어요. 과일이랑 야채를 샀어요. 계란도 열 개 샀어요. 라면도 다섯 개 샀어요. 계산할 때 카드로 냈어요. 영수증을 받았어요.',
    vocab: [
      { word: '장을 봤어요', translation: 'hice las compras / fui al mercado' },
      { word: '과일', translation: 'fruta' },
      { word: '야채', translation: 'verduras' },
      { word: '계산', translation: 'pago / la cuenta' },
      { word: '영수증', translation: 'recibo / factura' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "과일"?', options: ['fruta', 'verdura', 'carne', 'pan'], correct: 'fruta' },
        { type: 'truefalse', question: 'La persona pagó en efectivo.', correct: false },
        { type: 'multiple', question: '¿Por qué fue la persona al supermercado?', options: ['No había comida en el refrigerador', 'Quería probar algo nuevo', 'Era día de descuentos', 'Su amigo le pidió que fuera'], correct: 'No había comida en el refrigerador' },
        { type: 'order', question: 'Ordena correctamente:', words: ['냈어요', '카드로', '계산할 때'], correct: ['계산할 때', '카드로', '냈어요'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿Cuántos huevos compró?', options: ['Diez', 'Cinco', 'Doce', 'Seis'], correct: 'Diez' },
        { type: 'multiple', question: '¿Cuántos ramens compró?', options: ['Cinco', 'Tres', 'Diez', 'Dos'], correct: 'Cinco' },
        { type: 'multiple', question: '¿Qué recibió después de pagar?', options: ['Un recibo', 'Puntos de fidelidad', 'Un regalo', 'Un descuento'], correct: 'Un recibo' },
        { type: 'multiple', question: '¿Cuál era el problema en casa antes de ir al supermercado?', options: ['No había comida en el refrigerador', 'Se fue la luz', 'No había dinero', 'Estaba enfermo/a'], correct: 'No había comida en el refrigerador' },
      ],
      avanzado: [
        { type: 'open', question: 'Escribe tu propia lista de compras en coreano y describe lo que comprarías en un supermercado coreano. Usa números coreanos para las cantidades.' },
        { type: 'open', question: '¿Qué productos típicos coreanos conoces que encontrarías en un supermercado? Compara los supermercados de Corea con los de tu país. Responde en coreano.' },
      ],
    },
  },
  {
    id: 'a2-6',
    nivel: 'A2',
    titulo: 'Fiesta de cumpleaños',
    tituloKo: '생일 파티',
    korean: '어제 친구 생일 파티에 갔어요. 케이크가 정말 맛있었어요. 선물을 주었어요. 친구가 좋아했어요. 노래도 불렀어요. 게임도 했어요. 즐거운 시간이었어요. 밤늦게 집에 왔어요.',
    vocab: [
      { word: '생일 파티', translation: 'fiesta de cumpleaños' },
      { word: '선물', translation: 'regalo' },
      { word: '노래를 불렀어요', translation: 'canté / cantamos' },
      { word: '즐거운', translation: 'divertido/a / alegre' },
      { word: '밤늦게', translation: 'tarde en la noche / a altas horas' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "선물"?', options: ['regalo', 'pastel', 'canción', 'juego'], correct: 'regalo' },
        { type: 'truefalse', question: 'La fiesta fue hoy.', correct: false },
        { type: 'multiple', question: '¿Cómo fue la fiesta según el texto?', options: ['Divertida', 'Aburrida', 'Muy corta', 'Triste'], correct: 'Divertida' },
        { type: 'order', question: 'Ordena correctamente:', words: ['파티에', '친구', '갔어요', '생일'], correct: ['친구', '생일', '파티에', '갔어요'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿Cuándo fue la fiesta?', options: ['Ayer', 'Hoy', 'La semana pasada', 'El fin de semana'], correct: 'Ayer' },
        { type: 'multiple', question: '¿Cómo reaccionó el amigo/a al recibir el regalo?', options: ['Le gustó', 'No le gustó', 'Ya lo tenía', 'No lo abrió'], correct: 'Le gustó' },
        { type: 'multiple', question: '¿A qué hora volvió la persona a casa?', options: ['Muy tarde por la noche', 'Temprano', 'Al mediodía', 'A las seis'], correct: 'Muy tarde por la noche' },
        { type: 'multiple', question: '¿Qué actividades se hicieron en la fiesta?', options: ['Cantar y jugar', 'Solo comer pastel', 'Ver películas', 'Estudiar juntos'], correct: 'Cantar y jugar' },
      ],
      avanzado: [
        { type: 'open', question: 'Describe una fiesta memorable a la que hayas ido. Usa el tiempo pasado en coreano y al menos tres palabras del vocabulario del texto.' },
        { type: 'open', question: '¿Cómo se celebran los cumpleaños en Corea comparado con tu cultura? ¿Qué similitudes y diferencias hay? Responde en coreano.' },
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
  {
    id: 'b1-4',
    nivel: 'B1',
    titulo: 'Tecnología y redes sociales',
    tituloKo: '기술과 소셜 미디어',
    korean: '요즘 스마트폰 없이는 하루도 보내기 힘들 것 같아요. 아침에 일어나자마자 핸드폰을 확인해요. 소셜 미디어에서 뉴스를 보고, 친구들과 메시지를 주고받아요. 편리하지만 중독되기 쉬워요. 가끔 핸드폰을 내려놓고 자연을 즐기고 싶어요. 디지털 디톡스가 필요한 시대인 것 같아요.',
    vocab: [
      { word: '없이는', translation: 'sin / sin ello' },
      { word: '일어나자마자', translation: 'apenas me levanto / en cuanto me levanto' },
      { word: '확인해요', translation: 'reviso / verifico / compruebo' },
      { word: '중독되기 쉬워요', translation: 'es fácil volverse adicto/a' },
      { word: '디지털 디톡스', translation: 'desintoxicación digital' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "확인해요"?', options: ['reviso / compruebo', 'escribo', 'llamo', 'busco'], correct: 'reviso / compruebo' },
        { type: 'truefalse', question: 'La persona considera el teléfono completamente negativo.', correct: false },
        { type: 'multiple', question: '¿Cuándo revisa su teléfono la persona?', options: ['Apenas se levanta', 'Antes de dormir', 'Solo en el trabajo', 'Los fines de semana'], correct: 'Apenas se levanta' },
        { type: 'order', question: 'Ordena correctamente:', words: ['없이는', '힘들어요', '스마트폰'], correct: ['스마트폰', '없이는', '힘들어요'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿Para qué usa la persona el teléfono al despertar?', options: ['Revisar noticias y mensajes', 'Escuchar música', 'Hacer ejercicio', 'Leer libros'], correct: 'Revisar noticias y mensajes' },
        { type: 'multiple', question: '¿Cuál es el problema principal que menciona el texto?', options: ['Es fácil volverse adicto al teléfono', 'El internet es muy caro', 'Las redes sociales son falsas', 'Los teléfonos se dañan fácilmente'], correct: 'Es fácil volverse adicto al teléfono' },
        { type: 'multiple', question: '¿Qué desea hacer la persona a veces?', options: ['Dejar el teléfono y disfrutar la naturaleza', 'Comprar un teléfono nuevo', 'Borrar sus redes sociales', 'Aprender a programar'], correct: 'Dejar el teléfono y disfrutar la naturaleza' },
        { type: 'multiple', question: '¿Qué solución propone el texto?', options: ['La desintoxicación digital', 'Borrar todas las aplicaciones', 'No tener teléfono', 'Usar el teléfono solo de noche'], correct: 'La desintoxicación digital' },
      ],
      avanzado: [
        { type: 'open', question: '¿Cuántas horas al día usas el teléfono? ¿Crees que eres adicto/a a las redes sociales? Argumenta tu posición en coreano usando vocabulario del texto.' },
        { type: 'open', question: '¿Qué ventajas y desventajas tienen las redes sociales para los jóvenes de hoy? Compara la cultura digital de Corea (influencers, webtoons, K-dramas online) con la de tu país. Responde en coreano.' },
      ],
    },
  },
  {
    id: 'b1-5',
    nivel: 'B1',
    titulo: 'Trabajo y burnout',
    tituloKo: '업무와 번아웃',
    korean: '이번 주에 할 일이 너무 많아요. 마감이 계속 있어서 스트레스를 많이 받아요. 점심도 못 먹은 날이 있었어요. 동료들이랑 협력해서 겨우 끝냈어요. 퇴근 후에는 아무것도 하기 싫어요. 번아웃이 오기 전에 쉬어야 할 것 같아요. 일과 삶의 균형이 중요하다는 걸 다시 느꼈어요.',
    vocab: [
      { word: '마감', translation: 'fecha límite / deadline' },
      { word: '협력해서', translation: 'colaborando / trabajando en equipo' },
      { word: '겨우', translation: 'apenas / a duras penas' },
      { word: '번아웃', translation: 'agotamiento laboral / burnout' },
      { word: '균형', translation: 'equilibrio / balance' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "마감"?', options: ['fecha límite', 'reunión', 'proyecto', 'jefe'], correct: 'fecha límite' },
        { type: 'truefalse', question: 'La persona terminó el trabajo sola.', correct: false },
        { type: 'multiple', question: '¿Cómo terminó la persona su trabajo?', options: ['Con ayuda de sus colegas', 'Sola y muy tarde', 'Pidiendo extensión de plazo', 'Dejándolo incompleto'], correct: 'Con ayuda de sus colegas' },
        { type: 'order', question: 'Ordena correctamente:', words: ['중요해요', '균형이', '일과 삶의'], correct: ['일과 삶의', '균형이', '중요해요'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿Por qué tiene tanto estrés la persona?', options: ['Hay muchas fechas límite seguidas', 'Su jefe es muy estricto', 'El trabajo es muy difícil', 'Sus colegas no cooperan'], correct: 'Hay muchas fechas límite seguidas' },
        { type: 'multiple', question: '¿Qué días no pudo almorzar?', options: ['Algunos días de esa semana', 'Todos los días', 'Solo el lunes', 'Los viernes'], correct: 'Algunos días de esa semana' },
        { type: 'multiple', question: '¿Qué reflexión hace la persona al final?', options: ['Que el equilibrio entre trabajo y vida es importante', 'Que debe renunciar', 'Que necesita más dinero', 'Que sus colegas son malos'], correct: 'Que el equilibrio entre trabajo y vida es importante' },
        { type: 'multiple', question: '¿Cómo se siente la persona después de trabajar?', options: ['Sin ganas de hacer nada', 'Con energía para salir', 'Feliz y realizada', 'Nerviosa por el día siguiente'], correct: 'Sin ganas de hacer nada' },
      ],
      avanzado: [
        { type: 'open', question: '¿Has experimentado el burnout alguna vez? ¿Qué estrategias usas para mantener el equilibrio entre trabajo y vida personal? Responde en coreano con detalle.' },
        { type: 'open', question: 'La cultura laboral en Corea es conocida por sus largas horas (과로 문화). ¿Qué opinas de esto? ¿Existe algo similar en tu país? Argumenta en coreano con ejemplos.' },
      ],
    },
  },
  {
    id: 'b1-6',
    nivel: 'B1',
    titulo: 'El medio ambiente',
    tituloKo: '환경 문제',
    korean: '지구 온난화가 점점 심각해지고 있어요. 이상한 날씨가 많아졌고, 해수면도 올라가고 있어요. 플라스틱 쓰레기 문제도 여전히 해결되지 않았어요. 하지만 사람들의 환경 의식이 높아지고 있어요. 재활용을 하고, 대중교통을 이용하는 사람들이 늘어나고 있어요. 작은 실천이 모이면 변화가 생긴다고 믿어요.',
    vocab: [
      { word: '지구 온난화', translation: 'calentamiento global' },
      { word: '해수면', translation: 'nivel del mar' },
      { word: '환경 의식', translation: 'conciencia ambiental' },
      { word: '재활용', translation: 'reciclaje' },
      { word: '실천', translation: 'acción concreta / llevar a la práctica' },
    ],
    questions: {
      principiante: [
        { type: 'multiple', question: '¿Qué significa "재활용"?', options: ['reciclaje', 'contaminación', 'energía', 'basura'], correct: 'reciclaje' },
        { type: 'truefalse', question: 'El texto solo presenta problemas sin mencionar soluciones.', correct: false },
        { type: 'multiple', question: '¿Qué está aumentando según el texto?', options: ['La conciencia ambiental de las personas', 'La cantidad de plástico', 'El uso de coches', 'Las temperaturas en invierno'], correct: 'La conciencia ambiental de las personas' },
        { type: 'order', question: 'Ordena correctamente:', words: ['심각해지고', '지구 온난화가', '있어요'], correct: ['지구 온난화가', '심각해지고', '있어요'] },
      ],
      intermedio: [
        { type: 'multiple', question: '¿Cuáles son los dos problemas ambientales que menciona el texto?', options: ['El calentamiento global y el plástico', 'La deforestación y el plástico', 'El calentamiento y la deforestación', 'El plástico y el ruido'], correct: 'El calentamiento global y el plástico' },
        { type: 'multiple', question: '¿Qué le está pasando al nivel del mar?', options: ['Está subiendo', 'Está bajando', 'Está igual', 'Fluctúa según la estación'], correct: 'Está subiendo' },
        { type: 'multiple', question: '¿Qué acciones positivas están tomando las personas?', options: ['Reciclar y usar transporte público', 'Plantar árboles', 'Dejar de usar electricidad', 'Reducir el consumo de carne'], correct: 'Reciclar y usar transporte público' },
        { type: 'multiple', question: '¿Cuál es la conclusión del texto?', options: ['Las pequeñas acciones juntas producen cambio', 'Los problemas son demasiado grandes para resolverse', 'Solo los gobiernos pueden actuar', 'La tecnología salvará el planeta'], correct: 'Las pequeñas acciones juntas producen cambio' },
      ],
      avanzado: [
        { type: 'open', question: '¿Qué acciones concretas tomas tú en tu vida diaria para cuidar el medio ambiente? ¿Qué más podrías hacer? Responde en coreano usando vocabulario del texto.' },
        { type: 'open', question: '¿Crees que las personas o los gobiernos son más responsables del cambio climático? ¿Cómo aborda Corea estos problemas medioambientales? Argumenta en coreano con detalle.' },
      ],
    },
  },
];
