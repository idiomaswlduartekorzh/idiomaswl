#!/usr/bin/env python3
"""Build polished WeLearn answer-key PDFs for the public exam practice sets."""

from __future__ import annotations

import csv
import json
import re
import sys
from html import escape
from pathlib import Path

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
SOURCE = (Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "tmp/pdfs/exam-answer-keys/source-data.json").resolve()
OUT = (Path(sys.argv[2]) if len(sys.argv) > 2 else ROOT / "output/pdf/exam-answer-keys").resolve()
WORDMARK = ROOT / "public/images/welearn-wordmark-transparent-v2.png"

NAVY = colors.HexColor("#102B72")
ROYAL = colors.HexColor("#0B3F9D")
RED = colors.HexColor("#EF2929")
INK = colors.HexColor("#15254F")
MUTED = colors.HexColor("#5D6E91")
PALE_BLUE = colors.HexColor("#F1F5FC")
SOFT_BLUE = colors.HexColor("#F7F9FD")
LINE = colors.HexColor("#CAD5EA")
GREEN = colors.HexColor("#17764B")
WHITE = colors.white

SERIES = {
    "ielts": ("IELTS Academic", "ielts", "Español"),
    "goethe": ("Goethe-Zertifikat A1", "goethe-a1", "Deutsch"),
    "cambridge-b2": ("Cambridge B2 First (FCE)", "fce", "Español"),
    "toefl": ("TOEFL iBT 2026", "toefl", "Español"),
}

def clean(value: object) -> str:
    text = str(value or "")
    for old, new in {
        "\u2010": "-", "\u2011": "-", "\u2012": "-", "\u2013": "-", "\u2014": "-",
        "\u2212": "-", "\u2022": "-", "\u00a0": " ",
    }.items():
        text = text.replace(old, new)
    return re.sub(r"\s+", " ", text).strip()


