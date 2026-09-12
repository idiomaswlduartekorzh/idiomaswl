import type { MockExam, MockSection } from '@/data/mocks/types';

export type GoethePracticeSkill = 'listening' | 'reading' | 'writing' | 'speaking';
export type GoethePracticeTeil = 1 | 2 | 3;

export type GoethePracticeTeilMeta = {
  teil: GoethePracticeTeil;
  title: string;
  workload: string;
  minutes: number;
};

export const GOETHE_PRACTICE_TEILE: Record<GoethePracticeSkill, GoethePracticeTeilMeta[]> = {
  listening: [
    { teil: 1, title: 'Kurze Gespräche', workload: '6 preguntas · 2 reproducciones', minutes: 8 },
    { teil: 2, title: 'Öffentliche Ansagen', workload: '4 preguntas · 1 reproducción', minutes: 5 },
    { teil: 3, title: 'Telefonische Nachrichten', workload: '5 preguntas · 2 reproducciones', minutes: 7 },
  ],
  reading: [
    { teil: 1, title: 'Nachrichten', workload: '2 textos · 5 preguntas', minutes: 9 },
    { teil: 2, title: 'Anzeigen und Internetseiten', workload: '5 situaciones · 5 preguntas', minutes: 9 },
    { teil: 3, title: 'Schilder und Hinweise', workload: '5 avisos · 5 preguntas', minutes: 7 },
  ],
  writing: [
    { teil: 1, title: 'Formular', workload: '5 campos del formulario', minutes: 10 },
    { teil: 2, title: 'Kurze Mitteilung', workload: 'mensaje de unas 30 palabras', minutes: 10 },
  ],
  speaking: [
    { teil: 1, title: 'Sich vorstellen', workload: 'presentación, deletreo y teléfono', minutes: 5 },
    { teil: 2, title: 'Fragen und Antworten', workload: 'tarjetas de palabras', minutes: 5 },
    { teil: 3, title: 'Bitten und reagieren', workload: 'tarjetas con imágenes', minutes: 5 },
  ],
};

export function parseGoethePracticeTeil(skill: GoethePracticeSkill, value?: string) {
  const teil = Number(value);
  return GOETHE_PRACTICE_TEILE[skill].some(item => item.teil === teil)
    ? teil as GoethePracticeTeil
    : undefined;
}

export function goethePracticeTeilMeta(skill: GoethePracticeSkill, teil?: GoethePracticeTeil) {
  return teil === undefined
    ? undefined
    : GOETHE_PRACTICE_TEILE[skill].find(item => item.teil === teil);
}

export function goethePracticeSections(mock: MockExam, skill: GoethePracticeSkill, teil?: GoethePracticeTeil): MockSection[] {
  const sections = mock.sections.filter(section => section.skill === skill);
  if (teil === undefined) return sections;
  return sections.filter(section => {
    const officialTeil = section.part <= 3
      ? section.part
      : section.part <= 6
        ? section.part - 3
        : section.part <= 8
          ? section.part - 6
          : section.part - 8;
    return officialTeil === teil;
  });
}
