import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'querer-goshipda',
  order: '15',
  color: '#c60c30',
  category: 'Verbos',
  level: 'A1',
  title: 'Querer en Coreano A1 — 고 싶어요 (go sipeoyo)',
  shortTitle: 'Deseos 고 싶어요',
  metaTitle: 'Querer coreano A1 — 고 싶어요 deseos coreano principiantes',
  description:
    '고 싶어요 (go sipeoyo) es la estructura para expresar deseos personales en coreano. Se forma añadiendo 고 싶어요 a la raíz verbal. Solo expresa los deseos PROPIOS del hablante — para preguntar al otro se usa la forma 고 싶어요? con entonación interrogativa.',
  lead: 'Raíz verbal + 고 싶어요 = quiero [hacer algo]. 먹고 싶어요(quiero comer), 가고 싶어요(quiero ir), 배우고 싶어요(quiero aprender). Negativo: 고 싶지 않아요. Pregunta: 뭐 하고 싶어요?',
  outcomes: [
    'Expresa deseos propios con raíz + 고 싶어요',
    'Niega deseos con 고 싶지 않아요',
    'Pregunta sobre los deseos de alguien con 고 싶어요?',
  ],

  guide: {
    goal: 'Expresar deseos personales usando la estructura 고 싶어요 con verbos coreanos comunes.',
    model: '한국에 가고 싶어요. (Quiero ir a Corea.) / 뭐 먹고 싶어요? (¿Qué quieres comer?)',
    formula: 'Raíz verbal + 고 싶어요 | Negativo: 고 싶지 않아요 | Pregunta: 고 싶어요? (↑)',
    decisions: [
      'Quita -다 del infinitivo para obtener la raíz: 가다→가, 먹다→먹, 배우다→배우',
      'Añade 고 싶어요 directamente a la raíz sin cambios: 가+고 싶어요=가고 싶어요',
      'La vocal de la raíz NO importa aquí — no hay armonía vocálica con 고 싶어요',
      'Negativo: raíz + 고 싶지 않아요: 가고 싶지 않아요 (no quiero ir)',
      '고 싶어요 solo expresa deseos PROPIOS — para "él quiere" se usa 고 싶어해요',
      '¿Qué quieres hacer?: 뭐 하고 싶어요? / ¿A dónde quieres ir?: 어디 가고 싶어요?',
    ],
    table: [
      ['Verbo', 'Raíz + 고 싶어요', 'Significado'],
      ['가다 (ir)', '가고 싶어요', 'Quiero ir'],
      ['먹다 (comer)', '먹고 싶어요', 'Quiero comer'],
      ['배우다 (aprender)', '배우고 싶어요', 'Quiero aprender'],
      ['마시다 (beber)', '마시고 싶어요', 'Quiero beber'],
      ['보다 (ver)', '보고 싶어요', 'Quiero ver / Te echo de menos'],
      ['하다 (hacer)', '하고 싶어요', 'Quiero hacer'],
    ],
    mistakes: [
      '"가고 싶어요" para "él quiere ir" ❌ — para tercera persona: "가고 싶어해요" ✓',
      '"먹어고 싶어요" ❌ — 고 싶어요 va a la RAÍZ, no a la forma presente: "먹고 싶어요" ✓',
      '"가고 싶어요 안" ❌ — negativo con forma larga: "가고 싶지 않아요" ✓',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se expresa el deseo en coreano (고 싶어요)?',
      paragraphs: [
        '고 싶어요 (go sipeoyo) es una de las estructuras más útiles del coreano A1. Permite expresar lo que quieres hacer — comer, ir, aprender, descansar — de forma natural y cotidiana. En español necesitamos el verbo "querer" + infinitivo. En coreano necesitamos la raíz del verbo + 고 싶어요.',
        'Lo más práctico de esta estructura es su regularidad: no hay excepciones vocálicas como en el presente 해요체. Simplemente: raíz + 고 싶어요. 가다(ir)→가고 싶어요, 먹다(comer)→먹고 싶어요, 하다(hacer)→하고 싶어요.',
      ],
    },
    {
      heading: '¿Por qué 고 싶어요 cambia según la persona en coreano?',
      paragraphs: [
        'En coreano, 고 싶어요 es exclusivo del hablante. Si quieres decir que otra persona quiere algo, usas 고 싶어해요: 친구가 가고 싶어해요(mi amigo quiere ir). Este matiz es único del coreano — el hablante solo puede conocer sus propios deseos directamente; los deseos ajenos se infieren y se expresan de forma distinta.',
        'En A1, lo fundamental es manejar la primera persona. La distinción yo/él-ella la consolidarás en niveles más avanzados.',
      ],
    },
    {
      heading: '¿Cómo se pregunta y se niega con 고 싶어요?',
      paragraphs: [
        'Para preguntar: sube la entonación al final — 뭐 먹고 싶어요? (¿Qué quieres comer?), 어디 가고 싶어요? (¿A dónde quieres ir?), 뭐 하고 싶어요? (¿Qué quieres hacer?). Son preguntas muy naturales para conversación cotidiana.',
        'Para negar: raíz + 고 싶지 않아요(go sipji anayo). 가고 싶지 않아요(no quiero ir), 먹고 싶지 않아요(no quiero comer). También existe la forma breve 고 싶지 않아(sin 요) que es más informal.',
      ],
    },
    {
      heading: '보고 싶어요: te echo de menos',
      paragraphs: [
        'Un uso especial muy frecuente: 보고 싶어요 literalmente significa "quiero verte" pero en la práctica significa "te echo de menos". Si alguien estuvo ausente o quieres expresar que extrañas a alguien: 보고 싶어요. Esta expresión es muy común en canciones de K-pop y dramas.',
        '친구가 보고 싶어요(echo de menos a mi amigo), 한국이 보고 싶어요(echo de menos Corea). Para una persona: [nombre]이/가 보고 싶어요.',
      ],
    },
  ],

  visual: {
    mode: 'desire',
    teacherLens: 'Estructura 고 싶어요: raíz+고 싶어요. Solo yo. Negativo: 고 싶지 않아요. Pregunta con entonación ↑.',
    graphicPrompt: 'Burbuja de pensamiento con deseos del estudiante: "저는 ___ 고 싶어요!" con múltiples verbos.',
    scene: [
      ['가고 싶어요', 'Quiero ir. (가다→가+고 싶어요)'],
      ['먹고 싶어요', 'Quiero comer. (먹다→먹+고 싶어요)'],
      ['배우고 싶어요', 'Quiero aprender. (배우다→배우+고 싶어요)'],
      ['보고 싶어요', 'Te echo de menos. / Quiero verte.'],
      ['가고 싶지 않아요', 'No quiero ir. (negativo)'],
      ['뭐 하고 싶어요?', '¿Qué quieres hacer? (pregunta)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['raíz + 고 싶어요', 'negativo 고 싶지 않아요', 'solo expresa deseos propios'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Nivel 1 — Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de 고 싶어요.',
        type: 'choice',
        items: [
          {
            scene: 'Hambre',
            lines: [['Carlos', '배가 고파요. 피자를 ___. (Tengo hambre. Quiero comer pizza.)']],
            options: ['먹고 싶어요', '먹어고 싶어요', '먹싶어요', '먹고싶'],
            answer: '먹고 싶어요',
            explain: '먹다 → raíz 먹 + 고 싶어요 = 먹고 싶어요. La raíz va sin cambios.',
          },
          {
            scene: 'Sueño de viaje',
            lines: [['Ana', '저는 한국에 ___. (Quiero ir a Corea.)']],
            options: ['가고 싶어요', '가요고 싶어요', '가싶어요', '가고싶어요'],
            answer: '가고 싶어요',
            explain: '가다 → 가 + 고 싶어요 = 가고 싶어요. Sin espacio: también se escribe 가고 싶어요.',
          },
          {
            scene: 'Negando',
            lines: [['Sofia', '지금 공부하___. (Ahora no quiero estudiar.)']],
            options: ['고 싶지 않아요', '고 싶 안 해요', '지 않고 싶어요', '싶지 않아요'],
            answer: '고 싶지 않아요',
            explain: 'Negativo: raíz + 고 싶지 않아요. 공부하+고 싶지 않아요.',
          },
          {
            scene: 'Preguntando',
            lines: [['Hugo', '뭐 ___? (¿Qué quieres hacer?)']],
            options: ['하고 싶어요', '해고 싶어요', '하싶어요', '하고싶어'],
            answer: '하고 싶어요',
            explain: '하다 → 하 + 고 싶어요. 뭐 하고 싶어요? = ¿Qué quieres hacer?',
          },
          {
            scene: 'Bebida',
            lines: [['Lina', '차를 ___. (Quiero beber té.)']],
            options: ['마시고 싶어요', '마셔고 싶어요', '마시싶어요', '마시요'],
            answer: '마시고 싶어요',
            explain: '마시다 → 마시 + 고 싶어요. No hay armonía vocálica aquí.',
          },
          {
            scene: 'Echo de menos',
            lines: [['Marco', '엄마가 ___. (Echo de menos a mi mamá.)']],
            options: ['보고 싶어요', '보아고 싶어요', '봐고 싶어요', '보싶어요'],
            answer: '보고 싶어요',
            explain: '보다 → 보 + 고 싶어요 = 보고 싶어요. Significa "te echo de menos".',
          },
          {
            scene: 'Aprender coreano',
            lines: [['Vera', '저는 한국어를 ___. (Quiero aprender coreano.)']],
            options: ['배우고 싶어요', '배워고 싶어요', '배우싶어요', '배우고싶'],
            answer: '배우고 싶어요',
            explain: '배우다 → 배우 + 고 싶어요. No cambia la raíz.',
          },
          {
            scene: '¿Quién quiere?',
            lines: [['Carlos', '친구가 가고 ___. (Mi amigo quiere ir.) — ¿forma correcta para "él quiere"?']],
            options: ['싶어해요', '싶어요', '싶해요', '싶아요'],
            answer: '싶어해요',
            explain: 'Para 3ª persona: 가고 싶어해요. 싶어요 solo expresa deseo propio (1ª persona).',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Nivel 2 — Diálogo con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los diálogos con la estructura 고 싶어요 correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Planificando el fin de semana',
            lines: [
 ['Hugo', '주말에 뭐 [[0]] ? (¿Qué quieres hacer el fin de semana?)'],
 ['Carlos', '한국 드라마를 [[1]] . (Quiero ver un drama coreano.)'],
 ],
            blanks: [
              { options: ['하고 싶어요', '하요고 싶어요', '해싶어요', '하고싶어요'], answer: '하고 싶어요', explain: '하다 → 하+고 싶어요. 뭐 하고 싶어요? = ¿Qué quieres hacer?' },
              { options: ['보고 싶어요', '봐고 싶어요', '보아고 싶어요', '보싶어요'], answer: '보고 싶어요', explain: '보다 → 보+고 싶어요. 드라마를 보고 싶어요 = quiero ver un drama.' },
            ],
          },
          {
            scene: 'En el restaurante',
            lines: [
 ['Ana', '뭐 [[0]] ? (¿Qué quieres comer?)'],
 ['Sofia', '냉면을 [[1]] . (Quiero comer naengmyeon.)'],
 ],
            blanks: [
              { options: ['먹고 싶어요', '먹어고 싶어요', '먹싶어요', '먹이고 싶어요'], answer: '먹고 싶어요', explain: '먹다 → 먹+고 싶어요. ¿Qué quieres comer?' },
              { options: ['먹고 싶어요', '먹어요', '먹고싶', '먹이고 싶어요'], answer: '먹고 싶어요', explain: '냉면을 먹고 싶어요 = quiero comer naengmyeon.' },
            ],
          },
          {
            scene: 'Destino de viaje',
            lines: [
 ['Lina', '방학에 어디 [[0]] ? (¿Adónde quieres ir de vacaciones?)'],
 ['Marco', '서울에 [[1]] . (Quiero ir a Seúl.)'],
 ],
            blanks: [
              { options: ['가고 싶어요', '가요고 싶어요', '가싶어요', '갈 싶어요'], answer: '가고 싶어요', explain: '가다 → 가+고 싶어요. 어디 가고 싶어요? = ¿Adónde quieres ir?' },
              { options: ['가고 싶어요', '가아고 싶어요', '가고싶', '갈싶어요'], answer: '가고 싶어요', explain: '서울에 가고 싶어요 = quiero ir a Seúl.' },
            ],
          },
          {
            scene: 'No querer',
            lines: [
 ['Vera', '오늘 수업 있어요? (¿Tienes clase hoy?)'],
 ['Carlos', '있어요. 그런데 [[0]] 솔직히 쉬고 [[1]] . (Sí. Pero honestamente quiero descansar.)'],
 ],
            blanks: [
              { options: ['공부하고 싶지 않아요.', '공부하 싶지 않아요', '공부 싶지 않아요', '공부 안 싶어요'], answer: '공부하고 싶지 않아요.', explain: '공부하다 → 공부하+고 싶지 않아요 = no quiero estudiar.' },
              { options: ['싶어요', '싶해요', '싶아요', '싶여요'], answer: '싶어요', explain: '쉬다(descansar) → 쉬+고 싶어요. 쉬고 싶어요 = quiero descansar.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa los deseos de Hugo usando 고 싶어요.',
        type: 'guidedText',
        scene: 'Los sueños de Hugo sobre Corea',
        text: '저는 언젠가 한국에 [[0]]. (Quiero ir a Corea algún día.) 서울에서 삼겹살을 [[1]]. (Quiero comer samgyeopsal en Seúl.) 한강에서 자전거를 [[2]]. (Quiero andar en bici en el río Han.) K-드라마를 한국어로 [[3]]. (Quiero ver K-dramas en coreano.) 한국 친구들을 많이 [[4]]. (Quiero hacer muchos amigos coreanos.) 한국에서 살고 [[5]] 도 해요. (A veces también quiero vivir en Corea.)',
        blanks: [
          { options: ['가고 싶어요', '가요고 싶어요', '갈 싶어요', '가싶어요'], answer: '가고 싶어요', explain: '가다 → 가+고 싶어요.' },
          { options: ['먹고 싶어요', '먹어고 싶어요', '먹싶어요', '먹으고 싶어요'], answer: '먹고 싶어요', explain: '먹다 → 먹+고 싶어요.' },
          { options: ['타고 싶어요', '타아고 싶어요', '타이고 싶어요', '타싶어요'], answer: '타고 싶어요', explain: '타다(montar) → 타+고 싶어요.' },
          { options: ['보고 싶어요', '봐고 싶어요', '보아고 싶어요', '보싶어요'], answer: '보고 싶어요', explain: '보다 → 보+고 싶어요.' },
          { options: ['사귀고 싶어요', '사귀어고 싶어요', '사귀싶어요', '사귀고싶'], answer: '사귀고 싶어요', explain: '사귀다(hacer amigos) → 사귀+고 싶어요.' },
          { options: ['싶어요', '싶아요', '싶해요', '싶여요'], answer: '싶어요', explain: '살다(vivir) → 살+고 싶어요. 살고 싶어요 = quiero vivir.' },
        ],
      },
      {
        id: 'l4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de 고 싶어요 para cada verbo.',
        type: 'freeText',
        scene: 'Lista de deseos de fin de año',
        text: '저는 올해 한국어를 잘 배우[[0]] (배우다). / 매일 운동하[[1]] (운동하다). / 새 친구를 많이 사귀[[2]] (사귀다). / 한국 드라마를 자막 없이 보[[3]] (보다). / 처음으로 한국에 가[[4]] (가다).',
        blanks: [
          { answer: '배우고 싶어요', accepted: ['배우고 싶어요', '고 싶어요'], explain: '배우다 → 배우+고 싶어요.' },
          { answer: '운동하고 싶어요', accepted: ['운동하고 싶어요', '고 싶어요'], explain: '운동하다 → 운동하+고 싶어요.' },
          { answer: '사귀고 싶어요', accepted: ['사귀고 싶어요', '고 싶어요'], explain: '사귀다 → 사귀+고 싶어요.' },
          { answer: '보고 싶어요', accepted: ['보고 싶어요', '고 싶어요'], explain: '보다 → 보+고 싶어요.' },
          { answer: '가고 싶어요', accepted: ['가고 싶어요', '고 싶어요'], explain: '가다 → 가+고 싶어요.' },
        ],
      },
      {
        id: 'l5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Expresa tus deseos en coreano con 고 싶어요.',
        type: 'write',
        items: [
          {
            scene: 'Deseo de viaje',
            prompt: 'Di "Quiero ir a Corea" (한국=Corea, 가다=ir).',
            answer: '저는 한국에 가고 싶어요.',
            accepted: ['가고 싶어요', '한국에 가고 싶어요'],
            explain: '가다 → 가+고 싶어요. 한국에 가고 싶어요.',
          },
          {
            scene: 'Comida favorita',
            prompt: 'Di "Quiero comer kimchi" (김치=kimchi, 먹다=comer).',
            answer: '저는 김치를 먹고 싶어요.',
            accepted: ['먹고 싶어요', '김치를 먹고 싶어요'],
            explain: '먹다 → 먹+고 싶어요. 김치를 먹고 싶어요.',
          },
          {
            scene: 'No querer',
            prompt: 'Di "No quiero trabajar hoy" (오늘=hoy, 일하다=trabajar).',
            answer: '오늘은 일하고 싶지 않아요.',
            accepted: ['싶지 않아요', '일하고 싶지 않아요'],
            explain: '일하다 → 일하+고 싶지 않아요. Negativo de 고 싶어요.',
          },
          {
            scene: 'Preguntando',
            prompt: 'Pregunta "¿Qué quieres comer?" en coreano (뭐=qué, 먹다=comer).',
            answer: '뭐 먹고 싶어요?',
            accepted: ['먹고 싶어요', '뭐 먹고 싶어요'],
            explain: 'Pregunta con 고 싶어요: 뭐 먹고 싶어요? (entonación ↑ al final).',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Comparte tres cosas que quieres hacer este año usando 고 싶어요.',
        type: 'write',
        items: [
          {
            scene: 'Mi sueño de idiomas',
            prompt: 'Di algo que quieres aprender: 저는 ___를/을 배우고 싶어요.',
            answer: '저는 한국어를 잘 배우고 싶어요.',
            accepted: ['배우고 싶어요', '싶어요'],
            explain: '배우다(aprender) → 배우+고 싶어요. ¡Di qué quieres aprender!',
          },
          {
            scene: 'Mi deseo de viaje',
            prompt: 'Di a dónde quieres ir: ___에 가고 싶어요.',
            answer: '서울에 가고 싶어요.',
            accepted: ['가고 싶어요', '싶어요'],
            explain: '가다(ir) → 가+고 싶어요. Destino + 에 + 가고 싶어요.',
          },
          {
            scene: 'Lo que no quiero',
            prompt: 'Di algo que no quieres hacer ahora: 지금 ___고 싶지 않아요.',
            answer: '지금 공부하고 싶지 않아요.',
            accepted: ['싶지 않아요', '않아요'],
            explain: 'Negativo: raíz + 고 싶지 않아요. Exprésate libremente.',
          },
        ],
      },
    ],
  },
}

export default topic
