import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SPANISH_CLASSES, SPANISH_GUIDES, SPANISH_HUB, SPANISH_HUB_URL, TRAVEL_PHRASES } from '@/data/spanish-colombia';
import styles from '../spanish-colombia.module.css';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SPANISH_GUIDES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = SPANISH_GUIDES.find(item => item.slug === slug);
  if (!guide) return {};
  const url = `${SPANISH_HUB_URL}/${slug}`;
  return {
    title: `${guide.title} | WeLearn`,
    description: guide.description,
    keywords: null,
    alternates: { canonical: url },
    openGraph: { title: guide.title, description: guide.description, url, locale: 'en_US', type: 'article' },
    twitter: { card: 'summary_large_image', title: `${guide.title} | WeLearn`, description: guide.description },
  };
}

function ColombianSpanish() {
  return <>
    <p>There is no single “Colombian accent.” The way people speak changes across regions, cities and social settings. A recording from Bogotá is useful practice, but it cannot prepare you for every conversation in Colombia. Start with common Spanish and stay curious about the words you hear locally.</p>
    <h2>Listen for the relationship, not just the pronoun.</h2>
    <p>You will hear <strong>usted</strong>, <strong>tú</strong> and, in some regions, <strong>vos</strong>. Their use depends on place, relationship and context. For a new learner, a polite question with <em>usted</em>, such as <span lang="es">“¿Me puede ayudar?”</span>, is a useful starting point. Notice what people around you use before copying a form of address.</p>
    <div className={styles.articleCallout}><strong>Try this:</strong><p lang="es">“Disculpe, ¿me puede repetir eso más despacio?”</p><p>“Excuse me, could you repeat that more slowly?” This works even when you cannot follow an unfamiliar accent yet.</p></div>
    <h2>Three expressions you may hear</h2>
    <table className={styles.articleTable}><thead><tr><th>Expression</th><th>What it can mean</th><th>How to use it</th></tr></thead><tbody>
      <tr><td lang="es">Bacano / bacana</td><td>Great, cool or enjoyable</td><td>Recognize it first. It is informal, so wait until the setting feels right before using it.</td></tr>
      <tr><td lang="es">Chévere</td><td>Nice or great</td><td>A common positive reaction, but usage varies across Latin America.</td></tr>
      <tr><td lang="es">Sumercé</td><td>A respectful or affectionate form of address</td><td>Associated especially with central Colombia. Listen for it; you do not need to force it into your own speech.</td></tr>
    </tbody></table>
    <p>The <a href="https://www.asale.org/damer/bacano" target="_blank" rel="noopener noreferrer">Dictionary of Americanisms: bacano</a>, <a href="https://www.asale.org/damer/ch%C3%A9vere" target="_blank" rel="noopener noreferrer">chévere</a> and <a href="https://www.asale.org/damer/sumerc%C3%A9" target="_blank" rel="noopener noreferrer">sumercé</a> show why one word should never stand in for an entire national variety.</p>
    <h2>A ten-minute listening routine</h2>
    <ol><li>Choose a short Colombian interview or conversation with subtitles.</li><li>Listen once for the situation, not every word.</li><li>Replay one sentence and write the exact phrase you heard.</li><li>Say it aloud and note whether it sounds formal, familiar or regional.</li></ol>
    <p>Repeat with a different speaker the next day. Your goal is to understand people, not to imitate one “perfect” Colombian accent.</p>
  </>;
}

function TravelerSpanish() {
  return <>
    <p>For a first visit, useful Spanish is the language that helps you ask, confirm and recover when a conversation goes too fast. Practise complete sentences aloud, then change one word to fit your situation.</p>
    <h2>Four short conversations to rehearse</h2>
    <table className={styles.articleTable}><thead><tr><th>Situation</th><th>Say this</th><th>Meaning</th></tr></thead><tbody>{TRAVEL_PHRASES.map(item => <tr key={item.spanish}><td>{item.situation}</td><td lang="es">{item.spanish}</td><td>{item.english}</td></tr>)}</tbody></table>
    <div className={styles.articleCallout}><strong>Make it yours:</strong><p>Change <span lang="es">“este café”</span> to <span lang="es">“este libro”</span> or <span lang="es">“este pasaje”</span>. Keep the question frame and practise the new item.</p></div>
    <h2>When you do not understand</h2>
    <p>Do not pretend you followed everything. Try <span lang="es">“Entendí una parte. ¿Puede repetir la última palabra?”</span> (“I understood part of it. Could you repeat the last word?”). This is more precise than switching the whole conversation to English.</p>
    <h2>A small practice loop</h2>
    <ol><li>Read a phrase aloud three times.</li><li>Cover the Spanish and say it from the English meaning.</li><li>Change one word or place.</li><li>Use it with a real person when the situation arises.</li></ol>
    <p>Want a routine for the month before a trip? Follow the <Link href={`${SPANISH_HUB}/four-week-study-plan`}>four-week plan</Link>.</p>
  </>;
}

