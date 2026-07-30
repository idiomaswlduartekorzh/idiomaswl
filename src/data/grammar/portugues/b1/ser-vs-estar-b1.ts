import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'ser-vs-estar-b1',
  order: '12',
  color: '#166534',
  category: 'Verbos',
  level: 'B1',
  title: 'Ser vs Estar en Portugués B1',
  shortTitle: 'Ser vs Estar',
  metaTitle: 'Ser vs Estar Portugués B1 — Usos y Distinciones Fundamentales',
  description:
    'En portugués, "ser" y "estar" son dos verbos que significan "ser/estar" pero tienen usos completamente diferentes. "Ser" expresa identidad, profesión, características permanentes; "estar" expresa ubicación, estado emocional temporal, estado de salud. La distinción es crucial para B1 y causa confusión a hispanohablantes.',
  lead: 'Domina la distinción entre ser (identidad, características) y estar (ubicación, estado temporal).',
  outcomes: [
    'Usa "ser" para identidad y características permanentes',
    'Usa "estar" para ubicación y estados temporales',
    'Distingue cambios de significado con participio (estar cansado vs ser cansado)',
    'Aplica ser/estar correctamente en contextos naturales',
  ],

  guide: {
    goal: 'Diferenciar ser (identidad/naturaleza) de estar (ubicación/estado temporal) para hablar con precisión.',
    model: 'Eu sou professor. / Estou em casa. / Estou cansado. / Sou cansado. (vs estou cansado ahora)',
    formula: 'SER = identidad, profesión, características permanentes | ESTAR = ubicación, estado temporal, salud, emoción',
    decisions: [
      'Ser: identidad y nombre → Sou João. / Sou médico. / Sou português.',
      'Ser: características permanentes → Sou tímido. / Sou alto. / Sou forte.',
      'Ser: profesión → Sou professor. / Sou estudante. / Sou advogado.',
      'Estar: ubicación en el espacio → Estou em casa. / Estou na escola. / Estou aqui.',
      'Estar: estado de salud → Estou bem. / Estou doente. / Estou com febre.',
      'Estar: estado emocional temporal → Estou feliz. / Estou triste. / Estou nervoso.',
      'Estar + participio = resultado de acción → Estou cansado (ahora, por haber trabajado). / Estar preso (en la cárcel, estado resultante).',
    ],
    table: [
      ['Contexto', 'Ser', 'Estar'],
      ['Identidad', 'Sou Pedro', 'Estou em casa'],
      ['Profesión', 'Sou médico', 'Estou cansado'],
      ['Localización', 'Sou de Brasil', 'Estou no Brasil'],
      ['Características', 'Sou tímido', 'Estou tímido agora'],
      ['Salud', 'Sou saudável (nature)', 'Estou bem (estado)'],
    ],
    mistakes: [
      '"Sou em casa" ❌ → "Estou em casa" ✓ — ubicación siempre con estar.',
      '"Sou cansado" = soy de naturaleza cansada (raro). "Estou cansado" = ahora estoy cansado (temporal).',
      '"Ele é estudante" (es estudiante = profesión/rol) vs "Ele está estudando" (está estudiando ahora = acción).',
    ],
  },

  seo: [
    {
      heading: '¿Cuál es la diferencia entre ser y estar en portugués?',
      paragraphs: [
        'Ser y estar son dos verbos diferentes con significados distintos en portugués. Para hispanohablantes es confuso porque en español la distinción existe pero se usa menos que en portugués.',
        '"Ser" describe la naturaleza o identidad de algo: qué ES algo permanentemente. "Estar" describe el estado o la ubicación: dónde está o cómo está algo temporalmente.',
      ],
    },
    {
      heading: 'Ser: identidad, naturaleza y características permanentes',
      paragraphs: [
        'Se usa "ser" para: 1) Identidad y nombre: "Sou João". 2) Profesión: "Sou professor". 3) Nacionalidad: "Sou português". 4) Características permanentes: "Sou tímido", "Sou alto", "Sou forte".',
        'También se usa en construcciones de identidad: "Sou um professor excelente" (es mi identidad como profesional). "A capital de Brasil é Brasília" (identidad de la ciudad).',
      ],
    },
    {
      heading: 'Estar: ubicación, estado temporal y salud',
      paragraphs: [
        'Se usa "estar" para: 1) Ubicación en el espacio: "Estou em casa", "Estou no Brasil". 2) Estado emocional temporal: "Estou feliz", "Estou triste", "Estou nervoso". 3) Estado de salud: "Estou bem", "Estou doente".',
        'La clave es que "estar" expresa estados que pueden cambiar. Si es una característica permanente, usa "ser". Si es un estado actual/temporal, usa "estar".',
      ],
    },
    {
      heading: '¿Cómo cambia el significado de un adjetivo con ser o estar?',
      paragraphs: [
        'Algunos adjetivos cambian significado completamente con "ser" vs "estar": "Soy tímido" (es mi naturaleza) vs "Estoy tímido" (ahora, en este momento, por alguna razón temporal).',
        'Otros ejemplos: "Es malo" (es una mala persona, naturaleza) vs "Está malo" (está enfermo, estado). "Es alegre" (característica permanente) vs "Está alegre" (está contento ahora).',
      ],
    },
    {
      heading: 'Estar + participio: estado resultante',
      paragraphs: [
        'Una construcción importante es estar + participio para expresar un estado resultante de una acción: "Estou cansado" (he trabajado, y ahora estoy cansado = estado resultante). "A porta está aberta" (alguien abrió la puerta, y ahora está abierta = estado resultante).',
        'Este estado puede cambiar: la puerta puede volver a cerrarse, el cansancio puede pasar. Por eso usa "estar", no "ser".',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre ser + participio y estar + participio?',
      paragraphs: [
        'Ser + participio (en pasiva): "La carta fue escrita" → la acción de escribir (énfasis en la acción). Estar + participio: "La carta está escrita" → el resultado actual (énfasis en el estado).',
        'Diferencia: "Estou ocupado" (estado temporal resultante: he hecho cosas que me ocupan). "Sou ocupado" (es mi naturaleza ser una persona ocupada, siempre estoy ocupado).',
      ],
    },
    {
      heading: 'Locuciones y expresiones fijas con ser y estar',
      paragraphs: [
        'Algunas expresiones usan "ser" aunque parezca que deberían usar "estar": "É verdade" (es verdad), "É possível" (es posible), "É importante" (es importante). Son construcciones de naturaleza/esencia.',
        'Con "estar": "Está certo" (está correcto/right en este momento), "Está bem" (está bien, estado), "Está pronto" (está listo, estado).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Ser = identidad/naturaleza; Estar = ubicación/estado temporal.',
    graphicPrompt: 'Dos círculos: Ser (quién ES, características PERMANENTES) vs Estar (dónde ESTÁ, cómo ESTÁ AHORA).',
    scene: [
      ['Sou médico. / Estou em casa.', 'Soy médico. / Estoy en casa.'],
      ['Sou português. / Estou em Portugal.', 'Soy portugués. / Estoy en Portugal.'],
      ['Sou tímido. / Estou nervoso agora.', 'Soy tímido. / Estoy nervioso ahora.'],
      ['Ele é forte. / Ele está cansado.', 'Él es fuerte. / Él está cansado.'],
      ['Sou uma pessoa alegre. / Estou muito alegre hoje.', 'Soy una persona alegre. / Estoy muy alegre hoy.'],
      ['A porta está aberta.', 'La puerta está abierta.'],
      ['Estou bem de saúde.', 'Estoy bien de salud.'],
      ['Sou professor de português.', 'Soy profesor de portugués.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['identidad vs ubicación', 'permanente vs temporal', 'ser + participio vs estar + participio'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Escolha ser ou estar',
        tag: 'Múltipla escolha',
        intro: 'Selecciona ser o estar según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Identidad/profesión',
            lines: [['', "Eu ___ professor."]],
            options: ['estou', 'sou', 'sendo', 'serei'],
            answer: 'sou',
            explain: 'Profesión = característica permanente → ser.',
          },
          {
            scene: 'Ubicación',
            lines: [['', "Eu ___ em casa."]],
            options: ['sou', 'estou', 'sendo', 'serei'],
            answer: 'estou',
            explain: 'Ubicación → estar.',
          },
          {
            scene: 'Emoción temporal',
            lines: [['', "Eu ___ feliz hoje."]],
            options: ['sou', 'estou', 'sendo', 'serei'],
            answer: 'estou',
            explain: 'Emoción temporal (hoy) → estar.',
          },
          {
            scene: 'Característica permanente',
            lines: [['', "Eu ___ tímido."]],
            options: ['estou', 'sou', 'sendo', 'serei'],
            answer: 'sou',
            explain: 'Característica permanente de personalidad → ser.',
          },
          {
            scene: 'Estado de salud',
            lines: [['', "Ele ___ doente."]],
            options: ['é', 'está', 'sendo', 'será'],
            answer: 'está',
            explain: 'Estado de salud (temporal) → estar.',
          },
          {
            scene: 'Nacionalidad',
            lines: [['', "Ela ___ brasileira."]],
            options: ['está', 'é', 'sendo', 'será'],
            answer: 'é',
            explain: 'Nacionalidad = identidad permanente → ser.',
          },
          {
            scene: 'Resultado de acción',
            lines: [['', "A porta ___ aberta."]],
            options: ['é', 'está', 'sendo', 'será'],
            answer: 'está',
            explain: 'Estado resultante (puerta abierta ahora) → estar.',
          },
          {
            scene: 'Verdad universal',
            lines: [['', "Dois más dos ___ quatro."]],
            options: ['está', 'é', 'sendo', 'será'],
            answer: 'é',
            explain: 'Verdad universal = naturaleza de la realidad → ser.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Contexto: ser vs estar',
        tag: '2 decisiones',
        intro: 'Completa con ser o estar según cada contexto.',
        type: 'dual',
        items: [
          {
            scene: 'Contraste: identidad vs ubicación',
            lines: [['', "Sou português e [[0]] em Lisboa. Ela [[1]] médica e [[2]] no hospital."]],
            blanks: [
              { options: ['sou', 'estou', 'sendo'], answer: 'estou', explain: 'Ubicación → estar.' },
              { options: ['é', 'está', 'sendo'], answer: 'é', explain: 'Profesión → ser.' },
              { options: ['é', 'está', 'sendo'], answer: 'está', explain: 'Ubicación → estar.' },
            ],
          },
          {
            scene: 'Carácter vs estado emocional',
            lines: [['', "Sou uma pessoa alegre pero hoy [[0]] triste. Ele [[1]] fuerte pero ahora [[2]] cansado."]],
            blanks: [
              { options: ['sou', 'estou', 'sendo'], answer: 'estou', explain: 'Emoción temporal (hoy) → estar.' },
              { options: ['é', 'está', 'sendo'], answer: 'é', explain: 'Característica permanente → ser.' },
              { options: ['é', 'está', 'sendo'], answer: 'está', explain: 'Estado temporal → estar.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Narrativa con ser e estar',
        tag: 'Texto guiado',
        intro: 'Completa con ser o estar según el contexto.',
        type: 'guidedText',
        scene: 'Descripción de una persona y su situación.',
        text: "Meu amigo [[0]] (ser) português, mas [[1]] (estar) vivendo em Brasil. Ele [[2]] (ser) engenheiro e muito dedicado no trabalho. Hoje [[3]] (estar) cansado porque trabalhado muito. Apesar disso, [[4]] (estar) feliz com sua vida. Sua mãe [[5]] (ser) professora e [[6]] (estar) em Portugal.",
        blanks: [
          { options: ['é', 'está', 'sendo'], answer: 'é', explain: 'Nacionalidad (permanente) → ser.' },
          { options: ['é', 'está', 'sendo'], answer: 'está', explain: 'Ubicación actual → estar.' },
          { options: ['é', 'está', 'sendo'], answer: 'é', explain: 'Profesión → ser.' },
          { options: ['é', 'está', 'sendo'], answer: 'está', explain: 'Estado emocional de hoy → estar.' },
          { options: ['é', 'está', 'sendo'], answer: 'está', explain: 'Emoción actual → estar.' },
          { options: ['é', 'está', 'sendo'], answer: 'é', explain: 'Profesión de la madre → ser.' },
          { options: ['é', 'está', 'sendo'], answer: 'está', explain: 'Ubicación geográfica → estar.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escritura con ser e estar',
        tag: 'Texto libre',
        intro: 'Escribe oraciones usando ser y estar correctamente.',
        type: 'freeText',
        scene: 'Descripción de personas y sus situaciones.',
        text: "1. João [[0]] (ser) médico y [[1]] (estar) en el hospital. 2. María [[2]] (ser) alegre y [[3]] (estar) muy triste hoy. 3. Nosotros [[4]] (ser) estudiantes y [[5]] (estar) en la escuela.",
        blanks: [
          { answer: 'é', accepted: ['é'], explain: 'Profesión → ser.' },
          { answer: 'está', accepted: ['está'], explain: 'Ubicación → estar.' },
          { answer: 'é', accepted: ['é'], explain: 'Característica permanente → ser.' },
          { answer: 'está', accepted: ['está'], explain: 'Emoción temporal → estar.' },
          { answer: 'somos', accepted: ['somos'], explain: 'Rol/profesión → ser.' },
          { answer: 'estamos', accepted: ['estamos'], explain: 'Ubicación → estar.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción de oraciones',
        tag: 'Producción',
        intro: 'Crea frases sobre ti usando ser y estar.',
        type: 'write',
        items: [
          {
            scene: 'Tu identidad',
            prompt: "Escribe una frase: 'Yo soy...' (profesión o característica).",
            answer: "Sou um estudante dedicado.",
            accepted: ['sou', 'profesión', 'característica', 'identidad'],
            explain: 'Identidad y características permanentes → ser.',
          },
          {
            scene: 'Tu situación actual',
            prompt: "Escribe una frase: 'Estoy...' (ubicación o estado emocional).",
            answer: "Estou em casa e muito cansado.",
            accepted: ['estou', 'ubicación', 'emoción', 'estado'],
            explain: 'Ubicación y estado temporal → estar.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de ser vs estar',
        tag: 'Análise',
        intro: 'Explica por qué cada frase usa ser o estar.',
        type: 'write',
        items: [
          {
            scene: 'Justificación',
            prompt: "Explica: '¿Por qué 'Soy tímido' es diferente de 'Estoy tímido'?'",
            answer: "'Soy tímido' = es mi personalidad, característica permanente. 'Estoy tímido' = ahora, en este momento, estoy tímido (por una razón temporal).",
            accepted: ['permanente', 'temporal', 'naturaleza', 'estado'],
            explain: 'Ser para naturaleza/características; estar para estados temporales.',
          },
        ],
      },
    ],
  },
}

export default topic
