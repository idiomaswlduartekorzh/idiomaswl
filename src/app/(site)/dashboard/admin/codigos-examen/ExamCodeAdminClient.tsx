'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  EXAM_ACCESS_CODE_LABELS,
  EXAM_ACCESS_EXAM_LABELS,
  type ExamAccessCodeExam,
  type ExamAccessCodeKind,
} from '@/lib/exam-access-codes/config';
import type { ExamAccessCodeRow } from '@/lib/exam-access-codes/server';
import { generateExamCodeAction, revokeExamCodeAction } from './actions';
import styles from './exam-codes.module.css';

function formatDate(value: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });
}
export default function ExamCodeAdminClient({ initialCodes }: { initialCodes: ExamAccessCodeRow[] }) {
  const [codes, setCodes] = useState(initialCodes);
  const [kind, setKind] = useState<ExamAccessCodeKind>('single_use');
  const [examSlug, setExamSlug] = useState<ExamAccessCodeExam>('icfes');
  const [label, setLabel] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [message, setMessage] = useState('');
  const [pending, startTransition] = useTransition();

  function generateCode(event: React.FormEvent) {
    event.preventDefault();
    setMessage('');
    startTransition(async () => {
      const result = await generateExamCodeAction({ kind, examSlug, label });
      if (!result.ok || !result.code || !result.row) {
        setMessage(result.ok ? 'La respuesta llegó incompleta.' : result.error);
        return;
      }
      setGeneratedCode(result.code);
      setCodes(previous => [result.row!, ...previous]);
      setLabel('');
    });
  }

  function revokeCode(id: string) {
    if (!window.confirm('¿Revocar este código? Dejará de funcionar inmediatamente.')) return;
    setMessage('');
    startTransition(async () => {
      const result = await revokeExamCodeAction(id);
      if (!result.ok) {
        setMessage(result.error);
        return;
      }
      setCodes(previous => previous.filter(code => code.id !== id));
    });
  }

  async function copyGeneratedCode() {
    if (!generatedCode) return;
    await navigator.clipboard.writeText(generatedCode);
    setMessage('Código copiado.');
  }

  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>PANEL ADMIN · ACCESO SUPERVISADO</p>
            <h1>Códigos para resultados de examen</h1>
            <p>Genera accesos sin pago para una estudiante o para un grupo en una sesión de clase.</p>
          </div>
          <Link href="/dashboard/admin" className={styles.back}>← Volver al panel</Link>
        </header>

        <section className={styles.grid}>
          <form className={styles.creator} onSubmit={generateCode}>
            <div className={styles.step}><span>01</span><strong>Configura el acceso</strong></div>
            <label>Examen
              <select value={examSlug} onChange={event => setExamSlug(event.target.value as ExamAccessCodeExam)} disabled={pending}>
                {Object.entries(EXAM_ACCESS_EXAM_LABELS).map(([value, text]) => <option key={value} value={value}>{text}</option>)}
              </select>
            </label>
            <fieldset>
              <legend>Tipo de código</legend>
              <label className={styles.option}>
                <input type="radio" name="kind" value="single_use" checked={kind === 'single_use'} onChange={() => setKind('single_use')} />
                <span><strong>Un solo uso</strong><small>Se consume y elimina al abrir un resultado.</small></span>
              </label>
              <label className={styles.option}>
                <input type="radio" name="kind" value="classroom_5h" checked={kind === 'classroom_5h'} onChange={() => setKind('classroom_5h')} />
                <span><strong>Grupo · 5 horas</strong><small>El primer uso inicia la ventana; después expira y se elimina.</small></span>
              </label>
            </fieldset>
            <label>Nota interna <small>(opcional)</small>
              <input value={label} onChange={event => setLabel(event.target.value)} maxLength={120} placeholder="Ej. Aula Zhanna · sábado 9 a. m." disabled={pending} />
            </label>
            <button disabled={pending}>{pending ? 'Generando…' : 'Generar código seguro'}</button>
          </form>

          <aside className={styles.delivery} aria-live="polite">
            <div className={styles.step}><span>02</span><strong>Entrégalo una sola vez</strong></div>
            {generatedCode ? <>
              <p className={styles.code}>{generatedCode}</p>
              <button type="button" onClick={() => void copyGeneratedCode()}>Copiar código</button>
              <p>Este valor no se guarda en texto plano. Cópialo ahora; después el panel solo mostrará sus últimos cuatro caracteres.</p>
            </> : <p className={styles.empty}>El próximo código aparecerá aquí únicamente al momento de crearlo.</p>}
          </aside>
        </section>

        {message && <p className={styles.message} role="status">{message}</p>}

        <section className={styles.active}>
          <div className={styles.activeHeading}>
            <div><p className={styles.eyebrow}>CÓDIGOS VIGENTES</p><h2>Control de accesos</h2></div>
            <span>{codes.length} activos</span>
          </div>
          {codes.length === 0 ? <p className={styles.emptyList}>No hay códigos activos.</p> : (
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>Código</th><th>Examen</th><th>Tipo</th><th>Actividad</th><th>Creado</th><th /></tr></thead>
                <tbody>{codes.map(code => (
                  <tr key={code.id}>
                    <td><strong>••••-{code.code_hint}</strong>{code.label && <small>{code.label}</small>}</td>
                    <td>{EXAM_ACCESS_EXAM_LABELS[code.exam_slug]}</td>
                    <td>{EXAM_ACCESS_CODE_LABELS[code.kind]}</td>
                    <td>{code.kind === 'single_use'
                      ? 'Sin usar'
                      : code.activated_at
                        ? <><strong>{code.redemption_count} usos</strong><small>vence {formatDate(code.expires_at)}</small></>
                        : 'Esperando primer uso'}</td>
                    <td>{formatDate(code.created_at)}<small>{code.created_by_email}</small></td>
                    <td><button className={styles.revoke} type="button" onClick={() => revokeCode(code.id)} disabled={pending}>Revocar</button></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
