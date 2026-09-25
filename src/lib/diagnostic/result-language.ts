const PROFILE_WARNING_LABELS: Readonly<Record<string, string>> = {
  GLOBAL_WITHHELD_INCOMPLETE_EVIDENCE:
    'No se publica un nivel global porque al menos una habilidad no tiene evidencia suficiente.',
  UNEVEN_SKILL_PROFILE:
    'El perfil es desigual: las habilidades difieren por dos o más niveles y deben interpretarse por separado.',
};

const SKILL_STATUS_LABELS: Readonly<Record<string, string>> = {
  'not-estimated': 'estimación no disponible',
  provisional: 'estimación provisional',
  calibrated: 'estimación calibrada',
};

export function diagnosticProfileWarningLabel(value: unknown): string {
  const warning = typeof value === 'string' ? value.trim() : '';
  if (!warning) return 'Advertencia sin detalle disponible.';
  return PROFILE_WARNING_LABELS[warning] ?? warning;
}

export function diagnosticSkillStatusLabel(value: unknown): string {
  const status = typeof value === 'string' ? value : '';
  return SKILL_STATUS_LABELS[status] ?? 'estado de medición no disponible';
}

export function diagnosticConfidenceLabel(value: unknown): string {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1
    ? `confianza técnica ${Math.round(value * 100)}%`
    : 'confianza técnica sin estimar';
}
