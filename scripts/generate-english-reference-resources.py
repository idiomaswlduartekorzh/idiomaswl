#!/usr/bin/env python3
"""Build the public WeLearn English reference PDFs and shareable infographics."""

from __future__ import annotations

import json
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "tmp/english-reference-resources/data.json"
PUBLIC_PDF_DIR = ROOT / "private/site-materials/ingles-recursos"
OUTPUT_PDF_DIR = ROOT / "output/pdf/english-resources"
IMAGE_DIR = ROOT / "public/images/ingles/recursos"
BACKGROUND_SOURCE = Path(
    "/Users/ddev/.codex/generated_images/01a0f009-4e37-7fb2-b095-8a55cc35e162/"
    "exec-d4542119-3e90-4f70-93b5-4185dc6b7904.png"
)
BACKGROUND_TARGET = IMAGE_DIR / "welearn-reference-background.png"
LOGO_PATH = ROOT / "public/images/welearn-wordmark-transparent-v2.png"
FONT_REGULAR = ROOT / "public/fonts/welearn-ko-400.ttf"
FONT_BOLD = ROOT / "public/fonts/welearn-ko-700.ttf"

NAVY = colors.HexColor("#102A43")
INK = colors.HexColor("#193549")
CORAL = colors.HexColor("#E75D4F")
GOLD = colors.HexColor("#F2B544")
IVORY = colors.HexColor("#FFF9ED")
PALE_BLUE = colors.HexColor("#EAF3F7")
MUTED = colors.HexColor("#587083")
WHITE = colors.white

SLUG_TO_PDF = {
    "100-verbos-irregulares-ingles": "100-verbos-irregulares-ingles-welearn.pdf",
    "100-adjetivos-ingles-opuestos": "100-adjetivos-ingles-con-opuestos-welearn.pdf",
    "50-phrasal-verbs-esenciales": "50-phrasal-verbs-esenciales-welearn.pdf",
    "60-combinaciones-preposiciones-ingles": "60-combinaciones-preposiciones-ingles-welearn.pdf",
    "40-conectores-ingles": "40-conectores-ingles-welearn.pdf",
}


def setup() -> dict:
    if not DATA_PATH.exists():
        raise FileNotFoundError(f"Run export-english-reference-resources.mjs first: {DATA_PATH}")
    PUBLIC_PDF_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_PDF_DIR.mkdir(parents=True, exist_ok=True)
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    if not BACKGROUND_TARGET.exists():
        shutil.copy2(BACKGROUND_SOURCE, BACKGROUND_TARGET)
    pdfmetrics.registerFont(TTFont("WeLearn", str(FONT_REGULAR)))
    pdfmetrics.registerFont(TTFont("WeLearnBold", str(FONT_BOLD)))
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def resource_by_slug(data: dict, slug: str) -> dict:
    return next(item for item in data["resources"] if item["slug"] == slug)


