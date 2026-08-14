// ─── O caderno do avô — Historia B1–B2 en portugués ───────────────────────────
// Adaptación nativa de «The Grandfather's Ledger» en portugués de Brasil. Quien
// reclama los regalos es el ABUELO (Sérgio) en las tres capas: narrador,
// transcripciones y preguntas.
//
// AUDIO: /audio/historias/portugues/o-caderno-do-avo/{a,b}.mp3
// a con voz de mujer (Camila), b con voz de hombre mayor (Sérgio).

import type { Historia, StoryQuestion as Question } from '../types';

const DICT: Record<string, string> = {
  caderno: 'cuaderno / libreta',
  planilha: 'hoja de cálculo',
  tabela: 'tabla',
  recibo: 'recibo',
  recibos: 'recibos',
  notinha: 'tiquecito / comprobante',
  carrinho: 'cochecito de bebé',
  quartinho: 'cuartito del bebé',
  berço: 'cuna',
  cômoda: 'cómoda',
  móveis: 'muebles',
  brinquedos: 'juguetes',
  faculdade: 'universidad',
  poupança: 'ahorro / cuenta de ahorro',
  fundo: 'fondo (de dinero)',
  avô: 'abuelo',
  avó: 'abuela',
  neto: 'nieto',
  netinho: 'nietecito',
  nora: 'nuera',
  sogro: 'suegro',
  grávida: 'embarazada',
  gravidez: 'embarazo',
  patrimônio: 'patrimonio',
  bens: 'bienes',
  investiu: 'invirtió',
  investimento: 'inversión',
  generoso: 'generoso',
  generosidade: 'generosidad',
  pãoduro: 'tacaño (coloquial)',
  ganancioso: 'codicioso',
  vilão: 'villano / el malo de la película',
  monstro: 'monstruo',
  inventário: 'inventario',
  estoque: 'existencias / stock',
  galpão: 'galpón / almacén',
  organizado: 'organizado',
  papelada: 'papeleo',
  atitude: 'actitud',
  reconhecimento: 'reconocimiento',
  gratidão: 'gratitud',
  passar: 'pasar (a otro)',
  passado: 'pasado / heredado',
  geração: 'generación',
  gerações: 'generaciones',
  recusou: 'se negó / rechazó',
  recusa: 'negativa',
  chocado: 'impactado / sorprendido',
  pasmo: 'atónito',
  indignada: 'indignada',
  defensiva: 'a la defensiva',
  cobrança: 'reclamo / exigencia',
  briga: 'pelea / discusión',
  conflito: 'conflicto',
  intenção: 'intención',
  premeditado: 'premeditado',
  premeditação: 'premeditación',
  prova: 'prueba',
  percepção: 'percepción',
  suposição: 'suposición',
  expectativa: 'expectativa',
  condição: 'condición',
  incondicional: 'incondicional',
  presente: 'regalo',
  presentes: 'regalos',
  empréstimo: 'préstamo',
  razoável: 'razonable',
  justo: 'justo',
  justiça: 'justicia',
  absurdo: 'absurdo',
  surreal: 'surrealista / de locos',
  crime: 'crimen / delito',
  desculpa: 'excusa / disculpa',
  ironia: 'ironía',
  sarcasmo: 'sarcasmo',
  retórica: 'retórica',
  tom: 'tono',
  aparentemente: 'aparentemente / al parecer',
  pelovisto: 'por lo visto',
  derepente: 'de repente',
  honestamente: 'honestamente',
  financeiramente: 'económicamente',
  apareceu: 'apareció / se presentó',
  zoando: 'burlándose (coloquial)',
  realmente: 'de verdad / realmente',
};

const NARRATOR_PARAGRAPHS = [
  'Há três anos, quando o pequeno Théo nasceu, foi o avô Sérgio quem mais gastou na família inteira.',
  'Ele comprou quase tudo: um carrinho de bebê caríssimo, todos os móveis do quartinho, brinquedos caros — e até abriu uma poupança para a faculdade.',
  'Todo mundo achou que ele estava sendo simplesmente generoso.',
  'Aí a filha do Sérgio, a Paula, anunciou que estava grávida.',
  'De repente, o Sérgio começou a comentar que algumas coisas do Théo podiam ser «divididas» com o bebê que vinha.',
  'Algumas semanas depois, ele apareceu na casa do filho e da nora com uma planilha listando cada presente caro que já tinha comprado.',
  'Pediu de volta milhares de reais em coisas.',
  'A nora disse que não.',
  'Agora os dois lados contam versões muito diferentes do que aconteceu.',
];

