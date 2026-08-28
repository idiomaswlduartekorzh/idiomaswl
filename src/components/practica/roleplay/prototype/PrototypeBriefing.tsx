'use client'

import { useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { ArrowRight, BusFront, Check, Clock3, EyeOff, MapPin, UsersRound } from 'lucide-react'
import type { SpeakingPrototypeRoleId } from '@/data/practica/habla-prototipo'
import s from './prototype.module.css'

type SharedBrief = {
  title: string
  eyebrow: string
  duration: string
  route: string
  situation: string
  problem: string
  sharedTask: string
  finishWhen: string
  sayTogether: readonly string[]
}

type RoleChoice = {
  id: SpeakingPrototypeRoleId
  label: string
  href: string
  starts: boolean
}

export default function PrototypeBriefing({ brief, roles, accent }: { brief: SharedBrief; roles: RoleChoice[]; accent: string }) {
  const [checked, setChecked] = useState<boolean[]>(brief.sayTogether.map(() => false))
  const [rolesOpen, setRolesOpen] = useState(false)
  const rolesRef = useRef<HTMLElement>(null)
  const understood = checked.every(Boolean)

  function toggleCheck(index: number) {
    setChecked((current) => current.map((value, itemIndex) => (itemIndex === index ? !value : value)))
  }

  function openRoles() {
    if (!understood) return
    setRolesOpen(true)
    window.requestAnimationFrame(() => rolesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <div className="wlp-page" lang="en" style={{ '--wlp-accent': accent } as CSSProperties}>
      <div className={`wlp-shell ${s.shell}`}>
        <nav className="wlp-breadcrumb" aria-label="Breadcrumb">
          <Link href="/practica">Practice</Link>
          <span aria-hidden="true">/</span>
          <Link href="/practica/ingles/a1">English A1</Link>
          <span aria-hidden="true">/</span>
          <Link href="/practica/ingles/a1/habla">Speaking</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Classroom prototype</span>
        </nav>

        <ol className={s.progress} aria-label="Practice steps">
          <li className={s.progressActive}><span>01</span> Understand</li>
          <li><span>02</span> Choose roles</li>
          <li><span>03</span> Prepare</li>
          <li><span>04</span> Speak</li>
          <li><span>05</span> Review</li>
        </ol>

        <header className={s.hero}>
          <div>
            <p className="wlp-eyebrow">{brief.eyebrow}</p>
            <h1>{brief.title}</h1>
            <p className={s.lead}>Read the situation together. Then say three short sentences before you choose your roles.</p>
          </div>
          <dl className={s.heroFacts}>
            <div><dt><MapPin size={16} aria-hidden="true" /> Route</dt><dd>{brief.route}</dd></div>
            <div><dt><Clock3 size={16} aria-hidden="true" /> Time</dt><dd>{brief.duration}</dd></div>
            <div><dt><UsersRound size={16} aria-hidden="true" /> People</dt><dd>2 learners</dd></div>
          </dl>
        </header>

        <div className={s.briefingLayout}>
          <aside className={s.briefStrip} aria-label="The brief">
            <p className={s.stripLabel}>The brief</p>
            <BusFront size={28} strokeWidth={1.7} aria-hidden="true" />
            <p className={s.stripRoute}>San Gil<br /><span>to</span><br />Bucaramanga</p>
            <div className={s.stripRule} />
            <p><strong>Problem</strong>One seat number for two passengers.</p>
            <p><strong>Task</strong>Get two different seats.</p>
          </aside>

          <main className={s.sheet}>
            <section className={s.briefBlock} aria-labelledby="situation-title">
              <p className={s.blockNumber}>01 · Situation</p>
              <h2 id="situation-title">Why are you traveling?</h2>
              <p>{brief.situation}</p>
            </section>

            <section className={s.briefBlock} aria-labelledby="problem-title">
              <p className={s.blockNumber}>02 · What happened</p>
              <h2 id="problem-title">There is a problem with the seats.</h2>
              <p>{brief.problem}</p>
              <div className={s.ticketPair} aria-label="Two tickets with the same seat">
                <span>Ticket 1 <strong>Seat 12</strong></span>
                <span>Ticket 2 <strong>Seat 12</strong></span>
              </div>
            </section>

            <section className={s.briefBlock} aria-labelledby="task-title">
              <p className={s.blockNumber}>03 · Your shared task</p>
              <h2 id="task-title">Fix the booking together.</h2>
              <p>{brief.sharedTask}</p>
            </section>

            <section className={s.finishBlock} aria-labelledby="finish-title">
              <p className={s.blockNumber}>04 · Finish when</p>
              <h2 id="finish-title">You have one clear final plan.</h2>
              <p>{brief.finishWhen}</p>
            </section>

            <section className={s.sayTogether} aria-labelledby="together-title">
              <div className={s.sayHeading}>
                <div>
                  <p className={s.blockNumber}>Say it together</p>
                  <h2 id="together-title">Make sure you understand.</h2>
                </div>
                <span>{checked.filter(Boolean).length}/{checked.length}</span>
              </div>
              <p className={s.sayInstruction}>Say each sentence aloud. Then mark it.</p>
              <div className={s.sayChecks}>
                {brief.sayTogether.map((sentence, index) => (
                  <label key={sentence} className={checked[index] ? s.sayCheckDone : undefined}>
                    <input type="checkbox" checked={checked[index]} onChange={() => toggleCheck(index)} />
                    <span className={s.checkBox} aria-hidden="true">{checked[index] ? <Check size={16} /> : index + 1}</span>
                    <span>{sentence}</span>
                  </label>
                ))}
              </div>
              <button className="wlp-btn" type="button" disabled={!understood} onClick={openRoles}>
                We understand — choose roles <ArrowRight size={18} aria-hidden="true" />
              </button>
              {!understood ? <p className={s.buttonHint}>Say and mark all three sentences first.</p> : null}
            </section>

            <section className={`${s.roleSection} ${rolesOpen ? s.roleSectionOpen : ''}`} ref={rolesRef} aria-labelledby="roles-title" hidden={!rolesOpen}>
              <p className={s.blockNumber}>02 · Choose roles</p>
              <h2 id="roles-title">One screen for each learner.</h2>
              <p className={s.roleIntro}>Choose one role each. Open your role on your own phone or computer.</p>
              <div className={s.privacyNote}>
                <EyeOff size={21} aria-hidden="true" />
                <p><strong>Keep the conversation real.</strong> Do not read your partner’s role.</p>
              </div>
              <div className={s.roleChoices}>
                {roles.map((role) => (
                  <Link className={s.roleChoice} href={role.href} prefetch={false} key={role.id}>
                    <span className={s.roleLetter}>Role {role.id.toUpperCase()}</span>
                    <span className={s.roleName}>{role.label}</span>
                    <span className={s.roleMeta}>{role.starts ? 'You start the conversation' : 'Your partner starts'}</span>
                    <strong>Open only this role <ArrowRight size={18} aria-hidden="true" /></strong>
                  </Link>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
