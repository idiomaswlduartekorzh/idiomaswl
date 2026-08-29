import {
  createPortugueseEditorialPack,
  type PortugueseEditorialErrorSeed,
  type PortugueseEditorialFinalSeed,
  type PortugueseEditorialGapSeed,
  type PortugueseEditorialMicroSeed,
  type PortugueseEditorialSequenceSeed,
} from './portuguese-editorial-builder.ts'

const micro: PortugueseEditorialMicroSeed[] = [
  { title: 'A carta não enviada', cue: 'um resultado passado que não aconteceu', segments: ['Com seu endereço, eu ', ' a carta ontem, mas não o tinha.'], verb: 'enviar', answers: ['teria enviado'], distractors: ['enviei', 'enviava', 'enviaria'] },
  { title: 'A chegada impedida', cue: 'uma alternativa irreal no passado', segments: ['Sem o trânsito, eles ', ' cedo, mas ficaram presos na estrada.'], verb: 'chegar', answers: ['teriam chegado'], distractors: ['chegaram', 'chegavam', 'chegariam'] },
  { title: 'O erro evitável', cue: 'uma consequência contrafactual passada', segments: ['Nós ', ' o erro se tivéssemos revisado os dados.'], verb: 'evitar', answers: ['teríamos evitado'], distractors: ['evitamos', 'evitávamos', 'evitaríamos'] },
  { title: 'O ônibus perdido', cue: 'um resultado passado contrário aos fatos', segments: ['Se você tivesse saído cedo, ', ' o ônibus, mas chegou depois.'], verb: 'pegar', answers: ['teria pegado'], distractors: ['pegou', 'pegava', 'pegaria'] },
  { title: 'A trilha interrompida', cue: 'um plano passado impossível', segments: ['Com tempo bom, nós ', ' até o topo, mas a tempestade nos parou.'], verb: 'subir', answers: ['teríamos subido'], distractors: ['subimos', 'subíamos', 'subiríamos'] },
  { title: 'O relatório incompleto', cue: 'um resultado não concluído no passado', segments: ['Com os dados, ela ', ' o relatório ontem, mas ninguém os enviou.'], verb: 'terminar', answers: ['teria terminado'], distractors: ['terminou', 'terminava', 'terminaria'] },
  { title: 'A saída evitada', cue: 'uma consequência passada que não ocorreu', segments: ['Sem o alarme, as crianças ', ' sozinhas, mas a porteira as segurou.'], verb: 'sair', answers: ['teriam saído'], distractors: ['saíram', 'saíam', 'sairiam'] },
  { title: 'A revisão que faltou', cue: 'um reproche sobre um passado não realizado', segments: ['Com uma revisão, vocês ', ' a falha, mas o texto foi enviado sem controle.'], verb: 'corrigir', answers: ['teriam corrigido'], distractors: ['corrigiram', 'corrigiam', 'corrigiriam'] },
  { title: 'A reserva inexistente', cue: 'um resultado passado condicionado', segments: ['Se eu soubesse da lotação, ', ' uma mesa, mas cheguei sem reserva.'], verb: 'reservar', answers: ['teria reservado'], distractors: ['reservei', 'reservava', 'reservaria'] },
  { title: 'A compra recusada', cue: 'uma consequência passada impossível', segments: ['Com crédito aprovado, eles ', ' a casa, mas o banco recusou o pedido.'], verb: 'comprar', answers: ['teriam comprado'], distractors: ['compraram', 'compravam', 'comprariam'] },
]

