import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData'
import WeLearnDownloadButton from '@/components/learning/WeLearnDownloadButton'
import { IELTS_INTRODUCTION_PDF, WELEARN_PDF_BASE_URL, WELEARN_PDF_NOTICE, WELEARN_PDF_OWNER, WELEARN_PDF_STANDARD_VERSION } from '@/lib/welearn-pdf-standards'

const canonical = `${WELEARN_PDF_BASE_URL}${IELTS_INTRODUCTION_PDF.landingPath}`
const pdfUrl = `${WELEARN_PDF_BASE_URL}${IELTS_INTRODUCTION_PDF.href}`

export const metadata: Metadata = {
  title: IELTS_INTRODUCTION_PDF.title,
  description: 'Descarga la guía original de WeLearn sobre la introducción y el paraphrasing del IELTS Writing Task 1, con modelos, ejercicios y respuestas.',
  keywords: ['IELTS Writing Task 1 introduccion PDF', 'IELTS paraphrasing PDF', 'introduccion IELTS Writing Task 1', 'IELTS Academic Writing Task 1 ejercicios'],
  alternates: { canonical },
  openGraph: {
    title: IELTS_INTRODUCTION_PDF.title,
    description: 'Guia WeLearn con modelos, ejercicios y respuestas explicadas para practicar la introduccion del IELTS Academic Writing Task 1.',
    type: 'article',
    url: canonical,
    locale: 'es_CO',
  },
}

const faqs = [
  { question: 'Que incluye este PDF de IELTS Writing Task 1?', answer: 'Incluye una explicacion de la introduccion, tecnicas de paraphrasing, vocabulario, modelos para seis tipos visuales, ejercicios guiados y respuestas explicadas.' },
  { question: 'Este PDF es oficial de IELTS?', answer: 'No. Es material original de Idiomas WeLearn para estudio independiente y no representa a IELTS ni utiliza sus logotipos oficiales.' },
]

export default function IeltsIntroductionPdfPage() {
  return (
    <main className="wl-section">
      <BreadcrumbJsonLd items={[
        { name: 'Inicio', url: WELEARN_PDF_BASE_URL },
        { name: 'Recursos', url: `${WELEARN_PDF_BASE_URL}/recursos` },
        { name: 'IELTS Writing Task 1 Introduccion PDF', url: canonical },
      ]} />
      <LearningResourceJsonLd
        name={IELTS_INTRODUCTION_PDF.title}
        url={canonical}
        description="Guia descargable de estudio para practicar la introduccion y el paraphrasing del IELTS Academic Writing Task 1."
        teaches={['IELTS Academic Writing Task 1', 'paraphrasing', 'introduccion de graficos', 'vocabulario academico']}
        isPartOf={{ name: 'IELTS Academic Writing Task 1', url: `${WELEARN_PDF_BASE_URL}/practica/ielts/academic/writing/task1` }}
      />
      <FaqJsonLd faqs={faqs} />
      <div className="wrap">
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap', marginBottom: '1.5rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.8rem' }}>
            <Link href="/practica/ielts">IELTS</Link><span>/</span><Link href="/practica/ielts/academic/writing/task1">Writing Task 1</Link><span>/</span><span>PDF de introduccion</span>
          </nav>
          <p className="eyebrow"><span className="ink-line" />PDF de estudio WeLearn</p>
          <h1>IELTS Writing Task 1 Introduccion PDF</h1>
          <p style={{ maxWidth: 720, color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Aprende a identificar el tipo de visual, conservar el significado del enunciado y construir una introduccion natural sin copiarlo. Esta guia sirve como referencia y como practica autonoma.
          </p>
          <WeLearnDownloadButton href={IELTS_INTRODUCTION_PDF.href} label="Descargar guia PDF" />
          <section aria-labelledby="includes-title" style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '1.5rem' }}>
            <h2 id="includes-title">Que encontraras en la guia</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem', margin: '1rem 0 1.5rem' }}>
              {['Formula y checklist de la introduccion', 'Paraphrasing: vocabulario y estructuras', 'Modelos para line, bar, pie, table, process y maps', 'Ejercicios guiados con respuestas explicadas'].map((item) => (
                <div key={item} style={{ padding: '1rem', border: '1px solid var(--line-soft)', borderRadius: 10, background: 'var(--bg)' }}><strong>{item}</strong></div>
              ))}
            </div>
            <h2>Como usarla para mejorar</h2>
            <p style={{ color: 'var(--ink-2)', lineHeight: 1.7 }}>
              Estudia primero la explicacion, intenta cada ejercicio sin mirar la clave y luego compara tu respuesta con el modelo. Despues continua con la practica interactiva de <Link href="/practica/ielts/academic/writing/task1/introduccion">Introduccion y Paraphrasing</Link> para recibir feedback inmediato.
            </p>
            <aside style={{ marginTop: '1.5rem', padding: '1rem 1.1rem', borderLeft: '4px solid #e53935', background: 'rgba(229,57,53,0.06)' }}>
              <strong>Propiedad y uso:</strong> {WELEARN_PDF_OWNER} {WELEARN_PDF_NOTICE} Version del recurso: {WELEARN_PDF_STANDARD_VERSION}. Consulta la pagina canonica de practica antes de usar una version guardada.
            </aside>
            <p style={{ marginTop: '1.4rem', fontSize: '0.86rem', color: 'var(--muted)' }}>Archivo estable: <a href={pdfUrl}>IELTS Writing Task 1 Introduccion PDF</a>.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
