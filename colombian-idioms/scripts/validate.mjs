#!/usr/bin/env node
// Plain Node.js, no dependencies. Run: node colombian-idioms/scripts/validate.mjs

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, '..', 'data', 'idioms.json');

const REQUIRED_FIELDS = [
  'id',
  'idiom',
  'literal_translation',
  'meaning_intent',
  'english_equivalent',
  'example_es',
  'example_en',
  'register',
  'category',
  'region',
  'era',
];

const ALLOWED_REGISTER = new Set(['informal', 'vulgar', 'neutro']);
const ALLOWED_ERA = new Set(['tradicional', 'nuevo']);
const ALLOWED_REGION = new Set([
  'nacional',
  'paisa',
  'costeno',
  'rolo',
  'valluno',
  'santandereano',
  'llanero',
]);

const errors = [];
const warnings = [];

let raw;
try {
  raw = readFileSync(DATA_PATH, 'utf-8');
} catch (err) {
  console.error(`Could not read ${DATA_PATH}: ${err.message}`);
  process.exit(1);
}

let json;
try {
  json = JSON.parse(raw);
} catch (err) {
  console.error(`Invalid JSON in ${DATA_PATH}: ${err.message}`);
  process.exit(1);
}

const entries = json.entries;
if (!Array.isArray(entries)) {
  console.error('Expected top-level "entries" array.');
  process.exit(1);
}

const seenIds = new Set();
const seenIdioms = new Map(); // normalized idiom text -> id
const categoryCounts = new Map();
const regionCounts = new Map();

for (const [index, entry] of entries.entries()) {
  const where = `entries[${index}] (id: ${entry?.id ?? 'MISSING'})`;

  const entryKeys = Object.keys(entry ?? {});
  const unexpectedKeys = entryKeys.filter((k) => !REQUIRED_FIELDS.includes(k));
  if (unexpectedKeys.length > 0) {
    errors.push(`${where}: unexpected extra field(s): ${unexpectedKeys.join(', ')}`);
  }

  for (const field of REQUIRED_FIELDS) {
    const value = entry?.[field];
    if (value === undefined || value === null) {
      errors.push(`${where}: missing field "${field}"`);
      continue;
    }
    if (typeof value === 'string' && value.trim() === '') {
      errors.push(`${where}: empty field "${field}"`);
    }
  }

  if (entry?.id) {
    if (seenIds.has(entry.id)) {
      errors.push(`Duplicate id: "${entry.id}"`);
    }
    seenIds.add(entry.id);
  }

  if (entry?.idiom) {
    const normalized = entry.idiom.trim().toLowerCase();
    if (seenIdioms.has(normalized)) {
      warnings.push(
        `Possible duplicate idiom text: "${entry.idiom}" (${entry.id}) matches (${seenIdioms.get(normalized)})`
      );
    } else {
      seenIdioms.set(normalized, entry.id);
    }
  }

  if (entry?.register && !ALLOWED_REGISTER.has(entry.register)) {
    errors.push(`${where}: invalid register "${entry.register}"`);
  }
  if (entry?.era && !ALLOWED_ERA.has(entry.era)) {
    errors.push(`${where}: invalid era "${entry.era}"`);
  }
  if (entry?.region && !ALLOWED_REGION.has(entry.region)) {
    errors.push(`${where}: invalid region "${entry.region}"`);
  }

  if (entry?.category) {
    categoryCounts.set(entry.category, (categoryCounts.get(entry.category) ?? 0) + 1);
  }
  if (entry?.region) {
    regionCounts.set(entry.region, (regionCounts.get(entry.region) ?? 0) + 1);
  }
}

function printCounts(title, map) {
  console.log(`\n${title}:`);
  for (const [key, count] of [...map.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${key.padEnd(28)} ${count}`);
  }
}

console.log(`Total entries: ${entries.length}`);
printCounts('By category', categoryCounts);
printCounts('By region', regionCounts);

if (warnings.length > 0) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  ⚠ ${w}`);
}

if (errors.length > 0) {
  console.log(`\n${errors.length} error(s):`);
  for (const e of errors) console.log(`  ✗ ${e}`);
  console.log('\nValidation FAILED.');
  process.exit(1);
}

console.log('\nValidation passed — no errors.');
