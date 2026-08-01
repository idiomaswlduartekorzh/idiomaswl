import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Tarefa 1 usa vídeo OFICIAL do acervo público
// da UFRGS (ufrgs.br/acervocelpebras); as perguntas foram reescritas, não copiadas do
// caderno oficial. Tarefas 2-4 e Parte Oral são conteúdo ORIGINAL WeLearn.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-7/ e /images/celpe-bras/set-7/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-7',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 7',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo oficial do CELPE-BRAS (edição 2003/2). Preste atenção ao tema e às informações apresentadas. Depois, redija o texto solicitado em português.',
      audioUrl: '/videos/celpe-bras/set-7.mp4',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s7-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Vídeo oficial CELPE-BRAS — Cidades mineiras',
          stimulus: '[Vídeo oficial CELPE-BRAS, edição 2003/2] Tema: "Cidades mineiras". Assista com atenção para compreender as informações apresentadas antes de escrever seu texto.',
          text: 'Com base no que você assistiu, escreva um texto sobre o tema do vídeo, no gênero e para o interlocutor que fizerem mais sentido para o assunto (por exemplo, uma carta, um e-mail, um texto informativo ou uma postagem). Explique o tema, comente as informações apresentadas e inclua sua própria opinião quando pertinente. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-7/tarefa-2.mp3',
      transcript: `Apresentador: No quadro Esporte e Cidadania, recebemos o professor de educação física Ricardo Mendes, que transformou uma quadra abandonada em um projeto social de esporte para crianças em uma periferia de Recife. Ricardo, como começou?\n\nRicardo: A quadra estava largada, virou ponto de uso de drogas. Eu morava perto e não aguentava ver aquilo. Junto com alguns pais, limpamos o espaço, conseguimos umas bolas doadas e começamos a chamar a molecada para jogar.\n\nApresentador: E deu certo de imediato?\n\nRicardo: Aos poucos. No começo vinham cinco, seis crianças. Hoje são mais de cem, em vários horários. E não é só futebol: temos vôlei, capoeira, e até reforço escolar, porque eu exijo que eles estejam indo bem na escola para poderem treinar.\n\nApresentador: O esporte muda a vida dessas crianças?\n\nRicardo: Muda tudo. O esporte ensina disciplina, respeito, trabalho em equipe. Tira a criança da rua num horário perigoso. E dá sonho. Alguns dos meus alunos já pensam em ser professores de educação física, outros entraram em times de base.\n\nApresentador: Quais são as dificuldades?\n\nRicardo: Falta de recursos, sempre. Materiais, uniformes, transporte para competições. A gente vive de doações e da boa vontade de voluntários. Um apoio maior da prefeitura ou de empresas faria uma diferença enorme.\n\nApresentador: E o recado que você deixa?\n\nRicardo: Que qualquer um pode transformar a sua comunidade. Não precisa esperar. Comece com o que você tem, onde você está. Uma bola e uma quadra podem mudar o futuro de muitas crianças.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s7-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista: esporte e projeto social',
          stimulus: 'Você ouviu uma entrevista com o professor Ricardo Mendes, que criou um projeto social de esporte para crianças em Recife.',
          text: 'Escreva uma carta a uma empresa da sua região pedindo apoio (patrocínio ou doação) para o projeto social do professor Ricardo. Explique o que é o projeto, seu impacto na comunidade e por que a empresa deveria apoiá-lo. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `A polêmica das redes sociais para crianças e adolescentes\n\nCresce no Brasil e no mundo o debate sobre a idade adequada para o uso de redes sociais. Estudos apontam que a exposição precoce a essas plataformas pode afetar o desenvolvimento emocional de crianças e adolescentes, contribuindo para problemas como ansiedade, baixa autoestima e distúrbios de sono.\n\nAs redes sociais foram desenhadas para prender a atenção. Notificações constantes, rolagem infinita e a busca por curtidas criam um ciclo difícil de interromper. Para mentes ainda em formação, os efeitos podem ser mais intensos. A comparação com vidas aparentemente perfeitas e a exposição ao cyberbullying são preocupações frequentes de pais e educadores.\n\nAlguns países já discutem leis para restringir o acesso de menores de certa idade às redes sociais, exigindo verificação de idade ou autorização dos pais. Os defensores dessas medidas argumentam que é preciso proteger os mais jovens. Já os críticos alertam para a dificuldade de fiscalizar e para o risco de limitar o acesso à informação e à comunicação.\n\nA maioria dos especialistas concorda que a solução não é apenas proibir, mas educar. Ensinar crianças e adolescentes a usar a tecnologia de forma crítica e consciente, com o acompanhamento dos pais e o apoio da escola, parece ser o caminho mais promissor para um convívio saudável com o mundo digital.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s7-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: Redes sociais e menores de idade',
          stimulus: 'Você leu um artigo sobre o debate em torno do uso de redes sociais por crianças e adolescentes.',
          text: 'Escreva um texto de opinião para um site de educação apresentando seu ponto de vista sobre o uso de redes sociais por menores de idade. Use argumentos do texto e discuta se a melhor solução é proibir, educar ou ambos. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `Moradia compartilhada: uma tendência entre os brasileiros\n\nDiante dos altos preços dos aluguéis nas grandes cidades, a moradia compartilhada — em que várias pessoas dividem uma casa ou apartamento — deixou de ser exclusividade de estudantes e virou realidade também para adultos e até idosos. O modelo permite dividir custos de aluguel, contas e alimentação, tornando a vida na cidade mais acessível.\n\nAlém da economia, quem defende esse estilo de vida destaca as vantagens sociais. Morar com outras pessoas reduz a solidão, cria uma rede de apoio no dia a dia e possibilita novas amizades. Para muitos que se mudam para uma cidade grande sem conhecer ninguém, dividir moradia é uma forma de não se sentir sozinho.\n\nMas a convivência nem sempre é fácil. Diferenças de hábitos, horários e personalidade podem gerar conflitos. Questões como limpeza, barulho, visitas e divisão de despesas precisam ser combinadas com clareza. Sem regras e diálogo, o que começa como uma boa ideia pode virar um pesadelo.\n\nEspecialistas recomendam definir acordos desde o início: um combinado sobre as tarefas, os gastos e o respeito ao espaço de cada um. Quando há organização e boa vontade, a moradia compartilhada pode ser não só uma solução econômica, mas também uma experiência enriquecedora de convivência.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s7-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: Moradia compartilhada',
          stimulus: 'Você leu uma reportagem sobre a tendência da moradia compartilhada no Brasil.',
          text: 'Escreva um e-mail a um amigo que vai se mudar para uma cidade grande e pensa em dividir apartamento com desconhecidos. Dê sua opinião sobre os prós e contras da moradia compartilhada e sugira acordos para evitar conflitos. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s7-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma fotografia de um jovem entregador de aplicativo pedalando na chuva, com uma mochila grande nas costas, no meio do trânsito de uma grande cidade.\n\nPontos para discutir:\n• O que a imagem revela sobre o trabalho por aplicativo?\n• Quais são os riscos e as dificuldades dessa profissão?\n• Por que tantas pessoas dependem desse tipo de trabalho hoje?\n• O que poderia melhorar as condições desses trabalhadores?',
          followUp: [
            'Você já usou serviços de entrega por aplicativo?',
            'Esses trabalhadores deveriam ter mais direitos? Quais?',
            'A flexibilidade compensa a falta de segurança?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s7-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: A importância da leitura na formação das pessoas\n\nPontos para discutir:\n• Por que muitos brasileiros leem pouco?\n• A leitura ainda é importante na era dos vídeos e das redes sociais?\n• Como incentivar o hábito de ler desde a infância?\n• Que papel têm as bibliotecas públicas nesse cenário?',
          followUp: [
            'Você gosta de ler? Que tipo de leitura?',
            'Ler na tela é a mesma coisa que ler em papel?',
            'Qual foi um livro que marcou a sua vida?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s7-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: Você tem um fim de semana livre e precisa escolher entre:\n1. Descansar em casa, sem compromissos, para recuperar as energias\n2. Viajar com amigos para um lugar novo, mesmo cansado\n\nO que você escolheria? Por quê?',
          followUp: [
            'Como você costuma aproveitar o seu tempo livre?',
            'O descanso é uma necessidade ou um luxo hoje em dia?',
            'É possível descansar de verdade em um mundo tão acelerado?',
          ],
        },
      ],
    },
  ],
};

export default mock;
