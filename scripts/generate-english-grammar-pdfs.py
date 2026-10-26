#!/usr/bin/env python3
"""Generate the complete English, French, or German grammar workbook collection."""

import json
import os
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
PDF_LANGUAGE = os.environ.get('GRAMMAR_PDF_LANGUAGE', 'english').lower()
IS_FRENCH = PDF_LANGUAGE == 'french'
IS_GERMAN = PDF_LANGUAGE == 'german'
DATA = Path(os.environ.get('GRAMMAR_PDF_DATA', ROOT / 'tmp' / 'english-grammar' / 'topics.json'))
OUTPUT = Path(os.environ.get('GRAMMAR_PDF_OUTPUT', os.environ.get('ENGLISH_GRAMMAR_PDF_OUTPUT', ROOT / 'output' / 'pdf' / f'{PDF_LANGUAGE}-grammar')))
if not OUTPUT.is_absolute():
    OUTPUT = ROOT / OUTPUT
PUBLIC = ROOT / 'private' / 'site-materials'
PUBLIC_PREFIX = os.environ.get('GRAMMAR_PDF_PUBLIC_PREFIX', 'frances' if IS_FRENCH else 'aleman' if IS_GERMAN else 'ingles')
FONT_REGULAR = ROOT / 'public' / 'fonts' / 'welearn-ko-400.ttf'
FONT_BOLD = ROOT / 'public' / 'fonts' / 'welearn-ko-700.ttf'
LOGO = ROOT / 'public' / 'images' / 'welearn-wordmark-transparent-v2.png'

NAVY = colors.HexColor('#012169')
RED = colors.HexColor('#C8102E')
BLUE = colors.HexColor('#244C9A')
INK = colors.HexColor('#172033')
MUTED = colors.HexColor('#667085')
LINE = colors.HexColor('#D8DEE9')
CREAM = colors.HexColor('#F8F3E9')
PALE_BLUE = colors.HexColor('#EEF3FF')
PALE_RED = colors.HexColor('#FFF0F2')
PALE_GOLD = colors.HexColor('#FFF7DF')
PALE_GREEN = colors.HexColor('#EEF9F4')
SOFT_BG = colors.HexColor('#F6F7FB')
WHITE = colors.white
PAGE_W, PAGE_H = A4

pdfmetrics.registerFont(TTFont('WeLearnEN', str(FONT_REGULAR)))
pdfmetrics.registerFont(TTFont('WeLearnEN-Bold', str(FONT_BOLD)))


GERMAN_TEXT = {
    'complete guide': 'vollständiger Kurs', 'exercise workbook': 'Übungsheft', 'answer key': 'Lösungsschlüssel',
    'English grammar': 'Deutsche Grammatik', 'Complete guide': 'Vollständiger Kurs', 'Exercise workbook': 'Übungsheft',
    'Answer key': 'Lösungsschlüssel', 'Original material · English': 'Originalmaterial · Deutsch', 'Page': 'Seite',
    'Options': 'Auswahl', 'OPTIONS  ': 'AUSWAHL  ', 'ENGLISH': 'DEUTSCH', 'This document': 'Dieses Dokument',
    'Model answers and concise grammar explanations for every stage in the separate exercise workbook.': 'Musterlösungen und knappe grammatische Erklärungen zu jeder Stufe des getrennten Übungshefts.',
    'Recommended use': 'Empfohlene Verwendung', 'Keep the three-document system together': 'Das System aus drei Dokumenten zusammen verwenden',
    'Use the complete guide to understand the concept, this workbook to practise, and the answer key to diagnose each decision.': 'Nutzen Sie den vollständigen Kurs zum Verstehen, das Übungsheft zum Trainieren und den Lösungsschlüssel zur Auswertung jeder Entscheidung.',
    'Correct one stage at a time. Explain the rule aloud before marking an answer as secure.': 'Korrigieren Sie jeweils eine Stufe. Erklären Sie die Regel laut, bevor Sie eine Antwort als sicher markieren.',
    'WELEARN STUDY SEQUENCE': 'WELEARN-LERNABLAUF', 'Practice stage': 'Übungsstufe', 'Gap': 'Lücke',
    'Word bank': 'Formenbank', 'Available forms': 'Verfügbare Formen', 'Stage check': 'Stufenkontrolle',
    'Pause before continuing': 'Vor dem Fortfahren kurz prüfen',
    'Underline the trigger or decision point, name the rule, and check that the meaning has not changed.': 'Unterstreichen Sie den Auslöser oder Entscheidungspunkt, benennen Sie die Regel und prüfen Sie, ob die Bedeutung erhalten bleibt.',
    'Retrieval': 'Aktiver Abruf', 'Final self-check': 'Abschließende Selbstkontrolle',
    'Complete these prompts without reopening the guide.': 'Bearbeiten Sie diese Impulse, ohne den Kurs erneut zu öffnen.',
    'Review focus': 'Wiederholungsfokus', 'Compare the form first, then read the explanation and name the rule in your own words.': 'Vergleichen Sie zuerst die Form, lesen Sie dann die Erklärung und formulieren Sie die Regel mit eigenen Worten.',
    'Feedback': 'Rückmeldung', 'Diagnose the pattern, not only the score': 'Analysieren Sie das Muster, nicht nur die Punktzahl',
    'Use this page to decide what to revisit in the complete guide.': 'Nutzen Sie diese Seite, um die nächste Wiederholung im vollständigen Kurs zu planen.',
    'What went wrong? What rule will prevent the same error next time?': 'Was ist schiefgegangen? Welche Regel verhindert denselben Fehler beim nächsten Mal?',
    'ADVANCED GRAMMAR': 'FORTGESCHRITTENE GRAMMATIK', 'The central idea': 'Die zentrale Idee', 'Model': 'Modell',
    'This complete guide combines explanation, visual reasoning, practice and feedback. Separate exercise and answer-key editions are also available from the lesson page.': 'Dieser vollständige Kurs verbindet Erklärung, visuelles Denken, Übungen und Rückmeldung. Ein getrenntes Übungsheft und ein Lösungsschlüssel stehen ebenfalls auf der Lektionsseite bereit.',
    'LEARNING OUTCOMES': 'LERNZIELE', 'Understand': 'Verstehen', 'Build meaning before form': 'Bedeutung vor Form aufbauen',
    'Visual map': 'Visuelle Karte', 'Reason through the pattern': 'Das Muster schrittweise begründen',
    'DECIDE IN THIS ORDER': 'IN DIESER REIHENFOLGE ENTSCHEIDEN', 'Reference': 'Übersicht',
    'Compare forms and meanings': 'Formen und Bedeutungen vergleichen', 'Use the table to justify each structural choice.': 'Begründen Sie jede strukturelle Wahl mithilfe der Tabelle.',
    'EXAMPLES AT A GLANCE': 'BEISPIELE AUF EINEN BLICK', 'COMMON ERRORS': 'HÄUFIGE FEHLER',
    'Edit this': 'Überarbeiten', 'Avoid this pattern': 'Dieses Fehlermuster vermeiden',
    'exercises': 'uebungen', 'answer-key': 'loesungen',
}


