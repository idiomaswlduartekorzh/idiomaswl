import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, Clock, SearchCheck } from 'lucide-react';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { BreadcrumbJsonLd, FaqJsonLd, JsonLd } from '@/components/exam-practice/StructuredData';
import InternationalLearningResourceJsonLd from '@/components/exam-practice/InternationalLearningResourceJsonLd';
import { IELTS_READING_SKILLS, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const URL = `${PRACTICE_BASE_URL}/practica/ielts/reading/habilidades`;
const ACCENT = '#0369a1';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test';

const SKILL_COPY: Record<string, { title: string; description: string }> = {
  skimming: {
    title: 'Skimming',
    description: 'Build a fast passage map from the title, opening sentences, paragraph roles and direction changes.',
  },
  scanning: {
    title: 'Scanning',
    description: 'Locate names, dates, figures, technical terms and paraphrased evidence without rereading the whole text.',
  },
  inferencia: {
    title: 'Inference',
    description: 'Choose the most restrained conclusion that the evidence genuinely supports.',
  },
  parafrasis: {
    title: 'Paraphrase recognition',
    description: 'Test whether the question and passage express the same meaning with different language.',
  },
  'limite-de-palabras': {
    title: 'Word-limit control',
    description: 'Copy the smallest grammatical answer that obeys the stated word limit.',
  },
  'gestion-del-tiempo': {
    title: 'Time management',
    description: 'Decide when to solve, mark, skip and return during the 60-minute Reading test.',
  },
};

const HUB_FAQS = [
  {
    question: '¿Skimming, scanning e inferencia son tipos oficiales de pregunta IELTS?',
    answer:
      'No. Son habilidades de lectura. En WeLearn viven bajo /habilidades porque apoyan tipos oficiales como Matching Headings, Matching Information, Multiple Choice, Completion y True/False/Not Given.',
  },
  {
    question: '¿Por qué estudiar habilidades antes de hacer simulacros IELTS completos?',
    answer:
      'Porque el simulacro mezcla muchos problemas a la vez. Una ruta por habilidades te permite entrenar mapa del texto, ubicación de evidencia, paráfrasis, inferencia, límite de palabras y tiempo de forma aislada antes de combinarlos.',
  },
  {
    question: '¿Qué habilidad conviene estudiar primero para IELTS Reading?',
    answer:
      'Empieza con skimming para crear mapa del pasaje, sigue con scanning para localizar evidencia y después practica inferencia, paráfrasis, límite de palabras y gestión del tiempo según el tipo de pregunta que estés trabajando.',
  },
];

const TRANSFER_MAP = [
  {
    skill: 'Skimming',
    href: '/practica/ielts/reading/habilidades/skimming',
    use: 'Map the passage, identify its main idea and label each paragraph’s role.',
    officialTypes: [
      { label: 'Matching Headings', href: '/practica/ielts/reading/tipos-de-preguntas/matching-headings' },
      { label: 'Summary Completion', href: '/practica/ielts/reading/tipos-de-preguntas/summary-completion' },
    ],
  },
  {
    skill: 'Scanning',
    href: '/practica/ielts/reading/habilidades/scanning',
    use: 'Locate names, dates, figures, technical terms and evidence windows.',
    officialTypes: [
      { label: 'Matching Information', href: '/practica/ielts/reading/tipos-de-preguntas/matching-information' },
      { label: 'Sentence Completion', href: '/practica/ielts/reading/tipos-de-preguntas/sentence-completion' },
      { label: 'Diagram Labeling', href: '/practica/ielts/reading/tipos-de-preguntas/diagram-labeling' },
    ],
  },
  {
    skill: 'Inference',
    href: '/practica/ielts/reading/habilidades/inferencia',
    use: 'Choose restrained conclusions that the text allows you to defend.',
    officialTypes: [
      { label: 'Multiple Choice', href: '/practica/ielts/reading/tipos-de-preguntas/multiple-choice' },
      { label: 'Yes/No/Not Given', href: '/practica/ielts/reading/tipos-de-preguntas/yes-no-not-given' },
    ],
  },
  {
    skill: 'Paraphrase recognition',
    href: '/practica/ielts/reading/habilidades/parafrasis',
    use: 'Check meaning equivalence across the question, option and evidence.',
    officialTypes: [
      { label: 'True/False/Not Given', href: '/practica/ielts/reading/tipos-de-preguntas/true-false-not-given' },
      { label: 'Matching Sentence Endings', href: '/practica/ielts/reading/tipos-de-preguntas/matching-sentence-endings' },
    ],
  },
  {
    skill: 'Word-limit control',
    href: '/practica/ielts/reading/habilidades/limite-de-palabras',
    use: 'Copy the minimum unit that completes the gap without breaking the instruction.',
    officialTypes: [
      { label: 'Note Completion', href: '/practica/ielts/reading/tipos-de-preguntas/note-completion' },
      { label: 'Table Completion', href: '/practica/ielts/reading/tipos-de-preguntas/table-completion' },
      { label: 'Short-answer', href: '/practica/ielts/reading/tipos-de-preguntas/short-answer' },
    ],
  },
  {
    skill: 'Time management',
    href: '/practica/ielts/reading/habilidades/gestion-del-tiempo',
    use: 'Decide what to solve, mark or skip within the 60-minute test.',
    officialTypes: [
      { label: 'IELTS Reading question types', href: '/practica/ielts/reading/tipos-de-preguntas' },
    ],
  },
];

export const metadata: Metadata = {
  title: 'IELTS Reading Skills | Strategies and guided practice',
  description:
    'Build IELTS Reading skills with guided lessons in skimming, scanning, inference, paraphrase recognition, word-limit control and time management.',
  keywords: [
    'habilidades IELTS reading',
    'skimming IELTS reading',
    'scanning IELTS reading',
    'IELTS reading strategies',
    'IELTS reading practice',
  ],
  openGraph: {
    title: 'IELTS Reading Skills',
    description: 'Build transferable IELTS Academic Reading skills through guided practice.',
    url: URL,
    type: 'website',
    locale: 'en_US',
  },
  alternates: { canonical: URL },
};

export default function Page() {
  const published = IELTS_READING_SKILLS.filter((item) => item.status === 'published');

  return (
    <>
      <CourseSchema
        name="IELTS Reading Skills"
        description="A transferable IELTS Academic Reading pathway: skimming, scanning, inference, paraphrase recognition, word-limit control and time management."
        url={URL}
        educationalLevel="B1,B2,C1"
        teaches="IELTS Reading skills, skimming, scanning, inference, paraphrase, word limit"
        inLanguage="en"
      />
      <InternationalLearningResourceJsonLd
        name="IELTS Reading Skills"
        url={URL}
        description="A skill pathway for IELTS Academic Reading before mixing question types."
        teaches={['IELTS Reading', 'skimming', 'scanning', 'inference', 'paraphrase', 'word limit', 'time management']}
        isPartOf={{ name: 'IELTS Reading', url: `${PRACTICE_BASE_URL}/practica/ielts/reading` }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Practice', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'IELTS', url: `${PRACTICE_BASE_URL}/practica/ielts` },
          { name: 'Reading', url: `${PRACTICE_BASE_URL}/practica/ielts/reading` },
          { name: 'Reading Skills', url: URL },
        ]}
      />
      <FaqJsonLd faqs={HUB_FAQS} />
      <JsonLd
        value={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'IELTS Reading skills pathway',
          itemListElement: published.map((skill, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: skill.title,
            url: `${PRACTICE_BASE_URL}${skill.path}`,
          })),
        }}
      />

      <section className="wl-section" lang="en">
        <div className="wrap" style={{ maxWidth: 1040 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Practice</Link>
            <span>/</span>
            <Link href="/practica/ielts" style={{ color: 'var(--muted)', textDecoration: 'none' }}>IELTS</Link>
            <span>/</span>
            <Link href="/practica/ielts/reading" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Reading</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Reading Skills</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />IELTS Academic Reading
              </p>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.15rem)', lineHeight: 1.04, letterSpacing: '-0.04em', margin: '0 0 0.85rem', color: 'var(--ink)' }}>
                IELTS Reading Skills
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 720 }}>
                Question types tell you what to answer. Reading skills tell you how to reach the evidence. Build skimming, scanning, inference, paraphrase recognition, word-limit control and time management so every decision follows a method rather than luck.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.7rem', alignContent: 'center' }}>
              {[
                { icon: <BookOpenCheck size={18} />, label: 'Map', text: 'First identify what each paragraph is doing.' },
                { icon: <SearchCheck size={18} />, label: 'Evidence', text: 'Then locate the exact window that supports the answer.' },
                { icon: <Clock size={18} />, label: 'Time', text: 'Speed comes from knowing when to skim and when to slow down.' },
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

          <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, marginBottom: '1rem', background: `${ACCENT}0d` }}>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong>Direct answer:</strong> this pathway organises the transferable skills behind IELTS Academic Reading. First learn how to map and search a passage; then apply those skills to the official question formats.
            </p>
          </section>

          <section className="wl-card" style={{ padding: '1rem 1.1rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Official format vs WeLearn strategy</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>Official format:</strong> IELTS Academic Reading gives you 60 minutes for three long texts and 40 questions, including multiple choice, matching, completion, identifying information or views, and short answers.
            </p>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--ink)' }}>WeLearn strategy:</strong> we separate skills from question formats so you can train one reading decision before combining everything in timed tests.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.86rem' }}>
              Official source reviewed: <a href={IELTS_ACADEMIC_URL} style={{ color: ACCENT, fontWeight: 800 }}>IELTS Academic test format and sections</a>. This is a skill pathway, not a new list of official question types.
            </p>
          </section>

          <section style={{ display: 'grid', gap: '0.9rem', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>Recommended pathway</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.85rem' }}>
              {published.map((skill) => {
                const copy = SKILL_COPY[skill.slug] ?? { title: skill.title, description: skill.description };
                return (
                <Link key={skill.slug} href={skill.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                  <article className="wl-card" style={{ padding: '1rem', borderRadius: 14, height: '100%', borderTop: `3px solid ${ACCENT}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.7rem', alignItems: 'start', marginBottom: '0.45rem' }}>
                      <h3 style={{ margin: 0, color: 'var(--ink)', fontSize: '1rem', letterSpacing: '-0.01em' }}>{copy.title}</h3>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.64rem', fontWeight: 900, color: ACCENT }}>
                        AVAILABLE
                      </span>
                    </div>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>{copy.description}</p>
                  </article>
                </Link>
                );
              })}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16, marginBottom: '1.2rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Transfer map</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Which skill supports each question type?</h2>
            <div style={{ display: 'grid', gap: '0.85rem' }}>
              {TRANSFER_MAP.map((item) => (
                <article key={item.skill} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', background: 'var(--bg-2)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 0.55fr) 1fr', gap: '0.75rem', alignItems: 'start' }}>
                    <div>
                      <Link href={item.href} style={{ color: ACCENT, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.78rem', textTransform: 'uppercase', textDecoration: 'none' }}>
                        {item.skill}
                      </Link>
                      <p style={{ margin: '0.35rem 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>{item.use}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {item.officialTypes.map((type) => (
                        <a key={type.href} href={type.href} className="btn btn-ghost btn-sm">
                          {type.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="wl-card" style={{ padding: '1.15rem', borderRadius: 16 }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>How to use this pathway</p>
            <h2 style={{ margin: '0 0 0.7rem', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
              Build the skill, then transfer it to a question type
            </h2>
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              {[
                'Start with skimming so you can label each paragraph without reading every word.',
                'Use scanning to find names, figures, dates and paraphrases inside that map.',
                'Train inference once you can separate textual support from outside assumptions.',
                'Practise word-limit control for completion tasks that require exact, grammatical wording.',
                'Add time management so you know when to solve, mark, skip and return.',
                'Transfer the method to formats such as Matching Headings, Matching Information and Summary Completion.',
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

          <section style={{ marginTop: '1.4rem' }} lang="es">
            <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>Preguntas frecuentes</p>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {HUB_FAQS.map((faq) => (
                <article key={faq.question} className="wl-card" style={{ padding: '1rem', borderRadius: 14 }}>
                  <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '1rem' }}>{faq.question}</h2>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/reading/habilidades/skimming" className="btn btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Start with skimming <ArrowRight size={15} />
            </Link>
            <Link href="/practica/ielts/reading/habilidades/scanning" className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Continue with scanning <ArrowRight size={15} />
            </Link>
            <Link href="/practica/ielts/reading/habilidades/inferencia" className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Train inference <ArrowRight size={15} />
            </Link>
            <Link href="/practica/ielts/reading/habilidades/parafrasis" className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Practise paraphrase recognition <ArrowRight size={15} />
            </Link>
            <Link href="/practica/ielts/reading/habilidades/limite-de-palabras" className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Control the word limit <ArrowRight size={15} />
            </Link>
            <Link href="/practica/ielts/reading/habilidades/gestion-del-tiempo" className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Manage your time <ArrowRight size={15} />
            </Link>
            <Link href="/practica/ielts/reading/tipos-de-preguntas" className="btn btn-ghost btn-sm">
              Browse question types
            </Link>
            <Link href="/practica/ielts/reading" className="btn btn-ghost btn-sm">
              Back to IELTS Reading
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
