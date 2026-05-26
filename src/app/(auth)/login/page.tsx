import AuthForm from './AuthForm';

export const metadata = { title: 'Iniciar sesión', robots: { index: false, follow: false } };

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
