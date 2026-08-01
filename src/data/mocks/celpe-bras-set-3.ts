import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Tarefa 1 usa vídeo OFICIAL do acervo público
// da UFRGS (ufrgs.br/acervocelpebras); as perguntas foram reescritas, não copiadas do
// caderno oficial. Tarefas 2-4 e Parte Oral são conteúdo ORIGINAL WeLearn.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-3/ e /images/celpe-bras/set-3/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-3',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 3',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo oficial do CELPE-BRAS (edição 1999/1). Preste atenção ao tema e às informações apresentadas. Depois, redija o texto solicitado em português.',
      audioUrl: '/videos/celpe-bras/set-3.mp4',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s3-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Vídeo oficial CELPE-BRAS — Entrevista com Boris Casoy',
          stimulus: '[Vídeo oficial CELPE-BRAS, edição 1999/1] Tema: "Entrevista com Boris Casoy". Assista com atenção para compreender as informações apresentadas antes de escrever seu texto.',
          text: 'Com base no que você assistiu, escreva um texto sobre o tema do vídeo, no gênero e para o interlocutor que fizerem mais sentido para o assunto (por exemplo, uma carta, um e-mail, um texto informativo ou uma postagem). Explique o tema, comente as informações apresentadas e inclua sua própria opinião quando pertinente. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-3/tarefa-2.mp3',
      transcript: `Apresentador: No quadro Saúde em Foco, recebemos hoje a nutricionista Camila Torres para falar sobre um tema que preocupa: a alimentação das crianças brasileiras. Camila, qual é o principal problema que você observa?\n\nCamila: O maior problema hoje é o excesso de alimentos ultraprocessados na dieta das crianças. Biscoitos recheados, refrigerantes, salgadinhos, macarrão instantâneo... esses produtos são práticos e baratos, mas cheios de açúcar, sal e gordura.\n\nApresentador: E por que os pais recorrem tanto a esses alimentos?\n\nCamila: Falta de tempo, principalmente. Muitas famílias trabalham o dia todo e não têm tempo de cozinhar. Além disso, esses produtos são muito bem divulgados na propaganda, com personagens que as crianças adoram.\n\nApresentador: Quais são as consequências?\n\nCamila: A gente já vê obesidade infantil em níveis alarmantes, além de diabetes e outras doenças que antes só apareciam em adultos. E isso afeta também a concentração e o desempenho escolar das crianças.\n\nApresentador: O que pode ser feito?\n\nCamila: Educação alimentar nas escolas é fundamental. Ensinar as crianças a reconhecer os alimentos, envolvê-las no preparo das refeições. E políticas públicas também: regular a propaganda de alimentos para crianças, oferecer comida de verdade na merenda escolar.\n\nApresentador: Uma última dica para os pais que estão ouvindo?\n\nCamila: Comecem devagar. Substituam um ultraprocessado por dia por uma fruta, um alimento natural. Pequenas mudanças fazem uma grande diferença a longo prazo.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s3-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista de rádio: alimentação infantil',
          stimulus: 'Você ouviu uma entrevista com a nutricionista Camila Torres sobre a alimentação das crianças brasileiras.',
          text: 'Escreva uma carta à direção da escola do seu filho (ou de um familiar) propondo ações para melhorar a alimentação das crianças na escola. Use argumentos da entrevista e sugira medidas concretas. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `A polêmica dos aplicativos de transporte\n\nDesde que chegaram ao Brasil, os aplicativos de transporte transformaram a forma como as pessoas se locomovem nas cidades. Com poucos toques no celular, é possível pedir um carro, saber o preço antecipadamente e pagar sem dinheiro em espécie. Para muitos usuários, foi uma revolução de comodidade e segurança.\n\nMas o modelo também gerou debates acalorados. De um lado, taxistas reclamam da concorrência que consideram desleal, já que, segundo eles, os motoristas de aplicativo não enfrentam as mesmas exigências e custos. De outro, milhões de brasileiros passaram a ter uma fonte de renda dirigindo por aplicativo, muitas vezes como principal ou única ocupação.\n\nO ponto mais delicado, porém, é a situação trabalhista desses motoristas. Eles não têm carteira assinada, férias, décimo terceiro nem contribuição para a aposentadoria. As empresas argumentam que os motoristas são "parceiros" autônomos, livres para trabalhar quando quiserem. Já sindicatos e parte da Justiça defendem que existe, sim, uma relação de emprego que deveria garantir direitos.\n\nEnquanto o debate jurídico não se resolve, milhões de trabalhadores seguem nessa zona cinzenta: com a flexibilidade que valorizam, mas sem a proteção que a legislação trabalhista tradicionalmente oferece. O desafio para o Brasil é encontrar um modelo que preserve as vantagens da tecnologia sem deixar os trabalhadores desprotegidos.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s3-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: A polêmica dos aplicativos de transporte',
          stimulus: 'Você leu um artigo sobre o debate em torno dos aplicativos de transporte e os direitos dos motoristas no Brasil.',
          text: 'Escreva um texto de opinião para um blog de debates atuais apresentando seu ponto de vista sobre a situação dos motoristas de aplicativo. Use argumentos do texto e sua própria reflexão sobre como equilibrar flexibilidade e direitos. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `Voluntariado cresce entre os jovens brasileiros\n\nAo contrário do que muitos imaginam, os jovens brasileiros estão cada vez mais engajados em causas sociais. Pesquisas recentes mostram um aumento no número de pessoas entre 18 e 29 anos que dedicam parte do seu tempo ao trabalho voluntário — seja dando aulas de reforço, ajudando em campanhas de doação, cuidando de animais abandonados ou participando de mutirões de limpeza.\n\nAs motivações são diversas. Alguns buscam dar sentido ao seu tempo livre; outros querem desenvolver habilidades e enriquecer o currículo; e há aqueles movidos pela simples vontade de ajudar. As redes sociais também tiveram um papel importante, facilitando a organização de grupos e a divulgação de ações.\n\nEspecialistas apontam benefícios que vão além de quem recebe a ajuda. O voluntariado desenvolve empatia, responsabilidade e senso de comunidade. Muitos jovens relatam que a experiência mudou sua forma de ver o mundo e até influenciou suas escolhas profissionais.\n\nAinda assim, há desafios. A falta de tempo, devido aos estudos e ao trabalho, é o principal obstáculo. Por isso, muitas organizações passaram a oferecer o "voluntariado digital", que pode ser feito de casa, como traduzir textos, dar mentorias online ou apoiar campanhas na internet. Uma coisa é certa: engajar-se em uma causa é uma forma poderosa de transformar a própria vida e a da comunidade.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s3-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: Voluntariado entre jovens',
          stimulus: 'Você leu uma reportagem sobre o crescimento do trabalho voluntário entre os jovens brasileiros.',
          text: 'Escreva um e-mail a um amigo que anda desanimado e sem saber o que fazer no tempo livre, incentivando-o a fazer trabalho voluntário. Explique os benefícios, dê exemplos de atividades (inclusive online) e conte por que você acha que valeria a pena. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s3-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma fotografia de uma rua completamente tomada por um congestionamento de carros ao lado de um ônibus lotado e uma ciclovia vazia.\n\nPontos para discutir:\n• O que a imagem revela sobre a mobilidade nas cidades brasileiras?\n• Por que muitas pessoas preferem o carro particular?\n• O que poderia incentivar o uso de transporte público e bicicleta?\n• Como o trânsito afeta a qualidade de vida e o meio ambiente?',
          followUp: [
            'Quanto tempo você gasta no trânsito por dia?',
            'Você usaria mais o transporte público se ele fosse melhor? Em quê ele precisaria melhorar?',
            'As cidades brasileiras foram planejadas para carros ou para pessoas?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s3-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: O consumo consciente e o desperdício de alimentos\n\nPontos para discutir:\n• Por que tanta comida é desperdiçada no Brasil enquanto muitos passam fome?\n• Quem são os responsáveis: os consumidores, os supermercados, os produtores?\n• O que você faz para evitar o desperdício em casa?\n• Que soluções poderiam reduzir o desperdício de alimentos?',
          followUp: [
            'Você costuma aproveitar sobras de comida? Como?',
            'Você já ouviu falar de bancos de alimentos ou aplicativos que combatem o desperdício?',
            'Quem deveria liderar essa mudança: o governo, as empresas ou as pessoas?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s3-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: Você ganhou uma bolsa de estudos para passar um ano no exterior, mas isso significaria ficar longe da sua família e adiar em um ano a conclusão do seu curso no Brasil.\n\nVocê aceitaria a bolsa? Por quê?',
          followUp: [
            'O que é mais importante para você: experiências novas ou a segurança do que já conhece?',
            'Morar em outro país muda uma pessoa? De que forma?',
            'Você já teve que tomar uma decisão difícil que envolvia sair da sua zona de conforto?',
          ],
        },
      ],
    },
  ],
};

export default mock;
