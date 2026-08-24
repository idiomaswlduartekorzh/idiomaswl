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
  { profile: 'solid-solid', globalTurns: 14, wordsA: 116, wordsB: 113, note: '두 역할이 이유, 한계와 시간을 해요체로 교환해요. 한쪽 카드만으로는 해결책이나 종결을 미리 알 수 없어요.' },
  { profile: 'solid-weak', globalTurns: 17, wordsA: 139, wordsB: 67, note: '강한 역할은 짧게 다시 묻지만 비공개 정보를 대신 말하지 않아요. 약한 역할도 자신의 한계, 선택과 확인을 직접 말해요.' },
  { profile: 'weak-weak', globalTurns: 18, wordsA: 86, wordsB: 83, note: '두 역할이 공통 상자의 이유·조건·확인 표현으로 대화를 수리해요. 종결 목록이 빠진 책임과 시간을 찾아 줘요.' },
  { profile: 'quiet', globalTurns: 13, wordsA: 101, wordsB: 34, note: '조용한 역할도 상대가 모르는 자료와 최소 한 가지 결정을 말해야 해요. 고개를 끄덕이기만 해서는 종결 조건에 닿지 않아요.' },
  { profile: 'shortcut', globalTurns: 8, wordsA: 68, wordsB: 65, note: '빠른 첫 제안은 카드의 새 정보 때문에 그대로 확정할 수 없어요. 최소 경로도 두 역할의 자료와 네 가지 종결 조각이 필요해요.' },
]

