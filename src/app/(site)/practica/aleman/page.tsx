import LanguageHub from '@/components/practica/LanguageHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import HistoriasCard from '@/components/practica/HistoriasCard';

export const metadata: Metadata = {
  title: 'Práctica de Alemán — Elige tu nivel MCER',
  description: 'Ejercicios interactivos de alemán por nivel: A1 disponible con lectura, gramática, escritura, habla, vocabulario y escucha.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/aleman' },
};

const NIVELES = [
  {
    nivel: 'A1', name: 'Anfänger',
    desc: 'Erste Wörter, Präsens, Alltagsvokabular und Überlebensphrasen.',
    href: '/practica/aleman/a1', available: true,
    count: '6 habilidades · 40+ ejercicios',
  },
  { nivel: 'A2', name: 'Grundkenntnisse', desc: 'Perfekt, Dativ, Modalverben im Präteritum, trennbare Verben und Komparativ.', href: '/practica/aleman/a2', available: true, count: '6 habilidades · 50+ ejercicios' },
  { nivel: 'B1', name: 'Mittelstufe', desc: 'Konjunktiv II, Futur, schriftliche Produktion, Hörverstehen.', href: '/practica/aleman/b1', available: true, count: '20 temas de gramática' },
  { nivel: 'B2', name: 'Gehobene Mittelstufe', desc: 'Passiv, Goethe B2-Vorbereitung, akademisches Vokabular.', available: false },
  { nivel: 'C1', name: 'Fortgeschritten', desc: 'Komplexe Grammatik, Kollokationen, Goethe C1-Vorbereitung.', available: false },
];

export default function AlemanPage() {
  return (
    <>
      <CourseSchema
        name="Práctica de Alemán — Ejercicios interactivos MCER"
        description="Ejercicios de alemán por nivel MCER: A1 y A2 disponibles. Vocabulario, gramática, escritura, habla y escucha."
        url="https://www.idiomaswl.com/practica/aleman"
        educationalLevel="A1,A2"
        teaches="Alemán, Goethe-Zertifikat"
        inLanguage="de"
      />
      <LanguageHub
        langLabel="🇩🇪 Alemán"
        eyebrow="🇩🇪 Alemán"
        title="Elige tu nivel"
        lead="Übungen nach GER-Niveau geordnet. Fang mit A1 an und lerne in deinem Tempo."
        accent="#dd0000"
        levels={NIVELES}
        beforeLevels={<HistoriasCard lang="aleman" />}
      />
    </>
  );
}
