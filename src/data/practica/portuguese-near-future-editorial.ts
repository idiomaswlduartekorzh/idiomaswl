import {
  createPortugueseEditorialPack,
  type PortugueseEditorialErrorSeed,
  type PortugueseEditorialFinalSeed,
  type PortugueseEditorialGapSeed,
  type PortugueseEditorialMicroSeed,
  type PortugueseEditorialSequenceSeed,
} from './portuguese-editorial-builder.ts'

const micro: PortugueseEditorialMicroSeed[] = [
  { title: 'As nuvens escuras', cue: 'uma previsão imediata baseada em evidência', segments: ['Olhe essas nuvens: ', '.'], verb: 'chover', answers: ['vai chover'], distractors: ['chove', 'choverá', 'choveria'] },
  { title: 'As passagens compradas', cue: 'um plano já decidido', segments: ['Já compramos as passagens; ', ' na sexta de manhã.'], verb: 'viajar', answers: ['vamos viajar'], distractors: ['viajamos sempre', 'viajaremos', 'viajaríamos'] },
  { title: 'O copo na beirada', cue: 'um acontecimento iminente', segments: ['Cuidado, esse copo ', '!'], verb: 'cair', answers: ['vai cair'], distractors: ['cai', 'cairá', 'cairia'] },
  { title: 'A reunião confirmada', cue: 'uma intenção já organizada', segments: ['Confirmei o horário: ', ' a diretora às três.'], verb: 'encontrar', answers: ['vou encontrar'], distractors: ['encontro', 'encontrarei', 'encontraria'] },
  { title: 'A bateria vermelha', cue: 'uma consequência próxima visível', segments: ['A bateria está em 1%; o celular ', '.'], verb: 'desligar', answers: ['vai desligar'], distractors: ['desliga', 'desligará', 'desligaria'] },
  { title: 'O jantar planejado', cue: 'um plano coletivo preparado', segments: ['Compramos tudo; hoje à noite ', ' para dez pessoas.'], verb: 'cozinhar', answers: ['vamos cozinhar'], distractors: ['cozinhamos', 'cozinharemos', 'cozinharíamos'] },
  { title: 'A mala na porta', cue: 'uma partida próxima e decidida', segments: ['A mala está pronta: Lia ', ' para Brasília.'], verb: 'partir', answers: ['vai partir'], distractors: ['parte', 'partirá', 'partiria'] },
  { title: 'As ferramentas separadas', cue: 'uma ação imediata preparada', segments: ['As ferramentas estão na mesa; vocês ', ' a prateleira agora.'], verb: 'consertar', answers: ['vão consertar'], distractors: ['consertam', 'consertarão', 'consertariam'] },
  { title: 'O auditório reservado', cue: 'um evento próximo já organizado', segments: ['O auditório está reservado: eles ', ' o projeto amanhã.'], verb: 'apresentar', answers: ['vão apresentar'], distractors: ['apresentam', 'apresentarão', 'apresentariam'] },
  { title: 'O forno aquecido', cue: 'uma ação prestes a começar', segments: ['O forno já está quente; você ', ' o bolo.'], verb: 'assar', answers: ['vai assar'], distractors: ['assa', 'assará', 'assaria'] },
]

