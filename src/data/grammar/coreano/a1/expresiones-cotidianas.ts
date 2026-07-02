import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'expresiones-cotidianas',
  order: '21',
  color: '#c60c30',
  category: '문법',
  level: 'A1',
  title: 'Expresiones cotidianas esenciales en coreano A1',
  shortTitle: 'Expresiones cotidianas',
  metaTitle: 'Expresiones cotidianas coreano A1 — 감사합니다, 괜찮아요, 잠깐만요, 모르겠어요',
  description:
    'Más allá de la gramática, el coreano tiene expresiones fijas de alta frecuencia que debes dominar desde el primer día. 감사합니다 (gracias), 괜찮아요 (está bien/de nada), 잠깐만요 (espera un momento), 모르겠어요 (no sé), 다시 한 번 (otra vez).',
  lead: 'Estas expresiones coreanas te sacarán de apuros en cualquier situación desde el día uno. Aprende 감사합니다, 괜찮아요, 잠깐만요, 모르겠어요 y navega el mundo coreano con confianza.',
  outcomes: [
    'Usar expresiones de cortesía y supervivencia en situaciones cotidianas coreanas',
    'Responder apropiadamente en contextos sociales básicos',
    'Pedir que repitan, pedir ayuda y agradecer en coreano',
  ],
  guide: {
    goal: 'Dominar las expresiones fijas de mayor utilidad en situaciones cotidianas reales.',
    model: 'Expresiones fijas = memorizar como unidades, no analizar palabra por palabra.',
    formula: '감사합니다 / 괜찮아요 / 잠깐만요 / 모르겠어요 / 다시 한 번 해 주세요',
    decisions: [
      '¿Agradeces algo? → 감사합니다 (formal) / 고마워요 (informal a amigos)',
      '¿Respones "de nada" o "estoy bien"? → 괜찮아요 (también significa "no importa")',
      '¿Necesitas que esperen? → 잠깐만요 (espera un momento)',
      '¿No entiendes o no sabes? → 모르겠어요 (no sé / no entiendo bien)',
      '¿Pides repetición? → 다시 한 번 해 주세요 (por favor, una vez más)',
    ],
    table: [
      ['Expresión', 'Romanización', 'Significado principal'],
      ['감사합니다 / 고마워요', 'gamsahamnida / gomawoyo', 'Gracias (formal / informal)'],
      ['괜찮아요', 'gwaenchanayo', 'Está bien / De nada / No importa'],
      ['잠깐만요', 'jamkkanmanyo', 'Un momento / Espera'],
      ['모르겠어요', 'moreugesseoyo', 'No sé / No estoy seguro'],
      ['다시 한 번 해 주세요', 'dasi han beon hae juseyo', 'Por favor, una vez más'],
    ],
    mistakes: [
      '감사합니다 es más formal que 고마워요. Con profesores, extraños y mayores: 감사합니다. Con amigos: 고마워요.',
      '괜찮아요 tiene múltiples significados: "Está bien", "De nada", "No importa", "Me encuentro bien". El contexto lo aclara.',
      '"잠깐만요" literalmente = "solo un momento". Decirlo con tono suave es muy importante para sonar amable.',
      'Evita decir solo "모르겠어요" sin esfuerzo previo — suena brusco. Mejor: "조금 어려워요..." (Es un poco difícil...)',
    ],
  },
  seo: [
    {
      heading: '¿Cuáles son las expresiones más útiles para sobrevivir en coreano A1?',
      paragraphs: [
        'Las expresiones de supervivencia son distintas de la gramática regular: son fórmulas fijas que debes memorizar como bloques completos. En coreano, estas expresiones son especialmente importantes porque el idioma tiene niveles de formalidad que afectan cada interacción.',
        'Las cinco expresiones más útiles en A1 son: 감사합니다 (gracias), 괜찮아요 (está bien/de nada), 잠깐만요 (espera), 모르겠어요 (no sé), y 다시 한 번 해 주세요 (repite por favor). Con estas cinco, puedes sobrevivir en Corea en situaciones básicas.',
      ],
      table: [
        ['Situación', 'Expresión', 'Romanización'],
        ['Agradecer (formal)', '감사합니다', 'gamsahamnida'],
        ['Agradecer (amigos)', '고마워요', 'gomawoyo'],
        ['De nada / Está bien', '괜찮아요', 'gwaenchanayo'],
        ['Espera un momento', '잠깐만요', 'jamkkanmanyo'],
        ['No entiendo/sé', '모르겠어요', 'moreugesseoyo'],
        ['Más despacio', '천천히 말해 주세요', 'cheoncheonhi malhae juseyo'],
        ['Repite por favor', '다시 한 번 해 주세요', 'dasi han beon hae juseyo'],
      ],
    },
    {
      heading: '괜찮아요: la expresión más versátil del coreano',
      paragraphs: [
        '"괜찮아요" (gwaenchanayo) es una de las expresiones más frecuentes del coreano porque tiene múltiples usos: "Estoy bien" (cuando te preguntan si estás bien), "De nada" (respuesta a 감사합니다), "No importa" (cuando algo salió mal), "Está bien" (dando permiso o aprobación).',
        'Los hablantes coreanos la usan constantemente en situaciones sociales. Aprenderla en sus distintos contextos te hará sonar natural desde el principio. La clave es el contexto y la entonación.',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'These are high-frequency formulaic expressions — teach them as chunks, not analyzed grammar. Drill them through role-play scenarios: at a restaurant, asking for help, expressing uncertainty. Context matters more than grammar here.',
    graphicPrompt:
      'Six dialogue bubbles in different settings: restaurant (감사합니다), street (잠깐만요), classroom (모르겠어요), meeting (괜찮아요), phone call (다시 한 번). Korean red/white theme.',
    scene: [
      ['감사합니다', '감사합니다! (gam-sa-ham-ni-da) — ¡Gracias! (formal)'],
      ['고마워요', '고마워요~ (go-ma-wo-yo) — ¡Gracias! (informal/amigos)'],
      ['괜찮아요', '괜찮아요. (gwaen-cha-na-yo) — Está bien. / De nada.'],
      ['잠깐만요', '잠깐만요! (jam-kkan-man-yo) — ¡Un momento!'],
      ['모르겠어요', '모르겠어요... (mo-reu-ge-sseo-yo) — No sé / No estoy seguro'],
      ['다시 한 번', '다시 한 번 해 주세요. — Por favor, una vez más.'],
    ],
    learnerModes: ['recognition', 'transformation', 'gap-fill', 'production'],
    practiceVerbs: ['감사하다', '모르다', '괜찮다', '하다', '말하다'],
    reviewFocus: ['감사합니다 vs 고마워요 (formalidad)', '괜찮아요 (múltiples significados)', 'pedir repetición: 다시 한 번'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: '표현 인식',
        tag: 'Opción múltiple',
        intro: 'Identifica la expresión correcta para cada situación.',
        type: 'choice',
        items: [
          { scene: 'Agradecer a un profesor', lines: [['', 'Tu profesor coreano te ayuda. ¿Qué dices?']], options: ['괜찮아요', '감사합니다', '잠깐만요', '모르겠어요'], answer: '감사합니다', explain: '감사합니다 = Gracias (formal). Con profesores, personas mayores y desconocidos: 감사합니다.' },
          { scene: 'Pedir esperar', lines: [['', 'Necesitas un momento antes de responder. ¿Qué dices?']], options: ['모르겠어요', '다시 한 번', '잠깐만요', '감사합니다'], answer: '잠깐만요', explain: '잠깐만요 = Un momento / Espera. Muy útil cuando necesitas procesar o buscar algo.' },
          { scene: '괜찮아요 como De nada', lines: [['', 'Tu amigo dice 고마워요. ¿Cómo respondes?']], options: ['모르겠어요', '괜찮아요', '잠깐만요', '감사합니다'], answer: '괜찮아요', explain: '괜찮아요 = De nada (en respuesta a gracias). También significa "Está bien" en otros contextos.' },
          { scene: 'No entender', lines: [['', 'No entiendes lo que te explicaron. ¿Qué dices?']], options: ['감사합니다', '괜찮아요', '잠깐만요', '모르겠어요'], answer: '모르겠어요', explain: '모르겠어요 = No sé / No estoy seguro. Se usa cuando no entiendes o no sabes la respuesta.' },
          { scene: 'Pedir repetición', lines: [['', 'El hablante fue muy rápido. ¿Qué expresión usas?']], options: ['모르겠어요', '잠깐만요', '다시 한 번 해 주세요', '감사합니다'], answer: '다시 한 번 해 주세요', explain: '다시 한 번 해 주세요 = Por favor, una vez más. Perfecto cuando algo fue muy rápido o no escuchaste bien.' },
          { scene: '고마워요 vs 감사합니다', lines: [['', '¿Cuál es más formal?']], options: ['고마워요', '감사합니다', 'Ambas son iguales', 'Ninguna es coreana'], answer: '감사합니다', explain: '감사합니다 es más formal (합니다체). 고마워요 es informal (해요체). Con profesores/mayores: 감사합니다.' },
          { scene: '괜찮아요 — estoy bien', lines: [['', 'Alguien te pregunta: "괜찮아요?" (¿Estás bien?). Si estás bien, respondes:']], options: ['모르겠어요', '잠깐만요', '괜찮아요', '감사합니다'], answer: '괜찮아요', explain: 'Si alguien pregunta 괜찮아요?, respondes 괜찮아요 = Estoy bien. Misma expresión en pregunta y respuesta.' },
          { scene: 'Habla más despacio', lines: [['', 'Quieres que hablen más despacio. ¿Qué dices?']], options: ['잠깐만요', '다시 한 번 해 주세요', '천천히 말해 주세요', '모르겠어요'], answer: '천천히 말해 주세요', explain: '천천히 말해 주세요 = Por favor, hable más despacio. 천천히 = despacio/lentamente.' },
        ],
      },
      {
        id: 'level-2',
        title: '상황별 표현 연습',
        tag: '2 espacios',
        intro: 'Completa los diálogos con la expresión correcta.',
        type: 'dual',
        items: [
          { scene: 'En un restaurante', lines: [['', 'El camarero te trae la comida. Tú: [[0]]. Él: [[1]].']], blanks: [{ options: ['감사합니다', '모르겠어요', '잠깐만요', '괜찮아요'], answer: '감사합니다', explain: '감사합니다 = Gracias al recibir la comida.' }, { options: ['감사합니다', '괜찮아요', '모르겠어요', '잠깐만요'], answer: '괜찮아요', explain: 'El camarero responde 괜찮아요 = De nada / No hay problema.' }] },
          { scene: 'En clase de coreano', lines: [['', 'David pregunta algo difícil. Tú: [[0]]. Pides: [[1]].']], blanks: [{ options: ['잠깐만요', '괜찮아요', '모르겠어요', '감사합니다'], answer: '모르겠어요', explain: '모르겠어요 = No sé / No estoy seguro.' }, { options: ['다시 한 번 해 주세요', '감사합니다', '잠깐만요', '괜찮아요'], answer: '다시 한 번 해 주세요', explain: '다시 한 번 해 주세요 = Por favor, una vez más.' }] },
          { scene: 'Conversación con amigo', lines: [['', 'Tu amigo te ayuda. Tú: [[0]]. Él: [[1]].']], blanks: [{ options: ['감사합니다', '고마워요', '잠깐만요', '모르겠어요'], answer: '고마워요', explain: 'Con amigos: 고마워요 (más informal que 감사합니다).' }, { options: ['괜찮아요', '감사합니다', '모르겠어요', '잠깐만요'], answer: '괜찮아요', explain: '괜찮아요 = De nada entre amigos.' }] },
          { scene: 'Necesitas tiempo', lines: [['', 'Te hacen una pregunta y necesitas pensar: [[0]]. Después: [[1]].']], blanks: [{ options: ['감사합니다', '괜찮아요', '잠깐만요', '모르겠어요'], answer: '잠깐만요', explain: '잠깐만요 = Un momento mientras pienso.' }, { options: ['모르겠어요', '감사합니다', '잠깐만요', '고마워요'], answer: '모르겠어요', explain: 'Si finalmente no sabes: 모르겠어요 = No sé.' }] },
        ],
      },
      {
        id: 'level-3',
        title: '대화 완성하기',
        tag: 'Opciones',
        intro: 'Elige la expresión correcta en cada situación del diálogo.',
        type: 'guidedText',
        scene: 'En la recepción de WeLearn — primera clase',
        text: 'Zhanna: 안녕하세요! (¡Hola!) Carlos: 안녕하세요! [[0]]! (¡Hola! — gracias por recibirme, formal) Zhanna: 한국어를 공부해요? (¿Estudias coreano?) Carlos: 네, 그런데... [[1]]. (Sí, pero no sé bien explicar) Zhanna: 천천히 말해요. (Habla despacio.) Carlos: [[2]]! (¡Un momento!) ... 저는 한국어가 좋아요. (Me gusta el coreano.) Zhanna: 잘 했어요! Carlos: [[3]]! (¡Gracias!) Zhanna: [[4]]. (De nada / Está bien.)',
        blanks: [
          { options: ['감사합니다', '고마워요', '모르겠어요', '잠깐만요'], answer: '감사합니다', explain: '감사합니다 — agradecimiento formal al llegar. Con Zhanna (profesora/superior): 감사합니다.' },
          { options: ['감사합니다', '잠깐만요', '모르겠어요', '괜찮아요'], answer: '모르겠어요', explain: '모르겠어요 = No sé (cómo explicarlo). Expresión honesta de incertidumbre.' },
          { options: ['감사합니다', '잠깐만요', '괜찮아요', '모르겠어요'], answer: '잠깐만요', explain: '잠깐만요 = Un momento. Pide tiempo para preparar la respuesta.' },
          { options: ['모르겠어요', '잠깐만요', '괜찮아요', '감사합니다'], answer: '감사합니다', explain: '감사합니다 = Gracias al recibir el elogio. Con profesora: forma formal.' },
          { options: ['감사합니다', '모르겠어요', '잠깐만요', '괜찮아요'], answer: '괜찮아요', explain: '괜찮아요 = De nada (respuesta a gracias). También: "Está bien, no hay problema."' },
        ],
      },
      {
        id: 'level-4',
        title: '표현 직접 쓰기',
        tag: 'Sin opciones',
        intro: 'Escribe la expresión coreana correcta sin opciones.',
        type: 'freeText',
        scene: 'Situaciones reales del día a día',
        text: '1. Gracias (formal, para profesores y desconocidos): [[0]] 2. Un momento (necesitas tiempo): [[1]] 3. No sé / No estoy seguro: [[2]] 4. Está bien / De nada: [[3]] 5. Por favor, una vez más: [[4]]',
        blanks: [
          { answer: '감사합니다', accepted: ['감사합니다', '고마워요'], explain: '감사합니다 = gracias (formal). 고마워요 = gracias (informal). Ambas correctas según contexto.' },
          { answer: '잠깐만요', accepted: ['잠깐만요'], explain: '잠깐만요 = Un momento. Expresión indispensable.' },
          { answer: '모르겠어요', accepted: ['모르겠어요'], explain: '모르겠어요 = No sé. Honestidad con cortesía.' },
          { answer: '괜찮아요', accepted: ['괜찮아요'], explain: '괜찮아요 = Está bien / De nada.' },
          { answer: '다시 한 번 해 주세요', accepted: ['다시 한 번 해 주세요', '다시 한번 해 주세요'], explain: '다시 한 번 해 주세요 = Por favor, una vez más. Expresión muy útil en clase.' },
        ],
      },
      {
        id: 'level-5',
        title: '상황 대화 쓰기',
        tag: 'Producción',
        intro: 'Usa las expresiones cotidianas en situaciones completas.',
        type: 'write',
        items: [
          { scene: 'En un café en Seúl', prompt: 'Escribe un mini-diálogo (3-4 turnos) en un café. Usa al menos: 감사합니다, 잠깐만요, 괜찮아요. El camarero te atiende y te trae el pedido.', answer: '카페직원: 어서 오세요! Carlos: 잠깐만요... 아이스 아메리카노 주세요. (직원이 가져옵니다) Carlos: 감사합니다! 직원: 괜찮아요!', accepted: ['감사합니다', '잠깐만요', '괜찮아요'], explain: '잠깐만요 (para pedir tiempo al elegir), 감사합니다 (al recibir), 괜찮아요 (de nada del camarero).' },
          { scene: 'Primera lección de coreano', prompt: 'David explica algo difícil y rápido. Escribe cómo pedirías más tiempo, dirías que no entiendes y pedirías que repita. Usa: 잠깐만요, 모르겠어요, 다시 한 번 해 주세요.', answer: '잠깐만요! 조금 모르겠어요... 다시 한 번 해 주세요. 감사합니다!', accepted: ['잠깐만요', '모르겠어요', '다시 한 번 해 주세요'], explain: 'Las tres expresiones de supervivencia en clase: pedir tiempo, admitir confusión y pedir repetición.' },
        ],
      },
      {
        id: 'level-6',
        title: '한국어 생존 미션',
        tag: 'Producción',
        intro: 'Practica las expresiones en un escenario real completo.',
        type: 'write',
        items: [
          { scene: '한국에서 첫날 — primer día en Corea', prompt: 'Imagina tu primer día en Corea. Escribe 5 situaciones donde usarías estas expresiones: al llegar al hotel, al pedir algo, al no entender, al recibir ayuda, al despedirte. Usa: 감사합니다, 고마워요, 괜찮아요, 잠깐만요, 모르겠어요, 다시 한 번 해 주세요.', answer: '호텔 도착: 감사합니다! 식당에서: 잠깐만요... 메뉴를 봐요. 길을 물어볼 때: 모르겠어요... 지도를 보여 주세요. 도움을 받을 때: 감사합니다! 괜찮아요! 너무 빠르면: 다시 한 번 해 주세요. 천천히!', accepted: ['감사합니다', '잠깐만요', '모르겠어요', '괜찮아요', '다시 한 번'], explain: '일상 생존 표현 완성! These expressions will get you through real Korean situations from day one.' },
          { scene: '웰러닝에서 첫 수업', prompt: 'Es tu primera clase en WeLearn con David. Escribe un párrafo sobre cómo usarías las expresiones cotidianas durante la clase: para agradecer, pedir tiempo, admitir que no sabes, pedir que repita.', answer: '첫 수업에서: "선생님, 감사합니다! 잠깐만요... 조금 어려워요. 모르겠어요. 다시 한 번 해 주세요. 감사합니다! 괜찮아요!" — 이 표현들로 수업을 잘 따라갈 수 있어요.', accepted: ['감사합니다', '잠깐만요', '모르겠어요', '다시 한 번'], explain: '수업에서 꼭 필요한 표현들. These classroom survival expressions make learning much smoother.' },
        ],
      },
    ],
  },
}

export default topic
