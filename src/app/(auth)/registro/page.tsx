import AuthForm from '../login/AuthForm';

export const metadata = { title: 'Registrarse', robots: { index: false, follow: false } };

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