function FourWeekPlan() {
  const weeks = [
    { week: 'Week 1', focus: 'Everyday openings', work: 'Practise greetings, numbers, prices and polite questions. Record yourself asking for one item and one direction.' },
    { week: 'Week 2', focus: 'Understanding replies', work: 'Listen to short, clear conversations. Replay one sentence at a time and check what the other person actually answered.' },
    { week: 'Week 3', focus: 'Flexible sentences', work: 'Swap the people, places and objects in your first phrases. Add present-tense verbs for what you want, need and do.' },
    { week: 'Week 4', focus: 'Real exchanges', work: 'Have several short conversations. Keep a note of one phrase you missed and one sentence you want to say better next time.' },
  ];
  return <>
    <p>Four weeks will not make everyone fluent. They can make your practice more deliberate. This plan works before or during a stay in Colombia and can be repeated at a higher level. Adapt the time to your schedule; consistency matters more than a rigid daily target.</p>
    <h2>The plan</h2>
    <table className={styles.articleTable}><thead><tr><th>When</th><th>Focus</th><th>What to do</th></tr></thead><tbody>{weeks.map(item => <tr key={item.week}><td><strong>{item.week}</strong></td><td>{item.focus}</td><td>{item.work}</td></tr>)}</tbody></table>
    <div className={styles.articleCallout}><strong>Each practice session:</strong><p>Review one old sentence, listen to one new example and say something aloud. If you can, use the sentence in a real exchange.</p></div>
    <h2>How to notice progress</h2>
    <ul><li>Can you ask a question without translating every word first?</li><li>Can you understand the main point of a short answer?</li><li>Can you ask someone to repeat or rephrase without giving up?</li></ul>
    <p>At the end of each week, record a one-minute voice note answering those questions. Keep it so you can compare what changed. If you have a tutor or conversation partner, ask them which sentence caused confusion and why.</p>
    <p>For ready-to-use examples, start with <Link href={`${SPANISH_HUB}/spanish-for-travelers`}>Spanish for travelers</Link>. For listening across regions, read <Link href={`${SPANISH_HUB}/colombian-spanish`}>Colombian Spanish</Link>.</p>
  </>;
}

export default async function SpanishGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = SPANISH_GUIDES.find(item => item.slug === slug);
  if (!guide) notFound();
  const url = `${SPANISH_HUB_URL}/${slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', '@id': url, headline: guide.title, description: guide.description, inLanguage: 'en', mainEntityOfPage: url, author: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com/quienes-somos' }, publisher: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Learn Spanish in Colombia', item: SPANISH_HUB_URL },
        { '@type': 'ListItem', position: 3, name: guide.title, item: url },
      ] },
    ],
  };
  return <div className={styles.page} lang="en">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <header className={styles.articleHero}><div className={styles.articleHeroInner}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href={SPANISH_HUB}>Learn Spanish in Colombia</Link> / {guide.eyebrow}</nav><p className={styles.kicker}>{guide.eyebrow}</p><h1>{guide.title}</h1><p>{guide.description}</p></div></header>
    <article className={styles.articleBody}>
      {slug === 'colombian-spanish' ? <ColombianSpanish /> : slug === 'spanish-for-travelers' ? <TravelerSpanish /> : <FourWeekPlan />}
      <div className={styles.articleCallout}><strong>Want guided practice?</strong><p>WeLearn offers <Link href={SPANISH_CLASSES}>Spanish classes in Bucaramanga and online</Link>. Ask about current schedules and prices before booking a paid class.</p></div>
      <div className={styles.articleFooter}><Link href={SPANISH_HUB}>← Back to the hub</Link>{SPANISH_GUIDES.filter(item => item.slug !== slug).map(item => <Link key={item.slug} href={`${SPANISH_HUB}/${item.slug}`}>{item.title} →</Link>)}</div>
    </article>
  </div>;
}
