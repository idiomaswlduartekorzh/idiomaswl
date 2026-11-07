'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Check, Mic2, Sparkles } from 'lucide-react'
import type { ImprovisaExercise, ImprovisaLanguage, ImprovisaLevel } from '@/data/practica/improvisa/config'
import { LANGUAGE_NAMES, improvisaPath } from '@/data/practica/improvisa/config'
import { readCompleted } from './progress'
import styles from './solo-questions.module.css'

type Copy = { back: string; eyebrow: string; title: string; lead: string; progress: string; question: string; start: string; done: string; note: string; switchLabel: string }
const COPY: Record<ImprovisaLanguage | 'es', Copy> = {
  es: { back: 'Volver al nivel', eyebrow: 'HABLA SOLO · 20 PREGUNTAS', title: 'Elige una pregunta.', lead: 'Cada tarjeta abre un reto oral con seis palabras sorpresa. Puedes empezar por cualquiera y volver cuando quieras.', progress: 'completadas', question: 'PREGUNTA', start: 'Empezar reto', done: 'Completada', note: 'Habla en voz alta. No necesitas escribir ni grabarte.', switchLabel: 'Idioma de la interfaz' },
  ingles: { back: 'Back to level', eyebrow: 'SOLO SPEAKING · 20 QUESTIONS', title: 'Choose a question.', lead: 'Each card opens a speaking challenge with six surprise words. Start anywhere and return whenever you like.', progress: 'completed', question: 'QUESTION', start: 'Start challenge', done: 'Completed', note: 'Speak out loud. You do not need to write or record yourself.', switchLabel: 'Interface language' },
  frances: { back: 'Retour au niveau', eyebrow: 'PARLER SEUL · 20 QUESTIONS', title: 'Choisis une question.', lead: 'Chaque carte ouvre un défi oral avec six mots surprise. Commence où tu veux et reviens quand tu le souhaites.', progress: 'terminées', question: 'QUESTION', start: 'Commencer le défi', done: 'Terminée', note: 'Parle à voix haute. Tu n’as pas besoin d’écrire ni de t’enregistrer.', switchLabel: 'Langue de l’interface' },
  aleman: { back: 'Zurück zum Niveau', eyebrow: 'ALLEIN SPRECHEN · 20 FRAGEN', title: 'Wähle eine Frage.', lead: 'Jede Karte öffnet eine Sprechaufgabe mit sechs überraschenden Wörtern. Beginne, wo du möchtest, und komm jederzeit zurück.', progress: 'abgeschlossen', question: 'FRAGE', start: 'Aufgabe starten', done: 'Abgeschlossen', note: 'Sprich laut. Du musst nichts schreiben oder aufnehmen.', switchLabel: 'Sprache der Oberfläche' },
  italiano: { back: 'Torna al livello', eyebrow: 'PARLA DA SOLO · 20 DOMANDE', title: 'Scegli una domanda.', lead: 'Ogni scheda apre una sfida orale con sei parole a sorpresa. Inizia da dove vuoi e torna quando preferisci.', progress: 'completate', question: 'DOMANDA', start: 'Inizia la sfida', done: 'Completata', note: 'Parla ad alta voce. Non devi scrivere né registrarti.', switchLabel: 'Lingua dell’interfaccia' },
  portugues: { back: 'Voltar ao nível', eyebrow: 'FALE SOZINHO · 20 PERGUNTAS', title: 'Escolha uma pergunta.', lead: 'Cada cartão abre um desafio oral com seis palavras surpresa. Comece por onde quiser e volte quando desejar.', progress: 'concluídas', question: 'PERGUNTA', start: 'Começar desafio', done: 'Concluída', note: 'Fale em voz alta. Você não precisa escrever nem gravar.', switchLabel: 'Idioma da interface' },
  ruso: { back: 'Вернуться к уровню', eyebrow: 'ГОВОРИ САМ · 20 ВОПРОСОВ', title: 'Выбери вопрос.', lead: 'Каждая карточка открывает устное задание с шестью неожиданными словами. Начни с любого вопроса и возвращайся в любое время.', progress: 'выполнено', question: 'ВОПРОС', start: 'Начать задание', done: 'Выполнено', note: 'Говори вслух. Ничего писать или записывать не нужно.', switchLabel: 'Язык интерфейса' },
  japones: { back: 'レベルに戻る', eyebrow: '一人で話す · 20の質問', title: '質問を選びましょう。', lead: '各カードには六つの意外な言葉が出るスピーキング課題があります。好きな質問から始められます。', progress: '完了', question: '質問', start: '始める', done: '完了', note: '声に出して話してください。書いたり録音したりする必要はありません。', switchLabel: '表示言語' },
  coreano: { back: '레벨로 돌아가기', eyebrow: '혼자 말하기 · 질문 20개', title: '질문을 선택하세요.', lead: '각 카드에는 여섯 개의 깜짝 단어가 나오는 말하기 과제가 있습니다. 원하는 질문부터 시작하세요.', progress: '완료', question: '질문', start: '시작하기', done: '완료', note: '소리 내어 말해 보세요. 쓰거나 녹음할 필요는 없습니다.', switchLabel: '화면 언어' },
}

