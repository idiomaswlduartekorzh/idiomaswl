import Link from 'next/link'
import type { GrammarTopic } from '@/data/grammar/types'
import type { FrenchGrammarLevel } from '@/data/french-grammar-resources'
import styles from './GrammarCollection.module.css'

const LEVEL_COPY: Record<FrenchGrammarLevel, { label: string; lead: string; outcome: string }> = {
  b2: { label: 'Précision', lead: 'Consolidez les temps, les modes, la voix, les pronoms et les relations logiques en prenant des décisions de sens, et non en complétant mécaniquement des phrases.', outcome: 'Maîtriser le système grammatical B2 dans les échanges, les écrits argumentés et les tâches du DELF.' },
  c1: { label: 'Contrôle avancé', lead: 'Maîtrisez la densité syntaxique, la modalisation, la cohésion et la progression de l’information dans des textes professionnels, académiques et littéraires.', outcome: 'Employer les structures C1 comme des choix discursifs précis, adaptés au registre et au destinataire.' },
  c2: { label: 'Maîtrise', lead: 'Affinez le point de vue, la référence, la portée, le rythme et l’architecture des phrases afin de reformuler sans perdre aucune nuance.', outcome: 'Recomposer une même proposition pour différents genres, effets et degrés d’engagement avec une précision C2.' },
}

export default function FrenchGrammarCollection({ level, topics }: { level: FrenchGrammarLevel; topics: GrammarTopic[] }) {
  const levelLabel = level.toUpperCase()
  const copy = LEVEL_COPY[level]
  const basePath = `/practica/frances/${level}`
  const canonical = `https://www.idiomaswl.com${basePath}/gramatica`
  const groups = Array.from(new Set(topics.map((topic) => topic.category))).map((category) => [category, topics.filter((topic) => topic.category === category)] as const)
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: `Grammaire française ${levelLabel}`,
    description: `Parcours complet de grammaire française ${levelLabel} avec explications, cartes visuelles, exercices approfondis et PDF.`,
    url: canonical, inLanguage: 'fr', isPartOf: { '@type': 'WebSite', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
    mainEntity: { '@type': 'ItemList', numberOfItems: topics.length, itemListElement: topics.map((topic, index) => ({ '@type': 'ListItem', position: index + 1, name: topic.shortTitle, url: `${canonical}/${topic.slug}` })) },
  }

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><div className={styles.page} style={{ '--grammar-accent': '#E7374F', '--grammar-deep': '#18347A', '--grammar-soft': '#EEF3FF' } as React.CSSProperties}><div className={styles.wrap}>
    <nav className={styles.breadcrumb} aria-label="Fil d’Ariane"><Link href="/practica">Pratique</Link><span>/</span><Link href="/practica/frances">Français</Link><span>/</span><Link href={basePath}>{levelLabel}</Link><span>/</span><strong>Grammaire</strong></nav>
    <header className={styles.indexHero}><div className={styles.indexHeroCopy}><p className={styles.eyebrow}>🇫🇷 Français · {levelLabel} · {copy.label}</p><h1>Grammaire française {levelLabel} : parcours complet et pratique</h1><p className={styles.lead}>{copy.lead}</p><div className={styles.heroActions}><Link className={styles.primaryAction} href={`${basePath}/gramatica/${topics[0]?.slug}`}>Commencer le parcours <span>→</span></Link><a className={styles.secondaryAction} href="#themes">Voir tous les thèmes</a></div><div className={styles.metrics} aria-label="Résumé du parcours"><span><b>{topics.length}</b> leçons</span><span><b>6</b> étapes de pratique</span><span><b>3</b> PDF par thème</span></div></div><aside className={styles.routeGoal}><span>Objectif du parcours</span><p>{copy.outcome}</p><div><b>Français</b><em>{levelLabel}</em></div></aside></header>
    <section className={styles.method} aria-label="Méthode d’étude"><div><span>01</span><b>Comprendre</b><p>Une explication pédagogique complète en français.</p></div><div><span>02</span><b>Visualiser</b><p>Des cartes, formules et contrastes propres au thème.</p></div><div><span>03</span><b>Pratiquer</b><p>Six étapes avec correction différée.</p></div><div><span>04</span><b>Produire</b><p>De la reconnaissance à l’emploi autonome.</p></div></section>
    <section id="themes" className={styles.catalogIntro}><div><span>Parcours complet</span><h2>Tous les thèmes de grammaire française {levelLabel}</h2></div><p>Suivez la progression ou ouvrez directement le système dont vous avez besoin. Chaque thème comporte une leçon complète, une carte visuelle, une pratique longue et trois PDF imprimables.</p></section>
    {groups.map(([category, categoryTopics], categoryIndex) => <section className={styles.topicGroup} key={category} aria-labelledby={`categorie-${categoryIndex}`}><div className={styles.groupHeading}><span>{String(categoryIndex + 1).padStart(2, '0')}</span><div><p>Bloc {categoryIndex + 1}</p><h2 id={`categorie-${categoryIndex}`}>{category}</h2></div><small>{categoryTopics.length} {categoryTopics.length === 1 ? 'thème' : 'thèmes'}</small></div><div className={styles.topicGrid}>{categoryTopics.map((topic) => <Link className={styles.topicCard} key={topic.slug} href={`${basePath}/gramatica/${topic.slug}`}><div className={styles.cardTop}><span style={{ background: topic.color }}>{topic.order}</span><em>{topic.category}</em></div><h3>{topic.shortTitle}</h3><p>{topic.lead}</p><footer><span>Explication + pratique + 3 PDF</span><b>→</b></footer></Link>)}</div></section>)}
    <nav className={styles.levelRoute} aria-label="Niveaux de grammaire française"><div><span>Poursuivez votre parcours</span><h2>Grammaire française de A1 à C2</h2></div><div>{(['a1', 'a2', 'b1', 'b2', 'c1', 'c2'] as const).map((routeLevel) => <Link key={routeLevel} className={routeLevel === level ? styles.currentLevel : ''} href={`/practica/frances/${routeLevel}/gramatica`}>{routeLevel.toUpperCase()}</Link>)}</div></nav>
    <Link className={styles.backLink} href={basePath}>← Retour au français {levelLabel}</Link>
  </div></div></>
}
