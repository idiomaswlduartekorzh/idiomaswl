#!/usr/bin/env node
/** Prepare reviewable YouTube titles, descriptions and local file paths. Never uploads. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configDir = path.join(root, 'config/exam-videos');
const files = (await fs.readdir(configDir)).filter(name => name.endsWith('.json')).sort((a, b) => {
  const [, examA, numberA] = a.match(/^(ielts|goethe)-(?:set|a1)-(\d+)\.json$/) ?? [];
  const [, examB, numberB] = b.match(/^(ielts|goethe)-(?:set|a1)-(\d+)\.json$/) ?? [];
  return examA.localeCompare(examB) || Number(numberA) - Number(numberB);
});
const rows = [];
const timestamp = (seconds) => {
  const value = Math.floor(seconds);
  const minutes = `${String(Math.floor(value / 60) % 60).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`;
  return value < 3600 ? minutes : `${String(Math.floor(value / 3600)).padStart(2, '0')}:${minutes}`;
};
for (const file of files) {
  const config = JSON.parse(await fs.readFile(path.join(configDir, file), 'utf8'));
  const number = Number(config.set.split('-')[1]);
  const directory = path.join(root, 'output/youtube', `${config.exam}-${config.set}-listening`);
  const video = path.join(directory, `welearn-${config.exam}-${config.set}-full-listening.mp4`);
  const timeline = JSON.parse(await fs.readFile(path.join(directory, 'timeline.json'), 'utf8'));
  const hasAnswers = timeline.scenes.some(scene => scene.name === '90-answer-intro');
  const thumbnail = path.join(directory, hasAnswers ? 'thumbnail.png' : '00-intro.png');
  try { await fs.access(video); await fs.access(thumbnail); } catch { throw new Error(`Missing output for ${file}; render it first`); }
  const duration = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', video], { encoding: 'utf8' }).trim());
  if (Math.abs(duration - timeline.videoDuration) > 0.3) throw new Error(`Video and timeline disagree for ${file}`);
  const ielts = config.exam === 'ielts';
  const parts = ielts
    ? [1, 2, 3, 4].map(part => ({ part, at: 20 + config.pages.find(page => page.part === part)?.at }))
    : [1, 2, 3].map(part => ({ part, at: 20 + (part === 1 ? 0 : config.parts[part - 1]) }));
  if (parts.some(part => !Number.isFinite(part.at))) throw new Error(`Missing part timing for ${file}`);
  const chapters = [
    `00:00 ${ielts ? 'IELTS Listening — Instructions' : 'Goethe A1 Hören — Anleitung'}`,
    ...parts.map(({ part, at }) => `${timestamp(at)} ${ielts ? 'Part' : 'Teil'} ${part}`),
    ...(hasAnswers ? timeline.scenes.filter(scene => scene.name === '90-answer-intro' || scene.name.startsWith('91-answers-part-')).map(scene =>
      `${timestamp(scene.start)} ${scene.name === '90-answer-intro' ? (ielts ? 'Answer key starts next' : 'Lösungen folgen') : `${ielts ? 'Answers Part' : 'Lösungen Teil'} ${scene.name.split('-').at(-1)}`}`) : []),
  ];
  const mock = ielts ? (await import(path.join(root, 'src/data/mocks', `ielts-${config.set}.ts`))).default : null;
  const topics = ielts ? mock.sections.filter(section => section.skill === 'listening').map(section => section.title.replace(/^Listening — Section \d+: /, '')).join(' · ') : '';
  rows.push({
    exam: config.exam, set: config.set, video, thumbnail, duration, hasAnswers, chapters,
    title: ielts
      ? `IELTS Listening Practice Test ${number} | 40 Questions${hasAnswers ? ' + Answers' : ''} | WeLearn`
      : `Goethe A1 Hören Übungstest ${number} | 15 Aufgaben${hasAnswers ? ' mit Lösungen' : ''} | WeLearn`,
    description: ielts
      ? `IELTS Listening practice test ${number}: full audio, 40 questions in four parts${hasAnswers ? ', and the answer key at the end for self-scoring' : ''}. Read each question block on screen and write your answers as you listen.\n\nTopics: ${topics}.\n\nCHAPTERS\n${chapters.join('\n')}\n\nPractice the same original WeLearn mock and check accepted answer variants: https://idiomaswl.com/examenes/ielts/practica/${config.set}\n\nOriginal WeLearn material. Not affiliated with IELTS, British Council, IDP or Cambridge.\n\n#IELTSListening #IELTSPractice #WeLearn`
      : `Deutsch A1 Hören Übungstest ${number}: vollständiges Audio, 15 Aufgaben in drei Teilen${hasAnswers ? ' und Lösungen am Ende zur Selbstkontrolle' : ''}. Jede Frage erscheint beim Signalton und bleibt bei der Wiederholung sichtbar.\n\nKAPITEL\n${chapters.join('\n')}\n\nÜben Sie denselben originalen WeLearn-Test: https://idiomaswl.com/examenes/goethe/practica/${config.set}\n\nOriginales Übungsmaterial von WeLearn. Keine Verbindung zum Goethe-Institut.\n\n#DeutschA1 #Hoeren #WeLearn`,
  });
}
if (rows.length !== 24) throw new Error(`Expected 24 videos; found ${rows.length}`);
const out = path.join(root, 'output/youtube/upload-manifest.json');
await fs.writeFile(out, JSON.stringify({ channel: 'WeLearn | IELTS e inglés', count: rows.length, videos: rows }, null, 2) + '\n');
console.log(`Prepared ${rows.length} video records: ${out}`);
