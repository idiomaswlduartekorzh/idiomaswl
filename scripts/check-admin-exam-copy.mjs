import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const primaryAdmins = ['david.duartes182@gmail.com', 'zhanna.duarte@mail.ru']
const studentOnlyAccounts = ['welearninstitute@gmail.com']

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

const adminRegistry = read('src/lib/config/admins.ts')
const adminRoute = read('src/app/(site)/dashboard/admin/page.tsx')
const operationalDashboard = read('src/app/(site)/dashboard/admin/JoseDashboardServer.tsx')

for (const email of primaryAdmins) {
  assert.match(adminRegistry, new RegExp(email.replace('.', '\\.'), 'i'), `${email} must be in the server admin registry`)
}

for (const email of studentOnlyAccounts) {
  assert.doesNotMatch(adminRegistry, new RegExp(email.replace('.', '\\.'), 'i'), `${email} must not be in the server admin registry`)
}

assert.match(adminRoute, /isVerifiedAdminUser\(user\)[\s\S]*JoseDashboardServer/, 'all verified admins must receive the same operational dashboard')
assert.doesNotMatch(adminRoute, /ZhannaDashboardServer/, 'the admin route must not branch into a demo dashboard')
assert.equal(fs.existsSync(path.join(root, 'src/app/(site)/dashboard/admin/ZhannaDashboard.tsx')), false, 'the demo dashboard must not remain in the application')
assert.match(adminRegistry, /Boolean\(user\?\.email_confirmed_at\) && isAdminEmail\(user\?\.email\)/, 'admin access requires a confirmed email')
assert.match(operationalDashboard, /await requireAdmin\(\)/, 'the operational dashboard must re-authorize on the server')
assert.match(operationalDashboard, /createAdminClient\(\)/, 'the operational dashboard must not depend on profile-role RLS')

const copyFiles = [
  'src/app/(site)/examenes/page.tsx',
  'src/app/(site)/examenes/[exam]/page.tsx',
  'src/app/(site)/examenes/[exam]/MockGrid.tsx',
  'src/app/(site)/examenes/opengraph-image.tsx',
  'src/components/exam-runner/IELTSSubmission.tsx',
  'src/components/labs/IELTSSummaryReport.tsx',
  'src/app/(review)/evaluacion-ielts/[token]/page.tsx',
  'src/app/(review)/evaluacion-ielts/[token]/ReviewSubmissionForm.tsx',
  'src/app/(site)/dashboard/admin/IELTSDelegatedReviewCallout.tsx',
  'src/app/(site)/dashboard/admin/IELTSReviewPanel.tsx',
  'src/app/(site)/dashboard/admin/TOEFLReviewPanel.tsx',
  'src/lib/ielts/delegated-review.server.ts',
  'src/lib/ielts/delegated-review.ts',
]

const forbidden = [
  /\bChatGPT\b/i,
  /\bClaude\b/i,
  /\bIA\b/i,
  /inteligencia artificial/i,
]

for (const relativePath of copyFiles) {
  const source = read(relativePath)
  for (const pattern of forbidden) {
    assert.doesNotMatch(source, pattern, `${relativePath} must use neutral academic language`)
  }
}

assert.match(read('src/app/(site)/examenes/page.tsx'), /retroalimentación personalizada/i)

const auditRoute = read('src/app/api/admin/ielts/audit/route.ts')
assert.match(auditRoute, /await requireAdmin\(\)/, 'the batch audit endpoint must require a server-authorized admin')
assert.match(auditRoute, /private, no-store/, 'the batch audit endpoint must never cache student records')
assert.match(read('src/lib/ielts/submission-audit.server.ts'), /scoreIeltsObjectiveAnswers/, 'the audit must recalculate objective answers from the canonical key')
assert.match(read('src/lib/ielts/submission-audit.server.ts'), /IELTS_SPEAKING_BUCKET/, 'the audit must verify private speaking audio')

console.log('✓ Todos los administradores comparten el centro operativo, las cuentas estudiantiles siguen aisladas y los exámenes usan lenguaje académico neutral.')
