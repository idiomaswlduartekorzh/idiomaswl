import {
  createPortugueseEditorialPack,
  type PortugueseEditorialErrorSeed,
  type PortugueseEditorialFinalSeed,
  type PortugueseEditorialGapSeed,
  type PortugueseEditorialMicroSeed,
  type PortugueseEditorialSequenceSeed,
} from './portuguese-editorial-builder.ts'

const micro: PortugueseEditorialMicroSeed[] = [
  { title: 'O primeiro ônibus', cue: 'um horário regular', segments: ['O primeiro ônibus ', ' do terminal às 5h40 todos os dias.'], verb: 'sair', answers: ['sai'], distractors: ['saiu', 'saía', 'sairá'] },
  { title: 'Uma verdade física', cue: 'um fato geral', segments: ['A água ', ' a 100 °C ao nível do mar.'], verb: 'ferver', answers: ['ferve'], distractors: ['ferveu', 'fervia', 'ferverá'] },
  { title: 'O trajeto de Bia', cue: 'um hábito atual', segments: ['Bia ', ' ao trabalho de bicicleta três vezes por semana.'], verb: 'ir', answers: ['vai'], distractors: ['foi', 'ia', 'irá'] },
  { title: 'A moradia temporária', cue: 'uma situação atual', segments: ['Neste mês, nós ', ' na casa da nossa tia por causa da reforma.'], verb: 'morar', answers: ['moramos'], distractors: ['moramos ontem', 'morávamos', 'moraremos'] },
  { title: 'A regra do laboratório', cue: 'uma regra permanente', segments: ['O laboratório não ', ' bebidas perto dos aparelhos.'], verb: 'permitir', answers: ['permite'], distractors: ['permitiu', 'permitia', 'permitirá'] },
  { title: 'A linha do litoral', cue: 'um fato estável sobre uma rota', segments: ['Essa linha de ônibus ', ' doze bairros antes do centro.'], verb: 'atender', answers: ['atende'], distractors: ['atendeu', 'atendia', 'atenderá'] },
  { title: 'O plantão de terça', cue: 'uma organização recorrente', segments: ['Toda terça-feira, vocês ', ' o atendimento até o meio-dia.'], verb: 'assumir', answers: ['assumem'], distractors: ['assumiram', 'assumiam', 'assumirão'] },
  { title: 'O painel solar', cue: 'a função permanente de um equipamento', segments: ['Este painel ', ' luz em energia elétrica.'], verb: 'transformar', answers: ['transforma'], distractors: ['transformou', 'transformava', 'transformará'] },
  { title: 'Os domingos da família', cue: 'um costume regular', segments: ['Meus primos ', ' almoçar com os avós aos domingos.'], verb: 'vir', answers: ['vêm'], distractors: ['vieram', 'vinham', 'virão'] },
  { title: 'O calendário da faculdade', cue: 'uma data oficial programada', segments: ['O semestre letivo ', ' no dia 4 de março.'], verb: 'começar', answers: ['começa'], distractors: ['começou', 'começava', 'começará'] },
]

