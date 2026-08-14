// ─── O celular virado para baixo — Historia B1–B2 en portugués ────────────────
// Adaptación nativa de «The Locked Phone» en portugués de Brasil (es la variante
// que enseña WeLearn y la del Celpe-Bras). Enunciados en portugués, explicaciones
// en español.
//
// AUDIO: /audio/historias/portugues/o-celular-virado-para-baixo/{a,b}.mp3
// a con voz de mujer (Bia), b con voz de hombre (Rafael).

import type { Historia, StoryQuestion as Question } from '../types';

const DICT: Record<string, string> = {
  celular: 'celular / móvil',
  tela: 'pantalla',
  notificação: 'notificación',
  mensagem: 'mensaje',
  mensagens: 'mensajes',
  virado: 'volteado / boca abajo',
  virou: 'volteó',
  vira: 'voltea',
  acendeu: 'se encendió',
  acende: 'se enciende',
  jantar: 'cena / cenar',
  mesa: 'mesa',
  cozinha: 'cocina',
  sofá: 'sofá',
  fotos: 'fotos',
  cachorro: 'perro',
  localização: 'ubicación',
  trabalho: 'trabajo',
  sextafeira: 'viernes',
  sábado: 'sábado',
  primavera: 'primavera',
  mudaram: 'se mudaron',
  reparou: 'notó / se dio cuenta',
  brincando: 'bromeando',
  brincadeira: 'broma',
  recusou: 'se negó / rechazó',
  recusa: 'negativa / rechazo',
  entregar: 'entregar (algo en mano)',
  ofereceu: 'ofreció',
  responder: 'responder',
  resposta: 'respuesta',
  privacidade: 'privacidad',
  privado: 'privado',
  limite: 'límite',
  limites: 'límites',
  princípio: 'principio',
  princípios: 'principios',
  confiança: 'confianza',
  desconfiança: 'desconfianza',
  suspeita: 'sospecha',
  suspeito: 'sospechoso',
  culpado: 'culpable',
  inocente: 'inocente',
  prova: 'prueba',
  provas: 'pruebas',
  provar: 'demostrar / probar',
  investigação: 'investigación',
  investigado: 'investigado',
  esconder: 'esconder / ocultar',
  escondido: 'escondido',
  ciumento: 'celoso',
  ciúme: 'celos',
  magoada: 'dolida / herida',
  magoado: 'dolido / herido',
  segurança: 'seguridad / tranquilidad',
  tranquilizar: 'tranquilizar',
  defensiva: 'a la defensiva',
  cansativo: 'agotador / cansador',
  namorada: 'novia',
  namorado: 'novio',
  relacionamento: 'relación (de pareja)',
  sinceramente: 'sinceramente',
  honestamente: 'honestamente',
  aparentemente: 'aparentemente / al parecer',
  praticamente: 'prácticamente',
  realmente: 'de verdad / realmente',
  derepente: 'de repente',
  enfim: 'en fin / total',
  ninguém: 'nadie',
  costume: 'costumbre / hábito',
  cobrança: 'reclamo / exigencia',
  gesto: 'gesto',
  acesso: 'acceso',
  controle: 'control',
  controlar: 'controlar',
  regra: 'regla / norma',
  verdade: 'verdad',
  mentira: 'mentira',
  mentiroso: 'mentiroso',
  discurso: 'discurso',
  pior: 'peor',
  desculpar: 'disculparse',
  desculpa: 'disculpa / perdón',
  ironia: 'ironía',
  retórica: 'retórica',
  tom: 'tono',
  jeito: 'manera / forma de ser',
  coisa: 'cosa',
  gente: 'gente / nosotros (coloquial)',
};

const NARRATOR_PARAGRAPHS = [
  'A Bia e o Rafael estão juntos há dois anos. Na primavera passada foram morar no mesmo apartamento.',
  'Na sexta-feira, durante o jantar, o celular do Rafael acendeu em cima da mesa e ele virou o aparelho para baixo sem dizer nada.',
  'A Bia reparou. Na hora, não falou nada.',
  'Mais tarde, meio brincando, ela perguntou se podia dar uma olhada no celular dele.',
  'O Rafael disse que não.',
  'Ele não estava bravo. Explicou que o celular dele é uma coisa privada e que não entrega para ninguém — nem para ela.',
  'No lugar disso, ofereceu responder qualquer pergunta que ela quisesse fazer.',
  'A Bia respondeu que uma recusa já é uma resposta.',
  'Naquela noite nenhum dos dois dormiu direito, e no sábado de manhã os dois já estavam contando a história para outra pessoa.',
];

