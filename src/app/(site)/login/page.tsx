import AuthForm from './AuthForm';

export const metadata = { title: 'Iniciar sesión · Idiomas WeLearn' };

export default function LoginPage() {
  return (
    <div className="auth-shell">
      <AuthForm mode="login" />
    </div>
  );
}
