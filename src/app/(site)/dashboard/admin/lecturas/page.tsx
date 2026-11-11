import Link from 'next/link'
import { requireAdmin } from '@/lib/auth/require-admin.server'
import { createAdminClient } from '@/lib/supabase/admin'
import { availableExercises } from '@/lib/reading/catalog'
import { readingExercisePath } from '@/lib/reading/routes'
import styles from './reading-submissions.module.css'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Producciones de Reading — WeLearn', robots: { index: false, follow: false } }

export default async function ReadingSubmissionsPage() {
  await requireAdmin()
  const db = createAdminClient()
  const { data: submissions, error } = await db.from('reading_writing_submissions')
    .select('id,student_id,exercise_id,language,level,exercise_title,response_text,response_units,submitted_at')
    .order('submitted_at', { ascending: false }).limit(100)
  if (error) throw new Error('No se pudieron cargar las producciones de Reading.')
  const rows = submissions ?? []
  const studentIds = [...new Set(rows.map((item) => item.student_id))]
  const students = studentIds.length ? await db.from('profiles').select('id,full_name,email').in('id', studentIds) : { data: [], error: null }
  if (students.error) throw new Error('No se pudieron cargar los estudiantes.')
  const studentById = new Map((students.data ?? []).map((item) => [item.id, item]))
  const exerciseById = new Map(availableExercises('en').map((item) => [item.id, item]))

  return <main className={styles.page}>
    <nav><Link href="/dashboard/admin">← Centro operativo</Link><span>Lectura · Producción escrita</span></nav>
    <header><p>WeLearn · Revisión privada</p><h1>Textos de Reading</h1><span>Últimas {rows.length} entregas de estudiantes con sesión</span></header>
    {rows.length ? <div className={styles.list}>{rows.map((row) => {
      const student = studentById.get(row.student_id)
      const exercise = exerciseById.get(row.exercise_id)
      return <article className={styles.card} key={row.id}>
        <div className={styles.cardHead}>
          <div><p>{row.language.toUpperCase()} · {row.level} · {row.response_units} {row.language === 'ja' ? 'caracteres' : 'palabras'}</p><h2>{row.exercise_title}</h2><span>{student?.full_name || student?.email || 'Estudiante'} · {new Date(row.submitted_at).toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</span></div>
          <div className={styles.links}><Link href={`/dashboard/admin/estudiantes/${row.student_id}`}>Ver estudiante →</Link>{exercise && <Link href={readingExercisePath('en', exercise.language, exercise.level.cefr, exercise.slug)}>Abrir lectura →</Link>}</div>
        </div>
        <div className={styles.response} lang={row.language}>{row.response_text}</div>
      </article>
    })}</div> : <section className={styles.empty}><h2>Aún no hay entregas</h2><p>Los textos aparecerán aquí cuando un estudiante con sesión pulse «Send my writing» en una lectura avanzada.</p></section>}
  </main>
}
