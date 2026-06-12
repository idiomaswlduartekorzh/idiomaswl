import type { Metadata } from 'next';
import GrandmothersLedgerClient from './GrandmothersLedgerClient';

export const metadata: Metadata = {
  title: "The Grandmother's Ledger — English Comprehension Practice | WeLearn",
  description:
    'Practise B1–B2 English listening and reading comprehension with this real-world family dispute story. Two perspectives, 19 questions on vocabulary, inference, tone and critical thinking.',
  alternates: { canonical: 'https://idiomaswl.com/practica/the-grandmothers-ledger' },
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
