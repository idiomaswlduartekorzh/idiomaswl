import type { Metadata } from 'next'
import Link from 'next/link'
import { CourseSchema } from '@/components/practica/EducationSchema'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Preparación TOPIK — Coreano de Fluido a Avanzado | Idiomas WeLearn',
  description: 'Preparación completa para TOPIK I y TOPIK II (examen oficial de coreano). Simulacros auténticos, clases 1:1 con especialistas, estrategias específicas. Obtén Level 3-6 en Idiomas WeLearn.',
  keywords: [
    'preparación TOPIK',
    'TOPIK I',
    'TOPIK II',
    'examen coreano',
    'clases TOPIK',
    'simulacro TOPIK online',
    'coreano nivel 3',
    'coreano nivel 6',
    'TOPIK Colombia',
    'preparación TOPIK Bucaramanga',
  ],
  openGraph: {
    title: 'Preparación TOPIK — Coreano TOPIK I y II | Idiomas WeLearn',
    description: 'Preparación integral para TOPIK con simulacros auténticos y clases 1:1.',
    type: 'website',
    locale: 'es_CO',
    url: 'https://www.idiomaswl.com/preparacion-topik',
    images: [{ url: 'https://www.idiomaswl.com/api/og?type=examen&exam=topik', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.idiomaswl.com/preparacion-topik',
  },
}

export default function PreparacionTOPIKPage() {
  return (
    <>
      <CourseSchema
        name="Preparación TOPIK — Simulacros Auténticos y Clases Especializadas"
        description="Preparación completa para TOPIK I y TOPIK II. Simulacros con formato oficial, análisis de desempeño, clases 1:1 con especialistas, estrategias probadas para alcanzar Level 3-6."
        url="https://www.idiomaswl.com/preparacion-topik"
        educationalLevel="A1-C1"
        teaches="Korean TOPIK"
        inLanguage="ko"
      />

      <section className="wl-section" style={{ paddingTop: '4rem' }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
            <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
            <span>/</span>
            <span>Preparación TOPIK</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <p className="eyebrow"><span className="ink-line" />🇰🇷 TOPIK — Test of Proficiency in Korean</p>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0.5rem 0', lineHeight: 1.2 }}>
              Preparación TOPIK Level 3-6
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--muted)', maxWidth: 600, marginTop: '1rem' }}>
              Simulacros con formato oficial TOPIK, análisis de desempeño por sección, clases 1:1 con especialistas en coreano y estrategias específicas para cada nivel.
            </p>
          </div>

          {/* CTA Principal */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <WhatsAppButton
              msg="Hola, me gustaría información sobre preparación TOPIK y agendar una clase diagnóstica gratis."
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
              href="/practica/coreano/b1"
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
            <div style={{ padding: '1.5rem', border: '1.5px solid #c60c3033', borderRadius: '12px', borderTop: '3px solid #c60c30' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Simulacros Auténticos</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
                Pruebas completas con formato oficial TOPIK, análisis de secciones (Lectura, Escucha, Escritura) y feedback personalizado.
              </p>
            </div>

            {/* Clases */}
            <div style={{ padding: '1.5rem', border: '1.5px solid #c60c3033', borderRadius: '12px', borderTop: '3px solid #c60c30' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👨‍🏫</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Clases 1:1</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
                Especialistas en coreano con experiencia en preparación TOPIK. Clases personalizadas según tu nivel objetivo.
              </p>
            </div>

            {/* Estrategia */}
            <div style={{ padding: '1.5rem', border: '1.5px solid #c60c3033', borderRadius: '12px', borderTop: '3px solid #c60c30' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Estrategia Probada</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
                Método comprobado para avanzar de nivel. Técnicas específicas de lectura rápida, escucha activa y escritura efectiva.
              </p>
            </div>
          </div>

          {/* TOPIK I vs TOPIK II */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              TOPIK I vs TOPIK II
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ padding: '1.5rem', background: '#f5f5f5', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#c60c30' }}>TOPIK I</h3>
                <ul style={{ marginLeft: '1.5rem', color: 'var(--muted)' }}>
                  <li><strong>Niveles:</strong> 1-2</li>
                  <li><strong>Lectura:</strong> 40 min (50 preguntas)</li>
                  <li><strong>Escucha:</strong> 60 min (50 preguntas)</li>
                  <li><strong>Puntuación:</strong> 0-200</li>
                  <li><strong>Duración:</strong> ~100 minutos</li>
                </ul>
              </div>
              <div style={{ padding: '1.5rem', background: '#f5f5f5', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#c60c30' }}>TOPIK II</h3>
                <ul style={{ marginLeft: '1.5rem', color: 'var(--muted)' }}>
                  <li><strong>Niveles:</strong> 3-6</li>
                  <li><strong>Lectura:</strong> 60 min (50 preguntas)</li>
                  <li><strong>Escucha:</strong> 60 min (50 preguntas)</li>
                  <li><strong>Escritura:</strong> 50 min (4 tareas)</li>
                  <li><strong>Puntuación:</strong> 0-300</li>
                  <li><strong>Duración:</strong> ~170 minutos</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Niveles TOPIK */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Niveles TOPIK
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {[
                { level: 'Nivel 1', range: '0-100', desc: 'Principiante' },
                { level: 'Nivel 2', range: '101-200', desc: 'Elemental' },
                { level: 'Nivel 3', range: '201-250', desc: 'Intermedio Bajo' },
                { level: 'Nivel 4', range: '251-300', desc: 'Intermedio Alto' },
                { level: 'Nivel 5', range: '301-350', desc: 'Avanzado Bajo' },
                { level: 'Nivel 6', range: '351-400', desc: 'Avanzado Alto' },
              ].map((item) => (
                <div key={item.level} style={{ padding: '1rem', display: 'grid', gridTemplateColumns: '120px 100px 1fr', gap: '1rem', borderLeft: '3px solid #c60c30', borderRadius: '4px' }}>
                  <div style={{ fontWeight: 700 }}>{item.level}</div>
                  <div style={{ color: '#c60c30', fontWeight: 600 }}>{item.range}</div>
                  <div>{item.desc}</div>
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
              <li>✅ Especialistas en coreano con experiencia TOPIK</li>
              <li>✅ Acceso a 20+ simulacros auténticos</li>
              <li>✅ Análisis detallado de cada sección</li>
              <li>✅ Estrategias específicas de lectura y escucha</li>
              <li>✅ Vocabulario TOPIK por nivel</li>
              <li>✅ Preparación desde 8 semanas hasta intensiva</li>
              <li>✅ Método de 17 pasos adaptado al coreano</li>
            </ul>
          </div>

          {/* CTA Final */}
          <div style={{ padding: '2rem', background: '#f5f5f5', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>
              Comienza tu preparación TOPIK hoy
            </h3>
            <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
              Simulacro gratis + diagnóstico personalizado de nivel
            </p>
            <WhatsAppButton
              msg="Quiero comenzar a prepararme para TOPIK. ¿Cuál es el siguiente paso?"
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
