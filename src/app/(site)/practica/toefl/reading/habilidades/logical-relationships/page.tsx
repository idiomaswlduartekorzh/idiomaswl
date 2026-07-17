import type { Metadata } from 'next';
import { PRACTICE_BASE_URL, TOEFL_READING_SKILLS } from '@/data/practica-exams/seo-catalog';
import { SkillPracticePage } from '../SkillPracticePage';

const ROUTE = TOEFL_READING_SKILLS.find((item) => item.slug === 'logical-relationships')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;

export const metadata: Metadata = {
  title: 'TOEFL Logical Relationships: práctica con evidencia',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'TOEFL Reading Logical Relationships',
    description: ROUTE.description,
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
  alternates: { canonical: URL },
};

export default function Page() {
  return <SkillPracticePage slug="logical-relationships" />;
}
