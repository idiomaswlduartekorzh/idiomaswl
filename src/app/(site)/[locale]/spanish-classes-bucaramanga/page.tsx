import { notFound } from 'next/navigation';
import SpanishExperience, { spanishMetadata } from '@/components/spanish/SpanishExperience';
import type { SpanishLocale } from '@/data/spanish-experience';

const locales = ['es', 'fr', 'it', 'ru', 'zh'] as const;
type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() { return locales.map(locale => ({ locale })); }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!locales.includes(locale as (typeof locales)[number])) return {};
  return spanishMetadata(locale as SpanishLocale, 'classes');
}

export default async function LocalizedSpanishClasses({ params }: Props) {
  const { locale } = await params;
  if (!locales.includes(locale as (typeof locales)[number])) notFound();
  return <SpanishExperience locale={locale as SpanishLocale} kind="classes" />;
}