def germanize(value):
    if isinstance(value, list):
        if value == ['complete guide', 'exercise workbook', 'answer key', 'retrieval review']:
            return ['vollständiger Kurs', 'Übungsheft', 'Lösungsschlüssel', 'aktiver Abruf']
        if value == ['Trigger or context', 'Auxiliary or structural choice', 'Main verb or clause form', 'Meaning and register']:
            return ['Auslöser oder Kontext', 'Hilfsverb oder Strukturwahl', 'Vollverb oder Satzform', 'Bedeutung und Register']
        return value
    if value in GERMAN_TEXT:
        return GERMAN_TEXT[value]
    match = re.fullmatch(r'(\d+) learning decisions arranged in six progressive stages\. Write directly on the page and consult the separate answer key only after completing a stage\.', value)
    if match:
        return f"{match.group(1)} Lernentscheidungen in sechs progressiven Stufen. Schreiben Sie direkt auf die Seite und nutzen Sie den getrennten Lösungsschlüssel erst nach Abschluss einer Stufe."
    match = re.fullmatch(r'Printable practice for (.+)\. No explanations or solutions interrupt the work pages\.', value)
    if match:
        return f"Druckbare Übungen zu {match.group(1)}. Keine Erklärungen oder Lösungen unterbrechen die Arbeitsseiten."
    match = re.fullmatch(r'Explain and exemplify: (.+)\.', value)
    if match:
        return f"Erklären und mit einem Beispiel belegen: {match.group(1)}."
    match = re.fullmatch(r'Solutions and feedback for the (.+) exercise workbook\.', value)
    if match:
        return f"Lösungen und Rückmeldung zum Übungsheft {match.group(1)}."
    match = re.fullmatch(r'(\d+) GUIDED STAGES · (\d+) LEARNING DECISIONS', value)
    if match:
        return f"{match.group(1)} GELENKTE STUFEN · {match.group(2)} LERNENTSCHEIDUNGEN"
    match = re.fullmatch(r'Outcome (\d+)', value)
    if match:
        return f"Lernziel {match.group(1)}"
    match = re.fullmatch(r'Step (\d+)', value)
    if match:
        return f"Schritt {match.group(1)}"
    match = re.fullmatch(r'Decision (\d+)', value)
    if match:
        return f"Entscheidung {match.group(1)}"
    return value


def l(english, french):
    if IS_FRENCH:
        return french
    if IS_GERMAN:
        return germanize(english)
    return english


def p(text, style):
    printable = str(text).replace('→', '->')
    return Paragraph(escape(printable).replace('\n', '<br/>'), style)


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
    'cover_title': ParagraphStyle('cover_title', fontName='WeLearnEN-Bold', fontSize=29, leading=34, textColor=NAVY, spaceAfter=10),
    'cover_lead': ParagraphStyle('cover_lead', fontName='WeLearnEN', fontSize=11.2, leading=17.5, textColor=INK, spaceAfter=10),
    'section_title': ParagraphStyle('section_title', fontName='WeLearnEN-Bold', fontSize=21, leading=26, textColor=NAVY, spaceAfter=8),
    'section_lead': ParagraphStyle('section_lead', fontName='WeLearnEN', fontSize=10, leading=15.5, textColor=INK, spaceAfter=9),
    'card_title': ParagraphStyle('card_title', fontName='WeLearnEN-Bold', fontSize=9.2, leading=12.5, textColor=BLUE, spaceAfter=4),
    'card_body': ParagraphStyle('card_body', fontName='WeLearnEN', fontSize=8.6, leading=12.8, textColor=INK, spaceAfter=2),
    'exercise_large': ParagraphStyle('exercise_large', fontName='WeLearnEN', fontSize=8.8, leading=13.3, textColor=INK, spaceAfter=3),
    'answer_large': ParagraphStyle('answer_large', fontName='WeLearnEN', fontSize=8.1, leading=12, textColor=INK, spaceAfter=3),
}


class Workbook(BaseDocTemplate):
    def __init__(self, filename, topic, edition='complete'):
        self.topic = topic
        self.edition = edition
        advanced = topic['level'].lower() in ('b2', 'c1', 'c2')
        edition_label = {'complete': l('complete guide', 'cours complet'), 'exercises': l('exercise workbook', "cahier d'exercices"), 'answer-key': l('answer key', 'corrigé')}[edition]
        subject = f"{l('English grammar', 'Grammaire française')} {edition_label} {topic['level']}" if advanced else f"Cuaderno de gramática inglesa {topic['level']}"
        super().__init__(filename, pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=31 * mm, bottomMargin=20 * mm, title=f"Idiomas WeLearn - {topic['title']} - {edition_label}", author='Idiomas WeLearn', subject=subject)
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id='body')
        self.addPageTemplates([PageTemplate(id='welearn', frames=[frame], onPage=self.draw_page)])

    def draw_page(self, canvas, doc):
        canvas.saveState()
        canvas.setFillColor(WHITE)
        canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
        advanced = self.topic['level'].lower() in ('b2', 'c1', 'c2')
        if advanced and doc.page == 1:
            canvas.setFillColor(SOFT_BG)
            canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
            canvas.setFillColor(RED)
            canvas.circle(PAGE_W + 13 * mm, PAGE_H - 8 * mm, 48 * mm, fill=1, stroke=0)
            canvas.setFillColor(colors.HexColor('#E9EDF8'))
            canvas.circle(-10 * mm, 47 * mm, 33 * mm, fill=1, stroke=0)
        elif advanced:
            canvas.setFillColor(SOFT_BG)
            canvas.rect(0, PAGE_H - 29 * mm, PAGE_W, 29 * mm, fill=1, stroke=0)
            canvas.setFillColor(RED)
            canvas.circle(PAGE_W - 18 * mm, PAGE_H - 14 * mm, 5 * mm, fill=1, stroke=0)
        else:
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
        edition_footer = {'complete': l('Complete guide', 'Cours complet'), 'exercises': l('Exercise workbook', "Cahier d'exercices"), 'answer-key': l('Answer key', 'Corrigé')}[self.edition]
        footer = f"{l('Original material · English', 'Ressource originale · Français')} {self.topic['level']} · {edition_footer} · idiomaswl.com" if advanced else f"Material original · Inglés {self.topic['level']} · idiomaswl.com"
        page_label = l('Page', 'Page') if advanced else 'Página'
        canvas.drawString(18 * mm, 10 * mm, footer)
        canvas.drawRightString(PAGE_W - 18 * mm, 10 * mm, f'{page_label} {doc.page}')
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
    advanced = topic['level'].lower() in ('b2', 'c1', 'c2')
    options_label = l('Options', 'Choix') if advanced else 'Opciones'
    for level in topic['practice']['levels']:
        kind, title = level['type'], level['title']
        if kind == 'choice':
            for item in level['items']:
                prompt = ' '.join(line[1] for line in item['lines'])
                exercises.append((number, title, f"{prompt}   {options_label}: {' · '.join(item['options'])}"))
                answers.append((number, item['answer'], item['explain']))
                number += 1
        elif kind == 'dual':
            for item in level['items']:
                prompt = blank_text(' '.join(line[1] for line in item['lines']))
                options = ' / '.join(' · '.join(blank.get('options', [])) for blank in item['blanks'])
                exercises.append((number, title, f'{prompt}   {options_label}: {options}'))
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


