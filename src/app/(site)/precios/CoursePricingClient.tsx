'use client';

import { useRef, useState } from 'react';
import {
  LANGUAGES, LEVELS, PLANS, formatCOP, objectiveLabel, objectivesFor,
  selectionDetails, selectionPath, selectionSummary, whatsappLink,
  type Selection,
} from '@/lib/course-pricing/catalog';
import CourseEnrollmentForm from './CourseEnrollmentForm';
import styles from './course-pricing.module.css';

export default function CoursePricingClient({ initialSelection, initialReviewing = false, corrected, salesEnabled }: { initialSelection: Selection; initialReviewing?: boolean; corrected: boolean; salesEnabled: boolean }) {
  const [selection, setSelection] = useState(initialSelection);
  const [reviewing, setReviewing] = useState(initialReviewing);
  const [copyStatus, setCopyStatus] = useState('');
  const [fallback, setFallback] = useState('');
  const reviewRef = useRef<HTMLHeadingElement>(null);
  const editorRef = useRef<HTMLHeadingElement>(null);
  const { language, plan, classes, sessions } = selectionDetails(selection);

  function update(patch: Partial<Selection>) {
    setSelection(current => ({ ...current, ...patch }));
    setCopyStatus('');
    setFallback('');
  }
  function switchReview(value: boolean) {
    setReviewing(value);
    setCopyStatus('');
    setFallback('');
    requestAnimationFrame(() => (value ? reviewRef : editorRef).current?.focus());
  }
  async function copy(kind: 'summary' | 'link') {
    const text = kind === 'summary' ? selectionSummary(selection) : new URL(selectionPath(selection), window.location.origin).href;
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(kind === 'summary' ? 'Resumen copiado.' : 'Enlace copiado. Abre la misma selección.');
      setFallback('');
    } catch {
      setCopyStatus('Puedes seleccionar y copiar el texto de abajo.');
      setFallback(text);
    }
  }

  return <div className={styles.page}>
    <div className={styles.wrap}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>WELEARN · CLASES DE IDIOMAS</p>
        <h1>Tu idioma.<br /><span>Tu propio ritmo.</span></h1>
        <p>Elige qué quieres aprender y cuántas veces por semana.<br className={styles.desktopBreak} /> Un plan claro, en ciclos de cuatro semanas.</p>
        <div className={styles.facts}><span>8 idiomas</span><span>Clases de 100 minutos</span><span>Desde $320.000 COP</span></div>
      </header>
      <ol className={styles.steps} aria-label="Pasos para elegir tu curso">
        <li aria-current={!reviewing ? 'step' : undefined}><span>01</span> Idioma e intensidad</li>
        <li aria-current={reviewing ? 'step' : undefined}><span>02</span> Reglamento</li>
        <li><span>03</span> Tus datos</li>
        <li><span>04</span> Pago seguro</li>
      </ol>
      {corrected && <p className={styles.notice} role="status">El enlace tenía opciones que no reconocemos. Revisa el idioma, objetivo y plan antes de continuar.</p>}

      {!reviewing ? <div className={styles.layout}>
        <div>
          <section className={styles.section} aria-labelledby="course-heading">
            <p className={styles.eyebrow}>01 / TU CURSO</p>
            <h2 id="course-heading" ref={editorRef} tabIndex={-1}>¿Qué quieres aprender?</h2>
            <fieldset className={styles.languages}>
              <legend className={styles.srOnly}>Elige tu idioma</legend>
              {LANGUAGES.map(l => <label key={l.id} className={styles.language}>
                <input type="radio" name="language" value={l.id} checked={selection.language === l.id} onChange={() => update({ language: l.id, objective: 'general', level: LEVELS[0] })} />
                <span>{l.name}</span>
              </label>)}
            </fieldset>
            <div className={styles.fields}>
              <label>Mi objetivo<select value={selection.objective} onChange={e => update({ objective: e.target.value })}>
                {objectivesFor(selection.language).map(o => <option key={o} value={o}>{objectiveLabel(o)}</option>)}
              </select></label>
              <label>Mi nivel aproximado<select value={selection.level} onChange={e => update({ level: e.target.value })}>
                {LEVELS.map(level => <option key={level}>{level}</option>)}
              </select></label>
            </div>
            <p className={styles.small}>No necesitas conocer tu nivel para elegir. Si buscas un examen, revisaremos contigo el alcance de la preparación.</p>
          </section>
          <section className={styles.section} aria-labelledby="plans-heading">
            <p className={styles.eyebrow}>02 / TU RITMO</p>
            <h2 id="plans-heading">Hazle espacio a tu idioma.</h2>
            <p className={styles.small}>Cada clase reúne dos sesiones de 50 minutos. Todos los precios son por cuatro semanas.</p>
            <fieldset className={styles.plans}>
              <legend className={styles.srOnly}>Elige tu plan</legend>
              {PLANS.map(p => <label key={p.id} className={styles.plan}>
                <input type="radio" name="plan" value={p.id} checked={selection.plan === p.id} onChange={() => update({ plan: p.id })} />
                <span className={styles.planContent}>
                  <span className={styles.planHeading}><strong>{p.name}</strong><span>{formatCOP(p.price)} <small>COP</small></span></span>
                  <span className={styles.planUnits}>{p.weekly} {p.weekly === 1 ? 'clase' : 'clases'}/semana · {p.weekly * 4} clases · {p.weekly * 8} sesiones</span>
                  <span className={styles.planDescription}>{p.description}</span>
                </span>
              </label>)}
            </fieldset>
          </section>
          <div className={styles.autonomous}><p className={styles.eyebrow}>ENTRE CLASES</p><h3>Tu práctica también tiene un lugar.</h3><p>La propuesta de inmersión combina clases con asignaciones de trabajo autónomo, desde casa o en nuestra oficina. Si te interesa, podemos orientarte.</p></div>
        </div>
        <aside className={styles.summary} aria-label="Resumen del plan elegido">
          <p className={styles.eyebrow}>ASÍ QUEDA TU PLAN</p>
          <h2>{language.name}</h2><p>{objectiveLabel(selection.objective)}</p>
          <div className={styles.total} aria-live="polite">{formatCOP(plan.price)} <small>COP</small></div>
          <p className={styles.small}>por ciclo de cuatro semanas</p>
          <dl><div><dt>Plan</dt><dd>{plan.name}</dd></div><div><dt>Cada semana</dt><dd>{plan.weekly} {plan.weekly === 1 ? 'clase' : 'clases'}</dd></div><div><dt>Total del ciclo</dt><dd>{classes} clases</dd></div><div><dt>Cada clase</dt><dd>100 minutos</dd></div></dl>
          <button type="button" className={styles.primary} onClick={() => switchReview(true)}>Revisar mi selección <span aria-hidden="true">→</span></button>
          <p className={styles.small}>Sin renovación automática. Puedes cambiar tu selección antes de continuar.</p>
        </aside>
      </div> : <section className={styles.review} aria-labelledby="review-heading">
        <p className={styles.eyebrow}>PLAN ELEGIDO</p>
        <h2 id="review-heading" tabIndex={-1} ref={reviewRef}>Todo claro antes de seguir.</h2>
        <p>Revisa el curso que elegiste. Después encontrarás el reglamento y, al confirmar que lo leíste, se abrirá el formulario de inscripción.</p>
        <dl className={styles.reviewDetails}>
          <div><dt>Idioma y objetivo</dt><dd>{language.name} · {objectiveLabel(selection.objective)}</dd></div>
          <div><dt>Nivel declarado</dt><dd>{selection.level}</dd></div>
          <div><dt>Plan</dt><dd>{plan.name} · {plan.weekly} {plan.weekly === 1 ? 'clase' : 'clases'} por semana</dd></div>
          <div><dt>Duración</dt><dd>4 semanas · {classes} clases de 100 minutos · {sessions} sesiones de 50 minutos</dd></div>
          <div><dt>Precio del ciclo</dt><dd>{formatCOP(plan.price)} COP</dd></div>
        </dl>
        <p className={styles.small}>El horario se coordina después del pago. La preparación de exámenes no incluye la inscripción al examen oficial.</p>
        <CourseEnrollmentForm key={selectionPath(selection)} selection={selection} salesEnabled={salesEnabled} />
        <a className={styles.secondary} href={whatsappLink(selection)} target="_blank" rel="noopener noreferrer">Necesito orientación por WhatsApp <span aria-hidden="true">↗</span></a>
        <p className={styles.small}>Se abre el mensaje para que lo revises y lo envíes tú.</p>
        <div className={styles.actions}>
          <button type="button" onClick={() => switchReview(false)}>← Cambiar selección</button>
          <button type="button" onClick={() => copy('summary')}>Copiar resumen</button>
          <button type="button" onClick={() => copy('link')}>Copiar enlace</button>
        </div>
        <p role="status" className={styles.small}>{copyStatus}</p>
        {fallback && <label className={styles.fallback}>Texto para copiar<textarea readOnly value={fallback} onFocus={e => e.target.select()} rows={7} /></label>}
      </section>}
      <footer className={styles.footer}>Aprender un idioma, en serio.<span>WeLearn</span></footer>
    </div>
  </div>;
}
