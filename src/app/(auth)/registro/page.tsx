import type { Metadata } from 'next';
import RegistrationFlow from './RegistrationFlow';

export const metadata: Metadata = {
  title: 'Crear cuenta y elegir ruta',
  description: 'Crea tu cuenta WeLearn para estudiar por tu cuenta o iniciar un curso de inglés con profesor.',
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return <RegistrationFlow />;
}
