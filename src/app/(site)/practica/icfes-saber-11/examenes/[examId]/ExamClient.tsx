'use client';

import PracticeClient from '@/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient';
import { EXAMS } from '@/data/exams';
import type { MockExam } from '@/data/mocks/types';

export default function ExamClient({ mock }: { mock: MockExam }) {
  return <PracticeClient exam={EXAMS.icfes} mock={mock} secureIcfes={{ offerEnabled: false }} />;
}
