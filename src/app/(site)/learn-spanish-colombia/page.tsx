import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HUB_QUESTIONS, SPANISH_GUIDES, SPANISH_HUB, SPANISH_HUB_URL, TRAVEL_PHRASES } from '@/data/spanish-colombia';
import styles from './spanish-colombia.module.css';

export const metadata: Metadata = {
  title: 'Learn Spanish in Colombia | A Practical Guide by WeLearn',
  description: 'Learn Spanish in Colombia with practical phrases, Colombian usage, a four-week plan and honest advice on choosing where to study.',
  alternates: {
    canonical: SPANISH_HUB_URL,
    languages: { en: SPANISH_HUB_URL, es: 'https://www.idiomaswl.com/espanol-para-extranjeros-colombia' },
  },
  openGraph: {
    title: 'Learn Spanish in Colombia | WeLearn',
    description: 'A practical starting point for real conversations in Colombia, created by a language-learning team based in Bucaramanga.',
    url: SPANISH_HUB_URL,
    locale: 'en_US',
    type: 'website',
  },
};

const cityCards = [
  { city: 'Bucaramanga', label: 'Our home base', copy: 'WeLearn is based here. Use a smaller-city routine to practise everyday conversations in cafés, shops and neighborhoods.' },
  { city: 'Bogotá', label: 'Capital city', copy: 'A large city with many formal learning options. Compare class location, schedule and time spent speaking.' },
  { city: 'Medellín', label: 'Popular with visitors', copy: 'Compare programs on teacher feedback and practice outside class, not only social activities.' },
  { city: 'Cartagena', label: 'Caribbean coast', copy: 'Listen to local speech as well as textbook audio. Regional pace and vocabulary can sound different.' },
] as const;

const steps = [
  { number: '01', title: 'Build a useful base', copy: 'Learn greetings, numbers, polite requests and the present tense with situations you expect to face.' },
  { number: '02', title: 'Listen to more than one voice', copy: 'Colombia has many regional varieties. Alternate clear learner material with short conversations from different cities.' },
  { number: '03', title: 'Speak, notice, repeat', copy: 'Try one small exchange each day. Write down where you got stuck and revisit that phrase before your next conversation.' },
] as const;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': SPANISH_HUB_URL,
      url: SPANISH_HUB_URL,
      name: 'Learn Spanish in Colombia',
      description: metadata.description,
      inLanguage: 'en',
      isPartOf: { '@id': 'https://www.idiomaswl.com/#website' },
      publisher: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
      about: [{ '@type': 'Thing', name: 'Spanish language learning' }, { '@type': 'Place', name: 'Colombia' }],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Learn Spanish in Colombia', item: SPANISH_HUB_URL },
      ],
    },
  ],
};

