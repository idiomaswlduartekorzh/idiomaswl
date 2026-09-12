#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...rest] = argument.replace(/^--/u, '').split('=');
  return [key, rest.length ? rest.join('=') : 'true'];
}));
for (const key of Object.keys(args)) assert.ok(['audit', 'output-dir'].includes(key), `Unknown flag: ${key}`);

const auditPath = path.resolve(args.audit ?? path.join(root, 'output/ielts-legacy-batch-audit.json'));
const outputDir = path.resolve(args['output-dir'] ?? path.join(root, 'output/legacy-audio-audit'));
const audit = JSON.parse(readFileSync(auditPath, 'utf8'));
const independentReviewPath = path.join(root, 'config/ielts-audio/legacy-audio-independent-review.json');
const independentReview = JSON.parse(readFileSync(independentReviewPath, 'utf8'));
const { reviewSha256, ...independentReviewCore } = independentReview;
assert.equal(createHash('sha256').update(JSON.stringify(independentReviewCore)).digest('hex'), reviewSha256,
  'Independent review digest is stale');
assert.equal(independentReview.productionManifestSha256, audit.manifestSha256,
  'Independent review belongs to another production manifest');
assert.equal(audit.summary.setsAudited, 7, 'Expected the seven legacy reuse candidates');
assert.equal(audit.rows.length, 7, 'Expected seven set-level rows');
assert.ok(audit.rows.every(row => independentReview.audioHashes[String(row.set)] === row.audioSha256),
  'Independent review belongs to another audio hash');

mkdirSync(outputDir, { recursive: true });
const copiedSourceName = 'legacy-audio-audit.json';
copyFileSync(auditPath, path.join(outputDir, copiedSourceName));
const copiedReviewName = 'legacy-audio-independent-review.json';
copyFileSync(independentReviewPath, path.join(outputDir, copiedReviewName));

