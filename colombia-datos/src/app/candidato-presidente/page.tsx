import { Metadata } from 'next';
import CandidatoPresidenteClient from './CandidatoPresidenteClient';

export const metadata: Metadata = {
  title: 'Candidato vs. Presidente | Colombia en Datos',
  description: 'Promesas de campaña de los presidentes colombianos (1994-2026) comparadas con los resultados reales según datos verificables.',
};

export default function CandidatoPresidentePage() {
  return <CandidatoPresidenteClient />;
}
