import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'adjetivos-possessivos',
  order: '10',
  color: '#166534',
  category: 'Gramática',
  level: 'A1',
  title: 'Adjetivos Possessivos en portugués A1 — meu, teu, seu, nosso',
  shortTitle: 'Possessivos',
  metaTitle: 'Adjetivos possessivos português A1 — meu teu seu nosso dele dela',
  description:
    'Los posesivos en portugués concuerdan en género y número con la cosa poseída: meu/minha/meus/minhas, teu/tua, seu/sua, nosso/nossa. Singularidad BP: "você" usa seu/sua (como ele/ela), generando ambigüedad. Solución BP: o livro dele/dela para el/la de él/ella. Artículo con posesivos: opcional en BP.',
  lead: 'Posesivos en portugués: meu livro / minha casa. "Seu/sua" puede ser de você, ele o ela — en BP se aclara con dele/dela. Artículo opcional: o meu livro = meu livro (ambos correctos).',
  outcomes: [
    'Usa los posesivos concordando en género y número con el sustantivo poseído',
    'Distingue el uso de seu/sua vs dele/dela para evitar ambigüedad en BP',
    'Aplica correctamente el artículo con posesivos en BP',
  ],

  guide: {
    goal: 'Usar adjetivos posesivos en portugués A1 con concordancia de género y número.',
    model: 'meu livro / minha casa / o livro dele / a casa dela',
    formula: '(artículo opcional) + posesivo + sustantivo (concordancia de género y número)',
    decisions: [
      'meu/minha/meus/minhas — 1ª sg: meu pai, minha mãe, meus amigos, minhas irmãs',
      'teu/tua/teus/tuas — 2ª sg (Portugal; raro en BP): teu carro, tua bolsa',
      'seu/sua/seus/suas — você, ele, ela (ambiguo en BP): seu livro (¿de você o de ele?)',
      'nosso/nossa/nossos/nossas — 1ª pl: nosso professor, nossa escola',
      'vosso/vossa/vossos/vossas — 2ª pl (Portugal; raro en BP)',
      'seu/sua/seus/suas — 3ª pl (eles/elas): seus livros (de ellos)',
      'SOLUCIÓN BP ambigüedad: dele (de él), dela (de ella), deles (de ellos), delas (de ellas)',
      'Artículo con posesivos en BP: OPCIONAL — meu livro = o meu livro (ambos correctos)',
    ],
    table: [
      ['Persona', 'Masculino', 'Femenino'],
      ['eu', 'meu/meus', 'minha/minhas'],
      ['tu (PT)', 'teu/teus', 'tua/tuas'],
      ['você/ele/ela', 'seu/seus', 'sua/suas'],
      ['nós', 'nosso/nossos', 'nossa/nossas'],
      ['eles/elas (BP claro)', 'dele/dela', 'dele/dela'],
    ],
    mistakes: [
      '"Seu livro de ele" ✗ → "o livro dele". En BP, dele/dela reemplaza a seu/sua para claridad.',
      '"Meu mãe" ✗ → "Minha mãe". Mãe es femenino → minha.',
      '"A nossos alunos" ✗ → "Os nossos alunos". Artículo debe concordar: os (masc. pl.).',
    ],
  },
  seo: [
    {
      heading: 'Posesivos en portugués: concordancia con lo poseído',
      paragraphs: [
        'A diferencia del español, los posesivos en portugués concuerdan con el sustantivo poseído en género Y número: meu livro (mi libro, masc. sg.), minha casa (mi casa, fem. sg.), meus amigos (mis amigos, masc. pl.), minhas amigas (mis amigas, fem. pl.). Esta concordancia es total.',
        'Para el hispanohablante, la mayor dificultad es meu vs minha: meu pai (mi padre) pero minha mãe (mi madre). Basta recordar que el posesivo sigue al sustantivo, igual que el artículo: o pai → meu pai, a mãe → minha mãe.',
      ],
    },
    {
      heading: 'La ambigüedad de seu/sua en el portugués brasileño',
      paragraphs: [
        '"Seu/sua" es una de las singularidades del portugués brasileño. Este posesivo puede referirse a você, ele o ela — lo que crea ambigüedad: "seu livro" puede ser "tu libro", "su libro (de él)" o "su libro (de ella)". En el habla cotidiana brasileña, esta ambigüedad se resuelve usando "dele/dela": o livro dele (el libro de él), a casa dela (la casa de ella).',
        'En el registro formal y en el portugués europeo, "seu" para tercera persona es perfectamente claro por contexto. Pero en el portugués brasileño coloquial, "dele/dela" es mucho más frecuente y natural.',
      ],
    },
    {
      heading: 'Artículo con posesivos: opcional en Brasil',
      paragraphs: [
        'En Portugal, el artículo antes del posesivo es casi obligatorio: o meu livro, a tua casa. En Brasil, el artículo es opcional y se omite con frecuencia: meu livro = o meu livro, minha casa = a minha casa. Ambas formas son correctas en BP. Para los hispanohablantes, omitir el artículo (como en español "mi libro") es lo más natural.',
      ],
    },
  ],
  visual: {
    mode: 'grammar-table',
    teacherLens: 'El estudiante aprende meu/minha con concordancia, y la solución dele/dela para la ambigüedad de seu en BP.',
    graphicPrompt: 'Tabla de posesivos con género y número. Ejemplo comparativo seu livro (ambiguo) vs o livro dele (claro). Artículo opcional destacado.',
    scene: [
      ['meu/minha', 'mi (concuerda con la cosa)'],
      ['seu/sua vs dele/dela', 'ambigüedad BP → solución'],
      ['nosso/nossa', 'nuestro/a'],
    ],
    learnerModes: ['visual: tabla posesivos', 'analítico: seu vs dele/dela', 'oral: artículo opcional BP'],
    reviewFocus: ['meu/minha (no "mi")', 'seu ambiguo → dele/dela en BP', 'artículo opcional en BP', 'concordancia con lo poseído'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Posesivo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el posesivo correcto según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Mi madre',
            lines: [['Carlos', '___ mãe é professora de inglês.']],
            options: ['Minha', 'Meu', 'Meus', 'Minhas'],
            answer: 'Minha',
            explain: 'Mãe es femenino → minha. No "meu mãe".',
          },
          {
            scene: 'Mis amigos',
            lines: [['Sofia', '___ amigos falam quatro idiomas.']],
            options: ['Meus', 'Minha', 'Minhas', 'Meu'],
            answer: 'Meus',
            explain: 'Amigos es masculino plural → meus. Plural de meu.',
          },
          {
            scene: 'Nuestro profesor',
            lines: [['Ana', '___ professor é o David.']],
            options: ['Nosso', 'Nossa', 'Nossos', 'Nossas'],
            answer: 'Nosso',
            explain: 'Professor es masculino → nosso. Nuestro professor.',
          },
          {
            scene: 'Ella y su libro (ambiguo)',
            lines: [['Marco', 'A Zhanna perdeu ___ livro. (de ella)']],
            options: ['o livro dela', 'seu livro', 'sua livro', 'o livro dele'],
            answer: 'o livro dela',
            explain: 'BP: o livro dela (de ella) es la forma clara. "Seu livro" es ambiguo (puede ser de você/ele/ela).',
          },
          {
            scene: 'Mi casa',
            lines: [['Lina', '___ casa fica perto da WeLearn.']],
            options: ['Minha', 'Meu', 'Meus', 'Minha a'],
            answer: 'Minha',
            explain: 'Casa es femenino → minha. Artículo opcional en BP: minha casa = a minha casa.',
          },
          {
            scene: 'Tu libro (Portugal)',
            lines: [['David', 'Esqueceste ___ livro em casa, amigo!']],
            options: ['teu', 'tua', 'teus', 'seu'],
            answer: 'teu',
            explain: 'Livro es masculino → teu (de tu, Portugal/BP formal). "Seu livro" también vale en BP.',
          },
          {
            scene: 'Nuestras clases',
            lines: [['Zhanna', '___ aulas são sempre interativas.']],
            options: ['Nossas', 'Nosso', 'Nossa', 'Nossos'],
            answer: 'Nossas',
            explain: 'Aulas es femenino plural → nossas. Nuestras clases.',
          },
          {
            scene: 'El libro de él',
            lines: [['Ana', 'O Carlos esqueceu ___ na mesa.']],
            options: ['o livro dele', 'seu livro', 'o livro seu', 'o livro seu dele'],
            answer: 'o livro dele',
            explain: 'BP: o livro dele (de él) evita ambigüedad con seu.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Diálogos con posesivos',
        tag: '2 espacios',
        intro: 'Completa los dos posesivos del diálogo.',
        type: 'dual',
        items: [
          {
            scene: 'Familia',
            lines: [['Carlos', '[[0]] pai é médico e [[1]] mãe é professora.']],
            blanks: [
              { options: ['Meu', 'Minha', 'Meus'], answer: 'Meu', explain: 'Pai es masculino → meu.' },
              { options: ['minha', 'meu', 'minhas'], answer: 'minha', explain: 'Mãe es femenino → minha.' },
            ],
          },
          {
            scene: 'La escuela',
            lines: [['Sofia', '[[0]] escola é a WeLearn e [[1]] professores são ótimos.']],
            blanks: [
              { options: ['Nossa', 'Nosso', 'Nossas'], answer: 'Nossa', explain: 'Escola es femenino → nossa.' },
              { options: ['nossos', 'nossas', 'nossa'], answer: 'nossos', explain: 'Professores es masculino plural → nossos.' },
            ],
          },
          {
            scene: 'Él y su laptop',
            lines: [['David', 'O Marco esqueceu [[0]] e agora não tem [[1]].']],
            blanks: [
              { options: ['o computador dele', 'seu computador', 'o computador seu'], answer: 'o computador dele', explain: 'BP: o computador dele (de él), claro y sin ambigüedad.' },
              { options: ['senha dele', 'a senha dele', 'sua senha'], answer: 'a senha dele', explain: 'A senha dele: la contraseña de él. Femenino + dele.' },
            ],
          },
          {
            scene: 'Mis amigas',
            lines: [['Lina', '[[0]] amigas são [[1]] colegas de trabalho.']],
            blanks: [
              { options: ['Minhas', 'Meus', 'Minha'], answer: 'Minhas', explain: 'Amigas es femenino plural → minhas.' },
              { options: ['minhas', 'meu', 'minha'], answer: 'minhas', explain: 'Colegas (femenino en este contexto) → minhas.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa con el posesivo correcto.',
        type: 'guidedText',
        scene: 'Apresentação de família — Carlos fala da família dele',
        text: '[[0]] família é de Bucaramanga. [[1]] pai chama-se Jorge e [[2]] mãe chama-se María. Tenho dois irmãos — [[3]] nomes são Lucas e Felipe. [[4]] escola preferida é a WeLearn. O David é [[5]] professor favorito — os alunos adoram as aulas [[6]]. (dele)',
        blanks: [
          { options: ['Minha', 'Meu', 'Minhas'], answer: 'Minha', explain: 'Família es femenino → minha.' },
          { options: ['Meu', 'Minha', 'Meus'], answer: 'Meu', explain: 'Pai es masculino → meu.' },
          { options: ['minha', 'meu', 'minhas'], answer: 'minha', explain: 'Mãe es femenino → minha.' },
          { options: ['seus', 'seus deles', 'os nomes deles'], answer: 'seus', explain: 'Seus nomes: de ellos (mis hermanos). Masculino plural.' },
          { options: ['Minha', 'Meu', 'Nosso'], answer: 'Minha', explain: 'Escola es femenino → minha escola.' },
          { options: ['meu', 'minha', 'nosso'], answer: 'meu', explain: 'Professor es masculino → meu professor.' },
          { options: ['dele', 'sua', 'delas'], answer: 'dele', explain: 'As aulas dele: las clases de él (David). BP evita ambigüedad con dele.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe el posesivo correcto sin opciones.',
        type: 'freeText',
        scene: 'Zhanna fala dos recursos da WeLearn',
        text: '[[0]] (mi) escola chama-se WeLearn. [[1]] (nuestros) alunos são muito dedicados. O David é [[2]] (mi, masc.) sócio e [[3]] (nuestro) método tem 17 passos. Os alunos trazem [[4]] (sus = deles) materiais. A Sofia é [[5]] (nuestra) melhor aluna.',
        blanks: [
          { answer: 'Minha', explain: 'Escola femenino → minha.' },
          { answer: 'Nossos', explain: 'Alunos masculino plural → nossos.' },
          { answer: 'meu', explain: 'Sócio masculino → meu.' },
          { answer: 'nosso', explain: 'Método masculino → nosso.' },
          { answer: 'os materiais deles', accepted: ['seus materiais', 'os materiais dele'], explain: 'Os materiais deles: de ellos. BP prefiere deles para claridad.' },
          { answer: 'nossa', explain: 'Melhor aluna femenino → nossa.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la frase completa con el posesivo.',
        type: 'write',
        items: [
          {
            scene: 'Mi familia',
            prompt: 'Escribe: Mi familia vive en Bogotá. → ___ família mora em Bogotá.',
            answer: 'Minha família mora em Bogotá.',
            accepted: ['minha família mora em bogotá', 'a minha família mora em bogotá'],
            explain: 'Família es femenino → minha. Artículo opcional en BP.',
          },
          {
            scene: 'Nuestros estudiantes',
            prompt: 'Escribe: Nuestros estudiantes son muy dedicados. → ___ alunos são muito dedicados.',
            answer: 'Nossos alunos são muito dedicados.',
            accepted: ['nossos alunos são muito dedicados', 'os nossos alunos são muito dedicados'],
            explain: 'Alunos masculino plural → nossos.',
          },
          {
            scene: 'El libro de ella',
            prompt: 'Escribe: El libro de ella está en la mesa. → O livro ___ está na mesa.',
            answer: 'O livro dela está na mesa.',
            accepted: ['o livro dela está na mesa'],
            explain: 'Dela: de ella. BP prefiere dele/dela para evitar ambigüedad de seu.',
          },
          {
            scene: 'Mis amigos',
            prompt: 'Escribe: Mis amigos estudian portugués. → ___ amigos estudam português.',
            answer: 'Meus amigos estudam português.',
            accepted: ['meus amigos estudam português', 'os meus amigos estudam português'],
            explain: 'Amigos masculino plural → meus.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Describe tu familia y entorno usando posesivos en portugués.',
        type: 'write',
        items: [
          {
            scene: 'Tu familia',
            prompt: 'Minha ___ é ___. Meu ___ é ___. Meus ___ são ___.',
            answer: 'Minha mãe é professora. Meu pai é engenheiro. Meus irmãos são estudantes.',
            accepted: ['minha mãe é professora meu pai é engenheiro meus irmãos são estudantes'],
            explain: 'Minha (femenino), meu (masculino), meus (masculino plural).',
          },
          {
            scene: 'Tus cosas',
            prompt: 'Meu ___ é ___. Minha ___ está ___. Meus ___ são ___.',
            answer: 'Meu celular é novo. Minha mochila está na mesa. Meus livros são de português.',
            accepted: ['meu celular é novo minha mochila está na mesa meus livros são de português'],
            explain: 'Concordancia: celular (masc.) → meu, mochila (fem.) → minha, livros (masc. pl.) → meus.',
          },
          {
            scene: 'Tu clase',
            prompt: 'Nossa ___ é ___. Nosso ___ se chama ___. Os alunos trazem ___.',
            answer: 'Nossa escola é a WeLearn. Nosso professor se chama David. Os alunos trazem os materiais deles.',
            accepted: ['nossa escola é a welearn nosso professor se chama david os alunos trazem os materiais deles'],
            explain: 'Nossa (fem.), nosso (masc.), os materiais deles (de ellos, BP claro).',
          },
        ],
      },
    ],
  },
}

export default topic
