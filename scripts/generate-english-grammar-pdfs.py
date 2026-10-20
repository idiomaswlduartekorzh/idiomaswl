#!/usr/bin/env python3
"""Generate the complete English A1-B1 grammar workbook collection."""

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
from reportlab.platypus import BaseDocTemplate, Frame, KeepTogether, PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'tmp' / 'english-grammar' / 'topics.json'
OUTPUT = ROOT / 'output' / 'pdf' / 'english-grammar'
PUBLIC = ROOT / 'private' / 'site-materials'
FONT_REGULAR = ROOT / 'public' / 'fonts' / 'welearn-ko-400.ttf'
FONT_BOLD = ROOT / 'public' / 'fonts' / 'welearn-ko-700.ttf'
LOGO = ROOT / 'public' / 'images' / 'welearn-logo.png'

NAVY = colors.HexColor('#012169')
RED = colors.HexColor('#C8102E')
BLUE = colors.HexColor('#244C9A')
INK = colors.HexColor('#172033')
MUTED = colors.HexColor('#667085')
LINE = colors.HexColor('#D8DEE9')
CREAM = colors.HexColor('#F8F3E9')
PALE_BLUE = colors.HexColor('#EEF3FF')
PALE_RED = colors.HexColor('#FFF0F2')
WHITE = colors.white
PAGE_W, PAGE_H = A4

pdfmetrics.registerFont(TTFont('WeLearnEN', str(FONT_REGULAR)))
pdfmetrics.registerFont(TTFont('WeLearnEN-Bold', str(FONT_BOLD)))


def p(text, style):
    return Paragraph(escape(str(text)).replace('\n', '<br/>'), style)


STYLES = {
    'eyebrow': ParagraphStyle('eyebrow', fontName='WeLearnEN-Bold', fontSize=8.2, leading=11, textColor=RED, spaceAfter=5),
    'title': ParagraphStyle('title', fontName='WeLearnEN-Bold', fontSize=23, leading=28, textColor=NAVY, spaceAfter=7),
    'lead': ParagraphStyle('lead', fontName='WeLearnEN', fontSize=9.7, leading=14.5, textColor=INK, spaceAfter=8),
    'h1': ParagraphStyle('h1', fontName='WeLearnEN-Bold', fontSize=15.5, leading=20, textColor=NAVY, spaceBefore=7, spaceAfter=7),
    'h2': ParagraphStyle('h2', fontName='WeLearnEN-Bold', fontSize=10.4, leading=14, textColor=BLUE, spaceBefore=5, spaceAfter=3),
    'body': ParagraphStyle('body', fontName='WeLearnEN', fontSize=8.2, leading=11.8, textColor=INK, spaceAfter=4),
    'small': ParagraphStyle('small', fontName='WeLearnEN', fontSize=7.2, leading=9.7, textColor=MUTED),
    'table': ParagraphStyle('table', fontName='WeLearnEN', fontSize=7.4, leading=10, textColor=INK),
    'table_head': ParagraphStyle('table_head', fontName='WeLearnEN-Bold', fontSize=7.3, leading=9.8, textColor=WHITE, alignment=TA_CENTER),
    'formula': ParagraphStyle('formula', fontName='WeLearnEN-Bold', fontSize=13.2, leading=19, textColor=NAVY, alignment=TA_CENTER),
    'model': ParagraphStyle('model', fontName='WeLearnEN-Bold', fontSize=11.1, leading=16.5, textColor=WHITE, alignment=TA_CENTER),
    'exercise': ParagraphStyle('exercise', fontName='WeLearnEN', fontSize=8.1, leading=11.6, textColor=INK, leftIndent=15, firstLineIndent=-15, spaceAfter=5),
    'answer': ParagraphStyle('answer', fontName='WeLearnEN', fontSize=7.2, leading=9.7, textColor=INK, leftIndent=15, firstLineIndent=-15, spaceAfter=3),
    'example': ParagraphStyle('example', fontName='WeLearnEN-Bold', fontSize=9.6, leading=13.2, textColor=NAVY),
}