const SEEDS: AuditSeed[] = [
  {
    slug: 'one-side-dish-did-not-arrive', source: 'Coreano A2 · simulación editorial · transacciones 1', complicationAt: 5,
    requiredPieces: ['falta verificada de 계란찜', 'reenvío o crédito de 3,500원', 'hora o pantalla de confirmación', 'responsable y alternativa de respaldo'],
    note: '사진 y 주문 내역 pertenecen al cliente; cocina y crédito pertenecen al restaurante. La carta modifica el tiempo de reenvío sin elegir por el cliente.',
  },
  {
    slug: 'the-desk-price-is-different', source: 'Coreano A2 · simulación editorial · transacciones 2', complicationAt: 4,
    requiredPieces: ['precio publicado y precio pedido', 'accesorios que se incluyen', 'responsables de desmontaje y carga', 'hora o salida sin compra'],
    note: 'El precio de la captura no revela el estado de los accesorios. La carta permite una concesión limitada y conserva el desenlace parcial.',
  },
  {
    slug: 'the-reservation-is-one-day-later', source: 'Coreano A2 · simulación editorial · transacciones 3', complicationAt: 5,
    requiredPieces: ['domingo confirmado y sábado necesario', 'consulta de las 5:45', 'precio y límite de las 5:50', 'responsable del reembolso si falla'],
    note: 'La reserva original y la disponibilidad alternativa están repartidas. La carta abre una consulta, no una habitación confirmada, por eso el resultado sigue aplazado.',
  },
  {
    slug: 'the-dry-cleaning-ticket-is-missing', source: 'Coreano A2 · simulación editorial · transacciones 4', complicationAt: 5,
    requiredPieces: ['tres pruebas de propiedad', 'estado y retiro del abrigo', 'significado limitado de la firma', 'caso ST-604 y respuesta del lunes'],
    note: 'Recuperar la prenda no prueba quién causó la mancha. La carta verifica propiedad, pero deja responsabilidad y 18,000원 sin acuerdo.',
  },
  {
    slug: 'please-swap-the-saturday-shift', source: 'Coreano A2 · simulación editorial · trabajo 5', complicationAt: 4,
    requiredPieces: ['tres bloques del sábado', 'turno completo del domingo', 'compensación del lunes', 'consulta y aprobación antes de las 4'],
    note: 'Cada rol conoce disponibilidades distintas y la carta añade una tercera persona. El intercambio solo cierra al nombrar los cuatro bloques y sus dueños.',
  },
  {
    slug: 'there-are-two-presentation-files', source: 'Coreano A2 · simulación editorial · trabajo 6', complicationAt: 5,
    requiredPieces: ['cuatro diapositivas y mensajes', 'gráfico retirado y evidencia sustituta', 'reparto de producción y exposición', 'subida, revisión y práctica'],
    note: 'Ningún archivo puede declararse final al inicio. La carta reduce tiempo y obliga a congelar alcance, manteniendo un acuerdo parcial sobre el contenido.',
  },
  {
    slug: 'i-need-the-attendance-certificate-today', source: 'Coreano A2 · simulación editorial · trabajo 7', complicationAt: 5,
    requiredPieces: ['asistencia y porcentaje verificados', 'contenido del comprobante provisional', 'número, sello y hora', 'certificado final del lunes'],
    note: 'La urgencia no autoriza inventar el certificado final. La carta habilita un comprobante provisional verificable y conserva el cierre aplazado.',
  },
  {
    slug: 'the-meeting-room-bookings-overlap', source: 'Coreano A2 · simulación editorial · trabajo 8', complicationAt: 4,
    requiredPieces: ['lugar temporal hasta las 6:20', 'entrada a la sala del quinto piso', 'monitor y responsable', 'conexión y final con extensión'],
    note: 'Recepción conoce las salas y el equipo conoce la llamada externa. La carta habilita una transición con horario, no una sala grande inmediata.',
  },
  {
    slug: 'there-is-a-warning-on-the-recycling-bag', source: 'Coreano A2 · simulación editorial · comunidad 9', complicationAt: 5,
    requiredPieces: ['etiqueta y CCTV confirmados', 'responsabilidad todavía desconocida', 'reclasificación segura', 'recogida y autoridad de la multa'],
    note: 'La bolsa frente a la vivienda no demuestra autoría. La carta permite corregir la clasificación, pero preserva la investigación y el acuerdo solo parcial.',
  },
  {
    slug: 'the-heating-bill-is-too-high', source: 'Coreano A2 · simulación editorial · comunidad 10', complicationAt: 5,
    requiredPieces: ['consumo y ajuste anterior', 'pago provisional antes del viernes', 'aportes de esta semana', 'consulta y nueva conversación'],
    note: 'El ajuste histórico y los hábitos privados no fijan automáticamente una deuda. La carta explica la factura sin decidir el reparto final.',
  },
  {
    slug: 'the-package-is-next-door', source: 'Coreano A2 · simulación editorial · comunidad 11', complicationAt: 4,
    requiredPieces: ['pedido y propiedad confirmados', 'estado de la caja', 'entrega a administración a las 8:20', 'casillero, identificación y fotos'],
    note: 'El vecino no puede abandonar la caja ni el destinatario entrar antes. La carta abre una entrega autorizada y ambos deben registrar cadena de custodia.',
  },
  {
    slug: 'the-shared-kitchen-closes-early', source: 'Coreano A2 · simulación editorial · comunidad 12', complicationAt: 5,
    requiredPieces: ['comida antes de las 7', 'preparación sin fuego hasta las 8', 'uso del café y reparto de 60,000원', 'traslado y limpieza'],
    note: 'El cierre temprano no desaparece con la cocina externa. La carta reparte costo y horarios, por lo que el acuerdo sigue parcial entre dos lugares.',
  },
  {
    slug: 'i-want-the-transit-card-balance-back', source: 'Coreano A2 · simulación editorial · movilidad 13', complicationAt: 5,
    requiredPieces: ['cancelación de recarga automática', 'traslado a tarjeta nueva', 'saldo, tarifa y total final', 'responsable, recibo y hora'],
    note: 'La identificación del pasajero y el estado técnico de la tarjeta están separados. La carta bloquea efectivo y habilita un traslado comprobable.',
  },
  {
    slug: 'i-need-to-change-seats-because-of-the-luggage', source: 'Coreano A2 · simulación editorial · movilidad 14', complicationAt: 5,
    requiredPieces: ['consulta de las 6:22', 'rama del bus actual', 'rama del bus de las 7:20', 'equipaje, alojamiento y responsable'],
    note: 'Una posible plaza de equipaje no es una confirmación. La carta obliga a conservar dos ramas y deja el bus final aplazado.',
  },
  {
    slug: 'the-shared-entrance-is-locked', source: 'Coreano A2 · simulación editorial · movilidad 15', complicationAt: 4,
    requiredPieces: ['motivo para no compartir el código', 'autorización a seguridad', 'foto y registro de entrega', 'retiro con identificación a las 8:10'],
    note: 'La presión de tiempo no justifica divulgar el código común. La carta ofrece una recepción autorizada y mantiene trazabilidad de la caja.',
  },
  {
    slug: 'the-bicycle-repair-will-not-finish-today', source: 'Coreano A2 · simulación editorial · movilidad 16', complicationAt: 5,
    requiredPieces: ['bicicleta no segura', 'ubicación y anticipo de 35,000원', 'respuesta de compensación a las 9', 'pieza, final y transporte alternativo'],
    note: 'La demora no vuelve segura la bicicleta ni autoriza compensación. La carta confirma tiempos, pero el costo de transporte queda sin acuerdo.',
  },
  {
    slug: 'the-name-on-the-concert-ticket-is-different', source: 'Coreano A2 · simulación editorial · planes 17', complicationAt: 5,
    requiredPieces: ['pedido y tarjeta verificados', 'aprobación de la compradora', 'nombre coreano e inglés', 'nuevo QR, puerta y límite de entrada'],
    note: 'La captura no basta y el asistente no conoce la autorización. La carta confirma consentimiento y permite un único cambio con identidad verificable.',
  },
  {
    slug: 'i-must-back-up-before-repairing-the-phone', source: 'Coreano A2 · simulación editorial · planes 18', complicationAt: 4,
    requiredPieces: ['monitor y desbloqueo privado', '420 fotos, app y destino', 'verificación de las 6:55', 'consentimiento, custodia y entrega'],
    note: 'El técnico no solicita contraseña y el dueño no acepta reparación a ciegas. La carta vuelve viable la copia hoy y mantiene la reparación para mañana.',
  },
  {
    slug: 'it-might-rain-on-the-day-of-the-hike', source: 'Coreano A2 · simulación editorial · planes 19', complicationAt: 5,
    requiredPieces: ['cancelación de la cumbre', 'alojamiento conservado', 'aviso de las 6:30 y decisión del sendero', 'plan interior, contacto y bus'],
    note: 'Pronóstico y cierre oficial del sendero no se confunden. La carta elimina la cumbre, pero deja el sendero bajo condicionado al aviso matutino.',
  },
  {
    slug: 'there-is-no-large-table-for-the-birthday-dinner', source: 'Coreano A2 · simulación editorial · planes 20', complicationAt: 5,
    requiredPieces: ['avería y dos salas ofrecidas', 'rechazo del grupo', 'cancelación con hora y motivo', '50,000원 retenidos y respuesta del gerente'],
    note: '“단체석” no garantiza una sola mesa y dos salas no cumplen la reunión. La carta apoya ambos hechos; el asiento y el reembolso quedan sin acuerdo.',
  },
]

export const KOREAN_A2_RELEASE_AUDITS: RoleplayScenarioAudit[] = SEEDS.map((seed) => ({
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
