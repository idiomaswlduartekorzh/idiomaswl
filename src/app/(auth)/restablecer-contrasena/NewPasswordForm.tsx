'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function NewPasswordForm() {
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setChecking(false);
      return;
    }
    let active = true;
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (active) {
        setReady(Boolean(user));
        setChecking(false);
      }
    }).catch(() => {
      if (active) setChecking(false);
    });
    return () => { active = false; };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (password !== confirmation) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setLoading(true);
    const supabase = createClient();
    if (!supabase) {
      setError('El servicio no está disponible en este momento.');
      setLoading(false);
      return;
    }
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError('No pudimos guardar la contraseña. Solicita un enlace nuevo e inténtalo de nuevo.');
    } else {
      await supabase.auth.signOut();
      setSaved(true);
      setPassword('');
      setConfirmation('');
    }
    setLoading(false);
  }

  return (
    <main className="auth-recovery-page">
      <section className="auth-recovery-card">
        <h1>Nueva contraseña</h1>
        {checking ? <p>Verificando tu enlace...</p> : saved ? (
          <>
            <p role="status">Tu contraseña se actualizó. Ya puedes iniciar sesión.</p>
            <Link href="/login" className="auth-recovery-back">Ir a iniciar sesión</Link>
          </>
        ) : !ready ? (
          <>
            <p>El enlace no es válido o venció. Solicita uno nuevo para continuar.</p>
            <Link href="/recuperar-contrasena" className="auth-recovery-back">Solicitar otro enlace</Link>
          </>
        ) : (
          <>
            <p>Elige una contraseña nueva de al menos 8 caracteres.</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="new-password">Nueva contraseña</label>
              <input id="new-password" type="password" autoComplete="new-password" minLength={8} value={password} onChange={event => setPassword(event.target.value)} required />
              <label htmlFor="confirm-password">Confirma la contraseña</label>
              <input id="confirm-password" type="password" autoComplete="new-password" minLength={8} value={confirmation} onChange={event => setConfirmation(event.target.value)} required />
              {error && <p role="alert" className="auth-recovery-error">{error}</p>}
              <button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Guardar contraseña'}</button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
