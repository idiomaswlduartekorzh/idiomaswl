import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'ser-e-estar',
  order: '02',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A1',
  title: 'Ser e Estar en portugués A1 — Diferencias clave',
  shortTitle: 'Ser e Estar',
  metaTitle: 'Ser e estar português A1 — diferencias uso conjugación',
  description:
    'El portugués sí distingue entre ser y estar, igual que el español, aunque las reglas de uso no son idénticas. Ser (sou/és/é/somos/são) se usa para identidad, profesión, origen y características permanentes. Estar (estou/estás/está/estamos/estão) se usa para estados, ubicación y condiciones temporales.',
  lead: 'Ser: sou/és/é/somos/são — identidad, profesión, origen. Estar: estou/estás/está/estamos/estão — estado, ubicación. La lógica es similar al español pero hay diferencias: en Brasil, ubicación a veces usa ser.',
  outcomes: [
    'Conjuga ser y estar en presente para todos los sujetos',
    'Distingue cuándo usar ser vs estar en portugués',
    'Reconoce diferencias con el español en algunos usos',
  ],

  guide: {
    goal: 'Usar ser y estar correctamente en portugués A1 para identidad, origen, profesión, estado y ubicación.',
    model: 'Eu sou professor. (Soy profesor.) / Eu estou cansado. (Estoy cansado.) / Onde você está? (¿Dónde estás?)',
    formula: 'SER: sou/és/é/somos/são | ESTAR: estou/estás/está/estamos/estão',
    decisions: [
      'SER: identidade (Eu sou Iván), origem (Sou de Bogotá), profissão (Sou professor)',
      'SER: características permanentes (Ela é alta), hora (São duas horas)',
      'ESTAR: estado/condição (Estou cansado, Estás bem?), emoções (Estou feliz)',
      'ESTAR: localização (A chave está na mesa, Onde você está?)',
      'Diferença com espanhol: "O mercado é aqui" (Brasil, ser para lugar fixo) mas "Estou em casa" (estar)',
    ],
    table: [
      ['Sujeto', 'SER', 'ESTAR'],
      ['eu', 'sou', 'estou'],
      ['tu/você', 'és/é', 'estás/está'],
      ['ele/ela', 'é', 'está'],
      ['nós', 'somos', 'estamos'],
      ['vocês/eles', 'são', 'estão'],
    ],
    mistakes: [
      '"Estou professor" ✗ → "Sou professor". La profesión siempre con ser.',
      '"Ele é cansado" ✗ → "Ele está cansado". El estado temporal usa estar.',
      'Nota: "São" de ser (eles são) ≠ "São Paulo" (nombre propio). No confundir.',
    ],
  },
  seo: [
    {
      heading: 'Ser y estar en portugués: similar al español pero no igual',
      paragraphs: [
        'El portugués también distingue entre ser y estar, lo que es una ventaja para el hispanohablante frente a un anglohablante. La distinción básica es la misma: ser para lo permanente (identidad, origen, profesión) y estar para lo temporal (estado, emoción, ubicación). Pero hay particularidades.',
        'Una diferencia importante: en el portugués brasileño, la ubicación de establecimientos fijos o permanentes puede expresarse con ser: "A escola é aqui" (La escuela es/está aquí). Esto no existe en español europeo ni en el portugués europeo, que siempre usaría estar para ubicación.',
      ],
    },
    {
      heading: 'Conjugaciones de ser y estar: memorizar sou y estou',
      paragraphs: [
        'La conjugación de ser en presente: sou (yo soy), és/é (tú eres/usted es), é (él/ella es), somos (nosotros somos), são (ellos/ustedes son). La de estar: estou (yo estoy), estás/está (tú estás/usted está), está (él/ella está), estamos (estamos), estão (ellos/ustedes están).',
        'El patrón de estou/estás/está es muy regular — solo la primera persona rompe el patrón con -ou en lugar de -o. En contraste, ser es completamente irregular (sou/és/é), como en español (soy/eres/es).',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre ser y estar en portugués?',
      paragraphs: [
        'La regla base es la misma que en español: ser marca lo permanente o definitorio (identidad, origen, profesión, características, hora), y estar marca lo temporal o circunstancial (estado, emoción, ubicación). Si en español dirías "soy", en portugués es sou/é; si dirías "estoy", es estou/está. Esa equivalencia acierta en el 90 % de los casos.',
        'La trampa está en el 10 % restante: el portugués de Brasil admite ser para la ubicación de cosas fijas o permanentes ("A padaria é na esquina", la panadería queda en la esquina), donde el español obliga estar. Para personas y situaciones temporales, en cambio, siempre estar: "Onde você está?", nunca "onde você é". Esta tabla resume qué verbo pide cada función:',
      ],
      table: [
        ['Uso', 'Verbo', 'Exemplo'],
        ['Identidade / nome', 'ser', 'Eu sou Ana.'],
        ['Origem', 'ser', 'Sou da Colômbia.'],
        ['Profissão', 'ser', 'Ela é médica.'],
        ['Característica permanente', 'ser', 'Ele é alto.'],
        ['Hora e data', 'ser', 'São três horas.'],
        ['Estado / condição', 'estar', 'Estou cansado.'],
        ['Emoção', 'estar', 'Estamos felizes.'],
        ['Localização (pessoas)', 'estar', 'A chave está aqui.'],
        ['Local fixo (Brasil)', 'ser', 'A escola é aqui.'],
      ],
    },
    {
      heading: '¿Cómo se conjugan ser y estar en presente?',
      paragraphs: [
        'Ser es irregular y hay que memorizarlo; estar es casi regular salvo la primera persona (estou, no "esto"). Conviene aprender las dos columnas en paralelo porque en la conversación se alternan todo el tiempo. Esta es la tabla completa de las dos:',
      ],
      table: [
        ['Persona', 'SER', 'ESTAR'],
        ['eu', 'sou', 'estou'],
        ['tu', 'és', 'estás'],
        ['você / ele / ela', 'é', 'está'],
        ['nós', 'somos', 'estamos'],
        ['vocês / eles / elas', 'são', 'estão'],
      ],
    },
    {
      heading: '¿Se dice "sou professor" o "estou professor"?',
      paragraphs: [
        'Se dice "sou professor". La profesión es una identidad, no un estado, así que va con ser en portugués igual que en español ("soy profesor", no "estoy profesor"). El mismo criterio aplica a "sou estudante", "sou médico", "sou de Bogotá". El error de usar estar con la profesión es el más frecuente del hispanohablante que arrastra la duda del inglés, pero en portugués la lógica es idéntica a la del español: identidad → ser.',
        'El contraste típico en un examen es "Eu ___ engenheiro, mas hoje ___ de férias": la primera es sou (profesión, ser) y la segunda estou (situación temporal, estar). Cuando dudes, pregúntate si la frase describe QUIÉN es alguien (ser) o CÓMO está en este momento (estar).',
      ],
    },
  ],
  visual: {
    mode: 'verb-conjugation',
    teacherLens: 'El estudiante distingue ser vs estar en portugués y aprende las dos conjugaciones.',
    graphicPrompt: 'Tabla paralela SER / ESTAR con usos marcados. sou/estou en primera persona.',
    scene: [
      ['SER: sou/és/é/somos/são', 'identidad, origen, profesión'],
      ['ESTAR: estou/estás/está/estamos/estão', 'estado, ubicación, emoción'],
      ['diferença: profissão → ser | cansado → estar', 'regla clave'],
    ],
    learnerModes: ['visual: tabla paralela', 'analítico: ser vs estar', 'oral: presentaciones y estados'],
    practiceVerbs: ['Identifica', 'Ubica', 'Describe', 'Siente', 'Pregunta', 'Niega'],
    reviewFocus: ['sou vs estou', 'profissão → ser', 'cansado → estar', 'são ≠ São Paulo'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Ser o estar',
        tag: 'Opción múltiple',
        intro: 'Elige entre ser y estar (forma conjugada).',
        type: 'choice',
        items: [
          {
            scene: 'Profesión',
            lines: [['Iván', 'Eu ___ professor de línguas.']],
            options: ['sou', 'estou', 'é', 'está'],
            answer: 'sou',
            explain: 'Profesión: eu + ser → sou. "Sou professor".',
          },
          {
            scene: 'Estado temporal',
            lines: [['Sofia', 'Eu ___ muito cansada hoje.']],
            options: ['estou', 'sou', 'é', 'estás'],
            answer: 'estou',
            explain: 'Estado temporal: eu + estar → estou. "Estou cansada".',
          },
          {
            scene: 'Origen',
            lines: [['Carlos', 'Eu ___ de Bogotá, na Colômbia.']],
            options: ['sou', 'estou', 'é', 'está'],
            answer: 'sou',
            explain: 'Origen: eu + ser → sou. "Sou de Bogotá".',
          },
          {
            scene: 'Ubicación',
            lines: [['Ana', 'Onde você ___? Estou te procurando.']],
            options: ['está', 'é', 'estás', 'são'],
            answer: 'está',
            explain: 'Ubicación: você (3ª sg) + estar → está.',
          },
          {
            scene: 'Descripción permanente',
            lines: [['Marco', 'A Elena ___ muito inteligente.']],
            options: ['é', 'está', 'sou', 'estou'],
            answer: 'é',
            explain: 'Característica permanente: ela + ser → é.',
          },
          {
            scene: 'Emoción temporal',
            lines: [['Lina', 'Hoje eu ___ muito feliz!']],
            options: ['estou', 'sou', 'está', 'é'],
            answer: 'estou',
            explain: 'Emoción temporal: eu + estar → estou. "Estou feliz".',
          },
          {
            scene: 'Hora',
            lines: [['Professor', '___ duas horas da tarde.']],
            options: ['São', 'Estão', 'É', 'Está'],
            answer: 'São',
            explain: 'Hora plural: São + hora. "São duas horas" (son las dos).',
          },
          {
            scene: 'Nosotros',
            lines: [['Ana', 'Nós ___ estudantes de português na WeLearn.']],
            options: ['somos', 'estamos', 'são', 'estão'],
            answer: 'somos',
            explain: 'Identidad: nós + ser → somos. "Somos estudantes".',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Ser y estar en diálogo',
        tag: '2 espacios',
        intro: 'Completa con las formas correctas de ser o estar.',
        type: 'dual',
        items: [
          {
            scene: 'Presentación y estado',
            lines: [
 ['Carlos', 'Eu [[0]] Carlos. Como você [[1]]?'],
 ['Ana', 'Estou bem, obrigada!'],
 ],
            blanks: [
              { options: ['sou', 'estou', 'é'], answer: 'sou', explain: 'Identidad: eu sou + nombre.' },
              { options: ['está', 'é', 'estás'], answer: 'está', explain: 'Estado: como você está? (¿cómo estás?)' },
            ],
          },
          {
            scene: 'Profesión y ubicación',
            lines: [['Iván', 'Eu [[0]] professor e agora [[1]] na sala de aula.']],
            blanks: [
              { options: ['sou', 'estou', 'é'], answer: 'sou', explain: 'Profesión: eu sou professor.' },
              { options: ['estou', 'sou', 'é'], answer: 'estou', explain: 'Ubicación: eu estou + lugar.' },
            ],
          },
          {
            scene: 'Origen y emoción',
            lines: [['Elena', 'Ela [[0]] da Ucrânia mas [[1]] muito feliz no Brasil.']],
            blanks: [
              { options: ['é', 'está', 'sou'], answer: 'é', explain: 'Origen: ela é de Ucrânia. Ser.' },
              { options: ['está', 'é', 'estou'], answer: 'está', explain: 'Emoción: ela está feliz. Estar.' },
            ],
          },
          {
            scene: 'Ellos: identidad y estado',
            lines: [['Ana', 'Os alunos [[0]] brasileiros e [[1]] muito cansados hoje.']],
            blanks: [
              { options: ['são', 'estão', 'somos'], answer: 'são', explain: 'Origen/identidad: eles são brasileiros. Ser.' },
              { options: ['estão', 'são', 'somos'], answer: 'estão', explain: 'Estado temporal: eles estão cansados. Estar.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Ser o estar: elige la forma correcta.',
        type: 'guidedText',
        scene: 'Un día en la WeLearn Brasil',
        text: 'Iván [[0]] (ser) professor na WeLearn. Hoje ele [[1]] (estar) muito animado porque tem uma aula nova. Os alunos [[2]] (estar) em sala esperando. A sala [[3]] (ser) grande e confortável. Elena [[4]] (ser) a diretora — ela [[5]] (estar) no escritório agora.',
        blanks: [
          { options: ['é', 'está'], answer: 'é', explain: 'Profesión: Iván é professor. Ser.' },
          { options: ['está', 'é'], answer: 'está', explain: 'Estado: hoje ele está animado. Estar.' },
          { options: ['estão', 'são'], answer: 'estão', explain: 'Ubicación: os alunos estão em sala. Estar.' },
          { options: ['é', 'está'], answer: 'é', explain: 'Característica permanente: a sala é grande. Ser.' },
          { options: ['é', 'está'], answer: 'é', explain: 'Función/cargo: Elena é diretora. Ser.' },
          { options: ['está', 'é'], answer: 'está', explain: 'Ubicación: ela está no escritório. Estar.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta de ser o estar.',
        type: 'freeText',
        scene: 'Conversação num café no Brasil',
        text: 'Eu [[0]] Carlos e [[1]] de Medellín. Hoje [[2]] no Rio de Janeiro a trabalho. A cidade [[3]] muito bonita! Você [[4]] carioca? Não, eu [[5]] colombiano, mas [[6]] aqui há três dias.',
        blanks: [
          { answer: 'sou', explain: 'Identidad: eu sou Carlos.' },
          { answer: 'sou', explain: 'Origen: eu sou de Medellín.' },
          { answer: 'estou', explain: 'Ubicación: eu estou no Rio.' },
          { answer: 'é', explain: 'Característica: a cidade é bonita. Ser.' },
          { answer: 'é', explain: 'Origen/identidad: você é carioca? Ser.' },
          { answer: 'sou', explain: 'Identidad: eu sou colombiano. Ser.' },
          { answer: 'estou', explain: 'Ubicación temporal: estou aqui. Estar.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la frase completa con ser o estar.',
        type: 'write',
        items: [
          {
            scene: 'Soy estudiante',
            prompt: 'Escribe: Soy estudiante de portugués. → Eu ___ estudante de português.',
            answer: 'Eu sou estudante de português.',
            accepted: ['eu sou estudante de português', 'eu sou estudante de português.'],
            explain: 'Identidad: eu sou estudante. Ser.',
          },
          {
            scene: 'Estoy cansado',
            prompt: 'Escribe: Estoy muy cansado hoy. → Eu ___ muito cansado hoje.',
            answer: 'Eu estou muito cansado hoje.',
            accepted: ['eu estou muito cansado hoje', 'eu estou muito cansado hoje.'],
            explain: 'Estado temporal: eu estou cansado. Estar.',
          },
          {
            scene: 'Ella es de Brasil',
            prompt: 'Escribe: Ella es de Brasil. → Ela ___ do Brasil.',
            answer: 'Ela é do Brasil.',
            accepted: ['ela é do brasil', 'ela é do brasil.'],
            explain: 'Origen: ela é do Brasil. Ser.',
          },
          {
            scene: 'Ellos están en casa',
            prompt: 'Escribe: Ellos están en casa. → Eles ___ em casa.',
            answer: 'Eles estão em casa.',
            accepted: ['eles estão em casa', 'eles estão em casa.'],
            explain: 'Ubicación: eles estão em casa. Estar.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Preséntate y describe tu estado actual usando ser y estar.',
        type: 'write',
        items: [
          {
            scene: 'Presentación completa',
            prompt: 'Eu me chamo ___. Eu ___ (origen) de ___. Eu ___ (profesión) ___. Hoje eu ___ (estado) ___.',
            answer: 'Eu me chamo Carlos. Eu sou de Bogotá. Eu sou estudante. Hoje eu estou feliz.',
            accepted: ['eu me chamo carlos eu sou de bogotá eu sou estudante hoje eu estou feliz'],
            explain: 'Sou para origen y profesión. Estou para estado.',
          },
          {
            scene: 'Describe a alguien',
            prompt: 'O meu amigo/A minha amiga ___ (ser) ___. Hoje ___ (estar) ___.',
            answer: 'O meu amigo é estudante. Hoje ele está cansado.',
            accepted: ['o meu amigo é estudante hoje ele está cansado', 'a minha amiga é professora hoje ela está feliz'],
            explain: 'É para profesión/identidad. Está para estado.',
          },
          {
            scene: 'Tu clase',
            prompt: 'Nós ___ (ser) estudantes de ___. Hoje ___ (estar) ___.',
            answer: 'Nós somos estudantes de português. Hoje estamos muito motivados.',
            accepted: ['nós somos estudantes de português hoje estamos muito motivados'],
            explain: 'Somos para identidad. Estamos para estado.',
          },
        ],
      },
    ],
  },
}

export default topic
