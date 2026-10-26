import Link from 'next/link'
import type { GrammarTopic } from '@/data/grammar/types'
import type { PortugueseGrammarLevel } from '@/data/portuguese-grammar-resources'
import styles from './GrammarCollection.module.css'

const COPY: Record<PortugueseGrammarLevel, { label: string; lead: string; outcome: string }> = {
  b2: { label: 'Autonomia comunicativa', lead: 'Consolide tempos, modos, pronomes, formas reduzidas e organização textual por meio de decisões reais de sentido.', outcome: 'Administrar o sistema gramatical B2 em conversas, relatos, argumentações e provas de proficiência.' },
  c1: { label: 'Controle avançado', lead: 'Domine densidade sintática, modalidade, coesão e gestão da informação em textos acadêmicos e profissionais.', outcome: 'Usar as estruturas C1 como escolhas discursivas precisas, adequadas ao registro e ao interlocutor.' },
  c2: { label: 'Domínio estilístico', lead: 'Refine perspectiva, referência, escopo, ritmo e arquitetura do período para reformular sem perder nuances.', outcome: 'Remodelar o mesmo conteúdo para gêneros, efeitos e graus de comprometimento diferentes.' },
}

export default function PortugueseGrammarCollection({ level, topics }: { level: PortugueseGrammarLevel; topics: GrammarTopic[] }) {
  const label = level.toUpperCase(), copy = COPY[level], base = `/practica/portugues/${level}`
  const canonical = `https://www.idiomaswl.com${base}/gramatica`
  const groups = Array.from(new Set(topics.map((topic) => topic.category))).map((category) => [category, topics.filter((topic) => topic.category === category)] as const)
  const jsonLd = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `Gramática portuguesa ${label}`, description: `Curso completo de gramática portuguesa ${label} com explicações, mapas visuais, exercícios e PDF.`, url: canonical, inLanguage: 'pt-BR', mainEntity: { '@type': 'ItemList', numberOfItems: topics.length, itemListElement: topics.map((topic, index) => ({ '@type': 'ListItem', position: index + 1, name: topic.shortTitle, url: `${canonical}/${topic.slug}` })) } }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className={styles.page} style={{ '--grammar-accent': '#DFB700', '--grammar-deep': '#126B3A', '--grammar-soft': '#F4FAE8' } as React.CSSProperties}>
      <div className={styles.wrap}>
        <nav className={styles.breadcrumb}><Link href="/practica">Prática</Link><span>/</span><Link href="/practica/portugues">Português</Link><span>/</span><Link href={base}>{label}</Link><span>/</span><strong>Gramática</strong></nav>
        <header className={styles.indexHero}>
          <div className={styles.indexHeroCopy}><p className={styles.eyebrow}>🇧🇷 Português · {label} · {copy.label}</p><h1>Gramática portuguesa {label}: percurso completo</h1><p className={styles.lead}>{copy.lead}</p><div className={styles.heroActions}><Link className={styles.primaryAction} href={`${base}/gramatica/${topics[0]?.slug}`}>Começar o percurso <span>→</span></Link><a className={styles.secondaryAction} href="#temas">Ver todos os temas</a></div><div className={styles.metrics}><span><b>{topics.length}</b> aulas</span><span><b>6</b> etapas de prática</span><span><b>3</b> PDFs por tema</span></div></div>
          <aside className={styles.routeGoal}><span>Objetivo do percurso</span><p>{copy.outcome}</p><div><b>Português</b><em>{label}</em></div></aside>
        </header>
        <section className={styles.method}><div><span>01</span><b>Compreender</b><p>Uma explicação completa em português.</p></div><div><span>02</span><b>Visualizar</b><p>Mapas específicos, fórmulas e contrastes.</p></div><div><span>03</span><b>Praticar</b><p>Seis etapas com correção explicada.</p></div><div><span>04</span><b>Aplicar</b><p>Do reconhecimento à produção autônoma.</p></div></section>
        <section id="temas" className={styles.catalogIntro}><div><span>Percurso completo</span><h2>Todos os temas de gramática portuguesa {label}</h2></div><p>Siga a ordem ou abra diretamente o sistema de que precisa. Cada tema inclui aula, mapa visual, prática extensa e três PDFs.</p></section>
        {groups.map(([category, items], categoryIndex) => <section className={styles.topicGroup} key={category}><div className={styles.groupHeading}><span>{String(categoryIndex + 1).padStart(2, '0')}</span><div><p>Bloco {categoryIndex + 1}</p><h2>{category}</h2></div><small>{items.length} {items.length === 1 ? 'tema' : 'temas'}</small></div><div className={styles.topicGrid}>{items.map((topic) => <Link className={styles.topicCard} key={topic.slug} href={`${base}/gramatica/${topic.slug}`}><div className={styles.cardTop}><span style={{ background: topic.color }}>{topic.order}</span><em>{topic.category}</em></div><h3>{topic.shortTitle}</h3><p>{topic.lead}</p><footer><span>Explicação + exercícios + 3 PDFs</span><b>→</b></footer></Link>)}</div></section>)}
        <nav className={styles.levelRoute}><div><span>Continue o percurso</span><h2>Gramática portuguesa de A1 a C2</h2></div><div>{(['a1', 'a2', 'b1', 'b2', 'c1', 'c2'] as const).map((route) => <Link key={route} className={route === level ? styles.currentLevel : ''} href={`/practica/portugues/${route}/gramatica`}>{route.toUpperCase()}</Link>)}</div></nav>
      </div>
    </div>
  </>
}
