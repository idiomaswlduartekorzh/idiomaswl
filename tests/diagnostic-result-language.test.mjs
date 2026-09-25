import assert from 'node:assert/strict';
import test from 'node:test';

import {
  diagnosticConfidenceLabel,
  diagnosticProfileWarningLabel,
  diagnosticSkillStatusLabel,
} from '../src/lib/diagnostic/result-language.ts';

test('result language translates internal warnings into actionable Spanish', () => {
  assert.match(diagnosticProfileWarningLabel('GLOBAL_WITHHELD_INCOMPLETE_EVIDENCE'), /no se publica un nivel global/i);
  assert.match(diagnosticProfileWarningLabel('UNEVEN_SKILL_PROFILE'), /perfil es desigual/i);
  assert.equal(diagnosticProfileWarningLabel('Una advertencia editorial específica.'), 'Una advertencia editorial específica.');
  assert.doesNotMatch(diagnosticProfileWarningLabel('GLOBAL_WITHHELD_INCOMPLETE_EVIDENCE'), /GLOBAL_WITHHELD/);
});

test('measurement status and confidence never imply mastery or certainty', () => {
  assert.equal(diagnosticSkillStatusLabel('not-estimated'), 'estimación no disponible');
  assert.equal(diagnosticSkillStatusLabel('provisional'), 'estimación provisional');
  assert.equal(diagnosticSkillStatusLabel('calibrated'), 'estimación calibrada');
  assert.equal(diagnosticConfidenceLabel(0.647), 'confianza técnica 65%');
  assert.equal(diagnosticConfidenceLabel(null), 'confianza técnica sin estimar');
  assert.equal(diagnosticConfidenceLabel(2), 'confianza técnica sin estimar');
});