const A_PARAGRAPHS = [
  'Amiga, eu ainda estou tremendo.',
  'Você lembra que o pai do Bruno comprou tudo quando o Théo nasceu? O carrinho, os móveis do quartinho, todos aqueles presentes caros que ele fazia questão de comprar.',
  'Então me explica por que esse homem apareceu aqui em casa ontem com uma planilha impressa.',
  'Uma planilha.',
  'Não é brincadeira, não.',
  'Ele sentou na mesa da minha cozinha e começou a ir item por item, como se estivesse fazendo inventário de estoque num galpão.',
  'O carrinho. O berço. A cômoda. Até o dinheiro que ele tinha colocado na poupança da faculdade do Théo.',
  'E aí ele fala, sério mesmo: "eu acho justo que uma parte disso vá para o bebê da Paula agora".',
  'E eu sentada ali pensando... justo para quem?',
  'Porque o Théo usa essas coisas. Todo dia.',
  'Não são caixas paradas no depósito. São as coisas dele.',
  'Aí ele começa a dizer que investiu muito dinheiro e que patrimônio de família tem que ficar na família.',
  'Patrimônio de família?',
  'Olha, senhor, aquele é o seu neto, não uma carteira de imóveis.',
  'E aí ele tira os recibos.',
  'Recibos.',
  'De três anos atrás.',
  'Quem guarda recibo de presente de bebê, se não acha que vai pegar de volta um dia?',
  'A coisa toda foi surreal.',
  'O pior é que ele ficou genuinamente pasmo quando eu disse não.',
  'Como se ele realmente esperasse que eu devolvesse as coisas do meu filho porque vem outro neto por aí.',
  'Eu juro: se ele tivesse simplesmente perguntado se tinha alguma coisa que o Théo já não usa, eu teria ajudado com o maior prazer.',
  'Mas aparecer com papelada e um plano de recuperação?',
  'De jeito nenhum.',
];

const B_PARAGRAPHS = [
  'Eu preciso contar para alguém o que realmente aconteceu, porque pelo visto agora o vilão sou eu.',
  'Há três anos, quando o Théo nasceu, eu gastei uma fortuna para ajudar esses meninos.',
  'Uma fortuna.',
  'Não porque alguém me obrigou. Porque eu queria que o meu neto tivesse tudo.',
  'Só os móveis do quartinho custaram mais que o meu primeiro carro.',
  'Eu reclamei? Não.',
  'Eu pedi reconhecimento alguma vez? Não.',
  'Agora a minha filha Paula está esperando o primeiro filho, e está apertada financeiramente.',
  'Aí eu pensei que algumas das coisas caras que quase não são mais usadas podiam ser passadas adiante.',
  'Como as famílias fazem há gerações.',
  'Em vez disso, a Camila reagiu como se eu estivesse tentando assaltar um banco.',
  'Eu nunca disse que queria tudo de volta.',
  'Eu disse que talvez a gente pudesse conversar sobre dividir algumas das coisas maiores.',
  'Mas no segundo em que eu falei do carrinho, ela ficou na defensiva.',
  'E honestamente?',
  'O que me incomodou nem foram as coisas.',
  'Foi a atitude.',
  'A falta total de reconhecimento.',
  'Durante três anos eu vi eles aproveitando coisas que eu paguei, e no momento em que eu proponho ajudar outro neto, de repente eu virei um velho ganancioso.',
  'E todo mundo zoando a minha planilha.',
  'Desculpa aí por eu ser organizado.',
  'Quando se fala de dezenas de milhares de reais, talvez anotar as coisas não seja a maior loucura do mundo.',
  'Eu não estava tentando tirar nada do Théo.',
  'Eu estava tentando ajudar a Paula.',
  'Mas nessa família, pelo visto, isso agora virou crime.',
];

