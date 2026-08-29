import {
  createPortugueseEditorialPack,
  type PortugueseEditorialErrorSeed,
  type PortugueseEditorialFinalSeed,
  type PortugueseEditorialGapSeed,
  type PortugueseEditorialMicroSeed,
  type PortugueseEditorialSequenceSeed,
} from './portuguese-editorial-builder.ts'

const micro: PortugueseEditorialMicroSeed[] = [
  { title: 'O comunicado da empresa', cue: 'um fato futuro em registro formal', segments: ['A empresa ', ' o resultado na próxima semana.'], verb: 'anunciar', answers: ['anunciará'], distractors: ['anuncia', 'vai anunciar', 'anunciaria'] },
  { title: 'Uma promessa solene', cue: 'uma promessa futura explícita', segments: ['Prometo que ', ' amanhã cedo.'], verb: 'ligar', answers: ['ligarei'], distractors: ['ligo', 'vou ligar', 'ligaria'] },
  { title: 'As instruções oficiais', cue: 'um procedimento futuro anunciado', segments: ['Vocês ', ' as instruções por e-mail.'], verb: 'receber', answers: ['receberão'], distractors: ['recebem', 'vão receber', 'receberiam'] },
  { title: 'A decisão do júri', cue: 'uma decisão futura formalmente marcada', segments: ['O júri ', ' o projeto vencedor na sexta-feira.'], verb: 'escolher', answers: ['escolherá'], distractors: ['escolhe', 'vai escolher', 'escolheria'] },
  { title: 'Nosso compromisso', cue: 'um compromisso futuro', segments: ['Não se preocupe: nós ', ' durante a mudança.'], verb: 'ajudar', answers: ['ajudaremos'], distractors: ['ajudamos', 'vamos ajudar', 'ajudaríamos'] },
  { title: 'A projeção climática', cue: 'uma previsão formal de longo prazo', segments: ['Segundo o relatório, este verão ', ' mais seco.'], verb: 'ser', answers: ['será'], distractors: ['é', 'vai ser', 'seria'] },
  { title: 'A agenda ministerial', cue: 'um compromisso futuro oficial', segments: ['A ministra ', ' os representantes na terça-feira.'], verb: 'receber', answers: ['receberá'], distractors: ['recebe', 'vai receber', 'receberia'] },
  { title: 'A resposta garantida', cue: 'uma certeza sobre o futuro', segments: ['Tenho certeza de que eles ', ' até o fim do mês.'], verb: 'responder', answers: ['responderão'], distractors: ['respondem', 'vão responder', 'responderiam'] },
  { title: 'O novo regulamento', cue: 'uma obrigação futura escrita', segments: ['A partir de janeiro, você ', ' crachá para entrar.'], verb: 'usar', answers: ['usará'], distractors: ['usa', 'vai usar', 'usaria'] },
  { title: 'O calendário cultural', cue: 'um evento futuro em programação oficial', segments: ['A cidade ', ' o festival em outubro.'], verb: 'receber', answers: ['receberá'], distractors: ['recebe', 'vai receber', 'receberia'] },
]

