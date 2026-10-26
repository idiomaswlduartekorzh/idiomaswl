'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, type FormEvent } from 'react';
import { updatePassword } from '@/lib/actions/updatePassword';
import { removeStudentAvatar, requestStudentEmailChange, updateStudentAvatar, updateStudentDetails, updateStudentNotifications } from '@/lib/actions/studentSettings';
import type { StudentPlan } from '@/lib/actions/assignPlan';
import styles from './perfil.module.css';

type Preferences = { reminders: boolean; frequency: 'daily' | 'weekly'; weekday: number; corrections: boolean };
type Props = { name: string; email: string; phone: string; city: string; avatarUrl: string | null; preferences: Preferences; plan: StudentPlan; joinedAt: string };
type Message = { ok: boolean; text: string };
const PLAN_LABELS: Record<StudentPlan, string> = { autodidacta: 'Autodidacta', preparacion: 'Preparación', intensivo: 'Intensivo' };
const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function PerfilClient({ name, email, phone, city, avatarUrl, preferences, plan, joinedAt }: Props) {
  const [savedName, setSavedName] = useState(name);
  const [avatar, setAvatar] = useState(avatarUrl);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<Message | null>(null);
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [reminders, setReminders] = useState(preferences.reminders);
  const [frequency, setFrequency] = useState(preferences.frequency);
  const [weekday, setWeekday] = useState(preferences.weekday);

  function report(result: { ok: boolean; error?: string }, success: string) {
    setMessage({ ok: result.ok, text: result.ok ? success : result.error ?? 'No pudimos guardar los cambios.' });
  }
  async function saveDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy('details');
    const result = await updateStudentDetails(form);
    setBusy(null);
    report(result, 'Datos personales actualizados.');
    if (result.ok) setSavedName(String(form.get('full_name') ?? '').trim());
  }
  async function saveAvatar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy('avatar');
    const result = await updateStudentAvatar(new FormData(event.currentTarget));
    setBusy(null);
    report(result, 'Foto de perfil actualizada.');
    if (result.ok) setAvatar(result.avatarUrl ?? null);
  }
  async function removeAvatar() {
    setBusy('avatar');
    const result = await removeStudentAvatar();
    setBusy(null);
    report(result, 'Foto de perfil eliminada.');
    if (result.ok) setAvatar(null);
  }
  async function saveNotifications(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy('notifications');
    const result = await updateStudentNotifications(new FormData(event.currentTarget));
    setBusy(null);
    report(result, 'Preferencias de notificaciones guardadas.');
  }
  async function savePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy('password');
    const result = await updatePassword(new FormData(event.currentTarget));
    setBusy(null);
    report(result, 'Contraseña actualizada.');
    if (result.ok) { setPassword(''); setConfirmation(''); }
  }
  async function changeEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy('email');
    const result = await requestStudentEmailChange(new FormData(form));
    setBusy(null);
    report(result, 'Revisa los mensajes de confirmación para completar el cambio de correo.');
    if (result.ok) form.reset();
  }

  return <main className={styles.page}>
    <div className={styles.wrap}>
      <Link className={styles.back} href="/dashboard/student">← Volver a mi panel</Link>
      <header className={styles.heading}>
        <div className={styles.avatar}>{avatar ? <Image src={avatar} alt={`Foto de ${savedName}`} width={82} height={82} /> : <span>{savedName[0]?.toUpperCase() ?? 'E'}</span>}</div>
        <div><p className={styles.eyebrow}>Mi cuenta</p><h1>Perfil y preferencias</h1><p>{savedName} · Plan {PLAN_LABELS[plan]}</p></div>
      </header>
      {message && <div className={message.ok ? styles.success : styles.error} role="status">{message.text}</div>}
      <div className={styles.grid}>
        <section className={styles.card} aria-labelledby="avatar-title">
          <h2 id="avatar-title">Foto de perfil</h2>
          <p>Usa una imagen JPG, PNG o WebP de hasta 2 MB. Tu foto será visible en tu perfil.</p>
          <form onSubmit={saveAvatar} className={styles.form}>
            <label htmlFor="avatar-upload">Seleccionar imagen</label>
            <input id="avatar-upload" name="avatar" type="file" accept="image/jpeg,image/png,image/webp" required />
            <div className={styles.actions}><button disabled={busy === 'avatar'} type="submit">{busy === 'avatar' ? 'Subiendo…' : 'Guardar foto'}</button>
              {avatar && <button className={styles.secondary} disabled={busy === 'avatar'} onClick={removeAvatar} type="button">Quitar foto</button>}
            </div>
          </form>
        </section>
        <section className={styles.card} aria-labelledby="details-title">
          <h2 id="details-title">Datos personales</h2>
          <form onSubmit={saveDetails} className={styles.form}>
            <label htmlFor="profile-name">Nombre completo</label><input id="profile-name" name="full_name" defaultValue={name} minLength={2} maxLength={80} required />
            <label htmlFor="profile-phone">Teléfono</label><input id="profile-phone" name="phone" type="tel" defaultValue={phone} maxLength={25} placeholder="Opcional" />
            <label htmlFor="profile-city">Ciudad</label><input id="profile-city" name="city" defaultValue={city} maxLength={80} placeholder="Opcional" />
            <label htmlFor="profile-email">Correo de acceso</label><input id="profile-email" value={email} readOnly aria-describedby="email-note" />
            <small id="email-note">Puedes solicitar un cambio de correo debajo. Por seguridad se confirma por email.</small>
            <button disabled={busy === 'details'} type="submit">{busy === 'details' ? 'Guardando…' : 'Guardar datos'}</button>
          </form>
          <form onSubmit={changeEmail} className={styles.form} style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--line-soft,#e3e7ef)' }}>
            <label htmlFor="new-email">Cambiar correo de acceso</label>
            <input id="new-email" name="email" type="email" autoComplete="email" placeholder="Nuevo correo electrónico" required />
            <small>Tu correo actual seguirá activo hasta que confirmes el nuevo.</small>
            <button disabled={busy === 'email'} type="submit">{busy === 'email' ? 'Enviando…' : 'Solicitar cambio de correo'}</button>
          </form>
        </section>
        <section className={styles.card} aria-labelledby="notification-title">
          <h2 id="notification-title">Notificaciones por correo</h2>
          <form onSubmit={saveNotifications} className={styles.form}>
            <label className={styles.check}><input name="reminders" type="checkbox" defaultChecked={preferences.reminders} onChange={event => setReminders(event.target.checked)} /> Recordarme que estudie</label>
            {reminders && <div className={styles.options}>
              <label htmlFor="reminder-frequency">Frecuencia</label>
              <select id="reminder-frequency" name="frequency" defaultValue={preferences.frequency} onChange={event => setFrequency(event.target.value as Preferences['frequency'])}>
                <option value="weekly">Una vez por semana</option><option value="daily">Todos los días</option>
              </select>
              {frequency === 'weekly' && <><label htmlFor="reminder-weekday">Día</label><select id="reminder-weekday" name="weekday" value={weekday} onChange={event => setWeekday(Number(event.target.value))}>{DAYS.map((day, index) => <option key={day} value={index + 1}>{day}</option>)}</select></>}
              <p>Enviaremos el recordatorio alrededor de las 8:00 a. m., hora de Colombia.</p>
            </div>}
            {!reminders && <input type="hidden" name="frequency" value={frequency} />}
            {(frequency === 'daily' || !reminders) && <input type="hidden" name="weekday" value={weekday} />}
            <label className={styles.check}><input name="corrections" type="checkbox" defaultChecked={preferences.corrections} /> Avisarme cuando un docente corrija mis tareas o simulacros</label>
            <button disabled={busy === 'notifications'} type="submit">{busy === 'notifications' ? 'Guardando…' : 'Guardar notificaciones'}</button>
          </form>
        </section>
        <section className={styles.card} aria-labelledby="password-title">
          <h2 id="password-title">Cambiar contraseña</h2>
          <p>Mínimo 12 caracteres, con mayúsculas, minúsculas y números.</p>
          <form onSubmit={savePassword} className={styles.form}>
            <label htmlFor="new-password">Nueva contraseña</label><input id="new-password" name="password" type="password" autoComplete="new-password" minLength={12} required value={password} onChange={event => setPassword(event.target.value)} />
            <label htmlFor="confirm-password">Confirmar contraseña</label><input id="confirm-password" name="confirmation" type="password" autoComplete="new-password" minLength={12} required value={confirmation} onChange={event => setConfirmation(event.target.value)} />
            <button disabled={busy === 'password'} type="submit">{busy === 'password' ? 'Actualizando…' : 'Actualizar contraseña'}</button>
          </form>
          <Link className={styles.help} href="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>
        </section>
      </div>
      <p className={styles.footer}>Miembro desde {new Date(joinedAt).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
    </div>
  </main>;
}
