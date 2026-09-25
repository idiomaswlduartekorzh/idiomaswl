import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { GOETHE_A2_ORIGINAL_SETS } from '../src/data/mocks/goethe-a2-original-sets.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const palette = ['#0f766e', '#1d4ed8', '#b45309', '#7c3aed', '#be123c', '#0369a1', '#4d7c0f', '#a21caf', '#334155'];

const clockIcon = (label, x, y, color) => {
  const [, hourText, minuteText] = label.match(/(\d{1,2}):(\d{2})/) ?? [];
  const hour = Number(hourText) % 12;
  const minute = Number(minuteText);
  const minuteAngle = (minute / 60) * Math.PI * 2;
  const hourAngle = ((hour + minute / 60) / 12) * Math.PI * 2;
  const hand = (angle, length) => [x + Math.sin(angle) * length, y - Math.cos(angle) * length];
  const [mx, my] = hand(minuteAngle, 42);
  const [hx, hy] = hand(hourAngle, 29);
  const ticks = Array.from({ length: 12 }, (_, index) => {
    const angle = (index / 12) * Math.PI * 2;
    const [x1, y1] = hand(angle, 49);
    const [x2, y2] = hand(angle, index % 3 === 0 ? 39 : 43);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${index % 3 === 0 ? 4 : 2}"/>`;
  }).join('');
  return `<circle cx="${x}" cy="${y}" r="56" fill="#fffdf7" stroke="${color}" stroke-width="7"/>${ticks}<line x1="${x}" y1="${y}" x2="${hx}" y2="${hy}" stroke="${color}" stroke-width="8" stroke-linecap="round"/><line x1="${x}" y1="${y}" x2="${mx}" y2="${my}" stroke="${color}" stroke-width="5" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="6" fill="${color}"/>`;
};