def editorial_card(label, title, body, background=PALE_BLUE, accent=BLUE):
    content = [
        p(label.upper(), ParagraphStyle('card_label', parent=STYLES['eyebrow'], textColor=accent, fontSize=7.2, leading=9, spaceAfter=3)),
        p(title, STYLES['card_title']),
        p(body, STYLES['card_body']),
    ]
    table = Table([[content]], colWidths=[169 * mm], hAlign='LEFT')
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), background),
        ('BOX', (0, 0), (-1, -1), .65, LINE),
        ('LINEBEFORE', (0, 0), (0, -1), 4, accent),
        ('LEFTPADDING', (0, 0), (-1, -1), 11), ('RIGHTPADDING', (0, 0), (-1, -1), 11),
        ('TOPPADDING', (0, 0), (-1, -1), 9), ('BOTTOMPADDING', (0, 0), (-1, -1), 9),
    ]))
    return table


def section_heading(number, eyebrow, title, lead=None):
    block = [p(f'{number} · {eyebrow.upper()}', STYLES['eyebrow']), Spacer(1, 2.5 * mm), p(title, STYLES['section_title'])]
    if lead:
        block.append(p(lead, STYLES['section_lead']))
    return [KeepTogether(block)]


def formula_flow(parts):
    cells = []
    widths = []
    for index, part in enumerate(parts):
        cells.append([p(f'{index + 1:02d}', STYLES['eyebrow']), p(part, STYLES['card_title'])])
        widths.append(169 * mm / len(parts))
    table = Table([cells], colWidths=widths, hAlign='LEFT')
    style = [
        ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('BOX', (0, 0), (-1, -1), .7, LINE),
        ('INNERGRID', (0, 0), (-1, -1), .55, LINE),
        ('ROWBACKGROUNDS', (0, 0), (-1, -1), [PALE_BLUE]),
        ('LEFTPADDING', (0, 0), (-1, -1), 8), ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 9), ('BOTTOMPADDING', (0, 0), (-1, -1), 9),
    ]
    style.extend(('BACKGROUND', (index, 0), (index, 0), PALE_RED if index == 0 else PALE_BLUE) for index in range(len(parts)))
    table.setStyle(TableStyle(style))
    return table


def practice_box(code, scene, prompt, options=None, lines=0, background=WHITE):
    content = [p(f'{code} · {scene}'.upper(), STYLES['eyebrow']), p(blank_text(prompt), STYLES['exercise_large'])]
    if options:
        content.append(p(l('OPTIONS  ', 'CHOIX  ') + '  ·  '.join(options), STYLES['small']))
    for _ in range(lines):
        content.append(p('________________________________________________________________________________', STYLES['small']))
    table = Table([[content]], colWidths=[169 * mm], hAlign='LEFT')
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), background), ('BOX', (0, 0), (-1, -1), .65, LINE),
        ('LEFTPADDING', (0, 0), (-1, -1), 10), ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    return table


def practice_decision_count(topic):
    total = 0
    for level in topic['practice']['levels']:
        if level['type'] == 'dual':
            total += sum(len(item['blanks']) for item in level['items'])
        elif level['type'] in ('choice', 'write'):
            total += len(level['items'])
        else:
            total += len(level['blanks'])
    return total


