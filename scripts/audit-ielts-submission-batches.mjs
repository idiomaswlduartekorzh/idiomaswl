import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'
import { scoreIeltsObjectiveAnswers } from '../src/lib/ielts/mock-scoring.ts'

const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...value] = argument.replace(/^--/, '').split('=')
  return [key, value.join('=') || 'true']
}))

const baselineCount = Number(args['baseline-count'] ?? 25)
const outputPath = args.output ? path.resolve(args.output) : null
const inputPaths = args.input ? args.input.split(',').map(value => path.resolve(value)) : []
const audioInputPath = args['audio-input'] ? path.resolve(args['audio-input']) : null
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!inputPaths.length && (!url || !serviceRoleKey)) {
  throw new Error('Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.')
}
if (!Number.isInteger(baselineCount) || baselineCount < 0) {
  throw new Error('--baseline-count debe ser un entero no negativo.')
}

const supabase = inputPaths.length ? null : createClient(url, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

let attempts
if (inputPaths.length) {
  attempts = inputPaths.flatMap(inputPath => JSON.parse(fs.readFileSync(inputPath, 'utf8')))
  if (!Array.isArray(attempts)) throw new Error('El archivo de entrada debe contener un arreglo JSON.')
  if (audioInputPath) {
    const audioRows = JSON.parse(fs.readFileSync(audioInputPath, 'utf8'))
    const audioById = new Map(audioRows.map(row => [row.id, row]))
    attempts = attempts.map(row => ({ ...row, ...(audioById.get(row.id) ?? {}) }))
  }
} else {
  const { data, error } = await supabase
    .from('exam_submissions')
    .select('id,user_email,user_name,exam_slug,mock_id,mock_title,content_version,created_at,submission_status,reviewed_at,reviewed_by,reading_band,listening_band,writing_band,speaking_band,total_score,total_label,objective_answers,writing_task1_answer,writing_task2_answer,speaking_audio_paths,speaking_audio_metadata')
    .eq('exam_slug', 'ielts')
    .order('created_at', { ascending: true })
  if (error) throw error
  attempts = data ?? []
}
if (attempts.length < baselineCount) {
  throw new Error(`La base solo contiene ${attempts.length} intentos IELTS; el corte solicitado es ${baselineCount}.`)
}

const mockCache = new Map()

async function getMock(mockId) {
  if (!/^set-(?:[1-9]|1\d|20)$/.test(mockId ?? '')) return null
  if (!mockCache.has(mockId)) {
    const moduleUrl = new URL(`../src/data/mocks/ielts-${mockId}.ts`, import.meta.url)
    mockCache.set(mockId, import(moduleUrl.href).then(module => module.default))
  }
  return mockCache.get(mockId)
}

function wordCount(value) {
  const text = typeof value === 'string' ? value.trim() : ''
  return text ? text.split(/\s+/).length : 0
}

async function inspectAudio(row) {
  if (Number.isInteger(row.audio_expected) && Number.isInteger(row.audio_verified)) {
    return {
      expected: row.audio_expected,
      verified: row.audio_verified,
      issues: Array.isArray(row.audio_issues) ? row.audio_issues : [],
    }
  }
  const paths = row.speaking_audio_paths && typeof row.speaking_audio_paths === 'object' && !Array.isArray(row.speaking_audio_paths)
    ? row.speaking_audio_paths
    : {}
  const metadata = row.speaking_audio_metadata && typeof row.speaking_audio_metadata === 'object' && !Array.isArray(row.speaking_audio_metadata)
    ? row.speaking_audio_metadata
    : {}
  const entries = Object.entries(paths)
  if (!entries.length || !row.mock_id) {
    return { expected: entries.length, verified: 0, issues: entries.length ? ['No se pudo determinar el set del intento.'] : [] }
  }

  const folder = `${row.mock_id}/${row.id}`
  const { data: files, error: listError } = await supabase.storage.from('ielts-speaking-audio').list(folder, { limit: 20 })
  if (listError) return { expected: entries.length, verified: 0, issues: [`No se pudo listar el almacenamiento: ${listError.message}`] }

  const byName = new Map((files ?? []).map(file => [file.name, file]))
  const issues = []
  let verified = 0
  for (const [questionId, storedPath] of entries) {
    const filename = String(storedPath).split('/').pop() ?? ''
    const file = byName.get(filename)
    if (!file) {
      issues.push(`${questionId}: archivo ausente`)
      continue
    }
    const expectedSize = Number(metadata[questionId]?.size)
    const actualSize = Number(file.metadata?.size)
    if (!Number.isFinite(actualSize) || actualSize < 1024) {
      issues.push(`${questionId}: archivo vacío o ilegible`)
      continue
    }
    if (Number.isFinite(expectedSize) && expectedSize !== actualSize) {
      issues.push(`${questionId}: tamaño ${actualSize}, esperado ${expectedSize}`)
      continue
    }
    verified += 1
  }
  return { expected: entries.length, verified, issues }
}

async function auditAttempt(row, index) {
  const mock = await getMock(row.mock_id)
  const objective = mock && row.objective_answers
    ? scoreIeltsObjectiveAnswers(mock, row.objective_answers)
    : null
  const objectiveMatches = objective
    ? Number(row.listening_band) === Number(objective.listening?.band ?? null)
      && Number(row.reading_band) === Number(objective.reading.band)
    : null
  const audio = await inspectAudio(row)

  return {
    batch: index < baselineCount ? 'previous' : 'new',
    id: row.id,
    studentName: row.user_name || 'Sin nombre',
    studentEmail: row.user_email || 'Sin correo',
    mockId: row.mock_id,
    mockTitle: row.mock_title,
    contentVersion: row.content_version,
    createdAt: row.created_at,
    status: row.submission_status,
    reviewedAt: row.reviewed_at,
    reviewedBy: row.reviewed_by,
    stored: {
      listeningBand: row.listening_band == null ? null : Number(row.listening_band),
      readingBand: row.reading_band == null ? null : Number(row.reading_band),
      writingBand: row.writing_band == null ? null : Number(row.writing_band),
      speakingBand: row.speaking_band == null ? null : Number(row.speaking_band),
      overallBand: row.total_score == null ? null : Number(row.total_score),
      label: row.total_label,
    },
    recalculated: objective ? {
      listeningCorrect: objective.listening?.correct ?? null,
      listeningTotal: objective.listening?.total ?? null,
      listeningBand: objective.listening?.band ?? null,
      readingCorrect: objective.reading.correct,
      readingTotal: objective.reading.total,
      readingBand: objective.reading.band,
    } : null,
    objectiveMatches,
    writing: {
      task1Words: Number.isInteger(row.task1_words) ? row.task1_words : wordCount(row.writing_task1_answer),
      task2Words: Number.isInteger(row.task2_words) ? row.task2_words : wordCount(row.writing_task2_answer),
    },
    audio,
  }
}

const audited = []
for (let index = 0; index < attempts.length; index += 1) {
  audited.push(await auditAttempt(attempts[index], index))
}

function summarize(rows) {
  return {
    total: rows.length,
    submitted: rows.filter(row => row.status === 'submitted').length,
    uploading: rows.filter(row => row.status === 'uploading').length,
    objectiveRecalculated: rows.filter(row => row.objectiveMatches !== null).length,
    objectiveMatches: rows.filter(row => row.objectiveMatches === true).length,
    objectiveMismatches: rows.filter(row => row.objectiveMatches === false).length,
    withWriting: rows.filter(row => row.writing.task1Words > 0 || row.writing.task2Words > 0).length,
    withVerifiedAudio: rows.filter(row => row.audio.expected > 0 && row.audio.expected === row.audio.verified).length,
    audioIssues: rows.filter(row => row.audio.issues.length > 0).length,
    reviewed: rows.filter(row => row.reviewedAt).length,
  }
}

const previous = audited.filter(row => row.batch === 'previous')
const current = audited.filter(row => row.batch === 'new')
const report = {
  generatedAt: new Date().toISOString(),
  baselineCount,
  previous: { summary: summarize(previous), attempts: previous },
  new: { summary: summarize(current), attempts: current },
}

if (outputPath) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, { mode: 0o600 })
}

console.log(JSON.stringify({
  generatedAt: report.generatedAt,
  previous: report.previous.summary,
  new: report.new.summary,
  output: outputPath,
}, null, 2))
