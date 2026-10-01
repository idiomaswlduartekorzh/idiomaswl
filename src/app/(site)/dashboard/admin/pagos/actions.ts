'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { createAdminPaymentLink } from '@/lib/admin-payments/server';
import { parseAdminPaymentLinkForm } from '@/lib/admin-payments/validation';
import { WompiConfigurationError } from '@/lib/wompi/validation';

export interface CreatePaymentLinkState {
  status: 'idle' | 'success' | 'error';
  message: string;
  paymentUrl: string | null;
}

export const INITIAL_CREATE_PAYMENT_LINK_STATE: CreatePaymentLinkState = {
  status: 'idle',
  message: '',
  paymentUrl: null,
};

export async function createPaymentLinkAction(
  _state: CreatePaymentLinkState,
  form: FormData,
): Promise<CreatePaymentLinkState> {
  let admin;
  try {
    admin = await requireAdmin();
  } catch {
    return {
      status: 'error',
      message: 'Tu sesión no tiene permisos para crear links de pago.',
      paymentUrl: null,
    };
  }

  const parsed = parseAdminPaymentLinkForm(form);
  if (!parsed.ok) {
    return { status: 'error', message: parsed.message, paymentUrl: null };
  }

  try {
    const ticket = await createAdminPaymentLink(parsed.value, admin);
    revalidatePath('/dashboard/admin/pagos');
    return {
      status: 'success',
      message: 'Link creado y registrado. Ya puedes copiarlo y enviarlo al cliente.',
      paymentUrl: ticket.paymentUrl,
    };
  } catch (error) {
    if (error instanceof WompiConfigurationError) {
      return {
        status: 'error',
        message: 'Las credenciales de Wompi no están configuradas correctamente.',
        paymentUrl: null,
      };
    }

    console.error('[admin-payments] Falló la creación del link de pago.');
    return {
      status: 'error',
      message: error instanceof Error
        ? error.message
        : 'No se pudo crear el link. Inténtalo nuevamente.',
      paymentUrl: null,
    };
  }
}
