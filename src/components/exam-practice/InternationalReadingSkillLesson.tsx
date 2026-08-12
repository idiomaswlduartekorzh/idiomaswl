import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/exam-practice/StructuredData';
import { PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';
import styles from './InternationalReadingSkillLesson.module.css';

type Fact = { label: string; value: string };
type Point = { title: string; text: string };
type Faq = { question: string; answer: string };

export interface InternationalReadingSkillLessonProps {
  slug: string;
  path?: string;
  indexPath?: string;
  indexName?: string;
  lessonLabel?: string;
  name: string;
  title: string;
  description: string;
  directAnswer: string;
  facts: Fact[];
  outcomes: Point[];
  method: Point[];
  weakExample: string;
  strongExample: string;
  independentPractice: string[];
  independentPracticeExperience?: ReactNode;
  progressEngine?: ReactNode;
  checklist: string[];
  faqs: Faq[];
  practice: ReactNode;
  accent?: string;
  officialNote: string;
  nextLinks: Array<{ href: string; label: string; primary?: boolean }>;
}

export default function InternationalReadingSkillLesson({
  slug,
  path: explicitPath,
  indexPath = '/practica/ielts/reading/habilidades',
  indexName = 'Reading Skills',
  lessonLabel = 'IELTS Academic Reading · Skill lesson',
  name,
  title,
  description,
  directAnswer,
  facts,
  outcomes,
  method,
  weakExample,
  strongExample,
  independentPractice,
  independentPracticeExperience,
  progressEngine,
  checklist,
  faqs,
  practice,
  accent = '#0369a1',
  officialNote,
  nextLinks,
}: InternationalReadingSkillLessonProps) {
  const path = explicitPath ?? `/practica/ielts/reading/habilidades/${slug}`;
  const url = `${PRACTICE_BASE_URL}${path}`;
  const skillStyle = { '--skill-accent': accent } as CSSProperties;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LearningResource',
            name: title,
            url,
            description,
            learningResourceType: ['Lesson', 'Practice', 'Quiz'],
            educationalUse: ['practice', 'self-study'],
            teaches: [name, 'IELTS Academic Reading', 'evidence-based reading'],
            inLanguage: 'en',
            isAccessibleForFree: true,
            provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: PRACTICE_BASE_URL },
            isPartOf: { '@type': 'Course', name: indexName, url: `${PRACTICE_BASE_URL}${indexPath}` },
          }).replace(/</g, '\\u003c'),
        }}
      />
      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Practice', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'IELTS', url: `${PRACTICE_BASE_URL}/practica/ielts` },
          { name: 'Reading', url: `${PRACTICE_BASE_URL}/practica/ielts/reading` },
          { name: indexName, url: `${PRACTICE_BASE_URL}${indexPath}` },
          { name, url },
        ]}
      />

      <div className={styles.page} style={skillStyle} lang="en">
        <div className={styles.shell}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/practica">Practice</Link><span aria-hidden="true">/</span>
            <Link href="/practica/ielts">IELTS</Link><span aria-hidden="true">/</span>
            <Link href="/practica/ielts/reading">Reading</Link><span aria-hidden="true">/</span>
            <Link href={indexPath}>{indexName}</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{name}</span>
          </nav>

          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{lessonLabel}</p>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.lede}>{description}</p>
            </div>
            <aside className={styles.facts} aria-label={`${name} at a glance`}>
              {facts.map((fact) => (
                <div className={styles.fact} key={fact.label}>
                  <span>{fact.label}</span><strong>{fact.value}</strong>
                </div>
              ))}
            </aside>
          </header>

          <p className={styles.answer}><strong>Short answer:</strong> {directAnswer}</p>

          <section className={styles.section} aria-labelledby="outcomes-heading">
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>What this skill changes</p>
              <h2 id="outcomes-heading">Use it with a clear purpose</h2>
              <p>A useful reading skill changes what you notice, what you ignore and how you prove an answer.</p>
            </div>
            <div className={styles.gridThree}>
              {outcomes.map((point) => <article className={styles.card} key={point.title}><h3>{point.title}</h3><p>{point.text}</p></article>)}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="method-heading">
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>WeLearn method</p>
              <h2 id="method-heading">A repeatable process, not a shortcut</h2>
              <p>Follow these steps until the sequence becomes automatic under time pressure.</p>
            </div>
            <div className={`${styles.gridTwo} ${independentPracticeExperience ? styles.followupGrid : ''}`}>
              {method.map((point, index) => (
                <article className={styles.card} key={point.title}>
                  <span className={styles.stepNumber}>{index + 1}</span><h3>{point.title}</h3><p>{point.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="example-heading">
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Worked contrast</p>
              <h2 id="example-heading">See the difference before you practise</h2>
            </div>
            <div className={styles.gridTwo}>
              <article className={`${styles.example} ${styles.weak}`}><h3>Weak move</h3><p>{weakExample}</p></article>
              <article className={`${styles.example} ${styles.good}`}><h3>Strong move</h3><p>{strongExample}</p></article>
            </div>
          </section>

          <section className={`${styles.section} ${styles.practice}`} aria-labelledby="guided-practice-heading">
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Guided practice</p>
              <h2 id="guided-practice-heading">Apply the method with immediate feedback</h2>
              <p>Make a decision first. Then use the explanation to compare your reasoning with the evidence.</p>
            </div>
            {practice}
          </section>

          <section className={styles.section} aria-labelledby="independent-heading">
            {independentPracticeExperience && (
              <>
                <div className={styles.sectionHeader}>
                  <p className={styles.eyebrow}>Independent practice</p>
                  <h2 id="independent-heading">Transfer the method to a new passage</h2>
                  <p>Complete the full set before feedback opens. This checks whether the process survives without step-by-step prompting.</p>
                </div>
                {independentPracticeExperience}
              </>
            )}
            <div className={styles.gridTwo}>
              <article className={styles.card}>
                <div className={styles.sectionHeader}>
                  <p className={styles.eyebrow}>{independentPracticeExperience ? 'Independent protocol' : 'Independent practice'}</p>
                  <h2 id={independentPracticeExperience ? undefined : 'independent-heading'}>{independentPracticeExperience ? 'Repeat the set without weakening the evidence rule' : 'Transfer the skill to a new passage'}</h2>
                </div>
                <ol className={styles.checklist}>{independentPractice.map((item) => <li key={item}>{item}</li>)}</ol>
              </article>
              <article className={styles.card}>
                <div className={styles.sectionHeader}>
                  <p className={styles.eyebrow}>Mastery check</p>
                  <h2>You are ready to move on when…</h2>
                </div>
                <ul className={styles.checklist}>{checklist.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            </div>
          </section>

          {progressEngine && (
            <section className={styles.section} aria-label={`${name} progressive practice`}>
              {progressEngine}
            </section>
          )}

          <section className={styles.section} aria-labelledby="faq-heading" lang="es">
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>FAQ en español</p>
              <h2 id="faq-heading">Preguntas frecuentes</h2>
              <p>Esta es la única sección de la lección que se conserva en español.</p>
            </div>
            <div className={styles.faq}>
              {faqs.map((faq) => <article className={styles.faqCard} key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="next-heading">
            <article className={styles.sourceCard}>
              <p className={styles.eyebrow}>Continue your Reading pathway</p>
              <h2 id="next-heading">Turn the skill into exam decisions</h2>
              <p>{officialNote}</p>
              <ul className={styles.sourceList}>
                <li><a href="https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading">Official IELTS Academic Reading format</a> — used to distinguish official task types from WeLearn strategy training.</li>
                <li>WeLearn original guided practice — explanations and distractors are designed for skill transfer, not copied from official questions.</li>
              </ul>
              <div className={styles.actions}>
                {nextLinks.map((link) => link.href.startsWith('/practica/ielts/reading/tipos-de-preguntas/') ? (
                  <a key={link.href} href={link.href} className={link.primary ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}>{link.label}</a>
                ) : (
                  <Link key={link.href} href={link.href} className={link.primary ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}>{link.label}</Link>
                ))}
              </div>
            </article>
          </section>
        </div>
      </div>
    </>
  );
}
