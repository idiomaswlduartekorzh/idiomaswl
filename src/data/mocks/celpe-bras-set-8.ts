import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Conteúdo ORIGINAL WeLearn no formato oficial.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-8/ e /images/celpe-bras/set-8/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-8',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 8',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo (reportagem). Depois, redija o texto solicitado em português, adequado ao gênero, ao interlocutor e ao propósito indicados.',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s8-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Reportagem em vídeo',
          stimulus: '[Vídeo — reportagem, ~3 min] Uma reportagem mostra o trabalho de cooperativas de catadores de materiais recicláveis em uma grande cidade brasileira. A repórter acompanha o dia a dia dos catadores, entrevista uma líder de cooperativa que fala sobre dignidade e renda, e mostra como a reciclagem gera emprego e reduz o lixo nos aterros. Um especialista comenta que os catadores prestam um serviço ambiental essencial, mas ainda pouco valorizado.',
          text: 'Com base no vídeo, escreva um texto para o jornal da sua cidade valorizando o trabalho dos catadores de recicláveis. Explique a importância desse trabalho para o meio ambiente e para a economia, e proponha como a sociedade pode reconhecer e apoiar essas pessoas. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-8/tarefa-2.mp3',
      transcript: `Apresentadora: Hoje no programa Mundo do Trabalho, conversamos com a psicóloga organizacional Fernanda Dias sobre um tema atual: o equilíbrio entre vida profissional e pessoal. Fernanda, por que tanta gente sente que não consegue esse equilíbrio?\n\nFernanda: Vivemos numa cultura que glorifica estar sempre ocupado. Muita gente sente culpa quando descansa. Some a isso a tecnologia, que faz o trabalho invadir a casa: e-mails às dez da noite, mensagens no fim de semana. A fronteira entre trabalho e vida pessoal quase desapareceu.\n\nApresentadora: E quais são as consequências disso?\n\nFernanda: Estresse crônico, esgotamento, o famoso burnout, que a Organização Mundial da Saúde reconhece como doença ocupacional. Relacionamentos que sofrem, saúde que se deteriora. Ironia: quem trabalha demais nem sempre produz mais. O cansaço reduz a criatividade e a qualidade.\n\nApresentadora: O que a pessoa pode fazer?\n\nFernanda: Estabelecer limites claros. Ter horários para começar e terminar o trabalho, mesmo em casa. Aprender a dizer não. Reservar tempo de verdade para o descanso, a família, os hobbies. E entender que descansar não é preguiça; é parte do que nos torna produtivos e saudáveis.\n\nApresentadora: E as empresas, têm responsabilidade?\n\nFernanda: Com certeza. Empresas que respeitam o tempo de descanso dos funcionários têm equipes mais motivadas e menos rotatividade. Algumas já proíbem e-mails fora do horário. É bom para as pessoas e bom para os negócios.\n\nApresentadora: Uma reflexão importante para todos nós. Obrigada, Fernanda.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s8-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista: equilíbrio trabalho e vida',
          stimulus: 'Você ouviu uma entrevista com a psicóloga Fernanda Dias sobre o equilíbrio entre vida profissional e pessoal.',
          text: 'Escreva uma carta ao setor de recursos humanos da sua empresa (ou de uma empresa que você conheça) propondo medidas para melhorar o equilíbrio entre trabalho e vida pessoal dos funcionários. Use argumentos da entrevista e sugira ações concretas. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `O envelhecimento da população brasileira\n\nO Brasil está envelhecendo rapidamente. Se por décadas o país foi conhecido por ser uma nação jovem, hoje o número de idosos cresce em ritmo acelerado, enquanto a taxa de natalidade diminui. As projeções indicam que, nas próximas décadas, a proporção de pessoas com mais de sessenta anos aumentará significativamente.\n\nEsse fenômeno traz desafios importantes. O sistema de previdência precisa se adaptar a uma realidade em que menos trabalhadores sustentam mais aposentados. A saúde pública terá que atender a uma população mais velha, com doenças crônicas que exigem cuidados contínuos. E as cidades precisarão se tornar mais acessíveis, com transporte, calçadas e serviços adequados aos idosos.\n\nMas o envelhecimento também traz oportunidades. Os idosos de hoje são mais ativos, saudáveis e conectados do que as gerações anteriores. Muitos continuam trabalhando, estudando, viajando e contribuindo com sua experiência. Surge até uma "economia prateada", com produtos e serviços voltados a esse público.\n\nO segredo está na preparação. Investir em saúde preventiva, em cidades acessíveis e na valorização do idoso pode transformar o desafio em oportunidade. Uma sociedade que cuida bem dos seus velhos, e que aproveita a sua sabedoria, é uma sociedade mais justa e mais rica — em todos os sentidos.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s8-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: O envelhecimento da população',
          stimulus: 'Você leu um artigo sobre o envelhecimento da população brasileira e seus desafios e oportunidades.',
          text: 'Escreva um texto de opinião para uma revista de atualidades apresentando seu ponto de vista sobre como a sociedade deve se preparar para o envelhecimento da população. Use argumentos do texto e proponha ações para tornar as cidades e os serviços mais adequados aos idosos. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `A cultura do "faça você mesmo"\n\nConsertar uma torneira, montar um móvel, cultivar temperos, costurar uma roupa: a cultura do "faça você mesmo" — o famoso DIY, sigla em inglês para "do it yourself" — ganhou força entre os brasileiros. Impulsionada por vídeos e tutoriais na internet, essa tendência transforma pessoas comuns em pequenos consertadores, jardineiros e artesãos.\n\nAs motivações são variadas. A economia é uma delas: fazer você mesmo costuma ser mais barato do que contratar um serviço ou comprar pronto. Mas há também o prazer de criar com as próprias mãos, o senso de realização e a valorização de habilidades que estavam se perdendo. Em tempos de consumo acelerado, consertar em vez de jogar fora é também um gesto de consciência ambiental.\n\nPor outro lado, é preciso ter bom senso. Nem tudo deve ser feito por conta própria. Instalações elétricas, hidráulicas complexas ou reparos que envolvem riscos exigem profissionais qualificados. Um conserto malfeito pode sair mais caro do que ter contratado um especialista desde o início.\n\nO ideal é encontrar o equilíbrio: aprender a fazer o que é seguro e prazeroso, valorizando a autonomia e a criatividade, mas reconhecendo os limites e sabendo a hora de chamar um profissional. Afinal, "fazer você mesmo" também é saber quando não fazer sozinho.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s8-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: A cultura do "faça você mesmo"',
          stimulus: 'Você leu uma reportagem sobre a popularização da cultura do "faça você mesmo" (DIY) no Brasil.',
          text: 'Escreva um e-mail a um amigo que quer economizar fazendo todos os consertos da casa sozinho, inclusive os elétricos. Dê sua opinião sobre os prós e contras dessa prática e oriente-o sobre o que é seguro fazer sozinho e quando é melhor chamar um profissional. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s8-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma fotografia de uma longa fila de pessoas em frente a um posto de saúde, embaixo de sol forte, esperando atendimento.\n\nPontos para discutir:\n• O que a imagem revela sobre a saúde pública no Brasil?\n• Quais são os principais problemas do sistema de saúde?\n• O que poderia ser feito para melhorar o atendimento?\n• Saúde é um direito de todos ou um privilégio de poucos?',
          followUp: [
            'Você já enfrentou dificuldades para conseguir atendimento de saúde?',
            'O que funciona bem e o que precisa melhorar na saúde pública?',
            'A prevenção poderia reduzir a demanda por atendimento?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s8-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: O papel da mulher na sociedade brasileira atual\n\nPontos para discutir:\n• Que avanços as mulheres conquistaram nas últimas décadas?\n• Quais desigualdades ainda existem entre homens e mulheres?\n• Como conciliar carreira e vida familiar?\n• O que ainda precisa mudar para uma sociedade mais igualitária?',
          followUp: [
            'Você percebe diferenças de tratamento entre homens e mulheres no trabalho?',
            'As tarefas domésticas são divididas de forma justa nas famílias que você conhece?',
            'A educação pode mudar essa realidade?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s8-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: Você recebeu uma quantia inesperada de dinheiro e precisa decidir entre:\n1. Guardar tudo para uma emergência ou o futuro\n2. Usar uma parte para ajudar um familiar que está passando por dificuldades\n\nO que você faria? Por quê?',
          followUp: [
            'Até que ponto devemos ajudar financeiramente a família?',
            'Guardar dinheiro é sempre a decisão mais sábia?',
            'Você é mais de poupar ou de aproveitar o momento?',
          ],
        },
      ],
    },
  ],
};

export default mock;
