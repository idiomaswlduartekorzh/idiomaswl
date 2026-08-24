import Link from 'next/link'
import { ArrowRight, BookOpenText, Headphones, Languages, PenLine, RotateCcw, Sparkles } from 'lucide-react'
import styles from './AdvancedIdeasEntry.module.css'

const MOVES = [
  { label: 'Escucha', icon: Headphones },
  { label: 'Lectura', icon: BookOpenText },
  { label: 'Vocabulario', icon: Languages },
  { label: 'Ejercicios', icon: Sparkles },
  { label: 'Producción', icon: PenLine },
  { label: 'Retorno', icon: RotateCcw },
]

export default function AdvancedIdeasEntry() {
  return (
    <Link className={styles.entry} href="/practica/ideas-avanzadas">
      <div className={styles.copy}>
        <span className={styles.kicker}>Nuevo · inglés B2–C1</span>
        <h2>Ideas avanzadas</h2>
        <p>
          Sesgos, relatos sociales y carácter mediante ciclos de escucha, lectura larga,
          vocabulario, ejercicios y producción propia.
        </p>
        <strong>Explorar el primer ciclo <ArrowRight size={16} /></strong>
      </div>
      <div className={styles.cycle} aria-label="Seis movimientos pedagógicos">
        <span className={styles.cycleLabel}>Una idea · seis lentes</span>
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
