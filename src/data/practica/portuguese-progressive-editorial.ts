import {
  createPortugueseEditorialPack,
  type PortugueseEditorialChoiceSeed,
  type PortugueseEditorialErrorSeed,
  type PortugueseEditorialFinalSeed,
  type PortugueseEditorialGapSeed,
  type PortugueseEditorialMicroSeed,
  type PortugueseEditorialSequenceSeed,
} from './portuguese-editorial-builder.ts'

const micro: PortugueseEditorialMicroSeed[] = [
  { title: 'A chamada agora', cue: 'uma ação em andamento neste momento', segments: ['Agora, eu ', ' com a cliente por vídeo.'], verb: 'falar', answers: ['estou falando'], distractors: ['falo', 'estava falando', 'falava'] },
  { title: 'A chuva na janela', cue: 'um evento em curso agora', segments: ['Olhe pela janela: ', ' muito.'], verb: 'chover', answers: ['está chovendo'], distractors: ['chove', 'estava chovendo', 'chovia'] },
  { title: 'O relatório desta semana', cue: 'uma atividade temporária em andamento', segments: ['Nesta semana, nós ', ' o relatório anual.'], verb: 'revisar', answers: ['estamos revisando'], distractors: ['revisamos', 'estávamos revisando', 'revisávamos'] },
  { title: 'A espera no saguão', cue: 'uma ação em curso no momento da fala', segments: ['Neste momento, vocês ', ' no saguão principal.'], verb: 'esperar', answers: ['estão esperando'], distractors: ['esperam', 'estavam esperando', 'esperavam'] },
  { title: 'A cidade em mudança', cue: 'uma mudança gradual atual', segments: ['A cidade ', ' rapidamente com a nova linha de metrô.'], verb: 'crescer', answers: ['está crescendo'], distractors: ['cresce', 'estava crescendo', 'crescia'] },
  { title: 'O curso temporário', cue: 'uma situação limitada ao período atual', segments: ['Neste semestre, Lia ', ' japonês à noite.'], verb: 'estudar', answers: ['está estudando'], distractors: ['estuda', 'estava estudando', 'estudava'] },
  { title: 'Os técnicos no telhado', cue: 'uma ação visível em andamento', segments: ['Veja: os técnicos ', ' o painel do telhado.'], verb: 'instalar', answers: ['estão instalando'], distractors: ['instalam', 'estavam instalando', 'instalavam'] },
  { title: 'A fila aumentando', cue: 'um processo atual em desenvolvimento', segments: ['A fila ', ' a cada minuto.'], verb: 'aumentar', answers: ['está aumentando'], distractors: ['aumenta', 'estava aumentando', 'aumentava'] },
  { title: 'A viagem desta tarde', cue: 'uma ação em curso neste período', segments: ['Hoje à tarde, tu ', ' de trem para Curitiba.'], verb: 'viajar', answers: ['estás viajando'], distractors: ['viajas', 'estavas viajando', 'viajavas'] },
  { title: 'As crianças na cozinha', cue: 'uma atividade acontecendo agora', segments: ['Agora, as crianças ', ' o bolo com a avó.'], verb: 'preparar', answers: ['estão preparando'], distractors: ['preparam', 'estavam preparando', 'preparavam'] },
]

const choiceContexts: [string, string][] = [
  ['Enquanto você prepara o contrato, eu ', ' com o fornecedor ao telefone.'],
  ['Escute o telhado: ', ' sem parar.'],
  ['Durante este mês, nós ', ' os manuais do novo sistema.'],
  ['A recepcionista avisou que vocês ', ' na sala azul.'],
  ['Com a chegada de novas empresas, o bairro ', ' depressa.'],
  ['Neste trimestre, Lia ', ' francês para a mudança.'],
  ['Pela câmera, vemos que os técnicos ', ' a antena principal.'],
  ['Depois que o segundo guichê fechou, a fila ', ' rapidamente.'],
  ['Nesta parte do percurso, tu ', ' pela serra.'],
  ['Não entre ainda: as crianças ', ' uma surpresa.'],
]

const choices: PortugueseEditorialChoiceSeed[] = micro.map((seed, index) => ({
  cue: seed.cue,
  segments: choiceContexts[index]!,
  answer: seed.answers[0],
  distractors: seed.distractors,
}))

