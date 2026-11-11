import type { CSSProperties } from 'react'
import Link from 'next/link'
import { SKILL_ACCENT } from '@/data/practica/skill-accents'
import {
  ROLEPLAY_LIMITS,
  ROLEPLAY_LANGUAGES,
  ROLEPLAY_LEVELS,
  accompaniedSpeakingPath,
  roleplayRolePath,
  roleplayScenarioPath,
  roleplayToolkitPath,
  soloSpeakingPath,
  speakingPath,
  type RoleplayRole,
  type RoleplayScenario,
  type RoleplaySet,
} from '@/data/practica/habla-acompanado'
import RoleplayJourney from './RoleplayJourney'
import RoleplayRegistryLookup from './RoleplayRegistryLookup'
import ShareRoleLink from './ShareRoleLink'
import { Blocks, inline } from './RoleplayMarkup'
import s from './roleplay.module.css'

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
            Entrena a solas con 20 preguntas de improvisación o abre un juego de rol con otra persona. Los dos
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
              <p>Elige una de 20 preguntas. Cada reto revela seis palabras sorpresa mientras hablas.</p>
              <ul className={s.cardFacts}>
                <li>No necesitas compañero</li>
                <li>Marca tu propio avance</li>
                <li>Practica en cualquier momento</li>
              </ul>
              <strong>Ver las 20 preguntas →</strong>
            </Link>

            <Link className="wlp-card wlp-card--path" href={accompaniedSpeakingPath(set.language, set.level)}>
              <span className="wlp-eyebrow wlp-eyebrow--card">En pareja</span>
              <h3>Centro de juegos de rol</h3>
              <p>{set.scenarios.length} situaciones reales. Elige un papel, conoce tu situación, lee las instrucciones y empieza a conversar.</p>
              <ul className={s.cardFacts}>
                <li>Dos personas y dos pantallas</li>
                <li>{level.minutes} minutos por escenario</li>
                <li>Decisiones sin guion preparado</li>
              </ul>
              <strong>Entrar al centro →</strong>
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
          <p className="wlp-eyebrow">Speaking · {language.label} {level.label}</p>
          <h1>Centro de juegos de rol</h1>
          <p className="wlp-hero-lead">
            Elige una situación y un papel. Primero conocerás tu rol, luego verás cómo jugar
            y después tendrás tus recursos a mano para hablar en {language.labelLower}.
          </p>
          <ol className={s.steps}>
            <li><strong>1.</strong> Elijan un caso y repartan los dos papeles.</li>
            <li><strong>2.</strong> Cada quien lee su papel y sus instrucciones en su propia pantalla.</li>
            <li><strong>3.</strong> Empiecen a hablar y consulten sus recursos cuando hagan falta.</li>
          </ol>
        </header>

        <section className="wlp-section" aria-labelledby="scenarios-title">
          <div className="wlp-section-heading">
            <h2 id="scenarios-title">{set.scenarios.length} casos para jugar</h2>
            <p>Elijan una situación. Cada persona conocerá su papel antes de entrar al juego.</p>
          </div>

          <div className={s.scenarioGrid}>
            {set.scenarios.map((scenario) => (
              <Link className={`wlp-card wlp-card--path ${s.scenarioCard}`} href={roleplayScenarioPath(scenario)} key={scenario.id}>
                <div className={s.scenarioNumber} aria-hidden="true">{String(scenario.sequence).padStart(2, '0')}</div>
                <span className="wlp-eyebrow wlp-eyebrow--card" lang={language.htmlLang}>{scenario.titleTarget}</span>
                <h3>{scenario.title}</h3>
                <p>{scenario.settingEs}</p>
                {scenario.id === 'ingles-a2-the-blender-was-a-gift' ? <span className={s.interactiveBadge}>Incluye consulta de pedido</span> : null}
                <ul className={s.meta} aria-label="Datos del ejercicio">
                  <li className={s.metaItem}><strong>{scenario.minutes}</strong> min</li>
                  <li className={s.metaItem}><strong>{scenario.turnsPerRole}</strong> turnos por rol</li>
                  <li className={s.metaItem}><strong>2</strong> personas</li>
                </ul>
                <strong>Elegir papeles →</strong>
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
      <p className={s.roleChoiceHint}>{scenario.initiator === role.id ? 'Tú abrirás la conversación.' : 'Responderás cuando la otra persona empiece.'} Primero leerás tu situación y después las instrucciones.</p>
      <div className={s.roleActions}>
        <Link className="wlp-btn" href={href}>Elegir este papel →</Link>
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
            <h2 id="choose-role-title">¿Quién serás en esta escena?</h2>
            <p>
              Cada persona elige un papel y lee su propia situación. Después recibirá las
              instrucciones para empezar sin ver los datos de la otra persona.
            </p>
          </div>
          <div className={s.roleGrid}>
            {scenario.roles.map((role) => <RoleChoice key={role.id} role={role} scenario={scenario} />)}
          </div>
        </section>
      </div>
    </div>
  )
}

function RoleProse({ blocks, lang }: { blocks: RoleplayRole['prose']; lang: string }) {
  return (
    <div className={s.journeyProse} lang={lang}>
      {blocks.map((block, index) => (
        <section className={s.journeyProseBlock} key={`${index}-${block.label}`}>
          <h2>{block.label}</h2>
          {block.text ? <p>{inline(block.text)}</p> : null}
          {block.items ? <ul>{block.items.map((item) => <li key={item}>{inline(item)}</li>)}</ul> : null}
        </section>
      ))}
    </div>
  )
}

function RoleInstructions({ role, lang, introCount }: { role: RoleplayRole; lang: string; introCount: number }) {
  return (
    <>
      <div className={s.journeyBriefing} lang={lang}>
        {role.briefing.map((line) => <p key={line}>{inline(line)}</p>)}
      </div>
      <RoleProse blocks={role.prose.slice(introCount)} lang={lang} />
    </>
  )
}

function RoleCaseFile({ scenario, role }: { scenario: RoleplayScenario; role: RoleplayRole }) {
  const lang = ROLEPLAY_LANGUAGES[scenario.language].htmlLang
  return (
    <>
      <p className={s.pieceLabel}>Tu información</p>
      <h2 className={s.journeyResourceTitle}>Datos y documentos</h2>
      {scenario.id === 'ingles-a2-the-blender-was-a-gift' && role.id === 'a' ? (
        <div className={s.journeyNote}>
          <strong>Tu sistema: registro de regalos</strong>
          <p>Pide el nombre y los últimos cuatro dígitos del teléfono de quien compró. Cuando llegue el turno global 5, abre la consulta desde el botón de arriba.</p>
        </div>
      ) : null}
      {scenario.id === 'ingles-a2-the-blender-was-a-gift' && role.id === 'b' ? (
        <div className={s.journeyNote}>
          <strong>Tu carpeta: prueba de compra</strong>
          <p>No tienes recibo. El contacto de quien compró el regalo está en tus datos de abajo; puedes dar el nombre y los últimos cuatro dígitos cuando te los pidan.</p>
        </div>
      ) : null}
      {role.factsNote ? <p className={s.journeyFactNote} lang={lang}>{inline(role.factsNote)}</p> : null}
      <div className={s.tableWrap} lang={lang}>
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
    </>
  )
}

function RoleWords({ scenario, role }: { scenario: RoleplayScenario; role: RoleplayRole }) {
  const language = ROLEPLAY_LANGUAGES[scenario.language]
  const level = ROLEPLAY_LEVELS[scenario.level]
  return (
    <>
      <p className={s.pieceLabel}>Ayuda durante la conversación</p>
      <h2 className={s.journeyResourceTitle}>Palabras y expresiones</h2>
      <section className={s.journeySubsection} aria-labelledby="vocab-title">
        <h3 id="vocab-title">Vocabulario <span>{role.vocab.length} palabras</span></h3>
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
      </section>
      <section className={s.journeySubsection} aria-labelledby="exponents-title">
        <h3 id="exponents-title">Expresiones para tu rol <span>{role.exponents.length} opciones</span></h3>
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
      </section>
      <section className={s.journeySubsection} aria-labelledby="toolkit-link-title">
        <h3 id="toolkit-link-title">Caja de herramientas {level.label}</h3>
        <p lang={language.htmlLang}>{inline(role.toolkit)}</p>
        <Link href={roleplayToolkitPath(scenario.language, scenario.level)} target="_blank" rel="noopener noreferrer">Abrir ayuda común ↗</Link>
      </section>
    </>
  )
}

function RoleClosing({ scenario, role }: { scenario: RoleplayScenario; role: RoleplayRole }) {
  const language = ROLEPLAY_LANGUAGES[scenario.language]
  return (
    <>
      <p className={s.pieceLabel}>Terminar el juego</p>
      <h2 className={s.journeyResourceTitle}>Cómo cerrar</h2>
      <div className={s.journeyClosing} lang={language.htmlLang}>
        <Blocks blocks={scenario.closing} />
        <p><strong>{language.targetLabels.success}:</strong> {inline(role.success)}</p>
      </div>
      <section className={s.journeySubsection} aria-labelledby="debrief-title">
        <h3 id="debrief-title">Después de hablar</h3>
        <ol className={s.listOrdered}>{scenario.debrief.map((question) => <li key={question}>{inline(question)}</li>)}</ol>
      </section>
      <section className={s.journeySubsection} aria-labelledby="grammar-links-title">
        <h3 id="grammar-links-title">Para repasar</h3>
        <ul className={s.journeyReferences}>
          {scenario.grammarReferences.map((ref) => (
            <li key={`${ref.level}-${ref.slug}`}>
              <Link href={`/practica/${scenario.language}/${ref.level}/gramatica/${ref.slug}`}>{ref.title}</Link>
              <p>{inline(ref.rationale)}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export function RoleplayRolePage({ scenario, role }: { scenario: RoleplayScenario; role: RoleplayRole }) {
  const language = ROLEPLAY_LANGUAGES[scenario.language]
  const accompaniedPath = accompaniedSpeakingPath(scenario.language, scenario.level)
  // One A1 role has a short pre-reading block before its situation and objective.
  const introCount = role.prose[0]?.label === 'Before you speak' ? 3 : 2
  const toolSummary = scenario.id === 'ingles-a2-the-blender-was-a-gift'
    ? role.id === 'a'
      ? 'Tendrás los datos de la tienda y un registro de regalos simulado. Pide el nombre y los últimos cuatro dígitos del teléfono de quien compró; podrás consultar el registro desde el turno global 5. También tendrás palabras para hablar y el criterio de cierre.'
      : 'No tienes recibo. Tus datos incluyen el contacto de quien compró el regalo para compartirlo cuando te lo pidan. También tendrás palabras para hablar y el criterio de cierre.'
    : 'Tendrás tus datos y documentos, palabras para hablar y el criterio de cierre. Abre cada recurso solo cuando lo necesites.'
  const card = scenario.card.toRole === role.id ? {
    afterTurn: scenario.card.afterTurn,
    buttonLabel: scenario.id === 'ingles-a2-the-blender-was-a-gift' ? 'Abrir registro de regalos' : 'Abrir novedad',
    intro: <div lang={language.htmlLang}><Blocks blocks={scenario.card.openWhen} /></div>,
    content: scenario.id === 'ingles-a2-the-blender-was-a-gift' ? (
      <RoleplayRegistryLookup result={<div lang={language.htmlLang}><Blocks blocks={scenario.card.blocks} /></div>} />
    ) : <div lang={language.htmlLang}><Blocks blocks={scenario.card.blocks} /></div>,
  } : undefined

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
        <RoleplayJourney
          scenarioTitle={scenario.title}
          scenarioPath={roleplayScenarioPath(scenario)}
          setting={scenario.settingEs}
          roleId={role.id.toUpperCase()}
          roleName={role.nameEs.charAt(0).toUpperCase() + role.nameEs.slice(1)}
          headline={role.headline}
          language={language.labelLower}
          languageHtml={language.htmlLang}
          starts={scenario.initiator === role.id}
          minutes={scenario.minutes}
          turns={scenario.turnsPerRole}
          introduction={<RoleProse blocks={role.prose.slice(0, introCount)} lang={language.htmlLang} />}
          instructions={<RoleInstructions role={role} lang={language.htmlLang} introCount={introCount} />}
          caseFile={<RoleCaseFile scenario={scenario} role={role} />}
          words={<RoleWords scenario={scenario} role={role} />}
          closing={<RoleClosing scenario={scenario} role={role} />}
          toolSummary={toolSummary}
          card={card}
        />
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
