import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock3, Headphones, Library, ShieldCheck } from 'lucide-react';

import type { ExamPodcastEpisode } from '@/data/practica/exam-podcast-catalog';
import styles from './ExamPodcastShelf.module.css';

type ExamPodcastShelfProps = {
  episodes: readonly ExamPodcastEpisode[];
  eyebrow?: string;
  title?: string;
  description?: string;
  locale?: 'en' | 'es';
  id?: string;
};

const COPY = {
  en: {
    kicker: 'Audio study room',
    title: 'Listen to the map. Continue inside the exam.',
    description: 'Each episode has its own reviewed page, written companion and direct route into focused practice.',
    episode: 'Editorial audio guide',
    noAutoplay: 'No autoplay',
    open: 'Open the full episode and notes',
    practise: 'Continue to practice',
    trust: 'Separate, indexable episode pages keep the audio, editorial corrections and related practice in one place.',
  },
  es: {
    kicker: 'Sala de estudio en audio',
    title: 'Escucha el mapa. Continúa dentro del examen.',
    description: 'Cada episodio tiene su propia página revisada, guía escrita y una ruta directa hacia la práctica correspondiente.',
    episode: 'Guía editorial en audio',
    noAutoplay: 'Sin reproducción automática',
    open: 'Abrir episodio completo y notas',
    practise: 'Continuar con la práctica',
    trust: 'Las páginas indexables mantienen juntos el audio, las correcciones editoriales y la práctica relacionada.',
  },
} as const;

export default function ExamPodcastShelf({
  episodes,
  eyebrow,
  title,
  description,
  locale = 'es',
  id = 'podcasts-del-examen',
}: ExamPodcastShelfProps) {
  if (episodes.length === 0) return null;
  const copy = COPY[locale];

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-heading`}>
      <div className={`${styles.shell} wl-hub-panel`}>
        <header className={`${styles.heading} wl-hub-heading`}>
          <div>
            <p className={styles.kicker}><Headphones size={16} aria-hidden="true" /> {eyebrow ?? copy.kicker}</p>
            <h2 id={`${id}-heading`}>{title ?? copy.title}</h2>
          </div>
          <p>{description ?? copy.description}</p>
        </header>

        <div className={`${styles.grid}${episodes.length === 1 ? ` ${styles.single}` : ''}`}>
          {episodes.map((episode, index) => (
            <article
              key={episode.href}
              className={styles.card}
              style={{ '--episode-accent': episode.accent } as CSSProperties}
            >
              <div className={styles.cardTop}>
                <span className={styles.index} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div className={styles.meta}>
                  <span>{copy.episode}</span>
                  <span><Clock3 size={13} aria-hidden="true" /> {episode.duration}</span>
                  <span>{episode.language}</span>
                </div>
              </div>

              <h3>{episode.title}</h3>
              <p className={styles.description}>{episode.description}</p>

              <div className={styles.player}>
                <div><Headphones size={15} aria-hidden="true" /><span>{copy.noAutoplay}</span></div>
                <audio controls preload="none" aria-label={`${episode.title} · ${episode.duration}`}>
                  <source src={episode.audioSrc} type="audio/mpeg" />
                </audio>
              </div>

              <div className={styles.actions}>
                <Link href={episode.href} className={styles.primary}>
                  {copy.open} <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link href={episode.hubHref} className={styles.secondary}>
                  {copy.practise}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <aside className={styles.trust}>
          <ShieldCheck size={20} aria-hidden="true" />
          <span>{copy.trust}</span>
          <Link href="/podcasts"><Library size={15} aria-hidden="true" /> {locale === 'en' ? 'All audio guides' : 'Todas las guías'}</Link>
        </aside>
      </div>
    </section>
  );
}
