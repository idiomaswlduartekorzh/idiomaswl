#!/usr/bin/env python3
"""Build the printable Hangeul A1 guide and workbook."""

from pathlib import Path
from shutil import copy2
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
OUTPUT = ROOT / 'output' / 'pdf' / 'idiomaswl-hangul-basico-a1.pdf'
PUBLIC = ROOT / 'public' / 'downloads' / 'coreano-a1' / 'idiomaswl-hangul-basico-a1.pdf'
FONT_REGULAR = ROOT / 'public' / 'fonts' / 'welearn-ko-400.ttf'
FONT_BOLD = ROOT / 'public' / 'fonts' / 'welearn-ko-700.ttf'
LOGO = ROOT / 'public' / 'images' / 'welearn-logo.png'

NAVY = colors.HexColor('#003478')
RED = colors.HexColor('#c60c30')
INK = colors.HexColor('#172033')
MUTED = colors.HexColor('#667085')
LINE = colors.HexColor('#d8dee9')
CREAM = colors.HexColor('#f7f2e8')
PALE_BLUE = colors.HexColor('#eef5ff')
PALE_RED = colors.HexColor('#fff1f3')
WHITE = colors.white
PAGE_W, PAGE_H = A4

pdfmetrics.registerFont(TTFont('WeLearnKO', str(FONT_REGULAR)))
pdfmetrics.registerFont(TTFont('WeLearnKO-Bold', str(FONT_BOLD)))


def para(text, style):
    return Paragraph(escape(str(text)).replace('\n', '<br/>'), style)


STYLES = {
    'eyebrow': ParagraphStyle('eyebrow', fontName='WeLearnKO-Bold', fontSize=8.2, leading=11, textColor=RED, spaceAfter=5),
    'title': ParagraphStyle('title', fontName='WeLearnKO-Bold', fontSize=25, leading=31, textColor=NAVY, spaceAfter=8),
    'lead': ParagraphStyle('lead', fontName='WeLearnKO', fontSize=10.2, leading=15.5, textColor=INK, spaceAfter=9),
    'h1': ParagraphStyle('h1', fontName='WeLearnKO-Bold', fontSize=16, leading=21, textColor=NAVY, spaceBefore=7, spaceAfter=8),
    'h2': ParagraphStyle('h2', fontName='WeLearnKO-Bold', fontSize=10.4, leading=14, textColor=NAVY, spaceBefore=5, spaceAfter=4),
    'body': ParagraphStyle('body', fontName='WeLearnKO', fontSize=8.5, leading=12.2, textColor=INK, spaceAfter=4),
    'small': ParagraphStyle('small', fontName='WeLearnKO', fontSize=7.4, leading=10.2, textColor=MUTED),
    'table': ParagraphStyle('table', fontName='WeLearnKO', fontSize=7.7, leading=10.5, textColor=INK),
    'table_head': ParagraphStyle('table_head', fontName='WeLearnKO-Bold', fontSize=7.6, leading=10.2, textColor=WHITE, alignment=TA_CENTER),
    'formula': ParagraphStyle('formula', fontName='WeLearnKO-Bold', fontSize=15, leading=23, textColor=NAVY, alignment=TA_CENTER),
    'model': ParagraphStyle('model', fontName='WeLearnKO-Bold', fontSize=15, leading=24, textColor=WHITE, alignment=TA_CENTER),
    'exercise': ParagraphStyle('exercise', fontName='WeLearnKO', fontSize=8.2, leading=12, textColor=INK, leftIndent=15, firstLineIndent=-15, spaceAfter=5),
    'answer': ParagraphStyle('answer', fontName='WeLearnKO', fontSize=7.6, leading=10.5, textColor=INK, leftIndent=15, firstLineIndent=-15, spaceAfter=4),
    'audio': ParagraphStyle('audio', fontName='WeLearnKO-Bold', fontSize=9.2, leading=13, textColor=NAVY),
}


