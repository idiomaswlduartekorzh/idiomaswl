import {
  createPortugueseEditorialPack,
  type PortugueseEditorialErrorSeed,
  type PortugueseEditorialFinalSeed,
  type PortugueseEditorialGapSeed,
  type PortugueseEditorialMicroSeed,
  type PortugueseEditorialSequenceSeed,
} from './portuguese-editorial-builder.ts'

const micro: PortugueseEditorialMicroSeed[] = [
  { title: 'Uma visita hipotética', cue: 'uma consequência hipotética atual', segments: ['Com mais tempo, eu ', ' Salvador também.'], verb: 'visitar', answers: ['visitaria'], distractors: ['visito', 'visitarei', 'teria visitado'] },
  { title: 'Um pedido educado', cue: 'um pedido atenuado', segments: ['Você ', ' fechar a janela, por favor?'], verb: 'poder', answers: ['poderia'], distractors: ['pode', 'poderá', 'teria podido'] },
  { title: 'O dia seguinte', cue: 'um futuro visto de um momento passado', segments: ['Ela disse ontem que ', ' no dia seguinte.'], verb: 'voltar', answers: ['voltaria'], distractors: ['volta', 'voltará', 'teria voltado'] },
  { title: 'A casa ideal', cue: 'um desejo atual', segments: ['Eu ', ' morar perto do mar.'], verb: 'gostar', answers: ['gostaria'], distractors: ['gosto', 'gostarei', 'teria gostado'] },
  { title: 'Uma equipe maior', cue: 'o resultado de uma condição irreal presente', segments: ['Se a equipe fosse maior, nós ', ' o projeto.'], verb: 'terminar', answers: ['terminaríamos'], distractors: ['terminamos', 'terminaremos', 'teríamos terminado'] },
  { title: 'A pergunta no balcão', cue: 'uma pergunta cortês', segments: ['O senhor ', ' informar a plataforma?'], verb: 'poder', answers: ['poderia'], distractors: ['pode', 'poderá', 'teria podido'] },
  { title: 'O apartamento imaginado', cue: 'uma escolha sob condição', segments: ['Com esse orçamento, eles ', ' um apartamento menor.'], verb: 'escolher', answers: ['escolheriam'], distractors: ['escolhem', 'escolherão', 'teriam escolhido'] },
  { title: 'Um conselho de trajeto', cue: 'uma recomendação atenuada', segments: ['Você ', ' pegar a linha 4 para evitar a obra.'], verb: 'dever', answers: ['deveria'], distractors: ['deve', 'deverá', 'teria devido'] },
  { title: 'A máquina sem a pane', cue: 'uma capacidade atual sob condição', segments: ['Sem essa pane, a máquina ainda ', '.'], verb: 'funcionar', answers: ['funcionaria'], distractors: ['funciona', 'funcionará', 'teria funcionado'] },
  { title: 'O plano anunciado ontem', cue: 'um futuro em relação a uma fala passada', segments: ['Ontem, o diretor afirmou que a obra ', ' em junho.'], verb: 'começar', answers: ['começaria'], distractors: ['começa', 'começará', 'teria começado'] },
]

