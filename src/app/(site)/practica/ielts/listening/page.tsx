import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { SKILL_ACCENT } from '@/data/practica/skill-accents';
import ListeningPartExercises from './ListeningPartExercises';
import styles from '../IeltsHub.module.css';

const URL = 'https://www.idiomaswl.com/practica/ielts/listening';
const OFFICIAL_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening';
const SCORING_URL = 'https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail';
const accent = { '--ielts-accent': SKILL_ACCENT.escucha.var } as CSSProperties;

export const metadata: Metadata = {
  title: 'IELTS Listening Practice: Four Parts, Six Question Types',
  description: 'Listen to four short recordings, try each IELTS Listening question type and practise with audio, maps and answer sheets in 40 sets.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'IELTS Listening: Learn with Four Short Recordings',
    description: 'Listen, try a question and hear what settles it in each part of IELTS Listening.',
    url: URL,
    type: 'website',
    locale: 'en_US',
  },
};

const formats = [
  {
    id: 'multiple-choice',
    title: 'Multiple choice',
    intro: 'Read the stem before comparing the options. “Why did the visitors leave early?” asks for a cause. Three things can all happen on the trip and only one can explain the early departure.',
    example: 'Suppose you hear “The rain had cleared by then. It was the last bus we were worried about.” Rain really was part of the day. The bus explains the decision. For a question asking you to choose TWO, listen for a reason to keep each choice and enter both letters as directed.',
  },
  {
    id: 'matching',
    title: 'Matching',
    intro: 'Keep track of two things at once. One list might name three volunteers and the other list their jobs. Read the jobs first so you can recognise them in different words. “She’ll keep an eye on the figures” could point to the person managing the budget.',
    example: 'If one person offers to take notes and the chair later asks someone else to do it, keep listening until the assignment is settled. Put a name next to the job at that moment. Check the instructions before using any option twice.',
  },
  {
    id: 'map-labelling',
    title: 'Plan, map or diagram labelling',
    intro: 'On a plan, find your starting point and face the direction given by the speaker. “Walk past the café” leaves the café behind you. “Opposite the café” keeps it useful as a landmark. Both directions mention the same building and put you in different places.',
    example: 'On a diagram of a machine, use a fixed reference such as the inlet. Trace what comes next as the speaker describes it, then choose the label at the end of the correct line. If you lose your place on a map, wait for a named landmark you can see and pick up the route there.',
  },
  {
    id: 'form-completion',
    title: 'Form, note, table or flow-chart completion',
    intro: 'A form field tells you what counts as an answer. A table gives you both a row and a column. In a flow chart, the previous box and the arrow tell you which stage is missing. Read those neighbours before the talk begins.',
    example: 'A tour price labelled “child / return” rules out both an adult fare and a single fare. If the box already shows £, enter the amount. Some tasks give you a word list. When the instructions ask for words from the recording, keep the words you hear and stay within the printed limit.',
  },
  {
    id: 'sentence-completion',
    title: 'Sentence completion',
    intro: 'Read the whole printed sentence aloud in your head. A lecturer might say “We delayed the launch because of fog,” while the page says “The launch was delayed by _____.” The sentence has changed, but it still needs the cause.',
    example: 'With ONE WORD ONLY, “fog” fits the sound, the grammar and the limit. “Because of fog” explains the idea in conversation, yet it adds words the sentence has already taken care of. Before moving on, read across the gap once with your answer in place.',
  },
  {
    id: 'short-answers',
    title: 'Short-answer questions',
    intro: 'Start with the question word and its condition. “Where do people collect a pass after opening time?” can have a different answer from the same question about early arrivals. Listen until you know which group the speaker is talking about.',
    example: 'If the relevant phrase is “from the ticket office,” the question “Where?” can be answered with “ticket office”. Under NO MORE THAN TWO WORDS, “the ticket office” costs the mark. If a question asks for two things, leave room for both and follow its directions for entering them.',
  },
];

const faqs = [
  {
    question: 'Can I replay these clips?',
    answer: 'Yes. On the test you hear each recording once. Here you can listen again, check one answer and read the words from that clip. For a realistic first attempt in a full practice set, let the recording run and save your replays for review.',
  },
  {
    question: 'How do the practice sets and the guided sets fit together?',
    answer: 'The library has the Listening sections from 40 complete WeLearn Academic mocks. The first 20 also offer guided practice with timed evidence for each question after you check your block. The four short questions on this page are teaching examples based on excerpts from Set 2.',
  },
  {
    question: 'What does the estimated band tell me?',
    answer: 'It gives you a study estimate from a complete 40-question Listening attempt. The official raw scores required for individual bands can vary slightly between test versions. Treat the four examples here as feedback on particular listening decisions.',
  },
];

