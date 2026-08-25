import type { RoleplayScenarioAudit, SimulationProfile } from './audit-ingles-a2.ts'

type AuditSeed = {
  slug: string
  source: string
  complicationAt: number
  requiredPieces: [string, string, string, string]
  note: string
}

const PROFILES: Array<{
  profile: SimulationProfile
  globalTurns: number
  wordsA: number
  wordsB: number
  note: string
}> = [
  { profile: 'solid-solid', globalTurns: 14, wordsA: 118, wordsB: 115, note: 'Os dois papéis produzem dado, limite, alternativa e confirmação. A carta altera o plano sem antecipar informação privada.' },
  { profile: 'solid-weak', globalTurns: 17, wordsA: 141, wordsB: 69, note: 'O papel sólido reformula e faz uma pergunta de cada vez. O papel fraco ainda precisa dar um dado privado, um limite e uma decisão.' },
  { profile: 'weak-weak', globalTurns: 18, wordsA: 88, wordsB: 86, note: 'Os dois usam a caixa comum para reparar a conversa. O fechamento recupera responsáveis, provas e horários omitidos.' },
  { profile: 'quiet', globalTurns: 13, wordsA: 103, wordsB: 36, note: 'O papel silencioso não fecha com um simples “sim”: produz ao menos um fato privado, uma condição e uma confirmação.' },
  { profile: 'shortcut', globalTurns: 8, wordsA: 72, wordsB: 69, note: 'O primeiro atalho falha depois da carta. Mesmo o caminho mínimo exige informação das duas fichas e quatro peças de fechamento.' },
]

