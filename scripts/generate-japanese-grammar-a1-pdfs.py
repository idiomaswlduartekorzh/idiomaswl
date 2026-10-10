#!/usr/bin/env python3
"""Generate the printable Japanese grammar workbooks used by the site."""

import argparse
import json
import re
import sys
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tmp' / 'python-packages'))

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, KeepTogether, PageBreak, PageTemplate,
    Paragraph, Spacer, Table, TableStyle,
)

PARSER = argparse.ArgumentParser()
PARSER.add_argument('--level', choices=('a1', 'a2', 'b1'), default='a1')
ARGS = PARSER.parse_args()
LEVEL = ARGS.level
LEVEL_LABEL = LEVEL.upper()
DATA = ROOT / 'tmp' / f'japanese-grammar-{LEVEL}' / 'topics.json'
OUT = ROOT / 'public' / 'downloads' / f'japanese-{LEVEL}' / 'grammar'
FONT_REGULAR = ROOT / 'public' / 'fonts' / 'welearn-ja-400.ttf'
FONT_BOLD = ROOT / 'public' / 'fonts' / 'welearn-ja-700.ttf'
LOGO = ROOT / 'public' / 'images' / 'welearn-pdf-mark.png'

NAVY = colors.HexColor('#10266b')
BLUE = colors.HexColor('#0f3d8c')
RED = colors.HexColor('#e53935')
INK = colors.HexColor('#182653')
MUTED = colors.HexColor('#64708f')
LINE = colors.HexColor('#d9deeb')
CREAM = colors.HexColor('#f7f4ec')
PALE_BLUE = colors.HexColor('#f1f5ff')
PALE_RED = colors.HexColor('#fff3f3')
PAGE_W, PAGE_H = A4

pdfmetrics.registerFont(TTFont('WeLearnJP', str(FONT_REGULAR)))
pdfmetrics.registerFont(TTFont('WeLearnJP-Bold', str(FONT_BOLD)))


def p(text, style):
    return Paragraph(escape(str(text)).replace('\n', '<br/>'), style)


STYLES = {
    'eyebrow': ParagraphStyle('eyebrow', fontName='WeLearnJP-Bold', fontSize=8.5, leading=11, textColor=RED, spaceAfter=5),
    'title': ParagraphStyle('title', fontName='WeLearnJP-Bold', fontSize=23, leading=29, textColor=NAVY, spaceAfter=7),
    'lead': ParagraphStyle('lead', fontName='WeLearnJP', fontSize=10, leading=15, textColor=INK, spaceAfter=9),
    'h1': ParagraphStyle('h1', fontName='WeLearnJP-Bold', fontSize=16, leading=21, textColor=NAVY, spaceBefore=8, spaceAfter=8),
    'h2': ParagraphStyle('h2', fontName='WeLearnJP-Bold', fontSize=10.2, leading=13, textColor=BLUE, spaceBefore=5, spaceAfter=3),
    'body': ParagraphStyle('body', fontName='WeLearnJP', fontSize=8.2, leading=11.8, textColor=INK, spaceAfter=4),
    'small': ParagraphStyle('small', fontName='WeLearnJP', fontSize=7.5, leading=10, textColor=MUTED),
    'formula': ParagraphStyle('formula', fontName='WeLearnJP-Bold', fontSize=13, leading=19, textColor=NAVY, alignment=TA_CENTER),
    'model': ParagraphStyle('model', fontName='WeLearnJP-Bold', fontSize=12, leading=18, textColor=colors.white, alignment=TA_CENTER),
    'exercise': ParagraphStyle('exercise', fontName='WeLearnJP', fontSize=8.4, leading=12, textColor=INK, leftIndent=16, firstLineIndent=-16, spaceAfter=5),
    'answer': ParagraphStyle('answer', fontName='WeLearnJP', fontSize=7.25, leading=9.7, textColor=INK, leftIndent=16, firstLineIndent=-16, spaceAfter=3),
    'center': ParagraphStyle('center', fontName='WeLearnJP-Bold', fontSize=10, leading=15, textColor=NAVY, alignment=TA_CENTER),
}


def draw_capsule(canvas, x, y, length, thickness, color, angle=45):
    """Draw one of the rounded diagonal strokes from the WeLearn identity."""
    canvas.saveState()
    canvas.translate(x, y)
    canvas.rotate(angle)
    canvas.setFillColor(color)
    canvas.roundRect(
        -length / 2,
        -thickness / 2,
        length,
        thickness,
        thickness / 2,
        fill=1,
        stroke=0,
    )
    canvas.restoreState()


