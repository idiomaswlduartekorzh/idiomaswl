export const XPRESS_TERMS_VERSION = 'xpress-20260909-v2';
export const XPRESS_PRIVACY_VERSION = 'xpress-privacy-20260908-v1';

export const XPRESS_TERMS = [
  {
    title: 'Qué estás comprando',
    text: 'La compra individual permite realizar una vez un simulacro de la familia elegida. Los planes de $49.000 y $99.000 activan 30 días de simulacros disponibles de esa familia. Ninguna opción incluye la inscripción al examen oficial.',
  },
  {
    title: 'Correcciones',
    text: 'Todas las opciones incluyen el resultado y el reporte automático disponible. El plan docente añade retroalimentación de WeLearn dentro de las 24 horas siguientes a cada entrega completa y correctamente guardada. Solo puede haber una revisión docente pendiente a la vez.',
  },
  {
    title: 'Renovación y resultados',
    text: 'La compra individual se consume al iniciar el simulacro. Los pases terminan al completar 30 días. Ninguna opción genera cobros automáticos. El servicio apoya la preparación académica, pero no garantiza una calificación, admisión ni aprobación.',
  },
  {
    title: 'Clases opcionales',
    text: 'Las clases con docente se compran por separado. Antes de pagarlas se muestran su precio, duración y reglamento propios. Comprar un examen o un pase no reserva horarios ni incluye clases en vivo.',
  },
] as const;

export const XPRESS_PRIVACY_NOTICE = 'Autorizo usar los datos de mi cuenta para gestionar esta compra, verificar el pago y enviarme su comprobante. No incluye publicidad.';

export const XPRESS_LEGAL_SNAPSHOT = JSON.stringify({
  version: XPRESS_TERMS_VERSION,
  privacyVersion: XPRESS_PRIVACY_VERSION,
  privacyNotice: XPRESS_PRIVACY_NOTICE,
  sections: XPRESS_TERMS,
});
