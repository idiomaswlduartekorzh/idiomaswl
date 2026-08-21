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
};

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
}: PodcastFeatureProps) {
  const tone = {
    '--podcast-accent': accent,
  } as CSSProperties;

  return (
    <section
      id={id}
      className={`${styles.section}${compact ? ` ${styles.compactSection}` : ''}`}
      aria-labelledby={`${id}-heading`}
      style={tone}
    >
      <div className="wrap">
        <div className={`${styles.panel}${compact ? ` ${styles.compact}` : ''}`}>
          <div className={styles.header}>
            <div>
              <p className={styles.eyebrow}>
                <Headphones size={16} aria-hidden="true" /> Start here · Audio guide
              </p>
              <h2 id={`${id}-heading`}>{title}</h2>
              <p>{description}</p>
            </div>
            <div className={styles.duration} aria-label={`Episode length: ${duration}`}>
              <Clock3 size={18} aria-hidden="true" />
              <span>{duration}</span>
            </div>
          </div>

          <div className={styles.playerShell}>
            <div className={styles.nowPlaying}>
              <span>Orientation episode · English</span>
              <strong>No autoplay</strong>
            </div>
            <audio className={styles.audioPlayer} controls preload="metadata" aria-label={`Play ${title}`}>
              <source src={audioSrc} type="audio/mpeg" />
              Your browser does not support the audio player. <a href={audioSrc}>Download the episode</a>.
            </audio>
          </div>

          <div className={styles.body}>
            <div className={styles.episodeMap}>
              <p className={styles.label}>By the end, you should be able to</p>
              <ul>
                {outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
              </ul>
              {links.length > 0 && (
                <nav className={styles.links} aria-label="Continue from the audio guide">
                  {links.map((link) => (
                    <Link key={link.href} href={link.href}>
                      {link.label} <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  ))}
                </nav>
              )}
            </div>

            <aside className={styles.editorialNote} aria-label="Editorial accuracy note">
              <ShieldCheck size={22} aria-hidden="true" />
              <div>
                <p className={styles.label}>Editorially reviewed</p>
                <h3>{editorialTitle}</h3>
                <p>{editorialBody}</p>
              </div>
            </aside>
          </div>

          {!compact && notes && (
            <EpisodeNotes
              sections={notes}
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
