import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'marcador-lugar-e',
  order: '08',
  color: '#c60c30',
  category: 'Partículas',
  level: 'A1',
  title: 'Partícula de Lugar 에 (e) en Coreano A1 — Destino y Tiempo',
  shortTitle: 'Lugar 에 (destino)',
  metaTitle: 'Partícula 에 coreano A1 — destino y tiempo en coreano para principiantes',
  description:
    'La partícula 에 (e) marca destino (a/hacia), ubicación de existencia y tiempo (en/el). Se usa con verbos de movimiento como 가다 (ir) y 오다 (venir), con 있다 para ubicación, y con expresiones de tiempo. Es diferente de 에서 que marca el lugar donde ocurre una acción.',
  lead: '에 = "a / en / el" — para DESTINOS (학교에 가요 = voy a la escuela), UBICACIÓN (집에 있어요 = estoy en casa) y TIEMPO (월요일에 = el lunes). Diferente de 에서 (lugar de acción).',
  outcomes: [
    'Usa 에 para expresar destino con verbos de movimiento',
    'Usa 에 con 있어요/없어요 para ubicación',
    'Usa 에 para expresar tiempo (día, hora)',
  ],

  guide: {
    goal: 'Usar la partícula 에 para destino, ubicación estática y tiempo en coreano A1.',
    model: '학교에 가요. (Voy a la escuela.) / 집에 있어요. (Estoy en casa.) / 월요일에 해요. (Lo hago el lunes.)',
    formula: '[Lugar]에 + verbo de movimiento | [Lugar]에 + 있어요/없어요 | [Tiempo]에 + verbo',
    decisions: [
      'Destino + movimiento: 학교에 가요(voy), 서울에 와요(vengo), 집에 돌아가요(regreso)',
      'Ubicación estática: 방에 있어요(estoy en la habitación), 학교에 없어요(no está en la escuela)',
      'Tiempo específico: 월요일에(el lunes), 3시에(a las 3), 아침에(por la mañana)',
      'NO se usa 에 con verbos de acción en un lugar: 카페에서 공부해요 ✓ (no 카페에 공부해요)',
      'Diferencia clave: 에 = destino/ubicación estática | 에서 = lugar de acción',
    ],
    table: [
      ['Uso de 에', 'Ejemplo', 'Traducción'],
      ['Destino (ir/venir)', '학교에 가요', 'Voy a la escuela'],
      ['Ubicación (estar)', '집에 있어요', 'Estoy en casa'],
      ['Tiempo', '월요일에 공부해요', 'Estudio el lunes'],
      ['Hora', '오후 두 시에 만나요', 'Nos vemos a las 2 de la tarde'],
    ],
    mistakes: [
      '"카페에 공부해요" ❌ — acción en lugar → 에서: "카페에서 공부해요" ✓',
      '"학교에서 가요" ❌ — destino usa 에: "학교에 가요" ✓ (에서 = desde donde te mueves)',
      '"월요일에서" ❌ — el tiempo siempre usa 에, nunca 에서: "월요일에" ✓',
    ],
  },

  seo: [
    {
      heading: '¿Qué hace la partícula 에 en coreano?',
      paragraphs: [
        'La partícula 에 (e) tiene tres usos principales en coreano A1: marcar el destino de un movimiento (학교에 가요 = voy a la escuela), marcar dónde existe algo (집에 있어요 = estoy en casa), y marcar el tiempo específico en que ocurre algo (월요일에 = el lunes, 3시에 = a las 3). No cambia su forma — siempre es 에.',
        'Para hispanohablantes, 에 se puede asociar a "a" cuando indica destino ("voy a la escuela") y a "en" cuando indica ubicación o tiempo ("en casa", "en lunes"). Pero la diferencia más importante es que 에 NO se usa cuando la acción ocurre en un lugar — para eso existe 에서.',
      ],
    },
    {
      heading: '¿Cómo se usa 에 con verbos de movimiento en coreano?',
      paragraphs: [
        'Cuando te mueves a un lugar, ese lugar lleva 에: 학교에 가요 (voy a la escuela), 서울에 와요 (vengo a Seúl), 집에 돌아가요 (regreso a casa). Los verbos de movimiento más comunes con 에: 가다 (ir), 오다 (venir), 돌아가다 (regresar), 들어가다 (entrar).',
        'En conversación, 에 a veces se combina con 서 para formar 에서 con sentido de "desde": 학교에서 왔어요 = vine desde la escuela. Pero el uso básico de 에 con verbos de movimiento es para el DESTINO.',
      ],
    },
    {
      heading: '¿Cómo marca 에 la ubicación con 있어요/없어요?',
      paragraphs: [
        'Cuando quieres decir dónde está alguien o algo (sin implicar movimiento), usa 에 + 있어요/없어요: 선생님이 교실에 있어요 (el maestro está en el aula), 책이 책상에 있어요 (el libro está en el escritorio), 저는 집에 없어요 (no estoy en casa).',
        'Este uso de 에 con 있다 es diferente a 에서 + verbo de acción. La diferencia: 에 indica presencia estática (está, se encuentra); 에서 indica dónde se hace algo activamente (estudia, trabaja, come).',
      ],
    },
    {
      heading: '에 con expresiones de tiempo',
      paragraphs: [
        'Para indicar cuándo ocurre algo, el tiempo lleva 에: 월요일에 (el lunes), 3월에 (en marzo), 오전 9시에 (a las 9 de la mañana), 아침에 (por la mañana), 봄에 (en primavera). Nota: 오늘(hoy), 내일(mañana), 어제(ayer) NO llevan 에 — van solos como adverbios.',
        'El uso temporal de 에 equivale a "el", "en" o "a las" en español. Es muy regular: prácticamente cualquier expresión de tiempo específica puede llevar 에.',
      ],
    },
  ],

  visual: {
    mode: 'particles',
    teacherLens: 'Partícula 에 en tres usos: destino, ubicación estática y tiempo.',
    graphicPrompt: 'Mapa con flechas de destino (가요) y ubicación (있어요) con 에, más calendario para tiempo.',
    scene: [
      ['학교에 가요', 'Voy a la escuela. (destino + movimiento)'],
      ['집에 있어요', 'Estoy en casa. (ubicación estática)'],
      ['서울에 와요', 'Vengo a Seúl. (destino + movimiento)'],
      ['월요일에 공부해요', 'Estudio el lunes. (tiempo)'],
      ['오후 두 시에 만나요', 'Nos vemos a las 2 de la tarde. (hora)'],
      ['방에 없어요', 'No está en la habitación. (ubicación negativa)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['에 destino', '에 ubicación con 있어요', '에 tiempo', 'diferencia 에 vs 에서'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Nivel 1 — Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Identifica el uso correcto de 에 en cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Yendo a clase',
            lines: [['Carlos', '저는 학교___ 가요. (Voy a la escuela.)']],
            options: ['에', '에서', '를', '이'],
            answer: '에',
            explain: '학교에 가요 = voy a la escuela. Destino + movimiento → 에.',
          },
          {
            scene: 'Ubicación',
            lines: [['Ana', '선생님이 교실___ 있어요. (El maestro está en el aula.)']],
            options: ['에', '에서', '를', '은'],
            answer: '에',
            explain: '교실에 있어요 = está en el aula. Ubicación estática con 있어요 → 에.',
          },
          {
            scene: 'Acción en lugar',
            lines: [['Tomás', '저는 카페___ 공부해요. (Estudio en el café.)']],
            options: ['에서', '에', '를', '이'],
            answer: '에서',
            explain: 'Estudiar es una acción en un lugar → 에서. 카페에서 공부해요.',
          },
          {
            scene: 'Tiempo',
            lines: [['Lina', '저는 월요일___ 한국어를 공부해요. (Estudio coreano el lunes.)']],
            options: ['에', '에서', '를', '은'],
            answer: '에',
            explain: 'Tiempo específico → 에. 월요일에 공부해요.',
          },
          {
            scene: 'Hora',
            lines: [['Marco', '오후 두 시___ 만나요. (Nos vemos a las 2 de la tarde.)']],
            options: ['에', '에서', '에게', '로'],
            answer: '에',
            explain: 'Hora específica → 에. 두 시에 만나요.',
          },
          {
            scene: '¿에 o 에서?',
            lines: [['Sofia', '저는 도서관___ 있어요. (Estoy en la biblioteca.)']],
            options: ['에', '에서', '를', '가'],
            answer: '에',
            explain: '도서관에 있어요 = estoy en la biblioteca. Existencia → 에 (no 에서).',
          },
          {
            scene: 'Destino',
            lines: [['Iris', '집___ 가요? (¿Vas a casa?)']],
            options: ['에', '에서', '를', '이'],
            answer: '에',
            explain: '집에 가요 = voy a casa. Destino → 에.',
          },
          {
            scene: 'Regla tiempo',
            lines: [['Tomás', '오늘___ 수업이 있어요. ¿Necesita 에?']],
            options: ['오늘 NO lleva 에', 'lleva 에', 'lleva 에서', 'lleva 를'],
            answer: '오늘 NO lleva 에',
            explain: '오늘(hoy), 내일(mañana), 어제(ayer) son adverbios — NO llevan 에. Solo tiempos específicos.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Nivel 2 — Lugar y verbo',
        tag: '2 espacios',
        intro: 'Completa el lugar con 에 y elige el verbo correcto.',
        type: 'dual',
        items: [
          {
            scene: 'Después de clase',
            lines: [['Carlos', '오늘 집[[0]] [[1]]. (Hoy voy a casa.)']],
            blanks: [
              { options: ['에', '에서', '를', '이'], answer: '에', explain: 'Destino 집 → 에.' },
              { options: ['가요', '있어요', '공부해요', '먹어요'], answer: '가요', explain: '가다 = ir. 집에 가요.' },
            ],
          },
          {
            scene: 'Encontrando al profesor',
            lines: [['Ana', '선생님이 지금 사무실[[0]] [[1]]. (El maestro está ahora en la oficina.)']],
            blanks: [
              { options: ['에', '에서', '를', '가'], answer: '에', explain: 'Ubicación con 있어요 → 에.' },
              { options: ['있어요', '가요', '공부해요', '해요'], answer: '있어요', explain: '있어요 = está. 사무실에 있어요.' },
            ],
          },
          {
            scene: 'Planeando la semana',
            lines: [['Sofia', '저는 토요일[[0]] 친구를 [[1]]. (El sábado veo a un amigo.)']],
            blanks: [
              { options: ['에', '에서', '를', '은'], answer: '에', explain: 'Tiempo: 토요일 + 에.' },
              { options: ['만나요', '가요', '있어요', '먹어요'], answer: '만나요', explain: '만나다 = encontrar/ver. 토요일에 만나요.' },
            ],
          },
          {
            scene: 'No está en casa',
            lines: [
 ['Marco', '엄마가 집[[0]] [[1]]? (¿Está mamá en casa?)'],
 ['Lina', '아니요, 지금 없어요. (No, ahora no está.)'],
 ],
            blanks: [
              { options: ['에', '에서', '가', '를'], answer: '에', explain: 'Ubicación (existencia) → 에.' },
              { options: ['있어요', '없어요', '가요', '해요'], answer: '있어요', explain: 'Pregunta de existencia: 집에 있어요?' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa con 에 o 에서 según corresponda.',
        type: 'guidedText',
        scene: 'La semana de Tomás en WeLearn',
        text: '저는 월요일[[0]] 학교에 가요. 교실[[1]] 있어요. 점심에 카페[[2]] 밥을 먹어요. 오후 3시[[3]] 수업이 있어요. 저녁에 집[[4]] 가요. 집[[5]] 공부해요.',
        blanks: [
          { options: ['에', '에서'], answer: '에', explain: '월요일에 = el lunes. Tiempo específico → 에.' },
          { options: ['에', '에서'], answer: '에', explain: '교실에 있어요. Ubicación estática → 에.' },
          { options: ['에서', '에'], answer: '에서', explain: '카페에서 먹어요. Acción en lugar → 에서.' },
          { options: ['에', '에서'], answer: '에', explain: '3시에 = a las 3. Hora → 에.' },
          { options: ['에', '에서'], answer: '에', explain: '집에 가요. Destino → 에.' },
          { options: ['에서', '에'], answer: '에서', explain: '집에서 공부해요. Acción (estudiar) en lugar → 에서.' },
        ],
      },
      {
        id: 'l4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe 에 o 에서 sin opciones.',
        type: 'freeText',
        scene: 'Oraciones sobre la rutina de la academia',
        text: '저는 학교[[0]] 가요. / 선생님이 교실[[1]] 있어요. / 저는 도서관[[2]] 공부해요. / 수업은 2시[[3]] 시작해요. / 저녁에 집[[4]] 돌아가요.',
        blanks: [
          { answer: '에', accepted: ['에'], explain: '학교에 가요. Destino → 에.' },
          { answer: '에', accepted: ['에'], explain: '교실에 있어요. Ubicación con 있어요 → 에.' },
          { answer: '에서', accepted: ['에서'], explain: '도서관에서 공부해요. Acción → 에서.' },
          { answer: '에', accepted: ['에'], explain: '2시에 시작해요. Hora → 에.' },
          { answer: '에', accepted: ['에'], explain: '집에 돌아가요. Destino → 에.' },
        ],
      },
      {
        id: 'l5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones con 에 en contextos de destino y tiempo.',
        type: 'write',
        items: [
          {
            scene: 'Yendo a la escuela',
            prompt: 'Di "Voy a la escuela" en coreano (학교=escuela, 가다=ir).',
            answer: '저는 학교에 가요.',
            accepted: ['학교에 가요', '저는 학교에 가요'],
            explain: 'Destino + movimiento: 학교에 가요.',
          },
          {
            scene: 'Estoy en casa',
            prompt: 'Di "Estoy en casa" en coreano (집=casa, 있다=estar).',
            answer: '저는 집에 있어요.',
            accepted: ['집에 있어요', '저는 집에 있어요'],
            explain: 'Ubicación estática: 집에 있어요.',
          },
          {
            scene: 'Planeando el día',
            prompt: 'Di "El martes estudio coreano" (화요일=martes, 한국어=coreano, 공부하다=estudiar).',
            answer: '화요일에 한국어를 공부해요.',
            accepted: ['화요일에 한국어를 공부해요', '화요일에 공부해요'],
            explain: 'Tiempo: 화요일에. Objeto: 한국어를. Verbo: 공부해요.',
          },
          {
            scene: 'Hora de la clase',
            prompt: 'Di "La clase es a las 10" (수업=clase, 10시=10 h, 있다=haber).',
            answer: '수업이 열 시에 있어요.',
            accepted: ['열 시에 있어요', '10시에 있어요', '수업이 열 시에 있어요'],
            explain: '열 시에 = a las 10 (horas nativas). Tiempo → 에.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Describe tus planes de la semana usando 에 para destinos y tiempos.',
        type: 'write',
        items: [
          {
            scene: 'Adónde voy',
            prompt: 'Di adónde vas esta semana: 이번 주에 어디 가요?',
            answer: '이번 주에 학교에 가요.',
            accepted: ['에 가요', '에 와요'],
            explain: 'Destino → 에. 이번 주에 = esta semana (tiempo → 에).',
          },
          {
            scene: 'Cuándo lo haces',
            prompt: 'Di cuándo estudias: ___요일에 공부해요.',
            answer: '월요일에 공부해요.',
            accepted: ['요일에 공부해요', '에 공부해요'],
            explain: 'Día de la semana + 에 = el [día]. Tiempo → 에.',
          },
          {
            scene: 'Dónde estás',
            prompt: 'Di dónde estás ahora: 지금 ___에 있어요.',
            answer: '지금 집에 있어요.',
            accepted: ['에 있어요'],
            explain: 'Ubicación con 있어요 → 에. 지금 = ahora.',
          },
        ],
      },
    ],
  },
}

export default topic
