import SkillHub from './SkillHub'
import type { Metadata } from 'next'
import { getTopicsByLevel } from '@/data/grammar/registry'
import { readingHubPath } from '@/lib/reading/routes'
import type { ReadingLanguage } from '@/lib/reading/types'

type Level = 'b2' | 'c1' | 'c2'
type Language = 'aleman' | 'frances' | 'italiano' | 'portugues' | 'ruso' | 'japones' | 'coreano'

type Copy = {
  label: string
  seoName: string
  accent: string
  readingLanguage: ReadingLanguage
  breadcrumb: string
  breadcrumbAria: string
  title: string
  lead: Record<Level, string>
  skills: {
    reading: [string, string, string]
    grammar: [string, string, string]
    writing: [string, string, string]
    speaking: [string, string, string]
  }
  units: [string, string, string, string, string]
}

const COPY: Record<Language, Copy> = {
  aleman: {
    label: '🇩🇪 Deutsch', seoName: 'Deutsch', accent: '#dd0000', readingLanguage: 'de', breadcrumb: 'Übungen', breadcrumbAria: 'Navigationspfad', title: 'Wähle eine Fertigkeit',
    lead: {
      b2: 'Trainiere Lesen, Grammatik, Schreiben und Sprechen mit anspruchsvollen B2-Aufgaben.',
      c1: 'Vertiefe Syntax, Textkohäsion und Ausdruck in vier Fertigkeiten auf C1-Niveau.',
      c2: 'Arbeite an stilistischer Präzision, Register und Nuancen in vier Fertigkeiten.',
    },
    skills: {
      reading: ['Lesen', 'Texte verstehen', 'Lies anspruchsvolle Texte und belege deine Antworten mit Textstellen.'],
      grammar: ['Grammatik', 'Strukturen beherrschen', 'Erklärungen, visuelle Karten, Übungen und drei PDF-Materialien pro Thema.'],
      writing: ['Schreiben', 'Berufliche Fälle', 'Bearbeite berufliche Situationen und überarbeite deine Antwort.'],
      speaking: ['Sprechen', 'Freies Sprechen', 'Improvisiere mit Überraschungswörtern oder begründe deine Position zu einem Dilemma.'],
    },
    units: ['Lektionen', 'Texte', 'Fälle', 'Fragen', 'Dilemmata'],
  },
  frances: {
    label: '🇫🇷 Français', seoName: 'Français', accent: '#003189', readingLanguage: 'fr', breadcrumb: 'Pratique', breadcrumbAria: 'Fil d’Ariane', title: 'Choisissez une compétence',
    lead: {
      b2: 'Travaillez la lecture, la grammaire, l’écriture et l’expression orale à travers des tâches B2 concrètes.',
      c1: 'Affinez la syntaxe, la cohésion et le registre dans quatre compétences de niveau C1.',
      c2: 'Maîtrisez les nuances, le point de vue et le style dans quatre compétences avancées.',
    },
    skills: {
      reading: ['Lecture', 'Compréhension', 'Lisez des textes complexes et justifiez vos réponses à partir des indices.'],
      grammar: ['Grammaire', 'Structures avancées', 'Explications, cartes visuelles, exercices et trois PDF par thème.'],
      writing: ['Rédaction', 'Situations professionnelles', 'Analysez une situation professionnelle et rédigez une réponse précise.'],
      speaking: ['Expression orale', 'Parole spontanée', 'Improvisez avec des mots surprises ou défendez votre choix face à un dilemme.'],
    },
    units: ['leçons', 'textes', 'situations', 'questions', 'dilemmes'],
  },
  italiano: {
    label: '🇮🇹 Italiano', seoName: 'Italiano', accent: '#009246', readingLanguage: 'it', breadcrumb: 'Pratica', breadcrumbAria: 'Percorso di navigazione', title: 'Scegli una competenza',
    lead: {
      b2: 'Allena lettura, grammatica, scrittura e produzione orale con attività B2 concrete.',
      c1: 'Approfondisci sintassi, coesione e registro nelle quattro competenze del livello C1.',
      c2: 'Affina prospettiva, ritmo e precisione stilistica nelle quattro competenze avanzate.',
    },
    skills: {
      reading: ['Lettura', 'Comprensione', 'Leggi testi complessi e giustifica le risposte con prove dal testo.'],
      grammar: ['Grammatica', 'Strutture avanzate', 'Spiegazioni, mappe visive, esercizi e tre PDF per argomento.'],
      writing: ['Scrittura', 'Situazioni professionali', 'Analizza casi professionali e rivedi la tua risposta.'],
      speaking: ['Produzione orale', 'Parlare liberamente', 'Improvvisa con parole a sorpresa o motiva la tua scelta di fronte a un dilemma.'],
    },
    units: ['lezioni', 'testi', 'situazioni', 'domande', 'dilemmi'],
  },
  portugues: {
    label: '🇧🇷 Português', seoName: 'Português', accent: '#009c3b', readingLanguage: 'pt', breadcrumb: 'Prática', breadcrumbAria: 'Trilha de navegação', title: 'Escolha uma habilidade',
    lead: {
      b2: 'Pratique leitura, gramática, escrita e fala com tarefas concretas de nível B2.',
      c1: 'Aprofunde sintaxe, coesão e registro nas quatro habilidades do nível C1.',
      c2: 'Aperfeiçoe perspectiva, ritmo e precisão estilística nas quatro habilidades avançadas.',
    },
    skills: {
      reading: ['Leitura', 'Compreensão', 'Leia textos complexos e justifique as respostas com evidências.'],
      grammar: ['Gramática', 'Estruturas avançadas', 'Explicações, mapas visuais, exercícios e três PDFs por tema.'],
      writing: ['Escrita', 'Situações profissionais', 'Analise situações de trabalho e revise sua resposta.'],
      speaking: ['Fala', 'Expressão espontânea', 'Improvise com palavras surpresa ou defenda sua escolha em um dilema.'],
    },
    units: ['aulas', 'textos', 'situações', 'perguntas', 'dilemas'],
  },
  ruso: {
    label: '🇷🇺 Русский', seoName: 'Русский', accent: '#cc0000', readingLanguage: 'ru', breadcrumb: 'Практика', breadcrumbAria: 'Навигационная цепочка', title: 'Выберите навык',
    lead: {
      b2: 'Развивайте чтение, грамматику, письмо и устную речь на конкретных заданиях уровня B2.',
      c1: 'Оттачивайте синтаксис, связность и регистр во всех четырёх навыках уровня C1.',
      c2: 'Работайте с нюансами, стилем и точностью в четырёх продвинутых навыках.',
    },
    skills: {
      reading: ['Чтение', 'Понимание текста', 'Читайте сложные тексты и подтверждайте ответы фрагментами.'],
      grammar: ['Грамматика', 'Сложные конструкции', 'Подробные объяснения, визуальные карты, упражнения и три PDF к теме.'],
      writing: ['Письмо', 'Рабочие ситуации', 'Разбирайте рабочие ситуации и редактируйте свой ответ.'],
      speaking: ['Устная речь', 'Свободный ответ', 'Импровизируйте со словами-подсказками или обоснуйте свой выбор в спорной ситуации.'],
    },
    units: ['уроков', 'текстов', 'ситуаций', 'вопросов', 'дилемм'],
  },
  japones: {
    label: '🇯🇵 日本語', seoName: '日本語', accent: '#bc002d', readingLanguage: 'ja', breadcrumb: '練習', breadcrumbAria: 'パンくずリスト', title: '練習する技能を選ぶ',
    lead: {
      b2: 'B2レベルの読解・文法・作文・会話を、具体的な課題で練習します。',
      c1: 'C1レベルの構文、文章のつながり、文体を四つの技能で磨きます。',
      c2: '高度な読解・文法・作文・会話を通じて、視点と表現の精度を高めます。',
    },
    skills: {
      reading: ['読解', '文章を読み解く', '複雑な文章を読み、本文の根拠を示して答えます。'],
      grammar: ['文法', '高度な表現', '解説、視覚マップ、練習問題、各テーマのPDF三種類を使います。'],
      writing: ['作文', '職場での課題', '仕事の場面を分析し、文章を書いて推敲します。'],
      speaking: ['会話', '即興で話す', '指定された言葉で即興で話したり、難しい選択について自分の立場を説明したりします。'],
    },
    units: ['レッスン', '本の文章', '課題', 'の質問', 'のジレンマ'],
  },
  coreano: {
    label: '🇰🇷 한국어', seoName: '한국어', accent: '#534AB7', readingLanguage: 'ko', breadcrumb: '연습', breadcrumbAria: '현재 위치', title: '연습할 영역을 고르세요',
    lead: {
      b2: 'B2 수준의 읽기, 문법, 쓰기, 말하기를 구체적인 과제로 연습하세요.',
      c1: 'C1 수준의 복합 구문, 글의 응집성과 격식을 네 가지 영역에서 다듬으세요.',
      c2: '고급 읽기, 문법, 쓰기, 말하기를 통해 관점과 문체의 정확성을 높이세요.',
    },
    skills: {
      reading: ['읽기', '글 이해하기', '복잡한 글을 읽고 본문의 근거로 답을 설명하세요.'],
      grammar: ['문법', '고급 표현', '설명, 시각 자료, 연습 문제와 주제별 PDF 세 종류를 활용하세요.'],
      writing: ['쓰기', '직장 상황', '직장 상황을 분석하고 답장을 쓴 뒤 수정하세요.'],
      speaking: ['말하기', '즉흥적으로 말하기', '주어진 단어로 즉흥적으로 말하거나, 딜레마에 대한 자신의 입장을 설명하세요.'],
    },
    units: ['개 강의', '편의 글', '개 상황', '개 질문', '개 딜레마'],
  },
}