const long: PortugueseEditorialGapSeed[] = [
  { title: 'A viagem impedida', instruction: 'Complete as consequências passadas que não ocorreram.', segments: ['Sem a greve, nós ', ' na sexta. Lia ', ' o trem do meio-dia e os amigos a ', ' na estação, mas nenhum trem circulou.'], entries: [['partir', ['teríamos partido']], ['pegar', ['teria pegado']], ['esperar', ['teriam esperado']]] },
  { title: 'O projeto sem verba', instruction: 'Complete este balanço contrafactual.', segments: ['Com a verba pedida, a associação ', ' o espaço. Ela ', ' três pessoas e cinquenta famílias ', ' o serviço, mas o apoio foi negado.'], entries: [['reformar', ['teria reformado']], ['contratar', ['teria contratado']], ['usar', ['teriam usado']]] },
  { title: 'A corrida sob chuva', instruction: 'Complete estes resultados passados irreais.', segments: ['Sem a tempestade, as atletas ', ' a prova. Nora ', ' o recorde e a equipe ', ' o troféu, mas a corrida foi cancelada.'], entries: [['terminar', ['teriam terminado']], ['bater', ['teria batido']], ['ganhar', ['teria ganhado']]] },
  { title: 'O jantar perdido', instruction: 'Complete esta versão alternativa do passado.', segments: ['Com sua mensagem, eu ', ' mais cedo. Nós ', ' uma mesa e vocês nos ', ' no restaurante, mas a mensagem não chegou.'], entries: [['chegar', ['teria chegado']], ['reservar', ['teríamos reservado']], ['encontrar', ['teriam encontrado']]] },
  { title: 'A pane evitável', instruction: 'Complete as consequências não realizadas.', segments: ['Com uma inspeção na segunda, o técnico ', ' o cabo. Ele o ', ' antes da ruptura e a fábrica ', ' sem interrupção, mas a inspeção foi adiada.'], entries: [['identificar', ['teria identificado']], ['trocar', ['teria trocado']], ['funcionar', ['teria funcionado']]] },
  { title: 'O resgate impossível', instruction: 'Complete esta hipótese sobre o passado.', segments: ['Com um barco mais rápido, os bombeiros ', ' antes da noite. Eles ', ' toda a área e os pescadores ', ' ao porto, mas o mar estava fechado.'], entries: [['chegar', ['teriam chegado']], ['examinar', ['teriam examinado']], ['voltar', ['teriam voltado']]] },
  { title: 'A casa não comprada', instruction: 'Complete este passado alternativo.', segments: ['Com juros menores, nós ', ' a casa. ', ' o telhado e as crianças ', ' naquele bairro, mas o banco negou o crédito.'], entries: [['comprar', ['teríamos comprado']], ['reformar', ['teríamos reformado']], ['crescer', ['teriam crescido']]] },
  { title: 'O show cancelado', instruction: 'Complete os eventos que poderiam ter ocorrido.', segments: ['Sem a queda de energia, a cortina ', ' às oito. Os atores ', ' a peça e o público ', ' até o fim, mas o teatro ficou fechado.'], entries: [['subir', ['teria subido']], ['apresentar', ['teriam apresentado']], ['ficar', ['teria ficado']]] },
  { title: 'O prazo perdido', instruction: 'Complete as ações que não foram realizadas.', segments: ['Com mais dois dias, a equipe ', ' o protótipo. Os técnicos o ', ' e a diretora ', ' o relatório, mas o prazo acabou.'], entries: [['terminar', ['teria terminado']], ['testar', ['teriam testado']], ['entregar', ['teria entregado', 'teria entregue']]] },
  { title: 'A mudança frustrada', instruction: 'Complete este cenário passado irreal.', segments: ['Se o caminhão tivesse chegado, os vizinhos ', ' as caixas. Eu ', ' os móveis e nós ', ' as chaves, mas a mudança foi cancelada.'], entries: [['carregar', ['teriam carregado']], ['desmontar', ['teria desmontado']], ['devolver', ['teríamos devolvido']]] },
]

const errors: PortugueseEditorialErrorSeed[] = [
  { title: 'A viagem que não ocorreu', pieces: [['Sem a greve, nós ', 'teria partido'], [' na sexta. Lia ', 'teria pegado'], [' o trem e os amigos a ', 'teriam esperado']], after: '.', wrong: 0, answers: ['teríamos partido'], reason: 'O sujeito “nós” exige “teríamos partido”.' },
  { title: 'O projeto recusado', pieces: [['A associação ', 'teria reformado'], [' o espaço e ', 'teriam contratado'], [' pessoas; as famílias ', 'teriam usado']], after: ' o serviço.', wrong: 1, answers: ['teria contratado'], reason: 'O sujeito singular “a associação” continua expresso.' },
  { title: 'A corrida cancelada', pieces: [['As atletas ', 'teriam terminado'], [' a prova. Nora ', 'teria batido'], [' o recorde e a equipe ', 'teriam ganhado']], after: ' o troféu.', wrong: 2, answers: ['teria ganhado'], reason: 'O nome coletivo singular “a equipe” exige “teria ganhado”.' },
  { title: 'A mensagem não recebida', pieces: [['Eu ', 'teriam chegado'], [' cedo. Nós ', 'teríamos reservado'], [' uma mesa e vocês nos ', 'teriam encontrado']], after: '.', wrong: 0, answers: ['teria chegado'], reason: 'O sujeito “eu” exige “teria chegado”.' },
  { title: 'A inspeção adiada', pieces: [['O técnico ', 'teria identificado'], [' o cabo e o ', 'teriam trocado'], ['; a fábrica ', 'teria funcionado']], after: '.', wrong: 1, answers: ['teria trocado'], reason: 'O sujeito singular “o técnico” continua expresso.' },
  { title: 'O mar fechado', pieces: [['Os bombeiros ', 'teriam chegado'], [' cedo, ', 'teriam examinado'], [' a área e os pescadores ', 'teria voltado']], after: '.', wrong: 2, answers: ['teriam voltado'], reason: 'O sujeito plural “os pescadores” exige “teriam voltado”.' },
  { title: 'A casa sem crédito', pieces: [['Nós ', 'teria comprado'], [' a casa, ', 'teríamos reformado'], [' o telhado e as crianças ', 'teriam crescido']], after: ' ali.', wrong: 0, answers: ['teríamos comprado'], reason: 'O sujeito “nós” exige “teríamos comprado”.' },
  { title: 'O teatro fechado', pieces: [['A cortina ', 'teria subido'], [' às oito. Os atores ', 'teria apresentado'], [' a peça e o público ', 'teria ficado']], after: '.', wrong: 1, answers: ['teriam apresentado'], reason: 'O sujeito plural “os atores” exige “teriam apresentado”.' },
  { title: 'O prazo curto', pieces: [['A equipe ', 'teria terminado'], [' o protótipo. Os técnicos o ', 'teriam testado'], [' e a diretora ', 'teriam entregue']], after: ' o relatório.', wrong: 2, answers: ['teria entregado', 'teria entregue'], reason: 'O sujeito singular “a diretora” exige “teria”.' },
  { title: 'A mudança cancelada', pieces: [['Os vizinhos ', 'teriam carregado'], [' as caixas. Eu ', 'teria desmontado'], [' os móveis e nós ', 'teria devolvido']], after: ' as chaves.', wrong: 2, answers: ['teríamos devolvido'], reason: 'O sujeito “nós” exige “teríamos devolvido”.' },
]

