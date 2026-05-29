// Coreano Introductorio 1 — Mi primera presentación oral
// Data file: all content separate from UI

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SurvivalExpression {
  id: string;
  korean: string;
  romanization: string;
  spanish: string;
  situation: string;
}

export interface SurvivalQuiz {
  situationId: string;
  choices: string[];
  correct: string;
}

export interface PresentationLine {
  id: string;
  korean: string;
  romanization: string;
  spanish: string;
}

export interface VocabItem {
  id: string;
  korean: string;
  romanization: string;
  spanish: string;
  example: string;
  exampleEs: string;
}

export interface VocabGroup {
  id: string;
  label: string;
  color: string;
  items: VocabItem[];
}

export interface SentenceActivity {
  id: string;
  label: string;
  patternHint: string;
  chips: string[];
  correct: string[];
  teacherNote: string;
  successMsg: string;
}

export interface TeacherQuestion {
  id: string;
  question: string;
  romanization: string;
  spanish: string;
  answerPattern: string;
  answerPatternEs: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
}

export interface AgeOption {
  value: string;
  korean: string;
}

export interface SelectOption {
  value: string;
  korean: string;
  romanization: string;
  label?: string;
}

// ─── Survival expressions ─────────────────────────────────────────────────────

export const SURVIVAL_EXPRESSIONS: SurvivalExpression[] = [
  {
    id: 's1',
    korean: '안녕하세요',
    romanization: 'Annyeonghaseyo',
    spanish: 'Hola',
    situation: 'Entras al salón y ves a tu profesor/a por primera vez.',
  },
  {
    id: 's2',
    korean: '선생님',
    romanization: 'Seonsaengnim',
    spanish: 'Profesor/a',
    situation: 'Necesitas llamar la atención de tu profesor/a.',
  },
  {
    id: 's3',
    korean: '잘 모르겠어요',
    romanization: 'Jal moreugesseoyo',
    spanish: 'No sé bien / No entiendo bien',
    situation: 'Tu profesor te hace una pregunta y no sabes la respuesta.',
  },
  {
    id: 's4',
    korean: '다시 말해 주세요',
    romanization: 'Dasi malhae juseyo',
    spanish: 'Dígalo otra vez, por favor',
    situation: 'No escuchaste bien lo que dijo el profesor.',
  },
  {
    id: 's5',
    korean: '천천히 말해 주세요',
    romanization: 'Cheoncheonhi malhae juseyo',
    spanish: 'Hable despacio, por favor',
    situation: 'El profesor habla muy rápido y no entiendes.',
  },
  {
    id: 's6',
    korean: '제가 말해 볼게요',
    romanization: 'Jega malhae bolgeyo',
    spanish: 'Voy a intentar decirlo',
    situation: 'Quieres participar y vas a intentar decir algo en coreano.',
  },
];

export const SURVIVAL_QUIZZES: SurvivalQuiz[] = [
  { situationId: 's1', choices: ['s1', 's3', 's5'], correct: 's1' },
  { situationId: 's2', choices: ['s2', 's1', 's4'], correct: 's2' },
  { situationId: 's3', choices: ['s3', 's6', 's5'], correct: 's3' },
  { situationId: 's4', choices: ['s4', 's5', 's3'], correct: 's4' },
  { situationId: 's5', choices: ['s5', 's4', 's6'], correct: 's5' },
  { situationId: 's6', choices: ['s6', 's1', 's3'], correct: 's6' },
];

// ─── Model presentation ───────────────────────────────────────────────────────

