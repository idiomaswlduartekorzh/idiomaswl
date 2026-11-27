'use client';

import { useMemo, useState } from 'react';
import styles from './ChessMoveHarness.module.css';

type Scenario = 'guides' | 'wrong' | 'correct' | 'check';

type SquareName =
  | 'a1' | 'b1' | 'c1' | 'd1' | 'e1' | 'f1' | 'g1' | 'h1'
  | 'a2' | 'b2' | 'c2' | 'd2' | 'e2' | 'f2' | 'g2' | 'h2'
  | 'a3' | 'b3' | 'c3' | 'd3' | 'e3' | 'f3' | 'g3' | 'h3'
  | 'a4' | 'b4' | 'c4' | 'd4' | 'e4' | 'f4' | 'g4' | 'h4'
  | 'a5' | 'b5' | 'c5' | 'd5' | 'e5' | 'f5' | 'g5' | 'h5'
  | 'a6' | 'b6' | 'c6' | 'd6' | 'e6' | 'f6' | 'g6' | 'h6'
  | 'a7' | 'b7' | 'c7' | 'd7' | 'e7' | 'f7' | 'g7' | 'h7'
  | 'a8' | 'b8' | 'c8' | 'd8' | 'e8' | 'f8' | 'g8' | 'h8';

type Piece = {
  glyph: string;
  label: string;
  color: 'light' | 'dark';
};

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

const pieces: Partial<Record<SquareName, Piece>> = {
  a1: { glyph: '♖', label: 'torre blanca', color: 'light' },
  e1: { glyph: '♔', label: 'rey blanco', color: 'light' },
  e2: { glyph: '♙', label: 'peón blanco', color: 'light' },
  g1: { glyph: '♘', label: 'caballo blanco', color: 'light' },
  a7: { glyph: '♟', label: 'peón negro', color: 'dark' },
  e8: { glyph: '♚', label: 'rey negro', color: 'dark' },
  h8: { glyph: '♜', label: 'torre negra', color: 'dark' },
};

const guidesByPiece: Partial<Record<SquareName, SquareName[]>> = {
  e2: ['e3', 'e4'],
  g1: ['e2', 'f3', 'h3'],
  a1: ['a2', 'a3', 'a4', 'b1', 'c1'],
};

const scenarioCopy: Record<Scenario, { label: string; title: string; prompt: string }> = {
  guides: {
    label: 'Movimientos',
    title: 'Elige una pieza y mira sus opciones',
    prompt: 'Toca una pieza blanca para ver las casillas sugeridas.',
  },
  wrong: {
    label: 'Intenta de nuevo',
    title: 'Prueba otra casilla',
    prompt: 'Selecciona el peón y toca d4 para ver cómo el tablero te avisa que pruebes de nuevo.',
  },
  correct: {
    label: 'Buena jugada',
    title: 'Prueba una jugada correcta',
    prompt: 'Selecciona el peón y toca e4 para ver la confirmación.',
  },
  check: {
    label: 'Jaque',
    title: 'Así se señala un jaque',
    prompt: 'El círculo amarillo muestra cómo se avisa que un rey está en jaque.',
  },
};

function squareName(fileIndex: number, rank: number) {
  return `${files[fileIndex]}${rank}` as SquareName;
}

