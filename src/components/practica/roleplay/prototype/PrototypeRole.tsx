'use client'

import { useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  EyeOff,
  Lightbulb,
  LockKeyhole,
  MessageCircle,
  RotateCcw,
} from 'lucide-react'
import type { SpeakingPrototypeRole } from '@/data/practica/habla-prototipo'
import s from './prototype.module.css'

type SharedBrief = {
  route: string
  problem: string
  sharedTask: string
  finishWhen: string
  closingChecklist: readonly string[]
}

export default function PrototypeRole({ brief, role, backHref, accent }: { brief: SharedBrief; role: SpeakingPrototypeRole; backHref: string; accent: string }) {
  const [started, setStarted] = useState(false)
  const [complicationOpen, setComplicationOpen] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [reviewChecks, setReviewChecks] = useState<boolean[]>(brief.closingChecklist.map(() => false))
  const speakRef = useRef<HTMLElement>(null)
  const reviewRef = useRef<HTMLElement>(null)

  function startSpeaking() {
    setStarted(true)
    window.requestAnimationFrame(() => speakRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  function openReview() {
    setReviewOpen(true)
    window.requestAnimationFrame(() => reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  function toggleReview(index: number) {
    setReviewChecks((current) => current.map((value, itemIndex) => (index === itemIndex ? !value : value)))
  }

  return (
    <div className="wlp-page" lang="en" style={{ '--wlp-accent': accent } as CSSProperties}>
      <div className={`wlp-shell ${s.shell}`}>
        <nav className="wlp-breadcrumb" aria-label="Breadcrumb">
          <Link href={backHref}><ArrowLeft size={14} aria-hidden="true" /> Shared briefing</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Role {role.id.toUpperCase()}</span>
        </nav>

        <ol className={s.progress} aria-label="Practice steps">
          <li className={s.progressDone}><span><Check size={13} /></span> Understand</li>
          <li className={s.progressDone}><span><Check size={13} /></span> Choose roles</li>
          <li className={!started ? s.progressActive : s.progressDone}><span>{started ? <Check size={13} /> : '03'}</span> Prepare</li>
          <li className={started && !reviewOpen ? s.progressActive : reviewOpen ? s.progressDone : undefined}><span>{reviewOpen ? <Check size={13} /> : '04'}</span> Speak</li>
          <li className={reviewOpen ? s.progressActive : undefined}><span>05</span> Review</li>
        </ol>

        <div className={s.privateBanner} role="note">
          <LockKeyhole size={18} aria-hidden="true" />
          <p><strong>Private role.</strong> Keep this screen away from your partner.</p>
        </div>

        <header className={s.roleHero}>
          <p className="wlp-eyebrow">Role {role.id.toUpperCase()} · {role.label} · English A1</p>
          <h1>{role.identity}</h1>
          <p>Read your mission. Do not memorize every sentence. Keep this page open while you talk.</p>
        </header>

        <div className={s.briefingLayout}>
          <aside className={`${s.briefStrip} ${s.roleBriefStrip}`} aria-label="The brief">
            <p className={s.stripLabel}>The brief</p>
            <p className={s.stripRoute}>{brief.route}</p>
            <div className={s.stripRule} />
            <p><strong>Problem</strong>Both tickets show seat 12.</p>
            <p><strong>Shared task</strong>Get two different seats.</p>
            <p><strong>Your role</strong>{role.label}</p>
          </aside>

          <main className={s.sheet}>
            <section className={s.missionSheet} aria-labelledby="mission-title">
              <div className={s.missionHeading}>
                <div>
                  <p className={s.blockNumber}>Prepare · Your mission</p>
                  <h2 id="mission-title">What you need for the conversation</h2>
                </div>
                <span>Role {role.id.toUpperCase()}</span>
              </div>

              <div className={s.missionRow}>
                <h3>Your goal</h3>
                <p>{role.goal}</p>
              </div>

              <div className={s.missionColumns}>
                <section>
                  <h3>You know</h3>
                  <ul>{role.knows.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section>
                  <h3>You need to find out</h3>
                  <ul>{role.needsToFindOut.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              </div>

              <div className={s.cannotAccept}>
                <AlertTriangle size={22} aria-hidden="true" />
                <div>
                  <h3>You cannot accept</h3>
                  <ul>{role.cannotAccept.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </div>

              <div className={s.firstMove}>
                <p className={s.blockNumber}>Your first move</p>
                <p>{role.firstMove}</p>
              </div>
            </section>

            <details className={s.helpDetails}>
              <summary><Lightbulb size={19} aria-hidden="true" /> Need help before you speak?</summary>
              <div className={s.helpBody}>
                <section>
                  <h2>Useful language</h2>
                  <ul className={s.phraseList}>{role.usefulLanguage.map((phrase) => <li key={phrase}>“{phrase}”</li>)}</ul>
                </section>
                <section>
                  <h2>Words</h2>
                  <dl className={s.wordList}>{role.words.map((item) => <div key={item.word}><dt>{item.word}</dt><dd>{item.meaning}</dd></div>)}</dl>
                </section>
              </div>
            </details>

            <div className={s.readyRow}>
              <p>Ready? Put your notes where only you can see them.</p>
              <button className="wlp-btn" type="button" onClick={startSpeaking}>
                I am ready to speak <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>

            <section className={`${s.speakSection} ${started ? s.speakSectionOpen : ''}`} ref={speakRef} aria-labelledby="speak-title" hidden={!started}>
              <p className={s.blockNumber}>04 · Speak</p>
              <h2 id="speak-title">Start the conversation.</h2>
              <div className={s.speakingCue}>
                <MessageCircle size={28} aria-hidden="true" />
                <p>{role.speakingCue}</p>
              </div>
              <ol className={s.speakingRules}>
                <li>Speak in English.</li>
                <li>Ask questions. Do not read a full script.</li>
                <li>Keep talking until you have one final travel plan.</li>
              </ol>

              {role.complication ? (
                <div className={s.complication}>
                  <div>
                    <p className={s.blockNumber}>New information</p>
                    <p>{role.complication.instruction}</p>
                  </div>
                  {!complicationOpen ? (
                    <button className="wlp-btn wlp-btn--secondary" type="button" onClick={() => setComplicationOpen(true)}>
                      Reveal new information
                    </button>
                  ) : (
                    <div className={s.complicationMessage} aria-live="polite">
                      <AlertTriangle size={23} aria-hidden="true" />
                      <p>{role.complication.message}</p>
                    </div>
                  )}
                </div>
              ) : null}

              <div className={s.finishPrompt}>
                <div>
                  <p className={s.blockNumber}>Finish when</p>
                  <p>{brief.finishWhen}</p>
                </div>
                <button className="wlp-btn" type="button" onClick={openReview}>We have a final plan</button>
              </div>
            </section>

            <section className={`${s.reviewSection} ${reviewOpen ? s.reviewSectionOpen : ''}`} ref={reviewRef} aria-labelledby="review-title" hidden={!reviewOpen}>
              <p className={s.blockNumber}>05 · Review together</p>
              <h2 id="review-title">Can you both answer these questions?</h2>
              <p>Say each answer aloud. Mark it when both learners agree.</p>
              <div className={s.reviewChecks}>
                {brief.closingChecklist.map((question, index) => (
                  <label key={question}>
                    <input type="checkbox" checked={reviewChecks[index]} onChange={() => toggleReview(index)} />
                    <span className={s.checkBox} aria-hidden="true">{reviewChecks[index] ? <Check size={16} /> : index + 1}</span>
                    <span>{question}</span>
                  </label>
                ))}
              </div>
              {reviewChecks.every(Boolean) ? (
                <div className={s.completeMessage} aria-live="polite">
                  <Check size={24} aria-hidden="true" />
                  <div><strong>Practice complete.</strong><p>You understood the problem, negotiated a solution and confirmed the final plan.</p></div>
                </div>
              ) : null}
              <div className={s.restartRow}>
                <Link className="wlp-btn wlp-btn--secondary" href={backHref}><RotateCcw size={17} aria-hidden="true" /> Try again or change roles</Link>
              </div>
            </section>

            <div className={s.privacyFooter}>
              <EyeOff size={18} aria-hidden="true" />
              <p>This preliminary version does not record audio, save answers or connect the two screens.</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