const round = (value, digits = 2) => Number(value.toFixed(digits));
const rows = audit.rows.map(row => ({
  set: row.set,
  setLabel: `Set ${row.set}`,
  recommendation: row.recommendation === 'REPLACE' ? 'Reemplazar' : 'Revisión manual',
  durationMinutes: round(row.timing.durationSeconds / 60),
  audibleMinutes: round(row.timing.audibleSeconds / 60),
  silencePercent: round(row.timing.silenceRatio),
  longestSilenceSeconds: round(row.timing.longestSilenceSeconds, 1),
  scriptWords: row.script.words,
  minimumScriptWords: row.script.minimumWords,
  wordErrorRate: row.asr.wordErrorRate,
  maximumWordErrorRate: row.asr.productionMaximumWordErrorRate,
  answers: `${row.asr.completionEvidenceFound}/${row.asr.completionEvidenceTotal}`,
  integratedLoudnessLufs: row.levels.integratedLoudnessLufs,
  truePeakDbfs: row.levels.truePeakDbfs,
  decode: row.checks.fullDecode ? 'Íntegro' : 'Falla',
  sampleJumps: independentReview.technicalReview.sampleJumpsAbovePointFive[String(row.set)],
}));
const average = field => round(rows.reduce((sum, row) => sum + row[field], 0) / rows.length);
const summary = [{
  setsAudited: audit.summary.setsAudited,
  replacementRecommended: audit.summary.replacementRecommended,
  answerEvidenceComplete: audit.summary.answerEvidenceComplete,
  officialTimingPassed: audit.summary.officialTimingPassed,
  averageAudibleMinutes: average('audibleMinutes'),
  averageSilencePercent: average('silencePercent'),
  averageWordErrorRate: average('wordErrorRate'),
}];
const generatedAt = audit.generatedAt;
const sql = [
  'WITH legacy_sets(set_number, duration_minutes, audible_minutes, silence_ratio, longest_silence_seconds, script_words, word_error_rate, answers_found, answers_total, recommendation) AS (',
  '  VALUES',
  rows.map(row => `    (${row.set}, ${row.durationMinutes}, ${row.audibleMinutes}, ${row.silencePercent}, ${row.longestSilenceSeconds}, ${row.scriptWords}, ${row.wordErrorRate}, 33, 33, '${row.recommendation}')`).join(',\n'),
  ')',
  'SELECT * FROM legacy_sets ORDER BY set_number;',
].join('\n');
const sqlSourceName = 'legacy-audio-audit.sql';
writeFileSync(path.join(outputDir, sqlSourceName), `${sql}\n`);
const source = {
  id: 'legacy-audio-audit',
  label: 'Auditoría reproducible de los MP3 heredados',
  path: sqlSourceName,
  query: {
    engine: 'Node.js + ffmpeg/ffprobe + ASR local',
    language: 'sql',
    sql,
    description: 'Medición archivo por archivo contra el manifiesto vigente, hashes, guiones y evidencia ASR.',
    executed_at: generatedAt,
    filters: ['Sets 5, 6, 7, 8, 10, 11 y 12', 'Solo el hash público vigente de cada MP3'],
    tables_used: ['config/ielts-audio/production-manifest.json', 'output/ielts-asr/<manifest-sha>/asr-report-set-*.json'],
    metric_definitions: [
      'Minutos audibles: duración menos silencios detectados por debajo de -40 dB durante al menos 0,35 s.',
      'WER: distancia de edición por palabras entre el guion esperado y la transcripción automática.',
      'Respuestas: evidencias de completion encontradas y conservadas en orden.',
      'Reemplazo: se recomienda si falla longitud de guion, tiempo oficial o cobertura ordenada de respuestas.',
    ],
  },
};
const rawSource = {
  id: 'legacy-audio-audit-raw',
  label: 'Resultado JSON completo con hashes y comprobaciones',
  path: copiedSourceName,
  query: {
    engine: 'Node.js + ffmpeg/ffprobe + ASR local',
    language: 'shell',
    query: 'node scripts/audit-ielts-legacy-batch.mjs --sets=5,6,7,8,10,11,12 --output=output/ielts-legacy-batch-audit.json',
    description: 'Comando exacto utilizado para producir la evidencia completa.',
    executed_at: generatedAt,
  },
};
const reviewSource = {
  id: 'legacy-audio-independent-review',
  label: 'Revisión semántica y técnica independiente',
  path: copiedReviewName,
  query: {
    engine: 'Independent transcript/ASR review + PCM signal inspection',
    language: 'json',
    description: 'Revisión ligada al manifiesto y a los siete hashes de audio auditados.',
    executed_at: independentReview.generatedAt,
    filters: ['42 filas no-completion', '49 puntos', '91 distractores', 'Siete MP3 heredados'],
    metric_definitions: [
      'Clave respaldada: el transcript contiene evidencia suficiente para elegir la respuesta marcada.',
      'Distractor descartable: contradicho, degradado explícitamente, asignado a otro referente o ausente.',
      'Salto >0,5: diferencia absoluta superior a 0,5 entre muestras PCM normalizadas consecutivas.',
    ],
  },
};