def register_fonts() -> None:
    candidates = [
        (Path("/System/Library/Fonts/Supplemental/Arial.ttf"), Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf")),
        (ROOT / "public/fonts/welearn-ru-400.ttf", ROOT / "public/fonts/welearn-ru-700.ttf"),
    ]
    for regular, bold in candidates:
        if regular.exists() and bold.exists():
            pdfmetrics.registerFont(TTFont("WL-Regular", str(regular)))
            pdfmetrics.registerFont(TTFont("WL-Bold", str(bold)))
            return
    raise FileNotFoundError("No compatible Unicode font found")


register_fonts()
styles = getSampleStyleSheet()
styles.add(ParagraphStyle("WLKicker", fontName="WL-Bold", fontSize=7.4, leading=9.5, textColor=RED, spaceAfter=5))
styles.add(ParagraphStyle("WLHero", fontName="WL-Bold", fontSize=22, leading=26, textColor=NAVY, spaceAfter=4))
styles.add(ParagraphStyle("WLHeroExam", fontName="WL-Regular", fontSize=11.5, leading=15, textColor=MUTED, spaceAfter=4))
styles.add(ParagraphStyle("WLSection", fontName="WL-Bold", fontSize=12.5, leading=16, textColor=NAVY))
styles.add(ParagraphStyle("WLBody", fontName="WL-Regular", fontSize=9.4, leading=13.5, textColor=INK))
styles.add(ParagraphStyle("WLBodyBold", fontName="WL-Bold", fontSize=9.4, leading=13.5, textColor=INK))
styles.add(ParagraphStyle("WLMeta", fontName="WL-Regular", fontSize=8.1, leading=11.2, textColor=MUTED))
styles.add(ParagraphStyle("WLNumber", fontName="WL-Bold", fontSize=8.8, leading=12, textColor=RED, alignment=TA_RIGHT))
styles.add(ParagraphStyle("WLAnswer", fontName="WL-Bold", fontSize=9.4, leading=13.5, textColor=NAVY))
styles.add(ParagraphStyle("WLMode", fontName="WL-Regular", fontSize=7.4, leading=9.5, textColor=MUTED))
styles.add(ParagraphStyle("WLTableHead", fontName="WL-Bold", fontSize=7.4, leading=9.5, textColor=WHITE))
styles.add(ParagraphStyle("WLStatNumber", fontName="WL-Bold", fontSize=15.5, leading=17, textColor=NAVY, alignment=TA_CENTER))
styles.add(ParagraphStyle("WLStatLabel", fontName="WL-Bold", fontSize=6.3, leading=7.5, textColor=MUTED, alignment=TA_CENTER))


def p(value: object, style: str = "WLBody") -> Paragraph:
    return Paragraph(escape(clean(value)).replace("\n", "<br/>"), styles[style])


def localized_section_title(section: dict, exam_slug: str, skill_index: int, is_german: bool) -> str:
    title = clean(section["title"])
    if is_german:
        return title
    skill = section.get("skill", "general")
    skill_label = {
        "listening": "Comprensión auditiva",
        "reading": "Comprensión de lectura",
        "writing": "Expresión escrita",
        "speaking": "Expresión oral",
    }.get(skill, "Sección")
    part_match = re.search(r"(?:Part|Parte|Task|Tarea)\s*(\d+)", title, re.IGNORECASE)
    module_match = re.search(r"M[oó]dulo\s*(\d+)", title, re.IGNORECASE)
    if exam_slug == "ielts":
        unit = "Texto" if skill == "reading" else "Tarea" if skill == "writing" else "Sección"
        return skill_label if skill == "speaking" else f"{skill_label} - {unit} {part_match.group(1) if part_match else skill_index}"
    if exam_slug == "cambridge-b2":
        prefix = "Lectura y uso del inglés" if skill == "reading" else skill_label
        return prefix if skill == "speaking" else f"{prefix} - Parte {part_match.group(1) if part_match else skill_index}"
    if exam_slug == "toefl":
        module = f"Módulo {module_match.group(1)} · " if module_match else ""
        return f"{skill_label} - {module}Bloque {skill_index}"
    return f"{skill_label} - Sección {skill_index}"


def localized_type(value: str, is_german: bool) -> str:
    if not is_german:
        return {
            "Speaking": "Expresión oral",
            "Writing": "Expresión escrita",
            "TOEFL Reading": "Lectura TOEFL",
            "TOEFL Listening": "Escucha TOEFL",
        }.get(clean(value), clean(value))
    translations = {
        "Opción múltiple": "Mehrfachauswahl",
        "Diálogo": "Dialog",
        "Completar": "Ergänzen",
        "Emparejar": "Zuordnen",
        "Selección múltiple": "Mehrfachauswahl",
        "Tabla": "Tabelle",
        "Palabra": "Wortergänzung",
        "Ordenar frase": "Satz ordnen",
        "Pronunciación": "Aussprache",
        "Writing": "Schreiben",
        "Speaking": "Sprechen",
    }
    return translations.get(clean(value), clean(value))


def localized_answer(row: dict, is_german: bool) -> str:
    answer = clean(row.get("answer"))
    if is_german:
        answer = answer.replace("Evaluación con rúbrica; no hay respuesta única.", "Bewertung nach Kriterien; es gibt keine einzige Musterlösung.")
        answer = answer.replace("Evaluación oral; no hay respuesta única.", "Mündliche Bewertung nach Kriterien; es gibt keine einzige Musterlösung.")
    return answer


def page_branding(canvas, doc, label: str, is_german: bool) -> None:
    canvas.saveState()
    width, height = A4
    if WORDMARK.exists():
        canvas.drawImage(str(WORDMARK), 25 * mm, height - 21.5 * mm, width=27 * mm, height=10.9 * mm,
                         preserveAspectRatio=True, anchor="c", mask="auto")
    canvas.setFont("WL-Regular", 7.1)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(width - 25 * mm, height - 16.2 * mm, label)
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.55)
    canvas.line(25 * mm, height - 27.5 * mm, width - 25 * mm, height - 27.5 * mm)
    canvas.setStrokeColor(RED)
    canvas.setLineWidth(1.2)
    canvas.line(25 * mm, height - 27.5 * mm, 43 * mm, height - 27.5 * mm)
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.55)
    canvas.line(25 * mm, 15.5 * mm, width - 25 * mm, 15.5 * mm)
    canvas.setFont("WL-Regular", 7.1)
    canvas.setFillColor(MUTED)
    footer = "Originalmaterial von Idiomas WeLearn" if is_german else "Material original propiedad de Idiomas WeLearn"
    canvas.drawString(25 * mm, 10.2 * mm, footer)
    canvas.drawCentredString(width / 2, 10.2 * mm, "www.idiomaswl.com")
    canvas.setFont("WL-Bold", 7.1)
    canvas.setFillColor(RED)
    canvas.drawRightString(width - 25 * mm, 10.2 * mm, str(doc.page))
    canvas.restoreState()


