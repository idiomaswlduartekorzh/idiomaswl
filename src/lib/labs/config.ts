/**
 * Labs — configuración aislada.
 *
 * Nada fuera de src/lib/labs/ y src/app/(labs)/ debe importar este módulo.
 * Si LABS_ENABLED es false, las rutas /labs devuelven 404 y no se ejecuta
 * ninguna llamada a proveedores externos.
 */

export const LABS_ENABLED = process.env.LABS_ENABLED === 'true';

/**
 * Motor de writing.
 *
 * 'auto' (DEFAULT — sin LABS_WRITING_ENGINE seteada) es el modo de producción:
 * Gemini para tareas con imagen (necesita visión real para calificar Task
 * Achievement con precisión — Groq falló ese caso en pruebas), Groq para todo
 * lo que es solo texto (mucho más rápido, 30 req/min vs. 10 de Gemini, y no
 * se satura tan fácil). La decisión real vive en exam-writing-assess/route.ts
 * → pickEngine(), que mira si la tarea trae imagen.
 *
 * 'gemini' | 'groq' | 'nvidia' | 'anthropic' fuerzan un único motor para
 * TODO — solo para pruebas/depuración, nunca el comportamiento esperado en
 * producción. 'anthropic' además está reservado para un futuro plan pago,
 * no se activa solo con setear esto.
 */
export const WRITING_ENGINE: 'auto' | 'gemini' | 'groq' | 'nvidia' | 'anthropic' =
  process.env.LABS_WRITING_ENGINE === 'anthropic' ? 'anthropic'
  : process.env.LABS_WRITING_ENGINE === 'nvidia' ? 'nvidia'
  : process.env.LABS_WRITING_ENGINE === 'groq' ? 'groq'
  : process.env.LABS_WRITING_ENGINE === 'gemini' ? 'gemini'
  : 'auto';

/** Proveedores que corren en el free tier. Sin key → la feature se degrada, no rompe. */
export const providers = {
  gemini: {
    key:      process.env.GEMINI_API_KEY ?? '',
    model:    'gemini-flash-latest',
    /**
     * Respaldo con visión y JSON estructurado. La cuota gratuita de Gemini se
     * aplica por modelo, así que este segundo Flash mantiene Task 1 disponible
     * cuando el alias principal agota su cupo diario. No usar aquí motores de
     * solo texto: Task Achievement exige contrastar el ensayo con la gráfica.
     */
    fallbackModels: ['gemini-flash-lite-latest'],
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
    /** Free tier: 1.500 req/día, 10 req/min. Ver docs/blueprint-labs-ia.md */
    freeTierRpd: 1500,
  },
  groq: {
    key:      process.env.GROQ_API_KEY ?? '',
    /**
     * Texto puro. Groq retiró llama-3.3-70b-versatile en agosto de 2026;
     * openai/gpt-oss-120b es el reemplazo vigente verificado contra
     * /openai/v1/models y una generación JSON real. Qwen 3.6 puede
     * ver imágenes, pero su presupuesto por minuto no alcanza para nuestra
     * rúbrica + ensayo + reescritura. Task 1 sigue en Gemini con visión.
     */
    model:    'openai/gpt-oss-120b',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    /** Free tier: hasta 14.400 req/día, 30 req/min. Ver console.groq.com/docs/rate-limits */
    freeTierRpd: 14_400,
  },
  /** Capa de calidad. No es free tier: se paga por token. */
  anthropic: {
    key:   process.env.ANTHROPIC_API_KEY ?? '',
    model: 'claude-opus-4-8',
  },
  /**
   * Tercer respaldo cuando Gemini Y Groq se saturan el mismo día (nos pasó).
   * OJO: no es cuota diaria como los otros dos — son 1.000 créditos de
   * inferencia GRATIS UNA SOLA VEZ al crear la cuenta en build.nvidia.com,
   * con límite de 40 req/min. Sirve de colchón, no de reemplazo sostenible.
   * Solo texto — Nemotron 3 Super no tiene visión, así que no sirve para
   * IELTS Task 1 (necesita leer el gráfico).
   */
  nvidia: {
    key:      process.env.NVIDIA_API_KEY ?? '',
    model:    'nvidia/nemotron-3-super-120b-a12b',
    endpoint: 'https://integrate.api.nvidia.com/v1/chat/completions',
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

export function isConfigured(p: 'gemini' | 'groq' | 'anthropic' | 'azureSpeech' | 'nvidia'): boolean {
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
