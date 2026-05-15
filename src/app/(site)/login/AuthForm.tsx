'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type Mode = 'login' | 'register';

export default function AuthForm({ mode }: { mode: Mode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    const supabase = createClient();

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }
      router.push('/dashboard');
      router.refresh();
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) { setError(error.message); setLoading(false); return; }
      setSuccess('¡Revisa tu correo para confirmar tu cuenta!');
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  return (
    <div className="auth-card">
      <div className="auth-card__logo">
        <Image src="/images/welearn-logo.svg" alt="WeLearn" width={140} height={50} priority />
      </div>

      <h1 className="auth-card__title">
        {mode === 'login' ? 'Bienvenido de vuelta' : 'Crear cuenta'}
      </h1>
      <p className="auth-card__sub">
        {mode === 'login'
          ? 'Inicia sesión para acceder a tu panel de aprendizaje.'
          : 'Únete a Idiomas WeLearn y empieza a aprender hoy.'}
      </p>

      <button onClick={handleGoogle} className="auth-google-btn" type="button">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continuar con Google
      </button>

      <div className="auth-divider"><span>o con correo</span></div>

      {error && <div className="auth-error">{error}</div>}
      {success && <div className="auth-success">{success}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        {mode === 'register' && (
          <div className="auth-field">
            <label className="auth-label">Nombre completo</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="auth-input"
              placeholder="Tu nombre"
              required
            />
          </div>
        )}
        <div className="auth-field">
          <label className="auth-label">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="auth-input"
            placeholder="tu@correo.com"
            required
          />
        </div>
        <div className="auth-field">
          <label className="auth-label">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="auth-input"
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>
        <button type="submit" disabled={loading} className="btn auth-submit-btn">
          {loading ? 'Cargando...' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
        </button>
      </form>

      <p className="auth-switch">
        {mode === 'login' ? (
          <>¿No tienes cuenta? <Link href="/registro">Registrarse</Link></>
        ) : (
          <>¿Ya tienes cuenta? <Link href="/login">Iniciar sesión</Link></>
        )}
      </p>
    </div>
  );
}
