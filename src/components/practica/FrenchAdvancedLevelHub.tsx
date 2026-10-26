import SkillHub from '@/components/practica/SkillHub'
import type { FrenchGrammarLevel } from '@/data/french-grammar-resources'

const COPY: Record<FrenchGrammarLevel, { label: string; lead: string }> = {
  b2: { label: 'Intermédiaire avancé', lead: 'Maîtrisez trente systèmes grammaticaux B2 avec explications, cartes visuelles, pratique progressive et trois PDF par thème.' },
  c1: { label: 'Avancé', lead: 'Contrôlez syntaxe, cohésion, modalisation et registre dans un parcours complet de trente thèmes C1.' },
  c2: { label: 'Maîtrise', lead: 'Affinez point de vue, portée, référence, rythme et reformulation à travers trente leçons C2 approfondies.' },
}

export default function FrenchAdvancedLevelHub({ level }: { level: FrenchGrammarLevel }) {
  const levelLabel = level.toUpperCase()
  const copy = COPY[level]
  return <SkillHub langHref="/practica/frances" langLabel="🇫🇷 Français" levelLabel={levelLabel} eyebrow={`Français ${levelLabel} — ${copy.label}`} title="Choisissez une compétence" lead={copy.lead} accent="#18347A" skills={[{ id: 'gramatica', name: 'Grammaire', eng: 'Parcours complet', desc: '30 leçons avec explications pédagogiques, cartes visuelles originales, 30 décisions de pratique et trois PDF imprimables par thème.', count: '30 thèmes · 900 décisions', href: `/practica/frances/${level}/gramatica`, available: true }]} tip={<><strong>Conseil :</strong> suivez l’ordre proposé pour construire les liens entre temps, modes, cohésion et registre.</>} />
}