export const MODEL_PRESENTATION: PresentationLine[] = [
  {
    id: 'p1',
    korean: '안녕하세요. 저는 다비드예요.',
    romanization: 'Annyeonghaseyo. Jeoneun Dabideuyeyo.',
    spanish: 'Hola. Soy David.',
  },
  {
    id: 'p2',
    korean: '저는 서른여섯 살이에요.',
    romanization: 'Jeoneun seoreunyeoseot sarieyo.',
    spanish: 'Tengo treinta y seis años.',
  },
  {
    id: 'p3',
    korean: '저는 콜롬비아 사람이에요.',
    romanization: 'Jeoneun Kollombia saramieyo.',
    spanish: 'Soy colombiano.',
  },
  {
    id: 'p4',
    korean: '저는 부카라망가에 살아요.',
    romanization: 'Jeoneun Bukaramanga-e sarayo.',
    spanish: 'Vivo en Bucaramanga.',
  },
  {
    id: 'p5',
    korean: '저는 선생님이에요.',
    romanization: 'Jeoneun seonsaengnimieyo.',
    spanish: 'Soy profesor.',
  },
  {
    id: 'p6',
    korean: '저는 한국어를 공부해요.',
    romanization: 'Jeoneun hangugeo-reul gongbuhaeyo.',
    spanish: 'Estudio coreano.',
  },
  {
    id: 'p7',
    korean: '저는 음악하고 커피를 좋아해요.',
    romanization: 'Jeoneun eumak-hago keopi-reul joahaeyo.',
    spanish: 'Me gusta la música y el café.',
  },
  {
    id: 'p8',
    korean: '오늘 저는 한국어 수업을 해요.',
    romanization: 'Oneul jeoneun hangugeo sueobeul haeyo.',
    spanish: 'Hoy tengo clase de coreano.',
  },
  {
    id: 'p9',
    korean: '감사합니다.',
    romanization: 'Gamsahamnida.',
    spanish: 'Gracias.',
  },
];

// ─── Vocabulary groups ────────────────────────────────────────────────────────