const long: PortugueseEditorialGapSeed[] = [
  { title: 'O café ideal', instruction: 'Complete este projeto hipotético no futuro do pretérito.', segments: ['Com um espaço maior, Bia ', ' dez mesas. Ela ', ' um canto de leitura e os clientes ', ' mais tempo.'], entries: [['colocar', ['colocaria']], ['criar', ['criaria']], ['ficar', ['ficariam']]] },
  { title: 'Um pedido no hotel', instruction: 'Complete estes pedidos educados.', segments: ['Nós ', ' de um quarto silencioso. Vocês ', ' uma cama extra e nós ', ' de saber o horário do café.'], entries: [['gostar', ['gostaríamos']], ['providenciar', ['providenciariam']], ['gostar', ['gostaríamos']]] },
  { title: 'O conselho de carreira', instruction: 'Complete estas recomendações hipotéticas.', segments: ['No seu lugar, eu ', ' a vaga. Também ', ' treinamento antes de começar e ', ' um horário claro.'], entries: [['aceitar', ['aceitaria']], ['pedir', ['pediria']], ['negociar', ['negociaria']]] },
  { title: 'Uma cidade sem carros', instruction: 'Complete as consequências desta hipótese.', segments: ['Sem carros no centro, o ar ', ' mais limpo. As crianças ', ' mais na rua e as lojas ', ' mais calçadas livres.'], entries: [['ficar', ['ficaria']], ['brincar', ['brincariam']], ['ter', ['teriam']]] },
  { title: 'A viagem dos sonhos', instruction: 'Complete este plano hipotético.', segments: ['Com três semanas livres, nós ', ' o Nordeste. ', ' alguns dias na Bahia e ', ' até o Maranhão.'], entries: [['percorrer', ['percorreríamos']], ['passar', ['passaríamos']], ['seguir', ['seguiríamos']]] },
  { title: 'Uma turma menor', instruction: 'Complete as consequências desta hipótese.', segments: ['Com quinze alunos, a professora ', ' mais tempo a cada um. Nós ', ' mais e os projetos ', ' mais ambiciosos.'], entries: [['dedicar', ['dedicaria']], ['participar', ['participaríamos']], ['ficar', ['ficariam']]] },
  { title: 'O plano informado ontem', instruction: 'Complete o futuro visto de uma reunião passada.', segments: ['Na reunião de ontem, a gerente disse que ', ' o setor. A equipe ', ' treinamento e os novos horários ', ' em maio.'], entries: [['reorganizar', ['reorganizaria']], ['receber', ['receberia']], ['começar', ['começariam']]] },
  { title: 'A rede alternativa', instruction: 'Complete estas possibilidades sob condição.', segments: ['Sem a conexão principal, nós ', ' a rede móvel. O servidor ', ' em modo reduzido e os clientes ', ' os arquivos essenciais.'], entries: [['usar', ['usaríamos']], ['funcionar', ['funcionaria']], ['manter', ['manteriam']]] },
  { title: 'O conselho ao viajante', instruction: 'Complete estas recomendações atenuadas.', segments: ['No seu lugar, eu ', ' cedo. Vocês ', ' as passagens no celular e ', ' uma bateria externa.'], entries: [['sair', ['sairia']], ['salvar', ['salvariam']], ['levar', ['levariam']]] },
  { title: 'A previsão feita na segunda', instruction: 'Complete o futuro relatado a partir do passado.', segments: ['Na segunda, os analistas disseram que a inflação ', '. Os juros ', ' estáveis e o consumo ', ' devagar.'], entries: [['cair', ['cairia']], ['ficar', ['ficariam']], ['crescer', ['cresceria']]] },
]

const errors: PortugueseEditorialErrorSeed[] = [
  { title: 'O café imaginado', pieces: [['Bia ', 'colocariam'], [' mais mesas. Ela ', 'criaria'], [' um canto e os clientes ', 'ficariam']], after: ' mais tempo.', wrong: 0, answers: ['colocaria'], reason: 'O sujeito singular “Bia” exige “colocaria”.' },
  { title: 'Os pedidos no hotel', pieces: [['Nós ', 'gostaríamos'], [' de um quarto. Vocês ', 'providenciaria'], [' uma cama e nós ', 'gostaríamos']], after: ' do horário.', wrong: 1, answers: ['providenciariam'], reason: 'O sujeito “vocês” exige “providenciariam”.' },
  { title: 'O conselho profissional', pieces: [['Eu ', 'aceitaria'], [' a vaga, ', 'pediria'], [' treinamento e ', 'negociariam']], after: ' o horário.', wrong: 2, answers: ['negociaria'], reason: 'A sequência mantém o sujeito “eu”.' },
  { title: 'A cidade imaginada', pieces: [['O ar ', 'ficariam'], [' mais limpo. As crianças ', 'brincariam'], [' e as lojas ', 'teriam']], after: ' mais espaço.', wrong: 0, answers: ['ficaria'], reason: 'O sujeito singular “o ar” exige “ficaria”.' },
  { title: 'A viagem hipotética', pieces: [['Nós ', 'percorreríamos'], [' o Nordeste, ', 'passaria'], [' pela Bahia e ', 'seguiríamos']], after: ' ao Maranhão.', wrong: 1, answers: ['passaríamos'], reason: 'A sequência mantém o sujeito “nós”.' },
  { title: 'A turma menor', pieces: [['A professora ', 'dedicaria'], [' mais tempo. Nós ', 'participaríamos'], [' e os projetos ', 'ficaria']], after: ' melhores.', wrong: 2, answers: ['ficariam'], reason: 'O sujeito plural “os projetos” exige “ficariam”.' },
  { title: 'O plano contado ontem', pieces: [['A gerente ', 'reorganizariam'], [' o setor. A equipe ', 'receberia'], [' treinamento e os horários ', 'começariam']], after: ' em maio.', wrong: 0, answers: ['reorganizaria'], reason: 'O sujeito singular “a gerente” exige “reorganizaria”.' },
  { title: 'A rede de apoio', pieces: [['Nós ', 'usaríamos'], [' a rede móvel. O servidor ', 'funcionariam'], [' em modo reduzido e os clientes ', 'manteriam']], after: ' os arquivos.', wrong: 1, answers: ['funcionaria'], reason: 'O sujeito singular “o servidor” exige “funcionaria”.' },
  { title: 'O conselho de viagem', pieces: [['Eu ', 'sairia'], [' cedo. Vocês ', 'salvariam'], [' as passagens e ', 'levaria']], after: ' uma bateria.', wrong: 2, answers: ['levariam'], reason: 'O sujeito “vocês” continua expresso.' },
  { title: 'A previsão de segunda', pieces: [['A inflação ', 'cairia'], ['; os juros ', 'ficariam'], [' estáveis e o consumo ', 'cresceriam']], after: ' devagar.', wrong: 2, answers: ['cresceria'], reason: 'O sujeito singular “o consumo” exige “cresceria”.' },
]

