import type { Metadata } from 'next';
import LockedPhoneClient from './LockedPhoneClient';

export const metadata: Metadata = {
  title: 'The Locked Phone — English Comprehension Practice | WeLearn',
  description:
    'Practica listening y comprensión de lectura en inglés B1–B2 con una discusión de pareja real: ella pidió revisarle el celular, él dijo que no. Dos notas de voz, transcripción interactiva y 19 preguntas de vocabulario, inferencia, tono y pensamiento crítico.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/the-locked-phone' },
  openGraph: {
    title: 'The Locked Phone — English Comprehension Practice',
    description:
      'Ella pidió revisar el celular. Él dijo que no. Dos versiones de la misma noche, dos notas de voz y 19 preguntas de comprensión en inglés B1–B2.',
    url: 'https://www.idiomaswl.com/practica/the-locked-phone',
    type: 'article',
  },
};

export default function LockedPhonePage() {
  return (
    <section className="wl-section">
      <div className="wrap">
        <LockedPhoneClient />
      </div>
    </section>
  );
}
