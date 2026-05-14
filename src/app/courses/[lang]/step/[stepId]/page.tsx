import { SLUG_TO_CODE, IDIOMAS, VOCAB, PASOS } from '@/lib/data';
import LessonFrame from '@/components/lesson/LessonFrame';
import { notFound } from 'next/navigation';

interface PageParams {
  lang: string;
  stepId: string;
}

export default async function LessonPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { lang, stepId } = await params;

  const code = SLUG_TO_CODE[lang];
  if (!code) notFound();

  const idioma = IDIOMAS.find((i) => i.code === code);
  if (!idioma) notFound();

  const vocab = VOCAB[code] ?? VOCAB['ko'];
  const step = Number(stepId);

  // Validate step range
  if (isNaN(step) || step < 1 || step > PASOS.length) notFound();

  return (
    <LessonFrame idioma={idioma} vocab={vocab} pasos={PASOS} stepId={step} />
  );
}

export function generateStaticParams() {
  const slugs = Object.keys(SLUG_TO_CODE);
  const steps = Array.from({ length: PASOS.length }, (_, i) =>
    String(i + 1)
  );
  return slugs.flatMap((lang) =>
    steps.map((stepId) => ({ lang, stepId }))
  );
}
