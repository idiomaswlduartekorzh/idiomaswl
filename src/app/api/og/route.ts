import { ImageResponse } from 'next/og'

export const runtime = 'edge'

const langDisplay = (lang: string) => {
  const map: Record<string, { emoji: string; name: string; color: string }> = {
    ingles: { emoji: '🇬🇧', name: 'Inglés', color: '#0f3d8c' },
    coreano: { emoji: '🇰🇷', name: 'Coreano', color: '#c60c30' },
    frances: { emoji: '🇫🇷', name: 'Francés', color: '#1a2ecc' },
    aleman: { emoji: '🇩🇪', name: 'Alemán', color: '#1a2ecc' },
    italiano: { emoji: '🇮🇹', name: 'Italiano', color: '#009246' },
    portugues: { emoji: '🇵🇹', name: 'Portugués', color: '#166534' },
  }
  return map[lang] ?? { emoji: '🌍', name: lang, color: '#0f3d8c' }
}

const skillDisplay = (skill: string) => {
  const map: Record<string, { emoji: string; name: string }> = {
    lectura: { emoji: '📖', name: 'Lectura' },
    gramatica: { emoji: '📐', name: 'Gramática' },
    escritura: { emoji: '✍️', name: 'Escritura' },
    vocabulario: { emoji: '📚', name: 'Vocabulario' },
    habla: { emoji: '🗣️', name: 'Expresión Oral' },
    escucha: { emoji: '🎧', name: 'Escucha' },
  }
  return map[skill] ?? { emoji: '📚', name: skill }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'practica'
    const lang = searchParams.get('lang') || 'ingles'
    const level = searchParams.get('level') || 'a1'
    const skill = searchParams.get('skill') || 'lectura'
    const title = searchParams.get('title')
    const category = searchParams.get('category')
    const exam = searchParams.get('exam')

    let content

    if (type === 'practica') {
      const langInfo = langDisplay(lang)
      const skillInfo = skillDisplay(skill)
      const levelDisplay = level.toUpperCase()

      content = (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${langInfo.color}15 0%, ${langInfo.color}05 100%)`,
            padding: '60px',
            fontSize: '48px',
            color: '#000',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '30px',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            <span style={{ fontSize: '120px' }}>{langInfo.emoji}</span>
            <span style={{ fontSize: '120px' }}>{skillInfo.emoji}</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '72px', fontWeight: 700, marginBottom: '10px' }}>
              {skillInfo.name} en {langInfo.name}
            </div>
            <div
              style={{
                fontSize: '48px',
                color: langInfo.color,
                fontWeight: 600,
              }}
            >
              Nivel {levelDisplay}
            </div>
            <div style={{ fontSize: '36px', color: '#666', marginTop: '20px' }}>
              Ejercicios interactivos gratis
            </div>
          </div>
          <div
            style={{
              marginTop: '60px',
              fontSize: '32px',
              color: '#999',
            }}
          >
            Idiomas WeLearn
          </div>
        </div>
      )
    } else if (type === 'blog') {
      content = (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '60px',
            color: '#fff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div style={{ fontSize: '64px', fontWeight: 700, textAlign: 'center', marginBottom: '30px', lineHeight: '1.2' }}>
            {title}
          </div>
          {category && (
            <div style={{ fontSize: '36px', opacity: 0.9, marginBottom: '40px', textTransform: 'capitalize' }}>
              {category}
            </div>
          )}
          <div style={{ fontSize: '28px', opacity: 0.8, marginTop: 'auto' }}>
            Idiomas WeLearn — Blog de Educación
          </div>
        </div>
      )
    } else if (type === 'examen') {
      content = (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            padding: '60px',
            color: '#fff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div style={{ fontSize: '96px', fontWeight: 700, marginBottom: '20px' }}>
            {exam?.toUpperCase()}
          </div>
          {level && (
            <div style={{ fontSize: '48px', opacity: 0.9, marginBottom: '40px' }}>
              Nivel {level}
            </div>
          )}
          <div style={{ fontSize: '32px', opacity: 0.8, marginTop: 'auto' }}>
            Preparación y Simulacros
          </div>
        </div>
      )
    } else if (type === 'landing') {
      const langInfo = lang ? langDisplay(lang) : null
      content = (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '60px',
            color: '#fff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {langInfo && (
            <div style={{ fontSize: '96px', marginBottom: '20px' }}>
              {langInfo.emoji}
            </div>
          )}
          <div style={{ fontSize: '64px', fontWeight: 700, textAlign: 'center', marginBottom: '30px' }}>
            {title}
          </div>
          <div style={{ fontSize: '32px', opacity: 0.8, marginTop: 'auto' }}>
            Idiomas WeLearn
          </div>
        </div>
      )
    }

    return new ImageResponse(content || <div>OG Image</div>, {
      width: 1200,
      height: 630,
    })
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}
