import Link from 'next/link';
import { signOut } from '@/lib/actions/signOut';
import { STUDENT_PRODUCT_COPY } from '@/lib/student-dashboard/catalog';
import type { StudentDashboardData } from '@/lib/student-dashboard/types';
import styles from './student-dashboard.module.css';

const STATUS_COPY = {
  creating_source: 'Configurando cobro',
  pending_initial: 'Primer pago pendiente',
  scheduled: 'Inicio programado',
  active: 'Renovación activa',
  past_due: 'Pago pendiente',
  cancel_at_period_end: 'Finaliza al terminar el periodo',
  canceled: 'Cancelada',
} as const;

const LANGUAGE_NAMES: Record<string, string> = {
  ingles: 'Inglés', coreano: 'Coreano', frances: 'Francés', aleman: 'Alemán', italiano: 'Italiano',
  portugues: 'Portugués', japones: 'Japonés', ruso: 'Ruso',
};

const PLAN_NAMES: Record<string, string> = {
  esencial: 'Esencial', constancia: 'Constancia', impulso: 'Impulso', intensivo: 'Intensivo', diario: 'Diario',
};

function dateLabel(value: string | null): string {
  if (!value) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'America/Bogota' }).format(new Date(value));
}

function nextAction(data: StudentDashboardData) {
  const { access } = data;
  if (!data.dataAvailable) return { title: 'No pudimos comprobar tu acceso', body: 'Tu contenido seguirá bloqueado hasta que podamos verificar tus compras.', href: '/contacto', cta: 'Pedir ayuda' };
  if (access.product === 'single' && access.singleAttemptAvailable && access.exam?.mocks[0]) {
    return { title: 'Tu intento está disponible', body: `Elige un simulacro de ${access.exam.name}. Al enviarlo, encontrarás aquí el resultado y su reporte.`, href: access.exam.mocks[0].href, cta: 'Elegir simulacro' };
  }
  if (access.state === 'active' && access.exam?.mocks[0]) {
    const completed = new Set(data.attempts.map((attempt) => attempt.mockId).filter(Boolean));
    const nextMock = access.exam.mocks.find((mock) => !completed.has(mock.id)) ?? access.exam.mocks[0];
    return { title: data.attempts.length ? 'Sigue con tu ruta' : 'Empieza tu primer simulacro', body: nextMock.title, href: nextMock.href, cta: 'Comenzar ahora' };
  }
  if (access.state === 'consumed' && data.attempts[0]) {
    return { title: 'Tu reporte está listo', body: 'Tu compra incluía un intento. Puedes consultar el resultado cuando quieras.', href: data.attempts[0].reportHref, cta: 'Ver mi reporte' };
  }
  return { title: 'Escoge cómo quieres practicar', body: 'Selecciona un examen y un plan para activar tu espacio personal.', href: '/registro', cta: 'Ver planes' };
}

function ProductCard({ data }: { data: StudentDashboardData }) {
  const { access, subscription } = data;
  const product = access.product ? STUDENT_PRODUCT_COPY[access.product] : null;
  const isAvailable = access.state === 'active' || access.state === 'consumed';
  return <section className={styles.productCard} aria-labelledby="product-title">
    <div className={styles.productTop}>
      <div>
        <p className={styles.eyebrow}>Mi acceso Xpress</p>
        <h2 id="product-title">{product?.label ?? 'Sin plan activo'}</h2>
        <p>{product?.summary ?? 'Cuando una compra quede aprobada, aparecerá aquí automáticamente.'}</p>
      </div>
      <span className={`${styles.status} ${isAvailable ? styles.statusActive : styles.statusQuiet}`}>
        {access.state === 'active' ? 'Activo' : access.state === 'consumed' ? 'Usado' : access.state === 'expired' ? 'Vencido' : 'Sin acceso'}
      </span>
    </div>
    {product ? <dl className={styles.productFacts}>
      <div><dt>Plan</dt><dd>{product.price} · {product.billing}</dd></div>
      <div><dt>Examen</dt><dd>{access.exam ? `${access.exam.flag} ${access.exam.name}` : 'Por confirmar'}</dd></div>
      <div><dt>{access.product === 'single' ? 'Compra' : 'Vigencia actual'}</dt><dd>{access.product === 'single' ? dateLabel(access.startsAt) : `${dateLabel(access.startsAt)} – ${dateLabel(access.endsAt)}`}</dd></div>
    </dl> : null}
    {subscription ? <div className={styles.subscriptionStrip}>
      <div><span>Suscripción</span><strong>{STATUS_COPY[subscription.status]}</strong></div>
      <div><span>{subscription.status === 'cancel_at_period_end' ? 'Acceso hasta' : 'Próximo cobro'}</span><strong>{dateLabel(subscription.status === 'cancel_at_period_end' ? subscription.periodEndsAt : subscription.nextChargeAt)}</strong></div>
      <Link href="/suscripcion/examenes">Administrar</Link>
    </div> : null}
    {access.product === 'personalized' && access.state === 'active' ? <div className={styles.aiNotice}>
      <span aria-hidden="true">✦</span><p><strong>Revisión personalizada incluida.</strong> Recibirás observaciones concretas sobre tus resultados y los aspectos que conviene reforzar.</p>
    </div> : null}
  </section>;
}

