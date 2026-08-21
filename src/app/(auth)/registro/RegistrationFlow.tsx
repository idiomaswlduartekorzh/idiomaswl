'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  DEFAULT_REGISTRATION_SELECTION,
  PLATFORM_PRODUCT_IDS,
  REGISTRATION_PRODUCTS,
  STUDENT_PRODUCT_IDS,
  type RegistrationAccountType,
  type RegistrationProductId,
} from '@/lib/registration/catalog';
import styles from './registration.module.css';

function formatCop(amountCop: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amountCop);
}

function registerError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('already registered') || lower.includes('already exists') || lower.includes('duplicate')) {
    return 'Ya existe una cuenta con este correo. Inicia sesión para continuar.';
  }
  if (lower.includes('password')) return 'La contraseña debe tener al menos 8 caracteres.';
  if (lower.includes('too many') || lower.includes('rate limit')) {
    return 'Hay demasiados intentos. Espera unos minutos y vuelve a intentarlo.';
  }
  return 'No se pudo crear la cuenta. Verifica tus datos y vuelve a intentarlo.';
}

export default function RegistrationFlow() {
  const [accountType, setAccountType] = useState<RegistrationAccountType>(
    DEFAULT_REGISTRATION_SELECTION.accountType,
  );
  const [productId, setProductId] = useState<RegistrationProductId>(
    DEFAULT_REGISTRATION_SELECTION.productId,
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const productIds = accountType === 'platform' ? PLATFORM_PRODUCT_IDS : STUDENT_PRODUCT_IDS;
  const selectedProduct = REGISTRATION_PRODUCTS[productId];
  const visibleProduct = selectedProduct.accountType === accountType
    ? selectedProduct
    : REGISTRATION_PRODUCTS[productIds[0]];

  const weeklyRhythm = visibleProduct.accountType === 'platform'
    ? 'A tu ritmo · todos los días'
    : `${visibleProduct.classesPerWeek} ${visibleProduct.classesPerWeek === 1 ? 'clase' : 'clases'} por semana`;

  function chooseAccount(nextAccountType: RegistrationAccountType) {
    setAccountType(nextAccountType);
    setProductId(nextAccountType === 'platform' ? PLATFORM_PRODUCT_IDS[0] : STUDENT_PRODUCT_IDS[0]);
    setError('');
  }

  async function createAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (name.trim().length < 2) {
      setError('Escribe tu nombre para crear la cuenta.');
      return;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setError('El registro no está disponible en este momento.');
      return;
    }

    setLoading(true);
    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard/planes`,
          data: {
            full_name: name.trim(),
            account_type: accountType,
            intended_product_id: productId,
          },
        },
      });
      if (signupError) throw signupError;
      if (data.session) {
        window.location.assign('/dashboard/planes');
        return;
      }
      setSuccess('Cuenta creada. Revisa tu correo y confirma el enlace para continuar con tu plan.');
    } catch (caught) {
      setError(registerError(caught instanceof Error ? caught.message : 'unknown'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand} aria-label="Volver a Idiomas WeLearn">
          <Image src="/images/welearn-logo.png" alt="Idiomas WeLearn" width={122} height={44} priority />
        </Link>
        <p>¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link></p>
      </header>

      <div className={styles.shell}>
        <section className={styles.choice} aria-labelledby="registration-title">
          <p className={styles.kicker}>Tu cuenta, tu ritmo</p>
          <h1 id="registration-title">¿Cómo quieres aprender?</h1>
          <p className={styles.intro}>Elige una ruta ahora. Podrás cambiarla después desde tu panel.</p>

          <div className={styles.routeSwitch} role="group" aria-label="Tipo de cuenta">
            <button
              type="button"
              className={accountType === 'platform' ? styles.routeActive : styles.route}
              onClick={() => chooseAccount('platform')}
              aria-pressed={accountType === 'platform'}
            >
              <span className={styles.routeMark}>A</span>
              <span><strong>Aprender por mi cuenta</strong><small>Plataforma ilimitada y práctica autónoma</small></span>
            </button>
            <button
              type="button"
              className={accountType === 'student' ? styles.routeActive : styles.route}
              onClick={() => chooseAccount('student')}
              aria-pressed={accountType === 'student'}
            >
              <span className={styles.routeMark}>B</span>
              <span><strong>Estudiar con profesor</strong><small>Curso de inglés y horario acompañado</small></span>
            </button>
          </div>

          <div className={styles.planHeader}>
            <div>
              <p>{accountType === 'platform' ? 'Acceso digital' : 'Paquetes de inglés'}</p>
              <h2>{accountType === 'platform' ? 'Una plataforma, sin límites' : 'Escoge la intensidad del mes'}</h2>
            </div>
            <span>{accountType === 'platform' ? '30 días' : '4 semanas'}</span>
          </div>

          <div className={accountType === 'platform' ? styles.platformPlans : styles.studentPlans}>
            {productIds.map((id) => {
              const product = REGISTRATION_PRODUCTS[id];
              const selected = productId === id;
              return (
                <button
                  type="button"
                  key={id}
                  className={selected ? styles.planActive : styles.plan}
                  onClick={() => setProductId(id)}
                  aria-pressed={selected}
                >
                  <span className={styles.planCopy}>
                    <small>{product.eyebrow}</small>
                    <strong>{product.label}</strong>
                    <span>{product.description}</span>
                  </span>
                  <span className={styles.planPrice}>
                    <strong>{formatCop(product.amountCop)}</strong>
                    <small>{product.billingLabel}</small>
                    {product.provisional && <em>Precio piloto</em>}
                  </span>
                </button>
              );
            })}
          </div>

          <p className={styles.priceNote}>
            Los exámenes pueden seguir realizándose gratis. Este registro deja preparada la compra; ningún cobro se hace al crear la cuenta.
          </p>
        </section>

        <aside className={styles.signup} aria-labelledby="signup-title">
          <div className={styles.summary}>
            <span className={styles.summaryLabel}>Tu selección</span>
            <strong>{visibleProduct.label}</strong>
            <span>{weeklyRhythm}</span>
            <b>{formatCop(visibleProduct.amountCop)}</b>
          </div>

          <div className={styles.formHeading}>
            <span>Paso 2 de 2</span>
            <h2 id="signup-title">Crea tu acceso</h2>
            <p>Primero confirmas tu correo. El pago se abre después, desde tu panel.</p>
          </div>

          <form onSubmit={createAccount} className={styles.form}>
            <label>
              Nombre
              <input name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required />
            </label>
            <label>
              Correo
              <input name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
            <label>
              Contraseña
              <input name="password" type="password" autoComplete="new-password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required />
              <small>Mínimo 8 caracteres.</small>
            </label>

            <button type="submit" className={styles.submit} disabled={loading || Boolean(success)}>
              {loading ? 'Creando tu cuenta…' : success ? 'Revisa tu correo' : 'Crear cuenta y continuar'}
            </button>
            <p className={styles.noCharge}>No se cobrará nada en este paso.</p>
            {error && <p className={styles.error} role="alert">{error}</p>}
            {success && <p className={styles.success} role="status">{success}</p>}
          </form>
        </aside>
      </div>
    </main>
  );
}
