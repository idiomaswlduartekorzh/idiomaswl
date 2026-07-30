import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'plural-substantivos',
  order: '05',
  color: '#dc2626',
  category: 'Sustantivos',
  level: 'A1',
  title: 'Plural dos Substantivos en portugués A1 — Cómo formar el plural',
  shortTitle: 'Plural (substantivos)',
  metaTitle: 'Plural substantivos português A1 — regras e exceções',
  description:
    'El plural de los sustantivos en portugués sigue reglas predecibles. La mayoría añade -s (como el español), pero hay patrones especiales para sustantivos en -ão, -al, -el, -ol, -ul, -em y sustantivos irregulares. Conocer estas reglas permite hablar con más precisión desde el nivel A1.',
  lead: '+s para la mayoría. Pero: -ão → ões/ãos/ães | -al → ais | -el → éis | -em → ens. El portugués tiene más variaciones en el plural que el español.',
  outcomes: [
    'Forma el plural regular añadiendo -s',
    'Aplica los patrones de -ão/-al/-el/-em',
    'Reconoce plurales irregulares frecuentes en A1',
  ],

  guide: {
    goal: 'Formar el plural correcto de sustantivos en portugués A1 con todos los patrones principales.',
    model: 'livro → livros | irmão → irmãos/irmãos | animal → animais | papel → papéis | homem → homens',
    formula: 'sg → pl: -s (general) | -ão → -ões/-ãos/-ães | -al → -ais | -el → -éis | -em → -ens',
    decisions: [
      'Regla general: añade -s: livro → livros, casa → casas, caneta → canetas',
      '-ão final: la mayoría → -ões: limão → limões, avião → aviões, botão → botões',
      '-ão algunos → -ãos: irmão → irmãos, mão → mãos (plurales nativos)',
      '-ão pocos → -ães: pão → pães, cão → cães (irregular, memorizar)',
      '-al, -el, -ol, -ul → troca l por is: animal → animais, papel → papéis, sol → sóis',
      '-em, -en → troca por -ens: homem → homens, jovem → jovens',
    ],
    table: [
      ['Terminación sg', 'Regla plural', 'Ejemplo'],
      ['Vocal o consonante común', '+s', 'livro → livros | pai → pais'],
      ['-ão (mayoría)', '-ões', 'limão → limões, avião → aviões'],
      ['-ão (algunos)', '-ãos', 'irmão → irmãos, mão → mãos'],
      ['-ão (pocos)', '-ães', 'pão → pães, cão → cães'],
      ['-al/-el/-ol/-ul', '-ais/-éis/-óis/-uis', 'animal → animais, papel → papéis'],
      ['-em', '-ens', 'homem → homens, jovem → jovens'],
    ],
    mistakes: [
      '"Irmãos" (hermanos) no es "irmãoes" — el patrón -ãos es para algunos familiares.',
      '"Pães" y "cães" son irregulares — memorízalos: pão → pães, cão → cães.',
      '"Papeis" ✗ → "papéis" — lleva acento agudo.',
    ],
  },
  seo: [
    {
      heading: 'El plural en portugués: más reglas que en español',
      paragraphs: [
        'El plural del portugués es similar al español en lo básico (añadir -s), pero tiene más variaciones. La más importante es el plural de -ão, que en español no tiene equivalente directo porque el español no tiene palabras con esa terminación nasal del mismo modo.',
        'Para el hispanohablante, las reglas de -al → -ais (animal → animais) y -em → -ens (homem → homens) son intuitivas una vez conocidas. El mayor desafío es el triple patrón de -ão: -ões (mayoría), -ãos (algunos) y -ães (pocos). En A1 conviene memorizar los más frecuentes.',
      ],
    },
    {
      heading: 'El triple plural de -ão',
      paragraphs: [
        'Los sustantivos terminados en -ão forman el plural de tres formas distintas. La más común es -ões: limão → limões (limón → limones), avião → aviões (avión → aviones). Algunos forman -ãos, especialmente parentescos y palabras cortas: irmão → irmãos (hermano → hermanos), mão → mãos (mano → manos).',
        'Un pequeño grupo forma -ães: pão → pães (pan → panes), cão → cães (perro → perros). En A1 no es necesario aprender la regla completa — basta con memorizar los más frecuentes: limões, irmãos, mãos, pães, aviões.',
      ],
    },
    {
      heading: '¿Cómo se forma el plural en portugués?',
      paragraphs: [
        'La regla general es añadir -s a las palabras acabadas en vocal (livro → livros) y -es a las acabadas en -r, -z o -s tónica (professor → professores, luz → luzes). Las terminaciones especiales (-ão, -al, -el, -em…) tienen su propio patrón. Esta tabla resume todos los casos que necesitas en A1:',
      ],
      table: [
        ['Terminación singular', 'Plural', 'Ejemplo'],
        ['vocal', '+s', 'casa → casas'],
        ['-r / -z / -s tónica', '+es', 'flor → flores, luz → luzes'],
        ['-ão (mayoría)', '-ões', 'limão → limões'],
        ['-ão (parentesco/cortas)', '-ãos', 'irmão → irmãos, mão → mãos'],
        ['-ão (irregular)', '-ães', 'pão → pães, cão → cães'],
        ['-al / -el / -ol / -ul', '-ais / -éis / -óis / -uis', 'animal → animais, papel → papéis'],
        ['-il tónico', '-is', 'funil → funis'],
        ['-m', '-ns', 'homem → homens, jardim → jardins'],
      ],
    },
    {
      heading: '¿Cuál es el plural de las palabras terminadas en -ão?',
      paragraphs: [
        'Hay tres plurales posibles y hay que memorizar cada palabra, pero la estadística ayuda: la gran mayoría hace -ões (coração → corações, opinião → opiniões), un grupo de parentescos y palabras cortas hace -ãos (irmão → irmãos, mão → mãos, cidadão → cidadãos), y solo un puñado hace -ães (pão → pães, cão → cães, alemão → alemães). Si dudas, -ões es la apuesta más segura porque cubre más del 70 % de los casos.',
      ],
    },
    {
      heading: '¿En qué se diferencia el plural portugués del español?',
      paragraphs: [
        'El español resuelve casi todo con -s / -es, mientras que el portugués añade la familia nasal -ão/-ães/-ões y transforma la -l final en -is (animal → animais, donde el español solo hace "animales"). También convierte la -m en -ns (homem → homens). La coincidencia es alta en las palabras acabadas en vocal, así que el esfuerzo real se concentra en memorizar los grupos -ão y -al/-el.',
      ],
    },
  ],
  visual: {
    mode: 'noun-chart',
    teacherLens: 'El estudiante aprende la regla general (+s) y los 3 patrones de -ão más -al/-em.',
    graphicPrompt: 'Tabla de terminaciones con ejemplos. Triple -ão en recuadro especial.',
    scene: [
      ['+s (general)', 'livro → livros'],
      ['-ão → -ões/-ãos/-ães', 'limão/irmão/pão'],
      ['-al → -ais | -em → -ens', 'animal → animais'],
    ],
    learnerModes: ['visual: tabla de reglas', 'analítico: patrones -ão', 'oral: listas de plurales en voz alta'],
    reviewFocus: ['-ões (mayoría -ão)', '-ãos (irmão, mão)', '-ães (pão, cão)', '-al → -ais'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Plural correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el plural correcto del sustantivo.',
        type: 'choice',
        items: [
          {
            scene: 'Libros',
            lines: [['Carlos', 'Tenho dois ___ de português.']],
            options: ['livros', 'livres', 'livrões'],
            answer: 'livros',
            explain: 'Livro + s = livros. Regla general.',
          },
          {
            scene: 'Limones',
            lines: [['Sofia', 'Comprei três ___ no mercado.']],
            options: ['limões', 'limãos', 'limães', 'limons'],
            answer: 'limões',
            explain: 'Limão → limões. La mayoría de -ão hace -ões.',
          },
          {
            scene: 'Hermanos',
            lines: [['Marco', 'Tenho dois ___ mais velhos.']],
            options: ['irmãos', 'irmãoes', 'irmães', 'irmans'],
            answer: 'irmãos',
            explain: 'Irmão → irmãos. Parentesco: patrón -ãos.',
          },
          {
            scene: 'Panes',
            lines: [['Ana', 'Comprei dois ___ frescos.']],
            options: ['pães', 'pãos', 'pões', 'pans'],
            answer: 'pães',
            explain: 'Pão → pães. Irregular: uno del patrón -ães.',
          },
          {
            scene: 'Animales',
            lines: [['Enzo', 'Há muitos ___ no parque.']],
            options: ['animais', 'animals', 'animales', 'animaes'],
            answer: 'animais',
            explain: 'Animal → animais. -al → -ais.',
          },
          {
            scene: 'Papeles',
            lines: [['Elena', 'Preciso de vários ___ para o projeto.']],
            options: ['papéis', 'papeis', 'papers', 'papeles'],
            answer: 'papéis',
            explain: 'Papel → papéis. -el → -éis (con acento).',
          },
          {
            scene: 'Hombres',
            lines: [['Lina', 'Há muitos ___ jovens na academia.']],
            options: ['homens', 'homen', 'hombres', 'homems'],
            answer: 'homens',
            explain: 'Homem → homens. -em → -ens.',
          },
          {
            scene: 'Aviones',
            lines: [['Carlos', 'Vi três ___ no céu.']],
            options: ['aviões', 'aviãos', 'aviaes', 'avions'],
            answer: 'aviões',
            explain: 'Avião → aviões. -ão mayoría → -ões.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Singular y plural en contexto',
        tag: '2 espacios',
        intro: 'Completa: un singular y un plural en el mismo enunciado.',
        type: 'dual',
        items: [
          {
            scene: 'Un limón / dos limones',
            lines: [['Ana', 'Tenho um [[0]] e preciso de mais dois [[1]].']],
            blanks: [
              { options: ['limão', 'limões', 'limon'], answer: 'limão', explain: 'Singular: um limão.' },
              { options: ['limões', 'limãos', 'limons'], answer: 'limões', explain: 'Plural: dois limões.' },
            ],
          },
          {
            scene: 'Un hermano / dos hermanos',
            lines: [['Sofia', 'Tenho um [[0]] e dois [[1]] mais novos.']],
            blanks: [
              { options: ['irmão', 'irmãos', 'irmans'], answer: 'irmão', explain: 'Singular: um irmão.' },
              { options: ['irmãos', 'irmãoes', 'irmans'], answer: 'irmãos', explain: 'Plural: dois irmãos.' },
            ],
          },
          {
            scene: 'Un animal / varios animales',
            lines: [['Marco', 'Vi um [[0]] estranho e depois vários [[1]].']],
            blanks: [
              { options: ['animal', 'animais', 'anmal'], answer: 'animal', explain: 'Singular: um animal.' },
              { options: ['animais', 'animals', 'animales'], answer: 'animais', explain: 'Plural: vários animais.' },
            ],
          },
          {
            scene: 'Un pan / dos panes',
            lines: [['Lina', 'Comprei um [[0]] e amanhã compro mais dois [[1]].']],
            blanks: [
              { options: ['pão', 'pães', 'pan'], answer: 'pão', explain: 'Singular: um pão.' },
              { options: ['pães', 'pãos', 'panes'], answer: 'pães', explain: 'Plural: dois pães. Irregular -ães.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Elige el plural correcto para cada sustantivo en paréntesis.',
        type: 'guidedText',
        scene: 'No mercado com a minha família',
        text: 'Fui ao mercado com os meus [[0]] (irmão). Comprámos vários [[1]] (legume) e frutas: [[2]] (laranja), [[3]] (limão) e [[4]] (maçã). Também compramos dois [[5]] (pão) frescos. Os [[6]] (vendedor) foram muito simpáticos.',
        blanks: [
          { options: ['irmãos', 'irmãoes', 'irmans'], answer: 'irmãos', explain: 'Irmão → irmãos (patrón -ãos, parentesco).' },
          { options: ['legumes', 'légumes', 'legumens'], answer: 'legumes', explain: 'Legume → legumes (+s).' },
          { options: ['laranjas', 'laranjões', 'laranjais'], answer: 'laranjas', explain: 'Laranja → laranjas (+s).' },
          { options: ['limões', 'limãos', 'limons'], answer: 'limões', explain: 'Limão → limões (-ões mayoría).' },
          { options: ['maçãs', 'maçõs', 'maçanes'], answer: 'maçãs', explain: 'Maçã → maçãs (+s).' },
          { options: ['pães', 'pãos', 'pões'], answer: 'pães', explain: 'Pão → pães (irregular -ães).' },
          { options: ['vendedores', 'vendedoris', 'vendedoras'], answer: 'vendedores', explain: 'Vendedor → vendedores (+es tras consonante).' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe el plural del sustantivo sin opciones.',
        type: 'freeText',
        scene: 'Descrevendo a WeLearn',
        text: 'A WeLearn tem muitos [[0]] (aluno) internacionais. Temos vários [[1]] (professor) experientes. As [[2]] (aula) são dinâmicas. Usamos muitos [[3]] (material) visuais. Os [[4]] (jovem) aprendem muito rápido. Temos [[5]] (avião) de conhecimento para compartilhar!',
        blanks: [
          { answer: 'alunos', explain: 'Aluno → alunos (+s).' },
          { answer: 'professores', explain: 'Professor → professores (+es).' },
          { answer: 'aulas', explain: 'Aula → aulas (+s).' },
          { answer: 'materiais', explain: 'Material → materiais (-al → -ais).' },
          { answer: 'jovens', explain: 'Jovem → jovens (-em → -ens).' },
          { answer: 'aviões', explain: 'Avião → aviões (-ão → -ões).' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la frase con el plural correcto.',
        type: 'write',
        items: [
          {
            scene: 'Los hermanos',
            prompt: 'Escribe: Tengo dos hermanos. → Tenho dois ___. (irmão)',
            answer: 'Tenho dois irmãos.',
            accepted: ['tenho dois irmãos', 'tenho dois irmãos.'],
            explain: 'Irmão → irmãos. Patrón -ãos para parentesco.',
          },
          {
            scene: 'Los animales',
            prompt: 'Escribe: Los animales del parque son hermosos. → Os ___ do parque são lindos. (animal)',
            answer: 'Os animais do parque são lindos.',
            accepted: ['os animais do parque são lindos', 'os animais do parque são lindos.'],
            explain: 'Animal → animais. -al → -ais.',
          },
          {
            scene: 'Los hombres',
            prompt: 'Escribe: Los hombres trabajan aquí. → Os ___ trabalham aqui. (homem)',
            answer: 'Os homens trabalham aqui.',
            accepted: ['os homens trabalham aqui', 'os homens trabalham aqui.'],
            explain: 'Homem → homens. -em → -ens.',
          },
          {
            scene: 'Los panes',
            prompt: 'Escribe: Compré tres panes. → Comprei três ___. (pão)',
            answer: 'Comprei três pães.',
            accepted: ['comprei três pães', 'comprei três pães.'],
            explain: 'Pão → pães. Irregular -ães. Memorizar.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Describe una situación usando plurales en portugués.',
        type: 'write',
        items: [
          {
            scene: 'Tu familia',
            prompt: 'Na minha família temos ___ (irmão/irmã) e os meus ___ (pai = pais) são ___.',
            answer: 'Na minha família temos dois irmãos e os meus pais são muito bons.',
            accepted: ['na minha família temos dois irmãos e os meus pais são muito bons'],
            explain: 'Irmãos (-ãos). Pais = plural de pai (+s). Muito bons = adjetivo.',
          },
          {
            scene: 'Tu clase',
            prompt: 'Os ___ (aluno) de português aprendem muito. Temos ___ (professor) excelentes.',
            answer: 'Os alunos de português aprendem muito. Temos professores excelentes.',
            accepted: ['os alunos de português aprendem muito temos professores excelentes'],
            explain: 'Alunos (+s). Professores (+es). Plurales regulares.',
          },
          {
            scene: 'En el mercado',
            prompt: 'No mercado comprei ___ (limão), ___ (pão) e ___ (maçã).',
            answer: 'No mercado comprei limões, pães e maçãs.',
            accepted: ['no mercado comprei limões pães e maçãs'],
            explain: 'Limões (-ões). Pães (-ães). Maçãs (+s).',
          },
        ],
      },
    ],
  },
}

export default topic