const NARRATOR_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: 'O narrador diz que o Sérgio comprou «um carrinho de bebê caríssimo». O que essa escolha sinaliza?',
    opts: [
      'Ele comprava coisas práticas, baratas e sem marca',
      'Ele gastava valores altos, em produtos caros e de ponta',
      'Ele preferia comprar tudo usado para economizar',
      'Ele só comprava em promoção, aproveitando as liquidações',
    ],
    correct: 1,
    explanation:
      'El superlativo «caríssimo» marca producto caro y de gama alta. Indica que Sérgio gastó muchísimo más de lo que gasta quien simplemente hace un regalo.',
  },
  {
    type: 'Inferencia',
    q: 'O narrador usa «De repente» para descrever a mudança do Sérgio. O que isso implica?',
    opts: [
      'A mudança foi gradual e esperada há muito tempo por todos na família',
      'O Sérgio sempre planejou pegar as coisas de volta, desde o dia da compra',
      'A virada veio logo depois de um evento específico: a gravidez da filha',
      'A Paula pediu as coisas pessoalmente ao Sérgio, e ele só repassou o recado',
    ],
    correct: 2,
    explanation:
      '«De repente» contrasta con tres años de generosidad e implica que la motivación de Sérgio cambió justo cuando su propia hija quedó embarazada — no poco a poco.',
  },
  {
    type: 'Comprensión',
    q: 'O que a planilha do Sérgio continha?',
    opts: [
      'Uma lista de compras futuras para o novo bebê',
      'Cada presente caro que ele já tinha comprado',
      'O orçamento da casa',
      'Um contrato entre o Sérgio e o filho',
    ],
    correct: 1,
    explanation:
      'El narrador dice: «com uma planilha listando cada presente caro que já tinha comprado».',
  },
  {
    type: 'Pensamiento crítico',
    q: '«Todo mundo achou que ele estava sendo simplesmente generoso.» O que a palavra «simplesmente» sugere?',
    opts: [
      'O Sérgio era claramente generoso, sem nenhuma segunda intenção escondida naquela época',
      'Talvez houvesse mais por trás daquela generosidade do que parecia na época',
      'A família sempre soube que o Sérgio impunha condições e ninguém se surpreendeu',
      'O Sérgio tentava controlar a família abertamente, e todo mundo percebia isso',
    ],
    correct: 1,
    explanation:
      '«Simplesmente» sugiere que las apariencias engañaban: deja abierta la posibilidad de que aquella generosidad llevara condiciones que nadie vio hasta ahora.',
  },
];

