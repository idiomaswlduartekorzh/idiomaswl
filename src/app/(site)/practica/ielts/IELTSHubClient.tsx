import Link from 'next/link';
import { ArrowRight, BookOpenText, Headphones, Mic2, PenLine } from 'lucide-react';
import ExamPodcastShelf from '@/components/practica/ExamPodcastShelf';
import { getExamPodcasts } from '@/data/practica/exam-podcast-catalog';
import styles from './IeltsHub.module.css';

const IELTS_PODCASTS = getExamPodcasts('ielts');

const MODALITIES = [
  {
    id: 'academic',
    name: 'IELTS Academic',
    desc: 'Academic Reading, visual-data Writing Task 1 and argumentative Writing Task 2 in one connected study route.',
    href: '/practica/ielts/academic',
    status: 'Available',
  },
  {
    id: 'general-training',
    name: 'IELTS General Training',
    desc: 'Official differences, practical Reading and letter-based Writing Task 1 with explained practice.',
    href: '/practica/ielts/general-training',
    status: 'New route',
  },
];

const AVAILABLE_SKILLS = [
  {
    id: 'listening',
    name: 'Listening',
    label: 'Listening comprehension',
    desc: 'Practise all 20 audited sets with replayable audio, free navigation, private scoring and printable student PDFs.',
    count: '20 sets · 800 questions · student PDFs',
    href: '/practica/ielts/listening',
    icon: Headphones,
  },
  {
    id: 'reading',
    name: 'Reading',
    label: 'Reading comprehension',
    desc: 'Practise Reading alone with 20 audited sets, or study 14 question formats and 6 transferable reading skills.',
    count: '20 sets · 40 questions each · method lessons',
    href: '/practica/ielts/reading',
    icon: BookOpenText,
  },
  {
    id: 'writing',
    name: 'Writing',
    label: 'Academic writing',
    desc: 'Work on Task 1 and Task 2 from any of the 20 audited sets, with no exam timer, then study the full Writing method.',
    count: '20 sets · Task 1 + Task 2',
    href: '/practica/ielts/writing',
    icon: PenLine,
  },
  {
    id: 'speaking',
    name: 'Speaking',
    label: 'Spoken production',
    desc: 'Practise the three Speaking parts independently with prompts from 20 audited sets and record your responses.',
    count: '20 sets · 3 parts · recording',
    href: '/practica/ielts/speaking',
    icon: Mic2,
  },
];

export default function IELTSHubClient() {
  return (
    <div className={styles.page} lang="en">
      <div className={styles.shell}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica">Practice</Link><span aria-hidden="true">/</span><span aria-current="page">IELTS</span></nav>

        <header className={styles.hero}>
          <p className={styles.eyebrow}>IELTS practice · Choose your route</p>
          <h1>Practise one skill or take a complete mock.</h1>
          <p className={styles.heroLead}>Choose Listening, Reading, Writing or Speaking and work from the 20 audited Academic sets at your own pace. When you want exam conditions, take all four skills together in a complete mock.</p>
          <div className={styles.factGrid} aria-label="IELTS practice at a glance">
            <div className={styles.fact}><strong>4 skills</strong><span>independent practice</span></div>
            <div className={styles.fact}><strong>20 sets</strong><span>audited Academic material</span></div>
            <div className={styles.fact}><strong>No timer</strong><span>in skill practice</span></div>
            <div className={styles.fact}><strong>Full mocks</strong><span>when you are ready</span></div>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="ielts-mode-heading">
          <div className={styles.sectionHeading}><p className={styles.kicker}>Start here</p><h2 id="ielts-mode-heading">How do you want to practise today?</h2><p>Choose a single skill for focused work or complete a timed IELTS mock.</p></div>
          <div className={styles.pathGrid}>
            <Link href="#destrezas" className={styles.pathCard}><div className={styles.pathTop}><h3>Practice by skill</h3><span className={styles.status}>01</span></div><p>Choose Listening, Reading, Writing or Speaking. Move between parts without a timer.</p><strong>Choose a skill <ArrowRight size={16} aria-hidden="true" /></strong></Link>
            <Link href="/examenes/ielts#practica" className={styles.pathCard}><div className={styles.pathTop}><h3>Complete mocks</h3><span className={styles.status}>02</span></div><p>Take all four skills together using the full exam flow and its report.</p><strong>Choose a full mock <ArrowRight size={16} aria-hidden="true" /></strong></Link>
          </div>
        </section>

        <section className={styles.section} id="destrezas" aria-labelledby="skills-heading">
          <div className={styles.sectionHeading}><p className={styles.kicker}>Four independent skills</p><h2 id="skills-heading">One skill at a time.</h2><p>Each route uses the same audited material as the complete mock. Choose a set, practise freely, then return here to switch skills.</p></div>
          <div className={styles.skillGrid}>
            {AVAILABLE_SKILLS.map(({ icon: Icon, ...skill }) => (
              <Link key={skill.id} href={skill.href} className={styles.skillCard}>
                <div className={styles.skillTop}><span className={styles.skillIcon}><Icon size={23} aria-hidden="true" /></span><span className={styles.skillLabel}>{skill.label}</span></div>
                <h3>{skill.name}</h3><p>{skill.desc}</p><strong>{skill.count} <ArrowRight size={16} aria-hidden="true" /></strong>
              </Link>
            ))}
          </div>

          <p className={styles.routeNote}><strong>Score note:</strong> Listening and Reading show estimated practice bands. Writing and Speaking provide completion review without inventing an automatic band.</p>
        </section>

        <section className={styles.section} aria-labelledby="routes-heading">
          <div className={styles.sectionHeading}><p className={styles.kicker}>Choose your test route</p><h2 id="routes-heading">Academic and General Training start differently</h2><p>Choose the test you are preparing for before opening a skill. This keeps Writing Task 1 format differences and Reading contexts clear.</p></div>
          <div className={styles.pathGrid}>
            {MODALITIES.map((modality) => (
              <Link key={modality.id} href={modality.href} className={styles.pathCard}>
                <div className={styles.pathTop}><h3>{modality.name}</h3><span className={styles.status}>{modality.status}</span></div>
                <p>{modality.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <ExamPodcastShelf
          episodes={IELTS_PODCASTS}
          locale="en"
          eyebrow="IELTS audio study room"
          title="Three podcast maps for the work ahead"
          description="Start with the episode that matches your next task. Each one has its own exam page with the audio, an editorial accuracy note, a written study map and direct routes into practice."
        />

      </div>
    </div>
  );
}
