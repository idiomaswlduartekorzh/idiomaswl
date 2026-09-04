#!/usr/bin/env node

// Herramienta local de curaduría. Incluye claves correctas y no debe exponerse
// desde una ruta pública ni copiarse a artefactos indexables.

import { auditItems } from '../docs/toefl-listening-length-audit-draft.mjs';

const setNumber = Number(process.argv[2]);
if (!Number.isInteger(setNumber) || setNumber < 1 || setNumber > 20) {
  throw new Error('Uso: export-toefl-listening-curation.mjs <set 1..20>');
}

const rows = auditItems.filter((item) => item.set === setNumber).map((item) => {
  const wordLengths = item.options.map((text) => (text.match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) ?? []).length);
  const charLengths = item.options.map((text) => Array.from(text.normalize('NFC').trim()).length);
  return {
    id: item.id,
    family: item.family,
    prompt: item.prompt,
    audioUrl: item.audioUrl,
    correctOptionId: item.optionIds[item.correct],
    correctIndex: item.correct,
    options: item.options.map((text, index) => ({
      optionId: item.optionIds[index],
      text,
      words: wordLengths[index],
      chars: charLengths[index],
    })),
  };
});

if (rows.length !== 34) throw new Error(`Set ${setNumber}: ${rows.length}/34 preguntas encontradas.`);
console.log(JSON.stringify({ set: setNumber, rows }, null, 2));
