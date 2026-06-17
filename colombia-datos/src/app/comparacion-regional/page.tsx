import { Metadata } from 'next';
import ComparacionRegionalClient from './ComparacionRegionalClient';

export const metadata: Metadata = {
  title: 'Colombia vs LATAM | Comparación Regional',
  description: 'Comparación de indicadores clave de Colombia con Chile, Brasil, México y el promedio regional de América Latina.',
};

export default function ComparacionRegionalPage() {
  return <ComparacionRegionalClient />;
}
