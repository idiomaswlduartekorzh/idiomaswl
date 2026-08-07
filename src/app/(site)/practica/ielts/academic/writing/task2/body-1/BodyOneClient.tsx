'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, FilePenLine, Layers3 } from 'lucide-react';
import Task2OfficialReviewBlock from '../Task2OfficialReviewBlock';
import type { EssayTypeId } from '../introduccion/introduction-data';
import { BODY_ONE_LESSONS, bodyOneArchitecture } from './body-one-data';
import BodyOnePracticeEngine from './BodyOnePracticeEngine';
import BodyOneWorkshop from './BodyOneWorkshop';
import ColoredBodyParagraph from './ColoredBodyParagraph';
import styles from '../introduccion/page.module.css';

export default function BodyOneClient() {
  const [activeType, setActiveType] = useState<EssayTypeId>('opinion');
  const [activeExample, setActiveExample] = useState(1);
  const lesson = BODY_ONE_LESSONS.find((item) => item.id === activeType) ?? BODY_ONE_LESSONS[0];
  const workedExample = lesson.examples[0];
  const example = lesson.examples[activeExample];
  const architecture = bodyOneArchitecture(activeType);

  return <div lang="en" className={styles.page}><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={15} /> Task 2</Link><span>/</span><span>Body Paragraph 1</span></nav>
    <header className={styles.hero}><p className={styles.eyebrow}>Task 2 · Build the essay · Step 3</p><h1>Build IELTS Task 2 Body Paragraph 1</h1><p className={styles.heroLead}>Give the first body paragraph one truthful job, then develop it through a visible chain: claim, precision, explanation, example and link. The job changes with the prompt; the logic remains teachable.</p><div className={styles.factGrid}><div className={styles.fact}><strong>1 job</strong><span>one controlling idea per paragraph</span></div><div className={styles.fact}><strong>5 blocks</strong><span>each sentence performs a visible function</span></div><div className={styles.fact}><strong>80–110</strong><span>WeLearn study target, not an official paragraph limit</span></div><div className={styles.fact}><strong>5 families</strong><span>the Body 1 function changes with the instruction</span></div></div><div className={styles.heroActions}><a href="#guided-workshop">Practice with the boxes</a><a href="#practice-engine">Open the level engine</a></div></header>

    <section className={styles.section}><div className={styles.sectionHeading}><p className={styles.kicker}>Official format and WeLearn strategy</p><h2>IELTS assesses the complete response, not a fixed paragraph formula</h2></div><Task2OfficialReviewBlock focus="Develop one relevant Body 1 claim through a clear and logically supported progression." officialFormat="IELTS Academic Writing Task 2 requires a connected response of at least 250 words. It does not prescribe a fixed number of paragraphs, sentences or words for Body 1." welearnStrategy="WeLearn uses a frequent four-paragraph study architecture and an 80–110-word Body 1 target to make development visible. Writers should adapt it to the prompt and the complete essay." answerCheck="Every sentence should support one paragraph job that can be traced to the prompt and the thesis. Examples illustrate reasoning; they must not depend on invented studies or statistics." /></section>

    <section className={styles.section}><div className={styles.sectionHeading}><p className={styles.kicker}>Sentence Lego · Body 1</p><h2>The block sequence changes with the question type</h2><p>These labels are a learning scaffold. Select a question family below and the paragraph architecture, examples and exercises all change together.</p></div><div className={styles.legoRow}>{architecture.map((item, index) => <div key={item.label} className={`${styles.legoBlock} ${styles[item.tone]}`} style={{ animationDelay: `${index * 90}ms` }}><strong>{item.label}</strong><p>{item.purpose}</p></div>)}</div><div className={styles.bodyFormula}>{architecture.map((item, index) => <Fragment key={item.label}><span>{item.label}</span>{index < architecture.length - 1 && <ArrowRight size={18} />}</Fragment>)}</div></section>

    <section className={styles.section}><div className={styles.sectionHeading}><p className={styles.kicker}>Five question families</p><h2>Change the paragraph job before you change the sentences</h2><p>Select a family to see what Body 1 must achieve for that instruction.</p></div><div className={styles.typeTabs} role="tablist">{BODY_ONE_LESSONS.map((item) => <button key={item.id} type="button" role="tab" aria-selected={item.id === activeType} className={`${styles.typeTab} ${item.id === activeType ? styles.typeTabActive : ''}`} onClick={() => { setActiveType(item.id); setActiveExample(1); }}>{item.shortLabel}</button>)}</div><article className={styles.typePanel}><div className={styles.typeIntro}><div><h3>{lesson.label}</h3><p className={styles.signal}><strong>Instruction signal:</strong> {lesson.signal}</p><div className={styles.strategyList}><p><strong>Body 1 function:</strong> {lesson.function}</p><p><strong>Planning question:</strong> {lesson.planningQuestion}</p></div></div><p className={styles.trap}><strong>Common trap</strong><br />{lesson.trap}</p></div></article></section>

    <section id="guided-workshop" className={styles.section}><div className={styles.sectionHeading}><p className={styles.kicker}>Watch one · then do four</p><h2>Study one complete paragraph, then build four</h2><p>The demonstration and workshop use the same five blocks so the transition from explanation to action is predictable.</p></div>
      <article className={`${styles.examplePanel} ${styles.workedExample}`}>
        <div className={styles.workedBadge}>Worked example · {workedExample.title}</div>
        <div className={styles.promptCard}><span>IELTS-style prompt</span><p>{workedExample.prompt}</p></div>
        <p className={styles.paragraphJob}><strong>Body 1 job:</strong> {workedExample.paragraphJob}</p>
        <div className={styles.modelBlockGrid}>{workedExample.blocks.map((item, index) => <article key={item.label} className={styles[item.tone]} style={{ animationDelay: `${index * 80}ms` }}><strong>{item.label}</strong><p>{item.text}</p><small>{item.purpose}</small></article>)}</div>
        <div className={styles.completeParagraph}><strong>Read the blocks as one paragraph</strong><ColoredBodyParagraph blocks={workedExample.blocks} /></div>
        <p className={styles.mistakeNote}><strong>Precision check:</strong> {workedExample.commonMistake}</p>
      </article>
      <div className={styles.tryDivider}><span>Now you try</span><p>The model remains hidden until you choose an aligned topic sentence and write all four development blocks.</p></div>
      <div className={styles.exampleTabs}>{lesson.examples.slice(1).map((item, offset) => { const index = offset + 1; return <button key={item.title} type="button" className={`${styles.exampleTab} ${activeExample === index ? styles.exampleTabActive : ''}`} onClick={() => setActiveExample(index)}>{String(index + 1).padStart(2, '0')} · {item.title}</button>; })}</div>
      <article className={styles.examplePanel}><div className={styles.promptCard}><span>Your IELTS-style prompt</span><p>{example.prompt}</p></div><BodyOneWorkshop key={`${activeType}-${activeExample}`} example={example} seed={activeExample + BODY_ONE_LESSONS.findIndex((item) => item.id === activeType)} /></article>
    </section>

    <BodyOnePracticeEngine essayType={activeType} />

    <section className={styles.section}><div className={styles.sectionHeading}><p className={styles.kicker}>Frequently asked questions</p><h2>Develop Body 1 without becoming formulaic</h2></div><div className={styles.faqGrid}><article><h3>How many words should Body 1 contain?</h3><p>IELTS sets no paragraph word count. WeLearn uses roughly 80–110 words as a study target, then adjusts it to the prompt and the complete 250+ word response.</p></article><article><h3>Must Body 1 always present my first reason?</h3><p>No. It presents the first reason in an opinion essay, but may explain the first view, analyse requested problems or answer the first direct question in other prompts.</p></article><article><h3>Does every paragraph need a real-world statistic?</h3><p>No. A clear, plausible example can illustrate reasoning. Do not invent a named study, authority or exact statistic.</p></article><article><h3>Can one sentence perform two blocks?</h3><p>Yes. The labels make logic visible during practice; fluent writing may combine a main idea with explanation or an example with its link.</p></article></div></section>

    <nav className={styles.nextLinks}><Link href="/practica/ielts/academic/writing/task2/analisis-pregunta">Analyse the prompt</Link><Link href="/practica/ielts/academic/writing/task2/introduccion"><FilePenLine size={18} /> Build the introduction</Link><Link href="/practica/ielts/academic/writing/task2/body-2"><Layers3 size={18} /> Build Body 2 <ArrowRight size={16} /></Link></nav>
  </div></div>;
}
