import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Tarefa 1 usa vídeo OFICIAL do acervo público
// da UFRGS (ufrgs.br/acervocelpebras); as perguntas foram reescritas, não copiadas do
// caderno oficial. Tarefas 2-4 e Parte Oral são conteúdo ORIGINAL WeLearn.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-5/ e /images/celpe-bras/set-5/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-5',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 5',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo oficial do CELPE-BRAS (edição 2002/1). Preste atenção ao tema e às informações apresentadas. Depois, redija o texto solicitado em português.',
      audioUrl: '/videos/celpe-bras/set-5.mp4',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s5-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Vídeo oficial CELPE-BRAS — Abrindo um negócio próprio',
          stimulus: '[Vídeo oficial CELPE-BRAS, edição 2002/1] Tema: "Abrindo um negócio próprio". Assista com atenção para compreender as informações apresentadas antes de escrever seu texto.',
          text: 'Com base no que você assistiu, escreva um texto sobre o tema do vídeo, no gênero e para o interlocutor que fizerem mais sentido para o assunto (por exemplo, uma carta, um e-mail, um texto informativo ou uma postagem). Explique o tema, comente as informações apresentadas e inclua sua própria opinião quando pertinente. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-5/tarefa-2.mp3',
      transcript: `Apresentador: Hoje no programa Cidade em Movimento, recebemos a arquiteta urbanista Renata Lima, especialista em requalificação de espaços públicos. Renata, o que significa "devolver a cidade às pessoas"?\n\nRenata: Significa repensar as cidades que, durante décadas, foram planejadas prioritariamente para os carros. Devolver a cidade às pessoas é criar praças, calçadas largas, ciclovias, áreas de convivência — espaços onde as pessoas queiram estar.\n\nApresentador: Você tem algum exemplo bem-sucedido no Brasil?\n\nRenata: Vários. Em algumas cidades, ruas que antes eram só para carros foram fechadas aos fins de semana e viraram espaços de lazer, com feiras, música e brincadeiras para as crianças. O comércio local até fatura mais, ao contrário do que muitos temiam.\n\nApresentador: E qual é a maior resistência a esses projetos?\n\nRenata: A cultura do automóvel. Muita gente acha que qualquer espaço tirado dos carros é um problema. Mas quando a mudança acontece e as pessoas experimentam uma praça bonita ou uma rua tranquila para caminhar, elas mudam de ideia.\n\nApresentador: O que é preciso para transformar uma cidade?\n\nRenata: Vontade política, participação da comunidade e projetos bem feitos. Não adianta impor de cima para baixo. As melhores transformações acontecem quando os moradores são ouvidos e se sentem donos daquele espaço.\n\nApresentador: Uma cidade mais humana é possível, então.\n\nRenata: Não só é possível como é urgente. Cidades para pessoas são mais saudáveis, mais seguras e mais felizes.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s5-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista: cidades para pessoas',
          stimulus: 'Você ouviu uma entrevista com a arquiteta Renata Lima sobre requalificação de espaços públicos e cidades mais humanas.',
          text: 'Escreva uma carta ao prefeito da sua cidade propondo a transformação de uma rua ou área em um espaço público mais agradável para as pessoas. Use argumentos da entrevista e explique quais benefícios o projeto traria para a comunidade. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `Inteligência artificial: aliada ou ameaça ao emprego?\n\nO avanço da inteligência artificial (IA) tem gerado esperança e apreensão em partes iguais. Ferramentas capazes de escrever textos, gerar imagens, analisar dados e automatizar tarefas estão transformando o mundo do trabalho em ritmo acelerado, e o Brasil não está de fora dessa mudança.\n\nPor um lado, a IA promete aumentar a produtividade e criar novas profissões. Tarefas repetitivas podem ser automatizadas, liberando as pessoas para atividades mais criativas e estratégicas. Setores como saúde, educação e agricultura já usam a tecnologia para melhorar diagnósticos, personalizar o ensino e aumentar a produção agrícola.\n\nPor outro lado, há um temor real de que a automação elimine milhões de empregos, especialmente os que envolvem tarefas rotineiras. Trabalhadores de call centers, motoristas, caixas e até alguns profissionais de escritório podem ver suas funções ameaçadas. A grande preocupação é que a transição seja rápida demais e deixe muita gente para trás.\n\nEspecialistas defendem que a chave está na educação e na requalificação profissional. Em vez de competir com as máquinas, os trabalhadores precisam aprender a trabalhar com elas, desenvolvendo habilidades que a IA não substitui facilmente: pensamento crítico, criatividade, empatia e capacidade de resolver problemas complexos. O futuro do trabalho não será sobre humanos contra máquinas, mas sobre como os dois podem se complementar.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s5-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: Inteligência artificial e o emprego',
          stimulus: 'Você leu um artigo sobre os impactos da inteligência artificial no mundo do trabalho.',
          text: 'Escreva um texto de opinião para o blog de uma associação de estudantes apresentando seu ponto de vista sobre o impacto da inteligência artificial nos empregos. Use argumentos do texto e reflita sobre como os jovens devem se preparar para esse futuro. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `O boom das viagens de "turismo de experiência"\n\nUma nova forma de viajar tem conquistado os brasileiros: o chamado turismo de experiência. Em vez de apenas visitar pontos turísticos e tirar fotos, os viajantes buscam vivências autênticas — cozinhar com uma família local, aprender um ofício tradicional, participar de festas típicas ou trabalhar como voluntário durante a viagem.\n\nEsse tipo de turismo valoriza a cultura local e distribui melhor a renda, beneficiando pequenas comunidades que ficavam fora dos roteiros tradicionais. Um viajante que se hospeda na casa de moradores, come em restaurantes de bairro e compra de artesãos locais deixa muito mais dinheiro na comunidade do que aquele que fica em grandes resorts.\n\nAlém do impacto econômico positivo, o turismo de experiência costuma ser mais consciente e sustentável. Os viajantes tendem a respeitar mais o meio ambiente e os costumes locais, criando conexões humanas verdadeiras em vez de um consumo apressado de imagens.\n\nMas é preciso cuidado. Quando mal planejado, esse turismo pode "romantizar" a pobreza ou transformar tradições em espetáculo para estrangeiros. O segredo está no respeito e na reciprocidade: viajar de forma que a comunidade se sinta valorizada, e não apenas observada. Assim, todos ganham — o viajante, que vive algo inesquecível, e a comunidade, que compartilha sua cultura com dignidade.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s5-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: Turismo de experiência',
          stimulus: 'Você leu uma reportagem sobre o crescimento do turismo de experiência e seus impactos nas comunidades.',
          text: 'Escreva um e-mail a um amigo que vai viajar pelo Brasil e só pensa em visitar lugares famosos e badalados. Sugira a ele o "turismo de experiência", explique suas vantagens e dê exemplos de vivências que ele poderia ter. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s5-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma charge mostra um jovem em uma entrevista de emprego. O entrevistador pergunta: "Qual é a sua experiência?", e o jovem responde: "Estou procurando o primeiro emprego para ter experiência."\n\nPontos para discutir:\n• Qual problema a charge critica?\n• Por que é tão difícil conseguir o primeiro emprego no Brasil?\n• O que os jovens podem fazer para se destacar?\n• As empresas deveriam dar mais oportunidades a quem não tem experiência?',
          followUp: [
            'Como foi (ou como você imagina que será) a sua busca pelo primeiro emprego?',
            'Estágios e trabalho voluntário ajudam a ganhar experiência?',
            'A qualificação garante emprego hoje em dia?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s5-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: A valorização da cultura regional brasileira\n\nPontos para discutir:\n• Por que é importante preservar as culturas regionais (nordestina, amazônica, gaúcha etc.)?\n• A globalização ameaça as culturas locais?\n• Como as festas e comidas típicas fortalecem a identidade de um povo?\n• O que você conhece da cultura de outras regiões do Brasil?',
          followUp: [
            'Qual manifestação cultural do Brasil (ou do seu país) você mais aprecia?',
            'A música e a comida podem ser formas de resistência cultural?',
            'É possível ser moderno sem perder as tradições?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s5-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: Você tem uma quantia de dinheiro guardada e precisa decidir entre:\n1. Investir em um curso caro que pode melhorar a sua carreira\n2. Usar o dinheiro para realizar uma viagem dos seus sonhos\n\nO que você escolheria? Por quê?',
          followUp: [
            'O que traz mais satisfação: investir no futuro ou aproveitar o presente?',
            'Viajar também é uma forma de aprender e crescer?',
            'Você costuma planejar seus gastos ou age mais por impulso?',
          ],
        },
      ],
    },
  ],
};

export default mock;
