"""Generate the seven companion sets after running scripts/export-clock-lessons.mjs."""
import json
import os
import runpy
from itertools import groupby
from io import BytesIO
from pathlib import Path
from xml.sax.saxutils import escape

from PIL import Image as Photo
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Image, KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
# The German guide and the web use the same exact angles for both hands.
os.environ['GRAMMAR_PDF_LANGUAGE'] = 'german'
clock_diagram = runpy.run_path(str(ROOT / 'scripts/generate-english-grammar-pdfs.py'))['clock_diagram']
NAVY = colors.HexColor('#16315a')
GRAY = colors.HexColor('#425266')
LINE = colors.HexColor('#ced8df')
PAPER = colors.HexColor('#f6f4ee')
WIDTH = 171*mm
BASE = ROOT / 'tmp/pdfs/clock-lessons'
LOGO = ImageReader(str(ROOT / 'public/images/welearn-wordmark-transparent-v2.png'))


def register_face(alias, path):
    face = TTFont(alias, str(path))
    # ReportLab otherwise aliases the compact and full Noto files by their shared PostScript name.
    face.face.name = path.stem.encode('ascii')
    pdfmetrics.registerFont(face)


def photo(name):
    stream = BytesIO()
    with Photo.open(ROOT / f'public/images/grammar/aleman/uhrzeit/{name}.webp') as source:
        source.thumbnail((560, 374))
        source.convert('RGB').save(stream, 'JPEG', quality=82)
    stream.seek(0)
    return Image(stream, width=44*mm, height=44*mm*2/3)


