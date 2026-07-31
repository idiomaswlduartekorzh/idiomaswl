import type { MockExam } from './types';

// CELPE-Bras — formato oficial INEP/MEC. Tarefa 1 usa vídeo OFICIAL do acervo público
// da UFRGS (ufrgs.br/acervocelpebras); as perguntas foram reescritas, não copiadas do
// caderno oficial. Tarefas 2-4 e Parte Oral são conteúdo ORIGINAL WeLearn.
// Áudio/vídeo/imagens sob /audio/celpe-bras/set-15/ e /images/celpe-bras/set-15/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'set-15',
  examSlug: 'celpe-bras',
  title: 'CELPE-Bras – Simulado 15',
  subtitle: 'Parte Escrita (4 tarefas) · Parte Oral',
  timeMinutes: 210,
  sections: [
    {
      part: 1, skill: 'writing', title: 'Tarefa 1 – Produção a partir de vídeo',
      instructions: 'Assista ao vídeo oficial do CELPE-BRAS (edição 2009/2). Preste atenção ao tema e às informações apresentadas. Depois, redija o texto solicitado em português.',
      audioUrl: '/api/celpe-bras-video?src=https%3A%2F%2Fwww.ufrgs.br%2Facervocelpebras%2Fwp-content%2Fuploads%2F2021%2F12%2F2009_2-Video-Automedicacao.mp4',
      questions: [
        {
          type: 'write', id: 'celpe-bras-s15-q1', part: 1, taskNumber: 1,
          stimulusLabel: 'Vídeo oficial CELPE-BRAS — Automedicação',
          stimulus: '[Vídeo oficial CELPE-BRAS, edição 2009/2] Tema: "Automedicação". Assista com atenção para compreender as informações apresentadas antes de escrever seu texto.',
          text: 'Com base no que você assistiu, escreva um texto sobre o tema do vídeo, no gênero e para o interlocutor que fizerem mais sentido para o assunto (por exemplo, uma carta, um e-mail, um texto informativo ou uma postagem). Explique o tema, comente as informações apresentadas e inclua sua própria opinião quando pertinente. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 2, skill: 'writing', title: 'Tarefa 2 – Produção a partir de áudio',
      instructions: 'Ouça o áudio (entrevista de rádio). Depois, redija o texto solicitado em português.',
      audioUrl: '/audio/celpe-bras/set-15/tarefa-2.mp3',
      transcript: `Apresentador: No quadro Meio Ambiente, recebemos a engenheira ambiental Tânia Rocha, que trabalha com energia limpa em comunidades isoladas. Tânia, o que você faz exatamente?\n\nTânia: Eu levo energia solar a lugares onde a rede elétrica não chega. Comunidades no meio da floresta, ilhas, vilarejos distantes. Instalo painéis solares que geram luz, permitem carregar celulares e até guardar remédios e alimentos na geladeira.\n\nApresentador: Como a energia muda a vida dessas pessoas?\n\nTânia: Transforma tudo. Uma criança que só podia estudar de dia agora estuda à noite, com luz. Um posto de saúde consegue refrigerar vacinas. A comunidade se comunica com o mundo. A energia não é luxo; é dignidade e oportunidade.\n\nApresentador: Por que a energia solar e não outros meios?\n\nTânia: Porque o sol está em todo lugar, é gratuito e limpo. Levar postes e fios até esses lugares seria caríssimo e demorado. Com o sol, a solução é local, sustentável e independente. E o Brasil tem sol de sobra.\n\nApresentador: Quais são os desafios?\n\nTânia: Custo inicial dos equipamentos, manutenção, e formar pessoas locais para cuidar do sistema. Por isso, eu sempre treino moradores da própria comunidade. Assim, o projeto se sustenta mesmo depois que eu vou embora.\n\nApresentador: Um trabalho que ilumina, no sentido literal e figurado. Obrigado, Tânia.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s15-q2', part: 2, taskNumber: 2,
          stimulusLabel: 'Entrevista: energia solar em comunidades isoladas',
          stimulus: 'Você ouviu uma entrevista com a engenheira Tânia Rocha sobre levar energia solar a comunidades isoladas.',
          text: 'Escreva uma carta a uma empresa de energia propondo que ela financie projetos de energia solar em comunidades sem acesso à eletricidade. Use argumentos da entrevista e explique os benefícios sociais e ambientais dessa parceria. (Mínimo: 180 palavras)',
          minWords: 180,
        },
      ],
    },
    {
      part: 3, skill: 'writing', title: 'Tarefa 3 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `A importância do sono na vida moderna\n\nDormir bem parece cada vez mais um luxo na vida moderna. Entre o trabalho, os estudos, as telas e a correria do dia a dia, muita gente sacrifica o sono, tratando-o como tempo perdido. No entanto, a ciência é clara: o sono é essencial para a saúde física e mental, e dormir mal tem consequências sérias.\n\nDurante o sono, o corpo se recupera e o cérebro organiza as memórias e o aprendizado do dia. A falta de sono prejudica a concentração, o humor e a tomada de decisões. A longo prazo, dormir pouco está ligado a problemas como obesidade, diabetes, doenças cardíacas e depressão. Um cérebro cansado também é mais propenso a erros e acidentes.\n\nVários fatores atrapalham o sono na atualidade. O uso de celulares e computadores antes de dormir, com sua luz azul, engana o cérebro. O estresse e a ansiedade tiram o sono. E a cultura de "produtividade a qualquer custo" faz muita gente se orgulhar de dormir pouco, como se fosse sinal de esforço.\n\nCuidar do sono deveria ser prioridade. Manter horários regulares, reduzir as telas à noite, criar um ambiente tranquilo e reservar tempo suficiente para descansar são atitudes simples com grande impacto. Dormir bem não é preguiça; é uma das bases de uma vida saudável, produtiva e feliz.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s15-q3', part: 3, taskNumber: 1,
          stimulusLabel: 'Artigo: A importância do sono',
          stimulus: 'Você leu um artigo sobre a importância do sono e os problemas causados por dormir mal na vida moderna.',
          text: 'Escreva um texto de opinião para o blog de saúde da sua faculdade apresentando seu ponto de vista sobre a importância do sono. Use argumentos do texto e proponha hábitos que ajudem os estudantes a dormir melhor. (Mínimo: 200 palavras)',
          minWords: 200,
        },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Tarefa 4 – Produção a partir de texto impresso',
      instructions: 'Leia o texto e redija o texto solicitado a partir dele.',
      passage: `O renascimento do cinema nacional\n\nO cinema brasileiro vive um momento de destaque. Produções nacionais têm conquistado prêmios importantes em festivais internacionais, atraído grandes públicos nas salas e nas plataformas de streaming, e mostrado ao mundo a diversidade e a riqueza da cultura do país. De comédias populares a dramas premiados e documentários potentes, o cinema nacional se reinventa.\n\nEsse renascimento tem várias razões. Políticas de incentivo, mesmo com altos e baixos, permitiram o surgimento de novos talentos. A tecnologia barateou a produção, possibilitando que cineastas de todas as regiões contem suas histórias. E as plataformas de streaming abriram uma janela para que o filme brasileiro chegue a milhões de pessoas dentro e fora do país.\n\nO cinema nacional tem um papel que vai além do entretenimento. Ele conta as nossas histórias, retrata as nossas realidades, dá voz a diferentes regiões e grupos, e fortalece a identidade cultural. Quando um filme brasileiro emociona plateias em outros países, ele mostra a nossa cultura e gera orgulho e reconhecimento.\n\nApoiar o cinema nacional é apostar na cultura e na economia. Cada filme gera empregos, movimenta a economia criativa e projeta a imagem do Brasil no mundo. Assistir, divulgar e valorizar as produções do país é uma forma de cada um contribuir para que esse renascimento continue e se fortaleça.`,
      questions: [
        {
          type: 'write', id: 'celpe-bras-s15-q4', part: 4, taskNumber: 2,
          stimulusLabel: 'Reportagem: O renascimento do cinema nacional',
          stimulus: 'Você leu uma reportagem sobre o bom momento do cinema brasileiro.',
          text: 'Escreva um e-mail a um amigo que só assiste a filmes estrangeiros e diz que "cinema brasileiro não presta". Dê sua opinião, recomende que ele conheça as produções nacionais e explique por que vale a pena valorizar o cinema do país. (Mínimo: 150 palavras)',
          minWords: 150,
        },
      ],
    },
    {
      part: 5, skill: 'speaking', title: 'Parte Oral – Interação com o Avaliador',
      instructions: 'A prova oral é uma conversa de cerca de 20 minutos com um avaliador, baseada em elementos provocadores. Pratique respondendo a cada parte com fluência e profundidade.',
      questions: [
        {
          type: 'speak', id: 'celpe-bras-s15-o1', part: 5, partNumber: 1,
          text: 'O avaliador vai mostrar a você um elemento provocador. Fale sobre o que você observa e o que isso representa.',
          cueCard: 'Elemento provocador: Uma fotografia de uma sala de cinema quase vazia de um lado e, do outro, uma pessoa sozinha em casa assistindo a um filme no celular, na cama.\n\nPontos para discutir:\n• O que a imagem mostra sobre a forma como consumimos filmes e séries hoje?\n• O cinema (a sala) ainda tem lugar na era do streaming?\n• O que se ganha e o que se perde ao assistir sozinho, em casa?\n• Assistir a algo em grupo é uma experiência diferente?',
          followUp: [
            'Você prefere assistir a filmes no cinema ou em casa? Por quê?',
            'As plataformas de streaming mudaram os seus hábitos?',
            'Ver algo junto com outras pessoas tem um valor especial?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s15-o2', part: 5, partNumber: 2,
          text: 'O avaliador vai propor um tema para discussão. Expresse sua opinião e interaja com o avaliador.',
          cueCard: 'Tema: A pressão por sucesso e produtividade\n\nPontos para discutir:\n• A sociedade cobra demais das pessoas em relação a sucesso e produtividade?\n• Por que descansar às vezes gera culpa?\n• O que é realmente ser "bem-sucedido"?\n• Como lidar com a pressão sem adoecer?',
          followUp: [
            'Você sente pressão para estar sempre produzindo?',
            'O sucesso dos outros nas redes sociais afeta você?',
            'O que traria mais equilíbrio para a sua vida?',
          ],
        },
        {
          type: 'speak', id: 'celpe-bras-s15-o3', part: 5, partNumber: 3,
          text: 'O avaliador vai apresentar uma situação hipotética. Discuta suas opções e tome uma decisão.',
          cueCard: 'Situação: Um amigo próximo pede a sua opinião sincera sobre um projeto (um negócio, um trabalho artístico) no qual ele está muito empolgado, mas que você acha que tem sérios problemas. Você precisa decidir entre:\n1. Ser totalmente sincero, mesmo que isso o desanime\n2. Apoiar e incentivar, guardando as suas dúvidas\n\nO que você faria? Por quê?',
          followUp: [
            'A sinceridade é sempre a melhor opção?',
            'Como dar uma opinião difícil sem magoar alguém?',
            'Você prefere que sejam sinceros ou gentis com você?',
          ],
        },
      ],
    },
  ],
};

export default mock;
