export const SEED_SITE_SETTINGS: Record<string, string> = {
  phone: '+31 (0)320 00 00 00',
  phone_tel: '+31320000000',
  email: 'info@foodjutters.nl',
  address_line1: 'Scheldeboulevard 7',
  address_line2: '4531 EJ Terneuzen',
  address_short: 'Scheldeboulevard 7, Terneuzen',
  maps_url: 'https://maps.google.com/?q=Scheldeboulevard+7+Terneuzen',
  footer_tagline:
    'Een uniek waterfront restaurant met een sfeervolle binnenruimte, ruim terras en heerlijke gerechten.',
  instagram_url: 'https://www.instagram.com/foodjutters',
  facebook_url: 'https://www.facebook.com/foodjutters',
  opening_hours: JSON.stringify([
    { day: 'Maandag', hours: 'Gesloten' },
    { day: 'Dinsdag', hours: 'Gesloten' },
    { day: 'Woensdag', hours: '12:00 – 22:00' },
    { day: 'Donderdag', hours: '12:00 – 22:00' },
    { day: 'Vrijdag', hours: '12:00 – 22:00' },
    { day: 'Zaterdag', hours: '12:00 – 22:00' },
    { day: 'Zondag', hours: '12:00 – 21:00' },
  ]),
  hours_display: 'Wo – Zo · 12:00 – 22:00',
}