class Workbook(BaseDocTemplate):
    def __init__(self, filename, topic):
        self.topic = topic
        super().__init__(filename, pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=31 * mm, bottomMargin=20 * mm, title=f"Idiomas WeLearn - {topic['title']}", author='Idiomas WeLearn', subject=f"Cuaderno de gramática inglesa {topic['level']}")
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
        canvas.setFont('WeLearnEN', 6.7)
        canvas.drawString(18 * mm, 10 * mm, f"Material original · Inglés {self.topic['level']} · idiomaswl.com")
        canvas.drawRightString(PAGE_W - 18 * mm, 10 * mm, f'Página {doc.page}')
        canvas.restoreState()


def info_box(label, text, background=PALE_BLUE, style='body'):
    table = Table([[p(label.upper(), STYLES['eyebrow'])], [p(text, STYLES[style])]], colWidths=[169 * mm], hAlign='LEFT')
    table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), background), ('BOX', (0, 0), (-1, -1), .7, LINE), ('LEFTPADDING', (0, 0), (-1, -1), 9), ('RIGHTPADDING', (0, 0), (-1, -1), 9), ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7)]))
    return table


def data_table(rows):
    columns = max(len(row) for row in rows)
    width = 169 * mm / columns
    padded = [list(row) + [''] * (columns - len(row)) for row in rows]
    data = [[p(cell, STYLES['table_head'] if index == 0 else STYLES['table']) for cell in row] for index, row in enumerate(padded)]
    table = Table(data, colWidths=[width] * columns, repeatRows=1, hAlign='LEFT')
    table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), NAVY), ('GRID', (0, 0), (-1, -1), .55, LINE), ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, colors.HexColor('#F8FAFC')]), ('LEFTPADDING', (0, 0), (-1, -1), 5), ('RIGHTPADDING', (0, 0), (-1, -1), 5), ('TOPPADDING', (0, 0), (-1, -1), 4), ('BOTTOMPADDING', (0, 0), (-1, -1), 4)]))
    return table


def examples_table(scene):
    data = [[p(english, STYLES['example']), p(spanish, STYLES['small'])] for english, spanish in scene]
    table = Table(data, colWidths=[91 * mm, 78 * mm], hAlign='LEFT')
    table.setStyle(TableStyle([('GRID', (0, 0), (-1, -1), .45, LINE), ('ROWBACKGROUNDS', (0, 0), (-1, -1), [WHITE, colors.HexColor('#F8FAFC')]), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('LEFTPADDING', (0, 0), (-1, -1), 7), ('RIGHTPADDING', (0, 0), (-1, -1), 7), ('TOPPADDING', (0, 0), (-1, -1), 6), ('BOTTOMPADDING', (0, 0), (-1, -1), 6)]))
    return table


def blank_text(text):
    return re.sub(r'\[\[\d+\]\]', '________', str(text))