const A_PARAGRAPHS = [
  'Preciso falar isso em voz alta, senão eu vou ficar maluca.',
  'Você sabe como o Rafael é com o celular. Ele larga o celular em qualquer lugar. No sofá, na bancada da cozinha, com a tela virada para cima, nunca foi problema.',
  'Aí, na sexta, a gente está jantando, o celular dele acende, e ele vira o aparelho.',
  'Tela para baixo.',
  'Sem nem olhar para mim.',
  'E eu fiquei ali uma hora fingindo que não era nada.',
  'Aí mais tarde eu falo, meio de brincadeira: "deixa eu ver o seu celular".',
  'E ele: "não".',
  'Não foi "claro, toma". Não foi "por quê?". Foi só não.',
  'Dois anos juntos, e a resposta é não?',
  'E aí ele começa a falar de privacidade, de princípios, de limites.',
  'Limites. Ah, faça-me o favor.',
  'Eu não ia ler as mensagens dele. Eu queria ver ele me entregando o celular. O teste era isso.',
  'Porque se você não tem nada para esconder, por que te custa tanto mostrar?',
  'E quanto mais ele explicava, pior ficava.',
  'Ninguém prepara um discurso sobre privacidade se já não tiver pensado nisso antes.',
  'Ele ficava repetindo: "me pergunta o que você quiser, eu te falo a verdade".',
  'Ótimo. Então eu tenho que confiar justo em quem não me deixa conferir.',
  'E agora ele age como se a errada fosse eu.',
  'Pelo visto eu "passei do limite".',
  'Eu passei do limite.',
  'Sinceramente, se ele tivesse simplesmente entregado, eu provavelmente nem teria aberto.',
  'É exatamente essa parte que me mata.',
];

const B_PARAGRAPHS = [
  'Cara, eu nem sei como contar isso sem parecer o vilão da história.',
  'Sexta à noite. Jantar. Meu celular acende, eu viro ele para baixo.',
  'Eu sempre deixo o celular com a tela para baixo quando a gente come. Faço isso desde os dezenove anos.',
  'Pelo visto agora isso virou prova.',
  'Mais tarde ela pede para ver o meu celular.',
  'E olha — não tem nada nesse celular. Nada mesmo.',
  'Grupo do trabalho, minha mãe, resultado de jogo, quarenta fotos do cachorro.',
  'Mas não é essa a questão.',
  'A questão é que eu não entrego o meu celular para provar que eu não sou mentiroso.',
  'Porque depois que você faz isso uma vez, aquilo vira o normal, né?',
  'Esse mês o celular. Mês que vem a minha localização, e depois com quem eu almocei.',
  'Eu falei para ela: me pergunta o que você quiser. Qualquer coisa mesmo. Eu respondo.',
  'Ela não queria resposta. Ela queria o celular.',
  'E eu entendo, viu. Eu sei que ela já foi magoada, e o ex dela foi realmente horrível.',
  'Mas eu não sou ele.',
  'Estão me investigando por uma coisa que outra pessoa fez.',
  'E agora o suspeito sou eu, porque eu disse não.',
  'Essa é a parte que eu não consigo engolir.',
  'Se dizer não já te deixa culpado, então não existe resposta que funcione.',
  'Olha — talvez eu pudesse ter lidado melhor com aquele momento. Talvez.',
  'Mas eu não vou pedir desculpa por ter um limite.',
];

