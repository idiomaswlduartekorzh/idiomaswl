import { ICFES_PERSONALIZED_FEEDBACK_BENEFIT } from './commercial-contract.ts';

export const ICFES_TERMS_VERSION = 'icfes-terms-2026-09-12-v2';
export const ICFES_PRIVACY_VERSION = 'icfes-privacy-2026-09-12-v2';
export const ICFES_LEAD_CONSENT_VERSION = 'icfes-lead-contact-2026-09-12-v1';
export const ICFES_PURCHASE_CONSENT_VERSION = 'icfes-purchase-2026-09-12-v1';
export const ICFES_RECURRING_CONSENT_VERSION = 'icfes-recurring-30d-2026-09-12-v1';

export const ICFES_TERMS = [
  {
    title: 'Qué estás comprando',
    text: 'El informe de COP 12.900 cubre un intento elegible y es un pago único. Las membresías de COP 49.900 y COP 99.900 se renuevan por periodos sucesivos de 30 días hasta que canceles. Ninguna opción incluye la inscripción al examen oficial.',
  },
  {
    title: 'Alcance del feedback',
    text: `Solo la membresía de COP 99.900 incluye “${ICFES_PERSONALIZED_FEEDBACK_BENEFIT}”. Se produce automáticamente, sin revisión humana ni plazo humano de entrega. Los niveles inferiores no reciben ese contenido.`,
  },
  {
    title: 'Renovación y cancelación',
    text: 'Las membresías cobran el mismo valor por cada periodo de 30 días. Puedes cancelar la renovación desde tu panel; no habrá cobros futuros y conservarás el acceso ya pagado hasta el final del periodo vigente.',
  },
  {
    title: 'Resultado pedagógico',
    text: 'Los resultados, informes y rutas son herramientas pedagógicas internas. No equivalen a un puntaje oficial, no predicen el resultado ICFES y no garantizan admisión, aprobación ni mejora específica.',
  },
] as const;

export const ICFES_PRIVACY_NOTICE =
  'Autorizo a WeLearn a guardar los datos de este intento y mi contacto para mostrar el resultado, gestionar la opción elegida y enviarme información relacionada con ICFES. Puedo solicitar retiro, exportación o eliminación cuando corresponda.';

export const ICFES_PURCHASE_CONSENT =
  'Confirmo que revisé el precio, el alcance y la forma de cobro de la opción seleccionada.';

export const ICFES_RECURRING_CONSENT =
  'Autorizo a WeLearn a cobrar automáticamente el valor del plan seleccionado por cada periodo de 30 días hasta que cancele la renovación desde mi panel.';

export const ICFES_LEGAL_SNAPSHOT = JSON.stringify({
  termsVersion: ICFES_TERMS_VERSION,
  privacyVersion: ICFES_PRIVACY_VERSION,
  purchaseConsentVersion: ICFES_PURCHASE_CONSENT_VERSION,
  recurringConsentVersion: ICFES_RECURRING_CONSENT_VERSION,
  privacyNotice: ICFES_PRIVACY_NOTICE,
  purchaseConsent: ICFES_PURCHASE_CONSENT,
  recurringConsent: ICFES_RECURRING_CONSENT,
  sections: ICFES_TERMS,
});