const A_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: 'A Camila compara a visita do Sérgio a «inventário de estoque num galpão». O que essa comparação faz?',
    opts: [
      'Metáfora — o Sérgio realmente mexeu nos móveis dela, item por item, como num galpão',
      'Comparação — ela o pinta frio e comercial, tratando presentes como mercadoria recuperável',
      'Hipérbole — ela só está exagerando para fazer graça e ninguém leva a sério',
      'Personificação — ela dá traços humanos à planilha, como se o papel decidisse tudo',
    ],
    correct: 1,
    explanation:
      'La comparación le quita a la visita todo el calor familiar. Equipararla a un recuento de almacén muestra que Camila vivió la escena como una transacción, no como una conversación de familia.',
  },
  {
    type: 'Inferencia',
    q: '«Quem guarda recibo de presente de bebê?» O que essa pergunta retórica sugere?',
    opts: [
      'Que todo mundo deveria guardar recibos de compras caras, para o caso de precisar trocar depois',
      'Que o Sérgio é só muito organizado com papelada, e guardar nota fiscal não quer dizer nada demais',
      'Que os recibos provam que o Sérgio pensava em pegar as coisas de volta desde o começo',
      'Que a Camila perdeu os próprios recibos e por isso não pode conferir os valores',
    ],
    correct: 2,
    explanation:
      'Una pregunta retórica no espera respuesta: dicta un veredicto. Camila la usa para convertir los recibos en prueba de premeditación, no en simple orden.',
  },
  {
    type: 'Tono',
    q: 'Como você descreveria melhor o tom do áudio da Camila?',
    opts: [
      'Calmo e analítico, como quem expõe um problema de trabalho',
      'Carregado de emoção, indignado e incrédulo',
      'Triste e arrependido por ter respondido daquele jeito ao sogro',
      'Formal e profissional, do jeito de quem discute um contrato',
    ],
    correct: 1,
    explanation:
      '«Eu ainda estou tremendo», las frases de una sola palabra («Uma planilha.», «Recibos.») y el sarcasmo («não uma carteira de imóveis») marcan indignación emocional, no análisis.',
  },
  {
    type: 'Comprensión',
    q: 'Segundo a Camila, que pedido do Sérgio TERIA sido aceitável?',
    opts: [
      'Trazer uma planilha detalhada de todos os presentes já comprados',
      'Exigir o carrinho e o berço de volta na hora',
      'Perguntar se tinha alguma coisa que o Théo já não usa',
      'Mandar um pedido formal por escrito antes da visita',
    ],
    correct: 2,
    explanation:
      'Ella lo dice: «se ele tivesse simplesmente perguntado se tinha alguma coisa que o Théo já não usa, eu teria ajudado com o maior prazer». El CÓMO pesó tanto como el QUÉ.',
  },
  {
    type: 'Registro',
    q: '«Olha, senhor, aquele é o seu neto, não uma carteira de imóveis.» O que a Camila está fazendo?',
    opts: [
      'Falando a sério sobre o negócio imobiliário dele, já que ele mesmo trata o neto como um investimento',
      'Usando ironia e um «senhor» repentino para expor o jeito comercial com que ele trata a família',
      'Concordando educadamente com o ponto de vista dele, só que num tom mais frio',
      'Citando a planilha palavra por palavra, do jeito exato em que ele leu na mesa',
    ],
    correct: 1,
    explanation:
      'Dos golpes a la vez: el vocabulario financiero («carteira de imóveis») se burla de su forma de tratar a la familia como cartera de inversión, y el «senhor» repentino convierte la cortesía en distancia.',
  },
];

