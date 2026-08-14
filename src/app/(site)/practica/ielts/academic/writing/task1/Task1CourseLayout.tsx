'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Grid2X2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import styles from './Task1CourseLayout.module.css';

type CourseRoute = {
  href: string;
  label: string;
  shortLabel: string;
};

type CourseGroup = {
  label: string;
  routes: CourseRoute[];
};

export const TASK1_COURSE_GROUPS: CourseGroup[] = [
  {
    label: 'Build the response',
    routes: [
      { href: '/practica/ielts/academic/writing/task1/introduccion', label: 'Introduction and paraphrasing', shortLabel: 'Introduction' },
      { href: '/practica/ielts/academic/writing/task1/overview', label: 'Overview and main features', shortLabel: 'Overview' },
      { href: '/practica/ielts/academic/writing/task1/body-1', label: 'Body 1 evidence group', shortLabel: 'Body 1' },
      { href: '/practica/ielts/academic/writing/task1/body-2', label: 'Body 2 evidence group', shortLabel: 'Body 2' },
    ],
  },
  {
    label: 'Read the visual',
    routes: [
      { href: '/practica/ielts/academic/writing/task1/graficos-lineales', label: 'Line graph decisions', shortLabel: 'Line graphs' },
      { href: '/practica/ielts/academic/writing/task1/graficos-de-barras', label: 'Bar chart decisions', shortLabel: 'Bar charts' },
      { href: '/practica/ielts/academic/writing/task1/pie-charts', label: 'Pie chart decisions', shortLabel: 'Pie charts' },
      { href: '/practica/ielts/academic/writing/task1/tablas', label: 'Table decisions', shortLabel: 'Tables' },
      { href: '/practica/ielts/academic/writing/task1/procesos', label: 'Process sequencing', shortLabel: 'Processes' },
      { href: '/practica/ielts/academic/writing/task1/mapas', label: 'Map transformations', shortLabel: 'Maps' },
    ],
  },
  {
    label: 'Strengthen and apply',
    routes: [
      { href: '/practica/ielts/academic/writing/task1/tendencias', label: 'Relevant trends', shortLabel: 'Trends' },
      { href: '/practica/ielts/academic/writing/task1/comparaciones', label: 'Precise comparisons', shortLabel: 'Comparisons' },
      { href: '/practica/ielts/academic/writing/task1/vocabulario', label: 'Data vocabulary', shortLabel: 'Vocabulary' },
      { href: '/practica/ielts/academic/writing/task1/tarea-completa', label: 'Complete timed task', shortLabel: 'Full task' },
    ],
  },
];

const COURSE_ROUTES = TASK1_COURSE_GROUPS.flatMap((group) => group.routes);
const TASK1_HUB = '/practica/ielts/academic/writing/task1';

function activeRoute(pathname: string) {
  return COURSE_ROUTES.find((route) => pathname === route.href || pathname.startsWith(`${route.href}/`));
}

export default function Task1CourseLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === TASK1_HUB) return children;

  const current = activeRoute(pathname) ?? COURSE_ROUTES[0];
  const currentIndex = COURSE_ROUTES.findIndex((route) => route.href === current.href);
  const previous = COURSE_ROUTES[currentIndex - 1];
  const next = COURSE_ROUTES[currentIndex + 1];

  return (
    <div className={styles.page} lang="en">
      <div className={styles.courseFrame}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/practica/ielts">IELTS</Link>
          <span aria-hidden="true">/</span>
          <Link href="/practica/ielts/academic/writing">Academic Writing</Link>
          <span aria-hidden="true">/</span>
          <Link href={TASK1_HUB}>Task 1</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{current.shortLabel}</span>
        </nav>

        <section className={styles.coursePanel} aria-labelledby="task1-course-map-heading">
          <div className={styles.coursePanelTop}>
            <div>
              <p className={styles.eyebrow}>IELTS Academic Writing Task 1</p>
              <p id="task1-course-map-heading" className={styles.courseTitle}><Grid2X2 size={20} aria-hidden="true" /> Task 1 lesson map</p>
              <p>Move between response structure, visual analysis and full-task practice without losing your place.</p>
            </div>
            <p className={styles.progress}><strong>{String(currentIndex + 1).padStart(2, '0')}</strong><span>of {COURSE_ROUTES.length}</span></p>
          </div>

          <div className={styles.courseGroups}>
            {TASK1_COURSE_GROUPS.map((group) => (
              <div key={group.label} className={styles.courseGroup}>
                <span>{group.label}</span>
                <div>
                  {group.routes.map((route) => {
                    const isActive = route.href === current.href;
                    return (
                      <Link key={route.href} href={route.href} aria-current={isActive ? 'page' : undefined} className={isActive ? styles.activeRoute : undefined}>
                        {route.shortLabel}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <nav className={styles.sequenceNav} aria-label="Task 1 lesson sequence">
            {previous ? <Link href={previous.href}><ArrowLeft size={15} aria-hidden="true" /> {previous.shortLabel}</Link> : <span />}
            <Link href={TASK1_HUB}>Task 1 hub</Link>
            {next ? <Link href={next.href}>{next.shortLabel} <ArrowRight size={15} aria-hidden="true" /></Link> : <span />}
          </nav>
        </section>
      </div>

      <div className={styles.lessonContent}>{children}</div>
    </div>
  );
}
