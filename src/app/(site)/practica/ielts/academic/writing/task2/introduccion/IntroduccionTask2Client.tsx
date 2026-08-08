'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, FileText, Layers3, Target } from 'lucide-react';
import Task2OfficialReviewBlock from '../Task2OfficialReviewBlock';
import IntroductionPracticeEngine from './IntroductionPracticeEngine';
import { ESSAY_TYPES, INTRO_SENTENCE_TYPES, type EssayTypeId } from './introduction-data';
import styles from './page.module.css';

const FACTS = [
  { value: '250+', label: 'minimum words for the complete Task 2 response' },
  { value: '≈40 min', label: 'recommended time for the complete Task 2 response' },
  { value: '2×', label: 'the weighting of Task 2 compared with Task 1' },
  { value: '4 criteria', label: 'Task Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy' },
];

const SENTENCE_FORMS = [
  {
    title: 'Simple sentence',
    text: 'One independent clause. Useful when a direct position needs maximum clarity: “I strongly oppose this policy.”',
  },
  {
    title: 'Compound sentence',
    text: 'Two balanced independent clauses joined accurately. Useful when two direct answers carry equal weight.',
  },
  {
    title: 'Complex sentence',
    text: 'A main clause plus a dependent clause. Useful for cause, condition, concession or qualification, not for decoration.',
  },
];

function getLesson(id: EssayTypeId) {
  return ESSAY_TYPES.find((lesson) => lesson.id === id) ?? ESSAY_TYPES[0];
}