class Workbook(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=18 * mm,
            rightMargin=18 * mm,
            topMargin=31 * mm,
            bottomMargin=20 * mm,
            title='Idiomas WeLearn - Hangeul básico A1',
            author='Idiomas WeLearn',
            subject='Guía, audio y práctica de hangeúl coreano A1',
        )
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id='body')
        self.addPageTemplates([PageTemplate(id='welearn', frames=[frame], onPage=draw_page)])


def draw_page(canvas, doc):
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
    canvas.drawString(18 * mm, 10 * mm, 'Material original - Coreano A1 - idiomaswl.com')
    canvas.drawRightString(PAGE_W - 18 * mm, 10 * mm, f'Página {doc.page}')
    canvas.restoreState()


def info_box(label, text, background=PALE_BLUE, model=False):
    label_style = STYLES['eyebrow']
    value_style = STYLES['model'] if model else STYLES['body']
    data = [[para(label.upper(), label_style)], [para(text, value_style)]]
    table = Table(data, colWidths=[169 * mm], hAlign='LEFT')
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), background),
        ('BOX', (0, 0), (-1, -1), 0.7, background if model else LINE),
        ('LEFTPADDING', (0, 0), (-1, -1), 9),
        ('RIGHTPADDING', (0, 0), (-1, -1), 9),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
    ]))
    return table


def data_table(headers, rows, widths):
    data = [[para(cell, STYLES['table_head']) for cell in headers]]
    data += [[para(cell, STYLES['table']) for cell in row] for row in rows]
    table = Table(data, colWidths=widths, repeatRows=1, hAlign='LEFT')
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('GRID', (0, 0), (-1, -1), 0.55, LINE),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, colors.HexColor('#f8fafc')]),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    return table


def audio_card(index, title, korean, translation, filename):
    url = f'https://www.idiomaswl.com/audio/coreano/a1/grammar/hangul-basico/{filename}'
    content = [
        para(f'{index:02d} - {title}', STYLES['audio']),
        para(korean, STYLES['h1']),
        para(translation, STYLES['small']),
        Paragraph(f'<link href="{url}" color="#c60c30">Abrir audio en idiomaswl.com</link>', STYLES['small']),
    ]
    table = Table([[content]], colWidths=[169 * mm])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), CREAM),
        ('BOX', (0, 0), (-1, -1), 0.7, LINE),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    return table


