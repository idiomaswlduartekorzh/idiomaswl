import Link from 'next/link';
import styles from './ExamPrepLanding.module.css';

export type ExamPrepContent = {
  exam: 'IELTS' | 'TOEFL iBT';
  slug: 'preparacion-ielts' | 'preparacion-toefl';
  eyebrow: string;
  heading: string;
  intro: string;
  who: string;
  routes: { title: string; detail: string }[];
  skills: { title: string; detail: string }[];
  method: string[];
  faqs: { question: string; answer: string }[];
  practiceHref: string;
  practiceLabel: string;
  otherHref: string;
  otherLabel: string;
  whatsappMessage: string;
};

const BASE = 'https://www.idiomaswl.com';
const WHATSAPP = '573005004253';

export default function ExamPrepLanding({ content }: { content: ExamPrepContent }) {
  const url = `${BASE}/${content.slug}`;
  const contact = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(content.whatsappMessage)}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        name: content.heading,
        description: content.intro,
        url,
        provider: { '@type': 'EducationalOrganization', name: 'Idiomas WeLearn', url: BASE },
        hasCourseInstance: [
          { '@type': 'CourseInstance', courseMode: 'online', inLanguage: 'es' },
          { '@type': 'CourseInstance', courseMode: 'onsite', location: { '@type': 'Place', name: 'Idiomas WeLearn Bucaramanga', address: 'Calle 47 # 29-33, Sotomayor, Bucaramanga, Colombia' } },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Clases de inglés', item: `${BASE}/clases-de-ingles` },
          { '@type': 'ListItem', position: 3, name: content.heading, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: content.faqs.map(({ question, answer }) => ({
          '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };

  return (
    <main id="main" className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <div className={styles.breadcrumb}>
        <Link href="/clases-de-ingles">Clases de inglés</Link><span aria-hidden="true">/</span><span>{content.exam}</span>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h1>{content.heading}</h1>
            <p className={styles.lead}>{content.intro}</p>
            <div className={styles.actions}>
              <a className={styles.primary} href={contact} target="_blank" rel="noopener noreferrer" data-wa-cta={`${content.slug}-hero`}>Consultar plan y precio</a>
              <Link className={styles.secondary} href={content.practiceHref}>{content.practiceLabel}</Link>
            </div>
            <p className={styles.disclosure}>La orientación inicial por chat es gratis. El diagnóstico y las clases con tutor son pagos; conoce el precio antes de agendar.</p>
          </div>
          <aside className={styles.heroAside} aria-label="Cómo empieza la preparación">
            <p className={styles.asideLabel}>Tu punto de partida</p>
            <h2>Una ruta según tu nivel y tu meta</h2>
            <p>{content.who}</p>
            <ol>
              <li>Nos cuentas tu objetivo y plazo.</li>
              <li>Conoces el precio del diagnóstico con tutor.</li>
              <li>Recibes un plan de clases y práctica.</li>
            </ol>
          </aside>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="rutas-title">
        <div className={styles.container}>
          <p className={styles.kicker}>El objetivo</p>
          <h2 id="rutas-title">La preparación cambia según lo que necesitas demostrar.</h2>
          <div className={styles.cards}>
            {content.routes.map((route) => <article className={styles.card} key={route.title}><h3>{route.title}</h3><p>{route.detail}</p></article>)}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt} aria-labelledby="habilidades-title">
        <div className={styles.container}>
          <p className={styles.kicker}>Clases con tutor</p>
          <h2 id="habilidades-title">Qué trabajamos en tu preparación de {content.exam}</h2>
          <div className={styles.cards}>
            {content.skills.map((skill) => <article className={styles.card} key={skill.title}><h3>{skill.title}</h3><p>{skill.detail}</p></article>)}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="metodo-title">
        <div className={styles.container}>
          <p className={styles.kicker}>Método WeLearn</p>
          <h2 id="metodo-title">Así pasamos del diagnóstico a la práctica dirigida</h2>
          <ol className={styles.steps}>
            {content.method.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}
          </ol>
          <div className={styles.inlineLinks}>
            <Link href={content.practiceHref}>Explorar simulacros gratuitos →</Link>
            <Link href="/clases-de-ingles">Ver clases de inglés general →</Link>
          </div>
        </div>
      </section>

      <section className={styles.local} aria-labelledby="local-title">
        <div className={styles.container}>
          <p className={styles.kicker}>Bucaramanga y online</p>
          <h2 id="local-title">¿Quieres preparar {content.exam} desde Bucaramanga?</h2>
          <p>WeLearn tiene sede en Sotomayor, Bucaramanga. Puedes consultar clases presenciales en la ciudad o estudiar por videollamada desde otra zona. La preparación con tutor y la inscripción al examen son servicios distintos.</p>
          <Link href="/clases-de-ingles-bucaramanga">Conoce la sede y las modalidades en Bucaramanga →</Link>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="faq-title">
        <div className={styles.container}>
          <p className={styles.kicker}>Preguntas frecuentes</p>
          <h2 id="faq-title">Antes de empezar</h2>
          <div className={styles.faqs}>
            {content.faqs.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.container}>
          <h2>Cuéntanos tu meta de {content.exam}</h2>
          <p>Te explicamos la modalidad, la ruta y el precio antes de reservar una sesión paga.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href={contact} target="_blank" rel="noopener noreferrer" data-wa-cta={`${content.slug}-final`}>Consultar preparación</a>
            <Link className={styles.secondary} href={content.otherHref}>{content.otherLabel}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