const long: PortugueseEditorialGapSeed[] = [
  { title: 'A abertura da padaria', instruction: 'Complete esta rotina matinal coerente.', segments: ['Toda manhã, Inês ', ' as portas às seis. O irmão dela ', ' os fornos enquanto ela ', ' a primeira entrega.'], entries: [['abrir', ['abre']], ['verificar', ['verifica']], ['receber', ['recebe']]] },
  { title: 'Um dia no posto de saúde', instruction: 'Complete esta rotina de trabalho.', segments: ['A médica ', ' os agendamentos antes das oito. A recepcionista ', ' o balcão e o primeiro paciente ', ' alguns minutos depois.'], entries: [['revisar', ['revisa']], ['abrir', ['abre']], ['chegar', ['chega']]] },
  { title: 'O roteiro do museu', instruction: 'Complete este horário público.', segments: ['O museu ', ' às dez. Uma guia ', ' a primeira visita às dez e meia e o café ', ' almoço a partir do meio-dia.'], entries: [['abrir', ['abre']], ['conduzir', ['conduz']], ['servir', ['serve']]] },
  { title: 'O jornal das seis', instruction: 'Complete esta rotina da redação.', segments: ['O produtor ', ' as pautas às cinco. A editora ', ' cada nome e o apresentador ', ' o boletim ao vivo às seis.'], entries: [['escolher', ['escolhe']], ['conferir', ['confere']], ['ler', ['lê']]] },
  { title: 'A estufa automática', instruction: 'Complete o funcionamento deste sistema.', segments: ['Um sensor ', ' a temperatura a cada minuto. Se o ar esquenta demais, um ventilador ', ' sozinho e a jardineira ', ' um alerta.'], entries: [['medir', ['mede']], ['ligar', ['liga']], ['receber', ['recebe']]] },
  { title: 'O treino de sábado', instruction: 'Complete esta rotina esportiva.', segments: ['O time ', ' às nove todo sábado. A treinadora ', ' o aquecimento e os jogadores ', ' passes curtos.'], entries: [['se reunir', ['se reúne']], ['conduzir', ['conduz']], ['praticar', ['praticam']]] },
  { title: 'A esteira de reciclagem', instruction: 'Complete a descrição deste processo.', segments: ['Uma esteira ', ' o material. Um ímã ', ' o aço e duas funcionárias ', ' o restante à mão.'], entries: [['transportar', ['transporta']], ['retirar', ['retira']], ['separar', ['separam']]] },
  { title: 'O fechamento da livraria', instruction: 'Complete esta rotina do fim do dia.', segments: ['Às sete, a caixa ', ' o último aviso. Os clientes ', ' as compras e a gerente ', ' as portas quinze minutos depois.'], entries: [['fazer', ['faz']], ['terminar', ['terminam']], ['fechar', ['fecha']]] },
  { title: 'A balsa da ilha', instruction: 'Complete este itinerário regular.', segments: ['A balsa ', ' da ilha às seis. Ela ', ' em dois portos menores e ', ' o continente antes das nove.'], entries: [['sair', ['sai']], ['parar', ['para']], ['alcançar', ['alcança']]] },
  { title: 'O empréstimo na biblioteca', instruction: 'Complete este procedimento habitual.', segments: ['A usuária ', ' um livro no catálogo. Ela ', ' o cartão no balcão e a bibliotecária ', ' a data de devolução.'], entries: [['procurar', ['procura']], ['apresentar', ['apresenta']], ['informar', ['informa']]] },
]

const errors: PortugueseEditorialErrorSeed[] = [
  { title: 'O primeiro turno', pieces: [['Toda manhã, Inês ', 'abrem'], [' as portas. O irmão dela ', 'verifica'], [' os fornos e a padeira ', 'organiza']], after: ' a vitrine.', wrong: 0, answers: ['abre'], reason: 'O sujeito singular “Inês” exige “abre”.' },
  { title: 'A recepção do posto', pieces: [['A médica ', 'revisa'], [' a lista. A recepcionista ', 'abrem'], [' o balcão e os pacientes ', 'esperam']], after: ' no corredor.', wrong: 1, answers: ['abre'], reason: 'O sujeito singular “a recepcionista” exige “abre”.' },
  { title: 'A primeira visita', pieces: [['O museu ', 'abre'], [' às dez. A guia ', 'começa'], [' a visita e os turistas a ', 'segue']], after: ' até o segundo andar.', wrong: 2, answers: ['seguem'], reason: 'O sujeito plural “os turistas” exige “seguem”.' },
  { title: 'O caminho de Caio', pieces: [['Caio ', 'saem'], [' de casa às sete. Ele ', 'encontra'], [' Lia no parque e os dois ', 'pedalam']], after: ' até o trabalho.', wrong: 0, answers: ['sai'], reason: 'O sujeito singular “Caio” exige “sai”.' },
  { title: 'O boletim local', pieces: [['O produtor ', 'escolhe'], [' as pautas. A editora ', 'conferem'], [' os fatos e o apresentador ', 'lê']], after: ' os títulos ao vivo.', wrong: 1, answers: ['confere'], reason: 'O sujeito singular “a editora” exige “confere”.' },
  { title: 'Os controles da estufa', pieces: [['O sensor ', 'mede'], [' o calor. O ventilador ', 'liga'], [' e duas janelas ', 'abre']], after: ' no teto.', wrong: 2, answers: ['abrem'], reason: 'O sujeito plural “duas janelas” exige “abrem”.' },
  { title: 'O sábado no campo', pieces: [['O time ', 'se reúnem'], [' às nove. A treinadora ', 'conduz'], [' o aquecimento e os jogadores ', 'correm']], after: ' ao redor do campo.', wrong: 0, answers: ['se reúne'], reason: 'O nome coletivo singular “o time” exige “se reúne”.' },
  { title: 'A central de reciclagem', pieces: [['A esteira ', 'transporta'], [' os resíduos. Um ímã ', 'retiram'], [' o metal e as agentes ', 'separam']], after: ' o restante.', wrong: 1, answers: ['retira'], reason: 'O sujeito singular “um ímã” exige “retira”.' },
  { title: 'O fim do expediente', pieces: [['A caixa ', 'faz'], [' um aviso. Os clientes ', 'terminam'], [' as compras e a gerente ', 'fecham']], after: ' as portas.', wrong: 2, answers: ['fecha'], reason: 'O sujeito singular “a gerente” exige “fecha”.' },
  { title: 'O empréstimo de um romance', pieces: [['A usuária ', 'procuram'], [' um título. Ela ', 'apresenta'], [' o cartão e as bibliotecárias ', 'informam']], after: ' a data de devolução.', wrong: 0, answers: ['procura'], reason: 'O sujeito singular “a usuária” exige “procura”.' },
]

