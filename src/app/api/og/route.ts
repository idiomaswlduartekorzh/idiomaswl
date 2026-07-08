export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'practica'

    // Por ahora, usar imagen genérica desde la raíz
    // TODO: Implementar ImageResponse de next/og cuando sea necesario
    // Nota: ImageResponse requiere fonts local y tiene limitaciones de renderizado

    let imageUrl = 'https://www.idiomaswl.com/images/og-default.png'

    if (type === 'practica') {
      const lang = searchParams.get('lang') || 'ingles'
      imageUrl = `https://www.idiomaswl.com/images/og-practica-${lang}.png`
    } else if (type === 'blog') {
      imageUrl = 'https://www.idiomaswl.com/images/og-blog.png'
    } else if (type === 'examen') {
      const exam = searchParams.get('exam') || 'default'
      imageUrl = `https://www.idiomaswl.com/images/og-exam-${exam}.png`
    } else if (type === 'landing') {
      const lang = searchParams.get('lang') || 'default'
      imageUrl = `https://www.idiomaswl.com/images/og-landing-${lang}.png`
    }

    // Redirigir a la imagen en /public
    return Response.redirect(imageUrl, 301)
  } catch (error) {
    console.error('Error in OG route:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}
