import type { Metadata } from 'next';
import Link from 'next/link';
import { Brain, MessageSquareText, Target } from 'lucide-react';
import AcademicDiscussionWorkbench from '@/components/exam-practice/AcademicDiscussionWorkbench';
import TimedWritingTask from '@/components/toefl/TimedWritingTask';
import ToeflExerciseReturnLinks from '@/components/toefl/ToeflExerciseReturnLinks';
import { getToeflWritingConstructedTask } from '@/data/toefl/writing-constructed-set-1';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  PRACTICE_BASE_URL,
  TOEFL_ACADEMIC_DISCUSSION_PROMPTS,
  TOEFL_WRITING_TASKS,
} from '@/data/practica-exams/seo-catalog';

const ROUTE = TOEFL_WRITING_TASKS.find((item) => item.slug === 'academic-discussion')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#1a4fcc';
const ETS_WRITING_URL = 'https://www.ets.org/toefl/test-takers/ibt/about/content/writing.html';

export const metadata: Metadata = {
  title: 'TOEFL Academic Discussion: guía, estructura y práctica',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'TOEFL Academic Discussion: guía y práctica',
    description: ROUTE.description,
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
  alternates: { canonical: URL },
};

export default function Page() {
  const timedTask = getToeflWritingConstructedTask('academic-discussion');
  return (
    <>
      <LearningResourceJsonLd
        name={ROUTE.title}
        url={URL}
        description={ROUTE.description}
        teaches={ROUTE.teaches}
        isPartOf={{ name: 'TOEFL Writing', url: `${PRACTICE_BASE_URL}/practica/toefl/writing` }}
      />
      <FaqJsonLd faqs={ROUTE.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'TOEFL', url: `${PRACTICE_BASE_URL}/practica/toefl` },
          { name: 'Ejercicios', url: `${PRACTICE_BASE_URL}/practica/toefl/ejercicios` },
          { name: 'Writing', url: `${PRACTICE_BASE_URL}/practica/toefl/writing` },
          { name: 'Academic Discussion', url: URL },
        ]}
      />

      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1040 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/toefl" style={{ color: 'var(--muted)', textDecoration: 'none' }}>TOEFL</Link>
            <span>/</span>
            <Link href="/practica/toefl/ejercicios#writing" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Ejercicios</Link>
            <span>/</span>
            <Link href="/practica/toefl/writing" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Writing</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Academic Discussion</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />TOEFL Writing · Academic Discussion
              </p>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.15rem)', lineHeight: 1.04, letterSpacing: 0, margin: '0 0 0.85rem', color: 'var(--ink)' }}>
                TOEFL Academic Discussion
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 740 }}>
                En Academic Discussion respondes como si participaras en una clase universitaria. Una buena respuesta toma posición rápido, conecta con la discusión y desarrolla una idea propia con un ejemplo concreto.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.75rem', alignContent: 'center' }}>
              {[
                { label: 'Meta', value: '100-150', sub: 'palabras útiles' },
                { label: 'Estructura', value: '1+1+1', sub: 'postura, razón, ejemplo' },
                { label: 'Prioridad', value: 'claridad', sub: 'antes que plantilla' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center', border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.75rem', background: 'var(--bg-2)' }}>
                  <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 800 }}>{item.label}</span>
                  <strong style={{ color: ACCENT, fontFamily: 'var(--mono)', fontSize: '1.05rem', textAlign: 'right' }}>
                    {item.value}
                    <span style={{ display: 'block', color: 'var(--muted)', fontSize: '0.66rem', fontWeight: 700 }}>{item.sub}</span>
                  </strong>
                </div>
              ))}
            </aside>
          </div>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.85rem', marginBottom: '1.2rem' }}>
            {[
              {
                icon: <Target size={18} />,
                title: 'Postura inmediata',
                text: 'La primera oración debe responder la pregunta. No gastes medio párrafo repitiendo el prompt.',
              },
              {
                icon: <MessageSquareText size={18} />,
                title: 'Conexión con la discusión',
                text: 'Menciona o matiza una idea de otro estudiante para sonar como parte de la clase.',
              },
              {
                icon: <Brain size={18} />,
                title: 'Idea desarrollada',
                text: 'Una razón bien explicada vale más que tres razones listadas sin ejemplo.',
              },
            ].map((item) => (
              <article key={item.title} className="wl-card" style={{ padding: '1rem', borderRadius: 14 }}>
                <div style={{ display: 'flex', gap: '0.5rem', color: ACCENT, alignItems: 'center', marginBottom: '0.35rem' }}>
                  {item.icon}
                  <h2 style={{ margin: 0, color: 'var(--ink)', fontSize: '1rem' }}>{item.title}</h2>
                </div>
                <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.58, fontSize: '0.9rem' }}>{item.text}</p>
              </article>
            ))}
          </section>

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> ETS presenta Write for an Academic Discussion como una tarea actual de TOEFL iBT Writing en la que contribuyes a una discusión de clase, expresas una opinión y la apoyas con razones.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> entrenamos un flujo práctico: postura inmediata, conexión con un estudiante, una razón desarrollada, ejemplo concreto y cierre que regresa a la pregunta.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente oficial revisada: <a href={ETS_WRITING_URL} style={{ color: ACCENT, fontWeight: 800 }}>ETS TOEFL iBT Writing Section</a>. Integrated Writing se mantiene como legacy/síntesis complementaria, no como tarea principal actual.
            </p>
          </section>

          <section className="wl-card" style={{ padding: '1.2rem', borderRadius: 16, marginBottom: '1rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Estructura recomendada</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.3rem', letterSpacing: 0 }}>Cómo escribir una respuesta fuerte</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Oración 1: toma posición y menciona si estás de acuerdo, en desacuerdo o si matizas una postura.',
                'Oración 2-3: explica una razón central relacionada con aprendizaje, eficiencia, costo, bienestar o evidencia.',
                'Oración 4-5: agrega un ejemplo concreto. Puede ser personal, académico o de una situación plausible.',
                'Cierre: conecta el ejemplo con la pregunta para que la respuesta no termine como una anécdota suelta.',
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

          <TimedWritingTask task={timedTask} />

          <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, margin: '1rem 0' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Suplemento WeLearn sin reloj</p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>El banco siguiente ofrece frases y checklist durante la escritura. Es práctica guiada adicional y no simula las condiciones cerradas del examen.</p>
          </section>
          <AcademicDiscussionWorkbench prompts={TOEFL_ACADEMIC_DISCUSSION_PROMPTS} accent={ACCENT} />

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Banco expandido</p>
            <h2 style={{ margin: '0 0 0.6rem', fontSize: '1.2rem', letterSpacing: 0 }}>Más prompts de Academic Discussion</h2>
            <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
              Cuando ya entiendas la estructura, pasa al banco completo: temas por categoría, estrategia WeLearn, trampas comunes, checklist, frases útiles y modelos originales explicados.
            </p>
            <Link href="/practica/toefl/writing/academic-discussion/banco-de-prompts" className="btn btn-ghost btn-sm">
              Ver banco de prompts
            </Link>
          </section>

          <section style={{ marginTop: '1.4rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>Preguntas frecuentes</p>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {ROUTE.faqs.map((faq) => (
                <article key={faq.question} className="wl-card" style={{ padding: '1rem', borderRadius: 14 }}>
                  <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '1rem' }}>{faq.question}</h2>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
          <ToeflExerciseReturnLinks section="writing" />
        </div>
      </section>
    </>
  );
}
