'use client';

import Link from 'next/link';
import { ArrowRight, Clock3, Headphones, ShieldCheck } from 'lucide-react';
import Task1ChartTypeGuide from './Task1ChartTypeGuide';
import styles from './Task1Hub.module.css';

const RESPONSE_PLAN = [
  {
    n: '01',
    label: 'Introduction',
    range: '20-30 words',
    purpose: 'Paraphrase the task accurately. Do not report the main features yet.',
    skills: 'Paraphrasing · sentence control',
    href: '/practica/ielts/academic/writing/task1/introduccion',
  },
  {
    n: '02',
    label: 'Overview',
    range: '25-40 words',
    purpose: 'State the visual story: major trend, hierarchy, distribution, process or transformation.',
    skills: 'Visual analysis · feature selection',
    href: '/practica/ielts/academic/writing/task1/overview',
  },
  {
    n: '03',
    label: 'Body 1',
    range: '45-60 words',
    purpose: 'Develop the first meaningful group of evidence, not the first items you notice.',
    skills: 'Grouping · trends · comparisons',
    href: '/practica/ielts/academic/writing/task1/body-1',
  },
  {
    n: '04',
    label: 'Body 2',
    range: '45-60 words',
    purpose: 'Complete the evidence with a second group, contrast, later phase or remaining area.',
    skills: 'Contrast · completion · precision',
    href: '/practica/ielts/academic/writing/task1/body-2',
  },
];

const SKILLS = [
  {
    id: 'introduccion',
    n: 1,
    label: 'Paraphrasing for the introduction',
    icon: '🔁',
    desc: 'Paraphrase the prompt without copying. Change vocabulary, word class and sentence structure.',
    href: '/practica/ielts/academic/writing/task1/introduccion',
    tag: 'Paraphrasing',
  },
  {
    id: 'overview',
    n: 2,
    label: 'Writing the overview',
    icon: '🔭',
    desc: 'The most important paragraph: two sentences, no figures and the main trend. This is where many points are lost.',
    href: '/practica/ielts/academic/writing/task1/overview',
    tag: 'Overall trend',
  },
  {
    id: 'tendencias',
    n: 3,
    label: 'Trends',
    icon: '📈',
    desc: 'Read authentic-style IELTS graphs and identify the two or three most relevant trends to mention. Learn to distinguish the essential from the secondary.',
    href: '/practica/ielts/academic/writing/task1/tendencias',
    tag: 'Line graphs · Bar charts',
  },
  {
    id: 'comparaciones',
    n: 4,
    label: 'Comparisons',
    icon: '⚖️',
    desc: 'Compare categories precisely with higher/lower, while and approximation language.',
    href: '/practica/ielts/academic/writing/task1/comparaciones',
    tag: 'Bar · Pie · Table',
  },
  {
    id: 'procesos',
    n: 5,
    label: 'Processes',
    icon: '⚙️',
    desc: 'Use the passive voice and sequencing language to describe process diagrams step by step.',
    href: '/practica/ielts/academic/writing/task1/procesos',
    tag: 'Process diagrams',
  },
  {
    id: 'mapas',
    n: 6,
    label: 'Maps',
    icon: '🗺️',
    desc: 'Location language (to the north of, adjacent to) and change language (was replaced by, was demolished).',
    href: '/practica/ielts/academic/writing/task1/mapas',
    tag: 'Maps',
  },
  {
    id: 'vocabulario',
    n: 7,
    label: 'Data vocabulary',
    icon: '📚',
    desc: 'Choose accurate verbs, nouns, adverbs and cohesive links for changes, proportions and comparisons.',
    href: '/practica/ielts/academic/writing/task1/vocabulario',
    tag: 'Verb · Adverb · Structure',
  },
  {
    id: 'tarea-completa',
    n: 8,
    label: 'Complete Task',
    icon: '⏱️',
    desc: 'Full practice: 20 minutes, a word counter, a structured review and original WeLearn model responses.',
    href: '/practica/ielts/academic/writing/task1/tarea-completa',
    tag: 'Full Task · 20 min',
  },
];

