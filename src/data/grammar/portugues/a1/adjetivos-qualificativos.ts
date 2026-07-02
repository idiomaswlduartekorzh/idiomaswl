import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'adjetivos-qualificativos',
  order: '11',
  color: '#166534',
  category: 'Gramática',
  level: 'A1',
  title: 'Adjetivos Qualificativos en portugués A1 — Concordancia y posición',
  shortTitle: 'Adjetivos',
  metaTitle: 'Adjetivos qualificativos português A1 — bonito inteligente concordância posição',
  description:
    'Los adjetivos calificativos en portugués concuerdan en género y número con el sustantivo. Terminaciones: -o/-a/-os/-as (bonito/bonita), -e/-es (inteligente), -or/-ora (trabalhador). Posición: generalmente DESPUÉS del sustantivo. Irregulares: bom/boa, mau/má, grande.',
  lead: 'Adjetivos en portugués: depois do substantivo (um livro bonito). Concordam: bonito/bonita/bonitos/bonitas. Irregulares: bom/boa/bons/boas, grande (sin cambio de género).',
  outcomes: [
    'Usa adjetivos con la concordancia correcta de género y número',
    'Coloca los adjetivos en la posición correcta (después del sustantivo)',
    'Conoce los adjetivos irregulares más frecuentes: bom/boa, mau/má, grande',
  ],

  guide: {
    goal: 'Usar adjetivos calificativos en portugués A1 con concordancia y posición correctas.',
    model: 'um aluno inteligente / uma aluna inteligente / alunos inteligentes',
    formula: 'sustantivo + adjetivo (concordancia: género y número)',
    decisions: [
      'Adjetivos -o/-a: bonito/bonita/bonitos/bonitas — masc/fem/pl.masc/pl.fem',
      'Adjetivos -e: invariable en género — inteligente/inteligentes (solo cambia en plural)',
      'Adjetivos -or: trabalhador/trabalhadora/trabalhadores/trabalhadoras',
      'Posición normal: DESPUÉS del sustantivo — uma cidade bonita, um aluno inteligente',
      'Antes del sustantivo: énfasis o matiz diferente — uma grande cidade (famosa) vs uma cidade grande (de tamaño)',
      'Irregulares: bom/boa/bons/boas (bueno), mau/má/maus/más (malo), grande/grandes (sin cambio de género)',
      'Grande antes de sust. masc. sg. puede ser "gran": um grande homem (un gran hombre)',
    ],
    table: [
      ['Terminación', 'Singular (masc / fem)', 'Plural (masc / fem)'],
      ['-o / -a', 'bonito / bonita', 'bonitos / bonitas'],
      ['-e (invariable)', 'inteligente', 'inteligentes'],
      ['-or / -ora', 'trabalhador / trabalhadora', 'trabalhadores / trabalhadoras'],
    ],
    mistakes: [
      '"Uma aluno bonita" ✗ → "Um aluno bonito" o "Uma aluna bonita". Concordancia total con sustantivo.',
      '"Um cidade grande" ✗ → "Uma cidade grande". Cidade es femenino.',
      '"Um bom homem" y "Uma bom mulher" ✗ → "Uma boa mulher". Bom → boa en femenino.',
    ],
  },
  seo: [
    {
      heading: 'Adjetivos en portugués: concordancia y posición',
      paragraphs: [
        'Los adjetivos en portugués funcionan de manera muy similar al español: concuerdan en género y número con el sustantivo al que acompañan y van generalmente después del sustantivo. Um livro interessante, uma aula interessante, livros interessantes — el adjetivo "interessante" es invariable en género (-e) pero añade -s en plural.',
        'Los adjetivos en -o cambian completamente: bonito (masc. sg.) → bonita (fem. sg.) → bonitos (masc. pl.) → bonitas (fem. pl.). Este patrón es idéntico al español. Los adjetivos en -or también añaden -a en femenino: trabalhador → trabalhadora.',
      ],
    },
    {
      heading: 'Posición del adjetivo: antes vs después',
      paragraphs: [
        'La posición normal del adjetivo en portugués es DESPUÉS del sustantivo: uma cidade bonita, um aluno inteligente, uma professora excelente. Cuando el adjetivo va ANTES del sustantivo, cambia el matiz: una "grande cidade" no es necesariamente la más grande en tamaño, sino una ciudad importante o famosa.',
        'Algunos adjetivos muy frecuentes pueden ir antes o después sin gran cambio de significado: um bom aluno = um aluno bom. Pero como regla general en A1, coloca siempre el adjetivo después del sustantivo.',
      ],
    },
    {
      heading: 'Irregulares esenciales: bom, mau, grande',
      paragraphs: [
        'Bom/boa/bons/boas (bueno) y mau/má/maus/más (malo) son los irregulares más importantes. Grande es regular pero no cambia de género: um grande professor, uma grande professora. En plural: grandes professores. Recuerda que "grande" antes del sustantivo tiene sentido de "gran/importante".',
      ],
    },
  ],
  visual: {
    mode: 'grammar-table',
    teacherLens: 'El estudiante aprende concordancia -o/-a/-e/-or y posición después del sustantivo. Irregulares bom/boa y mau/má como prioridad.',
    graphicPrompt: 'Tabla de terminaciones -o/-a/-e/-or. Ejemplo de posición antes/después con matiz diferente. Irregulares bom/boa destacados.',
    scene: [
      ['-o/-a/-os/-as', 'bonito → bonita → bonitos → bonitas'],
      ['-e/-es', 'inteligente → inteligentes (sin cambio de género)'],
      ['bom/boa, mau/má', 'irregulares esenciales'],
    ],
    learnerModes: ['visual: tabla terminaciones', 'analítico: posición y matiz', 'oral: concordancia automática'],
    reviewFocus: ['concordancia género+número', 'posición después del sust.', 'bom/boa (no bom/boma)', 'grande = sin cambio de género'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Forma correcta del adjetivo',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del adjetivo.',
        type: 'choice',
        items: [
          {
            scene: 'Una ciudad hermosa',
            lines: [['Carlos', 'São Paulo é uma cidade muito ___.']],
            options: ['bonita', 'bonito', 'bonitos', 'bonitas'],
            answer: 'bonita',
            explain: 'Cidade es femenino → bonita. Adjetivo concuerda con sustantivo.',
          },
          {
            scene: 'Alumnos inteligentes',
            lines: [['Zhanna', 'Os alunos da WeLearn são muito ___.']],
            options: ['inteligentes', 'inteligente', 'inteligento', 'inteligenta'],
            answer: 'inteligentes',
            explain: 'Adjetivo -e: plural = inteligentes. No cambia de género, solo añade -s.',
          },
          {
            scene: 'Una buena profesora',
            lines: [['Sofia', 'A Zhanna é uma professora muito ___.']],
            options: ['boa', 'bom', 'bons', 'boas'],
            answer: 'boa',
            explain: 'Professora es femenino → boa (irregular: bom → boa).',
          },
          {
            scene: 'Un libro interesante',
            lines: [['Marco', 'Este é um livro muito ___.']],
            options: ['interessante', 'interessanto', 'interessantes', 'interessanta'],
            answer: 'interessante',
            explain: 'Livro masculino singular → interessante (adjetivo -e, invariable en género, singular).',
          },
          {
            scene: 'Profesora trabajadora',
            lines: [['Ana', 'A minha professora é muito ___.']],
            options: ['trabalhadora', 'trabalhador', 'trabalhadores', 'trabalhadoras'],
            answer: 'trabalhadora',
            explain: 'Professora es femenino → trabalhadora (-or → -ora en femenino).',
          },
          {
            scene: 'Malos resultados',
            lines: [['David', 'Esses resultados são muito ___.']],
            options: ['maus', 'más', 'mau', 'má'],
            answer: 'maus',
            explain: 'Resultados es masculino plural → maus (irregular: mau → maus en plural).',
          },
          {
            scene: 'Una gran oportunidad',
            lines: [['Lina', 'Estudar aqui é uma ___ oportunidade.']],
            options: ['grande', 'gran', 'grandes', 'grand'],
            answer: 'grande',
            explain: 'Grande no cambia de género: una grande oportunidade. Antes del sustantivo = grande/importante.',
          },
          {
            scene: 'Clases buenas',
            lines: [['Carlos', 'As aulas da WeLearn são muito ___.']],
            options: ['boas', 'bom', 'bons', 'boa'],
            answer: 'boas',
            explain: 'Aulas es femenino plural → boas (bom → boa → boas).',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos adjetivos en frase',
        tag: '2 espacios',
        intro: 'Completa con los dos adjetivos concordados.',
        type: 'dual',
        items: [
          {
            scene: 'La WeLearn',
            lines: [['David', 'A WeLearn é uma escola [[0]] e muito [[1]].']],
            blanks: [
              { options: ['boa', 'bom', 'bons'], answer: 'boa', explain: 'Escola femenino → boa.' },
              { options: ['eficiente', 'eficiento', 'eficientes'], answer: 'eficiente', explain: 'Adjetivo -e: singular → eficiente (sin cambio de género).' },
            ],
          },
          {
            scene: 'El alumno',
            lines: [['Zhanna', 'O Carlos é um aluno [[0]] e muito [[1]].']],
            blanks: [
              { options: ['dedicado', 'dedicada', 'dedicados'], answer: 'dedicado', explain: 'Aluno masculino → dedicado.' },
              { options: ['inteligente', 'inteligento', 'inteligenta'], answer: 'inteligente', explain: 'Adjetivo -e: sin cambio de género → inteligente.' },
            ],
          },
          {
            scene: 'Las clases',
            lines: [['Ana', 'As aulas são [[0]] e muito [[1]].']],
            blanks: [
              { options: ['longas', 'longo', 'longos'], answer: 'longas', explain: 'Aulas femenino plural → longas (-o → -a → -as).' },
              { options: ['interessantes', 'interessante', 'interessanto'], answer: 'interessantes', explain: 'Aulas plural → interessantes (-e + s).' },
            ],
          },
          {
            scene: 'El libro',
            lines: [['Marco', 'Este livro é [[0]] mas um pouco [[1]].']],
            blanks: [
              { options: ['bom', 'boa', 'bons'], answer: 'bom', explain: 'Livro masculino singular → bom.' },
              { options: ['difícil', 'difícilo', 'difícila'], answer: 'difícil', explain: 'Adjetivo -il: invariable en género → difícil.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa la descripción eligiendo el adjetivo correcto.',
        type: 'guidedText',
        scene: 'David descreve a WeLearn',
        text: 'A WeLearn é uma escola [[0]] (buena). Temos professores [[1]] (dedicados, masc. pl.). As aulas são [[2]] (interesantes, pl.). O método é [[3]] (original). Os alunos são [[4]] (inteligentes, pl.) e muito [[5]] (trabajadores, masc. pl.). Os resultados são [[6]] (buenos, masc. pl.).',
        blanks: [
          { options: ['boa', 'bom', 'boas'], answer: 'boa', explain: 'Escola femenino → boa.' },
          { options: ['dedicados', 'dedicadas', 'dedicado'], answer: 'dedicados', explain: 'Professores masculino plural → dedicados.' },
          { options: ['interessantes', 'interessante', 'interessantos'], answer: 'interessantes', explain: '-e + s: interessantes.' },
          { options: ['original', 'originala', 'originais'], answer: 'original', explain: 'Original: invariable en género, singular.' },
          { options: ['inteligentes', 'inteligente', 'inteligento'], answer: 'inteligentes', explain: '-e + s: inteligentes (plural).' },
          { options: ['trabalhadores', 'trabalhadoras', 'trabalhador'], answer: 'trabalhadores', explain: 'Alunos masculino plural → trabalhadores.' },
          { options: ['bons', 'boas', 'boa'], answer: 'bons', explain: 'Resultados masculino plural → bons.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe el adjetivo con la concordancia correcta.',
        type: 'freeText',
        scene: 'Sofia descreve os seus colegas',
        text: 'O meu colega Marco é muito [[0]] (inteligente, masc. sg.). A Ana é uma pessoa [[1]] (trabajadora, fem. sg.). As minhas amigas são muito [[2]] (simpáticas, fem. pl.). O curso é [[3]] (bueno, masc. sg.). As notas são [[4]] (buenas, fem. pl.). O professor é um [[5]] (gran) profissional.',
        blanks: [
          { answer: 'inteligente', explain: '-e: invariable en género, singular → inteligente.' },
          { answer: 'trabalhadora', explain: '-or → -ora en femenino: trabalhadora.' },
          { answer: 'simpáticas', explain: '-o → -a → -as: simpáticas (femenino plural).' },
          { answer: 'bom', explain: 'Curso masculino singular → bom.' },
          { answer: 'boas', explain: 'Notas femenino plural → boas.' },
          { answer: 'grande', explain: 'Grande no cambia de género: um grande profissional.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la descripción completa con el adjetivo correctamente concordado.',
        type: 'write',
        items: [
          {
            scene: 'Una ciudad bonita',
            prompt: 'Escribe: Cartagena es una ciudad muy bonita. → Cartagena é uma cidade muito ___.',
            answer: 'Cartagena é uma cidade muito bonita.',
            accepted: ['cartagena é uma cidade muito bonita'],
            explain: 'Cidade femenino → bonita. Adjetivo después del sustantivo.',
          },
          {
            scene: 'Alumnos dedicados',
            prompt: 'Escribe: Los alumnos de la WeLearn son muy dedicados. → Os alunos da WeLearn são muito ___.',
            answer: 'Os alunos da WeLearn são muito dedicados.',
            accepted: ['os alunos da welearn são muito dedicados'],
            explain: 'Alunos masculino plural → dedicados.',
          },
          {
            scene: 'Una buena profesora',
            prompt: 'Escribe: Zhanna es una muy buena profesora. → A Zhanna é uma ___ muito boa.',
            answer: 'A Zhanna é uma professora muito boa.',
            accepted: ['a zhanna é uma professora muito boa', 'a zhanna é uma boa professora'],
            explain: 'Professora femenino → boa. Posición después del sustantivo más natural.',
          },
          {
            scene: 'Los libros son interesantes',
            prompt: 'Escribe: Los libros son muy interesantes. → Os livros são muito ___.',
            answer: 'Os livros são muito interessantes.',
            accepted: ['os livros são muito interessantes'],
            explain: 'Livros masculino plural, adjetivo -e → interessantes.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Describe personas y cosas de tu entorno con adjetivos en portugués.',
        type: 'write',
        items: [
          {
            scene: 'Tu ciudad',
            prompt: 'A minha cidade é ___ (adjetivo). É uma cidade ___ e ___.',
            answer: 'A minha cidade é bonita. É uma cidade grande e movimentada.',
            accepted: ['a minha cidade é bonita é uma cidade grande e movimentada'],
            explain: 'Cidade femenino: bonita, grande (sin cambio de género), movimentada.',
          },
          {
            scene: 'Tu clase',
            prompt: 'Os meus colegas são ___ e ___. A professora é muito ___ e ___.',
            answer: 'Os meus colegas são inteligentes e dedicados. A professora é muito boa e simpática.',
            accepted: ['os meus colegas são inteligentes e dedicados a professora é muito boa e simpática'],
            explain: 'Colegas masc. pl.: inteligentes, dedicados. Professora fem.: boa, simpática.',
          },
          {
            scene: 'Tu opinión sobre el portugués',
            prompt: 'O português é uma língua ___. As aulas são ___. O método WeLearn é ___.',
            answer: 'O português é uma língua bonita. As aulas são interessantes. O método WeLearn é bom.',
            accepted: ['o português é uma língua bonita as aulas são interessantes o método welearn é bom'],
            explain: 'Língua fem.: bonita. Aulas fem. pl.: interessantes (-e+s). Método masc.: bom.',
          },
        ],
      },
    ],
  },
}

export default topic