export const VOCAB_GROUPS: VocabGroup[] = [
  {
    id: 'pronouns',
    label: 'Pronombres',
    color: '#534AB7',
    items: [
      { id: 'v1', korean: '저', romanization: 'jeo', spanish: 'yo (formal)', example: '저는 학생이에요.', exampleEs: 'Yo soy estudiante.' },
      { id: 'v2', korean: '나', romanization: 'na', spanish: 'yo (informal)', example: '나는 학생이야.', exampleEs: 'Yo soy estudiante. (informal)' },
      { id: 'v3', korean: '너', romanization: 'neo', spanish: 'tú (informal)', example: '너는 누구야?', exampleEs: '¿Tú quién eres?' },
      { id: 'v4', korean: '그', romanization: 'geu', spanish: 'él', example: '그는 선생님이에요.', exampleEs: 'Él es profesor.' },
      { id: 'v5', korean: '그녀', romanization: 'geunyeo', spanish: 'ella', example: '그녀는 학생이에요.', exampleEs: 'Ella es estudiante.' },
    ],
  },
  {
    id: 'nouns',
    label: 'Sustantivos',
    color: '#059669',
    items: [
      { id: 'v6', korean: '이름', romanization: 'ireum', spanish: 'nombre', example: '이름이 뭐예요?', exampleEs: '¿Cuál es tu nombre?' },
      { id: 'v7', korean: '나이', romanization: 'nai', spanish: 'edad', example: '나이가 몇 살이에요?', exampleEs: '¿Cuántos años tienes?' },
      { id: 'v8', korean: '나라', romanization: 'nara', spanish: 'país', example: '어느 나라 사람이에요?', exampleEs: '¿De qué país eres?' },
      { id: 'v9', korean: '도시', romanization: 'dosi', spanish: 'ciudad', example: '어느 도시에 살아요?', exampleEs: '¿En qué ciudad vives?' },
      { id: 'v10', korean: '사람', romanization: 'saram', spanish: 'persona', example: '한국 사람이에요.', exampleEs: 'Soy coreano/a.' },
      { id: 'v11', korean: '학생', romanization: 'haksaeng', spanish: 'estudiante', example: '저는 학생이에요.', exampleEs: 'Soy estudiante.' },
      { id: 'v12', korean: '선생님', romanization: 'seonsaengnim', spanish: 'profesor/a', example: '저는 선생님이에요.', exampleEs: 'Soy profesor/a.' },
      { id: 'v13', korean: '수업', romanization: 'sueop', spanish: 'clase', example: '한국어 수업이에요.', exampleEs: 'Es la clase de coreano.' },
      { id: 'v14', korean: '한국어', romanization: 'hangugeo', spanish: 'coreano (idioma)', example: '한국어를 공부해요.', exampleEs: 'Estudio coreano.' },
      { id: 'v15', korean: '영어', romanization: 'yeongeo', spanish: 'inglés', example: '영어를 해요?', exampleEs: '¿Hablas inglés?' },
      { id: 'v16', korean: '스페인어', romanization: 'seupein-eo', spanish: 'español (idioma)', example: '스페인어를 해요.', exampleEs: 'Hablo español.' },
      { id: 'v17', korean: '음악', romanization: 'eumak', spanish: 'música', example: '음악을 좋아해요.', exampleEs: 'Me gusta la música.' },
      { id: 'v18', korean: '커피', romanization: 'keopi', spanish: 'café', example: '커피를 좋아해요.', exampleEs: 'Me gusta el café.' },
      { id: 'v19', korean: '책', romanization: 'chaek', spanish: 'libro', example: '책을 읽어요.', exampleEs: 'Leo libros.' },
      { id: 'v20', korean: '학교', romanization: 'hakgyo', spanish: 'escuela / colegio', example: '학교에 가요.', exampleEs: 'Voy a la escuela.' },
      { id: 'v21', korean: '집', romanization: 'jip', spanish: 'casa', example: '집에 있어요.', exampleEs: 'Estoy en casa.' },
    ],
  },
  {
    id: 'places',
    label: 'Países y ciudades',
    color: '#d97706',
    items: [
      { id: 'v22', korean: '콜롬비아', romanization: 'Kollombia', spanish: 'Colombia', example: '저는 콜롬비아 사람이에요.', exampleEs: 'Soy colombiano/a.' },
      { id: 'v23', korean: '한국', romanization: 'Hanguk', spanish: 'Corea', example: '한국에 가고 싶어요.', exampleEs: 'Quiero ir a Corea.' },
      { id: 'v24', korean: '미국', romanization: 'Miguk', spanish: 'Estados Unidos', example: '미국 사람이에요?', exampleEs: '¿Eres estadounidense?' },
      { id: 'v25', korean: '부카라망가', romanization: 'Bukaramanga', spanish: 'Bucaramanga', example: '부카라망가에 살아요.', exampleEs: 'Vivo en Bucaramanga.' },
      { id: 'v26', korean: '보고타', romanization: 'Bogota', spanish: 'Bogotá', example: '보고타에 살아요.', exampleEs: 'Vivo en Bogotá.' },
      { id: 'v27', korean: '서울', romanization: 'Seoul', spanish: 'Seúl', example: '서울에 가고 싶어요.', exampleEs: 'Quiero ir a Seúl.' },
    ],
  },
  {
    id: 'verbs',
    label: 'Verbos y expresiones',
    color: '#e11d48',
    items: [
      { id: 'v28', korean: '이에요 / 예요', romanization: 'ieyo / yeyo', spanish: 'soy / es (cópula)', example: '저는 학생이에요.', exampleEs: 'Soy estudiante.' },
      { id: 'v29', korean: '살아요', romanization: 'sarayo', spanish: 'vivo / vive', example: '서울에 살아요.', exampleEs: 'Vivo en Seúl.' },
      { id: 'v30', korean: '공부해요', romanization: 'gongbuhaeyo', spanish: 'estudio / estudia', example: '한국어를 공부해요.', exampleEs: 'Estudio coreano.' },
      { id: 'v31', korean: '좋아해요', romanization: 'joahaeyo', spanish: 'me gusta / le gusta', example: '음악을 좋아해요.', exampleEs: 'Me gusta la música.' },
      { id: 'v32', korean: '가요', romanization: 'gayo', spanish: 'voy / va', example: '학교에 가요.', exampleEs: 'Voy a la escuela.' },
      { id: 'v33', korean: '해요', romanization: 'haeyo', spanish: 'hago / hace', example: '수업을 해요.', exampleEs: 'Tengo clase.' },
      { id: 'v34', korean: '먹어요', romanization: 'meogeoyo', spanish: 'como / come', example: '밥을 먹어요.', exampleEs: 'Como arroz.' },
      { id: 'v35', korean: '마셔요', romanization: 'masyeoyo', spanish: 'bebo / bebe', example: '커피를 마셔요.', exampleEs: 'Bebo café.' },
    ],
  },
  {
    id: 'time',
    label: 'Tiempo',
    color: '#6366f1',
    items: [
      { id: 'v36', korean: '오늘', romanization: 'oneul', spanish: 'hoy', example: '오늘 수업이 있어요.', exampleEs: 'Hoy tengo clase.' },
      { id: 'v37', korean: '보통', romanization: 'botong', spanish: 'normalmente', example: '보통 커피를 마셔요.', exampleEs: 'Normalmente bebo café.' },
      { id: 'v38', korean: '지금', romanization: 'jigeum', spanish: 'ahora', example: '지금 공부해요.', exampleEs: 'Ahora estudio.' },
    ],
  },
  {
    id: 'numbers',
    label: 'Números / Edad',
    color: '#0891b2',
    items: [
      { id: 'v39', korean: '스무 살', romanization: 'seumu sal', spanish: '20 años', example: '저는 스무 살이에요.', exampleEs: 'Tengo 20 años.' },
      { id: 'v40', korean: '스물네 살', romanization: 'seumulne sal', spanish: '24 años', example: '저는 스물네 살이에요.', exampleEs: 'Tengo 24 años.' },
      { id: 'v41', korean: '서른 살', romanization: 'seorun sal', spanish: '30 años', example: '저는 서른 살이에요.', exampleEs: 'Tengo 30 años.' },
      { id: 'v42', korean: '서른여섯 살', romanization: 'seoreunyeoseot sal', spanish: '36 años', example: '저는 서른여섯 살이에요.', exampleEs: 'Tengo 36 años.' },
      { id: 'v43', korean: '마흔 살', romanization: 'maheun sal', spanish: '40 años', example: '저는 마흔 살이에요.', exampleEs: 'Tengo 40 años.' },
    ],
  },
  {
    id: 'particles',
    label: 'Partículas',
    color: '#7c3aed',
    items: [
      { id: 'v44', korean: '은/는', romanization: 'eun/neun', spanish: 'marcador de tópico', example: '저는 학생이에요.', exampleEs: 'Yo soy estudiante. (tópico: yo)' },
      { id: 'v45', korean: '이/가', romanization: 'i/ga', spanish: 'marcador de sujeto', example: '이름이 뭐예요?', exampleEs: '¿Cuál es el nombre?' },
      { id: 'v46', korean: '을/를', romanization: 'eul/reul', spanish: 'marcador de objeto', example: '한국어를 공부해요.', exampleEs: 'Estudio coreano.' },
      { id: 'v47', korean: '에', romanization: 'e', spanish: 'en / a (lugar)', example: '서울에 살아요.', exampleEs: 'Vivo en Seúl.' },
      { id: 'v48', korean: '하고', romanization: 'hago', spanish: 'y / con (entre sustantivos)', example: '음악하고 커피를 좋아해요.', exampleEs: 'Me gustan la música y el café.' },
    ],
  },
];

