export const IELTS_ANALYTICS_SCHEMA_VERSION = 1;

export const IELTS_ANALYTICS_EVENTS = [
  'ielts_mock_start',
  'ielts_mock_complete',
  'ielts_lead_submit',
  'ielts_report_view',
  'ielts_human_review_pending',
  'ielts_offer_view',
  'ielts_paid_report_intent',
  'ielts_checkout_start',
  'ielts_purchase_complete',
] as const;

export type IeltsAnalyticsEvent = (typeof IELTS_ANALYTICS_EVENTS)[number];
export type IeltsAnalyticsValue = string | number | boolean | null | undefined;
export type IeltsAnalyticsFields = Record<string, IeltsAnalyticsValue>;

const RESERVED_FIELDS = new Set(['event', 'exam', 'event_schema_version', 'page_path']);
const SENSITIVE_FIELD_PARTS = new Set(['answer', 'audio', 'email', 'essay', 'name', 'option', 'phone', 'response', 'whatsapp']);

function safeFields(fields: IeltsAnalyticsFields) {
  const safe: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(fields)) {
    const normalizedKey = key.trim().toLowerCase();
    const sensitive = normalizedKey.split('_').some(part => SENSITIVE_FIELD_PARTS.has(part));
    if (!normalizedKey || RESERVED_FIELDS.has(normalizedKey) || sensitive || value == null) continue;
    if (typeof value === 'number' && !Number.isFinite(value)) continue;
    safe[normalizedKey] = typeof value === 'string' ? value.slice(0, 120) : value;
  }
  return safe;
}

/** Lightweight GTM/GA4 contract. It never receives contact data or exam content. */
export function trackIeltsEvent(event: IeltsAnalyticsEvent, fields: IeltsAnalyticsFields = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event,
    exam: 'ielts-academic',
    event_schema_version: IELTS_ANALYTICS_SCHEMA_VERSION,
    page_path: window.location?.pathname ?? '',
    ...safeFields(fields),
  });
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}