def build_advanced_editorial_story(topic):
    story = []
    decisions = practice_decision_count(topic)
    levels = topic['practice']['levels']

    # Cover — mirrors the approved WeLearn editorial language: generous space,
    # a strong red/blue hierarchy and a concrete learning promise.
    story += [Spacer(1, 28 * mm), p(f"ENGLISH {topic['level']} · ADVANCED GRAMMAR", STYLES['eyebrow']), p(topic['shortTitle'], STYLES['cover_title']), p(topic['lead'], STYLES['cover_lead'])]
    story += [Spacer(1, 3 * mm), editorial_card('The central idea', 'Front the restriction; invert the auxiliary', topic['description'], PALE_BLUE, RED), Spacer(1, 6 * mm)]
    metrics = [[
        [p('6', STYLES['section_title']), p('guided stages', STYLES['small'])],
        [p(str(decisions), STYLES['section_title']), p('learning decisions', STYLES['small'])],
        [p('60', STYLES['section_title']), p('recommended minutes', STYLES['small'])],
    ]]
    metric_table = Table(metrics, colWidths=[56.3 * mm] * 3)
    metric_table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), WHITE), ('BOX', (0, 0), (-1, -1), .7, LINE), ('INNERGRID', (0, 0), (-1, -1), .55, LINE), ('ALIGN', (0, 0), (-1, -1), 'CENTER'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('TOPPADDING', (0, 0), (-1, -1), 10), ('BOTTOMPADDING', (0, 0), (-1, -1), 10)]))
    story += [metric_table, Spacer(1, 8 * mm), p('BY THE END, YOU WILL BE ABLE TO', STYLES['eyebrow'])]
    outcome_cells = []
    for index, outcome in enumerate(topic['outcomes'], 1):
        outcome_cells.append([p(f'{index:02d}', STYLES['eyebrow']), p(outcome, STYLES['card_body'])])
    story.append(Table([[outcome_cells[0], outcome_cells[1]], [outcome_cells[2], outcome_cells[3]]], colWidths=[84.5 * mm] * 2, style=TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('BOX', (0, 0), (-1, -1), .6, LINE), ('INNERGRID', (0, 0), (-1, -1), .5, LINE), ('ROWBACKGROUNDS', (0, 0), (-1, -1), [WHITE, PALE_RED]), ('LEFTPADDING', (0, 0), (-1, -1), 9), ('RIGHTPADDING', (0, 0), (-1, -1), 9), ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 8)])))

    # Meaning and register.
    story += [PageBreak(), *section_heading('01', 'Understand', 'Why inversion changes the focus', 'Before changing the word order, understand what the writer wants the reader to notice.')]
    section = topic['seo'][0]
    for paragraph in section['paragraphs']:
        story.append(p(paragraph, STYLES['section_lead']))
    story += [Spacer(1, 3 * mm), data_table(section['examples']), Spacer(1, 5 * mm), editorial_card('Register check', 'Use inversion because the emphasis matters', 'It is natural in formal speeches, analytical writing, literary narration and carefully edited journalism. In casual conversation, an inverted sentence may sound deliberately dramatic.', PALE_GOLD, RED), Spacer(1, 6 * mm), p('A QUICK CONTRAST', STYLES['eyebrow'])]
    story += [examples_table([['We had never experienced such pressure.', 'neutral · information first'], ['Never had we experienced such pressure.', 'emphatic · exception first'], ['Only the director knew the code.', 'only modifies the subject · no inversion'], ['Only later did the director reveal the code.', 'only restricts time · inversion']])]

    # Visual map and guided reading.
    story += [PageBreak(), *section_heading('02', 'Visual map', 'Read the structure from left to right', topic['visual']['teacherLens']), formula_flow(['negative / restrictive opener', 'auxiliary', 'subject', 'main verb', 'emphatic effect']), Spacer(1, 5 * mm), p('THE FIVE DECISIONS', STYLES['eyebrow'])]
    for index, decision in enumerate(topic['guide']['decisions'], 1):
        story += [editorial_card(f'Step {index}', f'Decision {index}', decision, WHITE if index % 2 else SOFT_BG, RED if index == 1 else BLUE), Spacer(1, 2.5 * mm)]

    story += [PageBreak(), *section_heading('03', 'Worked example', 'From a neutral sentence to controlled emphasis', 'Follow the reasoning. The tense is preserved even though the word order changes.')]
    worked = [
        ['1 · Neutral', 'We understood the risk only after the audit.'],
        ['2 · Front the restriction', 'Only after the audit...'],
        ['3 · Recover the tense', 'past simple; no visible auxiliary'],
        ['4 · Supply and invert', 'did + we + understand'],
        ['5 · Final sentence', 'Only after the audit did we understand the risk.'],
        ['Rhetorical effect', 'The delayed moment of understanding becomes the focus.'],
    ]
    worked_rows = [[p(label, STYLES['card_title']), p(value, STYLES['card_body'])] for label, value in worked]
    worked_table = Table(worked_rows, colWidths=[49 * mm, 120 * mm], hAlign='LEFT')
    worked_table.setStyle(TableStyle([('ROWBACKGROUNDS', (0, 0), (-1, -1), [WHITE, SOFT_BG]), ('BOX', (0, 0), (-1, -1), .7, LINE), ('INNERGRID', (0, 0), (-1, -1), .5, LINE), ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 9), ('RIGHTPADDING', (0, 0), (-1, -1), 9), ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 8), ('BACKGROUND', (0, 4), (-1, 4), PALE_BLUE), ('BACKGROUND', (0, 5), (-1, 5), PALE_GOLD)]))
    story += [worked_table, Spacer(1, 6 * mm), p('REFERENCE PATTERNS', STYLES['eyebrow']), data_table(topic['guide']['table'])]

    # Auxiliary toolkit.
    story += [PageBreak(), *section_heading('04', 'Build accurately', topic['seo'][2]['heading'], topic['seo'][2]['paragraphs'][0]), p(topic['seo'][2]['paragraphs'][1], STYLES['section_lead']), data_table(topic['seo'][2]['table']), Spacer(1, 6 * mm), editorial_card('Memory rule', 'The auxiliary carries the tense', 'After do, does or did, use the base form. After have, has or had, use the past participle. A modal moves directly before the subject.', PALE_GREEN, BLUE), Spacer(1, 6 * mm), p('COMMON ERRORS TO EDIT OUT', STYLES['eyebrow'])]
    for mistake in topic['guide']['mistakes']:
        story += [p('×  ' + mistake, STYLES['card_body']), Spacer(1, 1.5 * mm)]

    # Complex patterns.
    story += [PageBreak(), *section_heading('05', 'Scope', topic['seo'][3]['heading'], topic['seo'][3]['paragraphs'][0]), p(topic['seo'][3]['paragraphs'][1], STYLES['section_lead']), data_table(topic['seo'][3]['table']), Spacer(1, 6 * mm), editorial_card('Scope test', 'Ask what only modifies', 'If only identifies the subject, keep normal word order. If it fronts a time, condition, method or other adverbial restriction, invert the following main clause.', PALE_RED, RED)]
    story += [PageBreak(), *section_heading('06', 'Sequence and limits', topic['seo'][4]['heading'], topic['seo'][4]['paragraphs'][0]), p(topic['seo'][4]['paragraphs'][1], STYLES['section_lead']), data_table(topic['seo'][4]['table']), Spacer(1, 7 * mm), p(topic['seo'][5]['heading'], STYLES['section_title'])]
    for paragraph in topic['seo'][5]['paragraphs']:
        story.append(p(paragraph, STYLES['section_lead']))
    story += [editorial_card('Pair check', 'No sooner...than · Hardly/Scarcely...when', 'Keep the first event in the inverted past perfect and the second event in the past simple.', PALE_GOLD, RED)]

    # Practice stage 1.
    choice = levels[0]
    story += [PageBreak(), *section_heading('07', 'Practice · Stage 1', choice['title'], choice['intro'])]
    for index, item in enumerate(choice['items'], 1):
        options = item['options']
        story += [practice_box(f'A{index}', item['scene'], ' '.join(line[1] for line in item['lines']), options, background=WHITE if index % 2 else SOFT_BG), Spacer(1, 2.3 * mm)]

    # Connected choices and guided text.
    dual = levels[1]
    guided = levels[2]
    story += [PageBreak(), *section_heading('08', 'Practice · Stages 2–3', 'Connect the decisions inside a complete context', 'Choose the auxiliary and verb form together; then maintain the pattern through the negotiation text.')]
    for index, item in enumerate(dual['items'], 1):
        options = [f"Gap {blank_index + 1}: {' / '.join(blank.get('options', []))}" for blank_index, blank in enumerate(item['blanks'])]
        story += [practice_box(f'B{index}', item['scene'], ' '.join(line[1] for line in item['lines']), options, background=WHITE if index % 2 else SOFT_BG), Spacer(1, 2.5 * mm)]
    story += [Spacer(1, 3 * mm), p('C1 · GUIDED TEXT', STYLES['eyebrow']), p(guided['scene'], STYLES['card_title']), p(blank_text(guided['text']), STYLES['exercise_large']), p('WORD BANK  ' + '  ·  '.join(sorted(set(option for blank in guided['blanks'] for option in blank.get('options', [])))), STYLES['small'])]

    # Open transformation.
    free = levels[3]
    story += [PageBreak(), *section_heading('09', 'Practice · Stage 4', free['title'], free['intro']), editorial_card('Method', 'Protect the meaning before you change the order', 'Underline the trigger, identify the original tense, write the auxiliary, and only then rebuild the clause.', PALE_BLUE, BLUE), Spacer(1, 5 * mm)]
    transformation_parts = [part.strip() for part in free['text'].split('. ') if part.strip()]
    transformations = ['. '.join(transformation_parts[index:index + 2]) for index in range(0, len(transformation_parts), 2)]
    for index, prompt in enumerate(transformations, 1):
        story += [practice_box(f'D{index}', free['scene'], prompt if prompt.endswith('.') else prompt + '.', lines=1, background=WHITE if index % 2 else SOFT_BG), Spacer(1, 2.5 * mm)]

    # Controlled and communicative production.
    controlled = levels[4]
    mission = levels[5]
    story += [PageBreak(), *section_heading('10', 'Practice · Stage 5', controlled['title'], controlled['intro'])]
    for index, item in enumerate(controlled['items'], 1):
        story += [practice_box(f'E{index}', item['scene'], item['prompt'], lines=1, background=WHITE if index % 2 else SOFT_BG), Spacer(1, 2.5 * mm)]
    story += [PageBreak(), *section_heading('11', 'Practice · Final mission', mission['title'], mission['intro'])]
    for index, item in enumerate(mission['items'], 1):
        story += [practice_box(f'F{index}', item['scene'], item['prompt'], lines=3, background=PALE_GOLD if index % 2 else WHITE), Spacer(1, 3 * mm)]
    story += [editorial_card('Self-check', 'Before you consult the key', 'Can you identify the trigger, name the tense, justify the auxiliary, check the main verb and explain the rhetorical effect?', PALE_GREEN, BLUE)]

    # Answer key.
    story += [PageBreak(), *section_heading('12', 'Answer key', 'Check the form and explain the choice', 'Do not stop at right or wrong. Use each explanation to name the rule that controlled the answer.')]
    key_blocks = []
    for prefix, level in [('A', choice), ('B', dual)]:
        for index, item in enumerate(level['items'], 1):
            if level['type'] == 'choice':
                key_blocks.append((f'{prefix}{index}', item['answer'], item['explain']))
            else:
                key_blocks.append((f'{prefix}{index}', ' / '.join(blank['answer'] for blank in item['blanks']), ' '.join(blank['explain'] for blank in item['blanks'])))
    key_blocks.append(('C1', ' / '.join(blank['answer'] for blank in guided['blanks']), ' '.join(blank['explain'] for blank in guided['blanks'])))
    for code, answer, explanation in key_blocks:
        story += [editorial_card(code, answer, explanation, WHITE if len(story) % 2 else SOFT_BG, BLUE), Spacer(1, 2.3 * mm)]

    story += [PageBreak(), *section_heading('12', 'Answer key · continued', 'Open transformations and production models', 'Alternative answers are possible when they preserve the target pattern and the original meaning.')]
    open_levels = [('D', free), ('E', controlled), ('F', mission)]
    for prefix, level in open_levels:
        if level['type'] in ('guidedText', 'freeText'):
            for index, blank in enumerate(level['blanks'], 1):
                story += [editorial_card(f'{prefix}{index}', blank['answer'], blank['explain'], WHITE if index % 2 else SOFT_BG, BLUE), Spacer(1, 2.3 * mm)]
        else:
            for index, item in enumerate(level['items'], 1):
                story += [editorial_card(f'{prefix}{index}', item['answer'], item['explain'], WHITE if index % 2 else SOFT_BG, BLUE), Spacer(1, 2.3 * mm)]

    story += [PageBreak(), *section_heading('13', 'Review', 'One-minute retrieval sheet', 'Close the workbook and complete this page from memory.')]
    prompts = ['Write five inversion triggers.', 'State the rule for do/does/did.', 'Complete: No sooner ___ than ___.', 'Complete: Hardly ___ when ___.', 'Give one case where only does not trigger inversion.', 'Transform one neutral sentence and explain the rhetorical effect.']
    for index, prompt in enumerate(prompts, 1):
        story += [practice_box(f'R{index}', 'Retrieval', prompt, lines=2, background=WHITE if index % 2 else SOFT_BG), Spacer(1, 2.5 * mm)]
    story += [editorial_card('Next review', 'Return in 24 hours', 'Rebuild the visual map without looking, then complete the final mission again with new content.', PALE_RED, RED)]
    return story


