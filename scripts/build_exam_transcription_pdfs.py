#!/usr/bin/env python3
"""Build polished WeLearn audio-transcript PDFs for active exam sets."""

from __future__ import annotations

import csv
import json
import math
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
from reportlab.platypus import CondPageBreak, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
SOURCE = (Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "tmp/pdfs/exam-transcriptions/source-data.json").resolve()
OUT = (Path(sys.argv[2]) if len(sys.argv) > 2 else ROOT / "output/pdf/exam-transcriptions").resolve()
WORDMARK = ROOT / "public/images/welearn-wordmark-transparent-v2.png"

# WeLearn identity sampled from the approved printable guide.
NAVY = colors.HexColor("#102B72")
ROYAL = colors.HexColor("#0B3F9D")
RED = colors.HexColor("#EF2929")
INK = colors.HexColor("#15254F")
MUTED = colors.HexColor("#5D6E91")
PALE_BLUE = colors.HexColor("#F1F5FC")
SOFT_BLUE = colors.HexColor("#F7F9FD")
LINE = colors.HexColor("#CAD5EA")
WHITE = colors.white


IELTS_TOPIC_ES = {
    "Booking a Guided City Walk": "Reserva de un recorrido guiado por la ciudad",
    "Booking a Home Repair": "Reserva de una reparación doméstica",
    "Booking a Photography Workshop": "Reserva de un taller de fotografía",
    "Booking a Sports Facility": "Reserva de una instalación deportiva",
    "Booking a language exchange": "Inscripción en un intercambio de idiomas",
    "Booking a wedding venue": "Reserva de un lugar para bodas",
    "Car Tours": "Recorridos en automóvil",
    "Car-Park and Travel-Card Enquiry": "Consulta sobre estacionamiento y tarjeta de transporte",
    "Enrolling in an Evening Course": "Inscripción en un curso nocturno",
    "Hotel Reservation": "Reserva de hotel",
    "Job-Agency Registration": "Registro en una agencia de empleo",
    "Joining a Book Club": "Inscripción en un club de lectura",
    "Library Membership": "Afiliación a la biblioteca",
    "Ordering from a Catering Firm": "Pedido a una empresa de catering",
    "Registering Children for a Summer Camp": "Inscripción de niños en un campamento de verano",
    "Renting a Bicycle": "Alquiler de una bicicleta",
    "Reporting a Lost Item": "Reporte de un objeto perdido",
    "Reserving a Study Room": "Reserva de una sala de estudio",
    "Signing up for a gym": "Inscripción en un gimnasio",
    "Student Housing Inquiry": "Consulta sobre alojamiento estudiantil",
    "Airport orientation announcement": "Anuncio de orientación en el aeropuerto",
    "Art Gallery Guided Tour": "Visita guiada a una galería de arte",
    "Campus Orientation Talk": "Charla de orientación del campus",
    "Charity fun-run briefing": "Indicaciones para una carrera benéfica",
    "Community Festival Briefing": "Indicaciones para un festival comunitario",
    "Company Induction": "Inducción empresarial",
    "Farm Open-Day Talk": "Charla sobre una jornada de puertas abiertas en una granja",
    "LP Clubs": "Clubes LP",
    "Library Services": "Servicios de la biblioteca",
    "Museum Audio Guide": "Audioguía del museo",
    "Natural History Museum Audio Guide": "Audioguía del museo de historia natural",
    "Nature Reserve Welcome Talk": "Charla de bienvenida a una reserva natural",
    "New Leisure-Centre Tour": "Recorrido por un nuevo centro recreativo",
    "Recycling Scheme Launch": "Lanzamiento de un programa de reciclaje",
    "Science-museum tour": "Recorrido por un museo de ciencias",
    "Talk about a Recycling Programme": "Charla sobre un programa de reciclaje",
    "Theatre Backstage Tour": "Recorrido tras bambalinas de un teatro",
    "Transport Museum Guide": "Guía del museo del transporte",
    "University Clubs Fair": "Feria de clubes universitarios",
    "Volunteer Induction Talk": "Charla de inducción para voluntarios",
    "Architecture Project": "Proyecto de arquitectura",
    "Business Plan Tutorial": "Tutoría sobre un plan de negocios",
    "Designing a Psychology Experiment": "Diseño de un experimento de psicología",
    "Discussion about Renewable Energy Project": "Conversación sobre un proyecto de energía renovable",
    "Education Survey Design": "Diseño de una encuesta educativa",
    "Engineering Prototype Review": "Revisión de un prototipo de ingeniería",
    "Environmental Essay Review": "Revisión de un ensayo ambiental",
    "Field-trip Planning Discussion": "Conversación para planificar una salida de campo",
    "Film-studies project": "Proyecto de estudios cinematográficos",
    "Geology fieldwork plan": "Plan de trabajo de campo de geología",
    "Global Design Competition": "Concurso global de diseño",
    "Linguistics Presentation Discussion": "Conversación sobre una presentación de lingüística",
    "Marketing Coursework Discussion": "Conversación sobre un trabajo de marketing",
    "Nutrition Study Project": "Proyecto de estudio sobre nutrición",
    "Public Health Campaign Plan": "Plan de una campaña de salud pública",
    "Research Discussion - Social Media and Well-being": "Conversación de investigación - Redes sociales y bienestar",
    "Robotics Group Project": "Proyecto grupal de robótica",
    "Seminar on Urban Farming": "Seminario sobre agricultura urbana",
    "Sports-Science Study Discussion": "Conversación sobre un estudio de ciencias del deporte",
    "Tourism dissertation discussion": "Conversación sobre una tesis de turismo",
    "Antarctic research": "Investigación en la Antártida",
    "Bird Navigation": "Navegación de las aves",
    "Coral Bleaching": "Blanqueamiento de corales",
    "Desert Ecosystems": "Ecosistemas desérticos",
    "Human Colour Vision": "Visión humana del color",
    "Lecture on Bird Migration": "Conferencia sobre la migración de aves",
    "Lecture on Coral Reef Ecosystems": "Conferencia sobre ecosistemas de arrecifes de coral",
    "Lecture on the History of Writing": "Conferencia sobre la historia de la escritura",
    "Renewable energy storage": "Almacenamiento de energía renovable",
    "The History of Chocolate": "La historia del chocolate",
    "The History of Clocks": "La historia de los relojes",
    "The History of Tea": "La historia del té",
    "The Migration of Whales": "La migración de las ballenas",
    "The Printing Press": "La imprenta",
    "The Roman Aqueducts": "Los acueductos romanos",
    "The Science of Sleep": "La ciencia del sueño",
    "The Spirit Bear": "El oso espíritu",
    "The history of paper money": "La historia del papel moneda",
    "Urban Beekeeping": "Apicultura urbana",
    "Volcanoes": "Volcanes",
}

