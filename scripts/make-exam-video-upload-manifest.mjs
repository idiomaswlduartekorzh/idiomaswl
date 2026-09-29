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
for (const file of files) {
  const config = JSON.parse(await fs.readFile(path.join(configDir, file), 'utf8'));
  const number = Number(config.set.split('-')[1]);
  const directory = path.join(root, 'output/youtube', `${config.exam}-${config.set}-listening`);
  const video = path.join(directory, `welearn-${config.exam}-${config.set}-full-listening.mp4`);
  const thumbnail = path.join(directory, '00-intro.png');
  try { await fs.access(video); await fs.access(thumbnail); } catch { throw new Error(`Missing output for ${file}; render it first`); }
  const duration = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', video], { encoding: 'utf8' }).trim());
  const ielts = config.exam === 'ielts';
  rows.push({
    exam: config.exam, set: config.set, video, thumbnail, duration,
    title: ielts
      ? `IELTS Listening Practice Test ${number} | Full Audio + 40 Questions | WeLearn`
      : `Goethe-Zertifikat A1 Hören Übungstest ${number} | 15 Aufgaben | WeLearn`,
    description: ielts
      ? `Practice all 40 questions in this full IELTS Academic Listening style test. Read each question block on screen, listen to the complete audio and write your answers.\n\nPractice the same original WeLearn mock: https://idiomaswl.com/examenes/ielts/practica/${config.set}\n\nOriginal WeLearn material. Not affiliated with IELTS, British Council, IDP or Cambridge.\n\n#IELTSListening #IELTSPractice #WeLearn`
      : `Üben Sie Hören A1 mit 15 Aufgaben in drei Teilen. Jede Frage erscheint beim Signalton; bei der Wiederholung bleibt sie sichtbar. Das vollständige Audio ist enthalten.\n\nÜben Sie denselben originalen WeLearn-Test: https://idiomaswl.com/examenes/goethe/practica/${config.set}\n\nOriginales Übungsmaterial von WeLearn. Keine Verbindung zum Goethe-Institut.\n\n#DeutschA1 #Hoeren #WeLearn`,
  });
}
if (rows.length !== 24) throw new Error(`Expected 24 videos; found ${rows.length}`);
const out = path.join(root, 'output/youtube/upload-manifest.json');
await fs.writeFile(out, JSON.stringify({ channel: 'WeLearn | IELTS e inglés', count: rows.length, videos: rows }, null, 2) + '\n');
console.log(`Prepared ${rows.length} video records: ${out}`);
