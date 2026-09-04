'use client';

import { usePathname } from 'next/navigation';

const WA = '573005004253';

// Per-page pre-written messages. Matched by pathname prefix (most specific first).
const PAGE_MESSAGES: [string, string][] = [
  ['/practica/ielts',     'Hello, I was practising IELTS with WeLearn and would like guidance on how to continue my preparation.'],
  ['/nivel-radar',        'Hola, hice el Nivel Radar de WeLearn y quiero ayuda personalizada para avanzar mi inglés.'],
  ['/clases-de-coreano',  'Hola, vi la página de clases de coreano en WeLearn y quiero saber más sobre el programa.'],
  ['/clases-de-ingles',   'Hola, vi su página de clases de inglés y quiero agendar mi clase de diagnóstico gratis.'],
  ['/preparacion-icfes',  'Hola, vi la página de preparación ICFES inglés en WeLearn y quiero empezar.'],
  ['/miembro-fundador',   'Hola, quiero asegurar mi cupo de Miembro Fundador de coreano en WeLearn. ¿Cuántos cupos quedan?'],
  ['/examenes/ielts',     'Hola, vi la información del IELTS en WeLearn y quiero saber cómo prepararme.'],
  ['/examenes/toefl',     'Hola, vi la información del TOEFL en WeLearn y quiero saber cómo prepararme.'],
  ['/examenes/icfes',     'Hola, vi la información del ICFES en WeLearn y quiero saber cómo prepararme.'],
  ['/examenes/goethe',    'Hola, vi la información del Goethe-Zertifikat en WeLearn y quiero saber cómo prepararme.'],
  ['/examenes/delf-dalf', 'Hola, vi la información del DELF en WeLearn y quiero saber cómo prepararme.'],
  ['/examenes/cils-celi', 'Hola, vi la información del CILS en WeLearn y quiero saber cómo prepararme.'],
  ['/examenes',           'Hola, vi los simulacros de exámenes de WeLearn y quiero más información.'],
  ['/blog',               'Hola, leí un artículo del blog de WeLearn y quiero saber más sobre las clases.'],
  ['/precios',            'Hola, vi los precios de WeLearn y quiero saber cuál plan es el mejor para mí.'],
  ['/metodo',             'Hola, vi el método de WeLearn y quiero conocer más sobre cómo funciona.'],
  ['/leccion',            'Hola, estaba viendo una lección de WeLearn y quiero saber cómo acceder a más contenido.'],
  ['/practica',           'Hola, estaba practicando en WeLearn y quiero saber cómo continuar mi preparación.'],
];

const DEFAULT_MSG = 'Hola, quiero saber más sobre las clases de idiomas de WeLearn.';

function getMessageForPath(pathname: string): string {
  for (const [prefix, msg] of PAGE_MESSAGES) {
    if (pathname.startsWith(prefix)) return msg;
  }
  return DEFAULT_MSG;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export default function WhatsAppFloat() {
  const pathname = usePathname();
  const isIelts = pathname.startsWith('/practica/ielts');
  const msg = getMessageForPath(pathname);
  const href = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

  function handleClick() {
    // The global listener tracks every public CTA when attribution is enabled.
    if (process.env.NEXT_PUBLIC_WHATSAPP_ATTRIBUTION_ENABLED === 'true') return;
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
      event: 'click_whatsapp',
      source_page: pathname,
    });
  }

  return (
    <>
      <style>{`
        .wl-wa-float {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 0;
          background: #25D366;
          color: #fff;
          border-radius: 999px;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.45);
          text-decoration: none;
          overflow: hidden;
          max-width: 52px;
          transition: max-width 0.3s ease, box-shadow 0.2s ease, gap 0.3s ease;
          cursor: pointer;
        }
        .wl-wa-float:hover {
          max-width: 220px;
          gap: 0.5rem;
          box-shadow: 0 6px 28px rgba(37, 211, 102, 0.55);
        }
        .wl-wa-float__icon {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wl-wa-float__label {
          font-family: var(--sans);
          font-size: 0.88rem;
          font-weight: 700;
          white-space: nowrap;
          opacity: 0;
          max-width: 0;
          overflow: hidden;
          transition: opacity 0.2s ease 0.1s, max-width 0.3s ease;
          padding-right: 0;
        }
        .wl-wa-float:hover .wl-wa-float__label {
          opacity: 1;
          max-width: 160px;
          padding-right: 1.1rem;
        }
        /* Pulse animation */
        @keyframes wl-wa-pulse {
          0%   { box-shadow: 0 0 0 0   rgba(37, 211, 102, 0.55); }
          70%  { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0   rgba(37, 211, 102, 0); }
        }
        .wl-wa-float {
          animation: wl-wa-pulse 2.5s ease-out 2s 3;
        }
        /* Mobile: always compact */
        @media (max-width: 640px) {
          .wl-wa-float {
            bottom: max(8px, env(safe-area-inset-bottom));
            right: max(8px, env(safe-area-inset-right));
            z-index: 40;
            max-width: 44px !important;
            gap: 0 !important;
            opacity: 0.9;
          }
          .wl-wa-float__icon {
            width: 44px;
            height: 44px;
          }
          .wl-wa-float__label {
            display: none;
          }
        }
        @media (max-width: 640px) {
          body:has([data-active-practice="true"]) .wl-wa-float {
            display: none;
          }
        }
      `}</style>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="wl-wa-float"
        aria-label={isIelts ? 'Contact WeLearn on WhatsApp' : 'Contáctanos por WhatsApp'}
        title={isIelts ? 'Message us on WhatsApp' : 'Escríbenos por WhatsApp'}
      >
        <span className="wl-wa-float__icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
        </span>
        <span className="wl-wa-float__label">{isIelts ? 'Message us' : 'Escríbenos'}</span>
      </a>
    </>
  );
}
