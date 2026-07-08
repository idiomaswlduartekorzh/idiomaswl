import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient as createServerClient } from '@/lib/supabase/server';
import LessonRuntime from '@/components/lesson/LessonRuntime';
import GrammarDeep001 from '@/components/lesson/grammar/GrammarDeep001';
import GrammarDeep002 from '@/components/lesson/grammar/GrammarDeep002';
import GrammarDeep003 from '@/components/lesson/grammar/GrammarDeep003';
import GrammarDeep004 from '@/components/lesson/grammar/GrammarDeep004';
import GrammarDeep005 from '@/components/lesson/grammar/GrammarDeep005';
import GrammarDeep006 from '@/components/lesson/grammar/GrammarDeep006';
import GrammarDeep007 from '@/components/lesson/grammar/GrammarDeep007';
import { KOREAN_STEPS } from '@/data/stepsMeta';

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

  // Use step config for Korean steps that have rich metadata
  if (code === 'ko' && KOREAN_STEPS[dayNumber]) {
    const meta = KOREAN_STEPS[dayNumber];
    return {
      title: meta.seoTitle,
      description: meta.seoDescription,
      keywords: meta.seoKeywords,
      openGraph: {
        title: meta.seoTitle,
        description: meta.seoDescription,
        url: `https://www.idiomaswl.com/courses/${lang}/step/${stepId}`,
      },
      alternates: {
        canonical: `https://www.idiomaswl.com/courses/${lang}/step/${stepId}`,
      },
    };
  }

  // Fallback: fetch from Supabase for other languages / future steps
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
      url: `https://www.idiomaswl.com/courses/${lang}/step/${stepId}`,
    },
    alternates: {
      canonical: `https://www.idiomaswl.com/courses/${lang}/step/${stepId}`,
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

  // Rich step metadata for Korean
  const stepMeta = code === 'ko' ? KOREAN_STEPS[dayNumber] : undefined;

  // Determine the grammar deep section for this step
  const GRAMMAR_SECTIONS: Record<number, React.ReactNode> = {
    1: <GrammarDeep001 />,
    2: <GrammarDeep002 />,
    3: <GrammarDeep003 />,
    4: <GrammarDeep004 />,
    5: <GrammarDeep005 />,
    6: <GrammarDeep006 />,
    7: <GrammarDeep007 />,
  };
  const grammarSection = code === 'ko' ? GRAMMAR_SECTIONS[dayNumber] : undefined;

  // Title: prefer the narrative episode title from config, then Supabase, then fallback
  const pageTitle = stepMeta?.episodeTitle ?? lesson?.title ?? `Día ${dayNumber} — ${language.name}`;

  return (
    <LessonRuntime
      langName={language.name}
      langFlag={language.flag_text ?? FLAG[code] ?? '?'}
      langSlug={lang}
      dayNumber={dayNumber}
      title={pageTitle}
      topics={stepMeta?.topics}
      vocab={stepMeta?.vocab}
      grammarContent={grammarSection}
    />
  );
}

export async function generateStaticParams() {
  return Object.keys(SLUG_TO_CODE).flatMap(lang =>
    Array.from({ length: 20 }, (_, i) => ({ lang, stepId: String(i + 1) }))
  );
}
