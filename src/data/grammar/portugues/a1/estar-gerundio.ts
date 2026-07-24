import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'estar-gerundio',
  order: '16',
  color: '#166534',
  category: 'Verbos',
  level: 'A1',
  title: 'Estar + gerúndio (BR) / a + infinitivo (PT): acciones en progreso',
  shortTitle: 'Estar + gerúndio',
  metaTitle: 'Estar + gerúndio portugués A1 — estou estudando, está comendo, estamos falando',
  description:
    'En portugués brasileño, las acciones en curso se expresan con estar + gerúndio (-ndo): Estou estudando = Estoy estudiando. En Portugal se usa estar a + infinitivo: Estou a estudar. Ambas formas son correctas; en A1 con enfoque en Brasil usamos el gerúndio.',
  lead: 'Para decir "estoy haciendo algo ahora mismo" en portugués brasileño usa estar + gerúndio: Estou estudando, você está comendo, estamos trabalhando. El gerúndio siempre termina en -ndo.',
  outcomes: [
    'Formar el gerúndio de verbos -ar, -er, -ir (siempre termina en -ndo)',
    'Conjugar estar en presente para todas las personas',
    'Usar estar + gerúndio para acciones en curso (y conocer la alternativa europea estar a + infinitivo)',
  ],
  guide: {
    goal: 'Expresar acciones que ocurren en este momento con estar + gerúndio.',
    model: '[estar conjugado] + [raíz verbal + -ndo]',
    formula: 'estou/está/está/estamos/estão + gerúndio (-ando/-endo/-indo)',
    decisions: [
      '¿La acción ocurre AHORA MISMO? → estar + gerúndio (Estou comendo = Estoy comiendo)',
      '¿Es verbo -ar? → gerúndio = raíz + -ando (falar → fal + ando = falando)',
      '¿Es verbo -er? → gerúndio = raíz + -endo (comer → com + endo = comendo)',
      '¿Es verbo -ir? → gerúndio = raíz + -indo (partir → part + indo = partindo)',
      '¿Estás en Portugal? → usar estar a + infinitivo: Estou a falar (alternativa europea)',
    ],
    table: [
      ['Pronombre', 'estar (presente)', 'Ejemplo completo'],
      ['eu', 'estou', 'Estou estudando (Estoy estudiando)'],
      ['você/ele/ela', 'está', 'Você está comendo (Estás comiendo)'],
      ['nós', 'estamos', 'Estamos trabalhando (Estamos trabajando)'],
      ['vocês/eles/elas', 'estão', 'Eles estão dormindo (Están durmiendo)'],
    ],
    mistakes: [
      'Gerúndio SIEMPRE en -ndo: falar → falando, comer → comendo, partir → partindo. No hay excepciones.',
      '"Estar" en A1 tiene estas formas: estou, está, estamos, estão. No "*eu esta", ni "*ele estamos".',
      'Brasil: estou estudando. Portugal: estou a estudar. Ambas son correctas, no mezclar en el mismo texto.',
      '"Ser" ≠ "estar": Eu sou estudante (soy estudiante, permanente). Eu estou estudando (estoy estudiando, ahora).',
    ],
  },
  seo: [
    {
      heading: '¿Cómo se forma el gerúndio en portugués?',
      paragraphs: [
        'El gerúndio en portugués es muy regular: todos los verbos forman el gerúndio con la raíz + -ndo. Verbos -ar añaden -ando (falar → falando), verbos -er añaden -endo (comer → comendo), verbos -ir añaden -indo (partir → partindo). No hay gerúndios irregulares en portugués.',
        'Esta regularidad hace que el gerúndio sea más sencillo que en español, donde hay irregulares como ir → yendo, poder → pudiendo. En portugués: ir → indo, poder → podendo. Siempre regular.',
      ],
      table: [
        ['Terminación', 'Infinitivo', 'Gerúndio'],
        ['-ar', 'falar (hablar)', 'falando'],
        ['-ar', 'estudar (estudiar)', 'estudando'],
        ['-er', 'comer (comer)', 'comendo'],
        ['-er', 'beber (beber)', 'bebendo'],
        ['-ir', 'partir (partir)', 'partindo'],
        ['-ir', 'dormir (dormir)', 'dormindo'],
      ],
    },
    {
      heading: 'Brasil vs Portugal: dos formas de expresar acciones en progreso',
      paragraphs: [
        'Esta es una de las diferencias más visibles entre el portugués brasileño y europeo. En Brasil se usa estar + gerúndio: Estou estudando português (Estoy estudiando portugués). En Portugal se prefiere estar a + infinitivo: Estou a estudar português.',
        'Ambas formas son correctas y se entienden en ambos países. Para hispanohablantes que estudian portugués brasileño, el gerúndio es más intuitivo porque se parece al español "estoy estudiando". El portugués europeo es más formal en este aspecto.',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'The gerúndio is completely regular in Portuguese — all -ndo endings, no exceptions. This is a key advantage over Spanish. Stress this point to boost learner confidence. Also clarify Brasil vs Portugal difference proactively.',
    graphicPrompt:
      'Split Brazil/Portugal map. Brasil side: "Estou estudando" with -ndo ending highlighted. Portugal side: "Estou a estudar" with "a + inf" pattern. Green Portuguese theme.',
    scene: [
      ['eu', 'Estou falando (estôu falándo) — Estoy hablando'],
      ['você', 'Você está comendo (está comêndo) — Estás comiendo'],
      ['ele/ela', 'Ele está trabalhando (trabalhándo) — Está trabajando'],
      ['nós', 'Estamos estudando (estudándo) — Estamos estudiando'],
      ['vocês/eles', 'Estão dormindo (estão dormíndo) — Están durmiendo'],
      ['PT Europa', 'Estou a falar (estôu a falár) — Estoy hablando (Portugal)'],
    ],
    learnerModes: ['recognition', 'transformation', 'gap-fill', 'production'],
    practiceVerbs: ['falar', 'comer', 'estudar', 'trabalhar', 'dormir', 'fazer'],
    reviewFocus: ['gerúndio sempre -ndo', 'estou/está/estamos/estão', 'Brasil -ndo vs Portugal a+inf'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconhecimento do gerúndio',
        tag: 'Opción múltiple',
        intro: 'Identifica la forma correcta del gerúndio o de estar + gerúndio.',
        type: 'choice',
        items: [
          { scene: 'Gerúndio -ar', lines: [['', '¿Cuál es el gerúndio de "falar" (hablar)?']], options: ['falendo', 'falndo', 'falando', 'falindo'], answer: 'falando', explain: 'falar → raíz fal- + -ando = falando. Verbos -ar siempre hacen -ando.' },
          { scene: 'Gerúndio -er', lines: [['', '¿Cuál es el gerúndio de "comer" (comer)?']], options: ['comando', 'comendo', 'comindo'], answer: 'comendo', explain: 'comer → raíz com- + -endo = comendo. Verbos -er hacen -endo.' },
          { scene: 'Estar conjugado', lines: [['', '"Ellos están trabajando": eles ___ trabalhando.']], options: ['estou', 'está', 'estamos', 'estão'], answer: 'estão', explain: 'Eles estão trabalhando. estar → estão (eles/vocês). Tercera persona plural.' },
          { scene: 'Gerúndio -ir', lines: [['', '¿Cuál es el gerúndio de "dormir" (dormir)?']], options: ['dormando', 'dormendo', 'dormindo', 'durmindo'], answer: 'dormindo', explain: 'dormir → raíz dorm- + -indo = dormindo. Verbos -ir hacen -indo.' },
          { scene: 'Eu — presente progresivo', lines: [['', '"Estoy estudiando ahora": eu ___ estudando.']], options: ['está', 'estou', 'estamos', 'estão'], answer: 'estou', explain: 'Eu estou estudando. estar → estou (primera persona singular).' },
          { scene: 'Brasil vs Portugal', lines: [['', '¿Cuál es la forma brasileña equivalente a "Estou a trabalhar" (Portugal)?']], options: ['Estou trabalhando', 'Trabalhando estou', 'Estou trabalhar', 'Estou trabalhei'], answer: 'Estou trabalhando', explain: 'Brasil: estou trabalhando = Portugal: estou a trabalhar. Ambas expresan acción en curso.' },
          { scene: 'Nós', lines: [['', '"Estamos comiendo ahora": nós ___ agora.']], options: ['estão comendo', 'estou comendo', 'estamos comendo', 'está comendo'], answer: 'estamos comendo', explain: 'Nós estamos comendo agora. estar → estamos (nós).' },
          { scene: 'Gerúndio de fazer', lines: [['', '¿Cuál es el gerúndio de "fazer" (hacer)?']], options: ['fazando', 'fazendo', 'fazindo', 'facendo'], answer: 'fazendo', explain: 'fazer → fazendo. Verbo -er irregular: raíz faz- + -endo = fazendo.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Estar + gerúndio — dois espaços',
        tag: '2 espacios',
        intro: 'Completa con estar conjugado y el gerúndio correcto.',
        type: 'dual',
        items: [
          { scene: 'Eu — estudar', lines: [['', '"Estoy estudiando portugués": eu [[0]] [[1]] português.']], blanks: [{ options: ['estou', 'está', 'estamos', 'estão'], answer: 'estou', explain: 'eu → estou. Primera persona singular de estar.' }, { options: ['estudar', 'estudando', 'estudo', 'estudindo'], answer: 'estudando', explain: 'estudar → estudando. Verbo -ar → gerúndio -ando.' }] },
          { scene: 'Ela — trabalhar', lines: [['', '"Ella está trabajando ahora": ela [[0]] [[1]] agora.']], blanks: [{ options: ['estou', 'está', 'estamos', 'estão'], answer: 'está', explain: 'ela → está. Tercera persona singular de estar.' }, { options: ['trabalhar', 'trabalhando', 'trabalhendo', 'trabalho'], answer: 'trabalhando', explain: 'trabalhar → trabalhando. Verbo -ar → gerúndio -ando.' }] },
          { scene: 'Eles — comer', lines: [['', '"Ellos están comiendo": eles [[0]] [[1]].']], blanks: [{ options: ['estou', 'está', 'estamos', 'estão'], answer: 'estão', explain: 'eles → estão. Tercera persona plural de estar.' }, { options: ['comer', 'comendo', 'comando', 'comindo'], answer: 'comendo', explain: 'comer → comendo. Verbo -er → gerúndio -endo.' }] },
          { scene: 'Nós — fazer', lines: [['', '"Estamos haciendo ejercicio": nós [[0]] exercício [[1]].']], blanks: [{ options: ['estou', 'está', 'estamos', 'estão'], answer: 'estamos', explain: 'nós → estamos. Primera persona plural de estar.' }, { options: ['fazer', 'fazendo', 'fazando', 'faz'], answer: 'fazendo', explain: 'fazer → fazendo. -er verbo: raíz faz- + -endo.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — ações em progresso',
        tag: 'Opciones',
        intro: 'Elige la forma correcta para cada espacio.',
        type: 'guidedText',
        scene: 'Na Academia WeLearn agora mesmo',
        text: 'São duas da tarde na WeLearn. Nico [[0]] uma aula de português. (está dando una clase) Os alunos [[1]] com atenção. (están escuchando) Sara [[2]] os materiais da próxima aula. (está preparando) Eu [[3]] este exercício. (estoy haciendo) Você [[4]] português agora? (¿Estás aprendiendo?)',
        blanks: [
          { options: ['está dando', 'estou dando', 'estão dando', 'estamos dando'], answer: 'está dando', explain: 'Nico (ele) → está. dar → dando (verbo -ar). Está dando = está dando.' },
          { options: ['está ouvindo', 'estão ouvindo', 'estou ouvindo', 'estamos ouvindo'], answer: 'estão ouvindo', explain: 'Os alunos (eles) → estão. ouvir → ouvindo (verbo -ir → -indo). Estão ouvindo = están escuchando.' },
          { options: ['está preparando', 'estão preparando', 'estou preparando', 'estamos preparando'], answer: 'está preparando', explain: 'Sara (ela) → está. preparar → preparando (-ar → -ando). Está preparando.' },
          { options: ['está fazendo', 'estão fazendo', 'estou fazendo', 'estamos fazendo'], answer: 'estou fazendo', explain: 'Eu → estou. fazer → fazendo (-er → -endo). Estou fazendo = Estoy haciendo.' },
          { options: ['está aprendendo', 'estou aprendendo', 'estão aprendendo', 'estamos aprendendo'], answer: 'está aprendendo', explain: 'Você → está. aprender → aprendendo (-er → -endo). Está aprendendo? = ¿Estás aprendiendo?' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto livre — escreve o progressivo',
        tag: 'Sin opciones',
        intro: 'Escribe la forma de estar + gerúndio sin opciones.',
        type: 'freeText',
        scene: 'Describindo o que acontece agora',
        text: '1. "Estoy hablando portugués": Eu [[0]] português. 2. "Ella está leyendo un libro": Ela está [[1]] um livro. 3. "Estamos comiendo": Nós [[2]] comendo. 4. "Ellos están durmiendo": Eles estão [[3]]. 5. "¿Qué estás haciendo?": O que você está [[4]]?',
        blanks: [
          { answer: 'estou falando', accepted: ['estou falando'], explain: 'falar → falando (-ar → -ando). Eu estou falando.' },
          { answer: 'lendo', accepted: ['lendo'], explain: 'ler → lendo. Verbo irregular: ler → raíz l- + -endo = lendo.' },
          { answer: 'estamos', accepted: ['estamos'], explain: 'nós → estamos. Nós estamos comendo.' },
          { answer: 'dormindo', accepted: ['dormindo'], explain: 'dormir → dormindo (-ir → -indo). Eles estão dormindo.' },
          { answer: 'fazendo', accepted: ['fazendo'], explain: 'fazer → fazendo (-er → -endo). O que você está fazendo?' },
        ],
      },
      {
        id: 'level-5',
        title: 'Produção escrita',
        tag: 'Producción',
        intro: 'Construye frases completas con estar + gerúndio.',
        type: 'write',
        items: [
          { scene: 'Descrição em tempo real', prompt: 'Traduce al portugués brasileño: "Ahora mismo Nico está enseñando portugués y los estudiantes están aprendiendo mucho." (agora mesmo = ahora mismo, ensinar = enseñar, muito = mucho)', answer: 'Agora mesmo Nico está ensinando português e os alunos estão aprendendo muito', accepted: ['está ensinando', 'estão aprendendo'], explain: 'Nico (ele) → está + ensinando (-ar). Os alunos (eles) → estão + aprendendo (-er).' },
          { scene: 'Pregunta en progresivo', prompt: 'Traduce al portugués: "¿Qué estás haciendo? ¿Estás estudiando o trabajando?" (ou = o)', answer: 'O que você está fazendo? Está estudando ou trabalhando?', accepted: ['está fazendo', 'estudando', 'trabalhando'], explain: 'fazer → fazendo; estudar → estudando; trabalhar → trabalhando. Todos -ndo.' },
          { scene: 'Negativa + progressivo', prompt: 'Traduce al portugués: "No estoy durmiendo, estoy trabajando." (não = no)', answer: 'Não estou dormindo, estou trabalhando', accepted: ['não estou dormindo', 'estou trabalhando'], explain: 'Não + estou + gerúndio. dormir → dormindo (-ir → -indo); trabalhar → trabalhando (-ar → -ando).' },
          { scene: 'Brasil vs Portugal', prompt: 'Escribe la versión brasileña y la europea: "Estoy aprendiendo portugués." (aprender = aprender)', answer: 'Brasil: Estou aprendendo português. Portugal: Estou a aprender português.', accepted: ['estou aprendendo', 'estou a aprender'], explain: 'Brasil: estou + gerúndio (aprendendo). Portugal: estou a + infinitivo (aprender). Ambas correctas.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Missão comunicativa',
        tag: 'Producción',
        intro: 'Usa estar + gerúndio para describir el momento actual.',
        type: 'write',
        items: [
          { scene: 'O que está acontecendo agora?', prompt: 'Descreve o que você e três pessoas ao seu redor estão fazendo agora. Escreve 4 frases com: eu estou, ele/ela está, nós estamos, eles estão. Vocabulário: estudar, trabalhar, comer, descansar, ouvir música, assistir (TV).', answer: 'Eu estou estudando português. Minha amiga está ouvindo música. Nós estamos aprendendo juntos. Eles estão descansando.', accepted: ['estou', 'está', 'estamos', 'estão'], explain: 'Usa as quatro formas de estar + gerúndio (-ando/-endo/-indo). Lembra: todos terminam em -ndo!' },
          { scene: 'Mensagem de voz para um amigo', prompt: 'Imagina que mandas un mensaje de voz. Describe lo que estás haciendo ahora y lo que están haciendo otras personas en tu casa/trabajo. Usa al menos 3 frases con estar + gerúndio.', answer: 'Oi! Estou estudando português na WeLearn. Meu colega está trabalhando no computador. Estamos aprendendo muito hoje!', accepted: ['estou', 'está', 'estamos'], explain: 'Mensagem natural com estar + gerúndio. O -ndo final é a marca do progressivo em português!' },
        ],
      },
    ],
  },
}

export default topic