TOEFL_TOPIC_ES = {
    "Arranging an accessible event seat": "Reserva de un asiento accesible para un evento",
    "Art studio access": "Acceso al estudio de arte",
    "Atmospheric Rivers": "Ríos atmosféricos",
    "Biological Nitrogen Fixation": "Fijación biológica del nitrógeno",
    "Bookstore pickup change": "Cambio en la recogida de la librería",
    "Borrowing a recording kit": "Préstamo de un kit de grabación",
    "Borrowing field research equipment": "Préstamo de equipo para trabajo de campo",
    "Café renovation and service point": "Renovación de la cafetería y punto de atención",
    "Changing a meal-plan selection": "Cambio de plan de alimentación",
    "Changing a workshop session": "Cambio de sesión de un taller",
    "Chemistry tutoring location": "Ubicación de las tutorías de química",
    "Coastal Upwelling": "Surgencia costera",
    "Comparing housing options": "Comparación de opciones de alojamiento",
    "Coral and Algae Partnerships": "Asociaciones entre corales y algas",
    "Correcting a name on a certificate": "Corrección de un nombre en un certificado",
    "Correcting a payroll record": "Corrección de un registro de nómina",
    "Correcting a student identification card": "Corrección de una tarjeta de identificación estudiantil",
    "Elevator inspection schedule": "Horario de inspección del ascensor",
    "Evidence for Seafloor Spreading": "Evidencias de la expansión del fondo oceánico",
    "Exploring an environmental science major": "Exploración de la carrera de ciencias ambientales",
    "Film screening relocation": "Cambio de lugar de una proyección de cine",
    "Finding Exoplanets by Transit": "Detección de exoplanetas por tránsito",
    "Garden volunteer morning": "Jornada matutina de voluntariado en el jardín",
    "History archive orientation": "Orientación del archivo histórico",
    "How Bats Use Echolocation": "Cómo utilizan los murciélagos la ecolocalización",
    "How Mangrove Forests Shape Coasts": "Cómo los manglares modelan las costas",
    "How Migrating Birds Navigate": "Cómo se orientan las aves migratorias",
    "Indoor track closure": "Cierre de la pista cubierta",
    "Joining a community orchestra": "Inscripción en una orquesta comunitaria",
    "Joining a research project": "Participación en un proyecto de investigación",
    "Language exchange registration": "Inscripción en un intercambio de idiomas",
    "Measuring Glacier Mass Balance": "Medición del balance de masa de los glaciares",
    "Moving a presentation to a larger room": "Traslado de una presentación a un salón más grande",
    "Museum photography policy": "Política de fotografía del museo",
    "Observing Phytoplankton from Space": "Observación del fitoplancton desde el espacio",
    "Outdoor film weather plan": "Plan meteorológico para una película al aire libre",
    "Plant Transpiration": "Transpiración vegetal",
    "Pool maintenance notice": "Aviso de mantenimiento de la piscina",
    "Public lecture overflow room": "Sala adicional para una conferencia pública",
    "Radiocarbon Dating and Context": "Datación por radiocarbono y contexto",
    "Reading Doppler Weather Radar": "Interpretación del radar meteorológico Doppler",
    "Recreation center locker renewal": "Renovación de un casillero del centro recreativo",
    "Replacing a damaged library book": "Reposición de un libro dañado de la biblioteca",
    "Requesting a course prerequisite review": "Solicitud de revisión de un prerrequisito",
    "Requesting a transcript for an application": "Solicitud de un certificado de notas para una postulación",
    "Rescheduling a laboratory orientation": "Reprogramación de una orientación de laboratorio",
    "Restoring access to a research database": "Restablecimiento del acceso a una base de datos de investigación",
    "Revising a research essay": "Revisión de un ensayo de investigación",
    "Science building entrance closure": "Cierre de la entrada del edificio de ciencias",
    "Seasonal Lake Turnover": "Circulación estacional de los lagos",
    "Sleep and Memory Consolidation": "Sueño y consolidación de la memoria",
    "Temporary dining hall schedule": "Horario temporal del comedor",
    "Theater ticket pickup": "Recogida de entradas del teatro",
    "Tree Rings as Climate Proxies": "Los anillos de los árboles como indicadores climáticos",
    "Using the campus bicycle program": "Uso del programa de bicicletas del campus",
    "Volcanic Ash and Aviation": "Ceniza volcánica y aviación",
    "Weekend parking restriction": "Restricción de estacionamiento durante el fin de semana",
    "Why Auroras Glow": "Por qué brillan las auroras",
    "Why Cities Form Heat Islands": "Por qué las ciudades forman islas de calor",
}

