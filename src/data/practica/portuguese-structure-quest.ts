import { createStructureQuest, type FinalRow, type StructureSeed } from './create-structure-quest.ts'

export const PORTUGUESE_FORMS = [
  { id: 'presente', label: 'Presente do indicativo', group: 'Presente' },
  { id: 'progressivo', label: 'Estar + gerúndio', group: 'Presente' },
  { id: 'preterito-perfeito', label: 'Pretérito perfeito', group: 'Passado' },
  { id: 'preterito-imperfeito', label: 'Pretérito imperfeito', group: 'Passado' },
  { id: 'mais-que-perfeito', label: 'Mais-que-perfeito composto', group: 'Passado' },
  { id: 'futuro-proximo', label: 'Ir + infinitivo', group: 'Futuro' },
  { id: 'futuro-presente', label: 'Futuro do presente', group: 'Futuro' },
  { id: 'futuro-composto', label: 'Futuro composto', group: 'Futuro' },
  { id: 'futuro-preterito', label: 'Futuro do pretérito', group: 'Hipótese' },
  { id: 'condicional-passado', label: 'Condicional passado', group: 'Hipótese' },
] as const

export type PortugueseFormId = (typeof PORTUGUESE_FORMS)[number]['id']

const SEEDS: StructureSeed<PortugueseFormId>[] = [
  { id: 'presente', explanation: 'O presente indica hábitos, fatos atuais e horários fixos.', examples: [
    { context: 'Toda manhã, Paula ___ café sem açúcar.', answer: 'toma', wrong: 'tomam', lemma: 'tomar', cue: 'hábito atual', distractors: ['tomou', 'tomava', 'tomará'] },
    { context: 'Hoje eu ___ perto da universidade.', answer: 'moro', wrong: 'mora', lemma: 'morar', cue: 'situação atual', distractors: ['morei', 'morava', 'morarei'] },
    { context: 'O voo das seis ___ pontualmente todos os dias.', answer: 'sai', wrong: 'saem', lemma: 'sair', cue: 'horário habitual', distractors: ['saiu', 'saía', 'sairá'] },
  ] },
  { id: 'progressivo', explanation: 'Estar + gerúndio destaca uma ação em andamento ou uma situação temporária no português brasileiro.', examples: [
    { context: 'Agora, os alunos ___ a atividade.', answer: 'estão fazendo', wrong: 'estão fazer', lemma: 'fazer', cue: 'ação em andamento agora', distractors: ['fazem', 'fizeram', 'farão'] },
    { context: 'Esta semana eu ___ de casa.', answer: 'estou trabalhando', wrong: 'estou trabalhado', lemma: 'trabalhar', cue: 'situação temporária', distractors: ['trabalho', 'trabalhei', 'trabalharei'] },
    { context: 'Escute: alguém ___ na porta.', answer: 'está batendo', wrong: 'estão batendo', lemma: 'bater', cue: 'evidência no momento da fala', distractors: ['bate', 'bateu', 'baterá'] },
  ] },
  { id: 'preterito-perfeito', explanation: 'O pretérito perfeito apresenta um evento concluído em um período passado delimitado.', examples: [
    { context: 'Ontem nós ___ o contrato.', answer: 'assinamos', wrong: 'assinávamos', lemma: 'assinar', cue: 'ação concluída ontem', distractors: ['assinamos sempre', 'tínhamos assinado', 'assinaremos'] },
    { context: 'Marina ___ cedo no sábado.', answer: 'chegou', wrong: 'chegava', lemma: 'chegar', cue: 'evento pontual passado', distractors: ['chega', 'tinha chegado', 'chegará'] },
    { context: 'Eu nunca ___ esse prato quando estive em Recife.', answer: 'provei', wrong: 'provo', lemma: 'provar', cue: 'experiência em período encerrado', distractors: ['provava', 'tinha provado', 'provarei'] },
  ] },
  { id: 'preterito-imperfeito', explanation: 'O imperfeito descreve hábitos, cenários ou ações em curso no passado.', examples: [
    { context: 'Quando era criança, eu ___ na rua todos os dias.', answer: 'brincava', wrong: 'brinquei', lemma: 'brincar', cue: 'hábito passado', distractors: ['brinco', 'tinha brincado', 'brincarei'] },
    { context: 'A sala ___ vazia e as luzes estavam apagadas.', answer: 'parecia', wrong: 'pareceu', lemma: 'parecer', cue: 'descrição de fundo', distractors: ['parece', 'tinha parecido', 'parecerá'] },
    { context: 'Às oito, nós ainda ___ quando o alarme tocou.', answer: 'jantávamos', wrong: 'jantamos', lemma: 'jantar', cue: 'ação passada interrompida', distractors: ['jantamos agora', 'tínhamos jantado', 'jantaremos'] },
  ] },
  { id: 'mais-que-perfeito', explanation: 'Ter no imperfeito + particípio situa uma ação antes de outro marco passado.', examples: [
    { context: 'Quando cheguei, eles já ___.', answer: 'tinham saído', wrong: 'tinham saí', lemma: 'sair', cue: 'anterioridade passada', distractors: ['saíram', 'saíam', 'terão saído'] },
    { context: 'Ela conhecia o livro porque já o ___.', answer: 'tinha lido', wrong: 'tinha leu', lemma: 'ler', cue: 'experiência anterior', distractors: ['leu', 'lia', 'terá lido'] },
    { context: 'Conseguimos entrar porque Rui ___ a chave conosco.', answer: 'tinha deixado', wrong: 'deixava', lemma: 'deixar', cue: 'causa anterior a outro passado', distractors: ['deixou', 'deixa', 'deixará'] },
  ] },
  { id: 'futuro-proximo', explanation: 'Ir no presente + infinitivo expressa plano decidido, previsão próxima ou consequência iminente.', examples: [
    { context: 'Comprei as passagens; nós ___ amanhã.', answer: 'vamos viajar', wrong: 'vamos viajamos', lemma: 'viajar', cue: 'plano já decidido', distractors: ['viajamos ontem', 'viajávamos', 'viajaríamos'] },
    { context: 'Olhe as nuvens: ___.', answer: 'vai chover', wrong: 'vai chove', lemma: 'chover', cue: 'previsão com evidência', distractors: ['choveu', 'chovia', 'choveria'] },
    { context: 'Cuidado! O copo ___.', answer: 'vai cair', wrong: 'vai caiu', lemma: 'cair', cue: 'evento iminente', distractors: ['cai', 'caiu', 'cairia'] },
  ] },
  { id: 'futuro-presente', explanation: 'O futuro do presente marca previsões, promessas e fatos futuros; na fala, ir + infinitivo costuma ser mais frequente.', examples: [
    { context: 'A empresa ___ o resultado na próxima semana.', answer: 'anunciará', wrong: 'anunciarão', lemma: 'anunciar', cue: 'fato futuro em registro formal', distractors: ['anuncia', 'anunciou', 'anunciaria'] },
    { context: 'Prometo que eu te ___ amanhã.', answer: 'ligarei', wrong: 'ligará', lemma: 'ligar', cue: 'promessa futura', distractors: ['ligo', 'liguei', 'ligaria'] },
    { context: 'Vocês ___ as instruções por e-mail.', answer: 'receberão', wrong: 'receberá', lemma: 'receber', cue: 'previsão futura', distractors: ['recebem', 'receberam', 'receberiam'] },
  ] },
  { id: 'futuro-composto', explanation: 'Ter no futuro + particípio apresenta algo concluído antes de um limite futuro.', examples: [
    { context: 'Até sexta-feira, nós ___ o projeto.', answer: 'teremos concluído', wrong: 'teremos concluir', lemma: 'concluir', cue: 'conclusão antes de um prazo', distractors: ['concluímos', 'concluiremos', 'teríamos concluído'] },
    { context: 'Quando você chegar, Ana já ___.', answer: 'terá partido', wrong: 'tinha partido', lemma: 'partir', cue: 'anterioridade em relação ao futuro', distractors: ['partiu', 'partirá', 'teria partido'] },
    { context: 'À meia-noite, eles ___ todos os arquivos.', answer: 'terão copiado', wrong: 'terão copiar', lemma: 'copiar', cue: 'balanço futuro concluído', distractors: ['copiaram', 'copiarão', 'teriam copiado'] },
  ] },
  { id: 'futuro-preterito', explanation: 'O futuro do pretérito expressa resultado hipotético, pedido atenuado ou futuro visto a partir do passado.', examples: [
    { context: 'Com mais tempo, eu ___ Salvador.', answer: 'visitaria', wrong: 'visitarei', lemma: 'visitar', cue: 'resultado hipotético', distractors: ['visito', 'visitei', 'tinha visitado'] },
    { context: 'Você ___ fechar a janela, por favor?', answer: 'poderia', wrong: 'poderá', lemma: 'poder', cue: 'pedido cortês', distractors: ['pode', 'pôde', 'tinha podido'] },
    { context: 'Ela disse que ___ no dia seguinte.', answer: 'voltaria', wrong: 'voltará', lemma: 'voltar', cue: 'futuro visto do passado', distractors: ['volta', 'voltou', 'tinha voltado'] },
  ] },
  { id: 'condicional-passado', explanation: 'Ter no futuro do pretérito + particípio expressa uma consequência passada que não se realizou.', examples: [
    { context: 'Com seu endereço, eu ___ a carta ontem.', answer: 'teria enviado', wrong: 'terei enviado', lemma: 'enviar', cue: 'resultado passado não realizado', distractors: ['enviei', 'enviava', 'enviaria'] },
    { context: 'Sem o trânsito, eles ___ cedo.', answer: 'teriam chegado', wrong: 'tinham chegado', lemma: 'chegar', cue: 'alternativa irreal no passado', distractors: ['chegaram', 'chegavam', 'chegariam'] },
    { context: 'Nós ___ o erro se tivéssemos revisado os dados.', answer: 'teríamos evitado', wrong: 'teremos evitado', lemma: 'evitar', cue: 'consequência contrafactual passada', distractors: ['evitamos', 'evitávamos', 'evitaríamos'] },
  ] },
]

