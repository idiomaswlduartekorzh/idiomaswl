import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'marcador-objeto',
  order: '07',
  color: '#c60c30',
  category: 'Partículas',
  level: 'A1',
  title: 'Marcador de Objeto 을/를 en Coreano A1',
  shortTitle: 'Objeto 을/를',
  metaTitle: 'Partícula de objeto 을/를 coreano A1 — marcador de objeto directo',
  description:
    '을 (eul) y 를 (reul) son las partículas que marcan el objeto directo en coreano. Se eligen según la consonante final de la palabra: 을 después de consonante, 를 después de vocal. Sin equivalente directo en español, son indispensables para construir oraciones SOV completas.',
  lead: '을 (tras consonante) / 를 (tras vocal) = marcan el objeto directo. 영어를 공부해요 (estudio inglés). El objeto siempre va ANTES del verbo en coreano.',
  outcomes: [
    'Marca el objeto directo con 을/를',
    'Aplica la regla consonante (을) vs. vocal (를)',
    'Construye oraciones SOV con objeto explícito',
  ],

  guide: {
    goal: 'Usar 을/를 para marcar el objeto directo en oraciones coreanas SOV.',
    model: '영어를 공부해요. (Estudio inglés.) / 물을 마셔요. (Bebo agua.)',
    formula: '[Objeto + 을/를] + Verbo | Consonante final → 을 | Vocal final → 를',
    decisions: [
      '를 → después de vocal: 영어를, 커피를, 한국어를, 뭐를(→뭘)',
      '을 → después de consonante: 물을, 밥을, 책을, 음악을',
      'El objeto con 을/를 va siempre ANTES del verbo (estructura SOV)',
      'En conversación informal se puede omitir 을/를, pero en A1 es fundamental conocerlo',
      '뭐 (qué) + 를 = 뭘 (contracción coloquial): 뭘 먹어요? = ¿Qué comes?',
    ],
    table: [
      ['Termina en', 'Partícula', 'Ejemplo'],
      ['consonante', '을', '물을 (agua), 밥을 (arroz), 책을 (libro)'],
      ['vocal', '를', '영어를 (inglés), 커피를 (café), 뭐를→뭘 (qué)'],
      ['partícula + verbo', '을/를 + verbo', '밥을 먹어요 / 커피를 마셔요'],
    ],
    mistakes: [
      '"영어을 공부해요" ❌ — 영어 termina en vocal ㅓ → 를: "영어를 공부해요" ✓',
      '"물를 마셔요" ❌ — 물 termina en consonante ㄹ → 을: "물을 마셔요" ✓',
      'El objeto NO va después del verbo: "공부해요 영어를" ❌ — verbo siempre al final ✓',
    ],
  },

  seo: [
    {
      heading: '¿Qué es la partícula 을/를 y por qué existe?',
      paragraphs: [
        'En español, el orden de las palabras indica quién hace qué y qué recibe la acción. "El perro muerde al hombre" es diferente de "El hombre muerde al perro". En coreano, el orden es flexible (el verbo siempre va al final, pero sujeto y objeto pueden moverse) y son las partículas las que indican la función de cada elemento.',
        '을/를 marca específicamente el objeto directo — la persona o cosa que recibe la acción del verbo. "영어를 공부해요" = "(yo) estudio inglés". Sin 를, el hablante coreano no sabe con certeza si 영어 es sujeto, objeto o algo más.',
      ],
    },
    {
      heading: '¿Cuándo se usa 을 y cuándo 를 en coreano?',
      paragraphs: [
        'La regla es sencilla: si la última sílaba de la palabra termina en consonante (tiene batchim), usa 을. Si termina en vocal (no tiene batchim), usa 를. Ejemplos: 물(agua, termina en ㄹ) → 물을; 커피(café, termina en ㅣ) → 커피를.',
        'La misma regla se aplica a nombres propios y palabras prestadas: 마리아를 (a María), 피자를 (pizza), 한국을 (Corea — 국 termina en ㄱ → 을).',
      ],
      table: [
        ['Palabra', 'Última sílaba', 'Partícula', 'Resultado'],
        ['물 (agua)', 'ㄹ (consonante)', '을', '물을'],
        ['커피 (café)', 'ㅣ (vocal)', '를', '커피를'],
        ['영어 (inglés)', 'ㅓ (vocal)', '를', '영어를'],
        ['밥 (arroz)', 'ㅂ (consonante)', '을', '밥을'],
      ],
    },
    {
      heading: '¿Dónde va el objeto directo en la oración coreana?',
      paragraphs: [
        'Recuerda que en coreano el verbo va al final. El objeto directo con 을/를 va inmediatamente antes del verbo: 저는 + 한국어를 + 공부해요. (SOV). Si hay adverbio de tiempo, va antes del objeto: 저는 + 매일 + 한국어를 + 공부해요.',
        'En conversación coloquial los coreanos frecuentemente omiten las partículas cuando el contexto es claro: 뭐 먹어요? (¿qué comes?) en lugar de 뭐를 먹어요? Pero para aprender correctamente y para la escritura, siempre incluye 을/를.',
      ],
    },
    {
      heading: 'Preguntar con el objeto: 뭐를 → 뭘',
      paragraphs: [
        '뭐 (mwo) significa "qué" y se usa como objeto directo: 뭐를 먹어요? = ¿Qué comes? En conversación coloquial 뭐를 se contrae en 뭘 (mwol): 뭘 먹어요? Ambas formas son correctas; 뭘 es más natural en el habla cotidiana.',
        'Otros usos frecuentes: 어떤 것을 좋아해요? (¿Qué tipo de cosas te gustan?), 무엇을 해요? (¿Qué haces? — más formal que 뭐를).',
      ],
    },
  ],

  visual: {
    mode: 'particles',
    teacherLens: 'Partícula de objeto directo 을/를: regla consonante/vocal con ejemplos de verbos frecuentes.',
    graphicPrompt: 'Diagrama SOV con objeto marcado por 을/를 resaltado antes del verbo.',
    scene: [
      ['영어를 공부해요', 'Estudio inglés. (영어 termina en vocal → 를)'],
      ['물을 마셔요', 'Bebo agua. (물 termina en consonante → 을)'],
      ['밥을 먹어요', 'Como arroz. (밥 termina en consonante → 을)'],
      ['커피를 마셔요', 'Bebo café. (커피 termina en vocal → 를)'],
      ['음악을 들어요', 'Escucho música. (음악 termina en consonante → 을)'],
      ['뭘 먹어요?', '¿Qué comes? (뭐를 → 뭘, contracción coloquial)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['을 tras consonante', '를 tras vocal', 'objeto antes del verbo'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Nivel 1 — Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Elige 을 o 를 para cada objeto directo.',
        type: 'choice',
        items: [
          {
            scene: 'En clase',
            lines: [['Carlos', '저는 한국어___ 공부해요. (Estudio coreano.)']],
            options: ['를', '을', '이', '가'],
            answer: '를',
            explain: '한국어 termina en vocal ㅓ → 를. 한국어를 공부해요.',
          },
          {
            scene: 'En la cocina',
            lines: [['Ana', '저는 물___ 마셔요. (Bebo agua.)']],
            options: ['을', '를', '에', '이'],
            answer: '을',
            explain: '물 termina en consonante ㄹ → 을. 물을 마셔요.',
          },
          {
            scene: 'Leyendo',
            lines: [['Iván', '저는 책___ 읽어요. (Leo un libro.)']],
            options: ['을', '를', '이', '에'],
            answer: '을',
            explain: '책 termina en consonante ㄱ → 을. 책을 읽어요.',
          },
          {
            scene: 'Bebiendo',
            lines: [['Lina', '저는 커피___ 좋아해요. (Me gusta el café.)']],
            options: ['를', '을', '가', '는'],
            answer: '를',
            explain: '커피 termina en vocal ㅣ → 를. 커피를 좋아해요.',
          },
          {
            scene: 'Escuchando música',
            lines: [['Sofia', '저는 음악___ 들어요. (Escucho música.)']],
            options: ['을', '를', '에서', '이'],
            answer: '을',
            explain: '음악 termina en consonante ㄱ → 을. 음악을 들어요.',
          },
          {
            scene: 'Estudiando inglés',
            lines: [['Marco', '저는 영어___ 배워요. (Aprendo inglés.)']],
            options: ['를', '을', '에', '가'],
            answer: '를',
            explain: '영어 termina en vocal ㅓ → 를. 영어를 배워요.',
          },
          {
            scene: 'Posición del objeto',
            lines: [['Elena', '¿Dónde va el objeto con 을/를 en la oración?']],
            options: ['Antes del verbo', 'Después del verbo', 'Al inicio siempre', 'Al final de todo'],
            answer: 'Antes del verbo',
            explain: 'En coreano (SOV) el objeto va antes del verbo: 밥을 먹어요 (verbo al final).',
          },
          {
            scene: 'Preguntando',
            lines: [['Carlos', '뭐___ 먹어요? (¿Qué comes?) — forma coloquial']],
            options: ['뭘', '뭐를', '뭐은', '뭐이'],
            answer: '뭘',
            explain: '뭐를 → 뭘 (contracción coloquial). 뭘 먹어요? = ¿Qué comes?',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Nivel 2 — Objeto y verbo',
        tag: '2 espacios',
        intro: 'Completa el objeto con 을/를 y el verbo correspondiente.',
        type: 'dual',
        items: [
          {
            scene: 'Rutina matutina',
            lines: [['Ana', '저는 아침에 커피[[0]] . (Por la mañana bebo café.)']],
            blanks: [
              { options: ['를', '을', '에', '이'], answer: '를', explain: '커피 termina en vocal ㅣ → 를.' },
              { options: ['마셔요', '먹어요', '가요', '해요'], answer: '마셔요', explain: '마시다 → 마셔요 = bebo.' },
            ],
          },
          {
            scene: 'Estudiando',
            lines: [['Iván', '저는 한국어[[0]] . (Estudio coreano.)']],
            blanks: [
              { options: ['를', '을', '가', '는'], answer: '를', explain: '한국어 termina en vocal ㅓ → 를.' },
              { options: ['공부해요', '가요', '마셔요', '있어요'], answer: '공부해요', explain: '공부하다 → 공부해요 = estudio.' },
            ],
          },
          {
            scene: 'Comiendo',
            lines: [['Marco', '저는 점심에 밥[[0]] . (Al mediodía como arroz.)']],
            blanks: [
              { options: ['을', '를', '에', '이'], answer: '을', explain: '밥 termina en consonante ㅂ → 을.' },
              { options: ['먹어요', '마셔요', '가요', '해요'], answer: '먹어요', explain: '먹다 → 먹어요 = como.' },
            ],
          },
          {
            scene: 'Preguntando qué comes',
            lines: [
 ['Lina', ' 먹어요? (¿Qué comes?)'],
 ['Carlos', '밥[[0]] . (Como arroz.)'],
 ],
            blanks: [
              { options: ['뭘', '뭐는', '뭐이', '뭐가'], answer: '뭘', explain: '뭐를 → 뭘 (coloquial). 뭘 먹어요? = ¿Qué comes?' },
              { options: ['을 먹어요', '를 먹어요', '이 먹어요', '가 먹어요'], answer: '을 먹어요', explain: '밥 + 을 + 먹어요. 밥을 먹어요.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa con la partícula correcta (을 o 를) en el texto.',
        type: 'guidedText',
        scene: 'Un día en la vida de Carlos en Bucaramanga',
        text: '저는 아침에 커피[[0]] 마셔요. 그리고 영어[[1]] 공부해요. 점심에 밥[[2]] 먹어요. 오후에 음악[[3]] 들어요. 저녁에 한국어[[4]] 배워요. 밤에 책[[5]] 읽어요.',
        blanks: [
          { options: ['를', '을'], answer: '를', explain: '커피 termina en vocal ㅣ → 를.' },
          { options: ['를', '을'], answer: '를', explain: '영어 termina en vocal ㅓ → 를.' },
          { options: ['을', '를'], answer: '을', explain: '밥 termina en consonante ㅂ → 을.' },
          { options: ['을', '를'], answer: '을', explain: '음악 termina en consonante ㄱ → 을.' },
          { options: ['를', '을'], answer: '를', explain: '한국어 termina en vocal ㅓ → 를.' },
          { options: ['을', '를'], answer: '을', explain: '책 termina en consonante ㄱ → 을.' },
        ],
      },
      {
        id: 'l4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe 을 o 를 sin opciones.',
        type: 'freeText',
        scene: 'Frases de una estudiante en WeLearn',
        text: '저는 물[[0]] 마셔요. / 저는 음악[[1]] 들어요. / 저는 커피[[2]] 좋아해요. / 저는 한국어[[3]] 배워요. / 저는 밥[[4]] 먹어요.',
        blanks: [
          { answer: '을', accepted: ['을'], explain: '물 termina en ㄹ (consonante) → 을.' },
          { answer: '을', accepted: ['을'], explain: '음악 termina en ㄱ (consonante) → 을.' },
          { answer: '를', accepted: ['를'], explain: '커피 termina en ㅣ (vocal) → 를.' },
          { answer: '를', accepted: ['를'], explain: '한국어 termina en ㅓ (vocal) → 를.' },
          { answer: '을', accepted: ['을'], explain: '밥 termina en ㅂ (consonante) → 을.' },
        ],
      },
      {
        id: 'l5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Construye oraciones completas con objeto directo marcado con 을/를.',
        type: 'write',
        items: [
          {
            scene: 'Rutina diaria',
            prompt: 'Di "Estudio inglés" en coreano (영어=inglés, 공부하다=estudiar).',
            answer: '저는 영어를 공부해요.',
            accepted: ['영어를 공부해요', '저는 영어를 공부해요'],
            explain: '영어 + 를 (vocal final) + 공부해요. SOV completo.',
          },
          {
            scene: 'Comida favorita',
            prompt: 'Di "Como arroz" en coreano (밥=arroz, 먹다=comer).',
            answer: '저는 밥을 먹어요.',
            accepted: ['밥을 먹어요', '저는 밥을 먹어요'],
            explain: '밥 + 을 (consonante final ㅂ) + 먹어요.',
          },
          {
            scene: 'Preguntando',
            prompt: 'Pregunta "¿Qué bebes?" en coreano (뭘=qué, 마시다=beber).',
            answer: '뭘 마셔요?',
            accepted: ['뭘 마셔요', '뭘 마셔요?', '뭐를 마셔요', '뭐를 마셔요?'],
            explain: '뭐를 → 뭘 (coloquial) + 마셔요. Estructura SOV con objeto interrogativo.',
          },
          {
            scene: 'Gustos',
            prompt: 'Di "Me gusta la música" en coreano (음악=música, 좋아하다=gustar).',
            answer: '저는 음악을 좋아해요.',
            accepted: ['음악을 좋아해요', '저는 음악을 좋아해요'],
            explain: '음악 + 을 (consonante final ㄱ) + 좋아해요.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Di tres cosas que haces en un día usando 을/를 correctamente.',
        type: 'write',
        items: [
          {
            scene: 'Lo que como',
            prompt: 'Di qué comes hoy: ___을/를 먹어요.',
            answer: '오늘 밥을 먹어요.',
            accepted: ['을 먹어요', '를 먹어요', '먹어요'],
            explain: 'Elige alimento y añade 을 (consonante) o 를 (vocal). 밥을 / 피자를 / 국수를.',
          },
          {
            scene: 'Lo que estudio',
            prompt: 'Di qué estudias: ___을/를 공부해요/배워요.',
            answer: '저는 한국어를 공부해요.',
            accepted: ['를 공부해요', '를 배워요', '을 공부해요', '을 배워요'],
            explain: 'Elige idioma o materia. Verifica si termina en vocal (를) o consonante (을).',
          },
          {
            scene: 'Lo que escucho o veo',
            prompt: 'Di qué música escuchas o qué ves: ___을/를 들어요/봐요.',
            answer: '저는 음악을 들어요.',
            accepted: ['을 들어요', '를 들어요', '을 봐요', '를 봐요'],
            explain: '음악을 들어요 / 드라마를 봐요 / 영화를 봐요.',
          },
        ],
      },
    ],
  },
}

export default topic
