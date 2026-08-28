import type { OfficialSourceId } from './types.ts';

export interface MedicalEditorialDomain {
  id: string;
  label: string;
  origin: 'officially-named' | 'product-proposed';
  evidenceSourceIds: readonly OfficialSourceId[];
  childTopics: readonly string[];
}

/**
 * Shared editorial ontology. `product-proposed` nodes organize production but must never
 * be presented as an official university weighting unless a blueprint says so explicitly.
 */
export const MEDICAL_EDITORIAL_TAXONOMY = [
  {
    id: 'basic-sciences',
    label: 'Ciencias básicas aplicadas',
    origin: 'officially-named',
    evidenceSourceIds: ['univalle-resolution-374-2024', 'unilibre-applicant-guide-2025'],
    childTopics: ['anatomía', 'fisiología', 'patología', 'microbiología', 'inmunología', 'farmacología'],
  },
  {
    id: 'internal-medicine',
    label: 'Medicina interna',
    origin: 'product-proposed',
    evidenceSourceIds: ['ucaldas-call-2027', 'unilibre-applicant-guide-2025'],
    childTopics: ['cardiología', 'neumología', 'gastroenterología', 'nefrología', 'endocrinología', 'infectología', 'hematología', 'reumatología'],
  },
  {
    id: 'surgery',
    label: 'Cirugía y trauma',
    origin: 'product-proposed',
    evidenceSourceIds: ['ucaldas-call-2027', 'unilibre-applicant-guide-2025'],
    childTopics: ['abdomen agudo', 'trauma', 'perioperatorio', 'anatomía quirúrgica', 'emergencias quirúrgicas'],
  },
  {
    id: 'pediatrics',
    label: 'Pediatría',
    origin: 'product-proposed',
    evidenceSourceIds: ['ucaldas-call-2027', 'unilibre-applicant-guide-2025'],
    childTopics: ['neonatología', 'crecimiento y desarrollo', 'urgencias pediátricas', 'pediatría hospitalaria', 'pediatría ambulatoria'],
  },
  {
    id: 'obgyn',
    label: 'Ginecología y obstetricia',
    origin: 'product-proposed',
    evidenceSourceIds: ['ucaldas-call-2027', 'unilibre-applicant-guide-2025'],
    childTopics: ['control prenatal', 'urgencias obstétricas', 'parto', 'ginecología general', 'salud sexual y reproductiva'],
  },
  {
    id: 'emergency-medicine',
    label: 'Urgencias y cuidado crítico',
    origin: 'product-proposed',
    evidenceSourceIds: ['ucaldas-call-2027', 'unilibre-applicant-guide-2025'],
    childTopics: ['reanimación', 'choque', 'toxicología', 'cuidado intensivo', 'triaje y estabilización'],
  },
  {
    id: 'mental-health',
    label: 'Psiquiatría y salud mental',
    origin: 'product-proposed',
    evidenceSourceIds: ['unilibre-applicant-guide-2025'],
    childTopics: ['urgencia psiquiátrica', 'psiquiatría ambulatoria', 'neuropsicología'],
  },
  {
    id: 'community-health',
    label: 'Salud pública y ciencias comunitarias',
    origin: 'officially-named',
    evidenceSourceIds: ['unilibre-applicant-guide-2025'],
    childTopics: ['epidemiología', 'bioestadística', 'promoción y prevención', 'vigilancia en salud pública'],
  },
  {
    id: 'ethics-and-regulation',
    label: 'Bioética y ejercicio médico en Colombia',
    origin: 'officially-named',
    evidenceSourceIds: ['univalle-resolution-374-2024', 'unilibre-applicant-guide-2025'],
    childTopics: ['ética médica', 'consentimiento informado', 'secreto profesional', 'talento humano en salud', 'habilitación y seguridad del paciente'],
  },
  {
    id: 'national-context',
    label: 'Cultura general e interés nacional',
    origin: 'officially-named',
    evidenceSourceIds: ['univalle-resolution-374-2024'],
    childTopics: ['actualidad sanitaria colombiana', 'instituciones del sistema de salud', 'eventos nacionales vigentes'],
  },
  {
    id: 'medical-english',
    label: 'Lectura médica en inglés',
    origin: 'officially-named',
    evidenceSourceIds: ['udea-resolution-00006-2026', 'univalle-resolution-374-2024'],
    childTopics: ['lectura de abstracts', 'vocabulario clínico', 'interpretación de recomendaciones', 'lectura crítica breve'],
  },
] as const satisfies readonly MedicalEditorialDomain[];
