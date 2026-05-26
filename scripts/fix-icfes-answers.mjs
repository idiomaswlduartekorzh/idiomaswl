/**
 * fix-icfes-answers.mjs
 *
 * Redistributes answer indices in ICFES mocks 02-10 so the correct answer
 * is evenly spread across A/B/C/D instead of clustering at index 1 (B).
 *
 * For each mock the script:
 *   1. Finds every `answer: N,` line
 *   2. Locates the corresponding options array (single-line or multi-line)
 *   3. Swaps options so the correct answer lands at the target index
 *   4. Updates `answer: <target>,`
 *
 * Target sequence (16-element repeating cycle, 4 of each letter per cycle):
 *   [0,1,2,3,2,0,3,1,1,3,0,2,3,2,1,0]  → for 55 questions gives 14,14,14,13
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MOCKS_DIR = join(__dirname, '../src/data/mocks');

// 16-element cycle: 4 each of 0,1,2,3 with non-obvious order
const CYCLE = [0, 1, 2, 3, 2, 0, 3, 1, 1, 3, 0, 2, 3, 2, 1, 0];

function getTarget(questionIndex) {
  return CYCLE[questionIndex % CYCLE.length];
}

/**
 * Parse a single-line options string like:
 *   'Airport', 'Hotel', 'Station', 'Embassy'
 * Returns array of the 4 raw string tokens (with their quotes).
 */
function parseSingleLineOptions(inner) {
  // Use a state machine to split by top-level commas
  const results = [];
  let depth = 0;
  let start = 0;
  let inSingle = false;
  let inDouble = false;

  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    const prev = i > 0 ? inner[i - 1] : '';

    if (ch === "'" && !inDouble && prev !== '\\') inSingle = !inSingle;
    else if (ch === '"' && !inSingle && prev !== '\\') inDouble = !inDouble;
    else if (!inSingle && !inDouble) {
      if (ch === '[') depth++;
      else if (ch === ']') depth--;
      else if (ch === ',' && depth === 0) {
        results.push(inner.slice(start, i).trim());
        start = i + 1;
      }
    }
  }
  const last = inner.slice(start).trim();
  if (last) results.push(last);

  return results;
}

function fixFile(filePath) {
  const original = readFileSync(filePath, 'utf8');
  const lines = original.split('\n');

  let questionIndex = 0;
  let changed = 0;

  for (let i = 0; i < lines.length; i++) {
    const answerMatch = lines[i].match(/^(\s+)answer:\s*(\d),\s*$/);
    if (!answerMatch) continue;

    const indent = answerMatch[1];
    const currentAnswer = parseInt(answerMatch[2], 10);
    const target = getTarget(questionIndex++);

    if (currentAnswer === target) continue; // already correct position

    // ── Detect single-line options (line immediately before answer) ────────
    const prevLine = lines[i - 1] ?? '';
    const singleMatch = prevLine.match(/^(\s+options:\s*\[)(.*?)(\],\s*)$/);

    if (singleMatch) {
      // Single-line: options: ['A', 'B', 'C', 'D'],
      const opts = parseSingleLineOptions(singleMatch[2]);
      if (opts.length !== 4) continue;

      // Swap correct answer to target position
      const correctOpt = opts[currentAnswer];
      opts[currentAnswer] = opts[target];
      opts[target] = correctOpt;

      lines[i - 1] = singleMatch[1] + opts.join(', ') + singleMatch[3];
      lines[i] = `${indent}answer: ${target},`;
      changed++;
      continue;
    }

    // ── Detect multi-line options ──────────────────────────────────────────
    // Structure above answer line:
    //   i-1: `          ],`
    //   i-2: `            'opt3',`
    //   i-3: `            'opt2',`
    //   i-4: `            'opt1',`
    //   i-5: `            'opt0',`
    //   i-6: `          options: [`
    const closingLine = lines[i - 1] ?? '';
    if (closingLine.trim() !== '],') continue;

    const opt3Line = lines[i - 2];
    const opt2Line = lines[i - 3];
    const opt1Line = lines[i - 4];
    const opt0Line = lines[i - 5];
    const openLine = lines[i - 6] ?? '';

    if (!openLine.trim().startsWith('options:')) continue;

    // Strip trailing comma from each option line to get raw value, then swap
    const optLines = [opt0Line, opt1Line, opt2Line, opt3Line];

    // Swap the two affected lines
    const correctLine = optLines[currentAnswer];
    optLines[currentAnswer] = optLines[target];
    optLines[target] = correctLine;

    lines[i - 5] = optLines[0];
    lines[i - 4] = optLines[1];
    lines[i - 3] = optLines[2];
    lines[i - 2] = optLines[3];
    lines[i] = `${indent}answer: ${target},`;
    changed++;
  }

  if (changed > 0) {
    writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`✅  ${filePath.split('/').pop()}  — redistributed ${changed} answers (${questionIndex} questions total)`);
  } else {
    console.log(`⏭   ${filePath.split('/').pop()}  — no changes needed`);
  }
}

// Fix mocks 02-10 (01 was already fixed manually; 11-20 already have good distribution)
for (let n = 2; n <= 10; n++) {
  const filename = `icfes-mock-${String(n).padStart(2, '0')}.ts`;
  fixFile(join(MOCKS_DIR, filename));
}

console.log('\nDone. Run the distribution check to verify:');
console.log('  for i in $(seq -w 02 10); do echo "mock-$i:"; grep "answer:" src/data/mocks/icfes-mock-$i.ts | sed "s/.*answer: //" | sort | uniq -c | tr "\\n" " "; echo; done');
