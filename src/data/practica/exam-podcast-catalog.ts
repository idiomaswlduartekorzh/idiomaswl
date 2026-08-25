import type { EpisodeSection } from '@/components/practica/EpisodeNotes';

import readingNotes from './podcasts/academic-reading-strategies-and-traps';
import task1Notes from './podcasts/mastering-academic-writing-task-1';
import task2Notes from './podcasts/picking-the-task-2-lock';
import toeflNotes, { TOEFL_STRATEGY_MAP_PODCAST } from './podcasts/your-2026-toefl-ibt-strategy-map';
import {
  ICFES_SEVEN_PARTS_NOTES,
  ICFES_SEVEN_PARTS_PODCAST,
} from './podcasts/estrategias-para-las-7-partes-del-icfes';
import {
  CAMBRIDGE_B2_FIRST_NOTES,
  CAMBRIDGE_B2_FIRST_PODCAST,
} from './podcasts/how-to-pass-cambridge-b2-first';
import {
  DIGITAL_SAT_STRATEGY_MAP_NOTES,
  DIGITAL_SAT_STRATEGY_MAP_PODCAST,
} from './podcasts/strategic-map-for-the-digital-sat';
import { PODCAST_LIBRARY, type PodcastLibraryEpisode } from './podcast-library';

export type ExamPodcastLink = {
  href: string;
  label: string;
};

export type ExamPodcastEpisode = PodcastLibraryEpisode & {
  fullDescription: string;
  outcomes: readonly string[];
  editorialTitle: string;
  editorialBody: string;
  notes: EpisodeSection[];
  relatedLinks: readonly ExamPodcastLink[];
  keywords: readonly string[];
  locale: 'en' | 'es';
};

const byId = (id: PodcastLibraryEpisode['id']) => {
  const episode = PODCAST_LIBRARY.find((item) => item.id === id);
  if (!episode) throw new Error(`Podcast no registrado: ${id}`);
  return episode;
};