// ─── Sentence builder activities ──────────────────────────────────────────────

export const SENTENCE_ACTIVITIES: SentenceActivity[] = [
  {
    id: 'act-a',
    label: 'A — Mi identidad',
    patternHint: '저는 + nombre + 예요/이에요',
    chips: ['저는', '다비드예요', '서울에', '살아요', '한국어를', '공부해요'],
    correct: ['저는', '다비드예요'],
    teacherNote: 'Si el nombre termina en vocal → 예요. Si termina en consonante → 이에요. Ej: 마리아예요 / 유진이에요.',
    successMsg: '좋아요! 이제 읽어 보세요. — ¡Bien! Ahora léelo en voz alta.',
  },
  {
    id: 'act-b',
    label: 'B — Mi edad',
    patternHint: '저는 + edad + 살이에요',
    chips: ['저는', '서른여섯', '살이에요', '서울에', '좋아해요', '오늘'],
    correct: ['저는', '서른여섯', '살이에요'],
    teacherNote: 'La edad usa números nativos coreanos + 살. 살 tiene batchim ㄹ, así que siempre va con 이에요.',
    successMsg: '좋아요! 이제 읽어 보세요. — ¡Bien! Ahora léelo en voz alta.',
  },
  {
    id: 'act-c',
    label: 'C — Mi ciudad',
    patternHint: '저는 + ciudad + 에 + 살아요',
    chips: ['저는', '서울에', '살아요', '한국어를', '예요', '서른'],
    correct: ['저는', '서울에', '살아요'],
    teacherNote: 'La partícula 에 indica lugar. No cambia con el batchim. Siempre: [ciudad]에 살아요.',
    successMsg: '좋아요! 이제 읽어 보세요. — ¡Bien! Ahora léelo en voz alta.',
  },
  {
    id: 'act-d',
    label: 'D — Lo que me gusta',
    patternHint: '저는 + objeto + 을/를 + 좋아해요',
    chips: ['저는', '음악을', '좋아해요', '살아요', '서울에', '한국어를'],
    correct: ['저는', '음악을', '좋아해요'],
    teacherNote: '음악 termina en batchim ㄱ → 음악을. 커피 termina en vocal → 커피를. El objeto va antes del verbo.',
    successMsg: '좋아요! 이제 읽어 보세요. — ¡Bien! Ahora léelo en voz alta.',
  },
  {
    id: 'act-e',
    label: 'E — Lo que estudio',
    patternHint: '저는 + 한국어를 + 공부해요',
    chips: ['저는', '한국어를', '공부해요', '좋아해요', '서울에', '예요'],
    correct: ['저는', '한국어를', '공부해요'],
    teacherNote: 'Estructura coreana: Sujeto (저는) + Objeto (한국어를) + Verbo (공부해요). El verbo siempre al final.',
    successMsg: '좋아요! 이제 읽어 보세요. — ¡Bien! Ahora léelo en voz alta.',
  },
  {
    id: 'act-f',
    label: 'F — Hoy',
    patternHint: '오늘 + 저는 + actividad + 해요',
    chips: ['오늘', '저는', '수업을', '해요', '살아요', '서울에'],
    correct: ['오늘', '저는', '수업을', '해요'],
    teacherNote: '오늘 (hoy) va al principio como marcador de tiempo. El orden es: Tiempo + Sujeto + Objeto + Verbo.',
    successMsg: '좋아요! 이제 읽어 보세요. — ¡Bien! Ahora léelo en voz alta.',
  },
];

