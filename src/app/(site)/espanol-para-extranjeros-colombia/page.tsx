import SpanishExperience, { spanishMetadata } from '@/components/spanish/SpanishExperience';

export const metadata = spanishMetadata('es', 'hub');

export default function EspanolParaExtranjerosPage() {
  return <SpanishExperience locale="es" kind="hub" />;
}
