import type { RoleplayToolkit } from './types.ts'

/** Caixa comum para os vinte roleplays de português brasileiro A2. Não é um diálogo em ordem. */
export const TOOLKIT_PORTUGUES_A2: RoleplayToolkit = {
  language: 'portugues',
  level: 'a2',
  intro:
    'Escolham uma expressão útil e completem com as próprias informações. Não leiam todas as linhas em ordem: esta caixa ajuda a continuar a conversa, mas não é um diálogo pronto.',
  blocks: [
    {
      number: 1,
      title: 'Começar com o tratamento adequado',
      rows: [
        { form: 'Bom dia, o senhor tem um minuto, por favor?', when: 'para falar com um funcionário ou com uma pessoa desconhecida', register: 'o senhor · cortês' },
        { form: 'Com licença, eu vim falar sobre …', when: 'para explicar logo o motivo da conversa', register: 'você/o senhor · cortês' },
        { form: 'Oi, você pode falar um minutinho?', when: 'com colega, amigo ou vizinho conhecido', register: 'você · cotidiano' },
        { form: 'Bom dia, como posso ajudar?', when: 'quando o funcionário começa o atendimento', register: 'atendimento · cortês', tag: '[grants]' },
      ],
      tail: 'Confiram a relação indicada na ficha. Mantenham você ou o senhor/a senhora durante toda a conversa.',
    },
    {
      number: 2,
      title: 'Pedir repetição e confirmar o sentido',
      tag: '[receives]',
      rows: [
        { form: 'Desculpe, pode repetir mais devagar?', when: 'quando uma informação chega rápido demais', register: 'você/o senhor · cortês' },
        { form: 'O que quer dizer …?', when: 'quando uma palavra impede a compreensão', register: 'você/o senhor · comum' },
        { form: 'Se eu entendi bem, …, certo?', when: 'para reformular a informação principal', register: 'você/o senhor · neutro' },
        { form: 'Você está falando de … ou de …?', when: 'para separar duas possibilidades parecidas', register: 'você · cotidiano' },
      ],
    },
    {
      number: 3,
      title: 'Explicar de outro jeito',
      tag: '[jargon]',
      note: 'Quem usa uma palavra difícil também precisa ajudar. Não repitam apenas mais alto: mudem as palavras.',
      rows: [
        { form: 'Em outras palavras, …', when: 'para apresentar a mesma ideia de modo mais simples', register: 'você/o senhor · neutro' },
        { form: 'Não é …; é …', when: 'para corrigir uma confusão específica', register: 'você/o senhor · comum' },
        { form: 'Por exemplo, …', when: 'quando um exemplo curto ajuda mais que uma definição', register: 'você/o senhor · neutro' },
        { form: 'Quando eu digo …, quero dizer …', when: 'para explicar uma regra ou palavra do serviço', register: 'você/o senhor · neutro' },
      ],
    },
    {
      number: 4,
      title: 'Dar um motivo e indicar uma necessidade',
      rows: [
        { form: '… porque …', when: 'para dar um motivo pessoal e direto', register: 'você/o senhor · comum' },
        { form: 'Como …, eu preciso de …', when: 'para apresentar a situação antes do pedido', register: 'você/o senhor · neutro' },
        { form: 'O problema é que …', when: 'para indicar o principal obstáculo', register: 'você/o senhor · comum' },
        { form: 'Isso é importante para mim porque …', when: 'para explicar o que pode ser perdido', register: 'você/o senhor · comum' },
      ],
    },
    {
      number: 5,
      title: 'Recusar e colocar um limite',
      tag: '[grants]',
      rows: [
        { form: 'Sinto muito, mas isso não é possível.', when: 'para recusar uma opção, não a pessoa', register: 'você/o senhor · cortês' },
        { form: 'Posso chegar até …, mas não posso passar disso.', when: 'para indicar limite de preço, horário ou quantidade', register: 'você/o senhor · neutro' },
        { form: 'Por enquanto, não posso …', when: 'para limitar uma ação à situação atual', register: 'você/o senhor · neutro' },
        { form: 'Essa solução não funciona para mim porque …', when: 'para recusar com um motivo verificável', register: 'você/o senhor · neutro' },
      ],
    },
    {
      number: 6,
      title: 'Propor uma condição ou alternativa',
      rows: [
        { form: 'Se …, podemos …', when: 'para ligar a solução a um fato que precisa ser confirmado', register: 'você/o senhor · comum' },
        { form: 'Outra possibilidade seria …', when: 'para abrir uma segunda opção', register: 'você/o senhor · cortês' },
        { form: 'Em vez de …, eu proponho …', when: 'para substituir uma opção impossível', register: 'você/o senhor · neutro' },
        { form: 'Essa solução estaria boa para o senhor?', when: 'para saber se a condição é aceitável', register: 'o senhor · cortês', tag: '[grants]' },
      ],
    },
    {
      number: 7,
      title: 'Ganhar tempo e combinar o próximo passo',
      rows: [
        { form: 'Um momento, vou verificar agora.', when: 'antes de consultar um documento ou uma regra', register: 'você/o senhor · neutro' },
        { form: 'Preciso de alguns minutos para decidir.', when: 'quando não é possível responder imediatamente', register: 'você/o senhor · neutro' },
        { form: 'Vou dar uma resposta até …', when: 'para prometer novo contato com horário preciso', register: 'você/o senhor · neutro' },
        { form: 'Primeiro fazemos …; depois, …', when: 'para dividir duas ações no tempo', register: 'você/o senhor · comum' },
      ],
      tail: 'Não inventem uma resposta. Digam quem vai verificar, qual informação falta e quando a resposta vai chegar.',
    },
    {
      number: 8,
      title: 'Confirmar e encerrar',
      rows: [
        { form: 'Certo, então vamos escolher …', when: 'para dizer qual opção foi realmente escolhida', register: 'você/o senhor · comum' },
        { form: 'Só para confirmar: …, está certo?', when: 'para conferir os dados com palavras próprias', register: 'você/o senhor · neutro' },
        { form: 'Quem vai fazer o quê, e até que horas?', when: 'para atribuir a ação e o prazo', register: 'você/o senhor · neutro' },
        { form: 'Obrigado pela ajuda. Então nos vemos às …', when: 'para terminar depois de combinar o próximo contato', register: 'você/o senhor · cortês' },
      ],
      tail: 'Um simples “tá bom” não basta. As duas pessoas precisam repetir a mesma opção, o responsável e o horário.',
    },
  ],
}
