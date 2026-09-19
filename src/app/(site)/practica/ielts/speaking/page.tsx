import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mic2 } from 'lucide-react';

import styles from '../IeltsHub.module.css';

export const metadata: Metadata = {
  title: 'IELTS Speaking Practice by Skill',
  description: 'Practise the three IELTS Speaking parts independently with prompts from 20 audited Academic sets and record your responses.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/speaking' },
};

export default function IeltsSpeakingPage() {
  return <main className={styles.page} lang="en"><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica/ielts">IELTS</Link><span>/</span><span>Speaking</span></nav>
    <header className={styles.hero}><p className={styles.eyebrow}>IELTS Speaking · independent practice</p><h1>Practise one Speaking set at a time.</h1><p className={styles.heroLead}>Choose one of 20 audited sets. Work through the three Speaking parts, record and replay your answers, and review your own notes without taking the full exam. Recordings remain in this open browser session; no automatic band is assigned.</p></header>
    <section className={styles.section}><div className={styles.skillGrid}><Link className={styles.skillCard} href="/practica/ielts/speaking/simulacros"><span className={styles.skillIcon}><Mic2 aria-hidden="true" /></span><h2>20 Speaking sets</h2><p>Personal questions, a long turn and discussion from the approved mock bank.</p><strong>Choose a set <ArrowRight aria-hidden="true" /></strong></Link><Link className={styles.skillCard} href="/examenes/ielts#practica"><h2>Complete IELTS mock</h2><p>When you are ready to practise all four skills together, open a full exam.</p><strong>See full mocks <ArrowRight aria-hidden="true" /></strong></Link></div></section>
  </div></main>;
}