function Attempts({ data }: { data: StudentDashboardData }) {
  const attempts = data.attempts.slice(0, 6);
  return <section className={styles.section} aria-labelledby="attempts-title">
    <header className={styles.sectionHeader}><div><p className={styles.eyebrow}>Resultados guardados</p><h2 id="attempts-title">Mis intentos</h2></div>{data.attempts.length > 6 ? <Link href="/dashboard/student/progreso">Ver historial</Link> : null}</header>
    {attempts.length ? <div className={styles.attemptList}>{attempts.map((attempt) => <article className={styles.attempt} key={attempt.id}>
      <div className={styles.score} aria-label={attempt.score === null ? attempt.scoreLabel : `${attempt.score} por ciento`}><strong>{attempt.score ?? '✓'}</strong>{attempt.score !== null ? <span>%</span> : null}</div>
      <div className={styles.attemptBody}><span>{dateLabel(attempt.createdAt)} · {attempt.examFlag} {attempt.examName}</span><h3>{attempt.title}</h3><p>{attempt.feedbackState === 'delivered' ? 'Feedback personalizado disponible' : attempt.feedbackState === 'processing' ? 'Preparando feedback personalizado' : attempt.feedbackState === 'failed' ? 'Reintentaremos generar tu feedback' : attempt.feedbackState === 'available' ? 'Feedback personalizado incluido' : 'Corrección automática guardada'}</p></div>
      <Link href={attempt.reportHref}>Ver reporte <span aria-hidden="true">→</span></Link>
    </article>)}</div> : <div className={styles.empty}><span aria-hidden="true">◎</span><div><h3>Todavía no hay intentos</h3><p>Cuando termines un simulacro, su resultado aparecerá aquí.</p></div></div>}
  </section>;
}

function MockLibrary({ data }: { data: StudentDashboardData }) {
  const { access } = data;
  const canPractice = access.state === 'active';
  const mocks = canPractice ? access.exam?.mocks.slice(0, access.product === 'single' ? 4 : 8) ?? [] : [];
  if (!access.exam || !canPractice) return null;
  const completed = new Set(data.attempts.map((attempt) => attempt.mockId).filter(Boolean));
  return <section className={styles.section} aria-labelledby="mocks-title">
    <header className={styles.sectionHeader}><div><p className={styles.eyebrow}>{access.exam.language}</p><h2 id="mocks-title">Simulacros de {access.exam.name}</h2></div><Link href={access.exam.hubHref}>Ver todos</Link></header>
    <div className={styles.mockGrid}>{mocks.map((mock, index) => <Link className={styles.mockCard} href={mock.href} key={mock.id}>
      <span className={styles.mockNumber}>{String(index + 1).padStart(2, '0')}</span>
      <div><p>{completed.has(mock.id) ? 'Completado' : index === 0 ? 'Recomendado' : 'Disponible'}</p><h3>{mock.title}</h3><span>{mock.parts} partes · {mock.questions} preguntas</span></div>
      <b aria-hidden="true">↗</b>
    </Link>)}</div>
  </section>;
}

