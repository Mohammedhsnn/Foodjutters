import type { ContentPage, MenuSection } from './types'

function now() {
  return new Date().toISOString()
}

function itemId() {
  return `item_${Math.random().toString(36).slice(2, 10)}`
}

export const SEED_CONTENT: ContentPage[] = [
  {
    slug: 'home',
    name: 'Homepage',
    path: '/',
    hero: {
      eyebrow: 'Welkom',
      title: 'FoodJutters',
      subtitle: 'Smullen, borrelen & genieten aan het water',
      meta: [
        { label: 'Terras', value: 'Waterfront' },
        { label: 'Keuken', value: 'Houtoven' },
        { label: 'Geopend', value: 'Wo – Zo' },
      ],
    },
    blocks: [
      {
        id: 'home-intro',
        key: 'intro',
        label: 'Introductietekst',
        type: 'textarea',
        value:
          'FoodJutters is uw adres voor een ontspannen avond aan het water — met verse gerechten, pizza uit de houtoven en een warme, gastvrije sfeer.',
      },
      {
        id: 'home-cta',
        key: 'cta_primary',
        label: 'Primaire CTA',
        type: 'text',
        value: 'Reserveer een tafel',
      },
    ],
    updatedAt: now(),
  },
  {
    slug: 'over-ons',
    name: 'Over ons',
    path: '/over-ons',
    hero: {
      eyebrow: 'Ons verhaal',
      title: 'Over ons',
      subtitle:
        'Hoe een passie voor goed eten en gastvrijheid uitgroeide tot een uniek waterfront restaurant aan de Schelde.',
      meta: [
        { label: 'Opgericht', value: '2012' },
        { label: 'Ervaring', value: '10+ jaar' },
        { label: 'Gastoordeel', value: '5.0 ★' },
      ],
    },
    blocks: [
      {
        id: 'over-story',
        key: 'story',
        label: 'Verhaal (lead)',
        type: 'textarea',
        value:
          'FoodJutters ontstond uit de wens om een plek te creëren waar mensen samenkomen, genieten van goed eten en de rust van het water ervaren.',
      },
    ],
    updatedAt: now(),
  },
  {
    slug: 'impressie',
    name: 'Impressie',
    path: '/impressie',
    hero: {
      eyebrow: 'Sfeer & ambiance',
      title: 'Impressie',
      subtitle: 'Een kijkje in ons restaurant, terras en keuken — waar elke avond een beleving wordt.',
      meta: [
        { label: 'Terras', value: 'Waterfront' },
        { label: 'Binnen', value: 'Knus & warm' },
        { label: 'Keuken', value: 'Open vuur' },
      ],
    },
    blocks: [
      {
        id: 'impressie-caption',
        key: 'gallery_intro',
        label: 'Galerij intro',
        type: 'textarea',
        value: 'Ontdek de sfeer van FoodJutters — van zonsondergang op het terras tot de gezellige binnenruimte.',
      },
    ],
    updatedAt: now(),
  },
  {
    slug: 'menu',
    name: 'Menu',
    path: '/menu',
    hero: {
      eyebrow: 'Onze keuken',
      title: 'Menu',
      subtitle: 'Vers, seizoensgebonden en met liefde bereid. Van pizza uit de houtoven tot gegrilde specialiteiten.',
      meta: [
        { label: 'Categorieën', value: '5 gerechten' },
        { label: 'Houtoven', value: "Pizza's" },
        { label: 'Geopend', value: 'Wo – Zo 12–22' },
      ],
    },
    blocks: [
      {
        id: 'menu-allergen',
        key: 'allergen_note',
        label: 'Allergenen notitie',
        type: 'textarea',
        value:
          'Informeer uw bediening bij allergieën of dieetwensen. Alle prijzen zijn inclusief BTW.',
      },
    ],
    updatedAt: now(),
  },
  {
    slug: 'contact',
    name: 'Contact',
    path: '/contact',
    hero: {
      eyebrow: 'Neem contact op',
      title: 'Contact',
      subtitle: 'Vragen, groepsreserveringen of feedback? Wij horen graag van u.',
      meta: [
        { label: 'Telefoon', value: '+31 10 123 4567' },
        { label: 'E-mail', value: 'info@foodjutters.nl' },
        { label: 'Adres', value: 'Havenkade 12' },
      ],
    },
    blocks: [
      {
        id: 'contact-hours',
        key: 'opening_hours',
        label: 'Openingstijden',
        type: 'textarea',
        value: 'Woensdag – zondag: 12:00 – 22:00\nMaandag & dinsdag: gesloten',
      },
    ],
    updatedAt: now(),
  },
  {
    slug: 'reserveren',
    name: 'Reserveren',
    path: '/reserveren',
    hero: {
      eyebrow: 'Tafel reserveren',
      title: 'Reserveren',
      subtitle: 'Kies datum, tijd en gezelschap — wij bevestigen uw reservering zo snel mogelijk.',
      meta: [
        { label: 'Groepen', value: '8+ op aanvraag' },
        { label: 'Terras', value: 'Op verzoek' },
        { label: 'Bevestiging', value: 'Per e-mail' },
      ],
    },
    blocks: [
      {
        id: 'reserve-note',
        key: 'booking_note',
        label: 'Reserveringsnotitie',
        type: 'textarea',
        value:
          'Voor groepen vanaf 8 personen of speciale wensen kunt u ons ook telefonisch bereiken.',
      },
    ],
    updatedAt: now(),
  },
]

