'use client'

import { useState, type ReactNode } from 'react'
import s from './roleplay.module.css'

type WorkspaceSection = 'brief' | 'case' | 'language' | 'close'

const sections: { id: WorkspaceSection; number: string; title: string; hint: string }[] = [
  { id: 'brief', number: '01', title: 'Tu encargo', hint: 'Qué buscas y qué límites tienes' },
  { id: 'case', number: '02', title: 'Datos y documentos', hint: 'Lo que puedes consultar o mostrar' },
  { id: 'language', number: '03', title: 'Palabras para hablar', hint: 'Vocabulario y expresiones' },
  { id: 'close', number: '04', title: 'Cómo cerrar', hint: 'Acuerdo y repaso' },
]

export default function RoleplayWorkspace({
  roleName,
  brief,
  caseFile,
  languageTools,
  close,
}: {
  roleName: string
  brief: ReactNode
  caseFile: ReactNode
  languageTools: ReactNode
  close: ReactNode
}) {
  const [active, setActive] = useState<WorkspaceSection>('brief')
  const content = { brief, case: caseFile, language: languageTools, close }
  const activeIndex = sections.findIndex((section) => section.id === active)
  const current = sections[activeIndex]
  const next = sections[activeIndex + 1]

  return (
    <div className={s.workspace}>
      <div className={s.workspaceHeading}>
        <div>
          <p className={s.pieceLabel}>Tu mesa de juego</p>
          <h2>Tu papel: {roleName}</h2>
          <p>Lee tu encargo, consulta tus recursos y habla con la otra persona. Cada papel tiene su propia información.</p>
        </div>
        <span className={s.workspaceProgress}>{current.number} / 04</span>
      </div>

      <nav className={s.workspaceNav} aria-label="Secciones de tu rol">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={`${s.workspaceNavButton} ${active === section.id ? s.workspaceNavButtonActive : ''}`}
            aria-pressed={active === section.id}
            onClick={() => setActive(section.id)}
          >
            <span className={s.workspaceNavNumber}>{section.number}</span>
            <span><strong>{section.title}</strong><small>{section.hint}</small></span>
          </button>
        ))}
      </nav>

      <section className={s.workspacePanel} aria-label={current.title}>
        <div className={s.workspacePanelHeading}>
          <span>{current.number}</span>
          <div><h3>{current.title}</h3><p>{current.hint}</p></div>
        </div>
        {content[active]}
        {next ? (
          <button type="button" className={`wlp-btn ${s.workspaceNext}`} onClick={() => setActive(next.id)}>
            Siguiente: {next.title} →
          </button>
        ) : (
          <button type="button" className={`wlp-btn wlp-btn--secondary ${s.workspaceNext}`} onClick={() => setActive('brief')}>
            Volver a mi encargo
          </button>
        )}
      </section>
    </div>
  )
}
