const MAPS = [
  {
    src: '/images/ielts/task1/visual-bank/user-batch-02/06-map-town-centre.png',
    alt: 'Town centre changes between 1990 and 2020, showing before and after maps.',
  },
  {
    src: '/images/ielts/task1/visual-bank/user-batch-02/07-map-university-campus.png',
    alt: 'University campus development between 1995 and 2025, showing before and after maps.',
  },
  {
    src: '/images/ielts/task1/visual-bank/user-batch-02/08-map-coastal-village.png',
    alt: 'Coastal village changes between 2000 and 2025, showing before and after maps.',
  },
  {
    src: '/images/ielts/task1/visual-bank/user-batch-02/10-map-park-redevelopment.png',
    alt: 'Park redevelopment between 1980 and 2020, showing before and after maps.',
  },
  {
    src: '/images/ielts/task1/visual-bank/user-batch-02/09-map-shopping-centre.png',
    alt: 'Shopping centre redevelopment, showing before and after maps.',
  },
];

export default function Task1ApprovedMapVisual({ variant = 0 }: { variant?: number }) {
  const map = MAPS[variant % MAPS.length];

  return (
    <img
      src={map.src}
      alt={map.alt}
      width={1600}
      height={1000}
      loading="lazy"
      style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 6 }}
    />
  );
}
