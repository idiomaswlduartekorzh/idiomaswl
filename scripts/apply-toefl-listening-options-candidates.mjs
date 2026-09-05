import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const contractPath = 'docs/toefl-sectional-hr06-length-review-candidate-20260904.json';
const expectedContractHash = '5943893930224895b1d0878abbb075a61460030442a2888ffa3bb8eddaf6a820';
const requiredApprovals = [
  ['HR-06-LENGTH-CANDIDATES-EXECUTIVE', 'David Duarte'],
  ['HR-06-LENGTH-CANDIDATES-ACADEMIC', 'Zhanna Korzh'],
];

const hash = (buffer) => createHash('sha256').update(buffer).digest('hex');
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), 'utf8'));

const contractBytes = await readFile(path.join(root, contractPath));
if (hash(contractBytes) !== expectedContractHash) throw new Error('El contrato HR-06 cambió después de la aprobación.');

const reviewLog = await readJson('docs/toefl-sectional-review-log.json');
for (const [gateId, reviewer] of requiredApprovals) {
  const review = reviewLog.reviews.find((entry) => entry.gateId === gateId);
  if (review?.decision !== 'approved' || review.reviewer !== reviewer || review.contentDigest !== expectedContractHash) {
    throw new Error(`Falta la aprobación exacta ${gateId} de ${reviewer}.`);
  }
}

const tracker = await readJson('docs/toefl-listening-length-correction-tracker-20260904.json');
const sourceBySet = new Map(tracker.sets.map((entry) => [entry.set, entry]));
const fileChanges = new Map();
const targets = [];

function batchFile(setNumber) {
  if (setNumber <= 5) return 'src/data/toefl/listening-fixed-sets-1-5.ts';
  if (setNumber <= 10) return 'src/data/toefl/listening-fixed-sets-6-10.ts';
  if (setNumber <= 15) return 'src/data/toefl/listening-fixed-sets-11-15.ts';
  return 'src/data/toefl/listening-fixed-sets-16-20.ts';
}

function quotedArray(values) {
  return JSON.stringify(values).replaceAll('</', '<\\/');
}

function scanBracket(source, openingIndex, open = '[', close = ']') {
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = openingIndex; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === "'" || char === '"' || char === '`') { quote = char; continue; }
    if (char === open) depth += 1;
    else if (char === close && --depth === 0) return index + 1;
  }
  throw new Error(`No se encontró el cierre ${close} desde ${openingIndex}.`);
}

function callArguments(source, callIndex) {
  const opening = source.indexOf('(', callIndex);
  if (opening < 0) throw new Error(`Llamada sin paréntesis en ${callIndex}.`);
  const args = [];
  let start = opening + 1;
  let round = 0;
  let square = 0;
  let curly = 0;
  let quote = null;
  let escaped = false;
  for (let index = opening + 1; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === "'" || char === '"' || char === '`') { quote = char; continue; }
    if (char === '(') round += 1;
    else if (char === ')') {
      if (round === 0 && square === 0 && curly === 0) {
        args.push([start, index]);
        return args;
      }
      round -= 1;
    } else if (char === '[') square += 1;
    else if (char === ']') square -= 1;
    else if (char === '{') curly += 1;
    else if (char === '}') curly -= 1;
    else if (char === ',' && round === 0 && square === 0 && curly === 0) {
      args.push([start, index]);
      start = index + 1;
    }
  }
  throw new Error(`Llamada sin cierre en ${callIndex}.`);
}

function addLegacyTarget(source, relativePath, legacyId, options) {
  const anchor = `id: '${legacyId}'`;
  const anchorIndex = source.indexOf(anchor);
  if (anchorIndex < 0 || source.indexOf(anchor, anchorIndex + 1) >= 0) throw new Error(`${anchor} no es único en ${relativePath}.`);
  const optionsIndex = source.indexOf('options:', anchorIndex);
  const answerIndex = source.indexOf('answer:', anchorIndex);
  if (optionsIndex < 0 || answerIndex < 0 || optionsIndex > answerIndex) throw new Error(`Opciones no localizadas para ${legacyId}.`);
  const start = source.indexOf('[', optionsIndex);
  const end = scanBracket(source, start);
  targets.push({ relativePath, start, end, replacement: quotedArray(options), id: legacyId });
}

