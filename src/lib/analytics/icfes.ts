export const ICFES_ANALYTICS_SCHEMA_VERSION = 1;

export const ICFES_ANALYTICS_EVENTS = [
  'icfes_hub_view',
  'icfes_learning_page_view',
  'icfes_cta_click',
  'icfes_practice_start',
  'icfes_practice_complete',
  'icfes_question_answered',
  'icfes_practice_restart',
  'icfes_guided_simulator_start',
  'icfes_guided_simulator_complete',
  'icfes_mock_start',
  'icfes_mock_complete',
  'icfes_report_view',
  'icfes_study_plan_generated',
  'icfes_error_review_complete',
  'icfes_lead_submit',
  'icfes_whatsapp_click',
  'icfes_paid_detail_intent',
  'icfes_checkout_start',
  'icfes_purchase_complete',
] as const;

export type IcfesAnalyticsEvent = (typeof ICFES_ANALYTICS_EVENTS)[number];
export type IcfesAnalyticsValue = string | number | boolean | null | undefined;
export type IcfesAnalyticsFields = Record<string, IcfesAnalyticsValue>;

const RESERVED_FIELDS = new Set(['event', 'exam', 'event_schema_version', 'page_path']);
const SENSITIVE_FIELD_PARTS = new Set(['answer', 'email', 'name', 'option', 'phone', 'response', 'whatsapp']);

function safeFields(fields: IcfesAnalyticsFields) {
  const safe: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(fields)) {
    const normalizedKey = key.trim().toLowerCase();
    const containsSensitivePart = normalizedKey.split('_').some(part => SENSITIVE_FIELD_PARTS.has(part));
    if (!normalizedKey || RESERVED_FIELDS.has(normalizedKey) || containsSensitivePart) continue;
    if (value === undefined || value === null) continue;
    if (typeof value === 'number' && !Number.isFinite(value)) continue;
    safe[normalizedKey] = typeof value === 'string' ? value.slice(0, 120) : value;
  }
  return safe;
}

export function isIcfesPath(pathname: string) {
  return pathname === '/examenes/icfes'
    || pathname.startsWith('/examenes/icfes/')
    || pathname === '/preparacion-icfes'
    || pathname === '/practica/icfes-saber-11'
    || pathname.startsWith('/practica/icfes-saber-11/');
}

/**
 * Contrato cliente para GTM/GA4. Nunca recibe texto de preguntas, respuestas ni PII.
 * Si GTM todavía no ha cargado, dataLayer conserva el evento para procesarlo después.
 */
export function trackIcfesEvent(event: IcfesAnalyticsEvent, fields: IcfesAnalyticsFields = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event,
    exam: 'icfes-saber-11',
    event_schema_version: ICFES_ANALYTICS_SCHEMA_VERSION,
    page_path: window.location?.pathname ?? '',
    ...safeFields(fields),
  });
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}
