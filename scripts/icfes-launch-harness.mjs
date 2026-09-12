#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inventory, loadHarness, refreshHarnessDigests, validateHarness } from './lib/icfes-launch-harness-core.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const modeArg = process.argv.find((argument) => argument.startsWith('--mode='));
const mode = modeArg?.slice('--mode='.length) ?? 'check';
const allowedModes = new Set(['check', 'inventory', 'refresh', 'release']);

if (!allowedModes.has(mode)) {
  console.error(`Modo desconocido: ${mode}. Usa check, inventory, refresh o release.`);
  process.exit(2);
}

const harness = mode === 'refresh' ? refreshHarnessDigests(repoRoot) : loadHarness(repoRoot);
const failures = validateHarness(harness);
if (failures.length > 0) {
  console.error(`ICFES launch harness inválido (${failures.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

const result = inventory(harness);
if (mode === 'refresh') {
  console.log('✓ Digests del work order y candidato activo regenerados. No se creó ninguna aprobación ni release.');
}
if (mode === 'inventory') {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

console.log('✓ ICFES launch harness íntegro. Esto valida el control, no aprueba el lanzamiento.');
for (const candidate of result.candidates) {
  console.log(`\n${candidate.candidateId}: ${candidate.state}`);
  for (const [gate, status] of Object.entries(candidate.gates)) console.log(`  ${status.padEnd(7)} ${gate}`);
}
console.log(`\nRelease manifest: ${result.releases} entradas`);

if (mode === 'release' && result.candidates.some(({ releaseReady }) => !releaseReady)) {
  console.error('Lanzamiento bloqueado: al menos un candidato no está READY_FOR_RELEASE.');
  process.exit(3);
}
