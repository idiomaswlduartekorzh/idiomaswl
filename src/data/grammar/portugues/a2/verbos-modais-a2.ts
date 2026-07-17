import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbos-modais-a2',
  order: '19',
  color: '#166534',
  category: 'Verbos',
  level: 'A2',
  title: 'Verbos modais en portugués A2: poder, dever, precisar, ter que',
  shortTitle: 'Verbos modais',
  metaTitle: 'Verbos modales en portugués A2 — poder, dever, precisar, ter que, conseguir',
  description:
    'Los verbos modales del portugués (poder, dever, precisar, ter que, conseguir, querer, saber) modifican el significado del verbo principal para expresar posibilidad, obligación, necesidad, capacidad o voluntad. Se usan antes del infinitivo sin preposición en la mayoría de los casos.',
  lead: 'Posso ajudar? Preciso estudar: los verbos modales del portugués que expresan posibilidad y necesidad.',
  outcomes: [
    'Usar "poder" para permiso y posibilidad, "conseguir" para capacidad',
    'Usar "dever" para obligación moral y probabilidad',
    'Usar "precisar de/ter que" para necesidad y obligación',
    'Distinguir "saber" (habilidad aprendida) de "conseguir" (lograr)',
  ],

  guide: {
    goal: 'Usar los verbos modales del portugués para expresar posibilidad, obligación, capacidad y necesidad.',
    model: 'Posso entrar? / Devo estudar mais. / Preciso de ajuda. / Consegui terminar!',
    formula: 'Modal conjugado + infinitivo (sin preposición excepto "precisar de")',
    decisions: [
      'PODER: posibilidad o permiso → "Posso sair?" (¿puedo salir?), "Pode chover" (puede llover)',
      'CONSEGUIR: capacidade lograda → "Consigo falar inglês" (consigo hablar inglés = lo logro)',
      'SABER: habilidade aprendida → "Sei nadar" (sé nadar), "Sabe cozinhar?" (¿sabes cocinar?)',
      'DEVER: obligação moral o probabilidade → "Devo estudar" (debo estudiar), "Deve ser tarde" (debe de ser tarde)',
      'PRECISAR DE + sustantivo o PRECISAR + infinitivo: "Preciso de ajuda" / "Preciso estudar"',
      'TER QUE + infinitivo: obligación concreta → "Tenho que ir ao médico"',
    ],
    table: [
      ['Modal', 'Significado', 'Exemplo'],
      ['poder', 'posibilidad/permiso', 'Posso usar o banheiro?'],
      ['conseguir', 'capacidad/logro', 'Consegui terminar o trabalho.'],
      ['dever', 'obligación/probabilidad', 'Você deve pagar a conta.'],
    ],
    mistakes: [
      '"Sei falar" ✓ (habilidad aprendida) vs "Consigo falar" ✓ (logro en el momento) — diferencia sutil pero importante.',
      '"Preciso de estudar" ❌ → "Preciso estudar" ✓ — "precisar" + infinitivo NO lleva "de". Solo con sustantivo: "Preciso de dinheiro".',
      '"Posso para ir" ❌ → "Posso ir" ✓ — los modales van directamente + infinitivo sin preposición.',
    ],
  },

  seo: [
    {
      heading: 'Los verbos modales en portugués: poder, dever y conseguir',
      paragraphs: [
        'Los verbos modales en portugués funcionan como auxiliares: se conjugan y van seguidos del infinitivo del verbo principal sin preposición (con la excepción de "precisar de" cuando va con sustantivo). Los más frecuentes son poder (poder/permiso), dever (deber/deber de), precisar (necesitar), ter que (tener que), conseguir (lograr/poder), querer (querer), saber (saber hacer).',
        'Una distinción importante es entre "saber" y "conseguir": "Sei nadar" (sé nadar — habilidad aprendida) vs "Consigo nadar 2 km" (consigo nadar 2 km — logro en el momento). En español ambos se traducen como "poder/saber", pero en portugués se distinguen.',
      ],
    },
    {
      heading: 'Dever: obligación y probabilidad',
      paragraphs: [
        '"Dever" en portugués tiene dos funciones: obligación moral ("Você deve respeitar as regras" — debes respetar las normas) y probabilidad deducida ("Deve ser caro" — debe de ser caro, probablemente es caro). Esta segunda función es equivalente al "futuro de probabilidad" del italiano o el "deber de + infinitivo" del español.',
        '"Ter que" expresa obligación concreta e ineludible: "Tenho que trabalhar amanhã" (tengo que trabajar mañana — no hay opción). "Precisar" expresa necesidad: "Preciso dormir mais" (necesito dormir más).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Verbos modais: poder (permiso), conseguir (logro), dever (obligación/probabilidad), precisar/ter que (necesidad).',
    graphicPrompt: 'Personas en diferentes situaciones usando verbos modales: pidiendo permiso, expresando obligación, logros.',
    scene: [
      ['Posso entrar? — Pode, claro!', '¿Puedo entrar? — ¡Claro que sí!'],
      ['Consegui terminar antes do prazo!', '¡Logré terminar antes del plazo!'],
      ['Você deve ligar para ela.', 'Debes llamarla.'],
      ['Preciso de ajuda com este exercício.', 'Necesito ayuda con este ejercicio.'],
      ['Tenho que ir ao médico amanhã.', 'Tengo que ir al médico mañana.'],
      ['Sei cozinhar, mas não muito bem.', 'Sé cocinar, pero no muy bien.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['poder vs conseguir', 'precisar de/precisar + inf.', 'dever = obligação/probabilidade'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el modal correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona el verbo modal adecuado para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Pidiendo permiso para salir antes.',
            lines: [['', '___ sair mais cedo hoje?']],
            options: ['Posso', 'Devo', 'Sei', 'Consigo'],
            answer: 'Posso',
            explain: '"Posso" = puedo/permiso. Para pedir permiso se usa "poder".',
          },
          {
            scene: 'Necesitas más tiempo para terminar.',
            lines: [['', '___ de mais tempo para terminar.']],
            options: ['Preciso', 'Posso', 'Devo', 'Sei'],
            answer: 'Preciso',
            explain: '"Preciso de" + sustantivo = necesito. Con sustantivo se añade "de".',
          },
          {
            scene: 'Lograste correr 10 km por primera vez.',
            lines: [['', '___ correr 10 km pela primeira vez!']],
            options: ['Consegui', 'Pude', 'Soube', 'Devi'],
            answer: 'Consegui',
            explain: '"Consegui" = logré (capacidad lograda en el momento).',
          },
          {
            scene: 'Debes respetar las regras del lugar.',
            lines: [['', 'Você ___ respeitar as regras do lugar.']],
            options: ['deve', 'pode', 'precisa de', 'sabe'],
            answer: 'deve',
            explain: '"deve" = debes (obligación moral con "dever").',
          },
          {
            scene: 'Sabes tocar guitarra (habilidad aprendida).',
            lines: [['', '___ tocar violão desde os 10 anos.']],
            options: ['Sei', 'Consigo', 'Posso', 'Devo'],
            answer: 'Sei',
            explain: '"Sei" = sé (habilidad aprendida a lo largo del tiempo).',
          },
          {
            scene: 'Tienes que ir al banco hoy sin excusa.',
            lines: [['', '___ ir ao banco hoje.']],
            options: ['Tenho que', 'Posso', 'Sei', 'Consigo'],
            answer: 'Tenho que',
            explain: '"Tenho que" = tengo que (obligación concreta e ineludible).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Modal y verbo principal',
        tag: '2 espacios',
        intro: 'Elige el modal y el verbo principal en infinitivo.',
        type: 'dual',
        items: [
          {
            scene: 'Necesitas estudiar más para el examen.',
            lines: [['', '[[0]] [[1]] mais para o exame.']],
            blanks: [
              { options: ['Preciso', 'Posso', 'Devo', 'Sei'], answer: 'Preciso', explain: '"Preciso" + infinitivo = necesito (necesidad).' },
              { options: ['estudar', 'estudo', 'estudando', 'estudei'], answer: 'estudar', explain: 'Después del modal va el infinitivo: estudar.' },
            ],
          },
          {
            scene: 'Debes de estar cansado después del viaje.',
            lines: [['', '[[0]] [[1]] cansado depois da viagem.']],
            blanks: [
              { options: ['Deve', 'Precisa', 'Pode', 'Sabe'], answer: 'Deve', explain: '"deve" + ser/estar = probabilidad deducida.' },
              { options: ['estar', 'estou', 'estando', 'estado'], answer: 'estar', explain: 'Infinitivo después del modal: estar cansado.' },
            ],
          },
          {
            scene: '¿Puedes ayudarme con este problema?',
            lines: [['', '[[0]] me [[1]] com esse problema?']],
            blanks: [
              { options: ['Pode', 'Deve', 'Precisa', 'Sabe'], answer: 'Pode', explain: '"Pode" = puedes (permiso/posibilidad, pedido).' },
              { options: ['ajudar', 'ajuda', 'ajudando', 'ajudou'], answer: 'ajudar', explain: 'Infinitivo del verbo principal: ajudar.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Situaciones con modales',
        tag: 'Texto guiado',
        intro: 'Elige el modal correcto para cada situación en el diálogo.',
        type: 'guidedText',
        scene: 'Numa entrevista de emprego.',
        text: 'Entrevistador: O que você [[0]] fazer melhor? Candidato: [[1]] falar três idiomas e [[2]] trabalhar sob pressão. Entrevistador: E quando [[3]] começar? Candidato: [[4]] começar daqui a duas semanas, se o senhor precisar.',
        blanks: [
          { options: ['sabe', 'consegue', 'pode', 'deve'], answer: 'sabe', explain: '"o que você sabe fazer" = qué sabes hacer (habilidades aprendidas).' },
          { options: ['Sei', 'Consigo', 'Posso', 'Devo'], answer: 'Sei', explain: '"Sei falar" = sé hablar (habilidad aprendida).' },
          { options: ['consigo', 'sei', 'posso', 'devo'], answer: 'consigo', explain: '"consigo trabalhar sob pressão" = logro/puedo trabajar bajo presión.' },
          { options: ['pode', 'deve', 'sabe', 'precisa'], answer: 'pode', explain: '"quando pode começar" = cuándo puede empezar (posibilidad).' },
          { options: ['Posso', 'Devo', 'Sei', 'Preciso'], answer: 'Posso', explain: '"Posso começar" = puedo empezar (posibilidad/disponibilidad).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con el modal correcto',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe el modal correcto (poder, dever, precisar, ter que, saber, conseguir).',
        type: 'freeText',
        scene: 'Situações do dia a dia com verbos modais.',
        text: 'Estou com dor de cabeça. ___ tomar um remédio. / Ela ___ cinco idiomas fluentemente. / ___ abrir a janela, por favor? / ___ terminar esse projeto até amanhã! / Ele ___ estar doente — não veio trabalhar.',
        blanks: [
          { answer: 'Preciso', explain: '"Preciso tomar" = necesito tomar (necesidad personal).' },
          { answer: 'sabe/fala', explain: '"ela sabe cinco idiomas" = sabe hablar (habilidad). "fala" también es válido.' },
          { answer: 'Pode', explain: '"Pode abrir" = ¿puede abrir? (solicitud de permiso).' },
          { answer: 'Tenho que', explain: '"Tenho que terminar" = tengo que terminar (obligación concreta).' },
          { answer: 'deve', explain: '"deve estar doente" = debe de estar enfermo (probabilidad).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Expresa posibilidad y obligación',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa con el modal apropiado.',
        type: 'write',
        items: [
          {
            scene: 'No puedes salir hoy, tienes mucho trabajo.',
            prompt: 'Você não ___ sair hoje — tem muito trabalho.',
            answer: 'Você não pode sair hoje — tem muito trabalho.',
            accepted: ['Você não consegue sair hoje — tem muito trabalho.'],
            explain: '"não pode" = no puedes (imposibilidad/falta de permiso).',
          },
          {
            scene: 'Ella sabe cocinar muy bien.',
            prompt: 'Ela ___ cozinhar muito bem.',
            answer: 'Ela sabe cozinhar muito bem.',
            accepted: ['Ela consegue cozinhar muito bem.'],
            explain: '"sabe" = sabe (habilidad aprendida); "consegue" también es válido (logra).',
          },
          {
            scene: 'Necesitan más tiempo para el proyecto.',
            prompt: 'Eles ___ de mais tempo para o projeto.',
            answer: 'Eles precisam de mais tempo para o projeto.',
            accepted: ['Eles precisam terminar o projeto.'],
            explain: '"precisam de" + sustantivo = necesitan. Con infinitivo: "precisam terminar".',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Habla de tus capacidades y obligaciones',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones propias usando los verbos modales.',
        type: 'write',
        items: [
          {
            scene: 'Describe tres cosas que sabes hacer y una que todavía no consigues hacer.',
            prompt: 'Escreva sobre suas habilidades usando "sei", "consigo" e "não consigo".',
            answer: 'Sei falar espanhol e inglês. Consigo trabalhar sob pressão. Mas não consigo acordar cedo!',
            accepted: ['Sei cozinhar bem. Consigo estudar por horas. Não consigo dormir cedo.'],
            explain: '"sei" = habilidad aprendida; "consigo" = logro; "não consigo" = no lo logro.',
          },
          {
            scene: 'Describe lo que tienes que hacer esta semana.',
            prompt: 'Escreva sobre suas obrigações desta semana com "tenho que", "devo" e "preciso".',
            answer: 'Tenho que entregar um relatório na sexta. Devo ligar para o cliente. Preciso de mais tempo para estudar.',
            accepted: ['Preciso terminar o projeto. Tenho que ir ao banco. Devo pagar as contas.'],
            explain: '"tenho que" = obligación ineludible; "devo" = obligación moral; "preciso" = necesidad.',
          },
        ],
      },
    ],
  },
}

export default topic
