#!/usr/bin/env python3
"""Generate printable Korean A1-B1 grammar workbooks for the site."""

import json
import re
import shutil
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'tmp' / 'pdfs' / 'korean-grammar' / 'topics.json'
OUTPUT = ROOT / 'output' / 'pdf' / 'korean-grammar'
PUBLIC = ROOT / 'public' / 'downloads'
FONT_REGULAR = ROOT / 'public' / 'fonts' / 'welearn-ko-400.ttf'
FONT_BOLD = ROOT / 'public' / 'fonts' / 'welearn-ko-700.ttf'
LOGO = ROOT / 'public' / 'images' / 'welearn-logo.png'

NAVY = colors.HexColor('#003478')
BLUE = colors.HexColor('#0F4C81')
RED = colors.HexColor('#C60C30')
INK = colors.HexColor('#172033')
MUTED = colors.HexColor('#667085')
LINE = colors.HexColor('#D8DEE9')
CREAM = colors.HexColor('#F8F3E9')
PALE_BLUE = colors.HexColor('#EEF5FF')
PALE_RED = colors.HexColor('#FFF1F3')
WHITE = colors.white
PAGE_W, PAGE_H = A4

pdfmetrics.registerFont(TTFont('WeLearnKO', str(FONT_REGULAR)))
pdfmetrics.registerFont(TTFont('WeLearnKO-Bold', str(FONT_BOLD)))


def para(text, style):
    clean = escape(str(text)).replace('\n', '<br/>')
    return Paragraph(clean, style)


STYLES = {
    'eyebrow': ParagraphStyle('eyebrow', fontName='WeLearnKO-Bold', fontSize=8.2, leading=11, textColor=RED, spaceAfter=5),
    'title': ParagraphStyle('title', fontName='WeLearnKO-Bold', fontSize=23, leading=29, textColor=NAVY, spaceAfter=7),
    'lead': ParagraphStyle('lead', fontName='WeLearnKO', fontSize=9.8, leading=14.8, textColor=INK, spaceAfter=8),
    'h1': ParagraphStyle('h1', fontName='WeLearnKO-Bold', fontSize=15.5, leading=20, textColor=NAVY, spaceBefore=7, spaceAfter=7),
    'h2': ParagraphStyle('h2', fontName='WeLearnKO-Bold', fontSize=10.2, leading=13.5, textColor=BLUE, spaceBefore=5, spaceAfter=3),
    'body': ParagraphStyle('body', fontName='WeLearnKO', fontSize=8.2, leading=11.8, textColor=INK, spaceAfter=4),
    'small': ParagraphStyle('small', fontName='WeLearnKO', fontSize=7.25, leading=9.8, textColor=MUTED),
    'table': ParagraphStyle('table', fontName='WeLearnKO', fontSize=7.35, leading=10, textColor=INK),
    'table_head': ParagraphStyle('table_head', fontName='WeLearnKO-Bold', fontSize=7.25, leading=9.7, textColor=WHITE, alignment=TA_CENTER),
    'formula': ParagraphStyle('formula', fontName='WeLearnKO-Bold', fontSize=13.2, leading=19.5, textColor=NAVY, alignment=TA_CENTER),
    'model': ParagraphStyle('model', fontName='WeLearnKO-Bold', fontSize=11.2, leading=17, textColor=WHITE, alignment=TA_CENTER),
    'exercise': ParagraphStyle('exercise', fontName='WeLearnKO', fontSize=8.15, leading=11.7, textColor=INK, leftIndent=15, firstLineIndent=-15, spaceAfter=5),
    'answer': ParagraphStyle('answer', fontName='WeLearnKO', fontSize=7.2, leading=9.7, textColor=INK, leftIndent=15, firstLineIndent=-15, spaceAfter=3),
    'example_ko': ParagraphStyle('example_ko', fontName='WeLearnKO-Bold', fontSize=10.2, leading=14, textColor=NAVY),
    'example_es': ParagraphStyle('example_es', fontName='WeLearnKO', fontSize=7.6, leading=10.4, textColor=MUTED),
}