def split_pdf_cover(topic, edition, description, decisions):
    edition_title = l('Exercise workbook', "Cahier d'exercices") if edition == 'exercises' else l('Answer key', 'Corrigé raisonné')
    accent = RED if edition == 'exercises' else BLUE
    return [
        Spacer(1, 32 * mm),
        p(f"{l('ENGLISH', 'FRANÇAIS')} {topic['level']} · {edition_title.upper()}", STYLES['eyebrow']),
        p(topic['shortTitle'], STYLES['cover_title']),
        p(description, STYLES['cover_lead']),
        Spacer(1, 4 * mm),
        editorial_card(l('This document', 'Ce document'), edition_title, (
            l(f'{decisions} learning decisions arranged in six progressive stages. Write directly on the page and consult the separate answer key only after completing a stage.', f'{decisions} décisions d’apprentissage organisées en six étapes progressives. Écrivez directement sur la page et consultez le corrigé séparé seulement après avoir terminé une étape.')
            if edition == 'exercises'
            else l('Model answers and concise grammar explanations for every stage in the separate exercise workbook.', "Réponses modèles et explications grammaticales concises pour chaque étape du cahier d'exercices séparé.")
        ), PALE_RED if edition == 'exercises' else PALE_BLUE, accent),
        Spacer(1, 8 * mm),
        editorial_card(l('Recommended use', 'Utilisation conseillée'), l('Keep the three-document system together', 'Conservez le système de trois documents'), (
            l('Use the complete guide to understand the concept, this workbook to practise, and the answer key to diagnose each decision.', "Utilisez le cours complet pour comprendre, ce cahier pour pratiquer et le corrigé pour analyser chaque décision.")
            if edition == 'exercises'
            else l('Correct one stage at a time. Explain the rule aloud before marking an answer as secure.', "Corrigez une étape à la fois. Expliquez la règle à voix haute avant de considérer une réponse comme acquise.")
        ), PALE_GOLD, accent),
        Spacer(1, 8 * mm),
        p(l('WELEARN STUDY SEQUENCE', 'PARCOURS D’ÉTUDE WELEARN'), STYLES['eyebrow']),
        formula_flow(l(['complete guide', 'exercise workbook', 'answer key', 'retrieval review'], ['cours complet', "cahier d'exercices", 'corrigé', 'rappel actif'])),
    ]