// ─── Teacher questions ────────────────────────────────────────────────────────

export const TEACHER_QUESTIONS: TeacherQuestion[] = [
  {
    id: 'q1',
    question: '이름이 뭐예요?',
    romanization: 'Ireumi mwoyeyo?',
    spanish: '¿Cómo te llamas?',
    answerPattern: '저는 ___예요/이에요.',
    answerPatternEs: 'Me llamo ___.',
  },
  {
    id: 'q2',
    question: '몇 살이에요?',
    romanization: 'Myeot sarieyo?',
    spanish: '¿Cuántos años tienes?',
    answerPattern: '저는 ___ 살이에요.',
    answerPatternEs: 'Tengo ___ años.',
  },
  {
    id: 'q3',
    question: '어디에 살아요?',
    romanization: 'Eodie sarayo?',
    spanish: '¿Dónde vives?',
    answerPattern: '저는 ___에 살아요.',
    answerPatternEs: 'Vivo en ___.',
  },
  {
    id: 'q4',
    question: '무슨 일을 해요?',
    romanization: 'Museun ireul haeyo?',
    spanish: '¿A qué te dedicas?',
    answerPattern: '저는 ___이에요/예요.',
    answerPatternEs: 'Soy ___.',
  },
  {
    id: 'q5',
    question: '뭐 좋아해요?',
    romanization: 'Mwo joahaeyo?',
    spanish: '¿Qué te gusta?',
    answerPattern: '저는 ___을/를 좋아해요.',
    answerPatternEs: 'Me gusta ___.',
  },
  {
    id: 'q6',
    question: '오늘 뭐 해요?',
    romanization: 'Oneul mwo haeyo?',
    spanish: '¿Qué haces hoy?',
    answerPattern: '오늘 저는 ___해요.',
    answerPatternEs: 'Hoy ___.',
  },
  {
    id: 'q7',
    question: '한국어를 공부해요?',
    romanization: 'Hangugeo-reul gongbuhaeyo?',
    spanish: '¿Estudias coreano?',
    answerPattern: '네, 한국어를 공부해요.',
    answerPatternEs: 'Sí, estudio coreano.',
  },
];

