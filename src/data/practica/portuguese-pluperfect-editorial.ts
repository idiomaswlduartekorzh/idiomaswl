import {
  createPortugueseEditorialPack,
  type PortugueseEditorialErrorSeed,
  type PortugueseEditorialFinalSeed,
  type PortugueseEditorialGapSeed,
  type PortugueseEditorialMicroSeed,
  type PortugueseEditorialSequenceSeed,
} from './portuguese-editorial-builder.ts'

const micro: PortugueseEditorialMicroSeed[] = [
  { title: 'Os lugares no trem', cue: 'uma ação concluída antes da partida', segments: ['Quando o trem partiu, nós já ', ' nossos lugares.'], verb: 'encontrar', answers: ['tínhamos encontrado'], distractors: ['encontramos', 'encontrávamos', 'teremos encontrado'] },
  { title: 'A viagem anterior a Roma', cue: 'uma experiência anterior a outro passado', segments: ['Ela conhecia Roma porque ', ' lá dois anos antes.'], verb: 'ir', answers: ['tinha ido'], distractors: ['foi', 'ia', 'terá ido'] },
  { title: 'A chave deixada', cue: 'uma causa concluída antes da entrada', segments: ['Conseguimos entrar porque Rui ', ' a chave com a portaria.'], verb: 'deixar', answers: ['tinha deixado'], distractors: ['deixou', 'deixava', 'terá deixado'] },
  { title: 'O arquivo apagado', cue: 'uma ação anterior à busca', segments: ['Quando Lia procurou o arquivo, um colega já o ', ' por engano.'], verb: 'apagar', answers: ['tinha apagado'], distractors: ['apagou', 'apagava', 'terá apagado'] },
  { title: 'A partida antes da ligação', cue: 'uma partida anterior a outro fato passado', segments: ['Quando ligamos, as vizinhas já ', ' havia uma hora.'], verb: 'sair', answers: ['tinham saído'], distractors: ['saíram', 'saíam', 'terão saído'] },
  { title: 'A bateria descarregada', cue: 'uma causa anterior a uma falha passada', segments: ['O celular não ligou porque a bateria ', ' durante a noite.'], verb: 'descarregar', answers: ['tinha descarregado'], distractors: ['descarregou', 'descarregava', 'terá descarregado'] },
  { title: 'O relatório lido', cue: 'uma preparação anterior à reunião', segments: ['Na reunião, eu conhecia o assunto porque ', ' o relatório na véspera.'], verb: 'ler', answers: ['tinha lido'], distractors: ['li', 'lia', 'terei lido'] },
  { title: 'As passagens reservadas', cue: 'uma reserva anterior à viagem', segments: ['Viajamos tranquilos porque vocês ', ' todas as passagens em janeiro.'], verb: 'reservar', answers: ['tinham reservado'], distractors: ['reservaram', 'reservavam', 'terão reservado'] },
  { title: 'O salão preparado', cue: 'uma preparação concluída antes da chegada', segments: ['Quando os convidados chegaram, a equipe já ', ' todo o salão.'], verb: 'preparar', answers: ['tinha preparado'], distractors: ['preparou', 'preparava', 'terá preparado'] },
  { title: 'A volta antes da chuva', cue: 'um retorno concluído antes da tempestade', segments: ['Quando a tempestade começou, os caminhantes já ', ' ao abrigo.'], verb: 'voltar', answers: ['tinham voltado'], distractors: ['voltaram', 'voltavam', 'terão voltado'] },
]

