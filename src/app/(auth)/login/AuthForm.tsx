'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type Mode = 'login' | 'register';

// ── Palette ────────────────────────────────────────────────────────────────────
const A      = 'var(--accent)';
const ACTION = 'var(--accent-action)';
const DARK   = 'var(--ink-bg)';
const CARD   = 'var(--surface)';
const MUTED  = 'var(--muted)';
const BORDER = 'var(--line-soft)';

// ── Language flags shown on the left panel ────────────────────────────────────
const LANGS = [
  { flag: '🇰🇷', name: 'Coreano' },
  { flag: '🇬🇧', name: 'Inglés' },
  { flag: '🇫🇷', name: 'Francés' },
  { flag: '🇩🇪', name: 'Alemán' },
  { flag: '🇯🇵', name: 'Japonés' },
  { flag: '🇮🇹', name: 'Italiano' },
];

export default function AuthForm({ mode }: { mode: Mode }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');
  const router = useRouter();

  // ── Auth error normalisation ──────────────────────────────────────────────
  // We deliberately avoid echoing the raw Supabase error string to the UI.
  // Distinguishing "wrong email" from "wrong password" lets attackers enumerate
  // valid accounts, so both cases map to the same generic message.
  function normalizeLoginError(msg: string): string {
    const lower = msg.toLowerCase();
    // Rate-limited — surface this so the user understands why they're blocked
    if (lower.includes('too many') || lower.includes('rate limit')) {
      return 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.';
    }
    // All credential failures → same opaque message
    return 'Email o contraseña incorrectos. Verifica tus datos e inténtalo de nuevo.';
  }

  function normalizeRegisterError(msg: string): string {
    const lower = msg.toLowerCase();
    if (lower.includes('already registered') || lower.includes('already exists') || lower.includes('duplicate')) {
      return 'Ya existe una cuenta con este correo. ¿Quieres iniciar sesión?';
    }
    if (lower.includes('password') && (lower.includes('short') || lower.includes('characters'))) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }
    if (lower.includes('too many') || lower.includes('rate limit')) {
      return 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.';
    }
    // Generic fallback — don't expose raw server messages
    return 'No se pudo crear la cuenta. Inténtalo de nuevo.';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    const supabase = createClient();
    if (!supabase) { setError('Servicio no disponible en este momento.'); setLoading(false); return; }

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(normalizeLoginError(error.message)); setLoading(false); return; }
      router.push('/dashboard');
      router.refresh();
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) { setError(normalizeRegisterError(error.message)); setLoading(false); return; }
      setSuccess('¡Revisa tu correo para confirmar tu cuenta!');
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: DARK,
    }}>
      {/* ── Left panel ── */}
      <div style={{
        flex: '0 0 42%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '3rem 3rem 2.5rem',
        background: 'linear-gradient(155deg, #141c28 0%, var(--ink-bg) 58%, #101722 100%)',
        position: 'relative',
        overflow: 'hidden',
      }} className="auth-left-panel">

        {/* Decorative glow */}
        <div style={{
          position: 'absolute',
          top: -80, right: -80,
          width: 320, height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233,104,114,0.16) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 60, left: -60,
          width: 240, height: 240,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233,104,114,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <div>
          <div style={{ position: 'relative', width: 120, height: 42, marginBottom: '0.5rem' }}>
            <Image
              src="/images/welearn-logo.png"
              alt="Idiomas WeLearn"
              fill
              sizes="120px"
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
              priority
            />
          </div>
          <p style={{ fontSize: 12, color: A, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Idiomas WeLearn
          </p>
        </div>

        {/* Tagline */}
        <div>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.2,
            marginBottom: '1rem',
          }}>
            Aprende idiomas<br />
            <span style={{ color: A }}>de forma natural</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, maxWidth: 280 }}>
            Lecciones diseñadas por expertos, adaptadas a tu ritmo y nivel.
          </p>
        </div>

        {/* Language bubbles */}
        <div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.68)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
            Idiomas disponibles
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {LANGS.map(l => (
              <div key={l.name} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#ffffff0d',
                border: '1px solid #ffffff14',
                borderRadius: 100,
                padding: '6px 14px',
              }}>
                <span style={{ fontSize: 16 }}>{l.flag}</span>
                <span style={{ fontSize: 12, color: '#ffffffaa', fontWeight: 500 }}>{l.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.62)' }}>
          © 2026 Idiomas WeLearn
        </p>
      </div>

      {/* ── Right panel — form ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        background: 'var(--bg)',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 420,
        }}>
          {/* Card header */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              color: 'var(--ink)',
              marginBottom: '0.4rem',
            }}>
              {mode === 'login' ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}
            </h1>
            <p style={{ fontSize: 14, color: MUTED }}>
              {mode === 'login'
                ? 'Ingresa tus datos para acceder a tu panel.'
                : 'Únete y empieza a aprender hoy.'}
            </p>
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogle}
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              width: '100%',
              padding: '0.85rem',
              border: `1.5px solid ${BORDER}`,
              borderRadius: 12,
              background: CARD,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              color: 'var(--ink)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              transition: 'box-shadow 0.15s, border-color 0.15s',
              marginBottom: '1.25rem',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#4285F4';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 12px rgba(66,133,244,0.18)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = BORDER;
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.25rem',
          }}>
            <div style={{ flex: 1, height: 1, background: BORDER }} />
            <span style={{ fontSize: 12, color: MUTED, fontWeight: 500 }}>o con correo</span>
            <div style={{ flex: 1, height: 1, background: BORDER }} />
          </div>

          {/* Error / Success */}
          {error && (
            <div style={{
              background: '#fee2e2', color: '#dc2626',
              borderRadius: 10, padding: '0.65rem 0.9rem',
              fontSize: 13, marginBottom: '1rem',
              border: '1px solid #fecaca',
            }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{
              background: '#dcfce7', color: '#16a34a',
              borderRadius: 10, padding: '0.65rem 0.9rem',
              fontSize: 13, marginBottom: '1rem',
              border: '1px solid #bbf7d0',
            }}>
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mode === 'register' && (
              <Field label="Nombre completo">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Tu nombre"
                  required
                  style={inputStyle}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </Field>
            )}
            <Field label="Correo electrónico">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                style={inputStyle}
                onFocus={focusIn}
                onBlur={focusOut}
              />
            </Field>
            <Field label="Contraseña">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                style={inputStyle}
                onFocus={focusIn}
                onBlur={focusOut}
              />
            </Field>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.85rem',
                background: loading ? 'var(--muted)' : ACTION,
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '0.25rem',
                transition: 'background 0.15s, transform 0.1s',
                boxShadow: '0 4px 14px rgba(167,25,39,0.3)',
              }}
            >
              {loading ? 'Cargando...' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
            </button>
          </form>

          {/* Forgot password (login only) */}
          {mode === 'login' && (
            <p style={{ textAlign: 'right', marginTop: '-0.5rem' }}>
              <a
                href="https://wa.me/573005004253?text=Hola%2C%20olvidé%20mi%20contraseña%20de%20WeLearn.%20¿Me%20pueden%20ayudar%3F"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 12, color: MUTED, textDecoration: 'underline', textUnderlineOffset: 2 }}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </p>
          )}

          {/* Switch mode */}
          <p style={{ textAlign: 'center', fontSize: 13, color: MUTED, marginTop: '1.5rem' }}>
            {mode === 'login' ? (
              <>¿No tienes cuenta?{' '}
                <Link href="/registro" style={{ color: A, fontWeight: 700, textDecoration: 'none' }}>
                  Registrarse
                </Link>
              </>
            ) : (
              <>¿Ya tienes cuenta?{' '}
                <Link href="/login" style={{ color: A, fontWeight: 700, textDecoration: 'none' }}>
                  Iniciar sesión
                </Link>
              </>
            )}
          </p>
        </div>
      </div>

      {/* ── Responsive: hide left panel on mobile ── */}
      <style>{`
        @media (max-width: 768px) {
          .auth-left-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '0.7rem 0.9rem',
  border: '1.5px solid var(--line-soft)',
  borderRadius: 10,
  fontSize: 14,
  background: 'var(--surface)',
  color: 'var(--ink)',
  outline: 'none',
  transition: 'border-color 0.15s, box-shadow 0.15s',
  width: '100%',
  boxSizing: 'border-box',
};

function focusIn(e: React.FocusEvent<HTMLInputElement>) {
  e.currentTarget.style.borderColor = 'var(--accent)';
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(233,104,114,0.15)';
}
function focusOut(e: React.FocusEvent<HTMLInputElement>) {
  e.currentTarget.style.borderColor = 'var(--line-soft)';
  e.currentTarget.style.boxShadow = 'none';
}