class Workbook(BaseDocTemplate):
    def __init__(self, filename, topic):
        self.topic = topic
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=18 * mm,
            rightMargin=18 * mm,
            topMargin=31 * mm,
            bottomMargin=20 * mm,
            title=f"Idiomas WeLearn - {topic['title']}",
            author='Idiomas WeLearn',
            subject=f"Cuaderno de gramática coreana {topic['level']}",
        )
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id='body')
        self.addPageTemplates([PageTemplate(id='welearn', frames=[frame], onPage=self.draw_page)])

    def draw_page(self, canvas, doc):
        canvas.saveState()
        canvas.setFillColor(WHITE)
        canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
        canvas.setFillColor(NAVY)
        canvas.rect(0, PAGE_H - 9 * mm, PAGE_W, 9 * mm, fill=1, stroke=0)
        canvas.setFillColor(RED)
        canvas.rect(PAGE_W - 48 * mm, PAGE_H - 9 * mm, 48 * mm, 9 * mm, fill=1, stroke=0)
        if LOGO.is_file():
            canvas.drawImage(str(LOGO), 18 * mm, PAGE_H - 23 * mm, width=38 * mm, height=10 * mm, preserveAspectRatio=True, mask='auto')
        canvas.setStrokeColor(LINE)
        canvas.line(18 * mm, PAGE_H - 28 * mm, PAGE_W - 18 * mm, PAGE_H - 28 * mm)
        canvas.setFillColor(MUTED)
        canvas.setFont('WeLearnKO', 6.7)
        canvas.drawString(18 * mm, 10 * mm, f"Material original - Coreano {self.topic['level']} - idiomaswl.com")
        canvas.drawRightString(PAGE_W - 18 * mm, 10 * mm, f'Página {doc.page}')
        canvas.restoreState()


def info_box(label, text, background=PALE_BLUE, style='body'):
    data = [[para(label.upper(), STYLES['eyebrow'])], [para(text, STYLES[style])]]
    table = Table(data, colWidths=[169 * mm], hAlign='LEFT')
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), background),
        ('BOX', (0, 0), (-1, -1), 0.7, background if style == 'model' else LINE),
        ('LEFTPADDING', (0, 0), (-1, -1), 9), ('RIGHTPADDING', (0, 0), (-1, -1), 9),
        ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
    ]))
    return table


def data_table(rows):
    if not rows:
        return Spacer(1, 1)
    columns = max(len(row) for row in rows)
    width = 169 * mm / columns
    padded = [list(row) + [''] * (columns - len(row)) for row in rows]
    data = [
        [para(cell, STYLES['table_head'] if row_index == 0 else STYLES['table']) for cell in row]
        for row_index, row in enumerate(padded)
    ]
    table = Table(data, colWidths=[width] * columns, repeatRows=1, hAlign='LEFT')
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('GRID', (0, 0), (-1, -1), 0.55, LINE),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, colors.HexColor('#F8FAFC')]),
        ('LEFTPADDING', (0, 0), (-1, -1), 5), ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 4), ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    return table