const long: PortugueseEditorialGapSeed[] = [
  { title: 'A transmissão ao vivo', instruction: 'Complete esta cena que acontece agora.', segments: ['A repórter ', ' da praça. O cinegrafista ', ' a entrada do prédio e a produtora ', ' o áudio no estúdio.'], entries: [['falar', ['está falando']], ['filmar', ['está filmando']], ['monitorar', ['está monitorando']]] },
  { title: 'A mudança do escritório', instruction: 'Complete estas ações temporárias em andamento.', segments: ['Hoje, nós ', ' as caixas. Dois colegas ', ' os computadores e a equipe de limpeza ', ' a sala nova.'], entries: [['organizar', ['estamos organizando']], ['desligar', ['estão desligando']], ['preparar', ['está preparando']]] },
  { title: 'O atendimento da emergência', instruction: 'Complete esta cena em andamento.', segments: ['A médica ', ' o paciente. Um enfermeiro ', ' a pressão e os familiares ', ' notícias no corredor.'], entries: [['examinar', ['está examinando']], ['medir', ['está medindo']], ['esperar', ['estão esperando']]] },
  { title: 'A cozinha antes do almoço', instruction: 'Complete o trabalho que ocorre neste momento.', segments: ['O chef ', ' o molho. As auxiliares ', ' os legumes e um garçom ', ' as primeiras mesas.'], entries: [['provar', ['está provando']], ['cortar', ['estão cortando']], ['arrumar', ['está arrumando']]] },
  { title: 'A obra da estação', instruction: 'Complete estes processos atuais.', segments: ['As máquinas ', ' o terreno. Uma equipe ', ' os novos trilhos e engenheiros ', ' cada etapa.'], entries: [['nivelar', ['estão nivelando']], ['assentar', ['está assentando']], ['acompanhar', ['estão acompanhando']]] },
  { title: 'A aula de laboratório', instruction: 'Complete as ações que estão acontecendo agora.', segments: ['A professora ', ' o procedimento. Nós ', ' as amostras e cada dupla ', ' os resultados.'], entries: [['demonstrar', ['está demonstrando']], ['comparar', ['estamos comparando']], ['registrar', ['está registrando']]] },
  { title: 'O resgate no rio', instruction: 'Complete esta operação em curso.', segments: ['Os bombeiros ', ' um barco. Um mergulhador ', ' a margem e a polícia ', ' a ponte.'], entries: [['baixar', ['estão baixando']], ['examinar', ['está examinando']], ['isolar', ['está isolando']]] },
  { title: 'A preparação do palco', instruction: 'Complete esta cena temporária.', segments: ['Os músicos ', ' os instrumentos. A técnica de luz ', ' os refletores e o diretor ', ' a ordem das cenas.'], entries: [['afinar', ['estão afinando']], ['regular', ['está regulando']], ['conferir', ['está conferindo']]] },
  { title: 'O mercado nesta manhã', instruction: 'Complete o movimento que ocorre agora.', segments: ['Os feirantes ', ' as barracas. Clientes ', ' os primeiros produtos e um fiscal ', ' as licenças.'], entries: [['montar', ['estão montando']], ['escolher', ['estão escolhendo']], ['verificar', ['está verificando']]] },
  { title: 'A tempestade chegando', instruction: 'Complete os processos visíveis neste momento.', segments: ['Nuvens escuras ', ' do oeste. O vento ', ' e os pescadores ', ' ao porto.'], entries: [['avançar', ['estão avançando']], ['aumentar', ['está aumentando']], ['voltar', ['estão voltando']]] },
]

const errors: PortugueseEditorialErrorSeed[] = [
  { title: 'A reportagem ao vivo', pieces: [['A repórter ', 'estão falando'], [' da praça. O cinegrafista ', 'está filmando'], [' e a produtora ', 'está monitorando']], after: ' o áudio.', wrong: 0, answers: ['está falando'], reason: 'O sujeito singular “a repórter” exige “está falando”.' },
  { title: 'A mudança de hoje', pieces: [['Nós ', 'estamos organizando'], [' as caixas. Dois colegas ', 'está desligando'], [' os computadores e a limpeza ', 'está preparando']], after: ' a sala.', wrong: 1, answers: ['estão desligando'], reason: 'O sujeito plural “dois colegas” exige “estão desligando”.' },
  { title: 'A emergência agora', pieces: [['A médica ', 'está examinando'], [' o paciente. Um enfermeiro ', 'está medindo'], [' a pressão e os familiares ', 'está esperando']], after: ' no corredor.', wrong: 2, answers: ['estão esperando'], reason: 'O sujeito plural “os familiares” exige “estão esperando”.' },
  { title: 'A cozinha em movimento', pieces: [['O chef ', 'estão provando'], [' o molho. As auxiliares ', 'estão cortando'], [' e um garçom ', 'está arrumando']], after: ' as mesas.', wrong: 0, answers: ['está provando'], reason: 'O sujeito singular “o chef” exige “está provando”.' },
  { title: 'A obra desta semana', pieces: [['As máquinas ', 'estão nivelando'], [' o terreno. Uma equipe ', 'estão assentando'], [' os trilhos e engenheiros ', 'estão acompanhando']], after: ' a obra.', wrong: 1, answers: ['está assentando'], reason: 'O núcleo singular “uma equipe” exige “está assentando”.' },
  { title: 'A experiência em curso', pieces: [['A professora ', 'está demonstrando'], [' o procedimento. Nós ', 'estamos comparando'], [' e cada dupla ', 'estão registrando']], after: ' os resultados.', wrong: 2, answers: ['está registrando'], reason: 'O sujeito singular “cada dupla” exige “está registrando”.' },
  { title: 'O resgate neste momento', pieces: [['Os bombeiros ', 'está baixando'], [' um barco. Um mergulhador ', 'está examinando'], [' e a polícia ', 'está isolando']], after: ' a ponte.', wrong: 0, answers: ['estão baixando'], reason: 'O sujeito plural “os bombeiros” exige “estão baixando”.' },
  { title: 'O palco agora', pieces: [['Os músicos ', 'estão afinando'], [' os instrumentos. A técnica ', 'estão regulando'], [' os refletores e o diretor ', 'está conferindo']], after: ' as cenas.', wrong: 1, answers: ['está regulando'], reason: 'O sujeito singular “a técnica” exige “está regulando”.' },
  { title: 'A feira abrindo', pieces: [['Os feirantes ', 'estão montando'], [' as barracas. Clientes ', 'estão escolhendo'], [' e um fiscal ', 'estão verificando']], after: ' as licenças.', wrong: 2, answers: ['está verificando'], reason: 'O sujeito singular “um fiscal” exige “está verificando”.' },
  { title: 'A montagem acelerada', pieces: [['Duas equipes ', 'está avançando'], [' na montagem. O ritmo ', 'está aumentando'], [' e os supervisores ', 'estão voltando']], after: ' à sala de controle.', wrong: 0, answers: ['estão avançando'], reason: 'O sujeito plural “duas equipes” exige “estão avançando”.' },
]

