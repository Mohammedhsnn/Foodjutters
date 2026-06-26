import type { Metadata } from 'next'
import Link from 'next/link'
import { IconArrowRight, IconCircleCheck, IconPhone, tablerProps } from '@/lib/site/icons'
import { loadSiteSettings } from '@/lib/cms/settings'
import { pageMetadata } from '@/lib/site/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Bedankt',
  description: 'Uw bericht is ontvangen. FoodJutters neemt zo spoedig mogelijk contact met u op.',
  path: '/contact/bedankt',
  noIndex: true,
})

export default async function ContactBedanktPage() {
  const settings = await loadSiteSettings()

  return (
    <div className="bg-background min-h-[70vh] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-24 sm:py-28">
        <div className="max-w-lg w-full text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <IconCircleCheck {...tablerProps(36)} className="text-primary" />
          </div>
          <p className="label-vintage text-primary text-[10px] sm:text-[11px] tracking-[0.28em] uppercase mb-3">
            Bericht ontvangen
          </p>
          <h1 className="section-heading text-brand-dark text-balance mb-4">Bedankt voor uw bericht</h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty mb-8">
            We hebben uw bericht goed ontvangen en nemen zo spoedig mogelijk contact met u op.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-brand-blue-dark transition-colors text-sm"
            >
              Terug naar home
              <IconArrowRight {...tablerProps(16)} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-border bg-card text-brand-navy font-semibold px-6 py-3 rounded-full hover:border-primary/40 transition-colors text-sm"
            >
              Naar contact
            </Link>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            Liever direct contact?{' '}
            <a href={`tel:${settings.phoneTel}`} className="inline-flex items-center gap-1 text-primary hover:underline">
              <IconPhone {...tablerProps(14)} />
              {settings.phone}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