const B_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: 'O Sérgio diz que as coisas podiam ser «passadas adiante». A que tradição essa expressão remete?',
    opts: [
      'Devolver um produto na loja e pegar o dinheiro de volta dentro do prazo de troca',
      'O costume familiar de repassar bens de um parente para outro ao longo das gerações',
      'Um processo legal de herança, com inventário e divisão formal dos bens',
      'Doar as coisas para caridade quando os filhos já não precisam delas',
    ],
    correct: 1,
    explanation:
      '«Passar adiante» invoca una costumbre familiar, no una devolución. Sérgio presenta su petición como práctica cultural, no como exigencia económica.',
  },
  {
    type: 'Comprensión',
    q: 'Segundo o Sérgio, o que ele pediu exatamente — ao contrário do que a Camila conta?',
    opts: [
      'Cada item da lista, devolvido na hora',
      'Só o dinheiro da poupança da faculdade',
      'Uma conversa sobre dividir algumas das coisas maiores',
      'Um pedido de desculpas por escrito da Camila',
    ],
    correct: 2,
    explanation:
      'Sérgio dice: «Eu nunca disse que queria tudo de volta. Eu disse que talvez a gente pudesse conversar…». Contradice directamente el relato de Camila.',
  },
  {
    type: 'Inferencia',
    q: '«O que me incomodou nem foram as coisas. Foi a atitude.» O que essa frase revela?',
    opts: [
      'Ele só finge que não liga para os objetos caros',
      'Ele se sente desrespeitado no plano afetivo, apesar de anos de generosidade',
      'Ele quer afastar a Camila da família por causa disso',
      'Ele se arrepende de ter comprado todos aqueles presentes caros',
    ],
    correct: 1,
    explanation:
      'Al separar «as coisas» de «a atitude», Sérgio deja claro que la herida emocional —sentirse desechado tras años de dar— le pesa más que el dinero.',
  },
  {
    type: 'Tono',
    q: '«Desculpa aí por eu ser organizado.» Que tom essa frase tem?',
    opts: [
      'Arrependimento verdadeiro por ter levado a planilha impressa até a cozinha dela',
      'Defesa sarcástica — ele não acha que fez nada de errado',
      'Confusão sobre por que todos estão bravos com uma coisa tão simples',
      'Registro acadêmico e formal, próprio de quem apresenta um relatório',
    ],
    correct: 1,
    explanation:
      'Es una no-disculpa: tiene forma de disculpa y contenido de reproche. Defiende su acto mientras insinúa que criticarle la planilla es ridículo.',
  },
  {
    type: 'Vocabulario',
    q: '«Pelo visto agora o vilão sou eu.» O que a palavra «vilão» revela?',
    opts: [
      'Ele concorda totalmente que agiu errado e assume o papel que a família deu para ele',
      'Ele se sente injustamente colocado no papel de vilão de uma história que os outros contam',
      'Ele está usando um termo jurídico técnico para descrever a acusação que recebeu dentro da própria família',
      'Ele busca pena por meio de elogios ao próprio esforço de tantos anos',
    ],
    correct: 1,
    explanation:
      '«Vilão» es vocabulario de ficción, no de vida real. Sérgio lo usa para decir que le han asignado un papel narrativo injusto: es un personaje en la historia que cuentan otros.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Síntesis',
    q: 'Em qual fato a Camila e o Sérgio CONCORDAM?',
    opts: [
      'O Sérgio queria pegar tudo de volta em definitivo',
      'A Camila já tinha oferecido dividir por conta própria',
      'O Sérgio chegou com uma planilha',
      'A Paula pediu as coisas pessoalmente',
    ],
    correct: 2,
    explanation:
      'La planilla es el único dato objetivo que confirman las dos versiones. Todo lo demás —intención, tono, alcance— está en disputa.',
  },
  {
    type: 'Perspectiva',
    q: 'O narrador diz que o Sérgio «pediu de volta milhares de reais em coisas». O Sérgio diz que «propôs conversar sobre dividir». O que essa distância mostra?',
    opts: [
      'O narrador é hostil ao Sérgio e escolhe palavras que o deixam pior do que ele foi',
      'Há uma diferença grande entre a intenção declarada do Sérgio e como o pedido foi percebido',
      'A Camila inventou quase tudo o que contou para a amiga naquela conversa',
      'O narrador errou nos fatos e exagerou o valor do que foi pedido',
    ],
    correct: 1,
    explanation:
      'Intención frente a impacto. Sérgio creía estar abriendo una conversación; Camila (y el narrador) lo vivieron como una exigencia. Esa distancia es el motor de todo el conflicto.',
  },
  {
    type: 'Pensamiento crítico',
    q: 'Qual é a causa RAIZ mais exata desse conflito?',
    opts: [
      'A ganância do Sérgio, que sempre quis o dinheiro de volta',
      'A ingratidão da Camila, que nunca agradeceu nada ao sogro',
      'Nunca se falou de expectativas na hora em que os presentes foram dados',
      'A decisão da Paula de ter um filho neste momento',
    ],
    correct: 2,
    explanation:
      '¿Eran regalos o préstamos con condiciones? Que nadie fijara ese límite en su momento —y no la avaricia ni la ingratitud por separado— es la causa estructural de la disputa.',
  },
  {
    type: 'Inferencia',
    q: 'A Camila diz que o Sérgio ficou «genuinamente pasmo» com a recusa. O que essa reação sugere?',
    opts: [
      'Ele fingiu surpresa como tática para deixar a Camila sem jeito',
      'Ele realmente não previu que alguém pudesse achar o pedido fora de lugar',
      'Ele sabia que ela ia recusar e estava só testando',
      'Nunca negaram nada a ele na vida, nem dentro de casa',
    ],
    correct: 1,
    explanation:
      'El asombro genuino revela que Sérgio opera con un conjunto de supuestos completamente distinto: no esperaba una negativa porque, dentro de su marco, su petición era razonable.',
  },
  {
    type: 'Registro',
    q: 'O Sérgio chama o filho e a nora de «esses meninos». O que essa escolha sugere?',
    opts: [
      'O filho dele e a Camila são literalmente crianças aos olhos da lei brasileira',
      'O Sérgio se vê como a autoridade e eles como pessoas menos experientes que ele ajudou',
      'O Sérgio esqueceu os nomes deles no meio da discussão e acabou usando uma expressão genérica qualquer',
      'É uma expressão formal e carinhosa em português, usada por pais com filhos adultos',
    ],
    correct: 1,
    explanation:
      'Llamarlos «esses meninos» los infantiliza: los coloca como receptores de su dinero y su criterio, no como iguales. Refuerza en voz baja su sensación de autoridad.',
  },
];

