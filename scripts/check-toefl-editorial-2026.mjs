#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const sourcePath = path.join(process.cwd(), 'src/data/blog.ts');
const source = fs.readFileSync(sourcePath, 'utf8');
const articleBlocks = [...source.matchAll(/\n  \{\n    slug: '([^']+)'[\s\S]*?\n  \},/g)].map((match) => ({
  slug: match[1],
  text: match[0],
}));
const toeflArticles = articleBlocks.filter(({ text }) => text.includes("category: 'TOEFL'"));
const errors = [];

const requiredArticles = new Map([
  ['toefl-ibt-preparacion-guia-completa', ['Complete the Words', 'Take an Interview', '1 a 6']],
  ['toefl-ibt-estrategias-por-seccion', ['50 ítems base', 'Listen and Choose a Response', 'Build a Sentence']],
  ['cuanto-cuesta-el-toefl-en-colombia-2026', ['agenda ETS', 'US$49', 'US$69']],
  ['toefl-ibt-vs-toefl-essentials-cual-elegir-2026', ['US$199', 'escala principal de 1 a 6', 'escala de 1 a 12']],
  ['toefl-speaking-integrated-tasks-como-responder', ['Listen and Repeat', 'Take an Interview', 'no son preguntas oficiales']],
  ['toefl-reading-preguntas-inferencia-y-detalle', ['Read in Daily Life', 'Read an Academic Passage', 'no son pruebas oficiales']],
  ['toefl-ibt-estructura-completa-y-estrategia-2026', ['30 minutos · 50 ítems', '29 minutos · 47 ítems', '23 minutos · 12 ítems', '8 minutos · 11 ítems']],
  ['toefl-ibt-puntaje-minimo-canada-universidades', ['Study Permit', 'sitio oficial de la universidad', 'escala principal de'] ],
]);

const forbiddenPatterns = [
  ['tabla Reading anterior', /Reading<\/td><td>35 minutos/i],
  ['tabla Listening anterior', /Listening<\/td><td>36 minutos/i],
  ['Speaking anterior como formato vigente', /<h2>Speaking:\s*4 tareas/i],
  ['Writing anterior como formato vigente', /<h2>Writing:\s*Integrated Task/i],
  ['Reading anterior como formato vigente', /TOEFL iBT Reading tiene 2 textos/i],
  ['escala iBT anterior como principal', /0–120 \(suma de 4 secciones/i],
  ['precio antiguo de Essentials', /US\$135–\$145/i],
  ['precio fijo antiguo del iBT', /US\$230–\$250/i],
];

if (toeflArticles.length !== requiredArticles.size) {
  errors.push(`Se esperaban ${requiredArticles.size} artículos TOEFL y se encontraron ${toeflArticles.length}.`);
}

for (const [slug, requiredPhrases] of requiredArticles) {
  const article = toeflArticles.find((candidate) => candidate.slug === slug);
  if (!article) {
    errors.push(`Falta el artículo TOEFL auditado: ${slug}.`);
    continue;
  }

  if (!article.text.includes("updatedDate: '2026-08-21'")) {
    errors.push(`${slug} no conserva la fecha de revisión editorial 2026-08-21.`);
  }

  for (const phrase of requiredPhrases) {
    if (!article.text.includes(phrase)) errors.push(`${slug} no contiene la referencia vigente: ${phrase}.`);
  }

  for (const [label, pattern] of forbiddenPatterns) {
    if (pattern.test(article.text)) errors.push(`${slug} volvió a publicar ${label}.`);
  }
}

if (errors.length > 0) {
  console.error('TOEFL 2026 editorial guard failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`TOEFL 2026 editorial guard passed: ${toeflArticles.length} artículos auditados.`);
