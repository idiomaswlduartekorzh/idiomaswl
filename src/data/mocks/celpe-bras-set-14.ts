import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Conteúdo ORIGINAL WeLearn no formato oficial.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-14/ e /images/celpe-bras/set-14/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-14',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 14',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo (reportagem). Depois, redija o texto solicitado em português, adequado ao gênero, ao interlocutor e ao propósito indicados.',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s14-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Reportagem em vídeo',
          stimulus: '[Vídeo — reportagem, ~3 min] Uma reportagem mostra o sucesso de cooperativas de crédito e finanças solidárias em pequenas cidades do interior. A repórter entrevista moradores que conseguiram abrir pequenos negócios com empréstimos comunitários, uma coordenadora que explica o funcionamento do banco comunitário e um economista que fala sobre como o dinheiro que circula localmente fortalece a economia da região.',
          text: 'Com base no vídeo, escreva um texto para o boletim de uma associação de moradores explicando o que é um banco comunitário e como ele pode ajudar a economia local. Incentive os moradores a conhecer e apoiar a iniciativa. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-14/tarefa-2.mp3',
      transcript: `Apresentadora: Recebemos hoje o médico Paulo Vasconcelos, que atua em uma unidade de saúde na zona rural da Amazônia. Doutor Paulo, como é o seu trabalho lá?\n\nPaulo: É desafiador e apaixonante. Atendo comunidades ribeirinhas que só se alcança de barco. Às vezes viajo horas rio abaixo para chegar a um paciente. Cada consulta é uma lição de humanidade.\n\nApresentadora: Quais são as maiores dificuldades?\n\nPaulo: A distância, principalmente. Uma emergência que na cidade se resolve em minutos, ali pode levar horas. Falta de equipamentos, de medicamentos. E, muitas vezes, a barreira cultural: preciso respeitar os saberes tradicionais e as parteiras da comunidade, trabalhar junto com elas.\n\nApresentadora: E o que o mantém motivado?\n\nPaulo: A gratidão das pessoas. E ver que faço diferença. Levar vacina para uma criança que nunca viu um médico, orientar uma gestante, salvar uma vida que sem atendimento se perderia. Isso não tem preço.\n\nApresentadora: O que a saúde nessas regiões precisa?\n\nPaulo: Mais investimento, mais profissionais dispostos a ir, telemedicina para conectar com especialistas das cidades, e transporte adequado. Mas, acima de tudo, precisa que a gente não esqueça essas populações. Elas são brasileiras como qualquer outra e merecem saúde de qualidade.\n\nApresentadora: Um exemplo de dedicação. Obrigada, doutor Paulo.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s14-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista: saúde em regiões remotas',
          stimulus: 'Você ouviu uma entrevista com o médico Paulo Vasconcelos, que atende comunidades ribeirinhas na Amazônia.',
          text: 'Escreva uma carta ao Ministério da Saúde chamando a atenção para as dificuldades de acesso à saúde em regiões remotas do Brasil. Use exemplos da entrevista e proponha medidas concretas para melhorar o atendimento a essas populações. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `O papel dos jogos eletrônicos na sociedade\n\nDurante muito tempo vistos apenas como passatempo infantil, os jogos eletrônicos — os videogames — tornaram-se um fenômeno cultural e econômico de enormes proporções. Hoje, a indústria dos games movimenta mais dinheiro do que o cinema e a música juntos, e pessoas de todas as idades e classes sociais jogam.\n\nOs benefícios dos jogos vão além da diversão. Estudos mostram que certos games podem desenvolver raciocínio lógico, coordenação, capacidade de resolver problemas e trabalho em equipe. Jogos educativos são usados em escolas, e os "esportes eletrônicos" (e-sports) já enchem estádios e distribuem prêmios milionários, criando novas profissões.\n\nPor outro lado, há preocupações legítimas. O uso excessivo pode levar ao sedentarismo, ao isolamento e, em casos extremos, ao vício. Alguns jogos contêm violência ou incentivam gastos com compras dentro do próprio jogo, o que preocupa pais e educadores. O equilíbrio, como em quase tudo, é a chave.\n\nEm vez de demonizar ou idolatrar os games, o mais sensato é compreendê-los. Reconhecer seu potencial educativo, econômico e social, ao mesmo tempo em que se orienta um uso consciente e equilibrado. Como qualquer tecnologia, os jogos eletrônicos podem ser aliados ou vilões — depende de como os usamos.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s14-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: O papel dos jogos eletrônicos',
          stimulus: 'Você leu um artigo sobre o papel e o impacto dos jogos eletrônicos na sociedade.',
          text: 'Escreva um texto de opinião para uma revista de comportamento apresentando seu ponto de vista sobre os jogos eletrônicos. Use argumentos do texto, discuta os benefícios e os riscos e proponha um uso equilibrado. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `Hortas nas escolas: aprender plantando\n\nCada vez mais escolas brasileiras estão criando hortas em seus pátios. A ideia é simples, mas poderosa: transformar um pedaço de terra em uma sala de aula ao ar livre, onde os alunos aprendem plantando, cuidando e colhendo. Os resultados vão muito além da produção de alimentos.\n\nA horta escolar ensina de forma prática. Nas atividades, as crianças aprendem ciências (o ciclo das plantas, o solo, a água), matemática (medir canteiros, contar sementes), e até português e artes. Aprendem também paciência, responsabilidade e trabalho em equipe, já que uma horta exige cuidado constante e colaboração.\n\nHá benefícios para a alimentação. As crianças que plantam tendem a comer melhor: quem cultivou uma alface tem muito mais vontade de experimentá-la. A horta introduz o gosto por alimentos saudáveis e naturais, combatendo hábitos alimentares ruins desde cedo.\n\nAlém disso, o contato com a terra e a natureza traz bem-estar, reduz o estresse e desperta o cuidado com o meio ambiente. Uma horta na escola planta muito mais do que verduras: planta conhecimento, saúde, valores e uma relação mais consciente com a natureza e com a comida. É educação em seu sentido mais completo.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s14-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: Hortas nas escolas',
          stimulus: 'Você leu uma reportagem sobre os benefícios das hortas escolares.',
          text: 'Escreva um e-mail a um amigo que é professor e está em dúvida se vale a pena criar uma horta na escola onde trabalha. Dê sua opinião sobre os benefícios do projeto e sugira como ele poderia começar, mesmo com poucos recursos. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s14-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma fotografia de crianças de uma escola trabalhando juntas em uma horta, sorrindo e com as mãos na terra.\n\nPontos para discutir:\n• O que as crianças estão aprendendo nessa atividade, além de plantar?\n• Por que o contato com a natureza é importante na infância?\n• Como esse tipo de projeto muda a relação das crianças com a comida?\n• A escola deveria ir além do ensino tradicional em sala de aula?',
          followUp: [
            'Você teve contato com a natureza na sua infância?',
            'O que a escola poderia ensinar que hoje não ensina?',
            'Aprender fazendo é mais eficaz do que só ouvir?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s14-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: O trabalho em equipe e o individualismo\n\nPontos para discutir:\n• A sociedade valoriza mais o esforço individual ou o coletivo?\n• Quais são as vantagens de trabalhar em equipe?\n• Por que algumas pessoas preferem trabalhar sozinhas?\n• Como lidar com conflitos em um grupo?',
          followUp: [
            'Você prefere trabalhar em equipe ou sozinho?',
            'Já teve uma experiência ruim (ou muito boa) trabalhando em grupo?',
            'O que faz uma equipe funcionar bem?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s14-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: Você encontra uma carteira cheia de dinheiro na rua, com os documentos do dono. Você precisa decidir entre:\n1. Ter o trabalho de localizar o dono e devolver tudo\n2. Entregar em uma delegacia e seguir a sua vida\n\nO que você faria? Por quê? Existe uma terceira opção?',
          followUp: [
            'O que define uma pessoa honesta?',
            'Você já perdeu ou achou algo importante? O que aconteceu?',
            'A honestidade depende da situação ou deve ser sempre igual?',
          ],
        },
      ],
    },
  ],
};

export default mock;
