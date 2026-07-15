import type { Metadata } from 'next';
import Link from 'next/link';
import { AlarmClock, ArrowRight, CheckCircle2, Gauge, ListChecks, RotateCcw, XCircle } from 'lucide-react';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import TimeManagementPracticeEngine from '@/components/exam-practice/TimeManagementPracticeEngine';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  IELTS_READING_SKILLS,
  IELTS_TIME_MANAGEMENT_PRACTICE_SETS,
  PRACTICE_BASE_URL,
} from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_SKILLS.find((item) => item.slug === 'gestion-del-tiempo')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#7c3aed';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test';

export const metadata: Metadata = {
  title: 'Gestión del tiempo IELTS Reading: estrategia de 60 minutos',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'Gestión del tiempo IELTS Reading: estrategia de 60 minutos',
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
        isPartOf={{ name: 'Habilidades IELTS Reading', url: `${PRACTICE_BASE_URL}/practica/ielts/reading/habilidades` }}
      />
      <FaqJsonLd faqs={ROUTE.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'IELTS', url: `${PRACTICE_BASE_URL}/practica/ielts` },
          { name: 'Reading', url: `${PRACTICE_BASE_URL}/practica/ielts/reading` },
          { name: 'Habilidades', url: `${PRACTICE_BASE_URL}/practica/ielts/reading/habilidades` },
          { name: 'Gestión del tiempo', url: URL },
        ]}
      />

      <section className="wl-section">
        <div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 1040, minWidth: 0, overflowX: 'clip' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/ielts" style={{ color: 'var(--muted)', textDecoration: 'none' }}>IELTS</Link>
            <span>/</span>
            <Link href="/practica/ielts/reading/habilidades" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Habilidades</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Gestión del tiempo</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />IELTS Reading · Habilidad
              </p>
              <h1 className="exam-practice-hero-title" style={{ fontSize: '2rem', lineHeight: 1.12, letterSpacing: 0, margin: '0 0 0.85rem', color: 'var(--ink)', maxWidth: '100%', overflowWrap: 'anywhere' }}>
                Gestión del tiempo: protege puntos, no minutos
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 760 }}>
                IELTS Academic Reading tiene 60 minutos para tres pasajes y 40 preguntas. La clave no es leer a toda velocidad, sino decidir cuándo hacer skimming, cuándo buscar evidencia y cuándo saltar temporalmente.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.75rem', alignContent: 'center' }}>
              {[
                { label: 'Formato', value: '60 min', sub: '3 pasajes · 40 preguntas' },
                { label: 'WeLearn', value: 'triage', sub: 'resolver, marcar, saltar' },
                { label: 'Meta', value: 'puntos', sub: 'no perfeccionismo' },
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
              <strong>Respuesta directa:</strong> en IELTS Reading debes responder todo dentro de 60 minutos. La estrategia WeLearn divide el trabajo en mapa rápido, puntos fáciles, preguntas lentas y revisión selectiva.
            </p>
          </section>

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Formato oficial vs estrategia WeLearn</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Formato oficial:</strong> IELTS Academic Reading tiene tres textos largos, 40 preguntas y 60 minutos. El examen puede mezclar varios tipos de pregunta en cada pasaje, por eso no basta con saber el contenido: también debes administrar el orden y la profundidad de lectura.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Estrategia WeLearn:</strong> tratamos la gestión del tiempo como triage: resolver ahora lo que tiene señal clara, marcar lo que tiene evidencia pero decisión difícil y saltar búsquedas desde cero cuando el retorno es bajo.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Fuente oficial revisada: <a href={IELTS_ACADEMIC_URL} style={{ color: ACCENT, fontWeight: 800 }}>IELTS Academic test format and sections</a>. Esta ruta es de habilidad, no de tipo de pregunta.
            </p>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0.85rem', marginBottom: '1.2rem' }}>
            {[
              { icon: <Gauge size={18} />, title: 'Lee con propósito', text: 'Primero crea mapa; luego lees profundo donde hay evidencia.' },
              { icon: <AlarmClock size={18} />, title: 'Pon límites', text: 'Si una pregunta se bloquea, marca la zona y avanza.' },
              { icon: <RotateCcw size={18} />, title: 'Revisa con retorno', text: 'Al final vuelve a preguntas con evidencia localizada.' },
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
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>Sistema de 60 minutos sin pánico</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Usa 2 minutos iniciales para skimming: tema, cambio, problema y solución.',
                'Resuelve primero señales claras: fechas, nombres, números, completion con palabra clave única.',
                'Ataca preguntas lentas cuando ya tienes mapa: headings, inferencia, multiple choice complejo.',
                'Marca preguntas bloqueadas con evidencia, no con ansiedad.',
                'Reserva los últimos minutos para volver a evidencias ya localizadas y completar vacíos.',
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

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '0.85rem', marginBottom: '1.2rem' }}>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: '4px solid #059669' }}>
              <div style={{ display: 'flex', gap: '0.45rem', color: '#047857', alignItems: 'center', marginBottom: '0.35rem' }}>
                <CheckCircle2 size={18} />
                <h2 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.05rem' }}>Decisión fuerte</h2>
              </div>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                Encontraste la zona, pero dudas entre False y Not Given: marcas evidencia, eliges provisional y avanzas.
              </p>
            </article>
            <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, borderLeft: '4px solid #dc2626' }}>
              <div style={{ display: 'flex', gap: '0.45rem', color: '#b91c1c', alignItems: 'center', marginBottom: '0.35rem' }}>
                <XCircle size={18} />
                <h2 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.05rem' }}>Decisión rota</h2>
              </div>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                Relees todo el pasaje por una duda local. La sensación de control te cuesta preguntas fáciles.
              </p>
            </article>
          </section>

          <TimeManagementPracticeEngine practices={IELTS_TIME_MANAGEMENT_PRACTICE_SETS} accent={ACCENT} />

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Respuestas explicadas</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Clave del ejercicio de gestión del tiempo</h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {IELTS_TIME_MANAGEMENT_PRACTICE_SETS.flatMap((practiceSet) => practiceSet.decisions).map((decision, index) => (
                <article key={decision.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                  <p style={{ margin: '0 0 0.3rem', color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    Decisión {index + 1} · {decision.questionType}
                  </p>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', color: 'var(--ink)' }}>
                    Mejor decisión: {String.fromCharCode(65 + decision.answer)}
                  </h3>
                  <p style={{ margin: '0 0 0.45rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                    {decision.explanation}
                  </p>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Trampa:</strong> {decision.trap}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Práctica independiente</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Haz un triage real antes de corregir</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Antes de empezar un pasaje, escribe tres columnas: resolver ahora, marcar para volver y saltar temporalmente.',
                'Durante el skimming, anota el rol de cada párrafo con dos o tres palabras: problema, causa, ejemplo, contraste o resultado.',
                'Resuelve primero preguntas con señal visible: nombres, fechas, números, términos técnicos o gaps con límite claro.',
                'Si una pregunta supera 70-90 segundos y ya tienes evidencia, deja una marca breve y avanza.',
                'En la revisión final, vuelve primero a preguntas con evidencia localizada; evita abrir búsquedas nuevas si quedan pocos minutos.',
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

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Checklist de dominio</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Sabes manejar el tiempo cuando puedes...</h2>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              {[
                'hacer skimming sin convertirlo en lectura palabra por palabra',
                'resolver preguntas con señales claras antes de las ambiguas',
                'marcar una pregunta bloqueada sin perder la evidencia',
                'volver al final solo a preguntas con alto retorno',
                'explicar por qué una pregunta difícil no merece destruir el ritmo completo',
              ].map((item) => (
                <p key={item} style={{ margin: 0, display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0.55rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>
                  <ListChecks size={18} style={{ color: ACCENT, marginTop: 2 }} />
                  <span>{item}</span>
                </p>
              ))}
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

          <section className="wl-card" style={{ padding: '1.1rem', borderRadius: 16, marginTop: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Dónde aplicar gestión del tiempo</p>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1.2rem' }}>Conecta esta habilidad con tipos de pregunta oficiales</h2>
            <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              Gestión del tiempo no reemplaza ningún tipo oficial. Te ayuda a elegir el orden y la profundidad de lectura dentro de cada tarea del IELTS Academic Reading.
            </p>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <Link href="/practica/ielts/reading/habilidades/skimming" className="btn btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                Repasar skimming <ArrowRight size={15} />
              </Link>
              <Link href="/practica/ielts/reading/habilidades/scanning" className="btn btn-ghost btn-sm">
                Repasar scanning
              </Link>
              <Link href="/practica/ielts/reading/habilidades/limite-de-palabras" className="btn btn-ghost btn-sm">
                Controlar límite de palabras
              </Link>
              <Link href="/practica/ielts/reading/habilidades/parafrasis" className="btn btn-ghost btn-sm">
                Entrenar paráfrasis
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/matching-headings" className="btn btn-ghost btn-sm">
                Practicar Matching Headings
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/true-false-not-given" className="btn btn-ghost btn-sm">
                Practicar True/False/Not Given
              </Link>
              <Link href="/practica/ielts/reading/tipos-de-preguntas/multiple-choice" className="btn btn-ghost btn-sm">
                Practicar Multiple Choice
              </Link>
              <Link href="/practica/ielts/reading" className="btn btn-ghost btn-sm">
                Volver a IELTS Reading
              </Link>
            </div>
          </section>

          <SkillReviewSourceBlock
            accent={ACCENT}
            skillName="gestión del tiempo"
            reviewedFocus={[
              'separación entre estrategia de tiempo y tipos oficiales de pregunta',
              'decisiones solve, mark y skip según evidencia disponible y retorno esperado',
              'alineación con el formato oficial de 60 minutos para tres pasajes y 40 preguntas',
            ]}
            sources={[
              {
                label: 'IELTS Academic test format and sections',
                href: IELTS_ACADEMIC_URL,
                note: 'fuente oficial usada para mantener la estrategia dentro del tiempo real del examen.',
              },
              {
                label: 'Banco WeLearn de triage',
                note: 'ejercicios originales creados para entrenar decisiones de ritmo, salto y revisión.',
              },
              {
                label: 'Rutas oficiales relacionadas',
                note: 'la habilidad se transfiere a Matching Headings, Matching Information, Completion, TFNG y Multiple Choice.',
              },
            ]}
          />

          <section style={{ marginTop: '1rem', color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.55 }}>
            <p style={{ margin: 0 }}>
              Nota de formato: gestión del tiempo es una habilidad de lectura de WeLearn, no una categoría oficial independiente del IELTS. El formato oficial sigue siendo IELTS Academic Reading: tres pasajes, 40 preguntas y 60 minutos.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
