import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'para-vs-por-a2',
  order: '13',
  color: '#166534',
  category: 'Preposiciones',
  level: 'A2',
  title: 'Para vs. por en portugués A2: finalidad, causa y movimiento',
  shortTitle: 'Para vs. por',
  metaTitle: 'Para vs. por en portugués A2 — diferencias, usos y ejemplos',
  description:
    'Las preposiciones "para" y "por" son dos de las más usadas y confundidas del portugués. "Para" expresa finalidad, destino y destinatario. "Por" expresa causa, duración, medio y movimiento a través de algo. Dominar esta distinción es clave para comunicarse con precisión en portugués brasileño.',
  lead: 'Vou para o Brasil por trabalho: la diferencia clave entre para y por en portugués.',
  outcomes: [
    'Usar "para" para expresar finalidad, destino y destinatario',
    'Usar "por" para expresar causa, duración, agente y movimiento por un lugar',
    'Distinguir "Vou para São Paulo" (destino) de "Passo por São Paulo" (movimiento a través)',
    'Evitar confusiones frecuentes entre para y por en frases cotidianas',
  ],

  guide: {
    goal: 'Distinguir y usar correctamente "para" y "por" en contextos de finalidad, causa y movimiento.',
    model: 'Comprei flores para você. (Compré flores para ti.) / Obrigado por tudo. (Gracias por todo.)',
    formula: 'PARA: finalidade / destino / destinatário | POR: causa / duração / meio / movimento através',
    decisions: [
      'PARA + finalidade: Estudo para aprender. / Esse livro é para crianças.',
      'PARA + destino: Vou para o Brasil amanhã. / Saí para a escola.',
      'PARA + destinatário: Comprei um presente para ela. / Uma mensagem para você.',
      'POR + causa: Obrigado por tudo. / Fiz isso por amor.',
      'POR + duração: Estudei por duas horas. / Fiquei aqui por três dias.',
      'POR + movimento: Passei por São Paulo. / Andei pelo parque. (por + o = pelo)',
    ],
    table: [
      ['Uso', 'Para', 'Por'],
      ['Finalidade/Causa', 'Estudo para aprender', 'Fiz por amor'],
      ['Destino/Movimento', 'Vou para o Rio', 'Passei por São Paulo'],
      ['Destinatário/Agente', 'Uma carta para você', 'O livro foi escrito por ele'],
    ],
    mistakes: [
      '"Obrigado para tudo" ❌ → "Obrigado por tudo" ✓ — agradecimientos usan "por".',
      '"Vou por São Paulo" (queriendo decir destino) ❌ → "Vou para São Paulo" ✓ — destino final usa "para".',
      '"Estudei para duas horas" ❌ → "Estudei por duas horas" ✓ — duración usa "por".',
    ],
  },

  seo: [
    {
      heading: '¿Cuándo usar "para" en portugués?',
      paragraphs: [
        '"Para" en portugués expresa tres ideas principales: (1) finalidad u objetivo — "Estudo para aprender" (estudio para aprender); (2) destino — "Vou para o Brasil" (voy a Brasil); (3) destinatario — "Este presente é para você" (este regalo es para ti).',
        'La contracción más común es "para + o = pro" en el habla informal: "Vou pro trabalho" (voy al trabajo). En el portugués de Portugal también se usa "para" de forma similar pero con algunas diferencias regionales.',
      ],
    },
    {
      heading: '¿Cuándo usar "por" en portugués?',
      paragraphs: [
        '"Por" expresa causa o motivo — "Fiz isso por amor"; duración de tiempo — "Estudei por três horas"; movimiento a través de un lugar — "Passei pelo centro" (pasé por el centro); y el agente en la voz pasiva — "O livro foi escrito por Machado de Assis".',
        '"Por" se contrae con artículos: por + o = pelo, por + a = pela, por + os = pelos, por + as = pelas.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre "para" y "por" en portugués?',
      paragraphs: [
        'En una frase: "para" mira hacia adelante (finalidad, destino, destinatario) y "por" mira hacia la causa, el tiempo o el recorrido. "Estudo para passar" (finalidad) vs "Estudo por obrigação" (causa); "Vou para o Rio" (destino) vs "Passo pelo Rio" (paso a través). Esta tabla resume los usos frente a frente:',
      ],
      table: [
        ['Sentido', 'PARA', 'POR'],
        ['Finalidad / causa', 'Estudo para aprender.', 'Faço isto por amor.'],
        ['Destino / recorrido', 'Vou para o Rio.', 'Passei pelo centro.'],
        ['Destinatario / agente', 'Um presente para você.', 'Escrito por Machado.'],
        ['Tiempo', 'Termino para segunda. (plazo)', 'Estudei por duas horas. (duración)'],
      ],
    },
    {
      heading: '¿Se dice "obrigado por" u "obrigado para"?',
      paragraphs: [
        'Se dice "obrigado por" (obrigado pela ajuda, obrigado por tudo), porque el agradecimiento expresa la causa o el motivo, y eso es dominio de "por", nunca de "para". "Obrigado para tudo" es un error típico del hispanohablante que traduce mecánicamente. Regla útil: cuando en español dirías "gracias por", en portugués es siempre "por" (o su contracción pelo/pela): "obrigado pela mensagem", "obrigado pelo convite".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Para vs. por: finalidad/destino vs. causa/duración/movimiento.',
    graphicPrompt: 'Mapa con una persona viajando hacia Brasil (para) y pasando por São Paulo (por).',
    scene: [
      ['Comprei flores para você.', 'Compré flores para ti.'],
      ['Obrigado por tudo!', '¡Gracias por todo!'],
      ['Vou para o Brasil amanhã.', 'Voy a Brasil mañana.'],
      ['Passei pelo centro da cidade.', 'Pasé por el centro de la ciudad.'],
      ['Estudei por duas horas.', 'Estudié durante dos horas.'],
      ['Esse curso é para iniciantes.', 'Este curso es para principiantes.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['para = finalidade/destino', 'por = causa/duração', 'contrações pelo/pela'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Para ou por',
        tag: 'Opción múltiple',
        intro: 'Selecciona "para" o "por" según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Agradeciendo a alguien.',
            lines: [['', 'Obrigado ___ a ajuda!']],
            options: ['por', 'para', 'pelo', 'pela'],
            answer: 'por',
            explain: '"por" expresa causa/motivo del agradecimiento.',
          },
          {
            scene: 'Indicando a quién va dirigido un regalo.',
            lines: [['', 'Este presente é ___ minha mãe.']],
            options: ['para', 'por', 'pelo', 'pela'],
            answer: 'para',
            explain: '"para" indica destinatário (destinatario).',
          },
          {
            scene: 'Describiendo un viaje a una ciudad.',
            lines: [['', 'Amanhã viajo ___ São Paulo.']],
            options: ['para', 'por', 'pelo', 'pela'],
            answer: 'para',
            explain: '"para" indica destino.',
          },
          {
            scene: 'Describiendo cuánto tiempo estudié.',
            lines: [['', 'Estudiei ___ três horas hoje.']],
            options: ['por', 'para', 'pelo', 'pela'],
            answer: 'por',
            explain: '"por" expresa duración de tiempo.',
          },
          {
            scene: 'Pasando a través de un lugar.',
            lines: [['', 'Passei ___ o parque na volta.']],
            options: ['pelo', 'para', 'por', 'pela'],
            answer: 'pelo',
            explain: '"pelo" = por + o → movimiento a través del parque.',
          },
          {
            scene: 'Indicando el propósito de un curso.',
            lines: [['', 'Este curso é ___ quem quer aprender português.']],
            options: ['para', 'por', 'pelo', 'pela'],
            answer: 'para',
            explain: '"para" expresa finalidade — a quién está dirigido.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos preposiciones en contexto',
        tag: '2 espacios',
        intro: 'Completa con "para", "por", "pelo" o "pela" según corresponda.',
        type: 'dual',
        items: [
          {
            scene: 'Comprando algo con un propósito.',
            lines: [['', 'Comprei esse livro [[0]] aprender mais [[1]] minha filha também.']],
            blanks: [
              { options: ['para', 'por', 'pelo', 'pela'], answer: 'para', explain: '"para" + infinitivo = finalidade.' },
              { options: ['para', 'por', 'pelo', 'pela'], answer: 'para', explain: '"para" + persona = destinatário.' },
            ],
          },
          {
            scene: 'Explicando motivo y duración.',
            lines: [['', 'Fiquei em casa [[0]] estar doente. Descansei [[1]] dois dias.']],
            blanks: [
              { options: ['por', 'para', 'pelo', 'pela'], answer: 'por', explain: '"por" + causa = motivo de quedarse en casa.' },
              { options: ['por', 'para', 'pelo', 'pela'], answer: 'por', explain: '"por" + duración = tempo que descansou.' },
            ],
          },
          {
            scene: 'Viaje con escala.',
            lines: [['', 'Vou [[0]] Lisboa, mas passo [[1]] Madrid.']],
            blanks: [
              { options: ['para', 'por', 'pelo', 'pela'], answer: 'para', explain: '"para" = destino final (Lisboa).' },
              { options: ['por', 'para', 'pelo', 'pela'], answer: 'por', explain: '"por" = movimiento de paso (Madrid).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Carta a un amigo',
        tag: 'Texto guiado',
        intro: 'Completa la carta eligiendo "para", "por", "pelo" o "pela".',
        type: 'guidedText',
        scene: 'Mariana escreve uma carta para seu amigo Carlos.',
        text: 'Querido Carlos, obrigada [[0]] todas as memórias. Guardo essas fotos [[1]] sempre! Amanhã vou [[2]] Porto [[3]] conhecer a família do Lucas. Passaremos [[4]] o centro histórico. Fico aqui [[5]] duas semanas.',
        blanks: [
          { options: ['por', 'para', 'pelo', 'pela'], answer: 'por', explain: '"por" = causa del agradecimiento.' },
          { options: ['para', 'por', 'pelo', 'pela'], answer: 'para', explain: '"para" = finalidade/propósito (para siempre).' },
          { options: ['para', 'por', 'pelo', 'pela'], answer: 'para', explain: '"para" = destino.' },
          { options: ['para', 'por', 'pelo', 'pela'], answer: 'para', explain: '"para" + infinitivo = finalidade (para conocer).' },
          { options: ['pelo', 'pela', 'para', 'por'], answer: 'pelo', explain: '"pelo" = por + o = movimiento a través del centro.' },
          { options: ['por', 'para', 'pelo', 'pela'], answer: 'por', explain: '"por" = duración.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con para o por',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe "para", "por", "pelo" o "pela".',
        type: 'freeText',
        scene: 'Situaciones cotidianas en portugués.',
        text: 'Comprei café [[0]] você. / Obrigado [[1]] tudo. / Saio [[2]] o trabalho às 8h. / Andei [[3]] a praia. / Esperei [[4]] uma hora.',
        blanks: [
          { answer: 'para', explain: '"para você" = destinatário.' },
          { answer: 'por', explain: '"por tudo" = causa del agradecimiento.' },
          { answer: 'para', explain: '"para o trabalho" = destino.' },
          { answer: 'pela', explain: '"pela praia" = por + a = movimiento por la playa.' },
          { answer: 'por', explain: '"por uma hora" = duración.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Traduce usando para o por',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración en portugués con "para" o "por".',
        type: 'write',
        items: [
          {
            scene: 'Compré este libro para aprender portugués.',
            prompt: 'Comprei este livro ___ aprender português.',
            answer: 'Comprei este livro para aprender português.',
            accepted: ['Este livro foi comprado para aprender português.'],
            explain: '"para" + infinitivo = finalidade.',
          },
          {
            scene: 'Gracias por la ayuda.',
            prompt: 'Obrigado ___ a ajuda.',
            answer: 'Obrigado por a ajuda.',
            accepted: ['Obrigado pela ajuda.'],
            explain: '"por" = causa/motivo. "pela" = por + a (forma contraída).',
          },
          {
            scene: 'Pasé por el centro de la ciudad.',
            prompt: 'Passei ___ o centro da cidade.',
            answer: 'Passei pelo centro da cidade.',
            accepted: [],
            explain: '"pelo" = por + o → movimiento a través del centro.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe oraciones propias',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones originales usando "para" y "por".',
        type: 'write',
        items: [
          {
            scene: 'Describe algo que compraste o hiciste para alguien.',
            prompt: 'Escreva uma frase com "para" (destinatário ou finalidade).',
            answer: 'Comprei flores para minha mãe no aniversário dela.',
            accepted: ['Estudei muito para passar no exame.'],
            explain: '"para" + persona/infinitivo = destinatário ou finalidade.',
          },
          {
            scene: 'Describe algo que hiciste por una causa o durante un tiempo.',
            prompt: 'Escreva uma frase com "por" (causa ou duração).',
            answer: 'Fiquei em casa por três dias por causa da gripe.',
            accepted: ['Trabalhei por amor à educação.'],
            explain: '"por" = causa ou duração de tempo.',
          },
        ],
      },
    ],
  },
}

export default topic
