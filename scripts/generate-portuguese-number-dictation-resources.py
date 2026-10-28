#!/usr/bin/env python3
"""Generate the three printable WeLearn resources for Portuguese number dictation."""

import json
import shutil
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "tmp" / "portuguese-number-dictation" / "resources.json"
OUTPUT = ROOT / "output" / "pdf" / "portuguese-number-dictation"
PRIVATE = ROOT / "private" / "site-materials" / "portugues-a1" / "grammar"
LOGO = ROOT / "public" / "images" / "welearn-wordmark-transparent-v2.png"
FONT_REGULAR = ROOT / "public" / "fonts" / "welearn-ko-400.ttf"
FONT_BOLD = ROOT / "public" / "fonts" / "welearn-ko-700.ttf"

GREEN = colors.HexColor("#126B3A")
DARK = colors.HexColor("#103E2A")
GOLD = colors.HexColor("#E4AA00")
PALE = colors.HexColor("#F4F8EE")
INK = colors.HexColor("#173F2E")
MUTED = colors.HexColor("#60766B")
LINE = colors.HexColor("#D8E5DC")
WHITE = colors.white
FAMILY = ["#167448", "#2457A7", "#B57D00", "#B84632", "#7651A8", "#087F8C", "#B33A53", "#297B68", "#3F58A8", "#C05B16"]

pdfmetrics.registerFont(TTFont("WeLearn", str(FONT_REGULAR)))
pdfmetrics.registerFont(TTFont("WeLearn-Bold", str(FONT_BOLD)))

styles = getSampleStyleSheet()
BODY = ParagraphStyle("Body", parent=styles["BodyText"], fontName="WeLearn", fontSize=9.4, leading=14, textColor=MUTED, spaceAfter=5)
SMALL = ParagraphStyle("Small", parent=BODY, fontSize=7.6, leading=10.3)
TITLE = ParagraphStyle("Title", parent=styles["Title"], fontName="WeLearn-Bold", fontSize=29, leading=32, textColor=DARK, alignment=TA_CENTER, spaceAfter=10)
H1 = ParagraphStyle("H1", parent=styles["Heading1"], fontName="WeLearn-Bold", fontSize=19, leading=22, textColor=DARK, spaceBefore=6, spaceAfter=9)
H2 = ParagraphStyle("H2", parent=styles["Heading2"], fontName="WeLearn-Bold", fontSize=12, leading=15, textColor=GREEN, spaceBefore=7, spaceAfter=5)
LABEL = ParagraphStyle("Label", parent=BODY, fontName="WeLearn-Bold", fontSize=7, leading=9, textColor=GOLD, alignment=TA_CENTER, spaceAfter=6)
WHITE_TEXT = ParagraphStyle("White", parent=BODY, textColor=WHITE)


def p(text, style=BODY):
    return Paragraph(escape(str(text)).replace("\n", "<br/>"), style)


def rich(text, style=BODY):
    return Paragraph(text, style)


def page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(GREEN)
    canvas.rect(0, A4[1] - 9 * mm, A4[0], 9 * mm, fill=1, stroke=0)
    if LOGO.exists():
        canvas.drawImage(str(LOGO), 15 * mm, A4[1] - 7.2 * mm, width=35 * mm, height=5 * mm, preserveAspectRatio=True, mask="auto")
    canvas.setStrokeColor(LINE)
    canvas.line(15 * mm, 12 * mm, A4[0] - 15 * mm, 12 * mm)
    canvas.setFont("WeLearn", 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(15 * mm, 7.2 * mm, "Idiomas WeLearn · Português A1 · Material original")
    canvas.drawRightString(A4[0] - 15 * mm, 7.2 * mm, f"Página {doc.page}")
    canvas.restoreState()


def document(path):
    doc = BaseDocTemplate(str(path), pagesize=A4, rightMargin=15 * mm, leftMargin=15 * mm, topMargin=16 * mm, bottomMargin=18 * mm, title="Números em português · WeLearn")
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="content")
    doc.addPageTemplates(PageTemplate(id="welearn", frames=[frame], onPage=page))
    return doc


