import type { Metadata } from 'next'
import Link from 'next/link'
import { BrandName } from '@/components/brand-name'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { blockJson, blockValue } from '@/lib/cms/blocks'
import { getContentPage } from '@/lib/db/repository'

export const metadata: Metadata = {
  title: 'Impressie – FoodJutters',
  description:
    'Een blik in de sfeer van FoodJutters — het terras, de binnenruimte en het waterfront restaurant.',
}

type GalleryItem = { src: string; alt: string; caption: string }
type Review = { name: string; rating: number; text: string }

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} sterren`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < count ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={i < count ? 0 : 1.5}
          className={`w-3.5 h-3.5 ${i < count ? 'text-primary' : 'text-border'}`}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default async function ImpressiePage() {
  const page = await getContentPage('impressie')
  const hero = page?.hero
  const gallery = blockJson<GalleryItem[]>(page, 'gallery', [])
  const reviews = blockJson<Review[]>(page, 'reviews', [])
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
          'Een blik in onze wereld — het terras bij zonsondergang, de warmte van de houtkachel en het uitzicht over het water.'
        }
        pattern="BELEVING"
        meta={hero?.meta}
        ctas={[
          { href: '/reserveren', label: 'Reserveer een tafel' },
          { href: '#impressie-fotos', label: 'Bekijk de fotos', variant: 'secondary' },
        ]}
      />

      <section id="impressie-fotos" className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:hidden">
            {paddedGallery.map((item, i) => (
              <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden relative group">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="bg-white/90 text-brand-dark text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm">
                    {item.caption}
                  </span>
                </div>
              </div>
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
              <div key={i} className={`${item.span} rounded-xl overflow-hidden relative group`}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="bg-white/90 text-brand-dark text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                    {item.caption}
                  </span>
                </div>
              </div>
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
              'Waar het water fluistert en de geur van de houtoven de lucht vult — dat is FoodJutters.',
            )}
          </blockquote>
        </div>
      </section>

      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-5 mb-8 sm:mb-10">
            <div className="flex-1 h-px bg-border" />
            <div className="text-center shrink-0 px-1">
              <p className="label-vintage text-primary text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-1">
                Ervaringen
              </p>
              <h2 className="heading-display text-xl sm:text-2xl md:text-3xl text-brand-dark">
                Wat onze gasten zeggen
              </h2>
            </div>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3"
              >
                <StarRating count={review.rating} />
                <p className="text-foreground/65 leading-relaxed text-sm italic flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="pt-3 border-t border-border/50">
                  <p className="font-semibold text-brand-dark text-sm">{review.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 bg-brand-navy">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 text-balance leading-[0.95]">
            {blockValue(page, 'cta_title', 'Ervaar het zelf')}
          </h2>
          <p className="text-white/65 text-sm leading-relaxed mb-6 sm:mb-8 max-w-sm mx-auto">
            {blockValue(page, 'cta_text', '')}
          </p>
          <Link
            href="/reserveren"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 sm:px-8 sm:py-3.5 rounded-full hover:bg-brand-blue-dark transition-colors shadow-lg shadow-primary/25 text-sm"
          >
            Reserveer uw tafel <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
