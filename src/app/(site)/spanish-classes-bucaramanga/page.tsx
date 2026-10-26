import SpanishExperience, { spanishMetadata } from '@/components/spanish/SpanishExperience';

export const metadata = spanishMetadata('en', 'classes');

export default function SpanishClassesBucaramangaPage() {
  return <SpanishExperience locale="en" kind="classes" />;
}