def cover(story, edition, subtitle):
    story.extend([Spacer(1, 13 * mm)])
    if LOGO.exists():
        logo = Image(str(LOGO), width=70 * mm, height=13 * mm, kind="proportional")
        logo.hAlign = "CENTER"
        story.append(logo)
    story.extend([
        Spacer(1, 7 * mm),
        p(edition.upper(), LABEL),
        p("Números em português", TITLE),
        rich("<b>De zero a cem mil</b> · compreender, escrever e ouvir", ParagraphStyle("Sub", parent=BODY, fontSize=13, leading=18, alignment=TA_CENTER, textColor=GREEN)),
        Spacer(1, 8 * mm),
        Table([[p(subtitle, WHITE_TEXT)]], colWidths=[145 * mm], style=TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), DARK), ("BOX", (0, 0), (-1, -1), 0.5, DARK),
            ("LEFTPADDING", (0, 0), (-1, -1), 13), ("RIGHTPADDING", (0, 0), (-1, -1), 13),
            ("TOPPADDING", (0, 0), (-1, -1), 13), ("BOTTOMPADDING", (0, 0), (-1, -1), 13),
        ])),
        Spacer(1, 9 * mm),
        rich("<b>6 áudios</b> · <b>120 respostas</b> · <b>3 ritmos</b> · português brasileiro", ParagraphStyle("Meta", parent=BODY, alignment=TA_CENTER, textColor=MUTED)),
        Spacer(1, 36 * mm),
        p("idiomaswl.com/practica/portugues/a1/gramatica/numeros-ditado", ParagraphStyle("URL", parent=SMALL, alignment=TA_CENTER, textColor=GREEN)),
        PageBreak(),
    ])


def family_table(reference):
    cards = []
    for family in range(10):
        values = reference[family * 10:(family + 1) * 10]
        rows = [[rich(f"<b>{item['value']}</b>", SMALL), p(item["spoken"], SMALL)] for item in values]
        table = Table(rows, colWidths=[10 * mm, 66 * mm], repeatRows=0)
        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (0, -1), colors.HexColor(FAMILY[family])),
            ("TEXTCOLOR", (0, 0), (0, -1), WHITE), ("ALIGN", (0, 0), (0, -1), "CENTER"),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("GRID", (0, 0), (-1, -1), 0.3, LINE),
            ("LEFTPADDING", (0, 0), (-1, -1), 4), ("RIGHTPADDING", (0, 0), (-1, -1), 4),
            ("TOPPADDING", (0, 0), (-1, -1), 3.2), ("BOTTOMPADDING", (0, 0), (-1, -1), 3.2),
        ]))
        card = Table([[rich(f"<b>{family * 10}–{family * 10 + 9}</b>", H2)], [table]], colWidths=[78 * mm])
        card.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
        ]))
        cards.append(card)
    grid = []
    for index in range(0, 10, 2):
        grid.append([cards[index], cards[index + 1]])
    table = Table(grid, colWidths=[87 * mm, 87 * mm], hAlign="CENTER")
    table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 3), ("RIGHTPADDING", (0, 0), (-1, -1), 3), ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]))
    return table


def rule_card(title, formula, note):
    return Table([[rich(f"<b>{title}</b>", H2)], [rich(formula, BODY)], [p(note, SMALL)]], colWidths=[55 * mm], style=TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PALE), ("BOX", (0, 0), (-1, -1), 0.6, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 9), ("RIGHTPADDING", (0, 0), (-1, -1), 9),
        ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))


def answer_sheet(set_data, show_answers=False):
    title = f"Ficha {set_data['order']} · {set_data['range']} · {set_data['modeLabel']}"
    mode = "Escreva somente em algarismos." if set_data["answerMode"] == "digits" else "Escreva cada número por extenso."
    story = [p(title, H1), p(mode), Spacer(1, 2 * mm)]
    rows = []
    for offset in range(0, 20, 2):
        row = []
        for item in set_data["items"][offset:offset + 2]:
            number = offset + (0 if item is set_data["items"][offset] else 1) + 1
            if show_answers:
                answer = f"{item['value']:,}".replace(",", ".") if set_data["answerMode"] == "digits" else item["spoken"]
                content = rich(f"<b>{number:02d}</b>  {escape(answer)}", SMALL)
            else:
                content = rich(f"<b>{number:02d}</b>  __________________________________", SMALL)
            row.append(content)
        rows.append(row)
    table = Table(rows, colWidths=[87 * mm, 87 * mm], rowHeights=[12 * mm] * 10)
    table.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.7, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("BACKGROUND", (0, 0), (-1, -1), WHITE),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.extend([table, Spacer(1, 4 * mm), p("Áudio e correção interativa: idiomaswl.com/practica/portugues/a1/gramatica/numeros-ditado", SMALL)])
    return story