const KEY_LANGUAGE = [
  { phrase: 'fazer inventário', meaning: 'hacer recuento de existencias — aquí, aplicado a una familia' },
  { phrase: 'passar adiante', meaning: 'pasar algo a otro miembro de la familia, de generación en generación' },
  { phrase: 'pergunta retórica', meaning: 'pregunta que no espera respuesta: dicta un veredicto' },
  { phrase: 'Desculpa aí por…', meaning: 'no-disculpa: forma de disculpa, contenido de reproche' },
  { phrase: 'passar a chamar de «senhor»', meaning: 'usar el trato formal de golpe: cortesía convertida en distancia' },
];

export const oCadernoDoAvo: Historia = {
  slug: 'o-caderno-do-avo',
  lang: 'portugues',
  icon: '🎙️',
  color: '#059669',
  level: 'B1–B2',
  title: 'O caderno do avô',
  tagline: 'Lo pagó todo cuando nació el nieto. Tres años después llegó con la planilla impresa.',
  metaTitle: 'O caderno do avô — comprensión en portugués B1–B2',
  metaDescription:
    
    
    'Lo pagó todo cuando nació el nieto. Tres años después llegó con la planilla impresa. Dos audios, transcripción y 19 preguntas en portugués B1–B2.',
  intro:
    'Un conflicto de familia. Dos versiones. Tú decides quién tiene razón. Lee el relato del narrador, escucha las dos notas de voz y responde 19 preguntas de vocabulario, inferencia, tono y pensamiento crítico.',
  narrator: {
    paragraphs: NARRATOR_PARAGRAPHS,
    questions: NARRATOR_QS,
    tip: 'Fíjate en las palabras y en el momento en que pasan las cosas: el narrador no es neutral. Busca las pistas de hacia qué lado se inclina el idioma que usa.',
  },
  voices: [
    {
      key: 'a',
      name: 'Camila',
      role: 'a nora',
      sex: 'female',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/portugues/o-caderno-do-avo/a.mp3',
      paragraphs: A_PARAGRAPHS,
      questions: A_QS,
      listenHint: 'Escucha con atención. Todavía no hay transcripción — concéntrate en lo que puedas entender.',
      transcriptHint: 'las marcas y ves su traducción. Después vuelve a escribir lo que entendiste.',
      write1Prompt: 'Sin mirar ninguna transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Camila.',
      write1Hint: 'No te preocupes por que salga perfecto: es una primera impresión. Escribe en español o en portugués.',
      write2Prompt: 'Ahora escríbelo otra vez — esta vez puedes entrar en más detalle.',
    },
    {
      key: 'b',
      name: 'Sérgio',
      role: 'o sogro',
      sex: 'male',
      color: '#7c3aed',
      audioSrc: '/audio/historias/portugues/o-caderno-do-avo/b.mp3',
      paragraphs: B_PARAGRAPHS,
      questions: B_QS,
      listenHint: 'Escucha primero sin transcripción. Esta es la otra mitad del conflicto.',
      transcriptHint: 'compara la versión de Sérgio con la de Camila: ¿en qué coinciden? ¿Dónde se contradicen?',
      write1Prompt: 'Sin la transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Sérgio.',
      write1Hint: '¿Qué dice él que pasó de verdad? Escribe en español o en portugués.',
      write2Prompt: 'Ahora escribe otra vez lo que entendiste desde la perspectiva de Sérgio.',
    },
  ],
  finalQuestions: FINAL_QS,
  finalIntro: [
    'Estas preguntas te piden sostener las dos versiones a la vez y pensar con calma qué pasó, por qué, y cómo el idioma que elige cada uno moldea lo que creemos que pasó.',
  ],
  dict: DICT,
  keyLanguage: KEY_LANGUAGE,
  discussion: {
    question: 'Después de oír a los dos: ¿quién tiene el argumento más fuerte, y por qué?',
    note: 'No hay una única respuesta correcta. Lo que importa es sostener tu posición con evidencia de los textos: palabras, frases y detalles concretos. Eso es exactamente lo que pide un B2 en portugués.',
  },
  ui: 'es',
};

export default oCadernoDoAvo;
