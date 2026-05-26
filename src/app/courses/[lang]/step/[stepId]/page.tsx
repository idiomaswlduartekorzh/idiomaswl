import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient as createServerClient } from '@/lib/supabase/server';
import LessonRuntime from '@/components/lesson/LessonRuntime';

const SLUG_TO_CODE: Record<string, string> = {
  korean: 'ko', english: 'en', japanese: 'ja', italian: 'it',
  french: 'fr', german: 'de', portuguese: 'pt', russian: 'ru',
};

const FLAG: Record<string, string> = {
  ko: '한', en: 'En', ja: '日', it: 'It', fr: 'Fr', de: 'De', pt: 'Pt', ru: 'Ру',
};

interface PageParams { lang: string; stepId: string; }

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { lang, stepId } = await params;
  const code = SLUG_TO_CODE[lang];
  if (!code) return {};
  const dayNumber = Number(stepId);

  const supabase = await createServerClient();
  const { data: language } = await supabase
    .from('languages')
    .select('name')
    .eq('code', code)
    .single();
  const { data: lesson } = await supabase
    .from('lessons')
    .select('title')
    .eq('language_code', code)
    .eq('day_number', dayNumber)
    .single();

  const langName = language?.name ?? lang;
  const lessonTitle = lesson?.title ?? `Día ${dayNumber}`;
  const title = `${langName} — Día ${dayNumber}: ${lessonTitle}`;
  const description = `Lección del método WeLearn: ${lessonTitle}. Once etapas interactivas para interiorizar vocabulario, gramática y producción en ${langName}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://idiomaswl.com/courses/${lang}/step/${stepId}`,
    },
    alternates: {
      canonical: `https://idiomaswl.com/courses/${lang}/step/${stepId}`,
    },
  };
}

export default async function LessonPage({ params }: { params: Promise<PageParams> }) {
  const { lang, stepId } = await params;

  const code = SLUG_TO_CODE[lang];
  if (!code) notFound();

  const dayNumber = Number(stepId);
  if (isNaN(dayNumber) || dayNumber < 1) notFound();

  const supabase = await createServerClient();

  const { data: language } = await supabase
    .from('languages')
    .select('name, flag_text')
    .eq('code', code)
    .single();

  if (!language) notFound();

  const { data: lesson } = await supabase
    .from('lessons')
    .select('title')
    .eq('language_code', code)
    .eq('day_number', dayNumber)
    .single();

  return (
    <LessonRuntime
      langName={language.name}
      langFlag={language.flag_text ?? FLAG[code] ?? '?'}
      langSlug={lang}
      dayNumber={dayNumber}
      title={lesson?.title ?? `Día ${dayNumber} — ${language.name}`}
    />
  );
}

export async function generateStaticParams() {
  return Object.keys(SLUG_TO_CODE).flatMap(lang =>
    Array.from({ length: 20 }, (_, i) => ({ lang, stepId: String(i + 1) }))
  );
}