const sequences: PortugueseEditorialSequenceSeed[] = [
  { events: ['A repórter está falando da praça', 'O cinegrafista está filmando a entrada', 'A produtora está monitorando o áudio'], target: 0 },
  { events: ['Nós estamos organizando as caixas', 'Dois colegas estão desligando os computadores', 'A limpeza está preparando a sala'], target: 1 },
  { events: ['A médica está examinando o paciente', 'O enfermeiro está medindo a pressão', 'Os familiares estão esperando'], target: 2 },
  { events: ['O chef está provando o molho', 'As auxiliares estão cortando os legumes', 'O garçom está arrumando as mesas'], target: 0 },
  { events: ['As máquinas estão nivelando o terreno', 'Uma equipe está assentando os trilhos', 'Os engenheiros estão acompanhando a obra'], target: 1 },
  { events: ['A professora está demonstrando o procedimento', 'Nós estamos comparando as amostras', 'Cada dupla está registrando os resultados'], target: 2 },
  { events: ['Os bombeiros estão baixando o barco', 'O mergulhador está examinando a margem', 'A polícia está isolando a ponte'], target: 0 },
  { events: ['Os músicos estão afinando os instrumentos', 'A técnica está regulando os refletores', 'O diretor está conferindo as cenas'], target: 1 },
  { events: ['Os feirantes estão montando as barracas', 'Os clientes estão escolhendo produtos', 'O fiscal está verificando as licenças'], target: 2 },
  { events: ['Nuvens escuras estão avançando', 'O vento está aumentando', 'Os pescadores estão voltando'], target: 0 },
]

const final: PortugueseEditorialFinalSeed[] = [
  { verb: 'conferir', before: 'Agora, a equipe ', after: ' os últimos dados.', answer: 'está conferindo', distractors: ['confere', 'estava conferindo', 'conferia'] },
  { verb: 'correr', before: 'Olhe: as crianças ', after: ' no jardim.', answer: 'estão correndo', distractors: ['correm', 'estavam correndo', 'corriam'] },
  { verb: 'trabalhar', before: 'Nesta semana, nós ', after: ' em outra sala.', answer: 'estamos trabalhando', distractors: ['trabalhamos', 'estávamos trabalhando', 'trabalhávamos'] },
  { verb: 'baixar', before: 'Neste momento, você ', after: ' a versão atualizada.', answer: 'está baixando', distractors: ['baixa', 'estava baixando', 'baixava'] },
  { verb: 'subir', before: 'A cada dia, o nível do rio ', after: ' por causa da chuva.', answer: 'está subindo', distractors: ['sobe', 'estava subindo', 'subia'] },
  { verb: 'cuidar', before: 'Hoje, eu ', after: ' da casa da minha irmã.', answer: 'estou cuidando', distractors: ['cuido', 'estava cuidando', 'cuidava'] },
  { verb: 'reiniciar', before: 'Agora, os técnicos ', after: ' o servidor.', answer: 'estão reiniciando', distractors: ['reiniciam', 'estavam reiniciando', 'reiniciavam'] },
  { verb: 'cursar', before: 'Neste semestre, Lia ', after: ' duas disciplinas extras.', answer: 'está cursando', distractors: ['cursa', 'estava cursando', 'cursava'] },
  { verb: 'bater', before: 'Ouça: alguém ', after: ' na porta.', answer: 'está batendo', distractors: ['bate', 'estava batendo', 'batia'] },
  { verb: 'procurar', before: 'Agora, vocês ', after: ' a saída de emergência.', answer: 'estão procurando', distractors: ['procuram', 'estavam procurando', 'procuravam'] },
]

export const PORTUGUESE_PROGRESSIVE_EDITORIAL = createPortugueseEditorialPack({
  slug: 'progressivo',
  form: 'progressivo',
  focus: 'Estar + gerúndio',
  rule: 'No português brasileiro, estar no presente + gerúndio expressa ação em andamento, situação temporária ou mudança atual.',
  choices,
  micro,
  long,
  errors,
  sequences,
  final,
})
