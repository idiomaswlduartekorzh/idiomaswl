import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { getGoetheA2Set } from '@/data/mocks/goethe-a2-sets';
import styles from './preview.module.css';

export const metadata: Metadata = {
  title: 'Goethe A2 · Golden Set completo',
  description: 'Vista editorial interna del simulacro de referencia Goethe A2 de WeLearn.',
  robots: { index: false, follow: false, nocache: true },
};

const letters = ['A', 'B', 'C'] as const;

function AnswerKey({ answer, rationale }: { answer: string; rationale: string }) {
  return (
    <details className={styles.answerKey}>
      <summary>Ver clave editorial</summary>
      <p><strong>Respuesta: {answer}</strong> · {rationale}</p>
    </details>
  );
}

function Transcript({ turns, label = 'Guion para producir el audio' }: {
  turns: readonly { speaker: string; text: string }[];
  label?: string;
}) {
  return (
    <details className={styles.transcript}>
      <summary>{label}</summary>
      <div className={styles.turns}>
        {turns.map((turn, index) => (
          <p key={`${turn.speaker}-${index}`}><strong>{turn.speaker}:</strong> {turn.text}</p>
        ))}
      </div>
    </details>
  );
}

function ChoiceList({ options }: { options: readonly string[] }) {
  return (
    <ol className={styles.choices}>
      {options.map((option, index) => (
        <li key={option}><span>{letters[index]}</span>{option}</li>
      ))}
    </ol>
  );
}

function SectionHeader({ skill, part, title, meta }: {
  skill: string;
  part: number;
  title: string;
  meta: string;
}) {
  return (
    <header className={styles.sectionHeader}>
      <div>
        <p className={styles.kicker}>{skill} · Teil {part}</p>
        <h2>{title}</h2>
      </div>
      <span>{meta}</span>
    </header>
  );
}

function CandidateMasthead({ skill, sheet = 'KANDIDATENBLATT' }: { skill: string; sheet?: string }) {
  return (
    <div className={styles.candidateMasthead}>
      <div><strong>WELEARN · DEUTSCH A2</strong><strong>{skill}</strong></div>
      <div><span>ÜBUNGSSATZ</span><span>{sheet}</span></div>
    </div>
  );
}

function CandidatePage({ skill, children, sheet, className = '' }: {
  skill: string;
  children: ReactNode;
  sheet?: string;
  className?: string;
}) {
  return (
    <section className={`${styles.candidatePage} ${className}`}>
      <CandidateMasthead skill={skill} sheet={sheet} />
      {children}
      <footer><span>WELEARN ORIGINAL</span><span>DEUTSCH A2</span></footer>
    </section>
  );
}

