'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { safeCourseReturnPath } from '@/lib/course-pricing/payment';
import { formatCOP, PLANS, type CoursePlanId } from '@/lib/course-pricing/catalog';
import {
  STUDENT_PATHS,
  WELEARN_LANGUAGE_OPTIONS,
  XPRESS_EXAM_OPTIONS,
  registrationCompletionPath,
  guidedLanguagePurchasePath,
  registrationIntentMetadata,
  registrationPurchasePath,
  xpressClassPurchasePath,
  type RegistrationIntent,
  type StudentPath,
  type WelearnLanguage,
  type XpressExamSlug,
} from '@/lib/student-onboarding/catalog';
import { createClient } from '@/lib/supabase/client';
import { XPRESS_OFFERS, type XpressOfferId } from '@/lib/xpress-commerce/catalog';

type Mode = 'login' | 'register';
type OAuthProvider = 'google' | 'apple';
type ExamPreparationMode = 'self' | 'teacher';

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
  const [studentPath, setStudentPath] = useState<StudentPath | null>(null);
  const [language, setLanguage] = useState<WelearnLanguage | ''>('');
  const [coursePlan, setCoursePlan] = useState<CoursePlanId | ''>('');
  const [exam, setExam] = useState<XpressExamSlug | ''>('');
  const [examPlan, setExamPlan] = useState<XpressOfferId | ''>('');
  const [examPreparationMode, setExamPreparationMode] = useState<ExamPreparationMode | ''>('');
  const [registrationStep, setRegistrationStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');
  const router = useRouter();

  const registrationIntent = (): RegistrationIntent | null => {
    if (studentPath === 'welearn' && language && coursePlan) return { path: 'welearn', language, plan: coursePlan };
    if (studentPath === 'exam' && language && exam && examPreparationMode === 'self' && examPlan) {
      return { path: 'exam', language, exam, plan: examPlan };
    }
    return null;
  };

  const returnPath = () => safeCourseReturnPath(new URLSearchParams(window.location.search).get('next'));
  const registrationReady = mode === 'login' || registrationIntent() !== null;

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
      router.push(safeCourseReturnPath(new URLSearchParams(window.location.search).get('next')));
      router.refresh();
    } else {
      const intent = registrationIntent();
      if (!intent) {
        setError('Elige qué quieres hacer y completa esa selección.');
        setLoading(false);
        return;
      }
      const requestedReturn = new URLSearchParams(window.location.search).get('next');
      const completionPath = registrationCompletionPath(intent, requestedReturn ? safeCourseReturnPath(requestedReturn) : registrationPurchasePath(intent));
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name, ...registrationIntentMetadata(intent) },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(completionPath)}`,
        },
      });
      if (error) { setError(normalizeRegisterError(error.message)); setLoading(false); return; }
      if (data.session) {
        router.push(completionPath);
        router.refresh();
        return;
      }
      setSuccess('¡Revisa tu correo para confirmar tu cuenta!');
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: OAuthProvider) => {
    setError('');
    const supabase = createClient();
    if (!supabase) {
      setError('Servicio no disponible en este momento.');
      return;
    }
    const intent = mode === 'register' ? registrationIntent() : null;
    if (mode === 'register' && !intent) {
      setError('Elige qué quieres hacer y completa esa selección.');
      return;
    }
    const requestedReturn = new URLSearchParams(window.location.search).get('next');
    const next = intent
      ? registrationCompletionPath(intent, requestedReturn ? safeCourseReturnPath(requestedReturn) : registrationPurchasePath(intent))
      : returnPath();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    if (oauthError) {
      setError(provider === 'apple'
        ? 'Apple todavía no está disponible. Puedes continuar con Google o correo.'
        : 'No pudimos abrir Google. Inténtalo de nuevo o usa tu correo.');
    }
  };

  const selectStudentPath = (path: StudentPath) => {
    setStudentPath(path);
    setError('');
    if (path === 'welearn') {
      setExam('');
      setExamPlan('');
      setExamPreparationMode('');
    } else {
      setCoursePlan('');
    }
  };

  const continueRegistration = () => {
    if (!registrationIntent()) {
      setError('Completa tu selección para continuar.');
      return;
    }
    setError('');
    setRegistrationStep(3);
  };

  const continueGuidedCourse = () => {
    if (!language || !coursePlan) {
      setError('Selecciona el plan de clases para continuar.');
      return;
    }
    setError('');
    if (studentPath === 'exam' && exam) {
      router.push(xpressClassPurchasePath(exam, { plan: coursePlan, startAtRules: true }));
      return;
    }
    if (studentPath === 'welearn') router.push(guidedLanguagePurchasePath(language, coursePlan));
  };

  const continueFromLanguage = () => {
    if (!language) {
      setError('Selecciona el idioma que quieres estudiar.');
      return;
    }
    setError('');
    setRegistrationStep(2);
  };

  const examsForLanguage = XPRESS_EXAM_OPTIONS.filter((option) => option.language === language);

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
              {mode === 'login'
                ? 'Bienvenido de vuelta'
                : registrationStep === 1 ? '¿Qué idioma quieres estudiar?'
                  : registrationStep === 2 ? '¿Cuál es tu objetivo?'
                    : 'Crea tu cuenta'}
            </h1>
            <p style={{ fontSize: 14, color: MUTED }}>
              {mode === 'login'
                ? 'Ingresa tus datos para acceder a tu panel.'
                : registrationStep === 1
                  ? 'Elige primero el idioma. Tu cuenta se crea al final.'
                  : registrationStep === 2
                    ? 'Elige tu objetivo y cómo quieres aprender.'
                    : 'Tu elección está lista. Ahora guarda tu acceso y continúa al pago.'}
            </p>
            {mode === 'register' && (
              <div aria-label={`Paso ${registrationStep} de 3`} style={{ display: 'flex', gap: 6, marginTop: '1rem' }}>
                {[1, 2, 3].map((step) => (
                  <span key={step} style={{ flex: 1, height: 4, borderRadius: 99, background: step <= registrationStep ? A : BORDER }} />
                ))}
              </div>
            )}
          </div>

          {mode === 'register' && registrationStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Field label="Idioma">
                <select
                  aria-label="Idioma"
                  value={language}
                  onChange={(event) => {
                    setLanguage(event.target.value as WelearnLanguage);
                    setStudentPath(null); setCoursePlan(''); setExam(''); setExamPlan(''); setExamPreparationMode(''); setError('');
                  }}
                  style={inputStyle}
                >
                  <option value="" disabled>Selecciona un idioma</option>
                  {WELEARN_LANGUAGE_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                </select>
              </Field>

              {error && <InlineMessage kind="error">{error}</InlineMessage>}
              <button
                type="button"
                onClick={continueFromLanguage}
                disabled={!language}
                style={primaryButtonStyle(!language)}
              >
                Continuar
              </button>
              <p style={{ margin: 0, textAlign: 'center', color: MUTED, fontSize: 12 }}>
                Todavía no se crea ninguna cuenta ni se realiza ningún cobro.
              </p>
            </div>
          )}

          {mode === 'register' && registrationStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '0.7rem 0.85rem', border: `1px solid ${BORDER}`, borderRadius: 12, background: CARD, fontSize: 13, color: 'var(--ink)' }}>
                <strong>{WELEARN_LANGUAGE_OPTIONS.find((option) => option.id === language)?.label}</strong>
                <button type="button" onClick={() => { setRegistrationStep(1); setError(''); }} style={{ float: 'right', border: 0, background: 'transparent', color: A, fontWeight: 700, cursor: 'pointer' }}>Cambiar</button>
              </div>
              <Field label="Quiero">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                  {STUDENT_PATHS.map((option) => {
                    const selected = option.id === studentPath;
                    return <button key={option.id} type="button" aria-pressed={selected} onClick={() => selectStudentPath(option.id)} style={{
                      padding: '0.85rem', textAlign: 'left', borderRadius: 12,
                      border: `1.5px solid ${selected ? A : BORDER}`,
                      background: selected ? 'color-mix(in srgb, var(--accent) 10%, var(--surface))' : CARD,
                      color: 'var(--ink)', cursor: 'pointer',
                    }}>
                      <strong style={{ display: 'block', fontSize: 13 }}>{option.label}</strong>
                      <span style={{ display: 'block', marginTop: 4, fontSize: 11, lineHeight: 1.4, color: MUTED }}>{option.description}</span>
                    </button>;
                  })}
                </div>
              </Field>

              {studentPath === 'welearn' && <Field label="Elige tu plan de clases">
                <div style={{ display: 'grid', gap: '0.55rem' }}>
                  {PLANS.map((plan) => <PlanChoice
                    key={plan.id}
                    selected={coursePlan === plan.id}
                    label={`${plan.name} · ${formatCOP(plan.price)} COP`}
                    description={`${plan.weekly} ${plan.weekly === 1 ? 'clase' : 'clases'} por semana durante 4 semanas. ${plan.description}`}
                    onSelect={() => { setCoursePlan(plan.id); setError(''); }}
                  />)}
                </div>
              </Field>}

              {studentPath === 'exam' && <>
                <Field label="Examen">
                  <select aria-label="Examen" value={exam} onChange={(event) => {
                    setExam(event.target.value as XpressExamSlug); setExamPlan(''); setExamPreparationMode(''); setError('');
                  }} style={inputStyle}>
                    <option value="" disabled>Selecciona un examen de {WELEARN_LANGUAGE_OPTIONS.find((option) => option.id === language)?.label}</option>
                    {examsForLanguage.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                  </select>
                  {examsForLanguage.length === 0 && <p style={{ margin: '0.5rem 0 0', fontSize: 12, color: MUTED }}>Todavía no hay simulacros disponibles para este idioma. Puedes elegir Idioma general.</p>}
                </Field>

                {exam && <Field label="¿Cómo quieres prepararte?">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                    <JourneyChoice
                      selected={examPreparationMode === 'self'}
                      eyebrow="A TU RITMO"
                      label="Autodidacta"
                      description="Simulacros, resultados y reportes en Xpress."
                      onSelect={() => { setExamPreparationMode('self'); setCoursePlan(''); setError(''); }}
                    />
                    <JourneyChoice
                      selected={examPreparationMode === 'teacher'}
                      eyebrow="CLASES EN VIVO"
                      label="Con profesor"
                      description="Preparación guiada con un docente de WeLearn."
                      onSelect={() => { setExamPreparationMode('teacher'); setExamPlan(''); setCoursePlan(''); setError(''); }}
                    />
                  </div>
                </Field>}

                {examPreparationMode === 'self' && <Field label="Elige tu acceso Xpress">
                  <div style={{ display: 'grid', gap: '0.55rem' }}>
                    {XPRESS_OFFERS.map((offer) => <PlanChoice
                      key={offer.id}
                      selected={examPlan === offer.id}
                      label={`${offer.name} · ${formatCOP(offer.amountInCents / 100)} COP`}
                      description={offer.id === 'exam-single'
                        ? 'Pago único: un simulacro con corrección automática y reporte detallado.'
                        : offer.id === 'exam-auto'
                          ? 'Suscripción renovable: simulacros ilimitados y corrección automática por periodos de 30 días.'
                          : 'Suscripción renovable con simulacros ilimitados y feedback personalizado con asistencia de IA.'}
                      onSelect={() => { setExamPlan(offer.id); setError(''); }}
                    />)}
                  </div>
                </Field>}

                {examPreparationMode === 'teacher' && exam && <Field label="Elige tu plan de clases">
                  <div style={{ display: 'grid', gap: '0.55rem' }}>
                    {PLANS.map((plan) => <PlanChoice
                      key={plan.id}
                      selected={coursePlan === plan.id}
                      label={`${plan.name} · ${formatCOP(plan.price)} COP`}
                      description={`${plan.weekly} ${plan.weekly === 1 ? 'clase' : 'clases'} por semana durante 4 semanas. ${plan.description}`}
                      onSelect={() => { setCoursePlan(plan.id); setError(''); }}
                    />)}
                  </div>
                </Field>}
              </>}

              {error && <InlineMessage kind="error">{error}</InlineMessage>}
              {(studentPath === 'welearn' || (studentPath === 'exam' && examPreparationMode === 'teacher')) && <>
                <button type="button" onClick={continueGuidedCourse} disabled={!coursePlan || (studentPath === 'exam' && !exam)} style={primaryButtonStyle(!coursePlan || (studentPath === 'exam' && !exam))}>Continuar al reglamento</button>
                <p style={{ margin: 0, textAlign: 'center', color: MUTED, fontSize: 12 }}>Leerás y aceptarás el reglamento antes de ingresar tus datos y pagar. La cuenta se crea cuando Wompi confirme el pago.</p>
              </>}
              {studentPath === 'exam' && examPreparationMode === 'self' && <>
                <button type="button" onClick={continueRegistration} disabled={!registrationReady} style={primaryButtonStyle(!registrationReady)}>Continuar al registro</button>
                <p style={{ margin: 0, textAlign: 'center', color: MUTED, fontSize: 12 }}>Crearás tu cuenta antes de pasar al pago seguro con Wompi.</p>
              </>}
            </div>
          )}

          {(mode === 'login' || registrationStep === 3) && <>
          <button
            onClick={() => handleOAuth('google')}
            type="button"
            disabled={!registrationReady}
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
              cursor: registrationReady ? 'pointer' : 'not-allowed',
              opacity: registrationReady ? 1 : 0.55,
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

          {process.env.NEXT_PUBLIC_APPLE_AUTH_ENABLED === 'true' && (
            <button
              onClick={() => handleOAuth('apple')}
              type="button"
              disabled={!registrationReady}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                width: '100%', padding: '0.85rem', border: '1.5px solid #111827', borderRadius: 12,
                background: '#111827', color: '#fff', fontSize: 14, fontWeight: 650,
                cursor: registrationReady ? 'pointer' : 'not-allowed', opacity: registrationReady ? 1 : 0.55,
                marginTop: '-0.6rem', marginBottom: '1.25rem',
              }}
            >
              <span aria-hidden="true" style={{ fontSize: 20, lineHeight: 1 }}></span>
              Continuar con Apple
            </button>
          )}

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
          </>}

          {/* Error / Success */}
          {error && !(mode === 'register' && registrationStep < 3) && (
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
          {(mode === 'login' || registrationStep === 3) && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mode === 'register' && (
              <>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
                  padding: '0.7rem 0.85rem', border: `1px solid ${BORDER}`, borderRadius: 12, background: CARD,
                }}>
                  <span style={{ color: 'var(--ink)', fontSize: 13, fontWeight: 650 }}>
                    {studentPath === 'welearn'
                      ? `${WELEARN_LANGUAGE_OPTIONS.find((option) => option.id === language)?.label ?? ''} · ${PLANS.find((option) => option.id === coursePlan)?.name ?? ''} · ${formatCOP(PLANS.find((option) => option.id === coursePlan)?.price ?? 0)}`
                      : `${XPRESS_EXAM_OPTIONS.find((option) => option.id === exam)?.label ?? 'Examen'} · ${formatCOP((XPRESS_OFFERS.find((option) => option.id === examPlan)?.amountInCents ?? 0) / 100)}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => { setRegistrationStep(2); setError(''); }}
                    style={{ border: 0, background: 'transparent', padding: 0, color: A, fontWeight: 700, cursor: 'pointer', fontSize: 12 }}
                  >
                    Cambiar
                  </button>
                </div>
                <Field label="Nombre completo">
                  <input
                    aria-label="Nombre completo"
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
              </>
            )}
            <Field label="Correo electrónico">
              <input
                aria-label="Correo electrónico"
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
                aria-label="Contraseña"
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
              disabled={loading || !registrationReady}
              style={{
                width: '100%',
                padding: '0.85rem',
                background: loading || !registrationReady ? 'var(--muted)' : ACTION,
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                cursor: loading || !registrationReady ? 'not-allowed' : 'pointer',
                marginTop: '0.25rem',
                transition: 'background 0.15s, transform 0.1s',
                boxShadow: '0 4px 14px rgba(167,25,39,0.3)',
              }}
            >
              {loading ? 'Cargando...' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
            </button>
          </form>
          )}

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
                <Link href="/registro" onClick={e => { e.preventDefault(); router.push('/registro?next=' + encodeURIComponent(safeCourseReturnPath(new URLSearchParams(window.location.search).get('next')))); }} style={{ color: A, fontWeight: 700, textDecoration: 'none' }}>
                  Registrarse
                </Link>
              </>
            ) : (
              <>¿Ya tienes cuenta?{' '}
                <Link href="/login" onClick={e => { e.preventDefault(); router.push('/login?next=' + encodeURIComponent(safeCourseReturnPath(new URLSearchParams(window.location.search).get('next')))); }} style={{ color: A, fontWeight: 700, textDecoration: 'none' }}>
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

function InlineMessage({ kind, children }: { kind: 'error'; children: React.ReactNode }) {
  return (
    <div role="alert" style={{
      background: kind === 'error' ? '#fee2e2' : '#dcfce7',
      color: kind === 'error' ? '#dc2626' : '#16a34a',
      borderRadius: 10,
      padding: '0.65rem 0.9rem',
      fontSize: 13,
      border: `1px solid ${kind === 'error' ? '#fecaca' : '#bbf7d0'}`,
    }}>
      {children}
    </div>
  );
}

function PlanChoice({ selected, label, description, onSelect }: {
  selected: boolean;
  label: string;
  description: string;
  onSelect: () => void;
}) {
  return (
    <button type="button" aria-pressed={selected} onClick={onSelect} style={{
      width: '100%', padding: '0.75rem 0.85rem', textAlign: 'left', borderRadius: 12,
      border: `1.5px solid ${selected ? A : BORDER}`,
      background: selected ? 'color-mix(in srgb, var(--accent) 10%, var(--surface))' : CARD,
      color: 'var(--ink)', cursor: 'pointer',
    }}>
      <strong style={{ display: 'block', fontSize: 13 }}>{label}</strong>
      <span style={{ display: 'block', marginTop: 4, fontSize: 11, lineHeight: 1.4, color: MUTED }}>{description}</span>
    </button>
  );
}

function JourneyChoice({ selected, eyebrow, label, description, onSelect }: {
  selected: boolean;
  eyebrow: string;
  label: string;
  description: string;
  onSelect: () => void;
}) {
  return (
    <button type="button" aria-pressed={selected} onClick={onSelect} style={{
      minHeight: 118, padding: '0.9rem', textAlign: 'left', borderRadius: 16,
      border: `1.5px solid ${selected ? A : BORDER}`,
      background: selected
        ? 'linear-gradient(145deg, color-mix(in srgb, var(--accent) 14%, var(--surface)), var(--surface))'
        : CARD,
      color: 'var(--ink)', cursor: 'pointer',
      boxShadow: selected ? '0 10px 24px rgba(167,25,39,0.10)' : '0 3px 12px rgba(18,35,79,0.04)',
    }}>
      <span style={{ display: 'block', marginBottom: 8, color: selected ? A : MUTED, fontSize: 10, fontWeight: 800, letterSpacing: '0.08em' }}>{eyebrow}</span>
      <strong style={{ display: 'block', fontSize: 14 }}>{label}</strong>
      <span style={{ display: 'block', marginTop: 5, fontSize: 11, lineHeight: 1.45, color: MUTED }}>{description}</span>
    </button>
  );
}

function primaryButtonStyle(disabled: boolean): React.CSSProperties {
  return {
    width: '100%',
    padding: '0.85rem',
    background: disabled ? 'var(--muted)' : ACTION,
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 700,
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxShadow: disabled ? 'none' : '0 4px 14px rgba(167,25,39,0.3)',
  };
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
