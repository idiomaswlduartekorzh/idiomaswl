import type { CSSProperties } from 'react';
import { ChevronDown } from 'lucide-react';

import styles from './PodcastTranscript.module.css';

type PodcastTranscriptTone = {
  /** Colour used for the chevron and the focus ring. */
  accent?: string;
  /** Body text colour. */
  ink?: string;
  /** Secondary text colour, used for the meta line and the intro. */
  muted?: string;
  /** Hairline colour for the two dividers. */
  line?: string;
};

type PodcastTranscriptProps = {
  /** Transcript paragraphs, in order. Rendered inside the collapsed panel. */
  paragraphs: string[];
  /** BCP-47 tag of the spoken language. The episodes are recorded in English. */
  lang?: string;
  /** Page-specific colours, passed as CSS variables. */
  tone?: PodcastTranscriptTone;
};

/**
 * Collapsed-by-default transcript for the audio guides.
 *
 * Uses a native <details>, so the text ships inside the server-rendered HTML and
 * stays crawlable while the page still opens quiet. No client JavaScript.
 */
export default function PodcastTranscript({
  paragraphs,
  lang = 'en',
  tone,
}: PodcastTranscriptProps) {
  if (paragraphs.length === 0) return null;

  const words = paragraphs.reduce((total, paragraph) => total + paragraph.split(/\s+/).length, 0);

  const toneVars = {
    ...(tone?.accent ? { '--pt-accent': tone.accent } : {}),
    ...(tone?.ink ? { '--pt-ink': tone.ink } : {}),
    ...(tone?.muted ? { '--pt-muted': tone.muted } : {}),
    ...(tone?.line ? { '--pt-line': tone.line } : {}),
  } as CSSProperties;

  return (
    <details className={styles.wrapper} style={toneVars}>
      <summary className={styles.summary}>
        <span className={styles.summaryLabel}>
          <strong>Transcripción completa del episodio</strong>
          <span className={styles.summaryMeta}>
            {words.toLocaleString('es-CO')} palabras · en inglés · se lee en unos{' '}
            {Math.round(words / 200)} minutos
          </span>
        </span>
        <ChevronDown className={styles.chevron} size={22} aria-hidden="true" />
      </summary>

      <div className={styles.body}>
        <p className={styles.intro}>
          Transcripción del audio, en inglés. Se generó automáticamente y se revisaron a mano
          los términos del examen. Sirve para seguir el episodio leyendo, para buscar una parte
          concreta con el buscador del navegador, o para estudiarlo sin sonido. Las
          imprecisiones señaladas arriba también aparecen aquí, porque el texto recoge lo que
          se dice, no lo que debería decir.
        </p>
        <div className={styles.scroll} lang={lang}>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </details>
  );
}
