import type { ReactNode } from 'react';
import Task1CourseLayout from './Task1CourseLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return <Task1CourseLayout>{children}</Task1CourseLayout>;
}
