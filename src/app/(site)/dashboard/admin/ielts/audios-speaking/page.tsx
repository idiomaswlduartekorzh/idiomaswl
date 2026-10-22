import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { getIeltsSpeakingAudioReviewSets } from '@/data/ielts/guided-speaking-review.server';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Revisión de audios IELTS Speaking · Administración',
  robots: { index: false, follow: false },
};

function formatDuration(seconds: number | null) {
  if (seconds === null) return 'Pendiente';
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.round(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}

export default async function IeltsSpeakingAudioReviewPage() {
  try {
    await requireAdmin();
  } catch {
    redirect('/dashboard');
  }

  const sets = getIeltsSpeakingAudioReviewSets();
  const generated = sets.filter(set => set.generated).length;
  const approved = sets.filter(set => set.approved).length;

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>IELTS · CONTROL ACÚSTICO INTERNO</p>
          <h1>Referencias de Speaking</h1>
          <p className={styles.lead}>
            Escucha cada par completo y compáralo con su transcripción. La generación técnica no equivale a aprobación humana.
          </p>
        </div>
        <div className={styles.summary} aria-label="Resumen de revisión">
          <div><strong>{generated}/20</strong><span>sets generados</span></div>
          <div><strong>{approved}/20</strong><span>sets aprobados</span></div>
        </div>
      </header>

      <section className={styles.notice}>
        <strong>Puerta de publicación cerrada.</strong>
        <span>Los reproductores para estudiantes seguirán ocultos hasta registrar una revisión acústica independiente para ambos audios del set.</span>
      </section>

      <div className={styles.setList}>
        {sets.map(set => (
          <article className={styles.setCard} key={set.setNumber}>
            <header className={styles.setHeader}>
              <div>
                <span className={styles.setNumber}>SET {String(set.setNumber).padStart(2, '0')}</span>
                <h2>{set.cueCard.split('\n', 1)[0]}</h2>
              </div>
              <div className={`${styles.status} ${set.approved ? styles.approved : set.generated ? styles.review : styles.pending}`}>
                {set.approved ? 'Aprobado' : set.generated ? 'Por escuchar' : 'Generando'}
              </div>
            </header>

            <div className={styles.samples}>
              {set.samples.map(sample => (
                <section className={styles.sample} key={sample.id}>
                  <div className={styles.sampleTopline}>
                    <strong>Banda {sample.band}</strong>
                    <span>{formatDuration(sample.durationSeconds)}{sample.sampleRate ? ` · ${sample.sampleRate / 1000} kHz` : ''}</span>
                  </div>
                  {sample.generated ? (
                    <audio controls preload="none" src={sample.url} aria-label={`Set ${set.setNumber}, ejemplo banda ${sample.band}`} />
                  ) : (
                    <div className={styles.audioPending}>Audio pendiente de generación</div>
                  )}
                  <details>
                    <summary>Ver transcripción</summary>
                    <p>{sample.transcript}</p>
                  </details>
                  {sample.sha256 && <small>Archivo {sample.sha256.slice(0, 12)}</small>}
                </section>
              ))}
            </div>

            <footer className={styles.setFooter}>
              <Link href={`/examenes/ielts/practica/set-${set.setNumber}/guiado`}>Abrir set guiado →</Link>
            </footer>
          </article>
        ))}
      </div>
    </main>
  );
}
