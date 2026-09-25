#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ENGLISH_DIAGNOSTIC_BLUEPRINT } from '../src/lib/diagnostic/blueprint.ts';
import { buildDiagnosticPilotRecruitmentPlan } from './lib/diagnostic-pilot-recruitment.mjs';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const readJson = relative => JSON.parse(readFileSync(path.join(root, relative), 'utf8'));
const output = path.join(root, 'docs/diagnostic-pilot-recruitment-plan.json');
const plan = buildDiagnosticPilotRecruitmentPlan({
  criteria: readJson('config/diagnostic/pilot-publication-criteria.json'),
  blueprint: ENGLISH_DIAGNOSTIC_BLUEPRINT,
  bankReadiness: readJson('docs/diagnostic-bank-readiness.json'),
  simulation: readJson('docs/diagnostic-mst-simulation-baseline.json'),
});
const rendered = `${JSON.stringify(plan, null, 2)}\n`;
if (process.argv.includes('--write')) {
  writeFileSync(output, rendered);
  process.stdout.write(`Wrote ${output}\n`);
} else {
  if (!existsSync(output)) throw new Error('Pilot recruitment plan is missing; run with --write.');
  if (readFileSync(output, 'utf8') !== rendered) {
    throw new Error('Pilot recruitment plan is stale; regenerate it with --write.');
  }
  process.stdout.write(`✓ Pilot recruitment floor current: ${plan.routeExposureLowerBounds.simulationExpectedStartedAcrossRoutes} route-balanced simulated starts\n`);
}
