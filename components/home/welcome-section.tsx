import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { IconArrowRight, tablerProps } from '@/lib/site/icons'

type Props = {
  children: ReactNode
  storyEyebrow: string
  storyTitle: string
  storyText: string
  storyImage: string
  storyImageAlt: string
}

export function WelcomeSection({
  children,
  storyEyebrow,
  storyTitle,
  storyText,
  storyImage,
  storyImageAlt,
}: Props) {
  return (
    <section
      id="welcome-foodjutters"
      className="relative bg-background py-14 sm:py-16 md:py-20 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24 lg:self-start">{children}</div>

          <article className="w-full max-w-lg lg:max-w-none mx-auto lg:mx-0 rounded-2xl sm:rounded-3xl overflow-hidden border border-border/80 bg-card shadow-md shadow-brand-navy/5">
            <div className="relative aspect-[5/4] sm:aspect-[16/11] overflow-hidden bg-wood-3">
              <Image
                src={storyImage}
                alt={storyImageAlt}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-brand-navy/55 via-brand-navy/10 to-transparent"
                aria-hidden
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <p className="label-vintage text-white/75 text-[10px] sm:text-[11px] tracking-[0.22em] uppercase mb-1.5">
                  {storyEyebrow}
                </p>
                <h3 className="heading-display text-3xl sm:text-3xl text-white leading-[0.95] text-balance">
                  {storyTitle}
                </h3>
              </div>
            </div>

            <div className="p-5 sm:p-7 md:p-8">
              <p className="text-foreground/70 text-sm sm:text-[15px] leading-relaxed text-pretty whitespace-pre-line">
                {storyText}
              </p>
              <Link
                href="/over-ons"
                className="inline-flex items-center gap-2 mt-5 sm:mt-6 text-primary font-semibold text-sm hover:gap-3 transition-all"
              >
                Lees ons volledige verhaal
                <IconArrowRight {...tablerProps(16)} />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
