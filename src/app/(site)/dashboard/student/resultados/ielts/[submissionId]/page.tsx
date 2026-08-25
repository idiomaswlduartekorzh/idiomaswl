import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import type { FullAssessment } from '@/lib/labs/types'
import type { IeltsSpeakingAssessment } from '@/lib/ielts/delegated-review'
import { IELTS_SUBMISSION_ID_PATTERN } from '@/lib/ielts/submission-token.server'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Mi resultado IELTS | WeLearn',
  robots: { index: false, follow: false },
}

interface ResultRow {
  id: string
  mock_title: string | null
  created_at: string
  listening_band: number | null
  reading_band: number | null
  writing_band: number | null
  speaking_band: number | null
  total_score: number | null
  total_label: string | null
  reviewed_at: string | null
  writing_task1_answer: string | null
  writing_task2_answer: string | null
  writing_task1_assessment: FullAssessment | null
  writing_task2_assessment: FullAssessment | null
  writing_task1_delegated_assessment: FullAssessment | null
  writing_task2_delegated_assessment: FullAssessment | null
  speaking_assessment: IeltsSpeakingAssessment | null
}

const RUBRIC_URLS = {
  writing: 'https://ielts.org/cdn/ielts-guides/ielts-writing-band-descriptors.pdf',
  speaking: 'https://ielts.org/cdn/ielts-guides/ielts-speaking-band-descriptors.pdf',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CO', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function Assessment({ title, report }: { title: string; report: FullAssessment | null }) {
  if (!report) return null
  return (
    <section className="ir-card ir-report">
      <div className="ir-report-head">
        <div><p className="ir-eyebrow">Feedback diagnóstico</p><h2>{title}</h2></div>
        <strong>Band {report.overallBand}</strong>
      </div>
      <div className="ir-criteria">
        {report.criteria.map(item => (
          <article key={item.criterion}>
            <h3>{item.criterion} · {item.band}</h3>
            <p>{item.reason}</p>
          </article>
        ))}
      </div>
      {report.allIssues.length > 0 && (
        <details>
          <summary>Aspectos por mejorar ({report.allIssues.length})</summary>
          <ul>{report.allIssues.map((issue, index) => <li key={`${issue.quote}-${index}`}><strong>{issue.quote}</strong>: {issue.suggestion}</li>)}</ul>
        </details>
      )}
      {report.rewritten && <details><summary>Versión de referencia corregida</summary><p className="ir-pre">{report.rewritten}</p></details>}
    </section>
  )
}

