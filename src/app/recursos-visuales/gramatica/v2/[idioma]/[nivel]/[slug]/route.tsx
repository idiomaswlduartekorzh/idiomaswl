import { renderGrammarVisual, type GrammarVisualParams } from '@/lib/grammar-visual-response'

export const runtime = 'nodejs'

export async function GET(_request: Request, { params }: { params: Promise<GrammarVisualParams> }) {
  return renderGrammarVisual(await params)
}
