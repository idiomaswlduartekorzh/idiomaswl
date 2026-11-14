import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

type Language = 'en' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'ja' | 'ko'
type Level = 'B2' | 'C1' | 'C2'

const copy: Record<Language, { label: string; title: string; detail: string }> = {
  en: { label: 'WORKPLACE WRITING', title: 'Write through the misunderstanding', detail: 'Read the email. Check the facts. Reply with care.' },
  fr: { label: 'ÉCRITURE PROFESSIONNELLE', title: 'Clarifier le malentendu', detail: 'Lire le courriel. Vérifier les faits. Répondre avec tact.' },
  de: { label: 'SCHREIBEN IM BERUF', title: 'Missverständnisse klären', detail: 'E-Mail lesen. Fakten prüfen. Klar antworten.' },
  it: { label: 'SCRITTURA SUL LAVORO', title: 'Chiarire il malinteso', detail: 'Leggi l’email. Verifica i fatti. Rispondi con tatto.' },
  pt: { label: 'ESCRITA NO TRABALHO', title: 'Esclareça o mal-entendido', detail: 'Leia o e-mail. Confira os fatos. Responda com cuidado.' },
  ru: { label: 'ДЕЛОВОЕ ПИСЬМО', title: 'Разобраться в недоразумении', detail: 'Прочитайте письмо. Сверьте факты. Ответьте точно.' },
  ja: { label: '職場の文章作成', title: '行き違いを、言葉でほどく', detail: 'メールを読み、事実を確かめ、丁寧に返信する。' },
  ko: { label: '직장 글쓰기', title: '오해를 정확하게 풀어내다', detail: '이메일을 읽고, 사실을 확인하고, 신중하게 답장하세요.' },
}

const fontFiles: Partial<Record<Language, string>> = {
  ja: 'welearn-ja-700.ttf',
  ko: 'welearn-ko-700.ttf',
}

export const writingOgSize = { width: 1200, height: 630 }

export async function createWritingOgImage(language: Language, level: Level) {
  const content = copy[language]
  const fontFile = fontFiles[language]
  const font = fontFile ? await readFile(join(process.cwd(), 'public', 'fonts', fontFile)) : null

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: 'linear-gradient(135deg, #10172d 0%, #19264b 70%, #253b70 100%)', color: '#ffffff', fontFamily: font ? 'WeLearn' : 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: 15, background: '#ed6a75', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 700 }}>W</div>
          <span style={{ fontSize: 26, fontWeight: 700 }}>WeLearn</span>
        </div>
        <div style={{ border: '1px solid rgba(255,255,255,0.4)', borderRadius: 14, padding: '10px 20px', fontSize: 29, fontWeight: 700 }}>{level}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ color: '#ffacb2', fontSize: 23, fontWeight: 700, letterSpacing: '0.04em' }}>{content.label}</div>
        <div style={{ fontSize: language === 'ja' || language === 'ko' ? 66 : 62, fontWeight: 700, lineHeight: 1.14, maxWidth: 990 }}>{content.title}</div>
        <div style={{ color: '#d9e3f4', fontSize: language === 'ja' || language === 'ko' ? 25 : 27, lineHeight: 1.35, maxWidth: 1000 }}>{content.detail}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', color: '#afc1df', fontSize: 19 }}>idiomaswl.com</div>
    </div>,
    {
      ...writingOgSize,
      ...(font ? { fonts: [{ name: 'WeLearn', data: font, weight: 700 as const, style: 'normal' as const }] } : {}),
    },
  )
}
