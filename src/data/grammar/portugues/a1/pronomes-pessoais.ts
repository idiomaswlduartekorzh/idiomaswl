import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pronomes-pessoais',
  order: '01',
  color: '#166534',
  category: 'Pronombres',
  level: 'A1',
  title: 'Pronomes Pessoais en portugués A1 — Pronombres personales',
  shortTitle: 'Pronomes pessoais',
  metaTitle: 'Pronomes pessoais português A1 — eu tu ele ela nós vocês eles elas',
  description:
    'Los pronombres personales del portugués (eu, tu, ele, ela, nós, vocês, eles, elas) son similares al español con diferencias clave. En el portugués brasileño, "você" sustituye a "tu" en la mayoría del país, y "vocês" reemplaza a "vós". En europeo, "tu" es informal y "você" más formal.',
  lead: 'eu/tu/ele/ela/nós/vocês/eles/elas. En Brasil: "você" = tú en la práctica. En Portugal: "tu" informal, "você" formal. Los pronombres se omiten menos que en italiano pero más que en español.',
  outcomes: [
    'Identifica los pronombres personales del portugués',
    'Distingue entre el uso de tu/você en Brasil vs Portugal',
    'Sabe cuándo el pronombre puede omitirse en portugués',
  ],

  guide: {
    goal: 'Usar los pronombres personales del portugués correctamente según el registro y la variante (Brasil/Portugal).',
    model: 'Eu falo português. (Yo hablo portugués.) / Você fala inglês? (¿Usted/Tú habla/s inglés?)',
    formula: '[pronombre] + verbo conjugado',
    decisions: [
      'eu = yo | tu = tú (formal/informal según variante) | ele = él | ela = ella',
      'nós = nosotros | vocês = vosotros/ustedes | eles = ellos | elas = ellas',
      'Brasil: você = tú (informal), vocês = ustedes. Tu = muy informal o regional.',
      'Portugal: tu = tú (informal), você = usted (formal/distante)',
      'Você y vocês se conjugan en 3ª persona: você fala (no você falas)',
      'A gente = nosotros (informal, muy frecuente en Brasil, conjuga en 3ª sg)',
    ],
    table: [
      ['Pronombre', 'Equivalente', 'Brasil'],
      ['eu', 'yo', 'eu falo'],
      ['tu', 'tú (informal)', 'poco frecuente'],
      ['você', 'tú/usted', 'uso universal'],
      ['ele/ela', 'él/ella', 'ele fala'],
      ['nós / a gente', 'nosotros', 'a gente fala'],
      ['vocês', 'vosotros/ustedes', 'vocês falam'],
      ['eles/elas', 'ellos/ellas', 'eles falam'],
    ],
    mistakes: [
      '"Você fala" (3ª sg) NO "você falas" — você se conjuga como ele/ela, no como tu.',
      '"Tu" en Brasil existe pero es muy regional — en clase aprende primero "você".',
      'A gente = nosotros informal en Brasil: "a gente vai" = vamos/nosotros vamos.',
    ],
  },
  seo: [
    {
      heading: 'Pronombres personales en portugués: Brasil vs Portugal',
      paragraphs: [
        'Los pronombres del portugués parecen idénticos al español, pero hay diferencias importantes. La principal: "você" en Brasil equivale al "tú" informal del español y se usa en casi todo el país en lugar de "tu". Você se conjuga en tercera persona: "você fala" (no "você falas"). Esto sorprende al hispanohablante que espera segunda persona.',
        'En Portugal, "tu" es la forma informal (como en español) y "você" es más formal o distante. Para los cursos de portugués europeo es importante dominar la conjugación de "tu" (falas, comes, vives). Para los de portugués brasileño, la prioridad es "você" y sus conjugaciones en tercera persona.',
      ],
    },
    {
      heading: 'A gente: el nosotros informal de Brasil',
      paragraphs: [
        '"A gente" es una expresión muy frecuente en el portugués brasileño que significa "nosotros". Se conjuga siempre en tercera persona del singular: "a gente vai" = "nosotros vamos", "a gente fala" = "nosotros hablamos". En el habla cotidiana brasileña, "a gente" es más frecuente que "nós" para el registro informal.',
        'En Portugal, "a gente" también existe pero "nós" es más frecuente. Para A1 brasileño, aprende ambas formas pero practica más "a gente" para el habla natural.',
      ],
    },
  ],
  visual: {
    mode: 'pronoun-chart',
    teacherLens: 'El estudiante distingue você (Brasil) vs tu (Portugal) y entiende que você → 3ª persona.',
    graphicPrompt: 'Tabla de pronombres con columnas Brasil/Portugal. Você en 3ª sg destacado.',
    scene: [
      ['eu / tu / você', 'yo / tú / vos (según variante)'],
      ['ele / ela', 'él / ella'],
      ['nós / a gente / vocês', 'nosotros / ustedes'],
    ],
    learnerModes: ['visual: tabla Brasil vs Portugal', 'analítico: você → 3ª persona', 'oral: presentación en portugués'],
    reviewFocus: ['você → 3ª sg', 'a gente → 3ª sg', 'tu en Portugal', 'eles vs elas'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Pronombre correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el pronombre portugués correcto para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Me llamo...',
            lines: [['Carlos', '___ me chamo Carlos.']],
            options: ['Eu', 'Você', 'Ele', 'Nós'],
            answer: 'Eu',
            explain: 'Eu = yo. Primera persona singular del portugués.',
          },
          {
            scene: 'Ella habla',
            lines: [['João', 'A Zhanna fala russo — ___ é professora.']],
            options: ['ela', 'ele', 'você', 'eles'],
            answer: 'ela',
            explain: 'Ela = ella. Zhanna es femenino → ela.',
          },
          {
            scene: 'Brasil: preguntando a alguien',
            lines: [['Ana', '___ fala inglês? (contexto: Brasil, informal)']],
            options: ['Você', 'Tu', 'Ele', 'Nós'],
            answer: 'Você',
            explain: 'En Brasil, você es el pronombre estándar para "tú/usted". Conjuga en 3ª sg.',
          },
          {
            scene: 'Ellos estudian',
            lines: [['David', '___ estudam muito bem.']],
            options: ['Eles', 'Vocês', 'Nós', 'Ela'],
            answer: 'Eles',
            explain: 'Eles = ellos (masculino o mixto). Tercera persona plural.',
          },
          {
            scene: 'Nosotros aprendemos',
            lines: [['Sofia', '___ aprendemos português juntos.']],
            options: ['Nós', 'Vocês', 'Eles', 'Eu'],
            answer: 'Nós',
            explain: 'Nós = nosotros. Primera persona plural.',
          },
          {
            scene: 'Vosotros/ustedes',
            lines: [['Professor', '___ falam muito bem!']],
            options: ['Vocês', 'Nós', 'Eles', 'Você'],
            answer: 'Vocês',
            explain: 'Vocês = vosotros/ustedes. Segunda persona plural en portugués.',
          },
          {
            scene: 'Ellas son',
            lines: [['Marco', '___ são amigas da Sofia.']],
            options: ['Elas', 'Eles', 'Vocês', 'Ela'],
            answer: 'Elas',
            explain: 'Elas = ellas (femenino plural). Diferentes de eles (mixto/masculino).',
          },
          {
            scene: 'A gente (Brasil informal)',
            lines: [['Lina', '___ vai ao mercado agora. Vens? (Brasil informal)']],
            options: ['A gente', 'Nós', 'Vocês', 'Eles'],
            answer: 'A gente',
            explain: 'A gente = nosotros (informal Brasil). Conjuga en 3ª sg: a gente vai.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Pronombres en diálogo',
        tag: '2 espacios',
        intro: 'Completa los dos pronombres del diálogo.',
        type: 'dual',
        items: [
          {
            scene: 'Presentación',
            lines: [
              ['Carlos', '[[0]] me chamo Carlos. E [[1]]?'],
              ['Ana', 'Eu me chamo Ana.'],
            ],
            blanks: [
              { options: ['Eu', 'Você', 'Ele'], answer: 'Eu', explain: 'Eu = yo. Carlos se presenta.' },
              { options: ['você', 'ele', 'nós'], answer: 'você', explain: 'E você? = ¿Y tú/usted? Pronombre en Brasil.' },
            ],
          },
          {
            scene: 'Él y ella',
            lines: [['João', '[[0]] estuda medicina e [[1]] trabalha num hospital.']],
            blanks: [
              { options: ['Ele', 'Ela', 'Você'], answer: 'Ele', explain: 'Ele = él. Masculino singular.' },
              { options: ['ela', 'ele', 'você'], answer: 'ela', explain: 'Ela = ella. Femenino singular.' },
            ],
          },
          {
            scene: 'Nosotros y ellos',
            lines: [['David', '[[0]] estudamos português e [[1]] estudam inglês.']],
            blanks: [
              { options: ['Nós', 'Vocês', 'Eles'], answer: 'Nós', explain: 'Nós = nosotros. Primera plural.' },
              { options: ['eles', 'nós', 'vocês'], answer: 'eles', explain: 'Eles = ellos. Tercera plural.' },
            ],
          },
          {
            scene: 'Tú/usted y yo',
            lines: [
              ['Professor', '[[0]] fala muito bem!'],
              ['Aluno', 'Obrigado! [[1]] aprendo com você.'],
            ],
            blanks: [
              { options: ['Você', 'Tu', 'Ele'], answer: 'Você', explain: 'Você = tú/usted (Brasil). 3ª sg.' },
              { options: ['Eu', 'Você', 'Nós'], answer: 'Eu', explain: 'Eu = yo. Primera sg.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa con el pronombre correcto.',
        type: 'guidedText',
        scene: 'Apresentação de uma turma de português',
        text: '[[0]] me chamo David e sou professor de português. A Zhanna é a codirectora — [[1]] é de origem ucraniana. [[2]] trabalhamos juntos na WeLearn. Os alunos são muito motivados — [[3]] estudam todos os dias. E [[4]], de onde você é?',
        blanks: [
          { options: ['Eu', 'Ele', 'Você'], answer: 'Eu', explain: 'Eu = yo. David se presenta.' },
          { options: ['ela', 'ele', 'você'], answer: 'ela', explain: 'Ela = ella. Habla de Zhanna.' },
          { options: ['Nós', 'Vocês', 'Eles'], answer: 'Nós', explain: 'Nós = nosotros. David y Zhanna.' },
          { options: ['eles', 'nós', 'você'], answer: 'eles', explain: 'Eles = ellos. Los alumnos (masculino/mixto).' },
          { options: ['você', 'ele', 'ela'], answer: 'você', explain: 'Você = tú/usted. Pregunta al oyente.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe el pronombre correcto sin opciones.',
        type: 'freeText',
        scene: 'Conversação entre estudantes',
        text: '[[0]] me chamo Sofia. [[1]] e a Ana somos amigas. [[2]] estuda inglês e [[3]] estudo português. O professor se chama David — [[4]] é muito bom. Os alunos gostam das aulas — [[5]] aprendem muito.',
        blanks: [
          { answer: 'Eu', accepted: ['eu'], explain: 'Eu = yo. Sofia se presenta.' },
          { answer: 'Eu', accepted: ['eu'], explain: 'Eu e a Ana = yo y Ana. Primera sg.' },
          { answer: 'ela', explain: 'Ela = ella. La Ana.' },
          { answer: 'eu', explain: 'Eu estudo. Primera sg.' },
          { answer: 'ele', explain: 'Ele = él. El profesor David.' },
          { answer: 'eles', accepted: ['elas', 'eles'], explain: 'Eles/elas = ellos/ellas. Los alumnos.' },
        ],
      },
      {
        id: 'l5',
        title: 'Traducción de pronombres',
        tag: 'Producción',
        intro: 'Escribe la frase en portugués con el pronombre indicado.',
        type: 'write',
        items: [
          {
            scene: 'Me llamo...',
            prompt: 'Escribe: Me llamo Carlos. → ___ me chamo Carlos.',
            answer: 'Eu me chamo Carlos.',
            accepted: ['eu me chamo carlos', 'eu me chamo carlos.'],
            explain: 'Eu = yo. Primera persona singular.',
          },
          {
            scene: 'Ella es profesora',
            prompt: 'Escribe: Ella es profesora. → ___ é professora.',
            answer: 'Ela é professora.',
            accepted: ['ela é professora', 'ela é professora.'],
            explain: 'Ela = ella. Femenino singular.',
          },
          {
            scene: 'Nosotros estudiamos',
            prompt: 'Escribe: Nosotros estudiamos portugués. → ___ estudamos português.',
            answer: 'Nós estudamos português.',
            accepted: ['nós estudamos português', 'nós estudamos português.'],
            explain: 'Nós = nosotros. Primera persona plural.',
          },
          {
            scene: 'Ellas trabajan',
            prompt: 'Escribe: Ellas trabajan mucho. → ___ trabalham muito.',
            answer: 'Elas trabalham muito.',
            accepted: ['elas trabalham muito', 'elas trabalham muito.'],
            explain: 'Elas = ellas. Femenino plural.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Preséntate y presenta a tu grupo en portugués.',
        type: 'write',
        items: [
          {
            scene: 'Presentación personal',
            prompt: 'Eu me chamo ___. ___ sou de ___. ___ estudo ___ na WeLearn.',
            answer: 'Eu me chamo Sofia. Eu sou de Madrid. Eu estudo português na WeLearn.',
            accepted: ['eu me chamo sofia eu sou de madrid eu estudo português na welearn', 'eu me chamo carlos eu sou de bogotá eu estudo português'],
            explain: 'Eu para todas las primeras personas: me chamo, sou, estudo.',
          },
          {
            scene: 'Tu compañero',
            prompt: 'O meu amigo/A minha amiga ___ é de ___. ___ estuda ___.',
            answer: 'O meu amigo se chama Marco. Ele é de Roma. Ele estuda italiano.',
            accepted: ['o meu amigo se chama marco ele é de roma ele estuda italiano', 'a minha amiga se chama sofia ela é de madrid ela estuda português'],
            explain: 'Ele/ela para tercera persona. Conjugación en 3ª sg.',
          },
          {
            scene: 'Vuestra clase',
            prompt: 'Nós estudamos ___. ___ somos de ___. O professor ___ muito bom.',
            answer: 'Nós estudamos português. Nós somos de vários países. O professor é muito bom.',
            accepted: ['nós estudamos português nós somos de vários países o professor é muito bom'],
            explain: 'Nós para primera plural. O professor (ele) → é.',
          },
        ],
      },
    ],
  },
}

export default topic
