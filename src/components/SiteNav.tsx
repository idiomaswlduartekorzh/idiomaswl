'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

const NAV_LINKS = [
  { label: 'Idiomas',  href: '/home#idiomas' },
  { label: 'Método',   href: '/home#metodo' },
  { label: 'Exámenes', href: '/examenes' },
  { label: 'Lección',  href: '/home#coreano-preview' },
  { label: 'Precios',  href: '/home#precios' },
];

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

export default function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
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
    await supabase.auth.signOut();
    router.push('/home');
    router.refresh();
  };

  return (
    <header className="wl-site-nav">
      <div className="wl-site-nav__inner wrap">
        {/* Brand with logo */}
        <Link href="/home" className="wl-site-nav__brand">
          <Image
            src="/images/welearn-logo.svg"
            alt="WeLearn"
            width={110}
            height={38}
            priority
            className="wl-site-nav__logo"
          />
        </Link>

        {/* Desktop links */}
        <nav className="wl-site-nav__links" aria-label="Navegación principal">
          {NAV_LINKS.map(({ label, href }) => {
            const active = href.startsWith('/examenes')
              ? pathname.startsWith('/examenes')
              : pathname === '/home';
            return (
              <Link
                key={href}
                href={href}
                className={`wl-site-nav__link${active ? ' is-active' : ''}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* CTA / User */}
        <div className="wl-site-nav__cta">
          {loading ? (
            <span className="wl-site-nav__loading" />
          ) : user ? (
            <UserMenu user={user} onSignOut={handleSignOut} />
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">Iniciar sesión</Link>
              <Link href="/registro" className="btn btn-sm">Registrarse</Link>
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
            <Link key={href} href={href} className="wl-site-nav__mobile-link" onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
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
                <Link href="/registro" className="btn btn-sm" onClick={() => setMenuOpen(false)}>Registrarse</Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
