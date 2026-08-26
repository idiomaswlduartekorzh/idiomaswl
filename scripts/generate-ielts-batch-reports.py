#!/usr/bin/env python3
import argparse
import json
from datetime import datetime
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle

from pdf_templates.welearn_branded import (
    BRAND_NAME,
    BRAND_OWNER,
    BRAND_URL,
    INK,
    LINE,
    MUTED,
    NAVY,
    PALE_BLUE,
    PALE_GREEN,
    PALE_RED,
    MARGIN_BOTTOM,
    MARGIN_LEFT,
    MARGIN_RIGHT,
    MARGIN_TOP,
    PAGE_SIZE,
    VERSION,
    brand_styles,
    draw_brand_corner_pattern,
)


def draw_batch_page(canvas, doc):
    width, height = PAGE_SIZE
    canvas.saveState()
    canvas.setFillColor(colors.white)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    draw_brand_corner_pattern(canvas)
    canvas.setFillColor(NAVY)
    canvas.setFont('Helvetica-Bold', 10)
    canvas.drawString(46 * mm, height - 20 * mm, BRAND_NAME)
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.6)
    canvas.line(MARGIN_LEFT, height - 27 * mm, width - MARGIN_RIGHT, height - 27 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont('Helvetica', 7.5)
    canvas.drawString(MARGIN_LEFT, 11 * mm, f'{BRAND_OWNER}  |  {VERSION}')
    canvas.drawRightString(width - MARGIN_RIGHT, 11 * mm, f'{BRAND_URL}  |  Page {doc.page}')
    canvas.restoreState()


class BatchDocTemplate(BaseDocTemplate):
    def __init__(self, filename, **kwargs):
        super().__init__(filename, pagesize=PAGE_SIZE, leftMargin=MARGIN_LEFT, rightMargin=MARGIN_RIGHT, topMargin=MARGIN_TOP, bottomMargin=MARGIN_BOTTOM, **kwargs)
        frame = Frame(MARGIN_LEFT, MARGIN_BOTTOM, PAGE_SIZE[0] - MARGIN_LEFT - MARGIN_RIGHT, PAGE_SIZE[1] - MARGIN_TOP - MARGIN_BOTTOM, id='content')
        self.addPageTemplates([PageTemplate(id='batch', frames=[frame], onPage=draw_batch_page)])


def date_co(value):
    if not value:
        return '-'
    parsed = datetime.fromisoformat(value.replace('Z', '+00:00'))
    return parsed.strftime('%Y-%m-%d %H:%M')


def p(value, style):
    return Paragraph(escape(str(value)), style)


def build_report(batch, label, output_path, generated_at):
    styles = brand_styles()
    small = ParagraphStyle('BatchSmall', parent=styles['small'], fontSize=7, leading=9, textColor=INK)
    cell = ParagraphStyle('BatchCell', parent=small, fontSize=6.3, leading=7.7)
    cell_center = ParagraphStyle('BatchCellCenter', parent=cell, alignment=TA_CENTER)
    header = ParagraphStyle('BatchHeader', parent=cell_center, fontName='Helvetica-Bold', textColor=colors.white, leading=8)
    metric_label = ParagraphStyle('MetricLabel', parent=styles['label'], alignment=TA_CENTER, textColor=MUTED)
    metric_value = ParagraphStyle('MetricValue', parent=styles['h1'], alignment=TA_CENTER, fontSize=16, leading=18, spaceBefore=0, spaceAfter=0)
    warning = ParagraphStyle('Warning', parent=styles['body'], textColor=colors.HexColor('#8b1e1e'), fontSize=9, leading=13)
    method_style = ParagraphStyle('Method', parent=styles['small'], fontSize=7, leading=9, textColor=MUTED)

    summary = batch['summary']
    attempts = batch['attempts']
    doc = BatchDocTemplate(str(output_path), title=f'Reporte IELTS - {label}')
    story = [
        Paragraph(f'Reporte IELTS - {escape(label)}', styles['title']),
        Paragraph(
            f'Auditoria privada de entregas, textos, clave objetiva y evidencia de audio. Generado: {escape(date_co(generated_at))} UTC.',
            styles['subtitle'],
        ),
        Paragraph('Resumen ejecutivo', styles['h1']),
    ]

    metrics = [
        ('Entregas', summary['total']),
        ('Enviadas', summary['submitted']),
        ('Clave verificada', f"{summary['objectiveMatches']}/{summary['objectiveRecalculated']}"),
        ('Con textos', summary['withWriting']),
        ('Audio verificado', summary['withVerifiedAudio']),
        ('Revisadas', summary['reviewed']),
    ]
    metric_cells = []
    for title, value in metrics:
        metric_cells.append([Paragraph(str(value), metric_value), Paragraph(title, metric_label)])
    metric_table = Table([metric_cells], colWidths=[29 * mm] * 6)
    metric_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), PALE_BLUE),
        ('BOX', (0, 0), (-1, -1), 0.7, LINE),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, LINE),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
    ]))
    story.extend([metric_table, Spacer(1, 5 * mm)])

    findings = [
        f"La clave canónica pudo recalcular {summary['objectiveRecalculated']} entregas: {summary['objectiveMatches']} coinciden y {summary['objectiveMismatches']} presentan diferencia.",
        f"Se encontraron textos en {summary['withWriting']} de {summary['total']} entregas.",
        f"{summary['withVerifiedAudio']} entregas tienen todos sus audios esperados verificados por ruta y tamaño.",
        f"{summary['reviewed']} entregas cuentan con revisión docente final; las demás permanecen en la cola administrativa.",
    ]
    legacy = summary['total'] - summary['objectiveRecalculated']
    if legacy:
        findings.append(f"{legacy} registros anteriores no incluyen el snapshot objetivo necesario para recalcular; se conservan como evidencia histórica y no se inventa una segunda nota.")

    alerts = [row for row in attempts if row['status'] == 'uploading' or row['audio']['issues']]
    if alerts:
        alert_lines = []
        for row in alerts:
            alert_lines.append(
                f"<b>{escape(row['studentName'])}</b> ({escape(row['studentEmail'])}): estado {escape(str(row['status']))}; audio {row['audio']['verified']}/{row['audio']['expected']}."
            )
        warning_box = Table([[Paragraph('<b>Atencion requerida</b><br/>' + '<br/>'.join(alert_lines) + '<br/>No se marca como enviada hasta recibir archivos completos.', warning)]], colWidths=[174 * mm])
        warning_box.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), PALE_RED),
            ('BOX', (0, 0), (-1, -1), 0.8, colors.HexColor('#d88a8a')),
            ('LEFTPADDING', (0, 0), (-1, -1), 10),
            ('RIGHTPADDING', (0, 0), (-1, -1), 10),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ]))
        story.extend([warning_box, Spacer(1, 4 * mm)])

    story.append(Paragraph('Hallazgos', styles['h2']))
    for finding in findings:
        story.append(Paragraph(f'- {escape(finding)}', styles['body']))
    story.extend([Spacer(1, 3 * mm), Paragraph('Detalle por estudiante', styles['h1'])])

    rows = [[
        Paragraph('Estudiante', header), Paragraph('Correo', header), Paragraph('Fecha UTC', header),
        Paragraph('Set', header), Paragraph('Estado', header), Paragraph('L / R', header),
        Paragraph('Writing', header), Paragraph('Audio', header),
    ]]
    problem_rows = []
    legacy_rows = []
    for index, row in enumerate(attempts, start=1):
        recalculated = row['recalculated']
        if recalculated:
            objective = (
                f"L {recalculated['listeningCorrect']}/{recalculated['listeningTotal']} - Band {recalculated['listeningBand']}<br/>"
                f"R {recalculated['readingCorrect']}/{recalculated['readingTotal']} - Band {recalculated['readingBand']}"
            )
        else:
            objective = 'Registro legado<br/>sin snapshot'
            legacy_rows.append(index)
        writing = f"T1 {row['writing']['task1Words']} palabras<br/>T2 {row['writing']['task2Words']} palabras"
        audio = 'No aplica'
        if row['audio']['expected']:
            audio = f"{row['audio']['verified']}/{row['audio']['expected']} " + ('OK' if not row['audio']['issues'] else 'ALERTA')
        status = 'Enviada' if row['status'] == 'submitted' else 'Carga incompleta'
        if row['status'] != 'submitted' or row['audio']['issues']:
            problem_rows.append(index)
        rows.append([
            p(row['studentName'], cell), p(row['studentEmail'], cell), p(date_co(row['createdAt']), cell_center),
            p(row['mockId'] or '-', cell_center), p(status, cell_center), Paragraph(objective, cell_center),
            Paragraph(writing, cell_center), Paragraph(audio, cell_center),
        ])

    table = Table(
        rows,
        colWidths=[29 * mm, 38 * mm, 23 * mm, 13 * mm, 17 * mm, 20 * mm, 19 * mm, 15 * mm],
        repeatRows=1,
        hAlign='LEFT',
    )
    table_commands = [
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.35, LINE),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 3),
        ('RIGHTPADDING', (0, 0), (-1, -1), 3),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f8f9fc')]),
    ]
    for row_index in legacy_rows:
        table_commands.append(('BACKGROUND', (0, row_index), (-1, row_index), colors.HexColor('#f3f4f6')))
    for row_index in problem_rows:
        table_commands.append(('BACKGROUND', (0, row_index), (-1, row_index), PALE_RED))
        table_commands.append(('TEXTCOLOR', (0, row_index), (-1, row_index), colors.HexColor('#7f1d1d')))
    table.setStyle(TableStyle(table_commands))
    story.extend([table, Spacer(1, 1 * mm)])

    method_box = Table([[
        Paragraph(
            '<b>Metodo de control.</b> L/R se recalculan contra la clave canónica; los audios se verifican por ruta y tamaño. '
            'Los ensayos completos no se reproducen; solo se informa su conteo de palabras. '
            '<b>CONFIDENCIAL - Uso interno del equipo docente.</b>',
            method_style,
        )
    ]], colWidths=[174 * mm])
    method_box.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), PALE_GREEN),
        ('BOX', (0, 0), (-1, -1), 0.6, LINE),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(method_box)
    doc.build(story)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', required=True)
    parser.add_argument('--output-dir', required=True)
    args = parser.parse_args()
    source = json.loads(Path(args.input).read_text(encoding='utf-8'))
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    previous_total = source['previous']['summary']['total']
    new_total = source['new']['summary']['total']
    build_report(source['previous'], f'tanda anterior - {previous_total} entregas', output_dir / f'Reporte_IELTS_tanda_anterior_{previous_total}_entregas.pdf', source['generatedAt'])
    build_report(source['new'], f'tanda nueva - {new_total} entregas', output_dir / f'Reporte_IELTS_tanda_nueva_{new_total}_entregas.pdf', source['generatedAt'])


if __name__ == '__main__':
    main()
