import { notFound } from 'next/navigation';
import { findManualInvite } from '@/lib/course-pricing/manual-enrollment.server';
import ManualEnrollmentForm from './ManualEnrollmentForm';
import styles from './manual-enrollment.module.css';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Completa tu inscripción | WeLearn', robots: { index: false, follow: false } };

export default async function ManualEnrollmentPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const invite = await findManualInvite(token);
  if (!invite) notFound();
  const expired = !invite.accepted_at && Date.parse(invite.expires_at) <= Date.now();
  return <main className={styles.page}><div className={styles.shell}>
    <header className={styles.hero}>
      <p className={styles.heroEyebrow}>WELEARN / INSCRIPCIÓN PRIVADA</p>
      <h1>Tu siguiente paso empieza aquí.</h1>
      <p>Completa tus datos, revisa el reglamento y activa tu cuenta. Este enlace está reservado para <strong>{invite.email}</strong>.</p>
      <div className={styles.paymentNotice}><span aria-hidden="true">✓</span><span>Consignación reportada. <strong>No volverás a pagar en este formulario.</strong></span></div>
    </header>
    {expired ? <div className={styles.result}><h2>Este enlace venció</h2><p>Escríbenos para recibir uno nuevo.</p></div> : invite.welcome_sent_at ? <div className={styles.result}><h2>Tu inscripción quedó guardada</h2><p>Revisa tu correo para activar la cuenta y descargar el reglamento firmado.</p></div> : <ManualEnrollmentForm token={token} email={invite.email} schedule={invite.preferred_schedule} alreadySigned={Boolean(invite.accepted_at)} />}
  </div></main>;
}
