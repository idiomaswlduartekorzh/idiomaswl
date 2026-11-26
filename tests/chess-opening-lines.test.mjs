import assert from 'node:assert/strict';
import test from 'node:test';
import { Chess } from '../public/kids/ingles-ajedrez/practica/vendor/chess.js/chess.js';
import { OPENING_FAMILIES, OPENING_LINES } from '../public/kids/ingles-ajedrez/practica/openings.js';

test('the Italian and Caro-Kann repertoires cover distinct, legal responses', () => {
  assert.equal(OPENING_LINES.filter(line => line.family === 'italian').length, 7);
  assert.equal(OPENING_LINES.filter(line => line.family === 'caro').length, 8);
  assert.equal(new Set(OPENING_LINES.map(line => line.id)).size, OPENING_LINES.length);

  for (const line of OPENING_LINES) {
    const side = OPENING_FAMILIES[line.family]?.side;
    assert.ok(side === 'w' || side === 'b', `${line.id}: family has a player side`);
    assert.ok(line.trigger && line.reply && line.plan, `${line.id}: shows a response and plan`);
    const game = new Chess();
    for (const san of line.moves) {
      assert.doesNotThrow(() => game.move(san), `${line.id}: ${san} is legal`);
    }
    assert.notEqual(game.turn(), side, `${line.id}: the student plays the final move`);
    for (const ply of Object.keys(line.ideas).map(Number)) {
      assert.equal(ply % 2 === 0 ? 'w' : 'b', side, `${line.id}: explanation belongs to the student's move`);
      assert.ok(line.ideas[ply], `${line.id}: explanation is present`);
    }
  }
});
