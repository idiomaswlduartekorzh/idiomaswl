import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TOPICS, getTopic, getTopicNav, GRAMMAR_COLOR } from '@/data/practica/italiano-a1-gramatica';
import { grammarTopicMetadata } from '@/lib/practica-metadata';
import { GrammarLessonSchema, QuizSchema } from '@/components/practica/EducationSchema';
import GrammarExplainer from '@/components/practica/GrammarExplainer';
import GrammarQuiz from '@/components/practica/GrammarQuiz';
import XPStreak from '@/components/practica/XPStreak';

interface Props {
  params: Promise<{ topic: string }>;
}

export function generateStaticParams() {
  return TOPICS.map(t => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return grammarTopicMetadata({
    lang: 'italiano',
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
  const url = `https://www.idiomaswl.com/practica/italiano/a1/gramatica/${topic.slug}`;

  return (
    <>
      <GrammarLessonSchema
        name={topic.title}
        url={url}
        description={topic.seoDescription}
        keywords={topic.keywords}
        inLanguage="it"
        course={{ name: 'Gramática de Italiano A1', url: 'https://www.idiomaswl.com/practica/italiano/a1/gramatica' }}
      />
      <QuizSchema
        name={`Ejercicios — ${topic.title}`}
        url={url}
        description={`Ejercicios interactivos con feedback inmediato sobre ${topic.shortTitle.toLowerCase()} en italiano A1.`}
      />

      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/italiano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano A1</Link>
            <span>/</span>
            <Link href="/practica/italiano/a1/gramatica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>📐 Grammatica</Link>
            <span>/</span>
            <span style={{ color, fontWeight: 800 }}>{topic.icon} {topic.shortTitle}</span>
          </div>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <p className="eyebrow" style={{ margin: 0 }}><span className="ink-line" />Grammatica · Italiano A1 · Tema {topic.order} de {TOPICS.length}</p>
            <XPStreak showMotivation />
          </div>
          <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 1.5rem', fontWeight: 700, lineHeight: 1.15 }}>
            {topic.icon} {topic.title}
          </h1>

          {/* Explicación (server-rendered, SEO) */}
          <GrammarExplainer topic={topic} color={color} targetLang="italiano" />

          {/* Ejercicios */}
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: '0 0 1rem', letterSpacing: '-0.02em' }}>
            Ejercicios — practica ahora
          </h2>
          <GrammarQuiz
            questions={topic.questions}
            lang="italiano"
            level="a1"
            skill="gramatica"
            color={color}
          />

          {/* Navegación entre temas */}
          <nav style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', marginTop: '2.25rem', flexWrap: 'wrap' }}>
            {prev ? (
              <Link href={`/practica/italiano/a1/gramatica/${prev.slug}`} style={{ textDecoration: 'none', color: 'inherit', flex: '1 1 200px' }}>
                <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--mono)', marginBottom: '0.2rem' }}>← Tema anterior</div>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.92rem' }}>{prev.icon} {prev.shortTitle}</div>
                </div>
              </Link>
            ) : <span style={{ flex: '1 1 200px' }} />}
            {next ? (
              <Link href={`/practica/italiano/a1/gramatica/${next.slug}`} style={{ textDecoration: 'none', color: 'inherit', flex: '1 1 200px' }}>
                <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, border: `1px solid ${color}33`, background: `${color}08`, textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color, fontFamily: 'var(--mono)', marginBottom: '0.2rem' }}>Tema siguiente →</div>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.92rem' }}>{next.icon} {next.shortTitle}</div>
                </div>
              </Link>
            ) : (
              <Link href="/practica/italiano/a1/gramatica" style={{ textDecoration: 'none', color: 'inherit', flex: '1 1 200px' }}>
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
