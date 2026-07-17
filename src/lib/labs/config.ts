/**
 * Labs — configuración aislada.
 *
 * Nada fuera de src/lib/labs/ y src/app/(labs)/ debe importar este módulo.
 * Si LABS_ENABLED es false, las rutas /labs devuelven 404 y no se ejecuta
 * ninguna llamada a proveedores externos.
 */

export const LABS_ENABLED = process.env.LABS_ENABLED === 'true';

/**
 * Motor de writing. 'gemini' = free tier ($0). 'anthropic' = Opus (~$0,05 por
 * evaluación, mejor calidad). La rúbrica es la misma para ambos.
 * Sin la key del motor elegido, la ruta responde 503 y no rompe el sitio.
 */
export const WRITING_ENGINE: 'gemini' | 'anthropic' =
  process.env.LABS_WRITING_ENGINE === 'anthropic' ? 'anthropic' : 'gemini';

/** Proveedores que corren en el free tier. Sin key → la feature se degrada, no rompe. */
export const providers = {
  gemini: {
    key:      process.env.GEMINI_API_KEY ?? '',
    model:    'gemini-flash-latest',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
    /** Free tier: 1.500 req/día, 10 req/min. Ver docs/blueprint-labs-ia.md */
    freeTierRpd: 1500,
  },
  /** Capa de calidad. No es free tier: se paga por token. */
  anthropic: {
    key:   process.env.ANTHROPIC_API_KEY ?? '',
    model: 'claude-opus-4-8',
  },
  azureSpeech: {
    key:    process.env.AZURE_SPEECH_KEY ?? '',
    region: process.env.AZURE_SPEECH_REGION ?? 'eastus',
    /** Free tier F0: 5 horas de audio/mes. */
    freeTierHoursPerMonth: 5,
  },
  /** Sin API key. No requieren configuración. */
  dictionary: { endpoint: 'https://api.dictionaryapi.dev/api/v2/entries' },
  datamuse:   { endpoint: 'https://api.datamuse.com/words' },
} as const;

export function isConfigured(p: 'gemini' | 'anthropic' | 'azureSpeech'): boolean {
  return providers[p].key.length > 0;
}

/**
 * Límites de la capa gratuita, por sesión de navegador.
 * Es un freno de cortesía, no seguridad: el control real vive en el rate
 * limiter del servidor (ver src/lib/labs/rate-limit.ts).
 */
export const LIMITS = {
  /** Evaluaciones de writing gratis antes de pedir el lead. */
  freeWritingAssessments: 2,
  /** Caracteres máximos por ensayo (Task 2 ≈ 1.400). */
  maxEssayChars: 5000,
  minEssayChars: 150,
  /** Segundos máximos de audio (Azure evalúa pronunciación hasta 30s). */
  maxAudioSeconds: 30,
} as const;
