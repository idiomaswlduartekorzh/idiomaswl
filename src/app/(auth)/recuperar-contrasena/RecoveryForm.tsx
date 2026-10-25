'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function RecoveryForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setError('El servicio no está disponible en este momento. Inténtalo más tarde.');
      setLoading(false);
      return;
    }

    const { error: requestError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/callback?next=/restablecer-contrasena`,
    });

    if (requestError) {
      const limited = /rate limit|too many/i.test(requestError.message);
      setError(limited
        ? 'Se han enviado demasiadas solicitudes. Espera unos minutos e inténtalo de nuevo.'
        : 'No pudimos enviar el enlace. Inténtalo de nuevo más tarde.');
    } else {
      // Use the same response whether or not an account exists for this address.
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <main className="auth-recovery-page">
      <section className="auth-recovery-card">
        <Link href="/login" className="auth-recovery-back">← Volver a iniciar sesión</Link>
        <h1>Recupera tu contraseña</h1>
        {sent ? (
          <p role="status">Si existe una cuenta con ese correo, recibirás un enlace para crear una contraseña nueva. Revisa también la carpeta de spam.</p>
        ) : (
          <>
            <p>Escribe el correo de tu cuenta de WeLearn. Te enviaremos un enlace para crear una contraseña nueva.</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="recovery-email">Correo electrónico</label>
              <input id="recovery-email" type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} required />
              {error && <p role="alert" className="auth-recovery-error">{error}</p>}
              <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar enlace'}</button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