FCE_TITLE_ES = {
    "Listening - Part 1: Multiple Choice (short extracts)": "Comprensión auditiva - Parte 1: Opción múltiple (fragmentos cortos)",
    "Listening - Part 2: Sentence Completion": "Comprensión auditiva - Parte 2: Completar oraciones",
    "Listening - Part 3: Multiple Matching": "Comprensión auditiva - Parte 3: Emparejamiento múltiple",
    "Listening - Part 4: Multiple Choice (long extract)": "Comprensión auditiva - Parte 4: Opción múltiple (fragmento largo)",
}

TOEFL_GROUP_ES = {
    "Listening Module 1 - Choose a Response": "Comprensión auditiva - Módulo 1 - Elegir una respuesta",
    "Listening Module 1 - Extended Audio": "Comprensión auditiva - Módulo 1 - Audios extensos",
    "Listening Module 2 - Choose a Response": "Comprensión auditiva - Módulo 2 - Elegir una respuesta",
    "Listening Module 2 - Extended Audio": "Comprensión auditiva - Módulo 2 - Audios extensos",
    "Speaking - Listen and Repeat": "Expresión oral - Escuchar y repetir",
    "Speaking - Take an Interview": "Expresión oral - Entrevista",
}


def display_title(exam_key: str, value: str) -> str:
    title = clean(value)
    if exam_key == "ielts":
        match = re.fullmatch(r"Listening - Section (\d+): (.+)", title)
        if not match or match.group(2) not in IELTS_TOPIC_ES:
            raise ValueError(f"Missing IELTS title translation: {title}")
        return f"Comprensión auditiva - Sección {match.group(1)}: {IELTS_TOPIC_ES[match.group(2)]}"
    if exam_key == "fce":
        if title not in FCE_TITLE_ES:
            raise ValueError(f"Missing FCE title translation: {title}")
        return FCE_TITLE_ES[title]
    if exam_key == "toefl":
        match = re.fullmatch(r"Choose a Response (\d+)", title)
        if match:
            return f"Elegir una respuesta {match.group(1)}"
        match = re.fullmatch(r"Repeat (\d+)", title)
        if match:
            return f"Repetición {match.group(1)}"
        match = re.fullmatch(r"Interview (\d+)", title)
        if match:
            return f"Entrevista {match.group(1)}"
        generic = {
            "Listening - Listen to a Conversation": "Comprensión auditiva - Conversación",
            "Listening - Listen to an Academic Talk": "Comprensión auditiva - Charla académica",
            "Listening - Listen to an Announcement": "Comprensión auditiva - Anuncio",
        }
        if title in generic:
            return generic[title]
        if title not in TOEFL_TOPIC_ES:
            raise ValueError(f"Missing TOEFL title translation: {title}")
        return TOEFL_TOPIC_ES[title]
    return title


