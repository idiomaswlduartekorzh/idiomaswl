import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isRegistrationAccountType, isRegistrationProductId } from '@/lib/registration/catalog';
import { listRegistrationOrdersForUser } from '@/lib/registration/orders.server';
import { isRegistrationCheckoutEnabled } from '@/lib/registration/payment-config.server';
import RegistrationPlansClient from './RegistrationPlansClient';

export const metadata: Metadata = {
  title: 'Mi ruta y mis planes',
  robots: { index: false, follow: false },
};

export default async function RegistrationPlansPage({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const [{ data: profile }, params, orders] = await Promise.all([
    supabase
      .from('profiles')
      .select('account_type, intended_product_id')
      .eq('id', user.id)
      .maybeSingle(),
    searchParams,
    listRegistrationOrdersForUser(user.id),
  ]);
  const initialAccountType = isRegistrationAccountType(profile?.account_type)
    ? profile.account_type
    : 'platform';
  const initialProductId = isRegistrationProductId(profile?.intended_product_id)
    ? profile.intended_product_id
    : null;
  return (
    <RegistrationPlansClient
      initialAccountType={initialAccountType}
      initialProductId={initialProductId}
      orders={orders}
      checkoutEnabled={isRegistrationCheckoutEnabled()}
      returnedFromPayment={params.payment === 'return'}
    />
  );
}
