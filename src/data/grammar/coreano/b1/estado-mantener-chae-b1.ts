import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'estado-mantener-chae-b1',
  order: '08',
  color: '#c60c30',
  category: 'Estado y condición',
  level: 'B1',
  title: '-(으)ㄴ 채로: Mantener un Estado en Coreano B1',
  shortTitle: '-(으)ㄴ 채로 (manteniendo el estado)',
  metaTitle: '-(으)ㄴ 채로 en Coreano B1 — Expresar un Estado Mantenido',
  description:
    '-(으)ㄴ 채로 expresa que un estado ya establecido se mantiene mientras ocurre otra acción: "con la puerta abierta", "con los ojos cerrados" o "con los zapatos puestos". Se forma con la forma atributiva pasada/estativa del verbo y 채로, «en ese estado».',
  lead: 'Domina -(으)ㄴ 채로 para describir acciones realizadas sin cambiar un estado previo.',
  outcomes: [
    'Forma descripciones de estado mantenido con -(으)ㄴ 채로',
    'Expresa condiciones que persisten a través de una acción',
    'Distingues -은 채로 de -고 있다 (acción progresiva)',
    'Usa en contextos de descripción de escenas y narrativa',
  ],

  guide: {
    goal: 'Describir que un estado ya establecido se mantiene mientras ocurre otra acción.',
    model: '문을 연 채로 나갔어요. 눈을 감은 채로 생각했어요. (Me fui dejando la puerta abierta. Pensé con los ojos cerrados.)',
    formula: 'V-(으)ㄴ 채(로) | A-(으)ㄴ 채(로) | V-고 있는 채로',
    decisions: [
      'La forma atributiva -(으)ㄴ presenta un estado ya establecido: 문을 연 채로',
      'Con adjetivos o estados resultantes: 차가운 채로, 젖은 채로',
      'Para estados en curso o de postura también aparece -고 있는 채로: 서 있는 채로',
      '채로 y 채 son posibles; 채로 presenta con claridad la condición mantenida',
      'El estado inicial se conserva mientras ocurre la acción principal',
    ],
    table: [
      ['Estructura', 'Significado', 'Ejemplo'],
      ['-(으)ㄴ 채로', 'Estado resultante mantenido', '눈을 감은 채로 → con los ojos cerrados'],
      ['-고 있는 채로', 'Estado o acción en curso mantenidos', '서 있는 채로 → permaneciendo de pie'],
      ['-(으)ㄴ 체하다', 'Fingir que...', '자는 체했어요 → fingió dormir'],
    ],
    mistakes: [
      '"문을 열은 채로" ❌ → "문을 연 채로" ✓ porque 열다 pierde ㄹ ante ㄴ.',
      'No confundas -고 있는 채로 con una forma simple en -는: describe un estado en curso mantenido.',
      'No confundas -(으)ㄴ 채로 (estado mantenido) con -(으)면서 (dos acciones simultáneas).',
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
        'Condiciones de lugar u objeto: "문을 연 채로 나갔어요" (me fui dejando la puerta abierta). "불을 켠 채로 잤어요" (dormí dejando la luz encendida). El estado de la puerta y la luz se mantiene.',
        'Temporal (estados del cuerpo/mente): "눈을 감은 채로" (con los ojos cerrados), "서 있는 채로" (de pie), "침대에 누운 채로" (acostado en cama). Describe la posición/condición que se mantiene.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre -(으)ㄴ 채로 y -고 있다?',
      paragraphs: [
        '-(으)ㄴ 채로 presenta un estado resultante que continúa: "문을 연 채로" (con la puerta abierta). -고 있다 presenta una acción o estado en curso: "문을 열고 있어요" puede significar que alguien está abriendo o manteniendo abierta la puerta, según el contexto.',
        'Diferencia clave: -은 채로 es situación/condición; -고 있다 es actividad. "누운 채로 책을 읽어요" (leo mientras estoy acostado — estado mantenido) vs "누우면서 책을 읽어요" (me acuesto mientras leo).',
      ],
    },
    {
      heading: 'No confundas 채로 con -(으)ㄴ 체하다',
      paragraphs: [
        '체하다 no es una variante de 채로. La construcción -(으)ㄴ/는 체하다 significa «fingir que»: 자는 체했어요 (fingió dormir), 모르는 체했어요 (fingió no saber).',
        'En cambio, -(으)ㄴ 채로 describe un estado real que se mantiene: 눈을 감은 채로 있었어요 (permaneció con los ojos cerrados).',
      ],
    },
    {
      heading: 'Ejemplo en narrativa descriptiva',
      paragraphs: [
        'Descripción de escena: "창문을 연 채로 두어서 방이 매우 추워졌어요" (como dejaron la ventana abierta, la habitación se enfrió mucho). La ventana mantiene su condición abierta.',
        'Acción con estado: "아이가 옷을 입지 않은 채로 밖에 나갔어요" (el niño salió sin ponerse ropa). La falta de ropa se mantiene durante la acción de salir.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-은 채로: estado mantenido durante acción. vs -고 있다: acción progresiva.',
    graphicPrompt: 'Tabla: -은 채로 (estado) vs -고 있다 (progresiva). Ejemplos descriptivos.',
    scene: [
      ['문을 연 채로 나갔어요.', 'Me fui dejando la puerta abierta.'],
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
        title: 'Forma -(으)ㄴ 채로',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma correcta de -(으)ㄴ 채로.',
        type: 'choice',
        items: [
          {
            scene: 'Verbo + -은 채로',
            lines: [['', '문을 ___ 채로 나갔어요. (열다)']],
            options: ['연', '열은', '열고', '여는'],
            answer: '연',
            explain: '열다 → 연 채로: la ㄹ cae ante ㄴ.',
          },
          {
            scene: '-은 채로 con negación',
            lines: [['', '신발을 ___ 채로 들어왔어요. (신다)']],
            options: ['신은', '신', '신는', '신고'],
            answer: '신은',
            explain: '신다 → 신은 채로 (con zapatos puestos).',
          },
          {
            scene: '-은 채로 vs -고 있다',
            lines: [['', '눈을 ___ 책을 읽어요. (mantener los ojos cerrados)']],
            options: ['감은 채로', '감는 채로', '감으면서', '감고 있다'],
            answer: '감은 채로',
            explain: '-은 채로 expresa estado mantenido (ojos cerrados).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Estado mantenido en contexto',
        tag: '2 decisiones',
        intro: 'Completa las dos formas según el estado descrito.',
        type: 'dual',
        items: [
          {
            scene: 'Espacio vs temporal',
            lines: [['', '창문을 [[0]] 밤을 새웠어요. / 침대에 [[1]] 책을 읽었어요.']],
            blanks: [
              { options: ['연 채로', '열면서'], answer: '연 채로', explain: '연 채로 mantiene el estado de la ventana abierta.' },
              { options: ['누운 채로', '누우면서'], answer: '누운 채로', explain: '누운 채로 mantiene la posición acostada.' },
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
        text: '집 안은 창문을 [[0]] 두어서 매우 추웠어요. 불을 [[1]] 잠들어서 방은 계속 밝았고, 문을 [[2]] 두어서 통풍이 잘 되었어요. 아이들이 신발을 [[3]] 소파에 앉아 있었어요.',
        blanks: [
          { options: ['연 채로', '열면서'], answer: '연 채로', explain: '상태 유지: 창문이 열려 있는 상태로.' },
          { options: ['켠 채로', '켜면서'], answer: '켠 채로', explain: '상태 유지: 불이 켜진 상태로.' },
          { options: ['연 채로', '열면서'], answer: '연 채로', explain: '상태 유지: 문이 열린 상태로.' },
          { options: ['신은 채로', '신으면서'], answer: '신은 채로', explain: '상태 유지: 신발을 신은 상태로.' },
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
            answer: '이불은 침대 위에 펼쳐진 채로 있었고, 창문은 열린 채로 바람이 들어왔어요. 책상에는 물컵이 엎어진 채로 있어서 종이가 젖어 있었어요.',
            accepted: ['-은 채로', 'descripción', 'escena'],
            explain: 'Múltiples estados mantenidos describiendo desorden.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análisis de -은 채로 vs -으면서',
        tag: 'Análisis',
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
