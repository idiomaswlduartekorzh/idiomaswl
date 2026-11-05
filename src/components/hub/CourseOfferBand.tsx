import Link from 'next/link';
import { ENROLLMENT_FEE_COP, EXAM_PLATFORM_FEE_COP, LEVELS, PLANS, formatCOP, selectionPath } from '@/lib/course-pricing/catalog';
import styles from './CourseOfferBand.module.css';

type Props = {
  language: 'ingles' | 'frances';
  name: string;
  local?: boolean;
  objective?: string;
};

export default function CourseOfferBand({ language, name, local = false, objective }: Props) {
  return (
    <section className={styles.section} aria-labelledby={`${language}-offer-heading`}>
      <div className="wrap">
        <p className={styles.eyebrow}>Planes de clases con tutor</p>
        <h2 id={`${language}-offer-heading`} className={styles.heading}>
          {objective ? `Preparación ${name}` : `Clases de ${name}`}: duración, frecuencia y precio
        </h2>
        <p className={styles.intro}>
          Cada clase dura 100 minutos. Elige un ciclo de cuatro semanas y la frecuencia que se adapte a tu objetivo.
          {local ? ' Puedes estudiar en nuestra sede de Sotomayor o por videollamada.' : ' Las clases online son en vivo por videollamada.'}
          {objective === 'IELTS Academic' ? ' Puedes cambiar a IELTS General Training en la página de precios.' : ''}
        </p>
        <div className={styles.grid}>
          {PLANS.slice(0, 3).map(plan => (
            <article className={styles.card} key={plan.id}>
              <h3>{plan.name}</h3>
              <p className={styles.price}>{formatCOP(plan.price)} <span>COP / 4 semanas</span></p>
              <p>{plan.weekly} {plan.weekly === 1 ? 'clase' : 'clases'} por semana · {plan.weekly * 4} clases en el ciclo</p>
              <Link href={selectionPath({ language, objective: objective ?? 'general', plan: plan.id, level: LEVELS[0] })}>
                Ver este plan <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
        <p className={styles.note}>
          En la primera inscripción puede sumarse {formatCOP(ENROLLMENT_FEE_COP)} COP. El total se muestra antes del pago.
          {objective ? ` La plataforma de preparación para exámenes tiene un pago único adicional de ${formatCOP(EXAM_PLATFORM_FEE_COP)} COP por los recursos y herramientas de práctica y corrección disponibles para el examen elegido; el alcance varía según el examen. La práctica automática pública sigue siendo gratuita y la inscripción al examen oficial se paga aparte. ` : ' '}
          Puedes consultar la disponibilidad antes de pagar; el horario definitivo se coordina después del pago. Una sesión de diagnóstico con tutor,
          si la solicitas, es paga y se cotiza antes de agendar.
        </p>
        <Link className={styles.allPlans} href={`/precios?idioma=${language}&objetivo=${encodeURIComponent(objective ?? 'general')}`}>
          Comparar los cinco planes y ver el total de inscripción →
        </Link>
      </div>
    </section>
  );
}
