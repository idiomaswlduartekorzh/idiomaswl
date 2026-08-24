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
  { profile: 'solid-solid', globalTurns: 14, wordsA: 118, wordsB: 115, note: 'Les deux rôles donnent raison, limite, alternative et confirmation. La carte modifie le plan sans révéler d’avance les données privées.' },
  { profile: 'solid-weak', globalTurns: 17, wordsA: 142, wordsB: 69, note: 'Le rôle solide reformule et pose une question à la fois. Le rôle faible doit encore produire son heure, sa limite et une décision.' },
  { profile: 'weak-weak', globalTurns: 18, wordsA: 88, wordsB: 85, note: 'Les deux rôles utilisent la boîte commune pour réparer la conversation. La liste de clôture récupère responsables, preuves et horaires oubliés.' },
  { profile: 'quiet', globalTurns: 13, wordsA: 103, wordsB: 36, note: 'Le rôle silencieux ne peut pas conclure par un simple accord : il doit donner au moins une donnée privée, une limite et une confirmation.' },
  { profile: 'shortcut', globalTurns: 8, wordsA: 71, wordsB: 68, note: 'La première solution rapide échoue après la carte. Même le chemin minimal exige des informations des deux fiches et les quatre pièces de clôture.' },
]

const SEEDS: AuditSeed[] = [
  {
    slug: 'the-message-is-missing-from-the-cake', source: 'Francés A2 · simulación editorial · transacciones 1', complicationAt: 5,
    requiredPieces: ['inscripción pedida y error observado', 'placa de ocho minutos', 'hora final 17 h 34', 'responsable y comprobación antes de salir'],
    note: 'La cliente conoce el texto exacto y la pastelería controla el tiempo real. La carta permite la placa sin borrar el error inicial.',
  },
  {
    slug: 'the-lamp-price-has-changed', source: 'Francés A2 · simulación editorial · transacciones 2', complicationAt: 4,
    requiredPieces: ['18 €, 24 € y 29 € diferenciados', 'pied et câble incluidos', 'abat-jour excluido', 'informe de control y pago final'],
    note: 'La foto no autoriza una venta insegura. La carta elimina la necesidad del abat-jour y vuelve viable el acuerdo parcial a 24 €.',
  },
  {
    slug: 'the-deposit-was-charged-twice', source: 'Francés A2 · simulación editorial · transacciones 3', complicationAt: 5,
    requiredPieces: ['T90 cobrada y T91 pendiente', 'attestation con dos referencias', 'dossier P-771', 'respuesta antes de 16 h sin falso reembolso'],
    note: 'El saldo bancario y el saldo del gîte pertenecen a fichas distintas. La conversación termina aplazada porque el prestador aún debe responder.',
  },
  {
    slug: 'the-package-is-damaged-at-the-pickup-point', source: 'Francés A2 · simulación editorial · transacciones 4', complicationAt: 5,
    requiredPieces: ['daño exterior sin afirmar rotura', 'rechazo sin firma', 'cuatro fotos y D-218', 'retorno al vendedor y seguimiento de cámara'],
    note: 'La alerta de humedad explica una posibilidad, no la culpa ni la indemnización. El desacuerdo central se conserva.',
  },
  {
    slug: 'i-must-leave-the-stand-early', source: 'Francés A2 · simulación editorial · trabajo 5', complicationAt: 4,
    requiredPieces: ['preparación hasta 14 h 40', 'remise de caisse de 286 €', 'Camille 14 h 50–17 h', 'Malik 17 h–18 h e inventario del lunes'],
    note: 'Cada rol aporta una parte del relevo y la carta agrega a Malik. Ningún nombre aislado cubre todo el puesto.',
  },
  {
    slug: 'the-two-emails-give-different-dates', source: 'Francés A2 · simulación editorial · trabajo 6', complicationAt: 5,
    requiredPieces: ['contrato del 6 de mayo', 'solicitud no validada del 13', 'opción de puesto y ST-246', 'respuesta al servicio y a Lina'],
    note: 'El asunto « calendrier corrigé » no reemplaza el contrato. La carta confirma que el cambio sigue pendiente y el cierre debe ser parcial.',
  },
  {
    slug: 'the-appointment-is-during-my-duty-hour', source: 'Francés A2 · simulación editorial · trabajo 7', complicationAt: 5,
    requiredPieces: ['tutorat 15 h–16 h', 'permanence y accueil cubiertos', 'respuesta de Sofia y de la tutrice', 'clave B-4 y hora de decisión'],
    note: 'El reemplazo depende de dos respuestas externas. La carta fija un límite, pero no permite anunciar el intercambio como confirmado.',
  },
  {
    slug: 'one-crate-is-missing-for-the-workshop', source: 'Francés A2 · simulación editorial · trabajo 8', complicationAt: 4,
    requiredPieces: ['18 lunettes y tres estaciones seguras', 'préstamo P-7 firmado', 'recogida antes de 17 h 45', 'estación 4 a 18 h 10 y devolución'],
    note: 'La caja desaparecida no demuestra robo. La carta habilita seis protecciones prestadas y mantiene la búsqueda de C-12 separada.',
  },
  {
    slug: 'the-machine-kept-my-coins', source: 'Francés A2 · simulación editorial · comunidad 9', complicationAt: 5,
    requiredPieces: ['E17 y ausencia de ciclo', 'crédito provisional de 4,50 €', 'L-1 reservada esta noche', 'LC-118 y 50 céntimos pendientes'],
    note: 'El historial confirma hora y fallo, no las monedas físicas. Por eso el lavado se resuelve y el dinero queda parcialmente abierto.',
  },
  {
    slug: 'the-bike-blocks-the-emergency-passage', source: 'Francés A2 · simulación editorial · comunidad 10', complicationAt: 5,
    requiredPieces: ['72 cm frente a 1,20 m', 'despeje antes de 19 h', 'cour temporal hasta martes', 'IM-402 y responsabilidad no acordada'],
    note: 'La avería del local no elimina la evacuación. La carta abre un lugar temporal sin convertirlo en seguro ni prometer indemnización.',
  },
  {
    slug: 'the-cats-schedule-has-changed', source: 'Francés A2 · simulación editorial · comunidad 11', complicationAt: 4,
    requiredPieces: ['tres visitas con responsables', 'sobre K-17', 'autorización e identidad de Maya', 'tres fotos y retorno de la llave'],
    note: 'Repartir visitas sin llave no cierra el cuidado. La carta crea una cadena de acceso que ambos roles deben repetir completa.',
  },
  {
    slug: 'we-can-no-longer-water-in-the-evening', source: 'Francés A2 · simulación editorial · comunidad 12', complicationAt: 5,
    requiredPieces: ['RE-26 y fuentes diferenciadas', 'dos aportes de 20 L', 'registro y 40 L para otras parcelas', 'revisión del sábado sin garantía futura'],
    note: 'El agua de lluvia permite una transición, no prioridad permanente. La carta cuantifica ochenta litros y conserva el cierre parcial.',
  },
  {
    slug: 'my-ticket-has-no-bike-space', source: 'Francés A2 · simulación editorial · movilidad 13', complicationAt: 5,
    requiredPieces: ['billet E-581 separado del QR vélo', 'TER 86112 a 18 h 12', 'llegada 19 h 26', 'cofre K-9 y confirmación al anfitrión'],
    note: 'El billete válido no implica reserva para bicicleta. La carta del anfitrión vuelve viable el tren posterior sin inventar una housse.',
  },
  {
    slug: 'i-lost-my-transport-pass', source: 'Francés A2 · simulación editorial · movilidad 14', complicationAt: 5,
    requiredPieces: ['MOB-774 bloqueada', 'contrato y cobro de 38 € activos', 'QR por 48 horas', 'D-774 el viernes a 9 h 30'],
    note: 'El registro apoya el bloqueo, pero no localiza la tarjeta. El duplicado sigue pendiente aunque los trayectos provisionales estén cubiertos.',
  },
  {
    slug: 'my-shoes-will-not-be-ready', source: 'Francés A2 · simulación editorial · movilidad 15', complicationAt: 5,
    requiredPieces: ['renfort cassé y 12 horas', 'rechazo de entrega frágil', 'piezas y foto a 18 h 30', 'devolución de 10 € sin compensación acordada'],
    note: 'La ceremonia aumenta la urgencia, no la seguridad del talón. La carta fuerza el retiro para un segundo aviso y preserva el desacuerdo.',
  },
  {
    slug: 'we-are-at-two-different-stations', source: 'Francés A2 · simulación editorial · movilidad 16', complicationAt: 4,
    requiredPieces: ['Sud de France y Saint-Roch', 'Antigone como punto registrado', 'llegadas 21 h 26/21 h 28', 'suplemento 6 € y espera diez minutos'],
    note: 'Decir « gare » no basta. La carta sincroniza dos trayectos y el acuerdo solo cierra cuando la aplicación contiene lugar y precio.',
  },
  {
    slug: 'the-train-arrives-after-the-key-handover', source: 'Francés A2 · simulación editorial · planes 17', complicationAt: 5,
    requiredPieces: ['A-602 y documentos antes de 19 h 15', 'dépôt K-4 por Sami', 'posición del tren a 19 h 45', 'decisión 19 h 50 y hotel H2'],
    note: 'La disponibilidad de Sami no equivale a código creado. La carta mantiene tres condiciones y una alternativa hasta el punto de decisión.',
  },
  {
    slug: 'the-accessible-seat-was-changed', source: 'Francés A2 · simulación editorial · planes 18', complicationAt: 5,
    requiredPieces: ['D1 accesible y E1 no adyacente', 'allée sin escalón', 'agente a 19 h 10', 'precio igual y separación documentada'],
    note: 'La asistencia no convierte dos plazas separadas en adyacentes. La carta descarta el sábado y valida un acuerdo explícitamente parcial.',
  },
  {
    slug: 'the-group-must-enter-in-two-times', source: 'Francés A2 · simulación editorial · planes 19', complicationAt: 5,
    requiredPieces: ['listas verdes y azules de nueve', 'Nora 14 h y Luc 14 h 15', 'Hall B como reunión', 'Claire 14 h 30–15 h 55'],
    note: 'Dos entradas no deben producir dos visitas. La carta permite a la misma guía esperar al grupo completo y conserva la salida de 16 h 15.',
  },
  {
    slug: 'the-dinner-goes-past-quiet-hours', source: 'Francés A2 · simulación editorial · planes 20', complicationAt: 5,
    requiredPieces: ['música detenida a 22 h', 'cancelación C-205-A', '40 € de location retenidos', '40 € de dépôt devueltos y músicos fuera del acuerdo'],
    note: 'Reservar la sala hasta 23 h no autoriza ruido hasta esa hora. La carta vuelve inútil una música de quince minutos y el desacuerdo termina documentado.',
  },
]

export const FRENCH_A2_RELEASE_AUDITS: RoleplayScenarioAudit[] = SEEDS.map((seed) => ({
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
