import SiteNav from '@/components/SiteNav';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main id="main">{children}</main>
      <WhatsAppFloat />
    </>
  );
}
