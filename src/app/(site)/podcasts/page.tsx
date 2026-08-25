import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock3, Headphones, ShieldCheck } from 'lucide-react';

import { PODCAST_LIBRARY } from '@/data/practica/podcast-library';
import styles from './page.module.css';

const BASE = 'https://www.idiomaswl.com';
const TOTAL_SECONDS = PODCAST_LIBRARY.reduce((total, episode) => {
  const [minutes, seconds] = episode.duration.split(':').map(Number);
  return total + minutes * 60 + seconds;
}, 0);
const TOTAL_DURATION = `${Math.floor(TOTAL_SECONDS / 3600)} h ${Math.round((TOTAL_SECONDS % 3600) / 60)} min`;
const EXAM_COUNT = new Set(PODCAST_LIBRARY.map((episode) => episode.examSlug)).size;
const COLLECTIONS = [...new Set(PODCAST_LIBRARY.map((episode) => episode.collection))];
const COLLECTION_LABEL = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' }).format(COLLECTIONS);

export const metadata: Metadata = {
  title: 'Podcasts para preparar exámenes | IELTS, TOEFL y más',
  description: `Escucha gratis ${PODCAST_LIBRARY.length} guías editoriales en audio para preparar ${COLLECTION_LABEL}.`,
  alternates: { canonical: 'https://www.idiomaswl.com/podcasts' },
  openGraph: {
    title: 'Biblioteca de podcasts de WeLearn',
    description: `${PODCAST_LIBRARY.length} guías editoriales en audio para entender el examen antes de practicarlo.`,
    url: 'https://www.idiomaswl.com/podcasts',
    type: 'website',
    locale: 'es_CO',
    siteName: 'Idiomas WeLearn',
  },
};

const WAVE_HEIGHTS = [22, 42, 30, 68, 48, 84, 38, 62, 94, 54, 76, 34, 58, 88, 46, 70, 28, 52, 80, 40, 64, 32, 48, 72];

export default function PodcastsPage() {
  const url = `${BASE}/podcasts`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Herramientas', item: `${BASE}/herramientas` },
          { '@type': 'ListItem', position: 2, name: 'Podcasts de exámenes', item: url },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': `${url}#collection`,
        url,
        name: 'Podcasts para preparar exámenes',
        description: metadata.description,
        isPartOf: { '@type': 'WebPage', name: 'Herramientas', url: `${BASE}/herramientas` },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: PODCAST_LIBRARY.length,
          itemListElement: PODCAST_LIBRARY.map((episode, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: episode.title,
            url: `${BASE}${episode.href}`,
          })),
        },
      },
    ],
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <section className={styles.hero} aria-labelledby="podcast-library-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label="Migas de pan">
              <Link href="/herramientas">Herramientas</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Podcasts</span>
            </nav>
            <p className={styles.eyebrow}><Headphones size={16} aria-hidden="true" /> Biblioteca de audio</p>
            <h1 id="podcast-library-title">Estrategia que se escucha.</h1>
            <p className={styles.lead}>
              {PODCAST_LIBRARY.length} episodios gratuitos para entender el examen antes de practicarlo. Escucha aquí o abre la guía completa con notas, rutas y ejercicios.
            </p>
            <div className={styles.heroStats} aria-label="Resumen de la biblioteca">
              <span><strong>{String(PODCAST_LIBRARY.length).padStart(2, '0')}</strong> guías en audio</span>
              <span><strong>{TOTAL_DURATION}</strong> de orientación</span>
              <span><strong>{EXAM_COUNT}</strong> rutas de examen</span>
            </div>
          </div>

          <div className={styles.signal} aria-hidden="true">
            <span className={styles.onAir}>Archivo · WeLearn</span>
            <div className={styles.wave}>
              {WAVE_HEIGHTS.map((height, index) => (
                <i key={`${height}-${index}`} style={{ '--wave-height': `${height}%` } as CSSProperties} />
              ))}
            </div>
            <strong>{String(PODCAST_LIBRARY.length).padStart(2, '0')}</strong>
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
