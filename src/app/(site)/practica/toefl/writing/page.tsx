import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, FileText, MessageSquareText } from 'lucide-react';
import ToeflWritingMixedDrillEngine from '@/components/exam-practice/ToeflWritingMixedDrillEngine';
import ToeflWritingTimedReviewEngine from '@/components/exam-practice/ToeflWritingTimedReviewEngine';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { BreadcrumbJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { PRACTICE_BASE_URL, TOEFL_WRITING_MIXED_DRILLS, TOEFL_WRITING_TASKS, TOEFL_WRITING_TIMED_REVIEW_SETS } from '@/data/practica-exams/seo-catalog';

const URL = `${PRACTICE_BASE_URL}/practica/toefl/writing`;
const ACCENT = '#1a4fcc';
const ETS_TOEFL_CONTENT_URL = 'https://www.ets.org/toefl/test-takers/ibt/about/content.html';

export const metadata: Metadata = {
  title: 'TOEFL Writing: tareas actuales, drills y timed practice',
  description:
    'Guía TOEFL Writing actualizada: Academic Discussion, Write an Email y Build a Sentence, con estructura, prompts y respuestas explicadas.',
  keywords: [
    'TOEFL writing',
    'TOEFL academic discussion',
    'TOEFL write an email',
    'TOEFL build a sentence',
    'TOEFL writing practice',
    'TOEFL writing timed practice',
  ],
  openGraph: {
    title: 'TOEFL Writing: guía, tareas, mixed drills y timed practice',
    description: 'Practica TOEFL Writing con rutas por tarea, prompts, checklist académico, mixed drills y timed review sets explicados.',
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
  alternates: { canonical: URL },
};

export default function Page() {
  return (
    <>
      <CourseSchema
        name="TOEFL Writing"
        description="Ruta de práctica TOEFL Writing con Academic Discussion, Write an Email, Build a Sentence, mixed drills y timed review sets."
        url={URL}
        educationalLevel="B1,B2,C1"
        teaches="TOEFL Writing, Academic Discussion, email writing, sentence building, timed mixed writing review"
        inLanguage="es-CO"
      />
      <LearningResourceJsonLd
        name="TOEFL Writing"
        url={URL}
        description="Guía y ruta de práctica para TOEFL Writing actualizada con mixed drills y timed review sets."
        teaches={['TOEFL Writing', 'Academic Discussion', 'Write an Email', 'Build a Sentence', 'timed mixed writing review']}
        isPartOf={{ name: 'Práctica TOEFL iBT', url: `${PRACTICE_BASE_URL}/practica/toefl` }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'TOEFL', url: `${PRACTICE_BASE_URL}/practica/toefl` },
          { name: 'Writing', url: URL },
        ]}
      />

      <section className="wl-section">
        <div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 1040, minWidth: 0, overflowX: 'clip' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/toefl" style={{ color: 'var(--muted)', textDecoration: 'none' }}>TOEFL</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Writing</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />TOEFL iBT Writing
              </p>
              <h1 className="exam-practice-hero-title" style={{ fontSize: '2rem', lineHeight: 1.12, letterSpacing: 0, margin: '0 0 0.85rem', color: 'var(--ink)', maxWidth: '100%', overflowWrap: 'anywhere' }}>
                TOEFL Writing: práctica por tarea
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 740 }}>
                Writing no se entrena memorizando plantillas largas. Se entrena dominando la intención de cada tarea: construir una oración precisa, escribir un email adecuado y participar en una discusión académica con una postura clara.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.7rem', alignContent: 'center' }}>
              {[
                { icon: <CheckCircle2 size={18} />, label: 'Actual', text: 'La ruta principal se basa en el TOEFL iBT vigente para 2026.' },
                { icon: <MessageSquareText size={18} />, label: 'Académico', text: 'Academic Discussion exige postura, desarrollo y conexión con la conversación.' },
                { icon: <FileText size={18} />, label: 'Legacy', text: 'Integrated Writing se tratará como práctica de síntesis y formato anterior.' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: '0.65rem', alignItems: 'start' }}>
                  <span style={{ color: ACCENT }}>{item.icon}</span>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>{item.label}:</strong> {item.text}
                  </p>
                </div>
              ))}
            </aside>
          </div>

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> ETS lista tres tareas actuales de TOEFL iBT Writing: Build a Sentence, Write an Email y Write for an Academic Discussion.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> entrenamos cada tarea por separado y luego usamos mixed drills para reconocer intención, formato y estructura antes de escribir. Integrated Writing se mantiene como síntesis/legacy, no como tarea principal actual.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente oficial revisada: <a href={ETS_TOEFL_CONTENT_URL} style={{ color: ACCENT, fontWeight: 800 }}>ETS TOEFL iBT Test Content and Structure</a>.
            </p>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.85rem', marginBottom: '1.4rem' }}>
            {TOEFL_WRITING_TASKS.map((task) => {
              const available = task.status === 'published';
              const card = (
                <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, height: '100%', borderTop: `3px solid ${available ? ACCENT : 'var(--line-soft)'}`, opacity: available ? 1 : 0.72 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.7rem', alignItems: 'start', marginBottom: '0.45rem' }}>
                    <h2 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.05rem', letterSpacing: '-0.01em' }}>{task.title.replace('TOEFL Writing ', '')}</h2>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.64rem', fontWeight: 900, color: task.currentExam ? ACCENT : '#b45309' }}>
                      {task.currentExam ? (available ? 'DISPONIBLE' : 'ACTUAL') : 'LEGACY'}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>{task.description}</p>
                  {task.note && (
                    <p style={{ margin: '0.65rem 0 0', color: '#92400e', lineHeight: 1.5, fontSize: '0.82rem' }}>{task.note}</p>
                  )}
                </article>
              );

              return available ? (
                <Link key={task.slug} href={task.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {card}
                </Link>
              ) : (
                <div key={task.slug}>{card}</div>
              );
            })}
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16 }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Ruta de estudio</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Orden recomendado para mejorar rápido</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Empieza por Academic Discussion porque concentra postura, claridad, desarrollo y vocabulario académico.',
                'Pasa a Write an Email para entrenar tono, propósito y respuesta completa a una situación.',
                'Usa Build a Sentence como laboratorio de precisión gramatical y naturalidad.',
                'Haz timed mixed-writing review sets para cambiar de formato sin perder control de tiempo.',
                'Trabaja Integrated Writing como práctica complementaria de síntesis si necesitas fortalecer lectura-escucha-escritura.',
              ].map((item, index) => (
                <p key={item} style={{ margin: 0, display: 'grid', gridTemplateColumns: '32px 1fr', gap: '0.65rem', alignItems: 'start', color: 'var(--ink-2)', lineHeight: 1.58 }}>
                  <span style={{ width: 32, height: 32, borderRadius: 10, background: `${ACCENT}12`, color: ACCENT, display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontWeight: 900 }}>
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </section>

          <div style={{ marginTop: '1rem' }}>
            <ToeflWritingMixedDrillEngine drills={TOEFL_WRITING_MIXED_DRILLS} accent={ACCENT} />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <ToeflWritingTimedReviewEngine sets={TOEFL_WRITING_TIMED_REVIEW_SETS} accent={ACCENT} />
          </div>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Respuestas explicadas</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: 0 }}>Clave de TOEFL Writing mixed drills</h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {TOEFL_WRITING_MIXED_DRILLS.map((drill, index) => (
                <article key={drill.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                  <p style={{ margin: '0 0 0.3rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    Drill {index + 1} · {drill.taskType}
                  </p>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', color: 'var(--ink)' }}>
                    Mejor opción: {String.fromCharCode(65 + drill.answer)}
                  </h3>
                  <p style={{ margin: '0 0 0.45rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                    {drill.explanation}
                  </p>
                  <p style={{ margin: '0 0 0.45rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Estructura:</strong> {drill.structureCue}
                  </p>
                  <p style={{ margin: '0 0 0.45rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {drill.trap}
                  </p>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Siguiente paso:</strong> {drill.nextStep}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Banco de prompts</p>
            <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.2rem', letterSpacing: '-0.02em' }}>Practica Academic Discussion por temas</h2>
            <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
              Usa prompts originales con conversación de clase, estrategia, checklist, frases útiles y modelos explicados. Es el siguiente paso después de entender la estructura.
            </p>
            <Link href="/practica/toefl/writing/academic-discussion/banco-de-prompts" className="btn btn-ghost btn-sm">
              Ver banco de prompts
            </Link>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Banco de emails</p>
            <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.2rem', letterSpacing: '-0.02em' }}>Practica Write an Email por situación</h2>
            <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
              Entrena emails académicos, de campus, trabajo, servicio y compañeros con tono adecuado, checklist, frases útiles y modelos originales explicados.
            </p>
            <Link href="/practica/toefl/writing/write-an-email/banco-de-prompts" className="btn btn-ghost btn-sm">
              Ver banco de emails
            </Link>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Modelos explicados</p>
            <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.2rem', letterSpacing: '-0.02em' }}>Aprende mirando respuestas fuertes</h2>
            <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
              Revisa model answers originales para Build a Sentence, Write an Email y Academic Discussion. Integrated Writing aparece como legacy/síntesis y queda separado del flujo principal.
            </p>
            <Link href="/practica/toefl/writing/model-answers" className="btn btn-ghost btn-sm">
              Ver model answers
            </Link>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Rúbrica</p>
            <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.2rem', letterSpacing: '-0.02em' }}>Evalúa antes de repetir</h2>
            <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
              Usa una rúbrica pedagógica para revisar propósito, organización, precisión y desarrollo en las tareas actuales. Integrated Writing sigue como síntesis/legacy.
            </p>
            <Link href="/practica/toefl/writing/rubrica" className="btn btn-ghost btn-sm">
              Ver rúbrica
            </Link>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Gramática aplicada</p>
            <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.2rem', letterSpacing: '-0.02em' }}>Corrige la frase que sostiene tu respuesta</h2>
            <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
              Practica oraciones completas, conectores, tono de email y desarrollo académico. No es gramática suelta: es gramática para escribir mejor en TOEFL.
            </p>
            <Link href="/practica/toefl/writing/grammar-for-writing" className="btn btn-ghost btn-sm">
              Ver grammar for writing
            </Link>
          </section>

          <div style={{ marginTop: '1rem' }}>
            <Link href="/practica/toefl/writing/academic-discussion" className="btn btn-sm">
              Practicar Academic Discussion
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
