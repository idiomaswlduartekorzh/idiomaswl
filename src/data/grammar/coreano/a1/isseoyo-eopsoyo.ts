import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'isseoyo-eopsoyo',
  order: '05',
  color: '#059669',
  category: 'Verbos',
  level: 'A1',
  title: '있어요 y 없어요 en Coreano A1 — Existencia y Posesión',
  shortTitle: '있어요 / 없어요',
  metaTitle: '있어요 없어요 coreano A1 — existencia y posesión para principiantes',
  description:
    '있어요 (isseoyo) y 없어요 (eopsoyo) expresan existencia (hay/no hay), posesión (tengo/no tengo) y presencia física (estar/no estar) en coreano formal. Son dos de los verbos más frecuentes del coreano A1.',
  lead: '있어요 = "hay / tengo / está" | 없어요 = "no hay / no tengo / no está". Dos verbos que hacen el trabajo de tres verbos en español. Esenciales para describir tu entorno y hablar de posesiones.',
  outcomes: [
    'Usa 있어요 para expresar existencia, posesión y presencia',
    'Usa 없어요 para la negación correspondiente',
    'Combina con partículas 이/가 y 에 para oraciones completas',
  ],

  guide: {
    goal: 'Expresar lo que hay, lo que tienes y lo que está en un lugar usando 있어요 y 없어요.',
    model: '책이 있어요. (Hay un libro. / Tengo un libro.) / 시간이 없어요. (No hay tiempo. / No tengo tiempo.)',
    formula: '[Lugar] + 에 + [cosa] + 이/가 + 있어요/없어요',
    decisions: [
      '있어요 → existencia: 고양이가 있어요 (Hay un gato)',
      '있어요 → posesión: 돈이 있어요 (Tengo dinero)',
      '있어요 → presencia: 교실에 학생이 있어요 (En el aula hay estudiantes)',
      '없어요 → negación de todo lo anterior: 고양이가 없어요, 돈이 없어요',
      '에 marca el lugar: 방에 (en la habitación), 학교에 (en la escuela)',
    ],
    table: [
      ['Uso', 'Afirmativo', 'Negativo'],
      ['Existencia', '책이 있어요 (hay un libro)', '책이 없어요 (no hay libro)'],
      ['Posesión', '시간이 있어요 (tengo tiempo)', '시간이 없어요 (no tengo tiempo)'],
      ['Presencia en lugar', '방에 있어요 (está en la habitación)', '방에 없어요 (no está en la habitación)'],
    ],
    mistakes: [
      '"있어요" no es el verbo "ser/estar" de identificación — para eso usa 이에요/예요',
      'El lugar lleva 에, no 에서: 방에 있어요 ✓ | 방에서 있어요 ✗ (에서 es para acciones)',
      'La partícula del sujeto con 있어요 es 이/가, no 은/는: 책이 있어요 (énfasis) ✓',
    ],
  },
  seo: [
    {
      heading: '¿Qué significan 있어요 y 없어요?',
      paragraphs: [
        '있어요 (isseoyo) y 없어요 (eopsoyo) son las formas formales presentes de 있다 y 없다, los verbos de existencia del coreano. Expresan tres conceptos que en español usamos con verbos distintos: hay/no hay (existencia), tengo/no tengo (posesión) y está/no está (presencia en un lugar).',
        '이 선생님이 있어요 puede significar "hay un maestro", "tengo un maestro" o "el maestro está aquí" según el contexto. Esta flexibilidad hace que 있어요/없어요 sean dos de los verbos más frecuentes del coreano desde el nivel A1.',
      ],
    },
    {
      heading: 'Tres usos en uno: existencia, posesión y presencia',
      paragraphs: [
        'Existencia: 화장실이 있어요? (¿Hay un baño?) es la pregunta perfecta de viajero. Posesión: 펜이 있어요? (¿Tienes un bolígrafo?) es útil en el aula. Presencia: 선생님이 교실에 있어요 (El maestro está en el aula) describe ubicación de personas u objetos.',
        'En los tres casos la estructura es la misma: sujeto + 이/가 + 있어요. El contexto determina si es existencia, posesión o presencia. Para la presencia en un lugar específico, se añade 에 + lugar: 방에 있어요 (está en la habitación).',
      ],
    },
    {
      heading: 'La partícula de lugar 에 con 있어요',
      paragraphs: [
        'Para decir dónde está algo, el lugar lleva la partícula 에 (e): 학교에 (en la escuela), 집에 (en casa), 서울에 (en Seúl). La estructura completa es: [lugar]에 [cosa]이/가 있어요. 도서관에 책이 많이 있어요 (En la biblioteca hay muchos libros).',
        'Un error común es usar 에서 en lugar de 에 con 있어요. 에서 se usa para acciones (공원에서 운동해요 = hago ejercicio en el parque), mientras que 에 se usa para ubicación estática (공원에 있어요 = está en el parque).',
      ],
    },
    {
      heading: 'Preguntas con 있어요 y 없어요',
      paragraphs: [
        'Las preguntas se forman igual que las afirmaciones, solo cambia la entonación ascendente al final: 시간이 있어요? (¿Tienes tiempo?). Las respuestas cortas son simplemente 있어요 (sí, hay/tengo) o 없어요 (no, no hay/no tengo).',
        'En conversación informal (con amigos de edad similar o menor) se usa 있어 y 없어, sin el sufijo -요. En A1 es mejor mantener siempre la forma formal con -요 hasta ganar confianza con los niveles de formalidad del coreano.',
      ],
    },
  ],
  visual: {
    mode: 'existence-possession',
    teacherLens: 'El estudiante aprende que 있어요/없어요 cubren existencia, posesión y presencia. La partícula 에 marca el lugar.',
    graphicPrompt: '[Lugar]에 + [cosa]이/가 + 있어요/없어요',
    scene: [
      ['있어요', 'hay / tengo / está'],
      ['없어요', 'no hay / no tengo / no está'],
      ['[lugar]에 있어요', 'está en [lugar]'],
    ],
    learnerModes: ['visual: mapa de sala con objetos', 'analítico: tabla existencia/posesión/presencia', 'oral: describe tu cuarto en coreano'],
    practiceVerbs: ['Afirma', 'Niega', 'Pregunta', 'Ubica', 'Describe', 'Responde'],
    reviewFocus: ['있어요 vs 이에요', 'partícula 에 de lugar', '이/가 con 있어요', 'pregunta por entonación'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige 있어요 o 없어요 para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Buscando un café',
            lines: [['Turista', '근처에 카페가 ___? (¿Hay una cafetería cerca?)']],
            options: ['있어요', '없어요', '이에요', '아니에요'],
            answer: '있어요',
            explain: '있어요 expresa existencia. 카페가 있어요 = hay una cafetería.',
          },
          {
            scene: 'No tengo bolígrafo',
            lines: [['Estudiante', '죄송해요, 펜이 ___. (Lo siento, no tengo bolígrafo.)']],
            options: ['있어요', '없어요', '이에요', '예요'],
            answer: '없어요',
            explain: '없어요 = no hay / no tengo. 펜이 없어요.',
          },
          {
            scene: '¿Dónde está el maestro?',
            lines: [['Alumno', '선생님이 교실에 ___? (¿Está el maestro en el aula?)']],
            options: ['있어요', '없어요', '이에요', '해요'],
            answer: '있어요',
            explain: 'Presencia en un lugar: 교실에 있어요 = está en el aula.',
          },
          {
            scene: 'Descripción de habitación',
            lines: [['Hugo', '방에 침대가 ___. (En la habitación hay una cama.)']],
            options: ['있어요', '없어요', '이에요', '가요'],
            answer: '있어요',
            explain: '방에 침대가 있어요 = en la habitación hay una cama.',
          },
          {
            scene: 'No hay tiempo',
            lines: [['Vera', '오늘 시간이 ___. 내일 해요. (Hoy no tengo tiempo. Lo hago mañana.)']],
            options: ['있어요', '없어요', '이에요', '아니에요'],
            answer: '없어요',
            explain: '시간이 없어요 = no tengo tiempo.',
          },
          {
            scene: 'Preguntando por el baño',
            lines: [['Turista', '화장실이 ___? (¿Hay un baño / Dónde está el baño?)']],
            options: ['있어요', '없어요', '이에요', '해요'],
            answer: '있어요',
            explain: '화장실이 있어요? = ¿Hay un baño? Pregunta por existencia.',
          },
          {
            scene: 'Respuesta negativa',
            lines: [['Estudiante', '숙제가 있어요?'], ['Hugo', '오늘은 ___. (Hoy no [hay tarea].)']],
            options: ['있어요', '없어요', '이에요', '아니에요'],
            answer: '없어요',
            explain: '오늘은 없어요 = hoy no hay. Respuesta negativa con 없어요.',
          },
          {
            scene: '¿Tienes hermanos?',
            lines: [['Compañero', '형제가 ___? (¿Tienes hermanos?)']],
            options: ['있어요', '없어요', '이에요', '예요'],
            answer: '있어요',
            explain: 'La pregunta usa 있어요? porque pregunta por posesión (¿tienes hermanos?).',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Existencia y negación en diálogo',
        tag: '2 espacios',
        intro: 'Completa los dos espacios del diálogo con 있어요 o 없어요.',
        type: 'dual',
        items: [
          {
            scene: 'En clase',
            lines: [
 ['Alumna', '선생님, 오늘 숙제가 [[0]]? (Profesor, ¿hay tarea hoy?)'],
 ['Hugo', '네, [[1]]. 책 3쪽이에요. (Sí, la hay. Son 3 páginas del libro.)'],
 ],
            blanks: [
              { options: ['있어요', '없어요'], answer: '있어요', explain: 'Pregunta por existencia de tarea: 숙제가 있어요?' },
              { options: ['있어요', '없어요'], answer: '있어요', explain: 'Respuesta afirmativa: sí hay. 있어요.' },
            ],
          },
          {
            scene: 'Buscando llaves',
            lines: [
 ['Lina', '가방에 열쇠가 [[0]]? (¿Hay llaves en la mochila?)'],
 ['Carlos', '아니요, [[1]]. 책상에 있어요. (No, no hay. Están en el escritorio.)'],
 ],
            blanks: [
              { options: ['있어요', '없어요'], answer: '있어요', explain: 'Pregunta: 가방에 열쇠가 있어요?' },
              { options: ['있어요', '없어요'], answer: '없어요', explain: 'Negativa: 없어요 = no hay / no están.' },
            ],
          },
          {
            scene: 'En la biblioteca',
            lines: [
 ['Estudiante', '도서관에 컴퓨터가 [[0]]? (¿Hay computadores en la biblioteca?)'],
 ['Bibliotecaria', '네, [[1]]. 이쪽으로 오세요. (Sí, los hay. Venga por aquí.)'],
 ],
            blanks: [
              { options: ['있어요', '없어요'], answer: '있어요', explain: 'Pregunta de existencia en lugar: 도서관에 있어요?' },
              { options: ['있어요', '없어요'], answer: '있어요', explain: 'Afirmativa: sí hay. 있어요.' },
            ],
          },
          {
            scene: 'Tiempo libre',
            lines: [
 ['Ana', '이번 주말에 시간이 [[0]]? (¿Tienes tiempo este fin de semana?)'],
 ['Marco', '토요일은 [[1]]. 일요일은 있어요. (El sábado no. El domingo sí.)'],
 ],
            blanks: [
              { options: ['있어요', '없어요'], answer: '있어요', explain: 'Pregunta de posesión (tiempo): 시간이 있어요?' },
              { options: ['있어요', '없어요'], answer: '없어요', explain: 'El sábado no tengo: 토요일은 없어요.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa la descripción del apartamento con 있어요 o 없어요.',
        type: 'guidedText',
        scene: 'Descripción de un apartamento en Seúl',
        text: '제 방에 침대가 [[0]]. 책상도 [[1]]. 그런데 TV가 [[2]] — 저는 TV를 안 봐요. 창문이 [[3]], 그래서 밝아요. 화장실이 방 안에 [[4]]. 주방에 냉장고가 [[5]].',
        blanks: [
          { options: ['있어요', '없어요'], answer: '있어요', explain: '방에 침대가 있어요 = en mi cuarto hay una cama.' },
          { options: ['있어요', '없어요'], answer: '있어요', explain: '책상도 있어요 = también hay un escritorio.' },
          { options: ['있어요', '없어요'], answer: '없어요', explain: 'TV가 없어요 = no hay TV. (No la uso.)' },
          { options: ['있어요', '없어요'], answer: '있어요', explain: '창문이 있어요 = hay ventana, por eso es luminoso.' },
          { options: ['있어요', '없어요'], answer: '있어요', explain: '화장실이 방 안에 있어요 = el baño está dentro del cuarto.' },
          { options: ['있어요', '없어요'], answer: '있어요', explain: '주방에 냉장고가 있어요 = en la cocina hay nevera.' },
        ],
      },
      {
        id: 'l4',
        title: 'Texto libre',
        tag: 'Sin opciones',
        intro: 'Escribe 있어요 o 없어요 sin opciones.',
        type: 'freeText',
        scene: 'WeLearn — descripción de la academia',
        text: '위런 학원에 선생님이 두 명 [[0]]. 데이비드 선생님과 잔나 선생님이에요. 교실이 [[1]]. 학생들이 많이 [[2]]. 하지만 주차장이 [[3]] — 학원이 시내에 있어요. 온라인 수업도 [[4]]!',
        blanks: [
          { answer: '있어요', explain: '선생님이 두 명 있어요 = hay dos maestros.' },
          { answer: '있어요', explain: '교실이 있어요 = hay aulas.' },
          { answer: '있어요', explain: '학생들이 많이 있어요 = hay muchos estudiantes.' },
          { answer: '없어요', explain: '주차장이 없어요 = no hay estacionamiento.' },
          { answer: '있어요', explain: '온라인 수업도 있어요 = también hay clases online.' },
        ],
      },
      {
        id: 'l5',
        title: 'Construyendo frases',
        tag: 'Producción',
        intro: 'Escribe la frase completa en coreano con 있어요 o 없어요.',
        type: 'write',
        items: [
          {
            scene: 'Hay un libro',
            prompt: '책상에 책이 있어요. (traduce: En el escritorio hay un libro.)',
            answer: '책상에 책이 있어요.',
            accepted: ['책상에 책이 있어요', '책상에 책이 있어요.'],
            explain: '[lugar]에 + [cosa]이/가 + 있어요.',
          },
          {
            scene: 'No hay tiempo',
            prompt: 'Escribe: 시간이 없어요. (No tengo tiempo.)',
            answer: '시간이 없어요.',
            accepted: ['시간이 없어요', '시간이 없어요.'],
            explain: '시간이 없어요 = no tengo tiempo / no hay tiempo.',
          },
          {
            scene: '¿Hay café?',
            prompt: 'Pregunta: 커피가 있어요? (¿Hay café?)',
            answer: '커피가 있어요?',
            accepted: ['커피가 있어요?', '커피가 있어요'],
            explain: 'Pregunta: misma estructura + entonación ascendente.',
          },
          {
            scene: 'El maestro está en el aula',
            prompt: 'Escribe: 선생님이 교실에 있어요. (El maestro está en el aula.)',
            answer: '선생님이 교실에 있어요.',
            accepted: ['선생님이 교실에 있어요', '선생님이 교실에 있어요.'],
            explain: '선생님이 + 교실에 + 있어요. Presencia en lugar.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión: describe tu espacio',
        tag: 'Reto final',
        intro: 'Describe tu cuarto o tu mochila usando 있어요 y 없어요 en coreano.',
        type: 'write',
        items: [
          {
            scene: 'Tu cuarto',
            prompt: '내 방에 ___ 있어요. 하지만 ___ 없어요. (En mi cuarto hay ___. Pero no hay ___.) Escribe con objetos reales.',
            answer: '내 방에 침대가 있어요. 하지만 TV가 없어요.',
            accepted: [
              '내 방에 침대가 있어요 하지만 tv가 없어요',
              '내 방에 책상이 있어요 하지만 냉장고가 없어요',
              '내 방에 컴퓨터가 있어요 하지만 창문이 없어요',
            ],
            explain: '[장소]에 [것]이/가 있어요. 하지만 [것]이/가 없어요.',
          },
          {
            scene: 'Tu mochila',
            prompt: '가방에 뭐가 있어요? 뭐가 없어요? Escribe dos frases.',
            answer: '가방에 책이 있어요. 펜이 없어요.',
            accepted: ['가방에 책이 있어요 펜이 없어요', '가방에 노트가 있어요 물이 없어요', '가방에 핸드폰이 있어요 지갑이 없어요'],
            explain: '가방에 [것]이/가 있어요. [것]이/가 없어요.',
          },
          {
            scene: 'Pregunta a un amigo',
            prompt: 'Pregunta por algo en la mochila de un amigo: 가방에 ___ 있어요?',
            answer: '가방에 펜이 있어요?',
            accepted: ['가방에 펜이 있어요?', '가방에 책이 있어요?', '가방에 물이 있어요?', '가방에 핸드폰이 있어요?'],
            explain: 'Pregunta de existencia en lugar: [장소]에 [것]이/가 있어요?',
          },
        ],
      },
    ],
  },
}

export default topic
