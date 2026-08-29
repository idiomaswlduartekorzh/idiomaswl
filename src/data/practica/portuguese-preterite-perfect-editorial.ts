import {
  createPortugueseEditorialPack,
  type PortugueseEditorialErrorSeed,
  type PortugueseEditorialFinalSeed,
  type PortugueseEditorialGapSeed,
  type PortugueseEditorialMicroSeed,
  type PortugueseEditorialSequenceSeed,
} from './portuguese-editorial-builder.ts'

const micro: PortugueseEditorialMicroSeed[] = [
  { title: 'O relatório de ontem', cue: 'uma ação concluída ontem', segments: ['Ontem, nós ', ' o relatório antes do almoço.'], verb: 'enviar', answers: ['enviamos'], distractors: ['enviávamos', 'tínhamos enviado', 'enviaremos'] },
  { title: 'A chegada de Camila', cue: 'um evento concluído no sábado passado', segments: ['Camila ', ' a Salvador no sábado passado.'], verb: 'chegar', answers: ['chegou'], distractors: ['chegava', 'tinha chegado', 'chegará'] },
  { title: 'O filme desta semana', cue: 'um evento concluído em uma ocasião definida', segments: ['Você ', ' esse filme na terça-feira.'], verb: 'ver', answers: ['viu'], distractors: ['via', 'tinha visto', 'verá'] },
  { title: 'A pane da manhã', cue: 'um conserto concluído hoje cedo', segments: ['O técnico ', ' o servidor às nove da manhã.'], verb: 'consertar', answers: ['consertou'], distractors: ['consertava', 'tinha consertado', 'consertará'] },
  { title: 'A partida das vizinhas', cue: 'uma partida concluída no domingo', segments: ['Minhas vizinhas ', ' bem cedo no domingo.'], verb: 'partir', answers: ['partiram'], distractors: ['partiam', 'tinham partido', 'partirão'] },
  { title: 'Uma decisão recente', cue: 'uma decisão pontual concluída', segments: ['Hoje cedo, eu ', ' recusar a proposta.'], verb: 'decidir', answers: ['decidi'], distractors: ['decidia', 'tinha decidido', 'decidirei'] },
  { title: 'A xícara quebrada', cue: 'um resultado pontual terminado', segments: ['Ao arrumar a cozinha, vocês ', ' uma xícara.'], verb: 'quebrar', answers: ['quebraram'], distractors: ['quebravam', 'tinham quebrado', 'quebrarão'] },
  { title: 'A volta de Mateus', cue: 'um retorno concluído na segunda-feira', segments: ['Mateus ', ' da viagem na segunda à noite.'], verb: 'voltar', answers: ['voltou'], distractors: ['voltava', 'tinha voltado', 'voltará'] },
  { title: 'As chaves encontradas', cue: 'uma descoberta pontual concluída', segments: ['Finalmente, elas ', ' as chaves embaixo do sofá.'], verb: 'encontrar', answers: ['encontraram'], distractors: ['encontravam', 'tinham encontrado', 'encontrarão'] },
  { title: 'A subida ao abrigo', cue: 'um deslocamento concluído após o almoço', segments: ['Depois do almoço, Lia e Joana ', ' até o abrigo.'], verb: 'subir', answers: ['subiram'], distractors: ['subiam', 'tinham subido', 'subirão'] },
]