const long: PortugueseEditorialGapSeed[] = [
  { title: 'Programa oficial da conferência', instruction: 'Complete este programa formal no futuro do presente.', segments: ['Amanhã, a diretora ', ' a sessão às nove. Dois pesquisadores ', ' os resultados e o público ', ' perguntas ao final.'], entries: [['abrir', ['abrirá']], ['apresentar', ['apresentarão']], ['fazer', ['fará']]] },
  { title: 'Plano oficial do novo bairro', instruction: 'Complete estas projeções formais.', segments: ['No próximo ano, a cidade ', ' uma escola. Uma linha de ônibus a ', ' ao centro e as famílias ', ' de novas áreas verdes.'], entries: [['construir', ['construirá']], ['ligar', ['ligará']], ['desfrutar', ['desfrutarão']]] },
  { title: 'Roteiro formal da viagem', instruction: 'Complete este itinerário futuro anunciado.', segments: ['Em junho, nós ', ' a Manaus. ', ' dois dias na cidade e ', ' pelo rio no domingo.'], entries: [['ir', ['iremos']], ['ficar', ['ficaremos']], ['voltar', ['voltaremos']]] },
  { title: 'Comunicado da próxima temporada', instruction: 'Complete estas previsões esportivas formais.', segments: ['Na próxima temporada, o clube ', ' duas jogadoras. Elas ', ' com o time principal e a torcida as ', ' na estreia.'], entries: [['contratar', ['contratará']], ['treinar', ['treinarão']], ['conhecer', ['conhecerá']]] },
  { title: 'Compromisso de entrega', instruction: 'Complete esta promessa formal de serviço.', segments: ['Na sexta, nossa equipe ', ' o material. O técnico o ', ' no local e vocês ', ' treinamento completo.'], entries: [['levar', ['levará']], ['instalar', ['instalará']], ['receber', ['receberão']]] },
  { title: 'Plano climático oficial', instruction: 'Complete estas medidas futuras anunciadas.', segments: ['Em dois anos, o município ', ' as lâmpadas antigas. Também ', ' mais árvores e os prédios públicos ', ' menos energia.'], entries: [['trocar', ['trocará']], ['plantar', ['plantará']], ['consumir', ['consumirão']]] },
  { title: 'Resposta formal ao cliente', instruction: 'Complete estes compromissos futuros.', segments: ['Nós ', ' o pedido amanhã. Um consultor ', ' antes do meio-dia e ', ' uma resposta por escrito.'], entries: [['analisar', ['analisaremos']], ['ligar', ['ligará']], ['enviar', ['enviará']]] },
  { title: 'Calendário oficial do festival', instruction: 'Complete esta programação cultural.', segments: ['Em outubro, o teatro ', ' três companhias. Os artistas ', ' pela cidade e um debate ', ' cada apresentação.'], entries: [['receber', ['receberá']], ['se apresentar', ['se apresentarão']], ['seguir', ['seguirá']]] },
  { title: 'Comunicado da próxima matrícula', instruction: 'Complete estas mudanças programadas.', segments: ['No próximo semestre, os alunos ', ' novo horário. Cada turma ', ' uma oficina e as famílias ', ' o progresso on-line.'], entries: [['receber', ['receberão']], ['ter', ['terá']], ['acompanhar', ['acompanharão']]] },
  { title: 'Boletim meteorológico formal', instruction: 'Complete estas previsões para amanhã.', segments: ['Amanhã cedo, a neblina ', ' o vale. O vento ', ' à tarde e as temperaturas ', ' durante a noite.'], entries: [['cobrir', ['cobrirá']], ['aumentar', ['aumentará']], ['cair', ['cairão']]] },
]

const errors: PortugueseEditorialErrorSeed[] = [
  { title: 'Programa da conferência', pieces: [['A diretora ', 'abrirão'], [' a sessão. Dois pesquisadores ', 'apresentarão'], [' os resultados e o público ', 'fará']], after: ' perguntas.', wrong: 0, answers: ['abrirá'], reason: 'O sujeito singular “a diretora” exige “abrirá”.' },
  { title: 'Plano do novo bairro', pieces: [['A cidade ', 'construirá'], [' uma escola. Uma linha a ', 'ligarão'], [' ao centro e as famílias ', 'desfrutarão']], after: ' do parque.', wrong: 1, answers: ['ligará'], reason: 'O sujeito singular “uma linha” exige “ligará”.' },
  { title: 'Roteiro de junho', pieces: [['Nós ', 'iremos'], [' a Manaus, ', 'ficaremos'], [' dois dias e ', 'voltarão']], after: ' no domingo.', wrong: 2, answers: ['voltaremos'], reason: 'A sequência mantém o sujeito “nós”.' },
  { title: 'Comunicado esportivo', pieces: [['O clube ', 'contratarão'], [' jogadoras. Elas ', 'treinarão'], [' e a torcida as ', 'conhecerá']], after: '.', wrong: 0, answers: ['contratará'], reason: 'O sujeito singular “o clube” exige “contratará”.' },
  { title: 'Entrega prometida', pieces: [['Nossa equipe ', 'levará'], [' o material. O técnico o ', 'instalarão'], [' e vocês ', 'receberão']], after: ' treinamento.', wrong: 1, answers: ['instalará'], reason: 'O sujeito singular “o técnico” exige “instalará”.' },
  { title: 'Plano climático', pieces: [['O município ', 'trocará'], [' as lâmpadas, ', 'plantará'], [' árvores e os prédios ', 'consumirá']], after: ' menos.', wrong: 2, answers: ['consumirão'], reason: 'O sujeito plural “os prédios” exige “consumirão”.' },
  { title: 'Resposta ao cliente', pieces: [['Nós ', 'analisará'], [' o pedido. Um consultor ', 'ligará'], [' e ', 'enviará']], after: ' a resposta.', wrong: 0, answers: ['analisaremos'], reason: 'O sujeito “nós” exige “analisaremos”.' },
  { title: 'Calendário do festival', pieces: [['O teatro ', 'receberá'], [' companhias. Os artistas ', 'se apresentará'], [' e um debate ', 'seguirá']], after: ' cada sessão.', wrong: 1, answers: ['se apresentarão'], reason: 'O sujeito plural “os artistas” exige “se apresentarão”.' },
  { title: 'Comunicado da matrícula', pieces: [['Os alunos ', 'receberão'], [' um horário. Cada turma ', 'terá'], [' uma oficina e as famílias ', 'acompanhará']], after: ' o progresso.', wrong: 2, answers: ['acompanharão'], reason: 'O sujeito plural “as famílias” exige “acompanharão”.' },
  { title: 'Previsão de amanhã', pieces: [['A neblina ', 'cobrirá'], [' o vale. O vento ', 'aumentarão'], [' e as temperaturas ', 'cairão']], after: ' à noite.', wrong: 1, answers: ['aumentará'], reason: 'O sujeito singular “o vento” exige “aumentará”.' },
]

