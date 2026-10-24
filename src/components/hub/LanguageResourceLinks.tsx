import Link from 'next/link';
import { LANGUAGE_RESOURCES, type LanguageResourceKey } from '@/data/language-resources';
import s from './LanguageResourceLinks.module.css';

export default function LanguageResourceLinks({ language }: { language: LanguageResourceKey }) {
  const resource = LANGUAGE_RESOURCES[language];

  return (
    <aside className={s.band} style={{ '--resource-accent': resource.accent } as React.CSSProperties} aria-label={`Recursos de ${resource.name}`}>
      <div className={s.inner}>
        <p className={s.intro}>También puedes explorar {resource.name} por tu cuenta:</p>
        <div className={s.links}>
          <Link href={resource.practice}>Ejercicios y materiales por nivel <span aria-hidden="true">→</span></Link>
          {resource.exams.map(exam => (
            <Link key={exam.href} href={exam.href}>Preparación {exam.label} <span aria-hidden="true">→</span></Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
