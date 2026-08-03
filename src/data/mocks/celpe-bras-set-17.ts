import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Tarefa 1 usa vídeo OFICIAL do acervo público
// da UFRGS (ufrgs.br/acervocelpebras); as perguntas foram reescritas, não copiadas do
// caderno oficial. Tarefas 2-4 e Parte Oral são conteúdo ORIGINAL WeLearn.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-17/ e /images/celpe-bras/set-17/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-17',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 17',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo oficial do CELPE-BRAS (edição 2012/1). Preste atenção ao tema e às informações apresentadas. Depois, redija o texto solicitado em português.',
      audioUrl: '/videos/celpe-bras/set-17.mp4',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s17-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Vídeo oficial CELPE-BRAS — Pescando Letras',
          stimulus: '[Vídeo oficial CELPE-BRAS, edição 2012/1] Tema: "Pescando Letras". Assista com atenção para compreender as informações apresentadas antes de escrever seu texto.',
          text: 'Com base no que você assistiu, escreva um texto sobre o tema do vídeo, no gênero e para o interlocutor que fizerem mais sentido para o assunto (por exemplo, uma carta, um e-mail, um texto informativo ou uma postagem). Explique o tema, comente as informações apresentadas e inclua sua própria opinião quando pertinente. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-17/tarefa-2.mp3',
      transcript: `Apresentador: Recebemos hoje a jornalista e escritora Beatriz Campos, que estuda o hábito de leitura dos brasileiros. Beatriz, o brasileiro lê pouco?\n\nBeatriz: Os dados mostram que sim, lemos menos do que gostaríamos. Mas eu prefiro olhar para as causas, e não julgar. Livro ainda é caro, o acesso a bibliotecas é limitado em muitos lugares, e a escola nem sempre desperta o prazer da leitura.\n\nApresentador: A internet e as redes sociais são culpadas?\n\nBeatriz: Não necessariamente. As pessoas leem o tempo todo nas telas: mensagens, textos, notícias. O desafio é aproximar isso da leitura mais profunda, de livros, que exige mais concentração e oferece outra experiência. Não é a tela contra o livro; é como usar as duas.\n\nApresentador: Como despertar o gosto pela leitura?\n\nBeatriz: Dando o exemplo. Crianças que veem os pais lendo leem mais. E oferecendo liberdade: deixar a pessoa ler o que gosta, sem cobrança. Gibi, romance popular, poesia, o que for. O importante é começar. O prazer da leitura, uma vez descoberto, não se perde.\n\nApresentador: E o papel das bibliotecas?\n\nBeatriz: Fundamental. Bibliotecas públicas gratuitas e bem cuidadas democratizam o acesso. Elas são muito mais do que depósitos de livros: são espaços de encontro, de cultura, de transformação. Um país que investe em bibliotecas investe no seu povo.\n\nApresentador: Uma bela defesa da leitura. Obrigado, Beatriz.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s17-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista: o hábito de leitura',
          stimulus: 'Você ouviu uma entrevista com a escritora Beatriz Campos sobre o hábito de leitura dos brasileiros.',
          text: 'Escreva uma carta ao responsável pela cultura do seu município propondo ações para incentivar a leitura, como a criação ou melhoria de bibliotecas públicas. Use argumentos da entrevista e sugira medidas concretas. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `O desafio do primeiro emprego\n\nConseguir o primeiro emprego é um dos maiores desafios enfrentados pelos jovens brasileiros. Forma-se um paradoxo cruel: as empresas exigem experiência, mas como ter experiência sem o primeiro emprego? Milhões de jovens ficam presos nesse círculo, especialmente os de menor renda, que não podem contar com contatos ou pagar cursos caros.\n\nAs causas são várias. A competição é grande, e a formação escolar nem sempre prepara para o mundo do trabalho. Muitos jovens não sabem como se apresentar em uma entrevista ou elaborar um currículo. E há barreiras invisíveis: preconceitos de origem, de bairro, de aparência, que dificultam o acesso de alguns.\n\nExistem caminhos, porém. Programas de estágio e de jovem aprendiz abrem portas. O trabalho voluntário e os projetos pessoais podem substituir a experiência formal e mostrar iniciativa. Cursos gratuitos, muitos online, ajudam a desenvolver habilidades. E as empresas, por sua vez, precisam repensar seus critérios, dando oportunidades a quem está começando.\n\nO primeiro emprego é mais do que uma fonte de renda: é uma porta para a autonomia, a dignidade e o futuro. Facilitar esse acesso é responsabilidade de todos — governos, empresas, escolas e da própria sociedade. Um jovem que consegue começar é um jovem que constrói o seu caminho e contribui para o país.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s17-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: O desafio do primeiro emprego',
          stimulus: 'Você leu um artigo sobre as dificuldades dos jovens para conseguir o primeiro emprego no Brasil.',
          text: 'Escreva um texto de opinião para uma revista voltada a jovens apresentando seu ponto de vista sobre o desafio do primeiro emprego. Use argumentos do texto e proponha o que os jovens, as empresas e o governo podem fazer para enfrentar o problema. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `Comida de rua: sabor, cultura e trabalho\n\nDo tabuleiro de acarajé nas ruas de Salvador ao pastel da feira, do churrasquinho na esquina ao tapioqueiro do Nordeste, a comida de rua é parte inseparável da cultura brasileira. Mais do que alimentar, ela conta histórias, preserva tradições e sustenta milhares de famílias.\n\nA comida de rua tem grande valor econômico e social. Para muitos, é a porta de entrada no empreendedorismo: com pouco investimento, uma pessoa monta seu negócio e gera renda. Nas grandes cidades, os vendedores ambulantes alimentam trabalhadores que precisam de refeições rápidas e baratas. É a economia informal em ação, cheia de criatividade.\n\nPor outro lado, há desafios. Questões de higiene e segurança alimentar preocupam, e nem sempre há fiscalização adequada. Muitos vendedores trabalham na informalidade, sem licença nem direitos. E há conflitos com o poder público, que ora reprime, ora tenta regularizar a atividade.\n\nO ideal seria valorizar e organizar essa atividade, em vez de simplesmente combatê-la. Oferecer capacitação em higiene, facilitar a regularização, criar espaços adequados. A comida de rua bem cuidada atrai turistas, gera empregos e mantém viva a cultura popular. É um patrimônio que merece ser protegido e desenvolvido com inteligência e respeito.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s17-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: Comida de rua',
          stimulus: 'Você leu uma reportagem sobre o valor cultural e econômico da comida de rua no Brasil.',
          text: 'Escreva um e-mail a um amigo que tem preconceito com comida de rua e acha que deveria ser proibida. Dê sua opinião sobre o tema, destacando seu valor cultural e econômico, e sugira como equilibrar a atividade com a higiene e a segurança. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s17-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma fotografia de uma barraca de comida de rua colorida e movimentada, com pessoas de diferentes idades e classes sociais comendo juntas na calçada.\n\nPontos para discutir:\n• O que a cena revela sobre a cultura e a convivência nas cidades?\n• Qual é o valor da comida de rua além do alimento?\n• Que problemas essa atividade pode ter?\n• Como valorizar e ao mesmo tempo organizar a comida de rua?',
          followUp: [
            'Qual é a sua comida de rua favorita?',
            'A comida de rua faz parte da identidade de um lugar?',
            'Você confia na higiene desses alimentos? Por quê?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s17-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: A juventude e o futuro do país\n\nPontos para discutir:\n• Quais são os maiores desafios enfrentados pelos jovens hoje?\n• A juventude tem espaço para participar das decisões da sociedade?\n• O que os jovens têm a oferecer que as gerações anteriores não têm?\n• Como preparar os jovens para o futuro do trabalho?',
          followUp: [
            'Você se sente ouvido como jovem na sua sociedade?',
            'O que mais preocupa a sua geração?',
            'O que dá esperança em relação ao futuro?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s17-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: Você recebeu duas ofertas de trabalho igualmente boas e precisa escolher entre:\n1. Uma empresa grande e reconhecida, mas com um ambiente competitivo e pouco humano\n2. Uma empresa pequena, menos conhecida, mas com um ambiente acolhedor e valores parecidos com os seus\n\nO que você escolheria? Por quê?',
          followUp: [
            'O ambiente de trabalho é tão importante quanto o salário?',
            'Você já trabalhou em um lugar com o qual não se identificava?',
            'O que faz um bom lugar para trabalhar?',
          ],
        },
      ],
    },
  ],
};

export default mock;
