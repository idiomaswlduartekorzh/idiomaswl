import {
  createPortugueseEditorialPack,
  type PortugueseEditorialErrorSeed,
  type PortugueseEditorialFinalSeed,
  type PortugueseEditorialGapSeed,
  type PortugueseEditorialMicroSeed,
  type PortugueseEditorialSequenceSeed,
} from './portuguese-editorial-builder.ts'

const micro: PortugueseEditorialMicroSeed[] = [
  { title: 'O projeto de sexta', cue: 'uma conclusão antes de um prazo futuro', segments: ['Até sexta-feira, nós ', ' o projeto.'], verb: 'concluir', answers: ['teremos concluído'], distractors: ['concluiremos', 'tínhamos concluído', 'teríamos concluído'] },
  { title: 'A partida antes da chegada', cue: 'uma ação anterior a outro futuro', segments: ['Quando você chegar, Ana já ', '.'], verb: 'partir', answers: ['terá partido'], distractors: ['partirá', 'tinha partido', 'teria partido'] },
  { title: 'Os arquivos da meia-noite', cue: 'um balanço concluído num momento futuro', segments: ['À meia-noite, eles ', ' todos os arquivos.'], verb: 'copiar', answers: ['terão copiado'], distractors: ['copiarão', 'tinham copiado', 'teriam copiado'] },
  { title: 'O curso até junho', cue: 'um resultado terminado antes de uma data futura', segments: ['Até junho, você ', ' a formação.'], verb: 'terminar', answers: ['terá terminado'], distractors: ['terminará', 'tinha terminado', 'teria terminado'] },
  { title: 'A volta antes do jantar', cue: 'um retorno concluído antes de outro futuro', segments: ['Antes do jantar começar, as caminhantes ', '.'], verb: 'voltar', answers: ['terão voltado'], distractors: ['voltarão', 'tinham voltado', 'teriam voltado'] },
  { title: 'A leitura antes da reunião', cue: 'uma tarefa terminada antes de um marco futuro', segments: ['Quando a reunião começar, eu ', ' os dois anexos.'], verb: 'ler', answers: ['terei lido'], distractors: ['lerei', 'tinha lido', 'teria lido'] },
  { title: 'A ponte até setembro', cue: 'uma obra concluída antes de uma data futura', segments: ['Até setembro, a cidade ', ' a ponte.'], verb: 'reformar', answers: ['terá reformado'], distractors: ['reformará', 'tinha reformado', 'teria reformado'] },
  { title: 'O pouso ao meio-dia', cue: 'um deslocamento terminado antes de uma hora futura', segments: ['Ao meio-dia, o avião ', ' em Manaus.'], verb: 'pousar', answers: ['terá pousado'], distractors: ['pousará', 'tinha pousado', 'teria pousado'] },
  { title: 'As inscrições antes de segunda', cue: 'um processo encerrado antes de uma data futura', segments: ['Antes de segunda-feira, nós ', ' todas as inscrições.'], verb: 'encerrar', answers: ['teremos encerrado'], distractors: ['encerraremos', 'tínhamos encerrado', 'teríamos encerrado'] },
  { title: 'Os convidados antes da volta', cue: 'uma partida concluída antes de um futuro', segments: ['Quando voltarmos, nossos convidados já ', '.'], verb: 'ir embora', answers: ['terão ido embora'], distractors: ['irão embora', 'tinham ido embora', 'teriam ido embora'] },
]