export default async function GoetheA2PreviewPage({ searchParams }: {
  searchParams: Promise<{ set?: string }>;
}) {
  const requested = Number((await searchParams).set ?? '1');
  const selectedSet = Number.isInteger(requested) && requested >= 1 && requested <= 10 ? requested : 1;
  const golden = getGoetheA2Set(selectedSet);
  const [reading1, reading2, reading3, reading4] = golden.reading.parts;
  const [listening1, listening2, listening3, listening4] = golden.listening.parts;

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{selectedSet === 1 ? 'Golden set aprobado' : `Mock ${selectedSet} · revisión integral`}</p>
          <h1>{golden.title}</h1>
          <p className={styles.lede}>
            {selectedSet === 1 ? 'El simulacro maestro de referencia para la colección A2 de WeLearn.' : 'Un simulacro original construido con el mismo contrato editorial del mock maestro.'}
            {' '}La arquitectura, el contenido, las imágenes y el scoring están listos; el audio sigue bloqueado.
          </p>
          <div className={styles.badges}>
            <span className={styles.ready}>Contenido listo</span>
            <span className={styles.ready}>Visuales listos</span>
            <span className={styles.ready}>Scoring listo</span>
            <span className={styles.blocked}>Audio pendiente</span>
          </div>
        </div>
        <aside className={styles.snapshot} aria-label="Resumen del simulacro">
          <div><strong>13</strong><span>partes</span></div>
          <div><strong>45</strong><span>respuestas/tareas</span></div>
          <div><strong>105</strong><span>minutos aprox.</span></div>
          <div><strong>100</strong><span>puntos</span></div>
        </aside>
      </header>

      <nav className={styles.setNav} aria-label="Seleccionar mock Goethe A2">
        <span>COLECCIÓN A2</span>
        <div>
          {Array.from({ length: 10 }, (_, index) => index + 1).map(set => (
            <a key={set} href={`?set=${set}`} aria-current={set === selectedSet ? 'page' : undefined}>
              {set === 1 ? 'Maestro 1' : `Mock ${set}`}
            </a>
          ))}
        </div>
      </nav>

      <nav className={styles.jumpNav} aria-label="Secciones del simulacro">
        <a href="#fidelidad">Auditoría</a>
        <a href="#lesen">Lesen · 4 Teile</a>
        <a href="#hoeren">Hören · 4 Teile</a>
        <a href="#schreiben">Schreiben · 2 Teile</a>
        <a href="#sprechen">Sprechen · 3 Teile</a>
        <a href="#scoring">Scoring</a>
      </nav>

      <section className={styles.fidelity} id="fidelidad">
        <div className={styles.fidelityHeading}>
          <div>
            <p className={styles.eyebrow}>Contrato maestro · cotejo Modellsatz + Übungssatz 01</p>
            <h2>100% de la estructura verificable</h2>
          </div>
          <span>13/13 Teile conformes</span>
        </div>
        <div className={styles.fidelityGrid}>
          <section><strong>Construcción</strong><b>PASS</b><p>4 Lesen · 4 Hören · 2 Schreiben · 3 Sprechen.</p></section>
          <section><strong>Respuestas</strong><b>PASS</b><p>20 Lesen · 20 Hören · 2 textos · 3 tareas orales.</p></section>
          <section><strong>Ejemplos 0</strong><b>PASS</b><p>Lesen 1, 2 y 4; Hören 2 y 4. Nunca puntúan.</p></section>
          <section><strong>Longitud y nivel</strong><b>PASS</b><p>Textos y guiones dentro de las bandas de ambos cuadernillos.</p></section>
          <section><strong>Visuales funcionales</strong><b>PASS</b><p>9 imágenes, trípticos A/B/C y agendas complementarias.</p></section>
          <section><strong>Audio final</strong><b className={styles.pending}>PENDIENTE</b><p>Guion y secuencia listos; falta producir y escuchar la pista maestra.</p></section>
        </div>
        <p className={styles.fidelityNote}>La equivalencia auditada cubre formato, tarea, cantidad, longitud, complejidad, tiempos y puntuación. Temas de este set: {golden.levelProfile.lexicalDomains.join(' · ')}. La fidelidad sonora no se declara hasta generar y revisar el audio.</p>
      </section>

      <section className={styles.moduleIntro} id="lesen">
        <p>Prüfungsteil 01</p>
        <div><h2>Lesen</h2><span>30 Minuten · 20 Aufgaben · 25 Punkte</span></div>
      </section>

      {[reading1, reading2, reading3].map(part => (
        <article className={styles.examSection} id={`lesen-${part.part}`} key={part.part}>
          <SectionHeader skill="Lesen" part={part.part} title={part.title} meta="5 Aufgaben · A/B/C" />
          <div className={styles.booklet}>
            {part.part !== 2 && (
              <CandidatePage skill="Lesen">
                <p className={styles.paperPart}>Teil {part.part}</p>
                <div className={styles.document}>
                  <p className={styles.documentLabel}>{part.family === 'correspondence' ? 'E-Mail' : 'Artikel'}</p>
                  <h3>{part.title}</h3>
                  <div className={styles.preText}>{part.text}</div>
                </div>
              </CandidatePage>
            )}
            <CandidatePage skill="Lesen">
              <h3 className={styles.paperPart}>Teil {part.part}</h3>
              <p className={styles.paperInstructions}>{part.part === 2
                ? 'Sie lesen eine Informationstafel. Lesen Sie die Aufgaben 6 bis 10 und den Text. Wählen Sie die richtige Lösung a, b oder c.'
                : part.part === 3
                  ? 'Sie lesen eine E-Mail. Wählen Sie für die Aufgaben 11 bis 15 die richtige Lösung a, b oder c.'
                  : 'Sie lesen einen Artikel. Wählen Sie für die Aufgaben 1 bis 5 die richtige Lösung a, b oder c.'}</p>
              <div className={styles.paperQuestions}>
              {'example' in part && (
                <section className={`${styles.question} ${styles.workedExample}`}>
                  <p className={styles.exampleTag}>Beispiel · 0</p>
                  <h3>{part.example.prompt}</h3>
                  <ChoiceList options={part.example.options} />
                  <p className={styles.exampleSolution}>Lösung: {letters[part.example.answer]}</p>
                </section>
              )}
              {part.items.map((item, index) => (
                <section className={styles.question} key={item.id}>
                  <h3><span>{(part.part - 1) * 5 + index + 1}</span>{item.prompt}</h3>
                  <ChoiceList options={item.options} />
                  <AnswerKey answer={letters[item.answer]} rationale={item.rationale} />
                </section>
              ))}
              </div>
            </CandidatePage>
            {part.part === 2 && (
              <CandidatePage skill="Lesen">
                <p className={styles.paperPart}>Teil 2</p>
                <div className={styles.document}>
                  <p className={styles.documentLabel}>Informationstafel</p>
                  <h3>{part.title}</h3>
                  <div className={styles.preText}>{part.text}</div>
                </div>
              </CandidatePage>
            )}
          </div>
        </article>
      ))}

      <article className={styles.examSection} id="lesen-4">
        <SectionHeader skill="Lesen" part={4} title={reading4.title} meta="5 Zuordnungen · A–F/X" />
        <div className={styles.booklet}>
          <CandidatePage skill="Lesen">
            <h3 className={styles.paperPart}>Teil 4</h3>
            <p className={styles.paperInstructions}>Sechs Personen suchen ein Angebot. Lesen Sie die Aufgaben 16 bis 20 und die Anzeigen a bis f. Welche Anzeige passt? Für eine Aufgabe gibt es keine Lösung. Wählen Sie X.</p>
            <div className={styles.profileList}>
              <p className={styles.example}><strong>Beispiel:</strong> {reading4.example.profile} → {reading4.example.answer}</p>
              {reading4.profiles.map(profile => (
                <section key={profile.id}>
                  <p>{profile.text}</p>
                  <AnswerKey answer={profile.answer} rationale={profile.rationale} />
                </section>
              ))}
            </div>
          </CandidatePage>
          <CandidatePage skill="Lesen">
            <p className={styles.paperPart}>Teil 4</p>
            <div className={styles.adGrid}>
              {reading4.adverts.map(ad => (
                <section key={ad.letter}><span>{ad.letter.toLowerCase()}</span><h3>{ad.heading}</h3><p>{ad.text}</p></section>
              ))}
            </div>
          </CandidatePage>
        </div>
      </article>

      <section className={styles.moduleIntro} id="hoeren">
        <p>Prüfungsteil 02</p>
        <div><h2>Hören</h2><span>ca. 30 Minuten · 20 Aufgaben · 25 Punkte</span></div>
      </section>

      <article className={styles.examSection} id="hoeren-1">
        <SectionHeader skill="Hören" part={1} title="Kurze Texte" meta="5 Aufgaben · zweimal hören" />
        <CandidatePage skill="Hören">
          <h3 className={styles.paperPart}>Teil 1</h3>
          <p className={styles.paperInstructions}>Sie hören fünf kurze Texte. Sie hören jeden Text zweimal. Wählen Sie für die Aufgaben 1 bis 5 die richtige Lösung a, b oder c.</p>
          <p className={styles.audioNotice}>Audio pendiente · los guiones definitivos están disponibles para revisión editorial.</p>
          <div className={styles.paperQuestions}>
            {listening1.items.map((item, index) => (
              <section className={styles.question} key={item.id}>
                <h3><span>{index + 1}</span>{item.prompt}</h3>
                <ChoiceList options={item.options} />
                <Transcript turns={item.turns} />
                <AnswerKey answer={letters[item.answer]} rationale={item.rationale} />
              </section>
            ))}
          </div>
        </CandidatePage>
      </article>

      <article className={styles.examSection} id="hoeren-2">
        <SectionHeader skill="Hören" part={2} title="Ein zusammenhängendes Gespräch" meta="5 Zuordnungen · einmal hören" />
        <CandidatePage skill="Hören">
          <h3 className={styles.paperPart}>Teil 2</h3>
          <p className={styles.paperInstructions}>Sie hören ein Gespräch. Sie hören den Text einmal. {listening2.leadQuestion} Ordnen Sie den Aufgaben 6 bis 10 die Bilder a bis i zu.</p>
          <div className={styles.stageTable} role="table" aria-label="Etapas del sábado">
            <div className={styles.stageHeader} role="row"><span>Aufgabe</span><span>Zeit</span><span>Bild</span></div>
            <div className={styles.stageExample} role="row"><strong>Beispiel 0</strong><span>{listening2.example.stageLabel}</span><b>{listening2.example.answer.toLowerCase()}</b></div>
            {listening2.items.map(item => (
              <div role="row" key={item.id}>
                <strong>{item.number}</strong><span>{item.stageLabel}</span><b>□</b>
                <AnswerKey answer={item.answer} rationale={item.rationale} />
              </div>
            ))}
          </div>
          <Image className={styles.heroPlate} src={listening2.visualAsset} alt={listening2.visualAlt} width={1536} height={1024} unoptimized />
          <Transcript turns={listening2.turns} label="Guion completo · una reproducción" />
        </CandidatePage>
      </article>

      <article className={styles.examSection} id="hoeren-3">
        <SectionHeader skill="Hören" part={3} title="Kurze Gespräche" meta="5 Aufgaben · einmal hören" />
        <CandidatePage skill="Hören">
          <h3 className={styles.paperPart}>Teil 3</h3>
          <p className={styles.paperInstructions}>Sie hören fünf kurze Gespräche. Sie hören jeden Text einmal. Wählen Sie für die Aufgaben 11 bis 15 das richtige Bild a, b oder c.</p>
          <div className={styles.visualQuestionStack}>
            {listening3.items.map((item, index) => (
              <section className={styles.visualQuestion} key={item.id}>
                <h3><span>{index + 11}</span>{item.prompt}</h3>
                {item.visualAsset && <Image src={item.visualAsset} alt={item.visualAlt ?? ''} width={2172} height={724} unoptimized />}
                <Transcript turns={item.turns} />
                <AnswerKey answer={letters[item.answer]} rationale={item.rationale} />
              </section>
            ))}
          </div>
        </CandidatePage>
      </article>

      <article className={styles.examSection} id="hoeren-4">
        <SectionHeader skill="Hören" part={4} title="Radiointerview" meta="5 Aussagen · zweimal hören" />
        <CandidatePage skill="Hören">
          <h3 className={styles.paperPart}>Teil 4</h3>
          <p className={styles.paperInstructions}>Sie hören ein Interview. Sie hören den Text zweimal. Sind die Aussagen 16 bis 20 richtig oder falsch? Wählen Sie Ja oder Nein.</p>
          <div className={styles.statementList}>
            <section className={styles.workedExample}>
              <p className={styles.exampleTag}>Beispiel · 0</p>
              <h3>{listening4.example.statement}</h3>
              <p className={styles.binary}>☒ {listening4.example.answer ? 'Ja' : 'Nein'}</p>
            </section>
            {listening4.items.map((item, index) => (
              <section key={item.id}>
                <h3><span>{index + 16}</span>{item.statement}</h3>
                <p className={styles.binary}>□ Ja&nbsp;&nbsp;&nbsp;&nbsp;□ Nein</p>
                <AnswerKey answer={item.answer ? 'Ja' : 'Nein'} rationale={item.rationale} />
              </section>
            ))}
          </div>
          <Transcript turns={listening4.turns} label="Guion completo · dos reproducciones" />
        </CandidatePage>
      </article>

      <section className={styles.moduleIntro} id="schreiben">
        <p>Prüfungsteil 03</p>
        <div><h2>Schreiben</h2><span>30 Minuten · 2 Aufgaben · 25 Punkte</span></div>
      </section>

      <article className={styles.examSection} id="schreiben-aufgaben">
        <SectionHeader skill="Schreiben" part={1} title="Persönliche Nachricht und E-Mail" meta="2 Aufgaben · 30 Minuten" />
        <div className={styles.booklet}>
          <CandidatePage skill="Schreiben">
            {golden.writing.tasks.map(task => (
              <section className={styles.paperWritingTask} id={`schreiben-${task.part}`} key={task.part}>
                <h3 className={styles.paperPart}>Teil {task.part}</h3>
                <p>{task.part === 1 ? 'Sie schreiben eine persönliche Nachricht.' : 'Sie schreiben eine E-Mail.'} Schreiben Sie circa {task.minWords} bis {task.maxWords} Wörter.</p>
                {'addressee' in task && <p className={styles.addressee}>An: {task.addressee}</p>}
                <p>{task.situation}</p>
                <ul>{task.functions.map(value => <li key={value}>{value}</li>)}</ul>
                <p className={styles.allPoints}>Schreiben Sie zu allen drei Punkten.</p>
              </section>
            ))}
          </CandidatePage>
          <CandidatePage skill="Schreiben" sheet="ANTWORTBOGEN">
            {golden.writing.tasks.map(task => (
              <section key={task.part} className={styles.paperAnswer}>
                <h3>Teil {task.part}</h3>
                <div className={styles.writingArea} aria-label={`Espacio para redactar Teil ${task.part}`}><span>Ihre Antwort</span></div>
                <details className={styles.modelAnswer}><summary>Ver modelo editorial</summary><p>{task.modelAnswer}</p></details>
              </section>
            ))}
          </CandidatePage>
        </div>
      </article>

      <section className={styles.moduleIntro} id="sprechen">
        <p>Prüfungsteil 04</p>
        <div><h2>Sprechen</h2><span>ca. 15 Minuten pro Paar · 3 Aufgaben · 25 Punkte</span></div>
      </section>

      <article className={styles.examSection} id="sprechen-1">
        <SectionHeader skill="Sprechen" part={1} title="Informationen zur Person austauschen" meta="Partnerarbeit" />
        <CandidatePage skill="Sprechen">
          <h3 className={styles.paperPart}>Teil 1</h3>
          <p className={styles.paperInstructions}>Sie bekommen vier Karten und stellen mit diesen Karten vier Fragen. Ihre Partnerin oder Ihr Partner antwortet.</p>
          <div className={styles.cardPool}>
            {golden.speaking.tasks[0].cards.map(value => (
              <section key={value}><span>Teil 1 · Kandidatenblatt</span><strong>{value}</strong></section>
            ))}
          </div>
        </CandidatePage>
        <details className={styles.modelAnswer}><summary>Ver ejemplos de preguntas</summary><ul>{golden.speaking.tasks[0].examples.map(value => <li key={value}>{value}</li>)}</ul></details>
      </article>

      <article className={styles.examSection} id="sprechen-2">
        <SectionHeader skill="Sprechen" part={2} title="Von sich erzählen" meta="Monolog mit Nachfragen" />
        <CandidatePage skill="Sprechen">
          <h3 className={styles.paperPart}>Teil 2</h3>
          <p className={styles.paperInstructions}>Sie erzählen etwas über sich und Ihr Leben. Sprechen Sie über das Thema und die vier Punkte.</p>
          <div className={styles.monologueGrid}>
            {(['candidateA', 'candidateB'] as const).map((candidate, index) => {
              const card = golden.speaking.tasks[1][candidate];
              return (
                <section className={styles.promptCard} key={candidate}>
                  <span className={styles.candidateLabel}>Prüfungsteilnehmer/in {index === 0 ? 'A' : 'B'}</span>
                  <div className={styles.promptMap}>
                    <p>{card.prompt}</p>
                    {card.cues.map((value, cueIndex) => <span key={value} data-position={cueIndex}>{value}</span>)}
                  </div>
                </section>
              );
            })}
          </div>
        </CandidatePage>
      </article>

      <article className={styles.examSection} id="sprechen-3">
        <SectionHeader skill="Sprechen" part={3} title="Gemeinsam planen" meta="Aushandeln und einigen" />
        <div className={styles.booklet}>
          <CandidatePage skill="Sprechen">
            <h3 className={styles.paperPart}>Teil 3 · Kandidat/in A</h3>
            <p className={styles.paperInstructions}>{golden.speaking.tasks[2].situation}</p>
            <div className={styles.scheduleGrid}>
              <Image src={golden.speaking.tasks[2].candidateAAsset} alt={golden.speaking.tasks[2].candidateAAlt} width={760} height={840} unoptimized />
            </div>
          </CandidatePage>
          <CandidatePage skill="Sprechen">
            <h3 className={styles.paperPart}>Teil 3 · Kandidat/in B</h3>
            <p className={styles.paperInstructions}>{golden.speaking.tasks[2].situation}</p>
            <div className={styles.scheduleGrid}>
              <Image src={golden.speaking.tasks[2].candidateBAsset} alt={golden.speaking.tasks[2].candidateBAlt} width={760} height={840} unoptimized />
            </div>
          </CandidatePage>
        </div>
        <AnswerKey answer="Acuerdo compartido" rationale={golden.speaking.tasks[2].requiredOutcome} />
      </article>

      <section className={styles.scoring} id="scoring">
        <div className={styles.moduleIntro}>
          <p>Auswertung</p>
          <div><h2>Scoring</h2><span>Reglas congeladas para el pipeline</span></div>
        </div>
        <div className={styles.scoreGrid}>
          <section><strong>Lesen</strong><span>20 × 1,25</span><b>25 Punkte</b></section>
          <section><strong>Hören</strong><span>20 × 1,25</span><b>25 Punkte</b></section>
          <section><strong>Schreiben</strong><span>20 × 1,25</span><b>25 Punkte</b></section>
          <section><strong>Sprechen</strong><span>Rúbrica oral</span><b>25 Punkte</b></section>
        </div>
        <div className={styles.passRule}>
          <strong>Bestehen</strong>
          <p>60/100 en total, con mínimo 45/75 en el bloque escrito y 15/25 en Sprechen.</p>
        </div>
      </section>
    </div>
  );
}
