import { createPronounQuest } from './create-pronoun-quest.ts'
import { authorPronounSeed } from './pronoun-quest-authoring.ts'
import type { PronounPreset, PronounTopicOption } from './pronoun-quest-types'

export type PortuguesePronounTopic = 'sujeito' | 'tonicos' | 'diretos' | 'indiretos' | 'reflexivos' | 'demonstrativos' | 'possessivos'

const TOPICS: readonly PronounTopicOption<PortuguesePronounTopic>[] = [
  { id: 'sujeito', label: 'Pronombres sujeto', group: 'Referente', level: 'A1' },
  { id: 'tonicos', label: 'Formas con preposición', group: 'Complementos', level: 'A1–A2' },
  { id: 'diretos', label: 'Objeto directo', group: 'Complementos', level: 'A2' },
  { id: 'indiretos', label: 'Objeto indirecto', group: 'Complementos', level: 'A2' },
  { id: 'reflexivos', label: 'Reflexivos', group: 'Posición', level: 'A2' },
  { id: 'demonstrativos', label: 'Demostrativos', group: 'Referencia', level: 'A1' },
  { id: 'possessivos', label: 'Posesivos', group: 'Concordancia', level: 'A1–A2' },
]

const PRESETS: readonly PronounPreset<PortuguesePronounTopic>[] = [
  { label: 'Base A1', ids: ['sujeito', 'demonstrativos', 'possessivos'] },
  { label: 'Complementos', ids: ['tonicos', 'diretos', 'indiretos'] },
  { label: 'Posición', ids: ['reflexivos'] },
  { label: 'Todo', ids: TOPICS.map((topic) => topic.id) },
]

