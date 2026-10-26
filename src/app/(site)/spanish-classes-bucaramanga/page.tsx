import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SPANISH_CLASSES_URL, SPANISH_HUB } from '@/data/spanish-colombia';
import styles from '../learn-spanish-colombia/spanish-colombia.module.css';

const title = 'Spanish Classes in Bucaramanga & Online | WeLearn';
const description = 'Learn Spanish with WeLearn in person in Bucaramanga or online. Explore both options, see our location, and ask about schedules and prices.';
const whatsapp = (message: string) => `https://wa.me/573005004253?text=${encodeURIComponent(message)}`;
const contact = whatsapp('Hello, I am interested in Spanish classes for foreigners. Could you tell me about online and in-person options, schedules and prices?');
const inPersonContact = whatsapp('Hello, I am interested in in-person Spanish classes for foreigners in Bucaramanga. What schedules and prices are available?');
const onlineContact = whatsapp('Hello, I am interested in online Spanish classes for foreigners. What schedules and prices are available?');

export const metadata: Metadata = {
  title,
  description,
  keywords: null,
  alternates: { canonical: SPANISH_CLASSES_URL },
  openGraph: { title, description, url: SPANISH_CLASSES_URL, locale: 'en_US', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': SPANISH_CLASSES_URL,
      url: SPANISH_CLASSES_URL,
      name: title,
      description,
      inLanguage: 'en',
      publisher: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Spanish classes in Bucaramanga and online', item: SPANISH_CLASSES_URL },
      ],
    },
  ],
};

