import type { CSSProperties } from 'react'
import Link from 'next/link'
import { SKILL_ACCENT } from '@/data/practica/skill-accents'
import {
  ROLEPLAY_LIMITS,
  ROLEPLAY_LANGUAGES,
  ROLEPLAY_LEVELS,
  accompaniedSpeakingPath,
  otherRole,
  roleplayRolePath,
  roleplayScenarioPath,
  roleplayToolkitPath,
  soloSpeakingPath,
  speakingPath,
  type RoleplayRole,
  type RoleplayScenario,
  type RoleplaySet,
} from '@/data/practica/habla-acompanado'
import RoleplayCardScreen from './RoleplayCardScreen'
import ShareRoleLink from './ShareRoleLink'
import { Blocks, inline } from './RoleplayMarkup'
import s from './roleplay.module.css'

const speechActLabel: Record<RoleplayScenario['speechActs'][number], string> = {
  'pedir-favor': 'pedir un favor',
  rechazar: 'rechazar',
  negociar: 'negociar',
  disculparse: 'disculparse',
  quejarse: 'quejarse',
  'proponer-alternativa': 'proponer una alternativa',
  'dar-mala-noticia': 'dar una mala noticia',
  insistir: 'insistir',
  'poner-limite': 'poner un límite',
  'pedir-aclaracion': 'pedir aclaración',
  'conceder-con-condicion': 'aceptar con una condición',
  recomendar: 'recomendar',
}

function roleplayStyle(): CSSProperties {
  return { '--wlp-accent': SKILL_ACCENT.habla.var } as CSSProperties
}

export function RoleplayLimits() {
  return (
    <aside className={s.limits} aria-labelledby="roleplay-limits-title">
      <h2 className={s.limitsTitle} id="roleplay-limits-title">Antes de elegir este modo</h2>
      <div className={s.limitsList}>
        {ROLEPLAY_LIMITS.map((limit) => (
          <div key={limit.title}>
            <strong>{limit.title}</strong>
            {limit.body}
          </div>
        ))}
      </div>
    </aside>
  )
}

