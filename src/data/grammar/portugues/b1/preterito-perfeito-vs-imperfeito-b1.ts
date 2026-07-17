import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'preterito-perfeito-vs-imperfeito-b1',
  order: '06',
  color: '#166534',
  category: 'Verbos',
  level: 'B1',
  title: 'Pretérito Perfeito vs Imperfeito en Portugués B1',
  shortTitle: 'Pretérito Perfeito vs Imperfeito',
  metaTitle: 'Pretérito Perfeito vs Imperfeito B1 — Cómo elegir el tiempo correcto en portugués',
  description:
    'La distinción entre el pretérito perfeito (ação completada, pontual) y el imperfeito (descrição, hábito, contexto) es fundamental en el portugués B1. Aunque la estructura es similar a la del español, hay contextos donde el portugués (especialmente el brasileño) usa el imperfeito más que el español. Dominar esta diferencia transforma tu narración en portugués.',
  lead: 'Aprende cuándo usar pretérito perfeito (acción puntual y completa) vs imperfeito (contexto, hábito, descripción). Narraciones fluidas en portugués.',
  outcomes: [
    'Distingues acciones puntuales completadas (pretérito perfeito) de estados y hábitos (imperfeito)',
    'Narras historias combinando ambos tiempos de manera natural',
    'Identificas marcadores temporales que señalan cada tiempo',
    'Evitas los errores más comunes de hispanohablantes al narrar en portugués',
  ],

  guide: {
    goal: 'Combinar pretérito perfeito e imperfeito para narrar eventos pasados con sus circunstancias y contexto.',
    model: 'Chovía quando saí de casa. / Comprei um livro ontem. / Morava em São Paulo quando conheci meu marido.',
    formula: 'Perfeito = ação completa/pontual | Imperfeito = contexto / hábito / estado',
    decisions: [
      'Pretérito perfeito: ação que ocorreu uma vez, num momento específico → Ontem comprei um carro.',
      'Pretérito perfeito: ação com início ou fim claros no passado → Saí às 8h.',
      'Imperfeito: descrição do contexto ou cenário de fundo → Fazia calor. As ruas estavam cheias.',
      'Imperfeito: hábito ou ação repetida no passado → Todos os verões, íamos à praia.',
      'Imperfeito: estado mental, emocional ou físico → Ele tinha medo. Ela estava cansada.',
      'Combinação clássica: imperfeito (fundo) + perfeito (ação que irrompe) → Eu lia quando o telefone tocou.',
    ],
    table: [
      ['Tempo', 'Uso principal', 'Exemplo'],
      ['Pretérito perfeito', 'Ação puntual e completa', 'Comi uma maçã no café da manhã.'],
      ['Imperfeito', 'Estado ou descrição de fundo', 'Estava lindo naquele dia.'],
      ['Imperfeito', 'Hábito repetido no passado', 'A gente se via toda semana.'],
    ],
    mistakes: [
      '"Morei em Salvador por cinco anos" ❌ → "Morava em Salvador (durante cinco anos)" ✓ — duração contínua no passado = imperfeito; ou "Morei em Salvador durante cinco anos" ✓ se ya não mora.',
      '"Quando eu tinha 10 anos, joguei futebol todos os dias" ❌ → "jogava" ✓ — hábito repetido = imperfeito.',
      '"Estava chovendo e saí de casa" ✓ — imperfeito + perfeito é correto para fundo + ação.',
    ],
  },

  seo: [
    {
      heading: '¿Cuál es la diferencia entre pretérito perfeito e imperfeito?',
      paragraphs: [
        'El pretérito perfeito (también llamado "pretérito indefinido" en Portugal o "pretérito" en Brasil) presenta una acción como un evento delimitado, con un principio y un fin claros. El imperfeito presenta una situación, un estado o una acción habitual como un telón de fondo sin límites precisos.',
        'Para hispanohablantes, la distinción se parece a la diferencia entre el pretérito indefinido ("fui", "comí") y el imperfecto ("iba", "comía") en español. De hecho, son muy similares, pero hay contextos donde el portugués usa más el imperfeito que el español.',
      ],
    },
    {
      heading: 'Cuándo usar el pretérito perfeito',
      paragraphs: [
        'El pretérito perfeito se usa para narrar acciones que ocurrieron una vez, en un momento específico, o cuyo inicio o fin están claramente delimitados: "Ontem encontrei um amigo." También se usa para una serie de acciones consecutivas que avanzan la narración: "Cheguei, peguei meu saco e me sentei."',
        'Los marcadores temporales que suelen acompañar el pretérito perfeito son: ontem, a semana passada, há dois anos, de repente, de súbito, naquele momento, durante (con duración definida y terminada).',
      ],
      table: [
        ['Marcador', 'Tiempo habitual', 'Ejemplo'],
        ['ontem / semana passada', 'Pretérito perfeito', 'Trabalhou ontem.'],
        ['há + tiempo', 'Pretérito perfeito', 'Ela saiu há três dias.'],
        ['de repente / de súbito', 'Pretérito perfeito', 'De repente, ele gritou.'],
        ['durante (duración cerrada)', 'Pretérito perfeito', 'Morei em Brasília durante dois anos.'],
      ],
    },
    {
      heading: 'Cuándo usar el imperfeito',
      paragraphs: [
        'El imperfeito se usa para describir el contexto o escenario de una historia: "Era noite, a rua estava silenciosa e um vento frio soprava." También para hablar de hábitos o rutinas pasadas: "Quando era criança, eu lia muito." Y para estados emocionales o físicos: "Ela era feliz. Ele tinha fome."',
        'Los marcadores del imperfeito incluyen: sempre, frequentemente, às vezes, todos os dias, cada semana, antigamente, naquela época, quando eu era + adjetivo de idade/etapa.',
      ],
      table: [
        ['Marcador', 'Tiempo habitual', 'Ejemplo'],
        ['sempre / frequentemente', 'Imperfeito', 'Ele comia sempre ali.'],
        ['cada + tempo', 'Imperfeito', 'Ela ligava cada noite.'],
        ['antigamente / naquela época', 'Imperfeito', 'Antigamente, viajávamos mais.'],
        ['quando eu era criança', 'Imperfeito', 'Eu brincava na rua.'],
      ],
    },
    {
      heading: 'La combinación clásica: fondo + acción',
      paragraphs: [
        'La narración más rica en portugués combina ambos tiempos: el imperfeito establece el escenario (lo que estaba pasando, cómo era la situación) y el pretérito perfeito introduce la acción que irrumpe o cambia ese escenario. Esta estructura es tan frecuente que con dominarla transformas completamente tu capacidad de narrar en portugués.',
        'Ejemplo clásico: "Eu dormia (imperfeito = fondo) quando o telefone tocou (perfeito = acción que interrumpe)." Otro ejemplo: "Chovía (fondo), as ruas estavam desertas (descripción), quando vi (acción puntual) uma luz ao longe." Esta estructura es idéntica en español, pero en portugués se usa con incluso más frecuencia.',
      ],
    },
    {
      heading: 'Errores frecuentes de hispanohablantes con el portugués',
      paragraphs: [
        'El error más común es usar el imperfeito para duraciones definidas y terminadas. En portugués, si algo duró "dos años" y terminó, puede usarse tanto el pretérito perfeito como el imperfeito dependiendo del contexto. "Morei em São Paulo durante dois anos" (acción completada = perfeito) vs "Morava em São Paulo naqueles anos" (contexto de hábito = imperfeito).',
        'Otro error es no darse cuenta de que el portugués usa el imperfeito para narraciones en pasado más a menudo que el español en ciertos contextos. En un cuento: "Era uma vez..." (Era una vez...) los verbos de descripción frecuentemente van en imperfeito en portugués. También, los verbos de estado emocional van casi siempre en imperfeito: "Ele tinha medo", "Ela era feliz" — no "teve medo" o "foi feliz" en narrativa.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Contraste perfeito/imperfeito en narraciones reales con contexto + acción.',
    graphicPrompt: 'Línea de tiempo con escena de fondo en imperfeito y flechas de acción puntual en perfeito.',
    scene: [
      ['Fazia bom tempo quando chegamos.', 'Hacía buen tiempo cuando llegamos.'],
      ['Quando era criança, adorava chocolate.', 'De niño, adoraba el chocolate.'],
      ['Ela lia quando seu amigo telefonou.', 'Ella leía cuando llamó su amigo.'],
      ['Morávamos em Rio. Depois nos mudamos.', 'Vivíamos en Río. Luego nos mudamos.'],
      ['Chovía e decidi ficar.', 'Llovía y decidí quedarme.'],
      ['Ontem comprei um livro excelente.', 'Ayer compré un libro excelente.'],
      ['Todos os verões, íamos à praia.', 'Todos los veranos íbamos a la playa.'],
      ['De repente, a luz se apagou.', 'De repente, la luz se apagó.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['perfeito vs imperfeito', 'contexto vs acción', 'marcadores temporales'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Escolha o tempo correto',
        tag: 'Múltipla escolha',
        intro: 'Escolha entre pretérito perfeito e imperfeito segundo o contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Narrando uma tarde de infância',
            lines: [['', "Quando ___ criança, ___ futebol todos os sábados."]],
            options: ['era / jogava', 'fui / joguei', 'era / joguei', 'fui / jogava'],
            answer: 'era / jogava',
            explain: 'Ambos são hábitos/estados no passado → imperfeito para os dois.',
          },
          {
            scene: 'História de ontem',
            lines: [['', "Eu ___ o jornal quando Paulo ___ à porta."]],
            options: ['lia / bateu', 'li / batia', 'lia / batia', 'li / bateu'],
            answer: 'lia / bateu',
            explain: 'Lia = ação de fundo (imperfeito); bateu = ação puntual que interrompe (perfeito).',
          },
          {
            scene: 'Descrição da situação',
            lines: [['', "Era tarde e nós ___ muito cansados."]],
            options: ['éramos', 'fomos', 'éramos fomos'],
            answer: 'éramos',
            explain: 'É uma descrição de estado, não uma ação completa → imperfeito.',
          },
          {
            scene: 'Ação completada com duração definida',
            lines: [['', "Ela ___ em Salvador durante três anos."]],
            options: ['morou', 'morava', 'mora', 'moraria'],
            answer: 'morou',
            explain: 'Duração definida e terminada (durante três anos) → pretérito perfeito.',
          },
          {
            scene: 'Sequência de ações',
            lines: [['', "Ele ___, ___ seu café e ___ para o trabalho."]],
            options: ['acordava / bebia / ia', 'acordou / bebeu / foi', 'acordava / bebe / ia', 'acordou / bebia / foi'],
            answer: 'acordou / bebeu / foi',
            explain: 'Três ações consecutivas que avançam a história → pretérito perfeito.',
          },
          {
            scene: 'Rotina habitual no passado',
            lines: [['', "Cada manhã, eles ___ juntos e ___ o ônibus."]],
            options: ['caminhavam / pegavam', 'caminharam / pegaram', 'caminhavam / pegaram', 'caminharam / pegavam'],
            answer: 'caminhavam / pegavam',
            explain: 'Hábito repetido (cada manhã) → imperfeito para ambos.',
          },
          {
            scene: 'Interrupção inesperada',
            lines: [['', "Nós ___ no parque quando ___ a chover."]],
            options: ['passeávamos / começou', 'passeamos / começava', 'passeávamos / começava', 'passeamos / começou'],
            answer: 'passeávamos / começou',
            explain: 'Passeávamos = ação de fundo; começou = início puntual da chuva.',
          },
          {
            scene: 'Mudança de estado repentina',
            lines: [['', "Tudo de repente ___ muito pálida."]],
            options: ['ficou', 'ficava', 'fica', 'ficaria'],
            answer: 'ficou',
            explain: '"Tudo de repente" indica um evento puntual e inesperado → pretérito perfeito.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dois tempos em contexto',
        tag: '2 espaços',
        intro: 'Complete com pretérito perfeito ou imperfeito segundo o contexto narrativo.',
        type: 'dual',
        items: [
          {
            scene: 'Um dia em Brasília',
            lines: [['', "Naquele dia, [[0]] lindo e Maria [[1]] visitar o Congresso Nacional."]],
            blanks: [
              { options: ['fazia', 'fez', 'faz', 'fará'], answer: 'fazia', explain: 'Descrição do tempo atmosférico como contexto de fundo → imperfeito.' },
              { options: ['decidiu', 'decidia', 'decide', 'decidirá'], answer: 'decidiu', explain: 'Ação puntual de decisão → pretérito perfeito.' },
            ],
          },
          {
            scene: 'História de viagem',
            lines: [['', "Quando [[0]] em Salvador, [[1]] já muito quente."]],
            blanks: [
              { options: ['chegamos', 'chegávamos', 'chegamos', 'chegarem'], answer: 'chegamos', explain: 'Chegar em Salvador foi um momento puntual → pretérito perfeito.' },
              { options: ['fazia', 'fez', 'faz', 'fará'], answer: 'fazia', explain: 'Descrição da temperatura como contexto → imperfeito.' },
            ],
          },
          {
            scene: 'Noite de tempestade',
            lines: [['', "A tempestade [[0]] desde uma hora quando [[1]] finalmente ao abrigo."]],
            blanks: [
              { options: ['durava', 'durou', 'dura', 'durará'], answer: 'durava', explain: 'A tempestade durava (contexto de fundo naquele momento) → imperfeito.' },
              { options: ['chegamos', 'chegávamos', 'chegamos', 'éramos chegado'], answer: 'chegamos', explain: 'Chegar ao abrigo foi a ação puntual → pretérito perfeito.' },
            ],
          },
          {
            scene: 'Recordação de infância',
            lines: [['', "Antigamente, minha avó [[0]] bolos todos os domingos. Um dia, ela me [[1]] seu segredo."]],
            blanks: [
              { options: ['fazia', 'fez', 'faz', 'fará'], answer: 'fazia', explain: 'Hábito repetido cada domingo → imperfeito.' },
              { options: ['revelou', 'revelava', 'revela', 'revelaria'], answer: 'revelou', explain: '"Um dia" sinaliza uma ação puntual e única → pretérito perfeito.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Um verão no Rio',
        tag: 'Texto guiado',
        intro: 'Escolha pretérito perfeito ou imperfeito para completar esta narração de um verão memorável.',
        type: 'guidedText',
        scene: 'Narração de um passeio de verão no Rio de Janeiro.',
        text: "O verão passado, eu [[0]] (ir) para o Rio com minha família. [[1]] (fazer) um tempo magnífico — o céu [[2]] (ser) de um azul intenso. No primeiro dia, nós [[3]] (comer) num restaurante à beira-mar. As pessoas [[4]] (falar) alto e riam. De repente, um músico [[5]] (entrar) no restaurante e [[6]] (começar) a tocar violão. Era perfeito.",
        blanks: [
          { options: ['fui', 'ia', 'vou', 'irei'], answer: 'fui', explain: 'Ação delimitada: ir de férias (um início claro) → pretérito perfeito.' },
          { options: ['fazia', 'fez', 'faz', 'fará'], answer: 'fazia', explain: 'Descrição do tempo como contexto → imperfeito.' },
          { options: ['era', 'foi', 'é', 'será'], answer: 'era', explain: 'Descrição da cor do céu (estado) → imperfeito.' },
          { options: ['comemos', 'comíamos', 'comemos', 'comeremos'], answer: 'comemos', explain: 'Ação puntual ocorrida "no primeiro dia" → pretérito perfeito.' },
          { options: ['falavam', 'falaram', 'falam', 'falarão'], answer: 'falavam', explain: 'Descrição de ambiente (o que estava acontecendo de fundo) → imperfeito.' },
          { options: ['entrou', 'entrava', 'entra', 'entrará'], answer: 'entrou', explain: '"De repente" sinaliza um evento puntual e inesperado → pretérito perfeito.' },
          { options: ['começou', 'começava', 'começamos', 'começará'], answer: 'começou', explain: 'Ação puntual consecutiva à anterior → pretérito perfeito.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escreva os tempos',
        tag: 'Texto livre',
        intro: 'Escreva a forma correta do verbo entre parênteses: pretérito perfeito ou imperfeito.',
        type: 'freeText',
        scene: 'Pequeno conto sobre um encontro inesperado.',
        text: "Naquela noite, eu [[0]] (caminhar) sozinho na rua. [[1]] (fazer) noite e os postes de luz [[2]] (iluminar) fracamente o caminho. De súbito, [[3]] (ouvir) meu nome. Eu [[4]] (virar-se) e [[5]] (ver) uma velha amiga que não via há anos.",
        blanks: [
          { answer: 'caminhava', accepted: ['caminhava'], explain: 'Ação de fundo, em curso naquele momento → imperfeito de "caminhar".' },
          { answer: 'fazia', accepted: ['fazia'], explain: 'Descrição do contexto noturno → imperfeito de "fazer".' },
          { answer: 'iluminavam', accepted: ['iluminavam'], explain: 'Descrição dos postes como contexto → imperfeito de "iluminar".' },
          { answer: 'ouvi', accepted: ['ouvi'], explain: '"De súbito" sinaliza um evento puntual e inesperado → pretérito perfeito de "ouvir".' },
          { answer: 'virei', accepted: ['virei', 'me virei'], explain: 'Ação puntual de virar-se → pretérito perfeito de "virar".' },
          { answer: 'vi', accepted: ['vi'], explain: 'Ação puntual de ver a amiga → pretérito perfeito de "ver".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Produção escrita',
        tag: 'Produção',
        intro: 'Escreva frases combinando pretérito perfeito e imperfeito segundo as instruções.',
        type: 'write',
        items: [
          {
            scene: 'Infância e rotinas',
            prompt: "Escreva uma frase sobre o que você fazia cada fim de semana quando era criança (use imperfeito).",
            answer: "Quando eu era criança, eu jogava com meus amigos no parque cada fim de semana.",
            accepted: ['quando', 'cada', 'todos os', 'antigamente', 'jogava', 'assistia', 'ia', 'comia'],
            explain: "Use imperfeito com marcadores de hábito: Quando eu era criança, eu... / Cada semana, a gente...",
          },
          {
            scene: 'Uma interrupção',
            prompt: "Escreva uma frase clássica de interrupção: estava fazendo algo (imperfeito) quando ocorreu algo (pretérito perfeito).",
            answer: "Eu assistia à televisão quando meu telefone tocou.",
            accepted: ['quando', 'enquanto', 'imperfeito', 'tocou', 'chegou', 'bateu', 'chamou'],
            explain: "Estrutura: Eu [imperfeito] quando [pretérito perfeito]. Exemplo: Eu dormia quando o despertador tocou.",
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de narrativa',
        tag: 'Análise',
        intro: 'Analiza por qué cada verbo usa pretérito perfeito o imperfeito en esta narración.',
        type: 'write',
        items: [
          {
            scene: 'Justificación gramatical',
            prompt: "Lee: 'Eu morei em São Paulo quando era criança. Meus pais tinham um apartamento grande e bonito.' Explica por qué se usa 'morei' (perfeito) en la primera frase e 'era'/'tinham' (imperfeito) en la segunda.",
            answer: "Se usa 'morei' porque es una ação completa con duración definida. Se usa 'era' y 'tinham' porque describen estados habituales del pasado.",
            accepted: ['morei', 'perfeito', 'completa', 'era', 'imperfeito', 'estado', 'hábito'],
            explain: "'Morei' = ação que ocorreu e terminou. 'Era/tinham' = característica do período (estado, não ação).",
          },
        ],
      },
    ],
  },
}

export default topic
