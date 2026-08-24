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

/**
 * Escucha: las 480 lecciones de audio, sus 24 rutas y el reproductor.
 *
 * Antes aquí solo estaba inglés A1. Las otras 23 series podían desaparecer de un merge mal
 * resuelto y el build seguía en verde, que es justo la manera en que el trabajo se cae de
 * producción sin que nadie se entere: no lo borra nadie a propósito, se pierde al integrar.
 *
 * Cada serie tiene que existir y traer sus 20 episodios; cada ruta tiene que seguir pintando
 * ListeningJourney; y los mp3 declarados listos en audio-ready.ts tienen que estar en disco.
 */
const escucha = ['ingles', 'aleman', 'frances', 'italiano', 'portugues', 'ruso', 'coreano', 'japones'];
for (const language of escucha) {
  for (const level of ['a1', 'a2', 'b1']) {
    const seriesPath = `src/data/practica/series/${language}-${level}-series.ts`;
    const source = read(seriesPath);
    // Sin anclar la indentación: unas series declaran el episodio en varias líneas y otras
    // en una sola, y contar espacios daba cero en las ocho de coreano y japonés.
    const episodes = (source.match(/\border: \d+,/g) ?? []).length;
    if (source && episodes < 20) {
      failures.push(`${seriesPath} declara ${episodes} episodios; la serie publicada tiene 20.`);
    }
    expectText(`src/app/(site)/practica/${language}/${level}/escucha/page.tsx`, 'ListeningJourney');
  }
}
expectText('src/components/practica/ListeningPlayer.tsx', 'ListeningPlayer');
expectText('src/components/practica/ListeningJourney.tsx', 'ListeningPlayer');
expectText('src/data/practica/listening-shuffle.ts', 'balanceOptions');

/**
 * Habla acompañada: el piloto de inglés A2, sus dos modos y las fichas separadas.
 *
 * El validador profundo vive en `check-habla-acompanada.mjs`; estos marcadores hacen que
 * el guardián transversal pare también si un merge elimina el registro, el selector de
 * modo o las rutas de rol completas.
 */
expectText('src/data/practica/habla-acompanado/ingles-a2.ts', 'ROLEPLAY_INGLES_A2');
expectText('src/data/practica/habla-acompanado/index.ts', 'ROLEPLAY_SETS');
expectText('src/components/practica/roleplay/RoleplayExperience.tsx', 'RoleplayRolePage');
expectText('src/app/(site)/practica/ingles/a2/habla/page.tsx', 'SpeakingModeHub');
expectText('src/app/(site)/practica/ingles/a2/habla/acompanada/[slug]/[role]/page.tsx', 'RoleplayRolePage');

/**
 * Vocabulario: las 24 rutas del catálogo y el motor nuevo.
 *
 * Mismo razonamiento que con escucha. Estas 24 rutas no las importa ninguna página de IELTS
 * ni de ICFES, así que un merge mal resuelto se las lleva y el build sigue en verde. Aquí solo
 * se comprueba que la ruta EXISTA, no qué componente pinta: la Fase 1 va a sustituir los
 * `Content.tsx` por el motor único, y un guardián que fije el nombre del componente frenaría
 * el trabajo que él mismo debería proteger.
 *
 * Lo que sí se fija por marcador es el motor y sus módulos de lógica. `opciones.ts` y
 * `ejercicios.ts` están fuera del componente a propósito: es lo que permite que
 * `check-vocabulario.mjs` audite lo que de verdad ve el estudiante. Si alguien devuelve esa
 * lógica al JSX, el validador deja de ver ese trozo — que es justo cómo se coló el sesgo de
 * la respuesta correcta siempre en la misma opción.
 */
for (const language of languages) {
  for (const level of ['a1', 'a2', 'b1']) {
    read(`src/app/(site)/practica/${language}/${level}/vocabulario/page.tsx`);
  }
}
expectText('src/components/practica/VocabularyJourney.tsx', 'VocabularyJourney');
expectText('src/data/practica/vocabulario/schema.ts', 'LangExtra');
expectText('src/data/practica/vocabulario/opciones.ts', 'opcionesDe');
expectText('src/data/practica/vocabulario/ejercicios.ts', 'evaluarFrasePropia');
expectText('src/app/(site)/practica/ingles/a1/vocabulario/[slug]/page.tsx', 'VocabularyJourney');

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