const long: PortugueseEditorialGapSeed[] = [
  { title: 'Até a abertura de sexta', instruction: 'Complete as tarefas concluídas antes da abertura futura.', segments: ['Até sexta de manhã, a equipe ', ' as vitrines. A gerente ', ' os preços e os técnicos ', ' a nova iluminação.'], entries: [['instalar', ['terá instalado']], ['conferir', ['terá conferido']], ['testar', ['terão testado']]] },
  { title: 'Quando o trem chegar', instruction: 'Complete as ações já realizadas nesse futuro.', segments: ['Quando o trem chegar, nós ', ' as passagens. Lia ', ' as malas e o motorista ', ' perto da estação.'], entries: [['comprar', ['teremos comprado']], ['preparar', ['terá preparado']], ['estacionar', ['terá estacionado']]] },
  { title: 'O balanço até dezembro', instruction: 'Complete os resultados alcançados antes de dezembro.', segments: ['Até dezembro, a associação ', ' cem famílias. Os voluntários ', ' cinco oficinas e a prefeitura ', ' dois espaços.'], entries: [['atender', ['terá atendido']], ['organizar', ['terão organizado']], ['abrir', ['terá aberto']]] },
  { title: 'Antes da saída do navio', instruction: 'Complete os controles terminados antes da partida futura.', segments: ['Antes de o navio sair, o capitão ', ' a previsão. Os mecânicos ', ' os motores e a tripulação ', ' todas as caixas.'], entries: [['consultar', ['terá consultado']], ['inspecionar', ['terão inspecionado']], ['carregar', ['terá carregado']]] },
  { title: 'Ao fim da obra', instruction: 'Complete o balanço futuro da obra.', segments: ['Ao fim da obra, os operários ', ' o telhado. A eletricista ', ' cada cabo e os pintores ', ' os três andares.'], entries: [['trocar', ['terão trocado']], ['verificar', ['terá verificado']], ['pintar', ['terão pintado']]] },
  { title: 'Quando o público entrar', instruction: 'Complete os preparativos concluídos antes da entrada.', segments: ['Quando o público entrar, os músicos ', ' os instrumentos. A técnica ', ' as luzes e o maestro ', ' a ordem das músicas.'], entries: [['afinar', ['terão afinado']], ['regular', ['terá regulado']], ['confirmar', ['terá confirmado']]] },
  { title: 'O laboratório às seis', instruction: 'Complete este balanço esperado para uma hora futura.', segments: ['Às seis, nós ', ' as amostras. O sistema ', ' os resultados e a pesquisadora ', ' uma conclusão inicial.'], entries: [['analisar', ['teremos analisado']], ['organizar', ['terá organizado']], ['escrever', ['terá escrito']]] },
  { title: 'Antes do próximo semestre', instruction: 'Complete as mudanças concluídas antes das aulas.', segments: ['Antes do próximo semestre, a escola ', ' as salas. Os professores ', ' os materiais e cada família ', ' o novo horário.'], entries: [['reformar', ['terá reformado']], ['selecionar', ['terão selecionado']], ['receber', ['terá recebido']]] },
  { title: 'Quando a tempestade chegar', instruction: 'Complete as medidas tomadas antes desse futuro.', segments: ['Quando a tempestade chegar à costa, os pescadores ', ' ao porto. A prefeitura ', ' as estradas e os bombeiros ', ' as equipes.'], entries: [['voltar', ['terão voltado']], ['fechar', ['terá fechado']], ['mobilizar', ['terão mobilizado']]] },
  { title: 'O processo antes da votação', instruction: 'Complete as etapas concluídas antes da votação.', segments: ['Antes da votação, os especialistas ', ' o projeto. A comissão ', ' os comentários e cada membro ', ' a versão final.'], entries: [['avaliar', ['terão avaliado']], ['incorporar', ['terá incorporado']], ['ler', ['terá lido']]] },
]

const errors: PortugueseEditorialErrorSeed[] = [
  { title: 'Até sexta de manhã', pieces: [['A equipe ', 'terão instalado'], [' as vitrines. A gerente ', 'terá conferido'], [' os preços e os técnicos ', 'terão testado']], after: ' as luzes.', wrong: 0, answers: ['terá instalado'], reason: 'O sujeito coletivo singular “a equipe” exige “terá instalado”.' },
  { title: 'Quando o trem chegar', pieces: [['Nós ', 'teremos comprado'], [' as passagens. Lia ', 'terão preparado'], [' as malas e o motorista ', 'terá estacionado']], after: '.', wrong: 1, answers: ['terá preparado'], reason: 'O sujeito singular “Lia” exige “terá preparado”.' },
  { title: 'Até dezembro', pieces: [['A associação ', 'terá atendido'], [' famílias. Os voluntários ', 'terão organizado'], [' oficinas e a prefeitura ', 'terão aberto']], after: ' espaços.', wrong: 2, answers: ['terá aberto'], reason: 'O sujeito singular “a prefeitura” exige “terá aberto”.' },
  { title: 'Antes de o navio sair', pieces: [['O capitão ', 'terão consultado'], [' a previsão. Os mecânicos ', 'terão inspecionado'], [' os motores e a tripulação ', 'terá carregado']], after: ' as caixas.', wrong: 0, answers: ['terá consultado'], reason: 'O sujeito singular “o capitão” exige “terá consultado”.' },
  { title: 'Ao fim da obra', pieces: [['Os operários ', 'terão trocado'], [' o telhado. A eletricista ', 'terão verificado'], [' os cabos e os pintores ', 'terão pintado']], after: ' os andares.', wrong: 1, answers: ['terá verificado'], reason: 'O sujeito singular “a eletricista” exige “terá verificado”.' },
  { title: 'Quando o público entrar', pieces: [['Os músicos ', 'terão afinado'], [' os instrumentos. A técnica ', 'terá regulado'], [' as luzes e o maestro ', 'terão confirmado']], after: ' a ordem.', wrong: 2, answers: ['terá confirmado'], reason: 'O sujeito singular “o maestro” exige “terá confirmado”.' },
  { title: 'Às seis', pieces: [['Nós ', 'terá analisado'], [' as amostras. O sistema ', 'terá organizado'], [' os resultados e a pesquisadora ', 'terá escrito']], after: ' uma conclusão.', wrong: 0, answers: ['teremos analisado'], reason: 'O sujeito “nós” exige “teremos analisado”.' },
  { title: 'Antes do semestre', pieces: [['A escola ', 'terá reformado'], [' as salas. Os professores ', 'terá selecionado'], [' os materiais e cada família ', 'terá recebido']], after: ' o horário.', wrong: 1, answers: ['terão selecionado'], reason: 'O sujeito plural “os professores” exige “terão selecionado”.' },
  { title: 'Quando a tempestade chegar', pieces: [['Os pescadores ', 'terão voltado'], [' ao porto. A prefeitura ', 'terá fechado'], [' as estradas e os bombeiros ', 'terá mobilizado']], after: ' as equipes.', wrong: 2, answers: ['terão mobilizado'], reason: 'O sujeito plural “os bombeiros” exige “terão mobilizado”.' },
  { title: 'Antes da votação', pieces: [['Os especialistas ', 'terão avaliado'], [' o projeto. A comissão ', 'terá incorporado'], [' os comentários e cada membro ', 'terão lido']], after: ' a versão.', wrong: 2, answers: ['terá lido'], reason: 'O sujeito singular “cada membro” exige “terá lido”.' },
]

