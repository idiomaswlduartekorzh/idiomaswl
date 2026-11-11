'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import s from './roleplay.module.css'

type Phase = 'role' | 'instructions' | 'play' | 'card'
type Resource = 'case' | 'words' | 'close'

type RoleplayCardView = {
  afterTurn: number
  buttonLabel: string
  intro: ReactNode
  content: ReactNode
}

const steps = [
  { number: '01', label: 'Tu papel' },
  { number: '02', label: 'Instrucciones' },
  { number: '03', label: 'Conversación' },
]

const resources: { id: Resource; label: string }[] = [
  { id: 'case', label: 'Datos del caso' },
  { id: 'words', label: 'Palabras' },
  { id: 'close', label: 'Cierre' },
]

export default function RoleplayJourney({
  scenarioTitle,
  scenarioPath,
  setting,
  roleId,
  roleName,
  headline,
  language,
  languageHtml,
  starts,
  minutes,
  turns,
  introduction,
  instructions,
  caseFile,
  words,
  closing,
  toolSummary,
  card,
}: {
  scenarioTitle: string
  scenarioPath: string
  setting: string
  roleId: string
  roleName: string
  headline: string
  language: string
  languageHtml: string
  starts: boolean
  minutes: number
  turns: number
  introduction: ReactNode
  instructions: ReactNode
  caseFile: ReactNode
  words: ReactNode
  closing: ReactNode
  toolSummary: string
  card?: RoleplayCardView
}) {
  const [phase, setPhase] = useState<Phase>('role')
  const [resource, setResource] = useState<Resource>('case')
  const titleRef = useRef<HTMLHeadingElement>(null)
  const previousPhase = useRef<Phase>('role')

  useEffect(() => {
    if (previousPhase.current === phase) return
    previousPhase.current = phase
    window.scrollTo(0, 0)
    titleRef.current?.focus()
  }, [phase])

  const stepNumber = phase === 'role' ? 1 : phase === 'instructions' ? 2 : 3
  const activeResource = resources.find((item) => item.id === resource) ?? resources[0]
  const resourceContent = { case: caseFile, words, close: closing }

  return (
    <div className={s.journey}>
      <ol className={s.journeySteps} aria-label="Etapas de tu rol">
        {steps.map((step, index) => (
          <li className={index + 1 === stepNumber ? s.journeyStepActive : ''} key={step.number} aria-current={index + 1 === stepNumber ? 'step' : undefined}>
            <span>{step.number}</span> {step.label}
          </li>
        ))}
      </ol>

      {phase === 'role' ? (
        <section className={s.journeyReading} aria-labelledby="role-journey-title">
          <p className={s.journeyKicker}>Escenario: {scenarioTitle} · Rol {roleId}</p>
          <h1 id="role-journey-title" ref={titleRef} tabIndex={-1}>{roleName}</h1>
          <p className={s.journeyHeadline} lang={languageHtml}>{headline}</p>
          <p className={s.journeyLead}>{setting}</p>
          <p className={s.journeyPrivacy}>Esta es tu información. La otra persona tiene una ficha distinta.</p>
          <div className={s.journeyBody}>{introduction}</div>
          <div className={s.journeyActions}>
            <button type="button" className="wlp-btn" onClick={() => setPhase('instructions')}>Ya entendí mi rol →</button>
            <Link href={scenarioPath}>Elegir otro papel</Link>
          </div>
        </section>
      ) : null}

      {phase === 'instructions' ? (
        <section className={s.journeyReading} aria-labelledby="instructions-journey-title">
          <p className={s.journeyKicker}>Rol {roleId} · Antes de hablar</p>
          <h1 id="instructions-journey-title" ref={titleRef} tabIndex={-1}>Así juegas este papel</h1>
          <p className={s.journeyLead}>
            {starts ? 'Tú abres la conversación.' : 'La otra persona empieza; escucha y responde.'}
            {' '}Tienen {minutes} minutos y unos {turns} turnos por persona.
          </p>
          <div className={s.journeyAvailable}>
            <h2>Con qué cuentas</h2>
            <p>{toolSummary}</p>
          </div>
          <div className={s.journeyBody}>{instructions}</div>
          <div className={s.journeyActions}>
            <button type="button" className="wlp-btn" onClick={() => setPhase('play')}>Empezar conversación →</button>
            <button type="button" className={s.journeyTextButton} onClick={() => setPhase('role')}>← Volver a mi papel</button>
          </div>
        </section>
      ) : null}

      {phase === 'play' ? (
        <section className={s.journeyPlay} aria-labelledby="play-journey-title">
          <p className={s.journeyKicker}>Rol {roleId} · En juego</p>
          <h1 id="play-journey-title" ref={titleRef} tabIndex={-1}>Tu mesa de juego</h1>
          <p className={s.journeyLead}>Habla en {language}. Consulta tus datos o palabras cuando los necesites y usa el criterio de cierre de tu caso.</p>

          {card ? (
            <div className={s.journeyEvent}>
              <p><strong>Novedad desde el turno global {card.afterTurn}.</strong> Ábrela solo cuando llegue ese momento de la conversación.</p>
              <button type="button" className="wlp-btn" onClick={() => setPhase('card')}>{card.buttonLabel} →</button>
            </div>
          ) : null}

          <nav className={s.journeyTabs} aria-label="Recursos de tu rol">
            {resources.map((item) => (
              <button
                type="button"
                key={item.id}
                className={resource === item.id ? s.journeyTabActive : ''}
                aria-pressed={resource === item.id}
                onClick={() => setResource(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <section className={s.journeyResource} aria-label={activeResource.label}>
            {resourceContent[resource]}
          </section>
          <div className={s.journeyActions}>
            <button type="button" className={s.journeyTextButton} onClick={() => setPhase('instructions')}>← Ver instrucciones</button>
            <Link href={scenarioPath}>Elegir otro papel</Link>
          </div>
        </section>
      ) : null}

      {phase === 'card' && card ? (
        <section className={s.journeyCard} aria-label="Novedad del caso">
          <p className={s.cardTurn}>Turno global {card.afterTurn}</p>
          <h1 ref={titleRef} tabIndex={-1}>Novedad para tu rol</h1>
          <div lang={languageHtml}>{card.intro}</div>
          <div className={s.cardBody}>{card.content}</div>
          <div className={s.journeyActions}>
            <button type="button" className="wlp-btn wlp-btn--secondary" onClick={() => setPhase('play')}>← Volver a la conversación</button>
          </div>
        </section>
      ) : null}
    </div>
  )
}
