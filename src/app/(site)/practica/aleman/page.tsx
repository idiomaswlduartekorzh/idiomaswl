import LanguageHub from '@/components/practica/LanguageHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import HistoriasCard from '@/components/practica/HistoriasCard';

export const metadata: Metadata = {
  title: 'Práctica de Alemán — Niveles A1 a C2',
  description: 'Ejercicios interactivos de alemán A1-C2 y recorridos completos de gramática B2, C1 y C2 con mapas visuales, práctica y PDF.',
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
  { nivel: 'B2', name: 'Gehobene Mittelstufe', desc: '30 vollständige Grammatiklektionen mit visuellen Karten, Übungen und PDF.', href: '/practica/aleman/b2', available: true, count: '30 Grammatikthemen · 90 PDF' },
  { nivel: 'C1', name: 'Fortgeschritten', desc: '30 Lektionen zu komplexer Syntax, Modalität, Kohäsion und Register.', href: '/practica/aleman/c1', available: true, count: '30 Grammatikthemen · 90 PDF' },
  { nivel: 'C2', name: 'Annähernd muttersprachlich', desc: '30 Lektionen zu Nuance, Perspektive, Skopus und professioneller Textredaktion.', href: '/practica/aleman/c2', available: true, count: '30 Grammatikthemen · 90 PDF' },
];

export default function AlemanPage() {
  return (
    <>
      <CourseSchema
        name="Práctica de Alemán — Ejercicios interactivos MCER"
        description="Ejercicios de alemán por nivel MCER A1-C2 y recorridos completos de gramática avanzada B2-C2."
        url="https://www.idiomaswl.com/practica/aleman"
        educationalLevel="A1,A2,B1,B2,C1,C2"
        teaches="Alemán, Goethe-Zertifikat"
        inLanguage="de"
      />
      <LanguageHub
        language="aleman"
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
