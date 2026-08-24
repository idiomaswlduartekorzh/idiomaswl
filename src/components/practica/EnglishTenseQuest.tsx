'use client'

import { ENGLISH_TENSE_QUEST } from '@/data/practica/english-tense-quest'

import TenseQuestEngine from './TenseQuestEngine'

export default function EnglishTenseQuest() {
  return <TenseQuestEngine config={ENGLISH_TENSE_QUEST} languageSlug="ingles" />
}
