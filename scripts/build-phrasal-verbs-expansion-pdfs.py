#!/usr/bin/env python3

import json
import os
from pathlib import Path
from xml.sax.saxutils import escape as xml_escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_ROOT = ROOT / "public/herramientas/vocabulario/ingles/phrasal-verbs"
DATA = json.loads((PUBLIC_ROOT / "data/ecosystem.json").read_text(encoding="utf-8"))
OUTPUT = PUBLIC_ROOT / "pdfs"
BASE_URL = "https://www.idiomaswl.com/herramientas/vocabulario/ingles/phrasal-verbs"

TOPIC_SLUGS = {
    "comunicacion-redes-sociales",
    "transporte-conduccion",
    "familia-crianza",
    "vivienda-arriendo",
}
FAMILY_SLUGS = {"turn", "come", "bring", "give"}

NAVY = colors.HexColor("#16235F")
RED = colors.HexColor("#D3282F")
INK = colors.HexColor("#182033")
MUTED = colors.HexColor("#667085")
PALE = colors.HexColor("#F3F4F8")
LINE = colors.HexColor("#D9DEEA")
CREAM = colors.HexColor("#F7F3EA")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Brand", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8.5, leading=11, textColor=RED, spaceAfter=5, tracking=0.8))
styles.add(ParagraphStyle(name="TitleWL", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=23, leading=26, textColor=NAVY, alignment=TA_LEFT, spaceAfter=7))
styles.add(ParagraphStyle(name="Deck", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.5, leading=13.5, textColor=MUTED, spaceAfter=11))
styles.add(ParagraphStyle(name="SectionWL", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=13, leading=16, textColor=NAVY, spaceBefore=6, spaceAfter=5))
styles.add(ParagraphStyle(name="Term", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=10.2, leading=12, textColor=NAVY, spaceAfter=1.5))
styles.add(ParagraphStyle(name="Meaning", parent=styles["Normal"], fontName="Helvetica", fontSize=7.8, leading=9.5, textColor=RED, spaceAfter=2.2))
styles.add(ParagraphStyle(name="Example", parent=styles["Normal"], fontName="Helvetica", fontSize=7.25, leading=9.2, textColor=INK, spaceAfter=1))
styles.add(ParagraphStyle(name="Meta", parent=styles["Normal"], fontName="Helvetica", fontSize=6.8, leading=8, textColor=MUTED))
styles.add(ParagraphStyle(name="Practice", parent=styles["Normal"], fontName="Helvetica", fontSize=8.2, leading=11.5, textColor=INK, spaceAfter=2))
styles.add(ParagraphStyle(name="Answer", parent=styles["Normal"], fontName="Helvetica", fontSize=7.4, leading=10, textColor=MUTED))
styles.add(ParagraphStyle(name="Small", parent=styles["Normal"], fontName="Helvetica", fontSize=7.2, leading=9.5, textColor=MUTED))


def page_footer(canvas, document):
    canvas.saveState()
    width, _ = A4
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(16 * mm, 13 * mm, width - 16 * mm, 13 * mm)
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(16 * mm, 8.5 * mm, "Idiomas WeLearn · Phrasal verbs en contexto")
    canvas.drawRightString(width - 16 * mm, 8.5 * mm, str(document.page))
    canvas.restoreState()


def grouped(items):
    groups = []
    for item in items:
        if not groups or groups[-1][0] != item["subtopic"]:
            groups.append((item["subtopic"], []))
        groups[-1][1].append(item)
    return groups


def entry_cell(item, family=False):
    meta = item.get("grammar", "uso contextual")
    if item.get("level"):
        meta = f"{meta} · {item['level']}"
    return [
        Paragraph(xml_escape(item["term"]), styles["Term"]),
        Paragraph(xml_escape(item["meaning_es"]), styles["Meaning"]),
        Paragraph(f"<b>1</b> {xml_escape(item['examples_en'][0])}", styles["Example"]),
        Paragraph(f"<b>2</b> {xml_escape(item['examples_en'][1])}", styles["Example"]),
        Paragraph(xml_escape(meta), styles["Meta"]),
    ]


