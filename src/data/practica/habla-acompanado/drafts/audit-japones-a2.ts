import type { RoleplayScenarioAudit, SimulationProfile } from './audit-ingles-a2.ts'

type AuditSeed = {
  slug: string
  source: string
  complicationAt: number
  requiredPieces: [string, string, string, string]
  note: string
}

const PROFILES: Array<{ profile: SimulationProfile; globalTurns: number; wordsA: number; wordsB: number; note: string }> = [
  { profile: 'solid-solid', globalTurns: 14, wordsA: 112, wordsB: 110, note: '両方の役が事実、限界、提案、確認を出し、カードの前に秘密の情報を漏らさなかった。' },
  { profile: 'solid-weak', globalTurns: 17, wordsA: 132, wordsB: 68, note: '強い役が短い質問と言い換えを使い、弱い役も自分だけの事実、条件、結果を一つずつ伝えた。' },
  { profile: 'weak-weak', globalTurns: 18, wordsA: 84, wordsB: 82, note: '両方の役が箱を使って会話を立て直し、最後に番号、数量、時刻、担当を確認した。' },
  { profile: 'quiet', globalTurns: 13, wordsA: 96, wordsB: 36, note: '静かな役も一語の同意で終わらず、自分の非公開情報、境界、終了項目を発話した。' },
  { profile: 'shortcut', globalTurns: 8, wordsA: 68, wordsB: 66, note: '早い解決案はカードで変わり、短い会話でも両方の情報と四つ以上の終了項目が必要だった。' },
]

