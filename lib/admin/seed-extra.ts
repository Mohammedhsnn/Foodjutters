import type { ContentBlock } from './types'
import {
  HOME_STORY_IMAGE,
  HOME_STORY_IMAGE_ALT,
  OVER_ONS_STORY_IMAGE,
  OVER_ONS_STORY_IMAGE_ALT,
  SITE_GALLERY,
} from '@/lib/site/images'
import {
  DEFAULT_BANNER_EYEBROW,
  DEFAULT_CTA_BANNER_TEXT,
  DEFAULT_HOURS_DISPLAY,
  DEFAULT_KITCHEN_HOURS,
} from '@/lib/site/hours'

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
    { id: 'home-hours', key: 'hours_display', label: 'Openingstijden (hero)', type: 'text', value: DEFAULT_HOURS_DISPLAY },
    { id: 'home-loc', key: 'location_short', label: 'Locatie (hero)', type: 'text', value: 'Scheldeboulevard 7, Terneuzen' },
    { id: 'home-banner-eyebrow', key: 'banner_eyebrow', label: 'Banner eyebrow', type: 'text', value: DEFAULT_BANNER_EYEBROW },
    { id: 'home-banner-title', key: 'banner_title', label: 'Banner titel', type: 'text', value: 'Kom gezellig binnen' },
    { id: 'home-welcome-eyebrow', key: 'welcome_eyebrow', label: 'Welkom eyebrow', type: 'text', value: 'Welkom bij' },
    { id: 'home-welcome-text', key: 'welcome_text', label: 'Welkom tekst', type: 'textarea', value: 'Brasserie aan het water met terras, open keuken en een warme sfeer voor lunch en diner.' },
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
    { id: 'home-story-title', key: 'welcome_story_title', label: 'Welkom — verhaal titel', type: 'text', value: 'Terug aan het water' },
    {
      id: 'home-story-text',
      key: 'welcome_story_text',
      label: 'Welkom — verhaal tekst',
      type: 'textarea',
      value:
        'FoodJutters is al jarenlang een geliefde brasserie aan de Schelde, met terras, houtoven en een warme sfeer.\n\nNa de definitieve sluiting op 31 mei 2024 is het restaurant onder nieuw eigenmanschap heropend. Sinds 2026 verwelkomen Rolinda en Jimmy u opnieuw op deze unieke plek.',
    },
    { id: 'home-story-image', key: 'welcome_story_image', label: 'Welkom — verhaal afbeelding URL', type: 'text', value: HOME_STORY_IMAGE },
    { id: 'home-story-image-alt', key: 'welcome_story_image_alt', label: 'Welkom — afbeelding alt-tekst', type: 'text', value: HOME_STORY_IMAGE_ALT },
    { id: 'home-cta-banner-title', key: 'cta_banner_title', label: 'CTA banner titel', type: 'text', value: 'Open!' },
    { id: 'home-cta-banner-text', key: 'cta_banner_text', label: 'CTA banner tekst', type: 'textarea', value: DEFAULT_CTA_BANNER_TEXT },
    { id: 'home-menu-preview-title', key: 'menu_preview_title', label: 'Menu preview titel', type: 'text', value: 'Een greep uit ons menu' },
  ],
  'over-ons': [
    { id: 'over-story-image', key: 'story_image', label: 'Verhaal afbeelding URL', type: 'text', value: OVER_ONS_STORY_IMAGE },
    { id: 'over-story-image-alt', key: 'story_image_alt', label: 'Verhaal afbeelding alt-tekst', type: 'text', value: OVER_ONS_STORY_IMAGE_ALT },
    { id: 'over-story-title', key: 'story_title', label: 'Verhaal titel', type: 'text', value: 'Terug aan het water' },
    { id: 'over-p1', key: 'story_p1', label: 'Verhaal alinea 1', type: 'textarea', value: 'FoodJutters ontstond als een droom aan het water: een plek waar mensen samenkomen om te genieten van eerlijk, lekker eten met uitzicht op de Schelde. In de loop der jaren groeide het uit tot een van de meest geliefde eetgelegenheden in de regio.' },
    { id: 'over-p2', key: 'story_p2', label: 'Verhaal alinea 2', type: 'textarea', value: 'Op 31 mei 2024 sloot het restaurant definitief zijn deuren. Maar het verhaal eindigde daar niet: onder nieuw eigenmanschap is FoodJutters sinds 2026 weer open. Rolinda en Jimmy hebben de plek opgepakt met frisse energie en grote passie voor gastvrijheid.' },
    { id: 'over-p3', key: 'story_p3', label: 'Verhaal alinea 3', type: 'textarea', value: 'Het vertrouwde terras, de houtgestookte pizza-oven en de sfeervolle binnenruimte zijn terug, klaar om u opnieuw te verwelkomen. Wij geloven dat goed eten mensen samenbrengt, en elk bezoek moet voelen als thuiskomen.' },
    { id: 'over-founded', key: 'founded_year', label: 'Heropend sinds', type: 'text', value: '2026' },
    { id: 'over-cta-title', key: 'cta_title', label: 'CTA titel', type: 'text', value: 'Kom langs' },
    { id: 'over-cta-text', key: 'cta_text', label: 'CTA tekst', type: 'textarea', value: 'U vindt ons op een unieke locatie aan het water. Kom proeven, genieten en uzelf verliezen in het uitzicht.' },
    jsonBlock('over-values', 'values', 'Waarden', [
      { icon: 'Heart', title: 'Gastvrijheid', description: 'Warme ontvangst. Iedereen voelt zich welkom.' },
      { icon: 'Leaf', title: 'Vers & lokaal', description: 'Seizoensproducten van leveranciers uit de regio.' },
      { icon: 'Star', title: 'Beleving', description: 'Uitzicht, sfeer en een knus thuisgevoel aan het water.' },
    ]),
    { id: 'over-team-image', key: 'team_image', label: 'Teamfoto URL', type: 'text', value: '/images/team-foodjutters.png' },
    { id: 'over-team-image-alt', key: 'team_image_alt', label: 'Teamfoto alt-tekst', type: 'text', value: 'Rolinda en Jimmy, de nieuwe eigenaren van FoodJutters' },
  ],
  impressie: [
    { id: 'imp-hero-img', key: 'hero_image', label: 'Hero afbeelding URL', type: 'text', value: SITE_GALLERY[0].src },
    jsonBlock('imp-gallery', 'gallery', 'Galerij', SITE_GALLERY),
    { id: 'imp-cta-title', key: 'cta_title', label: 'CTA titel', type: 'text', value: 'Ervaar het zelf' },
    { id: 'imp-cta-text', key: 'cta_text', label: 'CTA tekst', type: 'textarea', value: 'Kom langs en ontdek het vernieuwde FoodJutters aan het water. Heropend in 2026.' },
    {
      id: 'imp-quote',
      key: 'quote',
      label: 'Quote',
      type: 'textarea',
      value:
        'Waar het water fluistert en de geur van de houtoven de lucht vult. Dat is FoodJutters.',
    },
  ],
  contact: [
    { id: 'contact-form-title', key: 'contact_form_title', label: 'Contactformulier titel', type: 'text', value: 'Contact opnemen' },
    { id: 'contact-form-desc', key: 'contact_form_description', label: 'Contactformulier beschrijving', type: 'textarea', value: 'Heeft u een vraag, feedback of wilt u iets weten? Vul het formulier in. Wij nemen zo snel mogelijk contact met u op.' },
    { id: 'contact-success', key: 'contact_form_success', label: 'Contactformulier succesbericht', type: 'textarea', value: 'Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op.' },
  ],
  reserveren: [
    jsonBlock('res-info', 'info_items', 'Info items', [
      { icon: 'Calendar', title: 'Openingsdagen', body: 'Dinsdag t/m zondag' },
      { icon: 'Clock', title: 'Openingstijden', body: `${DEFAULT_HOURS_DISPLAY}. ${DEFAULT_KITCHEN_HOURS}` },
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