const sequences: PortugueseEditorialSequenceSeed[] = [
  { events: ['Bia colocaria mais mesas', 'Criaria um canto de leitura', 'Os clientes ficariam mais tempo'], target: 0 },
  { events: ['Nós gostaríamos de um quarto', 'Vocês providenciariam uma cama', 'Nós perguntaríamos o horário'], target: 1 },
  { events: ['Eu aceitaria a vaga', 'Pediria treinamento', 'Negociaria o horário'], target: 2 },
  { events: ['O ar ficaria mais limpo', 'As crianças brincariam na rua', 'As lojas teriam mais espaço'], target: 0 },
  { events: ['Nós percorreríamos o Nordeste', 'Passaríamos pela Bahia', 'Seguiríamos ao Maranhão'], target: 1 },
  { events: ['A professora dedicaria mais tempo', 'Nós participaríamos mais', 'Os projetos ficariam melhores'], target: 2 },
  { events: ['A gerente reorganizaria o setor', 'A equipe receberia treinamento', 'Os horários começariam em maio'], target: 0 },
  { events: ['Nós usaríamos a rede móvel', 'O servidor funcionaria em modo reduzido', 'Os clientes manteriam os arquivos'], target: 1 },
  { events: ['Eu sairia cedo', 'Vocês salvariam as passagens', 'Levariam uma bateria'], target: 2 },
  { events: ['A inflação cairia', 'Os juros ficariam estáveis', 'O consumo cresceria devagar'], target: 0 },
]

const final: PortugueseEditorialFinalSeed[] = [
  { before: 'Com um escritório silencioso, eu ', after: ' melhor.', answer: 'trabalharia', distractors: ['trabalho', 'trabalharei', 'teria trabalhado'] },
  { before: 'O senhor ', after: ' repetir a pergunta, por favor?', answer: 'poderia', distractors: ['pode', 'poderá', 'teria podido'] },
  { before: 'No seu lugar, ela ', after: ' as duas propostas.', answer: 'compararia', distractors: ['compara', 'comparará', 'teria comparado'] },
  { before: 'Se tivéssemos um quintal, ', after: ' tomates.', answer: 'plantaríamos', distractors: ['plantamos', 'plantaremos', 'teríamos plantado'] },
  { before: 'Sem esse barulho, as crianças ', after: ' agora.', answer: 'dormiriam', distractors: ['dormem', 'dormirão', 'teriam dormido'] },
  { before: 'Eu ', after: ' de fazer mais uma pergunta.', answer: 'gostaria', distractors: ['gosto', 'gostarei', 'teria gostado'] },
  { before: 'Ontem, ela disse que o modelo ', after: ' mais preciso com novos dados.', answer: 'ficaria', distractors: ['fica', 'ficará', 'teria ficado'] },
  { before: 'Você ', after: ' consultar um especialista.', answer: 'deveria', distractors: ['deve', 'deverá', 'teria devido'] },
  { before: 'Se o trem saísse mais tarde, eles ', after: ' após o show.', answer: 'ficariam', distractors: ['ficam', 'ficarão', 'teriam ficado'] },
  { before: 'Na reunião passada, o diretor disse que nós ', after: ' na segunda.', answer: 'começaríamos', distractors: ['começamos', 'começaremos', 'teríamos começado'] },
]

export const PORTUGUESE_FUTURE_IN_PAST_EDITORIAL = createPortugueseEditorialPack({
  slug: 'futuro-preterito',
  form: 'futuro-preterito',
  focus: 'Futuro do pretérito',
  rule: 'O futuro do pretérito expressa consequência hipotética, pedido atenuado ou futuro visto de um ponto passado explicitamente marcado.',
  micro,
  long,
  errors,
  sequences,
  final,
})