def page_decor(canvas, doc, short_title: str):
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, height - 18 * mm, width, 18 * mm, stroke=0, fill=1)
    canvas.setFillColor(CORAL)
    canvas.rect(0, height - 20 * mm, width, 2 * mm, stroke=0, fill=1)
    canvas.setFont("WeLearnBold", 9)
    canvas.setFillColor(WHITE)
    canvas.drawString(16 * mm, height - 11.5 * mm, "WELEARN · INGLÉS A1–B1")
    canvas.setFont("WeLearn", 7.5)
    canvas.drawRightString(width - 16 * mm, height - 11.5 * mm, short_title)
    canvas.setStrokeColor(colors.HexColor("#D9E4E8"))
    canvas.line(16 * mm, 14 * mm, width - 16 * mm, 14 * mm)
    canvas.setFont("WeLearn", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(16 * mm, 8.5 * mm, "idiomaswl.com/practica/ingles/recursos")
    canvas.drawRightString(width - 16 * mm, 8.5 * mm, f"Página {doc.page}")
    canvas.restoreState()


def pdf_styles():
    base = getSampleStyleSheet()
    return {
        "cover_eyebrow": ParagraphStyle(
            "cover_eyebrow", parent=base["Normal"], fontName="WeLearnBold", fontSize=10,
            leading=13, textColor=CORAL, spaceAfter=7, uppercase=True,
        ),
        "cover_title": ParagraphStyle(
            "cover_title", parent=base["Title"], fontName="WeLearnBold", fontSize=29,
            leading=32, textColor=NAVY, alignment=TA_LEFT, spaceAfter=12,
        ),
        "cover_description": ParagraphStyle(
            "cover_description", parent=base["BodyText"], fontName="WeLearn", fontSize=11,
            leading=17, textColor=INK, spaceAfter=16,
        ),
        "h2": ParagraphStyle(
            "h2", parent=base["Heading2"], fontName="WeLearnBold", fontSize=17,
            leading=21, textColor=NAVY, spaceBefore=8, spaceAfter=9,
        ),
        "body": ParagraphStyle(
            "body", parent=base["BodyText"], fontName="WeLearn", fontSize=9.2,
            leading=13.5, textColor=INK, spaceAfter=7,
        ),
        "small": ParagraphStyle(
            "small", parent=base["BodyText"], fontName="WeLearn", fontSize=7.8,
            leading=10.5, textColor=INK,
        ),
        "small_bold": ParagraphStyle(
            "small_bold", parent=base["BodyText"], fontName="WeLearnBold", fontSize=7.8,
            leading=10.5, textColor=INK,
        ),
        "small_header": ParagraphStyle(
            "small_header", parent=base["BodyText"], fontName="WeLearnBold", fontSize=7.8,
            leading=10.5, textColor=WHITE,
        ),
        "center": ParagraphStyle(
            "center", parent=base["BodyText"], fontName="WeLearnBold", fontSize=10,
            leading=14, textColor=NAVY, alignment=TA_CENTER,
        ),
    }


def p(text: str, style) -> Paragraph:
    safe = (str(text).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))
    return Paragraph(safe, style)


def table_style(header=True, compact=False):
    rules = [
        ("FONTNAME", (0, 0), (-1, -1), "WeLearn"),
        ("FONTSIZE", (0, 0), (-1, -1), 7.1 if compact else 7.6),
        ("LEADING", (0, 0), (-1, -1), 9 if compact else 10),
        ("TEXTCOLOR", (0, 0), (-1, -1), INK),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#CFDDE3")),
        ("ROWBACKGROUNDS", (0, 1 if header else 0), (-1, -1), [WHITE, colors.HexColor("#F6FAFB")]),
    ]
    if header:
        rules.extend([
            ("BACKGROUND", (0, 0), (-1, 0), NAVY),
            ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
            ("FONTNAME", (0, 0), (-1, 0), "WeLearnBold"),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 6),
            ("TOPPADDING", (0, 0), (-1, 0), 6),
        ])
    return TableStyle(rules)


def cover_story(resource: dict, styles: dict, study_points: list[str]):
    return [
        Spacer(1, 20 * mm),
        Paragraph(resource["eyebrow"].upper(), styles["cover_eyebrow"]),
        Paragraph(resource["title"], styles["cover_title"]),
        Paragraph(resource["description"], styles["cover_description"]),
        Table(
            [[p(resource["countLabel"], styles["center"]), p("PDF gratuito · listo para imprimir", styles["center"])]],
            colWidths=[84 * mm, 84 * mm],
            style=TableStyle([
                ("BACKGROUND", (0, 0), (0, 0), PALE_BLUE),
                ("BACKGROUND", (1, 0), (1, 0), colors.HexColor("#FFF0E9")),
                ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#C8D8DF")),
                ("INNERGRID", (0, 0), (-1, -1), 0.6, colors.HexColor("#C8D8DF")),
                ("TOPPADDING", (0, 0), (-1, -1), 11),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 11),
            ]),
        ),
        Spacer(1, 12 * mm),
        Paragraph("Cómo aprovechar esta lista", styles["h2"]),
        *[Paragraph(f"• {point}", styles["body"]) for point in study_points],
        Spacer(1, 6 * mm),
        Table(
            [[p("Estudia la lista → practica el tema → vuelve y produce tus propios ejemplos.", styles["center"])]],
            colWidths=[168 * mm],
            style=TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), GOLD),
                ("BOX", (0, 0), (-1, -1), 0, GOLD),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]),
        ),
        PageBreak(),
    ]


def section_title(title: str, note: str, styles: dict):
    return KeepTogether([
        Paragraph(title, styles["h2"]),
        Paragraph(note, styles["body"]),
    ])


