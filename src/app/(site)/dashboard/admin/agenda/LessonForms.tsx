'use client';

import { useActionState, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { TEACHERS, bogotaDateTime, googleCalendarDraft, type Lesson } from '@/lib/admin-operations/agenda';
import { changeLesson } from './actions';
import styles from './agenda.module.css';

const INITIAL_STATE = { message: '', ok: false };
const LESSON_STATUS = { scheduled: 'Programada', completed: 'Realizada', cancelled: 'Cancelada' };

export function LessonForm({ defaultDay, requestId, lesson }: { defaultDay?: string; requestId?: string; lesson?: Lesson }) {
  const initialDraft = {
    title: lesson?.title ?? '',
    participant: lesson?.participant ?? '',
    teacher: lesson?.teacher ?? 'jose',
    startsAt: lesson ? bogotaDateTime(lesson.starts_at) : `${defaultDay}T09:00`,
    duration: lesson ? String((Date.parse(lesson.ends_at) - Date.parse(lesson.starts_at)) / 60_000) : '60',
    weeks: '1',
  };
  const [draft, setDraft] = useState(initialDraft);
  const [id, setId] = useState(requestId);
  const [state, action, pending] = useActionState(async (previous: typeof INITIAL_STATE, form: FormData) => {
    const result = await changeLesson(previous, form);
    if (result.ok && !lesson) {
      setId(crypto.randomUUID());
      setDraft(initialDraft);
    }
    return result;
  }, INITIAL_STATE);

  function update<Field extends keyof typeof draft>(field: Field, value: (typeof draft)[Field]) {
    setDraft(current => ({ ...current, [field]: value }));
  }
  return (
    <form action={action} className={styles.form}>
      <input type="hidden" name="mode" value={lesson ? 'edit' : 'create'} />
      {lesson ? (
        <>
          <input type="hidden" name="id" value={lesson.id} />
          <input type="hidden" name="version" value={lesson.updated_at} />
        </>
      ) : <input type="hidden" name="requestId" value={id} />}
      <label>Clase <input name="title" value={draft.title} onChange={event => update("title", event.target.value)} placeholder="Inglés · conversación" required maxLength={120} /></label>
      <label>Estudiante o grupo <input name="participant" value={draft.participant} onChange={event => update("participant", event.target.value)} required maxLength={150} /></label>
      <label>Profesor <select name="teacher" value={draft.teacher} onChange={event => update("teacher", event.target.value as Lesson["teacher"])}>
        {Object.entries(TEACHERS).map(([value, name]) => <option key={value} value={value}>{name}</option>)}
      </select></label>
      <label>Fecha y hora <input name="startsAt" type="datetime-local" value={draft.startsAt} onChange={event => update("startsAt", event.target.value)} required /></label>
      <label>Duración en minutos <input name="duration" type="number" min={15} max={240} value={draft.duration} onChange={event => update("duration", event.target.value)} required /></label>
      {!lesson && <label>Semanas consecutivas <input name="weeks" type="number" min={1} max={16} value={draft.weeks} onChange={event => update("weeks", event.target.value)} required /></label>}
      <button className={styles.primary} disabled={pending}>{pending ? 'Guardando…' : lesson ? 'Guardar cambios' : 'Programar clase'}</button>
      {state.message && <p className={state.ok ? styles.success : styles.error} role="status">{state.message}</p>}
    </form>
  );
}

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const [state, action, pending] = useActionState(changeLesson, INITIAL_STATE);
  const start = bogotaDateTime(lesson.starts_at).slice(11);
  const end = bogotaDateTime(lesson.ends_at).slice(11);
  return (
    <article className={styles.lesson} data-status={lesson.status}>
      <span className={styles.time}><time dateTime={lesson.starts_at}>{start}</time>–<time dateTime={lesson.ends_at}>{end}</time></span>
      <strong>{lesson.title}</strong>
      <span>{lesson.participant}</span>
      <small>{TEACHERS[lesson.teacher]} · {LESSON_STATUS[lesson.status]}</small>
      {lesson.status === 'scheduled' && (
        <>
          <a className={styles.calendar} href={googleCalendarDraft(lesson)} target="_blank" rel="noreferrer">
            Borrador en Google Calendar <ExternalLink size={12} aria-hidden />
          </a>
          <details className={styles.manage}>
            <summary>Gestionar clase</summary>
            <LessonForm lesson={lesson} />
            <form className={styles.lessonActions} action={action}>
              <input type="hidden" name="id" value={lesson.id} />
              <input type="hidden" name="version" value={lesson.updated_at} />
              <button className={styles.button} name="mode" value="complete" disabled={pending}>Marcar realizada</button>
              <button className={styles.button} name="mode" value="cancel" disabled={pending}>Cancelar clase</button>
              {state.message && <p role="status" className={state.ok ? styles.success : styles.error}>{state.message}</p>}
            </form>
          </details>
        </>
      )}
    </article>
  );
}