export default function SoloQuestionsClient({ language, level, exercises }: { language: ImprovisaLanguage; level: ImprovisaLevel; exercises: ImprovisaExercise[] }) {
  const canUseSpanish = language === 'ruso' || language === 'japones' || language === 'coreano'
  const [useSpanish, setUseSpanish] = useState(canUseSpanish)
  const [completed, setCompleted] = useState<number[]>([])
  const target = LANGUAGE_NAMES[language]
  const copy = COPY[useSpanish ? 'es' : language]
  useEffect(() => {
    const saved = readCompleted(language, level, exercises.length)
    const timeout = window.setTimeout(() => setCompleted(saved), 0)
    return () => window.clearTimeout(timeout)
  }, [language, level, exercises.length])

  return <div className={styles.page}>
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <Link href={`/practica/${language}/${level}`} className={styles.back}><ArrowLeft size={17} /> {copy.back}</Link>
        <span className={styles.brand}>WELEARN <span>/</span> SPEAKING LAB</span>
        <span className={styles.level}>{target.target} {level.toUpperCase()}</span>
      </header>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}><Sparkles size={16} /> {copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className={styles.lead}>{copy.lead}</p>
          <div className={styles.heroMeta}><span><Mic2 size={16} /> {copy.note}</span><strong>{completed.length} / 20 {copy.progress}</strong></div>
        </div>
        <div className={styles.heroArt} aria-hidden="true"><span>20</span><small>{target.target}<br />{level.toUpperCase()}</small></div>
      </section>
      {canUseSpanish ? <div className={styles.language} role="group" aria-label={copy.switchLabel}>
        <button type="button" className={useSpanish ? styles.active : ''} onClick={() => setUseSpanish(true)} aria-pressed={useSpanish}>Español</button>
        <button type="button" className={!useSpanish ? styles.active : ''} onClick={() => setUseSpanish(false)} aria-pressed={!useSpanish}>{target.target}</button>
      </div> : null}
      <ol className={styles.grid}>
        {exercises.map((exercise, index) => <li key={`${index}-${exercise.question}`}>
          <Link className={`${styles.card} ${completed.includes(index) ? styles.completed : ''}`} href={`${improvisaPath(language, level)}?ejercicio=${index + 1}`}>
            <div className={styles.cardTop}><span>{copy.question} {String(index + 1).padStart(2, '0')}</span>{completed.includes(index) ? <Check size={18} /> : <ArrowUpRight size={19} />}</div>
            <h2 lang={useSpanish ? 'es' : target.code}>{useSpanish ? exercise.questionEs || exercise.question : exercise.question}</h2>
            <p lang={useSpanish ? target.code : undefined}>{useSpanish ? exercise.question : exercise.title.target}</p>
            <span className={styles.action}>{completed.includes(index) ? copy.done : copy.start} <span aria-hidden="true">→</span></span>
          </Link>
        </li>)}
      </ol>
    </div>
  </div>
}
