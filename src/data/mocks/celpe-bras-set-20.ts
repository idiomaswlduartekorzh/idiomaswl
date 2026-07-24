import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Conteúdo ORIGINAL WeLearn no formato oficial.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-20/ e /images/celpe-bras/set-20/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-20',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 20',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo (reportagem). Depois, redija o texto solicitado em português, adequado ao gênero, ao interlocutor e ao propósito indicados.',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s20-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Reportagem em vídeo',
          stimulus: '[Vídeo — reportagem, ~3 min] Uma reportagem mostra escolas e universidades que adotaram projetos de saúde mental para os estudantes. A repórter visita uma instituição com salas de acolhimento, rodas de conversa e apoio psicológico gratuito, entrevista estudantes que superaram crises de ansiedade e uma psicóloga que explica a importância de falar abertamente sobre emoções e de pedir ajuda sem vergonha.',
          text: 'Com base no vídeo, escreva um texto para o mural da sua instituição de ensino incentivando os estudantes a cuidarem da saúde mental e a buscarem apoio quando precisarem. Explique a importância do tema e como pedir ajuda é um sinal de força. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-20/tarefa-2.mp3',
      transcript: `Apresentadora: Encerramos a temporada do programa Gente que Transforma com a Dona Marlene, de 65 anos, que criou uma cozinha comunitária que serve centenas de refeições por dia a pessoas em situação de rua. Dona Marlene, como começou tudo?\n\nMarlene: Começou com uma panela de sopa. Eu via tanta gente com fome na minha rua que não consegui ficar parada. Fiz uma sopa, chamei alguns vizinhos para ajudar, e fomos distribuindo. De uma panela, viramos uma cozinha inteira.\n\nApresentadora: E como se mantém hoje?\n\nMarlene: Com muita solidariedade. Comerciantes doam alimentos que sobrariam, voluntários cozinham e servem, gente doa um pouquinho de dinheiro. É uma corrente do bem. Ninguém faz sozinho; é a comunidade toda.\n\nApresentadora: A senhora não se cansa?\n\nMarlene: Cansa o corpo, mas não o coração. Ver uma pessoa que estava com fome sair alimentada e com um sorriso, ser tratada com dignidade, isso me dá força. Comida a gente serve, mas o que a gente entrega mesmo é respeito e amor.\n\nApresentadora: Qual o recado que a senhora deixa?\n\nMarlene: Que cada um pode fazer alguma coisa. Não precisa ser grande. Um prato de comida, um abraço, um olhar de respeito. Se cada um fizer a sua parte, o mundo fica melhor. A fome não é falta de comida; é falta de partilha.\n\nApresentadora: Palavras que alimentam a alma. Muito obrigada, Dona Marlene.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s20-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista: cozinha comunitária',
          stimulus: 'Você ouviu uma entrevista com Dona Marlene, criadora de uma cozinha comunitária que combate a fome.',
          text: 'Escreva uma carta a comerciantes e moradores do seu bairro convidando-os a apoiar a cozinha comunitária de Dona Marlene, com doações ou trabalho voluntário. Use a história dela como inspiração e explique como cada um pode contribuir. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `A importância da diversidade cultural\n\nO Brasil é um dos países mais diversos do mundo. Da mistura de povos indígenas, africanos, europeus, asiáticos e de tantas outras origens nasceu uma cultura riquíssima, cheia de sotaques, ritmos, sabores, crenças e tradições. Essa diversidade é uma das maiores riquezas do país, embora nem sempre seja valorizada como merece.\n\nA diversidade cultural nos torna mais criativos e abertos. O contato com diferentes formas de pensar e viver amplia horizontes, combate preconceitos e enriquece a vida de todos. Uma sociedade diversa é mais inovadora, pois reúne múltiplos olhares para os mesmos desafios. A cultura brasileira, com sua mistura única, encanta o mundo justamente por essa pluralidade.\n\nNo entanto, a diversidade também enfrenta ameaças. Preconceitos de origem, cor, religião e região ainda dividem as pessoas. A globalização, embora conecte, pode homogeneizar culturas, apagando particularidades locais. Preservar as diferentes manifestações culturais — as línguas, as festas, as artes, as tradições — é essencial para não perdermos parte de quem somos.\n\nValorizar a diversidade é reconhecer que as diferenças não nos separam, mas nos completam. É aprender com o outro, respeitar o que é diferente e ver na variedade uma fonte de força, e não de conflito. Um país que abraça a sua diversidade é um país mais rico, mais justo e mais humano.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s20-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: A importância da diversidade cultural',
          stimulus: 'Você leu um artigo sobre a importância de valorizar a diversidade cultural do Brasil.',
          text: 'Escreva um texto de opinião para uma revista cultural apresentando seu ponto de vista sobre a importância da diversidade cultural. Use argumentos do texto e proponha como a sociedade pode valorizar e preservar as diferentes culturas do país. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `O impacto do trabalho voluntário na comunidade\n\nEm todo o Brasil, milhares de pessoas doam seu tempo e suas habilidades para ajudar os outros sem receber nada em troca. São voluntários que dão aulas de reforço, cuidam de idosos, cozinham para quem tem fome, plantam árvores, resgatam animais e realizam inúmeras outras ações. O trabalho voluntário é uma força silenciosa que transforma comunidades.\n\nOs benefícios são de mão dupla. Quem recebe a ajuda tem sua vida melhorada, muitas vezes em situações em que o poder público não chega. E quem ajuda também ganha: estudos mostram que o voluntariado aumenta a sensação de propósito, reduz o estresse e fortalece os laços sociais. Ajudar faz bem a quem é ajudado e a quem ajuda.\n\nO voluntariado também constrói pontes. Ele aproxima pessoas de diferentes origens em torno de uma causa comum, criando um senso de comunidade e pertencimento. Em uma sociedade muitas vezes marcada pelo individualismo, o voluntário lembra a todos que somos responsáveis uns pelos outros.\n\nIncentivar o trabalho voluntário é investir em uma sociedade mais solidária. Escolas, empresas e governos podem criar oportunidades e reconhecer quem se dedica a essas causas. Mas, no fundo, o voluntariado começa com uma escolha simples: a de olhar para o outro e decidir fazer algo. E essa escolha está ao alcance de todos.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s20-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: O impacto do trabalho voluntário',
          stimulus: 'Você leu uma reportagem sobre o impacto do trabalho voluntário nas comunidades brasileiras.',
          text: 'Escreva um e-mail a um amigo que gostaria de ajudar os outros, mas acha que "não tem tempo nem dinheiro" para isso. Dê sua opinião sobre o trabalho voluntário, mostre que ajudar não exige muito e sugira formas simples de ele começar. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s20-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma fotografia de uma grande roda de pessoas de diferentes idades, etnias e estilos, todas de mãos dadas, sorrindo, em uma praça pública durante uma festa cultural.\n\nPontos para discutir:\n• O que a imagem transmite sobre a sociedade brasileira?\n• Qual é o valor da diversidade cultural?\n• Como as diferenças podem unir em vez de separar?\n• O que se perde quando uma cultura desaparece?',
          followUp: [
            'O que você mais aprecia na diversidade do seu país?',
            'Você já aprendeu algo importante com pessoas muito diferentes de você?',
            'Como combater o preconceito no dia a dia?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s20-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: A solidariedade e o individualismo na sociedade\n\nPontos para discutir:\n• A sociedade atual é mais solidária ou mais individualista?\n• O que leva as pessoas a ajudar (ou a não ajudar) os outros?\n• A tecnologia aproxima ou afasta as pessoas da solidariedade?\n• Como construir uma sociedade que cuide mais uns dos outros?',
          followUp: [
            'Você já ajudou um estranho? O que sentiu?',
            'É mais fácil ou mais difícil ser solidário hoje?',
            'A solidariedade se aprende? Onde?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s20-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: Você tem a oportunidade de dedicar um período da sua vida a algo importante e precisa escolher entre:\n1. Focar totalmente na sua carreira e no seu crescimento profissional\n2. Dedicar boa parte do seu tempo a uma causa social em que você acredita\n\nO que você escolheria? Por quê? É possível conciliar os dois?',
          followUp: [
            'O sucesso pessoal e a contribuição para os outros podem andar juntos?',
            'O que dá mais sentido à vida para você?',
            'Você admira mais quem vence sozinho ou quem ajuda os outros a vencer?',
          ],
        },
      ],
    },
  ],
};

export default mock;
