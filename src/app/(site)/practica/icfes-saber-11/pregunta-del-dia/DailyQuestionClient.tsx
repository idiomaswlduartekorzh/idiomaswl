'use client';

import { useMemo } from 'react';
import type { IcfesPracticeQuestion } from '@/data/icfes/questions';
import { ICFES_PARTS } from '@/data/icfes/parts';
import IcfesPartPracticeEngine from '../_components/IcfesPartPracticeEngine';

export default function DailyQuestionClient({ questions }: { questions: IcfesPracticeQuestion[] }) {
  const { question, part, dayKey } = useMemo(() => {
    const now = new Date();
    const dayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const dayNumber = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 86_400_000);
    const question = questions[((dayNumber % questions.length) + questions.length) % questions.length];
    const part = ICFES_PARTS.find((item) => item.part === question.officialPart) ?? ICFES_PARTS[0];
    return { question, part, dayKey };
  }, [questions]);

  return <IcfesPartPracticeEngine part={part} questions={[question]} progressScope={`daily:${dayKey}`} />;
}
