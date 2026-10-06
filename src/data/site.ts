export const site = {
  name: 'MedInfra',
  legalName: 'MedInfra Private Limited',
  tagline: 'Complete Healthcare Project Solutions',
  promise: 'From Concept to Commissioning',
  url: 'https://www.medinfra.org',
  description:
    'MedInfra plans, engineers, equips, executes and maintains healthcare facilities — hospital consultancy, modular OT & ICU, MGPS, biomedical equipment and government healthcare projects across India.',
  phone: '+91 471 350 5500',
  phoneHref: 'tel:+914713505500',
  email: 'info@medinfra.org',
  address: {
    line1: '2nd Floor, MedInfra Tower',
    line2: 'Technopark Campus',
    locality: 'Kazhakkoottam',
    city: 'Thiruvananthapuram',
    postalCode: '695581',
    postalDisplay: '695 581',
    region: 'Kerala',
    regionCode: 'KL',
    country: 'India',
    countryCode: 'IN',
  },
  hours: {
    display: 'Monday – Saturday · 09:00 – 18:30 IST',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:30',
  },
  serviceArea: 'Site visits arranged pan-India',
  locale: 'en_IN',
} as const;

export const nav = [
  { label: 'About', href: '/about/' },
  { label: 'Solutions', href: '/solutions/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Government Projects', href: '/government-projects/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'Contact', href: '/contact/' },
] as const;
