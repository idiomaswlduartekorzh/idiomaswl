import { Chess } from './vendor/chess.js/chess.js';
import { Chessboard, COLOR, BORDER_TYPE, INPUT_EVENT_TYPE } from './vendor/cm-chessboard/src/Chessboard.js';
import { OPENING_FAMILIES, OPENING_LINES } from './openings.js';

const configs = {
  mateIn1: { label: 'Mate in 1', kind: 'mate', description: 'Find the move that leaves the king no escape.' },
  mateIn2: { label: 'Mate in 2', kind: 'mate', description: 'Calculate your first move and the opponent’s defense.' },
  mateIn3: { label: 'Mate in 3', kind: 'mate', description: 'Build a complete checkmate net.' },
  mateIn4: { label: 'Mate in 4', kind: 'mate', description: 'Stay accurate through a longer sequence.' },
  mateIn5: { label: 'Mate in 5', kind: 'mate', description: 'Calculate five moves without losing your plan.' },
  fork: { label: 'Fork', kind: 'tactic', description: 'Attack two targets with one move.' },
  intermezzo: { label: 'In-between move', kind: 'tactic', description: 'Find a stronger move before recapturing.' },
  pin: { label: 'Pin', kind: 'tactic', description: 'Exploit a piece that cannot move freely.' },
  deflection: { label: 'Deflection', kind: 'tactic', description: 'Pull a defender away from its task.' },
  attraction: { label: 'Attraction', kind: 'tactic', description: 'Draw an opposing piece to a vulnerable square.' },
  clearance: { label: 'Clearance', kind: 'tactic', description: 'Clear a line for another piece.' },
  discoveredAttack: { label: 'Discovered attack', kind: 'tactic', description: 'Reveal an attack from a piece behind another.' },
  interference: { label: 'Interference', kind: 'tactic', description: 'Break the defenders’ coordination.' },
  sacrifice: { label: 'Sacrifice', kind: 'tactic', description: 'Give up material for a concrete advantage.' },
  endgame: { label: 'Endgame technique', kind: 'endgame', description: 'Turn a material advantage into a win.' },
};
const routeStarts = { mate: 'mateIn1', tactic: 'fork', endgame: 'endgame' };
const fallbackRows = {
  mateIn2: [{ PuzzleId: '00sHx', FEN: 'q3k1nr/1pp1nQpp/3p4/1P2p3/4P3/B1PP1b2/B5PP/5K2 b k - 0 17', Moves: 'e8d7 a2e6 d7d8 f7f8', Rating: 1760, Themes: 'mate mateIn2 middlegame short' }],
};
const STORAGE_KEY = 'matecraft-progress-v4';
const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const defaults = { elo: 1200, solved: 0, streak: 0, xp: 0, mistakes: 0, perRoute: {}, completedIds: [], openingCompleted: [], openingMistakes: 0, lastDate: '', lastRoute: 'mateIn1', lastMode: 'mate', lastFamily: 'italian', lastOpening: 'italian-quiet' };
const $ = id => document.getElementById(id);
const feedback = $('feedback');
const board = new Chessboard($('board'), {
  position: START_FEN, orientation: COLOR.white, responsive: true,
  assetsUrl: './vendor/cm-chessboard/assets/',
  style: { cssClass: 'green', showCoordinates: true, borderType: BORDER_TYPE.frame, animationDuration: 220 },
});

function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      ...defaults, ...saved,
      perRoute: { ...defaults.perRoute, ...(saved.perRoute || {}) },
      completedIds: Array.isArray(saved.completedIds) ? saved.completedIds : [],
      openingCompleted: Array.isArray(saved.openingCompleted) ? saved.openingCompleted : [],
    };
  } catch { return { ...defaults, perRoute: {}, completedIds: [], openingCompleted: [] }; }
}
let progress = readProgress();
let mode = ['mate', 'tactic', 'opening', 'endgame'].includes(progress.lastMode) ? progress.lastMode : 'mate';
let family = OPENING_FAMILIES[progress.lastFamily] ? progress.lastFamily : 'italian';
let activePool = configs[progress.lastRoute] ? progress.lastRoute : 'mateIn1';
let current = null;
let currentOpening = null;
let game = null;
let step = 0;
let openingPly = 0;
let activeIndex = 0;
let busy = true;
let soundOn = false;
let sessionNonce = 0;
let pendingTimer = null;
let pieceFallbackTimer = null;
const pools = {};

