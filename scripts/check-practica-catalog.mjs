import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const languages = ['ingles', 'frances', 'aleman', 'italiano', 'portugues', 'ruso', 'coreano', 'japones'];
const minimumTopics = {
  ingles: { a1: 25, a2: 20, b1: 20 },
  frances: { a1: 18, a2: 20, b1: 20 },
  aleman: { a1: 20, a2: 20, b1: 20 },
  italiano: { a1: 18, a2: 20, b1: 6 },
  portugues: { a1: 18, a2: 20, b1: 20 },
  ruso: { a1: 20, a2: 20, b1: 20 },
  coreano: { a1: 20, a2: 20, b1: 20 },
  japones: { a1: 20, a2: 20, b1: 20 },
};

const failures = [];

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`Falta el archivo protegido: ${relativePath}`);
    return '';
  }
  return fs.readFileSync(absolutePath, 'utf8');
}

function expectText(relativePath, marker) {
  const source = read(relativePath);
  if (source && !source.includes(marker)) {
    failures.push(`${relativePath} ya no contiene su marcador protegido: ${marker}`);
  }
}

for (const language of languages) {
  for (const [level, minimum] of Object.entries(minimumTopics[language])) {
    const indexPath = `src/data/grammar/${language}/${level}/index.ts`;
    const source = read(indexPath);
    const topicCount = (source.match(/^import (?!type\b)/gm) ?? []).length;

    if (topicCount < minimum) {
      failures.push(`${language}/${level} tiene ${topicCount} temas; el catálogo protegido exige al menos ${minimum}.`);
    }

    const routePath = `src/app/(site)/practica/${language}/${level}/gramatica/[slug]/page.tsx`;
    expectText(routePath, "getTopicsByLevel");
  }
}

expectText('src/data/grammar/registry.ts', 'grammarRegistry');
expectText('src/app/sitemap.ts', 'GRAMMAR_ENTRIES');

// Estas áreas no pertenecen a la restauración de gramática. Si desaparecen,
// detener la publicación aunque el catálogo gramatical siga íntegro.
expectText('src/data/practica/ingles-a1-listening.ts', 'LISTENING_A1');
expectText('src/app/(site)/practica/ingles/a1/escucha/page.tsx', 'LISTENING_A1');
expectText('src/app/(site)/nivel-radar/page.tsx', 'NivelRadarClient');
expectText('src/app/(site)/practica/ielts/IELTSHubClient.tsx', 'IELTS Academic');
expectText('src/app/(site)/practica/ielts/academic/writing/task1/page.tsx', 'Task 1');
expectText('src/app/(site)/practica/icfes-saber-11/IcfesHubClient.tsx', 'IcfesAdaptiveGame');
expectText('src/data/icfes-smart-route.ts', 'ICFES_SMART_BANK_SUMMARY');

if (failures.length) {
  console.error('La integridad de práctica falló:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  const total = Object.values(minimumTopics).flatMap((levels) => Object.values(levels)).reduce((sum, count) => sum + count, 0);
  console.log(`Catálogo de práctica íntegro: ${total} temas de gramática y módulos protegidos verificados.`);
}