def draw_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(colors.white)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    # Upper-left: the blue diagonal pills from the WeLearn visual system.
    draw_capsule(canvas, 4 * mm, PAGE_H - 3 * mm, 27 * mm, 6.2 * mm, NAVY)
    draw_capsule(canvas, 18 * mm, PAGE_H - 17 * mm, 18 * mm, 5.8 * mm, BLUE)
    draw_capsule(canvas, 5 * mm, PAGE_H - 24 * mm, 13 * mm, 5.2 * mm, NAVY)

    # Lower-right: a matching red cluster, kept clear of the page information.
    draw_capsule(canvas, PAGE_W - 2 * mm, 4 * mm, 29 * mm, 6.5 * mm, RED)
    draw_capsule(canvas, PAGE_W - 18 * mm, 18 * mm, 19 * mm, 5.8 * mm, RED)
    draw_capsule(canvas, PAGE_W - 4 * mm, 29 * mm, 14 * mm, 5.2 * mm, RED)

    # Wordmark is deliberately isolated in the upper-right corner.
    try:
        canvas.drawImage(
            str(LOGO),
            PAGE_W - 62 * mm,
            PAGE_H - 22 * mm,
            width=44 * mm,
            height=14.5 * mm,
            preserveAspectRatio=True,
            anchor='c',
            mask='auto',
        )
    except Exception:
        canvas.setFillColor(NAVY)
        canvas.setFont('WeLearnJP-Bold', 10)
        canvas.drawRightString(PAGE_W - 18 * mm, PAGE_H - 16 * mm, 'Idiomas WeLearn')
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, PAGE_H - 28 * mm, PAGE_W - 18 * mm, PAGE_H - 28 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont('WeLearnJP', 6.7)
    canvas.drawString(18 * mm, 10 * mm, f'Material original · Japonés {LEVEL_LABEL} · idiomaswl.com')
    canvas.drawCentredString(PAGE_W / 2, 10 * mm, f'Página {doc.page}')
    canvas.restoreState()


class Workbook(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename, pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm,
            topMargin=32 * mm, bottomMargin=20 * mm,
            title=f'Idiomas WeLearn · Gramática japonesa {LEVEL_LABEL}',
            author='Idiomas WeLearn', subject=f'Cuaderno de gramática japonesa {LEVEL_LABEL}',
        )
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id='body')
        self.addPageTemplates([PageTemplate(id='welearn', frames=[frame], onPage=draw_page)])


def info_box(label, text, color=PALE_BLUE, style='body'):
    data = [[p(label.upper(), STYLES['eyebrow'])], [p(text, STYLES[style])]]
    table = Table(data, colWidths=[169 * mm], hAlign='LEFT')
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), color),
        ('BOX', (0, 0), (-1, -1), 0.7, LINE),
        ('LEFTPADDING', (0, 0), (-1, -1), 9), ('RIGHTPADDING', (0, 0), (-1, -1), 9),
        ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
    ]))
    return table


def reference_table(rows):
    data = [[p(cell, STYLES['center'] if row_index == 0 else STYLES['small']) for cell in row] for row_index, row in enumerate(rows)]
    table = Table(data, colWidths=[48 * mm, 55 * mm, 66 * mm], repeatRows=1, hAlign='LEFT')
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY), ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.55, LINE), ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 1), (-1, -1), colors.white),
        ('LEFTPADDING', (0, 0), (-1, -1), 5), ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 4), ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    return table


def blank_text(text):
    return re.sub(r'\[\[\d+\]\]', '________', text)


def exercises_for(topic):
    exercises = []
    answers = []
    number = 1
    for level in topic['practice']['levels']:
        kind = level['type']
        title = level['title']
        if kind == 'choice':
            for item in level['items']:
                prompt = ' '.join(line[1] for line in item['lines'])
                exercises.append((number, title, f"{prompt}   Opciones: {' · '.join(item['options'])}"))
                answers.append((number, item['answer'], item['explain']))
                number += 1
        elif kind == 'dual':
            for item in level['items']:
                prompt = blank_text(' '.join(line[1] for line in item['lines']))
                option_sets = ' / '.join(' · '.join(blank.get('options', [])) for blank in item['blanks'])
                exercises.append((number, title, f'{prompt}   Opciones: {option_sets}'))
                answers.append((number, ' / '.join(blank['answer'] for blank in item['blanks']), ' '.join(blank['explain'] for blank in item['blanks'])))
                number += 1
        elif kind in ('guidedText', 'freeText'):
            prompt = blank_text(level['text'])
            exercises.append((number, title, prompt))
            answers.append((number, ' / '.join(blank['answer'] for blank in level['blanks']), ' '.join(blank['explain'] for blank in level['blanks'])))
            number += 1
        elif kind == 'write':
            for item in level['items']:
                exercises.append((number, title, item['prompt'] + '\n\n____________________________________________________________'))
                answers.append((number, item['answer'], item['explain']))
                number += 1
    return exercises, answers


