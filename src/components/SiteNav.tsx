'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';

const NAV_LINKS = [
  { label: 'Home',      href: '/home' },
  { label: 'Inglés',    href: '/clases-de-ingles' },
  { label: 'Coreano',   href: '/clases-de-coreano' },
  { label: 'Idiomas',   href: '/clases-de-idiomas' },
  { label: 'Exámenes',  href: '/examenes' },
  // 'Práctica' is rendered as a dropdown — see PracticaDropdown below
  { label: 'Blog',      href: '/blog' },
  { label: 'Precios',   href: '/precios' },
];

const PRACTICA_ITEMS = [
  {
    emoji: '🔄',
    label: 'Ciclo de aprendizaje',
    desc: 'Lee, escucha, comprende y graba en coreano',
    href: '/practica',
  },
  {
    emoji: '🧩',
    label: 'Palabras compuestas',
    desc: '합성어 — combina raíces y multiplica tu vocabulario',
    href: '/aprende-coreano/palabras-compuestas',
    badge: 'NUEVO',
  },
  {
    emoji: '📖',
    label: 'Lector de Hangul',
    desc: 'Descompone cualquier sílaba coreana en tiempo real',
    href: '/practica',
  },
  {
    emoji: '🧠',
    label: 'Quiz de Hangul',
    desc: 'Pon a prueba batchim, jamo y pronunciación',
    href: '/practica',
  },
];

function PracticaDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const isActive = pathname.startsWith('/practica') || pathname.startsWith('/aprende-coreano');

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <button
        className={`wl-site-nav__link${isActive ? ' is-active' : ''}`}
        style={{
          background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', gap: '0.22rem', padding: 0,
        }}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Práctica
        <span style={{
          fontSize: '0.55rem', opacity: 0.6,
          transition: 'transform 0.15s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          display: 'inline-block',
        }}>▼</span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 10px)', left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--bg)', border: '1.5px solid var(--line-soft)',
          borderRadius: 16, boxShadow: '0 12px 40px rgba(0,0,0,0.14)',
          zIndex: 200, minWidth: 310, overflow: 'hidden',
          animation: 'fadeInDown 0.15s ease',
        }}>
          {/* Header */}
          <div style={{
            padding: '0.85rem 1.15rem', borderBottom: '1px solid var(--line-soft)',
            background: 'rgba(5,150,105,0.05)',
          }}>
            <div style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.09em', color: '#059669', fontWeight: 800 }}>
              🇰🇷 Coreano — Práctica gratuita
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
              Sin registro · Empieza ahora mismo
            </div>
          </div>

          {/* Items */}
          {PRACTICA_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                padding: '0.8rem 1.15rem', textDecoration: 'none',
                borderBottom: '1px solid var(--line-soft)',
                transition: 'background 0.12s',
              }}
              onClick={() => setOpen(false)}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(5,150,105,0.05)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: '1.15rem', marginTop: '0.05rem', flexShrink: 0 }}>{item.emoji}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.12rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {item.label}
                  {item.badge && (
                    <span style={{
                      fontSize: '0.58rem', fontWeight: 900, background: '#e11d48', color: '#fff',
                      padding: '1px 5px', borderRadius: 4, fontFamily: 'var(--mono)', letterSpacing: '0.04em',
                    }}>{item.badge}</span>
                  )}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--muted)', lineHeight: 1.4 }}>{item.desc}</div>
              </div>
            </Link>
          ))}

          {/* Footer CTA */}
          <Link
            href="/practica"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.7rem 1.15rem', textDecoration: 'none',
              background: 'rgba(83,74,183,0.04)',
              transition: 'background 0.12s',
            }}
            onClick={() => setOpen(false)}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(83,74,183,0.09)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(83,74,183,0.04)')}
          >
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#534AB7' }}>
              Ver todo en Práctica
            </span>
            <span style={{ color: '#534AB7', fontWeight: 700 }}>→</span>
          </Link>
        </div>
      )}
    </div>
  );
}

