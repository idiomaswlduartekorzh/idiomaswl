/**
 * Resumen de resultados IELTS — layout inspirado en el Test Report Form
 * oficial (fila de bandas por habilidad en cajas, banda general destacada,
 * equivalente CEFR) pero con marca WeLearn, no IELTS.
 *
 * DELIBERADAMENTE no incluye: logo de IELTS, "Centre stamp"/"Validation
 * stamp", firma de administrador, número de Test Report Form, ni foto del
 * candidato — esos son los elementos anti-falsificación de un documento
 * oficial real (usado para trámites migratorios/académicos). Replicarlos
 * con datos nuestros produciría algo indistinguible de un TRF falso. Ver
 * conversación de la sesión — referencia visual del usuario era un TRF real.
 */

interface SkillScore {
  skill: string;
  /** number = banda calculada. null = calculando ahora (aparece en segundos).
   *  'pending' = esta habilidad no se autoevalúa todavía (ej. Speaking).
   *  'saturated' = el servicio de evaluación está saturado hoy — no va a resolver solo. */
  score: number | null | 'pending' | 'saturated';
  max:   number;
}

interface Props {
  mockTitle:    string;
  date:         string;
  studentName?: string;
  skills:       SkillScore[];
  overallBand:  number | null;
}

const WA_NUMBER = '573005004253';
const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

/** Orientación aproximada: IELTS advierte que no existe equivalencia 1:1. */
function bandToCEFR(band: number): string {
  if (band >= 8.5) return 'C2';
  if (band >= 7.0) return 'C1';
  if (band >= 5.5) return 'B2';
  if (band >= 4.0) return 'B1';
  if (band >= 3.0) return 'A2';
  return 'A1';
}

function ScoreBox({ label, value, accent, warn }: { label: string; value: string; accent?: boolean; warn?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg border px-3 py-3 min-w-[72px] ${
        accent
          ? 'border-[var(--accent)]/40 bg-[var(--accent)]/10'
          : warn
          ? 'border-amber-400/40 bg-amber-400/10'
          : 'border-[var(--border)] bg-[var(--bg)]'
      }`}
    >
      <p className="text-[10px] uppercase tracking-wide text-[var(--muted)] text-center leading-tight mb-1">{label}</p>
      <p className={`font-bold ${warn ? 'text-sm text-amber-500' : 'text-xl'} ${accent ? 'text-[var(--accent)]' : warn ? '' : 'text-[var(--fg)]'}`}>{value}</p>
    </div>
  );
}

export function IELTSSummaryReport({ mockTitle, date, studentName, skills, overallBand }: Props) {
  const saturatedSkill = skills.find((s) => s.score === 'saturated');

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-1 flex-wrap gap-2">
        <div>
          <p className="text-2xl font-black tracking-tight text-[var(--fg)]">WeLearn</p>
          <p className="text-sm text-[var(--muted)]">Reporte de Práctica</p>
        </div>
        <span className="rounded-md border border-[var(--border)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">
          ACADEMIC
        </span>
      </div>

      {/* Session info */}
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 mb-6">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[var(--muted)]">Simulacro</p>
          <p className="text-[var(--fg)]">{mockTitle}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[var(--muted)]">Fecha</p>
          <p className="text-[var(--fg)]">{date}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[var(--muted)]">Estudiante</p>
          <p className="text-[var(--fg)]">{studentName ?? 'Invitado'}</p>
        </div>
      </div>

      {/* Test Results row */}
      <p className="text-xs font-semibold text-[var(--muted)] mb-3">Test Results</p>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((s) => (
          <ScoreBox
            key={s.skill}
            label={s.skill}
            value={
              typeof s.score === 'number' ? s.score.toFixed(1)
                : s.score === 'pending' ? 'Pendiente'
                : s.score === 'saturated' ? 'Saturado'
                : '…'
            }
            warn={s.score === 'saturated'}
          />
        ))}
        <ScoreBox
          label="Overall Band"
          value={overallBand !== null ? overallBand.toFixed(1) : 'Pendiente'}
          accent
        />
        <ScoreBox
          label="CEFR orientativo"
          value={overallBand !== null ? bandToCEFR(overallBand) : '—'}
        />
      </div>

      {overallBand === null && (
        <p className="mt-3 text-xs text-[var(--muted)]">
          Overall y CEFR se mostrarán cuando Listening, Reading, Writing y Speaking tengan banda.
        </p>
      )}

      {saturatedSkill && (
        <div className="mt-4 rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-xs text-amber-200">
          <p className="mb-2">
            El evaluador de {saturatedSkill.skill} está muy solicitado hoy y no pudo corregir tu
            ensayo. Tu profesor lo puede revisar igual — o si lo necesitas ya, escríbenos.
          </p>
          <a
            href={waLink(`Hola, mi ${saturatedSkill.skill} salió saturado al practicar ${mockTitle} — ¿me lo pueden corregir?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
          >
            Pedir corrección por WhatsApp
          </a>
        </div>
      )}

      {/* Disclaimer — reemplaza sellos/firma/número de documento oficial */}
      <p className="mt-6 text-[11px] text-[var(--muted)] leading-relaxed border-t border-[var(--border)] pt-3">
        Este es un reporte de práctica personalizado de WeLearn, basado en el estándar de
        evaluación IELTS. <strong>No es un documento oficial</strong> de IELTS,
        British Council, IDP ni Cambridge Assessment English, y no tiene validez para trámites
        migratorios o académicos.
      </p>
    </div>
  );
}
