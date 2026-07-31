import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Tarefa 1 usa vídeo OFICIAL do acervo público
// da UFRGS (ufrgs.br/acervocelpebras); as perguntas foram reescritas, não copiadas do
// caderno oficial. Tarefas 2-4 e Parte Oral são conteúdo ORIGINAL WeLearn.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-13/ e /images/celpe-bras/set-13/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-13',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 13',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo oficial do CELPE-BRAS (edição 2008/2). Preste atenção ao tema e às informações apresentadas. Depois, redija o texto solicitado em português.',
      audioUrl: '/api/celpe-bras-video?src=https%3A%2F%2Fwww.ufrgs.br%2Facervocelpebras%2Fwp-content%2Fuploads%2F2021%2F12%2F2008_2_1-Video-Esporte-na-escola.mp4',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s13-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Vídeo oficial CELPE-BRAS — Esporte na escola',
          stimulus: '[Vídeo oficial CELPE-BRAS, edição 2008/2] Tema: "Esporte na escola". Assista com atenção para compreender as informações apresentadas antes de escrever seu texto.',
          text: 'Com base no que você assistiu, escreva um texto sobre o tema do vídeo, no gênero e para o interlocutor que fizerem mais sentido para o assunto (por exemplo, uma carta, um e-mail, um texto informativo ou uma postagem). Explique o tema, comente as informações apresentadas e inclua sua própria opinião quando pertinente. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-13/tarefa-2.mp3',
      transcript: `Apresentador: No quadro Trabalho e Futuro, recebemos a economista Patrícia Alves para falar sobre a economia criativa. Patrícia, o que é exatamente economia criativa?\n\nPatrícia: É o conjunto de atividades econômicas baseadas na criatividade e no conhecimento: música, cinema, design, games, moda, publicidade, artesanato. Em vez de matéria-prima, o principal insumo é a ideia, o talento das pessoas.\n\nApresentador: E qual é a importância disso para o Brasil?\n\nPatrícia: Enorme. O Brasil é um celeiro de criatividade e cultura. A economia criativa já emprega milhões de brasileiros e movimenta bilhões. E o melhor: é um setor que cresce, gera empregos qualificados e valoriza a nossa identidade cultural.\n\nApresentador: Que tipo de profissional esse setor procura?\n\nPatrícia: Gente criativa, mas também com formação técnica. Um bom designer, um roteirista, um programador de games, um produtor cultural. São profissões do futuro. E a boa notícia é que muita coisa se pode aprender pela internet, com custo baixo.\n\nApresentador: Há desafios?\n\nPatrícia: Sim. Falta de investimento, dificuldade de financiamento para pequenos criadores, e a informalidade. Muitos artistas e criadores trabalham sem qualquer proteção. Precisamos de políticas que valorizem e profissionalizem o setor.\n\nApresentador: E o conselho para os jovens?\n\nPatrícia: Não subestimem a criatividade como carreira. Estudem, se profissionalizem, mas acreditem no seu talento. A economia criativa é uma das grandes apostas do futuro do trabalho no Brasil.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s13-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista: economia criativa',
          stimulus: 'Você ouviu uma entrevista com a economista Patrícia Alves sobre a economia criativa no Brasil.',
          text: 'Escreva uma carta ao coordenador de um centro cultural do seu bairro propondo cursos e oficinas que ajudem os jovens a ingressar na economia criativa. Use argumentos da entrevista e sugira atividades concretas. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `O direito ao esquecimento na era digital\n\nNa internet, quase nada desaparece. Uma foto constrangedora, um comentário infeliz, uma notícia antiga sobre um erro do passado podem perseguir uma pessoa por anos, aparecendo sempre que alguém digita o seu nome em um buscador. Diante disso, cresce o debate sobre o chamado "direito ao esquecimento".\n\nA ideia é permitir que uma pessoa solicite a remoção de informações antigas, verdadeiras mas irrelevantes ou prejudiciais, que não têm mais interesse público. Defensores argumentam que todos merecem uma segunda chance e que ninguém deve ser eternamente definido por um erro do passado. A dignidade e a privacidade estariam em jogo.\n\nPor outro lado, há quem alerte para os riscos. O direito ao esquecimento poderia ser usado para apagar fatos de interesse público, censurar informações e reescrever a história. Onde traçar a linha entre proteger a privacidade e garantir o direito da sociedade à informação e à memória?\n\nO tema é complexo e ainda não tem resposta definitiva. Envolve equilibrar direitos fundamentais que às vezes entram em conflito: privacidade, liberdade de expressão e direito à informação. À medida que vivemos cada vez mais online, encontrar esse equilíbrio se torna um dos grandes desafios éticos e jurídicos do nosso tempo.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s13-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: O direito ao esquecimento',
          stimulus: 'Você leu um artigo sobre o debate em torno do direito ao esquecimento na internet.',
          text: 'Escreva um texto de opinião para um blog de tecnologia e sociedade apresentando seu ponto de vista sobre o direito ao esquecimento. Use argumentos do texto e discuta como equilibrar privacidade e direito à informação. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `A moda sustentável ganha espaço\n\nA indústria da moda é uma das que mais poluem no mundo. A produção de roupas consome enormes quantidades de água, gera poluição e monta uma cultura de descarte rápido — o chamado "fast fashion", em que peças baratas são compradas, usadas poucas vezes e jogadas fora. Contra essa lógica, cresce no Brasil um movimento de moda sustentável.\n\nA proposta é produzir e consumir roupas de forma mais consciente. Isso inclui usar materiais ecológicos, garantir condições dignas de trabalho, valorizar a produção local e o artesanato, e incentivar o consumo de peças duráveis, de segunda mão ou feitas sob encomenda. A palavra de ordem é qualidade, não quantidade.\n\nPara os consumidores, aderir à moda sustentável significa repensar hábitos: comprar menos e melhor, cuidar das roupas para que durem mais, valorizar brechós e trocas, e questionar de onde vêm as peças que vestimos. Pequenos produtores e marcas conscientes ganham espaço com esse novo olhar.\n\nMais do que uma tendência, a moda sustentável é uma resposta necessária a um problema ambiental e social urgente. Vestir-se com consciência é uma forma de expressar valores e de contribuir para um mundo mais justo e menos poluído. Afinal, o que vestimos também diz muito sobre quem somos e sobre o futuro que queremos.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s13-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: A moda sustentável',
          stimulus: 'Você leu uma reportagem sobre o crescimento da moda sustentável no Brasil.',
          text: 'Escreva um e-mail a um amigo que adora comprar muitas roupas baratas de "fast fashion". Dê sua opinião sobre os impactos desse consumo e sugira alternativas de moda mais sustentável e consciente. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s13-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma fotografia de um enorme lixão a céu aberto, com montanhas de roupas descartadas, algumas com etiquetas ainda presas, sem terem sido usadas.\n\nPontos para discutir:\n• O que a imagem revela sobre os hábitos de consumo?\n• Por que compramos tanta coisa que mal usamos?\n• Qual é o impacto ambiental do descarte de roupas?\n• O que poderia mudar esse cenário?',
          followUp: [
            'Quantas roupas você tem e não usa?',
            'Você costuma doar, trocar ou vender o que não usa mais?',
            'A propaganda nos faz querer sempre o novo?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s13-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: A preservação das línguas e culturas indígenas\n\nPontos para discutir:\n• Por que é importante preservar as línguas e culturas dos povos indígenas?\n• O que se perde quando uma língua desaparece?\n• Como a sociedade pode valorizar esses povos?\n• O que você conhece sobre a cultura indígena do Brasil?',
          followUp: [
            'Você já teve contato com culturas indígenas?',
            'A escola ensina sobre os povos originários?',
            'A diversidade cultural é uma riqueza ou um desafio?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s13-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: Você tem tempo livre para se dedicar a uma atividade nova e precisa escolher entre:\n1. Aprender uma habilidade prática que pode gerar renda (um curso técnico, por exemplo)\n2. Dedicar-se a uma paixão pessoal, sem objetivo financeiro (música, pintura, esporte)\n\nO que você escolheria? Por quê?',
          followUp: [
            'Tudo o que fazemos precisa ter um objetivo prático?',
            'Os hobbies são importantes na vida das pessoas?',
            'É possível transformar uma paixão em profissão?',
          ],
        },
      ],
    },
  ],
};

export default mock;