const sequences: PortugueseEditorialSequenceSeed[] = [
  { events: ['A equipe terá instalado as vitrines', 'A gerente terá conferido os preços', 'Os técnicos terão testado as luzes'], target: 0 },
  { events: ['Nós teremos comprado as passagens', 'Lia terá preparado as malas', 'O motorista terá estacionado'], target: 1 },
  { events: ['A associação terá atendido famílias', 'Os voluntários terão organizado oficinas', 'A prefeitura terá aberto espaços'], target: 2 },
  { events: ['O capitão terá consultado a previsão', 'Os mecânicos terão inspecionado os motores', 'A tripulação terá carregado as caixas'], target: 0 },
  { events: ['Os operários terão trocado o telhado', 'A eletricista terá verificado os cabos', 'Os pintores terão pintado os andares'], target: 1 },
  { events: ['Os músicos terão afinado instrumentos', 'A técnica terá regulado as luzes', 'O maestro terá confirmado a ordem'], target: 2 },
  { events: ['Nós teremos analisado as amostras', 'O sistema terá organizado os resultados', 'A pesquisadora terá escrito uma conclusão'], target: 0 },
  { events: ['A escola terá reformado as salas', 'Os professores terão selecionado materiais', 'Cada família terá recebido o horário'], target: 1 },
  { events: ['Os pescadores terão voltado', 'A prefeitura terá fechado estradas', 'Os bombeiros terão mobilizado equipes'], target: 2 },
  { events: ['Os especialistas terão avaliado o projeto', 'A comissão terá incorporado comentários', 'Cada membro terá lido a versão'], target: 0 },
]

const final: PortugueseEditorialFinalSeed[] = [
  { before: 'Até amanhã à noite, eu ', after: ' todos os formulários.', answer: 'terei preenchido', distractors: ['preencherei', 'tinha preenchido', 'teria preenchido'] },
  { before: 'Quando você abrir a sala, as técnicas ', after: ' a instalação.', answer: 'terão terminado', distractors: ['terminarão', 'tinham terminado', 'teriam terminado'] },
  { before: 'Até o fim do mês, nós ', after: ' toda a quantia.', answer: 'teremos pago', distractors: ['pagaremos', 'tínhamos pago', 'teríamos pago'] },
  { before: 'Antes da próxima revisão, o motor ', after: ' mil horas.', answer: 'terá funcionado', distractors: ['funcionará', 'tinha funcionado', 'teria funcionado'] },
  { before: 'Quando vocês chegarem ao abrigo, Lia já ', after: '.', answer: 'terá chegado', distractors: ['chegará', 'tinha chegado', 'teria chegado'] },
  { before: 'Até 2030, a cidade ', after: ' todas essas linhas.', answer: 'terá ampliado', distractors: ['ampliará', 'tinha ampliado', 'teria ampliado'] },
  { before: 'Antes do discurso, eles ', after: ' o texto duas vezes.', answer: 'terão relido', distractors: ['relerão', 'tinham relido', 'teriam relido'] },
  { before: 'Às oito, você ', after: ' os últimos convidados.', answer: 'terá recebido', distractors: ['receberá', 'tinha recebido', 'teria recebido'] },
  { before: 'Quando o sol nascer, os barcos ', after: ' o porto.', answer: 'terão deixado', distractors: ['deixarão', 'tinham deixado', 'teriam deixado'] },
  { before: 'Até a premiação, o júri ', after: ' cada projeto.', answer: 'terá avaliado', distractors: ['avaliará', 'tinha avaliado', 'teria avaliado'] },
]

export const PORTUGUESE_FUTURE_PERFECT_EDITORIAL = createPortugueseEditorialPack({
  slug: 'futuro-composto',
  form: 'futuro-composto',
  focus: 'Futuro composto',
  rule: 'Ter no futuro + particípio apresenta algo concluído antes de um prazo ou de outro momento explicitamente futuro.',
  micro,
  long,
  errors,
  sequences,
  final,
})
