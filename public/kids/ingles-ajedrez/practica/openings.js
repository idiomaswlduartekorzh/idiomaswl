// Guided repertoire. Moves use international SAN. chess.js validates every
// line before it is offered to a learner.
export const OPENING_FAMILIES = {
  italian: {
    name: 'Italian Game',
    side: 'w',
    description: 'Play White. The Italian Game begins 1.e4 e5 2.Nf3 Nc6 3.Bc4. Practice responses to common Black defenses.',
  },
  caro: {
    name: 'Caro-Kann Defense',
    side: 'b',
    description: 'Play Black. Answer 1.e4 with 1...c6 and learn a plan for each White response.',
  },
};

export const OPENING_LINES = [
  {
    id: 'italian-quiet', family: 'italian', name: 'Quiet Giuoco Piano',
    trigger: 'After 3...Bc5', reply: '4.c3 and 5.d3',
    plan: 'Prepare d4 without rushing. Castle before opening the center.',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'c3', 'Nf6', 'd3', 'd6', 'O-O', 'O-O', 'Re1'],
    ideas: { 0: 'Claim space in the center.', 2: 'Develop the knight and attack e5.', 4: 'The bishop aims at f7.', 6: 'c3 prepares d4 and gives the bishop a retreat square.', 8: 'd3 protects e4 and keeps the center flexible.', 10: 'Castle before launching an attack.', 12: 'Re1 supports e4 and prepares d4.' },
  },
  {
    id: 'italian-center', family: 'italian', name: 'Giuoco Piano: open the center',
    trigger: 'After 3...Bc5', reply: '4.c3 and 5.d4',
    plan: 'When Black develops ...Nf6, challenge the center with d4 and recapture with the c-pawn.',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'c3', 'Nf6', 'd4', 'exd4', 'cxd4', 'Bb4+', 'Bd2', 'Bxd2+', 'Nbxd2'],
    ideas: { 6: 'c3 supports the coming d4 push.', 8: 'd4 strikes the center while the Black bishop is on c5.', 10: 'Recapture with the c-pawn and keep a strong center.', 12: 'Block the check and develop the bishop.', 14: 'Recapture with the b1 knight to develop another piece.' },
  },
  {
    id: 'italian-two-knights-quiet', family: 'italian', name: 'Two Knights: solid plan',
    trigger: 'After 3...Nf6', reply: '4.d3',
    plan: 'Protect e4, develop calmly, and prepare c3 and d4 once your king is safe.',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6', 'd3', 'Bc5', 'c3', 'd6', 'O-O', 'O-O', 'Re1'],
    ideas: { 6: 'd3 answers the threat to e4 and keeps your structure sound.', 8: 'c3 prepares the central d4 push.', 10: 'Castle before opening the center.', 12: 'Re1 reinforces e4 and prepares d4.' },
  },
  {
    id: 'italian-two-knights-attack', family: 'italian', name: 'Two Knights: attack f7',
    trigger: 'After 3...Nf6', reply: '4.Ng5',
    plan: 'Attack f7 with bishop and knight. After ...d5, capture and calculate the bishop retreat.',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6', 'Ng5', 'd5', 'exd5', 'Na5', 'Bb5+', 'c6', 'dxc6', 'bxc6', 'Be2'],
    ideas: { 6: 'Ng5 creates a direct threat to f7.', 8: 'Capture on d5 rather than letting Black take the center for free.', 10: 'Bb5+ forces Black to clarify the position.', 12: 'Capture on c6 before retreating the bishop.', 14: 'Retreat the bishop to e2 and prepare to castle.' },
  },
  {
    id: 'italian-hungarian', family: 'italian', name: 'Hungarian Defense',
    trigger: 'After 3...Be7', reply: '4.d4',
    plan: 'Black has placed the bishop passively. Take the center and develop without forcing an attack.',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Be7', 'd4', 'd6', 'O-O', 'Nf6', 'Re1', 'O-O', 'c3'],
    ideas: { 6: 'd4 uses the time Black spent on ...Be7.', 8: 'Move your king to safety.', 10: 'Re1 supports e4.', 12: 'c3 strengthens the center and gives the bishop a retreat square.' },
  },
  {
    id: 'italian-d6', family: 'italian', name: 'The ...d6 response',
    trigger: 'After 3...d6', reply: '4.d4',
    plan: 'Take the center while Black still has pieces at home, then develop naturally.',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'd6', 'd4', 'exd4', 'Nxd4', 'Nf6', 'Nc3', 'Be7', 'O-O'],
    ideas: { 6: 'd4 opens the center and uses your lead in development.', 8: 'Recapture the pawn with your knight.', 10: 'Develop your second knight.', 12: 'Castle and keep the initiative.' },
  },
  {
    id: 'italian-petrov', family: 'italian', name: 'When Black plays the Petroff',
    trigger: 'After 2...Nf6', reply: '3.Nxe5',
    plan: 'The Italian Game is no longer possible. Against the Petroff, capture e5 and return the knight to f3 after ...d6.',
    moves: ['e4', 'e5', 'Nf3', 'Nf6', 'Nxe5', 'd6', 'Nf3', 'Nxe4', 'd4', 'd5', 'Bd3'],
    ideas: { 4: 'Capture e5. Black cannot recapture it immediately.', 6: 'Retreat the attacked knight and keep the balance.', 8: 'd4 claims the center.', 10: 'Develop the bishop and attack the Black knight on e4.' },
  },
  {
    id: 'caro-advance', family: 'caro', name: 'Advance Variation',
    trigger: 'After 3.e5', reply: '3...Bf5',
    plan: 'Develop your light-squared bishop before ...e6 closes the pawn chain, then pressure d4 with ...c5.',
    moves: ['e4', 'c6', 'd4', 'd5', 'e5', 'Bf5', 'Nf3', 'e6', 'Be2', 'c5', 'O-O', 'Nc6'],
    ideas: { 1: 'c6 prepares ...d5 without trapping the light-squared bishop.', 3: 'd5 challenges White’s center.', 5: 'Bf5 activates the bishop before ...e6.', 7: 'e6 supports d5.', 9: 'c5 attacks the base of White’s pawn chain on d4.', 11: 'Nc6 adds pressure to d4.' },
  },
  {
    id: 'caro-classical', family: 'caro', name: 'Classical Variation',
    trigger: 'After 3.Nc3', reply: '3...dxe4',
    plan: 'Clarify the center, develop the bishop to f5, and prepare to challenge White’s space later.',
    moves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Bf5', 'Ng3', 'Bg6', 'h4', 'h6', 'Nf3', 'Nd7'],
    ideas: { 5: 'Capture e4 so White cannot keep both central pawns.', 7: 'Develop the bishop before ...e6.', 9: 'Retreat the bishop to g6.', 11: 'h6 gives the bishop an escape square.', 13: 'Nd7 develops the knight and helps defend the kingside.' },
  },
  {
    id: 'caro-nd2', family: 'caro', name: 'Classical with 3.Nd2',
    trigger: 'After 3.Nd2', reply: '3...dxe4',
    plan: 'White’s knight takes a different route, but the structure can lead to the same Classical plan.',
    moves: ['e4', 'c6', 'd4', 'd5', 'Nd2', 'dxe4', 'Nxe4', 'Bf5', 'Ng3', 'Bg6', 'h4', 'h6', 'Ngf3', 'Nd7'],
    ideas: { 5: 'Capture e4 to limit White’s center.', 7: 'Activate the bishop before ...e6.', 9: 'Keep the bishop on g6.', 11: 'h6 gives the bishop a retreat square.', 13: 'Nd7 develops a piece while supporting your defense.' },
  },
  {
    id: 'caro-exchange', family: 'caro', name: 'Exchange Variation',
    trigger: 'After 3.exd5', reply: '3...cxd5',
    plan: 'Recapture with the c-pawn, develop your pieces, and seek activity on the c-file.',
    moves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'Bd3', 'Nc6', 'c3', 'Nf6', 'Bf4', 'Bg4'],
    ideas: { 5: 'Recapture with the c-pawn; the center becomes symmetrical.', 7: 'Nc6 develops and pressures d4.', 9: 'Nf6 prepares to castle and attacks e4.', 11: 'Bg4 develops the bishop and prepares to pressure a knight on f3.' },
  },
  {
    id: 'caro-panov', family: 'caro', name: 'Panov Attack',
    trigger: 'After 4.c4', reply: '4...Nf6',
    plan: 'White’s isolated pawn can bring initiative. Develop quickly and pressure d4 without opening lines unnecessarily.',
    moves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'c4', 'Nf6', 'Nc3', 'e6', 'Nf3', 'Be7'],
    ideas: { 5: 'Recapture with the c-pawn, as in the Exchange Variation.', 7: 'Nf6 develops and watches e4.', 9: 'e6 supports d5 against White’s pressure.', 11: 'Be7 prepares to castle and keeps a solid position.' },
  },
  {
    id: 'caro-fantasy', family: 'caro', name: 'Fantasy Variation',
    trigger: 'After 3.f3', reply: '3...dxe4',
    plan: 'White supports e4 with f3. Capture on e4, then strike the center with ...e5.',
    moves: ['e4', 'c6', 'd4', 'd5', 'f3', 'dxe4', 'fxe4', 'e5', 'Nf3', 'exd4', 'Bc4', 'Nf6'],
    ideas: { 5: 'Exchange the central pawn before White can advance.', 7: 'e5 immediately challenges White’s center.', 9: 'exd4 removes White’s pawn from d4.', 11: 'Nf6 develops and attacks the e4 pawn.' },
  },
  {
    id: 'caro-two-knights', family: 'caro', name: 'Two Knights Attack',
    trigger: 'After 2.Nc3 and 3.Nf3', reply: '3...Bg4',
    plan: 'Develop the bishop before ...e6. If White challenges it with h3, exchange and consolidate.',
    moves: ['e4', 'c6', 'Nc3', 'd5', 'Nf3', 'Bg4', 'h3', 'Bxf3', 'Qxf3', 'e6', 'd4', 'Nf6'],
    ideas: { 1: 'c6 prepares ...d5.', 3: 'd5 claims the center.', 5: 'Bg4 develops the bishop and pins the f3 knight.', 7: 'Exchange the bishop instead of losing time retreating it.', 9: 'e6 supports the central structure.', 11: 'Nf6 develops and attacks e4.' },
  },
  {
    id: 'caro-kia', family: 'caro', name: 'System with 2.d3',
    trigger: 'After 2.d3', reply: '2...d5',
    plan: 'Keep the Caro-Kann central idea even when White skips d4: occupy d5 and develop.',
    moves: ['e4', 'c6', 'd3', 'd5', 'Nd2', 'e5', 'Ngf3', 'Nd7', 'g3', 'Ngf6', 'Bg2', 'Be7'],
    ideas: { 1: 'c6 prepares ...d5.', 3: 'd5 occupies the center.', 5: 'e5 gains space because White has not challenged it.', 7: 'Nd7 supports e5.', 9: 'Ngf6 develops without blocking the d7 knight.', 11: 'Be7 prepares to castle.' },
  },
];