export function SpeakingModeHub({ set }: { set: RoleplaySet }) {
  const language = ROLEPLAY_LANGUAGES[set.language]
  const level = ROLEPLAY_LEVELS[set.level]
  return (
    <div className="wlp-page" style={roleplayStyle()}>
      <div className="wlp-shell">
        <nav className="wlp-breadcrumb" aria-label="Migas de pan">
          <Link href="/practica">Práctica</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/practica/${set.language}/${set.level}`}>{language.flag} {language.label} {level.label}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Expresión oral</span>
        </nav>

        <header className="wlp-hero wlp-hero--compact">
          <p className="wlp-eyebrow">Speaking · {language.label} {level.label}</p>
          <h1>¿Cómo quieres practicar hoy?</h1>
          <p className="wlp-hero-lead">
            Entrena a solas con frases modelo o abre un juego de rol con otra persona. Los dos
            modos practican el mismo nivel, pero exigen cosas distintas.
          </p>
        </header>

        <section className="wlp-section" aria-labelledby="speaking-modes-title">
          <div className="wlp-section-heading">
            <h2 id="speaking-modes-title">Elige un modo</h2>
            <p>Si no tienes compañero ahora, “Habla solo” sigue funcionando completo.</p>
          </div>

          <div className={s.modeGrid}>
            <Link className="wlp-card wlp-card--path" href={soloSpeakingPath(set.language, set.level)}>
              <span className="wlp-eyebrow wlp-eyebrow--card">Individual</span>
              <h3>Habla solo</h3>
              <p>20 frases esenciales con pronunciación, contexto y notas de uso.</p>
              <ul className={s.cardFacts}>
                <li>No necesitas compañero</li>
                <li>Marca tu propio avance</li>
                <li>Practica en cualquier momento</li>
              </ul>
              <strong>Practicar las 20 frases →</strong>
            </Link>

            <Link className="wlp-card wlp-card--path" href={accompaniedSpeakingPath(set.language, set.level)}>
              <span className="wlp-eyebrow wlp-eyebrow--card">En pareja</span>
              <h3>Habla acompañada</h3>
              <p>{set.scenarios.length} situaciones reales con información distinta para cada rol.</p>
              <ul className={s.cardFacts}>
                <li>Dos personas y dos pantallas</li>
                <li>{level.minutes} minutos por escenario</li>
                <li>Decisiones sin guion preparado</li>
              </ul>
              <strong>Elegir un juego de rol →</strong>
            </Link>
          </div>
        </section>

        <RoleplayLimits />
      </div>
    </div>
  )
}

export function RoleplayHub({ set }: { set: RoleplaySet }) {
  const language = ROLEPLAY_LANGUAGES[set.language]
  const level = ROLEPLAY_LEVELS[set.level]
  const basePath = speakingPath(set.language, set.level)
  return (
    <div className="wlp-page" style={roleplayStyle()}>
      <div className="wlp-shell">
        <nav className="wlp-breadcrumb" aria-label="Migas de pan">
          <Link href="/practica">Práctica</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/practica/${set.language}/${set.level}`}>{language.flag} {language.label} {level.label}</Link>
          <span aria-hidden="true">/</span>
          <Link href={basePath}>Expresión oral</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Habla acompañada</span>
        </nav>

        <header className="wlp-hero wlp-hero--compact">
          <p className="wlp-eyebrow">Roleplay · {language.label} {level.label}</p>
          <h1>Habla acompañada</h1>
          <p className="wlp-hero-lead">
            Dos personas reciben información diferente y necesitan llegar a una salida hablando
            en {language.labelLower}. No hay respuestas correctas ni un diálogo que memorizar.
          </p>
          <ol className={s.steps}>
            <li><strong>1.</strong> Elijan una situación.</li>
            <li><strong>2.</strong> Repartan los roles A y B sin leer la ficha ajena.</li>
            <li><strong>3.</strong> Abran cada ficha en un dispositivo distinto y hablen.</li>
          </ol>
        </header>

        <section className="wlp-section" aria-labelledby="scenarios-title">
          <div className="wlp-section-heading">
            <h2 id="scenarios-title">{set.scenarios.length} situaciones</h2>
            <p>Empiecen por la primera o elijan la que más se parezca a una conversación real.</p>
          </div>

          <div className={s.scenarioGrid}>
            {set.scenarios.map((scenario) => (
              <Link className={`wlp-card wlp-card--path ${s.scenarioCard}`} href={roleplayScenarioPath(scenario)} key={scenario.id}>
                <div className={s.scenarioNumber} aria-hidden="true">{String(scenario.sequence).padStart(2, '0')}</div>
                <span className="wlp-eyebrow wlp-eyebrow--card" lang={language.htmlLang}>{scenario.titleTarget}</span>
                <h3>{scenario.title}</h3>
                <p>{scenario.settingEs}</p>
                <ul className={s.meta} aria-label="Datos del ejercicio">
                  <li className={s.metaItem}><strong>{scenario.minutes}</strong> min</li>
                  <li className={s.metaItem}><strong>{scenario.turnsPerRole}</strong> turnos por rol</li>
                  <li className={s.metaItem}><strong>2</strong> personas</li>
                </ul>
                <strong>Preparar la conversación →</strong>
              </Link>
            ))}
          </div>
        </section>

        <div className={s.toolkitCallout}>
          <div>
            <p className={s.pieceLabel}>Ayuda común</p>
            <h2>Caja de herramientas {level.label}</h2>
            <p>Frases para abrir, cerrar, pedir repetición, ganar tiempo y decir que no.</p>
          </div>
          <Link className="wlp-btn wlp-btn--secondary" href={roleplayToolkitPath(set.language, set.level)}>
            Ver herramientas →
          </Link>
        </div>

        <RoleplayLimits />
      </div>
    </div>
  )
}

