import type { RoleplayScenarioAudit, SimulationProfile } from './audit-ingles-a2.ts'

type RunSeed = [SimulationProfile, number, number, number, string]

function certifiedAudit(
  slug: string,
  source: string,
  complicationAt: number,
  requiredPieces: string[],
  seeds: RunSeed[],
): RoleplayScenarioAudit {
  return {
    slug,
    auditedAt: '2026-08-26',
    source,
    verdict: 'pass',
    runs: seeds.map(([profile, globalTurns, wordsA, wordsB, note]) => ({
      profile,
      globalTurns,
      wordsA,
      wordsB,
      reachesClosing: true,
      complicationAt,
      noLeak: true,
      requiredPieces,
      note,
    })),
  }
}

const EVIDENCE_128 = 'docs/audits/habla-ingles-a2-legacy-1-2-8-2026-08-26.md · transcript y conteo reproducible'
const EVIDENCE_345 = 'docs/audits/habla-ingles-a2-legacy-3-4-5-2026-08-26.md · transcript y conteo reproducible'
const EVIDENCE_67 = 'docs/audits/habla-ingles-a2-legacy-6-7-2026-08-26.md · transcript y conteo reproducible'

export const ENGLISH_A2_LEGACY_RELEASE_AUDITS: RoleplayScenarioAudit[] = [
  certifiedAudit('the-bike-in-the-parking-lot', EVIDENCE_128, 5,
    ['final price and payment', 'gears and extras', 'transport owner and time', 'rear-tire owner and payment', 'open questions and learned facts', 'conditions stated with changed numbers'], [
      ['solid-solid', 13, 123, 124, 'Dos preguntas abiertas, dos datos aprendidos y condiciones verificadas antes del cierre.'],
      ['solid-weak', 20, 60, 116, 'El checkpoint hace producir al rol débil la pregunta, el dato aprendido y su condición.'],
      ['weak-weak', 18, 74, 63, 'La oferta desnuda no cuenta; se repite 340 con old gears en el mismo turno.'],
      ['quiet', 22, 29, 108, 'A produce pregunta, dato aprendido y condición Nequi en fragmentos propios.'],
      ['shortcut', 15, 73, 105, 'El trato rápido queda bloqueado hasta completar preguntas, aprendizaje y condiciones.'],
    ]),
  certifiedAudit('no-appointment-until-thursday', EVIDENCE_128, 5,
    ['open question before proposal', 'appointment and full-treatment dates', 'price and payer', 'full phone readback', 'pain plan and hospital sign', 'exact referral problem when used'], [
      ['solid-solid', 14, 100, 103, 'La pregunta abierta precede la agenda y activa la salida exacta.'],
      ['solid-weak', 16, 61, 100, 'A pregunta y espera antes de proponer; quedan dos fechas y teléfono completo.'],
      ['weak-weak', 18, 54, 68, 'El cierre recupera problema exacto, referencia, precio, teléfono y dolor.'],
      ['quiet', 22, 28, 93, 'A pregunta antes de proponer y produce teléfono y dos fechas en fragmentos.'],
      ['shortcut', 12, 69, 89, 'No puede derivar al Centro antes de obtener y escribir el problema exacto.'],
    ]),
  certifiedAudit('cancel-the-gym-i-am-leaving', EVIDENCE_128, 3,
    ['case versus cancellation', 'freeze and two dates', 'transfer conditions', 'office and cut-off', 'fifth and twelfth consequences', 'case number and date after content'], [
      ['solid-solid', 13, 78, 94, 'Ambas vías aparecen antes de elegir y firmar.'],
      ['solid-weak', 15, 63, 86, 'La firma queda bloqueada hasta elección, condiciones y consecuencias.'],
      ['weak-weak', 15, 55, 61, 'El intento de firmar temprano no cuenta; reconstruyen las seis piezas.'],
      ['quiet', 23, 126, 28, 'Mauricio usa fragmentos de una a tres palabras y completa sus piezas antes del número.'],
      ['shortcut', 11, 82, 75, 'La segunda vía no puede ocultarse y el caso se dicta al final.'],
    ]),
  certifiedAudit('swap-the-saturday-shift', EVIDENCE_345, 6,
    ['opener and time', 'repayment shift and date', 'stay limit and successor', 'written request and deadline', 'forty-person breakfast and third-swap cost', 'open issue owner and deadline'], [
      ['solid-solid', 14, 154, 150, 'Recompone seis puntos después de la carta.'],
      ['solid-weak', 14, 117, 63, 'B aporta desayuno, límite, escrito y costo del tercer swap.'],
      ['weak-weak', 14, 67, 55, 'Las seis piezas dejan la carga en 54.9/45.1.'],
      ['quiet', 14, 111, 46, 'B produce sus tres piezas privadas aunque hable poco.'],
      ['shortcut', 8, 80, 95, 'El reparto temprano queda como borrador; el cierre ocurre tras carta global 6.'],
    ]),
  certifiedAudit('the-pot-is-already-on', EVIDENCE_345, 3,
    ['pot count and late loss', 'container exchange and weekday cost', 'gate need', 'return count and time', 'rider walkers duration and bike capacity', 'river message and deadline', 'second round and gate owner', 'open diner owner and time'], [
      ['solid-solid', 18, 217, 178, 'Ocho piezas y capacidad de la moto explícita.'],
      ['solid-weak', 18, 164, 68, 'B aporta sus datos privados y la causa verificable.'],
      ['weak-weak', 18, 78, 52, 'La pieza de capacidad deja el reparto exactamente en 60/40.'],
      ['quiet', 16, 135, 63, 'B produce retorno, transporte, mensaje y capacidad.'],
      ['shortcut', 8, 95, 94, 'La carta global 3 impide fijar el número y cerrar antes de seis.'],
    ]),
  certifiedAudit('late-again-on-monday', EVIDENCE_345, 5,
    ['paper and destination', 'start date and time', 'Matias carrier bus and opener', 'review date', 'training day place and teacher', 'Camilo cost', 'Amparo cost', 'signatures and key handoff'], [
      ['solid-solid', 16, 156, 135, 'Mecanismo, formación, costos y revisión antes de firmar.'],
      ['solid-weak', 16, 86, 80, 'La ruta débil sostiene las ocho piezas.'],
      ['weak-weak', 14, 60, 69, 'La promesa se corrige con líneas completas y balance 46.5/53.5.'],
      ['quiet', 16, 112, 63, 'B dice carta, formación, costos, revisión y llaves.'],
      ['shortcut', 9, 99, 81, 'No hay firma antes de la carta y el mínimo completo queda en global 9.'],
    ]),
  certifiedAudit('the-cousin-on-the-sofa', EVIDENCE_67, 6,
    ['sleeping plan', 'second bed and no payment', 'living-room hours', 'lease deadline', 'Sunday open question', 'corrected aunt message'], [
      ['solid-solid', 18, 93, 121, 'Seis piezas, carta y mensaje corregido.'],
      ['solid-weak', 18, 46, 118, 'El andamiaje sostiene a A débil dentro de nueve turnos por rol.'],
      ['weak-weak', 18, 39, 58, 'El traslado del mensaje deja la carga en 40/60 y cierre 6/6.'],
      ['quiet', 26, 33, 128, 'A nunca supera tres palabras por turno y produce dato, condición y cierre.'],
      ['shortcut', 18, 87, 97, 'Los intentos tempranos quedan bloqueados; cierra después de carta global 6.'],
    ]),
  certifiedAudit('two-more-people-for-the-trip', EVIDENCE_67, 3,
    ['beds gate list and owner', 'extra-person price and reservation', 'seven oclock fallback', 'identity sender and deadline', 'payment date and fallback', 'Sebastian and Andrea messages', 'driver and count for both cars'], [
      ['solid-solid', 18, 149, 126, 'Seis líneas y Together calculable con conductor y cantidad.'],
      ['solid-weak', 18, 141, 63, 'K1 y K3 salen con chunks activos; no inventa pasajeros.'],
      ['weak-weak', 18, 68, 46, 'Carga 60/40, carta obligatoria y Together completo.'],
      ['quiet', 26, 147, 36, 'B produce identidad, condición, mensajes y cierre sin superar tres palabras por turno.'],
      ['shortcut', 16, 120, 108, 'Cuatro intentos tempranos quedan bloqueados y cierra en global 16.'],
    ]),
]
