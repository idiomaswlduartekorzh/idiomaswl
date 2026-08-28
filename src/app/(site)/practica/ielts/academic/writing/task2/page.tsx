import type { Metadata } from 'next'
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData'
import IeltsTask2PromptBank from '@/components/exam-practice/IeltsTask2PromptBank'
import { IELTS_TASK2_PROMPT_BANK } from '@/data/practica-exams/seo-catalog'
import Content from './Content'

const URL = 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2'

const FAQS = [
  {
    question: 'How many paragraphs should IELTS Writing Task 2 have?',
    answer: 'IELTS does not prescribe a fixed paragraph count. WeLearn teaches a four-paragraph default while adapting each paragraph to the exact prompt.',
  },
  {
    question: 'Is Body 3 required?',
    answer: 'No. Add it only when a distinct third idea can be developed fully without weakening the other paragraphs or time control.',
  },
  {
    question: 'Are the five essay types official IELTS task names?',
    answer: 'No. They are WeLearn teaching categories for recurring instructions within the same official Task 2 essay response.',
  },
  {
    question: 'Where should I start?',
    answer: 'Start with Prompt Analysis, then build the introduction. The prompt determines the job of every later paragraph.',
  },
]

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2: Structure, Question Types and Practice',
  description: 'Build IELTS Writing Task 2 step by step: prompt analysis, introduction, body paragraphs, conclusion, final review, question types and timed practice.',
  keywords: ['IELTS Writing Task 2', 'IELTS Task 2 structure', 'IELTS Task 2 question types', 'IELTS essay practice', 'IELTS Task 2 body paragraphs'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'IELTS Writing Task 2',
    description: 'Build the complete IELTS Writing Task 2 essay through question-aware lessons and progressive practice.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: URL },
}

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name="IELTS Academic Writing Task 2"
        url={URL}
        description="English-first IELTS Academic Writing Task 2 hub with response architecture, question types, transferable skills and original practice."
        teaches={[
          'IELTS Academic Writing Task 2',
          'essay planning',
          'opinion essay',
          'discussion essay',
          'problem solution essay',
          'direct question essay',
        ]}
        isPartOf={{
          name: 'IELTS Academic Writing',
          url: 'https://www.idiomaswl.com/practica/ielts/academic/writing',
        }}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Practice', url: 'https://www.idiomaswl.com/practica' },
          { name: 'IELTS', url: 'https://www.idiomaswl.com/practica/ielts' },
          { name: 'Academic Writing', url: 'https://www.idiomaswl.com/practica/ielts/academic/writing' },
          { name: 'Task 2', url: URL },
        ]}
      />
      <Content faqs={FAQS} />
      <section className="wl-section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <IeltsTask2PromptBank prompts={IELTS_TASK2_PROMPT_BANK} />
        </div>
      </section>
    </>
  )
}
