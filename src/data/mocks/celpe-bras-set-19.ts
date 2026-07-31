import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Tarefa 1 usa vídeo OFICIAL do acervo público
// da UFRGS (ufrgs.br/acervocelpebras); as perguntas foram reescritas, não copiadas do
// caderno oficial. Tarefas 2-4 e Parte Oral são conteúdo ORIGINAL WeLearn.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-19/ e /images/celpe-bras/set-19/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-19',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 19',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo oficial do CELPE-BRAS (edição 2013/1). Preste atenção ao tema e às informações apresentadas. Depois, redija o texto solicitado em português.',
      audioUrl: '/api/celpe-bras-video?src=https%3A%2F%2Fwww.ufrgs.br%2Facervocelpebras%2Fwp-content%2Fuploads%2F2021%2F12%2F2013_1-Video-Projeto-Horta-Ecologica_comprimido.mp4',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s19-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Vídeo oficial CELPE-BRAS — Projeto Horta Ecológica',
          stimulus: '[Vídeo oficial CELPE-BRAS, edição 2013/1] Tema: "Projeto Horta Ecológica". Assista com atenção para compreender as informações apresentadas antes de escrever seu texto.',
          text: 'Com base no que você assistiu, escreva um texto sobre o tema do vídeo, no gênero e para o interlocutor que fizerem mais sentido para o assunto (por exemplo, uma carta, um e-mail, um texto informativo ou uma postagem). Explique o tema, comente as informações apresentadas e inclua sua própria opinião quando pertinente. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-19/tarefa-2.mp3',
      transcript: `Apresentador: No quadro Tecnologia e Sociedade, recebemos o professor de informática Marcos Aurélio, que criou um projeto de inclusão digital para idosos. Marcos, por que focar nos idosos?\n\nMarcos: Porque eles são os mais excluídos do mundo digital. Hoje quase tudo se faz pelo celular: banco, agendamento de médico, conversar com a família. Um idoso que não sabe usar essas ferramentas fica isolado, dependente, às vezes até vítima de golpes.\n\nApresentador: E como funciona o projeto?\n\nMarcos: A gente oferece aulas gratuitas, com muita paciência e no ritmo deles. Ensinamos o básico: mandar mensagem, fazer chamada de vídeo, usar aplicativos de banco com segurança, pesquisar na internet. E, principalmente, a não ter medo da tecnologia.\n\nApresentador: Qual a maior recompensa?\n\nMarcos: Ver a alegria deles. Uma senhora que aprendeu a fazer chamada de vídeo e agora conversa todo dia com o neto que mora longe. Um senhor que voltou a se sentir independente ao resolver as coisas sozinho. A tecnologia, para eles, é reconexão com o mundo e com a família.\n\nApresentador: Há resistência?\n\nMarcos: No começo, muita. "Isso não é para mim", "sou velho demais". Mas, quando percebem que conseguem, a autoconfiança explode. Ninguém é velho demais para aprender. Só precisam de uma oportunidade e de alguém que ensine com carinho.\n\nApresentador: Um trabalho que reconecta gerações. Obrigado, Marcos.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s19-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista: inclusão digital de idosos',
          stimulus: 'Você ouviu uma entrevista com o professor Marcos Aurélio sobre um projeto de inclusão digital para idosos.',
          text: 'Escreva uma carta ao responsável por um centro de convivência de idosos propondo a criação de um curso de inclusão digital. Use argumentos da entrevista e explique como isso pode melhorar a vida e a autonomia dos idosos. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `O valor do erro no aprendizado\n\nDesde cedo, aprendemos a temer o erro. Na escola, errar significava nota baixa, correção em vermelho, às vezes vergonha diante dos colegas. Crescemos com a ideia de que o erro é algo ruim, a ser evitado a todo custo. Mas essa visão vem sendo questionada por educadores e cientistas.\n\nPesquisas mostram que errar é parte essencial do aprendizado. É tentando, errando e corrigindo que o cérebro realmente aprende. Quando acertamos de primeira, aprendemos pouco; quando erramos e entendemos por quê, a lição se fixa. Grandes cientistas, artistas e empreendedores construíram seus sucessos sobre uma montanha de tentativas fracassadas.\n\nO medo do erro, ao contrário, paralisa. Quem tem medo de errar não arrisca, não cria, não tenta o novo. Prefere a segurança do já conhecido a se aventurar no desconhecido, onde estão as maiores descobertas e aprendizados. O erro, quando bem aproveitado, é professor; quando temido, é prisão.\n\nMudar a nossa relação com o erro é fundamental. As escolas deveriam criar ambientes onde errar seja permitido e visto como parte do processo. Os pais deveriam incentivar as crianças a tentar sem medo. E cada um de nós pode aprender a encarar os próprios erros com menos julgamento e mais curiosidade. Afinal, quem nunca errou nunca tentou nada de novo.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s19-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: O valor do erro no aprendizado',
          stimulus: 'Você leu um artigo sobre a importância de encarar o erro como parte do aprendizado.',
          text: 'Escreva um texto de opinião para o jornal da sua escola ou universidade apresentando seu ponto de vista sobre o papel do erro no aprendizado. Use argumentos do texto e proponha como escolas e famílias podem mudar a relação das pessoas com o erro. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `O poder das pequenas atitudes sustentáveis\n\nDiante da magnitude dos problemas ambientais, é comum sentir que as ações individuais não fazem diferença. "De que adianta eu economizar água se as indústrias desperdiçam tanto?", pensam muitos. No entanto, especialistas defendem que as pequenas atitudes sustentáveis do dia a dia têm, sim, um poder real — especialmente quando somadas.\n\nSeparar o lixo para reciclagem, evitar o desperdício de comida e água, reduzir o uso de plástico, preferir o transporte coletivo ou a bicicleta, consumir de forma consciente: cada uma dessas atitudes, praticada por milhões de pessoas, gera um impacto enorme. Além do efeito direto, esses hábitos criam uma cultura de responsabilidade que pressiona empresas e governos a mudar.\n\nHá também um efeito de exemplo. Quando alguém adota práticas sustentáveis, influencia os que estão ao redor: família, amigos, colegas. A mudança se espalha. E cada pessoa que se preocupa com o meio ambiente se torna também uma voz que cobra políticas públicas e um consumidor que valoriza empresas responsáveis.\n\nÉ claro que as ações individuais não substituem as grandes mudanças estruturais, que dependem de governos e empresas. Mas uma coisa não anula a outra. Cuidar do planeta é uma tarefa coletiva que começa em casa, nas pequenas escolhas diárias. Cada gesto conta, e a soma de muitos gestos pode transformar o mundo.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s19-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: Pequenas atitudes sustentáveis',
          stimulus: 'Você leu uma reportagem sobre o poder das pequenas atitudes sustentáveis no dia a dia.',
          text: 'Escreva um e-mail a um amigo que acha que atitudes individuais "não adiantam nada" para o meio ambiente. Dê sua opinião, argumente por que as pequenas ações importam e sugira hábitos sustentáveis que ele poderia adotar. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s19-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma charge mostra uma pessoa recusando uma sacola plástica no mercado, e ao lado outra dizendo: "De que adianta? Não vai mudar nada." A primeira responde: "Se todos pensassem assim, nunca mudaria."\n\nPontos para discutir:\n• Qual é a mensagem da charge?\n• As atitudes individuais fazem diferença para o meio ambiente?\n• Por que algumas pessoas se sentem impotentes diante dos problemas ambientais?\n• Como pequenas ações podem gerar grandes mudanças?',
          followUp: [
            'Que atitudes sustentáveis você tem no seu dia a dia?',
            'Você acredita que uma pessoa pode influenciar as outras?',
            'De quem é a maior responsabilidade: das pessoas, das empresas ou dos governos?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s19-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: O medo de errar e a busca pela perfeição\n\nPontos para discutir:\n• Por que temos tanto medo de errar?\n• A busca pela perfeição ajuda ou atrapalha?\n• As redes sociais aumentam a pressão por uma vida "perfeita"?\n• O erro pode ser um bom professor?',
          followUp: [
            'Você tem medo de errar? Em que situações?',
            'Já aprendeu algo importante a partir de um erro?',
            'Como lidar com a cobrança por ser perfeito?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s19-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: Você percebe que um colega de trabalho está cometendo um erro que pode prejudicar a empresa, mas que ninguém notou ainda. Você precisa decidir entre:\n1. Avisar diretamente o colega, para que ele mesmo corrija\n2. Comunicar ao chefe imediatamente\n\nO que você faria? Por quê?',
          followUp: [
            'Como lidar com os erros dos outros de forma respeitosa?',
            'A lealdade ao colega pode entrar em conflito com o dever?',
            'Você já viveu uma situação parecida?',
          ],
        },
      ],
    },
  ],
};

export default mock;
