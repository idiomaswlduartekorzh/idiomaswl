import NewPasswordForm from './NewPasswordForm';

export const metadata = { title: 'Nueva contraseña', robots: { index: false, follow: false } };

export default function ResetPasswordPage() {
  return <NewPasswordForm />;
}
