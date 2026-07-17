"""Reusable WeLearn PDF brand system.

Every downloadable study guide should use these fixed tokens and page
furniture so the material is recognizable and clearly attributed.
"""

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import PageTemplate, Frame, BaseDocTemplate
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import Paragraph
from reportlab.lib.utils import ImageReader
from pathlib import Path
from typing import Optional

PAGE_SIZE = A4
MARGIN_LEFT = 18 * mm
MARGIN_RIGHT = 18 * mm
MARGIN_TOP = 31 * mm
MARGIN_BOTTOM = 21 * mm

NAVY = colors.HexColor('#10266b')
BLUE = colors.HexColor('#0f3d8c')
RED = colors.HexColor('#e53935')
INK = colors.HexColor('#182653')
MUTED = colors.HexColor('#64708f')
LINE = colors.HexColor('#d9deeb')
PALE_BLUE = colors.HexColor('#f1f5ff')
PALE_RED = colors.HexColor('#fff3f3')
PALE_GREEN = colors.HexColor('#effaf5')

BRAND_NAME = 'Idiomas WeLearn'
BRAND_OWNER = 'Material original propiedad de Idiomas WeLearn.'
BRAND_URL = 'https://www.idiomaswl.com'
VERSION = 'Version 1.0 | 2026-07-14'


def brand_styles():
    styles = getSampleStyleSheet()
    return {
        'title': ParagraphStyle('WLTitle', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=22, leading=27, textColor=NAVY, spaceAfter=6),
        'subtitle': ParagraphStyle('WLSubtitle', parent=styles['Normal'], fontName='Helvetica', fontSize=10.5, leading=15, textColor=MUTED, spaceAfter=14),
        'h1': ParagraphStyle('WLH1', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=15, leading=19, textColor=BLUE, spaceBefore=11, spaceAfter=6),
        'h2': ParagraphStyle('WLH2', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=11.5, leading=15, textColor=INK, spaceBefore=8, spaceAfter=4),
        'body': ParagraphStyle('WLBody', parent=styles['BodyText'], fontName='Helvetica', fontSize=9.5, leading=14, textColor=INK, alignment=TA_LEFT, spaceAfter=6),
        'small': ParagraphStyle('WLSmall', parent=styles['BodyText'], fontName='Helvetica', fontSize=8, leading=11, textColor=MUTED, spaceAfter=4),
        'label': ParagraphStyle('WLLabel', parent=styles['BodyText'], fontName='Helvetica-Bold', fontSize=7.5, leading=10, textColor=BLUE, spaceAfter=3),
        'exercise': ParagraphStyle('WLExercise', parent=styles['BodyText'], fontName='Helvetica', fontSize=9, leading=13, textColor=INK, leftIndent=8, firstLineIndent=-8, spaceAfter=5),
    }


def draw_pill(canvas, x, y, width, color):
    canvas.saveState()
    canvas.setFillColor(color)
    canvas.roundRect(x, y, width, 7 * mm, 3.5 * mm, fill=1, stroke=0)
    canvas.restoreState()


def draw_diagonal_pill(canvas, x, y, length, width, angle, color):
    canvas.saveState()
    canvas.translate(x, y)
    canvas.rotate(angle)
    canvas.setFillColor(color)
    canvas.roundRect(-length / 2, -width / 2, length, width, width / 2, fill=1, stroke=0)
    canvas.restoreState()