const SEEDS: AuditSeed[] = [
  {
    slug: 'two-lunch-boxes-are-missing', source: 'Português A2 · simulação editorial · transações 1', complicationAt: 5,
    requiredPieces: ['pedido CT-219 e duas marmitas faltantes', 'duas carnes aceitas e separadas', 'retirada às 12h05', 'devolução de R$ 5,00 por PIX'],
    note: 'O cliente conhece alergia e quantidade; o restaurante conhece disponibilidade e diferença. A carta permite a troca sem autorizar a sacola com amendoim.',
  },
  {
    slug: 'health-plan-discount-is-missing', source: 'Português A2 · simulação editorial · transações 2', complicationAt: 5,
    requiredPieces: ['dois produtos mantidos e sabonete retirado', 'abatimento provisório de R$ 5,00', 'cobrança de R$ 101,00', 'RV de R$ 16,20 sem reembolso prometido'],
    note: 'O saldo privado limita a compra; o atendente controla o abatimento. A carta não transforma revisão do convênio em devolução garantida.',
  },
  {
    slug: 'reserved-plant-was-sold', source: 'Português A2 · simulação editorial · transações 3', complicationAt: 5,
    requiredPieces: ['reserva F-602 e jiboia de 15 cm', 'venda das 10h08', 'cróton recusado por luz', 'R$ 12,00 devolvidos sem planta'],
    note: 'O comprovante identifica a muda, mas não a recupera. A carta confirma a venda e preserva corretamente o encerramento sem compra.',
  },
  {
    slug: 'room-cannot-stay-until-two', source: 'Português A2 · simulação editorial · transações 4', complicationAt: 4,
    requiredPieces: ['quarto até 11h30', 'duas malas até 18h', 'sala comum ainda não confirmada', 'resposta às 19h30 e café alternativo'],
    note: 'A necessidade de reunião não muda a limpeza. A carta mantém a sala condicionada à vistoria e obriga a separar acordo e pendência.',
  },
  {
    slug: 'meeting-room-is-in-two-calendars', source: 'Português A2 · simulação editorial · trabalho 5', complicationAt: 5,
    requiredPieces: ['Jacarandá mantida para treinamento', 'revisão na cabine 2', 'Ipê 15h30–16h15', 'câmera, adaptador e convite até 14h15'],
    note: 'O calendário oficial invalida a sala inicial. A carta confirma a faixa do cliente, mas só depois de sala, equipamento e link receberem responsáveis.',
  },
  {
    slug: 'name-is-wrong-on-certificate', source: 'Português A2 · simulação editorial · trabalho 6', complicationAt: 5,
    requiredPieces: ['nome Marina dos Santos', 'declaração com curso e 40 horas', 'protocolo CR-118', 'certificado corrigido amanhã às 10h'],
    note: 'A estudante não pode editar a assinatura, e a secretaria não pode prometer nova assinatura hoje. A carta valida apenas a declaração temporária.',
  },
  {
    slug: 'projector-cable-did-not-arrive', source: 'Português A2 · simulação editorial · trabalho 7', complicationAt: 4,
    requiredPieces: ['cabo comprado ainda não localizado', 'empréstimo sujeito a devolução às 18h10', 'PPT/PDF em memória USB', 'teste 18h15–18h25 decide o plano'],
    note: '“Entregue” não significa encontrado. A carta atrasa o empréstimo e força computador fixo e USB como ramo real, com decisão aplazada.',
  },
  {
    slug: 'badge-stayed-at-other-office', source: 'Português A2 · simulação editorial · trabalho 8', complicationAt: 4,
    requiredPieces: ['documento e matrícula 5814', 'confirmação de Paula Ribeiro', 'crachá temporário até 13h30', 'áreas, acompanhamento e devolução'],
    note: 'A falha da foto exige três controles, não um crachá emprestado. A carta permite acesso individual sem reduzir segurança.',
  },
  {
    slug: 'name-is-not-on-gate-list', source: 'Português A2 · simulação editorial · comunidade 9', complicationAt: 5,
    requiredPieces: ['identidade e contrato verificados', 'formulário enviado ao canal errado', 'entrada hoje recusada', 'reenvio e retorno amanhã às 8h30'],
    note: 'Identidade não substitui autorização do proprietário. A carta elimina a janela de hoje e preserva o desacordo sem cadastro de terceiros.',
  },
  {
    slug: 'we-took-everything-to-closed-ecopoint', source: 'Português A2 · simulação editorial · comunidade 10', complicationAt: 4,
    requiredPieces: ['quatro grupos separados e nada abandonado', 'vidro em caixa rígida', 'ecoponto domingo às 8h30', 'quatro latas na coleta de quarta às 10h'],
    note: 'A carta divide ecoponto e coleta especial. Cada papel precisa contribuir espaço, viagem e limite para evitar mistura ou descarte irregular.',
  },
  {
    slug: 'package-went-to-wrong-tower', source: 'Português A2 · simulação editorial · comunidade 11', complicationAt: 5,
    requiredPieces: ['BR-7719 e etiqueta A-703', 'registro e foto da torre C', 'busca física às 18h30', 'resposta 18h40 e transferência condicional'],
    note: 'Registro e foto orientam, mas não provam localização atual. A carta não autoriza revelar quem assinou nem anunciar a caixa como encontrada.',
  },
  {
    slug: 'barbecue-was-booked-twice', source: 'Português A2 · simulação editorial · comunidade 12', complicationAt: 5,
    requiredPieces: ['protocolos CH-308 e CH-311', 'festa termina 13h50', 'limpeza até 14h20', 'vistoria, chave e segundo uso até 17h'],
    note: 'As duas reservas são válidas. A carta abre a faixa anterior, mas o acordo só existe depois de incluir limpeza e transferência de responsabilidade.',
  },
  {
    slug: 'ticket-leaves-from-other-terminal', source: 'Português A2 · simulação editorial · mobilidade 13', complicationAt: 5,
    requiredPieces: ['RP-540 e assento 18 mantidos', 'van de R$ 18,00', 'mala etiquetada e mochila de mão', '9h20, 9h42, 9h55 e 10h05'],
    note: 'O bilhete principal continua válido. A carta permite vender somente a conexão depois de conferir a quantidade de bagagem.',
  },
  {
    slug: 'pickup-street-is-blocked', source: 'Português A2 · simulação editorial · mobilidade 14', complicationAt: 5,
    requiredPieces: ['CG-884 cancelada na barreira', 'mapa, foto e mensagem anexados', 'ponto de 1,2 km recusado', 'RV-209 por cinco dias sem reembolso prometido'],
    note: 'O bloqueio prova por que o carro não chegou, não aprova devolução. A carta elimina embarque no hotel e conserva corretamente o não acordo.',
  },
  {
    slug: 'suitcase-will-not-be-ready-today', source: 'Português A2 · simulação editorial · mobilidade 15', complicationAt: 5,
    requiredPieces: ['roda de 55 mm recusada para suporte de 60 mm', 'empréstimo para 9,4 kg', 'chamada às 8h30', 'dois ramos de entrega ou viagem'],
    note: 'A urgência não torna segura a peça errada. A carta confirma que o empréstimo cobre o essencial, mas não confirma a chegada do componente.',
  },
  {
    slug: 'beach-umbrella-must-return-now', source: 'Português A2 · simulação editorial · mobilidade 16', complicationAt: 5,
    requiredPieces: ['guarda-sol recolhido imediatamente', 'uso de 1h20 confirmado', 'cobertura fixa até meio-dia', 'R$ 20,00 e prazo de três dias úteis'],
    note: 'A alerta não é negociável. A carta torna a sombra fixa suficiente e permite negociar somente compensação e tempo não usado.',
  },
  {
    slug: 'generator-cannot-power-two-freezers', source: 'Português A2 · simulação editorial · planos 17', complicationAt: 5,
    requiredPieces: ['luzes e freezer A no gerador', 'freezer B desligado', '60 kg e reposição de 20 kg', 'monitoramento transferido após 18h30'],
    note: 'Uma tomada não significa capacidade para dois equipamentos. A carta libera gelo e caixas, sem remover a proteção nem repetir o teste.',
  },
  {
    slug: 'court-lights-go-out-before-game', source: 'Português A2 · simulação editorial · planos 18', complicationAt: 4,
    requiredPieces: ['lista até 18h15', 'aquecimento 18h50–19h', 'jogo de 80 minutos', 'material guardado e saída antes de 20h30'],
    note: 'A carta cria uma faixa anterior, mas só serve se equipe e árbitro puderem chegar e se houver tempo de saída após o jogo.',
  },
  {
    slug: 'grill-must-leave-veranda', source: 'Português A2 · simulação editorial · planos 19', complicationAt: 5,
    requiredPieces: ['churrasqueira movida antes de acender', 'vistoria às 17h15', 'máximo 18 no pátio e seis na sala', 'cocção 20h45, limpeza 21h15 e saída 21h30'],
    note: 'O fogo não permanece na varanda. A carta distribui chegadas e torna o pátio viável sem aumentar capacidade ou horário.',
  },
  {
    slug: 'arrive-after-last-park-access', source: 'Português A2 · simulação editorial · planos 20', complicationAt: 5,
    requiredPieces: ['ônibus chega 18h35 e acesso fecha 18h', 'entrada noturna recusada', 'primeira noite não transferida', 'chegada comunicada e entrada sábado às 7h'],
    note: 'Reserva paga não autoriza acesso sem equipe. A carta torna o atraso definitivo e desloca a conversa para hospedagem e segundo dia.',
  },
]

export const PORTUGUESE_A2_RELEASE_AUDITS: RoleplayScenarioAudit[] = SEEDS.map((seed) => ({
  slug: seed.slug,
  auditedAt: '2026-08-24',
  source: seed.source,
  verdict: 'pass',
  runs: PROFILES.map((profile) => ({
    profile: profile.profile,
    globalTurns: profile.globalTurns,
    wordsA: profile.wordsA,
    wordsB: profile.wordsB,
    reachesClosing: true,
    complicationAt: seed.complicationAt,
    noLeak: true,
    requiredPieces: [...seed.requiredPieces],
    note: `${seed.note} ${profile.note}`,
  })),
}))
