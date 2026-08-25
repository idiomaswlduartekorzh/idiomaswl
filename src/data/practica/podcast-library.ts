export type PodcastLibraryEpisode = {
  id: string;
  slug: string;
  examSlug: 'ielts' | 'toefl' | 'icfes' | 'cambridge-b2' | 'sat';
  title: string;
  description: string;
  duration: string;
  durationIso: string;
  language: 'English' | 'Español';
  collection: 'IELTS' | 'TOEFL' | 'ICFES' | 'Cambridge B2' | 'SAT';
  href: string;
  hubHref: string;
  audioSrc: string;
  accent: string;
};

/**
 * Catálogo público y único de las guías largas en audio de WeLearn.
 *
 * Los podcasts del método de coreano viven dentro de sus lecciones y no entran aquí:
 * esta biblioteca reúne episodios editoriales que se pueden escuchar sin iniciar sesión.
 */
export const PODCAST_LIBRARY: readonly PodcastLibraryEpisode[] = [
  {
    id: 'ielts-reading-strategies',
    slug: 'ielts-academic-reading-strategies-and-traps',
    examSlug: 'ielts',
    title: 'IELTS Academic Reading: Strategies and Traps',
    description: 'A map for the 60-minute Reading test: question families, evidence, paraphrase and pacing.',
    duration: '18:43',
    durationIso: 'PT18M43S',
    language: 'English',
    collection: 'IELTS',
    href: '/examenes/ielts/podcast/ielts-academic-reading-strategies-and-traps',
    hubHref: '/practica/ielts/reading',
    audioSrc: '/audio/ielts/reading/ielts-academic-reading-strategies-and-traps.mp3',
    accent: '#c8202e',
  },
  {
    id: 'ielts-writing-task-1',
    slug: 'mastering-ielts-academic-writing-task-1',
    examSlug: 'ielts',
    title: 'Mastering IELTS Academic Writing Task 1',
    description: 'How to read the visual, select the main features and protect the recommended 20-minute budget.',
    duration: '19:56',
    durationIso: 'PT19M56S',
    language: 'English',
    collection: 'IELTS',
    href: '/examenes/ielts/podcast/mastering-ielts-academic-writing-task-1',
    hubHref: '/practica/ielts/academic/writing/task1',
    audioSrc: '/audio/ielts/task1/mastering-ielts-academic-writing-task-1.mp3',
    accent: '#d43b49',
  },
  {
    id: 'ielts-writing-task-2',
    slug: 'picking-the-ielts-task-2-lock',
    examSlug: 'ielts',
    title: 'Picking the IELTS Task 2 Lock',
    description: 'Decode the prompt, plan a position and connect every paragraph to the four scoring criteria.',
    duration: '21:45',
    durationIso: 'PT21M45S',
    language: 'English',
    collection: 'IELTS',
    href: '/examenes/ielts/podcast/picking-the-ielts-task-2-lock',
    hubHref: '/practica/ielts/academic/writing/task2',
    audioSrc: '/audio/ielts/task2/picking-the-ielts-task-2-lock.mp3',
    accent: '#8e3d73',
  },
  {
    id: 'toefl-2026-strategy-map',
    slug: 'toefl-ibt-2026-strategy-map',
    examSlug: 'toefl',
    title: 'Your 2026 TOEFL iBT Strategy Map',
    description: 'A practical orientation to the current four-section test and the study decisions that transfer across tasks.',
    duration: '22:06',
    durationIso: 'PT22M6S',
    language: 'English',
    collection: 'TOEFL',
    href: '/examenes/toefl/podcast/toefl-ibt-2026-strategy-map',
    hubHref: '/practica/toefl',
    audioSrc: '/audio/toefl/strategy-map/your-2026-toefl-ibt-strategy-map.mp3',
    accent: '#2563eb',
  },
  {
    id: 'icfes-seven-parts',
    slug: 'estrategias-siete-partes-icfes-saber-11',
    examSlug: 'icfes',
    title: 'Estrategias para dominar las 7 partes del ICFES',
    description: 'Un recorrido en español por las siete partes de Inglés Saber 11, sus decisiones y sus trampas frecuentes.',
    duration: '25:48',
    durationIso: 'PT25M48S',
    language: 'Español',
    collection: 'ICFES',
    href: '/examenes/icfes/podcast/estrategias-siete-partes-icfes-saber-11',
    hubHref: '/practica/icfes-saber-11',
    audioSrc: '/audio/icfes/strategy-map/estrategias-para-las-7-partes-del-icfes.mp3?v=20260821',
    accent: '#0f8a70',
  },
  {
    id: 'cambridge-b2-first',
    slug: 'how-to-pass-cambridge-b2-first',
    examSlug: 'cambridge-b2',
    title: 'How to Pass Cambridge B2 First',
    description: 'Understand the four papers, the Cambridge English Scale and a repeatable preparation cycle for B2 First.',
    duration: '19:57',
    durationIso: 'PT19M57S',
    language: 'English',
    collection: 'Cambridge B2',
    href: '/examenes/cambridge-b2/podcast/how-to-pass-cambridge-b2-first',
    hubHref: '/examenes/cambridge-b2',
    audioSrc: '/audio/cambridge-b2/strategy-map/how-to-pass-cambridge-b2-first.mp3?v=20260823',
    accent: '#6d4fd3',
  },
  {
    id: 'digital-sat-strategy-map',
    slug: 'digital-sat-strategy-map',
    examSlug: 'sat',
    title: 'Your Digital SAT Strategy Map',
    description: 'Navigate the adaptive modules, build an evidence-based study loop and use the Bluebook tools deliberately.',
    duration: '22:30',
    durationIso: 'PT22M30S',
    language: 'English',
    collection: 'SAT',
    href: '/examenes/sat/podcast/digital-sat-strategy-map',
    hubHref: '/examenes/sat',
    audioSrc: '/audio/sat/strategy-map/strategic-map-for-the-digital-sat.mp3?v=20260823',
    accent: '#d06b23',
  },
] as const;
