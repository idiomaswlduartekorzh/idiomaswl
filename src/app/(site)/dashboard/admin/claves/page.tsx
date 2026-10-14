import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { EXAMS } from '@/data/exams';
import { getMock } from '@/data/mocks';
import { auditMockKey, getAnswerKeyCatalog } from '@/lib/exams/answer-key-catalog';
import { getExamTranscriptResource } from '@/lib/exams/transcript-resource';
import KeyHubNavigator from './KeyHubNavigator';
import styles from './key-hub.module.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Claves de exámenes · Administración',
  robots: { index: false, follow: false },
};

export default async function AnswerKeyHubPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  try {
    await requireAdmin();
  } catch {
    redirect('/dashboard');
  }

  const catalog = getAnswerKeyCatalog();
  const requested = (await searchParams).key;
  const selected = catalog.find(item => item.key === requested) ?? catalog[0];
  const mock = getMock(selected.examSlug, selected.mockId)!;
  const audit = auditMockKey(mock);
  const transcript = getExamTranscriptResource(selected.examSlug, selected.mockId);
  const issueCount = catalog.reduce((sum, item) => sum + item.issues, 0);
  const answerCount = catalog.reduce((sum, item) => sum + item.automatic + item.reference, 0);
  const examCount = new Set(catalog.map(item => item.examSlug)).size;

  return (
    <main className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.brand}><span className={styles.brandMark}>W</span><span>WeLearn <b>· Claves</b></span></div>
        <Link href="/dashboard/admin" className={styles.back}>← Centro operativo</Link>
      </header>

      <div className={styles.pageIntro}>
        <div>
          <p className={styles.eyebrow}>Biblioteca de respuestas · Uso interno</p>
          <h1>Una clave para cada examen.</h1>
          <p className={styles.lede}>Consulta la respuesta que usa la plataforma para corregir, junto con el enunciado, las opciones y las variantes aceptadas.</p>
        </div>
        <div className={styles.counters} aria-label="Cobertura del catálogo">
          <div><strong>{examCount}</strong><span>exámenes</span></div>
          <div><strong>{catalog.length}</strong><span>simulacros</span></div>
          <div><strong>{answerCount.toLocaleString('es-CO')}</strong><span>claves</span></div>
        </div>
      </div>

      <div className={styles.notice}>
        <strong>Cómo leer el estado.</strong> “Sin alertas” significa que la clave tiene una estructura válida y coincide con las respuestas configuradas. No certifica que el contenido sea académicamente inequívoco. Las tareas abiertas se revisan con rúbrica; las respuestas de referencia no participan en la corrección automática de esta pantalla.
        {issueCount > 0 && <span className={styles.noticeIssue}> {issueCount} alerta{issueCount === 1 ? '' : 's'} de integridad en el catálogo.</span>}
      </div>

      <div className={styles.layout}>
        <KeyHubNavigator catalog={catalog} selectedKey={selected.key}
          examNames={Object.fromEntries(Object.entries(EXAMS).map(([slug, exam]) => [slug, `${exam.flag} ${exam.name}`]))} />

        <article className={styles.keyPanel}>
          <div className={styles.keyHeader}>
            <div>
              <p className={styles.eyebrow}>{EXAMS[selected.examSlug]?.name ?? selected.examSlug} / {selected.mockId}</p>
              <h2>{mock.title}</h2>
              <p>{mock.subtitle}</p>
            </div>
            <a className={styles.practiceLink} href={`/examenes/${selected.examSlug}/practica/${selected.mockId}`} target="_blank" rel="noreferrer">Abrir simulacro ↗</a>
          </div>

          <div className={styles.summary}>
            <span><b>{audit.automatic}</b> autocorregidas</span>
            <span><b>{audit.reference}</b> de referencia</span>
            <span><b>{audit.open}</b> abiertas</span>
            <span className={audit.issues ? styles.problem : styles.clear}><b>{audit.issues}</b> alertas de integridad</span>
          </div>

          {transcript && (
            <aside className={styles.transcriptCard} aria-label="Transcripción del audio de este set">
              <div className={styles.transcriptIcon} aria-hidden="true">PDF</div>
              <div className={styles.transcriptCopy}>
                <p className={styles.transcriptEyebrow}>Recurso del set</p>
                <h3>Transcripción del audio</h3>
                <p>
                  Documento editorial WeLearn con interfaz en {transcript.interfaceLanguage}
                  {' '}y el contenido del audio en {transcript.audioLanguage}.
                </p>
              </div>
              <div className={styles.transcriptActions}>
                <a href={transcript.href} target="_blank" rel="noreferrer">Abrir PDF ↗</a>
                <a href={transcript.href} download>Descargar</a>
              </div>
            </aside>
          )}

          <nav className={styles.sectionNav} aria-label="Secciones de este simulacro">
            {audit.sections.map((section, index) => <a href={`#seccion-${index}`} key={`${section.title}-${index}`}>{section.title}</a>)}
          </nav>

          {audit.sections.map((section, index) => (
            <section className={styles.section} id={`seccion-${index}`} key={`${section.title}-${index}`}>
              <div className={styles.sectionHead}>
                <div><span className={styles.sectionIndex}>{String(index + 1).padStart(2, '0')}</span><h3>{section.title}</h3></div>
                <span className={styles.skill}>{section.skill}</span>
              </div>
              <p className={styles.instructions}>{section.instructions}</p>
              {section.issues.map(issue => <p className={styles.issue} key={issue}>Revisar: {issue}</p>)}
              {section.audioUrl && <a className={styles.audio} href={section.audioUrl} target="_blank" rel="noreferrer">Escuchar audio de esta sección ↗</a>}
              {section.context && <details className={styles.context}><summary>Ver texto, tabla u opciones compartidas</summary><pre>{section.context}</pre></details>}

              <div className={styles.rows}>
                {section.rows.map(row => (
                  <div className={styles.row} key={row.id}>
                    <div className={styles.rowTop}>
                      <span className={styles.number}>{row.number}</span>
                      <span className={styles.prompt}>{row.prompt}</span>
                      <span className={`${styles.mode} ${styles[row.mode]}`}>{row.mode === 'automatic' ? 'Autocorrección' : row.mode === 'reference' ? 'Referencia' : 'Abierta'}</span>
                    </div>
                    {row.detail && <p className={styles.detail}>{row.detail}</p>}
                    {row.options && <div className={styles.options}>{row.options.map(option =>
                      <div className={option.correct ? styles.optionCorrect : styles.option} key={option.letter}>
                        <b>{option.letter}</b><span>{option.text}</span>{option.correct && <strong>Clave</strong>}
                      </div>)}</div>}
                    {!row.options && <p className={row.mode === 'open' ? styles.openAnswer : styles.answer}>{row.answer}</p>}
                    {row.issues.map(issue => <p className={styles.issue} key={issue}>Revisar: {issue}</p>)}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
