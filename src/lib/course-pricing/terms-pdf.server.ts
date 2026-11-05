import 'server-only';

import { WELEARN_BRAND, WELEARN_LOGO_BLUE, WELEARN_LOGO_RED } from '@/lib/welearn-pdf-standards';
import { COURSE_TERMS, TERMS_VERSION } from './terms';

export type CourseTermsSection = { title: string; text: string };
export type CourseTermsSnapshot = { version: string; sections: CourseTermsSection[] };

const VERSION_PATTERN = /^course-\d{8}-v\d+$/;

function safeVersion(value: unknown): string {
  return typeof value === 'string' && VERSION_PATTERN.test(value) ? value : TERMS_VERSION;
}

function validSections(value: unknown): CourseTermsSection[] | null {
  if (!Array.isArray(value) || value.length < 1 || value.length > 30) return null;
  const sections = value.map(section => {
    if (!section || typeof section !== 'object') return null;
    const candidate = section as Record<string, unknown>;
    if (typeof candidate.title !== 'string' || candidate.title.length > 120) return null;
    if (typeof candidate.text !== 'string' || candidate.text.length > 8000) return null;
    return { title: candidate.title, text: candidate.text };
  });
  return sections.every((section): section is CourseTermsSection => section !== null) ? sections : null;
}

export function resolveCourseTermsSnapshot(value: unknown): CourseTermsSnapshot {
  let candidate = value;
  if (typeof candidate === 'string' && candidate.length <= 100_000) {
    try { candidate = JSON.parse(candidate); } catch { candidate = null; }
  }
  if (candidate && typeof candidate === 'object') {
    const record = candidate as Record<string, unknown>;
    const sections = validSections(record.sections);
    if (sections) return { version: safeVersion(record.version), sections };
  }
  return {
    version: TERMS_VERSION,
    sections: COURSE_TERMS.map(section => ({ title: section.title, text: section.text })),
  };
}

export function courseTermsPdfFilename(version: string): string {
  return `reglamento-welearn-${safeVersion(version)}.pdf`;
}

