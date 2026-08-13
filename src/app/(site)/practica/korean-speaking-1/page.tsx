import type { Metadata } from 'next';
import KoreanIntroSpeaking1 from './KoreanIntroSpeaking1';

export const metadata: Metadata = {
  title: 'Coreano Introductorio 1: Mi primera presentación oral',
  description:
    'Producción oral en coreano para principiantes: aprende a presentarte con vocabulario guiado y un constructor de frases interactivo.',
  keywords: [
    'coreano principiante', 'presentación en coreano', 'hablar coreano',
    'producción oral coreano', 'hangul principiante', '저는', 'saramieyo',
  ],
  openGraph: {
    title: 'Coreano Introductorio 1 — Mi primera presentación oral',
    description:
      'Practica coreano oral desde el primer día: supervivencia, presentación modelo, vocabulario, personalización y escala de habla progresiva.',
    url: 'https://www.idiomaswl.com/practica/korean-speaking-1',
  },
  alternates: {
    canonical: 'https://www.idiomaswl.com/practica/korean-speaking-1',
  },
};

export default function KoreanSpeaking1Page() {
  return <KoreanIntroSpeaking1 />;
}
