import type { Metadata } from 'next'
import Link from 'next/link'
import { IconArrowRight, tablerProps } from '@/lib/site/icons'
import { PageHero } from '@/components/page-hero'
import { GalleryTile } from '@/components/impressie/gallery-tile'
import { blockJson, blockValue, usableCmsImageUrl } from '@/lib/cms/blocks'
import { resolveGalleryItems, SITE_GALLERY } from '@/lib/site/images'
import { loadSiteSettings } from '@/lib/cms/settings'
import { resolveHeroMeta } from '@/lib/site/hours'
import { getContentPage } from '@/lib/db/repository'
import { pageMetadata } from '@/lib/site/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Impressie',
  description:
    'Bekijk de sfeer van FoodJutters in Terneuzen. Foto\'s van het terras aan de Schelde, de binnenruimte en de keuken.',
  path: '/impressie',
})

type GalleryItem = { src: string; alt: string; caption: string }

const FALLBACK_GALLERY = SITE_GALLERY

export default async function ImpressiePage() {
  const [page, settings] = await Promise.all([getContentPage('impressie'), loadSiteSettings()])
  const hero = page?.hero
  const rawGallery = blockJson<GalleryItem[]>(page, 'gallery', FALLBACK_GALLERY)
  const gallery = resolveGalleryItems(rawGallery).map((item) => ({
    ...item,
    src: usableCmsImageUrl(item.src) || item.src,
  }))
  const paddedGallery =
    gallery.length >= 8
      ? gallery.slice(0, 8)
      : [...gallery, ...gallery].slice(0, Math.max(gallery.length, 8))

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow ?? 'Sfeer & beleving'}
        title={hero?.title ?? 'Impressie'}
        subtitle={
          hero?.subtitle ??
          'Een blik in onze wereld. Het terras bij zonsondergang, de warmte van de houtkachel en het uitzicht over het water.'
        }
        pattern="BELEVING"
        meta={resolveHeroMeta(hero?.meta, settings.hoursDisplay, {
          phone: settings.phone,
          addressShort: settings.addressShort,
        })}
        ctas={[
          { href: '#impressie-fotos', label: 'Bekijk de fotos' },
          { href: '/contact', label: 'Contact', variant: 'secondary' },
        ]}
      />

      <section id="impressie-fotos" className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:hidden">
            {paddedGallery.map((item, i) => (
              <GalleryTile
                key={i}
                src={item.src}
                alt={item.alt}
                caption={item.caption}
                className="aspect-[4/3] group"
              />
            ))}
          </div>

          <div className="hidden md:grid grid-cols-4 gap-3 auto-rows-[200px]">
            {[
              { ...paddedGallery[0], span: 'col-span-2 row-span-2' },
              { ...paddedGallery[1], span: 'col-span-1 row-span-1' },
              { ...paddedGallery[2], span: 'col-span-1 row-span-1' },
              { ...paddedGallery[3], span: 'col-span-1 row-span-1' },
              { ...paddedGallery[4], span: 'col-span-1 row-span-1' },
              { ...paddedGallery[5], span: 'col-span-2 row-span-2' },
              { ...paddedGallery[6], span: 'col-span-1 row-span-1' },
              { ...paddedGallery[7], span: 'col-span-1 row-span-1' },
            ].map((item, i) => (
              <GalleryTile
                key={i}
                src={item.src}
                alt={item.alt}
                caption={item.caption}
                className={`${item.span} group`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 bg-wood-3 border-y border-primary/10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
            <div className="h-px w-10 bg-primary/30" />
            <span className="text-primary/40 text-3xl font-serif leading-none">&ldquo;</span>
            <div className="h-px w-10 bg-primary/30" />
          </div>
          <blockquote className="heading-typewriter text-lg sm:text-xl md:text-2xl text-brand-dark leading-relaxed text-balance">
            {blockValue(
              page,
              'quote',
              'Waar het water fluistert en de geur van de houtoven de lucht vult. Dat is FoodJutters.',
            )}
          </blockquote>
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 bg-brand-navy">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="section-heading-lg mb-4 sm:mb-5">
            {blockValue(page, 'cta_title', 'Ervaar het zelf')}
          </h2>
          <p className="text-white/65 text-sm leading-relaxed mb-6 sm:mb-8 max-w-sm mx-auto">
            {blockValue(
              page,
              'cta_text',
              'Kom langs en ontdek het vernieuwde FoodJutters aan het water. Heropend in 2026.',
            )}
          </p>
          <Link
            href="/contact#groepsreservering"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 sm:px-8 sm:py-3.5 rounded-full hover:bg-brand-blue-dark transition-colors shadow-lg shadow-primary/25 text-sm"
          >
            Groepsreservering aanvragen <IconArrowRight {...tablerProps(16)} />
          </Link>
        </div>
      </section>
    </>
  )
}