export async function generateCourseTermsPdf(snapshot = resolveCourseTermsSnapshot(null), signature?: { name: string; email: string; acceptedAt: string; sha256: string }) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  const bodyBottom = pageHeight - 19;
  const ink: [number, number, number] = [37, 49, 77];
  const muted: [number, number, number] = [88, 101, 128];
  let y = 47;

  doc.setProperties({
    title: `Reglamento de clases ${snapshot.version}`,
    subject: 'Condiciones de inscripción y prestación de clases de idiomas',
    author: WELEARN_BRAND.name,
    creator: 'Idiomas WeLearn',
  });

  function ensure(space: number) {
    if (y + space > bodyBottom) {
      doc.addPage();
      y = 41;
    }
  }

  function addParagraph(text: string, size = 9.6) {
    doc.setFont('helvetica', 'normal').setFontSize(size).setTextColor(...ink);
    const lines = doc.splitTextToSize(text, contentWidth) as string[];
    for (const line of lines) {
      ensure(5.1);
      doc.text(line, margin, y);
      y += 5.1;
    }
    y += 2.2;
  }

  // Primera página: el aviso aparece antes de las condiciones.
  doc.setFillColor(...WELEARN_LOGO_BLUE).rect(0, 0, pageWidth, 15, 'F');
  doc.setFillColor(...WELEARN_LOGO_RED).rect(0, 0, 3, 15, 'F');
  doc.setFont('helvetica', 'bold').setFontSize(13).setTextColor(255, 255, 255);
  doc.text('WELEARN', margin, 9.5);
  doc.setFont('helvetica', 'normal').setFontSize(7.5).setTextColor(235, 240, 255);
  doc.text('APRENDER UN IDIOMA, EN SERIO.', pageWidth - margin, 9.3, { align: 'right' });

  doc.setFont('helvetica', 'bold').setFontSize(21).setTextColor(20, 33, 92);
  doc.text('Reglamento de clases', margin, 28);
  doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(...muted);
  doc.text('Condiciones de inscripción y prestación del curso', margin, 35);
  doc.setFont('helvetica', 'bold').setFontSize(7.5).setTextColor(...WELEARN_LOGO_RED);
  doc.text(`VERSIÓN ${snapshot.version}`, pageWidth - margin, 35, { align: 'right' });

  const noticeY = 42;
  const noticeHeight = 23;
  doc.setFillColor(255, 244, 245).setDrawColor(255, 196, 202).roundedRect(margin, noticeY, contentWidth, noticeHeight, 2, 2, 'FD');
  doc.setFillColor(...WELEARN_LOGO_RED).rect(margin, noticeY, 1.7, noticeHeight, 'F');
  doc.setFont('helvetica', 'bold').setFontSize(8.3).setTextColor(157, 20, 34);
  doc.text('LEE ESTAS CONDICIONES ANTES DE PAGAR', margin + 5, noticeY + 6.4);
  doc.setFont('helvetica', 'normal').setFontSize(8.4).setTextColor(...ink);
  const notice = doc.splitTextToSize(
    'El formulario registra la versión, la fecha y la firma de quien acepta. Conserva este PDF junto con la constancia de inscripción.',
    contentWidth - 10,
  ) as string[];
  doc.text(notice, margin + 5, noticeY + 12.2);
  y = noticeY + noticeHeight + 7;

  snapshot.sections.forEach((section, index) => {
    const headingLines = doc.splitTextToSize(section.title, contentWidth) as string[];
    ensure(headingLines.length * 6 + 8);
    doc.setFont('helvetica', 'bold').setFontSize(11.2).setTextColor(20, 33, 92);
    for (const line of headingLines) {
      doc.text(line, margin, y);
      y += 5.8;
    }
    doc.setDrawColor(...WELEARN_LOGO_RED).setLineWidth(0.6).line(margin, y - 1.8, margin + 14, y - 1.8);
    y += 2.5;
    addParagraph(section.text);
    if (index < snapshot.sections.length - 1) y += 1.5;
  });

  if (signature) {
    doc.addPage();
    doc.setFont('helvetica', 'bold').setFontSize(19).setTextColor(20, 33, 92);
    doc.text('Constancia de aceptación', margin, 35);
    doc.setFont('helvetica', 'normal').setFontSize(10).setTextColor(...ink);
    doc.text('Este documento fue aceptado mediante firma electrónica de nombre completo.', margin, 49);
    const rows = [
      `Firmante: ${signature.name}`,
      `Correo de inscripción: ${signature.email}`,
      `Fecha y hora UTC: ${signature.acceptedAt}`,
      `Versión del reglamento: ${snapshot.version}`,
      `Huella SHA-256 del texto aceptado: ${signature.sha256}`,
    ];
    rows.forEach((row, index) => {
      const lines = doc.splitTextToSize(row, contentWidth) as string[];
      doc.text(lines, margin, 66 + index * 17);
    });
    doc.setDrawColor(...WELEARN_LOGO_BLUE).line(margin, 171, pageWidth - margin, 171);
    doc.setFont('helvetica', 'bold').setFontSize(15).setTextColor(20, 33, 92);
    doc.text(signature.name, margin, 183);
    doc.setFont('helvetica', 'normal').setFontSize(8.5).setTextColor(...muted);
    doc.text('Firma electrónica consignada en el formulario de inscripción', margin, 191);
  }

  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    if (page > 1) {
      doc.setFillColor(...WELEARN_LOGO_BLUE).rect(0, 0, pageWidth, 14, 'F');
      doc.setFillColor(...WELEARN_LOGO_RED).rect(0, 0, 3, 14, 'F');
      doc.setFont('helvetica', 'bold').setFontSize(9.5).setTextColor(255, 255, 255);
      doc.text('WELEARN · REGLAMENTO DE CLASES', margin, 9);
      doc.setFont('helvetica', 'normal').setFontSize(7.5).setTextColor(235, 240, 255);
      doc.text(snapshot.version, pageWidth - margin, 9, { align: 'right' });
    }
    doc.setDrawColor(220, 225, 235).setLineWidth(0.35).line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);
    doc.setFont('helvetica', 'normal').setFontSize(7.2).setTextColor(...muted);
    doc.text(`${WELEARN_BRAND.name} · ${WELEARN_BRAND.city} · ${snapshot.version}`, margin, pageHeight - 10.5);
    doc.text(`Página ${page} de ${pageCount}`, pageWidth - margin, pageHeight - 10.5, { align: 'right' });
  }

  return {
    filename: courseTermsPdfFilename(snapshot.version),
    bytes: new Uint8Array(doc.output('arraybuffer')),
  };
}
