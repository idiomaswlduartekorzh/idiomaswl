import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Tarefa 1 usa vídeo OFICIAL do acervo público
// da UFRGS (ufrgs.br/acervocelpebras); as perguntas foram reescritas, não copiadas do
// caderno oficial. Tarefas 2-4 e Parte Oral são conteúdo ORIGINAL WeLearn.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-11/ e /images/celpe-bras/set-11/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-11',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 11',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo oficial do CELPE-BRAS (edição 2007/2). Preste atenção ao tema e às informações apresentadas. Depois, redija o texto solicitado em português.',
      audioUrl: '/videos/celpe-bras/set-11.mp4',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s11-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Vídeo oficial CELPE-BRAS — Meio ambiente: bacias hidrográficas',
          stimulus: '[Vídeo oficial CELPE-BRAS, edição 2007/2] Tema: "Meio ambiente: bacias hidrográficas". Assista com atenção para compreender as informações apresentadas antes de escrever seu texto.',
          text: 'Com base no que você assistiu, escreva um texto sobre o tema do vídeo, no gênero e para o interlocutor que fizerem mais sentido para o assunto (por exemplo, uma carta, um e-mail, um texto informativo ou uma postagem). Explique o tema, comente as informações apresentadas e inclua sua própria opinião quando pertinente. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-11/tarefa-2.mp3',
      transcript: `Apresentador: No quadro Educação em Foco, recebemos a professora Cláudia Martins, que criou um projeto de ensino de robótica em uma escola pública. Cláudia, como surgiu essa ideia?\n\nCláudia: Eu percebi que meus alunos, mesmo de baixa renda, eram apaixonados por tecnologia. Só que a tecnologia que consumiam era passiva: jogos, vídeos. Eu quis mostrar que eles podiam ser criadores, não só consumidores.\n\nApresentador: E como conseguiu recursos?\n\nCláudia: Com muita criatividade! No começo, usamos material reciclado, sucata eletrônica, motores de brinquedos velhos. Depois, com uma campanha de financiamento coletivo e a ajuda de uma universidade, conseguimos kits de robótica de verdade.\n\nApresentador: Que resultados você vê nos alunos?\n\nCláudia: Impressionantes. Alunos que iam mal em matemática começaram a se interessar, porque viram a matéria aplicada na prática. Melhorou a autoestima, o trabalho em equipe, a persistência — porque montar um robô dá muito errado antes de dar certo, e eles aprendem a não desistir.\n\nApresentador: A robótica é só para quem quer ser engenheiro?\n\nCláudia: De jeito nenhum. A robótica ensina a pensar, a resolver problemas, a colaborar. São habilidades para qualquer área da vida. E, claro, abre portas: alguns dos meus alunos já sonham com carreiras em tecnologia que nem sabiam que existiam.\n\nApresentador: Um projeto transformador. Obrigado, professora.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s11-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista: robótica na escola pública',
          stimulus: 'Você ouviu uma entrevista com a professora Cláudia Martins sobre um projeto de robótica em uma escola pública.',
          text: 'Escreva uma carta à secretaria de educação do seu município propondo a criação de projetos de tecnologia e robótica nas escolas públicas. Use argumentos da entrevista e explique os benefícios para os alunos. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `O desafio da mobilidade urbana\n\nMover-se pelas grandes cidades brasileiras é, para milhões de pessoas, um desafio diário. Congestionamentos intermináveis, transporte público lotado e caro, e longas horas perdidas no deslocamento afetam a qualidade de vida, a saúde e a produtividade. A mobilidade urbana tornou-se um dos maiores problemas das metrópoles.\n\nAs causas são conhecidas. Décadas de planejamento voltado para o carro particular, em vez do transporte coletivo, geraram cidades espalhadas e dependentes do automóvel. O crescimento desordenado empurrou os mais pobres para as periferias, longe dos empregos, obrigando-os a gastar horas e boa parte do salário com transporte.\n\nSoluções existem, mas exigem vontade política e investimento. Ampliar e melhorar o transporte público — metrôs, ônibus e trens — é essencial. Incentivar meios alternativos, como as bicicletas, com ciclovias seguras. Repensar o uso do espaço urbano, priorizando as pessoas em vez dos carros. E integrar os diferentes modais para que o trajeto seja mais rápido e barato.\n\nA mobilidade não é apenas uma questão de transporte, mas de justiça social. Uma cidade em que todos possam se locomover com dignidade, segurança e rapidez é uma cidade mais igualitária e mais humana. Resolver esse desafio é fundamental para o futuro das nossas cidades.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s11-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: O desafio da mobilidade urbana',
          stimulus: 'Você leu um artigo sobre os problemas de mobilidade urbana nas grandes cidades brasileiras.',
          text: 'Escreva um texto de opinião para o jornal da sua cidade apresentando seu ponto de vista sobre a mobilidade urbana. Use argumentos do texto e proponha soluções para tornar o deslocamento mais justo, rápido e sustentável. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `A arte do grafite: vandalismo ou cultura?\n\nOs muros das cidades brasileiras contam histórias. De um lado, pichações rabiscadas que muitos consideram sujeira e vandalismo. De outro, grafites coloridos e elaborados, verdadeiras obras de arte que transformam paredes cinzentas em galerias a céu aberto. O debate sobre onde termina o vandalismo e começa a arte é antigo e apaixonado.\n\nDefensores do grafite argumentam que ele é uma forma legítima de expressão artística e cultural, especialmente das periferias, onde muitas vezes é a única arte acessível. Grafites bem-feitos revitalizam espaços degradados, transmitem mensagens sociais e podem até atrair turismo. Muitas cidades hoje reconhecem o valor dessa arte e reservam espaços legais para os grafiteiros.\n\nPor outro lado, há quem não veja diferença entre grafite e pichação, e considere qualquer intervenção não autorizada nos muros uma agressão ao patrimônio público e privado. Donos de imóveis reclamam dos custos de limpeza, e há questões legais sobre a autorização para pintar em espaços alheios.\n\nA chave talvez esteja no diálogo e no respeito. Grafitar com autorização, em espaços adequados, transforma a cidade e valoriza a cultura. O que a maioria condena não é a arte em si, mas a intervenção sem permissão que danifica o que é dos outros. Entre o muro e a tela, a arte urbana busca o seu lugar.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s11-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: A arte do grafite',
          stimulus: 'Você leu uma reportagem sobre o debate em torno do grafite: arte ou vandalismo.',
          text: 'Escreva um e-mail a um amigo que acha que todo grafite é vandalismo e deveria ser proibido. Dê sua opinião sobre o tema, apresente os dois lados e sugira como a cidade poderia lidar com a arte urbana de forma equilibrada. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s11-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma fotografia de um muro cinza de um lado e, do outro lado da mesma rua, um grande painel de grafite colorido retratando personagens da cultura local.\n\nPontos para discutir:\n• Qual dos dois muros transmite mais para você? Por quê?\n• O grafite é arte ou vandalismo?\n• Como a arte pode transformar os espaços urbanos?\n• Quem deveria decidir o que pode ser pintado nos muros da cidade?',
          followUp: [
            'Existem grafites marcantes na sua cidade?',
            'A arte de rua deveria ser incentivada pelo poder público?',
            'Qual é a diferença entre grafite e pichação, na sua opinião?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s11-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: O trabalho voluntário e a solidariedade\n\nPontos para discutir:\n• Por que algumas pessoas dedicam tempo a ajudar os outros sem receber nada?\n• O trabalho voluntário deveria ser incentivado nas escolas e empresas?\n• A solidariedade está aumentando ou diminuindo na sociedade?\n• Como o voluntariado transforma quem ajuda e quem é ajudado?',
          followUp: [
            'Você já fez trabalho voluntário? Como foi a experiência?',
            'O que motiva as pessoas a ajudar?',
            'Ajudar os outros também faz bem para quem ajuda?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s11-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: Você tem economias suficientes para realizar um sonho e precisa escolher entre:\n1. Abrir o seu próprio negócio, com todos os riscos que isso envolve\n2. Continuar em um emprego estável e seguro, guardando o dinheiro\n\nO que você escolheria? Por quê?',
          followUp: [
            'Você se considera uma pessoa que corre riscos ou que prefere segurança?',
            'Vale a pena arriscar tudo por um sonho?',
            'O que é sucesso para você?',
          ],
        },
      ],
    },
  ],
};

export default mock;
