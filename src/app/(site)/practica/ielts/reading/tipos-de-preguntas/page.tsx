import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Layers3, Route } from 'lucide-react';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/exam-practice/StructuredData';
import InternationalLearningResourceJsonLd from '@/components/exam-practice/InternationalLearningResourceJsonLd';
import styles from './page.module.css';
import {
  IELTS_READING_SKILLS,
  IELTS_READING_TYPES,
  PRACTICE_BASE_URL,
} from '@/data/practica-exams/seo-catalog';
import {
  IELTS_ACADEMIC_READING_QUESTION_TYPE_CONTRACT,
  type IeltsAcademicReadingWeLearnRouteSlug,
} from '@/lib/ielts/academic-reading-question-types';

const URL = `${PRACTICE_BASE_URL}/practica/ielts/reading/tipos-de-preguntas`;
const QUESTION_TYPE_CONTRACT = IELTS_ACADEMIC_READING_QUESTION_TYPE_CONTRACT;
const PRODUCT_LABEL = '11 numbered official types · 14 WeLearn routes for practising their formats and variants.';

const QUESTION_TYPE_FOCUS: Record<string, string> = {
  'multiple-choice': 'Compare every option with the exact question and reject lexical echoes or partial truths.',
  'identifying-information': 'Separate support, contradiction and missing information without using outside knowledge.',
  'identifying-writer-views-claims': 'Attribute the writer’s position or claim precisely before making a decision.',
  'matching-information': 'Locate specific details in paragraphs without confusing them with the main idea.',
  'matching-headings': 'Choose the main idea that covers the whole paragraph, not one striking detail.',
  'matching-features': 'Track relationships and attributions across people, categories, theories or facts.',
  'matching-sentence-endings': 'Complete the sentence meaning; grammar alone cannot decide the answer.',
  'sentence-completion': 'Locate the detail and supply a grammatically valid form within the word limit.',
  'summary-note-table-flow-chart-completion': 'Use the representation, paraphrase and expected word form to complete each gap.',
  'diagram-label-completion': 'Connect a detailed textual description with parts or positions in the diagram.',
  'short-answer-questions': 'Find a factual detail and answer with the shortest form allowed by the instruction.',
};

const TYPE_NINE_SPLIT = 'IELTS groups these under one official type. WeLearn separates four routes because each representation demands a different reading process.';

const ROUTE_DESCRIPTIONS: Record<string, string> = {
  'true-false-not-given': 'Separate textual support, direct contradiction and information the passage never resolves.',
  'yes-no-not-given': 'Attribute the writer’s stated view or claim without turning related information into an opinion.',
  'matching-headings': 'Choose the heading that represents the whole paragraph rather than one memorable detail.',
  'multiple-choice': 'Compare every option with the exact question and eliminate partial truths and lexical echoes.',
  'summary-completion': 'Use paraphrase, grammar and the word limit to complete a connected summary accurately.',
  'note-completion': 'Read the note structure, predict the missing form and locate the smallest valid answer.',
  'table-completion': 'Use row and column relationships to predict and verify the missing information.',
  'flow-chart-completion': 'Follow sequence, cause and condition signals through a process before filling each gap.',
  'short-answer': 'Locate a factual detail and give the shortest answer allowed by the instruction.',
  'sentence-completion': 'Complete an individual sentence with passage evidence that fits both meaning and grammar.',
  'matching-information': 'Find the paragraph containing a specific detail, example, reason or result.',
  'matching-features': 'Match statements to people, groups, periods or theories through precise attribution.',
  'matching-sentence-endings': 'Choose the ending that completes both the sentence logic and the passage meaning.',
  'diagram-labeling': 'Connect passage descriptions with the correct parts, positions or stages in a diagram.',
};

const ROUTE_TAGS: Record<string, string> = {
  'true-false-not-given': 'evidence · scope · contradiction',
  'yes-no-not-given': 'writer views · claims · attribution',
  'matching-headings': 'main idea · paragraph function · skimming',
  'multiple-choice': 'detail · inference · distractors',
  'summary-completion': 'paraphrase · grammar · word limit',
  'note-completion': 'note structure · scanning · word limit',
  'table-completion': 'rows · columns · classification',
  'flow-chart-completion': 'process · sequence · word limit',
  'short-answer': 'factual detail · scanning · concise answers',
  'sentence-completion': 'grammar fit · evidence · word limit',
  'matching-information': 'detail location · paragraph scanning',
  'matching-features': 'attribution · relationships · paraphrase',
  'matching-sentence-endings': 'sentence logic · meaning · grammar',
  'diagram-labeling': 'parts · positions · process vocabulary',
};