const long: PortugueseEditorialGapSeed[] = [
  { title: 'Antes da abertura do restaurante', instruction: 'Complete os preparativos anteriores ao serviço.', segments: ['Quando os primeiros clientes chegaram, o chef ', ' o cardápio. A equipe ', ' os legumes e a gerente ', ' todas as reservas.'], entries: [['finalizar', ['tinha finalizado']], ['preparar', ['tinha preparado']], ['confirmar', ['tinha confirmado']]] },
  { title: 'O escritório depois do furto', instruction: 'Complete os fatos anteriores à chegada da polícia.', segments: ['Antes de a polícia chegar, os invasores ', ' uma janela. Eles ', ' dois computadores e ', ' pelo pátio dos fundos.'], entries: [['forçar', ['tinham forçado']], ['levar', ['tinham levado']], ['sair', ['tinham saído']]] },
  { title: 'A viagem sem correria', instruction: 'Complete os preparativos anteriores à saída.', segments: ['Quando saímos de casa, Joana ', ' os passaportes. Eu ', ' as passagens e nós ', ' um carro para as seis.'], entries: [['conferir', ['tinha conferido']], ['imprimir', ['tinha imprimido', 'tinha impresso']], ['reservar', ['tínhamos reservado']]] },
  { title: 'A retomada da obra', instruction: 'Complete as etapas anteriores à retomada.', segments: ['Quando os operários voltaram, a engenheira ', ' as plantas. A prefeitura ', ' a licença e os fornecedores ', ' os materiais.'], entries: [['corrigir', ['tinha corrigido']], ['assinar', ['tinha assinado']], ['entregar', ['tinham entregado']]] },
  { title: 'O espetáculo salvo', instruction: 'Complete as ações anteriores à abertura da cortina.', segments: ['Antes de o espetáculo começar, os técnicos ', ' o projetor. A costureira ', ' o casaco e a atriz ', ' o texto mais uma vez.'], entries: [['consertar', ['tinham consertado']], ['costurar', ['tinha costurado']], ['reler', ['tinha relido']]] },
  { title: 'O bairro depois da enchente', instruction: 'Complete as mudanças anteriores à visita.', segments: ['Quando revimos o bairro, o rio ', ' várias ruas. Muitas famílias ', ' suas casas e a prefeitura ', ' um abrigo.'], entries: [['inundar', ['tinha inundado']], ['deixar', ['tinham deixado']], ['abrir', ['tinha aberto']]] },
  { title: 'A candidatura de Mina', instruction: 'Complete as etapas anteriores à entrevista.', segments: ['Antes da entrevista, Mina ', ' o currículo. Ela ', ' dois antigos colegas e ', ' uma apresentação curta.'], entries: [['atualizar', ['tinha atualizado']], ['procurar', ['tinha procurado']], ['preparar', ['tinha preparado']]] },
  { title: 'A pane evitada', instruction: 'Complete os controles anteriores à reinicialização.', segments: ['Quando a rede voltou, a equipe ', ' o cabo defeituoso. Ela ', ' uma cópia dos dados e ', ' os acessos externos.'], entries: [['trocar', ['tinha trocado']], ['fazer', ['tinha feito']], ['bloquear', ['tinha bloqueado']]] },
  { title: 'O abrigo antes da neve', instruction: 'Complete as ações anteriores à tempestade.', segments: ['Quando a neve começou, os responsáveis ', ' as janelas. Eles ', ' lenha seca e todos os visitantes ', ' para dentro.'], entries: [['fechar', ['tinham fechado']], ['guardar', ['tinham guardado']], ['voltar', ['tinham voltado']]] },
  { title: 'A obra de arte encontrada', instruction: 'Complete as pesquisas anteriores à descoberta.', segments: ['Quando a tela reapareceu, a curadora ', ' os arquivos. Dois peritos ', ' a assinatura e um laboratório ', ' os pigmentos.'], entries: [['consultar', ['tinha consultado']], ['comparar', ['tinham comparado']], ['analisar', ['tinha analisado']]] },
]

const errors: PortugueseEditorialErrorSeed[] = [
  { title: 'Antes do serviço', pieces: [['O chef ', 'tinham finalizado'], [' o cardápio. A equipe ', 'tinha preparado'], [' os legumes e a gerente ', 'tinha confirmado']], after: ' as reservas antes da abertura.', wrong: 0, answers: ['tinha finalizado'], reason: 'O sujeito singular “o chef” exige “tinha finalizado”.' },
  { title: 'Antes da polícia', pieces: [['Os invasores ', 'tinham forçado'], [' uma janela e ', 'tinha levado'], [' os computadores; depois, ', 'tinham saído']], after: ' pelo pátio antes da chegada da polícia.', wrong: 1, answers: ['tinham levado'], reason: 'O sujeito plural “os invasores” continua expresso.' },
  { title: 'Antes da viagem', pieces: [['Joana ', 'tinha conferido'], [' os passaportes. Eu ', 'tinha imprimido'], [' as passagens e nós ', 'tinha reservado']], after: ' um carro.', wrong: 2, answers: ['tínhamos reservado'], reason: 'O sujeito “nós” exige “tínhamos reservado”.' },
  { title: 'Antes da retomada', pieces: [['A engenheira ', 'tinham corrigido'], [' as plantas. A prefeitura ', 'tinha assinado'], [' a licença e os fornecedores ', 'tinham entregado']], after: ' os materiais.', wrong: 0, answers: ['tinha corrigido'], reason: 'O sujeito singular “a engenheira” exige “tinha corrigido”.' },
  { title: 'Antes do espetáculo', pieces: [['Os técnicos ', 'tinham consertado'], [' o projetor. A costureira ', 'tinham costurado'], [' o casaco e a atriz ', 'tinha relido']], after: ' o texto.', wrong: 1, answers: ['tinha costurado'], reason: 'O sujeito singular “a costureira” exige “tinha costurado”.' },
  { title: 'Depois da enchente', pieces: [['O rio ', 'tinha inundado'], [' as ruas. As famílias ', 'tinham deixado'], [' suas casas e a prefeitura ', 'tinham aberto']], after: ' um abrigo.', wrong: 2, answers: ['tinha aberto'], reason: 'O sujeito singular “a prefeitura” exige “tinha aberto”.' },
  { title: 'Antes da entrevista', pieces: [['Mina ', 'tinham atualizado'], [' o currículo. Ela ', 'tinha procurado'], [' colegas e ', 'tinha preparado']], after: ' uma apresentação.', wrong: 0, answers: ['tinha atualizado'], reason: 'O sujeito singular “Mina” exige “tinha atualizado”.' },
  { title: 'Antes da rede voltar', pieces: [['A equipe ', 'tinha trocado'], [' o cabo, ', 'tinham feito'], [' uma cópia e ', 'tinha bloqueado']], after: ' os acessos.', wrong: 1, answers: ['tinha feito'], reason: 'O sujeito coletivo singular “a equipe” continua expresso.' },
  { title: 'Antes da neve', pieces: [['Os responsáveis ', 'tinham fechado'], [' as janelas, ', 'tinham guardado'], [' a lenha e os visitantes ', 'tinha voltado']], after: ' para dentro.', wrong: 2, answers: ['tinham voltado'], reason: 'O sujeito plural “os visitantes” exige “tinham voltado”.' },
  { title: 'Antes da descoberta', pieces: [['A curadora ', 'tinha consultado'], [' os arquivos. Dois peritos ', 'tinha comparado'], [' a assinatura e o laboratório ', 'tinha analisado']], after: ' os pigmentos.', wrong: 1, answers: ['tinham comparado'], reason: 'O sujeito plural “dois peritos” exige “tinham comparado”.' },
]

