import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Tarefa 1 usa vídeo OFICIAL do acervo público
// da UFRGS (ufrgs.br/acervocelpebras); as perguntas foram reescritas, não copiadas do
// caderno oficial. Tarefas 2-4 e Parte Oral são conteúdo ORIGINAL WeLearn.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-6/ e /images/celpe-bras/set-6/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-6',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 6',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo oficial do CELPE-BRAS (edição 2002/2). Preste atenção ao tema e às informações apresentadas. Depois, redija o texto solicitado em português.',
      audioUrl: '/videos/celpe-bras/set-6.mp4',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s6-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Vídeo oficial CELPE-BRAS — Recomendando um livro a um amigo',
          stimulus: '[Vídeo oficial CELPE-BRAS, edição 2002/2] Tema: "Recomendando um livro a um amigo". Assista com atenção para compreender as informações apresentadas antes de escrever seu texto.',
          text: 'Com base no que você assistiu, escreva um texto sobre o tema do vídeo, no gênero e para o interlocutor que fizerem mais sentido para o assunto (por exemplo, uma carta, um e-mail, um texto informativo ou uma postagem). Explique o tema, comente as informações apresentadas e inclua sua própria opinião quando pertinente. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-6/tarefa-2.mp3',
      transcript: `Apresentadora: No quadro Jovens que Inspiram, conversamos hoje com a Marina Souza, de 22 anos, que criou um aplicativo para conectar doadores de sangue a hospitais. Marina, como surgiu a ideia?\n\nMarina: Surgiu de uma necessidade pessoal. Meu avô precisou de várias transfusões e a gente teve muita dificuldade de encontrar doadores do tipo sanguíneo dele. Aí eu pensei: será que a tecnologia não pode resolver isso?\n\nApresentadora: E como o aplicativo funciona?\n\nMarina: É simples. A pessoa se cadastra informando o seu tipo sanguíneo e a sua cidade. Quando um hospital precisa de um tipo específico, o app avisa os doadores compatíveis que estão por perto. Assim, na hora de uma emergência, a gente encontra doadores muito mais rápido.\n\nApresentadora: Você é da área de tecnologia?\n\nMarina: Não! Eu estudo enfermagem. Aprendi programação sozinha, por vídeos na internet, e depois consegui a ajuda de dois amigos programadores. Foi difícil, mas mostra que a gente não precisa esperar ser especialista para começar a resolver um problema.\n\nApresentadora: Quais foram os resultados?\n\nMarina: Em um ano, já temos mais de dez mil doadores cadastrados e ajudamos vários hospitais a encontrar sangue em situações críticas. Recebo mensagens de famílias agradecendo, e isso não tem preço.\n\nApresentadora: E o futuro?\n\nMarina: Queremos expandir para todo o país e firmar parcerias com os bancos de sangue. O sonho é que ninguém mais morra por falta de um doador que estava ali, do lado, sem saber que era preciso.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s6-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista: tecnologia e doação de sangue',
          stimulus: 'Você ouviu uma entrevista com Marina Souza, criadora de um aplicativo que conecta doadores de sangue a hospitais.',
          text: 'Escreva uma carta ao editor de uma revista de inovação recomendando o aplicativo de Marina para uma reportagem de destaque. Explique o que é o projeto, por que é inovador e qual é o seu impacto social. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `O desafio da saúde mental entre os estudantes\n\nA saúde mental dos estudantes brasileiros tornou-se uma preocupação crescente. Pesquisas em universidades e escolas revelam índices altos de ansiedade, estresse e sintomas de depressão entre jovens. A pressão por bom desempenho, a competição por vagas, as incertezas sobre o futuro profissional e o uso intenso das redes sociais são apontados como fatores importantes.\n\nA vida acadêmica, que deveria ser um período de descoberta e crescimento, muitas vezes se torna fonte de sofrimento. Muitos estudantes relatam a sensação de estar sempre "correndo atrás", sem tempo para descansar, e o sentimento de que nunca fazem o suficiente. A comparação constante com colegas, alimentada pelas redes sociais, agrava esse quadro.\n\nAs instituições de ensino começaram a responder ao problema. Cresce o número de universidades que oferecem apoio psicológico gratuito, grupos de acolhimento e campanhas de conscientização. Especialistas defendem que cuidar da saúde mental deve ser tão importante quanto o desempenho acadêmico, e que pedir ajuda é um sinal de força, não de fraqueza.\n\nO caminho passa por quebrar o tabu que ainda cerca o tema. Falar abertamente sobre as emoções, buscar apoio profissional quando necessário e criar ambientes escolares mais acolhedores são passos essenciais. Afinal, não existe aprendizado saudável sem uma mente saudável.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s6-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: Saúde mental entre estudantes',
          stimulus: 'Você leu um artigo sobre os desafios da saúde mental entre os estudantes brasileiros.',
          text: 'Escreva um texto de opinião para o jornal da sua instituição apresentando seu ponto de vista sobre a saúde mental dos estudantes. Use argumentos do texto e proponha o que a escola ou universidade e os próprios estudantes poderiam fazer para enfrentar o problema. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `A febre dos festivais de música no Brasil\n\nOs festivais de música se multiplicaram pelo Brasil nos últimos anos e movimentam bilhões de reais. De grandes eventos internacionais a festivais menores e regionais, eles atraem multidões de todas as idades e se tornaram parte importante da cultura e da economia do entretenimento.\n\nOs benefícios vão além da música. Os festivais geram empregos temporários, aquecem o turismo e o comércio das cidades-sede e revelam novos artistas. Para o público, são momentos de lazer, encontro e experiências marcantes. Muitos festivais também passaram a incluir causas sociais e ambientais em sua programação, como shows de conscientização e práticas sustentáveis.\n\nPor outro lado, há questões que preocupam. Os ingressos costumam ser caros, o que exclui parte da população. Grandes eventos podem causar impactos ambientais, como acúmulo de lixo e alto consumo de energia. E, em alguns casos, faltam estrutura e segurança adequadas para o público.\n\nO desafio é organizar festivais que sejam, ao mesmo tempo, rentáveis, acessíveis, seguros e sustentáveis. Quando bem planejados, esses eventos podem unir cultura, economia e responsabilidade social, deixando um legado positivo para as cidades e para as pessoas.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s6-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: Festivais de música',
          stimulus: 'Você leu uma reportagem sobre o crescimento dos festivais de música no Brasil e seus impactos.',
          text: 'Escreva um e-mail a um amigo que está organizando um pequeno festival de música na sua cidade. Dê sua opinião sobre os prós e contras desses eventos e sugira boas práticas para que o festival seja acessível, seguro e sustentável. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s6-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma fotografia de uma família reunida à mesa do jantar, mas cada pessoa está olhando para o seu próprio celular, sem conversar.\n\nPontos para discutir:\n• O que a imagem revela sobre as relações familiares hoje?\n• A tecnologia aproxima ou afasta as pessoas dentro de casa?\n• Como era a convivência familiar antes dos smartphones?\n• O que poderia ser feito para melhorar esses momentos em família?',
          followUp: [
            'Na sua casa, existe alguma regra sobre o uso do celular durante as refeições?',
            'Você acha que as pessoas conversam menos hoje do que antes?',
            'Como equilibrar a vida digital e a vida real?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s6-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: O trabalho e a aposentadoria no Brasil\n\nPontos para discutir:\n• As pessoas deveriam trabalhar até mais tarde ou se aposentar mais cedo?\n• Como garantir uma aposentadoria digna para todos?\n• O que muda na vida de uma pessoa quando ela se aposenta?\n• Os idosos deveriam continuar ativos no mercado de trabalho?',
          followUp: [
            'Como você imagina a sua vida quando se aposentar?',
            'O trabalho define a identidade de uma pessoa?',
            'A sociedade valoriza ou ignora os idosos?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s6-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: Um grupo de amigos vai dividir um apartamento para economizar. Você precisa decidir entre:\n1. Morar mais longe do trabalho/faculdade, num lugar maior e mais barato\n2. Morar bem perto, num lugar pequeno e mais caro\n\nO que você escolheria? Por quê?',
          followUp: [
            'O que é mais importante para você: espaço ou localização?',
            'Dividir moradia com amigos é uma boa ideia? Quais os riscos?',
            'Como lidar com conflitos ao morar com outras pessoas?',
          ],
        },
      ],
    },
  ],
};

export default mock;
