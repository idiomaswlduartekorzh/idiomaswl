import Link from 'next/link'

export default function EnglishGrammarIndexCta({ level, topicCount }: { level: string; topicCount: number }) {
  return (
    <aside className="english-index-cta" aria-label={`Ruta recomendada de inglés ${level.toUpperCase()}`}>
      <div>
        <span>Ruta completa · {topicCount} temas</span>
        <h2>¿No sabes por dónde empezar?</h2>
        <p>Haz la prueba automática de nivel gratuita y entra directamente al nivel y a los temas que necesitas reforzar.</p>
      </div>
      <div>
        <Link href="/nivel-radar" data-english-cta="index-level-test">Descubrir mi nivel gratis</Link>
        <Link href="/practica/ingles/recursos" data-english-cta="index-resources">PDFs y listas gratis</Link>
        <Link href="/clases-de-ingles" data-english-cta="index-classes">Ver clases de inglés</Link>
      </div>
    </aside>
  )
}
