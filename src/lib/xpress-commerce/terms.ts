export const XPRESS_TERMS_VERSION = 'xpress-20261020-v8';
export const XPRESS_PRIVACY_VERSION = 'xpress-privacy-20260908-v1';

export const XPRESS_TERMS = [
  {
    title: 'Qué estás comprando',
    text: 'Los planes de $15.900, $49.900 y $99.900 activan por periodos de 30 días el ecosistema completo del examen elegido: práctica, simulacros cronometrados y explicaciones guiadas. Cada plan corresponde a un solo examen y no incluye la inscripción al examen oficial.',
  },
  {
    title: 'Correcciones',
    text: 'El plan de $15.900 incluye resultados detallados, descargas y retroalimentación automática. El de $49.900 añade hasta 5 revisiones humanas de Writing o Speaking por periodo. El de $99.900 añade revisiones humanas, retroalimentación integral y un plan de mejora personalizado. Estas revisiones no son calificaciones oficiales.',
  },
  {
    title: 'Renovación automática',
    text: 'Los planes de $15.900, $49.900 y $99.900 cobran el mismo valor por cada periodo de 30 días hasta que los canceles. La renovación puede procesarse durante las 24 horas anteriores al siguiente periodo para evitar que pierdas acceso. Antes de suscribirte verás el valor y la fecha del primer cobro. El servicio no garantiza una calificación, admisión ni aprobación.',
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

export const XPRESS_RECURRING_CONSENT_VERSION = 'xpress-recurring-30d-20261020-v3';
export const XPRESS_RECURRING_CONSENT = 'Autorizo a WeLearn a cobrar automáticamente el valor del plan seleccionado por cada periodo de 30 días, con procesamiento desde 24 horas antes del siguiente periodo, hasta que yo cancele la renovación desde mi panel.';

export const XPRESS_LEGAL_SNAPSHOT = JSON.stringify({
  version: XPRESS_TERMS_VERSION,
  privacyVersion: XPRESS_PRIVACY_VERSION,
  privacyNotice: XPRESS_PRIVACY_NOTICE,
  recurringConsentVersion: XPRESS_RECURRING_CONSENT_VERSION,
  recurringConsent: XPRESS_RECURRING_CONSENT,
  sections: XPRESS_TERMS,
});
