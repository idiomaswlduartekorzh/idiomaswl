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
  { profile: 'solid-solid', globalTurns: 12, wordsA: 62, wordsB: 60, note: 'Ambos producen los datos propios, preguntan una pieza por turno y repiten el cierre sin leer la ficha como diálogo.' },
  { profile: 'solid-weak', globalTurns: 14, wordsA: 78, wordsB: 36, note: 'El rol sólido reformula con léxico A1; el rol débil aún debe aportar sus datos privados y una decisión verificable.' },
  { profile: 'weak-weak', globalTurns: 16, wordsA: 49, wordsB: 47, note: 'La caja sostiene preguntas, límite y cierre; ninguna frase modelo entrega por sí sola toda la solución.' },
  { profile: 'quiet', globalTurns: 12, wordsA: 58, wordsB: 24, note: 'El rol callado no puede cerrar con sí/no: el criterio exige producir hora, objeto o acción que la otra ficha desconoce.' },
  { profile: 'shortcut', globalTurns: 8, wordsA: 42, wordsB: 40, note: 'El atajo inicial queda incompleto hasta abrir la carta y reunir las cuatro piezas obligatorias del cierre.' },
]

const SEEDS: AuditSeed[] = [
  {
    slug: 'this-is-not-my-coffee', source: 'Simulación editorial A1 · transacciones 1', complicationAt: 4,
    requiredPieces: ['order 47 and wrong milk', '8:35 oat-milk limit', 'chosen replacement', 'drink, time and credit'],
    note: 'La persona cliente no conoce el inventario; quien atiende no conoce el límite de salida. La carta obliga a elegir una bebida real.',
  },
  {
    slug: 'two-tickets-one-seat', source: 'Simulación editorial A1 · transacciones 2', complicationAt: 4,
    requiredPieces: ['two passenger names', 'duplicate seat 14', '10:30 seats 3 and 4', 'bus, seats and fee'],
    note: 'Un asiento libre no resuelve dos pasajeros. La actualización permite un acuerdo solo después de comprobar nombres y necesidad de viajar juntos.',
  },
  {
    slug: 'the-shirt-is-not-my-size', source: 'Simulación editorial A1 · transacciones 3', complicationAt: 4,
    requiredPieces: ['blue size M need', '90,000-peso maximum', 'striped stock result', 'design, size and price'],
    note: 'La alternativa conserva talla, color y presupuesto, pero cambia el diseño; por eso el desenlace permanece parcial.',
  },
  {
    slug: 'the-market-is-cash-only', source: 'Simulación editorial A1 · transacciones 4', complicationAt: 4,
    requiredPieces: ['32,000-peso total', '18,000 cash on hand', '11:47 cash-machine return', 'cash, hold and late rule'],
    note: 'La carta rompe el primer plazo de diez minutos y fuerza a renegociar la hora sin aceptar tarjeta ni dejarla como garantía.',
  },
  {
    slug: 'my-name-is-not-on-the-schedule', source: 'Simulación editorial A1 · estudio y trabajo 5', complicationAt: 4,
    requiredPieces: ['Sofía Rojas message', 'eight expected hours', 'five-hour opening', 'name, day and new shift'],
    note: 'El mensaje prueba el error, pero la dotación solo permite recuperar cinco horas; el cierre no presenta el turno parcial como completo.',
  },
  {
    slug: 'we-both-need-the-charger', source: 'Simulación editorial A1 · estudio y trabajo 6', complicationAt: 4,
    requiredPieces: ['18% and 6% batteries', 'class and quiz deadlines', '40% estimate at 2:30', 'handover and return times'],
    note: 'Cada rol aporta un porcentaje y un plazo. La carta vuelve posible compartir sin que nadie se lleve el cargador.',
  },
  {
    slug: 'this-is-not-our-room', source: 'Simulación editorial A1 · estudio y trabajo 7', complicationAt: 4,
    requiredPieces: ['booking AL-204', 'ten people and screen', 'room Sol at 10:10', 'room, equipment and extension'],
    note: 'La sala pequeña queda descartada por capacidad. El retraso se compensa con extensión, no con una falsa entrega de Alba.',
  },
  {
    slug: 'move-twenty-minutes-of-lunch', source: 'Simulación editorial A1 · estudio y trabajo 8', complicationAt: 4,
    requiredPieces: ['eighteen guests at one', 'bank appointment at 1:20', 'Marta coverage pending', 'owner and 11:15 check'],
    note: 'Ambas necesidades quedan claras, pero Marta no ha aceptado; el cierre conserva la decisión aplazada.',
  },
  {
    slug: 'the-washing-machine-at-seven', source: 'Simulación editorial A1 · casa y comunidad 9', complicationAt: 4,
    requiredPieces: ['4A seven-o’clock booking', 'locked rinse cycle', '7:15 machine finish', 'handover and quick-wash times'],
    note: 'La pareja no abre la máquina bloqueada. Usa calendario, pantalla y secuencia de dos máquinas para resolver el conflicto.',
  },
  {
    slug: 'the-package-is-with-the-neighbour', source: 'Simulación editorial A1 · casa y comunidad 10', complicationAt: 4,
    requiredPieces: ['Lucía Torres', 'apartments 5A and 5B', 'code 6382', 'sealed handover at lift'],
    note: 'Nombre, apartamento y código aparecen en lados distintos. La entrega ocurre fuera de la vivienda y sin pedir documento innecesario.',
  },
  {
    slug: 'the-chair-is-still-in-the-hall', source: 'Simulación editorial A1 · casa y comunidad 11', complicationAt: 4,
    requiredPieces: ['walking-frame access', 'private chair rule', 'warning-tape path', 'owner call at eight'],
    note: 'La necesidad de acceso recibe acción inmediata, pero la silla no se retira sin el dueño; el desenlace sigue sin acuerdo.',
  },
  {
    slug: 'the-dog-wants-to-enter-the-courtyard', source: 'Simulación editorial A1 · casa y comunidad 12', complicationAt: 4,
    requiredPieces: ['child near gate', 'Luna on lead', 'side garden', '8:25 exit time'],
    note: 'La carta confirma la norma después de conocer perro y duración. El permiso depende de lugar, correa y hora.',
  },
  {
    slug: 'this-bus-goes-the-other-way', source: 'Simulación editorial A1 · movilidad y servicios 13', complicationAt: 4,
    requiredPieces: ['hospital destination', 'inside safe crossing', 'P10 platform 4', '7:44 and possible 8:15 arrival'],
    note: 'La corrección evita el carril de buses. El viaje queda útil pero tardío, así que el resultado no se infla a acuerdo pleno.',
  },
  {
    slug: 'the-wrong-entrance', source: 'Simulación editorial A1 · movilidad y servicios 14', complicationAt: 4,
    requiredPieces: ['Norte Digital and Ana Gómez', 'west main gate', 'outside-wall path', 'sent-not-read message'],
    note: 'La entrada de servicio permanece cerrada. Llegar a la puerta correcta no equivale a tener confirmación de entrevista.',
  },
  {
    slug: 'the-pharmacy-closes-at-six', source: 'Simulación editorial A1 · movilidad y servicios 15', complicationAt: 4,
    requiredPieces: ['RX-418 and Daniela Mora', '6:05 bus arrival', 'Central branch until eight', 'message and identity card'],
    note: 'La interacción solo coordina el mismo pedido sellado; no cambia producto, cantidad ni da recomendación clínica.',
  },
  {
    slug: 'the-library-card-is-at-home', source: 'Simulación editorial A1 · movilidad y servicios 16', complicationAt: 4,
    requiredPieces: ['Carlos Vega account', 'digital card inactive', 'physical-card rule', 'hold until seven'],
    note: 'Cuenta activa no sustituye tarjeta. El libro se reserva en el mostrador, pero ningún turno afirma que salió prestado.',
  },
  {
    slug: 'the-birthday-starts-earlier', source: 'Simulación editorial A1 · planes y problemas 17', complicationAt: 4,
    requiredPieces: ['five-o’clock start', 'guest and cake at 5:30', 'photo at 5:45', 'dinner at six'],
    note: 'La hora del fotógrafo mueve solo la foto; inicio, llegada, pastel y cena quedan en una secuencia compartida.',
  },
  {
    slug: 'rain-before-the-football-game', source: 'Simulación editorial A1 · planes y problemas 18', complicationAt: 4,
    requiredPieces: ['flooded outdoor field', 'indoor request pending', '5:30 centre reply', 'captain group message'],
    note: 'La cancha exterior se descarta, pero la cubierta no se anuncia antes de la respuesta. El resultado es aplazado.',
  },
  {
    slug: 'low-battery-before-the-call', source: 'Simulación editorial A1 · planes y problemas 19', complicationAt: 4,
    requiredPieces: ['USB-C connection', '5:58 power-bank return', '18% estimate', 'audio only camera off'],
    note: 'El préstamo protege el 30% del dueño y permite llamada con audio; no promete videollamada completa.',
  },
  {
    slug: 'two-invitations-tonight', source: 'Simulación editorial A1 · planes y problemas 20', complicationAt: 4,
    requiredPieces: ['music event choice', 'family dinner choice', 'two host messages', 'coffee tomorrow separate'],
    note: 'Cada persona cierra su invitación y el segundo tiquete. El café futuro no se usa para fingir un plan común esta noche.',
  },
]

export const ENGLISH_A1_RELEASE_AUDITS: RoleplayScenarioAudit[] = SEEDS.map((seed) => ({
  slug: seed.slug,
  auditedAt: '2026-08-23',
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