def build_story():
    story = [
        para('COREANO - NIVEL A1 - GUÍA Y CUADERNO', STYLES['eyebrow']),
        para('Hangeúl básico', STYLES['title']),
        para('Aprende las vocales, las consonantes y la lógica de los bloques silábicos con práctica progresiva y audio coreano nativo.', STYLES['lead']),
        info_box('Meta de la lección', 'Reconocer las 10 vocales y las 14 consonantes básicas, formar bloques silábicos y leer palabras frecuentes.'),
        Spacer(1, 5 * mm),
        info_box('Modelo', '가 나 다 라 마 바 사 아 자 차 카 타 파 하', NAVY, model=True),
        Spacer(1, 5 * mm),
        para('Al terminar podrás', STYLES['h1']),
    ]
    for index, outcome in enumerate([
        'Distinguir las vocales verticales y horizontales.',
        'Reconocer las 14 consonantes básicas.',
        'Formar sílabas con consonante inicial y vocal.',
        'Leer palabras iniciales sin depender completamente de la romanización.',
    ], 1):
        story.append(para(f'{index}. {outcome}', STYLES['body']))
    story += [Spacer(1, 4 * mm), info_box('Plan de 35 minutos', '5 min: vocales. 8 min: consonantes. 7 min: bloques. 10 min: práctica. 5 min: audio y lectura en voz alta.', PALE_RED), PageBreak()]

    story += [
        para('01 - COMPRENDER', STYLES['eyebrow']),
        para('Un alfabeto que se organiza en bloques', STYLES['title']),
        para('El hangeúl tiene 24 letras básicas: 14 consonantes y 10 vocales. Las letras no se escriben en una fila como en español; se agrupan dentro de un bloque que representa una sílaba.', STYLES['lead']),
        info_box('Fórmula', 'Consonante inicial (초성) + vocal (중성) + consonante final opcional (종성)', CREAM),
        Spacer(1, 5 * mm),
        para('Cómo leer un bloque', STYLES['h1']),
        data_table(
            ['Bloque', 'Composición', 'Lectura', 'Idea clave'],
            [
                ['가', 'ㄱ + ㅏ', 'ga', 'Vocal vertical: se coloca a la derecha.'],
                ['고', 'ㄱ + ㅗ', 'go', 'Vocal horizontal: se coloca debajo.'],
                ['한', 'ㅎ + ㅏ + ㄴ', 'han', 'ㄴ ocupa la posición final o batchim.'],
                ['아', 'ㅇ + ㅏ', 'a', 'ㅇ al inicio es mudo.'],
                ['강', 'ㄱ + ㅏ + ㅇ', 'gang', 'ㅇ al final suena /ng/.'],
            ],
            [24 * mm, 42 * mm, 26 * mm, 77 * mm],
        ),
        Spacer(1, 5 * mm),
        para('Regla espacial', STYLES['h2']),
        para('Las vocales verticales ㅏ, ㅓ, ㅣ, ㅐ y ㅔ van a la derecha de la consonante inicial. Las vocales horizontales ㅗ, ㅜ y ㅡ van debajo. El bloque siempre se ajusta a una forma cuadrada.', STYLES['body']),
        para('La romanización es una ayuda temporal. Úsala para comprobar, pero vuelve siempre al bloque coreano.', STYLES['body']),
        PageBreak(),
    ]

    story += [para('02 - MAPA DE LETRAS', STYLES['eyebrow']), para('Vocales básicas', STYLES['title'])]
    story.append(data_table(
        ['Letra', 'Lectura', 'Ejemplo', 'Palabra'],
        [
            ['ㅏ', 'a', '아', '아이 - niño'], ['ㅓ', 'eo', '어', '어디 - dónde'],
            ['ㅗ', 'o', '오', '오늘 - hoy'], ['ㅜ', 'u', '우', '우리 - nosotros'],
            ['ㅡ', 'eu', '으', '이름 - nombre'], ['ㅣ', 'i', '이', '이름 - nombre'],
            ['ㅐ', 'ae', '애', '개 - perro'], ['ㅔ', 'e', '에', '네 - sí'],
            ['ㅚ', 'oe / we', '외', '외국 - país extranjero'], ['ㅟ', 'wi', '위', '위 - encima'],
        ],
        [24 * mm, 31 * mm, 28 * mm, 86 * mm],
    ))
    story += [Spacer(1, 5 * mm), para('Consonantes básicas', STYLES['h1'])]
    story.append(data_table(
        ['Letra', 'Nombre', 'Sonido inicial aprox.', 'Ejemplo'],
        [
            ['ㄱ', '기역', 'g / k', '가 - ga'], ['ㄴ', '니은', 'n', '나 - na'],
            ['ㄷ', '디귿', 'd / t', '다 - da'], ['ㄹ', '리을', 'r / l', '라 - ra'],
            ['ㅁ', '미음', 'm', '마 - ma'], ['ㅂ', '비읍', 'b / p', '바 - ba'],
            ['ㅅ', '시옷', 's', '사 - sa'], ['ㅇ', '이응', 'mudo / ng final', '아 - a'],
            ['ㅈ', '지읒', 'j', '자 - ja'], ['ㅊ', '치읓', 'ch', '차 - cha'],
            ['ㅋ', '키읔', 'k aspirada', '카 - ka'], ['ㅌ', '티읕', 't aspirada', '타 - ta'],
            ['ㅍ', '피읖', 'p aspirada', '파 - pa'], ['ㅎ', '히읗', 'h', '하 - ha'],
        ],
        [22 * mm, 35 * mm, 56 * mm, 56 * mm],
    ))
    story.append(PageBreak())

    story += [
        para('03 - ESCUCHAR Y REPETIR', STYLES['eyebrow']),
        para('Cuatro pistas de pronunciación', STYLES['title']),
        para('Escucha cada pista una vez sin leer. Después escucha de nuevo señalando cada bloque. En la tercera repetición, habla junto con la voz.', STYLES['lead']),
        audio_card(1, 'Modelo de sílabas', '가, 나, 다, 라, 마, 바, 사, 아, 자, 차, 카, 타, 파, 하.', 'Serie consonante + ㅏ.', 'modelo-silabas.m4a'),
        Spacer(1, 3 * mm),
        audio_card(2, 'Vocales básicas', '아, 어, 오, 우, 으, 이.', 'a, eo, o, u, eu, i', 'vocales-basicas.m4a'),
        Spacer(1, 3 * mm),
        audio_card(3, 'Palabras para leer', '아이. 어디. 오늘. 우리. 이름. 한글.', 'niño; dónde; hoy; nosotros; nombre; hangeúl', 'palabras-basicas.m4a'),
        Spacer(1, 3 * mm),
        audio_card(4, 'Primeras frases', '안녕하세요. 감사합니다. 저는 한국어를 공부해요.', 'Hola. Gracias. Estudio coreano.', 'frases-iniciales.m4a'),
        Spacer(1, 5 * mm),
        info_box('Control de calidad personal', '¿Distingues 어 de 오? ¿Mantienes 으 sin convertirla en una u española? ¿Lees ㅇ como mudo al inicio y como ng al final?', PALE_RED),
        PageBreak(),
    ]

    story += [
        para('04 - PRÁCTICA', STYLES['eyebrow']),
        para('Reconocer y construir', STYLES['title']),
        para('Resuelve sin mirar las tablas. Las soluciones aparecen al final.', STYLES['lead']),
    ]
    recognition = [
        '¿Qué vocal representa el sonido a?  ㅏ / ㅓ / ㅗ / ㅜ',
        '¿Qué vocal representa el sonido u?  ㅜ / ㅡ / ㅗ / ㅣ',
        '¿Qué consonante representa m?  ㅁ / ㅂ / ㅍ / ㅅ',
        '¿Qué consonante es muda al inicio?  ㅇ / ㅎ / ㄱ / ㄴ',
        '¿Cómo se lee 가?  ga / na / da / ha',
        '¿Cómo se lee 이?  i / eu / ae / o',
        '¿Cómo se lee 마?  ma / ba / na / sa',
        '¿Cómo se lee 우?  u / o / eo / i',
        '¿Qué bloque contiene batchim?  한 / 가 / 나 / 다',
        '¿Dónde va ㅗ dentro del bloque?  debajo / derecha / izquierda / fuera',
    ]
    for index, item in enumerate(recognition, 1):
        story.append(para(f'{index}. {item}', STYLES['exercise']))

    story += [Spacer(1, 3 * mm), para('Forma el bloque correcto', STYLES['h1'])]
    builds = [('11. ㄴ + ㅏ', '____'), ('12. ㅁ + ㅏ', '____'), ('13. ㅎ + ㅏ', '____'), ('14. ㅇ + ㅗ', '____'), ('15. ㄱ + ㅗ', '____'), ('16. ㅂ + ㅏ + ㅂ', '____'), ('17. ㅎ + ㅏ + ㄴ', '____'), ('18. ㅁ + ㅜ + ㄹ', '____')]
    build_table = Table([[para(left, STYLES['body']), para(right, STYLES['body'])] for left, right in builds], colWidths=[84.5 * mm, 84.5 * mm])
    build_table.setStyle(TableStyle([('GRID', (0, 0), (-1, -1), 0.55, LINE), ('BACKGROUND', (0, 0), (-1, -1), WHITE), ('LEFTPADDING', (0, 0), (-1, -1), 8), ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7)]))
    story += [build_table, PageBreak()]

    story += [para('04 - PRÁCTICA', STYLES['eyebrow']), para('Leer y escribir', STYLES['title']), para('Completa primero la lectura; después copia las palabras respetando el orden de los trazos.', STYLES['lead'])]
    reading = [
        ('19. 나', '________'), ('20. 너', '________'), ('21. 우리', '________'),
        ('22. 이름', '________'), ('23. 한국', '________'), ('24. 한글', '________'),
    ]
    story.append(data_table(['Palabra', 'Romanización'], reading, [55 * mm, 114 * mm]))
    story += [Spacer(1, 5 * mm), para('Copia y produce', STYLES['h1'])]
    prompts = [
        'Copia tres veces: 안녕하세요  ________________________________________________',
        'Copia tres veces: 감사합니다  ________________________________________________',
        'Escribe hola informal en hangeúl: ___________________________________________',
        'Escribe yo informal en hangeúl: _____________________________________________',
        'Escribe Corea en hangeúl: _________________________________________________',
        'Completa con tu nombre: 저는 __________________ 예요/이에요.',
        'Escribe una palabra con vocal vertical: ______________________________________',
        'Escribe una palabra con vocal horizontal: ____________________________________',
    ]
    for index, item in enumerate(prompts, 25):
        story.append(para(f'{index}. {item}', STYLES['exercise']))
    story += [Spacer(1, 5 * mm), info_box('Producción final', 'Lee en voz alta: 안녕하세요. 저는 [nombre]예요. 한국어를 공부해요. 감사합니다.', CREAM), PageBreak()]

    story += [
        para('05 - SOLUCIONES', STYLES['eyebrow']),
        para('Corrige y vuelve a leer', STYLES['title']),
        para('Marca el acierto, explica la regla y repite en voz alta las formas que todavía te cuesten.', STYLES['lead']),
    ]
    answers = [
        '1. ㅏ. 2. ㅜ. 3. ㅁ. 4. ㅇ. 5. ga. 6. i. 7. ma. 8. u. 9. 한. 10. debajo.',
        '11. 나. 12. 마. 13. 하. 14. 오. 15. 고. 16. 밥. 17. 한. 18. 물.',
        '19. na. 20. neo. 21. uri. 22. ireum. 23. Hanguk. 24. hangeul.',
        '25-26. Copia personal. Comprueba que cada bloque conserve su forma cuadrada.',
        '27. 안녕. 28. 나. 29. 한국. 30. Respuesta personal con 예요 después de vocal o 이에요 después de consonante.',
        '31-32. Respuestas personales. Comprueba la posición de la vocal y que cada sílaba forme un bloque cuadrado.',
    ]
    for item in answers:
        story.append(para(item, STYLES['answer']))
    story += [Spacer(1, 5 * mm), para('Tres errores que debes evitar', STYLES['h1'])]
    for mistake in [
        'No leas ㅓ como dos vocales. eo es una convención de romanización para un solo sonido.',
        'No pronuncies ㅇ al inicio: 아 se lee a. Al final, ㅇ suena ng.',
        'No memorices solo con letras latinas: tapa la romanización y vuelve al bloque coreano.',
    ]:
        story.append(para(f'X {mistake}', STYLES['body']))
    story += [Spacer(1, 6 * mm), info_box('Siguiente paso', 'Vuelve a las cuatro pistas mañana. Después continúa con la estructura SOV y las partículas de tema, sujeto y objeto.', PALE_BLUE)]
    return story


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    Workbook(str(OUTPUT)).build(build_story())
    copy2(OUTPUT, PUBLIC)
    print(OUTPUT)
    print(PUBLIC)


if __name__ == '__main__':
    main()