function addFixedTarget(source, relativePath, setNumber, code, options) {
  let anchor;
  let argumentIndex;
  const choose = code.match(/^(m[12])-cr(\d+)$/);
  if (choose) {
    anchor = `fixedListeningChoose(${setNumber}, '${choose[1]}', ${Number(choose[2])},`;
    argumentIndex = 5;
  } else {
    anchor = `item(${setNumber}, '${code}',`;
    argumentIndex = 3;
  }
  const callIndex = source.indexOf(anchor);
  if (callIndex < 0 || source.indexOf(anchor, callIndex + 1) >= 0) throw new Error(`${anchor} no es único en ${relativePath}.`);
  const args = callArguments(source, callIndex);
  if (!args[argumentIndex]) throw new Error(`No existe el argumento de opciones de ${anchor}.`);
  const [rawStart, rawEnd] = args[argumentIndex];
  const current = source.slice(rawStart, rawEnd);
  const leading = current.match(/^\s*/)?.[0] ?? '';
  const trailing = current.match(/\s*$/)?.[0] ?? '';
  targets.push({ relativePath, start: rawStart, end: rawEnd, replacement: `${leading}${quotedArray(options)}${trailing}`, id: code });
}

for (let setNumber = 2; setNumber <= 20; setNumber += 1) {
  const candidatePath = `docs/toefl-listening-set${setNumber}-options-candidate.json`;
  const candidateBytes = await readFile(path.join(root, candidatePath));
  const trackerEntry = sourceBySet.get(setNumber);
  if (!trackerEntry || hash(candidateBytes) !== trackerEntry.candidateSha256) {
    throw new Error(`El candidato del Set ${setNumber} no coincide con el tracker aprobado.`);
  }
  const candidate = JSON.parse(candidateBytes);
  if (candidate.items.length !== 34) throw new Error(`Set ${setNumber}: se esperaban 34 ítems.`);

  const mockPath = `src/data/mocks/toefl-set-${setNumber}.ts`;
  const fixedPath = batchFile(setNumber);
  for (const relativePath of [mockPath, fixedPath]) {
    if (!fileChanges.has(relativePath)) fileChanges.set(relativePath, await readFile(path.join(root, relativePath), 'utf8'));
  }

  for (const item of candidate.items) {
    if (!Array.isArray(item.options) || item.options.length !== 4) throw new Error(`${item.id}: opciones inválidas.`);
    if (item.id.endsWith('-fixed-v1')) {
      const legacyId = item.id.replace(/^item:/, '').replace(/-fixed-v1$/, '');
      addLegacyTarget(fileChanges.get(mockPath), mockPath, legacyId, item.options);
    } else {
      const match = item.id.match(new RegExp(`^item:t${setNumber}-l-(.+)-v1$`));
      if (!match) throw new Error(`ID nuevo inesperado: ${item.id}.`);
      addFixedTarget(fileChanges.get(fixedPath), fixedPath, setNumber, match[1], item.options);
    }
  }
}

if (targets.length !== 646) throw new Error(`Se esperaban 646 destinos y se localizaron ${targets.length}.`);
for (const [relativePath, original] of fileChanges) {
  let updated = original;
  const edits = targets.filter((entry) => entry.relativePath === relativePath).sort((a, b) => b.start - a.start);
  for (const edit of edits) updated = updated.slice(0, edit.start) + edit.replacement + updated.slice(edit.end);
  await writeFile(path.join(root, relativePath), updated);
}

console.log(`✓ Importadas exactamente ${targets.length} listas de opciones aprobadas de Sets 2-20 en ${fileChanges.size} fuentes.`);
