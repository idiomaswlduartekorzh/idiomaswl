import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock3, Headphones, ShieldCheck } from 'lucide-react';

import EpisodeNotes, { type EpisodeSection } from './EpisodeNotes';
import styles from './PodcastFeature.module.css';

type PodcastLink = {
  href: string;
  label: string;
};

type PodcastFeatureProps = {
  id: string;
  title: string;
  description: string;
  duration: string;
  audioSrc: string;
  outcomes: readonly string[];
  editorialTitle: string;
  editorialBody: string;
  links?: readonly PodcastLink[];
  notes?: EpisodeSection[];
  compact?: boolean;
  accent?: string;
  variant?: 'default' | 'ios';
  locale?: 'en' | 'es';
  headingLevel?: 1 | 2;
};

const COPY = {
  en: {
    eyebrow: 'Start here · Audio guide',
    duration: 'Episode length',
    orientation: 'Orientation episode · English',
    noAutoplay: 'No autoplay',
    play: 'Play',
    fallback: 'Your browser does not support the audio player.',
    download: 'Download the episode',
    outcomes: 'By the end, you should be able to',
    links: 'Continue from the audio guide',
    editorialAria: 'Editorial accuracy note',
    editorial: 'Editorially reviewed',
  },
  es: {
    eyebrow: 'Empieza aquí · Guía en audio',
    duration: 'Duración del episodio',
    orientation: 'Episodio de orientación · Español',
    noAutoplay: 'Sin reproducción automática',
    play: 'Reproducir',
    fallback: 'Tu navegador no admite el reproductor de audio.',
    download: 'Descargar el episodio',
    outcomes: 'Al terminar, podrás',
    links: 'Continúa desde la guía en audio',
    editorialAria: 'Nota de precisión editorial',
    editorial: 'Revisión editorial',
  },
} as const;

export default function PodcastFeature({
  id,
  title,
  description,
  duration,
  audioSrc,
  outcomes,
  editorialTitle,
  editorialBody,
  links = [],
  notes,
  compact = false,
  accent = '#2563eb',
  variant = 'default',
  locale = 'en',
  headingLevel = 2,
}: PodcastFeatureProps) {
  const tone = {
    '--podcast-accent': accent,
  } as CSSProperties;
  const copy = COPY[locale];
  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  return (
    <section
      id={id}
      className={`${styles.section}${compact ? ` ${styles.compactSection}` : ''}${variant === 'ios' ? ` ${styles.iosSection}` : ''}`}
      aria-labelledby={`${id}-heading`}
      style={tone}
    >
      <div className="wrap">
        <div className={`${styles.panel}${compact ? ` ${styles.compact}` : ''}${variant === 'ios' ? ` ${styles.ios}` : ''}`}>
          <div className={styles.header}>
            <div>
              <p className={styles.eyebrow}>
                <Headphones size={16} aria-hidden="true" /> {copy.eyebrow}
              </p>
              <Heading id={`${id}-heading`}>{title}</Heading>
              <p>{description}</p>
            </div>
            <div className={styles.duration} aria-label={`${copy.duration}: ${duration}`}>
              <Clock3 size={18} aria-hidden="true" />
              <span>{duration}</span>
            </div>
          </div>

          <div className={styles.playerShell}>
            <div className={styles.nowPlaying}>
              <span>{copy.orientation}</span>
              <strong>{copy.noAutoplay}</strong>
            </div>
            <audio className={styles.audioPlayer} controls preload="metadata" aria-label={`${copy.play} ${title}`}>
              <source src={audioSrc} type="audio/mpeg" />
              {copy.fallback} <a href={audioSrc}>{copy.download}</a>.
            </audio>
          </div>

          <div className={styles.body}>
            <div className={styles.episodeMap}>
              <p className={styles.label}>{copy.outcomes}</p>
              <ul>
                {outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
              </ul>
              {links.length > 0 && (
                <nav className={styles.links} aria-label={copy.links}>
                  {links.map((link) => (
                    <Link key={link.href} href={link.href}>
                      {link.label} <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  ))}
                </nav>
              )}
            </div>

            <aside className={styles.editorialNote} aria-label={copy.editorialAria}>
              <ShieldCheck size={22} aria-hidden="true" />
              <div>
                <p className={styles.label}>{copy.editorial}</p>
                <h3>{editorialTitle}</h3>
                <p>{editorialBody}</p>
              </div>
            </aside>
          </div>

          {!compact && notes && (
            <EpisodeNotes
              sections={notes}
              locale={locale}
              tone={{
                accent,
                ink: '#14324a',
                muted: '#526b7c',
                line: '#c9d6df',
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