def display_group(exam_key: str, value: str) -> str:
    group = clean(value)
    if exam_key == "toefl":
        if group not in TOEFL_GROUP_ES:
            raise ValueError(f"Missing TOEFL group translation: {group}")
        return TOEFL_GROUP_ES[group]
    return group


def localize_transcript(exam_key: str, value: str) -> str:
    text = clean(value)
    if exam_key != "goethe":
        return text
    replacements = {
        "Instrucción:": "Anweisung:",
        "Cierre:": "Abschluss:",
        "Ejemplo": "Beispiel",
        "Male:": "Mann:",
        "Female:": "Frau:",
        "Announcer:": "Sprecher:",
        "Staff Member:": "Mitarbeiter:",
    }
    for source, target in replacements.items():
        text = text.replace(source, target)
    return text


def german_voice_label(value: str) -> str:
    return {
        "male": "Mann",
        "female": "Frau",
        "announcer": "Sprecher",
        "staff member": "Mitarbeiter",
    }.get(clean(value).lower(), clean(value).title())


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


def clean(value: object) -> str:
    text = str(value or "")
    for old, new in {
        "\u2010": "-", "\u2011": "-", "\u2012": "-", "\u2013": "-", "\u2014": "-",
        "\u2212": "-", "\u2022": "-", "\u00a0": " ",
    }.items():
        text = text.replace(old, new)
    return text.strip()