const long: PortugueseEditorialGapSeed[] = [
  { title: 'A entrega urgente', instruction: 'Complete este relato coerente no pretérito perfeito.', segments: ['Ontem cedo, Nora ', ' o pacote no depósito. Ela ', ' o recibo ao responsável e ', ' ao escritório antes do meio-dia.'], entries: [['levar', ['levou']], ['entregar', ['entregou']], ['voltar', ['voltou']]] },
  { title: 'Um sábado em Recife', instruction: 'Complete este relato de viagem.', segments: ['No sábado, nós ', ' o Recife Antigo. Depois, ', ' um barco pelo rio e ', ' ao hotel ao pôr do sol.'], entries: [['visitar', ['visitamos']], ['pegar', ['pegamos']], ['voltar', ['voltamos']]] },
  { title: 'O vazamento da cozinha', instruction: 'Complete este relato de um problema resolvido.', segments: ['Hoje cedo, um cano ', ' embaixo da pia. A zeladora ', ' a água e um encanador ', ' a peça à tarde.'], entries: [['estourar', ['estourou']], ['fechar', ['fechou']], ['trocar', ['trocou']]] },
  { title: 'O concurso do bairro', instruction: 'Complete esta sequência de eventos concluídos.', segments: ['No domingo, as participantes ', ' os bolos às nove. O júri ', ' cada receita sem ver os nomes e Clara ', ' o primeiro prêmio.'], entries: [['entregar', ['entregaram']], ['provar', ['provou']], ['receber', ['recebeu']]] },
  { title: 'O celular perdido', instruction: 'Complete esta pequena aventura concluída.', segments: ['Na saída do cinema, Hugo não ', ' o celular. Ele ', ' pelo mesmo caminho e uma funcionária o ', ' perto da bilheteria.'], entries: [['encontrar', ['encontrou']], ['voltar', ['voltou']], ['devolver', ['devolveu']]] },
  { title: 'A primeira exposição', instruction: 'Complete este balanço da semana.', segments: ['Nesta semana, a galeria ', ' doze artistas locais. Mais de mil pessoas ', ' as salas e três jornais ', ' matérias sobre o projeto.'], entries: [['receber', ['recebeu']], ['visitar', ['visitaram']], ['publicar', ['publicaram']]] },
  { title: 'A mudança da família Lima', instruction: 'Complete este dia de mudança.', segments: ['Na sexta-feira, os Lima ', ' todas as caixas no caminhão. Ao meio-dia, ', ' o apartamento antigo e ', ' à casa nova à noite.'], entries: [['colocar', ['colocaram']], ['deixar', ['deixaram']], ['chegar', ['chegaram']]] },
  { title: 'O jogo interrompido', instruction: 'Complete este relato esportivo.', segments: ['O árbitro ', ' o jogo por causa da tempestade. Os atletas ', ' ao vestiário e o clube ', ' uma nova data naquela noite.'], entries: [['parar', ['parou']], ['voltar', ['voltaram']], ['anunciar', ['anunciou']]] },
  { title: 'A reunião on-line', instruction: 'Complete esta sequência profissional.', segments: ['Nós ', ' a chamada às dez. A diretora ', ' as novas metas e cada pessoa ', ' suas perguntas no documento.'], entries: [['iniciar', ['iniciamos']], ['apresentar', ['apresentou']], ['escrever', ['escreveu']]] },
  { title: 'O resgate do cachorro', instruction: 'Complete este relato breve.', segments: ['O cachorro ', ' no canal atrás de uma bola. Duas pessoas ', ' os bombeiros e eles o ', ' poucos minutos depois.'], entries: [['cair', ['caiu']], ['chamar', ['chamaram']], ['retirar', ['retiraram']]] },
]

const errors: PortugueseEditorialErrorSeed[] = [
  { title: 'O pacote de Nora', pieces: [['Ontem, Nora ', 'levaram'], [' o pacote. Ela ', 'entregou'], [' o recibo e ', 'voltou']], after: ' ao escritório.', wrong: 0, answers: ['levou'], reason: 'O sujeito singular “Nora” exige “levou”.' },
  { title: 'O sábado em Recife', pieces: [['Nós ', 'visitamos'], [' o centro, ', 'pegou'], [' um barco e ', 'voltamos']], after: ' ao hotel.', wrong: 1, answers: ['pegamos'], reason: 'A sequência mantém o sujeito “nós”.' },
  { title: 'O vazamento resolvido', pieces: [['Um cano ', 'estourou'], [' embaixo da pia. A zeladora ', 'fechou'], [' a água e o encanador ', 'trocaram']], after: ' a peça.', wrong: 2, answers: ['trocou'], reason: 'O sujeito singular “o encanador” exige “trocou”.' },
  { title: 'O concurso de bolos', pieces: [['As participantes ', 'entregou'], [' os bolos. O júri ', 'provou'], [' as receitas e Clara ', 'recebeu']], after: ' o prêmio.', wrong: 0, answers: ['entregaram'], reason: 'O sujeito plural “as participantes” exige “entregaram”.' },
  { title: 'O celular recuperado', pieces: [['Hugo não ', 'encontrou'], [' o celular. Ele ', 'voltaram'], [' pelo caminho e uma funcionária o ', 'devolveu']], after: '.', wrong: 1, answers: ['voltou'], reason: 'O sujeito singular “ele” exige “voltou”.' },
  { title: 'A semana da galeria', pieces: [['A galeria ', 'recebeu'], [' os artistas. As pessoas ', 'visitaram'], [' as salas e três jornais ', 'publicou']], after: ' matérias.', wrong: 2, answers: ['publicaram'], reason: 'O sujeito plural “três jornais” exige “publicaram”.' },
  { title: 'A mudança de sexta', pieces: [['Os Lima ', 'colocou'], [' as caixas no caminhão, ', 'deixaram'], [' o apartamento e ', 'chegaram']], after: ' à casa nova.', wrong: 0, answers: ['colocaram'], reason: 'O sujeito plural “os Lima” exige “colocaram”.' },
  { title: 'A tempestade no estádio', pieces: [['O árbitro ', 'parou'], [' o jogo. Os atletas ', 'voltou'], [' ao vestiário e o clube ', 'anunciou']], after: ' outra data.', wrong: 1, answers: ['voltaram'], reason: 'O sujeito plural “os atletas” exige “voltaram”.' },
  { title: 'A videoconferência', pieces: [['Nós ', 'iniciamos'], [' a chamada. A diretora ', 'apresentou'], [' as metas e cada pessoa ', 'escreveram']], after: ' uma pergunta.', wrong: 2, answers: ['escreveu'], reason: 'O sujeito singular “cada pessoa” exige “escreveu”.' },
  { title: 'O cachorro no canal', pieces: [['O cachorro ', 'caíram'], [' no canal. Duas pessoas ', 'chamaram'], [' os bombeiros e eles o ', 'retiraram']], after: '.', wrong: 0, answers: ['caiu'], reason: 'O sujeito singular “o cachorro” exige “caiu”.' },
]