def build_exercises_only_story(topic):
    story = split_pdf_cover(topic, 'exercises', l(f"Printable practice for {topic['title']}. No explanations or solutions interrupt the work pages.", f"Pratique imprimable pour {topic['title']}. Aucune explication ni solution n’interrompt les pages de travail."), practice_decision_count(topic))
    levels = topic['practice']['levels']
    prefixes = ['A', 'B', 'C', 'D', 'E', 'F']
    for level_index, level in enumerate(levels):
        story += [PageBreak(), *section_heading(f'{level_index + 1:02d}', l('Practice stage', 'Étape de pratique'), level['title'], level['intro'])]
        prefix = prefixes[level_index]
        if level['type'] == 'choice':
            for index, item in enumerate(level['items'], 1):
                story += [practice_box(f'{prefix}{index}', item['scene'], ' '.join(line[1] for line in item['lines']), item['options'], background=WHITE if index % 2 else SOFT_BG), Spacer(1, 2.5 * mm)]
        elif level['type'] == 'dual':
            for index, item in enumerate(level['items'], 1):
                options = [f"{l('Gap', 'Espace')} {blank_index + 1}: {' / '.join(blank.get('options', []))}" for blank_index, blank in enumerate(item['blanks'])]
                story += [practice_box(f'{prefix}{index}', item['scene'], ' '.join(line[1] for line in item['lines']), options, background=WHITE if index % 2 else SOFT_BG), Spacer(1, 3 * mm)]
        elif level['type'] in ('guidedText', 'freeText'):
            story += [practice_box(f'{prefix}1', level['scene'], level['text'], lines=4 if level['type'] == 'freeText' else 2, background=WHITE)]
            if level['type'] == 'guidedText':
                word_bank = sorted(set(option for blank in level['blanks'] for option in blank.get('options', [])))
                story += [Spacer(1, 4 * mm), editorial_card(l('Word bank', 'Banque de formes'), l('Available forms', 'Formes disponibles'), ' · '.join(word_bank), PALE_BLUE, BLUE)]
        else:
            for index, item in enumerate(level['items'], 1):
                story += [practice_box(f'{prefix}{index}', item['scene'], item['prompt'], lines=3 if level_index == 5 else 2, background=WHITE if index % 2 else SOFT_BG), Spacer(1, 3 * mm)]
        if level_index < len(levels) - 1:
            story += [Spacer(1, 5 * mm), editorial_card(l('Stage check', 'Bilan de l’étape'), l('Pause before continuing', 'Faites une pause avant de continuer'), l('Underline the trigger or decision point, name the rule, and check that the meaning has not changed.', "Soulignez le déclencheur ou le point de décision, nommez la règle et vérifiez que le sens n’a pas changé."), PALE_GREEN, BLUE)]
    story += [PageBreak(), *section_heading('07', l('Retrieval', 'Rappel actif'), l('Final self-check', 'Autoévaluation finale'), l('Complete these prompts without reopening the guide.', 'Répondez sans rouvrir le cours.'))]
    prompts = topic.get('visual', {}).get('reviewFocus', []) or ['form', 'meaning', 'register', 'error correction']
    for index, focus in enumerate(prompts, 1):
        story += [practice_box(f'R{index}', l('Review focus', 'Point de révision'), l(f'Explain and exemplify: {focus}.', f'Expliquez et illustrez : {focus}.'), lines=3, background=WHITE if index % 2 else SOFT_BG), Spacer(1, 3 * mm)]
    return story


def build_answer_key_only_story(topic):
    story = split_pdf_cover(topic, 'answer-key', l(f"Solutions and feedback for the {topic['title']} exercise workbook.", f"Solutions et rétroaction pour le cahier d’exercices {topic['title']}."), practice_decision_count(topic))
    prefixes = ['A', 'B', 'C', 'D', 'E', 'F']
    for level_index, level in enumerate(topic['practice']['levels']):
        story += [PageBreak(), *section_heading(f'{level_index + 1:02d}', l('Answer key', 'Corrigé'), level['title'], l('Compare the form first, then read the explanation and name the rule in your own words.', "Comparez d’abord la forme, puis lisez l’explication et reformulez la règle avec vos propres mots."))]
        prefix = prefixes[level_index]
        if level['type'] == 'choice':
            entries = [(f'{prefix}{index}', item['answer'], item['explain']) for index, item in enumerate(level['items'], 1)]
        elif level['type'] == 'dual':
            entries = [(f'{prefix}{index}', ' / '.join(blank['answer'] for blank in item['blanks']), ' '.join(blank['explain'] for blank in item['blanks'])) for index, item in enumerate(level['items'], 1)]
        elif level['type'] in ('guidedText', 'freeText'):
            entries = [(f'{prefix}{index}', blank['answer'], blank['explain']) for index, blank in enumerate(level['blanks'], 1)]
        else:
            entries = [(f'{prefix}{index}', item['answer'], item['explain']) for index, item in enumerate(level['items'], 1)]
        for index, (code, answer, explanation) in enumerate(entries, 1):
            story += [editorial_card(code, answer, explanation, WHITE if index % 2 else SOFT_BG, BLUE), Spacer(1, 2.5 * mm)]
    story += [PageBreak(), *section_heading('07', l('Feedback', 'Rétroaction'), l('Diagnose the pattern, not only the score', 'Analysez la structure, pas seulement le score'), l('Use this page to decide what to revisit in the complete guide.', 'Utilisez cette page pour décider ce qu’il faut revoir dans le cours complet.'))]
    labels = l(['Trigger or context', 'Auxiliary or structural choice', 'Main verb or clause form', 'Meaning and register'], ['Déclencheur ou contexte', 'Choix structurel', 'Forme verbale ou propositionnelle', 'Sens et registre'])
    for label in labels:
        story += [practice_box('CHECK', label, l('What went wrong? What rule will prevent the same error next time?', 'Quelle erreur avez-vous commise ? Quelle règle permettra de l’éviter ?'), lines=3, background=WHITE), Spacer(1, 3 * mm)]
    return story


