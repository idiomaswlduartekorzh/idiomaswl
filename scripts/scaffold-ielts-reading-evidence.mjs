#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { objectiveRows } from './lib/ielts-answer-key-audit.mjs';
import { rankReadingParagraphs } from './lib/ielts-reading-evidence.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...value] = argument.replace(/^--/, '').split('=');
  return [key, value.join('=')];
}));
for (const key of Object.keys(args)) assert.ok(['set', 'output'].includes(key), `Unknown flag: ${key}`);
const setNumber = Number(args.set);
assert.ok(Number.isInteger(setNumber) && setNumber >= 1 && setNumber <= 20, '--set=1..20 is required');
assert.ok(args.output, '--output=/path/to/report.json is required');

const mock = (await import(new URL(`../src/data/mocks/ielts-set-${setNumber}.ts`, import.meta.url))).default;
const sections = mock.sections.filter(section => section.skill === 'reading');
assert.equal(sections.length, 3, `Set ${setNumber} must contain three Reading passages`);
const rows = objectiveRows(mock).filter(row => row.skill === 'reading');
const pointRows = Array.from({ length: 40 }, (_, index) => {
  const number = index + 1;
  const row = rows.find(candidate => number >= candidate.number && number < candidate.number + candidate.weight);
  assert.ok(row, `Missing objective row for Reading Q${number}`);
  return { number, row };
});
const locateQuestion = row => {
  for (const [sectionIndex, section] of sections.entries()) {
    const question = section.questions.find(candidate => row.key === candidate.id || row.key.startsWith(`${candidate.id}__`));
    if (question) return { section, sectionIndex, question };
  }
  throw Error(`Cannot locate ${row.key}`);
};
const literalAnswers = answers => {
  const judgement = new Set(['true', 'false', 'yes', 'no', 'not given']);
  return answers.every(answer => judgement.has(String(answer).trim().toLowerCase())) ? [] : answers.map(String);
};
const pointContext = (question, number, row) => {
  if (question.type === 'formgroup') {
    const line = question.template.split('\n').find(candidate => candidate.includes(`{{${number}}}`)) ?? question.template;
    return { prompt: `${question.groupLabel}\n${line}`, answerTexts: row.accepted.map(String), literalAnswers: literalAnswers(row.accepted) };
  }
  if (question.type === 'tablegroup') {
    const rowCells = question.rows.find(cells => cells.some(cell => typeof cell !== 'string' && cell.num === number)) ?? [];
    return { prompt: `${question.groupLabel}\n${rowCells.map(cell => typeof cell === 'string' ? cell : `{{${cell.num}}}`).join(' ')}`, answerTexts: row.accepted.map(String), literalAnswers: literalAnswers(row.accepted) };
  }
  if (question.type === 'matching') {
    const item = question.items.find(candidate => candidate.num === number);
    const ending = question.endings.find(candidate => candidate.letter === item.answer);
    return { prompt: `${question.groupLabel ?? ''}\n${item.stem}`, answerTexts: [ending?.text ?? item.answer], literalAnswers: [] };
  }
  if (question.type === 'multiselect') {
    const letter = question.answers[number - question.qRange[0]];
    const option = question.options.find(candidate => candidate.letter === letter);
    return { prompt: question.text, answerTexts: [option?.text ?? letter], literalAnswers: [] };
  }
  if (question.type === 'mcq' || question.type === 'dialog') {
    return { prompt: question.text, answerTexts: [question.options[question.answer]], literalAnswers: [] };
  }
  throw Error(`Unsupported Reading type ${question.type}`);
};
const evidence = pointRows.map(({ number, row }) => {
  const { section, sectionIndex, question } = locateQuestion(row);
  const context = pointContext(question, number, row);
  const candidates = rankReadingParagraphs(section.passage, `${context.prompt}\n${context.answerTexts.join(' ')}`, context.literalAnswers);
  return {
    question: number,
    passagePart: sectionIndex + 1,
    responseKey: row.key,
    responseKind: row.kind,
    prompt: context.prompt,
    candidateAcceptedAnswers: context.answerTexts,
    machineCandidates: candidates,
    literalAnswerFound: context.literalAnswers.length ? candidates.some(candidate => candidate.literalMatches.length > 0) : null,
    status: 'PENDING_HUMAN_REVIEW',
  };
});
const sha256 = value => createHash('sha256').update(value).digest('hex');
const passages = sections.map(section => ({ part: section.part, passage: section.passage ?? '' }));
const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  set: setNumber,
  source: `src/data/mocks/ielts-set-${setNumber}.ts`,
  readingSha256: sha256(JSON.stringify(passages)),
  objectiveSha256: sha256(JSON.stringify(objectiveRows(mock))),
  questions: evidence,
  summary: {
    questions: evidence.length,
    literalCompletionAnswers: evidence.filter(item => item.literalAnswerFound !== null).length,
    literalCompletionAnswersFound: evidence.filter(item => item.literalAnswerFound === true).length,
  },
  releaseAuthorized: false,
};
const outputPath = path.resolve(args.output);
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ output: outputPath, evidenceSha256: sha256(fs.readFileSync(outputPath)), ...report.summary }, null, 2));