export default function IELTSListeningPage() {
  return (
    <>
      <CourseSchema name="IELTS Listening learning route" description="Learn the four parts and six question types with recorded practice." url={URL} educationalLevel="B1,B2,C1" teaches="IELTS Listening, prediction, distractors, correction, question types and audio review" inLanguage="en" />
      <LearningResourceJsonLd name="IELTS Listening learning route" url={URL} description="Four replayable excerpts with feedback and 40 full Listening sets." teaches={['four Listening parts', 'six question types', 'audio evidence', 'error review']} inLanguage="en" isPartOf={{ name: 'IELTS Practice', url: 'https://www.idiomaswl.com/practica/ielts' }} />
      <BreadcrumbJsonLd items={[{ name: 'Practice', url: 'https://www.idiomaswl.com/practica' }, { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' }, { name: 'Listening', url: URL }]} />
      <FaqJsonLd faqs={faqs} />

      <div className={styles.page} style={accent} lang="en">
        <div className={styles.shell}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/practica">Practice</Link><span>/</span>
            <Link href="/practica/ielts">IELTS</Link><span>/</span><span aria-current="page">Listening</span>
          </nav>
          <header className={styles.hero}>
            <p className={styles.eyebrow}>IELTS Academic · Listening</p>
            <h1>What did the speaker actually agree to?</h1>
            <p className={styles.heroLead}>You hear someone discuss two prices, or praise one idea and suggest changing another. Both details are real. The question tells you which one to take away. Try that decision for yourself in four short recordings, then use a full set to see how you do when the conversation keeps going.</p>
            <div className={styles.factGrid} aria-label="The IELTS Listening test">
              <div className={styles.fact}><strong>4 parts</strong><span>ten questions in each</span></div>
              <div className={styles.fact}><strong>About 30 minutes</strong><span>to follow the four recordings</span></div>
              <div className={styles.fact}><strong>One listen</strong><span>for each recording on the test</span></div>
              <div className={styles.fact}><strong>40 questions</strong><span>one mark for each correct answer</span></div>
            </div>
            <nav className={styles.lessonNav} aria-label="On this page">
              <a href="#listening-method">How to listen</a><a href="#four-parts">Try the four parts</a>
              <a href="#question-formats">Six question types</a><a href="#review-errors">Review a mistake</a>
              <a href="#practice">Full practice sets</a>
            </nav>
          </header>

          <section className={styles.section} id="listening-method" aria-labelledby="method-title">
            <div className={styles.sectionHeading}>
              <h2 id="method-title">Give yourself something to listen for</h2>
            </div>
            <div className={styles.prose}>
              <p>Imagine that the note in front of you reads “Collection point after 6 pm _____.” In the time before the recording starts, circle “after 6 pm” and expect a place. You can leave the place itself open. Predicting “the reception desk” now makes it easy to write those words the instant you hear them, even if the speaker is explaining when reception closes.</p>
              <p>Now listen to the thought all the way through. “We usually meet on Tuesday … actually, the room’s booked then” is still unfinished business. Keep your pencil moving when you hear the new arrangement. A word such as “actually” alerts you to listen on. What follows might change the plan, confirm its name or simply add a detail. Judge it from the rest of the sentence.</p>
              <p>The question numbers follow the recording. If you miss an answer and suddenly recognise the subject of the next question, move there. You can mark the uncertain one for checking later. Taking ten seconds to reconstruct a word from memory while the speaker moves on can cost you the next detail too.</p>
            </div>
          </section>

          <section className={styles.section} id="four-parts" aria-labelledby="four-parts-title">
            <div className={styles.sectionHeading}>
              <h2 id="four-parts-title">Hear what changes from Part 1 to Part 4</h2>
              <p>These short clips come from the existing Set 2 recording. Read the question, play the clip and try an answer. After you check it, you can read the words you heard and replay the moment that settles the question.</p>
            </div>
            <ListeningPartExercises />
          </section>

          <section className={styles.section} id="question-formats" aria-labelledby="formats-title">
            <div className={styles.sectionHeading}>
              <h2 id="formats-title">What does each question ask you to do?</h2>
              <p>IELTS groups Listening questions into six types. You can meet different types in the same part. Read the instruction for each new group, even if the layout looks familiar.</p>
            </div>
            <div className={styles.articleGrid}>
              {formats.map(format => (
                <article className={styles.editorialCard} key={format.id} id={format.id}>
                  <h3>{format.title}</h3>
                  <p>{format.intro}</p>
                  <p>{format.example}</p>
                </article>
              ))}
            </div>
            <div className={styles.prose}>
              <p className={styles.sourceNote}>In an instruction, “NO MORE THAN TWO WORDS AND/OR A NUMBER” allows fewer words, a number alone, or words with a number up to that limit. A hyphenated word counts as one. For each gap, check whether a unit, an article or a preposition is already printed beside it. <a href={OFFICIAL_URL}>IELTS Listening format and instructions</a>.</p>
            </div>
          </section>

          <section className={styles.section} id="review-errors" aria-labelledby="review-title">
            <div className={styles.sectionHeading}>
              <h2 id="review-title">What made your answer sound right at the time?</h2>
            </div>
            <div className={styles.prose}>
              <p>Keep your first answer on the page. Say what you thought you heard and replay the whole exchange once with the transcript closed. Now check the words. Being able to recognise a phrase on the page is different from catching it at the speed of the recording.</p>
              <p>Suppose you wrote a time that really was mentioned. If the speaker offered it and the other person turned it down, the sound was clear. What escaped you was the reply. Put the offered time beside the agreed time, replay the turn between them, and listen for that kind of reply in a fresh conversation.</p>
            </div>
            <div className={styles.articleGrid}>
              <article className={styles.editorialCard}><h3>“I understood it when I read it.”</h3><p>Find the few words either side of the answer. Play them, read them once, then close the text and listen again. Hear where the word begins in connected speech. In the next clip, try recognising that boundary without looking.</p></article>
              <article className={styles.editorialCard}><h3>“I heard it, and still lost the mark.”</h3><p>Put your answer into the printed gap. Check its spelling, the ending you heard, and the word count. If “at the station” gives you three words where only two fit, repairing your entry takes a different kind of practice from replaying the speaker ten times.</p></article>
              <article className={styles.editorialCard}><h3>“I lost my place.”</h3><p>In a talk, a phrase such as “That brings us to the second problem” can carry you to a new heading. In a discussion, listen for a new question or a change of speaker. Pick the next anchor on the page and practise rejoining there on a fresh first listen.</p></article>
              <article className={styles.editorialCard}><h3>“I recognised a word in the option.”</h3><p>Write the speaker’s whole point in a few everyday words. Was the idea recommended, criticised, or mentioned as an earlier possibility? Compare that sentence with the choices. Then try a new question where all the options share vocabulary with the recording.</p></article>
            </div>
          </section>

          <section className={styles.section} id="practice" aria-labelledby="practice-title">
            <div className={styles.sectionHeading}>
              <h2 id="practice-title">Take the next listen at your own pace</h2>
              <p>Open Set 2 to hear the conversations and talks around today’s clips. For a fresh attempt, choose another of the 40 full Listening sets. Set 22 includes a map to label in Part 2. Each set has a replayable recording, a student worksheet and a score after submission.</p>
            </div>
            <div className={styles.actions}>
              <Link href="/practica/ielts/listening/simulacros/practica/set-2">Hear the full Set 2</Link>
              <Link href="/practica/ielts/listening/simulacros/practica/set-22">Practise with the Set 22 map</Link>
              <Link href="/practica/ielts/listening/simulacros">Browse all 40 Listening sets</Link>
              <Link href="/examenes/ielts#practica">Open the complete mocks</Link>
            </div>
            <p className={styles.sourceNote}>If you want to review a particular question, the first 20 sets also offer timed evidence after you submit a block in guided mode. <Link href="/examenes/ielts/practica/set-1/guiado">Open guided Set 1</Link>.</p>
            <p className={styles.sourceNote}>The full sets report a WeLearn study estimate. IELTS explains how marks convert into bands and why the boundaries can vary. <a href={SCORING_URL}>How IELTS scores Listening</a>.</p>
          </section>

          <section className={styles.section} aria-labelledby="faq-title">
            <div className={styles.sectionHeading}><h2 id="faq-title">Using this route</h2></div>
            <div className={styles.articleGrid}>
              {faqs.map(faq => (
                <details className={styles.editorialCard} key={faq.question}>
                  <summary>{faq.question}</summary><p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
