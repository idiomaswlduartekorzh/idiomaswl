import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'condicional-a2',
  order: '11',
  color: '#166534',
  category: 'Verbos',
  level: 'A2',
  title: 'O Condicional (Futuro do Pretérito) em Português A2',
  shortTitle: 'Condicional',
  metaTitle: 'Condicional português A2 — gostaria, poderia, seria, futuro do pretérito',
  description:
    'El condicional en portugués (futuro do pretérito) se usa para expresar cortesía, hipótesis y situaciones imaginadas. Las formas más frecuentes son gostaria (me gustaría), poderia (podría) y seria (sería). Se forma añadiendo las terminaciones -ia, -ias, -ia, -íamos, -iam al infinitivo.',
  lead: '"Gostaria de um café" = me gustaría un café. "Poderia me ajudar?" = ¿Podría ayudarme? El condicional es la forma más cortés y sofisticada del portugués.',
  outcomes: [
    'Forma el condicional de los verbos regulares añadiendo -ia al infinitivo',
    'Usa gostaria, poderia y seria como formas de cortesía y deseo',
    'Construye frases hipotéticas con "se + imperfeito do subjuntivo"',
    'Distingue el condicional del pretérito imperfeito en contextos de solicitud',
  ],

  guide: {
    goal: 'Usar el condicional para expresar cortesía, deseos y situaciones hipotéticas en portugués.',
    model: 'Eu gostaria de visitar o Brasil. / Você poderia me ajudar? / Seria ótimo se você viesse.',
    formula: 'Infinitivo + -ia/-ias/-ia/-íamos/-iam (mismo para todos los verbos)',
    decisions: [
      '"Gostaria de" = me gustaría + infinitivo. "Eu gostaria de conhecer o Rio de Janeiro."',
      '"Poderia" = podría. "Você poderia me dizer a hora?" / "Poderia repetir, por favor?"',
      '"Seria" = sería. "Seria incrível se eu falasse português fluentemente."',
      'Hipótesis: "Se eu tivesse dinheiro, viajaria pelo mundo." (Si + imperfeito subj. + condicional)',
      'En Brasil coloquial, el condicional a veces se reemplaza por el imperfeito: "Queria = Gostaria", "Podia = Poderia".',
    ],
    table: [
      ['Sujeto', 'Condicional de falar', 'Condicional de ser'],
      ['eu', 'falaria', 'seria'],
      ['tu/você', 'falarias/falaria', 'serias/seria'],
      ['ele/ela', 'falaria', 'seria'],
      ['nós', 'falaríamos', 'seríamos'],
      ['vocês/eles', 'falariam', 'seriam'],
    ],
    mistakes: [
      '"Eu gostarei de café" ✗ → "Eu gostaria de café" ✓. El futuro simple no expresa cortesía igual que el condicional.',
      '"Poder + ia = Podia" es la forma del imperfeito; "Poderia" es el condicional. Ambas expresan cortesía en Brasil.',
      'La terminación -ía/-íamos siempre lleva acento escrito: gostaria, poderíamos, falaríamos.',
      '"Eu gostaria ir" ✗ → "Eu gostaria de ir" ✓. Con infinitivo siempre usa la preposición "de".',
    ],
  },

  seo: [
    {
      heading: 'El condicional en portugués: cortesía e hipótesis',
      paragraphs: [
        'El futuro do pretérito, también llamado condicional simple, es el tiempo verbal que en portugués expresa acciones hipotéticas, deseos y solicitudes educadas. Su formación es sorprendentemente sencilla: se añaden las terminaciones -ia, -ias, -ia, -íamos, -iam directamente al infinitivo de cualquier verbo. Ejemplos: falar → falaria, comer → comeria, partir → partiria.',
        'Las tres formas más útiles para el nivel A2 son: gostaria (me gustaría), poderia (podría) y seria (sería). Estas formas aparecen constantemente en situaciones de cortesía, en solicitudes, en hoteles, restaurantes y conversaciones formales: "Gostaria de fazer uma reserva" / "Poderia repetir mais devagar?"',
      ],
    },
    {
      heading: 'Cortesía con el condicional: gostaria y poderia',
      paragraphs: [
        '"Gostaria de + infinitivo" es la forma más elegante de expresar un deseo o una preferencia: "Eu gostaria de uma mesa perto da janela" / "Nós gostaríamos de reservar dois quartos." En el habla coloquial brasileña, esta función la cumple el imperfeito "queria": "Queria um café" tiene la misma función que "Gostaria de um café".',
        '"Poderia + infinitivo" es la forma cortés de pedir algo: "Você poderia falar mais devagar?" / "Poderia me dar o cardápio?" En el habla coloquial, "podia" reemplaza a "poderia": "Podia me ajudar?" Es igualmente correcto en situaciones informales.',
      ],
    },
    {
      heading: 'Hipótesis con si + condicional',
      paragraphs: [
        'La estructura hipotética más común en portugués es: "Se + imperfeito do subjuntivo + condicional": "Se eu tivesse dinheiro, viajaria pelo mundo" (Si tuviera dinero, viajaría por el mundo). En el habla coloquial brasileña, esta estructura se simplifica frecuentemente: "Se eu tivesse dinheiro, viajava" (usando imperfeito en lugar del condicional).',
        'Para el nivel A2, es suficiente reconocer esta estructura y practicar las formas más frecuentes. La producción activa puede limitarse a gostaria, poderia, seria y las formas de 1ª persona singular.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende a usar el condicional para expresar cortesía, deseo e hipótesis.',
    graphicPrompt: 'Situaciones de cortesía en hotel, restaurante y conversaciones formales.',
    scene: [
      ['Eu gostaria de reservar uma mesa.', 'Me gustaría reservar una mesa.'],
      ['Você poderia falar mais devagar?', '¿Podría hablar más despacio?'],
      ['Seria ótimo conhecer o Brasil.', 'Sería genial conocer Brasil.'],
      ['Nós gostaríamos de um quarto duplo.', 'Nos gustaría una habitación doble.'],
      ['O que você faria com um milhão?', '¿Qué harías con un millón?'],
      ['Se eu pudesse, viajaria pelo mundo.', 'Si pudiera, viajaría por el mundo.'],
      ['Eles prefeririam ficar em casa.', 'Ellos preferirían quedarse en casa.'],
      ['Poderia me dar o cardápio, por favor?', '¿Podría darme el menú, por favor?'],
    ],
    learnerModes: ['cortesía: gostaria/poderia', 'deseo: gostaria de + inf.', 'hipótesis: se... + condicional'],
    reviewFocus: ['gostaria de', 'poderia + inf.', 'formación: infinitivo + -ia', 'hipótesis com se'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el condicional correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma condicional correcta para completar cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'El restaurante',
            lines: [['Ana', 'Eu ___ de uma mesa para dois, por favor.']],
            options: ['gostaria', 'gosto', 'gostei', 'gostarei'],
            answer: 'gostaria',
            explain: '"Gostaria de" = me gustaría. Condicional de gostar: gostaria.',
          },
          {
            scene: 'La solicitud',
            lines: [['Carlos', 'Você ___ repetir mais devagar, por favor?']],
            options: ['poderia', 'pode', 'pôde', 'poderá'],
            answer: 'poderia',
            explain: '"Poderia + infinitivo" = ¿Podría...? Condicional de poder: poderia.',
          },
          {
            scene: 'El hotel',
            lines: [['Pedro', 'Nós ___ de um quarto com vista para o mar.']],
            options: ['gostaríamos', 'gostamos', 'gostávamos', 'gostaremos'],
            answer: 'gostaríamos',
            explain: '"Gostaríamos de" = nos gustaría. Condicional de gostar, nós: gostaríamos.',
          },
          {
            scene: 'La hipótesis',
            lines: [['Maria', 'Se eu tivesse tempo, ___ mais.']],
            options: ['estudaria', 'estudo', 'estudei', 'estudarei'],
            answer: 'estudaria',
            explain: '"Estudaria" = condicional de estudar. Hipótesis: se tivesse tempo, estudaria.',
          },
          {
            scene: 'La preferencia',
            lines: [['Diego', 'Eles ___ ficar em casa a ir à festa.']],
            options: ['prefeririam', 'preferem', 'preferiram', 'preferirão'],
            answer: 'prefeririam',
            explain: '"Prefeririam" = condicional de preferir. Eles prefeririam = ellos preferirían.',
          },
          {
            scene: 'El viaje',
            lines: [['Marta', '___ incrível poder visitar o Japão.']],
            options: ['Seria', 'É', 'Foi', 'Será'],
            answer: 'Seria',
            explain: '"Seria" = condicional de ser. Sería increíble visitar Japón.',
          },
          {
            scene: 'La opinión',
            lines: [['Lina', 'Você ___ de deixar seu número de telefone?']],
            options: ['poderia', 'pode', 'pôde', 'poderá'],
            answer: 'poderia',
            explain: '"Poderia de" = ¿podría...? Cortesía máxima en portugués formal.',
          },
          {
            scene: 'El sueño',
            lines: [['Sofia', 'O que você ___ se ganhasse na loteria?']],
            options: ['faria', 'faz', 'fez', 'fará'],
            answer: 'faria',
            explain: '"Faria" = condicional de fazer. Hipótesis: o que você faria? (¿qué harías?).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos formas condicionales',
        tag: '2 espacios',
        intro: 'Completa las oraciones con las formas condicionales correctas.',
        type: 'dual',
        items: [
          {
            scene: 'El hotel',
            lines: [['Ana', 'Eu [[0]] (gostar) de um quarto duplo e [[1]] (preferir) um andar alto.']],
            blanks: [
              { options: ['gostaria', 'gosto', 'gostei'], answer: 'gostaria', explain: '"Gostaria de" = me gustaría. Condicional de gostar.' },
              { options: ['preferiria', 'prefiro', 'preferi'], answer: 'preferiria', explain: '"Preferiria" = preferiría. Condicional de preferir.' },
            ],
          },
          {
            scene: 'La ayuda',
            lines: [['Carlos', 'Você [[0]] (poder) me ajudar? Eu [[1]] (agradecer) muito.']],
            blanks: [
              { options: ['poderia', 'pode', 'pôde'], answer: 'poderia', explain: '"Poderia me ajudar?" = ¿Podría ayudarme? Condicional de poder.' },
              { options: ['agradeceria', 'agradeço', 'agradeci'], answer: 'agradeceria', explain: '"Agradeceria" = agradecería. Condicional de agradecer.' },
            ],
          },
          {
            scene: 'La hipótesis',
            lines: [['Pedro', 'Se eu [[0]] (ganhar) na loteria, eu [[1]] (viajar) pelo mundo inteiro.']],
            blanks: [
              { options: ['ganhasse', 'ganhei', 'ganho'], answer: 'ganhasse', explain: '"Ganhasse" = imperfeito do subjuntivo. Usado en cláusula hipotética con "se".' },
              { options: ['viajaria', 'viajo', 'viajei'], answer: 'viajaria', explain: '"Viajaria" = condicional de viajar. Resultado de la hipótesis.' },
            ],
          },
          {
            scene: 'El deseo',
            lines: [['Maria', 'Nós [[0]] (gostar) de morar em Portugal e [[1]] (poder) aprender mais sobre a cultura.']],
            blanks: [
              { options: ['gostaríamos', 'gostamos', 'gostaríamos'], answer: 'gostaríamos', explain: '"Gostaríamos de" = nos gustaría. Nós + condicional de gostar.' },
              { options: ['poderíamos', 'podemos', 'pudemos'], answer: 'poderíamos', explain: '"Poderíamos" = podríamos. Nós + condicional de poder.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Reservando en un hotel',
        tag: 'Texto guiado',
        intro: 'Elige la forma condicional correcta para completar esta conversación en un hotel.',
        type: 'guidedText',
        scene: 'Conversación de reserva en un hotel de Lisboa',
        text: 'Boa tarde! Eu [[0]] de fazer uma reserva para o fim de semana. [[1]] dois quartos, se possível. Um [[2]] ser com vista para o mar. Você [[3]] nos dizer quais quartos estão disponíveis? Também [[4]] saber o preço total com café da manhã incluído.',
        blanks: [
          { options: ['gostaria', 'gosto', 'gostei'], answer: 'gostaria', explain: '"Gostaria de fazer uma reserva" = me gustaría hacer una reserva. Cortesía.' },
          { options: ['Precisaria', 'Preciso', 'Precisarei'], answer: 'Precisaria', explain: '"Precisaria de" = necesitaría. Condicional de precisar.' },
          { options: ['poderia', 'pode', 'poderá'], answer: 'poderia', explain: '"Poderia ser" = podría ser. Condicional de poder.' },
          { options: ['poderia', 'pode', 'poderá'], answer: 'poderia', explain: '"Você poderia nos dizer?" = ¿podría decirnos? Solicitud cortés.' },
          { options: ['gostaria de', 'gosto de', 'gostei de'], answer: 'gostaria de', explain: '"Gostaria de saber" = me gustaría saber. Condicional de gostar.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el condicional',
        tag: 'Texto libre',
        intro: 'Escribe la forma condicional del verbo entre paréntesis.',
        type: 'freeText',
        scene: 'Sueños y planes hipotéticos',
        text: 'Se eu [[0]] (poder) escolher qualquer profissão, [[1]] (ser) músico. [[2]] (viajar) pelo mundo, [[3]] (conhecer) culturas diferentes e [[4]] (aprender) vários idiomas.',
        blanks: [
          { answer: 'pudesse', explain: '"Pudesse" = imperfeito do subjuntivo de poder. En cláusula hipotética con "se".' },
          { answer: 'seria', explain: '"Seria" = condicional de ser. Resultado hipotético.' },
          { answer: 'Viajaria', explain: '"Viajaria" = condicional de viajar. Acción hipotética.' },
          { answer: 'conheceria', explain: '"Conheceria" = condicional de conhecer.' },
          { answer: 'aprenderia', explain: '"Aprenderia" = condicional de aprender.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Formula solicitudes corteses',
        tag: 'Escritura guiada',
        intro: 'Transforma la solicitud directa en una solicitud cortés usando el condicional.',
        type: 'write',
        items: [
          {
            scene: 'En el restaurante',
            prompt: 'Transforma en cortés: "Quero uma mesa para dois." → Eu ___ de uma mesa para dois.',
            answer: 'Eu gostaria de uma mesa para dois.',
            accepted: ['eu gostaria de uma mesa para dois', 'gostaria de uma mesa para dois'],
            explain: '"Gostaria de" = me gustaría. Forma de cortesía con condicional.',
          },
          {
            scene: 'La solicitud',
            prompt: 'Transforma en cortés: "Pode repetir?" → Você ___ repetir, por favor?',
            answer: 'Você poderia repetir, por favor?',
            accepted: ['você poderia repetir por favor', 'poderia repetir por favor'],
            explain: '"Poderia" = ¿podría? Solicitud cortés con condicional de poder.',
          },
          {
            scene: 'El deseo',
            prompt: 'Expresa un deseo: Me gustaría visitar Portugal → Eu ___ de visitar Portugal.',
            answer: 'Eu gostaria de visitar Portugal.',
            accepted: ['eu gostaria de visitar portugal', 'gostaria de visitar portugal'],
            explain: '"Gostaria de + infinitivo" para expresar deseo con cortesía.',
          },
          {
            scene: 'La hipótesis',
            prompt: 'Escribe: Si tuviera más tiempo, estudiaría más. → Se eu tivesse mais tempo, ___.',
            answer: 'Se eu tivesse mais tempo, estudaria mais.',
            accepted: ['se eu tivesse mais tempo estudaria mais', 'estudaria mais'],
            explain: '"Se + imperfeito do subjuntivo + condicional": tivesse → estudaria.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Expresa deseos e hipótesis',
        tag: 'Escritura libre',
        intro: 'Escribe sobre tus deseos y situaciones hipotéticas usando el condicional.',
        type: 'write',
        items: [
          {
            scene: 'Tu sueño',
            prompt: 'Escribe dos cosas que te gustarían hacer usando "gostaria de + infinitivo".',
            answer: 'Eu gostaria de morar no Brasil e aprender a tocar violão.',
            accepted: ['gostaria de', 'gostaria de morar', 'gostaria de aprender', 'gostaria de visitar'],
            explain: '"Eu gostaria de + infinitivo": gostaria de morar, aprender, conhecer, viajar.',
          },
          {
            scene: 'Una situación de servicio',
            prompt: 'Imagina que estás en un hotel. Escribe dos solicitudes usando "poderia" y "gostaria".',
            answer: 'Gostaria de um quarto no andar mais alto. Você poderia me trazer uma toalha extra?',
            accepted: ['gostaria de', 'poderia', 'gostaria de um', 'você poderia'],
            explain: 'Usa: gostaria de + sustantivo y poderia + infinitivo para solicitudes corteses.',
          },
          {
            scene: 'Una hipótesis',
            prompt: 'Completa la hipótesis: "Se eu pudesse, ___." Escribe qué harías.',
            answer: 'Se eu pudesse, viajaria para o Japão e aprenderia japonês.',
            accepted: ['viajaria', 'moraria', 'estudaria', 'compraria', 'seria', 'faria', 'poderia'],
            explain: '"Se eu pudesse, + condicional": viajaria, moraria, estudaria, compraria, seria.',
          },
        ],
      },
    ],
  },
}

export default topic