const NARRATOR_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: 'O narrador diz que o celular «acendeu em cima da mesa». O que isso quer dizer?',
    opts: [
      'O celular pegou fogo',
      'A tela ligou sozinha porque chegou uma mensagem',
      'O Rafael pegou o celular e desbloqueou',
      'O celular estava com o brilho muito alto naquela noite',
    ],
    correct: 1,
    explanation:
      '«Acender» describe una pantalla que se enciende sola, normalmente porque acaba de llegar una notificación. Es el detonante de todo lo demás.',
  },
  {
    type: 'Inferencia',
    q: 'A Bia pergunta «meio brincando». O que essa escolha de palavras sugere?',
    opts: [
      'A Bia não tinha interesse real no celular',
      'A Bia queria zoar o Rafael para magoá-lo',
      'O pedido veio embrulhado numa brincadeira, mas com uma intenção de verdade atrás',
      'A Bia já tinha olhado o celular naquela semana',
    ],
    correct: 2,
    explanation:
      '«Meio brincando» deja a los dos margen para leer el momento de forma distinta: ella puede decir que solo bromeaba; él puede oír una acusación seria. Esa ambigüedad es donde empieza la pelea.',
  },
  {
    type: 'Comprensión',
    q: 'O que o Rafael ofereceu em vez de entregar o celular?',
    opts: [
      'Apagar as mensagens na frente dela',
      'Responder qualquer pergunta que ela quisesse fazer',
      'Mostrar só as fotos',
      'Entregar o celular no dia seguinte',
    ],
    correct: 1,
    explanation:
      'El narrador dice: «ofereceu responder qualquer pergunta que ela quisesse fazer». Rafael separa dos cosas que Bia trata como una sola: dar información y dar acceso.',
  },
  {
    type: 'Pensamiento crítico',
    q: '«Uma recusa já é uma resposta.» Que suposição está por trás dessa frase?',
    opts: [
      'Que quem recusa normalmente está cansado ou ocupado',
      'Que um inocente teria aceitado, então o não já é prova de culpa',
      'Que o Rafael tinha prometido dividir o celular',
      'Que recusar em português é sempre grosseiro',
    ],
    correct: 1,
    explanation:
      'Bia trata la negativa como prueba. La suposición escondida —«el inocente acepta»— deja a Rafael sin ninguna forma de demostrar su inocencia, que es justo lo que él denuncia después.',
  },
];

const A_QS: Question[] = [
  {
    type: 'Comprensión',
    q: 'Segundo a Bia, o que ela realmente queria ao pedir o celular?',
    opts: [
      'Ler dois anos de mensagens',
      'Descobrir quem tinha mandado a notificação no jantar',
      'Ver ele entregando por vontade própria — o pedido era um teste',
      'Conferir o histórico de localização',
    ],
    correct: 2,
    explanation:
      'Lo dice sin rodeos: «Eu não ia ler as mensagens dele. Eu queria ver ele me entregando o celular.» Para ella contaba el gesto, no el contenido.',
  },
  {
    type: 'Inferencia',
    q: '«Se você não tem nada para esconder, por que te custa tanto?» Onde está o problema dessa pergunta retórica?',
    opts: [
      'Ela está gramaticalmente errada',
      'Ela iguala recusa a culpa: nenhuma resposta do Rafael pode inocentá-lo',
      'Ela mostra que a Bia já sabe o que tem no celular',
      'Ela prova que a Bia não se importa com o relacionamento',
    ],
    correct: 1,
    explanation:
      'Una pregunta retórica no espera respuesta: dicta un veredicto. La lógica está cerrada — aceptar parece prueba, negarse parece culpa. Rafael nombra la misma trampa desde su lado.',
  },
  {
    type: 'Tono',
    q: 'Como você descreveria melhor o tom do áudio da Bia?',
    opts: [
      'Calmo, medido e analítico',
      'Formal e profissional',
      'Bravo e sarcástico, mas emoldurado por dúvida e mágoa',
      'Leve e bem-humorado do começo ao fim',
    ],
    correct: 2,
    explanation:
      'El sarcasmo es real («Limites. Ah, faça-me o favor.»), pero mira el marco: abre con «senão eu vou ficar maluca» y cierra con «é essa parte que me mata». La rabia está montada encima del dolor.',
  },
  {
    type: 'Vocabulario',
    q: '«Limites. Ah, faça-me o favor.» O que a Bia está fazendo aqui?',
    opts: [
      'Concordando educadamente que limites importam num relacionamento',
      'Repetindo a palavra dele de forma sarcástica para descartá-la como desculpa',
      'Pedindo para ele explicar a palavra',
      'Citando uma terapeuta',
    ],
    correct: 1,
    explanation:
      'Devolver la palabra del otro suelta, con un «faça-me o favor» detrás, es un recurso sarcástico habitual en portugués hablado: rechaza la palabra misma por falsa o pretenciosa.',
  },
  {
    type: 'Registro',
    q: 'A Bia diz: Pelo visto eu «passei do limite». Por que ela usa aspas?',
    opts: [
      'Está citando um texto jurídico',
      'Está citando as palavras dele para se distanciar e mostrar que rejeita a acusação',
      'Em português essa expressão sempre pede aspas',
      'Ela não sabe como traduzir',
    ],
    correct: 1,
    explanation:
      'Son comillas de distancia. Al repetir la frase y luego decirla en seco —«Eu passei do limite.»— deja claro que la acusación es de él, no suya, y que le parece absurda. El «pelo visto» refuerza lo mismo.',
  },
];

