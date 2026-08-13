import type { Metadata } from 'next';
import GrandmothersLedgerClient from './GrandmothersLedgerClient';

export const metadata: Metadata = {
  title: "The Grandfather's Ledger — English comprehension practice",
  description:
    'Practise B1–B2 English listening and reading with a real family dispute told from two sides, plus 19 comprehension questions.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/the-grandmothers-ledger' },
};

export default function GrandmothersLedgerPage() {
  return (
    <section className="wl-section">
      <div className="wrap">
        <GrandmothersLedgerClient />
      </div>
    </section>
  );
}
