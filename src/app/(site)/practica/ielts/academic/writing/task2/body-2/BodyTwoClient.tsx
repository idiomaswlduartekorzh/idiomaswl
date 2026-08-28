'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, FilePenLine, Layers3 } from 'lucide-react';
import Task2OfficialReviewBlock from '../Task2OfficialReviewBlock';
import type { EssayTypeId } from '../introduccion/introduction-data';
import ColoredBodyParagraph from '../body-1/ColoredBodyParagraph';
import { BODY_TWO_LESSONS, bodyTwoArchitecture } from './body-two-data';
import BodyTwoPracticeEngine from './BodyTwoPracticeEngine';
import BodyTwoWorkshop from './BodyTwoWorkshop';
import styles from '../introduccion/page.module.css';

export default function BodyTwoClient({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [activeType, setActiveType] = useState<EssayTypeId>('opinion');
  const [activeExample, setActiveExample] = useState(1);
  const lesson = BODY_TWO_LESSONS.find((item) => item.id === activeType) ?? BODY_TWO_LESSONS[0];
  const workedExample = lesson.examples[0];
  const example = lesson.examples[activeExample];
  const architecture = bodyTwoArchitecture(activeType);

  return <div lang="en" className={styles.page}><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={15} /> Task 2</Link><span>/</span><span>Body Paragraph 2</span></nav>
    <header className={styles.hero}><p className={styles.eyebrow}>Task 2 · Build the essay · Step 4</p><h1>Build IELTS Task 2 Body Paragraph 2</h1><p className={styles.heroLead}>Give the second body paragraph a new and necessary job. It may extend your position, explain the other view, answer the second instruction or complete the essay judgement.</p><div className={styles.factGrid}><div className={styles.fact}><strong>1 new job</strong><span>Body 2 must progress beyond Body 1</span></div><div className={styles.fact}><strong>5 blocks</strong><span>the second idea remains visibly developed</span></div><div className={styles.fact}><strong>80–110</strong><span>WeLearn study target, not an official paragraph limit</span></div><div className={styles.fact}><strong>5 families</strong><span>the second paragraph function changes with the prompt</span></div></div><div className={styles.heroActions}><a href="#guided-workshop">Practice with the boxes</a><a href="#practice-engine">Open the level engine</a></div></header>

    <section className={styles.section}><div className={styles.sectionHeading}><p className={styles.kicker}>Official format and WeLearn strategy</p><h2>IELTS rewards a complete response and logical progression, not a fixed Body 2 formula</h2></div><Task2OfficialReviewBlock focus="Add the next required idea while keeping the complete response relevant, developed and logically connected." officialFormat="IELTS Academic Writing Task 2 requires a connected response of at least 250 words. It does not prescribe a Body 2 length, a mandatory contrast sentence or a fixed four-paragraph structure." welearnStrategy="WeLearn uses a frequent four-paragraph architecture and an 80–110-word Body 2 study target. The paragraph job changes according to the instruction and may continue, contrast, answer or evaluate." answerCheck="Body 2 must do more than repeat Body 1. Trace its controlling idea to the remaining instruction, thesis or judgement, and avoid invented evidence." /></section>

    <section className={styles.section}><div className={styles.sectionHeading}><p className={styles.kicker}>Sentence Lego · Body 2</p><h2>The second paragraph uses a different sequence for each task</h2><p>The labels keep progression visible. Discussion needs contrast and evaluation; a solution paragraph needs implementation and an expected result; direct questions need an explicit second answer.</p></div><div className={styles.legoRow}>{architecture.map((item, index) => <div key={item.label} className={`${styles.legoBlock} ${styles[item.tone]}`} style={{ animationDelay: `${index * 90}ms` }}><strong>{item.label}</strong><p>{item.purpose}</p></div>)}</div><div className={styles.bodyFormula}>{architecture.map((item, index) => <Fragment key={item.label}><span>{item.label}</span>{index < architecture.length - 1 && <ArrowRight size={18} />}</Fragment>)}</div></section>

    <section className={styles.section}><div className={styles.sectionHeading}><p className={styles.kicker}>Five question families</p><h2>Decide what Body 2 must add before writing it</h2><p>Select a family to see whether the paragraph should continue, contrast, solve, evaluate or answer.</p></div><div className={styles.typeTabs} role="tablist">{BODY_TWO_LESSONS.map((item) => <button key={item.id} type="button" role="tab" aria-selected={item.id === activeType} className={`${styles.typeTab} ${item.id === activeType ? styles.typeTabActive : ''}`} onClick={() => { setActiveType(item.id); setActiveExample(1); }}>{item.shortLabel}</button>)}</div><article className={styles.typePanel}><div className={styles.typeIntro}><div><h3>{lesson.label}</h3><p className={styles.signal}><strong>Instruction signal:</strong> {lesson.signal}</p><div className={styles.strategyList}><p><strong>Body 2 function:</strong> {lesson.function}</p><p><strong>Planning question:</strong> {lesson.planningQuestion}</p></div></div><p className={styles.trap}><strong>Common trap</strong><br />{lesson.trap}</p></div></article></section>

    <section id="guided-workshop" className={styles.section}><div className={styles.sectionHeading}><p className={styles.kicker}>Watch one · then do four</p><h2>Study one complete Body 2 paragraph, then build four</h2><p>The example first makes progression visible; the workshop then asks you to supply the second paragraph logic yourself.</p></div>
      <article className={`${styles.examplePanel} ${styles.workedExample}`}><div className={styles.workedBadge}>Worked example · {workedExample.title}</div><div className={styles.promptCard}><span>IELTS-style prompt</span><p>{workedExample.prompt}</p></div><p className={styles.paragraphJob}><strong>Body 2 job:</strong> {workedExample.paragraphJob}</p><div className={styles.modelBlockGrid}>{workedExample.blocks.map((item, index) => <article key={item.label} className={styles[item.tone]} style={{ animationDelay: `${index * 80}ms` }}><strong>{item.label}</strong><p>{item.text}</p><small>{item.purpose}</small></article>)}</div><div className={styles.completeParagraph}><strong>Read the blocks as one paragraph</strong><ColoredBodyParagraph blocks={workedExample.blocks} /></div><p className={styles.mistakeNote}><strong>Precision check:</strong> {workedExample.commonMistake}</p></article>
      <div className={styles.tryDivider}><span>Now you try</span><p>The model remains hidden until you choose a distinct controlling idea and write all four development blocks.</p></div>
      <div className={styles.exampleTabs}>{lesson.examples.slice(1).map((item, offset) => { const index = offset + 1; return <button key={item.title} type="button" className={`${styles.exampleTab} ${activeExample === index ? styles.exampleTabActive : ''}`} onClick={() => setActiveExample(index)}>{String(index + 1).padStart(2, '0')} · {item.title}</button>; })}</div>
      <article className={styles.examplePanel}><div className={styles.promptCard}><span>Your IELTS-style prompt</span><p>{example.prompt}</p></div><BodyTwoWorkshop key={`${activeType}-${activeExample}`} example={example} seed={activeExample + BODY_TWO_LESSONS.findIndex((item) => item.id === activeType)} /></article>
    </section>

    <BodyTwoPracticeEngine essayType={activeType} />

    <section className={styles.section}><div className={styles.sectionHeading}><p className={styles.kicker}>Frequently asked questions</p><h2>Make Body 2 progressive rather than repetitive</h2></div><div className={styles.faqGrid}>{faqs.map(({ question, answer }) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div></section>

    <nav className={styles.nextLinks}><Link href="/practica/ielts/academic/writing/task2/introduccion"><FilePenLine size={18} /> Build the introduction</Link><Link href="/practica/ielts/academic/writing/task2/body-1"><Layers3 size={18} /> Build Body 1</Link><Link href="/practica/ielts/academic/writing/task2/conclusion">Build the conclusion <ArrowRight size={16} /></Link></nav>
  </div></div>;
}
