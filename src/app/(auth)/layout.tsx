// Auth pages get no shared navigation — AuthForm renders full-page
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
