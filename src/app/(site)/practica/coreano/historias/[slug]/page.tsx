import type { Metadata } from 'next';
import { HistoriaRoute, historiaMetadata, historiaStaticParams } from '@/components/practica/HistoriaRoute';

const LANG = 'coreano' as const;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return historiaStaticParams(LANG);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return historiaMetadata(LANG, slug);
}

export default async function HistoriaPage({ params }: Props) {
  const { slug } = await params;
  return <HistoriaRoute lang={LANG} slug={slug} />;
}
