import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Tarefa 1 usa vídeo OFICIAL do acervo público
// da UFRGS (ufrgs.br/acervocelpebras); as perguntas foram reescritas, não copiadas do
// caderno oficial. Tarefas 2-4 e Parte Oral são conteúdo ORIGINAL WeLearn.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-12/ e /images/celpe-bras/set-12/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-12',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 12',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo oficial do CELPE-BRAS (edição 2008/1). Preste atenção ao tema e às informações apresentadas. Depois, redija o texto solicitado em português.',
      audioUrl: '/api/celpe-bras-video?src=https%3A%2F%2Fwww.ufrgs.br%2Facervocelpebras%2Fwp-content%2Fuploads%2F2021%2F12%2F2008_1-Video-O-arquipelago-de-Fernando-de-Noronha.mp4',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s12-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Vídeo oficial CELPE-BRAS — Arquipélago de Fernando de Noronha',
          stimulus: '[Vídeo oficial CELPE-BRAS, edição 2008/1] Tema: "Arquipélago de Fernando de Noronha". Assista com atenção para compreender as informações apresentadas antes de escrever seu texto.',
          text: 'Com base no que você assistiu, escreva um texto sobre o tema do vídeo, no gênero e para o interlocutor que fizerem mais sentido para o assunto (por exemplo, uma carta, um e-mail, um texto informativo ou uma postagem). Explique o tema, comente as informações apresentadas e inclua sua própria opinião quando pertinente. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-12/tarefa-2.mp3',
      transcript: `Apresentadora: No programa Nossa Gente, conversamos com o seu Joaquim, de 70 anos, que voltou a estudar e concluiu o ensino médio depois de mais de cinquenta anos fora da escola. Seu Joaquim, o que o motivou?\n\nJoaquim: Ah, minha filha, foi um sonho de vida. Eu tive que parar de estudar criança para trabalhar na roça e ajudar a família. Nunca esqueci daquilo. Sempre tive vontade de terminar os estudos.\n\nApresentadora: E como foi voltar à escola nessa idade?\n\nJoaquim: No começo, tive vergonha. Achei que ia ser o único velho na sala. Mas que nada! Tinha gente de todas as idades na educação de jovens e adultos. Fiz amigos, e os professores foram uma bênção, muito pacientes.\n\nApresentadora: Qual foi a maior dificuldade?\n\nJoaquim: A memória já não é a mesma, né? E a tecnologia. Nossa, no meu tempo não tinha computador. Mas meus netos me ajudaram, e eu fui aprendendo. Descobri que a gente nunca é velho demais para aprender.\n\nApresentadora: E agora, quais são os planos?\n\nJoaquim: Olha, eu quero fazer uma faculdade! Sonho em estudar história. E quero ser um exemplo para os meus netos e para todo mundo que acha que já passou da hora. Estudar não tem idade.\n\nApresentadora: Uma lição de vida para todos nós. Muito obrigada, seu Joaquim.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s12-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista: educação de jovens e adultos',
          stimulus: 'Você ouviu uma entrevista com o seu Joaquim, que concluiu o ensino médio aos 70 anos.',
          text: 'Escreva uma carta a um centro de educação de jovens e adultos parabenizando pelo trabalho e propondo uma campanha para incentivar mais pessoas idosas a voltar a estudar. Use a história do seu Joaquim como exemplo. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `A gentileza nas cidades grandes\n\nCorreria, trânsito, filas, competição. A vida nas grandes cidades brasileiras muitas vezes parece deixar pouco espaço para a gentileza. Cada um cuida da sua vida, com pressa e desconfiança, e pequenos gestos de cortesia — dar bom-dia, ceder o lugar, ajudar um estranho — parecem estar em falta.\n\nNo entanto, movimentos e iniciativas têm buscado resgatar a gentileza no cotidiano urbano. Campanhas incentivam atos simples de bondade; há quem deixe bilhetes gentis pela cidade, distribua flores ou ofereça ajuda a quem precisa. A ideia é que a gentileza gera gentileza, criando uma corrente do bem que melhora o ambiente de todos.\n\nEstudos mostram que atos de gentileza fazem bem não só a quem recebe, mas também a quem pratica. Ajudar o próximo libera substâncias no cérebro ligadas ao bem-estar, reduz o estresse e aumenta a sensação de pertencimento. Uma cidade mais gentil é, portanto, uma cidade mais saudável e feliz.\n\nA gentileza não custa nada e não depende de leis ou de dinheiro. Depende apenas de uma escolha diária: tratar os outros com respeito e empatia, mesmo em meio à correria. Em um mundo cada vez mais acelerado e individualista, resgatar a gentileza pode ser um ato revolucionário.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s12-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: A gentileza nas cidades grandes',
          stimulus: 'Você leu um artigo sobre a falta e a importância da gentileza nas grandes cidades.',
          text: 'Escreva um texto de opinião para um blog sobre comportamento apresentando seu ponto de vista sobre a gentileza no dia a dia das cidades. Use argumentos do texto e proponha atitudes concretas para tornar a convivência urbana mais gentil. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `O fenômeno dos "nômades digitais"\n\nTrabalhar de uma praia no Nordeste, de um café em uma cidade histórica ou de uma pousada na serra: essa é a rotina dos chamados "nômades digitais", profissionais que, graças à internet, trabalham de qualquer lugar do mundo. O Brasil, com sua diversidade de paisagens e o custo de vida atraente, virou destino desejado por esses viajantes.\n\nO fenômeno traz vantagens. Para os nômades, é liberdade: conhecer lugares, viver experiências e trabalhar ao mesmo tempo. Para as cidades que os recebem, é uma injeção na economia local — eles gastam em hospedagem, alimentação e serviços, muitas vezes por longos períodos. Cidades brasileiras já criam vistos e infraestrutura para atrair esse público.\n\nMas há também desafios. A chegada de estrangeiros com salários em moeda forte pode aumentar o custo de vida e os aluguéis, afetando os moradores locais. Além disso, nem sempre há integração real: alguns nômades vivem em uma "bolha", sem se conectar com a cultura e a comunidade do lugar.\n\nO ideal é que o nomadismo digital seja benéfico para todos. Isso exige planejamento das cidades, para que o turismo de longa permanência não expulse os moradores, e uma postura respeitosa dos viajantes, que devem valorizar e se integrar às comunidades que os acolhem. Assim, a liberdade de uns não se transforma em problema para outros.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s12-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: Os nômades digitais',
          stimulus: 'Você leu uma reportagem sobre o fenômeno dos nômades digitais no Brasil.',
          text: 'Escreva um e-mail a um amigo estrangeiro que pretende passar alguns meses trabalhando remotamente no Brasil. Dê sua opinião sobre os prós e contras do estilo de vida nômade e sugira como ele pode se integrar e contribuir com a comunidade local. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s12-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma fotografia de uma pessoa idosa sentada sozinha em um banco de praça, olhando um grupo de jovens que conversam animados um pouco mais adiante.\n\nPontos para discutir:\n• O que a imagem transmite para você?\n• A solidão dos idosos é um problema na nossa sociedade?\n• Como as diferentes gerações podem se aproximar?\n• O que os jovens têm a aprender com os mais velhos, e vice-versa?',
          followUp: [
            'Você convive com pessoas de outras gerações no seu dia a dia?',
            'Como a sua sociedade trata os idosos?',
            'O que poderia reduzir a solidão na terceira idade?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s12-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: O consumismo e a felicidade\n\nPontos para discutir:\n• Comprar coisas novas traz felicidade de verdade?\n• Por que somos incentivados a consumir cada vez mais?\n• É possível viver bem com menos?\n• O que realmente traz felicidade para você?',
          followUp: [
            'Você já comprou algo por impulso e se arrependeu?',
            'A propaganda influencia os seus desejos?',
            'O que o dinheiro pode e o que não pode comprar?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s12-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: A sua cidade vai receber um grande evento e o comitê pede a sua opinião entre:\n1. Investir tudo em um único evento internacional de grande porte\n2. Distribuir a verba em vários eventos culturais pequenos, pelos bairros\n\nO que você escolheria? Por quê?',
          followUp: [
            'Grandes eventos beneficiam a população local ou só a imagem da cidade?',
            'A cultura de bairro é valorizada onde você mora?',
            'O que faz um evento ser realmente para o povo?',
          ],
        },
      ],
    },
  ],
};

export default mock;