def draw_brand_corner_pattern(canvas):
    width, height = PAGE_SIZE
    # The corner pattern echoes the WeLearn logo: blue diagonal marks in the
    # upper-left and a red diagonal cluster in the lower-right.
    canvas.saveState()
    canvas.setFillColor(NAVY)
    blue_path = canvas.beginPath()
    blue_path.moveTo(0, height)
    blue_path.lineTo(42 * mm, height)
    blue_path.lineTo(0, height - 42 * mm)
    blue_path.close()
    canvas.drawPath(blue_path, fill=1, stroke=0)
    for x, y, length, color in [
        (9 * mm, height - 8 * mm, 13 * mm, colors.white),
        (15 * mm, height - 17 * mm, 11 * mm, colors.white),
        (22 * mm, height - 26 * mm, 11 * mm, colors.white),
        (24 * mm, height - 10 * mm, 10 * mm, BLUE),
    ]:
        draw_diagonal_pill(canvas, x, y, length, 3.8 * mm, 45, color)
    canvas.setFillColor(RED)
    red_path = canvas.beginPath()
    red_path.moveTo(width, 0)
    red_path.lineTo(width, 52 * mm)
    red_path.lineTo(width - 52 * mm, 0)
    red_path.close()
    canvas.drawPath(red_path, fill=1, stroke=0)
    for x, y, length, angle in [
        (width - 8 * mm, 8 * mm, 13 * mm, 45),
        (width - 17 * mm, 15 * mm, 15 * mm, 45),
        (width - 26 * mm, 23 * mm, 15 * mm, 45),
        (width - 13 * mm, 35 * mm, 11 * mm, 45),
    ]:
        draw_diagonal_pill(canvas, x, y, length, 4.2 * mm, angle, colors.white)
    canvas.restoreState()


def draw_brand_page(canvas, doc, logo_path: Optional[str] = None):
    width, height = PAGE_SIZE
    canvas.saveState()
    # Paint the page explicitly so PDF viewers never treat an empty page area as transparent.
    canvas.setFillColorRGB(1, 1, 1)
    if hasattr(canvas, 'setFillAlpha'):
        canvas.setFillAlpha(1)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    draw_brand_corner_pattern(canvas)

    if logo_path and Path(logo_path).exists():
        try:
            canvas.drawImage(ImageReader(logo_path), MARGIN_LEFT, height - 25 * mm, width=17 * mm, height=17 * mm, preserveAspectRatio=True, mask='auto')
            canvas.setFillColor(NAVY)
            canvas.setFont('Helvetica-Bold', 9.5)
            canvas.drawString(MARGIN_LEFT + 20 * mm, height - 20 * mm, BRAND_NAME)
        except Exception:
            canvas.setFillColor(NAVY)
            canvas.setFont('Helvetica-Bold', 10)
            canvas.drawString(MARGIN_LEFT, height - 20 * mm, BRAND_NAME)
    else:
        canvas.setFillColor(NAVY)
        canvas.setFont('Helvetica-Bold', 10)
        canvas.drawString(MARGIN_LEFT, height - 20 * mm, BRAND_NAME)

    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.6)
    canvas.line(MARGIN_LEFT, height - 27 * mm, width - MARGIN_RIGHT, height - 27 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont('Helvetica', 7.5)
    canvas.drawString(MARGIN_LEFT, 11 * mm, f'{BRAND_OWNER}  |  {VERSION}')
    canvas.drawRightString(width - MARGIN_RIGHT, 11 * mm, f'{BRAND_URL}  |  Page {doc.page}')
    canvas.restoreState()


class WeLearnDocTemplate(BaseDocTemplate):
    def __init__(self, filename, logo_path=None, **kwargs):
        super().__init__(filename, pagesize=PAGE_SIZE, leftMargin=MARGIN_LEFT, rightMargin=MARGIN_RIGHT, topMargin=MARGIN_TOP, bottomMargin=MARGIN_BOTTOM, **kwargs)
        frame = Frame(MARGIN_LEFT, MARGIN_BOTTOM, PAGE_SIZE[0] - MARGIN_LEFT - MARGIN_RIGHT, PAGE_SIZE[1] - MARGIN_TOP - MARGIN_BOTTOM, id='content')
        self.addPageTemplates([PageTemplate(id='welearn', frames=[frame], onPage=lambda canvas, doc: draw_brand_page(canvas, doc, logo_path))])


def box(text, background=PALE_BLUE, border=LINE, styles=None):
    styles = styles or brand_styles()
    return [Paragraph(text, styles['body'])]
