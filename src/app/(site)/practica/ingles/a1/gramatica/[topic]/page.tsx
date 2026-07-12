import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TOPICS, getTopic, getTopicNav, GRAMMAR_COLOR } from '@/data/practica/ingles-a1-gramatica';
import { grammarTopicMetadata } from '@/lib/practica-metadata';
import { GrammarLessonSchema, QuizSchema, FAQSchema } from '@/components/practica/EducationSchema';
import GrammarExplainer from '@/components/practica/GrammarExplainer';
import GrammarQuest from '@/components/practica/GrammarQuest';
import XPStreak from '@/components/practica/XPStreak';
import LessonPdfButton from '@/components/practica/LessonPdfButton';

interface Props {
  params: Promise<{ topic: string }>;
}

export function generateStaticParams() {
  return TOPICS.map(t => ({ topic: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return grammarTopicMetadata({
    lang: 'ingles',
    level: 'a1',
    slug: topic.slug,
    title: topic.seoTitle,
    description: topic.seoDescription,
    keywords: topic.keywords,
  });
}

export default async function Page({ params }: Props) {
  const { topic: slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const { prev, next } = getTopicNav(slug);
  const color = GRAMMAR_COLOR;
  const url = `https://www.idiomaswl.com/practica/ingles/a1/gramatica/${topic.slug}`;

  return (
    <>
      <GrammarLessonSchema
        name={topic.title}
        url={url}
        description={topic.seoDescription}
        keywords={topic.keywords}
      />
      <QuizSchema
        name={`Ejercicios — ${topic.title}`}
        url={url}
        description={`Quest progresiva de ejercicios sobre ${topic.shortTitle.toLowerCase()} en inglés A1, con niveles, revisión y práctica de errores frecuentes.`}
      />
      {topic.faq && topic.faq.length > 0 && <FAQSchema items={topic.faq} />}

      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/ingles/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés A1</Link>
            <span>/</span>
            <Link href="/practica/ingles/a1/gramatica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>📐 Gramática</Link>
            <span>/</span>
            <span style={{ color, fontWeight: 800 }}>{topic.icon} {topic.shortTitle}</span>
          </div>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <p className="eyebrow" style={{ margin: 0 }}><span className="ink-line" />Grammar · Inglés A1 · Tema {topic.order} de {TOPICS.length}</p>
            <XPStreak showMotivation />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', margin: '0 0 1.5rem' }}>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700, lineHeight: 1.15, flex: '1 1 auto' }}>
              {topic.icon} {topic.title}
            </h1>
            <LessonPdfButton topic={topic} levelLabel="Inglés A1" skillLabel="Gramática" url={url} color={color} />
          </div>

          {/* Explicación (server-rendered, SEO) */}
          <GrammarExplainer topic={topic} color={color} />

          {/* Ejercicios */}
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: '0 0 1rem', letterSpacing: '-0.02em' }}>
            Ejercicios — quest progresiva
          </h2>
          <GrammarQuest
            topic={topic}
            lang="ingles"
            level="a1"
            skill="gramatica"
            color={color}
          />

          {/* Navegación entre temas */}
          <nav style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', marginTop: '2.25rem', flexWrap: 'wrap' }}>
            {prev ? (
              <Link href={`/practica/ingles/a1/gramatica/${prev.slug}`} style={{ textDecoration: 'none', color: 'inherit', flex: '1 1 200px' }}>
                <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--mono)', marginBottom: '0.2rem' }}>← Tema anterior</div>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.92rem' }}>{prev.icon} {prev.shortTitle}</div>
                </div>
              </Link>
            ) : <span style={{ flex: '1 1 200px' }} />}
            {next ? (
              <Link href={`/practica/ingles/a1/gramatica/${next.slug}`} style={{ textDecoration: 'none', color: 'inherit', flex: '1 1 200px' }}>
                <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, border: `1px solid ${color}33`, background: `${color}08`, textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color, fontFamily: 'var(--mono)', marginBottom: '0.2rem' }}>Tema siguiente →</div>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.92rem' }}>{next.icon} {next.shortTitle}</div>
                </div>
              </Link>
            ) : (
              <Link href="/practica/ingles/a1/gramatica" style={{ textDecoration: 'none', color: 'inherit', flex: '1 1 200px' }}>
                <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, border: `1px solid ${color}33`, background: `${color}08`, textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color, fontFamily: 'var(--mono)', marginBottom: '0.2rem' }}>Terminaste los temas →</div>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.92rem' }}>Ver todos los temas</div>
                </div>
              </Link>
            )}
          </nav>
        </div>
      </section>
    </>
  );
}