def build_story(topic):
    story = []
    story += [p(f'JAPONÉS · NIVEL {LEVEL_LABEL} · CUADERNO IMPRIMIBLE', STYLES['eyebrow']), p(topic['title'], STYLES['title']), p(topic['lead'], STYLES['lead'])]
    story += [info_box('Meta de la lección', topic['guide']['goal']), Spacer(1, 5 * mm)]
    story += [p('Al terminar podrás', STYLES['h1'])]
    for index, outcome in enumerate(topic['outcomes'], 1):
        story.append(p(f'{index}. {outcome}', STYLES['body']))
    story += [Spacer(1, 3 * mm), info_box('Modelo', topic['guide']['model'], NAVY, 'model'), Spacer(1, 5 * mm)]
    story += [p('Cómo usar este cuaderno', STYLES['h2']), p('Lee la explicación, reconstruye el mapa visual sin mirar y completa la práctica. Corrige al final: las soluciones están separadas para favorecer la recuperación activa.', STYLES['body'])]
    story.append(PageBreak())

    story += [p('01 · Comprender', STYLES['eyebrow']), p('La idea esencial', STYLES['title']), p(topic['description'], STYLES['lead'])]
    for section in topic['seo']:
        block = [p(section['heading'], STYLES['h2'])]
        block.extend(p(paragraph, STYLES['body']) for paragraph in section['paragraphs'])
        story.append(KeepTogether(block))
    story.append(PageBreak())

    story += [p('02 · Mapa visual', STYLES['eyebrow']), p('La regla de una sola mirada', STYLES['title'])]
    story += [info_box('Fórmula', topic['guide']['formula'], CREAM, 'formula'), Spacer(1, 5 * mm)]
    story += [p('Decide en este orden', STYLES['h1'])]
    for index, decision in enumerate(topic['guide']['decisions'], 1):
        story.append(p(f'{index}. {decision}', STYLES['body']))
    story += [Spacer(1, 3 * mm), reference_table(topic['guide']['table']), Spacer(1, 4 * mm)]
    story += [p('Errores típicos de hispanohablantes', STYLES['h2'])]
    for mistake in topic['guide']['mistakes']:
        story.append(p(f'× {mistake}', STYLES['body']))
    story.append(PageBreak())

    exercises, answers = exercises_for(topic)
    story += [p('03 · Práctica', STYLES['eyebrow']), p('De reconocer a producir', STYLES['title']), p('Trabaja sin consultar las soluciones. Pronuncia cada frase japonesa después de completarla.', STYLES['lead'])]
    for index, (number, level, prompt) in enumerate(exercises):
        story.append(p(f'{number}. [{level}] {prompt}', STYLES['exercise']))
        if index == 9:
            story.append(PageBreak())
            story += [p('03 · Práctica', STYLES['eyebrow']), p('Producción y transferencia', STYLES['title'])]
    story.append(PageBreak())

    story += [p('04 · Soluciones', STYLES['eyebrow']), p('Corrige y explica la regla', STYLES['title']), p('Marca cada acierto. En los ejercicios abiertos, compara la estructura y no solo la puntuación o el uso de kanji.', STYLES['lead'])]
    for number, answer, explanation in answers:
        story.append(p(f'{number}. {answer} — {explanation}', STYLES['answer']))
    story += [Spacer(1, 5 * mm), info_box('Cierre', 'Escribe tres frases nuevas con esta estructura, léelas en voz alta y vuelve al mapa visual dentro de 24 horas.', PALE_RED)]
    return story


def main():
    topics = json.loads(DATA.read_text(encoding='utf-8'))
    OUT.mkdir(parents=True, exist_ok=True)
    for topic in topics:
        pdf_slug = topic['slug'] if topic['slug'].endswith(f'-{LEVEL}') else f"{topic['slug']}-{LEVEL}"
        target = OUT / f"idiomaswl-{pdf_slug}.pdf"
        Workbook(str(target)).build(build_story(topic))
        print(target.relative_to(ROOT))
    print(f'Listo: {len(topics)} cuadernos PDF de gramática japonesa {LEVEL_LABEL}.')


if __name__ == '__main__':
    main()
