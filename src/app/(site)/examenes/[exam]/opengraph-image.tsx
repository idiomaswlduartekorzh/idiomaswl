import { ImageResponse } from 'next/og'
import { EXAMS } from '@/data/exams'

export const alt = 'Guías y simulacros de exámenes de Idiomas WeLearn'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ exam: string }> }) {
  const { exam: slug } = await params
  const exam = EXAMS[slug] ?? EXAMS.sat
  const isSat = exam.slug === 'sat'

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0d0d14', color: '#fff', padding: '68px 76px', fontFamily: 'system-ui, sans-serif', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 620, height: 620, borderRadius: '50%', background: exam.color, opacity: 0.18, top: -280, right: -80 }} />
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 16, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c7c7d4', marginBottom: 30 }}>
            Idiomas WeLearn · preparación de exámenes
          </div>
          <div style={{ fontSize: 72, lineHeight: 1.02, letterSpacing: '-0.045em', fontWeight: 850, maxWidth: 980 }}>
            {isSat ? 'SAT digital en español' : `${exam.name}: guía y simulacros`}
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: '#d9d9e5', marginTop: 26, maxWidth: 880 }}>
            {isSat ? 'Simulacro adaptativo gratis · 54 preguntas · 10 guías' : exam.tagline}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: 24, position: 'relative' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            {(isSat ? ['Reading and Writing', '2 módulos', '64 minutos'] : [exam.language, exam.totalTime]).map(label => (
              <span key={label} style={{ border: '1px solid rgba(255,255,255,0.18)', borderRadius: 999, padding: '8px 14px', fontSize: 15, color: '#ececf4' }}>{label}</span>
            ))}
          </div>
          <div style={{ fontSize: 20, fontWeight: 750, color: exam.color }}>idiomaswl.com</div>
        </div>
      </div>
    ),
    size,
  )
}