def entry_table(items, family=False):
    rows = []
    for index in range(0, len(items), 2):
        left = entry_cell(items[index], family)
        right = entry_cell(items[index + 1], family) if index + 1 < len(items) else ""
        rows.append([left, right])
    table = Table(rows, colWidths=[86 * mm, 86 * mm], hAlign="LEFT", spaceAfter=4)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PALE),
        ("BOX", (0, 0), (-1, -1), 0.45, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return table


def route_summary(items):
    group_counts = []
    for name, group in grouped(items):
        group_counts.append([Paragraph(xml_escape(name), styles["Small"]), Paragraph(str(len(group)), styles["Small"])])
    table = Table(group_counts, colWidths=[150 * mm, 20 * mm], hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CREAM),
        ("LINEBELOW", (0, 0), (-1, -2), 0.35, LINE),
        ("ALIGN", (1, 0), (1, -1), "RIGHT"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return table


def practice_page(items, title, url):
    if not items:
        raise ValueError(f"No hay ítems para construir la práctica de {title}.")
    prompts = []
    answers = []
    selected = []
    groups = grouped(items)
    round_index = 0
    target = min(12, len(items))
    while len(selected) < target:
        previous_length = len(selected)
        for _, group in groups:
            if round_index < len(group) and len(selected) < target:
                selected.append(group[round_index])
        round_index += 1
        if len(selected) == previous_length:
            raise ValueError(f"No se pudo seleccionar una práctica equilibrada para {title}.")
    for index, item in enumerate(selected, 1):
        example = item["examples_en"][index % 2]
        gap = example.replace(item["term"], "__________")
        if gap == example:
            prompt = f"{index}. Escribe el phrasal verb que significa «{item['meaning_es']}»."
        else:
            prompt = f"{index}. {gap}"
        prompts.append([Paragraph(xml_escape(prompt), styles["Practice"])])
        answers.append(f"{index}. {xml_escape(item['term'])}")
    question_table = Table(prompts, colWidths=[172 * mm], hAlign="LEFT")
    question_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PALE),
        ("LINEBELOW", (0, 0), (-1, -2), 0.35, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return [
        PageBreak(),
        Paragraph("REPASO · PRODUCCIÓN ACTIVA", styles["Brand"]),
        Paragraph(f"Practica: {xml_escape(title)}", styles["TitleWL"]),
        Paragraph(f"Completa las {target} consignas sin mirar las fichas. La selección recorre todos los grupos para evitar un quiz corto o sesgado.", styles["Deck"]),
        question_table,
        Spacer(1, 5 * mm),
        Paragraph("Soluciones", styles["SectionWL"]),
        Paragraph(" · ".join(answers), styles["Answer"]),
        Spacer(1, 5 * mm),
        Paragraph("Reto de transferencia", styles["SectionWL"]),
        Paragraph("1. Escribe una situación real en la que usarías tres expresiones de grupos distintos.<br/>2. Cambia el sujeto y el tiempo verbal de dos ejemplos.<br/>3. Explica en español por qué la partícula modifica el verbo base.", styles["Practice"]),
        Spacer(1, 3 * mm),
        Paragraph("Autoevaluación", styles["SectionWL"]),
        Paragraph("□ Reconozco al menos 16 usos. &nbsp;&nbsp; □ Puedo producir 10 sin mirar. &nbsp;&nbsp; □ Distingo los sentidos repetidos. &nbsp;&nbsp; □ Volveré a practicar en 48 horas.", styles["Small"]),
        Spacer(1, 5 * mm),
        HRFlowable(width="100%", thickness=0.7, color=NAVY, spaceBefore=1, spaceAfter=5),
        Paragraph("Sigue practicando en la ruta interactiva", styles["SectionWL"]),
        Paragraph(xml_escape(url), styles["Small"]),
    ]


def build_pdf(entry, items, kind):
    filename = f"{entry['path']}.pdf"
    destination = OUTPUT / filename
    url = f"{BASE_URL}/{entry['path']}"
    description = entry.get("note") or entry.get("description")
    document = SimpleDocTemplate(
        str(destination),
        pagesize=A4,
        rightMargin=16 * mm,
        leftMargin=16 * mm,
        topMargin=14 * mm,
        bottomMargin=18 * mm,
        title=entry["title"],
        author="Idiomas WeLearn",
        subject=entry.get("description", "Phrasal verbs en contexto"),
        pageCompression=1,
    )
    story = [
        Paragraph("IDIOMAS WELEARN · GUÍA DESCARGABLE", styles["Brand"]),
        Paragraph(xml_escape(entry["title"]), styles["TitleWL"]),
        Paragraph(xml_escape(description), styles["Deck"]),
        Table([
            [Paragraph(f"<b>{len(items)}</b><br/>usos", styles["Small"]), Paragraph(f"<b>{len(grouped(items))}</b><br/>grupos", styles["Small"]), Paragraph(f"<b>{len(items) * 2}</b><br/>ejemplos", styles["Small"])],
        ], colWidths=[57 * mm, 57 * mm, 57 * mm], style=TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), CREAM),
            ("BOX", (0, 0), (-1, -1), 0.45, LINE),
            ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
            ("LEFTPADDING", (0, 0), (-1, -1), 7),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ])),
        Spacer(1, 4 * mm),
        Paragraph("Ruta de aprendizaje", styles["SectionWL"]),
        route_summary(items),
        Spacer(1, 2 * mm),
    ]
    for group_index, (name, group) in enumerate(grouped(items), 1):
        story.append(KeepTogether([
            Paragraph(f"{group_index:02d} · {xml_escape(name)}", styles["SectionWL"]),
            entry_table(group, family=kind == "family"),
        ]))
    recap_rows = []
    for name, group in grouped(items):
        terms = ", ".join(xml_escape(item["term"]) for item in group[:3])
        recap_rows.append([Paragraph(f"<b>{xml_escape(name)}</b>", styles["Small"]), Paragraph(terms, styles["Small"])])
    recap = Table(recap_rows, colWidths=[58 * mm, 113 * mm], hAlign="LEFT")
    recap.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CREAM),
        ("LINEBELOW", (0, 0), (-1, -2), 0.35, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    story.extend([
        Spacer(1, 2 * mm),
        Paragraph("Repaso por grupos", styles["SectionWL"]),
        recap,
        Spacer(1, 3 * mm),
        Paragraph("Método sugerido", styles["SectionWL"]),
        Paragraph("Lee los dos ejemplos en voz alta; tapa el phrasal verb y recupéralo; crea una frase propia; marca para repaso las expresiones que comparten forma pero cambian de significado.", styles["Small"]),
    ])
    story.extend(practice_page(items, entry["title"], url))
    document.build(story, onFirstPage=page_footer, onLaterPages=page_footer)
    return destination


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    produced = []
    topics = {entry["slug"]: entry for entry in DATA["topics"]}
    families = {entry["slug"]: entry for entry in DATA["families"]}
    for slug in sorted(TOPIC_SLUGS):
        entry = topics[slug]
        items = [item for item in DATA["occurrences"] if item["topic"] == slug]
        produced.append(build_pdf(entry, items, "topic"))
    for slug in sorted(FAMILY_SLUGS):
        entry = families[slug]
        items = [item for item in DATA["family_occurrences"] if item["family"] == slug]
        produced.append(build_pdf(entry, items, "family"))
    for file in produced:
        print(file.relative_to(ROOT))


if __name__ == "__main__":
    main()