const long: PortugueseEditorialGapSeed[] = [
  { title: 'A saída para a trilha', instruction: 'Complete este plano imediato e coerente.', segments: ['As mochilas estão prontas. Nós ', ' de casa em cinco minutos, ', ' o ônibus das seis e ', ' a trilha antes das oito.'], entries: [['sair', ['vamos sair']], ['pegar', ['vamos pegar']], ['começar', ['vamos começar']]] },
  { title: 'A demonstração do robô', instruction: 'Complete este plano já organizado.', segments: ['O robô está ligado. A técnica ', ' o programa, ', ' os sensores e ', ' o primeiro teste diante do público.'], entries: [['iniciar', ['vai iniciar']], ['calibrar', ['vai calibrar']], ['fazer', ['vai fazer']]] },
  { title: 'A tempestade chegando', instruction: 'Complete estas consequências iminentes.', segments: ['O céu está escurecendo. O vento ', ', as primeiras gotas ', ' e os pedestres ', ' para a marquise.'], entries: [['aumentar', ['vai aumentar']], ['cair', ['vão cair']], ['correr', ['vão correr']]] },
  { title: 'O jantar de aniversário', instruction: 'Complete este programa preparado.', segments: ['Os convidados chegam logo. Mina ', ' a entrada, o irmão dela ', ' o prato principal e os amigos ', ' o bolo às nove.'], entries: [['servir', ['vai servir']], ['trazer', ['vai trazer']], ['cortar', ['vão cortar']]] },
  { title: 'A reunião de emergência', instruction: 'Complete estas ações já decididas.', segments: ['A direção convocou todos. Ela ', ' a situação, nós ', ' as opções e o comitê ', ' antes do meio-dia.'], entries: [['explicar', ['vai explicar']], ['avaliar', ['vamos avaliar']], ['votar', ['vai votar']]] },
  { title: 'A mudança de amanhã', instruction: 'Complete este plano próximo.', segments: ['O caminhão está reservado. Os vizinhos ', ' as caixas, eu ', ' os móveis e nós ', ' as chaves às seis.'], entries: [['carregar', ['vão carregar']], ['desmontar', ['vou desmontar']], ['entregar', ['vamos entregar']]] },
  { title: 'O conserto urgente', instruction: 'Complete esta intervenção iminente.', segments: ['A peça acabou de chegar. O mecânico ', ' o motor, a assistente ', ' a correia e eles ', ' a máquina antes do almoço.'], entries: [['abrir', ['vai abrir']], ['trocar', ['vai trocar']], ['testar', ['vão testar']]] },
  { title: 'A gravação desta tarde', instruction: 'Complete este programa já definido.', segments: ['As câmeras estão montadas. A atriz ', ' a primeira cena, o diretor ', ' as imagens e a equipe ', ' o próximo cenário.'], entries: [['gravar', ['vai gravar']], ['conferir', ['vai conferir']], ['preparar', ['vai preparar']]] },
  { title: 'O fechamento para reforma', instruction: 'Complete estas mudanças anunciadas.', segments: ['Os avisos já estão na porta. A loja ', ' na sexta, os operários ', ' as vitrines e a direção ', ' o espaço em junho.'], entries: [['fechar', ['vai fechar']], ['trocar', ['vão trocar']], ['reabrir', ['vai reabrir']]] },
  { title: 'A aula em instantes', instruction: 'Complete as ações prestes a começar.', segments: ['Os alunos estão sentados. A professora ', ' as instruções, nós ', ' o primeiro exercício e cada pessoa ', ' a resposta com um colega.'], entries: [['dar', ['vai dar']], ['começar', ['vamos começar']], ['comparar', ['vai comparar']]] },
]

const errors: PortugueseEditorialErrorSeed[] = [
  { title: 'A trilha em cinco minutos', pieces: [['Nós ', 'vai sair'], [' de casa, ', 'vamos pegar'], [' o ônibus e ', 'vamos começar']], after: ' a trilha.', wrong: 0, answers: ['vamos sair'], reason: 'O sujeito “nós” exige “vamos sair”.' },
  { title: 'O robô pronto', pieces: [['A técnica ', 'vai iniciar'], [' o programa, ', 'vai calibra'], [' os sensores e ', 'vai fazer']], after: ' o teste.', wrong: 1, answers: ['vai calibrar'], reason: 'Depois de “vai”, o verbo principal fica no infinitivo.' },
  { title: 'A tempestade visível', pieces: [['O vento ', 'vai aumentar'], [', as gotas ', 'vão cair'], [' e os pedestres ', 'vai correr']], after: ' para a marquise.', wrong: 2, answers: ['vão correr'], reason: 'O sujeito plural “os pedestres” exige “vão correr”.' },
  { title: 'O jantar preparado', pieces: [['Mina ', 'vão servir'], [' a entrada, o irmão ', 'vai trazer'], [' o prato e os amigos ', 'vão cortar']], after: ' o bolo.', wrong: 0, answers: ['vai servir'], reason: 'O sujeito singular “Mina” exige “vai servir”.' },
  { title: 'A reunião convocada', pieces: [['A direção ', 'vai explicar'], [' a situação, nós ', 'vai avaliar'], [' as opções e o comitê ', 'vai votar']], after: '.', wrong: 1, answers: ['vamos avaliar'], reason: 'O sujeito “nós” exige “vamos avaliar”.' },
  { title: 'A mudança planejada', pieces: [['Os vizinhos ', 'vão carregar'], [' as caixas, eu ', 'vou desmontar'], [' os móveis e nós ', 'vamos entregamos']], after: ' as chaves.', wrong: 2, answers: ['vamos entregar'], reason: 'Depois de “vamos”, o verbo principal fica no infinitivo.' },
  { title: 'A peça de reposição', pieces: [['O mecânico ', 'vão abrir'], [' o motor, a assistente ', 'vai trocar'], [' a correia e eles ', 'vão testar']], after: ' a máquina.', wrong: 0, answers: ['vai abrir'], reason: 'O sujeito singular “o mecânico” exige “vai abrir”.' },
  { title: 'A gravação marcada', pieces: [['A atriz ', 'vai gravar'], [' a cena, o diretor ', 'vão conferir'], [' as imagens e a equipe ', 'vai preparar']], after: ' o cenário.', wrong: 1, answers: ['vai conferir'], reason: 'O sujeito singular “o diretor” exige “vai conferir”.' },
  { title: 'A reforma anunciada', pieces: [['A loja ', 'vai fechar'], [' na sexta, os operários ', 'vão trocar'], [' as vitrines e a direção ', 'vão reabrir']], after: ' o espaço.', wrong: 2, answers: ['vai reabrir'], reason: 'O sujeito singular “a direção” exige “vai reabrir”.' },
  { title: 'A aula começa logo', pieces: [['A professora ', 'vai dar'], [' as instruções, nós ', 'vai começar'], [' e cada pessoa ', 'vai comparar']], after: ' a resposta.', wrong: 1, answers: ['vamos começar'], reason: 'O sujeito “nós” exige “vamos começar”.' },
]