def build_pdf(path: Path, resource: dict, story: list, short_title: str):
    doc = SimpleDocTemplate(
        str(path), pagesize=A4, leftMargin=16 * mm, rightMargin=16 * mm,
        topMargin=27 * mm, bottomMargin=20 * mm,
        title=resource["title"], author="WeLearn Idiomas",
        subject=resource["description"],
    )
    doc.build(
        story,
        onFirstPage=lambda canvas, current_doc: page_decor(canvas, current_doc, short_title),
        onLaterPages=lambda canvas, current_doc: page_decor(canvas, current_doc, short_title),
    )
    shutil.copy2(path, OUTPUT_PDF_DIR / path.name)


def build_irregular_pdf(data: dict, styles: dict):
    resource = resource_by_slug(data, "100-verbos-irregulares-ingles")
    story = cover_story(resource, styles, [
        "Aprende por familias de sonido en lugar de memorizar cien filas aisladas.",
        "Di en voz alta base, pasado y participio; después crea una oración breve.",
        "Usa el pasado con yesterday y el participio con have o has.",
    ])
    for group in data["irregularVerbGroups"]:
        story.append(section_title(group["pattern"], group["soundNote"], styles))
        rows = [[p("Base", styles["small_header"]), p("Past", styles["small_header"]), p("Participle", styles["small_header"]), p("Español / nota", styles["small_header"])]]
        for verb in group["verbs"]:
            detail = verb["es"] + (f" · {verb['note']}" if verb.get("note") else "")
            rows.append([p(verb["base"], styles["small"]), p(verb["past"], styles["small"]), p(verb["participle"], styles["small"]), p(detail, styles["small"])])
        table = Table(rows, colWidths=[31 * mm, 34 * mm, 38 * mm, 65 * mm], repeatRows=1)
        table.setStyle(table_style(compact=True))
        story.extend([table, Spacer(1, 5 * mm)])
    story.extend([PageBreak(), Paragraph("Mini reto: activa la memoria", styles["h2"]), Paragraph(
        "Tapa las columnas Past y Participle. Completa diez verbos cada día y escribe dos historias: una en past simple y otra en present perfect.", styles["body"]
    ), Paragraph("Practica con ejercicios autocorregibles en idiomaswl.com/practica/ingles/a2/gramatica/past-simple-irregular", styles["body"])])
    build_pdf(PUBLIC_PDF_DIR / SLUG_TO_PDF[resource["slug"]], resource, story, "100 verbos irregulares")


def build_adjectives_pdf(data: dict, styles: dict):
    resource = resource_by_slug(data, "100-adjetivos-ingles-opuestos")
    story = cover_story(resource, styles, [
        "Memoriza en pares: una palabra te dará una pista para recordar la otra.",
        "Añade un sustantivo: a narrow street, a reliable person, an ancient city.",
        "Compara dos ideas con than para convertir vocabulario en gramática útil.",
    ])
    categories = []
    for row in data["adjectivePairs"]:
        if row[3] not in categories:
            categories.append(row[3])
    for category in categories:
        story.append(section_title(category, "Diez pares para describir con más precisión.", styles))
        rows = [[p("Adjetivo", styles["small_header"]), p("Opuesto", styles["small_header"]), p("Significado", styles["small_header"]), p("Modelo", styles["small_header"])]]
        for word, opposite, spanish, _ in [r for r in data["adjectivePairs"] if r[3] == category]:
            rows.append([p(word, styles["small"]), p(opposite, styles["small"]), p(spanish, styles["small"]), p(f"It is {word}, not {opposite}.", styles["small"])])
        table = Table(rows, colWidths=[33 * mm, 36 * mm, 52 * mm, 47 * mm], repeatRows=1)
        table.setStyle(table_style())
        story.extend([table, Spacer(1, 5 * mm)])
    build_pdf(PUBLIC_PDF_DIR / SLUG_TO_PDF[resource["slug"]], resource, story, "100 adjetivos con opuestos")


