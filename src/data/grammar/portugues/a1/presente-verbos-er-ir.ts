import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'presente-verbos-er-ir',
  order: '07',
  color: '#166534',
  category: 'Verbos',
  level: 'A1',
  title: 'Presente dos Verbos -er e -ir en portugués A1 — Segunda y tercera conjugación',
  shortTitle: 'Presente -er/-ir',
  metaTitle: 'Presente verbos -er -ir português A1 — beber comer partir abrir conjugação',
  description:
    'Los verbos en -er (beber, comer, vender, escrever, correr) y -ir (partir, abrir, decidir, assistir) forman la segunda y tercera conjugación del portugués. Las terminaciones son muy similares entre sí. Singularidad del portugués brasileño: "nós" en el habla informal se reemplaza frecuentemente por "a gente" + tercera persona singular.',
  lead: 'Verbos -er: -o/-es/-e/-emos/-em. Verbos -ir: -o/-es/-e/-imos/-em. La diferencia está en nós: -emos (comer) vs -imos (partir). Você/ele/ela → -e. Eles/vocês → -em.',
  outcomes: [
    'Conjuga verbos regulares en -er y -ir en presente indicativo',
    'Distingue la forma de nós: -emos (-er) vs -imos (-ir)',
    'Usa "a gente" + tercera persona singular como alternativa al nós en BP informal',
  ],

  guide: {
    goal: 'Conjugar verbos regulares -er e -ir en presente indicativo del portugués A1.',
    model: 'beber → bebo, bebes, bebe, bebemos, bebem | partir → parto, partes, parte, partimos, partem',
    formula: 'radical + -o / -es / -e / -emos(er) o -imos(ir) / -em',
    decisions: [
      'eu → -o: bebo, como, parto, abro',
      'tu → -es: bebes, comes (Portugal)',
      'ele/ela/você → -e: bebe, come, parte, abre',
      'nós -er → -emos: bebemos, comemos, vendemos',
      'nós -ir → -imos: partimos, abrimos, decidimos',
      'eles/vocês → -em: bebem, comem, partem, abrem',
      'BP informal: a gente + -e (3ª sg): a gente bebe, a gente come, a gente parte',
    ],
    table: [
      ['Sujeto', 'beber (-er)', 'partir (-ir)'],
      ['eu', 'bebo', 'parto'],
      ['tu', 'bebes', 'partes'],
      ['ele/ela/você', 'bebe', 'parte'],
      ['nós', 'bebemos', 'partimos'],
      ['eles/vocês', 'bebem', 'partem'],
    ],
    mistakes: [
      '"Você bebes" ✗ → "Você bebe". Você → -e, no -es (eso sería tu en Portugal).',
      '"Eles bebe" ✗ → "Eles bebem". Plural: siempre -em.',
      '"Nós partemos" ✗ → "Nós partimos". -ir → nós -imos, no -emos.',
    ],
  },
  seo: [
    {
      heading: 'Verbos -er y -ir: la segunda y tercera conjugación del portugués',
      paragraphs: [
        'Los verbos de la segunda (-er) y tercera (-ir) conjugación son muy frecuentes en portugués: beber, comer, vender, escrever, correr, partir, abrir, decidir, assistir. Sus terminaciones son casi idénticas, con una sola diferencia en nós: bebemos (er) vs partimos (ir).',
        'Para el hispanohablante, estas terminaciones son familiares: bebo/bebes/bebe/bebemos/beben — en portugués la única diferencia es que la 3ª plural es -em (bebem) en lugar de -en. La -m final en portugués indica nasalidad, característica muy marcada en el portugués brasileño.',
      ],
    },
    {
      heading: '"A gente" en lugar de nós en el portugués brasileño',
      paragraphs: [
        'En el portugués brasileño hablado, "nós" es frecuentemente sustituido por "a gente" con tercera persona singular. En lugar de "nós bebemos", se dice "a gente bebe". Esta forma es la más natural en conversación informal en Brasil y no debe considerarse incorrecta — es simplemente coloquial.',
        'En la escritura formal y en el portugués europeo, "nós" con -emos/-imos sigue siendo la norma. Aprende ambas formas: entiende "nós bebemos" cuando lo leas, pero en el habla cotidiana con brasileños podrás usar "a gente bebe".',
      ],
    },
    {
      heading: 'Você: siempre tercera persona',
      paragraphs: [
        'Al igual que con los verbos -ar, "você" toma la forma de tercera persona singular: você bebe (no "você bebes"). Así, ele, ela y você comparten la misma terminación -e para verbos -er/-ir. Este es uno de los aspectos más importantes del portugués brasileño para los hispanohablantes.',
      ],
    },
  ],
  visual: {
    mode: 'verb-conjugation',
    teacherLens: 'El estudiante aprende que -er/-ir son casi idénticos excepto en nós (-emos vs -imos), y que você → -e.',
    graphicPrompt: 'Tabla doble: beber y partir en columnas paralelas. Nós resaltado para ver diferencia -emos/-imos. A gente como alternativa.',
    scene: [
      ['-o / -es / -e', 'eu / tu / ele-ela-você'],
      ['-emos / -imos', 'nós (-er vs -ir)'],
      ['-em', 'eles/vocês'],
    ],
    learnerModes: ['visual: tabla paralela -er/-ir', 'analítico: nós -emos vs -imos', 'oral: a gente en BP'],
    practiceVerbs: ['beber', 'comer', 'vender', 'escrever', 'correr', 'partir', 'abrir', 'decidir', 'assistir'],
    reviewFocus: ['-em (no -en)', 'você bebe (no bebes)', 'nós bebemos vs nós partimos', 'a gente bebe (BP informal)'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Conjugación correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del verbo entre paréntesis.',
        type: 'choice',
        items: [
          {
            scene: 'Yo bebo',
            lines: [['Carlos', 'Eu ___ água todos os dias. (beber)']],
            options: ['bebo', 'bebes', 'bebe', 'bebem'],
            answer: 'bebo',
            explain: 'Eu + -o: bebo. Primera persona singular de beber.',
          },
          {
            scene: 'Ella come',
            lines: [['Sofia', 'A Ana ___ arroz com feijão no almoço. (comer)']],
            options: ['come', 'como', 'comes', 'comem'],
            answer: 'come',
            explain: 'Ela + -e: come. Tercera persona singular.',
          },
          {
            scene: 'Nosotros partimos',
            lines: [['David', 'Nós ___ para o Rio amanhã. (partir)']],
            options: ['partimos', 'partemos', 'parte', 'partem'],
            answer: 'partimos',
            explain: 'Nós + -imos: partimos. Verbos -ir: nós toma -imos.',
          },
          {
            scene: 'Ellos abren',
            lines: [['Ana', 'Os alunos ___ os livros. (abrir)']],
            options: ['abrem', 'abre', 'abrimos', 'abres'],
            answer: 'abrem',
            explain: 'Eles + -em: abrem. Tercera persona plural.',
          },
          {
            scene: 'Você escribe',
            lines: [['Lina', 'Você ___ muito bem em português! (escrever)']],
            options: ['escreve', 'escreves', 'escrevo', 'escrevem'],
            answer: 'escreve',
            explain: 'Você + -e (3ª sg): escreve. No "escreves" (eso sería tu en Portugal).',
          },
          {
            scene: 'Yo decido',
            lines: [['Marco', 'Eu ___ estudar coreano também. (decidir)']],
            options: ['decido', 'decide', 'decides', 'decidem'],
            answer: 'decido',
            explain: 'Eu + -o: decido. Primera persona singular de decidir.',
          },
          {
            scene: 'A gente (BP)',
            lines: [['Zhanna', 'A gente ___ muito na WeLearn. (aprender)']],
            options: ['aprende', 'aprendemos', 'aprendem', 'aprendo'],
            answer: 'aprende',
            explain: 'A gente + -e (3ª sg): aprende. Alternativa informal a "nós aprendemos".',
          },
          {
            scene: 'Nosotros comemos',
            lines: [['Sofia', 'Nós ___ juntos todos os dias. (comer)']],
            options: ['comemos', 'comimos', 'come', 'comem'],
            answer: 'comemos',
            explain: 'Nós + -emos (verbo -er): comemos. Diferente de -ir donde sería -imos.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos verbos en diálogo',
        tag: '2 espacios',
        intro: 'Conjuga los dos verbos del diálogo.',
        type: 'dual',
        items: [
          {
            scene: '¿Qué bebes?',
            lines: [
              ['Lina', 'Você [[0]] café ou chá? (beber)'],
              ['Carlos', 'Eu [[1]] café pela manhã. (beber)'],
            ],
            blanks: [
              { options: ['bebe', 'bebes', 'bebo'], answer: 'bebe', explain: 'Você + -e: bebe.' },
              { options: ['bebo', 'bebe', 'bebem'], answer: 'bebo', explain: 'Eu + -o: bebo.' },
            ],
          },
          {
            scene: 'Aprenden y escriben',
            lines: [['David', 'Os alunos [[0]] português e [[1]] muito bem. (aprender / escrever)']],
            blanks: [
              { options: ['aprendem', 'aprende', 'aprendemos'], answer: 'aprendem', explain: 'Os alunos (eles) + -em: aprendem.' },
              { options: ['escrevem', 'escreve', 'escrevemos'], answer: 'escrevem', explain: 'Eles + -em: escrevem.' },
            ],
          },
          {
            scene: 'Partimos y decidimos',
            lines: [['Ana', 'Nós [[0]] amanhã e [[1]] o roteiro hoje. (partir / decidir)']],
            blanks: [
              { options: ['partimos', 'partemos', 'partem'], answer: 'partimos', explain: 'Nós + -imos: partimos. Verbo -ir.' },
              { options: ['decidimos', 'decidemos', 'decide'], answer: 'decidimos', explain: 'Nós + -imos: decidimos. Verbo -ir.' },
            ],
          },
          {
            scene: 'Ella vende, yo abro',
            lines: [['Marco', 'A Sofia [[0]] cursos e eu [[1]] a sala de aula. (vender / abrir)']],
            blanks: [
              { options: ['vende', 'vendes', 'vendem'], answer: 'vende', explain: 'Ela + -e: vende.' },
              { options: ['abro', 'abre', 'abres'], answer: 'abro', explain: 'Eu + -o: abro. Primera singular de abrir.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa el texto con la forma correcta del verbo.',
        type: 'guidedText',
        scene: 'Um dia típico na WeLearn',
        text: 'Eu [[0]] (beber) café antes da aula. David [[1]] (escrever) os exercícios no quadro. Os alunos [[2]] (abrir) os cadernos e [[3]] (aprender) muito. Nós [[4]] (comer) juntos no intervalo. A gente [[5]] (discutir) as dúvidas. Você [[6]] (assistir) às aulas on-line?',
        blanks: [
          { options: ['bebo', 'bebe', 'bebem'], answer: 'bebo', explain: 'Eu + -o: bebo.' },
          { options: ['escreve', 'escrevo', 'escrevem'], answer: 'escreve', explain: 'David (ele) + -e: escreve.' },
          { options: ['abrem', 'abre', 'abrimos'], answer: 'abrem', explain: 'Os alunos (eles) + -em: abrem.' },
          { options: ['aprendem', 'aprende', 'aprendemos'], answer: 'aprendem', explain: 'Eles + -em: aprendem.' },
          { options: ['comemos', 'comimos', 'come'], answer: 'comemos', explain: 'Nós + -emos: comemos. Verbo -er.' },
          { options: ['discute', 'discutimos', 'discutem'], answer: 'discute', explain: 'A gente + -e (3ª sg): discute.' },
          { options: ['assiste', 'assistes', 'assisto'], answer: 'assiste', explain: 'Você + -e: assiste.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta del verbo sin opciones.',
        type: 'freeText',
        scene: 'Conversa sobre rotinas',
        text: 'Eu [[0]] (comer) muita fruta. A Zhanna [[1]] (beber) chá verde. Nós [[2]] (aprender) juntos. Os alunos [[3]] (escrever) em português. Você [[4]] (decidir) estudar aqui? Eles [[5]] (correr) pela manhã.',
        blanks: [
          { answer: 'como', explain: 'Eu + -o: como. Primera singular de comer.' },
          { answer: 'bebe', explain: 'Ela + -e: bebe. Tercera singular.' },
          { answer: 'aprendemos', explain: 'Nós + -emos: aprendemos. Verbo -er.' },
          { answer: 'escrevem', explain: 'Os alunos (eles) + -em: escrevem.' },
          { answer: 'decide', explain: 'Você + -e: decide. Tercera singular.' },
          { answer: 'correm', explain: 'Eles + -em: correm. Tercera plural.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la frase completa con el verbo conjugado.',
        type: 'write',
        items: [
          {
            scene: 'Yo bebo agua',
            prompt: 'Escribe: Yo bebo agua todos los días. → Eu ___ água todos os dias. (beber)',
            answer: 'Eu bebo água todos os dias.',
            accepted: ['eu bebo água todos os dias', 'eu bebo agua todos os dias'],
            explain: 'Eu + -o: bebo. Primera persona singular de beber.',
          },
          {
            scene: 'Ellos aprenden',
            prompt: 'Escribe: Ellos aprenden portugués. → Eles ___ português. (aprender)',
            answer: 'Eles aprendem português.',
            accepted: ['eles aprendem português', 'eles aprendem portugues'],
            explain: 'Eles + -em: aprendem. Tercera plural de aprender.',
          },
          {
            scene: 'Nosotros partimos',
            prompt: 'Escribe: Nosotros partimos mañana. → Nós ___ amanhã. (partir)',
            answer: 'Nós partimos amanhã.',
            accepted: ['nós partimos amanhã', 'nos partimos amanha'],
            explain: 'Nós + -imos: partimos. Verbo -ir, nós toma -imos.',
          },
          {
            scene: 'Você decide',
            prompt: 'Escribe: Tú decides estudar aquí. → Você ___ estudar aqui. (decidir)',
            answer: 'Você decide estudar aqui.',
            accepted: ['você decide estudar aqui', 'voce decide estudar aqui'],
            explain: 'Você + -e: decide. No "decides" — você va con tercera persona.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Describe acciones usando verbos -er e -ir en portugués.',
        type: 'write',
        items: [
          {
            scene: 'Tus hábitos',
            prompt: 'Eu ___ (beber/comer) ___. Eu ___ (aprender/escrever) ___. A gente ___ (correr/decidir) ___.',
            answer: 'Eu bebo café pela manhã. Eu aprendo português na WeLearn. A gente corre no parque.',
            accepted: ['eu bebo café pela manhã eu aprendo português na welearn a gente corre no parque'],
            explain: 'Eu + -o: bebo, aprendo. A gente + -e: corre.',
          },
          {
            scene: 'Tu compañero',
            prompt: 'O meu amigo/A minha amiga ___ (comer) ___. Ele/Ela ___ (escrever) ___. Eles ___ (aprender) ___.',
            answer: 'O meu amigo come pizza. Ele escreve muito bem. Eles aprendem juntos.',
            accepted: ['o meu amigo come pizza ele escreve muito bem eles aprendem juntos'],
            explain: 'Ele + -e: come, escreve. Eles + -em: aprendem.',
          },
          {
            scene: 'Nuestra clase',
            prompt: 'Nós ___ (aprender) ___ na WeLearn. Os alunos ___ (escrever) ___ e ___ (decidir) ___.',
            answer: 'Nós aprendemos português na WeLearn. Os alunos escrevem exercícios e decidem estudar mais.',
            accepted: ['nós aprendemos português na welearn os alunos escrevem exercícios e decidem estudar mais'],
            explain: 'Nós + -emos: aprendemos. Eles + -em: escrevem, decidem.',
          },
        ],
      },
    ],
  },
}

export default topic