styles = getSampleStyleSheet()
styles.add(ParagraphStyle("WLHero", fontName="WL-Bold", fontSize=22, leading=26, textColor=NAVY, alignment=TA_LEFT, spaceAfter=4))
styles.add(ParagraphStyle("WLHeroExam", fontName="WL-Regular", fontSize=11.5, leading=15, textColor=MUTED, alignment=TA_LEFT, spaceAfter=4))
styles.add(ParagraphStyle("WLKicker", fontName="WL-Bold", fontSize=7.4, leading=9.5, textColor=RED, spaceAfter=5, uppercase=True))
styles.add(ParagraphStyle("WLSection", fontName="WL-Bold", fontSize=12.5, leading=16, textColor=NAVY, spaceBefore=0, spaceAfter=0, keepWithNext=True))
styles.add(ParagraphStyle("WLAudio", fontName="WL-Bold", fontSize=11.2, leading=14.5, textColor=INK, spaceBefore=0, spaceAfter=0, keepWithNext=True))
styles.add(ParagraphStyle("WLEntryNumber", fontName="WL-Bold", fontSize=8, leading=14.5, textColor=RED, alignment=TA_LEFT))
styles.add(ParagraphStyle("WLSubhead", fontName="WL-Bold", fontSize=9.2, leading=12, textColor=NAVY, spaceBefore=7, spaceAfter=4, keepWithNext=True))
styles.add(ParagraphStyle("WLMeta", fontName="WL-Regular", fontSize=8.3, leading=11.5, textColor=MUTED, spaceAfter=7))
styles.add(ParagraphStyle("WLBody", fontName="WL-Regular", fontSize=10, leading=15.5, textColor=INK, spaceAfter=10))
styles.add(ParagraphStyle("WLSpeaker", fontName="WL-Regular", fontSize=9.8, leading=14.7, textColor=INK))
styles.add(ParagraphStyle("WLNote", fontName="WL-Regular", fontSize=9, leading=13.5, textColor=INK, borderColor=LINE, borderWidth=0.5, borderPadding=8, backColor=SOFT_BLUE, spaceAfter=10))
styles.add(ParagraphStyle("WLSmall", fontName="WL-Regular", fontSize=6.7, leading=8.3, textColor=MUTED))
styles.add(ParagraphStyle("WLSmallNumber", fontName="WL-Bold", fontSize=6.7, leading=8.3, textColor=RED, alignment=TA_RIGHT))
styles.add(ParagraphStyle("WLStatNumber", fontName="WL-Bold", fontSize=15.5, leading=17, textColor=NAVY, alignment=TA_CENTER))
styles.add(ParagraphStyle("WLStatLabel", fontName="WL-Bold", fontSize=6.3, leading=7.5, textColor=MUTED, alignment=TA_CENTER))
styles.add(ParagraphStyle("WLBadge", fontName="WL-Bold", fontSize=6.7, leading=8, textColor=ROYAL, alignment=TA_RIGHT))


def para(text: object, style: str = "WLBody") -> Paragraph:
    return Paragraph(escape(clean(text)).replace("\n", "<br/>"), styles[style])


def section_heading(text: str) -> Table:
    table = Table([[Paragraph(escape(clean(text)), styles["WLSection"])]], colWidths=[160 * mm])
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7), ("LINEBELOW", (0, 0), (-1, -1), 0.6, LINE),
    ]))
    table.keepWithNext = True
    return table


def speaker_turn(label: str, body: str) -> list:
    content = Paragraph(f"<b>{escape(clean(label).title())}:</b> {escape(clean(body)).replace(chr(10), '<br/>')}", styles["WLSpeaker"])
    card = Table([[content]], colWidths=[160 * mm], hAlign="LEFT")
    card.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), SOFT_BLUE),
        ("LINEBEFORE", (0, 0), (0, -1), 1.3, RED),
        ("LEFTPADDING", (0, 0), (-1, -1), 10), ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return [card, Spacer(1, 2.4 * mm)]


