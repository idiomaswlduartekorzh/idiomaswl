import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Layers3, Route } from 'lucide-react';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/exam-practice/StructuredData';
import InternationalLearningResourceJsonLd from '@/components/exam-practice/InternationalLearningResourceJsonLd';
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
const ACCENT = '#0369a1';
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

      <section className="wl-section" lang="en">
        <div className="wrap" style={{ maxWidth: 1040 }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Practice</Link>
            <span>/</span>
            <Link href="/practica/ielts" style={{ color: 'var(--muted)', textDecoration: 'none' }}>IELTS</Link>
            <span>/</span>
            <Link href="/practica/ielts/reading" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Reading</Link>
            <span>/</span>
            <span aria-current="page" style={{ color: 'var(--ink)', fontWeight: 800 }}>Question Types</span>
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />IELTS Academic Reading
              </p>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.15rem)', lineHeight: 1.04, letterSpacing: '-0.04em', margin: '0 0 0.85rem', color: 'var(--ink)' }}>
                IELTS Reading Question Types
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 720 }}>
                {PRODUCT_LABEL} This map preserves the IELTS numbering and makes every WeLearn pedagogical split explicit.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.7rem', alignContent: 'center' }}>
              {[
                { icon: <CheckCircle2 size={18} />, label: '11 official types', text: 'Presented in the order and numbering published by IELTS.' },
                { icon: <Route size={18} />, label: '14 WeLearn routes', text: 'Each practical format or variant has a dedicated lesson URL.' },
                { icon: <Layers3 size={18} />, label: 'Official type 9', text: 'IELTS groups Summary, Note, Table and Flow-chart; WeLearn separates them for focused practice.' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: '0.65rem', alignItems: 'start' }}>
                  <span style={{ color: ACCENT }}>{item.icon}</span>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.9rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>{item.label}:</strong> {item.text}
                  </p>
                </div>
              ))}
            </aside>
          </div>

          <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, marginBottom: '1.2rem', borderLeft: `4px solid ${ACCENT}` }}>
            <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Official format vs WeLearn strategy</p>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.68 }}>
              <strong>Official format:</strong> IELTS lists 11 Academic Reading types. <strong>WeLearn strategy:</strong> we provide 14 routes because official type 9 contains four distinct representations; each route also links to supporting skills such as skimming, scanning, paraphrase recognition and word-limit control.
            </p>
            <p style={{ margin: '0.65rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
              Official source:{' '}
              <a href={QUESTION_TYPE_CONTRACT.source.url} style={{ color: ACCENT, fontWeight: 800 }}>
                {QUESTION_TYPE_CONTRACT.source.title}
              </a>
              . Reviewed on {QUESTION_TYPE_CONTRACT.source.reviewedAt}.
            </p>
            <p style={{ margin: '0.45rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.82rem' }}>
              WeLearn is an independent resource and is not affiliated with, sponsored by or endorsed by the IELTS Partners. This map uses names and numbering as factual reference only; it does not reproduce official logos, tasks or passages. Read the{' '}
              <a href={QUESTION_TYPE_CONTRACT.rights.noticeUrl} style={{ color: ACCENT, fontWeight: 800 }}>
                IELTS copyright and trade mark notice
              </a>
              .
            </p>
          </section>

          <section style={{ display: 'grid', gap: '0.9rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
              <div>
                <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Complete official map</p>
                <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>11 official types → 14 WeLearn routes</h2>
              </div>
              <span style={{ fontFamily: 'var(--mono)', color: ACCENT, fontSize: '0.78rem', fontWeight: 900 }}>
                {published.length}/{QUESTION_TYPE_CONTRACT.welearnRouteCount} routes published
              </span>
            </div>

            <div data-reading-question-type-contract={QUESTION_TYPE_CONTRACT.schemaVersion} style={{ display: 'grid', gap: '1rem' }}>
              {QUESTION_TYPE_CONTRACT.officialTypes.map((officialType) => (
                <section
                  key={officialType.id}
                  data-official-type={officialType.officialNumber}
                  className="wl-card"
                  style={{ padding: '1rem', borderRadius: 16 }}
                >
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'start', marginBottom: '0.55rem' }}>
                    <span style={{ minWidth: 34, height: 34, borderRadius: 10, background: `${ACCENT}12`, color: ACCENT, display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontWeight: 900 }}>
                      {officialType.officialNumber}
                    </span>
                    <div>
                      <p style={{ margin: '0 0 0.15rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 900 }}>
                        OFFICIAL IELTS TYPE
                      </p>
                      <h3 lang="en" style={{ margin: 0, color: 'var(--ink)', fontSize: '1.08rem' }}>
                        {officialType.officialName}
                      </h3>
                    </div>
                  </div>
                  <p style={{ margin: '0 0 0.8rem', color: 'var(--ink-2)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                    <strong>WeLearn strategy:</strong> {QUESTION_TYPE_FOCUS[officialType.id] ?? officialType.welearnPracticeFocus}
                  </p>
                  {'welearnSplitRationale' in officialType && (
                    <p style={{ margin: '0 0 0.8rem', padding: '0.65rem 0.75rem', borderRadius: 10, background: `${ACCENT}0d`, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>
                      {TYPE_NINE_SPLIT}
                    </p>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0.75rem' }}>
                    {officialType.welearnRoutes.map((routeContract) => {
                      const type = bySlug(routeContract.slug);
                      return (
                        <a
                          key={type.slug}
                          data-welearn-route={routeContract.slug}
                          href={type.path}
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          <article className="wl-card" style={{ padding: '0.9rem', borderRadius: 14, height: '100%', borderTop: `3px solid ${ACCENT}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.7rem', alignItems: 'start', marginBottom: '0.45rem' }}>
                              <h4 lang="en" style={{ margin: 0, color: 'var(--ink)', fontSize: '0.96rem', letterSpacing: '-0.01em' }}>
                                {routeContract.label}
                              </h4>
                              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.64rem', fontWeight: 900, color: ACCENT }}>WELEARN ROUTE</span>
                            </div>
                            <p style={{ margin: '0 0 0.55rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.86rem' }}>{ROUTE_DESCRIPTIONS[type.slug] ?? type.description}</p>
                            <p style={{ margin: 0, color: ACCENT, fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 900 }}>
                              {ROUTE_TAGS[type.slug] ?? type.teaches.filter((item) => item !== 'IELTS Reading').slice(0, 3).join(' · ')}
                            </p>
                          </article>
                        </a>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginBottom: '1rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Supporting reading skills</p>
            <h2 style={{ margin: '0 0 0.7rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
              Not official question types, but essential to solving them
            </h2>
            <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
              {publishedSkills.map((skill) => (
                <Link key={skill.slug} href={skill.path} className="btn btn-ghost btn-sm">
                  {SKILL_LABELS[skill.slug] ?? skill.title}
                </Link>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16 }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>How to use this guide</p>
            <h2 style={{ margin: '0 0 0.7rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
              Accuracy first. Speed after the method is stable.
            </h2>
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              {[
                'Start with the question type that causes the most confusion and complete one untimed session.',
                'Read every explanation and classify the error: vocabulary, scope, inference, location or lexical distraction.',
                'Repeat the same type with a new text. Once accuracy is stable, combine question types.',
                'Finish the cycle with timed mixed practice to test whether the method transfers under pressure.',
              ].map((step, index) => (
                <p key={step} style={{ margin: 0, display: 'grid', gridTemplateColumns: '32px 1fr', gap: '0.65rem', alignItems: 'start', color: 'var(--ink-2)', lineHeight: 1.58 }}>
                  <span style={{ width: 32, height: 32, borderRadius: 10, background: `${ACCENT}12`, color: ACCENT, display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontWeight: 900 }}>
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </p>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ marginTop: '1.2rem', padding: '1.15rem', borderRadius: 16, background: `${ACCENT}0d` }}>
            <p className="eyebrow" style={{ margin: '0 0 0.4rem' }}>Transfer your method</p>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1.25rem' }}>Ready to choose between formats inside one passage?</h2>
            <p style={{ margin: '0 0 0.8rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              Use the dedicated Mixed Practice room after you have studied the individual formats. It asks you to identify the task, choose the right reading skill and justify the answer with passage evidence.
            </p>
            <Link href="/practica/ielts/reading/mixed-practice" className="btn btn-sm">Open Mixed Practice</Link>
          </section>

          {published.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <a href={bySlug('true-false-not-given').path} className="btn btn-sm">Start with True/False/Not Given</a>
            </div>
          )}

          <section style={{ marginTop: '1.4rem' }} lang="es">
            <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>Preguntas frecuentes</p>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {FAQS.map((faq) => (
                <article key={faq.question} className="wl-card" style={{ padding: '1rem', borderRadius: 14 }}>
                  <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '1rem' }}>{faq.question}</h2>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