def examples_table(scene):
    data = [[para(korean, STYLES['example_ko']), para(spanish, STYLES['example_es'])] for korean, spanish in scene]
    table = Table(data, colWidths=[91 * mm, 78 * mm], hAlign='LEFT')
    table.setStyle(TableStyle([
        ('GRID', (0, 0), (-1, -1), 0.45, LINE),
        ('ROWBACKGROUNDS', (0, 0), (-1, -1), [WHITE, colors.HexColor('#F8FAFC')]),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 7), ('RIGHTPADDING', (0, 0), (-1, -1), 7),
        ('TOPPADDING', (0, 0), (-1, -1), 6), ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    return table


def blank_text(text):
    return re.sub(r'\[\[\d+\]\]', '________', str(text))


def exercises_for(topic):
    exercises, answers = [], []
    number = 1
    for level in topic['practice']['levels']:
        kind, title = level['type'], level['title']
        if kind == 'choice':
            for item in level['items']:
                prompt = ' '.join(line[1] for line in item['lines'])
                exercises.append((number, title, f"{prompt}   Opciones: {' - '.join(item['options'])}"))
                answers.append((number, item['answer'], item['explain']))
                number += 1
        elif kind == 'dual':
            for item in level['items']:
                prompt = blank_text(' '.join(line[1] for line in item['lines']))
                options = ' / '.join(' - '.join(blank.get('options', [])) for blank in item['blanks'])
                exercises.append((number, title, f'{prompt}   Opciones: {options}'))
                answers.append((number, ' / '.join(blank['answer'] for blank in item['blanks']), ' '.join(blank['explain'] for blank in item['blanks'])))
                number += 1
        elif kind in ('guidedText', 'freeText'):
            exercises.append((number, title, blank_text(level['text'])))
            answers.append((number, ' / '.join(blank['answer'] for blank in level['blanks']), ' '.join(blank['explain'] for blank in level['blanks'])))
            number += 1
        elif kind == 'write':
            for item in level['items']:
                exercises.append((number, title, f"{item['prompt']}\n\n____________________________________________________________"))
                answers.append((number, item['answer'], item['explain']))
                number += 1
    return exercises, answers


def build_story(topic):
    story = [
        para(f"COREANO - NIVEL {topic['level']} - CUADERNO IMPRIMIBLE", STYLES['eyebrow']),
        para(topic['title'], STYLES['title']),
        para(topic['lead'], STYLES['lead']),
        info_box('Meta de la lección', topic['guide']['goal']),
        Spacer(1, 4 * mm),
        info_box('Modelo', topic['guide']['model'], NAVY, 'model'),
        Spacer(1, 4 * mm),
        para('Al terminar podrás', STYLES['h1']),
    ]
    story.extend(para(f'{index}. {outcome}', STYLES['body']) for index, outcome in enumerate(topic['outcomes'], 1))
    story += [Spacer(1, 3 * mm), info_box('Cómo estudiar', 'Lee la explicación, reconstruye el mapa sin mirar, resuelve la práctica y corrige al final. Pronuncia en voz alta cada ejemplo coreano.', PALE_RED), PageBreak()]

    story += [para('01 - COMPRENDER', STYLES['eyebrow']), para('La idea esencial', STYLES['title']), para(topic['description'], STYLES['lead'])]
    for section in topic['seo']:
        block = [para(section['heading'], STYLES['h2'])]
        block.extend(para(paragraph, STYLES['body']) for paragraph in section.get('paragraphs', []))
        story.append(KeepTogether(block))
        if section.get('table'):
            story += [Spacer(1, 2 * mm), data_table(section['table']), Spacer(1, 2 * mm)]
    story.append(PageBreak())

    story += [para('02 - MAPA VISUAL', STYLES['eyebrow']), para('La regla de una sola mirada', STYLES['title'])]
    story += [info_box('Fórmula', topic['guide']['formula'], CREAM, 'formula'), Spacer(1, 4 * mm), para('Decide en este orden', STYLES['h1'])]
    story.extend(para(f'{index}. {decision}', STYLES['body']) for index, decision in enumerate(topic['guide']['decisions'], 1))
    story += [Spacer(1, 2 * mm), data_table(topic['guide']['table']), Spacer(1, 3 * mm), para('Errores frecuentes', STYLES['h2'])]
    story.extend(para(f'X {mistake}', STYLES['body']) for mistake in topic['guide']['mistakes'])
    story += [PageBreak(), para('02 - MAPA VISUAL', STYLES['eyebrow']), para('Ejemplos de referencia', STYLES['title']), para('Lee de izquierda a derecha. Después tapa la traducción y reconstruye el sentido.', STYLES['lead']), examples_table(topic['visual']['scene']), PageBreak()]

    exercises, answers = exercises_for(topic)
    story += [para('03 - PRÁCTICA', STYLES['eyebrow']), para('De reconocer a producir', STYLES['title']), para(f"{len(exercises)} ejercicios imprimibles. Trabaja sin consultar las soluciones.", STYLES['lead'])]
    current_level = None
    for number, level, prompt in exercises:
        if level != current_level:
            story.append(para(level, STYLES['h2']))
            current_level = level
        story.append(para(f'{number}. {prompt}', STYLES['exercise']))
    story.append(PageBreak())

    story += [para('04 - SOLUCIONES', STYLES['eyebrow']), para('Corrige y explica la regla', STYLES['title']), para('En respuestas abiertas, compara primero la estructura objetivo y después el vocabulario.', STYLES['lead'])]
    for number, answer, explanation in answers:
        story.append(para(f'{number}. {answer} - {explanation}', STYLES['answer']))
    story += [Spacer(1, 4 * mm), info_box('Cierre', 'Escribe tres frases nuevas, léelas en voz alta y vuelve al mapa visual dentro de 24 horas.', PALE_BLUE)]
    return story


def main():
    topics = json.loads(DATA.read_text(encoding='utf-8'))
    generated = []
    for topic in topics:
        if topic['slug'] == 'hangul-basico':
            continue
        level = topic['level'].lower()
        output_dir = OUTPUT / level
        public_dir = PUBLIC / f'coreano-{level}' / 'grammar'
        output_dir.mkdir(parents=True, exist_ok=True)
        public_dir.mkdir(parents=True, exist_ok=True)
        suffix = f'-{level}'
        filename = f"idiomaswl-{topic['slug']}.pdf" if topic['slug'].endswith(suffix) else f"idiomaswl-{topic['slug']}{suffix}.pdf"
        target = output_dir / filename
        Workbook(str(target), topic).build(build_story(topic))
        shutil.copy2(target, public_dir / filename)
        generated.append(target)
        print(target.relative_to(ROOT))
    print(f'Listo: {len(generated)} cuadernos PDF de gramática coreana más la guía especial de hangeúl.')


if __name__ == '__main__':
    main()
