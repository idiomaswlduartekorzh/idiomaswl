import SiteNav from '@/components/SiteNav';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="wl-skip-link" href="#main">Saltar al contenido principal</a>
      <SiteNav />
      <main id="main" tabIndex={-1}>{children}</main>
      <WhatsAppFloat />
    </>
  );
}
