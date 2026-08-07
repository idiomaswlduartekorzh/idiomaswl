import SiteNav from '@/components/SiteNav';
import SiteSkipLink from '@/components/SiteSkipLink';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteSkipLink />
      <SiteNav />
      <main id="main" tabIndex={-1}>{children}</main>
      <WhatsAppFloat />
    </>
  );
}
