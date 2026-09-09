export const XPRESS_TERMS_VERSION = 'xpress-20260908-v1';
export const XPRESS_PRIVACY_VERSION = 'xpress-privacy-20260908-v1';

export const XPRESS_TERMS = [
  {
    title: 'Duración y alcance',
    text: 'El pago activa 30 días de acceso para una sola familia de examen. La membresía permite realizar los simulacros disponibles de esa familia para uso personal y no incluye la inscripción al examen oficial.',
  },
  {
    title: 'Correcciones',
    text: 'El plan automático entrega los resultados y reportes disponibles para el examen elegido. El plan docente añade retroalimentación de WeLearn dentro de las 24 horas siguientes a cada entrega completa y correctamente guardada. Solo puede haber una revisión docente pendiente a la vez.',
  },
  {
    title: 'Renovación y resultados',
    text: 'El pase termina al completar los 30 días y no genera cobros automáticos. El servicio apoya la preparación académica, pero no garantiza una calificación, admisión ni aprobación del examen.',
  },
  {
    title: 'Clases opcionales',
    text: 'Las clases con docente se compran por separado. Antes de pagarlas se muestran su precio, duración y reglamento propios. Comprar una membresía de exámenes no reserva horarios ni incluye clases en vivo.',
  },
] as const;

export const XPRESS_PRIVACY_NOTICE = 'Autorizo usar los datos de mi cuenta para gestionar la membresía, verificar el pago y enviarme su comprobante. No incluye publicidad.';

export const XPRESS_LEGAL_SNAPSHOT = JSON.stringify({
  version: XPRESS_TERMS_VERSION,
  privacyVersion: XPRESS_PRIVACY_VERSION,
  privacyNotice: XPRESS_PRIVACY_NOTICE,
  sections: XPRESS_TERMS,
});
