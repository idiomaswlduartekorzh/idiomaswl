const PROFILE_WARNING_LABELS: Readonly<Record<string, string>> = {
  GLOBAL_WITHHELD_INCOMPLETE_EVIDENCE:
    'No se publica un nivel global porque al menos una habilidad no tiene evidencia suficiente.',
  GLOBAL_WITHHELD_UNEVEN_PROFILE:
    'No se publica un nivel global porque las diferencias entre habilidades harían engañosa una sola etiqueta.',
  UNEVEN_SKILL_PROFILE:
    'El perfil es desigual: las habilidades difieren por dos o más niveles y deben interpretarse por separado.',
  GRAMMAR_WRITING_EVIDENCE_DIVERGES:
    'El uso gramatical observado en la escritura difiere materialmente de las respuestas objetivas; se conserva el nivel objetivo y se amplía la incertidumbre.',
  VOCABULARY_WRITING_EVIDENCE_DIVERGES:
    'El vocabulario observado en la escritura difiere materialmente de las respuestas objetivas; se conserva el nivel objetivo y se amplía la incertidumbre.',
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

export function diagnosticLanguageUseIntegrationLabel(value: unknown): string | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const outcome = (value as Record<string, unknown>).outcome;
  if (outcome === 'objective-insufficient') {
    return 'la escritura aporta contexto, pero no sustituye la evidencia objetiva faltante';
  }
  if (outcome === 'corroborated') {
    return 'evidencia objetiva corroborada por el uso en escritura; sin cambio automático de nivel';
  }
  if (outcome === 'adjacent') {
    return 'evidencia objetiva y uso en escritura próximos; rango ampliado sin cambio automático de nivel';
  }
  if (outcome === 'divergent') {
    return 'discrepancia material entre evidencia objetiva y escritura; rango ampliado sin cambio automático de nivel';
  }
  return null;
}
