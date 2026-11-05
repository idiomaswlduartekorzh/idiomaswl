import { notFound } from 'next/navigation';
import { findManualInvite } from '@/lib/course-pricing/manual-enrollment.server';
import ManualEnrollmentForm from './ManualEnrollmentForm';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Completa tu inscripción | WeLearn', robots: { index: false, follow: false } };

export default async function ManualEnrollmentPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const invite = await findManualInvite(token);
  if (!invite) notFound();
  const expired = !invite.accepted_at && Date.parse(invite.expires_at) <= Date.now();
  return <main style={{ maxWidth: 880, margin: '0 auto', padding: '42px 20px 90px', color: '#142457' }}>
    <p style={{ color: '#9a2439', fontWeight: 700, letterSpacing: '0.1em' }}>WELEARN · INSCRIPCIÓN POR CONSIGNACIÓN</p>
    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.12 }}>Completa tu inscripción y activa tu cuenta</h1>
    <p>Este enlace está reservado para <strong>{invite.email}</strong>. No abrirá Wompi ni te pedirá otro pago.</p>
    {expired ? <p>El enlace venció. Escríbenos para recibir uno nuevo.</p> : invite.welcome_sent_at ? <p><strong>Tu inscripción quedó guardada.</strong> Revisa tu correo para activar la cuenta y descargar el reglamento firmado.</p> : <ManualEnrollmentForm token={token} email={invite.email} schedule={invite.preferred_schedule} alreadySigned={Boolean(invite.accepted_at)} />}
  </main>;
}
