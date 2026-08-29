import {
  createPortugueseEditorialPack,
  type PortugueseEditorialErrorSeed,
  type PortugueseEditorialFinalSeed,
  type PortugueseEditorialGapSeed,
  type PortugueseEditorialMicroSeed,
  type PortugueseEditorialSequenceSeed,
} from './portuguese-editorial-builder.ts'

const micro: PortugueseEditorialMicroSeed[] = [
  { title: 'As férias da infância', cue: 'um hábito no passado', segments: ['Quando eu era criança, ', ' as férias na casa dos meus avós.'], verb: 'passar', answers: ['passava'], distractors: ['passei', 'tinha passado', 'passarei'] },
  { title: 'A rua sob a chuva', cue: 'uma descrição de fundo no passado', segments: ['A chuva ', ' forte e as ruas estavam quase vazias.'], verb: 'cair', answers: ['caía'], distractors: ['caiu', 'tinha caído', 'cairá'] },
  { title: 'A ligação de Paulo', cue: 'uma ação em curso interrompida', segments: ['Às nove, nós ainda ', ' quando Paulo ligou.'], verb: 'trabalhar', answers: ['trabalhávamos'], distractors: ['trabalhamos', 'tínhamos trabalhado', 'trabalharemos'] },
  { title: 'O apartamento antigo', cue: 'uma característica passada', segments: ['Nosso apartamento antigo ', ' para um pátio silencioso.'], verb: 'dar', answers: ['dava'], distractors: ['deu', 'tinha dado', 'dará'] },
  { title: 'O café de quinta', cue: 'uma ação repetida no passado', segments: ['Toda quinta-feira, elas ', ' café depois da aula.'], verb: 'tomar', answers: ['tomavam'], distractors: ['tomaram', 'tinham tomado', 'tomarão'] },
  { title: 'Uma crença antiga', cue: 'um estado mental passado', segments: ['Naquela época, você ', ' que a loja fechava às oito.'], verb: 'achar', answers: ['achava'], distractors: ['achou', 'tinha achado', 'achará'] },
  { title: 'O gerador à meia-noite', cue: 'uma situação em andamento num momento passado', segments: ['À meia-noite, o gerador ainda ', ' normalmente.'], verb: 'funcionar', answers: ['funcionava'], distractors: ['funcionou', 'tinha funcionado', 'funcionará'] },
  { title: 'O trajeto antes do trabalho remoto', cue: 'uma rotina coletiva passada', segments: ['Antes do trabalho remoto, vocês ', ' o trem toda manhã.'], verb: 'pegar', answers: ['pegavam'], distractors: ['pegaram', 'tinham pegado', 'pegarão'] },
  { title: 'O cachorro e o carteiro', cue: 'um comportamento repetido no passado', segments: ['Sempre que o carteiro chegava, o cachorro ', '.'], verb: 'latir', answers: ['latia'], distractors: ['latiu', 'tinha latido', 'latirá'] },
  { title: 'O palco antes do show', cue: 'um cenário visual passado', segments: ['Antes da abertura das portas, luzes azuis ', ' o palco.'], verb: 'iluminar', answers: ['iluminavam'], distractors: ['iluminaram', 'tinham iluminado', 'iluminarão'] },
]