const semanticIcon = (label, index, x, y, color) => {
  const value = label.toLowerCase();
  if (/\d{1,2}:\d{2}/.test(value)) return clockIcon(label, x, y, color);
  if (/^raum\b/.test(value)) return `<rect x="${x - 42}" y="${y - 51}" width="84" height="102" rx="6" fill="none" stroke="${color}" stroke-width="8"/><circle cx="${x + 24}" cy="${y + 4}" r="6" fill="${color}"/><text x="${x}" y="${y - 5}" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" font-weight="800" fill="${color}">${escapeXml(label.replace(/\D/g, ''))}</text>`;
  if (/(bäckerei|brot)/.test(value)) return `<path d="M${x - 49} ${y + 28}q-8-48 49-66 57 18 49 66z" fill="none" stroke="${color}" stroke-width="8"/><path d="M${x - 23} ${y - 18}l-9 28M${x + 2} ${y - 24}l-7 30M${x + 27} ${y - 15}l-7 28" stroke="${color}" stroke-width="6" stroke-linecap="round"/>`;
  if (/(café|kaffee)/.test(value)) return `<path d="M${x - 48} ${y - 24}h70v57h-70zM${x + 22} ${y - 13}h14q22 0 22 20t-22 20h-14" fill="none" stroke="${color}" stroke-width="8" stroke-linejoin="round"/><path d="M${x - 26} ${y - 42}q12-14 0-28M${x} ${y - 42}q12-14 0-28" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>`;
  if (/(post|paket|fundbüro)/.test(value)) return `<path d="M${x - 52} ${y - 40}h104v80h-104zM${x - 52} ${y - 40}l52 45 52-45" fill="none" stroke="${color}" stroke-width="8" stroke-linejoin="round"/>`;
  if (/(fahrrad|leihrad)/.test(value)) return `<circle cx="${x - 39}" cy="${y + 24}" r="27" fill="none" stroke="${color}" stroke-width="7"/><circle cx="${x + 41}" cy="${y + 24}" r="27" fill="none" stroke="${color}" stroke-width="7"/><path d="M${x - 39} ${y + 24}l24-43 27 43h-51l25-43h33l22 43M${x - 4} ${y - 31}h20" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;
  if (/(park|wiese|gärtnerei)/.test(value)) return `<path d="M${x} ${y + 50}v-44M${x - 32} ${y + 50}h64" stroke="${color}" stroke-width="9" stroke-linecap="round"/><circle cx="${x}" cy="${y - 22}" r="39" fill="none" stroke="${color}" stroke-width="8"/><circle cx="${x - 30}" cy="${y - 5}" r="25" fill="#fff" stroke="${color}" stroke-width="7"/><circle cx="${x + 31}" cy="${y - 4}" r="25" fill="#fff" stroke="${color}" stroke-width="7"/>`;
  if (/(markt)/.test(value)) return `<path d="M${x - 52} ${y - 19}h104l-12-35h-80zM${x - 43} ${y - 19}v66M${x + 43} ${y - 19}v66M${x - 53} ${y + 47}h106" fill="none" stroke="${color}" stroke-width="8" stroke-linejoin="round"/><path d="M${x - 31} ${y - 54}v35M${x} ${y - 54}v35M${x + 31} ${y - 54}v35" stroke="${color}" stroke-width="5"/>`;
  if (/(vhs|schule|museum|rathaus|bürgerzentrum|theater|studio|radiostudio|bibliothek|buch)/.test(value)) return `<path d="M${x - 55} ${y - 25}l55-34 55 34zM${x - 45} ${y - 20}v62M${x - 15} ${y - 20}v62M${x + 15} ${y - 20}v62M${x + 45} ${y - 20}v62M${x - 57} ${y + 45}h114" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`;
  if (/(bus|bahn|tram|fähre|haltestelle|bahnhof)/.test(value)) return `<rect x="${x - 52}" y="${y - 45}" width="104" height="76" rx="14" fill="none" stroke="${color}" stroke-width="8"/><path d="M${x - 34} ${y - 27}h68v27h-68zM${x - 37} ${y + 47}v-16M${x + 37} ${y + 47}v-16" fill="none" stroke="${color}" stroke-width="7"/><circle cx="${x - 32}" cy="${y + 22}" r="7" fill="${color}"/><circle cx="${x + 32}" cy="${y + 22}" r="7" fill="${color}"/>`;
  if (/(apotheke|gesundheit)/.test(value)) return `<circle cx="${x}" cy="${y}" r="52" fill="none" stroke="${color}" stroke-width="8"/><path d="M${x - 28} ${y}h56M${x} ${y - 28}v56" stroke="${color}" stroke-width="12" stroke-linecap="round"/>`;
  if (/(werk|baumarkt|energie|elektro)/.test(value)) return `<path d="M${x - 43} ${y + 43}l58-58M${x - 24} ${y + 43}l-19-19 65-65 19 19zM${x + 15} ${y - 15}l28 28" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`;
  if (/(schwimm)/.test(value)) return `<path d="M${x - 55} ${y - 8}q18-18 36 0t36 0t36 0M${x - 55} ${y + 22}q18-18 36 0t36 0t36 0M${x - 55} ${y + 50}q18-18 36 0t36 0t36 0" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"/>`;
  if (/(zu fuß)/.test(value)) return `<path d="M${x - 20} ${y - 48}q18 12 8 34l-12 28q-8 19 15 30M${x + 20} ${y - 34}q-17 14-10 31l12 29q7 17-14 27" fill="none" stroke="${color}" stroke-width="9" stroke-linecap="round"/><circle cx="${x - 25}" cy="${y - 60}" r="7" fill="${color}"/><circle cx="${x + 24}" cy="${y - 48}" r="7" fill="${color}"/>`;
  const variant = index % 3;
  if (variant === 0) return `<rect x="${x - 48}" y="${y - 42}" width="96" height="84" rx="14" fill="none" stroke="${color}" stroke-width="8"/><path d="M${x - 20} ${y - 42}v-17h40v17" fill="none" stroke="${color}" stroke-width="7"/>`;
  if (variant === 1) return `<path d="M${x - 46} ${y + 38}h92l-12-70h-68z" fill="none" stroke="${color}" stroke-width="8" stroke-linejoin="round"/><path d="M${x - 21} ${y - 32}q21-29 42 0" fill="none" stroke="${color}" stroke-width="7"/>`;
  return `<path d="M${x - 48} ${y + 36}l48-82 48 82z" fill="none" stroke="${color}" stroke-width="8" stroke-linejoin="round"/><circle cx="${x}" cy="${y + 10}" r="7" fill="${color}"/>`;
};

