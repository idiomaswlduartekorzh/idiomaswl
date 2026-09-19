import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, PenLine } from 'lucide-react';

import styles from '../IeltsHub.module.css';

export const metadata: Metadata = {
  title: 'IELTS Writing Practice by Skill',
  description: 'Practise IELTS Academic Writing Task 1 and Task 2 independently with prompts from 20 audited sets.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/writing' },
};

export default function IeltsWritingPage() {
  return <main className={styles.page} lang="en"><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica/ielts">IELTS</Link><span>/</span><span>Writing</span></nav>
    <header className={styles.hero}><p className={styles.eyebrow}>IELTS Academic Writing · independent practice</p><h1>Write without taking the whole exam.</h1><p className={styles.heroLead}>Choose one of 20 audited sets to work on Task 1 and Task 2 at your own pace. The prompts and visuals come from the complete mock. Your drafts stay in this browser, and the completion review does not claim an automatic Writing band.</p></header>
    <section className={styles.section}><div className={styles.skillGrid}><Link className={styles.skillCard} href="/practica/ielts/writing/simulacros"><span className={styles.skillIcon}><PenLine aria-hidden="true" /></span><h2>20 Writing sets</h2><p>Task 1 and Task 2 from the approved Academic mock bank.</p><strong>Choose a set <ArrowRight aria-hidden="true" /></strong></Link><Link className={styles.skillCard} href="/practica/ielts/academic/writing"><h2>Learn the method</h2><p>Practise visual descriptions, essay structure and the scoring rubric before trying a full task.</p><strong>Open Writing lessons <ArrowRight aria-hidden="true" /></strong></Link></div></section>
  </div></main>;
}
