import AuthForm from '../login/AuthForm';
import { parseRegistrationIntent } from '@/lib/student-onboarding/catalog';

export const metadata = { title: 'Registrarse', robots: { index: false, follow: false } };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function RegisterPage({ searchParams }: { searchParams: SearchParams }) {
  const initialIntent = parseRegistrationIntent(await searchParams);
  return <AuthForm mode="register" initialIntent={initialIntent} />;
}