const sequences: PortugueseEditorialSequenceSeed[] = [
  { events: ['Inês abre as portas', 'O irmão verifica os fornos', 'A padeira organiza a vitrine'], target: 0 },
  { events: ['A médica revisa a lista', 'A recepcionista abre o balcão', 'O primeiro paciente entra'], target: 1 },
  { events: ['O museu abre', 'A guia conduz o grupo', 'O café serve o almoço'], target: 2 },
  { events: ['Caio sai de casa', 'Ele encontra Lia no parque', 'Os dois chegam ao trabalho'], target: 0 },
  { events: ['O produtor escolhe as pautas', 'A editora confere os fatos', 'O apresentador lê o boletim'], target: 1 },
  { events: ['O sensor mede o calor', 'O ventilador liga', 'A jardineira recebe um alerta'], target: 2 },
  { events: ['O time se reúne', 'A treinadora conduz o aquecimento', 'Os jogadores praticam passes'], target: 0 },
  { events: ['A esteira transporta os resíduos', 'O ímã retira o aço', 'As agentes separam o restante'], target: 1 },
  { events: ['A caixa faz um aviso', 'Os clientes terminam as compras', 'A gerente fecha as portas'], target: 2 },
  { events: ['A usuária procura um título', 'Ela apresenta o cartão', 'A bibliotecária informa a data'], target: 0 },
]

const final: PortugueseEditorialFinalSeed[] = [
  { before: 'Toda segunda-feira, a gerente ', after: ' o estoque antes de abrir.', answer: 'confere', distractors: ['conferiu', 'conferia', 'conferirá'] },
  { before: 'O ônibus do aeroporto ', after: ' a cada vinte minutos.', answer: 'passa', distractors: ['passou', 'passava', 'passará'] },
  { before: 'Este sistema ', after: ' um recibo depois de cada pagamento.', answer: 'gera', distractors: ['gerou', 'gerava', 'gerará'] },
  { before: 'Meus vizinhos ', after: ' uma barraca na feira aos sábados.', answer: 'mantêm', distractors: ['mantiveram', 'mantinham', 'manterão'] },
  { before: 'A Lua ', after: ' a luz do Sol.', answer: 'reflete', distractors: ['refletiu', 'refletia', 'refletirá'] },
  { before: 'Esta porta ', after: ' quando o sinal fica verde.', answer: 'destrava', distractors: ['destravou', 'destravava', 'destravará'] },
  { before: 'A trilha costeira ', after: ' perto do farol antigo.', answer: 'termina', distractors: ['terminou', 'terminava', 'terminará'] },
  { before: 'Nosso coral ', after: ' no centro cultural toda quinta-feira.', answer: 'ensaia', distractors: ['ensaiou', 'ensaiava', 'ensaiará'] },
  { before: 'Dois técnicos ', after: ' o gerador uma vez por mês.', answer: 'testam', distractors: ['testaram', 'testavam', 'testarão'] },
  { before: 'A exposição de inverno ', after: ' na primeira segunda-feira de julho.', answer: 'abre', distractors: ['abriu', 'abria', 'abrirá'] },
]

export const PORTUGUESE_PRESENT_EDITORIAL = createPortugueseEditorialPack({
  slug: 'presente',
  form: 'presente',
  focus: 'Presente',
  rule: 'O presente expressa hábitos, fatos estáveis, regras, situações atuais e horários oficiais.',
  micro,
  long,
  errors,
  sequences,
  final,
})