const sequences: PortugueseEditorialSequenceSeed[] = [
  { events: ['Nós teríamos partido na sexta', 'Lia teria pegado o trem', 'Os amigos a teriam esperado'], target: 0 },
  { events: ['A associação teria reformado o espaço', 'Teria contratado três pessoas', 'As famílias teriam usado o serviço'], target: 1 },
  { events: ['As atletas teriam terminado', 'Nora teria batido o recorde', 'A equipe teria ganhado'], target: 2 },
  { events: ['Eu teria chegado cedo', 'Nós teríamos reservado uma mesa', 'Vocês nos teriam encontrado'], target: 0 },
  { events: ['O técnico teria identificado o cabo', 'Teria trocado a peça', 'A fábrica teria funcionado'], target: 1 },
  { events: ['Os bombeiros teriam chegado', 'Teriam examinado a área', 'Os pescadores teriam voltado'], target: 2 },
  { events: ['Nós teríamos comprado a casa', 'Teríamos reformado o telhado', 'As crianças teriam crescido ali'], target: 0 },
  { events: ['A cortina teria subido', 'Os atores teriam apresentado a peça', 'O público teria ficado'], target: 1 },
  { events: ['A equipe teria terminado o protótipo', 'Os técnicos o teriam testado', 'A diretora teria entregue o relatório'], target: 2 },
  { events: ['Os vizinhos teriam carregado as caixas', 'Eu teria desmontado os móveis', 'Nós teríamos devolvido as chaves'], target: 0 },
]

const final: PortugueseEditorialFinalSeed[] = [
  { before: 'Com o código certo, eu ', after: ' o arquivo ontem.', answer: 'teria aberto', distractors: ['abri', 'abria', 'abriria'] },
  { before: 'Sem a neblina, os aviões ', after: ' no horário, mas a pista fechou.', answer: 'teriam saído', distractors: ['saíram', 'saíam', 'sairiam'] },
  { before: 'Se tivéssemos reservado, ', after: ' perto do palco.', answer: 'teríamos jantado', distractors: ['jantamos', 'jantávamos', 'jantaríamos'] },
  { before: 'Com sua ajuda, ela ', after: ' antes da meia-noite.', answer: 'teria voltado', distractors: ['voltou', 'voltava', 'voltaria'] },
  { before: 'Sem esse erro, você ', after: ' no concurso.', answer: 'teria passado', distractors: ['passou', 'passava', 'passaria'] },
  { before: 'Com ingresso válido, vocês ', after: ' na sala, mas o acesso foi negado.', answer: 'teriam entrado', distractors: ['entraram', 'entravam', 'entrariam'] },
  { before: 'Se o servidor tivesse respondido, nós ', after: ' o pedido ontem.', answer: 'teríamos confirmado', distractors: ['confirmamos', 'confirmávamos', 'confirmaríamos'] },
  { before: 'Com mais combustível, o barco ', after: ' ao porto naquela noite.', answer: 'teria chegado', distractors: ['chegou', 'chegava', 'chegaria'] },
  { before: 'Se a loja tivesse aberto, eles ', after: ' o equipamento.', answer: 'teriam comprado', distractors: ['compraram', 'compravam', 'comprariam'] },
  { before: 'Com a revisão final, eu ', after: ' a falha antes da publicação.', answer: 'teria corrigido', distractors: ['corrigi', 'corrigia', 'corrigiria'] },
]

export const PORTUGUESE_PAST_CONDITIONAL_EDITORIAL = createPortugueseEditorialPack({
  slug: 'condicional-passado',
  form: 'condicional-passado',
  focus: 'Condicional passado',
  rule: 'Ter no futuro do pretérito + particípio expressa uma consequência passada não realizada e exige que a condição ou o resultado real estejam visíveis.',
  micro,
  long,
  errors,
  sequences,
  final,
})
