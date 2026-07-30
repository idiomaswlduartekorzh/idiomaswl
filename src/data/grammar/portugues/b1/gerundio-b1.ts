import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'gerundio-b1',
  order: '08',
  color: '#166534',
  category: 'Verbos',
  level: 'B1',
  title: 'Gerundio en Portugués B1',
  shortTitle: 'Gerundio',
  metaTitle: 'Gerundio Portugués B1 — Formación y Usos del Gerundio (-ando, -endo, -indo)',
  description:
    'El gerundio en portugués expresa una acción en progreso o simultánea. Se forma agregando -ando (verbos -AR), -endo (verbos -ER), -indo (verbos -IR) a la raíz del verbo. Se usa con estar (estar + gerundio), vir (continuar), seguir (seguir), ir (ir + gerundio) y en construcciones de progresión verbal. Es fundamental para expresar acciones continuas en portugués.',
  lead: 'Domina el gerundio portugués: formación, usos con estar/continuar/vir/seguir, y diferencias con el infinitivo.',
  outcomes: [
    'Forma gerundios regulares e irregulares en portugués',
    'Usa gerundio para expresar acciones en progreso (estar + gerundio)',
    'Emplea gerundio con otros verbos modales (continuar, seguir, vir, andar)',
    'Diferencia entre gerundio e infinitivo en contextos específicos',
  ],

  guide: {
    goal: 'Expresar acciones en progreso, simultáneas o continuas usando el gerundio con estructuras verbales específicas.',
    model: 'Estou trabalhando. / Continua chovendo. / Vou estudando mais cada dia. / Eles estavam conversando.',
    formula: 'Verbo auxiliar (estar/continuar/vir/seguir) + gerundio | Raíz + -ando/-endo/-indo',
    decisions: [
      'Verbos -AR: elimina -ar, añade -ando (falar → falando, trabalhar → trabalhando)',
      'Verbos -ER: elimina -er, añade -endo (comer → comendo, vender → vendendo)',
      'Verbos -IR: elimina -ir, añade -indo (partir → partindo, dormindo → dormindo)',
      'Estar + gerundio = acción en progreso: "Estou comendo" (estoy comiendo en este momento)',
      'Continuar/seguir + gerundio = acción que prosigue: "Continua chovendo" (sigue lloviendo)',
      'Vir + gerundio = cambio gradual: "Vou melhorando" (voy mejorando / estoy mejorando gradualmente)',
      'Ir + gerundio = progresión temporal: "Vou estudando mais" (voy estudiando cada vez más)',
    ],
    table: [
      ['Verbo', 'Raíz', 'Gerundio'],
      ['falar', 'fal-', 'falando'],
      ['comer', 'com-', 'comendo'],
      ['partir', 'part-', 'partindo'],
      ['estar', 'est-', 'estando'],
      ['fazer', 'faz-', 'fazendo'],
    ],
    mistakes: [
      '"Estou a comer" ✓ (portugués europeo) vs "Estou comendo" ✓ (portugués brasileño) — ambas formas son correctas según la variante.',
      '"Eu estou falando português" ✓ correcto, no "Eu estou falar português" ❌ — gerundio, no infinitivo.',
      '"Vou para trabalhar" (voy para trabajar = propósito) vs "Vou trabalhando" (voy trabajando = progresión) — construcciones diferentes con significados diferentes.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el gerundio en portugués?',
      paragraphs: [
        'El gerundio en portugués es una forma verbal que expresa una acción en progreso, simultánea o continua. Lingüísticamente, es un sustantivo verbal que funciona como adverbio en muchos contextos. Se forma agregando las terminaciones -ando, -endo, o -indo a la raíz del verbo.',
        'El gerundio portugués es similar al gerundio español (-ando, -endo, -iendo) en la mayoría de los casos, pero su uso puede diferir. En portugués, el gerundio es especialmente importante en construcciones progresivas con estar, vir, continuar y seguir.',
      ],
    },
    {
      heading: 'Formación regular del gerundio',
      paragraphs: [
        'Los verbos terminados en -AR forman el gerundio eliminando -ar y añadiendo -ando: hablar → hablando (falar → falando), trabajar → trabajando (trabalhar → trabalhando), estudiar → estudiando (estudar → estudando).',
        'Los verbos terminados en -ER forman el gerundio eliminando -er y añadiendo -endo: comer → comiendo (comer → comendo), temer → temiendo (temer → temendo), comprender → comprendiendo (compreender → compreendendo).',
        'Los verbos terminados en -IR forman el gerundio eliminando -ir y añadiendo -indo: partir → partiendo (partir → partindo), vivir → viviendo (viver → vivendo), dormir → durmiendo (dormir → dormindo).',
      ],
    },
    {
      heading: '¿Cómo se forma el gerundio en portugués?',
      paragraphs: [
        'Algunos verbos tienen gerundios irregulares o experimentan cambios vocálicos en la raíz. Ejemplos: estar → estando (no estindo), fazer → fazendo (no fazando), ser → sendo (no serando), trazer → trazendo (no trazeando).',
        'Verbos con cambio vocálico o > ó / u: dormir → dormindo, servir → servindo. Verbos con cambio e > i: venir → viniendo (vir → vindo), pedir → pidiendo (pedir → pedindo).',
      ],
    },
    {
      heading: 'Estar + gerundio: acciones en progreso',
      paragraphs: [
        'La construcción más común es estar + gerundio para expresar una acción que está sucediendo en el momento actual: "Estou comendo" (estoy comiendo), "Estamos trabalhando" (estamos trabajando), "Ele está dormir" (se está durmiendo).',
        'Esta estructura enfatiza el aspecto progresivo o inacabado de la acción. En portugués brasileño es muy frecuente. En portugués europeo, también se puede usar "estar a" + infinitivo: "Estou a comer" (estoy comiendo).',
      ],
    },
    {
      heading: 'Otros verbos + gerundio: continuar, seguir, vir, ir, andar',
      paragraphs: [
        'Continuar + gerundio expresa que una acción prosigue sin interrumpción: "Continua chovendo" (sigue lloviendo), "Continuamos estudando" (seguimos estudiando).',
        'Vir + gerundio expresa cambio gradual o progresión lenta: "Vou melhorando com o tempo" (voy mejorando con el tiempo), "Vem aumentando o número de casos" (va aumentando el número de casos).',
        'Ir + gerundio en el futuro expresa una acción que se desarrollará gradualmente: "Vou estudando mais" (voy a estudiar cada vez más), "Vamos crescendo" (vamos a crecer).',
        'Andar + gerundio expresa una acción con movimiento o dispersión: "Anda procurando emprego" (anda buscando empleo), "Estão andando reclamando" (andan quejándose).',
      ],
    },
    {
      heading: '¿Cuándo se usa gerundio y cuándo infinitivo en portugués?',
      paragraphs: [
        'Después de preposiciones, se usa el infinitivo, no el gerundio: "Antes de sair..." (antes de salir), "Depois de comer..." (después de comer), "Para estudar melhor..." (para estudiar mejor). No se dice "antes de saindo".',
        'El gerundio en portugués puede usarse como sustantivo: "Nadar é saudável" (nadar es saludable / el nado es saludable), "Gosto de dançar" (me gusta bailar / me gusta el baile). Pero en construcciones de progreso, siempre va gerundio: "Estou dançando" (estoy bailando), nunca "Estou a dançar" (europeo) o "Estou a dança".',
      ],
    },
    {
      heading: 'El gerundio en narrativa y descripción',
      paragraphs: [
        'En narrativa, el gerundio se usa para describir acciones que ocurren simultáneamente o para mostrar que una acción es el contexto de otra: "Passava pela rua, cantarolando alegremente" (pasaba por la calle, tarareando alegremente).',
        'El gerundio también se usa en contextos causales o explicativos: "Trabalhar muito, cansou-se" (trabajando mucho, se cansó), aunque esta estructura es más literaria. En el habla cotidiana, es más común: "Trabalhou muito e cansou-se."',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Gerundio: acción en progreso con estar, continuar, vir, seguir; formación regular e irregular.',
    graphicPrompt: 'Flecha de tiempo mostrando: acción iniciada → progresando (gerundio) → sin conclusión clara.',
    scene: [
      ['Estou comendo um sanduíche delicioso.', 'Estoy comiendo un sándwich delicioso.'],
      ['Continua chovendo desde esta manhã.', 'Sigue lloviendo desde esta mañana.'],
      ['Ela vem estudando português há meses.', 'Ella viene estudiando portugués hace meses.'],
      ['Vamos melhorando nossas notas cada bimestre.', 'Vamos mejorando nuestras notas cada bimestre.'],
      ['Eles estavam conversando quando cheguei.', 'Ellos estaban conversando cuando llegué.'],
      ['Encontrei meu amigo correndo no parque.', 'Encontré a mi amigo corriendo en el parque.'],
      ['Antes de viajar, faço as malas.', 'Antes de viajar, hago las maletas.'],
      ['Estou ansioso esperando o resultado.', 'Estoy ansioso esperando el resultado.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['formación -ando/-endo/-indo', 'estar + gerundio', 'continuar/vir/seguir + gerundio'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma o gerúndio',
        tag: 'Formação',
        intro: 'Converte os verbos para o gerúndio.',
        type: 'choice',
        items: [
          {
            scene: 'Verbos em -AR',
            lines: [['', "O gerúndio de 'falar' é ___?"]],
            options: ['falado', 'falando', 'falas', 'falei'],
            answer: 'falando',
            explain: 'Verbos -AR: fal- + ando = falando.',
          },
          {
            scene: 'Verbos em -ER',
            lines: [['', "O gerúndio de 'comer' é ___?"]],
            options: ['comido', 'comendo', 'comes', 'comeria'],
            answer: 'comendo',
            explain: 'Verbos -ER: com- + endo = comendo.',
          },
          {
            scene: 'Verbos em -IR',
            lines: [['', "O gerúndio de 'partir' é ___?"]],
            options: ['partido', 'partindo', 'partes', 'partiria'],
            answer: 'partindo',
            explain: 'Verbos -IR: part- + indo = partindo.',
          },
          {
            scene: 'Verbo irregular',
            lines: [['', "O gerúndio de 'estar' é ___?"]],
            options: ['estado', 'estando', 'estás', 'estaria'],
            answer: 'estando',
            explain: 'Verbo irregular: está- + ndo = estando.',
          },
          {
            scene: 'Verbo com radical mudado',
            lines: [['', "O gerúndio de 'fazer' é ___?"]],
            options: ['fazedo', 'fazendo', 'fazes', 'faria'],
            answer: 'fazendo',
            explain: 'Fazer é irregular: faz- + endo = fazendo.',
          },
          {
            scene: 'Verbo -IR com cambio',
            lines: [['', "O gerúndio de 'dormir' é ___?"]],
            options: ['dormido', 'dormendo', 'dormes', 'dormiria'],
            answer: 'dormendo',
            explain: 'Dormir: dorm- + endo = dormendo. (Nota: gerundio en -endo, no -indo, para verbos -IR en portugués).',
          },
          {
            scene: 'Verbo frecuente',
            lines: [['', "O gerúndio de 'trabalhar' é ___?"]],
            options: ['trabalhado', 'trabalhando', 'trabalhas', 'trabalharia'],
            answer: 'trabalhando',
            explain: 'Trabalhar: trabalh- + ando = trabalhando.',
          },
          {
            scene: 'Verbo venir',
            lines: [['', "O gerúndio de 'vir' é ___?"]],
            options: ['vindo', 'virando', 'vem', 'viria'],
            answer: 'vindo',
            explain: 'Vir es irregular: vin- + do = vindo (no "virando").',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Estar + gerúndio',
        tag: '2 elementos',
        intro: 'Completa con estar en tiempo presente + gerundio.',
        type: 'dual',
        items: [
          {
            scene: 'Ação em progresso agora',
            lines: [['', "Nós [[0]] (estar) [[1]] (estudar) para a prova."]],
            blanks: [
              { options: ['estamos', 'estou', 'está', 'estão'], answer: 'estamos', explain: '"Nós" → estamos (conjugación de estar).' },
              { options: ['estudar', 'estudando', 'estudamos', 'estudaram'], answer: 'estudando', explain: 'Estar + gerundio → estudando.' },
            ],
          },
          {
            scene: 'Ação passada em progresso',
            lines: [['', "Quando cheguei, eles [[0]] (estar) [[1]] (trabalhar)."]],
            blanks: [
              { options: ['estavam', 'estão', 'estiveram', 'estariam'], answer: 'estavam', explain: 'Pretérito: estavam (imperfeito de estar).' },
              { options: ['trabalho', 'trabalhando', 'trabalham', 'trabalharam'], answer: 'trabalhando', explain: 'Estar em imperfeito + gerundio → trabalhando.' },
            ],
          },
          {
            scene: 'Ação contínua no futuro',
            lines: [['', "Amanhã às 3 horas, nós [[0]] (estar) [[1]] (comer) bolo de aniversário."]],
            blanks: [
              { options: ['estamos', 'estaremos', 'estariam', 'estejamos'], answer: 'estaremos', explain: 'Futuro de estar: estaremos.' },
              { options: ['comemos', 'comendo', 'comeremos', 'comeriam'], answer: 'comendo', explain: 'Estar en futuro + gerundio → comendo.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Continuar/vir + gerúndio',
        tag: 'Otros verbos',
        intro: 'Completa con continuar o vir + gerundio según el contexto.',
        type: 'guidedText',
        scene: 'Descripción de cambios graduales.',
        text: "A situação continua [[0]] (piorar) a cada dia. Muitos migrantes vêm [[1]] (chegar) em busca de novas oportunidades. As temperaturas vão [[2]] (aumentar) nos próximos meses. Ele continua [[3]] (procurar) emprego após meses sem sucesso. Os preços seguem [[4]] (subir) descontroladamente.",
        blanks: [
          { options: ['piorar', 'piorando', 'piora', 'piore'], answer: 'piorando', explain: 'Continua + gerundio: piorando (progresión).' },
          { options: ['chegar', 'chegando', 'chegam', 'chegassem'], answer: 'chegando', explain: 'Vêm + gerundio: chegando (cambio gradual).' },
          { options: ['aumentar', 'aumentando', 'aumentam', 'aumentem'], answer: 'aumentando', explain: 'Vão + gerundio: aumentando (progresión temporal).' },
          { options: ['procura', 'procurando', 'procure', 'procurou'], answer: 'procurando', explain: 'Continua + gerundio: procurando.' },
          { options: ['subida', 'subindo', 'sobem', 'subam'], answer: 'subindo', explain: 'Seguem + gerundio: subindo.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Narrativa con gerúndio',
        tag: 'Texto livre',
        intro: 'Escribe los gerundios necesarios para completar la narrativa.',
        type: 'freeText',
        scene: 'Una escena descriptiva del día a día.',
        text: "Vi-o [[0]] (caminhar) pelas ruas, [[1]] (cantar) baixo para si mesmo. Ele continuava [[2]] (procurar) algo que parecia importante. Quando entrou na loja, estava [[3]] (chover) lá fora e a multidão seguia [[4]] (apressar-se) para chegar em casa.",
        blanks: [
          { answer: 'caminhando', accepted: ['caminhando'], explain: 'Gerundio de caminhar: caminhando.' },
          { answer: 'cantando', accepted: ['cantando'], explain: 'Gerundio de cantar: cantando.' },
          { answer: 'procurando', accepted: ['procurando'], explain: 'Continuar + gerundio: procurando.' },
          { answer: 'chovendo', accepted: ['chovendo'], explain: 'Estar + gerundio: chovendo.' },
          { answer: 'apressando-se', accepted: ['apressando-se', 'apressando se'], explain: 'Seguir + gerundio pronominal: apressando-se.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción de oraciones',
        tag: 'Producción',
        intro: 'Escribe frases usando gerundio según las instrucciones.',
        type: 'write',
        items: [
          {
            scene: 'Ação em progresso agora',
            prompt: "Escreva uma frase sobre o que você está fazendo neste momento (use estar + gerundio).",
            answer: "Estou respondendo esta pergunta com atenção.",
            accepted: ['estou', 'estamos', 'está', 'gerundio', 'ando', 'endo', 'indo'],
            explain: "Use estar em presente + gerundio para expresar ações en progreso.",
          },
          {
            scene: 'Cambio gradual',
            prompt: "Escreva uma frase sobre algo que vem melhorando ou mudando gradualmente (use vir/vem + gerundio).",
            answer: "Meu português vem melhorando desde que estudo regularmente.",
            accepted: ['vem', 'vou', 'vindo', 'melhorando', 'gerundio'],
            explain: '"Vir + gerundio" expresa cambio gradual con el paso del tiempo.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de contextos',
        tag: 'Análise',
        intro: 'Identifica y analiza el uso del gerundio en distintos contextos.',
        type: 'write',
        items: [
          {
            scene: 'Progreso vs infinitivo',
            prompt: "Compara: 'Estou correndo' vs 'Para correr, preciso de energia'. ¿Por qué uno usa gerundio y el otro infinitivo?",
            answer: "'Estou correndo' usa gerundio porque es una ación em progreso. 'Para correr' usa infinitivo porque va después de una preposición.",
            accepted: ['gerundio', 'progreso', 'infinitivo', 'preposição', 'para'],
            explain: 'Preposiciones requieren infinitivo, no gerundio. Estar requiere gerundio para expresar progreso.',
          },
        ],
      },
    ],
  },
}

export default topic