export default function IntroduccionTask2Client() {
  const [activeType, setActiveType] = useState<EssayTypeId>('opinion');
  const [activeExamples, setActiveExamples] = useState<Record<EssayTypeId, number>>({
    opinion: 0,
    discussion: 0,
    'problem-solution': 0,
    'advantages-disadvantages': 0,
    'direct-questions': 0,
  });
  const [activeSentence, setActiveSentence] = useState(0);
  const lesson = getLesson(activeType);

  return (
    <div lang="en" className={styles.page}>
      <div className={styles.shell}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/practica/ielts/academic/writing/task2"><ArrowLeft size={15} aria-hidden="true" /> Task 2</Link>
          <span aria-hidden="true">/</span>
          <span>Introduction</span>
        </nav>

        <header className={styles.hero}>
          <p className={styles.eyebrow}>IELTS Academic Writing Task 2</p>
          <h1>Build an introduction that controls the whole essay</h1>
          <p className={styles.heroLead}>
            Learn to analyse the instruction, paraphrase its meaning and write a thesis that creates the correct route for each essay type. The introduction is not a memorised opening: it is the first working part of your argument.
          </p>
          <div className={styles.factGrid} aria-label="Official Task 2 facts">
            {FACTS.map((fact) => <div key={fact.value} className={styles.fact}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
          </div>
        </header>

        <section className={styles.section} aria-labelledby="official-strategy-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Official format and WeLearn strategy</p>
            <h2 id="official-strategy-heading">Know what IELTS requires and what this lesson recommends</h2>
          </div>
          <Task2OfficialReviewBlock
            focus="Write an accurate paraphrase and a thesis that matches the exact question."
            officialFormat="IELTS Academic Writing Task 2 requires a connected essay of at least 250 words. IELTS recommends spending about 40 minutes; an introduction is part of that response, not a separate official task."
            welearnStrategy="WeLearn usually builds the introduction from a precise paraphrase and an aligned thesis. A position or roadmap is added only when the prompt needs it."
            answerCheck="A strong introduction preserves the prompt's meaning, answers its instruction and creates a truthful route into the body paragraphs."
          />
        </section>

        <section className={styles.section} aria-labelledby="architecture-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Essay architecture</p>
            <h2 id="architecture-heading">The same blocks perform different jobs in different questions</h2>
            <p>IELTS does not prescribe one universal paragraph template. Start with the instruction, then choose only the blocks that help answer it.</p>
          </div>
          <div className={styles.architecture}>
            {ESSAY_TYPES.map((type) => (
              <article key={type.id} className={styles.architectureCard}>
                <h3>{type.shortLabel}</h3>
                <p><strong>Introduction:</strong> {type.blocks.map((block) => block.label).join(' + ')}</p>
                <p><strong>Body 1:</strong> {type.bodyOne}</p>
                <p><strong>Body 2:</strong> {type.bodyTwo}</p>
                <p><strong>Body 3:</strong> {type.bodyThree}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="type-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Prompt analysis</p>
            <h2 id="type-heading">Choose the question family before you write</h2>
            <p>The wording of the instruction determines the thesis, the body route and whether a personal position is required.</p>
          </div>
          <div className={styles.typeTabs} role="tablist" aria-label="Task 2 essay types">
            {ESSAY_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                role="tab"
                aria-selected={activeType === type.id}
                className={`${styles.typeTab} ${activeType === type.id ? styles.typeTabActive : ''}`}
                onClick={() => setActiveType(type.id)}
              >
                {type.shortLabel}
              </button>
            ))}
          </div>
          <article className={styles.typePanel} role="tabpanel">
            <div className={styles.typeIntro}>
              <div>
                <h3>{lesson.label}</h3>
                <p className={styles.signal}><strong>Prompt signal:</strong> {lesson.signal}</p>
                <div className={styles.strategyList}>
                  <p><strong>What the answer must do:</strong> {lesson.mustAnswer}</p>
                  <p><strong>Position:</strong> {lesson.position}</p>
                  <p><strong>Conclusion:</strong> {lesson.conclusion}</p>
                </div>
              </div>
              <p className={styles.trap}><strong>Common Task Response trap</strong><br />{lesson.trap}</p>
            </div>
            <div className={styles.legoRow} aria-label={`${lesson.shortLabel} introduction blocks`}>
              {lesson.blocks.map((block, index) => (
                <div key={block.label} className={`${styles.legoBlock} ${styles[block.tone]}`} style={{ animationDelay: `${index * 90}ms` }}>
                  <strong>{block.label}{block.optional ? ' · optional' : ''}</strong>
                  <p>{block.text}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className={styles.section} aria-labelledby="guided-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Five guided examples per question family</p>
            <h2 id="guided-heading">Watch the same method adapt to different prompts</h2>
            <p>Each model reveals the prompt instruction, the body route and the exact function of every introduction sentence.</p>
          </div>
          {ESSAY_TYPES.map((type) => (
            <div key={type.id} hidden={type.id !== activeType}>
              <div className={styles.exampleTabs} role="tablist" aria-label={`${type.shortLabel} guided examples`}>
                {type.examples.map((example, index) => (
                  <button
                    key={example.title}
                    type="button"
                    role="tab"
                    aria-selected={activeExamples[type.id] === index}
                    className={`${styles.exampleTab} ${activeExamples[type.id] === index ? styles.exampleTabActive : ''}`}
                    onClick={() => setActiveExamples((current) => ({ ...current, [type.id]: index }))}
                  >
                    {String(index + 1).padStart(2, '0')} · {example.title}
                  </button>
                ))}
              </div>
              {type.examples.map((example, index) => (
                <article key={example.title} hidden={activeExamples[type.id] !== index} className={styles.examplePanel} role="tabpanel">
                  <h3>{example.title}</h3>
                  <div className={styles.exampleGrid}>
                    <div className={styles.promptCard}><span>IELTS-style prompt</span><p>{example.prompt}</p></div>
                    <div className={styles.analysisCard}><span>Prompt analysis</span><p><strong>{example.instruction}</strong></p><p>{example.plan}</p></div>
                  </div>
                  <div className={styles.legoRow} aria-label="Model introduction blocks">
                    {example.blocks.map((block, blockIndex) => (
                      <div key={`${block.label}-${block.text}`} className={`${styles.legoBlock} ${styles[block.tone]}`} style={{ animationDelay: `${blockIndex * 90}ms` }}>
                        <strong>{block.label}</strong><p>{block.text}</p>
                      </div>
                    ))}
                  </div>
                  <ul className={styles.whyList}>{example.whyItWorks.map((reason) => <li key={reason}>{reason}</li>)}</ul>
                </article>
              ))}
            </div>
          ))}
        </section>

        <section className={styles.section} aria-labelledby="sentences-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Sentence types as Lego blocks</p>
            <h2 id="sentences-heading">Choose a sentence for its job, not for its complexity</h2>
            <p>A higher band comes from accurate, purposeful control. A complex sentence that hides the answer is weaker than a clear simple sentence that performs the right function.</p>
          </div>
          <div className={styles.sentenceGrid}>
            {SENTENCE_FORMS.map((form) => <article key={form.title} className={styles.sentenceMini}><h3>{form.title}</h3><p>{form.text}</p></article>)}
          </div>
          <div className={styles.sentenceTabs} role="tablist" aria-label="Introduction sentence functions">
            {INTRO_SENTENCE_TYPES.map((type, index) => (
              <button
                key={type.name}
                type="button"
                role="tab"
                aria-selected={activeSentence === index}
                className={`${styles.sentenceTab} ${activeSentence === index ? styles.sentenceTabActive : ''}`}
                onClick={() => setActiveSentence(index)}
              >
                {type.name}
              </button>
            ))}
          </div>
          {INTRO_SENTENCE_TYPES.map((type, index) => (
            <article key={type.name} hidden={activeSentence !== index} className={styles.sentencePanel} role="tabpanel">
              <div className={styles.sentenceDetails}>
                <div>
                  <h3>{type.name}</h3>
                  <p><strong>Purpose:</strong> {type.purpose}</p>
                  <p><strong>Placement:</strong> {type.placement}</p>
                  <p><strong>Best for:</strong> {type.bestFor}</p>
                  <p className={styles.frame}>{type.frame}</p>
                </div>
                {/*
                  El enunciado va PRIMERO y encabeza el par. Sin él, las dos versiones eran
                  frases sueltas sobre temas distintos y no se podía juzgar lo único que
                  importa: si el significado sobrevivió al reescribirlo.
                */}
                <div className={styles.weakStrong}>
                  <p className={styles.sourcePrompt}><strong>The prompt both attempts answer</strong><br />{type.source}</p>
                  <p className={styles.weak}><strong>Weak attempt</strong><br />{type.weak}</p>
                  <p className={styles.strong}><strong>Stronger attempt</strong><br />{type.strong}</p>
                  <dl className={styles.transferList}>
                    <dt>Meaning that must not change</dt>
                    <dd>{type.preserved}</dd>
                    <dt>Wording that moved</dt>
                    <dd>{type.changed}</dd>
                  </dl>
                  <p>{type.improvement}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <IntroductionPracticeEngine essayType={activeType} />

        <section className={styles.section} aria-labelledby="faq-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Frequently asked questions</p>
            <h2 id="faq-heading">Use this lesson as part of a complete Task 2 response</h2>
          </div>
          <div className={styles.faqGrid}>
            <article>
              <h3>Is this page a separate official IELTS task?</h3>
              <p>No. It is a WeLearn learning resource for practising a skill or prompt type used within IELTS Academic Writing Task 2.</p>
            </article>
            <article>
              <h3>How should this practice be used in a complete response?</h3>
              <p>Practise the target skill, review the explanation and then transfer it to a complete Task 2 essay of at least 250 words.</p>
            </article>
          </div>
        </section>

        <nav className={styles.nextLinks} aria-label="Continue Task 2 study">
          <Link href="/practica/ielts/academic/writing/task2/analisis-pregunta"><Target size={18} aria-hidden="true" /> Analyse the prompt first</Link>
          <Link href="/practica/ielts/academic/writing/task2/body-1"><Layers3 size={18} aria-hidden="true" /> Build Body Paragraph 1</Link>
          <Link href="/practica/ielts/academic/writing/task2/tarea-completa"><FileText size={18} aria-hidden="true" /> Practise a complete Task 2 response <ArrowRight size={16} aria-hidden="true" /></Link>
        </nav>
      </div>
    </div>
  );
}
