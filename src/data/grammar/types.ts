export interface ChoiceItem {
  scene: string
  lines: [string, string][]
  options: string[]
  answer: string
  explain: string
}

export interface Blank {
  options?: string[]
  answer: string
  accepted?: string[]
  explain: string
}

export interface DualItem {
  scene: string
  lines: [string, string][]
  blanks: Blank[]
}

export interface WriteItem {
  scene: string
  prompt: string
  answer: string
  accepted?: string[]
  explain: string
}

export type LevelType = 'choice' | 'dual' | 'guidedText' | 'freeText' | 'write'

interface LevelBase {
  id: string
  title: string
  tag: string
  intro: string
}

export interface ChoiceLevel extends LevelBase {
  type: 'choice'
  items: ChoiceItem[]
}

export interface DualLevel extends LevelBase {
  type: 'dual'
  items: DualItem[]
}

export interface GuidedTextLevel extends LevelBase {
  type: 'guidedText'
  scene: string
  text: string
  blanks: Blank[]
}

export interface FreeTextLevel extends LevelBase {
  type: 'freeText'
  scene: string
  text: string
  blanks: Blank[]
}

export interface WriteLevel extends LevelBase {
  type: 'write'
  items: WriteItem[]
}

export type Level = ChoiceLevel | DualLevel | GuidedTextLevel | FreeTextLevel | WriteLevel

export interface GrammarTopic {
  slug: string
  order: string
  color: string
  category: string
  level: string
  title: string
  shortTitle: string
  metaTitle: string
  description: string
  lead: string
  outcomes: string[]
  guide: {
    goal: string
    model: string
    formula: string
    decisions: string[]
    table: [string, string, string][]
    mistakes: string[]
  }
  seo: Array<{
    heading: string
    paragraphs: string[]
    table?: string[][]
    examples?: string[][]
  }>
  visual: {
    mode: string
    teacherLens: string
    graphicPrompt: string
    scene: [string, string][]
    learnerModes: string[]
    practiceVerbs?: string[]
    reviewFocus?: string[]
  }
  practice: {
    levels: Level[]
  }
}
