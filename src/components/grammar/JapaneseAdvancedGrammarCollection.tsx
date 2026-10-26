import Link from 'next/link'
import type { GrammarTopic } from '@/data/grammar/types'
import type { JapaneseAdvancedGrammarLevel } from '@/data/japanese-advanced-grammar-resources'
import styles from './GrammarCollection.module.css'

const COPY: Record<JapaneseAdvancedGrammarLevel, { label: string; lead: string; outcome: string }> = {
  b2: { label: '自立した運用', lead: 'N2相当の時制、モダリティ、条件、待遇表現、文章構成を、意味の選択として体系的に学びます。', outcome: '会話、記事、報告、試験でB2文法を文脈に合わせて選び、その理由を説明します。' },
  c1: { label: '高度な言語運用', lead: 'N1相当の高度な文型、情報構造、証拠性、敬語、論証を、学術・職業場面で精密に扱います。', outcome: 'C1構文を話者態度、焦点、ジャンル、発言責任に合わせた談話選択として運用します。' },
  c2: { label: '文体と談話の熟達', lead: '視点、作用域、複数の声、含意、ジャンル変換、校閲を通して、自然で責任ある日本語を磨きます。', outcome: '同じ内容を目的・読者・媒体に応じて再構成し、微細な意味差まで説明して推敲します。' },
}
export default function JapaneseAdvancedGrammarCollection({ level, topics }: { level: JapaneseAdvancedGrammarLevel; topics: GrammarTopic[] }) {
  const label = level.toUpperCase(), copy = COPY[level], base = `/practica/japones/${level}`, canonical = `https://www.idiomaswl.com${base}/gramatica`
  const groups = Array.from(new Set(topics.map((topic) => topic.category))).map((category) => [category, topics.filter((topic) => topic.category === category)] as const)
  const jsonLd = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `日本語文法${label}`, description: `解説、視覚マップ、練習、PDFで学ぶ日本語文法${label}の完全コース`, url: canonical, inLanguage: 'ja-JP', mainEntity: { '@type': 'ItemList', numberOfItems: topics.length, itemListElement: topics.map((topic, index) => ({ '@type': 'ListItem', position: index + 1, name: topic.shortTitle, url: `${canonical}/${topic.slug}` })) } }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><div className={styles.page} style={{ '--grammar-accent': '#BC002D', '--grammar-deep': '#202A44', '--grammar-soft': '#FFF0F1' } as React.CSSProperties}><div className={styles.wrap}>
    <nav className={styles.breadcrumb}><Link href="/practica">学習</Link><span>/</span><Link href="/practica/japones">日本語</Link><span>/</span><Link href={base}>{label}</Link><span>/</span><strong>文法</strong></nav>
    <header className={styles.indexHero}><div className={styles.indexHeroCopy}><p className={styles.eyebrow}>🇯🇵 日本語 · {label} · {copy.label}</p><h1>日本語文法{label}：完全学習コース</h1><p className={styles.lead}>{copy.lead}</p><div className={styles.heroActions}><Link className={styles.primaryAction} href={`${base}/gramatica/${topics[0]?.slug}`}>最初のレッスンへ <span>→</span></Link><a className={styles.secondaryAction} href="#topics">全テーマを見る</a></div><div className={styles.metrics}><span><b>{topics.length}</b>レッスン</span><span><b>6</b>段階練習</span><span><b>3</b>PDF／テーマ</span></div></div><aside className={styles.routeGoal}><span>学習目標</span><p>{copy.outcome}</p><div><b>日本語</b><em>{label}</em></div></aside></header>
    <section className={styles.method}><div><span>01</span><b>理解</b><p>中心意味と使用条件を日本語で丁寧に説明します。</p></div><div><span>02</span><b>可視化</b><p>公式、対比、例文を一目で結び付けます。</p></div><div><span>03</span><b>練習</b><p>理由付きフィードバックで6段階を進みます。</p></div><div><span>04</span><b>応用</b><p>形式の識別から自律的な産出へ移ります。</p></div></section>
    <section id="topics" className={styles.catalogIntro}><div><span>完全カリキュラム</span><h2>日本語文法{label}の全テーマ</h2></div><p>順番に学ぶことも、必要な文法を直接選ぶこともできます。全テーマに解説、視覚マップ、十分な練習、PDF 3種があります。</p></section>
    {groups.map(([category, items], groupIndex) => <section className={styles.topicGroup} key={category}><div className={styles.groupHeading}><span>{String(groupIndex + 1).padStart(2, '0')}</span><div><p>ユニット {groupIndex + 1}</p><h2>{category}</h2></div><small>{items.length}テーマ</small></div><div className={styles.topicGrid}>{items.map((topic) => <Link className={styles.topicCard} key={topic.slug} href={`${base}/gramatica/${topic.slug}`}><div className={styles.cardTop}><span style={{ background: topic.color }}>{topic.order}</span><em>{topic.category}</em></div><h3>{topic.shortTitle}</h3><p>{topic.lead}</p><footer><span>解説＋練習＋PDF 3種</span><b>→</b></footer></Link>)}</div></section>)}
    <nav className={styles.levelRoute}><div><span>学習を続ける</span><h2>日本語文法 A1–C2</h2></div><div>{(['a1','a2','b1','b2','c1','c2'] as const).map((route) => <Link key={route} className={route === level ? styles.currentLevel : ''} href={`/practica/japones/${route}/gramatica`}>{route.toUpperCase()}</Link>)}</div></nav>
  </div></div></>
}
