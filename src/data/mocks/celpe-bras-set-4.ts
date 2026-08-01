import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Tarefa 1 usa vídeo OFICIAL do acervo público
// da UFRGS (ufrgs.br/acervocelpebras); as perguntas foram reescritas, não copiadas do
// caderno oficial. Tarefas 2-4 e Parte Oral são conteúdo ORIGINAL WeLearn.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-4/ e /images/celpe-bras/set-4/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-4',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 4',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo oficial do CELPE-BRAS (edição 2000/1). Preste atenção ao tema e às informações apresentadas. Depois, redija o texto solicitado em português.',
      audioUrl: '/videos/celpe-bras/set-4.mp4',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s4-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Vídeo oficial CELPE-BRAS — O sanfoneiro do ônibus',
          stimulus: '[Vídeo oficial CELPE-BRAS, edição 2000/1] Tema: "O sanfoneiro do ônibus". Assista com atenção para compreender as informações apresentadas antes de escrever seu texto.',
          text: 'Com base no que você assistiu, escreva um texto sobre o tema do vídeo, no gênero e para o interlocutor que fizerem mais sentido para o assunto (por exemplo, uma carta, um e-mail, um texto informativo ou uma postagem). Explique o tema, comente as informações apresentadas e inclua sua própria opinião quando pertinente. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-4/tarefa-2.mp3',
      transcript: `Apresentadora: No nosso quadro Cultura Viva, conversamos hoje com o mestre Sebastião, um dos últimos artesãos que ainda produzem panelas de barro no litoral do Espírito Santo. Mestre Sebastião, como o senhor aprendeu esse ofício?\n\nMestre Sebastião: Aprendi com minha mãe, que aprendeu com a mãe dela. É uma tradição de mais de trezentos anos aqui na nossa comunidade. Desde criança eu já brincava com o barro.\n\nApresentadora: E como é o processo de fazer uma panela?\n\nMestre Sebastião: Ah, é trabalhoso. Primeiro a gente tira o barro do mangue, no lugar certo, na hora certa da maré. Depois amassa, molda com a mão, sem torno. Deixa secar na sombra, queima na fogueira e por fim passa a tinta da árvore de mangue, que dá aquela cor escura bonita.\n\nApresentadora: Essa tradição corre risco de desaparecer?\n\nMestre Sebastião: Corre, sim. Os jovens não querem mais aprender. Dá trabalho e ganha-se pouco. Muitos preferem procurar emprego na cidade. Se ninguém aprender, essa arte morre comigo e com as outras paneleiras.\n\nApresentadora: O que ajudaria a preservar esse saber?\n\nMestre Sebastião: Valorização, minha filha. As panelas de barro daqui já foram reconhecidas como patrimônio cultural. Isso ajuda. Mas precisa de mais: oficinas para ensinar os jovens, apoio para vender melhor, turismo que respeite a comunidade. Quando as pessoas entendem o valor, elas pagam o preço justo.\n\nApresentadora: Uma tradição que é história viva do Brasil. Muito obrigada, mestre.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s4-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista: artesanato tradicional',
          stimulus: 'Você ouviu uma entrevista com o mestre Sebastião, artesão de panelas de barro, sobre uma tradição que corre risco de desaparecer.',
          text: 'Escreva uma carta ao secretário de cultura do seu estado propondo ações para preservar e valorizar o artesanato tradicional. Use exemplos da entrevista e sugira medidas concretas de apoio aos artesãos. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `A revolução do PIX e o dinheiro digital\n\nLançado no fim de 2020 pelo Banco Central, o PIX transformou a forma como os brasileiros lidam com dinheiro. O sistema de pagamentos instantâneos permite transferir valores em segundos, a qualquer hora do dia, sem custo para pessoas físicas. Em poucos anos, o PIX se tornou o meio de pagamento mais usado no país, superando cartões e dinheiro em espécie.\n\nOs benefícios são muitos. Pequenos comerciantes, feirantes e trabalhadores informais, que antes só aceitavam dinheiro, passaram a receber pagamentos digitais com um simples QR Code. Milhões de brasileiros que não tinham acesso a serviços bancários foram incluídos no sistema financeiro. E a facilidade de dividir uma conta ou pagar um amigo tornou o dia a dia mais prático.\n\nMas há também preocupações. O aumento dos golpes financeiros e das fraudes online acompanhou a popularização do PIX. Criminosos usam mensagens falsas e até sequestros-relâmpago para obrigar as vítimas a fazer transferências. Além disso, especialistas alertam que a facilidade de gastar pode levar ao endividamento, especialmente entre os mais jovens.\n\nO desafio agora é educar a população para usar essas ferramentas com segurança e consciência. A tecnologia trouxe inclusão e comodidade, mas exige, em troca, atenção redobrada e uma boa dose de educação financeira.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s4-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: A revolução do PIX',
          stimulus: 'Você leu um artigo sobre o impacto do PIX e do dinheiro digital na vida dos brasileiros.',
          text: 'Escreva um texto de opinião para uma revista de economia apresentando seu ponto de vista sobre os benefícios e os riscos do dinheiro digital. Use argumentos do texto e proponha o que poderia ser feito para que a tecnologia beneficie a todos com segurança. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `A moda dos pets: quando o amor vira exagero?\n\nOs animais de estimação nunca foram tão importantes na vida dos brasileiros. Estima-se que o Brasil tenha uma das maiores populações de pets do mundo, e para muitas famílias, cães e gatos são tratados como verdadeiros membros da casa. Cresce o mercado de produtos e serviços: rações premium, planos de saúde para animais, hotéis, creches e até festas de aniversário.\n\nPor um lado, esse cuidado reflete uma mudança positiva: mais atenção ao bem-estar animal, mais adoções responsáveis e uma consciência maior sobre os maus-tratos. Muitos idosos e pessoas que vivem sozinhas encontram nos pets uma companhia que melhora a saúde física e mental.\n\nPor outro lado, alguns especialistas questionam certos exageros. Gastar fortunas com roupas e acessórios enquanto milhões de animais vivem abandonados nas ruas revela um contraste incômodo. Além disso, a "humanização" excessiva dos animais pode prejudicá-los, quando os donos esquecem que cães e gatos têm necessidades próprias da sua espécie.\n\nO equilíbrio parece estar no meio-termo: cuidar com carinho e responsabilidade, sem transformar o amor pelos animais em consumismo ou em projeção de necessidades humanas. Afinal, o que os pets mais precisam é de atenção, saúde e um lar seguro.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s4-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: A moda dos pets',
          stimulus: 'Você leu uma reportagem sobre a crescente importância dos animais de estimação na vida dos brasileiros e os exageros do mercado pet.',
          text: 'Escreva um e-mail a um amigo que acaba de adotar um cachorro e está gastando muito com produtos de luxo. Dê sua opinião de forma respeitosa, comente os prós e contras dessa "moda dos pets" e sugira formas de cuidar bem do animal sem exageros. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s4-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma fotografia de uma praia brasileira dividida em dois lados: um limpo e organizado, outro coberto de lixo e garrafas plásticas.\n\nPontos para discutir:\n• O que a imagem mostra sobre a relação das pessoas com o meio ambiente?\n• De quem é a responsabilidade por manter as praias limpas?\n• O que leva as pessoas a jogar lixo em lugares públicos?\n• Que ações poderiam mudar esse comportamento?',
          followUp: [
            'Você já participou de um mutirão de limpeza?',
            'Educação ambiental funciona ou é preciso multar quem suja?',
            'Como era essa consciência ambiental quando você era criança?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s4-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: O papel da tecnologia na educação\n\nPontos para discutir:\n• Tablets e celulares ajudam ou atrapalham a aprendizagem?\n• A tecnologia pode substituir o professor?\n• Como lidar com a desigualdade de acesso à tecnologia nas escolas?\n• Qual foi a maior mudança na educação por causa da tecnologia?',
          followUp: [
            'Como era estudar na sua época comparado com hoje?',
            'Você aprende melhor com um professor ou sozinho, pela internet?',
            'A tecnologia deixa os estudantes mais autônomos ou mais dependentes?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s4-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: Sua empresa oferece a você duas opções:\n1. Uma promoção com salário maior, mas mudança para outra cidade, longe de amigos e família\n2. Permanecer no cargo atual, na sua cidade, perto de quem você ama\n\nO que você escolheria? Por quê?',
          followUp: [
            'O que pesa mais nas suas decisões: a carreira ou os relacionamentos?',
            'Você mudaria de cidade ou país por um bom emprego?',
            'É possível recomeçar a vida em um lugar novo sem perder as raízes?',
          ],
        },
      ],
    },
  ],
};

export default mock;