function UserMenu({ user, onSignOut }: { user: User; onSignOut: () => void }) {
  const [open, setOpen] = useState(false);
  const initial = (user.email ?? 'U')[0].toUpperCase();

  return (
    <div className="wl-user-menu" onBlur={() => setTimeout(() => setOpen(false), 150)}>
      <button
        className="wl-user-menu__trigger"
        onClick={() => setOpen(o => !o)}
        aria-label="Menú de usuario"
      >
        <span className="wl-user-menu__avatar">{initial}</span>
        <span className="wl-user-menu__email">{user.email?.split('@')[0]}</span>
        <span className="wl-user-menu__chevron">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="wl-user-menu__dropdown">
          <div className="wl-user-menu__info">
            <span className="wl-user-menu__name">{user.email}</span>
          </div>
          <Link href="/dashboard" className="wl-user-menu__item" onClick={() => setOpen(false)}>
            📊 Mi panel
          </Link>
          <button className="wl-user-menu__item wl-user-menu__item--danger" onClick={onSignOut}>
            🚪 Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

function ThemeToggle() {
  const { resolvedTheme, toggle } = useTheme();
  const isDark = resolvedTheme === 'dark';
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="wl-theme-toggle"
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      <span className="wl-theme-toggle__track">
        <span className="wl-theme-toggle__thumb" data-dark={isDark ? 'true' : 'false'}>
          {isDark ? '🌙' : '☀️'}
        </span>
      </span>
    </button>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push('/home');
    router.refresh();
  };

  return (
    <header className="wl-site-nav">
      <div className="wl-site-nav__inner wrap">
        {/* Brand with logo */}
        <Link href="/home" className="wl-site-nav__brand">
          <div className="wl-site-nav__logo-wrap">
            <Image
              src="/images/welearn-logo.png"
              alt="WeLearn"
              fill
              sizes="96px"
              priority
              style={{ objectFit: 'cover', objectPosition: 'center 42%' }}
            />
          </div>
          <span className="wl-site-nav__brand-name">Idiomas WeLearn</span>
        </Link>

        {/* Desktop links */}
        <nav className="wl-site-nav__links" aria-label="Navegación principal">
          {NAV_LINKS.map(({ label, href }) => {
            const active = href.startsWith('/examenes')
              ? pathname.startsWith('/examenes')
              : href === '/clases-de-ingles'
              ? pathname.startsWith('/clases-de-ingles')
              : href === '/clases-de-coreano'
              ? pathname.startsWith('/clases-de-coreano')
              : href === '/clases-de-idiomas'
              ? pathname.startsWith('/clases-de-') && !pathname.startsWith('/clases-de-ingles') && !pathname.startsWith('/clases-de-coreano')
              : href === '/blog'
              ? pathname.startsWith('/blog')
              : href === '/precios'
              ? pathname === '/precios'
              : pathname === '/home';

            // Insert Práctica dropdown right after Exámenes
            const isExamenes = href === '/examenes';
            return (
              <>
                <Link
                  key={href}
                  href={href}
                  className={`wl-site-nav__link${active ? ' is-active' : ''}`}
                >
                  {label}
                </Link>
                {isExamenes && <PracticaDropdown key="practica-dropdown" pathname={pathname} />}
              </>
            );
          })}
        </nav>

        {/* CTA / User */}
        <div className="wl-site-nav__cta">
          <ThemeToggle />
          {loading ? (
            <span className="wl-site-nav__loading" />
          ) : user ? (
            <UserMenu user={user} onSignOut={handleSignOut} />
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">Iniciar sesión</Link>
              <Link href="/clases-de-ingles" className="btn btn-sm">Empezar →</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="wl-site-nav__toggle"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="wl-site-nav__mobile">
          {NAV_LINKS.map(({ label, href }) => (
            <>
              <Link key={href} href={href} className="wl-site-nav__mobile-link" onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
              {/* Práctica sub-links after Exámenes on mobile */}
              {href === '/examenes' && (
                <div key="practica-mobile" style={{ borderLeft: '2px solid rgba(5,150,105,0.3)', marginLeft: '1rem', paddingLeft: '0.75rem' }}>
                  <div style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#059669', fontWeight: 800, padding: '0.4rem 0 0.2rem' }}>
                    Práctica
                  </div>
                  {PRACTICA_ITEMS.map(item => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="wl-site-nav__mobile-link"
                      style={{ fontSize: '0.88rem', padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.emoji} {item.label}
                      {item.badge && (
                        <span style={{ fontSize: '0.55rem', fontWeight: 900, background: '#e11d48', color: '#fff', padding: '1px 4px', borderRadius: 3 }}>{item.badge}</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ))}
          <div style={{ display: 'flex', gap: 8, padding: '1rem 0 0' }}>
            {user ? (
              <>
                <Link href="/dashboard" className="btn btn-sm" onClick={() => setMenuOpen(false)}>Mi panel</Link>
                <button className="btn btn-ghost btn-sm" onClick={handleSignOut}>Salir</button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>Iniciar sesión</Link>
                <Link href="/clases-de-ingles" className="btn btn-sm" onClick={() => setMenuOpen(false)}>Empezar →</Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