const long: PortugueseEditorialGapSeed[] = [
  { title: 'Os verões no interior', instruction: 'Complete esta lembrança coerente no imperfeito.', segments: ['Todo verão, nós ', ' na casa da nossa tia. De manhã, ela ', ' pão na feira e nós ', ' perto do rio até o almoço.'], entries: [['ficar', ['ficávamos']], ['comprar', ['comprava']], ['brincar', ['brincávamos']]] },
  { title: 'A noite da tempestade', instruction: 'Complete este cenário no passado.', segments: ['O vento ', ' contra as janelas. A chuva ', ' sem parar e os cachorros do bairro ', ' a cada trovão.'], entries: [['bater', ['batia']], ['cair', ['caía']], ['latir', ['latiam']]] },
  { title: 'A biblioteca antiga', instruction: 'Complete esta descrição passada.', segments: ['A biblioteca ', ' no fundo de um pátio. Duas janelas grandes ', ' a sala e o cheiro de madeira ', ' os visitantes na entrada.'], entries: [['ficar', ['ficava']], ['iluminar', ['iluminavam']], ['receber', ['recebia']]] },
  { title: 'O trajeto antes do metrô', instruction: 'Complete esta rotina antiga.', segments: ['Antes da linha nova, Caio ', ' dois ônibus. Ele ', ' quase uma hora e os colegas o ', ' perto da copa.'], entries: [['pegar', ['pegava']], ['demorar', ['demorava']], ['esperar', ['esperavam']]] },
  { title: 'O jantar interrompido', instruction: 'Complete as ações em andamento quando o telefone tocou.', segments: ['Minha mãe ', ' a sopa. Meu pai ', ' a mesa e nós ', ' sobre o fim de semana quando o telefone tocou.'], entries: [['servir', ['servia']], ['arrumar', ['arrumava']], ['conversar', ['conversávamos']]] },
  { title: 'O primeiro emprego de Clara', instruction: 'Complete esta antiga rotina profissional.', segments: ['No primeiro emprego, Clara ', ' o escritório às oito. Ela ', ' as mensagens e a equipe ', ' as prioridades do dia.'], entries: [['abrir', ['abria']], ['organizar', ['organizava']], ['discutir', ['discutia']]] },
  { title: 'A praça antigamente', instruction: 'Complete esta lembrança do bairro.', segments: ['Antigamente, uma feira ', ' toda a praça. Os vendedores ', ' os preços em voz alta e os moradores ', ' muito tempo nas barracas.'], entries: [['ocupar', ['ocupava']], ['anunciar', ['anunciavam']], ['ficar', ['ficavam']]] },
  { title: 'Durante o ensaio', instruction: 'Complete esta cena em andamento no passado.', segments: ['O maestro ', ' os violinos. Os cantores ', ' o refrão e a pianista ', ' as anotações quando o alarme tocou.'], entries: [['escutar', ['escutava']], ['repetir', ['repetiam']], ['reler', ['relia']]] },
  { title: 'Os domingos chuvosos', instruction: 'Complete este costume familiar passado.', segments: ['Quando chovia, meu avô ', ' a lareira. Minha irmã ', ' perto da janela e eu ', ' o café.'], entries: [['acender', ['acendia']], ['ler', ['lia']], ['preparar', ['preparava']]] },
  { title: 'A rodoviária ao amanhecer', instruction: 'Complete este quadro descritivo.', segments: ['Às cinco, a rodoviária ', ' quase vazia. Um funcionário ', ' a plataforma e alguns passageiros ', ' nos bancos.'], entries: [['estar', ['estava']], ['varrer', ['varria']], ['dormir', ['dormiam']]] },
]

const errors: PortugueseEditorialErrorSeed[] = [
  { title: 'As férias no interior', pieces: [['Todo verão, nós ', 'ficava'], [' na casa da tia. Ela ', 'comprava'], [' pão e nós ', 'brincávamos']], after: ' perto do rio.', wrong: 0, answers: ['ficávamos'], reason: 'O sujeito “nós” exige “ficávamos”.' },
  { title: 'A noite de vento', pieces: [['O vento ', 'batia'], [' nas janelas. A chuva ', 'caíam'], [' e os cachorros ', 'latiam']], after: '.', wrong: 1, answers: ['caía'], reason: 'O sujeito singular “a chuva” exige “caía”.' },
  { title: 'A antiga sala de leitura', pieces: [['A biblioteca ', 'ficava'], [' num pátio. As janelas ', 'iluminavam'], [' a sala e a madeira ', 'recebiam']], after: ' os visitantes.', wrong: 2, answers: ['recebia'], reason: 'O sujeito singular “a madeira” exige “recebia”.' },
  { title: 'Antes do metrô', pieces: [['Caio ', 'pegavam'], [' dois ônibus. Ele ', 'demorava'], [' muito e os colegas o ', 'esperavam']], after: ' no escritório.', wrong: 0, answers: ['pegava'], reason: 'O sujeito singular “Caio” exige “pegava”.' },
  { title: 'O jantar quando o telefone tocou', pieces: [['Minha mãe ', 'servia'], [' a sopa. Meu pai ', 'arrumavam'], [' a mesa e nós ', 'conversávamos']], after: '.', wrong: 1, answers: ['arrumava'], reason: 'O sujeito singular “meu pai” exige “arrumava”.' },
  { title: 'O escritório de Clara', pieces: [['Clara ', 'abria'], [' o escritório. Ela ', 'organizava'], [' as mensagens e a equipe ', 'discutiam']], after: ' as prioridades.', wrong: 2, answers: ['discutia'], reason: 'O nome coletivo singular “a equipe” exige “discutia”.' },
  { title: 'A feira de antigamente', pieces: [['Uma feira ', 'ocupavam'], [' a praça. Os vendedores ', 'anunciavam'], [' os preços e os moradores ', 'ficavam']], after: ' nas barracas.', wrong: 0, answers: ['ocupava'], reason: 'O sujeito singular “uma feira” exige “ocupava”.' },
  { title: 'O ensaio interrompido', pieces: [['O maestro ', 'escutava'], [' os violinos. Os cantores ', 'repetia'], [' o refrão e a pianista ', 'relia']], after: ' as notas.', wrong: 1, answers: ['repetiam'], reason: 'O sujeito plural “os cantores” exige “repetiam”.' },
  { title: 'Os domingos na sala', pieces: [['Meu avô ', 'acendia'], [' a lareira. Minha irmã ', 'lia'], [' e eu ', 'preparavam']], after: ' o café.', wrong: 2, answers: ['preparava'], reason: 'O sujeito “eu” exige “preparava”.' },
  { title: 'A rodoviária cedo', pieces: [['A rodoviária ', 'estavam'], [' vazia. Um funcionário ', 'varria'], [' e alguns passageiros ', 'dormiam']], after: ' nos bancos.', wrong: 0, answers: ['estava'], reason: 'O sujeito singular “a rodoviária” exige “estava”.' },
]

