import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbo-ter',
  order: '03',
  color: '#0d9488',
  category: 'Verbos',
  level: 'A1',
  title: 'Verbo Ter en portugués A1 — Tener y expresiones clave',
  shortTitle: 'Ter (tener)',
  metaTitle: 'Verbo ter português A1 — tenho tens tem temos têm conjugação',
  description:
    'El verbo ter (tener) es fundamental en portugués A1. Se conjuga: tenho/tens/tem/temos/têm. Se usa para posesión, edad y expresiones como ter fome (tener hambre), ter sede (tener sed), ter medo (tener miedo). La edad en portugués también se expresa con ter, igual que en español.',
  lead: 'Ter = tener. tenho/tens/tem/temos/têm. Edad: Tenho 25 anos. Expresiones: ter fome, ter sede, ter medo, ter sorte. La conjugación es irregular — especialmente "tenho" y "têm" (con til).',
  outcomes: [
    'Conjuga ter en presente para todos los sujetos',
    'Usa ter para posesión y para expresar la edad en portugués',
    'Aplica expresiones con ter: fome, sede, medo, sono, pressa',
  ],

  guide: {
    goal: 'Usar ter para posesión, edad y expresiones idiomáticas en portugués A1.',
    model: 'Tenho um livro. (Tengo un libro.) / Tenho vinte anos. (Tengo veinte años.) / Tenho fome. (Tengo hambre.)',
    formula: '[sujeto] + tenho/tens/tem/temos/têm + [complemento]',
    decisions: [
      'tenho → eu: Tenho um carro.',
      'tens → tu: Tens irmãos? (Portugal)',
      'tem → ele/ela/você: Ela tem um gato.',
      'temos → nós: Temos aula hoje.',
      'têm → eles/vocês: Eles têm fome. (¡con til!)',
      'Edad: Tenho [número] anos. Nunca: "Sou 25 anos."',
      'A gente tem = nosotros tenemos (Brasil informal)',
    ],
    table: [
      ['Sujeto', 'Ter', 'Ejemplo'],
      ['eu', 'tenho', 'Tenho fome. (Tengo hambre.)'],
      ['tu', 'tens', 'Tens irmãos? (¿Tienes hermanos?)'],
      ['ele/ela/você', 'tem', 'Ela tem 25 anos.'],
      ['nós', 'temos', 'Temos aula amanhã.'],
      ['eles/vocês', 'têm', 'Eles têm sede. (con til)'],
    ],
    mistakes: [
      '"Têm" (ellos tienen) lleva til (^) sobre la e para diferenciarse de "tem" (él tiene). Sono distintos.',
      'A gente tem (no "a gente têm") — a gente siempre conjuga en 3ª sg.',
      '"Tenho" no "tengo" — el g desaparece en portugués.',
    ],
  },
  seo: [
    {
      heading: 'El verbo ter: conjugación irregular y sus usos',
      paragraphs: [
        'Ter es uno de los verbos más irregulares e importantes del portugués. Su conjugación en presente: tenho, tens, tem, temos, têm. La forma más irregular es "tenho" (yo tengo), que para el hispanohablante puede resultar sorprendente — no existe "tengo" en portugués. La tercera persona plural "têm" lleva til (acento circunflejo) para diferenciarse de "tem" (singular).',
        'Ter se usa igual que "tener" en español: posesión (Tenho um carro = Tengo un coche), familia (Tem uma irmã = Tiene una hermana), edad (Tenho 20 anos = Tengo 20 años) y expresiones idiomáticas con sensaciones.',
      ],
    },
    {
      heading: 'Tem vs têm: una diferencia importante',
      paragraphs: [
        '"Tem" (sin til) es tercera persona singular: ele tem, ela tem, você tem — él/ella/usted tiene. "Têm" (con til circunflejo) es tercera persona plural: eles têm, elas têm, vocês têm — ellos/ustedes tienen. Esta diferencia es solo ortográfica (no se pronuncia diferente en Brasil), pero es esencial para la escritura correcta.',
        'En habla brasileña informal, "a gente" sustituye a "nós" y siempre toma "tem" (no "temos" ni "têm"): "A gente tem aula" = "Tenemos clase". Aprende los dos usos: nós temos (formal) y a gente tem (informal).',
      ],
    },
  ],
  visual: {
    mode: 'verb-conjugation',
    teacherLens: 'El estudiante aprende ter irregular y distingue tem/têm, y las expresiones con ter.',
    graphicPrompt: 'Tabla conjugación ter. Tem vs têm destacados. Expresiones ter + sensación.',
    scene: [
      ['tenho / tens / tem', 'yo / tú / él-ella-você'],
      ['temos / têm', 'nosotros / ellos-vocês'],
      ['ter + fome/sede/medo/sono', 'expresiones con ter'],
    ],
    learnerModes: ['visual: tabla conjugación', 'analítico: tem vs têm', 'oral: hablar de posesiones y edad'],
    practiceVerbs: ['Posee', 'Expresa edad', 'Siente', 'Pregunta', 'Niega', 'Describe'],
    reviewFocus: ['tenho (no tengo)', 'têm con til', 'a gente tem', 'edad con ter'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Conjugación de ter',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de ter.',
        type: 'choice',
        items: [
          {
            scene: 'Posesión',
            lines: [['Carlos', 'Eu ___ um dicionário de português.']],
            options: ['tenho', 'tens', 'tem', 'têm'],
            answer: 'tenho',
            explain: 'Eu tenho = yo tengo. Primera persona singular de ter.',
          },
          {
            scene: 'Edad',
            lines: [['Sofia', 'A minha mãe ___ cinquenta anos.']],
            options: ['tem', 'tenho', 'têm', 'temos'],
            answer: 'tem',
            explain: 'A minha mãe (ela) tem = ella tiene. Edad con ter.',
          },
          {
            scene: 'Tenemos clase',
            lines: [['David', 'Nós ___ aula às três da tarde.']],
            options: ['temos', 'têm', 'tem', 'tenho'],
            answer: 'temos',
            explain: 'Nós temos = nosotros tenemos. Primera persona plural.',
          },
          {
            scene: 'Ellos tienen hambre',
            lines: [['Ana', 'Os meninos ___ fome. Vamos comer.']],
            options: ['têm', 'tem', 'temos', 'tenho'],
            answer: 'têm',
            explain: 'Eles têm (con til) = ellos tienen. Tercera plural de ter.',
          },
          {
            scene: '¿Tienes hermanos?',
            lines: [['Marco', 'Você ___ irmãos?']],
            options: ['tem', 'tens', 'tenho', 'têm'],
            answer: 'tem',
            explain: 'Você tem = usted/tú tienes. Você → 3ª persona singular.',
          },
          {
            scene: 'Tengo sed',
            lines: [['Lina', 'Eu ___ muita sede. Tem água?']],
            options: ['tenho', 'tens', 'tem', 'temos'],
            answer: 'tenho',
            explain: 'Eu tenho sede = tengo sed. Expresión con ter.',
          },
          {
            scene: 'A gente (Brasil)',
            lines: [['Ana', 'A gente ___ aula amanhã, não é?']],
            options: ['tem', 'têm', 'temos', 'tenho'],
            answer: 'tem',
            explain: 'A gente tem (3ª sg). No "a gente têm" ni "a gente temos".',
          },
          {
            scene: 'Ellas tienen miedo',
            lines: [['Marco', 'As crianças ___ medo do escuro.']],
            options: ['têm', 'tem', 'temos', 'tenho'],
            answer: 'têm',
            explain: 'As crianças (elas) têm = ellas tienen. Plural con til.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Ter en diálogo',
        tag: '2 espacios',
        intro: 'Completa los dos verbos ter del diálogo.',
        type: 'dual',
        items: [
          {
            scene: '¿Cuántos años tienes?',
            lines: [
              ['Ana', 'Quantos anos você [[0]]?'],
              ['Carlos', 'Eu [[1]] vinte e três anos.'],
            ],
            blanks: [
              { options: ['tem', 'têm', 'tenho'], answer: 'tem', explain: 'Você tem = usted tiene. 3ª sg.' },
              { options: ['tenho', 'tem', 'temos'], answer: 'tenho', explain: 'Eu tenho = yo tengo. 1ª sg.' },
            ],
          },
          {
            scene: 'Hambre y sed',
            lines: [['David', 'Eu [[0]] fome e eles também [[1]] sede.']],
            blanks: [
              { options: ['tenho', 'tem', 'têm'], answer: 'tenho', explain: 'Eu tenho fome. 1ª sg.' },
              { options: ['têm', 'tem', 'temos'], answer: 'têm', explain: 'Eles têm sede. 3ª pl con til.' },
            ],
          },
          {
            scene: 'Nosotros y ellos',
            lines: [['Zhanna', 'Nós [[0]] muitos alunos e eles [[1]] muito talento.']],
            blanks: [
              { options: ['temos', 'têm', 'tem'], answer: 'temos', explain: 'Nós temos. 1ª pl.' },
              { options: ['têm', 'temos', 'tem'], answer: 'têm', explain: 'Eles têm. 3ª pl con til.' },
            ],
          },
          {
            scene: '¿Tienes mascota?',
            lines: [
              ['Sofia', 'Você [[0]] animais de estimação?'],
              ['Marco', 'Sim, eu [[1]] um gato.'],
            ],
            blanks: [
              { options: ['tem', 'tens', 'tenho'], answer: 'tem', explain: 'Você tem = usted/tú tienes. 3ª sg.' },
              { options: ['tenho', 'tem', 'tens'], answer: 'tenho', explain: 'Eu tenho = yo tengo. 1ª sg.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa con la forma correcta de ter.',
        type: 'guidedText',
        scene: 'Uma tarde na WeLearn',
        text: 'David [[0]] uma nova aula de português hoje. Os alunos [[1]] muito interesse no tema. Eu [[2]] o meu dicionário e o meu caderno. A gente [[3]] uma hora de aula. Você [[4]] alguma pergunta? Nós [[5]] tempo para conversar depois.',
        blanks: [
          { options: ['tem', 'têm', 'tenho'], answer: 'tem', explain: 'David (ele) tem. 3ª sg.' },
          { options: ['têm', 'tem', 'temos'], answer: 'têm', explain: 'Os alunos (eles) têm. 3ª pl.' },
          { options: ['tenho', 'tem', 'têm'], answer: 'tenho', explain: 'Eu tenho. 1ª sg.' },
          { options: ['tem', 'temos', 'têm'], answer: 'tem', explain: 'A gente tem (3ª sg). Brasil informal.' },
          { options: ['tem', 'tenho', 'têm'], answer: 'tem', explain: 'Você tem = usted/tú tienes. 3ª sg.' },
          { options: ['temos', 'têm', 'tem'], answer: 'temos', explain: 'Nós temos. 1ª pl.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe ter sin opciones.',
        type: 'freeText',
        scene: 'Conversação entre amigos brasileiros',
        text: 'Eu [[0]] vinte e cinco anos. Você [[1]] irmãos? Sim, eu [[2]] uma irmã. Nós [[3]] aula às três. A gente [[4]] muito para estudar! Os professores [[5]] muita paciência conosco.',
        blanks: [
          { answer: 'tenho', explain: 'Eu tenho 25 anos. Edad con ter.' },
          { answer: 'tem', explain: 'Você tem irmãos? 3ª sg.' },
          { answer: 'tenho', explain: 'Eu tenho uma irmã. 1ª sg.' },
          { answer: 'temos', explain: 'Nós temos aula. 1ª pl.' },
          { answer: 'tem', explain: 'A gente tem (3ª sg).' },
          { answer: 'têm', explain: 'Os professores (eles) têm. 3ª pl con til.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la frase completa con ter.',
        type: 'write',
        items: [
          {
            scene: 'Tu edad',
            prompt: 'Escribe tu edad en portugués: Eu ___ [número] anos.',
            answer: 'Eu tenho vinte anos.',
            accepted: ['eu tenho vinte anos', 'eu tenho vinte e três anos', 'eu tenho trinta anos'],
            explain: 'Eu tenho X anos. La edad con ter, no ser.',
          },
          {
            scene: 'Tengo hambre',
            prompt: 'Escribe: Tengo mucha hambre. → Eu ___ muita fome.',
            answer: 'Eu tenho muita fome.',
            accepted: ['eu tenho muita fome', 'eu tenho muita fome.'],
            explain: 'Ter fome = tener hambre. Eu tenho.',
          },
          {
            scene: 'Ella tiene miedo',
            prompt: 'Escribe: Ella tiene miedo. → Ela ___ medo.',
            answer: 'Ela tem medo.',
            accepted: ['ela tem medo', 'ela tem medo.'],
            explain: 'Ela tem medo. Ter medo = tener miedo. 3ª sg.',
          },
          {
            scene: 'Ellos tienen muchos libros',
            prompt: 'Escribe: Ellos tienen muchos libros. → Eles ___ muitos livros.',
            answer: 'Eles têm muitos livros.',
            accepted: ['eles têm muitos livros', 'eles têm muitos livros.'],
            explain: 'Eles têm (con til). 3ª pl de ter.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Habla de ti mismo y de tu familia usando ter.',
        type: 'write',
        items: [
          {
            scene: 'Tú y tu familia',
            prompt: 'Eu ___ ___ anos. Eu ___ [irmão/irmã/filhos/etc.]. A minha família ___.',
            answer: 'Eu tenho vinte e cinco anos. Eu tenho uma irmã. A minha família tem três pessoas.',
            accepted: ['eu tenho vinte e cinco anos eu tenho uma irmã a minha família tem três pessoas'],
            explain: 'Tenho para 1ª sg. Tem para 3ª sg (família).',
          },
          {
            scene: 'Tu clase',
            prompt: 'A nossa turma ___ ___ alunos. Nós ___ aula ___ vezes por semana.',
            answer: 'A nossa turma tem quinze alunos. Nós temos aula três vezes por semana.',
            accepted: ['a nossa turma tem quinze alunos nós temos aula três vezes por semana'],
            explain: 'A turma tem (3ª sg). Nós temos (1ª pl).',
          },
          {
            scene: 'Sensaciones',
            prompt: 'Agora eu ___ ___ (sensación). Os meus amigos ___ ___.',
            answer: 'Agora eu tenho fome. Os meus amigos têm sede.',
            accepted: ['agora eu tenho fome os meus amigos têm sede', 'agora eu tenho sono os meus amigos têm fome'],
            explain: 'Tenho para 1ª sg. Têm para 3ª pl.',
          },
        ],
      },
    ],
  },
}

export default topic
