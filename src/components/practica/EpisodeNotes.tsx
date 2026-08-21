import type { CSSProperties } from 'react';
import { ChevronDown } from 'lucide-react';

import styles from './EpisodeNotes.module.css';

export type EpisodeSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

type EpisodeNotesTone = {
  /** Colour for the chevron, the section rules and the focus ring. */
  accent?: string;
  /** Body text colour. */
  ink?: string;
  /** Secondary text colour, used for the meta line and the intro. */
  muted?: string;
  /** Hairline colour for the dividers. */
  line?: string;
};

type EpisodeNotesProps = {
  sections: EpisodeSection[];
  tone?: EpisodeNotesTone;
  locale?: 'en' | 'es';
};

const COPY = {
  en: {
    title: 'What this episode explains, in writing',
    meta: (sections: number, minutes: number) =>
      `${sections} sections · about ${minutes} minutes to read`,
    intro:
      'The same ground the audio covers, written out: read it instead of listening, follow along while it plays, or search it for the one rule you came back for.',
  },
  es: {
    title: 'Lo que este episodio explica por escrito',
    meta: (sections: number, minutes: number) =>
      `${sections} secciones · ${minutes} min de lectura aprox.`,
    intro:
      'El mismo recorrido del audio, resumido por escrito: puedes leerlo en lugar de escuchar, seguirlo mientras suena o volver directamente a la regla que necesitas.',
  },
} as const;

/**
 * The written companion to an audio guide, collapsed by default.
 *
 * A native <details>, so the whole text ships inside the server-rendered HTML and
 * stays crawlable while the page still opens quiet. No client JavaScript.
 *
 * This is written prose, not a transcript: the episodes are two overlapping
 * synthetic voices, and no transcriber we tried can separate them cleanly enough
 * to publish a verbatim record. Prose also reads better and says the same things
 * without "Oh yeah, right, exactly" between them — and unlike the audio, it can
 * state the official format correctly from the first line.
 */
export default function EpisodeNotes({ sections, tone, locale = 'en' }: EpisodeNotesProps) {
  if (sections.length === 0) return null;

  const words = sections.reduce(
    (total, section) =>
      total +
      [...section.body, ...(section.bullets ?? [])].reduce(
        (count, line) => count + line.split(/\s+/).length,
        0,
      ),
    0,
  );

  const toneVars = {
    ...(tone?.accent ? { '--en-accent': tone.accent } : {}),
    ...(tone?.ink ? { '--en-ink': tone.ink } : {}),
    ...(tone?.muted ? { '--en-muted': tone.muted } : {}),
    ...(tone?.line ? { '--en-line': tone.line } : {}),
  } as CSSProperties;
  const copy = COPY[locale];
  const readingMinutes = Math.max(1, Math.round(words / 200));

  return (
    <details className={styles.wrapper} style={toneVars}>
      <summary className={styles.summary}>
        <span className={styles.summaryLabel}>
          <strong>{copy.title}</strong>
          <span className={styles.summaryMeta}>
            {copy.meta(sections.length, readingMinutes)}
          </span>
        </span>
        <ChevronDown className={styles.chevron} size={22} aria-hidden="true" />
      </summary>

      <div className={styles.body}>
        <p className={styles.intro}>{copy.intro}</p>

        {sections.map((section) => (
          <section key={section.heading} className={styles.section}>
            <h3>{section.heading}</h3>
            {section.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </details>
  );
}
