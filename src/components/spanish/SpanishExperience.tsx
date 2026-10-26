import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SPANISH_GUIDES, SPANISH_HUB } from '@/data/spanish-colombia';
import {
  localeHreflang, localeNames, localeOg, spanishAlternates, spanishCopy,
  spanishLocales, spanishPath, spanishUrl, type SpanishLocale, type SpanishPageKind,
} from '@/data/spanish-experience';
import styles from '@/app/(site)/learn-spanish-colombia/spanish-colombia.module.css';
import DocumentLanguage from './DocumentLanguage';

const address = 'Calle 47 #29-33, Sotomayor · Bucaramanga, Santander';
const mapUrl = 'https://maps.google.com/?q=Calle+47+%2329-33+Sotomayor+Bucaramanga+Idiomas+WeLearn';
const phrases = ['¿Me puede ayudar?', '¿Cuánto cuesta este café?', '¿Puede hablar más despacio, por favor?'];

export function spanishMetadata(locale: SpanishLocale, kind: SpanishPageKind): Metadata {
  const copy = spanishCopy[locale];
  const title = kind === 'hub' ? copy.hubTitle : copy.classesTitle;
  const description = kind === 'hub' ? copy.hubDescription : copy.classesDescription;
  const url = spanishUrl(locale, kind);
  return {
    title, description, keywords: null,
    alternates: { canonical: url, languages: spanishAlternates(kind) },
    openGraph: { title, description, url, locale: localeOg[locale], type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

function LanguageSwitch({ locale, kind }: { locale: SpanishLocale; kind: SpanishPageKind }) {
  return <nav className={styles.languageSwitch} aria-label="Language / Idioma">
    <span className={styles.languageLabel} aria-hidden="true">◉ &nbsp; Language / Idioma</span>
    <div className={styles.languageOptions}>
      {spanishLocales.map(option => <Link
        key={option}
        href={spanishPath(option, kind)}
        hrefLang={localeHreflang[option]}
        lang={option}
        aria-current={option === locale ? 'page' : undefined}
      >{localeNames[option]}</Link>)}
    </div>
  </nav>;
}

function People({ locale }: { locale: SpanishLocale }) {
  const copy = spanishCopy[locale];
  return <section id="people" className={`${styles.section} ${styles.trustSection}`}>
    <div className={styles.trustCopy}>
      <p className={styles.kicker}>{copy.peopleKicker}</p>
      <h2>{copy.peopleTitle}</h2>
      <p>{copy.peopleText}</p>
      <address className={styles.address}>{address}</address>
      <div className={styles.trustLinks}><Link href="/quienes-somos" hrefLang="es">{copy.aboutLink}{locale !== 'es' ? ' (Español)' : ''} ↗</Link><a href={mapUrl} target="_blank" rel="noopener noreferrer">{copy.mapLink} ↗</a></div>
    </div>
    <div className={styles.founders}>
      <figure><div className={styles.portrait}><Image src="/images/david-duarte.jpg" width={720} height={960} sizes="(max-width: 570px) 45vw, (max-width: 850px) 40vw, 320px" alt="José David Duarte Silva" /></div><figcaption>José David Duarte Silva<span>{copy.davidRole}</span></figcaption></figure>
      <figure><div className={styles.portrait}><Image src="/images/team-zhanna-korzh.png" width={720} height={960} sizes="(max-width: 570px) 45vw, (max-width: 850px) 40vw, 320px" alt="Zhanna Korzh" /></div><figcaption>Zhanna Korzh<span>{copy.zhannaRole}</span></figcaption></figure>
    </div>
  </section>;
}

function Questions({ locale, kind }: { locale: SpanishLocale; kind: SpanishPageKind }) {
  const copy = spanishCopy[locale];
  return <section id="questions" className={`${styles.section} ${styles.faqSection}`}>
    <div className={styles.sectionHeading}><div><p className={styles.kicker}>{copy.faqKicker}</p><h2>{kind === 'hub' ? copy.faqTitle : copy.classesFaqTitle}</h2></div></div>
    <div className={styles.faqList}>{(kind === 'hub' ? copy.faq : copy.classesFaq).map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
  </section>;
}

function Formats({ locale, kind }: { locale: SpanishLocale; kind: SpanishPageKind }) {
  const copy = spanishCopy[locale];
  const wa = [copy.whatsappInPerson, copy.whatsappOnline];
  return <section id="formats" className={`${styles.section} ${styles.pathsSection}`}>
    <div className={styles.sectionHeading}>
      <div><p className={styles.kicker}>{copy.formatsKicker}</p><h2>{kind === 'hub' ? copy.formatsTitle : copy.classesFormatsTitle}</h2></div>
      <p>{kind === 'hub' ? copy.formatsIntro : copy.classesFormatsIntro}</p>
    </div>
    <div className={styles.formatGrid}>{copy.formats.map((card, index) => <article className={styles.formatCard} key={card.label}>
      <span>{card.label}</span><h3>{card.title}</h3><p>{card.copy}</p>
      <a href={`https://wa.me/573005004253?text=${encodeURIComponent(wa[index])}`} target="_blank" rel="noopener noreferrer" data-wa-cta={index ? `spanish-online-${locale}` : `spanish-bucaramanga-${locale}`}>{copy.formatLink} ↗</a>
    </article>)}</div>
  </section>;
}

export default function SpanishExperience({ locale, kind }: { locale: SpanishLocale; kind: SpanishPageKind }) {
  const copy = spanishCopy[locale];
  const url = spanishUrl(locale, kind);
  const title = kind === 'hub' ? copy.hubTitle : copy.classesTitle;
  const description = kind === 'hub' ? copy.hubDescription : copy.classesDescription;
  const contact = `https://wa.me/573005004253?text=${encodeURIComponent(copy.whatsapp)}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': url, url, name: title, description, inLanguage: localeHreflang[locale], publisher: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'WeLearn', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: title, item: url },
      ] },
    ],
  };
  return <div className={styles.page} lang={localeHreflang[locale]}>
    <DocumentLanguage lang={localeHreflang[locale]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className={styles.utilityBar}><span>WeLearn <b aria-hidden="true">/</b> Bucaramanga, Colombia</span><LanguageSwitch locale={locale} kind={kind} /></div>
    <header className={styles.hero}><div className={styles.heroInner}>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>{copy.kicker}</p>
        <h1>{kind === 'hub' ? copy.heroTitle : copy.classesHeroTitle} <em>{kind === 'hub' ? copy.heroAccent : copy.classesHeroAccent}</em></h1>
        <p className={styles.lede}>{kind === 'hub' ? copy.heroText : copy.classesHeroText}</p>
        <div className={styles.heroActions}>
          {kind === 'hub' ? <Link className={styles.primaryButton} href={spanishPath(locale, 'classes')}>{copy.heroPrimary} <span aria-hidden="true">↗</span></Link> : <a className={styles.primaryButton} href={contact} target="_blank" rel="noopener noreferrer" data-wa-cta={`spanish-classes-hero-${locale}`}>{copy.classesHeroButton} <span aria-hidden="true">↗</span></a>}
          <a className={styles.textButton} href={kind === 'hub' ? '#approach' : '#formats'}>{kind === 'hub' ? copy.heroSecondary : copy.navFormats} <span aria-hidden="true">↓</span></a>
        </div>
        <p className={styles.heroNote}>{kind === 'hub' ? copy.heroNote : copy.classesHeroNote}</p>
      </div>
      <div className={styles.heroAside}>
        <span className={styles.asideNumber}>01 / 03</span>
        <p className={styles.asideLabel}>{copy.phraseLabel}</p>
        <p className={styles.asidePhrase} lang="es">¿Me puede<br />ayudar?</p>
        <p className={styles.asideMeaning}>{copy.phraseMeaning}</p>
        <div className={styles.asideRule} />
        <p className={styles.asideLocation}>BUCARAMANGA <span aria-hidden="true">↗</span> COLOMBIA</p>
      </div>
    </div></header>
    <nav className={styles.sectionNav} aria-label="Page sections"><a href="#formats">{copy.navFormats}</a>{kind === 'hub' && <><a href="#approach">{copy.navApproach}</a><a href="#phrases">{copy.navPhrases}</a></>}<a href="#people">{copy.navPeople}</a><a href="#questions">{copy.navFaq}</a></nav>
    <Formats locale={locale} kind={kind} />
    {kind === 'hub' && <>
      <section id="approach" className={`${styles.section} ${styles.introSection}`}><div className={styles.sectionHeading}><div><p className={styles.kicker}>{copy.approachKicker}</p><h2>{copy.approachTitle}</h2></div><p>{copy.approachIntro}</p></div><div className={styles.steps}>{copy.steps.map(step => <article className={styles.step} key={step.label}><span>{step.label}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div></section>
      <section id="phrases" className={`${styles.section} ${styles.phraseSection}`}><div className={styles.sectionHeading}><div><p className={styles.kicker}>{copy.phrasesKicker}</p><h2>{copy.phrasesTitle}</h2></div><p>{copy.phrasesIntro}</p></div><div className={styles.phraseGrid}>{phrases.map((phrase, index) => <article className={styles.phraseCard} key={phrase}><span>{copy.phraseLabels[index]}</span><h3 lang="es">{phrase}</h3><p>{copy.phraseMeanings[index]}</p></article>)}</div></section>
      <section className={`${styles.section} ${styles.resourceSection}`}><div className={styles.sectionHeading}><div><p className={styles.kicker}>WELEARN</p><h2>{copy.footerLink}</h2></div></div><div className={styles.resourceLinks}>{SPANISH_GUIDES.map(guide => <Link href={`${SPANISH_HUB}/${guide.slug}`} key={guide.slug} hrefLang="en"><span>{guide.eyebrow} · English</span><strong>{guide.title}</strong><span aria-hidden="true">↗</span></Link>)}</div></section>
    </>}
    <People locale={locale} />
    <Questions locale={locale} kind={kind} />
    <footer className={styles.ctaSection}><p className={styles.kicker}>{copy.footerKicker}</p><h2>{kind === 'hub' ? copy.footerTitle : copy.classesFooterTitle}</h2><p>{kind === 'hub' ? copy.footerText : copy.classesFooterText}</p><div><a className={styles.primaryButton} href={contact} target="_blank" rel="noopener noreferrer" data-wa-cta={`spanish-footer-${locale}`}>{copy.footerButton} <span aria-hidden="true">↗</span></a>{kind === 'classes' && <Link className={styles.textButton} href={spanishPath(locale, 'hub')}>{copy.guideLink} →</Link>}</div></footer>
  </div>;
}
