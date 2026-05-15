'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Idiomas',  href: '/home#idiomas' },
  { label: 'Método',   href: '/home#metodo' },
  { label: 'Exámenes', href: '/examenes' },
  { label: 'Lección',  href: '/home#coreano-preview' },
  { label: 'Precios',  href: '/home#precios' },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="wl-site-nav">
      <div className="wl-site-nav__inner wrap">
        {/* Brand */}
        <Link href="/home" className="wl-site-nav__brand">
          <span className="brand-mark"><span>W</span></span>
          <span>Idiomas <em>WeLearn</em></span>
        </Link>

        {/* Desktop links */}
        <nav className="wl-site-nav__links" aria-label="Navegación principal">
          {NAV_LINKS.map(({ label, href }) => {
            const active = href.startsWith('/examenes') ? pathname.startsWith('/examenes') : pathname === '/home';
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

        {/* CTA */}
        <div className="wl-site-nav__cta">
          <Link href="/login" className="btn btn-ghost btn-sm">Iniciar sesión</Link>
          <Link href="/registro" className="btn btn-sm">Registrarse</Link>
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
            <Link href="/login" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>Iniciar sesión</Link>
            <Link href="/registro" className="btn btn-sm" onClick={() => setMenuOpen(false)}>Registrarse</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
