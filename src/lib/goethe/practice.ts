import type { MockExam, MockSection } from '@/data/mocks/types';
import { goethePracticeSetNumbers } from './release';

export type GoethePracticeSkill = 'listening' | 'reading' | 'writing' | 'speaking';
export type GoethePracticeTeil = 1 | 2 | 3;
export type GoetheA2PracticeSkill = Exclude<GoethePracticeSkill, 'listening'>;
export type GoetheA2PracticeTeil = 1 | 2 | 3 | 4;
export type GoetheB1PracticeSkill = Exclude<GoethePracticeSkill, 'listening'>;
export type GoetheB1PracticeTeil = 1 | 2 | 3 | 4 | 5;

export type GoethePracticeTeilMeta<TTeil extends number = GoethePracticeTeil> = {
  teil: TTeil;
  title: string;
  workload: string;
  minutes: number;
};

export const GOETHE_PRACTICE_TEILE: Record<GoethePracticeSkill, GoethePracticeTeilMeta<GoethePracticeTeil>[]> = {
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

export const GOETHE_A2_PRACTICE_TEILE: Record<GoethePracticeSkill, GoethePracticeTeilMeta<GoetheA2PracticeTeil>[]> = {
  listening: [
    { teil: 1, title: 'Kurze Texte', workload: '5 preguntas · audio pendiente', minutes: 8 },
    { teil: 2, title: 'Ein Gespräch', workload: '5 asignaciones · audio pendiente', minutes: 7 },
    { teil: 3, title: 'Kurze Gespräche', workload: '5 preguntas · audio pendiente', minutes: 7 },
    { teil: 4, title: 'Radiointerview', workload: '5 preguntas · audio pendiente', minutes: 8 },
  ],
  reading: [
    { teil: 1, title: 'Artikel', workload: '1 texto · 5 preguntas', minutes: 8 },
    { teil: 2, title: 'Informationstafel', workload: '1 tablero · 5 preguntas', minutes: 7 },
    { teil: 3, title: 'E-Mail', workload: '1 mensaje · 5 preguntas', minutes: 7 },
    { teil: 4, title: 'Anzeigen zuordnen', workload: '5 situaciones · 6 anuncios', minutes: 8 },
  ],
  writing: [
    { teil: 1, title: 'Persönliche Nachricht', workload: 'mensaje de 20–30 palabras', minutes: 15 },
    { teil: 2, title: 'Halbformelle E-Mail', workload: 'correo de 30–40 palabras', minutes: 15 },
  ],
  speaking: [
    { teil: 1, title: 'Fragen zur Person', workload: 'preguntar y responder', minutes: 5 },
    { teil: 2, title: 'Von sich erzählen', workload: 'tema con cuatro puntos', minutes: 5 },
    { teil: 3, title: 'Gemeinsam planen', workload: 'proponer, reaccionar y acordar', minutes: 5 },
  ],
};

export const GOETHE_B1_PRACTICE_TEILE: Record<GoethePracticeSkill, GoethePracticeTeilMeta<GoetheB1PracticeTeil>[]> = {
  listening: [
    { teil: 1, title: 'Kurze Texte', workload: '10 preguntas · 2 reproducciones', minutes: 10 },
    { teil: 2, title: 'Öffentlicher Monolog', workload: '5 preguntas · 1 reproducción', minutes: 8 },
    { teil: 3, title: 'Gespräch', workload: '7 preguntas · 1 reproducción', minutes: 8 },
    { teil: 4, title: 'Diskussion', workload: '8 asignaciones · 2 reproducciones', minutes: 14 },
  ],
  reading: [
    { teil: 1, title: 'Persönliche Korrespondenz', workload: '6 preguntas · Richtig/Falsch', minutes: 10 },
    { teil: 2, title: 'Pressetexte', workload: '2 textos · 6 preguntas', minutes: 20 },
    { teil: 3, title: 'Situationen und Anzeigen', workload: '7 situaciones · 10 anuncios', minutes: 10 },
    { teil: 4, title: 'Meinungen', workload: '7 opiniones · Ja/Nein', minutes: 15 },
    { teil: 5, title: 'Regeln', workload: '1 reglamento · 4 preguntas', minutes: 10 },
  ],
  writing: [
    { teil: 1, title: 'Persönliche E-Mail', workload: 'texto de unas 80 palabras', minutes: 20 },
    { teil: 2, title: 'Forumsbeitrag', workload: 'opinión de unas 80 palabras', minutes: 25 },
    { teil: 3, title: 'Formelle E-Mail', workload: 'correo de unas 40 palabras', minutes: 15 },
  ],
  speaking: [
    { teil: 1, title: 'Gemeinsam planen', workload: 'negociar y acordar un plan', minutes: 3 },
    { teil: 2, title: 'Thema präsentieren', workload: 'presentación con cinco puntos', minutes: 8 },
    { teil: 3, title: 'Feedback und Fragen', workload: 'reaccionar, preguntar y responder', minutes: 4 },
  ],
};

export function parseGoetheB1PracticeTeil(skill: GoethePracticeSkill, value?: string) {
  const teil = Number(value);
  return GOETHE_B1_PRACTICE_TEILE[skill].some(item => item.teil === teil)
    ? teil as GoetheB1PracticeTeil
    : undefined;
}

export function parseGoetheA2PracticeTeil(skill: GoethePracticeSkill, value?: string) {
  const teil = Number(value);
  return GOETHE_A2_PRACTICE_TEILE[skill].some(item => item.teil === teil)
    ? teil as GoetheA2PracticeTeil
    : undefined;
}

export function goetheA2PracticeHref(mockId: string, skill: GoetheA2PracticeSkill, teil?: GoetheA2PracticeTeil) {
  const params = new URLSearchParams({ mode: 'practice', skill });
  if (teil !== undefined) params.set('teil', String(teil));
  return `/examenes/goethe/practica/${mockId}?${params.toString()}`;
}

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

export function goethePracticeHref(mockId: string, skill: GoethePracticeSkill, teil?: GoethePracticeTeil) {
  const params = new URLSearchParams({ mode: 'practice', skill });
  if (teil !== undefined) params.set('teil', String(teil));
  return `/examenes/goethe/practica/${mockId}?${params.toString()}`;
}

export function nextGoethePractice(mockId: string, skill: GoethePracticeSkill, teil?: GoethePracticeTeil) {
  const setNumber = Number(mockId.match(/^a1-(\d+)$/)?.[1]);
  const availableSets = goethePracticeSetNumbers(skill);
  const setIndex = availableSets.indexOf(setNumber);
  if (setIndex < 0) return undefined;

  const nextTeil = teil === undefined
    ? undefined
    : GOETHE_PRACTICE_TEILE[skill].find(item => item.teil === teil + 1)?.teil;
  if (nextTeil) {
    return { href: goethePracticeHref(mockId, skill, nextTeil), label: `Continuar con Teil ${nextTeil}` };
  }
  const nextSet = availableSets[setIndex + 1];
  if (!nextSet) return undefined;

  return {
    href: goethePracticeHref(`a1-${nextSet}`, skill, teil === undefined ? undefined : 1),
    label: `Continuar con Set ${nextSet}${teil === undefined ? '' : ' · Teil 1'}`,
  };
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
