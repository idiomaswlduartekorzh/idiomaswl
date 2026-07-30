import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'participio-passado-b1',
  order: '10',
  color: '#166534',
  category: 'Verbos',
  level: 'B1',
  title: 'Participio Pasado en Portugués B1',
  shortTitle: 'Participio Pasado',
  metaTitle: 'Participio Pasado Portugués B1 — Formación y Participios Irregulares',
  description:
    'El participio pasado en portugués se forma agregando -ado (verbos -AR), -ido (verbos -ER/-IR) a la raíz. Se usa con los auxiliares ter/haver para formar tiempos compuestos y con ser para la voz pasiva. Muchos verbos tienen participios irregulares que son cruciales memorizar para el nivel B1.',
  lead: 'Domina la formación regular e irregular del participio pasado: -ado/-ido y participios irregulares clave.',
  outcomes: [
    'Forma participios regulares e irregulares correctamente',
    'Usa participio pasado en tiempos compuestos (ter + participio)',
    'Aplica participio pasado en voz pasiva (ser + participio)',
    'Memoriza y aplica participios irregulares más importantes',
  ],

  guide: {
    goal: 'Construir participios regulares e irregulares para usar en tiempos compuestos y voz pasiva.',
    model: 'Tenho comido. / Fui visto. / O livro foi escrito. / Participios irregulares: feito, visto, aberto, escrito.',
    formula: 'Verbos regulares: raíz + -ado/-ido | Irregulares: formas específicas a memorizar',
    decisions: [
      'Verbos -AR: raíz + -ado (falar → falado, trabalhar → trabalhado)',
      'Verbos -ER/-IR: raíz + -ido (comer → comido, partir → partido)',
      'Participios irregulares frecuentes: ser→sido, estar→estado, ir→ido, fazer→feito, ver→visto, dar→dado, vir→vindo, pôr→posto, abrir→aberto, escrever→escrito, dizer→dito',
      'Algunos verbos tienen doble participio: um regular (para tiempos compuestos) y otro irregular (para adjetivos/pasiva): ganhar→ganhado/ganho, pagar→pagado/pago',
      'El participio debe concordar en género y número con el sujeto en la voz pasiva: O livro foi escrito. / A carta foi escrita. / Os livros foram escritos.',
      'En tiempos compuestos, el participio NO concuerda: Tenho escrito muitas cartas. / Eles têm escrito muitos artigos.',
    ],
    table: [
      ['Verbo', 'Participio regular', 'Participio irregular (si existe)'],
      ['falar', 'falado', '-'],
      ['comer', 'comido', '-'],
      ['partir', 'partido', '-'],
      ['fazer', 'feito', 'feito'],
      ['escrever', 'escrevido (raro)', 'escrito'],
      ['abrir', 'aberto (raro)', 'aberto'],
      ['ver', 'visto (não vido)', 'visto'],
    ],
    mistakes: [
      '"A porta foi aberta pelo porteiro" ✓ — participio concorda con el sujeto. "O porteiro abriu a porta" ✓ — en indicativo directo.',
      '"Tenho escrito muitos emails" ✓ (participio NO concuerda en tiempos compuestos) vs "Os emails foram escritos" ✓ (participio SÍ concuerda en pasiva).',
      '"Verbo ganhar: ele tem ganhado" ✓ (participio regular) vs "A partida foi ganha" ✓ (participio irregular como adjetivo/pasiva).',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el participio pasado en portugués?',
      paragraphs: [
        'El participio pasado es una forma verbal que funciona como adjetivo verbal en muchos contextos. En portugués se usa principalmente en tres contextos: 1) tiempos compuestos con ter/haver, 2) voz pasiva con ser, 3) como adjetivo que describe un estado resultante.',
        'La formación es regular para la mayoría de verbos, pero hay muchas formas irregulares que son de uso frecuente y que deben ser memorizadas.',
      ],
    },
    {
      heading: 'Participios regulares: -ado, -ido',
      paragraphs: [
        'Los verbos terminados en -AR forman el participio agregando -ado a la raíz: falar → falado, trabalhar → trabalhado, estudar → estudado, morar → morado.',
        'Los verbos terminados en -ER e -IR forman el participio agregando -ido a la raíz: comer → comido, beber → bebido, partir → partido, viver → vivido, ouvir → ouvido.',
      ],
    },
    {
      heading: '¿Cuáles son los participios irregulares en portugués?',
      paragraphs: [
        'Los verbos más frecuentes tienen participios irregulares que deben ser memorizados: ser→sido, estar→estado, ir→ido, fazer→feito, ver→visto, dar→dado, vir→vindo, pôr→posto, abrir→aberto, escrever→escrito, dizer→dito, morrer→morto, cobrir→coberto.',
        'Estos 13 participios irregulares son suficientes para cubrir la mayoría de conversaciones en B1. Otros participios irregulares menos comunes también existen: ganhar→ganho, pagar→pago, aceitar→aceite, suspender→suspenso.',
      ],
    },
    {
      heading: 'Participio en tiempos compuestos: sin concordancia',
      paragraphs: [
        'Cuando el participio se usa en tiempos compuestos (con ter/haver), el participio permanece invariable y NO concuerda en género o número: "Eu tenho comido", "Ela tem comido", "Nós temos comido", "As meninas têm comido".',
        'Esto es muy diferente a la voz pasiva, donde el participio sí concuerda con el sujeto.',
      ],
    },
    {
      heading: 'Participio en voz pasiva: con concordancia',
      paragraphs: [
        'Cuando el participio se usa en voz pasiva (con ser), el participio siempre concuerda en género y número con el sujeto: "O livro foi escrito" (masculino singular), "A carta foi escrita" (femenino singular), "Os livros foram escritos" (masculino plural), "As cartas foram escritas" (femenino plural).',
        'Esta concordancia es obligatoria en la voz pasiva y es uno de los puntos más importantes de la gramática portuguesa que los hispanohablantes deben dominar.',
      ],
    },
    {
      heading: '¿Qué verbos tienen doble participio en portugués?',
      paragraphs: [
        'Algunos verbos tienen dos formas de participio: una regular y otra irregular. Generalmente, el participio regular se usa en tiempos compuestos (aunque el irregular es aceptado) y el irregular en voz pasiva y como adjetivo.',
        'Ejemplo: "ganhar" → ganhado (compuesto: tenho ganhado) / ganho (pasiva: a partida foi ganha, el muchacho ganho = ganador). Este patrón es especialmente común con verbos derivados de formas latinas que tienen raíces irregulares.',
      ],
    },
    {
      heading: 'Participio como adjetivo: estado resultante',
      paragraphs: [
        'El participio pasado se usa frecuentemente como adjetivo para describir un estado resultante: "a porta está aberta" (la puerta está abierta = estado resultante de haber sido abierta), "estou cansado" (estoy cansado = estado resultante de haber trabajado).',
        'Esta estructura con estar + participio (adjetivo) es diferente de la pasiva con ser + participio. "Estar" enfatiza el estado resultante; "ser" enfatiza la acción.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Participio pasado regular (-ado/-ido) e irregular; concordancia en pasiva, no en compuestos.',
    graphicPrompt: 'Tabla: verbos base → participios regulares e irregulares; uso en compuestos vs pasiva.',
    scene: [
      ['O trabalho foi terminado ontem.', 'El trabajo fue terminado ayer.'],
      ['Tenho comido muito nesta semana.', 'He comido mucho esta semana.'],
      ['Ela foi visto no mercado.', 'Ella fue vista en el mercado.'],
      ['As portas estão fechadas.', 'Las puertas están cerradas.'],
      ['Tenho escrito muitos emails.', 'He escrito muchos correos.'],
      ['A história foi escrita com cuidado.', 'La historia fue escrita cuidadosamente.'],
      ['O livro tinha sido publicado antes.', 'El libro había sido publicado antes.'],
      ['Estou interessado no assunto.', 'Estoy interesado en el asunto.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['regular (-ado/-ido)', 'irregulares clave', 'concordancia en pasiva'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forme o particípio',
        tag: 'Formação',
        intro: 'Convierte los verbos en participios pasados.',
        type: 'choice',
        items: [
          {
            scene: 'Participios regulares -ado',
            lines: [['', "O participio de 'trabalhar' é ___?"]],
            options: ['trabalha', 'trabalhado', 'trabalhei', 'trabalhe'],
            answer: 'trabalhado',
            explain: 'Verbo -AR: trabalh- + ado = trabalhado.',
          },
          {
            scene: 'Participios regulares -ido',
            lines: [['', "O participio de 'comer' é ___?"]],
            options: ['como', 'comido', 'comerei', 'coma'],
            answer: 'comido',
            explain: 'Verbo -ER: com- + ido = comido.',
          },
          {
            scene: 'Participios irregulares',
            lines: [['', "O participio de 'fazer' é ___?"]],
            options: ['feito', 'fazido', 'faz', 'faça'],
            answer: 'feito',
            explain: 'Verbo irregular: fazer → feito (no "fazido").',
          },
          {
            scene: 'Participios irregulares',
            lines: [['', "O participio de 'escrever' é ___?"]],
            options: ['escrevido', 'escrito', 'escreva', 'escreve'],
            answer: 'escrito',
            explain: 'Verbo irregular: escrever → escrito (no "escrevido").',
          },
          {
            scene: 'Participios irregulares frecuentes',
            lines: [['', "O participio de 'ver' é ___?"]],
            options: ['visto', 'vido', 'vê', 'veja'],
            answer: 'visto',
            explain: 'Verbo irregular: ver → visto (no "vido").',
          },
          {
            scene: 'Participios irregulares',
            lines: [['', "O participio de 'abrir' é ___?"]],
            options: ['aberto', 'abrido', 'abre', 'abra'],
            answer: 'aberto',
            explain: 'Verbo irregular: abrir → aberto (no "abrido").',
          },
          {
            scene: 'Participios irregulares',
            lines: [['', "O participio de 'dizer' é ___?"]],
            options: ['dizido', 'dito', 'diz', 'diga'],
            answer: 'dito',
            explain: 'Verbo irregular: dizer → dito (no "dizido").',
          },
          {
            scene: 'Participios irregulares',
            lines: [['', "O participio de 'pôr' é ___?"]],
            options: ['pondo', 'posto', 'põe', 'ponha'],
            answer: 'posto',
            explain: 'Verbo irregular: pôr → posto (no "pondo").',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Concordância em voz passiva',
        tag: '2 concordância',
        intro: 'Completa con participio que concuerda con el sujeto.',
        type: 'dual',
        items: [
          {
            scene: 'Sujeto singular masculino',
            lines: [['', "O livro foi [[0]] pelo autor. A carta foi [[1]] pelo secretário."]],
            blanks: [
              { options: ['escrito', 'escrita', 'escritos', 'escritas'], answer: 'escrito', explain: '"O livro" (masculino singular) → escrito.' },
              { options: ['escrito', 'escrita', 'escritos', 'escritas'], answer: 'escrita', explain: '"A carta" (femenino singular) → escrita.' },
            ],
          },
          {
            scene: 'Sujeto plural',
            lines: [['', "Os livros foram [[0]] e as cartas foram [[1]]."]],
            blanks: [
              { options: ['escrito', 'escrita', 'escritos', 'escritas'], answer: 'escritos', explain: '"Os livros" (masculino plural) → escritos.' },
              { options: ['escrito', 'escrita', 'escritos', 'escritas'], answer: 'escritas', explain: '"As cartas" (femenino plural) → escritas.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Participios en contexto',
        tag: 'Texto guiado',
        intro: 'Completa con participios regulares e irregulares.',
        type: 'guidedText',
        scene: 'Uma descrição de atividades e estados.',
        text: "As portas foram [[0]] (abrir) pela manhã. Muitos livros hanno [[1]] (ser) [[2]] (escrever) sobre este assunto. O trabalho foi [[3]] (terminar) ontem. Agora tudo está [[4]] (preparar) para a reunião. As senhoritas estão [[5]] (interessar) no projeto.",
        blanks: [
          { options: ['abrida', 'aberto', 'abertas', 'abrindo'], answer: 'abertas', explain: '"Portas" (femenino plural) → abertas.' },
          { options: ['ser', 'sendo', 'sido', 'serem'], answer: 'sido', explain: '"Hanno sido" = tiempo perfecto, particípio "sido".' },
          { options: ['escrevido', 'escrito', 'escrevendo', 'escrever'], answer: 'escrito', explain: 'Participio de "escrever" → escrito.' },
          { options: ['termina', 'terminado', 'terminação', 'terminar'], answer: 'terminado', explain: '"Trabalho" (masculino) → terminado.' },
          { options: ['preparada', 'preparado', 'preparando', 'preparar'], answer: 'preparado', explain: '"Tudo" (neutro=masculino) → preparado.' },
          { options: ['interessadas', 'interessado', 'interessando', 'interessar'], answer: 'interessadas', explain: '"Senhoritas" (femenino plural) → interessadas.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Conjugação de particípios',
        tag: 'Texto livre',
        intro: 'Escribe los participios en la forma correcta.',
        type: 'freeText',
        scene: 'Descripciones usando participio como adjetivo.',
        text: "As janelas estão [[0]] (fechar). O homem está [[1]] (cansar). As mulheres foram [[2]] (escolher). A comida estava [[3]] (preparar). Os documentos foram [[4]] (assinar) ontem.",
        blanks: [
          { answer: 'fechadas', accepted: ['fechadas'], explain: '"Janelas" (femenino plural) estão fechadas.' },
          { answer: 'cansado', accepted: ['cansado'], explain: '"Homem" (masculino) está cansado.' },
          { answer: 'escolhidas', accepted: ['escolhidas'], explain: '"Mulheres" (femenino plural) foram escolhidas.' },
          { answer: 'preparada', accepted: ['preparada'], explain: '"Comida" (femenino) estava preparada.' },
          { answer: 'assinados', accepted: ['assinados'], explain: '"Documentos" (masculino plural) foram assinados.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe frases usando participios.',
        type: 'write',
        items: [
          {
            scene: 'Voz pasiva',
            prompt: "Escribe una frase en voz pasiva: '[Cosa] fue [verbo participio]'.",
            answer: "A casa foi construída há muitos anos.",
            accepted: ['foi', 'participio', 'concordância', 'feminino'],
            explain: 'El participio debe concordar con el sujeto en pasiva.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Tabla de referencia',
        tag: 'Memorización',
        intro: 'Memoriza los participios irregulares más importantes.',
        type: 'write',
        items: [
          {
            scene: 'Participios para B1',
            prompt: "Lista los participios irregulares de: fazer, escrever, ver, abrir, dizer, pôr.",
            answer: "feito, escrito, visto, aberto, dito, posto.",
            accepted: ['feito', 'escrito', 'visto', 'aberto', 'dito', 'posto'],
            explain: 'Estos son 6 de los participios irregulares más importantes en portugués B1.',
          },
        ],
      },
    ],
  },
}

export default topic
