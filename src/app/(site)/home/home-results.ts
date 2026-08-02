export type HomeResultFamily = 'toefl' | 'ielts' | 'goethe' | 'celpe';

export type HomeResult = {
  id: string;
  family: HomeResultFamily;
  exam: string;
  result: string;
  image: string;
  alt: string;
  href: string;
  featured?: boolean;
  spotlight?: boolean;
};

const makeResult = (
  family: HomeResultFamily,
  number: number,
  exam: string,
  result: string,
  href: string,
  options: Pick<HomeResult, 'featured' | 'spotlight'> = {},
): HomeResult => ({
  id: `${family}-${String(number).padStart(2, '0')}`,
  family,
  exam,
  result,
  image: `/images/home/results/${family}-${String(number).padStart(2, '0')}.webp`,
  alt: `Fragmento anónimo de ${exam} con resultado ${result}`,
  href,
  ...options,
});

export const HOME_RESULTS: readonly HomeResult[] = [
  makeResult('toefl', 1, 'TOEFL iBT', '99 / 120', '/examenes/toefl', { featured: true, spotlight: true }),
  makeResult('ielts', 1, 'IELTS Academic', 'Band 8.0', '/examenes/ielts', { featured: true, spotlight: true }),
  makeResult('goethe', 4, 'Goethe-Zertifikat A1', '95 / 100', '/examenes/goethe', { featured: true, spotlight: true }),
  makeResult('celpe', 1, 'Celpe-Bras', 'Avançado', '/examenes/celpe-bras', { featured: true, spotlight: true }),
  makeResult('toefl', 2, 'TOEFL iBT', '95 / 120', '/examenes/toefl', { featured: true }),
  makeResult('ielts', 2, 'IELTS Academic', 'Band 7.5', '/examenes/ielts', { featured: true }),
  makeResult('goethe', 1, 'Goethe-Zertifikat B1', 'Cuatro módulos aprobados', '/examenes/goethe', { featured: true }),
  makeResult('celpe', 2, 'Celpe-Bras', 'Intermediário Superior', '/examenes/celpe-bras', { featured: true }),
  makeResult('toefl', 3, 'TOEFL iBT', '93 / 120', '/examenes/toefl'),
  makeResult('toefl', 4, 'TOEFL iBT', '73 / 120', '/examenes/toefl'),
  makeResult('toefl', 5, 'TOEFL iBT', '87 / 120', '/examenes/toefl'),
  makeResult('toefl', 6, 'TOEFL iBT', '92 / 120', '/examenes/toefl'),
  makeResult('toefl', 7, 'TOEFL iBT', '86 / 120', '/examenes/toefl'),
  makeResult('toefl', 8, 'TOEFL iBT', '82 / 120', '/examenes/toefl'),
  makeResult('toefl', 9, 'TOEFL iBT', '81 / 120', '/examenes/toefl'),
  makeResult('toefl', 10, 'TOEFL iBT', '72 / 120', '/examenes/toefl'),
  makeResult('toefl', 11, 'TOEFL iBT', '71 / 120', '/examenes/toefl'),
  makeResult('ielts', 3, 'IELTS Academic', 'Band 7.5', '/examenes/ielts'),
  makeResult('ielts', 4, 'IELTS Academic', 'Band 6.0', '/examenes/ielts'),
  makeResult('ielts', 5, 'IELTS Academic', 'Band 6.0', '/examenes/ielts'),
  makeResult('ielts', 6, 'IELTS Academic', 'Band 6.0', '/examenes/ielts'),
  makeResult('ielts', 7, 'IELTS Academic', 'Band 6.0', '/examenes/ielts'),
  makeResult('ielts', 8, 'IELTS Academic', 'Band 6.0', '/examenes/ielts'),
  makeResult('ielts', 9, 'IELTS Academic', 'Band 5.0', '/examenes/ielts'),
  makeResult('ielts', 10, 'IELTS Academic', 'Band 5.0', '/examenes/ielts'),
  makeResult('goethe', 2, 'Goethe-Zertifikat B1', 'Cuatro módulos aprobados', '/examenes/goethe'),
  makeResult('goethe', 3, 'Goethe-Zertifikat A2', '65 / 100', '/examenes/goethe'),
  makeResult('goethe', 5, 'Goethe-Zertifikat A1', '92 / 100', '/examenes/goethe'),
  makeResult('goethe', 6, 'Goethe-Zertifikat A1', '88 / 100', '/examenes/goethe'),
  makeResult('goethe', 7, 'Goethe-Zertifikat A1', '87 / 100', '/examenes/goethe'),
  makeResult('goethe', 8, 'Goethe-Zertifikat A1', '70 / 100', '/examenes/goethe'),
  makeResult('goethe', 9, 'Goethe-Zertifikat A1', '64 / 100', '/examenes/goethe'),
  makeResult('goethe', 10, 'Goethe-Zertifikat A1', '63 / 100', '/examenes/goethe'),
  makeResult('goethe', 11, 'Goethe-Zertifikat A1', '63 / 100', '/examenes/goethe'),
  makeResult('celpe', 3, 'Celpe-Bras', 'Intermediário Superior', '/examenes/celpe-bras'),
  makeResult('celpe', 4, 'Celpe-Bras', 'Intermediário Superior', '/examenes/celpe-bras'),
  makeResult('celpe', 5, 'Celpe-Bras', 'Intermediário Superior', '/examenes/celpe-bras'),
] as const;

export const HOME_RESULT_FAMILIES = [
  { id: 'all', label: 'Todos', count: 37 },
  { id: 'toefl', label: 'TOEFL', count: 11 },
  { id: 'ielts', label: 'IELTS', count: 10 },
  { id: 'goethe', label: 'Goethe', count: 11 },
  { id: 'celpe', label: 'Celpe-Bras', count: 5 },
] as const;
