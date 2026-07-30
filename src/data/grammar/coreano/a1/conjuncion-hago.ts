import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'conjuncion-hago',
  order: '16',
  color: '#c60c30',
  category: 'Partículas',
  level: 'A1',
  title: 'Conjunción y/con en Coreano A1 — 하고 / 와 / 과',
  shortTitle: 'Conjunción 하고 / 와 / 과',
  metaTitle: 'Conjunción y con coreano A1 — 하고 와 과 coreano principiantes',
  description:
    '하고 (hago), 와 (wa) y 과 (gwa) son las partículas para conectar sustantivos en coreano ("y" / "con"). 하고 es coloquial y universal. 와/과 son formales: 와 va después de vocal, 과 después de consonante. En A1 se prioriza 하고 para la producción activa.',
  lead: '하고(hago) = y / con (coloquial). 와(wa) = y (formal, después de vocal). 과(gwa) = y (formal, después de consonante). También 랑/이랑 (muy informal). 사과하고 바나나(manzana y banana). 친구하고 가요(voy con un amigo).',
  outcomes: [
    'Usa 하고 para conectar sustantivos y expresar "con" en conversación',
    'Aplica 와/과 según la vocal o consonante final del sustantivo',
    'Distingue los tres niveles de formalidad: 하고 / 와과 / 랑이랑',
  ],

  guide: {
    goal: 'Conectar sustantivos con 하고 y 와/과 para expresar "y" y "con" en coreano.',
    model: '사과하고 바나나를 샀어요. (Compré manzanas y bananas.) / 친구하고 영화를 봤어요. (Vi una película con un amigo.)',
    formula: 'Sustantivo + 하고 + Sustantivo | Vocal + 와 | Consonante + 과',
    decisions: [
      '하고: universal, coloquial, se puede usar con cualquier sustantivo',
      '와: después de sustantivo terminado en VOCAL: 사과+와(sag-wa) = 사과와',
      '과: después de sustantivo terminado en CONSONANTE: 친구+과... NO, 친구 termina en vocal → 와',
      'Ejemplo 과: 밥+과(gwa) = 밥과 (arroz+consonante ㅂ → 과)',
      'Ejemplo 와: 커피+와 = 커피와 (café+vocal ㅣ → 와)',
      '랑/이랑: muy informal (entre amigos): 친구랑, 엄마랑. 이랑 después de consonante: 밥이랑',
      'DOBLE USO: 하고/와/과 también significan "CON" (persona o cosa): 친구하고 가요 = voy con un amigo',
    ],
    table: [
      ['Partícula', 'Uso', 'Ejemplo'],
      ['하고 (hago)', 'Coloquial — cualquier sustantivo', '빵하고 커피 = pan y café'],
      ['와 (wa)', 'Formal — tras vocal', '사과와 배 = manzana y pera'],
      ['과 (gwa)', 'Formal — tras consonante', '밥과 국 = arroz y sopa'],
      ['랑 (rang)', 'Muy informal — tras vocal', '친구랑 = con el amigo'],
      ['이랑 (irang)', 'Muy informal — tras consonante', '밥이랑 = y arroz'],
    ],
    mistakes: [
      '"사과과" ❌ — 사과 termina en vocal ㅏ → 와: "사과와" ✓',
      '"밥와" ❌ — 밥 termina en consonante ㅂ → 과: "밥과" ✓',
      '"친구와 가요" puede sonar formal ✓ pero para A1 es más natural "친구하고 가요" ✓',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se conectan sustantivos en coreano (하고, 와/과)?',
      paragraphs: [
        'En coreano, la conjunción "y" entre sustantivos se expresa con partículas: 하고(hago), 와(wa) o 과(gwa). A diferencia del español donde "y" es siempre la misma palabra, en coreano la forma depende del nivel de formalidad y de la sílaba final del sustantivo que precede a la partícula.',
        'Para principiantes, la recomendación es clara: aprende 하고 primero. Es coloquial, válida en casi cualquier situación y no tiene ninguna regla de selección — va con todo. Una vez consolidada, puedes añadir 와/과 para registros más formales.',
      ],
    },
    {
      heading: '¿Cuándo se usa 와 y cuándo 과 en coreano?',
      paragraphs: [
        '와 va después de un sustantivo cuya sílaba final termina en VOCAL: 커피와(café y...), 사과와(manzana y...), 의자와(silla y...). 과 va después de sustantivo cuya final es CONSONANTE: 밥과(arroz y...), 책과(libro y...), 선생님과(maestro y...).',
        'Una pista mnemotécnica: 와(wa) empieza por vocal → va con sustantivos que terminan en vocal. 과(gwa) empieza por consonante → con sustantivos que terminan en consonante.',
      ],
      table: [
        ['Sustantivo', 'Final', 'Partícula', 'Resultado'],
        ['커피 (café)', 'vocal ㅣ', '와', '커피와'],
        ['사과 (manzana)', 'vocal ㅏ', '와', '사과와'],
        ['밥 (arroz)', 'consonante ㅂ', '과', '밥과'],
        ['책 (libro)', 'consonante ㄱ', '과', '책과'],
      ],
    },
    {
      heading: 'No solo "y": también significa "con"',
      paragraphs: [
        'Una característica importantísima: 하고/와/과 también significan "con" cuando conectan una persona o cosa con un verbo de acción. 친구하고 가요(voy CON un amigo), 엄마하고 쇼핑해요(voy de compras CON mamá), 선생님과 공부해요(estudio CON el maestro).',
        'En español usamos "y" para listas y "con" para compañía. En coreano, 하고/와/과 cubre ambas funciones. El significado exacto lo da el contexto: si hay una lista de objetos → "y"; si hay un verbo de acción compartida → "con".',
      ],
    },
    {
      heading: '¿Qué son 랑/이랑 en coreano?',
      paragraphs: [
        '랑(rang) e 이랑(irang) son la versión más coloquial e informal de las partículas de conjunción. Se usan entre amigos cercanos y familiares. La misma regla de vocal/consonante aplica: 랑 después de vocal (친구랑, 커피랑), 이랑 después de consonante (밥이랑, 선생님이랑).',
        'En A1 es suficiente con reconocerlas. Para producción activa, 하고 es la opción más segura y natural en cualquier contexto.',
      ],
    },
  ],

  visual: {
    mode: 'conjunction',
    teacherLens: '하고(coloquial/universal), 와(vocal+formal), 과(consonante+formal), 랑/이랑(informal). Doble uso: y / con.',
    graphicPrompt: 'Diagrama de tres niveles de formalidad con ejemplos de listas y compañía.',
    scene: [
      ['사과하고 바나나', 'manzana y banana (하고 = coloquial)'],
      ['커피와 주스', 'café y jugo (와 = vocal final + formal)'],
      ['밥과 국', 'arroz y sopa (과 = consonante final + formal)'],
      ['친구하고 가요', 'voy con un amigo (하고 = "con")'],
      ['엄마랑 쇼핑해요', 'voy de compras con mamá (랑 = informal)'],
      ['책과 펜', 'libro y bolígrafo (과 = libro→ㄱ consonante)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['하고 universal', '와 vocal / 과 consonante', 'hago/wa/gwa = y / con'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Nivel 1 — Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Elige la partícula correcta para conectar los sustantivos.',
        type: 'choice',
        items: [
          {
            scene: 'Lista de compras',
            lines: [['Carlos', '사과 ___ 바나나를 샀어요. (Compré manzanas y bananas.)']],
            options: ['하고', '가', '를', '에'],
            answer: '하고',
            explain: '하고 = y (coloquial). 사과하고 바나나 = manzanas y bananas.',
          },
          {
            scene: 'Con amigos',
            lines: [['Ana', '친구 ___ 영화를 봤어요. (Vi una película con un amigo.)']],
            options: ['하고', '에서', '가', '이'],
            answer: '하고',
            explain: '하고 = con (compañía). 친구하고 = con un amigo.',
          },
          {
            scene: 'Formal — manzana',
            lines: [['Clara', '사과 ___ 배는 맛있어요. (La manzana y la pera están ricas. — formal)']],
            options: ['와', '과', '하고', '랑'],
            answer: '와',
            explain: '사과 termina en vocal ㅏ → 와. 사과와 배 (formal).',
          },
          {
            scene: 'Formal — arroz',
            lines: [['Gael', '밥 ___ 김치를 먹어요. (Como arroz y kimchi. — formal)']],
            options: ['과', '와', '하고', '랑'],
            answer: '과',
            explain: '밥 termina en consonante ㅂ → 과. 밥과 김치 (formal).',
          },
          {
            scene: 'Muy informal',
            lines: [['Lina', '오빠 ___ 같이 가요. (Voy con mi hermano mayor. — muy informal)']],
            options: ['랑', '과', '와', '하고'],
            answer: '랑',
            explain: '오빠 termina en vocal ㅏ → 랑 (informal). 오빠랑 = con el hermano (informal).',
          },
          {
            scene: 'Selección 와/과',
            lines: [['Sofia', '책 ___ 펜을 주세요. (Deme un libro y un bolígrafo. — formal)']],
            options: ['과', '와', '하고', '이랑'],
            answer: '과',
            explain: '책 termina en consonante ㄱ → 과. 책과 펜 (formal).',
          },
          {
            scene: 'Con quién',
            lines: [['Marco', '누구 ___ 공부해요? (¿Con quién estudias?)']],
            options: ['하고', '에서', '가', '를'],
            answer: '하고',
            explain: '누구하고 = ¿con quién? 하고 = "con" en preguntas y afirmaciones.',
          },
          {
            scene: 'Tres registros',
            lines: [['Gael', '친구 ___ 갔어요 (더 격식체). (Fui con un amigo. — más formal)']],
            options: ['와', '하고', '랑', '이랑'],
            answer: '와',
            explain: '친구 termina en vocal ㅜ → 와 (formal). 친구와 갔어요.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Nivel 2 — Diálogo con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los diálogos con la partícula de conjunción correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Lista para el desayuno',
            lines: [
 ['Carlos', '아침에 뭐 먹어요? (¿Qué comes en el desayuno?)'],
 ['Ana', '빵 [[0]] 커피 [[1]] 과일을 먹어요. (Como pan, café y fruta.)'],
 ],
            blanks: [
              { options: ['하고', '와', '과', '가'], answer: '하고', explain: '하고 = y (coloquial). 빵하고 = pan y...' },
              { options: ['하고', '와', '과', '랑'], answer: '하고', explain: 'Segunda lista: 커피하고 과일 = café y fruta.' },
            ],
          },
          {
            scene: 'Día de compras',
            lines: [
 ['Sofia', '오늘 누구 [[0]] 쇼핑했어요? (¿Con quién fuiste de compras hoy?)'],
 ['Lina', '언니 [[1]] 같이 갔어요. (Fui con mi hermana mayor.)'],
 ],
            blanks: [
              { options: ['하고', '에서', '가', '를'], answer: '하고', explain: '누구하고 = ¿con quién? hago = "con".' },
              { options: ['하고', '와', '과', '랑'], answer: '하고', explain: '언니하고 = con la hermana mayor. 하고 = "con".' },
            ],
          },
          {
            scene: 'Descripción formal',
            lines: [
 ['Clara', '한국어 수업에서 뭐 배워요? (¿Qué aprenden en la clase de coreano?)'],
 ['Gael', '문법 [[0]] 발음 [[1]] 듣기를 배워요. (Aprendemos gramática, pronunciación y escucha — formal)'],
 ],
            blanks: [
              { options: ['과', '와', '하고', '이랑'], answer: '과', explain: '문법 termina en consonante ㅂ → 과 (formal).' },
              { options: ['과', '와', '하고', '이랑'], answer: '과', explain: '발음 termina en consonante ㅁ → 과 (formal).' },
            ],
          },
          {
            scene: 'Fin de semana informal',
            lines: [
 ['Marco', '주말에 뭐 했어요? (¿Qué hiciste el fin de semana?)'],
 ['Carlos', '친구 [[0]] 카페 [[1]] 공원에 갔어요. (Fui con un amigo al café y al parque.)'],
 ],
            blanks: [
              { options: ['랑', '와', '과', '이랑'], answer: '랑', explain: '친구랑 = con el amigo (informal). 친구 vocal → 랑.' },
              { options: ['하고', '와', '과', '랑'], answer: '하고', explain: '카페하고 공원 = café y parque (coloquial).' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el texto con la partícula de conjunción correcta.',
        type: 'guidedText',
        scene: 'Lina habla de su fin de semana',
        text: '이번 주말에 저는 엄마 [[0]] 시장에 갔어요. (Fui al mercado con mamá.) 사과 [[1]] 배 [[2]] 딸기를 샀어요. (Compré manzanas, peras y fresas.) 점심에는 친구 [[3]] 같이 밥 [[4]] 김치를 먹었어요. (Al almuerzo comí arroz y kimchi con un amigo.) 오후에는 동생 [[5]] 공원을 산책했어요. (Por la tarde paseé por el parque con mi hermano/a menor.)',
        blanks: [
          { options: ['하고', '와', '과', '랑'], answer: '하고', explain: '엄마하고 = con mamá (coloquial).' },
          { options: ['하고', '와', '과', '랑'], answer: '하고', explain: '사과하고 = manzanas y... (coloquial).' },
          { options: ['하고', '와', '과', '랑'], answer: '하고', explain: '배하고 딸기 = peras y fresas.' },
          { options: ['하고', '와', '과', '랑'], answer: '하고', explain: '친구하고 = con un amigo (hago = "con").' },
          { options: ['과', '와', '하고', '이랑'], answer: '과', explain: '밥+consonante ㅂ → 과. 밥과 김치 (formal).' },
          { options: ['하고', '와', '과', '랑'], answer: '하고', explain: '동생하고 = con el/la hermano/a menor.' },
        ],
      },
      {
        id: 'l4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la partícula correcta (하고, 와, 과, 랑, 이랑).',
        type: 'freeText',
        scene: 'Descripciones con diferentes niveles de formalidad',
        text: '책 [[0]] 공책을 사세요. (Compre un libro y un cuaderno — formal.) / 오빠 [[1]] 같이 영화를 봤어요. (Vi la peli con mi hermano — informal.) / 커피 [[2]] 녹차를 마셔요. (Bebo café y té verde — formal.) / 친구 [[3]] 선생님 [[4]] 이야기했어요. (Hablé con el amigo y el maestro — coloquial.)',
        blanks: [
          { answer: '과', accepted: ['과'], explain: '책(책ㄱ consonante) → 과. 책과 공책 (formal).' },
          { answer: '랑', accepted: ['랑', '하고'], explain: '오빠(vocal ㅏ) + informal → 랑. 오빠랑. (하고 también válido).' },
          { answer: '와', accepted: ['와'], explain: '커피(vocal ㅣ) → 와. 커피와 녹차 (formal).' },
          { answer: '하고', accepted: ['하고'], explain: '친구하고 = con el amigo (하고 = "con" coloquial).' },
          { answer: '하고', accepted: ['하고'], explain: '선생님하고 이야기했어요 = hablé con el maestro.' },
        ],
      },
      {
        id: 'l5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones usando 하고, 와 o 과.',
        type: 'write',
        items: [
          {
            scene: 'Tu desayuno',
            prompt: 'Di qué comes en el desayuno usando 하고 para conectar dos cosas (coloquial).',
            answer: '저는 빵하고 커피를 마셔요.',
            accepted: ['하고', '와', '과'],
            explain: 'Usa [alimento]하고[alimento]. 하고 = y (coloquial).',
          },
          {
            scene: 'Con quién estudias',
            prompt: 'Di con quién estudias coreano: [persona]하고 한국어를 공부해요.',
            answer: '친구하고 한국어를 공부해요.',
            accepted: ['하고', '와', '과', '랑'],
            explain: 'hago = "con" para compañía. [persona]하고 = con [persona].',
          },
          {
            scene: 'Lista formal',
            prompt: 'Escribe una lista formal: 책과 공책과 펜이 있어요. (Hay libro, cuaderno y bolígrafo.)',
            answer: '책과 공책과 펜이 있어요.',
            accepted: ['과', '와'],
            explain: '책(ㄱ consonante)→과, 공책(ㄱ consonante)→과. Forma formal con 과.',
          },
          {
            scene: 'Informal con amigo',
            prompt: 'Di informalmente que fuiste con un amigo al cine (영화관=cine, 갔어요=fui).',
            answer: '친구랑 영화관에 갔어요.',
            accepted: ['랑', '하고'],
            explain: '랑 = informal con vocal. 친구랑 = con el amigo (informal).',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Describe un día usando las tres partículas de conjunción.',
        type: 'write',
        items: [
          {
            scene: 'Desayuno y almuerzo',
            prompt: 'Di qué comiste hoy: 아침에 ___하고 ___를 먹었어요. 점심에 ___와/과 ___를 먹었어요.',
            answer: '아침에 빵하고 커피를 먹었어요. 점심에 밥과 국을 먹었어요.',
            accepted: ['하고', '와', '과'],
            explain: 'Usa 하고 para el desayuno (coloquial) y 와/과 para el almuerzo (formal). ¡Practica los dos!',
          },
          {
            scene: 'Con quién y qué',
            prompt: 'Di con quién y qué hiciste: [persona]하고 [lugar/actividad]에 갔어요/했어요.',
            answer: '친구하고 카페에 갔어요. 커피하고 케이크를 먹었어요.',
            accepted: ['하고', '랑', '이랑'],
            explain: '하고 = "con" (compañía) + 하고 = "y" (lista). Una sola partícula, dos usos.',
          },
          {
            scene: 'Lista formal',
            prompt: 'Escribe una lista formal de tres cosas que tienes: ___과/와 ___과/와 ___이/가 있어요.',
            answer: '책과 공책과 펜이 있어요.',
            accepted: ['과', '와'],
            explain: 'Recuerda: 과 tras consonante, 와 tras vocal. Forma formal para listas.',
          },
        ],
      },
    ],
  },
}

export default topic
