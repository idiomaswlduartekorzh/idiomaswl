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
    desc: 'Understand the four-part format, then practise Part 1 with original WeLearn audio, 10 questions and server-scored feedback.',
    count: '4-part map · release-gated Part 1 pilot',
    href: '/practica/ielts/listening',
    icon: Headphones,
  },
  {
    id: 'reading',
    name: 'Reading',
    label: 'Reading comprehension',
    desc: 'Study 14 question-format routes, strengthen 6 reading skills and transfer the method through guided, independent and mixed practice.',
    count: '14 question routes · 6 skills',
    href: '/practica/ielts/reading',
    icon: BookOpenText,
  },
  {
    id: 'writing',
    name: 'Writing',
    label: 'Academic writing',
    desc: 'Build visual-data responses in Task 1 and argument-led essays in Task 2 through connected architecture, skills and full-task practice.',
    count: 'Task 1 · Task 2 · complete practice paths',
    href: '/practica/ielts/academic/writing',
    icon: PenLine,
  },
];

const COMING_SKILLS = [
  { name: 'Speaking', label: 'Speaking production', desc: 'Personal questions, a long turn and discussion.', icon: Mic2 },
];

export default function IELTSHubClient() {
  return (
    <div className={styles.page} lang="en">
      <div className={styles.shell}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica">Practice</Link><span aria-hidden="true">/</span><span aria-current="page">IELTS</span></nav>

        <header className={styles.hero}>
          <p className={styles.eyebrow}>IELTS practice · Format, method & transfer</p>
          <h1>Choose the exam route. Build the skill behind it.</h1>
          <p className={styles.heroLead}>Start with Listening, Academic or General Training, then move into the skill you need. Every available route separates official format from WeLearn strategy and connects explanation to real practice.</p>
          <div className={styles.factGrid} aria-label="IELTS practice at a glance">
            <div className={styles.fact}><strong>2 routes</strong><span>Academic and General Training pathways</span></div>
            <div className={styles.fact}><strong>2 live + 1 pilot</strong><span>Reading and Writing live; Listening release-gated</span></div>
            <div className={styles.fact}><strong>20+ paths</strong><span>question formats and transferable skills</span></div>
            <div className={styles.fact}><strong>English-first</strong><span>international learning experience</span></div>
          </div>
        </header>

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

        <section className={styles.section} aria-labelledby="skills-heading">
          <div className={styles.sectionHeading}><p className={styles.kicker}>Choose a skill route</p><h2 id="skills-heading">Learn the method, practise it, then transfer it</h2><p>Listening, Reading and Writing use one product structure: clear architecture, focused sub-skills, guided practice and a route into independent work.</p></div>
          <div className={styles.skillGrid}>
            {AVAILABLE_SKILLS.map(({ icon: Icon, ...skill }) => (
              <Link key={skill.id} href={skill.href} className={styles.skillCard}>
                <div className={styles.skillTop}><span className={styles.skillIcon}><Icon size={23} aria-hidden="true" /></span><span className={styles.skillLabel}>{skill.label}</span></div>
                <h3>{skill.name}</h3><p>{skill.desc}</p><strong>{skill.count} <ArrowRight size={16} aria-hidden="true" /></strong>
              </Link>
            ))}
          </div>

          <div className={styles.comingGrid} aria-label="Skills in development">
            {COMING_SKILLS.map(({ icon: Icon, ...skill }) => (
              <article key={skill.name} className={styles.comingCard}>
                <div className={styles.skillTop}><span className={styles.skillIcon}><Icon size={22} aria-hidden="true" /></span><span className={styles.comingBadge}>Coming soon</span></div>
                <h3>{skill.name}</h3><p>{skill.desc}</p>
              </article>
            ))}
          </div>

          <p className={styles.routeNote}><strong>Score note:</strong> WeLearn lesson and Progress Engine results measure practice performance. They do not predict or award an IELTS band.</p>
        </section>
      </div>
    </div>
  );
}
