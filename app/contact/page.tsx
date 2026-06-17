import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/contact-form'
import { loadSiteSettings } from '@/lib/cms/settings'
import { getContentPage } from '@/lib/db/repository'
import { pageMetadata } from '@/lib/site/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Neem contact op met FoodJutters in Terneuzen. Vragen, groepsreserveringen en routebeschrijving naar ons terras aan de Schelde.',
  path: '/contact',
})

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getContentPage('contact'), loadSiteSettings()])
  return <ContactForm page={page} settings={settings} />
}
