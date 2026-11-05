import { COURSE_TERMS, TERMS_VERSION } from '@/lib/course-pricing/terms';
import styles from './reglamento.module.css';

export const metadata = { title: 'Reglamento de clases | WeLearn', robots: { index: false, follow: false } };

export default function ReglamentoPage() {
  return <main className={styles.page}>
    <div className={styles.shell}>
      <nav className={styles.back} aria-label="Volver"><a href="/precios">← Volver a los cursos</a></nav>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>WELEARN / DOCUMENTO DE CLASES</p>
          <h1>Reglas claras para aprender juntos.</h1>
          <p className={styles.lead}>Lee el reglamento completo antes de aceptar tu inscripción. Aquí encontrarás cómo programamos las clases, qué ocurre si faltas y cómo conservamos tu aceptación.</p>
          <div className={styles.meta}><span>Reglamento de clases</span><span>Versión {TERMS_VERSION}</span><span>Vigente desde el 31 de octubre de 2026</span></div>
        </div>
        <div className={styles.heroMark} aria-hidden="true"><span>W</span><i /></div>
      </header>
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Contenido del reglamento">
          <div className={styles.sidebarInner}>
            <p className={styles.sideLabel}>EN ESTE DOCUMENTO</p>
            <ol>{COURSE_TERMS.map((section, index) => <li key={section.title}><a href={`#regla-${index + 1}`}><span>{String(index + 1).padStart(2, '0')}</span>{section.title}</a></li>)}</ol>
            <div className={styles.downloadBox}><strong>Guarda una copia</strong><p>Puedes descargar el documento para leerlo con calma.</p><a href="/reglamento/archivo">Descargar PDF <span aria-hidden="true">↗</span></a></div>
          </div>
        </aside>
        <div className={styles.content}>
          <div className={styles.readingNote}><span aria-hidden="true">✦</span><p><strong>Antes de firmar</strong><br />La aceptación se guarda con la fecha, la versión y el nombre que escribas como firma electrónica en el formulario.</p></div>
          {COURSE_TERMS.map((section, index) => <section className={styles.rule} id={`regla-${index + 1}`} key={section.title}>
            <div className={styles.ruleNumber}>{String(index + 1).padStart(2, '0')}</div>
            <div><h2>{section.title}</h2><p>{section.text}</p></div>
          </section>)}
          <footer className={styles.footer}>
            <p>Versión {TERMS_VERSION} · Vigente desde el 31 de octubre de 2026.</p>
            <p>Para consultas sobre tus derechos, visita la <a href="https://www.sic.gov.co/" target="_blank" rel="noopener noreferrer">Superintendencia de Industria y Comercio</a>.</p>
            <a className={styles.footerBack} href="/precios">← Volver a los cursos</a>
          </footer>
        </div>
      </div>
    </div>
  </main>;
}
