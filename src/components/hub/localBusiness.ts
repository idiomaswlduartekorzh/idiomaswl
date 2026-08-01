/**
 * Datos NAP (nombre, dirección, teléfono) de la sede y constructores de JSON-LD local.
 *
 * Fuente única de verdad: si la dirección o los horarios cambian, se cambian AQUÍ y no
 * en nueve páginas distintas. Google contrasta este marcado con el Perfil de Empresa,
 * así que cualquier divergencia entre páginas debilita la señal local.
 */

export const WA_NUMBER = '573005004253';

export const SEDE = {
  streetAddress: 'Calle 47 # 29-33, Sotomayor',
  addressLocality: 'Bucaramanga',
  addressRegion: 'Santander',
  postalCode: '680001',
  addressCountry: 'CO',
  latitude: 7.1193,
  longitude: -73.1227,
} as const;

/** Municipios que se atienden presencialmente. */
export const AREA_PRESENCIAL = ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta'] as const;

export const SAME_AS = [
  `https://wa.me/${WA_NUMBER}`,
  'https://www.facebook.com/welearnc/',
  'https://www.instagram.com/idiomas_welearn/',
  'https://www.tiktok.com/@idiomas.welearn',
];

export const HAS_MAP =
  'https://maps.google.com/?q=Calle+47+%2329-33+Sotomayor+Bucaramanga+Idiomas+WeLearn';

export const DAVID_ID = 'https://www.idiomaswl.com/#david';
export const ZHANNA_ID = 'https://www.idiomaswl.com/#zhanna';
export const BUSINESS_ID = 'https://www.idiomaswl.com/#localbusiness';

/**
 * Nodo LocalBusiness + LanguageSchool. `description` se pasa por idioma para que cada
 * landing describa su propia oferta sin repetir el resto del marcado.
 */
export function localBusinessNode(description: string) {
  return {
    '@type': ['LocalBusiness', 'LanguageSchool'],
    '@id': BUSINESS_ID,
    name: 'Idiomas WeLearn',
    alternateName: 'WeLearn Academia de Idiomas',
    description,
    url: 'https://www.idiomaswl.com',
    telephone: `+${WA_NUMBER}`,
    email: 'info@idiomaswl.com',
    image: 'https://www.idiomaswl.com/images/david-duarte.jpg',
    priceRange: '$$',
    currenciesAccepted: 'COP',
    paymentAccepted: 'Cash, Credit Card, Transfer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEDE.streetAddress,
      addressLocality: SEDE.addressLocality,
      addressRegion: SEDE.addressRegion,
      postalCode: SEDE.postalCode,
      addressCountry: SEDE.addressCountry,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SEDE.latitude, longitude: SEDE.longitude },
    areaServed: [
      ...AREA_PRESENCIAL.map(name => ({ '@type': 'City', name })),
      { '@type': 'Country', name: 'Colombia' },
    ],
    hasMap: HAS_MAP,
    openingHours: ['Mo-Fr 07:00-21:00', 'Sa 08:00-18:00'],
    founder: [{ '@id': DAVID_ID }, { '@id': ZHANNA_ID }],
    sameAs: SAME_AS,
  };
}

/** Persona: David. `description` se adapta al idioma de la landing. */
export function davidNode(description: string) {
  return {
    '@type': 'Person',
    '@id': DAVID_ID,
    name: 'José David Duarte Silva',
    jobTitle: 'Políglota y co-fundador de Idiomas WeLearn',
    description,
    image: 'https://www.idiomaswl.com/images/david-duarte.jpg',
    knowsLanguage: ['es', 'en', 'it', 'pt', 'fr', 'ru', 'de', 'ja', 'ko'],
    worksFor: { '@id': BUSINESS_ID },
  };
}

/** Persona: Zhanna. Es CO-FUNDADORA, no solo directora académica. */
export function zhannaNode(description: string, knowsLanguage: string[] = ['es', 'en', 'fr']) {
  return {
    '@type': 'Person',
    '@id': ZHANNA_ID,
    name: 'Zhanna Korzh',
    jobTitle: 'Co-fundadora y directora académica de Idiomas WeLearn',
    description,
    image: 'https://www.idiomaswl.com/images/team-zhanna-korzh.png',
    knowsLanguage,
    worksFor: { '@id': BUSINESS_ID },
  };
}

/**
 * Dos CourseInstance: online y presencial. La instancia `onsite` con `location` es lo que
 * le dice a Google que el curso existe físicamente en Bucaramanga, no solo por internet.
 */
export function courseInstances(langName: string, inLanguage: string) {
  const instructor = [{ '@id': DAVID_ID }, { '@id': ZHANNA_ID }];
  return [
    {
      '@type': 'CourseInstance',
      name: `${langName} online`,
      courseMode: 'online',
      inLanguage,
      courseWorkload: 'PT1H',
      instructor,
    },
    {
      '@type': 'CourseInstance',
      name: `${langName} presencial en Bucaramanga`,
      courseMode: 'onsite',
      inLanguage,
      courseWorkload: 'PT1H',
      location: { '@id': BUSINESS_ID },
      instructor,
    },
  ];
}