// ─── Final checklist ──────────────────────────────────────────────────────────

export const FINAL_CHECKLIST: ChecklistItem[] = [
  { id: 'c1', label: 'Saludo — 안녕하세요' },
  { id: 'c2', label: 'Nombre — 저는 ___예요/이에요' },
  { id: 'c3', label: 'Edad — 저는 ___ 살이에요' },
  { id: 'c4', label: 'País — 저는 ___ 사람이에요' },
  { id: 'c5', label: 'Ciudad — 저는 ___에 살아요' },
  { id: 'c6', label: 'Ocupación — 저는 ___이에요/예요' },
  { id: 'c7', label: 'Estudio — 저는 한국어를 공부해요' },
  { id: 'c8', label: 'Me gusta — 저는 ___을/를 좋아해요' },
  { id: 'c9', label: 'Hoy — 오늘 저는 ___해요' },
  { id: 'c10', label: 'Despedida — 감사합니다' },
];

// ─── Form options ─────────────────────────────────────────────────────────────

export const AGE_OPTIONS: AgeOption[] = [
  { value: '18', korean: '열여덟 살' },
  { value: '19', korean: '열아홉 살' },
  { value: '20', korean: '스무 살' },
  { value: '21', korean: '스물한 살' },
  { value: '22', korean: '스물두 살' },
  { value: '23', korean: '스물세 살' },
  { value: '24', korean: '스물네 살' },
  { value: '25', korean: '스물다섯 살' },
  { value: '26', korean: '스물여섯 살' },
  { value: '27', korean: '스물일곱 살' },
  { value: '28', korean: '스물여덟 살' },
  { value: '29', korean: '스물아홉 살' },
  { value: '30', korean: '서른 살' },
  { value: '31', korean: '서른한 살' },
  { value: '32', korean: '서른두 살' },
  { value: '33', korean: '서른세 살' },
  { value: '34', korean: '서른네 살' },
  { value: '35', korean: '서른다섯 살' },
  { value: '36', korean: '서른여섯 살' },
  { value: '37', korean: '서른일곱 살' },
  { value: '38', korean: '서른여덟 살' },
  { value: '39', korean: '서른아홉 살' },
  { value: '40', korean: '마흔 살' },
  { value: '41', korean: '마흔한 살' },
  { value: '42', korean: '마흔두 살' },
  { value: '43', korean: '마흔세 살' },
  { value: '44', korean: '마흔네 살' },
  { value: '45', korean: '마흔다섯 살' },
  { value: '46', korean: '마흔여섯 살' },
  { value: '47', korean: '마흔일곱 살' },
  { value: '48', korean: '마흔여덟 살' },
  { value: '49', korean: '마흔아홉 살' },
  { value: '50', korean: '쉰 살' },
];

export const COUNTRY_OPTIONS: SelectOption[] = [
  { value: '콜롬비아', korean: '콜롬비아', romanization: 'Kollombia', label: 'Colombia' },
  { value: '한국', korean: '한국', romanization: 'Hanguk', label: 'Corea' },
  { value: '미국', korean: '미국', romanization: 'Miguk', label: 'Estados Unidos' },
  { value: '멕시코', korean: '멕시코', romanization: 'Meksiko', label: 'México' },
  { value: '아르헨티나', korean: '아르헨티나', romanization: 'Areuhentina', label: 'Argentina' },
  { value: '베네수엘라', korean: '베네수엘라', romanization: 'Benesuela', label: 'Venezuela' },
  { value: '페루', korean: '페루', romanization: 'Peru', label: 'Perú' },
  { value: '칠레', korean: '칠레', romanization: 'Chile', label: 'Chile' },
  { value: '에콰도르', korean: '에콰도르', romanization: 'Ekkuadoru', label: 'Ecuador' },
  { value: '브라질', korean: '브라질', romanization: 'Beurajil', label: 'Brasil' },
  { value: '스페인', korean: '스페인', romanization: 'Seupein', label: 'España' },
];