export default function LearnSpanishColombiaPage() {
  return (
    <div className={styles.page} lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={styles.utilityBar}>
        <span>WeLearn · Bucaramanga, Colombia</span>
        <Link href="/espanol-para-extranjeros-colombia" hrefLang="es">Leer en español ↗</Link>
      </div>

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>A field guide to Colombian Spanish</p>
            <h1>Learn Spanish in Colombia.<br /><em>Use it in real life.</em></h1>
            <p className={styles.lede}>Start with the conversations you will actually have: ordering coffee, asking directions and getting to know people. Then build the habits that help those conversations grow.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#start">Start with the guide <span aria-hidden="true">↗</span></a>
              <Link className={styles.textButton} href={`${SPANISH_HUB}/spanish-for-travelers`}>Try four useful phrases <span aria-hidden="true">→</span></Link>
            </div>
            <p className={styles.heroNote}>An independent learning guide by WeLearn, a language-learning team based in Bucaramanga.</p>
          </div>
          <div className={styles.heroArt} role="img" aria-label="Spanish phrase ¿Me puede ayudar? and its English translation, Could you help me?">
            <span className={styles.artIndex}>01 / EVERYDAY SPANISH</span>
            <span className={styles.artQuote}>“¿Me puede<br />ayudar?”</span>
            <span className={styles.artTranslation}>Could you help me?</span>
            <div className={styles.artLine} />
            <span className={styles.artCaption}>One useful sentence can open a conversation.</span>
          </div>
        </div>
      </header>

      <nav className={styles.sectionNav} aria-label="Explore this guide">
        <a href="#start">The approach</a><a href="#paths">Learning paths</a><a href="#places">Places</a><a href="#first-phrases">First phrases</a><a href="#questions">Questions</a>
      </nav>

      <section id="start" className={`${styles.section} ${styles.introSection}`}>
        <div className={styles.sectionLead}>
          <p className={styles.kicker}>Start here</p>
          <h2>Make the next conversation your goal.</h2>
          <p>“Learn Spanish” is a big promise. A better first milestone is smaller: understand a price, ask for help, or tell someone what you need. Repeat those exchanges and add the grammar that makes them flexible.</p>
        </div>
        <div className={styles.steps}>
          {steps.map(step => <article className={styles.step} key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}
        </div>
      </section>

      <section id="paths" className={`${styles.section} ${styles.pathsSection}`}>
        <div className={styles.sectionHeading}>
          <div><p className={styles.kicker}>Choose a path</p><h2>Three questions, three practical guides.</h2></div>
          <p>Read the guide that matches your next decision. Each one gives you examples you can use, not just a list of tips.</p>
        </div>
        <div className={styles.guideGrid}>
          {SPANISH_GUIDES.map((guide, index) => <Link key={guide.slug} className={styles.guideCard} href={`${SPANISH_HUB}/${guide.slug}`}>
            <span className={styles.cardTop}><span>{guide.eyebrow}</span><span>0{index + 1}</span></span>
            <h3>{guide.title}</h3><p>{guide.description}</p><span className={styles.cardLink}>Read the guide <span aria-hidden="true">↗</span></span>
          </Link>)}
        </div>
      </section>

      <section id="places" className={`${styles.section} ${styles.placesSection}`}>
        <div className={styles.sectionHeading}>
          <div><p className={styles.kicker}>Where you learn</p><h2>Choose a place for your routine.</h2></div>
          <p>A city can give you chances to practise. Your progress still depends on the teaching, the feedback and what you do between lessons.</p>
        </div>
        <div className={styles.cityGrid}>{cityCards.map(card => <article key={card.city} className={styles.cityCard}><span>{card.label}</span><h3>{card.city}</h3><p>{card.copy}</p></article>)}</div>
        <p className={styles.disclosure}>WeLearn is based in Bucaramanga. The other cities are included as learning context, not as WeLearn locations.</p>
      </section>

      <section id="first-phrases" className={`${styles.section} ${styles.phraseSection}`}>
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>A first lesson</p><h2>Four phrases worth practising today.</h2></div><p>Say each sentence aloud, then change one word to make it yours.</p></div>
        <div className={styles.phraseGrid}>{TRAVEL_PHRASES.map(phrase => <article key={phrase.spanish} className={styles.phraseCard}><span>{phrase.situation}</span><h3 lang="es">{phrase.spanish}</h3><p>{phrase.english}</p><small>{phrase.note}</small></article>)}</div>
        <Link className={styles.inlineLink} href={`${SPANISH_HUB}/spanish-for-travelers`}>See the full traveler guide →</Link>
      </section>

      <section className={`${styles.section} ${styles.trustSection}`}>
        <div><p className={styles.kicker}>Who made this guide</p><h2>Real people, a real address.</h2><p>WeLearn is a team of language tutors based in Bucaramanga. José David Duarte Silva and Zhanna Korzh founded it and designed its learning method. This guide draws on that language-learning perspective; it does not claim a campus or a Spanish program in every city listed above.</p><address className={styles.address}>Calle 47 #29-33, Sotomayor · Bucaramanga, Santander</address><div className={styles.trustLinks}><Link href="/quienes-somos">Meet the founders →</Link><a href="https://maps.google.com/?q=Calle+47+%2329-33+Sotomayor+Bucaramanga+Idiomas+WeLearn" target="_blank" rel="noopener noreferrer">Find us on the map ↗</a></div></div>
        <div className={styles.founders}><figure><Image src="/images/david-duarte.jpg" width={120} height={140} alt="José David Duarte Silva, WeLearn co-founder" /><figcaption>José David Duarte Silva<br /><span>Co-founder</span></figcaption></figure><figure><Image src="/images/team-zhanna-korzh.png" width={120} height={140} alt="Zhanna Korzh, WeLearn co-founder" /><figcaption>Zhanna Korzh<br /><span>Co-founder & academic director</span></figcaption></figure></div>
      </section>

      <section id="questions" className={`${styles.section} ${styles.faqSection}`}><div className={styles.sectionHeading}><div><p className={styles.kicker}>Quick answers</p><h2>Questions before you begin.</h2></div></div><div className={styles.faqList}>{HUB_QUESTIONS.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>

      <footer className={styles.ctaSection}><p className={styles.kicker}>Keep learning</p><h2>Your next conversation starts with one sentence.</h2><p>Explore the guides, practise aloud and ask us if you want to know about Spanish-learning support from WeLearn.</p><div><Link className={styles.primaryButton} href={`${SPANISH_HUB}/four-week-study-plan`}>See the four-week plan ↗</Link><a className={styles.textButton} href="https://wa.me/573005004253?text=Hello%2C%20I%20found%20your%20Spanish%20in%20Colombia%20guide.%20Is%20Spanish-learning%20support%20available%3F" target="_blank" rel="noopener noreferrer">Ask WeLearn on WhatsApp →</a></div></footer>
    </div>
  );
}