export default function SpanishClassesBucaramangaPage() {
  return <main className={styles.page} lang="en">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className={styles.utilityBar}><span>WeLearn · Bucaramanga, Colombia</span><Link href={SPANISH_HUB}>Explore the free Spanish guide ↗</Link></div>

    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Spanish for foreigners · Colombia</p>
          <h1>Spanish classes in Bucaramanga <em>and online.</em></h1>
          <p className={styles.lede}>Learn with WeLearn in person at our Bucaramanga location or take Spanish classes online. Tell us where you are, what you want to use Spanish for and which format fits your routine.</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href={contact} target="_blank" rel="noopener noreferrer" data-wa-cta="spanish-classes-hero">Ask about Spanish classes ↗</a>
            <a className={styles.textButton} href="#formats">Compare the formats ↓</a>
          </div>
          <p className={styles.heroNote}>Ask about current tutor availability, schedules and price before booking. Classes with a tutor are paid.</p>
        </div>
        <div className={styles.heroArt} role="img" aria-label="Spanish sentence ¿Cómo puedo llegar? meaning How can I get there?">
          <span className={styles.artIndex}>SPANISH FOR REAL CONVERSATIONS</span>
          <span className={styles.artQuote}>“¿Cómo puedo<br />llegar?”</span>
          <span className={styles.artTranslation}>How can I get there?</span>
          <div className={styles.artLine} />
          <span className={styles.artCaption}>Practise what you want to say in Colombia.</span>
        </div>
      </div>
    </header>

    <section id="formats" className={`${styles.section} ${styles.pathsSection}`}>
      <div className={styles.sectionHeading}><div><p className={styles.kicker}>Two ways to study</p><h2>Choose the format that fits your life.</h2></div><p>Both options are Spanish classes with WeLearn. The in-person location is in Bucaramanga; online classes let you study from elsewhere.</p></div>
      <div className={styles.formatGrid}>
        <article className={styles.formatCard}><span>In person · Bucaramanga</span><h3>Learn Spanish at our location.</h3><p>Come to Calle 47 #29-33 in Sotomayor, Bucaramanga. Use your lessons to prepare for the everyday conversations you expect to have in Colombia.</p><a href={inPersonContact} target="_blank" rel="noopener noreferrer" data-wa-cta="spanish-classes-in-person">Ask about in-person classes →</a></article>
        <article className={styles.formatCard}><span>Online · from wherever you are</span><h3>Start before your trip or keep going after it.</h3><p>Take Spanish classes online if you live outside Bucaramanga, are planning a visit or need to continue studying while you move between places.</p><a href={onlineContact} target="_blank" rel="noopener noreferrer" data-wa-cta="spanish-classes-online">Ask about online classes →</a></article>
      </div>
    </section>

    <section className={`${styles.section} ${styles.introSection}`}>
      <div className={styles.sectionLead}><p className={styles.kicker}>What to ask before booking</p><h2>Bring a goal, even a small one.</h2><p>Tell us your current level, where you will use Spanish and a situation you want to handle better. Ask which tutor, schedule and class format are available for that goal. You can discuss the price before you reserve a paid class.</p></div>
      <div className={styles.steps}>
        <article className={styles.step}><span>01</span><h3>Everyday Spanish</h3><p>Ordering, directions, appointments and other conversations you want to handle with more confidence.</p></article>
        <article className={styles.step}><span>02</span><h3>Listening in Colombia</h3><p>Practice understanding real voices and noticing how speech changes with the city and the situation.</p></article>
        <article className={styles.step}><span>03</span><h3>Useful feedback</h3><p>Ask how a tutor will help you notice and improve the sentences that did not work in conversation.</p></article>
      </div>
    </section>

    <section className={`${styles.section} ${styles.trustSection}`}>
      <div><p className={styles.kicker}>Who you are contacting</p><h2>A language team with a real address.</h2><p>José David Duarte Silva and Zhanna Korzh founded WeLearn in Bucaramanga and designed its language-learning method. Our in-person Spanish classes are offered in Bucaramanga; our other format is online.</p><address className={styles.address}>Calle 47 #29-33, Sotomayor · Bucaramanga, Santander</address><div className={styles.trustLinks}><Link href="/quienes-somos">Meet the founders →</Link><a href="https://maps.google.com/?q=Calle+47+%2329-33+Sotomayor+Bucaramanga+Idiomas+WeLearn" target="_blank" rel="noopener noreferrer">Find the location ↗</a></div></div>
      <div className={styles.founders}><figure><Image src="/images/david-duarte.jpg" width={120} height={140} alt="José David Duarte Silva, WeLearn co-founder" /><figcaption>José David Duarte Silva<br /><span>Co-founder</span></figcaption></figure><figure><Image src="/images/team-zhanna-korzh.png" width={120} height={140} alt="Zhanna Korzh, WeLearn co-founder" /><figcaption>Zhanna Korzh<br /><span>Co-founder & academic director</span></figcaption></figure></div>
    </section>

    <section className={`${styles.section} ${styles.faqSection}`}><div className={styles.sectionHeading}><div><p className={styles.kicker}>Quick answers</p><h2>Before your first Spanish class.</h2></div></div><div className={styles.faqList}>
      <details><summary>Where are in-person Spanish classes held?</summary><p>At WeLearn&apos;s location on Calle 47 #29-33 in Sotomayor, Bucaramanga. We do not list in-person Spanish classes in other Colombian cities.</p></details>
      <details><summary>Can I take Spanish classes online from outside Bucaramanga?</summary><p>Yes. WeLearn offers online Spanish classes. Contact us with your location and preferred schedule to check current availability.</p></details>
      <details><summary>How much do Spanish classes cost?</summary><p>Contact WeLearn for the current price and available schedules. A class with a tutor is paid; you can ask about the price before booking.</p></details>
      <details><summary>Can I read something before I contact you?</summary><p>Yes. Start with our <Link href={SPANISH_HUB}>free guide to learning Spanish in Colombia</Link>, including phrases, regional usage and a four-week study routine.</p></details>
    </div></section>

    <footer className={styles.ctaSection}><p className={styles.kicker}>Ask WeLearn</p><h2>Ready to learn Spanish in Colombia?</h2><p>Tell us whether you prefer online classes or in-person classes in Bucaramanga, and ask about current tutors, schedules and prices.</p><div><a className={styles.primaryButton} href={contact} target="_blank" rel="noopener noreferrer" data-wa-cta="spanish-classes-footer">Ask about Spanish classes ↗</a><Link className={styles.textButton} href={SPANISH_HUB}>Read the Spanish guide →</Link></div></footer>
  </main>;
}
