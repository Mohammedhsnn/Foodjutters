import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/contact-form'
import { loadSiteSettings } from '@/lib/cms/settings'
import { getContentPage } from '@/lib/db/repository'

export const metadata: Metadata = {
  title: 'Contact – FoodJutters',
  description: 'Neem contact op met FoodJutters of reserveer direct een tafel.',
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getContentPage('contact'), loadSiteSettings()])
  return <ContactForm page={page} settings={settings} />
}
