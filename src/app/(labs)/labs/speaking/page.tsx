/**
 * Fase 2 — placeholder.
 * Se construye cuando el evaluador de Writing valide la hipótesis del embudo.
 * Ver docs/blueprint-labs-ia.md § Fase 2.
 */
export default function SpeakingLabPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Evaluador de pronunciación</h1>
      <p className="mt-2 text-sm text-white/50">
        Motor previsto: Web Speech API (práctica libre, $0) + Azure Pronunciation
        Assessment (reporte por fonema, 5 h/mes gratis).
      </p>

      <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-6">
        <p className="text-sm text-white/60">
          Fase 2. El pipeline de audio ya existe en{' '}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
            api/practica/submit-audio
          </code>
          {' '}— este lab lo reutiliza, no lo reemplaza.
        </p>
        <p className="mt-3 text-sm text-white/40">
          Bloqueado hasta que Writing valide: si el embudo no convierte con la
          herramienta barata, tampoco lo hará con la cara.
        </p>
      </div>
    </div>
  );
}
