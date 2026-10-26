import SpanishExperience, { spanishMetadata } from '@/components/spanish/SpanishExperience';

export const metadata = spanishMetadata('en', 'hub');

export default function LearnSpanishColombiaPage() {
  return <SpanishExperience locale="en" kind="hub" />;
}