const sequences: PortugueseEditorialSequenceSeed[] = [
  { events: ['Nós ficávamos na casa da tia', 'Ela comprava pão na feira', 'Nós brincávamos perto do rio'], target: 0 },
  { events: ['O vento batia nas janelas', 'A chuva caía', 'Os cachorros latiam'], target: 1 },
  { events: ['A biblioteca ficava num pátio', 'As janelas iluminavam a sala', 'A madeira recebia os visitantes'], target: 2 },
  { events: ['Caio pegava dois ônibus', 'Ele demorava quase uma hora', 'Os colegas o esperavam'], target: 0 },
  { events: ['Minha mãe servia a sopa', 'Meu pai arrumava a mesa', 'Nós conversávamos'], target: 1 },
  { events: ['Clara abria o escritório', 'Ela organizava as mensagens', 'A equipe discutia prioridades'], target: 2 },
  { events: ['Uma feira ocupava a praça', 'Os vendedores anunciavam os preços', 'Os moradores ficavam nas barracas'], target: 0 },
  { events: ['O maestro escutava os violinos', 'Os cantores repetiam o refrão', 'A pianista relia as notas'], target: 1 },
  { events: ['Meu avô acendia a lareira', 'Minha irmã lia', 'Eu preparava o café'], target: 2 },
  { events: ['A rodoviária estava vazia', 'Um funcionário varria a plataforma', 'Passageiros dormiam nos bancos'], target: 0 },
]

const final: PortugueseEditorialFinalSeed[] = [
  { before: 'Quando morávamos em Belém, eu ', after: ' ao trabalho a pé.', answer: 'ia', distractors: ['fui', 'tinha ido', 'irei'] },
  { before: 'Às dez da noite, a neve ainda ', after: ' na estrada.', answer: 'caía', distractors: ['caiu', 'tinha caído', 'cairá'] },
  { before: 'Toda sexta-feira, vocês ', after: ' o balanço juntos.', answer: 'revisavam', distractors: ['revisaram', 'tinham revisado', 'revisarão'] },
  { before: 'A casa antiga ', after: ' três chaminés e um sótão grande.', answer: 'tinha', distractors: ['teve', 'tinha tido', 'terá'] },
  { before: 'Enquanto a médica falava, os alunos ', after: ' anotações.', answer: 'faziam', distractors: ['fizeram', 'tinham feito', 'farão'] },
  { before: 'Antes da reforma, esta porta ', after: ' muito mal.', answer: 'fechava', distractors: ['fechou', 'tinha fechado', 'fechará'] },
  { before: 'Naquela época, nós ainda não ', after: ' a resposta.', answer: 'sabíamos', distractors: ['soubemos', 'tínhamos sabido', 'saberemos'] },
  { before: 'Todo inverno, o lago ', after: ' por várias semanas.', answer: 'congelava', distractors: ['congelou', 'tinha congelado', 'congelará'] },
  { before: 'No momento do anúncio, tu ', after: ' perto da saída.', answer: 'esperavas', distractors: ['esperaste', 'tinhas esperado', 'esperarás'] },
  { before: 'À noite, as luzes da plataforma ', after: ' um tom alaranjado.', answer: 'espalhavam', distractors: ['espalharam', 'tinham espalhado', 'espalharão'] },
]

export const PORTUGUESE_PRETERITE_IMPERFECT_EDITORIAL = createPortugueseEditorialPack({
  slug: 'preterito-imperfeito',
  form: 'preterito-imperfeito',
  focus: 'Pretérito imperfeito',
  rule: 'O pretérito imperfeito apresenta hábito, estado, descrição ou ação em curso no passado.',
  micro,
  long,
  errors,
  sequences,
  final,
})