class Book:
    def __init__(self, language, course):
        self.topic = course['topic']
        self.name = course['name']
        self.reference = course['reference']
        self.directory = ROOT / f'private/site-materials/{language}-a1/grammar/relojes'
        self.directory.mkdir(parents=True, exist_ok=True)
        base = {'coreano':'noto-sans-kr','japones':'welearn-ja','ruso':'welearn-ru'}.get(language, 'welearn-ko')
        for weight in ('400','700'):
            register_face(f'{language}-{weight}', ROOT / f'public/fonts/{base}-{weight}.ttf')
            fallback = f'clock-fallback-{weight}'
            if fallback not in pdfmetrics.getRegisteredFontNames():
                register_face(fallback, ROOT / f'public/fonts/noto-sans-kr-{weight}.ttf')
        self.styles = {}
        for name, size, weight, color in [('title',22,'700',NAVY),('h',13,'700',NAVY),('body',10,'400',NAVY),('model',10,'700',NAVY),('small',8.5,'400',GRAY)]:
            self.styles[name] = ParagraphStyle(name, fontName=f'{language}-{weight}', fontSize=size,
                leading=size*1.4, spaceAfter=3, textColor=color, wordWrap='CJK' if language in ('japones','coreano') else None)

    def p(self, text, style='body'):
        paragraph_style = self.styles[style]
        font = paragraph_style.fontName
        available = pdfmetrics.getFont(font).face.charToGlyph
        fallback = 'clock-fallback-' + font.rsplit('-', 1)[1]
        parts = []
        for primary, chars in groupby(text, lambda c: c.isspace() or bool(available.get(ord(c)))):
            run = ''.join(chars)
            if primary:
                parts.append(escape(run))
            else:
                coverage = pdfmetrics.getFont(fallback).face.charToGlyph
                if any(not coverage.get(ord(c)) for c in run):
                    raise ValueError(f'Falta un glifo en {self.name}: {run}')
                parts.append(f'<font name="{fallback}">{escape(run)}</font>')
        return Paragraph(''.join(parts), paragraph_style)

    def table(self, rows, widths, shaded=False):
        obj = Table(rows, colWidths=widths, hAlign='LEFT')
        rules = [('VALIGN',(0,0),(-1,-1),'MIDDLE'),('LINEBELOW',(0,0),(-1,-1),.45,LINE),
                 ('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5)]
        if shaded:
            rules += [('ROWBACKGROUNDS',(0,0),(-1,-1),[PAPER,colors.white])]
        obj.setStyle(TableStyle(rules))
        return obj

    def heading(self, title, subtitle):
        return [self.p(title,'title'),self.p(subtitle),Spacer(1,3*mm)]

    def render(self, file, label, story):
        doc = SimpleDocTemplate(str(self.directory/f'{file}.pdf'), pagesize=A4, leftMargin=18*mm,
            rightMargin=18*mm, topMargin=28*mm, bottomMargin=18*mm, invariant=1,
            title=f'{label} · La hora en {self.name.lower()} A1', author='Idiomas WeLearn')
        def frame(canvas, document):
            canvas.drawImage(LOGO, 17*mm, 276*mm, 38*mm, 14*mm, preserveAspectRatio=True, mask='auto')
            canvas.setFont('Helvetica',9)
            canvas.setFillColor(NAVY)
            canvas.drawRightString(192*mm,282*mm,f'{self.name} A1  /  {label}')
            canvas.setStrokeColor(LINE)
            canvas.line(18*mm,274*mm,192*mm,274*mm)
            canvas.drawString(18*mm,10*mm,'Idiomas WeLearn')
            canvas.drawRightString(192*mm,10*mm,str(document.page))
        doc.build(story,onFirstPage=frame,onLaterPages=frame)

    def guide(self):
        topic = self.topic
        clocks = topic['visual']['clocks']
        title = topic['title']
        story = self.heading(title,topic['lead'])
        story += [self.p(topic['guide']['formula']), self.p('La corta indica la hora. Cada número que recorre la larga vale cinco minutos.','small')]
        for clock in clocks:
            words = [self.p(clock['digital']+' · '+clock['spoken'],'model')]
            if clock.get('pronunciation'): words.append(self.p(clock['pronunciation'],'small'))
            words.extend([self.p(clock['meaning']),self.p(clock['note'],'small')])
            story.append(self.table([[clock_diagram(clock,23*mm),words]],[31*mm,WIDTH-31*mm]))
        story += [PageBreak(),*self.heading('Vocabulario y más ejemplos','Lee el ejemplo en voz alta y trata de recordar qué significa antes de mirar la traducción.')]
        for section in topic['seo']:
            if 'table' not in section: continue
            story.append(self.p(section['heading'],'h'))
            rows = [[self.p(cell,'model' if index==0 else 'small') for cell in row] for index,row in enumerate(section['table'])]
            widths = [45*mm,45*mm,WIDTH-90*mm] if section['table'][0][0] != 'Hora' else [23*mm,77*mm,WIDTH-100*mm]
            story.append(self.table(rows,widths,True))
            story.append(Spacer(1,3*mm))
        story += [PageBreak(),*self.heading('La hora en tres conversaciones','¿Qué hora es ahora? ¿A qué hora ocurre algo? Busca en cada diálogo qué está preguntando la persona.')]
        sections = next(s for s in topic['seo'] if s.get('clockConversations'))
        for scene in sections['clockConversations']:
            words = [self.p(scene['title'],'h'),self.p(scene['setting'])]
            for exchange in scene['exchanges']:
                words.append(self.p(exchange['time'],'small'))
                for key in ['question','answer']:
                    words.append(self.p(exchange[key],'model'))
                    if exchange.get(key+'Reading'): words.append(self.p(exchange[key+'Reading'],'small'))
                    words.append(self.p(exchange[key+'Es'],'small'))
            story += [self.table([[photo(scene['image']),words]],[52*mm,WIDTH-52*mm]),Spacer(1,3*mm)]
        story += [PageBreak(),*self.heading('Dudas frecuentes','Compara las dos primeras horas. Después ensaya los ejemplos con una hora de tu agenda.')]
        for tip in topic['guide']['clockTips']:
            group = [self.p(tip['cue'],'h'),self.p(tip['example'],'model'),self.p(tip['explanation'])]
            if tip.get('comparison'):
                cells = [[clock_diagram(c,22*mm),self.p(c['digital']+' · '+c['spoken'],'small')] for c in tip['comparison']]
                group.append(self.table([cells],[WIDTH/2]*2))
            story += [KeepTogether(group),Spacer(1,3*mm)]
        self.render('guia','Guía ilustrada',story)

    def exercise_set(self):
        pages, key = [], []
        for level_index,level in enumerate(self.topic['practice']['levels']):
            if level_index:
                pages.append(PageBreak())
                if level_index%2==0: key.append(PageBreak())
            title=f"{level_index+1}. {level['title']}"
            pages += self.heading(title, level['intro'])
            key.append(self.p(title,'h'))
            items=level.get('items',level.get('blanks',[]))
            keyrows=[]
            for i,item in enumerate(items):
                n=str(i+1)
                if level['type'] in ('guidedText','freeText'):
                    prompt=level['text'].split('\n\n')[i].replace('[['+str(i)+']]','________')
                elif 'prompt' in item: prompt=item['prompt']
                else: prompt=' '.join(line[1] for line in item['lines'])
                words=[self.p(n+'. '+prompt,'model')]
                options=item.get('options',[])
                if options:
                    # Rotate the printed choices so their placement does not disclose the key.
                    shift=(i+1)%len(options)
                    words.append(self.p('   /   '.join(options[shift:]+options[:shift]),'small'))
                words.append(self.p('________________________________________','small'))
                if item.get('clock'):
                    pages.append(self.table([[clock_diagram(item['clock'],19*mm),words]],[28*mm,WIDTH-28*mm]))
                else:
                    pages += [KeepTogether(words),Spacer(1,4*mm)]
                keyrows.append([self.p(n,'small'),self.p(item['answer'],'model'),self.p(item['explain'],'small')])
            key += [self.table(keyrows,[10*mm,64*mm,WIDTH-74*mm],True),Spacer(1,4*mm)]
        self.render('ejercicios','Cuaderno de ejercicios',pages)
        self.render('soluciones','Soluciones',key)


if __name__ == '__main__':
    for language in ['ingles','frances','italiano','portugues','coreano','japones','ruso']:
        course = json.loads((BASE/f'{language}.json').read_text())
        book = Book(language,course)
        book.guide()
        book.exercise_set()
        print(language, flush=True)