const SKILL_LABELS: Record<string, string> = {
  skimming: 'Skimming',
  scanning: 'Scanning',
  inferencia: 'Inference',
  parafrasis: 'Paraphrase recognition',
  'limite-de-palabras': 'Word-limit control',
  'gestion-del-tiempo': 'Time management',
};

export const metadata: Metadata = {
  title: 'IELTS Reading Question Types: complete guide and practice',
  description:
    'Explore the 11 numbered IELTS Academic Reading question types through 14 focused WeLearn practice routes, worked methods and guided exercises.',
  keywords: [
    'tipos de preguntas IELTS reading',
    'IELTS reading question types',
    'IELTS reading ejercicios',
    'IELTS true false not given',
    'IELTS matching headings',
  ],
  openGraph: {
    title: 'IELTS Reading Question Types: complete guide and practice',
    description: 'The 11 numbered IELTS Academic Reading question types organised into 14 focused WeLearn practice routes.',
    url: URL,
    type: 'website',
    locale: 'en_US',
  },
  alternates: { canonical: URL },
};

const FAQS = [
  {
    question: '¿Cuántos tipos de preguntas hay en IELTS Academic Reading?',
    answer:
      'IELTS enumera 11 tipos oficiales. WeLearn ofrece 14 rutas porque separa Summary, Note, Table y Flow-chart Completion, cuatro formatos que IELTS agrupa dentro de su tipo oficial 9.',
  },
  {
    question: '¿Skimming y scanning son tipos oficiales de pregunta?',
    answer:
      'No. Skimming y scanning son habilidades de lectura. Por eso en Idiomas WeLearn viven en /habilidades y se enlazan como apoyo a los tipos oficiales.',
  },
  {
    question: '¿Debo practicar por tipo de pregunta o hacer simulacros completos?',
    answer:
      'Primero conviene practicar por tipo para entender trampas y método. Después mezcla tipos y termina con simulacros para transferir precisión a condiciones reales de examen.',
  },
];

function bySlug(slug: IeltsAcademicReadingWeLearnRouteSlug) {
  const route = IELTS_READING_TYPES.find((item) => item.slug === slug);
  if (!route) {
    throw new Error(`IELTS Reading route contract references an unknown slug: ${slug}`);
  }
  return route;
}