function optionPlate(options, title, columns = 3) {
  const width = 1536;
  const rows = Math.ceil(options.length / columns);
  const height = rows * 300 + 120;
  const cardWidth = (width - 120 - ((columns - 1) * 36)) / columns;
  const cards = options.map((option, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const x = 60 + col * (cardWidth + 36);
    const y = 90 + row * 300;
    const color = palette[index % palette.length];
    const timeOnly = /\d{1,2}:\d{2}/.test(option);
    return `<g><rect x="${x}" y="${y}" width="${cardWidth}" height="252" rx="24" fill="#ffffff" stroke="#cbd5e1" stroke-width="4"/><circle cx="${x + 44}" cy="${y + 44}" r="25" fill="${color}"/><text x="${x + 44}" y="${y + 53}" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="white">${String.fromCharCode(65 + index)}</text>${semanticIcon(option, index, x + cardWidth / 2, timeOnly ? y + 132 : y + 113, color)}${timeOnly ? '' : `<text x="${x + cardWidth / 2}" y="${y + 207}" text-anchor="middle" font-family="Arial, sans-serif" font-size="27" font-weight="650" fill="#172033">${escapeXml(option)}</text>`}</g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img"><title>${escapeXml(title)}</title><rect width="100%" height="100%" fill="#f8fafc"/><text x="60" y="52" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#334155">${escapeXml(title)}</text>${cards}</svg>`;
}

function schedule(set, candidate) {
  const occupiedA = [[7, 9, 'Früh'], [11, 13, 'Termin'], [16, 18, 'Kurs'], [19, 21, 'Privat']];
  const occupiedB = [[8, 10, 'Arbeit'], [12, 14, 'Termin'], [17, 19, 'Besuch']];
  const blocks = candidate === 'A' ? occupiedA : occupiedB;
  const top = 120;
  const hourHeight = 48;
  const rows = Array.from({ length: 15 }, (_, index) => {
    const hour = index + 7;
    const y = top + index * hourHeight;
    return `<text x="72" y="${y + 31}" font-family="Arial, sans-serif" font-size="24" fill="#475569">${String(hour).padStart(2, '0')}:00</text><line x1="150" y1="${y + hourHeight}" x2="700" y2="${y + hourHeight}" stroke="#dbe4ee" stroke-width="2"/>`;
  }).join('');
  const busy = blocks.map(([start, end, label], index) => {
    const y = top + (Number(start) - 7) * hourHeight + 5;
    const h = (Number(end) - Number(start)) * hourHeight - 10;
    return `<rect x="176" y="${y}" width="494" height="${h}" rx="16" fill="${palette[(set + index) % palette.length]}" opacity="0.9"/><text x="205" y="${y + 36}" font-family="Arial, sans-serif" font-size="25" font-weight="700" fill="white">${label}</text>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="900" viewBox="0 0 760 900" role="img"><title>Terminkarte ${candidate}, Mock ${set}</title><rect width="760" height="900" rx="28" fill="#f8fafc"/><text x="54" y="58" font-family="Arial, sans-serif" font-size="30" font-weight="800" fill="#172033">SAMSTAG · KARTE ${candidate}</text><text x="54" y="92" font-family="Arial, sans-serif" font-size="20" fill="#64748b">Weiße Zeiten sind frei.</text><rect x="150" y="${top}" width="550" height="720" rx="18" fill="white" stroke="#cbd5e1" stroke-width="3"/>${rows}${busy}</svg>`;
}

for (const set of GOETHE_A2_ORIGINAL_SETS) {
  const number = Number(set.id.split('-')[1]);
  const output = path.join(root, 'public/images/goethe', set.id);
  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(path.join(output, 'hoeren-teil2.svg'), optionPlate(set.listening.parts[1].options.map(option => option.label), `Hören Teil 2 · Mock ${number}`));
  set.listening.parts[2].items.forEach((item, index) => {
    fs.writeFileSync(path.join(output, `hoeren-teil3-${index + 1}.svg`), optionPlate(item.options, `Aufgabe ${index + 11}`, 3));
  });
  fs.writeFileSync(path.join(output, 'sprechen-teil3-a.svg'), schedule(number, 'A'));
  fs.writeFileSync(path.join(output, 'sprechen-teil3-b.svg'), schedule(number, 'B'));
}

console.log(`✓ Generated ${GOETHE_A2_ORIGINAL_SETS.length * 8} deterministic Goethe A2 SVG assets.`);
