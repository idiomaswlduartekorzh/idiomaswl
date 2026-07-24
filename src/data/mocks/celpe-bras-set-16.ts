import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Conteúdo ORIGINAL WeLearn no formato oficial.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-16/ e /images/celpe-bras/set-16/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-16',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 16',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo (reportagem). Depois, redija o texto solicitado em português, adequado ao gênero, ao interlocutor e ao propósito indicados.',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s16-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Reportagem em vídeo',
          stimulus: '[Vídeo — reportagem, ~3 min] Uma reportagem mostra o crescimento do turismo de base comunitária em regiões do interior e do litoral. A repórter visita uma comunidade quilombola que recebe visitantes para conhecer sua história, sua culinária e seu artesanato, entrevista moradores que passaram a ter renda com o turismo e uma pesquisadora que explica como esse modelo valoriza a cultura local e mantém o dinheiro na própria comunidade.',
          text: 'Com base no vídeo, escreva um texto para um site de viagens apresentando o turismo de base comunitária. Explique o que é, como beneficia as comunidades e por que é uma forma de viajar mais rica e responsável. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-16/tarefa-2.mp3',
      transcript: `Apresentadora: Hoje conversamos com o professor de música Otávio Lima, que criou uma orquestra formada por crianças e jovens de uma comunidade de baixa renda. Professor, como começou esse projeto?\n\nOtávio: Começou com um violão emprestado e cinco crianças curiosas. Eu dava aulas de graça numa igreja do bairro. Vi que a música despertava algo nelas: disciplina, sonho, autoestima. Aí decidi levar a sério.\n\nApresentadora: E hoje?\n\nOtávio: Hoje somos uma orquestra de sessenta jovens, com instrumentos doados, e já nos apresentamos em teatros importantes. Mas o mais bonito não são os concertos; é ver a transformação na vida deles.\n\nApresentadora: A música muda a vida dessas crianças?\n\nOtávio: Muda completamente. A música ensina a estudar, a se concentrar, a trabalhar em grupo, a persistir. Tira a criança de situações de risco. E dá um propósito. Muitos dos meus alunos foram os primeiros da família a entrar na universidade.\n\nApresentadora: Quais os desafios?\n\nOtávio: Manter o projeto vivo. Instrumentos são caros, precisam de manutenção. Dependemos de doações e da boa vontade de voluntários. Falta um apoio mais firme do poder público, que ainda vê a cultura como gasto, e não como investimento.\n\nApresentadora: E o recado que fica?\n\nOtávio: Que a arte transforma. Não é um luxo para poucos; é uma necessidade e um direito de todos. Investir em cultura é investir no futuro de uma nação.\n\nApresentadora: Palavras que ecoam como música. Obrigada, professor.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s16-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista: música e transformação social',
          stimulus: 'Você ouviu uma entrevista com o professor Otávio Lima, criador de uma orquestra de jovens de baixa renda.',
          text: 'Escreva uma carta a uma empresa ou fundação pedindo apoio (patrocínio ou doação de instrumentos) para o projeto da orquestra. Use argumentos da entrevista e explique por que investir em cultura e educação transforma vidas. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `A cultura do imediatismo\n\nVivemos na era do "agora". Queremos respostas imediatas nas mensagens, entregas no mesmo dia, resultados rápidos e gratificação instantânea. A tecnologia nos acostumou a não esperar: um clique resolve, um toque satisfaz. Essa cultura do imediatismo transformou a forma como vivemos, trabalhamos e nos relacionamos.\n\nHá vantagens, claro. A rapidez trouxe comodidade e eficiência. Mas o imediatismo também tem um custo. A dificuldade de esperar e de tolerar frustrações cresce, especialmente entre os mais jovens. A paciência, virtude fundamental, parece em falta. Projetos que exigem tempo e persistência — aprender um instrumento, construir uma carreira, cultivar um relacionamento — competem com a atração do resultado imediato.\n\nO imediatismo também afeta a qualidade. Na pressa por produzir e consumir rápido, sacrificamos a profundidade. Lemos manchetes em vez de textos completos, assistimos a resumos em vez de obras inteiras, buscamos soluções rápidas para problemas complexos que exigiriam reflexão.\n\nResgatar o valor da paciência e do tempo é um desafio necessário. Nem tudo que vale a pena é rápido. As coisas mais importantes da vida — o conhecimento, os laços profundos, as grandes realizações — exigem tempo, esforço e espera. Aprender a apreciar o processo, e não só o resultado, pode ser um dos grandes aprendizados do nosso tempo acelerado.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s16-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: A cultura do imediatismo',
          stimulus: 'Você leu um artigo sobre a cultura do imediatismo e a perda da paciência na vida moderna.',
          text: 'Escreva um texto de opinião para o jornal da sua universidade apresentando seu ponto de vista sobre a cultura do imediatismo. Use argumentos do texto e reflita sobre como recuperar o valor da paciência e da profundidade. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `O crescimento das cidades inteligentes\n\nImagine uma cidade em que os semáforos se ajustam sozinhos para reduzir o trânsito, os postes acendem apenas quando alguém passa, o lixo é coletado no momento certo e os moradores resolvem problemas por um aplicativo. Essa é a proposta das chamadas "cidades inteligentes", que usam a tecnologia e os dados para melhorar a vida urbana.\n\nAlgumas cidades brasileiras já dão os primeiros passos nessa direção. Sensores monitoram a qualidade do ar e o nível dos rios, câmeras auxiliam na segurança, aplicativos facilitam o acesso a serviços públicos. A promessa é de cidades mais eficientes, sustentáveis e agradáveis de se viver.\n\nMas o conceito também levanta questões. O uso intenso de câmeras e dados pessoais preocupa quem defende a privacidade. Há o risco de que apenas os bairros ricos recebam a tecnologia, aprofundando desigualdades. E existe o perigo de acreditar que a tecnologia resolve tudo, esquecendo que muitos problemas urbanos são, na verdade, sociais e políticos.\n\nUma cidade verdadeiramente inteligente não é apenas cheia de tecnologia; é aquela que coloca as pessoas no centro. A tecnologia deve ser uma ferramenta a serviço do bem-estar de todos, com respeito à privacidade e atenção à inclusão. Inteligência, afinal, é usar os recursos disponíveis para construir uma cidade mais justa e humana.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s16-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: As cidades inteligentes',
          stimulus: 'Você leu uma reportagem sobre o crescimento das cidades inteligentes no Brasil.',
          text: 'Escreva um e-mail a um amigo que acredita que a tecnologia sozinha vai resolver todos os problemas da sua cidade. Dê sua opinião sobre as cidades inteligentes, aponte seus benefícios e seus riscos, e argumente que as pessoas devem estar no centro dessas mudanças. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s16-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma fotografia de uma rua movimentada com muitas câmeras de segurança e telões, e as pessoas caminhando com os olhos fixos nos celulares.\n\nPontos para discutir:\n• O que a imagem sugere sobre a vida nas cidades tecnológicas?\n• A vigilância nas cidades traz segurança ou ameaça a privacidade?\n• A tecnologia nos conecta ou nos isola?\n• Como equilibrar tecnologia e liberdade?',
          followUp: [
            'Você se sente mais seguro ou mais vigiado com tantas câmeras?',
            'Até onde a tecnologia pode ir sem invadir a privacidade?',
            'Você conseguiria passar um dia sem o celular?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s16-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: A valorização do trabalho manual e técnico\n\nPontos para discutir:\n• Por que muitas pessoas desvalorizam profissões técnicas e manuais?\n• Um diploma universitário vale sempre mais do que uma formação técnica?\n• A sociedade precisa de mais técnicos e profissionais qualificados?\n• O que define o valor de uma profissão?',
          followUp: [
            'Você conhece profissionais técnicos bem-sucedidos?',
            'Existe preconceito com o trabalho manual no seu país?',
            'O que é mais importante ao escolher uma profissão?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s16-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: Você tem a chance de morar um ano em outro país e precisa escolher entre:\n1. Um país muito diferente do seu, com uma cultura e um idioma totalmente novos\n2. Um país parecido com o seu, onde você se adaptaria facilmente\n\nO que você escolheria? Por quê?',
          followUp: [
            'Os desafios de se adaptar valem a pena pelo aprendizado?',
            'O que mais assusta ao morar em outro país?',
            'Sair da zona de conforto muda uma pessoa?',
          ],
        },
      ],
    },
  ],
};

export default mock;
