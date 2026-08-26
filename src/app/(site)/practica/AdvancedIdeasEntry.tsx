import Link from 'next/link'
import { ArrowRight, BookOpenText, Headphones, Languages, PenLine, RotateCcw, Sparkles } from 'lucide-react'
import styles from './AdvancedIdeasEntry.module.css'

const MOVES = [
  { label: 'Listening', icon: Headphones },
  { label: 'Reading', icon: BookOpenText },
  { label: 'Vocabulary', icon: Languages },
  { label: 'Practice', icon: Sparkles },
  { label: 'Production', icon: PenLine },
  { label: 'Return', icon: RotateCcw },
]

export default function AdvancedIdeasEntry() {
  return (
    <Link className={styles.entry} href="/practica/ideas-avanzadas">
      <div className={styles.copy}>
        <span className={styles.kicker}>New · English B2–C1</span>
        <h2>Advanced ideas</h2>
        <p>
          Biases, social narratives and character through integrated listening, long-form reading,
          vocabulary, evidence practice and original production.
        </p>
        <strong>Explore the first cycle <ArrowRight size={16} /></strong>
      </div>
      <div className={styles.cycle} aria-label="Six learning moves">
        <span className={styles.cycleLabel}>One idea · six lenses</span>
        <ol>
          {MOVES.map(({ label, icon: Icon }, index) => (
            <li key={label}>
              <span><Icon size={14} /></span>
              <div><small>{String(index + 1).padStart(2, '0')}</small>{label}</div>
            </li>
          ))}
        </ol>
      </div>
    </Link>
  )
}
