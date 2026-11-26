import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { SKILL_ACCENT } from '@/data/practica/skill-accents';
import styles from '../IeltsHub.module.css';
import SpeakingRehearsal from './SpeakingRehearsal';
import { getSpeakingRehearsals } from './speaking-rehearsals';

const URL = 'https://www.idiomaswl.com/practica/ielts/speaking';
const OFFICIAL_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking';
const SCORING_URL = 'https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail';
const accent = { '--ielts-accent': SKILL_ACCENT.habla.var } as CSSProperties;

export const metadata: Metadata = {
  title: 'IELTS Speaking Practice: Three Parts and Four Criteria',
  description: 'Try all three parts with questions from Set 1, compare two recordings and hear what each of the four Speaking criteria asks you to do.',
  alternates: { canonical: URL },
};

export default function IeltsSpeakingPage() {
  return (
    <div className={styles.page} style={accent} lang="en">
      <div className={styles.shell}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/practica/ielts">IELTS</Link><span>/</span><span>Speaking</span>
        </nav>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>IELTS Speaking</p>
          <h1>Develop an answer you can actually say.</h1>
          <p className={styles.heroLead}>When someone asks whether you enjoy cooking, you can probably think of a meal before you can think of an impressive word. Start with that meal. The skill is deciding which detail this particular listener needs next.</p>
          <div className={styles.factGrid} aria-label="Speaking route at a glance">
            <div className={styles.fact}><strong>3 parts</strong><span>interview, long turn, discussion</span></div>
            <div className={styles.fact}><strong>11–14 min</strong><span>official test duration</span></div>
            <div className={styles.fact}><strong>4 criteria</strong><span>equally weighted</span></div>
            <div className={styles.fact}><strong>40 sets</strong><span>record and replay in practice</span></div>
          </div>
          <nav className={styles.lessonNav} aria-label="On this page">
            <a href="#three-parts">Three parts</a><a href="#develop">Try a prompt</a>
            <a href="#criteria">Four criteria</a><a href="#self-review">Review a recording</a><a href="#practice">Choose a set</a>
          </nav>
        </header>

        <section className={styles.section} id="three-parts" aria-labelledby="parts-title">
          <div className={styles.sectionHeading}>
            <h2 id="parts-title">What changes as the conversation moves on?</h2>
            <p>The examiner starts with experiences you know. Later you have the floor for a longer turn, then discuss a broader issue related to its topic.</p>
          </div>
          <div className={styles.articleGrid}>
            <article className={styles.editorialCard}>
              <span className={styles.cardLabel}>Part 1 · Interview · 4–5 minutes</span>
              <h3>Give the examiner something to ask about.</h3>
              <p>A question about food, home or work gives you somewhere familiar to start. Answer it and add a detail you can picture. If you usually cook for yourself, saying what you made last night can carry more meaning than a list of dishes.</p>
            </article>
            <article className={styles.editorialCard}>
              <span className={styles.cardLabel}>Part 2 · Long turn · 3–4 minutes</span>
              <h3>Stay with a moment long enough for us to see it.</h3>
              <p>You get one minute to prepare, then speak for one to two minutes. A few words for the setting, one event and your reaction can keep you going. If you reach the final cue quickly, go back to the detail that made the experience memorable. The examiner may ask a short follow-up.</p>
            </article>
            <article className={styles.editorialCard}>
              <span className={styles.cardLabel}>Part 3 · Discussion · 4–5 minutes</span>
              <h3>Help someone follow the reason for your view.</h3>
              <p>A story about visiting a workplace can lead to a question about why people choose their jobs. Think beyond the person you visited. What might be true for a new graduate? Would it still hold for someone supporting a family? You now have something to discuss.</p>
            </article>
          </div>
        </section>

        <section className={styles.section} id="develop" aria-labelledby="develop-title">
          <div className={styles.sectionHeading}>
            <h2 id="develop-title">Try a question from each part.</h2>
            <p>Say your answer aloud before opening the tutor’s example. If you use the microphone, you can keep two takes of each prompt in this tab and listen to both. Leaving or refreshing the page clears them.</p>
          </div>
          <SpeakingRehearsal parts={getSpeakingRehearsals()} />
        </section>

        <section className={styles.section} id="criteria" aria-labelledby="criteria-title">
          <div className={styles.sectionHeading}>
            <h2 id="criteria-title">What can you hear in your own answer?</h2>
            <p>An examiner considers four criteria across the whole interview. On a practice recording, pick one and listen for a moment you could improve.</p>
          </div>
          <div className={styles.articleGrid}>
            <article className={styles.editorialCard}>
              <span className={styles.cardLabel}>Fluency and coherence</span><h3>Could someone follow the change in your thinking?</h3>
              <p>Listen to your answer about salary. If you say “it depends” twice, listen for the point at which you name a condition. A brief pause followed by “once the rent is covered” gives the listener a way into your second idea.</p>
            </article>
            <article className={styles.editorialCard}>
              <span className={styles.cardLabel}>Lexical resource</span><h3>Did a word help the listener picture what you meant?</h3>
              <p>In the studio example you can almost see the change from a sketch to a model. If “sketch” escapes you, “the first drawing she did by hand” still gets that idea across. Try it without stopping your story to search for the perfect word.</p>
            </article>
            <article className={styles.editorialCard}>
              <span className={styles.cardLabel}>Grammatical range and accuracy</span><h3>Can the listener tell what happened when?</h3>
              <p>“She was preparing a proposal” sets the scene for the visit. “She showed me” moves it forward. On replay, notice a place where your time reference slips. Try that sentence again and listen for whether the order of events is clearer.</p>
            </article>
            <article className={styles.editorialCard}>
              <span className={styles.cardLabel}>Pronunciation</span><h3>Which words would a listener pick out?</h3>
              <p>Say “I used to cook on Sundays” once. Say it again as if someone had just guessed Saturdays. Hear where the emphasis lands? In your own recording, listen for a word ending or a stressed syllable that helped someone catch your meaning. That judgment needs your voice.</p>
            </article>
          </div>
        </section>

        <section className={styles.section} id="self-review" aria-labelledby="review-title">
          <div className={styles.sectionHeading}><h2 id="review-title">Compare your two takes.</h2></div>
          <div className={styles.prose}>
            <p>Listen to your first take until you hear a place where a friend might ask “what do you mean?” For example, “the visit was interesting” leaves the whole studio behind a single word. Write down what the friend would need to hear. Then switch to <strong>Second take</strong> and answer the original question again.</p>
            <p>Replay the same moment in both versions. Can you now hear what the person did, why you cared or where your view changed? Keep the part that sounds like you. The recorder lets you compare the versions by ear. An examiner would need the complete spoken performance to assign a Speaking band.</p>
          </div>
          <a href="#develop">Return to your recordings</a>
        </section>

        <section className={styles.section} id="practice" aria-labelledby="practice-title">
          <div className={styles.sectionHeading}>
            <h2 id="practice-title">Take the same skill into a fresh conversation.</h2>
            <p>Set 1 contains the full interview, cue card and discussion you sampled here. For a fresh attempt, open another set and see whether the same habit helps when the topic changes.</p>
          </div>
          <div className={styles.actions}>
            <Link href="/examenes/ielts/practica/set-1?mode=practice&skill=speaking">Practise the full Set 1 conversation</Link>
            <Link href="/practica/ielts/speaking/simulacros">Choose one of 40 Speaking sets</Link>
            <Link href="/examenes/ielts/practica/set-1/guiado">Read the Set 1 reference answers</Link>
          </div>
          <p className={styles.sourceNote}>IELTS explains the interview timing and the four equally weighted criteria. The two-take rehearsal is a WeLearn exercise. <a href={OFFICIAL_URL}>Official Speaking format</a> · <a href={SCORING_URL}>Official scoring guidance</a></p>
        </section>
      </div>
    </div>
  );
}
