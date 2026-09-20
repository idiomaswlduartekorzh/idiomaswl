import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpenCheck, Headphones, Mic2, PenLine } from 'lucide-react';

import type { PracticeSetSummary } from '@/components/exam-practice/PracticeSetCatalog';
import styles from './toefl/ios.module.css';

type Skill = 'listening' | 'reading' | 'writing' | 'speaking';
type Product = 'ielts' | 'toefl';

const icons = { listening: Headphones, reading: BookOpenCheck, writing: PenLine, speaking: Mic2 };

export default function ExamSkillSetLibrary({ product, skill, description, detail, note, sets, backHref, backLabel }: {
  product: Product;
  skill: Skill;
  description: string;
  detail: string;
  note: string;
  sets: readonly PracticeSetSummary[];
  backHref: string;
  backLabel: string;
}) {
  const Icon = icons[skill];
  const label = skill[0].toUpperCase() + skill.slice(1);
  const productLabel = product === 'ielts' ? 'IELTS' : 'TOEFL';
  return <main className={styles.page} data-exam={product} lang="en">
    <header className={styles.hero}><div className="wrap">
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica">Practice</Link><span>›</span><Link href={`/practica/${product}`}>{productLabel}</Link><span>›</span><span>{label}</span></nav>
      <div className={styles.skillHeroGrid}>
        <div className={styles.heroCopy}><p className={styles.kicker}>{product === 'ielts' ? 'IELTS Academic' : 'TOEFL iBT 2026'} · independent practice</p><h1>Practise {label}.</h1><p className={styles.lead}>{description}</p></div>
        <div className={styles.skillSummary}><Icon aria-hidden="true" /><strong>{sets.length} sets</strong><span>{detail}</span><small>{note}</small></div>
      </div>
    </div></header>
    <section className={styles.modes} aria-labelledby="ielts-set-heading"><div className="wrap">
      <div className={styles.previewHeader}><div><p>Academic set library</p><h2 id="ielts-set-heading">Choose a set to begin.</h2></div><Link href={backHref} className={styles.textLink}><ArrowLeft aria-hidden="true" /> {backLabel}</Link></div>
      <p className={styles.libraryLead}>Each set keeps the exam’s own task order. Open one set, download its student PDF, then practise at your own pace.</p>
      <div className={styles.setGrid}>
        {sets.map(set => <Link key={set.number} href={set.href} className={styles.setCard}>
          <span className={styles.setNumber}>{String(set.number).padStart(2, '0')}</span>
          <span className={styles.setCopy}><strong>{set.title}</strong><small>{set.detail} · {set.meta ?? 'Untimed practice'}</small></span>
          <ArrowRight aria-hidden="true" />
        </Link>)}
      </div>
      <aside className={styles.libraryNote}><strong>Before you start</strong><p>{note}</p></aside>
    </div></section>
  </main>;
}
