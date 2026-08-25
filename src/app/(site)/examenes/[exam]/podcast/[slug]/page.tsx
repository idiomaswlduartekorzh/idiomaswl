import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpenText, Headphones } from 'lucide-react';

import PodcastFeature from '@/components/practica/PodcastFeature';
import { EXAM_PODCASTS, getExamPodcast } from '@/data/practica/exam-podcast-catalog';
import styles from './page.module.css';

const BASE = 'https://www.idiomaswl.com';

type PodcastPageProps = {
  params: Promise<{ exam: string; slug: string }>;
};

export function generateStaticParams() {
  return EXAM_PODCASTS.map((episode) => ({ exam: episode.examSlug, slug: episode.slug }));
}

export async function generateMetadata({ params }: PodcastPageProps): Promise<Metadata> {
  const { exam, slug } = await params;
  const episode = getExamPodcast(exam, slug);
  if (!episode) return {};
  const url = `${BASE}${episode.href}`;

  return {
    title: `${episode.title}: podcast y guía escrita`,
    description: episode.fullDescription,
    keywords: [...episode.keywords],
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
    },
    openGraph: {
      title: episode.title,
      description: episode.fullDescription,
      url,
      type: 'article',
      siteName: 'Idiomas WeLearn',
      locale: episode.locale === 'es' ? 'es_CO' : 'en_US',
      audio: [{ url: `${BASE}${episode.audioSrc}`, type: 'audio/mpeg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: episode.title,
      description: episode.fullDescription,
    },
  };
}

export default async function ExamPodcastPage({ params }: PodcastPageProps) {
  const { exam, slug } = await params;
  const episode = getExamPodcast(exam, slug);
  if (!episode) notFound();

  const url = `${BASE}${episode.href}`;
  const audioUrl = `${BASE}${episode.audioSrc}`;
  const isEnglish = episode.locale === 'en';
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isEnglish ? 'Exams' : 'Exámenes', item: `${BASE}/examenes` },
          { '@type': 'ListItem', position: 2, name: episode.collection, item: `${BASE}${episode.hubHref}` },
          { '@type': 'ListItem', position: 3, name: episode.title, item: url },
        ],
      },
      {
        '@type': 'PodcastEpisode',
        '@id': `${url}#episode`,
        url,
        name: episode.title,
        alternateName: episode.alternateName,
        description: episode.fullDescription,
        duration: episode.durationIso,
        inLanguage: episode.locale,
        isAccessibleForFree: true,
        associatedMedia: {
          '@type': 'AudioObject',
          contentUrl: audioUrl,
          encodingFormat: 'audio/mpeg',
          duration: episode.durationIso,
        },
        isPartOf: {
          '@type': 'PodcastSeries',
          name: `${episode.collection} audio guides by WeLearn`,
          url: `${BASE}${episode.hubHref}`,
        },
        publisher: {
          '@type': 'EducationalOrganization',
          name: 'Idiomas WeLearn',
          url: BASE,
        },
        about: { '@type': 'Thing', name: episode.collection },
      },
      {
        '@type': 'LearningResource',
        '@id': `${url}#guide`,
        name: `${episode.title} — written companion`,
        description: episode.fullDescription,
        url,
        inLanguage: episode.locale,
        isAccessibleForFree: true,
        learningResourceType: ['Podcast', 'Written guide'],
        educationalUse: 'Exam preparation',
        teaches: episode.outcomes,
        provider: { '@type': 'EducationalOrganization', name: 'Idiomas WeLearn', url: BASE },
      },
    ],
  };

  return (
    <main className={styles.page} lang={episode.locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />

      <div className={styles.topbar}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/examenes">{isEnglish ? 'Exams' : 'Exámenes'}</Link>
          <span aria-hidden="true">/</span>
          <Link href={episode.hubHref}>{episode.collection}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Podcast</span>
        </nav>
        <Link href={episode.hubHref} className={styles.backLink}>
          <ArrowLeft size={15} aria-hidden="true" /> {isEnglish ? `Back to ${episode.collection}` : `Volver a ${episode.collection}`}
        </Link>
      </div>

      <PodcastFeature
        {...episode}
        description={episode.fullDescription}
        headingLevel={1}
        notes={episode.notes}
        links={episode.relatedLinks}
        locale={episode.locale}
        accent={episode.accent}
      />

      <section className={styles.next} aria-labelledby="next-step-heading">
        <div className={styles.nextShell}>
          <div className={styles.nextHeading}>
            <p><Headphones size={16} aria-hidden="true" /> {isEnglish ? 'From listening to deliberate practice' : 'De la escucha a la práctica deliberada'}</p>
            <h2 id="next-step-heading">
              {isEnglish ? 'Do not stop at the episode.' : 'No te quedes solamente en el episodio.'}
            </h2>
            <span>
              {isEnglish
                ? 'Use the written companion to name the method, then open the route that trains the exact decision you need.'
                : 'Usa la guía escrita para nombrar el método y abre después la ruta que entrena la decisión exacta que necesitas.'}
            </span>
          </div>
          <div className={styles.nextGrid}>
            {episode.relatedLinks.map((link, index) => (
              <Link key={link.href} href={link.href}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <BookOpenText size={20} aria-hidden="true" />
                <strong>{link.label}</strong>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            ))}
          </div>
          <Link className={styles.libraryLink} href="/podcasts">
            {isEnglish ? 'Browse the complete audio library' : 'Ver la biblioteca completa de audio'} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
