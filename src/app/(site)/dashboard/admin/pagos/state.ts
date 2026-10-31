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