export const EXAM_PODCASTS: readonly ExamPodcastEpisode[] = [
  {
    ...byId('ielts-reading-strategies'),
    fullDescription:
      'Use this English episode as your map of IELTS Academic Reading: understand the official format, distinguish the question families, avoid the most expensive traps and turn Map, Locate, Compare and Control into a repeatable practice system.',
    outcomes: [
      'Explain the three-passage, 40-question, 60-minute Academic Reading format and its objective scoring.',
      'Distinguish evidence and viewpoint, matching and organisation, and completion decisions.',
      'Use skimming, scanning, paraphrase, inference, word-limit and pacing skills inside one repeatable loop.',
      'Move from focused question practice to mixed transfer, adding full timing only after the method is stable.',
    ],
    editorialTitle: 'Three clarifications before you press play',
    editorialBody:
      'This AI-produced conversation has been checked against the official format. IELTS labels the writer-view format Yes / No / Not Given. Its official format page defines 11 numbered Academic Reading question-type categories, but an individual test uses a variable selection of formats. On computer, answers are entered on screen; on paper, they must be transferred within the same 60 minutes.',
    notes: readingNotes,
    relatedLinks: [
      { href: '/practica/ielts/reading', label: 'Open the IELTS Reading hub' },
      { href: '/practica/ielts/reading/tipos-de-preguntas', label: 'Study question types' },
      { href: '/practica/ielts/reading/habilidades', label: 'Build Reading skills' },
      { href: '/practica/ielts/reading/mixed-practice', label: 'Enter mixed practice' },
    ],
    keywords: ['IELTS Reading podcast', 'IELTS Academic Reading strategies', 'IELTS Reading traps', 'IELTS Reading audio guide'],
    locale: 'en',
  },
  {
    ...byId('ielts-writing-task-1'),
    fullDescription:
      'Use this English episode as your map of IELTS Academic Writing Task 1: understand the task, protect the recommended 20 minutes, read each visual and translate the four scoring criteria into a practice plan.',
    outcomes: [
      'Separate official requirements from useful preparation defaults and budget Task 1 inside the full Writing test.',
      'Read the visual type, select its main features and avoid explanations the visual does not support.',
      'Group evidence logically, write a clear overview and report details with accurate comparisons.',
      'Turn Read, Select, Group and Report into focused lessons and complete-task practice.',
    ],
    editorialTitle: 'Useful defaults, not hidden IELTS rules',
    editorialBody:
      'This AI-produced conversation has been checked against the lesson. The four-part plan, suggested paragraph ranges, a number-free overview and passive-heavy process descriptions are practical defaults—not fixed IELTS rules. IELTS does not prescribe a paragraph count, overview location or sentence formula.',
    notes: task1Notes,
    relatedLinks: [
      { href: '/practica/ielts/academic/writing/task1', label: 'Open the Task 1 hub' },
      { href: '/practica/ielts/academic/writing/task1/overview', label: 'Practise the overview' },
      { href: '/practica/ielts/academic/writing/task1/comparaciones', label: 'Practise comparisons' },
      { href: '/practica/ielts/academic/writing/task1/tarea-completa', label: 'Write a complete Task 1 response' },
    ],
    keywords: ['IELTS Writing Task 1 podcast', 'IELTS Academic Task 1 audio guide', 'IELTS Task 1 strategy', 'IELTS charts podcast'],
    locale: 'en',
  },
  {
    ...byId('ielts-writing-task-2'),
    fullDescription:
      'Use this English episode as your map of IELTS Writing Task 2: decode the instruction, plan a visible position, develop ideas in logical chains and connect every paragraph to the four scoring criteria.',
    outcomes: [
      'Decode the instruction before choosing an essay structure.',
      'Plan a clear position and develop relevant ideas instead of listing them.',
      'Connect the four scoring criteria to specific writing decisions.',
      'Turn the episode into practice through essay architecture, question types and transferable writing skills.',
    ],
    editorialTitle: 'Useful defaults, not hidden IELTS rules',
    editorialBody:
      'This AI-produced conversation has been checked against the lesson. A four-paragraph essay, about five minutes of planning and an introduction roadmap are practical options—not official requirements. IELTS does not prescribe a fixed paragraph count or one mandatory thesis formula.',
    notes: task2Notes,
    relatedLinks: [
      { href: '/practica/ielts/academic/writing/task2', label: 'Open the Task 2 hub' },
      { href: '/practica/ielts/academic/writing/task2/analisis-pregunta', label: 'Decode the prompt' },
      { href: '/practica/ielts/academic/writing/task2/introduccion', label: 'Build the introduction' },
      { href: '/practica/ielts/academic/writing/task2/tarea-completa', label: 'Write a complete essay' },
    ],
    keywords: ['IELTS Writing Task 2 podcast', 'IELTS essay strategy audio', 'IELTS Task 2 podcast', 'IELTS writing guide'],
    locale: 'en',
  },
  {
    ...TOEFL_STRATEGY_MAP_PODCAST,
    ...byId('toefl-2026-strategy-map'),
    fullDescription: TOEFL_STRATEGY_MAP_PODCAST.description,
    notes: toeflNotes,
    relatedLinks: [
      { href: '/practica/toefl', label: 'Open the TOEFL practice hub' },
      { href: '/practica/toefl/reading', label: 'Practise Reading' },
      { href: '/practica/toefl/listening', label: 'Practise Listening' },
      { href: '/practica/toefl/writing', label: 'Practise Writing' },
      { href: '/practica/toefl/speaking', label: 'Practise Speaking' },
      { href: '/examenes/toefl', label: 'Take a TOEFL mock test' },
    ],
    keywords: ['TOEFL podcast', 'TOEFL iBT 2026 podcast', 'TOEFL strategy map', 'TOEFL audio guide'],
    locale: 'en',
  },
  {
    ...ICFES_SEVEN_PARTS_PODCAST,
    ...byId('icfes-seven-parts'),
    fullDescription: ICFES_SEVEN_PARTS_PODCAST.description,
    notes: ICFES_SEVEN_PARTS_NOTES,
    relatedLinks: [
      { href: '/practica/icfes-saber-11', label: 'Abrir la ruta de las 7 partes' },
      { href: '/practica/icfes-saber-11/diagnostico', label: 'Hacer el diagnóstico' },
      { href: '/practica/icfes-saber-11/simulacro-guiado', label: 'Practicar con guía' },
      { href: '/practica/icfes-saber-11/plan-de-estudio', label: 'Crear un plan de estudio' },
    ],
    keywords: ['podcast ICFES inglés', '7 partes ICFES inglés', 'estrategias ICFES Saber 11', 'audio ICFES inglés'],
    locale: 'es',
  },
  {
    ...CAMBRIDGE_B2_FIRST_PODCAST,
    ...byId('cambridge-b2-first'),
    fullDescription: CAMBRIDGE_B2_FIRST_PODCAST.description,
    notes: CAMBRIDGE_B2_FIRST_NOTES,
    relatedLinks: [
      { href: '/examenes/cambridge-b2', label: 'Open the Cambridge B2 hub' },
      { href: '/examenes/cambridge-b2/practica/set-1', label: 'Take the complete diagnostic' },
      { href: '/practica/ingles/b2/uso-del-idioma', label: 'Train B2 Use of English' },
      { href: '/nivel-radar', label: 'Check your current level' },
    ],
    keywords: ['Cambridge B2 podcast', 'B2 First podcast', 'how to pass Cambridge B2', 'Cambridge First audio guide'],
    locale: 'en',
  },
  {
    ...DIGITAL_SAT_STRATEGY_MAP_PODCAST,
    ...byId('digital-sat-strategy-map'),
    fullDescription: DIGITAL_SAT_STRATEGY_MAP_PODCAST.description,
    notes: DIGITAL_SAT_STRATEGY_MAP_NOTES,
    relatedLinks: [
      { href: '/examenes/sat', label: 'Open the Digital SAT hub' },
      { href: '/examenes/sat/practica/set-1', label: 'Take the SAT diagnostic' },
      { href: '/examenes/sat/guia/reading-and-writing', label: 'Map Reading and Writing' },
      { href: '/examenes/sat/guia/como-estudiar-sat-desde-cero', label: 'Build a study plan' },
    ],
    keywords: ['Digital SAT podcast', 'SAT strategy podcast', 'Digital SAT audio guide', 'SAT preparation podcast'],
    locale: 'en',
  },
] as const;

export function getExamPodcasts(examSlug: string) {
  return EXAM_PODCASTS.filter((episode) => episode.examSlug === examSlug);
}

export function getExamPodcast(examSlug: string, slug: string) {
  return EXAM_PODCASTS.find((episode) => episode.examSlug === examSlug && episode.slug === slug);
}
