import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbos-irregulares',
  order: '15',
  color: '#166534',
  category: 'Verbos',
  level: 'A1',
  title: 'Verbos irregulares en portugués A1: ir, vir, fazer, poder, querer',
  shortTitle: 'Verbos irregulares',
  metaTitle: 'Verbos irregulares portugués A1 — ir, vir, fazer, poder, querer, dizer, ver',
  description:
    'Los verbos irregulares más frecuentes del portugués A1 no siguen los patrones de -ar, -er, -ir. Ir (ir), vir (venir), fazer (hacer), poder (poder), querer (querer) son esenciales desde el primer día. El portugués brasileño y europeo tienen pequeñas diferencias en pronunciación pero las formas escritas son casi idénticas.',
  lead: 'Ir, vir, fazer, poder, querer — estos verbos irregulares son los más usados del portugués. Son irregulares en el presente pero indispensables para comunicarse desde A1.',
  outcomes: [
    'Conjugar en presente los verbos irregulares esenciales: ir, vir, fazer, poder, querer',
    'Identificar las diferencias entre verbos similares: ir vs vir, poder vs querer',
    'Usar estos verbos en frases cotidianas completas',
  ],
  guide: {
    goal: 'Dominar la conjugación presente de los verbos irregulares más frecuentes del portugués.',
    model: 'Verbo irregular = hay que memorizar, no hay regla única.',
    formula: 'ir: vou/vai/vai/vamos/vão | fazer: faço/faz/faz/fazemos/fazem',
    decisions: [
      '¿Expresas movimiento hacia un lugar? → ir (Eu vou ao mercado — Voy al mercado)',
      '¿Alguien viene hacia ti? → vir (Ela vem amanhã — Ella viene mañana)',
      '¿Expresas capacidad? → poder (Eu posso ajudar — Puedo ayudar)',
      '¿Expresas deseo? → querer (Eu quero aprender português — Quiero aprender portugués)',
      '¿Realizas una acción general? → fazer (O que você faz? — ¿Qué haces?)',
    ],
    table: [
      ['Pronombre', 'ir (ir)', 'vir (venir) / fazer (hacer)'],
      ['eu', 'vou', 'venho / faço'],
      ['você/ele/ela', 'vai', 'vem / faz'],
      ['nós', 'vamos', 'vimos / fazemos'],
      ['vocês/eles/elas', 'vão', 'vêm / fazem'],
    ],
    mistakes: [
      '"Eu vou" = yo voy (ir). "Eu vim" = yo vine (pasado de vir). No confundir: vou (ir, presente) vs vim (vir, pasado).',
      '"Fazer" tiene faço en eu (yo): Eu faço exercício, no "eu faz" ni "eu fazer".',
      '"Poder" se conjuga: posso, pode, podemos, podem. No confundir con "querer": quero, quer, queremos, querem.',
      'Brasileño: "você" = tú (singular). Europeo: "tu" con conjugación diferente (tu vais, tu fazes). En A1 foco en Brasil: você.',
    ],
  },
  seo: [
    {
      heading: '¿Cuáles son los verbos irregulares más importantes en portugués A1?',
      paragraphs: [
        'Los cinco verbos irregulares más esenciales en portugués A1 son: ir (vou/vai/vamos/vão), vir (venho/vem/vimos/vêm), fazer (faço/faz/fazemos/fazem), poder (posso/pode/podemos/podem) y querer (quero/quer/queremos/querem). Estos cinco verbos cubren el 80% de las necesidades comunicativas básicas.',
        'El portugués brasileño usa "você" para la segunda persona singular, que toma las mismas formas que "ele/ela". Esto simplifica la conjugación en A1: você vai = él va = ella va. Solo "eu" y "nós" tienen formas claramente distintas.',
      ],
      table: [
        ['Verbo', 'eu', 'você/ele/ela', 'nós', 'vocês/eles'],
        ['ir (ir)', 'vou', 'vai', 'vamos', 'vão'],
        ['vir (venir)', 'venho', 'vem', 'vimos', 'vêm'],
        ['fazer (hacer)', 'faço', 'faz', 'fazemos', 'fazem'],
        ['poder (poder)', 'posso', 'pode', 'podemos', 'podem'],
        ['querer (querer)', 'quero', 'quer', 'queremos', 'querem'],
      ],
    },
    {
      heading: 'Ir vs vir: la confusión más común para hispanohablantes',
      paragraphs: [
        '"Ir" y "vir" son los verbos de movimiento básicos y se confunden fácilmente. "Ir" expresa movimiento desde donde estás hacia otro lugar: Eu vou ao banco = Voy al banco. "Vir" expresa movimiento hacia donde estás ahora o hacia el hablante: Você vem aqui? = ¿Vienes aquí?',
        'La forma de primera persona "vou" (ir) parece relacionada con "vou" pero viene de una raíz completamente diferente. "Venho" (vir, eu venho) recuerda al español "vengo". Aprovecha esta similitud para memorizar vir.',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'Ir (vou) vs vir (venho) is the primary confusion for Spanish speakers — vou looks like it could be from vir, but it\'s ir. Drill these two with direction context: away from speaker = ir; towards speaker = vir.',
    graphicPrompt:
      'Five verb cards arranged in a grid: ir (arrow moving away), vir (arrow coming toward), fazer (hands making something), poder (muscle/ability), querer (heart/desire). Green Portuguese theme.',
    scene: [
      ['ir — eu', 'Eu vou ao mercado (vou) — Voy al mercado'],
      ['ir — você', 'Você vai à escola (vai) — Tú vas a la escuela'],
      ['vir — eu', 'Eu venho agora (vénho) — Vengo ahora'],
      ['fazer — eu', 'Eu faço exercício (fáço) — Hago ejercicio'],
      ['poder — eu', 'Eu posso ajudar (pósso) — Puedo ayudar'],
      ['querer — eu', 'Eu quero aprender (quéro) — Quiero aprender'],
    ],
    learnerModes: ['recognition', 'transformation', 'gap-fill', 'production'],
    practiceVerbs: ['ir', 'vir', 'fazer', 'poder', 'querer'],
    reviewFocus: ['vou vs venho (ir vs vir)', 'faço (eu de fazer)', 'posso/quero — capacidad vs deseo'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconhecimento dos irregulares',
        tag: 'Opción múltiple',
        intro: 'Identifica la forma correcta del verbo irregular.',
        type: 'choice',
        items: [
          { scene: 'Ir — eu', lines: [['', '¿Cómo se dice "Yo voy al banco" en portugués?']], options: ['Eu ir ao banco', 'Eu vai ao banco', 'Eu vou ao banco', 'Eu vão ao banco'], answer: 'Eu vou ao banco', explain: 'Eu vou (ir, primera persona). vou es la forma más irregular: eu ir → vou.' },
          { scene: 'Fazer — eu', lines: [['', '¿Cuál es la forma correcta? "Eu ___ exercício todos os dias."']], options: ['faz', 'fazer', 'faço', 'fazem'], answer: 'faço', explain: 'Eu faço exercício. Fazer → faço (eu). Notad la -ço: Eu faço, você faz.' },
          { scene: 'Vir vs ir', lines: [['', '"Você ___ amanhã?" Alguien viene hacia donde estás.']], options: ['vai', 'vem', 'vou', 'venho'], answer: 'vem', explain: 'Você vem amanhã? (vir = venir hacia aquí). Você vem = Tú vienes / Él viene.' },
          { scene: 'Poder — eu', lines: [['', '"Puedo hablar portugués": Eu ___ falar português.']], options: ['pode', 'poder', 'posso', 'podem'], answer: 'posso', explain: 'Eu posso falar português. poder → posso (eu). Posso es muy irregular.' },
          { scene: 'Querer', lines: [['', '"Ella quiere aprender portugués": Ela ___ aprender português.']], options: ['quero', 'querer', 'quer', 'querem'], answer: 'quer', explain: 'Ela quer aprender português. querer → quer (ele/ela/você). Él/ella quiere = quer.' },
          { scene: 'Ir plural', lines: [['', '"Ellos van al restaurante": Eles ___ ao restaurante.']], options: ['vai', 'vamos', 'vão', 'iam'], answer: 'vão', explain: 'Eles vão ao restaurante. ir → vão (eles/vocês). Noten la tilde: vão.' },
          { scene: 'Vir — eu', lines: [['', '"Yo vengo de Colombia": Eu ___ da Colômbia.']], options: ['vou', 'vem', 'venho', 'vim'], answer: 'venho', explain: 'Eu venho da Colômbia. vir → venho (eu). Similar al español "vengo".' },
          { scene: 'Nós — ir', lines: [['', '"Vamos a la playa mañana": Nós ___ à praia amanhã.']], options: ['vão', 'vai', 'vamos', 'venho'], answer: 'vamos', explain: 'Nós vamos à praia. ir → vamos (nós). Igual que español: ¡Vamos!' },
        ],
      },
      {
        id: 'level-2',
        title: 'Verbos irregulares — dois espaços',
        tag: '2 espacios',
        intro: 'Completa con el verbo irregular y el complemento correcto.',
        type: 'dual',
        items: [
          { scene: 'Eu vou + destino', lines: [['', '"Voy al mercado": Eu [[0]] [[1]].']], blanks: [{ options: ['vou', 'vai', 'vamos', 'venho'], answer: 'vou', explain: 'Eu vou = yo voy. Primera persona de ir.' }, { options: ['ao mercado', 'no mercado', 'em mercado', 'para mercado'], answer: 'ao mercado', explain: 'ao = a + o (contracción masculina). ir + ao lugar.' }] },
          { scene: 'Poder + infinitivo', lines: [['', '"¿Puedes ayudarme?": Você [[0]] me [[1]]?']], blanks: [{ options: ['posso', 'pode', 'podem', 'poder'], answer: 'pode', explain: 'Você pode = Tú puedes / Usted puede. poder → pode (você/ele/ela).' }, { options: ['ajudar', 'ajudo', 'ajuda', 'ajudando'], answer: 'ajudar', explain: 'pode + infinitivo: pode ajudar = puede ayudar.' }] },
          { scene: 'Querer + infinitivo', lines: [['', '"Queremos aprender portugués": Nós [[0]] [[1]] português.']], blanks: [{ options: ['querem', 'quero', 'queremos', 'quer'], answer: 'queremos', explain: 'Nós queremos. querer → queremos (nós).' }, { options: ['aprendo', 'aprender', 'aprendendo', 'aprenda'], answer: 'aprender', explain: 'queremos + infinitivo: queremos aprender = queremos aprender.' }] },
          { scene: 'Fazer + objeto', lines: [['', '"¿Qué haces?": O que você [[0]] [[1]]?']], blanks: [{ options: ['faço', 'faz', 'fazem', 'fazer'], answer: 'faz', explain: 'Você faz = Tú haces / Usted hace. fazer → faz (você).' }, { options: ['?', 'agora', 'isso', 'aqui'], answer: 'agora', explain: 'O que você faz agora? = ¿Qué haces ahora? (agora = ahora).' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — verbos irregulares em contexto',
        tag: 'Opciones',
        intro: 'Elige la forma verbal correcta en cada espacio.',
        type: 'guidedText',
        scene: 'Um dia na WeLearn — Bucaramanga',
        text: 'Hoje Bruno e Nora [[0]] à academia WeLearn às oito da manhã. (van a la academia) Eu [[1]] de casa às sete. (vengo de casa) Os alunos [[2]] aprender português rapidamente. (quieren aprender) Nora [[3]] as aulas com muita energia. (hace las clases) Você [[4]] me ajudar com esta tarefa? (¿Puedes ayudarme?)',
        blanks: [
          { options: ['vai', 'vão', 'vamos', 'venho'], answer: 'vão', explain: 'Bruno e Nora (eles) → vão. ir → vão (tercera persona plural).' },
          { options: ['vou', 'venho', 'vai', 'vêm'], answer: 'venho', explain: 'Eu venho = Yo vengo. vir → venho (eu primera persona).' },
          { options: ['quer', 'querem', 'quero', 'queremos'], answer: 'querem', explain: 'Os alunos (eles) → querem. querer → querem (tercera persona plural).' },
          { options: ['faço', 'fazem', 'faz', 'fazer'], answer: 'faz', explain: 'Nora (ela) → faz. fazer → faz (tercera persona singular).' },
          { options: ['posso', 'podem', 'pode', 'podemos'], answer: 'pode', explain: 'Você pode? = ¿Puedes/Puede? poder → pode (você/ele/ela).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto livre — escreve os irregulares',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta del verbo sin opciones.',
        type: 'freeText',
        scene: 'Planes y capacidades',
        text: '1. "Voy a Brasil en julio": Eu [[0]] ao Brasil em julho. 2. "Ella hace pilates cada día": Ela [[1]] pilates todo dia. 3. "¿Qué quieren comer?": O que vocês [[2]] comer? 4. "Podemos hablar mañana": Nós [[3]] falar amanhã. 5. "Él viene de Portugal": Ele [[4]] de Portugal.',
        blanks: [
          { answer: 'vou', accepted: ['vou'], explain: 'Eu vou ao Brasil. ir → vou (eu).' },
          { answer: 'faz', accepted: ['faz'], explain: 'Ela faz pilates. fazer → faz (ela).' },
          { answer: 'querem', accepted: ['querem'], explain: 'Vocês querem comer? querer → querem (vocês/eles).' },
          { answer: 'podemos', accepted: ['podemos'], explain: 'Nós podemos falar. poder → podemos (nós).' },
          { answer: 'vem', accepted: ['vem'], explain: 'Ele vem de Portugal. vir → vem (ele).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Produção escrita',
        tag: 'Producción',
        intro: 'Construye frases completas con verbos irregulares.',
        type: 'write',
        items: [
          { scene: 'Planes para el fin de semana', prompt: 'Traduce al portugués: "Este fin de semana voy a la playa con mis amigos. ¿Quieres venir?" (este fim de semana = este fin de semana, praia = playa, meus amigos = mis amigos)', answer: 'Este fim de semana vou à praia com meus amigos. Você quer vir?', accepted: ['vou', 'quer vir'], explain: 'Eu vou (ir) + você quer (querer) + vir (infinitivo). à = a + a (contracción femenina).' },
          { scene: 'Capacidades', prompt: 'Traduce al portugués: "Puedo hablar español, inglés y un poco de portugués." (um pouco de = un poco de)', answer: 'Eu posso falar espanhol, inglês e um pouco de português', accepted: ['posso falar'], explain: 'Eu posso falar = Puedo hablar. poder → posso + infinitivo.' },
          { scene: 'Preguntar qué hace alguien', prompt: 'Traduce al portugués: "¿Qué hacen los estudiantes en WeLearn?" (os alunos = los estudiantes)', answer: 'O que os alunos fazem na WeLearn?', accepted: ['fazem'], explain: 'Os alunos (eles) fazem. fazer → fazem (tercera persona plural). O que = ¿Qué?' },
          { scene: 'Origen + movimiento', prompt: 'Traduce al portugués: "Bruno viene de Bucaramanga y va a São Paulo para una conferencia." (conferência = conferencia)', answer: 'Bruno vem de Bucaramanga e vai a São Paulo para uma conferência', accepted: ['vem', 'vai'], explain: 'Bruno vem (vir, ele = vem) + vai (ir, ele = vai). Vem = viene, vai = va.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Missão comunicativa',
        tag: 'Producción',
        intro: 'Usa los verbos irregulares en conversaciones reales.',
        type: 'write',
        items: [
          { scene: 'Apresentação com verbos irregulares', prompt: 'Escreve um parágrafo de apresentação (3-4 frases) usando: ir, vir, fazer e querer. Conta: de onde você vem, para onde vai, o que faz, e o que quer aprender.', answer: 'Eu venho da Colômbia. Vou ao Brasil em agosto. Faço aulas de português na WeLearn. Quero aprender português para trabalhar.', accepted: ['venho', 'vou', 'faço', 'quero'], explain: 'venho (vir-eu), vou (ir-eu), faço (fazer-eu), quero (querer-eu) — los cuatro verbos en primera persona.' },
          { scene: 'Planejando uma viagem', prompt: 'Escreve 3 frases sobre planos de viagem: onde você vai, o que pode fazer lá, e o que quer ver. Usa: ir (vou), poder (posso), querer (quero).', answer: 'Vou ao Rio de Janeiro. Posso visitar o Cristo Redentor. Quero ver a praia de Copacabana.', accepted: ['vou', 'posso', 'quero'], explain: 'Vou (ir), posso (poder), quero (querer) — tres verbos irregulares en eu.' },
        ],
      },
    ],
  },
}

export default topic
