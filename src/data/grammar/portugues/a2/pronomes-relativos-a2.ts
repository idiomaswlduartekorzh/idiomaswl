import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pronomes-relativos-a2',
  order: '09',
  color: '#166534',
  category: 'Pronomes',
  level: 'A2',
  title: 'Pronomes Relativos em Português A2',
  shortTitle: 'Pronomes relativos',
  metaTitle: 'Pronomes relativos português A2 — que, quem, onde, cujo',
  description:
    'Los pronombres relativos en portugués conectan oraciones subordinadas con su antecedente. Los principales son: "que" (cosas y personas), "quem" (personas, precedido de preposición), "onde" (lugares) y "cujo/cuja" (posesión). "Que" es el más versátil y frecuente del idioma.',
  lead: '"Que" conecta casi todo en portugués: "O livro que comprei é ótimo." / "A pessoa que te ligou é minha amiga." / "A cidade onde moro é linda." Aprende a unir oraciones con elegancia.',
  outcomes: [
    'Usa "que" para referirse a cosas y personas como sujeto u objeto',
    'Usa "quem" para personas precedido de preposición',
    'Usa "onde" para referirse a lugares',
    'Usa "cujo/cuja" para indicar posesión dentro de la cláusula',
  ],

  guide: {
    goal: 'Conectar oraciones usando los pronombres relativos principales del portugués.',
    model: 'O professor que me ensinou é brasileiro. / A cidade onde nasci fica no sul. / O aluno cujo livro sumiu chegou tarde.',
    formula: 'Antecedente + pronombre relativo + verbo subordinado',
    decisions: [
      '"Que" para cosas y personas (sujeto u objeto directo): "O filme que vi foi incrível." / "A professora que me ensina é ótima."',
      '"Quem" para personas precedido de preposición: "A pessoa de quem falo é minha irmã." / "O amigo com quem viajei é divertido."',
      '"Onde" para lugares: "A cidade onde nasci é pequena." / "O restaurante onde jantamos estava cheio."',
      '"Cujo/cuja" para posesión (concuerda con el sustantivo poseído): "O aluno cujo trabalho foi aprovado ficou feliz."',
      'En el habla coloquial: "que" a menudo reemplaza a "quem" y "onde" sin ser incorrecto: "A pessoa que falo" / "O lugar que moro."',
    ],
    table: [
      ['Relativo', 'Uso', 'Ejemplo'],
      ['que', 'cosas y personas (sujeto/OD)', 'O carro que comprei é novo.'],
      ['quem', 'personas (con preposición)', 'A amiga com quem fui é simpática.'],
      ['onde', 'lugares', 'A escola onde estudei fica no centro.'],
      ['cujo/cuja', 'posesión', 'O autor cujo livro li é famoso.'],
    ],
    mistakes: [
      '"O livro que eu comprei" ✓ vs "O livro o qual eu comprei" (formal, literario). En A2, use "que" siempre.',
      '"A pessoa que eu falei" es coloquial ✓; la forma culta es "A pessoa com quem eu falei."',
      '"Cujo" es invariable en cuanto al género del poseedor pero concuerda con lo poseído: "o autor cujo livro" / "o autor cuja obra."',
      'No confundir "que" (pronombre relativo) con "que" (conjunção): "Eu sei que ele veio" (que = conjunção) vs "O menino que veio" (que = relativo).',
    ],
  },

  seo: [
    {
      heading: 'Los pronombres relativos en portugués: conectar ideas con elegancia',
      paragraphs: [
        'Los pronombres relativos son las palabras que permiten conectar dos oraciones haciendo referencia a un elemento ya mencionado (el antecedente). En portugués el sistema es bastante sencillo en el nivel A2: el pronombre "que" cubre la mayoría de los casos, tanto para cosas como para personas. "O livro que você me emprestou é ótimo" / "A professora que me ensina é muito paciente."',
        'Los otros tres pronombres importantes son: "onde" para lugares (equivalente al "donde" español), "quem" para personas precedido de preposición, y "cujo/cuja" para expresar posesión en una cláusula relativa. Este último es más formal y aparece principalmente en textos escritos.',
      ],
    },
    {
      heading: 'Que: el pronombre relativo más versátil',
      paragraphs: [
        '"Que" es el pronombre relativo más usado en portugués. Puede referirse a personas, animales o cosas, y funciona como sujeto o como objeto directo de la oración subordinada. Ejemplos: "A mulher que chegou é minha tia" (sujeto), "O e-mail que recebi era importante" (objeto directo).',
        'En el habla coloquial brasileña, "que" tiende a generalizar y a reemplazar a "quem" y "onde": "A pessoa que eu falei" en lugar de "A pessoa com quem eu falei". Para el nivel A2, reconocer ambas formas es suficiente; la producción puede limitarse a "que", "quem" y "onde".',
      ],
    },
    {
      heading: 'Onde y quem: para lugares y personas con preposición',
      paragraphs: [
        '"Onde" funciona como relativo de lugar y es equivalente al "donde" del español. "O restaurante onde comemos era excelente" / "A cidade onde morei tem um clima lindo." Es uno de los pronombres más fáciles de aprender para hispanohablantes.',
        '"Quem" solo puede referirse a personas y siempre va precedido de preposición: "O médico com quem consultei é especialista" / "A amiga de quem te falei chegou ontem." Sin preposición, se usa "que": "O médico que consultei" (objeto directo, sin preposición).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende a conectar oraciones usando pronombres relativos en portugués.',
    graphicPrompt: 'Oraciones con flechas que conectan el antecedente con la cláusula relativa.',
    scene: [
      ['O livro que comprei é muito interessante.', 'El libro que compré es muy interesante.'],
      ['A cidade onde nasci é pequena e tranquila.', 'La ciudad donde nací es pequeña y tranquila.'],
      ['A pessoa com quem viajei é minha prima.', 'La persona con quien viajé es mi prima.'],
      ['O professor que nos ensina é muito paciente.', 'El profesor que nos enseña es muy paciente.'],
      ['O restaurante onde jantamos estava cheio.', 'El restaurante donde cenamos estaba lleno.'],
      ['O aluno cujo trabalho foi aprovado está feliz.', 'El alumno cuyo trabajo fue aprobado está feliz.'],
      ['A empresa para a qual trabalho é grande.', 'La empresa para la que trabajo es grande.'],
      ['A amiga de quem te falei chegou.', 'La amiga de quien te hablé llegó.'],
    ],
    learnerModes: ['que: objetos/personas', 'onde: lugares', 'quem: personas con preposición', 'cujo: posesión'],
    reviewFocus: ['que vs quem', 'onde para lugares', 'preposición + quem', 'cujo/cuja acuerdo'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el pronombre relativo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el pronombre relativo correcto para completar cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'El libro',
            lines: [['Ana', 'O livro ___ você me emprestou é excelente.']],
            options: ['que', 'quem', 'onde', 'cujo'],
            answer: 'que',
            explain: '"Que" para referirse a una cosa (livro) como objeto directo.',
          },
          {
            scene: 'La ciudad',
            lines: [['Carlos', 'A cidade ___ cresci fica no interior de Minas Gerais.']],
            options: ['onde', 'que', 'quem', 'cujo'],
            answer: 'onde',
            explain: '"Onde" para referirse a un lugar: "a cidade onde cresci" (la ciudad donde crecí).',
          },
          {
            scene: 'El médico',
            lines: [['Pedro', 'O médico com ___ consultei ontem é muito competente.']],
            options: ['quem', 'que', 'onde', 'cujo'],
            answer: 'quem',
            explain: '"Quem" para personas precedido de preposición: "com quem" (con quien).',
          },
          {
            scene: 'La profesora',
            lines: [['Maria', 'A professora ___ nos ensina fala cinco idiomas.']],
            options: ['que', 'quem', 'onde', 'cuja'],
            answer: 'que',
            explain: '"Que" para persona como sujeto de la cláusula relativa.',
          },
          {
            scene: 'El autor',
            lines: [['Enzo', 'O escritor ___ livro li no mês passado ganhou um prêmio.']],
            options: ['cujo', 'que', 'quem', 'onde'],
            answer: 'cujo',
            explain: '"Cujo" para posesión: "o escritor cujo livro" = el escritor cuyo libro.',
          },
          {
            scene: 'El restaurante',
            lines: [['Alba', 'O restaurante ___ comemos tem uma vista linda do mar.']],
            options: ['onde', 'que', 'quem', 'cujo'],
            answer: 'onde',
            explain: '"Onde" para lugar: "o restaurante onde comemos" (el restaurante donde comimos).',
          },
          {
            scene: 'La amiga',
            lines: [['Lina', 'A amiga de ___ te falei vai chegar amanhã.']],
            options: ['quem', 'que', 'onde', 'cuja'],
            answer: 'quem',
            explain: '"De quem" = de quien. Preposición de + quem para persona.',
          },
          {
            scene: 'El trabajo',
            lines: [['Sofia', 'O projeto ___ estamos desenvolvendo vai ser lançado em março.']],
            options: ['que', 'quem', 'onde', 'cujo'],
            answer: 'que',
            explain: '"Que" para cosas como objeto directo o sujeto de la subordinada.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos pronombres relativos',
        tag: '2 espacios',
        intro: 'Completa con el pronombre relativo correcto en cada espacio.',
        type: 'dual',
        items: [
          {
            scene: 'La amiga viajera',
            lines: [['Ana', 'A amiga com [[0]] viajei é de Porto Alegre. A cidade [[1]] ela mora é muito fria no inverno.']],
            blanks: [
              { options: ['quem', 'que', 'onde'], answer: 'quem', explain: '"Com quem" = con quien. Preposición + quem para personas.' },
              { options: ['onde', 'que', 'quem'], answer: 'onde', explain: '"Onde" para lugar: a cidade onde ela mora.' },
            ],
          },
          {
            scene: 'El trabajo',
            lines: [['Carlos', 'A empresa [[0]] trabalho tem mil funcionários. O chefe [[1]] me apresentaram é muito simpático.']],
            blanks: [
              { options: ['onde', 'que', 'quem'], answer: 'onde', explain: '"Onde" para lugar de trabajo (empresa = lugar).' },
              { options: ['que', 'quem', 'onde'], answer: 'que', explain: '"Que" para persona como objeto directo: o chefe que me apresentaram.' },
            ],
          },
          {
            scene: 'El libro y el autor',
            lines: [['Pedro', 'O autor [[0]] livro comprei é brasileiro. O livro [[1]] comprei tem trezentas páginas.']],
            blanks: [
              { options: ['cujo', 'que', 'quem'], answer: 'cujo', explain: '"Cujo" para posesión: o autor cujo livro = el autor cuyo libro.' },
              { options: ['que', 'cujo', 'onde'], answer: 'que', explain: '"Que" para objeto directo (livro = cosa): o livro que comprei.' },
            ],
          },
          {
            scene: 'El lugar de vacaciones',
            lines: [['Maria', 'O hotel [[0]] ficamos tinha uma vista incrível. As pessoas [[1]] conhecemos eram muito gentis.']],
            blanks: [
              { options: ['onde', 'que', 'quem'], answer: 'onde', explain: '"Onde" para lugar: o hotel onde ficamos.' },
              { options: ['que', 'quem', 'onde'], answer: 'que', explain: '"Que" para personas como objeto directo: as pessoas que conhecemos.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una carta con pronombres relativos',
        tag: 'Texto guiado',
        intro: 'Elige el pronombre relativo correcto para completar esta carta.',
        type: 'guidedText',
        scene: 'Carta describiendo una ciudad y una experiencia',
        text: 'Querida Luísa, a cidade [[0]] me mudei é incrível. O bairro [[1]] moro tem parques lindos. As pessoas [[2]] conheci até agora são muito simpáticas. O professor com [[3]] aprendo português fala quatro idiomas. O café [[4]] frequento fica pertinho da minha casa.',
        blanks: [
          { options: ['para onde', 'que', 'quem'], answer: 'para onde', explain: '"Para onde" para destino de mudança: a cidade para onde me mudei.' },
          { options: ['onde', 'que', 'quem'], answer: 'onde', explain: '"Onde" para lugar: o bairro onde moro.' },
          { options: ['que', 'quem', 'onde'], answer: 'que', explain: '"Que" para personas como objeto: as pessoas que conheci.' },
          { options: ['quem', 'que', 'onde'], answer: 'quem', explain: '"Com quem" = con quien. Preposición + quem para persona.' },
          { options: ['que', 'onde', 'quem'], answer: 'que', explain: '"Que" para lugar (café = establecimiento) como objeto directo.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el pronombre relativo',
        tag: 'Texto libre',
        intro: 'Escribe el pronombre relativo correcto: que, quem, onde o cujo/cuja.',
        type: 'freeText',
        scene: 'Presentación de una nueva colega',
        text: 'Esta é a colega [[0]] te falei. Ela vem da cidade [[1]] trabalhei por dois anos. O departamento [[2]] ela vai trabalhar fica no terceiro andar. O projeto [[3]] ela vai liderar é muito importante. A diretora [[4]] projeto ela vai coordenar ficou muito animada.',
        blanks: [
          { answer: 'de quem', explain: '"De quem te falei" = de quien te hablé. Preposición de + quem.' },
          { answer: 'onde', explain: '"A cidade onde trabalhei" = la ciudad donde trabajé. Lugar.' },
          { answer: 'onde', explain: '"O departamento onde ela vai trabalhar" = lugar.' },
          { answer: 'que', explain: '"O projeto que ela vai liderar" = cosa como objeto directo.' },
          { answer: 'cujo', explain: '"A diretora cujo projeto" = posesión. Cujo concuerda con projeto (masculino).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Une las oraciones con pronombres relativos',
        tag: 'Escritura guiada',
        intro: 'Une las dos oraciones en una sola usando el pronombre relativo correcto.',
        type: 'write',
        items: [
          {
            scene: 'El libro',
            prompt: 'Une: "Eu li um livro." + "O livro é muito interessante." → O livro ___ li é muito interessante.',
            answer: 'O livro que li é muito interessante.',
            accepted: ['o livro que li é muito interessante', 'o livro que eu li é muito interessante'],
            explain: '"Que" para objeto directo (livro = cosa): o livro que li.',
          },
          {
            scene: 'La ciudad',
            prompt: 'Une: "Eu nasci em uma cidade." + "A cidade fica no nordeste." → A cidade ___ nasci fica no nordeste.',
            answer: 'A cidade onde nasci fica no nordeste.',
            accepted: ['a cidade onde nasci fica no nordeste'],
            explain: '"Onde" para lugar: a cidade onde nasci.',
          },
          {
            scene: 'El médico',
            prompt: 'Une: "Consultei um médico." + "Fui ao médico ontem." → O médico ___ consultei ontem é excelente.',
            answer: 'O médico que consultei ontem é excelente.',
            accepted: ['o médico que consultei é excelente', 'o médico que consultei ontem é excelente'],
            explain: '"Que" para persona como objeto directo.',
          },
          {
            scene: 'El amigo viajero',
            prompt: 'Une: "Viajei com um amigo." + "O amigo é brasileiro." → O amigo ___ viajei é brasileiro.',
            answer: 'O amigo com quem viajei é brasileiro.',
            accepted: ['o amigo com quem viajei é brasileiro'],
            explain: '"Com quem" para persona con preposición: o amigo com quem viajei.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe oraciones con pronombres relativos',
        tag: 'Escritura libre',
        intro: 'Usa pronombres relativos para escribir sobre personas, lugares y cosas de tu vida.',
        type: 'write',
        items: [
          {
            scene: 'Tu ciudad',
            prompt: 'Describe la ciudad donde vives usando "onde" y "que".',
            answer: 'A cidade onde moro tem um clima quente. O bairro que frequento tem muitos cafés.',
            accepted: ['onde moro', 'onde nasci', 'que frequento', 'que fica', 'que tem'],
            explain: 'Usa: "a cidade onde moro/nasci/cresci" + descripción.',
          },
          {
            scene: 'Una persona importante',
            prompt: 'Describe a una persona importante en tu vida usando "que" y/o "com quem".',
            answer: 'Tenho um amigo que me apoia muito. É a pessoa com quem posso contar sempre.',
            accepted: ['que me apoia', 'com quem', 'que conheço', 'que me ajuda', 'de quem'],
            explain: 'Usa: "um amigo que..." / "a pessoa com quem..." / "alguém de quem..."',
          },
          {
            scene: 'Un lugar favorito',
            prompt: 'Escribe sobre un lugar que frecuentas usando "onde" y "que".',
            answer: 'O café onde trabalho tem um ambiente tranquilo. É o lugar que mais gosto na cidade.',
            accepted: ['onde', 'que', 'onde vou', 'onde trabalho', 'que frequento', 'que amo'],
            explain: 'Usa: "o lugar onde..." + descripción + "...que fico/gosto/frequento."',
          },
        ],
      },
    ],
  },
}

export default topic
