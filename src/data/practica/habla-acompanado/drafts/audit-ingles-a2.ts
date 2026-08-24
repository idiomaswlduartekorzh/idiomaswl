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
  {
    slug: 'music-after-ten',
    auditedAt: '2026-08-23',
    source: 'Simulación editorial · tanda 2 · escenario 11',
    verdict: 'pass',
    runs: [
      { profile: 'solid-solid', globalTurns: 14, wordsA: 126, wordsB: 119, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['bass at maximum', 'bedroom location', 'second complaint and open window', 'sound test and finish time'], note: 'B limita la queja a bajo+dormitorio y A ofrece parlante+ventana. La carta demuestra que moverlo sin cerrar la ventana no basta; hacen un test real antes del cierre.' },
      { profile: 'solid-weak', globalTurns: 17, wordsA: 149, wordsB: 70, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['bass not voices', 'sleep by 10:30', 'speaker in back bedroom', 'test if still audible'], note: 'A sólido reformula vibration como low sound y propone dos controles. B flojo logra producir habitación, hora y test; no necesita recitar la norma completa.' },
      { profile: 'weak-weak', globalTurns: 18, wordsA: 92, wordsB: 96, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['quiet hours', 'bass control', 'closed window', '11:30 finish'], note: 'Ambos empiezan con “music low”, pero el cierre los obliga a separar bajo, volumen y ventana. La pareja llega sin amenaza ni español gracias a bass, ceiling y speaker.' },
      { profile: 'quiet', globalTurns: 13, wordsA: 112, wordsB: 34, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['B identifies bedroom', 'B says bass not voices', 'B gives sleep time', 'B requests test'], note: 'B no puede resolver con “please, lower”: debe localizar el dormitorio, excluir las voces, dar la hora y participar en el test.' },
      { profile: 'shortcut', globalTurns: 8, wordsA: 72, wordsB: 77, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['quiet-hours boundary', 'card second complaint', 'speaker and window changes', 'bedroom verification'], note: 'El atajista propone volume 3 en el segundo turno, pero la complicación de otra fachada impide cerrar sin comprobar ventana y bajo. Ocho turnos globales es el mínimo.' },
    ],
  },
  {
    slug: 'the-courtyard-is-for-everyone',
    auditedAt: '2026-08-23',
    source: 'Simulación editorial · tanda 2 · escenario 12',
    verdict: 'pass',
    runs: [
      { profile: 'solid-solid', globalTurns: 16, wordsA: 141, wordsB: 136, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['valid reservation', 'two bicycle times', 'valve maintenance 5–6', 'two-stage table layout'], note: 'A no conoce los horarios de bicicleta y B no conoce la reserva hasta oírlos. La carta mueve la cuarta mesa y obliga a distinguir el plano antes/después del almuerzo.' },
      { profile: 'solid-weak', globalTurns: 18, wordsA: 155, wordsB: 76, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['wide passage', '2:50 exit and 6:10 return', 'one-metre valve area', 'basement-door owner'], note: 'A sólido dibuja verbalmente tres zonas. B flojo usa medidas solo para explicar el giro y consigue producir sus dos tiempos y la condición de la puerta.' },
      { profile: 'weak-weak', globalTurns: 18, wordsA: 99, wordsB: 95, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['three tables on tiles', 'emergency route clear', 'technician window', 'clear by seven'], note: 'La pareja confunde primero passage y entrance, pero vocabulario+datos permiten corregir el plano. El cierre idéntico detecta una silla todavía dentro de la ruta.' },
      { profile: 'quiet', globalTurns: 14, wordsA: 117, wordsB: 38, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['B cannot use narrow turn', 'B states both travel times', 'B requests valve access', 'B names basement condition'], note: 'B debe producir geometría, dos horarios y condición; asentir al plano de A no abre la puerta del sótano ni protege el regreso.' },
      { profile: 'shortcut', globalTurns: 9, wordsA: 84, wordsB: 80, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['reservation window', 'bike access slots', 'maintenance card', 'layout before and after lunch'], note: 'El atajista intenta poner tres mesas y dejar el paso en A2, pero no conoce el regreso ni la válvula. La carta fuerza un segundo plano y evita un cierre prematuro.' },
    ],
  },
  {
    slug: 'the-last-bus-has-gone',
    auditedAt: '2026-08-23',
    source: 'Simulación editorial · tanda 3 · escenario 14',
    verdict: 'pass',
    runs: [
      { profile: 'solid-solid', globalTurns: 14, wordsA: 124, wordsB: 130, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['70,000 budget', 'closed passenger list', 'checkpoint consequence', 'licensed contact or hotel'], note: 'A prueba Barichara y el petrol station; B rechaza ambas por la misma regla y cambia a ayuda oficial. Sin viaje compartido, cierran oficina, hotel y bus matutino.' },
      { profile: 'solid-weak', globalTurns: 17, wordsA: 73, wordsB: 148, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['reception 10:30', 'insurance limit', 'terminal office before nine', 'morning ticket time'], note: 'B sólido evita repetir no y acompaña a A a elegir contacto. A flojo consigue producir destino, presupuesto y deadline con tres filas no consecutivas.' },
      { profile: 'weak-weak', globalTurns: 18, wordsA: 91, wordsB: 94, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['no informal car', 'vehicle tracker', 'Hotel Camino price', '5:40 bus'], note: 'La negativa no mata la conversación: list, office y hotel sostienen seis turnos después del no. El cierre impide confundir “maybe taxi” con un contacto real.' },
      { profile: 'quiet', globalTurns: 13, wordsA: 37, wordsB: 116, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['A names Barichara', 'A gives 70,000 maximum', 'A gives reception deadline', 'A chooses contact or hotel'], note: 'A no obtiene ayuda asintiendo: debe producir destino, dinero, hora y elección para que B actúe antes de las nueve.' },
      { profile: 'shortcut', globalTurns: 8, wordsA: 70, wordsB: 78, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['ride refusal reason', 'fleet alert', 'official alternative', 'morning fallback'], note: 'El atajista ofrece pagar en A2; B cierra esa rama. La carta bloquea cualquier atajo informal y el escenario necesita ocho turnos para convertir el no en plan seguro.' },
    ],
  },
  {
    slug: 'the-package-needs-another-id',
    auditedAt: '2026-08-23',
    source: 'Simulación editorial · tanda 3 · escenario 15',
    verdict: 'pass',
    runs: [
      { profile: 'solid-solid', globalTurns: 14, wordsA: 132, wordsB: 125, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['live licence not screenshot', 'expired physical card', 'sender secure link', 'code before 4:55'], note: 'B primero muestra captura; A pregunta por app viva sin conocer la tarjeta vencida. La carta crea una ruta autorizada de tres pruebas y ambas fichas aportan una.' },
      { profile: 'solid-weak', globalTurns: 17, wordsA: 151, wordsB: 68, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['stolen wallet', 'live app', 'FotoPro order number', 'one-time code entered privately'], note: 'A sólido reformula identity check como name plus document. B flojo produce robo, app y pedido, y mantiene el código fuera de la conversación.' },
      { profile: 'weak-weak', globalTurns: 18, wordsA: 93, wordsB: 89, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['name match', 'second physical document', 'sender authorization', 'release record'], note: 'La pareja confunde screenshot y digital licence hasta usar official app. El cierre recupera el registro de liberación que ambos omiten en el primer intento.' },
      { profile: 'quiet', globalTurns: 13, wordsA: 109, wordsB: 36, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['B explains replacement not ready', 'B opens live licence', 'B provides order 88391', 'B enters code'], note: 'B debe operar y producir cuatro piezas privadas; enseñar solo el nombre del paquete no permite que A complete el proceso.' },
      { profile: 'shortcut', globalTurns: 8, wordsA: 77, wordsB: 73, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['failed screenshot', 'support card', 'three-part evidence', 'tracking release'], note: 'El atajista intenta usar police report como excepción, pero la carta no lo autoriza. El camino corto requiere app viva, tarjeta y código, y cierra en ocho turnos.' },
    ],
  },
  {
    slug: 'the-car-will-not-be-ready-today',
    auditedAt: '2026-08-23',
    source: 'Simulación editorial · tanda 3 · escenario 16',
    verdict: 'pass',
    runs: [
      { profile: 'solid-solid', globalTurns: 16, wordsA: 138, wordsB: 142, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['failed brake test', 'taxi for 4:15', 'client moved to 7:30', 'authorized colleague and supplier branches'], note: 'B no discute la luz de freno después de oír el test; negocia consecuencias. La carta vuelve insuficiente el préstamo a las 6:30 y obliga a autorizar conductor.' },
      { profile: 'solid-weak', globalTurns: 18, wordsA: 158, wordsB: 77, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['missed 4:00 promise', 'automatic-driving limit', 'Mateo after 6:30', 'workshop-covered costs'], note: 'A sólido separa seguridad, tiempo incierto y transporte. B flojo produce dos viajes y no acepta “loan car” hasta aclarar quién conduce.' },
      { profile: 'weak-weak', globalTurns: 18, wordsA: 97, wordsB: 101, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['warning light stays active', 'taxi cap', 'loan-car handover', 'call in both supplier outcomes'], note: 'La pareja intenta prometer noon; el if de la ficha y el cierre corrigen la falsa certeza. El acuerdo queda parcial y las dos ramas siguen visibles.' },
      { profile: 'quiet', globalTurns: 14, wordsA: 120, wordsB: 41, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['B states child pickup', 'B rejects manual self-drive', 'B names Mateo', 'B gives 7:30 client time'], note: 'B no puede obtener compensación con queja mínima: debe producir los dos relojes, el límite de manejo y el conductor alterno.' },
      { profile: 'shortcut', globalTurns: 9, wordsA: 85, wordsB: 83, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['safety refusal', 'card new deadline', 'taxi and loan split', 'conditional repair update'], note: 'El atajista pide rental completo en B2; la autoridad de A no alcanza. La carta fuerza solución de dos etapas y el mínimo queda en nueve turnos.' },
    ],
  },
  {
    slug: 'the-account-is-on-the-broken-phone',
    auditedAt: '2026-08-23',
    source: 'Simulación editorial · tanda 4 · escenario 17',
    verdict: 'pass',
    runs: [
      { profile: 'solid-solid', globalTurns: 14, wordsA: 127, wordsB: 123, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['trusted laptop', 'recovery email access', 'ten-minute approval card', 'final-price file check'], note: 'A pregunta qué funciona antes de instruir; B no revela el recovery email hasta necesitarlo. La carta prioriza la notificación y preserva la segunda rama.' },
      { profile: 'solid-weak', globalTurns: 17, wordsA: 150, wordsB: 69, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['black screen but vibration', 'old PDF missing slide', 'private approval code', 'HDMI adapter'], note: 'A sólido da una instrucción por turno y pregunta resultado. B flojo distingue account email/recovery email y conserva code/password fuera de lo dicho.' },
      { profile: 'weak-weak', globalTurns: 18, wordsA: 94, wordsB: 91, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['official recovery page', 'laptop recognized', 'no full reset', 'current presentation opens'], note: 'La pareja intenta reset password; la tarjeta muestra la espera de 24 horas y los devuelve a trusted device. El cierre exige el archivo, no solo “I’m in”.' },
      { profile: 'quiet', globalTurns: 13, wordsA: 108, wordsB: 36, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['B describes phone state', 'B names recovery email', 'B enters code privately', 'B verifies final price slide'], note: 'B no puede delegar el acceso: debe describir, elegir, operar y comprobar cuatro piezas que A no puede producir por él.' },
      { profile: 'shortcut', globalTurns: 8, wordsA: 75, wordsB: 72, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['official page only', 'diagnostic card', 'private code', 'file and adapter check'], note: 'El atajista intenta usar el PDF viejo, pero no contiene el precio. La carta permite el camino corto en ocho turnos sin saltarse seguridad ni archivo final.' },
    ],
  },
  {
    slug: 'the-party-costs-twice-as-much',
    auditedAt: '2026-08-23',
    source: 'Simulación editorial · tanda 4 · escenario 18',
    verdict: 'pass',
    runs: [
      { profile: 'solid-solid', globalTurns: 16, wordsA: 136, wordsB: 140, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['missed required extras', '1.3m shared ceiling', '420k automatic payment', 'release rooftop and guest update'], note: 'A asume que comparó solo alquiler; B separa cuenta común y ahorro privado. La carta elimina cualquier depósito apresurado y deja cierre operativo sin lugar acordado.' },
      { profile: 'solid-weak', globalTurns: 18, wordsA: 78, wordsB: 157, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['A maximum 650k', 'required-cost breakdown', 'non-refundable deposit refusal', 'food-payment decision'], note: 'B sólido convierte “too expensive” en desglose y techo. A flojo logra reconocer el error, dar su máximo y asumir la llamada al rooftop.' },
      { profile: 'weak-weak', globalTurns: 18, wordsA: 99, wordsB: 96, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['2.18m complete quote', 'shared account amount', 'food still for thirty', 'new-plan message deadline'], note: 'Ambos intentan recortar decorations sin cubrir la brecha. El cierre los hace abandonar la falsa solución y separar cancelación inmediata de un plan futuro.' },
      { profile: 'quiet', globalTurns: 14, wordsA: 39, wordsB: 121, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['A admits incomplete estimate', 'A states own maximum', 'A names free-room option', 'A releases rooftop'], note: 'A no puede aceptar el no en silencio: debe explicar el error, su límite, la alternativa conocida y ejecutar la liberación antes de las nueve.' },
      { profile: 'shortcut', globalTurns: 9, wordsA: 84, wordsB: 87, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['full quote', 'shared ceiling', 'automatic payment card', 'no-deposit close'], note: 'El atajista propone el salón gratis en A2, pero B todavía no conoce horario ni pago automático. Nueve turnos son necesarios para cerrar consecuencias sin fingir acuerdo de lugar.' },
    ],
  },
  {
    slug: 'the-internet-drops-during-the-meeting',
    auditedAt: '2026-08-23',
    source: 'Simulación editorial · tanda 4 · escenario 19',
    verdict: 'pass',
    runs: [
      { profile: 'solid-solid', globalTurns: 14, wordsA: 129, wordsB: 133, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['600 MB limit', 'client 3:30 window', 'outage after 4:30', 'coworking link and restart section'], note: 'B obtiene datos antes de informar. A no conoce la disponibilidad del cliente y B no conoce el coworking; el cruce produce una reprogramación segura.' },
      { profile: 'solid-weak', globalTurns: 17, wordsA: 71, wordsB: 152, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['connection dropped at 2:02', 'unreleased-file rule', 'pricing can continue now', 'room confirmation'], note: 'B sólido sostiene al cliente sin decir que la demo terminó. A flojo produce límite de datos y sala, y no intenta enviar el archivo por correo personal.' },
      { profile: 'weak-weak', globalTurns: 18, wordsA: 95, wordsB: 98, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['ten-minute hotspot', 'security officer present', 'provider outage card', 'new company link'], note: 'La pareja empieza con “try again”, pero la carta mata ese bucle. El cierre recupera quién crea link y desde qué feature reinicia.' },
      { profile: 'quiet', globalTurns: 13, wordsA: 37, wordsB: 114, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['A states data amount', 'A refuses personal email', 'A names coworking time', 'A confirms restart feature'], note: 'A debe producir capacidad, regla, alternativa y contenido pendiente; B no puede reprogramar con un sí monosilábico.' },
      { profile: 'shortcut', globalTurns: 8, wordsA: 78, wordsB: 74, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['client update', 'outage estimate', 'secure room', 'new link and owner'], note: 'El atajista intenta usar hotspot para terminar; 600 MB y la carta lo impiden. Ocho turnos bastan solo después de fijar las cuatro responsabilidades.' },
    ],
  },
  {
    slug: 'the-picnic-in-the-rain',
    auditedAt: '2026-08-23',
    source: 'Simulación editorial · tanda 4 · escenario 20',
    verdict: 'pass',
    runs: [
      { profile: 'solid-solid', globalTurns: 14, wordsA: 125, wordsB: 127, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['food cannot wait', 'step-free need', 'park closed by alert', 'room contribution and group message'], note: 'A aporta comida/transporte y B acceso/costo por persona. La carta elimina parque y refugio, pero no decide por ellos entre salón y café.' },
      { profile: 'solid-weak', globalTurns: 17, wordsA: 148, wordsB: 70, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['brother after ten', 'six guests leave by noon', '18×7,000 contribution', 'bus-stop message'], note: 'A sólido compara horarios sin ocultar que seis pierden una hora. B flojo produce step-free, contribución y mensaje único.' },
      { profile: 'weak-weak', globalTurns: 18, wordsA: 96, wordsB: 93, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['sandwiches today', 'park shelter closed', 'community room 11–2', 'food arrival and payment'], note: 'La pareja confunde initially indoor café/room, pero minimum purchase y contribution separan las opciones. El cierre detecta que faltaba transporte de la torta.' },
      { profile: 'quiet', globalTurns: 13, wordsA: 112, wordsB: 35, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['B states step-free need', 'B gives contribution count', 'B rejects café price', 'B sends four-part message'], note: 'B debe producir acceso, cálculo, límite y comunicación; aceptar “community room” no resuelve a los veinte invitados.' },
      { profile: 'shortcut', globalTurns: 8, wordsA: 73, wordsB: 79, reachesClosing: true, complicationAt: 5, noLeak: true, requiredPieces: ['weather card', 'room access', 'shared fee', 'food transport and message'], note: 'El atajista elige shelter en A2 y la carta lo elimina. El camino mínimo aún exige cuatro piezas de dos fichas y cierra en ocho turnos.' },
    ],
  },
]