const PARAGRAPH_TOOLKIT = [
  {
    paragraph: 'Introduction',
    role: 'Reframe the task accurately without reporting findings.',
    tools: [
      { label: 'Paraphrasing', href: '/practica/ielts/academic/writing/task1/introduccion' },
      { label: 'Identify the visual', href: '/practica/ielts/academic/writing/task1/overview' },
    ],
  },
  {
    paragraph: 'Overview',
    role: 'State the main story before supporting it with detail.',
    tools: [
      { label: 'Overview decisions', href: '/practica/ielts/academic/writing/task1/overview' },
      { label: 'Relevant trends', href: '/practica/ielts/academic/writing/task1/tendencias' },
      { label: 'Process sequencing', href: '/practica/ielts/academic/writing/task1/procesos' },
      { label: 'Map transformation', href: '/practica/ielts/academic/writing/task1/mapas' },
    ],
  },
  {
    paragraph: 'Body 1',
    role: 'Develop the first evidence group with a clear relationship.',
    tools: [
      { label: 'Body 1 grouping', href: '/practica/ielts/academic/writing/task1/body-1' },
      { label: 'Trends', href: '/practica/ielts/academic/writing/task1/tendencias' },
      { label: 'Comparisons', href: '/practica/ielts/academic/writing/task1/comparaciones' },
      { label: 'Data vocabulary', href: '/practica/ielts/academic/writing/task1/vocabulario' },
    ],
  },
  {
    paragraph: 'Body 2',
    role: 'Complete the evidence plan with a second group, contrast, phase or area.',
    tools: [
      { label: 'Body 2 completion', href: '/practica/ielts/academic/writing/task1/body-2' },
      { label: 'Comparisons', href: '/practica/ielts/academic/writing/task1/comparaciones' },
      { label: 'Process sequencing', href: '/practica/ielts/academic/writing/task1/procesos' },
      { label: 'Map changes', href: '/practica/ielts/academic/writing/task1/mapas' },
    ],
  },
];

const TASK1_FAQS = [
  {
    question: 'What does IELTS Academic Writing Task 1 ask you to do?',
    answer: 'It asks you to describe visual information in at least 150 words. The input may be a graph, table, process, map or combination of visuals.',
  },
  {
    question: 'Are these skills separate official tasks?',
    answer: 'No. Introduction, Overview, Body 1 and Body 2 are parts of one WeLearn study response plan. Trends, comparisons, vocabulary, process language and map language are transferable micro-skills that support the official IELTS Academic Writing Task 1.',
  },
  {
    question: 'Does IELTS prescribe a fixed number of paragraphs or words per paragraph?',
    answer: 'No. IELTS requires at least 150 words for Academic Writing Task 1, but it does not prescribe paragraph names or paragraph word counts. WeLearn uses an Introduction, Overview, Body 1 and Body 2 plan to make practice more manageable.',
  },
];