def exercises_for(topic):
    exercises, answers, number = [], [], 1
    for level in topic['practice']['levels']:
        kind, title = level['type'], level['title']
        if kind == 'choice':
            for item in level['items']:
                prompt = ' '.join(line[1] for line in item['lines'])
                exercises.append((number, title, f"{prompt}   Opciones: {' · '.join(item['options'])}"))
                answers.append((number, item['answer'], item['explain']))
                number += 1
        elif kind == 'dual':
            for item in level['items']:
                prompt = blank_text(' '.join(line[1] for line in item['lines']))
                options = ' / '.join(' · '.join(blank.get('options', [])) for blank in item['blanks'])
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
    story = [p(f"INGLÉS · NIVEL {topic['level']} · CUADERNO IMPRIMIBLE", STYLES['eyebrow']), p(topic['title'], STYLES['title']), p(topic['lead'], STYLES['lead']), info_box('Meta de la lección', topic['guide']['goal']), Spacer(1, 4 * mm), info_box('Modelo', topic['guide']['model'], NAVY, 'model'), Spacer(1, 4 * mm), p('Al terminar podrás', STYLES['h1'])]
    story.extend(p(f'{index}. {outcome}', STYLES['body']) for index, outcome in enumerate(topic['outcomes'], 1))
    story += [Spacer(1, 3 * mm), info_box('Cómo estudiar', 'Lee la explicación, reconstruye el mapa sin mirar, resuelve la práctica y corrige al final. Usa las tres pistas de audio de la lección web para imitar ritmo y entonación.', PALE_RED), PageBreak()]
    story += [p('01 · COMPRENDER', STYLES['eyebrow']), p('La idea esencial', STYLES['title']), p(topic['description'], STYLES['lead'])]
    for section in topic['seo']:
        block = [p(section['heading'], STYLES['h2'])] + [p(paragraph, STYLES['body']) for paragraph in section.get('paragraphs', [])]
        story.append(KeepTogether(block))
        if section.get('table'):
            story += [Spacer(1, 2 * mm), data_table(section['table']), Spacer(1, 2 * mm)]
    story += [PageBreak(), p('02 · MAPA VISUAL', STYLES['eyebrow']), p('La regla de una sola mirada', STYLES['title']), info_box('Fórmula', topic['guide']['formula'], CREAM, 'formula'), Spacer(1, 4 * mm), p('Decide en este orden', STYLES['h1'])]
    story.extend(p(f'{index}. {decision}', STYLES['body']) for index, decision in enumerate(topic['guide']['decisions'], 1))
    story += [Spacer(1, 2 * mm), data_table(topic['guide']['table']), Spacer(1, 3 * mm), p('Errores frecuentes', STYLES['h2'])]
    story.extend(p(f'× {mistake}', STYLES['body']) for mistake in topic['guide']['mistakes'])
    story += [PageBreak(), p('02 · MAPA VISUAL', STYLES['eyebrow']), p('Ejemplos de referencia', STYLES['title']), p('Tapa la columna en español, explica el sentido y lee el ejemplo en voz alta.', STYLES['lead']), examples_table(topic['visual']['scene']), PageBreak()]
    exercises, answers = exercises_for(topic)
    story += [p('03 · PRÁCTICA', STYLES['eyebrow']), p('De reconocer a producir', STYLES['title']), p(f'{len(exercises)} ejercicios imprimibles. Trabaja sin consultar las soluciones.', STYLES['lead'])]
    current = None
    for number, level, prompt in exercises:
        if level != current:
            story.append(p(level, STYLES['h2']))
            current = level
        story.append(p(f'{number}. {prompt}', STYLES['exercise']))
    story += [PageBreak(), p('04 · SOLUCIONES', STYLES['eyebrow']), p('Corrige y explica la regla', STYLES['title']), p('En respuestas abiertas, compara primero la estructura objetivo y después el vocabulario.', STYLES['lead'])]
    for number, answer, explanation in answers:
        story.append(p(f'{number}. {answer} — {explanation}', STYLES['answer']))
    story += [Spacer(1, 4 * mm), info_box('Cierre', 'Escribe tres frases nuevas, léelas en voz alta y vuelve al mapa visual dentro de 24 horas.', PALE_BLUE)]
    return story


def main():
    topics = json.loads(DATA.read_text(encoding='utf-8'))
    for topic in topics:
        level = topic['level'].lower()
        output_dir = OUTPUT / level
        public_dir = PUBLIC / f'ingles-{level}' / 'grammar'
        output_dir.mkdir(parents=True, exist_ok=True)
        public_dir.mkdir(parents=True, exist_ok=True)
        filename = f"idiomaswl-{topic['slug']}.pdf" if topic['slug'].endswith(f'-{level}') else f"idiomaswl-{topic['slug']}-{level}.pdf"
        target = output_dir / filename
        Workbook(str(target), topic).build(build_story(topic))
        shutil.copy2(target, public_dir / filename)
        print(target.relative_to(ROOT))
    print(f"Listo: {len(topics)} cuadernos PDF de gramática inglesa.")


if __name__ == '__main__':
    main()