def transcript_flowables(text: str, exam_key: str) -> list:
    text = localize_transcript(exam_key, text)
    text = re.sub(r"Nummer (\d+)\s*-\s*item-\d+\.mp3", r"Nummer \1", text)
    # Recover natural dialogue turns even when source extraction flattened them.
    speaker_label = r"(?:[A-ZÄÖÜ][A-Za-zÄÖÜäöüß'-]*(?: [A-ZÄÖÜ][A-Za-zÄÖÜäöüß'-]*){0,2}|Speaker [1-9])"
    text = re.sub(r"(?<!^)\s+(?=(?:Ejemplo|Beispiel|Nummer \d+)\b)", "\n\n", text)
    text = re.sub(rf"((?:Ejemplo|Beispiel|Nummer \d+))\s+(?={speaker_label}:)", r"\1\n\n", text)
    text = re.sub(rf"(?<!^)\s+(?={speaker_label}:)", "\n\n", text)
    blocks = [block.strip() for block in re.split(r"\n\s*\n", text) if block.strip()]
    if len(blocks) == 1 and len(blocks[0]) > 700 and not re.match(rf"^{speaker_label}:\s*", blocks[0]):
        sentences = re.split(r"(?<=[.!?])\s+(?=[A-Z\"'])", blocks[0])
        blocks, current = [], ""
        for sentence in sentences:
            candidate = f"{current} {sentence}".strip()
            if current and len(candidate) > 520:
                blocks.append(current)
                current = sentence
            else:
                current = candidate
        if current:
            blocks.append(current)
    result = []
    for block in blocks:
        match = re.match(r"^([A-ZÄÖÜ][A-Za-zÄÖÜäöüß /'-]{1,28}):\s*(.*)$", block, re.S)
        if match:
            result.extend(speaker_turn(match.group(1), match.group(2)))
        elif re.fullmatch(r"(?:Ejemplo|Beispiel|Nummer \d+)", block):
            result.append(Paragraph(escape(block), styles["WLSubhead"]))
        elif re.match(r"^(?:Instrucción|Cierre|Anweisung|Abschluss):", block):
            result.append(Paragraph(escape(block), styles["WLNote"]))
        else:
            result.append(para(block))
    return result


def draw_capsule(canvas, x1: float, y1: float, x2: float, y2: float, width: float, color) -> None:
    canvas.setStrokeColor(color)
    canvas.setLineWidth(width)
    canvas.setLineCap(1)
    canvas.line(x1, y1, x2, y2)


def page_branding(canvas, doc, label: str, exam_key: str) -> None:
    canvas.saveState()
    width, height = A4

    if WORDMARK.exists():
        canvas.drawImage(
            str(WORDMARK), 25 * mm, height - 21.5 * mm,
            width=27 * mm, height=10.9 * mm, preserveAspectRatio=True, anchor="c", mask="auto",
        )
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
    footer = "Originalmaterial von Idiomas WeLearn" if exam_key == "goethe" else "Material original propiedad de Idiomas WeLearn"
    canvas.drawString(25 * mm, 10.2 * mm, footer)
    canvas.drawCentredString(width / 2, 10.2 * mm, "www.idiomaswl.com")
    canvas.setFont("WL-Bold", 7.1)
    canvas.setFillColor(RED)
    canvas.drawRightString(width - 25 * mm, 10.2 * mm, f"{doc.page}")
    canvas.restoreState()


def compact_header(story: list, exam_label: str, set_label: str, exam_key: str) -> None:
    is_german = exam_key == "goethe"
    story.append(Paragraph("WELEARN · TRANSKRIPTION" if is_german else "WELEARN · TRANSCRIPCIÓN", styles["WLKicker"]))
    story.append(Paragraph("Audio-Transkription" if is_german else "Transcripción de audio", styles["WLHero"]))
    story.append(Paragraph(f"{escape(exam_label)} &nbsp;·&nbsp; {escape(set_label)}", styles["WLHeroExam"]))
    story.append(Table([["", ""]], colWidths=[18 * mm, 142 * mm], rowHeights=[0.7 * mm], style=TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), RED),
        ("BACKGROUND", (1, 0), (1, 0), LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ])))
    story.append(Spacer(1, 8 * mm))


