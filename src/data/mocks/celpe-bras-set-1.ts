import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-1',
  examSlug: 'celpe-bras',
  title: 'CELPE-BRAS – Simulado 1',
  subtitle: 'Parte Escrita · Parte Oral',
  timeMinutes: 210,
  sections: [
    // ── Seção 1 ─────────────────────────────────────────────────────────────
    {
      part: 1,
      title: 'Tarefa 1 – Produção a partir de vídeo',
      skill: 'writing',
      instructions:
        'Verás un resumen del video que los candidatos reales verían. Lee el estímulo y redacta el texto solicitado en portugués.',
      questions: [
        {
          type: 'write',
          id: 'celpe-bras-s1-q1',
          part: 1,
          taskNumber: 1,
          stimulusLabel: 'Resumo do vídeo',
          stimulus:
            '[Vídeo] Uma reportagem sobre o crescimento das feiras livres orgânicas nas cidades brasileiras. A repórter visita uma feira em São Paulo, entrevista produtores rurais que vendem diretamente ao consumidor, e discute os benefícios ambientais e econômicos desse modelo. Uma pesquisadora comenta que o consumo de orgânicos cresceu 30% nos últimos cinco anos no Brasil.',
          text: 'Com base no vídeo, escreva um artigo para o blog de uma escola sobre a importância das feiras orgânicas para as cidades brasileiras. Aborde: o que são essas feiras, quais são seus benefícios (ambientais, econômicos, para a saúde) e como os jovens podem se envolver com esse movimento. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },

    // ── Seção 2 ─────────────────────────────────────────────────────────────
    {
      part: 2,
      title: 'Tarefa 2 – Produção a partir de áudio',
      skill: 'writing',
      instructions:
        'Escucharás una entrevista de radio en portugués. Lee la transcripción y redacta el texto solicitado.',
      transcript:
        'Apresentadora: Bem-vindos ao programa Empreender Hoje. Hoje eu tenho aqui comigo Lucas Ferreira, fundador do projeto CódigoLivre. Lucas, me conta: como surgiu essa ideia?\n\nLucas: Bom, eu trabalhava em uma grande empresa de tecnologia, ganhava bem, mas sentia que faltava algo. Aí, um dia, fui visitar uma amiga que mora no Complexo do Alemão, no Rio, e vi adolescentes com muito potencial, mas sem acesso a nenhuma formação em tecnologia. Pensei: eu posso mudar isso.\n\nApresentadora: E foi fácil largar o emprego?\n\nLucas: Nada fácil! Minha família ficou preocupada. Mas eu tinha certeza de que valia a pena. Comecei com uma turma de dez alunos, num espaço emprestado por uma ONG. Os desafios foram enormes: falta de computadores, internet instável, alunos que precisavam trabalhar para ajudar em casa.\n\nApresentadora: E os resultados?\n\nLucas: Em três anos, já formamos mais de duzentos jovens. Vários conseguiram emprego em empresas de tecnologia. Um deles está desenvolvendo o próprio aplicativo agora. É emocionante demais.\n\nApresentadora: E os planos para o futuro?\n\nLucas: Queremos expandir para outras cidades — Salvador, Recife e Belém estão no radar. E estamos buscando parcerias com empresas privadas para financiar bolsas e equipamentos. A missão é clara: tecnologia como instrumento de transformação social.',
      questions: [
        {
          type: 'write',
          id: 'celpe-bras-s2-q1',
          part: 2,
          taskNumber: 2,
          stimulusLabel: 'Entrevista de rádio',
          stimulus:
            'Você ouviu uma entrevista com Lucas Ferreira, fundador do projeto CódigoLivre, que ensina programação para jovens de comunidades carentes.',
          text: 'Escreva uma carta ao editor de uma revista de empreendedorismo social recomendando o projeto CódigoLivre para um prêmio de inovação social. Explique o que é o projeto, por que é inovador e qual é seu impacto. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },

    // ── Seção 3 ─────────────────────────────────────────────────────────────
    {
      part: 3,
      title: 'Tarefa 3 – Produção a partir de texto impresso',
      skill: 'writing',
      instructions:
        'Lee el texto en portugués y redacta el texto solicitado a partir de él.',
      passage:
        'Renda Básica Universal: solução ou utopia?\n\nO debate sobre a Renda Básica Universal (RBU) ganhou força no Brasil nos últimos anos. A ideia é simples: o governo pagaria uma quantia fixa a todos os cidadãos, independentemente de renda ou situação de emprego. O Brasil já tem experiência com programas de transferência de renda — o Bolsa Família, criado em 2003 e reformulado como Auxílio Brasil em 2021, atende milhões de famílias em situação de pobreza.\n\nAlgumas cidades brasileiras experimentaram modelos de renda básica em escala menor. Em Maricá, no Rio de Janeiro, o município paga uma renda básica a moradores de baixa renda usando recursos do petróleo. Os primeiros resultados apontam para redução da pobreza e aumento do comércio local.\n\nOs defensores da RBU argumentam que ela reduziria a pobreza de forma mais eficiente do que os programas atuais, simplificaria a burocracia e daria às pessoas a liberdade de escolher como trabalhar e viver. Economistas progressistas citam estudos que mostram que as pessoas não param de trabalhar quando recebem uma renda básica — ao contrário, investem em educação e saúde.\n\nJá os críticos apontam o alto custo fiscal de um programa universal e alertam para o risco de desincentivo ao trabalho. Economistas mais conservadores defendem que os recursos deveriam ser direcionados apenas aos mais pobres, não distribuídos de forma universal.\n\nO tema voltou à pauta com a aprovação, em 2021, da lei que institui a Renda Básica da Cidadania, de autoria do senador Eduardo Suplicy — mas a lei aguarda regulamentação e os recursos necessários para sua implementação ainda são objeto de debate.',
      questions: [
        {
          type: 'write',
          id: 'celpe-bras-s3-q1',
          part: 3,
          taskNumber: 1,
          stimulusLabel: 'Artigo de jornal: Renda Básica Universal',
          stimulus:
            'Você leu um artigo sobre o debate em torno da Renda Básica Universal no Brasil.',
          text: 'Escreva um texto de opinião para um jornal estudantil apresentando seu ponto de vista sobre a Renda Básica Universal. Use argumentos do texto e sua própria experiência ou conhecimento. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },

    // ── Seção 4 ─────────────────────────────────────────────────────────────
    {
      part: 4,
      title: 'Tarefa 4 – Produção a partir de texto impresso',
      skill: 'writing',
      instructions:
        'Lee el texto en portugués y redacta el texto solicitado a partir de él.',
      passage:
        '"Quiet quitting": trabalhar só o necessário virou tendência entre jovens brasileiros\n\nUma nova expressão tomou conta das conversas sobre trabalho no Brasil: o "quiet quitting", ou, em tradução livre, "demissão silenciosa". O termo não significa pedir demissão de verdade, mas sim fazer apenas o que está descrito no contrato — sem horas extras não remuneradas, sem se envolver em projetos além do escopo, sem estar disponível fora do horário de trabalho.\n\nA tendência surgiu nos Estados Unidos durante a pandemia, mas chegou com força ao Brasil, especialmente entre a geração Z e os millennials. Pesquisas recentes mostram que mais de 40% dos trabalhadores brasileiros entre 18 e 35 anos já adotaram ou consideraram adotar essa postura.\n\nOs motivos são variados: salários que não acompanham a inflação, falta de reconhecimento, cultura de "vestir a camisa" que ignora os limites do trabalhador e o esgotamento — a famosa síndrome de burnout, que a Organização Mundial da Saúde reconheceu como doença ocupacional em 2019.\n\nPara as empresas, a reação é mista. Alguns gestores enxergam o fenômeno como falta de comprometimento e temem queda na produtividade. Outros reconhecem que é sintoma de um problema maior: culturas organizacionais tóxicas e falta de valorização do colaborador.\n\nEspecialistas em recursos humanos alertam que o caminho não é nem o workaholismo nem o desengajamento total. O equilíbrio entre vida profissional e pessoal — o chamado work-life balance — é o grande desafio das empresas brasileiras na atualidade.',
      questions: [
        {
          type: 'write',
          id: 'celpe-bras-s4-q1',
          part: 4,
          taskNumber: 2,
          stimulusLabel: "Post de blog: 'Quiet quitting' no Brasil",
          stimulus:
            "Você leu um post sobre a tendência do 'quiet quitting' entre jovens profissionais brasileiros.",
          text: "Escreva um e-mail para um amigo brasileiro que está considerando adotar o 'quiet quitting' em seu emprego. Dê sua opinião sobre essa prática, mencione os prós e contras e sugira outras alternativas para lidar com o estresse no trabalho. (Mínimo: 150 palavras)",
          minWords: 150,
        },
      ],
    },

    // ── Seção 5 ─────────────────────────────────────────────────────────────
    {
      part: 5,
      title: 'Parte Oral – Interação com o Avaliador',
      skill: 'speaking',
      instructions:
        'La prueba oral es una conversación de 20 minutos con un evaluador, basada en elementos provocadores (imágenes, textos cortos, datos). Practica respondiendo a cada parte con fluidez y profundidad.',
      questions: [
        {
          type: 'speak',
          id: 'celpe-bras-s5-q1',
          part: 5,
          partNumber: 1,
          text: 'O avaliador vai mostrar a você uma imagem ou elemento provocador. Fale sobre o que você vê e o que isso significa para você.',
          cueCard:
            'Elemento provocador: Uma fotografia aérea de uma favela ao lado de um condomínio de luxo em uma grande cidade brasileira.\n\nPontos para discutir:\n• O que você observa na imagem?\n• O que essa imagem representa para a sociedade brasileira?\n• Como você se sente ao ver essa desigualdade?\n• O que poderia ser feito para mudar essa realidade?',
          followUp: [
            'Você já visitou alguma favela ou comunidade carente?',
            'Como a desigualdade social afeta a vida cotidiana no seu país?',
            'Que políticas públicas poderiam reduzir essa desigualdade?',
          ],
        },
        {
          type: 'speak',
          id: 'celpe-bras-s5-q2',
          part: 5,
          partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard:
            'Tema: O papel das redes sociais na política brasileira\n\nPontos para discutir:\n• As redes sociais ajudam ou prejudicam a democracia?\n• Como as fake news afetam as eleições?\n• Você se informa sobre política pelas redes sociais?\n• O governo deveria regulamentar as redes sociais?',
          followUp: [
            'Como você verifica se uma notícia é verdadeira ou falsa?',
            'Quais redes sociais você usa para se informar?',
            'O que acontece quando as pessoas só leem notícias que confirmam suas opiniões?',
          ],
        },
        {
          type: 'speak',
          id: 'celpe-bras-s5-q3',
          part: 5,
          partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard:
            'Situação: Você recebeu duas propostas de emprego:\n1. Um emprego bem pago em uma grande empresa internacional, mas que exige muitas horas extras e viagens frequentes\n2. Um emprego com salário menor em uma ONG, com horários flexíveis e impacto social positivo\n\nO que você escolheria? Por quê?',
          followUp: [
            'O que é mais importante para você no trabalho: o salário ou a satisfação pessoal?',
            'Você acredita que é possível ter equilíbrio entre vida profissional e pessoal no Brasil?',
            'Você já teve que fazer uma escolha difícil entre dinheiro e seus valores?',
          ],
        },
      ],
    },
  ],
};

export default mock;
