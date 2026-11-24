import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { createAdminClient } from '@/lib/supabase/admin';
import { AGENDA_PATH, BOGOTA, bogotaDay, bogotaDateTime, dayAtOffset, weekOf, type Lesson } from '@/lib/admin-operations/agenda';
import { isGoogleCalendarConfigured } from '@/lib/admin-operations/google-calendar.server';
import { CalendarSyncButton, LessonForm, LessonCard } from './LessonForms';
import styles from './agenda.module.css';

export const metadata: Metadata = {
  title: 'Agenda de clases · Administración',
  robots: { index: false, follow: false },
};

const dayHeading = new Intl.DateTimeFormat('es-CO', { weekday: 'short', day: 'numeric', month: 'short', timeZone: BOGOTA });

function weekLink(day: string) {
  return `${AGENDA_PATH}?semana=${day}`;
}

export default async function AgendaPage({ searchParams }: { searchParams: Promise<{ semana?: string }> }) {
  try {
    await requireAdmin();
  } catch {
    redirect('/dashboard');
  }

  const today = bogotaDay();
  const params = await searchParams;
  const week = weekOf(typeof params.semana === 'string' ? params.semana : today);
  const defaultDay = today >= week.first && today < week.next ? today : week.first;
  const db = createAdminClient();
  const calendarConfigured = isGoogleCalendarConfigured();
  const { data, error } = await db.from('admin_lessons')
    .select('id,title,participant,teacher,starts_at,ends_at,status,updated_at')
    .gte('starts_at', `${week.first}T00:00:00-05:00`)
    .lt('starts_at', `${week.next}T00:00:00-05:00`)
    .order('starts_at').order('id')
    .returns<Lesson[]>();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <Link className={styles.back} href="/dashboard/admin"><ArrowLeft size={16} /> Centro operativo</Link>
          <h1>Agenda de clases</h1>
          <p>Hora de Colombia · UTC−5</p>
        </div>
        <Link className={styles.button} href="/dashboard/admin/pagos">Pagos y finanzas</Link>
      </header>
      <nav className={styles.weekNav} aria-label="Navegación semanal">
        <Link className={styles.button} href={weekLink(dayAtOffset(week.first, -7))} aria-label="Semana anterior"><ChevronLeft size={18} /></Link>
        <strong>{dayHeading.formatRange(new Date(`${week.first}T12:00:00-05:00`), new Date(`${week.days[6]}T12:00:00-05:00`))}</strong>
        <Link className={styles.button} href={weekLink(week.next)} aria-label="Semana siguiente"><ChevronRight size={18} /></Link>
        <Link className={styles.button} href={AGENDA_PATH}>Esta semana</Link>
        <form action={AGENDA_PATH}>
          <label><span className={styles.srOnly}>Ir a una fecha</span><input className={styles.date} type="date" name="semana" defaultValue={defaultDay} required /></label>
          <button className={styles.button}>Ir</button>
        </form>
      </nav>
      {error ? <p className={styles.error} role="alert">La agenda no está disponible. Intenta actualizar la página.</p> : (
        <>
          {calendarConfigured && (
            <div className={styles.calendarStatus}>
              <span>Los cambios se envían a Google Calendar al guardar.</span>
              <CalendarSyncButton key={week.first} week={week.first} />
            </div>
          )}
          <div className={styles.week}>
            {week.days.map(day => {
              const lessons = (data ?? []).filter(lesson => bogotaDateTime(lesson.starts_at).startsWith(day));
              return (
                <section key={day} className={styles.day} aria-current={day === today ? 'date' : undefined}>
                  <h2>{dayHeading.format(new Date(`${day}T12:00:00-05:00`))}</h2>
                  {lessons.map(lesson => <LessonCard key={`${lesson.id}:${lesson.updated_at}`} lesson={lesson} calendarConfigured={calendarConfigured} />)}
                  {!lessons.length && <p className={styles.empty}>Sin clases</p>}
                </section>
              );
            })}
          </div>
          <section className={styles.newLesson}>
            <h2>Programar clase</h2>
            <LessonForm key={defaultDay} defaultDay={defaultDay} requestId={crypto.randomUUID()} />
          </section>
        </>
      )}
    </div>
  );
}
