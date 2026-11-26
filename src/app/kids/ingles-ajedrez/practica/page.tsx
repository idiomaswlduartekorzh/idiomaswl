import type { Metadata } from 'next';
import Link from 'next/link';
import DocumentLanguage from '@/components/spanish/DocumentLanguage';
import styles from './page.module.css';

const canonical = 'https://www.idiomaswl.com/kids/ingles-ajedrez/practica';
const title = 'Chess Practice in English | WeLearn Kids';
const description = 'Solve checkmate, tactics, and endgame puzzles with adaptive difficulty, hints, and saved progress.';
const shareImage = {
  url: '/images/kids/kids-ajedrez-docente.jpg',
  alt: 'Children practicing chess with a teacher',
};

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  manifest: '/kids/ingles-ajedrez/practica/manifest.webmanifest?v=20261125-en',
  openGraph: { title, description, url: canonical, type: 'website', locale: 'en_US', images: [shareImage] },
  twitter: { card: 'summary_large_image', title, description, images: [shareImage] },
};

export default function ChessPracticePage() {
  return (
    <main className={styles.page} lang="en">
      <DocumentLanguage lang="en" />
      <div className={styles.topbar}>
        <Link className={styles.backLink} href="/kids/ingles-ajedrez">
          ← Back to Kids Chess
        </Link>
        <span className={styles.title}>Matecraft · Practice</span>
      </div>
      <iframe
        className={styles.frame}
        src="/kids/ingles-ajedrez/practica/index.html?v=20261125-en"
        title="Matecraft chess practice"
        allow="fullscreen"
      />
    </main>
  );
}