const sequences: PortugueseEditorialSequenceSeed[] = [
  { events: ['A diretora abrirá a sessão', 'Os pesquisadores apresentarão resultados', 'O público fará perguntas'], target: 0 },
  { events: ['A cidade construirá uma escola', 'A linha a ligará ao centro', 'As famílias desfrutarão do parque'], target: 1 },
  { events: ['Nós iremos a Manaus', 'Ficaremos dois dias', 'Voltaremos no domingo'], target: 2 },
  { events: ['O clube contratará jogadoras', 'Elas treinarão com o time', 'A torcida as conhecerá'], target: 0 },
  { events: ['Nossa equipe levará o material', 'O técnico o instalará', 'Vocês receberão treinamento'], target: 1 },
  { events: ['O município trocará as lâmpadas', 'Plantará árvores', 'Os prédios consumirão menos'], target: 2 },
  { events: ['Nós analisaremos o pedido', 'Um consultor ligará', 'Ele enviará a resposta'], target: 0 },
  { events: ['O teatro receberá companhias', 'Os artistas se apresentarão', 'Um debate seguirá cada sessão'], target: 1 },
  { events: ['Os alunos receberão um horário', 'Cada turma terá uma oficina', 'As famílias acompanharão o progresso'], target: 2 },
  { events: ['A neblina cobrirá o vale', 'O vento aumentará', 'As temperaturas cairão'], target: 0 },
]

const final: PortugueseEditorialFinalSeed[] = [
  { before: 'Conforme o comunicado, a empresa ', after: ' o contrato amanhã.', answer: 'enviará', distractors: ['envia', 'vai enviar', 'enviaria'] },
  { before: 'Segundo a previsão, o rio ', after: ' o nível máximo na terça.', answer: 'atingirá', distractors: ['atinge', 'vai atingir', 'atingiria'] },
  { before: 'No próximo ano, nós ', after: ' uma filial em Recife.', answer: 'abriremos', distractors: ['abrimos', 'vamos abrir', 'abriríamos'] },
  { before: 'Prometo que vocês ', after: ' uma resposta até sexta.', answer: 'terão', distractors: ['têm', 'vão ter', 'teriam'] },
  { before: 'O novo trem ', after: ' o trajeto em duas horas.', answer: 'percorrerá', distractors: ['percorre', 'vai percorrer', 'percorreria'] },
  { before: 'A partir de setembro, os escritórios ', after: ' às seis.', answer: 'fecharão', distractors: ['fecham', 'vão fechar', 'fechariam'] },
  { before: 'Tenho certeza de que ela ', after: ' a solução.', answer: 'entenderá', distractors: ['entende', 'vai entender', 'entenderia'] },
  { before: 'Na próxima semana, vocês ', after: ' os novos membros.', answer: 'receberão', distractors: ['recebem', 'vão receber', 'receberiam'] },
  { before: 'Em dez anos, esta tecnologia ', after: ' menos energia.', answer: 'consumirá', distractors: ['consome', 'vai consumir', 'consumiria'] },
  { before: 'Depois do intervalo, eles ', after: ' os resultados ao comitê.', answer: 'apresentarão', distractors: ['apresentam', 'vão apresentar', 'apresentariam'] },
]

export const PORTUGUESE_FORMAL_FUTURE_EDITORIAL = createPortugueseEditorialPack({
  slug: 'futuro-presente',
  form: 'futuro-presente',
  focus: 'Futuro do presente · registro formal',
  rule: 'O futuro do presente é produtivo em escrita, comunicados, promessas e previsões formais; na fala brasileira, ir + infinitivo costuma ser mais frequente.',
  micro,
  long,
  errors,
  sequences,
  final,
})