const sequences: PortugueseEditorialSequenceSeed[] = [
  { events: ['O chef tinha finalizado o cardápio', 'A equipe tinha preparado os legumes', 'A gerente tinha confirmado as reservas'], target: 0 },
  { events: ['Os invasores tinham forçado a janela', 'Tinham levado os computadores', 'Tinham saído pelo pátio'], target: 1 },
  { events: ['Joana tinha conferido os passaportes', 'Eu tinha impresso as passagens', 'Nós tínhamos reservado o carro'], target: 2 },
  { events: ['A engenheira tinha corrigido as plantas', 'A prefeitura tinha assinado a licença', 'Os fornecedores tinham entregado os materiais'], target: 0 },
  { events: ['Os técnicos tinham consertado o projetor', 'A costureira tinha costurado o casaco', 'A atriz tinha relido o texto'], target: 1 },
  { events: ['O rio tinha inundado as ruas', 'As famílias tinham deixado as casas', 'A prefeitura tinha aberto um abrigo'], target: 2 },
  { events: ['Mina tinha atualizado o currículo', 'Ela tinha procurado colegas', 'Ela tinha preparado a apresentação'], target: 0 },
  { events: ['A equipe tinha trocado o cabo', 'Tinha feito uma cópia', 'Tinha bloqueado os acessos'], target: 1 },
  { events: ['Os responsáveis tinham fechado as janelas', 'Tinham guardado a lenha', 'Os visitantes tinham voltado'], target: 2 },
  { events: ['A curadora tinha consultado os arquivos', 'Os peritos tinham comparado a assinatura', 'O laboratório tinha analisado os pigmentos'], target: 0 },
]

const final: PortugueseEditorialFinalSeed[] = [
  { before: 'Quando o diretor chegou, nós já ', after: ' o problema.', answer: 'tínhamos resolvido', distractors: ['resolvemos', 'resolvíamos', 'teremos resolvido'] },
  { before: 'Ela reconheceu a rua onde ', after: ' dez anos antes.', answer: 'tinha morado', distractors: ['morou', 'morava', 'terá morado'] },
  { before: 'A porta estava aberta porque o porteiro a ', after: ' antes de sair.', answer: 'tinha destravado', distractors: ['destravou', 'destravava', 'terá destravado'] },
  { before: 'Quando abri a caixa de entrada, você já me ', after: ' três mensagens.', answer: 'tinha enviado', distractors: ['enviou', 'enviava', 'terá enviado'] },
  { before: 'No começo da reunião, as convidadas já ', after: ' no salão.', answer: 'tinham entrado', distractors: ['entraram', 'entravam', 'terão entrado'] },
  { before: 'Ele não conseguiu pagar porque ', after: ' a carteira em casa.', answer: 'tinha esquecido', distractors: ['esqueceu', 'esquecia', 'terá esquecido'] },
  { before: 'Quando chegamos, vocês já ', after: ' todos os documentos.', answer: 'tinham organizado', distractors: ['organizaram', 'organizavam', 'terão organizado'] },
  { before: 'O jardim estava encharcado porque ', after: ' a noite toda.', answer: 'tinha chovido', distractors: ['choveu', 'chovia', 'terá chovido'] },
  { before: 'Quando o alarme tocou, os alunos já ', after: ' do prédio.', answer: 'tinham saído', distractors: ['saíram', 'saíam', 'terão saído'] },
  { before: 'O cliente aceitou a oferta que nós ', after: ' na véspera.', answer: 'tínhamos enviado', distractors: ['enviamos', 'enviávamos', 'teremos enviado'] },
]

export const PORTUGUESE_PLUPERFECT_EDITORIAL = createPortugueseEditorialPack({
  slug: 'mais-que-perfeito',
  form: 'mais-que-perfeito',
  focus: 'Mais-que-perfeito composto',
  rule: 'Ter no imperfeito + particípio situa uma ação concluída antes de outro marco explicitamente passado.',
  micro,
  long,
  errors,
  sequences,
  final,
})
