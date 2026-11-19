import Link from 'next/link';
import type { CSSProperties } from 'react';
import { BookOpenText, Headphones, Mic2, PenLine } from 'lucide-react';
import { SKILL_ACCENT } from '@/data/practica/skill-accents';
import styles from '../IeltsHub.module.css';

const skills = [
  { name: 'Listening', icon: Headphones, accent: SKILL_ACCENT.escucha.var, href: '/practica/ielts/listening', detail: 'Learn how to follow the four parts, anticipate an answer form, hear a correction and review the exact audio evidence.' },
  { name: 'Reading', icon: BookOpenText, accent: SKILL_ACCENT.lectura.var, href: '/practica/ielts/reading', detail: 'Map a passage, locate evidence and compare meaning. Continue into 14 question-format routes and six transferable skills.' },
  { name: 'Writing', icon: PenLine, accent: SKILL_ACCENT.escritura.var, href: '/practica/ielts/academic/writing', detail: 'Study Task 1 visual reporting and Task 2 essay development in separate, connected courses with worked examples.' },
  { name: 'Speaking', icon: Mic2, accent: SKILL_ACCENT.habla.var, href: '/practica/ielts/speaking', detail: 'Understand all three parts, develop natural answers, record a response and review it against the four criteria.' },
] as const;

export const ACADEMIC_FAQS = [
  { question: 'Are all four IELTS Academic skills available here?', answer: 'Yes. Listening, Reading, Writing and Speaking each have a learning route and focused practice. The 40 assembled Academic sets can also be taken as complete mocks.' },
  { question: 'What is the difference between a guided set and a focused practice set?', answer: 'The first 20 complete sets have a guided route with question-level Listening and Reading evidence and written reference responses. All 40 sets can be practised one skill at a time without a timer.' },
] as const;

export default function IELTSAcademicPage() {
  return <div className={styles.page} lang="en"><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica">Practice</Link><span>/</span><Link href="/practica/ielts">IELTS</Link><span>/</span><span>Academic</span></nav>
    <header className={styles.hero}>
      <p className={styles.eyebrow}>IELTS Academic · Four connected skills</p>
      <h1>Learn the method. Then practise the whole task.</h1>
      <p className={styles.heroLead}>Choose the skill that needs your attention today. Each route explains what the test asks, shows the decision behind an answer and connects to original practice. You can work through one skill at your own pace or combine them in a complete mock.</p>
      <div className={styles.factGrid} aria-label="IELTS Academic at a glance"><div className={styles.fact}><strong>4 skills</strong><span>with separate learning routes</span></div><div className={styles.fact}><strong>40 sets</strong><span>for independent practice</span></div><div className={styles.fact}><strong>20 guided</strong><span>complete sets with evidence</span></div><div className={styles.fact}><strong>1 test</strong><span>when you combine the skills</span></div></div>
    </header>

    <section className={styles.section} aria-labelledby="academic-skills-title"><div className={styles.sectionHeading}><p className={styles.kicker}>Choose a skill</p><h2 id="academic-skills-title">Start where your next question is.</h2><p>All four routes are available. A learning lesson and an untimed practice set serve different purposes; use both before you judge your exam readiness.</p></div><div className={styles.skillGrid}>
      {skills.map(({ icon: Icon, ...skill }) => <Link key={skill.name} href={skill.href} className={styles.skillCard} style={{ '--card-accent': skill.accent } as CSSProperties}><div className={styles.skillTop}><span className={styles.skillIcon}><Icon size={23} aria-hidden="true" /></span><span className={styles.skillLabel}>Academic skill</span></div><h3>{skill.name}</h3><p>{skill.detail}</p><strong>Open {skill.name} →</strong></Link>)}
    </div></section>

    <section className={styles.section} aria-labelledby="academic-boundary-title"><div className={styles.sectionHeading}><p className={styles.kicker}>Know what you are using</p><h2 id="academic-boundary-title">Official format and WeLearn study method.</h2></div><div className={styles.prose}><p>IELTS Academic assesses Listening, Reading, Writing and Speaking. The test format, task instructions and assessment criteria come from IELTS. WeLearn organises its own lessons around the decisions a learner has to make: where to listen or read, what the prompt requires, how to develop an answer and how to review an error.</p><p>The 40 assembled sets are original WeLearn practice. Listening and Reading results show estimated study bands, while focused Writing and Speaking practice supports drafting and self-review without automatically assigning a band. The first 20 sets also have a guided complete-mock route. Keep a practice estimate separate from an official test result.</p></div><div className={styles.actions}><Link href="/examenes/ielts#practica">Choose a complete mock</Link><Link href="/practica/ielts/writing/simulacros">Practise Writing by set</Link></div></section>
    <section className={styles.section} aria-labelledby="academic-faq-title"><div className={styles.sectionHeading}><p className={styles.kicker}>Questions before you begin</p><h2 id="academic-faq-title">Choose the right route.</h2></div><div className={styles.articleGrid}>{ACADEMIC_FAQS.map(faq => <details className={styles.editorialCard} key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
  </div></div>;
}