def build_complete(data, path):
    story = []
    cover(story, "Curso completo", "Teoria visual, tabela integral, regras de formação, prática auditiva e respostas para revisão.")
    story.extend([
        p("1 · Como os números se formam", H1),
        p("Memorize as formas de zero a dezenove. A partir de vinte, combine a dezena e a unidade com a conjunção e."),
        Table([[rule_card("0–19", "formas próprias", "Aprenda estes blocos de memória."), rule_card("20–99", "dezena + e + unidade", "42 = quarenta e dois"), rule_card("100+", "blocos de escala", "centenas + milhares")]], colWidths=[58 * mm] * 3, style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 2), ("RIGHTPADDING", (0, 0), (-1, -1), 2)])),
        Spacer(1, 4 * mm),
        p("Regra central", H2),
        rich("<b>42</b> = quarenta <font color='#E4AA00'><b>e</b></font> dois · <b>87</b> = oitenta <font color='#E4AA00'><b>e</b></font> sete", BODY),
        PageBreak(),
        p("2 · Tabela visual de 0 a 99", H1),
        p("Cada cor representa uma família. Observe a dezena fixa e a unidade que muda depois de e."),
        family_table(data["reference"]),
        PageBreak(),
        p("3 · Centenas e milhares", H1),
        Table([
            [p("100", H2), p("cem", H2), p("Use cem sem continuação.")],
            [p("101", H2), p("cento e um", H2), p("Com continuação, use cento.")],
            [p("200", H2), p("duzentos", H2), p("As centenas têm formas próprias.")],
            [p("1.000", H2), p("mil", H2), p("Não use um antes de mil.")],
            [p("2.500", H2), p("dois mil e quinhentos", H2), p("Use e antes de uma centena exata.")],
            [p("25.000", H2), p("vinte e cinco mil", H2), p("Construa a quantidade e acrescente mil.")],
            [p("100.000", H2), p("cem mil", H2), p("Limite desta unidade.")],
        ], colWidths=[24 * mm, 66 * mm, 84 * mm], style=TableStyle([
            ("GRID", (0, 0), (-1, -1), 0.5, LINE), ("BACKGROUND", (0, 0), (0, -1), PALE),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("LEFTPADDING", (0, 0), (-1, -1), 7),
            ("RIGHTPADDING", (0, 0), (-1, -1), 7), ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ])),
        Spacer(1, 5 * mm),
        p("Erros frequentes", H2),
        rich("Evite <strike>cuarenta</strike>, <strike>cincuenta</strike>, <strike>seiscentos</strike> e <strike>um mil</strike>. Use <b>quarenta</b>, <b>cinquenta</b>, <b>seiscentos</b> e <b>mil</b>.", BODY),
        PageBreak(),
        p("4 · Prática auditiva", H1),
        p("Use um áudio completo por ficha. Selecione o ritmo fácil, médio ou difícil na aula digital e corrija apenas no final."),
    ])
    for index, set_data in enumerate(data["sets"]):
        story.extend(answer_sheet(set_data, False))
        story.append(PageBreak())
    story.extend([p("5 · Gabarito", H1)])
    for index, set_data in enumerate(data["sets"]):
        story.extend(answer_sheet(set_data, True))
        if index < len(data["sets"]) - 1:
            story.append(PageBreak())
    document(path).build(story)


def build_workbook(data, path):
    story = []
    cover(story, "Caderno de exercícios", "Seis folhas de resposta limpas para treinar cifras e ortografia com os áudios da aula digital.")
    story.extend([p("Como usar", H1), p("1. Abra a aula digital. 2. Escolha um ritmo. 3. Ouça o áudio completo. 4. Preencha as vinte respostas. 5. Corrija somente no final."), p("As fichas em cifras e por extenso usam sequências diferentes. Não consulte o gabarito durante a reprodução."), PageBreak()])
    for index, set_data in enumerate(data["sets"]):
        story.extend(answer_sheet(set_data, False))
        if index < len(data["sets"]) - 1:
            story.append(PageBreak())
    document(path).build(story)


def build_key(data, path):
    story = []
    cover(story, "Gabarito comentado", "As 120 respostas oficiais, na ordem de reprodução, com lembretes das regras ortográficas essenciais.")
    story.extend([p("Antes de corrigir", H1), p("Compare a forma, identifique o padrão do erro e repita em voz alta. Um erro de escuta pede nova reprodução; um erro ortográfico pede reconstrução da regra."), PageBreak()])
    for index, set_data in enumerate(data["sets"]):
        story.extend(answer_sheet(set_data, True))
        story.extend([Spacer(1, 3 * mm), rich("<b>Lembrete:</b> use <b>e</b> entre dezenas e unidades; use <b>cem</b> em 100 e <b>cento</b> quando houver continuação.", SMALL)])
        if index < len(data["sets"]) - 1:
            story.append(PageBreak())
    document(path).build(story)


def main():
    data = json.loads(DATA.read_text(encoding="utf-8"))
    OUTPUT.mkdir(parents=True, exist_ok=True)
    PRIVATE.mkdir(parents=True, exist_ok=True)
    files = {
        "idiomaswl-numeros-ditado-a1.pdf": build_complete,
        "idiomaswl-numeros-ditado-a1-exercicios.pdf": build_workbook,
        "idiomaswl-numeros-ditado-a1-gabarito.pdf": build_key,
    }
    for name, builder in files.items():
        destination = OUTPUT / name
        builder(data, destination)
        shutil.copy2(destination, PRIVATE / name)
        print(f"Generated {destination} and copied to {PRIVATE / name}")


if __name__ == "__main__":
    main()