const SEEDS: AuditSeed[] = [
  {
    slug: 'discount-sticker-was-not-applied-at-checkout', source: 'Japonés A2 · simulación editorial · Transacción 1', complicationAt: 5,
    requiredPieces: ['producto P-47 y lote 18', '680, 476 y 204 yenes', 'foto 18:36 y registro 18:41', 'devolución limitada a la diferencia'],
    note: 'La foto del cliente y el registro de caja pertenecen a fichas distintas; solo juntos justifican el ajuste exacto.',
  },
  {
    slug: 'stain-needs-one-more-day-at-dry-cleaner', source: 'Japonés A2 · simulación editorial · Transacción 2', complicationAt: 5,
    requiredPieces: ['orden C-208 y dos prendas', 'mancha que requiere un día más', 'tren y recogida del artículo utilizable', 'segunda entrega tras secado e inspección'],
    note: 'La urgencia del cliente no autoriza entregar una prenda húmeda; la salida parcial conserva el control de calidad.',
  },
  {
    slug: 'vegetarian-bento-contains-fish-stock', source: 'Japonés A2 · simulación editorial · Transacción 3', complicationAt: 5,
    requiredPieces: ['pedido B-12 de doce bentos', 'tres menús sin carne ni pescado', 'dashi presente y sustitutos limitados', 'respuesta de cocina antes de confirmar entrega'],
    note: 'Las etiquetas generales no sustituyen los ingredientes comprobables y el resultado sigue aplazado hasta la cocina.',
  },
  {
    slug: 'parcel-locker-code-expired-before-notice', source: 'Japonés A2 · simulación editorial · Transacción 4', complicationAt: 4,
    requiredPieces: ['paquete T-604 y casillero L-18', 'aviso posterior a la caducidad', 'sensores confirman el paquete cerrado', 'escalamiento de identidad sin abrirlo hoy'],
    note: 'Nadie comparte un código ni abre el casillero a distancia; se conserva la custodia y se registra el seguimiento.',
  },
  {
    slug: 'reserved-classroom-adapter-is-missing', source: 'Japonés A2 · simulación editorial · Estudio 5', complicationAt: 5,
    requiredPieces: ['reserva del aula y adaptador A-17', 'inicio de la presentación a las 14:00', 'equipo alternativo sujeto a prueba', 'reparto de sala y audio confirmado'],
    note: 'El estudiante aporta la necesidad audiovisual y el responsable la prueba del equipo; no se conecta material sin revisar.',
  },
  {
    slug: 'shift-overlaps-mandatory-training', source: 'Japonés A2 · simulación editorial · Trabajo 6', complicationAt: 5,
    requiredPieces: ['turno y formación obligatoria', 'cobertura de Yui en dos tramos', 'traslado y regreso después de la formación', 'cambio escrito con responsables'],
    note: 'La aprobación depende de cobertura real y registro; ninguna ficha puede prometer por la tercera persona antes de la tarjeta.',
  },
  {
    slug: 'festival-posters-arrived-in-wrong-size', source: 'Japonés A2 · simulación editorial · Trabajo 7', complicationAt: 4,
    requiredPieces: ['diez carteles A2 pedidos y A3 recibidos', 'cuatro reutilizables y seis por reimprimir', 'archivo y franja de imprenta', 'entrega parcial con conteo final'],
    note: 'El lote, el archivo y la capacidad de impresión obligan a combinar datos de comité e imprenta sin prometer todo a tiempo.',
  },
  {
    slug: 'returned-book-still-shows-as-overdue', source: 'Japonés A2 · simulación editorial · Estudio 8', complicationAt: 4,
    requiredPieces: ['libro y devolución a las 18:52', '42 libros esperados y 41 escaneados', 'sanción congelada durante la búsqueda', 'revisión de lote y estante con hora de respuesta'],
    note: 'La foto prueba depósito, no ubicación final; la biblioteca mantiene el caso abierto sin cobrar ni declarar hallado el libro.',
  },
  {
    slug: 'bulky-waste-pickup-has-different-date', source: 'Japonés A2 · simulación editorial · Comunidad 9', complicationAt: 5,
    requiredPieces: ['reserva y mueble registrado', 'fecha del correo distinta a la municipal', 'ventana con dos ayudantes', 'nuevo QR antes de sacar el objeto'],
    note: 'La solución nunca deja el residuo en el espacio común y condiciona el movimiento al registro corregido.',
  },
  {
    slug: 'bicycle-sticker-still-shows-previous-building', source: 'Japonés A2 · simulación editorial · Comunidad 10', complicationAt: 5,
    requiredPieces: ['bicicleta y pegatina del edificio anterior', 'mudanza y prueba de residencia', 'permiso temporal verificable', 'nueva etiqueta sin retirar la evidencia antes de tiempo'],
    note: 'La tarjeta provisional y el registro definitivo quedan separados; ninguna simulación borra la etiqueta antigua antes de validar.',
  },
  {
    slug: 'tatami-room-is-double-booked', source: 'Japonés A2 · simulación editorial · Comunidad 11', complicationAt: 5,
    requiredPieces: ['dos reservas para la sala de tatami', 'personas, materiales y accesibilidad de cada grupo', 'dos salas con límites distintos', 'opciones documentadas sin imponer acuerdo'],
    note: 'La tarjeta amplía alternativas pero no decide prioridades; ambos grupos conservan sus necesidades y el cierre sigue sin acuerdo.',
  },
  {
    slug: 'rain-erased-neighborhood-meeting-notice', source: 'Japonés A2 · simulación editorial · Comunidad 12', complicationAt: 4,
    requiredPieces: ['aviso mojado y cuatro hogares', 'hora antigua frente a hora actualizada', 'foto y versión digital como dos fuentes', 'cuatro copias y canal de confirmación'],
    note: 'Ninguna ficha reconstruye sola el aviso: hace falta contrastar la evidencia del vecino con la actualización del coordinador.',
  },
  {
    slug: 'ic-card-recorded-two-entries', source: 'Japonés A2 · simulación editorial · Movilidad 13', complicationAt: 5,
    requiredPieces: ['tarjeta IC y estación', 'dos entradas frente a un trayecto', 'historial con horas e importes', 'reembolso solo del registro duplicado'],
    note: 'La conversación distingue desbloqueo, entrada válida y duplicado; no devuelve el coste del trayecto realmente realizado.',
  },
  {
    slug: 'bicycle-bag-does-not-fit-highway-bus', source: 'Japonés A2 · simulación editorial · Movilidad 14', complicationAt: 5,
    requiredPieces: ['reserva de autobús y medidas del bolso', 'límite de bodega y peso', 'persona viaja aunque la bicicleta espere', 'transporte alternativo aún sujeto a confirmación'],
    note: 'La tarjeta conserva el resultado aplazado: no fuerza el equipaje ni presenta una entrega externa como confirmada.',
  },
  {
    slug: 'municipal-certificate-has-different-katakana', source: 'Japonés A2 · simulación editorial · Servicios 15', complicationAt: 4,
    requiredPieces: ['certificado y cita con katakana distinto', 'ルイス frente a ルイズ', 'consulta al registro con expediente', 'ningún documento dudoso antes de respuesta'],
    note: 'La interacción permanece administrativa: se registra la discrepancia, se conserva la cita y no se inventa una corrección.',
  },
  {
    slug: 'bike-share-return-station-is-full', source: 'Japonés A2 · simulación editorial · Movilidad 16', complicationAt: 5,
    requiredPieces: ['C-904, Y-316 y batería 28 %', 'S-4 lleno y reporte a las 17:40', 'reserva R-16 en S-5', 'señal física antes de cerrar y revisión Q-40'],
    note: 'Reservar espacio, devolver la bicicleta y ajustar la tarifa siguen siendo tres resultados comprobables y separados.',
  },
  {
    slug: 'rain-reduces-hanami-space', source: 'Japonés A2 · simulación editorial · Planes 17', complicationAt: 5,
    requiredPieces: ['H-20 y aforo de doce', 'doce personas antes y ocho después', 'dos entregas de bentos', 'limpieza y salida a las 15:00'],
    note: 'El recuento evita duplicar a quienes permanecen y acepta un acuerdo parcial: dos invitados ya no pueden asistir.',
  },
  {
    slug: 'ryokan-room-has-one-futon-too-few', source: 'Japonés A2 · simulación editorial · Planes 18', complicationAt: 5,
    requiredPieces: ['YK-318, tres personas y dos futones', 'habitación Sakura 3 y anexa Momiji 2', 'limpieza, llave y futón verificados', 'sin suplemento, con desayuno y devolución de llaves'],
    note: 'La urgencia nunca permite usar ropa de cama sin inspección; la habitación contigua resuelve descanso y custodia.',
  },
  {
    slug: 'karaoke-plan-ends-before-last-song', source: 'Japonés A2 · simulación editorial · Planes 19', complicationAt: 4,
    requiredPieces: ['KR-62, K-6 y canción S-88', 'cambio posible a K-8 con tarifa', 'tren 22:08 y salida segura 21:55', 'respuesta de Emi y tienda pendiente hasta 21:33'],
    note: 'El plazo y las dos alternativas cierran la conversación sin fingir el consentimiento de la tercera persona.',
  },
  {
    slug: 'festival-stalls-need-same-power-outlet', source: 'Japonés A2 · simulación editorial · Planes 20', complicationAt: 5,
    requiredPieces: ['H-12 de 1200W y L-9 de 900W', 'C-1 limitado a 1500W', 'F-8/C-2 y juego sin electricidad como opciones', 'sin conexión ni acuerdo antes de ELEC-7'],
    note: 'Los cinco perfiles rechazan regletas, cables improvisados y alternancia; la autoridad técnica decide tras inspección.',
  },
]

export const JAPANESE_A2_RELEASE_AUDITS: RoleplayScenarioAudit[] = SEEDS.map((seed) => ({
  slug: seed.slug,
  auditedAt: '2026-08-25',
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