const sequences: PortugueseEditorialSequenceSeed[] = [
  { events: ['Nora levou o pacote', 'Ela entregou o recibo', 'Ela voltou ao escritório'], target: 0 },
  { events: ['Nós visitamos o Recife Antigo', 'Pegamos um barco', 'Voltamos ao hotel'], target: 1 },
  { events: ['O cano estourou', 'A zeladora fechou a água', 'O encanador trocou a peça'], target: 2 },
  { events: ['As participantes entregaram os bolos', 'O júri provou as receitas', 'Clara recebeu o prêmio'], target: 0 },
  { events: ['Hugo não encontrou o celular', 'Ele voltou pelo caminho', 'Uma funcionária o devolveu'], target: 1 },
  { events: ['A galeria recebeu os artistas', 'As pessoas visitaram as salas', 'Os jornais publicaram matérias'], target: 2 },
  { events: ['Os Lima colocaram as caixas no caminhão', 'Eles deixaram o apartamento', 'Eles chegaram à casa nova'], target: 0 },
  { events: ['O árbitro parou o jogo', 'Os atletas voltaram', 'O clube anunciou outra data'], target: 1 },
  { events: ['Nós iniciamos a chamada', 'A diretora apresentou as metas', 'Cada pessoa escreveu perguntas'], target: 2 },
  { events: ['O cachorro caiu no canal', 'Duas pessoas chamaram os bombeiros', 'Eles retiraram o animal'], target: 0 },
]

const final: PortugueseEditorialFinalSeed[] = [
  { before: 'Ontem à noite, Lia ', after: ' a porta antes de sair.', answer: 'fechou', distractors: ['fechava', 'tinha fechado', 'fechará'] },
  { before: 'No sábado passado, as duas irmãs ', after: ' a Brasília de ônibus.', answer: 'foram', distractors: ['iam', 'tinham ido', 'irão'] },
  { before: 'Hoje cedo, nós ', after: ' a confirmação por e-mail.', answer: 'recebemos', distractors: ['recebíamos', 'tínhamos recebido', 'receberemos'] },
  { before: 'Durante a pane, o sistema ', after: ' três vezes.', answer: 'reiniciou', distractors: ['reiniciava', 'tinha reiniciado', 'reiniciará'] },
  { before: 'No domingo, Paulo ', after: ' para casa antes do almoço.', answer: 'voltou', distractors: ['voltava', 'tinha voltado', 'voltará'] },
  { before: 'Nesta semana, vocês ', after: ' quatro contratos novos.', answer: 'assinaram', distractors: ['assinavam', 'tinham assinado', 'assinarão'] },
  { before: 'No fim do show, as musicistas ', after: ' ao palco para agradecer.', answer: 'voltaram', distractors: ['voltavam', 'tinham voltado', 'voltarão'] },
  { before: 'Ontem, o laboratório ', after: ' os resultados finais.', answer: 'publicou', distractors: ['publicava', 'tinha publicado', 'publicará'] },
  { before: 'Depois do jantar, tu ', after: ' toda a louça.', answer: 'guardaste', distractors: ['guardavas', 'tinhas guardado', 'guardarás'] },
  { before: 'Na segunda de manhã, as crianças ', after: ' cedo para a excursão.', answer: 'acordaram', distractors: ['acordavam', 'tinham acordado', 'acordarão'] },
]

export const PORTUGUESE_PRETERITE_PERFECT_EDITORIAL = createPortugueseEditorialPack({
  slug: 'preterito-perfeito',
  form: 'preterito-perfeito',
  focus: 'Pretérito perfeito',
  rule: 'O pretérito perfeito apresenta um evento concluído e delimitado no passado.',
  micro,
  long,
  errors,
  sequences,
  final,
})
