import Link from 'next/link';
import styles from '@/app/(site)/kids/kids.module.css';
import { WA_NUMBER } from '@/components/hub/localBusiness';

export type FaqItem = {
  question: string;
  answer: string;
};

export function kidsWhatsApp(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function KidsBreadcrumbs({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Migas de pan">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      {lead ? <p>{lead}</p> : null}
    </div>
  );
}

export function KidsFaq({ items }: { items: FaqItem[] }) {
  return (
    <div className={styles.faqList}>
      {items.map((item) => (
        <details key={item.question} className={styles.faqItem}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function KidsCta({
  title,
  text,
  message,
  secondaryHref = '/kids',
  secondaryLabel = 'Ver WeLearn Kids',
}: {
  title: string;
  text: string;
  message: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className={styles.finalCta} aria-labelledby="kids-final-cta">
      <div>
        <p className={styles.eyebrow}>Información para madres, padres y acudientes</p>
        <h2 id="kids-final-cta">{title}</h2>
        <p>{text}</p>
      </div>
      <div className={styles.ctaActions}>
        <a className={styles.primaryButton} href={kidsWhatsApp(message)} target="_blank" rel="noopener noreferrer">
          Consultar por WhatsApp
        </a>
        <Link className={styles.secondaryButton} href={secondaryHref}>
          {secondaryLabel}
        </Link>
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