const FINAL_ROWS: FinalRow<PortugueseFormId>[] = [
  { formId: 'presente', lemma: 'administrar', before: 'Hoje, Bia ', after: ' uma pequena pousada. ', answer: 'administra' },
  { formId: 'progressivo', lemma: 'preparar', before: 'Neste momento, ela ', after: ' a festa de aniversário. ', answer: 'está preparando' },
  { formId: 'preterito-perfeito', lemma: 'receber', before: 'Ontem, Bia ', after: ' cinquenta confirmações. ', answer: 'recebeu' },
  { formId: 'preterito-imperfeito', lemma: 'esperar', before: 'No início, ela ', after: ' apenas vinte pessoas. ', answer: 'esperava' },
  { formId: 'mais-que-perfeito', lemma: 'reservar', before: 'Por sorte, já ', after: ' o salão maior. ', answer: 'tinha reservado' },
  { formId: 'futuro-proximo', lemma: 'contratar', before: 'Agora ela ', after: ' mais dois garçons. ', answer: 'vai contratar' },
  { formId: 'futuro-presente', lemma: 'começar', before: 'A música ', after: ' às oito. ', answer: 'começará' },
  { formId: 'futuro-composto', lemma: 'decorar', before: 'Até lá, a equipe ', after: ' todo o jardim. ', answer: 'terá decorado' },
  { formId: 'futuro-preterito', lemma: 'usar', before: 'Com menos convidados, Bia ', after: ' a sala pequena. ', answer: 'usaria' },
  { formId: 'condicional-passado', lemma: 'cancelar', before: 'Sem o salão maior, ela ', after: ' a festa.', answer: 'teria cancelado' },
]

