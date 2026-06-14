import type { ContentBlock } from './types'

const HERO_IMG =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0091.JPG-AMp6yqfKtGnflTqhpghBFBhZIZu1SY.jpeg'

function jsonBlock(
  id: string,
  key: string,
  label: string,
  data: unknown,
): ContentBlock {
  return { id, key, label, type: 'json', value: JSON.stringify(data) }
}

/** Extra blocks merged into SEED_CONTENT pages on database seed */
export const SEED_EXTRA_BLOCKS: Record<string, ContentBlock[]> = {
  home: [
    { id: 'home-tagline', key: 'tagline', label: 'Tagline', type: 'text', value: 'Smullen, borrelen & genieten aan het water' },
    { id: 'home-cta2', key: 'cta_secondary', label: 'Secundaire CTA', type: 'text', value: 'Bekijk ons menu' },
    { id: 'home-hours', key: 'hours_display', label: 'Openingstijden (hero)', type: 'text', value: 'Wo – Zo · 12:00 – 22:00' },
    { id: 'home-loc', key: 'location_short', label: 'Locatie (hero)', type: 'text', value: 'Scheldeboulevard 7, Terneuzen' },
    { id: 'home-banner-eyebrow', key: 'banner_eyebrow', label: 'Banner eyebrow', type: 'text', value: 'Woensdag t/m zondag' },
    { id: 'home-banner-title', key: 'banner_title', label: 'Banner titel', type: 'text', value: 'Kom gezellig tafelen' },
    { id: 'home-welcome-eyebrow', key: 'welcome_eyebrow', label: 'Welkom eyebrow', type: 'text', value: 'Welkom bij' },
    { id: 'home-welcome-text', key: 'welcome_text', label: 'Welkom tekst', type: 'textarea', value: 'Brasserie aan het water — terras, open keuken en een warme sfeer voor lunch én diner.' },
    jsonBlock('home-features', 'features', 'Feature pills', [
      { icon: 'Waves', title: 'Aan het water', text: 'Terras met uitzicht over de Schelde' },
      { icon: 'Utensils', title: 'Verse keuken', text: 'Seizoensgerechten & houtoven-pizza' },
      { icon: 'Sparkles', title: 'Gezellige sfeer', text: 'Knus binnen & knap buiten' },
    ]),
    jsonBlock('home-highlights', 'highlights', 'Highlights', [
      { icon: 'Sunset', title: 'Uitzicht over het water', description: 'Panorama op terras of binnen.' },
      { icon: 'Utensils', title: 'Verse gerechten', description: 'Seizoensmenu & houtoven-pizza.' },
      { icon: 'Flame', title: 'Knus & sfeervol', description: 'Houtkachel en sfeervol licht.' },
      { icon: 'Users', title: 'Ruimte voor iedereen', description: 'Van duo tot groepsreservering.' },
    ]),
    { id: 'home-story-eyebrow', key: 'welcome_story_eyebrow', label: 'Welkom — verhaal eyebrow', type: 'text', value: 'Ons verhaal' },
    { id: 'home-story-title', key: 'welcome_story_title', label: 'Welkom — verhaal titel', type: 'text', value: 'Een droom aan het water' },
    {
      id: 'home-story-text',
      key: 'welcome_story_text',
      label: 'Welkom — verhaal tekst',
      type: 'textarea',
      value:
        'FoodJutters ontstond uit een eenvoudige droom: een plek aan het water waar mensen kunnen genieten van eerlijk, lekker eten in een ontspannen sfeer.\n\nWat begon als een bescheiden terrasrestaurant groeide uit tot een geliefde plek aan de Schelde — met houten terras, houtoven en een warme, gastvrije sfeer.',
    },
    { id: 'home-story-image', key: 'welcome_story_image', label: 'Welkom — verhaal afbeelding URL', type: 'text', value: HERO_IMG },
    { id: 'home-story-image-alt', key: 'welcome_story_image_alt', label: 'Welkom — afbeelding alt-tekst', type: 'text', value: 'Terras van FoodJutters aan het water bij zonsondergang' },
    { id: 'home-cta-banner-title', key: 'cta_banner_title', label: 'CTA banner titel', type: 'text', value: 'Open!' },
    { id: 'home-cta-banner-text', key: 'cta_banner_text', label: 'CTA banner tekst', type: 'textarea', value: 'Wo – zo · 12:00 – 22:00 · Terras, plank & sfeer aan de Schelde.' },
    { id: 'home-menu-preview-title', key: 'menu_preview_title', label: 'Menu preview titel', type: 'text', value: 'Een greep uit ons menu' },
  ],
  'over-ons': [
    { id: 'over-story-title', key: 'story_title', label: 'Verhaal titel', type: 'text', value: 'Een droom aan het water' },
    { id: 'over-p1', key: 'story_p1', label: 'Verhaal alinea 1', type: 'textarea', value: 'FoodJutters ontstond uit een eenvoudige droom: een plek aan het water creëren waar mensen kunnen genieten van eerlijk, lekker eten in een ontspannen sfeer. Met een prachtig uitzicht en een unieke locatie sloeg het idee direct aan.' },
    { id: 'over-p2', key: 'story_p2', label: 'Verhaal alinea 2', type: 'textarea', value: 'Wat begon als een bescheiden terrasrestaurant groeide uit tot een van de meest geliefde eetgelegenheden in de regio. Het houten terras, de houtgestookte pizza-oven en de sfeervolle binnenruimte zijn inmiddels vaste waarden geworden.' },
    { id: 'over-p3', key: 'story_p3', label: 'Verhaal alinea 3', type: 'textarea', value: 'Wij geloven dat goed eten mensen samenbrengt. Elk gerecht is bereid met zorg en liefde, elk bezoek moet voelen als thuiskomen.' },
    { id: 'over-founded', key: 'founded_year', label: 'Opgericht jaar', type: 'text', value: '2012' },
    { id: 'over-cta-title', key: 'cta_title', label: 'CTA titel', type: 'text', value: 'Kom langs' },
    { id: 'over-cta-text', key: 'cta_text', label: 'CTA tekst', type: 'textarea', value: 'U vindt ons op een unieke locatie aan het water. Kom proeven, genieten en uzelf verliezen in het uitzicht.' },
    jsonBlock('over-values', 'values', 'Waarden', [
      { icon: 'Heart', title: 'Gastvrijheid', description: 'Elk gast verdient een warme ontvangst en een onvergetelijke avond. Dat is onze belofte.' },
      { icon: 'Leaf', title: 'Vers & lokaal', description: 'Wij werken met seizoensgebonden producten van lokale leveranciers voor de beste smaken.' },
      { icon: 'Star', title: 'Beleving', description: 'Van het uitzicht over het water tot de knapperende houtkachel — alles draagt bij aan de sfeer.' },
    ]),
    jsonBlock('over-team', 'team', 'Team', [
      { name: 'Jurrien de Lutter', role: 'Eigenaar & Gastheer', description: 'Met meer dan 15 jaar horecaervaring weet Jurrien als geen ander hoe hij gasten in de watten legt.' },
      { name: 'Lisa van der Berg', role: 'Chef-kok', description: "Lisa's passie voor verse, seizoensgebonden ingrediënten is te proeven in elk gerecht dat de keuken verlaat." },
      { name: 'Marco Stam', role: 'Barman & Barista', description: 'Van een perfecte espresso tot een handgemaakte cocktail — Marco zorgt dat uw drankje altijd klopt.' },
    ]),
  ],
  impressie: [
    { id: 'imp-hero-img', key: 'hero_image', label: 'Hero afbeelding URL', type: 'text', value: HERO_IMG },
    jsonBlock('imp-gallery', 'gallery', 'Galerij', [
      { src: HERO_IMG, alt: 'Houten terras van FoodJutters bij zonsondergang', caption: 'Zonsondergang op het terras' },
      { src: HERO_IMG, alt: 'Sfeervolle binnenruimte met pendellichten', caption: 'Sfeervolle binnenruimte' },
      { src: HERO_IMG, alt: 'Houtgestookte pizza-oven', caption: 'Onze houtoven' },
      { src: HERO_IMG, alt: 'Waterfront terras met houten tafels', caption: 'Waterfront terras' },
      { src: HERO_IMG, alt: 'Knusse hoek met houtkachel', caption: 'Houtkachel' },
      { src: HERO_IMG, alt: 'Panoramisch wateruitzicht', caption: 'Wateruitzicht' },
    ]),
    jsonBlock('imp-reviews', 'reviews', 'Reviews', [
      { name: 'Sophie M.', rating: 5, text: 'Geweldig restaurant! Het uitzicht op het water is adembenemend en de pizza uit de houtoven is echt heerlijk. Komen zeker terug!' },
      { name: 'Thomas B.', rating: 5, text: 'Een verborgen parel. De sfeer is ongelooflijk warm en het personeel is super vriendelijk. Aanrader voor iedereen!' },
      { name: 'Marieke V.', rating: 5, text: 'Heerlijk gegeten en wat een locatie! Met zonsondergang op het terras is dit gewoon magisch. De zalmfilet was perfect.' },
    ]),
    { id: 'imp-cta-title', key: 'cta_title', label: 'CTA titel', type: 'text', value: 'Ervaar het zelf' },
    { id: 'imp-cta-text', key: 'cta_text', label: 'CTA tekst', type: 'textarea', value: 'Kom langs en ontdek waarom gasten steeds terugkomen naar FoodJutters aan het water.' },
    {
      id: 'imp-quote',
      key: 'quote',
      label: 'Quote',
      type: 'textarea',
      value:
        'Waar het water fluistert en de geur van de houtoven de lucht vult — dat is FoodJutters.',
    },
  ],
  contact: [
    { id: 'contact-form-title', key: 'contact_form_title', label: 'Contactformulier titel', type: 'text', value: 'Contact opnemen' },
    { id: 'contact-form-desc', key: 'contact_form_description', label: 'Contactformulier beschrijving', type: 'textarea', value: 'Heeft u een vraag, feedback of wilt u iets weten? Vul het formulier in — wij nemen zo snel mogelijk contact met u op.' },
    { id: 'contact-success', key: 'contact_form_success', label: 'Contactformulier succesbericht', type: 'textarea', value: 'Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op.' },
  ],
  reserveren: [
    jsonBlock('res-info', 'info_items', 'Info items', [
      { icon: 'Calendar', title: 'Openingsdagen', body: 'Woensdag t/m zondag' },
      { icon: 'Clock', title: 'Openingstijden', body: '12:00 – 22:00' },
      { icon: 'Utensils', title: 'Groepen', body: 'Grotere gezelschappen? Neem contact op via onze contactpagina.' },
    ]),
    { id: 'res-note', key: 'payment_note_title', label: 'Betaalnotitie titel', type: 'text', value: 'Geen betaling vereist' },
    { id: 'res-note-body', key: 'payment_note_body', label: 'Betaalnotitie', type: 'textarea', value: 'Uw tafel wordt gereserveerd zonder betaalstap. Na bevestiging ontvangt u een e-mail met de details.' },
  ],
  menu: [
    { id: 'menu-cta-title', key: 'cta_title', label: 'CTA titel', type: 'text', value: 'Zin gekregen?' },
    { id: 'menu-cta-text', key: 'cta_text', label: 'CTA tekst', type: 'textarea', value: 'Reserveer uw tafel en laat ons voor u zorgen. Wij staan voor u klaar voor een onvergetelijk diner aan het water.' },
  ],
}
