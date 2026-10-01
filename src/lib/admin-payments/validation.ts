export const PAYMENT_LINK_LIMITS = Object.freeze({
  minimumCop: 1_000,
  maximumCop: 100_000_000,
  maximumTitleLength: 150,
  maximumDescriptionLength: 500,
  maximumInternalNoteLength: 1_000,
});

export type AdminPaymentLinkInput = Readonly<{
  amountInCents: number;
  title: string;
  description: string;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  internalNote: string | null;
  expiresInDays: number;
}>;

export type AdminPaymentLinkInputResult =
  | Readonly<{ ok: true; value: AdminPaymentLinkInput }>
  | Readonly<{ ok: false; message: string }>;

function cleanText(value: FormDataEntryValue | null, maximumLength: number): string {
  return String(value ?? '').trim().replace(/\s+/g, ' ').slice(0, maximumLength);
}

export function parseAdminPaymentLinkForm(form: FormData): AdminPaymentLinkInputResult {
  const amountInCop = Number(form.get('amountInCop'));
  const title = cleanText(form.get('title'), PAYMENT_LINK_LIMITS.maximumTitleLength);
  const description = cleanText(
    form.get('description'),
    PAYMENT_LINK_LIMITS.maximumDescriptionLength,
  );
  const customerName = cleanText(form.get('customerName'), 120) || null;
  const customerEmail = cleanText(form.get('customerEmail'), 254).toLowerCase() || null;
  const customerPhone = cleanText(form.get('customerPhone'), 30) || null;
  const internalNote = cleanText(
    form.get('internalNote'),
    PAYMENT_LINK_LIMITS.maximumInternalNoteLength,
  ) || null;
  const expiresInDays = Number(form.get('expiresInDays'));

  if (
    !Number.isSafeInteger(amountInCop) ||
    amountInCop < PAYMENT_LINK_LIMITS.minimumCop ||
    amountInCop > PAYMENT_LINK_LIMITS.maximumCop
  ) {
    return {
      ok: false,
      message: 'El valor debe ser un monto entero entre $1.000 y $100.000.000 COP.',
    };
  }

  if (title.length < 3) {
    return { ok: false, message: 'Escribe un concepto de al menos 3 caracteres.' };
  }

  if (customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    return { ok: false, message: 'El correo del cliente no es válido.' };
  }

  if (customerPhone && !/^[+0-9()\s-]{7,30}$/.test(customerPhone)) {
    return { ok: false, message: 'El teléfono solo puede contener números, espacios, +, - y paréntesis.' };
  }

  if (![1, 3, 7, 15, 30].includes(expiresInDays)) {
    return { ok: false, message: 'Selecciona un vencimiento permitido.' };
  }

  return {
    ok: true,
    value: Object.freeze({
      amountInCents: amountInCop * 100,
      title,
      description,
      customerName,
      customerEmail,
      customerPhone,
      internalNote,
      expiresInDays,
    }),
  };
}
