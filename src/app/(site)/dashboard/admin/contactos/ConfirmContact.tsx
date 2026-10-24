'use client';

import { useActionState } from 'react';
import { confirmContact } from './actions';
import s from './contactos.module.css';

export default function ConfirmContact() {
  const [state, action, pending] = useActionState(confirmContact, { message: '' });
  return <form action={action} className={s.confirm}>
    <label htmlFor="confirm-ref">Confirmar un mensaje que recibiste en WhatsApp</label>
    <p>En la lista principal de WhatsApp, abre el chat y comprueba que la persona envió el mensaje con la referencia WL-. Pega solo ese código aquí, sin teléfono ni texto del chat. Un clic pendiente nunca se confirma por sí solo.</p>
    <div className={s.controls}>
      <input id="confirm-ref" name="reference" placeholder="WL-…" required maxLength={27} autoComplete="off" />
      <button name="operation" value="confirm" disabled={pending}>{pending ? 'Guardando…' : 'Sí, recibí el mensaje'}</button>
      <button name="operation" value="undo" className={s.secondary} disabled={pending}>Retirar confirmación</button>
    </div>
    <p role="status" aria-live="polite">{state.message}</p>
  </form>;
}