export default async function IeltsStudentResultPage({
  params,
}: {
  params: Promise<{ submissionId: string }>
}) {
  const { submissionId } = await params
  if (!IELTS_SUBMISSION_ID_PATTERN.test(submissionId)) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data } = await supabase
    .from('exam_submissions')
    .select('id, mock_title, created_at, listening_band, reading_band, writing_band, speaking_band, total_score, total_label, reviewed_at, writing_task1_answer, writing_task2_answer, writing_task1_assessment, writing_task2_assessment, writing_task1_delegated_assessment, writing_task2_delegated_assessment, speaking_assessment')
    .eq('id', submissionId)
    .eq('user_id', user.id)
    .eq('exam_slug', 'ielts')
    .eq('submission_status', 'submitted')
    .maybeSingle()

  if (!data) notFound()
  const result = data as ResultRow
  const task1Report = result.writing_task1_delegated_assessment ?? result.writing_task1_assessment
  const task2Report = result.writing_task2_delegated_assessment ?? result.writing_task2_assessment
  const final = Boolean(result.reviewed_at)

  return (
    <div className="ir-shell">
      <div className="ir-wrap">
        <Link href="/dashboard/student/progreso" className="ir-back">← Volver a mi progreso</Link>
        <header className="ir-hero">
          <div>
            <p className="ir-eyebrow">IELTS Academic · resultado WeLearn</p>
            <h1>{result.mock_title ?? 'Simulacro IELTS Academic'}</h1>
            <p>{formatDate(result.created_at)}</p>
          </div>
          <div className={`ir-status ${final ? 'ir-status--final' : ''}`}>
            <span>{final ? 'Revisión finalizada' : 'Evaluación en curso'}</span>
            <strong>{result.total_score == null ? 'Overall pendiente' : `Overall Band ${result.total_score}`}</strong>
          </div>
        </header>

        <p className="ir-notice" role="status">
          {result.total_score == null
            ? 'Ya guardamos tu intento. Reading y Listening se corrigen automáticamente; Writing y Speaking requieren evaluación. El Overall aparecerá cuando existan las cuatro bandas.'
            : 'Tu revisión está completa. Esta es una estimación diagnóstica de WeLearn y no un resultado oficial emitido por IELTS.'}
        </p>

        <section className="ir-bands" aria-label="Bandas por habilidad">
          {([
            ['Listening', result.listening_band],
            ['Reading', result.reading_band],
            ['Writing', result.writing_band],
            ['Speaking', result.speaking_band],
          ] as const).map(([label, band]) => (
            <article className="ir-card" key={label}>
              <span>{label}</span>
              <strong>{band == null ? 'Pendiente' : `Band ${band}`}</strong>
            </article>
          ))}
        </section>

        <section className="ir-card ir-summary">
          <h2>Estado del intento</h2>
          <p>{result.total_label || 'Los resultados por habilidad se irán consolidando en esta ficha.'}</p>
          <p className="ir-fine">Task 2 pesa el doble que Task 1 en Writing. El Overall es el promedio de L/R/W/S redondeado a media banda.</p>
        </section>

        <Assessment title="Writing Task 1" report={task1Report} />
        <Assessment title="Writing Task 2" report={task2Report} />

        {result.speaking_assessment && (
          <section className="ir-card ir-report">
            <div className="ir-report-head"><div><p className="ir-eyebrow">Feedback diagnóstico</p><h2>Speaking</h2></div><strong>Band {result.speaking_assessment.overallBand}</strong></div>
            <div className="ir-criteria">
              {result.speaking_assessment.criteria.map(item => <article key={item.criterion}><h3>{item.criterion} · {item.band}</h3><p>{item.reason}</p></article>)}
            </div>
            <p>{result.speaking_assessment.delegatedReview.summary}</p>
          </section>
        )}

        <section className="ir-card ir-evidence">
          <h2>Tus respuestas de Writing</h2>
          <details><summary>Task 1 · {result.writing_task1_answer?.trim().split(/\s+/).length ?? 0} palabras</summary><p className="ir-pre">{result.writing_task1_answer || 'Sin respuesta'}</p></details>
          <details><summary>Task 2 · {result.writing_task2_answer?.trim().split(/\s+/).length ?? 0} palabras</summary><p className="ir-pre">{result.writing_task2_answer || 'Sin respuesta'}</p></details>
        </section>

        <footer className="ir-footer">
          <p>Consulta los <a href={RUBRIC_URLS.writing} target="_blank" rel="noreferrer">descriptores oficiales de Writing ↗</a> y los <a href={RUBRIC_URLS.speaking} target="_blank" rel="noreferrer">descriptores oficiales de Speaking ↗</a>.</p>
          <Link href="/examenes/ielts" className="ir-cta">Practicar otro simulacro</Link>
        </footer>
      </div>
      <style>{`
        .ir-shell{min-height:100vh;background:#f7f5f2;color:#17204a;padding:40px 20px 72px}.ir-wrap{width:min(1040px,100%);margin:0 auto}.ir-back{color:#5f6785;text-decoration:none;font-size:14px}.ir-back:hover{text-decoration:underline}.ir-hero{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin:26px 0 18px}.ir-hero h1{font-size:clamp(30px,5vw,52px);line-height:1.02;letter-spacing:-.04em;margin:7px 0}.ir-hero p{margin:0;color:#6b7280}.ir-eyebrow{margin:0!important;color:#c8202e!important;font-size:11px!important;font-weight:800;text-transform:uppercase;letter-spacing:.1em}.ir-status{min-width:210px;background:#fff7ed;border:1px solid #fed7aa;border-radius:16px;padding:14px 16px}.ir-status--final{background:#f0fdf4;border-color:#bbf7d0}.ir-status span{display:block;color:#6b7280;font-size:11px;text-transform:uppercase;font-weight:800}.ir-status strong{display:block;margin-top:5px;font-size:18px}.ir-notice{background:#eef2ff;border-left:4px solid #3448c5;border-radius:10px;padding:14px 16px;line-height:1.55}.ir-bands{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:18px 0}.ir-card{background:#fff;border:1px solid #e3e5ee;border-radius:16px;padding:18px}.ir-bands span{display:block;color:#6b7280;font-size:12px;font-weight:800;text-transform:uppercase}.ir-bands strong{display:block;margin-top:7px;font-size:22px}.ir-summary,.ir-report,.ir-evidence{margin-top:14px}.ir-card h2{margin:0 0 9px;font-size:20px}.ir-card p{line-height:1.6}.ir-fine{color:#6b7280;font-size:13px}.ir-report-head{display:flex;justify-content:space-between;align-items:flex-start;gap:18px}.ir-report-head>strong{color:#c8202e;font-size:24px;white-space:nowrap}.ir-criteria{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:14px}.ir-criteria article{background:#f7f5f2;border-radius:12px;padding:12px}.ir-criteria h3{font-size:13px;margin:0}.ir-criteria p{font-size:13px;color:#555d78;margin:5px 0 0}.ir-card details{border-top:1px solid #e3e5ee;padding-top:12px;margin-top:12px}.ir-card summary{cursor:pointer;font-weight:750}.ir-card li{margin:7px 0;line-height:1.5}.ir-pre{white-space:pre-wrap;overflow-wrap:anywhere}.ir-footer{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-top:24px}.ir-footer p{font-size:13px;color:#6b7280}.ir-footer a{color:#3448c5}.ir-cta{display:inline-flex;min-height:44px;align-items:center;background:#17204a;color:#fff;text-decoration:none;border-radius:10px;padding:0 16px;font-weight:800;white-space:nowrap}@media(max-width:720px){.ir-shell{padding:26px 14px 56px}.ir-hero,.ir-footer{align-items:stretch;flex-direction:column}.ir-status{min-width:0}.ir-bands{grid-template-columns:repeat(2,1fr)}.ir-criteria{grid-template-columns:1fr}.ir-cta{justify-content:center}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}
      `}</style>
    </div>
  )
}
