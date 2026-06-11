'use client';

import { useState, useMemo } from 'react';
import type { ConnectorsActivity } from '@/data/activities/ielts-connectors';

type Phase = 'ordering' | 'connecting' | 'results';
type SlotMap = Record<number, string | null>;
type ConnMap = Record<number, string | null>;
type SentenceResult = 'correct' | 'wrong';
type ConnResult = 'correct' | 'ok-empty' | 'wrong' | 'missing' | 'distractor';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function emptySlots(n: number) {
  return Object.fromEntries(Array.from({ length: n }, (_, i) => [i + 1, null])) as SlotMap;
}

export default function ConnectorsGame({ activity }: { activity: ConnectorsActivity }) {
  const [shuffled] = useState(() => shuffle(activity.sentences));
  const [slots, setSlots] = useState<SlotMap>(emptySlots(7));
  const [connMap, setConnMap] = useState<ConnMap>(emptySlots(6));
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('ordering');
  const [showTips, setShowTips] = useState(false);

  const placedIds = useMemo(() => new Set(Object.values(slots).filter(Boolean) as string[]), [slots]);
  const bankSentences = useMemo(() => shuffled.filter(s => !placedIds.has(s.id)), [shuffled, placedIds]);
  const allPlaced = useMemo(() => Object.values(slots).every(v => v !== null), [slots]);

  function getSentence(id: string | null) {
    return id ? activity.sentences.find(s => s.id === id) ?? null : null;
  }

  function handleBankClick(id: string) {
    if (phase !== 'ordering') return;
    setSelected(prev => (prev === id ? null : id));
  }

  function handleSlotClick(pos: number) {
    if (phase !== 'ordering') return;
    if (selected) {
      const newSlots = { ...slots };
      const oldPos = (Object.entries(slots).find(([, v]) => v === selected)?.[0]);
      if (oldPos) newSlots[parseInt(oldPos)] = slots[pos];
      newSlots[pos] = selected;
      setSlots(newSlots);
      setSelected(null);
    } else if (slots[pos]) {
      setSlots(prev => ({ ...prev, [pos]: null }));
    }
  }

  function handleConnClick(afterPos: number, connId: string) {
    if (phase !== 'connecting') return;
    setConnMap(prev => ({ ...prev, [afterPos]: prev[afterPos] === connId ? null : connId }));
  }

  function handleNoneClick(afterPos: number) {
    if (phase !== 'connecting') return;
    setConnMap(prev => ({ ...prev, [afterPos]: null }));
  }

  function reset() {
    setSlots(emptySlots(7));
    setConnMap(emptySlots(6));
    setSelected(null);
    setPhase('ordering');
    setShowTips(false);
  }

  const scores = useMemo(() => {
    if (phase !== 'results') return null;
    let sentenceScore = 0;
    let connectorScore = 0;
    const sentenceResults: Record<number, SentenceResult> = {};
    const connectorResults: Record<number, ConnResult> = {};

    for (let pos = 1; pos <= 7; pos++) {
      const sentence = getSentence(slots[pos]);
      if (sentence?.correctPosition === pos) {
        sentenceScore++;
        sentenceResults[pos] = 'correct';
      } else {
        sentenceResults[pos] = 'wrong';
      }
    }

    for (const slot of activity.connectorSlots) {
      const chosen = connMap[slot.afterPosition];
      const item = chosen ? activity.connectorBank.find(c => c.id === chosen) : null;
      if (!chosen) {
        if (slot.noneOk) { connectorScore++; connectorResults[slot.afterPosition] = 'ok-empty'; }
        else connectorResults[slot.afterPosition] = 'missing';
      } else if (item?.isDistractor) {
        connectorResults[slot.afterPosition] = 'distractor';
      } else if (slot.acceptedConnectorIds.includes(chosen)) {
        connectorScore++;
        connectorResults[slot.afterPosition] = 'correct';
      } else {
        connectorResults[slot.afterPosition] = 'wrong';
      }
    }

    return { sentenceScore, connectorScore, sentenceResults, connectorResults };
  }, [phase, slots, connMap, activity]);

  const totalScore = scores ? scores.sentenceScore + scores.connectorScore : 0;
  const bandLabel = totalScore >= 11 ? 'Band 7.0+' : totalScore >= 8 ? 'Band 6.0–6.5' : totalScore >= 5 ? 'Band 5.0–5.5' : 'Sigue practicando';

  return (
    <div className="wt1">
      {/* Bar chart */}
      <div className="wt1-chart">
        <h3 className="wt1-chart__title">{activity.chartTitle}</h3>
        <div className="wt1-bars">
          {activity.chartCategories.map((cat, i) => (
            <div key={cat} className="wt1-bars__col">
              <div className="wt1-bars__wrap">
                <span className="wt1-bars__val">{activity.chartValues[i]}{activity.chartUnit}</span>
                <div className="wt1-bars__bar" style={{ height: `${activity.chartValues[i]}%` }} />
              </div>
              <span className="wt1-bars__label">{cat}</span>
            </div>
          ))}
        </div>
        <p className="wt1-chart__note">Fuente: Office for National Statistics, UK</p>
      </div>

      {/* Task prompt */}
      <div className="wt1-prompt">
        <span className="wt1-prompt__tag">Tarea IELTS</span>
        <p>{activity.taskPrompt}</p>
      </div>

      {/* Progress indicator */}
      <div className="wt1-progress">
        {(['ordering', 'connecting', 'results'] as Phase[]).map((p, i) => (
          <div key={p} className={`wt1-progress__step ${phase === p ? 'wt1-progress__step--active' : ''} ${
            (phase === 'connecting' && p === 'ordering') || phase === 'results' ? 'wt1-progress__step--done' : ''
          }`}>
            <span className="wt1-progress__num">{i + 1}</span>
            <span>{p === 'ordering' ? 'Ordenar' : p === 'connecting' ? 'Conectar' : 'Resultado'}</span>
          </div>
        ))}
      </div>

      {/* ── PHASE 1: ORDERING ─────────────────────────────────── */}
      {phase === 'ordering' && (
        <div className="wt1-phase">
          <div className="wt1-phase__header">
            <h2 className="wt1-phase__title">Paso 1: Ordena las oraciones</h2>
            <p className="wt1-phase__sub">Toca una oración para seleccionarla (se resalta en azul), luego toca la posición donde debe ir.</p>
          </div>
          <div className="wt1-ordering">
            {/* Bank */}
            <div className="wt1-bank">
              <p className="wt1-bank__heading">Banco de oraciones</p>
              {bankSentences.map(s => (
                <div
                  key={s.id}
                  className={`wt1-card ${selected === s.id ? 'wt1-card--selected' : ''}`}
                  onClick={() => handleBankClick(s.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && handleBankClick(s.id)}
                >
                  <span className="wt1-card__id">{s.id.toUpperCase()}</span>
                  <p className="wt1-card__text">{s.body}</p>
                </div>
              ))}
              {bankSentences.length === 0 && (
                <p className="wt1-bank__empty">✓ Todas las oraciones han sido colocadas</p>
              )}
            </div>

            {/* Slots */}
            <div className="wt1-slots">
              <p className="wt1-bank__heading">Tu respuesta</p>
              {[1,2,3,4,5,6,7].map(pos => {
                const placed = getSentence(slots[pos]);
                const isTarget = !!selected && !slots[pos];
                return (
                  <div
                    key={pos}
                    className={`wt1-slot ${placed ? 'wt1-slot--filled' : 'wt1-slot--empty'} ${isTarget ? 'wt1-slot--target' : ''}`}
                    onClick={() => handleSlotClick(pos)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && handleSlotClick(pos)}
                  >
                    <span className="wt1-slot__num">{pos}</span>
                    {placed ? (
                      <div className="wt1-slot__content">
                        <span className="wt1-slot__badge">{placed.id.toUpperCase()}</span>
                        <p className="wt1-slot__text">{placed.body}</p>
                        <span className="wt1-slot__remove" title="Devolver al banco">×</span>
                      </div>
                    ) : (
                      <span className="wt1-slot__ph">
                        {isTarget ? '↓ Colocar aquí' : `Posición ${pos}`}
                      </span>
                    )}
                  </div>
                );
              })}
              {allPlaced && (
                <button className="btn wt1-cta" onClick={() => setPhase('connecting')}>
                  Continuar: Agregar conectores →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── PHASE 2: CONNECTING ───────────────────────────────── */}
      {phase === 'connecting' && (
        <div className="wt1-phase">
          <div className="wt1-phase__header">
            <h2 className="wt1-phase__title">Paso 2: Agrega los conectores</h2>
            <p className="wt1-phase__sub">
              Para cada espacio entre oraciones, elige el conector apropiado o marca "Sin conector".
              <strong> Cuidado: hay conectores trampa</strong> que no aplican en Writing Task 1.
            </p>
          </div>

          <div className="wt1-builder">
            {[1,2,3,4,5,6,7].map(pos => {
              const sentence = getSentence(slots[pos]);
              const chosenConnId = connMap[pos];
              const chosenConn = chosenConnId ? activity.connectorBank.find(c => c.id === chosenConnId) : null;
              return (
                <div key={pos}>
                  <div className="wt1-builder__sentence">
                    <span className="wt1-builder__num">{pos}</span>
                    <p className="wt1-builder__text">
                      {pos === 1 && sentence ? sentence.body : (
                        <>
                          {chosenConn && <strong className="wt1-builder__chosen-conn">{chosenConn.text} </strong>}
                          {sentence?.body}
                        </>
                      )}
                    </p>
                  </div>
                  {pos < 7 && (
                    <div className="wt1-conn-picker">
                      <span className="wt1-conn-picker__label">Conector entre {pos} y {pos + 1}:</span>
                      <div className="wt1-conn-picker__pills">
                        {activity.connectorBank.map(c => (
                          <button
                            key={c.id}
                            className={`wt1-pill ${connMap[pos] === c.id ? 'wt1-pill--active' : ''}`}
                            onClick={() => handleConnClick(pos, c.id)}
                          >
                            {c.text}
                          </button>
                        ))}
                        <button
                          className={`wt1-pill wt1-pill--none ${!connMap[pos] ? 'wt1-pill--active' : ''}`}
                          onClick={() => handleNoneClick(pos)}
                        >
                          Sin conector
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="wt1-builder__actions">
              <button className="btn wt1-cta" onClick={() => setPhase('results')}>
                Verificar respuesta →
              </button>
              <button className="wt1-back" onClick={() => setPhase('ordering')}>
                ← Volver a ordenar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PHASE 3: RESULTS ──────────────────────────────────── */}
      {phase === 'results' && scores && (
        <div className="wt1-phase">
          <div className="wt1-results">
            {/* Score header */}
            <div className="wt1-results__header">
              <div className="wt1-scorebox">
                <span className="wt1-scorebox__n">{scores.sentenceScore}/7</span>
                <span className="wt1-scorebox__l">Oraciones<br/>en orden</span>
              </div>
              <div className="wt1-scorebox">
                <span className="wt1-scorebox__n">{scores.connectorScore}/6</span>
                <span className="wt1-scorebox__l">Conectores<br/>correctos</span>
              </div>
              <div className={`wt1-scorebox wt1-scorebox--band ${totalScore >= 11 ? 'wt1-scorebox--good' : totalScore >= 8 ? 'wt1-scorebox--ok' : 'wt1-scorebox--low'}`}>
                <span className="wt1-scorebox__n">{totalScore}/13</span>
                <span className="wt1-scorebox__l">{bandLabel}</span>
              </div>
            </div>

            {/* Sentence-by-sentence feedback */}
            <h3 className="wt1-results__section-title">Detalle por oración</h3>
            {[1,2,3,4,5,6,7].map(pos => {
              const sentence = getSentence(slots[pos]);
              const sResult = scores.sentenceResults[pos];
              const cResult = pos < 7 ? scores.connectorResults[pos] : null;
              const chosenConnId = connMap[pos];
              const chosenConn = chosenConnId ? activity.connectorBank.find(c => c.id === chosenConnId) : null;
              const connSlot = activity.connectorSlots.find(cs => cs.afterPosition === pos);
              const correctSentence = activity.sentences.find(s => s.correctPosition === pos);

              return (
                <div key={pos} className={`wt1-result ${sResult === 'correct' ? 'wt1-result--ok' : 'wt1-result--bad'}`}>
                  <div className="wt1-result__row">
                    <span className="wt1-result__pos">{pos}</span>
                    <span className="wt1-result__icon">{sResult === 'correct' ? '✅' : '❌'}</span>
                    <div className="wt1-result__body">
                      <p className="wt1-result__text">{sentence?.body}</p>
                      {sResult === 'wrong' && (
                        <p className="wt1-result__fix">
                          Esta oración va en la posición {activity.sentences.find(s => s.id === slots[pos])?.correctPosition}.
                          Aquí debía ir: <em>"{correctSentence?.body.slice(0, 70)}…"</em>
                        </p>
                      )}
                    </div>
                  </div>

                  {pos < 7 && cResult && connSlot && (
                    <div className={`wt1-conn-result wt1-conn-result--${cResult}`}>
                      <span className="wt1-conn-result__icon">
                        {cResult === 'correct' || cResult === 'ok-empty' ? '✅' : cResult === 'missing' ? '⚠️' : '❌'}
                      </span>
                      <div className="wt1-conn-result__detail">
                        <span>
                          Conector elegido:{' '}
                          <strong>{chosenConn ? `"${chosenConn.text}"` : 'ninguno'}</strong>
                        </span>
                        {cResult === 'distractor' && chosenConn?.distractorReason && (
                          <p className="wt1-conn-result__reason">{chosenConn.distractorReason}</p>
                        )}
                        {cResult === 'missing' && (
                          <p className="wt1-conn-result__reason">
                            Falta un conector aquí. Opciones válidas:{' '}
                            {connSlot.acceptedConnectorIds.map(id => `"${activity.connectorBank.find(c => c.id === id)?.text}"`).join(' / ')}
                          </p>
                        )}
                        {cResult === 'wrong' && (
                          <p className="wt1-conn-result__reason">
                            Conector no apropiado para esta transición. Opciones válidas:{' '}
                            {connSlot.acceptedConnectorIds.map(id => `"${activity.connectorBank.find(c => c.id === id)?.text}"`).join(' / ')}
                          </p>
                        )}
                        {(cResult === 'correct' || cResult === 'ok-empty') && cResult === 'ok-empty' && connSlot.noneReason && (
                          <p className="wt1-conn-result__reason">{connSlot.noneReason}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Tips */}
            <div className="wt1-tips-box">
              <button className="wt1-tips-toggle" onClick={() => setShowTips(p => !p)}>
                {showTips ? '▲ Ocultar tips IELTS' : '▼ Ver tips IELTS Band 6–7'}
              </button>
              {showTips && (
                <ul className="wt1-tips-list">
                  {activity.tips.map((tip, i) => (
                    <li key={i}><span>💡</span>{tip}</li>
                  ))}
                </ul>
              )}
            </div>

            <button className="btn wt1-cta" onClick={reset}>
              Reintentar →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
