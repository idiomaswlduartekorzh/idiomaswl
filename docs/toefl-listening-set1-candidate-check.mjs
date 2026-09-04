// Read-only candidate check. Never imports the candidate into application code.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { auditItems, report } from './toefl-listening-length-audit-draft.mjs';
import { screen, selfTest } from './toefl-option-length-screen-draft.mjs';

const url = new URL('./toefl-listening-set1-options-candidate.json', import.meta.url);
const bytes = readFileSync(url);
const candidate = JSON.parse(bytes);
const baseline = auditItems.filter(r => r.set === 1);
const snapshot = JSON.parse(readFileSync(new URL('./toefl-listening-length-audit-draft.json', import.meta.url), 'utf8'));
assert.deepEqual(report.sourceHashes, snapshot.sourceHashes, 'Sources changed: rebase/review and refresh evidence explicitly');
assert.equal(candidate.status, 'draft-academic-review-required');
assert.equal(candidate.reviewer, null);
assert.equal(candidate.setId, 'set-1');
assert.deepEqual(candidate.items.map(r => r.id), baseline.map(r => r.id));
// Projection can only replace text. IDs, display order and private key are inherited.
const projected = baseline.map((r, i) => ({ ...r, options: candidate.items[i].options }));
assert.deepEqual(projected.map(r => [r.id, r.optionIds, r.correct]), baseline.map(r => [r.id, r.optionIds, r.correct]));
assert.deepEqual(projected.map(r => [r.prompt, r.audioUrl]), baseline.map(r => [r.prompt, r.audioUrl]));
const after = screen(projected);
assert.ok(Object.values(after.totals).every(r => !r.flagged), 'Candidate retains a length-screen flag');
const before = screen(baseline);
assert.equal(before.totals.words_longest.unique, 29);
assert.equal(before.totals.chars_longest.unique, 29);
const all = screen(auditItems);
assert.equal(all.totals.words_longest.unique, 513);
assert.equal(all.totals.chars_longest.unique, 552);
const hash = value => createHash('sha256').update(value).digest('hex');
const root = new URL('../', import.meta.url);
const audioHashes = Array.from({ length: 5 }, (_, i) => {
  const path = `public/audio/toefl/set-1/listen-choose-${i + 1}.mp3`;
  return { path, sha256: hash(readFileSync(new URL(path, root))) };
});
const evidence = { status: 'draft-not-academic-approval', selfTests: selfTest(),
  screeningPolicy: 'Proposed editorial flag: n >= 16 and >45% expected accuracy for either random tie-break or first-option tie-break, for longest or shortest, by words or chars. Not statistical significance, not ETS guidance. Small groups still require review.',
  candidateSha256: hash(bytes), baseline: before, candidate: after, allSetsBaseline: all,
  bySetBaseline: Array.from({ length: 20 }, (_, i) => ({ set: i + 1, ...screen(auditItems.filter(r => r.set === i + 1)) })),
  byFamilyBaseline: ['response', 'conversation', 'announcement', 'academic'].map(family => ({ family, ...screen(auditItems.filter(r => r.family === family)) })),
  candidateByFamily: ['response', 'conversation', 'announcement', 'academic'].map(family => ({ family, ...screen(projected.filter(r => r.family === family)) })),
  audioHashes, sourceHashes: report.sourceHashes };
if (process.argv.includes('--review')) {
  const escape = text => text.replaceAll('|', '\\|').replaceAll('\n', ' ');
  const lines = ['# Set 1 — revisión académica de opciones (BORRADOR)', '',
    'Estado: pendiente de revisión de Zhanna Korzh. Ninguna aprobación previa se extiende a estas redacciones. C09 sigue bloqueado; HR-06 no se cierra.', '',
    'Esta hoja contiene claves: es material interno de curaduría, no una página para alumnos.', '',
    '## Qué revisar', '',
    'Escuchar cada audio; confirmar que la clave sigue siendo la única mejor respuesta, que los distractores son plausibles sin ser ambiguos y que el inglés suena natural. Anotar aceptar/cambiar por ID. La estadística no sustituye esa revisión.', '',
    'Opciones propuestas exclusivamente: no se ha cambiado el banco que usa la página abierta. El audio, el enunciado, los IDs y la posición de la clave se conservan en la proyección de prueba. Revisar también las explicaciones de feedback antes de una integración futura.', '',
    '## Resultado del control de longitud', '',
    '| Medida (34 preguntas) | Original | Propuesta |', '| --- | ---: | ---: |',
    '| Correcta estrictamente más larga, caracteres | 29 | 8 |',
    '| Correcta estrictamente más larga, palabras | 29 | 5 |',
    '| Aciertos al elegir más caracteres, empate aleatorio | 85,3% | 28,4% |',
    '| Aciertos al elegir menos caracteres, empate aleatorio | 8,8% | 41,2% |', '',
    'Riesgo residual: elegir la más corta por caracteres todavía daría 41,2%; se deja visible para revisión, no se certifica ausencia de sesgo. El umbral propuesto de alerta (>45%, grupos de al menos 16) es solo cribado de ingeniería, no criterio ETS ni significancia estadística. Las familias pequeñas requieren inspección aunque no activen alerta.', '',
    'Atención a las familias pequeñas: en anuncios, elegir menos palabras acierta 3/4; en conversación y académico, elegir menos caracteres acierta 3/6 y 4/8. No activar una alerta por tamaño mínimo NO significa aprobar estos grupos.', '',
    'Los otros 19 sets NO están corregidos. El diagnóstico cubre los 680 ítems, incluidos los reutilizados.', '',
    '## Evidencia y alcance', '',
    `SHA-256 candidato: \`${evidence.candidateSha256}\`. Fuente base: \`${candidate.sourceCommit}\`.`, '',
    'A 2026-09-04 origin/main tiene dos commits IELTS posteriores a la base común; las fuentes Listening cotejadas no cambian. Reconciliar con main y repetir pruebas antes de implementar (D10). No se hizo merge, deploy ni cambio del registro de aprobaciones.', '',
    'Los primeros cinco audios se cotejaron mediante transcripción automática local (whisper.cpp, modelo small.en ya instalado), no mediante revisión auditiva humana. Texto automático pendiente de confirmación:', '',
    ...[
      'Excuse me, could you tell me where the science library is?',
      "We're all going out for dinner on Saturday. Would you like to come?",
      "Oh no, I forgot my umbrella and it's pouring outside.",
      "Could you send me the information about next week's workshop?",
      'You look really cheerful today. Did something good happen?',
    ].map((text, i) => `${i + 1}. ${text}`), '',
    '## Comparación por pregunta', ''];
  baseline.forEach((item, i) => {
    lines.push(`### ${i + 1}. ${item.id}`, '', item.prompt, '',
      `Clave conservada: **${String.fromCharCode(65 + item.correct)}**. Familia: ${item.family}.`, '',
      item.audioUrl ? `[Escuchar audio local](http://127.0.0.1:3026${item.audioUrl})` : 'Audio: verificar asociación en la fuente.', '',
      '| Opción | Original | Propuesta |', '| --- | --- | --- |',
      ...item.options.map((old, j) => `| ${String.fromCharCode(65 + j)} | ${escape(old)} | ${escape(projected[i].options[j])} |`), '',
      candidate.items[i].rationale, '', 'Decisión humana: **pendiente**.', '');
  });
  console.log(lines.join('\n'));
} else console.log(JSON.stringify(evidence, null, 2));
