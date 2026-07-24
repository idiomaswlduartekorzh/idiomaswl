import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'particulas-recipiente-a2',
  order: '14',
  color: '#c60c30',
  category: 'Partículas',
  level: 'A2',
  title: 'Partículas 에게/한테/께 en coreano A2: a alguien, de alguien',
  shortTitle: '에게/한테/께',
  metaTitle: 'Partículas de recipiente en coreano A2 — 에게, 한테, 께, 에게서, 한테서',
  description:
    'Las partículas 에게 (ege), 한테 (hante) y 께 (kke) marcan el destinatario de una acción dirigida a una persona. 에게/한테 significan "a (alguien)" o "de (alguien)". 께 es la forma honorífica de 에게. Con 서 añadido (에게서/한테서) indican origen: "de parte de". Son equivalentes al objeto indirecto en español.',
  lead: '친구에게 편지를 썼어요: las partículas que marcan a quién va dirigida la acción.',
  outcomes: [
    'Usar 에게/한테 para marcar el destinatario de una acción',
    'Usar 에게서/한테서 para marcar el origen (de quién se recibe algo)',
    'Usar 께/께서 como formas honoríficas de 에게/에서',
    'Distinguir el uso formal (에게) del informal (한테)',
  ],

  guide: {
    goal: 'Marcar el destinatario y origen de acciones con las partículas 에게, 한테, 에게서 y 께.',
    model: '친구에게 선물을 줬어요. (Le di un regalo a mi amigo.) / 선생님께 여쭤봤어요. (Le pregunté al profesor.)',
    formula: 'N + 에게/한테 + [acción dirigida a] | N + 에게서/한테서 + [acción recibida de]',
    decisions: [
      '에게: formal/neutro + personas/animales → "선생님에게", "친구에게"',
      '한테: informal, coloquial → "친구한테", "동생한테"',
      '께: honorífico (con personas mayores/superiores) → "부모님께", "선생님께"',
      '에게서/한테서: "de parte de" (origen) → "친구에게서 편지가 왔어요" (llegó una carta de mi amigo)',
      '께서: partícula de sujeto honorífico (diferente de 께 de objeto indirecto)',
    ],
    table: [
      ['Situación', 'Formal', 'Informal'],
      ['a alguien (destino)', '에게 (선생님에게)', '한테 (친구한테)'],
      ['de alguien (origen)', '에게서 (선생님에게서)', '한테서 (친구한테서)'],
      ['honorífico (destino)', '께 (부모님께)', '— (no informal honorífico)'],
    ],
    mistakes: [
      '"친구를 편지를 썼어요" ❌ → "친구에게 편지를 썼어요" ✓ — el destinatario de una carta usa 에게/한테.',
      '"선생님한테 말씀드렸어요" ❌ (informal con superior) → "선생님께 말씀드렸어요" ✓ — con superiores: 께.',
      '"친구에게서 받았어요" ✓ vs "친구에게 받았어요" — con 받다 (recibir) se usa 에게서 aunque 에게 también se acepta.',
    ],
  },

  seo: [
    {
      heading: '에게 vs 한테: mismo significado, diferente registro',
      paragraphs: [
        'En coreano, las partículas 에게 (ege) y 한테 (hante) tienen exactamente el mismo significado — ambas marcan el destinatario de una acción dirigida a una persona. La diferencia es el registro: 에게 es más formal y se usa en escritura; 한테 es más informal y coloquial.',
        '"친구에게 전화했어요" (formal/escrito) = "친구한테 전화했어요" (coloquial) = Llamé a mi amigo por teléfono. En el habla cotidiana, los coreanos usan 한테 con mucha más frecuencia que 에게.',
      ],
    },
    {
      heading: '께: la forma honorífica imprescindible',
      paragraphs: [
        '께 (kke) es la forma honorífica de 에게 y se usa cuando el destinatario es una persona de mayor edad o rango social: padres, profesores, jefes, abuelos. "어머니께 드렸어요" (se lo di a mi madre), "교수님께 이메일을 보냈어요" (le mandé un email al profesor).',
        'Es un error grave de cortesía usar 한테 con superiores en contextos formales. "선생님한테 선물을 줬어요" suena muy informal e inapropiado. La forma correcta es "선생님께 드렸어요" (se lo di al profesor) — nótese también que con 께 se usa 드리다 en lugar de 주다.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '에게/한테/께: partículas de destinatario y origen para personas.',
    graphicPrompt: 'Dos personas intercambiando un regalo, con flechas mostrando 에게 (destino) y 에게서 (origen).',
    scene: [
      ['친구한테 문자 보냈어요.', 'Le mandé un mensaje a mi amigo.'],
      ['선생님께 질문했어요.', 'Le hice una pregunta al profesor.'],
      ['엄마한테서 용돈을 받았어요.', 'Recibí dinero de bolsillo de mi mamá.'],
      ['동생에게 책을 빌려줬어요.', 'Le presté un libro a mi hermano menor.'],
      ['부모님께 전화드렸어요.', 'Llamé por teléfono a mis padres.'],
      ['친구에게서 선물이 왔어요.', 'Llegó un regalo de parte de un amigo.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['에게/한테 (destinatario)', '에게서/한테서 (origen)', '께 (honorífico)'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la partícula correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la partícula adecuada según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Le mandé un email a mi profesor (formal/honorífico).',
            lines: [['', '교수님___ 이메일을 보냈어요.']],
            options: ['께', '에게', '한테', '에서'],
            answer: '께',
            explain: '"교수님께" = al profesor. Con superiores se usa 께 (honorífico).',
          },
          {
            scene: 'Le presté el libro a mi amigo (informal).',
            lines: [['', '친구___ 책을 빌려줬어요.']],
            options: ['한테', '께', '에서', '에게서'],
            answer: '한테',
            explain: '"친구한테" = a mi amigo. Con iguales o inferiores en habla informal → 한테.',
          },
          {
            scene: 'Recibí una carta de mi madre.',
            lines: [['', '어머니___ 편지가 왔어요.']],
            options: ['에게서', '에게', '한테', '께'],
            answer: '에게서',
            explain: '"어머니에게서" = de mi madre (origen). Para recibir algo se usa 에게서/한테서.',
          },
          {
            scene: 'Le di el regalo a mis padres (honorífico).',
            lines: [['', '부모님___ 선물을 드렸어요.']],
            options: ['께', '한테', '에게', '한테서'],
            answer: '께',
            explain: '"부모님께 드렸어요" — con superiores se usa 께 y el verbo 드리다.',
          },
          {
            scene: 'Le conté un secreto a mi hermana menor (coloquial).',
            lines: [['', '동생___ 비밀을 말했어요.']],
            options: ['한테', '께', '에게서', '한테서'],
            answer: '한테',
            explain: '"동생한테" = a mi hermana menor. 한테 es la forma coloquial.',
          },
          {
            scene: 'Recibí ayuda de un amigo.',
            lines: [['', '친구___ 도움을 받았어요.']],
            options: ['한테서', '한테', '에게', '께'],
            answer: '한테서',
            explain: '"친구한테서" = de parte de mi amigo (origen informal).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Destinatario y origen',
        tag: '2 espacios',
        intro: 'Completa con la partícula de destinatario y la partícula de origen.',
        type: 'dual',
        items: [
          {
            scene: 'Le di flores a mi abuela y recibí un abrazo de ella.',
            lines: [['', '할머니[[0]] 꽃을 드렸어요. 할머니[[1]] 포옹을 받았어요.']],
            blanks: [
              { options: ['께', '에게', '한테', '한테서'], answer: '께', explain: '"할머니께 드렸어요" — con abuela (superior) se usa 께.' },
              { options: ['께서', '한테서', '에게서', '한테'], answer: '께서', explain: '"할머니께서" = de parte de la abuela (forma honorífica de 에게서).' },
            ],
          },
          {
            scene: 'Le mandé un mensaje a mi amigo y él me respondió.',
            lines: [['', '친구[[0]] 문자를 보냈어요. 친구[[1]] 답장이 왔어요.']],
            blanks: [
              { options: ['한테', '께', '에서', '에게서'], answer: '한테', explain: '"친구한테" = a mi amigo (coloquial).' },
              { options: ['한테서', '한테', '에게', '께'], answer: '한테서', explain: '"친구한테서" = de parte de mi amigo (origen coloquial).' },
            ],
          },
          {
            scene: 'Le hice una pregunta al maestro y aprendí mucho de él.',
            lines: [['', '선생님[[0]] 질문을 드렸어요. 선생님[[1]] 많이 배웠어요.']],
            blanks: [
              { options: ['께', '에게', '한테', '한테서'], answer: '께', explain: '"선생님께" = al profesor (honorífico).' },
              { options: ['께', '한테', '한테서', '에게서'], answer: '께', explain: '"선생님께 배웠어요" = aprendí del profesor. Con 배우다 también se usa 께.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Carta de cumpleaños',
        tag: 'Texto guiado',
        intro: 'Completa la historia usando las partículas correctas.',
        type: 'guidedText',
        scene: '민준이가 생일 파티를 준비해요.',
        text: '어머니[[0]] 생일이에요. 저는 어머니[[1]] 꽃을 드렸어요. 그리고 친구[[2]] 케이크를 부탁했어요. 친구[[3]] 케이크가 왔어요. 어머니[[4]] 카드도 썼어요.',
        blanks: [
          { options: ['의', '께', '한테', '에서'], answer: '의', explain: '"어머니의 생일" = el cumpleaños de mi madre (partícula posesiva).' },
          { options: ['께', '한테', '에게서', '에서'], answer: '께', explain: '"어머니께 드렸어요" = le di a mi madre (honorífico).' },
          { options: ['한테', '께', '에게서', '에서'], answer: '한테', explain: '"친구한테 부탁했어요" = le pedí a mi amigo (coloquial).' },
          { options: ['한테서', '한테', '에게', '께'], answer: '한테서', explain: '"친구한테서 왔어요" = llegó de parte del amigo (origen).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con la partícula correcta',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la partícula correcta (에게/한테/께/에게서/한테서).',
        type: 'freeText',
        scene: '파티클을 골라 써 보세요.',
        text: '동생[[0]] 선물을 줬어요. / 교수님[[1]] 메일을 보냈어요. / 친구[[2]] 전화가 왔어요. / 부모님[[3]] 감사했어요.',
        blanks: [
          { answer: '한테/에게', explain: '"동생한테/에게" = a mi hermano menor (한테 más coloquial).' },
          { answer: '께', explain: '"교수님께" = al profesor (honorífico obligatorio).' },
          { answer: '한테서/에게서', explain: '"친구한테서" = de parte de mi amigo (origen).' },
          { answer: '께', explain: '"부모님께 감사했어요" = le agradecí a mis padres (honorífico).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye frases con partículas',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa usando la partícula indicada.',
        type: 'write',
        items: [
          {
            scene: 'Le presté el libro a mi amigo. (한테)',
            prompt: '친구 + 한테 + 책을 빌려줬어요.',
            answer: '친구한테 책을 빌려줬어요.',
            accepted: ['친구에게 책을 빌려줬어요.'],
            explain: '"친구한테" = a mi amigo (forma coloquial). 에게 también es correcto.',
          },
          {
            scene: 'Le pregunté al profesor. (께)',
            prompt: '선생님 + 께 + 여쭤봤어요.',
            answer: '선생님께 여쭤봤어요.',
            accepted: ['교수님께 질문드렸어요.'],
            explain: '"선생님께" + verbo honorífico "여쭤보다/질문드리다".',
          },
          {
            scene: 'Recibí un regalo de mi madre.',
            prompt: '어머니 + 에게서/한테서 + 선물을 받았어요.',
            answer: '어머니에게서 선물을 받았어요.',
            accepted: ['어머니한테서 선물을 받았어요.'],
            explain: '"에게서/한테서" = de parte de (origen). Con 받다 → origen.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe sobre dar y recibir',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones propias usando 에게/한테/께 y 에게서/한테서.',
        type: 'write',
        items: [
          {
            scene: 'Describe algo que le diste a alguien y algo que recibiste de alguien.',
            prompt: '누구에게/한테/께 무언가를 줬는지, 누구에게서/한테서 받았는지 써 보세요.',
            answer: '친구한테 생일 선물을 줬어요. 부모님께 용돈을 받았어요.',
            accepted: ['선생님께 과제를 드렸어요. 친구한테서 도움을 받았어요.'],
            explain: '에게/한테 = destinatario; 에게서/한테서 = origen; 께 = honorífico.',
          },
          {
            scene: 'Describe una interacción con un superior (profesor, jefe, etc.) usando lenguaje honorífico.',
            prompt: '어른(선생님, 부모님 등)과의 대화를 써 보세요.',
            answer: '교수님께 이메일을 드렸어요. 교수님께서 답장을 보내 주셨어요.',
            accepted: ['부모님께 전화드렸어요. 어머니께서 걱정하셨어요.'],
            explain: '"께" para 에게 honorífico; "께서" para 이/가 honorífico (sujeto).',
          },
        ],
      },
    ],
  },
}

export default topic
