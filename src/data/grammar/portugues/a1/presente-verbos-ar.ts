import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'presente-verbos-ar',
  order: '06',
  color: '#059669',
  category: 'Verbos',
  level: 'A1',
  title: 'Presente dos Verbos -ar en portugués A1 — Primera conjugación',
  shortTitle: 'Presente -ar',
  metaTitle: 'Presente verbos -ar português A1 — falar estudar trabalhar conjugação',
  description:
    'Los verbos en -ar forman la primera conjugación del portugués. En presente: -o, -as, -a, -amos, -am. Son verbos esenciales: falar (hablar), estudar (estudiar), trabalhar (trabajar), morar (vivir/residir), comprar (comprar). Con estas 5 terminaciones puedes expresar la mayoría de las acciones cotidianas.',
  lead: 'Verbos -ar en presente: -o/-as/-a/-amos/-am. Falar → falo/falas/fala/falamos/falam. Nota: você/ele/ela comparten la misma forma (-a) y vocês/eles/elas comparten -am.',
  outcomes: [
    'Conjuga verbos regulares en -ar en presente para todos los sujetos',
    'Usa verbos frecuentes: falar, estudar, trabalhar, morar, comprar',
    'Construye frases negativas con não + verbo en portugués',
  ],

  guide: {
    goal: 'Conjugar verbos regulares en -ar en presente indicativo del portugués A1.',
    model: 'falar → falo, falas, fala, falamos, falam',
    formula: 'radical + -o / -as / -a / -amos / -am',
    decisions: [
      'eu → -o: falo, estudo, trabalho, moro',
      'tu → -as: falas, estudas (Portugal)',
      'ele/ela/você → -a: fala, estuda, trabalha',
      'nós → -amos: falamos, estudamos, trabalhamos',
      'eles/elas/vocês → -am: falam, estudam, trabalham',
      'Brasil: você/ele/ela → -a (misma forma); vocês/eles/elas → -am',
      'Negación: não + verbo: Não falo inglês. Ela não trabalha hoje.',
    ],
    table: [
      ['Sujeto', 'Terminación', 'falar'],
      ['eu', '-o', 'falo'],
      ['tu', '-as', 'falas'],
      ['ele/ela/você', '-a', 'fala'],
      ['nós', '-amos', 'falamos'],
      ['eles/vocês', '-am', 'falam'],
    ],
    mistakes: [
      '"Eles falas" ✗ → "Eles falam". Tercera plural: -am.',
      '"Você falas" ✗ → "Você fala". Você → -a (3ª sg, no -as de tu).',
      '"A gente falamos" ✗ → "A gente fala". A gente siempre 3ª sg.',
    ],
  },
  seo: [
    {
      heading: 'Los verbos -ar: la conjugación más usada del portugués',
      paragraphs: [
        'Los verbos de la primera conjugación (-ar) son los más numerosos y regulares del portugués. Con el patrón -o/-as/-a/-amos/-am puedes conjugar cientos de verbos esenciales: falar (hablar), estudar (estudiar), trabalhar (trabajar), morar (vivir), comprar (comprar), escutar (escuchar), gostar (gustar), viajar (viajar).',
        'Para el hispanohablante la conjugación es muy similar a la del español (-o/-as/-a/-amos/-an), con una diferencia: la 3ª persona plural es -am (no -an). "Eles falam" = "Ellos hablan". Esta terminación -am es nasalizada en el portugués europeo.',
      ],
    },
    {
      heading: 'Você: tercera persona singular',
      paragraphs: [
        'En Brasil, "você" es el pronombre de 2ª persona más usado pero se conjuga como 3ª persona singular: você fala (no "você falas"). Esto significa que ele, ela y você comparten la misma terminación -a. Solo el contexto y el pronombre explícito aclaran quién habla.',
        '"A gente" (nosotros informal) también toma la forma -a: a gente fala = nosotros hablamos. Esto da lugar a que -a sea la terminación más frecuente en el habla brasileña: ele fala, ela fala, você fala, a gente fala.',
      ],
    },
    {
      heading: 'Negación en portugués: não + verbo',
      paragraphs: [
        'Para negar en portugués se añade "não" antes del verbo: Eu não falo inglês (No hablo inglés), Ela não trabalha hoje (Ella no trabaja hoy). A diferencia del español, donde a veces la negación va después de ciertos verbos modales, en portugués "não" siempre precede al verbo conjugado.',
        'En el portugués brasileño coloquial, a veces la negación aparece al final: "Falo não" pero en A1 es mejor aprender la forma estándar: não + verbo.',
      ],
    },
  ],
  visual: {
    mode: 'verb-conjugation',
    teacherLens: 'El estudiante aprende -o/-as/-a/-amos/-am y entiende que você → -a como ele/ela.',
    graphicPrompt: 'Tabla conjugación -ar. Você → -a resaltado. Negación com não.',
    scene: [
      ['-o / -as / -a', 'eu / tu / ele-ela-você'],
      ['-amos / -am', 'nós / eles-vocês'],
      ['não + verbo', 'negação'],
    ],
    learnerModes: ['visual: tabla conjugación', 'analítico: você → 3ª sg', 'oral: rutina diaria'],
    practiceVerbs: ['falar', 'estudar', 'trabalhar', 'morar', 'comprar', 'escutar'],
    reviewFocus: ['-am (no -an)', 'você fala (no falas)', 'a gente fala (no falamos)', 'não antes del verbo'],
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
            scene: 'Yo hablo',
            lines: [['Carlos', 'Eu ___ português e espanhol. (falar)']],
            options: ['falo', 'falas', 'fala', 'falam'],
            answer: 'falo',
            explain: 'Eu + -o: falo. Primera persona singular.',
          },
          {
            scene: 'Ella estudia',
            lines: [['Sofia', 'A Zhanna ___ português em casa. (estudar)']],
            options: ['estuda', 'estudo', 'estudas', 'estudam'],
            answer: 'estuda',
            explain: 'Ela + -a: estuda. Tercera persona singular.',
          },
          {
            scene: 'Nosotros trabajamos',
            lines: [['David', 'Nós ___ juntos na WeLearn. (trabalhar)']],
            options: ['trabalhamos', 'trabalham', 'trabalha', 'trabalho'],
            answer: 'trabalhamos',
            explain: 'Nós + -amos: trabalhamos. Primera persona plural.',
          },
          {
            scene: 'Ellos hablan',
            lines: [['Ana', 'Os alunos ___ muito bem em português. (falar)']],
            options: ['falam', 'fala', 'falamos', 'falas'],
            answer: 'falam',
            explain: 'Eles + -am: falam. Tercera persona plural.',
          },
          {
            scene: 'Você trabaja',
            lines: [['Lina', 'Você ___ muito, não é? (trabalhar)']],
            options: ['trabalha', 'trabalhas', 'trabalho', 'trabalham'],
            answer: 'trabalha',
            explain: 'Você → -a (3ª sg). Não "trabalhas" (eso sería tu en Portugal).',
          },
          {
            scene: 'Yo vivo en',
            lines: [['Marco', 'Eu ___ no Rio de Janeiro. (morar)']],
            options: ['moro', 'mora', 'moras', 'moram'],
            answer: 'moro',
            explain: 'Eu + -o: moro. Primera persona singular.',
          },
          {
            scene: 'Negación',
            lines: [['Ana', 'Eu ___ inglês. Só falo português. (não falar)']],
            options: ['não falo', 'não falas', 'falo não', 'nao falo'],
            answer: 'não falo',
            explain: 'Negación: não + verbo. Não falo inglês.',
          },
          {
            scene: 'A gente (Brasil)',
            lines: [['Sofia', 'A gente ___ português na WeLearn. (estudar)']],
            options: ['estuda', 'estudamos', 'estudam', 'estudo'],
            answer: 'estuda',
            explain: 'A gente + -a (3ª sg). No "estudamos" con a gente.',
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
            scene: '¿Qué estudias?',
            lines: [
              ['Ana', 'Você [[0]] português? (estudar)'],
              ['Carlos', 'Sim! E também [[1]] um pouco de inglês. (estudar)'],
            ],
            blanks: [
              { options: ['estuda', 'estudas', 'estudo'], answer: 'estuda', explain: 'Você + -a: estuda.' },
              { options: ['estudo', 'estuda', 'estudam'], answer: 'estudo', explain: 'Eu + -o: estudo.' },
            ],
          },
          {
            scene: 'Habla y trabaja',
            lines: [['David', 'Eu [[0]] oito línguas e [[1]] como professor. (falar / trabalhar)']],
            blanks: [
              { options: ['falo', 'fala', 'falam'], answer: 'falo', explain: 'Eu + -o: falo.' },
              { options: ['trabalho', 'trabalha', 'trabalham'], answer: 'trabalho', explain: 'Eu + -o: trabalho.' },
            ],
          },
          {
            scene: 'Ellos y nosotros',
            lines: [['Sofia', 'Eles [[0]] em São Paulo e nós [[1]] no Rio. (morar)']],
            blanks: [
              { options: ['moram', 'mora', 'moramos'], answer: 'moram', explain: 'Eles + -am: moram.' },
              { options: ['moramos', 'moram', 'mora'], answer: 'moramos', explain: 'Nós + -amos: moramos.' },
            ],
          },
          {
            scene: 'Negación y afirmación',
            lines: [['Marco', 'Eu [[0]] inglês mas [[1]] muito bem espanhol. (não falar / falar)']],
            blanks: [
              { options: ['não falo', 'falo', 'não fala'], answer: 'não falo', explain: 'Negación: não + falo.' },
              { options: ['falo', 'falas', 'falam'], answer: 'falo', explain: 'Afirmativo: eu + -o: falo.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Conjuga los verbos para completar la presentación.',
        type: 'guidedText',
        scene: 'Apresentação de David na WeLearn',
        text: 'Eu me chamo David e [[0]] (trabalhar) na WeLearn. Eu [[1]] (falar) oito idiomas. Os meus alunos [[2]] (estudar) muito — eles [[3]] (gostar) de aprender línguas. Zhanna e eu [[4]] (trabalhar) juntos. A gente [[5]] (usar) métodos modernos. Você [[6]] (gostar) de aprender português?',
        blanks: [
          { options: ['trabalho', 'trabalha', 'trabalham'], answer: 'trabalho', explain: 'Eu + -o: trabalho.' },
          { options: ['falo', 'fala', 'falam'], answer: 'falo', explain: 'Eu + -o: falo.' },
          { options: ['estudam', 'estuda', 'estudamos'], answer: 'estudam', explain: 'Os alunos (eles) + -am: estudam.' },
          { options: ['gostam', 'gosta', 'gostamos'], answer: 'gostam', explain: 'Eles + -am: gostam.' },
          { options: ['trabalhamos', 'trabalham', 'trabalha'], answer: 'trabalhamos', explain: 'Nós (Zhanna e eu) + -amos: trabalhamos.' },
          { options: ['usa', 'usamos', 'usam'], answer: 'usa', explain: 'A gente + -a (3ª sg): usa.' },
          { options: ['gosta', 'gostas', 'gostam'], answer: 'gosta', explain: 'Você + -a: gosta.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Conjuga el verbo sin opciones.',
        type: 'freeText',
        scene: 'Estudantes de português no Brasil',
        text: 'Eu [[0]] (estudar) português há seis meses. A minha professora [[1]] (falar) muito bem. Os meus colegas [[2]] (estudar) todos os dias. Nós [[3]] (gostar) muito das aulas. Você [[4]] (morar) no Brasil? Eles [[5]] (trabalhar) e [[6]] (estudar) ao mesmo tempo.',
        blanks: [
          { answer: 'estudo', explain: 'Eu + -o: estudo.' },
          { answer: 'fala', explain: 'A professora (ela) + -a: fala.' },
          { answer: 'estudam', explain: 'Os colegas (eles) + -am: estudam.' },
          { answer: 'gostamos', explain: 'Nós + -amos: gostamos.' },
          { answer: 'mora', explain: 'Você + -a: mora.' },
          { answer: 'trabalham', explain: 'Eles + -am: trabalham.' },
          { answer: 'estudam', explain: 'Eles + -am: estudam.' },
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
            scene: 'Yo hablo',
            prompt: 'Escribe: Yo hablo portugués y español. → Eu ___ português e espanhol. (falar)',
            answer: 'Eu falo português e espanhol.',
            accepted: ['eu falo português e espanhol', 'eu falo português e espanhol.'],
            explain: 'Eu + -o: falo. Primera persona singular de falar.',
          },
          {
            scene: 'Ellos estudian',
            prompt: 'Escribe: Ellos estudian todos los días. → Eles ___ todos os dias. (estudar)',
            answer: 'Eles estudam todos os dias.',
            accepted: ['eles estudam todos os dias', 'eles estudam todos os dias.'],
            explain: 'Eles + -am: estudam. Tercera plural de estudar.',
          },
          {
            scene: 'No hablo inglés',
            prompt: 'Escribe: No hablo inglés. → Eu ___ inglês. (não falar)',
            answer: 'Eu não falo inglês.',
            accepted: ['eu não falo inglês', 'eu não falo inglês.'],
            explain: 'Negación: não + falo. Não antes del verbo.',
          },
          {
            scene: 'Nosotros vivimos',
            prompt: 'Escribe: Nosotros vivimos en Brasil. → Nós ___ no Brasil. (morar)',
            answer: 'Nós moramos no Brasil.',
            accepted: ['nós moramos no brasil', 'nós moramos no brasil.'],
            explain: 'Nós + -amos: moramos. Primera plural de morar.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Describe tu rutina en portugués usando verbos -ar.',
        type: 'write',
        items: [
          {
            scene: 'Tu rutina',
            prompt: 'Eu ___ (trabalhar/estudar) ___. Eu ___ (morar) em ___. Eu ___ (falar) ___.',
            answer: 'Eu estudo português. Eu moro em Bogotá. Eu falo espanhol e português.',
            accepted: ['eu estudo português eu moro em bogotá eu falo espanhol e português'],
            explain: 'Eu + -o: estudo, moro, falo. Primera singular de verbos -ar.',
          },
          {
            scene: 'Tu compañero',
            prompt: 'O meu amigo/A minha amiga ___ (trabalhar/estudar) ___. Ele/Ela ___ (falar) ___.',
            answer: 'O meu amigo estuda medicina. Ele fala inglês e espanhol.',
            accepted: ['o meu amigo estuda medicina ele fala inglês e espanhol'],
            explain: 'Ele/ela + -a: estuda, fala. Tercera singular.',
          },
          {
            scene: 'Vuestra clase',
            prompt: 'Nós ___ (estudar) português. ___ (falar) em ___. Os alunos ___ (gostar) das aulas.',
            answer: 'Nós estudamos português. Falamos em português. Os alunos gostam das aulas.',
            accepted: ['nós estudamos português falamos em português os alunos gostam das aulas'],
            explain: 'Nós + -amos: estudamos, falamos. Eles + -am: gostam.',
          },
        ],
      },
    ],
  },
}

export default topic
