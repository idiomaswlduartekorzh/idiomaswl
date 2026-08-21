import type { Metadata } from 'next'
import Image from 'next/image'
import { readIeltsDelegatedReviewCase } from '@/lib/ielts/delegated-review.server'
import ReviewSubmissionForm from './ReviewSubmissionForm'
import styles from './review.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Evaluación IELTS delegada · WeLearn',
  description: 'Espacio privado y temporal para evaluar una tarea IELTS.',
  robots: { index: false, follow: false, nocache: true },
}

function formatExpiry(value: string): string {
  return new Date(value).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/Bogota' })
}

export default async function IeltsDelegatedReviewPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const result = await readIeltsDelegatedReviewCase(token)

  if (!result.ok) {
    return (
      <main className={styles.shell}>
        <section className={styles.expired}>
          <span>IELTS · WeLearn</span>
          <h1>Este llamado no está disponible</h1>
          <p>{result.message}</p>
        </section>
      </main>
    )
  }

  const review = result.reviewCase
  const apiExample = {
    evaluatorName: 'Claude',
    evaluatorModel: 'Modelo y versión exactos',
    overallBand: 6.5,
    criteria: review.rubric.criteria.map(criterion => ({ criterion: criterion.key, band: 6.5, reason: 'Justificación con evidencia de la respuesta.' })),
    summary: 'Resumen sustentado de la evaluación.',
    strengths: ['Fortaleza concreta'],
    priorities: ['Mejora prioritaria'],
  }

  return (
    <main className={styles.shell}>
      <div className={styles.workspace}>
        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Evaluación delegada · acceso limitado</p>
            <h1>{review.taskLabel}</h1>
            <p>{review.mockTitle}</p>
          </div>
          <dl className={styles.identity}>
            <div><dt>Código del llamado</dt><dd>{review.callCode}</dd></div>
            <div><dt>Código del intento</dt><dd>{review.submissionId}</dd></div>
            <div><dt>Vence</dt><dd>{formatExpiry(review.expiresAt)}</dd></div>
          </dl>
        </header>

        <section className={styles.securityNote}>
          Este enlace muestra una sola tarea y no concede acceso al panel administrativo, al correo de la estudiante ni a otros intentos.
        </section>

        <section className={styles.rubricCard}>
          <div>
            <p className={styles.eyebrow}>Fuente de evaluación</p>
            <h2>{review.rubric.title}</h2>
            <p>{review.rubric.version}</p>
            <ul>{review.rubric.criteria.map(criterion => <li key={criterion.key}>{criterion.label}</li>)}</ul>
          </div>
          <a href={review.rubric.sourceUrl} target="_blank" rel="noreferrer">Abrir descriptores oficiales de IELTS ↗</a>
          <p className={styles.disclaimer}>{review.rubric.notice}</p>
        </section>

        {review.assignment.kind === 'writing' ? (
          <section className={styles.assignment}>
            <p className={styles.eyebrow}>Consigna exacta</p>
            <h2>{review.taskLabel}</h2>
            <p className={styles.prompt}>{review.assignment.prompt}</p>
            {review.assignment.imageUrl && (
              <div className={styles.chart}>
                <Image src={review.assignment.imageUrl} alt="Gráfico de la consigna de IELTS Writing Task 1" width={1200} height={760} sizes="(max-width: 900px) 100vw, 820px" />
              </div>
            )}
            <div className={styles.answerHeader}><strong>Respuesta de la estudiante</strong><span>{review.assignment.wordCount} palabras · mínimo {review.assignment.minWords}</span></div>
            <article className={styles.answer}>{review.assignment.answer}</article>
          </section>
        ) : (
          <section className={styles.assignment}>
            <p className={styles.eyebrow}>Grabaciones y consignas exactas</p>
            <h2>Speaking completo</h2>
            <p className={styles.coverage}>Cobertura verificada: <strong>{review.assignment.recordingCoverage.available} de {review.assignment.recordingCoverage.expected} grabaciones</strong></p>
            <div className={styles.speakingGrid}>
              {review.assignment.prompts.map(prompt => (
                <article className={styles.speakingCard} key={prompt.questionId}>
                  <h3>Part {prompt.partNumber} · {prompt.questionId.toUpperCase()}</h3>
                  <p>{prompt.prompt}</p>
                  {prompt.cueCard && <pre>{prompt.cueCard}</pre>}
                  {prompt.followUp && <ul>{prompt.followUp.map(item => <li key={item}>{item}</li>)}</ul>}
                  {prompt.notes && <p><strong>Notas:</strong> {prompt.notes}</p>}
                  {prompt.audioUrl ? <audio controls preload="metadata" src={prompt.audioUrl} aria-label={`Respuesta de Speaking ${prompt.questionId}`} /> : <p className={styles.missing}>Sin audio para esta pregunta.</p>}
                </article>
              ))}
            </div>
          </section>
        )}

        <section className={styles.workflowCard} aria-labelledby="agent-workflow-title">
          <p className={styles.eyebrow}>Protocolo del evaluador</p>
          <h2 id="agent-workflow-title">Flujo de trabajo obligatorio</h2>
          <ol>{review.agentWorkflow.steps.map(step => <li key={step}>{step}</li>)}</ol>
          <h3>Evidencia mínima</h3>
          <ul>{review.agentWorkflow.evidenceRequirements.map(requirement => <li key={requirement}>{requirement}</li>)}</ul>
        </section>

        <details className={styles.agentContract}>
          <summary>Contrato API para ChatGPT, Claude u otro agente</summary>
          <p>El agente puede hacer GET y luego POST JSON al mismo endpoint: <code>{review.submissionEndpoint}</code>.</p>
          <pre>{JSON.stringify(apiExample, null, 2)}</pre>
        </details>

        <section className={styles.evaluation}>
          <p className={styles.eyebrow}>Reporte a consolidar</p>
          <h2>Registra la evaluación</h2>
          <ReviewSubmissionForm review={review} />
        </section>
      </div>
    </main>
  )
}