def audio_inventory(story: list, data: dict) -> None:
    files = data.get("activeAudioFiles", [])
    story.append(section_heading("Archivos vinculados"))
    story.append(Paragraph("Inventario de control. Los nombres se conservan exactamente para facilitar la carga y la verificación.", styles["WLMeta"]))
    half = math.ceil(len(files) / 2)
    left, right = files[:half], files[half:]
    rows = []
    for index in range(half):
        right_exists = index < len(right)
        rows.append([
            Paragraph(str(index + 1), styles["WLSmallNumber"]), Paragraph(escape(clean(left[index])), styles["WLSmall"]),
            Paragraph(str(half + index + 1) if right_exists else "", styles["WLSmallNumber"]),
            Paragraph(escape(clean(right[index])) if right_exists else "", styles["WLSmall"]),
        ])
    table = Table(rows, colWidths=[7 * mm, 75.5 * mm, 7 * mm, 75.5 * mm], hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.white), ("BOX", (0, 0), (-1, -1), 0.55, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.25, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [colors.white, PALE_BLUE]),
        ("LEFTPADDING", (0, 0), (-1, -1), 3), ("RIGHTPADDING", (0, 0), (-1, -1), 3),
        ("TOPPADDING", (0, 0), (-1, -1), 2.2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2.2),
    ]))
    story.extend([table, Spacer(1, 2 * mm), section_heading("Transcripción")])


def source_badge(source_type: str) -> str:
    return {"production-script": "Guion de producción", "editorial-script": "Guion editorial", "local-asr": "Transcripción local del audio"}.get(source_type, "Transcripción")


def entry_header(number: int, title: str, source: str = "") -> Table:
    table = Table([[
        Paragraph(f"{number:02d}", styles["WLEntryNumber"]),
        Paragraph(escape(clean(title)), styles["WLAudio"]),
    ]], colWidths=[10 * mm, 150 * mm])
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "BOTTOM"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    table.keepWithNext = True
    return table


def standard_entries(story: list, entries: list[dict], exam_key: str) -> None:
    current_group = None
    for index, entry in enumerate(entries, 1):
        group = entry.get("group")
        group_changed = bool(group and group != current_group)
        if index > 1 and (exam_key in {"ielts", "goethe", "fce"} or group_changed):
            story.append(PageBreak())
        elif index > 1:
            story.append(CondPageBreak(38 * mm))
        if group and group != current_group:
            current_group = group
            story.extend([section_heading(display_group(exam_key, group)), Spacer(1, 7 * mm)])
        story.append(entry_header(index, display_title(exam_key, entry["title"])))
        story.extend(transcript_flowables(entry.get("transcript", ""), exam_key))
        story.append(Spacer(1, 3 * mm))


def goethe_entries(story: list, entries: list[dict]) -> None:
    running_number = 1
    for part in entries:
        story.append(section_heading(part["title"]))
        item_files = part.get("audioFiles", [])
        story.append(Paragraph(f"<b>Audio des Teils:</b> {escape(clean(item_files[0]))} &nbsp;&nbsp; <b>Wiedergaben:</b> {part.get('plays', 1)}", styles["WLMeta"]))
        story.append(Paragraph(f"<b>Anweisung:</b> {escape(clean(part.get('intro', '')))}", styles["WLNote"]))
        if part.get("example"):
            story.append(entry_header(running_number, "Beispiel", "Redaktionelles Skript"))
            running_number += 1
            for turn in part["example"]:
                story.append(Paragraph(f"<b>{escape(german_voice_label(turn.get('voice', '')))}:</b> {escape(clean(turn.get('text', '')))}", styles["WLSpeaker"]))
        for item in part.get("items", []):
            item_file = f"item-{int(item['number']):02d}.mp3"
            story.append(entry_header(running_number, f"Nummer {item['number']}", "Redaktionelles Skript"))
            running_number += 1
            story.append(Paragraph(f"<b>Audio:</b> {escape(item_file)}", styles["WLMeta"]))
            for turn in item.get("turns", []):
                story.append(Paragraph(f"<b>{escape(german_voice_label(turn.get('voice', '')))}:</b> {escape(clean(turn.get('text', '')))}", styles["WLSpeaker"]))
        if part.get("outro"):
            story.append(Paragraph(f"<b>Abschluss:</b> {escape(clean(part['outro']))}", styles["WLNote"]))
        story.append(Spacer(1, 3 * mm))