export function advancedLevelMetadata(language: Language, level: Level): Metadata {
  const copy = COPY[language]
  const levelLabel = level.toUpperCase()
  return {
    title: `${copy.seoName} ${levelLabel} — ${copy.title}`,
    description: copy.lead[level],
    alternates: { canonical: `https://www.idiomaswl.com/practica/${language}/${level}` },
  }
}

export default function AdvancedLevelSkillHub({ language, level }: { language: Language; level: Level }) {
  const copy = COPY[language]
  const base = `/practica/${language}/${level}`
  const levelLabel = level.toUpperCase() as Uppercase<Level>
  const grammarCount = getTopicsByLevel(language, level).length
  const separator = language === 'japones' || language === 'coreano' ? '' : ' '
  return <SkillHub
    langHref={`/practica/${language}`}
    langLabel={copy.label}
    breadcrumbLabel={copy.breadcrumb}
    breadcrumbAriaLabel={copy.breadcrumbAria}
    levelLabel={levelLabel}
    eyebrow={`${copy.label} · ${levelLabel}`}
    title={copy.title}
    lead={copy.lead[level]}
    accent={copy.accent}
    skills={[
      { id: 'lectura', name: copy.skills.reading[0], eng: copy.skills.reading[1], desc: copy.skills.reading[2], count: `20${separator}${copy.units[1]}`, href: readingHubPath('en', copy.readingLanguage, levelLabel) },
      { id: 'gramatica', name: copy.skills.grammar[0], eng: copy.skills.grammar[1], desc: copy.skills.grammar[2], count: `${grammarCount}${separator}${copy.units[0]} · ${grammarCount * 3} PDF`, href: `${base}/gramatica` },
      { id: 'escritura', name: copy.skills.writing[0], eng: copy.skills.writing[1], desc: copy.skills.writing[2], count: `20${separator}${copy.units[2]}`, href: `${base}/escritura` },
      { id: 'habla', name: copy.skills.speaking[0], eng: copy.skills.speaking[1], desc: copy.skills.speaking[2], count: `20${separator}${copy.units[3]} · 20${separator}${copy.units[4]}`, href: `${base}/habla` },
    ]}
  />
}
