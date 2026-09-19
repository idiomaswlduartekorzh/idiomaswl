import { ICFES_EXAM_SLUG } from '../icfes/commercial-contract.ts';
import {
  ICFES_LEGAL_SNAPSHOT,
  ICFES_PRIVACY_NOTICE,
  ICFES_PRIVACY_VERSION,
  ICFES_RECURRING_CONSENT,
  ICFES_RECURRING_CONSENT_VERSION,
  ICFES_TERMS,
  ICFES_TERMS_VERSION,
} from '../icfes/terms.ts';

export const XPRESS_TERMS_VERSION = 'xpress-20260912-v4';
export const XPRESS_PRIVACY_VERSION = 'xpress-privacy-20260908-v1';

export const XPRESS_TERMS = [
  {
    title: 'Qué estás comprando',
    text: 'La compra individual de $12.900 permite realizar una vez un simulacro de la familia elegida. Las suscripciones de $49.900 y $99.900 activan periodos sucesivos de 30 días con simulacros disponibles de esa familia. Ninguna opción incluye la inscripción al examen oficial.',
  },
  {
    title: 'Correcciones',
    text: 'Todas las opciones incluyen el resultado y el reporte automático disponible. El plan de $99.900 añade una revisión personalizada de un tutor de WeLearn, entregada en el panel dentro de las 24 horas siguientes al envío del simulacro. Esta revisión no es una calificación oficial.',
  },
  {
    title: 'Renovación automática',
    text: 'La compra de $12.900 es un pago único. Las suscripciones de $49.900 y $99.900 cobran el mismo valor por cada periodo de 30 días hasta que las canceles. La renovación puede procesarse durante las 24 horas anteriores al siguiente periodo para evitar que pierdas acceso. Antes de suscribirte verás el valor y la fecha del primer cobro. El servicio no garantiza una calificación, admisión ni aprobación.',
  },
  {
    title: 'Cancelación sencilla',
    text: 'Puedes cancelar la renovación desde tu panel. No se harán nuevos cobros y conservarás el acceso hasta finalizar el periodo ya pagado. Cancelar no devuelve periodos consumidos ni pagos ya aprobados, sin perjuicio de los derechos que la ley reconozca en cada caso.',
  },
  {
    title: 'Clases opcionales',
    text: 'Las clases con docente se compran por separado. Antes de pagarlas se muestran su precio, duración y reglamento propios. Comprar un examen o un pase no reserva horarios ni incluye clases en vivo.',
  },
] as const;

export const XPRESS_PRIVACY_NOTICE = 'Autorizo usar los datos de mi cuenta para gestionar esta compra, verificar el pago y enviarme su comprobante. No incluye publicidad.';

export const XPRESS_RECURRING_CONSENT_VERSION = 'xpress-recurring-30d-20260912-v2';
export const XPRESS_RECURRING_CONSENT = 'Autorizo a WeLearn a cobrar automáticamente el valor del plan seleccionado por cada periodo de 30 días, con procesamiento desde 24 horas antes del siguiente periodo, hasta que yo cancele la renovación desde mi panel.';

export const XPRESS_LEGAL_SNAPSHOT = JSON.stringify({
  version: XPRESS_TERMS_VERSION,
  privacyVersion: XPRESS_PRIVACY_VERSION,
  privacyNotice: XPRESS_PRIVACY_NOTICE,
  recurringConsentVersion: XPRESS_RECURRING_CONSENT_VERSION,
  recurringConsent: XPRESS_RECURRING_CONSENT,
  sections: XPRESS_TERMS,
});

export function xpressTermsForExam(examSlug: string) {
  return examSlug.trim().toLowerCase() === ICFES_EXAM_SLUG ? ICFES_TERMS : XPRESS_TERMS;
}

export function xpressTermsVersionForExam(examSlug: string) {
  return examSlug.trim().toLowerCase() === ICFES_EXAM_SLUG ? ICFES_TERMS_VERSION : XPRESS_TERMS_VERSION;
}

export function xpressPrivacyNoticeForExam(examSlug: string) {
  return examSlug.trim().toLowerCase() === ICFES_EXAM_SLUG ? ICFES_PRIVACY_NOTICE : XPRESS_PRIVACY_NOTICE;
}

export function xpressPrivacyVersionForExam(examSlug: string) {
  return examSlug.trim().toLowerCase() === ICFES_EXAM_SLUG ? ICFES_PRIVACY_VERSION : XPRESS_PRIVACY_VERSION;
}

export function xpressRecurringConsentForExam(examSlug: string) {
  return examSlug.trim().toLowerCase() === ICFES_EXAM_SLUG ? ICFES_RECURRING_CONSENT : XPRESS_RECURRING_CONSENT;
}

export function xpressRecurringConsentVersionForExam(examSlug: string) {
  return examSlug.trim().toLowerCase() === ICFES_EXAM_SLUG ? ICFES_RECURRING_CONSENT_VERSION : XPRESS_RECURRING_CONSENT_VERSION;
}

export function xpressLegalSnapshotForExam(examSlug: string) {
  return examSlug.trim().toLowerCase() === ICFES_EXAM_SLUG ? ICFES_LEGAL_SNAPSHOT : XPRESS_LEGAL_SNAPSHOT;
}
