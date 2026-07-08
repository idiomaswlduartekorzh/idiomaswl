import type { Metadata } from 'next'
import Link from 'next/link'
import { CourseSchema } from '@/components/practica/EducationSchema'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Preparación TOEFL iBT — Simulacros Oficiales y Estrategia | Idiomas WeLearn',
  description: 'Preparación completa para TOEFL iBT (Test of English as a Foreign Language). Simulacros con scoring real, clases 1:1 con especialistas, estrategias de éxito. Obtén 100+ en Idiomas WeLearn.',
  keywords: [
    'preparación TOEFL',
    'TOEFL iBT',
    'simulacro TOEFL online',
    'clases TOEFL',
    'TOEFL reading',
    'TOEFL writing',
    'TOEFL speaking',
    'TOEFL listening',
    'TOEFL Colombia',
    'preparación TOEFL Bucaramanga',
  ],
  openGraph: {
    title: 'Preparación TOEFL iBT — Simulacros y Clases | Idiomas WeLearn',
    description: 'Preparación integral para TOEFL iBT con simulacros oficiales y clases 1:1.',
    type: 'website',
    locale: 'es_CO',
    url: 'https://www.idiomaswl.com/preparacion-toefl',
    images: [{ url: 'https://www.idiomaswl.com/api/og?type=examen&exam=toefl', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.idiomaswl.com/preparacion-toefl',
  },
}

export default function PreparacionTOEFLPage() {
  return (
    <>
      <CourseSchema
        name="Preparación TOEFL iBT — Simulacros Oficiales y Clases Especializadas"
        description="Preparación completa para TOEFL iBT. Simulacros con scoring real, análisis de secciones, clases 1:1 con especialistas, estrategias probadas para obtener 100+."
        url="https://www.idiomaswl.com/preparacion-toefl"
        educationalLevel="B2-C1"
        teaches="TOEFL English"
        inLanguage="en"
      />

      <section className="wl-section" style={{ paddingTop: '4rem' }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
            <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
            <span>/</span>
            <span>Preparación TOEFL</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <p className="eyebrow"><span className="ink-line" />TOEFL Test of English as a Foreign Language</p>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0.5rem 0', lineHeight: 1.2 }}>
              Preparación TOEFL iBT 100+
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--muted)', maxWidth: 600, marginTop: '1rem' }}>
              Simulacros con puntaje oficial, análisis de desempeño, clases 1:1 con especialistas y estrategias específicas para cada sección del examen.
            </p>
          </div>

          {/* CTA Principal */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <WhatsAppButton
              msg="Hola, me gustaría información sobre preparación TOEFL y agendar una clase diagnóstica gratis."
              label="Agendar Diagnóstico Gratis"
              style={{
                padding: '0.75rem 1.5rem',
                background: '#25d366',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            />
            <Link
              href="/practica/ingles/b2"
              style={{
                padding: '0.75rem 1.5rem',
                border: '2px solid var(--ink)',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'var(--ink)',
                fontWeight: 600,
              }}
            >
              Comenzar Práctica Gratis
            </Link>
          </div>

          {/* Secciones principales */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {/* Simulacros */}
            <div style={{ padding: '1.5rem', border: '1.5px solid #0f3d8c33', borderRadius: '12px', borderTop: '3px solid #0f3d8c' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Simulacros Oficiales</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
                Pruebas completas con scoring oficial ETS, análisis detallado por sección y feedback específico para cada pregunta.
              </p>
            </div>

            {/* Clases */}
            <div style={{ padding: '1.5rem', border: '1.5px solid #0f3d8c33', borderRadius: '12px', borderTop: '3px solid #0f3d8c' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👨‍🏫</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Clases 1:1</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
                Especialistas certificados en TOEFL. Estrategias específicas por sección: Reading, Writing, Listening, Speaking.
              </p>
            </div>

            {/* Estrategia */}
            <div style={{ padding: '1.5rem', border: '1.5px solid #0f3d8c33', borderRadius: '12px', borderTop: '3px solid #0f3d8c' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Estrategia Probada</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
                Método de 17 pasos adaptado al TOEFL. Técnicas avanzadas de time management y maximización de puntuación.
              </p>
            </div>
          </div>

          {/* Estructura del examen */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Estructura del Examen TOEFL iBT
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {[
                { name: 'Reading', time: '54-72 min', details: '30-40 preguntas' },
                { name: 'Listening', time: '41-57 min', details: '28-39 preguntas' },
                { name: 'Break', time: '10 min', details: 'Descanso obligatorio' },
                { name: 'Writing', time: '20 min', details: '1 tarea integrada' },
                { name: 'Speaking', time: '16-20 min', details: '4 tareas' },
              ].map((section) => (
                <div key={section.name} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{section.name}</div>
                  <div style={{ color: '#0f3d8c', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{section.time}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{section.details}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
              <strong>Puntuación total:</strong> 0-120 (cada sección: 0-30)
            </div>
          </div>

          {/* Rango de puntuaciones */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Rango de Puntuaciones Según Objetivo
            </h2>
            <div style={{ display: 'grid', gap: '0.8rem' }}>
              {[
                { range: '90-100', purpose: 'Maestría competitiva en universidades Top 20' },
                { range: '100-110', purpose: 'Universidades Ivy League y de élite' },
                { range: '80-90', purpose: 'Admisión a universidades de buen nivel' },
                { range: '65-79', purpose: 'Cumple requisitos básicos de universidades' },
              ].map((item) => (
                <div key={item.range} style={{ padding: '1rem', display: 'flex', gap: '1rem', borderLeft: '3px solid #0f3d8c' }}>
                  <div style={{ fontWeight: 700, color: '#0f3d8c', minWidth: '80px' }}>{item.range}</div>
                  <div>{item.purpose}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Por qué con WeLearn */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Por qué prepararte con Idiomas WeLearn
            </h2>
            <ul style={{ display: 'grid', gap: '1rem', marginLeft: '1.5rem', maxWidth: '600px' }}>
              <li>✅ Especialistas certificados en TOEFL</li>
              <li>✅ Acceso a 30+ simulacros completos</li>
              <li>✅ Scoring oficial ETS en cada simulacro</li>
              <li>✅ Análisis de fortalezas y debilidades</li>
              <li>✅ Estrategias específicas por sección</li>
              <li>✅ Preparación desde 6 hasta 12 semanas</li>
            </ul>
          </div>

          {/* CTA Final */}
          <div style={{ padding: '2rem', background: '#f5f5f5', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>
              Comienza tu preparación TOEFL hoy
            </h3>
            <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
              Simulacro gratis + análisis de desempeño
            </p>
            <WhatsAppButton
              msg="Quiero comenzar a prepararme para TOEFL. ¿Cuál es el siguiente paso?"
              label="Hablar con Especialista"
              style={{
                padding: '0.75rem 2rem',
                background: '#25d366',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            />
          </div>
        </div>
      </section>
    </>
  )
}