export const CITY_OPTIONS: SelectOption[] = [
  { value: '부카라망가', korean: '부카라망가', romanization: 'Bukaramanga', label: 'Bucaramanga' },
  { value: '보고타', korean: '보고타', romanization: 'Bogota', label: 'Bogotá' },
  { value: '메데진', korean: '메데진', romanization: 'Medejin', label: 'Medellín' },
  { value: '칼리', korean: '칼리', romanization: 'Kalli', label: 'Cali' },
  { value: '서울', korean: '서울', romanization: 'Seoul', label: 'Seúl' },
  { value: '뉴욕', korean: '뉴욕', romanization: 'Nyuyok', label: 'Nueva York' },
  { value: '마드리드', korean: '마드리드', romanization: 'Madeurideu', label: 'Madrid' },
  { value: '멕시코시티', korean: '멕시코시티', romanization: 'Meksikosite', label: 'Ciudad de México' },
  { value: '부에노스아이레스', korean: '부에노스아이레스', romanization: 'Buenosaireseu', label: 'Buenos Aires' },
];

export const OCCUPATION_OPTIONS: SelectOption[] = [
  { value: '학생', korean: '학생', romanization: 'haksaeng', label: 'Estudiante' },
  { value: '선생님', korean: '선생님', romanization: 'seonsaengnim', label: 'Profesor/a' },
  { value: '의사', korean: '의사', romanization: 'uisa', label: 'Médico/a' },
  { value: '간호사', korean: '간호사', romanization: 'ganhosa', label: 'Enfermero/a' },
  { value: '엔지니어', korean: '엔지니어', romanization: 'enjinieo', label: 'Ingeniero/a' },
  { value: '디자이너', korean: '디자이너', romanization: 'dijaineo', label: 'Diseñador/a' },
  { value: '요리사', korean: '요리사', romanization: 'yorisa', label: 'Cocinero/a' },
  { value: '회사원', korean: '회사원', romanization: 'hoesawon', label: 'Empleado/a' },
  { value: '프리랜서', korean: '프리랜서', romanization: 'peurilaenseo', label: 'Freelancer' },
];

export const LIKES_OPTIONS: SelectOption[] = [
  { value: '음악', korean: '음악', romanization: 'eumak', label: 'música' },
  { value: '커피', korean: '커피', romanization: 'keopi', label: 'café' },
  { value: '책', korean: '책', romanization: 'chaek', label: 'libros' },
  { value: '영화', korean: '영화', romanization: 'yeonghwa', label: 'películas' },
  { value: '운동', korean: '운동', romanization: 'undong', label: 'ejercicio' },
  { value: '요리', korean: '요리', romanization: 'yori', label: 'cocinar' },
  { value: '여행', korean: '여행', romanization: 'yeohaeng', label: 'viajar' },
  { value: '사진', korean: '사진', romanization: 'sajin', label: 'fotografía' },
];

export const TODAY_OPTIONS: SelectOption[] = [
  { value: '한국어 수업을 해요', korean: '한국어 수업', romanization: 'hangugeo sueobeul haeyo', label: 'clase de coreano' },
  { value: '공부해요', korean: '공부', romanization: 'gongbuhaeyo', label: 'estudiar' },
  { value: '운동해요', korean: '운동', romanization: 'undonghaeyo', label: 'hacer ejercicio' },
  { value: '요리해요', korean: '요리', romanization: 'yorihaeyo', label: 'cocinar' },
  { value: '여행해요', korean: '여행', romanization: 'yeohaenghaeyo', label: 'viajar' },
  { value: '카페에 가요', korean: '카페', romanization: 'kape-e gayo', label: 'ir a la cafetería' },
];
