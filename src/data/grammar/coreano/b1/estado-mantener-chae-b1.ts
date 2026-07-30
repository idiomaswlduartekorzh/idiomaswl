import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'estado-mantener-chae-b1',
  order: '08',
  color: '#c60c30',
  category: 'Estado y condición',
  level: 'B1',
  title: '-은 채로 / -은 체로: Mantener un Estado en Coreano B1',
  shortTitle: '-은 채로 (manteniendo el estado)',
  metaTitle: '-은 채로 / -은 체로 en Coreano B1 — Expresar Estado Mantenido',
  description:
    '-은 채로 (o -은 체로 en variante) expresa que un estado o condición se mantiene a través de tiempo o a través de otra acción. Literal: "-은" (pasado/estado) + "채로" (como, en condición de). Se usa para: "de pie" (permanecer de pie), "con los ojos cerrados" (mantener ojos cerrados), "dormido" (permanecer durmiendo). Fundamental para descripciones en B1.',
  lead: 'Domina -은 채로 para expresar estados que se mantienen: "de pie", "dormido", "con la puerta abierta..."',
  outcomes: [
    'Forma descripciones de estado mantenido con -은 채로',
    'Expresa condiciones que persisten a través de una acción',
    'Distingues -은 채로 de -고 있다 (acción progresiva)',
    'Usa en contextos de descripción de escenas y narrativa',
  ],

  guide: {
    goal: 'Describir que un estado o condición se mantiene durante una acción o en un momento específico.',
    model: '문을 열은 채로 나갔어요. 눈을 감은 채로 생각했어요. (Me fui dejando la puerta abierta. Pensé con los ojos cerrados.)',
    formula: '과거형 + 채로 (어떤 상태로 계속 유지되다)',
    decisions: [
      '-은 채로: forma pasada + 채로 (en condición de)',
      '만약 동사라면 과거형 사용: 열은 채로 (con la puerta abierta)',
      '형용사라면 기본형으로: 차가운 채로 (en condición de fría/frío)',
      '-은 체로는 같은 의미지만 요즘은 -은 채로가 더 흔함',
      '공간: 문을 열은 채로 (dejar algo abierto) vs 시간: 밤새 일한 채로 깼어요 (despertó sin dormir toda la noche)',
    ],
    table: [
      ['Estructura', 'Significado', 'Ejemplo'],
      ['-은 채로', 'Manteniendo estado', '눈을 감은 채로 → con los ojos cerrados (manteniéndolos cerrados)'],
      ['-은 체로', 'Igual (forma arcaica)', '눈을 감은 체로 → con los ojos cerrados (forma antigua)'],
      ['vs -고 있다', 'Acción progresiva', '눈을 감고 있어요 → estoy (en el acto de) cerrar los ojos'],
    ],
    mistakes: [
      '"-는 채로" no existe; es "-은 채로" siempre.',
      '"침대에 누운 채로 책을 읽어요" ✓ (acción con estado mantenido) vs "침대에 누워서 책을 읽어요" ✓ (acción desde posición).',
      'No confundas -은 채로 (state MAINTAINED) con -으면서 (while doing something).',
    ],
  },

  seo: [
    {
      heading: '¿Qué es -은 채로?',
      paragraphs: [
        '-은 채로 expresa que un estado o condición se mantiene a través de una acción o en un momento específico. Literal: "-은" (forma pasada/estado) + "채" (condición, modo) + "로" (en, como). Juntos: "en la condición de [estado]".',
        'Se usa para describir escenas donde algo permanece en cierto estado mientras sucede otra acción: "de pie", "dormido", "con la puerta abierta", "con los zapatos puestos".',
      ],
    },
    {
      heading: '¿En qué contextos se usa -(으)ㄴ 채로 en coreano?',
      paragraphs: [
        'Espacial (condiciones de lugar/objeto): "문을 열은 채로 나갔어요" (me fui dejando la puerta abierta). "불을 켠 채로 잤어요" (dormí dejando la luz encendida). El estado de la "puerta" y la "luz" se mantiene.',
        'Temporal (estados del cuerpo/mente): "눈을 감은 채로" (con los ojos cerrados), "서 있는 채로" (de pie), "침대에 누운 채로" (acostado en cama). Describe la posición/condición que se mantiene.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre -(으)ㄴ 채로 y -고 있다?',
      paragraphs: [
        '-은 채로 describe un estado MANTENIDO: "문을 열은 채로" (la puerta está abierta y así se mantiene). -고 있다 describe una ACCIÓN EN PROGRESO: "문을 열고 있어요" (estoy en el acto de abrir la puerta, aún en proceso).',
        'Diferencia clave: -은 채로 es situación/condición; -고 있다 es actividad. "누운 채로 책을 읽어요" (leo mientras estoy acostado — estado mantenido) vs "누우면서 책을 읽어요" (me acuesto mientras leo).',
      ],
    },
    {
      heading: '-은 체로 (variante arcaica)',
      paragraphs: [
        '-은 체로 tiene el mismo significado que -은 채로 pero es más arcaico/literario. En coreano moderno, -은 채로 es la forma estándar. Ejemplos antiguos usan -은 체로, pero hoy es raro en oralidad.',
        'Para TOPIK II, ambas formas son válidas pero -은 채로 es mucho más frecuente.',
      ],
    },
    {
      heading: 'Ejemplo en narrativa descriptiva',
      paragraphs: [
        'Descripción de escena: "창문을 열은 채로 방은 매우 추워졌어요" (con la ventana abierta, la habitación se enfró mucho). La ventana mantiene su condición abierta, lo que causa la consecuencia (frío).',
        'Acción con estado: "아이가 옷을 입지 않은 채로 밖에 나갔어요" (el niño salió sin ponerse ropa). La falta de ropa se mantiene durante la acción de salir.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-은 채로: estado mantenido durante acción. vs -고 있다: acción progresiva.',
    graphicPrompt: 'Tabla: -은 채로 (estado) vs -고 있다 (progresiva). Ejemplos descriptivos.',
    scene: [
      ['문을 열은 채로 나갔어요.', 'Me fui dejando la puerta abierta.'],
      ['눈을 감은 채로 생각했어요.', 'Pensé con los ojos cerrados.'],
      ['불을 켠 채로 잤어요.', 'Dormí dejando la luz encendida.'],
      ['침대에 누운 채로 책을 읽어요.', 'Leo mientras estoy acostado.'],
      ['신발을 신은 채로 들어왔어요.', 'Entré sin quitarme los zapatos.'],
      ['옷을 입지 않은 채로 나왔어요.', 'Salí sin ropa.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['상태 유지', '기술 -은 채로', '대비 -고 있다'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma -은 채로',
        tag: 'Múltipla escolha',
        intro: 'Selecciona la forma correcta de -은 채로.',
        type: 'choice',
        items: [
          {
            scene: 'Verbo + -은 채로',
            lines: [['', '문을 ___ 채로 나갔어요. (열다)']],
            options: ['열 채로', '열은 채로', '열고 있는 채로', '연 채로'],
            answer: '열은 채로',
            explain: '열다 → 열은 채로 (con la puerta abierta).',
          },
          {
            scene: '-은 채로 con negación',
            lines: [['', '신발을 ___ 채로 들어왔어요. (신다)']],
            options: ['신 채로', '신은 채로', '신지 않은 채로', '신 안 된 채로'],
            answer: '신은 채로',
            explain: '신다 → 신은 채로 (con zapatos puestos).',
          },
          {
            scene: '-은 채로 vs -고 있다',
            lines: [['', '눈을 감___ 책을 읽어요. (mantener cerrados vs en acto)']],
            options: ['고 있는 채로', '은 채로', '으면서', '-는 채로'],
            answer: '은 채로',
            explain: '-은 채로 expresa estado mantenido (ojos cerrados).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Estado mantenido en contexto',
        tag: '2 decisiones',
        intro: 'Completa con -은 채로 según el contexto.',
        type: 'dual',
        items: [
          {
            scene: 'Espacio vs temporal',
            lines: [['', " : 창문을 열[[0]] 밤을 새웠어요. (espacio) / : 침대에 누[[1]] 책을 읽어요. (temporal)"]],
            blanks: [
              { options: ['-은 채로', '-고 있는'], answer: '-은 채로', explain: '-은 채로 mantiene el estado de ventana abierta.' },
              { options: ['-은 채로', '-고 있는'], answer: '-은 채로', explain: '-은 채로 mantiene posición acostado.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Narrativa descriptiva',
        tag: 'Texto guiado',
        intro: 'Completa una escena descriptiva con -은 채로.',
        type: 'guidedText',
        scene: 'Descripción de una casa en desorden.',
        text: '집 안은 창문을 [[0]] 매우 추웠어요. 불을 [[1]] 방은 밝았고, 문을 [[2]] 통풍이 잘 되었어요. 아이들이 신발을 [[3]] 소파에 앉아 있었어요.',
        blanks: [
          { options: ['-은 채로', '-고'], answer: '-은 채로', explain: '상태 유지: 창문이 열려 있는 상태로.' },
          { options: ['-은 채로', '-고'], answer: '-은 채로', explain: '상태 유지: 불이 켜진 상태로.' },
          { options: ['-은 채로', '-고'], answer: '-은 채로', explain: '상태 유지: 문이 열린 상태로.' },
          { options: ['-은 채로', '-고'], answer: '-은 채로', explain: '상태 유지: 신발을 신은 상태로.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escritura de escenas',
        tag: 'Texto libre',
        intro: 'Escribe descripciones de escenas usando -은 채로.',
        type: 'freeText',
        scene: 'Descripción de situaciones cotidianas.',
        text: '1. [[0]] (Durmió dejando la luz encendida). 2. [[1]] (Entró sin quitarse el abrigo). 3. [[2]] (Leyó acostado).',
        blanks: [
          { answer: '불을 켠 채로 잤어요', accepted: ['-은 채로', '켜'], explain: '-은 채로 con luz encendida.' },
          { answer: '코트를 입은 채로 들어왔어요', accepted: ['-은 채로', '코트'], explain: '-은 채로 con abrigo puesto.' },
          { answer: '누운 채로 책을 읽었어요', accepted: ['-은 채로', '누운'], explain: '-은 채로 con posición acostado.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción de descripciones',
        tag: 'Producción',
        intro: 'Describe una habitación o escena usando -은 채로.',
        type: 'write',
        items: [
          {
            scene: 'Descripción de desorden',
            prompt: 'Describe una habitación en desorden usando 3+ expresiones de -은 채로.',
            answer: '침대는 이불을 펴진 채로 있었고, 창문은 열린 채로 바람이 불어왔어요. 책상에는 물컵을 엎은 채로 종이가 젖어 있었어요.',
            accepted: ['-은 채로', 'descripción', 'escena'],
            explain: 'Múltiples estados mantenidos describiendo desorden.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de -은 채로 vs -으면서',
        tag: 'Análise',
        intro: 'Explica la diferencia con otra estructura de simultaneidad.',
        type: 'write',
        items: [
          {
            scene: 'Estado vs simultaneidad',
            prompt: '"누운 채로" vs "누우면서": ¿cuál es la diferencia?',
            answer: '"누운 채로" = mantener estado acostado (ya está acostado cuando sucede X). "누우면서" = acción simultánea de acostarse y otra cosa. -은 채로 es estado precedente; -으면서 es acción paralela.',
            accepted: ['상태', '동작', '순서'],
            explain: '-은 채로 expresa estado precedente; -으면서 expresa acciones paralelas.',
          },
        ],
      },
    ],
  },
}

export default topic