def without_cover(story):
    for index, flowable in enumerate(story):
        if isinstance(flowable, PageBreak):
            return story[index:]
    return story


def build_advanced_standard_story(topic):
    decisions = practice_decision_count(topic)
    story = [
        Spacer(1, 28 * mm),
        p(f"{l('ENGLISH', 'FRANÇAIS')} {topic['level']} · {l('ADVANCED GRAMMAR', 'GRAMMAIRE AVANCÉE')}", STYLES['eyebrow']),
        p(topic['shortTitle'], STYLES['cover_title']),
        p(topic['lead'], STYLES['cover_lead']),
        Spacer(1, 3 * mm),
        editorial_card(l('The central idea', 'L’idée centrale'), topic['guide']['goal'], topic['description'], PALE_BLUE, RED),
        Spacer(1, 6 * mm),
        editorial_card(l('Model', 'Modèle'), topic['guide']['model'], topic['guide']['formula'], PALE_GOLD, BLUE),
        Spacer(1, 7 * mm),
        p(l(f"{len(topic['practice']['levels'])} GUIDED STAGES · {decisions} LEARNING DECISIONS", f"{len(topic['practice']['levels'])} ÉTAPES GUIDÉES · {decisions} DÉCISIONS D’APPRENTISSAGE"), STYLES['eyebrow']),
        p(l('This complete guide combines explanation, visual reasoning, practice and feedback. Separate exercise and answer-key editions are also available from the lesson page.', "Ce cours complet réunit explication, raisonnement visuel, pratique et rétroaction. Un cahier d’exercices et un corrigé séparés sont également disponibles sur la page de la leçon."), STYLES['section_lead']),
        Spacer(1, 4 * mm),
        p(l('LEARNING OUTCOMES', 'OBJECTIFS D’APPRENTISSAGE'), STYLES['eyebrow']),
    ]
    for index, outcome in enumerate(topic['outcomes'], 1):
        story += [editorial_card(l(f'Outcome {index}', f'Objectif {index}'), f'{index:02d}', outcome, WHITE if index % 2 else PALE_RED, RED), Spacer(1, 2.5 * mm)]

    story += [PageBreak(), *section_heading('01', l('Understand', 'Comprendre'), l('Build meaning before form', 'Construire le sens avant la forme'), topic['description'])]
    for section_index, section in enumerate(topic['seo'], 1):
        story += [p(section['heading'], STYLES['section_title'])]
        for paragraph in section.get('paragraphs', []):
            story.append(p(paragraph, STYLES['section_lead']))
        if section.get('table'):
            story += [Spacer(1, 2 * mm), data_table(section['table']), Spacer(1, 5 * mm)]
        if section.get('examples'):
            story += [Spacer(1, 2 * mm), data_table(section['examples']), Spacer(1, 5 * mm)]
        if section_index < len(topic['seo']):
            story += [Spacer(1, 4 * mm)]

    formula_parts = [part.strip() for part in re.split(r'\s*(?:\||→|\+)\s*', topic['guide']['formula']) if part.strip()]
    story += [PageBreak(), *section_heading('02', l('Visual map', 'Carte visuelle'), l('Reason through the pattern', 'Raisonner à partir de la structure'), topic['visual']['teacherLens']), formula_flow(formula_parts), Spacer(1, 6 * mm), p(l('DECIDE IN THIS ORDER', 'DÉCIDEZ DANS CET ORDRE'), STYLES['eyebrow'])]
    for index, decision in enumerate(topic['guide']['decisions'], 1):
        story += [editorial_card(l(f'Step {index}', f'Étape {index}'), l(f'Decision {index}', f'Décision {index}'), decision, WHITE if index % 2 else SOFT_BG, RED if index == 1 else BLUE), Spacer(1, 2.5 * mm)]
    story += [PageBreak(), *section_heading('03', l('Reference', 'Référence'), l('Compare forms and meanings', 'Comparer les formes et les sens'), l('Use the table to justify each structural choice.', 'Utilisez le tableau pour justifier chaque choix structurel.')), data_table(topic['guide']['table']), Spacer(1, 6 * mm), p(l('EXAMPLES AT A GLANCE', 'EXEMPLES EN UN COUP D’ŒIL'), STYLES['eyebrow']), examples_table(topic['visual']['scene']), Spacer(1, 7 * mm), p(l('COMMON ERRORS', 'ERREURS FRÉQUENTES'), STYLES['eyebrow'])]
    for mistake in topic['guide']['mistakes']:
        story += [editorial_card(l('Edit this', 'À corriger'), l('Avoid this pattern', 'Évitez cette erreur'), mistake, PALE_RED, RED), Spacer(1, 2.5 * mm)]

    story += without_cover(build_exercises_only_story(topic))
    story += without_cover(build_answer_key_only_story(topic))
    return story


