import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Tarefa 1 usa vídeo OFICIAL do acervo público
// da UFRGS (ufrgs.br/acervocelpebras); as perguntas foram reescritas, não copiadas do
// caderno oficial. Tarefas 2-4 e Parte Oral são conteúdo ORIGINAL WeLearn.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-10/ e /images/celpe-bras/set-10/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-10',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 10',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo oficial do CELPE-BRAS (edição 2006/2). Preste atenção ao tema e às informações apresentadas. Depois, redija o texto solicitado em português.',
      audioUrl: '/videos/celpe-bras/set-10.mp4',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s10-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Vídeo oficial CELPE-BRAS — Rio São Francisco',
          stimulus: '[Vídeo oficial CELPE-BRAS, edição 2006/2] Tema: "Rio São Francisco". Assista com atenção para compreender as informações apresentadas antes de escrever seu texto.',
          text: 'Com base no que você assistiu, escreva um texto sobre o tema do vídeo, no gênero e para o interlocutor que fizerem mais sentido para o assunto (por exemplo, uma carta, um e-mail, um texto informativo ou uma postagem). Explique o tema, comente as informações apresentadas e inclua sua própria opinião quando pertinente. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-10/tarefa-2.mp3',
      transcript: `Apresentadora: No quadro Sabores do Brasil, conversamos com o chef Antônio Ribeiro, que dedica a vida a resgatar ingredientes e receitas tradicionais brasileiras. Chef, por que esse trabalho é importante?\n\nAntônio: Porque a nossa culinária é uma das mais ricas do mundo, e muita gente não conhece nem metade dela. Temos ingredientes incríveis — frutas da Amazônia, raízes, peixes, ervas — que estão desaparecendo dos pratos. Resgatar isso é resgatar a nossa identidade.\n\nApresentadora: Você pode dar um exemplo?\n\nAntônio: Claro. O jambu, uma erva do Norte que deixa a boca formigando. Ou o pequi, do Cerrado. A castanha-do-Brasil. Ingredientes que os povos indígenas e as comunidades tradicionais usam há séculos, mas que a cozinha industrial deixou de lado em nome do que é padronizado e importado.\n\nApresentadora: E por que estamos perdendo essas tradições?\n\nAntônio: A globalização homogeneizou os gostos. As pessoas comem cada vez mais o mesmo: hambúrguer, pizza, comida congelada. É prático, mas empobrece a cultura e afasta a gente da nossa história. E, quando um ingrediente deixa de ser consumido, o produtor tradicional que vive dele também perde a sua fonte de renda.\n\nApresentadora: Como podemos valorizar essa culinária?\n\nAntônio: Conhecendo, cozinhando, comprando de pequenos produtores. Frequentando restaurantes que valorizam o local. E ensinando as crianças. A cozinha é memória, é afeto. Quando você come um prato da sua avó, você não come só comida; você come história.\n\nApresentadora: Uma delícia de conversa. Obrigada, chef.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s10-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista: culinária tradicional brasileira',
          stimulus: 'Você ouviu uma entrevista com o chef Antônio Ribeiro sobre o resgate de ingredientes e receitas tradicionais brasileiras.',
          text: 'Escreva uma carta a uma escola propondo um projeto de valorização da culinária tradicional brasileira entre os alunos. Use ideias da entrevista e sugira atividades concretas que despertem o interesse dos jovens pela cultura alimentar do país. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `A crise da água e o consumo consciente\n\nA água, que parece abundante em um país cheio de rios como o Brasil, é na verdade um recurso cada vez mais ameaçado. Crises de abastecimento, secas prolongadas e o desperdício revelam que a água doce e limpa não é infinita. Em várias regiões e cidades, a falta de água já é uma realidade preocupante.\n\nVários fatores contribuem para o problema. O desmatamento e a poluição dos rios reduzem a disponibilidade de água limpa. As mudanças climáticas alteram os regimes de chuva. E o desperdício, tanto nas residências quanto na indústria e na agricultura, agrava a situação. Estima-se que boa parte da água tratada se perca em vazamentos antes mesmo de chegar às torneiras.\n\nO consumo consciente é parte da solução. Pequenas atitudes no dia a dia — fechar a torneira ao escovar os dentes, tomar banhos mais curtos, reutilizar a água, consertar vazamentos — fazem diferença quando somadas por milhões de pessoas. Mas o esforço individual precisa ser acompanhado de políticas públicas: investir em saneamento, combater desperdícios e proteger os mananciais.\n\nCuidar da água é cuidar da vida. Sem ela, não há saúde, agricultura, indústria nem futuro. Reconhecer o seu valor e usá-la com responsabilidade é uma tarefa urgente de toda a sociedade.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s10-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: A crise da água',
          stimulus: 'Você leu um artigo sobre a crise da água e a importância do consumo consciente no Brasil.',
          text: 'Escreva um texto de opinião para uma revista ambiental apresentando seu ponto de vista sobre a crise da água. Use argumentos do texto, discuta as responsabilidades individuais e coletivas e proponha soluções. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `O poder dos "influenciadores digitais"\n\nOs influenciadores digitais tornaram-se figuras centrais na internet brasileira. Com milhões de seguidores, essas pessoas produzem conteúdo sobre praticamente tudo — moda, games, culinária, viagens, finanças — e exercem grande influência sobre o comportamento e o consumo do público, especialmente dos jovens.\n\nPor um lado, os influenciadores democratizaram a comunicação. Qualquer pessoa com talento e criatividade pode construir uma audiência e até transformar isso em profissão e renda. Muitos usam sua voz para promover causas importantes, informar e inspirar. Marcas e empresas passaram a vê-los como parceiros valiosos para se aproximar do público.\n\nPor outro lado, há preocupações. A busca por seguidores e curtidas pode levar à exposição exagerada da vida pessoal e à disseminação de padrões irreais de beleza e sucesso. Além disso, nem sempre fica claro o que é conteúdo sincero e o que é publicidade paga, o que pode enganar o consumidor. Casos de influenciadores promovendo produtos duvidosos ou espalhando informações falsas geram debates sobre responsabilidade.\n\nO desafio, tanto para os influenciadores quanto para o público, é a consciência crítica. Para quem produz, agir com ética e transparência. Para quem consome, lembrar que por trás das imagens perfeitas existe edição, seleção e, muitas vezes, interesse comercial. A internet é poderosa, mas exige responsabilidade dos dois lados da tela.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s10-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: O poder dos influenciadores digitais',
          stimulus: 'Você leu uma reportagem sobre a influência dos criadores de conteúdo digital no Brasil.',
          text: 'Escreva um e-mail a um primo mais jovem que quer ser influenciador digital e acredita em tudo o que vê nas redes. Dê sua opinião sobre os prós e contras dessa carreira e oriente-o a ter consciência crítica e ética. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s10-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma fotografia de um shopping center lotado no mesmo dia em que, ao lado, uma pequena rua de comércio tradicional está vazia, com lojas fechadas.\n\nPontos para discutir:\n• O que a imagem revela sobre o comércio no Brasil?\n• Por que os grandes centros de compra atraem tanta gente?\n• O que acontece com o pequeno comerciante?\n• Vale a pena preservar o comércio de rua tradicional?',
          followUp: [
            'Você prefere comprar em shoppings, no comércio de rua ou pela internet?',
            'O que se perde quando as pequenas lojas fecham?',
            'Como apoiar o comércio local?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s10-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: A importância do voto e da participação política\n\nPontos para discutir:\n• Por que muitas pessoas se sentem desanimadas com a política?\n• O voto realmente muda alguma coisa?\n• Além de votar, como o cidadão pode participar da vida pública?\n• Os jovens deveriam se envolver mais na política?',
          followUp: [
            'Você acompanha a política do seu país?',
            'O que faria as pessoas confiarem mais nos políticos?',
            'Participar de associações ou movimentos também é política?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s10-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: Você foi convidado para dois eventos no mesmo dia e horário:\n1. O casamento de um amigo próximo, em outra cidade\n2. Uma entrevista para o emprego dos seus sonhos, que não pode ser remarcada\n\nO que você escolheria? Por quê?',
          followUp: [
            'Como você costuma lidar com escolhas difíceis entre compromissos?',
            'A carreira deve vir antes ou depois dos relacionamentos?',
            'Você já se arrependeu de uma escolha parecida?',
          ],
        },
      ],
    },
  ],
};

export default mock;
