export type SimulationProfile =
  | 'solid-solid'
  | 'solid-weak'
  | 'weak-weak'
  | 'quiet'
  | 'shortcut'

export type RoleplaySimulationRun = {
  profile: SimulationProfile
  globalTurns: number
  wordsA: number
  wordsB: number
  reachesClosing: boolean
  complicationAt: number
  noLeak: boolean
  requiredPieces: string[]
  note: string
}

export type RoleplayScenarioAudit = {
  slug: string
  auditedAt: string
  source: string
  verdict: 'pass' | 'revise'
  runs: RoleplaySimulationRun[]
}

/**
 * Evidencia de simulación del candidato inglés A2.
 *
 * Las palabras se cuentan sobre lo producido por cada rol, sin el texto de la ficha ni
 * el cierre impreso. `noLeak` significa que ningún rol usó un dato privado antes de oírlo.
 * El guardián de release exige cinco perfiles y no admite un escenario ausente.
 */
export const ENGLISH_A2_RELEASE_AUDITS: RoleplayScenarioAudit[] = [
  {
    slug: 'the-blender-was-a-gift',
    auditedAt: '2026-08-23',
    source: 'Simulación editorial · tanda 1 · escenario 4',
    verdict: 'pass',
    runs: [
      { profile: 'solid-solid', globalTurns: 14, wordsA: 128, wordsB: 121, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['fault after 20 seconds', 'registry phone ending 8842', 'store-credit preference', 'four-part release close'], note: 'La búsqueda del registro aparece después de que B explica el regalo; A no adivina la tía. La carta cambia refund por exchange/credit sin resolver la preferencia de B.' },
      { profile: 'solid-weak', globalTurns: 17, wordsA: 154, wordsB: 72, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['hot motor', 'no receipt', 'buyer phone', 'credit by email'], note: 'A reformula faulty como not working y pregunta una pieza por turno. B llega al cierre usando “I prefer store credit” y repite responsable y hora.' },
      { profile: 'weak-weak', globalTurns: 18, wordsA: 96, wordsB: 88, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['blender stopped', 'gift registry', 'manager before 6', 'solution and time'], note: 'La tabla no funciona como guion: ambos vuelven a checking/offering. El vocabulario motor, receipt y registry evita tres fugas previsibles al español.' },
      { profile: 'quiet', globalTurns: 13, wordsA: 111, wordsB: 35, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['motor smelled hot', 'aunt phone digits', 'preference for credit', 'Saturday deadline'], note: 'B no puede cerrar asintiendo: debe producir el fallo, el dato de búsqueda y la preferencia para que A elija la ruta del gerente.' },
      { profile: 'shortcut', globalTurns: 8, wordsA: 74, wordsB: 69, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['serial-number check', 'registry result', 'chosen remedy', 'owner and time'], note: 'El atajista intenta pedir refund en B1, pero no puede conocer la excepción ni elegir credit antes de la carta. El cierre más corto queda en ocho turnos globales.' },
    ],
  },
  {
    slug: 'the-slides-are-not-ready',
    auditedAt: '2026-08-23',
    source: 'Simulación editorial · tanda 1 · escenario 7',
    verdict: 'pass',
    runs: [
      { profile: 'solid-solid', globalTurns: 16, wordsA: 139, wordsB: 143, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['different date ranges', 'four-slide estimate', 'client moved to 3:00', 'owners and checkpoint'], note: 'A protege la cifra antes de que B conozca el problema; B revela la duración de diseño. La carta obliga a cortar alcance, no solo a hablar más rápido.' },
      { profile: 'solid-weak', globalTurns: 18, wordsA: 151, wordsB: 79, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['unchecked total', 'forty-minute estimate', 'no external links', 'four slide messages'], note: 'A sólido divide problem/evidence/recommendation/budget. B flojo usa su tabla por función y logra pedir texto final, estimar y tomar dos secciones.' },
      { profile: 'weak-weak', globalTurns: 18, wordsA: 101, wordsB: 97, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['Ana check window', 'practice minimum', 'new client time', '3:00 restart plan'], note: 'Los dos necesitan el cierre escrito para detectar que habían omitido la práctica. Ninguna fila de exponentes, leída en orden, produce por sí sola el reparto de cuatro slides.' },
      { profile: 'quiet', globalTurns: 15, wordsA: 44, wordsB: 128, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['two date ranges', 'A refuses budget section', 'A checks Ana', 'A names own slides'], note: 'A callado no puede aprobar en silencio porque solo A tiene el error de fechas y debe producir qué número detiene y qué sección presenta.' },
      { profile: 'shortcut', globalTurns: 9, wordsA: 82, wordsB: 86, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['card constraint', 'four-slide cap', 'embedded chart', 'checkpoint'], note: 'El atajista propone usar la plantilla completa en A1, pero la carta y el dato de 40 minutos impiden cerrar antes de elegir cuatro mensajes y responsables.' },
    ],
  },
  {
    slug: 'the-order-goes-out-today',
    auditedAt: '2026-08-23',
    source: 'Simulación editorial · tanda 1 · escenario 8',
    verdict: 'pass',
    runs: [
      { profile: 'solid-solid', globalTurns: 16, wordsA: 137, wordsB: 132, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['purple test result', 'minimum forty menus', 'supplier 5:30 uncertainty', 'two checkpoint branches'], note: 'B no revela que cuarenta bastan hasta que A demuestra el fallo. La carta elimina la promesa de hoy y convierte el cierre en regla de decisión.' },
      { profile: 'solid-weak', globalTurns: 18, wordsA: 162, wordsB: 75, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['test print', 'forty by lunch', 'final sample condition', 'call even with bad news'], note: 'A reformula matte como not shiny y separa material de producción. B flojo produce cantidad y límite de color; no acepta un “tomorrow” sin hora.' },
      { profile: 'weak-weak', globalTurns: 18, wordsA: 98, wordsB: 94, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['wrong colour', 'lighter-paper discount', '40/160 split', '11:45 checkpoint'], note: 'La pareja llega a un aplazado, no a una falsa entrega. El criterio de cierre recupera las dos ramas cuando ambos intentan cerrar con “call tomorrow”.' },
      { profile: 'quiet', globalTurns: 14, wordsA: 119, wordsB: 39, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['B rejects purple', 'B states forty minimum', 'B keeps final-sample payment', 'B confirms opening time'], note: 'B debe producir color, cantidad y pago; asentir a la propuesta de A no satisface el cierre ni su propio criterio de éxito.' },
      { profile: 'shortcut', globalTurns: 8, wordsA: 76, wordsB: 81, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['visible test', 'supplier message', 'minimum quantity', 'if/if-not branches'], note: 'B intenta ordenar el papel ligero de inmediato, pero no puede cerrar el precio ni el mínimo sin la evidencia y la carta. Ocho turnos es el camino mínimo.' },
    ],
  },
]
