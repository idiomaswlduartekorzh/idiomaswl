'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { TOEFLWritingReportPanel } from '@/components/labs/TOEFLWritingReportPanel';
import { ToeflReportCheckout } from '@/components/toefl/ToeflReportCheckout';
import { useWritingAssessment } from '@/lib/labs/hooks/useWritingAssessment';
import type { ToeflPaidReport, ToeflReportResponse } from '@/lib/toefl/report-payment';
import styles from './report.module.css';

function PaidReport({ report, refresh }: { report: ToeflPaidReport; refresh: () => void }) {
  const email = useWritingAssessment('toefl', report.submission.mockId, 1, report.submission.writingEmail, report.assessmentReceipt);
  const discussion = useWritingAssessment('toefl', report.submission.mockId, 2, report.submission.writingDiscussion, report.assessmentReceipt);
  const speakingReady = Boolean(report.submission.reviewedAt
    && report.submission.speakingRepeatAssessment
    && report.submission.speakingInterviewAssessment);

  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Pago confirmado · informe privado</p>
          <h1 className={styles.title}>{report.submission.mockTitle}</h1>
          <p className={styles.lead}>Informe de {report.submission.studentName}. Los resultados son estimaciones pedagógicas de una práctica fija; no son un score oficial de ETS ni reproducen su algoritmo adaptativo.</p>
        </header>

        <section className={styles.grid} aria-label="Resultados objetivos">
          {report.submission.skills.map(skill => (
            <article className={styles.card} key={skill.skill}>
              <h2>{skill.skill}</h2>
              <p className={styles.score}>{skill.label}</p>
              <p className={styles.muted}>{skill.raw ?? 'Puntaje bruto de práctica.'}</p>
            </article>
          ))}
        </section>

        <section className={styles.writing} aria-labelledby="paid-writing-title">
          <h2 id="paid-writing-title">Corrección de Writing</h2>
          <TOEFLWritingReportPanel taskLabel="Write an Email" state={email.state} result={email.result ?? report.submission.writingEmailAssessment} />
          <TOEFLWritingReportPanel taskLabel="Academic Discussion" state={discussion.state} result={discussion.result ?? report.submission.writingDiscussionAssessment} />
        </section>

        <section aria-labelledby="paid-speaking-title">
          <h2 id="paid-speaking-title">Revisión de Speaking</h2>
          {!speakingReady && (
            <div className={styles.notice} role="status">
              Tus 11 grabaciones están en revisión humana. El plazo máximo informado al pagar es de {report.speakingReviewSlaHours} horas. Esta página conservará el acceso en este navegador.
            </div>
          )}
          {speakingReady && (
            <div className={styles.speaking}>
              <article className={styles.card}><h3>Listen and Repeat</h3><p className={styles.score}>{report.submission.speakingRepeatAssessment!.score}/5</p><p className={styles.notes}>{report.submission.speakingRepeatAssessment!.evidenceNotes}</p></article>
              <article className={styles.card}><h3>Take an Interview</h3><p className={styles.score}>{report.submission.speakingInterviewAssessment!.score}/5</p><p className={styles.notes}>{report.submission.speakingInterviewAssessment!.evidenceNotes}</p></article>
            </div>
          )}
        </section>

        <div className={styles.actions}>
          {!speakingReady && <button type="button" className={styles.button} onClick={refresh}>Actualizar revisión</button>}
          <Link className={`${styles.button} ${styles.buttonAlt}`} href="/examenes/toefl">Hacer otro simulacro</Link>
        </div>
      </div>
    </main>
  );
}

export default function ToeflPaidReportClient({ submissionId }: { submissionId: string }) {
  const [report, setReport] = useState<ToeflReportResponse | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/toefl/reports/${encodeURIComponent(submissionId)}`, { cache: 'no-store' });
      const data = await response.json().catch(() => null) as (ToeflReportResponse & { error?: string }) | null;
      if (!response.ok || !data?.ok) throw new Error(data?.error ?? 'No pudimos consultar el informe.');
      setReport(data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'No pudimos consultar el informe.');
    } finally {
      setLoading(false);
    }
  }, [submissionId]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);
  useEffect(() => {
    if (!report || report.paymentStatus === 'APPROVED') return;
    const interval = window.setInterval(() => { void load(); }, 4_000);
    return () => window.clearInterval(interval);
  }, [load, report]);

  if (report?.paymentStatus === 'APPROVED') return <PaidReport report={report} refresh={() => { void load(); }} />;
  if (report) {
    return <ToeflReportCheckout submissionId={submissionId} mockTitle="Informe TOEFL 2026" />;
  }
  return (
    <main className={styles.page}>
      <section className={styles.statusShell}>
        <p className={styles.eyebrow}>Informe TOEFL privado</p>
        <h1>{loading ? 'Verificando el pago…' : 'No pudimos abrir el informe'}</h1>
        <p className={error ? styles.error : styles.muted}>{error || 'Esperamos el evento firmado de Wompi; no usamos la redirección como comprobante.'}</p>
        <div className={styles.actions}>
          {!loading && <button type="button" className={styles.button} onClick={() => { void load(); }}>Intentar de nuevo</button>}
          <Link className={`${styles.button} ${styles.buttonAlt}`} href="/examenes/toefl">Volver a TOEFL</Link>
        </div>
      </section>
    </main>
  );
}
