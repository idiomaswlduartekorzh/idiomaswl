'use client'

import { ITALIAN_TENSE_QUEST } from '@/data/practica/italian-tense-quest-config'

import TenseQuestEngine from './TenseQuestEngine'

export default function ItalianTenseQuest() {
  return <TenseQuestEngine config={ITALIAN_TENSE_QUEST} />
}
