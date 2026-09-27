import assert from 'node:assert/strict';
import test from 'node:test';

import {
  diagnosticConfidenceLabel,
  diagnosticLanguageUseIntegrationLabel,
  diagnosticProfileWarningLabel,
  diagnosticSkillStatusLabel,
} from '../src/lib/diagnostic/result-language.ts';

test('result language translates internal warnings into actionable Spanish', () => {
  assert.match(diagnosticProfileWarningLabel('GLOBAL_WITHHELD_INCOMPLETE_EVIDENCE'), /no se publica un nivel global/i);
  assert.match(diagnosticProfileWarningLabel('GLOBAL_WITHHELD_UNEVEN_PROFILE'), /diferencias entre habilidades/i);
  assert.match(diagnosticProfileWarningLabel('UNEVEN_SKILL_PROFILE'), /perfil es desigual/i);
  assert.match(diagnosticProfileWarningLabel('GRAMMAR_WRITING_EVIDENCE_DIVERGES'), /uso gramatical.*difiere materialmente/i);
  assert.match(diagnosticProfileWarningLabel('VOCABULARY_WRITING_EVIDENCE_DIVERGES'), /vocabulario.*difiere materialmente/i);
  assert.equal(diagnosticProfileWarningLabel('Una advertencia editorial específica.'), 'Una advertencia editorial específica.');
  assert.doesNotMatch(diagnosticProfileWarningLabel('GLOBAL_WITHHELD_INCOMPLETE_EVIDENCE'), /GLOBAL_WITHHELD/);
});

test('language-use integration language explains source agreement without implying a level shift', () => {
  assert.match(diagnosticLanguageUseIntegrationLabel({ outcome: 'corroborated' }), /corroborada.*sin cambio automático/i);
  assert.match(diagnosticLanguageUseIntegrationLabel({ outcome: 'adjacent' }), /rango ampliado.*sin cambio automático/i);
  assert.match(diagnosticLanguageUseIntegrationLabel({ outcome: 'divergent' }), /discrepancia material.*sin cambio automático/i);
  assert.match(diagnosticLanguageUseIntegrationLabel({ outcome: 'objective-insufficient' }), /no sustituye la evidencia objetiva/i);
  assert.equal(diagnosticLanguageUseIntegrationLabel({ outcome: 'unknown' }), null);
});

test('measurement status and confidence never imply mastery or certainty', () => {
  assert.equal(diagnosticSkillStatusLabel('not-estimated'), 'estimación no disponible');
  assert.equal(diagnosticSkillStatusLabel('provisional'), 'estimación provisional');
  assert.equal(diagnosticSkillStatusLabel('calibrated'), 'estimación calibrada');
  assert.equal(diagnosticConfidenceLabel(0.647), 'confianza técnica 65%');
  assert.equal(diagnosticConfidenceLabel(null), 'confianza técnica sin estimar');
  assert.equal(diagnosticConfidenceLabel(2), 'confianza técnica sin estimar');
});