def build_story(topic):
    advanced = topic['level'].lower() in ('b2', 'c1', 'c2')
    if topic['slug'] == 'inversion-emphasis-c1':
        return build_advanced_editorial_story(topic)
    if advanced:
        return build_advanced_standard_story(topic)
    labels = {
        'cover': f"ENGLISH · LEVEL {topic['level']} · PRINTABLE WORKBOOK" if advanced else f"INGLÉS · NIVEL {topic['level']} · CUADERNO IMPRIMIBLE",
        'goal': 'Lesson goal' if advanced else 'Meta de la lección',
        'model': 'Model' if advanced else 'Modelo',
        'outcomes': 'By the end, you will be able to' if advanced else 'Al terminar podrás',
        'study': 'How to study' if advanced else 'Cómo estudiar',
        'understand': '01 · UNDERSTAND' if advanced else '01 · COMPRENDER',
        'essential': 'The essential idea' if advanced else 'La idea esencial',
        'map': '02 · VISUAL MAP' if advanced else '02 · MAPA VISUAL',
        'glance': 'The rule at a glance' if advanced else 'La regla de una sola mirada',
        'formula': 'Formula' if advanced else 'Fórmula',
        'order': 'Decide in this order' if advanced else 'Decide en este orden',
        'errors': 'Common errors' if advanced else 'Errores frecuentes',
        'examples': 'Reference examples' if advanced else 'Ejemplos de referencia',
        'practice': '03 · PRACTICE' if advanced else '03 · PRÁCTICA',
        'production': 'From recognition to production' if advanced else 'De reconocer a producir',
        'answers': '04 · ANSWER KEY' if advanced else '04 · SOLUCIONES',
        'correct': 'Correct and explain the rule' if advanced else 'Corrige y explica la regla',
        'close': 'Final task' if advanced else 'Cierre',
    }
    story = [p(labels['cover'], STYLES['eyebrow']), p(topic['title'], STYLES['title']), p(topic['lead'], STYLES['lead']), info_box(labels['goal'], topic['guide']['goal']), Spacer(1, 4 * mm), info_box(labels['model'], topic['guide']['model'], NAVY, 'model'), Spacer(1, 4 * mm), p(labels['outcomes'], STYLES['h1'])]
    story.extend(p(f'{index}. {outcome}', STYLES['body']) for index, outcome in enumerate(topic['outcomes'], 1))
    study_copy = (
        'Lee la explicación, reconstruye el mapa sin mirar, resuelve la práctica y corrige al final. Usa las tres pistas de audio de la lección web para imitar ritmo y entonación.'
        if topic['level'].lower() in ('a1', 'a2', 'b1')
        else 'Read the explanation, rebuild the infographic from memory, complete the practice, and check the answer key. Return to the visual map to justify each decision.'
    )
    story += [Spacer(1, 3 * mm), info_box(labels['study'], study_copy, PALE_RED), PageBreak()]
    story += [p(labels['understand'], STYLES['eyebrow']), p(labels['essential'], STYLES['title']), p(topic['description'], STYLES['lead'])]
    for section in topic['seo']:
        block = [p(section['heading'], STYLES['h2'])] + [p(paragraph, STYLES['body']) for paragraph in section.get('paragraphs', [])]
        story.append(KeepTogether(block))
        if section.get('table'):
            story += [Spacer(1, 2 * mm), data_table(section['table']), Spacer(1, 2 * mm)]
    story += [PageBreak(), p(labels['map'], STYLES['eyebrow']), p(labels['glance'], STYLES['title']), info_box(labels['formula'], topic['guide']['formula'], CREAM, 'formula'), Spacer(1, 4 * mm), p(labels['order'], STYLES['h1'])]
    story.extend(p(f'{index}. {decision}', STYLES['body']) for index, decision in enumerate(topic['guide']['decisions'], 1))
    story += [Spacer(1, 2 * mm), data_table(topic['guide']['table']), Spacer(1, 3 * mm), p(labels['errors'], STYLES['h2'])]
    story.extend(p(f'× {mistake}', STYLES['body']) for mistake in topic['guide']['mistakes'])
    examples_copy = 'Cover the second column, reconstruct the pattern, and explain why the inversion is required.' if advanced else 'Tapa la columna en español, explica el sentido y lee el ejemplo en voz alta.'
    story += [PageBreak(), p(labels['map'], STYLES['eyebrow']), p(labels['examples'], STYLES['title']), p(examples_copy, STYLES['lead']), examples_table(topic['visual']['scene']), PageBreak()]
    exercises, answers = exercises_for(topic)
    exercise_copy = f'{len(exercises)} printable exercises. Work without checking the answer key.' if advanced else f'{len(exercises)} ejercicios imprimibles. Trabaja sin consultar las soluciones.'
    story += [p(labels['practice'], STYLES['eyebrow']), p(labels['production'], STYLES['title']), p(exercise_copy, STYLES['lead'])]
    current = None
    for number, level, prompt in exercises:
        if level != current:
            story.append(p(level, STYLES['h2']))
            current = level
        story.append(p(f'{number}. {prompt}', STYLES['exercise']))
    answer_copy = 'For open responses, compare the target structure first and the vocabulary second.' if advanced else 'En respuestas abiertas, compara primero la estructura objetivo y después el vocabulario.'
    story += [PageBreak(), p(labels['answers'], STYLES['eyebrow']), p(labels['correct'], STYLES['title']), p(answer_copy, STYLES['lead'])]
    for number, answer, explanation in answers:
        story.append(p(f'{number}. {answer} — {explanation}', STYLES['answer']))
    closing_copy = 'Write three original sentences and return to the visual map within 24 hours.' if advanced else 'Escribe tres frases nuevas, léelas en voz alta y vuelve al mapa visual dentro de 24 horas.'
    story += [Spacer(1, 4 * mm), info_box(labels['close'], closing_copy, PALE_BLUE)]
    return story


def main():
    topics = json.loads(DATA.read_text(encoding='utf-8'))
    for topic in topics:
        level = topic['level'].lower()
        output_dir = OUTPUT / level
        public_dir = PUBLIC / f'{PUBLIC_PREFIX}-{level}' / 'grammar'
        output_dir.mkdir(parents=True, exist_ok=True)
        public_dir.mkdir(parents=True, exist_ok=True)
        filename = f"idiomaswl-{topic['slug']}.pdf" if topic['slug'].endswith(f'-{level}') else f"idiomaswl-{topic['slug']}-{level}.pdf"
        target = output_dir / filename
        Workbook(str(target), topic).build(build_story(topic))
        shutil.copy2(target, public_dir / filename)
        print(target.relative_to(ROOT))
        if level in ('b2', 'c1', 'c2'):
            stem = filename[:-4]
            exercises_filename = f"{stem}-{l('exercises', 'exercices')}.pdf"
            answer_key_filename = f"{stem}-{l('answer-key', 'corrige')}.pdf"
            exercises_target = output_dir / exercises_filename
            answer_key_target = output_dir / answer_key_filename
            Workbook(str(exercises_target), topic, 'exercises').build(build_exercises_only_story(topic))
            Workbook(str(answer_key_target), topic, 'answer-key').build(build_answer_key_only_story(topic))
            shutil.copy2(exercises_target, public_dir / exercises_filename)
            shutil.copy2(answer_key_target, public_dir / answer_key_filename)
            print(exercises_target.relative_to(ROOT))
            print(answer_key_target.relative_to(ROOT))
    print(f"Fertig: {len(topics)} deutsche Grammatikkurse mit getrennten Ausgaben." if IS_GERMAN else l(f"Ready: {len(topics)} English grammar PDF workbooks.", f"Prêt : {len(topics)} cours de grammaire française et leurs éditions séparées."))


if __name__ == '__main__':
    main()