def build_pdf(exam_key: str, data: dict) -> tuple[Path, int, int]:
    labels = {
        "ielts": ("IELTS Academic", f"Set {data['setNumber']}", "ielts"),
        "goethe": ("Goethe-Zertifikat A1", f"Testsatz {data['setNumber']}", "goethe-a1"),
        "fce": ("Cambridge B2 First (FCE)", f"Set {data['setNumber']}", "fce"),
        "toefl": ("TOEFL iBT 2026", f"Set {data['setNumber']}", "toefl"),
    }
    exam_label, set_label, slug = labels[exam_key]
    folder = OUT / slug
    folder.mkdir(parents=True, exist_ok=True)
    target = folder / f"{slug}-set-{int(data['setNumber']):02d}-transcripciones.pdf"
    page_label = f"{exam_label} - {set_label}"
    document_title = f"{exam_label} {set_label} - {'Audio-Transkription' if exam_key == 'goethe' else 'Transcripciones de audio'}"
    document_subject = "Audio-Transkriptionen für die Prüfungsvorbereitung" if exam_key == "goethe" else "Transcripciones de audio para práctica de examen"
    doc = SimpleDocTemplate(str(target), pagesize=A4, rightMargin=25 * mm, leftMargin=25 * mm, topMargin=36 * mm, bottomMargin=23 * mm, title=document_title, author="Idiomas WeLearn", subject=document_subject)
    story = []
    transcript_units = data.get("transcriptUnits") or (
        sum(len(entry.get("items", [])) for entry in data.get("entries", []))
        if exam_key == "goethe" and data.get("entries") and data["entries"][0].get("items")
        else len(data.get("entries", []))
    )
    compact_header(story, exam_label, set_label, exam_key)
    if exam_key == "goethe" and data.get("entries") and data["entries"][0].get("items"):
        goethe_entries(story, data["entries"])
    else:
        standard_entries(story, data["entries"], exam_key)
    doc.build(story, onFirstPage=lambda canvas, d: page_branding(canvas, d, page_label, exam_key), onLaterPages=lambda canvas, d: page_branding(canvas, d, page_label, exam_key))
    reader = PdfReader(str(target))
    if len(reader.pages) < 1:
        raise RuntimeError(f"Empty PDF: {target}")
    return target, len(reader.pages), transcript_units


def main() -> None:
    payload = json.loads(SOURCE.read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)
    rows = []
    for exam_key in ("ielts", "goethe", "fce", "toefl"):
        for data in payload["exams"][exam_key]:
            target, pages, transcript_units = build_pdf(exam_key, data)
            rows.append({
                "exam": exam_key, "set": data["setNumber"], "pdf": str(target.relative_to(ROOT)), "pages": pages,
                "audio_files": len(data.get("activeAudioFiles", [])), "transcript_blocks": transcript_units,
                "asr_blocks": sum(1 for entry in data.get("entries", []) if entry.get("sourceType") == "local-asr"),
            })
    if len(rows) != 57:
        raise RuntimeError(f"Expected 57 PDFs, generated {len(rows)}")
    manifest_path = OUT / "manifest.csv"
    with manifest_path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)
    summary = {
        "pdfs": len(rows), "pages": sum(row["pages"] for row in rows), "audioFiles": sum(row["audio_files"] for row in rows),
        "transcriptBlocks": sum(row["transcript_blocks"] for row in rows), "asrBlocks": sum(row["asr_blocks"] for row in rows),
        "manifest": str(manifest_path),
    }
    (OUT / "manifest.json").write_text(json.dumps({"summary": summary, "files": rows}, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