def build_grouped_pdf(data: dict, styles: dict, slug: str, data_key: str, headers: list[str], widths: list, study_points: list[str], short_title: str):
    resource = resource_by_slug(data, slug)
    story = cover_story(resource, styles, study_points)
    items = data[data_key]
    categories = []
    for row in items:
        if row[-1] not in categories:
            categories.append(row[-1])
    for category in categories:
        story.append(section_title(category, "Aprende cada combinación dentro de una frase completa.", styles))
        rows = [[p(header, styles["small_header"]) for header in headers]]
        for item in [row for row in items if row[-1] == category]:
            rows.append([p(value, styles["small"]) for value in item[:-1]])
        table = Table(rows, colWidths=widths, repeatRows=1)
        table.setStyle(table_style())
        story.extend([table, Spacer(1, 5 * mm)])
    build_pdf(PUBLIC_PDF_DIR / SLUG_TO_PDF[resource["slug"]], resource, story, short_title)


def pil_font(size: int, bold=False):
    return ImageFont.truetype(str(FONT_BOLD if bold else FONT_REGULAR), size=size)


def fit_text(draw: ImageDraw.ImageDraw, text: str, box_width: int, start_size: int, min_size: int = 24, bold=False):
    for size in range(start_size, min_size - 1, -2):
        font = pil_font(size, bold)
        if draw.textbbox((0, 0), text, font=font)[2] <= box_width:
            return font
    return pil_font(min_size, bold)


def draw_infographic(slug: str, title: str, subtitle: str, columns: list[str], rows: list[list[str]], accent: tuple[int, int, int], label: str):
    size = (1080, 1350)
    background = Image.open(BACKGROUND_TARGET).convert("RGB").resize(size, Image.Resampling.LANCZOS)
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.rounded_rectangle((54, 56, 1026, 1294), radius=38, fill=(255, 250, 240, 244), outline=(255, 255, 255, 215), width=3)
    draw.rounded_rectangle((54, 56, 1026, 267), radius=38, fill=(16, 42, 67, 252))
    draw.rectangle((54, 228, 1026, 267), fill=(16, 42, 67, 252))
    draw.rounded_rectangle((90, 84, 308, 128), radius=22, fill=accent + (255,))
    draw.text((199, 106), "WELEARN · A1–B1", anchor="mm", font=pil_font(22, True), fill=(255, 255, 255))
    title_font = fit_text(draw, title, 900, 56, 38, True)
    draw.text((90, 153), title, font=title_font, fill=(255, 255, 255))
    draw.text((90, 220), subtitle, font=pil_font(24), fill=(224, 237, 244))

    ncols = len(columns)
    usable = 900
    if ncols == 4:
        col_widths = [0.2, 0.2, 0.23, 0.37]
    elif ncols == 3:
        col_widths = [0.27, 0.31, 0.42]
    else:
        col_widths = [1 / ncols] * ncols
    xs = [90]
    for ratio in col_widths[:-1]:
        xs.append(xs[-1] + int(usable * ratio))
    header_y = 297
    draw.rounded_rectangle((82, header_y - 10, 998, header_y + 50), radius=16, fill=accent + (255,))
    for index, heading in enumerate(columns):
        draw.text((xs[index] + 8, header_y + 19), heading.upper(), anchor="lm", font=pil_font(20, True), fill=(255, 255, 255))

    table_top = 363
    table_bottom = 1150
    row_height = (table_bottom - table_top) // len(rows)
    body_size = 21 if len(rows) <= 15 else 18
    for row_index, row in enumerate(rows):
        y0 = table_top + row_index * row_height
        if row_index % 2 == 0:
            draw.rounded_rectangle((82, y0, 998, y0 + row_height - 3), radius=10, fill=(232, 241, 244, 235))
        for col_index, value in enumerate(row):
            is_key = col_index == 0
            max_w = int(usable * col_widths[col_index]) - 20
            font = fit_text(draw, value, max_w, body_size, 14, is_key)
            fill = (16, 42, 67) if is_key else (42, 66, 82)
            draw.text((xs[col_index] + 8, y0 + row_height / 2), value, anchor="lm", font=font, fill=fill)

    draw.rounded_rectangle((82, 1174, 998, 1254), radius=24, fill=(16, 42, 67, 252))
    draw.text((112, 1205), "LISTA COMPLETA GRATIS EN PDF", font=pil_font(24, True), fill=(242, 181, 68))
    draw.text((112, 1235), "idiomaswl.com/practica/ingles/recursos", font=pil_font(20), fill=(255, 255, 255))
    draw.rounded_rectangle((830, 1190, 968, 1238), radius=24, fill=accent + (255,))
    label_font = fit_text(draw, label, 118, 22, 16, True)
    draw.text((899, 1214), label, anchor="mm", font=label_font, fill=(255, 255, 255))
    Image.alpha_composite(background.convert("RGBA"), overlay).convert("RGB").save(
        IMAGE_DIR / f"{slug}.png", quality=95, optimize=True
    )