export const PORTUGUESE_STRUCTURE_QUEST = createStructureQuest({
  id: 'portuguese-structure-quest', storageKey: 'wl-portuguese-structure-quest-v2', forms: PORTUGUESE_FORMS,
  presets: [
    { label: 'Passado', ids: PORTUGUESE_FORMS.filter((form) => form.group === 'Passado').map((form) => form.id) },
    { label: 'Futuro', ids: PORTUGUESE_FORMS.filter((form) => form.group === 'Futuro').map((form) => form.id) },
    { label: 'Hipótese', ids: PORTUGUESE_FORMS.filter((form) => form.group === 'Hipótese').map((form) => form.id) },
  ], seeds: SEEDS, finalRows: FINAL_ROWS,
  copy: {
    languageName: 'Portugués', languageCode: 'pt-BR', eyebrow: 'Quiz de tempo e estrutura · A2–B2', title: 'A central da narrativa',
    lead: 'Practica el portugués brasileño distinguiendo evento, trasfondo, anterioridad, proyección e hipótesis.',
    range: '10 formas', selectedLabel: 'formas selecionadas', selectorTitle: '¿Qué formas del portugués quieres practicar?',
    selectorLead: 'El estándar editorial es portugués brasileño; se explicita cuando la forma es más frecuente en registros formales.',
    configuredEyebrow: 'Percurso personalizado', levelsTitle: 'Seis niveles con corrección diferida',
    levelsLead: 'Termina el nivel para ver puntaje, soluciones y explicación.', mapLabels: ['Antes', 'Passado', 'Agora', 'Futuro'],
    reviewLinks: [
      { href: '/practica/portugues/a1/gramatica', label: 'Repasar gramática A1' },
      { href: '/practica/portugues/a2/gramatica', label: 'Profundizar en A2' },
      { href: '/herramientas/quizes', label: 'Ver más quizes' },
    ],
  }, text: { finalTitle: 'A festa da pousada', finalExplanation: 'La historia contrasta portugués brasileño hablado, relato pasado, anterioridad, futuro formal y alternativas hipotéticas.' },
})