function saveProgress() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch { /* Practice still works if the browser blocks storage. */ }
  updateStats();
}
function localDate() {
  const date = new Date();
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}
function updateStats() {
  const attempts = progress.solved + progress.mistakes;
  $('precisionValue').textContent = (attempts ? Math.round(progress.solved / attempts * 100) : 0) + '%';
  $('precisionDelta').textContent = attempts ? progress.mistakes + ' mistakes' : 'Ready to start';
  $('solvedValue').textContent = progress.solved;
  $('solvedDelta').textContent = progress.completedIds.length + ' saved';
  $('streakValue').textContent = progress.streak;
  $('eloValue').textContent = progress.elo;
  $('xpValue').textContent = progress.xp + ' XP';
  const next = Math.min(100, (progress.solved % 10) * 10 || (progress.solved ? 100 : 0));
  $('progressBar').style.width = next + '%';
  $('progressTitle').textContent = progress.solved ? 'Level ' + (Math.floor(progress.solved / 10) + 1) + ': keep going.' : 'Your next challenge grows with you.';
  $('progressText').textContent = 'Target Elo ' + progress.elo + ' · difficulty ' + Math.round(adaptiveTarget(activePool)) + '. Progress saved on this device.';
  document.querySelectorAll('.elo-choice').forEach(button => button.classList.toggle('active', Number(button.dataset.elo) === Number(progress.elo)));
  updateOpeningStatus();
}
function toast(message) {
  const element = $('toast');
  element.textContent = message;
  element.classList.add('show');
  clearTimeout(window.matecraftToastTimer);
  window.matecraftToastTimer = setTimeout(() => element.classList.remove('show'), 2800);
}
function setFeedback(message, kind = '') {
  feedback.textContent = message;
  feedback.className = 'feedback' + (kind ? ' ' + kind : '');
}
function parseUci(code) {
  return { from: code.slice(0, 2), to: code.slice(2, 4), promotion: code[4] || undefined };
}
function uci(move) {
  return move.from + move.to + (move.promotion || '');
}
function normalize(row, key) {
  const rawFen = row.FEN || row.fen;
  const rawMoves = String(row.Moves || row.moves || '').trim().split(/\s+/);
  if (!rawFen || rawMoves.length < 2) return null;
  try {
    const before = new Chess(rawFen);
    before.move(parseUci(rawMoves[0]));
    const displayFen = before.fen();
    const verify = new Chess(displayFen);
    for (const code of rawMoves.slice(1)) verify.move(parseUci(code));
    return { id: row.PuzzleId || row.id, fen: displayFen, solution: rawMoves.slice(1), rating: Number(row.Rating || row.rating || 1200), themes: row.Themes || row.themes || '', category: key, hint: hintFor(key, rawMoves[1]), completed: false };
  } catch { return null; }
}
function hintFor(key, first) {
  const square = first ? first.slice(0, 2) : '';
  if (key.startsWith('mate')) return 'Look for the king’s escape squares first. The combination starts on ' + square + '.';
  const hints = {
    fork: 'Look for one move that creates two separate threats.', intermezzo: 'Before recapturing, look for a stronger check, capture, or threat.',
    pin: 'Look at the valuable piece behind the defender.', deflection: 'Find the piece guarding the critical square.',
    attraction: 'Draw an opposing piece to a square where your next move works.', clearance: 'One of your pieces is blocking a useful line.',
    discoveredAttack: 'Move the front piece and notice the line it opens.', interference: 'Cut the connection between two defenders.',
    sacrifice: 'Give up material with a purpose: open a line or remove a defender.',
  };
  return hints[key] || 'Restrict the opposing king and improve your pieces first.';
}
async function fetchPool(key) {
  try {
    const response = await fetch('data/' + key + '.json');
    if (!response.ok) throw new Error('Could not load ' + key);
    const rows = await response.json();
    pools[key] = rows.map(row => normalize(row, key)).filter(Boolean);
  } catch { pools[key] = []; }
  if (!pools[key].length) pools[key] = (fallbackRows[key] || []).map(row => normalize(row, key)).filter(Boolean);
  return pools[key].length;
}
function adaptiveTarget(key) {
  return Number(progress.elo) + Math.min(500, (progress.perRoute[key] || 0) * 12);
}
function chooseAdaptive(key) {
  const pool = pools[key] || [];
  if (!pool.length) return null;
  const target = adaptiveTarget(key);
  let candidates = pool.filter(item => item.rating >= Math.max(600, target - 500) && item.rating <= target + 280);
  if (!candidates.length) candidates = pool;
  candidates = [...candidates].sort((a, b) => Math.abs(a.rating - target) - Math.abs(b.rating - target));
  return candidates[((progress.perRoute[key] || 0) + sessionNonce) % candidates.length];
}
function clearTimer() {
  if (pendingTimer !== null) clearTimeout(pendingTimer);
  pendingTimer = null;
}
function clearMoveGuides() {
  $('boardOverlay').replaceChildren();
  $('boardFrame').classList.remove('hinting');
}
function showMoveGuides(square) {
  clearMoveGuides();
  if (!game || !square) return;
  const orientation = board.getOrientation();
  const selected = document.createElement('span');
  const selectedFile = square.charCodeAt(0) - 97;
  const selectedRank = Number(square[1]);
  selected.className = 'selected-square';
  selected.style.left = (orientation === COLOR.white ? selectedFile : 7 - selectedFile) * 12.5 + '%';
  selected.style.top = (orientation === COLOR.white ? 8 - selectedRank : selectedRank - 1) * 12.5 + '%';
  $('boardOverlay').appendChild(selected);
  for (const move of game.moves({ square, verbose: true })) {
    const file = move.to.charCodeAt(0) - 97;
    const rank = Number(move.to[1]);
    const column = orientation === COLOR.white ? file : 7 - file;
    const row = orientation === COLOR.white ? 8 - rank : rank - 1;
    const marker = document.createElement('span');
    marker.className = 'move-guide' + (move.captured || move.flags?.includes('e') ? ' capture' : '');
    marker.style.left = column * 12.5 + '%';
    marker.style.top = row * 12.5 + '%';
    $('boardOverlay').appendChild(marker);
  }
  $('boardFrame').classList.add('hinting');
}
const fallbackGlyphs = { K:'♔', Q:'♕', R:'♖', B:'♗', N:'♘', P:'♙', k:'♚', q:'♛', r:'♜', b:'♝', n:'♞', p:'♟' };
function spriteReady() {
  const piece = document.querySelector('#board svg use.piece');
  if (!piece) return false;
  try {
    const box = piece.getBBox();
    return box.width > 0 && box.height > 0;
  } catch { return false; }
}
function renderPieceFallback(fen) {
  const host = $('boardPiecesFallback');
  host.replaceChildren();
  const orientation = board.getOrientation();
  const rows = fen.split(' ')[0].split('/');
  rows.forEach((row, rowIndex) => {
    let file = 0;
    for (const symbol of row) {
      if (/\d/.test(symbol)) { file += Number(symbol); continue; }
      const piece = document.createElement('span');
      piece.className = 'unicode-piece ' + (symbol === symbol.toUpperCase() ? 'white' : 'black');
      piece.textContent = fallbackGlyphs[symbol] || '';
      piece.style.left = (orientation === COLOR.white ? file : 7 - file) * 12.5 + '%';
      piece.style.top = (orientation === COLOR.white ? rowIndex : 7 - rowIndex) * 12.5 + '%';
      host.appendChild(piece);
      file++;
    }
  });
  host.classList.add('visible');
}
function reconcilePieceLayer(fen) {
  clearTimeout(pieceFallbackTimer);
  if (spriteReady()) {
    $('boardPiecesFallback').classList.remove('visible');
    $('boardPiecesFallback').replaceChildren();
    return;
  }
  renderPieceFallback(fen);
  pieceFallbackTimer = setTimeout(() => {
    if (spriteReady()) {
      $('boardPiecesFallback').classList.remove('visible');
      $('boardPiecesFallback').replaceChildren();
    }
  }, 700);
}
function flashBoard(kind) {
  const frame = $('boardFrame');
  frame.classList.remove('correct', 'wrong');
  void frame.offsetWidth;
  frame.classList.add(kind);
  setTimeout(() => frame.classList.remove(kind), 650);
}
function setInput() {
  board.disableMoveInput();
  const canMove = game && !busy && (mode === 'opening' ? currentOpening : current);
  if (canMove) board.enableMoveInput(onMove, game.turn() === 'w' ? COLOR.white : COLOR.black);
  const select = $('moveSelect');
  select.replaceChildren();
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = canMove ? 'Choose a legal move' : 'Wait for your turn';
  select.appendChild(placeholder);
  if (canMove) {
    for (const move of game.moves({ verbose: true })) {
      const option = document.createElement('option');
      option.value = uci(move);
      option.textContent = move.san + ' · ' + move.from + ' to ' + move.to;
      select.appendChild(option);
    }
  }
  select.disabled = !canMove;
  $('playMoveBtn').disabled = !canMove;
}
function renderPuzzleLine() {
  const line = $('moveLine');
  line.replaceChildren();
  const length = Math.min(current.solution.length, 12);
  for (let index = 0; index < length; index++) {
    const chip = document.createElement('span');
    chip.className = 'move-chip' + (index === step ? ' current' : '');
    chip.textContent = index < step ? '✓' : '?';
    line.appendChild(chip);
  }
}
function renderPuzzle() {
  if (!current) return;
  const cfg = configs[current.category];
  const player = game.turn() === 'w' ? 'White' : 'Black';
  $('puzzleEyebrow').textContent = cfg.label + ' · puzzle ' + (activeIndex + 1) + ' of ' + pools[activePool].length;
  $('puzzleTitle').textContent = cfg.kind === 'mate' ? 'Find ' + cfg.label.toLowerCase() : cfg.kind === 'tactic' ? 'Find the idea: ' + cfg.label : 'Convert the advantage';
  $('puzzleDescription').textContent = cfg.description;
  $('difficultyTag').textContent = 'ELO ' + current.rating;
  $('lessonTitle').textContent = cfg.kind === 'mate' ? 'How do you complete the checkmate net?' : cfg.kind === 'tactic' ? 'Which tactic changes the position?' : 'What is the endgame plan?';
  $('lessonDescription').textContent = current.themes ? 'Position themes: ' + current.themes.replace(/ /g, ' · ') + '.' : 'Solve the position using the full rules of chess.';
  $('turnText').textContent = 'Your turn · ' + player;
  $('turnHint').textContent = 'The opponent replies automatically after your correct move.';
  $('nextBtn').textContent = 'Next puzzle';
  board.setOrientation(player === 'White' ? COLOR.white : COLOR.black);
  board.setPosition(current.fen, false);
  reconcilePieceLayer(current.fen);
  setFeedback('Move a piece on the board or choose a legal move.');
  renderPuzzleLine();
  setInput();
  updateStats();
  renderRouteList();
}
function loadPuzzle(key, index = 0, adaptive = false) {
  clearTimer();
  clearMoveGuides();
  activePool = key;
  progress.lastRoute = key;
  progress.lastMode = mode;
  saveProgress();
  const pool = pools[key] || [];
  if (!pool.length) {
    current = null;
    busy = true;
    setInput();
    setFeedback('These puzzles are still loading. Try another category in a moment.');
    $('poolSummary').textContent = 'Loading ' + configs[key].label + ' puzzles…';
    return;
  }
  const selected = adaptive ? chooseAdaptive(key) : pool[index % pool.length];
  activeIndex = pool.indexOf(selected);
  current = { ...selected, completed: false };
  game = new Chess(current.fen);
  step = 0;
  busy = false;
  $('poolSummary').textContent = pool.length + ' puzzles ready · ' + configs[key].label + ' · difficulty ' + Math.round(adaptiveTarget(key));
  renderPuzzle();
}
function recordPuzzleCompletion() {
  const key = current.category + ':' + current.id;
  if (progress.completedIds.includes(key)) return;
  progress.completedIds.push(key);
  progress.solved++;
  progress.perRoute[current.category] = (progress.perRoute[current.category] || 0) + 1;
  progress.xp += current.category.startsWith('mate') ? 180 : 140;
  const date = localDate();
  if (progress.lastDate !== date) {
    progress.streak += 1;
    progress.lastDate = date;
  }
  saveProgress();
}
function finishPuzzle() {
  if (current.completed) return;
  current.completed = true;
  busy = true;
  recordPuzzleCompletion();
  flashBoard('correct');
  setFeedback(game.isCheckmate() ? 'Checkmate! You closed every escape square.' : 'Correct! You found the main line.', 'ok');
  renderPuzzleLine();
  setInput();
  toast(configs[current.category].label + ' solved');
}
function autoPuzzleReply() {
  if (step >= current.solution.length) { finishPuzzle(); return; }
  busy = true;
  setInput();
  pendingTimer = setTimeout(() => {
    pendingTimer = null;
    try {
      game.move(parseUci(current.solution[step]));
      step++;
      board.setPosition(game.fen(), true);
      reconcilePieceLayer(game.fen());
      if (step >= current.solution.length) finishPuzzle();
      else {
        busy = false;
        setFeedback('The opponent replied. Calculate again from the new position.', 'ok');
        renderPuzzleLine();
        setInput();
      }
    } catch {
      busy = false;
      setFeedback('This line could not be completed. Try the next puzzle.', 'bad');
      setInput();
    }
  }, 520);
}
function playPuzzleMove(from, to, promotion = 'q') {
  let move;
  try { move = game.move({ from, to, promotion }); } catch { move = null; }
  if (!move) {
    progress.mistakes++;
    saveProgress();
    flashBoard('wrong');
    setFeedback('That move is not legal in this position.', 'bad');
    return false;
  }
  if (uci(move) !== current.solution[step]) {
    game.undo();
    progress.mistakes++;
    saveProgress();
    flashBoard('wrong');
    setFeedback('That move is legal, but it misses this puzzle’s main idea. Try another move.', 'bad');
    return false;
  }
  step++;
  board.setPosition(game.fen(), true);
  reconcilePieceLayer(game.fen());
  playTone();
  if (game.isCheckmate() || step >= current.solution.length) finishPuzzle();
  else {
    flashBoard('correct');
    setFeedback('Good. Now anticipate the opponent’s reply…', 'ok');
    renderPuzzleLine();
    autoPuzzleReply();
  }
  return true;
}
function validateOpeningLines() {
  return OPENING_LINES.filter(line => {
    try {
      const check = new Chess();
      if (!line.moves.length || !OPENING_FAMILIES[line.family]) return false;
      for (const san of line.moves) check.move(san);
      return check.turn() !== OPENING_FAMILIES[line.family].side;
    } catch { return false; }
  });
}
const openingLines = validateOpeningLines();
function linesForFamily() { return openingLines.filter(line => line.family === family); }
function updateOpeningStatus() {
  const status = $('openingStatus');
  if (!status) return;
  const count = linesForFamily().filter(line => progress.openingCompleted.includes(line.id)).length;
  status.textContent = count + ' of ' + linesForFamily().length + ' variations practiced · progress on this device';
}
function renderOpeningList() {
  const container = $('openingList');
  const picker = $('openingPicker');
  container.replaceChildren();
  picker.replaceChildren();
  for (const line of linesForFamily()) {
    const option = document.createElement('option');
    option.value = line.id;
    option.textContent = line.trigger + ' · ' + line.name;
    picker.appendChild(option);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'opening-button' + (currentOpening && line.id === currentOpening.id ? ' active' : '');
    button.dataset.opening = line.id;
    button.setAttribute('aria-pressed', currentOpening && line.id === currentOpening.id ? 'true' : 'false');
    const strong = document.createElement('strong');
    strong.textContent = line.name + (progress.openingCompleted.includes(line.id) ? ' ✓' : '');
    const small = document.createElement('small');
    small.textContent = line.trigger + ' · play ' + line.reply;
    button.append(strong, small);
    button.addEventListener('click', () => startOpening(line.id));
    container.appendChild(button);
  }
  if (currentOpening) picker.value = currentOpening.id;
  updateOpeningStatus();
}
function renderOpeningLine() {
  const container = $('moveLine');
  container.replaceChildren();
  for (let index = 0; index < currentOpening.moves.length; index++) {
    const chip = document.createElement('span');
    chip.className = 'move-chip' + (index === openingPly ? ' current' : '');
    const prefix = index % 2 === 0 ? Math.floor(index / 2) + 1 + '.' : Math.floor(index / 2) + 1 + '...';
    chip.textContent = prefix + (index < openingPly ? currentOpening.moves[index] : '?');
    container.appendChild(chip);
  }
}
function lastOpponentMove() {
  const side = OPENING_FAMILIES[family].side;
  for (let index = openingPly - 1; index >= 0; index--) {
    if ((index % 2 === 0 ? 'w' : 'b') !== side) {
      const prefix = index % 2 === 0 ? Math.floor(index / 2) + 1 + '.' : Math.floor(index / 2) + 1 + '...';
      return prefix + currentOpening.moves[index];
    }
  }
  return '';
}
function renderOpening() {
  if (!currentOpening) return;
  const details = OPENING_FAMILIES[family];
  const expected = currentOpening.moves[openingPly];
  $('puzzleEyebrow').textContent = details.name + ' · ' + currentOpening.trigger;
  $('puzzleTitle').textContent = currentOpening.name;
  $('puzzleDescription').textContent = currentOpening.plan;
  $('difficultyTag').textContent = details.side === 'w' ? 'You play White' : 'You play Black';
  $('lessonTitle').textContent = expected ? (lastOpponentMove() ? 'After ' + lastOpponentMove() + ', what do you play?' : 'How do you start the line?') : 'Variation completed';
  $('lessonDescription').textContent = currentOpening.plan;
  $('turnText').textContent = expected ? (busy ? 'Opponent’s turn' : 'Your turn · ' + (details.side === 'w' ? 'White' : 'Black')) : 'Line complete';
  $('turnHint').textContent = currentOpening.trigger + ': ' + currentOpening.reply + '.';
  $('nextBtn').textContent = 'Next variation';
  board.setPosition(game.fen(), true);
  reconcilePieceLayer(game.fen());
  renderOpeningLine();
  setInput();
  renderOpeningList();
}
function finishOpening() {
  busy = true;
  const firstTime = !progress.openingCompleted.includes(currentOpening.id);
  if (firstTime) {
    progress.openingCompleted.push(currentOpening.id);
    saveProgress();
  }
  renderOpening();
  flashBoard('correct');
  setFeedback('Well done! You completed ' + currentOpening.name + '. ' + currentOpening.plan, 'ok');
  toast(firstTime ? 'Variation saved' : 'Variation reviewed');
}
function advanceOpening() {
  if (!currentOpening || mode !== 'opening') return;
  if (openingPly >= currentOpening.moves.length) { finishOpening(); return; }
  const ownTurn = game.turn() === OPENING_FAMILIES[family].side;
  if (ownTurn) {
    busy = false;
    renderOpening();
    if (openingPly === 0) setFeedback('Start the line. ' + currentOpening.plan);
    return;
  }
  busy = true;
  renderOpening();
  pendingTimer = setTimeout(() => {
    pendingTimer = null;
    if (mode !== 'opening' || !currentOpening) return;
    try {
      const move = game.move(currentOpening.moves[openingPly]);
      openingPly++;
      renderOpening();
      setFeedback('The opponent played ' + move.san + '. Think about your response.');
      advanceOpening();
    } catch {
      busy = true;
      setFeedback('This variation could not load. Choose another one.', 'bad');
      setInput();
    }
  }, 420);
}
function startOpening(id) {
  clearTimer();
  clearMoveGuides();
  const line = openingLines.find(item => item.id === id && item.family === family) || linesForFamily()[0];
  if (!line) {
    setFeedback('No variations are available for this opening.', 'bad');
    return;
  }
  currentOpening = line;
  current = null;
  openingPly = 0;
  game = new Chess();
  busy = true;
  progress.lastOpening = line.id;
  progress.lastFamily = family;
  progress.lastMode = 'opening';
  saveProgress();
  board.setOrientation(OPENING_FAMILIES[family].side === 'w' ? COLOR.white : COLOR.black);
  board.setPosition(game.fen(), false);
  reconcilePieceLayer(game.fen());
  renderOpening();
  setFeedback('Preparing the opponent’s response…');
  advanceOpening();
}
function playOpeningMove(from, to, promotion = 'q') {
  const expected = currentOpening.moves[openingPly];
  let move;
  try { move = game.move({ from, to, promotion }); } catch { move = null; }
  if (!move) {
    flashBoard('wrong');
    setFeedback('That move is not legal. Choose a marked square or use the move menu.', 'bad');
    return false;
  }
  if (move.san !== expected) {
    game.undo();
    progress.openingMistakes++;
    saveProgress();
    flashBoard('wrong');
    const idea = currentOpening.ideas[openingPly] || currentOpening.plan;
    setFeedback('In this variation, play ' + expected + '. ' + idea, 'bad');
    return false;
  }
  const idea = currentOpening.ideas[openingPly] || currentOpening.plan;
  openingPly++;
  board.setPosition(game.fen(), true);
  reconcilePieceLayer(game.fen());
  playTone();
  flashBoard('correct');
  setFeedback('Good: ' + move.san + '. ' + idea, 'ok');
  if (openingPly >= currentOpening.moves.length) finishOpening();
  else advanceOpening();
  return true;
}
function onMove(event) {
  if (event.type === INPUT_EVENT_TYPE.moveInputStarted) {
    const selectable = !busy && game && game.get(event.squareFrom)?.color === game.turn();
    if (selectable) showMoveGuides(event.squareFrom);
    return !!selectable;
  }
  if (event.type === INPUT_EVENT_TYPE.moveInputCanceled || event.type === INPUT_EVENT_TYPE.moveInputFinished) {
    clearMoveGuides();
    if (event.type === INPUT_EVENT_TYPE.moveInputFinished && !event.legalMove) {
      flashBoard('wrong');
      setFeedback('That piece cannot move there. Look at the marked squares and try again.', 'bad');
    }
    return true;
  }
  if (event.type !== INPUT_EVENT_TYPE.validateMoveInput || busy) return false;
  clearMoveGuides();
  return mode === 'opening'
    ? playOpeningMove(event.squareFrom, event.squareTo, event.promotion || 'q')
    : playPuzzleMove(event.squareFrom, event.squareTo, event.promotion || 'q');
}
function renderRouteList() {
  const titles = { mate: ['Choose your checkmate level', 'Start with mate in 1 and move up at your own pace.'], tactic: ['Choose a tactic', 'Each pattern teaches a different idea.'], endgame: ['Practice endgames', 'Convert your advantage with precision.'] };
  if (!titles[mode]) return;
  $('routeTitle').textContent = titles[mode][0];
  $('routeDescription').textContent = titles[mode][1];
  const container = $('routeList');
  container.replaceChildren();
  for (const [key, cfg] of Object.entries(configs)) {
    if (cfg.kind !== mode) continue;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'route-button' + (key === activePool ? ' active' : '');
    button.dataset.route = key;
    button.setAttribute('aria-pressed', key === activePool ? 'true' : 'false');
    const strong = document.createElement('strong');
    strong.textContent = cfg.label;
    const small = document.createElement('small');
    small.textContent = (pools[key] ? pools[key].length : '…') + ' puzzles · ' + cfg.description;
    button.append(strong, small);
    button.addEventListener('click', () => loadPuzzle(key, 0, true));
    container.appendChild(button);
  }
}
function setMode(nextMode) {
  if (!['mate', 'tactic', 'opening', 'endgame'].includes(nextMode)) return;
  clearTimer();
  clearMoveGuides();
  mode = nextMode;
  progress.lastMode = mode;
  saveProgress();
  document.querySelectorAll('[data-mode]').forEach(button => {
    const selected = button.dataset.mode === mode;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  const opening = mode === 'opening';
  $('puzzleStats').hidden = opening;
  $('eloPanel').hidden = opening;
  $('openingIntro').hidden = !opening;
  $('puzzleLibrary').hidden = opening;
  $('openingLibrary').hidden = !opening;
  $('sessionBtn').textContent = opening ? 'Another variation' : 'New session';
  if (opening) {
    $('openingFamilyTitle').textContent = OPENING_FAMILIES[family].name;
    $('openingFamilyDescription').textContent = OPENING_FAMILIES[family].description;
    document.querySelectorAll('[data-family]').forEach(button => {
      const selected = button.dataset.family === family;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    startOpening(progress.lastOpening);
  } else {
    const route = configs[activePool] && configs[activePool].kind === mode ? activePool : routeStarts[mode];
    activePool = route;
    renderRouteList();
    loadPuzzle(route, 0, true);
  }
}
function next() {
  if (mode === 'opening') {
    const lines = linesForFamily();
    const index = lines.findIndex(line => line.id === currentOpening?.id);
    startOpening(lines[(index + 1) % lines.length].id);
  } else if (pools[activePool]?.length) {
    sessionNonce++;
    loadPuzzle(activePool, (activeIndex + 1) % pools[activePool].length);
  }
}
function reset() {
  if (mode === 'opening') startOpening(currentOpening?.id);
  else if (current) loadPuzzle(activePool, activeIndex);
}
function playTone() {
  if (!soundOn) return;
  try {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return;
    const audio = new Context();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = 520;
    gain.gain.value = 0.04;
    oscillator.connect(gain);
    gain.connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + 0.08);
    oscillator.onended = () => audio.close();
  } catch { /* Sound is optional. */ }
}
async function boot() {
  setMode(mode);
  const keys = Object.keys(configs);
  const counts = await Promise.all(keys.map(fetchPool));
  if (mode !== 'opening') loadPuzzle(activePool, 0, true);
  renderRouteList();
  if (counts.every(count => count === 0)) {
    $('poolSummary').textContent = 'The puzzles could not load. Check your connection and reload the page.';
  }
}
$('hintBtn').addEventListener('click', () => {
  if (mode === 'opening' && currentOpening && !busy) {
    const expected = currentOpening.moves[openingPly];
    setFeedback('Try ' + expected + '. ' + (currentOpening.ideas[openingPly] || currentOpening.plan));
  } else if (current && mode !== 'opening') setFeedback(current.hint);
});
$('nextBtn').addEventListener('click', next);
$('resetBtn').addEventListener('click', reset);
$('sessionBtn').addEventListener('click', () => {
  if (mode === 'opening') next();
  else if (pools[activePool]?.length) { sessionNonce++; loadPuzzle(activePool, 0, true); }
});
$('playMoveBtn').addEventListener('click', () => {
  if (busy || !$('moveSelect').value) return;
  clearMoveGuides();
  const move = parseUci($('moveSelect').value);
  if (mode === 'opening') playOpeningMove(move.from, move.to, move.promotion || 'q');
  else playPuzzleMove(move.from, move.to, move.promotion || 'q');
});
$('moveSelect').addEventListener('keydown', event => {
  if (event.key === 'Enter') { event.preventDefault(); $('playMoveBtn').click(); }
});
$('soundBtn').addEventListener('click', () => {
  soundOn = !soundOn;
  $('soundBtn').textContent = soundOn ? 'Sound: on' : 'Sound: off';
  toast(soundOn ? 'Sound on' : 'Sound off');
});
$('profileBtn').addEventListener('click', () => toast(progress.solved + ' puzzles and ' + progress.openingCompleted.length + ' variations saved on this device'));
document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => setMode(button.dataset.mode)));
document.querySelectorAll('[data-family]').forEach(button => button.addEventListener('click', () => {
  family = button.dataset.family;
  progress.lastFamily = family;
  progress.lastOpening = linesForFamily()[0]?.id || '';
  saveProgress();
  setMode('opening');
}));
$('openingPicker').addEventListener('change', event => startOpening(event.currentTarget.value));
document.querySelectorAll('.elo-choice').forEach(button => button.addEventListener('click', () => {
  progress.elo = Number(button.dataset.elo);
  saveProgress();
  if (mode !== 'opening') { sessionNonce++; loadPuzzle(activePool, 0, true); }
}));
window.addEventListener('unhandledrejection', () => setFeedback('This session could not finish. Reload the page to try again.', 'bad'));
boot();
