import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC (Parte Escrita: 4 tarefas de produção a partir
// de vídeo/áudio/texto + Parte Oral: interação com elementos provocadores).
// Tarefa 1 usa vídeo OFICIAL do acervo público da UFRGS (ufrgs.br/acervocelpebras); as
// perguntas foram reescritas, não copiadas do caderno oficial. Tarefas 2-4 e Parte Oral
// são conteúdo ORIGINAL WeLearn. Áudio sob /audio/celpe-bras/set-2/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-2',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 2',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo oficial do CELPE-BRAS (edição 1998). Preste atenção ao tema e às informações apresentadas. Depois, redija o texto solicitado em português.',
      audioUrl: '/api/celpe-bras-video?src=https%3A%2F%2Fwww.ufrgs.br%2Facervocelpebras%2Fwp-content%2Fuploads%2F2021%2F12%2F1998-Video-Os-Jacares-do-Pantanal_comprimido.mp4',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s2b-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Vídeo oficial CELPE-BRAS — Os Jacarés do Pantanal',
          stimulus: '[Vídeo oficial CELPE-BRAS, edição 1998] Tema: "Os Jacarés do Pantanal". Assista com atenção para compreender as informações apresentadas antes de escrever seu texto.',
          text: 'Com base no que você assistiu, escreva um texto sobre o tema do vídeo, no gênero e para o interlocutor que fizerem mais sentido para o assunto (por exemplo, uma carta, um e-mail, um texto informativo ou uma postagem). Explique o tema, comente as informações apresentadas e inclua sua própria opinião quando pertinente. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-2/tarefa-2.mp3',
      transcript: `Apresentadora: Você está ouvindo o programa Gente que Faz. Comigo hoje está a agrônoma Beatriz Nogueira, que criou uma horta comunitária em um terreno abandonado no centro de Belo Horizonte. Beatriz, como tudo começou?\n\nBeatriz: Olha, aquele terreno era um ponto de lixo há anos. Ninguém aguentava mais o mau cheiro e os ratos. Então, em vez de só reclamar, eu chamei alguns vizinhos e propus a gente transformar aquilo numa horta.\n\nApresentadora: E as pessoas aceitaram logo de cara?\n\nBeatriz: Que nada! No começo, muita gente achou que não ia dar certo. Mas, aos poucos, quando viram as primeiras verduras crescendo, foram chegando. Hoje somos mais de quarenta famílias cuidando do espaço.\n\nApresentadora: E o que vocês fazem com o que produzem?\n\nBeatriz: Cada família leva o que precisa, e o excedente a gente doa para uma creche vizinha. Além disso, damos oficinas gratuitas de compostagem para as escolas da região. As crianças adoram.\n\nApresentadora: Quais foram os maiores desafios?\n\nBeatriz: Água foi o principal. Tivemos que instalar um sistema de captação de chuva. E burocracia com a prefeitura também, mas conseguimos regularizar o uso do terreno.\n\nApresentadora: E o futuro?\n\nBeatriz: A gente sonha em replicar o modelo em outros bairros. Já temos grupos de três comunidades querendo aprender. Uma horta não alimenta só o corpo; alimenta o senso de comunidade.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s2b-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista de rádio',
          stimulus: 'Você ouviu uma entrevista com a agrônoma Beatriz Nogueira, criadora de uma horta comunitária em Belo Horizonte.',
          text: 'Escreva uma carta à secretaria de meio ambiente do seu município propondo que o poder público apoie a criação de hortas comunitárias em terrenos abandonados. Use exemplos da entrevista e argumente sobre os benefícios sociais, ambientais e alimentares. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `O trabalho remoto veio para ficar?\n\nDepois da pandemia, o trabalho remoto — ou home office — deixou de ser exceção e virou realidade para milhões de brasileiros. Segundo pesquisas recentes, cerca de um quarto dos trabalhadores de escritório no país atua hoje em regime totalmente remoto ou híbrido, alternando dias em casa e no escritório.\n\nOs defensores do modelo apontam vantagens claras: menos tempo perdido no trânsito das grandes cidades, economia com transporte e alimentação, e mais flexibilidade para conciliar trabalho e vida pessoal. Para muitas mães e pais, poder buscar os filhos na escola sem pedir folga foi uma transformação bem-vinda.\n\nPor outro lado, críticos alertam para os riscos. O isolamento pode afetar a saúde mental, e a linha entre a vida profissional e a pessoal fica cada vez mais tênue — há quem trabalhe mais horas em casa do que trabalharia no escritório. Além disso, nem todos têm um espaço adequado ou uma boa conexão de internet, o que aprofunda desigualdades.\n\nAlgumas empresas já anunciaram o retorno obrigatório ao escritório, argumentando que a colaboração presencial é insubstituível. Outras adotaram modelos híbridos permanentes. O debate está longe de terminar, mas uma coisa é certa: a forma como os brasileiros trabalham mudou, e dificilmente voltará a ser exatamente como era antes.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s2b-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: O trabalho remoto veio para ficar?',
          stimulus: 'Você leu um artigo sobre o avanço do trabalho remoto no Brasil.',
          text: 'Escreva um texto de opinião para o jornal da sua universidade apresentando seu ponto de vista sobre o trabalho remoto. Use argumentos do texto e sua própria experiência ou conhecimento, considerando tanto as vantagens quanto as desvantagens. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `Turismo em alta ameaça cidades históricas brasileiras\n\nCidades históricas como Ouro Preto, Paraty e Tiradentes vivem um paradoxo. De um lado, o turismo é fonte essencial de renda e empregos para os moradores. De outro, o excesso de visitantes começa a ameaçar justamente aquilo que atrai os turistas: o patrimônio histórico e a qualidade de vida local.\n\nNos fins de semana e feriados prolongados, ruas estreitas de paralelepípedos ficam lotadas, os preços de imóveis e aluguéis disparam, e muitos moradores antigos acabam se mudando para bairros mais afastados. O comércio tradicional dá lugar a lojas de souvenires, e casarões coloniais são transformados em pousadas.\n\nEspecialistas em patrimônio defendem um "turismo sustentável": limitar o número de visitantes em determinados períodos, investir parte da renda do turismo na preservação dos edifícios e envolver a comunidade local nas decisões. Alguns municípios já estudam cobrar uma taxa de visitação, como acontece em cidades históricas da Europa.\n\nO desafio é encontrar o equilíbrio: aproveitar os benefícios econômicos do turismo sem destruir o patrimônio cultural e expulsar os moradores que dão vida a essas cidades.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s2b-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: Turismo em cidades históricas',
          stimulus: 'Você leu uma reportagem sobre os impactos do turismo excessivo em cidades históricas brasileiras.',
          text: 'Escreva um e-mail a um amigo que pretende abrir uma pousada em uma cidade histórica. Dê sua opinião sobre os prós e contras do turismo nessas cidades e sugira práticas de turismo mais sustentável que ele poderia adotar. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores (imagens, textos curtos, dados). Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s2b-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma charge que mostra uma pessoa cercada por telas (celular, computador, televisão) enquanto uma janela ao fundo mostra um dia de sol e pessoas conversando.\n\nPontos para discutir:\n• O que a charge critica ou comenta?\n• Você se identifica com essa situação?\n• Como o uso excessivo de telas afeta as relações humanas?\n• O que poderia ser feito para equilibrar o tempo online e offline?',
          followUp: [
            'Quantas horas por dia você passa em frente a telas?',
            'Você já tentou fazer um "detox digital"? Como foi?',
            'As redes sociais aproximam ou afastam as pessoas?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s2b-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: A educação a distância no Brasil\n\nPontos para discutir:\n• O ensino a distância oferece as mesmas oportunidades que o presencial?\n• Quais grupos são mais prejudicados pela falta de acesso à internet?\n• Você faria um curso totalmente online? Por quê?\n• Como garantir a qualidade da educação a distância?',
          followUp: [
            'Você já estudou algo totalmente pela internet?',
            'O que é mais difícil no estudo a distância: a disciplina ou a tecnologia?',
            'A educação a distância pode reduzir ou aumentar as desigualdades?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s2b-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: Sua cidade recebeu uma verba para um único projeto:\n1. Reformar e ampliar o transporte público\n2. Construir mais ciclovias e áreas verdes\n\nQual projeto você escolheria? Por quê?',
          followUp: [
            'Como você se locomove na sua cidade no dia a dia?',
            'O que faria você deixar o carro em casa e usar transporte público ou bicicleta?',
            'Uma cidade pode ser boa para carros e para pessoas ao mesmo tempo?',
          ],
        },
      ],
    },
  ],
};

export default mock;
