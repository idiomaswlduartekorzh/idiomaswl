import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { SKILL_ACCENT } from '@/data/practica/skill-accents';
import styles from '../IeltsHub.module.css';

const URL = 'https://www.idiomaswl.com/practica/ielts/listening';
const OFFICIAL_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening';
const accent = { '--ielts-accent': SKILL_ACCENT.escucha.var } as CSSProperties;

export const metadata: Metadata = {
  title: 'IELTS Listening: How to Listen, Question Types and 40 Practice Sets',
  description: 'Learn how to follow IELTS Listening, handle corrections and distractors, answer each question format and review 40 sets with audio evidence.',
  alternates: { canonical: URL },
  openGraph: { title: 'IELTS Listening: Method and Practice', description: 'A detailed Listening route with explanations, audio review and 40 WeLearn practice sets.', url: URL, type: 'website', locale: 'en_US' },
};

const parts = [
  { title: 'Part 1 · A practical conversation', detail: 'Names, dates, addresses and arrangements often sound simple until a speaker changes a detail. If you hear two times, ask which one was finally agreed, not which one you recognised first.' },
  { title: 'Part 2 · One speaker, a place or service', detail: 'The talk may describe a facility, event or route. Listen for the speaker’s order: an introduction, areas or stages, then a change of topic. On a map, locate the starting point before following directions.' },
  { title: 'Part 3 · An academic discussion', detail: 'Students and a tutor may compare proposals, reject an initial idea and settle on another. The answer can depend on who said something and whether it was a suggestion or the final decision.' },
  { title: 'Part 4 · A lecture', detail: 'The speaker develops a subject rather than exchanging short turns. Headings and notes help you anticipate the structure. A missed word should not make you lose the next three answers.' },
] as const;

const faqs = [
  { question: 'Can I pause and replay the audio in WeLearn practice?', answer: 'Yes. Practice is untimed and replayable so you can investigate an error. In the IELTS test the recording is played once; use a first uninterrupted listen when you want to test exam readiness.' },
  { question: 'Are the 40 sets different from the complete mocks?', answer: 'No. The skill route uses the Listening sections of the same Academic mock sets. The first 20 also have a guided route that reveals a timed evidence clip after you answer.' },
  { question: 'Does the estimated band equal an official result?', answer: 'No. It is a study estimate based on the number correct. IELTS says raw-score boundaries can vary slightly between test versions.' },
];

