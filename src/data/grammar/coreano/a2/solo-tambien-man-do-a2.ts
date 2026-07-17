import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'solo-tambien-man-do-a2',
  order: '15',
  color: '#c60c30',
  category: 'Partículas',
  level: 'A2',
  title: '만/도 en coreano A2: solo y también como partículas enfáticas',
  shortTitle: '만/도 (solo/también)',
  metaTitle: 'Solo y también en coreano A2 — 만 (solo), 도 (también), uso y diferencias',
  description:
    'Las partículas 만 (man) y 도 (do) son partículas enfáticas que reemplazan o se añaden a las partículas básicas. 만 significa "solo/únicamente" y reemplaza a 이/가, 을/를. 도 significa "también/incluso" y reemplaza a 이/가, 은/는. Son esenciales para precisar cantidades y añadir información en coreano.',
  lead: '저만 알아요 / 저도 알아요: las partículas 만 y 도 que añaden énfasis en coreano.',
  outcomes: [
    'Usar 만 para expresar "solo" o "únicamente"',
    'Usar 도 para expresar "también" o "incluso"',
    'Combinar 만 y 도 con otras partículas: 에서도, 한테만',
    'Distinguir 만 (exclusión) de 도 (inclusión)',
  ],

  guide: {
    goal: 'Usar las partículas enfáticas 만 (solo) y 도 (también/incluso) en contextos apropiados.',
    model: '저만 왔어요. (Solo yo vine.) / 저도 왔어요. (Yo también vine.)',
    formula: 'N + 만 [reemplaza 이/가, 을/를] | N + 도 [reemplaza 이/가, 은/는]',
    decisions: [
      '만: exclusión → "한국어만 배워요" (estudio solo coreano), "오늘만" (solo hoy)',
      '도: inclusión → "저도 알아요" (yo también sé), "한국어도 배워요" (también estudio coreano)',
      '만 reemplaza a 이/가 y 을/를 pero no a 에, 에서, 에게 → "학교에서만" (solo en la escuela)',
      '도 reemplaza a 이/가 y 은/는 pero no a 에, 에서 → "학교에서도" (también en la escuela)',
      'Combinaciones posibles: 에서도, 에게도, 한테도, 에서만, 에게만, 한테만',
    ],
    table: [
      ['Partícula base', '+ 만 (solo)', '+ 도 (también)'],
      ['이/가, 은/는', 'N만 (N solo)', 'N도 (N también)'],
      ['을/를', 'N만 (solo N)', 'N도 (también N)'],
      ['에서/에게', 'N에서만 / N에게만', 'N에서도 / N에게도'],
    ],
    mistakes: [
      '"저가만" ❌ → "저만" ✓ — 만 reemplaza a 이/가, no se añade después.',
      '"한국어를도" ❌ → "한국어도" ✓ — 도 reemplaza a 을/를, no se añade.',
      '"학교에만서" ❌ → "학교에서만" ✓ — el orden es: N + postposición + 만/도.',
    ],
  },

  seo: [
    {
      heading: '만 y 도: las partículas enfáticas del coreano',
      paragraphs: [
        '만 (man) y 도 (do) son partículas que añaden matiz a los sustantivos. 만 marca exclusividad ("solo X"), 도 marca inclusión ("también X"). La clave es que reemplazan las partículas básicas de sujeto y objeto: "저만 왔어요" (solo yo vine) = 저 + 만 (reemplaza 이/가); "저도 왔어요" (yo también vine) = 저 + 도 (reemplaza 이/가).',
        'Cuando el sustantivo lleva otras partículas como 에, 에서, 에게, las partículas enfáticas van DESPUÉS: "학교에서만" (solo en la escuela), "친구한테도" (también a mi amigo). El orden es siempre: N + partícula locativa + 만/도.',
      ],
    },
    {
      heading: 'Negación con 만 y 도',
      paragraphs: [
        'Con negación, 만 y 도 producen significados distintos: "저만 안 왔어요" = solo yo no vine (todos los demás sí); "저도 안 왔어요" = yo tampoco vine. En español sería la diferencia entre "solo yo no fui" y "yo tampoco fui".',
        '도 con negación crea "tampoco": "그 영화도 안 봤어요" = tampoco vi esa película. Es un patrón muy frecuente en coreano: "나도 몰라요" (yo tampoco sé).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '만 (solo/exclusión) vs 도 (también/inclusión): partículas enfáticas esenciales.',
    graphicPrompt: 'Diagrama Venn: un círculo con 만 (solo uno) y un círculo grande con 도 (se incluye también).',
    scene: [
      ['저만 한국어를 공부해요.', 'Solo yo estudio coreano.'],
      ['저도 한국어를 공부해요.', 'Yo también estudio coreano.'],
      ['오늘만 일찍 왔어요.', 'Solo hoy vine temprano.'],
      ['오늘도 일찍 왔어요.', 'Hoy también vine temprano.'],
      ['학교에서만 공부해요.', 'Solo estudio en la escuela.'],
      ['그것도 몰라요?', '¿Eso tampoco lo sabes?'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['만 = solo/exclusión', '도 = también/inclusión', 'orden: N + partícula + 만/도'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Solo o también',
        tag: 'Opción múltiple',
        intro: 'Selecciona 만 o 도 según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Tú también tienes hambre.',
            lines: [['', '저___ 배고파요.']],
            options: ['도', '만', '은', '도만'],
            answer: '도',
            explain: '"저도" = yo también. 도 marca inclusión.',
          },
          {
            scene: 'Solo comiste un poco.',
            lines: [['', '조금___ 먹었어요.']],
            options: ['만', '도', '은', '를'],
            answer: '만',
            explain: '"조금만" = solo un poco. 만 marca exclusividad/límite.',
          },
          {
            scene: 'También fui al banco.',
            lines: [['', '은행에___ 갔어요.']],
            options: ['도', '만', '서', '는'],
            answer: '도',
            explain: '"은행에도" = también al banco. 도 se añade después de 에.',
          },
          {
            scene: 'Solo en casa estudio bien.',
            lines: [['', '집에서___ 공부가 잘 돼요.']],
            options: ['만', '도', '는', '가'],
            answer: '만',
            explain: '"집에서만" = solo en casa. 만 se añade después de 에서.',
          },
          {
            scene: 'Mi hermano también lo sabe.',
            lines: [['', '동생___ 알아요.']],
            options: ['도', '만', '은', '가'],
            answer: '도',
            explain: '"동생도" = mi hermano también. 도 reemplaza a 이/가 o 은/는.',
          },
          {
            scene: 'Solo quiero agua.',
            lines: [['', '물___ 주세요.']],
            options: ['만', '도', '을', '이'],
            answer: '만',
            explain: '"물만" = solo agua. 만 reemplaza a 을/를 (objeto directo).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos oraciones paralelas',
        tag: '2 espacios',
        intro: 'Completa las dos oraciones con 만 o 도.',
        type: 'dual',
        items: [
          {
            scene: 'Solo hablas español, pero yo también hablo japonés.',
            lines: [['', '너는 스페인어[[0]] 해. 나는 일본어[[1]] 해.']],
            blanks: [
              { options: ['만', '도', '은', '를'], answer: '만', explain: '"스페인어만" = solo español (exclusión).' },
              { options: ['도', '만', '를', '이'], answer: '도', explain: '"일본어도" = también japonés (inclusión de algo más).' },
            ],
          },
          {
            scene: 'Solo hoy vendré temprano, y también traeré comida.',
            lines: [['', '오늘[[0]] 일찍 올게요. 음식[[1]] 가져올게요.']],
            blanks: [
              { options: ['만', '도', '에', '은'], answer: '만', explain: '"오늘만" = solo hoy.' },
              { options: ['도', '만', '을', '는'], answer: '도', explain: '"음식도" = también comida.' },
            ],
          },
          {
            scene: 'Solo a ti te dije eso, pero también me lo dijo él.',
            lines: [['', '너한테[[0]] 말했어요. 그 사람한테[[1]] 들었어요.']],
            blanks: [
              { options: ['만', '도', '서', '는'], answer: '만', explain: '"너한테만" = solo a ti.' },
              { options: ['서도', '서만', '도', '만'], answer: '서도', explain: '"한테서도" = también de esa persona (origen + también).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Presentación de un estudiante',
        tag: 'Texto guiado',
        intro: 'Completa con 만 o 도 según el contexto.',
        type: 'guidedText',
        scene: '유나가 자기소개를 해요.',
        text: '저는 한국어[[0]] 공부해요. 영어[[1]] 조금 해요. 한국 드라마[[2]] 봐요. 요리[[1]] 좋아해요. 주말에[[0]] 시간이 있어요.',
        blanks: [
          { options: ['만', '도', '을', '는'], answer: '만', explain: '"한국어만" = solo coreano (en exclusivo).' },
          { options: ['도', '만', '를', '이'], answer: '도', explain: '"영어도" = también inglés (inclusión).' },
          { options: ['도', '만', '를', '은'], answer: '도', explain: '"드라마도" = también dramas (inclusión).' },
          { options: ['도', '만', '를', '는'], answer: '도', explain: '"요리도" = también la cocina.' },
          { options: ['만', '도', '에', '는'], answer: '만', explain: '"주말에만" = solo los fines de semana.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con 만 o 도',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe 만 o 도 en el espacio correcto.',
        type: 'freeText',
        scene: '상황에 맞게 만 또는 도를 써 보세요.',
        text: '저___ 한국어를 배워요. (también) / 한 개___ 샀어요. (solo) / 서울에___ 가 봤어요. (también) / 오늘___ 쉬어요. (solo hoy) / 친구한테___ 말했어요. (solo a él)',
        blanks: [
          { answer: '도', explain: '"저도" = yo también.' },
          { answer: '만', explain: '"한 개만" = solo uno.' },
          { answer: '도', explain: '"서울에도" = también en Seúl (도 después de 에).' },
          { answer: '만', explain: '"오늘만" = solo hoy.' },
          { answer: '만', explain: '"친구한테만" = solo a mi amigo.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye oraciones con 만/도',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa con 만 o 도.',
        type: 'write',
        items: [
          {
            scene: 'Yo también voy a Seúl.',
            prompt: '저___ 서울에 가요.',
            answer: '저도 서울에 가요.',
            accepted: ['나도 서울에 가요.'],
            explain: '"저도" = yo también. 도 reemplaza 이/가.',
          },
          {
            scene: 'Solo los fines de semana descansas.',
            prompt: '주말___만 쉬어요.',
            answer: '주말에만 쉬어요.',
            accepted: ['주말만 쉬어요.'],
            explain: '"주말에만" = solo los fines de semana. 만 después de 에.',
          },
          {
            scene: 'También leo libros en inglés.',
            prompt: '영어 책___ 읽어요.',
            answer: '영어 책도 읽어요.',
            accepted: ['영어로도 읽어요.'],
            explain: '"책도" = también libros. 도 reemplaza 을/를.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe sobre tus preferencias',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones propias usando 만 y 도 para expresar exclusividad e inclusión.',
        type: 'write',
        items: [
          {
            scene: 'Describe qué idiomas estudias usando 만 y 도.',
            prompt: '어떤 언어를 공부해요? 만과 도를 사용해서 써 보세요.',
            answer: '저는 스페인어만 공부해요. 하지만 한국어도 배우고 싶어요.',
            accepted: ['영어와 한국어를 공부해요. 일본어도 배워요.'],
            explain: '"만" = solo esa lengua; "도" = esa lengua además de otras.',
          },
          {
            scene: 'Describe algo que solo haces en un lugar o momento específico.',
            prompt: '어디에서만, 언제만 하는 일을 써 보세요.',
            answer: '집에서만 한국어를 공부해요. 주말에만 친구를 만나요.',
            accepted: ['아침에만 커피를 마셔요. 지하철에서도 공부해요.'],
            explain: '"에서만" = solo en ese lugar; "에서도" = también en ese lugar.',
          },
        ],
      },
    ],
  },
}

export default topic
