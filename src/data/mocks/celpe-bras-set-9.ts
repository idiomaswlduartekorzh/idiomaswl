import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Tarefa 1 usa vídeo OFICIAL do acervo público
// da UFRGS (ufrgs.br/acervocelpebras); as perguntas foram reescritas, não copiadas do
// caderno oficial. Tarefas 2-4 e Parte Oral são conteúdo ORIGINAL WeLearn.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-9/ e /images/celpe-bras/set-9/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-9',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 9',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo oficial do CELPE-BRAS (edição 2005/2). Preste atenção ao tema e às informações apresentadas. Depois, redija o texto solicitado em português.',
      audioUrl: '/api/celpe-bras-video?src=https%3A%2F%2Fwww.ufrgs.br%2Facervocelpebras%2Fwp-content%2Fuploads%2F2021%2F12%2F2005_2-Video-Expedicao-Vaga-Lume_comprimido.mp4',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s9-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Vídeo oficial CELPE-BRAS — Expedição Vaga-Lume',
          stimulus: '[Vídeo oficial CELPE-BRAS, edição 2005/2] Tema: "Expedição Vaga-Lume". Assista com atenção para compreender as informações apresentadas antes de escrever seu texto.',
          text: 'Com base no que você assistiu, escreva um texto sobre o tema do vídeo, no gênero e para o interlocutor que fizerem mais sentido para o assunto (por exemplo, uma carta, um e-mail, um texto informativo ou uma postagem). Explique o tema, comente as informações apresentadas e inclua sua própria opinião quando pertinente. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-9/tarefa-2.mp3',
      transcript: `Apresentador: No programa Ciência para Todos, recebemos a bióloga Helena Castro, que coordena um projeto de proteção das tartarugas marinhas no litoral brasileiro. Helena, como funciona esse trabalho?\n\nHelena: A gente monitora as praias onde as tartarugas desovam. Quando encontramos um ninho em local de risco, transferimos os ovos para uma área protegida. Depois que os filhotes nascem, acompanhamos até eles chegarem ao mar em segurança.\n\nApresentador: Quais são as maiores ameaças a esses animais?\n\nHelena: São muitas. A poluição, principalmente o plástico, que as tartarugas confundem com comida. A pesca acidental, quando ficam presas nas redes. A ocupação desordenada das praias, que destrói os locais de desova. E a iluminação artificial, que desorienta os filhotes.\n\nApresentador: E como a população pode ajudar?\n\nHelena: De várias formas simples. Não jogar lixo na praia. Reduzir o uso de plástico. Se encontrar uma tartaruga ou um ninho, avisar o projeto e não tocar. E, à noite, nas épocas de desova, evitar luzes fortes voltadas para o mar.\n\nApresentador: O trabalho tem dado resultados?\n\nHelena: Sim! Já soltamos milhões de filhotes ao longo dos anos, e algumas espécies que estavam ameaçadas começam a se recuperar. Mas é um trabalho de gerações. Cada filhote que salvamos hoje só vai voltar para desovar dali a vinte, trinta anos.\n\nApresentador: Uma lição de paciência e esperança. Obrigado, Helena.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s9-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista: proteção das tartarugas marinhas',
          stimulus: 'Você ouviu uma entrevista com a bióloga Helena Castro sobre um projeto de proteção das tartarugas marinhas.',
          text: 'Escreva uma carta aberta aos moradores e turistas de uma cidade litorânea conscientizando sobre a proteção das tartarugas marinhas. Use informações da entrevista e liste ações concretas que as pessoas podem adotar para ajudar. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `A desinformação e as "fake news"\n\nA circulação de notícias falsas — as chamadas "fake news" — tornou-se um dos maiores desafios da era digital. Com um clique, uma informação falsa pode alcançar milhões de pessoas em minutos, muitas vezes causando confusão, medo e até prejuízos reais. No Brasil, o fenômeno afeta desde eleições até a saúde pública.\n\nAs notícias falsas se espalham com facilidade por vários motivos. Elas costumam apelar às emoções, provocando indignação ou medo, o que aumenta o compartilhamento. Além disso, as pessoas tendem a acreditar em informações que confirmam suas opiniões, um fenômeno conhecido como "viés de confirmação". As redes sociais, com seus algoritmos, acabam reforçando esse ciclo.\n\nOs efeitos podem ser graves. Durante crises sanitárias, boatos sobre tratamentos falsos colocaram vidas em risco. Na política, a desinformação mina a confiança nas instituições e polariza a sociedade. Empresas e pessoas comuns também são alvos de mentiras que destroem reputações.\n\nCombater as fake news exige um esforço coletivo. As plataformas digitais precisam agir contra a desinformação. Mas a arma mais poderosa é a educação: ensinar as pessoas a verificar fontes, desconfiar de manchetes sensacionalistas e checar informações antes de compartilhar. Ser um leitor crítico é, hoje, uma forma essencial de cidadania.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s9-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: A desinformação e as fake news',
          stimulus: 'Você leu um artigo sobre o problema da desinformação e das notícias falsas no Brasil.',
          text: 'Escreva um texto de opinião para o jornal da sua comunidade apresentando seu ponto de vista sobre como combater as fake news. Use argumentos do texto e proponha ações que as plataformas, as escolas e as pessoas podem tomar. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `O consumo de produtos usados e a "economia circular"\n\nComprar e vender produtos usados deixou de ser sinônimo de necessidade e virou uma escolha consciente para muitos brasileiros. Roupas, móveis, eletrônicos e livros de segunda mão ganham nova vida por meio de brechós, aplicativos e feiras de troca. É a chamada economia circular, em que os produtos circulam por mais tempo em vez de virarem lixo.\n\nAs vantagens são muitas. Para o consumidor, é uma forma de economizar e encontrar peças únicas. Para o meio ambiente, significa menos produção, menos desperdício e menos poluição. Fabricar um produto novo consome recursos naturais e energia; reutilizar o que já existe reduz esse impacto de forma significativa.\n\nHouve também uma mudança cultural. Se antes usar algo de segunda mão era visto por alguns com preconceito, hoje é sinal de consciência e bom gosto. Comprar usado tornou-se, para muitos jovens, uma forma de expressar valores como sustentabilidade e consumo responsável.\n\nAinda há desafios, como garantir a qualidade e a procedência dos produtos. Mas a tendência é clara: em um mundo com recursos limitados, dar uma nova vida ao que já existe é não apenas econômico, mas também um gesto de cuidado com o planeta e com as próximas gerações.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s9-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: Produtos usados e economia circular',
          stimulus: 'Você leu uma reportagem sobre o consumo de produtos usados e a economia circular no Brasil.',
          text: 'Escreva um e-mail a um amigo que só compra produtos novos e tem preconceito com itens de segunda mão. Dê sua opinião sobre os benefícios da economia circular e sugira formas seguras de comprar e vender produtos usados. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s9-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma fotografia de uma criança fazendo lição de casa na calçada, à luz de um poste, à noite, porque não há energia elétrica em casa.\n\nPontos para discutir:\n• O que a imagem revela sobre as desigualdades no Brasil?\n• Como a falta de condições básicas afeta a educação das crianças?\n• Que oportunidades essas crianças perdem?\n• O que a sociedade e o governo poderiam fazer?',
          followUp: [
            'A educação pode romper o ciclo da pobreza?',
            'Todos os estudantes têm as mesmas oportunidades no seu país?',
            'O que mais impressiona você nessa imagem?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s9-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: O impacto do turismo na natureza\n\nPontos para discutir:\n• O turismo em áreas naturais ajuda ou prejudica o meio ambiente?\n• Como conciliar a visitação com a preservação?\n• Quem deve pagar pela conservação desses lugares?\n• Você prefere destinos naturais ou urbanos? Por quê?',
          followUp: [
            'Qual lugar natural você gostaria de conhecer?',
            'O turismo pode ajudar a proteger a natureza? Como?',
            'Você mudaria seus hábitos de viagem para ser mais sustentável?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s9-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: A sua empresa vai adotar o trabalho híbrido e deixa você escolher entre:\n1. Trabalhar a maior parte do tempo em casa, com poucos dias no escritório\n2. Trabalhar a maior parte do tempo no escritório, com poucos dias em casa\n\nO que você escolheria? Por quê?',
          followUp: [
            'Você se concentra melhor em casa ou no escritório?',
            'O convívio com os colegas faz falta no trabalho remoto?',
            'Qual é o modelo de trabalho ideal para você?',
          ],
        },
      ],
    },
  ],
};

export default mock;
