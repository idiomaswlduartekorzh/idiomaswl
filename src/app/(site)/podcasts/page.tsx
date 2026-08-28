import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock3, Headphones, ShieldCheck } from 'lucide-react';

import { PODCAST_LIBRARY } from '@/data/practica/podcast-library';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Podcasts de exámenes: IELTS, TOEFL, SAT, TOPIK y Goethe',
  description: 'Escucha gratis las guías en audio de WeLearn para IELTS, TOEFL iBT, ICFES Saber 11, Cambridge B2 First, Digital SAT, TOPIK I y Goethe-Zertifikat.',
  alternates: { canonical: 'https://www.idiomaswl.com/podcasts' },
  openGraph: {
    title: 'Biblioteca de podcasts de WeLearn',
    description: 'Diez guías editoriales en audio para entender el examen antes de practicarlo.',
    url: 'https://www.idiomaswl.com/podcasts',
    type: 'website',
    locale: 'es_CO',
    siteName: 'Idiomas WeLearn',
  },
};

const WAVE_HEIGHTS = [22, 42, 30, 68, 48, 84, 38, 62, 94, 54, 76, 34, 58, 88, 46, 70, 28, 52, 80, 40, 64, 32, 48, 72];

export default function PodcastsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="podcast-library-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><Headphones size={16} aria-hidden="true" /> Biblioteca de audio</p>
            <h1 id="podcast-library-title">Estrategia que se escucha.</h1>
            <p className={styles.lead}>
              Diez episodios gratuitos para entender el examen antes de practicarlo. Escucha aquí o abre la guía completa con notas, rutas y ejercicios.
            </p>
            <div className={styles.heroStats} aria-label="Resumen de la biblioteca">
              <span><strong>10</strong> guías en audio</span>
              <span><strong>3 h 35 min</strong> de orientación</span>
              <span><strong>7</strong> rutas de examen</span>
            </div>
          </div>

          <div className={styles.signal} aria-hidden="true">
            <span className={styles.onAir}>Archivo · WeLearn</span>
            <div className={styles.wave}>
              {WAVE_HEIGHTS.map((height, index) => (
                <i key={`${height}-${index}`} style={{ '--wave-height': `${height}%` } as CSSProperties} />
              ))}
            </div>
            <strong>10</strong>
            <small>episodios publicados</small>
          </div>
        </div>
      </section>

      <section className={styles.library} aria-labelledby="podcast-library-list-title">
        <header className={styles.libraryHeader}>
          <div>
            <p className={styles.kicker}>La colección completa</p>
            <h2 id="podcast-library-list-title">Elige una guía y dale play.</h2>
          </div>
          <p>Sin registro, sin reproducción automática y con revisión editorial visible en cada ruta.</p>
        </header>

        <div className={styles.episodes}>
          {PODCAST_LIBRARY.map((episode, index) => (
            <article
              className={styles.episode}
              id={episode.id}
              key={episode.id}
              style={{ '--episode-accent': episode.accent } as CSSProperties}
            >
              <div className={styles.episodeIndex} aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
              <div className={styles.episodeMain}>
                <div className={styles.meta}>
                  <span>{episode.collection}</span>
                  <span>{episode.language}</span>
                  <span><Clock3 size={14} aria-hidden="true" /> {episode.duration}</span>
                </div>
                <h3>{episode.title}</h3>
                <p>{episode.description}</p>
                <audio controls preload="none" aria-label={`Reproducir ${episode.title}`}>
                  <source src={episode.audioSrc} type="audio/mpeg" />
                  Tu navegador no admite el reproductor. <a href={episode.audioSrc}>Descarga el episodio</a>.
                </audio>
              </div>
              <div className={styles.episodeAction}>
                <Link href={episode.href}>
                  Abrir episodio y notas <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <aside className={styles.trust} aria-label="Cómo se publican estas guías">
          <ShieldCheck size={28} aria-hidden="true" />
          <div>
            <p className={styles.kicker}>Audio con contexto</p>
            <h2>Cada episodio conserva su revisión editorial.</h2>
            <p>Las páginas de destino explican qué datos fueron revisados, separan las reglas oficiales de las recomendaciones de estudio y conectan el audio con práctica concreta.</p>
          </div>
          <Link href="/practica">Explorar toda la práctica <ArrowRight size={17} aria-hidden="true" /></Link>
        </aside>
      </section>
    </div>
  );
}