export default function Page() {
  const published = IELTS_READING_TYPES.filter((item) => item.status === 'published');
  const publishedSkills = IELTS_READING_SKILLS.filter((item) => item.status === 'published');

  return (
    <>
      <CourseSchema
        name="IELTS Reading Question Types"
        description="A map of the 11 numbered IELTS Academic Reading question types and 14 focused WeLearn routes with methods, examples and practice."
        url={URL}
        educationalLevel="B1,B2,C1"
        teaches="IELTS Reading question types, skimming, scanning, inference, paraphrase"
        inLanguage="en"
      />
      <InternationalLearningResourceJsonLd
        name="IELTS Reading Question Types"
        url={URL}
        description="An educational index of the 11 numbered IELTS Academic Reading question types and 14 focused WeLearn practice routes."
        teaches={['IELTS Academic Reading', 'official question types', 'WeLearn practice routes', 'reading strategies']}
        isPartOf={{ name: 'IELTS Academic Practice', url: `${PRACTICE_BASE_URL}/practica/ielts` }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Practice', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'IELTS', url: `${PRACTICE_BASE_URL}/practica/ielts` },
          { name: 'Reading', url: `${PRACTICE_BASE_URL}/practica/ielts/reading` },
          { name: 'Question Types', url: URL },
        ]}
      />

      <main className={styles.page} lang="en">
        <div className={styles.shell}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/practica">Practice</Link><span>/</span>
            <Link href="/practica/ielts">IELTS</Link><span>/</span>
            <Link href="/practica/ielts/reading">Reading</Link><span>/</span>
            <span aria-current="page">Question Types</span>
          </nav>

          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>IELTS Academic Reading</p>
              <h1>Know the task. Choose the reading move.</h1>
              <p className={styles.lead}>{PRODUCT_LABEL} Learn the decision pattern, practise it with evidence and then transfer it to mixed reading.</p>
            </div>
            <aside className={styles.heroAside} aria-label="Question type map">
              {[
                { icon: <CheckCircle2 size={20} aria-hidden="true" />, label: '11 official types', text: 'Kept in the numbering published by IELTS.' },
                { icon: <Route size={20} aria-hidden="true" />, label: '14 practice routes', text: 'Each WeLearn format has a focused lesson and exercise path.' },
                { icon: <Layers3 size={20} aria-hidden="true" />, label: 'One connected system', text: 'Question types link to skimming, scanning, paraphrase and word-limit control.' },
              ].map((item) => <div className={styles.heroPoint} key={item.label}>{item.icon}<p><strong>{item.label}:</strong> {item.text}</p></div>)}
            </aside>
          </header>

          <section className={styles.section} aria-labelledby="official-boundary-title">
            <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Official format vs WeLearn strategy</p><h2 id="official-boundary-title">Keep the official map. Train each decision separately.</h2></div></div>
            <div className={styles.sourceNote}>
              <p><strong>Official format:</strong> IELTS lists 11 Academic Reading types. <strong>WeLearn strategy:</strong> we provide 14 routes because official type 9 contains four distinct representations.</p>
              <p>Official source: <a href={QUESTION_TYPE_CONTRACT.source.url}>{QUESTION_TYPE_CONTRACT.source.title}</a>. Reviewed on {QUESTION_TYPE_CONTRACT.source.reviewedAt}. WeLearn is independent and does not reproduce official tasks or passages. Read the <a href={QUESTION_TYPE_CONTRACT.rights.noticeUrl}>IELTS copyright and trade mark notice</a>.</p>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="question-type-map-title">
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>Complete official map</p><h2 id="question-type-map-title">11 official types → 14 WeLearn routes</h2></div>
              <p className={styles.routeCount}>{published.length}/{QUESTION_TYPE_CONTRACT.welearnRouteCount} routes published</p>
            </div>
            <div className={styles.mapList} data-reading-question-type-contract={QUESTION_TYPE_CONTRACT.schemaVersion}>
              {QUESTION_TYPE_CONTRACT.officialTypes.map((officialType) => (
                <article className={styles.typeCard} data-official-type={officialType.officialNumber} key={officialType.id}>
                  <header className={styles.typeHeader}><span className={styles.typeNumber}>{officialType.officialNumber}</span><div><small>OFFICIAL IELTS TYPE</small><h3>{officialType.officialName}</h3></div></header>
                  <p className={styles.strategy}><strong>WeLearn strategy:</strong> {QUESTION_TYPE_FOCUS[officialType.id] ?? officialType.welearnPracticeFocus}</p>
                  {'welearnSplitRationale' in officialType && <p className={styles.splitNote}>{TYPE_NINE_SPLIT}</p>}
                  <div className={styles.routeGrid}>
                    {officialType.welearnRoutes.map((routeContract) => {
                      const type = bySlug(routeContract.slug);
                      return <a key={type.slug} className={styles.routeCard} data-welearn-route={routeContract.slug} href={type.path}><div><h4>{routeContract.label}</h4><p>{ROUTE_DESCRIPTIONS[type.slug] ?? type.description}</p></div><span className={styles.routeTag}>{ROUTE_TAGS[type.slug] ?? type.teaches.filter((item) => item !== 'IELTS Reading').slice(0, 3).join(' · ')}</span></a>;
                    })}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="supporting-skills-title">
            <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Supporting reading skills</p><h2 id="supporting-skills-title">Build the subskills each question type depends on.</h2></div></div>
            <div className={styles.supportGrid}>
              {publishedSkills.map((skill) => <Link className={styles.skillCard} href={skill.path} key={skill.slug}>{SKILL_LABELS[skill.slug] ?? skill.title}<span>OPEN SKILL <ArrowRight size={14} aria-hidden="true" /></span></Link>)}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="study-sequence-title">
            <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Study sequence</p><h2 id="study-sequence-title">Accuracy first. Speed after the method is stable.</h2></div></div>
            <div className={styles.steps}>
              {[
                'Choose the question type that causes the most confusion and complete one untimed lesson.',
                'Read the explanation and name the error: vocabulary, scope, inference, location or distraction.',
                'Repeat the same type with a new compact passage until the evidence rule feels automatic.',
                'Finish with timed mixed practice and test whether the method transfers under pressure.',
              ].map((step, index) => <p className={styles.step} key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</p>)}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="mixed-practice-title">
            <div className={styles.transferCard}>
              <div><p className={styles.eyebrow}>Transfer your method</p><h2 id="mixed-practice-title">Ready to switch formats inside one passage?</h2><p>Use Mixed Practice after studying the individual formats. Identify the task, choose the reading move and justify the answer with passage evidence.</p></div>
              <Link href="/practica/ielts/reading/mixed-practice">Open Mixed Practice <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
          </section>

          <section className={styles.section} lang="es" aria-labelledby="faq-title">
            <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Preguntas frecuentes</p><h2 id="faq-title">Respuestas rápidas antes de practicar</h2></div></div>
            <div className={styles.faqGrid}>{FAQS.map((faq) => <article className={styles.faqCard} key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div>
          </section>
        </div>
      </main>
    </>
  );
}