def build_infographics(data: dict):
    verbs = [verb for group in data["irregularVerbGroups"] for verb in group["verbs"]]
    priorities = ["be", "go", "do", "have", "get", "make", "say", "see", "come", "take", "give", "know", "think", "drive", "write", "speak", "eat", "drink", "run", "read"]
    lookup = {verb["base"]: verb for verb in verbs}
    draw_infographic(
        "100-verbos-irregulares-ingles", "20 verbos irregulares clave", "Base · pasado · participio · español",
        ["Base", "Past", "Participle", "Español"],
        [[lookup[key]["base"], lookup[key]["past"], lookup[key]["participle"], lookup[key]["es"]] for key in priorities],
        (231, 93, 79), "100 EN PDF",
    )
    draw_infographic(
        "100-adjetivos-ingles-opuestos", "20 pares de adjetivos", "Aprende el vocabulario con su opuesto",
        ["Adjetivo", "Opuesto", "Significado"],
        [[row[0], row[1], row[2]] for row in data["adjectivePairs"][:20]],
        (31, 139, 148), "100 EN PDF",
    )
    draw_infographic(
        "50-phrasal-verbs-esenciales", "15 phrasal verbs esenciales", "Inglés real para situaciones cotidianas",
        ["Phrasal verb", "Significado", "Contexto"],
        [[row[0], row[1], row[3]] for row in data["phrasalVerbs"][:15]],
        (231, 93, 79), "50 EN PDF",
    )
    prep_rows = data["prepositionCombinations"][:6] + data["prepositionCombinations"][20:26] + data["prepositionCombinations"][40:46]
    draw_infographic(
        "60-combinaciones-preposiciones-ingles", "18 combinaciones con preposición", "Verbos, adjetivos y sustantivos que van juntos",
        ["Combinación", "Significado", "Patrón"],
        [[row[0], row[1], row[3].replace(" + preposition", "")] for row in prep_rows],
        (31, 139, 148), "60 EN PDF",
    )
    draw_infographic(
        "40-conectores-ingles", "18 conectores para escribir mejor", "Organiza ideas por función y registro",
        ["Conector", "Función", "Registro"],
        [[row[0], row[1], row[3]] for row in data["linkingWords"][:18]],
        (231, 93, 79), "40 EN PDF",
    )


def main():
    data = setup()
    styles = pdf_styles()
    build_irregular_pdf(data, styles)
    build_adjectives_pdf(data, styles)
    build_grouped_pdf(
        data, styles, "50-phrasal-verbs-esenciales", "phrasalVerbs",
        ["Phrasal verb", "Significado", "Ejemplo"], [40 * mm, 43 * mm, 85 * mm],
        ["Aprende el verbo y su partícula como una sola unidad.", "Relaciona cada expresión con una situación real.", "Cambia el sujeto o el tiempo verbal del ejemplo."],
        "50 phrasal verbs esenciales",
    )
    build_grouped_pdf(
        data, styles, "60-combinaciones-preposiciones-ingles", "prepositionCombinations",
        ["Combinación", "Significado", "Ejemplo"], [45 * mm, 48 * mm, 75 * mm],
        ["No traduzcas la preposición de forma aislada: aprende la combinación completa.", "Escribe una frase personal por patrón.", "Marca con color las combinaciones que más confundes."],
        "60 combinaciones con preposición",
    )
    build_grouped_pdf(
        data, styles, "40-conectores-ingles", "linkingWords",
        ["Conector", "Función", "Ejemplo"], [40 * mm, 34 * mm, 94 * mm],
        ["Elige el conector por función: adición, contraste, causa o resultado.", "Observa el registro antes de usarlo en conversación o escritura formal.", "Une dos oraciones propias cada día."],
        "40 conectores por función",
    )
    build_infographics(data)
    print(f"Generated 5 PDFs in {PUBLIC_PDF_DIR} and {OUTPUT_PDF_DIR}")
    print(f"Generated 5 infographics in {IMAGE_DIR}")


if __name__ == "__main__":
    main()
