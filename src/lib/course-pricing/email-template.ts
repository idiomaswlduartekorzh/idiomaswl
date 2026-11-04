export type CourseWelcomeEmailInput = {
  studentName: string;
  courseLabel: string;
  orderReference: string;
  paymentItems: { label: string; value: string }[];
  totalPaid: string;
  accountHeading: string;
  accountMessage: string;
  accountHref: string;
  accountLabel: string;
  acceptanceVersion: string;
  acceptedAt: string;
  signerName: string;
  pdfVersion: string;
  pdfFilename: string;
  pdfMatchesAcceptance: boolean;
};

function escapeHtml(value: unknown) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]!);
}

export function buildCourseWelcomeEmail(input: CourseWelcomeEmailInput) {
  const paymentRows = input.paymentItems.map(item => `
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid #e7ebf3;color:#53617e;font-size:14px;">${escapeHtml(item.label)}</td>
      <td align="right" style="padding:9px 0;border-bottom:1px solid #e7ebf3;color:#192c64;font-size:14px;font-weight:700;white-space:nowrap;">${escapeHtml(item.value)}</td>
    </tr>`).join('');
  const pdfCopy = input.pdfMatchesAcceptance
    ? 'Este es el reglamento de la misma versión que aceptaste antes de pagar.'
    : `Adjuntamos el reglamento vigente, versión ${escapeHtml(input.pdfVersion)}. Tu orden conserva la aceptación de la versión ${escapeHtml(input.acceptanceVersion)}.`;

  return `<!doctype html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Tu inscripción en WeLearn</title></head>
<body style="margin:0;background:#f2f5fa;color:#24314f;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">Activa tu cuenta y guarda la copia PDF del reglamento asociada a tu inscripción.</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f2f5fa;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#ffffff;border:1px solid #e2e7f0;border-radius:14px;overflow:hidden;">
        <tr><td style="padding:22px 28px;background:#10215c;border-bottom:4px solid #e50613;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
            <td style="color:#ffffff;font-size:19px;font-weight:800;letter-spacing:.04em;">WELEARN</td>
            <td align="right" style="color:#dbe4ff;font-size:11px;letter-spacing:.1em;">INSCRIPCIÓN CONFIRMADA</td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:30px 28px 10px;">
          <p style="margin:0 0 9px;color:#e50613;font-size:11px;font-weight:800;letter-spacing:.12em;">BIENVENIDA</p>
          <h1 style="margin:0 0 12px;color:#14215c;font-size:26px;line-height:1.2;">¡Hola, ${escapeHtml(input.studentName)}!</h1>
          <p style="margin:0;color:#53617e;font-size:15px;line-height:1.65;">Tu pago quedó confirmado y tu inscripción a <strong style="color:#14215c;">${escapeHtml(input.courseLabel)}</strong> está registrada.</p>
        </td></tr>
        <tr><td style="padding:16px 28px 8px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#fff4f5;border:1px solid #ffc6cc;border-left:5px solid #e50613;border-radius:10px;">
            <tr><td style="padding:16px 17px;">
              <p style="margin:0 0 7px;color:#a20f20;font-size:12px;font-weight:900;letter-spacing:.06em;">${escapeHtml(input.accountHeading)}</p>
              <p style="margin:0;color:#3b4560;font-size:14px;line-height:1.55;">${escapeHtml(input.accountMessage)}</p>
              <p style="margin:14px 0 0;"><a href="${escapeHtml(input.accountHref)}" style="display:inline-block;padding:12px 17px;background:#10215c;border-radius:7px;color:#ffffff;font-size:14px;font-weight:800;text-decoration:none;">${escapeHtml(input.accountLabel)}</a></p>
              <p style="margin:10px 0 0;color:#6d7890;font-size:11px;line-height:1.5;">Si el botón no abre, copia este enlace en tu navegador:<br><span style="color:#10215c;word-break:break-all;">${escapeHtml(input.accountHref)}</span></p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:20px 28px 8px;">
          <h2 style="margin:0 0 9px;color:#14215c;font-size:17px;">Resumen de tu pago</h2>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid #e7ebf3;">${paymentRows}
            <tr><td style="padding:13px 0 5px;color:#14215c;font-size:14px;font-weight:800;">Total pagado</td><td align="right" style="padding:13px 0 5px;color:#14215c;font-size:17px;font-weight:900;white-space:nowrap;">${escapeHtml(input.totalPaid)}</td></tr>
          </table>
          <p style="margin:10px 0 0;color:#6d7890;font-size:12px;">Referencia de pago: <strong style="color:#3b4560;">${escapeHtml(input.orderReference)}</strong></p>
        </td></tr>
        <tr><td style="padding:18px 28px 8px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f2f5fa;border:1px solid #dfe5ef;border-radius:10px;">
            <tr><td style="padding:16px 17px;">
              <p style="margin:0 0 6px;color:#14215c;font-size:12px;font-weight:900;letter-spacing:.06em;">CONSTANCIA DE TU ACEPTACIÓN</p>
              <p style="margin:0;color:#3b4560;font-size:13px;line-height:1.6;">El formulario registró la versión <strong>${escapeHtml(input.acceptanceVersion)}</strong>, el ${escapeHtml(input.acceptedAt)} y la firma de <strong>${escapeHtml(input.signerName)}</strong>.</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:10px 28px 28px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:2px solid #e50613;border-radius:10px;">
            <tr><td style="padding:16px 17px;">
              <p style="margin:0 0 7px;color:#a20f20;font-size:12px;font-weight:900;letter-spacing:.08em;">GUARDA EL REGLAMENTO ADJUNTO</p>
              <p style="margin:0;color:#3b4560;font-size:14px;line-height:1.6;">${pdfCopy} El archivo <strong>${escapeHtml(input.pdfFilename)}</strong> va adjunto a este correo. Descárgalo y consérvalo con tu constancia de pago.</p>
              <p style="margin:11px 0 0;"><a href="https://www.idiomaswl.com/reglamento/archivo" style="color:#10215c;font-size:13px;font-weight:800;">Abrir o descargar el PDF del reglamento ↗</a></p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:18px 28px;background:#f8f9fc;border-top:1px solid #e7ebf3;color:#6d7890;font-size:12px;line-height:1.6;">
          Te contactaremos para coordinar el horario. Si necesitas ayuda, escribe a <a href="mailto:david_duarte182@hotmail.com" style="color:#10215c;font-weight:700;">david_duarte182@hotmail.com</a>.<br>
          <span style="color:#8b95a9;">Idiomas WeLearn · Bucaramanga, Colombia · Aprender un idioma, en serio.</span>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