const B_QS: Question[] = [
  {
    type: 'Comprensión',
    q: 'Que motivo o Rafael dá para a recusa?',
    opts: [
      'Tem mensagens que ele não quer que ela veja',
      'O celular é da empresa dele',
      'Não que ele esconda algo — mas que aceitar uma vez criaria uma cobrança permanente',
      'Ele tinha esquecido a senha',
    ],
    correct: 2,
    explanation:
      'Insiste en que el contenido es irrelevante («não tem nada nesse celular») y construye su negativa alrededor de lo que el acto establecería hacia adelante, no de lo que revelaría.',
  },
  {
    type: 'Vocabulario',
    q: '«Esse mês o celular. Mês que vem a minha localização.» Que técnica de argumentação é essa?',
    opts: [
      'Ladeira escorregadia — uma concessão pequena é apresentada como o início de uma corrente',
      'Uma citação exata do que a Bia exigiu',
      'Um pedido de desculpa pelo comportamento no jantar',
      'Um relato de fatos que já aconteceram',
    ],
    correct: 0,
    explanation:
      'La pendiente resbaladiza («ladeira escorregadia») predice una reacción en cadena a partir de un primer paso. Convence — pero fíjate en que describe un futuro que él imagina, no hechos ocurridos.',
  },
  {
    type: 'Inferencia',
    q: '«Estão me investigando por uma coisa que outra pessoa fez.» O que essa frase revela?',
    opts: [
      'A polícia está mesmo investigando o Rafael',
      'O Rafael acha que está pagando pelo comportamento do ex da Bia',
      'O Rafael fez a mesma coisa que o ex dela',
      'O Rafael quer que a Bia procure o ex',
    ],
    correct: 1,
    explanation:
      'La metáfora judicial («investigando», «suspeito», «prova») recorre todo su relato. Se retrata como acusado injustamente: pagando por una historia que no es la suya.',
  },
  {
    type: 'Pensamiento crítico',
    q: '«Se dizer não já te deixa culpado, então não existe resposta que funcione.» O que o Rafael está apontando?',
    opts: [
      'Que a Bia nunca faz perguntas para ele',
      'Que o pedido não pode ser cumprido de forma honesta: qualquer reação confirma a suspeita',
      'Que ele quer terminar o relacionamento',
      'Que ele não entendeu a pergunta',
    ],
    correct: 1,
    explanation:
      'Está señalando una sospecha infalsable: ninguna prueba podría refutarla. Es el espejo exacto de la pregunta retórica de Bia — la misma lógica, vista desde el otro lado.',
  },
  {
    type: 'Tono',
    q: '«Talvez eu pudesse ter lidado melhor com aquele momento. Talvez.» O que o «talvez» repetido faz?',
    opts: [
      'Assume a responsabilidade por inteiro',
      'Mostra confusão total sobre o que aconteceu',
      'Dá uma concessão mínima e a retira em seguida — uma frase em forma de desculpa que não admite nada',
      'Mostra arrependimento verdadeiro e vontade de mudar',
    ],
    correct: 2,
    explanation:
      'El primer «talvez» abre una puerta; el segundo la cierra. Concede la forma, nunca la decisión — y la frase siguiente («Mas eu não vou pedir desculpa…») lo confirma.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Síntesis',
    q: 'Qual detalhe é confirmado pelas DUAS versões?',
    opts: [
      'O Rafael recebeu mensagem de outra mulher',
      'A Bia já tinha lido parte da conversa antes de pedir',
      'O Rafael virou o celular para baixo no jantar',
      'O Rafael pediu desculpa na manhã seguinte',
    ],
    correct: 2,
    explanation:
      'El celular boca abajo es el único hecho objetivo que cuentan los dos. Su significado está en disputa total: para ella es una reacción, para él una costumbre que tiene desde los diecinueve.',
  },
  {
    type: 'Perspectiva',
    q: 'A Bia chama o pedido de «teste». O Rafael diz que está sendo «investigado». O que essa distância mostra?',
    opts: [
      'Um dos dois está mentindo de propósito sobre a noite',
      'A mesma ação ganha sentidos opostos conforme o que cada um acha que ela simboliza',
      'Nenhum dos dois lembra bem da noite',
      'O Rafael usa um vocabulário mais culto que a Bia',
    ],
    correct: 1,
    explanation:
      'Intención frente a impacto. Ella buscaba un gesto pequeño de tranquilidad; él vivió una acusación que exigía pruebas. Ninguno inventa la noche: describen experiencias distintas de la misma noche.',
  },
  {
    type: 'Pensamiento crítico',
    q: 'Qual é a causa RAIZ mais exata desse conflito?',
    opts: [
      'O Rafael esconde alguma coisa no celular',
      'A Bia é simplesmente ciumenta',
      'O casal nunca combinou o que privacidade significa entre eles, até isso ser testado',
      'O ex da Bia',
    ],
    correct: 2,
    explanation:
      '¿Compartir el celular es normal en esta pareja o no? Nadie lo había decidido nunca. La regla se inventó en mitad de la discusión, y por eso los dos sienten que el otro la rompió.',
  },
  {
    type: 'Registro',
    q: 'A Bia diz que o Rafael a acusa de ter «passado do limite». O Rafael diz que não pede desculpa «por ter um limite». O que essa metáfora compartilhada mostra?',
    opts: [
      'Os dois estão citando o mesmo filme',
      'Os dois usam a mesma imagem de limite para defender posições opostas — cada um se vê como quem protege uma fronteira',
      '«Limite» significa coisas completamente diferentes nos dois casos',
      'Prova que o Rafael copia o vocabulário da Bia',
    ],
    correct: 1,
    explanation:
      'La misma imagen —una línea que no se cruza— hace trabajos opuestos en cada relato. En la mayoría de los conflictos de pareja, los dos creen estar defendiendo un límite, no atacándolo.',
  },
  {
    type: 'Inferencia',
    q: '«Se ele tivesse simplesmente entregado, eu nem teria aberto.» O que essa frase revela?',
    opts: [
      'A Bia mentiu quando disse que queria ver o celular',
      'A Bia queria segurança, não informação — e a única coisa que daria isso a ela era exatamente o gesto que o Rafael recusa por princípio',
      'A Bia já tinha aberto o celular antes',
      'A Bia não sabe a senha dele',
    ],
    correct: 1,
    explanation:
      'Aquí está la trampa central de la historia. Ella necesitaba un gesto; él solo podía ver un precedente. No había ninguna versión de esa noche en la que los dos consiguieran lo que necesitaban.',
  },
];