function RoleChoice({ scenario, role }: { scenario: RoleplayScenario; role: RoleplayRole }) {
  const href = roleplayRolePath(scenario, role.id)
  return (
    <article className={`wlp-card wlp-card--path ${s.roleChoice}`}>
      <div className={s.roleChoiceHeader}>
        <span className={s.roleLetter}>Rol {role.id.toUpperCase()}</span>
        {scenario.initiator === role.id ? <span className={s.starts}>Empieza</span> : null}
      </div>
      <h3>{role.nameEs}</h3>
      <p lang={ROLEPLAY_LANGUAGES[scenario.language].htmlLang}>{role.name}</p>
      <div className={s.roleActions}>
        <Link className="wlp-btn" href={href}>Abrir ficha {role.id.toUpperCase()}</Link>
        <ShareRoleLink href={href} label={`Compartir rol ${role.id.toUpperCase()}`} />
      </div>
    </article>
  )
}

export function RoleplayScenarioSetup({ scenario }: { scenario: RoleplayScenario }) {
  const language = ROLEPLAY_LANGUAGES[scenario.language]
  const level = ROLEPLAY_LEVELS[scenario.level]
  const basePath = speakingPath(scenario.language, scenario.level)
  const accompaniedPath = accompaniedSpeakingPath(scenario.language, scenario.level)
  return (
    <div className="wlp-page" style={roleplayStyle()}>
      <div className="wlp-shell">
        <nav className="wlp-breadcrumb" aria-label="Migas de pan">
          <Link href={basePath}>Expresión oral</Link>
          <span aria-hidden="true">/</span>
          <Link href={accompaniedPath}>Habla acompañada</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{scenario.title}</span>
        </nav>

        <header className="wlp-hero wlp-hero--compact">
          <p className="wlp-eyebrow">Escenario {scenario.sequence} · {language.label} {level.label}</p>
          <h1>{scenario.title}</h1>
          <p className={s.targetTitle} lang={language.htmlLang}>{scenario.titleTarget}</p>
          <p className="wlp-hero-lead">{scenario.settingEs}</p>
          <ul className={s.meta} aria-label="Datos del ejercicio">
            <li className={s.metaItem}><strong>{scenario.minutes}</strong> minutos</li>
            <li className={s.metaItem}><strong>{scenario.turnsPerRole}</strong> turnos por persona</li>
            <li className={s.metaItem}><strong>{scenario.speechActs.length}</strong> actos de habla</li>
          </ul>
        </header>

        <section className="wlp-section" aria-labelledby="choose-role-title">
          <div className="wlp-section-heading">
            <h2 id="choose-role-title">Repartan las fichas</h2>
            <p>
              Cada persona abre únicamente su rol. Si leen la ficha del otro, desaparece la
              información oculta que sostiene la conversación.
            </p>
          </div>
          <div className={s.roleGrid}>
            {scenario.roles.map((role) => <RoleChoice key={role.id} role={role} scenario={scenario} />)}
          </div>
        </section>

        <section className={s.preflight} aria-labelledby="preflight-title">
          <h2 id="preflight-title">Antes de empezar</h2>
          <ul className={s.checkList}>
            <li>Dejen visible únicamente la ficha propia.</li>
            <li>Hablen en {language.labelLower}; usen la caja de herramientas si se bloquean.</li>
            <li>Una persona recibe una carta a mitad de la conversación. No la abran antes.</li>
            <li>Terminen cuando cumplan el criterio de cierre de las dos fichas.</li>
          </ul>
        </section>

        <section className={s.practiceFocus} aria-labelledby="practice-focus-title">
          <h2 id="practice-focus-title">Lo que practicarán</h2>
          <div className={s.tagList}>
            {scenario.speechActs.map((act) => <span key={act}>{speechActLabel[act]}</span>)}
          </div>
        </section>

        <RoleplayLimits />
      </div>
    </div>
  )
}