const SEEDS = [
  authorPronounSeed({ id: 'sujeito', explanation: 'En el portugués brasileño, eu, você, ele/ela, nós, vocês y eles/elas funcionan como sujeto. Você exige verbo en tercera persona.', functionAnswer: 'sujeto de la oración', functionDistractors: ['objeto directo', 'forma preposicional', 'posesivo'], examples: [
    { context: 'A Júlia trabalha aqui; ___ atende os clientes.', answer: 'ela', distractors: ['a', 'lhe', 'dela'], cue: 'Júlia es singular y realiza la acción.', wrong: 'a', transform: ['Sustituye “Paulo e eu”.', 'Nós organizamos o evento.', ['A gente organizamos o evento.', 'Eles organizamos o evento.', 'Nos organizamos o evento.']] },
    { context: 'Senhor Costa, ___ precisa de ajuda?', answer: 'o senhor', distractors: ['você precisa', 'lhe', 'seu'], cue: 'El tratamiento respetuoso funciona como sujeto y usa tercera persona.', wrong: 'lhe', transform: ['Usa você con el verbo correcto.', 'Você conhece a cidade?', ['Você conheces a cidade?', 'Te conhece a cidade?', 'Você conhecer a cidade?']] },
    { context: 'Os convites chegaram; ___ estão na mesa.', answer: 'eles', distractors: ['os', 'lhes', 'elas'], cue: 'Convites es masculino plural y sujeto.', wrong: 'os', transform: ['Sustituye “Marina e Luísa”.', 'Elas chegam amanhã.', ['Eles chegam amanhã.', 'As chegam amanhã.', 'Elas chega amanhã.']] },
  ], final: { before: 'A Marina conhece o espaço; ', after: ' recebe os fornecedores. ', answer: 'ela' } }),
  authorPronounSeed({ id: 'tonicos', explanation: 'Después de preposición se usan mim, ti, ele/ela, nós y ellos; conmigo, contigo y consigo son formas fusionadas. Entre el sujeto y un infinitivo se usa eu/tu.', functionAnswer: 'forma tónica regida por preposición', functionDistractors: ['clítico directo', 'clítico indirecto', 'pronombre sujeto sin régimen'], examples: [
    { context: 'Este presente é para ___.', answer: 'mim', distractors: ['eu', 'me', 'meu'], cue: 'Para rige la forma mim y no hay infinitivo con sujeto propio.', wrong: 'eu', transform: ['Expresa “conmigo”.', 'Você pode vir comigo.', ['Você pode vir com eu.', 'Você pode vir com mim.', 'Você me pode vir.']] },
    { context: 'Entre mim e ___, o prazo é curto.', answer: 'você', distractors: ['te', 'lhe', 'seu'], cue: 'Después de entre se necesita una forma que pueda seguir a preposición.', wrong: 'te', transform: ['Usa eu como sujeto del infinitivo.', 'Este arquivo é para eu revisar.', ['Este arquivo é para mim revisar.', 'Este arquivo é para me reviso.', 'Este arquivo é eu para revisar.']] },
    { context: 'A gerente falou com ___ ontem.', answer: 'ele', distractors: ['o', 'lhe', 'seu'], cue: 'Com precede una forma tónica masculina.', wrong: 'o', transform: ['Expresa “sin nosotros”.', 'Eles começaram sem nós.', ['Eles começaram sem nos.', 'Eles começaram sem a gente começamos.', 'Eles nos começaram sem.']] },
  ], final: { before: 'O técnico conversa ', after: ' antes da montagem. ', answer: 'conosco' } }),
  authorPronounSeed({ id: 'diretos', explanation: 'En el estándar escrito, o, a, os y as sustituyen objetos directos. En el portugués brasileño hablado también se oyen ele/ela, pero aquí se practica la norma formal.', functionAnswer: 'objeto directo sin preposición', functionDistractors: ['objeto indirecto', 'sujeto', 'posesivo'], examples: [
    { context: 'O contrato está pronto; eu ___ assino agora.', answer: 'o', distractors: ['lhe', 'ele', 'seu'], cue: 'Contrato es masculino singular y recibe directamente la acción.', wrong: 'lhe', transform: ['Sustituye “a nota”.', 'Eu a conferi ontem.', ['Eu lhe conferi ontem.', 'Eu conferi-a ontem já.', 'Eu ela conferi ontem.']] },
    { context: 'As chaves? Nós ___ encontramos na recepção.', answer: 'as', distractors: ['lhes', 'elas', 'os'], cue: 'Chaves es femenino plural y objeto directo.', wrong: 'lhes', transform: ['Sustituye “os formulários” tras un infinitivo.', 'Vamos preenchê-los hoje.', ['Vamos preencher-lhes hoje.', 'Vamos os preencher hoje.', 'Vamos preenchê-las hoje.']] },
    { context: 'Você conhece o Paulo? Sim, eu ___ conheço.', answer: 'o', distractors: ['lhe', 'ele', 'se'], cue: 'Conhecer selecciona objeto directo.', wrong: 'lhe', transform: ['Sustituye “a Ana” con una forma escrita estándar.', 'Eu a encontrei cedo.', ['Eu lhe encontrei cedo.', 'Eu ela encontrei cedo.', 'Eu se encontrei cedo.']] },
  ], final: { before: 'A lista está correta; eu ', after: ' envio às seis. ', answer: 'a' } }),
  authorPronounSeed({ id: 'indiretos', explanation: 'Lhe y lhes representan un destinatario de tercera persona con verbos que rigen a; me, te y nos también pueden cumplir función indirecta.', functionAnswer: 'objeto indirecto o destinatario', functionDistractors: ['objeto directo', 'pronombre sujeto', 'demostrativo'], examples: [
    { context: 'Telefono ao Rui e ___ explico o problema.', answer: 'lhe', distractors: ['o', 'ele', 'se'], cue: 'Rui es el destinatario singular de explicar.', wrong: 'o', transform: ['Sustituye “aos clientes”.', 'Nós lhes enviamos a confirmação.', ['Nós os enviamos a confirmação.', 'Nós enviamos-lhes os clientes.', 'Nós eles enviamos a confirmação.']] },
    { context: 'Se você tiver tempo, pode ___ responder hoje?', answer: 'me', distractors: ['mim', 'eu', 'o'], cue: 'La persona que habla es destinataria de responder.', wrong: 'mim', transform: ['Sustituye “a nós”.', 'A guia nos mostrou a sala.', ['A guia nós mostrou a sala.', 'A guia mostrou-nos a nós sala.', 'A guia os mostrou a sala.']] },
    { context: 'A professora entregou-___ os certificados.', answer: 'lhes', distractors: ['os', 'eles', 'lhe'], cue: 'El destinatario son varias personas.', wrong: 'os', transform: ['Sustituye “a você”.', 'Eu lhe mando o endereço.', ['Eu o mando o endereço.', 'Eu você mando o endereço.', 'Eu lhe mando você.']] },
  ], final: { before: 'Os voluntários precisam do mapa; nós ', after: ' damos uma cópia. ', answer: 'lhes' } }),
  authorPronounSeed({ id: 'reflexivos', explanation: 'Me, te, se y nos pueden remitir al sujeto. Con você y vocês se usa se; a si mesmo ayuda a desambiguar énfasis reflexivo.', functionAnswer: 'pronombre reflexivo ligado al sujeto', functionDistractors: ['objeto directo independiente', 'posesivo', 'demostrativo'], examples: [
    { context: 'Eu ___ preparo antes das sete.', answer: 'me', distractors: ['mim', 'se', 'eu'], cue: 'El sujeto eu exige me.', wrong: 'mim', transform: ['Cambia el sujeto a nós.', 'Nós nos preparamos cedo.', ['Nós se preparamos cedo.', 'Nós nos prepara cedo.', 'A gente nos preparamos cedo.']] },
    { context: 'A Clara ___ viu no espelho.', answer: 'se', distractors: ['a', 'lhe', 'ela'], cue: 'Clara ve a la misma persona que funciona como sujeto.', wrong: 'a', transform: ['Cambia a vocês.', 'Vocês se encontram na entrada.', ['Vocês nos encontram na entrada.', 'Vocês se encontra na entrada.', 'Vocês lhes encontram na entrada.']] },
    { context: 'O diretor culpou ___ mesmo pelo atraso.', answer: 'a si', distractors: ['ele', 'o', 'lhe'], cue: 'La locución reflexiva enfatiza que el director se culpó a sí mismo.', wrong: 'ele', transform: ['Haz explícita la lectura reflexiva de ela.', 'Ela escreveu uma carta para si mesma.', ['Ela escreveu uma carta para ela mesma pessoa.', 'Ela se escreveu uma carta dela.', 'Ela escreveu-se para uma carta.']] },
  ], final: { before: 'Antes de abrir as portas, todos ', after: ' reúnem no salão. ', answer: 'se' } }),
  authorPronounSeed({ id: 'demonstrativos', explanation: 'Este/esta/isto se asocia al hablante; esse/essa/isso al interlocutor o a algo ya mencionado; aquele/aquela/aquilo marca distancia.', functionAnswer: 'demostrativo según distancia o discurso', functionDistractors: ['pronombre personal', 'posesivo', 'objeto indirecto'], examples: [
    { context: '___ documento aqui na minha mão já está assinado.', answer: 'Este', distractors: ['Esse', 'Aquele', 'Isto'], cue: 'El nombre es masculino singular y está junto al hablante.', wrong: 'Isto', transform: ['Señala sin nombre una idea que acaba de mencionar el interlocutor.', 'Isso é importante.', ['Esse é importante coisa.', 'Isto aí é importantes.', 'Aquela é importante assunto.']] },
    { context: 'Pode me passar ___ caneta aí perto de você?', answer: 'essa', distractors: ['esta', 'aquela', 'isso'], cue: 'Caneta está cerca del interlocutor y es femenino.', wrong: 'isso', transform: ['Señala varios edificios lejanos.', 'Aqueles prédios são antigos.', ['Aquele prédios são antigos.', 'Aquelas prédios são antigos.', 'Aquilo prédios são antigos.']] },
    { context: 'Naquela montanha distante, você vê ___?', answer: 'aquilo', distractors: ['aquele', 'isto', 'essa'], cue: 'Se señala algo lejano sin nombrarlo ni asignarle género.', wrong: 'aquele', transform: ['Retoma un sustantivo femenino ya mencionado.', 'Essa proposta parece melhor.', ['Esse proposta parece melhor.', 'Isso proposta parece melhor.', 'Esta propostas parece melhor.']] },
  ], final: { before: 'Há duas caixas perto de você; abra ', after: ' com a etiqueta azul. ', answer: 'essa' } }),
  authorPronounSeed({ id: 'possessivos', explanation: 'Meu, seu, nosso y sus variantes concuerdan con lo poseído. En Brasil, dele/dela aclara el poseedor cuando seu/sua sería ambiguo.', functionAnswer: 'posesivo que concuerda con lo poseído', functionDistractors: ['pronombre objeto', 'demostrativo', 'sujeto'], examples: [
    { context: 'A Júlia trouxe ___ caderno.', answer: 'o seu', distractors: ['a sua', 'o dela de você', 'lhe'], cue: 'Caderno es masculino singular; el posesivo concuerda con él.', wrong: 'a sua', transform: ['Cambia lo poseído a plural femenino.', 'As minhas chaves estão aqui.', ['Os meus chaves estão aqui.', 'As meu chaves estão aqui.', 'Minhas chave está aqui.']] },
    { context: 'Nós já enviamos ___ propostas.', answer: 'as nossas', distractors: ['os nossos', 'a nossa', 'as suas'], cue: 'Propostas es femenino plural y pertenece a nós.', wrong: 'os nossos', transform: ['Evita ambigüedad: “el carro de Pedro”.', 'O carro dele é novo.', ['O seu carro dele é novo.', 'O carro seu Pedro é novo.', 'O carro lhe é novo.']] },
    { context: 'Este ingresso é meu; aquele é ___.', answer: 'dela', distractors: ['sua ingresso', 'a dela ingresso', 'lhe'], cue: 'Dela sustituye “o ingresso dela” y aclara que pertenece a ella.', wrong: 'sua ingresso', transform: ['Sustituye “a nossa mesa”.', 'A nossa fica perto da janela.', ['O nosso fica perto da janela.', 'Nossa mesa a fica perto.', 'A nós fica perto da janela.']] },
  ], final: { before: 'A equipe já trouxe o material dela; agora buscamos ', after: '. ', answer: 'o nosso' } }),
] as const

export const PORTUGUESE_PRONOUN_QUEST = createPronounQuest({
  id: 'portuguese-pronoun-quest', storageKey: 'wl-portuguese-pronoun-quest-v1', languageName: 'Portugués', languageCode: 'pt-BR', title: 'A trilha dos pronomes', finalTitle: 'Uma montagem, sete referências claras',
  reviewLinks: [{ href: '/practica/portugues/a1/gramatica/pronomes-pessoais', label: 'Repasar pronombres personales' }, { href: '/practica/portugues/a1/gramatica/possessivos', label: 'Repasar posesivos' }],
  topics: TOPICS, presets: PRESETS, seeds: SEEDS, finalDistractors: ['ele', 'os', 'seu'],
})
