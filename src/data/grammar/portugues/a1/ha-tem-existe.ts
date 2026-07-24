import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'ha-tem-existe',
  order: '14',
  color: '#166534',
  category: 'Gramática',
  level: 'A1',
  title: 'Há / Tem / Existe en portugués A1 — Expresar existencia (hay)',
  shortTitle: 'Há / Tem',
  metaTitle: 'Há tem existe português A1 — hay en portugués há tem invariable existência',
  description:
    'Para expresar "hay" en portugués: HÁ (formal/portugués europeo) y TEM (portugués brasileño coloquial). Ambos son INVARIABLES para singular y plural. Há um livro / Há muitos livros / Tem uma escola / Tem muitas escolas. Negativo: Não há / Não tem.',
  lead: 'En portugués "hay" = HÁ (formal) o TEM (BP coloquial). Ambos invariables: Há um café / Há muitos cafés. Tem uma escola / Tem muitas escolas. Negativo: Não há / Não tem.',
  outcomes: [
    'Usa HÁ y TEM para expresar existencia (hay) en portugués',
    'Aplica la invariabilidad: mismo verbo para singular y plural',
    'Forma oraciones negativas: Não há / Não tem',
  ],

  guide: {
    goal: 'Expresar existencia (hay) en portugués con HÁ y TEM, ambos invariables.',
    model: 'Há um livro na mesa. / Tem muitas pessoas aqui. / Não há tempo.',
    formula: 'HÁ / TEM + artículo indefinido + sustantivo (+ lugar/complemento)',
    decisions: [
      'HÁ: forma de "haver" — más formal, correcto en todos los registros',
      'TEM: forma de "ter" — BP coloquial, casi universal en el habla cotidiana brasileña',
      'AMBOS invariables: singular y plural usan la misma forma',
      'Há um café (sg.) / Há muitos cafés (pl.) — mismo HÁ',
      'Tem uma escola (sg.) / Tem muitas escolas (pl.) — mismo TEM',
      'Negativo: Não há / Não tem',
      'Pregunta: Há/Tem...? — ¿Hay...?',
      'Diferencia con ESP: "hay" invariable (como inglés "there is/there are")',
      'PE vs BP: em Portugal o formal → HÁ; em Brasil falado → TEM mucho más frecuente',
    ],
    table: [
      ['Español', 'Formal (HÁ)', 'BP coloquial (TEM)'],
      ['Hay un café', 'Há um café', 'Tem um café'],
      ['Hay muchos cafés', 'Há muitos cafés', 'Tem muitos cafés'],
      ['No hay tiempo', 'Não há tempo', 'Não tem tempo'],
      ['¿Hay agua?', 'Há água?', 'Tem água?'],
    ],
    mistakes: [
      '"Há muitos livros" ✓ y "Têm muitos livros" ✗ para existencia → "Tem muitos livros". TEM (no TÊEM/TÊEM) es invariable para existencia.',
      '"Há uma...s" mezcla ✗ → concordancia dentro del sintagma nominal, no en el verbo: Há uma escola / Há muitas escolas.',
      '"Tem um problema" y "Tem problemas" — ambas correctas. TEM no cambia.',
    ],
  },
  seo: [
    {
      heading: '"Hay" en portugués: HÁ y TEM',
      paragraphs: [
        'Una de las diferencias más llamativas entre el portugués brasileño y el europeo es cómo se expresa "hay". En Portugal se usa HÁ (del verbo haver): Há um restaurante aqui. En Brasil, el habla coloquial casi siempre usa TEM (del verbo ter): Tem um restaurante aqui. Ambas formas son correctas y comprensibles en todos los contextos.',
        'La singularidad fundamental de ambas formas es que son INVARIABLES: no cambian para singular ni plural. Hay un café = Há um café. Hay muchos cafés = Há muitos cafés. Esto es idéntico al inglés "there is/are" conceptualmente, pero en portugués es aun más simple porque una sola forma lo cubre todo.',
      ],
    },
    {
      heading: 'TEM: la forma más usada en Brasil',
      paragraphs: [
        'En el portugués brasileño hablado, "tem" es prácticamente universal para expresar existencia. "Tem muita gente aqui" (Hay mucha gente aquí), "Não tem pão" (No hay pan), "Tem alguma dúvida?" (¿Hay alguna duda?). Escucharás esta forma constantemente en Brasil.',
        'En registros formales, periódicos, y en Portugal, se prefiere "há". Para el estudiante de portugués brasileño (BP), aprender TEM primero es más práctico para la comunicación cotidiana.',
      ],
    },
    {
      heading: 'Diferencia entre TEM existencial y TEM posesivo',
      paragraphs: [
        '"Tem" puede ser existencial (hay) o posesivo (tiene). El contexto aclara: "Tem um livro na mesa" (hay un libro en la mesa — existencial) vs "Ela tem um livro" (ella tiene un libro — posesivo). En el uso existencial, TEM no tiene sujeto explícito.',
      ],
    },
  ],
  visual: {
    mode: 'grammar-pattern',
    teacherLens: 'El estudiante aprende que HÁ y TEM son invariables para existencia. TEM es el más frecuente en BP hablado.',
    graphicPrompt: 'Tabla comparativa HÁ (formal) vs TEM (BP coloquial) con ejemplos singular/plural. Señal de INVARIABLE destacada.',
    scene: [
      ['HÁ = formal/EP', 'Há um café / Há muitos cafés'],
      ['TEM = BP coloquial', 'Tem um café / Tem muitos cafés'],
      ['INVARIABLE', 'misma forma para sg. y pl.'],
    ],
    learnerModes: ['visual: tabla comparativa', 'oral: tem en conversación BP', 'analítico: TEM existencial vs TEM posesivo'],
    reviewFocus: ['TEM invariable (no têm para existencia)', 'HÁ formal', 'Não tem/Não há (negativo)', 'sin sujeto en uso existencial'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Existencia con HÁ y TEM',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta para expresar existencia.',
        type: 'choice',
        items: [
          {
            scene: 'Hay un café',
            lines: [['Carlos', '___ um café perto da WeLearn.']],
            options: ['Há', 'Hão', 'Haverá', 'Há um'],
            answer: 'Há',
            explain: 'Há para existencia en portugués formal. Invariable: Há um café.',
          },
          {
            scene: 'Hay muchas personas (BP)',
            lines: [['Sofia', '___ muitas pessoas na aula hoje.']],
            options: ['Tem', 'Têm', 'Têem', 'Tenham'],
            answer: 'Tem',
            explain: 'TEM invariable para existencia en BP: Tem muitas pessoas (no "têm" para existencia).',
          },
          {
            scene: 'No hay tiempo',
            lines: [['Hugo', '___ tempo para isso agora.']],
            options: ['Não há', 'Não há um', 'Não têm', 'Não hão'],
            answer: 'Não há',
            explain: 'Negativo: Não há. Sin artículo cuando es incontable.',
          },
          {
            scene: '¿Hay agua? (BP)',
            lines: [['Ana', '___ água gelada aqui?']],
            options: ['Tem', 'Há', 'Têm', 'É'],
            answer: 'Tem',
            explain: 'Pregunta BP coloquial: Tem água? = ¿Hay agua? TEM invariable.',
          },
          {
            scene: 'Hay muchos libros',
            lines: [['Marco', '___ muitos livros na biblioteca.']],
            options: ['Há', 'Hão', 'Há um', 'Tem um'],
            answer: 'Há',
            explain: 'Há muitos livros: HÁ es invariable. No "hão" para existencia plural.',
          },
          {
            scene: 'No hay pan (BP)',
            lines: [['Lina', '___ pão no mercado hoje.']],
            options: ['Não tem', 'Não têm', 'Não há um', 'Há não'],
            answer: 'Não tem',
            explain: 'Não tem: negativo BP para existencia. Sin artículo (pão = incontable aquí).',
          },
          {
            scene: 'Hay una oportunidad',
            lines: [['Lía', '___ uma ótima oportunidade de aprender aqui.']],
            options: ['Há', 'Hão', 'Têm', 'São'],
            answer: 'Há',
            explain: 'Há uma oportunidade: HÁ invariable para singular. Forma formal correcta.',
          },
          {
            scene: 'Hay muchos cursos (BP)',
            lines: [['Carlos', '___ muitos cursos disponíveis na WeLearn.']],
            options: ['Tem', 'Têm', 'Há um', 'Hão'],
            answer: 'Tem',
            explain: 'TEM para existencia en BP: Tem muitos cursos. Invariable para plural.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Afirmación y negación',
        tag: '2 espacios',
        intro: 'Completa con la forma de existencia afirmativa y negativa.',
        type: 'dual',
        items: [
          {
            scene: 'Hay café pero no hay leche',
            lines: [['Ana', '[[0]] café aqui mas [[1]] leite.']],
            blanks: [
              { options: ['Tem', 'Têm', 'Há um'], answer: 'Tem', explain: 'Tem: hay (BP). Afirmativo.' },
              { options: ['não tem', 'não têm', 'há'], answer: 'não tem', explain: 'Não tem: no hay (BP). Negativo invariable.' },
            ],
          },
          {
            scene: 'Opciones en el menú',
            lines: [['Hugo', '[[0]] muitas opções no menu mas [[1]] opção vegana.']],
            blanks: [
              { options: ['Há', 'Hão', 'Têm'], answer: 'Há', explain: 'Há muitas opções: formal. HÁ invariable.' },
              { options: ['não há', 'não hão', 'não tem'], answer: 'não há', explain: 'Não há (formal). Negativo de HÁ.' },
            ],
          },
          {
            scene: 'En la ciudad',
            lines: [['Sofia', '[[0]] um parque bonito perto [[1]] da escola.']],
            blanks: [
              { options: ['Tem', 'Há', 'Têm'], answer: 'Tem', explain: 'Tem: hay (BP coloquial). Singular.' },
              { options: ['da', 'de a', 'do'], answer: 'da', explain: 'De + a escola → da escola (contracción obligatoria).' },
            ],
          },
          {
            scene: '¿Hay alguna duda?',
            lines: [
 ['Lía', '[[0]] alguma dúvida sobre as contrações?'],
 ['Carlos', 'Sim! [[1]] muitas dúvidas!'],
 ],
            blanks: [
              { options: ['Há', 'Hão', 'Têm'], answer: 'Há', explain: 'Há alguma dúvida? (formal).' },
              { options: ['Tem', 'Têm', 'Não tem'], answer: 'Tem', explain: 'Tem muitas dúvidas: BP. Afirmativo para plural.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa el texto con la forma de existencia correcta.',
        type: 'guidedText',
        scene: 'A WeLearn — o que tem e o que não tem',
        text: '[[0]] muitos cursos na WeLearn. [[1]] aulas de inglês, coreano e português. [[2]] (não) cursos de idiomas raros. [[3]] professores experientes e dedicados. Em cada sala [[4]] um quadro e computadores. [[5]] (não) material impresso — tudo é digital. [[6]] uma cantina no segundo andar.',
        blanks: [
          { options: ['Tem', 'Têm', 'Há um'], answer: 'Tem', explain: 'Tem muitos cursos: BP existencial. Invariable.' },
          { options: ['Tem', 'Há um', 'Têm'], answer: 'Tem', explain: 'Tem aulas: BP existencial plural.' },
          { options: ['Não tem', 'Não têm', 'Não há um'], answer: 'Não tem', explain: 'Não tem: negativo BP. No hay cursos raros.' },
          { options: ['Há', 'Hão', 'Têm'], answer: 'Há', explain: 'Há professores: formal. HÁ invariable.' },
          { options: ['tem', 'têm', 'há um'], answer: 'tem', explain: 'Tem um quadro: BP existencial singular.' },
          { options: ['Não há', 'Não hão', 'Não têm'], answer: 'Não há', explain: 'Não há material impresso: formal. Negativo de HÁ.' },
          { options: ['Tem', 'Têm', 'Hão'], answer: 'Tem', explain: 'Tem uma cantina: BP. Singular.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Completa con la forma correcta de existencia.',
        type: 'freeText',
        scene: 'O bairro de Carlos',
        text: '[[0]] (hay/formal) muitos restaurantes no meu bairro. [[1]] (hay/BP) um parque enorme. [[2]] (no hay/BP) supermercado perto, mas [[3]] (hay/formal) uma mercearia. [[4]] (¿Hay?/BP) uma farmácia por aqui? [[5]] (no hay/formal) tempo para tudo.',
        blanks: [
          { answer: 'Há', explain: 'HÁ: formal para existencia. Invariable.' },
          { answer: 'Tem', explain: 'TEM: BP coloquial. Invariable.' },
          { answer: 'Não tem', explain: 'Não tem: negativo BP.' },
          { answer: 'há', explain: 'Há uma mercearia: formal.' },
          { answer: 'Tem', explain: 'Tem uma farmácia? (pregunta BP).' },
          { answer: 'Não há', explain: 'Não há tempo: formal. Negativo.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la frase completa expresando existencia.',
        type: 'write',
        items: [
          {
            scene: 'Hay una farmacia',
            prompt: 'Escribe en portugués (BP): Hay una farmacia cerca de la escuela.',
            answer: 'Tem uma farmácia perto da escola.',
            accepted: ['tem uma farmácia perto da escola', 'há uma farmácia perto da escola'],
            explain: 'TEM (BP) o HÁ (formal). Uma farmácia (singular), da escola (de+a).',
          },
          {
            scene: 'No hay tiempo',
            prompt: 'Escribe en portugués (formal): No hay tiempo para estudiar.',
            answer: 'Não há tempo para estudar.',
            accepted: ['não há tempo para estudar', 'não tem tempo para estudar'],
            explain: 'Não há: negativo formal. Tiempo = tempo (sin artículo, incontable).',
          },
          {
            scene: 'Hay muchas opciones',
            prompt: 'Escribe en portugués: Hay muchas opciones en el menú.',
            answer: 'Há muitas opções no menu.',
            accepted: ['há muitas opções no menu', 'tem muitas opções no menu'],
            explain: 'Há (formal) o Tem (BP). Muitas opções (plural). No menu (em+o).',
          },
          {
            scene: '¿Hay agua?',
            prompt: 'Escribe en portugués (BP): ¿Hay agua fría aquí?',
            answer: 'Tem água gelada aqui?',
            accepted: ['tem água gelada aqui', 'há água gelada aqui'],
            explain: 'TEM para pregunta en BP. Água gelada: agua fría.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Describe qué hay y qué no hay en tu ciudad o barrio.',
        type: 'write',
        items: [
          {
            scene: 'Tu barrio',
            prompt: 'No meu bairro ___ (hay) ___ e ___. ___ (no hay) ___.',
            answer: 'No meu bairro tem muitos restaurantes e parques. Não tem metrô.',
            accepted: ['no meu bairro tem muitos restaurantes e parques não tem metrô'],
            explain: 'TEM (BP) para afirmación y negación. Invariable para plural.',
          },
          {
            scene: 'La WeLearn',
            prompt: 'Na WeLearn ___ (hay) ___ . ___ (no hay) ___. ___ (¿hay?) ___?',
            answer: 'Na WeLearn tem professores ótimos. Não tem livros em papel. Tem aulas online?',
            accepted: ['na welearn tem professores ótimos não tem livros em papel tem aulas online'],
            explain: 'TEM para existencia en los tres usos: afirmativo, negativo, pregunta.',
          },
          {
            scene: 'Tu ciudad',
            prompt: 'Na minha cidade ___ (hay) ___. ___ (formal: hay) ___. ___ (no hay) ___.',
            answer: 'Na minha cidade tem muita cultura. Há universidades famosas. Não há muito trânsito no centro.',
            accepted: ['na minha cidade tem muita cultura há universidades famosas não há muito trânsito no centro'],
            explain: 'TEM y HÁ ambos correctos. Negativo: Não há (formal).',
          },
        ],
      },
    ],
  },
}

export default topic
