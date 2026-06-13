import type { Metadata } from 'next';
import IELTSHubClient from './IELTSHubClient';

export const metadata: Metadata = {
  title: 'Práctica IELTS — Reading True/False/Not Given | Idiomas WeLearn',
  description: 'Practica IELTS Academic Reading: True/False/Not Given con pasaje real, feedback inmediato y estrategias para Band 6–8.',
  alternates: { canonical: 'https://idiomaswl.com/practica/ielts' },
};

export default function IELTSPage() {
  return <IELTSHubClient />;
}
