import Link from 'next/link';
import s from './PracticeBand.module.css';

export type PracticeCard = {
  href: string;
  title: string;
  desc: string;
};

export type PracticeBandProps = {
  /** Color de acento de la landing. */
  accent: string;
  /** H2 de la sección — debe apuntar a intención de búsqueda real. */
  title: string;
  sub: string;
  cards: PracticeCard[];
  eyebrow?: string;
};

export default function PracticeBand({
  accent,
  title,
  sub,
  cards,
  eyebrow = 'Práctica gratuita',
}: PracticeBandProps) {
  return (
    <section className={s.band} style={{ ['--pb-accent' as string]: accent }}>
      <div className={s.wrap}>
        <p className={s.eyebrow}>{eyebrow}</p>
        <h2 className={s.title}>{title}</h2>
        <p className={s.sub}>{sub}</p>
        <div className={s.grid}>
          {cards.map(c => (
            <Link key={c.href} href={c.href} className={s.card}>
              <span className={s.badge}>Gratis</span>
              <p className={s.cardTitle}>{c.title}</p>
              <p className={s.cardDesc}>{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