export default function ChessMoveHarness() {
  const [scenario, setScenario] = useState<Scenario>('guides');
  const [selected, setSelected] = useState<SquareName | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'wrong' | 'correct'>('idle');
  const [showCenters, setShowCenters] = useState(true);

  const guides = useMemo(() => (selected ? guidesByPiece[selected] ?? [] : []), [selected]);
  const activeCopy = scenarioCopy[scenario];

  function reset() {
    setSelected(null);
    setFeedback('idle');
  }

  function selectScenario(nextScenario: Scenario) {
    setScenario(nextScenario);
    reset();
  }

  function chooseSquare(square: SquareName) {
    const piece = pieces[square];
    if (piece?.color === 'light' && guidesByPiece[square]) {
      setSelected(square);
      setFeedback('idle');
      return;
    }

    if (!selected || !guidesByPiece[selected]) return;

    if (scenario === 'wrong' && square === 'd4') {
      setFeedback('wrong');
      return;
    }

    if ((scenario === 'correct' || scenario === 'guides') && guides.includes(square)) {
      setFeedback('correct');
      return;
    }

    if (scenario === 'wrong' && guides.includes(square)) {
      setFeedback('correct');
    }
  }

  function boardClassName() {
    return [
      styles.board,
      feedback === 'wrong' ? styles.boardWrong : '',
      feedback === 'correct' ? styles.boardCorrect : '',
    ].filter(Boolean).join(' ');
  }

  return (
    <section id="practica" className={styles.harness} aria-labelledby="chess-harness-title" data-testid="chess-move-harness">
      <div className={styles.harnessHeader}>
        <div>
          <p className={styles.eyebrow}>Demostración del tablero</p>
          <h2 id="chess-harness-title">Prueba el tablero de ajedrez</h2>
          <p className={styles.intro}>Explora los movimientos sugeridos y mira cómo responde el tablero a tus jugadas.</p>
        </div>
        <div className={styles.headerActions}>
          <a className={styles.practiceButton} href="/kids/ingles-ajedrez/practica">Empezar la práctica en inglés</a>
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>Listo para explorar</span>
          </div>
        </div>
      </div>

      <div className={styles.scenarioTabs} role="tablist" aria-label="Escenarios de la demostración">
        {(Object.keys(scenarioCopy) as Scenario[]).map((key) => (
          <button
            className={`${styles.scenarioTab} ${scenario === key ? styles.scenarioTabActive : ''}`}
            key={key}
            type="button"
            role="tab"
            aria-selected={scenario === key}
            onClick={() => selectScenario(key)}
          >
            {scenarioCopy[key].label}
          </button>
        ))}
      </div>

      <div className={styles.harnessGrid}>
        <div id="chess-practice-board" className={styles.boardPanel}>
          <div className={styles.boardToolbar}>
            <div>
              <span className={styles.kicker}>Escenario</span>
              <h3>{activeCopy.title}</h3>
            </div>
            <button className={styles.resetButton} type="button" onClick={reset}>Reiniciar</button>
          </div>

          <div className={styles.boardShell}>
            <div className={styles.rankLabels} aria-hidden="true">
              {ranks.map((rank) => <span key={rank}>{rank}</span>)}
            </div>
            <div className={boardClassName()} role="grid" aria-label="Tablero interactivo de ajedrez">
              {ranks.flatMap((rank, row) => files.map((file, column) => {
                const square = squareName(column, rank);
                const piece = pieces[square];
                const isLightSquare = (row + column) % 2 === 0;
                const isSelected = selected === square;
                const isGuide = guides.includes(square);
                const isCheck = scenario === 'check' && square === 'e8';
                const isWrongTarget = feedback === 'wrong' && square === 'd4';
                const isCorrectTarget = feedback === 'correct' && square === 'e4';

                return (
                  <button
                    className={[
                      styles.square,
                      isLightSquare ? styles.squareLight : styles.squareDark,
                      isSelected ? styles.squareSelected : '',
                      isCheck ? styles.squareCheck : '',
                      isWrongTarget ? styles.squareWrong : '',
                      isCorrectTarget ? styles.squareCorrect : '',
                    ].filter(Boolean).join(' ')}
                    key={square}
                    type="button"
                    role="gridcell"
                    aria-label={`${square}${piece ? `, ${piece.label}` : ''}${isGuide ? ', movimiento sugerido' : ''}`}
                    onClick={() => chooseSquare(square)}
                  >
                    {showCenters && isGuide && <span className={styles.centerCrosshair} aria-hidden="true" />}
                    {isGuide && <span className={styles.moveDot} aria-hidden="true" />}
                    {piece && <span className={`${styles.piece} ${piece.color === 'dark' ? styles.pieceDark : ''}`} aria-hidden="true">{piece.glyph}</span>}
                    {isCheck && <span className={styles.checkHalo} aria-hidden="true" />}
                    {isWrongTarget && <span className={styles.targetIcon} aria-hidden="true">×</span>}
                    {isCorrectTarget && <span className={styles.targetIcon} aria-hidden="true">✓</span>}
                  </button>
                );
              }))}
            </div>
            <div className={styles.fileLabels} aria-hidden="true">
              {files.map((file) => <span key={file}>{file}</span>)}
            </div>
          </div>

          <div className={styles.boardLegend}>
            <span><i className={styles.legendDot} /> Casilla sugerida</span>
            <span><i className={styles.legendRing} /> Aviso de jaque</span>
          </div>
        </div>

        <aside className={styles.coachPanel} aria-live="polite">
          <div className={styles.coachIcon} aria-hidden="true">♞</div>
          <span className={styles.kicker}>Ayuda del tablero</span>
          <h3>{feedback === 'wrong' ? '¡Casi!' : feedback === 'correct' ? '¡Buena jugada!' : 'Tu turno'}</h3>
          <p>
            {feedback === 'wrong'
              ? 'Prueba una de las casillas marcadas.'
              : feedback === 'correct'
                ? 'Encontraste una de las casillas marcadas.'
                : activeCopy.prompt}
          </p>
          <div className={styles.controls}>
            <label className={styles.toggleRow}>
              <input type="checkbox" checked={showCenters} onChange={(event) => setShowCenters(event.target.checked)} />
              <span>Marcar el centro de las casillas</span>
            </label>
            <div className={styles.centerProof}>
              <span className={styles.proofIcon}>◎</span>
              <span><strong>Guías centradas</strong><br />Cada punto aparece en el centro de su casilla.</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