const sequences: PortugueseEditorialSequenceSeed[] = [
  { events: ['Nós vamos sair de casa', 'Vamos pegar o ônibus', 'Vamos começar a trilha'], target: 0 },
  { events: ['A técnica vai iniciar o programa', 'Vai calibrar os sensores', 'Vai fazer o teste'], target: 1 },
  { events: ['O vento vai aumentar', 'As gotas vão cair', 'Os pedestres vão correr'], target: 2 },
  { events: ['Mina vai servir a entrada', 'O irmão vai trazer o prato', 'Os amigos vão cortar o bolo'], target: 0 },
  { events: ['A direção vai explicar a situação', 'Nós vamos avaliar as opções', 'O comitê vai votar'], target: 1 },
  { events: ['Os vizinhos vão carregar as caixas', 'Eu vou desmontar os móveis', 'Nós vamos entregar as chaves'], target: 2 },
  { events: ['O mecânico vai abrir o motor', 'A assistente vai trocar a correia', 'Eles vão testar a máquina'], target: 0 },
  { events: ['A atriz vai gravar a cena', 'O diretor vai conferir as imagens', 'A equipe vai preparar o cenário'], target: 1 },
  { events: ['A loja vai fechar', 'Os operários vão trocar as vitrines', 'A direção vai reabrir o espaço'], target: 2 },
  { events: ['A professora vai dar as instruções', 'Nós vamos começar o exercício', 'Cada pessoa vai comparar a resposta'], target: 0 },
]

const final: PortugueseEditorialFinalSeed[] = [
  { before: 'A mala está pronta: eu ', after: ' em alguns minutos.', answer: 'vou sair', distractors: ['saio', 'sairei', 'sairia'] },
  { before: 'Olhe a fumaça: o alarme ', after: '!', answer: 'vai tocar', distractors: ['toca', 'tocará', 'tocaria'] },
  { before: 'Reservamos o salão; ', after: ' a cerimônia amanhã.', answer: 'vamos organizar', distractors: ['organizamos sempre', 'organizaremos', 'organizaríamos'] },
  { before: 'Os jogadores já estão no campo: a partida ', after: '.', answer: 'vai começar', distractors: ['começa', 'começará', 'começaria'] },
  { before: 'A luz vermelha está piscando; as máquinas ', after: '.', answer: 'vão parar', distractors: ['param', 'pararão', 'parariam'] },
  { before: 'Você já escolheu as cores; ', after: ' a parede hoje à tarde.', answer: 'vai pintar', distractors: ['pinta', 'pintará', 'pintaria'] },
  { before: 'O contrato está assinado: ela ', after: ' na segunda-feira.', answer: 'vai começar', distractors: ['começa', 'começará', 'começaria'] },
  { before: 'As passagens estão impressas; vocês ', after: ' às oito.', answer: 'vão embarcar', distractors: ['embarcam', 'embarcarão', 'embarcariam'] },
  { before: 'O microfone está aberto: o prefeito ', after: ' os resultados.', answer: 'vai anunciar', distractors: ['anuncia', 'anunciará', 'anunciaria'] },
  { before: 'Já separei os ingredientes; ', after: ' a massa agora.', answer: 'vamos preparar', distractors: ['preparamos sempre', 'prepararemos', 'prepararíamos'] },
]

export const PORTUGUESE_NEAR_FUTURE_EDITORIAL = createPortugueseEditorialPack({
  slug: 'futuro-proximo',
  form: 'futuro-proximo',
  focus: 'Ir + infinitivo',
  rule: 'No português brasileiro, ir no presente + infinitivo é a forma corrente para plano decidido, ação iminente ou previsão baseada em evidência.',
  micro,
  long,
  errors,
  sequences,
  final,
})
