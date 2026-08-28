import type { Metadata } from 'next'
import { TASK2_SKILL_FAQS, Task2SkillStructuredData } from '../Task2SkillStructuredData'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2 Introduction: Thesis and Paraphrase',
  description: 'How to write an IELTS Writing Task 2 introduction for five essay types: prompt analysis, sentence blocks and progressive practice.',
  keywords: ['IELTS Writing Task 2 introduction', 'IELTS thesis statement', 'IELTS essay introduction', 'IELTS Task 2 paraphrasing', 'IELTS essay types'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'IELTS Writing Task 2 Introduction: Thesis and Paraphrase',
    description: 'Build an accurate IELTS Task 2 introduction for each essay type through guided models and progressive practice.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/introduccion' },
}

import IntroduccionTask2Client from './IntroduccionTask2Client';
export default function Page() {
  return (
    <>
      <Task2SkillStructuredData
        name="IELTS Writing Task 2 introduction practice"
        path="/practica/ielts/academic/writing/task2/introduccion"
        teaches={['essay introduction', 'prompt analysis', 'paraphrasing', 'thesis statement', 'sentence functions']}
        faqs={TASK2_SKILL_FAQS}
      />
      <IntroduccionTask2Client />
    </>
  );
}
