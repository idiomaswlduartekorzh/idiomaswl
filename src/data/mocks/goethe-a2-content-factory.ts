import golden from './goethe-a2-golden-set-1';
import type { GoetheA2AudioItem, GoetheA2Choice, GoetheA2Set, GoetheA2Turn } from './goethe-a2-golden-types';

export const choice = (
  set: number,
  code: string,
  prompt: string,
  options: [string, string, string],
  answer: 0 | 1 | 2,
): GoetheA2Choice => ({
  id: `g-a2-${set}-${code}`,
  prompt,
  options,
  answer,
  rationale: `Die Angabe „${options[answer]}“ entspricht dem Text.`,
  distractorRationales: options.map((option, index) => index === answer
    ? `Richtig: „${option}“ wird im Text bestätigt.`
    : `Falsch: „${option}“ wird vom Text nicht bestätigt.`) as [string, string, string],
});

export const audioChoice = (
  set: number,
  code: string,
  prompt: string,
  options: [string, string, string],
  answer: 0 | 1 | 2,
  turns: GoetheA2Turn[],
  visualNumber?: number,
): GoetheA2AudioItem => ({
  ...choice(set, code, prompt, options, answer),
  turns,
  ...(visualNumber ? {
    visualAsset: `/images/goethe/a2-${set}/hoeren-teil3-${visualNumber}.svg`,
    visualAlt: `Drei funktionale Bildoptionen A, B und C für Aufgabe ${visualNumber + 10}`,
  } : {}),
});

type SetCore = Pick<GoetheA2Set, 'reading' | 'writing' | 'speaking'> & {
  listening: Omit<GoetheA2Set['listening'], 'masterTrack'>;
};

export function createGoetheA2Set(
  set: number,
  title: string,
  lexicalDomains: string[],
  core: SetCore,
): GoetheA2Set {
  const folder = `/images/goethe/a2-${set}`;
  return {
    schemaVersion: 1,
    id: `a2-${set}`,
    status: 'AUDIO_BLOCKED',
    title,
    authorship: {
      owner: 'WeLearn',
      original: true,
      officialSourcesUsedForArchitectureOnly: true,
    },
    levelProfile: {
      audience: 'adults-16-plus',
      register: 'everyday-personal-and-semi-official',
      targetLevel: 'A2',
      grammarEnvelope: [...golden.levelProfile.grammarEnvelope],
      lexicalDomains,
    },
    reading: core.reading,
    listening: {
      ...core.listening,
      masterTrack: {
        status: 'script-ready-audio-blocked',
        path: `/audio/goethe/a2-${set}/goethe-a2-${set}-master.mp3`,
        targetMinutes: [22, 25],
        includesTransferWindow: true,
      },
    },
    writing: core.writing,
    speaking: core.speaking,
    scoring: golden.scoring,
    media: {
      style: 'functional-exam-editorial',
      photography: 'none',
      assets: [
        { id: `a2-${set}-h2`, path: `${folder}/hoeren-teil2.svg`, purpose: 'Hören Teil 2: neun Bildoptionen A bis I', alt: 'Neun klar gezeichnete Bildoptionen A bis I' },
        ...Array.from({ length: 5 }, (_, index) => ({ id: `a2-${set}-h3-${index + 1}`, path: `${folder}/hoeren-teil3-${index + 1}.svg`, purpose: `Hören Teil 3: Bildoptionen für Aufgabe ${index + 11}`, alt: `Drei Bildoptionen A, B und C für Aufgabe ${index + 11}` })),
        { id: `a2-${set}-sp3-a`, path: `${folder}/sprechen-teil3-a.svg`, purpose: 'Sprechen Teil 3: Terminkarte A', alt: 'Wochenplan für Prüfungsteilnehmerin oder Prüfungsteilnehmer A' },
        { id: `a2-${set}-sp3-b`, path: `${folder}/sprechen-teil3-b.svg`, purpose: 'Sprechen Teil 3: Terminkarte B', alt: 'Wochenplan für Prüfungsteilnehmerin oder Prüfungsteilnehmer B' },
      ],
    },
  };
}
