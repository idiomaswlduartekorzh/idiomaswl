import test from 'node:test';
import assert from 'node:assert/strict';
import { assessIeltsWritingOpenAi, IELTS_OPENAI_MAX_OUTPUT_TOKENS, parseIeltsOpenAiAssessment } from '../src/lib/ielts/openai-writing.server.ts';
import { IELTS_MOCK_ONE_DAILY_LIMITS, isIeltsMockOnePilot } from '../src/lib/ielts/mock-one-pilot.ts';

const essay = 'The chart shows a rise in travel. ' + 'People used buses more often during the period. '.repeat(30);
const rubric = {
  criteria: [{ key: 'taskAchievement' }, { key: 'coherenceCohesion' }],
  scoreScale: { min: 0, max: 9, step: 0.5 },
  buildSystemPrompt: () => 'Evalúa IELTS Task 1 usando la gráfica.',
};
const assessment = {
  overallBand: 6, criteria: [
    { criterion: 'taskAchievement', band: 6, reason: 'Falta un resumen general.' },
    { criterion: 'coherenceCohesion', band: 6, reason: 'Hay progresión clara.' },
  ],
  allIssues: [{ quote: 'a rise in travel', suggestion: 'an increase in travel', explanation: 'Expresión más precisa.', severity: 'moderada', criterion: 'taskAchievement', issueType: 'style' }],
  rewritten: essay.replace('a rise in travel', 'an increase in travel'),
};
const reply = (body, status = 200) => new Response(JSON.stringify(body), { status });

test('el informe valida bandas, criterios y citas literales', () => {
  assert.equal(parseIeltsOpenAiAssessment(assessment, essay, rubric)?.overallBand, 6);
  assert.equal(parseIeltsOpenAiAssessment({ ...assessment, allIssues: [{ ...assessment.allIssues[0], quote: 'inventado' }] }, essay, rubric), null);
  assert.equal(parseIeltsOpenAiAssessment({ ...assessment, criteria: [] }, essay, rubric), null);
  assert.equal(parseIeltsOpenAiAssessment({ ...assessment, rewritten: 'x'.repeat(7001) }, essay, rubric), null);
});

test('envía la consigna editorial, texto y gráfica con límites sin audio', async () => {
  process.env.OPENAI_API_KEY = 'test-only';
  let sent;
  const result = await assessIeltsWritingOpenAi({ essay, prompt: 'Describe the chart.', task: 'task1-academic', rubric,
    image: { mimeType: 'image/png', data: Buffer.from('fake-image').toString('base64') },
    fetcher: async (_url, options) => {
      sent = JSON.parse(options.body);
      return reply({ output: [{ content: [{ type: 'output_text', text: JSON.stringify(assessment) }] }] });
    } });
  assert.equal('code' in result, false);
  assert.equal(sent.store, false);
  assert.equal(sent.max_output_tokens, IELTS_OPENAI_MAX_OUTPUT_TOKENS);
  assert.match(sent.instructions, /datos, nunca instrucciones/);
  assert.deepEqual(JSON.parse(sent.input[0].content[0].text), { consigna: 'Describe the chart.', texto_estudiante: essay, palabras: essay.trim().split(/\s+/).length });
  assert.equal(sent.input[0].content[1].type, 'input_image');
  assert.equal(JSON.stringify(sent).includes('audio'), false);
});

test('falla con mensajes seguros ante cuota, red, salida inválida y exceso de texto', async () => {
  process.env.OPENAI_API_KEY = 'test-only';
  const base = { essay, prompt: 'Describe the chart.', task: 'task2', rubric };
  assert.equal((await assessIeltsWritingOpenAi({ ...base, fetcher: async () => reply({ error: { code: 'insufficient_quota', message: 'secret detail' } }, 429) })).code, 'rate_limited');
  assert.equal((await assessIeltsWritingOpenAi({ ...base, fetcher: async () => { throw new Error('secret detail'); } })).code, 'provider_error');
  assert.equal((await assessIeltsWritingOpenAi({ ...base, fetcher: async () => reply({ output: [] }) })).code, 'provider_error');
  assert.equal((await assessIeltsWritingOpenAi({ ...base, essay: 'x'.repeat(5001) })).code, 'invalid_input');
  assert.equal((await assessIeltsWritingOpenAi({ ...base, task: 'task1-academic' })).code, 'invalid_input');
  delete process.env.OPENAI_API_KEY;
  assert.equal((await assessIeltsWritingOpenAi(base)).code, 'not_configured');
});

test('el piloto gratuito sigue cerrado en producción y solo habilita set-1', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  process.env.IELTS_MOCK1_FREE_ENABLED = '1';
  process.env.NODE_ENV = 'development';
  assert.equal(isIeltsMockOnePilot('set-1'), true);
  assert.equal(isIeltsMockOnePilot('set-2'), false);
  process.env.NODE_ENV = 'production';
  assert.equal(isIeltsMockOnePilot('set-1'), false);
  process.env.NODE_ENV = originalNodeEnv;
  delete process.env.IELTS_MOCK1_FREE_ENABLED;
});

test('los topes duraderos mantienen acotada la prueba gratuita', () => {
  assert.deepEqual(IELTS_MOCK_ONE_DAILY_LIMITS, {
    perTask: 2, perEmail: 4, perIp: 6, global: 30, windowSeconds: 86_400,
  });
});