function RoleContent({ scenario, role }: { scenario: RoleplayScenario; role: RoleplayRole }) {
  const counterpart = otherRole(scenario, role.id)
  const language = ROLEPLAY_LANGUAGES[scenario.language]
  const level = ROLEPLAY_LEVELS[scenario.level]
  const accompaniedPath = accompaniedSpeakingPath(scenario.language, scenario.level)
  return (
    <>
      <header className="wlp-hero wlp-hero--compact">
        <p className="wlp-eyebrow">Escenario {scenario.sequence} · Rol {role.id.toUpperCase()}</p>
        <h1>{role.nameEs}</h1>
        <p className={s.targetTitle} lang={language.htmlLang}>{role.headline}</p>
        <div className={s.secretNotice}>
          <strong>Esta ficha es solo tuya.</strong> La otra persona tiene objetivos y datos distintos.
          No intercambien pantallas hasta terminar.
        </div>
        <ul className={s.meta} aria-label="Datos del ejercicio">
          <li className={s.metaItem}><strong>{scenario.minutes}</strong> minutos</li>
          <li className={s.metaItem}><strong>{scenario.turnsPerRole}</strong> turnos tuyos</li>
          <li className={s.metaItem}><strong>{scenario.initiator === role.id ? 'Tú' : counterpart.nameEs}</strong> empieza</li>
        </ul>
      </header>

      <section className={s.briefing} aria-label="Cómo jugar este rol" lang={language.htmlLang}>
        {role.briefing.map((line) => <p key={line}>{inline(line)}</p>)}
      </section>

      <section className={s.piece} aria-labelledby="your-brief-title">
        <p className={s.pieceLabel}>Tu información</p>
        <h2 className={s.sectionTitle} id="your-brief-title">Lo que sabes y lo que necesitas</h2>
        <div className={s.proseGrid} lang={language.htmlLang}>
          {role.prose.map((block) => (
            <article className={s.panel} key={block.label}>
              <div className={s.panelHeading}><h3>{block.label}</h3></div>
              {block.text ? <p className={s.para}>{inline(block.text)}</p> : null}
              {block.items ? <ul className={s.list}>{block.items.map((item) => <li key={item}>{inline(item)}</li>)}</ul> : null}
            </article>
          ))}
        </div>
      </section>

      <section className={s.piece} aria-labelledby="facts-title">
        <p className={s.pieceLabel}>Notas, no frases</p>
        <div className={s.panel}>
          <div className={s.panelHeading}><h2 id="facts-title">Datos duros</h2></div>
          {role.factsNote ? <p className={s.para} lang={language.htmlLang}>{inline(role.factsNote)}</p> : null}
          <div className={s.tableWrap} lang={language.htmlLang}>
            <table className={s.table}>
              <tbody>
                {role.facts.map((fact) => (
                  <tr key={`${fact.label}-${fact.value}`}>
                    <td className={s.tableLabel}>{inline(fact.label)}</td>
                    <td>{inline(fact.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={s.piece} aria-labelledby="vocab-title">
        <p className={s.pieceLabel}>Palabras para esta situación</p>
        <div className={s.panel}>
          <div className={s.panelHeading}><h2 id="vocab-title">Vocabulario</h2><span>{role.vocab.length} palabras</span></div>
          <div className={s.tableWrap} lang={language.htmlLang}>
            <table className={s.table}>
              <thead><tr><th>{language.targetLabels.word}</th><th>{language.targetLabels.meaning}</th><th>{language.targetLabels.here}</th></tr></thead>
              <tbody>
                {role.vocab.map((item) => (
                  <tr key={item.word}>
                    <td><strong>{inline(item.word)}</strong>{item.reading ? <span> · {item.reading}</span> : null}</td>
                    <td>{inline(item.whatItIs)}</td>
                    <td>{inline(item.here)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={s.piece} aria-labelledby="toolkit-link-title">
        <p className={s.pieceLabel}>Ayuda común</p>
        <div className={s.toolkitCallout}>
          <div>
            <h2 id="toolkit-link-title">Caja de herramientas {level.label}</h2>
            <p lang={language.htmlLang}>{inline(role.toolkit)}</p>
          </div>
          <Link className="wlp-btn wlp-btn--secondary" href={roleplayToolkitPath(scenario.language, scenario.level)} target="_blank">
            Abrir en otra pestaña ↗
          </Link>
        </div>
      </section>

      <section className={s.piece} aria-labelledby="exponents-title">
        <p className={s.pieceLabel}>Solo para tu rol</p>
        <div className={s.panel}>
          <div className={s.panelHeading}><h2 id="exponents-title">Expresiones útiles</h2><span>{role.exponents.length} opciones</span></div>
          <div className={s.tableWrap} lang={language.htmlLang}>
            <table className={s.table}>
              <thead><tr><th>{language.targetLabels.purpose}</th><th>{language.targetLabels.form}</th><th>{language.targetLabels.effect}</th></tr></thead>
              <tbody>
                {role.exponents.map((item) => (
                  <tr key={`${item.purpose}-${item.form}`}>
                    <td>{inline(item.purpose)}</td>
                    <td>{inline(item.form)}{item.reading ? <span> · {item.reading}</span> : null}</td>
                    <td>{inline(item.effect)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {scenario.card.toRole !== role.id ? (
        <div className={s.noCard}><strong>No tienes carta.</strong> Sigue conversando cuando la otra persona abra la suya.</div>
      ) : null}

      <section className={s.piece} aria-labelledby="closing-title">
        <p className={s.pieceLabel}>Cuándo terminar</p>
        <div className={s.panel} lang={language.htmlLang}>
          <div className={s.panelHeading}><h2 id="closing-title">{language.targetLabels.closing}</h2></div>
          <Blocks blocks={scenario.closing} />
          <div className={s.success}><strong>{language.targetLabels.success}:</strong> {inline(role.success)}</div>
        </div>
      </section>

      <section className={s.piece} aria-labelledby="debrief-title">
        <p className={s.pieceLabel}>Después de hablar</p>
        <div className={s.panel}>
          <div className={s.panelHeading}><h2 id="debrief-title">Conversen sobre cómo les fue</h2></div>
          <ol className={s.listOrdered}>{scenario.debrief.map((question) => <li key={question}>{inline(question)}</li>)}</ol>
        </div>
      </section>

      <section className={s.piece} aria-labelledby="grammar-links-title">
        <p className={s.pieceLabel}>Para repasar</p>
        <h2 className={s.sectionTitle} id="grammar-links-title">Gramática que sostiene este escenario</h2>
        <ul className={s.refList}>
          {scenario.grammarReferences.map((ref) => (
            <li className={s.ref} key={`${ref.level}-${ref.slug}`}>
              <Link href={`/practica/${scenario.language}/${ref.level}/gramatica/${ref.slug}`}>{ref.title}</Link>
              <span className={s.refLevel}>{ref.level}</span>
              <p>{inline(ref.rationale)}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className={s.roleSwitch}>
        <p><strong>¿Abriste la ficha equivocada?</strong> Cambia al rol {counterpart.id.toUpperCase()} sin leer más.</p>
        <Link className="wlp-btn wlp-btn--secondary" href={roleplayRolePath(scenario, counterpart.id)}>
          Ir al rol {counterpart.id.toUpperCase()}
        </Link>
      </div>

      <RoleplayLimits />
      <div className="wlp-next">
        <Link href={roleplayScenarioPath(scenario)}>← Volver a repartir roles</Link>
        <Link href={accompaniedPath}>Elegir otro escenario</Link>
        <Link href={soloSpeakingPath(scenario.language, scenario.level)}>Practicar a solas</Link>
      </div>
    </>
  )
}

export function RoleplayRolePage({ scenario, role }: { scenario: RoleplayScenario; role: RoleplayRole }) {
  const language = ROLEPLAY_LANGUAGES[scenario.language]
  const accompaniedPath = accompaniedSpeakingPath(scenario.language, scenario.level)
  const content = <RoleContent role={role} scenario={scenario} />
  return (
    <div className="wlp-page" style={roleplayStyle()}>
      <div className="wlp-shell">
        <nav className="wlp-breadcrumb" aria-label="Migas de pan">
          <Link href={accompaniedPath}>Habla acompañada</Link>
          <span aria-hidden="true">/</span>
          <Link href={roleplayScenarioPath(scenario)}>{scenario.title}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Rol {role.id.toUpperCase()}</span>
        </nav>

        {scenario.card.toRole === role.id ? (
          <RoleplayCardScreen
            afterTurn={scenario.card.afterTurn}
            intro={<div lang={language.htmlLang}><Blocks blocks={scenario.card.openWhen} /></div>}
            card={<div lang={language.htmlLang}><Blocks blocks={scenario.card.blocks} /></div>}
          >
            {content}
          </RoleplayCardScreen>
        ) : content}
      </div>
    </div>
  )
}

export function RoleplayToolkitPage({ set }: { set: RoleplaySet }) {
  const language = ROLEPLAY_LANGUAGES[set.language]
  const level = ROLEPLAY_LEVELS[set.level]
  const basePath = speakingPath(set.language, set.level)
  const accompaniedPath = accompaniedSpeakingPath(set.language, set.level)
  return (
    <div className="wlp-page" style={roleplayStyle()}>
      <div className="wlp-shell">
        <nav className="wlp-breadcrumb" aria-label="Migas de pan">
          <Link href={basePath}>Expresión oral</Link>
          <span aria-hidden="true">/</span>
          <Link href={accompaniedPath}>Habla acompañada</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Herramientas</span>
        </nav>

        <header className="wlp-hero wlp-hero--compact">
          <p className="wlp-eyebrow">Support · {language.label} {level.label}</p>
          <h1>Caja de herramientas</h1>
          <p className="wlp-hero-lead">{set.toolkit.intro}</p>
        </header>

        <div className={s.toolkitBlocks} lang={language.htmlLang}>
          {set.toolkit.blocks.map((block) => (
            <section className={s.toolkitBlock} key={block.number} aria-labelledby={`toolkit-${block.number}`}>
              <div className={s.toolkitTitle}>
                <span className={s.toolkitNumber}>{String(block.number).padStart(2, '0')}</span>
                <h2 id={`toolkit-${block.number}`}>{block.title}</h2>
                {block.tag ? <span className={s.toolkitTag}>{block.tag}</span> : null}
              </div>
              {block.note ? <p className={s.para}>{inline(block.note)}</p> : null}
              <div className={s.tableWrap}>
                <table className={s.table}>
                  <thead><tr><th>{language.targetLabels.form}</th><th>{language.targetLabels.when}</th><th>{language.targetLabels.register}</th></tr></thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={`${row.form}-${row.when}`}>
                        <td>
                          <code className={s.code}>{row.form}</code>
                          {row.reading ? <span> · {row.reading}</span> : null}
                          {row.tag ? <span className={s.rowTag}>{row.tag}</span> : null}
                        </td>
                        <td>{row.when}</td>
                        <td>{row.register ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {block.tail ? <p className={s.toolkitTail}>{inline(block.tail)}</p> : null}
            </section>
          ))}
        </div>

        <div className="wlp-next">
          <Link href={accompaniedPath}>← Elegir un escenario</Link>
          <Link href={basePath}>Cambiar de modo</Link>
          <Link href={`/practica/${set.language}/${set.level}/gramatica`}>Repasar gramática {level.label}</Link>
        </div>
      </div>
    </div>
  )
}
