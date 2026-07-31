import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Tarefa 1 usa vídeo OFICIAL do acervo público
// da UFRGS (ufrgs.br/acervocelpebras); as perguntas foram reescritas, não copiadas do
// caderno oficial. Tarefas 2-4 e Parte Oral são conteúdo ORIGINAL WeLearn.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-18/ e /images/celpe-bras/set-18/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-18',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 18',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo oficial do CELPE-BRAS (edição 2012/2). Preste atenção ao tema e às informações apresentadas. Depois, redija o texto solicitado em português.',
      audioUrl: '/api/celpe-bras-video?src=https%3A%2F%2Fwww.ufrgs.br%2Facervocelpebras%2Fwp-content%2Fuploads%2F2021%2F12%2F2012_2-Video-Copacabana-comemora-120-anos_comprimido.mp4',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s18-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Vídeo oficial CELPE-BRAS — Copacabana comemora 120 anos',
          stimulus: '[Vídeo oficial CELPE-BRAS, edição 2012/2] Tema: "Copacabana comemora 120 anos". Assista com atenção para compreender as informações apresentadas antes de escrever seu texto.',
          text: 'Com base no que você assistiu, escreva um texto sobre o tema do vídeo, no gênero e para o interlocutor que fizerem mais sentido para o assunto (por exemplo, uma carta, um e-mail, um texto informativo ou uma postagem). Explique o tema, comente as informações apresentadas e inclua sua própria opinião quando pertinente. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-18/tarefa-2.mp3',
      transcript: `Apresentadora: Hoje conversamos com a psicopedagoga Renata Bittencourt sobre um tema importante: a inclusão de crianças com autismo nas escolas. Renata, como está essa inclusão no Brasil?\n\nRenata: Avançamos bastante, mas ainda há muito a fazer. Hoje a lei garante o direito dessas crianças à escola regular, com apoio. Mas, na prática, faltam formação para os professores, profissionais de apoio e estrutura adequada em muitas escolas.\n\nApresentadora: Por que a inclusão é tão importante?\n\nRenata: Porque a criança autista aprende e se desenvolve muito mais convivendo com as outras. E os colegas também aprendem: a respeitar as diferenças, a ter empatia, a conviver com a diversidade. A inclusão faz bem para todos, não só para a criança incluída.\n\nApresentadora: Quais são os maiores desafios?\n\nRenata: O preconceito e o desconhecimento, principalmente. Muita gente ainda não entende o autismo. Cada criança é diferente. Precisamos de escolas preparadas, de professores capacitados e de uma sociedade mais informada e acolhedora.\n\nApresentadora: O que os pais e a comunidade podem fazer?\n\nRenata: Informar-se, cobrar direitos, apoiar as famílias. E ter paciência e carinho. Uma criança autista incluída com respeito floresce. Já vi crianças que diziam não falar se tornarem participativas, quando encontraram um ambiente que as acolheu de verdade.\n\nApresentadora: Uma conversa que abre os olhos e o coração. Obrigada, Renata.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s18-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista: inclusão de crianças com autismo',
          stimulus: 'Você ouviu uma entrevista com a psicopedagoga Renata Bittencourt sobre a inclusão de crianças com autismo nas escolas.',
          text: 'Escreva uma carta à direção de uma escola propondo medidas para melhorar a inclusão de crianças com autismo e outras deficiências. Use argumentos da entrevista e sugira ações concretas de formação, estrutura e acolhimento. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `A importância da atividade física para a saúde\n\nO sedentarismo tornou-se um dos maiores problemas de saúde pública do mundo moderno, e o Brasil não é exceção. Com a vida cada vez mais ligada a telas, cadeiras e transporte motorizado, muitas pessoas passam horas sem se movimentar. As consequências para a saúde são graves e bem documentadas.\n\nA atividade física regular traz benefícios enormes. Fortalece o coração, controla o peso, reduz o risco de doenças como diabetes e hipertensão, e melhora a saúde dos ossos e músculos. Mas os benefícios não param no corpo: exercitar-se melhora o humor, reduz a ansiedade e a depressão, e ajuda a dormir melhor. O movimento é remédio para o corpo e para a mente.\n\nO melhor é que não é preciso ser atleta. Caminhar, dançar, andar de bicicleta, brincar com as crianças, subir escadas em vez de usar o elevador: pequenas mudanças no dia a dia já fazem diferença. O importante é sair da inatividade e incorporar o movimento à rotina, de forma prazerosa e sustentável.\n\nCriar uma cultura de atividade física é responsabilidade de todos. As cidades precisam de espaços seguros para caminhar e praticar esportes; as escolas, de educação física de qualidade; e cada pessoa, de consciência sobre a importância de se mover. Um povo mais ativo é um povo mais saudável, feliz e produtivo.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s18-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: A importância da atividade física',
          stimulus: 'Você leu um artigo sobre o sedentarismo e a importância da atividade física para a saúde.',
          text: 'Escreva um texto de opinião para uma revista de saúde apresentando seu ponto de vista sobre a importância da atividade física. Use argumentos do texto e proponha o que as pessoas, as cidades e as escolas podem fazer para combater o sedentarismo. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `As feiras livres e o comércio de proximidade\n\nApesar do avanço dos supermercados e do comércio online, as feiras livres resistem e continuam vivas nas cidades brasileiras. Todas as semanas, ruas se transformam em pontos de encontro cheios de cor, cheiro e movimento, onde produtores e consumidores se encontram cara a cara. Mais do que um lugar de compras, a feira é um espaço de convivência e cultura.\n\nAs feiras têm muitas vantagens. Os alimentos costumam ser mais frescos e variados, muitas vezes vindos direto do produtor. Os preços são competitivos, e a compra sustenta pequenos agricultores e comerciantes, mantendo o dinheiro na economia local. Comprar na feira é também apoiar quem trabalha com as próprias mãos.\n\nHá ainda um valor humano difícil de medir. Na feira, as pessoas conversam, conhecem os vendedores pelo nome, trocam receitas e histórias. Cria-se uma relação de confiança e de comunidade que o comércio impessoal não oferece. A feira aquece não só a economia, mas também os laços sociais.\n\nValorizar as feiras livres e o comércio de proximidade é preservar um modo de vida e fortalecer as comunidades. Em um mundo cada vez mais automatizado e distante, a feira nos lembra do prazer do contato humano, do alimento de verdade e da força do pequeno. Vale a pena manter essa tradição viva.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s18-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: As feiras livres',
          stimulus: 'Você leu uma reportagem sobre a importância das feiras livres e do comércio de proximidade.',
          text: 'Escreva um e-mail a um amigo que só compra em supermercados e pela internet e nunca vai a feiras. Dê sua opinião sobre os benefícios das feiras livres e convença-o a experimentar essa forma de comprar. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s18-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma fotografia de uma feira livre movimentada, com barracas coloridas de frutas e verduras, e pessoas conversando animadamente com os feirantes.\n\nPontos para discutir:\n• O que a cena transmite sobre a vida em comunidade?\n• Que vantagens a feira tem em relação ao supermercado?\n• Por que é importante apoiar o pequeno produtor?\n• A relação humana no comércio está se perdendo?',
          followUp: [
            'Você costuma ir a feiras? Como é a experiência?',
            'O que se ganha ao comprar diretamente de quem produz?',
            'O contato humano no comércio faz falta?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s18-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: A inclusão de pessoas com deficiência\n\nPontos para discutir:\n• As cidades e as escolas estão preparadas para incluir pessoas com deficiência?\n• Quais barreiras (físicas e de atitude) ainda existem?\n• Como a inclusão beneficia toda a sociedade, não só quem é incluído?\n• O que cada pessoa pode fazer para tornar o mundo mais inclusivo?',
          followUp: [
            'A sua cidade é acessível para pessoas com deficiência?',
            'Você conhece histórias de superação e inclusão?',
            'O maior obstáculo é a estrutura ou o preconceito?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s18-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: Você tem um dia inteiro livre e uma quantia de dinheiro para gastar. Precisa escolher entre:\n1. Fazer algo só para você (um passeio, uma compra, um mimo pessoal)\n2. Usar o tempo e o dinheiro para ajudar alguém que precisa\n\nO que você escolheria? Por quê? É possível fazer os dois?',
          followUp: [
            'Cuidar de si mesmo é egoísmo?',
            'Ajudar os outros também traz felicidade para quem ajuda?',
            'Como equilibrar as próprias necessidades e as dos outros?',
          ],
        },
      ],
    },
  ],
};

export default mock;