export default function Task1HubPage() {
  return (
    <div className={styles.page} lang="en">
      <div className={styles.shell}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/practica/ielts/academic/writing">Academic Writing</Link><span aria-hidden="true">/</span><span aria-current="page">Task 1</span>
        </nav>

        <header className={styles.hero}>
          <p className={styles.eyebrow}>IELTS Academic Writing Task 1</p>
          <h1>Read the visual. Build one clear response.</h1>
          <p className={styles.heroLead}>Separate response architecture from the visual-analysis tools used inside it. Follow the four-part WeLearn plan, practise one visual type, or strengthen a transferable data-writing skill.</p>
          <div className={styles.factGrid} aria-label="Official Task 1 facts">
            <div className={styles.fact}><strong>150+</strong><span>minimum words in the complete response</span></div>
            <div className={styles.fact}><strong>≈20 min</strong><span>recommended working time for Task 1</span></div>
            <div className={styles.fact}><strong>1 visual task</strong><span>chart, table, process, map or combined input</span></div>
            <div className={styles.fact}><strong>4 criteria</strong><span>used to assess the complete response</span></div>
          </div>
        </header>

        <section className={`${styles.section} ${styles.podcastSection}`} aria-labelledby="audio-guide-heading">
          <div className={styles.podcastPanel}>
            <div className={styles.podcastHeader}>
              <div>
                <p className={styles.podcastEyebrow}><Headphones size={16} aria-hidden="true" /> Start here · Audio guide</p>
                <h2 id="audio-guide-heading">Mastering IELTS Academic Writing Task 1</h2>
                <p>Use this English episode as your map of the task: what Academic Task 1 asks you to do, how to protect the recommended 20 minutes, how to read each visual and how the four scoring criteria translate into practice.</p>
              </div>
              <div className={styles.podcastDuration} aria-label="Episode length: 19 minutes 56 seconds">
                <Clock3 size={18} aria-hidden="true" />
                <span>19:56</span>
              </div>
            </div>

            <div className={styles.playerShell}>
              <div className={styles.nowPlaying}><span>Orientation episode · English</span><strong>No autoplay</strong></div>
              <audio className={styles.audioPlayer} controls preload="metadata" aria-label="Play Mastering IELTS Academic Writing Task 1">
                <source src="/audio/ielts/task1/mastering-ielts-academic-writing-task-1.mp3" type="audio/mpeg" />
                Your browser does not support the audio player. <a href="/audio/ielts/task1/mastering-ielts-academic-writing-task-1.mp3">Download the episode</a>.
              </audio>
            </div>

            <div className={styles.podcastBody}>
              <div className={styles.episodeMap}>
                <p className={styles.podcastLabel}>By the end, you should be able to</p>
                <ul>
                  <li>separate official requirements from useful preparation defaults and budget Task 1 inside the full Writing test;</li>
                  <li>read the visual type, select its main features and avoid adding explanations the visual does not support;</li>
                  <li>group evidence logically, write a clear overview and report details with accurate comparisons;</li>
                  <li>turn Read, Select, Group and Report into practice using the three paths directly below.</li>
                </ul>
                <nav className={styles.podcastLinks} aria-label="Continue from the audio guide">
                  <a href="#response-architecture">Response plan <ArrowRight size={15} aria-hidden="true" /></a>
                  <a href="#visual-types">Visual types <ArrowRight size={15} aria-hidden="true" /></a>
                  <a href="#transferable-skills">Writing skills <ArrowRight size={15} aria-hidden="true" /></a>
                </nav>
              </div>

              <aside className={styles.editorialNote} aria-label="Editorial accuracy note">
                <ShieldCheck size={22} aria-hidden="true" />
                <div>
                  <p className={styles.podcastLabel}>Editorially reviewed</p>
                  <h3>Useful defaults, not hidden IELTS rules</h3>
                  <p>This AI-produced conversation has been checked against the lesson. The four-part plan, suggested paragraph ranges, a number-free overview and passive-heavy process descriptions are practical defaults—not fixed IELTS rules. IELTS does not prescribe a paragraph count, overview location or sentence formula.</p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="official-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Official format versus WeLearn strategy</p>
            <h2 id="official-heading">One official task, two layers of study</h2>
            <p>IELTS asks for a connected description of visual information. The four-part response plan and the skill routes below are WeLearn study tools, not extra official tasks or mandatory paragraph word counts.</p>
          </div>
          <div className={styles.pathGrid}>
            <article className={styles.pathCard}><span className={styles.cardLabel}>Official format</span><h3>Describe the visual accurately</h3><p>Write at least 150 words about the main features, comparisons or stages shown. IELTS does not prescribe paragraph names or a word count for each paragraph.</p></article>
            <article className={styles.pathCard}><span className={styles.cardLabel}>WeLearn response strategy</span><h3>Build a readable evidence hierarchy</h3><p>Use Introduction, Overview, Body 1 and Body 2 as a reliable practice plan, then adapt grouping and language to the specific visual.</p></article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="response-architecture">
          <div className={styles.sectionHeading}><p className={styles.kicker}>Path A · Build the response</p><h2 id="response-architecture">The response architecture</h2><p>A third body paragraph is optional only for an unusually dense visual. It should never replace clear grouping.</p></div>
          <div className={styles.sequenceGrid}>
            {RESPONSE_PLAN.map((item) => (
              <Link key={item.label} href={item.href} className={styles.sequenceCard}>
                <div className={styles.sequenceTop}><span className={styles.sequenceNumber}>{item.n}</span><span className={styles.sequenceRange}>{item.range}</span></div>
                <h3>{item.label}</h3><p>{item.purpose}</p><small>{item.skills} <ArrowRight size={15} aria-hidden="true" /></small>
              </Link>
            ))}
          </div>
        </section>

        <section id="visual-types" className={styles.section} aria-label="Task 1 visual type guide"><Task1ChartTypeGuide /></section>

        <section className={styles.section} aria-labelledby="paragraph-toolkit">
          <div className={styles.sectionHeading}><p className={styles.kicker}>Path B · Paragraph toolkit</p><h2 id="paragraph-toolkit">Use a sub-skill to solve a paragraph decision</h2><p>Paragraphs are the response structure. These linked lessons are reusable tools for charts, tables, processes and maps.</p></div>
          <div className={styles.sequenceGrid}>
            {PARAGRAPH_TOOLKIT.map((item) => (
              <article key={item.paragraph} className={styles.pathCard}><span className={styles.cardLabel}>Response block</span><h3>{item.paragraph}</h3><p>{item.role}</p><div className={styles.toolLinks}>{item.tools.map((tool) => <Link key={tool.href} href={tool.href}>{tool.label}</Link>)}</div></article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="transferable-skills">
          <div className={styles.sectionHeading}><p className={styles.kicker}>Path C · Transferable skills</p><h2 id="transferable-skills">The tools that make the paragraphs work</h2><p>Choose a skill after identifying which paragraph and visual decision you need to improve.</p></div>
          <div className={styles.studyGrid}>
            {SKILLS.map((skill) => (
              <Link key={skill.id} href={skill.href} className={styles.studyCard}>
                <span>{skill.tag}</span><h3>{skill.label}</h3><p>{skill.desc}</p><strong>Practise this skill <ArrowRight size={15} aria-hidden="true" /></strong>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="task1-faqs">
          <div className={styles.sectionHeading}><p className={styles.kicker}>Frequently asked questions</p><h2 id="task1-faqs">Structure without a rigid formula</h2></div>
          <div className={styles.faqGrid}>{TASK1_FAQS.map((faq) => <article key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div>
        </section>
      </div>
    </div>
  );
}