def compact_header(story: list, exam_label: str, set_label: str, is_german: bool) -> None:
    story.append(Paragraph("WELEARN · LÖSUNGEN" if is_german else "WELEARN · CLAVES", styles["WLKicker"]))
    story.append(Paragraph("Lösungen und Bewertungshinweise" if is_german else "Claves y criterios de respuesta", styles["WLHero"]))
    story.append(Paragraph(f"{escape(exam_label)} &nbsp;·&nbsp; {escape(set_label)}", styles["WLHeroExam"]))
    story.append(Table([["", ""]], colWidths=[18 * mm, 142 * mm], rowHeights=[0.7 * mm], style=TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), RED), ("BACKGROUND", (1, 0), (1, 0), LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ])))
    story.append(Spacer(1, 8 * mm))


def summary_cards(story: list, data: dict, is_german: bool) -> None:
    labels = ("Automatisch", "Referenz", "Offen") if is_german else ("Autocorregidas", "De referencia", "Abiertas")
    cells = []
    for value, label in zip((data["automatic"], data["reference"], data["open"]), labels):
        cells.append([Paragraph(str(value), styles["WLStatNumber"]), Paragraph(label.upper(), styles["WLStatLabel"])])
    table = Table([[Table([[cell[0]], [cell[1]]], colWidths=[50 * mm]) for cell in cells]], colWidths=[53.3 * mm] * 3)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PALE_BLUE), ("BOX", (0, 0), (-1, -1), 0.55, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.55, WHITE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    story.extend([table, Spacer(1, 5 * mm)])
    note = (
        "Verwenden Sie dieses Dokument erst nach der Bearbeitung des Tests. Offene Aufgaben werden nach Kriterien bewertet und haben keine einzige Musterlösung."
        if is_german else
        "Usa este documento después de resolver el set. Las tareas abiertas se evalúan con criterios y no tienen una única respuesta modelo."
    )
    box = Table([[p(note)]], colWidths=[160 * mm])
    box.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), SOFT_BLUE), ("LINEBEFORE", (0, 0), (0, -1), 1.3, RED),
        ("LEFTPADDING", (0, 0), (-1, -1), 10), ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.extend([box, Spacer(1, 8 * mm)])


def display_number(value: object, row_index: int) -> str:
    number = clean(value)
    if re.fullmatch(r"\d+(?:\s*[-+]\s*\d+)?", number):
        return number
    match = re.search(r"q(\d+)$", number, re.IGNORECASE)
    return match.group(1) if match else str(row_index)


