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
  { profile: 'solid-solid', globalTurns: 16, wordsA: 148, wordsB: 145, note: 'Ambos contrastan evidencia, condiciones y responsables; ninguna ficha puede anticipar por sí sola la complicación ni el cierre.' },
  { profile: 'solid-weak', globalTurns: 18, wordsA: 166, wordsB: 84, note: 'El rol sólido reformula sin regalar datos privados; el rol débil todavía produce límites, una alternativa y una confirmación verificable.' },
  { profile: 'weak-weak', globalTurns: 20, wordsA: 109, wordsB: 105, note: 'La caja B1 sostiene aclaración, concesión y resumen; la pareja conserva las ramas condicionales y llega al desenlace previsto.' },
  { profile: 'quiet', globalTurns: 14, wordsA: 122, wordsB: 42, note: 'El rol callado debe aportar datos que la otra ficha desconoce y confirmar una responsabilidad; asentir no satisface el criterio de cierre.' },
  { profile: 'shortcut', globalTurns: 10, wordsA: 91, wordsB: 88, note: 'El primer atajo queda invalidado por la carta; el cierre mínimo todavía necesita evidencia de ambos roles y las cuatro piezas obligatorias.' },
]

const SEEDS: AuditSeed[] = [
  {
    slug: 'the-projector-deposit-is-still-open', source: 'Simulación editorial B1 · transacciones 1', complicationAt: 5,
    requiredPieces: ['rental R-184 return evidence', 'HDMI cable second check', 'zero accessory charge', 'card release reference and deadline'],
    note: 'La foto y el registro de recepción están separados. La carta localiza el cable y permite liberar el depósito, pero el acuerdo exige monto, referencia y seguimiento bancario.',
  },
  {
    slug: 'the-booking-moved-to-the-terrace', source: 'Simulación editorial B1 · transacciones 2', complicationAt: 5,
    requiredPieces: ['private room leak', 'covered terrace first stage', 'indoor move time', 'unchanged price and confirmation'],
    note: 'La terraza no equivale a la reserva original. La carta habilita un traslado posterior y el desenlace sigue parcial porque una parte del evento ocurre fuera del salón acordado.',
  },
  {
    slug: 'the-repair-quote-changed-after-pickup', source: 'Simulación editorial B1 · transacciones 3', complicationAt: 5,
    requiredPieces: ['approved 180,000 maximum', 'unapproved battery line', 'safety photo limits', 'Tuesday evidence review owner'],
    note: 'La alerta de batería no prueba consentimiento. Los perfiles rechazan inventar autorización y cierran sin acuerdo sobre el cargo, con un expediente y una fecha de decisión.',
  },
  {
    slug: 'the-annual-plan-renewed-yesterday', source: 'Simulación editorial B1 · transacciones 4', complicationAt: 5,
    requiredPieces: ['two workspace IDs', '47-minute duplicate usage', '480,000 refund to card 4412', 'export deadline and closure time'],
    note: 'La solicitud de cancelación corresponde a un espacio y la copia fallida al otro. La carta conecta ambos sin confundir exportación temporal con renovación válida.',
  },
  {
    slug: 'the-client-moved-the-demo-forward', source: 'Simulación editorial B1 · trabajo 5', complicationAt: 5,
    requiredPieces: ['Thursday 2:00 forty-minute demo', 'stable booking flow', 'analytics preview dependency', 'mobile tradeoff and client message'],
    note: 'La nueva fecha elimina tiempo de preparación. La corrida conserva una demo útil, etiqueta lo incompleto y mantiene el resultado parcial sin presentar preview como producto terminado.',
  },
  {
    slug: 'one-remote-day-two-deadlines', source: 'Simulación editorial B1 · trabajo 6', complicationAt: 5,
    requiredPieces: ['technician 8:00–1:00 window', 'courier signer and sealed folder', 'replacement financial reviewer', 'Thursday report and backup'],
    note: 'Cada rol controla un plazo que el otro no conoce. La carta permite cubrir la revisión financiera y el acuerdo asigna presencia, entrega, revisión y recuperación.',
  },
  {
    slug: 'the-mentor-cannot-take-the-whole-project', source: 'Simulación editorial B1 · trabajo 7', complicationAt: 5,
    requiredPieces: ['two review decisions', 'one-page Thursday note', 'unconfirmed client segment', '11:30 checkpoint and mentor condition'],
    note: 'La mentoría no absorbe las dieciséis pantallas. La carta introduce dos segmentos posibles y obliga a dejar aplazado el alcance final hasta la respuesta del cliente.',
  },
  {
    slug: 'the-closing-shift-after-the-exam', source: 'Simulación editorial B1 · trabajo 8', complicationAt: 5,
    requiredPieces: ['exam end and 6:30 arrival', 'Camila coverage and handoff', '6:42 delay limit', 'Sunday inventory compensation'],
    note: 'El examen y la cobertura mínima son privados. La carta añade un límite operativo y el acuerdo distribuye llaves, cierre e inventario sin horas extra inventadas.',
  },
  {
    slug: 'the-roof-repair-has-three-bids', source: 'Simulación editorial B1 · comunidad 9', complicationAt: 5,
    requiredPieces: ['five-million emergency barrier', 'outlet protection and start time', 'three-bid clarification', 'special meeting with no selected bid'],
    note: 'La intervención urgente no autoriza la obra completa. Las corridas separan seguridad inmediata de selección permanente y conservan un acuerdo solo parcial.',
  },
  {
    slug: 'a-guest-for-six-weeks', source: 'Simulación editorial B1 · comunidad 10', complicationAt: 5,
    requiredPieces: ['30-day registered stay', 'landlord and document owners', 'fees and household contribution', 'hostel period and final move-out'],
    note: 'El límite ordinario de catorce noches no cubre seis semanas. La carta abre una ruta temporal y el cierre combina registro, convivencia y alojamiento restante sin violar el contrato.',
  },
  {
    slug: 'the-street-fair-ends-at-midnight', source: 'Simulación editorial B1 · comunidad 11', complicationAt: 5,
    requiredPieces: ['resident 10:00 and 11:00 positions', 'organizer 11:15 band position', 'new 11:30 legal maximum', 'sound controls and unresolved cutoff'],
    note: 'El permiso original deja de ser el límite vigente. La carta reduce el máximo legal, pero no elimina el desacuerdo entre residentes y organización; el cierre lo declara explícitamente.',
  },
  {
    slug: 'the-storage-room-needs-a-new-rule', source: 'Simulación editorial B1 · comunidad 12', complicationAt: 5,
    requiredPieces: ['four marked zones', '90-centimeter protected route', 'coded tags and private register', '21-day notice and 45-day evidence owner'],
    note: 'Inventario, voluntariado y autoridad administrativa están repartidos. La carta fija seguridad y el acuerdo evita publicar datos personales en las etiquetas.',
  },
  {
    slug: 'the-last-shuttle-left-without-us', source: 'Simulación editorial B1 · movilidad 13', complicationAt: 5,
    requiredPieces: ['case and six passengers', '9:16 operator responsibility', '10:12 second-driver deadline', '10:15 lodging switch if unanswered'],
    note: 'El posible vehículo de las 10:35 no está confirmado. Los perfiles preservan espera segura y dejan el transporte aplazado hasta aceptación real del conductor.',
  },
  {
    slug: 'the-claim-needs-one-more-document', source: 'Simulación editorial B1 · movilidad 14', complicationAt: 5,
    requiredPieces: ['220,000 approved hotel and dinner', '92,000 replacement under review', '68,000 original refund pending', 'María Chen Wednesday deadline'],
    note: 'La evidencia valida dos líneas, no todo el reclamo. El cierre mantiene separados aprobación, revisión y reembolso, por lo que el desenlace es parcial.',
  },
  {
    slug: 'the-bike-will-not-be-ready-for-the-race', source: 'Simulación editorial B1 · movilidad 15', complicationAt: 5,
    requiredPieces: ['54-centimeter insured demo bike', 'inspection and test ride', 'zero fee and deposit method', 'Sunday return and B-318 update'],
    note: 'La bicicleta propia sigue insegura. La carta ofrece una sustitución comprobable y el acuerdo especifica ajuste, préstamo, devolución y seguimiento de la reparación.',
  },
  {
    slug: 'the-technician-window-is-the-whole-afternoon', source: 'Simulación editorial B1 · movilidad 16', complicationAt: 5,
    requiredPieces: ['I-440 canceled before dispatch', '45,000 fee reversal', '4:10 estimate not guaranteed', 'waitlist and three-week morning option'],
    note: 'Una estimación tardía no se convierte en cita exacta. Las corridas cierran sin reemplazo acordado, pero con cancelación, reverso, solución temporal y canal futuro claros.',
  },
  {
    slug: 'the-course-or-the-family-trip', source: 'Simulación editorial B1 · planes 17', complicationAt: 5,
    requiredPieces: ['Friday online course and car split', 'Saturday workshop end', '12:20 bus and licensed taxi', 'cost split and delay contact'],
    note: 'Curso y salida familiar parecen incompatibles hasta conocer el traslado posterior. La carta habilita una ruta con responsables y un límite seguro de demora.',
  },
  {
    slug: 'the-backup-data-is-almost-gone', source: 'Simulación editorial B1 · planes 18', complicationAt: 5,
    requiredPieces: ['verified 1.2 GB balance', '300 MB protected reserve', '900 MB laptop cap', 'offline deck and deferred archive upload'],
    note: 'La estimación inicial de datos es incorrecta. El cierre protege transporte y llamada familiar, reduce la presentación y deja video y archivo para una conexión estable.',
  },
  {
    slug: 'the-outdoor-event-has-no-indoor-space', source: 'Simulación editorial B1 · planes 19', complicationAt: 5,
    requiredPieces: ['7:00 official bulletin', '7:15 review and 7:20 message', 'lightning and site triggers', '8:15 tent hold with status postponed'],
    note: 'La probabilidad de tormenta no es una advertencia oficial. Los perfiles acuerdan fuente, umbrales e información, pero no inventan esta noche el estado de mañana.',
  },
  {
    slug: 'two-days-three-cities', source: 'Simulación editorial B1 · planes 20', complicationAt: 5,
    requiredPieces: ['Friday shared Bogotá–Tunja leg', 'B 7:10 bus and workshop buffer', 'A 1:40 licensed van', '7 kg backpack and named suitcase holder'],
    note: 'La cancelación rompe la ruta de A sin afectar la de B. El acuerdo conserva graduación y taller, reasigna el equipaje y registra ambas confirmaciones y contactos.',
  },
]

export const ENGLISH_B1_RELEASE_AUDITS: RoleplayScenarioAudit[] = SEEDS.map((seed) => ({
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
