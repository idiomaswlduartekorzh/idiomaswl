'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Home.module.css';
import { HOME_RESULT_FAMILIES, HOME_RESULTS, type HomeResultFamily } from './home-results';

type ResultFilter = HomeResultFamily | 'all';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M14 6l6 6-6 6" />
    </svg>
  );
}

export default function HomeResultsArchive() {
  const [filter, setFilter] = useState<ResultFilter>('all');
  const [expanded, setExpanded] = useState(false);
  const spotlight = HOME_RESULTS.filter((result) => result.spotlight);
  const selectedCount = filter === 'all'
    ? HOME_RESULTS.length
    : HOME_RESULTS.filter((result) => result.family === filter).length;
  const shownCount = filter === 'all' && !expanded ? 8 : selectedCount;

  return (
    <section
      id="resultados"
      className={styles.resultsArchiveSection}
      aria-labelledby="results-archive-title"
    >
      <div className={styles.resultsEntryLine} aria-hidden="true"><span /></div>

      <div className={styles.resultsArchiveIntro}>
        <div>
          <p className={styles.eyebrow}>05 · El resultado deja evidencia</p>
          <h2 id="results-archive-title">
            Una ruta se puede <em>comprobar.</em>
          </h2>
        </div>
        <div className={styles.resultsArchiveCopy}>
          <p>
            Estos fragmentos pertenecen a reportes oficiales obtenidos por estudiantes
            de WeLearn. Conservamos lo importante —el resultado— y protegemos por completo
            la identidad.
          </p>
          <div className={styles.resultsCount}>
            <strong>37</strong>
            <span>evidencias publicables en cuatro familias de certificación</span>
          </div>
        </div>
      </div>

      <div className={styles.resultsFan} aria-label="Selección de resultados reales">
        {spotlight.map((result) => (
          <figure className={styles.resultsSpotlight} key={`spotlight-${result.id}`}>
            <div>
              <Image
                src={result.image}
                alt={result.alt}
                fill
                sizes="(max-width: 760px) 76vw, (max-width: 1180px) 38vw, 350px"
              />
            </div>
            <figcaption>
              <small>{result.exam}</small>
              <strong>{result.result}</strong>
              <span>Identidad protegida</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className={styles.resultsArchiveNote}>
        Los resultados son históricos y no garantizan una puntuación. WeLearn es una
        academia independiente; los nombres de los exámenes no implican afiliación ni aval.
      </p>

      <div className={styles.resultsExplore}>
        <div className={styles.resultsControls} aria-label="Filtrar resultados por examen">
          <span>EXPLORAR EL ARCHIVO</span>
          {HOME_RESULT_FAMILIES.map((family) => (
            <button
              type="button"
              key={family.id}
              aria-pressed={filter === family.id}
              onClick={() => setFilter(family.id)}
            >
              {family.label} · {family.count}
            </button>
          ))}
        </div>

        <p className={styles.resultsStatus} role="status" aria-live="polite">
          Mostrando {shownCount} {shownCount === 1 ? 'evidencia' : 'evidencias'}
        </p>

        <div className={styles.resultsArchiveGrid} id="home-results-grid">
          {HOME_RESULTS.map((result) => {
            const filteredOut = filter !== 'all' && result.family !== filter;
            const beyondPreview = filter === 'all' && !expanded && !result.featured;
            const suppressed = filteredOut || beyondPreview;

            return (
              <figure
                className={`${styles.resultArchiveTile}${suppressed ? ` ${styles.resultArchiveTileSuppressed}` : ''}`}
                key={result.id}
                aria-hidden={suppressed || undefined}
              >
                <div>
                  <Image
                    src={result.image}
                    alt={result.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 600px) calc(100vw - 56px), (max-width: 960px) 44vw, 23vw"
                  />
                </div>
                <figcaption>
                  <strong>{result.result}</strong>
                  <span>{result.exam} · identidad protegida</span>
                  <Link href={result.href} aria-label={`Ver preparación para ${result.exam}`}>
                    Ver preparación <ArrowIcon />
                  </Link>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {filter === 'all' ? (
          <button
            className={styles.resultsToggle}
            type="button"
            aria-expanded={expanded}
            aria-controls="home-results-grid"
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? 'Mostrar una selección' : 'Ver las 37 evidencias'}
          </button>
        ) : null}
      </div>

      <aside className={styles.resultsPrivacy}>
        <strong>PRIVACIDAD</strong>
        <p>
          No publicamos nombres, rostros, documentos, números de candidato, códigos QR,
          firmas ni datos de contacto. Una fotografía duplicada y una página sin
          puntuación verificable quedaron fuera del archivo público.
        </p>
      </aside>
    </section>
  );
}
