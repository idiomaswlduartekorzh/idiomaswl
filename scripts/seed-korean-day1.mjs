/**
 * seed-korean-day1.mjs
 * Sube todos los assets del día 1 de coreano a Supabase Storage
 * y siembra la base de datos con el contenido completo.
 *
 * Uso: node scripts/seed-korean-day1.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

// ── Config ────────────────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://ivqeokuxgxemhydvopdd.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
  ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2cWVva3V4Z3hlbWh5ZHZvcGRkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODc3Mjk3OSwiZXhwIjoyMDk0MzQ4OTc5fQ.eL9nHnTCLd7BXseuXKIcOoOuhqDTqFrj7vG6EljMPA4';

const ASSETS_ROOT = '/Users/josedavidduartesilva/Documents/New project/welearn-platform/apps/web/public/assets/korean/step001';
const BUCKET = 'assets';
const STORAGE_PREFIX = 'korean/step001';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ── Mapa de nombres coreanos → ASCII (Supabase no acepta unicode en paths) ────
const FILENAME_MAP = {
  'audio_가요.mp3':                   'audio_gayo.mp3',
  'audio_나는.mp3':                   'audio_naneun.mp3',
  'audio_대학교.mp3':                 'audio_daehakgyo.mp3',
  'audio_대학교에_가요.mp3':           'audio_daehakgyoe_gayo.mp3',
  'audio_어디.mp3':                   'audio_eodi.mp3',
  'audio_어디_가요.mp3':              'audio_eodi_gayo.mp3',
  'audio_저는.mp3':                   'audio_jeoneun.mp3',
  'audio_저는_대학교에_가요.mp3':      'audio_jeoneun_daehakgyoe_gayo.mp3',
  'audio_집.mp3':                     'audio_jip.mp3',
  'audio_집에_가요.mp3':              'audio_jipe_gayo.mp3',
  'audio_학교.mp3':                   'audio_hakgyo.mp3',
  'audio_학교에_가요.mp3':            'audio_hakgyoe_gayo.mp3',
  // Video grande (>50MB free tier) — skip
  'step001-escucha-sobrevivible.mp4': null,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function mimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  const map = {
    '.mp3': 'audio/mpeg',
    '.m4a': 'audio/mp4',
    '.mp4': 'video/mp4',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
  };
  return map[ext] ?? 'application/octet-stream';
}

function storageUrl(storagePath) {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`;
}

function log(emoji, msg) {
  console.log(`${emoji}  ${msg}`);
}

// ── 1. Crear bucket si no existe ──────────────────────────────────────────────
async function ensureBucket() {
  log('🪣', `Verificando bucket "${BUCKET}"...`);
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
    if (error) throw new Error(`No se pudo crear el bucket: ${error.message}`);
    log('✅', `Bucket "${BUCKET}" creado (público)`);
  } else {
    log('✅', `Bucket "${BUCKET}" ya existe`);
  }
}

// ── 2. Subir archivos ─────────────────────────────────────────────────────────
async function uploadDir(localDir, storageDir) {
  const entries = readdirSync(localDir);
  const results = [];
  for (const entry of entries) {
    if (entry.startsWith('.')) continue;
    const localPath = join(localDir, entry);
    const stat = statSync(localPath);
    if (stat.isDirectory()) {
      if (entry === '_backup_pre_asset_correction_1') continue; // skip backups
      const nested = await uploadDir(localPath, `${storageDir}/${entry}`);
      results.push(...nested);
    } else {
      // Rename if needed; skip if mapped to null
      const safeName = entry in FILENAME_MAP ? FILENAME_MAP[entry] : entry;
      if (safeName === null) {
        log('⏭️ ', `Saltando ${entry} (demasiado grande para free tier)`);
        continue;
      }
      const storagePath = `${storageDir}/${safeName}`;
      const fileBuffer = readFileSync(localPath);
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, fileBuffer, {
          contentType: mimeType(localPath),
          upsert: true,
        });
      if (error) {
        log('❌', `Error subiendo ${storagePath}: ${error.message}`);
      } else {
        log('⬆️ ', storagePath);
        results.push(storagePath);
      }
    }
  }
  return results;
}

// ── 3. Sembrar base de datos ──────────────────────────────────────────────────

// Vocabulario del paso 01 con sus assets reales
const VOCAB_DAY1 = [
  {
    glyph: '학교',
    romanization: 'hak-gyo',
    meaning: 'escuela',
    display_char: '학',
    audio_file: 'audio/audio_hakgyo.mp3',
    image_file: 'kr_step001_school_scene_v1.png',
    sort_order: 1,
  },
  {
    glyph: '저는',
    romanization: 'jeo-neun',
    meaning: 'yo (formal)',
    display_char: '저',
    audio_file: 'audio/audio_jeoneun.mp3',
    image_file: 'kr_step001_i_formal_scene_v1.png',
    sort_order: 2,
  },
  {
    glyph: '가요',
    romanization: 'ga-yo',
    meaning: 'voy / vas / va',
    display_char: '가',
    audio_file: 'audio/audio_gayo.mp3',
    image_file: 'kr_step001_going_scene_v1.png',
    sort_order: 3,
  },
  {
    glyph: '대학교',
    romanization: 'dae-hak-gyo',
    meaning: 'universidad',
    display_char: '대',
    audio_file: 'audio/audio_daehakgyo.mp3',
    image_file: 'kr_step001_university_scene_v1.png',
    sort_order: 4,
  },
  {
    glyph: '집',
    romanization: 'jip',
    meaning: 'casa',
    display_char: '집',
    audio_file: 'audio/audio_jip.mp3',
    image_file: 'kr_step001_home_scene_v1.png',
    sort_order: 5,
  },
  {
    glyph: '어디',
    romanization: 'eo-di',
    meaning: '¿dónde?',
    display_char: '어',
    audio_file: 'audio/audio_eodi.mp3',
    image_file: 'kr_step001_where_are_you_going_scene_v1.png',
    sort_order: 6,
  },
];

// Frases adicionales — audio de contexto (nombres ASCII)
const PHRASES_DAY1 = [
  { text: '어디 가요?',           audio_file: 'audio/audio_eodi_gayo.mp3' },
  { text: '학교에 가요',          audio_file: 'audio/audio_hakgyoe_gayo.mp3' },
  { text: '집에 가요',            audio_file: 'audio/audio_jipe_gayo.mp3' },
  { text: '대학교에 가요',         audio_file: 'audio/audio_daehakgyoe_gayo.mp3' },
  { text: '저는 대학교에 가요',    audio_file: 'audio/audio_jeoneun_daehakgyoe_gayo.mp3' },
  { text: '나는',                  audio_file: 'audio/audio_naneun.mp3' },
];

async function seed() {
  // ── Upsert idioma ──────────────────────────────────────────────────────────
  log('🌐', 'Verificando idioma coreano...');
  const { error: langErr } = await supabase
    .from('languages')
    .upsert({
      code: 'ko',
      slug: 'korean',
      name: 'Coreano',
      native_name: '한국어',
      flag_text: '한',
      lesson_count: 120,
      level_range: 'A1 – B2',
    }, { onConflict: 'code' });
  if (langErr) throw new Error(`languages: ${langErr.message}`);
  log('✅', 'Idioma coreano OK');

  // ── Upsert lección día 1 ───────────────────────────────────────────────────
  log('📚', 'Creando lección día 1...');
  const { data: lesson, error: lessonErr } = await supabase
    .from('lessons')
    .upsert({
      language_code: 'ko',
      day_number: 1,
      title: 'Vocabulario fundamental · ¿Por qué el verbo va al final?',
    }, { onConflict: 'language_code,day_number' })
    .select('id')
    .single();
  if (lessonErr) throw new Error(`lessons: ${lessonErr.message}`);
  log('✅', `Lección creada (id: ${lesson.id})`);

  // ── Upsert step 01 — Activación ───────────────────────────────────────────
  log('🎯', 'Creando paso 01 — Activación...');
  const activationAudioUrl = storageUrl(`${STORAGE_PREFIX}/audio/step001-activation-main.mp3`);
  const dialogueAudioUrl   = storageUrl(`${STORAGE_PREFIX}/audio/dialogue_step001_where_are_you_going.m4a`);
  const videoListeningUrl  = storageUrl(`${STORAGE_PREFIX}/video/step001-escucha-sobrevivible.mp4`);
  const videoPatronUrl     = storageUrl(`${STORAGE_PREFIX}/video/step001-patron-sov.mp4`);

  // Frases con sus URLs construidas
  const phrasesWithUrls = PHRASES_DAY1.map((p) => ({
    text: p.text,
    audio_url: storageUrl(`${STORAGE_PREFIX}/${p.audio_file}`),
  }));

  const { data: step, error: stepErr } = await supabase
    .from('steps')
    .upsert({
      lesson_id: lesson.id,
      step_number: 1,
      type: 'activation',
      name: 'Activación',
      description: 'Introducción al vocabulario nuevo con imagen, audio y forma escrita.',
      duration_min: 6,
      content: {
        audio_main_url: activationAudioUrl,
        audio_dialogue_url: dialogueAudioUrl,
        video_listening_url: videoListeningUrl,
        video_pattern_url: videoPatronUrl,
        podcast_title: '¿Por qué el verbo va al final?',
        podcast_characters: ['Sofía', 'Carlos'],
        phrases: phrasesWithUrls,
        segments: [
          { label: 'Gancho inicial',   at: 0,   icon: '🎯' },
          { label: 'Verbo al final',   at: 44,  icon: '📌' },
          { label: 'Sin artículos',    at: 105, icon: '✂️' },
          { label: 'Alto contexto',    at: 152, icon: '🧠' },
          { label: 'Partícula 에',     at: 176, icon: '🔗' },
          { label: 'Frase completa',   at: 215, icon: '🇰🇷' },
          { label: 'Universidad',      at: 245, icon: '🎓' },
          { label: 'Cierre',           at: 265, icon: '✅' },
        ],
        concepts: [
          {
            id: 'C1', at: 60,  icon: '📌', color: '#6c63ff',
            title: 'El verbo siempre al final',
            body: 'En coreano el verbo cierra la oración. Siempre. Sin excepciones.',
            example: { es: 'Yo a la escuela voy.', kr: '저는 학교에 가요.' },
          },
          {
            id: 'C2', at: 111, icon: '✂️', color: '#ff6b6b',
            title: 'Los artículos desaparecen',
            body: 'En coreano no existe "la", "el", "una" ni "un". El sustantivo va solo.',
            example: { es: 'la escuela → escuela', kr: '학교' },
          },
          {
            id: 'C3', at: 152, icon: '🧠', color: '#fbbf24',
            title: 'Idioma de alto contexto',
            body: 'El coreano confía en que el oyente está prestando atención.',
            example: { es: '¿Cuál escuela? — El contexto lo sabe.', kr: '학교' },
          },
          {
            id: 'C4', at: 176, icon: '🔗', color: '#34d399',
            title: 'La partícula 에 — el rastreador GPS',
            body: 'En español "a" va ANTES. En coreano 에 va DESPUÉS, pegada al sustantivo.',
            example: { es: 'a la escuela', kr: '학교에 (escuela-hacia)' },
          },
        ],
        exercises: [
          {
            id: 'E1', at: 44, type: 'drag',
            title: 'Reordenar — orden SOV',
            question: 'Arrastra las palabras para convertir esta oración al orden coreano:',
            source: '"Yo voy a la escuela."',
            chips: [{ word: 'Yo', idx: 0 }, { word: 'a la escuela', idx: 1 }, { word: 'voy', idx: 2 }],
            correctOrder: [0, 1, 2],
            feedback: { ok: '✅ ¡Exacto! El verbo queda al final.', err: '❌ El orden correcto es: Yo → a la escuela → voy.' },
          },
          {
            id: 'E2', at: 105, type: 'choice',
            title: 'Sin artículos',
            question: '¿Cuál versión se parece más a cómo el coreano diría "voy a la escuela"?',
            choices: [
              { label: 'Voy a la escuela', correct: false },
              { label: 'Voy a una escuela', correct: false },
              { label: 'Voy a escuela', correct: true, note: 'sin artículo' },
              { label: 'Voy escuela', correct: false },
            ],
            feedback: { ok: '✅ Sin "la", sin "el". Solo "escuela".', err: '❌ En coreano no hay artículos.' },
          },
          {
            id: 'E3', at: 200, type: 'choice',
            title: 'La partícula 에',
            question: '¿Cómo sería "escuela-hacia"?',
            choices: [
              { label: '에 학교', correct: false, kr: true },
              { label: '학교에',  correct: true,  kr: true },
              { label: '학교 에', correct: false, kr: true },
              { label: '가요에',  correct: false, kr: true },
            ],
            feedback: { ok: '✅ 학교에 — pegada, sin espacio.', err: '❌ La partícula 에 va siempre DESPUÉS y PEGADA.' },
          },
          {
            id: 'E4', at: 228, type: 'drag',
            title: 'Escucha y ordena',
            question: 'Ordena las partes de la frase completa:',
            source: '저는 학교에 가요',
            chips: [
              { word: '학교에', sub: 'escuela-hacia', idx: 1, kr: true },
              { word: '저는',   sub: 'yo',           idx: 0, kr: true },
              { word: '가요',   sub: 'voy',           idx: 2, kr: true },
            ],
            correctOrder: [0, 1, 2],
            feedback: { ok: '✅ 저는 학교에 가요 — Ya lees coreano.', err: '❌ El orden es: 저는 → 학교에 → 가요.' },
          },
          {
            id: 'E5', at: 265, type: 'drag',
            title: 'Construye la frase',
            question: 'Construye: "Tú vas a la universidad."',
            chips: [
              { word: '가요',    sub: 'vas',              idx: 2, kr: true },
              { word: '대학교에', sub: 'universidad-hacia', idx: 1, kr: true },
              { word: '너는',    sub: 'tú',               idx: 0, kr: true },
              { word: '에 대학교', sub: '⚠ trampa',        idx: 99, kr: true, trap: true },
            ],
            correctOrder: [0, 1, 2],
            feedback: { ok: '✅ 너는 대학교에 가요 — Tu cerebro ya piensa en coreano.', err: '❌ La partícula 에 siempre va después del sustantivo.' },
          },
        ],
      },
    }, { onConflict: 'lesson_id,step_number' })
    .select('id')
    .single();
  if (stepErr) throw new Error(`steps: ${stepErr.message}`);
  log('✅', `Paso 01 creado (id: ${step.id})`);

  // ── Upsert vocab words ─────────────────────────────────────────────────────
  log('📝', 'Insertando vocabulario...');
  for (const word of VOCAB_DAY1) {
    const { error: wErr } = await supabase
      .from('vocab_words')
      .upsert({
        step_id: step.id,
        glyph: word.glyph,
        romanization: word.romanization,
        meaning: word.meaning,
        display_char: word.display_char,
        audio_url: storageUrl(`${STORAGE_PREFIX}/${word.audio_file}`),
        image_url: storageUrl(`${STORAGE_PREFIX}/${word.image_file}`),
        sort_order: word.sort_order,
      }, { onConflict: 'step_id,glyph' });
    if (wErr) {
      log('❌', `vocab ${word.glyph}: ${wErr.message}`);
    } else {
      log('✅', `  ${word.glyph} (${word.meaning})`);
    }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🇰🇷  WeLearn — Seed Coreano Día 1\n');

  try {
    await ensureBucket();

    console.log('\n📁  Subiendo assets a Storage...');
    const uploaded = await uploadDir(ASSETS_ROOT, STORAGE_PREFIX);
    console.log(`\n✅  ${uploaded.length} archivos subidos\n`);

    console.log('🌱  Sembrando base de datos...\n');
    await seed();

    console.log('\n🎉  ¡Listo! El día 1 de coreano está en Supabase.\n');
  } catch (err) {
    console.error('\n💥  Error:', err.message);
    process.exit(1);
  }
}

main();
