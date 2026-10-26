import Link from 'next/link'
import type { GermanGrammarLevel } from '@/data/german-grammar-resources'
import { getTopicsByLevel } from '@/data/grammar/registry'
import styles from '@/components/grammar/GrammarCollection.module.css'

const COPY: Record<GermanGrammarLevel, { label: string; title: string; lead: string }> = {
  b2: { label: 'Selbstständige Sprachverwendung', title: 'Deutsch B2 vollständig festigen', lead: 'Ein strukturierter Grammatikweg mit visuellen Erklärungen, langen Übungen und drei PDF-Materialien pro Thema.' },
  c1: { label: 'Fortgeschrittene Kontrolle', title: 'Deutsch C1 präzise steuern', lead: 'Komplexe Syntax, Modalität und Textkohäsion für Studium, Beruf und anspruchsvolle Kommunikation.' },
  c2: { label: 'Sprachliche Meisterschaft', title: 'Deutsch C2 stilistisch beherrschen', lead: 'Nuancen, Informationsstruktur und Register so steuern, dass Umformulierungen ihre genaue Wirkung behalten.' },
}

export default function GermanAdvancedLevelHub({ level }: { level: GermanGrammarLevel }) {
  const topics = getTopicsByLevel('aleman', level), copy = COPY[level], levelLabel = level.toUpperCase()
  return <main className={styles.page} style={{ '--grammar-accent': '#D7A300', '--grammar-deep': '#171717', '--grammar-soft': '#FFF7D6' } as React.CSSProperties}><div className={styles.wrap}><nav className={styles.breadcrumb}><Link href="/practica">Übungen</Link><span>/</span><Link href="/practica/aleman">Deutsch</Link><span>/</span><strong>{levelLabel}</strong></nav><header className={styles.indexHero}><div className={styles.indexHeroCopy}><p className={styles.eyebrow}>🇩🇪 Deutsch · {levelLabel} · {copy.label}</p><h1>{copy.title}</h1><p className={styles.lead}>{copy.lead}</p><div className={styles.heroActions}><Link className={styles.primaryAction} href={`/practica/aleman/${level}/gramatica`}>Grammatik öffnen <span>→</span></Link><Link className={styles.secondaryAction} href="/clases-de-aleman">Deutschkurse</Link></div><div className={styles.metrics}><span><b>{topics.length}</b> Grammatiklektionen</span><span><b>{topics.length * 3}</b> PDFs</span><span><b>0</b> Audio vorerst</span></div></div><aside className={styles.routeGoal}><span>Freigabestatus</span><p>Die Grammatik ist vollständig aufgebaut. Audio wird erst in der vereinbarten späteren Phase ergänzt.</p><div><b>Deutsch</b><em>{levelLabel}</em></div></aside></header><section className={styles.method}><div><span>01</span><b>Erklärung</b><p>Ausführlich und vollständig auf Deutsch.</p></div><div><span>02</span><b>Visuelle Karte</b><p>Für genau dieses Grammatikthema.</p></div><div><span>03</span><b>Übungen</b><p>Mindestens 30 Entscheidungen pro Lektion.</p></div><div><span>04</span><b>PDFs</b><p>Kurs, Übungsheft und Lösungen getrennt.</p></div></section></div></main>
}
