import type { Metadata } from 'next'
import Link from 'next/link'
import { BrandName } from '@/components/brand-name'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Impressie – FoodJutters',
  description: 'Een blik in de sfeer van FoodJutters — het terras, de binnenruimte en het waterfront restaurant.',
}

const HERO_IMG = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0091.JPG-AMp6yqfKtGNflTqhpghBFBhZIZu1SY.jpeg'

const gallery = [
  { src: HERO_IMG, alt: 'Houten terras van FoodJutters bij zonsondergang', caption: 'Zonsondergang op het terras', span: 'col-span-2 row-span-2' },
  { src: HERO_IMG, alt: 'Sfeervolle binnenruimte met pendellichten', caption: 'Sfeervolle binnenruimte', span: 'col-span-1 row-span-1' },
  { src: HERO_IMG, alt: 'Houtgestookte pizza-oven', caption: 'Onze houtoven', span: 'col-span-1 row-span-1' },
  { src: HERO_IMG, alt: 'Waterfront terras met houten tafels', caption: 'Waterfront terras', span: 'col-span-1 row-span-1' },
  { src: HERO_IMG, alt: 'Knusse hoek met houtkachel', caption: 'Houtkachel', span: 'col-span-1 row-span-1' },
  { src: HERO_IMG, alt: 'Panoramisch wateruitzicht', caption: 'Wateruitzicht', span: 'col-span-2 row-span-2' },
  { src: HERO_IMG, alt: 'Terras met olijfbomen', caption: 'Mediterraan terras', span: 'col-span-1 row-span-1' },
  { src: HERO_IMG, alt: 'Interieur met kaarsjes', caption: 'Romantische sfeer', span: 'col-span-1 row-span-1' },
]

const reviews = [
  {
    name: 'Sophie M.',
    rating: 5,
    text: 'Geweldig restaurant! Het uitzicht op het water is adembenemend en de pizza uit de houtoven is echt heerlijk. Komen zeker terug!',
  },
  {
    name: 'Thomas B.',
    rating: 5,
    text: 'Een verborgen parel. De sfeer is ongelooflijk warm en het personeel is super vriendelijk. Aanrader voor iedereen!',
  },
  {
    name: 'Marieke V.',
    rating: 5,
    text: 'Heerlijk gegeten en wat een locatie! Met zonsondergang op het terras is dit gewoon magisch. De zalmfilet was perfect.',
  },
]

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

export default function ImpressiePage() {
  return (
    <>
      <PageHero
        eyebrow="Sfeer & beleving"
        title="Impressie"
        subtitle="Een blik in onze wereld — het terras bij zonsondergang, de warmte van de houtkachel en het uitzicht over het water."
      />

      {/* Mosaic gallery */}
      <section className="py-10 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 gap-3 auto-rows-[180px]">
            {gallery.map((item, i) => (
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

      {/* Pull quote */}
      <section className="py-14 px-6 bg-secondary/30">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-8 h-0.5 bg-primary rounded-full mx-auto mb-7" />
          <blockquote className="heading-display text-2xl text-brand-dark leading-relaxed text-balance">
            &ldquo;Waar het water fluistert en de geur van de houtoven de lucht vult — dat is{' '}
            <BrandName className="text-inherit tracking-normal" />.&rdquo;
          </blockquote>
          <div className="w-8 h-0.5 bg-primary rounded-full mx-auto mt-7 mb-4" />
          <p className="text-muted-foreground text-xs tracking-widest">
            <BrandName className="text-inherit" />, aan het water
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-14 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="label-vintage text-primary mb-2">Ervaringen</p>
            <h2 className="heading-display text-3xl text-brand-dark text-balance">Wat onze gasten zeggen</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map((review) => (
              <div key={review.name} className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-3">
                <StarRating count={review.rating} />
                <p className="text-foreground/65 leading-relaxed text-sm italic flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="font-semibold text-brand-dark text-sm mt-auto">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-primary">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="heading-display text-3xl mb-3 text-balance">Klaar om het zelf te beleven?</h2>
          <p className="text-white/80 text-sm leading-relaxed mb-7">
            Kom langs en ervaar de sfeer, het uitzicht en de smaken van{' '}
            <BrandName className="text-inherit tracking-normal text-white" variant="light" />.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-brand-blue-light transition-colors shadow-lg text-sm"
          >
            Reserveer uw tafel <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