export const SEED_MENU: MenuSection[] = [
  {
    id: 'starters',
    title: 'Voorgerechten',
    subtitle: 'Een heerlijke start van uw maaltijd',
    sortOrder: 0,
    items: [
      { id: itemId(), name: 'Garnalencocktail', description: 'Verse Hollandse garnalen, cocktailsaus, citroen', price: '12,50', available: true, sortOrder: 0 },
      { id: itemId(), name: 'Bruschetta uit de houtoven', description: 'Geroosterd zuurdesembrood, tomaat, basilicum, olijfolie', price: '9,50', available: true, sortOrder: 1 },
      { id: itemId(), name: 'Soep van de dag', description: 'Vraag de bediening naar de dagsoep', price: '8,50', available: true, sortOrder: 2 },
      { id: itemId(), name: 'Zalmtartaar', description: 'Verse zalm, kappertjes, rode ui, roggebrood', price: '14,50', available: true, sortOrder: 3 },
      { id: itemId(), name: 'Burrata', description: 'Verse burrata, tomaat, pijnboompitten, rucola, balsamico', price: '13,50', available: true, sortOrder: 4 },
    ],
  },
  {
    id: 'pizza',
    title: "Pizza's uit de houtoven",
    subtitle: 'Ambachtelijk bereid op hoge temperatuur',
    sortOrder: 1,
    items: [
      { id: itemId(), name: 'Margherita', description: 'Tomatensaus, mozzarella, verse basilicum', price: '14,00', available: true, sortOrder: 0 },
      { id: itemId(), name: 'Jutters Special', description: 'Tomatensaus, mozzarella, salami, paprika, champignons, olijven', price: '17,50', available: true, sortOrder: 1 },
      { id: itemId(), name: 'Quattro Stagioni', description: 'Tomatensaus, ham, artisjokharten, champignons, olijven', price: '17,00', available: true, sortOrder: 2 },
      { id: itemId(), name: 'Tartufo', description: 'Truffelcrème, mozzarella, rucola, parmezaan, zwarte peper', price: '19,50', available: true, sortOrder: 3 },
      { id: itemId(), name: 'Seafood', description: 'Tomatensaus, garnalen, inktvis, knoflook, peterselie', price: '21,00', available: true, sortOrder: 4 },
    ],
  },
  {
    id: 'main',
    title: 'Hoofdgerechten',
    subtitle: 'Grote gerechten voor een volledige maaltijd',
    sortOrder: 2,
    items: [
      { id: itemId(), name: 'Gegrilde zalmfilet', description: 'Verse zalm, seizoensgroenten, citroenboter, nieuwe aardappelen', price: '24,50', available: true, sortOrder: 0 },
      { id: itemId(), name: 'Ribeye (250g)', description: 'Droog-gerijpte ribeye, friet, salade, huismade peppersaus', price: '32,00', available: true, sortOrder: 1 },
      { id: itemId(), name: 'Gebakken kabeljauw', description: 'Kabeljauwfilet, romige risotto, groene asperges, citroensaus', price: '26,50', available: true, sortOrder: 2 },
      { id: itemId(), name: 'Chicken Milanese', description: 'Gepaneerde kip, rucola, kerstomaatjes, parmezaan', price: '21,50', available: true, sortOrder: 3 },
      { id: itemId(), name: 'Vegetarisch dagsuggestie', description: 'Vraag de bediening naar de vegetarische suggestie van de dag', price: '19,50', available: true, sortOrder: 4 },
    ],
  },
  {
    id: 'dessert',
    title: 'Desserts',
    subtitle: 'Een zoete afsluiting van uw bezoek',
    sortOrder: 3,
    items: [
      { id: itemId(), name: 'Crème brûlée', description: 'Klassieke vanillecrème met gekarameliseerde suikerkorst', price: '9,00', available: true, sortOrder: 0 },
      { id: itemId(), name: 'Chocoladefondant', description: 'Warm chocoladetaartje, vanille-ijs, poedersuiker', price: '10,50', available: true, sortOrder: 1 },
      { id: itemId(), name: 'Seizoenssorbet', description: 'Drie bolletjes seizoensgebonden sorbet', price: '8,50', available: true, sortOrder: 2 },
      { id: itemId(), name: 'Kaasplankje', description: 'Selectie van Nederlandse en Franse kazen, vijgenjam, walnoten', price: '16,00', available: true, sortOrder: 3 },
      { id: itemId(), name: 'Tiramisu', description: 'Huisgemaakte tiramisu met espresso en amaretto', price: '9,50', available: true, sortOrder: 4 },
    ],
  },
  {
    id: 'drinks',
    title: 'Dranken',
    subtitle: 'Wijnen, speciaalbieren en alcoholvrije opties',
    sortOrder: 4,
    items: [
      { id: itemId(), name: 'Huiswijn rood / wit / rosé (glas)', description: 'Selectie wisselt per seizoen', price: '5,50', available: true, sortOrder: 0 },
      { id: itemId(), name: 'Fles huiswijn', description: '75cl', price: '24,00', available: true, sortOrder: 1 },
      { id: itemId(), name: 'Speciaalbier', description: 'Vraag naar ons bierassortiment', price: '5,00', available: true, sortOrder: 2 },
      { id: itemId(), name: 'Frisdrank', description: 'Cola, Spa, Fanta, etc.', price: '3,50', available: true, sortOrder: 3 },
      { id: itemId(), name: 'Koffie & thee', description: 'Espresso, cappuccino, latte, thee', price: '3,00', available: true, sortOrder: 4 },
    ],
  },
]

/** Legacy demo IDs inserted by earlier seeds — safe to remove via `pnpm db:clear-demo-reservations` */
export const LEGACY_DEMO_RESERVATION_IDS = [
  'res_001',
  'res_002',
  'res_003',
  'res_004',
  'res_005',
] as const