const artifact = {
  surface: 'report',
  manifest: {
    version: 1,
    surface: 'report',
    title: 'Auditoría de los audios IELTS heredados',
    description: 'Decisión de conservación o reemplazo para los Sets 5–8 y 10–12.',
    generatedAt,
    sources: [source, rawSource, reviewSource],
    cards: [
      { id: 'replacement', dataset: 'summary', sourceId: source.id, metrics: [{ label: 'Reemplazo recomendado', field: 'replacementRecommended', format: 'number' }] },
      { id: 'answers', dataset: 'summary', sourceId: source.id, metrics: [{ label: 'Sets con respuestas 33/33', field: 'answerEvidenceComplete', format: 'number' }] },
      { id: 'timing', dataset: 'summary', sourceId: source.id, metrics: [{ label: 'Sets que pasan tiempos', field: 'officialTimingPassed', format: 'number' }] },
      { id: 'audible', dataset: 'summary', sourceId: source.id, metrics: [{ label: 'Promedio audible (min)', field: 'averageAudibleMinutes', format: 'number' }] },
    ],
    charts: [
      {
        id: 'audible-minutes',
        title: 'Minutos audibles por set',
        subtitle: 'Los siete quedan muy por debajo del mínimo operativo de 16,5 minutos.',
        type: 'horizontalBar',
        intent: 'comparison',
        question: '¿Cuánta señal audible contiene cada archivo?',
        rationale: 'La comparación directa hace visible el relleno de silencio en los MP3 de 24 minutos.',
        comparisonContext: { baseline: '16,5 minutos audibles', grain: 'un MP3 por set', unit: 'minutos' },
        dataset: 'legacySets',
        sourceId: source.id,
        encodings: {
          x: { field: 'setLabel', type: 'nominal', label: 'Set' },
          y: { field: 'audibleMinutes', type: 'quantitative', label: 'Minutos audibles', unit: 'min' },
          tooltip: [
            { field: 'durationMinutes', type: 'quantitative', label: 'Duración total', unit: 'min' },
            { field: 'silencePercent', type: 'quantitative', label: 'Silencio', format: 'percent' },
          ],
        },
        labels: { values: 'all' },
        referenceLines: [{ axis: 'y', value: 16.5, label: 'Mínimo 16,5 min', color: 'red', lineStyle: 'dashed' }],
        layout: 'full',
      },
      {
        id: 'word-error-rate',
        title: 'Diferencia entre audio y guion',
        subtitle: 'WER observado frente al máximo de producción del 8%.',
        type: 'horizontalBar',
        intent: 'comparison',
        question: '¿Qué tan fiel es cada audio al guion congelado?',
        rationale: 'El WER resume inserciones, omisiones y sustituciones detectadas por la transcripción automática.',
        comparisonContext: { baseline: 'WER máximo 8%', grain: 'un MP3 por set', normalization: 'errores / palabras esperadas', unit: 'porcentaje' },
        dataset: 'legacySets',
        sourceId: source.id,
        encodings: {
          x: { field: 'setLabel', type: 'nominal', label: 'Set' },
          y: { field: 'wordErrorRate', type: 'quantitative', label: 'WER', format: 'percent' },
          tooltip: [{ field: 'answers', type: 'text', label: 'Respuestas verificadas' }],
        },
        labels: { values: 'all' },
        referenceLines: [{ axis: 'y', value: 0.08, label: 'Máximo 8%', color: 'red', lineStyle: 'dashed' }],
        layout: 'full',
      },
    ],
    tables: [{
      id: 'set-detail',
      title: 'Resultado por set',
      subtitle: 'Mediciones del archivo público vigente; 33/33 indica respuestas encontradas y en orden.',
      dataset: 'legacySets',
      sourceId: source.id,
      density: 'dense',
      layout: 'full',
      defaultSort: { field: 'setLabel', direction: 'asc' },
      columns: [
        { field: 'setLabel', label: 'Set', type: 'text' },
        { field: 'recommendation', label: 'Decisión', type: 'text' },
        { field: 'scriptWords', label: 'Palabras', format: 'number' },
        { field: 'audibleMinutes', label: 'Audible (min)', format: 'number' },
        { field: 'silencePercent', label: 'Silencio', format: 'percent' },
        { field: 'longestSilenceSeconds', label: 'Pausa máx. (s)', format: 'number' },
        { field: 'wordErrorRate', label: 'WER', format: 'percent' },
        { field: 'answers', label: 'Respuestas', type: 'text' },
        { field: 'decode', label: 'Archivo', type: 'text' },
        { field: 'sampleJumps', label: 'Saltos >0,5', format: 'number' },
      ],
    }],
    blocks: [
      { id: 'opening', type: 'markdown', body: '# Auditoría de los audios IELTS heredados\n\n**Decisión: reemplazar los siete MP3 de los Sets 5–8 y 10–12.** Los archivos se decodifican completos y conservan las respuestas, pero no cumplen la duración útil, la densidad de voz, la longitud de guion ni la fidelidad exigida para producción.', sourceId: source.id },
      { id: 'key-metrics', type: 'metric-strip', cardIds: ['replacement', 'answers', 'timing', 'audible'] },
      { id: 'timing-heading', type: 'markdown', body: '## Duración y silencios\n\nTodos duran exactamente 24 minutos, pero solo contienen entre **8,31 y 9,20 minutos audibles**. Entre **61,66% y 65,36%** de cada archivo es silencio, con pausas individuales de hasta **135,9 segundos**. El patrón es consistente con guiones demasiado cortos extendidos artificialmente.' },
      { id: 'audible-chart-block', type: 'chart', chartId: 'audible-minutes' },
      { id: 'alignment-heading', type: 'markdown', body: '## Correspondencia entre audio, preguntas y respuestas\n\nLas 33 respuestas de completion verificables aparecen en el audio y en el orden esperado en los siete sets. Esa evidencia permite conservar la arquitectura de preguntas y respuestas. Sin embargo, el WER está entre **17,21% y 21,71%**, más del doble del máximo de producción del 8%, por lo que la narración no reproduce el guion con suficiente fidelidad.' },
      { id: 'semantic-review', type: 'markdown', body: '### Revisión de opción múltiple y distractores\n\nUna revisión independiente cubrió las **42 filas no-completion y sus 49 puntos**: 49/49 claves están respaldadas por el transcript, 91/91 distractores se pueden descartar y no apareció ninguna clave ambigua. El ASR aporta la frase decisiva en 41/42 filas. La excepción es **Set 10 Q21**, cuya respuesta `community library` está en el transcript pero fue omitida parcialmente por Whisper; el segmento empieza aproximadamente en **14:18,5** y necesita una escucha puntual si se rescata.', sourceId: reviewSource.id },
      { id: 'wer-chart-block', type: 'chart', chartId: 'word-error-rate' },
      { id: 'detail-heading', type: 'markdown', body: '## Evidencia detallada\n\nLos guiones contienen entre **1.299 y 1.358 palabras**, frente al mínimo de **2.800**. Cada una de las cuatro partes también queda por debajo del piso de 680 palabras. El códec, la frecuencia y el canal son correctos; las diferencias de nivel y pico son secundarias frente a las fallas estructurales.' },
      { id: 'technical-review', type: 'markdown', body: '### Montaje, transiciones y posibles clics\n\nLos siete archivos repiten un molde de **16 pausas largas** distribuido por todo el examen. No se detectó clipping, corte terminal duro ni un clic concluyente justo en una unión silencio–voz. Los saltos fuertes se concentran dentro de la señal: Sets **6 y 10** tienen el mayor riesgo de aspereza; Set **7** es el más limpio. Esto permite rescatar fragmentos seleccionados, pero no salva ninguno de los siete másteres completos.', sourceId: reviewSource.id },
      { id: 'detail-table-block', type: 'table', tableId: 'set-detail' },
      { id: 'recommendation', type: 'markdown', body: '## Acción recomendada\n\n1. Conservar preguntas, answer keys y las evidencias 33/33 como restricciones de construcción.\n2. Ampliar cada guion hasta el rango de producción sin mover ni revelar respuestas.\n3. Generar nuevos audios en staging con el montaje suave ya aprobado.\n4. Ejecutar otra vez hashes, decode completo, tiempos, silencios, niveles, ASR y cobertura Q1–Q40.\n5. Entregar una muestra humana antes de autorizar el lote y mantener los MP3 públicos sin cambios hasta entonces.' },
      { id: 'limits', type: 'markdown', body: '## Alcance y límites\n\nEsta auditoría mide los MP3 públicos vigentes y está ligada a sus hashes. Una modificación del audio invalida la decisión y obliga a repetirla. La detección ASR aporta evidencia fuerte de contenido y orden, pero no sustituye la escucha humana de naturalidad, pronunciación y transiciones antes de publicar.' },
    ],
  },
  snapshot: {
    version: 1,
    generatedAt,
    status: 'ready',
    datasets: { summary, legacySets: rows },
  },
  sources: [source, rawSource, reviewSource],
};

const artifactPath = path.join(outputDir, 'artifact.json');
writeFileSync(artifactPath, `${JSON.stringify(artifact, null, 2)}\n`);
console.log(JSON.stringify({ artifact: artifactPath, source: path.join(outputDir, copiedSourceName) }, null, 2));