const KEY_LANGUAGE = [
  { phrase: 'acender (a tela)', meaning: 'que la pantalla se encienda sola al llegar una notificación' },
  { phrase: 'virar para baixo', meaning: 'poner boca abajo — acto literal, significado simbólico' },
  { phrase: 'meio brincando', meaning: 'medio en broma: deja abiertas dos lecturas del mismo acto' },
  { phrase: 'ladeira escorregadia', meaning: 'argumento de que una concesión pequeña lleva a otras peores' },
  { phrase: 'Pelo visto eu «…»', meaning: 'comillas de distancia: repites la acusación ajena sin asumirla' },
  { phrase: 'Talvez… Talvez.', meaning: 'no-disculpa: concede la forma y retira el fondo' },
];

export const oCelularViradoParaBaixo: Historia = {
  slug: 'o-celular-virado-para-baixo',
  lang: 'portugues',
  icon: '📵',
  color: '#be185d',
  level: 'B1–B2',
  title: 'O celular virado para baixo',
  tagline: 'Ella pidió ver el celular. Él dijo que no. Dos versiones del mismo viernes.',
  metaTitle: 'O celular virado para baixo — comprensión en portugués B1–B2',
  metaDescription:
    
    
    'Ella pidió ver el celular. Él dijo que no. Dos versiones del mismo viernes. Dos audios, transcripción y 19 preguntas en portugués B1–B2.',
  intro:
    'Una pareja, un celular y dos versiones completamente distintas del mismo viernes por la noche. Lee el relato del narrador, escucha las dos notas de voz y responde 19 preguntas de vocabulario, inferencia, tono y pensamiento crítico.',
  narrator: {
    paragraphs: NARRATOR_PARAGRAPHS,
    questions: NARRATOR_QS,
    tip: 'Fíjate en lo poco que pasó de verdad: nadie leyó un mensaje, nadie pilló a nadie. Toda la discusión está hecha de detalles mínimos y del significado que cada uno les da. Vigila también las palabras del narrador: tampoco es neutral.',
  },
  voices: [
    {
      key: 'a',
      name: 'Bia',
      role: 'a namorada',
      sex: 'female',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/portugues/o-celular-virado-para-baixo/a.mp3',
      paragraphs: A_PARAGRAPHS,
      questions: A_QS,
      listenHint: 'Escucha con atención. Todavía no hay transcripción — concéntrate en lo que puedas entender.',
      transcriptHint: 'las marcas y ves su traducción. Después vuelve a escribir lo que entendiste.',
      write1Prompt: 'Sin mirar ninguna transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Bia.',
      write1Hint: 'No te preocupes por que salga perfecto: es una primera impresión. Escribe en español o en portugués.',
      write2Prompt: 'Ahora escríbelo otra vez — esta vez puedes entrar en más detalle.',
    },
    {
      key: 'b',
      name: 'Rafael',
      role: 'o namorado',
      sex: 'male',
      color: '#7c3aed',
      audioSrc: '/audio/historias/portugues/o-celular-virado-para-baixo/b.mp3',
      paragraphs: B_PARAGRAPHS,
      questions: B_QS,
      listenHint: 'Escucha primero sin transcripción. Rafael repite un detalle que Bia también menciona: búscalo.',
      transcriptHint: 'compara la versión de Rafael con la de Bia: ¿qué detalles cuentan los dos? ¿Dónde se contradicen?',
      write1Prompt: 'Sin la transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Rafael.',
      write1Hint: 'Esta es la otra cara de la historia. ¿Qué dice él que pasó? Escribe en español o en portugués.',
      write2Prompt: 'Ahora escribe otra vez lo que entendiste desde la perspectiva de Rafael.',
    },
  ],
  finalQuestions: FINAL_QS,
  finalIntro: [
    'Ahora sabes algo que ninguno de los dos sabe: has oído las dos versiones. Estas preguntas te piden ponerlas una al lado de la otra — qué detalles sobreviven en las dos, dónde tiene razón cada uno y dónde tener razón no es lo mismo que ser justo.',
    'Fíjate en las palabras que los dos eligen. Cuando dos personas usan la misma imagen para defender posiciones opuestas, ahí suele estar escondido el desacuerdo de verdad.',
  ],
  dict: DICT,
  keyLanguage: KEY_LANGUAGE,
  discussion: {
    question: '¿Negarse es lo mismo que esconder? ¿Y puede una petición ser razonable y aun así injusta?',
    note: 'No hay una única respuesta correcta. Lo que se evalúa es defender tu posición con evidencia de los textos: palabras, frases y detalles concretos de cada versión. Eso es exactamente lo que pide un B2 en portugués — y lo que mide la parte oral del Celpe-Bras.',
  },
  ui: 'es',
};

export default oCelularViradoParaBaixo;
