import type { Metadata } from 'next'
import Link from 'next/link'
import { CourseSchema } from '@/components/practica/EducationSchema'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Preparación IELTS — Simulacros, Clases y Estrategia | Idiomas WeLearn',
  description: 'Preparación integral para IELTS (Academic & General). Simulacros con scoring oficial, clases 1:1 con especialistas, análisis de banda, estrategias de éxito. Obtén Band 7+ en Idiomas WeLearn.',
  keywords: [
    'preparación IELTS',
    'IELTS band 7',
    'simulacro IELTS online',
    'clases IELTS',
    'IELTS academic',
    'IELTS general',
    'IELTS writing',
    'IELTS speaking',
    'IELTS Colombia',
    'preparación IELTS Bucaramanga',
  ],
  openGraph: {
    title: 'Preparación IELTS — Simulacros y Clases | Idiomas WeLearn',
    description: 'Preparación integral para IELTS con simulacros oficiales y clases 1:1.',
    type: 'website',
    locale: 'es_CO',
    url: 'https://www.idiomaswl.com/preparacion-ielts',
    images: [{ url: 'https://www.idiomaswl.com/api/og?type=examen&exam=ielts', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.idiomaswl.com/preparacion-ielts',
  },
}

export default function PreparacionIELTSPage() {
  return (
    <>
      <CourseSchema
        name="Preparación IELTS — Simulacros Oficiales y Clases Especializadas"
        description="Preparación completa para IELTS (Academic y General). Simulacros con scoring real, análisis de banda, clases 1:1 con especialistas, estrategias probadas."
        url="https://www.idiomaswl.com/preparacion-ielts"
        educationalLevel="A2-C1"
        teaches="IELTS English"
        inLanguage="en"
      />

      <section className="wl-section" style={{ paddingTop: '4rem' }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
            <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
            <span>/</span>
            <span>Preparación IELTS</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <p className="eyebrow"><span className="ink-line" />IELTS International English Language Testing System</p>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0.5rem 0', lineHeight: 1.2 }}>
              Preparación IELTS Band 7+
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--muted)', maxWidth: 600, marginTop: '1rem' }}>
              Simulacros oficiales, análisis de scoring real, clases 1:1 con especialistas y estrategias probadas para alcanzar tu banda objetivo.
            </p>
          </div>

          {/* CTA Principal */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <WhatsAppButton
              msg="Hola, me gustaría información sobre preparación IELTS y agendar una clase diagnóstica gratis."
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
              href="/practica/ielts/academic"
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
                Pruebas completas con scoring real, análisis de banda por sección y feedback personalizado. Practica como en el examen real.
              </p>
            </div>

            {/* Clases */}
            <div style={{ padding: '1.5rem', border: '1.5px solid #0f3d8c33', borderRadius: '12px', borderTop: '3px solid #0f3d8c' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👨‍🏫</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Clases 1:1</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
                Especialistas en IELTS con años de experiencia. Clases adaptadas a tu nivel y objetivo, enfoque en debilidades.
              </p>
            </div>

            {/* Estrategia */}
            <div style={{ padding: '1.5rem', border: '1.5px solid #0f3d8c33', borderRadius: '12px', borderTop: '3px solid #0f3d8c' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Estrategia Probada</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
                Método de 17 pasos comprobado. Técnicas avanzadas para Reading, Writing, Listening y Speaking.
              </p>
            </div>
          </div>

          {/* Comparación Academic vs General */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              IELTS Academic vs General
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ padding: '1.5rem', background: '#f5f5f5', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>IELTS Academic</h3>
                <ul style={{ marginLeft: '1.5rem', color: 'var(--muted)' }}>
                  <li>Maestrías y universidades</li>
                  <li>Contenido académico más desafiante</li>
                  <li>Texto especializado en Reading</li>
                  <li>Escritura académica formal</li>
                  <li>Banda típica: 6.5-7.5</li>
                </ul>
              </div>
              <div style={{ padding: '1.5rem', background: '#f5f5f5', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>IELTS General</h3>
                <ul style={{ marginLeft: '1.5rem', color: 'var(--muted)' }}>
                  <li>Migración y trabajo</li>
                  <li>Contenido cotidiano y práctico</li>
                  <li>Texts de avisos y formularios</li>
                  <li>Carta personal y formal</li>
                  <li>Banda típica: 5.5-6.5</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Estructura del examen */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Estructura del Examen
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {[
                { name: 'Listening', time: '30 min', details: '40 preguntas, 4 audios' },
                { name: 'Reading', time: '60 min', details: '40 preguntas, 3 textos' },
                { name: 'Writing', time: '60 min', details: 'Task 1 (150) + Task 2 (250)' },
                { name: 'Speaking', time: '11-14 min', details: '3 partes, conversación' },
              ].map((section) => (
                <div key={section.name} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{section.name}</div>
                  <div style={{ color: '#0f3d8c', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{section.time}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{section.details}</div>
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
              <li>✅ Especialistas con 10+ años en IELTS</li>
              <li>✅ Simulacros con scoring oficial Cambridge</li>
              <li>✅ Acceso a 40+ simulacros completos</li>
              <li>✅ Análisis de banda detallado por sección</li>
              <li>✅ Clases adaptadas a tu nivel (A2-C1)</li>
              <li>✅ Preparación desde 8 semanas hasta intensiva</li>
            </ul>
          </div>

          {/* CTA Final */}
          <div style={{ padding: '2rem', background: '#f5f5f5', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>
              Comienza tu preparación IELTS hoy
            </h3>
            <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
              Simulacro gratis + diagnóstico personalizado
            </p>
            <WhatsAppButton
              msg="Quiero comenzar a prepararme para IELTS. ¿Cuál es el siguiente paso?"
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
