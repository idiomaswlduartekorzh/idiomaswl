import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'discurso-indireto-b1',
  order: '04',
  color: '#166534',
  category: 'Estrutura',
  level: 'B1',
  title: 'Discurso Indireto en Portugués B1',
  shortTitle: 'Discurso Indireto',
  metaTitle: 'Discurso Indireto Portugués B1 — Estilo Indirecto Portugués',
  description:
    'El discurso indirecto (estilo indirecto) en portugués transforma lo que alguien dijo en una oración subordinada. Los tiempos verbales cambian de forma sistemática: el presente pasa a imperfeito, el futuro pasa a condicional, el pretérito perfeito pasa a mais-que-perfeito. Los pronombres, demostrativos y expresiones de tiempo también se adaptan al punto de vista del narrador.',
  lead: 'Aprende a reportar lo que alguien dijo en portugués: los cambios de tiempo verbal, pronombres y expresiones de tiempo en el discurso indirecto.',
  outcomes: [
    'Convierte oraciones en estilo directo a estilo indirecto usando verbos introductores',
    'Aplica los cambios de tiempo verbal: presente→imperfeito, futuro→condicional, perfeito→mais-que-perfeito',
    'Adapta pronombres y expresiones de tiempo en el discurso indirecto',
    'Usa verbos introductores apropiados: dizer, afirmar, perguntar, pedir, explicar',
  ],

  guide: {
    goal: 'Transformar el discurso directo en indirecto con los cambios de tiempo verbal, pronombres y referencias temporales correctos.',
    model: '"Vou chegar tarde." → Ele disse que chegaria tarde.',
    formula: 'Verbo introdutor + que + oración subordinada (con tiempo verbal adaptado)',
    decisions: [
      'Verbo introdutor en pasado → todos los tiempos de la cita se retroceden un grado',
      'Presente → imperfeito: "Estou cansada." → Disse que estava cansada.',
      'Futuro → condicional: "Vou ligar." → Prometeu que ligaria.',
      'Pretérito perfeito → mais-que-perfeito: "Comprei o livro." → Disse que tinha comprado o livro.',
      'Pronombres cambian: eu → ele/ela; tu → eu/ele; aqui → ali/lá; hoje → naquele dia; amanhã → no dia seguinte',
      'Preguntas indirectas: "Perguntou se..." (sí/no) o "Perguntou o que/onde/quando/como..." (pronombre interrogativo)',
    ],
    table: [
      ['Discurso directo', 'Cambio', 'Discurso indirecto'],
      ['Presente: "falo"', '→ imperfeito', '"falava"'],
      ['Futuro: "falarei"', '→ condicional', '"falaria"'],
      ['Pretérito perf.: "falei"', '→ mais-que-perf.', '"tinha falado"'],
      ['Imperativo: "fala!"', '→ infinitivo', '"que falasse/para falar"'],
      ['hoje / amanhã', '→ naquele dia / no dia seguinte', '(adaptación temporal)'],
    ],
    mistakes: [
      '"Disse que vou chegar" ❌ → "Disse que chegaria/ia chegar" ✓ — el presente del discurso directo se transforma en imperfeito o condicional en el indirecto.',
      '"Perguntou que se virias" ❌ → "Perguntou se virias" ✓ — las preguntas de sí/no usan "se" como conector, no "que".',
      '"Pediu que eu vai" ❌ → "Pediu que eu fosse" ✓ — después de "pedir que" se usa el conjuntivo (imperfeito en contexto pasado).',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el discurso indirecto en portugués?',
      paragraphs: [
        'El discurso indirecto (ou discurso reportado) permite reproducir lo que alguien dijo sin usar sus palabras exactas. En vez de escribir las comillas y citar textualmente, reformulamos el mensaje usando una oración subordinada con "que", "se" o un pronombre interrogativo.',
        'La diferencia principal con el español es que el portugués aplica los cambios de tiempo verbal de forma más sistemática, especialmente cuando el verbo introductor está en pasado. Un hispanohablante puede tender a mantener el presente cuando debería pasar al imperfeito.',
      ],
    },
    {
      heading: '¿Cómo cambian los tiempos verbales en el discurso indirecto?',
      paragraphs: [
        'Cuando el verbo introductor está en pasado (disse, perguntou, afirmou...), los tiempos se retroceden: presente de indicativo → imperfeito de indicativo; futuro de indicativo → condicional; pretérito perfeito → mais-que-perfeito composto (tinha + participio); imperfeito → imperfeito (sin cambio); imperativo → conjuntivo imperfeito o infinitivo.',
        'Si el verbo introductor está en presente (diz, afirma, pergunta...), los tiempos no cambian. "Ele diz que está cansado." (presente → presente). El cambio solo ocurre cuando reportamos algo que alguien dijo en el pasado.',
      ],
      table: [
        ['Discurso directo', 'Tiempo', 'Discurso indirecto (verb. introd. pasado)'],
        ['"Tenho fome."', 'presente', 'Disse que tinha fome.'],
        ['"Vou estudar."', 'futuro perifrástico', 'Disse que ia estudar.'],
        ['"Estudei muito."', 'pretérito perfeito', 'Disse que tinha estudado muito.'],
        ['"Estava cansado."', 'imperfeito', 'Disse que estava cansado. (sin cambio)'],
        ['"Estuda!"', 'imperativo', 'Pediu que estudasse / para estudar.'],
      ],
    },
    {
      heading: 'Cambios de pronombres y referencias de tiempo y lugar',
      paragraphs: [
        'Los pronombres cambian según el punto de vista del narrador: "eu" → ele/ela; "tu" → eu, ele/ela (según quién habla); "nós" → eles/elas o o narrador + tercero. Los posesivos cambian correspondientemente: "o meu" → o seu/o dele.',
        'Las referencias temporales también cambian: "hoje" → naquele dia; "amanhã" → no dia seguinte; "ontem" → no dia anterior; "agora" → então; "aqui" → ali/lá; "este/esta" → esse/essa, aquele/aquela según la distancia temporal.',
      ],
    },
    {
      heading: 'Preguntas y pedidos en discurso indirecto',
      paragraphs: [
        'Las preguntas de sí/no usan "se": "Vienes?" → Perguntou se eu vinha. Las preguntas con pronombre interrogativo conservan el pronombre: "Onde moras?" → Perguntou onde eu morava. "O que fizeste?" → Perguntou o que eu tinha feito.',
        'Los pedidos e imperativos se transforman con "pedir que + conjuntivo" o "pedir para + infinitivo": "Fecha a porta!" → Pediu que fechasse a porta / pediu para fechar a porta. La segunda forma (infinitivo) es muy usada en portugués europeo.',
      ],
    },
    {
      heading: '¿Qué verbos introducen el discurso indirecto en portugués?',
      paragraphs: [
        'Los verbos introductores más frecuentes son: dizer (decir), afirmar (afirmar), explicar (explicar), perguntar (preguntar), responder (responder), pedir (pedir), prometer (prometer), confessar (confesar), garantir (garantizar), sugerir (sugerir), propor (proponer), avisar (avisar), reclamar (quejarse), acrescentar (añadir).',
        'Cada verbo introductor implica una estructura diferente: "dizer que", "perguntar se/o que", "pedir que + conjuntivo", "pedir para + infinitivo", "prometer que + condicional". Conocer estas combinaciones es esencial para el dominio del discurso indirecto.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Discurso indirecto: transformaciones de tiempo, pronombre y referencia temporal con verbos introductores.',
    graphicPrompt: 'Dos personajes: uno citando textualmente y otro reformulando — conexión con "disse que".',
    scene: [
      ['"Estou com fome." → Ela disse que estava com fome.', '"Tengo hambre." → Ella dijo que tenía hambre.'],
      ['"Vou chegar tarde." → Ele avisou que chegaria tarde.', '"Llegaré tarde." → Él avisó que llegaría tarde.'],
      ['"Comprei o livro." → Disse que tinha comprado o livro.', '"Compré el libro." → Dijo que había comprado el libro.'],
      ['"Podes ajudar-me?" → Perguntou se eu podia ajudá-lo.', '"¿Puedes ayudarme?" → Preguntó si yo podía ayudarlo.'],
      ['"Fecha a janela!" → Pediu que fechasse a janela.', '"¡Cierra la ventana!" → Pidió que cerrara la ventana.'],
      ['"Onde moras?" → Perguntou onde eu morava.', '"¿Dónde vives?" → Preguntó dónde vivía yo.'],
      ['"Hoje estou livre." → Disse que naquele dia estava livre.', '"Hoy estoy libre." → Dijo que ese día estaba libre.'],
      ['"Amanhã viajo." → Afirmou que no dia seguinte viajava.', '"Mañana viajo." → Afirmó que al día siguiente viajaba.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['presente→imperfeito', 'futuro→condicional', 'perguntar se / pedir que'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Identifica el cambio correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del discurso indirecto.',
        type: 'choice',
        items: [
          {
            scene: 'Directo: "Estou cansada."',
            lines: [['', 'Ela disse que ___.']],
            options: ['estava cansada', 'está cansada', 'estará cansada', 'esteve cansada'],
            answer: 'estava cansada',
            explain: 'Presente (estou) → imperfeito (estava) en el discurso indirecto con verbo introductor en pasado.',
          },
          {
            scene: 'Directo: "Vou chegar tarde."',
            lines: [['', 'Ele avisou que ___.']],
            options: ['chegaria tarde', 'vai chegar tarde', 'chegará tarde', 'chega tarde'],
            answer: 'chegaria tarde',
            explain: 'Futuro perifrástico (vou chegar) → condicional (chegaria) en el discurso indirecto.',
          },
          {
            scene: 'Pregunta sí/no: "Tens fome?"',
            lines: [['', 'Ela perguntou ___ eu tinha fome.']],
            options: ['se', 'que', 'o que', 'quando'],
            answer: 'se',
            explain: 'Las preguntas de sí/no se introducen con "se" en el discurso indirecto: "perguntou se...".',
          },
          {
            scene: 'Directo: "Já comprei os bilhetes."',
            lines: [['', 'Ele disse que ___ os bilhetes.']],
            options: ['já tinha comprado', 'já comprou', 'já comprará', 'já compra'],
            answer: 'já tinha comprado',
            explain: 'Pretérito perfeito (comprei) → mais-que-perfeito composto (tinha comprado) en el discurso indirecto.',
          },
          {
            scene: 'Pedido directo: "Fecha a porta!"',
            lines: [['', 'Ela pediu que eu ___ a porta.']],
            options: ['fechasse', 'fecho', 'fechei', 'feche'],
            answer: 'fechasse',
            explain: 'Imperativo → conjuntivo imperfeito después de "pedir que" en el discurso indirecto pasado.',
          },
          {
            scene: 'Pregunta con pronombre: "Onde moras?"',
            lines: [['', 'Perguntou ___ eu morava.']],
            options: ['onde', 'se', 'que', 'o que'],
            answer: 'onde',
            explain: 'Las preguntas con pronombre interrogativo conservan el pronombre: "perguntou onde".',
          },
          {
            scene: 'Promesa: "Vou estudar muito."',
            lines: [['', 'Ela prometeu que ___ muito.']],
            options: ['estudaria', 'estuda', 'estudará', 'estudou'],
            answer: 'estudaria',
            explain: 'Futuro (vou estudar) → condicional (estudaria) en el discurso indirecto cuando verbo introductor es pasado.',
          },
          {
            scene: 'Directo: "Hoje estou livre."',
            lines: [['', 'Ela disse que ___ livre.']],
            options: ['naquele dia estava', 'hoje está', 'hoje estava', 'naquele dia está'],
            answer: 'naquele dia estava',
            explain: '"Hoje" → "naquele dia" (cambio de referencia temporal); presente → imperfeito.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Transforma el discurso directo',
        tag: '2 espacios',
        intro: 'Transforma las frases usando dos cambios correctos en el discurso indirecto.',
        type: 'dual',
        items: [
          {
            scene: 'Directo: "Estou com dores e não posso trabalhar."',
            lines: [['', 'Ela disse que [[0]] com dores e que não [[1]] trabalhar.']],
            blanks: [
              { options: ['estava', 'está', 'estará', 'esteve'], answer: 'estava', explain: 'Presente "estou" → imperfeito "estava" en discurso indirecto.' },
              { options: ['podia', 'pode', 'poderá', 'pôde'], answer: 'podia', explain: '"Poder" presente → imperfeito: "pode" → "podia".' },
            ],
          },
          {
            scene: 'Directo: "Amanhã vou ao médico e faço os exames."',
            lines: [['', 'Ele disse que no dia seguinte [[0]] ao médico e [[1]] os exames.']],
            blanks: [
              { options: ['ia', 'vai', 'irá', 'foi'], answer: 'ia', explain: '"Vou ao médico" → futuro perifrástico en discurso indirecto: ia / iria. Aquí "ia" (imperfeito) es la forma coloquial más frecuente.' },
              { options: ['fazia', 'faz', 'fará', 'fez'], answer: 'fazia', explain: '"Fazer" presente → imperfeito: "faz" → "fazia".' },
            ],
          },
          {
            scene: 'Pregunta: "O que compraste? Quanto gastaste?"',
            lines: [['', 'Ela perguntou [[0]] eu tinha comprado e [[1]] eu tinha gasto.']],
            blanks: [
              { options: ['o que', 'se', 'que', 'quando'], answer: 'o que', explain: 'Pregunta con "o que" (qué) conserva el pronombre interrogativo en el discurso indirecto.' },
              { options: ['quanto', 'se', 'que', 'como'], answer: 'quanto', explain: 'Pregunta con "quanto" (cuánto) también conserva el pronombre interrogativo.' },
            ],
          },
          {
            scene: 'Pedido: "Traz-me um café e fecha a janela."',
            lines: [['', 'Ela pediu que eu lhe [[0]] um café e que [[1]] a janela.']],
            blanks: [
              { options: ['trouxesse', 'trago', 'trouxe', 'traga'], answer: 'trouxesse', explain: '"Trazer" imperativo → conjuntivo imperfeito: trouxessem → trouxe- → trouxesse.' },
              { options: ['fechasse', 'fecho', 'fechei', 'feche'], answer: 'fechasse', explain: '"Fechar" imperativo → conjuntivo imperfeito: fechasse.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una conversación reportada',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta para convertir este discurso directo en indirecto.',
        type: 'guidedText',
        scene: 'Elige la opción correcta para el discurso indirecto.',
        text: 'A Mariana contou-me o que aconteceu na reunião. O diretor disse que a empresa [[0]] por um momento difícil. Explicou que as vendas [[1]] nos últimos meses. Perguntou se a equipa [[2]] trabalhar horas extra. Prometeu que [[3]] um bónus no final do ano se os resultados melhorassem. Pediu que toda a gente [[4]] mais esforço. Por fim, garantiu que [[5]] uma nova estratégia na próxima semana. Todos ficaram sem saber [[6]] pensar.',
        blanks: [
          { options: ['passava', 'passa', 'passará', 'passava'], answer: 'passava', explain: 'Presente → imperfeito en discurso indirecto con "disse que".' },
          { options: ['tinham caído', 'caíram', 'cairão', 'caem'], answer: 'tinham caído', explain: 'Pretérito perfeito → mais-que-perfeito composto (tinham + participio).' },
          { options: ['podia', 'pode', 'poderá', 'possa'], answer: 'podia', explain: '"Poder" presente → imperfeito: podia. Pregunta indirecta: "perguntou se... podia".' },
          { options: ['daria', 'dá', 'dará', 'deu'], answer: 'daria', explain: 'Futuro → condicional en discurso indirecto: "prometeu que daria".' },
          { options: ['fizesse', 'faz', 'fará', 'faça'], answer: 'fizesse', explain: '"Pedir que" + conjuntivo imperfeito: fizesse.' },
          { options: ['apresentaria', 'apresenta', 'apresentará', 'apresentou'], answer: 'apresentaria', explain: 'Futuro → condicional: "garantiu que apresentaria".' },
          { options: ['o que', 'se', 'que', 'como'], answer: 'o que', explain: '"Sem saber o que pensar" — pregunta indirecta con "o que" conserva el pronombre.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe sin opciones',
        tag: 'Texto libre',
        intro: 'Convierte las frases de estilo directo a estilo indirecto escribiendo la forma correcta.',
        type: 'freeText',
        scene: 'Escribe la forma correcta en discurso indirecto.',
        text: 'O meu amigo Rui disse: "Estou muito ocupado e não [[0]] (poder) sair esta semana." Também me contou que [[1]] (comprar, pluperfeito) um carro novo. Perguntou-me [[2]] (se/o que) eu estava a gostar do novo emprego. Pediu-me que lhe [[3]] (enviar, conj. imperfeito) o endereço do restaurante. Prometeu que na semana seguinte [[4]] (ter, condicional) mais tempo.',
        blanks: [
          { answer: 'podia', accepted: ['podia'], explain: '"Poder" presente → imperfeito: pode → podia. Discurso indirecto con verbo introdutor en pasado.' },
          { answer: 'tinha comprado', accepted: ['tinha comprado'], explain: 'Pretérito perfeito → mais-que-perfeito composto: tinha comprado.' },
          { answer: 'se', accepted: ['se'], explain: 'Pregunta de sí/no → "perguntou se" en discurso indirecto.' },
          { answer: 'enviasse', accepted: ['enviasse'], explain: '"Enviar" conjuntivo imperfeito: enviaram → envia- → enviasse. "Pediu que + conjuntivo imperfeito".' },
          { answer: 'teria', accepted: ['teria'], explain: '"Ter" condicional: ter + -ia = teria. "Prometeu que + condicional".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Reporta conversaciones',
        tag: 'Producción',
        intro: 'Transforma las frases directas en discurso indirecto con las adaptaciones necesarias.',
        type: 'write',
        items: [
          {
            scene: 'Tu jefe te dijo',
            prompt: 'Tu jefe dijo: "O projeto estará pronto amanhã." Reporta lo que dijo.',
            answer: 'O meu chefe disse que o projeto estaria pronto no dia seguinte.',
            accepted: ['disse que', 'estaria', 'no dia seguinte'],
            explain: 'Futuro (estará) → condicional (estaria); "amanhã" → "no dia seguinte" en el discurso indirecto.',
          },
          {
            scene: 'Una pregunta',
            prompt: 'Tu amiga preguntó: "Já foste a Portugal?" Reporta la pregunta.',
            answer: 'A minha amiga perguntou-me se eu já tinha ido a Portugal.',
            accepted: ['perguntou se', 'perguntou-me se', 'tinha ido'],
            explain: 'Pregunta sí/no → "perguntou se"; pretérito perfeito (foste) → mais-que-perfeito (tinha ido).',
          },
          {
            scene: 'Un pedido',
            prompt: 'Tu vecino te pidió: "Não faças tanto barulho!" Reporta lo que te pidió.',
            answer: 'O meu vizinho pediu que eu não fizesse tanto barulho.',
            accepted: ['pediu que', 'não fizesse', 'pediu-me que'],
            explain: '"Fazer" → conjuntivo imperfeito: fizesse. "Pedir que" + conjuntivo imperfeito.',
          },
          {
            scene: 'Una promesa',
            prompt: 'Tu hermana prometió: "Vou ajudar-te com a mudança." Reporta su promesa.',
            answer: 'A minha irmã prometeu que me ia ajudar / ajudaria com a mudança.',
            accepted: ['prometeu que', 'ia ajudar', 'ajudaria'],
            explain: 'Futuro perifrástico (vou ajudar) → "ia ajudar" (imperfeito) o "ajudaria" (condicional).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Reporta una conversación',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones reportando lo que alguien te dijo, preguntó o pidió recientemente.',
        type: 'write',
        items: [
          {
            scene: 'Lo que alguien te dijo',
            prompt: 'Reporta algo que alguien te dijo recientemente usando "disse que" con el tiempo verbal correcto.',
            answer: 'A minha professora disse que o exame seria muito difícil este ano.',
            accepted: ['disse que', 'disse-me que', 'afirmou que', 'explicou que'],
            explain: 'Usa verbos introductores variados: disse, afirmou, explicou, garantiu. Recuerda el cambio de tiempo.',
          },
          {
            scene: 'Una pregunta que te hicieron',
            prompt: 'Reporta una pregunta que te hicieron usando "perguntou se" o "perguntou onde/quando/o que".',
            answer: 'O meu amigo perguntou onde eu tinha aprendido a falar português.',
            accepted: ['perguntou se', 'perguntou onde', 'perguntou quando', 'perguntou o que', 'perguntou como'],
            explain: 'Preguntas sí/no → "perguntou se"; preguntas con pronombre → conservan el pronombre interrogativo.',
          },
          {
            scene: 'Un pedido o consejo',
            prompt: 'Reporta un pedido o consejo usando "pediu que", "aconselhou que" o "sugeriu que".',
            answer: 'A minha mãe aconselhou que eu descansasse mais e comesse melhor.',
            accepted: ['pediu que', 'aconselhou que', 'sugeriu que', 'pediu para'],
            explain: '"Pedir/aconselhar/sugerir que" + conjuntivo imperfeito cuando el verbo introductor es pasado.',
          },
        ],
      },
    ],
  },
}

export default topic