export default function IELTSListeningPage() {
  return <>
    <CourseSchema name="IELTS Listening learning route" description="A detailed method for four-part IELTS Listening with 40 replayable practice sets." url={URL} educationalLevel="B1,B2,C1" teaches="IELTS Listening, predicting answer form, distractors, completion, multiple choice, matching" inLanguage="en" />
    <LearningResourceJsonLd name="IELTS Listening learning route" url={URL} description="Learn how to listen, answer and review before choosing a complete practice set." teaches={['four Listening parts', 'question formats', 'audio evidence', 'error review']} inLanguage="en" isPartOf={{ name: 'IELTS Practice', url: 'https://www.idiomaswl.com/practica/ielts' }} />
    <BreadcrumbJsonLd items={[{ name: 'Practice', url: 'https://www.idiomaswl.com/practica' }, { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' }, { name: 'Listening', url: URL }]} />
    <FaqJsonLd faqs={faqs} />

    <div className={styles.page} style={accent} lang="en"><div className={styles.shell}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica">Practice</Link><span>/</span><Link href="/practica/ielts">IELTS</Link><span>/</span><span>Listening</span></nav>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>IELTS Academic · Listening learning route</p>
        <h1>Listen for the decision, not just the word.</h1>
        <p className={styles.heroLead}>A recording can contain the exact word you expected and still lead you to the wrong answer. Learn how the four parts develop, how each question format directs your attention, and how to use a replay to understand a mistake rather than memorise a key.</p>
        <div className={styles.factGrid} aria-label="Listening route at a glance"><div className={styles.fact}><strong>4 parts</strong><span>from everyday to academic contexts</span></div><div className={styles.fact}><strong>40 questions</strong><span>in each complete set</span></div><div className={styles.fact}><strong>40 sets</strong><span>for independent practice</span></div><div className={styles.fact}><strong>20 guided</strong><span>with question-level audio evidence</span></div></div>
        <nav className={styles.lessonNav} aria-label="On this page"><a href="#four-parts">Four parts</a><a href="#listening-method">Listening method</a><a href="#question-formats">Question formats</a><a href="#review-errors">Review errors</a><a href="#practice">Choose practice</a></nav>
      </header>

      <section className={styles.section} id="four-parts" aria-labelledby="four-parts-title">
        <div className={styles.sectionHeading}><p className={styles.kicker}>Understand the recording</p><h2 id="four-parts-title">The setting changes; the evidence rule stays the same.</h2><p>Every answer has to fit both the question and what the speaker actually means at that point in the recording.</p></div>
        <div className={styles.articleGrid}>{parts.map((part, index) => <article className={styles.editorialCard} key={part.title}><span className={styles.cardLabel}>Part {index + 1}</span><h3>{part.title}</h3><p>{part.detail}</p></article>)}</div>
      </section>

      <section className={styles.section} id="listening-method" aria-labelledby="method-title">
        <div className={styles.sectionHeading}><p className={styles.kicker}>A repeatable method</p><h2 id="method-title">Prepare the gap, follow the talk, then verify the form.</h2></div>
        <div className={styles.prose}>
          <p>Before the audio begins, read the instruction and look at the few questions ahead of you. A blank after “at” may need a time or place; a blank after “the” may need a noun. This prediction is useful because it tells you what kind of sound to catch. It is not a guess at the answer. If the talk gives a different but valid form, the recording wins.</p>
          <p>While listening, keep your place in the question sequence. IELTS Listening questions follow the order of the recording, but the speaker does not pause for you to finish writing. Listen through a correction: “We first planned Tuesday, but the room is only available on Thursday” makes Thursday the final arrangement. The earlier day is audible and tempting precisely because it is relevant to the conversation.</p>
          <p>When you miss a detail, leave a small mark and move on. Staying mentally attached to one blank costs the next answer. At the end, return to spelling, plurals and the printed word limit. A correct idea in the wrong grammatical form can still fail to complete the sentence.</p>
        </div>
        <div className={styles.example}><p><strong>What to hear:</strong> “We were going to meet at seven, but the tutor moved it to half past six.”</p><p><strong>What to write:</strong> If the question asks for the agreed time, write 6:30. Seven is a real detail in the audio, but it is no longer the decision.</p></div>
      </section>

      <section className={styles.section} id="question-formats" aria-labelledby="formats-title">
        <div className={styles.sectionHeading}><p className={styles.kicker}>Question formats</p><h2 id="formats-title">The question tells you what kind of listening to do.</h2><p>Train these moves separately, then combine them in a full set.</p></div>
        <div className={styles.articleGrid}>
          <article className={styles.editorialCard}><span className={styles.cardLabel}>Completion</span><h3>Forms, notes, tables and sentences</h3><p>Read around each gap to predict whether you need a name, number, place, noun or short phrase. Hear the full phrase before writing: a nearby word may sound plausible but fail the grammar of the printed sentence. Keep exactly to the instruction’s word and number limit; do not add articles or explanations just to make your answer sound complete.</p></article>
          <article className={styles.editorialCard}><span className={styles.cardLabel}>Selection</span><h3>Multiple choice</h3><p>Read the question stem before the options. Ask whether it wants a reason, opinion, final choice or factual detail. The recording may mention every option. Cross out an option only when you know why it is rejected or outside the scope of the question. A repeated keyword is a place to investigate, not proof.</p></article>
          <article className={styles.editorialCard}><span className={styles.cardLabel}>Relationships</span><h3>Matching</h3><p>Keep a short label for each speaker, place or feature. When a student proposes an idea and the tutor disagrees, do not attach the final decision to the student’s first suggestion. Listen for agreement, contrast and reassignment. Some options may be used once, more than once or not at all, depending on the printed instruction.</p></article>
          <article className={styles.editorialCard}><span className={styles.cardLabel}>Space</span><h3>Plans, maps and diagrams</h3><p>Find the entrance or starting point and orient the image before the talk begins. Follow one movement at a time: past, opposite, at the far end, on the left. If you lose orientation, use the next unmistakable landmark to rejoin the route. Guessing from a label’s position on the page is less reliable than tracking the speaker’s path.</p></article>
        </div>
      </section>

      <section className={styles.section} id="review-errors" aria-labelledby="review-title">
        <div className={styles.sectionHeading}><p className={styles.kicker}>Make a replay useful</p><h2 id="review-title">Find the moment your reasoning changed course.</h2></div>
        <div className={styles.prose}>
          <p>On a first attempt, listen without stopping if you want to measure how you perform under exam conditions. In the WeLearn practice route you can then replay freely. Return to an uncertain question, play the surrounding sentence and ask three things: what did I write, what exact phrase supports the answer, and what made my version attractive? The answer may be a correction you missed, a similar word in the wrong context or an ending that changed the meaning of the sentence.</p>
          <p>Do not treat every wrong answer as a “listening problem.” If you heard the detail but wrote too many words, practise the instruction. If you selected a speaker’s first suggestion, practise tracking decisions. If you lost the next question while fixing spelling, practise moving on and returning later. Each cause suggests a different next exercise.</p>
        </div>
        <ol className={styles.stepList}><li><span>01 · Attempt</span><h3>Listen once</h3><p>Complete a set without pausing to see what survives at natural pace.</p></li><li><span>02 · Investigate</span><h3>Replay the evidence</h3><p>Use the timed clip in a guided set or rewind the recording around the uncertain item.</p></li><li><span>03 · Transfer</span><h3>Try a new set</h3><p>Apply the same decision rule to a fresh question instead of repeating a remembered answer.</p></li></ol>
      </section>

      <section className={styles.section} id="practice" aria-labelledby="practice-title"><div className={styles.sectionHeading}><p className={styles.kicker}>Put it to work</p><h2 id="practice-title">Choose the kind of practice you need.</h2><p>Start with an untimed set if you need room to investigate. Use the guided Set 1 to see how a question, answer and audio excerpt connect. Move to a complete mock when you want the whole exam flow.</p></div><div className={styles.actions}><Link href="/practica/ielts/listening/simulacros">Choose one of 40 Listening sets</Link><Link href="/examenes/ielts/practica/set-1/guiado">Try guided Set 1</Link><Link href="/examenes/ielts#practica">Full mocks</Link></div><p className={styles.sourceNote}><strong>Scope:</strong> WeLearn practice lets you replay and gives an estimated study band. The actual IELTS recording is played once, and band boundaries may vary slightly by version. Check the <a href={OFFICIAL_URL}>official Listening format</a>.</p></section>

      <section className={styles.section} aria-labelledby="faq-title"><div className={styles.sectionHeading}><p className={styles.kicker}>Questions</p><h2 id="faq-title">Using this route</h2></div><div className={styles.articleGrid}>{faqs.map(faq => <details className={styles.editorialCard} key={faq.question}><summary><strong>{faq.question}</strong></summary><p>{faq.answer}</p></details>)}</div></section>
    </div></div>
  </>;
}
