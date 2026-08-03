'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { IcfesPracticeQuestion } from '@/data/icfes/questions';
import styles from '../icfes-learning.module.css';

interface StoredAttempt { questionId: string; selectedIndex: number; isCorrect: boolean; elapsedSeconds: number; answeredAt: string }
interface QueueItem { question: IcfesPracticeQuestion; attempt: StoredAttempt }

const PROGRESS_PREFIX = 'wl:icfes:part-progress:v1:';
const RESOLVED_KEY = 'wl:icfes:error-review:resolved:v1';

function readResolved(): Record<string, string> {
  try { return JSON.parse(window.localStorage.getItem(RESOLVED_KEY) ?? '{}') as Record<string, string>; } catch { return {}; }
}
function trackReview(questionId: string) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: 'icfes_error_review_complete', question_id: questionId });
}
export default function ErrorReviewClient({ questions }: { questions: IcfesPracticeQuestion[] }) {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const byId = new Map(questions.map((question) => [question.id, question]));
    const latestWrong = new Map<string, StoredAttempt>();
    const resolved = readResolved();
    try {
      for (let index = 0; index < window.localStorage.length; index++) {
        const key = window.localStorage.key(index);
        if (!key?.startsWith(PROGRESS_PREFIX)) continue;
        const progress = JSON.parse(window.localStorage.getItem(key) ?? '{}') as { attempts?: StoredAttempt[] };
        for (const attempt of progress.attempts ?? []) {
          if (attempt.isCorrect || resolved[attempt.questionId]) continue;
          const previous = latestWrong.get(attempt.questionId);
          if (!previous || previous.answeredAt < attempt.answeredAt) latestWrong.set(attempt.questionId, attempt);
        }
      }
    } catch {
      // Una clave dañada no bloquea el resto del repaso.
    }
    const setLocalQueue = () => setQueue([...latestWrong.values()].flatMap((attempt) => {
      const question = byId.get(attempt.questionId);
      return question ? [{ question, attempt }] : [];
    }).sort((a, b) => a.attempt.answeredAt.localeCompare(b.attempt.answeredAt)));
    setLocalQueue();

    void fetch('/api/icfes/practice-progress').then(async (response) => {
      if (!response.ok) return;
      const remote = await response.json() as {
        errors?: { question_key: string; last_wrong_at: string }[];
        attempts?: { question_key: string; selected_index: number; elapsed_seconds: number; answered_at: string }[];
      };
      const latestRemote = new Map((remote.attempts ?? []).map((attempt) => [attempt.question_key, attempt]));
      for (const error of remote.errors ?? []) {
        if (resolved[error.question_key]) continue;
        const attempt = latestRemote.get(error.question_key);
        if (!attempt) continue;
        const previous = latestWrong.get(error.question_key);
        if (!previous || previous.answeredAt < attempt.answered_at) latestWrong.set(error.question_key, {
          questionId: error.question_key,
          selectedIndex: attempt.selected_index,
          isCorrect: false,
          elapsedSeconds: attempt.elapsed_seconds,
          answeredAt: attempt.answered_at,
        });
      }
      setLocalQueue();
    }).catch(() => { /* la cola local sigue disponible */ }).finally(() => setReady(true));
    const fallback = window.setTimeout(() => setReady(true), 900);
    return () => window.clearTimeout(fallback);
  }, [questions]);

  function resolve(questionId: string) {
    const resolved = readResolved();
    resolved[questionId] = new Date().toISOString();
    try { window.localStorage.setItem(RESOLVED_KEY, JSON.stringify(resolved)); } catch { /* funciona sin persistencia */ }
    void fetch('/api/icfes/practice-progress', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ resolveQuestionId: questionId }), keepalive: true }).catch(() => {});
    setQueue((items) => items.filter((item) => item.question.id !== questionId));
    trackReview(questionId);
  }

  if (!ready) return <div className={styles.reviewEmpty}>Preparando tu cola de repaso…</div>;
  if (!queue.length) return (
    <div className={styles.reviewEmpty}>
      <span aria-hidden="true">✓</span><h2>No tienes errores pendientes</h2>
      <p>Responde una práctica guiada. Las preguntas incorrectas aparecerán aquí sin pedirte una cuenta.</p>
      <Link href="/practica/icfes-saber-11/parte-1" className={styles.primaryButton}>Hacer práctica guiada</Link>
    </div>
  );

  return (
    <div className={styles.reviewQueue}>
      <div className={styles.reviewSummary}><strong>{queue.length}</strong><div><span>errores pendientes</span><p>Empieza por el más antiguo. Después de revisarlo, vuelve a aplicar la habilidad en otra pregunta.</p></div></div>
      {queue.map(({ question, attempt }, index) => (
        <article className={styles.reviewCard} key={question.id}>
          <div className={styles.reviewCardTop}><span>Repaso {index + 1} · Parte {question.officialPart}</span><small>Respondida {new Date(attempt.answeredAt).toLocaleDateString('es-CO')}</small></div>
          <h2>{question.prompt}</h2>
          <div className={styles.reviewAnswerGrid}>
            <div data-correct="false"><span>Tu respuesta</span><strong>{question.options[attempt.selectedIndex]?.text ?? 'Sin dato'}</strong></div>
            <div data-correct="true"><span>Respuesta correcta</span><strong>{question.options[question.answerIndex].text}</strong></div>
          </div>
          <div className={styles.reviewEvidence}><span>Evidencia</span><mark>“{question.evidence.quote}”</mark><p>{question.evidence.reason}</p></div>
          <div className={styles.reviewLesson}><strong>{question.microLesson.title}</strong><p>{question.microLesson.body}</p></div>
          <div className={styles.reviewActions}><button type="button" className={styles.primaryButton} onClick={() => resolve(question.id)}>✓ Ya entendí este error</button><Link href={question.reinforcement.href} className={styles.secondaryButton}>Aplicar en otra práctica</Link></div>
        </article>
      ))}
    </div>
  );
}
