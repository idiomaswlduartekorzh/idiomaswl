import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'voz-passiva-a2',
  order: '14',
  color: '#166534',
  category: 'Sintaxis',
  level: 'A2',
  title: 'Voz passiva en portugués A2: ser + participio + por',
  shortTitle: 'Voz passiva',
  metaTitle: 'Voz pasiva en portugués A2 — ser + participio passado + por',
  description:
    'La voz pasiva en portugués se forma con el verbo "ser" conjugado + participio pasado del verbo principal + "por" (agente). El participio concuerda en género y número con el sujeto. Es esencial para textos formales, noticias y situaciones donde el agente es desconocido o irrelevante.',
  lead: 'O livro foi escrito por Machado de Assis: la voz pasiva del portugués explicada.',
  outcomes: [
    'Formar la voz pasiva con ser + participio passado',
    'Concordar el participio con el sujeto en género y número',
    'Usar "por" para introducir el agente de la acción',
    'Transformar oraciones activas en pasivas correctamente',
  ],

  guide: {
    goal: 'Construir y usar la voz pasiva con ser + participio passado + por en portugués.',
    model: 'O livro foi escrito por Machado de Assis. (El libro fue escrito por Machado de Assis.)',
    formula: 'Sujeito + ser (conjugado) + participio passado (concordado) + por + agente',
    decisions: [
      'El participio concuerda con el sujeto: "A carta foi enviada" (femm.); "Os livros foram publicados" (masc. pl.)',
      'Tiempos: é feito (presente), foi feito (pretérito), será feito (futuro), era feito (imperfeito)',
      '"Por" introduce el agente: "por ele", "pela empresa", "pelo professor"',
      'Cuando el agente es desconocido, se omite: "O carro foi roubado." (no se sabe quién)',
      'Participios irregulares comunes: escrever → escrito, fazer → feito, abrir → aberto, ver → visto',
    ],
    table: [
      ['Voz ativa', 'Voz passiva', 'Tiempo'],
      ['Ela escreve o livro.', 'O livro é escrito (por ela).', 'Presente'],
      ['Ele fez o bolo.', 'O bolo foi feito (por ele).', 'Pretérito'],
      ['A empresa vai lançar o produto.', 'O produto será lançado (pela empresa).', 'Futuro'],
    ],
    mistakes: [
      '"O livro foi escrevido" ❌ → "O livro foi escrito" ✓ — "escrever" tiene participio irregular: escrito.',
      '"As cartas foi enviadas" ❌ → "As cartas foram enviadas" ✓ — "ser" concuerda con el sujeto plural.',
      '"O projeto foi feita" ❌ → "O projeto foi feito" ✓ — el participio concuerda: "o projeto" es masculino.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma la voz pasiva en portugués?',
      paragraphs: [
        'La voz pasiva en portugués se construye con el verbo "ser" conjugado en el tiempo correspondiente + el participio pasado del verbo principal. El participio debe concordar en género y número con el sujeto pasivo.',
        '"O livro é lido" (presente), "O livro foi lido" (pretérito perfeito), "O livro era lido" (imperfeito), "O livro será lido" (futuro). El agente de la acción, si se menciona, va introducido por "por": "O livro foi lido pela professora."',
      ],
    },
    {
      heading: 'Participios irregulares en la voz pasiva',
      paragraphs: [
        'Los verbos con participios irregulares más comunes son: escrever → escrito, fazer → feito, abrir → aberto, ver → visto, dizer → dito, pôr → posto, vir → vindo. Estos participios son los que se usan en la voz pasiva.',
        'Algunos verbos tienen dos participios: uno regular (usado con ter/haver) y uno irregular (usado con ser en la voz pasiva). Por ejemplo: "Ela tinha entregado" (regular) pero "O trabalho foi entregue" (irregular con ser).',
      ],
      table: [
        ['Infinitivo', 'Participio', 'Ejemplo pasivo'],
        ['escrever', 'escrito', 'O livro foi escrito.'],
        ['fazer', 'feito', 'O bolo foi feito.'],
        ['abrir', 'aberto', 'A loja foi aberta.'],
        ['ver', 'visto', 'O filme foi visto.'],
        ['dizer', 'dito', 'Tudo foi dito.'],
        ['pôr', 'posto', 'A mesa foi posta.'],
      ],
    },
    {
      heading: '¿Cómo se pasa de voz activa a voz pasiva en portugués?',
      paragraphs: [
        'El objeto directo de la activa pasa a ser sujeto de la pasiva, el verbo se convierte en "ser + participio" en el mismo tiempo, y el sujeto original se introduce con "por". "Machado escreveu o livro" → "O livro foi escrito por Machado". El participio concuerda con el nuevo sujeto en género y número (o livro → escrito; a carta → escrita; as cartas → escritas). Si el agente es desconocido o irrelevante, se omite: "O carro foi roubado". Es la misma lógica del español (fue escrito por…), así que la transformación se traslada casi directa.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre "foi feito" y "está feito"?',
      paragraphs: [
        '"Foi feito" (ser + participio) es voz pasiva: describe la acción de hacerlo y suele mencionar quién ("O trabalho foi feito pela equipe"). "Está feito" (estar + participio) es voz pasiva de estado o resultado: describe cómo está la cosa ahora, ya terminada ("O trabalho está feito" = el trabajo ya está hecho). La diferencia es la misma de ser/estar: ser marca la acción o el proceso, estar marca el estado resultante. Para narrar quién hizo algo se usa "foi feito por"; para constatar que algo ya está listo, "está feito".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Voz passiva: ser + participio concordado + por + agente.',
    graphicPrompt: 'Un libro con una flecha indicando que fue escrito por un autor, mostrando la inversión de sujeto.',
    scene: [
      ['O livro foi escrito por Machado de Assis.', 'El libro fue escrito por Machado de Assis.'],
      ['A carta foi enviada pela secretária.', 'La carta fue enviada por la secretaria.'],
      ['Os projetos são avaliados toda semana.', 'Los proyectos son evaluados cada semana.'],
      ['O carro foi roubado ontem.', 'El coche fue robado ayer.'],
      ['A música será lançada amanhã.', 'La música será lanzada mañana.'],
      ['As janelas foram abertas pela manhã.', 'Las ventanas fueron abiertas por la mañana.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['ser conjugado + participio', 'concordância do participio', 'por + agente'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el participio correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona el participio pasado correcto para completar la voz pasiva.',
        type: 'choice',
        items: [
          {
            scene: 'El libro fue escrito por un autor famoso.',
            lines: [['', 'O livro foi ___ por um autor famoso.']],
            options: ['escrito', 'escrevido', 'escrever', 'escrita'],
            answer: 'escrito',
            explain: '"escrever" → participio irregular: escrito. "O livro" es masculino → escrito.',
          },
          {
            scene: 'Las ventanas fueron abiertas.',
            lines: [['', 'As janelas foram ___.']],
            options: ['abertas', 'aberto', 'abertos', 'abridas'],
            answer: 'abertas',
            explain: '"abrir" → participio irregular: aberto. "as janelas" = femm. plural → abertas.',
          },
          {
            scene: 'El trabajo fue hecho por todos.',
            lines: [['', 'O trabalho foi ___ por todos.']],
            options: ['feito', 'feita', 'fazido', 'feitos'],
            answer: 'feito',
            explain: '"fazer" → participio irregular: feito. "o trabalho" = masc. sing. → feito.',
          },
          {
            scene: 'Las cartas fueron enviadas ayer.',
            lines: [['', 'As cartas foram ___ ontem.']],
            options: ['enviadas', 'enviado', 'enviados', 'enviada'],
            answer: 'enviadas',
            explain: '"enviar" → participio regular: enviado/a/os/as. "as cartas" = femm. plural → enviadas.',
          },
          {
            scene: 'El proyecto es evaluado cada mes.',
            lines: [['', 'O projeto é ___ todo mês.']],
            options: ['avaliado', 'avaliada', 'avaliados', 'avaliar'],
            answer: 'avaliado',
            explain: '"avaliar" → participio: avaliado. "o projeto" = masc. sing. → avaliado.',
          },
          {
            scene: 'La película fue vista por millones.',
            lines: [['', 'O filme foi ___ por milhões.']],
            options: ['visto', 'vista', 'vistos', 'vendo'],
            answer: 'visto',
            explain: '"ver" → participio irregular: visto. "o filme" = masc. sing. → visto.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Ser conjugado y participio',
        tag: '2 espacios',
        intro: 'Elige la forma correcta de "ser" y el participio concordado.',
        type: 'dual',
        items: [
          {
            scene: 'El contrato fue firmado por el director.',
            lines: [['', 'O contrato [[0]] [[1]] pelo diretor.']],
            blanks: [
              { options: ['foi', 'foram', 'é', 'são'], answer: 'foi', explain: '"o contrato" = singular → foi (pretérito de ser).' },
              { options: ['assinado', 'assinada', 'assinados', 'assinar'], answer: 'assinado', explain: '"o contrato" = masc. sing. → assinado.' },
            ],
          },
          {
            scene: 'Las propuestas serán analizadas la próxima semana.',
            lines: [['', 'As propostas [[0]] [[1]] na próxima semana.']],
            blanks: [
              { options: ['serão', 'foram', 'são', 'foi'], answer: 'serão', explain: '"as propostas" = plural → serão (futuro de ser).' },
              { options: ['analisadas', 'analisado', 'analisados', 'analisar'], answer: 'analisadas', explain: '"as propostas" = femm. plural → analisadas.' },
            ],
          },
          {
            scene: 'El edificio es limpiado por la empresa.',
            lines: [['', 'O prédio [[0]] [[1]] pela empresa.']],
            blanks: [
              { options: ['é', 'foi', 'são', 'foram'], answer: 'é', explain: '"o prédio" = singular → é (presente de ser).' },
              { options: ['limpo', 'limpa', 'limpos', 'limpado'], answer: 'limpo', explain: '"limpar" tiene participio irregular: limpo. "o prédio" = masc. sing. → limpo.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Noticias en voz pasiva',
        tag: 'Texto guiado',
        intro: 'Completa las noticias eligiendo la forma correcta de la voz pasiva.',
        type: 'guidedText',
        scene: 'Manchetes de jornal usando a voz passiva.',
        text: 'Novo museu [[0]] [[1]] pelo prefeito ontem. Três suspeitos [[2]] [[3]] pela polícia. A reunião [[4]] [[5]] para a próxima semana.',
        blanks: [
          { options: ['foi', 'foram', 'é', 'são'], answer: 'foi', explain: '"Novo museu" = singular → foi.' },
          { options: ['inaugurado', 'inaugurada', 'inaugurados', 'inaugurar'], answer: 'inaugurado', explain: '"museu" = masc. → inaugurado.' },
          { options: ['foram', 'foi', 'são', 'é'], answer: 'foram', explain: '"três suspeitos" = plural → foram.' },
          { options: ['detidos', 'detido', 'detidas', 'deter'], answer: 'detidos', explain: '"suspeitos" = masc. plural → detidos.' },
          { options: ['foi', 'foram', 'é', 'serão'], answer: 'foi', explain: '"a reunião" = singular → foi.' },
          { options: ['adiada', 'adiado', 'adiadas', 'adiar'], answer: 'adiada', explain: '"reunião" = femm. → adiada.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa la voz pasiva',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma correcta de ser + participio.',
        type: 'freeText',
        scene: 'Transformando orações ativas em passivas.',
        text: 'Ela escreveu o livro. → O livro [[0]] (escrever, pretérito). / Eles vão abrir a loja. → A loja [[1]] (abrir, futuro). / Alguém roubou o carro. → O carro [[2]] (roubar, pretérito). / O professor vai avaliar os alunos. → Os alunos [[3]] (avaliar, futuro).',
        blanks: [
          { answer: 'foi escrito', explain: '"escrever" → escrito. "o livro" = masc. sing. → foi escrito.' },
          { answer: 'será aberta', explain: '"abrir" → aberta. "a loja" = femm. sing. → será aberta.' },
          { answer: 'foi roubado', explain: '"roubar" → roubado. "o carro" = masc. sing. → foi roubado.' },
          { answer: 'serão avaliados', explain: '"avaliar" → avaliados. "os alunos" = masc. plural → serão avaliados.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Transforma de activa a pasiva',
        tag: 'Escritura guiada',
        intro: 'Convierte la oración activa en pasiva, manteniendo el agente.',
        type: 'write',
        items: [
          {
            scene: '"Machado de Assis escreveu Dom Casmurro." → Voz passiva.',
            prompt: 'Machado de Assis escreveu Dom Casmurro. → Dom Casmurro...',
            answer: 'Dom Casmurro foi escrito por Machado de Assis.',
            accepted: ['Dom Casmurro foi escrito por Machado de Assis'],
            explain: '"escrever" → escrito. "Dom Casmurro" = masc. sing. → foi escrito.',
          },
          {
            scene: '"A empresa vai lançar o produto amanhã." → Voz passiva.',
            prompt: 'A empresa vai lançar o produto amanhã. → O produto...',
            answer: 'O produto será lançado pela empresa amanhã.',
            accepted: ['O produto vai ser lançado pela empresa amanhã.'],
            explain: '"lançar" → lançado. "o produto" = masc. → será lançado.',
          },
          {
            scene: '"Os estudantes abriram as janelas." → Voz passiva.',
            prompt: 'Os estudantes abriram as janelas. → As janelas...',
            answer: 'As janelas foram abertas pelos estudantes.',
            accepted: [],
            explain: '"abrir" → abertas. "as janelas" = femm. plural → foram abertas.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe noticias en voz pasiva',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones en voz pasiva sobre eventos reales o imaginarios.',
        type: 'write',
        items: [
          {
            scene: 'Escribe una noticia en voz pasiva sobre algo que fue construido o inaugurado.',
            prompt: 'Escreva uma manchete de jornal usando a voz passiva.',
            answer: 'A nova ponte foi inaugurada pelo governador na sexta-feira.',
            accepted: ['O novo hospital foi construído pela prefeitura em 2024.'],
            explain: 'Voz passiva: ser + participio concordado + por + agente.',
          },
          {
            scene: 'Describe algo que fue hecho o descubierto por alguien famoso.',
            prompt: 'Escreva uma frase sobre uma descoberta ou obra em voz passiva.',
            answer: 'A vacina foi descoberta pelos cientistas após anos de pesquisa.',
            accepted: ['O quadro foi pintado por um artista desconhecido.'],
            explain: 'Uso de la voz pasiva para destacar el resultado más que el agente.',
          },
        ],
      },
    ],
  },
}

export default topic