function Courses({ courses, examName }: { courses: StudentDashboardData['courses']; examName?: string }) {
  return <section className={`${styles.section} ${styles.courseSection}`} aria-labelledby="courses-title">
    <header className={styles.sectionHeader}><div><p className={styles.eyebrow}>Clases con profesor</p><h2 id="courses-title">Mi acompañamiento</h2></div><Link href="/precios">Añadir clases</Link></header>
    {courses.length ? <div className={styles.courseGrid}>{courses.map((course) => <article className={styles.courseCard} key={course.id}>
      <div className={styles.teacherMark} aria-hidden="true"><span /><span /><span /></div>
      <div><span>{PLAN_NAMES[course.plan] ?? course.plan}</span><h3>{LANGUAGE_NAMES[course.language] ?? course.language} · {course.objective}</h3><p>{course.classes} clases de 100 minutos · {course.sessions} sesiones</p></div>
      <a href="https://wa.me/573005004253?text=Hola%2C%20quiero%20coordinar%20mis%20clases%20de%20WeLearn." rel="noreferrer" target="_blank">Coordinar por WhatsApp</a>
    </article>)}</div> : <div className={styles.courseOffer}>
      <div><span aria-hidden="true">◒</span><div><h3>{examName ? `¿Quieres preparar ${examName} con profesor?` : '¿Quieres avanzar con un profesor?'}</h3><p>Escoge el plan de clases, lee el reglamento y completa la inscripción por separado.</p></div></div>
      <Link href="/precios">Ver clases y precios</Link>
    </div>}
  </section>;
}

export default function StudentDashboardView({ data, preview = false }: { data: StudentDashboardData; preview?: boolean }) {
  const action = nextAction(data);
  const initial = data.name.trim().charAt(0).toUpperCase() || 'E';
  const completed = data.attempts.length;
  const best = data.attempts.reduce<number | null>((value, attempt) => attempt.score === null ? value : Math.max(value ?? 0, attempt.score), null);
  return <div className={styles.shell} data-testid="student-dashboard" data-plan={data.access.product ?? 'none'}>
    <aside className={styles.sidebar}>
      <Link className={styles.brand} href="/"><b>We</b>Learn<span>Student space</span></Link>
      <nav aria-label="Panel del estudiante">
        <Link className={styles.navActive} href="/dashboard/student"><span>⌂</span>Inicio</Link>
        <a href="#simulacros"><span>▤</span>Simulacros</a>
        <a href="#resultados"><span>◔</span>Resultados</a>
        <a href="#clases"><span>◉</span>Mis clases</a>
        <Link href="/dashboard/student/perfil"><span>♙</span>Mi perfil</Link>
      </nav>
      <div className={styles.sidebarBottom}><div className={styles.person}><b>{initial}</b><div><strong>{data.name}</strong><span>{data.email}</span></div></div>{preview ? <span className={styles.previewTag}>Vista de revisión</span> : <form action={signOut}><button type="submit">Cerrar sesión</button></form>}</div>
    </aside>
    <main className={styles.main}>
      <details className={styles.mobileMenu}><summary><span className={styles.mobileBrand}><b>We</b>Learn</span><span>Menú</span></summary><nav><Link href="/dashboard/student">Inicio</Link><a href="#simulacros">Simulacros</a><a href="#resultados">Resultados</a><a href="#clases">Mis clases</a></nav></details>
      <header className={styles.hero}>
        <div><p>Tu espacio de estudio</p><h1>Hola, {data.name.split(' ')[0]}.</h1><span>{data.access.exam ? `${data.access.exam.flag} ${data.access.exam.name}` : 'Todo listo para empezar'}</span></div>
        <div className={styles.heroShapes} aria-hidden="true"><i /><i /><i /></div>
      </header>
      <div className={styles.content}>
        <section className={styles.actionCard} style={{ '--exam-color': data.access.exam?.color ?? '#ef3340' } as React.CSSProperties}>
          <div><p className={styles.eyebrow}>Siguiente paso</p><h2>{action.title}</h2><p>{action.body}</p></div><Link href={action.href}>{action.cta} <span aria-hidden="true">→</span></Link>
        </section>
        <div className={styles.metrics}><article><span>Intentos</span><strong>{completed}</strong><small>guardados en tu cuenta</small></article><article><span>Mejor resultado</span><strong>{best === null ? '—' : `${best}%`}</strong><small>{best === null ? 'Completa tu primer mock' : 'entre tus intentos'}</small></article><article><span>Simulacros disponibles</span><strong>{data.access.state === 'active' ? (data.access.product === 'single' ? '1' : data.access.exam?.mocks.length ?? 0) : '0'}</strong><small>{data.access.product === 'single' ? data.access.state === 'consumed' ? 'intento utilizado' : 'un intento comprado' : 'de tu familia de examen'}</small></article></div>
        <ProductCard data={data} />
        <div id="simulacros"><MockLibrary data={data} /></div>
        <div id="resultados"><Attempts data={data} /></div>
        <div id="clases"><Courses courses={data.courses} examName={data.access.exam?.name} /></div>
      </div>
    </main>
  </div>;
}
