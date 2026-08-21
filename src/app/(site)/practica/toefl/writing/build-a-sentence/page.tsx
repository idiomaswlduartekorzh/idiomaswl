import type { Metadata } from 'next';
import Link from 'next/link';
import { Braces, GitBranch, PenLine } from 'lucide-react';
import SentenceBuildWorkbench from '@/components/exam-practice/SentenceBuildWorkbench';
import BuildSentenceSet1Practice from '@/components/toefl/BuildSentenceSet1Practice';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  PRACTICE_BASE_URL,
  TOEFL_BUILD_A_SENTENCE_PROMPT_BANK,
  TOEFL_SENTENCE_BUILD_ITEMS,
  TOEFL_WRITING_TASKS,
} from '@/data/practica-exams/seo-catalog';

const ROUTE = TOEFL_WRITING_TASKS.find((item) => item.slug === 'build-a-sentence')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#1a4fcc';
const ETS_TOEFL_CONTENT_URL = 'https://www.ets.org/toefl/test-takers/ibt/about/content.html';

export const metadata: Metadata = {
  title: 'TOEFL Build a Sentence: ejercicios de oración',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'TOEFL Build a Sentence: ejercicios de oración',
    description: ROUTE.description,
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
  alternates: { canonical: URL },
};

export default function Page() {
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
          { name: 'Writing', url: `${PRACTICE_BASE_URL}/practica/toefl/writing` },
          { name: 'Build a Sentence', url: URL },
        ]}
      />

      <section className="wl-section">
        <div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 1040, minWidth: 0, overflowX: 'clip' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/toefl" style={{ color: 'var(--muted)', textDecoration: 'none' }}>TOEFL</Link>
            <span>/</span>
            <Link href="/practica/toefl/writing" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Writing</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Build a Sentence</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />TOEFL Writing · Sentence Building
              </p>
              <h1 className="exam-practice-hero-title" style={{ fontSize: '2rem', lineHeight: 1.12, letterSpacing: 0, margin: '0 0 0.85rem', color: 'var(--ink)', maxWidth: '100%', overflowWrap: 'anywhere' }}>
                TOEFL Build a Sentence
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 740 }}>
                Construir buenas oraciones es el laboratorio de TOEFL Writing. Aquí practicas causa, contraste, condición, cláusulas relativas y concesión antes de llevar esas estructuras a emails y discusiones académicas.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.75rem', alignContent: 'center' }}>
              {[
                { label: 'Sujeto', value: 'claro', sub: 'quién hace qué' },
                { label: 'Relación', value: 'lógica', sub: 'causa, contraste, condición' },
                { label: 'Puntuación', value: 'limpia', sub: 'coma donde corresponde' },
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

          <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, marginBottom: '1rem', background: `${ACCENT}0d` }}>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong>Respuesta directa:</strong> Build a Sentence es una tarea actual de TOEFL Writing. La práctica WeLearn no intenta adivinar ítems oficiales: entrena estructuras académicas reutilizables para responder con claridad bajo tiempo.
            </p>
          </section>

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> la especificación ETS 2026 asigna 10 ítems a Build a Sentence dentro de una sección Writing de 12 unidades. Cada ítem presenta contexto y una respuesta que debe reconstruirse con fragmentos.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> usamos microestructuras como causa, contraste, condición, relativo, concesión y propósito para que el estudiante produzca oraciones completas y transferibles a emails y discusiones académicas.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente oficial revisada: <a href={ETS_TOEFL_CONTENT_URL} style={{ color: ACCENT, fontWeight: 800 }}>ETS TOEFL iBT Test Content and Structure</a>.
            </p>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.85rem', marginBottom: '1.2rem' }}>
            {[
              {
                icon: <Braces size={18} />,
                title: 'Estructura',
                text: 'Cada oración necesita una base clara: sujeto, verbo y complemento. Los conectores no arreglan una base confusa.',
              },
              {
                icon: <GitBranch size={18} />,
                title: 'Relación lógica',
                text: 'Because, although, if y while prometen relaciones distintas. La segunda parte debe cumplir esa promesa.',
              },
              {
                icon: <PenLine size={18} />,
                title: 'Precisión',
                text: 'Una oración corta y precisa suele puntuar mejor que una oración larga con errores de acuerdo o puntuación.',
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

          <section className="wl-card" style={{ padding: '1.2rem', borderRadius: 16, marginBottom: '1rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Método WeLearn</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>Cómo construir una oración TOEFL</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Identifica la relación: causa, contraste, condición, definición o concesión.',
                'Elige el sujeto principal y evita cambiar de sujeto sin necesidad.',
                'Ordena la cláusula dependiente y la principal con puntuación correcta.',
                'Lee la oración final en voz baja: si la lógica no fluye, el conector probablemente está mal usado.',
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

          <BuildSentenceSet1Practice />

          <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, marginTop: '1.2rem', marginBottom: '1rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Suplemento WeLearn</p>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1.2rem' }}>Laboratorio guiado de transferencia</h2>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65 }}>
              El siguiente ejercicio permite escribir y recibir una pista. Es práctica pedagógica adicional; no cuenta como parte del simulacro oficial de 10 ítems.
            </p>
          </section>

          <SentenceBuildWorkbench items={TOEFL_SENTENCE_BUILD_ITEMS} accent={ACCENT} />

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Banco de prompts</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: 0 }}>Prompts Build a Sentence con modelo explicado</h2>
            <p style={{ margin: '0 0 1rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              Usa estos prompts para practicar después del workbench. Cada modelo muestra una estructura objetivo, por qué funciona, qué error evitar y dónde transferirla dentro de TOEFL Writing.
            </p>
            <div style={{ display: 'grid', gap: '0.85rem' }}>
              {TOEFL_BUILD_A_SENTENCE_PROMPT_BANK.map((item, index) => (
                <article key={item.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.95rem', background: 'var(--bg-2)' }}>
                  <p style={{ margin: '0 0 0.35rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    Prompt {index + 1} · {item.taskFocus}
                  </p>
                  <h3 style={{ margin: '0 0 0.55rem', color: 'var(--ink)', fontSize: '1rem', lineHeight: 1.45 }}>
                    {item.prompt}
                  </h3>
                  <div style={{ display: 'grid', gap: '0.55rem' }}>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                      <strong style={{ color: 'var(--ink)' }}>Estructura objetivo:</strong> {item.targetStructure}
                    </p>
                    <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.65, fontSize: '0.92rem' }}>
                      <strong style={{ color: ACCENT }}>Modelo:</strong> {item.modelSentence}
                    </p>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                      <strong style={{ color: 'var(--ink)' }}>Por qué funciona:</strong> {item.whyItWorks}
                    </p>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                      <strong style={{ color: 'var(--ink)' }}>Error común:</strong> {item.commonError}
                    </p>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                      <strong style={{ color: 'var(--ink)' }}>Transferencia:</strong> {item.transferTo}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.1rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Siguientes pasos</p>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1.2rem' }}>Conecta esta microhabilidad con TOEFL Writing</h2>
            <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              Build a Sentence entrena control de oración. Después, lleva esas estructuras a tareas más largas sin confundirlas con Integrated Writing, que aquí se mantiene como síntesis/legacy.
            </p>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <Link href="/practica/toefl/writing/write-an-email" className="btn btn-sm">
                Practicar Write an Email
              </Link>
              <Link href="/practica/toefl/writing/academic-discussion" className="btn btn-ghost btn-sm">
                Practicar Academic Discussion
              </Link>
              <Link href="/practica/toefl/writing/grammar-for-writing" className="btn btn-ghost btn-sm">
                Grammar for Writing
              </Link>
              <Link href="/practica/toefl/writing" className="btn btn-ghost btn-sm">
                Volver a TOEFL Writing
              </Link>
            </div>
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
        </div>
      </section>
    </>
  );
}