def section_block(section: dict, index: int, exam_slug: str, skill_index: int, is_german: bool) -> list:
    title = localized_section_title(section, exam_slug, skill_index, is_german)
    heading = Table([[
        Paragraph(f"{index:02d}", styles["WLNumber"]),
        Paragraph(escape(title), styles["WLSection"]),
    ]], colWidths=[14 * mm, 146 * mm])
    heading.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "BOTTOM"), ("LINEBELOW", (0, 0), (-1, -1), 0.6, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (0, 0), 4),
        ("RIGHTPADDING", (1, 0), (1, 0), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    rows = [[
        p("Nr." if is_german else "N.º", "WLTableHead"),
        p("Lösung / Kriterium" if is_german else "Respuesta / criterio", "WLTableHead"),
        p("Typ" if is_german else "Tipo", "WLTableHead"),
    ]]
    seen_numbers: set[str] = set()
    for row_index, row in enumerate(section["rows"], 1):
        mode = {"automatic": "Automatisch", "reference": "Referenz", "open": "Offen"}.get(row["mode"], row["mode"]) if is_german else {
            "automatic": "Automática", "reference": "Referencia", "open": "Abierta",
        }.get(row["mode"], row["mode"])
        display = display_number(row["number"], row_index)
        if display in seen_numbers:
            display = str(row_index)
        seen_numbers.add(display)
        rows.append([
            p(display, "WLNumber"),
            p(localized_answer(row, is_german), "WLAnswer"),
            Paragraph(f"{escape(localized_type(row['type'], is_german))}<br/><font color='#5D6E91'>{escape(mode)}</font>", styles["WLMode"]),
        ])
    if len(rows) == 1:
        rows.append([p("-", "WLNumber"), p("Keine auswertbaren Antworten." if is_german else "Sin respuestas calificables."), p("-", "WLMode")])
    table = Table(rows, colWidths=[16 * mm, 111 * mm, 33 * mm], repeatRows=1, hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY), ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, SOFT_BLUE]),
        ("BOX", (0, 0), (-1, -1), 0.55, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.25, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return [KeepTogether([heading, Spacer(1, 3 * mm)]), table, Spacer(1, 7 * mm)]


def build_pdf(data: dict) -> tuple[Path, int, int]:
    exam_label, slug, interface_language = SERIES[data["examSlug"]]
    is_german = interface_language == "Deutsch"
    set_label = f"Testsatz {data['setNumber']}" if is_german else f"Set {data['setNumber']}"
    folder = OUT / slug
    folder.mkdir(parents=True, exist_ok=True)
    target = folder / f"{slug}-set-{int(data['setNumber']):02d}-claves.pdf"
    page_label = f"{exam_label} - {set_label}"
    title = f"{exam_label} {set_label} - {'Lösungen und Bewertungshinweise' if is_german else 'Claves y criterios'}"
    subject = "Lösungen für die Prüfungsvorbereitung" if is_german else "Claves para práctica de examen"
    doc = SimpleDocTemplate(str(target), pagesize=A4, rightMargin=25 * mm, leftMargin=25 * mm,
                            topMargin=36 * mm, bottomMargin=23 * mm, title=title,
                            author="Idiomas WeLearn", subject=subject)
    story = []
    compact_header(story, exam_label, set_label, is_german)
    summary_cards(story, data, is_german)
    skill_counts: dict[str, int] = {}
    for index, section in enumerate(data["sections"], 1):
        skill = section.get("skill", "general")
        skill_counts[skill] = skill_counts.get(skill, 0) + 1
        if index > 1 and len(section["rows"]) > 18:
            story.append(PageBreak())
        story.extend(section_block(section, index, data["examSlug"], skill_counts[skill], is_german))
    doc.build(story,
              onFirstPage=lambda canvas, d: page_branding(canvas, d, page_label, is_german),
              onLaterPages=lambda canvas, d: page_branding(canvas, d, page_label, is_german))
    reader = PdfReader(str(target))
    if not reader.pages:
        raise RuntimeError(f"Empty PDF: {target}")
    answer_count = data["automatic"] + data["reference"] + data["open"]
    return target, len(reader.pages), answer_count


def main() -> None:
    payload = json.loads(SOURCE.read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)
    rows = []
    for data in payload["sets"]:
        target, pages, answers = build_pdf(data)
        rows.append({
            "exam": data["examSlug"], "set": data["setNumber"],
            "pdf": str(target.relative_to(ROOT)), "pages": pages, "answers": answers,
        })
    if len(rows) != 57:
        raise RuntimeError(f"Expected 57 PDFs, generated {len(rows)}")
    manifest_path = OUT / "manifest.csv"
    with manifest_path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)
    summary = {
        "pdfs": len(rows), "pages": sum(row["pages"] for row in rows),
        "answers": sum(row["answers"] for row in rows), "manifest": str(manifest_path),
    }
    (OUT / "manifest.json").write_text(json.dumps({"summary": summary, "files": rows}, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
