import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'ir-futuro',
  order: '17',
  color: '#166534',
  category: 'Verbos',
  level: 'A1',
  title: 'Ir + infinitivo: futuro próximo en portugués A1',
  shortTitle: 'Ir + infinitivo (futuro)',
  metaTitle: 'Futuro próximo portugués A1 — vou estudar, vai viajar, vamos comer',
  description:
    'Para hablar del futuro inmediato en portugués, usa ir conjugado + infinitivo: Vou estudar amanhã (Voy a estudiar mañana). Es idéntico al español "ir a + infinitivo" y al inglés "going to". Es la forma de futuro más natural en el habla cotidiana brasileña.',
  lead: 'Vou estudar, vai viajar, vamos comer — con ir + infinitivo expresas planes y acciones futuras en portugués. Exactamente como el español "voy a estudiar".',
  outcomes: [
    'Usar ir conjugado + infinitivo para expresar el futuro próximo',
    'Distinguir el futuro ir+inf de otros usos de ir (movimiento)',
    'Formar negaciones e interrogaciones del futuro próximo',
  ],
  guide: {
    goal: 'Expresar planes y acciones futuras con ir + infinitivo.',
    model: '[ir conjugado] + [verbo en infinitivo]',
    formula: 'vou/vai/vai/vamos/vão + infinitivo',
    decisions: [
      '¿Hablas de algo que pasará próximamente? → ir + infinitivo (Vou viajar na próxima semana)',
      '¿Es eu? → vou + infinitivo (Vou estudar = Voy a estudiar)',
      '¿Es você/ele/ela? → vai + infinitivo (Ela vai comer = Ella va a comer)',
      '¿Es nós? → vamos + infinitivo (Vamos sair = Vamos a salir)',
      '¿Es negativo? → não + ir conjugado + infinitivo (Não vou ir = No voy a ir)',
    ],
    table: [
      ['Pronombre', 'ir (futuro)', 'Ejemplo completo'],
      ['eu', 'vou', 'Vou estudar amanhã (Voy a estudiar mañana)'],
      ['você/ele/ela', 'vai', 'Ela vai viajar no fim de semana'],
      ['nós', 'vamos', 'Vamos comer juntos (Vamos a comer juntos)'],
      ['vocês/eles/elas', 'vão', 'Eles vão morar no Brasil (Van a vivir en Brasil)'],
    ],
    mistakes: [
      'Não confundir: "Eu vou ao mercado" (ir = movimiento real) vs "Eu vou comprar" (vou + inf = futuro).',
      'Nós vamos pode significar ¡Vamos! (sugerencia) o "nosotros vamos a..." (futuro). El contexto aclara.',
      'El infinitivo en portugués NO cambia: vou falar, você vai falar, eles vão falar. Siempre igual.',
      'Não vou fazer isso (No voy a hacer eso). La negação vai antes de vou/vai/vamos/vão.',
    ],
  },
  seo: [
    {
      heading: '¿Cómo se expresa el futuro en portugués cotidiano?',
      paragraphs: [
        'En el portugués hablado de Brasil, el futuro simple (amarei, estudarei) es prácticamente arcaico en la conversación diaria. En su lugar se usa casi siempre ir + infinitivo: Vou estudar (Voy a estudiar). Esta construcción es idéntica al español "voy a + infinitivo" y por eso es muy fácil para hispanohablantes.',
        'Esta forma expresa tanto futuro inmediato (Vou sair agora = Voy a salir ahora) como planes a largo plazo (Vou morar no Brasil = Voy a vivir en Brasil). Es la forma de futuro por excelencia en A1.',
      ],
      table: [
        ['Pronombre', 'Forma', 'Ejemplo'],
        ['eu', 'vou + inf', 'Vou aprender português (Voy a aprender portugués)'],
        ['você/ele/ela', 'vai + inf', 'Você vai entender (Vas a entender)'],
        ['nós', 'vamos + inf', 'Vamos praticar (Vamos a practicar)'],
        ['vocês/eles/elas', 'vão + inf', 'Eles vão chegar tarde (Van a llegar tarde)'],
      ],
    },
    {
      heading: 'Ir de movimiento vs ir de futuro: cómo distinguirlos',
      paragraphs: [
        'El mismo verbo "ir" sirve para dos cosas: movimiento real (Eu vou ao banco = Voy al banco) y futuro (Eu vou ligar = Voy a llamar). La diferencia está en lo que sigue: un sustantivo/lugar = movimiento; un infinitivo = futuro.',
        'En la práctica oral: "Vou lá" (Voy allá — movimiento) vs "Vou fazer isso" (Voy a hacer eso — futuro). Cuando aparece un infinitivo después de vou/vai/vamos/vão, siempre es futuro.',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'This is the primary future tense for Brazilian Portuguese in A1. The structure is identical to Spanish "ir a + infinitive" so Spanish speakers acquire it very fast. Focus on ir (movement) vs ir+infinitive (future) contrast.',
    graphicPrompt:
      'Calendar with arrow pointing forward. Speech bubbles: "Vou estudar amanhã" (eu), "Ela vai viajar" (ela), "Vamos comer" (nós), "Eles vão trabalhar" (eles). Green Brazilian theme.',
    scene: [
      ['eu', 'Vou aprender português (vôu aprennder) — Voy a aprender portugués'],
      ['você', 'Você vai estudar (vai estudár) — Vas a estudiar'],
      ['ele/ela', 'Ela vai viajar (vai viajár) — Ella va a viajar'],
      ['nós', 'Vamos comer juntos (vámos comér) — Vamos a comer juntos'],
      ['vocês/eles', 'Eles vão morar no Brasil (vão morár) — Van a vivir en Brasil'],
      ['negação', 'Não vou trabalhar hoje (não vôu) — No voy a trabajar hoy'],
    ],
    learnerModes: ['recognition', 'transformation', 'gap-fill', 'production'],
    practiceVerbs: ['estudar', 'viajar', 'comer', 'trabalhar', 'falar', 'fazer'],
    reviewFocus: ['vou/vai/vamos/vão + infinitivo', 'negação: não vou', 'ir movimiento vs ir futuro'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconhecimento do futuro próximo',
        tag: 'Opción múltiple',
        intro: 'Identifica la forma correcta del futuro próximo.',
        type: 'choice',
        items: [
          { scene: 'Eu — futuro', lines: [['', '"Voy a estudiar mañana": Eu ___ estudar amanhã.']], options: ['vai', 'vou', 'vamos', 'vão'], answer: 'vou', explain: 'Eu vou estudar. ir (futuro) → vou (eu). Exactamente igual que "voy a" en español.' },
          { scene: 'Ela — futuro', lines: [['', '"Ella va a viajar": Ela ___ viajar.']], options: ['vou', 'vamos', 'vai', 'vão'], answer: 'vai', explain: 'Ela vai viajar. ir (futuro) → vai (você/ele/ela).' },
          { scene: 'Nós — futuro', lines: [['', '"Vamos a comer juntos": Nós ___ comer juntos.']], options: ['vou', 'vão', 'vai', 'vamos'], answer: 'vamos', explain: 'Nós vamos comer juntos. ir → vamos (nós). ¡Como en español!' },
          { scene: 'Eles — futuro', lines: [['', '"Ellos van a trabajar mañana": Eles ___ trabalhar amanhã.']], options: ['vai', 'vamos', 'vão', 'vou'], answer: 'vão', explain: 'Eles vão trabalhar. ir → vão (eles/vocês). Vão siempre lleva acento gráfico.' },
          { scene: 'Negación futuro', lines: [['', '"No voy a hacer eso": ___ vou fazer isso.']], options: ['Não', 'Nenhum', 'Nunca', 'Nem'], answer: 'Não', explain: 'Não vou fazer isso. La negación va antes de vou/vai/vamos/vão.' },
          { scene: 'Movimiento vs futuro', lines: [['', '"Vou ao banco" y "Vou ligar". ¿Cuál usa ir como futuro?']], options: ['"Vou ao banco" (futuro)', '"Vou ligar" (futuro)', 'Ambas son futuro', 'Ninguna es futuro'], answer: '"Vou ligar" (futuro)', explain: 'Vou ao banco = movimiento (ir al banco). Vou ligar = futuro (voy a llamar). Infinitivo después = futuro.' },
          { scene: 'Você vai + infinitivo', lines: [['', '"¿Vas a estudiar hoy?": Você vai ___ hoje?']], options: ['estudando', 'estudou', 'estudar', 'estuda'], answer: 'estudar', explain: 'Você vai estudar? El infinitivo NUNCA cambia en la construcción ir + infinitivo.' },
          { scene: 'Frase completa', lines: [['', '"Vamos a aprender portugués juntos." ¿Cuál es correcta?']], options: ['Vamos aprender português juntos', 'Vai aprender português juntos', 'Vou aprendemos', 'Vão aprender nós'], answer: 'Vamos aprender português juntos', explain: 'Vamos aprender = Vamos a aprender (nós). En Brasil se puede omitir el "a" entre vamos e infinitivo.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Futuro próximo — dois espaços',
        tag: '2 espacios',
        intro: 'Completa con ir conjugado e infinitivo.',
        type: 'dual',
        items: [
          { scene: 'Eu — fazer', lines: [['', '"Voy a hacer ejercicio mañana": Eu [[0]] exercício [[1]].']], blanks: [{ options: ['vou', 'vai', 'vamos', 'vão'], answer: 'vou', explain: 'Eu vou (primera persona singular de ir).' }, { options: ['fazer', 'fazendo', 'faço', 'fiz'], answer: 'fazer', explain: 'Vou + infinitivo. fazer = infinitivo de hacer.' }] },
          { scene: 'Nós — viajar', lines: [['', '"Vamos a viajar a São Paulo": Nós [[0]] [[1]] a São Paulo.']], blanks: [{ options: ['vou', 'vai', 'vamos', 'vão'], answer: 'vamos', explain: 'Nós vamos (primera persona plural de ir).' }, { options: ['viajando', 'viajou', 'viajar', 'viajamos'], answer: 'viajar', explain: 'Vamos + infinitivo. viajar = infinitivo.' }] },
          { scene: 'Negação', lines: [['', '"Ella no va a llegar tarde": Ela [[0]] [[1]] chegar tarde.']], blanks: [{ options: ['vai', 'não vai', 'não vou', 'não vamos'], answer: 'não vai', explain: 'Não vai = no va. Negação + ir conjugado.' }, { options: ['chegando', 'chegou', 'chegar', 'chega'], answer: 'chegar', explain: 'Não vai chegar = No va a llegar. chegar = infinitivo.' }] },
          { scene: 'Eles — estudar', lines: [['', '"Ellos van a estudiar la próxima semana": Eles [[0]] [[1]] na próxima semana.']], blanks: [{ options: ['vai', 'vou', 'vamos', 'vão'], answer: 'vão', explain: 'Eles vão (tercera persona plural de ir).' }, { options: ['estudando', 'estudam', 'estudar', 'estudou'], answer: 'estudar', explain: 'Vão + infinitivo. estudar = infinitivo.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — planos para o futuro',
        tag: 'Opciones',
        intro: 'Elige la forma correcta del futuro próximo.',
        type: 'guidedText',
        scene: 'Planos de Nico para a próxima semana',
        text: 'Na próxima semana, Nico [[0]] muitas coisas. (va a hacer) Na segunda-feira, ele [[1]] uma reunião com Nora. (va a tener) Na terça, os alunos [[2]] um exame de português. (van a hacer) Na quinta, nós [[3]] uma festa na academia. (vamos a organizar) No fim de semana, Nico [[4]] descansar com a família. (va a descansar)',
        blanks: [
          { options: ['vai fazer', 'vou fazer', 'vamos fazer', 'vão fazer'], answer: 'vai fazer', explain: 'Nico (ele) → vai. fazer → infinitivo. Vai fazer = va a hacer.' },
          { options: ['vai ter', 'vou ter', 'vamos ter', 'vão ter'], answer: 'vai ter', explain: 'ele (Nico) → vai. ter → infinitivo. Vai ter = va a tener.' },
          { options: ['vão fazer', 'vai fazer', 'vou fazer', 'vamos fazer'], answer: 'vão fazer', explain: 'Os alunos (eles) → vão. fazer → infinitivo. Vão fazer = van a hacer.' },
          { options: ['vamos organizar', 'vou organizar', 'vai organizar', 'vão organizar'], answer: 'vamos organizar', explain: 'Nós → vamos. organizar → infinitivo. Vamos organizar = vamos a organizar.' },
          { options: ['vai descansar', 'vou descansar', 'vamos descansar', 'vão descansar'], answer: 'vai descansar', explain: 'Nico (ele) → vai. descansar → infinitivo. Vai descansar = va a descansar.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto livre — escreve o futuro',
        tag: 'Sin opciones',
        intro: 'Escribe la forma de ir + infinitivo sin opciones.',
        type: 'freeText',
        scene: 'Planes para el fin de semana',
        text: '1. "Voy a aprender portugués": Eu [[0]] português. 2. "¿Qué vas a hacer?": O que você [[1]] fazer? 3. "Vamos a comer pizza": Nós [[2]] pizza. 4. "Ellos van a estudiar": Eles [[3]] estudar. 5. "No voy a trabajar hoy": [[4]] trabalhar hoje.',
        blanks: [
          { answer: 'vou aprender', accepted: ['vou aprender'], explain: 'Eu vou + infinitivo. aprender = infinitivo.' },
          { answer: 'vai', accepted: ['vai'], explain: 'Você vai fazer? ir → vai (você).' },
          { answer: 'vamos comer', accepted: ['vamos comer'], explain: 'Nós vamos + comer (infinitivo).' },
          { answer: 'vão', accepted: ['vão'], explain: 'Eles vão estudar. ir → vão (eles/vocês).' },
          { answer: 'Não vou', accepted: ['Não vou', 'não vou'], explain: 'Não vou trabalhar hoje. Negação antes de vou.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Produção escrita',
        tag: 'Producción',
        intro: 'Construye frases completas con ir + infinitivo.',
        type: 'write',
        items: [
          { scene: 'Planes personales', prompt: 'Traduce al portugués: "Voy a aprender portugués en WeLearn porque quiero vivir en Brasil." (porque = porque, quero = quiero, viver = vivir)', answer: 'Vou aprender português na WeLearn porque quero viver no Brasil', accepted: ['vou aprender', 'quero viver'], explain: 'Vou aprender (eu, futuro) + quero viver (querer + infinitivo). No Brasil = en Brasil (contracción em + o).' },
          { scene: 'Planes del grupo', prompt: 'Traduce al portugués: "Este fin de semana vamos a visitar São Paulo. ¿Vas a vir?" (este fim de semana = este fin de semana, visitar = visitar)', answer: 'Este fim de semana vamos visitar São Paulo. Você vai vir?', accepted: ['vamos visitar', 'vai vir'], explain: 'Vamos visitar (nós, futuro). Você vai vir? (você vai + vir infinitivo). "Vai vir" suena redundante pero es correcto.' },
          { scene: 'Negación y afirmación', prompt: 'Traduce al portugués: "Nora va a enseñar la clase mañana pero yo no voy a estar. Ellos van a grabar la clase." (ensinar = enseñar, gravar = grabar, aula = clase)', answer: 'Nora vai ensinar a aula amanhã mas eu não vou estar. Eles vão gravar a aula.', accepted: ['vai ensinar', 'não vou', 'vão gravar'], explain: 'vai ensinar (ela), não vou estar (eu negativo), vão gravar (eles).' },
          { scene: 'Pregunta de futuro', prompt: 'Traduce al portugués: "¿Qué vas a hacer después de la clase?" (depois da aula = después de la clase)', answer: 'O que você vai fazer depois da aula?', accepted: ['vai fazer'], explain: 'O que = ¿Qué? + você vai + fazer (infinitivo). depois da aula = depois de + a aula.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Missão comunicativa',
        tag: 'Producción',
        intro: 'Usa ir + infinitivo para hablar de planes reales.',
        type: 'write',
        items: [
          { scene: 'Meus planos para a semana', prompt: 'Escreve um parágrafo (4-5 frases) sobre os seus planos para esta semana. Usa: eu vou, você vai, nós vamos, eles vão. Vocabulário: estudar, trabalhar, comer, viajar, aprender, fazer exercício, descansar.', answer: 'Esta semana vou estudar muito português. Minha amiga vai trabalhar de casa. Nós vamos jantar juntos na sexta. Eles vão viajar no fim de semana.', accepted: ['vou', 'vai', 'vamos', 'vão'], explain: 'Usa as quatro formas: vou (eu), vai (ele/ela/você), vamos (nós), vão (eles/vocês).' },
          { scene: 'Entrevista de planos', prompt: 'Escreve 3 perguntas sobre planos futuros para um colega + as respostas. Usa: "Você vai...?", "O que você vai...?", "Quando você vai...?"', answer: 'Você vai estudar hoje? Sim, vou estudar à noite. O que você vai fazer no fim de semana? Vou visitar minha família. Quando você vai aprender japonês? Vou começar no próximo ano.', accepted: ['vai', 'vou'], explain: 'Pergunta: você vai + infinitivo? Resposta: vou + infinitivo. Patrão natural do futuro próximo brasileiro.' },
        ],
      },
    ],
  },
}

export default topic
