import { COURSE_TERMS, TERMS_VERSION } from '@/lib/course-pricing/terms';
export const metadata = { title: 'Reglamento de clases | WeLearn', robots: { index: false, follow: false } };
export default function ReglamentoPage() {
  return <main style={{maxWidth:760,margin:'48px auto',padding:'0 24px',lineHeight:1.7}}>
    <a href="/precios">← Volver a los cursos</a>
    <h1>Reglamento de clases</h1>
    <p><strong>Lee estas condiciones antes de pagar.</strong> Puedes guardar o imprimir esta página desde tu navegador. Conservamos con tu orden la versión que aceptaste.</p>
    {COURSE_TERMS.map(section=><section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}
    <p>Versión: {TERMS_VERSION} · Vigente desde el 7 de septiembre de 2026.</p>
    <p>Consulta tus derechos en la <a href="https://www.sic.gov.co/">Superintendencia de Industria y Comercio</a>.</p>
  </main>;
}
