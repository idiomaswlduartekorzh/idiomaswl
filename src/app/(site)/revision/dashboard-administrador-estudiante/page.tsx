import { notFound } from 'next/navigation';
import styles from '../../dashboard/admin/estudiantes/[studentId]/student-detail.module.css';

export const metadata = { title: 'Ficha de estudiante — revisión', robots: { index: false, follow: false } };

const results = [
  { title: 'IELTS Academic Set 5', score: 87, date: '12 sept 2026' },
  { title: 'IELTS Academic Set 4', score: 84, date: '10 sept 2026' },
  { title: 'IELTS Academic Set 3', score: 69, date: '8 sept 2026' },
];

export default function AdminStudentPreviewPage() {
  if (process.env.VERCEL_ENV === 'production' || process.env.STUDENT_DASHBOARD_PREVIEW !== 'true') notFound();
  const points = [{ x: 35, y: 88, score: 52 }, { x: 170, y: 72, score: 64 }, { x: 310, y: 66, score: 69 }, { x: 445, y: 48, score: 84 }, { x: 570, y: 45, score: 87 }];
  return <main className={styles.page}>
    <nav><span>← Volver a estudiantes</span><span>Ficha privada · vista de revisión</span></nav>
    <header><div className={styles.avatar}>M</div><div><p>Preparación · Inglés</p><h1>Mariana López</h1><span>mariana@ejemplo.com</span></div></header>
    <section className={styles.metrics}><article><span>Simulacros</span><strong>5</strong></article><article><span>Promedio</span><strong>71%</strong></article><article><span>Días activos · 30 días</span><strong>12</strong></article><article><span>Última actividad</span><strong>12 sept 2026</strong></article></section>
    <section className={styles.card}>
      <div className={styles.cardHeader}><div><p>Seguimiento académico</p><h2>Curva de aprendizaje · IELTS</h2></div><span>+35 puntos</span></div>
      <div className={styles.progressGrid}><div className={styles.chart}><svg viewBox="0 0 600 170" role="img" aria-label="Curva de resultados del estudiante">{[30,60,90].map((value) => <line key={value} x1="25" x2="575" y1={145-value*1.15} y2={145-value*1.15} />)}<polyline points={points.map((point) => `${point.x},${point.y}`).join(' ')} />{points.map((point) => <g key={point.x}><circle cx={point.x} cy={point.y} r="6" /><text x={point.x} y={point.y-12}>{point.score}%</text></g>)}</svg></div><div className={styles.insights}><article><span>Fortalezas</span><div><b>Reading</b><strong>88%</strong></div><div><b>Listening</b><strong>81%</strong></div></article><article><span>Por mejorar</span><div><b>Writing</b><strong>64%</strong></div><div><b>Speaking</b><strong>69%</strong></div></article></div></div>
    </section>
    <section className={styles.card}><div className={styles.cardHeader}><div><p>Historial</p><h2>Exámenes realizados</h2></div><span>5 registros</span></div><div className={styles.examList}>{results.map((result) => <article key={result.title}><div><span>{result.date} · 🇬🇧 IELTS</span><h3>{result.title}</h3></div><strong>{result.score}%</strong></article>)}</div></section>
    <section className={styles.card}>
      <div className={styles.cardHeader}><div><p>Acompañamiento</p><h2>Asignaciones</h2></div><span>2 pendientes</span></div>
      <form className={styles.assignmentForm}><label><span>Título</span><input disabled value="Writing Task 2 · ensayo" readOnly /></label><label><span>Fecha de entrega</span><input disabled value="15/09/2026 18:00" readOnly /></label><label className={styles.formWide}><span>Instrucciones</span><textarea disabled value="Escribir 250 palabras y enviarlo antes de la próxima clase." readOnly rows={3} /></label><label className={styles.formWide}><span>Enlace o material</span><input disabled value="/examenes/ielts" readOnly /></label><button disabled type="button">Asignar tarea</button></form>
      <div className={styles.assignmentList}><article><div><span>Entrega 15 sept 2026</span><h3>Writing Task 2 · ensayo</h3><p>Escribir 250 palabras y enviarlo antes de la próxima clase.</p></div><button disabled type="button">Cancelar</button></article><article><div><span>Completada</span><h3>Repasar conectores</h3><p>La estudiante marcó esta actividad como lista.</p></div></article></div>
    </section>
  </main>;
}
